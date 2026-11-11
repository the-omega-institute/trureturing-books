---
name: local-viz-cards
description: 修改或新增《量子计算的几何直觉》的交互可视化、在章节里引用实验卡时使用：本书八个页面的颜色用语、每张实验卡讲什么、哪一章引用了哪张卡，以及增删卡片后必须同步的地方。方法本身见模板技能 book-viz。
---

# 本书的可视化卡片与引用

制作方法、版式与质量门以模板技能 `skills/book-viz/SKILL.md` 为准，本文件只记录本书自己的约定。执行载体见 `PROJECT.md` 第 6 节。

## 颜色与用语（全书一致）

| 颜色 | 只表示 | 正文与图注里的说法 |
| --- | --- | --- |
| 青色 | 内积、共线的部分、清单里的东西、正的差；第三十章与终章的页面里是“留在里面的那一半”：梯度那一半、窗口里的点、落在观测窗里的步 | “青色的线”“影子”“青色的点” |
| 品红 | 外积、垂直撑开的部分、逃出清单的东西、负的差；第三十章与终章的页面里是“另一半与界限”：兰姆那一半、贴边的点、最长的间隔、最近的面 | “品红的面积”“缝”“品红的点” |
| 琥珀 | 当前的态、当前这一步、读头 | “琥珀色的箭头” |
| 紫色 | 转轴、体积、旋子 | “紫色的体积” |
| 绿色 | 只给 Lean 已验证的陈述 | 不用来画别的 |

图注用与页面图例相同的词：页面写“线”“面积”，图注就不写“投影分量”“二向量模长”。

## 八个页面与它们的卡

| 页面 | 一句话 | 卡（`preset`） |
| --- | --- | --- |
| `qubit-geometry` | 粒子是线，波是面积，两者是同一个几何积的两个投影 | `line` `area` `half` `phase` `hadamard` `hzh` `turn1` `turn2` |
| `sphere-escape` | 以为把球封住了，总还有一点留在外面 | `diagonal` `absorb` `liuhui` `zu` `dottie` `far` `euclid` `thirteen` |
| `pythagoras-number-escape` | 线上的误差可以趋于零，面积上的缺口至少一格 | `hippasus` `minus` `locked` `golden` `five` `seven` `count` `sato` |
| `timeless-causal-crystal` | 两条余弦锁住第三条的窗口，观察者只能在窗口里选点 | `window` `edge` `impossible` `right` `crystal` `field` `thread` `longer` |
| `navier-stokes-p-np` | 对流项拆成梯度与兰姆两半；涡管被拉细；只看一部分的观察者得不到闭合 | `potential` `vortex` `flat` `strain` `burgers` `runaway` `closed` `mixed` |
| `eth-horizon-crossover` | 渐近更好的曲线要到视界之外才追上；流矩阵的秩等于最小割；过线的模态数有墙 | `human` `atoms` `cross` `constant` `bridge` `narrow` `plateau` `tail` |
| `spatial-attractor-deja-vu` | 忘掉起点，轨道还是落回同一对翅膀，一次次经过同一处 | `butterfly` `forget` `return` `shrink` `sheet` `dimension` `fixed` `cycle` |
| `golden-cut-observer` | 窗口挪一挪，贴边的点翻转，深处的点留在原地 | `cut` `phason` `empire` `cassini` `returns` `narrow` `window` `edge` |
| `repeated-projection` | 投一次，箭头只剩线上的影子；再投多少次，影子都不再动 | `once` `twice` `fixed` `perp` `sum` |
| `erasure-ledger` | 转动不记账；抹掉横着的那一份，系统的熵就多出这一份；把比特复位，这笔熵要化成热付给环境，只能多付，不能少付 | `pinch` `steps` `cycle` `bath` `copy` |
| `speed-limit-zeno` | 翻过 90° 的墙快不过能量涨落；看得越勤越走不掉，可平均还是两步回来一次 | `equal` `three` `unequal` `strobe4` `strobe16` `mean` |
| `pulse-area-virtual-z` | 包络下有多少面积，态就转多大的角；绕竖轴的那一转不发脉冲，只改后面脉冲的相位 | `carrier` `quarter` `gauss` `half` `detune` `order` `vz` `sign` |
| `parameter-shift` | 左右各转 90° 取两个值，两值之差的一半正好是这一点的斜率；小步长差分总差一点，还把散粒噪声放大 | `shift` `anywhere` `step` `noise` |
| `equator-concentration` | 维数越高，球面上的点越挤在垂直于测量轴的赤道上，宽度按 1/√d 缩小 | `three` `four` `width` `bound` `twenty` |

