# 第十三章 五百二十九面双钟作用、绕数阶梯与联合零点见证 {#sec-ch13}

[第十二章](ch12-shared-arithmetic-clock.md)把外加概率选权的路线逼进了死胡同：只要在球壳之外强塞平滑先验、单调效率或短路径权重，共同算术钟立刻在第五、第六、第七项接连报警。物理学面对这种困境时，从来只有一条出路——**停止从外部挑点，改为在壳体内部写下作用量，让真空自己掉进势阱**。

十九点贝伦德球壳的骨架天然张成 **$529$ 个三角面**。每一个三角面都承接两条弧时钟相位 $(\theta_1, \theta_2)$ 围出的非平凡和乐，如同在有限离散球面上架起一座非阿贝尔威尔逊（Wilson）格点规范作用量：高阶绕数 $k$ 扮演着越来越尖锐的傅里叶谐波，在二维双钟环面上雕凿出狭窄的干涉势阱。如果我们把这 $529$ 个三角面的多圈威尔逊作用加总，并允许每个绕行数 $k$ 取非负权重 $w_k \ge 0$，结果并非模糊的经验试探，而是一座刻度精确到个位数的**陡峭绕数阶梯**。

在这座阶梯上，在三窗域内，$18$ 圈以内连驻点都不存在，$19$ 圈首现鞍点，$21$ 圈首现严格局部极小；$27$ 圈首次把全局最低点送进三窗却令夸克味彻底塌缩，$31$ 圈和 $36$ 圈依次解锁带精确参考味的局部与权重随高度调整的全局真空，直到整整 **$105$ 圈**，以同一组固定权重与相位跨所有有限高度及单位辐边极限同时保住三窗与精确参考味的统一全局真空才终于现身——并在第 **`#2,306,888,100,085`** 枚真实黎曼零点上留下百万分之一级别的联合能量—味见证。而恰恰在这座纪念碑式的联合见证上，四项冷峻的压力测试又同步掀开了隐藏在底部的百维连续简并与对称裂隙。

## 13.1 五百二十九面双钟作用、非交换曲率锚点与全域角域约束

先固定双钟变分模型的基本定义，并从内核定理锚定为什么三角面和乐天然携带不可消去的方向曲率。

