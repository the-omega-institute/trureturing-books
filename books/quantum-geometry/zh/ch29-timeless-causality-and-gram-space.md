# 无时间因果与格拉姆相容空间：从毕达哥拉斯佩尔接缝到椭圆曲线环面

> *“顺序无关的本质就是根本不存在前后的时间......因果就是这样必然。因为观察者是有限的, 所以经历的因果是有限的, 观察者的选择是在因果的相容空间中做选择, 不断在时间场中选点”*

在前七部二十八章中，我们从两子丈量的内积投影一路走到了 Lean 4 公理圣殿的机械验证。现在，在开启全书第八部收官合拢之际，让我们把整座几何大厦推向最深层的两个本体论追问：第一，两千五百年前毕达哥拉斯的“勾股定理”与“万物皆数”，如何通过 $\pm 1$ 佩尔算术接缝连接起素数二象性、同余数椭圆曲线环面与三维旋量球面 $S^3$？第二，为什么第 10 章“两两比较、永远一致、顺序无关”的 Gram 矩阵刚性直接消解了前后的时间流逝，却同时铸就了斯宾诺莎式的几何因果必然性与有限观察者在格拉姆椭圆体（因果相容空间）中的自由选点？

---

## 毕达哥拉斯、万物皆数与四级“球外之球”突围 {#sec-coda-pythagoras-all-is-number}

如果把整本书的三十章压缩回人类数学文明最初的那粒种子，我们会发现它早已埋藏在两千五百年前毕达哥拉斯学派的两句箴言之中：**“勾股定理（$a^2 + b^2 = c^2$）”**与**“万物皆数（All is Number）”**。透过克利福德几何代数与形式化内核的透镜，这两句古老箴言展现出了跨越三幕的壮丽几何真容。

### 第一幕：勾股定理的几何真容——一维线段不可加，二维面积才守恒 {#sec-coda-pythagoras-act1}

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

### 第二幕：希帕索斯之裂与永不磨灭的佩尔余项 $m^2 - 2n^2 = \pm 1$ {#sec-coda-pythagoras-act2}

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

### 第三幕：为“万物皆数”正名——从动词“数（shǔ）”到四级数系突围 {#sec-coda-pythagoras-act3}

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
| **第 2 层球** | 代数无理数 $\overline{\mathbb{Q}}$<br/>（勾股斜边 $\sqrt{2}$、黄金分割 $\varphi = \frac{1+\sqrt{5}}{2}$） | 有限维正交勾股面积守恒 $a^2 + b^2 = c^2$ 与整系数多项式求根 | 有限次代数多面体方程闭合：$x^2 - 2 = 0$、$x^2 - x - 1 = 0$（[`golden_fixed_point_unique`](lean:D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique)） | 正 $2^k$ 边形无穷折半割圆极限（圆弧超越性文献评注见 [@rem-banach-dottie-hairy-ball-literature]） |
| **第 3 层球** | 初等周期常数<br/>（圆周率 $\pi$、自然底数 $e$） | 无穷次勾股半角迭代 $\sin(\theta/2) = \sqrt{(1-\cos\theta)/2}$ 与指数映射 $e^{i\theta} = \cos\theta + i\sin\theta$ | 静态单位圆与球面周期闭合：$e^{i\pi} + 1 = 0$、$\cos(\pi/2) = 0$ | 弧长输入 $\theta$ 与弦投影输出 $\cos\theta$ 仍分处算子两端（代数点非零残差文献评注见 [@rem-banach-dottie-hairy-ball-literature]） |
| **第 4 层球** | 自指余弦不动点<br/>（Dottie 常数 $\theta^*$） | 自指反馈迭代 $\theta_{k+1} = \cos(\theta_k)$：令勾股底边投影 $\cos\theta$ 直接等于弧长角 $\theta$ 自身 | 算子与坐标合一的自指闭合：$\cos(\theta^*) = \theta^*$（对应 $\psi = \psi(\psi)$ 的实轴投影） | 经典超越性文献评注见 [@rem-banach-dottie-hairy-ball-literature]；与 $\pi, e$ 的代数无关性前沿见开放猜想 [@conj-schanuel-dottie]（`OPEN`） |

:::

