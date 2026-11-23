# 31.1.3.2 Möbius 截断与零点谱恢复 {#sec-ch34-s28-s03-s02-mobius-and-spectra}


**素数立方项与平方截断的半相位。** 沿用 $E(a,B)=N(a,B)-2\ln(B/a)$。对全部实际非平凡零点 $\rho_k$ 按重数编号，取 $\gamma_k=\operatorname{Im}\rho_k$ 和 $c_k=1/[\rho_k(1-\rho_k)]$，用前一定理中的级数定义 $P$，并令 $\phi(u)_k=e^{i\gamma_k u}$。对 $x>0$，定义

$$
A_2(x)=4\operatorname{Re}\sum_\rho
\frac{x^{(\rho-1)/2}}{\rho(1-\rho)(2-\rho)}.
$$

::: {.theorem #thm-ch31-prime-window-cube-square title="素数尾窗的立方项、平方谱与黎曼猜想" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/RHRootCorrection.rh_iff_prime_window_cube_and_square"}
黎曼猜想成立，当且仅当存在 $a_0\ge2$ 和 $K>0$，使所有实数 $B\ge a\ge a_0$ 满足

$$
\begin{aligned}
\bigl|E(a,B)&-P(\phi(\ln B))+P(\phi(\ln a))\\
 &-9(a^{-1/6}-B^{-1/6})-A_2(B)+A_2(a)\bigr|
 \le K(a^{-3/10}-B^{-3/10}).
\end{aligned}
$$
:::

::: proof
在 RH 下，Costa Pereira 的夹逼从 $\psi-\vartheta$ 中分出平方根和立方根处的 $\psi$，余项至多为 $\psi(x^{1/5})$。积分并归一化后，立方主项贡献 $(3/2)x^{-1/6}$。再作一次对数窗口积分，得到系数 $9$。平方截断取 $y=\sqrt{x}$ 后，中心化修正为 $2Q(y)-2y\int_y^\infty Q(s)s^{-2}\,ds$。代入完整尾项的积分显式公式，得到逐零系数 $-2/[\rho(2-\rho)]$。积分这些模式便得到 $A_2(B)-A_2(a)$。

平方截断项使用相位 $e^{i\gamma_\rho\ln(x)/2}$，其平方是同一零点在 $\phi(\ln x)$ 中的相位。剩余对数密度受常数倍的 $x^{-3/10}$ 控制。在实际窗口上积分保留两端，误差界因而随窗口收缩而消失。[Costa Pereira 夹逼的复述](https://arxiv.org/html/2002.11068v2#S3.E16)

这条估计也反推 RH。利用绝对收敛和已知的临界带界，两个端点原函数在截止点至少为 $1$ 时一致有界。立方项与幂次余项也都一致有界。如果这条估计对所有右端点成立，固定一个满足条件的 $a$ 后，$E(a,B)$ 随 $B$ 增长始终有界。若 RH 不成立，取 $B\ge a^2$，宽窗定理给出超出 $2\ln(B/a)$ 任意多的实际窗口质量。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch31-rh-prime-fifth-window title="实际素数窗口的五次幂项" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/RHFifthWindow.prime_window_fifth_of_rh"}
在 RH 下，令 $R(a,B)$ 为上面立方项与平方谱估计绝对值内的有符号表达式。记 $D_s(a,B)=a^{-s}-B^{-s}$。存在 $a_0\ge2$ 与 $K>0$，使得每对实数 $B\ge a\ge a_0$ 都满足
$$
\left|R(a,B)-\frac{25}{6}D_{3/10}(a,B)\right|\le K D_{1/3}(a,B).
$$
:::

::: proof

有限 Chebyshev 分解把每个 $\psi(t^{1/d})$ 写为 $\vartheta(t^{1/k})$ 之和，其中 $k$ 遍历 $d$ 的倍数，始终使用同一个素数幂截止点 $t$。在 $\psi(t)-\vartheta(t)-\psi(t^{1/2})-\psi(t^{1/3})-\psi(t^{1/5})$ 中，指数 $2$ 至 $5$ 的系数全部抵消，指数 $6$ 的系数为 $-1$。当 $t\ge2$ 时，其余项的绝对值之和至多为 $4\ln(t)t^{1/7}$。将六次根项与这段余项合计，得到 $O(t^{1/6})$ 的无条件算术界。

五次根主项对 $dt/t^2$ 积分，再乘 $\sqrt{x}$，给出对数密度项 $(5/4)x^{-3/10}$。RH 下，中心化五次根尾项为 $x^{-2/5}$ 阶，而算术误差经同样的积分和缩放后为 $x^{-1/3}$ 阶。在 $[\ln a,\ln B]$ 上积分得到五次幂贡献 $(25/6)D_{3/10}(a,B)$，以及由 $D_{1/3}(a,B)$ 的常数倍控制的余量。两项均在 $B=a$ 时消失。原相位与半对数相位依旧沿同一组实际零点计算。 完整证明由 Lean 内核检查。
:::

对 $B>a$，在 $[a,B]$ 上比较两个幂函数的导数可得 $D_{1/3}(a,B)\le(10/9)a^{-1/30}D_{3/10}(a,B)$。因此当 $a\to\infty$ 时，$R(a,B)/D_{3/10}(a,B)$ 一致趋于 $25/6$，范围包括所有 $B>a$，也包括宽度趋于零的窗口。

沿用有符号余量 $R(a,B)$，保留五次项，并定义

$$
A_3(x)=18\operatorname{Re}\sum_\rho
\frac{x^{\rho/3-1/2}}{\rho(3-\rho)(3-2\rho)}.
$$

求和仍取原零点谱与平方根谱所用的全部实际零点，重数照计。

::: {.theorem #thm-ch31-prime-window-seventh title="六次幂、七次幂与立方根谱" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/RHSeventhWindow.prime_window_seventh_of_rh"}
在 RH 下，存在 $a_0\ge2$ 与 $K>0$，使得每一对实数 $B\ge a\ge a_0$ 都满足

$$
\left|R(a,B)-\frac{25}{6}D_{3/10}(a,B)
+\frac{18}{5}D_{1/3}(a,B)-A_3(B)+A_3(a)
-\frac{49}{15}D_{5/14}(a,B)\right|
\le K D_{3/8}(a,B).
$$
:::

::: proof
有限 Chebyshev 分解给第六、七次幂赋予系数 $-1$ 与 $+1$，第八次幂抵消。从第九次幂起，余项绝对值至多为 $4\ln(t)t^{1/9}$。在 RH 下，把前两项中的 $\vartheta(t^{1/n})$ 换成 $t^{1/n}$，与这段余项合并后，所得误差为 $O(t^{1/8})$。对尾积分归一化后，六、七次幂的主密度分别为 $-(6/5)x^{-1/3}$ 和 $(7/6)x^{-5/14}$，算术误差密度为 $O(x^{-3/8})$。 [六、七次幂的归一化估计](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SeventhCutoff.sixth_seventh_normalized)

立方根谱的模态系数为 $-3/[\rho(3-\rho)]$，相位为 $e^{i\gamma_\rho\ln(x)/3}$，其幂衰减为 $x^{-1/3}$，与六次幂主密度同阶。平方根和立方根中心化尾项各自与对应谱密度相差 $O(x^{-1/2})$，完整尾项的显式公式误差也为 $O(x^{-1/2})$。五次根中心化尾项为 $O(x^{-2/5})$。取共同起点足够大，使整个窗口上的 $-Q_\vartheta(x)$ 为正，负部质量便可写成对数坐标下的有符号积分。对谱逐项积分得到 $A_3(B)-A_3(a)$，对六、七次幂的主密度积分得到系数 $-18/5$ 与 $49/15$。在同一个区间 $[\ln a,\ln B]$ 上积分误差密度，所得界为常数乘 $D_{3/8}(a,B)$，涵盖 $B=a$。

参考仓库的 `FormBAt.mono` 利用幂函数关于指数的单调性，把逐点上界限制到左端点相同、右端点更近的窗口。这里直接在原窗口的每一点比较衰减率，并保留两个端点。 [参考仓库的窗口限制](https://github.com/the-omega-institute/riemann-hypothesis/blob/b8864ecd5798c6030a03d756fab95f0b89a12754/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/Window.lean#L37-L44)

完整证明由 Lean 内核检查。
:::

以 $N(a,B)$ 记实际素数尾项的负部质量，以 $P(u)$ 记原零点谱的原函数在对数相位轨道上的取值。对整数 $n\ge2$ 和截点 $x>0$，记
$$
A_n(x)=2n^2\operatorname{Re}\sum_\rho
\frac{x^{\rho/n-1/2}}{\rho(n-\rho)(n-2\rho)}.
$$
求和遍历全部实际非平凡零点，重数照计。各次根谱在同一对数坐标下使用对应的相位 $e^{i\gamma_\rho\ln(x)/n}$。记 $s_m=1/2-1/(m+1)$，$D_s(a,B)=a^{-s}-B^{-s}$。

::: {.theorem #thm-ch31-prime-window-mobius title="任意截断阶数共用一个阈值" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/RHMobiusWindow.prime_window_mobius_of_rh"}
假设 RH。存在常数 $a_0\ge2$ 与 $K>0$，使任意整数 $m\ge2$ 和任意一对实数截点 $B\ge a\ge a_0$ 都满足

$$
\begin{aligned}
&\Bigg|N(a,B)-2\ln(B/a)-P(\ln B)+P(\ln a)\\
&\quad+\sum_{n=3}^{m}\frac{2\mu(n)n^2}{(n-1)(n-2)}D_{1/2-1/n}(a,B)
+\sum_{\substack{2\le n\le m\\2n<m+1}}\mu(n)\bigl(A_n(B)-A_n(a)\bigr)\Bigg|
\le K m(1+\ln m)^2 D_{s_m}(a,B).
\end{aligned}
$$
:::

::: proof
有限 Chebyshev 恒等式用 $\mu(n)$ 加权 $\psi(t^{1/n})$ 表示 $\vartheta-\psi$。当 $t<2^n$ 时，$n$ 次根项为零。其余情形用 $\psi$ 的全局线性界控制几何尾部，给出随 $m$ 线性增长的常数。

在第 $n$ 阶先对完整尾项的平凡零点部分作中心化。第 $j$ 个平凡零点的系数变为 $n/[2j(n+2j)]$，其绝对总量用调和数控制。由此得到包括根变量等于一的 $O((1+\ln n)x^{-1/2})$ 界。实际非平凡零点按 $|\operatorname{Im}\rho|\le n$ 和 $|\operatorname{Im}\rho|>n$ 分段估计，保留重数。这样得到的谱密度界为 $O((1+\ln n)^2x^{1/(2n)-1/2})$。当 $2n\ge m+1$ 时，该谱密度满足目标衰减阶。对 $n\le m$ 求和。取一个与 $m$ 无关的阈值，使整段都有 $-Q_\vartheta(x)>0$。于是 $N(a,B)=\int_a^B[-Q_\vartheta(x)]\,dx/\sqrt{x}$，在对数坐标 $u=\ln x$ 下的密度为 $-e^{u/2}Q_\vartheta(e^u)$。再在 $[\ln a,\ln B]$ 积分，因 $s_m\ge1/6$，积分引入的因子 $1/s_m$ 至多为六。等端点 $B=a$ 时，两边都为零。完整证明由 Lean 内核检查。
:::

取 $m=9$ 时，第八、九次幂的 Möbius 系数为零，保留的谱项也与六、七次幂结果相同。因此同一余量满足 $D_{2/5}(a,B)$ 阶的界。

在十阶展开中，第八、九次幂系数为零。十次主项为 $-(25/9)D_{2/5}(a,B)$，与五次根谱同阶。保留两项后，剩余的误差界指数为 $9/22$。结论对每个有限截断阶数给出统一估计。当截断阶数随端点变化时，余项仍由同一对常数控制，其大小还取决于右边的端点幂差。 [Möbius 反演，DLMF 27.5.6](https://dlmf.nist.gov/27.5.E6) · [Suzuki，式 (36)](https://arxiv.org/html/2411.07436v3#S2.E36) · [Zhao 的式 (14) 与引理 7](https://arxiv.org/html/2411.18903v2)

::: {.theorem #thm-ch31-prime-window-mobius-single-log title="任意截断阶数的单对数余项" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/RHMobiusSingleLog.prime_window_mobius_one_log_of_rh"}
假设 RH。仍以 [@thm-ch31-prime-window-mobius] 左端绝对值内的量为有符号余项 $E_m(a,B)$。存在常数 $a_0\ge2$ 与 $K>0$，使任意整数 $m\ge2$ 和任意实数截点 $B\ge a\ge a_0$ 都满足

$$
|E_m(a,B)|\le K m(1+\ln m)\bigl(a^{-s_m}-B^{-s_m}\bigr),
\qquad s_m=\tfrac12-\tfrac1{m+1}.
$$

:::

::: proof
固定对数坐标 $u=\ln x$，令 $q=m+1$、$\lambda=u/q$。对同一个未纳入谱展开的中心化根尾项，实际零点系数给出 $(1+\ln n)^2$ 量级的因子，RH 下的 Chebyshev 误差经尾项积分则给出 $(1+u/n)^2$ 量级。后一个估计在根变量接近一时使用 $\psi$ 的全局线性界。因为未纳入的次数满足 $2n\ge q$，可用 $\min\{(1+2\lambda)^2,(1+\ln m)^2\}$。

提出目标衰减因子后，每项仍带权重 $\exp[-u(1/q-1/(2n))]$。从第一个未纳入次数 $\lceil q/2\rceil$ 开始，这些权重受一个几何级数控制。总和至多为 $m$，当 $\lambda>0$ 时也至多为 $1+q/\lambda$。两种因子相乘，在 $\lambda\le1$、$1<\lambda\le1+\ln m$ 和 $\lambda>1+\ln m$ 三个范围内都由常数乘 $m(1+\ln m)$ 控制。已保留谱项的平凡零点误差也符合该界。最后在原来的对数窗口上积分。因 $s_m\ge1/6$，积分因子至多为六。完整证明由 Lean 内核检查。
:::

这条界对 $B=a$ 也成立，两边均为零。

<a id="prob-ch31-prime-window-linear-remainder"></a>

::: {.theorem #thm-ch31-prime-window-linear-remainder title="截断阶数的线性余项" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/LinearOrder/RHMobiusLinear.prime_window_mobius_linear_of_rh"}
假设 RH。存在常数 $a_0\ge2$ 和 $K>0$，使每个整数 $m\ge2$ 与所有实数截点 $B\ge a\ge a_0$ 都满足以下界，其中 $E_m(a,B)$ 为 [@thm-ch31-prime-window-mobius] 中的有符号余项。

$$
|E_m(a,B)|\le K m D_{s_m}(a,B),\qquad
s_m=\tfrac12-\tfrac1{m+1},\qquad D_s(a,B)=a^{-s}-B^{-s}.
$$

:::

::: proof
平凡零点项利用 Möbius 权重的符号。由恒等式 $\mu(n)\ln n=-(\mu*\Lambda)(n)$、RH 下的 Chebyshev 误差界和倒数加权的 Möbius 和有界性，可得 Möbius 部分和的对数节省。固定 $u=\ln x\ge0$，平凡零点级数的正响应随次数增加，且至多为 $(1+\ln n)/2$。Abel 求和将这个增长与部分和的节省结合。提出 $e^{-u/2}$ 后，直到次数 $m$ 的加权响应由常数乘 $m$ 控制。

令 $q=m+1$。若 $u\le q$，未纳入谱的根项满足 $u/n\le2$，逐项使用中心化 Chebyshev 估计即可保持目标衰减。若 $u\ge q$，对数根坐标 $u/n$ 的间距至少为 $1/q$。按 $2u/q-u/n$ 的单位带分组。在每个带内对有限零点和及其对数坐标导数使用局部高斯均方界。有符号的单位窗零点计数保留解析重数，使频率箱质量的平方可和。相邻次数之差控制系数变化。每个带在乘权重 $\exp[-(2u/q-u/n)/2]$ 前的贡献至多为常数乘 $q$。几何求和包含权重可能等于一的首带。各采样点上的值级数绝对收敛，完整级数继承该界。

Möbius 截断误差与完整 Mangoldt 尾项的误差也满足相同的衰减界。由素数尾项的最终符号固定共同的左端阈值，再在原有区间 $[\ln a,\ln B]$ 上对所得密度估计积分。由 $s_m\ge1/6$，积分因子一致有界。$B=a$ 时两边均为零。完整证明由 Lean 内核检查。
:::

估计适用于每个有限阶数，阶数可以随端点选取。衰减指数、两端幂差和保留的根频谱沿用前述展开。 [加权均方方法，Coppola 与 Laporta，第 1 节](https://arxiv.org/abs/1411.1739v1)

<a id="prob-ch31-prime-window-sublinear-remainder"></a>

::: {.theorem #thm-ch31-prime-window-sublinear-remainder title="素数尾窗的一致次线性余项" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusSublinear.prime_window_mobius_sublinear_of_rh"}
假设 RH。存在实数阈值 $a_0\ge2$，使得对每个 $\varepsilon>0$，都存在整数 $m_0\ge2$，从而对所有整数 $m\ge m_0$ 及所有实数截点 $B\ge a\ge a_0$（包括 $B=a$）有

$$
|E_m(a,B)|\le\varepsilon m D_{s_m}(a,B).
$$

这里 $E_m(a,B)$ 仍为 [@thm-ch31-prime-window-mobius] 中的有符号余项，且 $s_m=\tfrac12-\tfrac1{m+1}$。
:::

::: proof
记 $u=\ln x$、$q=m+1$。Chebyshev 函数与 Möbius 权重的卷积恒等式，结合取整项的精确抵消，给出阶数 $m$ 以内所有 Möbius 前缀和乘以 $\ln m$ 后的一致 $o(m)$ 界。对平凡零点响应应用 Abel 求和即可利用这一节省。对递减的 Chebyshev 根权重作有符号 Abel 求和，截断尾项还能得到对数节省。

取有限个单位频率箱，使其余箱的质量平方和任意小。若 $u\ge Lq$，省略阶数的几何权重总和至多为 $1+q^2/u$。有限箱内的振幅有界，先取大 $L$，再取大 $m$，其贡献除以 $m$ 后即可任意小。其余箱由局部高斯估计控制，界正比于质量平方和的平方根。所有实际零点均按解析重数计入。若 $u\le Lq$，把省略的中心化根项写成 Chebyshev 积分项与幂项之差。两列权重各自随阶数递减，在固定 $L$ 后，有符号 Abel 求和给出所需的节省。

先由素数尾项的最终符号固定 $a_0$，再选精度。在 $[\ln a,\ln B]$ 上积分，并用 $s_m\ge1/6$，保留原有的两端幂差。完整证明由 Lean 内核检查。
:::

<a id="prob-ch31-prime-window-quantitative-sublinear-remainder"></a>

::: {.theorem #thm-ch31-prime-window-quantitative-sublinear-remainder title="素数尾窗余项的逆双对数界" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusSpacing.prime_window_mobius_spacing_of_rh"}
假设 RH。存在实数 $a_0\ge2$ 和 $C>0$，使每个整数 $m\ge2$ 与所有实数截点 $B\ge a\ge a_0$ 都满足

$$
|E_m(a,B)|\le \frac{C m}{1+\ln\ln(m+1)}D_{s_m}(a,B).
$$

这里 $E_m(a,B)$ 是 [@thm-ch31-prime-window-mobius] 中的有符号余项，且 $s_m=\tfrac12-\tfrac1{m+1}$。允许 $B=a$。

:::

::: proof
令 $q=m+1$，$u=\ln x$。在 Möbius 的带符号卷积式中，把取整与 Chebyshev 项相减，并将商变量的截点取为 $\ln(m)$ 的五分之四次幂。两段误差配平后，$m$ 以内每个 Möbius 前缀和乘以 $\ln m$ 都由常数乘 $m/(\ln m)^{1/5}$ 控制。Abel 求和把这个估计传给平凡零点的加权响应。

对充分大的 $m$，令 $J_m=1+\ln\ln q$ 且 $L=J_m/8$。若 $u\le Lq$，对两列随次数递减的根权重作带符号求和。提取目标指数衰减后，代价至多为常数乘 $e^{2L}m/\ln m$。

若 $u\ge Lq$，不同的坐标 $u/n$ 至少相隔 $u/q^2$。局部采样不等式把函数值的积分乘以 $1/\min(1,u/q^2)$，再加上相位导数的积分。对导数的两个界作插值，得到单位频率箱上的平方可和界。计入次数增量后，导数项的代价至多为常数乘 $q^{7/8}$。对各单位窗作加权求和，代价至多为常数乘 $1+q^2/u+q^{7/8}$，在此范围内由常数乘 $m/J_m$ 控制。频率箱按解析重数计入零点。

把密度估计在原窗口上积分，保留两端幂差。有限个较小阶数由 [@thm-ch31-prime-window-linear-remainder] 的线性界吸收到同一常数中。完整证明由 Lean 内核检查。
:::

::: {.lemma #lem-ch31-mobius-energy-prefix title="从加权能量得到普通 Möbius 前缀界" lean="D5/S3/Weil/ZetaPntBounds/MobiusEnergyPointwise.unweighted_mobius_prefix_power_bound"}
令 $1/2\le\theta<1$、$2\theta-1<\alpha<1$。假设对所有满足 $\operatorname{Re}z>\theta$ 且 $z\ne1$ 的复数都有 $\zeta(z)\ne0$。存在实数 $C>0$，使每个整数 $N\ge1$ 都满足
$$
\left|\sum_{1\le n\le N}\mu(n)\right| \le C N^{(2+\alpha)/3}.
$$
:::

::: proof
令按倒数加权的前缀为 $S(x)=\sum_{1\le n\le x}\mu(n)/n$。无零点条件保证能量 $\int_1^\infty S(x)^2 x^{-\alpha}\,dx$ 有限。在整数 $N\ge2$ 取 $H=|S(N)|$。此后每次跳变的大小至多为 $1/N$，所以在实区间 $N<x\le N+HN/2$ 上有 $|S(x)|\ge H/2$。该区间上的能量控制 $H^3N^{1-\alpha}$。分部求和把所得逐点界传给普通前缀，而 $N=1$ 可吸收到常数中。
:::

在 RH 下取 $\theta=1/2$、$\alpha=1/4$。所得 $N^{3/4}$ 界为素数尾窗证明的近区提供消去。逆对数尾窗界还需远区谱估计及其到两个实数端点的转移。 [逆对数尾窗问题](https://github.com/the-omega-institute/trureturing/issues/33096)

::: {.theorem #thm-ch31-mobius-short-average title="无零半平面给出的逐点 Möbius 前缀界" lean="D5/S3/Weil/ZetaPntBounds/MobiusShortAverage.ordinary_mobius_prefix_of_zero_free"}
设实数 $\tfrac12\le\theta<1$，并假定在每个满足 $\operatorname{Re}z>\theta$ 且 $z\ne1$ 的点上有 $\zeta(z)\ne0$。对每个 $\varepsilon>0$，存在 $C>0$，使所有整数 $N\ge1$ 都满足

$$
\left|\sum_{1\le n\le N}\mu(n)\right|\le C N^{\theta+\varepsilon}.
$$

在 RH 下可取 $\theta=1/2$。这是 Littlewood 的经典前缀界，见 [Soundararajan，第 1 页，式 (1)](https://arxiv.org/pdf/0705.0723v2)。
:::

::: proof
令 $x=N$、$h=\sqrt{x}$，记 $R(y)=\sum_{n\le y}\mu(n)(y-n)$。在短平均 $(R(x+h)-R(x))/h$ 中，$n\le N$ 的项恰好给出普通前缀。其余项的权重落在 $[0,1]$，且其中至多有 $\lfloor h\rfloor$ 个整数，所以与普通前缀的差至多为 $h$。

使用第一阶 Riesz 和的 Perron 积分，在分子中对两个端点作差。借助正实轴上的复幂导数可得到带一个垂直分母的界，直接估计两个端点则保留两个垂直分母。若 $w=1+|\operatorname{Im}s|$，这两条界和倒数 zeta 的次幂增长联合起来，给出与 $w^{-1-\delta}$ 成比例的可积上界。由此可以把积分线移到 $\operatorname{Re}s=\theta+\delta$。短平均的系数由 $O(x^{\theta+2\delta})$ 控制，其中 $\delta=\min(\varepsilon/3,1/4)$。加回误差 $h$ 即得所述前缀界。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch31-prime-window-inverse-log title="素数尾窗的逆对数界" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusInverseLog.prime_window_mobius_inverse_log_of_rh"}
假设黎曼猜想成立。存在实常数 $a_0\ge2$ 与 $C>0$，使每个整数 $m\ge2$ 和所有实数 $B\ge a\ge a_0$ 都满足
$$
|E_m(a,B)|\le \frac{Cm}{\ln(m+1)}D_{s_m}(a,B),
\qquad s_m=\tfrac12-\tfrac1{m+1}.
$$
余项 $E_m$ 见 [@thm-ch31-prime-window-mobius]，含有符号的算术修正项及按 $2n<m+1$ 保留的根模式，零点按解析重数计入。
:::

::: proof
记 $q=m+1$、$u=\ln x$、$L=1+\ln q/16$。在 $u\le Lq$ 时，对被略去的次数权重作有限 Abel 求和。用 [@lem-ch31-mobius-energy-prefix] 的 $m^{3/4}$ 前缀界，所得系数至多为常数乘 $e^{2L}m^{3/4}$。由于 $e^{2L}=e^2 q^{1/8}$，这个量至多为常数乘 $m/\ln q$。同一前缀界将平凡零点响应控制在常数乘 $m^{3/4}(1+\ln m)$ 以内。

在 $u\ge Lq$ 时，实际坐标 $u/n$ 的间距至少为 $u/q^2$。对略去的谱作分离采样，代价为 $1+q^2/u+q^{7/8}$，在此范围内至多为常数乘 $m/\ln q$。有符号的算术尾项也满足这一界。各项密度估计都带因子 $e^{-s_m u}$。在 $\ln a$ 与 $\ln B$ 之间积分得到端点差 $D_{s_m}(a,B)$，当 $B=a$ 时为零。阈值和常数对全部截断阶统一。
:::

::: {.theorem #thm-ch31-prime-window-power title="素数尾窗截断阶的幂次节省" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusPower.prime_window_mobius_power_of_rh"}
假设 RH。存在常数 $a_0\ge2$ 与 $C>0$，使每个整数 $m\ge2$ 和所有实数 $B\ge a\ge a_0$ 都满足
$$
|E_m(a,B)|\le C m^{27/28}D_{s_m}(a,B),\qquad s_m=\tfrac12-\tfrac1{m+1}.
$$
余项见 [@thm-ch31-prime-window-mobius]。它含有符号的算术修正，保留且仅保留 $2n<m+1$ 的次数，零点按解析重数计入。
:::

::: proof
记 $q=m+1$、$u=\ln x$。当 $u\le q$ 时，使用 [@lem-ch31-mobius-energy-prefix] 给出的 $q^{3/4}$ 普通 Möbius 前缀界。在略去的次数 $n\ge\lceil q/2\rceil$ 上作有限 Abel 求和，归一化的近区系数为 $O(q^{3/4})$。

当 $q\le u\le q^{29/28}$ 时，以 $H=\lfloor q^{1/7}\rfloor$ 为截点，分割实际零点虚部的单位频率箱。在低频箱，单个零点 $\rho$ 的归一化次数权重总变差至多为常数乘 $(1+|\operatorname{Im}\rho|u/q)/|\rho|$。复 Abel 求和把 Möbius 前缀界用在此总变差上。对低频箱求和后，所得上界为常数乘 $q^{3/4}(H+1)^{1/4}(1+(H+1)u/q)$。高频箱质量的平方和为 $O(H^{-1/2})$，故分离采样的代价为 $O(qH^{-1/4})$。两项都为 $O(q^{27/28})$。当 $u\ge q^{29/28}$ 时，使用代价为 $1+q^2/u+q^{7/8}$ 的全谱估计。

有符号的平凡零点项代价为 $O(q^{3/4}(1+\ln q))$。对算术尾项，截点 $q+j$ 与 $q-1$ 的 Möbius 前缀之差为 $O(q^{-1/4}(q+j))$。对递减的 Chebyshev 权重作 Abel 求和，将归一化后的算术尾项控制在 $O(q^{3/4})$。最后在 $\ln a$ 和 $\ln B$ 间积分，得到陈述中的端点幂差。当 $B=a$ 时该差为零。
:::

::: {.theorem #thm-ch31-prime-window-three-quarters title="有符号素数窗的四分之三指数界" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusThreeQuarters.prime_window_mobius_three_quarters_of_rh"}
假设黎曼猜想成立。对每个 $\varepsilon>0$，存在实数 $a_0\ge2$ 和 $C>0$，使每个整数 $m\ge2$ 和所有实数 $B\ge a\ge a_0$ 都满足
$$
|E_m(a,B)|\le C m^{3/4+\varepsilon}D_{s_m}(a,B),\qquad
s_m=\tfrac12-\tfrac1{m+1}.
$$
余项 $E_m$ 使用原来的两项带符号修正。谱和按零点的解析重数计数，保留的根原始量严格满足 $2n<m+1$。
:::

::: proof
记 $q=m+1$、$u=\ln x$。对每个遗漏次数 $n$，令 $v_n=u/n-2u/q\le0$。把实际根系数拆成 $-1/\rho-1/(n-\rho)$。写 $\rho=\tfrac12+i\gamma$，提出模为一的公共相位 $\exp(2i\gamma u/q)$。第一项的倒数 $\rho^{-1}$ 来自积分 $\int_{-\infty}^{v_n}e^{\rho t}\,dt$。把次数和移进积分，得到一个带符号的 Möbius 前缀，乘以 $e^{t/2}$ 和低频相位和。由于 $v_n$ 随 $n$ 递减，截到 $t\le v_n$ 所得的次数区间正好是两个普通前缀之差。

将 $t\le0$ 分成单位区间。局部谱积分由频率箱质量的平方和控制，指数权重使各区间的贡献可作几何求和。对低频箱使用实际零点计数后，首项代价为 $O(q^{1/2+\eta}(H+1)^{1/2+\eta})$。第二项的每个系数至多为 $3/q$，总代价为 $O((H+1)^{1+\eta})$。高频尾仍由平方箱质量控制，代价为 $O(qH^{\eta-1/2})$。

取 $H=\lfloor\sqrt q\rfloor$，三项都由 $O(q^{3/4+2\eta})$ 控制。近区和算术修正使用逐点 Möbius 前缀界。取足够小的 $\eta>0$，在 $\ln a$ 和 $\ln B$ 之间积分得到原端点差。$a=B$ 时两边均为零。完整证明由 Lean 内核检查。
:::

这一结论给出 RH 下的统一上界。原带符号余项的最优阶仍有待确定。


::: {.theorem #thm-ch31-prime-window-eight-ninths title="有符号素数窗的九分之八阶界" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusEightNinths.prime_window_mobius_eight_ninths_of_rh"}
假设 RH。对任意实数 $\varepsilon>0$，存在 $a_0\ge2$ 和 $C>0$，使每个整数 $m\ge2$ 和每对实端点 $B\ge a\ge a_0$ 都满足

$$
|E_m(a,B)|\le C m^{8/9+\varepsilon}D_{s_m}(a,B),\qquad s_m=\tfrac12-\tfrac1{m+1}.
$$

这里沿用 [@thm-ch31-prime-window-mobius] 的有符号余项，算术修正保留其符号，只保留 $2n<m+1$ 的根谱项，并按解析重数计零点。端点重合时两边均为零。
:::

::: proof
令 $q=m+1$、$u=\ln x$，在被省略的次数中写 $v_n=u/n$ 和 $W(v)=e^{-u/q+v/2}$。相邻相位作差时，把相位增量乘以 $W(v_{n+1})$。由 $e^t-1\ge t$，

$$
W(v_{n+1})(v_n-v_{n+1})\le 2\bigl(W(v_n)-W(v_{n+1})\bigr).
$$

右侧在次数上望远镜相消。连同根系数的相邻差估计，单个零点的次数总变差由 $O((1+|\operatorname{Im}\rho|)/|\rho|)$ 控制，该常数对 $u$ 一致。用复 Abel 求和先对低频零点的次数求和，再在单位频率箱中累加零点。取 $0<\eta\le\min(\varepsilon/2,1/36)$，普通 Möbius 前缀界为 $O(q^{2/3+\eta})$，低频部分的归一化系数至多为 $O(q^{2/3+\eta}(H+1)^{1+\eta})$。单位频率箱中的零点计数给出高频逆根模长质量的平方和上界 $O(H^{2\eta-1})$，所以对间隔分离的次数样本，高频系数至多为 $O(qH^{\eta-1/2})$。

对整个 $u\ge q$ 区间取 $H=\lfloor q^{2/9}\rfloor$，两项均由 $O(q^{8/9+2\eta})$ 控制。近区、平凡零点修正和算术尾项使用同一前缀界，至多多出 $1+\ln q$，可吸收到指数差中。把统一的密度界在 $\ln a$ 至 $\ln B$ 积分，就得到原端点幂差。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch31-prime-window-power-prefix title="由 Möbius 前缀指数控制有符号素数窗" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/PowerPrefixWindow.prime_window_mobius_of_power_prefix"}
假设黎曼猜想成立。给定 $0\le\beta<1$、$P>0$ 与 $\varepsilon>0$，并设对每个整数 $N\ge1$ 有
$$
\left|\sum_{1\le n\le N}\mu(n)\right|\le P N^\beta.
$$
存在实数 $a_0\ge2$ 和 $C>0$，使每个整数 $m\ge2$ 与所有实数 $B\ge a\ge a_0$ 都满足
$$
|E_m(a,B)|\le C m^{(2+\beta)/3+\varepsilon}D_{s_m}(a,B),\qquad
s_m=\tfrac12-\tfrac1{m+1}.
$$
这里 $E_m$ 使用上文的两项带符号修正。谱和按零点的解析重数计数，保留项仍严格满足 $2n<m+1$。
:::

::: proof
记 $q=m+1$、$u=\ln x$。当 $u\ge q$ 时，整数频率截点 $H$ 两侧的代价分别为 $O(Pq^\beta(H+1)^{1+\eta})$ 与 $O(qH^{\eta-1/2})$，其中 $0<\eta<1/2$。令 $\gamma=2(1-\beta)/3$ 并取 $H=\lfloor q^\gamma\rfloor$。用 $H+1\le2q^\gamma$ 控制低频，用 $H\ge q^\gamma/2$ 控制带负指数的高频项。两侧的 $q$ 指数都化为 $(2+\beta)/3+\gamma\eta$。截点与 $u$ 无关，所以同一估计适用于整个远区。

近区和算术尾项由同一前缀界控制。平凡零点项多出的 $1+\ln q$ 可吸收到 $\beta$ 和 $(2+\beta)/3$ 之间的正差内。选取足够小的 $\eta$，再对密度界积分，就得到原端点幂差。$B=a$ 时两边都为零。完整证明由 Lean 内核检查。
:::

在 RH 下，逐点 Möbius 前缀估计允许取 $\beta=1/2+\delta$，其中 $0<\delta<1/2$ 可任意小。给定最终余量 $\varepsilon>0$，取 $\delta=\min(\varepsilon,1/4)$，把 $\varepsilon-\delta/3$ 留给窗估计，便得到 $|E_m(a,B)|\le C m^{5/6+\varepsilon}D_{s_m}(a,B)$。该上界对所有允许的端点统一成立。余项是否达到这一阶仍是开放的。


::: {.theorem #thm-ch31-prime-window-late-spacing title="晚起点带符号素数窗的指数改进" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusLateSpacing.prime_window_mobius_late_spacing_of_rh"}
假设 RH 成立，固定 $0\le d\le1/2$ 与 $\varepsilon>0$。存在常数 $a_0\ge2$ 和 $C>0$，使所有整数 $m\ge2$ 及满足 $\ln a\ge(m+1)^{1+d}$ 的实端点 $B\ge a\ge a_0$ 满足
$$
|E_m(a,B)|\le C m^{3/4-d/2+\varepsilon}D_{s_m}(a,B),\qquad
s_m=\tfrac12-\tfrac1{m+1}.
$$
两项修正保留原来的符号。零点按解析重数计数，根原始量的保留条件为严格不等式 $2n<m+1$。
:::

::: proof
记 $q=m+1$、$u=\ln x$。遗漏次数对应的采样点 $u/n$ 至少相隔 $u/q^2$。阻尼因子 $e^{-u/q+u/(2n)}$ 使各单位区间的估计可以按几何级数求和。高频模式的局部积分给出 $O_\eta(H^{\eta-1/2})$。在 $0<\eta<1/2$ 时，相位导数在频率箱 $k$ 中的质量由 $O_\eta(\min(q,1+|k|)(1+|k|)^{\eta-1})$ 控制。按 $1+|k|=q$ 分段后，箱质量的平方和为 $O_\eta(q^{1+2\eta})$。局部采样估计据此将高频代价控制在 $O_\eta((1+q^2/u)H^{\eta-1/2}+q^{1/2+\eta})$。

带符号的 Möbius 前缀将低频代价控制在 $O_\eta(q^{1/2+\eta}(H+1)^{1/2+\eta}+(H+1)^{1+\eta})$。整个积分区间都有 $u\ge q^{1+d}$。取 $H=\lfloor q^{1/2-d}\rfloor$，两部分都受 $O_\eta(q^{3/4-d/2+2\eta})$ 控制。算术项和平凡零点项也满足这个界。在 $[\ln a,\ln B]$ 上积分得到 $D_{s_m}(a,B)$。当 $B=a$ 时，两边均为零。
:::

取 $d=1/2$ 时，起点条件为 $\ln a\ge(m+1)^{3/2}$，指数为 $1/2+\varepsilon$。该界适用于这一整段较晚的范围。允许起点变化时的最优统一指数仍有待确定。


::: {.theorem #thm-ch31-prime-window-very-late title="更晚起点处的带符号素数窗余项" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusVeryLate.prime_window_mobius_very_late_of_rh"}
假设 RH 成立。对每个 $1/2\le d\le1$ 与 $\varepsilon>0$，存在常数 $a_0\ge2$ 和 $C>0$，使所有整数 $m\ge2$ 及满足 $\ln a\ge(m+1)^{1+d}$ 的实端点 $B\ge a\ge a_0$ 满足
$$
|E_m(a,B)|\le C m^{1-d+\varepsilon}D_{s_m}(a,B),
\qquad s_m=\tfrac12-\tfrac1{m+1}.
$$
两项修正及其原有符号均保留。零点按解析重数计数，根原始量的保留条件为 $2n<m+1$。
:::

::: proof
记 $q=m+1$。在每个对数坐标 $u\ge q^{3/2}$，算术尾项分为次数 $q$ 到 $2q-1$ 的有限和，以及截到 $2q-1$ 后的余项。有限和的几何权重之和为 $O(1+q^2/u)$。在后一段，已有截断界相对于端点衰减率多出因子 $e^{-u/(2q)}$。由 $q e^{-u/(2q)}\le8$，归一化的算术尾项同样受 $O(1+q^2/u)$ 控制。

每个遗漏次数的实际零点系数代价为 $O((1+\ln q)^2)$，指数阻尼权重之和至多为 $1+q^2/u$。归一化后的平凡零点项还有一因子 $e^{-u/q}$。因此，对数密度总代价为 $O((1+\ln q)^2(1+q^2/u))$。给定窗口上有 $1+q^2/u\le2q^{1-d}$。用 $\varepsilon$ 吸收对数因子，再对 $[\ln a,\ln B]$ 积分。当 $B=a$ 时，两边均为零。
:::

当 $\ln a\ge(m+1)^2$ 时，定理对所有 $\varepsilon>0$ 给出因子 $m^\varepsilon$。奇数截断的首项和统一指数的下界见下文。


::: {.theorem #thm-ch31-prime-window-odd-cutoff title="奇数截断的首个遗漏项" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusOddCutoff.signed_window_odd_cutoff_expansion"}
假设 RH 成立。存在实数 $a_0\ge2$ 和 $K>0$，使每个满足 $m\ge2$ 且 $q=m+1$ 为奇数的整数 $m$ 及所有 $B\ge a\ge a_0$ 都满足下式。记 $s_m=1/2-1/q$、$\delta_m=1/q-1/(q+1)$，并设 $W_m=Kq(1+\ln q)^2$。

$$
\left|E_m(a,B)+\frac{\mu(q)q}{(q-1)s_m}D_{s_m}(a,B)\right|
\le W_m D_{s_m+\delta_m}(a,B)\le W_m\frac{s_m+\delta_m}{s_m}a^{-\delta_m}D_{s_m}(a,B).
$$

这里 $D_s(a,B)=a^{-s}-B^{-s}$，$E_m$ 沿用 [@thm-ch31-prime-window-mobius] 的两项带符号修正。零点按解析重数计数，根谱的保留条件为 $2n<m+1$。
:::

::: proof
把截断阶数从 $m$ 增到 $q$ 时，根谱条件只可能在 $2n=q$ 处改变。$q$ 为奇数，故根谱项完全相同。新保留的算术项恰是次数 $q$，其系数为 $-\mu(q)q/((q-1)s_m)$。扣除这项后，余项恰为 $E_q(a,B)$。

对 $E_q$ 使用全阶数估计。它的幂差衰减率是 $s_m+\delta_m$。在对数区间 $[\ln a,\ln B]$ 上有 $e^{-\delta_m u}\le a^{-\delta_m}$。把这一不等式用于两个幂差的积分表示，得到

$$
D_{s_m+\delta_m}(a,B)\le
\frac{s_m+\delta_m}{s_m}a^{-\delta_m}D_{s_m}(a,B).
$$

同一个比较覆盖 $B=a$，此时两个幂差都为零。
:::

::: {.theorem #thm-ch31-prime-window-no-negative-order title="任意晚窗中的阶数指数下界" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusOddCutoff.signed_window_no_negative_order_exponent"}
假设 RH 成立。给定任意 $\gamma>0$、任意实数 $K$、任意起点下界函数 $A:\mathbb N\to\mathbb R$ 和任意自然数 $N$，存在整数 $M\ge\max(2,N)$。对每个 $m\ge M$ 且 $m+1$ 为素数的阶数，存在阈值 $S\ge\max(2,A(m))$，使所有 $B>a\ge S$ 都满足

$$
E_m(a,B)>K m^{-\gamma}D_{s_m}(a,B).
$$
:::

::: proof
取 $M\ge\max(2,N)$，使所有 $m\ge M$ 都满足 $K m^{-\gamma}<1$。若 $q=m+1$ 为素数，则 $\mu(q)=-1$，且 $q/((q-1)s_m)=2q^2/((q-1)(q-2))>2$。固定该阶数后，提高起点阈值，使归一化展开误差小于 $1$。对每个 $B>a$，幂差都严格为正，故有符号余项 $E_m$ 大于该幂差。素数无上界，所以这也排除了任意固定正对数窗宽下的统一负指数界。
:::

若奇数 $q$ 含平方因子，首项系数因 $\mu(q)=0$ 消失，原式仍给出带额外衰减的界 $O_m(a^{-\delta_m}D_{s_m})$。若 $q$ 为偶数，增阶时还会加入次数 $n=q/2$ 的零点项，其衰减率与次数 $q$ 的算术项相同。下面的展开同时给出这两项。

::: {.theorem #thm-ch31-prime-window-even-cutoff title="偶数截断的算术项与零点项" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusEvenCutoff.signed_window_even_cutoff_expansion"}
假设 RH 成立。存在共同的 $a_0\ge2$ 和 $K>0$，使下列估计对所有整数 $m\ge2$、$q=m+1=2r$ 及所有 $B\ge a\ge a_0$ 成立。记 $s_m=1/2-1/q$、$\delta_m=1/q-1/(q+1)$ 和 $W_m=Kq(1+\ln q)^2$。沿用上文的余项 $E_m$ 与幂差 $D_s$，记 $P_r$ 为按实际 ζ 零点的解析重数求和的次数 $r$ 根原始量。则

$$
\begin{aligned}
&\left| E_m(a,B)+\frac{\mu(q)q}{(q-1)s_m}D_{s_m}(a,B)
          +\mu(r)\bigl(P_r(B)-P_r(a)\bigr)\right|\\
&\quad\le W_m D_{s_m+\delta_m}(a,B)
 \le W_m\frac{s_m+\delta_m}{s_m}a^{-\delta_m}D_{s_m}(a,B).
\end{aligned}
$$
:::

::: proof
阶数增至 $q$ 时，新增一个次数 $q$ 的算术项。根谱规则由 $2n<q$ 改为 $2n<q+1$，恰增加次数 $r$。这两个带符号修正移到余项一侧，得到同一对端点上的 $E_q$。全阶数估计给出较快的衰减率 $s_m+\delta_m$。在对数区间上比较两个指数积分，得到第二个不等式，并覆盖 $B=a$。
:::

::: {.theorem #thm-ch31-prime-window-shrinking-width title="收缩对数窗宽下的根谱" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusEvenCutoffShrinkingWidth.signed_window_even_cutoff_shrinking_width"}

假设 RH。沿用 [@thm-ch31-prime-window-even-cutoff]，令 $q=m+1=2r$，其中 $m\ge2$，并记 $s=1/2-1/q$、$\delta_m=1/q-1/(q+1)$、$c_m=\mu(q)q/(ms)$。定义

$$
 F_L(u)=\frac{E_m(e^u,e^{u+L})}{D_s(e^u,e^{u+L})},
 \qquad
 S_r(u)=\frac{1}{s}\operatorname{Re}\sum_k
 a_{r,k}\exp\!\left(\frac{\rho_k-1/2}{r}u\right),
 \qquad a_{r,k}=\frac{-r}{\rho_k(r-\rho_k)}.
$$

求和包含所有实际非平凡零点，按解析重数计数。对每个实数 $u$ 和每个 $L>0$，归一化根原函数增量恰好是 $S_r$ 的加权平均：

$$
 \frac{P_r(e^{u+L})-P_r(e^u)}{D_s(e^u,e^{u+L})}
 =\frac{\int_0^L e^{-st}S_r(u+t)\,dt}{\int_0^L e^{-st}\,dt}.
$$

存在共同起点阈值 $U_0>0$。对每个允许的截断阶数都存在 $K_m>0$，使得对每个 $\varepsilon>0$ 都可选取 $L_0>0$，满足

$$
 \left|F_L(u)+c_m+\mu(r)S_r(u)\right|
 \le \varepsilon+K_m e^{-\delta_m u}
 \qquad (u\ge U_0,\quad 0<L<L_0).
$$
:::

::: proof
在对数坐标中，根原函数是根密度 $s e^{-su}S_r(u)$ 的积分。把增量写成区间 $[u,u+L]$ 上的积分，并用 $D_s=e^{-su}(1-e^{-sL})$。由 $1-e^{-sL}=s\int_0^L e^{-st}\,dt$ 得到归一化加权平均。

在 RH 下，每个居中后的零点模态具有纯虚指数，因而一致连续。系数的模可和，所以有限部分和在整条实线上一致收敛。对照仓库也用同样的绝对可和尾项控制来提取指数级数的系数。由 $S_r$ 的一致连续性，加权平均逼近 $S_r(u)$ 所需的窗宽阈值与 $u$ 无关。将偶数截断展开除以 $D_s$，其余误差由 $K_m e^{-\delta_m u}$ 控制。 [对照证明](https://github.com/the-omega-institute/riemann-hypothesis/blob/b8864ecd5798c6030a03d756fab95f0b89a12754/src/Development/AbelianVarietyTheory/Proofs/DivisorProofs/ExpSumCoeffEqZeroOfVanishing.lean#L124-L143)
:::

固定一个允许的截断阶数。窗宽趋于零且起点下界趋于无穷时，逼近误差一致趋于零。若固定起点，误差界中仍含 $K_m e^{-\delta_m u}$。

::: {.theorem #thm-ch31-prime-window-shrinking-rate title="居中根谱的显式窗宽误差" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusEvenCutoffShrinkingRate.signed_window_even_cutoff_shrinking_rate"}

假设 RH。沿用 [@thm-ch31-prime-window-shrinking-width] 的 $F_L$、$c_m$、$\delta_m$ 和 $S_r$。存在共同起点阈值 $U_0>0$。对于每个满足 $m\ge2$ 和 $q=m+1=2r$ 的截断阶数，都存在 $C_m,K_m>0$，使得

$$
 \left| F_L(u)+c_m+\mu(r)S_r(u) \right|
 \le C_m L\bigl(1+\log(1/L)\bigr)^2 + K_m e^{-\delta_m u}
 \qquad (u\ge U_0,\quad 0<L\le 1/4).
$$
:::

::: proof
平移不超过 $L$ 时，虚部为 $\gamma$ 的零点项所乘的相位因子与一之差，模长至多为 $\min(2,|\gamma|L/r)$。在 $|\gamma|\le1/L$ 的范围内，$|\gamma|$ 抵消根系数分母中的一个因子，留下 $L/|\rho|$。截断和由常数乘 $L(1+\log(1/L))^2$ 控制。超过 $1/L$ 后，用相位差的上界二与倒平方尾和，得到常数乘 $L(1+\log(1/L))$ 的界。这些计数涵盖解析重数与虚部的两个符号。

由加权积分中值定理，归一化根原函数增量等于某个 $0\le t\le L$ 处的 $S_r(u+t)$。对这段平移应用同样的相位估计，并保留偶数截断的余项界。 [钉版加权积分中值定理](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/MeasureTheory/Integral/IntervalIntegral/MeanValue.lean#L101) · [零点计数原文推论 1.2](https://arxiv.org/pdf/2107.06506v1)
:::

这个不等式给出显式上界。带符号级数对窗宽的最优依赖仍待确定。

::: {.theorem #thm-ch31-centered-root-log-cusp title="居中根谱在原点的对数尖点" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHRootSignalCusp.root_signal_symmetric_cusp"}
假设 RH。对每个实数 $r>1$，令 $s=1/2-1/(2r)$，并用 [@thm-ch31-prime-window-shrinking-width] 中的级数定义 $S_r$。这里 $r$ 可取任意实数，级数仍按解析重数计入每个非平凡零点。设 $c=(\gamma_{\mathrm{EM}}-1+\log(2\pi))/2$，其中 $\gamma_{\mathrm{EM}}$ 是欧拉常数。存在 $C_r>0$，使得对每个 $0<h\le r/2$，

$$
\begin{aligned}
 \biggl|S_r(h)+S_r(-h)-2S_r(0)
 &-\frac{h}{s}\bigl(\log(1/h)+\log r-2c\bigr)\biggr|
 \le C_r h^2.
\end{aligned}
$$
:::

::: proof
写 $\gamma=\operatorname{Im}\rho$，$w_\rho=(1/4+\gamma^2)^{-1}$。对称差消去每项的正弦分量，余弦分量的乘子为 $2(\cos(\gamma h/r)-1)$。根系数的实部和参考系数 $-rw_\rho$ 相差

$$
\frac{r(r-1)(r-1/2)w_\rho}{(r-1/2)^2+\gamma^2}.
$$

用 $2|1-\cos x|\le x^2$，修正级数的绝对值由 $h^2$ 乘以一个常数控制，因为 $\sum_\rho w_\rho$ 有限。参考系数给出的部分为 $-2r(K(h/r)-K(0))/s$，其中 $K$ 是实际零点的加权余弦核。代入 $K$ 在原点的展开即得两个系数。这里借用了指数模逐项处理及绝对可和尾项控制的方法。 [指数级数方法](https://github.com/the-omega-institute/riemann-hypothesis/blob/b8864ecd5798c6030a03d756fab95f0b89a12754/src/Development/AbelianVarietyTheory/Proofs/DivisorProofs/ExpSumCoeffEqZeroOfVanishing.lean#L109-L143) · [实际余弦核的余项估计](lean:D5/S3/Weil/Mertens/IntegratedExplicit/ActualKernelCusp.cusp_remainder_bound)
:::

原点处的对称差以 $h\log(1/h)$ 为首阶。任意晚起点上的一阶增量及其最优一致模量需要另外的估计。

::: {.theorem #thm-ch31-late-root-log-increments title="任意晚起点上的前向增量下界" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHRootLateIncrement.root_signal_late_increment_lower"}
假设 RH。对每个实数 $r>1$ 及 [@thm-ch31-centered-root-log-cusp] 中的完整居中根谱 $S_r$，存在常数 $d_r>0$ 和 $0<H_r<1$。对任意 $0<h<H_r$ 及实数 $U$，存在实数 $u\ge U$ 使得

$$
|S_r(u+h)-S_r(u)|\ge d_r h\log(1/h).
$$
:::

::: proof
原点尖点给出对称差的正下界，尺度为 $h\log(1/h)$。给定偏移后，根系数绝对可和，因而完整级数是各坐标相位的连续函数。实际相位轨道可在任意晚的时刻返回初始相位向量的邻域，于是某个 $t\ge U+h$ 处的对称差保留了原点下界的一个固定比例。把这个对称差写成从 $t$ 出发的前向增量减去从 $t-h$ 出发的前向增量，两者至少有一个的绝对值达到所得下界的一半。两个起点都不小于 $U$。 [实际相位轨道的复现](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimePhaseCluster.phaseOrbit_cluster_iff)
:::

起点可以依赖偏移量和给定的下限。结论给出每条晚起点尾区间上最坏前向增量的下界。达到同一尺度的一致上界仍是开放问题。

::: {.theorem #thm-ch31-root-symmetric-tail-modulus title="每个尾区间上的根谱对称模量" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHRootTailModulus.root_signal_symmetric_tail_modulus"}
假设 RH，沿用 [@thm-ch31-centered-root-log-cusp] 的 $S_r$、$s$ 与 $c$。固定任意实数 $r>1$。对任意实数 $U$ 及 $0<h\le r/2$，当 $u\ge U$ 时，$|S_r(u+h)+S_r(u-h)-2S_r(u)|$ 的取值集合非空且有上界。记其上确界为 $M_r(U,h)$。存在对所有这些 $U,h$ 通用的 $C_r>0$，使得

$$
\left|M_r(U,h)-\frac{h}{s}\bigl(\log(1/h)+\log r-2c\bigr)\right|
 \le C_r h^2.
$$
:::

::: proof
对称差把纵坐标为 $\gamma$ 的模态乘以 $2(\cos(\gamma h/r)-1)$。逐项取绝对值，根系数的模至多为 $r/(1/4+\gamma^2)$。所得逐项上界之和等于 $2r(K(0)-K(h/r))/s$，对每个起点均可使用。下界来自相位复现。每条尾区间都含有任意接近原点带符号对称差的取值，所以上确界至少达到原点的这个值。夹住上确界的两个量具有相同的对数项、线性项和二阶余量界。
:::

对称模量的前两项对所有尾区间一致成立。前向增量的最优一致上界仍是开放问题。

::: {.theorem #thm-ch31-signed-shrinking-lower title="任意晚起点上的带符号窄窗误差下界" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHSignedShrinkingLower.signed_window_even_cutoff_shrinking_lower"}
假设 RH。取自然数 $m,r$，满足 $m\ge2$、$m+1=2r$ 和 $\mu(r)\ne0$，沿用 [@thm-ch31-prime-window-shrinking-width] 的 $F_L$、$c_m$ 与 $S_r$。存在 $0<H_m<1$，使得对每个 $0<d<e^{-s}/(8s)$、每个 $0<L<H_m$ 和每个实数 $U$，都存在实数 $u\ge U$ 满足

$$
-\mu(r)\bigl(F_L(u)+c_m+\mu(r)S_r(u)\bigr)\ge dL\log(1/L).
$$
:::

::: proof
根系数的虚部多衰减一个纵坐标因子。因此，原点两侧的根谱值之差由常数乘偏移量控制。将这项估计与 [@thm-ch31-centered-root-log-cusp] 的对称尖点结合，得到单侧的对数下界。用原窗口的正指数权作平均，下界仍有 $L\log(1/L)$ 的尺度。固定窗宽后，绝对可和的系数让加权平均和端点谱值都成为实际相位的连续函数。记 $C=e^{-s}/(8s)$ 与 $T=L\log(1/L)$，原点的平均谱差至少为 $CT$。对于每个 $d<C$，相位复现在任意晚的起点使谱差超过 $(C+d)T/2$。取起点足够晚，使归一化算术余项小于 $(C-d)T/2$，相减即得带符号下界。完整证明由 Lean 内核检查。
:::

因为 $\mu(r)\in\{-1,1\}$，上述不等式同时确定了误差的符号及其绝对值下界。起点可随窗宽和阈值变化。对同一带符号窗口，[@thm-ch31-prime-window-shrinking-rate] 的上界和这里的下界在窗宽尺度上仍差一个对数因子。

::: {.theorem #thm-ch31-signed-left-limsup title="四分之一周相位复现下的精确左端点误差" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusEvenCutoffLeftLimsup.signed_window_even_cutoff_left_limsup"}
假设 RH，并假设在不同正纵坐标的 ζ 零点上，常值相位 $i$ 属于实数 $t$ 所生成的相位向量 $(e^{i\gamma t})_{\gamma>0}$ 的乘积拓扑闭包。这意味着对任意指定的有限纵坐标列表，可以用同一个时刻使各相位任意接近 $i$。

取自然数 $m,r$，满足 $m\ge2$ 且 $m+1=2r$。沿用 [@thm-ch31-prime-window-shrinking-width] 的 $s,F_L,c_m,S_r$。对每个充分小的 $L>0$，下式定义上极限所用的绝对误差在充分晚的尾区间上有界。其首项系数为
$$
Q_m^{\mathrm{left}}(L)=\limsup_{u\to+\infty}|F_L(u)+c_m+\mu(r)S_r(u)|,
\qquad
\lim_{L\downarrow0}\frac{Q_m^{\mathrm{left}}(L)}{L\log^2(1/L)}
=\frac{|\mu(r)|}{4\pi s}.
$$
:::

::: proof
将校正位置由中点移到左端点，相当于减去 $\mu(r)$ 乘以步长 $L/2$ 的前向根谱增量。[@thm-ch31-signed-midpoint-limsup] 中的中点误差属于较低阶。在根谱增量中，将纵坐标为 $\gamma$ 的系数换成 $-r/(\tfrac14+\gamma^2)$，引起的误差对所有起始相位都由常数乘 $L$ 控制。在指定相位下，共轭零点的带符号正弦项相同。按不同正零点重新求和时保留每个零点的解析重数，主和式因此等于尺度为 $L/(2r)$ 的正纵坐标相位斜率乘 $r$。谱归一化给出该斜率的 $r/s$ 倍。斜率在 $t$ 处的首项是 $t\log^2(1/t)/(2\pi)$，代入 $t=L/(2r)$ 得到 $L\log^2(2r/L)/(4\pi s)$。对各模态的一致上界和任意晚的指定相位复现给出上极限的两侧估计。若 $\mu(r)=0$，两个取样位置的校正相同，晚期上极限为零。
:::

相位条件对每个有限纵坐标列表要求一个共同的时刻。证明通过该相位属于实际轨道闭包来控制整个绝对可和级数。仅假设 RH 是否足以推出同一左端点渐近，仍是开放问题。

::: {.theorem #thm-ch31-signed-midpoint-limsup title="对数中点校正后的素数窄窗误差" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusEvenCutoffMidpoint.signed_window_even_cutoff_midpoint_limsup"}
假设 RH。取自然数 $m,r$，满足 $m\ge2$ 且 $m+1=2r$。沿用 [@thm-ch31-prime-window-shrinking-width] 的 $s,F_L,c_m,S_r$，并沿用 [@thm-ch31-centered-root-log-cusp] 的 $c$。对每个 $0<L\le1/4$，定义

$$
Q_m(L)=\limsup_{u\to+\infty}
\left| F_L(u)+c_m+\mu(r)S_r(u+L/2)\right|.
$$

绝对值内的误差取绝对值后在充分晚的尾区间上有界。存在对这些窗宽通用的常数 $C_m>0$，满足

$$
\begin{aligned}
G_r(L)&=\frac{L}{8s}\bigl(\log(1/L)+\log(2r)-2c+\tfrac12\bigr),\\
\left|Q_m(L)-|\mu(r)|G_r(L)\right|
  &\le |\mu(r)|C_m L^2(1+\log(1/L))^2 .
\end{aligned}
$$
:::

::: proof
将平坦平均写成关于对数中点的左右配对，得到对称二阶差在 $[0,L/2]$ 上的积分，再除以 $L$。对任意中心使用 [@thm-ch31-root-symmetric-tail-modulus] 的上界，中心为零时使用带符号的尖点下界。积分 $h\log(1/h)$ 给出主项和线性项。换回归一化指数权时，两种权的总质量相同。先减去中点谱值，再用一阶差的显式模量控制密度之差。所有零点模态的绝对可和性使整窗积分成为同一相位向量的连续读数。一次共同的晚期相位复现恢复下界，归一化算术余项趋于零。完整证明由 Lean 内核检查。
:::

当 $\mu(r)=0$ 时，上极限为零。若 $\mu(r)\ne0$，中点校正的晚期最坏误差具有 $L\log(1/L)$ 的首项。左端点能否取得完整首项系数取决于 [@thm-ch31-weighted-phase-limsup] 中的加权相位亏损。

::: {.theorem #thm-ch31-signed-quadratic-midpoint title="对数中点校正的二次余项" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusEvenCutoffQuadraticMidpoint.signed_window_even_cutoff_midpoint_limsup_quadratic"}
假设 RH。取自然数 $m,r$，满足 $m\ge2$ 且 $m+1=2r$。沿用 [@thm-ch31-signed-midpoint-limsup] 的原始带符号素数窗口、对数中点校正以及 $Q_m(L)$ 与 $G_r(L)$。绝对误差在充分晚的尾区间上有界。存在常数 $C_m>0$，对每个 $0<L\le1/4$ 都有

$$
\left| Q_m(L)-|\mu(r)|G_r(L)\right|
\le |\mu(r)|C_mL^2 .
$$
:::

::: proof
对每个频率 $\omega$，先配对中点两侧距离为 $h$ 的模态。令 $q=1-\cos(\omega h)$。扣除中点值后，半对模态的乘子为 $-\cosh(sh)q-i\sinh(sh)\sin(\omega h)$。其模的平方等于 $q^2+2q\sinh^2(sh)$，故模至多为 $q+\sinh^2(sh)$。全零点系数的绝对可和性让附加项在求和后仍为二次量。中心为零时，用奇差的线性界控制指数权的奇部。再将中心为零的下界通过相位复现送到任意晚的起点，归一化算术余项在所取的上极限中消失。完整证明由 Lean 内核检查。
:::

这里的二次余项适用于原窗口的指数权，且允许 $\mu(r)=0$。左端点校正仍涉及一阶谱差的一致上界。

::: {.theorem #thm-ch31-weighted-phase-limsup title="左端点误差的加权相位判据" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHWeightedPhaseLimsup.signed_window_even_cutoff_weighted_phase"}
假设 RH。对 ζ 函数每个不同的正零点纵坐标 $\gamma$，记其解析重数为 $m_\gamma$。对充分大的 $T$，定义
$$
w_\gamma=\frac{m_\gamma\gamma}{1/4+\gamma^2},\qquad
W(T)=\sum_{0<\gamma\le T}w_\gamma,\qquad
D(T)=1-\frac{\displaystyle\sup_{v\in\mathbb R}\sum_{0<\gamma\le T}w_\gamma\sin(\gamma v)}{W(T)}.
$$

取自然数 $m,r$，满足 $m\ge2$ 且 $m+1=2r$，并沿用 [@thm-ch31-prime-window-shrinking-width] 的 $s,F_L,c_m,S_r$。对每个充分小的 $L>0$，绝对误差 $|F_L(u)+c_m+\mu(r)S_r(u)|$ 在充分晚的尾区间上有界。记它在 $u\to+\infty$ 时的上极限为 $Q_m^{\mathrm{left}}(L)$。于是
$$
\frac{Q_m^{\mathrm{left}}(L)}{L\log^2(1/L)}
-\frac{|\mu(r)|}{4\pi s}\bigl(1-D(2r/L)\bigr)\longrightarrow 0
\qquad (L\downarrow0).
$$

当 $\mu(r)\ne0$ 时，归一化上极限趋于 $|\mu(r)|/(4\pi s)$ 当且仅当 $T\to+\infty$ 时 $D(T)\to0$。
:::

::: proof
令 $h=L/2$。从中点校正的带符号误差中减去 $\mu(r)(S_r(u+h)-S_r(u))$，便得到左端点校正的带符号误差。对 $\gamma\le r/h$ 的根谱模态作线性近似，再估计剩余的高频尾部，得到根谱增量的近似式 $(2h/s)\sum_{0<\gamma\le r/h}w_\gamma\sin(\gamma u/r)$，其误差对所有 $u$ 一致由常数乘 $h\log(1/h)$ 控制。正弦多项式的奇性使它的实上确界等于绝对值的上确界。共同相位复现使任意接近该上确界的取值在任意晚的起点出现。中点误差属于较低阶，而 $W(T)/\log^2 T\to1/(4\pi)$。代入 $T=2r/L$ 即得公式与等价条件。当 $\mu(r)=0$ 时，两种校正相同，充分小窗宽的晚期上极限为零。
:::

仅在 RH 下，实际零点是否满足 $D(T)\to0$ 仍是开放问题。在每个截断范围内，$D(T)$ 是对共同时刻 $v$ 取下确界得到的 $1-\sin(\gamma v)$ 加权平均。

::: {.theorem #thm-ch31-sparse-zero-phase title="稀疏遗漏零点计数保证左端点取得完整首项系数" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHSparseZeroPhaseAlignment.omittedMass_tendsto_zero D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHSparseZeroPhaseAlignment.weightedPhaseDefect_le_omittedMass D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHSparseZeroPhaseAlignment.weightedPhaseDefect_tendsto_zero D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHSparseZeroPhaseAlignment.signed_window_even_cutoff_full_coefficient_of_sparse_count"}
假设 RH，沿用 [@thm-ch31-weighted-phase-limsup] 的正零点纵坐标和权重。对一组纵坐标 $S$，定义遗漏计数 $B_S(T)$ 和遗漏质量 $W_{\mathrm{omit},S}(T)$，都在 $0<\gamma\le T$ 上求和。

$$
B_S(T)=\sum_{\gamma\notin S}m_\gamma,\qquad
W_{\mathrm{omit},S}(T)=\sum_{\gamma\notin S}\frac{m_\gamma\gamma}{1/4+\gamma^2}.
$$

若 $B_S(T)=o(T\log T)$，则 $W_{\mathrm{omit},S}(T)=o(\log^2 T)$。称一个截断的保留坐标与四分之一周相位相容，如果保留坐标的每个整数关系的系数和都是 $4$ 的倍数。对每个 $W(T)>0$ 的相容截断，

$$
0\le D(T)\le \min\!\left(1,\frac{2W_{\mathrm{omit},S}(T)}{W(T)}\right).
$$

若充分大的截断都相容，且 $W_{\mathrm{omit},S}(T)=o(\log^2 T)$，则 $D(T)\to0$。取 $m\ge2$、$m+1=2r$。若 $\mu(r)=0$，或 $S$ 在 $\mathbb Q$ 上线性无关且 $B_S(T)=o(T\log T)$，则该判据中的左端点误差绝对值对充分小的固定 $L>0$ 在 $u$ 的尾部有界，且

$$
\frac{Q_m^{\mathrm{left}}(L)}{L\log^2(1/L)}\longrightarrow\frac{|\mu(r)|}{4\pi s_m}
\qquad (L\downarrow0).
$$
:::

::: proof
每个零点的单位重数权重至多为 $1/\gamma$。对二进壳 $2^k<\gamma\le 2^{k+1}$，遗漏质量至多为 $2^{-k} B_S(2^{k+1})$。给定 $\varepsilon>0$，充分晚的壳上 $B_S(2^{k+1})\le\varepsilon\,2^{k+1}\log(2^{k+1})$。求和并除以 $\log^2 T$ 后，晚期壳的贡献至多为常数乘 $\varepsilon$，固定初段的贡献趋零。

相容性使共同时间轨道可以任意接近所有保留相位都等于 $\pi/2$ 的相位。每个遗漏坐标的正弦至少为 $-1$，故最多损失其权重的两倍。正弦和在时间零点取值零，上确界又至多为 $W(T)$，所以 $D(T)$ 介于零和一之间。有理线性无关时只有零关系，因而每个截断都相容。由 $W(T)/\log^2 T\to1/(4\pi)$，遗漏质量占比趋于零，再应用加权相位判据。当 $\mu(r)=0$ 时，该判据直接给出系数零。
:::

实际 ζ 零点是否存在满足该遗漏计数条件的有理线性无关集，仍是开放问题。

::: {.theorem #thm-ch31-relation-phase-deficit title="整数关系给出的加权相位亏损下界" lean="D5/S3/Fourier/WeightedIntegerRelations.weighted_phase_deficit D5/S3/Fourier/WeightedIntegerRelations.weighted_phase_deficit_disjoint"}
设有限指标集 $J$ 上有实频率 $\gamma_j$ 与正权重 $w_j$，令 $W=\sum_{j\in J}w_j$。当 $W>0$ 时，以 [@thm-ch31-weighted-phase-limsup] 的方式定义有限正弦和的亏损 $D$。设 $A$ 是一族有限的整数关系，每行满足 $\sum_{j\in J}k_{aj}\gamma_j=0$。记 $\delta_a=|1-i^{\sum_{j\in J}k_{aj}}|$。取非负乘子 $\lambda_a$。若 $\sum_{j\in J}(\sum_{a\in A}\lambda_a|k_{aj}|)^2/w_j>0$，则 $J$ 非空，因而 $W>0$，并有

$$
D\ge
\frac{(\sum_{a\in A}\lambda_a\delta_a)^2}
{2W\sum_{j\in J}(\sum_{a\in A}\lambda_a|k_{aj}|)^2/w_j}.
$$

若 $W>0$，且各行非零并且支撑两两不交，则有

$$
D\ge \frac{1}{2W}\sum_{a\in A}
\frac{\delta_a^2}{\sum_{j\in J}k_{aj}^2/w_j}.
$$
:::

::: proof
对任意共同时间 $v$，一行整数关系对应的单位复数乘积为 $1$，而把每个相位换成 $i$ 后，该乘积为 $i^{\sum_j k_{aj}}$。把两乘积逐因子作差，并用 $|z^k-i^k|\le |k|\,|z-i|$，得 $\delta_a\le\sum_j |k_{aj}|\,|e^{i\gamma_jv}-i|$。以 $\lambda_a$ 加权求和，再用带权柯西–施瓦茨不等式和 $|e^{i\gamma_jv}-i|^2=2(1-\sin(\gamma_jv))$，最后对 $v$ 取上确界。支撑不交时，各列的平方没有交叉项。此时可取 $\lambda_a=\delta_a/(\sum_j k_{aj}^2/w_j)$。若各 $\delta_a$ 均为零，则第二个下界由 $D\ge0$ 给出。
:::

::: {.corollary #cor-ch31-relation-left-limsup title="正比例的相位亏损降低左端点首项" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHWeightedRelationLimsup.signed_window_limsup_le_of_eventually_disjoint_relations"}
沿用 [@thm-ch31-weighted-phase-limsup] 的 RH 假设与实际零点权重，并设 $\mu(r)\ne0$。若存在 $\varepsilon>0$，使每个充分大的 $T$ 都有一族支撑不交的非零整数关系，令 [@thm-ch31-relation-phase-deficit] 的第二个下界至少为 $\varepsilon$，则

$$
\limsup_{L\downarrow0}
\frac{Q_m^{\mathrm{left}}(L)}{L\log^2(1/L)}
\le \frac{|\mu(r)|}{4\pi s}(1-\varepsilon)
< \frac{|\mu(r)|}{4\pi s}.
$$
:::

::: proof
在 $T=2r/L$ 代入 $D(T)\ge\varepsilon$，再用移动系数公式中趋于零的余项。
:::

实际 ζ 零点是否有满足这一正下界的关系族仍是开放问题。单个不相容关系若固定在有限高度，其下界随 $W(T)$ 增长而趋于零。

::: {.theorem #thm-ch31-phase-relation-lattice title="完整整数关系的格点距离控制相位亏损" lean="D5/S3/Fourier/WeightedPhaseRelationLattice.weighted_phase_deficit_bounds"}
取有限实频率 $\gamma_j$ 与正权重 $w_j$，总权重 $W=\sum_j w_j>0$，亏损 $D$ 按 [@thm-ch31-weighted-phase-limsup] 定义。设整数矩阵 $K$ 的行在实数域上线性无关，且这些行的整数线性张成恰为所有满足 $\sum_j k_j\gamma_j=0$ 的整数向量 $k$ 所组成的格。记 $M=\operatorname{diag}(w_j)$，$G=KM^{-1}K^{\mathsf{T}}$。对每个整数向量 $z$，令 $b(z)=2\pi z-(\pi/2)K\mathbf{1}$，其中 $\mathbf{1}$ 是全一向量。定义

$$
E=\inf_z b(z)^{\mathsf{T}}G^{-1}b(z).
$$

则

$$
\frac{2E}{\pi^2W}\le D\le\frac{E}{2W}.
$$

当 $K$ 无行时，$E=0$。此外，$D=0$ 当且仅当存在整数向量 $z$ 使 $b(z)=0$，也就是 $K$ 的每一行之和都是 $4$ 的倍数。
:::

::: proof
任意有限实频率的共同时间轨道闭包，恰由所有整数关系的特征值等于 $1$ 来刻画。对任意实数 $a$，仅取时间 $t\ge a$ 或 $t>a$ 也得到相同闭包。把目标相位写成 $\pi/2$，角偏移记为 $x$，则 $x+\pi\mathbf{1}/2$ 给出轨道闭包中的相位，当且仅当 $Kx=b(z)$ 对某个整数向量 $z$ 成立。在该仿射集合中，加权平方误差 $x^{\mathsf{T}}Mx$ 由 $x_0=M^{-1}K^{\mathsf{T}}G^{-1}b(z)$ 取得最小值 $b(z)^{\mathsf{T}}G^{-1}b(z)$。因为 $K(x-x_0)=0$，展开加权平方误差时交叉项为零。

相位代价的加权和为 $\sum_j w_j(1-\cos x_j)$。用 $1-\cos x\le x^2/2$ 估计每个 $x_0$ 的代价，再对 $z$ 取下确界，得到上界。反过来，每个可行相位都可以取 $|x_j|\le\pi$ 的偏移角。此时 $1-\cos x_j\ge 2x_j^2/\pi^2$，相应的加权平方误差至少为 $E$，从而得到下界。连续性保证轨道闭包与实际轨道的代价下确界相同。

紧致的轨道闭包上存在代价最小的相位。若 $D=0$，正权重和余弦下界迫使其所有偏移角为零，于是 $Kx=b(z)$ 给出 $b(z)=0$。反过来，$b(z)=0$ 时，零偏移给出代价为零的可行相位。
:::

假设 RH。对 [@thm-ch31-weighted-phase-limsup] 的实际零点截断，以解析重数权重计算 $E(T)$，并使用满足定理假设的完整关系矩阵。两个常数与截断无关，所以 $D(T)\to0$ 等价于 $E(T)/W(T)\to0$。实际 ζ 零点的这一归一化格点距离是否趋零仍开放。

::: {.theorem #thm-ch31-short-relation-deletion title="短整数关系控制实现相位相容所需的舍弃权重" lean="D5/S3/Fourier/ShortPhaseRelations.weighted_deletion_bounds"}
取有限实频率 $\gamma_j$ 和非负权重 $w_j$，总权重 $W>0$。若一个子集上的所有整数关系都满足系数和被 $4$ 整除，则称该子集相容。令 $P$ 为使剩余子集相容所须舍弃的最小权重占比。对时间集合 $\mathcal T$，令

$$
D_{\mathcal T}=1-\sup_{v\in\mathcal T}\frac{\sum_j w_j\sin(\gamma_jv)}{W}.
$$

若 $\mathcal T$ 非空、$H>0$，且每个不相容子集都含有 $\ell^1$ 系数范数至多为 $H$ 的不相容关系，则 $P/H^2\le D_{\mathcal T}$。若 $\mathcal T$ 含有一条向上延伸的实数射线，则 $D_{\mathcal T}\le2P$。
:::

::: proof
固定一个共同时间。若关系 $\sum_j k_j\gamma_j=0$ 的系数和不被 $4$ 整除，则该关系的单位圆特征值在实际相位处为 $1$，在目标相位处为 $i^{\sum_j k_j}$。两者弦距的平方至少为 $2$。有限乘积的弦距至多为各坐标弦距按 $|k_j|$ 加权的和，而每个坐标弦距的平方为 $2(1-\sin(\gamma_jv))$。因此所有损失严格小于 $1/H^2$ 的坐标所构成的子集必相容。其补集的权重至少为 $PW$，每个被舍弃坐标的损失至少为 $1/H^2$。对共同时间取下确界得到下界。

对最小舍弃权重所对应的相容子集，轨道闭包包含所有保留相位均为 $\pi/2$ 的点。含上方射线的时间集合可以任意逼近该点。每个舍弃坐标最多贡献其权重的两倍损失，给出上界。
:::

::: {.theorem #thm-ch31-consecutive-phase-separation title="相邻整数频率给出平方倒数尺度" lean="D5/S3/Fourier/ShortPhaseRelations.consecutive_pair_separation"}
取任意自然数 $n$、等正权重和频率 $(n,n+1)$。此时 $P=1/2$。每个不相容子集都含有系数 $\ell^1$ 范数至多为 $H=2n+1$ 的不相容关系。对任意非空 $\mathcal T$，有 $1/(H^2+1)\le D_{\mathcal T}$。若 $\mathcal T$ 含有一条向上延伸的实数射线，则

$$
D_{\mathcal T}\le1-\cos\!\left(\frac{\pi}{2H}\right)\le\frac{\pi^2}{8H^2}.
$$

在后一情形下，$n=0$ 时恰有 $D_{\mathcal T}=1/2$。
:::

::: proof
当 $n>0$ 时，关系 $(n+1,-n)$ 的系数和为 $1$，两个单坐标子集都相容。当 $n=0$ 时，零频率自身构成长度为 $1$ 的不相容关系，保留频率 $1$ 即可。两种情形下都恰须舍弃一个坐标。将关系 $(n+1,-n)$ 代入 [@thm-ch31-relation-phase-deficit] 的单行下界，等权重约去，得到分母 $H^2+1=2((n+1)^2+n^2)$。

在时间 $\pi/H$，两个相位为 $\pi/2\pm\pi/(2H)$。加上 $2\pi$ 的整数倍可把该时间移到任意上方射线而保留正弦值。$n=0$ 时，只有频率 $1$ 的正弦项能取非零值，并且在每条上方射线上都能达到 $1$，所以归一化分数的上确界为 $1/2$。
:::

对每个固定的有限系统，只有有限个子集，因此可为所有不相容子集选取见证并统一其系数范数的上界。实际 ζ 零点的问题是能否控制这个上界随截断增长的速率。

::: {.theorem #thm-ch31-aggregate-phase-obstructions title="合并不同系数长度的相位障碍" lean="D5/S3/Fourier/PhaseObstructionLengths.omissionFraction_isLeast D5/S3/Fourier/PhaseObstructionLengths.simultaneous_bound D5/S3/Fourier/PhaseObstructionLengths.aggregate_bounds"}
对一组有限实频率，记 $P_h$ 为最小的舍弃权重占比，使保留的坐标中每条 $\ell^1$ 范数至多为 $h$ 的整数关系，其系数和都能被 $4$ 整除。这里 $h$ 取非负整数。这个最小值由某个子集取得。以下相位估计取非负权重，总权重为 $W$。用 $A(v)$ 表示在共同时间 $v$ 的加权正弦平均，归一化的分母为 $W$。当 $W=0$ 时约定平均与舍弃占比均为零。对时间集合 $\mathcal T$，令 $D_{\mathcal T}=1-\sup_{v\in\mathcal T}A(v)$，并取 $D_{\varnothing}=1$。

令

$$
S_N=\sum_{h=1}^{N}\left(\frac1{h^2}-\frac1{(h+1)^2}\right)P_h.
$$

对任意共同时间 $v$ 和自然数 $N$，有 $S_N+P_{N+1}/(N+1)^2\le1-A(v)$。令 $L=\lim_{N\to\infty}S_N$，则极限存在，且

$$
\sup_{h\ge1}\frac{P_h}{h^2}\le L\le D_{\mathcal T},
\qquad
\frac{P_{N+1}}{(N+1)^2}\le L-S_N\le\frac1{(N+1)^2}.
$$
:::

::: proof
固定共同时间 $v$。每个长度不超过 $h$ 的不相容关系都迫使其支撑中至少有一个坐标的损失 $1-\sin(\gamma_jv)$ 达到 $h^{-2}$。因此，损失至少为 $h^{-2}$ 的坐标所占权重至少为 $P_h$。对每个坐标，把不超过其实际损失的阈值所对应的增量相加。这些增量望远镜相消，连同最后一个阈值的剩余项，总和至多为该坐标的损失。再对所有坐标按权重求和，即得同一时间上的不等式。

各项非负，部分和有界，故极限存在。$P_h$ 随 $h$ 非减且不超过 $1$。从第 $N+1$ 项开始，增量之和为 $(N+1)^{-2}$，用两端的常数界估计这一尾和，即得余项界与单一长度的下界。
:::

::: {.theorem #thm-ch31-aggregate-phase-example title="三频例子中合并长度严格加强下界" lean="D5/S3/Fourier/PhaseObstructionLengths.strict_three_frequency_example"}
取频率 $(0,1,2)$，权重 $(1/2,1/4,1/4)$。则 $P_1=P_2=1/2$，且 $P_h=3/4$ 对所有 $h\ge3$ 成立。单一长度给出的最强下界是 $1/2$，而 $L=19/36$。对 $N\ge2$，

$$
S_N=\frac{19}{36}-\frac{3}{4(N+1)^2}.
$$

第五个部分和 $S_5=73/144$ 是第一个严格超过 $1/2$ 的部分和。
:::

::: proof
长度一的零频率关系迫使舍弃该坐标，损失权重 $1/2$。其余两个频率 $1,2$ 的关系都是 $(2,-1)$ 的整数倍。到长度三时至少还需舍弃一个坐标，增加 $1/4$。代入这个分段常数序列并相消，即得各个部分和与极限。
:::

应用到实际 ζ 零点的截断时，仍须确定哪些整数关系成立以及它们的支撑。

::: {.theorem #thm-ch31-exact-fourth-root-gaps title="四次单位根的弦距给出相位亏损下界" lean="D5/S3/Fourier/ExactFourthRootGaps.supportMaximum_zero_or_attained D5/S3/Fourier/ExactFourthRootGaps.breakpoint_partition D5/S3/Fourier/ExactFourthRootGaps.finite_step_integral D5/S3/Fourier/ExactFourthRootGaps.integrated_Q_le_deficit D5/S3/Fourier/ExactFourthRootGaps.length_series_le_integral"}
对有限实频率，若整数关系 $k$ 的系数和不被 $4$ 整除，称其不相容。定义

$$
\tau(k)=\frac{|1-i^{\sum_j k_j}|^2}{2\left(\sum_j|k_j|\right)^2}.
$$

对 $u>0$，令 $Q(u)$ 为至少击中每个满足 $\tau(k)\ge u$ 的不相容关系支撑所须舍弃的最小权重占比。对每个支撑，若存在不相容关系，则 $\tau$ 在所有具有该支撑的不相容关系上取得正的最大值。无此类关系的支撑取最大值为零。以这些最大值、$0$、$2$ 为分点，将 $(0,2]$ 分成有限个右闭区间 $(a,b]$。在每个这样的区间上，$Q$ 等于 $Q(b)$，因此积分是有限和 $\sum_{(a,b]}(b-a)Q(b)$。

取非负权重。若总权重为零，归一化平均与舍弃占比均为零。对任意时间集合 $\mathcal T$，系数长度级数 $L$ 与相位亏损满足

$$
L\le\int_0^2 Q(u)\,du\le D_{\mathcal T}.
$$
:::

::: proof
固定支撑和系数和的模 $4$ 余类，分子只取决于这个余类。每个非空余类都有长度最小的关系，选取这些最短关系中阈值最大的一个即可。支撑只有有限种，故改变阈值时，是否须击中某个支撑只会在有限个分点变化。等号处仍须击中该支撑，因此用右闭区间。

固定共同时间 $v$。字符乘积的弦距估计保证，每条不相容关系的支撑上至少有一个坐标的损失 $1-\sin(\gamma_jv)$ 不小于 $\tau(k)$。损失至少为 $u$ 的坐标集因而给出一个合法舍弃方案。对阈值积分便将 $Q$ 的积分控制在该时间的平均损失以内。长度至多为 $h$ 的不相容关系有 $\tau(k)\ge h^{-2}$，所以在 $(1/(h+1)^2,1/h^2]$ 上有 $Q(u)\ge P_h$。分区积分并取极限得到左侧比较。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch31-exact-fourth-root-pair title="等权频率一与三的精确弦距改进" lean="D5/S3/Fourier/ExactFourthRootGaps.pair_exact_Q D5/S3/Fourier/ExactFourthRootGaps.pair_strict"}
取频率 $(1,3)$ 和等正权重。若 $0<u\le1/8$，则 $Q(u)=1/2$。若 $u>1/8$，则 $Q(u)=0$。因此积分等于 $1/16$，大于系数长度级数的值 $1/32$。
:::

::: proof
两频率的关系都是 $(3,-1)$ 的整数倍。长度为 $4$ 的代表关系系数和为 $2$，对应的弦距平方为 $4$，所以阈值是 $1/8$。所有不相容关系都用到两个坐标，长度至少为 $4$，阈值至多为 $1/8$。舍弃任何一个坐标都足够。系数长度法从 $h=4$ 起的舍弃占比为 $1/2$，尾和给出 $(1/2)/4^2=1/32$。完整证明由 Lean 内核检查。
:::

实际 ζ 零点的截断仍需要独立确定不相容关系及其支撑。

::: {.theorem #thm-ch31-signed-phase-margin title="共振项的带符号贡献" lean="D5/S3/Fourier/WeightedPhaseRecurrence.weighted_phase_recurrence_of_margin"}
取有限指标集 $J$、实频率 $\gamma_j$、目标相位角 $\theta_j$、总和为一的非负权重 $p_j$、正整数 $N$ 与 $\varepsilon>1/N$。对各坐标相位变量 $x_j$，令 $c_k$ 为下式的 Fourier 系数。

$$
\left(\varepsilon-\sum_{j\in J}p_j(1-\cos x_j)\right)\prod_{j\in J}F_N(x_j),
\qquad F_N(x)=\frac{1}{N}\left|\sum_{\ell=0}^{N-1}e^{i\ell x}\right|^2.
$$

这些系数非负，且支撑在 $|k_j|\le N$ 内。令 $\xi(k)=\sum_j k_j\gamma_j$、$b(k)=\sum_j k_j\theta_j$，并对 $R>0$ 定义

$$
\begin{aligned}
A&=\sum_{\xi(k)=0} c_k\cos b(k),\\
B(R)&=\sum_{\xi(k)\ne0}\frac{2c_k|\sin(R\xi(k)/2)|}{|\xi(k)|},\qquad M(R)=RA-B(R).
\end{aligned}
$$

若 $M(R)>0$，则每个区间 $[a,a+R]$ 内都有时刻 $t$ 满足

$$
\sum_j p_j(1-\cos(\gamma_jt-\theta_j))\le\varepsilon-\frac{M(R)}{RN^{|J|}}.
$$
:::

::: proof
Fejér 恒等式 $(1-\cos x)F_N(x)=(1-\cos(Nx))/N$ 把展开化为三角形 Fourier 系数的乘积，以及用 $F_N(x)-1+\cos(Nx)$ 替换其中一个因子所得的项。替换去掉了这个因子的常数项，各系数仍非负。取 $x_j=\gamma_jt-\theta_j$，频率为零的项对区间积分恰好贡献 $RA$。其余余弦项带上各自的系数 $c_k$ 后，区间积分的绝对值至多为 $B(R)$ 中的对应项。因此乘积在区间上的最大值至少为 $M(R)/R$。Fejér 因子的乘积介于零与 $N^{|J|}$ 之间，在达到上面最大值的点得到所述亏损界。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch31-finite-phase-recurrence title="有限区间内的加权相位复现" lean="D5/S3/Fourier/WeightedPhaseRecurrence.weighted_phase_recurrence"}
取有限指标集 $J$，实频率 $\gamma_j$，目标相位角 $\theta_j$，以及总和为一的非负权重 $p_j$。令 $\xi(k)=\sum_{j\in J}k_j\gamma_j$，$b(k)=\sum_{j\in J}k_j\theta_j$。固定正整数 $N$ 与 $\delta>0$。对每个满足 $|k_j|\le N$ 的整数向量，假定 $\xi(k)=0$ 时 $\cos b(k)=1$，而 $\xi(k)\ne0$ 时 $|\xi(k)|\ge\delta$。

若 $\varepsilon>1/N$ 与 $R$ 满足

$$
R\delta(\varepsilon-1/N)>2\bigl(\varepsilon N^{|J|}-(\varepsilon-1/N)\bigr),
$$

则每个区间 $[a,a+R]$ 内都有时刻 $t$，使 $\sum_j p_j(1-\cos(\gamma_jt-\theta_j))<\varepsilon$。
:::

::: proof
Fejér 核 $F_N(x)=|\sum_{r=0}^{N-1}e^{irx}|^2/N$ 的 Fourier 系数非负，总和为 $N$，常数系数为 $1$。利用恒等式 $(1-\cos x)F_N(x)=(1-\cos(Nx))/N$，将各坐标 Fejér 核的乘积乘上 $\varepsilon$ 与加权亏损的差，得到系数非负的余弦展开。系数总和为 $\varepsilon N^{|J|}$，零向量的系数为 $\varepsilon-1/N$。频率为零的项贡献非负，其余每项的余弦在整个区间上的积分绝对值至多为 $2/\delta$。区间长度条件保证乘积的积分为正。取乘积为正的一点，其亏损即小于 $\varepsilon$。 完整证明由 Lean 内核检查。
:::

四分之一周相位取 $\theta_j=\pi/2$。对调和总权重为正的实际 ζ 零点截断，可取 $p_j$ 与解析重数权重成正比，取 $\gamma_j$ 为缩放后的纵坐标。估计依赖该截断在有限系数范围内满足上述条件。非零频率的分离量与精确关系的相位同余是两项独立输入。 [Bohr–Jessen 的 Fejér 核方法](https://arxiv.org/html/2411.14221#S4) · [RH 仓中的有限指数平均](https://github.com/the-omega-institute/riemann-hypothesis/blob/b8864ecd5798c6030a03d756fab95f0b89a12754/src/Development/AbelianVarietyTheory/Proofs/DivisorProofs/ExpSumCoeffEqZeroOfVanishing.lean#L32-L62)

::: {.theorem #thm-ch31-zeta-cutoff-recurrence title="幂次截断下的加权正弦复现" lean="D5/S3/Analytic/Oscillation/SpectrumPhaseCutoff.eventual_sine_cutoff_tradeoff"}
取局部有限的正实频谱 $\gamma_j$，频率互异，权重 $w_j\ge0$。记 $J(T)=\{j:\gamma_j\le T\}$，$W(T)=\sum_{j\in J(T)}w_j$，$S(T,v)=\sum_{j\in J(T)}w_j\sin(\gamma_jv)$。假设 $W(T)$ 最终为正，$\lvert J(X)\rvert=O(X\log X)$，且每个 $0<\alpha<1$ 都有 $W(T^\alpha)/W(T)\to q_\alpha\ge\alpha^2$。再假设每个 $d>0$ 都有常数 $C_d>0$，使每个固定 $M\in\mathbb N$ 在充分大的 $X$ 上满足如下分离界。对任意非零整数向量 $(k_j)_{j\in J(X)}$，若 $|k_j|\le M$，则 $|\sum_j k_j\gamma_j|\ge C_d\exp(-X^{1+d})$。

固定 $r,\beta>0$ 和 $\varepsilon>2(1-\min(\beta,1)^2)$。对于所有充分大的实数 $T$，有 $W(T)>0$，且每个区间 $[a,a+\exp(T^\beta)]$ 都含有一个 $u$ 满足

$$
1-\frac{S(T,u/r)}{W(T)}<\varepsilon.
$$
:::

::: proof
取 $0<\alpha<\min(\beta,1)$ 与 $0<\varepsilon_0\le1$，使 $2(1-\alpha^2)+\alpha^2\varepsilon_0<\varepsilon$。对截至 $X=T^\alpha$ 的频率应用 [@thm-ch31-finite-phase-recurrence]，取目标相位 $\pi/2$ 和整数 $M$ 使 $1/M<\varepsilon_0$。令 $d>0$ 满足 $\alpha(1+d)<\beta$。取对数后，分离量和有限展开的系数总量分别带来 $T^{\alpha(1+d)}$ 与 $O(T^\alpha\log T)$ 的开销，均比 $T^\beta$ 低阶。因此每个给定区间都含有一个点，使保留段的归一化亏损小于 $\varepsilon_0$。在该点，舍弃项的亏损至多为其权重的两倍。令 $q_T=W(X)/W(T)$，则全段亏损小于 $2(1-q_T)+q_T\varepsilon_0$。该式随 $q_T$ 递减，且极限小于 $\varepsilon$。
:::

对 [@thm-ch31-weighted-phase-limsup] 的实际 ζ 零点，假设 RH 和 Lamzouri 的有效线性无关猜想。猜想将系数上界取为按解析重数计的 $N(X)$。由于 $N(X)\to\infty$，它给出每个固定系数盒所需的分离量。不同纵坐标数至多为 $N(X)=O(X\log X)$。实际权重 $m_\gamma\gamma/(1/4+\gamma^2)$ 满足 $W(T)/\log^2 T\to1/(4\pi)$，因此 $W(T)>0$ 最终成立，且 $q_\alpha=\alpha^2$。通用结论于是给出该正弦和的统一等待尺度。猜想允许 $C_d$ 取无效常数。Lamzouri 的定理 1.5 则在其系数假设下对 $[2,X]$ 上截断至 $X^2$ 的和式取极值。 [Lamzouri 原文](https://arxiv.org/html/2311.04860v2)

取 $\beta=1$，对任意 $\varepsilon>0$ 都能在每个长度为 $e^T$ 的区间找到一次命中，因此 $0\le D(T)<\varepsilon$ 最终成立。在 RH 与有效线性无关猜想下，若 $\mu(r)\ne0$，[@thm-ch31-weighted-phase-limsup] 的左端点误差取得完整的首项系数 $|\mu(r)|/(4\pi s)$。

::: {.theorem #thm-ch31-zeta-local-average title="短区间平均改进幂次截断的亏损界" lean="D5/S3/Analytic/Oscillation/SpectrumThreeBandRecurrence.eventual_sine_three_band_recurrence"}
沿用 [@thm-ch31-zeta-cutoff-recurrence] 的频谱、非负权重和 $W(T),S(T,v)$。固定 $r,\beta>0$，令 $m=\min(\beta,1)$。假设存在在 $m$ 连续的函数 $q$，使得对每个 $0<p<1$，有 $W(T^p)/W(T)\to q(p)$。再假设对每个 $e>0$，当 $X$ 充分大时，$W(X)>0$，且每个长度为 $\exp X$ 的区间都有一个 $b$ 满足 $1-S(X,b/r)/W(X)<e$。

若 $\varepsilon>1-q(m)$，则对所有充分大的实数 $T$，$W(T)>0$，且每个区间 $[a,a+\exp(T^\beta)]$ 都含有一个 $u$ 满足

$$
1-\frac{S(T,u/r)}{W(T)}<\varepsilon.
$$
:::

::: proof
取 $0<\alpha<\kappa<\nu<m$，使 $\alpha,\nu$ 足够接近 $m$，并取充分小的 $e>0$。先在 $X=T^\alpha$ 取得低频命中 $b$，再对 $[b,b+h]$ 上的全段得分作平均，其中 $h=T^{-\kappa}$，第二个截断为 $Y=T^\nu$。截至 $X$ 的相位漂移使得分至多降低 $(hX/r)W(X)$。中段得分至少为 $-(W(Y)-W(X))$。对高于 $Y$ 的频率逐项积分，得到尾段的平均得分至少为 $-(2r/(hY))(W(T)-W(Y))$。连续性给出一个达到平均值的时刻。归一化后，低频漂移与高频平均误差均趋零，亏损上界趋于 $1+q(\nu)-2q(\alpha)+e\,q(\alpha)$。由 $q$ 在 $m$ 连续，可使它小于 $\varepsilon$。最终有 $\exp X+h\le\exp(T^\beta)$。
:::

对实际的 ζ 零点，在 RH 和有效线性无关猜想下，[@thm-ch31-zeta-cutoff-recurrence] 取指数 $1$ 给出前提中的低频命中，实际调和质量比给出 $q(p)=p^2$。于是充分阈值降为 $1-\min(\beta,1)^2$。[有限指数平均的参考实现](https://github.com/the-omega-institute/riemann-hypothesis/blob/b8864ecd5798c6030a03d756fab95f0b89a12754/src/Development/AbelianVarietyTheory/Proofs/DivisorProofs/ExpSumCoeffEqZeroOfVanishing.lean#L32-L62)

::: {.theorem #thm-ch31-finite-missing-window title="任意晚出现的正弦得分受限窗口" lean="D5/S3/Fourier/Concentration/FiniteSineMissingWindow.exists_arbitrarily_late_missing_window"}
设 $J$ 有限，$H\subseteq J$，$w_j\ge0$，实频率 $f_j$ 在 $\mathbb Q$ 上线性无关。取 $R,B\in\mathbb R$ 与 $h,\delta>0$。令 $V=\sum_{j\notin H}w_j^2$、$M=\sum_{j\in H}w_j+\delta+h\sum_{j\notin H}w_j|f_j|$。假设 $V=0$ 或
$$
\bigl(\lfloor R/h\rfloor_++1\bigr)\exp\!\left(-\frac{\delta^2}{2V}\right)<1,
$$
其中 $\lfloor x\rfloor_+=\max(0,\lfloor x\rfloor)$。若 $M<B$，则对每个 $A\in\mathbb R$，存在 $a>A$，使每个 $u\in[a,a+R]$ 都满足 $\sum_jw_j\sin(f_ju)<B$。
:::

::: proof
给尾段各坐标独立加上初相位 $0$ 或 $\pi$，各以概率 $1/2$ 选取。每个网格点 $kh$ 的尾段得分是独立中心化变量的和，第 $j$ 项的绝对值至多为 $w_j$。Hoeffding 不等式将得分达到 $\delta$ 的概率控制在 $\exp(-\delta^2/(2V))$ 以下。对所有网格点取并集上界，就能选出一组在每个网格点都合格的相位。若 $V=0$，尾段恒为零。由 $|\sin x-\sin y|\le |x-y|$，从左侧网格点出发可将尾段界延伸到整个 $[0,R]$。首段得分至多等于其总权重。有理线性无关使有限相位轨道在任意起点之后仍稠密。用单位圆上的弦距离逼近所选相位。时间演化只给每条弦乘以单位复数，所以平移后的整个区间共用同一误差界。取误差小于 $(B-M)/(1+\sum_j w_j)$ 即可。
:::

对 RH 下的实际 ζ 零点，假设**互异的正纵坐标**在 $\mathbb Q$ 上线性无关。固定 $r>0$、$0<\beta<1$ 与 $0<\varepsilon<1-\beta^2$。沿用按解析重数计权和包含端点的截断。当 $T$ 充分大时，任意晚仍会出现长度为 $\exp(T^\beta)$ 的区间，在整个区间内都有 $1-S(T,u/r)/W(T)>\varepsilon$。

取 $\beta<\kappa<\alpha<\sqrt{1-\varepsilon}$，以 $X=T^\alpha$ 截取首段，并取 $c>0$ 使 $\alpha^2<1-\varepsilon-3c$。由 $W(X)/W(T)\to\alpha^2$，首段质量最终至多为 $(1-\varepsilon-3c)W(T)$。对 $(\gamma-1,\gamma]$ 的局部零点计数给出 $m_\gamma=O(\log(\gamma+2))$。因此存在 $C>0$，使每个尾段权重至多为 $CT^{-\kappa}$，从而 $V\le CT^{-\kappa}W(T)$。取 $\delta=cW(T)$ 与 $h=cr/T$，则网格点数最终至多为 $\exp(2T^\beta)$。若 $V>0$，因为 $\kappa>\beta$ 且最终 $W(T)\ge1$，Hoeffding 指数 $\delta^2/(2V)$ 最终超过 $2T^\beta$。网格点之间的误差至多为 $h(T/r)W(T)=cW(T)$。所以 $M<(1-\varepsilon)W(T)$，可取 $B=(1-\varepsilon)W(T)$ 应用有限定理。 [调和质量极限](https://github.com/the-omega-institute/trureturing/blob/dev/D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHRootWeightedSine.lean) · [局部计数](https://github.com/the-omega-institute/trureturing/blob/dev/D5/S3/Weil/ZeroData/ZetaSpectrumLocalCount.lean) · [相关有限集中估计，定理 3.1](https://doi.org/10.1007/s13398-022-01369-4)

在 RH 和有效线性无关猜想下，若 $0<\beta<1$，统一命中的上界和缺失窗口从两侧确定阈值 $1-\beta^2$。有效线性无关蕴含普通线性无关，因为每个固定的整数关系最终都会进入它所控制的系数盒。[研究问题](https://github.com/the-omega-institute/trureturing/issues/33477)

::: {.theorem #thm-ch31-critical-missing-window title="临界质量比例处的缺失窗口" lean="D5/S3/Analytic/Oscillation/SpectrumCriticalMissingWindow.eventual_critical_missing_window"}
沿用 [@thm-ch31-zeta-cutoff-recurrence] 中包含端点的质量 $W(T)$ 和正弦得分 $S(T,v)$。假设频率在有理数上独立，且权重非负。假设 $W(Y)=a_0\log^2Y+O(1+\log Y)$，其中 $a_0>0$。再假设对每个 $\eta>0$，当 $X$ 充分大时，对所有 $T\ge X$ 都有
$$
\sum_{X<\gamma_j\le T}w_j^2\le\eta\frac{\log^2 X}{X}.
$$
固定 $r>0$ 与 $0<\beta<1$。当 $T$ 充分大时，$W(T)>0$，且对每个 $A\in\mathbb R$，存在 $a>A$ 使
$$
S(T,u/r)<\beta^2W(T)\qquad\text{对每个 }u\in[a,a+\exp(T^\beta)]\text{ 成立}.
$$
:::

::: proof
令 $L=\log T$、$X=e^{-K}T^\beta$。若质量误差至多为 $C(1+\log Y)$，取 $K=(C(\beta+\beta^2)+4)/(2a_0\beta)$。展开 $\log X=\beta L-K$ 可得最终 $\beta^2W(T)-W(X)>3L$。在时间变量 $v=u/r$ 中取网格间距 $1/T^2$、尾段阈值 $L$。尾段斜率至多为 $TW(T)$，所以插值误差最终小于 $L$。取 $\eta=e^{-K}/(8\beta^2)$，方差至多为 $L^2/(8T^\beta)$。方差为正时，Hoeffding 指数至少为 $4T^\beta$，而网格点数至多为 $\exp(2T^\beta)$。这些不等式给出 [@thm-ch31-finite-missing-window] 所需的网格预算和严格余量。将得分时间中的两个端点乘以 $r$ 即得所述区间。
:::

::: {.theorem #thm-ch31-critical-missing-window-model title="满足临界窗口假设的无限频谱" lean="D5/S3/Analytic/Oscillation/SpectrumCriticalMissingWindowModel.exists_infinite_critical_model"}
存在一个局部有限的正频谱，含有无限多个互异且有理线性无关的频率，权重全部严格为正，并满足 [@thm-ch31-critical-missing-window] 的质量与尾段平方和假设。
:::

::: proof
取一族可数无限的有理线性无关实数。将每项乘以非零有理数，使第 $n$ 个频率位于 $(n+1)^{1/4}$ 与 $(n+2)^{1/4}$ 之间，其中 $n\ge0$。赋予该频率权重 $\log^2(n+2)-\log^2(n+1)$。完整频段的权重相消求和，给出质量系数 $16$ 和所需误差界。权重平方为 $O((n+1)^{-3/2})$，超过 $X$ 的频率从阶为 $X^4$ 的下标开始。平方和尾界为 $O(X^{-2})$，对上截断一致。
:::

在 RH 下，对实际 ζ 零点，已有质量误差界给出 $a_0=1/(4\pi)$。尾段平方和的改进来自 $m_\gamma=o(\log\gamma)$，其中 $m_\gamma$ 是解析重数。固定 $\epsilon>0$，取 $s=e^{-4/\epsilon}/2$。对零点 $\rho=1/2+i\gamma$，取 $c=\rho+s/4$ 并令 $g(z)=\zeta(c+z/4)/\zeta(c)$。圆盘上的 ζ 增长界与圆心处的倒数界给出 $|g(z)|\le C\gamma^2$，其中 $|z|\le1/2$。对零点 $z=-s$ 用 Jensen 估计，当 $\gamma$ 充分大时，得到 $m_\gamma\le\log(C\gamma^2)/\log((1/2)/s)\le\epsilon\log\gamma$。Goldston 与 Gonek 给出了更强的 $O(\log\gamma/\log\log\gamma)$ 阶。 [Goldston 与 Gonek，推论 1](https://arxiv.org/pdf/math/0511092#page=2)

将 $X$ 以上分成二进区间，由 $N(Y)=O(Y\log Y)$ 得到 $m_\gamma\log\gamma/\gamma^2$ 的尾和为 $O(\log^2 X/X)$。由 $w_\gamma^2\le m_\gamma^2/\gamma^2$ 和重数的次对数界，得出所需的统一小 $o$ 界。因此在 RH 和互异正纵坐标有理线性无关的假设下，当 $T$ 充分大时，任意晚都有长度为 $\exp(T^\beta)$ 的窗口，其全段亏损严格大于 $1-\beta^2$。再结合有效线性无关假设下的 [@thm-ch31-zeta-local-average]，等号处仍存在错过所求相位对齐的窗口。更细的等待尺度仍开放。 [等号情形研究](https://github.com/the-omega-institute/trureturing/issues/33482)

Fourier 恢复估计见 [§31.1.3.2.1](ch34-s28-s03-s02-fourier-recovery.md)。
