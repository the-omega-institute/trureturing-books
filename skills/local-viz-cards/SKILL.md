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

## 统一版式与交互范式（以 `triadic-nameless-sandbox` 为基准）

全书所有交互可视化页面严格统一为 `triadic-nameless-sandbox` 的三栏暗色实验室布局与交互契约，禁止新增异构骨架：

1. **三栏暗色实验室壳层（`.app.lab`）**：左栏 `#rail` 放置可选双透镜切换（`.lens-toggle`）与递进实验卡（`button.preset`）；中栏由占主体的交互舞台 `#stage`、紧随舞台外下方的对照小图条 `.strip` 与底部播放时间轴 `.bar` 组成；右栏 `#evidence` 放置顶部的原理抽屉按钮 `#infoBtn`、实时参数滑块/读数与依据分层框（`.lean`、`.lean.argued`、`.lean.num`、`.lean.model`、`.lean.open`）。严禁改写 `.app.lab` 主网格列结构或另起双栏/悬浮顶栏布局，严禁把 `.strip` 辅助图塞进 `#stage` 内部挤压三维视口，严禁在实验室页面混入 `data-tr-palette` 浅色模式切换。
2. **同核递进实验卡与投影琥珀手柄**：多张实验卡围绕同一个实时几何/代数计算核（可用 `Map` 缓存纯函数解算结果）逐层递进展开，不拼凑彼此脱节的独立小图；三维实体舞台（`kit.solid`）上的主抓手经相机投影同步一枚同心琥珀光晕按钮 `<button class="handle">`，拖动手柄与拨动滑块双向实时联动；内部边界相消或跨层级过渡优先提供连续混合参数 $\lambda \in [0, 1]$，让读者亲手拉动抵消与闭合过程。
3. **容器自适应叠层与非滚动暂停测试**：在舞台容器上启用 `container-type: size`，中窄容器或书内嵌入高度下自动精简角标叠层（`.hud`）以零遮挡让出主画面；浏览器测试对启用 `kit.autoplay` 的页面暂停播放时，通过 DOM 属性判定触发 `#play` 而非直接滚动点击，防止中窄视口下把 `#stage` 滚出首屏。

## 页面与它们的卡

下表按登记表（`books/quantum-geometry/viz/visualizations.json`）的顺序排列。

| 页面 | 一句话 | 卡（`preset`） |
| --- | --- | --- |
| `qubit-geometry` | 粒子是线，波是面积，两者是同一个几何积的两个投影 | `area` `half` `phase` `hadamard` `hzh` `turn2` `poles` |
| `sphere-escape` | 以为把球封住了，总还有一点留在外面 | `diagonal` `split` `absorb` `pointer` `liuhui` `zu` `thirteen` |
| `pythagoras-number-escape` | 线上的误差可以趋于零，面积上的缺口至少一格 | `hippasus` `locked` `five` `seven` `count` `sato` |
| `timeless-causal-crystal` | 两条余弦锁住第三条的窗口，观察者只能在窗口里选点 | `window` `impossible` `right` `crystal` `field` `thread` `sos` `wilderness` |
| `navier-stokes-p-np` | 对流项拆成梯度与兰姆两半；涡管被拉细（受光的实体管：截面按 A(t) 画，管面由灰到品红表示 ω = Γ/A，青色亮环是环量回路，出发时的管留作淡影与虚线圈；伯格斯涡核按精确解趋向 R∞ ∝ Re^(−½)，条带小图另画 K41 统计标度，两者不互推）；只看一部分的观察者得不到闭合 | `vortex` `flat` `strain` `burgers` `runaway` `mixed` |
| `eth-horizon-crossover` | 渐近更好的曲线要到视界之外才追上；单次抽样流矩阵的秩与四道割比较；过线的模态数有墙 | `human` `atoms` `cross` `constant` `bridge` `narrow` `geometric` |
| `spatial-attractor-deja-vu` | 忘掉起点，轨道还是落回同一对翅膀，一次次经过同一处 | `forget` `return` `shrink` `dimension` `fixed` `cycle` |
| `golden-cut-observer` | 窗口挪一挪，贴边的点翻转，深处的点留在原地 | `cut` `phason` `empire` `cassini` `returns` `narrow` `window` `gaps` `pi` |
| `repeated-projection` | 投一次，箭头只剩线上的影子；再投多少次，影子都不再动 | `twice` `fixed` `perp` `sum` `chain` |
| `bloch-noise` | 噪声把球往里压、往北推，却从不把球里的两个点拉开 | `shorten` `pinch` `dephase` `amp` `wide` `distance` `centre` |
| `double-slit-marker` | 路径记得越清，条纹越淡；两者落在同一个圆上，怎么读标记可以等落点到了再定 | `wave` `partial` `which` `delayed` `erase` `mixed` |
| `erasure-ledger` | 转动不记账；抹掉横着的那一份，系统的熵就多出这一份；把比特复位，这笔熵要化成热付给环境，只能多付，不能少付 | `pinch` `steps` `cycle` `bath` `copy` `dpi` |
| `speed-limit-zeno` | 翻过 90° 的墙快不过能量涨落；看得越勤越走不掉，可平均还是两步回来一次 | `equal` `three` `unequal` `strobe4` `strobe16` `mean` |
| `two-angle-addressing` | 先倾一次、再拧一次，就到得了球面上任何一点；两根轴斜着，只是要多转几次 | `tilt` `address` `pole` `skew` `narrow` `trotter` `three` `six` |
| `berry-loop` | 走一圈回来，箭头转过圈住的面积，内积连乘的相位只记下一半；整颗球上总有梳不平的一点 | `order` `octant` `equator` `reverse` `comb` |
| `pulse-area-virtual-z` | 包络下有多少面积，态就转多大的角；绕竖轴的那一转不发脉冲，只改后面脉冲的相位 | `carrier` `quarter` `gauss` `detune` `order` `vz` `sign` |
| `parameter-shift` | 左右各转 90° 取两个值，两值之差的一半正好是这一点的斜率；小步长差分在斜率非零处总差一点；f = cos θ、θ = 60°、h = 6°、每点发数相同时，它的标准差约是 ±90° 估计的 16 倍 | `shift` `anywhere` `step` `noise` |
| `equator-concentration` | 维数越高，球面上的点越挤在垂直于测量轴的赤道上，宽度按 1/√d 缩小 | `three` `width` `bound` `twenty` |
| `pairwise-shutter` | 快门每次只报“过”或“不过”；按得越多，“过”的比例越贴近两支箭头的夹角定下的权重 | `clicks` `right` `same` `opposite` `turn` `random` |
| `chsh-dial` | 四个余弦叠起来能越过 2，却越不过两侧张开的面积给的天花板；经典的隐方向怎么转都越不过 2 | `collinear` `sixty` `sweep` `tsirelson` `hidden` `arc` |
| `syndrome-decoding` | 校验只问相邻两个比特一不一致：亮起的灯指出翻了哪一个，翻回去，叠加原样回来；翻两个或翻相位，灯就指错或者不亮 | `single` `rooms` `mix` `two` `phase` |
| `braiding` | 交换两颗粒子，谁从前面过记在第三个方向上；反着交换一次就回来，同向交换两次回不来，三股的两种顺序落在同一处 | `over` `inverse` `twice` `yb` `close` `stabilize` `trefoil` `rack` |
| `walk-spreading` | 带着硬币相干地走，宽度按步数长大；掷硬币乱走，宽度只按步数的平方根长大 | `fifty` `width` `coin` `ring` |
| `gate-word-polytope` | 门字越长，落点越密，最大的缺口一级级缩小，却永远补不上 | `one` `three` `six` `nearest` `shrink` |
| `grover-reflections` | 照两面镜子，态就在同一个平面里朝目标转 2θ；整数步只能逼近，走多了会转过头 | `four` `eight` `over` `sqrt` |
| `phase-gears` | 逐级减半转速的齿轮给每一格拧出相位；周期梳子上的相位箭头首尾相接，不共振的绕成圈抵消，只剩周期留下的峰 | `basis` `cancel` `four` `dual` `read` `leak` |
| `rapidity-lightcone` | 推动只让事件沿双曲线滑动，光锥一动不动；绕路的世界线攒下的固有时更少 | `circle` `boost` `caliper` `cone` `scale` `light` `twins` `frames` |
| `lattice-gauge-loop` | 一条边上的相位可以拧成任意值；绕方格一圈的相位，顶点怎么拧都不动 | `twist` `chord` `anchor` `tree` `two` `plaquette` |
| `layered-network-cut` | 把边界上的一段切下来，割要从网络里面穿过；区间翻倍，割只多两三条腿 | `one` `four` `grow` `two` |
| `complexity-growth` | 熵几层就封顶，门数还一层层往上长；电路怎么排，层数都压不到 ⌊N/(κ+1)⌋ + 1 以下 | `saturate` `ceiling` `cv` `floor` `eight` `eleven` |
| `norm-lattice` | 换一组坐标去读，系数全变了，格点上的范数一个也没动；范数锁在 ±1 的点只能沿双曲线一格一格地跳 | `hex` `skew` `shear` `range` `norm` `pell` `units` |
| `euler-product-sieve` | 有限个素数乘起来总比 ζ 少一截：少的正是带着清单外素因子的整数，s 越靠近 1 少得越多 | `two` `near` `all` `five` `thirtyone` |
| `blade-multiplication` | 两块刀片相乘：重复的方向成对抵掉，剩下的是掩码的异或；正负号只看排好顺序要交换几次 | `e2e1` `square` `pseudo` `pauli` `vector` |
| `zyz-compile` | 绕 z、绕 y、再绕 z 转三段，乘出来只是一枚旋子：绕一根轴的一次转动 | `sandwich` `chain` `h` `fold` |
| `fixed-point-convergence` | 蛛网每绕一圈，误差乘上不动点处的斜率；连斜率一起读，几步就合拢；有理读数却总差一道缝 | `golden` `far` `rate` `circle` `newton` `rational` `ruler` |
| `mutual-observer-attractors` | 两人同时读对方，逐拍可以越过不动点，两拍一轮却从一侧锁进同一个 (θ*, θ*)；两段区间拉近，连通的割在 d_crit 处胜出 | `alone` `round` `apart` `transition` `connected` |
| `self-referential-table` | 同一张表，横着读是尺子，竖着读是被量的东西；拿它读它自己，读回来的还是它；碰歪一格，它自己回到一张幂等的表 | `reset` `expand_table` `full` `dual_read` `heal` `orthogonal_zero` |
| `quantum-fairness-ledger` | 没有特权的座位：照见是相互的，得一分就失一分，满额的纠缠与副本分不出第二份，从哪里出发都分到同样的份额 | `haar` `tradeoff` `cloning` `bell` `wstate` `ghz` `ergodic` |
| `spherical-degeneracy-radar` | 转一次与转两次，终点不同，有的观察者却读出同一个数；把这些读不出差别的人收集起来，只剩极轴上的那一对 | `meridian` `sweep` `tilted` `hops` `equator` `frames` `pullback` |
| `unified-field-slice` | 时钟与速度是同一个圆上的线与面积；在两个平面里来回转一圈回不到原处；视界割断几条边，跨界的纠缠就封顶在那里 | `polytope` `fixedpoint` `photon` `plaquette` `horizon` |
| `forgetting-rebirth-attractor` | 按内禀快度等步走，一格格逼近圆盘边界却永远到不了；按外部角度尺等步走，几步就撞上边界、擦表重来，绕成一只轮子 | `staircase` `klein_vs_poincare` `erase_reset` `quotient_fold` `cayley` |
| `pointer-ontology-deref` | 一格一格扫要走遍全表；路由树每条分支只拨动根到叶的 log₂N 个开关；零号槽里写着页目录自己的地址，解引用一次就回到自己 | `qram_tree` `linear64` `superpose` `four_loops` `self_map` `diagonal_hit` |
| `self-sustaining-spinor-flow` | 旋量夹住两块参考刀片，织出一根流向量与一块自旋面，三个平方始终相等；矢量转一圈就回来，旋量要转两圈 | `weave` `fierz` `turn360` `seam` `turn720` |
| `gram-causal-elliptope` | 多记一步历史，下一步能落的窗口就收窄一圈；所有主子式非负，才装得进同一个内积空间 | `elliptope` `narrow` `violate` `flat` |
| `dream-decoherence-unpinning` | 锚点剪掉位置之间的相干，各处的权重一格不动；放松锚点，或把每一份记录都逆转，条纹就回来——记录把两条路完全分开时回不来 | `waking` `blocks` `half_erase` `zero_overlap_fail` `quantum_eraser` `unpin_body` `wake_snap` |
| `meta-unification-compass` | 八家统一纲领在三根轴上各偏一侧；120 个转动加上它们的黄金缩小版，恰是 E₈ 的 240 个根，Q 全都等于 2 | `cube` `camps` `crystal` `icosians` `e8` `fold` |
| `hairy-ball-normal-escape` | 球面上贴着的箭头总留一个发旋：两个能合成一个，却消不掉；换成环面，或让箭头沿法向立起一点，才处处不为零 | `merge` `torus` `defect` `escape` |
| `dottie-fibonacci-spirals` | 负导数把一维递推拧成北东南西的回旋方格；弯曲圆弧把加法守恒换成勾股守恒 | `whirl` `twin` `pythagoras` `tilt` `zoom` `division` |
| `critical-mirror` | 零点四个一组，只有站在镜面上才缩成一对；对称本身锁不住零点 | `quartet` `cayley` `thin` `quartic` |
| `vortex-polygon` | 正负相间的点涡只在一个半径上静止；从六边形起推一下就按 e^(λt) 长大，正方形的谱全在虚轴上，整圈却会匀速转走 | `rest` `radius` `hexagon` `drift` |
| `entanglement-entropy-complexity` | 同一把偏迹剪刀切开整态：留在手里的纯度与跨割的纠缠永远勾股相加为 1，割断的键数定出局部还原的门账 | `pythagoras` `dottie` `arealaw` `volumelaw` `bellcut` `globaljoint` |
| `fairness-square-uncertainty-expansion` | 螺旋投到圆上只露一圈影子；两两比量要公平就得平方，平方折掉单基相位换来测不准，碰壁的余项长成新轴 | `helix-shadow` `horizon-limit` `fair-square` `phase-fold` `uncertainty-wedge` `time-expand` |
| `padic-prime-table-tree` | 换一株零进位的素数树查表：素数越大，扇出越宽、树越扁；无穷多颗素数把连续进位的悬崖挡在门外 | `cleavage` `hensel` `flatten` `unramified` `adelic` `euclid` |
| `dream-pre-decoherence-deja-vu` | 先选一把尺子切出未来的截面；夜里把前置逻辑提前捏成块对角，醒来未被新证据冲掉的一格零增熵直接命中 | `choose-context` `dream-precompile` `gram-funnel` `logic-upgrade-flush` `unimodular-reversal` `deja-vu-hit` |
| `pnp-lookup-degradation` | 把零步全知神谕表一级级加上物理限制：先长出进位延迟，再撑出全息球面、平方根干涉与擦除热，反过来读就是建表的路 | `oracle` `frougny` `bekenstein` `grover` `landauer` `ladder` |
| `observer-escape-ledger` | 有限引理快表把状态分成原像纤维：关掉冗余引理一根弦不漏，漏掉高阶奇偶就弹出跨格逃逸弦，无邻 1 语法守住黄金容量 | `hilbert` `novelty` `escape` `marginal` `zeckendorf` `dream` |
| `pisot-clifford-rauzy-sandtable` | 禁止连续满载把纵向的零进位前缀树与横向收缩的劳齐分形锁在同一枚算子上，跨切口的禁令定出纠缠秩与边界熵 | `zeckendorf` `kbonacci` `padic` `rauzy` `clifford` `self-reference` `entanglement` `entropy` |
| `quantum-interpretations-duel` | 密封的朋友实验室配远距贝尔对：同一组角度、环境规模与洛伦兹推动下，五种视角各自把账记在哪里 | `wigner-cut` `and-to-or` `born-unequal` `bell-epr` `time-horizon` `five-way-duel` |
| `coherence-handshake-causality` | 零读数是正交或反相相消，单向振幅配共轭回波才成公平握手，未来擦除分拣条纹而不改边缘总和 | `boolean-illusion` `born-handshake` `feynman-stationary` `tsvf-eraser` `gram-symmetry` `paradox-cancel` |
| `observer-consensus-decoherence` | 同一根轴能留下两端，散开的轴会把球一起压向中心；多份对齐记录在中间拉出平坦的冗余平台 | `isotropic-fog` `axis-consensus` `phase-gauge` `darwinism-plateau` `dual-wigner-bubbles` `new-axis-pioneers` |
| `comparison-oisc-engine` | 不预设坐标的两两比较拆出求同与存异：双向乘积在 Î² = −1 守住单位预算，二十八次比较显影出三维八角盒，装不下的残差立为新轴 | `oisc` `emergence` `uncertainty` `time-axis` `lookup` `budget-cone` |
| `spherical-trihedron-cell` | 正交一次与正交两次是同一块小弧面体的两个投影：沿棱看是一条直弧，沿墙走是拐 90° 的两步，多出鼓起的球面帽与撑开的体积砖 | `cell` `once-ridge` `twice-walls` `cap-excess` `gram-brick` `octant-limit` |
| `triadic-nameless-sandbox` | 两态比较的归一投影把第三顶点顶出原平面，转一圈切面主谓宾互换，撤去投影幕与标签只留两频呼吸的曲面 | `bootstrap-core` `cascade-corolla` `cyclic-triality` `ladder-fade` `noumenon-breath` |
| `berry-sector-path-sandbox` | 球心扇锥体积是弧顶面积的三分之一并定出半角相位，同一点在霍普夫圆纤维上记下不同来路，离散扇形连乘在驻相处锁成测地线 | `sector-volume` `hopf-fiber-lift` `stokes-wilson-duality` `pancharatnam-fan` `feynman-stationary` |
| `standing-wave-volume-sandbox` | 同一点汇聚多条来路相位，无理失配绕圈抵消成虚空，整圈锁相的闭合回路在加密采样下凝成具有排斥刚性的驻波体积 | `multi-phase-point` `circle-density-pushforward` `void-cancellation` `bohr-sommerfeld-quantization` `standing-volume-emergence` |
| `clifford-monad-tiling-sandbox` | 单枚圆弧体把点权、路径梯度、贝里相位与扇锥体积合一，多胞拼接时内部共享边界成对抵消、各阶几何量向外表面分流 | `monad-four-in-one` `gradient-path-phase-lock` `hodge-stokes-duality` `multicell-boundary-cancellation` `macroscopic-grade-sieve` |
| `reversal-diagonal-cascade-sandbox` | 一个维度装不下的残差与同点异相碰撞逐级撑开线、面、体与时间，追问来路触发对角逃逸并借二次正交切出可达核 | `gram-overflow-cascade` `time-from-phase-collision` `arrival-diagonal-escape` `reversal-dual-cut` `concept-obstruction-cascade` |
| `trihedron-rigidity-truss-sandbox` | 新旧概念两两可比织成全连通桁架：四连杆可晃而正四面体静定锁死三维，五点以上的冗余边化作雷吉铰链角亏与时序翻转 | `complete-graph-triangulation` `downward-irreducibility-lock` `floppy-c4-vs-rigid-k4` `maxwell-laman-polynomial` `regge-curvature-glow` |
| `quantum-arc-macro-integral-sandbox` | 微观量子步是带二阶矢高与双覆叠的极小圆弧微分元，万千圆弧经驻相相消与桶内捏合积分为惯性直线、力场轨道与热熵 | `arc-sagitta-ito` `quantum-three-hallmarks` `curve-stitches-straight` `force-from-phase-gradient` `calculus-duality-zoom` |
| `triadic-arc-field-loop-sandbox` | 同一枚极小圆弧按一、二、三阶展开成线粒子、面波与体场，体场的驻相与傅里叶聚焦又反过来生出定域粒子 | `arc-seed-triad` `line-particle-worldline` `surface-wave-sagitta` `volume-field-condensation` `reversal-field-to-particle` |
| `octave-point-volume-field-sandbox` | 三维外代数的 1—3—3—1 回文与霍奇对偶把本层闭合体积归零为下一层的点，格林互逆与紫外穿衣让粒子与场互为表里 | `pascal-hodge-1331` `octave-helix-zoom` `green-yukawa-reciprocity` `dressed-uv-cutoff` `position-momentum-duality` |
| `lorentz-pseudoscalar-sm-octave-sandbox` | 三维体积伪标量平方给出洛伦兹负号与固有时驻波预算，标准模型 1—2—3 规范群、色禁闭与汤川核力沿八度跨层接力 | `pseudoscalar-minus-sign` `proper-time-budget-cone` `sm-123-gauge-grades` `color-confinement-baryon` `pion-yukawa-octave-handoff` |
| `quantum-gate-cosmic-tower-sandbox` | 非对易单比特门换位与双比特纠缠门直接张开极小圆弧体，按 1—3—3—1 四拍语法贯通六层概念塔并经 4π 莫比乌斯带归零 | `gate-commutator-trihedron` `entangling-segre-escape` `octave-1331-grammar` `six-tier-cosmic-tower` `mobius-ouroboros-closure` |
| `coset-breaking-conservation-tower-sandbox` | 对称破缺与诺特守恒共分同一笔勾股比较预算，戈德斯通流经希格斯 2 + 1 = 3 或 Skyrmion 拓扑缠绕闭合成体并串起五塔接力 | `pythagorean-coset-ledger` `goldstone-vs-higgs-closure` `skyrmion-baryon-winding` `superconductor-crystal-meissner` `five-family-cascade-relay` |
| `uncompleted-horizon-sandbox` | 每写入一条平权查表答案就撑开一块新弧面体与更多未比对的边，满射目录的对角槽劈开分离亏损，把完成态推成永不合拢的滚动地平线 | `bootstrap-ledger` `lawvere-godel` `ordinal-spiral` `bidirectional-parallax` `frozen-omniscience` |
| `stereographic-relativization-sandbox` | 向北极盲点靠近的有限微弧在球极平面上被拉成球外有球的发散螺旋，旋转神谕切面在折叠与追逐之间切换，两枚标签在原点双双放下 | `blindspot-divergence` `compact-homotopy` `oracle-collapse` `oracle-chase` `tetralemma-rest` |
| `bounded-horizon-thermodynamics-sandbox` | 视界切断几条嵌套纠缠弧就生出多少切口熵，全看见与零纠缠都归零，模流绕切口转出有效温度并在冻石与热寂之间显出余弦不动点稳态 | `omniscient-zero` `isolated-zeno` `horizon-page-curve` `modular-unruh-heat` `dottie-living-steady` |
| `gram-window-consensus-sandbox` | 每多记一条历史记录就多加一顶相干球冠把可行走廊越收越窄直至锁死，遗忘最旧记录重开走廊，两人同步遗忘才修复共享共识 | `schur-cap-corridor` `golden-triangle-m3` `overconstrained-lock-m9` `forgetting-reopen` `dual-window-consensus` |
| `roundtrip-born-imaginary-blindspot-sandbox` | 单程投影只给影子 cos θ，往返回到自身轴 I 才读出玻恩回声 cos²θ；垂直于 I 的盲平面在 I 上恒读 0，转进盲区的那一下就是虚数 i | `radar-roundtrip-born` `azimuth-cone-blindspot` `observer-first-person-90` `imaginary-double-turn` `schrodinger-arc-engine` |
| `prelude-dimensions` | 影子少一维，同一个位置可以藏着不同的运动 | `head-on` `shadow` `compare` `latitude` `normal` `average` `cosine` |
| `scattering-temporal-bridge` | 势垒内两支指数解共同输运守恒流；时间路径完全相消需要等幅、反相与不可分辨 | `barrier` `opaque` `cancel` `marked` |
| `zeta-spectrum-lab` | 有限相量、对称零点模型与有限零点谱各有边界，不能由一张图跨到黎曼猜想 | `domain` `partial` `quartet` `powers` |
| `arithmetic-schur-lab` | 同一整除网络上，精确消元保住终端块，顺序改变填充；带号轨道另有支撑与相对信号范数的必要预算 | `natural` `leaf` `drop` `square` `budget` |
| `trihedron-chord-pivot-tunneling-sandbox` | 极小圆弧体里走平直内割弦比外凸顶盖弧与两面正交侧壁都短，每 k 个边界点凝成一颗枢轴向球肚逐层下沉 | `walls-dijkstra-tax` `cap-wavefront-relax` `flat-chord-tunnel` `holographic-pivot-cone` `resonant-pivot-relay` |
| `imaginary-chord-temporal-double-slit-sandbox` | 势垒里动量转过 90° 潜入虚平面 i 化作不绕圈的内割弦，两道阿秒时间快门让同一颗电子在能谱上与自己干涉 | `classical-real-wall` `ninety-deg-imaginary-chord` `temporal-double-slit-comb` `attosecond-tunnel-self-interference` `zeno-midway-probe-collapse` |
| `riemann-prime-arc-path-integral-sandbox` | 每个整数 n 是一支抬到作用量 ln n 高度的复合路径箭头，临界线零点处延拓竖轴穿过原点 O 且地上正逆双壳两两重合，韦伊显式对偶把前 50 对零点驻波叠成素数阶梯 | `euler-dirichlet-phasor-spiral` `critical-zero-cancellation` `off-line-shell-imbalance` `weil-explicit-prime-staircase` |
| `arithmetic-pivot-resonant-tunneling-sandbox` | 复平面临界带地形对比一维硬截断 M = 19 图兰越界零点、单级磨光器 θ = 4/7 色散墙与分块舒尔补枢轴及多级凯莱反复平方中继 | `turan-zeno-hard-cutoff` `mollifier-four-sevenths-wall` `block-schur-pivot-mera` `fabry-perot-rogue-explosion` |
| `hilbert-concept-ledger-3d-cap-sandbox` | 混编 15 维空间展开五颗三维概念球；局域账本的 6 个数看不见 9 个相关；霍奇星号只在 d = 3 把旋度送到一根轴；无穷模塔在 ε<sub>self</sub> 处停机 | `hypercube-illusion-unfold` `space-color-joint-ledger` `motion-rot-scale-trans-triad` `hodge-curl-field-cap-3d` `unhalted-infinity-truncation` |
| `af-gut-arc-field-unification-sandbox` | 四种力是同一枚 ΔT<sub>ε</sub> 原胞外的四片圆弧壳；单圈跑动在 log<sub>10</sub>(μ<sub>12</sub>/GeV) = 13.0060 处给 sin²θ<sub>W</sub> = 3/8，N<sub>c</sub> = 3 是两条曲线唯一的交点，账本连续收成单胞 | `concentric-four-field-monad` `weinberg-angle-rg-running` `higgs-cross-concept-zitterbewegung` `einstein-pythagorean-clock-balance` `afgut-ledger-split-vs-unify` |
| `arc-body-calculus-sandbox` | 每一步都是模长为 1 的极小圆弧旋子：切弦在横向、矢高在轴向，竖直处斜率爆掉而旋子照转，复步不相减，粗糙度降到 1/2 时矢高总和锁到 ½σ₀²T，有限网格上内棱正反相消使斯托克斯一步不差 | `osculating-rotor-vs-tangent` `blind-zone-complex-step` `roughness-ito-phase-transition` `finite-mesh-stokes-cancellation` `coboundary-d2-zero-closed-shell` |
| `self-reference-pentad-sandbox` | 同一个不动点方程 x* = F(x*) 横跨查表路径压缩、余弦实虚等长蛛网、本征相位与收缩信道、15 → 1 门蒸馏三次方提纯及对角翻转逃逸 | `pointer-path-compression` `dottie-real-imag-spiral` `eigenstate-channel-anchor` `fifteen-to-one-gate-distill` `lawvere-diagonal-escape` |
| `self-halting-spectral-time-river-sandbox` | 自定精度帽让余弦迭代有限步停机，帽下余项转 90° 折入时间长河逐拍浮出，幂迭代与换基瑞利权重重排主次并借频闪检查留住主干 | `precision-agency-window` `time-river-orthogonal-fold` `power-iteration-spectral-sort` `basis-rayleigh-attention` `zeno-basis-sculpting` |
| `universal-clock-gravity-dilation-sandbox` | 全宇宙同转一枚主频飞轮 ν₀，光锥锁定有限拍精度下界，空间跳址与全息质量纠缠按勾股预算分流固有时帧率并在视界处饱和 | `light-cone-precision-floor` `kinematic-address-split` `holographic-mass-load` `equivalence-dual-flywheel` `horizon-saturation-lock` |
| `unified-arc-forces-planck-sandbox` | 同一枚极小圆弧体胞内按 1—2—3 维展开电磁盲面相位、弱双覆叠汤川壳与强色三轴通量管，胞间雷吉角亏与钟载折射引力在普朗克能标退回单胞会师 | `u1-blind-phase-fiber` `su2-chiral-double-cover` `su3-color-flux-confinement` `regge-gravity-clock-refraction` `planck-scale-convergence` |

### 各页面的依据分层、用语与分工

`scattering-temporal-bridge`（`SCATTER//TIME`）承接 §34.19.5，区别于此前的有限维盲区示意：主舞台直接绘制有限实势垒匹配解的三维复波函数曲线，以及能量—复振幅时间双缝曲线。青色、品红分别给第一支与第二支，紫色给合成轨迹和坐标轴，琥珀只给当前点与拖动手柄。`barrier` 与 `opaque` 保留垒内增长、衰减两支，显示相同的净流；`cancel` 是等幅、反相、标记重叠为一的单能量相消，`marked` 将重叠降至零，相对谱强度回到非相干基线一。相对强度不作为全能量归一的概率密度。匹配、流、谱强度标 `NUM`，实验文献与协议边界标 `ARGUED`，隐藏空间转身标 `MODEL`；无绿色依据框。

`zeta-spectrum-lab`（`ZETA//SPECTRUM`）承接 §22.4.1，与 `critical-mirror` 的冻结对称事实分工：本页的 `domain`、`partial` 直接计算有限狄利克雷相量，`quartet` 是可移动根的合成四次多项式模型，`powers` 将精确素数幂阶梯与十个临界线零点共轭对组成的有限谱并置。青色给有限部分和、精确阶梯，品红给有限谱，紫色给坐标轴，琥珀只给当前采样点与手柄。绝对收敛域、解析延拓与有限求和不混同；有限零点数据不承担完整性或遗漏误差证书。数值标 `NUM`，四元组模型标 `MODEL`，经典公式的适用条件标 `ARGUED`，有限谱外推桥梁标 `OPEN`；无绿色依据框。

`arithmetic-schur-lab`（`ARITH//SCHUR`）承接 §34.18.5，在顶点 2 至 N 的实际整除图上计算 G = L + I/4，区别于前页的抽象格拉姆窗口。三维坐标由 2、3 的素因子赋值与剩余因子对数决定；青色是原始边，品红是消元填充或多步耦合，紫色是坐标轴，琥珀只给当前枢轴与手柄。`natural`、`leaf` 对同一终端集比较顺序，`drop` 明示丢弃量及原系统回代残差，`square` 同时报告 P 的平方层数、次数、乘加与存储。此整除图是模型，不等同 NBB 目标向量的真实 Gram 表。`budget` 切换到独立的三维 (R, |η|, B) 舞台，采用 η = 1/2 − β、B = L/|a|、e = ε|a|，紫色面是 B_min = (1 − ε)/(min(1, R|t|) sinh(R|η|)) 的必要下界，品红区域被此界排除，琥珀点可直接拖动；未排除区域不认证插值存在。该书面推导来自上游未合入的应用，不由既有冻结声明认证；不把卷积深度、通道数、图规模与图平方层数混同。运算标 `NUM`，模型标 `MODEL`，舒尔代数与文献边界标 `ARGUED`，真实算术 Gram 压缩及极限残差桥梁标 `OPEN`；无绿色依据框。


`pythagoras-number-escape` 的“模 p 数点”场景按勒让德符号着色：舞台格子里 y ≠ 0 的点（成对 ±y，所在列 χₚ(f(x)) = +1）是青色，y = 0 的分支点是中性色（`sigma`）；右上的自旋环把 x = 0 … p − 1 排成一圈，青色 +1、品红 −1、中性 0，环心写 Σχ 与 p + 1 + Σχ = #E；琥珀只给弗罗贝尼乌斯余弦的指针，绿色不用。下方小图的柱子按 aₚ 的正负着青/品红。y² = x³ − x + 1 的判别式是 −368 = −2⁴·23：p = 23 时页面弹出坏约化提示、圈出奇点 (13, 0)，不给余弦与哈塞界，直方图只用良约化素数（428 个，p < 3000）。“线与面素数”场景区分两种角：格点 (a, b) 的方向角 θ 是希尔伯特夹角（cos²θ + sin²θ = 1），平方后的三角形转过布洛赫极角 2θ；第三章的 `complementary_context_probability_pythagoras` 在第二十九章与终章只以行内链接出现，所以页面只在抽屉里指向第三章，不标绿。`count` 卡的图注写环上的 2 个 +1、8 个 −1、3 个 0。读数里点数与 p + 1 之差一律写 aₚ，不写 a（第二十九章正文的 a 是高斯三角形的边）。d = 5 时舞台上 m² − 5n² = ±4 的两条虚线与 (Fₖ, Lₖ) 圈都用中性灰：第二十三章只以行内链接提到 `pell_pm_four_iff_signed_lucas_fib`，所以佩尔场景只用一段说明写明它在 trureturing 中已冻结、正文未以定理环境引用，不标绿；`sato` 卡把 3000 以内良约化素数的 cos θₚ 直方图（紫）与半圆律（琥珀虚线）放到舞台右侧，𝔽₅₃ 的点阵缩到左侧，自旋环与半圆表盘不画。

`navier-stokes-p-np`、`eth-horizon-crossover`、`spatial-attractor-deja-vu`、`golden-cut-observer` 四个页面的依据分层要写在页面与图注里：第三十章转述的 2026 年预印本只作为该章的转述出现，页面上的曲线与涡管是示意模型（`MODEL`）；菱形三十面体与“帝国”是文献结果（`ARGUED`）；灵魂、遗迹、似曾相识是诠释模型（`MODEL`）；只有带 Lean 链接的绿色框是已验证定理。`eth-horizon-crossover` 的桥图场景里品红是最小的那道割，青色是流矩阵的正项与非零奇异值，灰色的格子是流矩阵的负项，白色竖线标出秩的位置；模态场景里琥珀色是阈值 τ 与过线柱子上 τ 高度的刻线，品红是墙 RW/(πτ)；`geometric` 卡用第十二章例题第 5 步的几何谱 λⱼ = 2^−(j+1)。`spatial-attractor-deja-vu` 不引用任何 Lean 定理：重返（两轮各一次经过、两点相距 ‖x₁(t<sub>a</sub>) − x₂(t<sub>b</sub>)‖ < ε）处单位切向的内积 cos δθ = v̂₁·v̂₂ 标 `NUM` 与 `MODEL`，舞台上画成青色与品红的两支箭头；Tucker 的奇异吸引子定理与卡普兰—约克公式标 `ARGUED`；两个非零平衡点 C₊、C₋ 的 x、y 同号（ρ = 28 时是不稳定的鞍焦点），画成中性色空心圈；ρ = 14 时两点都稳定，同样的参数下每一轮落进哪一个由起点所在的吸引域决定（`fixed` 卡的两轮落进相反的两点），标签写“稳定点 C₊/C₋”、按落进它的那一轮着青色或品红，点在窄屏画布边外时标签收进画布并带箭头指向它；页面自己的数值核对不用绿色 ✓。`forget` 的说明条第二行是两轮到此刻为止高过 C₊、C₋（z > ρ − 1）的时间比例与两轮此刻的距离（`NUM`）：讲“忘掉的是起点，留下的是比例”；`return` 在右下角开一个放大 4 倍的小窗，画遗迹邻域、两段弧与两支长的单位切向，说明条给出 δθ 与 cos δθ。`golden-cut-observer` 的场景“缝”画旋转的前 N 个点在长为 1 的圆周上切出的弧，按长度分类上色（最短青、中间紫、最长品红，琥珀只给最新的点），绿色框只给终章用 `lean=` 引用的三距离定理与黄金赫尔维茨界，“每段弧长于 1/(√5 N)”是正文的手工推导（`ARGUED`），各个 N 的读数标 `NUM`；Delone 集定理在终章只以行内链接出现，页面上写成不带颜色的说明。`spatial-attractor-deja-vu` 用 `kit.solid` 把轨道画成受光的管、随流收缩的立方体面画成实体薄片，遗迹邻域是玻璃球，重返放大窗仍是二维；`golden-cut-observer` 只在窗口场景用 `kit.solid` 画切开朝前几面的菱形三十面体与内部的玻璃余量球，其余场景仍画二维格点与圆周。

