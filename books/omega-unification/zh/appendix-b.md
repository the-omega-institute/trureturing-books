# 附录 B 受控术语词典、六层证据总账与实时形式化统计

本附录为《OMEGA 统一》（`OMEGA//UNIFY`）全书五卷十五章提供四份核心速查总表：全书受控中英术语与数学符号词典、六层认识论证据分层总账、交互实验室 `OMEGA//UNIFY` 与九幅双语定制静态图索引，以及基于所钉 `trureturing@dev` 提交 [{commit}](trureturing:) 在构建时实时生成的全书形式化验证统计。上游复算仓库结构、`ShellProjection.lean` 与 34 支代表性脚本索引见 [附录 A](appendix-a.md)。

## B.1 受控双语术语与核心符号词典 {#sec-ou-appb-glossary}

下表统一全书五卷的中英文核心术语，明确每项概念的精确定义与适用边界，避免将模型内有效参数误读为第一性原理常数：

| 中文术语与核心符号 | 英文对应术语 | 精确数学定义与物理边界 | 正文入口 |
| :--- | :--- | :--- | :--- |
| **十九点贝伦德球壳** $S_{19}$ | 19-Point Behrend Shell | 整球面 $x_1^2 + x_2^2 + x_3^2 = 867$ 上的 19 点反三项等差构型，取平方弦长 $d^2 \le 804$ 的 135 条原边与 22 个独立频率 | [第一章](ch01-behrend-shell-and-frequencies.md) |
| **四元数双时钟** $(U, V)$ | Dual Quaternion Clocks | 由正黎曼零点纵坐标 $\gamma$ 与原弧角差 $p = (\theta_{724}-\theta_{244})\gamma$、$q = (\theta_{804}-\theta_{244})\gamma$（辅以最短原弧 $v = \theta_{12}\gamma$）生成的单位四元数比较钟 | [第二章](ch02-quaternion-clocks-and-haar-zeros.md) |
| **黎曼零点候选窗** | Candidate Riemann Zero Window | 经费耶尔核碰撞界、兰道围道与算术舒尔枢轴筛出的实际正零点区间（如 #8236、#8359、#11431、#148341、#226358 与 #2,306,888,100,085） | [第三章](ch03-riemann-zeros-fejer-and-landau.md)、[第十三章](ch13-winding-ladder-and-joint-vacuum.md) |
| **磁球壳质量算子** $L_\gamma$ | Magnetic Shell Mass Operator | 挂接双钟带荷边相位的十九点图拉普拉斯算子及其两步局部扩展 $\kappa L(L - cI)$，决定重模阈值与轻模谱隙 | [第四章](ch04-gauge-crossings-and-monotone-barriers.md) |
| **规范动能谱迹** $S(u), M_1$ | Gauge Kinetic Spectral Trace | 由单一正热核权生成的动能矩 $S(u) = \sum_i e^{-u y_i}$ 与一阶尺度导数 $M_1 = \sum_i y_i e^{-y_i}$；单迹配平存在锐下界 $r = Q/M > 189$ 与 $3.9Q$ 微扰封顶 | [第五章](ch05-kinetic-trace-and-uv-ceilings.md) |
| **中性门户秩五界** $d \ge 5$ | Rank-Five Neutral Portal Floor | 自旋配平两圈交汇窗内同时满足希格斯质量与四次稳定性的最小平坦规范中性单态维数（$d \le 4$ 严格排除） | [第六章](ch06-higgs-portals-and-electroweak-scale.md) |
| **共同谱隙与站点方差分界** | Universal Spectral Gap & Site-Variance Cut | 全双钟环面五荷共用的三轻模谱隙 $(8.685, 9.6)$，及由全壳非平凡二分跨界边权平方和最小值给出的站点方差分界 $T = 9 + (1-\delta)^2$（原固定分界三窗零点之共同谱隙皆含 $[9, 10.19]$） | [第七章](ch07-chiral-three-generations.md) |
| **三代轮换破缺与 42 圈 CP 底线** | Cyclic Breaking & 42-Loop CP Floor | 壳坐标轮换 $P:(x,y,z)\mapsto(y,z,x)$ 强制 CKM 单项化；实测混合要求 $\|[T,X]\|_{\mathrm{HS}} > 0.0414$，几何三角闭路重现参考 CP 相位恰需 42 圈 | [第八章](ch08-flavor-hierarchy-and-ckm.md) |
| **六面味坐标** $c$ | Six-Face Flavor Coordinate | 十九点壳上标定味结构的有理角坐标；[2]+[4] 联立强制 $|c| > 0.9404240$，10 位二进制码 `1011` 即排除单调全局真空（9 位码 `505` 有反例） | [第八章](ch08-flavor-hierarchy-and-ckm.md)、[第十三章](ch13-winding-ladder-and-joint-vacuum.md) |
| **重子三重对称** $\mathbb{Z}_3$ | Baryon Triality | 残余离散对称 $X = h(2Y-B) + q(3B) \pmod 3$，要求局域算符满足 $\Delta B \in 3\mathbb{Z}$，将轻场重子破坏算符推高至维数 15（保 $B-L$ 为 18） | [第九章](ch09-proton-stability-and-baryon-triality.md) |
| **四维单纯形雷吉作用与铰链负载** | Simplicial Regge Action & Hinge Load | 等边四单形上的角亏和 $K = A(2\pi N_2 - 10\theta N_4)$ 与三角面铰链阶数 $q_h$；在 $g = I - J/5$ 上复现自旋二 Fierz–Pauli 动能并暴露共形模发散障碍 | [第十章](ch10-regge-gravity-and-spin2.md) |
| **四层热核真空配平** | Four-Layer Vacuum Stencil | 利用四层重谱热核系数抵消主导紫外真空能的千分之二曲率窗方案，仍伴随显著暗能量灵敏度与共同标尺外生性 | [第十一章](ch11-induced-gravity-and-dark-energy.md) |
| **共同算术钟** $F(j)$ | Shared Arithmetic Clock | 单一正半定算子 $K$ 与单位源 $s$ 的二次预解式读数 $F(j) = \langle s, (I + j^2 K)^{-1}s\rangle$；基准尺度上，六项精确输入使 $p(B)>99.931\%$，六项输入的 44 位格锁定第七项 35 位码 `32071996606` | [第十二章](ch12-shared-arithmetic-clock.md) |
| **529 面双钟作用与绕数阶梯** | 529-Triangle Action & Winding Ladder | 十九点壳 529 个三角面的加权双钟变分作用，其临界阶梯依次经 19、21、27、31、36 圈抵达 105 圈跨高度全局门槛，且单调权全阶受阻 $> 1/4$ | [第十三章](ch13-winding-ladder-and-joint-vacuum.md) |
| **624 内部通道与三分之一中转格** | 624 Internal Channels & Denominator-Three Shell | 由极点三条最近邻有向弦比较派生的 624 通道及允许九步回程与 17 拍局部反射的 76 点三分之一球面中转格 | [第十四章](ch14-624-channels-and-memory-rank.md) |
| **局部辅助记忆秩阶梯** | Auxiliary Memory Rank Staircase | 在原十九点上精确复现三时钟完整响应所需的最小辅助维数随平方弦距截止 $D$ 的单调阶梯：$38 \to 29\text{--}31 \to 26\text{--}27 \to 25\text{--}26 \to 24 \to 23 \to 21 \to 20 \to 19$（$C_3$ 对称截止 $D = 392$） | [第十四章](ch14-624-channels-and-memory-rank.md) |

