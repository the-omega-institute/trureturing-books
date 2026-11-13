# 第二十九章 无时间因果与格拉姆相容空间：从毕达哥拉斯佩尔接缝到椭圆曲线环面 {#无时间因果与格拉姆相容空间从毕达哥拉斯佩尔接缝到椭圆曲线环面}

> *“顺序无关的本质就是根本不存在前后的时间......因果就是这样必然。因为观察者是有限的, 所以经历的因果是有限的, 观察者的选择是在因果的相容空间中做选择, 不断在时间场中选点”*

在前七部二十八章中，我们从两子丈量的内积投影一路走到了 Lean 4 公理圣殿的机械验证。现在，在开启全书第八部收官合拢之际，让我们把整座几何大厦推向最深层的两个本体论追问：第一，两千五百年前毕达哥拉斯的“勾股定理”与“万物皆数”，如何通过 $\pm 1$ 佩尔算术接缝连接起素数二象性、同余数椭圆曲线环面与三维旋量球面 $S^3$？第二，为什么第 10 章“两两比较、永远一致、顺序无关”的 Gram 矩阵刚性直接消解了前后的时间流逝，却同时铸就了斯宾诺莎式的几何因果必然性与有限观察者在格拉姆椭圆体（因果相容空间）中的自由选点？

::: {.figure src="ch29-overview"}
**图 29。** 本章地图：第 I 栏，四级台阶依次写着青色的 $\mathbb{Q}$ 与品红的 $\sqrt{2}$、$\pi$、$\theta^*$，每个品红的常数都是逃出前一级的那个数；第 II 栏，模 $4$ 表盘上两个平方之和只落在青色的第 $0$、$1$、$2$ 格，品红虚线围出的第 $3$ 格永远空着（[@lem-ch29-square-residues-mod-four]）；第 III 栏，$c_{AB} = \cos 60^\circ$ 时的格拉姆窗口：紫色的内部 $\det G > 0$，边上 $\det G = 0$，琥珀色竖线是 $c_{BC} = \cos 45^\circ$ 时 $c_{AC}$ 能取的范围。
:::

---

## 29.1 毕达哥拉斯、万物皆数与四级“球外之球”突围 {#sec-coda-pythagoras-all-is-number}

如果把整本书的三十九章压缩回人类数学文明最初的那粒种子，我们会发现它早已埋藏在两千五百年前毕达哥拉斯学派的两句箴言之中：**“勾股定理（$a^2 + b^2 = c^2$）”**与**“万物皆数（All is Number）”**。透过克利福德几何代数与形式化内核的透镜，这两句古老箴言展现出了跨越三幕的壮丽几何真容。

### 29.1.1 第一幕：勾股定理的几何真容——一维线段不可加，二维面积才守恒 {#sec-coda-pythagoras-act1}

为什么直角三角形的两条正交直角边 $\mathbf{a} \perp \mathbf{b}$，不能靠一维长度直接相加得到斜边（$a + b \neq c$），偏偏要**先平方、再相加**（$a^2 + b^2 = c^2$）？

在克利福德几何代数 $\mathcal{Cl}_{3,0}(\mathbb{R})$ 中，答案一行算式即可揭晓。把正交直角边看作满足 $\mathbf{a}\cdot\mathbf{b} = 0$ 的向量，斜边向量为 $\mathbf{c} = \mathbf{a} + \mathbf{b}$。用几何积计算斜边的平方：

$$
\mathbf{c}^2 = (\mathbf{a} + \mathbf{b})(\mathbf{a} + \mathbf{b}) = \mathbf{a}^2 + \mathbf{b}^2 + (\mathbf{a}\mathbf{b} + \mathbf{b}\mathbf{a}).
$$

由于 $\mathbf{a} \perp \mathbf{b}$，内积对称部分 $\mathbf{a}\cdot\mathbf{b} = \frac{1}{2}(\mathbf{a}\mathbf{b} + \mathbf{b}\mathbf{a}) = 0$，交叉项完全退化为正反两个手性相反的外积双向量（有向面积元）之和：

$$
\mathbf{a}\mathbf{b} + \mathbf{b}\mathbf{a} = \mathbf{a}\wedge\mathbf{b} + \mathbf{b}\wedge\mathbf{a} = \mathbf{a}\wedge\mathbf{b} - \mathbf{a}\wedge\mathbf{b} = 0.
$$

正反旋向的双向量面积完美相消，只留下标量等级的平方和：

$$
c^2 = a^2 + b^2.
$$

换言之，**一维的投影线段与不同方向绑死，无法跨正交轴直接相加；唯有升维到二维平方（面积/范数），方向手性在反对称外积中相互抵消，正交分量才能汇聚为守恒的总量！**

一旦将斜边归一化为单位半径 $c = 1$，古老的勾股定理 $a^2 + b^2 = 1$ 立刻化身为统摄全书八部曲的**母体守恒律**：

1. **量子力学（第一部至第三部）**：测量投影的粒子内积项 $\cos\theta$ 与驱动旋转的波外积项 $\sin\theta$ 满足勾股恒等式 $\cos^2\theta + \sin^2\theta = 1$——玻恩规则概率守恒 $P(0) + P(1) = 1$（[`born_probability_skeleton`](lean:D5/S3/Quantum/FiniteDimensional.born_probability_skeleton)）与内积空间平行四边形/勾股范数律（[`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law) 及互补测量概率勾股定理 [`complementary_context_probability_pythagoras`](lean:D5/S3/Quantum/Tomography/ComplementaryContextProbabilityPythagoras.complementary_context_probability_pythagoras)）不过是单位圆上的勾股定理；
2. **狭义相对论（第五部第 17 章）**：闵可夫斯基时空中固有时流逝率 $d\tau/dt$ 与空间运动速率 $v/c$ 满足 $(d\tau/dt)^2 + (v/c)^2 = 1$（即 $d\tau^2 = dt^2 - dx^2/c^2$ 的正交重排，对应双曲旋量范数守恒 [`bogoliubov_norm_conservation`](lean:D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation)）——所谓“光子以光速飞行时不经历固有时流逝”，只是勾股斜边 $1$ 全部投影到了空间轴 $v/c = 1$ 上，使得时间轴投影归零；
3. **丢番图数论与旋量代数（第六部第 23 章）**：四元数单位球面 $S^3$ 的范数守恒 $s^2 + x^2 + y^2 + z^2 = 1$、艾森斯坦二次范数型恒等式（[`Qform_eq_eisNorm`](lean:D5/S3/PrimeForms/Crossing/CrossingNormForm.Qform_eq_eisNorm)）与黄金整数佩尔范数恒等式（[`pell_form_eq_four_mul_norm`](lean:D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm)），则是高维正交与二次格空间中的勾股定理。

### 29.1.2 第二幕：希帕索斯之裂与永不磨灭的佩尔余项 $m^2 - 2n^2 = \pm 1$ {#sec-coda-pythagoras-act2}

然而，正是这条看似天衣无缝的勾股定理，亲手砸碎了毕达哥拉斯学派最初的静态有理数球面。

取最简单的等腰直角三角形：$a = 1, b = 1$，夹角恰好处于正交两轴的对称角平分线 $\theta = 45^\circ = \pi/4$ 上——这正是第四部第 13 章贝尔—CHSH 不等式达到齐雷尔森量子极值 $2\sqrt{2}$ 的临界几何角度。勾股定理给出斜边平方 $c^2 = 1^2 + 1^2 = 2$，即 $c = \sqrt{2}$。

按照毕达哥拉斯学派早期的静态信条，“万物皆（整数之比构成的）有理数”，理应存在正整数 $m, n$ 使得 $(m/n)^2 = 2$，即 $m^2 = 2n^2$。然而，放到第六部第 22 章的素数正交坐标系中审视，算术基本定理立刻给出审判：每个素数 $p$ 都是乘法格 $\mathbb{Q}_{>0}^\times \cong \bigoplus_p \mathbb{Z}\,\mathbf{e}_p$ 的一条独立正交轴；在 $p = 2$ 这条轴上，平方数 $m^2$ 的 $2$-进指数 $v_2(m^2) = 2v_2(m)$ 永远是**偶数**，而 $2n^2$ 的 $2$-进指数 $v_2(2n^2) = 2v_2(n) + 1$ 永远是**奇数**。偶数不可能等于奇数，故 $m^2 = 2n^2$ 在非零整数中绝无可能成立！

既然整数之比永远够不着 $\sqrt{2}$，整数网格能做的就只剩动词意义上的“数（shǔ）”：一步一步逼近，同时记下每一步还差多少。拿掉 $\sqrt{2}$ 的整数部分，剩下的 $s = \sqrt{2} - 1 \approx 0.414$ 是这条 $45^\circ$ 斜边比单位边长多出的那一截；把它当作斜率来读，就是下文定义的“银斜率”。用它的整数倍去对齐整数刻度：$1\cdot s \approx 0.414$ 离 $0$ 差 $+0.414$；$2s \approx 0.828$ 离 $1$ 差 $-0.172$；$5s \approx 2.071$ 离 $2$ 差 $+0.071$；$12s \approx 4.971$ 离 $5$ 差 $-0.029$。逐个试 $m = 1, 2, 3, \dots$，只记下比此前所有倍数都更贴近整数的那些，得到的正是 $1, 2, 5, 12, \dots$（脚本核对到 $m < 3000$）：每一项是前一项的两倍再加更前一项，所对的整数 $0, 1, 2, 5, \dots$ 是同一串数退后一格；误差每一步变号，并缩成上一步的 $s$ 倍——越来越小，却从不归零。下面这组冻结的定义与定理把这台计数机写成精确陈述。

::: {.definition #def-ch29-pell-silver-slope title="佩尔数、伴随佩尔数与银斜率" lean="D5/S1/Recurrence/PellCompanionGcd.P D5/S1/Recurrence/PellCompanionGcd.Q D5/S1/Words/Mechanical/SilverSlopeAbelianPeriodDefs.silverSlope"}
佩尔数 $P : \mathbb{N} \to \mathbb{N}$ 与伴随佩尔数 $Q : \mathbb{N} \to \mathbb{N}$ 由同一条二阶递推、不同的初值定义：

$$
\begin{aligned}
&P_0 = 0,\quad P_1 = 1,\quad P_{n+2} = 2P_{n+1} + P_n,\\
&Q_0 = 1,\quad Q_1 = 1,\quad Q_{n+2} = 2Q_{n+1} + Q_n.
\end{aligned}
$$

银斜率是实数 $s = \sqrt{2} - 1$。
:::

于是 $P = 0, 1, 2, 5, 12, 29, 70, 169, \dots$，$Q = 1, 1, 3, 7, 17, 41, 99, 239, \dots$。

::: {.lemma #lem-ch29-pell-companion-step title="佩尔数与伴随佩尔数的一阶交叉递推与互素" lean="D5/S1/Recurrence/PellCompanionGcd.pell_companion_step D5/S1/Recurrence/PellCompanionGcd.pell_companion_coprime"}
对每个自然数 $n$，

$$
P_{n+1} = P_n + Q_n,\qquad Q_{n+1} = 2P_n + Q_n,
$$

并且 $P_n$ 与 $Q_n$ 互素：$\gcd(P_n, Q_n) = 1$。
:::

::: proof
两条递推一起对 $n$ 归纳。$n = 0$ 时 $P_1 = 1 = P_0 + Q_0$，$Q_1 = 1 = 2P_0 + Q_0$。归纳步先按定义展开 $P_{n+2}$ 与 $Q_{n+2}$，再代入归纳假设，两边化成 $P_n, Q_n$ 的同一个线性组合，由线性算术（`omega`）收尾。互素也对 $n$ 归纳：$\gcd(0, 1) = 1$；归纳步用刚证的递推把这一对数写成 $\bigl(P_n + Q_n,\ P_n + (P_n + Q_n)\bigr)$，从第二个数减去第一个数、再从第一个数减去 $P_n$，最大公因数都不变，问题退回 $\gcd(Q_n, P_n) = 1$——辗转相除倒着走了一步。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch29-silver-pell-remainder title="银斜率的佩尔余项：精确误差、$\pm 1$ 行列式与相位质量" lean="D5/S1/Words/Mechanical/SilverSlopeAbelianPellArithmetic.silverPell_error_formula D5/S1/Words/Mechanical/SilverSlopeAbelianPellArithmetic.silverPell_determinant D5/S1/Words/Mechanical/SilverSlopeAbelianPellArithmetic.silver_phase_mass"}
对每个自然数 $k$：

1. 在 $\mathbb{R}$ 中，$P_{k+1}\,s - P_k = (-1)^k\,s^{k+1}$；
2. 在 $\mathbb{Z}$ 中，$P_{k+2}\,P_k - P_{k+1}^2 = (-1)^{k+1}$；
3. 在 $\mathbb{R}$ 中，$\bigl(P_{k+2} + s\,P_{k+1}\bigr)\,s^{k+1} = 1$。
:::

::: proof
三条都只用两样东西：递推 $P_{n+2} = 2P_{n+1} + P_n$，以及由 $(\sqrt{2})^2 = 2$ 得到的二次关系 $s^2 + 2s = 1$。第 1 条先证两步递推 $P_{k+3}\,s - P_{k+2} = s^2\,(P_{k+1}\,s - P_k)$：展开递推后用 $s^2 = 1 - 2s$ 与 $s^3 = 5s - 2$ 化简。再对 $k$ 作强归纳：$k = 0$ 时 $1\cdot s - 0 = s$，$k = 1$ 时 $2s - 1 = -s^2$，此后每前进两步误差乘以 $s^2$，符号 $(-1)^k$ 不变。第 2 条对 $k$ 归纳：$k = 0$ 时 $P_2P_0 - P_1^2 = -1$；归纳步把 $P_{k+3}$ 与 $P_{k+2}$ 按递推代入，环运算显示新行列式恰是旧行列式的相反数，符号每步翻转一次。第 3 条也对 $k$ 归纳：$k = 0$ 时 $(2 + s)\,s = 1$；归纳步代入 $P_{k+3} = 2P_{k+2} + P_{k+1}$ 后，比上一步多出的项是 $P_{k+2}\,s^{k+1}(s^2 + 2s - 1) = 0$，左边退回上一步的值 $1$。完整证明由 Lean 内核检查。
:::

**从误差到单位余项（手工推导）。** 由 [@lem-ch29-pell-companion-step]，$Q_{k+1} = 2P_k + Q_k = P_k + P_{k+1}$，所以第 1 条就是 $\sqrt{2}$ 自己的误差：$P_{k+1}\,s - P_k = P_{k+1}\sqrt{2} - Q_{k+1}$。又因 $P_{k+2} - P_{k+1} = Q_{k+1}$，第 3 条的括号是 $P_{k+2} + s\,P_{k+1} = Q_{k+1} + P_{k+1}\sqrt{2}$。两者相乘：

$$
\begin{aligned}
Q_{k+1}^2 - 2P_{k+1}^2
&= \bigl(Q_{k+1} - P_{k+1}\sqrt{2}\bigr)\bigl(Q_{k+1} + P_{k+1}\sqrt{2}\bigr)\\
&= -(-1)^k\,s^{k+1}\bigl(P_{k+2} + s\,P_{k+1}\bigr) = (-1)^{k+1}.
\end{aligned}
$$

记 $n = k + 1$，这就是佩尔单位余项 $Q_n^2 - 2P_n^2 = (-1)^n$（$n \ge 1$）：$1^2 - 2\cdot 1^2 = -1$，$3^2 - 2\cdot 2^2 = +1$，$7^2 - 2\cdot 5^2 = -1$，……，$99^2 - 2\cdot 70^2 = 9801 - 9800 = +1$。窄边 $Q_n - P_n\sqrt{2} = (-1)^n s^n$ 量的是格点 $(P_n, Q_n)$ 偏离直线 $Q = \sqrt{2}\,P$ 的程度，每步变号并缩成 $s$ 倍；宽边 $Q_n + P_n\sqrt{2} = s^{-n} = (1 + \sqrt{2})^n$（第 3 条，并用 $s\,(1 + \sqrt{2}) = 1$）每步放大 $1 + \sqrt{2}$ 倍。两边之积永远是 $\pm 1$：误差不能归零，因为它乘上一个有限的宽边必须得到 $\pm 1$。不用第 1、3 条，只凭第 2 条与 [@lem-ch29-pell-companion-step] 也能得到同一结论：把 $Q_n = P_{n+1} - P_n$ 与 $P_{n+2} = 2P_{n+1} + P_n$ 代入，$Q_n^2 - 2P_n^2 = -\bigl(P_{n+2}P_n - P_{n+1}^2\bigr) = (-1)^n$，这条路连 $n = 0$（$1^2 - 2\cdot 0^2 = 1$）也覆盖。

误差不归零，但它是不是“最小”的？下一条定理回答：在下一个佩尔数之前，没有任何倍数能更贴近整数。

::: {.theorem #thm-ch29-silver-best-approximation title="银斜率的最佳逼近下界" lean="D5/S1/Words/Mechanical/SilverSlopeAbelianPellArithmetic.silver_best_approximation"}
设 $k, m$ 为自然数，$0 < m < P_{k+2}$。则对每个整数 $z$，在 $\mathbb{R}$ 中

$$
s^{k+1} \le |m\,s - z|.
$$
:::

::: proof
证明的核心是一条与 $\sqrt{2}$ 无关的整数格引理（`unimodular_opposite_error_bound`）：设 $\alpha, d, e$ 为实数，整数对 $(q, p)$ 与 $(q', p')$ 满足 $qp' - pq' = 1$，$q' > 0$，$0 < m < q$，且两者的误差符号相反：$q\alpha - p = d > 0$，$q'\alpha - p' = -e < 0$；则对每个整数 $z$ 都有 $e \le |m\alpha - z|$。理由是行列式为 $1$ 的整数矩阵在整数上可逆：$(m, z) = a\,(q, p) + b\,(q', p')$，其中 $a = mp' - zq'$、$b = zq - mp$ 都是整数，误差按同样的系数叠加，$m\alpha - z = ad - be$。由 $0 < m = aq + bq' < q$：$a \ge 1$ 时必有 $b \le -1$，$a \le 0$ 时必有 $b \ge 1$。两种情形中 $ad$ 与 $-be$ 都不会异号、绝不相消，而 $|be| \ge e$，所以绝对值至少为 $e$。对银斜率取相邻两对 $(P_{k+2}, P_{k+1})$ 与 $(P_{k+1}, P_k)$：[@thm-ch29-silver-pell-remainder] 第 1 条给出符号相反的误差 $(-1)^{k+1}s^{k+2}$ 与 $(-1)^k s^{k+1}$，第 2 条给出行列式 $(-1)^{k+1}$。$k$ 为奇数时直接套用；$k$ 为偶数时行列式是 $-1$，Lean 把 $s$、两对的第二个分量与 $z$ 一起换号再套用，最后用 $|-x| = |x|$ 还原。所需的正性 $P_{k+1}, P_{k+2} > 0$ 来自 $P_{n+1} = P_n + Q_n$ 与 $Q_n$ 为奇数（`companion_odd`）。完整证明由 Lean 内核检查。
:::

（手工推导）因为 $m\,s - z = m\sqrt{2} - (m + z)$，而 $z$ 跑遍整数时 $m + z$ 也跑遍整数，[@thm-ch29-silver-best-approximation] 说的是：$0 < m < P_{k+2}$ 时，$m\sqrt{2}$ 到最近整数的距离不小于 $s^{k+1}$。由误差公式，$m = P_{k+1}$、$z = P_k$ 恰好取到这个下界（$0 < P_{k+1} < P_{k+2}$，它在允许范围内），所以在这些分母中没有谁比 $P_{k+1}$ 逼得更近；第一个更好的分母是下一个佩尔数 $P_{k+2}$，其误差为 $s^{k+2}$。

::: {.example #ex-ch29-silver-pell-table title="数出前六步"}
记 $\delta_k$ 为 $0 < m < P_{k+2}$、$z \in \mathbb{Z}$ 时 $|m\,s - z|$ 的最小值，由脚本逐个枚举 $m$ 求得。小数按所示位数四舍五入：

| $k$ | $Q_{k+1}/P_{k+1}$ | $P_{k+1}\,s - P_k$ | $Q_{k+1}^2 - 2P_{k+1}^2$ | $P_{k+2}$ | $\delta_k$ |
| :-: | :-: | --: | :-: | --: | --: |
| $0$ | $1/1$ | $+0.41421356$ | $-1$ | $2$ | $0.41421356$ |
| $1$ | $3/2$ | $-0.17157288$ | $+1$ | $5$ | $0.17157288$ |
| $2$ | $7/5$ | $+0.071067812$ | $-1$ | $12$ | $0.071067812$ |
| $3$ | $17/12$ | $-0.029437252$ | $+1$ | $29$ | $0.029437252$ |
| $4$ | $41/29$ | $+0.012193309$ | $-1$ | $70$ | $0.012193309$ |
| $5$ | $99/70$ | $-0.0050506339$ | $+1$ | $169$ | $0.0050506339$ |

误差一列正负交替，绝对值每行缩为上一行的 $s \approx 0.414$ 倍；第四列只取 $\pm 1$；最后一列与误差的绝对值相同，且在这六行里最小值只在 $m = P_{k+1}$ 处取到（唯一性是枚举所见；两条定理只保证最小值等于 $s^{k+1}$ 并在 $m = P_{k+1}$ 处取到）。例如 $k = 1$ 时只能取 $m = 1, 2, 3, 4$，距离依次为 $0.41421356$、$0.17157288$、$0.24264069$、$0.34314575$，最小者正是 $m = P_2 = 2$。$k = 5$ 一行也能用整数核对：行列式 $P_7P_5 - P_6^2 = 169\cdot 29 - 70^2 = 4901 - 4900 = 1$；相位质量的括号 $P_7 + s\,P_6 = 99 + 70\sqrt{2} \approx 197.99495$，乘以 $s^6 \approx 0.0050506339$ 恰为 $1$。
:::

::: {.figure src="ch29-pell-seam"}
**误差每步变号、缩成 $s$ 倍，却从不归零；$Q^2 - 2P^2$ 始终是 $\pm 1$。** 竖线是上表第三列的误差 $P_{k+1}\,s - P_k$，青色朝上为正、品红朝下为负；纵轴按绝对值取对数刻度，所以每步缩成 $s \approx 0.414$ 倍在图上是相同的一格，端点都落在虚线包络 $\pm s^{k+1}$ 上（[@thm-ch29-silver-pell-remainder] 第 1 条）。竖线旁是渐近分数 $Q_{k+1}/P_{k+1}$，最下一行是第四列的 $Q_{k+1}^2 - 2P_{k+1}^2$。
:::

::: {.remark #rem-ch29-pell-convergents-literature title="$Q_n/P_n$ 与 $\sqrt{2}$ 的连分数渐近分数（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 经典连分数理论给出

$$
\sqrt{2} = 1 + \dfrac{1}{2 + \dfrac{1}{2 + \dfrac{1}{2 + \cdots}}},
$$

其渐近分数依次是 $1/1,\ 3/2,\ 7/5,\ 17/12,\ 41/29,\ 99/70,\ \dots$，即从 $1/1$ 数起的第 $n$ 个渐近分数恰为 $Q_n/P_n$。一般理论中的拉格朗日定理还指出，任一无理数 $\alpha$ 的第二类最佳逼近（对每个分母不超过 $q$ 的其他分数 $p'/q'$ 都有 $|q\alpha - p| < |q'\alpha - p'|$ 的分数 $p/q$）都是渐近分数。所钉的 Lean 库只从递推出发证明了 [@lem-ch29-pell-companion-step]、[@thm-ch29-silver-pell-remainder] 与 [@thm-ch29-silver-best-approximation]，没有把 $P, Q$ 与 Mathlib 的连分数展开对应起来（源文件写明这一对应尚未证明）。因此，“$Q_n/P_n$ 就是 $\sqrt{2}$ 的连分数渐近分数”这一识别与一般的最佳逼近理论仍是文献结果；上面的单位余项 $Q_n^2 - 2P_n^2 = (-1)^n$ 与最佳逼近下界并不依赖于它。
:::

[@thm-ch29-silver-pell-remainder] 的行列式 $P_{k+2}P_k - P_{k+1}^2 = (-1)^{k+1}$ 与[终章](coda.md)的斐波那契—卡西尼恒等式 $F_kF_{k+2} - F_{k+1}^2 = (-1)^{k+1}$ 形状完全相同，它的单位余项也与我们在第 23 章证明的黄金整数佩尔型恒等式 $(2a + b)^2 - 5b^2 = 4\operatorname{norm}(g)$（[`pell_form_eq_four_mul_norm`](lean:D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm)）遥相呼应：用一维离散整数网格去缝合二维正交旋转时，网格接缝处永远残留着单位算术裂隙。希帕索斯发现的不是数学的崩塌，而是**第 1 层有理数球面被 $90^\circ$ 正交面积运算撑破时露出的第一道“球外之球”接缝**。

::: {.viz src="pythagoras-number-escape" preset="hippasus" height="500"}
**永远差一格。** 渐近分数 $1/1, 3/2, 7/5, 17/12, \dots$ 沿直线 $m = \sqrt{2}\,n$ 越贴越近；右侧两条色带是 $m^2$ 与 $2n^2$ 的格子数，放大镜里它们永远差着一格。
:::

### 29.1.3 第三幕：为“万物皆数”正名——从动词“数（shǔ）”到四级数系突围 {#sec-coda-pythagoras-act3}

既然有理数连最简单的正交斜边 $\sqrt{2}$ 都装不下，毕达哥拉斯的“万物皆数”错了吗？

恰恰相反！正如第一部第 1 章揭示中文“**量**”字同时兼备动词**量（liáng，成对测量的动作）**与名词**量（liàng，坍缩截断后的读数）**，中文里的“**数**”字同样封印着两重维度：

- 读三声的动词 **数（shǔ）**：是递推计数、两两比对、正交平方、切分逼近与自指迭代的**活算子（生成过程）**；
- 读四声的名词 **数（shù）**：是算子在某一层刻度尺上停步截断后留下的**静态坐标印记（近似多面体顶点）**。

如果把“数”狭隘地理解为静态的名词坐标（四声 shù），那么每一层数系都会被下一层几何操作轻易击穿；但如果把“数”恢复为生成的动词算子（三声 shǔ），那么每一次旧球面的破裂，都是算子向更高维球面突围的必然跃迁。从整数到自指不动点，人类对“数”的认识史，正是一部**四级“球外之球”的几何突围史**：

::: {.remark #rem-ch29-four-tier-sphere-table title="四级“球外之球”数系突围对照表（含文献结果，未在本书形式化）"}
**文献结果，未在本书形式化（针对表中所涉连分数逼近、圆周率 $\pi$ 与余弦不动点 $\theta^*$ 的经典超越性分析结论；黄金不动点唯一性已由 `golden_fixed_point_unique` 形式化验证，代数无关性前沿见开放猜想 [@conj-schanuel-dottie]）。**

| 球面层级 | 数系疆域与代表常数 | 驱动跃迁的几何/代数算子（动词 `数 shǔ`） | 球面内部的闭合法则（名词 `数 shù`） | 刺穿当前球面的裂隙与接缝余项 |
| :--- | :--- | :--- | :--- | :--- |
| **第 1 层球** | 整数 $\mathbb{Z}$ 与有理数 $\mathbb{Q}$<br/>（比例刻度 $m/n$） | $0^\circ$ 共线轴上的欧几里得辗转相除与线性加减 | 一维有理网格上的有限比例闭合：$n \cdot (m/n) = m$ | $90^\circ$ 正交勾股平方 $1^2 + 1^2 = 2$ 引发 $2$-进奇偶冲突（佩尔余项见 [@thm-ch29-silver-pell-remainder]，连分数识别见 [@rem-ch29-pell-convergents-literature]） |
| **第 2 层球** | 代数数 $\overline{\mathbb{Q}}$<br/>（勾股斜边 $\sqrt{2}$、黄金分割 $\varphi = \frac{1+\sqrt{5}}{2}$） | 有限维正交勾股面积守恒 $a^2 + b^2 = c^2$ 与整系数多项式求根 | 有限次代数多面体方程闭合：$x^2 - 2 = 0$、$x^2 - x - 1 = 0$（[`golden_fixed_point_unique`](lean:D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique)） | 正 $2^k$ 边形无穷折半割圆极限（圆弧超越性文献评注见 [@rem-banach-dottie-hairy-ball-literature]） |
| **第 3 层球** | 初等周期常数<br/>（圆周率 $\pi$、自然底数 $e$） | 无穷次勾股半角迭代 $\sin(\theta/2) = \sqrt{(1-\cos\theta)/2}$ 与指数映射 $e^{i\theta} = \cos\theta + i\sin\theta$ | 静态单位圆与球面周期闭合：$e^{i\pi} + 1 = 0$、$\cos(\pi/2) = 0$ | 弧长输入 $\theta$ 与弦投影输出 $\cos\theta$ 仍分处算子两端（代数点非零残差文献评注见 [@rem-banach-dottie-hairy-ball-literature]） |
| **第 4 层球** | 自指余弦不动点<br/>（Dottie 常数 $\theta^*$） | 自指反馈迭代 $\theta_{k+1} = \cos(\theta_k)$：令勾股底边投影 $\cos\theta$ 直接等于弧长角 $\theta$ 自身 | 算子与坐标合一的自指闭合：$\cos(\theta^*) = \theta^*$（对应 $\psi = \psi(\psi)$ 的实轴投影） | 经典超越性文献评注见 [@rem-banach-dottie-hairy-ball-literature]；与 $\pi, e$ 的代数无关性前沿见开放猜想 [@conj-schanuel-dottie]（`OPEN`） |

:::

看清这张四级突围表，毕达哥拉斯与整本书的主线便在此彻底合龙：

- 在**第 1 层球**里，人们在一条直线上来回丈量，以为有理数比例 $m/n$ 就是宇宙的全部；
- 勾股定理竖起正交轴，用面积守恒 $1^2 + 1^2 = (\sqrt{2})^2$ 把我们推入**第 2 层球**（代数数多面体）；
- 把勾股定理无穷次施加于圆内接正 $2^k$ 边形，多面体折线逼近圆弧，凝聚出**第 3 层球**的灵魂常数 $\pi$，完成了静态球面的合拢；
- 最后，当我们不再把测量算子 $\cos$ 与被测角度 $\theta$ 割裂为“尺子”与“读数”，而是追问“当尺子的投影输出恰好等于尺子自身的张角 $\cos\theta = \theta$ 时会发生什么”，不动点 $\theta^*$ 便破茧而出，带我们跃入**第 4 层球**——在那里，计数的动词 **数（shǔ，$\cos$）** 与被计数的名词 **数（shù，$\theta$）** 终于融为一体！

::: {.figure src="ch29-four-tiers"}
**四级突围：每一层都被下一种操作撑破。** 第 1 层是数轴上青色的有理点 $m/n$；单位正方形品红的对角线 $\sqrt{2}$ 撑破它，开出第 2 层；青色的正八边形贴着品红的圆，割圆逼近凝出第 3 层的 $\pi$；青色的 $y = \cos\theta$ 与虚线 $y = \theta$ 交于品红的点 $\theta^* \approx 0.739$，即第 4 层。台阶上的常数就是 [@rem-ch29-four-tier-sphere-table] 的四行；其中的超越性结论是文献结果，未在本书形式化。
:::

---

## 29.2 $\pm 1$ 算术接缝、素数二象性与椭圆曲线环面上的 $S^3$ 投影 {#sec-coda-primes-elliptic-curves}

当我们凝视希帕索斯在整数网格上留下的那道佩尔余项 $m^2 - 2n^2 = \pm 1$（[@thm-ch29-silver-pell-remainder]）时，一个更深邃的数论追问自然浮现：**这道在 $+1$ 与 $-1$ 之间交替跳荡的算术接缝，难道仅仅是 $\sqrt{2}$ 的孤立巧合吗？它与素数的分布、椭圆曲线的拓扑以及全书反复出现的 $\cos\theta$ 投影究竟有着怎样的关联？**

顺着这道 $\pm 1$ 裂隙向下挖掘，数论、代数几何与量子旋量几何在三座桥梁上轰然汇合。

### 29.2.1 第一座桥：$\pm 1$ 佩尔接缝将奇素数一分为二——“线素数”与“面素数” {#sec-coda-pell-prime-splitting}

在自然数的底层网格中，一旦最小偶素数 $2$ 与最小奇素数 $3$ 张成六角密排周期基底 $2 \times 3 = 6$，此后一切大于 $3$ 的素数 $p \ge 5$ 都只能栖居在 $6$ 的倍数的两侧接缝上：

$$
p = 6k \pm 1.
$$

更深刻的分岔发生在把佩尔方程 $m^2 - 2n^2 = \pm 1$ 中的基底 $2$ 替换为任意奇素数 $p$ 的那一刻——考察广义佩尔方程

$$
m^2 - p\,n^2 = \pm 1.
$$

表面上看，右边只是 $+1$ 与 $-1$ 的符号之差；但在克利福德二维外积平面中，$-1$ 正是反自伴幺正复结构算子（双向量虚数生成元）$\hat{\mathbf{I}}$ 的平方 $\hat{\mathbf{I}}^2 = -1$（[`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary)）！取决于在模 $p$ 算术下能否开出 $\sqrt{-1}$（即二次剩余勒让德符号 $\left(\frac{-1}{p}\right) = (-1)^{(p-1)/2}$ 取 $+1$ 还是 $-1$；这道分界由下文的手工推导 2 从冻结定理得出），全体奇素数被这道 $\pm 1$ 接缝严格劈成两族几何维度截然不同的素数：