`repeated-projection` 的箭头是布洛赫矢量，页面分两种操作。“投一次”是沿测量线的未读测量 $P_+\rho P_+ + P_-\rho P_-$，箭头落到线上的影子、缩进球内；“一投等于投到线上的影子”是页面的数值核对（`NUM`）。`chain` 卡与“中间片数 N”滑块是第三章偏振片例题的选择性条件更新：读出结果、只留通过的一支（$0^\circ$ 与 $90^\circ$ 偏振片在布洛赫球上是同一条线的两端，中间片把这段经线等分），态每跳一次留在球皮上，代价记在相乘的权重里，青色竖条是累计权重；$N \to \infty$ 的极限是文献结果，页面不画。绿色框只给本章引用的五条定理：捏合幂等、不动点判据、互补勾股、条件态合法、有序外积链之迹。整页（不带 `preset`）打开在刚投一次的那一帧。

`bloch-noise` 的绿色框只引用第四章正文已用 `lean=` 引用的定理；三种噪声的布洛赫仿射形式与 $T = \frac{1}{2}\lVert\vv{r} - \vv{s}\rVert$ 按该章例题标 `ARGUED`；时间轴上两个整数步之间取相邻整数步输出的凸组合、相位阻尼卡把横向剩余读成 $\cos\theta_{\mathrm{env}}$ 标 `MODEL`。`shorten` 卡换成另一个场景：时间轴是环境两条记录的夹角 $\theta_{\mathrm{env}}$（$0^\circ \to 90^\circ$），右下角画两条记录与青色的影子 $\cos\theta_{\mathrm{env}}$，局部箭头由 $a\lvert 0\rangle\lvert e_0\rangle + b\lvert 1\rangle\lvert e_1\rangle$ 求偏迹直接算出（`NUM`，第 4.1 节的手算），不标绿。`pinch` 卡用品红画出两个起点被压掉的横向一段（其平方带着相干质量）。`wide` 卡里的映射不是信道：舞台标题写明“固定北极的仿射映射（不是信道）”，不叫振幅阻尼，也不标两态距离，页面只说它刺穿球皮；`pinch` 卡（相位阻尼强度取 1）的标题是“捏合”。只有不是信道的映射（`wide`，λ² > a）用 `kit.solid` 画：单位球是玻璃球壳，像是受光的不透明实体，球里的部分青色、刺出的一块品红，它与球壳的交线是一圈白色细线，`wide` 卡把镜头放低（俯仰 0.12）让品红一块从侧面露出、下一张卡还回原来的镜头；其余六张卡与自由探索里的信道仍是线框画法，静态图与主干逐字节相同。

`double-slit-marker` 的绿色框只给纯态标记的 $D^2 + V^2 = 1$（`pure_record_distinguishability_coherence_complementarity`）与捏合去掉的相干质量（`pinching_discarded_coherence_mass`）；混合标记落在圆内用迹距离可辨度，是 Englert 不等式（`ARGUED`）；屏上的高斯包络、二维实向量标记与两种读法是示意模型（`MODEL`）。这一页的青色是条纹对比度 $V$（影子）与擦除后分拣出的两行，品红是路径可辨度 $D$（高）与按路径分拣出的两行。

`erasure-ledger` 的账本按第八章的分层标注：捏合的熵增等于 D、双账本 ln 2、兰道尔账目恒等式及其取等/严格判据、受控拷贝的可撤回与约化态重合是绿色；阶段 B 的热量换算（兰道尔原理、Reeb–Wolf 两条平衡式）是文献结果（`ARGUED`）；“理想复位”把 I = D = 0 当作理想极限记账，是示意模型（`MODEL`）；单比特热浴交换的各项都实算（`NUM`），并与第八章的数值表逐行一致。账本两栏用中性灰（不占用青、品红），品红只给箭头横着的那一份（相干）。`copy` 另画灰色虚线的 σ（对角与 ρ 相同、相干相反），拷贝后两支箭头在局部重合。`dpi`（“两个态”一幕）把 ρ = |0⟩（琥珀）与 σ = |+⟩（灰色虚线）送进同一串去极化 λ = 0.5、绕 y 转 0.7 弧度、Z 基捏合、再去极化两次，右边每步一根中性灰的 D(ρ ‖ σ) 柱；绿色框给 `extended_quantum_relative_entropy_channel_dpi`，转动不变与反复作用不回升是第八章的手工推论（`NUM` 框里写明）。

`speed-limit-zeno` 的速度线与墙上的 MT、ML 刻度按 Mandelstam–Tamm、Margolus–Levitin 公式画出，芝诺冻结的极限是 Misra–Sudarshan 定理，三者都是文献结果（`ARGUED`）；“平均返回时间恒为 2”是第七章例子的手算与页面的数值核对（`NUM`）；绿色框只给第七章引用的两条定理：`record_time_lower_bound` 与 `monitored_return_conservation`。

`two-angle-addressing` 的琥珀色点是从北极出发的布洛赫方向，紫色是两根转轴 $a = \vv{e}_3$ 与 $b$（夹角 $\alpha$，$90^\circ$ 时 $b = \vv{e}_2$），白色小旗是转动带走的切向 $\vv{e}_1$，青色虚线圈是“绕 $b$ 转了 $j$ 次后离 $N$ 至多 $2j\alpha$”的界，寻址场景的球是玻璃球壳；覆盖场景的球是不透明的受光实体，45° 球冠是长在球面上的曲面片，青色是含当前点的颜色的球冠，灰色是其余球冠（冠心标号），露出来的品红是没有球冠盖住的地方。`trotter` 卡里琥珀色的锯齿是交替的小转动，白色的弧是目标转动带着 N 走的路，紫色的点是乘积 Pₙ 的转轴（空心的是其余几个 n）。绿色框只给第九章引用的四条定理（有限旋转字、Lie–Trotter 乘积公式、有理六轴覆盖、六色下界）；Lie–Trotter 乘积的转角、转轴与误差标 `NUM`；两角公式与欧拉分解标 `ARGUED`；斜轴的旋转字由页面按贪心规则当场构造、球面最小值由网格取样，都标 `NUM`，页面不声称是最短字。

`berry-loop` 的绿色框只给第十章用 `lean=` 引用的同纬度内积恒等式（`Latitude.latitude_dot`，赤道相邻两点的 $(1+i)/2$）；$\arg\Delta = \Omega/2$、贝里相位约定 $\gamma_B = -\Omega/2$、切向量平行移动转过所围面积（高斯—博内）与毛球定理按该章文献注记标 `ARGUED`；面积、转角与相位三个数各走一条路实算（`NUM`）。这一页的青色是回路（相邻两点的内积）与内积连乘的相位指针，品红是圈住的面积与箭头的转角，紫色是转轴与竖直轴上的零点。

`pulse-area-virtual-z` 的品红是“面积”的两面：左边包络下扫过的面积与右边球上同样大小的扇形；紫色是此刻的转轴（实验室系里是载频的 z 轴），青色是态在 z 轴上的影子 P(0)，白色虚线是对照的那条路（换序、电路字面、不失谐或同面积方波），失谐时两个终点之间的白色短弧标出差的角度；失谐时此刻的转轴画成淡色（包络两端它是竖直的），轴端走过的紫色虚线才是主角，标签写它离赤道最近处的倾角（窄舞台上缩成“轴端最低 12°”）。舞台上的白色虚线由页面按投影长度切段，轴端来回走的是同一段弧，紫色虚线按倾角切段（5° 实、3° 空），两趟的虚线才落在同一处。绿色框只给第十一章正文用 `lean=` 引用的本征态定态性（`energy_eigenstate_stationary`，抽屉里另有 `exp_mulVec_of_eigenvector` 与 `observer_pullback_trace_identity`）；面积律、旋转系消去载频、轴向共轭恒等式与虚拟 Z 调度按该章文献注记标 `ARGUED`；截断高斯与实验室系画法标 `MODEL`；失谐时的分段时序乘积标 `NUM`。`order` 卡只演示两个转动不对易，不代表该章三脉冲积分核误差界。

`parameter-shift` 的绿色框只给第十二章引用的 `projection_probability_flow`：虚线切线的斜率按它的对易子公式在 2 × 2 密度矩阵上算出；两点公式本身（参数位移律）是文献结果（`ARGUED`）；采样场景的每一发来自固定种子的伪随机数，散布与理论宽度是页面的数值（`NUM`）。这一页的青色是期望值曲线与 ±90° 两点（影子），品红是小步长差分。

`equator-concentration` 不引用任何 Lean 定理（第十二章引用的冻结定理与球面测度集中无关，正文强调它们相互独立）：E[x₁²] = 1/d、马尔可夫上界、x₁ 的密度 ∝ (1 − x²)^{(d−3)/2} 与贫瘠高原都是文献结果（`ARGUED`）；带内外的精确份额由不完全贝塔函数算出、舞台上的点是精确分布的分位数（`NUM`）。页面不画梯度。青色是赤道带里的点与带内密度，品红是带外的点与带外密度。`bound` 卡切到“份额与上界”场景：横轴 n = log₂ d、纵轴取对数，品红实线是带外的精确份额，品红虚线是马尔可夫上界，琥珀色的竖线是当前的 n。d ≥ 2⁹ 时鼓包薄得看不清，密度那一栏的右上角出现放大镜：纵轴换成 x₁√d、放大 √d 倍，带边 ±ε√d 落在窗外时用一行字写明。

`pairwise-shutter` 的青色是已知态 $A$、它那条直径上从 $-1$ 端到 $B$ 的垂足的一段（长度占直径的 $p$）、权重的虚线与“过”的方块；琥珀色是目标态 $B$ 与当前的比例；细曲线（墨色）是数出来的比例 $k/N$；紫色只在 `turn` 卡里出现，是两支共用的转轴；`turn` 卡的灰色虚线箭头是出发时的那一对（它的静态图停在转过 $306^\circ$ 处，与出发时分得开）。绿色框只给第二章用 `lean=` 引用的两条定理：`born_probability_skeleton`（过与不过两份权重非负、相加为 1）与 `rank_one_born_pairing_weight`（$\lvert\langle\phi\mid\psi\rangle\rvert^2 = \Tr(\rho P_k)$）；半角公式 $(1 + \cos\theta)/2$ 与随机方向上权重均匀是第二章例题的手算，页面三路数值核对标 `NUM`；快门计数是固定种子的抽样模型，比例趋向权重是大数定律（本书未形式化），浅色带 $p \pm 2\sqrt{p(1-p)/N}$ 只是参考尺度，一并标 `MODEL`。这一页不画布洛赫球上“影子长 $\cos\theta$”的读数，只画计数。

`chsh-dial` 的绿色框只引用第十三章正文用 `lean=` 引用的五条定理：经典上界（`classical_chsh_abs_le_two`，“隐方向”场景的 360 个等距隐方向、权重各 1/360 正是一个有限确定性纤维模型）、一侧可交换时 S² = 4I、四点谱、固定算子的 2√2 与幺正策略的贝尔值上界（取 d = 2 为手工推导）。贝尔态上的同平面关联 cos(夹角)、N = 4|sin α sin β| 与“转动 Bob 的一对方向，⟨S⟩ 最高恰为 √(4 + 4 sin α sin β)”是页面的数值（`NUM`）；均匀隐方向玩具模型与它的折线标 `MODEL`；一般隐变量测度下的 |S| ≤ 2 与无穷维 Tsirelson 界标 `ARGUED`。这一页的青色是四个余弦（量尺上一段段叠起来的四项、余弦弧）与给 +2 的隐方向，品红是两侧张开的面积、谱点 ±√(4 ± N)、弧与折线之差与给 −2 的隐方向；Alice 是实线箭头，Bob 是虚线箭头，时间轴转动 Bob 的一对方向 φ。

`syndrome-decoding` 的绿色框只给第十四章用 `lean=` 引用的两条：`orthogonal_syndrome_recovery`（解码(编码(σ, ρ)) = Tr(σ)·ρ）与 `pauli_word_mul`（泡利字乘法的交叉相位；“灯亮不亮看模 2 辛奇偶”是正文由它推出的读法，页面照此写明）。三比特码只纠一个 X、纠任意单比特错误要更大的码与 Knill–Laflamme 条件标 `ARGUED`；“量校验再查表翻回”的解码器与柱子在房间之间滑动的画法标 `MODEL`；振幅、综合征、解码后的 2 × 2 矩阵与重合度实算（`NUM`）。这一页的青色是振幅柱子与码空间那间房，品红是错误与亮起的校验，琥珀只给解码器这一步翻回的比特，虚线是原来的态。

`braiding` 的绿色框只给第十四章用 `lean=` 引用的 `crossing_yang_baxter`（任意架上的三股恒等式）与 `quandle_coloring_markov_invariant`（有限幂等架的闭合着色数在 Markov 等价下不变）；平面里双交换解不开而空间里能借第三方向解开（Bₙ 与 Sₙ）、Artin/Alexander/Markov 定理、σ₁³ 闭合成三叶结标 `ARGUED`；世界线画法（时间朝上，σ<sub>k</sub> 是从上往下看逆时针半圈、左边那股从前面过）标 `MODEL`；颜色传输与闭合着色数由穷举实算（`NUM`）。ℤ/3 的三个颜色在绳子上写成数字 0、1、2，不占用青、品红；世界线是中性墨色，琥珀只给此刻的时间平面与此刻的颜色，青色与品红只用在闭合弧上（颜色对上 / 对不上）。对照卡（`inverse` `twice` `yb` `stabilize` `trefoil` `rack`）右边那条编织的底端颜色取左边的，多一股时抄末位。世界线与闭合弧用 `kit.solid` 画成受光的实体管，前股遮住后股，还没走过的路保留虚线。

`walk-spreading` 的绿色框只给第十六章用 `lean=` 引用的对称硬币引理（`SymmetricCoinMaximalWalkEntanglement.result`，关于 2p 个模式上单激发 W 态的几何纠缠）；页面不计算这个纠缠量，只画分布。镜像对 (0, x)、(1, −x) 的概率之和与硬币无关、$c_*$ 把每一对均分，是正文证明梗概里的一步，页面上作数值核对（`NUM`）；线上 Hadamard 游走宽度按 n 线性增长、黏合树指数分离与一般图至多二次加速标 `ARGUED`。这一页的青色是量子游走的分布与宽度，灰色（中性）是经典随机游走，品红只给量子分布比镜像 P(−x) 多出的部分，琥珀只在“宽度”场景标当前步数。

`gate-word-polytope` 与 `sphere-escape` 的 `liuhui`、`zu` 分工：那两张讲平面里的割圆（多边形周长逼近圆、有理读数与 π 之间的缝），本页讲有限 {H, T} 门字从北极出发在布洛赫球面上的落点集 𝒮_L、凸包 P_L 与离目标的最近距离。绿色框只给第十六章用 `lean=` 引用的连续两轴有限字命题（`two_axis_finite_word`），并写明它是连续轴圆的对照、不涉及离散门集；可达点、最短门字、凸包、径向间隙 1 − h 与覆盖半径 ε_L 都是页面实算（`NUM`）；Solovay–Kitaev 渐近字长标 `ARGUED`，页面不拟合速率。这一页的青色是可达点与凸包，琥珀是目标方向（或最坏方向），品红是到最近点的弧、径向间隙与空球冠，紫色是 H 与 T 的转轴。舞台用 `kit.solid` 画玻璃布洛赫球壳与不透明的受光凸包，`shrink` 的阶梯图仍画在二维叠层上。

`grover-reflections` 的舞台是目标轴 $W$（竖）与失败轴 $B$（横）张成的平面：琥珀色是当前的态与当前这一步的柱子，青色是态在 $W$ 上的影子（成功振幅）与每一步的成功概率柱，品红是在 $B$ 上的影子，紫色是每一步转过的 $2\theta$；两面镜子（失败轴与 $\lvert s\rangle$ 那条线）用中性灰虚线。绿色框只给第十五章用 `lean=` 引用的 `uniform_operator_rotation`（页面取单列、$p = 1/N$）；查询下界 $\Omega(\sqrt{N})$ 标 `ARGUED`；镜像逐次作用、最佳步数逐个比较（只在第一个半圈 $(2n+1)\theta \le \pi$ 里比）标 `NUM`，两次镜像之间箭头尖沿垂线滑过镜面只是动画。

`phase-gears` 的舞台从上到下是一排相位齿轮（紫色，每只对应 $k$ 的一个二进制位，选中的频率用到的那几只亮着）、选中频率 $k$ 的相位箭头链（青色箭头，墨色合成箭头）、寄存器里的周期梳子（青色格，琥珀色框是扫到的格）与频率谱（青色柱，琥珀色框是选中的 $k$，品红小三角在 $sQ/r$）。绿色框只给第十五章用 `lean=` 引用的 `sum_annihilator_character`：$r \mid Q$、起点为 $0$ 时梳子是 $Q/r$ 的倍数所成子群的零化子，链上的和就是这条命题的和；QFT 的二进制乘积分解（齿轮）、$r \nmid Q$ 时的狄利克雷核集中与连分数读阶标 `ARGUED`；谱由直接求和算出标 `NUM`。页面的“读出阶”取分母不超过 $\sqrt{Q}$ 的最后一个渐近分数。

`rapidity-lightcone` 的舞台是时空图本身（横轴 x、竖轴 t、两轴等比）。白色（墨色）是光锥、零向量与光锥上的珠子，也是“世界线”场景里的静止世界线（粗线）与因果菱形；青色是闵可夫斯基一侧：双曲线 t² − x² = 常数、被推动的点、经 A 的折线与它的固有时刻度；品红只在“对照”场景里出现，是欧氏转动走的圆 t² + x² = 34；琥珀只给当前事件（Bv，即 v 在旅行者坐标里的读数）、以快度 η 运动的旅行者的两根轴 t′、x′（η = ln 2 时 t′ 轴穿过 v = (5, 3)，与第十七章总览图第 II 栏、视频 `boost` 段同一倒向）与 t′ 轴上的单位刻度、空间位移 (0, w) 与折返点 A；`cone` 卡的空心淡白珠子是 η = −0.6 与 0 时珠子的位置。绿色框只给第十七章用 `lean=` 引用的三条：`bogoliubov_norm_conservation`（推动保持 t² − x² 由它一步代数得出，页面照此写明）、`null_cone_spatial_rigidity`（卡尺场景）、`eq_smul_minkowski_of_null`（比例场景，取 S(v) = minkowski(kBv)）；把 B(η) 读作速度 β = tanh η 的洛伦兹推动、Δτ ≤ Δt 与零线上 Δτ = 0 按该章文献注记标 `ARGUED`；推动、转动、珠子与各段固有时实算（`NUM`）。路线图候选里的“两次变换快度相加”与“同时线倾斜”正文没有对应的句子，未做成卡。

`lattice-gauge-loop` 的绿色框只给第十八章用 `lean=` 引用的两条：`selected_tree_transport`（树输运相位的根点归一、树边重建、端点规范协变）与 `anchored_phase_classification`（锚定规范下 χ 不变、χ 相同当且仅当规范等价、c + a = m + k − n）；边相位、回路相位、树输运相位与计数实算（`NUM`），“沿树拧平”取 g = rootPhase⁻¹、弦的回路相位等于所围方格之积也是数值核对；格子画法、边的方向、生成树（全部横边加最左一列）与时间轴上的中间路径 e^{isθ} 标 `MODEL`；回路相位读作磁通、连续极限与非阿贝尔威尔逊圈标 `ARGUED`。单格的边方向与生成树照例题 `ex-plaquette-phase`（0 → 1 → 2 → 3 → 0，T = {e₀, e₁, e₂}）。这一页的青色是生成树、根到锚点的树路径与它的相位，品红是方格与弦的回路相位，紫色是顶点规范，琥珀只给此刻在拧的顶点或边；边上的相位指针是中性墨色。`two` 卡改的是边相位本身，不是规范变换，页面读数里写明，说明行分列左格、右格、外圈各变了多少度。每个表盘上淡白（回路为淡品红、锚点路径为淡青）的弧是它的指针从 s = 0 起扫过的角度，满一圈画成整环；规范变换下只有边表盘有弧，静帧也看得出“边在转、回路不动”。标题里的回路相位都是四分之一圈时写 1、i、−1、−i，否则全部写度数。

`layered-network-cut` 与 `eth-horizon-crossover` 的 `bridge`、`narrow` 分工：那两张讲宽度三桥图的单次抽样流矩阵与四道割（冻结三项 `QMinCut`，另有手工推导的 `3bd` 割），本页讲 32 格开边界二元 MERA 式层级网络里，把底边一段区间切下来要割断几条键。舞台上的网络是示意模型（`MODEL`）；最小割由增广路实算，527 段区间都不超过 $2\log_2 L + 1$（`NUM`）；“跨割的秩 ≤ χᵏ”在一般网络上、RT 公式与 Swingle 的 MERA 类比标 `ARGUED`；绿色框只给第十九章用 `lean=` 引用的 `QMaxFlow_le_QMinCut`，并写明层级网络不在它的范围内。这一页的琥珀是选中的区间 A、B，品红是最小割断的键（带短横），青色是割内侧的张量与键，其余的键是中性灰。

`complexity-growth` 有两个场景。“增长”是 8 个量子比特、固定种子哈尔随机两比特门的砖墙电路：半链熵（青色）由 16 × 16 约化密度矩阵的本征值逐层实算、门数与跨割门数按门表数出（`NUM`）；熵不超过 4 比特与每道跨割门至多加 2 比特（灰色台阶）、exp(O(N)) 复杂度天花板与热化后预期线性增长按第二十章文献注记标 `ARGUED`；品红的“预期复杂度” min(门数, 2^N) 与天花板的常数是示意模型（`MODEL`；`saturate` 卡停在第 14 层：熵在第 13、14 层都是 3.14 比特，淡色的后段第 40–90 层才在 3.18–3.36 比特之间起伏，说明里三件事分开写），页面不声称算出了复杂度；把品红上升段读成体积的 CV 标 `OPEN`（舞台上的红字与依据框用同一个 `--warn`）。“深度”是第二十章的开放边界链：青色的砖是 N + 1 道门按最早可放的层排好，品红三角是折返点 S，白线是 minDepth(N, κ)，灰色虚线是旧公式；`floor` 卡的静帧用灰色虚线框与淡品红三角叠出起点 {2, 3} 的 9 层；绿色框只给本章用 `lean=` 引用的 `OpenIntegrableCircuitMinDepth.result` 与 `OpenIntegrableCircuitDepthRefutation.result`，CNOT 下界与偶圈长度不上页面。路线图候选“最小深度的下界”做成 `floor`，“增长停在哪里是开放的”改为 `ceiling`（天花板是文献结果）与 `cv`（开放的是 CV 读法），并按正文的两个反例加了 `eight` 与 `eleven`。

`norm-lattice` 与 `pythagoras-number-escape` 的 `hippasus`、`locked` 分工：那几张讲渐近分数逼近 √d 与 ±1 的接缝，本页讲整数格与范数等值线：艾森斯坦格画在复平面 x + y·e^{iπ/3}，换成整数坐标 (P, Q) = (x + (t + 1)y, y) 读出 Qform(t, ·, ·)；黄金整数画在 (g, ḡ) 平面，范数是矩形面积。绿色框只给第二十三章用 `lean=` 引用的四条定理（`Qform_eq_eisNorm`、`Qform_discriminant`、`Qform_range_eq_eisNorm`、`pell_form_eq_four_mul_norm`）；正文以行内链接提到的 `pell_pm_four_iff_signed_lucas_fib` 不在页面上标绿，`units` 卡只展示 φᵏ 的 (2a + b, b) = (Lₖ, Fₖ) 与范数 (−1)ᵏ（`NUM`），不声称它们是全部解。格子面积 √3/2、系数是基矢的内积、判别式 = −4 × 面积²、“取到的值”逐点代入都标 `NUM`；非整数 t 的中间帧、两种坐标之间的过渡与两次乘 φ 之间的滑动标 `MODEL`；`skew` 卡在整数坐标的斜椭圆之外，用淡色点与青色虚线圆画出同一批格点在复平面里的位置，细线连起每个格点的两处位置（(8, 3) 连到 (−1, 3)）；`range` 卡的静态图停在 t = 1，细线（走过的路）与值域条是主角，与 `skew`（t = 2）不是同一画面；四元数范数在 ℚ 中定义 ℤ 标 `ARGUED`。这一页的青色是当前点所在的那条范数等值线及其上的格点、黄金场景里迹的对角线与影子，品红是格子（面积）与黄金范数的矩形和它那一级的双曲线，琥珀只给当前的点与正在滑动的基矢 u₂，其余等值线是中性灰（虚线上没有格点）。

`euler-product-sieve` 与 `sphere-escape` 的 `thirteen` 分工：那两张讲“乘起来加一”找到清单外的素数，本页讲有限个素数的欧拉乘积怎样逼近 ζ(s) 以及筛的余项。舞台上方是实轴 1 < s ≤ 4 上墨色的 ζ(s)、青色的前 K 个素数的乘积与其间品红的缺口（纵轴按“值 − 1”取对数，刻度写值本身），品红虚线是乘积加上下一个素数的 p⁻ˢ，右边的放大镜把当前 s 处的缺口按品红格的 n⁻ˢ 自下而上拆开；下方是整数 1 到 96，青色在乘积的展开里，品红带着清单外的素因子；琥珀只给当前的 s 与刚加进的素数的格子。绿色框只给第二十二章用 `lean=` 引用的三条：`riemann_zeta_euler_product`、`riemann_zeta_dirichlet_sum_eq_euler_product` 与 `riemann_zeta_residue_one`（Lean 对复数 s 陈述，页面只取实数 s）；余项等于最大素因子大于 p<sub>K</sub> 的整数之和、在实数 s > 1 上大于 p<sub>K+1</sub>⁻ˢ 与 ζ(2) = π²/6 按该章例题标 `ARGUED`；ζ(s)、乘积、放大镜各段与“差不到 1% 要几个素数”实算（`NUM`）；黎曼猜想只在抽屉里标 `OPEN`，页面不画临界带。路线图候选里的“只用 2”“用到 5”“用到 31”“s 越靠近 1 需要的素数越多”“筛的余项”依次做成 `two`、`five`、`thirtyone`、`near`；“筛的余项”并进 `five`（静态图停在 s = 2，点这张卡时琥珀色竖线从 s = 4 扫到 1.3，垫底的始终是 7⁻ˢ），另加 `all`（到 97 格子全青，停在 s = 1.2，缺口 1.23 仍占 ζ 的五分之一以上，与静态图 `ch22-euler-staircase` 的 s = 2 不是同一个数）配推论 `cor-dirichlet-sum-eq-euler-product`。

`blade-multiplication` 的舞台左边是乘法表（8 块刀片、4 个泡利字或向量自乘的 3 × 3 九项），右边把选中的一格拆开：上方三行是左、右掩码与异或（两边都有的位画青色叉），下方一行一步，右因子逐个向左越过较大的左因子，每次交换画成两条交叉的品红线，排好后同号一对汇成青色的 +1；琥珀只给当前一格与当前这一步，紫色只在 `pseudo` 卡里框出 I₃ 的一行与一列（体积）。三维刀片的位运算规则本章没有冻结成 Lean 定理：8 × 8 表与逐步排序标 `NUM`（逐格与泡利矩阵乘积核对），排序的画法标 `MODEL`，Cl(3,0) ≅ M₂(ℂ) 与 Gottesman–Knill 标 `ARGUED`；绿色框只给本章用 `lean=` 引用的定理：泡利字场景的 `displacement_mul`、`qubit_weyl_star`（`displacement_two_anticommute` 在声明地图里），向量场景的 `B_formula_core`（B(3, 4, 12)² = 169·I 的乘法本身是 `NUM`）。抽屉里的“声明地图”列出第二十五章 `lean=` 引用的全部 9 条冻结定理，测试按章节文件与锁文件核对条目数与链接。路线图候选的 e₁e₂、e₂e₁ 变号、e₁₂e₁₂ = −1、伪标量、泡利字依次做成 `e2e1`（同时交代 e₁ · e₂ 不交换、表里那一格是青色）、`square`、`pseudo`、`pauli`，另按例 `ex-xor-pauli-table` 第 3 条加了 `vector`。

`zyz-compile` 与 `qubit-geometry` 的 `hadamard`、`turn2` 及 `two-angle-addressing` 的 `address` 分工：那几张讲 H 门绕对角轴的 180°、旋子转两整圈变号、从北极出发的两角寻址，本页讲第二十六章的正向编译：三段 R_z(α) R_y(β) R_z(γ)（γ 先作用）在八个刀片掩码上按异或乘成一枚旋子，并用夹心积转动箭头与整个三脚架。舞台上琥珀是当前的箭头 v，紫色是固定的 z、y 转轴（这一段加粗）与旋子自己的转轴 n（虚线），青色是 v 在这一段转轴上的影子（不动），品红是 v⊥ 绕轴扫过的扇形（虚线分成左右两个半角），白色是三脚架 Re₁、Re₂、Re₃ 与走过的路。第二十六章用 `lean=` 引用的四条冻结定理都在状态一侧（`blochMatrix_trace`、`bloch_blochMatrix`、`bloch_geometry_of_isHermitian`、`norm_bloch_le_trace_of_posSemidef`），页面只在箭头的纯态 ρ = blochMatrix(1, v) 上标绿并当场核对，抽屉里的声明地图恰是这四条；旋子编译本身没有冻结定理，乘积、三列、转轴与转角标 `NUM`；任意 U(2) 的 ZYZ 分解、Spin(3) → SO(3) 二对一与“单位旋子即一次绕轴转动”按该章文献注记标 `ARGUED`。路线图候选“X 门”正文没有对应的句子，未做；“任意轴”做成 `fold`（单一转轴），T 门 (π/4, 0, 0) 只是绕 z 的一段转动，与 `sandwich` 同一种画面，不单列卡，由 `h` 的说明交代一句，“夹心作用”做成 `sandwich`，另加 `chain`（例题的三元组 (0.37, −0.81, 0.52)）。

`fixed-point-convergence` 讲“怎样收束、收得多快”；第二十四章的余弦蛛网全部用这一页（`far` 从 x₀ = 3 出发、看全程，第一步落进 [−1, 1]），`sphere-escape` 的余弦场景只留在它的完整实验室里，不再被章节按卡引用。舞台是蛛网图（曲线 y = f(x) 与直线 y = x），“跟着放大”时以不动点为原点重新标尺。绿色框只给第二十四章用 `lean=` 引用的 `golden_fixed_point_unique`（φ 是 1 + 1/x 唯一的正不动点）与 `rational_inverse_endpoint`（只取其中 θ* 的存在、唯一与 0 < θ* < 1）；全局收敛、严格交替的条件与误差比极限 −sin θ* 是第三十三章例 `ex-ch33-mutual-cosine-monotonic-lock` 把端点定理与现成实分析结果接起来的既有结果应用，标 `ARGUED`；[0, 1] 上的压缩常数 sin 1、牛顿二次收敛、残差双边界与 (1 + sin 1)/b² 界按 §24.4–24.5 的文献注记标 `ARGUED`；轨道、残差、“单纯迭代要走几步”与连分数部分商都以 70 位定点整数实算（`NUM`）。`newton` 卡停在第 2 步（视野宽约 10⁻⁴，正确位数 0 → 1 → 4），切线这一步还看得见；第 4 步的精度交给静态图 `ch24-three-speeds`。这一页的青色是曲线 y = f(x)（只读投影）与单位圆上 P 的横坐标 θ*，品红是斜率那一半：不动点处的切线、牛顿沿切线走的那一段、λ = sin θ* 的高度与残差竖线；琥珀只给当前这一步或当前读数；走过的折线是中性墨色，灰色虚线是最陡斜率 −sin 1 与残差的楔形边界。路线图候选“开普勒方程”“半程落体”讲的是 θ* 住在哪里，正文那里没有关于收束快慢的句子，未做成卡；正文讲了而候选没有的“单位圆上的线与面”（`circle`）与“十进制千分尺”（`ruler`）补做成卡。


`mutual-observer-attractors` 与 `fixed-point-convergence`、`layered-network-cut` 分工：第二十四章讲单个余弦迭代怎样收束，本页讲两个观察者同时互读 (x, y) ↦ (cos y, cos x)：舞台是两人读数的平面，青色是两人的读法 x = cos y 与 y = cos x，灰色方框是走过的各拍，空心的环是每两拍取一次的样本（同一条轨道的偶数拍，按余弦求值次数计并不更快），琥珀只给这一拍；平面下方的窄条带横轴是余弦求值次数，每根灰色细柱是 A 那一拍的有符号误差 x − θ*（对称对数刻度，朝上高于 θ*），偶数拍带环，`alone` 看见逐拍变号、`round` 看见带环的柱全在一侧；第十九章讲层级网络的离散最小割，本页的“极小割”场景是两段边界区间在静态 AdS₃ 真空里的测地线竞争，品红是较短的割，青色是它围出的纠缠楔，琥珀是两段区间 A、B，虚线是落选的割。依据分层：绿色框只给第三十三章用 `lean=` 引用的 `QuantumMaxFlowMinCut.result`，并写明它是离散桥图、不覆盖舞台上的连续图；Ryu–Takayanagi 两区间相变与 ln 形式的测地线长、g = cos∘cos 的压缩与无二周期、每拍 −sin θ* 与每轮 sin²θ* 是例 `ex-ch33-mutual-cosine-monotonic-lock` 的既有结果应用（第 5–9、12–14、20–23 项），与 Ryu–Takayanagi 一样标 `ARGUED`；轨道与割长标 `NUM`；“观察者”“互为故乡”标 `MODEL`。路线图候选里的 `wells`（势阱变形网格）是纯诠释画面，`pinch` 与 `repeated-projection` 重复，`disconnected` 已由 `transition` 的播放起点覆盖，三者未做成卡；候选里的 `finite_record_pinching_idempotent`、`finite_contracting_updates_stabilize` 舞台上没有对应画面，不标绿。

`self-referential-table` 的舞台是一张可点击的 N × N 表 T = Σ vₐvₐᵀ（vₐ 取前 r 个离散余弦向量，N ∈ {4, 8, 12}），青色是正的格、品红是负的格，琥珀只给选中的格、刚加进来的一项、当前的秩或当前这一步。四个场景：扩表（对角格之和 = 秩，地址槽）、读表（第 i 行逐项读第 j 列；`dual_read` 开在 N = 4、r = 2，点对角格时乘积全是平方，对角格只是 T² = T 的一项，原 `diagonal` 卡已并入这张）、自愈（点格子加 ε，迭代 3T² − 2T³，右边是每一步的本征值，½ 以上青色、以下品红）、正交补（‖Tψ‖ = cos θ）。绿色框只给第三十五章用 `lean=` 引用、且落在舞台上的 `finite_memory_history_capacity`（扩表场景：r 行两两正交的记录可被完全区分，故 r ≤ N）；本章其余六条冻结定理只在抽屉的声明地图里。“对称幂等 ⟺ 正交投影”“迹 = 秩”与牛顿—舒尔茨迭代的收敛阈值、二次收敛标 `ARGUED`：‖Δ‖₂ < (√3 − 1)/2 时回到同秩的投影（离原表很近，一般不是原表），‖Δ‖₂ < ½ 时回到某个投影；“生命扩表”“T = T(T)”的诠释标 `MODEL`。本页与 `repeated-projection`（单比特投影的幂等）、`sphere-escape` · `diagonal`（康托尔对角线逃逸）不画同一画面：这里不画对角线逃逸，只画对角格自己读自己。

`quantum-fairness-ledger` 把第 31 章的五重公平中的五本账（席位、得失、关系、复制、遍历）画在同一颗布洛赫球上，每本账旁一根总额为 1 的柱子；正文的“博弈公平”（一致放大旋转步幅）没有单独的场景：平面里每步转过同一角度的图景已在 `grover-reflections` 里画出，再加一个场景会冲淡主角。青色是留在里面的（影子、A 自己留下的 ‖r_A‖²、副本的箭头、窗口与命中），品红是让出去的（横向的面积、二体纠缠、复制丢掉的部分），紫色是三体纠缠 τ₃ 与遍历场景的转轴，琥珀是读者拖动的参考轴、当前的态与当前一步。绿色框只给第 31 章用 `lean=` 引用的六条：`rank_one_born_pairing_weight`、`complementary_context_probability_pythagoras`、`no_cloning_inner_product_criterion`、`bell_pure_state_has_maximally_mixed_marginal`、`TorusOrbitEquidistribution.result` 与 `TorusObservationWindowReturns.result`（窗口取 h(x) = cos 2π(x − c) 落在开区间里的那段弧）。哈尔测度、CKW 单配性、对称 1 → M 克隆保真度 (2M + 1)/(3M)（第 31 章正文未写，页面补充的文献背景）、零边界窗口频率（既有结果的应用，见注记 `rem-ch31-weyl-window-equidistribution-literature`）与 Hecke–Kesten 有界余项（文献结果）标 `ARGUED`；“公平”的诠释与把黄金旋转画成两个绕竖轴进动的态标 `MODEL`。关系场景走的态族 a|000⟩ + b|110⟩ + c|101⟩ + g|111⟩ 里的 W 型态是 |W⟩ 对 A 翻转一次，纠缠量与正文注记里的 |W⟩ 相同。舞台用 `kit.solid` 画玻璃布洛赫球壳，球冠、面积片、副本收缩球与遍历窗口是受光实体，账本柱仍画在二维叠层上。