为便于跨章对照公式，下表另列全书高频出现的数学符号速查：

| 符号 | 精确含义与量纲角色 | 首次或主要出处 |
| :--- | :--- | :--- |
| $\theta_j = \arccos(1 - j/1734)$ | 平方半径 $867$ 壳上平方弦长为 $j$ 的原弧圆心角（无量纲弧度） | [第一章](ch01-behrend-shell-and-frequencies.md)、[第二章](ch02-quaternion-clocks-and-haar-zeros.md) |
| $\gamma_n$ | 第 $n$ 枚正黎曼零点纵坐标（按重数计数） | [第三章](ch03-riemann-zeros-fejer-and-landau.md) |
| $r = Q/M,\;\tau = \log(Q/\mathrm{TeV})$ | 交汇尺度与重谱基频之比，及相对 $1\,\mathrm{TeV}$ 的对数跑动长度 | [第五章](ch05-kinetic-trace-and-uv-ceilings.md) |
| $W_L^{\log}, W_R^{\log},\;\alpha_G^{-1}$ | 左右重标量塔一圈对数暴露与交汇点处统一规范逆耦合 | [第五章](ch05-kinetic-trace-and-uv-ceilings.md) |
| $B \subset (0, \infty)$ | 共同算术钟浓缩 $>99.931\%$ 谱权的三段零点高度带并集 | [第十二章](ch12-shared-arithmetic-clock.md) |
| $T_j,\;F(j)$ | 黎曼 $\xi$ 函数参考算术时间与共同二次预解式第 $j$ 项读数 | [第十二章](ch12-shared-arithmetic-clock.md) |
| $k, d$ | 联合零点见证中的中心偶倍率（$k = 32$）与钟弦分母（$d = 724$） | [第十三章](ch13-winding-ladder-and-joint-vacuum.md) |
| $D$ | 旧十九点传播块允许局域修正的平方弦距截止（$56, 224, 296, 392, 544, 1152, 1376, 1568$） | [第十四章](ch14-624-channels-and-memory-rank.md) |

