---
name: local-viz-cards
description: 修改或新增《量子计算的几何直觉》的交互可视化、在章节里引用实验卡时使用：本书各交互页面的颜色用语、每张实验卡讲什么、哪一章引用了哪张卡，以及增删卡片后必须同步的地方。方法本身见模板技能 book-viz。
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

## 页面与它们的卡

本书有 36 个交互页面，下表按登记表（`books/quantum-geometry/viz/visualizations.json`）的顺序排列。

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
| `bloch-noise` | 噪声把球往里压、往北推，却从不把球里的两个点拉开 | `shorten` `pinch` `dephase` `amp` `wide` `depol` `distance` `centre` |
| `double-slit-marker` | 路径记得越清，条纹越淡；两者落在同一个圆上，怎么读标记可以等落点到了再定 | `wave` `partial` `which` `delayed` `erase` `mixed` |
| `erasure-ledger` | 转动不记账；抹掉横着的那一份，系统的熵就多出这一份；把比特复位，这笔熵要化成热付给环境，只能多付，不能少付 | `pinch` `steps` `cycle` `bath` `copy` |
| `speed-limit-zeno` | 翻过 90° 的墙快不过能量涨落；看得越勤越走不掉，可平均还是两步回来一次 | `equal` `three` `unequal` `strobe4` `strobe16` `mean` |
| `two-angle-addressing` | 先倾一次、再拧一次，就到得了球面上任何一点；两根轴斜着，只是要多转几次 | `tilt` `address` `pole` `skew` `collinear` `narrow` `three` `six` |
| `berry-loop` | 走一圈回来，箭头转过圈住的面积，内积连乘的相位只记下一半；整颗球上总有梳不平的一点 | `order` `octant` `equator` `reverse` `comb` |
| `pulse-area-virtual-z` | 包络下有多少面积，态就转多大的角；绕竖轴的那一转不发脉冲，只改后面脉冲的相位 | `carrier` `quarter` `gauss` `half` `detune` `order` `vz` `sign` |
| `parameter-shift` | 左右各转 90° 取两个值，两值之差的一半正好是这一点的斜率；小步长差分总差一点，还把散粒噪声放大 | `shift` `anywhere` `step` `noise` |
| `equator-concentration` | 维数越高，球面上的点越挤在垂直于测量轴的赤道上，宽度按 1/√d 缩小 | `three` `four` `width` `bound` `twenty` |
| `pairwise-shutter` | 快门每次只报“过”或“不过”；按得越多，“过”的比例越贴近两支箭头的夹角定下的权重 | `clicks` `sixty` `right` `same` `opposite` `turn` `random` |
| `chsh-dial` | 四个余弦叠起来能越过 2，却越不过两侧张开的面积给的天花板；经典的隐方向怎么转都停在 2 | `collinear` `sixty` `cross` `sweep` `tsirelson` `hidden` `arc` |
| `syndrome-decoding` | 校验只问相邻两个比特一不一致：亮起的灯指出翻了哪一个，翻回去，叠加原样回来；翻两个或翻相位，灯就指错或者不亮 | `single` `rooms` `mix` `two` `phase` |
| `braiding` | 交换两颗粒子，谁从前面过记在第三个方向上；反着交换一次就回来，同向交换两次回不来，三股的两种顺序落在同一处 | `over` `inverse` `twice` `yb` `close` `stabilize` `trefoil` `rack` |
| `walk-spreading` | 带着硬币相干地走，宽度按步数长大；掷硬币乱走，宽度只按步数的平方根长大 | `ten` `fifty` `width` `coin` `ring` |
| `gate-word-polytope` | 门字越长，落点越密，最大的缺口一级级缩小，却永远补不上 | `one` `three` `six` `nearest` `shrink` |
| `grover-reflections` | 照两面镜子，态就在同一个平面里朝目标转 2θ；整数步只能逼近，走多了会转过头 | `mirrors` `four` `eight` `over` `sqrt` |
| `phase-gears` | 逐级减半转速的齿轮给每一格拧出相位；周期梳子上的相位箭头首尾相接，不共振的绕成圈抵消，只剩周期留下的峰 | `basis` `cancel` `four` `read` `leak` |
| `rapidity-lightcone` | 推动只让事件沿双曲线滑动，光锥一动不动；绕路的世界线攒下的固有时更少 | `circle` `boost` `caliper` `cone` `scale` `light` `twins` `frames` |
| `lattice-gauge-loop` | 一条边上的相位可以拧成任意值；绕方格一圈的相位，顶点怎么拧都不动 | `twist` `chord` `anchor` `tree` `two` `plaquette` |
| `layered-network-cut` | 把边界上的一段切下来，割要从网络里面穿过；区间翻倍，割只多两三条腿 | `one` `four` `grow` `two` |
| `complexity-growth` | 熵几层就封顶，门数还一层层往上长；电路怎么排，层数都压不到 ⌊N/(κ+1)⌋ + 1 以下 | `saturate` `ceiling` `cv` `floor` `eight` `eleven` |
| `norm-lattice` | 换一组坐标去读，系数全变了，格点上的范数一个也没动；范数锁在 ±1 的点只能沿双曲线一格一格地跳 | `hex` `skew` `shear` `range` `norm` `pell` `units` |
| `euler-product-sieve` | 有限个素数乘起来总比 ζ 少一截：少的正是带着清单外素因子的整数，s 越靠近 1 少得越多 | `two` `near` `all` `five` `remainder` `thirtyone` |
| `blade-multiplication` | 两块刀片相乘：重复的方向成对抵掉，剩下的是掩码的异或；正负号只看排好顺序要交换几次 | `e1e2` `e2e1` `square` `pseudo` `pauli` `vector` |
| `zyz-compile` | 绕 z、绕 y、再绕 z 转三段，乘出来只是一枚旋子：绕一根轴的一次转动 | `sandwich` `chain` `t` `h` `fold` |
| `fixed-point-convergence` | 蛛网每绕一圈，误差乘上不动点处的斜率；连斜率一起读，几步就合拢；有理读数却总差一道缝 | `golden` `rate` `circle` `newton` `rational` `ruler` |
| `lean-declaration-map` | 书里引用的每一条冻结声明都落在它第一次出场的那一章；读完正文，锁文件里的条目一条不剩全部落定 | `all` `bedrock` `table27` `closure` `table28` `theorems` `inline` |
| `forgetting-rebirth-attractor` | 按内禀快度等步走，一格格逼近圆盘边界却永远到不了；按外部角度尺等步走，几步就撞上边界、擦表重来，绕成一只轮子 | `staircase` `horizon_gap` `klein_vs_poincare` `erase_reset` `quotient_fold` `cayley` |

### 各页面的依据分层、用语与分工

`navier-stokes-p-np`、`eth-horizon-crossover`、`spatial-attractor-deja-vu`、`golden-cut-observer` 四个页面的依据分层要写在页面与图注里：第三十章转述的 2026 年预印本只作为该章的转述出现，页面上的曲线与涡管是示意模型（`MODEL`）；菱形三十面体与“帝国”是文献结果（`ARGUED`）；灵魂、遗迹、似曾相识是诠释模型（`MODEL`）；只有带 Lean 链接的绿色框是已验证定理。`spatial-attractor-deja-vu` 不引用任何 Lean 定理。

`repeated-projection` 的箭头是布洛赫矢量，“投一次”是沿测量线的未读测量 $P_+\rho P_+ + P_-\rho P_-$，不是第三章偏振片例题里的选择性条件更新（那里 $0^\circ$ 与 $90^\circ$ 偏振片在布洛赫球上是同一条线的两端）；“一投等于投到线上的影子”是页面的数值核对（`NUM`），绿色框只给本章引用的三条定理：捏合幂等、不动点判据、互补勾股。

`bloch-noise` 的绿色框只引用第四章正文已用 `lean=` 引用的定理；三种噪声的布洛赫仿射形式与 $T = \frac{1}{2}\lVert\vv{r} - \vv{s}\rVert$ 按该章例题标 `ARGUED`；时间轴上两个整数步之间取相邻整数步输出的凸组合、把横向剩余读成 $\cos\theta_{\mathrm{env}}$ 标 `MODEL`。`wide` 卡里的映射不是信道，页面只说它刺穿球皮。

