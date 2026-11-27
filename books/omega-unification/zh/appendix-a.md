# 附录 A 复算仓库结构、核心脚本与证书索引

本附录完整索引本书五卷十五章所依赖的上游研究与复算目录 [`experiments/ch39-omega-research/`](https://github.com/the-omega-institute/trureturing-experiments/tree/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research)（归档于组织实验库 [`the-omega-institute/trureturing-experiments`](https://github.com/the-omega-institute/trureturing-experiments)，本书固定快照提交 `ba0ac9539cdb641744054bf3a0398494f4cba1c8`）。

以下四节依次给出：上游复算目录的顶层架构、数据支撑与十份核心专题档案；独立 Lean 4 整数压缩证书 `replay/ShellProjection.lean` 的代数结构与全部定理导读；按全书十五章归类的 34 支代表性 Python / `python-flint`（Arb）/ SymPy 复算脚本永久链接；以及本地复现依赖、标准运行命令与失败即中止的断言规程。关于本仓库外接的 `trureturing@dev` 冻结声明与编译期实时统计，请参阅 [附录 B §B.4](appendix-b.md#sec-ou-appb-live-stats)。

## A.1 上游研究与复算仓库全景结构 {#sec-ou-appa-repo-layout}

在所钉提交 `ba0ac9539cdb641744054bf3a0398494f4cba1c8` 上，`experiments/ch39-omega-research/` 由顶层主索引、离线归档压缩包与完整 `replay/` 证书目录三部分构成。除 1,668 支 Python 证书脚本与 60 份中文论证与专题记录档案外，`replay/` 还包含 46 份 JSON 参考区间输入表（例如保存 288 位参考区间的 `ch39-minimum-tick-finite-inputs.json`）、4 份制表符分隔的零点与谱数据表（`.tsv`）、2 份 C++ 高速枚举程序（`.cpp`）、1 份独立 Lean 4 核验文件（`ShellProjection.lean`）、2 份纯文本数据文件以及 2 文件的 `ch39-smdr/` 参考子目录：

| 仓库路径（快照 `ba0ac953...`） | 体量与文件构成 | 核心职责 |
| :--- | :--- | :--- |
| [`README.md`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/README.md) | 2,070 行中文主索引 | 全景四问总图、阶段性发现摘要、绕数阶梯与记忆秩结论及各脚本入口 |
| [`ch39-omega-math-replay.zip`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/ch39-omega-math-replay.zip) | 约 7.8 MB 离线归档包 | 打包全部复算脚本、参考区间输入数据与专题说明，供离线校验 |
| [`replay/`](https://github.com/the-omega-institute/trureturing-experiments/tree/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay) | 共 **1,785 个文件**（1,668 `.py`、60 `.md`、46 `.json`、4 `.tsv`、2 `.cpp`、2 `.txt`、1 `.lean` 及 2 文件的 `ch39-smdr/`） | 覆盖全部五卷精确有理推导、Arb 区间证书、反例构造与独立 Lean 4 压缩验证 |

在 `replay/` 目录内的 60 份 Markdown 档案中，主档案 `Ω复算说明.md`（18,051 行，共 **1,135 个子节**：913 个二级节与 222 个三级节）与 **9 份核心专题档案**（另附 50 份单题专题复算札记）共同组成可逐节追索的书面证明与复算记录：

| 序号 | 档案文件（永久快照链接） | 规模 | 核心主题与对应本书卷章 |
| :---: | :--- | :---: | :--- |
| 0 | [`Ω复算说明.md`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/Ω复算说明.md) | 18,051 行 / 1,135 节 | 全书主复算总账：十九点壳谱、双时钟、三窗筛选、绕数阶梯、624 通道与记忆秩（贯穿 [第 1–15 章](ch01-behrend-shell-and-frequencies.md)） |
| 1 | [`复算说明.md`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/复算说明.md) | 621 行 | 早期双时钟复算顺序脚本清单、依赖版本约定与区间断言说明（[第 1–3 章](ch01-behrend-shell-and-frequencies.md)） |
| 2 | [`ch39-公开议题与研究成果.md`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-公开议题与研究成果.md) | 812 行 | 第 39 章公开议题追踪表、已闭环结果与待解问题映射（[第 15 章](ch15-unified-verdict-and-open-roadmap.md)） |
| 3 | [`ch39-四元数双时钟与极小圆弧.md`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-四元数双时钟与极小圆弧.md) | 259 行 | 单位四元数双时钟三锚比较、换位子实部 $1 - 2E$ 与球壳几何读数（[第 2 章](ch02-quaternion-clocks-and-haar-zeros.md)） |
| 4 | [`ch39-零点与标准模型规范群积分.md`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-零点与标准模型规范群积分.md) | 118 行 | 最短原弧 $v = \theta_{12}\gamma$ 引入与最大密度 $1/(2\pi)$ 零点哈尔积分（[第 2 章](ch02-quaternion-clocks-and-haar-zeros.md)） |
| 5 | [`ch39-规范动能谱迹与阈值.md`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-规范动能谱迹与阈值.md) | 413 行 | 单正热核谱迹配平、$r \le 189$ 排除、$r = 400$ 两圈解与 $3.9Q$ 微扰封顶（[第 5–6 章](ch05-kinetic-trace-and-uv-ceilings.md)） |
| 6 | [`ch39-双时钟的三代手征环面.md`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-双时钟的三代手征环面.md) | 4,190 行 | 四维环面双时钟手征三代、54 模矩阵希格斯味重构与谱阈值界（[第 7–8 章](ch07-chiral-three-generations.md)） |
| 7 | [`ch39-三代轮换与质子选择定则.md`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-三代轮换与质子选择定则.md) | 38 行 | 坐标轮换破缺界 $\|[T,X]\|_{\mathrm{HS}} > 0.0414$、36 单项 $QQQL$ 算符与 $\mathbb{Z}_3$ 重子三重性（[第 8–9 章](ch08-flavor-hierarchy-and-ckm.md)） |
| 8 | [`ch39-四维角亏与球壳谱权重.md`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-四维角亏与球壳谱权重.md) | 55 行 | 等边四维单纯流形角亏、条件系综系数消去与高斯球壳行列式权重（[第 10–11 章](ch10-regge-gravity-and-spin2.md)） |
| 9 | [`ch39-共同算术钟的三项检验.md`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-共同算术钟的三项检验.md) | 109 行 | 二次预解式第七项 35 位留出码 `32071996606`、三高度带浓缩与中性刚度微扰（[第 12 章](ch12-shared-arithmetic-clock.md)） |

## A.2 ShellProjection.lean：平方半径 17 九点壳的精确整数压缩证书 {#sec-ou-appa-shell-projection}

除 Python 与 Arb 脚本外，仓库另含一份仅导入 Lean 4 标准最小内核 `Init` 的独立机械核验文件 [`replay/ShellProjection.lean`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ShellProjection.lean)（59 行，设置 `maxRecDepth 80000` 与 `maxHeartbeats 4000000`）。该文件不依赖 `Mathlib` 与任何实数或经典公理，全部构造皆在四元组整四元数结构体 `H := (w, x, y, z : Int)` 上以纯整数算术展开。

固定纯虚四元数参考轴 $b = \mathrm{axis} = (0, 0, 1, 4)$（满足 $b^2 = -17$），则对任意半径 $\sqrt{17}$ 壳点 $p$，四维有理空间上的秩二正交投影 $P_p = \frac{1}{2}(I + \frac{1}{17} L_p R_b)$ 经乘以 $34$ 消去全部分母后化为纯整数算子：

$$
P_p^{\mathbb{Z}}(v) = 17 v + (p v) b, \qquad v \in \mathbb{Z}^4.
$$

文件枚举平方半径 $17$ 的九点整数壳 `shell`——$(0, 1, 4)$ 的全部 6 种坐标置换与 $(2, 2, 3)$ 的全部 3 种坐标置换——并在四维标准基 `basis` 上用布尔判定函数 `checkAll` 穷举检验以下三条精确整数恒等式：

$$
P_p^{\mathbb{Z}}\!\left(P_q^{\mathbb{Z}}\!\left(P_p^{\mathbb{Z}}(v)\right)\right) = 34(17 + p \cdot q)\,P_p^{\mathbb{Z}}(v),
$$

$$
P_p^{\mathbb{Z}}\!\left(P_q^{\mathbb{Z}}\!\left(P_r^{\mathbb{Z}}(z)\right)\right) = 34(1105 z + 7 z b), \qquad \sum_{\mathrm{cyc}} u_p u_q u_r(x) - \sum_{\mathrm{cyc}} u_p u_r u_q(x) = 714\,x b,
$$

其中 $p = (0,3,2,2)$、$q = (0,2,3,2)$、$r = (0,2,2,3)$、$z = P_p^{\mathbb{Z}}(v)$ 且 $u_a(x) = a x b$。全部三条定理均由内核归约 `rfl` 一步证毕，并随附 `#print axioms` 输出确认零经典公理依赖：

| 定理名与源码定位 | 证明方式与内核依赖 | 精确整数代数陈述 |
| :--- | :---: | :--- |
| [`shell_compressions`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ShellProjection.lean#L42) | `rfl`（仅 `Init`） | 对九点壳上全部 $9 \times 9 = 81$ 对 $(p, q)$ 与四维基向量 $v$，精确验证三步压缩恒等式 $P_p^{\mathbb{Z}} P_q^{\mathbb{Z}} P_p^{\mathbb{Z}}(v) = 34(17 + p \cdot q)\,P_p^{\mathbb{Z}}(v)$ |
| [`inner_oriented_triangle`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ShellProjection.lean#L43) | `rfl`（仅 `Init`） | 对内层三点 $p, q, r$ 与 $z = P_p^{\mathbb{Z}}(v)$，精确验证有向闭路乘积等于 $34(1105 z + 7 z b)$，无误差析出有向面积因子 $7 b$ |
| [`oriented_axis_from_shell`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ShellProjection.lean#L58) | `rfl`（仅 `Init`） | 精确验证内层三点正逆轮换三重复合之差在全部基向量上恒等于 $714\,x b$，直接由壳层非对易子反演参考有向轴 |

需要明确区分：`ShellProjection.lean` 这份文件属于上游研究仓库的独立计算证书（归入 [附录 B §B.2](appendix-b.md#sec-ou-appb-epistemic-ledger) 的第 4 层 `NUM`），文件本身不计入 §B.4 的 `trureturing@dev` 实时冻结定理统计。它的前两条恒等式是 [@thm-ou-ch01-shell-compression-triangle] 在 $s = 17$、$N(p) = N(b) = 17$ 处的实例；该定理对一切满足 $s^2 = N(p)\,N(b)$ 的整数 $s$ 与纯虚整四元数成立，已冻结在 `the-omega-institute/trureturing` 的 D5 声明库并计入 §B.4。第三条 `oriented_axis_from_shell` 目前只有这份证书。

## A.3 分章核心复算脚本与证书总索引 {#sec-ou-appa-script-index}

下表从 `replay/` 的 1,668 支脚本中精选 34 支最具代表性的核心证书，按全书五卷十五章的逻辑顺序排列。每条链接均指向快照提交 `ba0ac9539cdb641744054bf3a0398494f4cba1c8` 下的真实源码，并与 §A.1 中对应专题档案的推导节一一锚定：

| 对应章节 | 脚本文件（永久快照链接） | 计算引擎 | 核验的核心数学结论或边界证书 |
| :---: | :--- | :---: | :--- |
| [第 1–2 章](ch01-behrend-shell-and-frequencies.md) | [`ch39-zero-haar-clocks.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-zero-haar-clocks.py) | `stdlib` / Arb | 贝伦德壳独立原弧与算术 $\mathrm{SU}(2)$ 环面采样的精确极限密度 $1/(2\pi)$ |
| [第 2 章](ch02-quaternion-clocks-and-haar-zeros.md) | [`ch39-shell-standard-model-haar.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-shell-standard-model-haar.py) | `python-flint` | 22 个独立球壳角、两条阿贝尔和乐与两枚哈尔色矩阵的标准模型群积分 |
| [第 2–3 章](ch02-quaternion-clocks-and-haar-zeros.md) | [`ch39-short-arc-born-weights.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-short-arc-born-weights.py) | `stdlib` / Arb | 两步开路与三步闭路相干圆弧输运对逆平方谱权的最大调制区间 |
| [第 3 章](ch03-riemann-zeros-fejer-and-landau.md) | [`ch39-native-hypercharge-filter.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-native-hypercharge-filter.py) | `stdlib` | 手征账本上十二回返生成元的稀疏精确超荷相位过滤轮廓 |
| [第 3 章](ch03-riemann-zeros-fejer-and-landau.md) | [`ch39-heldout-schur-threshold.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-heldout-schur-threshold.py) | `Fraction` | 第九个留出时间节点相对中心枢轴阈值 $266.6444299$ 的精确有理比较 |
| [第 4 章](ch04-gauge-crossings-and-monotone-barriers.md) | [`ch39-gauge-diffusion-wilson.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-gauge-diffusion-wilson.py) | `Fraction` | 张量积威尔逊扩散检验与规范统一耦合迹比的精确有理核算 |
| [第 4–5 章](ch04-gauge-crossings-and-monotone-barriers.md) | [`ch39-ten-two-loop-crossing.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-ten-two-loop-crossing.py) | `python-flint` | 部分两圈退耦处方下由单三角刚度实现精确规范交汇的 Arb 证书 |
| [第 5 章](ch05-kinetic-trace-and-uv-ceilings.md) | [`ch39-shell-renormalizable-radial-pair.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-shell-renormalizable-radial-pair.py) | `stdlib` / Arb | 具有相同树级质量与一圈阈值但两圈振幅分别为 $0$ 与 $12/5$ 的双标量势反例 |
| [第 5–6 章](ch05-kinetic-trace-and-uv-ceilings.md) | [`ch39-spin-balanced-rge.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-spin-balanced-rge.py) | `Fraction` / Arb | 自旋配平等谱塔的两圈规范与一圈轻汤川重整化群交汇积分 |
| [第 6 章](ch06-higgs-portals-and-electroweak-scale.md) | [`ch39-five-singlet-floor.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-five-singlet-floor.py) | `python-flint` | 排除 $d \le 4$ 并确立自旋配平两圈交汇的秩五平坦中性门户舒尔正定证书 |
| [第 6 章](ch06-higgs-portals-and-electroweak-scale.md) | [`ch39-dense-heat-portal.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-dense-heat-portal.py) | `python-flint` | 第 35 枚零点窗内共同热核门户与全塔树级稳定性边界核验 |
| [第 7–8 章](ch07-chiral-three-generations.md) | [`ch39-joint-zero-light-subspaces.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-joint-zero-light-subspaces.py) | `stdlib` | 联合近真空零点上五荷轻子空间的规范无关与置换无关重叠下界（$> 31.06\%$） |
| [第 9 章](ch09-proton-stability-and-baryon-triality.md) | [`ch39-baryon-triality-operator-floor.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-baryon-triality-operator-floor.py) | `stdlib` | 格拉斯曼单项展开核验重子三重性允许的最低 $\Delta B \neq 0$ 算符（维数 15 / 18） |
| [第 9、13 章](ch09-proton-stability-and-baryon-triality.md) | [`ch39-fixed-vacuum-proton-currents.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-fixed-vacuum-proton-currents.py) | `stdlib` / Arb | 105 圈联合真空上六维轻重子电流威尔逊因子下界（$\ge 0.03143984$）与正交/平行双支 |
| [第 10 章](ch10-regge-gravity-and-spin2.md) | [`ch39-regge-move-readout.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-regge-move-readout.py) | `stdlib` | 有限四维雷吉比较中的精确单纯形面数、角亏与铰链阶数计数 |
| [第 10–11 章](ch10-regge-gravity-and-spin2.md) | [`ch39-regge-shell-determinant.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-regge-shell-determinant.py) | `python-flint` | 等体积、等总曲率四维球面上球壳诱导高斯标量行列式权重比较 |
| [第 10–11 章](ch10-regge-gravity-and-spin2.md) | [`ch39-regge-equal-orders.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-regge-equal-orders.py) | `stdlib` / Arb | 构造两座铰链阶数完全相同但标量行列式权重严格不同的四维球面反例 |
| [第 12 章](ch12-shared-arithmetic-clock.md) | [`ch39-shared-clock-checks.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-shared-clock-checks.py) | `Fraction` / Arb | 共同算术钟第七项 35 位码 `32071996606`、三段谱权与中性壳刚度扰动复算 |
| [第 12 章](ch12-shared-arithmetic-clock.md) | [`ch39-six-time-height-bands.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-six-time-height-bands.py) | `stdlib` / Arb | 六项固定算术时间在三条零点高度带 $B$ 上强迫 $>99.931\%$ 谱权的伯恩斯坦证书 |
| [第 12 章](ch12-shared-arithmetic-clock.md) | [`ch39-seventh-time-zero-dictionary.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-seventh-time-zero-dictionary.py) | `stdlib` / Arb | 六项时间固定时第七项在 23 枚零点字典及全体三窗上的锐界与内外界 |
| [第 13 章](ch13-winding-ladder-and-joint-vacuum.md) | [`ch39-fixed-vacuum-numbered-zero.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-fixed-vacuum-numbered-zero.py) | `stdlib` / Arb | 第 $2{,}306{,}888{,}100{,}085$ 等三枚编号零点上的 105 圈真空能差与 $\sim 1\text{ ppm}$ 味误差 |
| [第 13 章](ch13-winding-ladder-and-joint-vacuum.md) | [`ch39-fixed-vacuum-weight-dimension.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-fixed-vacuum-weight-dimension.py) | `python-flint` | 105 圈跨高度固定全局真空的 100 维连续权自由度与前 100 枚零点辨识条件数 |
| [第 13 章](ch13-winding-ladder-and-joint-vacuum.md) | [`ch39-monotone-winding-action.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-monotone-winding-action.py) | `stdlib` / Arb | 单调绕数权前缀分解、固定竞争相位全阶排斥 $>1/4$ 与单调锥距离 $>13/19200$ |
| [第 13 章](ch13-winding-ladder-and-joint-vacuum.md) | [`ch39-monotone-finite-flavor-code.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-monotone-finite-flavor-code.py) | `stdlib` / Arb | 单调非增权下的 10 位参考味码（`1011`）全局排斥门槛与 9 位码（`505`）反例 |
| [第 13 章](ch13-winding-ladder-and-joint-vacuum.md) | [`ch39-joint-vacuum-scale-window.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-joint-vacuum-scale-window.py) | `stdlib` / Arb | 联合零点见证上中心偶倍率 $k = 32$、钟弦分母 $d = 724$ 与 $k/d^2$ 连续补偿窗 |
| [第 13 章](ch13-winding-ladder-and-joint-vacuum.md) | [`ch39-near-vacuum-weight-resolution.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-near-vacuum-weight-resolution.py) | `stdlib` / Arb | 近真空开窗内 $2\times 10^{-9}$ 权差仅产生 $< 1.690 \times 10^{-75}$ 作用差的病态分辨率界 |
| [第 14 章](ch14-624-channels-and-memory-rank.md) | [`ch39-independent-integer-gain.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-independent-integer-gain.py) | `Fraction` | 联合玻色、三代费米与外平方阈值独立反推整数端口增益 $624$（误差带 $\pm 0.09$） |
| [第 14 章](ch14-624-channels-and-memory-rank.md) | [`ch39-intrinsic-shell-comparisons.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-intrinsic-shell-comparisons.py) | `Fraction` | 由壳极点三条最近邻弦有向比较构造 624 内部通道及三步回返概率 $10/13$ 与 $85/208$ |
| [第 14 章](ch14-624-channels-and-memory-rank.md) | [`ch39-local-shell-return.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-local-shell-return.py) | `stdlib` | 整数壳 216 通道单边受困障碍与三分之一球面格九步统一回程最小下界 |
| [第 14 章](ch14-624-channels-and-memory-rank.md) | [`ch39-refined-mass-obstruction.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-refined-mass-obstruction.py) | `Fraction` | 中转边接入同图质量传播时固定旧块导致的迹凸性障碍（读数均增 $> 3.163\times 10^{-5}$） |
| [第 14 章](ch14-624-channels-and-memory-rank.md) | [`ch39-local-memory-rank.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-local-memory-rank.py) | `stdlib` / Arb | 旧壳修正弦距截止 $D = 56, 1152, 1376, 1568$ 对应的三时钟最小辅助秩阶梯 |
| [第 14 章](ch14-624-channels-and-memory-rank.md) | [`ch39-three-clock-symmetric-cutoff.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-three-clock-symmetric-cutoff.py) | `stdlib` | 保持三坐标循环对称时将 24 态首次可达弦距截止精确锁定在 $D = 392$ 的全参数排除 |
| [第 14 章](ch14-624-channels-and-memory-rank.md) | [`ch39-three-clock-nine-cycle.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-three-clock-nine-cycle.py) | `stdlib` / Arb | $D = 392$ 处用九环二次代数解显式达成 24 态极小辅助维数的对称构造证书 |
| [第 14 章](ch14-624-channels-and-memory-rank.md) | [`ch39-three-clock-minimal-memory.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-three-clock-minimal-memory.py) | `python-flint` (`fmpq_mat`) | 固定旧块需 38 态与秩十九正定修正需 19 态的精确有理矩阵双极小构造 |

## A.4 本地复现环境、断言规程与标准核验命令 {#sec-ou-appa-reproducibility}

仓库中全部脚本按依赖分为两档：纯整数、有理数与组合证书仅需 **Python 3 标准库**；使用严格实复球算术（Arb）或精确有理矩阵（FLINT `fmpq_mat`）的证书需要 **`python-flint 0.9.0`**。少数多面体有限元探索与连续试探拟合脚本另使用 **`NumPy 2.x`**（其最终不等式仍由 `python-flint` 独立外包认证），八面体手征精确矩阵运算另使用 **`SymPy 1.14`**；`ShellProjection.lean` 使用 **Lean `v4.35.0`** 核验。

为确保跨平台复现无静默偏差，所有脚本遵循五条审计规程：

1. **快照或离线包一致**：通过固定提交 `ba0ac9539cdb641744054bf3a0398494f4cba1c8` 或离线压缩包 `ch39-omega-math-replay.zip` 获取完全一致的脚本与 JSON 参考输入；
2. **先探测、后严包**：凡使用 `NumPy` 搜寻试探解、极值点或系数向量的步骤，其最终不等式与符号判定均由 `python-flint` 的有向舍入球算术独立复核，不采信裸浮点输出；
3. **断言失败即中止**：每个证书脚本均内嵌严格 `assert` 校验，一旦区间重叠、惯性计数翻转或精确分式不相等，进程即刻抛出异常并以非零状态码退出；
4. **公理表显式打印**：重放 `ShellProjection.lean` 时，终端末尾的三条 `#print axioms` 输出须确认除 `Init` 内置定义外不引入任何经典公理；
5. **跨库分账留痕**：组织实验库 `the-omega-institute/trureturing-experiments` 的提交 `ba0ac9539cdb641744054bf3a0398494f4cba1c8` 作为本书第一版全部 `NUM` 证书的不可变基准，与 `trureturing@dev` 冻结声明独立核算。

可在本地通过以下命令检出固定快照并运行代表性核验：

```sh
# 1. 获取本书所钉组织实验库快照
git clone https://github.com/the-omega-institute/trureturing-experiments.git
cd trureturing-experiments
git checkout ba0ac9539cdb641744054bf3a0398494f4cba1c8

# 2. 准备 Python 复算环境（按需安装严格区间与符号依赖）
python3 -m pip install "python-flint==0.9.0" "numpy>=2,<3" "sympy==1.14.*"

# 3. 进入复算目录，运行纯标准库精确证书（零浮点误差，失败即触发异常）
cd experiments/ch39-omega-research/replay
python3 ch39-native-hypercharge-filter.py
python3 ch39-heldout-schur-threshold.py
python3 ch39-baryon-triality-operator-floor.py

# 4. 运行 python-flint (Arb / fmpq_mat) 严格区间与有理矩阵证书
python3 ch39-shared-clock-checks.py
python3 ch39-fixed-vacuum-weight-dimension.py
python3 ch39-three-clock-minimal-memory.py

# 5. 独立重放平方半径 17 九点壳的 Lean 4 纯整数压缩证书
lean +leanprover/lean4:v4.35.0 ShellProjection.lean
```

上述复算产物与全书认识论证据分级、九幅静态图、交互实验室及 `trureturing@dev` 实时形式化统计的总对照，请继续参阅 [附录 B](appendix-b.md)。
