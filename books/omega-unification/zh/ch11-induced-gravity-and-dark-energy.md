# 第十一章 诱导引力、四层热核真空配平与暗能量敏感性 {#sec-ch11-induced-gravity-and-dark-energy}

上一章留下了一个悬念：即便我们允许单纯形雷吉作用作为离散几何的骨架，几何本身也不曾告诉你牛顿常数 $G_N$ 有多大、宇宙学常数 $\Lambda$ 为何落在 $\Lambda G \sim 10^{-122}$ 这根细如发丝的悬崖边缘。物理学家萨哈罗夫（Sakharov）早年提出过一条极具吸引力的思路：**或许引力常数和真空能根本不是裸几何输入，而是所有物质场在弯曲背景上的量子一圈涨落自动“诱导”出来的。**

听起来很美妙，但一旦我们把第二卷已经锁定的三代规范交汇完整重谱放进一圈固有时热核，让算术自己说话，结果会怎样？本章把这把标尺一毫米一毫米地卡紧：先核算仅凭可见重谱会产生多大的牛顿与暗能量缺口，以及它与标定雷吉几何体积尺度的对称困境；再计算如果引入极小耦合隐单态去填补缺口，最少要多少个场、截止漂移到小数点后第几位就会让宇宙学常数翻号；接着构造四层 $(-1, 3, -3, 1)$ 有限正真空配平，看看它如何惊人地逼近 $10^{-122}$、却又怎样在电弱对称破缺的希格斯树势面前骤然撞墙；最后交出第四问的一份诚实总账。

## 11.1 固有时诱导引力与可见重谱的巨大缺口 {#sec-ch11-visible-spectrum-gap}

为了消除一切模糊空间，我们先把一圈固有时（proper-time）诱导引力与四层有限正真空差分的精确数学处方固定下来。