`double-slit-marker` 的绿色框只给纯态标记的 $D^2 + V^2 = 1$（`pure_record_distinguishability_coherence_complementarity`）与捏合去掉的相干质量（`pinching_discarded_coherence_mass`）；混合标记落在圆内用迹距离可辨度，是 Englert 不等式（`ARGUED`）；屏上的高斯包络、二维实向量标记与两种读法是示意模型（`MODEL`）。这一页的青色是条纹对比度 $V$（影子）与擦除后分拣出的两行，品红是路径可辨度 $D$（高）与按路径分拣出的两行。

`erasure-ledger` 的账本按第八章的分层标注：捏合的熵增等于 D、双账本 ln 2、兰道尔账目恒等式及其取等/严格判据、受控拷贝的可撤回与约化态重合是绿色；阶段 B 的热量换算（兰道尔原理、Reeb–Wolf 两条平衡式）是文献结果（`ARGUED`）；“理想复位”把 I = D = 0 当作理想极限记账，是示意模型（`MODEL`）；单比特热浴交换的各项都实算（`NUM`），并与第八章的数值表逐行一致。账本两栏用中性灰（不占用青、品红），品红只给箭头横着的那一份（相干）。

`speed-limit-zeno` 的速度线与墙上的 MT、ML 刻度按 Mandelstam–Tamm、Margolus–Levitin 公式画出，芝诺冻结的极限是 Misra–Sudarshan 定理，三者都是文献结果（`ARGUED`）；“平均返回时间恒为 2”是第七章例子的手算与页面的数值核对（`NUM`）；绿色框只给第七章引用的两条定理：`record_time_lower_bound` 与 `monitored_return_conservation`。

`two-angle-addressing` 的琥珀色点是从北极出发的布洛赫方向，紫色是两根转轴 $a = \vv{e}_3$ 与 $b$（夹角 $\alpha$，$90^\circ$ 时 $b = \vv{e}_2$），白色小旗是转动带走的切向 $\vv{e}_1$，青色虚线圈是“绕 $b$ 转了 $j$ 次后离 $N$ 至多 $2j\alpha$”的界，品红的点是没有球冠盖住的地方。绿色框只给第九章引用的三条定理（有限旋转字、有理六轴覆盖、六色下界）；两角公式与欧拉分解标 `ARGUED`；斜轴的旋转字由页面按贪心规则当场构造、球面最小值由网格取样，都标 `NUM`，页面不声称是最短字。

`berry-loop` 的绿色框只给第十章用 `lean=` 引用的同纬度内积恒等式（`Latitude.latitude_dot`，赤道相邻两点的 $(1+i)/2$）；$\arg\Delta = \Omega/2$、贝里相位约定 $\gamma_B = -\Omega/2$、切向量平行移动转过所围面积（高斯—博内）与毛球定理按该章文献注记标 `ARGUED`；面积、转角与相位三个数各走一条路实算（`NUM`）。这一页的青色是回路（相邻两点的内积）与内积连乘的相位指针，品红是圈住的面积与箭头的转角，紫色是转轴与竖直轴上的零点。

`pulse-area-virtual-z` 的品红是“面积”的两面：左边包络下扫过的面积与右边球上同样大小的扇形；紫色是此刻的转轴（实验室系里是载频的 z 轴），青色是态在 z 轴上的影子 P(0)，白色虚线是对照的那条路（换序、电路字面、不失谐或同面积方波）。绿色框只给第十一章正文用 `lean=` 引用的本征态定态性（`energy_eigenstate_stationary`，抽屉里另有 `exp_mulVec_of_eigenvector` 与 `observer_pullback_trace_identity`）；面积律、旋转系消去载频、轴向共轭恒等式与虚拟 Z 调度按该章文献注记标 `ARGUED`；截断高斯与实验室系画法标 `MODEL`；失谐时的分段时序乘积标 `NUM`。`order` 卡只演示两个转动不对易，不代表该章三脉冲积分核误差界。

`parameter-shift` 的绿色框只给第十二章引用的 `projection_probability_flow`：虚线切线的斜率按它的对易子公式在 2 × 2 密度矩阵上算出；两点公式本身（参数位移律）是文献结果（`ARGUED`）；采样场景的每一发来自固定种子的伪随机数，散布与理论宽度是页面的数值（`NUM`）。这一页的青色是期望值曲线与 ±90° 两点（影子），品红是小步长差分。

`equator-concentration` 不引用任何 Lean 定理（第十二章引用的冻结定理与球面测度集中无关，正文强调它们相互独立）：E[x₁²] = 1/d、马尔可夫上界、x₁ 的密度 ∝ (1 − x²)^{(d−3)/2} 与贫瘠高原都是文献结果（`ARGUED`）；带内外的精确份额由不完全贝塔函数算出、舞台上的点是精确分布的分位数（`NUM`）。页面不画梯度。青色是赤道带里的点与带内密度，品红是带外的点与带外密度。

`pairwise-shutter` 的青色是已知态 $A$、它那条直径上从 $-1$ 端到 $B$ 的垂足的一段（长度占直径的 $p$）、权重的虚线与“过”的方块；琥珀色是目标态 $B$ 与当前的比例；细曲线（墨色）是数出来的比例 $k/N$；紫色只在 `turn` 卡里出现，是两支共用的转轴。绿色框只给第二章用 `lean=` 引用的两条定理：`born_probability_skeleton`（过与不过两份权重非负、相加为 1）与 `rank_one_born_pairing_weight`（$\lvert\langle\phi\mid\psi\rangle\rvert^2 = \Tr(\rho P_k)$）；半角公式 $(1 + \cos\theta)/2$ 与随机方向上权重均匀是第二章例题的手算，页面三路数值核对标 `NUM`；快门计数是固定种子的抽样模型，比例趋向权重是大数定律（本书未形式化），浅色带 $p \pm 2\sqrt{p(1-p)/N}$ 只是参考尺度，一并标 `MODEL`。这一页不画 `qubit-geometry` · `line` 的“影子长 $\cos\theta$”，只画计数。

`chsh-dial` 的绿色框只引用第十三章正文用 `lean=` 引用的五条定理：经典上界（`classical_chsh_abs_le_two`，“隐方向”场景的 360 个等距隐方向、权重各 1/360 正是一个有限确定性纤维模型）、一侧可交换时 S² = 4I、四点谱、固定算子的 2√2 与幺正策略的贝尔值上界（取 d = 2 为手工推导）。贝尔态上的同平面关联 cos(夹角)、N = 4|sin α sin β| 与“转动 Bob 的一对方向，⟨S⟩ 最高恰为 √(4 + 4 sin α sin β)”是页面的数值（`NUM`）；均匀隐方向玩具模型与它的折线标 `MODEL`；一般隐变量测度下的 |S| ≤ 2 与无穷维 Tsirelson 界标 `ARGUED`。这一页的青色是四个余弦（量尺上一段段叠起来的四项、余弦弧）与给 +2 的隐方向，品红是两侧张开的面积、谱点 ±√(4 ± N)、弧与折线之差与给 −2 的隐方向；Alice 是实线箭头，Bob 是虚线箭头，时间轴转动 Bob 的一对方向 φ。

`syndrome-decoding` 的绿色框只给第十四章用 `lean=` 引用的两条：`orthogonal_syndrome_recovery`（解码(编码(σ, ρ)) = Tr(σ)·ρ）与 `pauli_word_mul`（泡利字乘法的交叉相位；“灯亮不亮看模 2 辛奇偶”是正文由它推出的读法，页面照此写明）。三比特码只纠一个 X、纠任意单比特错误要更大的码与 Knill–Laflamme 条件标 `ARGUED`；“量校验再查表翻回”的解码器与柱子在房间之间滑动的画法标 `MODEL`；振幅、综合征、解码后的 2 × 2 矩阵与重合度实算（`NUM`）。这一页的青色是振幅柱子与码空间那间房，品红是错误与亮起的校验，琥珀只给解码器这一步翻回的比特，虚线是原来的态。