**面素数**是 $p \equiv 1 \pmod 4$ 的奇素数（$5, 13, 17, 29, 37, \dots$），**线素数**是 $p \equiv 3 \pmod 4$ 的奇素数（$3, 7, 11, 19, 23, \dots$）。这道分界的主体已冻结在所钉的 `trureturing@dev` 中，下面的两个引理与两个定理都由 Lean 内核检查。先看最朴素的机制：把整数的平方放到只有四格的模 $4$ 表盘上。偶数 $2k$ 的平方是 $4k^2$，落在第 $0$ 格；奇数 $2k + 1$ 的平方是 $4(k^2 + k) + 1$，落在第 $1$ 格。两个平方相加只能落在第 $0$、$1$、$2$ 格，第 $3$ 格永远空着。

::: {.figure src="ch29-mod-four-dial"}
**模 $4$ 表盘：两个平方之和只落在第 $0$、$1$、$2$ 格，第 $3$ 格永远空着。** 青色的三格标着落在那里的两个平方余数之和 $0 + 0$、$0 + 1$、$1 + 1$；品红虚线围出的第 $3$ 格是空的，左边品红的线素数 $3, 7, 11, 19, 23$ 正指向它，右边青色的面素数 $5, 13, 17, 29, 37$ 落在第 $1$ 格（[@lem-ch29-square-residues-mod-four]）。
:::