后四个页面的依据分层要写在页面与图注里：第三十章转述的 2026 年预印本只作为该章的转述出现，页面上的曲线与涡管是示意模型（`MODEL`）；菱形三十面体与“帝国”是文献结果（`ARGUED`）；灵魂、遗迹、似曾相识是诠释模型（`MODEL`）；只有带 Lean 链接的绿色框是已验证定理。`spatial-attractor-deja-vu` 不引用任何 Lean 定理。

`repeated-projection` 的箭头是布洛赫矢量，“投一次”是沿测量线的未读测量 $P_+\rho P_+ + P_-\rho P_-$，不是第三章偏振片例题里的选择性条件更新（那里 $0^\circ$ 与 $90^\circ$ 偏振片在布洛赫球上是同一条线的两端）；“一投等于投到线上的影子”是页面的数值核对（`NUM`），绿色框只给本章引用的三条定理：捏合幂等、不动点判据、互补勾股。
| `bloch-noise` | 噪声把球往里压、往北推，却从不把球里的两个点拉开 | `shorten` `pinch` `dephase` `amp` `wide` `depol` `distance` `centre` |
| `two-angle-addressing` | 先倾一次、再拧一次，就到得了球面上任何一点；两根轴斜着，只是要多转几次 | `tilt` `address` `pole` `skew` `collinear` `narrow` `three` `six` |

后四个页面的依据分层要写在页面与图注里：第三十章转述的 2026 年预印本只作为该章的转述出现，页面上的曲线与涡管是示意模型（`MODEL`）；菱形三十面体与“帝国”是文献结果（`ARGUED`）；灵魂、遗迹、似曾相识是诠释模型（`MODEL`）；只有带 Lean 链接的绿色框是已验证定理。`spatial-attractor-deja-vu` 不引用任何 Lean 定理。

`bloch-noise` 的绿色框只引用第四章正文已用 `lean=` 引用的定理；三种噪声的布洛赫仿射形式与 $T = \frac{1}{2}\lVert\vv{r} - \vv{s}\rVert$ 按该章例题标 `ARGUED`；时间轴上两个整数步之间取相邻整数步输出的凸组合、把横向剩余读成 $\cos\theta_{\mathrm{env}}$ 标 `MODEL`。`wide` 卡里的映射不是信道，页面只说它刺穿球皮。
| `double-slit-marker` | 路径记得越清，条纹越淡；两者落在同一个圆上，怎么读标记可以等落点到了再定 | `wave` `partial` `which` `delayed` `erase` `mixed` |

后四个页面的依据分层要写在页面与图注里：第三十章转述的 2026 年预印本只作为该章的转述出现，页面上的曲线与涡管是示意模型（`MODEL`）；菱形三十面体与“帝国”是文献结果（`ARGUED`）；灵魂、遗迹、似曾相识是诠释模型（`MODEL`）；只有带 Lean 链接的绿色框是已验证定理。`spatial-attractor-deja-vu` 不引用任何 Lean 定理。

`double-slit-marker` 的绿色框只给纯态标记的 $D^2 + V^2 = 1$（`pure_record_distinguishability_coherence_complementarity`）与捏合去掉的相干质量（`pinching_discarded_coherence_mass`）；混合标记落在圆内用迹距离可辨度，是 Englert 不等式（`ARGUED`）；屏上的高斯包络、二维实向量标记与两种读法是示意模型（`MODEL`）。这一页的青色是条纹对比度 $V$（影子）与擦除后分拣出的两行，品红是路径可辨度 $D$（高）与按路径分拣出的两行。
| `berry-loop` | 走一圈回来，箭头转过圈住的面积，内积连乘的相位只记下一半；整颗球上总有梳不平的一点 | `order` `octant` `equator` `reverse` `comb` |

`berry-loop` 的绿色框只给第十章用 `lean=` 引用的同纬度内积恒等式（`Latitude.latitude_dot`，赤道相邻两点的 $(1+i)/2$）；$\arg\Delta = \Omega/2$、贝里相位约定 $\gamma_B = -\Omega/2$、切向量平行移动转过所围面积（高斯—博内）与毛球定理按该章文献注记标 `ARGUED`；面积、转角与相位三个数各走一条路实算（`NUM`）。这一页的青色是回路（相邻两点的内积）与内积连乘的相位指针，品红是圈住的面积与箭头的转角，紫色是转轴与竖直轴上的零点。

`erasure-ledger` 的账本按第八章的分层标注：捏合的熵增等于 D、双账本 ln 2、兰道尔账目恒等式及其取等/严格判据、受控拷贝的可撤回与约化态重合是绿色；阶段 B 的热量换算（兰道尔原理、Reeb–Wolf 两条平衡式）是文献结果（`ARGUED`）；“理想复位”把 I = D = 0 当作理想极限记账，是示意模型（`MODEL`）；单比特热浴交换的各项都实算（`NUM`），并与第八章的数值表逐行一致。账本两栏用中性灰（不占用青、品红），品红只给箭头横着的那一份（相干）。