`spherical-degeneracy-radar` 与 `two-angle-addressing` 的 `address`、`pole` 及 `berry-loop` 的 `octant` 分工：那几张讲从北极出发的两角寻址、极点的方位角冗余与八分球回路的面积和相位，本页讲第三十四章的“读不出差别的观察者在哪里”：琥珀色是观察者探针 O 与它的轴，青色是两个结果落在观察者轴上的影子（读数）与青色虚线的盲圈（读数相同的观察者所在的大圆），淡青色是走过的盲圈，品红是第二次转动扫过的横向面、两个结果之差与两面小旗的夹角，紫色是极轴 ±e₃ 与差旋子 D 的小盘；实心点是一次（一步）的结果，空心圈是两次（两步）的结果。旋子按该章算例在 Cl(3,0) 里逐项相乘：R₁ = (1 − e₁e₃)/√2，R₂ = ((1 − e₂e₃)/√2)((1 − e₁e₂)/√2) = exp(−π/4 e₁e₂) R₁（左乘），两者都把 +e₁ 送到 +e₃。绿色框只给第三十四章用 `lean=` 引用的四条（第四条 `observer_pullback_trace_identity` 见下文“拉回”场景）：`unit_perpendicular_pair`（与两根差向量都正交的单位向量）、`partition_inseparable_iff_kernel`（读数相同即同一纤维）与 `covariant_commutator_formula`（D 与 e₃ 对易、与 e₁ 不对易）；“简并处反演出观察者站位”标 `MODEL`；Berry—Pancharatnam 相位与虚拟 Z 门标 `ARGUED`，页面不计算；旋子乘积、读数与盲圈实算（`NUM`）。“拉回”场景（`pullback`）把 θ = 60°、φ = 90° 的两个结果绕斜轴 k（离 e₃ 60°、方位角 220°，紫色）转过 ψ 让琥珀色的观察者读，墨色虚线是态不动、观察者转回 −ψ 的 R⁻¹O；两种读法逐位相同，转轴按钮可拨到观察者自己的轴上，此时 R⁻¹O = O、读数不随 ψ 变。绿色框另给 `observer_pullback_trace_identity`，写明页面只演示单量子比特幺正信道、一步演化这一个实例（迹读数 (1 + O·v)/2），把不动效应读成一根轴所需的旋转与协变条件照正文写。路线图候选的赤道反射轴族、`chirality`、`virtual_z` 未做：正文没有反射轴族的句子，后两者分别是 `berry-loop` 的 `reverse` 与 `pulse-area-virtual-z` 的 `vz`。舞台用 `kit.solid` 画玻璃球壳，扫过的面、小旗与管线是受光实体，差旋子小盘仍画在二维叠层上。

`unified-field-slice` 只覆盖第三十二章创生律与物理六域（`ch32-s04-generative-laws.md`–`ch32-s05-physical-fields-and-six-domains.md`，即 §32.4–32.5；八纲领罗盘见 `meta-unification-compass`）。四个场景共用一条时间轴：“时钟”是单位圆加双曲线 t² − x² = 1，θ = gd(η)，青色的线是 cos θ = 1/γ（固有时率），品红的高是 sin θ = tanh η（速度），紫色是弧长 θ；“不动点”（`fixedpoint` 卡）只有单位圆，时间轴是角 θ，紫色的弧长 θ 与青色的影子 cos θ 在 θ* 处等长，品红的高 sin θ 在 θ* 处读作局部压缩率而不是速度；“回路”是球面上的旋子换位子 U = R₁R₂R₁⁻¹R₂⁻¹，琥珀色只给参考箭头的尖端，品红是没合上的缺口，紫色是转轴（`plaquette` 卡是两个平面；同一个平面 U = 1 的对照由平面按钮给出，第三十二章在定理第 2 款之后改引 `lattice-gauge-loop` · `anchor`）；“视界”是内接于球的正二十面体，青色是视界以内的边，品红是割断的边与每个顶点缺的 60°，琥珀是视界 λ。绿色框只给本章用 `lean=` 引用的三条：`eq_smul_minkowski_of_null`、`anchored_phase_classification`（只管单一平面的圆周相位，页面写明两个平面的换位子不在其内）、`QuantumMaxFlowMinCut.result`（桥图，页面写明二十面体不是它的实例）；Gudermann 恒等式、Dottie 不动点（既有结果的应用，见第三十三章例 `ex-ch33-mutual-cosine-monotonic-lock`）、720° 角亏、换位子曲率与秩 ≤ D^|∂A| 标 `ARGUED`，线/面积/视界/相互作用源的读法标 `MODEL`。路线图候选 `mincut`（桥图）与第三十章 `eth-horizon-crossover` · `bridge` 同一画面，改为二十面体上的 `horizon`；`generations`（内部空间三轴世代）在 §32.4–32.5 正文里没有可引用的句子，未做。回路与视界用 `kit.solid` 画不透明的受光球与正二十面体，球面上的轨迹管与缺口随实体遮挡；时钟与不动点仍是二维图。

`forgetting-rebirth-attractor` 的舞台是单位开圆盘（两轴等比），白色圆周是第三十六章的纯光视界 θ = 90°；三个场景画在同一张圆盘上。“阶梯”：从 θ*（cos θ = θ 的根）出发，η<sub>k</sub> = η₀ + kΔη，η₀ = gd⁻¹(θ*) ≈ 0.8173；Beltrami–Klein 半径 r = sin θ = tanh η、测地线是直弦，庞加莱半径 ρ = tan(θ/2) = tanh(η/2)、测地线是与圆周正交的圆弧，两者由径向等距 ρ = r/(1 + √(1 − r²)) 连续变形；两种固有时率 √(1 − r²) 与 (1 − ρ²)/(1 + ρ²) 都等于 sech η。右侧（窄屏在右下角）的放大镜按 10 的整数次幂缩小视野，品红的缝 1 − r 按 2/(e<sup>2η</sup> + 1) 直接算，不经 1 − tanh。“轮回”：外部角度尺每步加 Δθ = θ₁ − θ*（阶梯的第一步），越过 90° 的那一步记作恰在圆周上，下一步回到圆心；一圈一根辐条，折叠后第一次撞边之后的步按“步号模周期 p”落到 p 个位置；折叠程度 f 可拖，每个点沿自己的圆转过原角度的 f 倍，灰色虚线弧是转过的路、淡色空心圈是展开时的位置（`quotient_fold` 的静态图因此看得见折叠这个动作）。原 `horizon_gap` 卡（Δη = 1.5 走到第 10 级）并入 `staircase` 的说明，靠步长滑块即可复现。“分式”：w = (s − 1)/s 下直线 Re s = c 的像圆。青色是阶梯的点、过每一级的测地线、角度尺走过的路与像圆，品红只给到边界的缝与撞上圆周的那一步（以及小图里被捏掉的相干 ½s²），琥珀只给当前一步与当前的像圆；回到圆心的虚线与辐条是中性灰。绿色框只给第三十六章用 `lean=` 引用的四条：`pinching_hilbert_schmidt_pythagorean` 与 `pinching_discarded_coherence_mass`（轮回场景，取 ρ = ½[[1 + c, s], [s, 1 − c]]）、`target_factors_iff_continuous_partition`（折叠：读出 = 步号模 p，目标 = 角度）、`cayley_ratio_norm_one_iff_critical_line`（分式场景）；逆古德曼变换、两种圆盘的度规与等距标 `ARGUED`；阶梯、擦表、轮子与“约去轮回”的读法标 `MODEL`；各数实算（`NUM`）。路线图候选的 `pinching_vonNeumannEntropy_ge`、`lorentz_boost_preserves_minkowski`、`conditionalState_isState` 不在本章的 `lean=` 引用里，未上页面；兰道尔下界 k<sub>B</sub>T ln 2 本章正文没有提到，未上页面；候选卡 `attractor_return` 与终章 `spatial-attractor-deja-vu` 重复、本章没有对应的句子，未做；正文讲到的分式临界圆补做成 `cayley`。

`pointer-ontology-deref` 的三条路共用一条以“步”为单位的时间轴，舞台是同一排 N = 64 格内存：上面是桶链式路由树（63 个开关，按“层、前缀”编号），下面是扫描总线，右边是第三十八章 N = 4 的二级页表（b₀ = 0x1000、T₁ = 0x2000、D₁,₂ = 0x9000 取自正文，其余地址为补全表格而选）。页表场景（`four_loops`、`self_map`、`diagonal_hit`）把路由树与扫描带整体收起，页表居中，琥珀只留在此刻读到的那一格或那张表上；只走一跳时（`diagonal_hit`）左边并排画指针寄存器 p 与它读出的 *p（p = 0x1000 = *p，青色“=”），下面对照一枚普通指针 p = 0x2000 读出 T₁[0] = 0x7000（“≠”）。青色是设好的路由开关与走过的跳，墨色是扫描读过的格与要读的格，琥珀只给此刻的读头（扫描读头、路由前沿、正在读的槽、刚读出的值）；不在焦点的那两条路整体减淡。绿色框只给第三十八章用 `lean=` 引用的 `diagonal_landing_fixed`（页表场景），页面画的零号槽 Mem[0x1000][0] = 0x1000 是自地址闭环（槽里存的是地址），要接到这条定理还须整行捕获 g(a₀) = diagonal(f, g)，页面不核对它，图注与依据框照此写；桶链式 QRAM 的 O(log N) 深度（Giovannetti–Lloyd–Maccone 2008）与 x86-64 递归页表标 `ARGUED`；“观察者是记忆指针”“p ≡ *p 的本体寻址”与“一拍走一层”的时间轴标 `MODEL`；页面不声称零号槽的一步是可实现的算法加速。路线图候选的 `stack_frame`（躯体栈帧）与 `theta_star` 未做：前者在正文里只是比喻表格的一行，后者属于第三十三、三十五章的不动点页面；候选 `idempotent_iff_range_fixed` 不在锁文件，`finite_contracting_updates_stabilize` 不在本章正文，均不标绿。本页与 `self-referential-table` · `dual_read` 的对角格（对角格自己读自己）、`sphere-escape` · `diagonal`（康托尔对角线逃逸）不画同一画面：这里画的是地址解引用的路径与步数。

`self-sustaining-spinor-flow` 与 `qubit-geometry` 的 `turn2` 分工：那一张在布洛赫球上看态 B 转一圈、两圈和旋子标量部 w 的读数，本页讲第三十九章的旋量双线性量与单侧光带：青色是流向量 J = ψe₃ψ̃（箭头长 ρ，虚线是它走过的路）；品红是自旋面 S = ψe₁e₂ψ̃，画成由 Re₁R̃、Re₂R̃ 张成、边长 √ρ、面积 ρ 的正方形（在三维里 S = I J，正是与 J 垂直的那块面）；紫色是转轴 n、绕 n 一圈的单侧（莫比乌斯）光带与插在 J 方位上的小旗，小旗方向 cos(t/2) n + sin(t/2) r 是 ψψ̃₀/ρ 的两个分量，旗尖走过的路是光带的边（两圈才闭合）；琥珀只给小旗此刻的落脚点；虚线小旗是出发时的那一面。三个平方 J²、−S²、ρ² 由 Cl(3,0) 逐刀片乘出（`NUM`），菲尔兹恒等式（含狄拉克旋量的 J<sub>μ</sub>J<sup>μ</sup> = σ² + ω²，页面不画）与 Spin(3) ≅ SU(2) → SO(3) 双覆叠按第三十九章文献注记标 `ARGUED`；J 是欧氏向量、S 是欧氏双矢量，“流向量”“自旋面”的叫法与时间流、规范面的读法同“无底物自指旋量流”“观察者即宇宙本体”一起标 `MODEL`。绿色框只给该章定理 `thm-ch39-double-cover-no-section-and-720-lift` 用 `lean=` 引用的两条：`no_continuous_global_section` 与 `circle_double_cover_history_lift`。图注里说小旗“与出发时相反/同向”，不说“朝下/朝上”（舞台的视角里小旗是横着的）。光带用 `kit.solid` 画成有厚度的受光实体，单一紫色，明暗只来自固定在相机上的灯：莫比乌斯带上没有不留接缝的全局两面，所以不给“两叶”各上一种颜色（那道接缝正是 `no_continuous_global_section` 禁止的一刀）。旗尖已经走过的那段边画成发亮的实线，还没走的画淡虚线，`turn360`（一半实线）与 `turn720`（整圈实线）的静态图因此一眼可分；小旗贴在朝向读者的那一面，被带挡住时确实被挡住，每 30° 一个紫色环点一下跳到那个转角，琥珀点（旗尖）可沿带拖动。`seam` 不用实体：它把光带沿底圈展开成一行（二维），每 30° 一面小旗从左到右排开（n 朝上、r 斜画为朝屏幕外），下方并排放出发的虚线小旗与回到起点的那一面，十二面逐面可读——展开图比在实体上挤一圈小旗更清楚。完整实验室另有“二元隔墙 μ”滑块（`MODEL`，正文没有给 μ 数学定义，只作画面过渡）：μ > 0 时光带沿中线剪开，小旗走第一圈的一半收成中间的指针球，第二圈的一半撑成外面的内存壳；每张卡与封面都停在 μ = 0，即这条可核算的光带。参照图里的 Gap、|cos θ − θ|、sin 2θ 等读数与米田节点光束不搬（本章没有定义，或属别章）。路线图候选 `massless_knot`、`non_trivial_lift` 并入 `seam`；`grand_closure` 未做：第三十九章没有“从第一章 AB = A·B + A∧B 收束回 ψ = ψ(ψ)”的句子（章末只有一句回望第一、二章砍掉第 3 点 C 的话）。

`gram-causal-elliptope` 与 `timeless-causal-crystal` 的 `window`、`impossible`、`right` 及静态图 `ch29-gram-window` 分工：那几处只讲三根向量的窗口（两条余弦锁住第三条）；本页讲第四层的多步记忆：格拉姆表按 Q、P₀、P₋₁、…、P₋₍M−1₎ 排列，记忆深度 M 从 1 到 5，每多一个锚点 (y, z) = (Q·P₋₁, Q·P₀) 平面里就多一圈套在里面的椭圆，第一个变负的顺序主子式指出哪一层记忆先拒绝。舞台是用 `kit.solid` 画的受光三元椭圆体（两片曲面 z = xy ± √((1−x²)(1−y²))，表面网格是 x 固定与 y 固定的线），在历史 x = P₀·P₋₁ 处切开、切面朝前，切掉的一块只留淡紫色轮廓；所有套圈、窗口与候选都画在切面上（`violate` 的 Q 仍在体内的切面上，被拒绝它的是更深的套圈，不是椭圆体本身）。从背面看时体挡住切面，被挡住的 Q 拖不动。紫色是椭圆体（体积），品红是每层记忆的边界与贴边的点，青色是穿过候选的 z 的窗口和当前一层围出的泡泡（正文第四层第 2 条写作“绿色因果相容泡泡”，页面与图注不用绿色），琥珀色只给候选 Q。事件取在 ℝ⁶ = E∥ ⊕ E⊥（`flat` 卡与 ℝ³ 开关把每个事件换成它在 E∥ 上的投影再归一，说明为什么要六维）。绿色框只给第二十九章第二层行内引用的 `lagrange_gram_identity`（阶梯第二级 D₂ = 1 − z² 是面积的平方）；西尔维斯特判据、半正定与格拉姆矩阵的对应、三元椭圆体的边界标 `ARGUED`；把 G ⪰ 0 读作因果相容空间、把 `flat` 读作“无限全知观察者”一行标 `MODEL`。

`dream-decoherence-unpinning` 与 `double-slit-marker` 的 `erase`、`delayed`，`erasure-ledger` 的 `pinch`，`bloch-noise` 的 `dephase` 分工：那几张讲双缝路径标记的读法、捏合的熵账与布洛赫球上的退相干，本页讲第三十七章的“锚点剪掉位置之间的相干”。舞台是一张密度矩阵方格（方块面积是 |ρᵢⱼ|，方块里的短线指向相位，虚线框是出发时的大小；记录场景在方格旁另画 ρ₀₁ 的相位盘：灰色虚线圆半径 1/2，标出证书的三个落点 1/2、−1/2、−i/2，品红箭头是此刻的 ρ₀₁，品红圆点是每一步的落点，白色虚线是箭头走过的路，画在圆内一点、每走一步再内收一点，转出去又转回来读作两股，所以 `quantum_eraser` 的终帧与出发时看得出不同；c = 0 时箭头缩成圆心的一点）与它在远场屏上留下的亮度（青色虚线只由对角给出，青色填色是锚点块里的相干添上的条纹，品红填色是其余相干添上的条纹，灰色虚线是出发时的屏）。青色是对角与块里的格（留下的），品红是跨块的格、被记录作用的 ρ₀₁ 与醒来时淡出的格（被剪掉、逃出去的），灰框是锚点的块，琥珀只给这一步作用的那份记录与醒来时读出的那一格。三个场景：锚点（四个位置 x₀…x₃、x₀ 是躯体，ρ(λ) = (1 − λ)|Ψ⟩⟨Ψ| + λ Σₖ PₖΨΨ*Pₖ，投影族“逐个位置”或“躯体 | 其余”；`blocks` 与 `unpin_body` 用后者，`unpin_body` 只让躯体连向其余三处的相干回来，与 `waking` 对照）、记录（等幅叠加上两份重叠 c = |c|e^{−iφ} 的记录，写入乘 c、逆转乘 c̄）、醒来（P₀ = |x₀⟩⟨x₀| 的读出，遗忘权重 1 − Tr(P₀ρ) 与 λ 无关）。绿色框只给第三十七章用 `lean=` 引用、且落在舞台上的六条：`finite_record_pinching_idempotent`、`unreadState_fixed_iff`、`entropy_production_coherence_deletion_identity`（只在“逐个位置”即按基捏合、λ = 1 时）、`pinching_discarded_coherence_mass`（记录场景的相干质量）、`joint_coherent_reversal`（写明前提 |c|² = 1）与 `two_copy_joint_reversal_certificate`；|c| < 1 与 c = 0 的结果、本征值与熵标 `NUM`；Scully–Drühl 量子擦除、环境诱导退相干、预测加工与快速眼动睡眠标 `ARGUED`；“梦境卸下躯体先验”“醒来”“多位置涌现”的读法与远场屏标 `MODEL`。本章的黄金切投与德洛内定理不在本页。路线图候选的 `waking_beam` 改名 `waking`（捏合不把态剪成一点，剪成一点的是醒来的读出）；`multi_locus` 并入 `wake_snap`（读出前的四处相干、读出后只剩一格）；另加 `blocks`（块捏合的不动点）与 `half_erase`（证书的 −i/2）；候选的 `unread_post_measurement_fixed_iff_commutes`、`pinching_vonNeumannEntropy_ge` 本章正文未用 `lean=` 引用，不标绿（捏合不减熵只在测试里核对）。

`meta-unification-compass` 只覆盖第三十二章元统一罗盘与正二十面体黄金桥（`ch32-s06-meta-unification-and-icosian-bridge.md`，即 §32.6）。两个场景共用一条时间轴：“罗盘”是立方体 [0, 1]³，三根轴照 §32.6 的定义（θ 阶数：青色的“线”一端到品红的“面积”一端；η 分辨率：光滑到多面体；λ 观察者：球外 C 到场内），八家纲领按 §32.6 总表原话落在每根轴的三段之一（点明哪一端就落在那一端，没点明或两端都有落在中段，同格的在中段里错开），整只立方体与“本书的位置”都标 `MODEL`，页面写明不是测量、不是对学科的评判、本书没有形式化地取代哪一家；时间轴逐个读四大阵营，琥珀色只给正在读的那一对与选中的一家。“黄金桥”在 ℤ[φ] 里精确算 2I 的 120 个元素（去掉实部投到三维，青色）与 φ⁻¹·2I（品红），Q(q) = 2(a + b) = 2 的 240 个根、两两 B ∈ {−2…2}、56 个邻居、𝓘 的格拉姆行列式 1，纯虚的 60 个按带权坐标 (√(2φ/√5) q, √(2φ⁻¹/√5) q^σ) 从 E∥ 转到 E⊥；琥珀色只给选中的元素。只有“黄金桥”的第一段（`icosians` 卡，2I 按实部一层层出现）用受光的实体（`kit.solid`，第二块画布 `#cvs` 跟随二维舞台的相机）：每一层的位置由页面连成凸包，12 个是正二十面体、20 个是正十二面体、30 个是截半二十面体，选中元素那一层画成平面着色的实体，其余各层只画棱；`e8`、`fold` 与“罗盘”的三张卡原图已经清楚，照旧画在二维画布上，静态图不变。纯虚子模配上 Q 的格拉姆行列式是 4（D₆ 格），页面照实写，不称它为带标准内积的 ℤ⁶。绿色框只给本章 `lean=` 引用的 `golden_fixed_point_unique`（页面坐标里的 φ）；2I、(𝓘, Q) ≅ E₈ 与准晶切投母格标 `ARGUED`，ℤ[φ] 里的核对标 `NUM`。路线图候选 `strings_lqg`、`holography_twistor`、`ncg_langlands` 合为一张 `camps`：§32.6 只有一处可引用，且正文把非对易几何与 Wolfram 超图配成一个阵营、朗兰兹与熵引力配成一个阵营。

`hairy-ball-normal-escape` 与 `berry-loop` · `comb`、`unified-field-slice` · `polytope` 及静态图 `ch21-angle-defect`、`coda-defect-spread` 分工：`comb` 已画“两极各一个 +1 的梳不平的场”，本页只把纬向场 (−y, x, 0) 当起点（`merge` 的起始状态，时间轴拨回起点即是），讲 `comb` 没有的四件事：两个 +1 推成偶极切场 w = (((1 − z)² − x² + y²)/2, −xy, x(1 − z)) 的一个 +2（`merge`，中间那一族是立体投影拉回的 e^{iψ}(a − u)/(1 + a)，为画面选定，标 `MODEL`）、环面 ê_φ 处处长 1（`torus`）、测地穹顶 ν = 1…6 的顶点角亏之和恒为 4π（`defect`，`ch21-angle-defect` 只画 ν = 1，`coda-defect-spread` 用横条画同一组数，故本卡只在第二十一章引用、不放进终章）、法向抬升 w̃_λ = (1 − λ)w + λ(1 + z)/2·x（`escape` 停在 λ = ½；把时间轴拨到 λ = 1，南极又成零点，页面如实画出并在抽屉里写明）。这一页品红是零点（发旋）、绕零点的小圈、角亏圆点与沿法向立起的部分；青色是切向箭头与平的三角面；琥珀只给可拖动的零点、环面上当前的点与北极处的箭头；灰色是北极的切平面。绿色框只给第二十一章用 `lean=` 引用的 `complete_diagonal_not_continuous`，页面写明它讲的是对角线在划分拓扑下不连续、与毛球定理不是同一条陈述；路线图候选 `no_continuous_global_section` 只在第五、三十九章引用，未标绿。庞加莱—霍普夫、毛球定理与笛卡尔定理标 `ARGUED`，指标、角亏与最短箭头的长度标 `NUM`。舞台用 `kit.solid` 画不透明的受光球、环面与平面三角面穹顶，切向箭头与零点贴在表面，背面的标记随实体遮挡。

`dottie-fibonacci-spirals` 与 `fixed-point-convergence` 分工：后一页讲渐近压缩率、牛顿切线加速与有理刻度裂缝，本页讲第二十四章 §24.5 末与第三十二章 §32.1 末的双螺旋结构对应：蛛网等臂回旋方格与分段 90° 圆弧导引线（x₀ < x* 时按北→东→南→西，x₀ > x* 时按南→西→北→东，每步走两臂转 180°）、右栏光滑等角对数螺旋模型（按同一步数指标 k 记 k×90°）、一维平直加法守恒 φ⁻¹ + φ⁻² = 1 对二维单位圆勾股守恒 (θ*)² + sin²θ* = 1，以及伯努利向心径向切角 α = arctan(1/b)（90.00° / 82.83° / 75.88° / 72.97°）。青色给 cos θ 曲线、θ* 正交螺旋（κ = sin θ* ≈ 0.6736）、共线分量 θ* 与静态不动点圆环，品红给 1/(1+x) 曲线、斐波那契黄金螺旋（κ = φ⁻¹ ≈ 0.6180）、正交分量 sin θ* 与内倾偏角 90° − α，紫色给蛛网双步螺旋（κ = √sin θ* ≈ 0.8207），琥珀只给当前步 k 的折步/方格、动态相位射线与步 k 读数点（恒定切角条保持各螺旋自身语义色并用墨色外圈标示当前选择）。绿色框只给五条冻结定理：`rational_inverse_endpoint`、`golden_inverse_branch_positive_fixed_point_iff`、`fib_cassini_from_golden_norm`、`golden_hurwitz_bound`、`square_eq_neg_one_of_skewAdjoint_unitary`；余弦全局收敛、严格交替与误差比极限 −sin θ*（第三十三章例 `ex-ch33-mutual-cosine-monotonic-lock` 的既有结果应用）以及黄金倒数负导数、等臂转向、守恒对偶与向心切角公式（文献结果）标 `ARGUED`；70 位定点整数实算的常数与 k = 0…20 共 21 步递推轨道（x₀…x₂₁ 与方格边长 s₀…s₂₀，独立测试用 90 位对照，极坐标螺旋与切角用双精度计算后按显示位数舍入）标 `NUM`；克利福德 −1 = Î² 双直角转向、离散等比收缩的连续对数螺旋插值与统一场横纵双螺旋分工标 `MODEL`。

`critical-mirror` 的舞台是两个并排的平面：左边是临界带 0 < Re s < 1（纵向压缩），琥珀色的 ρ = ½ ± δ + iγ 与三个品红的伴 ρ̄、1 − ρ、1 − ρ̄，δ = 0 时两两重合成青色的两点；右边是凯莱坐标 w = (s − 1)/s，单位圆是青色，左下的放大镜以辐角为横轴、ln|w| 为纵轴，把高处只偏出圆周万分之几的四个像拉开。“四次式”场景把右边换成同样对称的四次式 F(½ + it)（青色，最低处琥珀色）与 ξ(½ + it)（品红，各用各的标尺；ξ 由欧拉—麦克劳林求 ζ、斯特林求 Γ）。前五个零点是灰色的数值点（与静态图 `ch22-critical-line`、`ch22-overview` 里的零点同为灰色）。时间轴是 ρ 到镜面的距离 δ。绿色框只给第二十二章用 `lean=` 引用的 `xi_reading_reflection`、`xi_reading_one_sub_conj`、`cayley_ratio_norm_one_iff_critical_line` 与 `full_symmetry_not_fixed_line_localization`；零点高度、|w|、F、ξ 标 `NUM`；黎曼猜想只在抽屉里标 `OPEN`，页面不画“全部零点”。

`vortex-polygon`（`ORTHO//POLYGON`）与 `navier-stokes-p-np` 分工：前一页讲三维涡管拉伸、兰姆双向量分解与伯格斯涡核，本页讲第三十章 §30.4 的平面无旋流中正负相间排列在圆周上的 2m 个点涡（附加绕原点的进动项）：青色是正环量点涡与平衡半径 R = √(b/(4Ω)) 上的静止圆周，品红是负环量点涡与 m ≥ 3（从六边形起）沿不稳定本征方向按 e^(λt) 长大的发散轨迹，琥珀只给当前施加微扰的点涡与时间轴读头。绿色框严格只给 §30.4 用 `lean=` 引用的三条冻结定理（`regular_equilibrium_iff_radius`、`physical_positive_eigenvalue_iff`、`unbounded_linear_drift`）；亥姆霍兹—基尔霍夫平面点涡方程与囚禁玻色—爱因斯坦凝聚体带进动项的涡旋模型（Barry–Kevrekidis）标 `ARGUED`；四阶龙格—库塔法积分非线性方程 ż = F_{2,1/2}(z) 与中心差分雅可比矩阵反幂迭代求不稳定本征向量标 `NUM`。

`entanglement-entropy-complexity` 与 `layered-network-cut`、`complexity-growth` 分工：那两页分别讲层级网络离散极小割与随机电路半链熵增长，本页讲第三十章末节的“偏迹视界同一把剪刀切出纠缠、熵与键维代价”：青色是留在局域边缘里的布洛赫长度平方 ‖r_A‖² = cos²θ 与有能隙面积律割，品红是跨割双向量纠缠并发度平方 τ = sin²θ = S_L(ρ_A)、九维关联盲区与体积律指数键维，紫色是跨割联合旋子，琥珀是当前施密特角 θ（含 Dottie 平衡角 θ* ≈ 42.35°）。绿色框只给该节引用的四条冻结定理：`bell_pure_state_has_maximally_mixed_marginal`、`local_marginal_correlation_blind_spot`、`entropy_production_coherence_deletion_identity` 与 `rational_inverse_endpoint`；Hastings 面积律、Page 体积律、Harlow–Hayden / Susskind 解码复杂度屏障、PostBQP = PP 与 MIP* = RE 标 `ARGUED`；施密特纯度、线性熵、冯·诺依曼熵与割键维 2^{S_cut} 实算标 `NUM`；标准图灵机 P ≠ NP 标 `OPEN`；三位一体视界诠释标 `MODEL`。

`fairness-square-uncertainty-expansion` 与 `quantum-fairness-ledger` 分工：前一页讲五重公平的球面五本账，本页讲第三十一章 §31.4 的四句本体链条（覆叠螺旋投影与截断视界 → 公平迫使二次平方 → 单基对角相位折叠与罗伯逊—薛定谔余项 → 克雷洛夫饱和与素数正交新轴扩张）：青色是圆周投影影子、当前有限子空间内的投影分量与对角读数，品红是层高差、一致完备化单位算子范数缺口 ‖id − P_{S_i}‖ = 1、折叠丢失的相对相位与正交逃逸余项，紫色是双向量对易面积 C 与协方差余项，琥珀是当前螺旋步、测试态与新长出的素数轴。绿色框只给 §31.4 用 `lean=` 引用的二十条冻结定理；约当—冯·诺依曼逆定理、格里森定理（d ≥ 3）、无界正则对易子定义域条件、Balan–Casazza–Edidin 无相位重构、欧几里得 IX.20 与兰佐斯—阿诺德迭代终止标 `ARGUED`；螺旋阴影、w_p(θ) 反例、|0⟩ 上 X/Y 方差积与 30031 = 59 × 509 检核标 `ARGUED` / `NUM`；静动不二与 D → D + 1 时间观标 `MODEL`。

`padic-prime-table-tree` 与 `forgetting-rebirth-attractor`、`euler-product-sieve` 分工：前两页分别讲双曲圆盘快度阶梯与实轴欧拉乘积筛余项，本页讲第三十六章 §36.4 的模 p^k 前缀查表树与素数扩表：青色是同余闭球纤维内已区分的合法分支与亨泽尔唯一提根路径，品红是精度盲区 k < k* = v_p(x − y) + 1 内的碰撞对、p = 2 分歧奇异阻断与 p_∞ 连续进位溢出，琥珀是当前选中的素数基数 p ∈ {2, 7, 31, 1031} 与待查有理数 x = 12/35。绿色框只给 §36.4 用 `lean=` 引用的八条冻结定理（奥斯特洛夫斯基分类、同余纤维闭球对应、首次区分精度、观测距离恒等、两项超度量强三角律、中国剩余双射与有理阿代尔乘积公式）；亨泽尔引理、布吕阿—蒂茨树与 p 进 AdS/CFT、阿拉克洛夫 p_∞ 及欧几里得素数无穷多标 `ARGUED`；树深 ⌈n / log₂ p⌉ 与阿代尔局部范数连乘实算标 `NUM`；“一观察者一素数、扩素数即扩表阻断轮回”标 `MODEL`。

`dream-pre-decoherence-deja-vu` 与 `dream-decoherence-unpinning`、`spatial-attractor-deja-vu` 分工：`dream-decoherence-unpinning` 讲锚点松绑与双副本量子擦除，`spatial-attractor-deja-vu` 讲洛伦兹吸引子跨轮次切向共振，本页讲第三十七章 §37.5 的“选基选择未来、梦境离线幂等预编译、醒后新颖度冲刷与无时间戳快表命中”：青色是选定语境下的块对角投影不动点、格拉姆相容走廊 [0.28, 1] 内的合法落点与零新增熵（ΔH_bits = 0）快表命中，品红是丢弃的跨块相干质量 2|ρ₀₁|²、走廊外的违例格拉姆点与高新颖度事实触发的流水线冲刷作废，琥珀是当前选中的测量尺、候选未来截面与 `Time_Tag = NULL` 命中槽。绿色框只给 §37.5 引用的十八条冻结定理；惠勒延迟选择、超标量分支预测投机冲刷与 TLB/PCID 标签规范、康威帝国效应及 Brown / Moulin 既视感心理学文献标 `ARGUED`；同轴重投影 ΔH_bits = 0 专化、三向量格拉姆走廊与四阶段矩阵元实算标 `ARGUED` / `NUM`；梦境沙盘预编译与既视感快表诠释标 `MODEL`。

`pnp-lookup-degradation` 与 `pointer-ontology-deref`、`eth-horizon-crossover` 分工：后两页讲递归页表槽位自映射与 3-SAT 亚指数交叉尺度，本页讲第三十八章 §38.4 的“全知神谕查表七阶退化阶梯（0 → 6 正向降级派生时空热、6 → 0 逆向建表重返 p = *p）”：青色是快表已驻留的零步命中份额 σ 与相干加速区，品红是受下支撑进位屏障、全息球半径 R = Ω(2^{σn/2}) 光锥线延迟与兰道尔排热支配的退化代价指数 r(σ)，紫色是 σ* = 2/3（r_min = 1/3）全息流水线平衡点，琥珀是当前所处的退化阶（0 至 6）。绿色框只给 §38.4 用 `lean=` 引用的五条冻结定理（`diagonal_landing_fixed`、`lookup_program_upper_bound`、`lookup_copy_zero_loss_and_nonanticipating_failure`、`lower_support_carry_barrier`、`landauer_bound_of_balance`）；PostBQP = PP、P/poly 坍缩、Frougny 向上进位波、贝肯斯坦—霍金熵界、Klauck–Špalek–de Wolf 量子权衡 ST² = Ω(2ⁿ) 与姚期智 ST ≥ 2ⁿ / PPSZ 标 `ARGUED`；标准图灵机 P ≠ NP 标 `OPEN`；各阶指数曲线实算标 `NUM`；双向阶梯诠释标 `MODEL`。

`observer-escape-ledger` 与 `pnp-lookup-degradation` 分工：前一页讲宏观复杂度指数随表容量比例 σ 的退化包络，本页讲第三十八章 §38.5 的有限状态场 S = {0, 1}⁴（16 态、120 条无向弦）五引理快表原像纤维与闭合 Moore/Hilbert 回路账本：青色是快表保留信息 I_ledger(S)、单点/细分原像纤维与齐肯多夫合法脉冲，品红是同纤维不可区分状态间的跨格逃逸弦、Rényi-2 碰撞逃逸熵 H₂^escape 与清醒第 5 阶段兰道尔擦除热，紫色是两比特 9/15 关联盲区扇区与唯一捕获弦高亮，琥珀是闭合回路上的当前指针读头与刚切换的引理开关 L₁…L₅。绿色框只给 §38.5 引用的七条冻结定理（留一逃逸对并分解、唯一捕获差集、两项严格商核新颖度等价、细化不纯度单调不增、十四比特块避碰一致上界与局域边缘关联盲区）；SMB 柱集等分、Parry 黄金移位容量 log₂ φ、Frougny 正规化与 Moore–Hilbert 1/d 局部性界标 `ARGUED`；32 种引理子集的纤维平方和与逃逸率穷举实算标 `NUM`；柱集裁切回弹与梦境零热复相干账本标 `MODEL`。

