# 39.5.6 自指尺度对照：Dottie 余弦不动点 $\theta^*$ 与内禀收缩模 $|\alpha|$ {#sec-ch39-p2e-self-reference}

在本书不同章节中，“算子作用于自身输出而达成尺度平衡”曾以三种精确但各异的数学方程出现：黄金连分数倒数不动点 $x = 1 + 1/x$（唯一正根 $\varphi$，见 [@cor-golden-fixed-point-unique] 与本章 §39.1 [@thm-ch39-self-application-four-fates-and-diagonal-identity]）、广义 $K$-Bonacci 主根方程 $x = 2 - x^{-K}$（唯一大于 $1$ 实根 $\beta_K$，见 [@thm-ch39-p2e-kbonacci-pisot]），以及实内积投影自指方程 $\cos\theta = \theta$（正实轴端点 $\theta^*$，见[第 24 章](ch24-cosine-fixed-points-and-self-reference.md) [@thm-dottie-rational-inverse-endpoint] 与[第 33 章](ch33-all-beings-observers-and-mutual-attractors.md)全实轴收敛算例 [@ex-ch33-mutual-cosine-monotonic-lock]）。把 $K = 3$ 时的内部收缩模长与余弦不动点放在同一把数值标尺下核对，可以得到如下精细对照：

::: {.example #ex-ch39-p2e-pisot-dottie-numerics title="文献结果与数值算例：Dottie 不动点 θ* 与三阶内空间收缩率 |α| 的近似度与代数分野（含文献结果，未在本书形式化）"}
**文献结果，未在本书形式化（针对 $\theta^*$ 的超越性判定；端点存在唯一性与三次共轭乘积恒等式已由 Lean 验证）。** 一方面，幂级数反演端点定理 [`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint)（[@thm-dottie-rational-inverse-endpoint]）证明区间 $(0, 1)$ 内存在唯一正实数 $\theta^*$ 满足 $\cos\theta^* = \theta^*$，且选定的有理系数反演幂级数在 $\pi$ 处绝对收敛于 $\theta^*$；另一方面，由三阶共轭根乘积恒等式 [`tribonacci_secondary_root_mul_conjugate`](lean:D5/S3/Constants/Irrationality/TribonacciTraceLattice.tribonacci_secondary_root_mul_conjugate) 可直接推出 $|\alpha|_{K=3} = \beta_3^{-1/2}$。独立双精度二分计算（`NUM`）给出两者的十进制数值与相对偏差：

$$
\theta^* \approx 0.739085,\qquad |\alpha|_{K=3} = \beta_3^{-1/2} \approx 0.737353,\qquad \frac{\bigl|\theta^* - |\alpha|_{K=3}\bigr|}{\theta^*} \approx 0.234\% \quad \left(\frac{\bigl|\theta^* - |\alpha|_{K=3}\bigr|}{|\alpha|_{K=3}} \approx 0.235\%\right).
$$

在惊叹于两者仅相差约千分之二点三的同时，形式诚实要求我们明确指出：**$\theta^*$ 与 $|\alpha|_{K=3}$ 严格不相等（$\theta^* \neq \beta_3^{-1/2}$），且分属截然不同的数域层级**。这是因为 $|\alpha|_{K=3} = \beta_3^{-1/2}$ 满足整系数六次代数方程 $y^6 + y^4 + y^2 - 1 = 0$，是不折不扣的代数数；而根据林德曼—魏尔斯特拉斯定理（文献结果），任何满足 $\cos\theta^* = \theta^*$ 的非零实数 $\theta^*$ 必为超越数。因此，$\approx 0.234\%$ 是纯粹的数值邻近（`NUM`），绝不能写成代数恒等式或同一物理常数；将 $\cos\theta^* = \theta^*$ 与皮索内窗自相似不动点共同归入符号母题 $\psi = \psi(\psi)$ 之下，属于本书的概念统一模型（`MODEL`）。
:::

::: {.viz src="pisot-clifford-rauzy-sandtable" preset="self-reference" height="500"}
**自指尺度对照卡（`self-reference`）**：并列展示余弦迭代收敛至青色不动点 $\theta^* \approx 0.739085$ 的轨迹，以及三阶皮索内空间按模长 $|\alpha| = \beta_3^{-1/2} \approx 0.737353$ 逐拍收缩的螺旋轨迹；琥珀色游标同步标出第 $k$ 步的幅度比与约 $0.234\%$ 的数值间距。端点与共轭乘积恒等式属 `LEAN ✓`，十进制差值属 `NUM`，自指母题并置属 `MODEL`。
:::

从单点收缩尺度回到多体量子寄存器：当一条禁 $1^K$ 合法字被空间切口一分为二时，左右两半不再能独立任取合法字——切口处的跨界禁戒直接把组合计数转化为可精确刻画的双体纠缠秩矩形。
