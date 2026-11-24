# 4.2 不用背 Kraus 算符看懂三种量子噪声 {#sec-ch04-2}

看清了环境偏迹如何在上例中缩短局部布洛赫向量之后，传统量子信息教科书里常见噪声信道的算符和公式瞬间退去了神秘面纱。不用死记硬背任何抽象矩阵，本节剖析的几类典型单比特噪声（捏合投影、相位阻尼、振幅阻尼与去极化），在几何上都不过是**把单位布洛赫球往不同方向挤压或平移**！

首先看最纯粹的横向去相干极限——**标准基捏合投影** $\mathcal{P}(\rho)$（Lean 模块 `QuantumChannels/Pinching` 中定义为 [`pinching`](lean:D5/S3/QuantumChannels/Pinching.pinching)，保留对角元 $\rho_{00}, \rho_{11}$、抹零副对角元 $\rho_{01}, \rho_{10}$）。在矩阵希尔伯特—施密特内积（[`hilbertSchmidtInner`](lean:D5/S3/QuantumChannels/Pinching.hilbertSchmidtInner) $\langle A, B\rangle_{\mathrm{HS}} = \Tr(A^* B)$）下，捏合不是粗暴的涂改，而是一次精确的正交勾股投影：整颗布洛赫球被垂直压扁到南北极直径线段 $[-\vv{e}_3, +\vv{e}_3]$ 上，而被压掉的水平赤道质量恰好等于两个副对角相干元的模平方之和！

::: {.viz src="bloch-noise" preset="pinch" height="500"}
**压到竖轴上。** 一步完全去相干：青色的球被压成竖直的一条线，紫色虚线标出整根竖轴都是不动点。$\rho$ 与 $\sigma$ 高度相同、只差横向部分，落到轴上同一点，白线缩成零；品红的两段是两个起点被压掉的横向部分，它们所带的正是相干质量，左上角读出 $\rho$ 的这份质量从 $0.375$ 降到 $0$（[@thm-pinching-pythagorean]）。
:::

下文依次展开相位阻尼与振幅阻尼两条几何主线；至于有限维环境寄存器在多步历史记录中的显式实现与饱和障碍证明，完整收录于[附录 J](appendix-j.md)。

- [4.2.1 相位阻尼、重复记录与保留环境](ch04-s02-s01-phase-and-environment.md)
- [4.2.2 振幅阻尼、弛豫与迹距离](ch04-s02-s03-amplitude-and-distance.md)