`pisot-clifford-rauzy-sandtable` 与 `golden-cut-observer`、`padic-prime-table-tree` 分工：`golden-cut-observer` 讲 K = 2 一维内空间区间窗与卡西尼接缝，`padic-prime-table-tree` 讲素数基数树，本页讲第三十九章 §39.5 的广义 K-Bonacci 皮索—克利福德—劳齐八概念综合沙盘：青色是满足无 K 连 `1` 约束的合法字、单位圆内收缩共轭点与三阶劳齐分形内窗 R₃(α) 的三支前缀拼砖 f₀ / f₁₀ / f₁₁₀，品红是跨切口满载禁令剪掉的违例分支、分形边界碰撞对 `EscapePairs` 与谱支撑阻断，紫色是复共轭平面里的阻尼旋子，琥珀是当前阶数 K、切口位置或比对点（含超越数 θ* ≈ 0.739085 对六次代数数 |α|_{K=3} = β₃^(−1/2) ≈ 0.737353 的 0.234% 邻近对照）。绿色框只给 §39.5 用 `lean=` 引用的二十七条冻结定理；劳齐拼砖拓扑圆盘性质与边界维数 dim_H(∂R₃) ≈ 1.09336、斐波那契任意子黄金链与 51 原子里德堡阻塞模拟器、Parry 熵 log₂ β_K 及 Abramov 诱导回归熵公式标 `ARGUED`；根轨迹、拼砖迭代与可达页秩矩形实算标 `NUM`；劳齐分形视界纠缠标度 `prob-ch39-p2e-fractal-horizon` 标 `OPEN`；克利福德线—面词典与八概念闭环标 `MODEL`。

`quantum-interpretations-duel` 对应附录 D 的“维格纳朋友密封实验室 + 远距 EPR 贝尔纠缠对”联合几何对决台：青色是留在局域子空间或对角记录里的投影权重 cos²θ、纯度 r² 与无条件边缘 50%/50%，品红是环境纠缠亏损 τ_{L:E} = 1 − r²、被捏合抹除的跨分支相干、类空同时面倾斜差 Δt′ = −2Γ_β β 与剩余逃逸对，紫色是双比特 CHSH 算符与复结构 J² = −I 平面，琥珀是当前选中的诠释透镜（哥本哈根、多世界、德布罗意—玻姆导航波、GRW–Penrose 客观坍缩、正交自指开维）及共享旋钮（测量角 θ、环境规模 lg N、参考系推动 β）。绿色框只给附录 D D.4 总表列出的二十条冻结定理；冯·诺依曼过程 I/II、Frauchiger–Renner 定理、Zurek / Schlosshauer 退相干评述、Gleason 定理、Renou et al. (2021) 网络实量子证伪、Bell / Eberhard 无信令、Harrigan–Spekkens / PBR 定理、五大流派原始文献及 Pauli / Wheeler–DeWitt / AMPS 视界文献标 `ARGUED`；预示条件 75%/25% 对比无条件 50%/50% 边缘、r² + τ_{L:E} = 1、助推同时面偏移与四比特奇偶捕获算例标 `ARGUED` / `NUM`；协变坍缩与量子引力视界幺正性 `prob-appendix-d-time-horizon` 标 `OPEN`；五视角几何对照标 `MODEL`。

`coherence-handshake-causality` 与 `timeless-causal-crystal`、`gram-causal-elliptope` 分工：前两页分别讲无时间晶体四切面与多步记忆椭圆体收缩，本页讲第二十九章 `#sec-ch29-coherence-handshake-causality` 的相干—去相干逻辑、双端玻恩握手、未来擦除无信令与闭环自洽：青色是轴向可见投影、正向交叠振幅、无条件过去边缘总和与相容闭环通路，品红是正交补分量与双向量面积、共轭回波振幅、被捏合删除的非对角相干与反相分流到互补端口的权重，紫色是双端口合束算符、置换阵 P₁₃ 与格拉姆体积不变量，琥珀是当前选中的角度、斯涅尔驻点 s*、未来标记基角 β 与余弦不动点 θ* ≈ 0.739085（不用红色标零概率或符号翻转）。绿色框只给 `#sec-ch29-coherence-handshake-causality` 用 `lean=` 引用的十四条冻结定理；费曼—希布斯斯涅尔折射有限求积、Cramer (1986) 交易诠释、ABL (1964) / AAV (1988) 双态矢量与弱值在 ⟨Φ|Ψ⟩ = 0 处严格无定义、Scully–Drühl / Kim 延迟选择量子擦除及 Deutsch (1991) 闭合类时曲线混合态不动点标 `ARGUED`；双端口守恒、克劳斯完备性无信令 p(j) = q_j 与 P₁₃GP₁₃ᵀ 置换恒等式标 `ARGUED` / `NUM`；“逻辑只有相干与去相干、双端握手即因果”标 `MODEL`。

`observer-consensus-decoherence` 与 `mutual-observer-attractors`、`bloch-noise`、`quantum-interpretations-duel` 分工：前三页分别讲两人互指蛛网与极小割重联、单通道布洛赫仿射噪声、五种量子诠释账本对照，本页讲第三十三章 `#sec-ch33-consensus-decoherence-pointer` 的多观察者二阶共识张量 M_cons、去相干指针基涌现与无脱观察者绝对客观事实：青色是唯一分辨出的未定向共识指针线（仅当谱隙 Δλ = λ₁ − λ₂ > 10⁻⁸ 时画出；各向同性迷雾 I₃/3 与双正交泡顶层简并 (1/2, 1/2, 0) 均标 `pointerAxis = null`）、纵向存留极化与纯双分支互信息经典冗余平台，品红是横向相干圆盘收缩、未控幸存记录封锁的残余相干与平面外拓荒观察者的正交逃逸余项 sin β，紫色是共同复相位二次厄米配对、双副本四步相位复原轨迹与双实验室真局域友好性关联多胞体，琥珀是当前选中的观察者轴簇、去相干角 α、片段规模 m、白噪声可见度 v 与拓荒倾角 β（不用红色标零读数或旧生成元下最快衰减的核方向）。绿色框只给 `#sec-ch33-consensus-decoherence-pointer` 用 `lean=` 引用的十二条冻结定理；Zurek 环境诱导超选择与量子达尔文主义（含 Blume-Kohout & Zurek 自旋环境模型）、Brukner / Frauchiger–Renner 扩展维格纳朋友定理及 Bong 等人 (2020) 真局域友好性不等式 F_LF ≤ 6（量子违背见证 √5 + 3 + √(2 + √2) ≈ 7.0838，v_crit ≈ 0.8470）标 `ARGUED`；二阶并矢张量符号翻转不变性（严格区分于对径正交纯态）、有序乘积 vs. 系综平均 vs. 弱耦合生成元 I₃ − M_cons、O(N) 纯分支互信息曲线、正交 Z/X 未读对易 vs. 选择性分支不对易及 det M_η = (1 − η)²abη sin²β（并标明旧生成元下 ker M₀ 按 e^(−t) 最快衰减而非无退相干子空间）标 `ARGUED` / `NUM`；Lamport–Shostak–Pease 拜占庭多数派共识类比与“共识决定去相干方向、无绝对客观存在”标 `MODEL`。

`comparison-oisc-engine`（`ORTHO//CMP`）与 `unified-field-slice`、`fairness-square-uncertainty-expansion`、`pnp-lookup-degradation` 分工：后三页分别讲统一场五切面、螺旋阴影与算术素数逃逸、宏观查表退化七阶包络，本页讲第三十二章 §32.1–32.3（`ch32-s01-axiom-of-comparison.md`–`ch32-s03-axioms-as-corollaries.md`）的零背景比较公理 A₀、宇宙单指令集两两比较原语与由比较推得其他公理（四个场景：原语、显影、折痕、开维）：青色是同槽（`XNOR`）累成的求同读数 s = cos θ、留在表内的投影 cos β、同² 份额、固有时留存 dτ/dt 与深度 b 前缀树命中，品红是异槽（`XOR`）撑开的存异读数 a = sin θ、楔² 下界、空间存异推进 dx/(c dt)、与旧平面正交的残差 r = sin β e₃ 及同桶逃逸对 `EscapePairs`，紫色是秩 3 谱分解出的 `3-3-2` 三维八角盒（因 3 ∤ 8，八个八槽 ±1 单位字张成八角长方盒而非正方体）与纯差复结构平面，琥珀是当前点翻的槽位、比对向量 v、分配角 θ、抬升角 β、前缀叶键或自比较蛛网当前步。绿色框严格只给页面列出的十条冻结定理（`inner_product_norm_parallelogram_law`、`rank_one_born_pairing_weight`、`square_eq_neg_one_of_skewAdjoint_unitary`、`gram_realizability`、`lagrange_gram_identity`、`robertson_schrodinger`、`finite_layer_projection_escape`、`eq_smul_minkowski_of_null`、`escapePairs_without_eq_union`、`rational_inverse_endpoint`；正文 §32.1–32.3 另在定理与推论盒引用 `name_compare_run`、`dictionary_lookup_run`、`future_word_orthogonal_residual`、`partition_inseparable_iff_kernel` 等）；Mavaddat & Parhami (1988) `SUBLEQ` 单指令集图灵完备性、Jordan–von Neumann 平行四边形逆定理、Schoenberg (1935) 半正定度规嵌入与 Gleason (1957) 定理标 `ARGUED`；标准 P ≠ NP 与物理希尔伯特空间是否真长出新维标 `OPEN`；雅可比谱分解、格拉姆秩、16(2^(4−b) − 1) 逃逸对枚举与蛛网迭代标 `NUM`；宇宙单指令机、零背景比较公理 A₀、κ 对照旋钮与预算圆改写光锥标 `MODEL`。

`spherical-trihedron-cell`（`ORTHO//CELL`）与 `spherical-degeneracy-radar`、`two-angle-addressing`、`berry-loop` 分工：前三页分别讲简并盲圈反演观察者站位、球面两角旋转字与有理六轴覆盖、整球环路贝里立体角与发旋，本页讲第三十四章 `#sec-ch34-infinitesimal-spherical-trihedron` 的球面直角三面角原胞 ΔT_ε（五个场景：原胞、一次、两次、角超、格拉姆）：青色是平直弦削面 △_flat ABC 与沿中脊棱 OB 投影出的“正交一次”大圆直弧 AC（cos c_ε = cos²ε），品红是单位模方公平向外撑鼓的球面帽 △_sph ABC、吉拉尔角超 Ω(ε) 与两步换序的横向差（严禁把球面帽鼓包写成金色或琥珀色），紫色是三态撑开的三维格拉姆体积砖 √det G = sin²ε（对比共面两步 det G = 0）与两面垂直墙上的半角旋子 U₁₂、U₂₃，琥珀只给当前步长手柄 ε 与测地回路位置 t，“格拉姆”场景里的最小步长 ε_min 画成灰色示意带。绿色框严格只给页面引用的六条冻结定理（`unit_perpendicular_pair`、`lagrange_gram_identity`、`two_axis_finite_word`、`covariant_commutator_formula`、`partition_inseparable_iff_kernel`、`finite_layer_projection_escape`；正文 §34.4 定理盒另引用 `tetra_defects_incidence_repair_and_exactness` 与 `moving_axis_invariance`）；球面直角三角形纳皮尔公式、吉拉尔角超 Ω(ε) = 2 arctan(sec ε) − π/2 = 2 arctan(tan²(ε/2))、高斯—博内平行移动转角 +Ω(ε)、潘查拉特纳姆—贝里测地闭环旋量和乐 exp(−(Ω/2)Î_A)（与仅走两面坐标墙的横项 −sin²(ε/2) e₁e₃ 严格区分：后者只在 ε → 0⁺ 的二阶主项 O(ε²) 与 −Ω/2 一致，并在 ε = 90° 汇合于八分球）及 Regge (1961) 离散单纯形曲率标 `ARGUED`；顶点、三重积、刀片旋子乘法与逐段平行移动实算标 `NUM`；“一体双影”诠释、灰色 ε_min 带与离散球面拼砖标 `MODEL`。

`triadic-nameless-sandbox`（`TRIAD//NOUMENON`）与 `spherical-trihedron-cell`、`comparison-oisc-engine` 分工：前两页分别固定三根正交轴看“一次 vs. 两次”投影和八槽比较机，本页讲第三十四章 §34.5 `#sec-ch34-triadic-bootstrap-and-beyond-names` 的“二生三”无特权自举、120° ℤ₃ 主谓宾切面轮换与撤去语言名相后的黄金双频呼吸：舞台用 `kit.solid` 画 C¹ 平滑相切的珠光三瓣弧面体、无缝内嵌的重心细分测地补片、极坐标地坪与三扇在局部 `(u, v)` 平面里画出投影图形的切片屏（二元线段、比较转向弧、带抬升圆盘的投影三角形），圆角衬底标签沿径向外扩并以细引线指回锚点；当名相参数 ν = 0（`noumenon-breath`）时，外围切片屏、地坪、投射束、测地补片与全部舞台标签同步撤净，只留连续曲面按 ω₂/ω₁ = φ 两频呼吸。青色是二元初态、内嵌球面补片与第一扇切片屏里的投影线段，琥珀是当前比较弧、同心可拖光晕与第二扇切片屏里的转向弧，品红是自举创生的第三顶点与第三扇切片屏里的投影结果（花冠增殖场景用青/琥珀/品红区分三代原胞），紫色只给无名呼吸的浮动频率环。绿色框严格只给 `#prop-ch34-triadic-bootstrap-and-lexical-pinching` 用 `lean=` 引用的四条冻结定理（`unit_perpendicular_pair`、`finite_layer_projection_escape`、`moving_axis_invariance`、`partition_inseparable_iff_kernel`）；球面余弦与吉拉尔角超 Ω₀ = 3 arccos(c₀/(1 + c₀)) − π、三维 C₃ ⊂ SO(3) 循环对称（严格区分于 Spin(8) 旋量三元性）、皮尔士三元范畴与老子—康德—维特根斯坦撤梯传统标 `ARGUED`；det G₃ = (1 − c₀)²(1 + 2c₀) 与多胞坐标实算标 `NUM`；“二生三”平权归一、1 → 4 → 10 黄金阻尼花冠、主谓宾语法切面与 ν ∈ [0, 1] 名相消融标 `MODEL`。

`uncompleted-horizon-sandbox`（`HORIZON//UNCOMPLETED`）与 `pnp-lookup-degradation`、`observer-escape-ledger`、`triadic-nameless-sandbox` 分工：前三页分别讲宏观复杂度包络 r(σ)、16 态闭合回路纤维熵与单颗弧面体的三元名相轮换，本页讲第三十八章 §38.6 `#sec-ch38-uncompleted-horizon-godel-pnp` 的“建表扩维悖论、满射目录对角分离亏损、图灵序数扩表螺旋、前后双向视差与全知死寂反事实对照”（五个场景：扩维、对角、螺旋、视差、护栏）：青色是旧层已编译的 O(1) 快表直读弦、事后零损失域 `retrospectiveLoss = 0` 与内圈收敛弧，品红是场内平权条目撑开的正交法向残差 sin ε e_{D+1}、跨维新增未索引比量 ΔΠ_t − k、对角逃逸串 g_diag 劈开的 `separationDeficit` 亏损对与外圈未决生长锋面，紫色是三元格拉姆体积砖 det G = sin⁴ε > 0、`conceptJoin` 立起的新观测坐标轴与序数塔阶梯，琥珀只给当前指针前沿层 D_t、刚写入的平权表项 P_AB 与可调夹角/阶数手柄（严禁把开放问题红色拿来画普通负号或死寂侧底色；红色只给抽屉里的标准图灵机 `P =? NP` `OPEN` 标记）。绿色框严格只给 `#thm-ch38-uncompleted-horizon-diagonal-refinement` 用 `lean=` 引用的五条冻结定理（`self_application_fragment_package`、`complete_diagonal_separationDeficit_nonempty`、`complete_diagonal_strict_topology_refinement`、`lookup_copy_zero_loss_and_nonanticipating_failure`、`finite_layer_projection_escape`）；哥德尔 1931 第一不完备定理与 1956 致冯·诺依曼有界寻证信件、图灵 1939 序数逻辑阶梯与 Lawvere 1969 对角不动点定理标 `ARGUED`；标准统一图灵机 P =? NP 标 `OPEN`；det G = sin⁴ε、ΔΠ_t = kM_t + C(k,2) 与有限满射目录对角分离亏损对枚举实算标 `NUM`；Layer-1 正向单位平权建表、滚动完成化地平线与免于芝诺冻结/全知热寂的宇宙护栏读法标 `MODEL`。

`stereographic-relativization-sandbox`（`STEREO//SUSPENSION`）与 `uncompleted-horizon-sandbox`、`sphere-escape`、`forgetting-rebirth-attractor` 分工：前三页分别讲对角加细驱动的滚动地平线、有限多边形割圆与双曲快度阶梯，本页讲第三十八章 §38.7 `#sec-ch38-stereographic-blindspot-relativization-suspension` 的“北极自指盲点球极投影、亚历山德罗夫紧化同伦、Baker–Gill–Solovay 相对化神谕切面二象性与四句离相悬置”：舞台用 `kit.solid` 画半透明受光紧致球面 S²、经纬测地网格、北极自指盲点琥珀孔径环 δ_blind、球面上平缓走向北极的青色本源微弧，以及赤道投影平面上向外发散的投影螺旋环与可倾转的神谕切面 ψ ∈ [0°, 90°]。青色是紧致球面上的有限本源微弧与 ψ = 0° 赤道对称核上的折叠环（对应 P^A = NP^A 坍缩截面），琥珀是北极自指盲点孔径环 δ_blind、当前投影视线与赤道平面上的透视发散坐标环，品红是 ψ > 0° 偏转神谕切面上的表观追逐分离轨迹（对应 P^B ≠ NP^B 截面）与全称封顶缺口警示弧，紫色是可倾转的神谕切面环与紧化同伦插值骨架（红色只给抽屉里的 `#conj-p-neq-np` 与 `#prob-ch38-unrelativized-p-vs-np-and-independence` `OPEN` 标记，绝不在舞台上画红）。绿色框严格只给 `#prop-ch38-cayley-stereographic-and-blindspot-suspension` 用 `lean=` 引用的四条冻结定理（`cayley_ratio_norm_one_iff_critical_line`、`diagonal_prime_observables_cannot_recover_relative_phase`、`partition_inseparable_iff_kernel`、`lookup_copy_zero_loss_and_nonanticipating_failure`）；高维球极微分同胚与亚历山德罗夫单点紧化、Baker–Gill–Solovay 1975 相对化屏障、Razborov–Rudich 1997 自然证明屏障、Aaronson–Wigderson 2009 代数化屏障、哥德尔第二不完备定理与龙树《中论》四句离相标 `ARGUED`；非相对化 P =? NP 及其在 PA/ZFC 中的可证性或独立性标 `OPEN`；R(θ) = cot(θ/2)、μ(θ) = (1 − cos θ)^−1、Δ_unprovable = sin²(δ_blind/2) 与切面分离指数 r(ψ) 实算标 `NUM`；自指盲点双生投影、同伦 τ ∈ [0, 1]、神谕切面几何映射与四句离相止息标 `MODEL`。

`berry-sector-path-sandbox`（`BERRY//PATH`）与 `spherical-trihedron-cell`、`berry-loop`、`lattice-gauge-loop`、`coherence-handshake-causality` 分工：前四页分别讲直角三面角原胞的“一次 vs. 两次”正交双投影、整球环路立体角与毛球发旋、二维方格晶格规范弦回路、斯涅尔双端握手，本页讲第三十四章 §34.6 `#sec-ch34-berry-sector-volume-and-path-integral` 的“球心扇锥体积 V_sector = A_cap/3 = Ω/3、同点异相霍普夫 S¹ 纤维抬升、威尔逊路径—相位和乐对偶、离散巴格曼扇形剖分与费曼科纽螺线驻相选路”：舞台用 `kit.solid` 画半透明受光单位比较球面 S²、从球心围出的品红三维实心球扇锥与品红球面帽（严禁把球面帽或实心扇锥写成金色或琥珀色）、内嵌的青色平直弦四面体 OABC、右侧堇紫色霍普夫 S¹ 相位纤维柱，以及底部二维复平面科纽相量螺线与体积对照面板（舞台上绝不画红色，本节亦无 `OPEN` 条目）。青色是单步基准测地弧 Γ₁ = AC、平直弦四面体 V_tetra = (1/6) sin²ε、生成树 T 的无曲率树势 `rootPhase` 与测地驻点 η₀ = 0 附近的相长合矢量；品红是球面帽面积 A_cap = Ω、三维实心球扇锥体积 V_sector = Ω/3、闭合弦回路曲率通量与偏折弯路 η₀ ≠ 0 处自相抵消的科纽螺线；紫色是终点 C 上方的霍普夫 S¹ 相位纤维柱、旋量历史提升螺旋与离散巴格曼—潘查拉特纳姆扇形肋片；琥珀只给当前偏折路径 Γ(η) 与可拖步长/偏折手柄（ε、η₀）。绿色框严格只给 `#thm-ch34-berry-sector-holonomy-and-bargmann-lift` 用 `lean=` 引用的六条冻结定理（`triple_bargmann_bloch`、`bargmann_path_product`、`no_continuous_global_section`、`circle_double_cover_history_lift`、`selected_tree_transport`、`anchored_phase_classification`；正文 §34.6 例题另以推论引用 `latitude_dot`）；吉拉尔角超与高斯—博内定理、Pancharatnam–Bargmann–Simon–Berry 几何相位、Hopf–Dirac 主圆丛 S¹ ↪ S³ → S² 与 2s ∈ ℤ 量子化、Wess–Zumino / WZW 拓扑体积延拓、Mandelstam–Giles–Barrett 模局部规范等价重构联络定理及 Feynman–Klauder 自旋相干态路径积分标 `ARGUED`；三维斯托克斯扇锥体积 V_sector = Ω/3 对照 V_tetra = (1/6) sin²ε、余纬 60° 正 N 边形扇形积 Π_N = (3/4 + e^(2πi/N)/4)^N 与 41 路路径束科纽相干度 |A₄₁(η₀)| 实算标 `ARGUED` / `NUM`；公平平方基点残影、扇锥体积纤维账本与有限路径束驻相选路综合标 `MODEL`。

`standing-wave-volume-sandbox`（`VOLUME//STANDING`）与 `berry-sector-path-sandbox`、`phase-gears` 分工：前两页分别讲单枚球扇锥体积与有限周期齿轮梳，本页讲第三十四章 §34.7 `#sec-ch34-standing-wave-volume-emergence` 的“同一点多路相位汇聚、无理失配绕圈抵消成虚空、整圈玻尔—索末菲锁相与驻波体积涌现”：舞台用 `kit.solid` 画单位球 S² 上的极小球面扇形 ΔT_ε、从根 A 汇向候选点的 M 条比较路径与按驻波振幅 |Ψ_M|^(2/3) 呼吸缩放的 63 枚候选胞体；青色是锁相路径与驻波实轴同相分量，品红是异相抵消环与横向残差，紫色是闭合回路和乐与凝聚出的驻波体积胞，琥珀只给当前步长手柄与选中的汇聚点。绿色框严格只给页面引用的七条冻结定理（`selected_tree_transport`、`anchored_phase_classification`、`bargmann_path_product`、`triple_bargmann_bloch`、`continuous_average_tendsto_haar`、`sum_annihilator_character`、`phase_locked_overlap_is_rotated_real`）；Van Oosterom–Strackee 球面三角形立体角公式与扇形体积 Ω/3、三态潘查拉特纳姆—贝里相位及玻尔—索末菲回路量子化条件标 `ARGUED`；复相量和 Ψ_M、树上相位搬运与规范变换、锁定残差及 12 槽特征和实算标 `NUM`；等距步长 kδ、无理背景步长与“实体体积自驻波涌现”诠释标 `MODEL`。

`clifford-monad-tiling-sandbox`（`MONAD//TILING`）与 `spherical-trihedron-cell`、`blade-multiplication` 分工：前两页分别讲单枚三面角的“一次 vs. 两次”投影与八刀片异或乘法表，本页讲第三十四章 §34.8 `#sec-ch34-clifford-monad-tiling` 的“N = 1 单胞四阶（点权、路径梯度、贝里角超、扇锥体积）合一与多胞拼接 ∂² = 0 内部边界成对抵消”：舞台用 `kit.solid` 画 ΔT_ε 的 k² 测地球面剖分与半径 0.4 至 1 之间的 3×3×3 体胞壳，通过混合参数 λ ∈ [0, 1] 连续拉动内部共享边与共享面的正反抵消；青色是 Λ⁰ 内积点权与 Λ¹ 外沿测地路径，品红是 Λ² 球面帽角超与反向抵消边界，紫色是 Λ³ 扇形体积胞与霍奇对偶法轴，琥珀只给当前步长 ε 与抵消混合滑块手柄。绿色框严格只给页面引用的六条冻结定理（`lagrange_gram_identity`、`unit_perpendicular_pair`、`triple_bargmann_bloch`、`projection_probability_flow`、`face_cycle_exact`、`tetra_defects_incidence_repair_and_exactness`）；吉拉尔角超、高斯—博内与斯托克斯定理、链复形 ∂² = 0 及 Cl(3,0) 霍奇对偶标 `ARGUED`；剖分欧拉示性数 V − E + F = 2、沿边平行移动标架角 ±δΓ 抵消与二上链缺陷实算标 `NUM`；单胞四阶合一与宏观按 N⁰、N^(1/3)、N^(2/3)、N¹ 分流的几何诠释标 `MODEL`。

`reversal-diagonal-cascade-sandbox`（`REVERSAL//CASCADE`）与 `comparison-oisc-engine`、`uncompleted-horizon-sandbox` 分工：前两页分别讲八槽比较原语与建表扩维滚动地平线，本页讲第三十四章 §34.9 `#sec-ch34-reversal-diagonal-and-concept-cascade` 的“格拉姆行列式逐阶溢出（点 → 线 → 面 → 体 → 时间）、来路表对角逃逸与‘反者道之动’双侧正交切口”：舞台用 `kit.solid` 画锚点张成子空间与正交逃逸残差箭头、第四轴相位碰撞螺旋及来路切口；青色是落入已有子空间的内积投影 P_M 与可达路径，品红是正交补逃逸单位向量 e ∈ S⊥、对角翻转串 Γ_diag 与边界折回切口，紫色是三锚/四锚体积砖与相位螺旋，琥珀只给当前比较信息档位 I_cmp 与耦合手柄 κ₋。绿色框严格只给页面引用的九条冻结定理（`unit_gram_overlap_characterization`、`two_anchor_gram_det_pos_iff`、`three_anchor_gram_det_pos_iff`、`finite_layer_projection_escape`、`lowersEscape_iff_strict_kernel_novelty`、`relative_semantic_diagonal_ne_listed_decode`、`complete_diagonal_strict_topology_refinement`、`orthogonal_complement_projection_identities`、`double_orthogonal_complement_eq_closure`）；康托尔 1891 对角论证、哥德尔 1931 对角构造与香农二元熵 H₂ 标 `ARGUED`；ℝ⁴ 锚点格拉姆行列式、整数分子投影矩阵、K×K 来路对角翻转与有限竞技场逃逸对实算标 `NUM`；“反者道之动”双侧切口诠释与阈值步长模型标 `MODEL`。

`trihedron-rigidity-truss-sandbox`（`TRUSS//RIGIDITY`）与 `spherical-trihedron-cell` 分工：前一页固定看单枚直角三面角原胞，本页讲第三十四章 §34.10 `#sec-ch34-trihedron-rigidity-and-3d-stability` 的“N 个概念（3 ≤ N ≤ 8）全连通可比图 K_N 球面桁架、四连杆 C₄ 软模晃动对比正四面体 K₄ 静定锁死三维、以及 N ≥ 5 麦克斯韦—拉曼盈余边 ΔE(N) = (N−3)(N−4)/2 化作雷吉铰链角亏”：舞台用 `kit.solid` 画单位比较球面 S² 上的概念节点与测地比较弧杆；青色是生成树/刚性骨架弧杆，品红是软模剪切变形差与五四面体绕棱 7.356° 雷吉角亏，紫色是 K₄ 满秩三维体积核与整体刚性转动轴，琥珀只给当前节点数 N、微扰幅度与对角撑杆应力手柄。绿色框严格只给页面引用的八条冻结定理（`exists_unitary_mul_eq_of_conjTranspose_mul_eq`、`bloch_geometry_of_isHermitian`、`three_anchor_gram_det_formula`、`three_anchor_gram_det_pos_iff`、`fs_angle_triangle`、`two_axis_finite_word`、`face_cycle_exact`、`tetra_defects_incidence_repair_and_exactness`）；麦克斯韦 3N − 6 计数与亨内贝格加点、等边球面三角公式及雷吉离散引力角亏标 `ARGUED`；格拉姆表最大差 max|ΔG|、保边长软模剪切（偏差 < 10⁻¹²）、2^F 标号枚举与立体角二上链缺陷实算标 `NUM`；概念桁架诠释与雷吉辉光示意标 `MODEL`。

`quantum-arc-macro-integral-sandbox`（`ARC//MACRO`）与 `berry-sector-path-sandbox`、`erasure-ledger` 分工：前两页分别讲单扇锥贝里相位与单比特捏合热账本，本页讲第三十四章 §34.11 `#sec-ch34-quantum-arc-and-macro-integral` 的“微观量子极小圆弧微分元（二阶矢高 1 − cos ε 与费曼—伊藤 ε = Θ/√N 二次变差）经路径积分驻相相消缝合出惯性直线、力场弯曲轨道、雷吉曲率与热熵四条宏观通道”：舞台用 `kit.solid` 画球面微弧锯齿链与 41 条拱形路径束；青色是切向弦步与驻相相长脊线（惯性测地线），品红是圆弧鼓出矢高 1 − cos ε、离壳相消路径与捏合删除相干，紫色是双覆叠 360° 换叶提升与规范曲率通量，琥珀只给当前分割数 N、总张角 Θ 与相位梯度手柄。绿色框严格只给页面引用的九条冻结定理（`lagrange_gram_identity`、`exp_tail_le`、`trotter_product`、`robertson_schrodinger`、`circle_double_cover_history_lift`、`exists_golden_modelSet_delone`、`bargmann_path_product`、`tetra_defects_incidence_repair_and_exactness`、`entropy_production_coherence_deletion_identity`）；伊藤二次变差 (dW)² = dt、费曼驻相近似 δS = 0、斯托克斯曲率类比与雷吉铰链曲率标 `ARGUED`；累计矢高、so(3) 特罗特误差、σ_x/σ_y 方差分解与捏合熵增实算标 `NUM`；41 路拱形路径束、伊藤锯齿链与微积分对偶诠释标 `MODEL`。

`triadic-arc-field-loop-sandbox`（`TRIAD//LOOP`）与 `qubit-geometry`、`standing-wave-volume-sandbox` 分工：前两页分别讲单比特线面二象与多路锁相体积，本页讲第三十四章 §34.12 `#sec-ch34-triadic-duality-and-field-loop` 的“同一枚极小圆弧按 O(ε¹)、O(ε²)、O(ε³) 展开为线粒子、面波与体场，并经 ℤ/12ℤ 泊松/零化子相消回环由场反生定域粒子”：舞台用 `kit.solid` 画挖开第一卦限缺口的单位球原胞与外围 12 格点回环；青色是一阶切向半弦 sin ε（线/粒子世界线）与壳上同相峰，品红是二阶法向矢高与球面角超 Ω（面/波干涉）及壳外 120° 异相抵消项，紫色是三阶实心扇锥体积 Ω/3（体/场凝聚），琥珀只给当前圆弧张角 ε 与回环缠绕手柄。绿色框严格只给页面引用的九条冻结定理（`finite_poisson_summation`、`sum_annihilator_character`、`continuous_average_tendsto_haar`、`orthogonal_complement_projection_identities`、`lagrange_gram_identity`、`two_axis_finite_word`、`three_anchor_gram_det_pos_iff`、`triple_bargmann_bloch`、`tetra_defects_incidence_repair_and_exactness`）；吉拉尔角超、扇锥体积 Ω/3、Λᵏ(ℝ³) 在 k > 3 截断为零与驻相选路标 `ARGUED`；正交补投影误差、2×2 复矩阵巴格曼迹与 ℤ/12ℤ 离散傅里叶/特征和实算标 `NUM`；“一弧生三相”与“反者道之动”互积回环诠释标 `MODEL`。

`octave-point-volume-field-sandbox`（`OCTAVE//FIELD`）与 `clifford-monad-tiling-sandbox`、`blade-multiplication` 分工：前两页分别讲多胞边界相消与八刀片乘法，本页讲第三十四章 §34.13 `#sec-ch34-point-volume-octave-and-particle-field` 的“三维外代数 1—3—3—1 霍奇对偶把本层闭合体归零重整为下一层的点（Λ³_ℓ ≡ Λ⁰_{ℓ+1}），配对格点汤川格林互逆、Delone 紫外穿衣与位置—动量泊松直通”：舞台用 `kit.solid` 画八度螺旋 s = (z + 1)/4 上的点·线·面·体四阶标架与 (ℤ/9ℤ)³ 格点汤川场丝；青色是一阶三条线 e₁, e₂, e₃ 与格点点源，品红是霍奇对偶的三块正交面 e₂₃, e₃₁, e₁₂ 与格林残差，紫色是闭合体积元 e₁₂₃ 重整化为上一层/下一层场体的包络，琥珀只给当前八度螺旋位置 z ∈ [−1, 3] 与探针手柄。绿色框严格只给页面引用的十条冻结定理（`unit_gram_overlap_characterization`、`three_anchor_gram_det_formula`、`triple_bargmann_bloch`、`orthogonal_complement_projection_identities`、`finite_record_pinching_idempotent`、`golden_helix_fourier_readout_step`、`level_fourier_joint_readout_detects_step`、`finite_poisson_summation`、`sum_annihilator_character`、`exists_golden_modelSet_delone`）；环面拉普拉斯 DFT 对角化与汤川格林函数连续极限 e^(−mr)/(4πr)、三维霍奇星算子标 `ARGUED`；(ℤ/9ℤ)³ 上 729 格点精确三维 DFT 格林函数、8 维阶捏合与 ℤ/12ℤ 泊松求和实算标 `NUM`；八度螺旋重整化与堆积半径 1/2 紫外穿衣诠释标 `MODEL`。

`lorentz-pseudoscalar-sm-octave-sandbox`（`LORENTZ//OCTAVE`）与 `rapidity-lightcone`、`lattice-gauge-loop` 分工：前两页分别讲 1+1 维双曲快度推动与二维方格 U(1) 回路，本页讲第三十四章 §34.14 `#sec-ch34-lorentz-pseudoscalar-and-sm-octave` 的“纯正定三维体积伪标量平方 I₃² = −1 导出洛伦兹负号与固有时驻波预算，并将标准模型 U(1)×SU(2)×SU(3) 的 1—2—3 规范阶、三色反对称重子禁闭与 π 介子汤川核力纳入跨层八度”：舞台用 `kit.solid` 画三维立方体角伪标量旋面、固有时光锥预算锥及三色重子闭环；青色是空间位移 β 与一阶线联络，品红是双向量规范曲率面与重色退化警告（非开放问题不用红色），紫色是闭合三维体伪标量 I₃ = e₁e₂e₃（I₃² = −1，固有时驻波轴）与三色满秩重子体 det G₃ = 1，琥珀只给当前速度 β ∈ [0, 1] 与八度档位手柄（红色只给抽屉里的杨—米尔斯质量间隙、色禁闭解析证明、手征格点费米子与三代起源四项 `OPEN` 标记）。绿色框严格只给页面引用的十二条冻结定理（`qubit_weyl_star`、`B_formula_core`、`bogoliubov_norm_conservation`、`eq_smul_minkowski_of_null`、`fullC_CAR`、`fullC_anticomm_of_lt`、`selected_tree_transport`、`anchored_phase_classification`、`two_axis_finite_word`、`three_anchor_gram_det_pos_iff`、`finite_record_pinching_idempotent`、`finite_poisson_summation`）；Cl(3,0) 伪标量与巴伊利斯副矢量洛伦兹度规、杨—米尔斯理论、电弱统一、QCD 色单态与汤川核力势标 `ARGUED`；2×2 复矩阵 I₃²、8×8 费米子反对易矩阵、三色格拉姆行列式与 ℤ/12ℤ 泊松通量实算标 `NUM`；空间闭合成时与标准模型跨层八度诠释标 `MODEL`。

`quantum-gate-cosmic-tower-sandbox`（`GATE//TOWER`）与 `zyz-compile`、`unified-field-slice` 分工：前两页分别讲单比特欧拉角编译与统一场五切面，本页讲第三十四章 §34.15 `#sec-ch34-quantum-gate-and-cosmic-concept-tower` 的“正交单比特门换位子回路与双比特 Segre 纠缠门直接张开极小圆弧体 ΔT_ε，按 1—3—3—1 四拍语法自底向上贯通 L0–L5 六层宇宙概念塔并经 4π 旋量莫比乌斯回环归零”：舞台用 `kit.solid` 画布洛赫球四步换位缺口、Segre 纠缠环面球极切片、六层概念塔重整化漏斗与顶层 4π 单侧莫比乌斯带；青色是单门测地圆弧与 L0–L5 线态传播，品红是四步换位缺口、吉拉尔角超与跨可分簇的共生度楔积，紫色是闭合三面角体积砖与 4π 旋量双覆叠回环，琥珀只给当前门转角 ε、纠缠角 η 与概念塔层号手柄（红色只给抽屉里的连续统规范质量间隙与 3+1 维量子引力两项 `OPEN` 标记）。绿色框严格只给页面引用的十三条冻结定理（`lagrange_gram_identity`、`qubit_weyl_star`、`B_formula_core`、`two_axis_finite_word`、`chsh_square_eq_four_of_local_pair_commutes`、`bell_pure_state_has_maximally_mixed_marginal`、`three_anchor_gram_det_pos_iff`、`fullC_CAR`、`anchored_phase_classification`、`finite_poisson_summation`、`eq_smul_minkowski_of_null`、`entropy_production_coherence_deletion_identity`、`circle_double_cover_history_lift`）；正交双门换位子迹 1 − 2 sin⁴(ε/2)、Wootters 两比特共生度与 Segre 簇及 Horodecki CHSH 极值标 `ARGUED`；换位子闭式对比、4 维态共生度、Dottie 不动点残差与 U(2π) = −I / U(4π) = +I 实算标 `NUM`；“量子门 ≡ ΔT_ε”与六层宇宙概念塔诠释标 `MODEL`。

