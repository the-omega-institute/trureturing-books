# 纳维—斯托克斯公开研究核查、书稿推理与后续目标

核查日期：2026-11-13。实施基线：`69ea91759351ffc7dab04f9348193edcc8352b50`（已快进至当时的 `origin/main`）。本书当前所钉的 trureturing 提交：`37ac4a0d6a8b6cea9792ac70953eeebe40c05792`，481 项声明。初次研究基线为 `9676fbc342fb305209346ebe1873ddd8b349ca44`、旧钉版为 `1d9bf98cab8306e67ec38a739359f2cdae63877a`；旧行号和旧基线检查不作为本次实施的验证证据。

本轮围绕第 30 章，连同第 29 章、终章、附录 A / C 的相关表述进行定向审读；不构成全书全部文献的重新核验。本文件记录研究判断与实施验收；本次只修订范围内中英书稿及本记录，不改锁文件或正式条目的验证等级。

## 已核实的公开材料

OpenAI 已公开一项针对千禧年纳维—斯托克斯问题的解答：对每个正粘性系数，构造从静止开始、受光滑外力作用的三维不可压缩流体，在有限时间发生速度无界，而爆破前动能一致有界。公告和论文明确对应克雷陈述 C、D。此前仅依据克雷介绍页面的 Active 标签便判断“没有解答”，遗漏了这项公开工作，应予更正。