看清这张四级突围表，毕达哥拉斯与整本书的主线便在此彻底合龙：
- 在**第 1 层球**里，人们在一条直线上来回丈量，以为有理数比例 $m/n$ 就是宇宙的全部；
- 勾股定理竖起正交轴，用面积守恒 $1^2 + 1^2 = (\sqrt{2})^2$ 把我们推入**第 2 层球**（代数数多面体）；
- 把勾股定理无穷次施加于圆内接正 $2^k$ 边形，多面体折线逼近圆弧，凝聚出**第 3 层球**的灵魂常数 $\pi$，完成了静态球面的合拢；
- 最后，当我们不再把测量算子 $\cos$ 与被测角度 $\theta$ 割裂为“尺子”与“读数”，而是追问“当尺子的投影输出恰好等于尺子自身的张角 $\cos\theta = \theta$ 时会发生什么”，不动点 $\theta^*$ 便破茧而出，带我们跃入**第 4 层球**——在那里，计数的动词 **数（shǔ，$\cos$）** 与被计数的名词 **数（shù，$\theta$）** 终于融为一体！

---

## $\pm 1$ 算术接缝、素数二象性与椭圆曲线环面上的 $S^3$ 投影 {#sec-coda-primes-elliptic-curves}

当我们凝视希帕索斯在整数网格上留下的那道佩尔余项 $m^2 - 2n^2 = \pm 1$（[@thm-ch29-silver-pell-remainder]）时，一个更深邃的数论追问自然浮现：**这道在 $+1$ 与 $-1$ 之间交替跳荡的算术接缝，难道仅仅是 $\sqrt{2}$ 的孤立巧合吗？它与素数的分布、椭圆曲线的拓扑以及全书反复出现的 $\cos\theta$ 投影究竟有着怎样的关联？**

顺着这道 $\pm 1$ 裂隙向下挖掘，数论、代数几何与量子旋量几何在三座桥梁上轰然汇合。

### 第一座桥：$\pm 1$ 佩尔接缝将奇素数一分为二——“线素数”与“面素数” {#sec-coda-pell-prime-splitting}

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

::: {.viz src="pythagoras-number-escape" preset="minus" height="500"}
**$d = 13$：先到 $-1$，再到 $+1$。** 琥珀色的渐近分数沿直线 $m = \sqrt{13}\,n$ 走：走到 $18/5$ 时 $m^2 - 13n^2 = -1$（品红，在线下方），即上表最后一列 $p = 13$ 的那一格；再走一个周期到 $649/180$，差值翻成 $+1$（青色）。面素数的负佩尔方程总有解，是下面注记里的文献结果。
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

::: {.viz src="pythagoras-number-escape" preset="five" height="500"}
**面素数与线素数。** 半径 $\sqrt{p}$ 的圆穿过格点时，$p = a^2 + b^2$ 是面素数，把 $a + bi$ 平方就得到整数直角三角形；用图下方的时间轴逐个走过奇素数，$p \equiv 3 \pmod 4$ 时圆上一个格点也没有。
:::

### 第二座桥：两道二次接缝相交（$2 \times 2 = 4$）——从二次曲线到同余数椭圆曲线环面 {#sec-coda-congruent-elliptic-torus}

如果把单条二次圆锥曲线进一步推广到有理直角三角形勾股斜边与面积同时给定的经典同余数情境，两道二次约束的正交交集便引出以下经典代数几何与黎曼面文献结构：