`coset-breaking-conservation-tower-sandbox`（`COSET//TOWER`）与 `quantum-gate-cosmic-tower-sandbox`、`lattice-gauge-loop` 分工：前两页分别沿纵向攀登 L0–L5 概念塔与演示平面方格规范回路，本页讲第三十四章 §34.16 `#sec-ch34-coset-breaking-conservation-towers` 的横向纬线——“对称破缺与诺特守恒共分同一笔勾股比较预算 cos²ε + sin²ε = 1，经嘉当—CCWZ 毛雷尔—嘉当曲率拆账与安德森—希格斯 2 + 1 = 3 / Skyrmion π₃(S³) = ℤ 双通道闭合成体，贯通引力、电弱、强核、超导与认知共识五座概念塔”：舞台用 `kit.solid` 画势能墨西哥帽圆槽 G/H、陪集球面三面角、Skyrmion 刺猬孤子与超导阿布里科索夫半磁通涡旋晶格；青色是未破缺稳定子锚点守恒份额 cos²ε 与戈德斯通无能隙流/联络，品红是破缺陪集份额 sin²ε、嘉当曲率二形式 Fⁱ = −½ fⁱ_{ab} eᵃ∧eᵇ 与磁通涡核，紫色是吞弧成体的 2 + 1 = 3 有质量玻色体与 Skyrmion 拓扑重子体，琥珀只给当前真空锚点 v₀、破缺倾角 ε 与规范耦合手柄（红色只给抽屉里的非微扰杨—米尔斯质量间隙/手征禁闭与完整量子引力 `OPEN` 标记）。绿色框严格只给页面引用的十二条冻结定理（`partition_inseparable_iff_kernel`、`lagrange_gram_identity`、`covariant_commutator_formula`、`two_axis_finite_word`、`anchored_phase_classification`、`three_anchor_gram_det_pos_iff`、`bogoliubov_norm_conservation`、`eq_smul_minkowski_of_null`、`monitored_return_conservation`、`finite_poisson_summation`、`entropy_production_coherence_deletion_identity`、`objective_claim_requires_invariant_common_factor`）；CCWZ 毛雷尔—嘉当曲率方程、戈德斯通定理、安德森—希格斯机制、Skyrme 模型与伦敦—BCS—阿布里科索夫半磁通量子 Φ₀ = h/(2e) 标 `ARGUED`；SU(2)/U(1) 曲率残差、电弱自由度 12 = 9 + 2 + 1、在壳 sin²θ_W 与轻夸克重整化流质量参数朴素标度比较（明确写明不是核子物理质量的分解比例）实算标 `NUM`；五座破缺—守恒概念塔及其四拍接力诠释标 `MODEL`。

`bounded-horizon-thermodynamics-sandbox`（`HORIZON//THERMO`）与 `entanglement-entropy-complexity`、`erasure-ledger` 分工：前两页分别讲 16 比特面积律/体积律键维墙与单比特捏合复位账本，本页讲第三十四章 §34.17 `#sec-ch34-entanglement-horizon-and-thermodynamics` 的“受限不妄我偏迹截断、12 比特首尾嵌套六对纠缠弧的 Page 形切口熵 S(A) = min(N_A, 12 − N_A) S_A(θ)、谱匹配模流温度 k_B T_eff/ΔE = 1/(2 ln cot θ) 与冻石 0°—Dottie 稳态 θ*—热寂 45° 三界对照”：舞台用 `kit.solid` 画 12 颗比特底座、6 条嵌套三维圆弧管、罩住前 N_A 颗比特的琥珀视界穹顶、后排 Page 切口柱与右侧施密特刻度盘；青色是完整闭合在视界内或外的零熵纠缠弧与内积求同权重 cos²θ，品红是被视界膜一刀切断的跨界半截弧、跨界纠缠权重 sin²θ 与每对施密特熵 S_A(θ)，紫色是绕品红切口流转的富田—竹崎模流相位珠 e^(is·2 ln cot θ) 与模温度读数，琥珀只给当前视界右脚手柄 N_A 与当前施密特角手柄 θ（严禁把绿色拿来画 θ* 稳态柱或稳态圆弧；红色只给抽屉里的量子引力黑洞信息问题 `OPEN` 标记）。绿色框严格只给页面引用的十五条冻结定理（`marginalRight_productState`、`marginalLeft_productState`、`bell_pure_state_has_maximally_mixed_marginal`、`local_marginal_correlation_blind_spot`、`reduced_irreversibility_is_access_defect`、`escapePairs_without_eq_union`、`pinching_hilbert_schmidt_pythagorean`、`entropy_production_coherence_deletion_identity`、`gibbs_relative_entropy_energy_difference`、`marginal_entropy_change_eq_mutual_information_change`、`landauer_identity_from_balances`、`landauer_bound_of_balance`、`landauer_saturation_iff`、`extended_quantum_relative_entropy_channel_dpi`、`rational_inverse_endpoint`）；富田—竹崎模理论、比索尼亚诺—威奇曼定理与安鲁温度、纠缠第一定律 δS = δ⟨K⟩、兰道尔擦除原理及 Page 哈尔平均熵标 `ARGUED`；12 比特显式配对切口计数、2 ln cot θ、dE/dS 数值导数、安鲁等效换算与二分法解 θ* 标 `NUM`；显式嵌套配对模型（明确写明不是哈尔平均 Page 熵）、吉布斯谱匹配参数化与“冻石—自指稳态—热寂”读法标 `MODEL`。

`gram-window-consensus-sandbox`（`GRAM//CONSENSUS`）与 `gram-causal-elliptope`、`observer-consensus-decoherence`、`dream-pre-decoherence-deja-vu` 分工：前三页分别讲三步椭圆体切片、多观察者二阶指针张量 M_cons 与梦境离线捏合快表，本页讲第三十四章 §34.18 `#sec-ch34-gram-window-and-consensus` 的“有限记忆滑动格拉姆窗口 W_M、加边舒尔补裕度 Δ = 1 − cᵀG_M⁺c、单位球面 S² 上黄金角螺旋相干帽交集走廊 Ω_M 的过约束锁死与遗忘重开 q_M = ln(|Ω_{M−1}|/|Ω_M|)、以及两位观察者联合接受窗 Ω_A ∩ Ω_B 的共同遗忘修复”：舞台用 `kit.solid` 画受光方向球面 S²、最近 M 条记录的相干球冠、曲边多边形可行走廊与 M = 9 针尖区的球心投射放大镜；青色是观察者 A 的可行走廊 Ω_M、锚点张成大圆与等相关族舒尔补曲线，品红是收紧走廊的相干帽边界弧、候选态离开锚点平面的高度弧、M = 10 空走廊警告与刚被遗忘撤除的旧帽虚线残迹（严禁用红色标负舒尔补或空走廊；红色只给抽屉里的低秩非弦图补全与非平衡遗忘热力学 `OPEN` 标记），紫色是伴生观察者 B 的相干帽与双观察者重叠共识区 Ω_A ∩ Ω_B，琥珀只给球面上可自由拖动的当前候选态 x 与当前窗口深度刻度 M。绿色框严格只给页面引用的十三条冻结定理（`unit_gram_overlap_characterization`、`two_anchor_gram_det_formula`、`two_anchor_gram_det_pos_iff`、`three_anchor_gram_det_formula`、`three_anchor_gram_det_pos_iff`、`gram_realizability`、`exists_unitary_mul_eq_of_conjTranspose_mul_eq`、`orthogonal_complement_projection_identities`、`finite_layer_projection_escape`、`finite_memory_history_capacity`、`surviving_copy_blocks_reversal`、`objective_claim_requires_invariant_common_factor`、`landauer_bound_of_balance`，其中最后一条在 §34.17 定理环境中引用，本页写明把 −ΔS 读成 q_M 仍需均匀可达体积与等温重置模型）；球面圆弧多边形高斯—博内面积公式、Albert (1969) 伪逆舒尔补判据、Grone–Johnson–Sá–Wolkowicz (1984) 弦图半正定补全定理与兰道尔原理标 `ARGUED`；高斯—博内精确走廊面积与斐波那契求积交叉核对、雅可比谱分解伪逆与秩 ≤ 3 块格拉姆谱（明确写明 2M > 3 时 λ_min(K) = 0 精确成立）实算标 `NUM`；黄金角螺旋记录、均匀可达体积等温重置假设以及“芝诺—拉普拉斯死锁 / 宽容即共同遗忘”诠释标 `MODEL`。

`roundtrip-born-imaginary-blindspot-sandbox`（`ECHO//IMAGINARY`）与 `pairwise-shutter`、`repeated-projection`、`fairness-square-uncertainty-expansion` 分工：前三页分别讲快门离散抽样计数、布洛赫球未读捏合幂等与开口螺旋算术逃逸，本页讲第三十四章 §34.19 `#sec-ch34-roundtrip-projection-and-imaginary-blindspot` 的全章收官命题——“观察者站在自身轴 I 上看不见 90° 垂直盲平面 span{e₁, e₂}，单程只得青色影子 cos θ，往返双投影 I → (cos θ)V → (cos²θ)I 才给出琥珀玻恩回声 cos²θ，而转进 90° 盲区的那一下正是虚数 i（×i² = −1）与薛定谔保范圆弧时间引擎 e^(−iωt)”：舞台用 `kit.solid` 画观察者轴 I、与 I 垂直的品红盲平面圆盘、等倾角紫色方位锥、两段折返雷达脉冲与盛住画面的下半球碗，顶部切换外部三维、沿 I 轴侧看盲边与转 90° 基俯视盲平面三种视角；青色是单程投影影子 cos θ、两段折返投影线与薛定谔保范圆弧轨迹，品红是 90° 垂直盲平面、逃逸高度 sin θ 与盲区亏量 sin²θ，紫色是 360° 等倾角方位盲锥与 ×i 双直角旋子平面，琥珀只给观察者基准轴 I、可拖动的当前态矢 V 与落回 I 轴的当前玻恩回声点 cos²θ（实数衰减对照线用中性虚线，红色只给抽屉里的测量单结果问题 `OPEN` 标记）。绿色框严格只给页面引用的十条冻结定理（`rank_one_born_pairing_weight`、`born_probability_skeleton`、`lagrange_gram_identity`、`orthogonal_complement_projection_identities`、`partition_inseparable_iff_kernel`、`diagonal_prime_observables_cannot_recover_relative_phase`、`robertson_schrodinger`、`square_eq_neg_one_of_skewAdjoint_unitary`、`projection_probability_flow`、`energy_eigenstate_stationary`）；玻恩定则、马吕斯 cos²θ 偏振律与笛卡尔 1637 年“imaginaires”词源标 `ARGUED`；cos θ、cos²θ、sin²θ、锥冠立体角 2π(1 − cos θ)、盲圆周长 2π sin θ、换位子界 |sin 2θ sin φ|、e^(−2t) 与牛顿法解 θ* 实算标 `NUM`；三维单位向量画法（显式标明布洛赫极角为 2θ）与“对于我 I 看不见即为虚 i”第一人称诠释标 `MODEL`。

`trihedron-chord-pivot-tunneling-sandbox`（`CHORD//TUNNEL`）承接第三十四章 §34.26 `#sec-ch34-chord-tunneling-and-pivot-renormalization`，与 `spherical-trihedron-cell`、`octave-point-volume-field-sandbox`、`arithmetic-schur-lab` 分工：前三页分别讲单枚三面角原胞的“一次/二次正交”球面投影、外代数 1—3—3—1 格点格林互逆与整除图精确高斯舒尔消元，本页讲极小圆弧体 ΔT_ε 的“正交双侧壁爬坡 2ε、外凸球面顶盖测地弧 arccos(cos²ε) 与体内平直割弦 √2 sin ε 三路严格序、六点最小—加热带舒尔消元、向心多尺度枢轴全息锥（Λ⁰_ℓ → Λ²_ℓ → Λ³_ℓ ≡ Λ⁰_{ℓ+1}）及共振枢轴中继对比芝诺排序探针”：舞台把单位球上的 ΔT_ε 画成受光实体；紫色给两面正交侧壁 OAB、OBC（2ε，在直角顶点 B 付全局排序比较税）与枢轴锥层级骨架，品红给外凸球面顶盖测地弧 arccos(cos²ε)、角超 Ω 与被平直内割削掉的新月形鼓包，青色给穿过体内的平直内割弦 √2 sin ε（弦中点半径 r_mid = √((1 + cos²ε)/2)，下沉深度 Δr = 1 − r_mid），琥珀只给可拖动的张角手柄 ε、沿路推进的当前读头与当前选定枢轴（本页无开放问题标记，不用红色）。绿色框严格只给页面引用的五条冻结定理（`fs_angle_triangle`、`lagrange_gram_identity`、`partition_inseparable_iff_kernel`、`exists_posSemidef_completion`、`concept_fiber_decomposition`，其中 `concept_fiber_decomposition` 准确写明是任意读出映射下的余纤维依值求和分解 X ≃ Σ_{b:B} ConceptFiber(q_C, b)，而非内积正交分解；`exists_posSemidef_completion` 只保证弦图团半正定矩阵存在全局半正定补全，不提供构造算法）；Dijkstra（1959）、Fredman–Tarjan（1987）、全序输出 Ω(n log n) 比较下界、Duan–Mao–Mao–Shu–Yin（STOC 2025）无需输出全序的确定性 O(m log^(2/3) n) 单源最短路算法、Agmon（1982）瞬子衰减度规、Tsu–Esaki（1973）共振隧穿、Misra–Sudarshan（1977）量子芝诺效应与弦图团—分隔集补全公式标 `ARGUED`；ε ∈ [10°, 90°] 逐度核对三路严格不等式、Δr_bulk、六点最小—加矩阵克莱尼星对比逐点热带消元、双势垒转移矩阵透射率与芝诺转移 1 − cos²ⁿ(π/2n) 实算标 `NUM`；ΔT_ε 三面寻路解剖、谢尔宾斯基顶盖对分枢轴八度与全息体锥及共振阱珠示意标 `MODEL`。

`imaginary-chord-temporal-double-slit-sandbox`（`IMAG//TUNNEL`）承接第三十四章 §34.27 `#sec-ch34-imaginary-chord-tunneling-and-temporal-double-slit`，与 `roundtrip-born-imaginary-blindspot-sandbox`、`scattering-temporal-bridge`、`double-slit-marker` 分工：`roundtrip-born-imaginary-blindspot-sandbox` 讲有限维单态往返投影 cos²θ 与 90° 盲平面定义虚数 i，`scattering-temporal-bridge`（§34.19.5，无绿色框）专门检验势垒内增长/衰减两支指数解 Ae^(κx) + Be^(−κx) 共同输运守恒流以及单能量标记重叠 ⟨m₁|m₂⟩ 完全相消条件，而本页以真实物理单位电子（V₀ = 1.00 eV，E/V₀ ∈ [0.10, 1.40]，L ∈ [0.20, 1.20] nm）同台打通“空间 90° 虚平面割弦隧穿、阿秒双时间快门 (t₁, t₂) 能谱频率梳 ΔE = h/Δt 与中途实轴探针 / 芝诺退相干崩解”：舞台直接画定态 ψ(x)e^(−iEt/ℏ) 以及沿传播轴 x 正交相交的竖直实平面 I（后墙投影屏）与水平盲平面 i（地面投影屏），顶部切换实轴平视 I、90° 俯瞰虚平面 i 与三维全貌；青色给实平面 I 上的投影影子、出墙透射波与右侧能谱干涉明纹梳，品红给 90° 盲平面 i 上的投影影子、墙内单调不绕圈的内割衰减弦桥（κL ≫ 1 时贴近 e^(−κx)）与被中途捏合丢弃的副对角相干质量，紫色给墙口/墙尾 ±90° 动量偏转四分之一圆弧与条纹间距/相位读数，琥珀只给势垒右缘宽度手柄 L、能谱屏能量游标 E* 与当前时刻波前读头（红色只给抽屉里关于停留时间、Büttiker–Landauer 时间与拉莫尔时间实验对应关系的 `OPEN` 标记）。绿色框严格只给页面引用的六条冻结定理（`orthogonal_complement_projection_identities`、`square_eq_neg_one_of_skewAdjoint_unitary`、`relativeComplexStructure_square`、`diagonal_prime_observables_cannot_recover_relative_phase`、`pinching_discarded_coherence_mass`、`monitored_return_conservation`）；Gamow（1928）势垒隧穿、Misra–Sudarshan（1977）量子芝诺定理、Lindner 等（2005）阿秒光电离时间双缝、Tirole 等（2023）ITO 光学时间双缝衍射、Rao 等（2025）磁振子时间衍射、Angulo 等（2026）原子激发负驻留时间弱值与矩形势垒透射公式 T(E) 标 `ARGUED`；CODATA 电子常数下的 k、κ、κL、T(E) 与 ΔE = h/Δt 实算标 `NUM`；实轴 I 对盲平面 i 割弦桥读法、时间格拉姆窗口 W_Δt、双缝波包中心示意参数与 V = 1 − p 两态芝诺探针链标 `MODEL`。

`riemann-prime-arc-path-integral-sandbox`（`ZETA//SPIRAL`）承接第三十四章 §34.28 `#sec-ch34-riemann-path-integral-and-prime-arcs`，与 `euler-product-sieve`、`critical-mirror`、`zeta-spectrum-lab` 分工：`euler-product-sieve` 讲 σ > 1 有限素数筛余项，`critical-mirror` 讲函数方程四元组对称镜像，`zeta-spectrum-lab`（§22.4.1，无绿色框）专门对勘二维平面部分和、四次多项式模型与 10 对零点有限谱的外推边界，而本页把复平面 ℂ 铺在地面、将每个整数箭头 n^(−s) = n^(−σ)e^(−it ln n) 按素因子分解抬升至竖直作用量高度 ln n = Σ m_p ln p，同台贯通“欧拉局域绕行与莫比乌斯外积对偶、临界线 σ = 1/2 正逆双壳等幅锁相与前五颗真实零点 γ₁–γ₅ 延拓竖轴穿过原点 O、偏轴 σ ≠ 1/2 双壳失衡分裂对比离线四元组反例、以及前 50 对零点三维驻波曲面雕刻切比雪夫素数阶梯 ψ₀(x)”：紫色给复合路径链 Σ n^(−s)、欧拉部分乘积、零点驻波部分和曲面与 `ARGUED` 文献依据，青色给地面正向壳环 p^(−σ)（p = 2, 3, 5, 7）、精确中点阶梯 ψ₀(x) 与 Λ(n) 阶跃，品红给逆向对偶壳环 p^(−(1−σ))、莫比乌斯外积链 Σ μ(n)n^(−s) 与地面零点驻波残差，琥珀只给交错 η 延拓竖轴与落点珠 ζ(s)、当前选定零点胶囊 γ_k、最前排重构剖面 K(t) 及 2^(−σ) / x* 拖动手柄（红色严格只给黎曼猜想 `conj-riemann-hypothesis` 的 `OPEN` 标记）。绿色框严格只给页面引用的七条冻结定理（`prime_log_rational_independence`、`riemann_zeta_dirichlet_sum_eq_euler_product`、`tendsto_alternating_partialSums_eta_of_ne_one`、`xi_reading_reflection`、`xi_reading_one_sub_conj`、`full_symmetry_not_fixed_line_localization`、`actual_integrated_explicit_formula`）；欧拉（1737）乘积、黎曼（1859）函数方程、von Mangoldt（1895）与 Weil（1952）点态显式公式、1/ζ(s) = Σ μ(n)n^(−s)、欧拉—麦克劳林余项、Borwein（2000）η 加速与 Littlewood（1912）等价定理标 `ARGUED`；Borwein 加速 ζ(s)、斯特林 ln Γ 求 ξ(s)、双壳半径与截断/积分显式公式两侧实算标 `NUM`；素数极小圆弧体作用量高度、μ(p²) = 0 外积读法与往返半密度双壳示意标 `MODEL`。

`arithmetic-pivot-resonant-tunneling-sandbox`（`ARITH//PIVOT`）承接第三十四章 §34.29 `#sec-ch34-arithmetic-pivots-and-resonant-tunneling`，与 `arithmetic-schur-lab`、`trihedron-chord-pivot-tunneling-sandbox`、`critical-mirror` 分工：`arithmetic-schur-lab`（§34.18.5，无绿色框）在整除图 G = L + I/4 上清算高斯消元填充与阈值丢弃残差，`trihedron-chord-pivot-tunneling-sandbox` 讲有向图最短路热带舒尔枢轴与平直内割弦，而本页在复平面临界带受光地形块 ln|f(s)| 上正面对比跨越 σ ∈ (1/2, 1] 势垒的三大方案——“一维自然数硬截断 ζ_M 在 M = 19 挖出 Re s ≈ 1.006988 越界图兰零点、单级磨光器 Levinson–Conrey 比例 κ(θ) 止步于 θ = 4/7 色散墙、以及乘性窗口 {1, 2, 3, 6} 分块舒尔补枢轴锥配 t = γ₁ 剖面多级凯莱反复平方中继 |w|^(2^ℓ)”：青色给 σ > 1 欧拉无零点高原、19 支首尾闭合相量链、θ ≤ 4/7 已证单跳隧道与 κ(θ) 实线、内部叶 {1, 2} 与平直内割弦 G̃₃₆ = 5/18、弦图正半定补全区间 [−7/12, 11/12] 及 δ = 0 处的 |w| = 1 幺正锁相环，品红给 s = 1 极点山峰、M = 19 图兰越界零点旗标与含越界零点的截断阶、θ = 4/7 色散墙及墙外未证虚线、以及假想 δ > 0 下的反复平方爆炸柱，紫色给临界带地形、Levinson 基准点、乘性底板与稀疏舒尔枢轴锥、多级中继阱 G̃^(1)–G̃^(4) 及 `ARGUED` 文献依据，琥珀只给当前激活闸门框 M、单跳/中继读头、当前激活枢轴与可拖动参数圆环手柄（红色严格只给 `conj-riemann-hypothesis` 与跨枢轴横向移位面积律问题 `prob-ch34-arithmetic-pivot-area-law` 两枚 `OPEN` 标记）。绿色框严格只给页面引用的九条冻结定理（`classical_zeta_unique_simple_pole_residue_one`、`completedRiemannZeta_ne_zero_of_one_le_re`、`golden_right_half_strip_implies_rh`、`cayley_ratio_norm_one_iff_critical_line`、`cayley_critical_line_zeta_criterion`、`gram_realizability`、`exists_posSemidef_completion`、`exists_posSemidef_completion_rank_le`、`original_zero_robin5040_localA`）；Turán（1948）、Montgomery（1983）、Platt–Trudgian（2016）、Levinson（1974）、Deshouillers–Iwaniec（1982）、Conrey（1989）、Pratt 等（2020）及 Báez-Duarte 等（2000）/ Burnol（2002）对数下界标 `ARGUED`；ζ₁₉ 越界零点复核、三次多项式单纯形优化 κ(θ)（θ = 4/7 得 0.4086）、{1, 2, 3, 6} 精确有理舒尔补/LDL/补全区间与对数反复平方 |w|^(2^ℓ) 实算标 `NUM`；“图兰—芝诺陷阱 / 单跳裸隧穿 / 算术 MERA 多级法布里—珀罗中继”读法及软封顶地形与四阱布局标 `MODEL`。

`hilbert-concept-ledger-3d-cap-sandbox`（`HILBERT//LEDGER`）与 `observer-escape-ledger`、`gram-window-consensus-sandbox` 分工：本页承接第三十九章 §39.10 `#sec-ch39-three-dimensional-field-cap-and-hilbert-ledger` 的混编希尔伯特账本与三维概念场封顶，青色给五颗概念球、梯度轴与保留下来的模层，品红给跨概念弦、相关表与折叠的尾巴，紫色给旋转轴、霍奇对应与体积读法，琥珀只给展开参数 λ、维数 d、停机精度 ε<sub>self</sub> 与当前读头（本页无开放问题标记，不用红色）。绿色框严格只给页面引用的六条冻结定理（`finite_stage_expansion`、`local_marginal_correlation_blind_spot`、`finite_rank_concentration_mode_bound`、`complete_consequences`、`bloch_geometry_of_isHermitian`、`three_anchor_gram_det_pos_iff`）；so(n) 维数、Bell 对角态偏迹判据、Hencky 对数应变与极分解、sl(2, ℝ) 基灵型、四元数与霍奇星号标 `ARGUED`；15 维分块计数、局域与相关密度矩阵、LMS 格拉姆行列式、极分解主应变、模塔部分和与停机层数实算标 `NUM`；五个三维球的混编读法、颜色框架、d 维紧框架投影与自停机尾部折叠标 `MODEL`。

`af-gut-arc-field-unification-sandbox`（`AFGUT//UNIFY`）与 `unified-field-slice`、`quantum-gate-cosmic-tower-sandbox` 分工：本页承接第三十九章 §39.11 `#sec-ch39-af-gut-arc-field-grand-unification` 的极小圆弧场大统一，青色是引力场壳 F<sub>pos</sub> 与勾股天平的时间分量，紫色是 SU(2) 旋量壳，蓝色是 SU(3) 三锚点体积锁，银白是 U(1) 相位与标度，琥珀只给能标 μ、希格斯桥 Φ̃<sub>H</sub> 与账本收拢读头，红色只给抽屉中的开放问题（`prob-ch39-af-gut-threshold-and-proton-stability`）。绿色框严格只给页面引用的六条冻结定理（`covariant_commutator_formula`、`square_eq_neg_one_of_skewAdjoint_unitary`、`anchored_phase_classification`、`circle_double_cover_history_lift`、`tetra_defects_incidence_repair_and_exactness`、`lagrange_gram_identity`）；Georgi–Glashow 统一能标、单圈跑动、希格斯对称破缺与规范场文献标 `ARGUED`；三条耦合的交点、sin²θ<sub>W</sub> = 3/8、N<sub>c</sub> 曲线、手征桥、四面体缺陷计数与勾股天平实算标 `NUM`；四场壳、四概念账本、ΔT<sub>ε</sub> 原胞及连续收拢的读法标 `MODEL`。

`arc-body-calculus-sandbox`（`ARC//CALCULUS`）承接第三十四章 §34.30 `#sec-ch34-arc-body-calculus-and-finite-stokes`，与 `quantum-arc-macro-integral-sandbox`、`clifford-monad-tiling-sandbox`、`roundtrip-born-imaginary-blindspot-sandbox` 分工：`quantum-arc-macro-integral-sandbox`（§34.11）讲宏观积分如何由极小圆弧逐段拼出，`clifford-monad-tiling-sandbox`（§34.8）讲幂零微段 d² = 0 与多胞抵消，`roundtrip-born-imaginary-blindspot-sandbox`（§34.19）讲往返投影与 90° 盲面定义虚数 i，而本页把“以旋代差”落到五个受光的三维场景上——滑板坡上的密切旋子对比切线斜率 tan θ、复平面切片上的复步求导对比前向差分、单位球上的随机旋子路径与矢高相变、半球扇形网格上的北极正则矢高联络斯托克斯、四面体与八面体闭壳上的 d² = 0。颜色：青色给横向切弦 c = sin κε、复步导数 Im f(x₀ + iε)/ε 与存活的外圈边界 ∂Σ；品红给轴向矢高 v = 2 sin²(κε/2)、前向差分的相减塌陷、矢高柱 Σ_sag 与伊藤纬圈 E[z] = (1 − v)^N、球面角盈 Ω(ΔT_k)；紫色给密切旋子圆盘 D̂_ε、路径序旋子管与 90° 盲面 Im f；墨色给平直斜率 tan θ、实轴切片 f(x) 与正反相消的内棱 ±Φ、面环流 ±A；琥珀严格只给激活卡、激活透镜与场景切换段以及舞台上的投影手柄 `#calcHandle`（条带小图的当前游标用中性 sigma，舞台上不用红色）。`.lens-toggle#lensToggleBtn` 的两种读法（几何旋子原语 / 微积分与物理算符）在同一组状态参数下只换标签、读数口径与强调，不改几何。矢高一律按 2 sin²(φ/2) 计算，κε 小于 10⁻⁸ 时读数行写明 cos κε 舍入成 1、1 − cos 会给 0。绿色框严格只给页面引用的八条冻结定理（`lagrange_gram_identity`、`square_eq_neg_one_of_skewAdjoint_unitary`、`relativeComplexStructure_square`、`projection_probability_flow`、`exp_tail_le`、`trotter_product`、`face_cycle_exact`、`tetra_defects_incidence_repair_and_exactness`）；复步求导（Lyness–Moler 1967、Squire–Trapp 1998，含非全纯失效与单复平面二阶导仍有相减）、二元数自动微分与幂零微段、伊藤 / 斯特拉托诺维奇 / Young / Lyons 粗糙路径四相区、吉拉德定理与非阿贝尔生成树锚定标 `ARGUED`；c、v、|D̂_ε|、复步与前向差分误差扫描、Σ_sag 与 (1 − v)^N、吉拉德角盈与分段高斯—勒让德弧积分、闭壳关联矩阵 𝔽₂ 秩与全部 V⁴ 个四面体上边缘实算标 `NUM`；“以旋代差 / 矢高相变 / 有限精度斯托克斯”读法、滑板坡内禀方程、固定种子随机旋子路径、扇形中心与规范函数及 2⁻²⁰ 取整的边上链标 `MODEL`；红色严格只给 §34.24 `prob-ch34-gravity-dynamics-and-coupling` 与 §34.29 `prob-ch34-arithmetic-pivot-area-law` 两枚 `OPEN` 标记。

`self-reference-pentad-sandbox`（`SELFREF//PENTAD`）承接第三十九章 §39.6 `#sec-ch39-fivefold-self-reference-spectrum`，与 `pointer-ontology-deref`、`fixed-point-convergence`、`dottie-fibonacci-spirals`、`sphere-escape` 分工：前几页分别单讲 QRAM 路由树、一维标量收缩率、对数螺旋切角与球面多面体逃逸，本页在同一个三维受光舞台与双透镜（实例物理读法／统一算子读法 `x* = F(x*), λ`）下并置五阶自指形态——12 槽指针环 4 跳链压缩为一跳直达根 `Lookup(0) = 0`（`p ≡ *p`、P² = P，|λ| = 0）、水平盲平面 i 与竖直实平面 I 正交相交处的道蒂不动点 cos θ* = θ* = 0.7391（λ = −sin θ* = −0.6736 蛛网换边收缩，cos²θ* = 54.62% 对 sin²θ* = 45.38%）、布洛赫球内本征态绕盲区圆等模转相（|λ| = 1）对比开放信道横向衰减螺旋锁入 ρ*（|λ| = 0.65）、四面体上 `[[15, 1, 3]]` 码 15 枚带噪 T 门经 4 个 8 比特检验胞蒸馏出 1 枚提纯 T 门（ε = 0.0500 → ε_out = 0.00514，接受率 46.61%，阈值 ε_th = 0.1415），以及 4 × 4 自应用表主对角线经 ¬ 翻转升至 ℓ + 1 逃出全部目录行（0011 ∉ range g）。青色给压缩后一跳直达根箭头与自环、实轴投影 cos θ*、本征不变轴与信道不动点 ρ*、门蒸馏吸引盆与零校验子接受分支、以及有不动点时的目录命中行；品红给压缩前多跳链、盲平面圆弧 θ* 与并排弧长尺、横向退相干衰减、非零校验子丢弃分支与阈值上发散区、以及无不动点逃逸对角线；紫色给 P² = P 幂等盘、交替蛛网螺旋、幺正相位圆纤维、4 个 Reed–Muller 检验胞与升层扭转带；琥珀只给当前读头、可拖动角度珠、演化状态珠与噪声滑环（本页无开放问题标记，不用红色）。绿色框严格只给页面引用的六条冻结定理（`self_application_fragment_package`、`recursive_page_table_walk`、`finite_record_pinching_idempotent`、`rational_inverse_endpoint`、`energy_eigenstate_stationary`、`two_axis_finite_word`）；Lawvere（1969）对角不动点定理、Tarjan（1975）并查集路径压缩复杂度、Lindemann–Weierstrass 推出 θ* 超越性、Bravyi–Kitaev（2005）`[[15, 1, 3]]` 魔术态蒸馏与 Vidal（2007/2008）MERA 重整化不动点标 `ARGUED`；蛛网序列、逆级数部分和与 MacWilliams 重量枚举闭式实算标 `NUM`；五阶自指雅可比稳定性统一相图标 `MODEL`。

`self-halting-spectral-time-river-sandbox`（`HALT//SORT`）承接第三十九章 §39.7 `#sec-ch39-self-halting-and-spectral-sorting`，与 `speed-limit-zeno`、`repeated-projection`、`roundtrip-born-imaginary-blindspot-sandbox` 分工：前三页分别讲正交翻墙最短时间界、单轴重复投影幂等与单次往返玻恩回声，本页讲“观察者在自定有限精度 ε_self ∈ (0, 1) 处柯西停机（ε = 0.150 时 x₀ = 0 在第 5 步以 |x₅ − x₄| = 0.1392 ≤ 0.150 停机锁定 0.7935）、低于 ε 的模态绕复结构铰链 î（î² = −1）旋转 90° 折入水平时间长河并随下游时间步 t 依次浮出、幂迭代 Gⁿ 按 (σ_m/σ₁)ⁿ 将六模态前两阶份额从 77.27% 提纯至 99.33%、测量基旋转 α ∈ [0°, 90°] 洗牌瑞利权重 cos²θ_k，以及 N = 16 道频闪捏合跨 ΩT = π/2 将留存率从 0.5000 抬升至 0.9622”。舞台用 `kit.solid` 画球面残差帽、竖直可见墙 I 与水平 î 时间长河折页、Gⁿ 椭球与六模态谱柱、可旋转正交基三脚架 B(α) 及频闪走廊，左栏支持观察者读法与算子读法切换；青色给越过停机线的置顶主干 Π_{≥ε}、可见墙 I 上的显影模态与受保护芝诺基态脊，品红给低于停机线折入 90° 盲区的时间长河模态 î Π_{<ε}、指数阻尼尾流与单步二阶横向漏失锯齿，紫色给球面残差帽、90° 复结构铰链 î、幂迭代椭球、测量基三脚架与频闪校验环，琥珀只给可拖动的阈值帽缘、时间步游标 t、截断线手柄、基轴手柄 b₀ 与当前检查珠（本页无开放问题标记，不用红色）。绿色框严格只给页面引用的七条冻结定理（`pinching_hilbert_schmidt_pythagorean`、`pinching_discarded_coherence_mass`、`square_eq_neg_one_of_skewAdjoint_unitary`、`observable_krylov_strict_growth_bound`、`observable_krylov_once_stable_permanently`、`rank_one_born_pairing_weight`、`monitored_return_conservation`）；von Mises（1929）幂迭代收敛、Eckart–Young–Mirsky 低秩截断最优性、Misra–Sudarshan（1977）连续芝诺极限、Vaswani 等（2017）序列软最大注意力与 Hoel 等（2013）粗粒化因果涌现标 `ARGUED`；余弦停机步、十进制前缀/移位展开、六模态幂次分账、DCT-II 插值瑞利权重与 [cos²(π/(4N))]ᴺ 实算标 `NUM`；有限精度裁量窗口、时间长河折叠与注意力类比标 `MODEL`。

