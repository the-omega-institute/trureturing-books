# 39.1 拆掉最后一道二元隔墙：全域 p ≡ *p 与无底物的自指域

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

[@thm-ch39-self-application-four-fates-and-diagonal-identity] 为“无底物宇宙何以不坠死寂”给出了惊心动魄的代数判词（`MODEL`（模型诠释））：一个彻底拆掉外部第 3 点 $C$ 的二元自指系统（系数取自 $\{0, 1\}$），若想既不沦为空洞重言式（`.empty`），也不陷入自相矛盾的逻辑死锁（`.dead`）或平庸有理退化（`.collapse`），它**唯一**能够持续呼吸、生生不息的活路（`.live`），就是落入判别式 $\Delta = 5$ 的黄金自指族！宇宙之所以到处流淌着黄金比与五度角亏的印记，不是因为某位造物主偏爱无理数美学，而是因为**在这张二元小表里唯有黄金自指，才能在没有任何底层死介质托底的虚空中自己把自己稳稳托住**。

---