`braiding` 的绿色框只给第十四章用 `lean=` 引用的 `crossing_yang_baxter`（任意架上的三股恒等式）与 `quandle_coloring_markov_invariant`（有限幂等架的闭合着色数在 Markov 等价下不变）；平面里双交换解不开而空间里能借第三方向解开（Bₙ 与 Sₙ）、Artin/Alexander/Markov 定理、σ₁³ 闭合成三叶结标 `ARGUED`；世界线画法（时间朝上，σ<sub>k</sub> 是从上往下看逆时针半圈、左边那股从前面过）标 `MODEL`；颜色传输与闭合着色数由穷举实算（`NUM`）。ℤ/3 的三个颜色在绳子上写成数字 0、1、2，不占用青、品红；世界线是中性墨色，琥珀只给此刻的时间平面与此刻的颜色，青色与品红只用在闭合弧上（颜色对上 / 对不上）。对照卡（`inverse` `twice` `yb` `stabilize` `trefoil` `rack`）右边那条编织的底端颜色取左边的，多一股时抄末位。

`walk-spreading` 的绿色框只给第十六章用 `lean=` 引用的对称硬币引理（`SymmetricCoinMaximalWalkEntanglement.result`，关于 2p 个模式上单激发 W 态的几何纠缠）；页面不计算这个纠缠量，只画分布。镜像对 (0, x)、(1, −x) 的概率之和与硬币无关、$c_*$ 把每一对均分，是正文证明梗概里的一步，页面上作数值核对（`NUM`）；线上 Hadamard 游走宽度按 n 线性增长、黏合树指数分离与一般图至多二次加速标 `ARGUED`。这一页的青色是量子游走的分布与宽度，灰色（中性）是经典随机游走，品红只给量子分布比镜像 P(−x) 多出的部分，琥珀只在“宽度”场景标当前步数。

`gate-word-polytope` 与 `sphere-escape` 的 `liuhui`、`zu` 分工：那两张讲平面里的割圆（多边形周长逼近圆、有理读数与 π 之间的缝），本页讲有限 {H, T} 门字从北极出发在布洛赫球面上的落点集 𝒮_L、凸包 P_L 与离目标的最近距离。绿色框只给第十六章用 `lean=` 引用的连续两轴有限字命题（`two_axis_finite_word`），并写明它是连续轴圆的对照、不涉及离散门集；可达点、最短门字、凸包、径向间隙 1 − h 与覆盖半径 ε_L 都是页面实算（`NUM`）；Solovay–Kitaev 渐近字长标 `ARGUED`，页面不拟合速率。这一页的青色是可达点与凸包，琥珀是目标方向（或最坏方向），品红是到最近点的弧、径向间隙与空球冠，紫色是 H 与 T 的转轴。

`grover-reflections` 的舞台是目标轴 $W$（竖）与失败轴 $B$（横）张成的平面：琥珀色是当前的态与当前这一步的柱子，青色是态在 $W$ 上的影子（成功振幅）与每一步的成功概率柱，品红是在 $B$ 上的影子，紫色是每一步转过的 $2\theta$；两面镜子（失败轴与 $\lvert s\rangle$ 那条线）用中性灰虚线。绿色框只给第十五章用 `lean=` 引用的 `uniform_operator_rotation`（页面取单列、$p = 1/N$）；查询下界 $\Omega(\sqrt{N})$ 标 `ARGUED`；镜像逐次作用、最佳步数逐个比较（只在第一个半圈 $(2n+1)\theta \le \pi$ 里比）标 `NUM`，两次镜像之间箭头尖沿垂线滑过镜面只是动画。

`phase-gears` 的舞台从上到下是一排相位齿轮（紫色，每只对应 $k$ 的一个二进制位，选中的频率用到的那几只亮着）、选中频率 $k$ 的相位箭头链（青色箭头，墨色合成箭头）、寄存器里的周期梳子（青色格，琥珀色框是扫到的格）与频率谱（青色柱，琥珀色框是选中的 $k$，品红小三角在 $sQ/r$）。绿色框只给第十五章用 `lean=` 引用的 `sum_annihilator_character`：$r \mid Q$、起点为 $0$ 时梳子是 $Q/r$ 的倍数所成子群的零化子，链上的和就是这条命题的和；QFT 的二进制乘积分解（齿轮）、$r \nmid Q$ 时的狄利克雷核集中与连分数读阶标 `ARGUED`；谱由直接求和算出标 `NUM`。页面的“读出阶”取分母不超过 $\sqrt{Q}$ 的最后一个渐近分数。

`rapidity-lightcone` 的舞台是时空图本身（横轴 x、竖轴 t、两轴等比）。白色（墨色）是光锥、零向量与光锥上的珠子，也是“世界线”场景里的静止世界线（粗线）与因果菱形；青色是闵可夫斯基一侧：双曲线 t² − x² = 常数、被推动的点、经 A 的折线与它的固有时刻度；品红只在“对照”场景里出现，是欧氏转动走的圆 t² + x² = 34；琥珀只给当前事件、被推动的两根轴与单位刻度、空间位移 (0, w) 与折返点 A。绿色框只给第十七章用 `lean=` 引用的三条：`bogoliubov_norm_conservation`（推动保持 t² − x² 由它一步代数得出，页面照此写明）、`null_cone_spatial_rigidity`（卡尺场景）、`eq_smul_minkowski_of_null`（比例场景，取 S(v) = minkowski(kBv)）；把 B(η) 读作速度 β = tanh η 的洛伦兹推动、Δτ ≤ Δt 与零线上 Δτ = 0 按该章文献注记标 `ARGUED`；推动、转动、珠子与各段固有时实算（`NUM`）。路线图候选里的“两次变换快度相加”与“同时线倾斜”正文没有对应的句子，未做成卡。

`lattice-gauge-loop` 的绿色框只给第十八章用 `lean=` 引用的两条：`selected_tree_transport`（树输运相位的根点归一、树边重建、端点规范协变）与 `anchored_phase_classification`（锚定规范下 χ 不变、χ 相同当且仅当规范等价、c + a = m + k − n）；边相位、回路相位、树输运相位与计数实算（`NUM`），“沿树拧平”取 g = rootPhase⁻¹、弦的回路相位等于所围方格之积也是数值核对；格子画法、边的方向、生成树（全部横边加最左一列）与时间轴上的中间路径 e^{isθ} 标 `MODEL`；回路相位读作磁通、连续极限与非阿贝尔威尔逊圈标 `ARGUED`。单格的边方向与生成树照例题 `ex-plaquette-phase`（0 → 1 → 2 → 3 → 0，T = {e₀, e₁, e₂}）。这一页的青色是生成树、根到锚点的树路径与它的相位，品红是方格与弦的回路相位，紫色是顶点规范，琥珀只给此刻在拧的顶点或边；边上的相位指针是中性墨色。`two` 卡改的是边相位本身，不是规范变换，页面读数里写明。

`layered-network-cut` 与 `eth-horizon-crossover` 的 `bridge`、`narrow` 分工：那两张讲宽度三桥图的流矩阵与三道割，本页讲 32 格开边界二元 MERA 式层级网络里，把底边一段区间切下来要割断几条键。舞台上的网络是示意模型（`MODEL`）；最小割由增广路实算，527 段区间都不超过 $2\log_2 L + 1$（`NUM`）；“跨割的秩 ≤ χᵏ”在一般网络上、RT 公式与 Swingle 的 MERA 类比标 `ARGUED`；绿色框只给第十九章用 `lean=` 引用的 `QMaxFlow_le_QMinCut`，并写明层级网络不在它的范围内。这一页的琥珀是选中的区间 A、B，品红是最小割断的键（带短横），青色是割内侧的张量与键，其余的键是中性灰。