`speed-limit-zeno` 的速度线与墙上的 MT、ML 刻度按 Mandelstam–Tamm、Margolus–Levitin 公式画出，芝诺冻结的极限是 Misra–Sudarshan 定理，三者都是文献结果（`ARGUED`）；“平均返回时间恒为 2”是第七章例子的手算与页面的数值核对（`NUM`）；绿色框只给第七章引用的两条定理：`record_time_lower_bound` 与 `monitored_return_conservation`。

`two-angle-addressing` 的琥珀色点是从北极出发的布洛赫方向，紫色是两根转轴 $a = \vv{e}_3$ 与 $b$（夹角 $\alpha$，$90^\circ$ 时 $b = \vv{e}_2$），白色小旗是转动带走的切向 $\vv{e}_1$，青色虚线圈是“绕 $b$ 转了 $j$ 次后离 $N$ 至多 $2j\alpha$”的界，品红的点是没有球冠盖住的地方。绿色框只给第九章引用的三条定理（有限旋转字、有理六轴覆盖、六色下界）；两角公式与欧拉分解标 `ARGUED`；斜轴的旋转字由页面按贪心规则当场构造、球面最小值由网格取样，都标 `NUM`，页面不声称是最短字。
`pulse-area-virtual-z` 的品红是“面积”的两面：左边包络下扫过的面积与右边球上同样大小的扇形；紫色是此刻的转轴（实验室系里是载频的 z 轴），青色是态在 z 轴上的影子 P(0)，白色虚线是对照的那条路（换序、电路字面、不失谐或同面积方波）。绿色框只给第十一章正文用 `lean=` 引用的本征态定态性（`energy_eigenstate_stationary`，抽屉里另有 `exp_mulVec_of_eigenvector` 与 `observer_pullback_trace_identity`）；面积律、旋转系消去载频、轴向共轭恒等式与虚拟 Z 调度按该章文献注记标 `ARGUED`；截断高斯与实验室系画法标 `MODEL`；失谐时的分段时序乘积标 `NUM`。`order` 卡只演示两个转动不对易，不代表该章三脉冲积分核误差界。
`parameter-shift` 的绿色框只给第十二章引用的 `projection_probability_flow`：虚线切线的斜率按它的对易子公式在 2 × 2 密度矩阵上算出；两点公式本身（参数位移律）是文献结果（`ARGUED`）；采样场景的每一发来自固定种子的伪随机数，散布与理论宽度是页面的数值（`NUM`）。这一页的青色是期望值曲线与 ±90° 两点（影子），品红是小步长差分。

`equator-concentration` 不引用任何 Lean 定理（第十二章引用的冻结定理与球面测度集中无关，正文强调它们相互独立）：E[x₁²] = 1/d、马尔可夫上界、x₁ 的密度 ∝ (1 − x²)^{(d−3)/2} 与贫瘠高原都是文献结果（`ARGUED`）；带内外的精确份额由不完全贝塔函数算出、舞台上的点是精确分布的分位数（`NUM`）。页面不画梯度。青色是赤道带里的点与带内密度，品红是带外的点与带外密度。
| `pairwise-shutter` | 快门每次只报“过”或“不过”；按得越多，“过”的比例越贴近两支箭头的夹角定下的权重 | `clicks` `sixty` `right` `same` `opposite` `turn` `random` |

`pairwise-shutter` 的青色是已知态 $A$、它那条直径上从 $-1$ 端到 $B$ 的垂足的一段（长度占直径的 $p$）、权重的虚线与“过”的方块；琥珀色是目标态 $B$ 与当前的比例；细曲线（墨色）是数出来的比例 $k/N$；紫色只在 `turn` 卡里出现，是两支共用的转轴。绿色框只给第二章用 `lean=` 引用的两条定理：`born_probability_skeleton`（过与不过两份权重非负、相加为 1）与 `rank_one_born_pairing_weight`（$\lvert\langle\phi\mid\psi\rangle\rvert^2 = \Tr(\rho P_k)$）；半角公式 $(1 + \cos\theta)/2$ 与随机方向上权重均匀是第二章例题的手算，页面三路数值核对标 `NUM`；快门计数是固定种子的抽样模型，比例趋向权重是大数定律（本书未形式化），浅色带 $p \pm 2\sqrt{p(1-p)/N}$ 只是参考尺度，一并标 `MODEL`。这一页不画 `qubit-geometry` · `line` 的“影子长 $\cos\theta$”，只画计数。

