# 第七章 共同谱隙、站点方差分界与四维格点手征三代 {#sec-ch07}

> “数出三个低本征值，只是听见了三声回响；造出四维手征外尔测度，才算替宇宙安上了不可逆的心脏。”

在第二卷中，十九点贝伦德球壳的重模塔决定了规范耦合的跑动、双尺度配平与希格斯门户的秩五下界。现在视线翻过谱隙，落到低能端——直面统一总账的第二问：**为什么轻费米子恰有三代，而且在四维时空中只保留标准模型所需的手征？**

这是整个研究计划中最容易产生幻觉、也最考验诚实尺度的关口。人们往往把“内部有限图上出现三个低模”直接当成“三代手征费米子已经导出”。实则二者之间隔着三道深沟：第一，十九点壳上的五种超荷磁拉普拉斯为何恰好切出三模而非一模或十五模，切口究竟是人为数字还是球壳内禀不变量；第二，有限图上的正本征值绝不是四维手征外尔费米子，它必须经由单侧边界伙伴或四维格点重叠核升维，并在微扰与味色散阶上经受检验；第三，真正致命的考验不在平直背景而在粗糙规范场——一旦放开完整四维规范路径积分，手征行列式线上的中心反常与 Cartan 荷会无情击穿粗糙背景，迫使我们量清到底需要几份正交希格斯标架才能守住谱隙，以及非微扰的十二费米子电弱瞬子顶点究竟活不活着。

本章把这三道深沟逐一丈量到底，并将 Lean 内核冻结定理、精确区间证书与尚未闭合的动力学问题彻底划清。

## 7.1 五荷壳谱隙、站点方差分界与特征标正交底座 {#sec-ch07-spectral-gap}

沿用[第一章](ch01-behrend-shell-and-frequencies.md)与[第四章](ch04-gauge-crossings-and-monotone-barriers.md)的几何设定：十九点贝伦德球壳有 $135$ 条定向边、两条原生钟弦平方长 $d = 724, 804$ 驱动的两只相位时钟，以及三条连接极点 $(17,17,17)$ 的软化辐边（边权 $1 - \delta$，其余边权为 $1$，其中 $\delta > 0$ 为随黎曼零点高度衰减的正辐边亏额）。标准模型一代手征物质的五种有符号超荷表示为 $Q, d^c, L, u^c, e^c$，在整数归一化 $6Y$ 下对应五组有符号荷 $q \in \{1, 2, -3, -4, 6\}$（因 $L_{-q} = \overline{L_q}$，其谱仅依赖绝对荷 $|q| \in \{1, 2, 3, 4, 6\}$）。