`complexity-growth` 有两个场景。“增长”是 8 个量子比特、固定种子哈尔随机两比特门的砖墙电路：半链熵（青色）由 16 × 16 约化密度矩阵的本征值逐层实算、门数与跨割门数按门表数出（`NUM`）；熵不超过 4 比特与每道跨割门至多加 2 比特（灰色台阶）、exp(O(N)) 复杂度天花板与热化后预期线性增长按第二十章文献注记标 `ARGUED`；品红的“预期复杂度” min(门数, 2^N) 与天花板的常数是示意模型（`MODEL`），页面不声称算出了复杂度；把品红上升段读成体积的 CV 标 `OPEN`（舞台上的红字与依据框用同一个 `--warn`）。“深度”是第二十章的开放边界链：青色的砖是 N + 1 道门按最早可放的层排好，品红三角是折返点 S，白线是 minDepth(N, κ)，灰色虚线是旧公式；绿色框只给本章用 `lean=` 引用的 `OpenIntegrableCircuitMinDepth.result` 与 `OpenIntegrableCircuitDepthRefutation.result`，CNOT 下界与偶圈长度不上页面。路线图候选“最小深度的下界”做成 `floor`，“增长停在哪里是开放的”改为 `ceiling`（天花板是文献结果）与 `cv`（开放的是 CV 读法），并按正文的两个反例加了 `eight` 与 `eleven`。

`norm-lattice` 与 `pythagoras-number-escape` 的 `golden`、`minus`、`locked` 分工：那几张讲渐近分数逼近 √d 与 ±1 的接缝，本页讲整数格与范数等值线：艾森斯坦格画在复平面 x + y·e^{iπ/3}，换成整数坐标 (P, Q) = (x + (t + 1)y, y) 读出 Qform(t, ·, ·)；黄金整数画在 (g, ḡ) 平面，范数是矩形面积。绿色框只给第二十三章用 `lean=` 引用的四条定理（`Qform_eq_eisNorm`、`Qform_discriminant`、`Qform_range_eq_eisNorm`、`pell_form_eq_four_mul_norm`）；正文以行内链接提到的 `pell_pm_four_iff_signed_lucas_fib` 不在页面上标绿，`units` 卡只展示 φᵏ 的 (2a + b, b) = (Lₖ, Fₖ) 与范数 (−1)ᵏ（`NUM`），不声称它们是全部解。格子面积 √3/2、系数是基矢的内积、判别式 = −4 × 面积²、“取到的值”逐点代入都标 `NUM`；非整数 t 的中间帧、两种坐标之间的过渡与两次乘 φ 之间的滑动标 `MODEL`；四元数范数在 ℚ 中定义 ℤ 标 `ARGUED`。这一页的青色是当前点所在的那条范数等值线及其上的格点、黄金场景里迹的对角线与影子，品红是格子（面积）与黄金范数的矩形和它那一级的双曲线，琥珀只给当前的点与正在滑动的基矢 u₂，其余等值线是中性灰（虚线上没有格点）。

`euler-product-sieve` 与 `sphere-escape` 的 `euclid`、`thirteen` 分工：那两张讲“乘起来加一”找到清单外的素数，本页讲有限个素数的欧拉乘积怎样逼近 ζ(s) 以及筛的余项。舞台上方是实轴 1 < s ≤ 4 上墨色的 ζ(s)、青色的前 K 个素数的乘积与其间品红的缺口（纵轴按“值 − 1”取对数，刻度写值本身），品红虚线是乘积加上下一个素数的 p⁻ˢ，右边的放大镜把当前 s 处的缺口按品红格的 n⁻ˢ 自下而上拆开；下方是整数 1 到 96，青色在乘积的展开里，品红带着清单外的素因子；琥珀只给当前的 s 与刚加进的素数的格子。绿色框只给第二十二章用 `lean=` 引用的三条：`riemann_zeta_euler_product`、`riemann_zeta_dirichlet_sum_eq_euler_product` 与 `riemann_zeta_residue_one`（Lean 对复数 s 陈述，页面只取实数 s）；余项等于最大素因子大于 p<sub>K</sub> 的整数之和、在实数 s > 1 上大于 p<sub>K+1</sub>⁻ˢ 与 ζ(2) = π²/6 按该章例题标 `ARGUED`；ζ(s)、乘积、放大镜各段与“差不到 1% 要几个素数”实算（`NUM`）；黎曼猜想只在抽屉里标 `OPEN`，页面不画临界带。路线图候选里的“只用 2”“用到 5”“用到 31”“s 越靠近 1 需要的素数越多”“筛的余项”依次做成 `two`、`five`、`thirtyone`、`near`、`remainder`，另加 `all`（到 97 格子全青、缺口仍在）配推论 `cor-dirichlet-sum-eq-euler-product`。

`blade-multiplication` 的舞台左边是乘法表（8 块刀片、4 个泡利字或向量自乘的 3 × 3 九项），右边把选中的一格拆开：上方三行是左、右掩码与异或（两边都有的位画青色叉），下方一行一步，右因子逐个向左越过较大的左因子，每次交换画成两条交叉的品红线，排好后同号一对汇成青色的 +1；琥珀只给当前一格与当前这一步，紫色只在 `pseudo` 卡里框出 I₃ 的一行与一列（体积）。三维刀片的位运算规则本章没有冻结成 Lean 定理：8 × 8 表与逐步排序标 `NUM`（逐格与泡利矩阵乘积核对），排序的画法标 `MODEL`，Cl(3,0) ≅ M₂(ℂ) 与 Gottesman–Knill 标 `ARGUED`；绿色框只给本章用 `lean=` 引用的定理：泡利字场景的 `displacement_mul`、`qubit_weyl_star`（`displacement_two_anticommute` 在声明地图里），向量场景的 `B_formula_core`（B(3, 4, 12)² = 169·I 的乘法本身是 `NUM`）。抽屉里的“声明地图”列出第二十五章 `lean=` 引用的全部 9 条冻结定理，测试按章节文件与锁文件核对条目数与链接。路线图候选的 e₁e₂、e₂e₁ 变号、e₁₂e₁₂ = −1、伪标量、泡利字依次做成 `e1e2`、`e2e1`、`square`、`pseudo`、`pauli`，另按例 `ex-xor-pauli-table` 第 3 条加了 `vector`。

`zyz-compile` 与 `qubit-geometry` 的 `hadamard`、`turn2` 及 `two-angle-addressing` 的 `address` 分工：那几张讲 H 门绕对角轴的 180°、旋子转两整圈变号、从北极出发的两角寻址，本页讲第二十六章的正向编译：三段 R_z(α) R_y(β) R_z(γ)（γ 先作用）在八个刀片掩码上按异或乘成一枚旋子，并用夹心积转动箭头与整个三脚架。舞台上琥珀是当前的箭头 v，紫色是固定的 z、y 转轴（这一段加粗）与旋子自己的转轴 n（虚线），青色是 v 在这一段转轴上的影子（不动），品红是 v⊥ 绕轴扫过的扇形（虚线分成左右两个半角），白色是三脚架 Re₁、Re₂、Re₃ 与走过的路。第二十六章用 `lean=` 引用的四条冻结定理都在状态一侧（`blochMatrix_trace`、`bloch_blochMatrix`、`bloch_geometry_of_isHermitian`、`norm_bloch_le_trace_of_posSemidef`），页面只在箭头的纯态 ρ = blochMatrix(1, v) 上标绿并当场核对，抽屉里的声明地图恰是这四条；旋子编译本身没有冻结定理，乘积、三列、转轴与转角标 `NUM`；任意 U(2) 的 ZYZ 分解、Spin(3) → SO(3) 二对一与“单位旋子即一次绕轴转动”按该章文献注记标 `ARGUED`。路线图候选“X 门”正文没有对应的句子，未做；“任意轴”做成 `fold`（单一转轴），“中间一段为零的退化情形”由 `t`（T 门，(π/4, 0, 0)）承担，“夹心作用”做成 `sandwich`，另加 `chain`（例题的三元组 (0.37, −0.81, 0.52)）。

