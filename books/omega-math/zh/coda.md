# 终章 六卷全景对照与姊妹卷导图

> *“把外置无穷、超越近似与不可计算公理层层剥去之后，数学并未变窄——它回到了最坚实也最自由的本相：每一条定理皆为精确有理关系，每一次证明皆为可运行的有限计算。”*

六卷十八章从纯归纳构造演算（CIC）与母公理 $\mathrm{AXIOM}\text{-}\Omega$ 出发，依次建成齐次射影数系、无原点流群与利雅三元恒常单位曲率、双卡无奇点凯莱旋转与球面有理三角、无极限射流微积分与任意阶凯莱—三角复合统一、三维球面全阶无 $\pi$ 调和分析、阿代尔算术与自由群 $F_3$ 及模方 $5$ 赫克—拉马努金有理谱论，最后归于非阿贝尔 $\Omega$-FRACTRAN 旋子机、观察者静止画布模型以及最后一章的审计。选定的严格库闭包在空内核中重放，表列的核心 D5 定理有双端公理记录。圆周恒等式经 `OmegaShadowBridge` 投射到实数后，其官方端证明依赖三条标准公理（见 [附录 A](appendix-a.md)）。本章将六卷成果置于传统分析框架旁边作全景对照，收束全书的数学与哲学立意，并给出与姊妹专著《量子计算的几何直觉》的双向阅读导图。

## 六卷全景对照：传统 ZFC 与实分析对比零公理有理数学 {#sec-om-coda-six-volume-comparison}

下表逐卷对照传统 ZFC $+$ 实数连续统 $\mathbb{R}$ 路线与本书零公理有理体系 $\mathbf{Math}_\Omega$ 在六大数学分支中的根本差异，并列明每一卷所彻底消去的“实无穷”、“超越近似”或“不可计算（`noncomputable`）”枷锁：

| 卷次与主题分支 | 传统路线（ZFC $+$ $\mathbb{R}$ $+$ `Mathlib.Real`） | 零公理有理路线（$\mathbf{Math}_\Omega$ $+$ `OmegaInit`/`OmegaMath`） | 消去的三重枷锁 |
| :--- | :--- | :--- | :--- |
| **第一卷 · 公理地基与数系**（第 1–3 章） | 康托尔实无穷 $\aleph_0$、柯西商集构造 $\mathbb{R}$、引入 `Classical.choice` 与 `Quot.sound`；除零在 $\infty$ 处爆炸 | 裸 CIC 归纳内核 $+$ `AXIOM-Ω`；齐次射影闭环 $\mathbb{QP}^1$ 令 $[1:0]$ 有限闭合；规范整数代表元 `CanonProjTernion`、`Omega.IntRatio` 免商构造与正交非交换见证 | 消去实无穷、选择公理、商公理 `Quot.sound` 与 $\infty$ 奇点 |
| **第二卷 · 代数与球面几何**（第 4–6 章） | 特权原点向量空间、欧拉角万向锁、依赖超越函数 $\sin, \cos, \arccos$ 与平方根归一化 | 无原点普吕弗—贝尔流群 $[x,y,z]$ 与利雅三元恒常单位曲率 $K \equiv +1$；双覆叠有号旋量 `PythSpinor` 六拍轨道；$\operatorname{Ad}(S^3(\mathbb{Q}))$ 上的有理双卡修正罗德里格斯参数（所选分母 $\ge 1/2$）；巴格曼—格拉姆及有理球面正弦／勾股律 | 消去特权原点、无理根号与三角超越表 |
| **第三卷 · 微积分与流形**（第 7–9 章） | $\varepsilon$-$\delta$ 无穷小极限、`Filter.Tendsto` 滤子证明爆炸、`noncomputable` 实导数与多卡光滑图册 | 二阶幂零射流商环 $\mathbb{Q}[\eta]/(\eta^3)$ 纯四则两项求逆与中点凯莱驻球守恒；任意阶 D-有限射流 $J_N(\mathbb{Q})$ 形式复合链式法则、凯莱—三角大一统与无 $\pi$ 马青有理包络；流群精确伸缩与单纯形锥同伦 | 消去 $\lim_{h\to 0}$、极限滤子税与超越常数 $\pi, e$ |
| **第四卷 · 球面调和分析**（第 10–12 章） | 含 $\pi$ 的连续 $L^2(S^3)$ 勒贝格积分、复球谐函数 $Y_\ell^m$ 与不可计算实特征值 | 彼得—魏尔整系数偶次切比雪夫自旋壳 $E_n(\kappa)$ 乘积律；卡塔兰阶乘无 $\pi$ 哈尔积分与全阶彼得—魏尔正交归一；零公理二次扩张 `QSqrt2`/`QPhi` 与有理舒尔正定性 | 消去勒贝格连续测度、$\pi$ 归一化因子与实特征值黑箱 |
| **第五卷 · 算术与谱论**（第 13–15 章） | 复平面解析延拓、素数对数 $\ln p$、无理根号 $\sqrt{p}$ 与非构造无穷欧拉乘积 | 构造性欧几里得素数逃逸、有限连分数与整数四分深度预算；阿代尔乘积归元与 $S_5$ 模 $5$ 非消去／自由群 $F_3 \hookrightarrow \mathrm{SO}(3,\mathbb{Q})$ 伴随单射；无复数赫克—拉马努金有理半正定判据 $4p\langle f,f\rangle_{\mathbb{Q}} - \langle \widehat{T}_p f, \widehat{T}_p f\rangle_{\mathbb{Q}} \ge 0$ | 消去复数域 $\mathbb{C}$、$\ln p$、$\sqrt{p}$ 与非构造解析极限 |
| **第六卷 · 计算、观察者与审计**（第 16–18 章） | 冯·诺依曼可变字节数组、外置实数时间河 $t \in \mathbb{R}$、实数圆周恒等式等依赖三条标准公理的 `noncomputable` 证明 | 非阿贝尔 $\Omega$-FRACTRAN 旋子栈、$P_\Omega$ 停机见证与零公理 `Mat2` 行列式乘性／凯莱—哈密顿；无外端口观察者与静止画布记忆切分 $\kappa_{\mathrm{time}} + \kappa_{\mathrm{space}} = 1$；选定严格库闭包的空内核重放、D5 双端公理记录与单向阴影桥 $\Pi_{\mathbb{R}}$ | 消去外置时钟/指针、`noncomputable` 传染与隐蔽经典公理 |

