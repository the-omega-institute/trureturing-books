# 29.1 毕达哥拉斯、万物皆数与四级“球外之球”突围 {#sec-coda-pythagoras-all-is-number}

如果把整本书压缩回人类数学文明最初的那粒种子，我们会发现它早已埋藏在两千五百年前毕达哥拉斯学派的两句箴言之中：**“勾股定理（$a^2 + b^2 = c^2$）”**与**“万物皆数（All is Number）”**。透过克利福德几何代数与形式化内核的透镜，这两句古老箴言展现出了跨越三幕的壮丽几何真容。

## 29.1.1 第一幕：勾股定理的几何真容——一维线段不可加，二维面积才守恒 {#sec-coda-pythagoras-act1}

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

一旦将斜边归一化为单位半径 $c = 1$，古老的勾股定理 $a^2 + b^2 = 1$ 立刻化身为统摄全书十部曲的**母体守恒律**：

1. **量子力学（第一部至第三部）**：测量投影的粒子内积项 $\cos\theta$ 与驱动旋转的波外积项 $\sin\theta$ 满足勾股恒等式 $\cos^2\theta + \sin^2\theta = 1$——玻恩规则概率守恒 $P(0) + P(1) = 1$（[`born_probability_skeleton`](lean:D5/S3/Quantum/FiniteDimensional.born_probability_skeleton)）与内积空间平行四边形/勾股范数律（[`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law) 及互补测量概率勾股定理 [`complementary_context_probability_pythagoras`](lean:D5/S3/Quantum/Tomography/ComplementaryContextProbabilityPythagoras.complementary_context_probability_pythagoras)）不过是单位圆上的勾股定理；
2. **狭义相对论（第五部第 17 章）**：闵可夫斯基时空中固有时流逝率 $d\tau/dt$ 与空间运动速率 $v/c$ 满足 $(d\tau/dt)^2 + (v/c)^2 = 1$（即 $d\tau^2 = dt^2 - dx^2/c^2$ 的正交重排，对应双曲旋量范数守恒 [`bogoliubov_norm_conservation`](lean:D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation)）——所谓“光子以光速飞行时不经历固有时流逝”，只是勾股斜边 $1$ 全部投影到了空间轴 $v/c = 1$ 上，使得时间轴投影归零；
3. **丢番图数论与旋量代数（第六部第 23 章）**：四元数单位球面 $S^3$ 的范数守恒 $s^2 + x^2 + y^2 + z^2 = 1$、艾森斯坦二次范数型恒等式（[`Qform_eq_eisNorm`](lean:D5/S3/PrimeForms/Crossing/CrossingNormForm.Qform_eq_eisNorm)）与黄金整数佩尔范数恒等式（[`pell_form_eq_four_mul_norm`](lean:D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm)），则是高维正交与二次格空间中的勾股定理。

## 29.1.2 第二幕：希帕索斯之裂与永不磨灭的佩尔余项 $m^2 - 2n^2 = \pm 1$ {#sec-coda-pythagoras-act2}

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

## 29.1.3 第三幕：为“万物皆数”正名——从动词“数（shǔ）”到四级数系突围 {#sec-coda-pythagoras-act3}

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