`fixed-point-convergence` 与 `sphere-escape` 的 `dottie`、`far` 分工：那两张讲“总有一点留在外面”，本页讲“怎样收束、收得多快”。舞台是蛛网图（曲线 y = f(x) 与直线 y = x），“跟着放大”时以不动点为原点重新标尺。绿色框只给第二十四章用 `lean=` 引用的 `golden_fixed_point_unique`（φ 是 1 + 1/x 唯一的正不动点）与 `rational_inverse_endpoint`（只取其中 θ* 的存在、唯一与 0 < θ* < 1）；压缩映射与全局收敛、渐近压缩率 −sin θ*、牛顿二次收敛、残差双边界与 (1 + sin 1)/b² 界按 §24.4–24.5 的文献注记标 `ARGUED`；轨道、残差、“单纯迭代要走几步”与连分数部分商都以 70 位定点整数实算（`NUM`）。这一页的青色是曲线 y = f(x)（只读投影）与单位圆上 P 的横坐标 θ*，品红是斜率那一半：不动点处的切线、牛顿沿切线走的那一段、λ = sin θ* 的高度与残差竖线；琥珀只给当前这一步或当前读数；走过的折线是中性墨色，灰色虚线是最陡斜率 −sin 1 与残差的楔形边界。路线图候选“开普勒方程”“半程落体”讲的是 θ* 住在哪里，正文那里没有关于收束快慢的句子，未做成卡；正文讲了而候选没有的“单位圆上的线与面”（`circle`）与“十进制千分尺”（`ruler`）补做成卡。

`lean-declaration-map` 的舞台按阅读顺序排开 34 根柱子（序曲、三十章、终章、附录 A 与 B；附录 C 引用全部条目，不单列一柱，只在读数里给序号），每一格是 `trureturing.lock.json` 的一条声明，落在中文正文第一次引用它的那一章。数据由页面目录里的 `gen-data.py` 从锁文件与中文章节（`:::` 行上的 `lean="…"` 记为环境引用，`(lean:…)` 记为行内引用）生成并写进 `main.js` 的生成段，不手填；锁文件或章节变了要重新运行它并重新出图。绿色只给锁文件里种类为 `theorem` 的格子，灰色是定义，空心是只有行内链接的；青色是某一章引用的那些（从它的柱脚连线），琥珀只给选中的一格、连到另外引用它的章的线与阅读位置。依据框里的绿色只给第二十七、二十八章用 `lean=` 逐行解剖的八条定理；格数、种类与出现的章标 `NUM`，“落在首次出场的章”与柱内次序标 `MODEL`。测试按锁文件核对条目数、种类与源码行，并用另一种扫描重读章节核对每一处引用。路线图候选“一部”改为两张审计表卡 `table27`、`table28`（正文的两张表恰好分别覆盖第一至三部与第四至六部），“正文已解剖的那几条”按两章拆成 `bedrock` 与 `closure`，另按附录 C.2.1 加了 `inline`。

`forgetting-rebirth-attractor` 的舞台是单位开圆盘（两轴等比），白色圆周是第三十六章的纯光视界 θ = 90°；三个场景画在同一张圆盘上。“阶梯”：从 θ*（cos θ = θ 的根）出发，η<sub>k</sub> = η₀ + kΔη，η₀ = gd⁻¹(θ*) ≈ 0.8173；Beltrami–Klein 半径 r = sin θ = tanh η、测地线是直弦，庞加莱半径 ρ = tan(θ/2) = tanh(η/2)、测地线是与圆周正交的圆弧，两者由径向等距 ρ = r/(1 + √(1 − r²)) 连续变形；两种固有时率 √(1 − r²) 与 (1 − ρ²)/(1 + ρ²) 都等于 sech η。右侧（窄屏在右下角）的放大镜按 10 的整数次幂缩小视野，品红的缝 1 − r 按 2/(e<sup>2η</sup> + 1) 直接算，不经 1 − tanh。“轮回”：外部角度尺每步加 Δθ = θ₁ − θ*（阶梯的第一步），越过 90° 的那一步记作恰在圆周上，下一步回到圆心；一圈一根辐条，折叠后第一次撞边之后的步按“步号模周期 p”落到 p 个位置。“分式”：w = (s − 1)/s 下直线 Re s = c 的像圆。青色是阶梯的点、过每一级的测地线、角度尺走过的路与像圆，品红只给到边界的缝与撞上圆周的那一步（以及小图里被捏掉的相干 ½s²），琥珀只给当前一步与当前的像圆；回到圆心的虚线与辐条是中性灰。绿色框只给第三十六章用 `lean=` 引用的四条：`pinching_hilbert_schmidt_pythagorean` 与 `pinching_discarded_coherence_mass`（轮回场景，取 ρ = ½[[1 + c, s], [s, 1 − c]]）、`target_factors_iff_continuous_partition`（折叠：读出 = 步号模 p，目标 = 角度）、`cayley_ratio_norm_one_iff_critical_line`（分式场景）；逆古德曼变换、两种圆盘的度规与等距标 `ARGUED`；阶梯、擦表、轮子与“约去轮回”的读法标 `MODEL`；各数实算（`NUM`）。路线图候选的 `pinching_vonNeumannEntropy_ge`、`lorentz_boost_preserves_minkowski`、`conditionalState_isState` 不在本章的 `lean=` 引用里，未上页面；兰道尔下界 k<sub>B</sub>T ln 2 本章正文没有提到，未上页面；候选卡 `attractor_return` 与终章 `spatial-attractor-deja-vu` 重复、本章没有对应的句子，未做；正文讲到的分式临界圆补做成 `cayley`。

## 正文里的引用（中英文版本位置与卡名相同）

按章排列；同一章内按正文里出现的先后。

