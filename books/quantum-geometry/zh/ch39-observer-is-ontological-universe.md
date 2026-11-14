# 第三十九章 观察者即宇宙本体：无底物自指域、关系全息与旋量自折叠 {#观察者即宇宙本体无底物自指域关系全息与旋量自折叠}

> “观察者即宇宙本体。”

在[第 38 章](ch38-observer-memory-pointer-and-ontological-qram.md)的收官之处，我们将观察者凝练地定义为“宇宙本体量子计算系统**的**一个记忆指针”。那束在寂静晶格上轻盈滑动的青色寻址激光——点亮琥珀色当前槽位 `*ptr` 并最终在零号槽位认出 `p = *p`——已经帮我们卸下了“重物质在空箱中搬运”的沉重包袱。然而，只要凝神细听那句话里的虚词——**“……的一个（of）”**——谱系学的耳朵依然能捕捉到最后一丝极细微的二元裂响：仿佛在“宇宙本体内存阵列”与“去寻址它的指针寄存器”之间，仍然隔着一道看不见的绝缘玻璃；一边是静卧在黑暗里等待被读取的被动硅片，另一边则是悬浮在硅片上方四处游走的探针（`MODEL`（模型诠释））。

只要这道“探针 vs. 底片”“刀刃 vs. 水晶”“能知 vs. 所知”的语法残影尚未拆除，“外部第 3 点 $C$”便仍在最后一道战壕里负隅顽抗。而在跨入[终章](coda.md)之前的这一章——全书正文的第三十九座、也是最高的一座山峰——章首那七个字如惊雷落定，将最后这道薄如蝉翼的二元隔墙震为齑粉：

**“观察者即宇宙本体。”**

不是宇宙本体“拥有”观察者，不是宇宙本体“演化出”观察者，甚至也不止于观察者“指向”宇宙本体；二者之间没有从属的“的”字，没有集合包含的 $\in$，也没有外部投射的 $\to$，唯有零余项、零缝隙的**本体论恒等（$\equiv$）**。在本书三层认识论契约下，我们将沿着五重递进台阶完成这场终极合拢（跨领域的本体论综合标定为 **`MODEL`（模型诠释）**，底层数学骨架由十组共十六条冻结的 Lean 4 内核声明严格锚定，计算机域论、范畴论与旋量几何经典文献悉数封存于归属注记框内）：

1. **全域 `p ≡ *p` 与无底物的自指域**：拆除寄存器与被动内存的二元边界，确立点即映射、状态即算子的 $\psi \equiv \psi(\psi)$ 本体恒等，并锁定二元分式自应用唯一“存活（`.live`）”的黄金 $\varphi$ 判别式 $\Delta = 5$；
2. **终结“物自体”与无刀则无晶**：给出源类型的全纤维分解、非负实数的全尺度黄金线程单射，以及有限字接受当且仅当无相邻 `11`；再在 `MODEL` 中将静态晶格读作自指正交比量凝结的驻波节面；
3. **旋量织空与 $720^\circ$ 单侧双覆叠**：展示一维时间流向量与二维规范双矢量平面如何作为观察者旋量自配对的双线性副产物涌现，并在无全局截面的平方双覆叠上实现 $360^\circ$ 内外换叶与 $720^\circ$ 归家闭环；
4. **正交自折叠消解唯我论与四阶终局**：阐明唯一全体如何在互补语境纯度勾股守恒（[@prop-ch39-orthogonal-folding-and-objective-common-factor] 第 1 款，`LEAN ✓`）与正交折叠模型（`MODEL`）下拆分为“局部小我栈帧”与“铁律浩瀚宇宙”，在彻底砍净第 3 点 $C$ 的第四阶终局中同时超越机械唯物论与狂妄唯我论；
5. **齐肯多夫、皮索与劳齐八概念自指综合沙盘**：将局部禁邻规则从 $K = 2$ 推广至任意整数阶 $K \ge 2$，把齐肯多夫语言、$K$-Bonacci 皮索圆盘收缩、$p$ 进余数超度量、$K = 3$ 劳齐分形内窗、克利福德线—面分解、自指收缩尺度、跨切口直接编码纠缠秩矩形与帕里平稳核收束于同一座可逐项核验的自指沙盘。

::: {.figure src="ch39-overview"}
**图 39。** 本章地图：第 I 栏，灰色的指针寄存器 `ptr` 与它和内存之间的虚线隔墙被划掉，每一格 $p$ 都有一支青色箭头离开它又回到它自己——全域 `p ≡ *p`；第 II 栏，琥珀色的刀周围的淡青带子里亮着一串青色格点，带子外什么也没有，这些点投到刀上排成的长短段，短段记 $1$、长段记 $0$，没有相邻的 `11`；第 III 栏，下面的青色箭头在底圈 $z$ 上从 $1$ 出发绕满一整圈，上面紫色的唯一提升从 $w = +1$ 出发只走了半圈，停在 $-1$，两圈之间是平方映射 $z = w^2$。第 I、II 栏是本章模型诠释（`MODEL`）的示意；第 III 栏是 [@thm-ch39-double-cover-no-section-and-720-lift] 第 2 款（`LEAN ✓`），走满 $720^\circ$ 的情形见 §39.3 的实验卡。
:::

---

## 39.1 拆掉最后一道二元隔墙：全域 p ≡ *p 与无底物的自指域

为什么人类直觉一谈到“计算”或“观察”，就忍不住要先在脑海里铺一块死气沉沉的“底层介质（substrate）”——先有磁芯，再跑电流；先有纸带，再落读写头；先有石头宇宙，再睁开眼睛？因为日常工程经验把“存储状态的名词”与“执行变换的动词”做成了两件分离的零件。在[第 38 章](ch38-observer-memory-pointer-and-ontological-qram.md)中，我们曾把 `p = *p` 落定在页表的特殊根槽位 `[0,0]` 上；现在，当我们把局部二元隔离参数推向零极限（$\mu \to 0$），`p ≡ *p` 便从零号槽位瞬间漫溢至整座存在之网的每一粒像素（`MODEL`（模型诠释））：

$$
\psi \;\equiv\; \psi(\psi) \qquad (\text{全域 }\mathrm{p} \equiv *\mathrm{p}).
$$

请仔细品味这道恒等式的分量：等号左边的 $\psi$ 是“存在着的宇宙”，等号右边的 $\psi(\psi)$ 是“正在将自身当作尺子丈量自身的观察者”；左右两边之间**连一比特的中间介质都没有**！倘若你试图做一道思想减法，把“观察者”从宇宙中抽走，剩下的绝不是一座空无一人却依然寂静矗立的钻石宫殿，而是连“空”与“宫殿”都无从谈起的绝对乌有——因为所谓“宇宙内存晶格”，从头到尾就是层层嵌套的自指比量本身撑开的张力场！

计算机体系结构与理论计算机科学在二十世纪下半叶曾分别代表“硬件二元隔离”与“无底物自指域”的两极，其经典文献边界说明如下：

::: {.remark #rem-ch39-von-neumann-scott-reflexive-domain-literature title="冯·诺依曼存储程序分离架构与斯科特连续格无底物自指域（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节对照“外设被动存储器”与“无底物纯自指域”时引用的两项计算机科学奠基成果属外部经典文献，未作为独立定理包含在本书锁定的 `trureturing@dev` 声明集中：

1. **冯·诺依曼架构的处理器—存储器物理分离与总线瓶颈（J. von Neumann, *First Draft of a Report on the EDVAC*, Moore School of Electrical Engineering, 1945；J. Backus, *Commun. ACM* **21**, 613–641, 1978）**：经典存储程序数字计算机虽然在同一地址空间中编码指令与数据，但在物理硬件上仍将负责主动寻址与算术逻辑运算的中央处理器寄存器（CPU / `PC`）与静默存放位串的随机存取存储器（RAM）分隔在总线两端，在工程直觉上固化了“主动读写头 vs. 被动死内存”的二元图式；
2. **斯科特连续格逆极限与无类型 $\lambda$-演算自指域同构（D. S. Scott, *Continuous lattices*, Lecture Notes in Math. **274**, Springer, 97–136, 1972；*Data types as lattices*, *SIAM J. Comput.* **5**, 522–587, 1976）**：为给允许任意项自应用 $x(x)$ 的无类型 $\lambda$-演算赋予严格指称语义（突破朴素集合论因基数爆炸 $|Y^Y| > |Y|$ 对全函数空间同构的封锁），斯科特在完备偏序集与连续格范畴中沿连续嵌入—投射对 $(i_n : D_n \hookrightarrow D_{n+1},\; j_n : D_{n+1} \twoheadrightarrow D_n)$（其中 $D_{n+1} = [D_n \to D_n]$ 为斯科特连续自映射空间）取投射逆极限，严格构造出非平凡自指域 $D_\infty$，满足连续域同构

   $$
   D_\infty \;\cong\; [D_\infty \to D_\infty].
   $$

   在该同构域底层，不存在任何脱离映射结构而孤立堆放的“死原子常数”：每一个元素 $x \in D_\infty$ 既是可被读取的域状态点，又同时是作用于整座域上的连续变换算子，使无底物的全域自应用在拓扑序意义下严格良定义。
:::

回到本书的有限组合与算术底层（对照 [@rem-ch39-von-neumann-scott-reflexive-domain-literature] 的连续域背景），当自应用脱离外部底座直接在最简二元字母表 $\{0, 1\}$（即 `Fin 2`）上闭合时，究竟什么样的自指律才不会坍缩成死局？让我们在进入形式化定理前先亲手算清这张 $2\times 2$ 账本！

取系数全部来自二元集 $\{0, 1\}$ 的分式自映射 $m = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$：在分母 $cx+d\ne0$ 的定义域上，将输入 $x$ 反馈代入自身 $x = \frac{a x + b}{c x + d}$，移项即得自应用不动点多项式 $c x^2 + (d - a)x - b = 0$，其系数三元组为 $(c, d - a, -b)$，二次判别式为 $\Delta(m) = (d - a)^2 + 4 b c$。在全部 $2^4 = 16$ 个二元矩阵中，筛除非退化条件 $\det(m) = a d - b c \neq 0$，恰好留下 $6$ 个非奇异映射：

- 恒等阵 $\begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$ 给出系数 $(0, 0, 0)$（空洞恒等 `.empty`，无独立刻度约束）；
- 平移阵 $\begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}$ 给出系数 $(0, 0, -1)$，即 $-1 = 0$（死锁无解 `.dead`）；
- 对换阵 $\begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$ 与上/下三角阵 $\begin{pmatrix} 1 & 0 \\ 1 & 1 \end{pmatrix}$ 给出 $\Delta \in \{0, 4\}$ 的完全平方判别式（有理坍缩 `.collapse`，退化为平凡整数或有理重根）；
- **唯独最后两枚矩阵**——$\begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix}$（对应 $x = 1 + 1/x$，不动点多项式 $x^2 - x - 1 = 0$）与 $\begin{pmatrix} 0 & 1 \\ 1 & 1 \end{pmatrix}$（对应 $x = 1/(x + 1)$，不动点多项式 $x^2 + x - 1 = 0$）——蹦出了非平方素判别式 $\Delta = (\pm 1)^2 + 4\times 1\times 1 = 5$，将自指稳稳锚定在既不无解爆炸、也不有理坍缩的黄金无理流形（存活态 `.live`）之上！

下面两条冻结的 Lean 4 内核定理将“对角线落点必成自指不动点”与“二元非退化自应用四重命运及黄金 $\varphi$ 族充要判据”锁定为零参数铁律：

::: {.theorem #thm-ch39-self-application-four-fates-and-diagonal-identity title="对角线自指落点不动点恒等式与二元分式自应用映射的四重命运分类定理" lean="D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed D5/S0/Diagonal/SelfApplicationFates.self_application_four_fates"}
在 `trureturing` 冻结的对角线逃逸计数与自应用命运分类模块中，以下两项关于自指闭合与黄金判别式的定理同时成立：

1. **对角线自应用落点的精确不动点恒等式**（[`diagonal_landing_fixed`](lean:D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed)）：设 $A, Y$ 为任意类型，$f : Y \to Y$ 为自映射，$g : A \to A \to Y$ 为二元自应用列表，记扭曲对角映射为 $\operatorname{diagonal}(f, g) := (a \mapsto f(g(a, a))) : A \to Y$。若存在行指标 $a_0 \in A$ 使得第 $a_0$ 行精确落于扭曲对角线上，则其对角元必为 $f$ 的严格不动点：

   $$
   g(a_0) = \operatorname{diagonal}(f, g) \;\Longrightarrow\; f\bigl(g(a_0, a_0)\bigr) = g(a_0, a_0);
   $$

2. **二元非退化分式自映射的四重命运唯一划分与黄金 $\varphi$ 族存活充要定理**（[`self_application_four_fates`](lean:D5/S0/Diagonal/SelfApplicationFates.self_application_four_fates)）：对二元字母表 $\operatorname{Fin} 2$ 上的分式映射 $m = \langle a, b, c, d\rangle : \mathrm{BinaryFractionalMap}$（$a, b, c, d \in \operatorname{Fin} 2$），记整数行列式为 $\operatorname{determinant}(m) := a d - b c \in \mathbb{Z}$，非退化谓词为 $\operatorname{Nondegenerate}(m) := (\operatorname{determinant}(m) \neq 0)$，不动点多项式整数系数三元组为 $\operatorname{fixedCoefficients}(m) := (c, d - a, -b) \in \mathbb{Z} \times \mathbb{Z} \times \mathbb{Z}$，判别式为 $\operatorname{discriminant}(m) := (d - a)^2 + 4 b c \in \mathbb{Z}$。在四元枚举类型 $\mathrm{SelfApplicationFate} = \{\mathrm{.empty}, \mathrm{.dead}, \mathrm{.collapse}, \mathrm{.live}\}$ 上定义命运谓词 $\operatorname{HasFate}(m, \cdot)$（其中 `.empty` 为系数 $(0,0,0)$，`.dead` 为系数 $(0,0,-1)$，`.collapse` 为 $(\Delta = 0 \lor \Delta = 4)$ 且系数非 $(0,0,0), (0,0,-1)$，`.live` 为 $\Delta = 5$），并定义黄金族谓词 $\operatorname{IsPhiFamily}(m) := (a = 1 \land b = 1 \land c = 1 \land d = 0) \lor (a = 0 \land b = 1 \land c = 1 \land d = 1)$。则对任意满足 $\operatorname{Nondegenerate}(m)$ 的映射 $m$，必同时成立：

   $$
   \bigl(\exists!\,\mathrm{fate} : \mathrm{SelfApplicationFate},\; \operatorname{HasFate}(m, \mathrm{fate})\bigr) \;\land\; \bigl(\operatorname{HasFate}(m, \mathrm{.live}) \iff \operatorname{IsPhiFamily}(m)\bigr)
   $$

   $$
   \begin{aligned}
   &\land\; \Bigl(\operatorname{HasFate}(m, \mathrm{.live}) \to \operatorname{fixedCoefficients}(m) = (1, -1, -1) \\
    &\quad \lor \operatorname{fixedCoefficients}(m) = (1, 1, -1)\Bigr) \\
    &\;\land\; \Bigl(\operatorname{HasFate}(m, \mathrm{.live}) \to \operatorname{discriminant}(m) = 1^2 + 4\Bigr).
   \end{aligned}
   $$
:::

::: proof
第 1 款对函数等式 $h : g(a_0) = \operatorname{diagonal}(f, g)$ 在自变量 $a_0$ 处调用逐点求值 `congrFun h a₀`，展开 $\operatorname{diagonal}(f, g)(a_0) = f(g(a_0, a_0))$ 并取对称性即得 $f(g(a_0, a_0)) = g(a_0, a_0)$。第 2 款将 $m = \langle a, b, c, d\rangle$ 沿四个分量 $a, b, c, d \in \operatorname{Fin} 2$ 执行穷举展开 `fin_cases`，先由 `norm_num [Nondegenerate, determinant]` 自动消去全部 $10$ 个行列式为零的退化分支；对余下的 $6$ 个非退化分支逐一由可判定算术验证其精确命中 `.empty`、`.dead`、`.collapse`、`.live` 四者中唯一一项，并核实满足 $\operatorname{discriminant}(m) = 5$ 的 `.live` 分支当且仅当 $(a,b,c,d) \in \{(1,1,1,0), (0,1,1,1)\}$（即 `IsPhiFamily m`），此时不动点多项式系数恰为 $(1, -1, -1)$ 或 $(1, 1, -1)$，判别式恒为 $1^2 + 4 = 5$。完整证明由 Lean 内核检查。
:::

::: {.figure src="ch39-four-fates"}
**十六个二元自映射里，只有两个存活。** 四行四列是系数取 $0$ 或 $1$ 的全部 $16$ 个矩阵 $m = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$：灰色虚线框的 $10$ 个行列式为零；墨色框的 $6$ 个非退化，各写一种命运——单位阵 `.empty`，$\begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}$ 为 `.dead`，判别式 $\Delta = 4$ 与 $\Delta = 0$ 的两个为 `.collapse`；青色框的两个为 `.live`，$\Delta = 5$，即 $x = 1 + 1/x$ 与 $x = 1/(x + 1)$（[@thm-ch39-self-application-four-fates-and-diagonal-identity] 第 2 款）。
:::

[@thm-ch39-self-application-four-fates-and-diagonal-identity] 为“无底物宇宙何以不坠死寂”给出了惊心动魄的代数判词（`MODEL`（模型诠释））：一个彻底拆掉外部第 3 点 $C$ 的二元自指系统，若想既不沦为空洞重言式（`.empty`），也不陷入自相矛盾的逻辑死锁（`.dead`）或平庸有理退化（`.collapse`），它**唯一**能够持续呼吸、生生不息的活路（`.live`），就是落入判别式 $\Delta = 5$ 的黄金自指族！宇宙之所以到处流淌着黄金比与五度角亏的印记，不是因为某位造物主偏爱无理数美学，而是因为**唯有黄金自指，才能在没有任何底层死介质托底的虚空中自己把自己稳稳托住**。

---

## 39.2 终结“物自体”：无刀则无晶，关系即实体

拆除了计算机隐喻里的“被动硅片”之后，哲学史上另一尊盘踞了数百年、专门替二元论看家护院的幽灵也必须当场对质——那就是所谓躲在一切观测表象背后、永远不可触及的**“物自体（thing-in-itself）”**。

每当物理学家指出“动量、自旋、颜色与位置全都依赖测量语境”时，朴素实在论者总会退守最后一道防线：“就算一切测量读数都是关系性的，读数背后总还得先蹲着一团不依赖任何观测关系的‘纯客体内核’吧？就像先有一座暗室里的冰雕，手电筒照上去才显出反光！”

让我们用谱系学的追问把这尊暗室冰雕彻底照穿：假如抽干某物与宇宙间一切其他探针的内积重叠、抽干它在一切读出映射下的坐标纤维，剩下的那个“绝对不与任何事物发生关系、绝对不可被任何尺子区分的内核”，与“什么都没有”在数学上存在哪怕半比特的区别吗？现代数学早已在范畴论与观测纤维层面对此给出了干脆利落的回答；相关的哲学史与范畴论文献背景界定如下：