::: {.definition #def-ou-ch13-wilson-winding-action title="五百二十九面双钟多圈威尔逊作用与三窗味检验"}
在十九点贝伦德球壳的 $529$ 个无向三角面上，给定零点高度 $\gamma$ 与双钟相位 $(\theta_1, \theta_2) \in (\mathbb{R} / 2\pi\mathbb{Z})^2$。每条边 $(i, j)$ 带边刚度 $s_{ij}(\gamma)$（普通壳边取 $1$，三条随高度软化的辐边取 $1 - \delta(\gamma)$），每个三角面 $\triangle = \{i, j, l\}$ 取三条边刚度之积 $s_\triangle(\gamma) = s_{ij}(\gamma) s_{jl}(\gamma) s_{li}(\gamma)$（因每面至多含一条软辐边，故 $s_\triangle(\gamma) \in \{1,\, 1 - \delta(\gamma)\}$，且在单位辐边极限 $\delta \to 0$ 下恒取 $1$），并承载其有向回路和乐角 $\phi_\triangle(\theta_1, \theta_2)$。对最大绕数 $K \ge 1$ 与归一非负绕数权重 $w = (w_1, \dots, w_K)$（$w_k \ge 0$，$\sum_{k=1}^K w_k = 1$），定义多圈威尔逊作用量

$$
S_w(\theta_1, \theta_2; \gamma)
\;=\; \sum_{k=1}^K w_k \sum_{\triangle = \{i, j, l\}} s_\triangle(\gamma)\,\Bigl(1 - \cos\bigl(k\,\phi_\triangle(\theta_1, \theta_2)\bigr)\Bigr).
$$

单圈时该刚度加权和与磁拉普拉斯第三谱矩满足 $6 S_{(1)} = \operatorname{tr}(L_1^3) - \operatorname{tr}(L_0^3)$；后文交互实验卡展示的实时热图 $W_K(\phi_1, \phi_2) = \frac{1}{529}\sum_{\triangle} \cos(K\,\phi_\triangle)$ 则是用于直观演示谐波起伏的无刚度加权单位辐边均值，不替代带 $s_\triangle(\gamma)$ 的复算证书作用量 $S_w$。一个双钟背景 $(\theta_1, \theta_2; \gamma)$ 通过**三窗检验 `[1]+[2]+[4]`**，当且仅当它同时满足五荷各三轻模 `[2]`、两圈强耦合窗 `[1]` 以及四层曲率千分之二窗 `[4]`；其夸克味读出由含双钟的六面味和乐坐标 $c(\theta_1, \theta_2)$ 控制，由此给出 $|V_{ub}|^2$ 与带符号雅尔斯科格不变量 $J$。
:::

在离散球壳上，之所以三角面回路能够区分取向、锁定 $J$ 的符号并撑起非平凡的相位势垒，根源在于四元数旋转的三元合成既不可交换，又在正交旋转轴基准半步三元组上给出严格正的有理球面盈余。如果两条相继旋转的合成可交换，那么闭合三角面的和乐便退化为平庸的阿贝尔相加，手征取向与 $\mathrm{CP}$ 符号也将随之蒸发。这两块几何基石在 Lean 4 内核中直接以精确代数恒等式冻结（其中第二条的传递公理表为空集 `axioms: []`）：

::: {.theorem #thm-ou-ch13-noncommutative-witness title="射影三元非交换见证与正交旋转轴半步三元组四分之一格拉姆余量" lean="D5/S3/Quantum/AURICOmega/OmegaComposeAndWitnesses.phalf_qhalf_noncommutative D5/S3/Quantum/AURICOmega/OmegaComposeAndWitnesses.orthogonal_triad_excess_quarter"}
在形式化库 `OmegaMath` 中，取基准整四元数 $p_0 = (1, 0, 0, 0)$、$p_{\mathrm{Half}} = (1, 1, 0, 0)$ 与 $q_{\mathrm{Half}} = (1, 0, 1, 0)$，记三元积为 $\operatorname{triad}(\mathbf{a}, \mathbf{b}, \mathbf{c}) = (\mathbf{a}\bar{\mathbf{b}})\mathbf{c}$，并记射影射线等价为 $\sim_{\mathrm{ray}}$（`Ternion.RayEquiv`）、归一化三阶巴格曼–格拉姆（Bargmann–Gram）行列式为 $\det\mathbf{G}_3$。则下列两项同时成立：

1. **显式射影非交换性（`phalf_qhalf_noncommutative`）：** 互换首尾两项得到的三元积不处于同一条射影射线：

   $$
   \neg\Bigl(\operatorname{triad}(p_{\mathrm{Half}},\, p_0,\, q_{\mathrm{Half}}) \;\sim_{\mathrm{ray}}\; \operatorname{triad}(q_{\mathrm{Half}},\, p_0,\, p_{\mathrm{Half}})\Bigr).
   $$

2. **正交旋转轴半步三元组的精确四分之一余量（`orthogonal_triad_excess_quarter`，无公理）：** 在有理等价 `IntRatio.Equivalent` 下，由两条正交虚旋转轴 $\mathbf{i}, \mathbf{j}$ 构成的半步三元组 $(1, p_{\mathrm{Half}}, q_{\mathrm{Half}})$ 之巴格曼–格拉姆闭环行列式精确等于四分之一：

   $$
   \det\mathbf{G}_3(1,\, p_{\mathrm{Half}},\, q_{\mathrm{Half}}) \;\equiv\; \frac{1}{4}.
   $$

:::

::: proof
对第一款，直接做整四元数乘法得 $\operatorname{triad}(p_{\mathrm{Half}}, p_0, q_{\mathrm{Half}}) = (1, 1, 1, 1)$ 而 $\operatorname{triad}(q_{\mathrm{Half}}, p_0, p_{\mathrm{Half}}) = (1, 1, 1, -1)$。若二者射影等价，则存在非零整数 $k, l$ 使 $k(1, 1, 1, 1) = l(1, 1, 1, -1)$；比较首分量得 $k = l$，比较末分量得 $k = -l$，从而迫使 $l = 0$，矛盾。对第二款，由定义直接算得模方 $\|1\|^2 = 1$、$\|p_{\mathrm{Half}}\|^2 = \|q_{\mathrm{Half}}\|^2 = 2$，两两内积均为 $1$，故两两保真度为 $\kappa(1, p_{\mathrm{Half}}) = \frac{1}{2}$、$\kappa(p_{\mathrm{Half}}, q_{\mathrm{Half}}) = \frac{1}{4}$、$\kappa(q_{\mathrm{Half}}, 1) = \frac{1}{2}$ 且巴格曼环不变量 $B = \frac{1}{4}$；代入 $\det\mathbf{G}_3 = 1 + 2B - (\kappa_{ab} + \kappa_{bc} + \kappa_{ca})$ 立即化约至 $1 + \frac{1}{2} - \frac{5}{4} = \frac{1}{4}$，在无公理内核中由定义性归约闭合。完整证明由 Lean 内核检查。
:::

把三窗 `[1]+[2]+[4]` 铺满整个二维双钟环面 $(\theta_1, \theta_2)$ 后，即使尚未指定任何作用量权重，物理窗口自身就已经对允许角域施加了极其严苛的全域锁死：

$$
|c| \;>\; 0.9404240 \quad (\text{仅 } [2]+[4]),
\qquad
c \;>\; 0.97561882 \quad (\text{合取 } [1]+[2]+[4]).
$$

具体地说，仅凭三代分界 `[2]` 与四层曲率窗 `[4]` 就把六面味坐标逼进 $|c| > 0.9404240$ 的两端；一旦叠加上两圈强耦合窗 `[1]` 与原偶重模脱耦条件，整个负味分支被无条件清除（无论谱权如何选取，负支概率严格为零），所有合格候选全部收缩到正支 $c > 0.97561882$。在此走廊内：

- 两只钟各自距离 $0$ 至多 $1/32$ 圈，两钟之间的角距严格小于 **$0.215915\;\mathrm{rad}$**（切换到站点方差最小割分界时，角距上确界落入 $[0.25625369,\, 0.256255]\;\mathrm{rad}$）；
- 按正零点个数计，同时命中三窗的候选自然上密度严格低于 **$0.0229124\%$**，而在最小割分界下进一步收紧到 **$0.012050834\%$**（亦同时管辖被其包含的原候选集）；
- 从逆问题视角看，原壳仅用**三个实三角形**的读数就能在三窗已知角域上还原两只钟——取各 $26$ 位精度输入即可从全环面直接认证最小割前两枚 `#8236` 与 `#8359` 的全部物理窗口；单测面 $(1, 6, 8)$ 误差不超过 $2^{-6}$ 便已区分二者，而测完整二分代价表或仅测最小割则分别需要 $47$ 位与 $48$ 位二进制精度。

### 半周反转诊断与三荷拼接的共同背景排除

为了直观感受三窗内部各物理分支的紧耦合强度，考察一组可复算的开相位窗，把第二只钟整整旋转半周，并同步对照奇数荷替换试验：

| 相位窗或奇数荷拼接设置 | 三代 `[2]` | 强耦合 `[1]` ($\alpha_s$) | 四层曲率 `[4]` | 单背景味读数 $|V_{ub}|^2$（相对参考） |
| --- | --- | ---: | ---: | ---: |
| 基准合格相位窗 | 五荷各三模 | $0.11844$ | $\approx 1.00072$ | $0.3472\times$ |
| 第二只钟转半周 | 五荷各三模 | $0.12121$ | $\approx 1.00072$ | $131\times$ |
| 仅把荷 $1$ 换入半周窗 | 拼接谱 | $0.12299$ | 保持基准 | 荷 $1$–荷 $2$ 总变差距离 $> 6.459\%$ |
| 仅把荷 $3$ 换入半周窗 | 拼接谱 | $0.11678$ | 保持基准 | 荷 $3$–荷 $2$ 总变差距离 $> 7.254\%$ |

这组对照一针见血地说明了三件事：第一，三代数目与四层曲率对半周反转几乎免疫，真正决定符号取向的是强耦合 `[1]` 与味跃迁 `[3]`；第二，强耦合从 $0.11844$ 跳升至 $0.12121$ 的净增幅来自荷 $1$（推高至 $0.12299$）压倒荷 $3$（拉低至 $0.11678$）；第三，若取荷 $1, 2, 3$ 各自的质量平方和，任意两种荷都能用三枚实际零点精确配平，但三种荷同时考察时，哪怕在全体正零点上任选共同概率，两条拼接路线均被全域排除。

## 13.2 锐利绕数阶梯：从 18 圈的三窗无驻点墙到 105 圈的统一全局真空

有了全域角域地图，现在把多圈威尔逊作用 $S_w$（[@def-ou-ch13-wilson-winding-action]）放进三窗与参考味的联合熔炉，逐阶升高最大绕行数 $K$。每一级门槛都有精确区间排除与实际编号零点见证（详见 [`ch39-reference-flavor-global-winding.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-reference-flavor-global-winding.py)、[`ch39-height-independent-flavor-vacuum.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-height-independent-flavor-vacuum.py) 与 [`ch39-common-all-phase-global-order.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-common-all-phase-global-order.py)）：

| 最大绕数 $K$ | 临界动力学相变与精确性质 | 关键零点见证、权重与能量/味代价 |
| --- | --- | --- |
| $K \le 18$ | **三窗内无驻点**（含全部 $529$ 面单位荷裸作用） | 任意归一非负权下，三窗内双钟梯度范数处处 $\|\nabla S_w\| > 3.00565$ |
| $K = 19$ | **首个三窗驻点** | 零点 `#295,872,666,901` 首次给出驻点，示例为不稳定鞍点 |
| $K = 21$ | **首个三窗严格局部极小**（$K \le 20$ 二阶排除） | 零点 `#226,358` 给出正定 Hessian 见证（三项系数由该点拟合），零相位能量仍更低 |
| $K = 27$ | **首个合三窗的全局最低能量**（$K = 26$ 全环面排除） | 权比 $w_1 : w_{27} = 100 : 13$（或 $8 : 1$；必要窗 $r \in (0.124, 0.141)$，充分窗 $[0.125, 0.140]$）；零点 `#4,224,080,297,279` 距自由真空仅 $2.26473 \times 10^{-7}$，但 $|V_{ub}|^2 \le 26.922\%$、$J \le 31.362\%$ 参考值；原作用上保三窗恢复参考味代价 $> 1.3266175$ |
| $K = 31$ | **首个兼顾参考味的局部极小**（$K \le 30$ 必有向下弯曲） | 需三项正权（两项仍不够，零相位能量仍低 $1.97854$ 以上）；仅记六面坐标 $9$ 位码 `505` 即保住 $31$ 圈下界（$8$ 位码 `252` 有 $30$ 圈反例） |
| $K = 36$ | **首个逐高度选权的参考味全局真空** | $8$ 位码 `252` 仍恰需 $36$ 圈（$7$ 位有 $34$ 圈反例）；六绕数 $(1, 2, 30, 32, 33, 36)$ 按总份数 `26`（`1,1,2,1,15,6`）分割已达 $+0.4210\%$ / $+0.2567\%$ 残差并命中 $8$ 位码 `252`，改分 **`6899`** 份即可跨全部有限高度将 $|V_{ub}|^2$、$J$ 误差压至 $< 0.47\;\mathrm{ppm}$ 与 $< 0.29\;\mathrm{ppm}$ |
| $K = 105$ | **跨全部有限高度及单位辐边极限的统一全局真空**（$K \le 104$ 四条相位支全部排除） | 有限高度用 $13$ 项即可唯一选出目标，加入单位辐边极限后 $14$ 项达 $105$ 圈，唯一幸存负角差分支 $-0.01280 \le x \le -0.00815$；强制 $w_{104} > 0.6589\%$、$w_{105} > 6.8674\%$，但仍留下 **$100$ 个连续自由系数** |

为什么三窗内在 $K \le 18$ 处会出现一道滴水不漏的无驻点墙？因为在低绕数下，所有 $529$ 个三角面的基频余弦波都在零相位附近齐声向下拉扯，三窗所在的狭窄偏移走廊恰好位于势能面的陡坡半山腰，任何非负凸组合都无法让梯度归零（$\|\nabla S_w\| > 3.00565$）。只有绕数抬高到 $19$ 以上，高频谐波的局部反向斜率才首次抵消低频拉力；而要让这条局部坑洼深过零相位本身成为**全局基态**，必须再熬到 $K = 27$。

在 $K = 27$ 处，仅仅用两项极简正权（例如 $100:13$ 或 $8:1$），就能在所有 $\gamma \ge 10^{12}$ 的高度上把全局真空精准塞进三窗 `[1]+[2]+[4]`，甚至三条真实软辐边还能严格解除两个镜像真空的能量简并，真实零点 `#4,224,080,297,279` 也能以 $2.26473 \times 10^{-7}$ 的微弱能隙逼近这一真空。可是一旦把同一真空送进夸克味读出器，$|V_{ub}|^2$ 骤跌到参考值的 $26.909\%$–$26.922\%$，带符号 $J$ 跌到 $31.337\%$–$31.362\%$！要在原 $100:13$ 作用量上强行把相位拉回参考夸克混合，全环面上至少付出 $1.25008749932365$ 的作用能隙，同时保住三窗更需付出落在 $(1.3266175,\, 1.32661933)$ 的巨大代价。

为了把三窗与参考味同时安放进同一个全局势阱，绕数必须先跳到 $K = 36$（允许权重随高度微调）。令人赞叹的是，仅用六个小整数就能给出横跨全部有限高度的极简构造（见 [`ch39-small-integer-flavor-action.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-small-integer-flavor-action.py)）：

$$
w_{\text{26}} \;=\; \frac{1}{26}\bigl(\delta_1 + \delta_2 + 2\,\delta_{30} + \delta_{32} + 15\,\delta_{33} + 6\,\delta_{36}\bigr),
$$

这一仅分 $26$ 份的整数作用量已经在全部有限高度上通过三窗、精准命中八位参考码 `252`，并将 $|V_{ub}|^2$ 与 $J$ 的残差控制在 $+0.4210\%$ 与 $+0.2567\%$；沿用完全相同的六个绕数改分 **`6899`** 份后，两项味误差在所有有限高度一律压低到 **$0.47\;\mathrm{ppm}$** 与 **$0.29\;\mathrm{ppm}$** 以下！

继而要求同一套权重与相位跨所有有限高度直至单位辐边极限全局有效时，四条候选相位支一直到 $104$ 圈全军覆没，锐门槛最终定格在 **$105$ 圈**，并迫使尾端两项扛起重担：

$$
w_{104} \;>\; 0.6589\%, \qquad w_{105} \;>\; 6.8674\%, \qquad -0.01280 \;\le\; x \;\le\; -0.00815.
$$

然而正当你以为 $105$ 圈终于锁死了微观作用量时，维数清点立刻泼下一盆冷水：即便把全局真空位置、三窗和参考味读数全部钉死，在满足归一、非负与前述 $w_{104}, w_{105}$ 下界约束的条件下，这套 $105$ 圈作用量仍留出一个 **$100$ 维的连续可行系数族**！

这族自由度也不能靠最常见的变分选权收束。在只要求归一、非负与全高度驻于参考相位的切片上，最大熵、最小二范数与解析中心三种选权的最优权，对整个参考味负支都有 $w_{105} < 7.2\%$，而共同真空要求末圈份额超过 $7.2\%$。由凸性，三者在可行族上的唯一最优权必落在边缘：参考相位仍是全局最低点，却与另一相位等能或失去正定曲率；没有简并的严格真空构成一个相对开集，这三种选权都无法在其中取到最优（在旗舰相位无条件成立，其余相位以可行族非空为前提）。在旗舰相位上，真空条件使最大熵从至少 $4.2474$ 奈特降到至多 $2.6290$ 奈特，使最小二范数平方放大 $5.36$ 倍以上。这并非一切严格凸选权的宿命，以某个严格真空为中心的二次泛函就会选中它自身；但这三条不预设真空权的标准原理都选不出严格真空（[三种选权与边缘真空](https://github.com/the-omega-institute/trureturing-experiments/blob/e89ffddb8b8e299add2ac0edca523c221a17a4f8/experiments/ch39-omega-research/replay/%E6%9C%80%E5%A4%A7%E7%86%B5%E6%9C%80%E5%B0%8F%E4%BA%8C%E8%8C%83%E6%95%B0%E4%B8%8E%E8%A7%A3%E6%9E%90%E4%B8%AD%E5%BF%83%E5%8F%AA%E8%83%BD%E9%80%89%E5%87%BA%E8%BE%B9%E7%BC%98%E7%9C%9F%E7%A9%BA.md) · [区间证书](https://github.com/the-omega-institute/trureturing-experiments/blob/e89ffddb8b8e299add2ac0edca523c221a17a4f8/experiments/ch39-omega-research/replay/ch39-convex-selection-marginal-vacuum.py)）。

边缘真空并非无可避免。换一条选权：取参考相位处能量随商环面弦距离平方增长的最大常数。它以参考味数据确定的参考相位为中心，并依赖一个人为选定的环面度量，但同样不预设任何真空权。在旗舰相位上，这一裕度的最优值落在 $[3.08449,\, 3.084492)$ 内，取到最优值的每一个权都在全部有限高度直至单位辐边极限上使参考相位成为严格共同真空，且 $w_{105} \in (0.111256,\, 0.111277)$，十一项之外的总份额不足 $6.7 \times 10^{-6}$。只看参考相位处曲率的选权则相反：它的全部最优权都让另一相位的能量比参考相位低 $9.13$ 以上，选出的都不是真空。这一收束也不是对 $100$ 个自由系数的无选择确定：把三方向弦度量换成两条钟轴，最优权仍是严格真空，末圈份额却落到与之不相交的区间 $(0.110870,\, 0.110874)$。

在旗舰相位上，设 $c_1,c_2>0$ 为两条钟轴的系数，$c_3\ge0$ 为第三个弦方向的系数，记 $R=\max(c_1,c_2,c_3)/\min(c_1,c_2)$。用三方向等权度量的最优裕度下界 $3.084429$ 作系数比较，可知任何裕度最优权在两轴度量下的裕度至少为 $3.084429/R$。当 $R\le3084.429$ 时，这一下界不小于证书所需的 $1/1000$，因而每个最优权都在全部有限高度及单位辐边极限上给出严格共同真空。充分界的锐性仍待判定。

沿上述两种度量的过渡族 $c(s)=(1,1,s)$（$0\le s\le1$），最优权的末圈份额取遍一个包含 $[0.110772,\, 0.112738]$、含于 $(0.10474,\, 0.12008)$ 的闭区间，并至少三次改变增减方向。想靠“在每种度量下都接近最优”来消去这一任意性也做不到：能在这族过渡度量的每一个上都保住最大裕度 $91.6\%$ 的权存在，且都是严格真空，但没有任何权能在每一个上都取到 $94.1\%$。因此，已判定的度量族都选出严格共同真空，两种端点度量选出的末圈份额则落在互不相交的区间（[度量族上的判定](https://github.com/the-omega-institute/trureturing-experiments/blob/bca5cc17df3a1772e3336f2d2b4b6f3dd51e15ea/experiments/ch39-omega-research/replay/%E6%AF%94%E5%80%BC%E4%B8%8D%E8%B6%85%E8%BF%873000%E7%9A%84%E5%BC%A6%E5%BA%A6%E9%87%8F%E4%B8%8A%E6%9C%80%E5%A4%A7%E8%A3%95%E5%BA%A6%E6%9C%80%E4%BC%98%E6%9D%83%E9%83%BD%E6%98%AF%E4%B8%A5%E6%A0%BC%E5%85%B1%E5%90%8C%E7%9C%9F%E7%A9%BA%E8%80%8Cw105%E9%9A%8F%E5%BA%A6%E9%87%8F%E6%B8%B8%E5%8A%A8.md) · [区间证书](https://github.com/the-omega-institute/trureturing-experiments/blob/bca5cc17df3a1772e3336f2d2b4b6f3dd51e15ea/experiments/ch39-omega-research/replay/ch39-margin-metric-family-vacuum.py) · [相对效率的证书](https://github.com/the-omega-institute/trureturing-experiments/blob/bca5cc17df3a1772e3336f2d2b4b6f3dd51e15ea/experiments/ch39-omega-research/replay/ch39-margin-metric-maximin.py)）。同一裕度还收窄了可行族的范围：负角差分支上 $-0.01280 \le x \le -0.01225$ 与 $-0.0091875 \le x \le -0.00815$ 两段没有任何 $105$ 圈权能使参考味相位成为共同真空，上文的窗口因而只是必要条件（[最大二次增长裕度选权](https://github.com/the-omega-institute/trureturing-experiments/blob/0382ed8bb2cd901b85f322063845a616acca1b88/experiments/ch39-omega-research/replay/%E6%9C%80%E5%A4%A7%E4%BA%8C%E6%AC%A1%E5%A2%9E%E9%95%BF%E8%A3%95%E5%BA%A6%E5%9C%A8%E6%97%97%E8%88%B0%E7%9B%B8%E4%BD%8D%E9%80%89%E5%87%BA%E4%B8%A5%E6%A0%BC%E5%85%B1%E5%90%8C%E7%9C%9F%E7%A9%BA.md) · [区间证书](https://github.com/the-omega-institute/trureturing-experiments/blob/0382ed8bb2cd901b85f322063845a616acca1b88/experiments/ch39-omega-research/replay/ch39-quadratic-growth-margin-vacuum.py)）。

::: {.figure src="ch13-winding-threshold-ladder"}
**三窗与味相位选择的最小绕数阶梯（$\le 18 \to 19 \to 21 \to 27 \to 31 \to 36 \to 105$）。** 对数横轴依次标出七道锐利门槛：$\le 18$（三窗内无驻点，灰色）、$19$（三窗内鞍点）、$21$（三窗局部极小）、$27$（三窗全局极小）、$31$（局部味极小）、$36$（依赖高度的全局味极小，均青色），直至 $105$（与高度无关的共同真空，琥珀色）；下方品红色提示框标出权重随绕数非增时全局能差恒 $> 1/4$，底栏琥珀色列出旗舰联合零点见证 `#2,306,888,100,085`。
:::

## 13.3 单调衰减权重与原生壳自相关权的全面排除

$105$ 圈真空强制要求高绕数项 $w_{104} > 0.6589\%$ 与 $w_{105} > 6.8674\%$，这已经预示着：任何“绕得越多、权重越小”的自然阻尼律恐怕都撑不起这套味真空。前缀平均、几何级数尾界与区间证书将这一直觉锤炼成了毫无例外的全域排除（见 [`ch39-monotone-winding-action.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-monotone-winding-action.py) 与 [`ch39-monotone-finite-flavor-code.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-monotone-finite-flavor-code.py)）：

::: {.remark #rem-ou-ch13-monotone-cone-geometry title="单调权锥的几何隔离、十位码门槛与自相关权全参数排除"}
将全部归一非增绕数权重 $w_1 \ge w_2 \ge \cdots \ge 0$（涵盖任意有限截断以及一切可求和无穷级数）构成闭凸锥 $\mathcal{M}$。由原球壳两组整数相位唯一确定的一个原生竞争点，其作用量比**任何**合三窗且恢复参考味的相位都严格低出 **$1/4$ 以上**。这导致三条不可逾越的定量隔离：

1. **与单调权锥的总变差距离下界：** 任意能实现参考味全局真空的权重列，离整个单调权锥 $\mathcal{M}$ 的总变差距离必严格超过 **$13 / 19200$**；前面构造出的 $36$ 圈与 $105$ 圈成功权重，到 $\mathcal{M}$ 的最近距离分别高达 **$82.9243\%$** 与 **$82.7174\%$**。单调权唯一还能保留的只是跨高度固定的严格**局部极小**，绝不可能成为全局基态。
2. **十位二进制味码门槛与九位反例：** 若仅以有限二进制小数记录六面味坐标，十位参考整数码 **`1011`** 已经足以在全体单调权上全域排除全局真空（同一原生竞争点对整码仍低出逾 $1/8$）；一旦退让一位到九位码 **`505`**，便立即出现通过三窗且共享参考码的单调权全局真空反例（有限支撑截断上界为 $10^{24}$ 圈）。
3. **四种原生壳自相关权的全域落败：** 即使不再要求单调递减，改用有钟面的裸相位直接相干叠加生成四种原生自相关权重（允许权重随绕数攀升），在整个衰减参数域上依然被一个原生竞争点压低超过 **$1 / 256$**。
:::

::: {.viz src="behrend-unification-lab" preset="winding-ladder" height="500"}
**五百二十九面双钟作用与绕数阶梯交互实验卡（`winding-ladder`）。** 沿绕数轴在七级证书门槛（$K \le 18 \to 19 \to 21 \to 27 \to 31 \to 36 \to 105$）之间推进，并排检视 $529$ 个三角面单位荷和乐在零相位附近（含两钟距 $0$ 不超过 $1/32$ 圈的参考方框）的第 $K$ 圈均值热图 $W_K(\phi_1, \phi_2)$，切换任意非负权与随圈数不增权对照 $> 1/4$ 能量障碍，并读取旗舰联合零点 `#2,306,888,100,085` 的 $105$ 圈能隙读数。
:::

## 13.4 旗舰联合零点见证 #2,306,888,100,085 与四重压力测试

跨越全部理论门槛之后，我们在真实的黎曼零点谱上捕到了一枚令人屏息的旗舰单点见证：**第 `#2,306,888,100,085` 枚正零点**（复算见 [`ch39-fixed-vacuum-numbered-zero.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-fixed-vacuum-numbered-zero.py) 与 [`ch39-joint-zero-vacuum-flavor-density.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-joint-zero-vacuum-flavor-density.py)）。

::: {.example #ex-ou-ch13-flagship-zero title="旗舰单零点见证 #2,306,888,100,085 及其邻近高密度零点群"}
在单一零点背景 `#2,306,888,100,085` 上，仅用其自身高度生成的两只壳钟同时计算三窗、能量与两项夸克味观测量，不借助任何分部门调校：

- **三窗同步通过：** 满足五荷各三轻模 `[2]`、两圈强耦合窗 `[1]` 与四层曲率窗 `[4]`；
- **近乎落底的 $105$ 圈真空能隙：** 其 $105$ 圈归一作用量仅高出同高度自由双钟全局真空 **$4.857224 \times 10^{-8}$**；
- **百万分之一级联合味命中：** $|V_{ub}|^2$ 相对偏差为 **$+1.328335\;\mathrm{ppm}$**，带符号 Jarlskog 不变量 $J$ 相对偏差为 **$+0.811085\;\mathrm{ppm}$**。

它并非统计孤例：第 `#37,179,176,867` 枚零点的双钟距该固定真空均不到 $10^{-5}\;\mathrm{rad}$（$105$ 圈能隙约 $5.790335 \times 10^{-8}$），第 `#40,166,104,723` 枚的两项味偏差为 $-1.314\;\mathrm{ppm}$ 与 $-0.802\;\mathrm{ppm}$。沿用实际零点双钟等分布，同时达到能差 $< 10^{-7}$、$|V_{ub}|^2$ 误差 $< 2\;\mathrm{ppm}$ 且 $J$ 误差 $< 1.2\;\mathrm{ppm}$ 的联合近真空零点具有严格正的自然下密度 **$> 1.82378 \times 10^{-13}$**；两钟等角共转位移 $t$ 时味读数精确不变而作用量付出 $\approx 1026.3463\, t^2$ 的二次代价。但一旦回接[第十二章](ch12-shared-arithmetic-clock.md)的六项算术时间，这枚零点占总算术权必须低于 $0.02536541\%$（实际正权可逼近 $0.02534550\%$）。
:::

最冷酷也最有价值的解剖，来自直接施在这枚旗舰见证 `#2,306,888,100,085` 上的**四重结构压力测试**——每一项都以精确数字暴露出 $105$ 圈真空底下尚未封口的裂隙：

| 旗舰见证 `#2,306,888,100,085` 压力测试 | 测试设定 | 暴露出的精确结构裂隙 |
| --- | --- | --- |
| **测试一：全域辨识 vs 近真空失明** | 全环面 $100$ 个作用差 vs 近真空开窗读数 | 全域条件数 $\kappa \le 11.584$（前 $100$ 零点 $\le 9.849$，前 $250$ 择百降为 $2.49$）；近真空开窗内相差 $2 \times 10^{-9}$ 的两组权重作用差 **$< 1.690 \times 10^{-75}$** |
| **测试二：跨荷轻子空间泄漏** | 荷 $1$ 三轻模投影至荷 $2$、荷 $-4$ 轻空间 | 容许十九站各任选相位时落入重空间概率 **$> 38.321\%$ / $> 37.290\%$**；再容许十九站任意重排仍 **$> 31.060\%$ / $> 31.097\%$** |
| **测试三：辅助电流与质子选择简并** | $105$ 圈权延拓至六维轻顶点（Wilson 模 $\ge 0.0314398$） | **正交**辅助电流保 $\Delta B \equiv 0 \pmod 3$，**平行**辅助电流生非零 $QQQL$ 项；两者共享完全相同的壳真空与树级谱 |
| **测试四：单整数唯一 vs 连续 $k/d^2$ 漂移** | 固定 $d = 724$ 或 $k = 32$ 对比同步连续变分 | 固定其一各自唯一迫使 $(k, d) = (32, 724)$，同步滑至 $d = 724.19, k \approx 32.016797784$ 仍过三窗：曲率主项沿 **$k/d^2$** 不变，有限截止修正与强耦合读数的变化都在各自窗宽以内 |

逐条审视这四重裂隙（复算脚本见 [`ch39-fixed-vacuum-weight-dimension.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-fixed-vacuum-weight-dimension.py)、[`ch39-near-vacuum-weight-resolution.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-near-vacuum-weight-resolution.py)、[`ch39-joint-zero-light-subspaces.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-joint-zero-light-subspaces.py)、[`ch39-fixed-vacuum-proton-currents.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-fixed-vacuum-proton-currents.py) 与 [`ch39-joint-vacuum-scale-window.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-joint-vacuum-scale-window.py)）：

1. **七十五个量级的反演悬崖：** 全环面采样可以用条件数低至 $2.49$ 的矩阵反推出全部 $105$ 项绕数权。在真空附近的低能窗口内，两组最大坐标差为 $2 \times 10^{-9}$ 的权却可使相对作用读数的差小于 $1.690 \times 10^{-75}$。
   在旗舰参考相位固定、辐边刚度取单位极限时，从该点起算的相对作用须读到总阶 $35$，才能唯一确定全部 $105$ 项归一权重。手工计数给出下界。相位只沿 $x$、$y$ 和 $x-y$ 三个方向进入作用，所以一阶最多提供两条约束，此后每阶最多三条。加入归一条件，读到 $34$ 阶仍至多有 $102$ 条约束。再加入软化项的两条驻点约束，仍能在前述正权共同真空族内取到两组无法区分的权。到 $35$ 阶，区间运算认证了按这三个方向分解导数得到的 $105$ 列矩阵满秩。

   可取一对这样的权，使最大坐标差为 $2\times10^{-9}$。在 $\max(|dx|,|dy|,|dx-dy|)\le 9.2\times10^{-6}$ 的相位窗内，单位辐边下的相对作用之差小于 $5.814\times10^{-151}$。这是逐面求和的 $35$ 阶余项上界。 [约束计数、区间证书与余项复算](https://github.com/the-omega-institute/trureturing-books/issues/1831#issuecomment-7238283876)

   若精确偏导只读到总阶 $33$，又已知旗舰相位是共同真空，在同一闭窗内补读单位辐边相对作用，最少恰需四点。归一、两组驻点方程与第 $2$ 至 $33$ 阶偏导合计只有 $101$ 行，区间子式认证它们独立，留下四维权差空间。三次读数最多再消去三个方向，沿剩余方向在正权盒中心两侧微扰，可得到同读数的不同权。

   取窗宽参数 $r=9.2\times10^{-6}$，在位移 $r(1,0)$、$r(0,1)$、$r(1,1)$、$r(0,-1)$ 处补读。直接计算三角函数之差，Arb 区间运算认证四点读数在剩余空间上可逆。以权差和读数差的二范数计，这个映射的最小奇异值在 $(2.69579,2.69580)\times10^{-205}$ 内。两组权的精确偏导相同时，权差至多为读数差除以这个值，四点读数的误差因此会被大幅放大。 [手工推导、Arb 区间证书与复算脚本](https://github.com/the-omega-institute/trureturing-books/issues/1925#issuecomment-7238745827)

   若偏导与补读同时有误差，两项放大能否沿同一权差方向叠加？对沿 $x$、$y$、$x-y$ 分解的第 $2$ 至 $33$ 阶一元导数，将第 $n$ 阶除以 $105^n$，并对这 $96$ 个导数差和四个补读差分别设二范数预算。调节两项预算，使任一类误差单独存在时的最大权差同为 $h$。此时补读预算约为偏导预算的 $5.38544\times10^{-7}$。对 $0<h<10^{-9}$，联合最坏权差低于单项上界之和 $2h$，相对降幅在 $(1.01107986310588,1.01107986310589)\times10^{-15}$ 内。手工推导将权差写成两个逆映射输出之和，再沿单位方向取这两个输出的最大投影。Arb 区间运算夹定其和的最大值，给出严格小于 $2h$ 的上界。取到联合最大值的误差对可由正权共同真空盒中心两侧的权实现。 [手工推导、Arb 区间证书与复算脚本](https://github.com/the-omega-institute/trureturing-books/issues/1993#issuecomment-7239040945)

   若已知旗舰相位在全部有限高度及单位辐边极限均为全局极小点，再补读该点按 [@def-ou-ch13-wilson-winding-action] 校准的单位辐边绝对作用，相对作用所需的最低导数总阶恰为 $34$。绝对值使用固定的能量零点，计入 $433$ 个与相位无关的面。手工推导把两条软化驻点约束和这条绝对读数加入 $34$ 阶矩阵，Arb 区间运算认证所得矩阵满秩。若只读到 $33$ 阶，即使加入这些数据也至多有 $102$ 条独立约束，仍可在正权共同真空族中构造同读数的两组权。这个构造在有限高度唯一选出旗舰相位，在完整环面的单位辐边极限保留一对镜像等深极小点。 [手工推导与 Arb 区间证书](https://github.com/the-omega-institute/trureturing-books/issues/1877#issuecomment-7238536913)

   若能量零点未知，但已知固定的旗舰相位在全部有限高度和单位辐边极限均为全局极小点，给定至 $34$ 阶的精确相对作用导数后，可行权之差只剩一个方向。此时在合适的相位补读一次单位辐边相对作用即可辨识权重。对任意两组不同的可行权，上述闭六边形窗内使读数绝对差最大的位移唯一，等于 $(dx,dy)=(0,9.2\times10^{-6})$。手工推导将剩余方向的作用分为 $dx$、$dy$ 与 $dx-dy$ 三项。Arb 区间运算控制泰勒余项和各项的一、二阶导数，将极值限于两条边的端点。第 $35$ 阶首项在两个相对顶点给出相同幅度，高阶项决定了胜出的一端。

   对最大坐标差为 $2\times10^{-9}$ 的这类权对，最佳读数的间距约为 $4.71376313234908\times10^{-210}$。若单次相对读数允许任意有界加性误差，保证区分这两组权的充要条件是误差上界严格小于该间距的一半。恰到一半时，两组读数的允许区间在中点相接。 [手工推导、Arb 区间证书与复算脚本](https://github.com/the-omega-institute/trureturing-books/issues/1897#issuecomment-7238638383)

2. **几何站点上的轻代错位：** 尽管五种超荷在同一背景上各自切出三枚轻模，但荷 $1$ 与荷 $2, -4$ 的三维轻空间在十九个站点上彼此倾斜甚深——哪怕做尽全部站点相位对齐与站点重排，仍有超过三成的轻态权重直接泄入对方的重谱。
3. **壳真空对质子命运的沉默：** 同一座 $105$ 圈球壳真空、同一张树级质量谱，却既容得下保护质子寿命的 $\Delta B \equiv 0 \pmod 3$ 正交电流，也容得下触发 $QQQL$ 衰变的平行电流；质子是否稳定不是裸球壳真空自己能拍板的事。
4. **缺失的第二条尺度律：** 离散整数格点虽然单独锁死了 $d = 724$ 与 $k = 32$，固定 $k/d^2$ 后四层曲率主项保持不变，两圈规范读数随 $d$ 移动，两扇有限宽度的窗仍有共同的滑行区间；必须引入一条独立于三窗的尺度方程才能把两个参数分别钉牢。

这条尺度律无法由最简单的谱泛函的驻定条件给出。在该零点上，全部重场质量只经 $\log k - 2\log d$ 与 $-2\log d$ 两个组合依赖标尺，奇荷三十二行的超迹权全为负。于是，凡位力函数 $x f'(x)$ 不变号的单谱型超迹泛函，包括对数行列式、zeta 函数、热核、固定截止的牛顿核、迹恒等式以及维数正规化下奇数维的一圈势，在整个 $(k, d)$ 象限内都没有驻点。偶数维的一圈科尔曼—温伯格（Coleman–Weinberg）超迹在全部场共用一个减法常数时恰有一个驻点，其倍率与锚标度和减法常数无关：四维时 $k_* \approx 2.4135$，全部偶数维上不超过 $4.22$，而在 $k \ge 1$ 的参数域内，两窗给出的必要倍率区间端点约为 $29.98$ 和 $35.00$。区间证书采用外界 $(29.9841147, 35.0010644)$。驻点的分母只随锚标度协变，要得到 $d_* = 724$ 须取锚标度约 $4.20 \times 10^{14}\;\mathrm{GeV}$，这只是把选择转给了锚。只有把带对数的公式形式延拓到非整数维，在 $D \approx 11.1$ 处才能取到 $k_* = 32$。沿 $k / d^2$ 固定的滑行线，强耦合在 $d = 716$ 与 $d = 743$ 之间以每单位分母约 $-7.0 \times 10^{-5}$ 的割线移动，这两点仍在窗内，$715$ 与 $744$ 的名义读数出窗。[两类泛函的否定结果与滑行响应](https://github.com/the-omega-institute/trureturing-experiments/blob/d2ca3fd9b24cc2591e2d49a308c04407fce60ee0/experiments/ch39-omega-research/replay/%E4%BD%8D%E5%8A%9B%E5%AE%9A%E5%8F%B7%E4%B8%8E%E5%8D%95%E8%B0%B1CW%E5%9E%8B%E8%B6%85%E8%BF%B9%E6%B3%9B%E5%87%BD%E5%9C%A8%E4%B8%A4%E8%B4%A8%E9%87%8F%E6%A0%87%E5%B0%BA%E7%AA%97%E5%86%85%E6%B2%A1%E6%9C%89%E9%A9%BB%E7%82%B9.md) · [区间证书](https://github.com/the-omega-institute/trureturing-experiments/blob/d2ca3fd9b24cc2591e2d49a308c04407fce60ee0/experiments/ch39-omega-research/replay/ch39-mass-scale-spectral-stationarity.py)

把单谱换成几个谱函数的线性组合，并取与 $(k, d)$ 无关的锚，驻定条件仍分裂为奇荷、偶荷两个一元方程：驻点倍率只依赖混合的无量纲形状，分母则由锚唯一确定。对这一整类泛函，取到 $d_* = 724$ 都只是选锚。以四维截止族 $\mathrm{STr}\,M^4(\log M^2/\Lambda^2 - c) + \kappa\Lambda^2\,\mathrm{STr}\,M^2$（全部场共用 $c$）为例，驻点只经 $\sigma = \kappa e^{1/2 - c}$ 依赖系数；在 $k \ge 1$ 上，倍率落入两窗所要求的区间，当且仅当 $\sigma$ 位于 $(0.0345, 0.04411232)$ 内的一个区间。此时驻点是两向局部极小，但偶荷质量已超过截止，这条截断展开不再逼近任何精确的截止势。要恰在 $(32, 724)$，须取 $\sigma \approx 0.0398046$，并把锚调进端点比为 $1.0010005$ 的区间，这个比值正是曲率带的宽度。两个被选出的整数于是换成了两个被调准的实参数。所检验的不含自由系数的成员（共用常数的维数正规化、任意正核正则的精确一圈势、硬截止与固有时截止的大 $\Lambda$ 截断、整数两幂混合）的驻点倍率都不超过 $3.33$，或者根本没有驻点；让奇荷、偶荷两组场各取一个减法常数或锚，则与手工指定倍率完全等价。系数须调准这一条只对所检验的各族成立；以牛顿标定截止为锚的泛函，以及一般耦合奇偶两组质量的作用，仍待检验。[混合泛函的约化与四维截止族的分类](https://github.com/the-omega-institute/trureturing-experiments/blob/1922a9c010424eadf6b1ec7233be9fcb00911247/experiments/ch39-omega-research/replay/%E5%B8%B8%E6%95%B0%E9%94%9A%E6%B7%B7%E5%90%88%E8%B6%85%E8%BF%B9%E6%B3%9B%E5%87%BD%E7%9A%84%E9%A9%BB%E7%82%B9%E5%88%86%E6%AF%8D%E7%94%B1%E9%94%9A%E5%86%B3%E5%AE%9A%E8%80%8C%E5%9B%9B%E7%BB%B4%E6%88%AA%E6%AD%A2%E6%97%8F%E9%A1%BB%E8%B0%83%E5%87%86%E4%B8%80%E4%B8%AA%E6%97%A0%E9%87%8F%E7%BA%B2%E7%B3%BB%E6%95%B0%E6%89%8D%E8%83%BD%E8%BF%9B%E5%85%A5%E4%B8%A4%E8%B4%A8%E9%87%8F%E6%A0%87%E5%B0%BA%E7%AA%97.md) · [区间证书](https://github.com/the-omega-institute/trureturing-experiments/blob/1922a9c010424eadf6b1ec7233be9fcb00911247/experiments/ch39-omega-research/replay/ch39-mass-scale-mixed-supertrace-stationarity.py)

把系数交给具体的正则方案去定，这份清单可以加长为两条定理。其一，凡全部场共用一个非负固有时权 $R$ 的一圈势，精确势在 $k, d > 0$ 上都没有驻点；把它截到对数阶，就落回上面的四维截止族。常见的动量截止、取值在 $[0,1]$ 内的固有时轮廓，以及质量平方两两不同的最少 Pauli–Villars 减除，都满足 $0\le R\le1$。这类权给出的不变量满足 $\sigma\ge 2e^{\gamma-1}\approx 1.31044$，等号在锐固有时截止取到。截断势的奇荷、偶荷驻定方程各自只在 $\sigma$ 不超过相应临界值时有解，临界值分别约为 $0.50708$、$0.66838$，均低于这一界。因此两组方程都无根，截断势也没有驻点。对一般非负权，若截断驻点的倍率落入必要区间，还须有 $\sigma<0.04411232$。这要求正则权超过无正则值 $1$，且超出部分的带权对数测度大于 $3.39$。此时最重的偶荷质量远超截断的有效范围，精确势仍无驻点。其二，把四维与六维科尔曼—温伯格项相加，系数只经 $\tau = \lambda e^{c_4 - 1/2}$ 与两个减法常数之差进入驻点；在共用常数与维数正规化常数两种取法下，进窗的 $\tau$ 都落在两个端点比约 $1.37$ 的负区间内，分别在 $\lvert\tau\rvert \approx 4 \times 10^{-3}$ 与 $\lvert\tau\rvert \approx 10^2$ 附近，取 $\lambda = \pm 1$、$c_4 = 3/2$ 时驻点倍率不超过 $7.4$。这两项结论均以共用正则子和常数锚为前提，其他减法常数之差仍待检验。[正则方案给定系数的截断与四维加六维混合](https://github.com/the-omega-institute/trureturing-experiments/blob/98ddfcbeff13af52165e6a01c03fd0a7db7c33f2/experiments/ch39-omega-research/replay/%E5%8F%96%E5%80%BC%E4%B8%8D%E8%B6%85%E8%BF%871%E7%9A%84%E6%AD%A3Schwinger%E6%9D%83%E6%AD%A3%E5%88%99%E7%9A%84%E5%AF%B9%E6%95%B0%E9%98%B6%E6%88%AA%E6%96%AD%E7%BB%99%E5%87%BA%E4%B8%8D%E5%8F%98%E9%87%8F%E4%B8%8D%E4%BD%8E%E4%BA%8E%E4%B8%80%E7%82%B9%E4%B8%89%E4%B8%80%E9%9B%B6%E5%9B%9B%E8%80%8C%E5%9B%9B%E7%BB%B4%E5%8A%A0%E5%85%AD%E7%BB%B4CW%E6%B7%B7%E5%90%88%E5%9C%A8%E4%B8%A4%E7%A7%8D%E5%B8%B8%E6%95%B0%E5%8F%96%E6%B3%95%E4%B8%8B%E9%A1%BB%E6%8A%8A%E7%B3%BB%E6%95%B0%E8%B0%83%E8%BF%9B%E4%B8%A4%E4%B8%AA%E7%AA%84%E5%8C%BA%E9%97%B4%E6%89%8D%E8%83%BD%E8%BF%9B%E5%85%A5%E4%B8%A4%E8%B4%A8%E9%87%8F%E6%A0%87%E5%B0%BA%E7%AA%97.md) · [区间证书](https://github.com/the-omega-institute/trureturing-experiments/blob/98ddfcbeff13af52165e6a01c03fd0a7db7c33f2/experiments/ch39-omega-research/replay/ch39-mass-scale-fixed-regulator-truncations.py)。

固有时权允许取负值时，在调节质量两两不同的指数和型 Pauli–Villars 减除中，调节质量最少的一类是三个调节质量、只消去四次与二次发散的组合；它恰好构成一族 $R_\nu = F + \nu p$，其中 $F$、$p$ 是三个指数分布之和的分布函数与密度，$\nu$ 正比于留下的对数发散系数。对任意质量比，精确势只在 $\nu \in (-Q_0, 0)$ 时才可能有驻点（$Q_0 > 0$ 由三个调节质量决定），在这个参数区间内，权在短固有时处为负。质量平方比取 $(1, 2, 3)$ 或 $(1, 4, 9)$ 时，每个这样的 $\nu$ 都给出驻点，但全部驻点的倍率都夹在 $1.0398$ 与 $4.4295$ 之间，远低于两窗要求的倍率区间。截断则不同：这些成员的权处处小于 $1$，不变量 $\sigma$ 却可以任意接近零，把 $\nu$ 调进一个很窄的区间（质量平方比 $(1, 2, 3)$ 时宽度不到 $Q_0$ 的 $0.36\%$）就能让截断驻点的倍率落入必要区间。这说明前述下界 $\sigma \ge 2e^{\gamma - 1}$ 离不开权非负的前提，对这两组质量平方比，精确势驻点的倍率仍在上述较小区间内。一般质量比下驻点倍率的统一上界、四个以上调节质量与导数型减除仍未判定（[三调节质量的变号 Pauli–Villars 正则](https://github.com/the-omega-institute/trureturing-experiments/blob/63208158b4e5e50b6008a59bf8a7555805617352/experiments/ch39-omega-research/replay/%E4%B8%89%E4%B8%AA%E4%B8%8D%E5%90%8C%E8%B0%83%E8%8A%82%E8%B4%A8%E9%87%8F%E7%9A%84%E6%8C%87%E6%95%B0%E5%92%8C%E5%9E%8BPV%E6%AD%A3%E5%88%99%E4%BB%85%E5%9C%A8%E5%AF%B9%E6%95%B0%E5%8F%91%E6%95%A3%E7%B3%BB%E6%95%B0%E4%B8%BA%E8%B4%9F%E6%97%B6%E6%9C%89%E9%A9%BB%E7%82%B9%E4%B8%94%E4%B8%A4%E7%A7%8D%E6%95%B4%E6%95%B0%E8%B4%A8%E9%87%8F%E6%AF%94%E4%B8%8B%E9%A9%BB%E7%82%B9%E5%80%8D%E7%8E%87%E5%A4%B9%E5%9C%A8%E4%B8%80%E7%82%B9%E9%9B%B6%E4%B8%89%E4%B9%9D%E4%B8%8E%E5%9B%9B%E7%82%B9%E5%9B%9B%E4%B8%89%E4%B9%8B%E9%97%B4%E8%80%8C%E6%88%AA%E6%96%AD%E9%A1%BB%E6%8A%8A%E8%AF%A5%E7%B3%BB%E6%95%B0%E8%B0%83%E8%BF%9B%E4%B8%A4%E4%B8%AA%E7%AA%84%E5%8C%BA%E9%97%B4%E6%89%8D%E8%BF%9B%E7%AA%97.md) · [区间证书](https://github.com/the-omega-institute/trureturing-experiments/blob/63208158b4e5e50b6008a59bf8a7555805617352/experiments/ch39-omega-research/replay/ch39-mass-scale-sign-changing-pauli-villars.py)）。

如果用同一批重场的谱矩作标尺，改变 $d$ 时，尺和被量的质量会一起变。固定上述零点与谱形，令 $s=\bar M/d^2$，则奇荷质量为 $s h_i$，偶荷质量为 $s k h_i$。取可微的正谱锚 $\Lambda$，满足一阶齐次律 $\Lambda(t m)=t\Lambda(m)$（$t>0$）。若势的形式为 $V=\Lambda^p F(m/\Lambda)$，其中 $F$ 可微，系数无量纲且固定，则所有质量比只依赖 $k$。把 $\Lambda(h_{\mathrm{odd}},k h_{\mathrm{even}})^p$ 也并入形状函数 $G$，直接求导得

$$
V=s^p G(k),\qquad
d\,\partial_d V=-2p V,\qquad
\partial_k V=s^p G'(k).
$$

因此 $p=0$ 时，联合驻定只要求 $G'(k)=0$；$p\ne0$ 时还须 $G(k)=0$。每个满足条件的 $k$ 都容许任意 $d>0$。若另有独立测量给出 $k/d^2$，它才可与选出的 $k$ 一起确定 $d$。

可以直接用这枚零点的场表试算。令 $A_j,B_j$ 分别为奇荷、偶荷组内 $\sum_i g_i h_i^j$ 的绝对值（先按原超迹权 $g_i$ 求和），$j=2,4$。两组的这四个数均为正。以两组二阶矩绝对值之和作 $\Lambda^2=s^2(A_2+k^2 B_2)$，用它归一化相应的四阶矩。写 $x=k^2$，所得形状与导数为

$$
J(x)=\frac{A_4+x^2 B_4}{(A_2+xB_2)^2},\qquad
\frac{dJ}{dx}=\frac{2(x A_2B_4-B_2A_4)}{(A_2+x B_2)^3}.
$$

唯一极小倍率为 $k=\sqrt{B_2 A_4/(A_2 B_4)}\simeq2.10215$，低于两窗要求的下端。若改取有量纲的四阶矩 $\Lambda^4J=s^4(A_4+k^4 B_4)>0$，则 $d$ 方向处处有斜率。这里分别对两组取绝对值是一项明确的模型选择。[场表、二阶与四阶矩及倍率的区间证书](https://github.com/the-omega-institute/trureturing-experiments/blob/1922a9c010424eadf6b1ec7233be9fcb00911247/experiments/ch39-omega-research/replay/ch39-mass-scale-mixed-supertrace-stationarity.py#L31-L81)

在旗舰零点的四层模型中，可以直接检验外部牛顿标定能否使真空能量驻定。固定 $r=k/d^2>0$，令 $\ell=\log d$。偶荷质量与由其中一条质量定义的跷跷板尺度 $a=\mu^2/M_P^2$ 都固定，奇荷质量平方 $z_i=m_i^2/M_P^2$ 则正比于 $d^{-4}$。逐质量配平抵消了重层的真空能量，却给每条奇荷重层留下严格为正的牛顿权 $\alpha_i$。取单个硬固有时截止 $x=Q^2/M_P^2>0$、零裸项与四层重数 $D=4$，把 [@def-ou-ch11-four-layer-vacuum] 的真空读数记为 $V=8\pi\rho/M_P^4$。在 $K=1$ 上曲率就等于 $V$。[逐层配平的场表](https://github.com/the-omega-institute/trureturing-experiments/blob/1922a9c010424eadf6b1ec7233be9fcb00911247/experiments/ch39-omega-research/replay/ch39-joint-vacuum-scale-window.py#L20-L36)

以 $O$ 表示奇荷重层，在固定 $r$ 下手算两个偏导。由 $E_2'(u)=-E_1(u)$，以及 $V=Da^2 I(a/x)/(4\pi)$ 的积分下限，有

$$
\left.\frac{\partial K}{\partial\ell}\right|_x
 =\frac{2}{\pi}\sum_{i\in O}\alpha_i z_i E_1(z_i/x)>0,
\qquad
\frac{dV}{dx}=\frac{Dx}{4\pi}(1-e^{-a/x})^3>0 .
$$

因此在每个牛顿标定点附近都可沿 $K=1$ 把 $\ell$ 写成 $x$ 的函数。沿这条曲线增加 $x$ 必使真空能量上升，即使 $\partial K/\partial x=0$ 也成立。这个四层势在整个正参数标定面上没有联合驻点。

若另行给定 $r$，哪些精确曲率确实来自有限正分母？记 $F_r(x)$ 为删去奇荷重层后的牛顿读数。每条奇荷的 $E_2(z_i/x)$ 在 $d$ 从零增至无穷时严格从零升至一，两组奇荷重层的总牛顿权为 $16(6+2)=128$。因此给定 $x$ 时，正分母存在且唯一的充要条件为

$$
F_r(x)<1<F_r(x)+\frac{128x}{2\pi}.
$$

在旗舰滑行 $r=32/724^2$ 上，记右侧函数等于一的根为 $x_-$，左侧函数等于一的根为 $x_+$。两根各自唯一。事实上，十九点磁拉普拉斯的行和界给出 $0\le\lambda\le36$，所以谱形 $\lambda|\lambda-\bar\lambda|\le36^2$，带偶数荷的重层均有 $z<0.00025$。它们的正权共 $112$，中性负权共 $-54$。在 $x\ge0.006$ 上，由 $\partial_x[xE_2(z/x)]=e^{-z/x}$，两端函数的导数乘 $2\pi$ 均至少为 $112e^{-0.00025/0.006}-54>53$。更小的截止即使计入全部正权也只有 $K\le253.5x/(2\pi)<1$。

因此，在只施加牛顿标定的连续滑行线上，$d$ 从零增至无穷时，$x$ 由 $x_+\simeq0.087881452$ 严格降至 $x_-\simeq0.031496220$，两个端点均不取到。每个介于 $V(x_-)$ 与 $V(x_+)$ 之间的精确曲率依次唯一确定 $x,d$ 与 $k=rd^2$。整个开区间的宽度约为无限截止值的 $5.193\times10^{-60}$。 [端点推导与谱区间复算](https://github.com/the-omega-institute/trureturing-books/issues/1671#issuecomment-7236014282)

在原压力测试的局部盒内，$I(0)-I(a/x)\le a/x$ 把有限截止修正限制在主项的 $10^{-57}$ 以内。从 $d=724$ 滑至 $724.19$ 的两次读数之差，以无限截止主项为单位，在 $1.685\times10^{-69}$ 与 $1.687\times10^{-69}$ 之间。[标定区间与截断误差](https://github.com/the-omega-institute/trureturing-experiments/blob/1922a9c010424eadf6b1ec7233be9fcb00911247/experiments/ch39-omega-research/replay/ch39-joint-vacuum-scale-window.py#L38-L68) · [两处标定根与曲率差的区间复算](https://github.com/the-omega-institute/trureturing-books/issues/1671#issuecomment-7235892201)

一个小谱可以把这个微弱效应放大。取 $r=a=1$、$D=4$，四条低层在 $z=0,1,2,3$ 处的牛顿权依次为 $(1/3,2,1,2/3)$，净偏振为 $(-4,12,-12,4)$。再放入一条 $z=d^{-4}$ 的奇荷层，含四个实标量和一个狄拉克费米子，净偏振为零、牛顿权为一。所有牛顿权均为正，由 $\partial_x[xE_2(z/x)]=e^{-z/x}$ 知 $K$ 从零严格升至无穷。将 $d$ 从 $1$ 加倍至 $2$，唯一标定根 $x$ 由 $3.08609$ 降至 $2.67179$，曲率由 $0.16783$ 降至 $0.15821$。一般的重场耦合作用仍需自己的驻定方程。

::: {.film src="winding-ladder"}
**从 529 个三角面的双钟作用出发，绕数阶梯一级级爬到 105 圈，旗舰零点在顶上留下见证与四道裂隙（2 分 48 秒）。** 片头一个示意三角面绕出品红回路角 $\varphi_\triangle$，青色基频曲线 $1-\cos\varphi$ 旁升起琥珀色的 $k=19$ 谐波，作用量 $S_w$ 是本章选定的模型（[@def-ou-ch13-wilson-winding-action]），标为论证。绿色 `LEAN ✓` 只贴在 [@thm-ou-ch13-noncommutative-witness] 上：屏幕算出 $(1+\mathbf{i})(1+\mathbf{j})=(1,1,1,1)$ 与 $(1+\mathbf{j})(1+\mathbf{i})=(1,1,1,-1)$，再由 $\kappa=\tfrac12,\tfrac14,\tfrac12$、$B=\tfrac14$ 得 $\det\mathbf{G}_3=\tfrac14$。七级台阶 $\le 18 \to 19 \to 21 \to 27 \to 31 \to 36 \to 105$ 逐级点亮（当前一级琥珀色），台阶上方的读数、[@rem-ou-ch13-monotone-cone-geometry] 的 $>1/4$ 能差与十位码 `1011`／九位码 `505`、[@ex-ou-ch13-flagship-zero] 中零点 `#2,306,888,100,085` 的 ppm 标尺，以及四重压力测试面板，都是本章复算证书的数字，标为 `NUM`；递减权柱与能级位置是示意。片中明说：这枚零点是模型内部的见证，不是对夸克混合的推导。
:::

五百二十九面双钟作用于是把我们带到了一个奇特的高原：它证明了联合三窗与百万分之一级夸克混合的真实零点真空确实存在且拥有正自然密度，却同时宣告单靠裸壳三角面无法绕开 $105$ 圈高频需求与百维自由系数。如果高阶响应与有效弱接触必须源自有限半径的局部壳几何与内部隐藏自由度，那我们就必须打开球壳的内部结构——走进[第十四章](ch14-624-channels-and-memory-rank.md)的六百二十四通道与局部记忆秩阶梯。
