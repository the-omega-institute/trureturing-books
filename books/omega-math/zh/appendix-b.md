# 附录 B 传统数学与 OMEGA MATH 对照词典与证据总账

本附录为全书六卷提供四张速查总表：传统 ZFC $+$ 实分析符号到零公理有理体系 $\mathbf{Math}_\Omega$ 的逐项对照词典、全书六层认识论证据分层总账、四座三维交互实验室与全书静态图／演示文稿索引，以及基于所钉 `trureturing@dev` 提交 [{commit}](trureturing:) 在构建时实时生成的全书形式化验证统计。逐模块源码清单、全部冻结声明链接与空内核重放步骤见 [附录 A](appendix-a.md)。

## B.1 传统数学到 OMEGA MATH 符号与概念对照词典 {#sec-om-appb-dictionary}

下表将传统 ZFC 与实复连续统中的核心符号与概念，逐一映射至本书零公理有理体系 $\mathbf{Math}_\Omega$ 中的免无穷、免超越精确替代品，并给出正文对应章节入口：

| 传统 ZFC $+$ $\mathbb{R}$ 符号或概念 | 零公理 $\mathbf{Math}_\Omega$ 精确替代与核心机制 | 正文入口 |
| :--- | :--- | :--- |
| 实数连续统 $\mathbb{R}$（柯西商集、`Classical.choice`、`Quot.sound`） | 齐次整数比 `Omega.IntRatio`、射影闭环 $\mathbb{QP}^1$ 与规范整三元流形 $\mathbb{T}_3(\mathbb{Q}) \cong \mathbb{QP}^3$，免商免根号构造 | [第 1 章](ch01-axiom-omega-and-cic.md)、[第 2 章](ch02-homogeneous-projective-line.md)、[第 3 章](ch03-canonical-ternion-manifold.md) |
| 开直线无穷远点 $\infty$ 与 $1/0$ 奇点 | 齐次对径锚点 $[1 : 0] \in \mathbb{QP}^1$（分母 $P^2 + Q^2 = 1 > 0$），精确读数 $\kappa = 0$、$s = 1$、凯莱像 $(-1, 0)$ | [第 2 章](ch02-homogeneous-projective-line.md) |
| 圆周率 $\pi$（多边形极限与球面归一化） | 无 $\pi$ 马青有理切线包络（`machin_rational_chain`）与无 $\pi$ 卡塔兰阶乘哈尔泛函 $H(a,b,c,d)$ | [第 8 章](ch08-dfinite-jets-and-cayley-unification.md)、[第 11 章](ch11-pi-free-haar-integration.md) |
| 自然底数 $e$（欧拉极限 $(1+1/N)^N$） | 任意阶 D-有限指数射流 $\mathrm{Exp}_N(a\eta) \in J_N(\mathbb{Q})$ 与一步驻球有理凯莱变换 | [第 5 章](ch05-rational-cayley-rotations.md)、[第 8 章](ch08-dfinite-jets-and-cayley-unification.md) |
| 黄金比无理数 $\varphi = (1+\sqrt{5})/2$ | 零公理黄金二次扩张 `QPhi` $= \mathrm{QuadPoly}(1, 1)$（纯有序对，满足 $\varphi^2 = \varphi + 1$、斐波那契幂律与五角切比雪夫闭合） | [第 12 章](ch12-algebraic-extensions-and-schur-positivity.md) |
| 二次根号 $\sqrt{2}$（旋量归一与 CHSH 上界） | 零公理二次扩张 `QSqrt2` $= \mathrm{QuadPoly}(0, 2)$（纯有序对，满足 $\delta^2 = 2$、贝尔平方 $(8,0)$ 与精确旋量归一） | [第 12 章](ch12-algebraic-extensions-and-schur-positivity.md) |
| 超越角度与三角函数 $\theta, \sin, \cos, \arccos$ | 有理保真度 $\kappa$、展度 $s = 1 - \kappa$、巴格曼三点环路不变量 $B$ 与格拉姆闭合行列式 $\det\mathbf{G}_3 = 1 + 2B - \Sigma\kappa \ge 0$ | [第 2 章](ch02-homogeneous-projective-line.md)、[第 6 章](ch06-bargmann-gram-spherical-trigonometry.md) |
| 李矩阵指数 $e^X$、矩阵对数 $\ln R$ 与欧拉角 | 三维有理凯莱旋转 $\mathbf{R}(\boldsymbol{\sigma}) \in \mathrm{SO}(3, \mathbb{Q})$ 来自普通凯莱参数；$\operatorname{Ad}(S^3(\mathbb{Q}))$ 上的双卡修正罗德里格斯参数有一张分母 $\ge 1/2$ 的图；无根号伴随作用 $\operatorname{Ad}(p)$ | [第 5 章](ch05-rational-cayley-rotations.md) |
| 带特权原点的向量加法与一阶换位子 $[X, Y]$ | 无原点普吕弗—贝尔流群 $[x, y, z]$、利雅三元曲率括号与有号毕达哥拉斯旋量双覆叠 `PythSpinor` | [第 4 章](ch04-heaps-and-lie-triple-curvature.md) |
| 无穷小极限 $\lim_{h \to 0}$ 与 `Filter.Tendsto` 导数 | 二阶幂零射流商环 $\mathcal{J}_2(\mathbb{Q}) = \mathbb{Q}[\eta]/(\eta^3)$（两项精确闭式求逆与对称中点 $\alpha = 1/2$ 保球步长） | [第 7 章](ch07-second-order-jet-calculus.md) |
| 切丛 $T_p M$、联络 $\Gamma^k_{ij}$ 与光滑斯托克斯公式 | 流群精确伸缩积分、无选择公理单纯形锥同伦（$dH + Hd = \mathrm{id}$）与二阶吻合三元球流形 $\mathcal{M}_\Omega$ | [第 9 章](ch09-telescoping-stokes-and-arc-manifold.md) |
| 平直傅里叶积分 $\int_{\mathbb{R}} e^{-i2\pi\xi x}\,dx$ 与复球谐函数 | 紧致球面彼得—魏尔有理自旋壳与整系数偶次切比雪夫特征核 $E_n(\kappa) = U_{2n}(\sqrt{\kappa})$ | [第 10 章](ch10-peter-weyl-rational-spin-shells.md) |
| 含 $2\pi^2$ 的连续勒贝格哈尔积分 $\int_{S^3} f\,d\mu$ | 内禀无 $\pi$ 卡塔兰阶乘哈尔泛函 $H(a,b,c,d) = \frac{(2a)!(2b)!(2c)!(2d)!}{4^m a!b!c!d!(m+1)!}$ 与递推有理矩 | [第 11 章](ch11-pi-free-haar-integration.md) |
| 静态素数无穷集、复 $\zeta(s)$、$\ln p$ 与 $\sqrt{p}$ | 构造性欧几里得素数逃逸、有限连分数与整数四分深度；阿代尔乘积归元 $\lvert x\rvert_\infty\prod_p\lvert x\rvert_p = 1$、赫维茨自由群 $F_3$ 与无复数赫克—拉马努金半正定判据 $4p\langle f,f\rangle_{\mathbb{Q}} - \langle \widehat{T}_p f, \widehat{T}_p f\rangle_{\mathbb{Q}} \ge 0$ | [第 13 章](ch13-computable-arithmetic-horizon.md)、[第 14 章](ch14-adelic-closure-and-hurwitz-primes.md)、[第 15 章](ch15-rational-hecke-ramanujan-spectrum.md) |
| 图灵纸带、可变字节数组与不可逆逻辑门 | 非阿贝尔 $\Omega$-FRACTRAN 四元数旋子精确整除闸门（配零公理 `Mat2` 凯莱—哈密顿与模 $5$ 秩一分裂） | [第 16 章](ch16-omega-fractran-and-nonabelian-stack.md) |
| 外置实数时钟 $t \in \mathbb{R}$ 与刚性背景时空 | 自包含观察者内部有理结构时间 $\tau = \sum(\Delta\mathcal{I}_{\mathrm{Schur}} + \Delta b_1)$ 与静止画布记忆切分 $\kappa_{\mathrm{time}} + \kappa_{\mathrm{space}} = 1$ | [第 17 章](ch17-observer-universe-and-single-gradient.md) |
| 携带三大经典公理的 `noncomputable` `Mathlib.Real` | 所选严格库根 `OmegaInit`、`OmegaMath` 的导入闭包经空内核重放，传递公理依赖为空。该核心经单向阴影函子 $\Pi_{\mathbb{R}}$（`OmegaShadowBridge`）隔离对接经典分析 | [第 1 章](ch01-axiom-omega-and-cic.md)、[第 18 章](ch18-zero-axiom-kernel-and-shadow-bridge.md) |