| 章节 | 位置 | 引用 |
| --- | --- | --- |
| 第一章 | §1.1 末（两子互为尺规） | `qubit-geometry` · `line` |
| 第一章 | §1.2 快门插图 `ch01-shutter` 之后、“全能属性账本”一段之前 | `pairwise-shutter` · `clicks` |
| 第二章 | §2.1 插图 `ch02-cut-c` 之后、“矩阵的迹”一段之前 | `pairwise-shutter` · `sixty` |
| 第二章 | §2.1 “矩阵的迹”一段之后、定义 `def-born-probability` 之前 | `pairwise-shutter` · `turn` |
| 第二章 | §2.3 半角换算表之后 | `qubit-geometry` · `line` |
| 第二章 | §2.3 `qubit-geometry` · `line` 之后、“上面的表是逐个角度算的”之前 | `pairwise-shutter` · `right` |
| 第二章 | §2.3 “单比特是唯一‘公平’的情形”一段之后 | `pairwise-shutter` · `random` |
| 第二章 | 文献注记 `rem-gleason-literature` 之后、转入第三章之前 | `pairwise-shutter` 完整实验室 |
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
| 第五章 | §5.2 定理 `thm-circle-double-cover-history-lift` 译回旋子的列表（“两整圈”）之后、例 `ex-rotor-two-turns` 之前 | `qubit-geometry` · `turn2` |
| 第五章 | §5.2 末（旋子） | `qubit-geometry` · `turn1` |
| 第五章 | §5.3 全局相位与相对相位的对照之后 | `qubit-geometry` · `phase` |
| 第五章 | §5.4 门图鉴表之前 | `qubit-geometry` · `hadamard` |
| 第五章 | §5.4 门图鉴算例之后、文献注记之前 | `qubit-geometry` · `hzh` |
| 第五章 | 章末、转入第六章之前 | `qubit-geometry` 完整实验室 |
| 第六章 | §6.1 末 | `qubit-geometry` · `half` |
| 第六章 | §6.3 可见度 $V$ 与可区分度 $D$ 的两条定义之后 | `double-slit-marker` · `partial` |
| 第六章 | §6.3 定理 `thm-record-coherence-complementarity` 的证明之后 | `double-slit-marker` · `which` |
| 第六章 | §6.3 惠勒延迟选择算例 `ex-wheeler-delayed-choice-tradeoff` 之后、文献注记之前 | `double-slit-marker` · `delayed`、`erase` |
| 第六章 | §6.3 文献注记 `rem-englert-greenberger-literature` 之后 | `double-slit-marker` · `mixed` |
| 第六章 | §6.3 末 | `qubit-geometry` · `area` |
| 第六章 | §6.3 末（`qubit-geometry` · `area` 之后、§6.4 之前） | `double-slit-marker` 完整实验室 |
| 第六章 | §6.4 | `qubit-geometry` 完整实验室 |
| 第七章 | §7.2 例 `ex-orthogonalization-times` 之前（“把它换成具体哈密顿量的能量涨落”一段末） | `speed-limit-zeno` · `equal` |
| 第七章 | §7.2 例 `ex-orthogonalization-times` 之后 | `speed-limit-zeno` · `three`、`unequal` |
| 第七章 | §7.3 一阶小量与二阶小量一段末 | `speed-limit-zeno` · `strobe16` |
| 第七章 | §7.3 例 `ex-zeno-strobe-freezing` 之后 | `speed-limit-zeno` · `strobe4` |
| 第七章 | §7.3 例 `ex-first-return-qubit` 之后 | `speed-limit-zeno` · `mean` |
| 第七章 | §7.3 末、转入 §7.4 之前 | `speed-limit-zeno` 完整实验室 |
| 第八章 | §8.1 末（单比特 ln 2 特例之后） | `erasure-ledger` · `pinch` |
| 第八章 | §8.2 定理 `thm-entropy-production-coherence-deletion` 后的解读段末、例 `ex-landauer-one-bit-ledger` 之前 | `erasure-ledger` · `steps` |
| 第八章 | 例 `ex-landauer-one-bit-ledger` 之后、文献注记 `rem-density-matrix-balance-inputs-literature` 之前 | `erasure-ledger` · `cycle` |
| 第八章 | 例 `ex-one-qubit-reservoir-swap-erasure` 之后（§8.2 末） | `erasure-ledger` · `bath` |
| 第八章 | §8.3 定理 `thm-reduced-irreversibility-access-defect` 的证明之后 | `erasure-ledger` · `copy` |
| 第八章 | §8.3 末（文献注记 `rem-landauer-thermodynamic-bridge-literature` 之后、§8.4 之前） | `erasure-ledger` 完整实验室 |
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
| 第十二章 | 推论 `cor-finite-trace-mode-budget` 的证明之后 | `eth-horizon-crossover` · `plateau`、`tail` |
| 第十二章 | 例 `ex-cluster-shift-and-gradient` 之后、文献注记 `rem-mbqc-gradients-literature` 之前 | `equator-concentration` 完整实验室 |
| 第十三章 | 推论 `cor-chsh-local-commuting-collapse` 后的解读段末（“只要有一方的两次提问不分先后”） | `chsh-dial` · `collinear` |
| 第十三章 | 例 `ex-chsh-spectrum-angle-table` 之后、“面积张满时的天花板”之前 | `chsh-dial` · `sixty`、`cross` |
| 第十三章 | §45° 余弦与固定 CHSH 极值 · 开头的提问之后、“答案是 45°”之前 | `chsh-dial` · `sweep` |
| 第十三章 | 推论 `cor-fixed-chsh-tsirelson` 的证明之后 | `chsh-dial` · `tsirelson` |
| 第十三章 | 例 `ex-sixteen-deterministic-chsh-tables` 之后、“现在两端都钉住了”之前 | `chsh-dial` · `hidden` |
| 第十三章 | 例 `ex-bell-chsh-45deg` 之后、文献注记 `rem-bell-chsh-literature` 之前 | `chsh-dial` · `arc` |
| 第十三章 | 文献注记 `rem-bell-chsh-literature` 之后（章末） | `chsh-dial` 完整实验室 |
| 第十四章 | Pauli 字一节末（辛奇偶校验和那一条之后、“正交综合征”一节之前） | `syndrome-decoding` · `single` |
| 第十四章 | 正交综合征一节 `OrthogonalSyndromes` 条件的解读段（“绝不串门”）之后 | `syndrome-decoding` · `rooms` |
| 第十四章 | 命题 `prop-orthogonal-syndrome-recovery` 后边界列表第 1 条之后、第 2 条之前 | `syndrome-decoding` · `mix` |
| 第十四章 | 编织一节“三股编织恒等式（Yang–Baxter 方程）”一段之后 | `braiding` · `over`、`inverse` |
| 第十四章 | 推论 `cor-braid-yang-baxter` 的证明之后 | `braiding` · `yb` |
| 第十四章 | 文献注记 `rem-braid-knot-topology-literature` 之后、Markov 一节之前 | `braiding` · `twice` |
| 第十四章 | Markov 一节首段（“闭合编织的着色，就是着色传输的不动点”）之后 | `braiding` · `close` |
| 第十四章 | 稳定化手算一段之后、定义 `def-markov-coloring-equivs` 之前 | `braiding` · `stabilize` |
| 第十四章 | 例 `ex-fox-three-colorings-markov` 之后、文献注记 `rem-alexander-markov-literature` 之前 | `braiding` · `trefoil`、`rack` |
| 第十四章 | Markov 一节末（“这一半，Lean 已经验证”）之后 | `braiding` 完整实验室 |
| 第十四章 | 例 `ex-repetition-code-syndrome` 之后、文献注记 `rem-error-correction-anyons-literature` 之前 | `syndrome-decoding` · `two`、`phase` |
| 第十四章 | 文献注记 `rem-error-correction-anyons-literature` 之后、转入第十五章之前 | `syndrome-decoding` 完整实验室 |
| 第十五章 | Grover 一节定理 `thm-grover-uniform-rotation` 的证明之后、三条边界之前 | `grover-reflections` · `mirrors` |
| 第十五章 | Grover 一节末（三条边界列表之后、相位反冲一节之前） | `grover-reflections` · `over`、`sqrt`，随后完整实验室 |
| 第十五章 | 相位反冲一节开头一段（“相位齿轮”）之后 | `phase-gears` · `basis` |
| 第十五章 | 命题 `prop-finite-character-cancellation` 的解读（相消与相长两条）之后、归一化提醒之前 | `phase-gears` · `cancel` |
| 第十五章 | 文献注记 `rem-shor-divisibility-boundary-literature` 之后、四步算例之前 | `phase-gears` · `leak` |
| 第十五章 | 例 `ex-grover-four-shor-fifteen` 之后、文献注记 `rem-grover-qft-shor-literature` 之前 | `grover-reflections` · `four`、`eight` |
| 第十五章 | 例 `ex-grover-four-shor-fifteen` 之后（`grover-reflections` · `four`、`eight` 之后） | `phase-gears` · `four`、`read` |
| 第十五章 | 章末文献注记 `rem-grover-qft-shor-literature` 之后、转入第十六章之前 | `phase-gears` 完整实验室 |
| 第十六章 | 图上游走一节 $c_*$ 定义之后、“为了衡量 $n$ 步游走波函数”之前 | `walk-spreading` · `ten` |
| 第十六章 | 引理 `lemma-symmetric-coin-walk` 的证明之后、“两条概念边界”列表之前 | `walk-spreading` · `coin`、`ring` |
| 第十六章 | “两条概念边界”列表之后、文献注记 `rem-qsvt-walks-literature` 之前 | `walk-spreading` · `fifty`、`width` |
| 第十六章 | 文献注记 `rem-qsvt-walks-literature` 之后（图上游走一节末） | `walk-spreading` 完整实验室 |
| 第十六章 | 有限门字一节列表第 3 条（凸包与测地多面体）之后、第 4 条之前 | `gate-word-polytope` · `one`、`six` |
| 第十六章 | 有限门字一节列表第 4 条（覆盖半径与径向支撑间隙）之后、第 5 条之前 | `gate-word-polytope` · `nearest` |
| 第十六章 | 有限门字一节列表第 5 条（刘徽“三维割圆术”）之后、编译误差一节之前 | `sphere-escape` · `zu` |
| 第十六章 | 例 `ex-finite-ht-polytope` 之后、文献注记 `rem-solovay-kitaev-literature` 之前 | `gate-word-polytope` · `three` |
| 第十六章 | 文献注记 `rem-solovay-kitaev-literature` 之后（章末收束段之前） | `gate-word-polytope` · `shrink`，随后完整实验室 |
| 第十七章 | §17.1 圆与双曲线的对照列表及章图之后、定理 `thm-hyperbolic-norm` 引言之前 | `rapidity-lightcone` · `circle` |
| 第十七章 | 例 `ex-rapidity-three-fifths` 之后、§17.2 之前 | `rapidity-lightcone` · `boost` |
| 第十七章 | 引理 `lemma-null-cone-spatial` 证明后的解读段（“双向卡尺”）之后 | `rapidity-lightcone` · `caliper` |
| 第十七章 | §17.3 边界列表第 2 条（零锥保持与尺度归一化分离）之后、格言之前 | `rapidity-lightcone` · `cone`、`scale` |
| 第十七章 | 文献注记 `rem-lorentz-rotor-literature` 之后、§17.4 之前 | `rapidity-lightcone` · `light` |
| 第十七章 | 例 `ex-two-worldline-segments` 之后 | `rapidity-lightcone` · `twins`、`frames`，随后完整实验室 |
| 第十八章 | 选定生成树一节规范变换公式之后、“为什么单个边相位……”一段之前 | `lattice-gauge-loop` · `twist` |
| 第十八章 | 闭合回路一节列表第 1 条（弦的基本闭合回路）之后、第 2 条之前 | `lattice-gauge-loop` · `chord` |
| 第十八章 | 闭合回路一节“开放树路径相位也……成为严格的规范不变量”一段之后 | `lattice-gauge-loop` · `anchor` |
| 第十八章 | 推论 `cor-anchored-phase-classification` 的证明之后、格言之前 | `lattice-gauge-loop` · `two` |
| 第十八章 | 格言（“未受锚点锁定的自由树枝相位可由局部规范变换抹平”）之后 | `lattice-gauge-loop` · `tree` |
| 第十八章 | 例 `ex-plaquette-phase` 之后、章末收束段之前 | `lattice-gauge-loop` · `plaquette`，随后完整实验室 |
| 第十九章 | 纠缠层级一节首段（“跨越接口的算子秩……随内部腿维数的乘积而增长”）之后、插图之前 | `layered-network-cut` · `one` |
| 第十九章 | 纠缠层级一节插图解读段（MERA 瓶颈、一般网络最大流不一定等于最小割）之后 | `layered-network-cut` · `four` |
| 第十九章 | 锥域一节“最小割公式自动脱去外层的 $3ac$”一段之后、推论 `cor-bridge-cone-mincut` 之前 | `eth-horizon-crossover` · `narrow` |
| 第十九章 | 文献注记 `rem-ryu-takayanagi-literature` 之后、章末收束段之前 | `layered-network-cut` · `grow`、`two`，随后完整实验室 |
| 第二十章 | 定理 `thm-open-circuit-min-depth` 的证明之后、“请严格注意”一段之前 | `complexity-growth` · `floor` |
| 第二十章 | 例 `ex-open-circuit-depths` 之后、§黑洞内部与复杂度—体积猜想之前 | `complexity-growth` · `eight` |
| 第二十章 | 引理 `lemma-open-circuit-depth-refutation` 的证明之后、“必须严格声明”一段之前 | `complexity-growth` · `eleven` |
| 第二十章 | 文献注记 `rem-complexity-growth-literature` 之后、猜想 `conj-complexity-equals-volume` 之前 | `complexity-growth` · `saturate`、`ceiling` |
| 第二十章 | 猜想 `conj-complexity-equals-volume` 之后、§纠缠桥与 ER=EPR 之前 | `complexity-growth` · `cv` |
| 第二十章 | 例 `ex-cnot-and-cycle-bounds` 之后、P/NP 的提问之前 | `complexity-growth` 完整实验室 |
| 第二十一章 | §21.2 例 `ex-cantor-godel-diagonal-table` 后“连同地址空间一起向外扩容”一段之后 | `sphere-escape` · `absorb` |
| 第二十一章 | §21.2 末 | `sphere-escape` · `diagonal` |
| 第二十一章 | §21.3 末 | `sphere-escape` · `liuhui` |
| 第二十一章 | §21.4 末 | `sphere-escape` 完整实验室 |
| 第二十二章 | §22.1 单根素数轴的等比级数一段（“合二为一”）之后、`classicalZeta` 约定之前 | `euler-product-sieve` · `two` |
| 第二十二章 | §22.2 “s → 1⁺ 时放大因子 p/(p − 1) 累积发散”一段之后、引理 `lem-riemann-zeta-residue-one` 之前 | `euler-product-sieve` · `near` |
| 第二十二章 | 推论 `cor-dirichlet-sum-eq-euler-product` 的证明之后、`sphere-escape` · `euclid` 之前 | `euler-product-sieve` · `all` |
| 第二十二章 | §22.2 末 | `sphere-escape` · `euclid` |
| 第二十二章 | 例 `ex-prime-log-orthogonality-and-sieve` 之后 | `euler-product-sieve` · `five`、`remainder` |
| 第二十二章 | §22.3 “首项裂缝……生长之门”一段之后、`sphere-escape` · `thirteen` 之前 | `euler-product-sieve` · `thirtyone` |
| 第二十二章 | §22.3 末（“素数有无穷多个”一段之后、格言之前） | `sphere-escape` · `thirteen` |
| 第二十二章 | `sphere-escape` · `thirteen` 之后、§22.3 格言之前 | `euler-product-sieve` 完整实验室 |
| 第二十三章 | §23.1 艾森斯坦整数环引言段（“让我们先考察复平面上最对称的二维晶格”）之后、Lean 模块说明之前 | `norm-lattice` · `hex` |
| 第二十三章 | §23.1 末段（“同一颗六角范数球在不同斜交基底下的投影”）之后、§23.2 之前 | `norm-lattice` · `skew` |
| 第二十三章 | 引理 `lem-qform-discriminant` 的证明之后、“由于剪切变换……”一段之前 | `norm-lattice` · `shear` |
| 第二十三章 | 推论 `cor-qform-range-eq-eisnorm` 的证明之后、转入黄金整数一段之前 | `norm-lattice` · `range` |
| 第二十三章 | 定义 `def-golden-int-and-norm` 之后、代数迹一段之前 | `norm-lattice` · `norm` |
| 第二十三章 | 命题 `prop-pell-form-eq-four-mul-norm` 的证明之后 | `norm-lattice` · `pell` |
| 第二十三章 | 佩尔—卢卡斯—斐波那契锁定一段（“当且仅当……$(\pm L_n, \pm F_n)$”）之后、例 `ex-eisenstein-and-golden-pell-lattice` 引言之前 | `norm-lattice` · `units` |
| 第二十三章 | §23.2 例 `ex-eisenstein-and-golden-pell-lattice` 之后 | `pythagoras-number-escape` · `golden` |
| 第二十三章 | §23.2 末（`pythagoras-number-escape` · `golden` 之后、§23.3 之前） | `norm-lattice` 完整实验室 |
| 第二十四章 | §24.3 推论 `cor-golden-fixed-point-unique` 的证明之后、“为什么是 1 + 1/x”一段之前 | `fixed-point-convergence` · `golden` |
| 第二十四章 | §24.4 文献注记 `rem-banach-dottie-hairy-ball-literature` 之后、猜想 `conj-schanuel-dottie` 之前 | `sphere-escape` · `far` |
| 第二十四章 | §24.4 末 | `sphere-escape` · `dottie` |
| 第二十四章 | §24.5 文献注记 `rem-dottie-convergent-residual-literature` 之后、例 `ex-dottie-rate-newton-rational` 之前 | `fixed-point-convergence` · `rate`、`circle`、`newton` |
| 第二十四章 | 例 `ex-dottie-rate-newton-rational` 之后、“最后一张表说明”一段之前 | `fixed-point-convergence` · `rational` |
| 第二十四章 | “二十三等分的尺子……一千等分的尺子没有”一段之后、“有理读数永远对不准”之前 | `fixed-point-convergence` · `ruler`，随后完整实验室 |
| 第二十五章 | §三比特刀片掩码一节的掩码表之后、“在这套 3 比特编码下”之前 | `blade-multiplication` · `square` |
| 第二十五章 | 两条位运算定律的列表之后、“请特别注意”之前 | `blade-multiplication` · `e1e2`、`e2e1` |
| 第二十五章 | 伪标量与两比特辛泡利字两条说明之后、逆序共轭一段之前 | `blade-multiplication` · `pseudo` |
| 第二十五章 | 例 `ex-pauli-words-xor-sign-table` 之后、§零依赖 Python 3 引擎之前 | `blade-multiplication` · `pauli` |
| 第二十五章 | 例 `ex-xor-pauli-table` 之后、文献注记 `rem-clifford-stabilizer-literature` 之前 | `blade-multiplication` · `vector` |
| 第二十五章 | 文献注记 `rem-clifford-stabilizer-literature` 之后、转入第二十六章之前 | `blade-multiplication` 完整实验室 |
| 第二十六章 | 夹心积一节两条列表（$v_\parallel$ 不动、$v_\perp$ 合成整角）之后、“更美妙的是”之前 | `zyz-compile` · `sandwich` |
| 第二十六章 | 夹心积一节末（“折叠成唯一一枚四分量偶多重向量”）之后、Python 一节之前 | `zyz-compile` · `chain` |
| 第二十六章 | 例 `ex-zyz-compilation-trace` 之后、文献注记 `rem-zyz-euler-compilation-literature` 之前 | `zyz-compile` · `t`、`h` |
| 第二十六章 | 文献注记 `rem-zyz-euler-compilation-literature` 之后、章末收束段之前 | `zyz-compile` · `fold`，随后完整实验室 |
| 第二十七章 | 章首两条提纲之后、审计架构插图之前 | `lean-declaration-map` · `bedrock` |
| 第二十七章 | 第一至三部审计表之后、前提变异算例的引言之前 | `lean-declaration-map` · `table27` |
| 第二十八章 | 推论 `cor-audit-unread-fixed-iff` 的证明之后、§第四至六部审计表之前 | `lean-declaration-map` · `closure` |
| 第二十八章 | 第四至六部审计表之后、数值算例的引言之前 | `lean-declaration-map` · `table28` |
| 第二十九章 | 第二幕末 | `pythagoras-number-escape` · `hippasus` |
| 第二十九章 | 第一座桥“表盘立刻说明线素数写不成两平方和”一段之后 | `pythagoras-number-escape` · `seven` |
| 第二十九章 | 第一座桥手工推导 3（线素数的负佩尔方程无解）之后 | `pythagoras-number-escape` · `locked` |
| 第二十九章 | 例 `ex-ch29-face-and-line-primes` 之后、文献注记 `rem-ch29-pell-primes-hilbert-literature` 之前 | `pythagoras-number-escape` · `minus` |
| 第二十九章 | 第一座桥末 | `pythagoras-number-escape` · `five` |
| 第二十九章 | 第三座桥文献注记 `rem-ch29-hasse-gauss-literature` 之后 | `pythagoras-number-escape` · `count` |
| 第二十九章 | 文献注记 `rem-ch29-arithmetic-geometry-literature` 之后 | `pythagoras-number-escape` · `sato` |
| 第二十九章 | 第三座桥末 | `pythagoras-number-escape` 完整实验室 |
| 第二十九章 | 第一层末 | `timeless-causal-crystal` · `crystal` |
| 第二十九章 | 第二层 $\det G \ge 0$ 公式之后 | `timeless-causal-crystal` · `impossible` |
| 第二十九章 | 第二层末（“零自由度刚性”列表之后） | `timeless-causal-crystal` · `edge` |
| 第二十九章 | 第四层观察者对照表之后 | `timeless-causal-crystal` · `right` |
| 第二十九章 | 第四层末 | `timeless-causal-crystal` · `window` |
| 第二十九章 | 定理 `thm-ch29-gram-rigidity-and-pell` 之后 | `timeless-causal-crystal` 完整实验室 |
| 第三十章 | 第一节 · 2 列表（两道几何视界）之后 | `timeless-causal-crystal` · `thread` |
| 第三十章 | 文献注记 `rem-ch30-query-sos-literature` 之后 | `timeless-causal-crystal` · `longer` |
| 第三十章 | 文献注记 `rem-ch30-karmarkar-kasteleyn-literature` 之后 | `timeless-causal-crystal` · `field` |
| 第三十章 | ETH 一节 · 1 末（张量关联场） | `eth-horizon-crossover` · `bridge` |
| 第三十章 | 例 `ex-ch30-galactic-crossover-scale` 之后 | `eth-horizon-crossover` · `human`、`cross` |
| 第三十章 | ETH 一节末 | `eth-horizon-crossover` · `atoms`，随后完整实验室 |
| 第三十章 | 文献注记 `rem-ch30-lamb-decomposition-literature` 之后 | `navier-stokes-p-np` · `potential` |
| 第三十章 | 纳维—斯托克斯一节 · 1 末（兰姆恒等式） | `navier-stokes-p-np` · `vortex` |
| 第三十章 | 文献注记 `rem-ch30-vorticity-transport-literature` 之后 | `navier-stokes-p-np` · `flat`、`strain` |
| 第三十章 | 文献注记 `rem-ch30-navier-stokes-forced-literature` 之后、`runaway` 之前 | `navier-stokes-p-np` · `burgers` |
| 第三十章 | 文献注记 `rem-ch30-navier-stokes-forced-literature` 之后、猜想 `conj-coda-navier-stokes-regularity` 之前 | `navier-stokes-p-np` · `runaway` |
| 第三十章 | 定理 `thm-coda-quadratic-advection-no-closure` 的证明之后 | `navier-stokes-p-np` · `mixed` |
| 第三十章 | `mixed` 之后 | `navier-stokes-p-np` · `closed` |
| 第三十章 | 纳维—斯托克斯一节末 | `navier-stokes-p-np` 完整实验室 |
| 第三十六章 | §“无穷离散步阻断化光”开头“想象你正走向一道悬崖”一段之后、定理 `thm-ch36-taylor-tail-and-cayley-boundary` 之前 | `forgetting-rebirth-attractor` · `erase_reset` |
| 第三十六章 | 注记 `rem-ch36-hyperbolic-staircase-figure` 之后的解读段（分式变换与单位圆）之后 | `forgetting-rebirth-attractor` · `cayley` |
| 第三十六章 | 例 `ex-ch36-inverse-gudermannian-discrete-staircase` 之后 | `forgetting-rebirth-attractor` · `staircase` |
| 第三十六章 | 例之后的解读段（“几何防火墙”）之后、文献注记引言之前 | `forgetting-rebirth-attractor` · `horizon_gap` |
| 第三十六章 | 文献注记 `rem-ch36-poincare-disk-gudermannian-literature` 之后 | `forgetting-rebirth-attractor` · `klein_vs_poincare` |
| 第三十六章 | 定理 `thm-ch36-quotient-annihilator-and-factorization` 后的三条解读列表之后 | `forgetting-rebirth-attractor` · `quotient_fold` |
| 第三十六章 | 注记 `rem-ch36-samsara-exit-table` 之后、第九部收束段之前 | `forgetting-rebirth-attractor` 完整实验室 |
| 终章 | 空间吸引子 · 一 末 | `spatial-attractor-deja-vu` · `butterfly` |
| 终章 | 空间吸引子 · 二 “内禀几何参数”列表之后 | `spatial-attractor-deja-vu` · `fixed`、`cycle` |
| 终章 | 空间吸引子 · 二 末（文献注记 `rem-coda-lorenz-srb-literature` 之后） | `spatial-attractor-deja-vu` · `forget`、`dimension` |
| 终章 | 空间吸引子一节末 | `spatial-attractor-deja-vu` · `return`，随后完整实验室 |
| 终章 | 黄金切投 · 一 末 | `golden-cut-observer` · `cut` |
| 终章 | 黄金切投 · 二 末 | `golden-cut-observer` · `phason` |
| 终章 | 黄金切投 · 三 末（文献注记 `rem-coda-quasicrystal-empire-literature` 之后） | `golden-cut-observer` · `window`、`empire` |
| 终章 | 定理 `thm-coda-golden-cut-observer-cassini` 之前 | `golden-cut-observer` · `cassini`、`returns` |
| 终章 | 定理 `thm-coda-golden-cut-observer-cassini` 的证明之后、完整实验室之前 | `golden-cut-observer` · `narrow` |
| 终章 | 该定理的证明之后 | `golden-cut-observer` 完整实验室 |
| 附录 C | 开篇三类账目列表之后、C.1 之前 | `lean-declaration-map` · `all` |
| 附录 C | C.2.1 行内声明表之后、C.3 之前 | `lean-declaration-map` · `inline` |
| 附录 C | C.4 核验清单之后、注记 `rem-appendix-c-epistemic-boundary` 之前 | `lean-declaration-map` · `theorems` |
| 附录 C | 附录末 | `lean-declaration-map` 完整实验室 |

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
