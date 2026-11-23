# 31.1.3 算术 1—3—3—1 概念塔与韦伊显式对偶：素数积出零点，零点雕出素数 {#sec-ch34-28-3}

现在，把整套黎曼 $\zeta$ 路径积分系统放回我们在 [§33.1](ch34-s13-point-volume-octave.md#sec-ch34-point-volume-octave-and-particle-field) 建立的 `1—3—3—1`（点·线·面·体 $\leftrightarrow$ 粒子·波·场·新本征点）概念塔八度框架之中，物理时空路径积分与算术宇宙之间浮现出逐阶对应的四层结构映射（`MODEL`，纯单行单元格对照如下）：

| 概念塔阶数 | 量子时空路径积分语言 | 黎曼算术路径积分语言 | 极小圆弧体几何机制 |
| :--- | :--- | :--- | :--- |
| **0 阶 点核 $\Lambda^0$** | 不可约基本粒子锚点 / 量子门元胞 | **素数 $p \in \{2, 3, 5, 7, \dots\}$** | 对数步长 $L_p = \ln p$ 在 $\mathbb{Q}$ 上线性无关；$\mu(p^2) = 0$ 锁定外积泡利不相容 |
| **1 阶 线元 $\Lambda^1$** | 粒子复合世界线（作用量 $S = \int L\,dt$） | **自然数复合路径 $n = \prod p_j^{m_j}$** | 乘法经对数化为极小圆弧作用量串联可加 $S[\Gamma_n] = \ln n = \sum m_j \ln p_j$ |
| **2 阶 面元 $\Lambda^2$** | 费曼相干波面与科纽（Cornu）干涉涡卷 | **黎曼—西格尔复相量折线螺旋** | 相邻路径步夹出极小圆弧转角 $\Delta\phi_n = t\ln\bigl(1 + \frac{1}{n}\bigr) \approx \frac{t}{n}$，盘旋收束 |
| **3 阶 体/新点 $\Lambda^3 \equiv \Lambda^0_{\mathrm{spec}}$** | 玻尔单值闭合驻波体积 $\leftrightarrow$ 能级本征点 | **完备 $\xi(s)$ 谱场 $\leftrightarrow$ 非平凡零点谱** | 在 $\sigma = \frac{1}{2}$ 半密度壳上正逆等幅且完备读数纯实，反相横截析出离散谱点 |

连接这座四阶概念塔底座（0 阶素数原胞 $\Lambda^0$）与塔顶（3 阶零点谱驻波 $\Lambda^3 \equiv \Lambda^0_{\mathrm{spec}}$）的数学桥梁，正是解析数论中最壮丽的**显式对偶公式（Explicit Formula）**——它从正反傅里叶—梅林互换两端证明了“素数幂阶梯”与“黎曼零点谱”互为对偶谱变换：

- **内核已验证的无条件积分显式公式（[@thm-ch34-riemann-prime-arc-bridge] 第 6 款，`LEAN ✓`）**：无需预先假定黎曼猜想，在对数作用量坐标 $y = \ln x > 0$（即尺度 $x = e^y > 1$）的每一个严格正实点 `0 < y` 上，按解析重数遍历全体实际非平凡零点的加权拉普拉斯谱和 $\operatorname{actualH}(y) = \sum_{k \in \mathbb{N}} \frac{e^{y\rho_k}}{\rho_k(1 - \rho_k)}$ 都无条件精确等于算术端的梅尔滕斯—切比雪夫余项 $U(e^y) - \ln(2\pi) + \operatorname{trivialT}(y)$！

- **模 $1$ 的余项与 RH 下的窗口上界。** 模 $1$ 的狄利克雷特征恒等于 $1$。对 $x\ge 1$，两种求和都取 $I_x=\{1,\ldots,\lfloor x\rfloor\}$，在 $x$ 为整数时包含右端点。逐项展开，利用 $\psi(x)=\sum_{n\in I_x}\Lambda(n)$，便有

  $$
  \sum_{n\in I_x}\Lambda(n)\left(\frac{x}{n}-1\right)
  =x\sum_{n\in I_x}\frac{\Lambda(n)}{n}-\psi(x).
  $$

  两边都加上 $-x\ln x+(1+\gamma_{\mathrm{EM}})x$，即得 $G_z(x)=U(x)$（`手工推导`）。其中 $G_z$ 是模 $1$ 的余项，$U$ 见 [@def-divisor-ratio-mertens-error]。[外部定义 `Formalism.Gz`](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/StatementOC.lean#L9-L13) · [`U_eq_complete_ramps`](lean:D5/S3/Weil/Mertens/IntegratedExplicit/CompleteMangoldtLaplace.U_eq_complete_ramps)

  假设黎曼猜想。令 $G(y)=e^{-y/2}U(e^y)$，$M=2+\gamma_{\mathrm{EM}}-\ln(4\pi)$。由 `actual_G_control` 的第一项，对任意 $\varepsilon>0$，所有充分大的实数 $y$ 都满足 $\lvert G(y)\rvert<M+\varepsilon$。[Lean 声明](lean:D5/S3/Weil/Mertens/IntegratedExplicit/RHSharpActualEnvelope.actual_G_control)

  因为 $M<1$，可取 $\varepsilon=1-M>0$，于是对所有充分大的 $y$ 都有 $\lvert G(y)\rvert<1$。代入 $y=\ln x$，得到一个 $Y_0>1$，使所有 $x\ge Y_0$ 都满足 $\lvert U(x)\rvert<\sqrt{x}$。同一个阈值适用于每个 $\theta\ge 1/2$。只要 $Y\ge Y_0$，每个 $x\in[Y,Y^{3/2}]$ 都满足 $U(x)\le\lvert U(x)\rvert<\sqrt{x}\le x^\theta$（`手工推导`）。[常数界 `firstLiMass_lt_one`](lean:D5/S3/Weil/ZeroData/ActualReciprocalSquareBounds.firstLiMass_lt_one)

  外部路线的出发点是算术估计。模 $1$ 时，由平凡特征生成的循环群只含 $1$。因此 `Level.cyc` 保留的特征集为 $\{1\}$，去掉它后求和集为空，余项便化为 $G_m(x)=G_z(x)=U(x)$（`手工推导`）。[循环特征集](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/ExplicitFormulaErrorOfHostConditions.lean#L105-L125) · [余项的定义](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/ExplicitFormulaErrorOfHostConditions.lean#L32-L38)

  对 $1/2<\theta<1$，外部算术步骤在其切比雪夫型不等式和窗口假设下给出单侧界。对每个起点阈值 $R$，都存在 $Y\ge R$，使 $U(x)\le x^\theta$ 在整个 $[Y,Y^{3/2}]$ 上成立。Landau 判据由此推出 $\zeta$ 在 $\operatorname{Re}(s)>\theta$ 无零点。从 RH 出发的上界则覆盖每个充分大的 $Y$。[算术步骤](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/TopWin.lean#L68-L81) · [窗口指数](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/CharacterBoxes/EveryCharacter.lean#L8-L11) · [Landau 判据](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/ZeroFreeOfRpowWindow.lean#L11-L14)

下面的实验卡将上述双向对偶（[@ex-ch34-weil-prime-staircase-reconstruction]）搬上交互舞台，让你亲手滑动零点对截断数 $K$，目睹平滑的临界线谐波如何一步步咬合耸立为锐利的切比雪夫素数阶梯：

::: {.viz src="riemann-prime-arc-path-integral-sandbox" preset="weil-explicit-prime-staircase" height="520"}
**韦伊显式对偶：临界线零点驻波曲面雕刻切比雪夫素数阶梯实验卡（`weil-explicit-prime-staircase`）。** 推进谱截止频率 $t$ 或调节零点对上限 $K \in [5, 50]$（预设停在 $t = 145 > \gamma_{50}$ 叠满 $50$ 对零点，点按播放可从 $t = 0$ 重演逐层生长；琥珀色标出最前排当前重构剖面 $K(t)$ 与可拖动读数点手柄 $x^*$）：后缘主项斜坡逐行累加驻波谐波 $-2\operatorname{Re}(x^{\rho_k}/\rho_k)$ 铺成紫色三维部分和曲面，最前排琥珀色剖面在 $x = 6, 10, 12$ 等合数处异相抵消压平，而在 $x = 2, 3, 4, 5, 7, 8, 9, 11, 13$ 处陡升紧贴青色精确中点阶梯 $\psi_0(x)$，前方地面上品红色零点驻波残差同步逼近青色锯齿，条带小图逐整数对比青色精确阶跃 $\Lambda(n)$ 与紫色重建升高（绿色 `LEAN ✓` 标出 `actual_integrated_explicit_formula`）。
:::

围绕显式对偶进一步展开的幂次采样与辅助素数窗口、Möbius 截断与 Fourier 谱恢复、加权近碰撞与频谱扰动估计、Mangoldt 临界差额以及晚期窗口簇值等十四节形式化解析数论技术证明，已完整收录于[附录 M](appendix-m.md)（[§M.1](ch34-s28-s03-s01-sampling-windows.md)–[§M.4](ch34-s28-s03-s04-late-window-clusters.md)）。正文则直接进入[§31.1.4](ch34-s28-s04-literature-boundaries.md)，集中审视文献脉络与认识论边界，并向[§31.2](ch34-s29-arithmetic-pivots-and-resonant-tunneling.md)的算术枢轴重整交棒。