## 收官沉思：当证明回归计算，几何回归关系 {#sec-om-coda-philosophical-synthesis}

回望百年数学基础史，许多人曾以为“放弃实无穷与选择公理”必然意味着退回残缺的有限组合学，再也写不出微积分、旋转群、调和分析与谱理论。这六卷的演绎实践给出了截然相反的答案：**微积分、球面几何、调和分析与拉马努金谱隙之所以在传统教材里显得离不开 $\infty$、$\pi$、$e$ 与 `noncomputable` 实数，并不是这些数学结构本身需要实无穷，而是因为我们习惯先把弯曲的有限有理关系压扁在平直笛卡尔坐标纸上，再去偿还那笔永无止境的无穷级数欠条。**

一旦撤除平直坐标纸与外部第 3 点，把对象还给齐次射影对、整四元数旋子、幂零射流商环与素数本原闭合环，三件事便同时发生：

1. **无限归于有限闭包**：昔日令算术崩溃的无穷远点 $\infty$ 成为射影对 $[1 : 0]$ 处一枚平平无奇的对径锚点；
2. **近似归于零误差恒等**：昔日需要小数截断与极限滤子逼近的导数、哈尔积分与谱界，回归为纯整数与有理多项式的精确恒等式；
3. **经典实分析归于恰当位置**：$\mathbf{Math}_\Omega$ 并不制造与主流数学隔绝的孤岛；它让可计算的核心留在严格库中，并对选定闭包做空内核重放，而将经典连续统分析稳妥安放在单向阴影函子 $\Pi_{\mathbb{R}}$ 的外层，令“证明即计算”与“经典分析兼容性”兼得而不互染。

## 姊妹卷阅读导图：与《量子计算的几何直觉》的双向对位 {#sec-om-coda-sister-monograph-map}