## B.2 六层认识论证据分层总账 {#sec-ou-appb-epistemic-ledger}

本书对每一条定理、数值区间、模型构造与开放目标均执行严格六层划界。各层之间实行**单向不可越级原则**：Arb 高精度区间认证、上游独立 `Init` 重放或外部 RH 形式化里程碑均不会自动把 `ARGUED`、`NUM`、`MODEL` 或 `OPEN` 条目抬升为本书所钉提交上的 `LEAN ✓` 冻结定理：

| 证据层级与徽章 | 验证机制与数据来源 | 逻辑边界与公理责任 | 全书代表内容与交叉入口 |
| :--- | :--- | :--- | :--- |
| **第 1 层 · Lean 4 冻结内核锚点**（`LEAN ✓`） | `the-omega-institute/trureturing@dev` 所钉提交 [{commit}](trureturing:) 上的冻结声明（同时涵盖零公理 `OmegaInit`/`OmegaMath` 基座与经典 `Mathlib` 对照锚点） | 经 Lean 4 内核完整校验并写入 `Golden/Frozen/state/`；按所钉快照的公理元数据区分为零公理（`axioms: []`）、已记录标准公理侧与快照未记录公理闭包的冻结声明，实时计数见 [§B.4](#sec-ou-appb-live-stats) | 有理射影重叠与凯莱正交旋转、无 $\pi$ 哈尔矩与彼得—魏尔正交、有理拉格朗日—格拉姆与舒尔补极小、赫维茨 $F_3$ 伴随单射与模方 5 赫克谱界 |
| **第 2 层 · 外部已形式化 RH/GRH 边界**（外部形式化事实） | 2026 年 11 月 21 日 Lean FRO 与 Mathlib Initiative 联合确认的 [Alpöge 黎曼猜想形式化证明](https://leanprover-community.github.io/blog/posts/riemann-hypothesis/) | 作为外部独立形式化里程碑予以引述，明确区隔于本书采用的有限高度算术包围检验，且绝不自动赋予物理匹配模型或选权假设任何形式化背书 | [第三章](ch03-riemann-zeros-fejer-and-landau.md) 临界线零点谱底座与 [第十二章](ch12-shared-arithmetic-clock.md) 算术钟有限高度区间边界 |
| **第 3 层 · 书面证明与文献边界**（`ARGUED`） | 作者与评审逐行核验的代数、分析与组合证明（载于 `Ω复算说明.md` 与 9 份专题档案）及注明出处的文献定论 | 不佩戴 `LEAN ✓` 内核徽章；须满足前提透明、反例可核对，部分纯代数核心具备后续下沉 Lean 形式化的条件 | 单正谱迹 $r \le 189$ 凸性排除（[第五章](ch05-kinetic-trace-and-uv-ceilings.md)）、三代轮换 $\|[T,X]\|_{\mathrm{HS}} > 0.0414$ 与 42 圈 CP 下界（[第八章](ch08-flavor-hierarchy-and-ckm.md)）、Gauss–Radau 极值与伯恩斯坦证书框架（[第十二章](ch12-shared-arithmetic-clock.md)）及 PDG 实测输入边界 |
| **第 4 层 · 计算证书与数值实验诊断**（`NUM`） | 组织实验库 `trureturing-experiments`（`experiments/ch39-omega-research/replay/`）1,785 文件复算归档中的 `Fraction` / `python-flint`（Arb、`fmpq_mat`）断言脚本、`Init`-重放的 `ShellProjection.lean`（`rfl`），以及 `OMEGA//UNIFY` 交互实验室的浏览器实时数值诊断 | 精确有理、Arb 与 `rfl` 复算证书具零浮点舍入漂移保证，严格依赖所声明的输入区间与截断前提；实验室实时数值诊断（如有限相位网格上的双精度雅可比本征值计算）显式披露精度与抽样边界；上游独立 `ShellProjection.lean` 归此层，不并入 `trureturing@dev` 冻结统计 | 平方半径 17 九点壳压缩（[附录 A §A.2](appendix-a.md#sec-ou-appa-shell-projection)）、35 位第七时间码 `32071996606`（[第十二章](ch12-shared-arithmetic-clock.md)）、单调权 $> 1/4$ 排斥与 105 圈联合零点见证（[第十三章](ch13-winding-ladder-and-joint-vacuum.md)）、$38 \to 19$ 最小辅助记忆秩阶梯（[第十四章](ch14-624-channels-and-memory-rank.md)） |
| **第 5 层 · 模型内有效构造**（`MODEL`） | 明确写明全部额外表示、势函数、标尺与权重输入的有效构造（对应四问中 **4/4** 的模型内通过分支） | 严禁冒充无参数第一性原理推导；每条构造必须同页并列其外生自由度与灵敏度账单 | $r = 400$ 两圈规范交汇与秩五中性希格斯门户（[第 5–6 章](ch05-kinetic-trace-and-uv-ceilings.md)）、54 模矩阵希格斯味拟合与 $\mathrm{U}(1)_X$ 重子三重完备（[第 8–9 章](ch08-flavor-hierarchy-and-ckm.md)）、四层热核曲率窗（[第十一章](ch11-induced-gravity-and-dark-energy.md)）与 105 圈 100 维权族（[第十三章](ch13-winding-ladder-and-joint-vacuum.md)） |
| **第 6 层 · 第一性原理开放前沿**（`OPEN`） | 对应原书四问中 **0/4** 尚未从单一主联络无事后拟合导出的核心硬问题 | 严格保留未证状态，不附验证引用，为后续理论突破与形式化提供明确验收门槛 | 导出重阈值与电弱标度、从主联络选定站点方差分界并构造四维相互作用手征三代、导出共同味作用与动态质子选择定则、导出 $G_N$ 与暗能量以及建立自然非单调选权原理（汇总于 [第十五章](ch15-unified-verdict-and-open-roadmap.md) 与 [终章](coda.md)） |

## B.3 交互实验室与全书九幅静态图索引 {#sec-ou-appb-media-map}

本书配有一座五卡联动的交互三维与数值实验室 **`OMEGA//UNIFY`**（目录标识 `behrend-unification-lab`），以及 **9 幅双语定制语义静态图**（由 `books/omega-unification/figures/` 下的脚本按主题与印刷版统一配色角色生成：绿色与蓝色保留给 Lean 核验与零公理内核、紫色标记书面证明与精确证书及已证锐障、琥珀色标记当前模型选择、红色严格保留给开放前沿）。下表先列出交互实验室全部五张实验卡的部署位置与操控对象：

| 实验室代号与实验卡 ID | 核心实验对象与实时读数 | 正文嵌入章 | 综合工作台入口 |
| :--- | :--- | :---: | :---: |
| **`OMEGA//UNIFY`** · `shell-clocks` | 十九点贝伦德球壳（$r^2 = 867$，底层 135 原边）三维分布、选定弦类弧与双四元数时钟相位联动 | [第一章](ch01-behrend-shell-and-frequencies.md) | [第十五章](ch15-unified-verdict-and-open-roadmap.md) |
| **`OMEGA//UNIFY`** · `three-gen-gap` | 五种荷质量谱随双钟角滑动，实时对比站点方差分界 $T$、固定分界 $9$ 与全环面三轻模共同谱隙 $(8.685, 9.6)$ | [第七章](ch07-chiral-three-generations.md) | [第十五章](ch15-unified-verdict-and-open-roadmap.md) |
| **`OMEGA//UNIFY`** · `clock-bands` | 共同算术钟前六项约束下的三高度带 $B$ 谱权浓缩（$>99.931\%$）与第七项 35 位码分离 | [第十二章](ch12-shared-arithmetic-clock.md) | [第十五章](ch15-unified-verdict-and-open-roadmap.md) |
| **`OMEGA//UNIFY`** · `winding-ladder` | 529 面双钟作用的 $19 \to 21 \to 27 \to 31 \to 36 \to 105$ 绕数阶梯与单调权 $> 1/4$ 能隙 | [第十三章](ch13-winding-ladder-and-joint-vacuum.md) | [第十五章](ch15-unified-verdict-and-open-roadmap.md) |
| **`OMEGA//UNIFY`** · `memory-rank` | 旧壳修正弦距截止 $D$ 滑动下的 $38 \to 19$ 三时钟最小辅助记忆秩阶梯与 $D = 392$ 对称槛 | [第十四章](ch14-624-channels-and-memory-rank.md) | [第十五章](ch15-unified-verdict-and-open-roadmap.md) |

下表逐一索引全书全部 **9 幅双语定制语义静态图**：

| 序号 | 静态图脚本标识 | 所属章节 | 图景主题与关键数学边界 |
| :---: | :--- | :---: | :--- |
| 1 | `ou-five-volumes` | [前言](README.md) | 五卷全景路线图：从十九点贝伦德球壳与黎曼零点入口经五卷直抵 `4/4` 模型见证与 `0/4` 零拟合总账 |
| 2 | `ch01-behrend-shell` | [第一章](ch01-behrend-shell-and-frequencies.md) | 十九点贝伦德球壳单位球投影、极点 $(17, 17, 17)$、六条三点循环轨道与最短弦 $12$ 及双钟弦 $724, 804$ |
| 3 | `ch03-zero-window-landscape` | [第三章](ch03-riemann-zeros-fejer-and-landau.md) | 第 `#11431` 枚零点相对 `#11628` 的中点隔离、Fejér 四阶矩占比与三条谐波相位亏额对数时间窗 |
| 4 | `ch05-gauge-threshold-boundaries` | [第五章](ch05-kinetic-trace-and-uv-ceilings.md) | 标量阈值族 $r \le 189$ 排除、$r = 400$ 与自旋配平 $r \approx 8.53$ 交汇及 $3.9Q / 14Q / 20Q / 30Q$ 微扰紫外上界 |
| 5 | `ch07-three-generation-gap` | [第七章](ch07-chiral-three-generations.md) | 五荷单步磁拉普拉斯全环面三轻模共同谱隙 $(8.685, 9.6)$、公共截断 $9$ 与 $(1, \omega, \omega^2)$ 循环特征标 |
| 6 | `ch11-vacuum-balance-sensitivity` | [第十一章](ch11-induced-gravity-and-dark-energy.md) | 从普朗克标度至 $10^{-122}$ 暗能量的对数曲率阶梯、紫外截止变号门槛与四层 $(-1, 3, -3, 1)$ 矩抵消模板 |
| 7 | `ch12-arithmetic-clock-bands` | [第十二章](ch12-shared-arithmetic-clock.md) | 六项时间强迫的三高度带浓缩（$>99.931\%$）与第七拍 $35$ 位预测码 `32071996606` vs. 参考码 `32071992476` |
| 8 | `ch13-winding-threshold-ladder` | [第十三章](ch13-winding-ladder-and-joint-vacuum.md) | 529 面双钟绕数阶梯（$\le 18, 19, 21, 27, 31, 36, 105$）、非增权 $> 1/4$ 能差与联合零点见证 `#2,306,888,100,085` |
| 9 | `ch14-memory-rank-staircase` | [第十四章](ch14-624-channels-and-memory-rank.md) | 平方弦距截止 $D$ 下的三时钟最小辅助记忆秩阶梯（$38 \to 19$）、$D = 392$ 循环对称门槛与 $D = 512$ 时钟跳变 |

## B.4 全书实时形式化统计 {#sec-ou-appb-live-stats}

遵循本仓库“源文件唯一真理、统计产物编译期自动生成”的契约，本节不手工抄录任何定理或环境总数，而是直接嵌入构建工具依据 `trureturing.lock.json`（所钉 `trureturing@dev` 提交 [{commit}](trureturing:)）实时编译的全书形式化证据摘要表：

::: {.stats src="summary"}
:::

覆盖本书全部正文与媒体引用的冻结声明完整索引（附所钉提交上的源码逐行链接）由构建流水线按需独立生成；条目被纳入统计索引并不改变其所属的认识论层级。

::: {.stats src="declarations" display="link" format="html"}
查看编译生成的完整声明索引
:::

查阅上方动态统计与声明索引时，请始终严守编译统计与数学证明责任之间的清晰边界：

::: {.remark #rem-ou-appb-epistemic-boundary title="动态统计与证据责任的边界"}
上方的实时汇总与声明索引精确记录本书在所钉 `trureturing@dev` 提交上引用的机器核验声明、公理分布与环境频次；但索引收录、统计汇总或三维交互演示本身从不替代数学证明，也不将 `ARGUED`、`NUM`、`MODEL` 或 `OPEN` 结论升级为 `LEAN ✓`。同样，[附录 A](appendix-a.md) 中的上游 Python / Arb 证书与独立 `Init`-重放文件 `ShellProjection.lean` 属于第 4 层计算证据（`NUM`），与 `trureturing@dev` 冻结声明分账管理；核查任一命题时，请始终回到对应章节的完整前提与边界条件。
:::