`universal-clock-gravity-dilation-sandbox`（`CLOCK//DILATION`）承接第三十九章 §39.8 `#sec-ch39-universal-clock-and-gravitational-dilation`，与 `rapidity-lightcone`、`speed-limit-zeno`、`bounded-horizon-thermodynamics-sandbox` 分工：`rapidity-lightcone` 讲闵可夫斯基双曲线助推与双生子世界线几何，`speed-limit-zeno` 讲单粒子富比尼—施图迪正交步数界，本页以并排同速旋转的两枚紫色底层主频飞轮 ν₀ ≡ 1.000 为核心舞台（配比较主频读法／物理时空读法双透镜），同台打通“普朗克晶格上 20 拍雷达往返零光锥 R_max = ½cΔτ = 10 ℓ_P 锁死最细停机精度下界 ε_min = 1/N = 0.0500、亚光速运动空间跳址负载 β² = 64% 分流固有时帧率至 dτ/dt = 0.6000、致密星体 r = 2.50 r_s 处全息背景纠缠负载 η_info = r_s/r = 40% 将帧率压至 dτ/dt = 0.7746、等效原理双负载（η_info = 0.360, β = 0.600）下神经/原子/光尺三枚局域子钟同乘 0.6400 保持内部比值 1.0000 不变、以及史瓦西视界静态极限 r → r_s 处 20 槽满载（η_info = 100%）令远观固有时帧率归零 dτ/dt = 0.0000”。紫色给全宇宙恒定同速的底层主频飞轮 ν₀、零光锥与全息球壳；青色给锥内完成往返确认的 317 枚晶格点、最细精度环、结余固有时帧率投影轴 dτ/dt、10 拍帧圆币叠柱与三枚共标度局域子钟表盘；品红给锥外回波未达格点、空间寻址负载弧 β² 与穿窗背景纠缠负载弧 η_info；琥珀只给时间窗手柄、倾轴速度手柄与全息负载手柄；红色只给右栏 `#evidence` 中从离散复形导出完整 3+1 维自旋-2 引力场方程与空间曲率分量 g_rr 的开放问题 `prob-ch34-gravity-dynamics-and-coupling`（`OPEN`）。绿色框严格只给页面引用的五条冻结定理（`eq_smul_minkowski_of_null`、`record_time_lower_bound`、`record_count_upper_bound`、`lagrange_gram_identity`、`bogoliubov_norm_conservation`）；Mandelstam–Tamm 与 Margolus–Levitin 量子速度界、Einstein 等效原理、Schwarzschild 外部度规及 Bekenstein–全息熵界标 `ARGUED`；光锥内整点计数、五档工况勾股分账与帧圆币叠柱实算标 `NUM`；c = ℓ_P ν₀ 单拍步幅与全息主频排队诠释（显式写明仅复现静态时间流逝函数 √|g₀₀| 而不自动导出 g_rr）标 `MODEL`。

`unified-arc-forces-planck-sandbox`（`FORCE//UNIFY`）承接第三十九章 §39.9 `#sec-ch39-unified-arc-forces-and-planck-convergence`，与 `lorentz-pseudoscalar-sm-octave-sandbox`、`trihedron-rigidity-truss-sandbox`、`coset-breaking-conservation-tower-sandbox` 分工：前三页分别讲伪标量洛伦兹负号与八度粒子表、K_N 杆铰刚性多项式以及陪集破缺五塔，本页在灰色比较球 S² 背景与双透镜（几何相位读法／场论跑动读法）下将四大基本相互作用收束进同一枚 ε = 45° 极小圆弧体 ΔT_ε 与能标滑轨 log₁₀(E/GeV) ∈ [−3.4, 19.09]——胞内 `1D` 盲平面 î 上 ±q 反向旋转的阿贝尔相位圆 U(1)_em（净高斯通量 0）、胞内 `2D` 左手双矢量楔 A∧B 上的 SU(2)_L 720° 双覆叠光带（360° 翻 −1、720° 回 +1）配普罗卡壳汤川衰减 e^(−m_W r)、胞内 `3D` 保单态体积立方 I₃（det U = 1）的 SU(3)_c 三色标架与 r = 1.20 fm 处串起 6 枚原胞的线性色通量管 V = σr = 1.09 GeV、胞间 N = 6 超静定四面体簇（ΔE(6) = +3）绕公共铰链留出雷吉角亏 δ_h = 77.88° 并借恒正玻恩负载 cos²θ ≥ 0 驱动波包按 a = −c²∇ln(dτ/dt) 向内驻相折射，以及推至普朗克能标 E_P = 1.22 × 10¹⁹ GeV 时多胞屏蔽云剥落回单枚原胞、引力耦合 α_G(E) = (E/E_P)² 从电子标度 1.75 × 10⁻⁴⁵ 二次攀升至 1.0000 并与 `.strip` 中标准模型单圈三条规范线在 10¹³–10¹⁷ GeV 围出的近交汇三角（Δα⁻¹ > 3.66，沙盘按两位小数初值给出约 3.67–3.68，诚实画出近交而非单点假交）同台对照。青色给 U(1) 相位圆与闭合通量线、弱二重态翻转、色单态体积锁 I₃、引力折射波前脊线、胞内角超 Ω_intra = 19.47° 与三条单圈规范跑动曲线；品红给正交盲平面 î、双矢量楔与汤川衰减包络、色通量管弦、雷吉铰链角亏楔 δ_h 与时钟负载环、以及二次攀升的引力耦合曲线 α_G(E)；紫色给极小圆弧体原胞骨架、720° 双覆叠带与普罗卡壳、三轴色标架、N = 6 四面体桁架与多胞全息屏蔽云；琥珀只给相位珠、探测环、夸克间距珠、当前波包与能标滑珠；红色严格只给右栏 `#evidence` 的三条开放问题 `prob-ch34-past-hypothesis-and-cosmological-constant`、`prob-ch34-gravity-dynamics-and-coupling` 与 `prob-ch34-sm-generations-and-couplings`（`OPEN`）。绿色框严格只给页面引用的六条冻结定理（`no_continuous_global_section`、`circle_double_cover_history_lift`、`two_axis_finite_word`、`three_anchor_gram_det_pos_iff`、`face_cycle_exact`、`rank_one_born_pairing_weight`）；杨—米尔斯规范理论、电弱破缺与安德森—希格斯机制、渐近自由与格点禁闭、雷吉角亏曲率收敛及 Georgi–Quinn–Weinberg 单圈跑动标 `ARGUED`；CODATA/PDG 初值下的电子/质子全息稀释比、四面体二面角亏 77.88° 与单圈两两交点实算标 `NUM`；无量纲弧度总配分泛函与胞内规范三力／胞间主频引力统一诠释标 `MODEL`。

`prelude-dimensions` 是序曲的几何入门页，默认卡 `shadow` 同步显示俯视木桩与侧视影子，`compare` 比较 90° 与 270° 的同位反向。圆盘侧视是固定线段，木桩投影是移动点；该经典正交投影模型不推出量子测量规则。其余卡分别演示射线投影、纬圈、二维到三维的等半径赤道嵌入、三对对跖方向的等权混合与从 1 弧度出发的余弦迭代。几何计算标 `NUM`，理想化观看与混合过程标 `MODEL`，余弦收敛及其边界沿用序曲的文献分层，不使用绿色 Lean 标记。


## 正文里的引用（中英文版本位置与卡名相同）

按章排列；同一章内按正文里出现的先后。