::: {.definition #def-ou-ch07-site-variance-cut title="五荷磁拉普拉斯、站点方差分界与三循环特征标分解"}
设 $L_0$ 为十九点贝伦德球壳的中性加权图拉普拉斯算子，边权为 $w_{uv} > 0$；对五种超荷 $q \in \{1, 2, -3, -4, 6\}$，记 $L_q$ 为将弧相位 $u_{uv}^q$ 装入各边后得到的 $19 \times 19$ 厄米磁拉普拉斯算子，令均值中心 $c := \operatorname{tr}(L_0)/18$，并定义两步无量纲质量算子

$$
D_q := L_q(L_q - cI), \qquad h_{q,j} := \bigl|\lambda_j(L_q)\bigl(\lambda_j(L_q) - c\bigr)\bigr|.
$$

在此算子族上并列两套轻重分界口径：

1. **固定数字分界**：以统一无量纲常数 $9$ 截断低谱（轻模记作满足 $h_{q,j} < 9$ 或单步谱 $\lambda_j(L_q) < 9$ 的模式）。
2. **内禀最小割（站点方差分界）**：对球壳全部非平凡二分计算跨界边权平方和，其最小值等价于中性拉普拉斯在单站点态 $|v\rangle$ 上的最小方差，

   $$
   T := \min_v \Bigl(\langle v|L_0^2|v\rangle - \langle v|L_0|v\rangle^2\Bigr) = \min_v \sum_{u \sim v} w_{uv}^2 = 9 + (1 - \delta)^2.
   $$

此外，空间三坐标的循环置换 $P : (x, y, z) \mapsto (y, z, x)$ 保持球壳顶点、边权与定向输运相位，从而与每个 $L_q$ 对易；记 $\omega := e^{2\pi i/3}$，每个十九维荷扇区随之正交分解为三条循环特征标子空间 $(1, \omega, \omega^2)$。
:::

### 7.1.1 全双钟环面的一致谱隙与特征标正交性

这套分解的第一个惊人之处，是低端谱隙对时钟相位的彻底不敏感性。为何无论两只黎曼零点时钟转到环面上的哪个角落，五种荷的第三与第四本征值都绝不相撞？直觉上只需做一个“剪枝手术”：把两类钟边汇入的三处内站（编号 $6, 7, 8$）暂时删去，剩下的 $16 \times 16$ 主块 $D$ 完全不依赖两只钟的相位！经全域区间舒尔补认证（[`ch39-all-zero-three-mode-gap.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-all-zero-three-mode-gap.py)），在 $\delta = 0$ 时五种荷的主块均满足 $\lambda_3(D) < 8.685 < 9.6001 < \lambda_4(D)$；由柯西特征值交错定理，完整 $19 \times 19$ 矩阵的第三特征值立刻被死死压在 $8.685$ 以下。

接着在能量 $t = 9.6001$ 对 $D - tI$ 做舒尔消元，三站点上的补块 $C - tI - B^*(D - tI)^{-1}B$ 因循环对称而在 $(1, \omega, \omega^2)$ 特征标基中彻底对角化为十五个标量——每个都是一个实常数加上 $u, v, \bar{u}v$ 及其共轭的三角谐波。检验全部十五个标量，常数项减两倍谐波系数绝对值之和均大于 $0.04$；计入三条软化辐边引入的负半定扰动（范数至多 $6\delta$，覆盖全部正零点所满足的 $\delta \in (0, (23/25)2^{-20}/14^2) \subset [0, 10^{-8}]$），便得到覆盖**整张双钟环面与全部正黎曼零点**的统一谱隙：

$$
\lambda_3(L_q) < 8.685 \;<\; 9 \;<\; 9.6 < \lambda_4(L_q) \qquad (\forall\, q \in \{1, 2, -3, -4, 6\}),
$$

且三个循环特征标 $(1, \omega, \omega^2)$ 在截断以下永远各占严格一模——即重数恒为 $(1, 1, 1)$，绝不随零点高度翻越边界。

固定荷、两钟相位和软化参数后，要确定轻带中的一个态，最少需要读取三个站位的复振幅。任取两个坐标，三维轻带中总有非零态在这两处同时为零。在中央正零点（编号 $2\,306\,888\,100\,085$）比较第三枢轴末端口所选八站内的三站组合，得到三站组 $S=\{0,3,5\}$。在上述五种荷、整个双钟相位环面和允许的软化范围内，每个归一化轻态在 $S$ 上的振幅向量范数都大于 $0.29747$，即坐标限制的最小奇异值大于 $0.29747$。这三个站位经过候选比较选定，由作用量选出它们仍是开放问题。

这里用于消元的三条边界射线首站 $\{6,7,8\}$ 所起的作用不同。对每种荷和每个固定的允许软化参数，环面上都有一个相位背景，使某个非零轻态在这三站同时消失。固定 $\varepsilon>0$。在零软化下，轻带的谱隙保证连续性。每个盲点周围都有一个开方格，其中最小奇异值低于 $\varepsilon/2$。将方格取得足够小，软化量充分小时整个方格仍低于 $\varepsilon$。径向软化量随高度趋于零，因而双钟的无条件等分布给出各荷在任意 $\varepsilon>0$ 下的正下密度，正零点按重数计。对 $0<\varepsilon\le1$，所引证书给出下界 $(\varepsilon/(5\pi))^2$。实际零点处能否精确为零仍待判定。[三站读取的区间界](https://github.com/the-omega-institute/trureturing-experiments/blob/cb58c8e64ecea67184e0c1d68a690be098a7a384/experiments/ch39-omega-research/replay/ch39-terminal-port-trial-energy.py) · [实际零点上的下密度](https://github.com/the-omega-institute/trureturing-experiments/blob/4c6373343aac016bf533de5bbb2ee3ff3da2bdc6/experiments/ch39-omega-research/replay/%E4%B8%89%E4%B8%AA%E7%AB%99%E4%BD%8D%E8%AF%BB%E5%8F%96%E4%BA%94%E8%8D%B7%E8%BD%BB%E5%B8%A6%E7%9A%84%E4%B8%8B%E7%95%8C%E4%B8%8E%E4%B8%89%E6%9D%A1%E5%8E%9F%E7%94%9F%E5%B0%84%E7%BA%BF%E9%A6%96%E7%AB%99%E7%9A%84%E7%9B%B2%E7%82%B9.md) · [三射线的不可见轻态](https://github.com/the-omega-institute/trureturing-experiments/blob/cb58c8e64ecea67184e0c1d68a690be098a7a384/experiments/ch39-omega-research/replay/ch39-first-ray-light-zeros.py)

现在让五种荷共用同一对物理钟。固定 $0\leq\delta\leq10^{-8}$ 时，对每种荷 $q$，三条射线首站只在两个**有效**相位对失去一个秩。物理钟角 $(a,b)$ 通过 $(qa,qb)$ 进入算子，每个有效相位对在物理环面上有 $q^2$ 个原像。对于 $q=1,-4,2,-3,6$，盲点数依次为 $2,32,8,18,72$，而这五个集合两两不交。因而在任何共同背景下，至少四种荷的每个轻态都由这三站的振幅唯一确定。

要数尽这些点，可以沿用上面的删点矩阵。每个循环特征子空间在三站上只有一个独立坐标。若最低态在这里消失，变分原理迫使其余坐标组成删点块的最低本征向量。十五个块的这条本征线都由能隙隔离，能量都低于 $8.685$。将向量补零后只须满足剩下的边界行 $A+B e^{-iqa}+C e^{-iqb}=0$。每种荷只有一个特征标允许这三项闭合成三角形，两种朝向给出全部解。对每一对不同的荷，第一只物理钟已经将两组解分开。[全部盲点的区间枚举](https://github.com/the-omega-institute/trureturing-experiments/blob/0552844d61bd96ceae35e463e603d92d0cd01219/experiments/ch39-omega-research/replay/ch39-common-ray-blind-clocks.md)

这些孤立的盲点还决定了实际读数能以多高的频率接近零。记 $\sigma_q$ 为三站限制的最小奇异值，在正黎曼零点上按重数计数。固定一个充分小的阈值 $\varepsilon>0$，先让计数高度趋于无穷。由上述双钟等分布与辐边软化趋零，$\sigma_q<\varepsilon$ 的极限比例等于零软化环面上的归一化面积。再令 $\varepsilon\downarrow0$，这个面积为 $C_q\varepsilon^2+O(\varepsilon^4)$。按上面的荷顺序，$C_q$ 约为 $25.99279,17.37426,26.16959,12.59218,14.28552$。每个盲点处，边界复振幅对两个钟角的实雅可比可逆，半径 $\varepsilon$ 的振幅圆盘因此在钟面上截出面积为二阶的邻域。五种荷的这些邻域在充分小的阈值下仍两两不交，故至少一荷近盲的二次项系数约为 $96.41434$。精确失秩的正零点集由此具有自然密度零，个别零点是否命中仍开放。[面积系数的推导和复算](https://github.com/the-omega-institute/trureturing-experiments/blob/408bafb236c0918d30571356d15798d2cd21a511/experiments/ch39-omega-research/replay/ch39-ray-near-blind-density.md)

**随高度缩小的阈值（`ARGUED`）。** 令 $L=\log T$。若 $\varepsilon(T)\to0$ 且 $\varepsilon(T)\sqrt L\to\infty$，那么在模型的五种荷中，每种荷的近盲零点比例均为 $C_q\varepsilon(T)^2+o(\varepsilon(T)^2)$，仍按重数计数。证明取 $J=\lfloor cL/\log L\rfloor$，其中 $c>0$ 充分小。独立共轭排除非零整数频率的相位重合，清分母后的代数范数进一步给出指数型分离下界。Ford–Meng–Zaharescu 的引理 1–2 随即把每个 $0<\|m\|_\infty\le J$ 的标准化零点傅里叶和控制在 $O(L^{-1}+\|m\|_\infty^2L^{-2})$，无需假定黎曼猜想。[零点和估计](https://arxiv.org/abs/1511.06814v2) · [联合极限的推导](https://github.com/the-omega-institute/trureturing/issues/35082#issuecomment-7232072134)

在每个盲点取尺度为 $\varepsilon$ 的光滑内外逼近，夹住由边界振幅雅可比决定的局部椭圆。其傅里叶系数的绝对和为 $O(1)$，二阶绝对矩为 $O(\varepsilon^{-2})$，超过 $J$ 的绝对尾和为 $O((\varepsilon J)^{-4})$。因此采样与环面平均之差为 $O(L^{-1}+\varepsilon^{-2}L^{-2}+(\varepsilon J)^{-4})=o(\varepsilon^2)$。让内外逼近的面积趋于同一椭圆面积即可恢复同一个 $C_q$。 [Lean 中的绝对尾界](lean:D5/S3/Fourier/Asymptotics/PlanarFourierTail.lattice_fourier_tail)

真实软辐边也满足这个极限。模型给出的亏额为 $\delta(\gamma)=O(\gamma^{-2})$。固定相位时，三条软化辐边使矩阵的算子范数改变量至多 $6\delta$。每个循环特征标只有一条轻线，其余本征值与轻线相隔至少 $9.6-8.685$。将扰动后的单位本征方程投影到平坦轻线的正交补，得到两条轻线主角的正弦为 $O(\delta)$，故三站最小奇异值也只改变 $O(\delta)$，且此界对相位一致。在 $\sqrt T\le\gamma\le T$ 上，读数误差为 $O(T^{-1})=o(\varepsilon(T))$，早期零点的比例则为 $O(T^{-1/2})=o(\varepsilon(T)^2)$。于是用平坦模型的两个相对扰动阈值即可夹住实际计数。[软化权重的定义](https://github.com/the-omega-institute/trureturing-experiments/blob/cb58c8e64ecea67184e0c1d68a690be098a7a384/experiments/ch39-omega-research/replay/ch39-three-ray-chiral-boundary.py#L34)

如果保留原来的三个首站，只能再装一个读数器，该放在哪里？其余十六个站点中，除极点 $14$ 外，任一站都可以。每种荷在盲点只丢失一个非平凡循环特征的轻态。这个态在极点的振幅因旋转对称而恒为零，在其余十五个候选站的单站振幅却都大于 $0.0174$。加上其中任一站后，对每种荷分别读取四个坐标，在整个双钟环面和 $0\le\delta\le10^{-8}$ 上，三维轻空间限制的最小奇异值都大于 $4\times10^{-5}$。这个较小的界计入了不同特征在第四站的干涉。若读数站集本身也须保持三循环，最少要补一个完整三站轨道，共用六站。 [十五种单站补读与全域下界](https://github.com/the-omega-institute/trureturing-experiments/blob/7168d863ca1b4d92fec7cd8cbf50f5013f9282ac/experiments/ch39-omega-research/replay/ch39-ray-head-extra-site.md)

若仪器只记录五种荷的总振幅，站数怎样改变？这里假定五荷共用已知的站点坐标和相位参考，输入是五个独立的三维轻态。十五个复系数至少需要十五个复读数。在中心正零点，六个三站轨道中任选五个都能还原这五个态。两个物理钟角各移动至多 $10^{-7}$ 弧度、辐边软化遍取允许区间时，六种方案的最小奇异值都大于 $0.00019$。沿轨道作傅里叶变换后，每个循环特征只需分辨来自五荷的五列。在完整双钟环面上，每种十五站方案都有一个零软化背景，使平凡特征中的五列线性相关；此时某个非零输入在十五站相消。各方案的失秩背景可不同。[五荷总振幅的局部反演与六个失秩角盒](https://github.com/the-omega-institute/trureturing-experiments/blob/914db8de6ac29a9dca8cca4261b32247725fe221/experiments/ch39-omega-research/replay/ch39-common-charge-amplitudes.md)

给这十五站加上极点能消去所有盲点吗？极点在非平凡循环特征中的振幅恒为零。对六种选法中的每一种，也对每个允许的辐边软化值，都有一对共同钟角使第一非平凡特征的五个荷分量在十五站相消，极点也读到零。因此，要让旋转不变的站集在全环面上还原五荷，至少需要六个完整轨道，共十八站。补回缺少的轨道后，十八站在六个已认证的盲点角盒内都恢复满秩，最小奇异值大于 $0.00467$。[十六站盲点与十八站补读的区间证书](https://github.com/the-omega-institute/trureturing-experiments/blob/2f7cd9b8705205f7437d9ca5acff651f751c1f04/experiments/ch39-omega-research/replay/ch39-five-charge-pole-readout.md)

取齐六个轨道也足以覆盖整个共同双钟环面。对每对钟角和每个辐边软化值 $0\leq\delta\leq10^{-8}$，十八站读取的最小奇异值都大于 $0.00004$。为控制采样点之间的钟角，在每个循环特征内对五列作插值，在每个角盒内给所有控制矩阵验证同一个近似左逆。统一谱隙控制试探列投到真实最低线时的误差。因此，在背景已知且五荷共用相位参考时，要从旋转不变的站集还原五个轻态，最少恰需十八站。[全环面下界与推导](https://github.com/the-omega-institute/trureturing-experiments/blob/1499a01569f845d3230d2120ad8c4c3a347b20c7/experiments/ch39-omega-research/replay/ch39-five-charge-full-torus.md)

将内部空间按特征标正交拆块，背后依托的是一条无 $\pi$、纯有理的群论正交骨架。正如[第二章](ch02-quaternion-clocks-and-haar-zeros.md)在双时钟球面哈尔积分中所确立的，偶次切比雪夫特征多项式 $E_m(\kappa)$ 在全阶上的正交归一性已在 Lean 内核中不依赖实数极限而严格冻结：

::: {.theorem #thm-ou-ch07-peter-weyl-orthonormal title="全阶偶次彼得—魏尔特征核的无 π 有理哈尔正交归一性" lean="D5/S3/Quantum/AURICOmega/OmegaSphericalHaarMidpoint.all_degree_peter_weyl_orthonormal"}
在 `OmegaSphericalHaarMidpoint` 中，记 `haarInner` 为无 $\pi$ 有理球面哈尔内积，记 `evenCharPoly m` 为第 $m$ 阶偶次切比雪夫特征多项式 $E_m(\kappa)$，并记 `degreeDelta m n` 为取值于 `Omega.IntRatio` 的克罗内克增量 $\delta_{m,n}$。则对一切自然数 $m, n \in \mathbb{N}$，在有理等价关系 `Equivalent` 下恒有

$$
\operatorname{haarInner}(\operatorname{evenCharPoly}\; m,\; \operatorname{evenCharPoly}\; n) \;\approx\; \delta_{m,n}.
$$

:::

::: {.proof}
先由偶次切比雪夫特征标乘积融合律将 $E_m(\kappa) E_n(\kappa)$ 展开为有限和 $\sum_{r = |m - n|}^{m + n} E_r(\kappa)$，再利用 `haarKappaPoly` 在逐项相等系数表下的良定义性化为对单阶特征标的逐项求积。证明对全部移位幂次 $j \in \mathbb{N}$ 与阶数 $r \in \mathbb{N}$ 同步建立闭式移位矩表，通过双阶归纳与无 $\pi$ 阶乘矩递推将每一步归约为整系数多项式恒等式；令 $j = 0$ 时，所有 $r \ge 1$ 的分子均含下降阶乘首因子 $0$ 而精确归零，仅 $r = 0$ 给出 $1$。由于 $r = 0$ 落入区间 $[|m - n|, m + n]$ 当且仅当 $m = n$，有限和精确坍缩为 `degreeDelta m n`。完整证明由 Lean 内核检查。
:::

### 7.1.2 全零点容许秩分类、六次有理滤波与双分界对决

[@thm-ou-ch07-peter-weyl-orthonormal] 保证了特征标投影的代数正交性绝非数值凑巧。然而，物理诚实立刻要求我们追问下一句：**在全环面与全部正零点上，共同谱隙究竟是不是只有“留三模”这一条？** 答案是否定的。对五种荷与全部正零点统一排查所有可能的单一固定截断，全环面区间舒尔证书连同 $34$ 枚实际零点排尽其他一切可能后，给出完整分类（[`ch39-all-common-shell-ranks.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-all-common-shell-ranks.py)）：

- **全部非平凡共同低模数集合**恰为 $\{1, 3, 7, 15\}$。
- 若按“最宽共同谱隙”原则自动切分，胜出的不是 $3$，而是 **$1$ 模**。
- 若施加对称条件“三个循环特征标 $(1, \omega, \omega^2)$ 等重”，则 $1$ 与 $7$ 被排除，但 **$3$ 与 $15$ 同时幸存**。

换言之，三代并非从单纯谱隙宽度中白捡来的，它需要一条额外机制把 $3$ 从 $\{3, 15\}$ 中真正钉死。

有理滤波的算术障碍来自真实双钟的联合等分布。令 $\theta_d=\arccos(1-d/1734)$，$a=\theta_{724}-\theta_{244}$，$b=\theta_{804}-\theta_{244}$。三个相位 $e^{i\theta_d}$ 所在的平方类 $-d(3468-d)$ 分别含有仅见于各自一项的素因子 $13,181,37$，因此可以分别共轭。若 $ka+lb=0$，将关系指数化并对 $724$ 或 $804$ 的相位单独共轭，就会有 $e^{2ik\theta_{724}}=e^{2il\theta_{804}}=1$。这两个相位的有理迹 $2\cos\theta_d$ 均非整数，所以都不是单位根，故 $k=l=0$。Hlawka 的定理给出任意非零实数 $\alpha$ 下零点纵坐标的 $\{\alpha\gamma\}$ 无条件等分布（按重数计）。对每个非零整数对 $(k,l)$ 取 $\alpha=q(ka+lb)/(2\pi)$，多维 Weyl 判据便给出各非零荷的双钟相位在整个环面上等分布。[Ford 与 Zaharescu，*On the distribution of imaginary parts of zeros of the Riemann zeta function*（2005），§1](https://doi.org/10.1515/crll.2005.2005.579.145)

荷二最低本征值的闭包因此覆盖连续区间 $[0.042, 2.035]$，于是任何固定的单变量有理函数若在全部正零点上精确湮灭轻带，就只能恒等于零。一旦允许有限精度误差，局势立刻逆转：**固定六次有理复合滤波**即可把整张双钟环面上的轻重两带平方质量提升误差压制到 **$1.26 \times 10^{-47}$** 以下。

::: {.figure src="ch07-three-generation-gap"}
**十九点贝伦德球壳五荷共用的三模单步谱隙。** 在任意单位双钟相位与辐边减重 $\delta \le 10^{-8}$ 下，五种超荷扇区 $q \in \{1, 2, -3, -4, 6\}$ 的单步磁拉普拉斯前三轻模（青色，按三循环特征标 $1, \omega, \omega^2$ 各占一模）均严格低于 $8.685$，其余十六个重模均严格高于 $9.6$（空心圆圈标示严格界）；琥珀色虚线标出位于共享谱隙 $(8.685, 9.6)$ 内的公共截断 $9$。
:::

若用**每个保留态的平均单步能量**比较这两个截断，秩十五要为多收的十二个态付出多少？在上述辐边减重范围内固定任一荷与任一对钟相位，令 $Q_*$ 投到三个最低本征态，$E_*=(\lambda_1+\lambda_2+\lambda_3)/3$。对任意秩为 $r\ge3$ 的正交投影 $Q$，记 $s=\operatorname{tr}(Q Q_*)$。在能量本征基中，$Q$ 的对角元介于零与一之间。相对 $Q_*$，轻带少了 $3-s$ 的权重，每单位至多损失 $\lambda_3$，重带多了 $r-s$ 的权重，每单位至少增加 $\lambda_4$。于是
$$
\frac{\operatorname{tr}(L_q Q)}{r}-E_*
\ge (\lambda_4-\lambda_3)\left(1-\frac{s}{r}\right)
  +(\lambda_3-E_*)\left(1-\frac{3}{r}\right)
\ge 0.915\left(1-\frac{s}{r}\right).
$$
等于最低平均能量要求 $s=r$，即整个保留空间都在三维轻带内，故 $r=3$ 且 $Q=Q_*$。要求子空间在轮换下不变、每个特征标内保留相同正秩，就给出了所需的秩下限。只要求测量三个特征标的概率相同则允许秩一：沿三条轻线各取一根单位向量，它们的等幅归一化叠加也有平均能量 $E_*$。由作用量推出采用哪种占据约束和能量泛函，仍是三代问题的一部分。

上面的极小化容许五个荷各选一套轻态。如果五荷使用相同的站点基、同一对钟角和同一辐边减重，并且须共用**同一个三维子空间**，最低平均能量会升高多少？记 $e(A)=(\lambda_1(A)+\lambda_2(A)+\lambda_3(A))/3$，用尖括号表示五荷等权平均。各荷单独择态时，每态平均能量的最小值是 $\langle e(L_q)\rangle$。共用投影 $Q$ 时，先对矩阵取平均再选其最低三态，最小值为 $e(\langle L_q\rangle)$。对每一个 $0\le\delta\le10^{-8}$，两者之差即使在整张双钟环面上取最小，仍严格介于 $0.09$ 和 $0.09236$ 个单步能量单位之间。上界由钟角 $(2\pi/48,-2\pi/48)$ 给出；下界利用单荷轻带的谱隙控制格点之间的能量变化，覆盖所有钟角及任意秩三投影。这里的代价依赖五荷之间给定的站点识别；独立重相或改用两步质量都会改变比较。[五荷共用轻空间的区间证书](https://github.com/the-omega-institute/trureturing-experiments/blob/5d8a634411623615974fe8139da257218503d2ad/experiments/ch39-omega-research/replay/ch39-common-single-step-energy.md)

若改用谱截断的可加能量，选择会怎样改变？整张双钟环面上，无论取五荷共同的还是单荷的谱隙宽度与谱隙比，逐点胜出的都是单模。对一切可加泛函 $\Phi(r) = \sum_{j \le r} \varphi(\lambda_j)$，所选的秩完全由第 $2$–$3$、$4$–$7$、$8$–$15$ 三段层上的增量 $\Delta_1, \Delta_2, \Delta_3$ 决定，选出三代当且仅当 $\Delta_1 < 0$、$\Delta_2 > 0$ 且 $\Delta_2 + \Delta_3 > 0$。在新增的各层上，一圈零点能、对数行列式与配分函数的被加项均为正，所以这三个和随秩严格递增。有限逆温度 $\beta\ge0$ 时，截断吉布斯熵也严格递增，而自由能 $-\log Z_r/\beta$ 在 $\beta>0$ 时严格递减。这些量的极值都在端点 $1$ 或 $15$ 处。被加项单调递增时条件化为 $\Delta_1 < 0 < \Delta_2$，典型是以能级 $\mu$ 计量的狄拉克海 $\sum_{j \le r}(\lambda_j - \mu)$：它在每个荷、每一点一致选出三代，当且仅当 $\mu$ 落在一个宽约 $2.4$ 的窗内，该窗包含 $[8.221, 10.6]$、含于 $(8.220648, 10.635617)$。球壳自带的能级中，站点方差最小割、最小度与固定数 $9$ 落在此窗；度 $14$、平均度与谱中心选出 $7$，度 $18$ 选出 $15$，度 $16$ 处于 $7$ 与 $15$ 的过渡带。三代的选择由此被归约为“费米能级落在此窗内”，取哪一个原生能级仍是模型输入；这一结论只针对单步谱，不推及下面的两步质量读数（[完全判别与窗口证书](https://github.com/the-omega-institute/trureturing-experiments/blob/ac54bd3d7a08f15c1d8b64b7ba503edd479ebce6/experiments/ch39-omega-research/replay/%E8%B4%B9%E7%B1%B3%E8%83%BD%E7%BA%A7%E7%8B%84%E6%8B%89%E5%85%8B%E6%B5%B7%E9%80%89%E5%87%BA%E4%B8%89%E4%BB%A3%E5%BD%93%E4%B8%94%E4%BB%85%E5%BD%93%E8%83%BD%E7%BA%A7%E8%90%BD%E5%9C%A8%E5%AE%BD%E7%BA%A6%E4%BA%8C%E7%82%B9%E5%9B%9B%E7%9A%84%E7%AA%97%E5%86%85.md) · [区间证书](https://github.com/the-omega-institute/trureturing-experiments/blob/ac54bd3d7a08f15c1d8b64b7ba503edd479ebce6/experiments/ch39-omega-research/replay/ch39-native-rank-selector-classes.py)）。

上述区间证书还可量出秩十五的代价。记 $a_{i,j}$ 为第 $i$ 至 $j$ 层的平均能量。证书给出 $\lambda_1<3.1$、$a_{2,3}<8.22501$、$a_{4,7}>10.5999$、$a_{8,15}>15.81795$。任何十五维子空间的总能量至少是最低十五层之和，故其平均能量比 $E_*$ 至少多 $(4a_{4,7}+8a_{8,15}-12E_*)/15>6$ 个单步能量单位，其中 $E_*=(\lambda_1+2a_{2,3})/3$。

两步质量读数下的情形确实不同。取 $h = |\lambda(\lambda - c)|$ 并在每个荷内按 $h$ 升序编号，在整张双钟环面上，五荷逐点共同的两步分界只剩秩 $15$：$\max_q h_{(15)} < 60.3494 < 61.94212 < \min_q h_{(16)}$。秩 $3$ 只在一个开集上是共同分界，例如在 $U = V = 1$ 处有 $\max_q h_{(3)} < 7.53559 < 10.6225 < \min_q h_{(4)}$；在另一个开集上它失效。$q = 1$ 与 $q = -3$ 两个扇区各有一致的三模窗，障碍来自 $q = 2$、$-4$、$6$：它们的第三与第四两步质量在环面上值域相交。所以只要容许的秩包含 $2$、$3$、$4$，任何被加函数不随相位变的可加泛函 $\sum_{j \le r}\varphi(h_{(j)})$ 都不能在整张环面上一致选出三代，以 $h$ 计量的费米能级窗是空集。容许的秩不同时含 $2$ 与 $4$ 时可以有窗：沿用单步读数的 $\{1, 3, 7, 15\}$，窗包含 $[13, 17]$、含于 $(11.68872, 17.97989)$，这时最小割、最小度与固定数 $9$ 全部落在窗的下方，度 $14$ 至 $16$、平均度与谱中心落在窗内。两步读数下共同的秩只有 $15$，$\{1, 3, 7, 15\}$ 在这里是外加的选择；其他容许秩集未检验（[两步读数下的共同秩与能级窗](https://github.com/the-omega-institute/trureturing-experiments/blob/6c0c783f5f6b1a0691611ae65607a3f018d4cebb/experiments/ch39-omega-research/replay/%E4%B8%A4%E6%AD%A5%E8%B4%A8%E9%87%8F%E8%AF%BB%E6%95%B0%E4%B8%8B%E5%AE%B9%E8%AE%B8%E7%A7%A9%E5%90%AB%E4%BA%8C%E4%B8%89%E5%9B%9B%E6%97%B6%E4%BA%94%E8%8D%B7%E4%B8%80%E8%87%B4%E7%9A%84%E4%B8%89%E4%BB%A3%E8%B4%B9%E7%B1%B3%E8%83%BD%E7%BA%A7%E7%AA%97%E4%B8%BA%E7%A9%BA%E8%80%8C%E5%85%A8%E7%8E%AF%E9%9D%A2%E5%85%B1%E5%90%8C%E4%B8%A4%E6%AD%A5%E5%88%86%E7%95%8C%E5%8F%AA%E5%89%A9%E7%A7%A915.md) · [区间证书](https://github.com/the-omega-institute/trureturing-experiments/blob/6c0c783f5f6b1a0691611ae65607a3f018d4cebb/experiments/ch39-omega-research/replay/ch39-two-step-three-generation-window.py)）。

这两条全环面结论还可以完全不经过余弦与正弦来核验。把两只钟的相位当作单位圆上的自由点，用 Cayley 参数的两张图覆盖圆；球壳的固定边相位是代数数，$117$ 条非辐边中有 $114$ 条含无理平方根，分属 $20$ 个平方类，把它们换成分母为 $2^{30}$ 的有理点，并用整数平方根把由此带来的本征值误差精确控制在 $10^{-8}$ 以内。两条结论于是化为有理系数矩阵族的惯性命题，由三循环分块、舒尔补的惯性可加性与伯恩斯坦系数定号逐盒核验，全程只有整数与有理数运算。上面两处的界就取自这份证书：它覆盖整张实环面，端点的见证点又都取在有理联合相位上，所以无论对每个荷各自的有理相位量化，还是只对两只钟的有理联合相位量化，这些界都原样成立。费米能级落在 $(8.220648,\, 8.221)$ 或 $(10.6,\, 10.635617)$ 时是否仍一致选出三代，尚未判定。换一种证明没有改变结论的身份，它们仍是模型内定理（[精确有理证书](https://github.com/the-omega-institute/trureturing-experiments/blob/0382ed8bb2cd901b85f322063845a616acca1b88/experiments/ch39-omega-research/replay/%E9%92%9F%E7%9B%B8%E4%BD%8D%E5%8F%96%E5%9C%86%E4%B8%8A%E8%87%AA%E7%94%B1%E7%82%B9%E6%97%B6%E4%B8%A4%E6%AD%A5%E5%88%86%E7%95%8C%E5%8F%AA%E5%89%A9%E7%A7%A915%E4%B8%94%E5%8D%95%E6%AD%A5%E4%B8%89%E4%BB%A3%E7%AA%97%E5%8C%85%E5%90%AB%E5%85%AB%E7%82%B9%E4%BA%8C%E4%BA%8C%E4%B8%80%E8%87%B3%E5%8D%81%E7%82%B9%E5%85%AD%E5%B9%B6%E5%90%AB%E4%BA%8E%E5%85%AB%E7%82%B9%E4%BA%8C%E4%BA%8C%E9%9B%B6%E5%85%AD%E5%9B%9B%E5%85%AB%E8%87%B3%E5%8D%81%E7%82%B9%E5%85%AD%E4%B8%89%E4%BA%94%E5%85%AD%E4%B8%80%E4%B8%83%E5%9D%87%E6%9C%89%E7%B2%BE%E7%A1%AE%E6%9C%89%E7%90%86%E8%AF%81%E4%B9%A6.md) · [复算脚本](https://github.com/the-omega-institute/trureturing-experiments/blob/0382ed8bb2cd901b85f322063845a616acca1b88/experiments/ch39-omega-research/replay/ch39-rational-torus-shell-gap-certificates.py)）。

这三个轻态能直接充当[第八章](ch08-flavor-hierarchy-and-ckm.md)的三代味空间吗？在两只钟的全部允许相位上，任一单位轻态至少有八分之一的概率落在极点与三条射线首站之外。因此轻带与支撑在这四站上的味空间只有零向量相交。在第 $2\,306\,888\,100\,085$ 枚正零点，五种荷分别与四种三源空间配对，二十个正交投影全都满秩，但最小主夹角仍超过 $65.73^\circ$。即使把投影换成距离它最近的保长映射，上下夸克轻线得到的九个混合矩阵元的模也全部大于 $0.025$，超过参考上界 $|V_{ub}|\le0.003787$。把轻模数定为三之后，还须解释它们怎样耦合到夸克味空间。[轻带与三源的主夹角](https://github.com/the-omega-institute/trureturing-experiments/blob/5f3cbc15b521eb464c16e0b08dcca0c2fdf98cdf/experiments/ch39-omega-research/replay/ch39-native-band-gram-angles.py) · [保长映射与夸克混合](https://github.com/the-omega-institute/trureturing-experiments/blob/5f3cbc15b521eb464c16e0b08dcca0c2fdf98cdf/experiments/ch39-omega-research/replay/ch39-polar-light-band-ckm.py)

取支撑在这四站上的三个算术 Gram 源 $g_1,g_2,g_3$。对每种荷 $q$，在第一枚正零点的高度 $\gamma_1$ 对三个源施加 $F(L_q(\gamma_1))$，其中 $F(x)=1/(1+(x/9)^{512})$。对双钟的任意目标相位和 $0\le\delta\le10^{-8}$，把三个制备源正交投影到目标单步磁拉普拉斯的最低三态上，所得三列总能张成这一轻带，其最小奇异值大于 $1.36754\times10^{-5}$。若把这三列的奇异值直接读作夸克质量（每个部门可自选标尺），即使对三源作任意共同可逆换基，上、下部门最重与最轻质量比的商 $(m_t/m_u)/(m_b/m_d)$ 也小于 $9.874$，而 $1\,\mathrm{TeV}$ 的参考区间要求它大于 $128.56$。[三源滤波](https://github.com/the-omega-institute/trureturing-experiments/blob/d3cb0b4a94354155c551903735e34d1dc42640fd/experiments/ch39-omega-research/replay/ch39-first-zero-filtered-gram-sources.py) · [质量层级界](https://github.com/the-omega-institute/trureturing-experiments/blob/da61c6d00d968234d46c687971ca3ebcb9b87467/experiments/ch39-omega-research/replay/ch39-first-zero-relative-quark-spectrum.py) · [跑动质量参考区间](https://arxiv.org/html/2510.01312v2#Sx1.T2)

换一个共同制备背景，能同时恢复六个夸克质量和 CKM 混合吗？沿用上述三源与滤波器，在各自目标单步轻带的正交归一标架中把上、下型投影列记为 $A_u,A_d$。任一矩阵失秩便给出零质量。若两者可逆，共同换基在 $A_uA_d^{-1}$ 中消去，两部门各自的整体标尺也保留其奇异值 $j_1\le j_2\le j_3$ 的两个相邻比。在整个允许的共同制备域内，即使两部门独立选取目标轻带，$j_2/j_1$ 和 $j_3/j_2$ 至少有一个小于 $52.90$，而 $1\,\mathrm{TeV}$ 的质量与混合参考窗分别要求它们大于 $77.12$ 和 $61.32$。若两部门各选连续制备相位并在各自的制备背景上读取，按目标校准相位、共同换基和部门标尺就能精确达到六质量及带号 CKM 的中心值。对应到实际零点，上型取第 $2\,345\,666$ 枚、下型取第 $964\,890$ 枚正零点，按数据校准任意可逆的共同复换基与两个独立正标尺后，无论只拟合六个 Yukawa 耦合和三个 CKM 混合角，还是再计入带号 CP 相位，各项相对参考中心的绝对偏差除以各自半宽后的最大值，最小都约为 $5.7433945\%$。让两个编号各自在中心前后 $64$ 号内变化，每个部门在自己的制备壳上读出并逐对校准共同换基和部门标尺，$16\,641$ 对中有 $97$ 对能达到六质量窗，再要求最小混合角 $\theta_{13}$ 入窗就只剩中央对。即使可逐对另选两个目标轻带，十项同时入窗的仍只有这一对。复共轭保留质量和相对奇异谱，却翻转 Jarlskog 不变量的符号，因此这项校准仍需输入 CP 方向。[共同背景的相邻比界](https://github.com/the-omega-institute/trureturing-experiments/blob/313876c5c32cb7dc5a40161c6108581f582ca5e2/experiments/ch39-omega-research/replay/ch39-moving-preparation-quark-shape.py) · [独立制备的中心解](https://github.com/the-omega-institute/trureturing-experiments/blob/0952a5c729475f341f367b3ffe731dfcd099301b/experiments/ch39-omega-research/replay/ch39-independent-preparation-quark-target.py) · [CP 符号辨识](https://github.com/the-omega-institute/trureturing-experiments/blob/977f4ebfc50aa2b6ea73dae7fbd7e17ed5114d7d/experiments/ch39-omega-research/replay/ch39-relative-spectrum-ckm-reconstruction.py) · [实际零点对与邻号唯一性](https://github.com/the-omega-institute/trureturing-experiments/blob/fa54e8191067267e884e04f5f6897efefe4cbf23/experiments/ch39-omega-research/replay/%E5%AE%9E%E9%99%85%E5%A4%B8%E5%85%8B%E9%9B%B6%E7%82%B9%E5%AF%B9%E5%9C%A8%E5%89%8D%E5%90%8E%E5%85%AD%E5%8D%81%E5%9B%9B%E5%8F%B7%E7%BB%84%E5%90%88%E4%B8%AD%E7%9A%84%E5%94%AF%E4%B8%80%E6%80%A7.md) · [九项与十项的最优校准精度](https://github.com/the-omega-institute/trureturing-experiments/blob/d0c5ab50ebaf763fea12e2629cb6760205448f08/experiments/ch39-omega-research/replay/%E4%B8%A4%E4%B8%AA%E6%8C%87%E5%AE%9A%E9%9B%B6%E7%82%B9%E4%B8%8A%E5%A4%B8%E5%85%8B%E4%B9%9D%E9%A1%B9%E4%B8%8E%E5%8D%81%E9%A1%B9%E7%9A%84%E6%9C%80%E4%BD%B3%E5%90%8C%E6%97%B6%E6%8B%9F%E5%90%88%E7%B2%BE%E5%BA%A6.md)

若改用壳的三个轻能量选编号，在每个三循环字符块取最低能量 $e_{q,j}(n)$，两部门对所有正零点编号 $n$ 分别最小化同一非常数实多项式给出的 $\sum_{j=0}^{2}f(e_{q,j}(n))$。即使允许并列，要让两枚中央编号各自达到全局最小，$f$ 的最低次数也恰为十二。取六个目标能量的指定有限小数近似 $a_i$，所得有理系数多项式 $f(t)=\prod_{i=1}^{6}(t-a_i)^2$ 使上型与下型的中央编号各自成为本部门唯一的全局极小点。若允许三个轻能量之间出现对称交叉项，也允许其他编号并列，则共同实对称多项式所需的最低总次数是四，达到该次数的构造用两个目标的能量总和校准。[十一次及以下的排除](https://github.com/the-omega-institute/trureturing-experiments/blob/5434b34bb36e0b45997a48bd7c1dcc1081fabbdd/experiments/ch39-omega-research/replay/%E4%B8%A4%E4%B8%AA%E5%A4%B8%E5%85%8B%E9%9B%B6%E7%82%B9%E5%85%B1%E5%90%8C%E5%8F%96%E5%BE%97%E5%8F%AF%E5%8A%A0%E8%B0%B1%E4%BD%9C%E7%94%A8%E5%85%A8%E5%B1%80%E6%9C%80%E5%B0%8F%E7%9A%84%E6%9C%80%E4%BD%8E%E6%AC%A1%E6%95%B0.md) · [十二次有理构造与唯一性](https://github.com/the-omega-institute/trureturing-experiments/blob/1e1b690191e430c95bc87a0663bd532914fdf17a/experiments/ch39-omega-research/replay/%E5%8D%81%E4%BA%8C%E6%AC%A1%E6%9C%89%E7%90%86%E8%B0%B1%E4%BD%9C%E7%94%A8%E5%9C%A8%E5%85%A8%E4%BD%93%E9%9B%B6%E7%82%B9%E4%B8%AD%E5%94%AF%E4%B8%80%E9%80%89%E5%87%BA%E4%B8%A4%E6%9E%9A%E5%A4%B8%E5%85%8B%E7%BC%96%E5%8F%B7.md) · [允许对称交叉项时的最低总次数](https://github.com/the-omega-institute/trureturing-experiments/blob/514b82caf47eb3fc7e5802097da011c73aedf456/experiments/ch39-omega-research/replay/%E5%85%81%E8%AE%B8%E4%B8%89%E4%B8%AA%E8%BD%BB%E8%83%BD%E9%87%8F%E4%BA%A4%E5%8F%89%E6%97%B6%E5%85%B1%E5%90%8C%E6%9E%81%E5%B0%8F%E7%9A%84%E6%9C%80%E4%BD%8E%E6%80%BB%E6%AC%A1%E6%95%B0.md)

在这两个零点各自的制备壳上读取，取正交三源坐标中的两个 Gram 矩阵 $U=A_u^*A_u$ 和 $D=A_d^*A_d$，则要用它们的厄米多项式直接给出正定源协方差 $S=KK^*$ 并使十项同时入窗，最低次数是二。若再固定原校准的部门标尺并要求精确重现原换基给出的十项读数，恰有四个不同的二次协方差满足条件，每个解中 $i(UD-DU)$ 的系数都非零。若每个矩阵乘积与它的反序乘积共用一个实系数，重现同一组精确读数的最低次数是三，全部三次协方差解构成两条互不相交的光滑闭曲线。[最低次数](https://github.com/the-omega-institute/trureturing-experiments/blob/7f7156132c22c3c1194c770cf0f773b2ee23cf88/experiments/ch39-omega-research/replay/%E4%B8%A4%E4%B8%AA%E5%A4%B8%E5%85%8B%E5%AE%9E%E9%99%85%E9%9B%B6%E7%82%B9%E7%9A%84%E6%9C%80%E4%BD%8E%E4%BA%8C%E6%AC%A1Gram%E5%A4%9A%E9%A1%B9%E5%BC%8F.md) · [四个协方差](https://github.com/the-omega-institute/trureturing-experiments/blob/7f7156132c22c3c1194c770cf0f773b2ee23cf88/experiments/ch39-omega-research/replay/%E5%9B%BA%E5%AE%9A%E4%B8%A4%E9%9B%B6%E7%82%B9%E5%8D%81%E9%A1%B9%E8%AF%BB%E6%95%B0%E6%81%B0%E6%9C%89%E5%9B%9B%E4%B8%AA%E5%8E%84%E7%B1%B3%E4%BA%8C%E6%AC%A1%E6%BA%90%E5%8D%8F%E6%96%B9%E5%B7%AE.md) · [实系数下的三次解](https://github.com/the-omega-institute/trureturing-experiments/blob/7957c7a1c405c8248edde2c8afc7de3afbd136b9/experiments/ch39-omega-research/replay/%E5%9B%BA%E5%AE%9A%E5%8D%81%E9%A1%B9%E8%AF%BB%E6%95%B0%E6%97%B6%E5%AE%9E%E7%B3%BB%E6%95%B0%E4%B8%89%E6%AC%A1%E6%BA%90%E7%9A%84%E4%B8%A4%E6%9D%A1%E9%97%AD%E6%9B%B2%E7%BA%BF.md)

在上述实系数约束下，二次协方差可以让六个夸克质量同时入窗，但再要求最小混合角 $\theta_{13}$ 入窗就排除了整个二次族，即使允许各部门任选正标尺。在同一对制备背景上，若令单个振幅 $X$ 为 $U,D$ 的至多二次复系数多项式，则每个三阶半正定协方差都可写成 $S=XX^*$，因此要预测质量与混合，仍须由作用量独立于目标数据确定系数。[六质量与一个混合角](https://github.com/the-omega-institute/trureturing-experiments/blob/20621e8c850a1b22e863fd009c702edde8139d2d/experiments/ch39-omega-research/replay/%E5%85%AD%E8%B4%A8%E9%87%8F%E4%B8%8E%E4%B8%80%E4%B8%AA%E6%B7%B7%E5%90%88%E8%A7%92%E6%8E%92%E9%99%A4%E5%85%A8%E9%83%A8%E5%AE%9E%E7%B3%BB%E6%95%B0%E4%BA%8C%E6%AC%A1%E6%BA%90.md) · [二次振幅的因子分解](https://github.com/the-omega-institute/trureturing-experiments/blob/78e2205080b6770d57f6a429328e7af9a3582ebc/experiments/ch39-omega-research/replay/%E5%8D%95%E4%B8%AA%E4%BA%8C%E6%AC%A1%E6%8C%AF%E5%B9%85%E5%A4%8D%E7%8E%B0%E5%A4%B8%E5%85%8B%E6%BA%90%E5%B9%B6%E5%9C%A8%E5%85%A8%E9%83%A8%E8%BF%91%E9%82%BB%E4%BF%9D%E6%8C%81%E6%AD%A3%E5%AE%9A.md)

这个三阶例子恰在一个余维界上。七个词 $I,U,D,U^2,UD,DU,D^2$ 在这对制备上复线性无关，在九维矩阵空间中留下两个独立的复约束。一般地，设振幅有 $m$ 行、$n$ 列。手工推导表明，只要允许的复线性子空间的复余维至多为 $n-1$，每个秩至多为 $n$ 的 $m$ 阶半正定源都有振幅因子，即使源是奇异的。右乘酉矩阵保持 $XX^*$ 不变，这一自由度足以同时满足这些约束。再多一个约束便可能漏掉指定的非零目标 $S$：取 $u^*Su>0$，要求 $u^*X=0$ 恰好给出 $n$ 个独立复约束，却使 $u^*XX^*u=0$。零源总可取 $X=0$，而超过 $n$ 的秩已超出振幅的列数。[余维界的变分推导](https://github.com/the-omega-institute/trureturing-books/issues/1617#issuecomment-7230510590) · [矩形因子](https://github.com/the-omega-institute/trureturing-books/issues/1617#issuecomment-7230517942)

若约束只要求实线性，二阶振幅的统一保证是三个实约束。设 $S=TT^*\succeq0$。任意因子 $X$ 与 $T$ 有相同的行 Gram 矩阵，行张成空间之间的等距映射可扩张为整个空间上的酉变换，所以 $X=TU$，也涵盖奇异的 $S$。取 $\det U$ 的一个单位复数平方根，可写 $U=(c+is)Q(z,w)$，其中 $c^2+s^2=1$，$Q$ 的两行为 $(z,w)$ 和 $(-\bar w,\bar z)$，且 $|z|^2+|w|^2=1$。用 $q\in\mathbb R^4$ 表示 $z,w$ 的实坐标。若 $F$ 汇集实约束，记 $Aq=F(TQ)$、$Bq=F(iTQ)$。三个约束至多使 $A$ 有三行，取其任意非零核向量归一化，就得到一个因子。对任意指定的非零 $S$，取 $v^*Sv>0$。条件 $v^*X=0$ 给出四个独立的实约束，并将 $v^*XX^*v$ 强制为零，因此三个的保证是锐的。$S=0$ 总可取 $X=0$。

恰有四个实约束时，给定 $S$ 能否实现，等价于齐次式 $\det(cA+sB)$ 在实投影直线上是否有根。以 $s/c$ 为仿射坐标时还须检查 $[0:1]$。将根的代表 $(c,s)$ 和对应的非零核向量 $q$ 各自归一化，便可重构因子。若 $S=uu^*$ 且 $u\ne0$，所有因子可写成 $X=uv^*$，其中 $\|v\|=1$，此时只须判断实线性映射 $v\mapsto F(uv^*)$ 的秩是否小于四。此时行列式要么恒为零，要么对所有实投影点都非零。以 $S=I$ 为例，选取 $T=I$。规定第一行全为零给出行列式 $(c^2+s^2)^2$，没有实投影根。规定四个元素的虚部都为零则允许 $X=I$，对应 $[c:s]=[1:0]$。[实约束锐界与行列式判据](https://github.com/the-omega-institute/trureturing-books/issues/1630#issuecomment-7230975830)

在这两个零点的原制备区间内，要用多少个壳算子的谱来制备六个夸克质量？令 $R$ 表示壳的坐标三循环 $(x,y,z)\mapsto(y,z,x)$，将 $i(R-R^*)$ 和极点的坐标投影压缩到三源空间，分别记为 $H,P$。每个部门用三个正质量平方之和除以这三个平方的几何平均数，便可消去部门标尺。六个 $1\,\mathrm{TeV}$ 质量参考窗要求上型与下型两项之比超过 $75.43$。只用非零实线性组合 $aH+bP$ 选源时，即使将与不同组合对易的半正定源按正权混合，这个比值也小于 $34$。加入 $H^2$ 后，取 $L\in\operatorname{span}_{\mathbb R}\{P,H,H^2\}$。与单个非零 $L$ 对易的半正定源仍无法达到六个窗，即使允许重本征空间内有任意复相干。按质量校准两个方向、谱权与部门标尺，就能使六项同时入窗，所得 $S=f_1(L_1)+f_2(L_2)$ 的两项都是正定谱函数。在六质量入窗、CP 相位自由时，极点与壳三循环所定的实对称源能同时拟合的混合角对只有 $\{\theta_{12},\theta_{13}\}$，因此三个角无法全部入窗。在这对实际零点上，增添一个纯虚厄米方向 $i[H,P]$ 并取实系数即可达到含带号 CP 相位的十项全局最优，固定下型标尺为一时恰有四个这样的最优协方差。[两项壳算子的迹比界](https://github.com/the-omega-institute/trureturing-experiments/blob/2741b3dda6d6ebbf0398291aad3347dd77f52673/experiments/ch39-omega-research/replay/%E5%85%AD%E4%B8%AA%E5%A4%B8%E5%85%8B%E8%B4%A8%E9%87%8F%E6%8E%92%E9%99%A4%E5%85%A8%E9%83%A8%E5%A3%B3%E4%B8%89%E5%BE%AA%E7%8E%AF%E4%B8%8E%E6%9E%81%E7%82%B9%E7%9A%84%E5%AE%9E%E5%8E%84%E7%B1%B3%E9%93%85%E7%AC%94%E8%B0%B1%E6%BA%90.md) · [两个谱方向的必要性与构造](https://github.com/the-omega-institute/trureturing-experiments/blob/14bde35861a49cf9db6cdb15c2e47b8ef7d49ff8/experiments/ch39-omega-research/replay/%E4%B8%89%E9%A1%B9%E5%AE%9E%E5%A3%B3%E9%93%85%E7%AC%94%E6%BB%A1%E8%B6%B3%E5%85%AD%E8%B4%A8%E9%87%8F%E7%AA%97%E6%81%B0%E9%9C%80%E4%B8%A4%E4%B8%AA%E8%B0%B1%E6%96%B9%E5%90%91.md) · [实源可同时拟合的两个混合角](https://github.com/the-omega-institute/trureturing-experiments/blob/526fd479e652ec84adcf31c8a21e6ad770266f13/experiments/ch39-omega-research/replay/%E5%85%AD%E8%B4%A8%E9%87%8F%E6%9D%A1%E4%BB%B6%E4%B8%8B%E5%A3%B3%E5%AE%9E%E6%BA%90%E7%9A%84%E7%AC%AC%E4%BA%8C%E6%B7%B7%E5%90%88%E8%A7%92%E4%B8%8D%E8%83%BD%E4%B8%8E%E5%8F%A6%E4%B8%80%E4%B8%AA%E8%A7%92%E5%90%8C%E7%AA%97.md) · [四个十项最优源](https://github.com/the-omega-institute/trureturing-experiments/blob/2846e3d51e4c026377bd34278e3948559173509f/experiments/ch39-omega-research/replay/%E5%9B%BA%E5%AE%9A%E4%B8%A4%E9%9B%B6%E7%82%B9%E7%9A%84%E5%8D%95%E4%BA%A4%E6%8D%A2%E5%AD%90%E5%A3%B3%E6%BA%90%E8%BE%BE%E5%88%B0%E5%8D%81%E9%A1%B9%E5%85%A8%E5%B1%80%E6%9C%80%E4%BC%98.md)

不同荷的三维轻空间彼此之间又错开多少？旗舰零点上的读数见[第十三章](ch13-winding-ladder-and-joint-vacuum.md)的压力测试，它并不是那一个钟相位的偶然。按 $h$ 升序取前三个模作轻空间（在旗舰零点上与以 $h < 9$ 取轻模的读法一致；在环面上五种荷都不是处处恰有三个 $h < 9$ 的模），在整张双钟环面与全部辐边亏额上，每个荷的三个轻模恰在轮换特征标 $1, \omega, \omega^2$ 中各占一维：奇荷三条轻线的扇区标签处处固定，偶荷只有特征标 $1$ 的那条线在两个候选之间换手。两种荷之间按固定站点对应计的泄漏 $\Lambda(q, r) = 1 - \tfrac13 \operatorname{tr}(P_q P_r)$ 因此等于 $1$ 减去三个扇区夹角余弦平方的平均：奇荷与偶荷之间处处大于 $0.4$、小于 $0.65$；任意两荷之间处处至少 $0.001$，没有一个钟相位能让两种荷的轻空间重合。允许逐站调相与站点重排时，旗舰零点上给出 $31\%$ 的那个下界泛函在环面上别处可以低于 $0.3015$，不是一致下界；调相与重排后的泄漏在整张环面上的下确界尚未判定（[全环面上的跨荷轻空间泄漏](https://github.com/the-omega-institute/trureturing-experiments/blob/9c43576f64e505d1aacf5a19e3c21831d842fff3/experiments/ch39-omega-research/replay/%E4%BA%94%E8%8D%B7%E4%B8%A4%E6%AD%A5%E4%B8%89%E7%BB%B4%E8%BD%BB%E7%A9%BA%E9%97%B4%E5%9C%A8%E5%85%A8%E9%92%9F%E7%9B%B8%E4%BD%8D%E7%8E%AF%E9%9D%A2%E4%B8%8A%E6%AF%8F%E4%B8%AA%E8%BD%AE%E6%8D%A2%E7%89%B9%E5%BE%81%E6%A0%87%E5%90%84%E5%8D%A0%E4%B8%80%E7%BB%B4%E5%A5%87%E5%81%B6%E8%8D%B7%E9%97%B4%E6%B3%84%E6%BC%8F%E5%A4%84%E5%A4%84%E5%A4%A7%E4%BA%8E%E9%9B%B6%E7%82%B9%E5%9B%9B%E8%80%8C%E4%BB%BB%E6%84%8F%E4%B8%A4%E8%8D%B7%E9%83%BD%E4%B8%8D%E9%87%8D%E5%90%88.md) · [区间证书](https://github.com/the-omega-institute/trureturing-experiments/blob/9c43576f64e505d1aacf5a19e3c21831d842fff3/experiments/ch39-omega-research/replay/ch39-torus-cross-charge-light-leakage.py)）。

把固定分界 $9$ 与内禀站点方差最小割 $T = 9 + (1 - \delta)^2$ 放到真实黎曼零点序列的**两步质量读数** $h_{q,j} = |\lambda_j(L_q)(\lambda_j(L_q) - c)|$ 上正面交锋，二者的物理差异马上水落石出。在十九点图中，按“(顶点度数, 软辐边数)”统计，顶点分布依次为 $(10, 0):3$、$(10, 1):3$、$(14, 0):3$、$(16, 0):6$、$(18, 0):3$ 与 $(18, 3):1$；度为 $d$ 且带 $k$ 条软边的顶点给出跨界平方权和 $d - k + k(1 - \delta)^2$，故三个受软化的十度外点同时取到最小割 $T = 9 + (1 - \delta)^2$。对全体实际正零点有 $0 < \delta < (23/25)2^{-20}/14^2$，于是 $9.99999999 < T < 10$。

::: {.example #ex-ou-ch07-cutoff-comparison title="零点 #8236、#8359 与 #148341 在两步质量读数下的固定分界 9、最小割 T 与双态投影逐项对账"}
在两步无量纲质量读数 $h_{q,j} = |\lambda_j(L_q)(\lambda_j(L_q) - c)|$（$c = 15 - \delta/3$）与原十六重标量两圈强耦合窗 $[0.117, 0.119]$、四层曲率窗 $[0.998, 1.002]$ 下，三枚关键实际正黎曼零点清晰暴露了三套分界口径的边界差异（[`ch39-first-native-cut.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-first-native-cut.py)、[`ch39-neutral-site-variance-gap.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-neutral-site-variance-gap.py)、[`ch39-conjugate-site-projection-gap.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-conjugate-site-projection-gap.py)）：

| 零点编号 | 两步谱在固定分界 $9$ 下表现 | 两步谱在内禀最小割 $T = 9 + (1-\delta)^2$ 下表现 | 物理窗读数与结构注记 |
| :---: | :--- | :--- | :--- |
| **#8236** | 荷六第三两步质量落在 $(9, T)$，未通过分界 $9$ | **最小割首枚三窗命中**（$\gamma \approx 8354.9185$） | $\max_q h_{q,3} \approx 9.2061 < T < 10.5855 \approx \min_q h_{q,4}$；$\alpha_s \in (0.118306, 0.118312)$；曲率比 $\approx 1.000938$ |
| **#8359** | **分界 $9$ 首枚三窗命中**（前 $8192$ 枚中 $67$ 枚三模但 $0$ 枚三窗） | 通过（居中方盒与原三窗零点的共同两步间隙皆含 $[9, 10.19]$） | 扩充至正负荷双态共轭实投影时，**荷二仅余两模** |
| **#148341** | 荷六两步谱仅剩两模低于 $9$，被分界 $9$ 淘汰 | **被最小割挽救**：五荷各三模且过另两窗 | $\max_q h_{q,3} \approx 9.4749 < T < 10.5917 \approx \min_q h_{q,4}$；两钟角距 $\approx 0.2315\,\mathrm{rad}$，六面味坐标 $\approx 0.9722$ |

这两个零点把谱投影与另两窗的作用分开。令 $P_q(a)$ 投影到两步质量严格小于 $a$ 的模。因为 $T>9$，从 $P_q(9)$ 换到 $P_q(T)$ 恰好纳入质量落在 $[9,T)$ 的模。在第 $8359$ 枚零点，五种荷的共同谱隙覆盖这段区间，两个分界给出完全相同的五个投影。在第 $8236$ 枚零点，荷六的第三个模落在 $(9,T)$，因而两个分界给出的轻谱不同。两种比较均沿用同一十六重标量表与四层曲率处方，所以在各自零点上强耦合和曲率的读数与分界选择无关。要检验手征分界会怎样反过来影响另两窗，需要按该分界选出的重场谱重新计算它们。

尤为警醒的是正负荷双态站点投影反例：在每个站点放入一对电荷 $(+q, -q)$ 并以 $U_{ij} = \operatorname{diag}(u_{ij}^q, \bar{u}_{ij}^q)$ 沿边输运，允许每站独立取非平凡复正交投影 $P_i \in M_2(\mathbb{C})$，其平方对易子能量 $E_q(P) = \frac{1}{2}\|[L_q \oplus L_{-q}, P]\|_{\mathrm{HS}}^2$ 在五种荷与全部双钟相位上的**极小值全部归零**！原因在于无钟三角形 $14 \to 0 \to 16 \to 14$ 的闭路相位 $u$ 对五个荷皆满足 $u^q \neq \bar{u}^q$，迫使与和乐对易的秩一投影精确锁在两根恒定电荷轴上。即使强加电荷共轭实结构 $J P_i J^{-1} = P_i$ 使极小值重返正数（荷六恰等于 $T$），把这条实投影规则用到 #8359 时仍会把荷二轻模从三减为二。
:::

这组对账说明，站点方差分界 $T$ 是一枚仅读原壳边权的简洁内禀量，它确实严格扩宽了三窗零点集合、把首枚见证前移到 #8236 并挽救了 #148341，但它本身仍是模型假设，而非在任意站点代数扩充下都纹丝不动的普适不变量。在下面的交互实验卡中，读者可以沿高度轴 $\gamma$ 连续扫描单步磁拉普拉斯 $L_q$（无软化 $\delta = 0$）的五荷谱，拖动谱分界 $\Lambda$ 并与站点方差线 $T = 10$ 正面比对。

::: {.viz src="behrend-unification-lab" preset="three-gen-gap" height="500"}
**十九点球壳五荷谱隙与站点方差分界实验卡（`three-gen-gap`）。** 沿高度时间轴 $\gamma$ 连续扫描五种超荷 $q \in \{1, 2, -3, -4, 6\}$ 的单步磁拉普拉斯 $L_q$ 全谱（纵轴在 $7 \le \lambda \le 11.5$ 区间放大；青色三轻模恒低于 $8.685$ 且按 $(1, \omega, \omega^2)$ 循环特征标各占一模，紫色重模恒高于 $9.6$），自由拖动谱分界 $\Lambda$ 并对照未软化站点方差线 $T = 10$（例如在 $\gamma_3 \approx 25.01$ 处，$q = -4$ 扇区的第四模已落入 $T = 10$ 之下——对照模式下以品红色高亮——但仍稳居共同谱隙 $(8.685, 9.6)$ 与 $\Lambda = 9$ 之上）。
:::

## 7.2 四维格点手征外尔构造、边界伙伴与味色散匹配 {#sec-ch07-4d-lattice-weyl}

内部球壳上的三个正本征值绝不自动等同于四维手征外尔费米子。首先横着一条硬限制：如果正权磁拉普拉斯自身提供荷一零模，那么所有整数荷的平行输运都可以同时规范化为平坦，彻底丧失非平凡磁通。因此，必须区分**内部边界手征零模**与**四维格点重叠手征算子**两条显式升维路径。

### 7.2.1 三射线单侧边界伙伴、钟边覆盖与零陈数

在内部球壳侧，几何拓扑给出了清晰的低模读取结构：

- **三射线单侧边界伙伴**：十九点壳上存在三条最小分母射线；对每类标准模型表示，在三条射线的首站缺去一侧手征伙伴后，精确留下**三个同手征内部零模**。
- **唯一三站点覆盖与零陈数**：三条射线首站恰是球壳全部钟边的**唯一最小三站点顶点覆盖**；随着两只钟绕遍整个相位环面 $\mathbb{T}^2$，三条低模循环特征标线丛的第一陈数严格为 **$(0, 0, 0)$**，意味着低模纤维丛在钟环面上整体平凡、无拓扑缠绕障碍。
- **外端三点轨道读出与内站盲相位**：每组三条时钟边的外端轨道均能在全相位域稳定独立地读出全部三个轻态，重构矩阵的逆放大因子严格小于 $4$；相反，三条内射线首站上存在使某一轻模完全不可见的“盲相位”。

### 7.2.2 五步单纯形重叠核、十九点壳升维与 $8K - 3$ 步味色散匹配

进入真正的四维欧氏格点时，常数通量共用的有理度量是 $g = I - J/5$（该度量将在[第十章](ch10-regge-gravity-and-spin2.md)同样充当四维单纯形雷吉引力的平直底座）。在这一度量上构造**五步单纯形威尔逊—重叠核**（[`ch39-simplex-overlap.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-simplex-overlap.py)）：

1. **三物种自由质量窗**：当威尔逊调节器质量 $m$ 落在区间

   $$
   \frac{25 - 5\sqrt{5}}{4} \;<\; m \;<\; \frac{7}{2}
   $$

   之内时，自由核恰好给出**三个同手征定向的外尔物种**，其重叠核的统一谱隙精确等于 $m$ 到最近窗口端点的距离（在格盒边长为 $30$ 的倍数时取到）。
2. **光滑磁通的普法夫指数律**：对严格闭合的五步核（负对角步取四条坐标链的逆积），取 $m = 139/40$，只要有限周期盒上单位荷方格的主转数全都至多为 $2^{-29}$，手征指数便严格等于

   $$
   I = -3\operatorname{Pf}(C),
   $$

   其中 $C$ 为六个整数磁通组成的 $4 \times 4$ 反对称矩阵（[`ch39-smooth-flux-index.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-smooth-flux-index.py)）。例如两面单位磁通精确给出 $I_{\bar{\mathbf{5}}} = -6$、$I_{\mathbf{10}} = -18$，且所有满足同一光滑界的对角规范场中，各 Cartan 行列式荷统统精确抵消。
3. **十九点壳升维为四维重叠核**：将十九点壳质量矩阵本身作为四维威尔逊质量项、令外部规范输运在十九分量间共用，小曲率规范场下**十九点壳的完整重叠指数恰为单份指数的三倍**，而其余十六个重层的手征指数全部为零。更进一步，零超荷磁通的小曲率弱扇区以及纯超荷的全部容许磁通扇区都拥有规范不变的三代外尔测度——甚至允许四维每个格点在零点 #11431 与 #133931 之间独立切换，仍保有同一测度与三倍指数！让两只钟分别沿不同空间轴各绕相位环面一周时，只要控制相邻格点的质量变化界，四维核在整个构型空间仍维持严格谱隙 **$> 0.008$**。这一升维核的局域性有显式常数：凡方格误差不超过 $1/200$，任一正零点常数壳的重叠核满足 $\|D(x, y)\| \le 1155\,e^{-0.001523793\,d(x, y)}$，测度构造中的加藤（Kato）输运项对两条相距 $d$ 的链的二阶变分，在一代十五个分量上合计不超过 $1.002 \times 10^{20}\,e^{-0.003047586\,d}$（变分范数取各表示中的最大值），常数与体积无关；四维各格在 #11431 与 #133931 之间任意切换时，率降到 $0.000850412$，前因子仍有限。这些界要到约 $2900$ 至 $25000$ 个格距之外才小于一，衡量的是谱隙仅约 $10^{-2}$ 时该估计方法的上界尺度，不是物理关联长度（[符号核与输运项的显式界](https://github.com/the-omega-institute/trureturing-experiments/blob/d2ca3fd9b24cc2591e2d49a308c04407fce60ee0/experiments/ch39-omega-research/replay/%E5%8D%81%E4%B9%9D%E7%82%B9%E5%A3%B3%E9%87%8D%E5%8F%A0%E6%A0%B8%E4%B8%8E%E6%B5%8B%E5%BA%A6%E8%BE%93%E8%BF%90%E9%A1%B9%E7%9A%84%E6%98%BE%E5%BC%8F%E6%8C%87%E6%95%B0%E5%B1%80%E5%9F%9F%E6%80%A7.md) · [常数证书](https://github.com/the-omega-institute/trureturing-experiments/blob/d2ca3fd9b24cc2591e2d49a308c04407fce60ee0/experiments/ch39-omega-research/replay/ch39-shell-overlap-kato-locality.py)）。

   完整测度流还包含参考测度的连接。它对两条不同链的二阶变分可分为反对称的曲率部分与对称部分，两者的身份不同。曲率部分只由手征投影决定，与参考测度的具体构造无关；这是测度项的可积性条件（文献结果，未在本书形式化：M. Lüscher，*Abelian chiral gauge theories on the lattice with exact gauge invariance*（1999），第 3.4 节，[10.1016/S0550-3213(99)00115-7](https://doi.org/10.1016/S0550-3213%2899%2900115-7)）。由此，参考连接的曲率等于终点三个标准重叠块的贝里（Berry）曲率，完整测度的曲率等于十九点壳投影的贝里曲率，加藤输运项的曲率恰为两者之差。曲率部分也有与体积无关的显式常数：凡方格误差不超过 $1/200$，参考连接的曲率在一代十五个分量上合计不超过 $2.606 \times 10^6\,e^{-0.15069244\,d}$，任一正零点常数壳的完整测度曲率不超过 $1.184 \times 10^{16}\,e^{-0.003047586\,d}$。对称部分则不由手征投影与容许性条件决定：在不限定局域范围的容许参考测度类中，给参考测度乘以一个局域的规范不变相位，就能把对称部分放大到任意倍，并使其衰减慢于任一给定的率。因此对称部分须对所选的参考测度构造另行估计（[曲率部分的显式界与对称部分的任意性](https://github.com/the-omega-institute/trureturing-experiments/blob/c9b3a7d9d302879ba9a8d632ed831bdb31cb1dc3/experiments/ch39-omega-research/replay/%E5%A4%96%E5%B0%94%E6%B5%8B%E5%BA%A6%E6%B5%81%E7%9A%84%E6%9B%B2%E7%8E%87%E9%83%A8%E5%88%86%E6%98%BE%E5%BC%8F%E6%8C%87%E6%95%B0%E5%B1%80%E5%9F%9F%E8%80%8C%E5%AF%B9%E7%A7%B0%E9%83%A8%E5%88%86%E5%8F%AF%E9%9A%8F%E5%8F%82%E8%80%83%E9%80%89%E6%8B%A9%E4%BB%BB%E6%84%8F%E6%94%BE%E5%A4%A7%E4%B8%94%E8%A1%B0%E5%87%8F%E4%BB%BB%E6%84%8F%E5%8F%98%E6%85%A2.md) · [常数证书](https://github.com/the-omega-institute/trureturing-experiments/blob/c9b3a7d9d302879ba9a8d632ed831bdb31cb1dc3/experiments/ch39-omega-research/replay/ch39-shell-measure-curvature-locality.py)）。对称部分里与相位选取无关的那一部分可以单独定出：它随相位的变动是相位泛函的海森矩阵，不随相位改变的是它的旋度，而旋度恒等于曲率的一阶导数；在凸的或单连通的场区域上，对称部分模去相位海森矩阵后的等价类由旋度完全决定，全局情形未判定。曲率导数同样有与体积无关的显式界：参考端点上，三条链的十五个分量合计不超过 $7.929 \times 10^7\,e^{-0.07534622\,P}$，$P$ 为三个基点的周长，对一切相位选取成立。在纯超荷切片上平凡场的一个凸邻域内，若取沿每条射线平行输运的定相，超荷方向的参考对称部分不超过 $2.434 \times 10^{12}\,e^{-0.11301933\,d}$；但这条定相规则规范不变当且仅当十五分量加权的手征密度在该邻域上恒为零，小格点上的数值迹象指向它不为零，尚未证明。所以这些界还不是任何容许参考测度的对称部分常数，对所选构造的显式常数仍待给出（[对称部分的相位无关部分与射线定相](https://github.com/the-omega-institute/trureturing-experiments/blob/69984f1cb28f4d691551bc34867ee203e243fd2e/experiments/ch39-omega-research/replay/%E5%87%B8%E7%89%87%E4%B8%8A%E5%A4%96%E5%B0%94%E6%B5%8B%E5%BA%A6%E6%B5%81%E5%AF%B9%E7%A7%B0%E9%83%A8%E5%88%86%E6%A8%A1%E7%9B%B8%E4%BD%8DHessian%E7%94%B1%E6%9B%B2%E7%8E%87%E5%AF%BC%E6%95%B0%E5%86%B3%E5%AE%9A%E4%B8%94%E7%BA%AF%E8%B6%85%E8%8D%B7%E5%87%B8%E7%89%87%E4%B8%8A%E7%9A%84%E5%B0%84%E7%BA%BF%E5%AE%9A%E7%9B%B8%E5%8F%82%E8%80%83%E9%83%A8%E5%88%86%E4%BB%A5%E7%8E%87%E9%9B%B6%E7%82%B9%E4%B8%80%E4%B8%80%E4%B8%89%E6%8C%87%E6%95%B0%E5%B1%80%E5%9F%9F.md) · [常数证书](https://github.com/the-omega-institute/trureturing-experiments/blob/69984f1cb28f4d691551bc34867ee203e243fd2e/experiments/ch39-omega-research/replay/ch39-measure-symmetric-part-ray-gauge.py)）。

然而，四维单纯形格上的三个轻锥并不天然享有三阶对称。在裸动能层面，三个物种的平移特征只允许交换共轭一对，而不支持十九点壳上的三阶坐标轮换，并且裸动能从二、三阶余动量展开起就区分三个中心。能否靠有限程改进把三锥色散拉平？答案是一套清晰的有限步分级结构（[`ch39-finite-taste-jets.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-finite-taste-jets.py)）：

- 仅用单步虚部的严格递增五次多项式，即可在整个三物种质量窗内配平三个轻锥的全部二、三阶色散并保留自由谱隙（五次最小；固定原威尔逊项时，四阶两个动量不变量留下不可消去的差）。
- 同时改进动能与威尔逊标量项后，对**任意指定有限阶 $K$**，至多 **$8K - 3$ 步**就足以把三个轻锥的色散展开配平到 $K$ 阶，同时至少保留一半原自由谱隙；反过来，保持邻近重中心的有限程克利福德核必然满足路径长度下界 $32r \ge K + 1$。

下表将这四类从球壳通往四维手征三代的显式构造并列成一张清晰的对照账：

| 构造路径 | 核心条件与质量窗 | 拓扑指数 / 读出常数 | 保留的结构局限 |
| :--- | :--- | :--- | :--- |
| 三射线单侧边界伙伴 | 最小分母三射线首站缺单侧伙伴 | $3$ 枚同手征内部零模；唯一 $3$ 站钟边覆盖；钟环面第一陈数 **$(0, 0, 0)$** | 内站存在盲相位；外端三点轨道读出逆放大 $< 4$ |
| 五步单纯形重叠核 | 度量 $g = I - J/5$，$(25 - 5\sqrt{5})/4 < m < 7/2$ | 自由 $3$ 同手征物种；光滑（方格主转数 $\le 2^{-29}$）指数 **$-3\operatorname{Pf}(C)$** | 裸动能自二、三阶起区分三轻锥，不支持三阶轮换 |
| 十九点壳四维重叠升维 | 壳矩阵作四维威尔逊质量，共用外部规范链 | 小曲率下全壳重叠指数 **$3 \times$ 单份指数**，十六重层指数恒零 | 逐格切换 #11431/#133931 保测度；双钟空间绕周保隙 $> 0.008$ |
| 高阶味色散匹配核 | 改进动能与威尔逊标量至任意阶 $K$ | 至多 **$8K - 3$ 步**配平三锥 $K$ 阶射流，留 $\ge 1/2$ 自由隙（需 $32r \ge K + 1$） | 全部继承光滑指数 $-3$，仍无法免疫粗糙规范反常 |

值得注意的是，这些任意高阶的味色散改进全部继承足够光滑单位磁通上的指数 $-3$——它们能让自由低能极限无限逼近完美的对称三代，却完全无法驱散下一节即将现身的非微扰粗糙规范幽灵。

## 7.3 粗糙规范测度障碍、正交希格斯标架与纯弱十二费米子顶点 {#sec-ch07-rough-measure}

在光滑背景上一切看似风平浪静。可是一旦进入真正的四维格点路径积分，测度由粗糙规范链主导——在六个满足规范与牛顿标定的黎曼零点上，把共同系数放进完整 $SU(5)$ 微观面权，单个坐标方格距单位不超过 $0.15$ 的条件概率仍小于 $0.184$，而满足光滑定理所需 $2^{-26}$ 小球的概率更是跌到 **$2^{-560}$ 以下**（[`ch39-amplified-smoothness.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-amplified-smoothness.py)）！更直白地说，在未放大的黎曼零点三角面权下，即便将费米子的负对角步严格锁定为四条坐标链的逆积，任意固定正谱隙阈值在足够大的有限盒内都以任意高置信度被最小奇异值击穿，且任意固定近零窗口内的期望本征值数都有正比于可容纳不交子盒数的正下界（[`ch39-closed-link-spectrum.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-closed-link-spectrum.py)）。粗糙背景不是罕见边缘，而是路径积分的压倒性主体。

### 7.3.1 粗糙中心反常、电磁 Cartan 荷与二次指数律

正是在这片粗糙海洋里，四项非微扰判定定理划出了生与死的精确边界：

| 检验维度 | 显式格点构造与输入 | 量化障碍或阈值结论 | 复算证书 |
| :--- | :--- | :--- | :--- |
| $SU(5)$ 粗糙中心反常 | $5^4$ 周期盒闭合 $SU(5)$ 链 | $(I_{\bar{\mathbf{5}}}, I_{\mathbf{10}}) = (2, 7)$，左手行列式中心荷 $-2 + 14 \equiv 2 \pmod 5$；三背景覆盖全质量窗 | [`ch39-rough-overlap-index.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-rough-overlap-index.py) |
| 电磁 Cartan 荷与二次律 | $5^4$ 盒两面电磁方向有限磁通 | 五阶中心荷消去后，弱同位旋 Cartan 荷仍为 **$-100$**（$460/625$ 赋值非平凡）；无障碍等价于 $I(k) = c k^2$ | [`ch39-magnetic-weyl-index.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-magnetic-weyl-index.py) |
| 平行正交希格斯标架数 | 有序正交基本 $SU(5)$ 希格斯场 | **$3$ 份**仍留 $SU(2)$，大盒必现近零模；**$4$ 份**维持共同谱隙 $1/100$，所需动能刚度 $\kappa$ 仅随盒长对数增长 | [`ch39-higgs-rank-gap.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-higgs-rank-gap.py) |
| 纯弱三代瞬子顶点 | $2^4$ 盒纯 $SU(2)$ 奇指数链 + 六 RH 面权 | $12$ 份双重态实配对使 $(QQQL)^3$ 积分处处同号，归一 $\Delta B = \Delta L = 3$ 期望 **$> 2^{-9472}$** | [`ch39-rh-weighted-weak-vertex.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-rh-weighted-weak-vertex.py) |

第一道重击是**全域正测度中心障碍**：在 $5^4$ 周期盒上构造的显式闭合 $SU(5)$ 粗糙背景，直接给出共轭基本表示与外平方表示的重叠指数 $(I_{\bar{\mathbf{5}}}, I_{\mathbf{10}}) = (2, 7)$。在左手外尔行列式线上，$\mathbb{Z}_5$ 中心生成元积累的净荷为

$$
-I_{\bar{\mathbf{5}}} + 2 I_{\mathbf{10}} = -2 + 14 = 12 \equiv 2 \pmod 5 \neq 0.
$$

这一反例在零点面权的一个正概率开集上稳定存在；即便放宽让 $\bar{\mathbf{5}}$ 与 $\mathbf{10}$ 独立挑选各自的三物种窗口质量 $(m_{\bar{\mathbf{5}}}, m_{\mathbf{10}})$，只需三个显式背景就能彻底覆盖整片二维质量窗（[`ch39-uniform-center-obstruction.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-uniform-center-obstruction.py)）。由此一锤定音：不约束粗糙规范域，这套五步重叠核无法在全构型空间定义规范等变的外尔测度。

第二道重击来自**电磁 Cartan 荷与二次指数律**：哪怕把目光缩回普通电磁方向，在 $5^4$ 盒上施加两面有限磁通使五阶中心荷恰好归零，弱同位旋生成元仍在左手行列式线上留下 **$-100$** 的巨额 Cartan 荷，且全部 $625$ 种有序对角磁通赋值中有 $460$ 种带有非平凡 Cartan 荷！对任意尚未发生模合并的有限阿贝尔链场，这条检验给出充要判据：所有对角赋值上的 Cartan 荷全消，**当且仅当指数函数满足精确的二次定律 $I(k) = c k^2$**（平行四边形恒等式）。光滑普法夫区自动服从二次律，粗糙区公然背叛它。

### 7.3.2 正交希格斯标架的护隙相变与纯弱十二费米子瞬子顶点

能否借协变平行的基本希格斯标架把粗糙规范场拉回安全区？这里的相变精准得如同刀刻：

::: {.remark #rem-ou-ch07-three-vs-four-frames title="为何三份正交希格斯标架守不住谱隙，而四份恰好以对数刚度锁死"}
把 $SU(5)$ 规范群逐个钉在有序正交的基本希格斯向量上，剩余未破缺子群依次为 $SU(4)$（$1$ 份）、$SU(3)$（$2$ 份）、$SU(2)$（$3$ 份）与平凡群 $\{1\}$（$4$ 份）。

- **一至三份标架失守**：只要还留着一个非交换的 $SU(2)$ 子群，即便希格斯动能刚度 $\kappa$ 任意大、甚至取严格平行约化，在足够大的有限盒内总能塞进足够多彼此不交的小子盒，令 $\bar{\mathbf{5}}$ 与 $\mathbf{10}$ 两核以任意给定高置信度同时涌现近零模；在 $(2, 7)$ 粗糙背景的局部轨道上，三份基本场虽可由列行列式构造近最优等变相位，却挡不住大盒中的 $SU(2)$ 粗糙涨落。
- **四份标架的对数护隙**：当正交基本希格斯标架增至**四份**，所有非平凡连续规范自由度被全部钉死！要在边长 $L$ 的大盒中以固定置信度维持共同核谱隙 $\delta \ge 1/100$，所需的有限动能刚度 $\kappa$ 随 $L$ 的增长阶**仅仅是对数级**。在四标架加一条对角边复读数的满概率开域上，还可构造与全部格点平移相容的光滑等变手征测度相位（额外缺陷集实余维至少为 $2$），且测度流满足体积无关的指数局域性界 $\le 2^{45}\delta^{-4}(1 + \delta^2/2^{18})^{-2D}$。
:::

最后，检验一套三代格点手征模型是否真正活着的终极试金石，是它能否在非微扰规范积分后生出 ’t Hooft 预言的三代重子—轻子数破坏顶点 $\Delta B = \Delta L = 3$。在 $2^4$ 格上构造纯 $SU(2)$ 奇指数弱链时，三代共十二份弱双重态的实配对奇迹般地使 $(QQQL)^3$ 乘积的费米子积分在每个有隙构型上**处处同号**！于是完成全部弱规范链积分后不存在符号相消灾难：逐面代入六个校准黎曼零点高度的面权，三代十二费米子顶点的归一化期望严格满足

$$
\bigl\langle (QQQL)^3 \bigr\rangle_{\text{weak}} \;>\; 2^{-9472},
$$

且任意更换全部面上的这六个零点编号，相对变化小于 $2.576 \times 10^{-7}$；在纯弱有隙域之上打开色场与超荷的显式正体积邻域后，全标准模型规范链积分的顶点模仍严格大于 **$2^{-9474}$**！同时在一切 $L \ge 2^{22}$ 的大周期盒上均存在光滑纯弱奇指数链（每方格距单位至多 $360464/L^2$，威尔逊作用上界与体积无关）。

::: {.problem #prob-ou-ch07-chiral-selection title="第二问未解边界：三代唯一选择律与无外置标架的四维相互作用手征理论"}
本章在球壳与四维格点上确立了覆盖全部正黎曼零点的五荷三模谱隙（$\lambda_3 < 8.685 < 9.6 < \lambda_4$）、内禀站点方差分界 $T = 9 + (1-\delta)^2$、五步单纯形三物种重叠核（光滑指数 $-3\operatorname{Pf}(C)$）、四标架对数护隙测度，以及非零的 $\Delta B = \Delta L = 3$ 纯弱十二费米子顶点（$> 2^{-9472}$）。但依原书第一性原理标准，仍有三道根本缺口尚未闭合：

1. **三代唯一性**：全零点共享截断的容许低模数为 $\{1, 3, 7, 15\}$，最宽谱隙选出 $1$，循环字符等重仍同时容许 $3$ 与 $15$；尚未由圆弧几何自身唯一排除 $1$ 与 $15$。
2. **分界的动力学起源**：站点方差最小割 $T$ 仅依赖原球壳边权，但在扩充为正负荷双态站点投影时会坍缩或改变荷二计数；为何物理有效理论恰好读取 $T$（或 $9$）仍属模型假设。
3. **非微扰手征测度的内生护盾**：在无外置四份正交基本希格斯标架的纯规范粗糙路径积分中，如何消除 $(I_{\bar{\mathbf{5}}}, I_{\mathbf{10}}) = (2, 7)$ 留下的中心荷 $2 \pmod 5$ 与电磁 Cartan 荷 $-100$，仍待新的四维相互作用格点方案解答。
:::

::: {.film src="three-light-modes"}
**十九点球壳上，五种超荷各自恰有三个轻模（2 分 46 秒）。** 片中沿极点 $(17, 17, 17)$ 俯视十九点球壳及其 $135$ 条边（青色与品红是两类钟边），在 $\delta = 0$ 时现算五种荷 $q \in \{1, 2, -3, -4, 6\}$ 磁拉普拉斯算子的全部本征值：琥珀色点沿钟环面上一条缠绕路径扫过时，三个青色轻模始终低于 $8.685$，其余十六个始终高于 $9.6$；覆盖整张环面与全部正零点的结论标为区间复算证书（NUM）。坐标轮换把画面转 $120^\circ$ 映回自身，特征标 $1, \omega, \omega^2$ 的三块（大小 $7, 6, 6$）各含一个轻模；绿色标签只给 [@thm-ou-ch07-peter-weyl-orthonormal]。共同低模数 $\{1, 3, 7, 15\}$、零点 #8236、#148341 与 #8359 的两步质量读数、五步重叠核的质量窗与指数均标为证书；站点方差分界 $T = 9 + (1-\delta)^2$ 由屏幕上现算的度数普查读出，把 $T$ 读作物理分界与四份希格斯标架护隙标为论证（紫色），第二问的三道缺口 [@prob-ou-ch07-chiral-selection] 以红色标为开放。
:::

现在我们手上已经握住了三代轻费米子的内部舞台与它的全部非微扰裂纹。但只要把三代放进质量与混合的熔炉，一场更剧烈的风暴立刻迎面扑来：保护三代完美等重的 $\mathbb{Z}_3$ 轮换对称，恰恰是夸克混合与质量层级的死敌。这就是下一章要正面剖开的第三问前半程。