| `chsh-dial` | 四个余弦叠起来能越过 2，却越不过两侧张开的面积给的天花板；经典的隐方向怎么转都停在 2 | `collinear` `sixty` `cross` `sweep` `tsirelson` `hidden` `arc` |
| `walk-spreading` | 带着硬币相干地走，宽度按步数长大；掷硬币乱走，宽度只按步数的平方根长大 | `ten` `fifty` `width` `coin` `ring` |
| `gate-word-polytope` | 门字越长，落点越密，最大的缺口一级级缩小，却永远补不上 | `one` `three` `six` `nearest` `shrink` |

`chsh-dial` 的绿色框只引用第十三章正文用 `lean=` 引用的五条定理：经典上界（`classical_chsh_abs_le_two`，“隐方向”场景的 360 个等距隐方向、权重各 1/360 正是一个有限确定性纤维模型）、一侧可交换时 S² = 4I、四点谱、固定算子的 2√2 与幺正策略的贝尔值上界（取 d = 2 为手工推导）。贝尔态上的同平面关联 cos(夹角)、N = 4|sin α sin β| 与“转动 Bob 的一对方向，⟨S⟩ 最高恰为 √(4 + 4 sin α sin β)”是页面的数值（`NUM`）；均匀隐方向玩具模型与它的折线标 `MODEL`；一般隐变量测度下的 |S| ≤ 2 与无穷维 Tsirelson 界标 `ARGUED`。这一页的青色是四个余弦（量尺上一段段叠起来的四项、余弦弧）与给 +2 的隐方向，品红是两侧张开的面积、谱点 ±√(4 ± N)、弧与折线之差与给 −2 的隐方向；Alice 是实线箭头，Bob 是虚线箭头，时间轴转动 Bob 的一对方向 φ。

`walk-spreading` 的绿色框只给第十六章用 `lean=` 引用的对称硬币引理（`SymmetricCoinMaximalWalkEntanglement.result`，关于 2p 个模式上单激发 W 态的几何纠缠）；页面不计算这个纠缠量，只画分布。镜像对 (0, x)、(1, −x) 的概率之和与硬币无关、$c_*$ 把每一对均分，是正文证明梗概里的一步，页面上作数值核对（`NUM`）；线上 Hadamard 游走宽度按 n 线性增长、黏合树指数分离与一般图至多二次加速标 `ARGUED`。这一页的青色是量子游走的分布与宽度，灰色（中性）是经典随机游走，品红只给量子分布比镜像 P(−x) 多出的部分，琥珀只在“宽度”场景标当前步数。

`gate-word-polytope` 与 `sphere-escape` 的 `liuhui`、`zu` 分工：那两张讲平面里的割圆（多边形周长逼近圆、有理读数与 π 之间的缝），本页讲有限 {H, T} 门字从北极出发在布洛赫球面上的落点集 𝒮_L、凸包 P_L 与离目标的最近距离。绿色框只给第十六章用 `lean=` 引用的连续两轴有限字命题（`two_axis_finite_word`），并写明它是连续轴圆的对照、不涉及离散门集；可达点、最短门字、凸包、径向间隙 1 − h 与覆盖半径 ε_L 都是页面实算（`NUM`）；Solovay–Kitaev 渐近字长标 `ARGUED`，页面不拟合速率。这一页的青色是可达点与凸包，琥珀是目标方向（或最坏方向），品红是到最近点的弧、径向间隙与空球冠，紫色是 H 与 T 的转轴。

## 正文里的引用（中英文版本位置与卡名相同）