| 章节 | 位置 | 引用 |
| --- | --- | --- |
| 序曲 | §0.1 静态射线图之后的观看角度操作段 | `prelude-dimensions` · `head-on` |
| 序曲 | §0.2 区分圆盘与木桩的投影之后 | `prelude-dimensions` · `shadow` |
| 序曲 | §0.2 静态转盘图之后的两个时刻对照段 | `prelude-dimensions` · `compare` |
| 序曲 | §0.3 静态纬圈图之后的操作段 | `prelude-dimensions` · `latitude` |
| 序曲 | §0.4 解释“更大”指多一维、半径不变之后 | `prelude-dimensions` · `normal` |
| 序曲 | §0.4 静态平均图之后，区分混合与单次测量之后 | `prelude-dimensions` · `average` |
| 序曲 | §0.5 余弦不动点文献注记之后、哲学追问之前 | `prelude-dimensions` · `cosine` |
| 序曲 | 章末回看问题之后 | `prelude-dimensions` 完整实验室 |
| 第一章 | §1.2 快门插图 `ch01-shutter` 之后、“全能属性账本”一段之前 | `pairwise-shutter` · `clicks` |
| 第一章 | §1.3 例 `ex-bloch-six-poles` 之后、“至此，我们已经完成了第一场大扫除”之前 | `qubit-geometry` · `poles` |
| 第二章 | §2.1 “矩阵的迹”一段之后、定义 `def-born-probability` 之前 | `pairwise-shutter` · `turn` |
| 第二章 | §2.3 “这行等式”之后的列表第 2 条（球面正交）之后、第 3 条之前 | `pairwise-shutter` · `right` |
| 第二章 | §2.3 “单比特是唯一‘公平’的情形”一段之后 | `pairwise-shutter` · `random` |
| 第二章 | 文献注记 `rem-gleason-literature` 之后、转入第三章之前 | `pairwise-shutter` 完整实验室 |
| 第三章 | §3.1 题记“给混沌命名……”之后、存在线插图之前 | `repeated-projection` · `twice` |
| 第三章 | §3.1 定理 `thm-unread-fixed-iff` 之后的解读段末 | `repeated-projection` · `fixed` |
| 第三章 | §3.2 单比特勾股算例“反之，当态纯粹躺在赤道平面上……必然归零”之后、“波与粒从不打架”之前 | `repeated-projection` · `perp` |
| 第三章 | §3.2 单比特勾股算例末（“两条直角边”） | `repeated-projection` · `sum` |
| 第三章 | §3.3 “[@ex-malus-three-polarizers] 清晰展示了……”一段之后、“但这里还藏着第一部最深的一个悬念”之前 | `repeated-projection` · `chain` |
| 第三章 | 章末、转入第四章之前 | `repeated-projection` 完整实验室 |
| 第四章 | §4.1 “特别地，当环境彻底分辨了系统的不同分支”一段之后、定理 `thm-nonselective-marginal` 之前 | `bloch-noise` · `shorten` |
| 第四章 | §4.2 捏合投影一段之后、定理 `thm-pinching-pythagorean` 之前 | `bloch-noise` · `pinch` |
| 第四章 | §4.2 相位阻尼一段之后、命题 `prop-phase-damping-decay` 之前 | `bloch-noise` · `dephase` |
| 第四章 | §4.2 振幅阻尼一段之后 | `bloch-noise` · `amp` |
| 第四章 | §4.2 指数包络 $T_2 \le 2T_1$ 一段之后、文献注记 `rem-relaxation-envelope-literature` 之前 | `bloch-noise` · `wide` |
| 第四章 | §4.2 末（“可分辨性只会丢”） | `bloch-noise` · `distance` |
| 第四章 | §4.3 开头一段之后 | `bloch-noise` · `centre` |
| 第四章 | 第一部小结的四条列表之后、“至此，第一重帷幕”一段之前 | `bloch-noise` 完整实验室 |
| 第五章 | §5.2 三明治积两条推导（$v_\perp$ 不动、$v_\parallel$ 合成整角）之后、“这里需要严守”之前 | `zyz-compile` · `sandwich` |
| 第五章 | §5.2 定理 `thm-circle-double-cover-history-lift` 译回旋子的列表（“两整圈”）之后、例 `ex-rotor-two-turns` 之前 | `qubit-geometry` · `turn2` |
| 第五章 | §5.3 全局相位与相对相位的对照之后 | `qubit-geometry` · `phase` |
| 第五章 | §5.4 门图鉴表之前 | `qubit-geometry` · `hadamard` |
| 第五章 | §5.4 门图鉴算例之后、文献注记之前 | `qubit-geometry` · `hzh` |
| 第五章 | 章末、转入第六章之前 | `qubit-geometry` 完整实验室 |
| 第六章 | §6.1 末 | `qubit-geometry` · `half` |
| 第六章 | §6.3 可见度 $V$ 与可区分度 $D$ 的两条定义之后 | `double-slit-marker` · `partial` |
| 第六章 | §6.3 “性质 3 是另一端”与“回到 6.1 节的那一颗比特”两句之后、捏合推论引言之前 | `qubit-geometry` · `area` |
| 第六章 | §6.3 惠勒延迟选择算例 `ex-wheeler-delayed-choice-tradeoff` 之后、文献注记之前（这张卡比较同一未测准备的两种备选读法：路径分组或擦除基分组；`delayed` 只留在完整实验室里） | `double-slit-marker` · `erase` |
| 第六章 | §6.3 文献注记 `rem-englert-greenberger-literature` 之后 | `double-slit-marker` · `mixed` |
| 第六章 | §6.4 | `qubit-geometry` 完整实验室 |
| 第六章 | §6.4 `qubit-geometry` 完整实验室之后，隔一句介绍 `SLIT//MARKER` 的过渡句 | `double-slit-marker` 完整实验室 |
| 第七章 | §7.2 例 `ex-orthogonalization-times` 之前（“把它换成具体哈密顿量的能量涨落”一段末） | `speed-limit-zeno` · `equal` |
| 第七章 | §7.2 例 `ex-orthogonalization-times` 之后，两卡之间隔一句（“三能级的态虽然晚到”） | `speed-limit-zeno` · `three`、`unequal` |
| 第七章 | §7.3 例 `ex-zeno-strobe-freezing` 之后 | `speed-limit-zeno` · `strobe4` |
| 第七章 | §7.3 例 `ex-first-return-qubit` 之后（柱子是 δ = 45°，品红虚线台阶是 δ = 90° 的同一本账；`strobe16` 只留在完整实验室里） | `speed-limit-zeno` · `mean` |
| 第七章 | §7.3 末、转入 §7.4 之前 | `speed-limit-zeno` 完整实验室 |
| 第八章 | §8.1 末（单比特 ln 2 特例之后） | `erasure-ledger` · `pinch` |
| 第八章 | §8.1 例 `ex-channel-data-processing-qubit` 之后、文献注记 `rem-channel-dpi-literature` 之前 | `erasure-ledger` · `dpi` |
| 第八章 | §8.2 定理 `thm-entropy-production-coherence-deletion` 后的解读段末、例 `ex-landauer-one-bit-ledger` 之前 | `erasure-ledger` · `steps` |
| 第八章 | 例 `ex-landauer-one-bit-ledger` 之后、文献注记 `rem-density-matrix-balance-inputs-literature` 之前 | `erasure-ledger` · `cycle` |
| 第八章 | 例 `ex-one-qubit-reservoir-swap-erasure` 之后（§8.2 末） | `erasure-ledger` · `bath` |
| 第八章 | §8.3 定理 `thm-reduced-irreversibility-access-defect` 的证明之后 | `erasure-ledger` · `copy` |
| 第八章 | §8.3 末（文献注记 `rem-landauer-thermodynamic-bridge-literature` 之后、§8.4 之前） | `erasure-ledger` 完整实验室 |
| 第九章 | 章首第二段（“单张平面只能画出一个一维圆周”）之后 | `two-angle-addressing` · `tilt` |
| 第九章 | 两角寻址的两步列表之后、“为什么不需要正交三次”之前 | `two-angle-addressing` · `address` |
| 第九章 | 两角寻址一节末（南北两极的方位角冗余） | `two-angle-addressing` · `pole` |
| 第九章 | 定理 `thm-two-axis-finite-word` 的证明之后 | `two-angle-addressing` · `skew` |
| 第九章 | 该定理契约列表第 2 条之后、Lie–Trotter 一段之前（图注带上共线退化的半句） | `two-angle-addressing` · `narrow` |
| 第九章 | 例 `ex-trotter-two-quarter-turns` 之后、格言之前 | `two-angle-addressing` · `trotter` |
| 第九章 | 命题 `prop-rational-six-axis-cover` 之前 | `two-angle-addressing` · `three` |
| 第九章 | 例 `ex-two-angle-six-axis` 之后 | `two-angle-addressing` · `six` |
| 第九章 | 文献注记 `rem-axes-literature` 之后、转入第十章之前 | `two-angle-addressing` 完整实验室 |
| 第十章 | §10.1 两种转序的两条算式之后、投影算子不对易一段之前 | `berry-loop` · `order` |
| 第十章 | §10.1 文献注记 `rem-berry-pancharatnam-holonomy-literature` 之后 | `berry-loop` · `octant` |
| 第十章 | §10.1 推论 `cor-latitude-complex-overlap` 的解读段末（赤道 $t = \frac{1}{2}$ 一例） | `berry-loop` · `equator` |
| 第十章 | §10.3 文献注记 `rem-hopf-dirac-monopole-literature` 之后、格言之前 | `berry-loop` · `comb` |
| 第十章 | §10.4 例 `ex-octant-berry-gram` 之后 | `berry-loop` · `reverse` |
| 第十章 | 文献注记 `rem-gram-hairy-ball-literature` 之后、章末一段之前 | `berry-loop` 完整实验室 |
| 第十一章 | §11.1 末（文献注记 `rem-rotating-frame-carrier-literature` 之后） | `pulse-area-virtual-z` · `carrier` |
| 第十一章 | §11.2 末（“具有明确面积的几何结构”一段之后） | `pulse-area-virtual-z` · `quarter` |
| 第十一章 | §11.3 开头“非对易展开项就会浮现出来”之后 | `pulse-area-virtual-z` · `order` |
| 第十一章 | §11.4 开头一段之后、文献注记 `rem-virtual-z-scheduling-literature` 之前 | `pulse-area-virtual-z` · `vz` |
| 第十一章 | 文献注记 `rem-virtual-z-scheduling-literature` 之后（第 3 条符号核对） | `pulse-area-virtual-z` · `sign` |
| 第十一章 | 例 `ex-five-ghz-pi-over-two` 之后、文献注记 `rem-pulses-literature` 之前 | `pulse-area-virtual-z` · `gauss` |
| 第十一章 | 文献注记 `rem-pulses-literature` 之后 | `pulse-area-virtual-z` · `detune` |
| 第十一章 | 章末最后一段之后 | `pulse-area-virtual-z` 完整实验室 |
| 第十二章 | 开篇三座高峰第 2 条（参数位移律）之后、第 3 条之前 | `parameter-shift` · `noise` |
| 第十二章 | §泡利转角与精确参数位移 · 文献注记 `rem-parameter-shift-rule-literature` 之前 | `parameter-shift` · `shift` |
| 第十二章 | 文献注记 `rem-parameter-shift-rule-literature` 之后、讲有限步长截断偏差的那句话之后 | `parameter-shift` · `step` |
| 第十二章 | `step` 卡之后、讲两点公式没有这一截偏差的那句话之后（该节末） | `parameter-shift` · `anywhere`，隔一句后是完整实验室 |
| 第十二章 | §赤道集中与贫瘠高原的条件 · 文献注记 `rem-sphere-equator-markov-literature` 之前 | `equator-concentration` · `three`，隔一句后是 `width` |
| 第十二章 | 文献注记 `rem-sphere-equator-markov-literature` 之后 | `equator-concentration` · `bound`，隔一句后是 `twenty` |
| 第十二章 | 推论 `cor-finite-trace-mode-budget` 的证明之后 | `eth-horizon-crossover` · `geometric` |
| 第十二章 | 例 `ex-cluster-shift-and-gradient` 之后、文献注记 `rem-mbqc-gradients-literature` 之前 | `equator-concentration` 完整实验室 |
| 第十三章 | 推论 `cor-chsh-local-commuting-collapse` 后的解读段末（“只要有一方的两次提问不分先后”） | `chsh-dial` · `collinear` |
| 第十三章 | 例 `ex-chsh-spectrum-angle-table` 之后、“面积张满时的天花板”之前 | `chsh-dial` · `sixty` |
| 第十三章 | §45° 余弦与固定 CHSH 极值 · 开头的提问之后、“答案是 45°”之前 | `chsh-dial` · `sweep` |
| 第十三章 | 推论 `cor-fixed-chsh-tsirelson` 的证明之后 | `chsh-dial` · `tsirelson` |
| 第十三章 | 例 `ex-sixteen-deterministic-chsh-tables` 之后、“现在两端都钉住了”之前 | `chsh-dial` · `hidden` |
| 第十三章 | 例 `ex-bell-chsh-45deg` 之后、文献注记 `rem-bell-chsh-literature` 之前 | `chsh-dial` · `arc` |
| 第十三章 | 文献注记 `rem-bell-chsh-literature` 之后（章末） | `chsh-dial` 完整实验室 |
| 第十四章 | Pauli 字一节末（辛奇偶校验和那一条之后、“正交综合征”一节之前） | `syndrome-decoding` · `single` |
| 第十四章 | 正交综合征一节 `OrthogonalSyndromes` 条件的解读段（“绝不串门”）之后 | `syndrome-decoding` · `rooms` |
| 第十四章 | 命题 `prop-orthogonal-syndrome-recovery` 后边界列表第 1 条之后、第 2 条之前 | `syndrome-decoding` · `mix` |
| 第十四章 | 编织一节“三股编织恒等式（Yang–Baxter 方程）”一段之后 | `braiding` · `over` |
| 第十四章 | 交叉映射的定义里“易见 crossingInv(crossing(x, y)) = (x, y)”及三股提升的公式之后、推论 `cor-braid-yang-baxter` 之前 | `braiding` · `inverse` |
| 第十四章 | 推论 `cor-braid-yang-baxter` 的证明之后 | `braiding` · `yb` |
| 第十四章 | 文献注记 `rem-braid-knot-topology-literature` 之后、Markov 一节之前 | `braiding` · `twice` |
| 第十四章 | Markov 一节首段（“闭合编织的着色，就是着色传输的不动点”）之后 | `braiding` · `close` |
| 第十四章 | 稳定化手算一段之后、定义 `def-markov-coloring-equivs` 之前 | `braiding` · `stabilize` |
| 第十四章 | 定理 `thm-quandle-coloring-markov-invariant` 后三条边界的第 3 条（“幂等公理省不得”）之后、例 `ex-fox-three-colorings-markov` 之前 | `braiding` · `rack` |
| 第十四章 | 例 `ex-fox-three-colorings-markov` 之后、文献注记 `rem-alexander-markov-literature` 之前 | `braiding` · `trefoil` |
| 第十四章 | Markov 一节末（“这一半，Lean 已经验证”）之后 | `braiding` 完整实验室 |
| 第十四章 | 例 `ex-repetition-code-syndrome` 之后、文献注记 `rem-error-correction-anyons-literature` 之前 | `syndrome-decoding` · `two`，一句相位翻转的过渡之后是 `phase` |
| 第十四章 | 文献注记 `rem-error-correction-anyons-literature` 之后、转入第十五章之前 | `syndrome-decoding` 完整实验室 |
| 第十五章 | Grover 一节三条边界列表之后 | `grover-reflections` · `sqrt` |
| 第十五章 | `sqrt` 之后一句（“整数步只能逼近 π/2”）之后 | `grover-reflections` · `over` |
| 第十五章 | Grover 一节末（第十六章消除过冲一句之后、相位反冲一节之前） | `grover-reflections` 完整实验室 |
| 第十五章 | 相位反冲一节开头一段（“相位齿轮”）之后 | `phase-gears` · `basis` |
| 第十五章 | 命题 `prop-finite-character-cancellation` 的解读（相消与相长两条）之后、归一化提醒之前 | `phase-gears` · `cancel` |
| 第十五章 | 归一化提醒之后、有限周期采样一节之前 | `phase-gears` · `four` |
| 第十五章 | 推论 `cor-finite-poisson-period` 的证明之后一句（“$m = 32$、周期 $r = 8$”）之后、文献注记 `rem-shor-divisibility-boundary-literature` 之前 | `phase-gears` · `dual` |
| 第十五章 | 文献注记 `rem-shor-divisibility-boundary-literature` 之后、四步算例之前 | `phase-gears` · `leak` |
| 第十五章 | 例 `ex-grover-four-shor-fifteen` 之后，依次在回看第一步（$N = 4$、$N = 8$）与由峰读阶的句子之后，文献注记 `rem-grover-qft-shor-literature` 之前 | `grover-reflections` · `four`、`eight`，`phase-gears` · `read`（各隔一句；`phase-gears` · `read` 前隔两句） |
| 第十五章 | 章末文献注记 `rem-grover-qft-shor-literature` 之后、转入第十六章之前 | `phase-gears` 完整实验室 |
| 第十六章 | 图上游走一节 $c_*$ 定义之后、“为了衡量 $n$ 步游走波函数”之前 | `walk-spreading` · `fifty` |
| 第十六章 | “下面的引理……证明：对一切圈长 $p \ge 1$”一段之后、引理 `lemma-symmetric-coin-walk` 之前 | `walk-spreading` · `ring` |
| 第十六章 | 引理 `lemma-symmetric-coin-walk` 的证明之后、“两条概念边界”列表之前 | `walk-spreading` · `coin` |
| 第十六章 | “两条概念边界”列表之后、文献注记 `rem-qsvt-walks-literature` 之前 | `walk-spreading` · `width` |
| 第十六章 | 文献注记 `rem-qsvt-walks-literature` 之后（图上游走一节末） | `walk-spreading` 完整实验室 |
| 第十六章 | 有限门字一节列表第 2 条（固定初态的可达轨道 𝒮_L）之后、第 3 条之前 | `gate-word-polytope` · `one` |
| 第十六章 | 有限门字一节列表第 3 条（凸包与测地多面体）之后、第 4 条之前 | `gate-word-polytope` · `six` |
| 第十六章 | 有限门字一节列表第 4 条（覆盖半径与径向支撑间隙）之后、第 5 条之前 | `gate-word-polytope` · `nearest` |
| 第十六章 | 有限门字一节列表第 5 条（刘徽“三维割圆术”）之后、编译误差一节之前 | `sphere-escape` · `zu` |
| 第十六章 | 例 `ex-finite-ht-polytope` 之后、文献注记 `rem-solovay-kitaev-literature` 之前 | `gate-word-polytope` · `three` |
| 第十六章 | 文献注记 `rem-solovay-kitaev-literature` 之后、章末收束段之前 | `gate-word-polytope` · `shrink` |
| 第十六章 | 章末收束段之后（全章最后） | `gate-word-polytope` 完整实验室 |
| 第十七章 | §17.1 圆与双曲线的对照列表及章图之后、定理 `thm-hyperbolic-norm` 引言之前 | `rapidity-lightcone` · `circle` |
| 第十七章 | 例 `ex-rapidity-three-fifths` 之后、§17.2 之前 | `rapidity-lightcone` · `boost` |
| 第十七章 | 引理 `lemma-null-cone-spatial` 证明后的解读段（“双向卡尺”）之后 | `rapidity-lightcone` · `caliper` |
| 第十七章 | §17.3 边界列表第 2 条的保形比例公式之后、“必须额外独立施加尺度归一化条件”一段之前 | `rapidity-lightcone` · `cone` |
| 第十七章 | “必须额外独立施加尺度归一化条件”一段之后、格言之前 | `rapidity-lightcone` · `scale` |
| 第十七章 | 例 `ex-two-worldline-segments` 之后 | `rapidity-lightcone` · `twins` |
| 第十七章 | `twins` 之后一句（“例末沿光锥零线的那种位移……”）之后 | `rapidity-lightcone` · `light` |
| 第十七章 | `light` 之后一句（“推到去程旅行者的参考系，再数一遍刻度”）之后 | `rapidity-lightcone` · `frames` |
| 第十七章 | 章末“在下一章……”一段之后（视频在“至此……”一段之后） | `rapidity-lightcone` 完整实验室 |
| 第十八章 | 选定生成树一节规范变换公式之后、“为什么单个边相位……”一段之前 | `lattice-gauge-loop` · `twist` |
| 第十八章 | 闭合回路一节列表第 1 条（弦的基本闭合回路）之后、第 2 条之前 | `lattice-gauge-loop` · `chord` |
| 第十八章 | 闭合回路一节“开放树路径相位也……成为严格的规范不变量”一段之后 | `lattice-gauge-loop` · `anchor` |
| 第十八章 | 推论 `cor-anchored-phase-classification` 的证明之后、格言之前 | `lattice-gauge-loop` · `two` |
| 第十八章 | 格言（“未受锚点锁定的自由树枝相位可由局部规范变换抹平”）之后 | `lattice-gauge-loop` · `tree` |
| 第十八章 | 例 `ex-plaquette-phase` 之后、章末收束段之前 | `lattice-gauge-loop` · `plaquette` |
| 第十八章 | 章末收束段之后 | `lattice-gauge-loop` 完整实验室 |
| 第十九章 | 纠缠层级一节“如上图左栏（Panel I）所示”一段（MERA 瓶颈、一般网络最大流不一定等于最小割）之后 | `layered-network-cut` · `one` |
| 第十九章 | `one` 之后一句（“把区间从一格加长到连续四格……”）之后 | `layered-network-cut` · `four` |
| 第十九章 | 锥域一节“最小割公式自动脱去外层的 $3ac$”一段之后、推论 `cor-bridge-cone-mincut` 之前 | `eth-horizon-crossover` · `narrow` |
| 第十九章 | 文献注记 `rem-ryu-takayanagi-literature` 之后 | `layered-network-cut` · `grow` |
| 第十九章 | `grow` 之后一句（“区间不止一段时，候选割也不止一道”）之后、章末收束段之前 | `layered-network-cut` · `two` |
| 第十九章 | 章末收束段之后 | `layered-network-cut` 完整实验室 |
| 第二十章 | 定理 `thm-open-circuit-min-depth` 的证明之后、“请严格注意”一段之前 | `complexity-growth` · `floor` |
| 第二十章 | 例 `ex-open-circuit-depths` 之后、§黑洞内部与复杂度—体积猜想之前 | `complexity-growth` · `eight` |
| 第二十章 | 引理 `lemma-open-circuit-depth-refutation` 的证明之后、“必须严格声明”一段之前 | `complexity-growth` · `eleven` |
| 第二十章 | 文献注记 `rem-complexity-growth-literature` 之后 | `complexity-growth` · `saturate` |
| 第二十章 | `saturate` 之后一句（“把同一个 8 比特随机电路接着往后走……”）之后、猜想 `conj-complexity-equals-volume` 之前 | `complexity-growth` · `ceiling` |
| 第二十章 | 猜想 `conj-complexity-equals-volume` 之后、§纠缠桥与 ER=EPR 之前 | `complexity-growth` · `cv` |
| 第二十章 | 例 `ex-cnot-and-cycle-bounds` 之后、P/NP 的提问之前 | `complexity-growth` 完整实验室 |
| 第二十一章 | §21.2 “对角线 g 的取值永远跟第 a 号解码器算出的结果唱反调”一段之后、“由此，在 Lean 模块 `DiagonalTopologicalEscape` 中”之前 | `sphere-escape` · `diagonal` |
| 第二十一章 | §21.2 例 `ex-cantor-godel-diagonal-table` 之后、“这正是抽象对角线不动点模式”一段之前 | `sphere-escape` · `split` |
| 第二十一章 | §21.2 例 `ex-cantor-godel-diagonal-table` 后“连同地址空间一起向外扩容”一段之后 | `sphere-escape` · `absorb` |
| 第二十一章 | §21.3 “下界可以直接读成几何量”一段之后、“有限门计数的硬下界”之前 | `sphere-escape` · `pointer` |
| 第二十一章 | §21.3 末 | `sphere-escape` · `liuhui` |
| 第二十一章 | §21.4 插图 `ch21-angle-defect` 之后“图里只有十二个顶点”一段之后 | `hairy-ball-normal-escape` · `defect` |
| 第二十一章 | §21.4 “零点可以推着走、可以合并”一段之后 | `hairy-ball-normal-escape` · `merge` |
| 第二十一章 | §21.4 “零点除不掉，是因为箭头被要求贴在切平面里”一段之后 | `hairy-ball-normal-escape` · `escape` |
| 第二十一章 | §21.4 “下面的完整实验室把这几幅画放在一起”一句之后、“把上述微分拓扑文献注记”一段之前 | `hairy-ball-normal-escape` 完整实验室 |
| 第二十一章 | §21.4 末 | `sphere-escape` 完整实验室 |
| 第二十二章 | §22.1 单根素数轴的等比级数一段（“合二为一”）之后、`classicalZeta` 约定之前 | `euler-product-sieve` · `two` |
| 第二十二章 | §22.2 “s → 1⁺ 时放大因子 p/(p − 1) 累积发散”一段之后、引理 `lem-riemann-zeta-residue-one` 之前 | `euler-product-sieve` · `near` |
| 第二十二章 | 推论 `cor-dirichlet-sum-eq-euler-product` 的证明之后、“加法里的同一个窍门”之前 | `euler-product-sieve` · `all` |
| 第二十二章 | 例 `ex-prime-log-orthogonality-and-sieve` 之后 | `euler-product-sieve` · `five` |
| 第二十二章 | §22.3 “首项裂缝……生长之门”一段之后、`sphere-escape` · `thirteen` 之前 | `euler-product-sieve` · `thirtyone` |
| 第二十二章 | §22.3 `thirtyone` 之后一句（“欧几里得的那一招”）之后、格言之前 | `sphere-escape` · `thirteen` |
| 第二十二章 | §22.3 格言之后、§22.4 之前 | `euler-product-sieve` 完整实验室 |
| 第二十二章 | §22.4 “结论 3 有一个立即的推论”一段（零点四个一组）之后 | `critical-mirror` · `quartet` |
| 第二十二章 | §22.4 凯莱坐标的反演一段与 |w|² − 1 的公式之后、例 `ex-cayley-unit-circle-zeros` 之前 | `critical-mirror` · `cayley` |
| 第二十二章 | 例 `ex-cayley-unit-circle-zeros` 之后 | `critical-mirror` · `thin` |
| 第二十二章 | 例 `ex-quartic-mock-quartet` 之后 | `critical-mirror` · `quartic` |
| 第二十二章 | “所以，证明黎曼猜想所需要的信息”一段之后、罗宾不等式一段之前 | `critical-mirror` 完整实验室 |
| 第二十二章 | §22.4.1 绝对收敛域的有限相量说明之后 | `zeta-spectrum-lab` · `domain` |
| 第二十二章 | §22.4.1 有限和与解析延拓的区别之后 | `zeta-spectrum-lab` · `partial` |
| 第二十二章 | §22.4.1 素数幂阶梯与有限零点谱说明之后 | `zeta-spectrum-lab` · `powers` |
| 第二十二章 | §22.4.1 末 | `zeta-spectrum-lab` 完整实验室 |
| 第二十三章 | §23.1 艾森斯坦整数环引言段（“让我们先考察复平面上最对称的二维晶格”）之后、Lean 模块说明之前 | `norm-lattice` · `hex` |
| 第二十三章 | §23.1 末段（“同一颗六角范数球在不同斜交基底下的投影”）之后、§23.2 之前 | `norm-lattice` · `skew` |
| 第二十三章 | 引理 `lem-qform-discriminant` 的证明之后、“由于剪切变换……”一段之前 | `norm-lattice` · `shear` |
| 第二十三章 | 推论 `cor-qform-range-eq-eisnorm` 的证明之后、转入黄金整数一段之前 | `norm-lattice` · `range` |
| 第二十三章 | 定义 `def-golden-int-and-norm` 之后、代数迹一段之前 | `norm-lattice` · `norm` |
| 第二十三章 | 命题 `prop-pell-form-eq-four-mul-norm` 的证明之后 | `norm-lattice` · `pell` |
| 第二十三章 | 佩尔—卢卡斯—斐波那契锁定一段（“当且仅当……$(\pm L_n, \pm F_n)$”）之后、例 `ex-eisenstein-and-golden-pell-lattice` 引言之前 | `norm-lattice` · `units` |
| 第二十三章 | §23.2 末（例 `ex-eisenstein-and-golden-pell-lattice` 之后、§23.3 之前） | `norm-lattice` 完整实验室 |
| 第二十四章 | §24.3 推论 `cor-golden-fixed-point-unique` 的证明之后、“为什么是 1 + 1/x”一段之前 | `fixed-point-convergence` · `golden` |
| 第二十四章 | §24.4 文献注记 `rem-banach-dottie-hairy-ball-literature` 之后、猜想 `conj-schanuel-dottie` 之前 | `fixed-point-convergence` · `far` |
| 第二十四章 | §24.5 三个问题列表第 1 条之后、第 2 条之前 | `fixed-point-convergence` · `rate` |
| 第二十四章 | §24.5 三个问题列表第 2 条之后、第 3 条之前 | `fixed-point-convergence` · `newton` |
| 第二十四章 | 文献注记 `rem-dottie-convergent-residual-literature` 之后“回到第一问的答案”一句之后、例 `ex-dottie-rate-newton-rational` 之前 | `fixed-point-convergence` · `circle` |
| 第二十四章 | 例 `ex-dottie-rate-newton-rational` 之后、“最后一张表说明”一段之前 | `fixed-point-convergence` · `rational` |
| 第二十四章 | “二十三等分的尺子……一千等分的尺子没有”一段之后、“有理读数永远对不准”之前 | `fixed-point-convergence` · `ruler` |
| 第二十四章 | “有限步的观察者看到的是闭合的多边形”一段之后、“双螺旋对应”小节之前 | `fixed-point-convergence` 完整实验室 |
| 第二十四章 | §24.5 双螺旋对应小节 · 等臂转向一段之后、文献注记 `rem-dottie-fibonacci-spiral-literature` 之前 | `dottie-fibonacci-spirals` · `whirl` |
| 第二十四章 | §24.5 双螺旋对应小节 · 一维加法与二维勾股守恒对偶一段之后 | `dottie-fibonacci-spirals` · `pythagoras` |
| 第二十四章 | §24.5 双螺旋对应小节 · 向心径向切角 α 一段之后 | `dottie-fibonacci-spirals` · `tilt` |
| 第二十四章 | §24.5 双螺旋对应小节 · 渐近自相似放大一段之后 | `dottie-fibonacci-spirals` · `zoom` |
| 第二十四章 | §24.5 末（转入 §24.6 之前） | `dottie-fibonacci-spirals` · `twin` |
| 第二十四章 | 章末（第六部小结最后一段之后） | `dottie-fibonacci-spirals` 完整实验室 |
| 第二十五章 | §三比特刀片掩码一节的掩码表之后、“在这套 3 比特编码下”之前 | `blade-multiplication` · `square` |
| 第二十五章 | 两条位运算定律的列表之后、“请特别注意”之前 | `blade-multiplication` · `e2e1` |
| 第二十五章 | “请特别注意”下第一条（伪标量 $I_3$）之后、第二条（两比特辛泡利字）之前 | `blade-multiplication` · `pseudo` |
| 第二十五章 | 例 `ex-pauli-words-xor-sign-table` 之后、§零依赖 Python 3 引擎之前 | `blade-multiplication` · `pauli` |
| 第二十五章 | 例 `ex-xor-pauli-table` 之后、文献注记 `rem-clifford-stabilizer-literature` 之前 | `blade-multiplication` · `vector` |
| 第二十五章 | 文献注记 `rem-clifford-stabilizer-literature` 之后、转入第二十六章之前 | `blade-multiplication` 完整实验室 |
| 第二十六章 | 夹心积一节两条列表（$v_\parallel$ 不动、$v_\perp$ 合成整角）之后、“更美妙的是”之前 | `zyz-compile` · `sandwich` |
| 第二十六章 | 夹心积一节末（“折叠成唯一一枚四分量偶多重向量”）之后、Python 一节之前 | `zyz-compile` · `chain` |
| 第二十六章 | 例 `ex-zyz-compilation-trace` 之后、文献注记 `rem-zyz-euler-compilation-literature` 之前 | `zyz-compile` · `h` |
| 第二十六章 | 文献注记 `rem-zyz-euler-compilation-literature` 之后、章末收束段之前 | `zyz-compile` · `fold`，隔一句讲 2 arccos 0.829592 ≈ 67.9° 的正文后是完整实验室 |
| 第二十九章 | 第二幕末 | `pythagoras-number-escape` · `hippasus` |
| 第二十九章 | 第一座桥“表盘立刻说明线素数写不成两平方和”一段之后 | `pythagoras-number-escape` · `seven` |
| 第二十九章 | 定理 `thm-ch29-face-prime-two-squares` 证明后“几何上，p = a² + b² 说的是半径 √p 的圆穿过格点”一段之后 | `pythagoras-number-escape` · `five` |
| 第二十九章 | 第一座桥手工推导 3（线素数的负佩尔方程无解）之后 | `pythagoras-number-escape` · `locked` |
| 第二十九章 | 第二座桥文献注记 `rem-ch29-elliptic-torus-literature` 之后 | `hairy-ball-normal-escape` · `torus` |
| 第二十九章 | 第三座桥文献注记 `rem-ch29-hasse-gauss-literature` 之后 | `pythagoras-number-escape` · `count` |
| 第二十九章 | 文献注记 `rem-ch29-arithmetic-geometry-literature` 之后 | `pythagoras-number-escape` · `sato` |
| 第二十九章 | 第三座桥末 | `pythagoras-number-escape` 完整实验室 |
| 第二十九章 | 第一层末 | `timeless-causal-crystal` · `crystal` |
| 第二十九章 | 第二层 $\det G \ge 0$ 公式之后 | `timeless-causal-crystal` · `impossible` |
| 第二十九章 | 第四层第 1 条（格拉姆椭圆体）之后 | `gram-causal-elliptope` · `elliptope` |
| 第二十九章 | 第四层第 2 条（半正定矩阵补全）之后 | `gram-causal-elliptope` · `narrow` |
| 第二十九章 | 第四层第 2 条之后、承接句“反过来，若硬把新的内积坐标填到泡泡之外……”之后 | `gram-causal-elliptope` · `violate` |
| 第二十九章 | 第四层观察者对照表之后、承接句“表的另一端是零记忆的瞬时观察者……”之后 | `timeless-causal-crystal` · `right` |
| 第二十九章 | 相干与双端握手一节 · 一 定理 `thm-ch29-coherence-complement-and-pinching` 解读段之后 | `coherence-handshake-causality` · `boolean-illusion` |
| 第二十九章 | 相干与双端握手一节 · 二 定理 `thm-ch29-born-handshake-and-phase-fairness` 解读段之后 | `coherence-handshake-causality` · `born-handshake` |
| 第二十九章 | 相干与双端握手一节 · 三 文献注记 `rem-ch29-transactional-tsvf-eraser-literature` 后第一段（驻相折射扇）之后 | `coherence-handshake-causality` · `feynman-stationary` |
| 第二十九章 | 相干与双端握手一节 · 三 第二段（未来选基擦除分拣与弱值边界）之后 | `coherence-handshake-causality` · `tsvf-eraser` |
| 第二十九章 | 相干与双端握手一节 · 三 第三段（三时刻格拉姆首尾置换）之后 | `coherence-handshake-causality` · `gram-symmetry` |
| 第二十九章 | 相干与双端握手一节 · 四 定理 `thm-ch29-double-cover-fates-and-dottie` 解读段之后 | `coherence-handshake-causality` · `paradox-cancel` |
| 第二十九章 | 相干与双端握手一节末（注记 `rem-ch29-coherence-causality-comparison` 之后、本章小结之前） | `coherence-handshake-causality` 完整实验室 |
| 第二十九章 | 本章小结第一段之后 | `gram-causal-elliptope` 完整实验室 |
| 第三十章 | 第一节 · 2 列表（两道几何视界）之后 | `timeless-causal-crystal` · `thread` |
| 第三十章 | 文献注记 `rem-ch30-query-sos-literature` 之后 | `timeless-causal-crystal` · `sos` |
| 第三十章 | “$P$ 是场，$NP$ 是线”一节 · 1 的列表（离丝寻线）之后 | `timeless-causal-crystal` · `wilderness` |
| 第三十章 | 文献注记 `rem-ch30-karmarkar-kasteleyn-literature` 之后 | `timeless-causal-crystal` · `field` |
| 第三十章 | “$P$ 是场，$NP$ 是线”一节末（“这八个字……”一段之后） | `timeless-causal-crystal` 完整实验室 |
| 第三十章 | ETH 一节 · 1 末（张量关联场） | `eth-horizon-crossover` · `bridge` |
| 第三十章 | 例 `ex-ch30-galactic-crossover-scale` 之后 | `eth-horizon-crossover` · `atoms` |
| 第三十章 | 例 `ex-ch30-galactic-crossover-scale` 后三点启示的第一条（银河算法）之后 | `eth-horizon-crossover` · `constant` |
| 第三十章 | ETH 一节末 | `eth-horizon-crossover` 完整实验室 |
| 第三十章 | 纳维—斯托克斯一节 · 1 末（兰姆恒等式） | `navier-stokes-p-np` · `vortex` |
| 第三十章 | 文献注记 `rem-ch30-vorticity-transport-literature` 之后 | `navier-stokes-p-np` · `strain` |
| 第三十章 | 纳维—斯托克斯一节 · 2 列表第 1 条（二维平面情形）之后、第 2 条之前 | `navier-stokes-p-np` · `flat` |
| 第三十章 | 定理 `thm-ch30-vortex-polygon-spectrum` 的证明后“四个因子是四类运动”一段之后 | `vortex-polygon` · `hexagon` |
| 第三十章 | 命题 `prop-ch30-vortex-polygon-neutral-drift` 的证明后“$c_0$ 是整个多边形绕原点的无穷小转动”一段之后 | `vortex-polygon` · `drift` |
| 第三十章 | 文献注记 `rem-ch30-navier-stokes-forced-literature` 之后、猜想 `conj-coda-navier-stokes-regularity` 之前 | `navier-stokes-p-np` · `burgers` |
| 第三十章 | 猜想 `conj-coda-navier-stokes-regularity` 之后 | `navier-stokes-p-np` · `runaway` |
| 第三十章 | 定理 `thm-coda-quadratic-advection-no-closure` 的证明之后 | `navier-stokes-p-np` · `mixed` |
| 第三十章 | 纳维—斯托克斯一节末 | `navier-stokes-p-np` 完整实验室 |
| 第三十章 | 原有场与线讨论末、新增纠缠一节之前 | `vortex-polygon` 完整实验室 |
| 第三十章 | “量子纠缠、$P=NP$、熵”一节 · 1 末（勾股守恒与偏迹边缘） | `entanglement-entropy-complexity` · `pythagoras` |
| 第三十章 | “量子纠缠、$P=NP$、熵”一节 · 2 数学边界段之后、拓扑切换对比段之前 | `entanglement-entropy-complexity` · `arealaw` |
| 第三十章 | “量子纠缠、$P=NP$、熵”一节 · 2 末（双桥对八桥对比段之后） | `entanglement-entropy-complexity` · `volumelaw` |
| 第三十章 | 文献注记 `rem-ch30-entanglement-entropy-complexity-literature` 后的引出段之后 | `entanglement-entropy-complexity` · `bellcut` |
| 第三十章 | “量子纠缠、$P=NP$、熵”一节 · 3 末（抬起偏迹刀片辨析段之后） | `entanglement-entropy-complexity` · `globaljoint` |
| 第三十章 | “量子纠缠、$P=NP$、熵”一节 · 4 特征角度对照表之后 | `entanglement-entropy-complexity` · `dottie` |
| 第三十章 | “量子纠缠、$P=NP$、熵”一节末（16 比特舞台引出段之后） | `entanglement-entropy-complexity` 完整实验室 |
| 第三十一章 | §31.1 “丈量互易”列表之后 | `quantum-fairness-ledger` · `haar` |
| 第三十一章 | §31.1 零免费午餐账本三项列表之后 | `quantum-fairness-ledger` · `tradeoff` |
| 第三十一章 | §31.2 列表第 1 项（不可克隆内积判据）之后 | `quantum-fairness-ledger` · `cloning` |
| 第三十一章 | §31.2 列表第 2 项（贝尔边缘）之后、定理 `thm-ch31-seat-pythagorean-monogamy-fairness` 的引言之前 | `quantum-fairness-ledger` · `bell` |
| 第三十一章 | 文献注记 `rem-ch31-ckw-monogamy-literature` 之后 | `quantum-fairness-ledger` · `wstate`，一句过渡，再 `ghz` |
| 第三十一章 | 文献注记 `rem-ch31-weyl-window-equidistribution-literature` 之后 | `quantum-fairness-ledger` · `ergodic` |
| 第三十一章 | “看清了这一长程图景”一段之后、五重公平总表之前 | `quantum-fairness-ledger` 完整实验室 |
| 第三十一章 | §31.4.1 定理 `thm-ch31-helix-readout-progress` 后的同族定理解读段之后 | `fairness-square-uncertainty-expansion` · `helix-shadow` |
| 第三十一章 | §31.4.1 末（定理 `thm-ch31-truncation-strong-vs-uniform` 后的并置解读段之后） | `fairness-square-uncertainty-expansion` · `horizon-limit` |
| 第三十一章 | §31.4.2 第一步末（定理 `thm-ch31-phase-polynomial-quadratic` 后的解读段之后） | `fairness-square-uncertainty-expansion` · `fair-square` |
| 第三十一章 | §31.4.2 第二步末（定理 `thm-ch31-diagonal-phase-blindness` 后的解读段之后） | `fairness-square-uncertainty-expansion` · `phase-fold` |
| 第三十一章 | §31.4.2 第三步末（文献注记 `rem-ch31-jvn-gleason-robertson-literature` 后的总结段之后） | `fairness-square-uncertainty-expansion` · `uncertainty-wedge` |
| 第三十一章 | §31.4.3 文献注记 `rem-ch31-krylov-euclid-literature` 后的时间扩张诠释段之后、四命题总表之前 | `fairness-square-uncertainty-expansion` · `time-expand` |
| 第三十一章 | §31.4 末（全章末尾） | `fairness-square-uncertainty-expansion` 完整实验室 |
| 第三十二章 · §32.1 | `ch32-s01-axiom-of-comparison.md` 预算圆改写光锥与比较预算守恒段之后 | `comparison-oisc-engine` · `budget-cone` |
| 第三十二章 · §32.2 | `ch32-s02-oisc-comparison-engine.md` 求同与求异双通道列表之后 | `comparison-oisc-engine` · `oisc` |
| 第三十二章 · §32.2 | `ch32-s02-oisc-comparison-engine.md` 六重涌现第（一）项（量子概率与海森堡测不准）之后 | `comparison-oisc-engine` · `uncertainty` |
| 第三十二章 · §32.2 | `ch32-s02-oisc-comparison-engine.md` 六重涌现第（二）项（三维空间与三维八角盒）之后 | `comparison-oisc-engine` · `emergence` |
| 第三十二章 · §32.2 | `ch32-s02-oisc-comparison-engine.md` 六重涌现第（三）项（时间流逝与正交开维）之后 | `comparison-oisc-engine` · `time-axis` |
| 第三十二章 · §32.2 | `ch32-s02-oisc-comparison-engine.md` 六重涌现第（五）项（快表记忆化）之后、第（六）项之前 | `comparison-oisc-engine` · `lookup` |
| 第三十二章 · §32.3 | `ch32-s03-axioms-as-corollaries.md` 五大基础公理推论与桥接总表之后、转入 §32.4 之前 | `comparison-oisc-engine` 完整实验室 |
| 第三十二章 · §32.4 | `ch32-s04-generative-laws.md` 三条创生律列表之后、定理 `thm-ch32-generative-self-reference-and-zeckendorf` 引言之前 | `unified-field-slice` · `polytope` |
| 第三十二章 · §32.4 | `ch32-s04-generative-laws.md` 文献注记 `rem-ch32-generative-laws-dottie-literature` 之后 | `unified-field-slice` · `fixedpoint` |
| 第三十二章 · §32.4 | `ch32-s04-generative-laws.md` 末（统一场横纵双螺旋分工列表之后、转入 §32.5 之前） | `dottie-fibonacci-spirals` · `division` |
| 第三十二章 · §32.5 | `ch32-s05-physical-fields-and-six-domains.md` 列表第 1 条（物质旋量与狭义相对论）之后、第 2 条之前 | `unified-field-slice` · `photon` |
| 第三十二章 · §32.5 | `ch32-s05-physical-fields-and-six-domains.md` 列表第 2 条（规范相互作用与环路残差）之后、第 3 条之前 | `unified-field-slice` · `plaquette` |
| 第三十二章 · §32.5 | `ch32-s05-physical-fields-and-six-domains.md` 列表第 3 条（全息热力学引力与视界）之后、第 4 条之前 | `unified-field-slice` · `horizon` |
| 第三十二章 · §32.5 | `ch32-s05-physical-fields-and-six-domains.md` 定理 `thm-ch32-null-cone-holonomy-and-holographic-cut` 的证明之后 | `lattice-gauge-loop` · `anchor` |
| 第三十二章 · §32.5 | `ch32-s05-physical-fields-and-six-domains.md` 末（文献注记 `rem-ch32-six-domain-isomorphism-table` 之后、转入 §32.6 之前） | `unified-field-slice` 完整实验室 |
| 第三十二章 · §32.6 | `ch32-s06-meta-unification-and-icosian-bridge.md` 三根诊断轴列表之后、“在逐一检阅四大理论阵营之前”之前 | `meta-unification-compass` · `cube` |
| 第三十二章 · §32.6 | `ch32-s06-meta-unification-and-icosian-bridge.md` 文献注记 `rem-ch32-icosian-e8-literature` 之后，各隔一句承上启下的话 | `meta-unification-compass` · `icosians`、`e8`、`fold` |
| 第三十二章 · §32.6 | `ch32-s06-meta-unification-and-icosian-bridge.md` 文献注记 `rem-ch32-eight-programs-literature` 之后（隔一句话） | `meta-unification-compass` · `camps` |
| 第三十二章 · §32.6 | `ch32-s06-meta-unification-and-icosian-bridge.md` 末段“……看见了整座宇宙。”之后 | `meta-unification-compass` · `crystal` |
| 第三十二章 · §32.6 | `ch32-s06-meta-unification-and-icosian-bridge.md` 末尾（全章收束） | `meta-unification-compass` 完整实验室 |
| 第三十三章 | “互指单调锁死”一节列表第 1 条（独自闭门内省）之后、第 2 条之前 | `mutual-observer-attractors` · `alone` |
| 第三十三章 | 例 `ex-ch33-mutual-cosine-monotonic-lock` 之后、“对照……轨迹账本”一段之前 | `mutual-observer-attractors` · `round` |
| 第三十三章 | “两人起点不同时也是如此”一段之后、“接受窗交集”一节之前 | `mutual-observer-attractors` · `apart` |
| 第三十三章 | 文献注记 `rem-ch33-rt-reconnection-ckw-literature` 之后、“把窗口交集体积……合拢”一段之前 | `mutual-observer-attractors` · `transition` |
| 第三十三章 | 三种相互吸引列表之后、“这便彻底解开”一段之前 | `mutual-observer-attractors` · `connected` |
| 第三十三章 | “进入下一节审视多观察者群体的去相干共识之前”一段之后、`#sec-ch33-consensus-decoherence-pointer` 之前 | `mutual-observer-attractors` 完整实验室 |
| 第三十三章 | `#sec-ch33-consensus-tensor-axis` 各向同性迷雾导引段之后、定理 `thm-ch33-consensus-quadratic-and-gram` 之前 | `observer-consensus-decoherence` · `isotropic-fog` |
| 第三十三章 | `#sec-ch33-consensus-tensor-axis` 末（定理 `thm-ch33-consensus-quadratic-and-gram` 及其证明与规范对照段之后） | `observer-consensus-decoherence` · `phase-gauge` |
| 第三十三章 | `#sec-ch33-consensus-pinching-pointer` 末（定理 `thm-ch33-consensus-pinching-and-fixed-points` 及适用护栏段之后） | `observer-consensus-decoherence` · `axis-consensus` |
| 第三十三章 | `#sec-ch33-consensus-darwinism-kernel` 末（定理 `thm-ch33-consensus-redundant-records-and-kernel` 及边界说明段之后） | `observer-consensus-decoherence` · `darwinism-plateau` |
| 第三十三章 | `#sec-ch33-consensus-wigner-pioneers` 定理 `thm-ch33-consensus-revision-and-escape` 之后、文献注记 `rem-ch33-quantum-darwinism-local-friendliness-literature` 之前 | `observer-consensus-decoherence` · `dual-wigner-bubbles` |
| 第三十三章 | `#sec-ch33-consensus-wigner-pioneers` 平面外拓荒观察者推导段之后、五维对照注记 `rem-ch33-consensus-vs-absolute-objectivity` 之前 | `observer-consensus-decoherence` · `new-axis-pioneers` |
| 第三十三章 | 五维对照注记 `rem-ch33-consensus-vs-absolute-objectivity` 导览段之后、全章末转入第三十四章一段之前 | `observer-consensus-decoherence` 完整实验室 |
| 第三十四章 | 例 `ex-ch34-spherical-addressing-preview` 之后 | `spherical-degeneracy-radar` · `meridian` |
| 第三十四章 | 该例之后的解读段（“自定位罗盘”）之后 | `spherical-degeneracy-radar` · `sweep` |
| 第三十四章 | 定理 `thm-ch34-perpendicular-axis-and-pullback` 之后的解读段（“三款结论连起来看”）之后、注记 `rem-ch34-localization-figure` 之前 | `spherical-degeneracy-radar` · `pullback` |
| 第三十四章 | 八分球面一节第一段之后 | `spherical-degeneracy-radar` · `hops` |
| 第三十四章 | 八分球面一节第二段（“读成同一个结果”）之后、定理 `thm-ch34-readout-kernel-and-covariant-commutator` 之前 | `spherical-degeneracy-radar` · `equator` |
| 第三十四章 | 例 `ex-ch34-spherical-addressing-and-octant-rotors` 之后 | `spherical-degeneracy-radar` · `tilted` |
| 第三十四章 | 该例之后的定位箴言段之后、第三节之前 | `spherical-degeneracy-radar` · `frames` |
| 第三十四章 | 文献注记 `rem-ch34-virtual-z-berry-relativity-literature` 之后 | `berry-loop` · `octant` |
| 第三十四章 | 四阶总表之后的“凡简并处”一段之后 | `spherical-degeneracy-radar` 完整实验室 |
| 第三十四章 | §34.4 开篇三矢量体积元公式之后、“一、一体双影”之前 | `spherical-trihedron-cell` · `cell` |
| 第三十四章 | §34.4 “一、一体双影”第 1 条（沿中脊棱投影“正交一次”）之后 | `spherical-trihedron-cell` · `once-ridge` |
| 第三十四章 | §34.4 “一、一体双影”第 2 条（沿两面正交墙分解“正交两次”）之后 | `spherical-trihedron-cell` · `twice-walls` |
| 第三十四章 | §34.4 “二、公平平方撑起品红球面帽”末、“三、为什么必须是极小的”之前 | `spherical-trihedron-cell` · `cap-excess` |
| 第三十四章 | §34.4 “三、为什么必须是极小的”第 2 条（平直幻象与曲率量子）之后 | `spherical-trihedron-cell` · `gram-brick` |
| 第三十四章 | §34.4 “三、为什么必须是极小的”第 3 条（离散球面与八分球极限）之后 | `spherical-trihedron-cell` · `octant-limit` |
| 第三十四章 | §34.4 四重视角对照表与引出段之后、转入 §34.5 之前 | `spherical-trihedron-cell` 完整实验室 |
| 第三十四章 | §34.5.1 等边极小三角弧面体 $\det G_3 = (1 - c_0)^2(1 + 2c_0)$ 与角超段之后 | `triadic-nameless-sandbox` · `bootstrap-core` |
| 第三十四章 | §34.5.1 末（$1 \to 4 \to 10$ 黄金阻尼花冠增殖段之后、§34.5.2 之前） | `triadic-nameless-sandbox` · `cascade-corolla` |
| 第三十四章 | §34.5.2 末（$120^\circ$ $\mathbb{Z}_3$ 主谓宾切面轮换段之后、§34.5.3 之前） | `triadic-nameless-sandbox` · `cyclic-triality` |
| 第三十四章 | §34.5.3 语词切分对照表与 $\nu = 0.35$ 半撤之梯段之后、命题 `prop-ch34-triadic-bootstrap-and-lexical-pinching` 之前 | `triadic-nameless-sandbox` · `ladder-fade` |
| 第三十四章 | §34.5.3 “本体不可知，但是这么个感觉”收束段之后 | `triadic-nameless-sandbox` · `noumenon-breath` |
| 第三十四章 | §34.5 末（转入 §34.6 一段之后） | `triadic-nameless-sandbox` 完整实验室 |
| 第三十四章 | §34.6.1 末（三维斯托克斯扇锥体积、贝里相位与韦斯—祖米诺延拓辨析之后） | `berry-sector-path-sandbox` · `sector-volume` |
| 第三十四章 | §34.6.2 同点异相霍普夫纤维抬升两路径对照之后、定理 `thm-ch34-berry-sector-holonomy-and-bargmann-lift` 之前 | `berry-sector-path-sandbox` · `hopf-fiber-lift` |
| 第三十四章 | §34.6.3 末（单连通前提与 Mandelstam–Giles–Barrett 模规范重构边界之后） | `berry-sector-path-sandbox` · `stokes-wilson-duality` |
| 第三十四章 | §34.6.4 第 1 条（离散 $N$ 步巴格曼—潘查拉特纳姆扇形剖分与相干态传播子）之后 | `berry-sector-path-sandbox` · `pancharatnam-fan` |
| 第三十四章 | §34.6.4 第 2 条（科纽螺线驻相选路）之后、例 `ex-ch34-sector-volume-hopf-and-cornu-benchmark` 之前 | `berry-sector-path-sandbox` · `feynman-stationary` |
| 第三十四章 | §34.6 末（转入 §34.7 一段之后） | `berry-sector-path-sandbox` 完整实验室 |
| 第三十四章 | §34.7.1 相位积分泛函段之后、定理 `thm-ch34-phase-cancellation-and-standing-sieve` 引言之前 | `standing-wave-volume-sandbox` · `multi-phase-point` |
| 第三十四章 | §34.7.2 末（零坐标余弦均值恒等式 $\lvert\Psi(x)\rvert^2 = \langle\cos\gamma_B\rangle_x$ 段之后） | `standing-wave-volume-sandbox` · `circle-density-pushforward` |
| 第三十四章 | §34.7.3 第 1 条（黄金无理转角遍历相消造就虚空）之后 | `standing-wave-volume-sandbox` · `void-cancellation` |
| 第三十四章 | §34.7.3 末（玻尔—索末菲整圈锁相、泡利排斥刚性与全息驻波成像列表之后） | `standing-wave-volume-sandbox` · `bohr-sommerfeld-quantization` |
| 第三十四章 | §34.7.4 本体翻转对照总表解读段之后、例 `ex-ch34-standing-wave-density-sweep-benchmark` 之前 | `standing-wave-volume-sandbox` · `standing-volume-emergence` |
| 第三十四章 | §34.7 末（转入 §34.8 一段之后） | `standing-wave-volume-sandbox` 完整实验室 |
| 第三十四章 | §34.8.1 末（单胞 $N = 1$ 四阶等权共存段之后、定理 `thm-ch34-clifford-monad-and-boundary-cancellation` 引言之前） | `clifford-monad-tiling-sandbox` · `monad-four-in-one` |
| 第三十四章 | §34.8.2 第 2 条（非交换二阶点梯度锁定内禀贝里相位）之后 | `clifford-monad-tiling-sandbox` · `gradient-path-phase-lock` |
| 第三十四章 | §34.8.2 末（三维霍奇对偶与极小斯托克斯同构之后） | `clifford-monad-tiling-sandbox` · `hodge-stokes-duality` |
| 第三十四章 | §34.8.3 $N = 1 \to 4 \to 16 \to 64$ 球面三角网格剖分内部边抵消段之后 | `clifford-monad-tiling-sandbox` · `multicell-boundary-cancellation` |
| 第三十四章 | §34.8.3 $N = 27$ 三维胞腔堆叠各阶分化段之后、例 `ex-ch34-clifford-monad-and-tiling-cancellation-benchmark` 之前 | `clifford-monad-tiling-sandbox` · `macroscopic-grade-sieve` |
| 第三十四章 | §34.8 末（转入 §34.9 一段之后） | `clifford-monad-tiling-sandbox` 完整实验室 |
| 第三十四章 | §34.9.1 格拉姆行列式逐阶溢出（点→线→面→体积）列表之后 | `reversal-diagonal-cascade-sandbox` · `gram-overflow-cascade` |
| 第三十四章 | §34.9.1 末（同点异相碰撞撑开时间轴一段之后、§34.9.2 之前） | `reversal-diagonal-cascade-sandbox` · `time-from-phase-collision` |
| 第三十四章 | §34.9.2 末（对角逃逸不完备塔 $T \to T' \to T''$ 段之后、§34.9.3 之前） | `reversal-diagonal-cascade-sandbox` · `arrival-diagonal-escape` |
| 第三十四章 | §34.9.3 末（二次正交闭包 $M^{\perp\perp} = \overline{M}$ 解读段之后、§34.9.4 之前） | `reversal-diagonal-cascade-sandbox` · `reversal-dual-cut` |
| 第三十四章 | §34.9.4 五阶阻塞—生成元概念级联总表之后 | `reversal-diagonal-cascade-sandbox` · `concept-obstruction-cascade` |
| 第三十四章 | §34.9 末（转入 §34.10 过渡段之后） | `reversal-diagonal-cascade-sandbox` 完整实验室 |
| 第三十四章 | §34.10.1 末（全连通可比图 $K_N$ 三元闭环剖分段之后、§34.10.2 之前） | `trihedron-rigidity-truss-sandbox` · `complete-graph-triangulation` |
| 第三十四章 | §34.10.2.1 末（最小紧致非交换单李代数 $\dim = 3$ 地板之后、§34.10.2.2 之前） | `trihedron-rigidity-truss-sandbox` · `downward-irreducibility-lock` |
| 第三十四章 | §34.10.2.2 末（$k$-SAT 向 $3$-SAT 三元子句归约之后、§34.10.3 之前） | `trihedron-rigidity-truss-sandbox` · `floppy-c4-vs-rigid-k4` |
| 第三十四章 | §34.10.3 第 1 条（$N = 4$ 麦克斯韦—拉曼三维刚性多项式静定锁死）之后 | `trihedron-rigidity-truss-sandbox` · `maxwell-laman-polynomial` |
| 第三十四章 | §34.10.3 末（全连通比较网刚性与雷吉角亏对照表之后、§34.10.4 之前） | `trihedron-rigidity-truss-sandbox` · `regge-curvature-glow` |
| 第三十四章 | §34.10 末（转入 §34.11 一段之后） | `trihedron-rigidity-truss-sandbox` 完整实验室 |
| 第三十四章 | §34.11.1 二阶圆弧矢高与费曼—伊藤二次标度段之后 | `quantum-arc-macro-integral-sandbox` · `arc-sagitta-ito` |
| 第三十四章 | §34.11.1 量子力学三大标志性特征列表之后、定理 `thm-ch34-quantum-arc-differential-and-macro-integral` 引言之前 | `quantum-arc-macro-integral-sandbox` · `quantum-three-hallmarks` |
| 第三十四章 | §34.11.2 第 1 条（第一支柱“以曲拼直”横向手性对消）之后 | `quantum-arc-macro-integral-sandbox` · `curve-stitches-straight` |
| 第三十四章 | §34.11.2 末（第四支柱“同相成体、漏相化热”之后、§34.11.3 之前） | `quantum-arc-macro-integral-sandbox` · `force-from-phase-gradient` |
| 第三十四章 | §34.11.3 开篇引出段之后、微积分对偶六维总表之前 | `quantum-arc-macro-integral-sandbox` · `calculus-duality-zoom` |
| 第三十四章 | §34.11 末（转入 §34.12 一段之后） | `quantum-arc-macro-integral-sandbox` 完整实验室 |
| 第三十四章 | §34.12.1 末（“万物皆为场等价于极小圆弧积分为场”之后、§34.12.2 之前） | `triadic-arc-field-loop-sandbox` · `arc-seed-triad` |
| 第三十四章 | §34.12.2 第一阶（$O(\epsilon^1)$ 圆弧切向弦步与粒子世界线）之后 | `triadic-arc-field-loop-sandbox` · `line-particle-worldline` |
| 第三十四章 | §34.12.2 第二阶（$O(\epsilon^2)$ 圆弧法向矢高与波动干涉）之后 | `triadic-arc-field-loop-sandbox` · `surface-wave-sagitta` |
| 第三十四章 | §34.12.2 末（第三阶 $O(\epsilon^3)$ 圆弧体元与场凝聚之后、§34.12.3 之前） | `triadic-arc-field-loop-sandbox` · `volume-field-condensation` |
| 第三十四章 | §34.12.3 末（$\epsilon \to 0$ 压平归零对照实验段之后、§34.12.4 之前） | `triadic-arc-field-loop-sandbox` · `reversal-field-to-particle` |
| 第三十四章 | §34.12 末（转入 §34.13 一段之后） | `triadic-arc-field-loop-sandbox` 完整实验室 |
| 第三十四章 | §34.13.1 杨辉三角 `1—3—3—1` 饱和三维体积元旋转各向同性段之后 | `octave-point-volume-field-sandbox` · `pascal-hodge-1331` |
| 第三十四章 | §34.13.1 末（跨层级八度螺旋等同 $\Lambda^3_\ell \equiv \Lambda^0_{\ell+1}$ 公式之后、§34.13.2 之前） | `octave-point-volume-field-sandbox` · `octave-helix-zoom` |
| 第三十四章 | §34.13.2 第 1 条（亥姆霍兹—汤川与施温格正算符逆格林互逆）之后 | `octave-point-volume-field-sandbox` · `green-yukawa-reciprocity` |
| 第三十四章 | §34.13.2 第 2 条（Delone 最小间距紫外截断与穿衣态）之后 | `octave-point-volume-field-sandbox` · `dressed-uv-cutoff` |
| 第三十四章 | §34.13.2 末（第 3 条位置—动量共轭傅里叶与有限泊松直通恒等式之后、§34.13.3 之前） | `octave-point-volume-field-sandbox` · `position-momentum-duality` |
| 第三十四章 | §34.13 末（转入 §34.14 设问段之后） | `octave-point-volume-field-sandbox` 完整实验室 |
| 第三十四章 | §34.14.1 第 2 条（三维体积伪标量 $\mathbf{I}_3^2 = -1$ 与 APS 副矢量双度规同源推导）之后 | `lorentz-pseudoscalar-sm-octave-sandbox` · `pseudoscalar-minus-sign` |
| 第三十四章 | §34.14.1 末（第 3 条固有时原地驻波闭合预算与零光锥刚性之后、§34.14.2 之前） | `lorentz-pseudoscalar-sm-octave-sandbox` · `proper-time-budget-cone` |
| 第三十四章 | §34.14.2 末（标准模型 `1—2—3` 规范群与“点·线·面·体”四阶粒子表解读段之后、§34.14.3 之前） | `lorentz-pseudoscalar-sm-octave-sandbox` · `sm-123-gauge-grades` |
| 第三十四章 | §34.14.3 第 1 条（$\mathrm{SU}(3)_C$ 色禁闭与重子/介子跨八度复合点生成）之后 | `lorentz-pseudoscalar-sm-octave-sandbox` · `color-confinement-baryon` |
| 第三十四章 | §34.14.3 末（三代驻波猜想与夸克—核子—原子跨层汤川/库仑八度接力之后、§34.14.4 之前） | `lorentz-pseudoscalar-sm-octave-sandbox` · `pion-yukawa-octave-handoff` |
| 第三十四章 | §34.14 末（转入 §34.15 设问段之后） | `lorentz-pseudoscalar-sm-octave-sandbox` 完整实验室 |
| 第三十四章 | §34.15.1 第 2 条（单比特非对易门换位回路张开极小圆弧体）之后 | `quantum-gate-cosmic-tower-sandbox` · `gate-commutator-trihedron` |
| 第三十四章 | §34.15.1 末（第 3 条双比特纠缠门撕开可分 Segre 流形之后、§34.15.2 之前） | `quantum-gate-cosmic-tower-sandbox` · `entangling-segre-escape` |
| 第三十四章 | §34.15.2 末（`1—3—3—1` 通用四拍语法与内禀时间节拍之后、§34.15.3 之前） | `quantum-gate-cosmic-tower-sandbox` · `octave-1331-grammar` |
| 第三十四章 | §34.15.3 自底向上六层宇宙概念塔（`L0`–`L5`）总表之后 | `quantum-gate-cosmic-tower-sandbox` · `six-tier-cosmic-tower` |
| 第三十四章 | §34.15.3 末（$4\pi$ 旋量双覆叠单侧莫比乌斯本体回环段之后、§34.15.4 之前） | `quantum-gate-cosmic-tower-sandbox` · `mobius-ouroboros-closure` |
| 第三十四章 | §34.15 末（转入 §34.16 过渡段之后） | `quantum-gate-cosmic-tower-sandbox` 完整实验室 |
| 第三十四章 | §34.16.1 末（破缺—守恒勾股拆账与嘉当—CCWZ 曲率之后、§34.16.2 之前） | `coset-breaking-conservation-tower-sandbox` · `pythagorean-coset-ledger` |
| 第三十四章 | §34.16.2 第 1 条（局域规范安德森—希格斯 `2 + 1 = 3` 纵向吸收体闭合）之后 | `coset-breaking-conservation-tower-sandbox` · `goldstone-vs-higgs-closure` |
| 第三十四章 | §34.16.2 末（第 2 条全局手征 $\pi_3(G/H) = \mathbb{Z}$ Skyrmion 拓扑缠绕之后、§34.16.3 之前） | `coset-breaking-conservation-tower-sandbox` · `skyrmion-baryon-winding` |
| 第三十四章 | §34.16.3 五大破缺—守恒概念塔总表及塔 IV 超导晶格同台解读段之后 | `coset-breaking-conservation-tower-sandbox` · `superconductor-crystal-meissner` |
| 第三十四章 | §34.16.3 末（五塔跨层接力链列表之后、§34.16.4 之前） | `coset-breaking-conservation-tower-sandbox` · `five-family-cascade-relay` |
| 第三十四章 | §34.16 末（转入 §34.17 过渡段之后） | `coset-breaking-conservation-tower-sandbox` 完整实验室 |
| 第三十四章 | §34.17.1 第 1 条（不妄僭超然全知之我与偏迹盲区/访问缺陷）之后 | `bounded-horizon-thermodynamics-sandbox` · `omniscient-zero` |
| 第三十四章 | §34.17.1 末（第 2 条不妄执孤立自存之我与零温芝诺冻结之后、§34.17.2 之前） | `bounded-horizon-thermodynamics-sandbox` · `isolated-zeno` |
| 第三十四章 | §34.17.2 末（全息面积律与 12 比特嵌套对割佩奇曲线段之后、§34.17.3 之前） | `bounded-horizon-thermodynamics-sandbox` · `horizon-page-curve` |
| 第三十四章 | §34.17.3 末（富田—竹崎模流有效温度与热力学四大定律同源闭合之后、§34.17.4 之前） | `bounded-horizon-thermodynamics-sandbox` · `modular-unruh-heat` |
| 第三十四章 | §34.17.4 四种认知—热力学相态总表及 $\theta^*$ 净秩序偏置解读段之后、主定理引言之前 | `bounded-horizon-thermodynamics-sandbox` · `dottie-living-steady` |
| 第三十四章 | §34.17 末（转入 §34.18 格拉姆窗口设问段之后） | `bounded-horizon-thermodynamics-sandbox` 完整实验室 |
| 第三十四章 | §34.18.1 两幅互补几何视图（椭球窗与球面相干帽走廊 $\Omega_M$）列表之后 | `gram-window-consensus-sandbox` · `schur-cap-corridor` |
| 第三十四章 | §34.18.1 末（三维观察者黄金格拉姆窗口 $M = 3$ 解读段之后、§34.18.2 之前） | `gram-window-consensus-sandbox` · `golden-triangle-m3` |
| 第三十四章 | §34.18.2 第 2 条（球面可行走廊嵌套萎缩与过约束死锁）之后 | `gram-window-consensus-sandbox` · `overconstrained-lock-m9` |
| 第三十四章 | §34.18.2 末（五档格拉姆窗口阶数对照表之后、§34.18.3 之前） | `gram-window-consensus-sandbox` · `forgetting-reopen` |
| 第三十四章 | §34.18.3 末（双观察者联合接受窗 $\Omega_A \cap \Omega_B$ 与共同遗忘重开段之后、§34.18.4 之前） | `gram-window-consensus-sandbox` · `dual-window-consensus` |
| 第三十四章 | §34.18 末（转入 §34.19 单个比较矩阵元设问段之后） | `gram-window-consensus-sandbox` 完整实验室 |
| 第三十四章 | §34.18.5 整除图与自然序消元说明之后 | `arithmetic-schur-lab` · `natural` |
| 第三十四章 | §34.18.5 固定终端的两种消元顺序算例之后 | `arithmetic-schur-lab` · `leaf` |
| 第三十四章 | §34.18.5 阈值丢弃与原系统残差说明之后 | `arithmetic-schur-lab` · `drop` |
| 第三十四章 | §34.18.5 随机游走重复平方与资源说明之后 | `arithmetic-schur-lab` · `square` |
| 第三十四章 | §34.18.5 带号轨道支撑与信号归一化必要预算书面推导之后 | `arithmetic-schur-lab` · `budget` |
| 第三十四章 | §34.18.5 末 | `arithmetic-schur-lab` 完整实验室 |
| 第三十四章 | §34.19.1 末（吕德斯—马吕斯往返平方律与布洛赫倍角换算桥之后、§34.19.2 之前） | `roundtrip-born-imaginary-blindspot-sandbox` · `radar-roundtrip-born` |
| 第三十四章 | §34.19.2 第 3 条（$360^\circ$ 等倾角盲区圆锥簇 $\mathbf{V}(\theta, \varphi)$）之后 | `roundtrip-born-imaginary-blindspot-sandbox` · `azimuth-cone-blindspot` |
| 第三十四章 | §34.19.2 末（对角测量相位失明与罗伯逊—薛定谔换位子下界两项列表之后、§34.19.3 之前） | `roundtrip-born-imaginary-blindspot-sandbox` · `observer-first-person-90` |
| 第三十四章 | §34.19.3 实轴 `1`、盲区 `i`、双转 `i^2 = -1` 与 $90^\circ$ 互补转身对照表之后 | `roundtrip-born-imaginary-blindspot-sandbox` · `imaginary-double-turn` |
| 第三十四章 | §34.19.3 末（薛定谔切向时间引擎与投影概率流对易子导数段之后、§34.19.4 之前） | `roundtrip-born-imaginary-blindspot-sandbox` · `schrodinger-arc-engine` |
| 第三十四章 | §34.19 末（全章十九阶总收官转入第三十五章一段之后） | `roundtrip-born-imaginary-blindspot-sandbox` 完整实验室 |
| 第三十四章 | §34.19.5.1 双分支匹配与流守恒之后 | `scattering-temporal-bridge` · `barrier` |
| 第三十四章 | §34.19.5.2 等幅反相且不可分辨的单能量相消之后 | `scattering-temporal-bridge` · `cancel` |
| 第三十四章 | §34.19.5.2 标记正交与非相干本底说明之后 | `scattering-temporal-bridge` · `marked` |
| 第三十四章 | §34.19.5 末 | `scattering-temporal-bridge` 完整实验室 |
| 第三十四章 | §34.26.1 第 1 条（两扇正交侧壁爬行 $L_{\mathrm{walls}}(\epsilon) = 2\epsilon$ 与 $\Omega(n\log n)$ 全局排序税）之后 | `trihedron-chord-pivot-tunneling-sandbox` · `walls-dijkstra-tax` |
| 第三十四章 | §34.26.1 第 2 条（品红球面顶盖无序波前松弛 $L_{\mathrm{cap}}(\epsilon) = \arccos(\cos^2\epsilon)$ 与热带幂等相消）之后 | `trihedron-chord-pivot-tunneling-sandbox` · `cap-wavefront-relax` |
| 第三十四章 | §34.26.1 末（第 3 条平直内割弦面热带舒尔补消元与三级长度严格不等式之后、§34.26.2 之前） | `trihedron-chord-pivot-tunneling-sandbox` · `flat-chord-tunnel` |
| 第三十四章 | §34.26.2 末（向心多尺度全息重整化锥四拍列表与公式之后、§34.26.3 之前） | `trihedron-chord-pivot-tunneling-sandbox` · `holographic-pivot-cone` |
| 第三十四章 | §34.26.4 五维对照总表之后、文献注记 `rem-ch34-sssp-sorting-barrier-and-instanton-literature` 之前 | `trihedron-chord-pivot-tunneling-sandbox` · `resonant-pivot-relay` |
| 第三十四章 | §34.26 末（转入 §34.27 时间双缝追问段之后） | `trihedron-chord-pivot-tunneling-sandbox` 完整实验室 |
| 第三十四章 | §34.27.1 经典实轴负动能平方 $p^2(x) < 0$ 死墙折返段之后 | `imaginary-chord-temporal-double-slit-sandbox` · `classical-real-wall` |
| 第三十四章 | §34.27.1 末（$90^\circ$ 盲平面正交动量旋入、三段式几何全景与矩形势垒透射公式 $T(E)$ 之后、§34.27.2 之前） | `imaginary-chord-temporal-double-slit-sandbox` · `ninety-deg-imaginary-chord` |
| 第三十四章 | §34.27.2 时间双缝能量谱干涉定律 $P(E)$ 与普朗克互易梳齿公式 $\Delta E = h/\Delta t$ 之后 | `imaginary-chord-temporal-double-slit-sandbox` · `temporal-double-slit-comb` |
| 第三十四章 | §34.27.2 末（空间双缝、量子隧穿与时间双缝正交对偶总表之后、§34.27.3 之前） | `imaginary-chord-temporal-double-slit-sandbox` · `attosecond-tunnel-self-interference` |
| 第三十四章 | §34.27.3 末（算例 `ex-ch34-nanobarrier-and-attosecond-fringe-calculus` 与受监测返回芝诺冻结段之后、§34.27.4 之前） | `imaginary-chord-temporal-double-slit-sandbox` · `zeno-midway-probe-collapse` |
| 第三十四章 | §34.27 末（转入 §34.28–§34.29 算术—量子合流阶梯一段之后） | `imaginary-chord-temporal-double-slit-sandbox` 完整实验室 |
| 第三十四章 | §34.28.1 末（第 3 条莫比乌斯外积路径积分 $\Lambda^k$ 之后、§34.28.2 之前） | `riemann-prime-arc-path-integral-sandbox` · `euler-dirichlet-phasor-spiral` |
| 第三十四章 | §34.28.2 第二重机制“踏上临界线时”一段之后、“认识论诚实警钟”之前 | `riemann-prime-arc-path-integral-sandbox` · `critical-zero-cancellation` |
| 第三十四章 | §34.28.2 末（算例 `ex-ch34-critical-zeros-and-dual-shells` 之后的引导段之后、§34.28.3 之前） | `riemann-prime-arc-path-integral-sandbox` · `off-line-shell-imbalance` |
| 第三十四章 | §34.28.3 末（算例 `ex-ch34-weil-prime-staircase-reconstruction` 之后的引导段之后、§34.28.4 之前） | `riemann-prime-arc-path-integral-sandbox` · `weil-explicit-prime-staircase` |
| 第三十四章 | §34.28 末（转入 §34.29 算术枢轴与多级共振隧穿悬念段之后） | `riemann-prime-arc-path-integral-sandbox` 完整实验室 |
| 第三十四章 | §34.29.1 第 2 条（顺序 NBB 格拉姆残差对数下界 $C_{\mathrm{NBB}}/\ln M$）之后、转入 §34.29.2 过渡段之前 | `arithmetic-pivot-resonant-tunneling-sandbox` · `turan-zeno-hard-cutoff` |
| 第三十四章 | §34.29.2 第二步（分块舒尔补消元与算术 MERA 重整化锥三点总结）之后、转入 §34.29.3 过渡段之前 | `arithmetic-pivot-resonant-tunneling-sandbox` · `block-schur-pivot-mera` |
| 第三十四章 | §34.29.3 第 1 小节（单级磨光器裸隧穿与 $\vartheta = \frac{4}{7}$ 色散衰减墙）末 | `arithmetic-pivot-resonant-tunneling-sandbox` · `mollifier-four-sevenths-wall` |
| 第三十四章 | §34.29.3 末（算例 `ex-ch34-turan-schur-and-cayley-calculus` 之后的总结句之后、过渡段与 §34.29.4 之前） | `arithmetic-pivot-resonant-tunneling-sandbox` · `fabry-perot-rogue-explosion` |
| 第三十四章 | §34.29 末（转入 §34.30 极小圆弧体重塑微积分收束段之后） | `arithmetic-pivot-resonant-tunneling-sandbox` 完整实验室 |
| 第三十四章 | §34.30.1 比较旋子弦—矢高恒等式 $(1 - v_\epsilon)^2 + c_\epsilon^2 \equiv 1$ 与 $\theta = \frac{\pi}{2}$ 消奇点三点列表之后、复步求导段之前 | `arc-body-calculus-sandbox` · `osculating-rotor-vs-tangent` |
| 第三十四章 | §34.30.1 定义 `def-ch34-arc-body-calculus-primitives` 之后、转入 §34.30.2 过渡段之前 | `arc-body-calculus-sandbox` · `blind-zone-complex-step` |
| 第三十四章 | §34.30.2 四相区粗糙度相图列表（含 $\alpha = \frac{1}{2}$ 伊藤/费曼矢高共振与 $\alpha < \frac{1}{2}$ 粗糙路径）之后、转入 §34.30.3 过渡段之前 | `arc-body-calculus-sandbox` · `roughness-ito-phase-transition` |
| 第三十四章 | §34.30.3 第 1 小节末（阿贝尔共棱正反抵消斯托克斯恒等式与三行高斯—博内证明之后、第 2 小节之前） | `arc-body-calculus-sandbox` · `finite-mesh-stokes-cancellation` |
| 第三十四章 | §34.30.4 定理 `thm-ch34-arc-rotor-calculus-and-finite-stokes` 的证明之后、定量算例引导段之前 | `arc-body-calculus-sandbox` · `coboundary-d2-zero-closed-shell` |
| 第三十四章 | §34.30 末（全章三十阶总收官转入第三十五章一段之后） | `arc-body-calculus-sandbox` 完整实验室 |
| 第三十五章 | 第一节 Lean 三定理列表第 3 条（`finite_memory_history_capacity`）之后、“这里的清表”一段之前 | `self-referential-table` · `full` |
| 第三十五章 | 第一节“因此，乘着光来……”一段之后、定理 `thm-ch35-null-pulse-and-record-blocking` 之前 | `self-referential-table` · `reset` |
| 第三十五章 | “成长即扩表”一节三步列表之后、“下面我们将……”一段之前 | `self-referential-table` · `expand_table` |
| 第三十五章 | “查表算法亦在表内”一节“把原本悬浮在表外的……”一段之后 | `self-referential-table` · `dual_read` |
| 第三十五章 | “在实轴一维投影模型……”一段之后、定理 `thm-ch35-lawvere-diagonal-and-homoiconic-closure` 之前 | `self-referential-table` · `heal` |
| 第三十五章 | 末节“若记忆只以这条轴的偏置读出……”一段之后 | `self-referential-table` · `orthogonal_zero` |
| 第三十五章 | 末节加粗的追问之后、转入第三十六章之前 | `self-referential-table` 完整实验室 |
| 第三十六章 | §“无穷离散步阻断化光”开头“想象你正走向一道悬崖”一段之后、定理 `thm-ch36-taylor-tail-and-cayley-boundary` 之前 | `forgetting-rebirth-attractor` · `erase_reset` |
| 第三十六章 | 注记 `rem-ch36-hyperbolic-staircase-figure` 之后的解读段（分式变换与单位圆）之后 | `forgetting-rebirth-attractor` · `cayley` |
| 第三十六章 | 例 `ex-ch36-inverse-gudermannian-discrete-staircase` 之后 | `forgetting-rebirth-attractor` · `staircase` |
| 第三十六章 | 文献注记 `rem-ch36-poincare-disk-gudermannian-literature` 之后 | `forgetting-rebirth-attractor` · `klein_vs_poincare` |
| 第三十六章 | 定理 `thm-ch36-quotient-annihilator-and-factorization` 后的三条解读列表之后 | `forgetting-rebirth-attractor` · `quotient_fold` |
| 第三十六章 | 注记 `rem-ch36-samsara-exit-table` 之后、第九部收束段之前 | `forgetting-rebirth-attractor` 完整实验室 |
| 第三十六章 | §36.4 素数扩表四阶段列表第 1 项（$p = 2$ 分歧奇异阻断）末 | `padic-prime-table-tree` · `cleavage` |
| 第三十六章 | §36.4 素数扩表四阶段列表第 2 项（$p = 7$ 亨泽尔零进位提根）末 | `padic-prime-table-tree` · `hensel` |
| 第三十六章 | §36.4 素数扩表四阶段列表第 3 项（$p = 31$ 扩表压平树深）末 | `padic-prime-table-tree` · `flatten` |
| 第三十六章 | §36.4 素数扩表四阶段列表第 4 项（$p = 1031$ 单层直读表）末 | `padic-prime-table-tree` · `unramified` |
| 第三十六章 | §36.4 定理 `thm-ch36-crt-and-adelic-product-formula` 后的 $x = 12/35$ 算例段之后 | `padic-prime-table-tree` · `adelic` |
| 第三十六章 | §36.4 连续位 $p_\infty$ 进位轮回对比欧几里得无穷素数梯两项列表之后、文献注记之前 | `padic-prime-table-tree` · `euclid` |
| 第三十六章 | §36.4 注记 `rem-ch36-prime-table-evolution-summary` 之后、章末收束段之前 | `padic-prime-table-tree` 完整实验室 |
| 第三十七章 | §37.1 “坚硬 / 狭窄与疲惫”列表之后、定理 `thm-ch37-known-data-pinching-and-entropy-tax` 的引言之前 | `dream-decoherence-unpinning` · `waking` |
| 第三十七章 | 该定理的证明之后、§37.2 之前 | `dream-decoherence-unpinning` · `blocks` |
| 第三十七章 | §37.2 双副本相位账本公式之后、定理 `thm-ch37-joint-coherent-record-erasure` 的引言之前 | `dream-decoherence-unpinning` · `half_erase` |
| 第三十七章 | 定理 `thm-ch37-joint-coherent-record-erasure` 的证明之后 | `dream-decoherence-unpinning` · `zero_overlap_fail` |
| 第三十七章 | “第 2 款把梦境深浅……”一段之后、§37.3 之前 | `dream-decoherence-unpinning` · `quantum_eraser` |
| 第三十七章 | §37.3 “如果像朴素机械论所断言……”一段之后、“可事实恰恰相反”之前 | `dream-decoherence-unpinning` · `unpin_body` |
| 第三十七章 | §37.4 “由此可见……”一段之后、总表引言之前 | `dream-decoherence-unpinning` · `wake_snap` |
| 第三十七章 | “凝视……”一段之后、转入第三十八章一段之前 | `dream-decoherence-unpinning` 完整实验室 |
| 第三十七章 | §37.5.1 单比特两把尺子手算与克雷洛夫秩增长段之后、文献注记之前 | `dream-pre-decoherence-deja-vu` · `choose-context` |
| 第三十七章 | §37.5.1 末（多副本幺模相位记录四步逆转段之后） | `dream-pre-decoherence-deja-vu` · `unimodular-reversal` |
| 第三十七章 | §37.5.2 末（四阶段对比账本表之后） | `dream-pre-decoherence-deja-vu` · `dream-precompile` |
| 第三十七章 | §37.5.3 第一问格拉姆三层相容带与黄金窗口段之后、帝国效应文献注记之前 | `dream-pre-decoherence-deja-vu` · `gram-funnel` |
| 第三十七章 | §37.5.3 末（“梦后逻辑升级 / 流水线冲刷”两项列表之后） | `dream-pre-decoherence-deja-vu` · `logic-upgrade-flush` |
| 第三十七章 | §37.5.4 三种认知相遇对照表之后、既视感心理学文献注记之前 | `dream-pre-decoherence-deja-vu` · `deja-vu-hit` |
| 第三十七章 | §37.5 末（全章末尾） | `dream-pre-decoherence-deja-vu` 完整实验室 |
| 第三十八章 | 文献注记 `rem-ch38-qram-page-wootters-literature` 之后、“对照……”一段之前 | `pointer-ontology-deref` · `qram_tree` |
| 第三十八章 | 38.1 列表第 1 条（`ptr++` 逐帧扫描）之后、第 2 条之前 | `pointer-ontology-deref` · `linear64` |
| 第三十八章 | 38.2 列表“清醒与梦境的硬件切换”一条之后 | `pointer-ontology-deref` · `superpose` |
| 第三十八章 | 定理 `thm-ch38-discrete-sech-positive` 之后、“在纯数学底层”一段之前 | `pointer-ontology-deref` · `four_loops` |
| 第三十八章 | 例 `ex-ch38-recursive-page-table-dereference` 之后 | `pointer-ontology-deref` · `self_map` |
| 第三十八章 | 38.3 列表第 1 条（查表算法与被查之表合二为一）之后、第 2 条之前 | `pointer-ontology-deref` · `diagonal_hit` |
| 第三十八章 | §38.3 末 | `pointer-ontology-deref` 完整实验室 |
| 第三十八章 | §38.4 · 一 末（认识论红线段之后） | `pnp-lookup-degradation` · `oracle` |
| 第三十八章 | §38.4 · 二 第 2 阶退化项末 | `pnp-lookup-degradation` · `frougny` |
| 第三十八章 | §38.4 · 二 第 3 阶退化项之后 | `pnp-lookup-degradation` · `bekenstein` |
| 第三十八章 | §38.4 · 二 第 4 阶退化项之后 | `pnp-lookup-degradation` · `grover` |
| 第三十八章 | §38.4 · 二 第 5 阶退化项之后 | `pnp-lookup-degradation` · `landauer` |
| 第三十八章 | §38.4 · 四 开头（双向通读列表之前） | `pnp-lookup-degradation` · `ladder` |
| 第三十八章 | §38.4 · 四 双向通读列表之后、小节收束段之前 | `pnp-lookup-degradation` 完整实验室 |
| 第三十八章 | §38.5 四比特 16 态算例第 1 项（五引理全开）之后 | `observer-escape-ledger` · `hilbert` |
| 第三十八章 | §38.5 四比特 16 态算例第 2 项（关闭冗余引理 $L_5$）之后 | `observer-escape-ledger` · `novelty` |
| 第三十八章 | §38.5 四比特 16 态算例第 3 项（关闭四体异或 $L_4$）之后 | `observer-escape-ledger` · `escape` |
| 第三十八章 | §38.5 四比特 16 态算例第 4 项（贝尔边缘盲区同构）之后 | `observer-escape-ledger` · `marginal` |
| 第三十八章 | §38.5 末小节第 1 项（齐肯多夫黄金容量税与柱集回弹）之后 | `observer-escape-ledger` · `zeckendorf` |
| 第三十八章 | §38.5 末小节第 2 项（清醒兰道尔擦除热对照梦境零热复相干）之后 | `observer-escape-ledger` · `dream` |
| 第三十八章 | §38.5 末（§38.6 过渡段之前） | `observer-escape-ledger` 完整实验室 |
| 第三十八章 | §38.6.1 跨维未索引比量 $\Delta\Pi_t$ 推导段之后、“提着灯笼追光圈”一段之前 | `uncompleted-horizon-sandbox` · `bootstrap-ledger` |
| 第三十八章 | §38.6.2 文献注记 `rem-ch38-godel-1956-turing-1939-lawvere-literature` 之后 | `uncompleted-horizon-sandbox` · `lawvere-godel` |
| 第三十八章 | §38.6.2 图灵序数阶梯与 `trureturing` 正新颖度引理段之后 | `uncompleted-horizon-sandbox` · `ordinal-spiral` |
| 第三十八章 | §38.6.3 双向正交视差总结句之后、反事实热寂三点列表之前 | `uncompleted-horizon-sandbox` · `bidirectional-parallax` |
| 第三十八章 | §38.6.3 永恒生机护栏结语段之后、§38.7 过渡段之前 | `uncompleted-horizon-sandbox` · `frozen-omniscience` |
| 第三十八章 | §38.6.3 末（转入 §38.7 之前） | `uncompleted-horizon-sandbox` 完整实验室 |
| 第三十八章 | §38.7.1 “有限闭合与无穷未闭合……自指盲点 {N}”一段之后 | `stereographic-relativization-sandbox` · `blindspot-divergence` |
| 第三十八章 | §38.7.1 末（紧化—展开连续同伦 τ ∈ [0, 1] 段之后、§38.7.2 之前） | `stereographic-relativization-sandbox` · `compact-homotopy` |
| 第三十八章 | §38.7.2 文献注记 `rem-ch38-bgs-natural-algebrization-barriers-literature` 后 ψ = 0° 折叠切面段之后 | `stereographic-relativization-sandbox` · `oracle-collapse` |
| 第三十八章 | §38.7.2 ψ = 65° 偏转追逐切面段之后、命题 `prop-ch38-cayley-stereographic-and-blindspot-suspension` 引言之前 | `stereographic-relativization-sandbox` · `oracle-chase` |
| 第三十八章 | §38.7.3 龙树《中论》四句离相段之后、“的”字消融收束段之前 | `stereographic-relativization-sandbox` · `tetralemma-rest` |
| 第三十八章 | §38.7.3 末（全章末尾） | `stereographic-relativization-sandbox` 完整实验室 |
| 第三十九章 | §39.3 第二段（“观察者从来没有‘住在时空里’”）之后、“数学物理史上……”一段之前 | `self-sustaining-spinor-flow` · `weave` |
| 第三十九章 | 文献注记 `rem-ch39-cartan-penrose-hestenes-fierz-literature` 之后 | `self-sustaining-spinor-flow` · `fierz` |
| 第三十九章 | 例 `ex-ch39-even-clifford-spinor-bilinear-fierz` 之后 | `self-sustaining-spinor-flow` · `turn360` |
| 第三十九章 | 定理 `thm-ch39-double-cover-no-section-and-720-lift` 的证明之后 | `self-sustaining-spinor-flow` · `seam` |
| 第三十九章 | 该定理之后的“请屏息凝视”一段之后、§39.4 之前 | `self-sustaining-spinor-flow` · `turn720` |
| 第三十九章 | §39.4 末 | `self-sustaining-spinor-flow` 完整实验室 |
| 第三十九章 | §39.5.1 广义合法字计数公式段之后 | `pisot-clifford-rauzy-sandtable` · `zeckendorf` |
| 第三十九章 | §39.5.2 定理 `thm-ch39-p2e-kbonacci-pisot` 后的根分布解读段之后 | `pisot-clifford-rauzy-sandtable` · `kbonacci` |
| 第三十九章 | §39.5.3 定理 `thm-ch39-p2e-padic-readout` 后的跨系统边界说明段之后 | `pisot-clifford-rauzy-sandtable` · `padic` |
| 第三十九章 | §39.5.4 文献注记 `rem-ch39-p2e-rauzy-literature` 之后 | `pisot-clifford-rauzy-sandtable` · `rauzy` |
| 第三十九章 | §39.5.5 诠释注记 `rem-ch39-p2e-unification-model` 之后 | `pisot-clifford-rauzy-sandtable` · `clifford` |
| 第三十九章 | §39.5.6 例 `ex-ch39-p2e-pisot-dottie-numerics` 之后 | `pisot-clifford-rauzy-sandtable` · `self-reference` |
| 第三十九章 | §39.5.7 文献注记 `rem-ch39-p2e-rydberg-anyon-literature` 之后 | `pisot-clifford-rauzy-sandtable` · `entanglement` |
| 第三十九章 | §39.5.8 开放问题 `prob-ch39-p2e-fractal-horizon` 之后、八概念总表之前 | `pisot-clifford-rauzy-sandtable` · `entropy` |
| 第三十九章 | §39.5.8 末 | `pisot-clifford-rauzy-sandtable` 完整实验室 |
| 第三十九章 | §39.6.1 对角自应用双向分岔第 2 条（对角逃逸与正交开维分支）之后 | `self-reference-pentad-sandbox` · `lawvere-diagonal-escape` |
| 第三十九章 | §39.6.2.2 查表路径压缩与未读捏合幂等段之后 | `self-reference-pentad-sandbox` · `pointer-path-compression` |
| 第三十九章 | §39.6.2.3 道蒂余弦不动点三条性质列表之后 | `self-reference-pentad-sandbox` · `dottie-real-imag-spiral` |
| 第三十九章 | §39.6.2.4 封闭射影定态与开放信道稳态列表之后 | `self-reference-pentad-sandbox` · `eigenstate-channel-anchor` |
| 第三十九章 | §39.6.2.5 双轴有限字、`[[15, 1, 3]]` 门蒸馏与 MERA 三重实现列表之后 | `self-reference-pentad-sandbox` · `fifteen-to-one-gate-distill` |
| 第三十九章 | §39.6.3 末（雅可比稳定性总表与过渡段之后） | `self-reference-pentad-sandbox` 完整实验室 |
| 第三十九章 | §39.7.1 有限停机精度窗口与认识论红线段之后 | `self-halting-spectral-time-river-sandbox` · `precision-agency-window` |
| 第三十九章 | §39.7.2 精度下余项 90° 正交折叠入时间长河段之后 | `self-halting-spectral-time-river-sandbox` · `time-river-orthogonal-fold` |
| 第三十九章 | §39.7.3 幂迭代三重分拣列表之后 | `self-halting-spectral-time-river-sandbox` · `power-iteration-spectral-sort` |
| 第三十九章 | §39.7.4 第一重机制（瑞利商赋权与位置/频率基旋转）之后 | `self-halting-spectral-time-river-sandbox` · `basis-rayleigh-attention` |
| 第三十九章 | §39.7.4 第二重机制（频闪基捏合与量子芝诺留存）之后 | `self-halting-spectral-time-river-sandbox` · `zeno-basis-sculpting` |
| 第三十九章 | §39.7.5 末（四维机制总表与过渡段之后） | `self-halting-spectral-time-river-sandbox` 完整实验室 |
| 第三十九章 | §39.8.1 雷达往返视界、有限节拍精度下界与反事实推演段之后 | `universal-clock-gravity-dilation-sandbox` · `light-cone-precision-floor` |
| 第三十九章 | §39.8.2 第 1 条（狭义相对论运动钟慢与空间寻址分账）之后 | `universal-clock-gravity-dilation-sandbox` · `kinematic-address-split` |
| 第三十九章 | §39.8.2 第 2 条（静态径向引力钟慢与全息信息负载边界）之后 | `universal-clock-gravity-dilation-sandbox` · `holographic-mass-load` |
| 第三十九章 | §39.8.3 第 1 条（爱因斯坦局域等效原理子钟共标度）之后 | `universal-clock-gravity-dilation-sandbox` · `equivalence-dual-flywheel` |
| 第三十九章 | §39.8.3 第 2 条（史瓦西视界 100% 全息满载饱和）之后 | `universal-clock-gravity-dilation-sandbox` · `horizon-saturation-lock` |
| 第三十九章 | §39.8.3 末（例 `ex-ch39-four-regime-clock-budget-calculus` 与过渡段之后） | `universal-clock-gravity-dilation-sandbox` 完整实验室 |
| 第三十九章 | §39.9.2 第 1 条（胞内 1D 电磁盲平面相位纤维）之后 | `unified-arc-forces-planck-sandbox` · `u1-blind-phase-fiber` |
| 第三十九章 | §39.9.2 第 2 条（胞内 2D 弱双覆叠手征翻转与汤川闭合）之后 | `unified-arc-forces-planck-sandbox` · `su2-chiral-double-cover` |
| 第三十九章 | §39.9.2 第 3 条（胞内 3D 强规范色体积锁与通量管禁闭）之后 | `unified-arc-forces-planck-sandbox` · `su3-color-flux-confinement` |
| 第三十九章 | §39.9.3 第 1 条（玻恩模方时钟负载恒正与驻相折射引力）之后 | `unified-arc-forces-planck-sandbox` · `regge-gravity-clock-refraction` |
| 第三十九章 | §39.9.3 第 3 条（单原胞紫外截断、视界饱和与最小矢高边界）之后 | `unified-arc-forces-planck-sandbox` · `planck-scale-convergence` |
| 第三十九章 | §39.9.4 末 | `unified-arc-forces-planck-sandbox` 完整实验室 |
| 第三十九章 | §39.10.1 第 1 条（分块直和对比 so(3k) 跨概念伪旋转与 `finite_stage_expansion`）之后、第 2 条之前 | `hilbert-concept-ledger-3d-cap-sandbox` · `hypercube-illusion-unfold` |
| 第三十九章 | §39.10.2 第 2 条（视网膜 (L, M, S) 商投影与微观 SU(3)<sub>C</sub> 三锚体积）之后、第 3 条之前 | `hilbert-concept-ledger-3d-cap-sandbox` · `space-color-joint-ledger` |
| 第三十九章 | §39.10.2 末（平移、旋转与亨基应变／sl(2, ℝ) 运动三元组收束段之后、§39.10.3 之前） | `hilbert-concept-ledger-3d-cap-sandbox` · `motion-rot-scale-trans-triad` |
| 第三十九章 | §39.10.3 末（霍奇旋度 C(d, 2) = d 自闭合、四元数纯虚球与布洛赫球封顶之后、§39.10.4 之前） | `hilbert-concept-ledger-3d-cap-sandbox` · `hodge-curl-field-cap-3d` |
| 第三十九章 | §39.10.4 例 `ex-ch39-fifteen-dim-five-concept-ledger-audit`（含 ε<sub>self</sub> = 0.05 模态截断）之后、五类对象对照表之前 | `hilbert-concept-ledger-3d-cap-sandbox` · `unhalted-infinity-truncation` |
| 第三十九章 | §39.10 末（收束交接段之后） | `hilbert-concept-ledger-3d-cap-sandbox` 完整实验室 |
| 第三十九章 | §39.11.1 末（定义 `def-ch39-af-gut-master-connection` 后的范式反转段之后、§39.11.2 之前） | `af-gut-arc-field-unification-sandbox` · `concentric-four-field-monad` |
| 第三十九章 | §39.11.2 末（N<sub>c</sub> = 3 ⇒ sin²θ<sub>W</sub> = 3/8 双曲线交点与单圈跑动段之后、§39.11.3 之前） | `af-gut-arc-field-unification-sandbox` · `weinberg-angle-rg-running` |
| 第三十九章 | §39.11.3 第 1 条（跨概念希格斯手征颤动桥 D<sub>int</sub>(Φ<sub>H</sub>)）之后、第 2 条之前 | `af-gut-arc-field-unification-sandbox` · `higgs-cross-concept-zitterbewegung` |
| 第三十九章 | §39.11.3 第 2 条（普适主频 ν<sub>0</sub> 四场勾股负载与爱因斯坦场方程收口）之后、第 3 条之前 | `af-gut-arc-field-unification-sandbox` · `einstein-pythagorean-clock-balance` |
| 第三十九章 | §39.11.4 三种大统一范式六维可证伪对照表之后、末段分隔线 `---` 之前 | `af-gut-arc-field-unification-sandbox` · `afgut-ledger-split-vs-unify` |
| 第三十九章 | §39.11 末（全章收官段之后） | `af-gut-arc-field-unification-sandbox` 完整实验室 |
| 终章 | 空间吸引子 · 二 “内禀几何参数”列表之后 | `spatial-attractor-deja-vu` · `fixed` |
| 终章 | 空间吸引子 · 二 末（文献注记 `rem-coda-lorenz-srb-literature` 之后） | `spatial-attractor-deja-vu` · `forget` |
| 终章 | 空间吸引子 · 二 “回到洛伦兹”一段中“吸引子的体积为零”一句之后 | `spatial-attractor-deja-vu` · `shrink` |
| 终章 | 空间吸引子 · 三 第 1 条（$1$ 维死板闭环）之后 | `spatial-attractor-deja-vu` · `cycle` |
| 终章 | 空间吸引子 · 三 第 2 条（分形横截叶层）之后 | `spatial-attractor-deja-vu` · `dimension` |
| 终章 | 空间吸引子一节末 | `spatial-attractor-deja-vu` · `return`，隔一句引出语后是完整实验室 |
| 终章 | 黄金切投 · 一 第 1 条（全窗口 Delone 集）之后、第 2 条之前 | `golden-cut-observer` · `cut` |
| 终章 | 黄金切投 · 二 末 | `golden-cut-observer` · `phason` |
| 终章 | 黄金切投 · 三 第 2 条（贴边与深处的点）之后 | `golden-cut-observer` · `window`（深处的点与同一条线上贴边的点同在一张卡里） |
| 终章 | 黄金切投 · 三 末（第 3 条之后） | `golden-cut-observer` · `empire` |
| 终章 | 黄金切投 · 四 第 1 条（卡西尼恒等式）之后、第 2 条之前 | `golden-cut-observer` · `cassini` |
| 终章 | 黄金切投 · 四 第 3 条之后、定理 `thm-coda-golden-cut-observer-cassini` 之前 | `golden-cut-observer` · `returns` |
| 终章 | 定理 `thm-coda-golden-cut-observer-cassini` 的证明之后、例 `ex-coda-golden-three-gap` 之前 | `golden-cut-observer` · `narrow` |
| 终章 | 例 `ex-coda-golden-three-gap` 之后、“为什么黄金角不会切出极短的弧”之前 | `golden-cut-observer` · `gaps` |
| 终章 | “每一段弧都长于 1/(√5 N)”之后的数值段落之后 | `golden-cut-observer` · `pi` |
| 终章 | 黄金切投 · 四 末（格言之后） | `golden-cut-observer` 完整实验室 |
| 附录 D | D.2.1 测量问题注记 `rem-appendix-d-puzzle-1` 之后 | `quantum-interpretations-duel` · `wigner-cut` |
| 附录 D | D.2.2 退相干注记 `rem-appendix-d-puzzle-2` 之后 | `quantum-interpretations-duel` · `and-to-or` |
| 附录 D | D.2.3 玻恩定则注记 `rem-appendix-d-puzzle-3` 之后 | `quantum-interpretations-duel` · `born-unequal` |
| 附录 D | D.2.4 贝尔与 EPR 注记 `rem-appendix-d-puzzle-4` 之后 | `quantum-interpretations-duel` · `bell-epr` |
| 附录 D | D.2.6 开放问题 `prob-appendix-d-time-horizon` 之后 | `quantum-interpretations-duel` · `time-horizon` |
| 附录 D | D.3 五大诠释注记 `rem-appendix-d-interpretations-ledger` 之后 | `quantum-interpretations-duel` · `five-way-duel`，随后完整实验室 |


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