## B.2 六层认识论证据分层总账 {#sec-om-appb-epistemic-ledger}

本书对每一条断言严格执行六层认识论划界：内核零公理定理、单向桥接定理、经典阴影刻度尺、构造性手工推导、精确算术证书以及概念模型／开放前沿，六者各归其位、绝不越级混用：

| 证据层级与标识 | 仓库范围与核验机制 | 公理闭包与逻辑边界 | 代表内容与索引入口 |
| :--- | :--- | :--- | :--- |
| **第 1 层 · 严格库与 D5 核心定理** | 严格库选定的导入闭包在 `mkEmptyEnvironment` 中重放。D5 定理作双端编译对照和分端测量 | 严格库闭包的传递公理为空。表列 D5 定理的 `strict_omega.axioms` 均为 `[]`，同一声明行的 `axioms` 给出官方端依赖 | 射影闭环、三元流群与利雅三元系恒常单位曲率 $K \equiv +1$、三维凯莱旋转与双卡无奇点分母半界（$\max(D_+, D_-) \ge 1/2$）及闭球锁定、巴格曼—格拉姆与有理球面正弦／勾股律、二阶射流与 $\alpha$-采样／对称中点凯莱驻球守恒、任意阶 D-有限射流复合链式法则与凯莱—三角大一统、单纯形锥同伦、全阶偶次特征标乘积与全阶无 $\pi$ 彼得—魏尔哈尔正交归一、二次扩张与有理舒尔正定、欧几里得／连分数／深度预算、$S_5$ 模 $5$ 非消去与自由群 $F_3 \hookrightarrow \mathrm{SO}(3,\mathbb{Q})$ 伴随单射、模方 $5$ 赫克迹与裕度、`Mat2`（含行列式乘性与凯莱—哈密顿）、非阿贝尔 FRACTRAN 及四项显式核心见证（正交非交换、`g120_spin` 六拍双覆叠、正交角盈 $\frac{1}{4}$、$P_\Omega$ 停机于 $22$）；清单见 [附录 A §A.1–§A.3](appendix-a.md#sec-om-appa-omegainit) |
| **第 2 层 · 单向阴影函子**（`OmegaShadowBridge`，`LEAN ✓` 桥接） | `D5/S3/Quantum/AURICOmega/OmegaShadowBridge` 共 11 条公开桥接定理（附 10 条私有引理） | 外层单向投射 $\Pi_{\mathbb{R}}$，公理按层阶梯递进（`[]` $\to$ `propext` $\to$ `{Quot.sound, propext}` $\to$ 经典三公理），绝不向第 0–1 层回流 | `Omega.Nat`/`Omega.Int`/`Omega.IntRatio` 环同态、交叉相乘商坍缩及凯莱单位圆／保真度闭区间实阴影；详见 [第 18 章](ch18-zero-axiom-kernel-and-shadow-bridge.md) 与 [附录 A §A.4](appendix-a.md#sec-om-appa-shadow-bridge) |
| **第 3 层 · 经典 Mathlib 阴影锚点**（`LEAN ✓` 经典对照） | 全书卷 I–VI 引用的 `trureturing@dev` 经典连续统对照声明（索引见 [附录 A §A.5](appendix-a.md#sec-om-appa-classical-anchors)，动态分类计数见 [§B.4](#sec-om-appb-live-stats)） | 所钉的 35 条声明行均缺少官方 `axioms`，许可上界为 `{propext, Classical.choice, Quot.sound}` | 三维不变度量叉积锁定、自旋因子分类、彼得—魏尔矩阵元稠密、厄米舒尔极小、阿代尔 $p$-进乘积公式、托普利茨单位圆判据、克雷洛夫界与可逆 QRAM |
| **第 4 层 · 构造性手工推导与文献边界**（`ARGUED` / `手工推导`） | 作者与评审负责的完整初等代数推导及注明出处的经典文献边界 | 不佩戴 Lean 内核徽章；其中纯构造性高阶命题仍可继续下沉至零公理内核 | $V_3 \dots V_6$ 高阶实际矩阵赫克谱界推导与有理洛伦兹／温伯格 $3/8$ 迹比推导（[第 15 章](ch15-rational-hecke-ramanujan-spectrum.md)、[第 17 章](ch17-observer-universe-and-single-gradient.md)）、马青交错级数向经典 $\pi$ 的单向阴影归结（[第 8 章](ch08-dfinite-jets-and-cayley-unification.md)），以及雅可比 $r_4(n)$、艾希勒—德利涅—LPS 全谱界、辛格—索普曲率分解、赫德伯格定理与图灵／巴拿赫—塔斯基／埃尔米特—林德曼等经典文献结果 |
| **第 5 层 · 精确有理、Arb 与 Lean 计算证书**（`NUM`） | 纯整数与精确分数轨迹、有理矩阵正定移位证书、Arb 严格区间与有限可判定 Lean 核验 | 零浮点舍入误差，读者可逐行复算或交由精确整数算术独立复核（核心有限见证 `phalf_qhalf_noncommutative`、`g120_spin_six_beat_orbit`、`orthogonal_triad_excess_quarter` 与 `p_omega_halts_at_22` 已升格入第 1 层零公理冻结定理） | $\mathbb{QP}^1$ 锚点表（[第 2 章](ch02-homogeneous-projective-line.md)）、五枚整三元锚手算（[第 3 章](ch03-canonical-ternion-manifold.md)）、$\eta = 1/2$ 截断对账（[第 8 章](ch08-dfinite-jets-and-cayley-unification.md)）、`QSqrt2`/`QPhi` 账本（[第 12 章](ch12-algebraic-extensions-and-schur-positivity.md)）、$\mathbf{q}=(3,1,-2,4)$ 逐点验算与 $2184$ 顶图 $X^{5,13}$ 的 $1092\times 1092$ 精确有理移位证书 $M \succeq I_{1092}$（[第 15 章](ch15-rational-hecke-ramanujan-spectrum.md)）及 18 拍康威乘法器轨迹（[第 16 章](ch16-omega-fractran-and-nonabelian-stack.md)） |
| **第 6 层 · 结构统一模型与开放前沿**（`MODEL` 与 `OPEN`） | 明确区分建构诠释框架（`MODEL`）与真正未解问题（`OPEN`） | `MODEL` 不得冒充演绎定理；`OPEN` 严格保留未证身份，不附验证引用 | **`MODEL`**：`0 · 1/2 · 1` 因果射流诠释（[第 7 章](ch07-second-order-jet-calculus.md)）、吻合流形 $\mathcal{M}_\Omega$（[第 9 章](ch09-telescoping-stokes-and-arc-manifold.md)）、素数曲率回收核（[第 14 章](ch14-adelic-closure-and-hurwitz-primes.md)）、赫克临界谱内化（[第 15 章](ch15-rational-hecke-ramanujan-spectrum.md)）与观察者即宇宙／静止画布／TFT 框架（[第 17 章](ch17-observer-universe-and-single-gradient.md)）；**`OPEN`**：经典黎曼猜想（RH）、广义与扩展黎曼猜想、$\mathrm{GL}_n$（$n \ge 3$）与马斯波形拉马努金猜想、零公理内核内独立重构 $\zeta(s)$ 谱理论、任意高阶实际矩阵赫克迹的零公理闭合、非各向同性外尔／里奇曲率耦合，以及从离散三元比较导出 $3+1$ 维洛伦兹爱因斯坦方程与视界幺正性 |

## B.3 交互三维实验室与全书视觉媒体索引 {#sec-om-appb-media-map}

全书六卷由**四座交互三维实验室（合计 16 张独立实验卡）**、**十九幅定制语义静态图（序曲与第一至十八章每章一幅）**以及**双语全书概览演示文稿 `overview`** 构成完整视觉体系。下表先总览四座交互实验室与演示文稿的职责分工：

| 媒体代号与目录标识 | 类型与体量 | 核心主题与实验卡覆盖 | 对应章节入口 |
| :--- | :--- | :--- | :--- |
| **`OMEGA//SPIN`**（`ternion-cayley-lab`） | 三维交互实验室（4 张实验卡） | 齐次射影闭环 $\mathbb{QP}^1$ 与对径锚点、规范整三元数载体、$720^\circ$ 有号旋量双覆叠与无原点流群、三维有理凯莱旋转 | [第 2 章](ch02-homogeneous-projective-line.md)、[第 3 章](ch03-canonical-ternion-manifold.md)、[第 4 章](ch04-heaps-and-lie-triple-curvature.md)、[第 5 章](ch05-rational-cayley-rotations.md) |
| **`OMEGA//LAB`**（`omega-math-workbench`） | 三维交互实验室（4 张实验卡） | 巴格曼—格拉姆三角（`bargmann-gram-triad`）、二阶射流贴圆（`jet2-osculating-sphere`）、无 $\pi$ 哈尔积分与自旋壳（`pi-free-haar-peter-weyl`）、模方 $5$ 赫克谱与 $\Omega$-FRACTRAN 门（`hecke-p5-and-omega-fractran`） | [第 6 章](ch06-bargmann-gram-spherical-trigonometry.md)、[第 7 章](ch07-second-order-jet-calculus.md)、[第 11 章](ch11-pi-free-haar-integration.md)、[第 15 章](ch15-rational-hecke-ramanujan-spectrum.md)、[第 18 章](ch18-zero-axiom-kernel-and-shadow-bridge.md) |
| **`OMEGA//JET`**（`dfinite-algebraic-schur-lab`） | 三维交互实验室（4 张实验卡） | D-有限射流凯莱统一与马青包络、粗单纯形锥同伦上边缘、彼得—魏尔偶次切比雪夫自旋壳、零公理二次扩张与有理舒尔补 | [第 8 章](ch08-dfinite-jets-and-cayley-unification.md)、[第 9 章](ch09-telescoping-stokes-and-arc-manifold.md)、[第 10 章](ch10-peter-weyl-rational-spin-shells.md)、[第 12 章](ch12-algebraic-extensions-and-schur-positivity.md) |
| **`OMEGA//ARC`**（`adelic-arithmetic-observer-lab`） | 三维交互实验室（4 张实验卡） | 欧几里得素数逃逸与有限连分数、阿代尔乘积归元与赫维茨自由群 $F_3$、$\Omega$-FRACTRAN 非阿贝尔旋子闸门、观察者静止画布记忆切分 | [第 13 章](ch13-computable-arithmetic-horizon.md)、[第 14 章](ch14-adelic-closure-and-hurwitz-primes.md)、[第 16 章](ch16-omega-fractran-and-nonabelian-stack.md)、[第 17 章](ch17-observer-universe-and-single-gradient.md) |
| **`overview`**（`slides/overview`） | 双语演示文稿（`zh` / `en`） | 全书六卷全景汇报：三笔隐账、六卷有理骨架、零公理内核审计与单向阴影桥、认识论边界与阅读路线 | [终章](coda.md) |

下表逐章索引全书 **19 幅定制语义静态图**（序曲与第一至十八章各一幅）及其配套交互实验室：

| 序曲／章节 | 定制静态图核心图景（每章一幅） | 配套交互实验室／演示 |
| :--- | :--- | :--- |
| [序曲](README.md) | 六卷全景路线图：从裸 CIC 与 $\mathrm{AXIOM}\text{-}\Omega$ 至空内核审计与单向实数阴影 | `overview` 演示文稿 |
| [第 1 章](ch01-axiom-omega-and-cic.md) | 裸 CIC 内核防火墙、三类经典公理隔离与可计算类型类 `OmegaSpace` 架构 | `overview` 演示文稿 |
| [第 2 章](ch02-homogeneous-projective-line.md) | 齐次射影闭环 $\mathbb{QP}^1$、对径北极 $[1:0]$ 有限闭合与有理凯莱圆周 | `OMEGA//SPIN` |
| [第 3 章](ch03-canonical-ternion-manifold.md) | 规范整三元流形 $\mathbb{T}_3(\mathbb{Q}) \cong \mathbb{QP}^3$ 的三维锁定与非交换见证 | `OMEGA//SPIN` |
| [第 4 章](ch04-heaps-and-lie-triple-curvature.md) | 无原点流群搬运 $[a,b,c]$、利雅三元曲率与 $720^\circ$ 有号旋量双覆叠 | `OMEGA//SPIN` |
| [第 5 章](ch05-rational-cayley-rotations.md) | 三维有理凯莱正逆桥、无奇点双卡乘法（分母 $\ge 1/2$）与伴随旋转 | `OMEGA//SPIN` |
| [第 6 章](ch06-bargmann-gram-spherical-trigonometry.md) | 球面巴格曼—格拉姆三点闭合律 $\det\mathbf{G}_3 \ge 0$ 与测地倍增退化 | `OMEGA//LAB` |
| [第 7 章](ch07-second-order-jet-calculus.md) | 二阶幂零射流环 $\mathcal{J}_2(\mathbb{Q})$ 贴球演化与对称中点 $\alpha = 1/2$ 守恒 | `OMEGA//LAB` |
| [第 8 章](ch08-dfinite-jets-and-cayley-unification.md) | 任意阶 D-有限凯莱—三角统一与无 $\pi$ 马青有理双边包络 | `OMEGA//JET` |
| [第 9 章](ch09-telescoping-stokes-and-arc-manifold.md) | 粗网格流群伸缩斯托克斯、单纯形锥同伦恰当性与吻合流形 $\mathcal{M}_\Omega$ | `OMEGA//JET` |
| [第 10 章](ch10-peter-weyl-rational-spin-shells.md) | 三维球面彼得—魏尔自旋壳阶梯与偶次整系数切比雪夫特征核 $E_n(\kappa)$ | `OMEGA//JET` |
| [第 11 章](ch11-pi-free-haar-integration.md) | 无 $\pi$ 卡塔兰阶乘哈尔矩 $H(a,b,c,d)$ 与全阶偶次彼得—魏尔自旋壳正交归一 | `OMEGA//LAB` |
| [第 12 章](ch12-algebraic-extensions-and-schur-positivity.md) | 零公理二次扩张 `QSqrt2`/`QPhi` 几何边界与有理分块舒尔补正定性 | `OMEGA//JET` |
| [第 13 章](ch13-computable-arithmetic-horizon.md) | 构造性欧几里得素数逃逸、有限连分数收敛子与整数四分深度阶梯 | `OMEGA//ARC` |
| [第 14 章](ch14-adelic-closure-and-hurwitz-primes.md) | 阿代尔乘积曲率回收与模方 $5$ 赫维茨六素旋子自由群 $F_3$ 树 | `OMEGA//ARC` |
| [第 15 章](ch15-rational-hecke-ramanujan-spectrum.md) | 模方 $5$ 球面赫克算子拉马努金有理谱隙 $\widehat{\lambda}^2 \le 20$ 与 $X^{5,13}$ 移位界 | `OMEGA//LAB` |
| [第 16 章](ch16-omega-fractran-and-nonabelian-stack.md) | 非阿贝尔 $\Omega$-FRACTRAN 旋子整除闸门对 `XY` 放行与 `YX` 阻断 | `OMEGA//ARC`、`OMEGA//LAB` |
| [第 17 章](ch17-observer-universe-and-single-gradient.md) | 自包含观察者静止画布、无腿三元球与记忆窗口正交切分 $\kappa_{\mathrm{time}} + \kappa_{\mathrm{space}} = 1$ | `OMEGA//ARC` |
| [第 18 章](ch18-zero-axiom-kernel-and-shadow-bridge.md) | 三层零公理防火墙、`OmegaInit`/`OmegaMath` 空内核重放与单向阴影函子 $\Pi_{\mathbb{R}}$ | `OMEGA//LAB`、`overview` |

## B.4 全书动态形式化统计 {#sec-om-appb-live-stats}

本节嵌入构建系统依据 `trureturing.lock.json` 生成的全书证据摘要。无公理、依赖公理与公理状态未知的环境次数采用各冻结声明行的官方 `axioms` 字段。同一环境引用多条定理时，只有每条都有空公理记录才计作无公理。严格端测量及两种复现入口见 [附录 A](appendix-a.md)。

::: {.stats src="summary"}
:::

覆盖全书全部正文与媒体引用的完整冻结声明索引（附所钉提交上的源码逐行链接）由构建系统按需独立生成；条目被索引收录不改变其所属的证据层级。

::: {.stats src="declarations" display="link" format="html"}
查看编译生成的完整声明索引
:::

阅读上述编译产物时，请同时留意统计索引与数学证明责任之间的清晰边界：

::: {.remark #rem-om-appb-epistemic-boundary title="动态统计与证据责任的边界"}
上方的汇总与索引记录出版所用的冻结引用、公理分布和环境频次。数学结论的前提与证明见相应章节，后端公理证据见 [附录 A §A.3](appendix-a.md#sec-om-appa-frozen-registry)。
:::