本书（**`OMEGA MATH`**，代号 `OMEGA//MATH`）是独立成册的六卷零公理纯数学专著，并与姊妹专著 **[《量子计算的几何直觉：从两子丈量、球外之球到 $\psi = \psi(\psi)$》](https://github.com/the-omega-institute/trureturing-books/blob/main/books/quantum-geometry/zh/SUMMARY.md)**（代号 `ORTHO//QUANTUM`，DOI `10.5281/zenodo.24156135`）构成严密互补的双璧：本书专注六卷纯有理数学与零公理内核演绎，姊妹卷则展开完整的物理直觉、量子计算电路编译、哲学谱系批判与全部专题实验沙盘。读者可按下表自由穿梭于两部专著之间：

| 本书 `OMEGA//MATH` 卷章 | 姊妹卷 `ORTHO//QUANTUM` 对应入口 | 跨卷延伸主题 |
| :--- | :--- | :--- |
| **第一至二卷**（第 1–6 章：CIC、`AXIOM-Ω`、$\mathbb{QP}^1$、三元流群与有理旋转） | [第三十二章 不可表达的三元数与三维概念场封顶](https://github.com/the-omega-institute/trureturing-books/blob/main/books/quantum-geometry/zh/ch32-inexpressible-ternions-and-three-dimensional-field.md) | 哈密顿三元数公案、三维概念场封顶、五种无损非线性表示与无常数有理重构 |
| **第三至四卷**（第 7–12 章：射流微积分、圆弧流形、无 $\pi$ 球面傅里叶与二次扩张） | [§32.7–§32.8 与 §39.7 三元球面有理傅里叶变换](https://github.com/the-omega-institute/trureturing-books/blob/main/books/quantum-geometry/zh/ch39-s37-spherical-fourier-transform-peter-weyl-synthesis.md) | 极小圆弧微积分、`0 · 1/2 · 1` 因果射流、$5d^8$ 四极切片与 `QSqrt2`/`QPhi` 扩张 |
| **第五卷**（第 13–15 章：素数逃逸、阿代尔闭合与模方 5 赫克—拉马努金谱隙） | [第三十一章 圆弧微积分与黎曼谱磨光](https://github.com/the-omega-institute/trureturing-books/blob/main/books/quantum-geometry/zh/ch31-arc-calculus-and-riemann-hypothesis.md) | 阿代尔素数闭合、全息圆弧—螺线管流形、LPS 拉马努金图 $X^{5,13}$ 与素谱对偶 |
| **第六卷 第 16 章**（$\Omega$-FRACTRAN 与二维矩阵环） | [§38.14 康威 FRACTRAN 与三维非阿贝尔 $\Omega$-FRACTRAN 观察者语言](https://github.com/the-omega-institute/trureturing-books/blob/main/books/quantum-geometry/zh/ch38-s14-omega-fractran-observer-rational-isa.md) | 康威乘法器 18 拍、`PRIMEGAME` 素数结晶、宏引理压缩与三代计算范式对比 |
| **第六卷 第 17 章**（观察者即宇宙、结构时间与静止画布记忆切分） | [§38.12–§38.15 时空记忆切分、观察者即宇宙与静止画布](https://github.com/the-omega-institute/trureturing-books/blob/main/books/quantum-geometry/zh/ch38-s12-spacetime-motion-equivalence-and-memory-schur-split.md) | 古尔斯特兰德—潘勒韦倾倒视界锥、AF-GUT 温伯格 $3/8$、TFT 与本体 QRAM |
| **第六卷 第 18 章**（空内核审计、单向阴影函子与四模式工作台） | [§32.8 Lean 4 零公理基座](https://github.com/the-omega-institute/trureturing-books/blob/main/books/quantum-geometry/zh/ch39-s36-lean4-zero-axiom-omega-math-architecture.md) 与 [§39.8 全书去近似重编译](https://github.com/the-omega-institute/trureturing-books/blob/main/books/quantum-geometry/zh/ch39-s38-omega-math-recompilation-and-self-referential-atlas-closure.md) | 五阶编译流水线沙盘、十二赫维茨晶核图谱与 [终章 C.3 十部曲阅读导图](https://github.com/the-omega-institute/trureturing-books/blob/main/books/quantum-geometry/zh/coda-s06-reading-map.md) |

若需在一份精炼演示中纵览全书六卷的零公理骨架、关键冻结定理、交互实验台与开放问题边界，可直接打开下方的双语全景演示文稿：

::: {.slides src="overview"}
全书全景演示文稿：从裸 CIC 与母公理 AXIOM-Ω 出发，串讲六卷零公理有理数学的核心图像、关键冻结声明、单向阴影函子、四座三维交互实验室与开放问题边界。
:::

[附录 A](appendix-a.md) 列出严格库主要模块、D5 双端记录、单向桥接定理与复核命令。[附录 B](appendix-b.md) 收录符号词典、证据总账、媒体索引和构建生成的全书统计。