::: {.definition #def-ou-ch11-four-layer-vacuum title="一圈固有时诱导引力、牛顿标定与四层正真空差分"}
记指数积分 $E_j(z) := \int_1^\infty e^{-zt} t^{-j}\,dt$（$j = 1, 2, 3$），取普朗克质量 $M_P = 1.22089\times 10^{19}\,\mathrm{GeV}$ 与无量纲固有时紫外截止 $x := Q^2/M_P^2$，各粒子的无量纲平方质量为 $z_k := m_k^2/M_P^2$。在裸牛顿项与裸宇宙学项均取零的一圈最小曲率耦合处方下，定义平坦真空能量密度 $\rho$、归一牛顿倒数 $K$ 与无量纲视界曲率 $C$ 为

$$
\rho = -\frac{Q^4}{32\pi^2}\sum_k g_k E_3\!\left(\frac{z_k}{x}\right), \qquad K := \frac{G^{-1}}{M_P^2} = \frac{x}{2\pi}\sum_k \alpha_k E_2\!\left(\frac{z_k}{x}\right), \qquad C := \Lambda G = \frac{8\pi\rho/M_P^4}{K^2}.
$$

此处 $g_k$ 为玻色减费米净偏振数；最小耦合牛顿权重 $\alpha_k$ 对实标量、外尔（Weyl）费米子、狄拉克（Dirac）费米子、含鬼无质量规范矢量及有质量普罗卡（Proca）矢量依次取 $1/6, 1/6, 1/3, -2/3, -1/2$。牛顿标定条件记作 $K = 1$，观测目标记作 $c = 10^{-122}$。

给定轻质量标度 $\mu = v^2/M$（$v = 246.22\,\mathrm{GeV}$，$M$ 为重谱质量）与正整数偏振倍数 $D$，**四层正真空差分**在等距平方质量 $(0, \mu^2, 2\mu^2, 3\mu^2)$ 上配置净偏振权重 $D(-1, 3, -3, 1)$。该权重向量唯一（至常数倍）令第 $0, 1, 2$ 阶质量平方矩同时归零，其热迹为 $-D(1 - e^{-at})^3$（$a := \mu^2/M_P^2$），产生处处为正的有限真空读数

$$
V_{\mathrm{4L}} := \frac{8\pi\rho_{\mathrm{4L}}}{M_P^4} = \frac{D a^2}{4\pi}\,I\!\left(\frac{a}{x}\right), \qquad I(y) := \int_y^\infty \frac{(1 - e^{-t})^3}{t^3}\,dt, \qquad I(0) = \frac{9\ln 3 - 12\ln 2}{2}.
$$

:::

先用 [@def-ou-ch11-four-layer-vacuum] 直接检验前几卷已经推出的**可见重谱**本身：取电弱对称原点，计入无质量三代标准模型轻外尔费米子、一个轻希格斯复双重态与 $12$ 个规范矢量（轻层净偏振 $24 + 4 - 90 = -62$），加上五种荷各 $16$ 个重狄拉克多重态（按荷 $1, 4, 2, 3, 6$ 的纯狄拉克单层偏振权依次为 $-24, -12, -12, -8, -4$；其中荷 $3$ 狄拉克双重态与 $16$ 个同质量重复标量双重态的 $+4$ 合并后同质量门槛净权为 $-4$，而 $19$ 双重态变体再多计 $3$ 个重标量双重态）及 $18$ 个中性重矢量层（每层 $12$ 个普罗卡矢量、净偏振 $+36$；$16$ 标量基线合计 $1{,}790$ 个可见实偏振、净偏振 $g = -310$），中心奇质量为 $\kappa h$、中心偶质量为 $R\kappa h$。

按质量由轻到重累加净偏振，为什么可见谱永远逃不脱巨大的正真空能？直觉极其清楚：因为带负权的费米子层总是先于带正权的中性重矢量开启，在全相位顺序统计量包络下，从最轻到最重的每一个完整质量前缀都留有严格负的偏振亏量 $-d$。用有限分部求和配合 $E_3(0) = 1/2$ 立得 $\rho \ge d Q^4/(64\pi^2)$；再以 $E_2 \le 1$ 封住正牛顿项并保留 $12$ 个无质量规范矢量的负贡献（$-8$），即得 $K \le b Q^2/(2\pi)$。只要诱导牛顿常数为正（$K > 0$），无量纲曲率必然服从 $\Lambda G \ge \pi d/(2b^2)$——该界对**所有共同质量单位、全部双钟相位及任意有限四阶矩的正归一截止混合**一致成立（[可见重谱诱导引力证书](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-chiral-induced-gravity-vacuum.py)）：

| 中心偶质量倍率 $R$ | 重标量双重态数 | 全前缀最小偏振亏量 $d$ | $\Lambda G$ 严格下界（任意 $G > 0$） |
| :---: | :---: | :---: | :---: |
| $R \ge 4$ | $16$ | $46$ | $0.0087576$ |
| $R \ge 4$ | $19$ | $34$ | $0.0061971$ |
| $R \ge 16$ | $16$ | $62$ | $0.0118037$ |
| $R \ge 16$ | $19$ | $50$ | $0.0091134$ |

特别地，在三代规范交汇的基准配置（$16$ 重标量、$R = 32$、钟弦 $d = 724$、$\kappa = \bar{M}_P/724^2$）下，任意双钟相位与任意使 $G > 0$ 的截止都有 **$\Lambda G > 0.01180$**，与目标 $10^{-122}$ 相隔至少 $119$ 个数量级！进一步包住 $K/(R\kappa)^2$ 沿正截止轴的唯一极大点，精确证得

$$
\frac{G^{-1}}{M_P^2} < 6.688\times 10^{-6} \quad (\text{19 重标量时 } < 7.369\times 10^{-6}),
$$

连实测普朗克质量平方的百万分之 $6.69$ 都达不到！（作为对照，早期两档矢量状交汇谱的诱导牛顿倒数更是不足观测值的 $1.591\times 10^{-11}$。）

同样巨大的数量级鸿沟也出现在几何一侧。回到[第十章](ch10-regge-gravity-and-spin2.md)带有局部形状界 $\chi_\sigma \ge 1/16$ 的四维连续平方边长雷吉模型，取六个牛顿匹配零点共用的刚度区间 $\lambda \in [30484476, 30484477]$，并以宇宙学体积系数 $L_*$ 将平均四体积锚定在平直参考体积 $V_b = n/\sqrt{5}$。对整体缩放 $q \mapsto s q$ 在 $s = 1$ 求导给出精确的尺度恒等式 $2L_*\mathbb{E}V = M + \xi\lambda\tau\mathbb{E}S$（$M = 15n$ 为边数），配合大偏差下界把 $L_*/\lambda$ 严格夹在 $(1/50, 600)$ 之内。按牛顿标定 $M_P^2 a_{\mathrm{lat}}^2 = 8\pi\lambda$ 恢复物理单位后，裸宇宙学系数满足（[微观体积系数证书](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-cosmological-volume-scale.py)）

$$
\Lambda_{\mathrm{bare}}\ell_P^2 = \frac{L_*}{8\pi\lambda^2} > 2.6\times 10^{-11}.
$$

即便不看裸系数，而是把每张三角面的有符号雷吉曲率逐块求和再按物理体积平均，由同一尺度恒等式 $\xi\tau\mathbb{E}S/(2\mathbb{E}V) = L_*/\lambda - 15\sqrt{5}/(2\lambda)$ 立得：其迹曲率期望在任意网格划分下仍严格满足 $\xi\ell_P^2\langle R/4\rangle_{\mathrm{vol}} > 2.6\times 10^{-11}$（固定平直总体积时，高曲率块以高于 $1 - 2^{-410000n}$ 的概率占据超过 $2^{-31}$ 的块数与体积分数，见[分块曲率证书](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-block-curvature.py)）。无论走纯可见重谱的一圈诱导，还是走标定雷吉体积的直接粗化，都与 $10^{-122}$ 相隔超过一百个数量级。

## 11.2 隐扇区最少实单态计数、固定截止凸障碍与极端紫外敏感性 {#sec-ch11-hidden-singlets-sensitivity}

既然仅靠可见重谱（净偏振总和 $\operatorname{Str} 1 = -310$）缺口太大，最自然的补救便是只向电弱规范中性扇区添加最小耦合的**实规范单态标量**，并问一个纯数学问题：在零点候选 #11661、#11934 与 #12207 的 $16$ 重标量规范谱（$R = 32$、$d = 724$）上，同时匹配 $G^{-1} = M_P^2$ 与 $\Lambda G = 10^{-122}$，最少需要多少份实单态？这种匹配又有多脆弱？

### 11.2.1 最少 $311$ 份实单态与固定截止的严格凸障碍 {#sec-ch11-singlet-counts-convexity}

先看场数下界。若新增最小耦合实单态数不超过 $310$ 份（允许质量各不相同，甚至允许归一化正截止混合），利用 $0 \le E_3(v) - \tfrac{1}{2} + v \le 2v^{3/2}$ 放缩可见质量平方矩，牛顿标定必然强迫 $\Lambda G > 1.5\times 10^{-7}$。一旦达到 **$311$ 份**，等质量单态即可在 $Q/M_P \approx 0.42929$、$M_s/M_P \approx 0.017260$（$u = M_s^2/Q^2 \approx 0.00161647$）同时命中两项目标；但沿牛顿曲线从 $\Lambda G = 0$ 移动到 $\Lambda G = 10^{-122}$，平方质量比 $u$ 只需微调 $\Delta u \in (1.2030, 1.2031)\times 10^{-122}$——彻头彻尾的 $122$ 位精细微调（[最少实单态证书](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-chiral-minimal-neutral-gravity.py)）。

若进一步把紫外截止固定在某个指定值 $x = Q^2/M_P^2$，把可见谱移项即定出隐单态所需的两个热核矩 $S = \sum E_3(u_i)$ 与 $T = \sum E_2(u_i)$。因为 $E_2(u)/E_3(u)$ 严格单调落在 $(1, 2]$ 且映射 $f(t) = E_2(E_3^{-1}(t))$ 严格凸，任何有限隐单态谱存在的前提是 $1 < T/S \le 2$。由此立即把两个最自然的普朗克截止——**$Q = M_P$** 与 **$Q = \bar{M}_P = M_P/\sqrt{8\pi}$**——彻底排除，并精准定出可行窗口内的场数跳升（[固定截止矩条件证书](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-chiral-fixed-cutoff-singlets.py)）：

| 固有时紫外截止 $Q$ | 热核矩比 $T/S$ 或连续下界（#11661 / #11934 / #12207） | 同时匹配 $G_N$ 与 $\Lambda G = 10^{-122}$ 的最少实单态数 |
| --- | --- | :---: |
| $Q = M_P$ | $T/S \approx 0.907722 < 1$ | 无解（任意数目均不可能） |
| $Q = \bar{M}_P = M_P/\sqrt{8\pi}$ | $T/S \approx 6.77698 > 2$ | 无解（任意数目均不可能） |
| $Q = M_P/2$ | 连续下界 $435.33928$ / $435.33952$ / $435.33926$ | **$436$** |
| $Q = M_P/\sqrt{2}$ | 连续下界 $77{,}665.194$ / $77{,}665.679$ / $77{,}665.161$ | **$77{,}666$** |
| 自由优化截止（$Q \approx 0.42929\,M_P$） | $\operatorname{Str} 1_{\mathrm{vis}} = -310$ | **$311$**（等质量可取到） |

### 11.2.2 共用截止反向移动律、$4.22\times 10^{-120}$ 紫外悬崖与三锚格拉姆恒等式 {#sec-ch11-uv-cliff-gram}

现在考察跨零点共享截止与紫外稳定性。若让 #11661、#11934、#12207 共用同一个引力截止（必要条件 $x > 0.18$），按 $12207 \to 11661 \to 11934$ 排序，所需隐矩满足 $\Delta S > 0$（相邻 $x\Delta S > 9.07\times 10^{-8},\; 1.36\times 10^{-6}$）而 $\Delta T < 0$（相邻 $\Delta K_{\mathrm{vis}} > 1.48\times 10^{-8},\; 2.13\times 10^{-7}$）。由于 $E_3$ 与 $E_2$ 同向递减，**至少有两个隐单态必须沿相反方向改变质量**。这一界限是尖锐的：取共同截止 $Q = 3M_P/7$，可以把 $311$ 个单态中的 **$309$ 个固定在共同质量 $Q/32$**，仅调动余下 $2$ 个即可逐枚精确配平。

在电弱真空取第 $2\,306\,888\,100\,085$ 枚正零点及其左右邻点，固定重标量门户强度为 $0.42995401872$，符号由各壳的三循环决定。在 $0<Q^2/M_P^2\leq1$ 内自由选取五个截止位置，一组归一化的有符号权重就能在三处同时满足牛顿项 $K=1$ 和真空项 $W=8\pi\rho/M_P^4=10^{-122}$。用 $b$ 记负权绝对值之和，这个五点解的 $b\simeq1.797\times10^7$。若把代价限制在接近最低值的 $b\leq1\,308\,843.19305$，每组解都必须在六个互不相交的区间中各占一个位置，且有六点解达到这一预算。因此在此预算内，六个截止位置恰为最少。[五点构造](https://github.com/the-omega-institute/trureturing-experiments/blob/7f02423e1c24e735988d534c6b813f672c7304fe/experiments/ch39-omega-research/replay/ch39-three-index-five-cutoffs.py) · [近最优代价下的六点下界](https://github.com/the-omega-institute/trureturing-experiments/blob/7f02423e1c24e735988d534c6b813f672c7304fe/experiments/ch39-omega-research/replay/ch39-cutoff-window-stability.py)

若再要求中心零点满足[第六章](ch06-higgs-portals-and-electroweak-scale.md)的八个端点条件，可在十七个截止位置使用同一组有符号权重匹配三处引力，并使中心的中性动能矩阵与色逆耦合从 $M_Z$ 到交汇能标全程保持正定。能否从壳谱本身得到所需的截止位置与权重？取四个算术 Gram 源及其主舒尔残向量，对总内积非零的两源，把各本征空间内积与总内积之比的实部作为权重。在上述破缺模型与普朗克截止上限下，即使允许任意等距嵌入，要兼顾弱动能匹配和 $K=1$，最高与最低截止能量之比也须大于 $1.30\times10^{13}$。若令每个截止能量满足 $Q_j^2=\kappa\lambda_j$，其中 $\lambda_j$ 是单一荷的十九站原磁拉普拉斯本征值，则模型允许的两钟相位和软边亏额 $0\le\delta\le10^{-8}$ 仅给出 $Q_{\max}/Q_{\min}<32.53$。改变共同标尺 $\kappa$ 无法弥合这段差距。 [十七点构造](https://github.com/the-omega-institute/trureturing-experiments/blob/65a40539edbdd12f8d422ed64953d8ccbfcd72fa/experiments/ch39-omega-research/replay/ch39-three-index-positive-running.py) · [所需能量跨度](https://github.com/the-omega-institute/trureturing-experiments/blob/65a40539edbdd12f8d422ed64953d8ccbfcd72fa/experiments/ch39-omega-research/replay/ch39-rh-shell-necessary-bandwidth.py) · [原壳全相位界](https://github.com/the-omega-institute/trureturing-experiments/blob/65a40539edbdd12f8d422ed64953d8ccbfcd72fa/experiments/ch39-omega-research/replay/ch39-native-clock-independent-bandwidth.py)

在电弱对称原点，取上、下型夸克各一枚中央编号、一枚替代编号，分别重建完整重谱。固定基准零点 $N=2\,306\,888\,100\,085$ 的四个截止及其权重，三支一圈逆耦合在四处都失去精确交汇。用 26 个有理截止共同校准五个背景，每处都可得到 $K=1$、$W=10^{-122}$，并在约 $5.03\times10^{16}\,\mathrm{GeV}$ 交于同一逆耦合 $37.8345$。这组解的负权总量约为 $2.28\times10^{13}$。将它原样用于 $N+1$，牛顿项降至约 $0.99664$，三支再次失去交汇。[五背景区间复算](https://github.com/the-omega-institute/trureturing-experiments/blob/cdc92150bfc596befcc891b76aa955e76823d419/experiments/ch39-omega-research/replay/ch39-five-zero-gravity-gauge-transfer.py)

若让六个重场部门独立取高度，交汇能选出它们的配置吗？按上下型指定两个夸克单态部门，其余部门在两高度间整组取谱，四个候选编号给出 64 种分配，基准四权在每种分配上都失配。若把 $N+1$ 也纳入校准，六个部门各选六个高度，共 $6^6=46\,656$ 种重谱配置，却可用同一组有符号权全部保持上述引力矩与交汇。每个部门在每个高度都有一条可与其他组分开的质量线，由此可证明 96 个响应约束线性无关，至多 96 个有理截止便足够。允许任意普朗克有界截止时，仅要求上型中央与替代编号的两个完整背景共用引力矩，负权总量就须超过 $18\,292.7$。一旦固定归一有符号截止与五个带荷部门，单独改变中性重矢量的高度，能精确交汇的实际零点编号就只有有限多个，即使每次都允许重选交汇能标。这些结论采用零外动量的重场阈值。[六部门书面推导与谱线复算](https://github.com/the-omega-institute/trureturing-experiments/blob/5b691ea04b8f858ec82982935bd665b92e363704/experiments/ch39-omega-research/replay/%E5%85%AD%E4%B8%AA%E5%AE%9E%E9%99%85%E9%9B%B6%E7%82%B9%E6%8C%89%E9%87%8D%E5%9C%BA%E9%83%A8%E9%97%A8%E7%8B%AC%E7%AB%8B%E5%8F%96%E5%80%BC%E6%97%B6%E7%9A%84%E5%85%B1%E5%90%8C%E6%88%AA%E6%AD%A2.md) · [全区间负权下界](https://github.com/the-omega-institute/trureturing-experiments/blob/bb49aa96cb183c74d5539f2caff9d87d395bb23c/experiments/ch39-omega-research/replay/ch39-quark-background-cutoff-cost-floor.py) · [固定截止下的有限性推导](https://github.com/the-omega-institute/trureturing-experiments/blob/8a9ad1cba9db778bcb8505aa70251eac3b10ce02/experiments/ch39-omega-research/replay/%E5%9B%BA%E5%AE%9A%E5%85%B6%E4%BD%99%E9%87%8D%E5%9C%BA%E6%97%B6%E4%BB%BB%E4%B8%80%E5%85%B1%E5%90%8C%E6%88%AA%E6%AD%A2%E5%8F%AA%E5%AE%B9%E8%AE%B8%E6%9C%89%E9%99%90%E5%A4%9A%E4%B8%AA%E4%B8%AD%E6%80%A7%E9%9B%B6%E7%82%B9%E9%AB%98%E5%BA%A6.md)

若直接用基准零点 $N$ 的壳谱给定截止，可将两份十九线谱各除以其最大本征值，以两谱线之积乘共同标尺作截止位置。在上型中央第 $2\,345\,666$ 枚的完整重谱上，对同向与共轭 Gram 乘积实部的任一凸混合，在 $120$ 种无序配方与全部普朗克有界的共同标尺中取最大，都有 $0.05660<\max K<0.05678$，而目标为 $K=1$。唯一最佳配方的两份谱都取荷 $2$ 的第三枢轴，其余 $119$ 种均有 $K<0.05533$。若固定荷 $-3$ 前两个枢轴的实谱权，在谱线乘积与算术平均之间插值，校准插值比例和共同标尺即可在同一中央背景精确达到 $K=1$、$W=10^{-122}$，三支规范耦合在这组参数下仍无共同交点。[双副本谱截止的牛顿界与两项引力匹配](https://github.com/the-omega-institute/trureturing-experiments/blob/ee2feeb7cf3ebbe712a71c1a4f729084e416dbef/experiments/ch39-omega-research/replay/%E4%B8%A4%E4%B8%AA%E7%AE%97%E6%9C%AF%E6%9E%A2%E8%BD%B4%E5%A3%B3%E8%B0%B1%E7%9A%84%E4%B9%98%E7%A7%AF%E6%88%AA%E6%AD%A2%E8%83%BD%E4%BA%A7%E7%94%9F%E5%A4%9A%E5%A4%A7%E7%9A%84%E7%89%9B%E9%A1%BF%E9%A1%B9.md)

在同一中央背景，若要求三支逆耦合在 $10^{16}\,\mathrm{GeV}$ 精确交汇，则任何归一有符号截止测度 $\mu$ 的正部均须满足 $\int x^{-1}\,d\mu^+(x)>12\,755\,720.35$，其中 $x=Q^2/M_P^2$。取荷 $-4$ 第一枢轴与荷 $2$ 第三枢轴的实谱权，对应的 $361$ 个谱线对仍用同一普朗克有界标尺。在局域一圈模型中，先让每对的全部权重只占一个位置，从乘积到算术平均连续插值。要同时达到 $K=1$、$W=10^{-122}$，并使色逆耦合从 $M_Z$ 到普朗克质量始终为正，至少要有四对偏离共同插值。至多三对时色支全程为负，四对各取一个端点、其余 $357$ 对共用一个比例即可达到目标。若进一步要求三支在 $10^{16}\,\mathrm{GeV}$ 有正的共同逆耦合，则全部 $695\,946\,630$ 种四对选法均被排除。要在这个指定能标获得正的共同逆耦合，至少需要五个单位置例外，五个是否足够仍待判定。固定共同标尺 $c=0.007$，让 $357$ 个线对各从十二个插值位置中选一个，其余四对各把原权重分到其中两个位置，按目标校准位置与份额，即可同时满足两个引力矩，并在 $10^{16}\,\mathrm{GeV}$ 处得到约 $37.562781$ 的共同逆耦合，从 $M_Z$ 至交汇处的最低逆耦合约为 $1.546161$。将这些参数原样用于相邻两个零点编号，三支在指定能标处均失去交汇。[指定交汇能标的正权下界](https://github.com/the-omega-institute/trureturing-experiments/blob/45bca5d82a703c19d3556eee9f3db84d37cbd602/experiments/ch39-omega-research/replay/%E5%8F%8C%E5%89%AF%E6%9C%AC%E7%AE%97%E6%9C%AF%E5%A3%B3%E8%B0%B1%E7%9A%84%E5%BD%A2%E5%BC%8F%E4%BA%A4%E6%B1%87%E4%B8%8E%E4%B8%8A%E8%A1%8C%E4%BA%A4%E6%B1%87%E7%9A%84%E6%88%AA%E6%AD%A2%E5%80%92%E6%95%B0%E7%9F%A9.md) · [使色支为正的四端点构造](https://github.com/the-omega-institute/trureturing-experiments/blob/115e8850374d8d0c3595357c3f06769a6e231a17/experiments/ch39-omega-research/replay/%E5%9B%BA%E5%AE%9A%E4%BA%A4%E6%B1%87%E8%83%BD%E6%A0%87%E4%B8%8B%E5%8F%8C%E5%89%AF%E6%9C%AC%E6%88%AA%E6%AD%A2%E7%9A%84%E5%8F%8C%E4%BE%8B%E5%A4%96%E6%8E%92%E9%99%A4.md#%E5%BC%BA%E9%80%86%E8%80%A6%E5%90%88%E4%B8%BA%E6%AD%A3%E6%89%80%E9%9C%80%E7%9A%84%E6%9C%80%E5%B0%91%E4%BE%8B%E5%A4%96%E6%95%B0) · [指定能标的四例外排除](https://github.com/the-omega-institute/trureturing-experiments/blob/5d4881798d7b4e2a9760c6ce48e14d34c3163c5d/experiments/ch39-omega-research/replay/%E5%9B%BA%E5%AE%9A%E4%BA%A4%E6%B1%87%E8%83%BD%E6%A0%87%E4%B8%8B%E5%8F%8C%E5%89%AF%E6%9C%AC%E6%88%AA%E6%AD%A2%E7%9A%84%E5%8F%8C%E4%BE%8B%E5%A4%96%E6%8E%92%E9%99%A4.md#%E6%8C%87%E5%AE%9A%E8%83%BD%E6%A0%87%E7%9A%84%E5%AE%8C%E6%95%B4%E4%BA%A4%E6%B1%87%E8%87%B3%E5%B0%91%E9%9C%80%E8%A6%81%E4%BA%94%E6%9D%A1%E4%BE%8B%E5%A4%96) · [四条线对分权的构造与邻点检验](https://github.com/the-omega-institute/trureturing-experiments/blob/95ebc022cf8943751ec95a4b5b2a6e6f3bbcb64c/experiments/ch39-omega-research/replay/ch39-two-copy-four-split-lines.py)

更换背景时，哪些参数可以共用？取壳编号 $N=2\,306\,888\,100\,085$ 和 $N+1$，重谱分别取第 $2\,345\,666$ 和第 $2\,345\,668$ 枚零点。两组各用本身的壳权和端点。对任意共同标尺 $0<c\le 1$，若对应线对共用插值比例 $t\in[0,1]$ 的概率分布，且两边都精确匹配两个引力矩，则无论各自在 $M_Z$ 至普朗克质量间选哪个能标，至少一边的超荷或弱逆耦合与色逆耦合之差的绝对值都大于 $0.05$。要使这两组都精确匹配两个引力矩并在 $10^{16}\,\mathrm{GeV}$ 实现三支正交汇，分布须随背景改变的线对最少为一个。在 $c=0.007$ 时，按两组目标联合校准全部分布，独立分配的线对恰可取 $(0,0)$ 或 $(17,0)$（从零编号），两者都用荷 $+2$ 部门的最低谱值。其余 $360$ 对逐对共用分布，从 $M_Z$ 到交汇处三支逆耦合均为正。 [全标尺上的共同分布失配界](https://github.com/the-omega-institute/trureturing-experiments/blob/6c801894040bf818d9352da8b6c26a6e2882cc7a/experiments/ch39-omega-research/replay/%E5%9B%BA%E5%AE%9A%E4%BA%A4%E6%B1%87%E8%83%BD%E6%A0%87%E4%B8%8B%E5%8F%8C%E5%89%AF%E6%9C%AC%E6%88%AA%E6%AD%A2%E7%9A%84%E5%8F%8C%E4%BE%8B%E5%A4%96%E6%8E%92%E9%99%A4.md#%E5%85%A8%E6%99%AE%E6%9C%97%E5%85%8B%E6%9C%89%E7%95%8C%E6%A0%87%E5%B0%BA%E4%B8%8A%E7%9A%84%E5%85%B1%E5%90%8C%E5%88%86%E5%B8%83%E6%8E%92%E9%99%A4) · [只需一个谱对独立分配的构造](https://github.com/the-omega-institute/trureturing-experiments/blob/1a3660fa1bb58339c966cbdf49b069bae58b328c/experiments/ch39-omega-research/replay/%E5%9B%BA%E5%AE%9A%E4%BA%A4%E6%B1%87%E8%83%BD%E6%A0%87%E4%B8%8B%E5%8F%8C%E5%89%AF%E6%9C%AC%E6%88%AA%E6%AD%A2%E7%9A%84%E5%8F%8C%E4%BE%8B%E5%A4%96%E6%8E%92%E9%99%A4.md#%E4%B8%A4%E7%BB%84%E4%B9%8B%E9%97%B4%E6%81%B0%E9%A1%BB%E4%B8%80%E6%9D%A1%E8%B0%B1%E7%BA%BF%E7%8B%AC%E7%AB%8B%E5%88%86%E9%85%8D) · [两种可行谱对的完整分类](https://github.com/the-omega-institute/trureturing-experiments/blob/fed433410e84222801f199be3303604358f1bc2f/experiments/ch39-omega-research/replay/%E5%9B%BA%E5%AE%9A%E4%BA%A4%E6%B1%87%E8%83%BD%E6%A0%87%E4%B8%8B%E5%8F%8C%E5%89%AF%E6%9C%AC%E6%88%AA%E6%AD%A2%E7%9A%84%E5%8F%8C%E4%BE%8B%E5%A4%96%E6%8E%92%E9%99%A4.md#%E4%B8%A4%E7%BB%84%E4%B9%8B%E9%97%B4%E6%81%B0%E9%A1%BB%E4%B8%80%E6%9D%A1%E8%B0%B1%E7%BA%BF%E7%8B%AC%E7%AB%8B%E5%88%86%E9%85%8D)

沿壳编号每次加一、重谱编号每次加二的次序加入第三、第四组，仍取 $c=0.007$，至多允许一个线对按背景独立分配，则只有 $(0,0)$ 可行。各组须精确匹配两个引力矩，在同一能标三支交汇，并从 $M_Z$ 至交汇处全程保持正的逆耦合。对每个候选能标联合校准这些背景的分布，可行交汇能标的上确界在三组时落在 $[5.852,6.025]\times10^{15}\,\mathrm{GeV}$，四组时降至 $[5.67,5.79]\times10^{15}\,\mathrm{GeV}$。 [三背景交汇能标的上下界](https://github.com/the-omega-institute/trureturing-experiments/blob/7a0753ac3fced64ca4e754a8f81679c85edbb4d8/experiments/ch39-omega-research/replay/%E4%B8%89%E7%BB%84%E5%AE%9E%E9%99%85%E9%9B%B6%E7%82%B9%E7%9A%84%E5%85%B1%E5%90%8C%E4%BA%A4%E6%B1%87%E4%B8%8E%E5%85%A8%E7%A8%8B%E6%AD%A3%E6%80%A7%E8%83%BD%E6%A0%87.md) · [四背景交汇能标的上下界](https://github.com/the-omega-institute/trureturing-experiments/blob/e7beea87a4407a227f658255c688d934ee351fad/experiments/ch39-omega-research/replay/%E5%9B%BA%E5%AE%9A%E4%BA%A4%E6%B1%87%E8%83%BD%E6%A0%87%E4%B8%8B%E5%8F%8C%E5%89%AF%E6%9C%AC%E6%88%AA%E6%AD%A2%E7%9A%84%E5%8F%8C%E4%BE%8B%E5%A4%96%E6%8E%92%E9%99%A4.md#%E5%9B%9B%E8%83%8C%E6%99%AF%E5%85%B1%E5%90%8C%E4%BA%A4%E6%B1%87%E8%83%BD%E6%A0%87%E7%9A%84%E5%8F%AF%E8%A1%8C%E5%8C%BA%E9%97%B4)

继续按此步长取第五组。若它也用标尺 $0.007$，即使 $361$ 个线对各自任取插值位置分布，只要精确匹配两个引力矩，三支就无法在 $M_Z$ 至普朗克质量间交汇。前四组仍取 $0.007$、仅将第五组降至 $0.006$ 时，要使五组都匹配两个引力矩并在同一能标正交汇，允许按背景独立分配的线对最少为两个。按 $19i+j$ 从零编号，全部 $64\,980$ 种搭配中，恰可取第 $0$ 线配第 $15$、$18$、$285$ 或 $323$ 线。每种搭配联合校准后，五组都精确匹配两个引力矩，并在 $10^7\,\mathrm{GeV}$ 交汇，三支逆耦合从 $M_Z$ 至交汇处全程为正。再按同一步长取第六组的壳权与重谱，即使各线独立选取任意分布，对全部 $0<c\le1$，两个引力矩与三支交汇也无法在这一组同时达到，交汇能标可在 $M_Z$ 至普朗克质量间任取。 [第五组在原标尺的排除](https://github.com/the-omega-institute/trureturing-experiments/blob/78e61556c63b7122a67fad4922cf126be4bb2535/experiments/ch39-omega-research/replay/%E5%9B%BA%E5%AE%9A%E4%BA%A4%E6%B1%87%E8%83%BD%E6%A0%87%E4%B8%8B%E5%8F%8C%E5%89%AF%E6%9C%AC%E6%88%AA%E6%AD%A2%E7%9A%84%E5%8F%8C%E4%BE%8B%E5%A4%96%E6%8E%92%E9%99%A4.md#%E7%AC%AC%E4%BA%94%E7%BB%84%E7%9A%84%E5%85%A8%E7%BA%BF%E8%87%AA%E7%94%B1%E6%8E%92%E9%99%A4) · [五组的四种可行搭配](https://github.com/the-omega-institute/trureturing-experiments/blob/f4767d474bcdcf8bf994855d9c77b82268480c7f/experiments/ch39-omega-research/replay/%E7%AC%AC%E4%BA%94%E7%BB%84%E9%99%8D%E4%BD%8E%E6%A0%87%E5%B0%BA%E5%90%8E%E4%BA%94%E7%BB%84%E5%85%B1%E5%90%8C%E6%AD%A3%E4%BA%A4%E6%B1%87%E6%81%B0%E9%9C%80%E4%B8%A4%E6%9D%A1%E7%8B%AC%E7%AB%8B%E7%BA%BF.md#%E5%93%AA%E5%9B%9B%E7%A7%8D%E7%BA%BF%E5%AF%B9%E5%8F%AF%E8%A1%8C) · [第六组的全标尺排除](https://github.com/the-omega-institute/trureturing-experiments/blob/21ac115968beb5a7397e819c3cc89ad5c587ff04/experiments/ch39-omega-research/replay/%E7%AC%AC%E5%85%AD%E7%BB%84%E5%AE%9E%E9%99%85%E8%83%8C%E6%99%AF%E5%9C%A8%E5%85%A8%E9%83%A8%E6%99%AE%E6%9C%97%E5%85%8B%E6%9C%89%E7%95%8C%E6%A0%87%E5%B0%BA%E4%B8%8A%E6%8E%92%E9%99%A4%E4%BA%A4%E6%B1%87.md)

固定第五壳及在重谱 $2\,345\,698$ 上校准的源布局，能否预报新重谱的交汇能标？保留全部支点，只重选标尺 $0<c\le1$ 和第 $16$、$301$ 线各自两支点间的份额。每个目标可在 $[M_Z,M_P]$ 内独立选择交汇能标。对预先选定的 $20$ 个重谱，一阶预报辨出了全部五个正例。区间验证表明，这五例各有唯一一组参数和交汇能标，另外十五例无解。这里要求两个引力矩精确匹配，三支从 $M_Z$ 至交汇处全程为正。重谱 $2\,346\,002$ 的预报与认证能标分别约为 $7.58482\times10^{15}$ 和 $7.58597\times10^{15}\,\mathrm{GeV}$。在同一第五壳上固定重谱 $2\,345\,712$，若允许第 $16$、$285$、$301$ 线在原支点间调节份额，其余份额仍取源值，则可行交汇能标恰为 $[M_Z,E_{\max}]$，其中 $3.095481\times10^{15}<E_{\max}/\mathrm{GeV}<3.095483\times10^{15}$。每个能标唯一确定标尺与三项份额。要选定其中一个能标，还需独立的选择条件。 [一阶预报与认证读数](https://github.com/the-omega-institute/trureturing-experiments/blob/174f20968b54ec64f7f4cd4559fcad89573afedf/experiments/ch39-omega-research/replay/%E4%B8%A4%E6%9D%A1%E5%8E%9F%E6%9C%89%E8%B0%B1%E7%BA%BF%E4%BB%BD%E9%A2%9D%E5%90%8C%E6%97%B6%E6%81%A2%E5%A4%8D%E5%BC%95%E5%8A%9B%E4%B8%8E%E8%A7%84%E8%8C%83%E4%BA%A4%E6%B1%87.md#%E4%BB%8E%E6%BA%90%E7%82%B9%E7%9A%84%E4%B8%80%E9%98%B6%E5%93%8D%E5%BA%94%E9%A2%84%E6%8A%A5%E5%8F%8C%E7%BA%BF%E6%AD%A3%E4%BA%A4%E6%B1%87) · [双线参数的全域解数](https://github.com/the-omega-institute/trureturing-experiments/blob/1c3eee9f75336164099b2344fa3dd0ac730a36f7/experiments/ch39-omega-research/replay/%E4%B8%A4%E6%9D%A1%E5%8E%9F%E6%9C%89%E8%B0%B1%E7%BA%BF%E4%BB%BD%E9%A2%9D%E5%90%8C%E6%97%B6%E6%81%A2%E5%A4%8D%E5%BC%95%E5%8A%9B%E4%B8%8E%E8%A7%84%E8%8C%83%E4%BA%A4%E6%B1%87.md#%E4%BA%8C%E5%8D%81%E4%B8%AA%E5%89%8D%E5%90%91%E7%9B%AE%E6%A0%87%E5%9C%A8%E5%85%A8%E9%83%A8%E7%89%A9%E7%90%86%E6%A0%87%E5%B0%BA%E4%B8%8E%E4%BB%BD%E9%A2%9D%E4%B8%8A%E7%9A%84%E8%A7%A3%E6%95%B0) · [三线参数的完整可达能区](https://github.com/the-omega-institute/trureturing-experiments/blob/efdb319dcb9c31ff7096c6167b7204cfa1eec888/experiments/ch39-omega-research/replay/%E4%B8%A4%E6%9D%A1%E5%8E%9F%E6%9C%89%E8%B0%B1%E7%BA%BF%E4%BB%BD%E9%A2%9D%E5%90%8C%E6%97%B6%E6%81%A2%E5%A4%8D%E5%BC%95%E5%8A%9B%E4%B8%8E%E8%A7%84%E8%8C%83%E4%BA%A4%E6%B1%87.md#%E5%85%A8%E9%83%A8%E5%8F%AF%E8%BE%BE%E8%83%BD%E5%8C%BA%E4%B8%8E%E6%9C%80%E9%AB%98%E7%82%B9)

若固定 $c=0.007$、中央壳权和 $357$ 个位置，只连续改变重谱高度，则两项端点分权和两项单线位置可随高度连续调整。在高度闭区间 $[1310310.5534,1310311.7259]$ 上（涵盖第 $2\,345\,665$ 至 $2\,345\,667$ 枚零点），这四项调整可保持两个引力矩和 $10^{16}\,\mathrm{GeV}$ 的精确交汇，从 $M_Z$ 到交汇处三支逆耦合均大于 $1.50866$。 [随重谱高度连续调整的解支](https://github.com/the-omega-institute/trureturing-experiments/blob/642e33004e17dd15658a58b0238f78b5f93bdb2b/experiments/ch39-omega-research/replay/%E4%B8%89%E6%9E%9A%E7%9B%B8%E9%82%BB%E9%9B%B6%E7%82%B9%E4%B9%8B%E9%97%B4%E7%9A%84%E8%BF%9E%E7%BB%AD%E6%AD%A3%E4%BA%A4%E6%B1%87%E8%A7%A3%E6%94%AF.md)

保留能级次序，允许相邻层共用截止，能否再匹配真空项？在中心零点 $N=2\,306\,888\,100\,085$，把四个算术源的正交化方向依次放在极点和三条射线首站，由五种荷和三枚枢轴得到十五组固定的实权。区间计算表明，其中恰有四组可以同时达到 $K=1$、$W=10^{-122}$ 和 $A_{T_3T_3}=A_{QT_3}$。取第一枢轴时可用荷 $6,-4$，取第三枢轴时可用荷 $1,-3$。每个可行组至少需要三个不同的截止位置，三个也足够。若所有截止均须达到 $M_Z$，荷 $-4$ 的第一枢轴也被排除。还能用一条函数规定十九层的位置。写 $r=\lambda/\lambda_{\max}$、$x=Q^2/M_P^2$。在普朗克上限内，任取有限个非负实幂的非负线性组合 $x(r)=\sum_k a_k r^{d_k}$，十五组均无法满足三式。荷 $6$ 的第一枢轴若取饱和函数 $x(r)=h+\kappa r^{6000}/(r^{6000}+s)$，则有一组正参数使三式成立，且最低截止约为 $91.90005$ GeV。同一个次数至多三十的实多项式还能把这些读数与[第八章](ch08-flavor-hierarchy-and-ckm.md)的夸克味谱接起来。在荷六上逐层平方振幅给出十九个截止，在上下夸克两荷上先压缩到三代空间再平方，就能同时重现六个质量与完整 CKM。多项式的系数由十九个截止值和两副味矩阵的十二个实坐标确定。 [四组的三位置构造](https://github.com/the-omega-institute/trureturing-experiments/blob/f5d4e07402489ac2ad0b0e4ca7b3ba124b594073/experiments/ch39-omega-research/replay/ch39-ordered-cross-gravity-roots.py) · [幂函数组合的界](https://github.com/the-omega-institute/trureturing-experiments/blob/f921bbbe92f7a5fa4886e7ca7fd49a5751119358/experiments/ch39-omega-research/replay/ch39-positive-polynomial-gravity-pivots.py) · [双对数凸性](https://github.com/the-omega-institute/trureturing-experiments/blob/f921bbbe92f7a5fa4886e7ca7fd49a5751119358/experiments/ch39-omega-research/replay/ch39-log-convex-native-cutoffs.py) · [饱和截止](https://github.com/the-omega-institute/trureturing-experiments/blob/f921bbbe92f7a5fa4886e7ca7fd49a5751119358/experiments/ch39-omega-research/replay/ch39-charge-six-hill-cutoff.py) · [共同振幅的有限插值](https://github.com/the-omega-institute/trureturing-experiments/blob/bcacc2b5931b0931bf20d1a29dbf468cad6c1fa2/experiments/ch39-omega-research/replay/ch39-hill-quark-common-polynomial.py)

若还要求所有零点的截止都低于普朗克质量，第八章的复味空间给出一个有限构造。在中心零点，把荷六的十九个截止 $Q/M_P$ 与两个夸克荷的三十八个正振幅合在一起，记为谱点 $t_i$ 上的读数 $w_i$。这五十七个谱点互异，且 $0<w_i<0.948$。用 $B_i(t)=\prod_{k\ne i}(t-t_k)^2$ 作权，同一个函数 $R(t)=\sum_i w_iB_i(t)/\sum_i B_i(t)$ 逐点重现全部读数，在整个实轴上也保持这个界。因此中心的引力与夸克读数可同时匹配。在本节的破缺背景中固定轻场输入，把同一函数和味空间用于左右两枚相邻零点。所有截止仍低于普朗克质量，但牛顿项 $K$ 分别约为 $-0.48636$ 和 $-0.47095$，均偏离目标 $1$。[公共有理函数与邻点检验](https://github.com/the-omega-institute/trureturing-experiments/blob/b7b39455dda1dc8627e0b92029a57c00f078fa7b/experiments/ch39-omega-research/replay/ch39-unit-common-quark-gravity-response.py)

在 $N$ 与 $N+1$，另选一个共用复三代空间，把两个零点的 $114$ 个互异谱点一起用于校准。这样得到的共同函数在两点都重现六个夸克中心质量和完整 CKM，荷六首枢轴也都给出 $K=1$、$W=10^{-122}$ 和弱差 $D=0$。每个零点的十九个荷六截止都随能级非降。把上下夸克的谱点也放到同一条能量轴上，情形就变了。只要求顶、底汤川耦合满足 $y_t\ge0.8573$、$y_b\le0.01410$ 并匹配上述两项引力读数，任意四站复三代空间和任意三荷共用的非负函数都必须出现回落。存在 $t_i<t_j$，使 $R(t_i)-R(t_j)$ 在 $N$ 超过 $0.013$，在 $N+1$ 超过 $0.050$。这个界允许两点各自重选函数，回落的两层可以不相邻。原因在于，底质量限制了下型末两层中较小的振幅，顶质量又要求上型有一个大振幅。从三个荷的实际能序可知，回落太小就会压低前十六个荷六截止、抬高最后一个，使牛顿项与真空项无法同时匹配。[双零点构造](https://github.com/the-omega-institute/trureturing-experiments/blob/84f57790ba91cf8e373dfa9c31b5e8f28dcdd1e3/experiments/ch39-omega-research/replay/ch39-two-zero-simultaneous-quark-gravity.py) · [三荷合并后的回落界](https://github.com/the-omega-institute/trureturing-experiments/blob/7437dc7590cc15073c6910f156eeaf68c34e76cf/experiments/ch39-omega-research/replay/ch39-common-response-required-drawdown.py)

这两个零点能决定左邻的读数吗？把上述插值公式原样用于左邻，牛顿项约为 $-0.43577$。即使重新选择三代空间，顶汤川耦合也小于 $0.252$，底汤川耦合大于 $0.1584$，两者都在参考窗外。若只固定已校准的 $114$ 个振幅，仍可在 $(M_Z/M_P,0.948)$ 内逐一指定 $N-1$ 的全部 $57$ 个振幅。三个编号的谱点两两互异，每组指定值都有一个分子、分母次数至多 $170$ 的共同有理函数，且函数值在整个实轴都落在同一区间。物理限制来自这些振幅如何进入壳算子。例如在本节的破缺背景和荷六首枢轴下，若左邻的十九个截止在 $[M_Z,M_P]$ 内随能级非降，弱差必有 $D<-0.00027260$。要同时恢复 $K,W,D$ 的目标值，略去持平层后，能序中的升降方向至少改变两次。一次相邻下降就能做到，但这一步只能从第七层到第八层，或从第八层到第九层。两种位置各有一个“升、降、升”的构造。[固定公式在左邻的读数](https://github.com/the-omega-institute/trureturing-experiments/blob/eb5412e17063d45e6121a7cd5dea269543e6d393/experiments/ch39-omega-research/replay/ch39-frozen-pair-left-shell.py) · [有界插值与实际谱点](https://github.com/the-omega-institute/trureturing-experiments/commit/4d158f0411961122484b319aaa12753aeae87a13) · [左邻的保序界与单次下降](https://github.com/the-omega-institute/trureturing-experiments/blob/84f57790ba91cf8e373dfa9c31b5e8f28dcdd1e3/experiments/ch39-omega-research/replay/ch39-adjacent-ordered-charge-six-cutoffs.py) · [转向次数与下降位置](https://github.com/the-omega-institute/trureturing-experiments/blob/679578c68c047c16917fa8df286ca992e1277d99/experiments/ch39-omega-research/replay/ch39-left-cutoff-two-turns.py)

把三枚零点一起校准，则可以选取第八章的两个味空间，让三处共用同一个谱函数，同时给出六个中心质量、完整 CKM 和荷六首枢轴的三项目标。两种空间已是最少。三个编号共有 $171$ 个互异的谱点，所得有理函数次数至多 $170$，且全实轴满足 $M_Z<M_P R(t)<0.999M_P$。若只考察中心或右邻一处，各有一个仅用九个谱点、次数至多十八的共同函数可以达到同样目标。三点的校准值究竟能预测多远？在读出外侧两枚零点以前，固定上文的平方倒距离加权公式来延拓这 $171$ 个值。这个指定函数的分子、分母次数至多 $340$。在未参与校准的 $N-2,N+2$，即使任选四站三代空间，两处各自的六个夸克质量也全部落在各自的 $1\sigma$ 窗外。沿用本节的轻场背景，牛顿项分别约为 $6.039$、$3.675$，目标为 $1$。[三点共用的函数](https://github.com/the-omega-institute/trureturing-experiments/blob/6d5ac0f06e75d0781f1564685f37ad746ace83fb/experiments/ch39-omega-research/replay/ch39-three-shell-two-space-readout.py) · [单点的九峰构造](https://github.com/the-omega-institute/trureturing-experiments/blob/b46823d1855c42499c806996d57d5502eebbcbfd/experiments/ch39-omega-research/replay/ch39-nine-peak-quark-gravity.py) · [预先固定的读数规则](https://github.com/the-omega-institute/trureturing-experiments/commit/c1f49504028e2387903aa45433e9c6c47577649d) · [外侧两点的检验](https://github.com/the-omega-institute/trureturing-experiments/blob/3a7d2c5f95534f43ebee8330568486c9ee016875/experiments/ch39-omega-research/replay/ch39-three-shell-outer-holdout.py)

把平方倒距离改成任意非负、随谱点距离非增的核，能否恢复三个目标？若每壳的十九层共用一个核，将它在各层的权重分别归一，弱差 $D=0$ 就迫使 $N-2$ 的牛顿项 $K>5.177$、$N+2$ 的 $K>6.263$，两处真空项 $W$ 均为负。原因在于，弱差为零要求第十六层的截止低于 $16M_Z$。按同一核给近邻赋权，这又把第十八层的振幅推到 $0.7546$ 以上，而该层在首枢轴带负权。若十九层各自选核，两枚外壳就都能通过校准同时达到 $K=1$、$W=10^{-122}$ 和 $D=0$。第八章给出的顶质量上界在逐层选权时仍然成立。[逐层选权的三项公共解](https://github.com/the-omega-institute/trureturing-experiments/blob/5dc5ad5b477e097bac65fb7b87e4c051ff1e4e68/experiments/ch39-omega-research/replay/ch39-outer-monotone-distance-gravity.py) · [共同距离核的严格界](https://github.com/the-omega-institute/trureturing-experiments/blob/3481af527b4973f842fc3a78dc468300da93d89b/experiments/ch39-omega-research/replay/ch39-outer-shared-distance-kernel.py)

把五枚零点全部用于校准则有一个明确的构造。第八章的三个味空间配合一条共同实有理函数，可在五处同时重现六个夸克中心质量、完整 CKM 和荷六首枢轴的三项目标。五壳三荷共有 $285$ 个互异谱点，有界插值给出的函数次数至多 $284$，且在全实轴满足 $M_Z/M_P<R(t)<1$。壳本身的本征矢能否给出跨零点的权重？用极点的十八条辐边对齐相邻两壳的站位相位。在辐边相位均为一的规范下，从两侧各自最近的训练壳出发，按相邻两壳本征线的重叠模平方 $|\langle u_j(b),u_i(a)\rangle|^2$ 输运振幅，走第二步时直接使用第一步的输出。这条预先固定的规则在 $N\pm2,N\pm3$ 均给出 $K>1$、$W<0$、$D<0$。四处的上夸克和奇夸克汤川耦合也都高于各自的 $1\sigma$ 窗，即使每处重选四站复三代空间。 [五壳联合构造](https://github.com/the-omega-institute/trureturing-experiments/blob/e92b1976421a840dd7b77a7350ac79b3d9510417/experiments/ch39-omega-research/replay/ch39-five-shell-joint-response.py) · [预先固定的输运](https://github.com/the-omega-institute/trureturing-experiments/commit/b31b4bde7860746fe91ee433358e34cb4a2b61f7) · [四枚外壳检验](https://github.com/the-omega-institute/trureturing-experiments/commit/109334e678cae1fd1d1610de6200dfa51b2dfa97) · [极点辐边与换规不变性](https://github.com/the-omega-institute/trureturing-experiments/blob/7eac0ef59ef7a2cf6f186b5217a89476b7d3cc87/experiments/ch39-omega-research/replay/ch39-pole-gauge-covariant-transport.py)

跨壳输运至少要怎样改变极点态，才能让弱差 $D$ 为零？冻结同侧内邻的十九个荷六振幅，将极点态输运一次。从 $N-1$ 到 $N-2$，落到其余十八站的总概率必须超过 $3.4318\%$，从 $N+1$ 到 $N+2$ 则必须超过 $0.3329\%$。弱差为零要求外壳第十六层的截止低于 $16M_Z$。源壳的极点态在高截止子空间中有较大分量，要把它与外壳这个低截止方向分开，几何上至少需要上述转移概率。允许站间混合后，两条边各自都能通过校准达到三个荷六目标。若其余站严格保持恒等，左侧一步最少恰需五站参与输运，右侧恰需三站。左壳必须抑制四条源高层在目的第十六层的重叠，右壳只有两条。左侧可取极点 14、站 6 和完整的三站轨道 $(11,12,18)$，右侧可取极点 14 与站 6、7。若允许块外各站独立改变相位，两侧都只需混合极点 14 与站 17，两站已是最少。[极点概率的下界](https://github.com/the-omega-institute/trureturing-experiments/blob/5e40904e08d85c3d7a55c6f461cc959afd0c0f0d/experiments/ch39-omega-research/replay/ch39-weak-match-required-pole-motion.py) · [荷六的三项匹配](https://github.com/the-omega-institute/trureturing-experiments/blob/6ff0834e3e9939395e4036c853ce507cac4c6dce/experiments/ch39-omega-research/replay/ch39-schur-horn-gravity-holdout.py) · [右侧一步的最小站数](https://github.com/the-omega-institute/trureturing-experiments/blob/8968ea0ea79b5c4d849a9bda138b4bbe4d4792b8/experiments/ch39-omega-research/replay/ch39-minimal-support-right-gravity.py) · [左侧一步的最小站数](https://github.com/the-omega-institute/trureturing-experiments/blob/1080ab3e118923d46967ea74b7f3b649d1e8c300/experiments/ch39-omega-research/replay/ch39-minimal-support-left-gravity.py)

能把上述右侧荷六输运直接用于味谱吗？一组校准混合三站，另一组混合两站并改变另外四站的相位。两组校准各自容许参数在一个经过验证的小区间盒内变化。对于盒内每个荷六输运 $G$，取遍满足 $X^3=G$ 的酉矩阵，上型输运 $X^{-2}$ 给出的最轻上夸克仍高于参考窗。要兼顾两类读数，荷六输运也须重新选取。[两组荷六校准的全部立方根](https://github.com/the-omega-institute/trureturing-experiments/blob/7699969d96390d24f43dfe9ec0320dc7a70e55a9/experiments/ch39-omega-research/replay/ch39-local-gravity-cube-root-flavor.py)

同一个生成元能同时容纳夸克质量、混合和引力吗？在右侧相邻零点 $N+1\to N+2$，固定内壳的谱振幅。区间计算给出一个按目标校准的十九维酉矩阵 $X$。在四个站位的同一三维子空间上，$X^{-2}$ 和 $X$ 分别给出上型和下型的三个汤川耦合，六个值都精确达到参考中心。两组质量本征方向之间的九个混合概率 $|V_{ij}|^2$ 也同时达到四个 CKM 中心参数所确定的值，带符号的 CP 不变量为 $J\approx+3.2063\times10^{-5}$。同一个 $X$ 的三次幂在荷六首枢轴给出牛顿项 $K=1$、真空项 $W=10^{-122}$ 和弱差 $D=0$。[共同生成元的区间证书](https://github.com/the-omega-institute/trureturing-experiments/blob/69b731c6fb84e103eba8db36a0c0a971060719cb/experiments/ch39-omega-research/replay/ch39-one-generator-gravity-full-ckm.py)

下一枚零点检验了跨壳输运需要保留多少信息。若只传递 $N+2$ 的十九个上型振幅，即使重选输运和四站三维子空间，$N+3$ 的最轻上型汤川耦合也超过 $7.1789\times10^{-6}$，高于参考窗上端 $6.29\times10^{-6}$。在中间壳的能量本征基中，把所有非对角元乘以同一个数 $r$，就能连续调节传给下一壳的相干程度。重选下一步酉输运和三维子空间时，同时恢复上、粲、顶三个精确中心所需的最小 $r$ 介于 $86.2503\%$ 与 $86.2505\%$ 之间。完全保留相干时，可为第二步校准一个新的酉生成元 $Y$。在 $N+3$ 的同一个新三代空间上，$Y^{-2}X^{-2}$ 和 $YX$ 再次给出六个夸克质量中心与完整 CKM，$Y^3X^3$ 也再次给出 $K=1,\ W=10^{-122},\ D=0$。两步必须不对易。若 $XY=YX$，即使重选三代空间并调节 $r$，最轻的上型夸克也无法入窗。[下一零点的最优界](https://github.com/the-omega-institute/trureturing-experiments/blob/34e38ac4a8cf8c2edf6ce6427a6b4f7d0c26acf7/experiments/ch39-omega-research/replay/ch39-next-shell-arbitrary-up-transport-floor.py) · [三质量共同阈值](https://github.com/the-omega-institute/trureturing-experiments/blob/b47e7d24871c1abe1227ed439115ebf847892e2f/experiments/ch39-omega-research/replay/ch39-next-shell-three-up-coherence.py) · [两壳连续联合解](https://github.com/the-omega-institute/trureturing-experiments/blob/748a3679972c6dd13874a94dd10a4f939350b6e5/experiments/ch39-omega-research/replay/ch39-next-common-ckm-gravity.py) · [两步不对易的必要界](https://github.com/the-omega-institute/trureturing-experiments/blob/b5a3d039c51408e3e266c611118d6153293ce1a3/experiments/ch39-omega-research/replay/ch39-next-shell-commuting-flavor.py)

再向前一步到 $N+4$，奇夸克对第三步提出了更具体的要求。固定上述校准的 $X,Y$，若第三步保持三循环作用下的七维不变空间，即使任意混合其余十二维并重选四站内的三代空间，奇夸克汤川耦合的可达最小值仍约为 $0.000276229$，高于参考窗上端 $0.000271$。允许两侧各自作酉变换后，只需选一对方向，在两个空间之间转过约 $0.365$ 度，便可在同一个三代空间上同时达到下、奇、底三个参考中心。[第四壳奇夸克耦合的最优下界](https://github.com/the-omega-institute/trureturing-experiments/blob/df584d59ba6423089586563f2c13210b99162f94/experiments/ch39-omega-research/replay/ch39-fourth-shell-strange-invariant-minimum.py) · [一对方向的跨空间旋转](https://github.com/the-omega-institute/trureturing-experiments/blob/df584d59ba6423089586563f2c13210b99162f94/experiments/ch39-omega-research/replay/ch39-fourth-shell-small-down-leakage.py)

若用第四壳的目标校准第三步生成元 $Z$，它的三个幂可以在这一壳上同时给出六个夸克汤川耦合中心、完整 CKM 和荷六的 $K=1,\ W=10^{-122},\ D=0$。这样，三个连续输出壳共用同一组源振幅，每一步的生成元各自按目标选取。在下一壳 $N+5$ 原样沿用 $Z$，即使重选三代空间，上、下、奇三个耦合仍高于各自参考窗，荷六三项也都偏离目标。[三壳联合解](https://github.com/the-omega-institute/trureturing-experiments/blob/3b0437d13d8564d4b880b2b21208fd21c3aa4eb7/experiments/ch39-omega-research/replay/ch39-fourth-full-ckm-gravity.py) · [下一壳的独立检验](https://github.com/the-omega-institute/trureturing-experiments/blob/0324ecfbc7e8fcce26e4fa4baeec58e7187b9434/experiments/ch39-omega-research/replay/ch39-fifth-repeated-generator-holdout.py)

在破缺背景的一圈模型中，完整的中性规范交汇要求光子和混合中性流相对于色项的两个残差以及弱差 $D$ 同时为零。第四壳的算术枢轴决定十九层如何加权。若保留第一枚枢轴的权重，只要牛顿项 $K=1$ 且 $D(M)=0$，其余两个残差在任何比较能标 $M\ge M_Z$ 都无法同时归零，即使允许在每个能标重新选择荷六源谱的酉输运。在原能标 $1.176397\times10^{14}$ GeV，第二枚枢轴也无法同时满足两条引力条件和三条规范等式。[首枢轴的低能界](https://github.com/the-omega-institute/trureturing-experiments/blob/1d5ca53fc124d780bd16794b4bc10e8822698bfb/experiments/ch39-omega-research/replay/ch39-fourth-low-scale-neutral-gauge.py) · [中能界](https://github.com/the-omega-institute/trureturing-experiments/blob/1d5ca53fc124d780bd16794b4bc10e8822698bfb/experiments/ch39-omega-research/replay/ch39-fourth-variable-scale-neutral-gauge.py) · [高能界](https://github.com/the-omega-institute/trureturing-experiments/blob/1d5ca53fc124d780bd16794b4bc10e8822698bfb/experiments/ch39-omega-research/replay/ch39-fourth-high-scale-neutral-gauge.py) · [第二枢轴的排除](https://github.com/the-omega-institute/trureturing-experiments/blob/1d5ca53fc124d780bd16794b4bc10e8822698bfb/experiments/ch39-omega-research/replay/ch39-fourth-second-pivot-obstruction.py)

第三枚枢轴容许夸克、引力与中性规范交汇共用同一个第三步生成元 $Z$。固定前两步 $X,Y$，令 $(Z^2)^*$ 作用于上型夸克源，$Z$ 作用于下型夸克源，$Z^3$ 产生荷六截止。在第四壳的同一个三代空间中，前两者同时给出六个汤川耦合中心和完整 CKM。由同一个 $Z$ 产生的截止则在该能标同时给出 $K=1$、$W=10^{-122}$ 和三条中性规范等式。这个 $Z$ 由第四壳目标校准。按预先登记的规则在第五壳原样复用它，并在第五壳自身的第三枢轴读数，任选四站三代空间，上、粲、下、奇四个耦合均落在参考窗外，荷六五项也各自偏离目标。恢复粲夸克质量窗要求新一步与 $Z$ 的射影算子距离超过 $0.0474$。若按第五壳的目标重选第四步和三代空间，只有第三枢轴允许荷六五项同时成立。在这个枢轴上，同一第四步的三个幂又能同时给出六个夸克中心、完整带号 CKM 和荷六五项。两枚相邻壳都容许联合解，选取下一步仍用到了该壳的目标数据。[同一生成元的联合解](https://github.com/the-omega-institute/trureturing-experiments/blob/b560e6f5301977c97fc00ec844d8bf5ddc613710/experiments/ch39-omega-research/replay/ch39-fourth-third-pivot-joint.py) · [第五壳的预登记检验](https://github.com/the-omega-institute/trureturing-experiments/blob/0ae577b586710133845869e87dc7385fe7fd0811/experiments/ch39-omega-research/replay/ch39-fifth-repeated-third-joint-holdout.py) · [恢复味谱所需的最小位移界](https://github.com/the-omega-institute/trureturing-experiments/blob/89a423ca87257a826dbff74e2b9f7785193de6bf/experiments/ch39-omega-research/replay/ch39-fifth-quark-distance-integers.py) · [第五壳可行的枢轴](https://github.com/the-omega-institute/trureturing-experiments/blob/f1d3a8269176fcc408237e85a7ceff3ea5920263/experiments/ch39-omega-research/replay/第五壳任意新酉输运的三个实际枢轴与荷六五式.md) · [第五壳的同一第四步](https://github.com/the-omega-institute/trureturing-experiments/blob/1e4af9e43076e0bc3271dfc7a304baf46bcd6b6e/experiments/ch39-omega-research/replay/ch39-fifth-third-pivot-joint.py)

在原匹配能标，先要求同一荷六输运同时满足两条引力条件和三条规范等式，再要求色动能与中性动能矩阵从 $M_Z$ 到交汇点始终为正。两次筛选得到的原生枢轴如下。

| 球壳 | 满足五个端点条件 | 同时保持全程正动能 |
| --- | --- | --- |
| 第四壳 | 第三枚 | 无 |
| 第五壳 | 第三枚 | 第三枚 |
| 第六壳 | 第三枚 | 无 |
| 第七壳、第八壳 | 第二、三枚 | 第三枚 |

第五壳第三枢轴上，一组按本壳目标选定的酉输运可以同时给出夸克味、引力和规范耦合的读数。同一个第四步在共同的三代空间上给出六个夸克耦合中心与完整 CKM 矩阵，包括 CP 符号。它在荷六部门产生的十九个截止逐项等于一组已验证的全程正解，仅第 3、4、15 层取高截止。因此两条引力条件与三条规范端点等式均成立，色与中性规范动能在从 $M_Z$ 到 $M_0$ 的整个区间保持正定。即使把第五壳的味读数和十九个截止都固定，仍可连续改变这个第四步，使第六壳最低谱层读出的荷六截止随之改变。第六壳的端点解还允许按本壳目标校准同一酉生成元，在共同三代空间中给出六个夸克耦合中心和完整带号 CKM。其沿程障碍却适用于所有酉输运。两条引力条件迫使至少一个正权层的截止平方比超过 $0.0006$。若三条规范等式也成立，五个中间探测能标中至少一处的色逆耦合或电磁动能系数低于 $-0.1968$。[第五壳完整联合解的区间复算](https://github.com/the-omega-institute/trureturing-experiments/commit/e4f4104428fc1bf6de8e33f54c75617f3c4c7098) · [第五壳五式与全程正动能的共同解](https://github.com/the-omega-institute/trureturing-experiments/blob/64400ac233d0c256cbac32b5908b1243955178be/experiments/ch39-omega-research/replay/ch39-fifth-third-pivot-three-high-positive.py) · [同一生成元的味与端点联合解](https://github.com/the-omega-institute/trureturing-experiments/blob/8885f5305838b5a8eac9e88bee0bc0112fe1c9d4/experiments/ch39-omega-research/replay/ch39-sixth-third-pivot-joint.py) · [第六壳的沿程动能排除](https://github.com/the-omega-institute/trureturing-experiments/blob/48cd9ee34e0193ce613b85e011fed81d3f7561c3/experiments/ch39-omega-research/replay/ch39-sixth-third-pivot-global-kinetic-obstruction.py) · [第五壳联合解不能唯一决定下一壳读数](https://github.com/the-omega-institute/trureturing-experiments/commit/8d62ab075b15b1f08f3284d5db2cb9810de0ab51)

由第四、第五壳预先指定第三枚为第六壳唯一的端点枢轴，这项预测命中。对第七壳，预先登记的预测仍是只有第三枚满足端点五式，并进一步预测全程可行集为空。第二枚的端点解推翻了第一项预测，第三枚的全程正解推翻了第二项。第二枚若满足端点条件，至少一处中间能标会出现负动能。 [第六壳的预登记](https://github.com/the-omega-institute/trureturing-experiments/commit/49234c9a7a59625294d459816a2aee47c4f96ebf) · [留出壳三枚枢轴的检验](https://github.com/the-omega-institute/trureturing-experiments/blob/fb2f640316317de469b6f0c0b98ad1b0ba35840b/experiments/ch39-omega-research/replay/ch39-sixth-pivot-holdout.py) · [第七壳预登记](https://github.com/the-omega-institute/trureturing-experiments/commit/c1acdcac9f76390dd375e03caf984999a49bcd45) · [第一枢轴排除](https://github.com/the-omega-institute/trureturing-experiments/blob/942fa1e99f2574538e4ffe03ae7bb33378aba123/experiments/ch39-omega-research/replay/ch39-seventh-first-pivot-obstruction.py) · [第二枢轴端点解](https://github.com/the-omega-institute/trureturing-experiments/blob/ba78b20d125aa4553a85197884705a7601688b1f/experiments/ch39-omega-research/replay/ch39-seventh-second-pivot-endpoint.py) · [第三枢轴全程正解](https://github.com/the-omega-institute/trureturing-experiments/blob/f8d5691e28a3d27be9ba2049c8a42c796ecb916b/experiments/ch39-omega-research/replay/ch39-seventh-third-pivot-positive-path.py) · [第二枢轴的沿程排除](https://github.com/the-omega-institute/trureturing-experiments/blob/c8dab2d17dffe07850c7595444824ffe19d9a2c7/experiments/ch39-omega-research/replay/ch39-seventh-second-pivot-global-kinetic.py)

第八壳提供了对另一项预测的检验。取绝对值最大的三个谱权，连同其余正权之和与负权之和，可对固定能标的色逆耦合给出上界。在读取第八壳前，已登记这一判据将排除第一、第二枚枢轴的全程正色动能，并对第三枚不给出排除。三项符号均命中。在三个规范端点等式成立时，前两枚在 $5.6\times10^5\,\mathrm{GeV}$ 的色逆耦合分别低于 $-4.44$ 和 $-1.01$。第三枚由独立的五式全程正解确认。 [事前登记](https://github.com/the-omega-institute/trureturing-experiments/commit/0032eab2b9579c045a830ac7d2560c81a26209f2) · [三个谱指标的检验](https://github.com/the-omega-institute/trureturing-experiments/commit/d2bf1bcbad939f5e5e1e8520567ac01401c15931) · [第一、第二枢轴的端点分类](https://github.com/the-omega-institute/trureturing-experiments/commit/ce44cfcca620e0594b0258bd7e74290e92d77065) · [第三枢轴的全程正解](https://github.com/the-omega-institute/trureturing-experiments/commit/28ecbe3d8a103fdfe9127984624ae5b5c9bea216)

贝伦德球壳的极小圆弧给出了移动这些读出位置的几何尺度。第八壳使用的十九个站位满足球壳方程 $\|A\|^2=867$。逐对比较，恰有三条最短弦，平方弦长均为 12，三个原生读出锚各占一条弦的一个端点。由弦中点公式，三条弧的半角读数都是 $\kappa=1-12/(4\times867)=288/289$。从球面位置读出量子态还需指定对应规则。让球面弧和站位态的最短射影弧走过各自总角度的相同比例，第一枢轴沿整段均被排除。在球面弧长的四分之三处，第二枢轴有一组解满足三个规范端点，且在 $5.6\times10^5\,\mathrm{GeV}$ 取色逆耦合 $A_c=2$。其两个引力读数均偏离目标。 [最短弦、相干读出与区间复算](https://github.com/the-omega-institute/trureturing-experiments/blob/4723d6fe116ef727bd733cf8b70998a77eb06498/experiments/ch39-omega-research/replay/%E7%AC%AC%E5%85%AB%E5%A3%B3%E4%B8%89%E6%9D%A1%E8%B4%9D%E4%BC%A6%E5%BE%B7%E6%9C%80%E7%9F%AD%E5%BC%A7%E4%B8%8A%E7%9A%84%E6%9E%A2%E8%BD%B4%E6%94%AF%E6%92%91%E5%88%A4%E6%8D%AE.md) · [弧内的正色见证](https://github.com/the-omega-institute/trureturing-experiments/commit/01f3003dbd10efd0ee86ff271bc775bad3df5f36) · [同一球面点的两种读出](https://github.com/the-omega-institute/trureturing-experiments/commit/9da358bb84e952ea2bdc1c95d41f1a08b6bc8160)

在保持两端弦距比的读出下，球面弧的归一半角参数和站位态的半角参数能在内点同时取有理数，当且仅当 $2\kappa$ 是有理数的平方。对十九个站位的 171 对逐一做整数开方检验，恰好选出这三条最短弧，均有 $2\kappa=(24/17)^2$。在平方半径为 1083 的另一只十九点完整非负整数壳中，171 对均未通过。整体缩放保持这个判据。取第一条极小弧上的有理点 $P=(4195,1969,1969)/171$，其余两条弧取坐标轮换。这个点到两端的平方弦距之比为 $289/32$。让站位态到两端态的弦距保持同一比例，得到有理混合系数 $(168/457,425/457)$。在第八壳第二枢轴，三个规范端点可同时成立，且 $A_c(560000\,\mathrm{GeV})=2$。若令两条弧的半角正切各除以其终点值，再令所得比值相等，同一球面点给出 $(7/25,24/25)$，任何满足三个端点的解在该能标都满足 $A_c\le-2.834355$。[有理弦距与两种色读数](https://github.com/the-omega-institute/trureturing-experiments/commit/fce425eb473367d4501a817b19b328b4ac4fcf40) · [两个十九点完整整数壳的逐对检验](https://github.com/the-omega-institute/trureturing-experiments/commit/e07c10f1599065a1be8b2bcd79c36b43ee232e94)

同一路径可用有理参数取点。令 $t=v/(1+u)$，其中 $(u,v)$ 是两个站位态的实混合系数。在 $t=1/2,2/3,3/4$ 三处，第八壳第二枢轴的排除指标依次为正、负、正。对第九壳事前登记了相同的三个符号，实际得到正、负、负。最后一项推翻了这次外推，两壳使用的最短弦及读出系数完全相同。在最后一项，保留第八壳谱权、换用第九壳的响应表，指标仍为正。改用第九壳谱权，两张表都给出负值。沿用第九壳响应，只用第十壳零点高度更新平方弦长 804 的边相位，在同一有理点事前算得指标约为 $-0.976631$。第十壳完整读数为 $-0.972117$，绝对误差小于 $0.004514$。第十三壳提供了单时钟的反号例。 [有理读出](https://github.com/the-omega-institute/trureturing-experiments/commit/ce031f5833b86e36e5cebbb93531c65dd70be663) · [第九壳事前登记](https://github.com/the-omega-institute/trureturing-experiments/commit/1b6f430f916c454a4abecbcbbd733ef066af04ed) · [第九壳检验](https://github.com/the-omega-institute/trureturing-experiments/commit/6ce69d61ea42747b3c259675f4bbd623c94202b3) · [交换两壳谱权与响应表的检验](https://github.com/the-omega-institute/trureturing-experiments/commit/554ee1a90928600e02a8a15e515046cd3cdec6a5) · [第十壳事前数值与完整读数](https://github.com/the-omega-institute/trureturing-experiments/commit/1f082d752f748d29e86c7c4ae57497685a7e1259) · [同一规则的三次事前检验](https://github.com/the-omega-institute/trureturing-experiments/commit/60a53a6f2241951f0d5b85b0c5f330b3ad73c8a4)

取随后十二对互不重叠的相邻壳，从第 22 壳到第 23 壳，依此至第 44 壳到第 45 壳。三种规则都在相同的十二个目标上预测 $t=3/4$ 处的排除指标。三十六个预测区间全部公开后，才计算目标壳的完整读数。

| 从起始壳传递到目标壳的规则 | 符号命中 | 绝对误差小于 $0.15$ | 平均绝对误差（约） |
| --- | ---: | ---: | ---: |
| 沿用起始壳的指标 | 11/12 | 9/12 | 0.142138 |
| 按目标零点高度更新 804 边相位 | 9/12 | 6/12 | 0.350883 |
| 按目标零点高度更新 724 和 804 边相位 | 12/12 | 12/12 | 0.012186 |

[揭晓前公布的预测区间](https://github.com/the-omega-institute/trureturing-experiments/commit/39046f22b01b15f1ad05c0d865b558bb8c1388aa) · [十二个目标的完整读数与误差](https://github.com/the-omega-institute/trureturing-experiments/commit/d038de2c1c910714ab11113890760f0b7149f1ae) · [此前的六目标比较](https://github.com/the-omega-institute/trureturing-experiments/commit/7406722aae1519068b30a8920ea79f29ce0b49a4)

第五、第七壳都能在第三枚枢轴保持全程正动能。取第五壳任一满足端点五式且全程正动能的解。按原生谱的层号逐层比较，只要第七壳的第三枚枢轴满足真空条件，十九层中至少有一层的截止能量就须改变超过 $0.04M_P$。仅改变读数所用的谱基也无法实现这一步。若保留第五壳的同一个荷六正算子，允许任意非对角相干项，在第七壳谱基中读出的真空项仍小于 $-0.09689$，而目标为 $10^{-122}$。 [跨壳截止的必要变化](https://github.com/the-omega-institute/trureturing-experiments/blob/9844531a0f60d08236c33406b2a1be2d4bd12f81/experiments/ch39-omega-research/replay/ch39-fifth-seventh-cutoff-separation.py) · [同一正算子在两套谱基下的界](https://github.com/the-omega-institute/trureturing-experiments/blob/22834e1e734aa960f2c8a1c7179fd8b44d847322/experiments/ch39-omega-research/replay/ch39-fifth-seventh-common-positive-operator.py)

固定上文第五壳同时满足夸克、引力与规范条件的荷六算子。将三条最短弦分别从靠近极点的一端定向到远端，只在每条弦的两个端点之间混合站位态，其余站位保持不动。三条边共用一个实旋转角时，没有一个角度能同时达到第七壳第三枢轴的牛顿项和真空项目标。若实角可分别选择，恰需三条边。任取两条边，真空项始终低于 $-0.49$。 [同角排除与三边见证](https://github.com/the-omega-institute/trureturing-experiments/commit/5e8dc9a66c7abc8ce9b3c3d86bd293a7dedbd1bd) · [实旋转所需的最少边数](https://github.com/the-omega-institute/trureturing-experiments/commit/16abaa730477be996bc2a355bc26524cc4bd62b0)

若引入复相位，在三条定向弦上各施用一次同一二阶酉矩阵，也能同时达到第七壳的两个目标。这个矩阵和前述三个实角都按第七壳目标校准。仍取同一第五壳算子，在第八壳原生第三枢轴读出，让平方弦长相同的边共用一个门，其余站位不动。只用平方弦长为 12 的三条最短弦，任意共同酉矩阵都无法同时达到两项目标。再加入下一组三条平方弦长为 32 的弦，六条弦的端点互不重合，两组各按第八壳目标校准一个相位，即可精确达到 $K=1$ 和 $W=10^{-122}$，因此所需的最小平方弦长上限为 32。[第七壳的共同复门](https://github.com/the-omega-institute/trureturing-experiments/commit/dc8cd6b9d28eddf8fd30af6ccb62a2f8f72b9933) · [三条最短弦上的酉矩阵排除](https://github.com/the-omega-institute/trureturing-experiments/commit/0a913f06108fd4f9d96bfb1e259bd234da0cf482) · [第八壳所需的最小弦长范围](https://github.com/the-omega-institute/trureturing-experiments/commit/e51c507ce5926642e4e8d6f45663dc7486e23543)

从同一第五壳算子出发，把平方弦长不超过 52 的十二条边排成固定的四轮，每条边只施门一次，同长度的边共用一个门。两组不同的门角都能使第七、八壳各自的原生第三枢轴同时达到牛顿项和真空项的目标。第一组参数封存后，事前登记的外推是第九壳原生第三枢轴也能达标。实际读出的牛顿项为正、真空项为负，两项均失配。揭晓后构造的第二组参数在第九壳给出负的牛顿项和正的真空项。即使初态与门序固定，前两壳的四个等式也不能决定下一壳任一项的符号。[第九壳的事前登记](https://github.com/the-omega-institute/trureturing-experiments/commit/9364ec5e998a86ba03b38fd2323c67917fb4e0b8) · [第一组门角的留出读数](https://github.com/the-omega-institute/trureturing-experiments/commit/5591436b583cc992901157bfe900f1e04952903e) · [同一门序下的反例](https://github.com/the-omega-institute/trureturing-experiments/commit/79d86bab1ce5823dd6808407f631b512c983b4da)

保持同一组十二条有向短弦和四轮门顺序，七个门角独立变化时仍能精确保持六个引力目标中的五个。在两个校准中心附近，七个自由角各可向两侧变化 $10^{-6}$ 弧度。每个七角参数点在指定五角盒内都有唯一的调整，使第七、八壳各自的两项目标都成立。第一族还给出 $K_9=1$，活动五角的半宽为 $6\times10^{-5}$ 弧度。第二族给出 $W_9=10^{-122}$，半宽为 $5\times10^{-5}$ 弧度。在各自的整块十二维盒内，余下读数与目标的差分别满足
$$
-0.010113<W_9-10^{-122}<-0.010064,\qquad
-0.203912<K_9-1<-0.202978 .
$$
第一个区间属于第一族，第二个区间属于第二族。细分五个活动角后，区间计算在七个自由角的全部取值上验证了预条件五式映射在活动盒内为压缩映射。两盒之外能否同时实现六个目标仍待判定。 [五式校准族](https://github.com/the-omega-institute/trureturing-experiments/blob/d89fba8472ea34aed3e657fa3238f1a4065bb368/experiments/ch39-omega-research/replay/ch39-three-shell-radius52-five-families.md) · [区间证书](https://github.com/the-omega-institute/trureturing-experiments/blob/d89fba8472ea34aed3e657fa3238f1a4065bb368/experiments/ch39-omega-research/replay/ch39-three-shell-radius52-five-families.py)

只改变两轮 52 弦门的相对符号，三壳的六个目标就能同时实现。沿原来的十二条弦依次施 $G_{12},G_{32},G_{52},-G_{52}$，每轮三条边共用一个门。最后的负号使该轮六个端点的振幅反号，与其余十三个站点的干涉随之改变。三个可调门共十二个角，固定其中六个，对另六个角做区间校准，同一个第五壳算子在第七、八、九壳的第三枢轴都精确给出 $K=1,\ W=10^{-122}$。固定这组门后，第十壳读得 $1.1134<K_{10}<1.1152$ 和 $-0.00955<W_{10}<-0.00937$，两个偏离目标的方向都与预登记预测一致。末轮负号是这项构造引入的离散选择。两轮 52 弦强制同号时的六式可达性仍开放。[固定末轮符号的区间证书](https://github.com/the-omega-institute/trureturing-experiments/blob/a163c19610f94de225de6e2b0c22a0c56aad75a9/experiments/ch39-omega-research/replay/ch39-three-shell-final-sign.md)

末轮负号可看作相位 $e^{i\phi}$ 在 $\phi=\pi$ 的取值。设 $P$ 投影到末轮触及的六站，$U_\phi$ 为末轮采用 $e^{i\phi}G_{52}$ 时的输运，则 $U_\phi=(I-P+e^{i\phi}P)U_0$。站点 $9,13$ 分别只参加第三、第四轮，且都在定向弦的第二端。因此 $U_\phi$ 在这两站的对角元是 $d,e^{i\phi}d$，其中 $d=(G_{52})_{22}$。写 $z=e^{i\phi}$，记 $b,d$ 与 $b',d'$ 分别为原门和同号共门的第二列。两片叶子的原输入列在各自对角元以外的长度均为 $|b|$，候选列的相应长度均为 $|b'|$。令 $\eta=\|U_\phi-V\|_{\mathrm{op}}$。比较这两对单位向量的距离，得到
$$
\eta^2\ge 2-2|b||b'|-2\min\{\operatorname{Re}(\bar d d'),\operatorname{Re}(\bar z\bar d d')\}.
$$
最小值至多为两者的平均，而该平均不超过 $|d||d'||1+z|/2$。用 $|b'|^2+|d'|^2=1$ 和 Cauchy–Schwarz 不等式，取 $L=|z-1||d|/2$，得到
$$
\|U_\phi-V\|_{\mathrm{op}}\ge \sqrt{2-2\sqrt{1-L^2}}.
$$
$L>0$ 时这个下界严格大于 $L$。若原门是对角门，选 $d'$ 为 $d,zd$ 的单位圆短弧中点，并让左上元的平方等于 $za^2$，即可取到该界，其中 $a$ 是原门的左上元。[两叶输入列的核验](https://github.com/the-omega-institute/trureturing-books/issues/1627#issuecomment-7232485216)

若 $d=0$，酉性使两个对角元都为零。记右上、左下元为 $b,c$。两轮的三组弦各构成一颗二边星，中心为 $a$，第三、第四轮的叶子分别为 $p,q$。合成后 $e_a\mapsto c e_p$，$e_p\mapsto e^{i\phi}bc\,e_q$，$e_q\mapsto e^{i\phi}b\,e_a$。两轮都改用右上元为 $e^{i\phi}b$、左下元仍为 $c$ 的同一酉门，就复制了这三个映射。因此末轮相位能被同号共门精确吸收，当且仅当 $e^{i\phi}=1$ 或 $d=0$。

一般情形也有显式上界。令 $w^2=z$ 且 $\operatorname{Re}w\ge0$。将两轮的门同时改为 $\operatorname{diag}(w,1)G_{52}\operatorname{diag}(1,w)$，并保留前两轮。在每颗星上，误差算子的早叶列与另外两列的像正交。前者的范数是 $|1-w|\sqrt{|ab|^2+|d|^2}$，后两列共用一个像方向，沿该方向的行范数为 $|1-w|\sqrt{|ac|^2+|d|^2}$。两者相等，故这组门给出的误差为 $|1-w|\,|d|\sqrt{2-|d|^2}$。三颗星的直和与前两轮的酉输运都保留该算子范数。[共门显式构造](https://github.com/the-omega-institute/trureturing-books/issues/1627#issuecomment-7232623572)

小相位下还能求出最优误差的首项。记 $D=|d|$，则同号重选的最小误差为
$$
\frac{D}{\sqrt{2(1+D^2)}}|\phi|+O(\phi^2).
$$
这里的余项常数允许依赖原门。消去原门的相位后，在线性化的单星上，两个正交试验向量给出这个下界。其中的输入只落在两片叶上，故重选前轮的门也无法减小它。反向取一个厄米生成元重选共门，使线性残差的谱为零和该系数的正负值，便达到首项。对有混合的原门，两片叶的列也迫使每个误差趋零的候选靠近原门，因此局部计算控制了最优值。[首项的精确计算](https://github.com/the-omega-institute/trureturing-books/issues/1627#issuecomment-7232674150)

固定三门和第五壳源 $H$，记 $H_0=U_0HU_0^*$。末轮相位只改变六站与其余十三站间的交叉块，故
$$
\|U_\phi H U_\phi^*-H_0\|_{\mathrm{op}}
=2|\sin(\phi/2)|\,\|PH_0(I-P)\|_{\mathrm{op}}.
$$
把负号证书中的末轮乘数改为区间 $-\exp(i[-10^{-7},10^{-7}])$，并保留原来的六个固定角和六个活动角共用的一个六维盒。对每个 $|\phi-\pi|\le10^{-7}$，预条件映射的自映行界小于 $0.726791$，所以活动角盒内有唯一一组角度同时满足三壳六式。允许重新选门的同号六式可达性仍开放。[相位下界与交叉块恒等式](https://github.com/the-omega-institute/trureturing-books/issues/1627#issuecomment-7231068482) · [退化门的显式构造](https://github.com/the-omega-institute/trureturing-books/issues/1627#issuecomment-7231094749) · [相位区间复算](https://github.com/the-omega-institute/trureturing-books/issues/1627#issuecomment-7231273037)

若同时重选三个门，同号输运能得到已知负号解的源算子吗？固定第五壳源和十二条定向弦，负号解所在六维角盒内的每个输运后源算子，与全部同号共门所得算子的算子范数距离都大于 $1.2\times10^{-5}$。两条重本征线提供了这一区分。在三条射线的早、晚两片叶上逆推，负号门以相反的符号留下同一对角元，同号门在两处留下相同的对角元。六组读数足以分辨这两个系数，而未受门作用的站点 $14$ 固定了两条重线各自的相位。因此，同号六式若有解，必须由与这个负号角盒相隔正距离的算子实现。[两条重本征线给出的距离界](https://github.com/the-omega-institute/trureturing-experiments/blob/a646b9d10eed33e413ee0bd2b65125c674025e2d/experiments/ch39-omega-research/replay/ch39-three-shell-source-phase-distance.md)

**消去一个相位（`ARGUED`）。** 固定前两门与 $G_{52}$ 的第一行 $(a,b)$，其第二行是 $(-h\bar b,h\bar a)$，其中 $h=\det G_{52}$。按早、晚两轮相乘后，改变 $h$ 只将三颗二边星的六片叶子同时乘以 $h$。以 $X(h)$ 记输运后的自伴算子。对三壳的 57 条归一化谱线 $u_i$，实读数 $A_i=u_i^*X(h)u_i$ 共有同一个参数 $t=(\Re h,\Im h)$，写成 $A=m+Mt$，其中 $\|t\|_2=1$。给定 $A$，先检查 $A-m$ 是否落在 $M$ 的列空间。若 $M$ 秩为二，原像唯一且须为单位向量。秩为一时，最短原像的长度至多为一便可沿核补足，留下一个或两个相位。秩为零时，若 $A=m$，整个相位圆都可行。这样可将公共相位的存在性化为线性方程与单位圆的相容性。其余门角仍须和作用于这些读数平方的六个热方程联立。[相位消元与三壳振幅](https://github.com/the-omega-institute/trureturing-books/issues/1627#issuecomment-7234045041)

**强度松弛（`ARGUED`）。** 若只约束两条重线的逐站强度，并允许任意相位来恢复正交，已知负号解就为该松弛提供了六读数见证。末轮的对角符号保留每条重线的逐站强度和两线的正交性，同时改变跨站相干。因此全域判定还需要约束同号门产生的相干。[所用负号见证（`CERT`）](https://github.com/the-omega-institute/trureturing-books/issues/1627#issuecomment-7234053080)

**只改变公共相位时的排除（`CERT`）。** 将负号证书中心的前十一个角固定，只让同号重复 $G_{52}$ 的整体相位绕行一周。每壳投影振幅来自整体相位的至多二次复多项式。Arb 的 316 次区间求值覆盖全圆，每个终盒至少有一个热读数余项避开零。因此这个一维切片无法同时满足六式。允许其余门角共同变化时的可达性仍开放。[固定输入版本和全圆复算](https://github.com/the-omega-institute/trureturing-experiments/blob/be74a3657a65f06b756d49db4bb81bb37344d67d/experiments/ch39-omega-research/replay/ch39-pinned-interval-replays.md#same-sign-repeated-gate-with-one-free-phase)

前三壳的六个等式对第十壳还留下多少自由？保留相同的第五壳源、十二条弦和末轮负号，重新选择三个门。固定其中四角，其余八角在一个区间盒内调整。任取 $|u|\le 4\times10^{-6}$、$|v|\le 5\times10^{-7}$，都能选出同一组门，使前三壳保持上述六个等式，并在第十壳同时读得 $K_{10}=1+u$、$W_{10}=10^{-122}+v$。取 $u=v=0$ 即配平四壳八式；取偏移的四种符号组合，则两项偏离的方向可以独立改变。此处第十壳也参与校准，真空尺度仍是输入。 [四壳校准与第十壳响应的区间证书](https://github.com/the-omega-institute/trureturing-experiments/blob/c6bbae236604130b5618b1c906ed36e8c532faf9/experiments/ch39-omega-research/replay/ch39-four-shell-final-sign.md)

固定这组门后，第十一壳提供了留出检验。取第十一壳自身的第三枢轴，在整个四壳校准角盒上得到 $0.37799<K_{11}<0.37885$、$0.06957<W_{11}<0.06970$。事前预测的方向是 $K_{11}>1$、$W_{11}<0$，两项均被推翻。这个结果也约束重新选门的幅度。以算子范数度量，在原盒内任一输运后源算子的 $0.009$ 邻域内，每个同谱源的第十一壳真空读数仍高于目标 $10^{-122}$。若要在五壳同时校准，新的输运后源必须离开整个邻域。[第十一壳的留出读数与邻域界](https://github.com/the-omega-institute/trureturing-experiments/blob/3d9dbd921b88455cc7ed17e6153854f8946f72ae/experiments/ch39-omega-research/replay/ch39-four-shell-eleventh-holdout.md)

重新选择三枚共用门，可以看出前四壳的校准对第十一壳约束了多少。保持前八项读数精确成立，第十一壳的牛顿读数 $K_{11}$ 可以在 $\{0.40,0.44\}$ 中任选，真空读数 $W_{11}$ 可以独立在 $\{0.05,0.06\}$ 中任选，四种组合都能达到。在每组读数附近，牛顿读数变动至多 $0.000003$、真空读数变动至多 $0.000000375$ 时，整个矩形中的目标也都可达。每组分别固定两个门角，用其余十个角的区间界给出对应解。同一电路能否在五个壳上都达到 $(1,10^{-122})$ 仍开放。[两项读数的条件可达范围](https://github.com/the-omega-institute/trureturing-experiments/blob/3a513fdb9d79b8082400ce116f4ef07e310db415/experiments/ch39-omega-research/replay/ch39-five-shell-conditional-targets.md)

还可以保留这十二条弦和四轮顺序，让第四轮独立选门。每轮的三条弦仍用同一枚门，五个壳也共用整套电路。在第七至十一壳各自的原生第三枢轴上，五个真空读数可同时达到 $W_j=10^{-122}$，前四个牛顿读数同时达到 $K_j=1$。在这些等式成立时，第十一壳的牛顿读数可取 $0.70$ 或 $0.72$，每个值都有独立的十维角盒证书。独立末轮改变了可观察的混合幅度：叶站 $9$、$13$ 各只参加一轮，若后两枚门仅差一个相位，这两个站点回到自身的振幅必定等模。解盒中的输运与所有这类输运的算子距离都大于 $0.01$。五壳同时达到原牛顿与真空目标的可能性仍开放。[五壳真空校准、门的相位判据与区间证书](https://github.com/the-omega-institute/trureturing-experiments/blob/93664fc0761e87ada11fb3fff474ac99149f7763/experiments/ch39-omega-research/replay/ch39-five-shell-independent-fourth.md)

如果同一轮中有一条弦可单独选门，五个壳的全部原引力目标就都可达到。仍取同一第五壳源、这十二条定向弦和四轮顺序。单独选门的弦可取第二轮的 $(1,3)$、第三轮的 $(6,9)$ 或 $(8,16)$、第四轮的 $(6,13)$ 或 $(7,10)$。每种选择各有一套五枚门，使第七至十一壳在各自原生第三枢轴上同时给出 $K_j=1$、$W_j=10^{-122}$。这些壳都参与了校准。对事前指定的 $(6,13)$ 方案固定全部门，第十二壳的整盒留出读数为 $0.170<K_{12}<0.172$ 和 $0.1030<W_{12}<0.1033$，两项都与事前预测方向相反。[五种五壳校准与第十二壳检验](https://github.com/the-omega-institute/trureturing-experiments/blob/d204b150c860ac295cd97f8cb358047ad55abda4/experiments/ch39-omega-research/replay/ch39-five-shell-split-bond.md)

给第二轮的 $(0,2)$ 和第四轮的 $(6,13)$ 各自单独设门。从同一第五壳源出发，这六枚门使第七至十二壳在各自原生第三枢轴上同时满足 $K_j=1$ 和 $W_j=10^{-122}$。六个壳都参与校准。二十四个门角固定十二个，余下十二个用于求解十二项读数。区间计算先合并同一第五壳源对六壳的扰动贡献，再取绝对值，得到角盒的最大半宽小于 $2.452\times10^{-7}$、自映比小于 $0.91301$，且整盒上严格压缩。只拆一条弦能否校准全部六壳仍开放。[六壳区间证书](https://github.com/the-omega-institute/trureturing-books/issues/1743#issuecomment-7235856614) · [钉版区间复算 `verify`](https://github.com/the-omega-institute/trureturing-experiments/blob/ce1dad241f670cf05fb1f03c99a7a78a08bc8cfd/experiments/ch39-omega-research/replay/ch39-six-shell-correlated/certify-correlated-shells.py#L18)

若分六轮在平方弦长不超过 56 的全部十八条边上各施门一次，同长度仍共用一个门，则可用第七、八、九壳的六项目标共同校准这四个门，使同一第五壳算子共轭一次后在三壳各自的原生第三枢轴都精确给出 $K=1$ 和 $W=10^{-122}$。第十壳的两个目标事先登记。对封存参数盒内每个满足前三壳六式的解，第十壳原生第三枢轴都给出 $1.07020<K_{10}<1.07540$ 和 $-0.002820<W_{10}<-0.002444$，两项均失配。能否由同一算术联络预先给出跨壳输运，仍是开放问题。 [三壳六式的共同解](https://github.com/the-omega-institute/trureturing-experiments/commit/9e2b8abfe862acb15667d5a0154731a67e491a95) · [第十壳的事前登记](https://github.com/the-omega-institute/trureturing-experiments/commit/062393b79f354aedffa0c211fedb458e5dfa2e35) · [第十壳的区间读数](https://github.com/the-omega-institute/trureturing-experiments/commit/2326ecde013a0e40d6487cb52bd10ae519edf08a)

已知的共轭算子与整个截止 52 的算子族之间有正的距离。固定同一个第五壳源，用原四轮和任意三个同长共门所得的每个算子，与截止 56 的已认证角盒内每个算子的算子范数距离都大于 $0.0325$。有三个站点在第一轮同时受门作用，后三轮都不再触及它们。因此最高本征向量在这三个站点上的分量必是两个固定源向量的线性组合，且两个公共系数的模平方和为一。沿 $(2,2+3i,-1+2i)$ 的投影给出分离界：即使选取最接近的相位，截止 56 的盒内最高本征向量与所有满足这一约束的归一化最高本征向量之间的距离仍大于 $0.10$。再用最高与次高本征值之差，即得算子距离下界。另一个截止 52 的算子能否再现同样的六个标量读数，仍待确定。 [算子距离下界](https://github.com/the-omega-institute/trureturing-experiments/blob/c3b1887b274a227d3827658b9ee337d3447af92d/experiments/ch39-omega-research/replay/ch39-gravity-radius52-leaf-bound.md) · [区间计算](https://github.com/the-omega-institute/trureturing-experiments/blob/c3b1887b274a227d3827658b9ee337d3447af92d/experiments/ch39-omega-research/replay/ch39-gravity-radius52-leaf-bound.py)

十二条短边上的门可以同时满足三壳的引力条件，并使三个端点弱差归零。取第五壳的荷六算子，让平方弦长不超过 $52$ 的十二条边各作用一次，每条边独立选一个只混合两个端点的 $U(2)$ 门。四轮的平方弦长依次为 $12,32,52,52$，每轮的三条边互不相交。这些门合成一次保留源谱的酉共轭。在原匹配能标 $1.176397\times10^{14}\,\mathrm{GeV}$，用全部九项目标校准这组门后，第七、八、九壳各自的原生第三枢轴都精确给出牛顿项 $K=1$、真空项 $W=10^{-122}$ 和弱差 $D=0$。按本征值递增给谱线编号，三壳的低截止依次落在第一、第十六、第一条线上，约为 $522$、$896$、$545\,\mathrm{GeV}$。第九壳第一、十六条线承担了几乎全部正权重。即使允许任意酉共轭，弱差归零也要求这两条线中较低的截止小于 $2241\,\mathrm{GeV}$。再加上真空条件，它必须低于 $1888\,\mathrm{GeV}$。单独在第九壳，三式可以同时成立且较低的截止严格位于 $1887$ 与 $1888\,\mathrm{GeV}$ 之间。若从同一第五壳算子出发，按原定方向和次序走完平方弦长至多 $56$ 的十八条边，六轮中同长边共用一个 $U(2)$ 门，三壳的弱差仍可同时归零。但在任何这样的弱差解上，只要第九壳的真空项 $W_9\ge0$，牛顿项便满足 $K_9<-2.5$，无法达到 $K_9=1$。这就排除了这组六轮共门布局的九式共同解。更长弦或其他布局能否用共门达标，仍待确定。[十二条短边的区间构造](https://github.com/the-omega-institute/trureturing-experiments/blob/7825590bdc72fc7ad8dcd3126634a660c7eb0445/experiments/ch39-omega-research/replay/ch39-twelve-independent-gates-nine.py) · [一般酉共轭的构造](https://github.com/the-omega-institute/trureturing-experiments/blob/8983f28b250ce4251623dcaf26041e35dafce2bd/experiments/ch39-omega-research/replay/ch39-common-three-shell-nine-endpoints.py) · [第九壳的两线截止界](https://github.com/the-omega-institute/trureturing-experiments/blob/61cc9e0de0e4ff6fb548cfdf72c0d8140340caa1/experiments/ch39-omega-research/replay/ch39-ninth-gravity-weak-two-line-threshold.py) · [同长共门的弱差解](https://github.com/the-omega-institute/trureturing-experiments/blob/519c9f00e6b777d7ccde2e3ca1643859ccf28741/experiments/ch39-omega-research/replay/ch39-shared-four-gates-weak-boxes.py) · [第九壳引力界](https://github.com/the-omega-institute/trureturing-experiments/blob/519c9f00e6b777d7ccde2e3ca1643859ccf28741/experiments/ch39-omega-research/replay/ch39-shared-block-ninth-gravity.py)

若放开弦长限制，只要求输运与坐标三循环对易，则从同一第五壳初态出发，可以找到一个酉输运，在第七至第十壳各自的原生第三枢轴同时精确满足 $K=1$、$W=10^{-122}$ 和 $D=0$。这四个壳都参与了十二式的校准。固定这组参数后，在事前登记的第十一壳读得 $K_{11}\approx0.890$、$W_{11}<0$、$D_{11}<0$，三项目标全部失配。固定第五壳初态，只要求弱差归零时，另一个与坐标三循环对易的输运能从第七壳连续匹配到第十二壳。这个上限恰为六壳，因为即使重新校准，也没有一个这样的输运能使第七至第十三壳的弱差全部归零。对任何与坐标三循环对易的酉输运，第七至第十二壳的十八个无量纲读数中，至少一项与其目标的绝对偏差严格大于 $10^{-6}$。因此，从第七壳起连续满足三项目标的最大壳数 $L$ 满足 $4\le L\le5$。这类输运能否同时满足五壳十五式，仍是开放问题。[四壳校准](https://github.com/the-omega-institute/trureturing-experiments/blob/c7e562f381bb15257edeedc14a5d91ca457935d5/experiments/ch39-omega-research/replay/ch39-four-cyclic-twelve.py) · [第十一壳事前登记](https://github.com/the-omega-institute/trureturing-experiments/commit/3d12a9998fb24ccd42d5ddd68ba907638d4f3eb4) · [留出读数](https://github.com/the-omega-institute/trureturing-experiments/blob/b775744b3a4620fcb6ac33dd7814165c134af30a/experiments/ch39-omega-research/replay/ch39-four-cyclic-eleventh.py) · [六壳弱差共同解](https://github.com/the-omega-institute/trureturing-experiments/blob/25f0302c4dc4fd7210bb5a22620f30695035a481/experiments/ch39-omega-research/replay/ch39-six-cyclic-weak-horizon.py) · [七壳弱差排除界](https://github.com/the-omega-institute/trureturing-experiments/blob/3f62198e5d5ccc488c4da3475580e57f4012569d/experiments/ch39-omega-research/replay/ch39-seven-cyclic-weak-horizon.py) · [六壳统一误差界](https://github.com/the-omega-institute/trureturing-experiments/commit/7daf8989ad2fd3c40933297e7ec7465605b1dae7)

若只要求酉输运保持七维三循环不变子空间，它也会保持该空间的十二维正交补。五壳构造在这个正交补内混合两个六维非平凡字符空间。从同一第五壳源出发，一个这样的输运在第七至第十一壳各自的原生第三枢轴精确满足全部十五式，五个壳都参与校准。固定这一组参数后，事前登记的第十二壳给出 $1.24228<K_{12}<1.24291$、$W_{12}<0$、$D_{12}<0$，三项均偏离目标。七壳排除只用到输运保持七维子空间，因为两条加权重列投影到它的总平方范数也随之保持。因此，从第七壳起，这个较大输运族连续满足三项目标的最大壳数 $L$ 满足 $5\le L\le6$。[五壳十五式](https://github.com/the-omega-institute/trureturing-experiments/blob/0d195aa47fe779ba67c1372160463a5eb687c87a/experiments/ch39-omega-research/replay/ch39-five-trivial-fifteen.py) · [第十二壳事前登记](https://github.com/the-omega-institute/trureturing-experiments/commit/1aad0f521a0ceb5b3bc4e1027212a7b9f1a9b299) · [留出读数](https://github.com/the-omega-institute/trureturing-experiments/blob/bf273cb553077e4e8376cf64b9ac6198d4fa1831/experiments/ch39-omega-research/replay/ch39-five-trivial-twelfth.py) · [七壳投影界](https://github.com/the-omega-institute/trureturing-experiments/blob/3f62198e5d5ccc488c4da3475580e57f4012569d/experiments/ch39-omega-research/replay/ch39-seven-cyclic-weak-horizon.py)

若允许在十九个站位间作任意酉输运，从同一第五壳源出发，有一个保持源谱的输运能在第七至第十二壳各自的原生第三枢轴同时精确满足全部十八式。这六个壳都参与校准。固定参数后，事前登记的第十三壳读得 $1.13389<K_{13}<1.13391$、$W_{13}<0$、$D_{13}<0$，三项目标全部失配。另一个区间证书覆盖七壳的全部 972 种候选低谱线组合。对任意同谱输运，若第七至第十三壳均满足 $D_j\ge-0.001$，则第十壳必有 $W_{10}<-10^{-4}$。因此七壳同时达到弱差与真空目标已不可能。结合上述六壳构造，一般同谱输运从第七壳起能连续匹配全部三项目标的最大壳数恰为六。若只要求同一输运使第七至第十三壳的弱差归零，至少须动八站，十九站中恰有 32 个八站集合可行，其余站位保持不动。允许按目标壳重新校准时，八站支撑最多连续匹配十一壳（第七至第十七壳）。要匹配十二或十三壳，最少都须动九站。怎样预先选出可行支撑？对上述 32 个集合，集合内两站的中点或三等分点总能严格落入集合外四站所成的四面体。因此即使允许阈值并列，也没有一个方向能把可行的八站排在最高或最低八位。十九站到球心等距，到任意锚点的平方距离取任意实权和，只要分数非常数，也只给出一种方向排序。第五壳任一原生谱线的站位 Born 权排序同样选不中。看过分类后，按第二坐标的 $(y-13)^2$ 取最高八站，可选中 $\{1,2,3,4,7,10,12,15\}$（站号从零起），入选最低分 100，落选最高分 64。算术联络能否在校准前确定所需的输运，仍是开放问题。 [六壳十八式](https://github.com/the-omega-institute/trureturing-experiments/blob/0b4c4d72af33135e20a85019f50edbf4d3081d37/experiments/ch39-omega-research/replay/ch39-six-unrestricted-eighteen.py) · [第十三壳预登记](https://github.com/the-omega-institute/trureturing-experiments/commit/3ba21eb6386b01bbc5ae13352b81141067ceb938) · [第十三壳留出读数](https://github.com/the-omega-institute/trureturing-experiments/blob/5791deb30ac498737e3956633ea1f8be3c96eb7c/experiments/ch39-omega-research/replay/ch39-six-unrestricted-thirteenth.py) · [七壳统一排除](https://github.com/the-omega-institute/trureturing-experiments/blob/eb62aeef88e434bfcdc242c57da4e2929dfff150/experiments/ch39-omega-research/replay/ch39-seven-unrestricted-vacuum-weak.py) · [八站支撑全分类](https://github.com/the-omega-institute/trureturing-experiments/blob/32f649930ad4f045417b30d008c7590ca2720d20/experiments/ch39-omega-research/replay/ch39-eight-optimal-classification.py) · [方向、锚距与单谱线的排序检验](https://github.com/the-omega-institute/trureturing-experiments/blob/32f649930ad4f045417b30d008c7590ca2720d20/experiments/ch39-omega-research/replay/ch39-eight-native-port-rankings.py) · [二次分数的严格截取](https://github.com/the-omega-institute/trureturing-experiments/blob/58bd892348f9e2c8cce9b8198107e1e3a916149e/experiments/ch39-omega-research/replay/ch39-eight-polynomial-rankings.py) · [八站的十一壳上限](https://github.com/the-omega-institute/trureturing-experiments/blob/5cf1bd689a33cc6fd43d5b90cf7c7489839a19ef/experiments/ch39-omega-research/replay/ch39-twelve-weak-fixed-pole-obstruction.py) · [九站的十三壳构造](https://github.com/the-omega-institute/trureturing-experiments/blob/6a9aedc4ef9dd7c7689c051a3a4fb04dbe04ac77/experiments/ch39-omega-research/replay/ch39-thirteen-weak-nine-sites.py)

按预先登记的规则把第五壳生成元原样用于第六壳，上、粲、下、奇四个汤川耦合在任意三代空间都落在各自的参考窗外。顶和底各自可以覆盖整个参考窗。若为两者分别选取三代空间，可达的耦合对填满一个矩形。要求共用同一个三代空间后，可达范围恰好是沿对角线切出的一个闭三角形。取三循环固定的二维空间，再添一条由两种字符混合的直线作为第三个方向。改变混合比例就能走完整条斜边。顶耦合落在参考窗内时，底耦合能达到的最小值约为 $0.016525$，已经高于底窗上端 $0.01410$。[第六壳的夸克留出检验](https://github.com/the-omega-institute/trureturing-experiments/blob/fc6c363ae52c9331d7be74a5772b00b22b76eb4d/experiments/ch39-omega-research/replay/ch39-sixth-repeated-quark-holdout.py) · [共同三代空间的可达三角形](https://github.com/the-omega-institute/trureturing-experiments/blob/f3f2884384c7f2407e6f04207a5f2f27e8e977e9/experiments/ch39-omega-research/replay/ch39-sixth-heavy-frontier.py)

从 $M_Z$ 走到交汇点，色逆耦合 $A_c$ 必须沿途为正。写 $x_i=Q_i^2/M_P^2$，称 $x_i<10^{-6}$ 的层为低截止层。固定第四壳第三枢轴的权重和 $N+1$ 的荷六源谱，单在交汇点满足三条中性规范等式，最少需要三个低截止层。上述夸克与引力联合解恰好用了三个。至多三层时，所有端点匹配解都有 $A_c(5.6\,\mathrm{TeV})<-1$。要在该处也保持正色动能，最少需要四层。一个四层解从 $5.59$ 到 $5.61$ TeV 保持色项和中性动能矩阵正定，但在 $1$ TeV 有 $A_c\approx-4.21$。[端点所需的最少低截止层数](https://github.com/the-omega-institute/trureturing-experiments/blob/3aac25946709eb5b75879592f803e362b230f783/experiments/ch39-omega-research/replay/ch39-fourth-third-pivot-minimum-low-cutoffs.py) · [联合解的沿程动能](https://github.com/the-omega-institute/trureturing-experiments/blob/b560e6f5301977c97fc00ec844d8bf5ddc613710/experiments/ch39-omega-research/replay/ch39-fourth-third-pivot-joint-box-kinetics.py) · [三层低截止的沿程界](https://github.com/the-omega-institute/trureturing-experiments/blob/3aac25946709eb5b75879592f803e362b230f783/experiments/ch39-omega-research/replay/ch39-fourth-third-pivot-three-low-path-obstruction.py) · [四层构造的正定区间](https://github.com/the-omega-institute/trureturing-experiments/blob/a7b9a14f59cc0e946ac5ea547e2a98bfd49462b2/experiments/ch39-omega-research/replay/ch39-fourth-third-pivot-four-low-kinetic.py)

在原匹配能标，单独要求端点三条规范等式时，全程正动能可以实现。十九层中最少恰需九个低截止层。八层的所有位置组合均已排除，九层已有全程正解。再要求同一输运给出 $K=1$ 和 $W=10^{-122}$，第四壳就遇到了全域障碍。两条引力条件迫使六个绝对权重最大的层中至少一层有 $x_i>10^{-6}$。无论是哪一层，只要端点三条规范等式成立，在 $5.6\times10^{3},\,5.6\times10^{5},\,5.6\times10^{7},\,5.6\times10^{9},\,5.6\times10^{11}$ GeV 这五个能标中，至少一处的色逆耦合或电磁动能系数严格为负。前两枚枢轴已在端点被排除。固定原荷六源谱和本节的一圈破缺背景，令 $M_0=1.176397\times10^{14}$ GeV。对 $M_0e^{-1/16}\le M\le M_0e^{1/16}$ 的每个匹配能标，第四壳的三枚原生枢轴都无法兼顾两条引力条件、三条规范等式和全程正动能。即使每个能标都可重选酉输运，这个障碍仍然成立。[低截止层数下界](https://github.com/the-omega-institute/trureturing-experiments/commit/2ce911b26844e56fe3ef5cef1349cacf0632676f) · [九层的全程正解](https://github.com/the-omega-institute/trureturing-experiments/blob/33732348f01eba3f880262c4ed5096847069f078/experiments/ch39-omega-research/replay/ch39-fourth-third-pivot-sparse-positive-path.py) · [引力矩强制的大权层](https://github.com/the-omega-institute/trureturing-experiments/blob/506a39f5e28ed5c19d39004aadd3df9349365b9f/experiments/ch39-omega-research/replay/ch39-fourth-third-pivot-strong-gravity-cutoff.py) · [五个能标的全域排除](https://github.com/the-omega-institute/trureturing-experiments/blob/eee33b96faaef1ef947a108224efcdff5ca99807/experiments/ch39-omega-research/replay/ch39-fourth-third-pivot-global-kinetic-obstruction.py) · [连续匹配能标的三枢轴排除](https://github.com/the-omega-institute/trureturing-experiments/blob/44572bff3dbfa4cc7db552b18dcc859346e9ee31/experiments/ch39-omega-research/replay/ch39-fourth-third-pivot-kinetic-energy-band.py)

更致命的测试是**固定全部物理质量、微调紫外截止 $Q$**。利用热核递推 $2E_3(u) + uE_2(u) = E_2(u) + uE_1(u) = e^{-u}$，在匹配点 $K = 1,\; C = c$ 对 $x = Q^2/M_P^2$ 求导，立得

$$
C' + (3x + 2c)K' = \frac{x}{4\pi}\sum_{\mathrm{vis}}(6\alpha_k - g_k)\exp\!\left(-\frac{z_k}{x}\right).
$$

因为每个最小耦合实单态都精确满足 $6\alpha - g = 6(1/6) - 1 = 0$，**全部隐单态在这条斜率组合中逐项消去**！仅凭可见谱便锁定 $\max(|\dot{C}|, |\dot{K}|) > 0.68$，排除了 $G$ 与 $\Lambda G$ 对截止同时驻定的可能。对**任意**已匹配 $K = 1, C = 10^{-122}$ 的隐实单态谱，只要把截止相对上调 **$7.2\times 10^{-117}$**，宇宙学常数就已经严格转负；而在上述 $311$-单态实例中，首次过零翻号仅需相对上调约 **$4.22\times 10^{-120}$**（[共用截止与正曲率窗口证书](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-chiral-shared-gravity-spectrum.py)）：

| 正零点编号 | $311$ 单态实例首次过零的相对截止增量 $(Q - Q_0)/Q_0$ | 任意匹配隐实单态谱的通用转负上界 |
| :---: | :---: | :---: |
| #12207 | $(4.217575,\, 4.217579)\times 10^{-120}$ | $< 7.2\times 10^{-117}$ |
| #11661 | $(4.217566,\, 4.217570)\times 10^{-120}$ | $< 7.2\times 10^{-117}$ |
| #11934 | $(4.217440,\, 4.217444)\times 10^{-120}$ | $< 7.2\times 10^{-117}$ |

这条排除针对单一截止。若不加隐场，只取三枚候选的可见谱，把截止换成形状固定、整体标度可调的归一有符号截止测度，牛顿读数与曲率读数就可以对共同截止标度同时驻定，但只能到有限阶：对任何谱，只要测度的支撑紧且离开零，两种读数都不能在一个截止区间上恒等于非零常数。两点测度在匹配 $K = 1$ 时不能使真空项驻定；四点测度可以同时精确给出 $K = 1$、$\Lambda G = 10^{-122}$ 与一阶驻定，曲率沿共同标度取局部极大，截止整体相对移动约 $10^{-58}$ 才转负；#11661 上的六点测度达到二阶驻定，整体下调约 $7.1\times 10^{-38}$ 才转负，上调一侧在 $1.4\times 10^{-37}$ 以内保持为正。三点不够。对三枚候选的可见谱与一切 $|c| \le 10^{-15}$（$c$ 为所要求的 $\Lambda G$ 值），任取三个互异节点 $0<x_1<x_2<x_3\leq1$（$x=Q^2/M_P^2$），都不能同时给出 $K = 1$、曲率读数 $c$ 与对共同标度的一阶驻定。三点解要求一条由归一化响应构成的曲线上两道二阶除差同时为零；三个节点都满足 $\log x\leq-22.5$ 时，两道除差的一个固定组合在整段上定号，其余情形用除差核的凹性，把 $-26.875\leq\log x\leq-25.3125$ 内可能为正的部分压在其右侧的加权负部之下。先前在 #11661 上逐段得到的同侧组合与含小节点组合的排除，都是它的特例（[区间复算](https://github.com/the-omega-institute/trureturing-experiments/blob/6cf5c0a4c0f106e5857fd84af3f1fe9cc327d771/experiments/ch39-omega-research/replay/ch39-three-cutoff-stationarity.py) · [三点不可能](https://github.com/the-omega-institute/trureturing-experiments/blob/0382ed8bb2cd901b85f322063845a616acca1b88/experiments/ch39-omega-research/replay/%E4%B8%89%E7%82%B9%E6%88%AA%E6%AD%A2%E4%B8%8D%E8%83%BD%E5%AF%B9%E5%85%B1%E5%90%8C%E6%88%AA%E6%AD%A2%E6%A0%87%E5%BA%A6%E4%B8%80%E9%98%B6%E9%A9%BB%E5%AE%9A%E6%95%85%E6%9C%80%E5%B0%91%E6%88%AA%E6%AD%A2%E6%95%B0%E6%81%B0%E4%B8%BA%E5%9B%9B%E4%B8%94%E9%A9%BB%E5%AE%9A%E5%8C%B9%E9%85%8D%E6%B5%8B%E5%BA%A6%E7%9A%84%E6%80%BB%E5%8F%98%E5%B7%AE%E4%B8%8B%E7%A1%AE%E7%95%8C%E5%A4%B9%E5%9C%A8%E4%B8%87%E5%88%86%E4%B9%8B%E4%BA%8C%E7%82%B9%E5%85%AD%E4%BB%A5%E5%86%85.md) · [证书](https://github.com/the-omega-institute/trureturing-experiments/blob/0382ed8bb2cd901b85f322063845a616acca1b88/experiments/ch39-omega-research/replay/ch39-three-cutoff-stationarity-obstruction.py)）。连同两点的排除与四点的构造，$\Lambda G = 10^{-122}$ 时一阶驻定恰需四个截止。

一阶驻定处，牛顿倒数等于质量加权的对数项，二次发散部分不作贡献。取 $c=10^{-122}$，对 #11661、#11934、#12207，满足匹配和一阶驻定的有限有符号测度在 $(0,1]$ 上的总变差下确界依次约为 $316387.026$、$328912.837$、$315973.947$，三者均不取到。允许 $x=0$ 后，每个谱都有唯一的四点最优解，其中零截止的权重为负。Arb 区间证书同时核对矩条件与对偶函数的四个接触值，并验证其余各处的绝对值严格小于一。达到对偶下界要求测度集中在这四点。四个矩向量线性无关，因而矩条件唯一确定权重。把零截止移到趋于零的正截止，再用五个固定正截止的独立矩向量修正矩残差，修正权重趋于零，故两种定义域给出相同下确界。[五个截止矩的精确修复](lean:D5/S3/Topology/Measures/AtomicMomentRepair.exists_exact_moment_repair) · [总变差与取到性的区间证书](https://github.com/the-omega-institute/trureturing-books/issues/1963#issuecomment-7240332362)

四点证书还约束总变差接近下确界的测度。**手工推导。** 固定五个矩，记闭区间最优测度为 $\mu_*$、其总变差为 $T_0$，四个接触点为 $S$，对偶函数为 $F_0$。令 $\varepsilon=\|\mu\|_{\mathrm{TV}}-T_0$，$d(x)=\operatorname{dist}(x,S)$。若内点有严格的二阶接触、端点间隙向内线性增长，则局部展开和其余紧区间的严格间隙给出 $1-|F_0(x)|\ge\kappa d(x)^2$，其中 $\kappa>0$。由于两个测度的五矩相同，$\int F_0\,d\mu=T_0$，于是
$$
\kappa\int d(x)^2\,d|\mu|(x)\le\varepsilon,
\qquad
\int d(x)\,d|\mu|(x)\le\sqrt{(T_0+\varepsilon)\varepsilon/\kappa}.
$$
**区间计算。** 固定零裸项、无隐场及 $c=10^{-122}$，在整个 $x=Q^2/M_P^2\in[0,1]$ 上，#11661 可取 $\kappa=1$，#11934 可取 $\kappa=59/50$。证书在端点附近使用一阶导数界，在两个内点附近使用带符号的二阶导数界，在其余单调区间用子段两端的对偶间隙给出下界。因此，离四个接触点均至少 $r>0$ 的总变差质量至多为 $\varepsilon/(\kappa r^2)$。[两枚谱的二次间隙复算](https://github.com/the-omega-institute/trureturing-books/issues/1963#issuecomment-7240332362)

归一化矩固定了有符号总质量，因此衡量接触点之间的权重交换时，只需控制相邻接触点之间的测试函数差。设 $s_0<s_1<s_2<s_3$ 为接触点，$v(x)$ 为单截止的五矩向量，$A=[v(s_j)]_{j=0}^3$，取包含归一化矩的四行选择算子 $R$，使 $RA$ 可逆，并记 $B=(RA)^{-1}R$。由于 $RA\,Bv(x)=Rv(x)$ 的归一化行在每个 $x$ 都等于 $1$，故 $\sum_j(Bv(x))_j=1$。对满足 $\|f\|_\infty\le1$ 且 $\operatorname{Lip}(f)\le1$ 的测试函数，从 $f(x)$ 减去 $\sum_j(Bv(x))_j f(s_j)$。所得差在接触点归零，且减去的部分由固定五矩决定。离散分部求和从常数 $f(s_0)$ 出发，再用相邻函数差乘以累计权重 $q_k(x)=\sum_{j=k}^3(Bv(x))_j$。从最近接触点积分导数，得到有界 Lipschitz 距离的上界

$$
d_{\mathrm{BL}}(\mu,\mu_*)\le(1+L)\sqrt{(T_0+\varepsilon)\varepsilon/\kappa},
\qquad
L=\sup_{0<x<1}\sum_{k=1}^3(s_k-s_{k-1})|q_k'(x)|.
$$

两枚谱各用归一化、对数、二次和压力四行构造自己的左逆，再以 Arb 区间逐段控制累计权重的导数。#11661 满足 $L<3.6$、$T_0<316388$，#11934 满足 $L<3.177$、$T_0<328913$。当 $0\le\varepsilon\le1$ 时，有界 Lipschitz 距离分别至多为 $2600\sqrt{\varepsilon}$ 和 $2210\sqrt{\varepsilon}$。[两枚谱的稳定性复算](https://github.com/the-omega-institute/trureturing-books/issues/1963#issuecomment-7240332362)

若矩向量在待分拆内点附近为 $C^2$，且在零点附近满足 $\|v(x)-v(0)\|=O(x)$，对称分拆该原子，位移各为 $h$，并把零原子移到 $h^2$，只留下 $O(h^2)$ 的矩残差。用五个独立正截止矩列精确修复后，总变差超额仍为 $O(h^2)$，而测试函数 $d$ 的积分差为 $|w|h+O(h^2)$，其中 $w$ 是被分拆的权重，积分差取绝对值。因此即使只允许正截止，固定五矩下的有界 Lipschitz 距离一般也只能得到平方根阶。[稳定性推导与有理复算](https://github.com/the-omega-institute/trureturing-books/issues/1963#issuecomment-7238907372)

固定 #11661 可见谱、零裸项和无隐场时，正负权的牛顿斜率能否各自配平，受总变差约束。记 $k,w$ 为单点牛顿与真空响应，$D=x\,d/dx$。令 $\mu^+,\mu^-$ 为归一有符号测度的正部和负部，$T=\|\mu\|_{\mathrm{TV}}$。在 $K=1$、$W=c=10^{-122}$ 和 $DK=DW=0$ 的条件下，两部分的牛顿斜率积分相同，记为 $A=\int Dk\,d\mu^+=\int Dk\,d\mu^-$。取 $d=Dk$、$\ell=Dw$、$h=w-\ell/2$。将真空斜率 $\ell$ 以同一系数加入两部分的矩函数，利用 $DW=0$ 消去它的有符号积分。对 $f_\eta=10^6(k-d-3207430h-\eta d+0.15804\ell)$，Arb 区间计算在 $[0,1]$ 上给出 $f_{0.85895}<0.0002$ 与 $f_{2.27536}>-1.9402$。以两部分的质量 $(T+1)/2$ 和 $(T-1)/2$ 积分，得到

$$
1-3207430c < 10^{-6}(0.9702T-0.9700)-1.41641A.
$$

因此 $T\le T_*$ 迫使 $A<0$，其中

$$
T_*=\frac{10^6(1-3207430c)+0.9700}{0.9702}
\approx1\,030\,716.316.
$$

对四个 $a_j$ 均非零、且 $\lvert a_j\rvert$ 被一道严格斜率间隔平分的布局，$DK=DW=0$ 迫使间隔两侧的 $a_j$ 两两等幅反号。若一对的两个 $Dk$ 异号，它们对应同号权重，斜率在该权重部分内抵消。若同号，两部分各得到同一符号的斜率贡献。因此在此预算内，至少一对的两个 $Dk$ 都必须为负。 [手工推导与区间复算](https://github.com/the-omega-institute/trureturing-books/issues/2157#issuecomment-7240392121)

若规定截止下限 $\delta>0$，记 $[\delta,1]$ 上的最小总变差为 $T(\delta)$。对上述三枚谱，零裸项、无隐场且 $c=10^{-122}$ 时，每个 $0\le\delta\le10^{-14}$ 都有唯一最优测度，由四个原子组成，最左点就是 $\delta$。区间证书将移动端点的五个矩一起包住，逐谱验证同一根盒对所有 $\delta$ 的严格压缩性，并用对偶函数的严格导数符号与接触矩阵的满列秩判定全域唯一最优性。记 $w_0$ 为闭区间最优解的零截止权重，$F_0$ 为对应的对偶函数。对矩条件求导并与对偶向量配对时，两个内点的位移项由驻点条件消去，得到 $T'(0+)=-w_0F_0'(0)$。三枚谱的系数依次约为 $3.97935\times10^9$、$4.12593\times10^9$、$3.97489\times10^9$，截止变量为 $x=Q^2/M_P^2$。在上述区间内，对每一枚谱都有 $|T(\delta)-T(0)-\delta T'(0+)|\le6\times10^{13}\delta^2$。将矩与接触方程对 $\delta$ 求导，用预条件雅可比的行和界估计最左权重和对偶向量的导数，再对 $T'(\delta)=-w_0(\delta)F_\delta'(\delta)$ 求导即可。这里 $F_\delta'$ 是固定对偶系数时对截止变量的导数。三个谱的 $|T''|/2$ 均小于 $6\times10^{13}$。 同一证书将解的导数保留为带符号的区间，在整个区间上给出 $1.13\times10^{14}<T''(\delta)<1.19\times10^{14}$，所以三枚谱的代价曲线都严格凸，且都在零处切线的上方（$\delta>0$）。 [截止下限与成本曲率的区间复算](https://github.com/the-omega-institute/trureturing-books/issues/1963#issuecomment-7240332362)

截止下限也约束负权必须放在哪里。**区间计算与手工推导。** 对固定 #11661 可见谱，在上述五矩条件下，令 $T=\|\mu\|_{\mathrm{TV}}$、$b=e^{-14.5}$，以 $\mu^-$ 表示测度的负部。取五个矩函数的线性组合，在 $[b,1]$ 上把它夹在 $-1.01$ 与 $1.01$ 之间，在 $[0,b)$ 上把下界放宽到 $-5.675$。该组合的积分由五矩固定，于是得到

$$
1\,046\,134.326+4.12833\times10^{12}c<1.01T+4.665\,\mu^-([0,b)).
$$

若所有截止均不低于 $b$，则 $T>1\,035\,776$。在 $T\le T_*$ 时，积分界要求 $\mu^-([0,b))>0$。在 $0<x<b$ 处，单点牛顿斜率 $Dk(x)$ 为正。对四个 $a_j$ 均非零的严格半权布局，带有小截止负权的配对也须跨过上文双负斜率对所跨的间隔。由于 $\ell>0$，它的搭档斜率必须为负，因此同取负权。布局只有一个正权节点，位于双负斜率对。 [五矩组合、符号推导与区间复算](https://github.com/the-omega-institute/trureturing-books/issues/2013#issuecomment-7239564941)

真空矩排除了这一符号布局。令 $v$ 为唯一正权所在的节点，其 $Dk(v)<0$。把 $h$ 写成 $\ell$ 的函数，在 $v$ 处取切线。区间计算验证了凹性和小截止端的包络，故这条切线在整个 $0\le x\le1$ 上压住 $h$，且纵截距大于 $6\times10^{-14}$。正部集中在切点，负部支撑上的 $h$ 值至多等于切线值。对归一有符号测度积分时，$DW=0$ 消去了切线的斜率项，使纵截距成为 $W$ 的下界。这与 $W=10^{-122}$ 矛盾。因此四个梯度均非零、具有严格半权间隔的四点内布局必须有 $T>T_*$。 [热核切线界与区间复算](https://github.com/the-omega-institute/trureturing-books/issues/2013#issuecomment-7239766559)

在较宽的预算 $T\le1\,031\,000$ 内，只要四个梯度均非零，跨间隔相消的两对节点就必须分别同取正权、同取负权。**手工推导与区间计算。** 小截止负权在这一预算内仍然存在，因此任一双负斜率对仍会留下唯一的正权，并被上面的切线界排除。剩下的异号权重对只能有双正斜率。对正负部各用一道五矩组合，得到 $0\le A<0.022$，且在 $-15.5\le\log x\le-14.5$ 内有超过 $200\,000$ 的负权绝对质量。该区间的 $d>8\times10^{-7}$。若区间内的负权都属于异号权重对，它们对 $A$ 的贡献就超过 $0.16$，所以至少有一对同取负权。若另一对权重异号，就只有一个正权节点。为抵消负部的真空斜率，这个节点必须满足 $\log x>-16.25$。当 $\log x\ge-13.8$ 时，切线界给出矛盾。当 $-16.25<\log x<-13.8$ 时，该节点的牛顿斜率使 $A>0.05$，同样超出上界。因此预算内的两个权重部分各自达到牛顿驻定。 [完整推导与区间复算](https://github.com/the-omega-institute/trureturing-books/issues/2270#issuecomment-7241422759)

若有零梯度，上述两个对偶界仍要求一个小截止负权和两个负斜率节点，后两者权重异号。三个非零梯度中，只有负斜率负权节点满足 $a_j>0$。它单独占一半绝对梯度权重，且斜率比严格小于另两点。于是这三个节点的真空斜率加权和为负，$DW=0$ 迫使第四点的权重为正。区间计算给出 $Dk$ 在 $(0,1]$ 上唯一的零点 $x_0$，满足 $\log x_0\in(-13.74,-13.73)$，其前斜率为正，其后为负。

若负斜率负权节点位于两个正权节点的右侧，以 $\ell$ 为横坐标，过两个正权节点的 $h$ 割线便压住两处负权的 $h$ 值。它在零处的截距至少等于 $x_0$ 处切线的截距，因而仍推出 $W>6\times10^{-14}$。若负斜率负权节点位于另一负斜率节点左侧，斜率比在 $[e^{-12.75},1]$ 上严格递减，迫使该负权节点小于 $e^{-12.75}$。此时区间计算给出 $F=10^6k-3\times10^{12}h-2\,138\,205Dk$ 在正支撑上小于 $1/2$，在负支撑上大于 $-1$。积分得 $10^6-3\times10^{12}c<0.75T-0.25$，超出预算。

有无零梯度时，符号归约均只需 $A<0$ 和小截止负权存在。上述两道矩界直至 $T=T_*$ 仍保证这两点，切线、割线与受限支撑上的积分界也仍给出矛盾。因此，任何满足五矩与严格半权间隔的四点内布局都须有 $T>T_*$，包括角点牛顿二阶量为零的布局。 [预算下界的推导与区间复算](https://github.com/the-omega-institute/trureturing-books/issues/2157#issuecomment-7240392121)

四点严格半权的总变差可以沿配对布局逐步降低。固定 #11661 可见谱、零裸项和无隐场，令 $t_j=\log x_j$。在 $t_1$ 近 $-14.99012$、$t_2$ 近 $-13.73850$ 的解支上，取 $(1,3),(2,4)$ 配对，使每对内部的牛顿斜率相消。**手工消元与区间计算。** 在 $t_3\in[-5.67,-5.64]$、$t_4\in[-10^{-3},0]$ 内，归一与牛顿标定确定两对的总权重，余下的两条真空矩确定前两个节点。此解支的总变差随 $t_4$ 严格下降，而 $t_4=0$ 上的代价曲线严格凸，两端导数异号。闭包的唯一极小点位于 $t_3\in(-5.65655,-5.65653)$，其总代价在 $1\,030\,993.777$ 与 $1\,030\,993.778$ 之间。要求 $x_4<1$ 时，这个下确界由 $x_4\to1^-$ 逼近，在该解支的内部布局中不取到。 [局部延续与区间复算](https://github.com/the-omega-institute/trureturing-books/issues/2207#issuecomment-7241039259)

在小截止下限的延续区间 $0\le\delta\le10^{-14}$ 内，四个接触矩向量线性无关，把任一内点的矩导数添为第五列都能张成五维矩空间。可用这两个秩条件解释延续方程的雅可比为何可逆。记 $A$ 为接触矩阵，$B$ 为内点矩导数矩阵。在齐次线性化方程中，接触值固定给出 $A^{\mathsf T}y=0$，其中 $y$ 为对偶系数的增量。消去内点位移后，与 $y$ 配对得到 $\sum_i(-w_i/c_i)((B^{\mathsf T}y)_i)^2=0$，其中 $w_i$ 是内点权重，$c_i$ 是对偶函数在该点对数截止变量的二阶导数。区间证书给出 $-w_i/c_i>0$，故 $B^{\mathsf T}y=0$。联合张成迫使 $y=0$，非零曲率迫使位移为零，接触列的独立性迫使权重增量为零。 [秩与曲率的区间复算](https://github.com/the-omega-institute/trureturing-books/issues/1963#issuecomment-7240332362)

固定 #11661 可见谱、零裸项和无隐场时，即使要求严格斜率间隔平分绝对牛顿斜率权重，四点布局的总变差也能低于 $1\,031\,000$。**手工消元与区间计算。** 取 $t_j=\log x_j$，固定 $t_3=-5.66$、$t_4=-10^{-7}$。记 $a_j=p_jDk(x_j)$、$b_j=p_jDw(x_j)$，其中 $D=x\,d/dx$，$k,w$ 是单点的牛顿与真空读数。令 $a_1=-a_3$、$a_2=-a_4$，由 $DW=0$ 确定两对梯度的比例。权重归一后，Arb 区间计算在 $t_1\approx-14.99011407$、$t_2\approx-13.73849598$ 附近认证精确根，同时满足 $K=1$ 和 $W=10^{-122}$。四枚截止互异且均在 $(0,1)$ 内。

斜率比 $s_j=b_j/a_j$ 满足 $s_4<s_3<0<s_1<s_2$，因此中间的间隔把两对梯度分别切成等幅反号的两半。每对梯度都在同一权重部分内抵消，故两部分各自的牛顿斜率积分都为零。唯一的一阶最优速度 $v=(1,-1,1,-1)$ 在四个坐标上都触及位移上限，牛顿二阶项 $\tfrac12v^{\mathsf T}\nabla^2K(0)v$ 在 $(-0.37017,-0.37016)$ 内。总变差在 $1\,030\,993.80749$ 与 $1\,030\,993.80750$ 之间。 [消元推导与区间复算](https://github.com/the-omega-institute/trureturing-books/issues/2187#issuecomment-7240654018)

在上述五矩下，若正负部各有两个内截止并各自牛顿驻定，则 $T\le1\,030\,993.778$ 强制权重按截止递增排成 $(-,+,-,+)$，并把布局定位到同一解支。**手工推导与区间计算。** 每对的牛顿斜率各自相消，因此可给正权对和负权对使用不同的斜率系数。令 $d=Dk$、$\ell=Dw$、$h=w-\ell/2$，取 $F_\pm=k-d+\alpha h+\beta\ell+\lambda_\pm d$。若负权绝对质量为 $N$，正权质量就是 $N+1$。以横线表示对内按绝对权重取归一平均，五矩把 $(N+1)\overline{F_+}-N\overline{F_-}$ 固定为 $1+\alpha c$，其中 $c=10^{-122}$。每对分居 $d$ 的唯一零点两侧。矩界先把负权早节点限制在 $\log x>-15.4$。若正权早节点落到 $\log x\le-18$，则 $DW=0$ 要求它的搭档位于 $\log x>-10$，此时配对的权重比例又迫使 $W<0$。排除这一端后，四个节点到相应响应界的加权缺口总和小于 $6\times10^{-10}$。配对比例约束各节点的质量，先定位两枚早节点，再定位两枚晚节点，得到上述交错次序。 [全域定位的推导与区间复算](https://github.com/the-omega-institute/trureturing-books/issues/2245#issuecomment-7241270934) · [次序判定的推导与区间复算](https://github.com/the-omega-institute/trureturing-books/issues/2291#issuecomment-7241661527)

由此，$t_1,t_2$ 落在唯一根盒内，$t_3\in[-5.67,-5.64]$，$t_4\in[-10^{-3},0)$。沿该解支增加 $t_4$ 会严格降低总变差。闭包的边界 $t_4=0$ 上有唯一极小布局，因此正负部各有两个内截止且各自牛顿驻定这一类的全域下确界介于 $1\,030\,993.777$ 与 $1\,030\,993.778$ 之间。所有最小化序列都趋于该布局，合法内点只在 $x_4\to1^-$ 时逼近下确界。 [边界极小值的区间复算](https://github.com/the-omega-institute/trureturing-books/issues/2207#issuecomment-7241039259)

共同标度的驻定仍允许对单个截止的移动高度敏感。对单独检验截止敏感性的四点算例，移动最敏感的截止，相对移动不到 $8.6\times 10^{-120}$ 曲率就已转负，比上表的通用上界小 $800$ 倍以上，与 $311$ 单态实例同量级，截止之间的比值须精确到约 $120$ 位。$10^{-122}$ 的微调没有减少，只是转移并分摊到截止比值与权重上（[共同标度驻定及其代价](https://github.com/the-omega-institute/trureturing-experiments/blob/f516e0f09642194c1a309ffc0cfd94e129844b15/experiments/ch39-omega-research/replay/%E4%B8%A4%E7%82%B9%E6%88%AA%E6%AD%A2%E5%9C%A8%E5%8C%B9%E9%85%8D%E7%89%9B%E9%A1%BF%E9%A1%B9%E6%97%B6%E4%B8%8D%E8%83%BD%E9%A9%BB%E5%AE%9A%E7%9C%9F%E7%A9%BA%E8%AF%BB%E6%95%B0%E8%80%8C%E5%9B%9B%E7%82%B9%E6%B5%8B%E5%BA%A6%E5%AF%B9%E5%85%B1%E5%90%8C%E6%88%AA%E6%AD%A2%E6%A0%87%E5%BA%A6%E4%B8%80%E9%98%B6%E9%A9%BB%E5%AE%9A.md) · [区间证书](https://github.com/the-omega-institute/trureturing-experiments/blob/f516e0f09642194c1a309ffc0cfd94e129844b15/experiments/ch39-omega-research/replay/ch39-cutoff-scale-stationarity.py)）。

若要求移动截止时牛顿标定始终精确等于 $K=1$，真空读数还能翻负吗？固定这些驻定解的有符号权重 $p_j$，记单点牛顿、真空响应为 $k,w$，则 $K=\sum_jp_jk(x_j)$、$W=\sum_jp_jw(x_j)$，沿标定面有 $C=W$。在对数坐标 $u_j=\log(x'_j/x_j)$ 中，记 $a_j=p_jDk(x'_j)$、$b_j=p_jDw(x'_j)$，其中 $D=x\,d/dx$。在内部正规点 $a\ne0$，允许的速度满足 $a\cdot v=0$。各坐标限速 $|v_j|\le1$ 时，最大的一阶真空下降率为 $\min_\lambda\sum_j|b_j-\lambda a_j|$。任取 $\lambda$ 即给出上界。取 $b_j/a_j$ 按 $|a_j|$ 加权的中位数（仅计 $a_j\ne0$），令非零剩余量对应的速度取其符号的相反数，中位数处的速度即可补足约束并达到上界。

当一阶最优速度刚好触及盒面时，二阶补偿只能向盒内移动。把 $a,b$ 固定在起点，记 $S=\min_\lambda\sum_j|b_j-\lambda a_j|$，$F_*=\{v\in[-1,1]^n:a\cdot v=0,\ b\cdot v=-S\}$，并记 $\mathcal M=[\lambda_-,\lambda_+]$ 为全部加权中位数构成的区间。若 $a\ne0$ 且 $K,W$ 三次连续可微，半径 $r$ 的原盒内、沿 $K=1$ 的最小真空读数仍展开为 $c-Sr+Br^2+O(r^3)$。二阶系数为

$$
B=\min_{v\in F_*}\max_{\lambda\in\mathcal M}
   \tfrac12 v^{\mathsf T}\bigl(\nabla^2W(0)-\lambda\nabla^2K(0)\bigr)v.
$$

手工推导从位移 $u=rv+r^2z$ 出发。记 $\kappa(v)=\tfrac12v^{\mathsf T}\nabla^2K(0)v$，则标定要求 $a\cdot z=-\kappa(v)$，而每个已触边的坐标必须满足 $v_jz_j\le0$。任一最优乘子都给出 $b\cdot z\ge\lambda\,a\cdot z$。在允许的坐标方向中，若需降低牛顿读数，取实现下端点 $\lambda_-$ 的方向就能达到这个代价界。若需提高读数，则用上端点 $\lambda_+$。试点的标定余量可以用盒内 $O(r^3)$ 的位移补足。反过来，缩放后的精确最小点距一阶最优面至多 $O(r)$，因而两个端点的二阶式也给出所需的下界。

例如，取三节点 $x=(1/8,1/4,1/2)$、$p=(1/2,1/4,1/4)$，以 $k(x)=4x$、$w(x)=-(x-3/16)^3$ 作算例。一阶最优速度为 $(-1,-1,1)$。因为 $\kappa(v)=1/2$，须在二阶降低牛顿读数，第三坐标退入盒内，得到 $B=-87/2048$。若只代入第一节点的斜率比，则会低估 $9/256$。将 $w$ 反号后，所有坐标仍触边，但第一坐标退入盒内便能达到相应的二次型值。 [完整推导与精确有理复算](https://github.com/the-omega-institute/trureturing-books/issues/1953#issuecomment-7238876110)

从 $W=c=10^{-122}$ 出发，记 $R_*$ 为沿连续标定路径抵达 $W<0$ 所需的最小对数半径（取下确界），半径以路径上 $\max_j|u_j|$ 的最大值计。牛顿斜率非零的节点 $q$ 可作补偿，按当前位置取 $v_q=-\sum_{j\ne q}a_jv_j/a_q$，故沿全程 $dK/dt=0$。在半径 $10^{-113}$ 的盒内，区间计算验证了所选补偿速度的绝对值小于一，并给出 $-dW/dt$ 的正下界，足以使终点严格翻负。反向估计使用标量 $W-\lambda(K-1)$。它在两个标定端点分别等于相应的 $W$，沿盒内直线积分其梯度就给出任一标定终点翻负所需的位移下界。

在翻号尺度上，这条路径还给出原位移盒内的唯一最小值。对下表四组布局，取 $0<r\le4\times10^{-116}$。把补偿坐标的比较范围扩大到 $|u_q|\le1.7r$ 后，每组 $|u_j|\le r$（$j\ne q$）都有唯一的标定根。在整张标定图上，真空读数对非补偿坐标的偏导 $b_j-(b_q/a_q)a_j$ 保持严格定号。逐坐标取使读数下降的端点 $u_j=\pm r$，便得到唯一的最小角点。沿这个角点随半径移动的路径，补偿速度的绝对值小于 $0.999$，所以最小点始终落在原盒的 $|u_q|<r$ 内。

记 $S$ 为初始点的最大一阶下降率，$\phi(r)$ 为原盒内的最小真空读数。沿角点路径对 $K=1$ 两次求导，可以消去补偿坐标的加速度。以 $v$ 表示初始速度、$\lambda=b_q(0)/a_q(0)$ 表示初始斜率之比，$\phi(r)=c-Sr+Br^2+O(r^3)$ 的二阶系数为

$$
B=Q(v),\qquad Q(v)=\tfrac12 v^{\mathsf T}\bigl(\nabla^2W(0)-\lambda\nabla^2K(0)\bigr)v.
$$

若初始约化斜率 $d_j=b_j(0)-\lambda a_j(0)$ 有零分量，一阶下降率便可能在一整张面上相同。记 $F$ 为完整标定图上的一阶最优方向集。取 $a(0)\cdot v=0$、$|v_j|\le1$（$j\ne q$），并让每个 $d_j\ne0$ 的坐标取 $v_j=-\operatorname{sgn}(d_j)$。设两个读数在原点邻域三次连续可微。若 $Q$ 在这张面上有一个最小方向满足 $|v_q|<1$，则二阶系数为 $B=\min_{v\in F}Q(v)$。

手工推导从完整隐函数图出发。非零斜率在一个足够小的比较盒内保持符号，因此可逐坐标固定使读数下降的端点。把余下的方向按 $r$ 缩放，图上位移为 $u=rv+O(r^2)$，余项在 $F$ 上一致。展开 $W-\lambda(K-1)$ 时，补偿坐标的线性系数为零，故其二阶位移修正不会进入线性项。于是图上读数一致展开为 $c-Sr+r^2Q(v)+O(r^3)$，其中 $S=\sum_{j\ne q}|d_j|$。在完整图上取最小值得到下界，补偿严格内点的最小方向则给出原盒内达到同阶精度的试点。

四节点多项式算例中，二次型选出的自由速度为 $1/39$，位于许可区间内部。三节点触边算例中，精确标定迫使一个非零斜率坐标以 $r^2$ 阶退离端点，使真二阶系数比原单位切盒的一阶最优方向上算出的 $Q$ 多 $9/256$。[手工推导与精确有理复算](https://github.com/the-omega-institute/trureturing-books/issues/1932#issuecomment-7238778063)

对表中的四组非退化布局，把同一求导式用在整条角点路径上，区间计算给出 $|\phi''(r)|<3S$。因此 $\phi$ 在半径 $(1-10^{-115})c/S$ 处仍为正，在 $(1+10^{-115})c/S$ 处已为负。原盒内的最小值排除了前一半径内的翻号，角点路径在后一半径内给出了连续的翻号路径。这个相对误差界衡量沿精确标定面作线性近似的误差。表中的十进制区间还包含初始布局的数值不确定性。[最小路径的手工推导与区间复算](https://github.com/the-omega-institute/trureturing-books/issues/1843#issuecomment-7238331172)

| 可见谱与驻定布局 | $R_*$ 的区间 | 只动两点的充分半径 |
| --- | --- | --- |
| #11661，四点 | $[2.05401,2.05424]\times10^{-120}$ | $3.500\times10^{-120}$ |
| #11934，四点 | $[1.59458,1.59476]\times10^{-119}$ | $3.021\times10^{-119}$ |
| #12207，四点 | $[2.05609,2.05632]\times10^{-120}$ | $3.834\times10^{-120}$ |
| #11661，六点 | $[3.41190,3.41228]\times10^{-116}$ | $6.816\times10^{-116}$ |

只动两点时，一个节点推动真空读数下降，另一个补偿牛顿读数。表中两列均使用平方截止 $x=Q^2/M_P^2$ 的对数，换成 $\max_j|\Delta\log Q_j|$ 时，所有界均除以二。

表中四组布局的翻号半径还可用一个二次式估计。令 $\phi(r)$ 为半径 $r$ 内精确标定的最小真空读数。在翻号尺度上，各非补偿节点取各自的下降端点，补偿节点沿 $K=1$ 移动。记 $S=-\phi'(0)$、$B=\phi''(0)/2$，则 $c-Sr+Br^2$ 的近端正根为

$$
\widehat r=\frac{2c}{S+\sqrt{S^2-4Bc}}.
$$

沿最小读数路径三次求导，用 $K=1$ 消去补偿节点的三阶导数，便可估计二次式的余项。四组布局的 Arb 区间计算都给出 $\phi'''<0$ 与 $-\phi'>0$，覆盖从零到 $\widehat r$ 以及首次翻号边界的区间。因此 $\phi(\widehat r)<0$。Taylor 余项给出 $\widehat r$ 处的读数误差，再由中值定理除以途中下降斜率，得到 $0<(\widehat r-R_*)/\widehat r<10^{-231}$。这个界针对精确布局的近似误差，表中十进制区间仍受初始布局包络宽度限制。[手工推导与区间复算](https://github.com/the-omega-institute/trureturing-books/issues/1900#issuecomment-7238653866)

相同的三枚可见谱也允许翻号永远不可达的标定布局。取二节点匹配族中充分小的 $y>0$，另一节点 $x(y)$ 趋向满足 $w(x_*)/k(x_*)=c$、$k(x_*)>0$ 的内部点 $x_*>0$。这族解的起始值精确满足 $K=1,W=c$。因 $k(y)\to0$ 且 $k(x)<1$，充分小的 $y$ 给出 $x>y$，对应的权重为 $p=(1-k(y))/(k(x)-k(y))>1$ 和 $1-p<0$。将此处的权重固定。沿 $K=1$ 的连续路径，若两点相遇于 $z$，即有 $1=k(z)$，与全域 $k(z)<1$ 相矛盾。因此两点始终保序。由偏振前缀界得 $w$ 为正且严格递增，故 $W=w(y')+p(w(x')-w(y'))>0$。这两点满足起始匹配条件，四点与六点表中的共同标度驻定是额外条件。[标定路径与节点次序的区间证书](https://github.com/the-omega-institute/trureturing-experiments/blob/969e8412d3419bc6718ef060093016aa5a6f8dff/experiments/ch39-omega-research/replay/ch39-newton-preserving-cutoff.md)

同一 #11661 可见谱也有四点驻定布局，其一阶最优速度在四个坐标上都达到位移上限。取 $t_j=\log x_j$，前两个节点为 $-21.61,-21.58$，后两个约为 $-14.14124534,-14.12911366$。先令 $a_1=-a_4,\ a_2=-a_3$，再用真空读数的驻定条件确定两对斜率权重的比例。由 $\sum_jp_j=1$ 归一化后，区间压缩证书给出其余两个节点，使 $K=1$、$W=10^{-122}$ 均精确成立。此时 $s_j=b_j/a_j$ 随节点严格递增，前两点与后两点各占 $\sum_j|a_j|$ 的一半，故整段 $[s_2,s_3]$ 都是一阶最优乘子。

唯一一阶最优速度为 $v=(1,-1,-1,1)$，而牛顿读数沿 $v$ 的二阶项系数 $\kappa=\tfrac12 v^{\mathsf T}\nabla^2K(0)v$ 在 $(-0.683,-0.681)$ 内。为了精确配平，二阶内向位移必须提高 $K$。盒内所有能提高 $K$ 的坐标方向中，第三坐标的线性真空代价最小，故二阶系数取 $B=\tfrac12 v^{\mathsf T}\nabla^2W(0)v-s_3\kappa$，落在 $(1.486,1.489)\times10^{-5}$ 内。若采用同样满足一阶最优条件的 $s_2$，二阶系数会少算约 $1.50\times10^{-5}$。这个见证布局的权重总变差约为 $2.99\times10^{10}$。 [手工消元与区间复算](https://github.com/the-omega-institute/trureturing-books/issues/1982#issuecomment-7239007009)

这里的除差以 $s=-\Psi_0/A$ 为横坐标，其中 $A=1+L$，$L$ 是质量加权的指数积分项。按质量排序的谱满足有符号偏振前缀非正、总和为负。对 $0<x\le1$，同一谱给出 $|L|\le1.2205\times10^{-4}$，而 $DL=(2\pi)^{-1}\sum_i\alpha_i z_i e^{-z_i/x}$ 的上界为正权质量矩 $(2\pi)^{-1}\sum_i\max(\alpha_i,0)z_i<2.494\times10^{-6}$，其中 $D=x\,d/dx$，$z_i$ 是无量纲平方质量，$\alpha_i$ 是牛顿读数的谱系数。于是 $A>0$、$A-DA>0$。在单调性定理中取分母 $B=-A$ 即得 $s$ 严格递增。除差符号使用上面的区间证书。[归一化有符号热迹的单调性](lean:D5/S3/Analytic/Asymptotics/NormalizedSignedHeatTrace.normalized_cutoff_heat_strictMono)

若第三个截止达到 $\log x_3\ge-22.5$，把两道除差的固定线性组合视为 $s$ 的函数，记其二阶导数为 $h$。以 $s(e^{-26.875})$、$s(e^{-25.3125})$、$s(e^{-22.5})$ 依次为 $a,b,d$。区间证书给出 $[a,b]$ 之外的 $h<0$。若节点跨过 $[a,b]$ 的一部分，帐篷核在这部分的最大值控制正部，再用同一点到 $d$ 的弦控制右侧的负部。若首节点不小于 $b$，整个节点区间的内部已经定号。只要 $[a,b]$ 上 $h$ 的正部积分小于 $[b,d]$ 上 $-h$ 乘权重 $(d-s)/(d-a)$ 的积分，相邻弦斜率就严格下降，二阶除差为负。前面的区间证书核验了三枚可见谱的符号和积分界。[三节点除差的符号判据](lean:D5/S3/Analytic/Interpolation/ConcaveKernelDividedDifference.three_node_slope_sub_slope_neg_of_lobe_bound)

在这三枚候选的固定可见谱上，这种灵敏度还有一个覆盖任意布局的界。令 $w(x),k(x)$ 为零裸项、无隐场的单截止真空与牛顿读数，并令固定带号权 $p_i$ 的和为一。原布局满足 $W=\sum_i p_iw(x_i)=c$ 与 $K=\sum_i p_ik(x_i)=1$。记 $D=x\,d/dx$、$T=\sum_i|p_i|$、$L=\sum_i|p_i|x_i$、$J=\sum_i|p_i|x_i^2$。对可见谱的偏振前缀分部求和给出 $ax^2\le Dw(x)\le bx^2$，可取 $a=62/(4\pi)$、$b=958/(4\pi)$。由牛顿权重还得 $|k(x)|,|Dk(x)|\le Bx$，可取 $B=32$。这些界在整个正截止轴成立。独立移动 $\log x_i$ 时，以最大单点位移为单位，最坏方向的真空导数为 $S_W=\sum_i|p_i|Dw(x_i)$，因而
$$
 S_W\ \ge\ aJ\ \ge\ a\max\{1/(B^2 T),\,\min_i x_i/B,\,2c/b\}.
$$
三项分别来自 $1\le BL$ 与 $L^2\le TJ$、$J\ge(\min_i x_i)L$，以及 $w(x)\le bx^2/2$。在 $n$ 个节点中，最敏感的单点至少能达到 $S_W/n$。在 $K=1$ 处曲率的相应导数为 $S_C=\sum_i|p_i||Dw(x_i)-2cDk(x_i)|$。记 $r=\max\{\min_i x_i,1/(BT)\}$，则 $S_C\ge(a-2cB/r)J$。

有限形变取 $x_i(t)=x_i e^{-\operatorname{sgn}(p_i)t}$。沿途有 $W(t)\le c-aJ(1-e^{-2t})/2$ 与 $|K(t)-1|\le BL(e^t-1)$。若 $aJ\ge8c$，取 $t=2c/(aJ)$ 即得到 $W(t)<0$。若另有 $4Bc/(ar)<1$，全程保持 $K>0$，曲率随真空读数一同翻号。例如 $T\le10^6$ 时，取 $t<4.2\times10^{-114}$ 即可翻负，而且始终有 $|K-1|<8.4\times10^{-114}$。这些位移用 $\log x=2\log(Q/M_P)$ 计。若不许向上越过普朗克截止，可只下调正权节点。由真空匹配式，其平方和 $J_+$ 至少为 $aJ/(2b)$。若 $aJ_+\ge8c$，只下调这些节点 $t_+=2c/(aJ_+)$ 即有 $W<0$。当 $BL(1-e^{-t_+})<1$ 时，沿途的牛顿读数保持为正。

在仅要求两条匹配方程和权重归一化时，正的导数下界仍允许翻号距离任意大。在小 $x$ 处，无质量层给出 $k(x)\sim x/(12\pi)$、$w(x)/k(x)\sim93x$。质量间隙使正质量层的修正呈指数衰减。对 $c=10^{-122}$，方程 $w(x_*)/k(x_*)=c$ 在 $c/186<x_*<2c/93$ 有单根。取两个节点 $x,y$，令权重为 $(p,1-p)$，其中 $p=(1-k(y))/(k(x)-k(y))$，即精确匹配 $K=1$。对充分小的 $y>0$，隐函数定理给出精确匹配 $W=c$ 的 $x=x(y)\to x_*$。负权趋于有限值 $1-1/k(x_*)$。在任意固定的独立对数位移盒内，负权的真空贡献一致趋零，正权贡献则有严格正的最小值。这族布局有量级为 $1/c$ 的共同有限总变差上界。这样的预算仍可能容许任意大的翻号半径。

若布局另有共同标度驻定，则真空读数沿共同标度的导数为零，故 $aJ_+\le bJ_-$，其中 $J_-$ 是负权节点的加权平方和。下调正权、上调负权时有 $W(t)\le(bJ_+e^{-2t}-aJ_-e^{2t})/2$，故任意 $t>\tfrac12\log(b/a)$ 都给出 $W<0$。若设普朗克上限，只下调正权节点，对 $t>\log(b/a)$ 仍有 $W<0$。两种变形中的 $K(t)$ 都是解析函数，且 $K(0)=1$，故任意位于上述范围的开时间区间都包含曲率为负的点。

这三枚固定谱的无条件曲率灵敏度也严格为正。令 $s$ 为 $H(x)=Dw(x)-2cDk(x)$ 的唯一正零点。正质量层使 $s>x_*$。用 $(j-1)E_j(u)+uE_{j-1}(u)=e^{-u}$ 可把判断化为 $x_*$ 处的指数小余项。一个质量小于 $57\kappa$ 的带荷重层压倒质量均大于 $96\kappa$ 的负普罗卡贡献。令 $q=w(s)/k(s)>c$，小截止段和其余正轴上的估计给出 $|w(x)-qk(x)|\le50|H(x)|$。按带号权求和即得 $S_C\ge(q-c)/50>0$。这个下界可以比 $c$ 小一个指数因子。[完整推导与谱校验](https://github.com/the-omega-institute/trureturing-experiments/blob/d59dc6b6a7e2877bc0181d62646a02180e34a09a/experiments/ch39-omega-research/replay/ch39-independent-cutoff-sensitivity.md)

在背后支撑上述多矩独立性检验（例如判断真空值、牛顿常数与截止/希格斯斜率这三条实响应向量究竟是否线性无关，或衡量三枚候选零点响应空间的非退化体积）的，是实内积空间中三锚格拉姆（Gram）行列式的精确展开恒等式。该恒等式已由 Lean 4 内核冻结验证：

::: {.theorem #thm-ou-ch11-three-anchor-gram title="三锚实格拉姆行列式展开公式" lean="D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula"}
设 $E$ 为任意实内积空间（`[NormedAddCommGroup E]`、`[InnerProductSpace ℝ E]`），$u, v, w \in E$ 为任意三个向量，记 $G(u, v, w)$ 为其 $3\times 3$ 格拉姆矩阵（矩阵元为两两实内积 $\langle\cdot,\cdot\rangle_{\mathbb{R}}$，记为 `threeAnchorGram u v w`）。则其行列式精确满足

$$
\det G(u, v, w) = \|u\|^2\|v\|^2\|w\|^2 + 2\langle u, v\rangle\langle u, w\rangle\langle v, w\rangle - \|u\|^2\langle v, w\rangle^2 - \|v\|^2\langle u, w\rangle^2 - \|w\|^2\langle u, v\rangle^2.
$$

:::

::: proof
记 $a = \|u\|^2 = \langle u, u\rangle$、$b = \|v\|^2 = \langle v, v\rangle$、$c = \|w\|^2 = \langle w, w\rangle$，以及非对角实内积 $x = \langle u, v\rangle$、$y = \langle u, w\rangle$、$z = \langle v, w\rangle$。由实内积对称性，$G(u, v, w)$ 为对称三阶矩阵；按第一行展开三阶行列式得 $a(bc - z^2) - x(xc - yz) + y(xz - by) = abc + 2xyz - az^2 - by^2 - cx^2$，代回即证。完整证明由 Lean 内核检查。
:::

[@thm-ou-ch11-three-anchor-gram] 属于纯实内积代数（不宣称形式化任何引力动力学），但它精确刻画了多约束系统何时线性独立、何时塌缩为刚性依赖——而这正是下一节在“零点多目标联立”与“逐层热迹抵消”中反复遭遇的核心几何结构。

## 11.3 四层 $(-1, 3, -3, 1)$ 有限正真空配平与电弱破缺代价 {#sec-ch11-four-layer-ewsb}

$311$-单态方案之所以对截止如此脆弱，是因为它靠不同质量之间 $O(Q^4)$ 发散项的偶然抵消去拼出 $10^{-122}$。有没有办法让发散项在**一切**紫外截止下都精确相消，只留下一小块自然有限、严格为正的真空能？

### 11.3.1 对称点逐层配平、四层正真空与正下密度联合命中 {#sec-ch11-four-layer-hits}

若同时允许最小耦合实标量与规范单态**狄拉克费米子**，能否只在几个截止处测量真空密度，就判定每个质量层的净偏振数都为零？在 [@def-ou-ch11-four-layer-vacuum] 的零裸真空项约定下，令 $u=1/x$，按平方质量 $z_i$ 递增排列各层，合并同层偏振数 $g_i$。换积分变量得到

$$
F(u):=-32\pi^2\rho/M_P^4=\int_u^\infty H(t)\,\frac{dt}{t^3},
\qquad H(t)=\sum_i g_i e^{-z_i t}.
$$

**手工推导。** 对有限谱，若至少一个 $g_i$ 非零，删去零项后记符号交替次数为 $s$。指数 $-z_i$ 严格递减，故 $H$ 的不同实零点至多有 $s$ 个。若 $F$ 在 $r\ge1$ 个不同正逆截止为零，相邻两点间及最后一点至无穷远的尾区间上，$H(t)/t^3$ 的积分各为零。正权重与连续性保证每个开区间内至少有一个 $H$ 的零点，故 $r\le s$。这就把开区间上的逐层配平判据化成了有限观测判据。所引冻结声明给出 $H$ 的零点界。[指数和的符号交替界](lean:D5/S3/Analytic/ExponentialSum/DescartesRule.zero_bound)

把正负偏振分别看作两座正权谱塔。若参考塔恰有 $d\ge1$ 个不同质量层，全为正质量时，任意 $2d+1$ 个不同正逆截止的真空密度精确配平就强制两塔逐层相等；若其中一层无质量，只需 $2d$ 个。即使对照谱有无限多层，只要它在最小逆截止的固有时积分有限，正塔的热迹随 $t$ 递减，因此在该逆截止右侧有限，并由控制收敛定理知其连续。积分配平给出的热迹相等点数，恰好达到[第五章 §5.1](ch05-kinetic-trace-and-uv-ceilings.md#sec-ou-ch05-s01) 的非等距判据。

为什么少测一次就会留下歧义？记 $m$ 为上述次数减一，并固定这 $m$ 个逆截止 $u_j$。用新层与参考层交错排列成 $m+1$ 个节点，最后一个是新层；首个节点在全正质量情形是新层，在无质量情形是参考层 $0$。每个节点 $z$ 给出一列读数 $B(u_j,z)=\int_{u_j}^\infty e^{-zt}t^{-3}\,dt$。任取 $m$ 列都可逆，否则非零的至多 $m$ 项组合在 $m$ 个截止为零，超过其符号交替上界。这些有序子式同号，因为连续移动有序节点时行列式始终非零。依次删列所得的带号余子式因而正负交替，构成读数矩阵的零向量。选取其负项落在参考层，向原谱加上这个向量的足够小的正倍数，便得到一座读数完全相同的不同正权塔。这里允许任意给定的正实参考权重。

**在一个截止处读取导数（手工推导）。** 若两份正权谱的总权重已知且相等，并且平方质量均在 $[0,Z]$（$Z>0$）内，可以把观测集中在同一个逆截止 $u_0>0$。参考谱占据 $d\ge1$ 层，其中 $e$ 层在区间端点。此时从 $F(u_0)$ 开始连续取到第 $2d-e-1$ 阶导数，恰好足以判定逐层配平。因为 $-u^3F'(u)$ 是热迹，这些导数逐项读出由 $e^{-u_0z}$ 加权的平方质量矩，函数值则保留一个固有时尾积分。把这些观测函数乘以 $e^{u_0z}$ 后，逐次应用 Rolle 定理可控制零点数。于是可以用观测的线性组合构造一个非负函数，让它恰在参考内层取双零点、在参考端层取单零点。该函数对两谱的积分都为零，因而对照谱只能占据同样的层，各层权重随后由矩方程确定。少取一项时，上文的交替子式构造仍给出同总权重的反例。[矩空间的边界唯一性](https://arxiv.org/html/1306.4872#S2) · [固有时核的推导](https://github.com/the-omega-institute/trureturing-books/issues/1824#issuecomment-7238099277)

例如取 $u_0=1$、$Z=2$，在 $z=1/2$ 和 $3/2$ 各放一份单位权重。用总权重、$F$、$F'$ 和 $F''$ 构造有序子式，便可从两层各移出少量权重，转放到 $z=0,1,2$，精确保留这四项数据。第四项真空读数 $F'''(1)$ 随之上升约 $0.00643933$。同一个截止位置因此也能区分这两份谱，前提是掌握足够多阶的精确导数。[两层算例复算](https://github.com/the-omega-institute/trureturing-books/issues/1824#issuecomment-7238099277)

**真空与热迹取在不同截止（手工推导，`ARGUED`）。** 两份正权谱的总权重相同、已知且为正，裸真空项取零，平方质量均在 $[0,Z]$ 内，$0<Z<\infty$。若参考谱只占一层，能否在 $u>0$ 测真空 $F(u)$，在另一个 $v>0$ 测热迹 $H(v)$？把总权重归一化为 $1$，令 $x=e^{-vz}$、$a=e^{-vZ}$、$f(x)=B(u,-\log(x)/v)$。热迹给出 $x$ 的均值，真空读数给出 $f(x)$ 的均值。若 $f$ 严格凸，Jensen 不等式取等就能认出单层。由此得到识别**每个**单层的锐条件

$$
v\le R_u(Z),\qquad R_u(z)=\frac{I_1(z)}{I_2(z)},\qquad I_j(z)=\int_u^\infty t^{-j}e^{-tz}\,dt .
$$

事实上，$v^2x^2 f''(x)=I_2(z)(R_u(z)-v)$。在 $z>0$ 处，$R_u$ 是按 $[u,\infty)$ 上密度正比于 $t^{-2}e^{-tz}$ 的分布计算的固有时均值，其导数是方差的相反数。它从 $z\downarrow0$ 时的无穷大严格降至 $R_u(Z)>u$。故阈值取等时曲线内部仍严格凸。超过阈值时，曲线沿 $x$ 增大的方向先凹后凸。在两段内各取一个中心和相同的充分小步长 $h$，则 $f(x-h)+f(x+h)-2f(x)$ 在两个中心异号。中间某处两态 $(x-h,x+h)$ 与重合的两态 $(x,x)$ 就有相同的两项读数。

对指定的参考坐标 $s\in(a,1)$，只需看切线在两端的余差 $D_s(y)=f(y)-f(s)-f'(s)(y-s)$。单层可唯一识别，当且仅当 $D_s(a)D_s(1)\ge0$。曲率至多变号一次，因此两端余差同号或有一个为零时，曲线始终在切线同侧，除 $s$ 外至多还接触一个端点。同读数迫使权重全在接触点上，均值 $s$ 排除了那个端点的权重。两端余差异号时，把一端与 $s$ 另一侧的近点连成弦，两种选端方式在 $s$ 处的弦高分居 $f(s)$ 两侧。连续移动弦端便可用两层正权精确复现读数。若 $s$ 本身是端点，单凭均值就能识别。[端点判据的推导与整数两态算例](https://github.com/the-omega-institute/trureturing-books/issues/1689#issuecomment-7239914242)

若两项归一化读数都有误差，记最大绝对差为 $\varepsilon$，用平方质量坐标中的 $W_1$ 度量对照谱到单层的距离。固定 $u,v,Z$，当 $v<R_u(Z)$ 时，这个距离为 $O(\varepsilon^{1/2})$，常数对所有参考层一致。阈值 $v=R_u(Z)$ 处，一致界变为 $O(\varepsilon^{1/3})$。此时任意固定内层仍有平方根界，两端点则始终由热迹单独给出线性界。

这两个指数来自切线余差。阈值以下，$f''$ 在区间内部有严格正的统一下界。阈值处，$f''(a)=0$，而正的固有时方差使 $f'''(a)>0$，从而 $f''(x)\ge c(x-a)$，其中 $c>0$。沿线段积分，$D_s(x)$ 至少为常数乘 $|x-s|^2$ 或 $|x-s|^3$。其谱平均由两项读数误差控制，因为 $f'$ 有界。Jensen 不等式和 $|x-s|\ge va|z-z_*|$ 随即给出距离界，其中 $z_*$ 是参考平方质量。将固定内层在 $x$ 坐标等权分到两侧，热迹精确相同，真空误差为二阶。阈值处取参考坐标 $s=a+h$，等权分到 $a$ 和 $a+2h$，热迹仍精确相同，真空误差为三阶，而距离仍与 $h$ 同阶。这两种拆分给出锐性。[统一误差界与固有时积分复算](https://github.com/the-omega-institute/trureturing-books/issues/1689#issuecomment-7240850180)

超过阈值后，只要参考层满足端点识别判据，仍有平方根界。这个界对固定 $u,v,Z$ 下的所有可识别参考层一致，包含切线恰好再接触质量带端点的情形。设拐点为 $c$。拐点切线在两端的余差异号，因此可识别内层与 $c$ 相隔一段正距离。对其中一层 $s$，令 $\sigma=\operatorname{sgn}f''(s)$，并记 $Y=\max\{\sigma(x-s),0\}$。沿 $Y>0$ 的方向，曲率符号相同，绝对值有统一正下界 $m$。这里用到 $f''(a)<0$，以及 $I_1(z)\to\infty$ 而 $I_2(z)\le1/u$，从而 $f''(x)\to+\infty$ 当 $x\uparrow1$。因此 $\sigma D_s(x)\ge mY^2/2$，另一侧也有 $\sigma D_s(x)\ge0$。热迹控制两侧位移之差，因为 $\mathbb E|x-s|=2\mathbb E Y-\sigma(\mathbb E x-s)$。对切线余差取谱平均，再用 $f'(s)\le1/(uva)$，得到 $\mathbb E Y^2\le 2(1+1/(uva))\varepsilon/m$。于是

$$
vaW_1\le 2\sqrt{\frac{2(1+1/(uva))}{m}\,\varepsilon}+\varepsilon .
$$

内层的等权拆分表明指数 $1/2$ 仍是锐的。若切线再接触端点 $e$，也可把一小份权重 $h/(|e-s|+h)$ 放在 $e$，其余放在 $s+\sigma h$。这个拆分精确保持热迹。端点上的切线余差为零，故真空误差为二阶，而移到端点的权重与平方质量输运距离都与 $h$ 同阶。[端点接触的手工推导与区间复算](https://github.com/the-omega-institute/trureturing-books/issues/1689#issuecomment-7241164027)

若切线接触重端 $a$，同时容许两项读数有误差，可以求出固定接触层的锐常数。记 $p=f'(s)$、$k=f''(s)>0$，并令 $\omega_s(\varepsilon)$ 为误差至多 $\varepsilon$ 时所有正对照谱的平方质量输运距离的上确界。则

$$
\lim_{\varepsilon\downarrow0}\frac{\omega_s(\varepsilon)}{\sqrt{\varepsilon}}
=\left(\frac{1}{vs}+\frac{Z-z_*}{s-a}\right)\sqrt{\frac{2(1+p)}{k}} .
$$

参考层附近的二次余差把热迹坐标的平均绝对位移控制在 $\sqrt{2(1+p)\varepsilon/k}$ 的首项内。重端附近的余差从零线性上升，所以这里的权重可以移到 $a$ 而只引入 $O(\varepsilon)$ 的输运误差。热迹平衡把这个重端权重限制在平均位移除以 $s-a$ 的首项内。公式中的两项分别将参考层的位移与重端权重换算成平方质量距离。达到首项的两层谱把权重放在 $a$ 与 $s+h$，使热迹差为 $-\varepsilon$、真空差为 $+\varepsilon$，从而用足切线余差的预算 $(1+p)\varepsilon$。[锐常数的手工推导、近阈值一致极限及区间复算](https://github.com/the-omega-institute/trureturing-books/issues/1689#issuecomment-7241652592)

临近阈值时，重质量端旁有一段不能识别的内层，而端点本身仍由均值识别。固定 $u,Z$，令 $v_0=R_u(Z)$、$\delta=v-v_0>0$，记 $V=-R'_u(Z)>0$ 为平方质量 $Z$ 处的固有时方差。当 $\delta$ 充分小时，全部可识别层为 $[0,z_c]\cup\{Z\}$，其中

$$
Z-z_c=\frac{3}{2V}\delta+O(\delta^2).
$$

边界 $z_c$ 对应的切线恰好再次接触重质量端 $a$。若 $d=Z-z_*$，则 $D_s(a)=B(u,Z)-B(u,Z-d)+I_2(Z-d)(1-e^{-vd})/v$。将余差除以 $I_2(Z)d^2$ 后在 $d=0$ 延拓，得到 $-\delta/2+Vd/3+O(\delta d+d^2)$，其零点给出上式。由于 $\partial_s D_s(a)=(s-a)f''(s)$，重端余差先降后升，只有这一处内点零点。轻端余差 $D_s(1)$ 则先升后降至零，且 $D_a(1)$ 在阈值处严格为正，故略超阈值时所有内点的轻端余差仍为正。取 $u=1$、$Z=3$ 时，只要 $0<\delta\le 1/200$，上述识别范围就成立，且 $0<3-z_c<28\delta$。在整个区间内，上述接触层的局部常数也给出所有可识别单层在任意正读数误差下的锐统一平方根界。[手工推导与区间复算](https://github.com/the-omega-institute/trureturing-books/issues/1689#issuecomment-7242151559)

在这一临界邻域内，对所有可识别单层和所有正误差对照概率谱，$W_1/\sqrt{\varepsilon}$ 的上确界为 $K_c$，且每个比值都严格小于 $K_c$。固定接触层 $s_c=e^{-vz_c}$，令 $\omega_{s_c}(\eta)$ 为归一化读数误差满足 $\varepsilon\le\eta$ 时，对照谱到该层的平方质量输运距离 $W_1$ 的上确界。于是

$$
\begin{aligned}
K_c&=\lim_{\eta\downarrow0}\frac{\omega_{s_c}(\eta)}{\sqrt{\eta}}\\
&=\left(\frac{1}{vs_c}+\frac{Z-z_c}{s_c-a}\right)
\sqrt{\frac{2(1+f'(s_c))}{f''(s_c)}}.
\end{aligned}
$$

在 $a$ 和 $s_c+h$ 放置两层，调节权重，使归一化热迹和真空读数相对于参考层的差分别为 $-\varepsilon$ 和 $+\varepsilon$。当 $h\downarrow0$ 时，这些对照谱的比值趋于 $K_c$。热迹偏低时，承载重侧位移的权重会减少轻侧可用的权重。对轻侧位移使用带该权重的 Cauchy–Schwarz 界，就能抵消热迹偏低带来的增量。随着 $\delta\downarrow0$，$K_c=\Theta(\delta^{-1/2})$。 [临界展开](https://github.com/the-omega-institute/trureturing-books/issues/1689#issuecomment-7241441212) · [固定接触层的锐常数](https://github.com/the-omega-institute/trureturing-books/issues/1689#issuecomment-7241652592) · [全误差锐界的手工推导与复算](https://github.com/the-omega-institute/trureturing-books/issues/1689#issuecomment-7241841089)

**固定整数重数的锐界（`ARGUED`）。** 参考谱各质量层有正整数个态，对照谱也允许任意正整数重数。按平方质量递增排列参考谱的正质量层。设其中 $h$ 层有至少两个态，其余是单态层。用这 $h$ 层隔开单态层，得到长度依次为 $\ell_0,\ldots,\ell_h$ 的连续段，允许空段。任意预先选定的互异正逆截止中，确定参考谱所需的读数恰为 $r+1$ 次。参考谱含零质量时取 $\delta=1$，否则取 $\delta=0$。

$$
r=
\begin{cases}
2h+\ell_0+2\sum_{j=1}^h\lfloor\ell_j/2\rfloor,&\delta=0,\\
1+2h+2\sum_{j=0}^h\lfloor\ell_j/2\rfloor,&\delta=1.
\end{cases}
$$

全为单态层时，通常需 $d+1$ 次。若含无质量层且参考谱总层数 $d$ 为偶数，则需 $d$ 次。每个正质量层都有至少两个态时，整数谱达到上面的实权锐界。

记 $C(z)$ 为截至平方质量 $z$ 的对照态数减参考态数。由 $B(u,z)=\int_z^\infty A(u,w)\,dw$ 与 $A(u,w)=\int_u^\infty e^{-wt}t^{-2}\,dt$，两谱的读数差等于 $\int_u^\infty t^{-2}L(t)\,dt$，其中 $L(t)=\int_0^\infty e^{-zt}C(z)\,dz$。对两谱的非负累计数分别换序。最小逆截止处读数有限，保证其右侧的两个 Laplace 变换有限且连续。相邻采样点之间和末点之后各给出一个 $L$ 的零点。若 $C$ 非零且有 $s$ 次变号，取 $L$ 的 $s+1$ 个不同零点将导致矛盾。以这些零点为指数参数作线性组合，在 $C$ 每次换号处各插一个零点。指数和的零点按重数至多有 $s$ 个，故所插零点均为单根。选择总体符号使指数和在 $C$ 非零处与它同号，则两者乘积的积分严格为正。按 $L$ 的定义展开，它却等于零。

累计数从正转负，必须经过一个多态参考层，或在同一连续段内经过至少两个单态参考层。不同转折使用互不重叠的参考层。若从正开始，所有正质量层给出的转折预算为 $m=h+\sum_{j=0}^h\lfloor\ell_j/2\rfloor$，总变号数至多 $2m$。若从负开始，最早的参考层也已经耗用，有 $m'$ 次正转负的预算，其中 $m'$ 按去掉最早参考层后的序列计算。总变号数至多 $1+2m'$。无质量层不能用于任何正转负，因此含无质量层时的上界为 $1+2m$。无零质量时，去掉最早参考层使预算恰减一，唯有首段长度为奇数时预算不变。两种起始符号合起来给出 $s\le r$，故 $r+1$ 次读数保证逐层相等。

为在任意 $r$ 处保留歧义，给对照谱加一个平方质量为 $X$ 的单位态，再移动部分参考态恢复原读数。无零质量时选中全部首段单态层，其余各段各取偶数个，至多舍弃末尾一个。含零质量时各段都这样取，并将整个无质量层作为一个可移动质量。所选单态层和无质量层各提供一个位移参数。对每个正质量多态层，将原来同处于 $z$ 的 $w$ 个态放在 $z+a-(w-1)\sqrt v$ 和 $z+a+\sqrt v$，两处各放一个和 $w-1$ 个。参数 $a$ 移动平均质量，$v\ge0$ 使两处质量分离。两处的一阶根号项相消，故读数关于 $v$ 在零处的导数是 $w(w-1)B_{zz}(u,z)/2$。沿切线延拓到 $v<0$ 可得一阶连续可微的映射。无质量层的位移也可按 $B_z(u,0)=-1/u$ 作切线延拓。

这 $r$ 个参数的雅可比矩阵 $J$，按参数所属质量递增排列各列。每个可动质量的位移列正比于 $-A(u,z)$，每个分离参数列紧随其后，正比于 $-\partial_z A(u,z)$，比例系数均为正。相关的有序子式都非零。否则按相邻截止和尾积分可得一个含 $n$ 个系数的指数多项式有至少 $n$ 个不同零点。乘一个指数因子，再用微分消去首个多项式块，Rolle 定理归纳给出至多 $n-1$ 个零点。纯 $A$ 列的 $n$ 阶子式符号为 $(-1)^{n(n-1)/2}$，可令所有质量同时放大，让行列式中逆序配对的指数项主导。把相邻两质量作正向差商并令它们合并，便得到同样的符号，包括紧随其原列的导数列。

令 $b_j=B(u_j,X)$。逆函数定理给出参数向量 $-J^{-1}b+o(\lVert b\rVert)$，其中 $b_1$ 渐近支配其余分量。用有序子式计算，$J^{-1}$ 第 $j$ 行首项的符号为 $(-1)^{r+j+1}$，这里 $j$ 是列参数的编号。各分离参数的编号与 $r$ 同奇偶，因为其后的单态层按偶数个选取，其他多态层成对贡献参数。无质量位移的编号为一，此时 $r$ 为奇数。这些参数对应的逆矩阵项均为负，因而 $X$ 足够大时，分离参数和无质量位移均为正。构造留在非负质量域内，在指定的 $r$ 个逆截止处与参考谱精确相合。

一个无质量层已经能说明少测一次的代价。取 $u=1$，一个无质量态给出 $B(1,0)=1/2$。两个同质量的有质量态给出 $2B(1,z)$，它随 $z$ 从 $1$ 严格连续降至 $0$，故恰有一个 $z>0$ 能配平这一次读数。任取第二个不同的正逆截止就能区分二者。

**实权谱的局部稳定性（`ARGUED`）。** 设两座正谱塔的平方质量均在已知区间 $[0,Z]$，其中 $0<Z<\infty$。固定参考谱的 $d$ 个占据层，其中 $e$ 个位于区间端点，记 $k=2d-e$。任意 $k+1$ 个互异正逆截止已经足够。若另已知两谱总权重相等，任意 $k$ 次即可。令 $\delta$ 为这些位置的 $B(u,z)$ 读数绝对差的最大值。小误差下，两谱的总权重及按最近参考层归集的各层权重，差均至多为 $C\delta$。用平方质量为距离、把两谱各自归一为概率后，只要参考谱占有内点层，$W_1$ 就至多为 $C\sqrt{\delta}$。参考谱只占端点时，上界为 $C\delta$。常数可依赖于截止位置、区间与固定参考谱。

将逆截止排序并对相邻核作差，各行即在有序互不相交区间上以 $t^{-3}$ 加权积分 $e^{-tz}$。总权重已知时，常数行对应 $t=0$。取函数值及连续各阶导数的插值矩阵可逆。由多线性，其行列式等于合流指数行列式的积分。不同指数的带重数零点界保证被积式同号且非零。零端点只用到一阶导数 $B_z(u,0)=-1/u$。在这些行的张成空间内，取 $q$ 在参考内点成双零、在占据端点成单零，并在支集外一点取正值。插值行列式保证零点和重数恰如所定，故其余各处 $q>0$。计入常数因子后，$q$ 在最近层为内点的区域控制平方距离，在最近层为端点的区域控制距离本身。$q$ 对对照谱的积分为 $O(\delta)$。再把各层指示函数插值到参考层，并令插值函数在内点层的一阶导数为零。它与最近层归集的指示函数相差至多为 $q$ 的常数倍，因而可控制各层权重。先将对照谱移至最近参考层，再调整层权，得到输运上界。

把一个内点层等权分到 $z-h$ 和 $z+h$，输运距离为 $h$ 阶、读数差为 $h^2$ 阶。把端点层向内移动 $h$，输运距离与读数差的绝对值均为 $h$ 阶。这给出两种最优指数。少一次读数时，在相邻参考层之间各插一个新层，两端有空余时也各插一层。这样得到 $k+1$ 个新旧交错层。有序观测矩阵为 $k$ 行，其中包括已知总权重时的常数行。带号最大子式交替。选取总体符号使新层系数都为正，将其小倍数加到原参考谱上，就得到读数完全相同的另一座正谱。端点的线性指数在平方质量坐标中成立。把无质量层移到平方质量 $h$，在质量坐标中距离为 $\sqrt h$。

两个逆截止靠近时，观测间距也进入误差界。沿用零裸项，取共同总权为一，固定 $u>0$ 和单个内点参考层 $0<s<Z$。在 $u,u+h$ 处，各真空积分与参考读数的绝对差均至多为 $\varepsilon$。在 $[0,Z]$ 上的所有对照概率谱中，记 $\omega_h(\varepsilon)$ 为平方质量平均位移 $\int |z-s|\,d\nu(z)$ 的上确界。用上文的固有时均值 $R_u(s)=I_1(s)/I_2(s)$，可得锐首项

$$
\omega_h(\varepsilon)\sim\frac{2}{\sqrt{D}}\sqrt{\frac{\varepsilon}{h}},
\qquad D=\frac{e^{-us}}{u^2}\bigl(R_u(s)-u\bigr)>0,
\qquad h\downarrow0,\quad \varepsilon/h\to0 .
$$

为看清间距的作用，写 $B_w(z)=B(w,z)$，令 $r_h=B'_{u+h}(s)/B'_u(s)$。从 $B_{u+h}-r_hB_u$ 减去它在 $s$ 处的值，所得 $q_h$ 在 $s$ 处的一阶导数也为零。其积分至多为 $(1+r_h)\varepsilon$，其中 $r_h\to1$。两核之差只涉及短区间 $[u,u+h]$。除以 $h$ 后，$q_h/h$ 的极限在 $s$ 处曲率为 $D$，在 $s$ 以外严格为正，后一点来自 $e^{uz}[-B'_u(z)]$ 的严格递减性。因此，任一固定小邻域外的输运为 $O(\varepsilon/h)$，邻域内的二次项给出上述首项的上界。取两个平方质量 $s-d,s+d$，调节左层权重使首个读数差为 $-\varepsilon$。此时输运恰为 $d$，而 $q_h$ 的均值为 $hd^2(D+o(1))/2$。由连续性，可取 $d\sim2\sqrt{\varepsilon/(hD)}$ 使第二个读数差恰为 $+\varepsilon$。两层权重均趋于一半。 [合流首项的推导与两层复算](https://github.com/the-omega-institute/trureturing-books/issues/1689#issuecomment-7243211314)

因此，要从逐渐重合的两次观测恢复单层，误差必须比间距更快趋零。设 $h,\varepsilon\to0$ 且 $\varepsilon/h\to\lambda$。令 $H(z)=e^{-uz}$。可行谱的弱极限恰为满足下式的概率测度（$\lambda=\infty$ 时略去上界）。

$$
\int B_u\,d\nu=B_u(s),\qquad
0\le H(s)-\int H\,d\nu\le 2u^3\lambda .
$$

两核的差商 $(B_u-B_{u+h})/h$ 一致趋于 $H/u^3$，故两个读数所允许的误差相加。以 $B_u$ 为横坐标时，$H$ 严格凹，因为斜率 $u/(e^{uz}[-B'_u(z)])$ 随横坐标严格下降。反过来，对满足上式的谱，向适当端点混入 $O(h)$ 的权重，就能使两次读数的平均值与参考谱完全相合，两项误差恰好互为相反数。对 $\lambda>0$，若误差刚超过预算，再向参考层混入趋零的权重即可。$\lambda=0$ 时严格凹性迫使 $\nu=\delta_s$。在两端按权配出 $B_u(s)$，再把这组端点层以足够小的正比例混入参考层，就能在任意 $\lambda>0$ 下保有正输运距离。例如 $u=s=1,\ Z=3$ 时，$\lambda=1/16$ 就能逼近输运距离约为 $1.79481244$ 的纯端点谱。[极限谱的构造与端点权重复算](https://github.com/the-omega-institute/trureturing-books/issues/1689#issuecomment-7243389068)

**有限质量范围内的局部稳定性（`ARGUED`）。** 固定整数参考谱，令参考谱与对照谱的平方质量均落在 $[0,Z]$，其中 $Z>0$。在上面恰好够用的 $r+1$ 个逆截止处，记归一化读数的最大误差为 $\delta$。当 $\delta$ 足够小时，两谱的总态数相同，可按从轻到重的顺序匹配各态。若某个 $0<z<Z$ 的参考层含两个或更多态，匹配后平方质量的绝对位移之和至多为 $C\sqrt\delta$。其余情形至多为 $C\delta$。常数可依赖参考谱、质量上界与采样位置。

固定一个采样位置时，每个态的贡献至少为 $B(u,Z)>0$，所以有界读数给出态数上界。允许质量重合，固定态数的有序谱落在紧集内。由精确读数的唯一性，误差趋零时，每个参考层附近的态数最终等于该层的重数。记所有位移的最大绝对值为 $\eta$。对正质量层 $z_i$，记该层位移之和与平方和为 $a_i,b_i$。无质量层只需位移和 $a_0\ge0$。首阶读数项为 $-A(u,z_i)a_i$，正质量层的二阶项为 $-\partial_z A(u,z_i)b_i/2$，余项为 $O(\eta\sum b_i)+o(a_0)$。在单态层和上端点 $Z$ 处，$b_i\le\eta|a_i|$。由正质量节点的 $A$ 列线性无关，吸收这些小项，得到 $\sum_{z_i>0}|a_i|\le C(\delta+a_0+\sum_* b_i)$，其中星号限于区间内部的正质量多态层。若两个待控项都为空，此式已给出线性估计。

若有无质量层或内部多态层，取采样函数的实线性组合 $g(z)=\sum_j c_j A(u_j,z)$，使它在每个正参考质量处有一个简单零点。在相邻两个内部多态层之间，若夹有偶数个参考层，就在间隙里加一个简单零点。同时有无质量层和内部多态层时，若首个内部多态层之前有偶数个正参考层，再在它之前加一个。所需零点数至多是正质量层数加上多态层之间偶数长度单态段的数目，含无质量层时再计首段为偶数的情形。由 $r$ 的公式，该数至多为 $r$。使用比所需零点多一个的采样位置求线性组合，上面的有序及合流子式保证这些零点全为单根，且没有其他零点。取总体符号，使所有星号层处的 $-g'(z_i)$ 为正，并在有无质量层时使 $-g(0)>0$。若只有无质量层需要控制，单独选取零质量处的符号。

用这一线性组合读取误差，会消去正质量层的首阶项，并以严格正的系数读取 $a_0$ 与各星号层的 $b_i$。用位移和的估计吸收余项，得到 $a_0+\sum_*b_i\le C\delta$，进而 $\sum_{z_i>0}|a_i|\le C'\delta$。单态层及端点的绝对位移和就是 $|a_i|$。内部多态层的绝对位移和至多为 $\sqrt{w_i b_i}$，其中 $w_i$ 为该层重数。当存在这样的层时，将其中两态的平方质量分别移动 $\pm\epsilon$，总位移为 $2\epsilon$，读数误差为 $O(\epsilon^2)$。其余情形将任一态移入区间内 $\epsilon$，读数误差与 $\epsilon$ 同阶。这给出两个最优指数。

**共同整数态数已知时的无界识别（`ARGUED`）。** 假定两谱都有恰好 $N>0$ 个单位权态，且总数另已知。固定有 $d$ 个有限占据层的参考谱。令 $\delta_0$ 表示是否占据无质量层，$h$ 为重数至少二的正质量层数，$\ell_0,\ldots,\ell_h$ 为这些层所隔开的正质量单态段长度，包括首段和末段。对任意互异正逆截止，精确识别的物理读数数目恰为
$$
 K=\begin{cases}
 d,&h=0,\\
 d+h-\sum_{j=1}^{h-1}(\ell_j\bmod 2)-\delta_0(\ell_0\bmod 2),&h>0 .
 \end{cases}
$$

将两谱按质量升序配对。向左移动的态给累计差贡献正区间，向右移动则给负区间。异号区间内部不交，并按配对顺序排列。正质量单态可选任一符号，正质量多态层至多贡献有序的 $+,-$，无质量层只能贡献负号。最长交替列恰有 $K$ 项。在两个多态层之间，以及已占据的无质量层到首个多态层之间，单态段长度若为奇数便少用一项。因此上面的积分核定号论证从 $K$ 个读数给出唯一性。要证明少一次不够，按一个最长交替列移动各态。每个贡献两个符号的多态层另设一个对称分裂参数。合流矩阵的带号最大子式将一维核定向，使各分裂参数和无质量位移都为正。隐函数定理给出同总数、同 $K-1$ 次读数的不同精确谱。

该论证也容许对照态暂到无穷处，此时核取零。于是 $x=e^{-u_1z}$ 中的紧性与精确唯一性保证，读数误差 $\varepsilon$ 充分小时，所有对照态自动落入某个有界质量区间。其上平方质量的排序绝对位移和与 $x$ 坐标中归一概率的输运具有同一局部阶。用一组带号读数控制正质量多态层的位移平方和与无质量层的非负位移，再用其余首阶项控制单态位移。如果参考谱含正质量多态层，锐阶为 $O(\sqrt{\varepsilon})$，否则为 $O(\varepsilon)$。前一种用分裂两态达到，后一种移动一态即可达到。 [最少读数及合流核证明](https://github.com/the-omega-institute/trureturing-books/issues/1689#issuecomment-7236934209)

若有测量误差，还要考虑重层的可见度。由 $e^{-zt}\le e^{-zu}$（$t\ge u$），增添一个单位权重的重层，在所有 $u\ge u_{\min}>0$ 处造成的 $F$ 读数变化至多为 $e^{-u_{\min}z}/(2u_{\min}^2)$。

**无质量上界时的输运（`ARGUED`）。** 固定逆截止 $0<u_1<\cdots<u_m$，在 $x=e^{-u_1z}$ 中度量距离。总权重未知时，把原谱各自归一成概率也无法得到局部 Hölder 界。取 $\mu=\delta_0$、$\nu_n=\delta_0+n^{-1}\delta_n$。对所有 $u\ge u_1$，最大读数差为 $B(u_1,n)/n\sim e^{-u_1n}/(u_1^3n^2)$。概率输运距离恰为 $(1-e^{-u_1n})/(n+1)$，衰减慢于读数差的任意正幂。若改加一个单位重数，读数误差趋零而距离趋于 $1/2$。

两种概率可以恢复锐界。若固定参考谱的 $d$ 个有限占据层包含无质量层，取 $k=2d-1$，否则取 $k=2d$。若已知两谱总权重相同，$k$ 个互异逆截止读数已足以控制原谱归一化后的概率。若对谱塔 $\sigma$ 有 $F_\sigma(u_1)>0$ 且有限，其中 $F_\sigma(u)=\int B(u,z)\,d\sigma(z)$，则可用概率 $B(u_1,z)\,d\sigma(z)/F_\sigma(u_1)$，原谱的总权重允许无限。这时需 $k+1$ 次读数，首读数也计入。两种情形中，若参考谱含正质量层，$W_1$ 的最优局部阶为 $O(\sqrt{\varepsilon})$。若参考谱只含无质量层，最优阶为 $O(\varepsilon)$。这里 $\varepsilon$ 是直接积分读数差的最大绝对值。

证明分别用函数组 $(1,B_1,\ldots,B_k)$ 和 $(1,B_2/B_1,\ldots,B_{k+1}/B_1)$，其中 $B_j=B(u_j,\cdot)$。由 $B(u,z)\sim e^{-uz}/(u^3z)$，各非常数函数在紧化的重端均趋零。插值一个在该端取一、在正质量参考层成双零、在占据的无质量层成单零的证书。有序核积分使合流插值矩阵可逆，比值组先乘回 $B_1$。证书在正质量参考层附近控制距离平方，在无质量层附近控制距离本身。再插值层指示函数即可控制最近层归集后的概率变化。分裂内点权重和将无质量层向内移动分别达到两种锐阶。少一次读数时，交错节点上的带号最大子式给出精确歧义。 [无界输运证明与重尾例](https://github.com/the-omega-institute/trureturing-books/issues/1689#issuecomment-7236427589)

若有原始尾矩上限，还可定量刻画损失的稳定性。固定具有有限个占据层的非零参考谱 $\mu$，取上文定义的 $k$，并使用含 $u_1$ 在内的 $k+1$ 个互异积分读数。设 $\Phi(z)=(1+z)^s$、$0<s<1$，且 $\int\Phi\,d\nu\le A$。记参考谱的总权重为 $M$，$\bar x=M^{-1}\int e^{-u_1z}\,d\mu(z)$，预算余量为 $D=A-\int\Phi\,d\mu$。若 $D>0$，原始读数误差至多为 $\varepsilon$ 的容许对照谱，其归一化输运距离的上确界 $\omega_A(\varepsilon)$ 满足
$$
 \lim_{\varepsilon\downarrow0}(\log(1/\varepsilon))^s\omega_A(\varepsilon)
 =\frac{D\,u_1^s\,\bar x}{M}.
$$
把证书乘回 $B_1$，即可控制加权重尾及参考支集附近的位移。将 $\Phi$ 插值到参考层，并匹配正质量点的一阶导数，得到固定阈值外的尾矩至多为 $D+O(\varepsilon)$。令 $\ell=\log(1/\varepsilon)$。上界用 $R_-=(\ell-(s+3)\log\ell)/u_1$ 分割重尾。较轻一段的权重为 $O(\ell^{-s-2})$。更重一段的权重 $T\le(D+O(\varepsilon))/(1+R_-)^s$，且紧化后靠近 $x=0$。这部分输运的首项代价为 $T\bar x/M$。为取到极限，另选 $R_+=\ell/u_1$，增加单个重层 $D(1+R_+)^{-s}\delta_{R_+}$。它耗尽余下的尾矩预算，所有读数的最大变化为 $O(\varepsilon\ell^{-s-1})$，且 $R_+\sim R_-$，因此给出匹配首项。若参考谱用尽尾矩预算，尾矩为 $O(\varepsilon)$，因此又可得到含正质量层时的平方根阶及纯无质量参考谱的线性阶。将两个锐性例分别整体缩放还可精确保持原始尾矩。 [尾矩预算与精确首项](https://github.com/the-omega-institute/trureturing-books/issues/1689#issuecomment-7236570584)

在电弱对称原点上，三枚规范候选的可见正负质量平方彼此分离超过 $3\times 10^{-11} M_P^2$：补齐无质量层需 $62$ 个实标量，五荷十六重层需 $896$ 个实标量，$18$ 个中性重层各需 $9$ 个狄拉克场（每层补足 $36$ 偏振），故精确最少数为 **$958$ 个实标量 $+$ $162$ 个狄拉克单态**。配平后，牛顿斜率恒有 $2\pi K'(x) \ge 21/2 > 0$，给出唯一的牛顿匹配截止 $Q/M_P \approx 0.17882$（[逐层真空配平证书](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-chiral-graded-vacuum.py)）。

接着向这份零真空基底叠入 [@def-ou-ch11-four-layer-vacuum] 的**四层正真空差分** $D(-1, 3, -3, 1)$（分布于 $0, \mu^2, 2\mu^2, 3\mu^2$，相对于已配平谱只需移出无质量层 $D$ 个标量并净增 $4k$ 标量与 $k = \lceil 3D/4\rceil$ 个狄拉克场）。由于三阶差分精确消去了 $0, 1, 2$ 阶质量平方矩，积分 $I(0) = (9\ln 3 - 12\ln 2)/2$ 有限且严格为正，有限截止亏损不到 $2\times 10^{-59}$！令人眼前一亮的是，只要取撬板式轻质量标度 $\mu = v^2/M$（$v = 246.22\,\mathrm{GeV}$）与 $D = 4$ 个偏振，遍历三枚零点的全部 $98$ 条重谱质量行，荷二完整谱的第 $16$ 个重质量自动落在目标旁边：

| 偏振倍数 $D$ | 轻质量规则 $\mu$ | #11661（最优 $C/c$） | #11934（最优 $C/c$） | #12207（最优 $C/c$） |
| :---: | :---: | :---: | :---: | :---: |
| $1$ | $v^2/M$ | $0.853939$ | $0.851338$ | $0.854245$ |
| $1$ | $v^2/(2M)$ | $0.478472$ | $0.479672$ | $0.478591$ |
| **$4$** | **$v^2/M$** | **$0.979478$** | **$0.991359$** | **$0.967553$** |
| $4$ | $v^2/(2M)$ | $0.925639$ | $0.925639$ | $0.925639$ |

更进一步，结合已确立的外部形式化黎曼猜想事实（Levent Alpöge 2026 年 Lean 4 证明与多方独立内核重放，见本书前言与附录说明，此处作为外部算术前提而非本节 `LEAN ✓` 声明），兰道（Landau）零点和与外尔判据给出双时钟在相位环面上的联合等分布。固定 $D = 4$ 与荷二第 $16$ 重质量 $M$ 后，极限双钟相位线段严格跨过 $C/c = 1$：对**每一个正容差 $\varepsilon > 0$，都存在严格正下自然密度的实际正 $\zeta$ 零点**，同时命中 `[1]` 三代手征分界（$h < 9$）、`[2]` 两圈强耦合窗口 $\alpha_s(M_Z) \in (0.11842, 0.11845)$ 与 `[4]` 暗能量曲率 $|\Lambda G/10^{-122} - 1| < \varepsilon$（$\varepsilon = 10^{-6}$ 时显式下密度 $\ge 10^{-16}/\pi^2 \approx 1.013\times 10^{-17}$）。若让两只时钟保持 #11661 的比值同步旋转，六个味三角形和乐逐项不变，实际零点 **#28325** 一举同时给出 $\alpha_s(M_Z) \in (0.1183790, 0.1183853)$、目标曲率的 **$0.99941058$ 倍** 以及 $|V_{ub}| \approx 0.0036693$（#22027 给 $1.00030008$ 倍与 $|V_{ub}| \approx 0.0025225$，见[三代与曲率共同逼近证书](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-chiral-joint-vacuum-density.py)）。

### 11.3.2 电弱破缺重配、$-1.345\times 10^{-67}$ 树势悬崖与对撞机代价 {#sec-ch11-ewsb-cliff}

然而，当希格斯场滚落到**电弱对称破缺真空**（$v = 246.22\,\mathrm{GeV}$、$m_h = 125.25\,\mathrm{GeV}$，$W, Z$ 与顶夸克获得质量），这幅近乎完美的画卷骤然遭到三连重击。

首先是一圈破缺残差与补场膨胀。冻结原有隐场不变时，顶夸克等轻层质量移动立即产生 $\Delta C \approx -4.673\times 10^{-36}$ 的巨大负一圈残差。按破缺后的实际质量逐层重新配平，所需最少隐单态从 $958 + 162$ 升至 **$1{,}002$ 个实标量 $+$ $173$ 个狄拉克单态**（$Q/M_P \approx 0.17402$）；若再计入正常排序下两枚有质量的马约拉纳（Majorana）中微子（$m_1 = 0$），总数升至 **$1{,}006$ 个实标量 $+$ $174$ 个狄拉克单态**（$m_1 = 0.010\,\mathrm{eV}$ 时为 $1{,}010 + 175$），方能恢复 $1.00030008\times$ 与 $0.99941058\times$ 的一圈读数（[破缺真空热核证书](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-broken-electroweak-vacuum.py) · [中微子与四层真空证书](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-neutrino-flavor-and-heat.py)）：

| 电弱破缺后质量层 | 原可见净偏振 | 配平目标偏振 | 新增最小实标量 | 新增最小狄拉克单态 |
| --- | :---: | :---: | :---: | :---: |
| 无质量层（光子、胶子、$3$ 外尔中微子） | $+12$ | $-4$ | $0$ | $4$ |
| $W, Z, h$ 逐质量层 | $+6, +3, +1$ | 各 $0$ | $6$ | $4$ |
| 六夸克与三带电轻子 | $-84$ | 各 $0$ | $84$ | $0$ |
| 四层非零轻质量（$\mu, \sqrt{2}\mu, \sqrt{3}\mu$） | 各 $0$ | $+12, -12, +4$ | $16$ | $3$ |
| 原五荷与中性重壳层 | 逐层分离 | 各 $0$ | $896$ | $162$ |
| **破缺真空总计（无质量中微子 / 两枚有质量中微子）** | — | 四层正真空 | **$1{,}002$**（**$1{,}006$**） | **$173$**（**$174$**） |

其次是**希格斯树势 $-1.345\times 10^{-67}$ 彻底淹没四层项**。把电弱对称原点势能设为零时，标准二次加四次希格斯树势在破缺真空落差 $\rho_H(v) - \rho_H(0) = -m_h^2 v^2/8$，给 $\Lambda G$ 带来 **$-1.345\times 10^{-67}$**（$-1.34476\times 10^{-67}$）——比四层正真空项足足大出 **$55$ 个数量级**！若试图单纯靠复制 $P$ 份 $D = 4$ 四层结构去抵消这笔树级赤字并维持 $K = 1$，需 $P > B/C_\infty \approx 1.344\times 10^{55}$ 份，庞大数量的轻态立刻通过牛顿斜率 $K = x[A(x) + PH(x)]/(2\pi)$ 反向撑爆普朗克标度，强迫引力固有时截止跌穿 **$4.18\,\mathrm{eV}$**（即便重新标定希格斯二次与四次项，截止仍须低于 $7.24\,\mathrm{eV}$；允许极低截止的整数取整解在 $P \approx 4.205\times 10^{68}$ 处把截止压到 $Q \approx 2.585\times 10^{-6}\,\mathrm{eV}$）。

最后是**等深真空与导数配平的高昂低能代价**。要想绕开树势赤字而直接要求对称点与破缺点**树级等深** $U(0) = U(v) = 0$，最小纯双重态六次势 $U_0(s) = (m_h^2/v^4)s(s - v^2/2)^2$（势垒高度 $m_h^2 v^2/54 \approx 1.761\times 10^7\,\mathrm{GeV}^4$、畴壁张力 $m_h v^2/8 \approx 9.49\times 10^5\,\mathrm{GeV}^3$）预言希格斯三次接触自耦合为标准模型值的 **$3$ 倍**（四次为 $13$ 倍）；引入一个实单态的可重整化树势 $U(s, S) = \lambda(s - aS)^2 + g s(S - b)^2$ 虽可实现等深，却在微扰范围 $\lambda, g \le 4\pi$ 内预言第二标量质量不超过 **$8.602\,\mathrm{TeV}$**（如 $a = v, b = v/2, g = 2$ 给出 $377.38\,\mathrm{GeV}$ 伙伴标量，见[等深电弱真空证书](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-two-electroweak-vacua.py)）。若进一步要求破缺点真空热迹在截止开区间上连同希格斯一阶斜率与二阶曲率一并抵消，则轻费米子层的标量伙伴会给希格斯衰变带来至少 **$19.53\,\mathrm{keV}$** 的产生分宽（改用 $m_b = 2.7\,\mathrm{GeV}$ 时仍至少 $3.71\,\mathrm{keV}$，见[热迹导数与分宽证书](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-heat-jets-higgs-width.py)）；而用可重整化中性门户去复制带电费米子质量时，$1\,\mathrm{TeV}$ 处的强耦合跑动斜率 $d\log R/d\log E > 0.236$ 破坏一圈匹配（[中性门户跑动障碍](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-portal-yukawa-stability.py)），迫使顶夸克伙伴升格为复色六维表示——单独加入它就把两圈 $\alpha_s(M_Z)$ 压到约 $0.0819$（[顶色六维代价](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-portal-color-sextet.py)），即便枚举其余五夸克层的 $3{,}125$ 种色分配、挑出唯一一组在 $8.02\times 10^{15}\,\mathrm{GeV}$ 恢复一圈交汇的 $20$ 种带标签方案，仍留下轻色标量的 $Z$ 宽度、胶子融合率与低能强耦合检验代价（[轻夸克色分配全枚举](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-all-light-color-assignments.py)）。

下图把本章横跨 $122$ 个数量级的真空配平阶梯与紫外敏感性悬崖收束在同一张定量标尺上：

::: {.figure src="ch11-vacuum-balance-sensitivity"}
**真空配平的尺度落差、紫外截止敏感性与四层热核抵消模板。** 上栏以同一对数标尺分列左右两列：左列对照普朗克标度（$1$）、可见重谱未补偿一圈下界（$0.0118$，品红色）、微观雷吉下界（$2.6\times 10^{-11}$，紫色）、电弱破缺希格斯树级位移（$-1.345\times 10^{-67}$，青色）与观测暗能量（$10^{-122}$，琥珀色）；右列品红色标出紫外截止相对位移的变号门槛（匹配类普适上界 $7.2\times 10^{-117}$ 与匹配实例首次变号 $4.22\times 10^{-120}$）。下栏绘出消去零至二次矩的四层热核模板权 $(-1, 3, -3, 1)$（[@def-ou-ch11-four-layer-vacuum]）。
:::

| 真空与引力方案 | 新增最小场数 / 约束 | $\Lambda G$ 读数或障碍 | 决定性瓶颈 |
| --- | --- | --- | --- |
| 纯可见重谱一圈诱导（$R=32, d=724$） | $0$ 新增场 | $\Lambda G > 0.01180$，$G^{-1}/M_P^2 < 6.688\times 10^{-6}$ | 偏振亏量 $d=62$，牛顿倒数与曲率双双失配 |
| 标定四维雷吉形状受控模型 | 形状界 $\chi_\sigma \ge 1/16$ | $\Lambda_{\mathrm{bare}}\ell_P^2 > 2.6\times 10^{-11}$；分块平均亦 $> 2.6\times 10^{-11}$ | 裸体积系数与视界曲率相隔超 $110$ 量级 |
| 最小耦合实单态（$K=1$） | 最少 **$311$**（$M_P/2$ 需 $436$，$M_P/\sqrt{2}$ 需 $77{,}666$；$M_P,\bar{M}_P$ 无解） | 可调至 $10^{-122}$，跨零点至少 $2$ 场反向变质量 | 截止上调 $4.22\times 10^{-120}$ 即翻负（泛界 $7.2\times 10^{-117}$） |
| 可见谱加归一有符号截止测度（$K=1$，对共同标度驻定） | $0$ 新增场；一阶驻定恰需 $4$ 个截止（$\Lambda G = 10^{-122}$；三点对 $|\Lambda G| \le 10^{-15}$ 均不可能）；总变差下确界在 $3.159\times 10^5$ 与 $3.290\times 10^5$ 之间，正截止上不取到 | 四点精确给出 $10^{-122}$，沿共同标度约 $10^{-58}$ 才翻负 | 单独移动最敏感的截止 $8.6\times 10^{-120}$ 以内即翻负，截止比值须精确到约 $120$ 位 |
| 对称点四层 $(-1,3,-3,1)$ 配平 | $958$ 实标量 $+ 162$ 狄拉克（$+4$ 层） | #11934 达 $0.991359\times$，#28325 达 $0.99941058\times$ | 依赖外加统计配平与 $\mu = v^2/M$ 规则 |
| 电弱破缺四层配平 $+$ 希格斯树势 | $1{,}002 + 173$（含 $2$ 中微子 $1{,}006 + 174$） | 树势给 $-1.345\times 10^{-67}$；复制四层需 $Q < 4.18\,\mathrm{eV}$ | 需等深势（$3\times$ 三次耦合 / $\le 8.602\,\mathrm{TeV}$ 单态）或额外机制 |

## 11.4 第四问诚实总账：模型内已证与第一性原理缺口 {#sec-ch11-honest-synthesis}

把第十章与第十一章并排摊开，第四问的地形图已经没有任何模糊地带。

在**模型内已经精确证实**的一侧，我们拥有一批货真价实的数学工具与硬界：零公理单纯形上边缘幂零律（[@thm-ou-ch10-coboundary-zero]）、二次扩张直角旋量闭合（[@thm-ou-ch10-sqrt2-spinor]）与三锚格拉姆行列式恒等式（[@thm-ou-ch11-three-anchor-gram]）为内核验证的纯代数基座；在给定雷吉作用与有限标记规则下，长波守恒源核精确给出两个正留数洛伦兹螺旋度 $\pm 2$，十种原始时间切片保证 $AA^\dagger$ 反射正性，$25$ 个局部角亏以精确行列式 $-2{,}660{,}511{,}744$ 分离全部 $20$ 个曲率与 $5$ 个非度量自由度，双更新三标记既恢复二导数三阶瓦尔德检验又能让真实零点耦合到洛伦兹标量 $\operatorname{tr}(\mathcal{R}^3)$；而在诱导引力一侧，可见重谱下界、$311/436/77{,}666$ 隐单态精确计数、$4.22\times 10^{-120}$ 截止敏感悬崖、以及四层 $(-1, 3, -3, 1)$ 有限正真空在真实零点上以正下密度同时逼近三代、两圈 $\alpha_s$ 与 $10^{-122}$ 的存在性，全部配有可独立复算的有理与高精度区间证书。

::: {.film src="four-layer-vacuum"}
**可见谱单独给出的真空能大得离谱，手工配平的隐场又极其脆弱，四层 $(-1, 3, -3, 1)$ 模板能在每个截止下消去发散，却在希格斯树势面前撞墙（2 分 47 秒）。** 左侧对数标尺上，品红色标出可见重谱下界 $\Lambda G > 0.01180$ 与不超过 $310$ 份实单态时的 $1.5\times 10^{-7}$，琥珀色是目标 $10^{-122}$；屏幕上算出轻层净偏振 $24 + 4 - 90 = -62$ 与可见合计 $-310$，$311$ 个点组成的单态网格在第 $311$ 个点变成琥珀色，旁边写出 $122$ 位微调与 $4.22\times 10^{-120}$ 的截止悬崖（本章证书，青色 NUM）。绿色标签对应 [@thm-ou-ch11-three-anchor-gram]，两组整数向量的格拉姆行列式按公式与按行展开都算出 $25$，第三个向量取前两者之和时为 $0$（屏幕计算）。四根青色与品红色柱给出权重 $(-1, 3, -3, 1)$，零至二阶矩为 $0$、三阶矩为 $6$，阴影面积为 $I(0) = (9\ln 3 - 12\ln 2)/2 \approx 0.78487$；$D = 4$ 与选定规则 $\mu = v^2/M$ 下三枚零点读数 $0.979478$、$0.991359$、$0.967553$ 依赖选定输入。希格斯树势落差在屏幕上重算为 $-1.3448\times 10^{-67}$，高出四层项 $55$ 个数量级；红色栏是 [@prob-ou-ch11-noncircular-gravity]。
:::

### 11.4.1 物种标度普适禁行界：正测度基准的强违背与带符号四截止反例 {#sec-ou-ch11-species-scale-and-unimodular-bounds}

将本章的全部热核诱导引力构造放进量子引力的**物种标度**标尺 $\Lambda_{\rm sp} = \eta M_P/\sqrt{N_{\rm sp}}$（未约化 $\eta = 1$；约化普朗克标度 $\eta = 1/\sqrt{8\pi}$，按热核中保留的实传播偏振数计 $N_{\rm sp}$），可严格区分“正截止测度”与“带符号抵消测度”两类边界（追踪议题 `#2376`）：

1. **纯诱导正测度的物种标度普适下界（ARGUED / NUM）**：由于 $E_2(z) \le 1$（$z \ge 0$）且对每行含 $n_k$ 个实传播偏振的最小耦合场均有牛顿权 $\alpha_k \le n_k/6$（负矢量权更满足 $\alpha_k < 0$），任何无裸牛顿项、采用正归一截止混合的纯诱导解必然满足 $1 = K \le x_{\max} N_{\rm sp}/(12\pi)$，即

$$
\frac{Q_{\max}}{\Lambda_{\rm sp}} \;\ge\; \frac{\sqrt{12\pi}}{\eta}
\;=\;
\begin{cases}
6.139960 & (\text{未约化 }\eta = 1), \\
30.781196 & (\text{约化 }\eta = 1/\sqrt{8\pi}).
\end{cases}
$$

将其套在本章两个正测度基准上：在 $1{,}790$ 可见偏振 $+$ $311$ 隐实单态基准（$N_{\rm sp} = 2{,}101$，无质量牛顿热和 $104/3$）上，三枚零点 #11661、#11934、#12207 的标定截止均位于 $Q/M_P \approx 0.429288$，导致 **$Q/\Lambda_{\rm sp} \approx 19.677$（未约化）/ $98.647$（约化）**，超出普适下界逾 $3.20$ 倍；即便在含 $958$ 实标量与 $162$ 狄拉克单态的对称原点四层配平解（不计附加模板场已达 $N_{\rm sp} = 3{,}396$，$Q/M_P \approx 0.17882$）中，仍有 $Q/\Lambda_{\rm sp} > 10.42$（未约化）。因此在规定物种计数下，本章所有纯诱导正测度解均深陷强耦合超物种区。

2. **带符号四截止驻点解的物种标度反例与总变差代价（ARGUED / NUM）**：一旦允许总变差 $B = \sum |w_j| > 1$ 的带符号归一截止测度，牛顿界退化为 $1 \le B x_{\max}\sum |\alpha_k|/(2\pi)$，随 $B$ 增大而松弛，因此“任何四节点驻点解都超过物种标度”在本章方程内**不成立**。具体而言：在零点 #11934 上，显式一阶驻点解（$t_4 \simeq -8.50984$，$\mathrm{TV} \approx 507{,}234$）使全部四节点落在未约化物种标度之下（$Q_{\max}/\Lambda_{\rm sp} \approx 0.60053 < 1$，约化比 $3.0106$）；而在第 11.2 节的 #11661 四节点布局（$t_1 = -21.61$、$t_2 = -21.58$、$t_3 \simeq -14.1412$、$t_4 \simeq -14.1291$）上，总变差升至 $\mathrm{TV} \approx 2.98943\times 10^{10}$，令最高节点同时跌破**未约化与约化两套物种标度**（分别仅 **$0.03617$** 与 **$0.18132$**）！与之对照，固定一节点在 $x = 1$ 的近极小总变差解（$\mathrm{TV} \approx 3.16\times 10^5$–$3.29\times 10^5$）则高达 $42.308$（未约化）/ $212.103$（约化）。可见，带符号测度虽能在方程内把节点压到物种标度之下，却以 $O(10^{10})$ 级非概率抵消为代价，其幺正量子实现仍属开放问题（OPEN）。

但在**第一性原理的无循环推导**一侧，真正的核心问题依然完整地立在原地：

::: {.problem #prob-ou-ch11-noncircular-gravity title="从单一主联络无循环导出协变洛伦兹引力、牛顿常数与暗能量"}
从同一极小圆弧主联络与单一离散配分函数出发，在不事后引入裸雷吉作用系数、外部面积单位 $A_*$、数百份手工配平的规范单态、人为选定的固有时截止 $Q$ 或外加等深树级希格斯势的前提下：

1. 导出含相互作用的完整四维洛伦兹协变自旋二理论，同时固定时间转移剪切项、避免欧氏共形模发散并守住全阶微分同胚不变性；
2. 无自由参数地算出物理牛顿常数 $G_N$（即普朗克质量 $M_P$ 相对电弱或圆弧尺度的绝对标定）；
3. 独立推出包含电弱破缺树势与量子圈贡献后的总有效宇宙学常数的正号与 $\Lambda G \sim 10^{-122}$ 量级。
:::

至此，前四卷已经分别给规范交汇、手征三代、味谱质子与离散引力画清了各自的数学边界。一个更深层的问题随即浮现：在四问各自筛选出的候选零点（如 #11661、#11934、#12207、#11366、#11431、#28325）之间，究竟能不能由**同一只共同算术钟**与**同一条全局选权作用**统一选中？这正是第五卷将要揭晓的跨四问耦合总账。