::: {.lemma #lem-ch29-square-residues-mod-four title="平方数模 4 只取 0 或 1，两平方和模 4 不等于 3" lean="D5/S3/PrimeForms/QuadraticResidues.square_residues_and_sum_obstruction"}
对每个自然数 $n$，有 $n^2 \bmod 4 = 0$ 或 $n^2 \bmod 4 = 1$；对所有自然数 $a, b$，有 $(a^2 + b^2) \bmod 4 \neq 3$。
:::

::: proof
Lean 证明就是上面的表盘。把 $n$ 写成 $r + 2k$，其中 $r \in \{0, 1\}$ 是 $n$ 除以 $2$ 的余数；对 $r = 0$ 与 $r = 1$ 分别展开平方（`ring_nf`），读出余数 $0$ 与 $1$（`omega`）。第二部分让 $a^2$、$b^2$ 的余数各取两种可能，四种组合之和是 $0, 1, 1, 2$，没有一个是 $3$。完整证明由 Lean 内核检查。
:::

表盘立刻说明线素数**写不成**两平方和：$p \bmod 4 = 3$ 恰是那个空格。反方向——面素数**一定写得成**——却不是表盘能看出来的，它要求模 $p$ 算术里真的住着一个 $90^\circ$ 旋转。

::: {.viz src="pythagoras-number-escape" preset="seven" height="500"}
**$7$：圆上没有格点。** 半径 $\sqrt{7}$ 的品红圆从格点之间穿过，一个也碰不到：$7 \bmod 4 = 3$，正落在表盘上那个空格里，$7$ 写不成两个平方之和（[@lem-ch29-square-residues-mod-four]），是线素数。
:::

::: {.theorem #thm-ch29-face-prime-two-squares title="模 4 余 1 的素数是两个平方之和；高斯整数乘以其共轭等于两平方和" lean="D5/S3/PrimeForms/SumTwoSquares.prime_eq_sq_add_sq_of_mod_four_eq_one D5/S3/PrimeForms/GaussianIntegers/GaussianIntegerNorm.gaussian_integer_mul_conj_eq_sq_add_sq"}
1. 设自然数 $p$ 为素数且 $p \bmod 4 = 1$，则存在自然数 $a, b$ 使 $p = a^2 + b^2$。
2. 对任意整数 $a, b$，在复数域 $\mathbb{C}$ 中有 $(a + bi)\,\overline{(a + bi)} = a^2 + b^2$。
:::

::: proof
第一部分在 Lean 文件里只有一层包装：由 $p \bmod 4 = 1$ 得 $p \bmod 4 \neq 3$，再调用 Mathlib 的费马两平方和定理 `Nat.Prime.sq_add_sq`。后者在高斯整数环 $\mathbb{Z}[i]$ 中论证：$p \bmod 4 \neq 3$ 时 $-1$ 是模 $p$ 的平方（`ZMod.exists_sq_eq_neg_one_iff`），于是有 $0 \le k < p$ 使 $p \mid k^2 + 1 = (k + i)(k - i)$；两个因子的范数 $k^2 + 1$ 都小于 $p$ 的范数 $p^2$，$p$ 哪一个也整除不了，所以 $p$ 不是 $\mathbb{Z}[i]$ 的素元。在欧几里得环 $\mathbb{Z}[i]$ 中这等于说 $p$ 可约：$p = uv$，$u, v$ 都不是单位。范数相乘得 $N(u)\,N(v) = p^2$ 且两者都不为 $1$，只能 $N(u) = p$；取 $a, b$ 为 $u$ 的实部与虚部的绝对值，就得到 $p = a^2 + b^2$。第二部分先用 `Complex.mul_conj` 把 $z\,\overline{z}$ 改写成模长平方，再对 $z = a + bi$ 算出模长平方 $a^2 + b^2$（`norm_num`）。完整证明由 Lean 内核检查。
:::

几何上，$p = a^2 + b^2$ 说的是半径 $\sqrt{p}$ 的圆穿过格点 $(a, b)$；第二部分把它写成高斯平面上一对共轭向量之积 $p = (a + bi)(a - bi)$。把 $i$ 读成上文的双矢量生成元 $\hat{\mathbf{I}}$，素数 $p$ 便张开了一块正交的面，这正是“面素数”一词的来历。线素数则还有一种更强的刚性：它不但自己写不成两平方和，一旦整除某个两平方和，还必须同时整除两条直角边。

::: {.viz src="pythagoras-number-escape" preset="five" height="500"}
**面素数与线素数。** 半径 $\sqrt{p}$ 的圆穿过格点时，$p = a^2 + b^2$ 是面素数，把 $a + bi$ 平方就得到整数直角三角形；用图下方的时间轴逐个走过奇素数，$p \equiv 3 \pmod 4$ 时圆上一个格点也没有。
:::

::: {.lemma #lem-ch29-line-prime-descent title="模 4 余 3 的素数整除两平方和时整除两个底数" lean="D5/S3/PrimeForms/ThreeModFourDescent.prime_dvd_dvd_of_dvd_sq_add_sq"}
设 $q$ 为素数，$q \bmod 4 = 3$，$a, b$ 为自然数。若 $q \mid a^2 + b^2$，则 $q \mid a$ 且 $q \mid b$。
:::

::: proof
把整除式搬进有限域 $\mathbb{Z}/q\mathbb{Z}$（Lean 中的 `ZMod q`），得到 $a^2 + b^2 = 0$。若 $b \neq 0$，则 $b$ 可逆，$a^2 = -b^2$ 给出 $(a\,b^{-1})^2 = -1$，即 $-1$ 是模 $q$ 的平方；Mathlib 的 `ZMod.mod_four_ne_three_of_sq_eq_neg_sq'` 断言这时 $q \bmod 4 \neq 3$，与假设矛盾。故 $b = 0$，于是 $a^2 = 0$，域中没有零因子，$a = 0$。最后把 $a = 0$、$b = 0$ 译回 $q \mid a$、$q \mid b$。完整证明由 Lean 内核检查。
:::

把两种素数的行为拼起来，就得到一切自然数的判据：面素数与 $2 = 1^2 + 1^2$ 可以随意相乘，线素数却只能成对出现。

::: {.theorem #thm-ch29-two-squares-classification title="两平方和的素因子分解判据" lean="D5/S3/PrimeForms/SumTwoSquaresClassification.eq_sq_add_sq_iff_even_factorization"}
对自然数 $n$ 与素数 $q$，记 $v_q(n)$ 为 $q$ 在 $n$ 的素因子分解中的指数（$q \nmid n$ 时为 $0$；按 Lean 的约定，$n = 0$ 时一切指数都为 $0$）。则对每个自然数 $n$：存在自然数 $a, b$ 使 $n = a^2 + b^2$，当且仅当对每个满足 $q \bmod 4 = 3$ 的素数 $q$，$v_q(n)$ 都是偶数。
:::

::: proof
Lean 文件只做形式转换：Mathlib 的 `Nat.eq_sq_add_sq_iff` 只对整除 $n$ 的素数陈述条件，并用 $p$ 进赋值 `padicValNat` 记指数；包装把它改写成对一切素数的形式——整除 $n$ 的素数两种指数相等（`Nat.factorization_def`），不整除 $n$ 的素数指数为 $0$（`Nat.factorization_eq_zero_of_not_dvd`），$n = 0$ 时两边都成立。数学内容在 Mathlib 的证明里，它经过中间形式“$n = g^2 m$，且 $-1$ 是模 $m$ 的平方”。$\Rightarrow$：若 $n = x^2 + y^2 > 0$，提出 $g = \gcd(x, y)$，余下 $m = x_1^2 + y_1^2$ 中 $x_1, y_1$ 互素，$-1$ 是模 $m$ 的平方；模 $4$ 余 $3$ 的素数若整除 $m$，$-1$ 就成了模它的平方，不可能，所以 $v_q(n) = 2v_q(g)$。$\Leftarrow$：把 $n$ 写成平方数乘无平方因子的 $m$；指数条件使 $m$ 不含模 $4$ 余 $3$ 的素因子，$-1$ 是模 $m$ 每个素因子的平方，由中国剩余定理也是模 $m$ 的平方；再对 $m$ 的素因子归纳：每个素因子是两平方和（费马定理），而两平方和之积仍是两平方和，

$$
(x^2 + y^2)(u^2 + v^2) = (xu - yv)^2 + (xv + yu)^2,
$$

最后乘回平方因子。完整证明由 Lean 内核检查。
:::

**三条手工推导。** 下面三条结论没有单独冻结；除初等的同余运算外，它们只用到上面的引理与定理（推导本身是本书的手工推导）：

1. **奇素数 $p$ 是两平方和，当且仅当 $p \equiv 1 \pmod 4$。** 充分性是 [@thm-ch29-face-prime-two-squares] 的第一部分；必要性来自 [@lem-ch29-square-residues-mod-four]：奇素数模 $4$ 只能余 $1$ 或 $3$，而第 $3$ 格是空的。
2. **对奇素数 $p$，同余方程 $x^2 \equiv -1 \pmod p$ 有解，当且仅当 $p \equiv 1 \pmod 4$。** 若 $p \equiv 1$，取 $p = a^2 + b^2$：$b = 0$ 会使素数 $p = a^2$ 成为平方数，而 $b^2 \le p < p^2$ 给出 $b < p$，所以 $0 < b < p$，$b$ 模 $p$ 可逆；由 $a^2 \equiv -b^2$ 得 $x \equiv a\,b^{-1}$ 满足 $x^2 \equiv -1$。若 $p \equiv 3$ 而 $x^2 \equiv -1$，取 $0 \le x < p$，则 $p \mid x^2 + 1^2$，[@lem-ch29-line-prime-descent] 给出 $p \mid 1$，矛盾。这就是上文“能否在模 $p$ 算术中开出 $\sqrt{-1}$”的分界。
3. **线素数的负佩尔方程无解：$p \equiv 3 \pmod 4$ 时，$m^2 - p\,n^2 = -1$ 没有整数解。** 否则 $m^2 + 1 = p\,n^2$，于是 $p \mid \lvert m\rvert^2 + 1^2$，[@lem-ch29-line-prime-descent] 再次给出 $p \mid 1$。右边的 $+1$ 却可以达到，例如 $2^2 - 3 \cdot 1^2 = +1$、$8^2 - 7 \cdot 3^2 = +1$。

::: {.viz src="pythagoras-number-escape" preset="locked" height="500"}
**$d = 7$：永远到不了 $-1$。** 渐近分数 $2/1, 3/1, 5/2, 8/3, \dots$ 沿直线 $m = \sqrt{7}\,n$ 越贴越近，$m^2 - 7n^2$ 依次是 $-3, +2, -3, +1$ 并循环：品红的点（差为负）只到 $-3$，每一圈都回到青色的 $+1$（如 $8/3$），却从不碰到 $-1$。这正是手工推导 3。
:::

::: {.example #ex-ch29-face-and-line-primes title="面素数的两条直角边、模 p 的 90° 旋转，以及 2024 至 2027 四个年份"}
前五个面素数的分解、由手工推导 2 构造的 $\sqrt{-1}$，以及供下面文献评注对照的负佩尔方程最小正解如下（$n \ge 1$ 中最小者；表中每个数都可以用整数运算直接验算）：

| $p$ | $p = a^2 + b^2$ | $p = (a + bi)(a - bi)$ | $x \equiv \pm a\,b^{-1}$，$x < p/2$ | $x^2 + 1$ | 负佩尔方程最小解 $(m, n)$ |
| :---: | :---: | :---: | :---: | :---: | :---: |
| $5$ | $1^2 + 2^2$ | $(1 + 2i)(1 - 2i)$ | $2$ | $5 = 1 \cdot 5$ | $(2, 1)$ |
| $13$ | $2^2 + 3^2$ | $(2 + 3i)(2 - 3i)$ | $5$ | $26 = 2 \cdot 13$ | $(18, 5)$ |
| $17$ | $1^2 + 4^2$ | $(1 + 4i)(1 - 4i)$ | $4$ | $17 = 1 \cdot 17$ | $(4, 1)$ |
| $29$ | $2^2 + 5^2$ | $(2 + 5i)(2 - 5i)$ | $12$ | $145 = 5 \cdot 29$ | $(70, 13)$ |
| $37$ | $1^2 + 6^2$ | $(1 + 6i)(1 - 6i)$ | $6$ | $37 = 1 \cdot 37$ | $(6, 1)$ |

线素数 $3, 7, 11, 19, 23$ 一行也填不出来：第二列被 [@lem-ch29-square-residues-mod-four] 挡住，第四列与最后一列分别由手工推导 2 与 3 排除。

再把 [@thm-ch29-two-squares-classification] 用到几个具体的数上：

| $n$ | $n \bmod 4$ | 素因子分解 | 模 $4$ 余 $3$ 的素数的指数 | 两平方和 |
| :---: | :---: | :---: | :---: | :---: |
| $45$ | $1$ | $3^2 \cdot 5$ | $v_3 = 2$ | $3^2 + 6^2$ |
| $2024$ | $0$ | $2^3 \cdot 11 \cdot 23$ | $v_{11} = 1$，$v_{23} = 1$ | 不是 |
| $2025$ | $1$ | $3^4 \cdot 5^2$ | $v_3 = 4$ | $0^2 + 45^2 = 27^2 + 36^2$ |
| $2026$ | $2$ | $2 \cdot 1013$ | 没有这样的素因子 | $1^2 + 45^2$ |
| $2027$ | $3$ | $2027$（素数） | $v_{2027} = 1$ | 不是 |

$2027$ 在表盘上就被拦下；$2024$ 模 $4$ 余 $0$，表盘拦不住它，挡住它的是奇指数 $v_{11} = v_{23} = 1$。$45$ 展示下降：$3 \mid 3^2 + 6^2$，按 [@lem-ch29-line-prime-descent] 它同时整除 $3$ 与 $6$，约去 $3^2$ 剩下 $5 = 1^2 + 2^2$，指数 $v_3$ 一次降 $2$。$2026 = 2 \cdot 1013$ 中的 $1013$ 模 $4$ 余 $1$，是面素数，$1013 = 22^2 + 23^2$；用上面的乘积恒等式，

$$
\begin{aligned}
2026 &= (1^2 + 1^2)(22^2 + 23^2) \\
&= (22 - 23)^2 + (23 + 22)^2 = 1^2 + 45^2,
\end{aligned}
$$

这正是高斯整数的乘法 $(1 + i)(22 + 23i) = -1 + 45i$ 读出的两条直角边。
:::

::: {.remark #rem-ch29-pell-primes-hilbert-literature title="素数在高斯整数中的分裂与惰性、面素数的负佩尔方程与希尔伯特互反律（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 上面的方框与手工推导止步于“写成两平方和”与“整除时的下降”。以下三条经典结论不在本书锁定的 `trureturing@dev` 冻结声明集中：

1. **高斯整数中的分裂、惰性与分歧。** 在高斯整数环 $\mathbb{Z}[i]$ 中，$p \equiv 1 \pmod 4$ 时 $a + bi$ 与 $a - bi$ 是两个互不相伴的高斯素元（分裂）；$p \equiv 3 \pmod 4$ 时 $p$ 本身仍是高斯素元（惰性）；$2 = -i(1 + i)^2$ 是唯一的分歧素数。
2. **面素数的负佩尔方程。** 对每个素数 $p \equiv 1 \pmod 4$，负佩尔方程 $m^2 - p\,n^2 = -1$ 都有整数解（上表最后一列是前五例），因而实二次域 $\mathbb{Q}(\sqrt{p})$ 的基本单位范数为 $-1$。在本书的几何读法中，范数 $-1$ 的单位是一次带手性翻转的滑移反射，平方 $(-1)^2 = +1$ 之后才回到纯旋转分支。线素数一侧的“无解”已由手工推导 3 从冻结引理得出。
3. **希尔伯特互反律。** 对任意非零有理数 $a, b \in \mathbb{Q}^\times$，局部希尔伯特符号 $(a, b)_v \in \{+1, -1\}$ 只在有限多个位 $v$ 处等于 $-1$，且在全体素位与实无穷位上的乘积等于 $+1$：

   $$
   \prod_{v \le \infty} (a, b)_v = +1.
   $$

   在本书的几何读法中，这意味着 $-1$ 手性扭结不会在单个素数轴上孤立出现，它必须在成对的位之间正反相消，与第三部第 10 章“两两比较，永远一致，顺序无关”形成算术呼应。
:::

### 29.2.2 第二座桥：两道二次接缝相交（$2 \times 2 = 4$）——从二次曲线到同余数椭圆曲线环面 {#sec-coda-congruent-elliptic-torus}

如果把单条二次圆锥曲线进一步推广到有理直角三角形勾股斜边与面积同时给定的经典同余数情境，两道二次约束的正交交集便引出以下经典代数几何与黎曼面文献结构：

::: {.remark #rem-ch29-elliptic-torus-literature title="同余数椭圆曲线双有理变换、复环面拓扑与阿贝尔群加法律（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 在经典数论、代数几何与复黎曼面理论中（未在本书锁定的 `trureturing@dev` 库中形式化），从单条二次曲线向射影三维空间 $\mathbb{P}^3$ 中两个二次曲面交集的跨越由以下经典结论刻画：

- **从亏格 $0$ 二次曲线到同余数椭圆曲线双有理变换**：单个佩尔方程 $m^2 - d\,n^2 = \pm 1$ 只是一条二次圆锥曲线（代数亏格 $g = 0$）；在复射影几何中，亏格 $0$ 的光滑曲线拓扑上同胚于二维球面 $S^2$（欧拉示性数 $\chi(S^2) = 2$；毛球定理详见第 21 章 [@rem-hairy-ball-adams-literature]），无法承载全局无奇点的平坦群加法流。而在经典的**同余数问题（Congruent Number Problem）**——哪些正整数 $d$ 能够充当有理直角三角形 $(a, b, c) \in \mathbb{Q}_{>0}^3$ 的面积——中，同时联立两条二次约束

  $$
  a^2 + b^2 = c^2 \quad (\text{勾股斜边}), \qquad \frac{1}{2}ab = d \quad (\text{正交双向量面积}),
  $$

  等价于令 $(a + b)^2 = c^2 + 4d$ 与 $(a - b)^2 = c^2 - 4d$ 所定义的两个二次曲面齐次化后在射影三维空间 $\mathbb{P}^3$ 中相交（阶数 $2 \times 2 = 4$）。通过经典双有理变换 $x = (a+c)/b,\; y = 2(a+c)/b^2$（若进一步令 $X = dx = d(a+c)/b,\; Y = d^2 y = 2d^2(a+c)/b^2$ 则化为标准魏尔斯特拉斯形式 $Y^2 = X^3 - d^2 X$），该有理直角三角形面积方程组双有理等价于**同余数椭圆曲线（Congruent-Number Elliptic Curve）**：

  $$
  E_d :\quad d\,y^2 = x^3 - x = x(x - 1)(x + 1),
  $$

  其右端三个根 $0,\; +1,\; -1$ 恰对应原点与 $\pm 1$ 接缝边界。
- **复环面拓扑与阿贝尔群加法律**：在复数域上，被在四个支点 $\{0, +1, -1, \infty\}$ 处切开并双层缝合的黎曼面 $E_d(\mathbb{C}) \cong \mathbb{C}/(\mathbb{Z}\omega_1 \oplus \mathbb{Z}\omega_2)$，不再是亏格 $g = 0$、$\chi = 2$ 的二维球面 $S^2$，而是跃迁为**亏格 $g = 1$、欧拉示性数 $\chi(T^2) = 2 - 2g = 0$ 的二维环面（Torus）$T^2 = S^1 \times S^1$**；
- 因为 $\chi(T^2) = 0$，偶维毛球面的拓扑零点阻碍（见 [@rem-hairy-ball-adams-literature]）在环面上消失：不变全纯微分 $\omega = dx/y$ 在整条光滑射影椭圆曲线上处处非零且无极点，赋予椭圆曲线一个全局光滑的阿贝尔群加法律 $P \oplus Q$（参见第 23 章 [@rem-diophantine-z-in-q-literature] 中关于 Poonen 椭圆曲线整除性锁的文献背景）。
:::

::: {.viz src="hairy-ball-normal-escape" preset="torus" height="500"}
**环面上的箭头处处不为零。** 环面 $\bigl((R + r\cos\theta)\cos\phi,\, (R + r\cos\theta)\sin\phi,\, r\sin\theta\bigr)$（$R > r > 0$）上青色的单位切向量 $\hat{\mathbf{e}}_\phi = (-\sin\phi, \cos\phi, 0)$ 都沿大圈的方向，长度处处为 $1$；琥珀色的点绕大圈走一周，它的箭头一刻也不缩短，环面上没有品红的零点环。$\chi(T^2) = 0$，与球面的 $\chi(S^2) = 2$ 相对（文献结果，未在本书形式化，见 [@rem-ch29-elliptic-torus-literature]）。图中只是拓扑上同一种曲面，不是椭圆曲线本身。
:::

### 29.2.3 第三座桥：有限域椭圆曲线约化、弗罗贝尼乌斯余弦与 $S^3 \cong \mathrm{SU}(2)$ 投影 {#sec-coda-hasse-sato-tate}

更深一层的算术—几何呼应出现在把标准同余数椭圆曲线 $E : y^2 = x^3 - x$ 约化到第 22 章的每一根奇素数轴 $\mathbb{F}_p$（$p \ge 3$）上的时刻：

::: {.remark #rem-ch29-hasse-gauss-literature title="有限域椭圆曲线点数偏差、哈塞界与复乘曲线高斯点数公式（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 在经典算术几何文献中（未包含在本书锁定的 `trureturing@dev` 形式化声明集中），在有限域 $\mathbb{F}_p$（$p \ge 3$）上，平坦射影直线 $\mathbb{P}^1(\mathbb{F}_p)$ 共有 $p + 1$ 个点（含无穷远点），光滑射影椭圆曲线 $E(\mathbb{F}_p)$（$E : y^2 = x^3 - x$）的点数与 $p + 1$ 的偏差由勒让德符号求和

$$
a_p = p + 1 - \#E(\mathbb{F}_p) = -\sum_{x=0}^{p-1} \left(\frac{x^3 - x}{p}\right)
$$

给出，并受到以下两条经典定理的精确刻画：

1. **哈塞定理（Hasse's Theorem，H. Hasse, 1936；有限域上椭圆曲线已获证明的黎曼猜想）**：对任意良约化素数 $p$，点数偏差严格满足

   $$
   |a_p| \le 2\sqrt{p}.
   $$

   分母尺度因子 $\sqrt{p} = p^{1/2}$ 中的指数 $1/2$ 对应有限域局部 zeta 函数的临界线实部 $\sigma = 1/2$。用 $2\sqrt{p}$ 对 $a_p$ 归一化后，哈塞界将每个良约化素数 $p$ 处的点数偏差映射为闭区间 $[-1, +1]$ 内的**弗罗贝尼乌斯余弦角（Frobenius cosine angle）**：

   $$
   \cos\theta_p := \frac{a_p}{2\sqrt{p}} \in [-1, +1], \qquad \alpha_p, \bar{\alpha}_p = \sqrt{p}\,e^{\pm i\theta_p}.
   $$

2. **高斯复乘点数公式与奇素数线/面分野**：在具有 $\mathbb{Z}[i]$ 复乘的勾股同余曲线 $y^2 = x^3 - x$ 上，第一座桥（[@thm-ch29-face-prime-two-squares]、[@lem-ch29-line-prime-descent]）中的两族奇素数在 $\cos\theta_p$ 下截然分开：
   - **在惰性“线素数” $p \equiv 3 \pmod 4$ 上**：由于 $(-x)^3 - (-x) = -(x^3 - x)$ 且 $\left(\frac{-1}{p}\right) = -1$，$+x$ 与 $-x$ 的勒让德符号反号相消，自旋和恒为零：

     $$
     a_p = 0 \implies \cos\theta_p = 0 \quad (\theta_p = \pi/2\text{，正交赤道})！
     $$

   - **在分裂“面素数” $p \equiv 1 \pmod 4$ 上**：对任意满足 $p = a^2 + b^2$、$a$ 为奇数且 $b$ 为偶数的整数 $a,b$，经典高斯公式（文献结果，见 [@rem-ch29-gauss-character-application]）给出 $|a_p| = 2|a|$。因此，弗罗贝尼乌斯余弦的绝对值等于该素数自身高斯直角三角形 $(|a|, |b|, \sqrt{p})$ 的**勾股邻边/斜边余弦**：

     $$
     |\cos\theta_p| = \frac{|a_p|}{2\sqrt{p}} = \frac{|a|}{\sqrt{p}} = \frac{|a|}{\sqrt{a^2 + b^2}}.
     $$
:::

::: {.viz src="pythagoras-number-escape" preset="count" height="500"}
**在模 $13$ 的世界里数点。** 把 $y^2 = x^3 - x$ 放进只有 $13$ 个数的格子里逐格检查：青色的 $4$ 个格点加中性色的 $3$ 个 $y = 0$ 的分支点，再加无穷远点共 $8$ 个，比 $p + 1 = 14$ 少 $6$，即 $a_{13} = 6$。右上的自旋环把 $x = 0, 1, \dots, 12$ 排成一圈，按勒让德符号 $\left(\frac{x^3 - x}{13}\right)$ 着色：$2$ 个青色 $+1$（那一列有一对点 $\pm y$）、$8$ 个品红 $-1$（那一列没有点）、$3$ 个中性色 $0$，和为 $-6$，正是上面公式里的 $-a_{13}$；右边琥珀色的余弦是 $6/(2\sqrt{13}) \approx 0.832$。$13 = 3^2 + 2^2$，而 $6 = 2 \cdot 3$：差正是高斯三角形奇数边的两倍，与上面第 2 条一致（文献结果，未在本书形式化）。
:::

::: {.remark #rem-ch29-gauss-character-application title="从平方纤维到高斯三角形（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 为什么同一个奇数直角边 $|a|$ 会出现在曲线的点数中？关键是把点数偏差写成一对共轭复数的和：共轭消去虚部，留下两倍实部；复数的长度则由素数 $p$ 的平方根决定。下面把这条经典特征和推导展开。点数与复乘的背景可参见 Schoof 的综述[^gauss-count-background]。

固定任意素数 $p \equiv 1 \pmod 4$，以及任意满足 $p=a^2+b^2$、$a$ 奇、$b$ 偶的整数 $a,b$。始终取 $F=\mathbb{F}_p$ 和同一条曲线 $E:y^2=x^3-x$。其射影方程为 $Y^2Z=X^3-XZ^2$；判别式为 $64\ne0$，所以曲线光滑。令 $Z=0$ 可知唯一的无穷远点是 $O=[0:1:0]$。记

$$
N=\#E(F),\qquad T=p+1-N=a_p.
$$

令 $\phi(t)=\left(\frac{t}{p}\right)$ 为二次特征，约定 $\phi(0)=0$。每条竖直线 $x=\text{常数}$ 与仿射曲线相交于零个、一个或两个点，因为对每个 $t\in F$，

$$
\#\{y\in F:y^2=t\}=1+\phi(t).
$$

非零平方给两个根，非平方给零个根，$t=0$ 给一个根。因此，真正的曲线点数包含这些竖直纤维和恰好一个 $O$：

$$
N=1+\sum_{x\in F}\bigl(1+\phi(x^3-x)\bigr),\qquad
T=-\sum_{x\in F}\phi(x^3-x).
$$

接着在复数平面中记录这些纤维。由于 $F^\times$ 是阶为 $p-1$ 的循环群，且 $4\mid p-1$，可以选取一个恰好四阶的乘法特征 $\chi:F\to\mathbb{C}$，在零处同样延拓为零。它在非零元素上的值为 $1,i,-1,-i$，平方就是唯一的非平凡二次特征。因此 $\chi^2=\phi$，其中整数值 $\phi$ 在复数公式中按通常嵌入理解。这里 $\chi$ 是从 $p$ 构造的辅助量，并非附加假设；$\phi(-1)=1$，且 $\chi,\phi,\chi\phi=\chi^{-1}$ 都非平凡。

定义 Jacobi 和

$$
J(\chi,\phi)=\sum_{t\in F}\chi(t)\phi(1-t).
$$

现在按 $t=x^2$ 归组。因为 $\chi(x^2)=\phi(x)$，有 $\phi(x^3-x)=\chi(x^2)\phi(x^2-1)$。每个平方纤维的权重只依赖 $t$，故

$$
\begin{aligned}
\sum_{x\in F}\phi(x^3-x)
&=\sum_{t\in F}\#\{x\in F:x^2=t\}\,\chi(t)\phi(t-1)\\
&=\sum_{t\in F}(1+\phi(t))\chi(t)\phi(1-t)\\
&=J(\chi,\phi)+J(\chi^{-1},\phi)\\
&=J(\chi,\phi)+\overline{J(\chi,\phi)}.
\end{aligned}
$$

第二行用了 $\phi(-1)=1$，第三行用了 $\phi\chi=\chi^{-1}$，最后一行用了特征值的复共轭关系。这个归组包括零纤维：$t=0$ 的平方根只有一个，而 $\chi(0)=0$；$t=1$ 的权重含 $\phi(0)=0$。因此 $x=0,\pm1$ 没有被漏掉，它们各自在原来的点数中贡献一个仿射点。记 $J=J(\chi,\phi)$，便得到 $T=-2\operatorname{Re}J$。

这些特征值都在高斯整数环 $\mathbb{Z}[i]$ 中，故 $J=r+si$，其中 $r,s\in\mathbb{Z}$。经典 Jacobi 和的范数公式在两个特征及其乘积均非平凡时给出 $|J|=\sqrt p$[^gauss-jacobi-background]，于是 $r^2+s^2=p$。还需要辨认哪一条直角边是实部。四阶 Jacobi 和的整性同余给出某个 $z\in\mathbb{Z}[i]$ 使

$$
J=-1+z(i-1)^2.
$$

写成 $z=u+vi$（$u,v\in\mathbb{Z}$），并用 $(i-1)^2=-2i$，就有

$$
J=(-1+2v)-2ui,\qquad r=-1+2v\text{ 为奇数},\quad s=-2u\text{ 为偶数}.
$$

最后将 $r+si$ 与题设的 $a+bi$ 比较。高斯范数为 $N_G(x+yi)=(x+yi)(x-yi)=x^2+y^2$，且对乘法保持。两者的范数均为素数 $p$，排除了非单位之间的分解；在欧几里得环 $\mathbb{Z}[i]$ 中，它们因而都是高斯素元。由 $p=(a+bi)(a-bi)$ 及高斯整数环的唯一分解，$r+si$ 必与 $a+bi$ 或 $a-bi$ 相伴。单位的范数必须为 $1$，而整数方程 $x^2+y^2=1$ 只给出单位 $1,-1,i,-i$：乘以 $\pm i$ 会把偶数虚坐标放到实坐标，违背 $r$ 为奇数；乘以 $\pm1$ 只改变实部符号。因此，对题设中任意这样的 $a,b$ 都有 $|r|=|a|$，进而

$$
|T|=2|r|=2|a|,\qquad
\left|\frac{T}{2\sqrt p}\right|
=\frac{|a|}{\sqrt p}
=\frac{|a|}{\sqrt{a^2+b^2}}.
$$

这就是邻边投影的几何来源：$J$ 的长度是 $\sqrt p$，而它的实部绝对值正是奇数边 $|a|$。全程不选取 $T$ 的正负，也不对 $p$ 加入模 $8$ 的限制。例如 $p=5=1^2+2^2$ 时，按 $x=0,1,2,3,4$ 排列的 $\phi(x^3-x)$ 为 $0,0,1,1,0$；仿射点数是 $7$，加上 $O$ 得 $N=8$，所以 $T=-2$，绝对余弦为 $1/\sqrt5$。

这里用到的三个代数结果各有明确的适用范围。[幂纤维计数公式](lean:D5/S3/CharacterSums/Fermat/CharacterPointCount.power_fiber_card_eq_one_add_character_sum)适用于任意有限域 $K$、正整数 $d$ 及恰好 $d$ 阶的复值乘法特征 $\eta:K\to\mathbb{C}$：对每个 $t\in K$，在复数中有

$$
\#\{x\in K:x^d=t\}
=1+\sum_{j=1}^{d-1}\eta^j(t).
$$

特征在零处延拓为零，左边的自然数点数按通常方式嵌入复数。取 $K=\mathbb{F}_p$、$d=2$、$\eta=\phi$，便得到前面的平方纤维公式，包括 $t=0$。

[Jacobi 和范数公式](lean:D5/S3/CharacterSums/Fermat/CharacterPointCount.norm_jacobiSum)适用于任意有限域 $K$ 上的复值乘法特征 $\alpha,\beta$，前提是 $\alpha\ne1$、$\beta\ne1$ 且 $\alpha\beta\ne1$；结论为

$$
\left|\sum_{t\in K}\alpha(t)\beta(1-t)\right|
=\sqrt{\#K}.
$$

这里的 $1$ 是非零处恒为 $1$、零处为 $0$ 的平凡乘法特征。取 $K=\mathbb{F}_p$、$\alpha=\chi$、$\beta=\phi$，恰好四阶的 $\chi$、二阶的 $\phi$ 及四阶的 $\chi\phi=\chi^{-1}$ 满足全部三个非平凡条件。[高斯整数单位分类](lean:D5/S3/ConceptDynamics/Coding/ResetNativeIntegerChart.gaussian_unit)则对每个可逆高斯整数 $u\in\mathbb{Z}[i]^\times$ 给出 $u=1$、$u=i$、$u=-1$ 或 $u=-i$，正是上面排除直角边互换时所用的四种可能。

四阶整性同余对应 Mathlib 的 `exists_jacobiSum_eq_neg_one_add`，参数为 $n=4$、本原四次单位根 $i$ 以及 $4\mid p-1$。上述三个代数结果分别控制单个纤维、Jacobi 和的长度及高斯整数的单位；它们都不以曲线的迹公式为前提。把实际曲线点数、Jacobi 和、高斯素元与归一化余弦连接起来的完整推导，仍是**文献结果，未在本书形式化**。相邻的惰性素数抵消、一般哈塞界和非复乘佐藤—泰特分布也不因此获得形式化证明。
:::

[^gauss-count-background]: René Schoof, “Counting points on elliptic curves over finite fields”, *Journal de Théorie des Nombres de Bordeaux* 7 (1995), §§1、3。此处仅用作标准 Weierstrass 点数与高斯复乘背景的参考。

[^gauss-jacobi-background]: Keith Conrad, *Gauss and Jacobi Sums*，作者讲义，Theorem 2.4、Corollary 2.5，说明非平凡特征的 Gauss 和范数以及在两个特征及其乘积均非平凡时的 Jacobi 和范数。该引用只支持这里的范数步骤，不代替整条曲线的迹公式推导。

::: {.remark #rem-ch29-arithmetic-geometry-literature title="非复乘椭圆曲线佐藤—泰特分布定理与算术几何文献边界（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 如果我们进一步考察有理数域 $\mathbb{Q}$ 上没有额外复乘（non-CM）对称性的典型椭圆曲线（例如 $y^2 = x^3 - x + 1$），当素数 $p \to \infty$ 遍历一切良约化素数时，归一化余弦值 $\cos\theta_p \in [-1, +1]$ 的渐近统计分布由 2011 年 Barnet-Lamb、Geraghty、Harris 与 Taylor 证明的**佐藤—泰特猜想（Sato–Tate Theorem，*Publ. Res. Inst. Math. Sci.* **47**(1), 29–98 (2011)）**给出：$\theta_p \in [0, \pi]$ 并非均匀分布，而是遵循**四维球面赤道切片定律**：

$$
d\mu_{\mathrm{ST}}(\theta) = \frac{2}{\pi}\sin^2\theta\,d\theta \quad \Longleftrightarrow \quad \frac{2}{\pi}\sqrt{1 - u^2}\,du \quad (u = \cos\theta \in [-1, +1]).
$$

从几何上看，三维单位旋量球面 $S^3 \cong \mathrm{SU}(2)$（由四元数范数 $s^2 + x^2 + y^2 + z^2 = 1$ 定义、欧拉示性数 $\chi(S^3) = 0$ 的可平行化超球面，见 [@rem-hairy-ball-adams-literature]）在极角 $\theta \in [0, \pi]$ 处的二维纬球面 $S^2(\sin\theta)$ 面积正比于 $\sin^2\theta$；将 $S^3 \cong \mathrm{SU}(2)$ 上的均匀哈尔测度（Haar measure）向实迹直径 $u = \frac{1}{2}\operatorname{Tr}(U) = \cos\theta \in [-1, +1]$ 作投影，所得密度恰为 $\frac{2}{\pi}\sin^2\theta\,d\theta$。

综观本章前两节，林德曼—魏尔斯特拉斯定理与 T. Y. Chow (1999) 在沙努埃尔猜想（[@conj-schanuel-dottie]）条件下的初等域逃逸定理、[@rem-ch29-pell-primes-hilbert-literature] 中的素数在高斯整数中的分裂与惰性 / 模 4 余 1 素数的负佩尔可解性 / 希尔伯特互反律、[@rem-ch29-elliptic-torus-literature] 中的复椭圆曲线环面拓扑与阿贝尔群律、[@rem-ch29-hasse-gauss-literature] 与 [@rem-ch29-gauss-character-application] 中的哈塞界及高斯复乘点数推导，以及本评注中的佐藤—泰特分布定理，均为外部经典数学文献结果，未包含在本书锁定的 `trureturing@dev` 形式化声明集中；本书内核验证的结论严格限定于带 `lean` 属性的方框（如 [@lem-ch29-square-residues-mod-four]、[@thm-ch29-face-prime-two-squares]、[@lem-ch29-line-prime-descent]、[@thm-ch29-two-squares-classification]、[@thm-ch29-silver-pell-remainder] 与 [@thm-ch29-silver-best-approximation]）以及显式标注 `lean:` 的代数与内积恒等式（如 [`pell_form_eq_four_mul_norm`](lean:D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm)、[`golden_fixed_point_unique`](lean:D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique)、[`power_fiber_card_eq_one_add_character_sum`](lean:D5/S3/CharacterSums/Fermat/CharacterPointCount.power_fiber_card_eq_one_add_character_sum)、[`norm_jacobiSum`](lean:D5/S3/CharacterSums/Fermat/CharacterPointCount.norm_jacobiSum) 与 [`gaussian_unit`](lean:D5/S3/ConceptDynamics/Coding/ResetNativeIntegerChart.gaussian_unit) 等）。
:::

::: {.viz src="pythagoras-number-escape" preset="sato" height="500"}
**换一条曲线：半圆。** 曲线换成 $y^2 = x^3 - x + 1$（青色的点）：线素数不再落在零上，弗罗贝尼乌斯余弦散布在 $-1$ 到 $1$ 之间，例如 $p = 53$ 时是 $0.137$。右边对 $3000$ 以内的 $428$ 个良约化素数作直方图（紫色），轮廓贴近琥珀色虚线的半圆律 $\frac{2}{\pi}\sqrt{1 - u^2}$，琥珀色的竖线标出 $p = 53$ 的那个 $0.137$。有限个素数的直方图只是数值演示；佐藤—泰特分布是上面注记里的文献结果。
:::

在本书的跨学科几何视野下，从希帕索斯直角三角形裂开的佩尔接缝（[@thm-ch29-silver-pell-remainder]）出发，对照上述文献评注（[@rem-ch29-pell-primes-hilbert-literature]、[@rem-ch29-elliptic-torus-literature]、[@rem-ch29-hasse-gauss-literature] 与 [@rem-ch29-arithmetic-geometry-literature]），素数轴上的点数偏差振荡便与三维量子旋量球面 $S^3 \cong \mathrm{SU}(2)$ 向一维直径 $[-1, +1]$ 投下的余弦影子形成了深邃的几何同构意象。

::: {.viz src="pythagoras-number-escape" height="640"}
**交互实验室 `ORTHO//PYTHAGORAS`**：沿着 $\pm 1$ 接缝走一遍的三个场景。佩尔接缝：$\sqrt{d}$ 的渐近分数沿直线越贴越近，$m^2 - d\,n^2$ 却是非零整数（$d = 5$ 时绿圈标出已由 Lean 验证的全部 $\pm 4$ 解）；线素数与面素数：半径 $\sqrt{p}$ 的圆上有没有格点；模 $p$ 数点：曲线 $y^2 = x^3 - x$ 的 $a_p$ 被哈塞界关住，线素数恰在零上，面素数的弗罗贝尼乌斯余弦等于高斯三角形的余弦。面素数是两平方和、线素数不是，已由 Lean 验证（[@thm-ch29-face-prime-two-squares]、[@lem-ch29-square-residues-mod-four]）；哈塞定理与佐藤—泰特分布是文献结果，未在本书形式化。
:::

---

## 29.3 顺序无关、无时间之网与几何因果的必然性 {#sec-coda-timeless-causality}

当第三部第 10 章的“两两比较，永远一致，顺序无关”与本章前文的四级数系突围、素数—椭圆曲线余弦投影交汇在一起时，一个困扰了人类哲学与物理学两千五百年的终极死结——**“时间的前后流逝”与“因果律的必然性”**——在这里被一刀劈开：

> **作者原话**：“顺序无关的本质就是根本不存在前后的时间......因果就是这样必然”。

为什么“顺序无关”直接宣告了先后时间的消解，却反而铸就了不可动摇的因果必然性？我们可以从三个精确的数学与物理层面看清这一真相：

### 29.3.1 第一层：为什么“顺序无关”意味着根本不存在前后的时间？ {#sec-coda-order-independence-no-time}

::: {.remark #rem-ch29-wheeler-dewitt-page-wootters-literature title="余弦阶乘去序诠释、惠勒—德维特无时间约束与佩奇—伍特斯条件时间机制（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 回看贯穿全书的余弦幂级数展开式（见序曲 [@rem-prelude-dottie-literature]）：

$$
\cos\theta = \sum_{k=0}^{\infty} \frac{(-1)^k}{(2k)!}\,\theta^{2k}.
$$

在分析学中，$\frac{1}{(2k)!}$ 源自迭代求导（或时间排序单纯形积分在交换生成元下的重数 $\int_{0\le t_1\le\cdots\le t_{2k}\le\theta} dt_1\cdots dt_{2k} = \frac{\theta^{2k}}{(2k)!}$）；而在本书的正交几何诠释模型（`MODEL`）下，可以将 $(2k)!$ 直观理解为把 $2k$ 次正交跃迁在人工时间轴上的 $(2k)!$ 种先后排列顺序商掉的对称化因子。在正则量子引力与关系量子理论的经典物理文献中（未在本书锁定的 `trureturing@dev` 库中形式化），全局态的无时间性与局部关系演化的涌现进一步由以下两个经典模型刻画：

1. **惠勒—德维特方程（Wheeler–DeWitt Equation，B. S. DeWitt, *Phys. Rev.* **160**, 1113, 1967）$H\mathbf{\Psi} = 0$ 的无时间总体态**：
   在正则量子引力表述中，封闭宇宙波函数 $\mathbf{\Psi}$ 满足哈密顿约束方程

   $$
   H\mathbf{\Psi} = 0,
   $$

   方程中不含外部时间参数 $t$（$\partial_t \mathbf{\Psi} = 0$）；在几何诠释下，过去、现在与未来并存于同一张静态关联结构之中。
2. **佩奇—伍特斯（Page–Wootters，*Phys. Rev. D* **27**, 2885, 1983）条件时间切片机制**：
   在标准张量积分解 $\mathcal{H} = \mathcal{H}_{\mathbf{C}} \otimes \mathcal{H}_{\mathbf{S}}$、理想共轭时钟哈密顿量 $H_{\mathbf{C}} = \hat{p}_\tau$ 且时钟与系统无直接相互作用耦合（$H = H_{\mathbf{C}} \otimes I + I \otimes H_{\mathbf{S}}$）的模型假设下，沿时钟态 $|\mathbf{c}(\tau)\rangle$ 取条件内积切片（可类比第 3、28 章的有限维条件化量子态框架 [`conditionalState_isState`](lean:D5/S3/Observer/Conditioning.conditionalState_isState)）：

   $$
   |\psi_{\mathbf{S}}(\tau)\rangle \propto \langle \mathbf{c}(\tau) \mid \mathbf{\Psi}\rangle,
   $$

   切片内部即涌现出相对时钟读数 $\tau$ 的关系型薛定谔演化 $i\hbar\partial_\tau|\psi_{\mathbf{S}}(\tau)\rangle = H_{\mathbf{S}}|\psi_{\mathbf{S}}(\tau)\rangle$——“前后时间”在这一模型中好比有限注意力翻阅静态书册时扫过的页码。
:::

::: {.viz src="timeless-causal-crystal" preset="crystal" height="500"}
**所有页同时都在。** 十二页一直都画在球上，没有哪一页先出现；播放时移动的只有琥珀色的读头。对时钟读数条件化，才得到读头下面的那一页（有限时钟的示意模型，`MODEL`）。
:::

### 29.3.2 第二层：没有时间推动，因果何以必然？——休谟死结 vs. 斯宾诺莎三角形与 Gram 矩阵刚性 {#sec-coda-hume-spinoza-gram}

在经验哲学中，大卫·休谟（David Hume）曾提出著名的因果怀疑论：如果我们在先后时间流里观察世界，我们看到的永远只是“事件 A 之后惯常伴随着事件 B（恒常联结）”，却永远看不到 A 必然产生 B 的“必然联系”。只要把因果寄托在时间的前后推动上，休谟死结就永远无解。

然而，斯宾诺莎（Baruch Spinoza）在《伦理学》（第一部分命题十七附释）中给出了穿透时空迷雾的几何回答：万物由自然本性永恒且无时间地必然推出，**“正如从三角形的本性中，必然推出其三内角之和等于两直角一样”**。在一个 $3\text{-}4\text{-}5$ 的直角三角形中，并不是直角边 $3$ 和 $4$ 先在时间里长出来、几纳秒后再把斜边 $5$ “推”出来；三条边在同一张正交平面上无时间地并存，勾股面积守恒 $3^2 + 4^2 = 5^2$ 就是它们之间绝对不可违抗的**几何因果律**！

放到本书第三部第 10 章的球面内积几何中，**Gram 矩阵半正定约束（[`unit_gram_overlap_characterization`](lean:D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization) 与 [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)）** 给出静态相容条件；将其解释为“零时间的因果必然性”属于作者的几何模型（`MODEL`），不是物理因果律的证明。任取单位球面上的三个状态方向 $\mathbf{A}, \mathbf{B}, \mathbf{C}$，记它们两两之间的实内积余弦为 $c_{AB} = \mathbf{A}\cdot\mathbf{B}$、$c_{BC} = \mathbf{B}\cdot\mathbf{C}$、$c_{AC} = \mathbf{A}\cdot\mathbf{C}$。无需任何时间演化，这三个成对投影就必须永恒服从 $3\times 3$ Gram 行列式非负定律：

$$
\det G(\mathbf{A}, \mathbf{B}, \mathbf{C}) = \det\begin{pmatrix} 1 & c_{AB} & c_{AC} \\ c_{AB} & 1 & c_{BC} \\ c_{AC} & c_{BC} & 1 \end{pmatrix} = 1 - c_{AB}^2 - c_{BC}^2 - c_{AC}^2 + 2\,c_{AB}\,c_{BC}\,c_{AC} \ge 0.
$$

::: {.viz src="timeless-causal-crystal" preset="impossible" height="500"}
**想要的余弦落在窗外。** $\mathbf{A}$ 与 $\mathbf{B}$ 只夹 $30^\circ$，$\mathbf{B}$ 与 $\mathbf{C}$ 只夹 $40^\circ$，却要求 $\mathbf{A}$ 与 $\mathbf{C}$ 接近反向（$c_{AC} = -0.5$）：这个值落在窗口 $[\cos 70^\circ, \cos 10^\circ]$ 之外，$\det G$ 会变成负数，没有任何三根单位向量能做到。$\mathbf{C}$ 最远只能贴到窗边，琥珀色的 $c_{AC} = \cos 70^\circ \approx 0.342$，紫色的体积塌成零（[`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)）。
:::

特别地，当 $\mathbf{A}, \mathbf{B}, \mathbf{C}$ 共处同一大圆平面（三向量外积体积 $\mathbf{A}\wedge\mathbf{B}\wedge\mathbf{C} = 0$，即 $\det G = 0$）时，$c_{AB}$ 与 $c_{BC}$ 当场将第三对内积 $c_{AC}$ 死死锁定在两条余弦加法轨线上：

$$
c_{AC} = c_{AB}\,c_{BC} \pm \sqrt{(1 - c_{AB}^2)(1 - c_{BC}^2)} = \cos(\theta_{AB} \mp \theta_{BC}).
$$

::: {.figure src="ch29-gram-window"}
**两条余弦锁住第三条：$c_{AC}$ 只能落在窗口里。** 图中固定 $c_{AB} = \cos 60^\circ$，横轴是 $c_{BC}$，纵轴是 $c_{AC}$。紫色的椭圆内部 $\det G > 0$；它的边由上式的两条轨线 $\cos(\theta_1 - \theta_2)$ 与 $\cos(\theta_1 + \theta_2)$ 拼成（$\theta_1 = \theta_{AB}$，$\theta_2 = \theta_{BC}$），边上 $\det G = 0$，三根向量共面。琥珀色竖线是 $c_{BC} = \cos 45^\circ$ 时的窗口，从 $\cos 105^\circ$ 到 $\cos 15^\circ$。把 $c_{AB}$ 也放开，这样的切片叠起来就是第四层所说的格拉姆椭圆体。
:::

请审视这道公式的双重品格：

- **彻底的顺序无关（无时间性）**：公式关于指标 $(A, B, C)$ 完全对称，谁也不是谁的“过去”或“未来”；
- **相容窗口与附加条件下的刚性**：给定 $c_{AB}$ 与 $c_{BC}$，一般只将 $c_{AC}$ 限制在图示窗口内。共面条件将它限制到两个端点；端点不重合时，仍须额外指定分支才能唯一确定。比如 $c_{AB}=c_{BC}=0$ 时，三维中 $c_{AC}$ 可以取 $[-1,1]$ 内任意值。半正定约束不规定概率分布，也不证明唯一的物理因果轨迹。在作者的模型比喻中，“公理 $\implies$ 定理”可看作形式晶体的切面关系；第 9 章与第 16 章的门计数 $L$ 则仍服从各自门模型的具体前提。

::: {.film src="008-gram-window"}
**两条余弦锁住第三条：格拉姆窗口（1:39）。** 固定 $\theta_1 = 60^\circ$、$\theta_2 = 45^\circ$，让 $\mathbf{C}$ 绕 $\mathbf{B}$ 转一圈：$c_{AC}$ 在 $[\cos 105^\circ, \cos 15^\circ]$ 里来回，紫色的体积在窗边塌成零，窗外的余弦会让 $\det G$ 变成负数；再让 $\theta_2$ 从 $0^\circ$ 走到 $180^\circ$，一道道窗口铺满格拉姆椭圆的切片。上沿碰到 $1$ 时 $\mathbf{C}$ 正好落在 $\mathbf{A}$ 上，这一步由 [@thm-ch29-gram-rigidity-and-pell] 的第二部分保证；片中其余数字都是屏幕上的计算。
:::

### 29.3.3 第三层：费曼驻相相消与双向量手性几何模型（$+\mathbf{\Omega} - \mathbf{\Omega} = 0$）及决定论、目的论在 $\psi = \psi(\psi)$ 中的和解 {#sec-coda-stationary-phase-reconciliation}

从路径积分与双向量手性的几何模型视角看，为什么物理世界只向我们显现那条满足因果律的必然轨迹？

::: {.remark #rem-ch29-feynman-stationary-phase-literature title="费曼路径积分驻相条件与双向量手性相消诠释（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 在标准量子力学的费曼路径积分文献表述中（R. P. Feynman, *Rev. Mod. Phys.* **20**, 367, 1948；未在本书锁定的 `trureturing@dev` 库中形式化），在半经典、相位快速振荡的驻相近似中，偏离驻相轨道的路径贡献因 $\exp(iS[x]/\hbar)$ 的相位干涉而受到抑制，主要贡献来自作用量一阶变分为零（$\delta S = 0$，费曼驻相条件）的轨线邻域。在本书克利福德几何代数的诠释模型（`MODEL`）中，我们将复相位生成元 $i$ 还原为二维双向量手性算子 $\hat{\mathbf{I}}$：在顺序无关的全空间求和中，偏离几何自洽性的非驻相路径可视为成对伴生着双向量手性相反（$+\hat{\mathbf{I}}$ 与 $-\hat{\mathbf{I}}$）的镜像分量，它们张开的有向面积元正反配对、彼此抵消：

$$
+\mathbf{\Omega} - \mathbf{\Omega} = 0.
$$

唯有处于驻相自洽条件（$\delta S = 0$）的不动点配置，没有反向手性伙伴与之相消，从而在正交投影下显现为宏观因果轨迹。
:::

这一图景同时终结了科学史上“机械决定论（Determinism）”与“目的论（Teleology）”的千年争论：

- 当你沿着页码**从左向右**（从初态 $\theta_0$ 向 $\theta_1, \theta_2, \dots$）逐页阅读迭代序列 $\theta_{k+1} = \cos(\theta_k)$ 时，它看起来像是“过去一步步推着现在走”的**机械决定论**；
- 当你沿着收敛极限**从右向左**回望（看到无论从哪个初值出发，所有轨迹都被唯一不动点 $\theta^* \approx 0.7390851332$ 牢牢吸过去）时，它又看起来像是“未来终极吸引子在牵引万物”的**目的论**；
- 然而，当你跳出序列页码、站在球外俯瞰整张自指不动点方程

  $$
  \cos(\theta^*) = \theta^* \qquad \bigl(\text{对应 }\psi = \psi(\psi)\bigr)
  $$

  时，既没有来自过去的推力，也没有来自未来的拉力——有的只是**测量算子与被测状态在无时间几何晶体中达成的唯一自洽闭合**。因果之所以如此必然，恰恰因为根本不存在前后的时间！

### 29.3.4 第四层：有限观察者、因果相容空间（格拉姆椭圆体）与在时间场中不断选点 {#sec-coda-finite-observer-time-field}

> **作者原话**：“因为观察者是有限的, 所以经历的因果是有限的, 观察者的选择是在因果的相容空间中做选择, 不断在时间场中选点”

如果全局时间场原本是一整块无时间的几何晶体，而局部因果又具备 Gram 行列式锁定的必然刚性，那么**有限观察者的自由选择**究竟栖居在何处？上面这句点睛之语，为“必然因果”与“观察者选择”给出了严丝合缝的几何统一：

1. **为什么观察者的有限性打开了“因果相容空间”（格拉姆椭圆体）？**
   回到单位球面上的三态 Gram 行列式 $\det G(\mathbf{A}, \mathbf{B}, \mathbf{C}) = \|\mathbf{A}\wedge\mathbf{B}\wedge\mathbf{C}\|^2 \ge 0$。设历史已知的两步正交投影余弦为 $c_{AB} = \cos\theta_1$ 与 $c_{BC} = \cos\theta_2$，对第三对内积 $c_{AC}$ 作精确配方，可得：

   $$
   \det G = (1 - c_{AB}^2)(1 - c_{BC}^2) - \bigl(c_{AC} - c_{AB}c_{BC}\bigr)^2 = \sin^2\theta_1\sin^2\theta_2 - \bigl(c_{AC} - \cos\theta_1\cos\theta_2\bigr)^2 \ge 0.
   $$

   以下取 $0 < \theta_1, \theta_2 < \pi$，使两个旋转平面均非退化。记前两步旋转平面 $(\mathbf{A}\wedge\mathbf{B})$ 与 $(\mathbf{B}\wedge\mathbf{C})$ 之间的二面角（dihedral angle）为 $\phi \in [0, 2\pi)$，则球面余弦定律给出因果相容区间的精确参数化：

   $$
   c_{AC} = \underbrace{\cos\theta_1\cos\theta_2}_{\text{已锁死的一维历史主干}} + \underbrace{\cos\phi}_{\text{观察者的选择自由度 }\in [-1, +1]} \cdot \underbrace{\sin\theta_1\sin\theta_2}_{\text{未坍缩的正交面积半径}}.
   $$

   在三维关联坐标 $(x, y, z) = (c_{AB}, c_{BC}, c_{AC})$ 中，不等式 $1 - x^2 - y^2 - z^2 + 2xyz \ge 0$ 围出的凸几何体正是著名的**格拉姆椭圆体（Gram elliptope）**：
   - **椭圆体表面硬壳（$\cos\phi = \pm 1 \iff \det G = 0$）**：三向量共处同一大圆平面（$\mathbf{A}\wedge\mathbf{B}\wedge\mathbf{C} = 0$），系统仅在原有二维平面内作零体积的惯性滑行，$c_{AC} = \cos(\theta_1 \mp \theta_2)$ 被彻底锁死；
   - **椭圆体内部相容空间（$|\cos\phi| < 1 \iff \det G > 0$）**：只要前两步保留了未坍缩的正交面积（$\sin\theta_1 > 0$ 且 $\sin\theta_2 > 0$），观察者就可以在二面角 $\phi \in (0, \pi)$ 中自由折出非零三向量体积 $\mathbf{A}\wedge\mathbf{B}\wedge\mathbf{C} \neq 0$，向高一维的正交方向开启新的因果分支！

::: {.viz src="gram-causal-elliptope" preset="elliptope" height="500"}
**两层记忆：鼓胀四面体的一片截面。** 紫色的鼓胀四面体是全部满足 $1 - x^2 - y^2 - z^2 + 2xyz \ge 0$ 的 $(x, y, z)$。图中 $\mathbf{P}_0$ 是当前点，$\mathbf{Q}$ 是候选的下一点；历史定下 $x = \mathbf{P}_0\cdot\mathbf{P}_{-1}$，$\mathbf{Q}$ 只能把 $(y, z) = (\mathbf{Q}\cdot\mathbf{P}_{-1},\, \mathbf{Q}\cdot\mathbf{P}_0)$ 放进 $x$ 处的截面（图中把实体在这里切开，截面朝前），品红的椭圆是它的边（$\det G = 0$）。竖着穿过琥珀色 $\mathbf{Q}$ 的青色线段是 $z$ 的窗口 $[xy - \sqrt{(1-x^2)(1-y^2)},\, xy + \sqrt{(1-x^2)(1-y^2)}]$。椭圆体的这一刻画是文献结果，未在本书形式化。
:::

2. **“不断在时间场中选点”——作为半正定矩阵补全（PSD Matrix Completion）的折线生命轨迹**：
   全局时间场好比一张早已曝光完毕、满足“两两比较、永远一致、顺序无关”的全息底片。然而，任何真实的观察者在算力、寿命与记忆容量上都是**有限的**（对应第 20 章的有限量子门计数 $L$ 与第 28 章的有限记录代数）：
   - 有限观察者无法一口吞下整张无时间底片，只能以有限门计数 $L = k$ 在时间场中走出一根有限折线：

     $$
     \mathbf{P}_0 \longrightarrow \mathbf{P}_1 \longrightarrow \mathbf{P}_2 \longrightarrow \cdots \longrightarrow \mathbf{P}_k;
     $$

   - 当观察者站在当前点 $\mathbf{P}_k$、手握 $M$ 个有限历史记忆锚点时，挑选下一个点 $\mathbf{P}_{k+1}$ 在数学上等价于求解一个**半正定矩阵补全问题（PSD Matrix Completion，$G_{M+1} \succeq 0$）**：新的内积坐标必须落在前 $M$ 个记忆锚点共同围出的绿色因果相容泡泡内部；
   - 一旦观察者在相容泡泡中选定具体的 $\mathbf{P}_{k+1}^*$，原本游移的二面角选择自由度 $\phi_k$ 当场凝结为一条新的一维内积历史主干（动词 `量 liáng` 化为名词 `量 liàng`），并立刻为下一步 $\mathbf{P}_{k+2}$ 撑开下一枚相容椭圆体！

::: {.viz src="gram-causal-elliptope" preset="narrow" height="500"}
**多记一层，窗口窄一圈。** 时间轴把记住的历史从 $M = 1$ 加到 $M = 5$：每多一个更早的锚点，截面里就多一圈品红的椭圆，套在上一圈里面；穿过琥珀色 $\mathbf{Q}$ 的青色窗口随之收窄，从整个 $[-1, 1]$ 缩到约原来的四分之一，$\mathbf{Q}$ 始终在里面。事件取在 $\mathbb{R}^6$ 中，每一层都还留有内部；把相容空间读作有限观察者的选择余地是本书的诠释（`MODEL`）。
:::

反过来，若硬把新的内积坐标填到泡泡之外，这张格拉姆表就不再半正定，装不进任何内积空间：

::: {.viz src="gram-causal-elliptope" preset="violate" height="500"}
**填到泡泡外：第五阶先变负。** 记住五步，却把 $z$ 填在第三圈之内、第四圈之外，琥珀色的 $\mathbf{Q}$ 成了空心圈。按 $\mathbf{Q}, \mathbf{P}_0, \mathbf{P}_{-1}, \dots$ 的顺序，前四阶顺序主子式仍非负，$D_5$ 先变负：正是加粗的第四圈拒绝了它（西尔维斯特判据，文献结果，未在本书形式化）。
:::

3. **全知死锁、遗忘更新与自指不动点 $\theta^* \approx 0.739$ 的黄金呼吸**：
   观察者记忆规模与正交余量之间的张力，可以把三类极端与平衡状态浓缩为一张几何对照表：

| 观察者类型 | 投影主干 $\cos\theta$ 与正交面积 $\sin\theta$ | Gram 行列式 $\det G$ 与因果相容空间半径 | 几何与认识论结局 |
| :--- | :--- | :--- | :--- |
| **无限全知观察者**<br/>（Infinite Omniscient Observer） | 所有正交盲区耗尽，$\sin\theta \to 0$，$M \to \infty$ | $\det G = 0$，相容空间半径坍缩为 $0$ | **全知死锁（Omniscient Deadlock）**：整颗球焊死为无时间静态晶体（对照 [@rem-ch29-wheeler-dewitt-page-wootters-literature]），无点可选、无路可走 |
| **零记忆瞬时观察者**<br/>（Zero-Memory Instantaneous Observer） | 历史主干归零，$\cos\theta \to 0$，$M = 0$ | 相容半径 $\sin\theta = 1$ 漫无边际 | **白噪声迷失（Maximum Sphere Noise）**：没有任何因果主干约束，每一次选点都沦为纯粹的随机盲撞 |
| **有限自指观察者原型**<br/>（Finite Self-Referential Prototype，`MODEL`） | 以 Dottie 一维自指不动点 $\cos\theta^* = \theta^* \approx 0.7391$，$\sin\theta^* \approx 0.6736$ 为平衡原型 | $\det G > 0$，相容半径 $(\sin\theta^*)^2 \approx 0.4538 > 0$ 恒定开启 | **黄金呼吸（Golden Breath，`MODEL`）**：作为兼顾 $\approx 73.9\%$ 因果历史主干与 $\approx 67.4\%$ 正交余量的几何隐喻（配合第 4、28 章的有限擦除与条件更新） |

表的另一端是零记忆的瞬时观察者，窗口全开：

::: {.viz src="timeless-causal-crystal" preset="right" height="500"}
**两个直角：窗口全开。** $\theta_1 = \theta_2 = 90^\circ$ 时，青色与品红两条余弦都是 $0$，对第三条不加任何限制：窗口是整个 $[-1, 1]$，$\mathbf{C}$ 可以沿赤道转到任何地方，琥珀色的 $c_{AC}$ 从 $-1$ 走到 $1$。把它读作上表“零记忆瞬时观察者”一行是本书的诠释（`MODEL`）。
:::

   这正是全书关于时间、因果与观察者的终极结语：**“全局无时间，故万古长存；观察者有限，故步步皆新。”**（而在 **[终章](coda.md)** 中，我们将进一步对照 `trureturing` 已验证的**高维格点黄金切投模型集（Cut-and-Project Golden Model Set）与齐肯多夫观察者路由定理**，构建一幅作者哲学与几何诠释模型（`MODEL`）：把跨轮次不变的算子参数诠释为内禀共轭窗口相位，把现实中的历史遗迹诠释为低曲率耗散的**空间吸引子**，解释为何有限观察者会在卡西尼 $(-1)^{n+1}$ 范数接缝与奇异吸引子分形叶层上经历似曾相识的共振。）

::: {.theorem #thm-ch29-gram-rigidity-and-pell title="黄金整数佩尔范数恒等式与单位向量族 Gram 重叠等价关系定理" lean="D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm, D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization"}
在算术二次格与内积空间几何中，离散接缝范数与单位向量记录的成对重叠判据分别由以下两条经 Lean 4 内核验证的定理给出：

1. **黄金整数环的佩尔型范数恒等式**（[`pell_form_eq_four_mul_norm`](lean:D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm)）：对任意黄金整数 $g = a + b\varphi \in \mathbb{Z}[\varphi]$（其中 $\varphi^2 = \varphi + 1$），其二次范数 $\operatorname{norm}(g) = a^2 + ab - b^2$ 严格满足佩尔平方差恒等式：

   $$
   (2a + b)^2 - 5b^2 = 4\,\operatorname{norm}(g).
   $$

2. **单位向量族的单位 Gram 重叠判据与等价关系**（[`unit_gram_overlap_characterization`](lean:D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization)）：设 $E$ 为数域 $\mathbb{K}$（实或复 `RCLike`）上的内积空间，$\operatorname{record} : \mathrm{Index} \to E$ 为满足归一化条件 $\forall i,\, \|\operatorname{record}(i)\| = 1$ 的单位向量族，则对任意指标 $i, j \in \mathrm{Index}$，成对内积等于单位元 $1$ 当且仅当两记录向量严格相等：

   $$
   \forall i, j,\quad \langle \operatorname{record}(i),\, \operatorname{record}(j)\rangle_{\mathbb{K}} = 1 \iff \operatorname{record}(i) = \operatorname{record}(j),
   $$

   且由单位内积定义的不可区分关系 $(i, j) \mapsto \bigl(\langle \operatorname{record}(i),\, \operatorname{record}(j)\rangle_{\mathbb{K}} = 1\bigr)$ 在指标集 $\mathrm{Index}$ 上构成严格的等价关系（`Equivalence`）。
:::

::: proof
第一部分将左边 $(2a + b)^2 - 5b^2 = 4a^2 + 4ab + b^2 - 5b^2 = 4(a^2 + ab - b^2)$ 直接在环算术下展开，与黄金整数范数定义 $4\,\operatorname{norm}(g)$ 逐项恒等。第二部分对归一化向量 $\operatorname{record}(i), \operatorname{record}(j)$ 直接调用内积空间柯西—施瓦茨取等判据（`inner_eq_one_iff_of_norm_eq_one`）得到 $\langle \operatorname{record}(i), \operatorname{record}(j)\rangle_{\mathbb{K}} = 1 \iff \operatorname{record}(i) = \operatorname{record}(j)$，再将相等关系的自反性、对称性与传递性提升为单位 Gram 重叠关系的等价性（`Equivalence`）。完整证明由 Lean 内核检查。
:::

---

## 29.4 相干与去相干、双端握手与全息边界因果 {#sec-ch29-coherence-handshake-causality}

> “逻辑没有什么存在于不存在, 只有相干与去相干, 所以未来对过去有了干涉, 这也不稀奇, 这就是因果”

在前一节（[“顺序无关、无时间之网与几何因果的必然性”](#sec-coda-timeless-causality)）中，我们从单位向量族的 Gram 矩阵刚性（[@thm-ch29-gram-rigidity-and-pell]）看见了无时间关联网络如何消解“前推后”的机械多米诺骨牌时间观。然而，日常直觉之所以一听见“未来对过去发生干涉”便觉得违反逻辑，根源在于把经典布尔逻辑的“存在（`1`）对不存在（`0`）”误当成了宇宙最底层的本体语法。本章收官之际，我们围绕这句收拢因果本质的命题（原话台账见[附录 A](appendix-a.md#sec-appendix-a-verbatim-ledger) `A75`），沿着“正交隐匿与捏合去相干—双端玻恩握手与共同相位锁定—驻相、弱值、延迟擦除无信令与格拉姆端点置换—反相悖论相消与自洽不动点”四根支柱展开严格拆解，并逐项标清 Lean 4 内核定理（`LEAN ✓`）、手工代数推导（`手工推导`）、外部物理文献（`文献结果`）、双精度数值检验（`NUM`）与本书正交几何诠释（`MODEL`）的各自边界。

### 29.4.1 破除布尔“存在与不存在”幻觉：正交隐匿、双路相消与捏合去相干 {#sec-ch29-handshake-boolean-illusion}

当局部探测器屏幕上报出读数 `0` 时，布尔直觉习惯宣称“那里什么都不存在”；报出确定结果时，又宣称“客观事实已经绝对生成”。事实上，仅凭单个零读数本身并不能反推背后的机制（空输入本身同样给出零读数），而在受控线性与算子模型中，看似同为“归零”或“定格为经典事实”的现象背后，严格对应着三种截然不同的几何与代数操作（以下分项算式为初等手工推导，`手工推导`；将其读作“逻辑无所谓存亡、唯有相干与去相干”属本书诠释，`MODEL`）：

1. **正交子空间隐匿（Orthogonal Hiding，向量范数毫发无损）**：在二维实平面中取单位标尺 $\mathbf{A} = (1, 0)$ 与单位态向量 $\mathbf{B} = (\cos\theta, \sin\theta)$，记可见子空间为 $M = \operatorname{span}(\mathbf{A})$。分解 $\mathbf{B} = \mathbf{B}_\parallel + \mathbf{B}_\perp$ 得 $\mathbf{B}_\parallel = (\cos\theta, 0)$、$\mathbf{B}_\perp = (0, \sin\theta)$，满足勾股范数守恒 $\|\mathbf{B}\|^2 = \|\mathbf{B}_\parallel\|^2 + \|\mathbf{B}_\perp\|^2 = 1$。当 $\theta = \pi/2$ 时，沿 $\mathbf{A}$ 轴的内积读数 $\mathbf{A}\cdot\mathbf{B} = 0$（$\mathbf{B}_\parallel = \mathbf{0}$），但 $100\%$ 的向量范数平方完整驻留在正交补空间（$\|\mathbf{B}_\perp\|^2 = 1$），二维有向面积平方 $(\mathbf{A}\wedge\mathbf{B})^2 = \sin^2\theta = 1$，且两单位向量叠加的范数平方为 $\|\mathbf{A} + \mathbf{B}\|^2 = 2$——这是**正交侧身隐匿**，绝非振幅湮灭。
2. **双路标量反相相消与双端口守恒（Two-Path Anti-Phase Cancellation）**：取非负实束幅 $a = \cos\xi, b = \sin\xi$（$a^2 + b^2 = 1$），将全部相对相位收入 $\Delta \in [0, 2\pi]$。单路标量叠加的原始强度为

   $$
   I_{\mathrm{raw}} = \bigl|a + b e^{i\Delta}\bigr|^2 = a^2 + b^2 + 2ab\cos\Delta.
   $$

   当 $\Delta = \pi$（利用标量恒等式 $e^{i\pi} = -1$，故 $e^{iu} + e^{i(u+\pi)} = 0$）时，$I_{\mathrm{raw}} = (a - b)^2$，**当且仅当两束幅严格相等 $a = b$ 时才精确归零**。更关键的是，在物理幺正平衡双端口合束器 $b_\pm = (a \pm b e^{i\Delta})/\sqrt{2}$ 中，两出口概率 $p_+ = |b_+|^2 = \frac{1}{2}I_{\mathrm{raw}}$ 与 $p_- = |b_-|^2$ 恒满足 $p_+ + p_- = 1$：在 $a = b = 1/\sqrt{2}, \Delta = \pi$ 处，暗端口 $p_+ = 0$ 恰与亮端口 $p_- = 1$ 成对出现，总概率从未凭空消失。
3. **捏合去相干与“已定格经典事实”（Pinching Decoherence）**：对归一化双路态构造保留相干度 $\gamma \in [0, 1]$ 的密度矩阵族

   $$
   \rho_\gamma = \begin{pmatrix} a^2 & \gamma ab e^{-i\Delta} \\ \gamma ab e^{i\Delta} & b^2 \end{pmatrix}, \qquad p_\pm = \frac{1}{2}\bigl(1 \pm 2\gamma ab\cos\Delta\bigr).
   $$

   对一切 $\gamma \in [0, 1]$，$\rho_\gamma$ 均为迹 $1$ 半正定态，纯度为 $\operatorname{Tr}(\rho_\gamma^2) = a^4 + b^4 + 2\gamma^2 a^2 b^2 = 1 - 2(1 - \gamma^2)a^2 b^2$。当执行未读记录捏合 $\gamma = 0$ 时，非对角相干元被精准归零（相对于纯态 $\gamma = 1$ 丢弃了 $2a^2 b^2$ 的希尔伯特—施密特质量），而对角权重 $a^2, b^2$ 原封不动，双端口输出拉平为 $p_\pm = 1/2$。这里必须严格区分**信道的幂等性**与**输出矩阵的幂等性**：未读捏合信道满足 $\Pi_P(\Pi_P(\rho)) = \Pi_P(\rho)$（重复去相干不再改变块对角记录），但捏合后的混合密度矩阵本身通常并不满足 $\rho_0^2 = \rho_0$（例如等权时 $\rho_0 = I/2$，而 $(I/2)^2 = I/4 \neq I/2$）。

下面这条冻结定理将正交补投影六恒等式、有限记录捏合信道幂等律、单比特捏合希尔伯特—施密特勾股分解与拉格朗日—格拉姆面积恒等式统一锁定于 Lean 4 内核：

::: {.theorem #thm-ch29-coherence-complement-and-pinching title="正交补投影六恒等式、有限记录捏合幂等律、希尔伯特—施密特勾股分解与拉格朗日—格拉姆恒等式" lean="D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities, D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent, D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean, D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity"}
关于正交投影分解、有限记录未读信道与二阶面积余项，以下四项陈述在各自精确前提下成立：

1. **闭子空间正交补投影六恒等式**（[`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities)）：设 $\mathbb{K}$（`RCLike`，实或复）上的完备内积空间为 $E$，$M \le E$ 为闭子空间，记 $P_M = M.\mathrm{starProjection}$ 与 $P_{M^\perp} = M^\perp.\mathrm{starProjection}$ 为对应的连续线性正交投影算子，则同时成立

   $$
   P_{M^\perp} = \mathrm{id}_E - P_M,\quad P_M \circ_L P_M = P_M,\quad P_{M^\perp} \circ_L P_{M^\perp} = P_{M^\perp},\quad P_M \circ_L P_{M^\perp} = 0,\quad P_{M^\perp} \circ_L P_M = 0,\quad P_M + P_{M^\perp} = \mathrm{id}_E.
   $$

2. **有限记录未读捏合信道的幂等律**（[`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent)）：设有限维指标集为 $n$（`[Fintype n] [DecidableEq n]`），有限记录指标集为 $\kappa$（`[Fintype kappa]`），$P : \kappa \to M_n(\mathbb{C})$ 满足完备正交自伴幂等记录族条件 `IsRecordMeasurement P`（各 $P_k$ 自伴幂等、两两正交且 $\sum_k P_k = 1$），定义未读态映射 $\operatorname{unreadState}(P)(\rho) = \sum_k P_k \rho P_k$，则信道复合严格幂等：

   $$
   \operatorname{unreadState}(P) \circ \operatorname{unreadState}(P) = \operatorname{unreadState}(P).
   $$

3. **单比特捏合投影的希尔伯特—施密特勾股分解**（[`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean)）：对任意二阶复矩阵 $\rho \in M_2(\mathbb{C})$（`QubitMatrix`，定理本身不要求 $\rho$ 厄米或半正定），在希尔伯特—施密特内积 $\langle A, B\rangle_{\mathrm{HS}} = \operatorname{Tr}(A^\dagger B)$ 与标准基对角捏合 $\operatorname{pinching}(\rho)$ 下，恒有

   $$
   \langle \rho, \rho\rangle_{\mathrm{HS}} = \bigl\langle \operatorname{pinching}(\rho),\, \operatorname{pinching}(\rho)\bigr\rangle_{\mathrm{HS}} + \bigl\langle \rho - \operatorname{pinching}(\rho),\, \rho - \operatorname{pinching}(\rho)\bigr\rangle_{\mathrm{HS}}.
   $$

4. **实向量组的拉格朗日—格拉姆二元面积恒等式**（[`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)）：对任意有限指标集 $s$（`Finset ι`）与实向量 $u, v : \iota \to \mathbb{R}$（无需归一化假设），恒有

   $$
   \Bigl(\sum_{i \in s} u_i^2\Bigr)\Bigl(\sum_{i \in s} v_i^2\Bigr) - \Bigl(\sum_{i \in s} u_i v_i\Bigr)^2 = \frac{1}{2}\sum_{i \in s}\sum_{j \in s} (u_i v_j - u_j v_i)^2.
   $$
:::

::: proof
第 1 款由希尔伯特空间闭子空间正交分解 $E = M \oplus M^\perp$ 直接验证伴随正交投影的互补差、各自幂等、相互正交归零与恒等分解。第 2 款将双重求和 $\sum_j P_j \bigl(\sum_k P_k \rho P_k\bigr) P_j$ 展开，利用 `IsRecordMeasurement P` 中 $j \neq k$ 时 $P_j P_k = 0$ 与 $j = k$ 时 $P_k^2 = P_k$ 消去全部交叉项。第 3 款在 $M_2(\mathbb{C})$ 上验证对角部分 $\operatorname{pinching}(\rho)$ 与非对角余项 $\rho - \operatorname{pinching}(\rho)$ 的希尔伯特—施密特内积为零，从而导出勾股平方和分解。第 4 款展开右端双重和 $\sum_{i,j}(u_i^2 v_j^2 + u_j^2 v_i^2 - 2 u_i v_i u_j v_j)$ 并除以 $2$，与左端逐项相等。完整证明由 Lean 内核检查。
:::

结合 [@thm-ch29-coherence-complement-and-pinching] 第 1、4 款可见：当可见投影 $P_M(v) = 0$ 时，互补投影 $P_{M^\perp}(v) = v$ 原样保留全部向量；在二维或三维有序坐标下，拉格朗日—格拉姆恒等式右端化为 $\sum_{i<j}(u_i v_j - u_j v_i)^2$（三维下即 $\|\mathbf{u}\times\mathbf{v}\|^2$），精确托起正交隐匿时的单位双向量面积。而在第 2、3 款中，若高秩记录投影元维数大于 $1$，$\operatorname{unreadState}(P)(\rho)$ 保留块对角结构而非必为逐元对角；仅当把第 3 款专门化到迹 $1$ 厄米半正定密度矩阵时，$\langle\rho, \rho\rangle_{\mathrm{HS}} = \operatorname{Tr}(\rho^2)$ 才对应态纯度，丢弃项 $2|\rho_{01}|^2$ 才对应被去相干抹除的相干质量。下方实验卡将正交隐匿、反相分流与捏合去相干三项开关并置，使三者的区别一目了然：

::: {.viz src="coherence-handshake-causality" preset="boolean-illusion" height="500"}
**零读数并非“不存在”：正交隐匿、反相分流与捏合去相干对照卡（`boolean-illusion`）**：左栏展示单位向量 $\mathbf{B}$ 对标尺轴 $\mathbf{A}$ 的分解——在 $\theta = \pi/2$ 处青色轴向投影归零，品红正交分量与有向面积平方保持 $1$，且 $\|\mathbf{A}+\mathbf{B}\|^2 = 2$；中栏展示平衡双端口合束器——在等幅反相 $\Delta = \pi$ 时 `+` 端口归零而 `-` 端口得 $1$（总输出恒为 $1$）；右栏展示 $2\times 2$ 路径密度矩阵 $\rho_\gamma$——捏合 $\gamma = 0$ 抹去品红非对角相干元、保留对角权重并将双端口拉平为 $1/2$。
:::

### 29.4.2 因果作为双端玻恩握手与共同相位公平锁定 {#sec-ch29-handshake-born-reciprocity}

为什么单向复交叠 $\langle\phi|\psi\rangle$ 本身还不能直接充当客观的物理因果权重？对两个归一化态分别施加**各自独立**的全局相位旋转 $|\psi\rangle \mapsto e^{i\theta_\psi}|\psi\rangle$ 与 $|\phi\rangle \mapsto e^{i\theta_\phi}|\phi\rangle$（注意：若对两者施加同一个公共相位 $\theta_\psi = \theta_\phi$，内积 $\langle\phi|\psi\rangle$ 本就保持不变），手工计算（`手工推导`）立即给出

$$
\langle\phi\mid\psi\rangle \longmapsto e^{i(\theta_\psi - \theta_\phi)}\langle\phi\mid\psi\rangle, \qquad \langle\psi\mid\phi\rangle = \overline{\langle\phi\mid\psi\rangle} \longmapsto e^{-i(\theta_\psi - \theta_\phi)}\langle\psi\mid\phi\rangle.
$$

单向振幅携带相对规范相位 $e^{i(\theta_\psi - \theta_\phi)}$，因而不是投影射线的内禀不变量；唯有将正向交叠 $\langle\phi|\psi\rangle$ 与逆向共轭回波 $\langle\psi|\phi\rangle = \overline{\langle\phi|\psi\rangle}$ 成对相乘，相对相位才精确互消，锁出实非负、规范不变且双端对称的玻恩握手权重（`手工推导`）：

$$
w(\psi \leftrightarrow \phi) = \langle\phi\mid\psi\rangle\langle\psi\mid\phi\rangle = \bigl|\langle\phi\mid\psi\rangle\bigr|^2 = \bigl|\langle\psi\mid\phi\rangle\bigr|^2 = \operatorname{Tr}(P_\phi P_\psi) = \operatorname{Tr}(P_\psi P_\phi),
$$

且对单位向量成立秩一投影夹持恒等式 $P_\psi P_\phi P_\psi = |\psi\rangle\langle\psi|\phi\rangle\langle\phi|\psi\rangle\langle\psi| = |\langle\phi|\psi\rangle|^2 P_\psi$（当中间插有幺正演化算符 $U$ 时，逆向实验须取伴随演化 $U^\dagger$，满足 $|\langle\phi|U|\psi\rangle|^2 = |\langle\psi|U^\dagger|\phi\rangle|^2$，这并不意味着固定单向传播算符在不取伴随时自动对称）。在共同 $U(1)$ 相位不变多项式层面，为什么实值非负的最低阶非平凡不变量恰好落在二次厄米双线性型上？下面这条冻结定理给出了秩一模平方约化、条件系综配对权重与共同相位多项式不变代数的完整核验结果：

::: {.theorem #thm-ch29-born-handshake-and-phase-fairness title="秩一纯态模平方约化、玻恩配对条件分解与共同相位不变多项式定理" lean="D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction, D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight, D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem"}
在有限维复矩阵记录框架与多变量复多项式代数中，以下三项陈述成立：

1. **秩一投影与秩一纯态的标量模平方约化**（[`rank_one_pure_state_modulus_square_reduction`](lean:D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction)）：设有限指标集为 $n$（`[Fintype n]`），$P : \kappa \to M_n(\mathbb{C})$，$\rho \in M_n(\mathbb{C})$，$\phi, \psi : n \to \mathbb{C}$（此款无需假设向量归一化或记录族完备）。若在分支 $k \in \kappa$ 上有 $P_k = \operatorname{vecMulVec}(\phi, \operatorname{star}\phi)$ 且 $\rho = \operatorname{vecMulVec}(\psi, \operatorname{star}\psi)$，则标量记录权重恒等于复内积模平方：

   $$
   \operatorname{recordWeight}(P, \rho, k) = \bigl((\|\operatorname{star}\phi \mathbin{\cdot_v} \psi\|^2 : \mathbb{R}) : \mathbb{C}\bigr).
   $$

2. **完备记录族下的玻恩迹配对与未读条件系综分解**（[`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)）：在有限可判定指标集 $n$ 与有限记录集 $\kappa$ 上，若 $P$ 满足完备正交记录条件 `IsRecordMeasurement P`，$\rho$ 满足物理密度态条件 $\rho.\mathrm{PosSemidef} \land \operatorname{Tr}\rho = 1$，且 $P_k = \operatorname{vecMulVec}(\phi, \operatorname{star}\phi)$、$\rho = \operatorname{vecMulVec}(\psi, \operatorname{star}\psi)$，则同时成立

   $$
   \operatorname{recordWeight}(P, \rho, k) = \bigl((\|\operatorname{star}\phi \mathbin{\cdot_v} \psi\|^2 : \mathbb{R}) : \mathbb{C}\bigr) = \operatorname{Tr}(\rho P_k),
   $$

   且未读态精确分解为各记录分支条件态的玻恩加权和：$\operatorname{unreadState}(P, \rho) = \sum_j \operatorname{recordWeight}(P, \rho, j) \bullet \operatorname{conditionalState}(P, \rho, j)$。
3. **共同 $U(1)$ 相位不变多项式的电荷平衡、最低二次次数与唯一厄米表出**（[`complete_common_phase_polynomial_theorem`](lean:D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem)）：设有限指标集为 $\iota$（`[Fintype ι]`），形式多项式 $p \in \operatorname{Poly}(\iota) = \operatorname{MvPolynomial}(\iota \oplus \iota, \mathbb{C})$ 在复向量 $(z, \overline{z})$ 上的求值记为 $\operatorname{actual}(p)(z)$。则：（a）$p$ 存在唯一保持总次数与各阶齐次性的笛卡尔坐标表示；（b）共同相位不变性 `Invariant p`（所有坐标同步乘 $e^{i\theta}$ 下不变）当且仅当每个支撑单项式的全纯与反全纯总次数相等（`Balanced p`），亦当且仅当 $p$ 属于由二次生成元 $z_i\overline{z}_j$ 生成的二次不变子代数 `quadraticAlgebra`；（c）任何非常数共同相位不变多项式必满足总次数 $\ge 2$，且每个对角生成元 $z_i\overline{z}_i$ 均为总次数 $2$ 的不变量；（d）若 $p$ 为 $2$ 次齐次、处处实值（$\forall z,\, \operatorname{Im}(\operatorname{actual}(p)(z)) = 0$）且共同相位不变，则存在唯一矩阵 $H \in M_\iota(\mathbb{C})$ 使得 $H$ 厄米、$H_{ji} = p.\mathrm{coeff}(\operatorname{pairExponent}(i, j))$、对一切 $z$ 有 $\operatorname{actual}(p)(z) = z^\dagger H z$，且 $(\forall z,\, \operatorname{Re}(\operatorname{actual}(p)(z)) \ge 0) \iff H.\mathrm{PosSemidef}$。
:::

::: proof
第 1 款将外积矩阵乘积 $\operatorname{vecMulVec}(\psi, \operatorname{star}\psi)\operatorname{vecMulVec}(\phi, \operatorname{star}\phi)$ 的迹按有限求和重排为 $(\operatorname{star}\phi \mathbin{\cdot_v} \psi)\overline{(\operatorname{star}\phi \mathbin{\cdot_v} \psi)} = \|\operatorname{star}\phi \mathbin{\cdot_v} \psi\|^2$。第 2 款结合 `recordWeight` 的迹定义与完备正交投影族对未读态 $\sum_j P_j \rho P_j$ 的归一化条件态展开直接得出。第 3 款通过全纯—反全纯双向次数分解刻画 $e^{i(d - \bar{d})\theta} = 1$ 的系数支撑判据，证明非零平衡单项式至少含一个 $z_i$ 与一个 $\overline{z}_j$（故次数 $\ge 2$），并在二次实值情形下由极化恒等式唯一确定厄米系数矩阵 $H$ 及其半正定性等价判据。完整证明由 Lean 内核检查。
:::

需要注意 [@thm-ch29-born-handshake-and-phase-fairness] 的精确边界：第 1 款给出的结论是标量记录权重恒等式而非算子夹持式 $P_\psi P_\phi P_\psi = |\langle\phi|\psi\rangle|^2 P_\psi$（后者为上文归一化向量上的手工矩阵推导），第 3 款在单复变量情形下给出非负二次型 $c|z|^2$（$c \ge 0$），还需附加单位概率定标才固定 $c = 1$；定理本身属于多项式不变量与矩阵迹代数，并不单独证明物理超前波传播。取单比特参数化 $|\psi_\chi\rangle = e^{i\chi}(1, 0)^{\mathsf{T}}$ 与 $|\phi_\theta\rangle = (\cos(\theta/2), \sin(\theta/2))^{\mathsf{T}}$（布洛赫球面夹角为 $\theta$，希尔伯特空间交叠半角为 $\theta/2$，并用 $I - P_\phi$ 补全二元正交记录族以契合第 2 款前提），正向振幅 $a_{\mathrm{fwd}} = \cos(\theta/2)e^{i\chi}$ 与共轭回波 $a_{\mathrm{echo}} = \cos(\theta/2)e^{-i\chi}$ 随参考相位 $\chi$ 反向旋转，而它们的握手乘积纹丝不动地锁在 $p = \cos^2(\theta/2)$（在本书的 `MODEL` 诠释与下文 [@rem-ch29-transactional-tsvf-eraser-literature] 引述的交易诠释文献中，可将这对共轭因子直观读作跨越首尾边界的双向握手锁扣）：

::: {.viz src="coherence-handshake-causality" preset="born-handshake" height="500"}
**单向振幅旋转而双端握手锁定卡（`born-handshake`）**：调节布洛赫夹角 $\theta \in [0, \pi]$ 与参考相位 $\chi \in [0, 2\pi]$，青色正向交叠箭头 $a_{\mathrm{fwd}} = \langle\phi|\psi\rangle$ 与品红共轭回波箭头 $a_{\mathrm{echo}} = \langle\psi|\phi\rangle$ 随 $\chi$ 反向旋转，而二者相乘结出的实数握手权重 $\operatorname{Tr}(P_\phi P_\psi) = \cos^2(\theta/2)$ 与两侧投影算子始终锁定不变。
:::

### 29.4.3 未来与过去的双向干涉：驻相束、弱值、延迟擦除无信令与格拉姆端点置换 {#sec-ch29-handshake-future-past}

一旦明白物理概率由首尾两端的厄米配对共同锁定，所谓“未来对过去发生干涉”便褪去了全部神秘色彩：局部观察者之所以觉得过去已经不可逆转，仅仅是因为自身偏迹视角丢失了环境与关联扇区的相干相位；而在未作不可逆丢弃的联合系统中，幺模相位记录支持相干逆转，未来测量基的选择则在不改动过去无条件边缘总和的前提下，将联合记录分拣为互补的干涉子系综。我们先将联合相干逆转、局部偏迹访问缺陷、二分边缘关联盲区与正算子格拉姆因式分解四条核心定理形式化锁定，再集中梳理对应的物理文献与手工无信令及置换恒等式：

::: {.theorem #thm-ch29-reversal-access-and-gram-realizability title="多副本幺模记录相干逆转、受控记录偏迹访问缺陷、局域边缘关联盲区与正算子格拉姆可实现性" lean="D5/S3/ObserverMemory/JointCoherentReversal.joint_coherent_reversal, D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect, D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot, D5/S3/QuantumBounds/GramRealizability.gram_realizability"}
关于环境记录逆转、局部约化不可逆性、二分关联正交盲区与希尔伯特空间正算子内积实现，以下四项陈述成立：

1. **有限多副本幺模重叠记录的联合相干逆转**（[`joint_coherent_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.joint_coherent_reversal)）：设有限可判定副本指标集为 `Copy`（`[Fintype Copy] [DecidableEq Copy]`），环境记录族为 $\mathrm{records} : \mathrm{Copy} \to \mathrm{EnvironmentRecord}$，$\rho \in M_2(\mathbb{C})$，$i, j \in \operatorname{Fin} 2$。若在所选矩阵元 $(i, j)$ 上**每一份副本的记录交叠均为幺模复数**（$\forall k,\, \overline{\gamma_k(i, j)}\,\gamma_k(i, j) = 1$，其中 $\gamma_k = \operatorname{recordOverlap}(\mathrm{records}(k))$），则对全体副本同步执行共轭逆转映射 `reverseOn Finset.univ` 后精确恢复原始矩阵元：

   $$
   \operatorname{multiRecordChannel}\bigl(\operatorname{reverseOn}\,\mathrm{Finset.univ}\,\mathrm{records}\bigr)\bigl(\operatorname{multiRecordChannel}\,\mathrm{records}\,\rho\bigr)_{ij} = \rho_{ij}.
   $$

2. **受控拷贝记录的局部约化不可逆性即访问缺陷**（[`reduced_irreversibility_is_access_defect`](lean:D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect)）：对任意具有相同对角元（$\forall i,\, \rho_{ii} = \sigma_{ii}$）但不同非对角相干元（$\exists i \neq j,\, \rho_{ij} \neq \sigma_{ij}$）的两个二阶复矩阵 $\rho, \sigma \in M_2(\mathbb{C})$，受控拷贝算符 $\mathrm{copyUnitary} \in \mathrm{U}(\operatorname{Fin} 2 \times \operatorname{Fin} 2, \mathbb{C})$ 将空白环境初态分别演化为相异的联合受控记录态，但对环境求偏迹后的单比特约化态完全重合（$\operatorname{traceEnvironment}(\widetilde{\rho}) = \operatorname{traceEnvironment}(\widetilde{\sigma})$）；因此不存在任何仅从约化态出发的恢复映射能同时还原两个联合态，而全局伴随幺正演化 $\operatorname{unitaryEvolution}(\operatorname{star}\mathrm{copyUnitary})$ 则精确恢复各自的原始空白环境直积态。
3. **二分无迹厄米算子空间中局域边缘与关联扇区的正交盲区分解**（[`local_marginal_correlation_blind_spot`](lean:D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot)）：对满足 $1 \le m$、$1 \le n$ 且 $1 < mn$ 的正整数 $m, n$，视为实希尔伯特空间的二分厄米算子空间 `BipartiteHermitian m n` 中的无迹子空间 `bipartiteTraceZero m n`（实维数 $m^2 n^2 - 1$）直和分解为局域边缘扇区与关联扇区，其实维数分别为 $(m^2 - 1) + (n^2 - 1)$ 与 $(m^2 - 1)(n^2 - 1)$（例如双比特 $m = n = 2$ 时在 $4^2 - 1 = 15$ 维无迹厄米实空间中局域扇区占 $6$ 维、关联扇区占 $9$ 维，占比 $9/15 = 3/5$），且两扇区在实希尔伯特—施密特内积下严格正交；同时，双比特贝尔纯态密度矩阵 `bellDensity`（秩 $1$）与经典关联混态 `classicalCorrelatedDensity`（非幂等，$\rho_{\mathrm{cl}}^2 \neq \rho_{\mathrm{cl}}$）两侧偏迹完全一致而全局态严格不等。
4. **完备复内积空间正算子的格拉姆伴随平方可实现性**（[`gram_realizability`](lean:D5/S3/QuantumBounds/GramRealizability.gram_realizability)）：设 $V$ 为完备复内积空间，$Q : V \to_L[\mathbb{C}] V$ 为连续线性算子，则 $Q$ 为正算子（$0 \le Q$）当且仅当存在连续线性算子 $O : V \to_L[\mathbb{C}] V$ 使得

   $$
   Q = O^\dagger \circ_L O \quad \land \quad \forall x, y \in V,\; \langle Q x, y\rangle_{\mathbb{C}} = \langle O x, O y\rangle_{\mathbb{C}}.
   $$
:::

::: proof
第 1 款沿有限副本集展开多记录信道对矩阵元 $(i, j)$ 的逐副本交叠连乘因子，利用每个副本满足 $|\gamma_k(i, j)|^2 = 1$ 得共轭逆转连乘积等于 $1$。第 2 款直接计算受控拷贝幺正门作用后的联合分块矩阵与环境偏迹，验证偏迹仅依赖输入对角元 $\rho_{ii} = \sigma_{ii}$，由单值函数不可能把同一输入映成两个相异联合态排除局部恢复映射，并用幺正群元伴随逆元复原初态。第 3 款通过无迹泡利/基算子张量积子空间的实维数计数与迹正交检验建立 $(m^2-1)+(n^2-1)$ 对 $(m^2-1)(n^2-1)$ 的正交直和，并核验双比特贝尔态与对角经典关联态的双侧偏迹均为 $I_2/2$。第 4 款正向对正连续自伴算子取有界平方根 $O = Q^{1/2}$，反向由 $\langle O^\dagger O x, x\rangle = \|O x\|^2 \ge 0$ 证得算子正性。完整证明由 Lean 内核检查。
:::

这里同样须守住形式边界：[@thm-ch29-reversal-access-and-gram-realizability] 第 1 款的 `reverseOn` 仅将记录交叠取复共轭，当 $|\gamma_k| < 1$ 时给出 $|\gamma_k|^2 < 1$ 而无法撤销正交零交叠（$\gamma_k = 0$），真正给出联合系统物理幺正逆演化的是第 2 款中的显式 `star copyUnitary`；第 3、4 款本身亦不直接陈述任意未来测量仪器的无信令定理或三元实格拉姆行列式置换公式。下面这则注记将经典文献背景与两项精确手工推导逐一列出：

::: {.remark #rem-ch29-transactional-tsvf-eraser-literature title="驻相折射束、交易诠释、双态矢量弱值、延迟擦除无信令与格拉姆端点置换（文献结果与手工推导）"}
**文献结果，未在本书形式化。** 围绕双端边界条件与未来—过去关联，经典物理学文献与初等矩阵演算分别给出以下五项精确结果：

1. **费曼路径求和与斯涅尔折射界面的有限求积模型**（R. P. Feynman & A. R. Hibbs, *Quantum Mechanics and Path Integrals*, McGraw-Hill, 1965）：固定过去源点 $A(0, 1)$ 与未来终点 $B(1, -1)$，考虑穿过折射率 $n_1, n_2$ 分界面 $y = 0$ 横坐标 $s$ 的光程 $L(s) = n_1\sqrt{s^2 + 1} + n_2\sqrt{(1 - s)^2 + 1}$ 与相位 $S(s)/\hbar = k_0 L(s)$（$k_0 = 2\pi/\lambda$）。导数归零条件 $L'(s^*) = 0$ 恰为斯涅尔折射定律 $n_1\sin\theta_1 = n_2\sin\theta_2$（因 $L''(s) > 0$，此处驻点 $s^*$ 为唯一极小值点；一般作用量泛函的驻点不必是极小值）。在 $M$ 条候选路径的有限求积模型 $A_M = M^{-1/2}\sum_{k=0}^{M-1} e^{i S_k/\hbar}$（有界相干度指标 $C = |A_M|^2/M \le 1$，并非连续路径积分的极限证明）中，满足 $|k_0(L(s) - L(s^*))| \le \pi/4$ 的驻相邻域同相累加，而远离驻点的路径束因快速卷绕发生**近似相消**（`NUM` / `MODEL`：有限孔径与有限 $M$ 下通常留有边界余项，唯有理想单位根子模型 $\sum_{k=0}^{M-1} e^{2\pi i k/M} = 0$ 或成对反相向量 $+\mathbf{\Omega} - \mathbf{\Omega} = \mathbf{0}$ 才精确为零）。
2. **交易诠释中的推迟提供波与超前确认波**（J. G. Cramer, *Rev. Mod. Phys.* **58**, 647, 1986）：将标准单时刻量子力学中的玻恩乘积 $\langle\phi|\psi\rangle\langle\psi|\phi\rangle = |\langle\phi|\psi\rangle|^2$ 诠释为从过去发射体发出的推迟提供波 $\psi$ 与从未来吸收体回传的超前确认回波 $\phi^*$ 在四维时空边界之间达成的驻波交易握手（此四维驻波图景属于诠释文献与本书 `MODEL` 视角，与标准教科书单时刻演化表述相区分）。
3. **双态矢量形式体系（TSVF）、弱值奇异边界与延迟选择量子擦除实验**（Y. Aharonov, P. G. Bergmann & J. L. Lebowitz, *Phys. Rev.* **134**, B1410, 1964；Y. Aharonov, D. Z. Albert & L. Vaidman, *Phys. Rev. Lett.* **60**, 1351, 1988；M. O. Scully & K. Drühl, *Phys. Rev. A* **25**, 2208, 1982；Y.-H. Kim et al., *Phys. Rev. Lett.* **84**, 1, 2000）：在给定前选择态 $|\Psi\rangle$ 与非正交后选择态 $\langle\Phi|$（$\langle\Phi|\Psi\rangle \neq 0$）的双边界子系综 $(\langle\Phi|\;|\Psi\rangle)$ 中，算符 $\hat{O}$ 的弱值定义为 $O_w = \langle\Phi|\hat{O}|\Psi\rangle / \langle\Phi|\Psi\rangle$（一般为复数，可超出本征值区间 $[-1, 1]$，绝非概率）。例如取 $|\Psi\rangle = |+\rangle$、$|\Phi_\eta\rangle = \cos\eta\,|+\rangle + \sin\eta\,|-\rangle$、$\hat{O} = Z$，则后选择成功概率为 $p_{\mathrm{post}} = |\langle\Phi_\eta|\Psi\rangle|^2 = \cos^2\eta$，弱值为 $Z_w = \tan\eta$；当 $\eta \to \pi/2$ 时 $p_{\mathrm{post}} \to 0$，而在精确正交点 $\eta = \pi/2$（$\langle\Phi_{\pi/2}|\Psi\rangle = 0$）处后选择概率为零，**弱值分母为零、在数学与物理上严格无定义**（绝非可实现的有限读数 $\infty$）。
4. **延迟擦除的联合/条件归一化与克劳斯完备性无信令证明**（`手工推导`）：在路径 $\otimes$ 标记双比特态 $\rho_{PM} = \frac{1}{2}(|00\rangle\langle 00| + |11\rangle\langle 11| + V|00\rangle\langle 11| + V|11\rangle\langle 00|)$（$V \in [0, 1]$）、屏幕完备正算子测度 $E_j = q_j\begin{pmatrix}1 & e^{-i\varphi_j} \\ e^{i\varphi_j} & 1\end{pmatrix}$（$\sum_j q_j = 1,\; \sum_j E_j = I$）与未来标记基角 $\beta \in [0, \pi/2]$（$|f_+\rangle = \cos(\beta/2)|0\rangle + \sin(\beta/2)|1\rangle$，$|f_-\rangle = -\sin(\beta/2)|0\rangle + \cos(\beta/2)|1\rangle$）的精确 $4\times 4$ 模型中，必须严格区分三种分布：联合概率 $p(j, \pm) = \frac{1}{2}q_j(1 \pm V\sin\beta\cos\varphi_j)$，预示条件概率 $p(j \mid \pm) = q_j(1 \pm V\sin\beta\cos\varphi_j)$，以及归一化条纹轮廓 $F_\pm(j) = p(j, \pm)/q_j = \frac{1}{2}(1 \pm V\sin\beta\cos\varphi_j)$。从 $\beta = 0$（路径读出，条纹平坦）转到 $\beta = \pi/2$（量子擦除，正反互补条纹显现），无条件过去边缘分布恒满足 $p(j) = p(j, +) + p(j, -) = \frac{1}{2}p(j \mid +) + \frac{1}{2}p(j \mid -) = q_j$。更一般地，对未来标记端任意完备量子仪器 $\{K_r\}$（$\sum_r K_r^\dagger K_r = I$），由迹的循环性与完备性立得

   $$
   \sum_r \operatorname{Tr}\!\Bigl[(I \otimes K_r)\rho_{PM}(I \otimes K_r^\dagger)(E_j \otimes I)\Bigr] = \operatorname{Tr}\!\Bigl[\rho_{PM}\Bigl(E_j \otimes \sum_r K_r^\dagger K_r\Bigr)\Bigr] = \operatorname{Tr}\bigl[\rho_{PM}(E_j \otimes I)\bigr] = q_j,
   $$

   即未来的选基只能在事后符合计数中分拣子系综，**绝不可能改写过去屏幕的总计边缘分布或逆时传递超光速信号**。
5. **三时刻实格拉姆矩阵的首尾端点置换不变性**（`手工推导`，对照单位重叠等价判据 [@thm-ch29-gram-rigidity-and-pell]）：对过去、现在、未来三支实单位向量 $\mathbf{A}_{\mathrm{past}}, \mathbf{B}_{\mathrm{now}}, \mathbf{C}_{\mathrm{future}}$，记 $x = c_{AB}, y = c_{BC}, z = c_{AC}$。用首尾对调置换阵 $P_{13} = \begin{pmatrix}0&0&1\\0&1&0\\1&0&0\end{pmatrix}$ 作双侧合同变换：

   $$
   G(x, y, z) = \begin{pmatrix} 1 & x & z \\ x & 1 & y \\ z & y & 1 \end{pmatrix} \longmapsto G' = P_{13} G P_{13}^{\mathsf{T}} = \begin{pmatrix} 1 & y & z \\ y & 1 & x \\ z & x & 1 \end{pmatrix} = G(y, x, z).
   $$

   注意当 $x \neq y$ 时矩阵元 $x$ 与 $y$ 互换位置，故 **$G' \neq G$**（仅在反射对称特例 $x = y$ 时才有逐元相等 $G' = G$）；然而对称性、全部特征值、矩阵秩、半正定性（$G' \succeq 0 \iff G \succeq 0$）、有向体积平方 $(\mathbf{A}\cdot(\mathbf{B}\times\mathbf{C}))^2$（带符号混合积本身会变号）以及行列式 $\det G' = (\det P_{13})^2\det G = \det G = 1 - x^2 - y^2 - z^2 + 2xyz \ge 0$ 在首尾对调下严格保持不变。
:::

把上述文献与手工恒等式放到直观几何舞台上，首先看到的是固定过去源点与未来终点时，有限折射路径扇如何围绕斯涅尔驻点 $s^*$ 聚拢相干度，而扇面两侧的高频相位卷绕如何近似抵消：

::: {.viz src="coherence-handshake-causality" preset="feynman-stationary" height="500"}
**首尾双端锁定的有限驻相折射扇卡（`feynman-stationary`）**：连接过去源点 $A$ 与未来终点 $B$ 的 $M$ 条候选折射路径按横坐标 $s$ 排成首尾相接的复相量扇——琥珀色标出满足 $L'(s^*) = 0$（默认 $s^* \approx 0.6232$）的斯涅尔驻点及 $|\Delta\phi| \le \pi/4$ 同相束，两侧非驻相路径盘旋近似相消，并附单位根精确归零校准子图。
:::

再看双态矢量与延迟选择量子擦除舞台：旋转未来标记测量角 $\beta$ 时，符合分拣出的两支条件条纹 $p(j \mid +)$ 与 $p(j \mid -)$ 此起彼伏、反相互补，但过去屏幕的无条件总边缘 $p(j) = q_j$ 如磐石般纹丝不动；一旁的弱值小窗则在后选择趋近正交 $\eta \to \pi/2$ 时清晰标出成功率归零与分母无定义边界：

::: {.viz src="coherence-handshake-causality" preset="tsvf-eraser" height="500"}
**未来选基擦除分拣与无条件边缘守恒卡（`tsvf-eraser`）**：调节未来标记基角 $\beta \in [0, \pi/2]$ 与可见度 $V \in [0, 1]$，直接由 $4\times 4$ 矩阵迹算出联合分布 $p(j, \pm)$、条件分布 $p(j \mid \pm)$ 与无条件过去总和 $p(j) = q_j$——未来擦除在符合子系综中显影反相条纹却绝不改动过去边缘；右侧弱值子窗展示 $Z_w = \tan\eta$ 并在 $\eta = \pi/2$（$p_{\mathrm{post}} = 0$）处显式标明“无定义”。
:::

最后回到本章核心的三元格拉姆相容空间（对照 [@thm-ch29-gram-rigidity-and-pell] 与 [@thm-ch29-reversal-access-and-gram-realizability] 第 4 款）：将过去 $\mathbf{A}_{\mathrm{past}}$ 与未来 $\mathbf{C}_{\mathrm{future}}$ 作首尾置换 $P_{13} G P_{13}^{\mathsf{T}}$，非对称输入（如默认 $x = 0.2, y = 0.6, z = 0.1$）下非对角元 $x, y$ 忠实互换，而特征谱、半正定相容性与三维体积平方 $\det G = 0.614$ 毫厘不爽：

::: {.viz src="coherence-handshake-causality" preset="gram-symmetry" height="500"}
**三时刻格拉姆矩阵首尾置换与行列式不变量卡（`gram-symmetry`）**：对实单位向量 $\mathbf{A}_{\mathrm{past}}, \mathbf{B}_{\mathrm{now}}, \mathbf{C}_{\mathrm{future}}$ 执行首尾置换 $G' = P_{13} G P_{13}^{\mathsf{T}}$——当 $x \neq y$ 时矩阵元 $x$ 与 $y$ 互换（$G' \neq G$，切换到对称点 $x = y = 0.5$ 时 $G' = G$），而半正定性、特征值谱与体积平方 $\det G' = \det G = (\mathbf{A}\cdot(\mathbf{B}\times\mathbf{C}))^2 \ge 0$ 全程守恒。
:::

### 29.4.4 为何因果闭环从不自毁：反相悖论相消与自洽不动点锁定 {#sec-ch29-handshake-loop-consistency}

这套相干—去相干因果观还能干净地回答最后一个经典诘难：假如未来与过去真能构成闭合因果环路，“外祖母悖论”（回到过去阻止自己出发，即布尔逻辑里的 $P \leftrightarrow \neg P$）为何不会把宇宙逻辑炸毁？答案在于严格区分三种常被混为一谈的闭环自洽机制（`手工推导` + `文献结果` + `MODEL`）：

1. **相干参考臂下的反相悖论端口相消（而非孤立负号湮灭）**：首先必须澄清，孤立态向量 $|\psi\rangle$ 与全局反号态 $-|\psi\rangle$ 代表同一条物理射线与同一个密度矩阵 $(-|\psi\rangle)(-\langle\psi|) = |\psi\rangle\langle\psi|$，单个全局负号本身既不是逻辑矛盾，也不是振幅归零！要让“绕环一圈翻出 $\pi$ 相位”转化为观测禁戒，必须存在**与闭环臂相干合束的参考臂**（`手工推导`）：设输出振幅为

   $$
   A_{\mathrm{loop}}(\delta) = \frac{1}{2}\bigl(1 + e^{i\delta}\bigr), \qquad A_{\mathrm{other}}(\delta) = \frac{1}{2}\bigl(1 - e^{i\delta}\bigr),
   $$

   则 $|A_{\mathrm{loop}}(\delta)|^2 = \cos^2(\delta/2)$、$|A_{\mathrm{other}}(\delta)|^2 = \sin^2(\delta/2)$，恒有 $p_{\mathrm{loop}} + p_{\mathrm{other}} = 1$。在自否相位 $\delta = \pi$ 处，悖论端口振幅精确相消为 $|A_{\mathrm{loop}}(\pi)|^2 = 0$，全部概率 $1$ 转向相容互补端口 $A_{\mathrm{other}}(\pi)$；而在同相自洽点 $\delta = 0$ 处，闭环端口以概率 $1$ 稳定通行。从覆叠拓扑看，圆周平方双覆叠沿底空间绕行 $2\pi$ 一整圈会将纤维起点 $+1$ 连续提升至对径点 $-1$（绕满两圈 $4\pi$ 才回到 $+1$），唯有与未绕行的参考支路比对时，这一拓扑换叶负号才显现为干涉相消。
2. **Deutsch 闭合类时曲线（CTC）的混合态不动点**（**文献结果**，D. Deutsch, *Phys. Rev. D* **44**, 3197, 1991）：在量子电路模型中，经典“外祖母翻转门”对应比特翻转幺正门 $X = \begin{pmatrix}0&1\\1&0\end{pmatrix}$（注意 $X$ 绝非全局相位 $-I$）。虽然经典布尔值 $\{0, 1\}$ 在 $x \mapsto 1 - x$ 下无不动点，但 Deutsch 提出的密度矩阵自洽条件 $\rho_{\mathrm{CTC}} = \Phi(\rho_{\mathrm{CTC}})$ 在混合态空间中恒有不动点——对纯共轭映射 $\rho \mapsto X\rho X^\dagger$，最大混态 $\rho_{\mathrm{CTC}} = I/2$ 满足 $X(I/2)X^\dagger = I/2$（需诚实指出：单靠幺正共轭 $X\rho X^\dagger = \rho$ 时不动点并不唯一，所有形如 $\frac{1}{2}(I + r_x X)$、$|r_x| \le 1$ 的态——包括纯态 $|+\rangle\langle+|$ 与 $|-\rangle\langle-|$——同样是不动点；唯有叠加去相干信道后才唯一筛出 $I/2$）。
3. **离散分式自应用四重命运与连续余弦自指不动点**：在对角线与自应用映射层面，任意类型的条件对角线落点定理 [`diagonal_landing_fixed`](lean:D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed) 表明一旦某行落上对角线 $g(a_0) = \operatorname{diagonal}(f, g)$，对角元即满足自洽方程 $f(g(a_0, a_0)) = g(a_0, a_0)$；二元域 `Fin 2` 上的非退化分式自应用映射精确划分为四种代数命运；而在实区间 $[0, 1]$ 的连续标量投影反馈下，单调压缩曲线 $y = \cos\theta$ 与对角线 $y = \theta$ 唯一锁定正实自指不动点 $\cos\theta^* = \theta^* \approx 0.7390851332$（`NUM`：50 步二分法残差 $\le 10^{-15}$；注意 $\theta^*$ 与前文光学驻点 $s^*$、干涉相位 $\delta = 0$ 及黄金比互不相同，各自代表不同数学层面的自洽条件）。

下面这条冻结定理将圆周双覆叠路径提升、二元分式自应用四重命运分类与 Dottie 有理逆幂级数端点统一收入内核保证：

::: {.theorem #thm-ch29-double-cover-fates-and-dottie title="圆周双覆叠历史路径提升、二元分式自应用四重命运分类与余弦不动点有理逆级数定理" lean="D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift, D5/S0/Diagonal/SelfApplicationFates.self_application_four_fates, D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint"}
关于圆周平方双覆叠单值性换叶、二元分式自应用分类与正实余弦不动点级数表示，以下三项陈述成立：

1. **圆周平方双覆叠的唯一路径提升、无连续全局截面与 $2\pi$ 对径换叶**（[`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift)）：记单位圆周映射 $\operatorname{square}(z) = z^2$ 及其二叶商覆叠映射 `covering`。则：（a）对任意连续底路径 $\mathrm{basePath} : C(I, \mathrm{Circle})$ 与满足 $\mathrm{basePath}(0) = \operatorname{square}(\mathrm{initial})$ 的纤维初值 $\mathrm{initial}$，存在唯一连续提升路径 $\mathrm{lifted}$ 使得 $\operatorname{square} \circ \mathrm{lifted} = \mathrm{basePath}$ 且 $\mathrm{lifted}(0) = \mathrm{initial}$；（b）不存在连续全局截面 $\mathrm{selector} : \mathrm{Circle} \to \mathrm{Circle}$ 使得对所有点成立 $\operatorname{square}(\mathrm{selector}(z)) = z$；（c）将底空间整圈路径 $\mathrm{fullTurn}(t) = \operatorname{Circle.exp}(2\pi t)$ 从初值 $1$ 提升，所得路径满足 $\operatorname{square} \circ \mathrm{lifted} = \mathrm{fullTurn}$、$\mathrm{lifted}(0) = 1$ 且终点翻至对径叶 $\mathrm{lifted}(1) = -1$。
2. **非退化二元分式自应用映射的四重命运唯一分类**（[`self_application_four_fates`](lean:D5/S0/Diagonal/SelfApplicationFates.self_application_four_fates)）：对系数取自 $\operatorname{Fin} 2$ 且满足非退化条件 $ad - bc \neq 0$（`Nondegenerate m`）的任意二元分式映射 $m = \langle a, b, c, d\rangle$（其不动点二次型系数三元组为 $(c, d - a, -b)$，判别式为 $\Delta = (d - a)^2 + 4bc$），$m$ 唯一归属于空命运 `.empty`、死锁命运 `.dead`、坍缩命运 `.collapse` 与活性黄金命运 `.live` 四者之一（$\exists!\,\mathrm{fate},\, \operatorname{HasFate}(m, \mathrm{fate})$）；且 $\operatorname{HasFate}(m, \mathrm{.live}) \iff \operatorname{IsPhiFamily}(m)$，此时不动点系数三元组必为 $(1, -1, -1)$ 或 $(1, 1, -1)$，判别式恒为 $\Delta = 1^2 + 4 = 5$。
3. **正实余弦不动点的存在唯一性与 $\pi$ 处有理逆幂级数绝对可和收敛**（[`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint)）：存在实数 $\theta \in (0, 1)$ 满足 $\cos\theta = \theta$，且该根在全体正实数 $t > 0$ 中是 $\cos t = t$ 的唯一解；同时，有理系数形式复合逆幂级数 `inverse`（对应 $2X + 2\arcsin X$ 在 $\mathbb{Q}$ 上的形式逆级数）在 $\pi$ 处绝对可和并精确收敛于 $\theta$：

   $$
   \operatorname{Summable}\Bigl(n \mapsto \bigl|(\operatorname{coeff}_n(\mathrm{inverse}) : \mathbb{R})\bigr|\,\pi^n\Bigr) \;\land\; \operatorname{HasSum}\Bigl(n \mapsto (\operatorname{coeff}_n(\mathrm{inverse}) : \mathbb{R})\,\pi^n,\; \theta\Bigr).
   $$
:::

::: proof
第 1 款调用二叶覆叠映射的同伦路径提升存在唯一性，对整圈路径 $t \mapsto e^{2\pi i t}$ 直接检验提升曲线 $t \mapsto e^{\pi i t}$ 在 $t = 0$ 取 $1$、在 $t = 1$ 取 $-1$；若存在连续全局截面，则将整圈路径复合该截面会导出起点与终点相等但又必须等于唯一提升终点 $-1 \neq 1$ 的矛盾。第 2 款在有限域 $\operatorname{Fin} 2$ 的全部 $16$ 个四元组中筛出非退化元，逐一核验二次系数与判别式对四类命运的互斥完备划分及黄金族判别式 $1^2 + 4 = 5$。第 3 款利用区间 $(0, 1)$ 上 $\cos\theta - \theta$ 的严格单调变号锁定唯一正实根 $\theta$，并由有理形式逆级数的系数界与阿贝尔端点收敛性证得在 $\pi$ 处的绝对可和与精确求和极限。完整证明由 Lean 内核检查。
:::

下方实验卡将双臂相对相位干涉端口、Deutsch 比特翻转密度矩阵不动点小窗、圆周双覆叠 $2\pi$ 换叶提升与实标量 $\cos\theta^* = \theta^*$ 二分收敛曲线并列呈现，清晰展示不同数学机制如何各自消解自否振荡：

::: {.viz src="coherence-handshake-causality" preset="paradox-cancel" height="500"}
**闭环反相端口分流、混合态自洽与余弦不动点对照卡（`paradox-cancel`）**：主舞台展示参考臂与闭环臂合束——在 $\delta = \pi$ 处闭环端口相消为 $0$、互补端口得 $1$（总和恒为 $1$，并区分孤立射线 $(-|\psi\rangle)(-\langle\psi|) = |\psi\rangle\langle\psi|$）；附图并列展示圆周双覆叠 $2\pi$ 换叶 $+1 \to -1$、Deutsch 翻转门 $X(I/2)X^\dagger = I/2$（连同纯不动点 $|+\rangle\langle+|$）以及 $[0, 1]$ 上 $\cos\theta^* = \theta^* \approx 0.739085$ 的唯一交点。
:::

至此，我们可以将传统多米诺骨牌式的布尔因果观与本章建立的正交相干—双端握手因果观汇总为一张清晰的四维对照表：

::: {.remark #rem-ch29-coherence-causality-comparison title="传统多米诺骨牌因果观与正交相干—双端握手因果观的四维对照"}
**模型综合与三层依据边界说明（`MODEL` / `LEAN ✓` / `文献结果`）。** 下表将日常经典因果直觉与本节四重机制逐项对比；表中凡涉正交投影、记录捏合、模平方配对、幺模逆转、偏迹盲区、正算子格拉姆分解、双覆叠提升与不动点级数之处均以 [@thm-ch29-coherence-complement-and-pinching]–[@thm-ch29-double-cover-fates-and-dottie] 为形式锚点（`LEAN ✓`），凡涉驻相折射、交易诠释、弱值、延迟擦除与 Deutsch CTC 之处均按 [@rem-ch29-transactional-tsvf-eraser-literature] 归入经典物理文献与手工推导（`文献结果` / `手工推导`），而“逻辑只有相干与去相干、因果即双向边界握手”的哲学总括属本书几何诠释模型（`MODEL`）：

| 对照维度 | 传统多米诺骨牌因果观（经典布尔直觉） | 正交相干与双端握手因果观（本书形式—几何综合） |
| :--- | :--- | :--- |
| **1. 逻辑底层状态** | 非此即彼的二值布尔开关：读数为 `0` 被等同于本体“不存在”，读数为 `1` 被等同于绝对静态实体 | 无布尔存亡之分，唯有相干保持与去相干捏合：零读数可源于正交子空间隐匿（$\|\mathbf{B}_\perp\|^2 = 1$）或双端口反相分流（$p_+ = 0, p_- = 1$），经典记录则是幂等捏合信道 $\Pi_P \circ \Pi_P = \Pi_P$ 抹去跨块相干后的块对角不动点（[@thm-ch29-coherence-complement-and-pinching]） |
| **2. 因果作用机制** | 单向时间箭头里的机械推撞：过去单方面决定未来，单向跃迁振幅似乎无需未来参与即可独立定格 | 首尾共轭配对的双端玻恩握手：单向交叠 $\langle\phi\mid\psi\rangle$ 携带相对相位，唯有乘上共轭回波 $\langle\psi\mid\phi\rangle$ 才结出规范不变的二次厄米权重 $w(\psi\leftrightarrow\phi) = \lvert\langle\phi\mid\psi\rangle\rvert^2 = \operatorname{Tr}(P_\phi P_\psi)$（[@thm-ch29-born-handshake-and-phase-fairness]） |
| **3. 未来对过去的干涉** | 被视为颠倒先后次序的“逆时改写历史”怪谈，似乎一旦允许未来参与就会触发超光速传信 | 联合相干态的条件切片与格拉姆边界刚性：局部不可逆仅是偏迹丢失关联扇区的访问缺陷；未来选基在符合子系综中分拣互补条纹 $p(j\mid\pm)$，而克劳斯完备性锁死无条件边缘 $p(j) = q_j$ 绝不逆时传信，首尾置换 $P_{13} G P_{13}^{\mathsf{T}}$ 严格保持 $\det G \ge 0$（[@thm-ch29-reversal-access-and-gram-realizability]、[@rem-ch29-transactional-tsvf-eraser-literature]） |
| **4. 逻辑悖论消解** | 闭合回路一旦遇上自否翻转 $P \leftrightarrow \neg P$ 即陷入无穷振荡与逻辑崩溃 | 相对相位分流与自洽不动点锁定：双覆叠 $2\pi$ 换叶在相干参考臂比对下使反相悖论端口 $\delta = \pi$ 归零并将概率导入互补端口，混合态翻转门满足 $X(I/2)X^\dagger = I/2$，实投影自应用收敛于唯一正根 $\cos\theta^* = \theta^*$（[@thm-ch29-double-cover-fates-and-dottie]） |
:::

请进入下方完整交互实验室，在同一座舞台上自由切换全部六个场景，亲手拨动正交夹角、双束相位、捏合保留度、参考相位、折射波长、未来擦除基角、三元格拉姆二面角与闭环相位，核验每一条绿色形式定理、手工守恒残差与文献边界如何严丝合缝地扣合在一起：

::: {.viz src="coherence-handshake-causality" height="640"}
**交互实验室 `ORTHO//HANDSHAKE`**：相干与去相干、双端玻恩握手与全息边界因果沙盘。集成 `boolean-illusion`（正交隐匿、双端口反相分流与捏合去相干）、`born-handshake`（正向振幅与共轭回波的规范不变乘积）、`feynman-stationary`（斯涅尔折射界面的有限驻相相量扇）、`tsvf-eraser`（未来标记选基分拣条纹、无条件过去边缘守恒 $p(j)=q_j$ 与弱值正交无定义边界）、`gram-symmetry`（三时刻实格拉姆矩阵首尾置换 $P_{13} G P_{13}^{\mathsf{T}}$ 与 $\det G$ 守恒）及 `paradox-cancel`（参考臂反相消去悖论端口、Deutsch 混合态不动点与 $\cos\theta^*=\theta^*$）六大实验场景。绿色徽章仅标记本节引用的十四条 Lean 验证定理；驻相、交易诠释、弱值、延迟擦除与 CTC 模型标为文献与模型依据。
:::


---

## 29.5 本章小结：从算术接缝到无时间因果晶体 {#sec-ch29-summary}

本章将毕达哥拉斯的勾股面积守恒、银斜率 $\sqrt{2} - 1$ 的佩尔余项与最佳逼近下界（[@thm-ch29-silver-pell-remainder]、[@thm-ch29-silver-best-approximation]）、黄金整数佩尔范数恒等式与单位向量 Gram 重叠等价关系（[@thm-ch29-gram-rigidity-and-pell]）、面素数与两平方和判据（[@thm-ch29-face-prime-two-squares]、[@thm-ch29-two-squares-classification]），对照连分数识别与算术几何文献评注（[@rem-ch29-pell-convergents-literature]、[@rem-ch29-pell-primes-hilbert-literature]、[@rem-ch29-elliptic-torus-literature]、[@rem-ch29-hasse-gauss-literature]、[@rem-ch29-arithmetic-geometry-literature]）、无时间约束与驻相文献评注（[@rem-ch29-wheeler-dewitt-page-wootters-literature]、[@rem-ch29-feynman-stationary-phase-literature]）、斯宾诺莎三角形因果必然性与有限观察者的格拉姆椭圆体（$\det G \ge 0$），以及相干—去相干逻辑、双端玻恩握手、延迟擦除无信令与闭环自洽不动点（[@thm-ch29-coherence-complement-and-pinching]–[@thm-ch29-double-cover-fates-and-dottie]、[@rem-ch29-transactional-tsvf-eraser-literature]、[@rem-ch29-coherence-causality-comparison]）融为一炉：**全局无时间，故万古长存；观察者有限，故步步皆新。**

::: {.viz src="gram-causal-elliptope" height="640"}
**交互实验室 `ORTHO//ELLIPTOPE`**：有限观察者的多步记忆窗口。舞台是三元格拉姆椭圆体与它在历史 $x$ 处的截面，品红的椭圆是记住 $M = 2, \dots, 5$ 步时下一步 $(y, z)$ 的边界，青色线段是 $z$ 的窗口，阶梯条给出顺序主子式。切换到 $\mathbb{R}^3$ 可以看到四根以上的向量撑不出体积：记到第三层，泡泡只剩边界；第四层起只剩孤立的点。这是事件要取在 $\mathbb{R}^6$ 中的原因。三元椭圆体的刻画与西尔维斯特判据是文献结果，未在本书形式化；把 $G \succeq 0$ 读作因果相容空间是本书的诠释（`MODEL`）。
:::


下一章（[第 30 章](ch30-fields-lines-eth-and-navier-stokes.md)）将并置 **$\mathrm P$ vs. $\mathrm{NP}$**、**指数时间假设（ETH）的外部论文与示意上界曲线**、**OpenAI 受迫三维 NS 的 C / D 解答与零外力 A / B 的剩余开放范围**。连接这些主题的是全局状态、局部观测和反馈的几何类比（`MODEL`），不构成保留计算成本与流体演化的数学同构。