| 材料 | 本轮实际核对内容 | 可以据此陈述的事实 |
| :--- | :--- | :--- |
| [OpenAI 官方公告：On the Navier–Stokes Millennium Prize Problem](https://openai.com/index/navier-stokes-solution/) | 正文、原论文链接、形式化仓库链接 | 公告明确宣布解决 C、D；同时公布无外力 Euler 爆破工作；不打算申领千禧年奖金 |
| [Finite time blowup for Navier–Stokes](https://cdn.openai.com/pdf/32d9f210-8b73-45e0-91bc-82a30aef8a9a/navier-stokes.pdf) | 166 页文件；定理 1.1；第 2、3 节的机制与标度 | 任意正粘性、零初态、光滑时空紧支外力、爆破前一致有限能量、有限时间速度无界；周期情形另见推论 10.6 |
| [公开 Lean 仓库](https://github.com/openai/NavierStokesAndEuler/tree/f9e8bc5b38b6e212696e8a30e3e91517af887bbd) | 固定提交的 README、问题定义、顶层证明及 Comparator 适配 | 顶层确有 C、D 对应的证明声明；提供独立检查配置与说明 |
| [克雷官方问题说明，第 2 页](https://www.claymath.org/wp-content/uploads/2022/06/navierstokes.pdf#page=2) | A、B、C、D 的量词、外力与衰减条件 | 题目接受四个陈述中任意一个的证明；C、D 允许规定类别的外力，A、B 要求零外力 |
| [Finite time blowup for the Euler equation](https://cdn.openai.com/pdf/315b36cd-ec98-4023-8342-93345194ece1/euler.pdf) | 57 页文件；定理 1.1 | 无外力、零粘性的另一项结果：光滑紧支无散初值导致有限时间梯度无界及涡量时间积分发散 |

官方网页的直接请求受到站点反自动访问机制限制，正文和原始链接经公开页面阅读服务读取；两个 PDF 直接取自公告所链的官方 CDN，形式化源码直接取自公告所链的 GitHub 仓库。下载的纳维—斯托克斯 PDF 的 SHA-256 为 `0e779481c4da40bd28d1e642e1d8ca57447d129610df28dfa5a11e9af8ae228f`；Euler PDF 为 `a0c234518e6c489e16996805023eb2e75c00b7c03455f7a3a5be2c124954bfdd`。

初次研究只核实原始材料和关键声明，未重建外部工程、未运行 Comparator。本次实施已实际安装所钉工具链、取得依赖、完成外部构建及 NS/Euler Comparator 双内核检查；下文记录终态与运行边界，不把作者发布、独立复验与克雷奖金程序视为同一件事。

### 形式化入口与占位问题

固定提交为 `f9e8bc5b38b6e212696e8a30e3e91517af887bbd`：

- [全空间定理 1.1](https://github.com/openai/NavierStokesAndEuler/blob/f9e8bc5b38b6e212696e8a30e3e91517af887bbd/NavierStokes/R3/Theorem.lean)：`NavierStokesR3.theorem_1_1`。
- [周期推论](https://github.com/openai/NavierStokesAndEuler/blob/f9e8bc5b38b6e212696e8a30e3e91517af887bbd/NavierStokes/PeriodicPaperTheorem.lean)：`NavierStokes.PeriodicPaper.periodic_corollary`。
- [最终比较器提交](https://github.com/openai/NavierStokesAndEuler/blob/f9e8bc5b38b6e212696e8a30e3e91517af887bbd/NavierStokes/ComparatorSolution.lean)：`NavierStokes.Comparator.navier_stokes_breakdown_R3` 与 `navier_stokes_breakdown_periodic`。
- [独立检查配置](https://github.com/openai/NavierStokesAndEuler/blob/f9e8bc5b38b6e212696e8a30e3e91517af887bbd/ComparatorChallenges/NavierStokes.json)只许可 `propext`、`Quot.sound`、`Classical.choice` 三项基础公理；[检查说明](https://github.com/openai/NavierStokesAndEuler/blob/f9e8bc5b38b6e212696e8a30e3e91517af887bbd/ComparatorChallenges/README.md)列出所需工具与命令。

参考挑战文件故意保留两个 `sorry` 待证目标；实际提交使用另一个模块中的证明。不能把参考题目的占位符误判为实际证明缺失，也不能仅凭没有搜索到占位符就宣布内核复验通过。

## 初次研究判断与本次实施差额

[第 30 章中文](../../books/quantum-geometry/zh/ch30-fields-lines-eth-and-navier-stokes.md)与[英文](../../books/quantum-geometry/en/ch30-fields-lines-eth-and-navier-stokes.md)已经将受迫 C、D 文献结果和无外力 A、B 开放问题分开。这一数学范围区分有依据，应保留。附录 C 的 O8 也专门限定零外力，无须因为 C、D 的解答而直接删除。

需要补足的核心事实是：**C、D 本身属于官方千禧年题目接受的解答路线。** “无外力问题仍开放”与“已公布一项官方题目的解答”可以同时成立。把剩余 A、B 再称为整个题目尚未解决，或者把受迫结果说成不属于官方题目，都会造成误导。

实施前文献段没有明确署明 OpenAI 和给出三个原始链接，并将若干 Euler 相关工作与受迫纳维—斯托克斯构造并列。应分清每项成果的方程、外力、定义域和初值正则性；OpenAI 公告把 Alpöge、Buckmaster 的同期成果明确描述为受迫 Euler 工作，不能将其误署为这份受迫纳维—斯托克斯证明。

全空间 C 要求外力各阶导数满足空间和时间的速降；论文构造的光滑时空紧支外力是满足这一要求的更强特例。周期 D 则是空间周期、时间速降；非零周期延拓在整个实三维空间上不可能同时空间紧支。能量有界是速度场的性质，不是外力场本身的能量条件。

## 可以推进的数学联系

### 有限能量允许局部速度无界

论文第 2 节令 $\tau=1-t$，取 $0<h<1/100$，核心的典型径向、轴向长度和主速度标度为

$$
\ell_r\asymp\tau^{1/2},\qquad
\ell_z\asymp\tau^{1/2-h},\qquad
U\asymp\tau^{-1/2-h}.
$$

据此可手算核心体积与能量的阶：

$$
V_{\mathrm{core}}\asymp\ell_r^2\ell_z
\asymp\tau^{3/2-h},\qquad
E_{\mathrm{core}}\asymp U^2V_{\mathrm{core}}
\asymp\tau^{1/2-3h}\longrightarrow0.
$$

与此同时 $U\to\infty$。这是本书“总量与局部投影必须分开”的一条精确教学联系：积分范数的控制不自动给出逐点幅值的控制。它不意味着所有范数守恒都会导致奇点。

径向、轴向长度实际上都趋零，只是径向收缩更快，故 $\ell_r/\ell_z\to0$。所谓涡丝“拉长”应解释为相对于横向尺度越来越细长；该构造的速度在原点附近集中，不能把细长的核心形状直接等同于一整条空间曲线都是奇点。

### 投影不闭合与二次平均应力

本书所引的[二次闭合判据](https://github.com/the-omega-institute/trureturing/blob/37ac4a0d6a8b6cea9792ac70953eeebe40c05792/D5/S3/Observer/Reversal/QuadraticObservationClosure.lean)研究

$$
V(x)=Lx-B(x,x),\qquad a=\Pi x,\qquad b=x-\Pi x.
$$

其精确增量为

$$
\Pi V(a+b)-\Pi V(a)
=\Pi Lb-\Pi\bigl(B(a,b)+B(b,a)\bigr)-\Pi B(b,b).
$$

隐藏的 $b$ 即使不出现在当前读数 $\Pi x$ 中，仍可通过二次项影响当前可见加速度。[五模态实例](https://github.com/the-omega-institute/trureturing/blob/37ac4a0d6a8b6cea9792ac70953eeebe40c05792/D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.lean)给出非零混合项 $i/4$，证明特定投影下不存在适用于全部状态的精确瞬时闭合映射。

原论文的关键机制则是：振荡脉冲的柱坐标速度分量角均值为零，二次动量通量的平均值仍可非零；它为背景流提供缺失的应力，修正奇异的动量残差。这与“看不到一阶扰动，不代表看不到它的二次反馈”存在具体代数联系。

这条联系目前尚未成为两个构造之间的形式化桥梁。原论文的角向平均与本书五模态的傅里叶低通投影不同；柱坐标基底、压力、Leray 投影及导数交换也需要逐项处理。特别是，本书当前实例由**混合项**证伪闭合，论文脉冲的平均应力突出的是**二次自相互作用**，二者不能直接当作同一个非零见证。

下面恒等式按[第 30 章投影反馈说明](../../books/quantum-geometry/zh/ch30-fields-lines-eth-and-navier-stokes.md)中明确给出的 Sobolev 空间、压力与时间/空间交换假设理解，所有时间均严格在爆破前。令 $\mathbb P$ 为 Leray 投影、$L=\nu\Delta$、$B(v,w)=\mathbb P((v\cdot\nabla)w)$，并将原外力 $f$ 投影为 $F=\mathbb P f$。对固定低通投影 $\Pi$，有

$$
\partial_t a
=La-\Pi B(a,a)
-\Pi\bigl(B(a,b)+B(b,a)+B(b,b)\bigr)
+\Pi F.
$$

目标是识别被删除模态产生的精确应力缺项，并说明增加哪些状态信息或保留哪些应力可以恢复描述。要从这个恒等式进入爆破证明，还必须补足跨尺度增长、粘性竞争、全阶残差控制和极限构造。

### 不闭合不足以推出爆破：一个直接反例

考虑下列二次常微分方程，仅观察第一坐标 $x$：

$$
\dot x=-\nu x-y^2,\qquad
\dot y=-\nu y+xy,\qquad \nu\ge0.
$$

状态 $(0,0)$ 和 $(0,1)$ 的可见读数相同，而可见导数分别为 $0$ 和 $-1$，故不存在对全部状态有效的 $\dot x=g(x)$。但

$$
\frac{d}{dt}(x^2+y^2)
=-2\nu(x^2+y^2),\qquad
x(t)^2+y(t)^2=(x(0)^2+y(0)^2)e^{-2\nu t}.
$$

多项式向量场局部光滑，轨道有界使正向解可延拓到任意有限时间。这个系统始终不闭合，却没有正向有限时间爆破。它不是流体方程的反例，而是排除“不闭合本身足够推出爆破”这一一般推理的反例。

同理，现有不闭合定理不排除近似闭合、记忆项、增广状态或其他投影。它也不推出计算复杂性下界。

## 对全书几何解释的约束

“两子丈量”“投影看不见的高阶关系”“状态同时参与生成演化算子”等图像，可以分别对应观测纤维、二次反馈和 $B(u,u)$。新的爆破构造为这些图像提供了一个适合讲解的外部案例，却没有证明整套几何解释与流体方程等价。

“P 是场，NP 是线”仍属于模型类比。要把它变成关于标准复杂性类的结论，至少需要明确输入编码、统一算法、位复杂度、证书长度与查询资源；状态空间的几何维数、零测度见证线或涡丝形状均不能替代这些条件。

特别需要区分以下三件事：静态地写出约束交集、求出交集中的一个点、以输入长度的多项式时间求点。第一件事不蕴含后两件事。已有形式证明也不自动说明一族问题都具有多项式长度的证明，或核验成本就是书中未限定单步成本的 $O(k)$。

有限分辨率测量与连续模型的物理适用边界也应分别讨论。数学爆破不直接证明真实流体必然出现无限速度、必然空化，或自然界只能采用某一种离散本体模型。把数值截断的存在说成连续方程不存在精确意义，同样超出了这些结果。

## 后续目标与验收条件

| 次序 | 目标 | 可审阅交付物 | 完成条件 |
| :--- | :--- | :--- | :--- |
| G0 | 建立原始证据与范围对照 | 本记录、原论文与固定源码链接、C/D 与 A/B 对照 | 已完成原始资料和关键声明核对；整套外部形式化的独立重建仍单列为复验任务 |
| G1 | 修正第 30 章及交叉引用的来源与范围表述 | 中英同步修订：明确 OpenAI、论文、源码；明确 C/D 为官方题目解答路线；保留 A/B 的 OPEN | 保留现有条目 ID 与环境序列；准确区分 NS 与 Euler；外部成果保持文献层级；检查、HTML 构建与实际浏览通过 |
| G2 | 把几何类比推进为可核验的应力机制说明 | 一份函数空间、投影与二次算子规格，连同显隐态分解和论文机制对照 | 明确角均与低通的区别；分别识别混合项与隐态平方项；给出同观测不同反馈的具体见证，不以类比替代证明 |
| G3 | 增加“不闭合与正则性不同”的教学对照 | 上述耗散二次系统的解释及与五模态实例的边界对照 | 手算能量恒等式和同观测异导数；若需正式定理，先在 trureturing 形式化并冻结，再由书稿引用 |
| G4 | 独立复验外部成果并评估形式化接入 | 固定外部提交、依赖、完整构建与 Comparator 结果；提出接入成本与边界 | 记录实际命令、退出码和允许公理；参考挑战占位符不混入证明依赖；复验完成前不声称本书已复验或已冻结外部定理 |
| G5 | 审查第 29–30 章与终章的跨领域推论 | 逐项论断表：已有定理、外部文献、模型解释、尚缺的推导 | 不从 NS 爆破推出 P≠NP，不从投影不闭合推出爆破；ETH 文献另查原始来源；需要“同构”时给出映射及保留的结构 |

上表定义验收目标；本次实际状态与命令见文末实施验收。研究目标是获得范围明确、可复算的桥梁，不把一项外部结果扩写成全书全部主张均已成立。

## 历史验证（初次研究，非本次实施验收）

- 对照了克雷问题的四种陈述、原论文定理 1.1、正式代码中的问题定义与最终提交。另作静态导入追踪：最终提交可达的 609 个本仓库源文件未导入参考挑战模块；这不代替实际内核检查。
- 对本书所钉提交的二次闭合判据、五模态实例和二维温和路径正则性文件进行了源码核对；后者明确假定给定区间上的温和路径，不是三维无条件全局存在性结论。
- 使用符号计算复核二次常微分方程的能量导数、同观测异导数，以及核心能量指数 $1/2-3h$。这些计算是辅助核对，不冒充已冻结的 Lean 定理。
- `./tbook check` 通过：1 本书、0 错误、0 警告；模板示例书按站点配置隐藏。`git diff --check` 通过；新增记录的本地链接、数学块配对与零模型标识也已核对。本轮只新增工程审读记录，不改变出版输出。

## 本次原始文献补查与论断对照

此前按标题查询 arXiv 返回 0，不能据此断言 ETH 论文不存在。本次实际读取 Fortnow 的 [2026-10-28 原始文章](https://blog.computationalcomplexity.org/2026/10/the-exponential-time-refutation.html)，由其原始链接定位两份论文并读取全文：

- OpenAI [67 页论文](https://github.com/openai/math/blob/4eaee87548250b2682affda7d05d947c05554bae/preprints/The-Exponential-Time-Hypothesis-is-False-October-25-2026/paper.pdf)，固定仓库提交 `4eaee87548250b2682affda7d05d947c05554bae`；论文日期 10 月 17 日、10 月 25 日修订。定理 1.1 的时间界带多项式输入因子，附录 D 的较强指数与主体较弱指数分开。[形式化范围说明](https://github.com/openai/math/blob/4eaee87548250b2682affda7d05d947c05554bae/lean/docs/378.md)明确规范输入编码长度与较弱的平方对数因子；不将较强纸面界直接称为形式化界。
- Anthropic [49 页论文](https://github.com/anthropics/formal-math/blob/16a5ce41304fcdaea4e0be7c132e1c361dc26da5/eth/paper.pdf)，固定提交 `16a5ce41304fcdaea4e0be7c132e1c361dc26da5`；定理 1、附录 E 分别给出 word RAM 结论、多栈图灵机命题和输入编码/模拟未形式化步骤。本次只核对论文声明与形式化范围，不独立重建 ETH 工程。
- Impagliazzo、Paturi、Williams 的[社区原始说明](https://ethdiscussion.blog/2026/10/26/eth-refutation-examination-and-discussion/)明确参与不等于认证。删去笼统的“审计印证”式结论，保留有来源的邀请审读事实。ECCC 年目录请求断开，不影响上述原始来源的定位。

| 论断 / 消费者 | 当前依据与边界 | 本次实施 |
| :--- | :--- | :--- |
| OpenAI NS C / D、第 30 章及附录 A / C | 官方公告、166 页论文、固定源码；官方题目接受的解答路线 | 明确归属与链接；全空间外力速降/时空紧支特例和周期外力分别写明；速度能量界不混为外力属性 |
| 无外力 NS A / B | 剩余正粘性无外力问题 | 保留原有 OPEN ID；不将它等同于官方四路线全部未解 |
| 无外力 Euler 与同期受迫 Euler | OpenAI 57 页 Euler 论文；公告对 Alpöge、Buckmaster 的明确归属 | 分别说明方程、外力、初值与梯度/速度结论 |
| 局部能量与速度 | 核心标度手算，非完整全局能量证明 | 新增 `ex-ch30-core-energy-scaling`，说明相对细长、两轴均收缩、并非一条奇异曲线 |
| 投影反馈与五模态 | 当前钉版的精确代数判据与有限实例；另附有假设的 PDE 展开 | 新增 `rem-ch30-projected-feedback`；Leray、压力、函数空间、时间/空间交换写明；混合项 +i/4 与加速度 -i/4、角均隐态平方项分别说明 |
| 不闭合是否导致爆破 | 二次耗散 ODE 手算与标准延拓论证 | 新增 `ex-ch30-dissipative-no-closure`；能量有界，明确不推爆破、复杂性下界，不排除记忆或增广状态 |
| NS 与 P/NP 同构 | 没有构造保结构映射或计算成本桥梁 | 第 29–30 章、终章与附录 A 改为类比；作者引语原样保留 |
| 静态约束、见证核验 | 新主干已区分解集、算法和逐步成本 | 复用第 30 章上游修正；附录 A51 及词典的重复见证条目同步，不从静态交集推出求点或高效制备；形式证明长度、核验成本与公理系统一致性分开 |
| ETH 界与银河交叉点 | 上述原始论文；指定常数曲线的手算 | 保留媒体与数学基准，澄清随机 PPSZ 比较、纸面/形式化差别；常数交叉不作普遍下界，语义对角线 GID 不认证外部算法 |
| Gram 约束是否给出唯一物理因果 | 三个单位向量的半正定相容窗口；共面时仍有端点分支 | 第 29 章撤回“给定两项便零自由度”的非引文推论，给出两项为 0 时第三项可取整个区间的手算；作者因果格言原样保留，其物理诠释标为模型 |
| 必然空化/离散本体 | 没有由该数学结果导出材料行为的桥梁 | 改为取决于材料、状态、尺度的适用性讨论；连续 PDE 的精确数学意义保留 |

所有原有正式环境头（kind / ID / GID）、媒体引用头、blockquote 引语及附录 A 作者原话列均与实施基线逐项比较并保留；不新增冻结定理，不更动托管工具。三个教学环境只标手工推导。终章复用主干已有边界，并同步上述引用。

## 本次实施验收（2026-11-13）

### G0–G5 的实际状态

| 目标 | 实际状态 | 证据及剩余责任 |
| :--- | :--- | :--- |
| G0 | 完成 | 原始公告、两份 NS/Euler 论文、固定源码与克雷四种陈述已核对；ETH 原始来源亦已定位，不以空检索代替文献判断 |
| G1 | 内容实施完成，出版检查有已知限制 | 第 30 章、终章、附录 A/C 的中英归属与范围同步；外部成果保持文献层级，A/B 保持 OPEN；Apple Books 界面权限另列实际阻碍；桥图嵌入尺寸异常已局部修复并通过补充回归，见下节 |
| G2 | 完成教学说明 | 核心标度、Sobolev 空间、Leray/低通与交换条件、显隐态反馈及两类见证的差别入稿；没有声称已建成形式化桥梁 |
| G3 | 完成教学对照 | 独立符号计算得到能量导数与两个不同的可见导数；正向延拓论证与不推复杂性下界的边界入稿 |
| G4 | NS/Euler 独立复验完成，有明确运行边界 | 完整外部构建退出 0；NS 与 Euler Comparator 各自的 Nanoda 与 Lean 内核均接受，两条比较器命令均退出 0；未接入本书冻结体系 |
| G5 | 范围内实施完成，待独立三席审查 | 论断表和相关消费者已同步；附录 A 重复核验成本、Gram 窗口与唯一性的非引文推论一并纠正，作者原话保留。独立审查及其确认修复由主代理续办 |

### 外部复验：实际工具、命令与边界

复验全部在书库之外进行。工作目录是公开固定源码的解压目录：

```sh
NS_REPRO_ROOT=/var/folders/7r/h8yjr2y927n8m2kh38c18n9w0000gp/T/cool-birch-ns-audit-20261113/NavierStokesAndEuler-f9e8bc5b38b6e212696e8a30e3e91517af887bbd
cd "$NS_REPRO_ROOT"
lake exe cache get
lake build NavierStokes Euler ComparatorChallenges comparator lean4export
export COMPARATOR_LANDRUN="$NS_REPRO_ROOT/.lake/packages/Comparator/scripts/fake-landrun.sh"
export COMPARATOR_LEAN4EXPORT="$NS_REPRO_ROOT/.lake/packages/lean4export/.lake/build/bin/lean4export"
export COMPARATOR_NANODA=/tmp/cool-birch-ns-impl/nanoda/target/release/nanoda_bin
lake exe comparator ComparatorChallenges/NavierStokes.json
lake exe comparator ComparatorChallenges/Euler.json
```

- 原始归档的 **2,669 个普通文件**与工作目录逐一作 SHA-256 比较，无变化；不是改写外部证明后再构建。工具链为 Lean `4.34.0-rc2`，宿主为 macOS arm64。
- 外部清单所钉 Mathlib 为 `85e3a25e006c35636f0e53b0e9296caca2685bc0`，Comparator 为 `19e111e2141cf333c7daff0f64c5f24acc91dd2e`，lean4export 为 `cacf989bd75f608700820f6afc595f32e7a99a4d`。Nanoda 另取公开提交 `0da9f98feadd3a0a2ef4b3dbcf52a298a6fef929`，`cargo build --release` 退出 0。
- `lake exe cache get` 实际下载并解压 **8,747** 个 Mathlib 缓存文件，退出 0；因此本次不声称从零重编了 Mathlib。随后上述完整 `lake build` **退出 0，11,446 jobs**。
- 构建中四个 `sorry` 警告均在两个参考挑战文件，每个各两项；它们是待比较的题目占位符。最终 NS 两项提交及 Euler 两项提交的公理输出均只含 `propext`、`Quot.sound`、`Classical.choice`，不将参考占位符混入提交证明的依赖。
- **NS 与 Euler Comparator 均实际退出 0**：各自的 Nanoda、Lean 默认内核均接受，比较器均报告提交通过；NS 对应全空间与周期两个最终声明，Euler 对应 `Euler.euler_breakdown_R3` 与 `Euler.exists_compact_smooth_euler_singularity`。
- macOS 路径使用的是上游 Comparator README 明确提供的开发 shim；它执行检查但**不提供 Linux Landlock 隔离**。本次复验不声称取得面对恶意源码的沙箱保证，也不等于克雷奖金认证。公开结果、本次检查、本书冻结账本是三个不同层次；没有新增任何本书 GID，也没有复制 Lean 文件入库。

诊断保存在临时目录 `/tmp/cool-birch-ns-impl/`：`external-source-integrity.json`、`external-build.txt`、`comparator-navier-stokes.txt`、`comparator-euler.txt`。这些是复验记录，不是出版物的证明依赖。

### 书库检查与出版输出

最终书稿修改后，使用本机已有的原生 Pandoc；打包依赖附带的另一架构可执行文件无法在本机运行，未改托管工具。实际命令：

```sh
TRURETURING_DIR=/tmp/cool-birch-ns-impl-trureturing ./tbook check
TBOOK_CACHE=0 PANDOC=/Users/auricstudio/.local/bin/pandoc TRURETURING_DIR=/tmp/cool-birch-ns-impl-trureturing ./tbook build html pdf epub site --book quantum-geometry
./tbook serve --port 8890
```

| 检查 | 实际结果 |
| :--- | :--- |
| 最终 `./tbook check` | 退出 0：1 本书、**0 错误、9 警告**。警告为上游未引用的 `prelude-parts` 静态图和八个视频的历史 subject commit；保留原始媒体与溯源，不在本次越域处理 |
| 最终无缓存串行构建 | 退出 0；中英 HTML、各语言 screen / print / academic 六份 PDF、两份 EPUB 及 `_site/` 均生成。最终日志为 `acceptance-exports.txt`；此前中止或过时的尝试不作验收证据 |
| 首次浏览器实看（修复前） | 通过 `./tbook serve` 的真实 Pages 子路径，在 DOM 与字体就绪后逐块截图并访问五个受影响单元，中英、navy/light、1280/390 px 共 **40** 组；0 KaTeX 错误、0 缺失本地响应、0 页面横向越界。ETH 定义及三个新教学环境的显示公式均无容器内溢出；ETH 以短时间界配合下确界说明，避免手机横向滚动。最终按页面保留错误快照后，**8 组第 30 章页面共捕获 17 次既有桥图 Canvas 负半径异常**，故该次不判浏览器零异常通过；先前被复用数组清空的零异常结论作废。两语言、两主题、两宽度的正文截图及六份 PDF 对应 ETH 定义已实际查看；下节记录后续修复与复验，本行保留失败历史 |
| PDF 实看与结构 | 六份最终 PDF 的标度、投影和 ODE 页面均渲染抽查，另查 Gram 修订页、学术版首页与目录。无原始 TeX/颜色源码泄漏；字体全部嵌入，无 Type 3 或 LastResort；无活动对象或附件。中英 academic 分别为 **41,126,661 / 42,582,210 字节**，均低于 50,000,000；六份各有 276 个书签 |
| EPUB | 两份均由实际 epubcheck 判定 valid：**0 错误、0 警告，未跳过**；XHTML 可解析，各有 47 个含 MathML 的文档，三个新教学 ID 均存在 |
| 数学与保留性（正文实施） | 独立符号计算复核 ODE 导数 `-2ν(x²+y²)`、可见导数 `0 / -1`、核心指数 `1/2-3h`；三个新环境数值序列中英一致。原有正式环境头及正文、原有环境 ID/GID、媒体头、blockquote 引语、附录 A 每语言 67 个作者原话单元格均保留；该次正文实施未改锁文件、媒体源码和托管工具；后续桥图的必要尺寸修复另记于下节；`git diff --check` 退出 0，新增内容无模型标识 |

相关结构化诊断：`browser-final-results.json`、`pdf-inspection.json`、`pdf-extra.json`、`epub-validation.json`、`math-check.json`、`preservation.json`、`browser-media-errors.json`、`existing-bridge-check.json`，均在上述临时诊断目录。screen/print 文件不受 academic 投稿体积目标约束，本次未压缩或替换既有图件。

### S5 桥图嵌入尺寸异常：已修复与补充复验

原验收在八组第 30 章页面捕获 17 次 `eth-horizon-crossover/main.js:125` 的 Canvas 负半径异常；另一次章节定向复现也确认同一路径。直接以 733 × 500 px 单开同一 `embed=1`、`preset=bridge` 页面时两语言均未复现。本轮修复前沿原 `browser-final.mjs` 的加载、滚动与截图顺序再跑 40 组，八组第 30 章页面捕获 **18 次**异常；新增尺寸探针确认这八组的桥图画布在加载中短暂为 **100 × 0 px**，中英文负半径分别为约 −16.9806 / −22.2768。次数随加载时序不同，原来的 17 次失败记录仍然有效。

本次按已授权的必要媒体修复范围，经项目指定的直接命令行生产工具修改 `drawCut`：共享 `kit.plot` 清空画布后，可用宽度 `W − 36` 或扣除标题、图例后的可用高度非正时，清除旧的 `cutGeo` 并结束这一帧；尺寸恢复后仍由原 `kit.painter` 的 ResizeObserver 重绘。正常尺寸的绘制表达式、七张卡、公式、来源、标签、配色、只读探针接口与共享运行时均保留，探针注释补充无可用空间时返回 `null` 的语义。新增专页回归验证中英文图在隐藏、30 px 宽、60 px 高与恢复之间的自动重绘。

| 补充检查 | 实际结果 |
| :--- | :--- |
| 旧/新源码确定性尺寸回放 | 中英、733/390 × 500 px 共四组，分别经历隐藏、高度不足、宽度不足：旧源码 **12 次负半径绘制失败**，修复后 **0 次**；12 次恢复均回到原几何。四组正常帧的数学状态与几何完全相同；经本地字体就绪后比较解码像素，四组画面均逐像素一致 |
| 专页浏览器质量门与独立数值检查 | `node books/quantum-geometry/viz/tests/eth-horizon-crossover.test.mjs`：**160/160 通过**，退出 0；加 `VIZ_SLOW_FRAMES=1000` 再跑：**160/160 通过**，退出 0。包含原 `stageFirstChecks`、432 个桥图实例和新增尺寸回归 |
| 实际章节加载、滚动、截图与窗口调整 | 用 `./tbook serve --port 8890` 的真实 `/trureturing-books/` 路径，沿原脚本重跑五个受影响单元，中英、navy/light、1280/390 px 共 **40 组**：**0 页面异常、0 缺失本地响应、0 KaTeX 错误、0 页面横向越界**。八组第 30 章仍观察到零高度加载帧，均正常恢复；桥图往返调整窗口宽度后，几何及数学状态与调整前完全一致 |
| 截图与静态图 | 标准 `viz-shots` 的桌面、书内、手机、封面共七张，加 `bridge` 的桌面、书内、手机六张，两个命令均退出 0；实际章节另截八张桥图。已查看这些画面及手机首屏裁图。`viz-thumbs` 成功生成封面与十张被引用卡片静态图，退出 0；生成结果另存诊断目录，出版物保留原 JPG 字节，避免这处不改变正常帧的修复带入无关重采样 |
| 校验与构建 | `node tools/node/viz-validate.mjs quantum-geometry`：51 个已登记页面，**0 错误、0 警告**，退出 0；`TRURETURING_DIR=/tmp/cool-birch-ns-impl-trureturing ./tbook check`：**0 错误、9 项既有警告**，退出 0；`./tbook build viz --book quantum-geometry` 退出 0。这里只重建可视化输出，最终出版输出由下一验收工人在主代理整合图注后验证 |
| 范围与保留性 | 本轮只改桥图 `main.js`、对应专页测试和本记录；启动时的十份双语书稿改动全部保留，90 个章节/目录文件及锁文件的 SHA-256 均与本轮开始一致；其余媒体、原 JPG、视频与托管工具未改。未重新运行外部 NS/Euler 构建或比较器，既有成功证据保留 |

本轮诊断目录为 `/tmp/cool-birch-s5-worker2/`：`before/browser-final-results.json` 保留新增故障复现，`after/browser-final-results.json` 与 `after-summary.json` 记录真实章节复验，`geometry-regression.json` 与 `positive-pixels.json` 记录独立尺寸/正常帧对照，`test-normal.txt`、`test-slow.txt`、`verification-summary.json` 记录质量门结果；`shots/`、`after/` 和汇总截图保存可视证据。**该负半径阻断项已关闭**；独立审查与主代理整合后的最终出版验收、发布仍按下节分工续办。

### 尚未完成的工作、责任人与真实阻碍

1. **Apple Books 图形界面实看：主代理或具备界面权限的操作者。** 本机存在 Books.app，但实际尝试 `osascript -e 'tell application "System Events" to get UI elements enabled'` 退出 1，系统返回 Apple Events 未授权 `-1743`，无法自动操作/检查阅读界面。本次 EPUB 结构与 epubcheck 已通过，不能据此虚称 Apple Books 显示已经验收；仍须打开两份最终 EPUB 抽查新公式及阅读主题。
2. **独立三席审查、确认阻断项修复、PR/CI/合入 main/Pages：主代理。** 本实施工人没有委派、提交、推送或创建/合并 PR，不将本地验收写成发布完成。
3. **本地视频输出的环境限制：发布负责人按既有流水线处理。** 本地站点构建发现视频 Python 依赖与语音资源不全，十个既有视频采用工具自带的海报与“未构建”回退；演示文稿中英各 48 页构建并检查成功。视频源码与既有引用均未改，不在本次安装完整视频流水线。正式发布应按既有 CI/缓存恢复完整媒体。