| 章节 | 位置 | 引用 |
| --- | --- | --- |
| 第一章 | §1.1 末（两子互为尺规） | `qubit-geometry` · `line` |
| 第二章 | §2.3 半角换算表之后 | `qubit-geometry` · `line` |
| 第五章 | §5.2 末（旋子） | `qubit-geometry` · `turn1` |
| 第五章 | §5.3 全局相位与相对相位的对照之后 | `qubit-geometry` · `phase` |
| 第五章 | §5.4 门图鉴表之前 | `qubit-geometry` · `hadamard` |
| 第五章 | §5.4 门图鉴算例之后、文献注记之前 | `qubit-geometry` · `hzh` |
| 第五章 | 章末、转入第六章之前 | `qubit-geometry` 完整实验室 |
| 第六章 | §6.1 末 | `qubit-geometry` · `half` |
| 第六章 | §6.3 末 | `qubit-geometry` · `area` |
| 第六章 | §6.4 | `qubit-geometry` 完整实验室 |
| 第二十一章 | §21.2 末 | `sphere-escape` · `diagonal` |
| 第二十一章 | §21.3 末 | `sphere-escape` · `liuhui` |
| 第二十一章 | §21.4 末 | `sphere-escape` 完整实验室 |
| 第二十二章 | §22.2 末 | `sphere-escape` · `euclid` |
| 第二十四章 | §24.4 末 | `sphere-escape` · `dottie` |
| 第二十九章 | 第二幕末 | `pythagoras-number-escape` · `hippasus` |
| 第二十九章 | 第一座桥末 | `pythagoras-number-escape` · `five` |
| 第二十九章 | 第三座桥末 | `pythagoras-number-escape` 完整实验室 |
| 第二十九章 | 第一层末 | `timeless-causal-crystal` · `crystal` |
| 第二十九章 | 第四层末 | `timeless-causal-crystal` · `window` |
| 第二十九章 | 定理 `thm-ch29-gram-rigidity-and-pell` 之后 | `timeless-causal-crystal` 完整实验室 |
| 第三十章 | ETH 一节 · 1 末（张量关联场） | `eth-horizon-crossover` · `bridge` |
| 第三十章 | ETH 一节末 | `eth-horizon-crossover` · `atoms`，随后完整实验室 |
| 第三十章 | 纳维—斯托克斯一节 · 1 末（兰姆恒等式） | `navier-stokes-p-np` · `vortex` |
| 第三十章 | 文献注记 `rem-ch30-navier-stokes-forced-literature` 之后、猜想 `conj-coda-navier-stokes-regularity` 之前 | `navier-stokes-p-np` · `runaway` |
| 第三十章 | 定理 `thm-coda-quadratic-advection-no-closure` 的证明之后 | `navier-stokes-p-np` · `mixed` |
| 第三十章 | 纳维—斯托克斯一节末 | `navier-stokes-p-np` 完整实验室 |
| 终章 | 空间吸引子 · 二 末（文献注记 `rem-coda-lorenz-srb-literature` 之后） | `spatial-attractor-deja-vu` · `forget`、`dimension` |
| 终章 | 空间吸引子一节末 | `spatial-attractor-deja-vu` · `return`，随后完整实验室 |
| 终章 | 黄金切投 · 一 末 | `golden-cut-observer` · `cut` |
| 终章 | 黄金切投 · 二 末 | `golden-cut-observer` · `phason` |
| 终章 | 黄金切投 · 三 末（文献注记 `rem-coda-quasicrystal-empire-literature` 之后） | `golden-cut-observer` · `window`、`empire` |
| 终章 | 定理 `thm-coda-golden-cut-observer-cassini` 之前 | `golden-cut-observer` · `cassini`、`returns` |
| 终章 | 该定理的证明之后 | `golden-cut-observer` 完整实验室 |
| 第三章 | §3.1 题记“给混沌命名……”之后、存在线插图之前 | `repeated-projection` · `twice` |
| 第三章 | §3.1 定理 `thm-unread-fixed-iff` 之后的解读段末 | `repeated-projection` · `fixed` |
| 第三章 | §3.2 单比特勾股算例末（“两条直角边”） | `repeated-projection` · `sum` |
| 第三章 | 章末、转入第四章之前 | `repeated-projection` · `once`，随后完整实验室 |
| 第四章 | §4.1 局部布洛赫向量 $(\cos\theta_{\mathrm{env}}, 0, 0)$ 一段之后 | `bloch-noise` · `shorten` |
| 第四章 | §4.2 捏合投影一段之后、定理 `thm-pinching-pythagorean` 之前 | `bloch-noise` · `pinch` |
| 第四章 | §4.2 相位阻尼一段之后、命题 `prop-phase-damping-decay` 之前 | `bloch-noise` · `dephase` |
| 第四章 | §4.2 振幅阻尼一段之后 | `bloch-noise` · `amp` |
| 第四章 | §4.2 指数包络 $T_2 \le 2T_1$ 一段之后、文献注记 `rem-relaxation-envelope-literature` 之前 | `bloch-noise` · `wide` |
| 第四章 | §4.2 末（“可分辨性只会丢”） | `bloch-noise` · `distance` |
| 第四章 | §4.3 开头一段之后 | `bloch-noise` · `centre` |
| 第四章 | 例 `ex-maximally-mixed-center` 之后、第一部小结之前 | `bloch-noise` 完整实验室 |
| 第六章 | §6.3 可见度 $V$ 与可区分度 $D$ 的两条定义之后 | `double-slit-marker` · `partial` |
| 第六章 | §6.3 定理 `thm-record-coherence-complementarity` 的证明之后 | `double-slit-marker` · `which` |
| 第六章 | §6.3 惠勒延迟选择算例 `ex-wheeler-delayed-choice-tradeoff` 之后、文献注记之前 | `double-slit-marker` · `delayed`、`erase` |
| 第六章 | §6.3 文献注记 `rem-englert-greenberger-literature` 之后 | `double-slit-marker` · `mixed` |
| 第六章 | §6.3 末（`qubit-geometry` · `area` 之后、§6.4 之前） | `double-slit-marker` 完整实验室 |
| 第八章 | §8.1 末（单比特 ln 2 特例之后） | `erasure-ledger` · `pinch` |
| 第八章 | §8.2 定理 `thm-entropy-production-coherence-deletion` 后的解读段末、例 `ex-landauer-one-bit-ledger` 之前 | `erasure-ledger` · `steps` |
| 第八章 | 例 `ex-landauer-one-bit-ledger` 之后、文献注记 `rem-density-matrix-balance-inputs-literature` 之前 | `erasure-ledger` · `cycle` |
| 第八章 | 例 `ex-one-qubit-reservoir-swap-erasure` 之后（§8.2 末） | `erasure-ledger` · `bath` |
| 第八章 | §8.3 定理 `thm-reduced-irreversibility-access-defect` 的证明之后 | `erasure-ledger` · `copy` |
| 第八章 | §8.3 末（文献注记 `rem-landauer-thermodynamic-bridge-literature` 之后、§8.4 之前） | `erasure-ledger` 完整实验室 |
| 第七章 | §7.2 例 `ex-orthogonalization-times` 之前（“把它换成具体哈密顿量的能量涨落”一段末） | `speed-limit-zeno` · `equal` |
| 第七章 | §7.2 例 `ex-orthogonalization-times` 之后 | `speed-limit-zeno` · `three`、`unequal` |
| 第七章 | §7.3 一阶小量与二阶小量一段末 | `speed-limit-zeno` · `strobe16` |
| 第七章 | §7.3 例 `ex-zeno-strobe-freezing` 之后 | `speed-limit-zeno` · `strobe4` |
| 第七章 | §7.3 例 `ex-first-return-qubit` 之后 | `speed-limit-zeno` · `mean` |
| 第七章 | §7.3 末、转入 §7.4 之前 | `speed-limit-zeno` 完整实验室 |
| 第九章 | 章首第二段（“单张平面只能画出一个一维圆周”）之后 | `two-angle-addressing` · `tilt` |
| 第九章 | 两角寻址的两步列表之后、“为什么不需要正交三次”之前 | `two-angle-addressing` · `address` |
| 第九章 | 两角寻址一节末（南北两极的方位角冗余） | `two-angle-addressing` · `pole` |
| 第九章 | 定理 `thm-two-axis-finite-word` 的证明之后 | `two-angle-addressing` · `skew` |
| 第九章 | 该定理契约列表第 1 条（共线退化）之后 | `two-angle-addressing` · `collinear` |
| 第九章 | 该定理契约列表第 2 条之后、有理六轴一节之前 | `two-angle-addressing` · `narrow` |
| 第九章 | 命题 `prop-rational-six-axis-cover` 之前 | `two-angle-addressing` · `three` |
| 第九章 | 例 `ex-two-angle-six-axis` 之后 | `two-angle-addressing` · `six` |
| 第九章 | 文献注记 `rem-axes-literature` 之后、转入第十章之前 | `two-angle-addressing` 完整实验室 |
| 第十章 | §10.1 两种转序的两条算式之后、投影算子不对易一段之前 | `berry-loop` · `order` |
| 第十章 | §10.1 文献注记 `rem-berry-pancharatnam-holonomy-literature` 之后 | `berry-loop` · `octant` |
| 第十章 | §10.1 推论 `cor-latitude-complex-overlap` 的解读段末（赤道 $t = \frac{1}{2}$ 一例） | `berry-loop` · `equator` |
| 第十章 | §10.3 文献注记 `rem-hopf-dirac-monopole-literature` 之后、格言之前 | `berry-loop` · `comb` |
| 第十章 | §10.4 例 `ex-octant-berry-gram` 之后 | `berry-loop` · `reverse`，随后完整实验室 |
| 第十一章 | §11.1 末（文献注记 `rem-rotating-frame-carrier-literature` 之后） | `pulse-area-virtual-z` · `carrier` |
| 第十一章 | §11.2 末（“具有明确面积的几何结构”一段之后） | `pulse-area-virtual-z` · `quarter` |
| 第十一章 | §11.3 开头“非对易展开项就会浮现出来”之后 | `pulse-area-virtual-z` · `order` |
| 第十一章 | §11.4 开头一段之后、文献注记 `rem-virtual-z-scheduling-literature` 之前 | `pulse-area-virtual-z` · `vz` |
| 第十一章 | 文献注记 `rem-virtual-z-scheduling-literature` 之后（第 3 条符号核对） | `pulse-area-virtual-z` · `sign` |
| 第十一章 | 例 `ex-five-ghz-pi-over-two` 之后、文献注记 `rem-pulses-literature` 之前 | `pulse-area-virtual-z` · `gauss` |
| 第十一章 | 文献注记 `rem-pulses-literature` 之后（章末） | `pulse-area-virtual-z` · `detune`，随后完整实验室 |
| 第十二章 | 开篇三座高峰第 2 条（参数位移律）之后、第 3 条之前 | `parameter-shift` · `noise` |
| 第十二章 | §泡利转角与精确参数位移 · 文献注记 `rem-parameter-shift-rule-literature` 之前 | `parameter-shift` · `shift` |
| 第十二章 | 文献注记 `rem-parameter-shift-rule-literature` 之后（该节末） | `parameter-shift` · `anywhere`，随后完整实验室 |
| 第十二章 | §赤道集中与贫瘠高原的条件 · 文献注记 `rem-sphere-equator-markov-literature` 之前 | `equator-concentration` · `three`、`width` |
| 第十二章 | 文献注记 `rem-sphere-equator-markov-literature` 之后 | `equator-concentration` · `bound`、`twenty` |
| 第十二章 | 例 `ex-cluster-shift-and-gradient` 之后、文献注记 `rem-mbqc-gradients-literature` 之前 | `equator-concentration` 完整实验室 |
| 第五章 | §5.2 定理 `thm-circle-double-cover-history-lift` 译回旋子的列表（“两整圈”）之后、例 `ex-rotor-two-turns` 之前 | `qubit-geometry` · `turn2` |
| 第十二章 | 推论 `cor-finite-trace-mode-budget` 的证明之后 | `eth-horizon-crossover` · `plateau`、`tail` |
| 第十六章 | 有限门字一节列表第 5 条（刘徽“三维割圆术”）之后、编译误差一节之前 | `sphere-escape` · `zu` |
| 第十九章 | 锥域一节“最小割公式自动脱去外层的 $3ac$”一段之后、推论 `cor-bridge-cone-mincut` 之前 | `eth-horizon-crossover` · `narrow` |
| 第二十一章 | §21.2 例 `ex-cantor-godel-diagonal-table` 后“连同地址空间一起向外扩容”一段之后 | `sphere-escape` · `absorb` |
| 第二十二章 | §22.3 末（“素数有无穷多个”一段之后、格言之前） | `sphere-escape` · `thirteen` |
| 第二十三章 | §23.2 例 `ex-eisenstein-and-golden-pell-lattice` 之后 | `pythagoras-number-escape` · `golden` |
| 第二十四章 | §24.4 文献注记 `rem-banach-dottie-hairy-ball-literature` 之后、猜想 `conj-schanuel-dottie` 之前 | `sphere-escape` · `far` |
| 第二十九章 | 第一座桥“表盘立刻说明线素数写不成两平方和”一段之后 | `pythagoras-number-escape` · `seven` |
| 第二十九章 | 第一座桥手工推导 3（线素数的负佩尔方程无解）之后 | `pythagoras-number-escape` · `locked` |
| 第二十九章 | 例 `ex-ch29-face-and-line-primes` 之后、文献注记 `rem-ch29-pell-primes-hilbert-literature` 之前 | `pythagoras-number-escape` · `minus` |
| 第二十九章 | 第三座桥文献注记 `rem-ch29-hasse-gauss-literature` 之后 | `pythagoras-number-escape` · `count` |
| 第二十九章 | 文献注记 `rem-ch29-arithmetic-geometry-literature` 之后 | `pythagoras-number-escape` · `sato` |
| 第二十九章 | 第二层 $\det G \ge 0$ 公式之后 | `timeless-causal-crystal` · `impossible` |
| 第二十九章 | 第二层末（“零自由度刚性”列表之后） | `timeless-causal-crystal` · `edge` |
| 第二十九章 | 第四层观察者对照表之后 | `timeless-causal-crystal` · `right` |
| 第三十章 | 第一节 · 2 列表（两道几何视界）之后 | `timeless-causal-crystal` · `thread` |
| 第三十章 | 文献注记 `rem-ch30-query-sos-literature` 之后 | `timeless-causal-crystal` · `longer` |
| 第三十章 | 文献注记 `rem-ch30-karmarkar-kasteleyn-literature` 之后 | `timeless-causal-crystal` · `field` |
| 第三十章 | 例 `ex-ch30-galactic-crossover-scale` 之后 | `eth-horizon-crossover` · `human`、`cross` |
| 第三十章 | 文献注记 `rem-ch30-lamb-decomposition-literature` 之后 | `navier-stokes-p-np` · `potential` |
| 第三十章 | 文献注记 `rem-ch30-vorticity-transport-literature` 之后 | `navier-stokes-p-np` · `flat`、`strain` |
| 第三十章 | 文献注记 `rem-ch30-navier-stokes-forced-literature` 之后、`runaway` 之前 | `navier-stokes-p-np` · `burgers` |
| 第三十章 | `mixed` 之后 | `navier-stokes-p-np` · `closed` |
| 终章 | 空间吸引子 · 一 末 | `spatial-attractor-deja-vu` · `butterfly` |
| 终章 | 空间吸引子 · 二 “内禀几何参数”列表之后 | `spatial-attractor-deja-vu` · `fixed`、`cycle` |
| 终章 | 定理 `thm-coda-golden-cut-observer-cassini` 的证明之后、完整实验室之前 | `golden-cut-observer` · `narrow` |
| 第一章 | §1.2 快门插图 `ch01-shutter` 之后、“全能属性账本”一段之前 | `pairwise-shutter` · `clicks` |
| 第二章 | §2.1 插图 `ch02-cut-c` 之后、“矩阵的迹”一段之前 | `pairwise-shutter` · `sixty` |
| 第二章 | §2.1 “矩阵的迹”一段之后、定义 `def-born-probability` 之前 | `pairwise-shutter` · `turn` |
| 第二章 | §2.3 `qubit-geometry` · `line` 之后、“上面的表是逐个角度算的”之前 | `pairwise-shutter` · `right` |
| 第二章 | §2.3 “单比特是唯一‘公平’的情形”一段之后 | `pairwise-shutter` · `random` |
| 第二章 | 文献注记 `rem-gleason-literature` 之后、转入第三章之前 | `pairwise-shutter` 完整实验室 |
| 第十三章 | 推论 `cor-chsh-local-commuting-collapse` 后的解读段末（“只要有一方的两次提问不分先后”） | `chsh-dial` · `collinear` |
| 第十三章 | 例 `ex-chsh-spectrum-angle-table` 之后、“面积张满时的天花板”之前 | `chsh-dial` · `sixty`、`cross` |
| 第十三章 | §45° 余弦与固定 CHSH 极值 · 开头的提问之后、“答案是 45°”之前 | `chsh-dial` · `sweep` |
| 第十三章 | 推论 `cor-fixed-chsh-tsirelson` 的证明之后 | `chsh-dial` · `tsirelson` |
| 第十三章 | 例 `ex-sixteen-deterministic-chsh-tables` 之后、“现在两端都钉住了”之前 | `chsh-dial` · `hidden` |
| 第十三章 | 例 `ex-bell-chsh-45deg` 之后、文献注记 `rem-bell-chsh-literature` 之前 | `chsh-dial` · `arc` |
| 第十三章 | 文献注记 `rem-bell-chsh-literature` 之后（章末） | `chsh-dial` 完整实验室 |
| 第十六章 | 图上游走一节 $c_*$ 定义之后、“为了衡量 $n$ 步游走波函数”之前 | `walk-spreading` · `ten` |
| 第十六章 | 引理 `lemma-symmetric-coin-walk` 的证明之后、“两条概念边界”列表之前 | `walk-spreading` · `coin`、`ring` |
| 第十六章 | “两条概念边界”列表之后、文献注记 `rem-qsvt-walks-literature` 之前 | `walk-spreading` · `fifty`、`width` |
| 第十六章 | 文献注记 `rem-qsvt-walks-literature` 之后（图上游走一节末） | `walk-spreading` 完整实验室 |
| 第十六章 | 有限门字一节列表第 3 条（凸包与测地多面体）之后、第 4 条之前 | `gate-word-polytope` · `one`、`six` |
| 第十六章 | 有限门字一节列表第 4 条（覆盖半径与径向支撑间隙）之后、第 5 条之前 | `gate-word-polytope` · `nearest` |
| 第十六章 | 例 `ex-finite-ht-polytope` 之后、文献注记 `rem-solovay-kitaev-literature` 之前 | `gate-word-polytope` · `three` |
| 第十六章 | 文献注记 `rem-solovay-kitaev-literature` 之后（章末收束段之前） | `gate-word-polytope` · `shrink`，随后完整实验室 |

## 增删或修改一张卡之后

1. 页面：`index.html` 里的 `button.preset[data-preset]`，`main.js` 里的卡片数据（起始状态、是否播放、静态图停在哪一帧）与说明文字，中英成对。
2. 测试：`books/quantum-geometry/viz/tests/<id>.test.mjs` 里为这张卡的终态加一条独立核对。
3. 引用：在讲到它的那句话旁加 `::: {.viz src="<id>" preset="<卡>" height="500"}`，中英文各一处，并更新上表。
4. 出图与检查：

   ```bash
   node tools/node/viz-shots.mjs quantum-geometry <id>
   node tools/node/viz-thumbs.mjs quantum-geometry <id>
   node tools/node/viz-test.mjs quantum-geometry
   node tools/node/viz-validate.mjs quantum-geometry && ./tbook check
   ```

删掉一张卡之前先搜索两种语言的章节里有没有引用它；`./tbook check` 会对不存在的卡报错。