::: {.remark #rem-ch29-elliptic-torus-literature title="同余数椭圆曲线双有理变换、复环面拓扑与阿贝尔群加法律（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 在经典数论、代数几何与复黎曼面理论中（未在本书锁定的 `trureturing@dev` 库中形式化），从单条二次曲线向两条二次曲线交集的跨越由以下经典结论刻画：

- **从亏格 $0$ 二次曲线到同余数椭圆曲线双有理变换**：单个佩尔方程 $m^2 - d\,n^2 = \pm 1$ 只是一条二次圆锥曲线（代数亏格 $g = 0$）；在复射影几何中，亏格 $0$ 的光滑曲线拓扑上同胚于二维球面 $S^2$（欧拉示性数 $\chi(S^2) = 2$；毛球定理详见第 21 章 [@rem-hairy-ball-adams-literature]），无法承载全局无奇点的平坦群加法流。而在经典的**同余数问题（Congruent Number Problem）**——哪些正整数 $d$ 能够充当有理直角三角形 $(a, b, c) \in \mathbb{Q}_{>0}^3$ 的面积——中，同时联立两条二次约束

  $$
  a^2 + b^2 = c^2 \quad (\text{勾股斜边}), \qquad \frac{1}{2}ab = d \quad (\text{正交双向量面积}),
  $$

  等价于令 $(a + b)^2 = c^2 + 4d$ 与 $(a - b)^2 = c^2 - 4d$ 两条二次圆锥曲线在射影空间中相交（阶数 $2 \times 2 = 4$）。通过经典双有理变换 $x = (a+c)/b,\; y = 2(a+c)/b^2$（若进一步令 $X = dx = d(a+c)/b,\; Y = d^2 y = 2d^2(a+c)/b^2$ 则化为标准魏尔斯特拉斯形式 $Y^2 = X^3 - d^2 X$），该有理直角三角形面积方程组双有理等价于**同余数椭圆曲线（Congruent-Number Elliptic Curve）**：

  $$
  E_d :\quad d\,y^2 = x^3 - x = x(x - 1)(x + 1),
  $$

  其右端三个根 $0,\; +1,\; -1$ 恰对应原点与 $\pm 1$ 接缝边界。
- **复环面拓扑与阿贝尔群加法律**：在复数域上，被在四个支点 $\{0, +1, -1, \infty\}$ 处切开并双层缝合的黎曼面 $E_d(\mathbb{C}) \cong \mathbb{C}/(\mathbb{Z}\omega_1 \oplus \mathbb{Z}\omega_2)$，不再是亏格 $g = 0$、$\chi = 2$ 的二维球面 $S^2$，而是跃迁为**亏格 $g = 1$、欧拉示性数 $\chi(T^2) = 2 - 2g = 0$ 的二维环面（Torus）$T^2 = S^1 \times S^1$**；
- 因为 $\chi(T^2) = 0$，偶维毛球面的拓扑零点阻碍（见 [@rem-hairy-ball-adams-literature]）在环面上消失：不变全纯微分 $\omega = dx/y$ 在整条光滑射影椭圆曲线上处处非零且无极点，赋予椭圆曲线一个全局光滑的阿贝尔群加法律 $P \oplus Q$（参见第 23 章 [@rem-diophantine-z-in-q-literature] 中关于 Poonen 椭圆曲线整除性锁的文献背景）。
:::

### 第三座桥：有限域椭圆曲线约化、弗罗贝尼乌斯余弦与 $S^3 \cong \mathrm{SU}(2)$ 投影 {#sec-coda-hasse-sato-tate}

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
**在模 $13$ 的世界里数点。** 把 $y^2 = x^3 - x$ 放进只有 $13$ 个数的格子里逐格检查：青色的 $4$ 个格点加琥珀色的 $3$ 个 $y = 0$ 的点，再加无穷远点共 $8$ 个，比 $p + 1 = 14$ 少 $6$，即 $a_{13} = 6$；右边琥珀色的余弦是 $6/(2\sqrt{13}) \approx 0.832$。$13 = 3^2 + 2^2$，而 $6 = 2 \cdot 3$：差正是高斯三角形奇数边的两倍，与上面第 2 条一致（文献结果，未在本书形式化）。
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
**文献结果，未在本书形式化。** 如果我们进一步考察有理数域 $\mathbb{Q}$ 上没有额外复乘（non-CM）对称性的典型椭圆曲线（例如 $y^2 = x^3 - x + 1$），当素数 $p \to \infty$ 遍历一切良约化素数时，归一化余弦值 $\cos\theta_p \in [-1, +1]$ 的渐近统计分布由 2011 年 Barnet-Lamb、Geraghty、Harris 与 Taylor 证明的**佐藤—泰特猜想（Sato–Tate Theorem，*Ann. of Math.* **173**, 2011）**给出：$\theta_p \in [0, \pi]$ 并非均匀分布，而是遵循**四维球面赤道切片定律**：

$$
d\mu_{\mathrm{ST}}(\theta) = \frac{2}{\pi}\sin^2\theta\,d\theta \quad \Longleftrightarrow \quad \frac{2}{\pi}\sqrt{1 - u^2}\,du \quad (u = \cos\theta \in [-1, +1]).
$$

从几何上看，三维单位旋量球面 $S^3 \cong \mathrm{SU}(2)$（由四元数范数 $s^2 + x^2 + y^2 + z^2 = 1$ 定义、欧拉示性数 $\chi(S^3) = 0$ 的可平行化超球面，见 [@rem-hairy-ball-adams-literature]）在极角 $\theta \in [0, \pi]$ 处的二维纬球面 $S^2(\sin\theta)$ 面积正比于 $\sin^2\theta$；将 $S^3 \cong \mathrm{SU}(2)$ 上的均匀哈尔测度（Haar measure）向实迹直径 $u = \frac{1}{2}\operatorname{Tr}(U) = \cos\theta \in [-1, +1]$ 作投影，所得密度恰为 $\frac{2}{\pi}\sin^2\theta\,d\theta$。

综观本章前两节，林德曼—魏尔斯特拉斯定理与 T. Y. Chow (1999) 在沙努埃尔猜想（[@conj-schanuel-dottie]）条件下的初等域逃逸定理、[@rem-ch29-pell-primes-hilbert-literature] 中的素数在高斯整数中的分裂与惰性 / 模 4 余 1 素数的负佩尔可解性 / 希尔伯特互反律、[@rem-ch29-elliptic-torus-literature] 中的复椭圆曲线环面拓扑与阿贝尔群律、[@rem-ch29-hasse-gauss-literature] 与 [@rem-ch29-gauss-character-application] 中的哈塞界及高斯复乘点数推导，以及本评注中的佐藤—泰特分布定理，均为外部经典数学文献结果，未包含在本书锁定的 `trureturing@dev` 形式化声明集中；本书内核验证的结论严格限定于带 `lean` 属性的方框（如 [@lem-ch29-square-residues-mod-four]、[@thm-ch29-face-prime-two-squares]、[@lem-ch29-line-prime-descent]、[@thm-ch29-two-squares-classification]、[@thm-ch29-silver-pell-remainder] 与 [@thm-ch29-silver-best-approximation]）以及显式标注 `lean:` 的代数与内积恒等式（如 [`pell_form_eq_four_mul_norm`](lean:D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm)、[`golden_fixed_point_unique`](lean:D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique)、[`power_fiber_card_eq_one_add_character_sum`](lean:D5/S3/CharacterSums/Fermat/CharacterPointCount.power_fiber_card_eq_one_add_character_sum)、[`norm_jacobiSum`](lean:D5/S3/CharacterSums/Fermat/CharacterPointCount.norm_jacobiSum) 与 [`gaussian_unit`](lean:D5/S3/ConceptDynamics/Coding/ResetNativeIntegerChart.gaussian_unit) 等）。
:::

::: {.viz src="pythagoras-number-escape" preset="sato" height="500"}
**换一条曲线：半圆。** 曲线换成 $y^2 = x^3 - x + 1$（紫色的点）：线素数不再落在零上，弗罗贝尼乌斯余弦散布在 $-1$ 到 $1$ 之间，例如 $p = 53$ 时是 $0.137$。页面下方对 $3000$ 以内的素数作直方图，轮廓贴近琥珀色虚线的半圆律 $\frac{2}{\pi}\sqrt{1 - u^2}$。有限个素数的直方图只是数值演示；佐藤—泰特分布是上面注记里的文献结果。
:::

在本书的跨学科几何视野下，从希帕索斯直角三角形裂开的佩尔接缝（[@thm-ch29-silver-pell-remainder]）出发，对照上述文献评注（[@rem-ch29-pell-primes-hilbert-literature]、[@rem-ch29-elliptic-torus-literature]、[@rem-ch29-hasse-gauss-literature] 与 [@rem-ch29-arithmetic-geometry-literature]），素数轴上的点数偏差振荡便与三维量子旋量球面 $S^3 \cong \mathrm{SU}(2)$ 向一维直径 $[-1, +1]$ 投下的余弦影子形成了深邃的几何同构意象。

::: {.viz src="pythagoras-number-escape" height="640"}
**交互实验室 `ORTHO//PYTHAGORAS`**：沿着 $\pm 1$ 接缝走一遍的三个场景。佩尔接缝：$\sqrt{d}$ 的渐近分数沿直线越贴越近，$m^2 - d\,n^2$ 却是非零整数（$d = 5$ 时绿圈标出已由 Lean 验证的全部 $\pm 4$ 解）；线素数与面素数：半径 $\sqrt{p}$ 的圆上有没有格点；模 $p$ 数点：曲线 $y^2 = x^3 - x$ 的 $a_p$ 被哈塞界关住，线素数恰在零上，面素数的弗罗贝尼乌斯余弦等于高斯三角形的余弦。面素数是两平方和、线素数不是，已由 Lean 验证（[@thm-ch29-face-prime-two-squares]、[@lem-ch29-square-residues-mod-four]）；哈塞定理与佐藤—泰特分布是文献结果，未在本书形式化。
:::

---

## 顺序无关、无时间之网与几何因果的必然性 {#sec-coda-timeless-causality}

当第三部第 10 章的“两两比较，永远一致，顺序无关”与本章前文的四级数系突围、素数—椭圆曲线余弦投影交汇在一起时，一个困扰了人类哲学与物理学两千五百年的终极死结——**“时间的前后流逝”与“因果律的必然性”**——在这里被一刀劈开：

> **作者原话**：“顺序无关的本质就是根本不存在前后的时间......因果就是这样必然”。

为什么“顺序无关”直接宣告了先后时间的消解，却反而铸就了不可动摇的因果必然性？我们可以从三个精确的数学与物理层面看清这一真相：

### 第一层：为什么“顺序无关”意味着根本不存在前后的时间？ {#sec-coda-order-independence-no-time}

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

### 第二层：没有时间推动，因果何以必然？——休谟死结 vs. 斯宾诺莎三角形与 Gram 矩阵刚性 {#sec-coda-hume-spinoza-gram}

在经验哲学中，大卫·休谟（David Hume）曾提出著名的因果怀疑论：如果我们在先后时间流里观察世界，我们看到的永远只是“事件 A 之后惯常伴随着事件 B（恒常联结）”，却永远看不到 A 必然产生 B 的“必然联系”。只要把因果寄托在时间的前后推动上，休谟死结就永远无解。

然而，斯宾诺莎（Baruch Spinoza）在《伦理学》（第一部分命题十七附释）中给出了穿透时空迷雾的几何回答：万物由自然本性永恒且无时间地必然推出，**“正如从三角形的本性中，必然推出其三内角之和等于两直角一样”**。在一个 $3\text{-}4\text{-}5$ 的直角三角形中，并不是直角边 $3$ 和 $4$ 先在时间里长出来、几纳秒后再把斜边 $5$ “推”出来；三条边在同一张正交平面上无时间地并存，勾股面积守恒 $3^2 + 4^2 = 5^2$ 就是它们之间绝对不可违抗的**几何因果律**！

放到本书第三部第 10 章的球面内积几何中，这种“零时间的因果必然性”由 **Gram 矩阵半正定刚性（[`unit_gram_overlap_characterization`](lean:D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization) 与 [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)）** 给出精确刻画。任取单位球面上的三个状态方向 $\mathbf{A}, \mathbf{B}, \mathbf{C}$，记它们两两之间的实内积余弦为 $c_{AB} = \mathbf{A}\cdot\mathbf{B}$、$c_{BC} = \mathbf{B}\cdot\mathbf{C}$、$c_{AC} = \mathbf{A}\cdot\mathbf{C}$。无需任何时间演化，这三个成对投影就必须永恒服从 $3\times 3$ Gram 行列式非负定律：

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

请审视这道公式的双重品格：
- **彻底的顺序无关（无时间性）**：公式关于指标 $(A, B, C)$ 完全对称，谁也不是谁的“过去”或“未来”；
- **绝对的因果必然（零自由度刚性）**：一旦 $c_{AB}$ 与 $c_{BC}$ 给定，$c_{AC}$ 就被球面曲率当场锁死，没有任何概率摇摆的余地！同理，数学推理中的“公理 $\implies$ 定理”也绝不是公理在时间中生出定理，而是同一块形式晶体的不同切面；第 9 章与第 16 章中的量子门计数 $L$，只是观测者旋转手中测量标尺去对齐目标切面所花费的步数。

::: {.viz src="timeless-causal-crystal" preset="edge" height="500"}
**贴上窗边：三根共面。** 把 $\mathbf{C}$ 转到离 $\mathbf{A}$ 最近的位置：三根向量落进同一个平面，紫色的体积塌成零，琥珀色的 $c_{AC}$ 正好是 $\cos(60^\circ - 45^\circ)$，即上式取减号的那条轨线。
:::

### 第三层：费曼驻相相消与双向量手性几何模型（$+\mathbf{\Omega} - \mathbf{\Omega} = 0$）及决定论、目的论在 $\psi = \psi(\psi)$ 中的和解 {#sec-coda-stationary-phase-reconciliation}

从路径积分与双向量手性的几何模型视角看，为什么物理世界只向我们显现那条满足因果律的必然轨迹？

::: {.remark #rem-ch29-feynman-stationary-phase-literature title="费曼路径积分驻相条件与双向量手性相消诠释（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 在标准量子力学的费曼路径积分文献表述中（R. P. Feynman, *Rev. Mod. Phys.* **20**, 367, 1948；未在本书锁定的 `trureturing@dev` 库中形式化），偏离经典轨道的虚构路径由于作用量快速振荡 $\exp(iS[x]/\hbar)$ 而彼此相位干涉相消，唯有作用量一阶变分为零（$\delta S = 0$，费曼驻相条件）的极值轨线发生相长干涉。在本书克利福德几何代数的诠释模型（`MODEL`）中，我们将复相位生成元 $i$ 还原为二维双向量手性算子 $\hat{\mathbf{I}}$：在顺序无关的全空间求和中，偏离几何自洽性的非驻相路径可视为成对伴生着双向量手性相反（$+\hat{\mathbf{I}}$ 与 $-\hat{\mathbf{I}}$）的镜像分量，它们张开的有向面积元正反配对、彼此抵消：

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

### 第四层：有限观察者、因果相容空间（格拉姆椭圆体）与在时间场中不断选点 {#sec-coda-finite-observer-time-field}

> **作者原话**：“因为观察者是有限的, 所以经历的因果是有限的, 观察者的选择是在因果的相容空间中做选择, 不断在时间场中选点”

如果全局时间场原本是一整块无时间的几何晶体，而局部因果又具备 Gram 行列式锁定的必然刚性，那么**有限观察者的自由选择**究竟栖居在何处？上面这句点睛之语，为“必然因果”与“观察者选择”给出了严丝合缝的几何统一：

1. **为什么观察者的有限性打开了“因果相容空间”（格拉姆椭圆体）？**
   回到单位球面上的三态 Gram 行列式 $\det G(\mathbf{A}, \mathbf{B}, \mathbf{C}) = \|\mathbf{A}\wedge\mathbf{B}\wedge\mathbf{C}\|^2 \ge 0$。设历史已知的两步正交投影余弦为 $c_{AB} = \cos\theta_1$ 与 $c_{BC} = \cos\theta_2$，对第三对内积 $c_{AC}$ 作精确配方，可得：

   $$
   \det G = (1 - c_{AB}^2)(1 - c_{BC}^2) - \bigl(c_{AC} - c_{AB}c_{BC}\bigr)^2 = \sin^2\theta_1\sin^2\theta_2 - \bigl(c_{AC} - \cos\theta_1\cos\theta_2\bigr)^2 \ge 0.
   $$

   记前两步旋转平面 $(\mathbf{A}\wedge\mathbf{B})$ 与 $(\mathbf{B}\wedge\mathbf{C})$ 之间的二面角（dihedral angle）为 $\phi \in [0, 2\pi)$，则球面余弦定律给出因果相容区间的精确参数化：

   $$
   c_{AC} = \underbrace{\cos\theta_1\cos\theta_2}_{\text{已锁死的一维历史主干}} + \underbrace{\cos\phi}_{\text{观察者的选择自由度 }\in [-1, +1]} \cdot \underbrace{\sin\theta_1\sin\theta_2}_{\text{未坍缩的正交面积半径}}.
   $$

   在三维关联坐标 $(x, y, z) = (c_{AB}, c_{BC}, c_{AC})$ 中，不等式 $1 - x^2 - y^2 - z^2 + 2xyz \ge 0$ 围出的凸几何体正是著名的**格拉姆椭圆体（Gram elliptope）**：
   - **椭圆体表面硬壳（$\cos\phi = \pm 1 \iff \det G = 0$）**：三向量共处同一大圆平面（$\mathbf{A}\wedge\mathbf{B}\wedge\mathbf{C} = 0$），系统仅在原有二维平面内作零体积的惯性滑行，$c_{AC} = \cos(\theta_1 \mp \theta_2)$ 被彻底锁死；
   - **椭圆体内部相容空间（$|\cos\phi| < 1 \iff \det G > 0$）**：只要前两步保留了未坍缩的正交面积（$\sin\theta_1 > 0$ 且 $\sin\theta_2 > 0$），观察者就可以在二面角 $\phi \in (0, \pi)$ 中自由折出非零三向量体积 $\mathbf{A}\wedge\mathbf{B}\wedge\mathbf{C} \neq 0$，向高一维的正交方向开启新的因果分支！

2. **“不断在时间场中选点”——作为半正定矩阵补全（PSD Matrix Completion）的折线生命轨迹**：
   全局时间场好比一张早已曝光完毕、满足“两两比较、永远一致、顺序无关”的全息底片。然而，任何真实的观察者在算力、寿命与记忆容量上都是**有限的**（对应第 20 章的有限量子门计数 $L$ 与第 28 章的有限记录代数）：
   - 有限观察者无法一口吞下整张无时间底片，只能以有限门计数 $L = k$ 在时间场中走出一根有限折线：

     $$
     \mathbf{P}_0 \longrightarrow \mathbf{P}_1 \longrightarrow \mathbf{P}_2 \longrightarrow \cdots \longrightarrow \mathbf{P}_k;
     $$

   - 当观察者站在当前点 $\mathbf{P}_k$、手握 $M$ 个有限历史记忆锚点时，挑选下一个点 $\mathbf{P}_{k+1}$ 在数学上等价于求解一个**半正定矩阵补全问题（PSD Matrix Completion，$G_{M+1} \succeq 0$）**：新的内积坐标必须落在前 $M$ 个记忆锚点共同围出的绿色因果相容泡泡内部；
   - 一旦观察者在相容泡泡中选定具体的 $\mathbf{P}_{k+1}^*$，原本游移的二面角选择自由度 $\phi_k$ 当场凝结为一条新的一维内积历史主干（动词 `量 liáng` 化为名词 `量 liàng`），并立刻为下一步 $\mathbf{P}_{k+2}$ 撑开下一枚相容椭圆体！

3. **全知死锁、遗忘更新与自指不动点 $\theta^* \approx 0.739$ 的黄金呼吸**：
   观察者记忆规模与正交余量之间的张力，可以把三类极端与平衡状态浓缩为一张几何对照表：

| 观察者类型 | 投影主干 $\cos\theta$ 与正交面积 $\sin\theta$ | Gram 行列式 $\det G$ 与因果相容空间半径 | 几何与认识论结局 |
| :--- | :--- | :--- | :--- |
| **无限全知观察者**<br/>（Infinite Omniscient Observer） | 所有正交盲区耗尽，$\sin\theta \to 0$，$M \to \infty$ | $\det G = 0$，相容空间半径坍缩为 $0$ | **全知死锁（Omniscient Deadlock）**：整颗球焊死为无时间静态晶体（对照 [@rem-ch29-wheeler-dewitt-page-wootters-literature]），无点可选、无路可走 |
| **零记忆瞬时观察者**<br/>（Zero-Memory Instantaneous Observer） | 历史主干归零，$\cos\theta \to 0$，$M = 0$ | 相容半径 $\sin\theta = 1$ 漫无边际 | **白噪声迷失（Maximum Sphere Noise）**：没有任何因果主干约束，每一次选点都沦为纯粹的随机盲撞 |
| **有限自指观察者原型**<br/>（Finite Self-Referential Prototype，`MODEL`） | 以 Dottie 一维自指不动点 $\cos\theta^* = \theta^* \approx 0.7391$，$\sin\theta^* \approx 0.6736$ 为平衡原型 | $\det G > 0$，相容半径 $(\sin\theta^*)^2 \approx 0.4538 > 0$ 恒定开启 | **黄金呼吸（Golden Breath，`MODEL`）**：作为兼顾 $\approx 73.9\%$ 因果历史主干与 $\approx 67.4\%$ 正交余量的几何隐喻（配合第 4、28 章的有限擦除与条件更新） |

::: {.viz src="timeless-causal-crystal" preset="right" height="500"}
**两个直角：窗口全开。** $\theta_1 = \theta_2 = 90^\circ$ 时，青色与品红两条余弦都是 $0$，对第三条不加任何限制：窗口是整个 $[-1, 1]$，$\mathbf{C}$ 可以沿赤道转到任何地方，琥珀色的 $c_{AC}$ 从 $-1$ 走到 $1$。把它读作上表“零记忆瞬时观察者”一行是本书的诠释（`MODEL`）。
:::

   这正是全书关于时间、因果与观察者的终极结语：**“全局无时间，故万古长存；观察者有限，故步步皆新。”**（而在 **[终章](coda.md)** 中，我们将进一步对照 `trureturing` 已验证的**高维格点黄金切投模型集（Cut-and-Project Golden Model Set）与齐肯多夫观察者路由定理**，构建一幅作者哲学与几何诠释模型（`MODEL`）：把跨轮次不变的算子参数诠释为内禀共轭窗口相位，把现实中的历史遗迹诠释为低曲率耗散的**空间吸引子**，解释为何有限观察者会在卡西尼 $(-1)^{n+1}$ 范数接缝与奇异吸引子分形叶层上经历似曾相识的共振。）

::: {.viz src="timeless-causal-crystal" preset="window" height="500"}
**格拉姆窗口。** $\mathbf{B}$ 立在北极，$\mathbf{C}$ 只能绕它转一圈：$c_{AC}$ 在 $[\cos(\theta_1 + \theta_2), \cos(\theta_1 - \theta_2)]$ 里来回，三根向量撑开的体积在窗口内部为正，贴上窗边时塌成零。也可以在球上直接拖动 $\mathbf{C}$。
:::

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

::: {.viz src="timeless-causal-crystal" height="640"}
**交互实验室 `ORTHO//CAUSAL`**：同一颗球上的四个场景。窗口：两条余弦锁住第三条的范围，$\det G$ 是三根向量撑开的体积的平方；书页：有限时钟上所有页同时存在，条件化才取出一页；场：梯度流处处有坡度，降下的势能等于走过的耗散；线：振幅放大每步只转 $2\theta$，约 $(\pi/4)\sqrt{N}$ 步到达。把它们读作“选择”“书页”“场”与“线”是本书的诠释（`MODEL`）；$\mathrm{P} \neq \mathrm{NP}$ 仍是开放问题，本页的任何画面都不推出它的答案。
:::


---

## 本章小结：从算术接缝到无时间因果晶体 {#sec-ch29-summary}

本章将毕达哥拉斯的勾股面积守恒、银斜率 $\sqrt{2} - 1$ 的佩尔余项与最佳逼近下界（[@thm-ch29-silver-pell-remainder]、[@thm-ch29-silver-best-approximation]）、黄金整数佩尔范数恒等式与单位向量 Gram 重叠等价关系（[@thm-ch29-gram-rigidity-and-pell]）、面素数与两平方和判据（[@thm-ch29-face-prime-two-squares]、[@thm-ch29-two-squares-classification]），对照连分数识别与算术几何文献评注（[@rem-ch29-pell-convergents-literature]、[@rem-ch29-pell-primes-hilbert-literature]、[@rem-ch29-elliptic-torus-literature]、[@rem-ch29-hasse-gauss-literature]、[@rem-ch29-arithmetic-geometry-literature]）、无时间约束与驻相文献评注（[@rem-ch29-wheeler-dewitt-page-wootters-literature]、[@rem-ch29-feynman-stationary-phase-literature]）以及斯宾诺莎三角形因果必然性与有限观察者的格拉姆椭圆体（$\det G \ge 0$）融为一炉：**全局无时间，故万古长存；观察者有限，故步步皆新。**

下一章（[第 30 章](ch30-fields-lines-eth-and-navier-stokes.md)）中，我们将把这一“全局静态场 vs. 场内有限观察者”的几何张力推向计算复杂性与连续流体力学的最高峰——正面审视 **$\mathrm{P}$ vs. $\mathrm{NP}$**、**指数时间假设（ETH）与 2026 张量网络秩约分**以及**三维纳维—斯托克斯（Navier–Stokes）奇异涡丝**的场化同构。