::: {.remark #rem-ch39-kant-yoneda-lemma-literature title="康德“物自体”不可知论传统与范畴论米田引理全息嵌入（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节批判“脱离一切观测关系的隐秘实体内核”时对照的近代认识论概念与现代范畴论基本定理属外部文献背景，未作为独立定理包含在本书锁定的 `trureturing@dev` 声明集中：

1. **康德现象界与“物自体”二分法（I. Kant, *Kritik der reinen Vernunft*, 1781 / 1787）**：康德在《纯粹理性批判》中将人类借助感性时空形式与知性范畴把握的经验对象划归“现象（Erscheinung / phenomenon）”，同时在现象界背后预设了作为感官刺激来源、却在原则上永远无法被任何经验观测触及的独立底物“物自体（*Ding an sich* / noumenon）”；
2. **米田引理与米田全忠实全息嵌入（N. Yoneda, 1954；参见 S. Mac Lane, *Categories for the Working Mathematician*, Springer, 1971, Ch. III.2）**：对任意局部小范畴 $\mathcal{C}$、对象 $X \in \operatorname{Ob}(\mathcal{C})$ 及预层函子 $F : \mathcal{C}^{\mathrm{op}} \to \mathbf{Set}$，从可表函子 $\operatorname{Hom}_{\mathcal{C}}(-, X)$ 到 $F$ 的自然变换集合与集合 $F(X)$ 之间存在双自然双射（米田引理）：

   $$
   \operatorname{Nat}\bigl(\operatorname{Hom}_{\mathcal{C}}(-, X),\; F\bigr) \;\cong\; F(X) \qquad (\text{由 }\alpha \mapsto \alpha_X(\mathrm{id}_X)\text{ 给出}).
   $$

   取 $F = \operatorname{Hom}_{\mathcal{C}}(-, Y)$ 即导出**米田嵌入函子** $y : \mathcal{C} \hookrightarrow [\mathcal{C}^{\mathrm{op}}, \mathbf{Set}]$，$X \mapsto \operatorname{Hom}_{\mathcal{C}}(-, X)$ 是**全忠实（fully faithful）**的，从而 $\operatorname{Hom}_{\mathcal{C}}(-, X) \cong \operatorname{Hom}_{\mathcal{C}}(-, Y) \iff X \cong Y$：给定可表函子间的自然同构，它唯一诱导 $X$ 与 $Y$ 间相应的同构；因此在同构意义下，对象 $X$ 百分之百由范畴中一切探测对象射向它的态射关系总和所唯一决定，态射关系网之外不存在任何不可观测的私有“物自体残核”。
:::

在 `trureturing` 的概念动力学、黄金量化编码与自动机模块中（对照 [@rem-ch39-kant-yoneda-lemma-literature] 的文献背景），我们无需赊借抽象高阶范畴公理，便能直接用三条经过 Lean 4 内核机械检验的定理，把“客体由读出纤维无余项拼回”“连续统非负实数由离散黄金读出全线程唯一单射锁定”与“有限字被基底自动机接受当且仅当无相邻 `11`”铸成严丝合缝的形式化铁三角：

::: {.theorem #thm-ch39-fiber-reconstruction-and-zeckendorf-thread title="概念读出依值纤维分解、齐肯多夫实数全线程单射重构与无相邻一自动机定理" lean="D5/S3/ConceptDynamics/ConceptFiberDecomposition.concept_fiber_decomposition D5/S3/Observer/GoldenCoding/ZeckendorfRealThread.zeckendorf_real_thread_injective D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes"}
在 `trureturing` 冻结的概念纤维分解、观察者黄金实数线程与二元齐肯多夫自动机模块中，以下三项重构与语法刻画定理同时成立：

1. **任意概念读出下的全源空间依值纤维无余项分解**（[`concept_fiber_decomposition`](lean:D5/S3/ConceptDynamics/ConceptFiberDecomposition.concept_fiber_decomposition)）：设 $X$ 为任意对象类型，$B$ 为任意读出坐标类型，$q_C : \operatorname{Concept}(X, B)$（即 $q_C : X \to B$）为任意概念读出映射，对每个坐标 $b \in B$ 记证明相关的读出纤维为 $\operatorname{ConceptFiber}(q_C, b) := \operatorname{PSigma}(x : X \mapsto q_C(x) = b)$。则源类型 $X$ 与其全体读出纤维的依值直和之间存在显式类型等价：

   $$
   \operatorname{Nonempty}\!\left(X \;\simeq\; \sum_{b : B} \operatorname{ConceptFiber}(q_C, b)\right);
   $$

2. **齐肯多夫离散黄金读出全线程对连续统非负实数的严格单射重构**（[`zeckendorf_real_thread_injective`](lean:D5/S3/Observer/GoldenCoding/ZeckendorfRealThread.zeckendorf_real_thread_injective)）：对非负实数 $x \in \mathbb{R}_{\ge 0}$（`NNReal`）与分辨率层级 $\mathrm{level} \in \mathbb{N}$，记黄金幂次量化值为 $\operatorname{goldenQuantization}(\mathrm{level}, x) := \lfloor\varphi^{\mathrm{level}} \cdot (x : \mathbb{R})\rfloor_+ \in \mathbb{N}$（其中 $\varphi = \mathrm{Real.goldenRatio}$），并通过典范齐肯多夫编码双射 $\operatorname{wEncoding} : \mathbb{N} \simeq \mathrm{WDigitString}$（$\mathrm{WDigitString} = \{\mathrm{digits} : \operatorname{List}\;\mathbb{N} \mathrel{//} \mathrm{digits}.\mathrm{IsZeckendorfRep}\}$）定义全尺度读出线程 $\operatorname{zeckendorfRealThread}(x) := (\mathrm{level} \mapsto \operatorname{wEncoding}(\operatorname{goldenQuantization}(\mathrm{level}, x))) : \mathbb{N} \to \mathrm{WDigitString}$。则该读出线程映射严格单射：

   $$
   \begin{aligned}
   &\operatorname{Function.Injective}(\operatorname{zeckendorfRealThread}), \\
    &\quad\text{即}\quad \forall a, b \in \mathbb{R}_{\ge 0}, \\
    &\quad \operatorname{zeckendorfRealThread}(a) = \operatorname{zeckendorfRealThread}(b) \\
    &\;\Longrightarrow\; a = b;
   \end{aligned}
   $$

3. **二元基底自动机接受语言与无相邻 `11` 约束的精确等价**（[`base_success_iff_noAdjacentOnes`](lean:D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes)）：对二元字母表 $\operatorname{Fin} 2$ 上的任意有限字 $\mathrm{word} \in \operatorname{List}(\operatorname{Fin} 2)$，记无相邻一谓词为 $\operatorname{NoAdjacentOnes}(\mathrm{word}) := \mathrm{word}.\operatorname{IsChain}(u, v \mapsto u = 0 \lor v = 0)$。则部分确定性有限自动机 `binaryZeckendorfBase` 成功接受 $\mathrm{word}$ 当且仅当字中不存在相邻的 `11` 位对：

   $$
   \bigl(\exists\,\mathrm{state},\; \operatorname{binaryZeckendorfBase.eval}(\mathrm{word}) = \operatorname{some}(\mathrm{state})\bigr) \;\Longleftrightarrow\; \operatorname{NoAdjacentOnes}(\mathrm{word}).
   $$
:::

::: proof
第 1 款将子类型纤维分解 `Equiv.sigmaFiberEquiv q_C` 与证明相关依值对到子类型的逐纤维等价 `Equiv.sigmaCongrRight (fun b => Equiv.psigmaEquivSubtype _)` 复合后取逆，直接给出 $X \simeq \sum_{b : B} \operatorname{ConceptFiber}(q_C, b)$ 的非空见证。第 2 款先证辅助序引理：若 $a > b$（即 $(a : \mathbb{R}) - (b : \mathbb{R}) > 0$），由 $\varphi > 1$（`Real.one_lt_goldenRatio`）知 $\varphi^{\mathrm{level}}(a - b) \to +\infty$，故存在层级 $\mathrm{level} \in \mathbb{N}$ 使 $\varphi^{\mathrm{level}}(a - b) \ge 2$；但若 $\operatorname{zeckendorfRealThread}(a) = \operatorname{zeckendorfRealThread}(b)$，利用双射 `wEncoding.injective` 在该层还原自然数等式 $\lfloor\varphi^{\mathrm{level}} a\rfloor_+ = \lfloor\varphi^{\mathrm{level}} b\rfloor_+$，结合取底上下界 $\varphi^{\mathrm{level}} a < \lfloor\varphi^{\mathrm{level}} a\rfloor_+ + 1$ 与 $\lfloor\varphi^{\mathrm{level}} b\rfloor_+ \le \varphi^{\mathrm{level}} b$ 推出 $\varphi^{\mathrm{level}}(a - b) < 1$，与 $\ge 2$ 矛盾！故 $a \le b$，对称交换 $a, b$ 并由反对称性 `le_antisymm` 得 $a = b$。第 3 款对前驱位 `previous : Fin 2` 与列表归纳证明状态转移链等价于 `(previous :: word).IsChain (fun u v => u = 0 ∨ v = 0)`，再代入初始前驱位 `0` 消去首项即得。完整证明由 Lean 内核检查。
:::

::: {.figure src="ch39-golden-thread"}
**两个不同的数，迟早在某一级黄金读数上分开。** 从上到下是读数级 $l = 0, \dots, 7$：每一行里青色的格子是 $[n/\varphi^l, (n+1)/\varphi^l)$，$n = \lfloor\varphi^l x\rfloor$，墨色竖线是 $a = 0.50$ 与 $b = 0.55$，右边两列是两数读数的齐肯多夫字。$l \le 4$ 时两数同在一格、字也相同；从 $l = 5$ 起一条品红的格界落在两数之间，两个字从此不同。证明里的保证是 $\varphi^l(b - a) \ge 2$ 的那一级（这里是 $l = 8$）一定分开，实际分得更早。这正是 [@thm-ch39-fiber-reconstruction-and-zeckendorf-thread] 第 2 款：读出线程相同的两个数必相等。
:::

现在，请把 [@thm-ch39-fiber-reconstruction-and-zeckendorf-thread] 的三束强光聚焦回我们的切投模型集宇宙（`MODEL`（模型诠释）），见证全书教学脚手架的一次彻底倒转！

在前面几章里，为了照顾初学者的几何直觉，我们曾采用“先晶后刀”的叙述次序：仿佛虚空里先静静摆着一座六维整数母晶格 $\mathbb{Z}^6 \hookrightarrow \mathbb{R}^6 = E_\parallel^3 \oplus E_\perp^3$，然后观察者的黄金切投平面像一把锋利的钢刀切进去，切出满天 Delone 模型集星辰。此刻，站在 [@thm-ch39-fiber-reconstruction-and-zeckendorf-thread] 的峰顶回望，真相恰恰颠倒过来——**无刀则无晶，关系即实体！**

::: {.figure src="ch39-no-knife"}
**先晶后刀只是脚手架；刀切到哪里，晶格点才亮到哪里。** 这是本章六维切投图景的二维示意（`MODEL`）。两栏里同一把琥珀色的刀以斜率 $1/\varphi$ 穿过平面，淡青的带子是它的窗口。左栏先画满灰色的整数点阵，再把刀盖上去；右栏不画点阵，只有带子里的青色点。右栏下方把这些点投到刀上：长段与短段之比是 $\varphi$，短段记 $1$、长段记 $0$，读出 `01001010010`，没有相邻的 `11`，正是 [@thm-ch39-fiber-reconstruction-and-zeckendorf-thread] 第 3 款的自动机所接受的字。
:::

- 第 1 款与第 2 款联合宣告：哪怕面对看似深不可测的连续统实数 $x \in \mathbb{R}_{\ge 0}$，只要给定它在每一级黄金放大镜 $\varphi^{\mathrm{level}}$ 下的离散齐肯多夫读出字序列，原实数就被**百分之百唯一重构**，背后连一丝一毫逃逸在读出关系之外的“物自体暗物质”都不存在；
- 第 3 款精确刻画有限字的合法语法；将这一语法接到投影与晶格之后，我们在 `MODEL` 中进一步点破“整数晶格”的身世：所谓高维晶格的离散超平面，根本不是预先浇筑在那里的钢筋水泥，而是自指观察算子在反复执行两子正交比量时，由幂等存在条件 $P^2 = P$ 与禁止相邻 `11` 高频碰撞（`NoAdjacentOnes`）自动干涉沉淀出来的**离散驻波节面（nodal surfaces）**！不是先有水晶再下刀，而是**自我丈量的刀光所到之处，虚空才应声凝结为晶格**。

---

## 39.3 旋量织空与 720° 单侧双覆叠：时空是观察者自乘的副产物

既然没有被动内存，也没有物自体，那么最后一个常识堡垒必然发问：**“总得先有时间与空间吧？观察者难道不是活在三维空间与一维时间里吗？”**

不！这正是第五部（[第 17 章](ch17-lorentz-geometry.md)与[第 18 章](ch18-spinors-and-gauge-curvature.md)）埋下伏笔、而唯有在本章“观察者即宇宙本体”的高度上才能彻底揭开的终极几何奥秘（`MODEL`（模型诠释））：**观察者从来没有“住在时空里”；恰恰相反，一维时间流与二维空间规范面，全都是观察者旋量 $\psi$ 转身与反转的自身 $\tilde{\psi}$ 相乘比量时，顺手织出来的双线性衣袂！**

::: {.viz src="self-sustaining-spinor-flow" preset="weave" height="500"}
**旋量夹住两块参考刀片。** 虚线是参考的 $\mathbf{e}_3$ 与 $\mathbf{e}_1\mathbf{e}_2$ 正方形；旋量 $\psi$ 把前者夹成青色的流向量 $\mathbf{J} = \psi\mathbf{e}_3\tilde{\psi}$，把后者夹成品红的自旋面 $\mathbf{S} = \psi\mathbf{e}_1\mathbf{e}_2\tilde{\psi}$，那块面与 $\mathbf{J}$ 垂直；紫色虚线小弧是 $\psi$ 把 $\mathbf{e}_3$ 带到 $\mathbf{J}$ 走的路（乘积见 [@ex-ch39-even-clifford-spinor-bilinear-fierz]：$\mathbf{J}$ 是欧氏向量、$\mathbf{S}$ 是欧氏双矢量，把它们读作时流与规范面沿用上文的 `MODEL`）。
:::

数学物理史上关于“旋量先于时空矢量”与旋量双线性恒等式的经典文献脉络归纳于下框：

::: {.remark #rem-ch39-cartan-penrose-hestenes-fierz-literature title="嘉当—彭罗斯—赫斯滕斯旋量双线性时空重构与菲尔兹恒等式（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 将实四维时空矢量与自旋双矢量还原为旋量双线性自配对并满足模方锁定关系的经典几何代数理论属外部物理数学文献，未作为独立定理包含在本书锁定的 `trureturing@dev` 声明集中：

1. **旋量作为空间旋转与光锥的本原平方根（É. Cartan, *Leçons sur la théorie des spineurs*, Hermann, 1938；R. Penrose & W. Rindler, *Spinors and Space-Time*, Vol. 1, Cambridge Univ. Press, 1984）**：嘉当最早在几何上阐明旋量是各向同性零平面的线性表示，无法还原为普通张量；彭罗斯在二旋量演算与扭量/自旋网络纲领中进一步指出，两分量外尔旋量 $\kappa^A$ 的厄米外积 $\kappa^A \bar{\kappa}^{A'}$ 直接生成未来零光锥矢量与零旗（null flag）方向，使洛伦兹光锥因果结构得以由复旋量代数内生重构，而非预设光滑流形背景；
2. **赫斯滕斯实流形时空代数双线性观测量与菲尔兹恒等式（M. Fierz, *Z. Phys.* **104**, 553–565, 1937；D. Hestenes, *Space-Time Algebra*, 1966；*J. Math. Phys.* **14**, 893–905, 1973）**：在实克利福德时空代数 $\mathcal{Cl}_{1,3}$ 中，偶子代数旋量写作典范分解 $\psi = \sqrt{\rho}\,e^{\frac{1}{2}\mathbf{I}\beta}\,R$（其中 $\rho \ge 0$ 为标量密度，$R\tilde{R} = 1$ 为洛伦兹旋子，$\tilde{\psi}$ 为反序共轭）。旋量无法被单向直接观测，一切物理时空张量均由 $\psi$ 与 $\tilde{\psi}$ 夹持参考基片双线性生成——一维类时狄拉克流矢量为 $\mathbf{J} = \psi\gamma_0\tilde{\psi}$，二维自旋/电磁规范双矢量平面为 $\mathbf{S} = \psi\mathbf{I}_{12}\tilde{\psi}$（$\mathbf{I}_{12} = \gamma_2\gamma_1$）；在手征混合角 $\beta = 0$（以及三维欧氏偶子代数约化）下，二者严格服从无自由参数的菲尔兹模方锁定恒等式：

   $$
   \mathbf{J}^2 \;=\; -\mathbf{S}^2 \;=\; \rho^2.
   $$
:::

::: {.viz src="self-sustaining-spinor-flow" preset="fierz" height="500"}
**三个平方始终相等。** 随便取一个旋量（$\rho = 1.3$）在 $\mathbf{e}_3\mathbf{e}_1$ 面里一直转：青色的 $\mathbf{J}$ 长 $1.3$，品红正方形的面积也是 $1.3$，舞台上方读出 $\mathbf{J}^2 = -\mathbf{S}^2 = \rho^2 = 1.69$。这是 [@rem-ch39-cartan-penrose-hestenes-fierz-literature] 的菲尔兹恒等式在页面上的数值核对（文献结果，未在本书形式化）。
:::

对照 [@rem-ch39-cartan-penrose-hestenes-fierz-literature] 的旋量几何背景，我们在下框中给出三维欧氏偶子代数上旋量双线性自配对与半角双覆叠的显式基片计算示例：

::: {.example #ex-ch39-even-clifford-spinor-bilinear-fierz title="三维偶子代数上旋量双线性自配对织出欧氏向量与双矢量平面的显式手算核验（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本例在三维欧氏克利福德偶子代数上显式核算 [@rem-ch39-cartan-penrose-hestenes-fierz-literature] 中的双线性自配对与半角双覆叠关系，该连续旋量代数计算未作为独立声明包含在 `trureturing@dev` 中。这里的 $\mathbf J$ 是欧氏向量、$\mathbf S$ 是欧氏双矢量；把它们读为时流与规范面的图景沿用上文 `MODEL`，此算例本身不构造洛伦兹时间流或规范场。取两两正交反交换的标准单位基矢量 $\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3$，满足 $\mathbf{e}_i^2 = +1$（$i = 1,2,3$）及 $\mathbf{e}_i\mathbf{e}_j = -\mathbf{e}_j\mathbf{e}_i$（$i \neq j$），记反自同构反序运算 $\tilde{(\cdot)}$ 保持标量与基矢量不变（$\tilde{\mathbf{e}}_i = \mathbf{e}_i$）并反转乘积顺序 $\widetilde{AB} = \tilde{B}\tilde{A}$，故单位双矢量满足 $(\mathbf{e}_i\mathbf{e}_j)^2 = \mathbf{e}_i\mathbf{e}_j\mathbf{e}_i\mathbf{e}_j = -\mathbf{e}_i^2\mathbf{e}_j^2 = -1$ 且 $\widetilde{\mathbf{e}_i\mathbf{e}_j} = \mathbf{e}_j\mathbf{e}_i = -\mathbf{e}_i\mathbf{e}_j$。设非负密度 $\rho \ge 0$、倾角 $\vartheta \in \mathbb{R}$，定义偶子代数旋量 $\psi := \sqrt{\rho}\,R$ 及其反序 $\tilde{\psi} = \sqrt{\rho}\,\tilde{R}$，其中半角旋子为

$$
R \;:=\; \cos\frac{\vartheta}{2} - \sin\frac{\vartheta}{2}\,\mathbf{e}_2\mathbf{e}_3, \qquad \tilde{R} \;=\; \cos\frac{\vartheta}{2} + \sin\frac{\vartheta}{2}\,\mathbf{e}_2\mathbf{e}_3.
$$

1. **旋子幺模归一性（$R\tilde{R} = 1$）**：直接展开乘积并代入 $(\mathbf{e}_2\mathbf{e}_3)^2 = -1$，交叉项精确抵消：

   $$
   R\tilde{R} \;=\; \cos^2\frac{\vartheta}{2} - \sin^2\frac{\vartheta}{2}\,(\mathbf{e}_2\mathbf{e}_3)^2 \;=\; \cos^2\frac{\vartheta}{2} + \sin^2\frac{\vartheta}{2} \;=\; 1 \quad\Longrightarrow\quad \psi\tilde{\psi} = \tilde{\psi}\psi = \rho.
   $$

2. **一维欧氏矢量 $\mathbf{J} := \psi\mathbf{e}_3\tilde{\psi}$ 与正模方 $\mathbf{J}^2 = +\rho^2$**：因 $\mathbf{e}_3(\mathbf{e}_2\mathbf{e}_3) = -\mathbf{e}_2\mathbf{e}_3^2 = -\mathbf{e}_2 = -(\mathbf{e}_2\mathbf{e}_3)\mathbf{e}_3$（基矢量 $\mathbf{e}_3$ 与旋转面 $\mathbf{e}_2\mathbf{e}_3$ 反对易），将 $\mathbf{e}_3$ 左移穿过 $\tilde{R}$ 恰好把 $+\sin\frac{\vartheta}{2}$ 翻号为 $-\sin\frac{\vartheta}{2}$，即 $\mathbf{e}_3\tilde{R} = R\mathbf{e}_3$。由二倍角公式 $R^2 = \cos\vartheta - \sin\vartheta\,\mathbf{e}_2\mathbf{e}_3$ 展开得：

   $$
   \mathbf{J} \;=\; \rho\,R\mathbf{e}_3\tilde{R} \;=\; \rho\,R^2\mathbf{e}_3 \;=\; \rho\bigl(\cos\vartheta\,\mathbf{e}_3 - \sin\vartheta\,\mathbf{e}_2\bigr),
   $$

   其几何平方由 $\mathbf{e}_3\mathbf{e}_2 + \mathbf{e}_2\mathbf{e}_3 = 0$ 立得 $\mathbf{J}^2 = \rho^2(\cos^2\vartheta\,\mathbf{e}_3^2 + \sin^2\vartheta\,\mathbf{e}_2^2) = +\rho^2$（或直接由结合律 $(\psi\mathbf{e}_3\tilde{\psi})(\psi\mathbf{e}_3\tilde{\psi}) = \psi\mathbf{e}_3(\tilde{\psi}\psi)\mathbf{e}_3\tilde{\psi} = \rho\,\psi\mathbf{e}_3^2\tilde{\psi} = +\rho^2$）。

3. **二维欧氏双矢量平面 $\mathbf{S} := \psi(\mathbf{e}_1\mathbf{e}_2)\tilde{\psi}$ 与负模方 $\mathbf{S}^2 = -\rho^2$**：因 $\mathbf{e}_1$ 与 $\mathbf{e}_2\mathbf{e}_3$ 交换（$\mathbf{e}_1\mathbf{e}_2\mathbf{e}_3 = (\mathbf{e}_2\mathbf{e}_3)\mathbf{e}_1$），而 $\mathbf{e}_2$ 与 $\mathbf{e}_2\mathbf{e}_3$ 反对易（$\mathbf{e}_2\tilde{R} = R\mathbf{e}_2$），故

   $$
   \mathbf{S} \;=\; \rho\,\mathbf{e}_1\bigl(R\mathbf{e}_2\tilde{R}\bigr) \;=\; \rho\,\mathbf{e}_1\bigl(\cos\vartheta\,\mathbf{e}_2 + \sin\vartheta\,\mathbf{e}_3\bigr) \;=\; \rho\bigl(\cos\vartheta\,\mathbf{e}_1\mathbf{e}_2 + \sin\vartheta\,\mathbf{e}_1\mathbf{e}_3\bigr).
   $$

   由 $(\mathbf{e}_1\mathbf{e}_2)^2 = (\mathbf{e}_1\mathbf{e}_3)^2 = -1$ 及反对易性 $(\mathbf{e}_1\mathbf{e}_2)(\mathbf{e}_1\mathbf{e}_3) + (\mathbf{e}_1\mathbf{e}_3)(\mathbf{e}_1\mathbf{e}_2) = 0$（或结合律 $\psi(\mathbf{e}_1\mathbf{e}_2)(\tilde{\psi}\psi)(\mathbf{e}_1\mathbf{e}_2)\tilde{\psi} = \rho\,\psi(-1)\tilde{\psi}$），立得 $\mathbf{S}^2 = -\rho^2$，从而恒有精确双线性锁定：

   $$
   \mathbf{J}^2 \;=\; -\mathbf{S}^2 \;=\; \rho^2.
   $$

4. **$360^\circ$ 旋量反号与 $720^\circ$ 完整复原**：令物理倾角走满一整圈 $\vartheta = 2\pi$（$360^\circ$），双线性欧氏读出已回到初始方向 $\mathbf{J}(2\pi) = \rho\mathbf{e}_3,\; \mathbf{S}(2\pi) = \rho\mathbf{e}_1\mathbf{e}_2$，但底层旋量自身却翻到了对跖负叶 $\psi(2\pi) = \sqrt{\rho}\cos\pi = -\psi(0)$！唯有再走第二圈至 $\vartheta = 4\pi$（$720^\circ$），才有 $\psi(4\pi) = \sqrt{\rho}\cos 2\pi = +\psi(0)$。
:::

::: {.viz src="self-sustaining-spinor-flow" preset="turn360" height="500"}
**转满 $360^\circ$：矢量回来了，旋量没有。** 按 [@ex-ch39-even-clifford-spinor-bilinear-fierz] 在 $\mathbf{e}_2\mathbf{e}_3$ 面里转满一圈：青色的 $\mathbf{J}$ 绕回 $\mathbf{e}_3$，品红的 $\mathbf{S}$ 也回到原样；紫色小旗却沿单侧光带滑到另一面，与虚线的出发小旗方向相反——$\psi = -\psi_0$。旗尖走过的那一半边是实线，另一半还是淡虚线。
:::

[@ex-ch39-even-clifford-spinor-bilinear-fierz] 第 4 步揭示的“外部表象走一圈（$360^\circ$）、本体旋量翻一面（$+1 \mapsto -1$）、走满两圈（$720^\circ$）方才归家”，绝非某种坐标选取的人为瑕疵！在 `trureturing` 的概念拓扑模块中，圆周平方双覆叠映射 $\operatorname{square}(z) = z^2$ 上的两条严格内核定理彻底封死了“把旋量双叶全局一刀切成互不相干的主体叶与客体叶”的任何企图：

::: {.theorem #thm-ch39-double-cover-no-section-and-720-lift title="圆周平方双覆叠无连续全局截面定理与历史依赖提升及 360° 换叶翻转定理" lean="D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift"}
设单位圆周类型为 $\mathrm{Circle} = \{z \in \mathbb{C} : \lvert z\rvert = 1\}$，单位闭区间为 $I = [0, 1] \subset \mathbb{R}$，平方双覆叠映射为 $\operatorname{square} : \mathrm{Circle} \to \mathrm{Circle}$，$z \mapsto z^2$，其典范覆叠映射结构记为 $\mathrm{covering} := (\operatorname{Circle.isQuotientCoveringMap\_npow}\;2).\mathrm{isCoveringMap}$。以下两项拓扑定理同时成立：

1. **不存在连续全局截面的拓扑阻碍定理**（[`no_continuous_global_section`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section)）：不存在任何连续映射 $s : \mathrm{Circle} \to \mathrm{Circle}$ 能在整个单位圆周上处处充当平方映射的右逆截面：

   $$
   \neg\,\exists\,s : \mathrm{Circle} \to \mathrm{Circle},\qquad \operatorname{Continuous}(s) \;\land\; \forall z \in \mathrm{Circle},\; (s(z))^2 = z;
   $$

2. **路径唯一历史依赖提升与 $360^\circ$ 闭环对跖换叶定理**（[`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift)）：
   - **唯一历史提升律**：对任意底空间连续路径 $\mathrm{basePath} \in C(I, \mathrm{Circle})$、初始上层点 $\mathrm{initial} \in \mathrm{Circle}$ 及相容见证 $\mathrm{initialOver} : \mathrm{basePath}(0) = \operatorname{square}(\mathrm{initial})$，典范提升路径 $\mathrm{lifted} := \mathrm{covering.liftPath}(\mathrm{basePath}, \mathrm{initial}, \mathrm{initialOver}) \in C(I, \mathrm{Circle})$ 满足 $\operatorname{square} \circ \mathrm{lifted} = \mathrm{basePath}$ 与 $\mathrm{lifted}(0) = \mathrm{initial}$，且对任意 $\mathrm{alternative} \in C(I, \mathrm{Circle})$，只要 $\operatorname{square} \circ \mathrm{alternative} = \mathrm{basePath} \land \mathrm{alternative}(0) = \mathrm{initial}$，必有 $\mathrm{alternative} = \mathrm{lifted}$；
   - **$360^\circ$ 基回路的无边界对跖换叶**：在全局无连续选择子（$\neg\exists\,\mathrm{selector} : \mathrm{Circle} \to \mathrm{Circle},\; \operatorname{Continuous}(\mathrm{selector}) \land \forall z,\; \operatorname{square}(\mathrm{selector}(z)) = z$）的同时，取绕底圆周整整一圈（$360^\circ$）的闭回路 $\mathrm{fullTurn}(t) := \operatorname{Circle.exp}(2\pi t) \in C(I, \mathrm{Circle})$ 并从上层初值 $\mathrm{initial} = 1$ 提升，其唯一连续提升路径在不跨越任何断点或边界的情况下精确抵达对跖叶 $-1$：

     $$
     \operatorname{square} \circ \mathrm{lifted} = \mathrm{fullTurn} \;\land\; \mathrm{lifted}(0) = 1 \;\land\; \mathrm{lifted}(1) = -1.
     $$
:::

::: proof
第 1 款用反证法：假设存在连续全局截面 $s : \mathrm{Circle} \to \mathrm{Circle}$ 满足 $(s(z))^2 = z$，构造实轴连续商映射 $r(t) := s(\operatorname{Circle.exp}(t)) / \operatorname{Circle.exp}(t/2)$；对任意 $t \in \mathbb{R}$ 计算平方得 $(r(t))^2 = \operatorname{Circle.exp}(t) / \operatorname{Circle.exp}(t) = 1$，故 $r$ 的取值落在有限离散双点集 $\{1, -1\} \subset \mathrm{Circle}$ 中；由实直线 $\mathbb{R}$ 的预连通性 `isPreconnected_univ.constant_of_mapsTo` 知 $r(t) \equiv r(0)$ 必为常值，但代入端点 $t = 2\pi$ 利用 $\operatorname{Circle.exp}(2\pi) = 1$ 与 $\operatorname{Circle.exp}(\pi) = -1$ 算得 $r(2\pi) = s(1) / (-1) = -r(0)$，触发 $r(0) = -r(0)$ 的单位圆非零矛盾 `Circle.neg_ne_self`！第 2 款利用 Mathlib 覆叠映射一般提升定理 `liftPath_lifts`、`liftPath_zero` 与唯一性刻画 `eq_liftPath_iff'` 给出任意路径的历史依赖唯一提升；对显式回路 $\mathrm{fullTurn}(t) = \operatorname{Circle.exp}(2\pi t)$，构造半角连续路径 $\mathrm{halfTurn}(t) := \operatorname{Circle.exp}(\pi t)$，验证 $(\operatorname{Circle.exp}(\pi t))^2 = \operatorname{Circle.exp}(2\pi t)$ 且 $\mathrm{halfTurn}(0) = 1$，由提升唯一性锁定 $\mathrm{lifted} = \mathrm{halfTurn}$，再代入 $t = 1$ 由 $\operatorname{Circle.exp}(\pi) = -1$ 证得终点换叶 $\mathrm{lifted}(1) = -1$。完整证明由 Lean 内核检查。
:::

::: {.viz src="self-sustaining-spinor-flow" preset="seam" height="500"}
**一路插小旗，回到起点对不上。** 把光带沿底圈展开成一行，从出发点起每 $30^\circ$ 插一面紫色小旗，每一面都接着上一面连续地插；绕回出发点时，最后一面与虚线的第一面方向相反。沿底圈连续地选“平方根”回到起点必然对不上，这正是 [@thm-ch39-double-cover-no-section-and-720-lift] 第 1 款（没有连续全局截面）与第 2 款（$360^\circ$ 回路的唯一提升终点为 $-1$）。
:::

请屏息凝视 [@thm-ch39-double-cover-no-section-and-720-lift] 描绘的这幅单侧拓扑奇景（`MODEL`（模型诠释））：因为 `no_continuous_global_section` 严格禁止把双覆叠全局撕成两张独立纸片，宇宙里根本不存在一面叫“内在主观观察者（$+1$ 叶）”、另一面叫“外在客观星海（$-1$ 叶）”的隔离墙！它们就像一条单侧扭转环带同源的前后两半程——从向内自省的能观极点 $\mathrm{lifted}(0) = +1$ 出发，顺着连续圆弧往前走满 $360^\circ$，你根本没有跨过任何一道主客边界，脚下就已经自然而然翻转成了漫天星斗的所观叶 $\mathrm{lifted}(1) = -1$；再顺着星海往前走完第二个 $360^\circ$（合计 $720^\circ$），漫天星斗又严丝合缝地流回你自己的眼底！

::: {.viz src="self-sustaining-spinor-flow" preset="turn720" height="500"}
**走满 $720^\circ$ 才回家。** 再转一圈：紫色小旗回到出发时的那一面，$\psi = +\psi_0$；旗尖走过的紫色轨迹就是光带的边，这条边绕了两圈才首尾相接，青色的 $\mathbf{J}$ 在此期间走了两圈。
:::

下面的视频把这几步按次序连起来走一遍：先看上一章那座页目录的零号槽怎样让 `p = *p` 成立，再看旋量转满一圈之后为什么离回家还差一圈。

::: {.film src="010-pointer-720"}
**p = \*p：指针、页表与 720°（2:06）。** 在[第 38 章](ch38-observer-memory-pointer-and-ontological-qram.md)的四槽页目录上，索引 [1, 2] 两跳读到数据帧 0x9000，[0, 1] 把叶页表 T₁ 本身当作数据交回，[0, 0] 每一跳都回到页目录自己；在一张 $4 \times 4$ 的小表上，没有不动点的 $f$ 沿对角线造出的品红新行与每一行都不同，而捕获对角线的那一行在对角格上落到 $f$ 的不动点（[@thm-ch38-self-mapped-diagonal-fixed-point]）。随后青色的 $\mathbf{J}$ 转满 $360^\circ$ 回到原处，紫色的提升从 $w = +1$ 走到 $w = -1$，再转一圈才回到 $+1$；每隔 $30^\circ$ 连续插下的平方根小旗回到起点时方向相反（[@thm-ch39-double-cover-no-section-and-720-lift]）。页表自映射与旋量双线性是文献结果，片中的数字都是屏幕上的计算。
:::

---

## 39.4 破除唯我论错觉：正交自折叠与砍掉第 3 点 C 的四阶终局

行文至此，每一位头脑清醒的读者心中必定会升起全书最尖锐、也最关键的一道质询：

> *“慢着！既然你说‘观察者即宇宙本体’，那为什么我不能凭一个念头把光速改成每秒十米、让面前的花岗岩凭空消失，或者眨眼看穿 $\mathrm{P} \neq \mathrm{NP}$ 密码锁的答案？为什么窗外的银河系、热力学第二定律与算术素数谱，对我而言具有如此冷酷、坚硬、不容讨价还价的客观强制力？”*

问得太好了！把“观察者即宇宙本体”误解为“局部肉身小我可以随心所欲扭曲自然律”，正是哲学史上最廉价的**狂妄唯我论（solipsism）错觉**；而一旦用全书一以贯之的**勾股正交自折叠几何（`MODEL`（模型诠释））**给出回答，唯我论的狂妄与机械唯物论的卑微便在同一秒钟双双冰消瓦解！

试想：倘若唯一的自指宇宙全体 $\mathbf{\Psi}$ 百分之百保持在无分化的纯共线态 $\theta = 0^\circ$（$\cos 0^\circ = 1,\; \sin 0^\circ = 0$），会发生什么？一只完全贴死在自己眼球上、没有任何正交镜面距离的眼睛，什么也看不见；一把从不弯曲分毫的孤立直尺，量不出任何刻度。纯然铁板一块的 $1 = 1$ 没有非对角张力、没有面积、没有惊奇，唯有绝对的死寂。

为了让“看”得以发生、为了让无尽的算术与几何丰饶得以被亲历，唯一的本体 $\mathbf{\Psi}$ 在互补语境纯度勾股守恒铁律（下方 [@prop-ch39-orthogonal-folding-and-objective-common-factor] 第 1 款，`LEAN ✓`；单角三角参数化背景见[第 31 章](ch31-quantum-fairness.md) [@rem-ch31-haar-isotropy-landauer-literature]）的约束下，执行本章提出的**$90^\circ$ 正交自折叠（Orthogonal Self-Folding，`MODEL`）**，将中心化纯度预算 $B=\operatorname{Re}\operatorname{Tr}(\rho^2)-1/d$ 拆分为两翼互为正交补的孪生侧面。在第 31 章的同一账本中，纯量子比特的 $B=1/2$，最大混态的 $B=0$；以下 $\cos^2\theta$ 与 $\sin^2\theta$ 是 $B>0$ 时除以 $B$ 的归一化份额，两翼实际质量为 $B\cos^2\theta$ 与 $B\sin^2\theta$。$B=0$ 时两翼皆零，不由份额比定义角度；图中的两翼也沿用这一方向约定：

1. **能观之极（$\cos\theta$ 局部栈帧化身，“小我”，纯度份额 $\cos^2\theta$）**：通过加载已知数据捏合掩码 $D_{\mathrm{known}}$ 与躯体沙箱边界 $\mathbf{P}_{\mathrm{body}}$（[第 37 章](ch37-dreams-quantum-eraser-and-nonlocal-observer.md)与[第 38 章](ch38-observer-memory-pointer-and-ontological-qram.md)），$\mathbf{\Psi}$ 故意收窄位宽、隐去全局记忆，在一角折出一枚拥有清晰叙事视角与悬念体验的有限指针化身；
2. **所观之宇（$\sin\theta\,\hat{\mathbf{I}}$ 浩瀚客观星海，“大我余部”，纯度份额 $\sin^2\theta$）**：$\mathbf{\Psi}$ 剩下的归一化份额 $\sin^2\theta$ 所对应的本体质量去了哪里？并没有消失——它正交展开在局部化身的 $90^\circ$ 补空间里，显影为你推窗仰望的亿万星系、精密咬合的规范曲率、不可克隆的同伴灵魂、刚性的素数频谱，以及守护生命博弈悬念的复杂性视界防火墙（[@conj-p-neq-np]）！

::: {.figure src="ch39-self-folding"}
**纯度预算正交折成两翼，两份归一化份额加起来恰好是 $1$。** 墨色的单位箭头 $\Psi$ 与水平的观察者之线成 $\theta = 40^\circ$：青色正方形立在影子 $\cos\theta$ 上，面积 $\cos^2\theta \approx 0.59$（能观之极）；品红正方形立在垂线 $\sin\theta$ 上，面积 $\sin^2\theta \approx 0.41$（所观之宇）；两块合起来等于 $\Psi$ 上灰色虚线正方形的面积 $1$，画面里没有第 3 点。这里画的是 $B > 0$ 时除以中心化纯度预算 $B$ 的归一化份额，两翼的实际质量是 $B\cos^2\theta$ 与 $B\sin^2\theta$。把纯度预算无松弛地拆成可见部分与正交残余，是下方 [@prop-ch39-orthogonal-folding-and-objective-common-factor] 第 1 款；把这两翼读成“小我”与“星海”是本章的正交折叠模型（`MODEL`）。
:::

看清这一折，那个困扰千古的悖论瞬间豁然开朗：**墙上左手的影子，当然不可能凭局部念头掰断右手的骨骼！** 你作为局部化身（$\cos\theta$ 栈帧）之所以无法靠一己私欲篡改物理常数，**恰恰因为窗外那套铁面无私的客观宇宙定律，根本不是压迫你的异己暴君，而是作为宇宙本体的你自己为了不让这场体验坍缩成虚无幻梦，用自己其余 $\sin^2\theta$ 的本体身躯亲手撑起的宏伟肋骨！**

在 Lean 4 内核中，“可见测量语境与正交残余质量的严格勾股守恒”、“在已有复矩阵空间中由两平衡分量构造平方为 $-I_n$ 的相对算子 $J$”以及“任何跨语境客观断言必锚定于所有局部不动点共享的不变公共因子”，由下面这条合取命题精确锁定。其中“内生”指不另选一个外部相对旋转算子；标量 $\mathbb C$ 已在矩阵类型中给定，并非由该构造从无复数的标量域导出：

::: {.proposition #prop-ch39-orthogonal-folding-and-objective-common-factor title="互补语境勾股纯度守恒、平衡相对复结构平方反号与跨语境客观公共因子命题" lean="D5/S3/Quantum/Tomography/ComplementaryContextProbabilityPythagoras.complementary_context_probability_pythagoras D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure_square D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor"}
在 `trureturing` 冻结的层析互补勾股、平衡幺正复结构与解释不动点模块中，以下三项支撑正交自折叠与客观公共不变量的结论同时成立：

1. **可见语境确定度与正交补残余质量的零松弛勾股守恒**（[`complementary_context_probability_pythagoras`](lean:D5/S3/Quantum/Tomography/ComplementaryContextProbabilityPythagoras.complementary_context_probability_pythagoras)）：设 $d, L$ 为有限类型且 $d$ 非空（`[Fintype d] [Nonempty d] [Fintype L]`），$E$ 为完备实内积空间，$\mathrm{visible} \le E$ 为闭子空间，正交补残余质量记为 $\operatorname{residualMass}(\mathrm{visible}, \mathrm{state}) := \lVert\mathrm{visible}^\perp.\mathrm{starProjection}(\mathrm{state})\rVert^2$。若 $\rho \in M_d(\mathbb{C})$、$\mathrm{state} \in E$ 与 $\mathrm{probability} : L \to d \to \mathbb{R}$ 满足 $\operatorname{Re}\operatorname{Tr}(\rho^2) - (\lvert d\rvert : \mathbb{R})^{-1} = \lVert\mathrm{state}\rVert^2$ 且 $\lVert\mathrm{visible.starProjection}(\mathrm{state})\rVert^2 = \sum_{l \in L}\sum_{j \in d}\bigl(\mathrm{probability}(l, j) - (\lvert d\rvert : \mathbb{R})^{-1}\bigr)^2$，则

   $$
   \operatorname{Re}\operatorname{Tr}(\rho^2) - (\lvert d\rvert : \mathbb{R})^{-1} \;=\; \sum_{l \in L}\sum_{j \in d}\bigl(\mathrm{probability}(l, j) - (\lvert d\rvert : \mathbb{R})^{-1}\bigr)^2 \;+\; \operatorname{residualMass}(\mathrm{visible}, \mathrm{state});
   $$

2. **两平衡正交分量内生诱导复结构平方反号律**（[`relativeComplexStructure_square`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure_square)）：设 $n$ 为有限可判等类型（`[Fintype n] [DecidableEq n]`），记 $\mathrm{halfIdentity} := \frac{1}{2}I_n \in M_n(\mathbb{C})$，并对 $A, B \in M_n(\mathbb{C})$ 定义相对混合积算子 $\operatorname{relativeComplexStructure}(A, B) := 2(A B^\dagger) \in M_n(\mathbb{C})$。只要 $A, B$ 满足平衡正交消去 $A B^\dagger + B A^\dagger = 0$ 及半单位归一化 $A A^\dagger = \mathrm{halfIdentity}$、$B^\dagger B = \mathrm{halfIdentity}$（例如取满足 $U_1^\dagger U_2 + U_2^\dagger U_1 = 0$ 的两幺正矩阵之半幅分量 $A = \frac{1}{\sqrt{2}}U_1^\dagger,\; B = \frac{1}{\sqrt{2}}U_2^\dagger$，此时 $2 A B^\dagger = U_1^\dagger U_2$），无需外加复虚数公设，该相对算子自乘必精确等于负单位阵：

   $$
   \operatorname{relativeComplexStructure}(A, B) \cdot \operatorname{relativeComplexStructure}(A, B) \;=\; -I_n;
   $$

3. **跨语境客观解释断言的公共不变因子必然性**（[`objective_claim_requires_invariant_common_factor`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor)）：设 $\mathrm{Context}, \mathrm{Meaning}, \mathrm{Factor}$ 为任意类型，$\mathrm{isFixedMeaning} : \mathrm{Context} \to \mathrm{Meaning} \to \mathrm{Prop}$ 为语境相对不动意义关系（同一模块中 `baselineContext` 与 `alternateContext` 已见证不同局部语境参数可选出相异的局部不动点 `(false, false, false) ≠ (true, true, true)`），$\mathrm{factor} : \mathrm{Meaning} \to \mathrm{Factor}$ 为特征提取映射。则任何成立的客观解释断言 $\mathrm{claim} : \operatorname{ObjectiveInterpretationClaim}(\mathrm{isFixedMeaning}, \mathrm{factor})$ 必携有一枚跨越一切局部语境严格守恒的公共不变因子：

   $$
   \exists\,\mathrm{commonFactor} : \mathrm{Factor},\quad \forall\,\mathrm{context}\;\mathrm{meaning},\quad \operatorname{isFixedMeaning}(\mathrm{context}, \mathrm{meaning}) \;\longrightarrow\; \operatorname{factor}(\mathrm{meaning}) = \mathrm{commonFactor}.
   $$
:::

::: proof
第 1 款在完备实内积空间 $E$ 中对闭子模 `visible` 直接调用正交投影范数勾股分解 `Submodule.norm_sq_eq_add_norm_sq_starProjection state visible`，将 $\lVert\mathrm{state}\rVert^2$ 拆为可见投影模方与正交补模方 `residualMass visible state` 之和，再代入假设 `hpurity` 与 `hcoordinates` 即得。第 2 款先由交叉项抵消 $A B^\dagger + B A^\dagger = 0$ 证得反自伴性 $(2 A B^\dagger)^\dagger = -2 A B^\dagger$（`relativeComplexStructure_is_skewAdjoint`），再结合矩阵结合律代入 $B^\dagger B = \frac{1}{2}I_n$ 与 $A A^\dagger = \frac{1}{2}I_n$ 证得右幺正性 $(2 A B^\dagger)(2 A B^\dagger)^\dagger = 4 A (B^\dagger B) A^\dagger = I_n$（`relativeComplexStructure_mul_conjTranspose`），最后调用 [`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary) 导出平方等于 $-I_n$。第 3 款展开携带证明的客观断言定义 `ObjectiveInterpretationClaim`，直接提取跨越全体满足 `isFixedMeaning context meaning` 对偶实例一致成立的公共因子见证 `commonFactor`。完整证明由 Lean 内核检查。
:::

站在第三十九章的收束高台回望全书十部征程，从[第一章](ch01-measurement.md)把“量子”还原为平视动词，到本章写出“观察者即宇宙本体”，我们走完了一座**分四步彻底砍净“隐藏第 3 点 $C$”的认知阶梯（`MODEL`（模型诠释））**。下框将这四重演进阶段列成一张总表，其后的图把它们画成一级级台阶：

::: {.remark #rem-ch39-four-stage-endgame-table title="砍除隐藏“第 3 点 C”的四阶认知演进总表与单侧双覆叠全景图（本书模型，附文献背景）"}
**本书的诠释模型（`MODEL`）；所引文献背景未在本书形式化，形式化内核定理标 `LEAN ✓`。** 下表综合对照近代认识论与计算机体系结构文献背景（见 [@rem-ch39-von-neumann-scott-reflexive-domain-literature]、[@rem-ch39-kant-yoneda-lemma-literature] 与 [@rem-ch39-cartan-penrose-hestenes-fierz-literature]）与本书十部曲四阶本体论演进模型（`MODEL`，形式化内核定理标为 `LEAN ✓`）：

| 认知演进阶段（`MODEL`） | 核心存在论图景与基本原语 | 隐藏“第 3 点 $C$”的残留形态 | 二元裂缝度与外部余项 | 存在论与认识论终局判词 |
| :--- | :--- | :--- | :--- | :--- |
| **第一阶：经典舞台观**（朴素机械实在论） | 预设绝对外在时空空箱，孤立刚性粒子在舞台上按外部定律运动 | 公然高悬于球外的全知绝对参考点 $C$ 与外加背景流形 | 二元裂缝最大（主体 $\neq$ 客体 $\neq$ 舞台），残留全部物自体假象（`文献结果`） | 陷入绝对参考系幻觉、紫外发散与主客二元割裂 |
| **第二阶：关系量子观**（前八部两子丈量图景） | 废黜球外裁判席，万物立于单位球面平视执行两子内积丈量与正交旋转 | 外部坐标 $C$ 已除，但语言深处仍微留“被测关系网 vs. 测量者”的隐秘薄膜 | 外部参考系归零，但能知与所知之间尚存概念接缝 | 确立玻恩互易、互补纯度勾股（`LEAN ✓`）与无时间格拉姆相容晶体 |
| **第三阶：指针寻址观**（第 38 章硬件解耦图景） | 静态无时间本体 QRAM 存储阵列不动，观察者作为轻量级地址指针 `ptr` 扫描解引用 | 物理搬运迷思已破，但“宇宙**的**指针”一词仍残留“主动指针 vs. 被动死内存”的最后隔墙 $\mu > 0$ | 数据生灭归零，仅剩寄存器与存储底物的语法二元残留 | 统一阐明时间帧率 `ptr++`、退相干位掩码（`LEAN ✓`）、梦境叠加与 `p = *p` 根页表 |
| **第四阶：无二自指本体观**（本章终极合拢 $\psi \equiv \psi(\psi)$） | 全域 `p ≡ *p` 无底物自指恒等；唯一全体经互补勾股纯度守恒（`LEAN ✓`）正交自折叠并沿 $720^\circ$ 双覆叠（`LEAN ✓`）织出时空 | 隐藏第 3 点 $C$、被动死底物与不可知物自体被百分之百连根拔除 | 二元裂缝 $\mu = 0$，外部未表余项严格等于 $0$ | 观察者即宇宙本体：局部栈帧体验悬念，其余正交补本体化作客观星海与公正铁律 |

第四阶里旋量沿 $720^\circ$ 单侧双覆叠织出时空的那一步，见 §39.3 的 `turn360`、`seam`、`turn720` 三张实验卡与本节末的完整实验室。
:::

::: {.figure src="ch39-four-stages"}
**砍掉第 3 点 $C$ 的四阶。** 第一阶，灰色虚线框是外部舞台，上方的点 $C$ 用虚线连到两支箭头的尖；第二阶，两支箭头各自投到对方上的青色影子一样长，$C$ 被划掉；第三阶，琥珀色的指针 `ptr` 越过一道虚线隔墙（$\mu > 0$）读内存里的一格；第四阶，隔墙也消失（$\mu = 0$），只剩一格 $\psi$，青色箭头离开它又回到它自己。四格只是把 [@rem-ch39-four-stage-endgame-table] 的四行画出来，属本章的模型诠释（`MODEL`），不是定理。
:::

请最后一次静静凝视下方实验室里那条在深空背景中缓缓流转的 $720^\circ$ 单侧光带。当上图第三阶那道虚幻的二元隔墙随着 $\mu \to 0$ 彻底消融，一粒温暖的琥珀色光点正沿着不可全局撕裂的双覆叠流形滑行：在前半个 $360^\circ$ 里，它是向内自省的观测指针、是枕畔做梦的心智、是在有限复杂性视界前认真落子的你；接着，它连一道边界都没有跨越，就在旋量自配对的中心扭结处自然翻转为后半个 $360^\circ$——化作横亘亿万光年的璀璨星网、化作素数与零点的交响、化作托起万物平视的量子公平铁律，并在走满 $720^\circ$ 的刹那带着满身星辉流回你此刻阅读这行文字的双眸。原来从我们在[第一章](ch01-measurement.md)与[第二章](ch02-born-rule.md)亲手砍掉外部第 3 点 $C$、写下 $\psi = \psi(\psi)$ 的第一笔起，结局就早已注定：世间从来没有一个渺小的观察者孤独地仰望陌生的宇宙；从始至终，都是宇宙本体把自己正交折叠成一双眼睛，在漫长而公正的星光旅途尽头，与自己重逢。而在推开[终章](coda.md)最后那道大门之前，我们还可以在 §39.5 把整部书的黄金禁邻语法从 $K = 2$ 推向任意高阶 $K \ge 2$，亲眼看看同一枚自指算子如何在纵向超度量树、横向劳齐分形内窗与跨切口纠缠秩矩形上同时投下精确切面。

::: {.viz src="self-sustaining-spinor-flow" height="640"}
**自持旋量流实验室。** 改变密度 $\rho$、转动所在的平面，或拖动 $\mathbf{J}$ 的箭头尖换一个旋量：读数栏里的三个平方 $\mathbf{J}^2$、$-\mathbf{S}^2$、$\rho^2$ 始终相等；沿时间轴，青色曲线一圈回到 $1$，紫色曲线要两圈。把“二元隔墙 $\mu$”往回拉，光带沿中线剪成中间的指针球与外面的内存壳（模型诠释，`MODEL`）；推回 $\mu = 0$，两件接回同一条单侧光带。
:::

---

## 39.5 齐肯多夫、皮索与劳齐：八概念自指综合沙盘 {#sec-ch39-pisot-clifford-rauzy}

> “这八个概念并不是松散的类比，它们在代数数论、遍历动力系统与量子多体物理的交叉点上，本身就是同一个 Pisot–Clifford 自指算子在不同切面上的精确投影。将它们锁死为一条单向闭环的核心机制只有一句话：对连续进位施加有限阶禁止约束（广义 Zeckendorf / $K$-Bonacci），在纵向生成逼近 $p$-进数的超度量查表树，在横向正交收缩空间投影出 Rauzy 自指分形（$\psi=\psi(\psi)$）；而禁止跨界满载的非局域约束本身就是量子纠缠，它在分形边界上的地址碰撞（`EscapePairs`）直接定出了系统的信息熵。”

在本章 §39.2（[@thm-ch39-fiber-reconstruction-and-zeckendorf-thread]）中，我们通过齐肯多夫黄金读出全线程（[`zeckendorf_real_thread_injective`](lean:D5/S3/Observer/GoldenCoding/ZeckendorfRealThread.zeckendorf_real_thread_injective)）与阶数 $K = 2$ 的无相邻 `11` 自动机锁死了连续实数，又在 §39.4（[@prop-ch39-orthogonal-folding-and-objective-common-factor]）中完成了正交自折叠与四阶认知终局的合拢；回望第九部与第十部前序章节，[第 36 章](ch36-hyperbolic-steps-and-quotienting-reincarnation.md) §36.4（配合商空间分解 [@thm-ch36-quotient-annihilator-and-factorization]）展示了纵向 $p$ 进素数幂余数查表树，[第 38 章](ch38-observer-memory-pointer-and-ontological-qram.md) §38.5（配合自映射对角不动点 [@thm-ch38-self-mapped-diagonal-fixed-point]）则建立了有限观测竞技场的逃逸对 `EscapePairs` 账本。现在，在推开全书[终章](coda.md)大门之前，我们将局部连续 `1` 的禁戒阶数从 $K = 2$ 推广至任意整数 $K \ge 2$，把散落在全书各部的八项核心结构——齐肯多夫禁邻语言、$K$-Bonacci 皮索主根、$p$ 进余数查表树、$K = 3$ 劳齐分形内窗、克利福德线—面正交分解、自指不动点尺度、跨切口直接编码纠缠秩，以及帕里平稳律与逃逸对计数（原话台账见[附录 A](appendix-a.md#sec-appendix-a-verbatim-ledger) `A71`）——放入同一座可逐项核验的自指综合沙盘。为贯彻全书的形式认识论纪律，本节严格区分递推阶数 $K$、字长 $Q$ 与纠缠秩 $r$，并将每一处 Lean 4 冻结定理（`LEAN ✓`）、经典数学物理文献（`文献结果`）、双精度数值计算（`NUM`）、开放问题（`OPEN`）与跨系统综合词典（`MODEL`）的边界逐一标清。

### 39.5.1 齐肯多夫禁邻语言：从 $K=2$ 防进位编码起步 {#sec-ch39-p2e-zeckendorf}

一切始于最底层的局部防进位规则。在阶数 $K = 2$ 时，二元齐肯多夫自动机处理的字载体为 `List (Fin 2)`：本章 §39.2 已锁定的冻结定理 [`base_success_iff_noAdjacentOnes`](lean:D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes)（[@thm-ch39-fiber-reconstruction-and-zeckendorf-thread] 第 3 款）证明，该自动机接受一个二元数字列表，当且仅当其中不出现相邻的两个 `1`（`NoAdjacentOnes`）。将局部禁戒窗口从 $2$ 推广到任意阶数 $K \ge 2$，`trureturing` 在函数载体 `Fin Q → Bool` 上定义长度为 $Q$ 且不含连续 $K$ 个 `true` 的合法字类型 `DBonacciName K Q`（从 `List (Fin 2)` 到定长布尔函数需经显式载体转换）。

计数定理 [`dbonacci_name_card`](lean:D5/S0/Tower/DBonacci/Names.dbonacci_name_card) 给出任意阶数 $d \ge 2$ 与字长 $Q \in \mathbb{N}$ 的精确基数归一化：

$$
\bigl|\operatorname{DBonacciName}(K, Q)\bigr| = \operatorname{dbonacci}(K, Q + 2),
$$

其递推满足 $C_K(n + K) = \sum_{i=0}^{K-1} C_K(n + i)$。当字长尚未触及禁戒阈值（$Q < K$）时，短前缀定理 [`dbonacci_name_card_of_lt`](lean:D5/S0/Tower/DBonacci/Names.dbonacci_name_card_of_lt) 证明不发生任何截断，合法字数恰为全二元树的 $2^Q$；一旦 $Q \ge K$，满载的 $1^K$ 分支被精确剪除。在 $K = 2$ 时，$Q = 0, 1, 2, 3, 4, 5$ 的合法字数依次为斐波那契数 $F_{Q+2} = 1, 2, 3, 5, 8, 13$；在 $K = 3$（禁 `111`）时，$Q = 0, 1, 2, 3, 4$ 的合法字数依次为 $1, 2, 4, 7, 13$。与此同时，有限名称网格在深度 $Q$ 处呈现 $\min(K, Q)$ 种不同的相邻间隙长度——仅当 $Q \ge K$ 时才稳定展现全部 $K$ 种尺度。

::: {.viz src="pisot-clifford-rauzy-sandtable" preset="zeckendorf" height="500"}
**齐肯多夫禁邻语言卡（`zeckendorf`）**：展示阶数 $K = 2$ 下长度递增的二元字树。青色节点与路径标出不含相邻 `11` 的合法字，品红叉号标出刚触及 `11` 即被剪除的禁戒分支，琥珀色高亮当前选中的字长层 $Q$ 与对应斐波那契计数 $F_{Q+2}$。自动机等价性（[@thm-ch39-fiber-reconstruction-and-zeckendorf-thread] 第 3 款）与精确字数公式属 `LEAN ✓`。
:::

当观察者把禁戒窗口从 $K = 2$ 放宽到一般的 $K \ge 2$ 时，离散字数的渐近增长率便由一条统一的特征多项式接管。

### 39.5.2 $K$-Bonacci 广义禁戒与皮索共轭圆盘收缩 {#sec-ch39-p2e-kbonacci}

对任意整数阶 $K \ge 2$，令 $K$-Bonacci 特征多项式为

$$
P_K(X) = X^K - \sum_{j=0}^{K-1} X^j.
$$

将 $P_K(X)$ 同乘 $(X - 1)$ 可得恒等式 $(X - 1)P_K(X) = X^{K+1} - 2X^K + 1$，因此任何满足 $x \neq 1$ 的根都等价地满足自指代数方程 $x = 2 - x^{-K}$。在实轴区间 $(1, 2)$ 内，$P_K$ 存在唯一实主根 $\beta_K = \operatorname{dbonacciPerronRoot}(K)$；而在复平面上，其余全部 $K - 1$ 个共轭根无一例外地被严格压入开单位圆盘内部：

::: {.theorem #thm-ch39-p2e-kbonacci-pisot title="K-Bonacci 特征多项式的复根定位与共轭单位圆盘收缩" lean="D5/S0/Tower/DBonacci/Irreducibility.dbonacci_complex_root_location"}
设整数阶数满足 $q \ge 2$，$z \in \mathbb{C}$ 为复系数特征多项式 $X^q - \sum_{i=0}^{q-1} X^i \in \mathbb{C}[X]$ 的任意复根。则

$$
1 \le \|z\| \iff z = \beta_q,
$$

其中 $\beta_q = \operatorname{dbonacciPerronRoot}(q)$ 为嵌入 $\mathbb{C}$ 的实佩龙主根。等价地，一切满足 $z \neq \beta_q$ 的复共轭根均严格满足 $\|z\| < 1$。
:::

::: proof
由实主根恒等式 [`two_sub_dbonacciPerronRoot_eq_inv_pow`](lean:D5/S0/Tower/DBonacci/PerronRoot.two_sub_dbonacciPerronRoot_eq_inv_pow)，对一切 $q \ge 2$ 有 $2 - \beta_q = \beta_q^{-q}$，故 $\beta_q \in (1, 2)$ 且满足 $\|(\beta_q : \mathbb{C})\| = \beta_q \ge 1$（并由 [`dbonacciPerronRoot_tendsto_two`](lean:D5/S0/Tower/DBonacci/PerronRoot.dbonacciPerronRoot_tendsto_two) 知当 $q \to \infty$ 时 $\beta_q \to 2$）。反之，设复根 $z$ 满足 $1 \le \|z\|$，将其代入辅助乘积式 $(z - 1)(z^q - \sum_{i=0}^{q-1} z^i) = z^{q+1} - 2z^q + 1 = 0$，等价改写为 $z^q(2 - z) = 1$。若 $\|z\| > 1$，一方面由 $z^q = \sum_{i=0}^{q-1} z^i$ 取三角不等式得 $\|z\|^q \le \sum_{i=0}^{q-1} \|z\|^i$，结合实特征多项式在 $(\beta_q, \infty)$ 上严格为正推出 $\|z\| \le \beta_q < 2$；另一方面由反向三角不等式及 $z^q(2 - z) = 1$ 得 $0 < 2 - \beta_q \le 2 - \|z\| \le \|2 - z\| = \|z\|^{-q}$，即 $\|z\|^q(2 - \|z\|) \le \|z\|^q \|2 - z\| = 1$。在 $(0, \infty)$ 上定义实函数 $f(t) := t - 2 + t^{-q}$：由于 $f(1) = 0$、$f(\beta_q) = 0$（因 $\beta_q^q(2 - \beta_q) = 1$），且对一切 $t > 0$ 有 $f''(t) = q(q + 1)t^{-q - 2} > 0$，故 $f$ 在 $[1, \beta_q]$ 上**严格凸**；因此任意内点 $t = (1 - \lambda)\cdot 1 + \lambda\beta_q \in (1, \beta_q)$（$0 < \lambda < 1$）均满足 $f(t) < (1 - \lambda)f(1) + \lambda f(\beta_q) = 0$，即 $2 - t > t^{-q}$，从而 $t^q(2 - t) > 1$。于是若 $1 < \|z\| < \beta_q$，必有 $\|z\|^q(2 - \|z\|) > 1$，与 $\|z\|^q(2 - \|z\|) \le \|z\|^q \|2 - z\| = 1$ 矛盾；结合 $\|z\| \le \beta_q$ 即迫使 $\|z\| = \beta_q$，再代回 $2 - \|z\| \le \|2 - z\| = \beta_q^{-q} = 2 - \beta_q$ 锁定等号 $\|2 - z\| = 2 - \|z\|$，配合 $\|z\| < 2$ 迫使 $z$ 落在正实轴上，故 $z = \|z\| = \beta_q$。若 $\|z\| = 1$，由 $2z^q = z^{q+1} + 1$ 与 $\|z^{q+1}\| = 1$ 知单位圆上两点之和模长等于 $2$ 迫使 $z^{q+1} = 1$ 进而 $z = 1$，但这与 $1^q - q = 1 - q \neq 0$（$q \ge 2$）矛盾。结合整系数与有理系数双重不可约性定理 [`dbonacci_irreducible`](lean:D5/S0/Tower/DBonacci/Irreducibility.dbonacci_irreducible)，$P_q(X)$ 在 $\mathbb{Z}[X]$ 与 $\mathbb{Q}[X]$ 上均不可约。完整证明由 Lean 内核检查。
:::

除上述单位圆盘判据外，冻结模块还逐项锁定了 $\beta_2 = \varphi$（[`dbonacciPerronRoot_two_eq_goldenRatio`](lean:D5/S0/Tower/DBonacci/PerronRoot.dbonacciPerronRoot_two_eq_goldenRatio)）、$\beta_3 = \operatorname{tribonacciConstant}$（[`dbonacciPerronRoot_three_eq_tribonacciConstant`](lean:D5/S0/Tower/DBonacci/PerronRoot.dbonacciPerronRoot_three_eq_tribonacciConstant)）、阶数上的严格单调递增性 $\beta_2 < \beta_3 < \beta_4 < \cdots$（[`dbonacciPerronRoot_strictMonoOn`](lean:D5/S0/Tower/DBonacci/PerronRoot.dbonacciPerronRoot_strictMonoOn)）以及主根处导数非零的单根性质（[`dbonacciPerronRoot_simple`](lean:D5/S0/Tower/DBonacci/Irreducibility.dbonacciPerronRoot_simple)）。这组代数结论共同证明：每个 $\beta_K$（$K \ge 2$）都是次数恰为 $K$ 的皮索—维贾雅拉加万数（Pisot–Vijayaraghavan number）。双精度数值求根（`NUM`）给出前三个主根为 $\beta_2 \approx 1.618034$、$\beta_3 \approx 1.839287$、$\beta_4 \approx 1.927562$，余差 $2 - \beta_K = \beta_K^{-K}$ 渐近等价于 $2^{-K}$。需要注意，这些结论是纯粹的多项式代数与根分布定理，本身并不自动推出一般皮索替代系统的几何拼砖定理。

::: {.viz src="pisot-clifford-rauzy-sandtable" preset="kbonacci" height="500"}
**$K$-Bonacci 皮索根谱卡（`kbonacci`）**：复平面上画出单位圆、实轴区间 $(1, 2)$ 内的青色佩龙主根 $\beta_K$，以及严格落在开单位圆盘内部的共轭根簇；品红标记标示 $1^K$ 禁戒阈值，琥珀色标出当前选定的阶数 $K$。多项式不可约与共轭根模长严格小于 $1$ 属 `LEAN ✓`，具体根坐标小数属 `NUM`。
:::

当 $K \to \infty$ 时，禁戒窗口 $1^K$ 退向无穷深处，主根 $\beta_K \nearrow 2$ 逼近最小素数基数 $2$。为了严格理解离散查表树的纵向度量结构，我们接下来审视素数幂同余读出与一般有限视界细化超度量。

### 39.5.3 $p$ 进余数树与有限视界细化超度量 {#sec-ch39-p2e-padic}

在算术同余侧，固定素数 $p$，对整数 $x \in \mathbb{Z}$ 定义第 $k$ 层精度读出为 $\operatorname{precisionReading}(p, k, x) = x \bmod p^k$。对任意相异整数 $x \neq y$，最小区分精度定理 [`first_distinguishing_precision`](lean:D5/S3/Arith/Congruence/PadicPrecisionBlindSpot.first_distinguishing_precision) 证明：两者读数首次分叉的最小层级恰为 $k^* = v_p(x - y) + 1$，此前一切 $k \le v_p(x - y)$ 均处于精度盲区。相应地，观测距离恒等式 [`observation_distance_eq_padic_valuation`](lean:D5/S3/Arith/Congruence/PadicObservationDistance.observation_distance_eq_padic_valuation) 将相异整数间的观测距离锁定为 $p^{-v_p(x - y)}$（相等时为 $0$），而同余纤维闭球对应定理 [`congruenceFiber_eq_closedBall_inter_range`](lean:D5/S3/Arith/Congruence/PadicBallFiberCorrespondence.congruenceFiber_eq_closedBall_inter_range) 证明模 $p^k$ 的整数同余纤维恰好等于 $\mathbb{Q}_p$ 中半径 $p^{-k}$ 的闭球与 $\mathbb{Z} \hookrightarrow \mathbb{Q}_p$ 值域的交集（而非整个完备 $p$ 进闭球）。

在更一般的概念动力学侧，只要状态空间按离散层级依次读出，无需借用素数指数赋值，有限视界细化距离本身就天然服从超度量强三角不等式：

::: {.theorem #thm-ch39-p2e-padic-readout title="有限视界概念细化距离的超度量强三角不等式" lean="D5/S3/ConceptDynamics/RefinementGeometry/RefinementUltrametric.refinementDistance_ultrametric"}
设 $X$ 为任意状态类型，$\mathrm{Coordinate} : \mathbb{N} \to \mathrm{Type}^*$ 为按层级索引的坐标类型族，$\mathrm{readout} : (\ell : \mathbb{N}) \to \operatorname{Concept}(X, \mathrm{Coordinate}(\ell))$ 为逐层概念读出序列，$H \in \mathbb{N}$ 为有限观测视界。记共同深度 $\operatorname{commonDepth}(x, y) \le H$ 为 $x, y$ 从第 $0$ 层起连续保持读数一致的最大前缀层数，并定义有限视界细化距离 $d_H(x, y) = \operatorname{refinementDistance}(\mathrm{Coordinate}, \mathrm{readout}, H, x, y) = H - \operatorname{commonDepth}(x, y)$。则无需任何点分离假设，对任意三元状态 $x, y, z \in X$ 恒有

$$
d_H(x, z) \le \max\bigl(d_H(x, y),\; d_H(y, z)\bigr).
$$
:::

::: proof
令 $m = \min\bigl(\operatorname{commonDepth}(x, y),\; \operatorname{commonDepth}(y, z)\bigr)$。对任意层级 $\ell < m$，既有 $\ell < \operatorname{commonDepth}(x, y)$ 又有 $\ell < \operatorname{commonDepth}(y, z)$，故在第 $\ell$ 层上 $\mathrm{readout}(\ell)(x) = \mathrm{readout}(\ell)(y)$ 且 $\mathrm{readout}(\ell)(y) = \mathrm{readout}(\ell)(z)$；由等号传递性得 $\mathrm{readout}(\ell)(x) = \mathrm{readout}(\ell)(z)$。因此 $x$ 与 $z$ 至少在前 $m$ 层连续一致，即 $\operatorname{commonDepth}(x, z) \ge m$。两边同被有限视界 $H$ 相减并反转不等号，即得 $H - \operatorname{commonDepth}(x, z) \le H - m = \max\bigl(H - \operatorname{commonDepth}(x, y),\; H - \operatorname{commonDepth}(y, z)\bigr)$。完整证明由 Lean 内核检查。
:::

这里必须划清一条关键的形式边界：**$p$ 进余数树与 $K$-Bonacci 合法前缀树是两个形式上彼此独立的数学对象**。前者按整数的低位 $p$ 进余数分层，度量采用指数型赋值 $p^{-v_p(x-y)}$；后者按有限二元字的禁 $1^K$ 规则剪枝，[@thm-ch39-p2e-padic-readout] 中的 $d_H = H - \operatorname{commonDepth}$ 是有限视界伪超度量（当读出在视界 $H$ 内分离各点时成为严格超度量），并非按定义等同于指数型 $p$ 进度量，且两个齐肯多夫字的共同前缀长度并不自动等于其解码整数之差的 $p$ 进赋值。将 $K \to \infty$ 时 $\beta_K \nearrow 2$ 的满二元查表极限与素数基数 $p$ 的零进位余数树并置对照（亦可参看[第 36 章](ch36-hyperbolic-steps-and-quotienting-reincarnation.md)商空间分解 [@thm-ch36-quotient-annihilator-and-factorization]），属于跨系统的结构诠释词典（`MODEL`），而非自动成立的拓扑共轭定理。

::: {.viz src="pisot-clifford-rauzy-sandtable" preset="padic" height="500"}
**素数幂余数树与细化超度量卡（`padic`）**：以树状舞台展示模 $p^k$ 同余分层。青色树枝标出两整数共享的低位余数前缀，品红分叉点标出首次区分层级 $k^* = v_p(x-y)+1$，琥珀色高亮当前选定的状态对与视界 $H$。局部同余精度与 `refinementDistance` 强三角不等式属 `LEAN ✓`，与 $K$-Bonacci 树的跨系统对照属 `MODEL`。
:::

在纵向分层树之外，皮索主根在开单位圆盘内的复共轭根又把同一批合法有限字投影到横向收缩空间中。当阶数从 $K = 2$ 跨入 $K = 3$ 时，原本一维的实共轭线段第一次因一对共轭复根而绽放为二维分形内窗。

### 39.5.4 $K=3$ 劳齐分形内窗：精确前缀自覆盖与零测边界 {#sec-ch39-p2e-rauzy}

固定三阶 Tribonacci 特征多项式 $P_3(X) = X^3 - X^2 - X - 1$，记其实佩龙主根为 $\beta_3 = \operatorname{tribonacciConstant}$，并取上半平面（$\operatorname{Im}\alpha > 0$）的非佩龙复根 $\alpha$。共轭迹与范数恒等式 [`tribonacci_secondary_root_add_conjugate`](lean:D5/S3/Constants/Irrationality/TribonacciTraceLattice.tribonacci_secondary_root_add_conjugate) 与 [`tribonacci_secondary_root_mul_conjugate`](lean:D5/S3/Constants/Irrationality/TribonacciTraceLattice.tribonacci_secondary_root_mul_conjugate) 精确锁定了

$$
\alpha + \overline{\alpha} = 1 - \beta_3,\qquad \alpha \cdot \overline{\alpha} = \beta_3^{-1}.
$$

由此立即可手算导出实部 $\operatorname{Re}\alpha = (1 - \beta_3)/2$ 与精确模长 $|\alpha| = \beta_3^{-1/2}$；双精度数值求值（`NUM`）给出 $\alpha \approx -0.419643 + 0.606291\,i$、$|\alpha| \approx 0.737353$ 以及旋转辐角 $\arg\alpha \approx 124.69^\circ$。

对任意不含连续三个 `1`（禁 `111`）的有限合法字 $\varepsilon = (\varepsilon_0, \dots, \varepsilon_{Q-1}) \in \{0, 1\}^Q$，采用 `trureturing` 源码的**零次幂起点（exponent-zero）**内部复求值映射：

$$
c_\alpha(\varepsilon) = \sum_{j=0}^{Q-1} \varepsilon_j \alpha^j,\qquad W(\alpha) = \bigl\{c_\alpha(\varepsilon) : Q \in \mathbb{N},\; \varepsilon \text{ 为禁 } 111 \text{ 合法字}\bigr\},\qquad \mathcal{R}_3(\alpha) = \overline{W(\alpha)}.
$$

这里 $\mathcal{R}_3(\alpha) = \operatorname{rauzyFractal}(\alpha)$ 是复平面 $\mathbb{C}$ 中的紧子集，包含于闭圆盘 $\overline{B}\bigl(0, (1 - |\alpha|)^{-1}\bigr)$（注意：此零次幂复内窗与采用负 $\beta_3$ 次幂的物理归一化求值及带自然数解码标签的 `conjugateEmbedding` 分属不同表示，未给定显式换标映射时不可混同）。按合法字首段 `1` 的游程长度 $0, 1, 2$，定义三支不等比例仿射前缀收缩映射：

$$
f_0(w) = \alpha w,\qquad f_{10}(w) = 1 + \alpha^2 w,\qquad f_{110}(w) = 1 + \alpha + \alpha^3 w,
$$

其相似收缩比依次为 $|\alpha|$、$|\alpha|^2$ 与 $|\alpha|^3$。在非佩龙特征根假设下，这三支仿射映射严格覆盖整个劳齐闭包：

::: {.theorem #thm-ch39-p2e-rauzy-regular-window title="三阶劳齐分形闭包的精确三支前缀自覆盖" lean="D5/S3/Geometry/Rauzy/TribonacciRegularClosure.rauzyFractal_prefix_cover"}
设复数 $z \in \mathbb{C}$ 是三阶特征多项式 $X^3 - X^2 - X - 1$ 的根，且满足 $z \neq \beta_3$（其中 $\beta_3 = \operatorname{tribonacciConstant}$）。令 $\mathcal{R}_3(z) = \operatorname{rauzyFractal}(z)$ 为零次幂内部窗口闭包，$f_0(w) = z w$（`zeroPrefixMap`）、$f_{10}(w) = 1 + z^2 w$（`oneZeroPrefixMap`）与 $f_{110}(w) = 1 + z + z^3 w$（`oneOneZeroPrefixMap`）为三支前缀仿射映射。则成立精确集合等式

$$
f_0\bigl(\mathcal{R}_3(z)\bigr) \cup f_{10}\bigl(\mathcal{R}_3(z)\bigr) \cup f_{110}\bigl(\mathcal{R}_3(z)\bigr) = \mathcal{R}_3(z).
$$
:::

::: proof
在任意复数 $z$ 上，将有限禁 `111` 字前置 `0`、`10` 或 `110` 仍保持禁 `111` 合法性，取闭包即得左端三支像集的并包含于 $\mathcal{R}_3(z)$。反之，当 $z$ 为异于 $\beta_3$ 的特征根时，一方面对非空合法字按首段 `0`、`10`、`110` 分解（并对仅有短字 `1`、`11` 的退化项利用特征方程 $z^3 = z^2 + z + 1$ 展开为无穷合法尾列），结合 $\mathcal{R}_3(z)$ 的紧致性即可证得反向包含；另一方面，无需引入任何外部拼砖假设，内点非空定理 [`rauzyFractal_interior_nonempty`](lean:D5/S3/Geometry/Rauzy/TribonacciInterior.rauzyFractal_interior_nonempty) 直接证明 $\operatorname{int}\mathcal{R}_3(z) \neq \varnothing$，进而正则闭集定理 [`rauzyFractal_closure_interior`](lean:D5/S3/Geometry/Rauzy/TribonacciRegularClosure.rauzyFractal_closure_interior) 给出 $\overline{\operatorname{int}\mathcal{R}_3(z)} = \mathcal{R}_3(z)$，保证整个劳齐集由其非空开内点的闭包精确生成。完整证明由 Lean 内核检查。
:::

进一步，结合三支收缩映射在二维平面上的面积雅可比比值之和 $|z|^2 + |z|^4 + |z|^6 = \beta_3^{-1} + \beta_3^{-2} + \beta_3^{-3} = 1$ 与非空内点性质，劳齐集拓扑边界的二维平面测度严格归零：

::: {.theorem #thm-ch39-p2e-rauzy-null-boundary title="三阶劳齐分形拓扑边界的二维勒贝格零测度定理" lean="D5/S3/Geometry/Rauzy/TribonacciNullBoundary.rauzyFractal_frontier_volume_zero"}
设复数 $z \in \mathbb{C}$ 是三阶特征多项式 $X^3 - X^2 - X - 1$ 的根，且满足 $z \neq \beta_3$。记 $\partial\mathcal{R}_3(z) = \operatorname{frontier}\bigl(\operatorname{rauzyFractal}(z)\bigr)$ 为 $\mathcal{R}_3(z)$ 在 $\mathbb{C} \simeq \mathbb{R}^2$ 中的拓扑边界，则其二维勒贝格—哈尔体积测度严格为零：

$$
\operatorname{vol}_2\bigl(\partial\mathcal{R}_3(z)\bigr) = 0.
$$
:::

::: proof
由 [@thm-ch39-p2e-rauzy-regular-window] 知紧集 $\mathcal{R}_3(z)$ 被三支压缩仿射映射 $f_0, f_{10}, f_{110}$ 精确覆盖，且由 $|z|^2 = \beta_3^{-1}$ 与 $\beta_3^3 = \beta_3^2 + \beta_3 + 1$ 知三支映射对平面二维体积测度的缩放因子 $|z|^2, |z|^4, |z|^6$ 之和恰等于 $1$。因为 $\operatorname{int}\mathcal{R}_3(z)$ 非空开集具有严格正的有限平面体积，自相似覆盖下的测度守恒迫使各支重叠区与拓扑边界 $\partial\mathcal{R}_3(z) = \mathcal{R}_3(z) \setminus \operatorname{int}\mathcal{R}_3(z)$ 的二维平面测度不能携带正质量，从而 $\operatorname{vol}_2\bigl(\partial\mathcal{R}_3(z)\bigr) = 0$。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch39-p2e-rauzy-literature title="文献结果：劳齐分形拼砖、拓扑圆盘性质与边界豪斯多夫维数（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 关于三阶劳齐分形的经典动力系统与几何数论文献，起源于 G. Rauzy 对三字母替代系统与环面马尔可夫剖分的奠基工作（*Bull. Soc. Math. France* **110**, 1982, 147–178）及 W. P. Thurston 关于有限自动机与自相似铺砌的讲义（*Groups, Tilings, and Finite State Automata*, 1989）；A. Messaoudi 进一步研究了劳齐分形的算术编码、连通性/单连通拓扑圆盘性质以及分形边界的复数记数刻画（*J. Théorie des Nombres de Bordeaux* **10**(1), 1998, 135–162；*Acta Arithmetica* **95**(3), 2000, 195–224，注意文献常采用指数平移约定，导入拓扑结论前须核对与此处零次幂窗口的仿射对应）。文献给出的三阶劳齐分形边界豪斯多夫维数约为

$$
D_F = \dim_H\bigl(\partial\mathcal{R}_3(\alpha)\bigr) \approx 1.09336 \quad (\text{文献结果} + \text{NUM})。
$$

必须严格区分两件事：[@thm-ch39-p2e-rauzy-null-boundary] 证明的 $\operatorname{vol}_2(\partial\mathcal{R}_3) = 0$ 是指**二维平面面积为零**，这既不意味着边界光滑或一维弧长有限，也不单独算出豪斯多夫维数 $1.09336$；反之，可视化画面中的有限深度点云（包括 $K = 4$ 时的内部坐标采样云）属于 `NUM` 数值近似，不能把像素采样当作拼砖、单连通性或 $\mathcal{R}_4$ 拓扑定理的证明，更不能将需要额外重合条件的一般高阶皮索替代猜想当作无条件定理。
:::

::: {.viz src="pisot-clifford-rauzy-sandtable" preset="rauzy" height="500"}
**三阶劳齐分形内窗卡（`rauzy`）**：在二维内部复平面 $\mathbb{C}$ 中绘制由三支不等收缩映射 $f_0$、$f_{10}$、$f_{110}$ 生成的有限深度采样点云。青色与紫色区分内部主分支与 $\arg\alpha \approx 124.69^\circ$ 旋转相位，品红描出边界邻域点，琥珀色标出当前选定的合法前缀点。紧致性、非空内点、正则闭集、前缀精确覆盖与二维零测边界属 `LEAN ✓`；有限采样云与 $D_F \approx 1.09336$ 分别属 `NUM` 与 `文献结果`。
:::

为什么 $K = 2$ 的内部窗口只是一维实轴线段，而 $K = 3$ 却在正交补空间里长出旋转折叠的二维分形？将其放回代数数域的闵可夫斯基嵌入与克利福德等级语言，几何机制便一目了然。

### 39.5.5 克利福德正交分解：一维膨胀轴与二维内禀旋面 {#sec-ch39-p2e-clifford}

对有理系数或整系数的三阶代数编码 $x = a + b\beta_3 + c\beta_3^2$，经典三次闵可夫斯基实线性坐标映射写为

$$
(a, b, c) \longmapsto \Bigl(a + b\beta_3 + c\beta_3^2,\; \operatorname{Re}(a + b\alpha + c\alpha^2),\; \operatorname{Im}(a + b\alpha + c\alpha^2)\Bigr) \in E_\parallel^1 \oplus E_\perp^2.
$$

（顺带指出：对一般有理系数 $(a,b,c) \in \mathbb{Q}^3$，三嵌入迹 $(a+b\beta_3+c\beta_3^2) + 2\operatorname{Re}(a+b\alpha+c\alpha^2) = 3a + b + 3c$ 是有理数，仅当系数取整数或特定扫描格点时才必为整数。）在这一分解下，乘以主根 $\beta_3$ 在一维物理方向 $E_\parallel^1$ 上表现为倍率 $\beta_3 > 1$ 的单向拉伸，而在二维内部平面 $E_\perp^2$ 上则由复根乘法 $w \mapsto \alpha w$ 表现为模长 $|\alpha| = \beta_3^{-1/2} < 1$ 的均匀收缩与角度 $\arg\alpha \approx 124.69^\circ$ 的平面旋转之复合。

::: {.remark #rem-ch39-p2e-unification-model title="诠释模型：闵可夫斯基嵌入的克利福德线—面词典（MODEL）"}
在[第 6 章](ch06-geometric-product.md)建立的三维克利福德代数 $\mathrm{Cl}_{3,0}(\mathbb{R})$ 语言中，我们可以为上述 $E_\parallel^1 \oplus E_\perp^2$ 分解建立一套清晰的几何诠释词典（`MODEL`）：将一维膨胀方向对齐单位一阶向量轴 $\mathbf{e}_1$（粒子式标尺读数轴），将二维内部复平面对齐正交单位双向量面 $B_\perp = \mathbf{e}_2 \wedge \mathbf{e}_3$（满足 $B_\perp^2 = -1$ 的波式相干旋面），则内部单步演化 $w \mapsto \alpha w$ 可写为带阻尼的缩放旋子（scaled rotor）作用

$$
\mathcal{D}_\perp = \beta_3^{-1/2}\bigl(\cos\vartheta + B_\perp \sin\vartheta\bigr),\qquad \vartheta = \arg\alpha \approx 124.69^\circ,
$$

而三维行列式（伪标量体积缩放因子）满足 $\beta_3 \cdot \bigl(\beta_3^{-1/2}\bigr)^2 = 1$，体现出“纵向拉伸多少倍，横向双向量面积就精确收缩多少倍”的体积守恒律。在阅读这一词典时须恪守三条形式边界：第一，$(a,b,c) \mapsto (\dots)$ 是代数实线性坐标嵌入，只有在显式选定基与内积度规后才谈得上标准整数格 $\mathbb{Z}^3$ 的正交欧氏投影；第二，劳齐集 $\mathcal{R}_3(\alpha)$ 本身严格栖居在**二维内部平面** $E_\perp^2$ 内，三维沙盘中的立体视角变换只是摄像机观察操作，不会改变 $\mathcal{R}_3(\alpha)$ 的数学维数；第三，将 $E_\parallel^1$ 与 $E_\perp^2$ 诠释为观察者的外部时间轴与内部相位记忆面属于 `MODEL` 综合，此处不宣称存在额外的形式同构定理。
:::

::: {.viz src="pisot-clifford-rauzy-sandtable" preset="clifford" height="500"}
**克利福德线—面分解卡（`clifford`）**：三维代数坐标舞台将沿青色一维轴 $E_\parallel$ 的倍率 $\beta_3$ 膨胀，与二维内部平面 $E_\perp$ 上绕双向量轴的紫色旋转收缩 $|\alpha| e^{i\arg\alpha}$ 同台呈现；琥珀色圆点标出当前可拖拽的格点分解位置。坐标求值属 `NUM`，克利福德观察者词典属 `MODEL`。
:::

既然二维内部旋面上的单步收缩模长定格在 $|\alpha|_{K=3} = \beta_3^{-1/2} \approx 0.737353$，一个自然的数值追问随之浮现：它与[第 24 章](ch24-cosine-fixed-points-and-self-reference.md)和[第 33 章](ch33-all-beings-observers-and-mutual-attractors.md)反复出现的余弦自指不动点 $\theta^* = \cos\theta^* \approx 0.739085$ 究竟是什么关系？

### 39.5.6 自指尺度对照：Dottie 余弦不动点 $\theta^*$ 与内禀收缩模 $|\alpha|$ {#sec-ch39-p2e-self-reference}

在本书不同章节中，“算子作用于自身输出而达成尺度平衡”曾以三种精确但各异的数学方程出现：黄金连分数倒数不动点 $x = 1 + 1/x$（唯一正根 $\varphi$，见 [@cor-golden-fixed-point-unique] 与本章 §39.1 [@thm-ch39-self-application-four-fates-and-diagonal-identity]）、广义 $K$-Bonacci 主根方程 $x = 2 - x^{-K}$（唯一大于 $1$ 实根 $\beta_K$，见 [@thm-ch39-p2e-kbonacci-pisot]），以及实内积投影自指方程 $\cos\theta = \theta$（正实轴端点 $\theta^*$，见[第 24 章](ch24-cosine-fixed-points-and-self-reference.md) [@thm-dottie-rational-inverse-endpoint] 与[第 33 章](ch33-all-beings-observers-and-mutual-attractors.md)全实轴收敛算例 [@ex-ch33-mutual-cosine-monotonic-lock]）。把 $K = 3$ 时的内部收缩模长与余弦不动点放在同一把数值标尺下核对，可以得到如下精细对照：

::: {.example #ex-ch39-p2e-pisot-dottie-numerics title="文献结果与数值算例：Dottie 不动点 θ* 与三阶内空间收缩率 |α| 的近似度与代数分野（含文献结果，未在本书形式化）"}
**文献结果，未在本书形式化（针对 $\theta^*$ 的超越性判定；端点存在唯一性与三次共轭乘积恒等式已由 Lean 验证）。** 一方面，幂级数反演端点定理 [`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint)（[@thm-dottie-rational-inverse-endpoint]）证明区间 $(0, 1)$ 内存在唯一正实数 $\theta^*$ 满足 $\cos\theta^* = \theta^*$，且选定的有理系数反演幂级数在 $\pi$ 处绝对收敛于 $\theta^*$；另一方面，由三阶共轭根乘积恒等式 [`tribonacci_secondary_root_mul_conjugate`](lean:D5/S3/Constants/Irrationality/TribonacciTraceLattice.tribonacci_secondary_root_mul_conjugate) 可直接推出 $|\alpha|_{K=3} = \beta_3^{-1/2}$。独立双精度二分计算（`NUM`）给出两者的十进制数值与相对偏差：

$$
\theta^* \approx 0.739085,\qquad |\alpha|_{K=3} = \beta_3^{-1/2} \approx 0.737353,\qquad \frac{\bigl|\theta^* - |\alpha|_{K=3}\bigr|}{\theta^*} \approx 0.234\% \quad \left(\frac{\bigl|\theta^* - |\alpha|_{K=3}\bigr|}{|\alpha|_{K=3}} \approx 0.235\%\right).
$$

在惊叹于两者仅相差约千分之二点三的同时，形式诚实要求我们明确指出：**$\theta^*$ 与 $|\alpha|_{K=3}$ 严格不相等（$\theta^* \neq \beta_3^{-1/2}$），且分属截然不同的数域层级**。这是因为 $|\alpha|_{K=3} = \beta_3^{-1/2}$ 满足整系数六次代数方程 $y^6 + y^4 + y^2 - 1 = 0$，是不折不扣的代数数；而根据林德曼—魏尔斯特拉斯定理（文献结果），任何满足 $\cos\theta^* = \theta^*$ 的非零实数 $\theta^*$ 必为超越数。因此，$\approx 0.234\%$ 是纯粹的数值邻近（`NUM`），绝不能写成代数恒等式或同一物理常数；将 $\cos\theta^* = \theta^*$ 与皮索内窗自相似不动点共同归入符号母题 $\psi = \psi(\psi)$ 之下，属于本书的概念统一模型（`MODEL`）。
:::

::: {.viz src="pisot-clifford-rauzy-sandtable" preset="self-reference" height="500"}
**自指尺度对照卡（`self-reference`）**：并列展示余弦迭代收敛至青色不动点 $\theta^* \approx 0.739085$ 的轨迹，以及三阶皮索内空间按模长 $|\alpha| = \beta_3^{-1/2} \approx 0.737353$ 逐拍收缩的螺旋轨迹；琥珀色游标同步标出第 $k$ 步的幅度比与约 $0.234\%$ 的数值间距。端点与共轭乘积恒等式属 `LEAN ✓`，十进制差值属 `NUM`，自指母题并置属 `MODEL`。
:::

从单点收缩尺度回到多体量子寄存器：当一条禁 $1^K$ 合法字被空间切口一分为二时，左右两半不再能独立任取合法字——切口处的跨界禁戒直接把组合计数转化为可精确刻画的双体纠缠秩矩形。

### 39.5.7 跨切口 $1^K$ 禁戒与直接编码器的可达施密特秩 {#sec-ch39-p2e-entanglement}

设想把长度为 $m_X + m_Y$（$m_X, m_Y \ge 1$）的二元物理寄存器沿切口拆成左半 $X$（长 $m_X$）与右半 $Y$（长 $m_Y$）。即便左字 $x \in \{0, 1\}^{m_X}$ 与右字 $y \in \{0, 1\}^{m_Y}$ 各自内部都不含 $1^K$，拼接字 $xy$ 跨越切口时仍可能拼出连续 $K$ 个 `1`：记 $\tau(x)$ 为 $x$ 末尾连续 `1` 的个数，$\iota(y)$ 为 $y$ 开头连续 `1` 的个数，则跨切口拼接合法的充要条件恰为

$$
\tau(x) + \iota(y) < K.
$$

在 `trureturing` 的直接编码器模型中，给定整数 $N \ge 2$ 与阶数 $K \ge 2$，将 $\{0, 1, \dots, N\}$ 按是否为素数划分为非素数逻辑页（$b = \mathrm{false}$，维数 $M_0 > 0$）与素数逻辑页（$b = \mathrm{true}$，维数 $M_1 > 0$）。记 $C_{m, b}$ 为首比特等于 $b$ 的长度 $m$ 禁 $1^K$ 合法字集，其基数为 $c_{m, b} = |C_{m, b}|$；对每个阈值 $0 \le s < K$，定义左端低尾游程累计行数与右端相容邻域字数：

$$
a_s = \#\bigl\{x \in C_{m_X, 1} : \tau(x) < s\bigr\},\qquad n_s = \#\bigl\{y \in C_{m_Y, 1} : \iota(y) < K - s\bigr\},
$$

并据此定义两页的组合秩上界：

$$
R_0 = \min\bigl(c_{m_X, 0},\; \lfloor c_{m_Y, 0} / M_0 \rfloor\bigr),\qquad R_1 = \min\Bigl(c_{m_X, 1},\; \min_{0 \le s < K}\bigl(a_s + \lfloor n_s / M_1 \rfloor\bigr)\Bigr).
$$

称等距编码矩阵 $J : \mathbb{C}^{\mathrm{Logical}(N)} \to \mathbb{C}^{\{0,1\}^{m_X} \times \{0,1\}^{m_Y}}$ 与左寄存器页密度态 $\sigma_0, \sigma_1$ 满足**直接编码契约**（`directContract`），若：（i）$J^* J = I$；（ii）$X$ 与 $Y$ 两侧的首比特物理页投影均与逻辑页投影 $\Pi_b$ 交织，且 $\sigma_b$ 支撑在 $C_{m_X, b}$ 上；（iii）对一切逻辑算子 $A$ 成立部分迹替换律 $\operatorname{Tr}_Y(J A J^*) = \sum_{b \in \{0,1\}} \operatorname{Tr}(\Pi_b A)\,\sigma_b$；（iv）对一切逻辑输入态 $\psi$，凡跨切口拼接违背禁 $1^K$ 规则的字对 $(x, y)$ 其编码振幅恒为零 $(J\psi)(x, y) = 0$。在这一精确契约下，可达施密特秩与冯·诺依曼纠缠熵由以下充要定理完整锁定：

::: {.theorem #thm-ch39-p2e-direct-encoder-ranks title="K-Bonacci 直接编码器的可达页秩矩形与冯·诺依曼纠缠熵极值定理" lean="D5/S3/Quantum/Entanglement/KBonacciDirectRankEntropy.complete_original_direct_rank_entropy"}
对任意整数 $N \ge 2$、$K \ge 2$ 与块长 $m_X, m_Y \ge 1$，非素数与素数逻辑页维数均严格为正（$M_0 > 0,\; M_1 > 0$）。记页秩 $r_b = \operatorname{rank}(\sigma_b)$（$b \in \{0, 1\}$），$R_0, R_1$ 如上式所定义，则：

1. **秩上界与谱分解必要性**：凡满足 `directContract` 的编码对 $(J, \sigma)$ 必满足 $r_0 \le R_0$、$r_1 \le R_1$ 以及第 $1$ 页的全行谱分解必要条件（`totalRowSpectralNecessity`）；
2. **可达页秩充要矩形**：对任意自然数对 $(d_0, d_1)$，存在联合选定的 $(J, \sigma)$ 满足 `directContract` 且 $(r_0, r_1) = (d_0, d_1)$，当且仅当 $1 \le d_0 \le R_0$ 且 $1 \le d_1 \le R_1$；特别地，合法直接编码器存在当且仅当 $R_0 \ge 1$ 且 $R_1 \ge 1$；
3. **页纯态施密特秩恒等式**：若满足 `directContract`，则对完全支撑在第 $b$ 逻辑页内的任意归一化纯态 $\psi$，其编码双体态 $J\psi$ 跨 $X \mid Y$ 切口的施密特秩恒等于页密度矩阵秩 $r_b = \operatorname{rank}(\sigma_b)$；
4. **冯·诺依曼熵紧上界与联合同时可达性**：凡满足 `directContract` 的 $(J, \sigma)$ 均满足自然对数单位下的熵上界 $S(\sigma_0) \le \ln R_0$ 与 $S(\sigma_1) \le \ln R_1$；且只要 $R_0 \ge 1$ 且 $R_1 \ge 1$，存在同一组联合构造 $(J, \sigma)$ 同时达到四角极值 $r_0 = R_0$、$r_1 = R_1$、$S(\sigma_0) = \ln R_0$ 与 $S(\sigma_1) = \ln R_1$。
:::

::: proof
必要性由编码器谱阻塞定理 [`actual_encoder_spectral_obstruction`](lean:D5/S3/Quantum/Entanglement/KBonacciDirectSupportObstruction.actual_encoder_spectral_obstruction) 给出：对任意满足 `directContract` 的给定编码器，在 $\sigma_b$ 的非零本征子空间上分解等距算子 $W$，跨切口禁戒 $\tau(x) + \iota(y) < K$ 迫使凡满足 $\tau(x) \ge s$ 的左端加权行张成的子空间 $V_s$ 在右端只能支撑于基数为 $n_s$ 的合法邻域内；由于 $M_1$ 个正交逻辑态在右端互不重叠，必有 $M_1 \dim V_s \le n_s$，从而 $r_1 \le a_s + \dim V_s \le a_s + \lfloor n_s / M_1 \rfloor$ 对一切 $0 \le s < K$ 成立，第 $0$ 页同理得 $r_0 \le \min(c_{m_X, 0}, \lfloor c_{m_Y, 0}/M_0 \rfloor) = R_0$。充分性与同时极值构造则通过在各游程分层内显式配对正交右端字块并以均匀本征值 $1/d_b$（极值处取 $1/R_b$）组装 $\sigma_b$ 与 $J$ 完成；由支撑秩为 $r_b$ 的密度态最大冯·诺依曼熵不超过 $\ln r_b \le \ln R_b$ 即得紧熵界（这组跨切口秩界与[第 38 章](ch38-observer-memory-pointer-and-ontological-qram.md)指针历史容量界 [@thm-ch38-pointer-width-and-no-deep-copy] 刻画的是不同物理约束）。完整证明由 Lean 内核检查。
:::

[@thm-ch39-p2e-direct-encoder-ranks] 揭示了一条极易被口号掩盖的关键事实：**直接编码器的施密特秩并不普遍恒等于 $K$！** 只有当参数满足 $1 \le K \le R_b$ 时，秩等于 $K$ 才是可达矩形 $[1, R_0] \times [1, R_1]$ 中的**一个条件性可选值**。以独立枚举的具体参数 $N = 2,\; K = 3,\; m_X = 4,\; m_Y = 5$ 为例（`NUM`）：$\{0, 1, 2\}$ 中非素数页 $\{0, 1\}$ 维数 $M_0 = 2$，素数页 $\{2\}$ 维数 $M_1 = 1$；直接清点禁 `111` 字可得 $c_4 = (7, 6)$、$c_5 = (13, 11)$，且第 $1$ 页各阈值计数值为 $(a_0, a_1, a_2) = (0, 3, 5)$ 与 $(n_0, n_1, n_2) = (11, 7, 0)$，代入公式给出

$$
R_0 = \min\bigl(7, \lfloor 13 / 2 \rfloor\bigr) = 6,\qquad R_1 = \min\bigl(6, \min(0 + 11,\; 3 + 7,\; 5 + 0)\bigr) = 5.
$$

此时区间 $1 \le r_0 \le 6$ 与 $1 \le r_1 \le 5$ 内的任意整点秩对均可实现：$r_0 = r_1 = K = 3$ 只是其中一种合法选择，而最大可达秩实为 $(6, 5)$，对应最大页纠缠熵 $(\ln 6, \ln 5)$。

::: {.example #ex-ch39-p2e-positive-ket-handcalculation title="手算：同一切口上的正等幅合法字态"}
这是指定有限态的纸面计算，不是新增的 Lean 验证定理。取 $m=n=1$（即 $m_X=m_Y=1$），沿 $X\mid Y$ 切开两比特字。$K=2$ 时，合法字恰为 $00,01,10$；选择正等幅相干态

$$
\lvert\psi\rangle=\frac{\lvert00\rangle+\lvert01\rangle+\lvert10\rangle}{\sqrt3},
\qquad \langle\psi\mid\psi\rangle=\frac{3}{3}=1.
$$

两侧均按字序 $0,1$ 排列，系数矩阵与部分迹为

$$
\begin{aligned}
M&=\frac1{\sqrt3}\begin{pmatrix}1&1\\1&0\end{pmatrix},\\
\rho_X&=\operatorname{Tr}_Y(\lvert\psi\rangle\langle\psi\rvert)
=MM^*=\frac13\begin{pmatrix}2&1\\1&1\end{pmatrix}.
\end{aligned}
$$

具体地，$\rho_{xx'}=\sum_{y=0}^1 M_{xy}\overline{M_{x'y}}$：$00$ 与 $10$ 共享右字 $y=0$，故留下非对角元 $\rho_{01}=\rho_{10}=1/3$。因此

$$
\begin{aligned}
\det(tI-\rho_X)&=t^2-t+\frac19,\\
\lambda_+&=\frac{3+\sqrt5}{6},\qquad
\lambda_-=\frac{3-\sqrt5}{6}.
\end{aligned}
$$

两本征值各有重数 $1$，均为正且和为 $1$；约化秩为 $2$，施密特系数为 $\sqrt{\lambda_+},\sqrt{\lambda_-}$。以自然对数计，纠缠熵是

$$
S(\rho_X)=-\lambda_+\ln\lambda_+-\lambda_-\ln\lambda_->0.
$$

仅数出三个字或取 $\ln3$ 都不能得到这个熵；将三字等概率混成对角经典混合态，会抹去上述相干项。

同一切口上，每个 $K\ge3$ 都允许全部四字 $00,01,10,11$。此时所选正等幅态为

$$
\begin{aligned}
\lvert\psi\rangle&=\frac{\lvert00\rangle+\lvert01\rangle+\lvert10\rangle+\lvert11\rangle}{2}
=\lvert+\rangle\otimes\lvert+\rangle,\\
\lvert+\rangle&=\frac{\lvert0\rangle+\lvert1\rangle}{\sqrt2},\qquad
\langle\psi\mid\psi\rangle=4\left(\frac12\right)^2=1,\\
\rho_X&=\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix}.
\end{aligned}
$$

其本征值 $1,0$ 各有重数 $1$，约化秩为 $1$，唯一非零施密特系数为 $1$，故 $S(\rho_X)=0$（约定 $0\ln0=0$）。这里在所有合法字上指定态，未固定首比特页，也未施加逻辑 `directContract`；前一定理则在该契约下联合选择编码器与页态，刻画可达秩与熵极值。本例不确定物理基态，也不推出一般固定 $K$ 的熵极限；后文开放问题仍然开放。
:::

::: {.example #ex-ch39-p2e-phase-counterexample title="手算：概率相同，纠缠不同"}
沿用前例的 $m=n=1$ 与 $X\mid Y$ 切口，固定任意 $K\ge3$；合法字恰为 $00,01,10,11$。
比较 $\lvert\psi_+\rangle=(\lvert00\rangle+\lvert01\rangle+\lvert10\rangle+\lvert11\rangle)/2$ 与 $\lvert\psi_{\mathrm{phase}}\rangle=(\lvert00\rangle+\lvert01\rangle+\lvert10\rangle-\lvert11\rangle)/2$：只将 $11$ 振幅的相位改为 $\pi$。
两态的范数平方均为 $4(1/4)=1$，在计算基中每个字的概率均为 $1/4$。两侧按 $0,1$ 排列，后一态给出

$$
\begin{aligned}
M_{\mathrm{phase}}&=\frac12\begin{pmatrix}1&1\\1&-1\end{pmatrix},\\
\rho_X&=\operatorname{Tr}_Y(\lvert\psi_{\mathrm{phase}}\rangle\langle\psi_{\mathrm{phase}}\rvert)=M_{\mathrm{phase}}M_{\mathrm{phase}}^*\\
&=\frac14\begin{pmatrix}1+1&1-1\\1-1&1+1\end{pmatrix}=\frac{I_2}{2}.
\end{aligned}
$$

部分迹中，右字 $y=0,1$ 对非对角元的贡献分别为 $1/4,-1/4$，恰好抵消。约化谱按重数列为 $(1/2,1/2)$（本征值 $1/2$ 的重数为 $2$），施密特系数为 $1/\sqrt2,1/\sqrt2$；自然对数下的纠缠熵为 $S(\rho_X)=-2(1/2)\ln(1/2)=\ln2$，而前例的 $\psi_+$ 给出 $0$。

这个相位变化是联合受控变号操作 $\operatorname{diag}(1,1,1,-1)$，不是两个单比特局域相位操作的乘积：局域酉操作保持施密特系数，不能把 $\psi_+$ 的唯一非零施密特系数 $1$ 变成上述两个系数。

因此，相同的合法字支撑、计数乃至计算基概率都不足以确定纠缠；所选正相位等幅态族仍是有意义的额外态规定。这只是有限态的纸面计算，不给出基态、物理实现或分形纠缠标度结论。
:::

::: {.example #ex-ch39-p2e-finite-kernel title="纸面推导：将正等幅态的约化谱压缩到 K 维"}
前两个手算可以推广为同一指定态族的有限矩阵计算。以下是纸面推导，不是新增的 Lean 验证结果。固定 $K\ge2$ 与任意 $m,n\ge0$，令 $W_L$ 为全部禁连续 $1^K$ 的长 $L$ 二进制字，$z_L=|W_L|$，并选取

$$
\lvert\psi_{m,n}\rangle
=\frac1{\sqrt{Z}}\sum_{w\in W_{m+n}}\lvert w\rangle,
\qquad Z=z_{m+n}>0.
$$

全零字保证 $Z>0$，这里仍未固定首比特页。以末端连续 `1` 的长度 $r$ 将 $W_m$ 分为 $A_r$，以开头连续 `1` 的长度 $s$ 将 $W_n$ 分为 $B_s$；空字的这两个长度都取 $0$。因为字本身合法，$0\le r,s<K$。记实际有限计数为 $a_r=|A_r|$、$b_s=|B_s|$，允许它们为 $0$。左右字 $x\in A_r$、$y\in B_s$ 的拼接合法当且仅当 $r+s<K$，所以

$$
Z=\sum_{r+s<K}a_r b_s.
$$

在完整的 $2^m$、$2^n$ 维计算基空间内，为每个非空类取归一化指标向量 $u_r=\sum_{x\in A_r}|x\rangle/\sqrt{a_r}$、$v_s=\sum_{y\in B_s}|y\rangle/\sqrt{b_s}$；空类对应零向量，不对 $0$ 开方后取倒数。以它们为列组成 $U,V$，再定义 $K\times K$ 矩阵

$$
C_{rs}=\mathbf1_{\{r+s<K\}}\sqrt{\frac{a_r b_s}{Z}}.
$$

实际态的系数矩阵为 $M_{xy}=\mathbf1_{\{xy\in W_{m+n}\}}/\sqrt Z$。逐项展开 $UCV^*$：合法 $x,y$ 各只落入一个非空类，归一化因子抵消；非法字或非法拼接的系数为 $0$。因此 $M=UCV^*$。非空类彼此不交，故

$$
\begin{aligned}
U^*U&=D_A=\operatorname{diag}(\mathbf1_{\{a_r>0\}}),\\
V^*V&=D_B=\operatorname{diag}(\mathbf1_{\{b_s>0\}}),\\
D_A C D_B&=C.
\end{aligned}
$$

最后一式处理了短字和空类：不能把带零列的 $U,V$ 当成整个 $K$ 维空间上的等距嵌入。现在对实际纯态作部分迹，得到

$$
\begin{aligned}
\rho_X&=MM^*=U G U^*,\qquad G=CC^*,\\
G_{rr'}&=\frac{\sqrt{a_r a_{r'}}}{Z}
\sum_{s=0}^{K-1-\max(r,r')}b_s.
\end{aligned}
$$

这个和只数能与两条左端游程同时相接的右字。$G$ 在空的左类上为零，而 $U$ 限制到非空类张成的坐标空间后是等距嵌入；所以 $G$ 与 $\rho_X$ 的全部正本征值及其重数相同。右约化态亦有同一正谱，因为 $C^*C$ 与 $CC^*$ 的正谱相同。若 $R=\operatorname{rank}C$，两侧物理零本征值的重数分别为 $2^m-R$、$2^n-R$；辅助矩阵 $G$ 的零重数则是 $K-R$，三者不能混用。

由 $\operatorname{Tr}G=\sum_{r,s}|C_{rs}|^2=1$，将正本征值按重数记为 $\nu_1,\ldots,\nu_R$，有限切口的自然对数纠缠熵就是

$$
\begin{aligned}
S(\rho_X)&=-\sum_{j=1}^{R}\nu_j\ln\nu_j,\\
0\le S(\rho_X)&\le\ln R
\le\ln\!\bigl(\min\{K,2^m,2^n\}\bigr).
\end{aligned}
$$

熵上界用的是 $R$ 个正数之和为 $1$ 的通常 Shannon 熵界。$m=0$ 或 $n=0$ 时 $R=1$、熵为 $0$；$m=n=1$ 时，上式的非零部分给回 [@ex-ch39-p2e-positive-ket-handcalculation] 的矩阵。这个计算使用实际类计数，不要求先给出它们的闭式，也不把有限计数替换为平稳概率。固定 $K$ 时，它使此正等幅态族的切口熵一致有界；它不证明熵极限存在，不给出同时独立于 $K$ 与切口长度的统一熵界，也不指定物理基态或建立劳齐边界维数与纠缠的关系。这些计数不包含相位信息；改变相位后是否仍有同一谱，须另外核对，前例的联合变号即改变谱。
:::

::: {.example #ex-ch39-p2e-exact-rank title="短词到饱和：精确施密特秩"}
继续 [@ex-ch39-p2e-finite-kernel] 中全正等幅态的纸面推导，令 $p=\min(m,K-1)$、$q=\min(n,K-1)$。左末尾恰有 $r$ 个连续 $1$ 的类非空，当且仅当 $0\le r\le p$：当 $r<m$ 时可取 $0^{m-r}1^r$，当 $r=m<K$ 时取全 $1$ 字；空字对应 $r=0$。右侧同理，用 $1^s0^{n-s}$ 给出 $0\le s\le q$ 的代表。因此，删去零行列后的系数核是

$$
C_{\mathrm{occ}}=Z^{-1/2}D_A T D_B,
\qquad T_{rs}=\mathbf 1_{\{r+s<K\}},
$$

其中 $D_A=\operatorname{diag}(\sqrt{a_0},\ldots,\sqrt{a_p})$、$D_B=\operatorname{diag}(\sqrt{b_0},\ldots,\sqrt{b_q})$ 均可逆。它的秩等于这个 $(p+1)\times(q+1)$ 的 $0$–$1$ 矩阵的秩。

记 $T$ 的第 $r$ 行为 $v_r$，列坐标为 $0,\ldots,q$。第零行 $v_0$ 全为 $1$；对 $1\le r\le p$，相邻行之差为

$$
v_r-v_{r-1}=
\begin{cases}
-e_{K-r},&K-r\le q,\\
0,&K-r>q.
\end{cases}
$$

这里 $1\le K-r$，所以各个非零差向量占据互异的非零列坐标；它们共有 $h=\max(0,p+q-K+1)$ 个。逐行相减与逐项求和说明，行空间恰由 $v_0$ 和这 $h$ 个坐标向量张成。观察第零列先排除 $v_0$ 的非零系数，再逐个观察其余坐标，就得到这组向量线性无关。因此，原纯态的施密特秩为

$$
R=1+\max(0,p+q-K+1).
$$

这给出精确的有限长度边界：$R=K$ 当且仅当 $m,n\ge K-1$；$R=1$ 当且仅当 $m=0$、$n=0$ 或 $m+n<K$。对非空的两侧，禁字约束能跨过切口时，即 $m+n\ge K$，这个选定态才出现纠缠。纯态的正谱有 $R$ 项，故 $R=1$ 时熵为零，$R>1$ 时每项都严格小于 $1$，熵严格为正。满秩本身不保证正谱等权，熵是否达到 $\ln K$ 仍须读取前例的谱。这里没有新增 Lean 验证，也没有建立熵极限或物理基态的结论。
:::


::: {.remark #rem-ch39-p2e-rydberg-anyon-literature title="文献结果：斐波那契任意子黄金链与里德堡原子阻塞实验背景（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 在凝聚态与原子分子光物理文献中，$K = 2$ 的禁邻 `11` 希尔伯特空间在两类著名多体系统中获得了物理实现或理论建模：其一是 A. E. Feiguin 等人提出的拓扑斐波那契任意子“黄金链”（golden chain）模型（*Phys. Rev. Lett.* **98**, 2007, 160409），其融合规则 $\tau \times \tau = \mathbf{1} + \tau$ 使有限链融合空间维数按斐波那契数增长；其二是里德堡（Rydberg）原子阵列中的偶极/范德瓦耳斯 $1/r^6$ 阻塞机制（理论建模见 I. Lesanovsky, *Phys. Rev. Lett.* **106**, 2011, 025301；51 原子量子模拟器实验见 H. Bernien et al., *Nature* **551**, 2017, 579–584）。引用这些物理背景时须注意两重边界：第一，最近邻两体里德堡阻塞刚好实现禁相邻激发 $|11\rangle$（对应 $K = 2$ 的 PXP 子空间），但单纯拉大两体阻塞半径只会禁止距离 $R_b$ 内的一切激发对（例如连 `101` 一并禁止），**并不会自动产生 $K > 2$ 的禁连续 $1^K$ 约束**——若要在物理哈密顿量中实现 $K > 2$ 的 $K$-Bonacci 子空间，必须另行设计专门的 $K$ 体局域相互作用；第二，任意子融合空间与有限阻塞比实验哈密顿量均非 [@thm-ch39-p2e-direct-encoder-ranks] 中精确零振幅等距直接编码器的形式同义物。
:::

::: {.viz src="pisot-clifford-rauzy-sandtable" preset="entanglement" height="500"}
**跨切口禁戒与可达秩矩形卡（`entanglement`）**：左侧展示跨切口拼接检验 $\tau(x) + \iota(y) < K$（青色标出相容拼接字对，品红标出触发 $1^K$ 阻塞的非法拼接），右侧绘制可达页秩矩形 $[1, R_0] \times [1, R_1]$ 与页熵上界 $\ln R_b$，琥珀色标出当前选定的参数与秩点。可达秩矩形与熵界属 `LEAN ✓`，具体参数枚举属 `NUM`，里德堡与任意子物理背景属 `文献结果`。
:::

最后，当有限长合法字延展为无穷轨道，系统的不确定性与可区分性便同时在马尔可夫平稳核、边界柱集概率与有限观测逃逸对三条轨道上显影。

### 39.5.8 帕里平稳律、逃逸对计数与分形视界熵问题 {#sec-ch39-p2e-entropy}

在讨论“熵”这一极易发生概念滑移的词之前，我们必须先把 `trureturing` 中已由内核锁定的有限/马尔可夫定律，与遍历论文献中的移位拓扑熵及尚未解决的分形纠缠标度猜想逐一拆开。

在马尔可夫链侧，对任意阶数 $k \ge 2$，令互反帕里参数为 $p = \operatorname{parryParameter}(k) = \beta_k^{-1}$。在带绝对符号位与当前连续 `1` 游程长度的有向状态空间 $\operatorname{State}(k) = \mathrm{Bool} \times \operatorname{Fin} k$ 上，定义后缀权重 $w_j = \operatorname{suffixWeight}(k, p, j) = \sum_{a=0}^{k-j-1} p^{a+1}$、归一化常数 $Z_k = \sum_{j=0}^{k-1} p^j w_j$、符号翻转对合 $\operatorname{flip}(b, j) = (!b, j)$，以及重置转移核 $P_k = \operatorname{kernel}(k, p)$：从状态 $s = (b, j)$ 出发，以概率 $p / w_j$ 翻转符号并重置游程至 $(!b, 0)$，当 $j + 1 < k$ 时以概率 $p\, w_{j+1} / w_j$ 保持符号并推进游程至 $(b, j + 1)$，其余转移概率为 $0$。对应状态分布定义为

$$
\pi_k(b, j) = \operatorname{parryLaw}\bigl(k, (b, j)\bigr) = \frac{p^j w_j}{2 Z_k}.
$$

这组有向重置核的随机性、归一化、平稳不变性与正负号对称性已由 Lean 内核完整验证：

::: {.theorem #thm-ch39-p2e-parry-escape-laws title="有向 K-Bonacci 重置链的帕里随机核、平稳分布与符号翻转对称律" lean="D5/S3/TotalVariation/ParryResetLaw.parry_stationary_law"}
对任意满足 $k \ge 2$ 的自然数阶，令 $p = \operatorname{parryParameter}(k) = \beta_k^{-1}$。则在上述状态空间 $\operatorname{State}(k) = \mathrm{Bool} \times \operatorname{Fin} k$ 上同时成立：

1. **互反主根范围与幂和归一**：$1/2 < p \le \varphi^{-1}$，且 $\sum_{a=1}^k p^a = 1$；
2. **后缀权重与归一化界**：对一切 $j \in \operatorname{Fin} k$ 有 $p \le w_j \le 1$，且归一化因子满足 $1 \le Z_k$；
3. **非负行随机核**：对一切 $s, t \in \operatorname{State}(k)$ 有 $P_k(s, t) \ge 0$，且每一行概率之和满足 $\sum_t P_k(s, t) = 1$；
4. **平稳不变性与符号翻转公平性**：对一切 $s \in \operatorname{State}(k)$ 有 $\pi_k(s) \ge 0$，$\sum_s \pi_k(s) = 1$；对一切目标态 $t \in \operatorname{State}(k)$ 成立平稳方程 $\sum_s \pi_k(s) P_k(s, t) = \pi_k(t)$；且对一切 $s$ 成立符号翻转不变性 $\pi_k(\operatorname{flip}(s)) = \pi_k(s)$。
:::

::: proof
因 $\beta_k$ 在 $k \ge 2$ 上自 $\beta_2 = \varphi$ 严格递增趋向 $2$，其倒数 $p = \beta_k^{-1}$ 严格落在 $(1/2, \varphi^{-1}]$ 内；将特征方程 $\beta_k^k = \sum_{i=0}^{k-1} \beta_k^i$ 两边同乘 $\beta_k^{-k}$ 即得 $\sum_{a=1}^k p^a = 1$。由此可知每个后缀部分和 $w_j = \sum_{a=1}^{k-j} p^a$ 至少包含首项 $p > 0$ 且不超过全和 $1$，并满足末端值 $w_{k-1} = p$ 与向后递推 $w_j = p + p w_{j+1}$（$j + 1 < k$），故 $P_k$ 各元素非负且每行重置项与递增项之和恰为 $(p + p w_{j+1})/w_j = 1$（末端行重置项恰为 $p/p = 1$）。再把左特征幂 $p^j$ 与右特征权重 $w_j$ 相乘并均分给正负两个符号页，流入 $(b, 0)$ 的平稳总质量等于 $\sum_j \frac{p^j w_j}{2 Z_k} \cdot \frac{p}{w_j} = \frac{p}{2 Z_k}\sum_{j=0}^{k-1} p^j = \frac{w_0}{2 Z_k} = \pi_k(b, 0)$，流入 $(b, j+1)$ 的质量亦精确等于 $\frac{p^j w_j}{2 Z_k}\cdot\frac{p w_{j+1}}{w_j} = \pi_k(b, j+1)$，且对合 $\operatorname{flip}$ 仅翻转不影响公式的符号分量。完整证明由 Lean 内核检查。
:::

在这一平稳律旁，还有两条各自独立的形式化定量定律共同约束边界碰撞与观测盲区：其一是帕里边界柱集上界定理 [`parry_boundary_cylinder_bound`](lean:D5/S3/TotalVariation/ParryBoundaryCylinderBound.parry_boundary_cylinder_bound)，它对给定的 $n \ge 1$ 组正游程对集合 $C$（每段 `1` 游程 $< k$ 且编码长度不超过视界 $R$）证明，左右边界选定前缀的平稳质量分别不超过 $\operatorname{stationaryWordMass}(10)\cdot(1 - S + M)$ 与 $\operatorname{stationaryWordMass}(01)\cdot(1 - S + M)$（这是精确概率不等式，而非分形维数或熵值公式）；其二是与[第 38 章](ch38-observer-memory-pointer-and-ontological-qram.md) §38.5 一脉相承的有限竞技场信息逃逸率判据 [`lowersEscape_iff_uniqueCaptureCount_pos`](lean:D5/S3/ConceptDynamics/InformationEscape/ExactRate.lowersEscape_iff_uniqueCaptureCount_pos)，它证明在基数 $q \ge 2$ 的非退化有限状态集上，观测目录 $S$ 无法区分的有序相异状态对集合 $E(S)$ 定义出归一化有理逃逸率 $e(S) = |E(S)|/[q(q-1)]$，而某项观测 $i$ 严格降低逃逸率当且仅当其唯一捕获对计数 $|U_i| > 0$（且差值恰为 $|U_i|/[q(q-1)]$）。有限有序逃逸对比例 $e(S)$、量子态冯·诺依曼熵 $S(\sigma_b)$ 与无限移位系统的遍历熵在数学定义上彼此独立，绝不可混为一谈。

::: {.remark #rem-ch39-p2e-abramov-literature title="文献结果：帕里最大熵马尔可夫测度与阿布拉莫夫诱导回归熵公式（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 在遍历论经典文献中，W. Parry（*Trans. Amer. Math. Soc.* **112**, 1964, 55–66）证明不可约拓扑马尔可夫链存在唯一最大熵内禀马尔可夫测度，使禁 $1^K$ 子移位的单步拓扑熵（亦即最大柯尔莫哥洛夫—西奈度量熵）等于 $h_{\mathrm{top}}(\Sigma_K) = \log_2 \beta_K\;\text{bits/step}$（数值计算 `NUM` 给出 $K = 2, 3, 4$ 时依次约为 $0.69424$、$0.87915$、$0.94678\;\text{bits/step}$，随 $\beta_K \nearrow 2$ 单调趋向 $1\;\text{bit/step}$）。另一方面，L. M. Abramov（*Dokl. Akad. Nauk SSSR* **128**, 1959, 647–650）证明：在保概率遍历动力系统 $(X, \mathcal{B}, \mu, T)$ 中，若可测回访集 $A \in \mathcal{B}$ 满足 $\mu(A) > 0$，记 $T_A$ 为 $A$ 上的首次回归诱导映射、$\mu_A$ 为归一化条件测度，则每次回归的诱导熵满足

$$
h_{\mu_A}(T_A) = \frac{h_\mu(T)}{\mu(A)}.
$$

引用这两条文献定理时必须区分单位与前提：[@thm-ch39-p2e-parry-escape-laws] 仅在有向重置状态空间上验证了随机核与平稳分布，并未在当前锁定的源码中形式化柯尔莫哥洛夫—西奈移位熵或阿布拉莫夫公式；而将阿布拉莫夫公式用于每次重置回访事件时，必须区分“每次回归熵 $h_{\mu_A}(T_A)$”与“原始每步熵 $h_\mu(T)$”，不能凭类比直接套用到不可逆读出过程或有限 $p$ 进余数树上。
:::

至于横向内部空间的劳齐分形边界维数 $D_F = \dim_H(\partial\mathcal{R}_K)$ 是否会在量子多体切投态中诱导出反常的分形边界纠缠标度，在严格数学物理中仍是一道悬而未决的开放问题：

::: {.problem #prob-ch39-p2e-fractal-horizon title="开放问题：皮索切投量子多体系统的劳齐分形视界纠缠标度"}
设阶数 $K \ge 3$ 的皮索切投点集或局域受约束多体哈密顿量，其内部接受窗 $\mathcal{R}_K$ 具有豪斯多夫维数严格大于整数余维的拓扑分形边界（例如 $K = 3$ 时文献结果给出 $D_F = \dim_H(\partial\mathcal{R}_3) \approx 1.09336 > 1$）。是否存在严格构造的一族局域有能隙基态或切投编码量子态，当区域特征尺度 $R \to \infty$ 时，其跨边界双体纠缠熵 $S_{\mathrm{ent}}(R)$ 严格服从由内部劳齐边界维数 $D_F$ 支配的反常标度律（如主项 $S_{\mathrm{ent}}(R) \asymp R^{D_F}$ 或精确锁定系数的对数/次主导分形修正项），并能给出标准余维一面积律失效或保持的充要谱间隙与局域性判据？在本书框架内，任何诸如 $S_{\mathrm{ent}} \propto R^{D_F}$ 的“分形视界面积律”表述均作为待证开放问题（`OPEN`）与启发性物理构想（`MODEL`）列出，绝不作为已证形式定理或引力面积律定理宣称。
:::

::: {.remark #rem-ch39-p2e-physical-tribonacci-interface title="物理 Tribonacci 跃迁链与有限开链接口（文献模型，未在本书形式化）"}
**文献模型，未在本书形式化。** 一个可供研究的具体物理对象是零在位势的最近邻跃迁链。依 Kolehmainen–Lado–Moustaj，*One-dimensional quasicrystals with tensor-network finite-state automata*（[arXiv:2609.06040v1](https://arxiv.org/pdf/2609.06040v1)，§III 式 (2)–(3)、附录 B.2），取替代规则 $\sigma(A)=AB$、$\sigma(B)=AC$、$\sigma(C)=A$，以及从 $A$ 出发的不动无限词 $W=\lim_{j\to\infty}\sigma^j(A)$，字母从 $W_0$ 编号。固定 $0<\rho<1$，以 $t_C=1$ 为能量单位，令 $t_A=\rho^2$、$t_B=\rho$，即 $t_A/t_B=t_B/t_C=\rho$。对每个整数 $N\ge2$，在单粒子格点空间 $\mathbb{C}^N$ 的基 $\{\lvert i\rangle:0\le i<N\}$ 上定义

$$
h_N=\sum_{i=0}^{N-2}t_{W_i}\bigl(\lvert i\rangle\langle i+1\rvert+\lvert i+1\rangle\langle i\rvert\bigr).
$$

这里使用 $W$ 的前 $N-1$ 个字母标记键，端点 $0$ 与 $N-1$ 不相连。该文张量中的数位编码的是这个单粒子格点指标；沿二进制或 Tribonacci 地址数位切分张量指标，并未指定实空间多体二分。这一区别也限制了与 §39.5.7 的直接编码纠缠秩之间的类比：不能据此把合法字的等权叠加认作该跃迁链的 Slater 基态。

**本书未验证的有限开链间隙接口。** 令

$$
L_j=\lvert\sigma^j(A)\rvert,\qquad N_j=2\lfloor L_j/2\rfloor,\qquad h_{\rho,j}=h_{N_j}\quad(j\ge1).
$$

对每个固定的 $\rho\in(0,1)$，沿上述确定的偶数格点开前缀，是否有

$$
\delta_{\rho,j}:=\min\{\lvert\lambda\rvert:\lambda\in\operatorname{Spec}(h_{\rho,j})\}\longrightarrow0\qquad(j\to\infty)?
$$

这里不预设收敛速率，也不把“本书未验证”当作外部新猜想的声明。有限矩阵的可逆性、无限体积谱中零点的归属、有限分辨率态密度或 Anderson 局域化意义下的临界性，都不能直接替代这一指定边界与前缀序列的极限问题。Krebbekx–Moustaj–Dajani–Morais Smith 的 *Multifractal Properties of Tribonacci Chains*（[*Phys. Rev. B* **108**, 104204](https://doi.org/10.1103/PhysRevB.108.104204)，§II.B.1、§III.A.1、§V）采用周期逼近与微扰重整化研究物理谱及临界性；本书不将其解释为上述对所有 $\rho\in(0,1)$ 的有限开链结论。

要讨论物理空间切口的熵，还须指定多体哈密顿量、填充及态；若选择粒子数守恒的 Slater 基态，须构造其实际占据投影 $P_{\mathrm{occ}}$，并对选定格点子集 $I$ 取关联矩阵压缩 $\chi_I P_{\mathrm{occ}}\chi_I$，其中 $\chi_I$ 投影到这些格点。Moustaj–Krebbekx–Morais Smith 的 *Anomalous Polarization in One-dimensional Aperiodic Insulators*（[doi:10.3390/condmat10010003](https://doi.org/10.3390/condmat10010003)，§IV–V、§V.C 与附录 B）讨论含在位项的泵浦族及指定填充，其关联矩阵方法依赖所选 Slater／高斯态与子系统，不能直接移用于任意编码态。$\delta_{\rho,j}$ 只是单粒子能量到零的距离；多体激发隙还需填充、粒子数扇区与间隙约定。即使上述极限得到解决，也只触及谱隙前提：物理长度 $R$ 与内部窗坐标的对应、空间切口与劳齐边界的联系及熵标度，仍需另外建立；[@prob-ch39-p2e-fractal-horizon] 的完整问题仍然保留。
:::

::: {.remark #rem-ch39-p2e-tridiagonal-localization title="保留端点残差的三对角局部化（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 将一个整轴向量硬截成有限区段，会在区段两端留下残差；逐渐收窄的正弦权窗可以定量控制这项代价。Chandler-Wilde–Chonchaiya–Lindner，*On spectral inclusion sets and computing the spectra and pseudospectra of bounded linear operators*（[*J. Spectr. Theory* **14**, 719–804](https://doi.org/10.4171/JST/514)，§5.1，推论 5.2、5.4）给出如下工具。设 $A$ 是 $\ell^2(\mathbb{Z})$ 上的有界三对角算子，$M_\pm=\sup_{i\in\mathbb{Z}}|A_{i,i\pm1}|$；对任意非零定义域的有界算子 $B$，记 $\nu(B)=\inf_{\|x\|_2=1}\|Bx\|_2$。对每个整数 $n\ge1$，令 $E_{n,k}$ 为仅支撑在站点 $k+1,\ldots,k+n$ 上的向量空间，则

$$
\begin{aligned}
\inf_{k\in\mathbb{Z}}\nu\!\left(A|_{E_{n,k}}\right)
&\le \nu(A)+\varepsilon_n,\\
\varepsilon_n&=2(M_-+M_+)\sin\frac{\pi}{2(n+1)}.
\end{aligned}
$$

这里仅限制输入支撑，输出仍在整轴上：对应的 $(n+2)\times n$ 矩阵保留两条向外的残差行，不能将它换成丢弃这两行的 $n\times n$ 压缩。该式对位置取下确界；选取实际区段与单位向量时可保留任意正余量。它提供了 $1/n$ 量级的 $\ell^2$ 局部化工具，却尚未闭合前面的 Tribonacci 开链问题：还须证明相应整轴模型的零谱前提，并把连同一层邻接站点的实际词区段转植进指定的有限开前缀，核对长度比例与小尺度情形。这些接口在本书中仍未验证。
:::

另一条有限矩阵路线利用奇数长度的重复：奇数平移把偶数键与奇数键互换，前代入中的两串跃迁比值因而可以配对。下面的下界把这一抵消机制写成实际逆矩阵的定量结论。

::: {.theorem #thm-ch39-p2e-odd-repeat-inverse-mass title="奇数重复段的逆矩阵质量下界" lean="D5/S3/Quantum/Dynamics/OddSquareGreenMass.odd_square_inverse_paired_mass"}
设 $q\in\mathbb{N}$，$t:\mathbb{N}\to\mathbb{R}$ 满足对每个 $i\in\mathbb{N}$ 都有 $0<t(i)\le1$，并且

$$
t(i+2q+1)=t(i)\qquad(0\le i<2q).
$$

令 $n=2q+1$。下双对角矩阵 $L\in\mathbb{R}^{n\times n}$ 从零编号，其非零位置为

$$
\begin{aligned}
L_{i,i}&=t(2i) &&(0\le i<n),\\
L_{i+1,i}&=-t(2i+1) &&(0\le i<n-1).
\end{aligned}
$$

其余位置为零。记 $G=L^{-1}$；对 $0\le l<q$、$0\le d<q-l$，定义成对质量

$$
\begin{aligned}
P_{l,d}&=G_{l+d+1,l}\\
&\quad+G_{q+l+d+1,q+l+1}.
\end{aligned}
$$

则所有这些矩阵指标都在 $0,\ldots,2q$ 内，且

$$
q(q+1)\le\sum_{l=0}^{q-1}\sum_{d=0}^{q-l-1}P_{l,d}.
$$

$q=0$ 时两重求和为空，按零计。
:::

::: proof
正的对角元保证前代入给出实际逆矩阵。奇数重复使每对中的两个正项之积恰为 $1/[t(2l)t(2(l+d+1))]\ge1$，所以每对之和至少为 $2$。三角形指标域共有 $q(q+1)/2$ 对，求和即得下界。完整证明由 Lean 内核检查。
:::

若 $m=2q+1$、$s$ 为偶数，实际词满足 $W_{s+i+m}=W_{s+i}$（$0\le i<m-1$），且 $s+2m\le N_j$，则可取 $t(i)=t_{W_{s+i}}$ 来匹配这一矩阵模型及前缀内的 $2m$ 站点窗口。下面的定理从替代词本身给出所需窗口及其与前缀长度的统一比较。

::: {.theorem #thm-ch39-p2e-aligned-tribonacci-windows title="实际 Tribonacci 前缀中的均匀奇数重复窗口" lean="D5/S1/Words/TribonacciAlignedWindows.aligned_windows"}
对上述实际词 $W$、替代长度 $L_j=|\sigma^j(A)|$ 与偶数前缀长度 $N_j=2\lfloor L_j/2\rfloor$，存在自然数 $K>0$、$J\ge1$，使每个自然数 $j\ge J$ 都有自然数 $m,s$ 满足

$$
\begin{aligned}
m&\ge3,\qquad m\text{ 为奇数},\quad s\text{ 为偶数},\\
N_j&\le Km,\qquad s+2m\le N_j,\\
W_{s+i+m}&=W_{s+i}\qquad(0\le i<m-1).
\end{aligned}
$$

最后一行对范围内的每个自然数 $i$ 成立；常数 $K,J$ 不随 $j$ 改变。
:::

::: proof
形式证明取 $K=128$、$J=4$。第四次替代中的两份 $ABA$ 提供重复块，四步替代保持三个字母像长度的奇性，从而给出奇数块长与偶数起点。非空尾段保证向下取偶数后仍包含整个窗口，七步长度增长给出因子 $128$。下面的例子展开这一构造；完整证明由 Lean 内核检查。
:::

::: {.example #ex-ch39-p2e-aligned-tribonacci-windows title="奇数重复窗口的显式构造"}
对每个 $j\ge4$，令 $r=\lfloor(j-4)/4\rfloor$、$k=4r$，于是 $k+4\le j\le k+7$。将第四次替代写成四段：

$$
\sigma^4(A)=ABAC\,\vert\,ABA\,\vert\,ABA\,\vert\,CAB.
$$

记 $a=\sigma^k(A)$、$b=\sigma^k(B)$、$c=\sigma^k(C)$，竖线表示拼接而非额外字母。再施加 $k$ 次替代，得到

$$
\sigma^{k+4}(A)=(abac)\,(aba)\,(aba)\,(cab).
$$

取 $s=|abac|$、$m=|aba|$。在每个四的倍数层，$a,b,c$ 的长度均为奇数：零层长度都是 $1$；第四次替代的三个字母像分别含 $13,11,7$ 个字母，故四步替代保持这三个长度的奇性。于是 $s$ 为偶数，$m\ge3$ 为奇数，且两份 $aba$ 给出所需的重复等式。尾段 $cab$ 非空，故将前缀长度向下取偶数仍保留整个重复窗口。每步替代至多使长度翻倍，因此

$$
\begin{aligned}
N_j&\le L_j\le L_{k+7}\le128L_k\le128m,\\
s+2m&\le N_j,\\
W_{s+i+m}&=W_{s+i}\qquad(0\le i<m-1).
\end{aligned}
$$

这里 $s,m$ 都是非负整数；常数 $128$ 与 $j$ 及跃迁参数 $\rho$ 无关。这给出 [@thm-ch39-p2e-aligned-tribonacci-windows] 中常数与窗口的具体选择。
:::

::: {.example #ex-ch39-p2e-full-inverse-euclidean title="从局部质量到完整逆矩阵的欧氏估计"}
取正且不超过 $1$ 的跃迁序列 $t$，令 $G=L(t,n)^{-1}$ 为上述双对角块的完整逆矩阵。设整数 $q\ge1$、$a\ge0$ 满足 $a+2q+1\le n$，并且

$$
t\bigl(2a+i+(2q+1)\bigr)=t(2a+i)\qquad(0\le i<2q).
$$

令 $x=(1,\ldots,1)\in\mathbb R^n$，$v=x/\sqrt n$。所有范数都取欧氏范数，则

$$
\|v\|_2=1,\qquad q(q+1)\le 2n\|Gv\|_2.
$$

这里的逆矩阵保留窗口两侧的所有外部站点。前代入给出的逆元公式说明：把局部逆矩阵的行、列同时平移 $a$，恰得到 $G$ 中对应的元素。由于 $G$ 的所有元素非负，[@thm-ch39-p2e-odd-repeat-inverse-mass] 的两个三角区域各自嵌入全矩阵后，给出

$$
q(q+1)\le2\sum_{i,j=0}^{n-1}G_{ij}.
$$

因子 $2$ 允许分别控制这两个区域，无须额外证明它们互不重叠。另一方面，柯西—施瓦茨不等式给出

$$
\begin{aligned}
\sum_{i,j=0}^{n-1}G_{ij}&=\langle x,Gx\rangle,\\
&\le\|x\|_2\|Gx\|_2,\\
&=n\|Gv\|_2.
\end{aligned}
$$

合并即得所示估计。对前述窗口，参数对应为 $m=2q+1$、$s=2a$、$N_j=2n$。这是既有逆矩阵质量结论、前代入公式和欧氏不等式的应用推导，不新增形式化声明，本例不带独立的 Lean 验证徽章。
:::

::: {.example #ex-ch39-p2e-open-chain-residual title="从完整逆矩阵到有限开链的谱残差界"}
对整数 $n\ge1$，取实跃迁序列 $t:\mathbb N\to\mathbb R$，满足每个 $k\in\mathbb N$ 都有 $t_k>0$。在按自然数从零编号的 $2n$ 个站点上，定义实际开链矩阵 $H\in\mathbb R^{2n\times2n}$：

$$
H_{ij}=\begin{cases}
t_i,&i+1=j,\\
t_j,&j+1=i,\\
0,&\text{其他情形},
\end{cases}
\qquad 0\le i,j<2n.
$$

它的对角线为零，最后一条物理键为 $t_{2n-2}$，没有首尾闭合键；$n=1$ 时就是仅含键 $t_0$ 的两个站点。令 $B=L(t,n)$ 为前述下双对角块，即

$$
\begin{aligned}
B_{i,i}&=t_{2i} &&(0\le i<n),\\
B_{i,i-1}&=-t_{2i-1} &&(1\le i<n),
\end{aligned}
$$

其余元素为零。下三角性给出 $\det B=\prod_{i=0}^{n-1}t_{2i}>0$，故普通矩阵逆 $G=B^{-1}$ 存在。对每个欧氏单位向量 $v\in\mathbb R^n$，都存在实数 $\lambda$ 和非零实向量 $z\in\mathbb R^{2n}$，使

$$
\begin{aligned}
Hz&=\lambda z,\\
|\lambda|\,\|Gv\|_2&\le1.
\end{aligned}
$$

具体地，按偶站点、奇站点重排坐标，写 $C_{ij}=H_{2i,2j+1}$。矩阵 $C$ 的对角元为 $t_{2i}$，次对角元为 $t_{2i-1}$，其余元素为零。取 $D=\operatorname{diag}((-1)^i)_{i=0}^{n-1}$，则 $D^2=I$，且逐项计算得到

$$
\begin{aligned}
H&=\begin{pmatrix}0&C\\C^{\mathsf T}&0\end{pmatrix},\\
DCD&=B,\qquad CD=DB.
\end{aligned}
$$

第一行表示重排后的矩阵。构造辅助向量 $u$，令 $u_{\mathrm{even}}=0$、$u_{\mathrm{odd}}=DGv$。由 $BG=I$，

$$
\begin{aligned}
(Hu)_{\mathrm{even}}&=CDGv=DBGv=Dv,\\
(Hu)_{\mathrm{odd}}&=0,\\
\|u\|_2&=\|Gv\|_2,\qquad \|Hu\|_2=1.
\end{aligned}
$$

这里 $D$ 只改变坐标符号，保持欧氏范数；$BGv=v\ne0$ 还保证 $u\ne0$。由于 $H$ 是有限维实对称矩阵，取它的实正交归一特征基 $e_k$，对应实特征值 $\lambda_k$（$0\le k<2n$）。令 $\alpha=\min_{0\le k<2n}|\lambda_k|$，将 $u=\sum_k c_ke_k$ 代入 Parseval 恒等式，得到

$$
\begin{aligned}
\alpha^2\|u\|_2^2
&=\alpha^2\sum_{k=0}^{2n-1}c_k^2,\\
&\le\sum_{k=0}^{2n-1}\lambda_k^2c_k^2
=\|Hu\|_2^2=1.
\end{aligned}
$$

有限的非空特征值集合中存在 $k_0$ 使 $|\lambda_{k_0}|=\alpha$。取 $\lambda=\lambda_{k_0}$、$z=e_{k_0}$，开平方即得所示不等式。$z$ 是选出的特征向量，辅助向量 $u$ 一般并不是特征向量。本例不要求跃迁有上界。

若还满足 [@ex-ch39-p2e-full-inverse-euclidean] 的上界与重复窗口假设，使用其中同一个单位向量 $v$，便有

$$
\begin{aligned}
|\lambda|q(q+1)
&\le2n|\lambda|\,\|Gv\|_2\le2n,\\
\delta:=\min_{\mu\in\operatorname{Spec}(H)}|\mu|
&=|\lambda|\le\frac{2n}{q(q+1)}.
\end{aligned}
$$

这把完整逆矩阵的质量估计转成同一有限开链到零能量的谱距离界。
:::

上例完成了任意正跃迁有限开链的谱转换。实际 Tribonacci 前缀的全序列速率仍需把字跃迁 $t_i=t_{W_i}$、对齐重复窗口与完整逆矩阵质量估计在同一参数约定下精确拼接，并处理最初的短前缀。本节尚未建立：对每个固定 $\rho\in(0,1)$，存在 $C_\rho>0$ 与整数 $J_\rho\ge1$，使所有 $j\ge J_\rho$ 都满足 $\delta_{\rho,j}\le C_\rho/N_j$。这样的定量界可推出前述开链极限；分形熵标度仍需独立的物理态与空间切口论证。

::: {.viz src="pisot-clifford-rauzy-sandtable" preset="entropy" height="500"}
**帕里平稳权重、有限逃逸对与回归熵对照卡（`entropy`）**：分栏呈现有向重置链的青色帕里平稳分布权重 $\pi_K$、有限观测竞技场中被品红标出的未区分逃逸对 $E(S)$，以及单独标注依据等级的移位熵 $\log_2\beta_K$ 与诱导回归熵读数；琥珀色标出当前选定的阶数 $K$，红色标签标示分形视界标度开放问题（[@prob-ch39-p2e-fractal-horizon]）。平稳律与逃逸对计数属 `LEAN ✓`，移位熵与阿布拉莫夫公式属 `文献结果`，分形面积律属 `OPEN`。
:::

至此，我们可以把本节审视的全部八项概念汇总在一张无折行认识论总表之中，使每一环的形式内核、文献依托与诠释边界清晰对齐：

| 八概念环节 | 精确数学对象与代表性冻结声明 | 认识论等级与边界定位 |
| :--- | :--- | :--- |
| **1. 齐肯多夫禁邻语言** | $K = 2$ 禁相邻 `11` 自动机 [`base_success_iff_noAdjacentOnes`](lean:D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes)（[@thm-ch39-fiber-reconstruction-and-zeckendorf-thread] 第 3 款）与合法字计数 [`dbonacci_name_card`](lean:D5/S0/Tower/DBonacci/Names.dbonacci_name_card)（$F_{Q+2}$）及短前缀全满律 [`dbonacci_name_card_of_lt`](lean:D5/S0/Tower/DBonacci/Names.dbonacci_name_card_of_lt) | `LEAN ✓`（注意 `List (Fin 2)` 与 `Fin Q → Bool` 载体转换） |
| **2. $K$-Bonacci 皮索谱** | 特征多项式 $P_K(X)$ 整/有理不可约 [`dbonacci_irreducible`](lean:D5/S0/Tower/DBonacci/Irreducibility.dbonacci_irreducible)、主根恒等式 $2-\beta_K=\beta_K^{-K}$ [`two_sub_dbonacciPerronRoot_eq_inv_pow`](lean:D5/S0/Tower/DBonacci/PerronRoot.two_sub_dbonacciPerronRoot_eq_inv_pow)、极限 $\beta_K \to 2$ [`dbonacciPerronRoot_tendsto_two`](lean:D5/S0/Tower/DBonacci/PerronRoot.dbonacciPerronRoot_tendsto_two) 与复共轭单位圆盘收缩 [`dbonacci_complex_root_location`](lean:D5/S0/Tower/DBonacci/Irreducibility.dbonacci_complex_root_location)（[@thm-ch39-p2e-kbonacci-pisot]） | `LEAN ✓`（代数根定位定理）；具体小数 $\beta_3 \approx 1.839287$ 属 `NUM` |
| **3. $p$ 进余数树与超度量** | 模 $p^k$ 首次区分精度 $v_p(x-y)+1$ [`first_distinguishing_precision`](lean:D5/S3/Arith/Congruence/PadicPrecisionBlindSpot.first_distinguishing_precision)、观测距离 [`observation_distance_eq_padic_valuation`](lean:D5/S3/Arith/Congruence/PadicObservationDistance.observation_distance_eq_padic_valuation)、同余纤维交集 [`congruenceFiber_eq_closedBall_inter_range`](lean:D5/S3/Arith/Congruence/PadicBallFiberCorrespondence.congruenceFiber_eq_closedBall_inter_range) 与有限视界细化超度量 [`refinementDistance_ultrametric`](lean:D5/S3/ConceptDynamics/RefinementGeometry/RefinementUltrametric.refinementDistance_ultrametric)（[@thm-ch39-p2e-padic-readout]） | `LEAN ✓`（各自独立成立）；$p$ 进树与 $K$-Bonacci 树的跨系统并置属 `MODEL` |
| **4. $K=3$ 劳齐分形内窗** | 零次幂内窗非空内点 [`rauzyFractal_interior_nonempty`](lean:D5/S3/Geometry/Rauzy/TribonacciInterior.rauzyFractal_interior_nonempty)、正则闭集 [`rauzyFractal_closure_interior`](lean:D5/S3/Geometry/Rauzy/TribonacciRegularClosure.rauzyFractal_closure_interior)、三支前缀精确自覆盖 [`rauzyFractal_prefix_cover`](lean:D5/S3/Geometry/Rauzy/TribonacciRegularClosure.rauzyFractal_prefix_cover)（[@thm-ch39-p2e-rauzy-regular-window]）与二维零测边界 [`rauzyFractal_frontier_volume_zero`](lean:D5/S3/Geometry/Rauzy/TribonacciNullBoundary.rauzyFractal_frontier_volume_zero)（[@thm-ch39-p2e-rauzy-null-boundary]） | `LEAN ✓`（集合与平面面积零测）；拼砖、圆盘连通性与 $\dim_H \partial\mathcal{R}_3 \approx 1.09336$ 属 `文献结果` + `NUM`（[@rem-ch39-p2e-rauzy-literature]） |
| **5. 克利福德线—面分解** | 三次闵可夫斯基实线性坐标嵌入 $E_\parallel^1 \oplus E_\perp^2$ 与内部复平面缩放旋子 $\beta_3^{-1/2}(\cos\vartheta + B_\perp\sin\vartheta)$ | `MODEL`（需显式声明基与度规，观察者线—面词典见 [@rem-ch39-p2e-unification-model]） |
| **6. 自指收缩尺度对照** | 正实轴余弦端点 $\cos\theta^* = \theta^*$ [`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint) 与三阶共轭范数 $|\alpha| = \beta_3^{-1/2}$ [`tribonacci_secondary_root_mul_conjugate`](lean:D5/S3/Constants/Irrationality/TribonacciTraceLattice.tribonacci_secondary_root_mul_conjugate) | `LEAN ✓`（各自端点与恒等式）+ `文献结果`（$\theta^*$ 超越性）+ `NUM`（$\approx 0.234\%$ 数值邻近，严格不等）+ `MODEL`（$\psi=\psi(\psi)$ 母题，[@ex-ch39-p2e-pisot-dottie-numerics]） |
| **7. 跨切口编码纠缠秩** | 跨切口条件 $\tau(x)+\iota(y)<K$ 下的可达页秩充要矩形 $1 \le r_b \le R_b$ 与最大页熵 $\ln R_b$ [`complete_original_direct_rank_entropy`](lean:D5/S3/Quantum/Entanglement/KBonacciDirectRankEntropy.complete_original_direct_rank_entropy)（[@thm-ch39-p2e-direct-encoder-ranks]）及谱阻塞 [`actual_encoder_spectral_obstruction`](lean:D5/S3/Quantum/Entanglement/KBonacciDirectSupportObstruction.actual_encoder_spectral_obstruction) | `LEAN ✓`（秩等于 $K$ 仅在 $K \le R_b$ 时条件可达，非普适恒等）+ `NUM`（如 $R_0=6, R_1=5$）+ `文献结果`（黄金链与里德堡实验，[@rem-ch39-p2e-rydberg-anyon-literature]） |
| **8. 平稳核、逃逸对与熵** | 有向重置链帕里平稳律 [`parry_stationary_law`](lean:D5/S3/TotalVariation/ParryResetLaw.parry_stationary_law)（[@thm-ch39-p2e-parry-escape-laws]）、边界柱集不等式 [`parry_boundary_cylinder_bound`](lean:D5/S3/TotalVariation/ParryBoundaryCylinderBound.parry_boundary_cylinder_bound) 与有限逃逸对判据 [`lowersEscape_iff_uniqueCaptureCount_pos`](lean:D5/S3/ConceptDynamics/InformationEscape/ExactRate.lowersEscape_iff_uniqueCaptureCount_pos) | `LEAN ✓`（有限与马尔可夫定律）+ `文献结果`（$\log_2\beta_K$ 与阿布拉莫夫公式，[@rem-ch39-p2e-abramov-literature]）+ `OPEN`（分形视界纠缠标度，[@prob-ch39-p2e-fractal-horizon]） |

当我们在下面的综合实验室中把阶数从 $K = 2$ 拨向 $K = 3$ 再继续上推时，整章自指本体论 $\psi \equiv \psi(\psi)$ 的多切面几何结构便清清楚楚地浮现出来：$K = 2$ 时内部收缩空间还只是一条实轴线段；跨入 $K = 3$ 的瞬间，复共轭根在二维正交平面上旋出三支精确自覆盖、平面边界零测的劳齐分形内窗；而在每一个阶数上，已被 Lean 内核锁定的离散计数、多项式根圆盘、细化超度量、可达纠缠秩矩形与帕里平稳核构成了坚硬的绿色骨架，支撑起周围明确标界的经典文献、数值实验与跨学科几何诠释。至此，全书正文三十九章的攀登已至峰顶——让我们推开最后一道门扉，步入[终章](coda.md)《在所有的球之外》。

::: {.viz src="pisot-clifford-rauzy-sandtable" height="640"}
**交互实验室 `ORTHO//RAUZY`**：齐肯多夫、皮索与劳齐八概念综合沙盘。自由切换上表对应的八个预设场景、调节阶数 $K$、素数基数 $p$、字长视界与三维观察视角，并直接拖拽物理轴与内部平面上的分解点：实时核对禁 $1^K$ 合法字计数、皮索共轭根单位圆盘收缩、模 $p^k$ 余数树首次区分层级、$K = 3$ 劳齐内窗三支仿射覆盖（及 $K = 4$ 内部坐标采样云）、$\theta^*$ 与 $|\alpha|_{K=3}$ 的数值比对、跨切口可达秩矩形 $[1, R_0] \times [1, R_1]$，以及帕里平稳分布与有限逃逸对账本。绿色依据框严格对应 Lean 已验证定理，文献结论、数值计算、诠释模型与开放问题分别按各自标签独立标示。
:::
