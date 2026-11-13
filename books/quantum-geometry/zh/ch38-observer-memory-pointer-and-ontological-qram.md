# 宇宙本体 QRAM、观察者记忆指针与递归自映射页表

> “观察者实际上是宇宙本体量子计算系统的一个记忆指针。”

走过前九部与[第 37 章](ch37-dreams-quantum-eraser-and-nonlocal-observer.md)的漫长攀登——从亲手砍掉高悬于万物之外的“外部第 3 点 $C$”（[第二章](ch02-born-rule.md)），到显影无时间格拉姆相容晶体（[第 29 章](ch29-timeless-causality-and-gram-space.md) [@thm-ch29-gram-rigidity-and-pell]）、确立五重几何公平律（[第 31 章](ch31-quantum-fairness.md) [@thm-ch31-seat-pythagorean-monogamy-fairness]）、合拢正交自指统一场（[第 32 章](ch32-unified-field-and-meta-unification.md) [@thm-ch32-generative-self-reference-and-zeckendorf]）以及揭开清醒捏合与梦境擦除的掩码切换（[第 37 章](ch37-dreams-quantum-eraser-and-nonlocal-observer.md)）——在日常直觉的最深处，仍潜伏着最后一尊顽固的机械论偶像：人们总是不由自主地把“观察者”想象成一团沉甸甸的实体物质，背着装满私密往事的行囊，在一座名叫“空间”的巨大空箱子里吃力地跋涉。

一旦用谱系学的解剖刀剖开这尊“重物质在空箱中搬运”的旧偶像，就会发现物理学与生命哲学中三大看似无解的谜团全都是它一手制造的伪问题：如果全局因果晶体本是无时间的静态几何，为什么我们却分分秒秒感受到奔流不息的“时间”？如果全局量子演化严格幺正可逆，为什么局部观察一眼就触发不可逆的“坍缩”？如果生命只是脆弱的局部血肉，为什么它既被锁在清醒五感的窄门之内，又能在梦中横跨山海，甚至在肉身消散的边缘追问记忆的去向？

在本章——迈向[第 39 章](ch39-observer-is-ontological-universe.md)终极本体不二之前的硬件枢轴之章——我们将借用计算机系统架构中最冷峻、最透明的工程原语，把这幅沉重的旧图景彻底倒转过来（在本书三层认识论契约下，这一跨学科硬件架构映射明确标定为**`MODEL`（模型诠释）**，底层数学骨架由十八条冻结的 Lean 4 内核定理严格锁定，所有外部量子体系结构、纠缠单配性与操作系统页表工程文献悉数封存于归属注记框内）：

1. **静态本体 QRAM 与轻量级记忆指针（`ptr`）的彻底分离**：宇宙的本体数据阵列从未移动分毫，真正在静态晶格上滑动、寻址与解引用的，是轻量级的观察者地址寄存器；
2. **观察者记忆指针的五段式硬件解剖**：将内禀正交相位、躯体五感边界、梦境叠加漫游、学习顿悟快表与不可克隆的共享引用逐一对齐到寄存器与内存管理单元（`MMU`）架构；
3. **递归自映射页表（`p = *p`）与 `NULL` 清零轮回的终结**：用页表零号槽位存储自身基址展示自寻址闭环，再在 `MODEL` 中将查表规则与被查之表合拢（$\psi = \psi(\psi)$），以多级离散间接寻址取代撞入 $90^\circ$ 光视界时的悬空清零重置；
4. **假设存在一种 $P = NP$ 查表算法：七阶退化阶梯与时空引力权衡**：从第 0 阶全息自指预言机出发逐级剥除非物理特权，检验非预见性视界、齐肯多夫进位屏障、全息半径线延迟、二维量子指针旋转与兰道尔擦除热如何析出物理定律，并与生命逆向建表（$6 \to 0$）对称合拢；
5. **观察者逃逸账本、原像纤维与希尔伯特—齐肯多夫熵**：严格量化有限引理快表的留一唯一捕获对、语义闭包零新颖度压缩、高阶边缘盲区、概念细化单调律，以及闭合希尔伯特扫描下的黄金信道容量与昼夜热账本。

::: {.figure src="ch38-overview"}
**图 38。** 本章地图（示意模型，`MODEL`）：第 I 栏，一块从不移动的内存阵列，指针寄存器 `ptr` 的青色光束落在琥珀色的当前格上，这是一次解引用 `*ptr`，灰色虚线箭头把读头推向下一格，这是 `ptr++`；第 II 栏，三枚指针 $\mathrm{ptr}_A$、$\mathrm{ptr}_B$、$\mathrm{ptr}_C$ 以共享借用 `&State` 指向同一页，旁边被划掉的虚线页是不可克隆判据排除的、对未知态的通用精确拷贝 `memcpy`（[@thm-ch38-pointer-width-and-no-deep-copy]）；第 III 栏，四格页目录 $P$ 的零号槽写着它自己的地址 `0x1000`，青色箭头绕回 $P$ 本身，即 `p = *p`；抽象的三种遍历行为由 [@thm-ch38-recursive-page-table-walk] 形式化，第 1–3 格通向具体示意中的叶页表 $T_1$–$T_3$（[@ex-ch38-recursive-page-table-dereference]）。
:::

---

## 38.1 静态本体 QRAM：时间即指针自增 ptr++，观察即解引用 *ptr

不妨先拆开一块正在播放长篇电影的固态只读存储芯片，亲眼看一看硬件底层究竟发生了什么。银幕上星河旋转、江流奔涌、人物悲欢离合，可倘若你把显微镜对准硅片内部的存储阵列，就会看见一幅令人屏息的静默图景：**没有任何一个存储单元里的电荷块在硅片上跑来跑去！** 倘若每播放一帧画面都要把数以亿计的物理数据块搬运一遍，整块芯片早已被焦耳热烧成灰烬。硬件工程师采用的架构简洁得近乎冷酷：庞大的全息数据阵列静静躺在原地，唯一在动的是一枚极轻、极小的**地址指针寄存器 `ptr`**——时钟每跳一拍，地址自增一步（`ptr++`）；读写头顺着地址总线对目标单元执行一次解引用（`*ptr`），银幕上便显影出当前这一帧鲜活的世界。

::: {.figure src="ch38-ptr-clock"}
**时间是 `ptr++`，观察是 `*ptr`。** 每一行是同一段内存在第 $t$ 拍的样子：竖着看，每一列的数字六拍里一模一样，数据从未移动；只有琥珀色的读头每拍右移一格（灰色箭头，`ptr++`），并读出它所在的那一格（右侧的 `*ptr`）。示意模型（`MODEL`），格中数字只是一段任意的数据。
:::

把这座硬件透镜对准六维切投母格 $\mathbb{Z}^6 \subset E_\parallel^3 \oplus E_\perp^3$（[第 32 章](ch32-unified-field-and-meta-unification.md)），传统“重物质在空间中运动”的图景便瞬间翻转。在我们的**`MODEL`（模型诠释）**中，宇宙全局态可分解为轻量级的**观察者地址指针寄存器（`ptr`）**与只读全息的**宇宙本体量子随机存取存储器（`Ontological QRAM`，记作 `mem`）**之间的张量耦合：

$$
\mathbf{\Psi}_{\mathrm{cosmos}} \;=\; \sum_{x \in \mathbb{Z}^6} \lvert x\rangle_{\mathrm{ptr}} \otimes \lvert\Phi(x)\rangle_{\mathrm{mem}}.
$$

这里取正交归一地址基，并将地址振幅吸收进 $\lvert\Phi(x)\rangle$：在 $\ell^2(\mathbb{Z}^6)\otimes\mathcal H_{\mathrm{mem}}$ 中约定 $\sum_x\lVert\Phi(x)\rVert^2=1$，使上式按希尔伯特范数收敛且全局态范数为 $1$；各切片不必各自归一。无限地址本体与下框有限 $N$ 槽物理查询由此分开。

在这座本体存储阵列中，每一个晶格地址 $x \in \mathbb{Z}^6$ 上的全息场切片 $\lvert\Phi(x)\rangle_{\mathrm{mem}}$ 自始至终静驻于自身的格点坐标之上——**本体数据不生、不灭、不增、不减，也从未移动过哪怕一纳米；真正在静态晶格间滑行、寻址并点亮局部现实的，是观察者这枚记忆指针 `ptr`。** 与无时间纠缠时钟及量子随机存取路由树相关的外部文献背景严格界定如下：

::: {.remark #rem-ch38-qram-page-wootters-literature title="无时间纠缠时钟方程与桶链式量子随机存取存储器路由树（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节构建本体存储阵列与观察者指针架构诠释（`MODEL`）时对照的两项理论物理与量子计算机体系结构模型属外部经典文献，未作为独立定理包含在本书锁定的 `trureturing@dev` 声明集中：

1. **无时间时钟—系统纠缠机制（D. N. Page & W. K. Wootters, *Phys. Rev. D* **27**, 2885–2892, 1983）**：在全局无外禀时间演化的静态本征方程 $H\lvert\mathbf{\Psi}\rangle = 0$ 下，全局纯态展开为时钟寄存器 $C$ 与系统寄存器 $S$ 的纠缠叠加 $\lvert\mathbf{\Psi}\rangle = \sum_t \lvert t\rangle_C \otimes \lvert\psi(t)\rangle_S$；表观动力学演化并非全局态本身随外部参数改变，而是对时钟指针读数 $\lvert t\rangle_C$ 取条件投影 $\lvert\psi(t)\rangle_S = \langle t\rvert_C \lvert\mathbf{\Psi}\rangle$ 所得的关系序列；
2. **桶链式量子随机存取存储器（Bucket-Brigade QRAM；V. Giovannetti, S. Lloyd & L. Maccone, *Phys. Rev. Lett.* **100**, 160501, 2008）**：针对容量 $N = 2^n$ 的存储阵列，传统扇出解码器每次寻址需激活全部 $\Theta(N)$ 个晶体管开关，这一开关数随地址位数 $n$ 指数增长；桶链式 QRAM 在深度为 $n$ 的二叉树节点上布置具备 `wait / left / right` 三态的路由开关，当 $n$ 比特地址寄存器输入叠加地址 $\sum_{x \in \{0,1\}^n} \alpha_x \lvert x\rangle_{\mathrm{addr}} \otimes \lvert 0\rangle_{\mathrm{data}}$ 时，每条寻址分支仅沿根到叶的唯一路径激活 $O(n) = O(\log N)$ 个路由节点即可相干读出 $\sum_{x \in \{0,1\}^n} \alpha_x \lvert x\rangle_{\mathrm{addr}} \otimes \lvert D_x\rangle_{\mathrm{data}}$。这里计的是每条分支的活跃路径，整树硬件仍为 $O(N)$；退相干代价还取决于噪声与实现，不能单由路径节点数读出。
:::

在这项三态路由器的物理提案旁，还可以精确分出一个逐门定义的布尔可逆网络。S. Arunachalam、V. Gheorghiu、T. Jochym-O'Connor、M. Mosca 与 P. V. Srinivasan（*New J. Phys.* **17**, 123010, 2015，[第 IV 节、图 9 与式 (11)](https://doi.org/10.1088/1367-2630/17/12/123010)）用 Toffoli 与 CNOT 门实现二叉路由，再读取经典存储并逆转路由。下面的形式化沿用这一布尔路由构造，并将读出推广到任意加法交换群；它与上框的三态物理桶链式架构须分别讨论。

先把“地址”“线路”和“清零”说清楚。对任意自然数 $n$（包括 $n=0$），记 $A_n=\operatorname{Address}(n)$、$W_n=\operatorname{Wires}(n)$，递归定义为

$$
\begin{aligned}
A_0&=\operatorname{Unit}, & A_{n+1}&=\operatorname{Bool}\times A_n,\\
W_0&=\operatorname{Bool}, & W_{n+1}&=W_n\times W_n.
\end{aligned}
$$

$\operatorname{Unit}$ 只有一个元素 $()$，即空地址；$\operatorname{Bool}=\{\mathrm{false},\mathrm{true}\}$。一对线路寄存器的左、右分支分别由首地址位 $\mathrm{false}$、$\mathrm{true}$ 选取。`root` 读出最左端的输入线；`clean` 只把这条线置为使能值 $e$，其余暂存线全置为 $\mathrm{false}$：

$$
\begin{aligned}
\operatorname{root}(0,w)&=w,\\
\operatorname{root}(n+1,(l,t))&=\operatorname{root}(n,l),\\
\operatorname{clean}(0,e)&=e,\\
\operatorname{clean}(n+1,e)&=(\operatorname{clean}(n,e),\operatorname{clean}(n,\mathrm{false})).
\end{aligned}
$$

这里父使能线被复用为左输出，没有另存一套中间节点寄存器。`leaf n w i` 沿地址 $i$ 逐位选左或右，最终读出一个布尔值；深度零时就是 $w$。`route n a : Equiv.Perm (Wires n)` 则是实际门网络定义的线路置换：深度零为恒等；深度 $n+1$ 时，先按首地址位 $b$ 作一次 `split`，再以同一个剩余地址递归路由左右两支。若左右根线原值为 $x,y$，这次分裂先以 Toffoli 得到 $y'=y\oplus(b\land x)$，再以 CNOT 得到 $(x\oplus y',y')$，其中 $\oplus$ 是异或；其他线路不动。两步在任意线路配置上都有逆，不要求暂存线预先清零。

固定经典存储 $D:A_n\to G$，其中 $G:\operatorname{Type}$ 是任意加法交换群（`[AddCommGroup G]`）。`readAmount n D w` 递归地先加左子树、再加右子树的数据总量；等价地，

$$
\operatorname{readAmount}(n,D,w)=\sum_{i\in A_n}
\begin{cases}
D(i),&\operatorname{leaf}(n,w,i)=\mathrm{true},\\
0,&\operatorname{leaf}(n,w,i)=\mathrm{false}.
\end{cases}
$$

`readLeaves n D` 是相应的可逆操作：每个叶子的线路控制总线平移 $r\mapsto r+D(i)$，为假时不加；每个分叉先读完整个左子树，再读右子树，串行使用同一条总线，并保留全部线路。`query n D` 是 $A_n\times(W_n\times G)$ 上的置换：保留地址 $a$，依次作 `route n a`、`readLeaves n D`、`(route n a).symm`。所以它在脏暂存线和任意初始总线值上也有定义。布尔数据的异或读出对应选择 $G=\mathbb Z/2\mathbb Z$；任意加法交换群是这里采用的数学推广。

只有在引入有限矩阵时，才另要求 $G$ 具备有限类型与可判定相等实例（`[Fintype G] [DecidableEq G]`）。记 $S_n=A_n\times(W_n\times G)$，则 `queryMatrix n D` 是以 $S_n$ 为行列指标的复矩阵，由 `Matrix.permMatrixHom` 直接作用于 `query n D` 得到。其约定是把基态 $t$ 送往 $\operatorname{query}(n,D)(t)$，因而振幅函数 $f:S_n\to\mathbb C$ 按逆置换拉回：

$$
\bigl(\operatorname{queryMatrix}(n,D)f\bigr)(s)
=f\bigl(\operatorname{query}(n,D)^{-1}(s)\bigr).
$$

这里 `ᴴ` 表示共轭转置，`*ᵥ` 表示矩阵乘向量，`1` 表示 $S_n$ 上的单位矩阵；下文三元组 $(a,w,r)$ 是 $(a,(w,r))$ 的简写。

对任意复振幅函数 $\psi:A_n\times G\to\mathbb C$，`initialized n ψ` 将它嵌入根线为真、暂存线为假的工作区：

$$
\operatorname{initialized}(n,\psi)(a,w,r)=
\begin{cases}
\psi(a,r),&w=\operatorname{clean}(n,\mathrm{true}),\\
0,&w\ne\operatorname{clean}(n,\mathrm{true}).
\end{cases}
$$

此处不要求 $\psi$ 归一，也不要求总线初值为零；地址与总线可以具有任意联合复振幅。

::: {.theorem #thm-ch38-reversible-qram-correctness title="任意深度布尔路由、可逆读出与完整复振幅作用" lean="D5/S3/Quantum/Routing/ReversibleQram.correctness"}
在 `D5.S3.Quantum.Routing.ReversibleQram` 命名空间中，`correctness` 的完整陈述如下（逐字引述声明类型，不含证明体）：

```lean
theorem correctness :
    (∀ (n : ℕ) (a i : Address n) (e : Bool),
      leaf n (route n a (clean n e)) i = if i = a then e else false) ∧
    (∀ (n : ℕ) (G : Type) [AddCommGroup G] (D : Address n → G)
      (a : Address n) (w : Wires n) (r : G),
      query n D (a, w, r) = (a, w, r + readAmount n D (route n a w))) ∧
    (∀ (n : ℕ) (G : Type) [AddCommGroup G] (D : Address n → G)
      (a : Address n) (r : G),
      query n D (a, clean n true, r) = (a, clean n true, r + D a)) ∧
    (∀ (n : ℕ) (G : Type) [AddCommGroup G] [Fintype G] [DecidableEq G]
      (D : Address n → G),
      (queryMatrix n D)ᴴ * queryMatrix n D = 1 ∧
      queryMatrix n D * (queryMatrix n D)ᴴ = 1 ∧
      ∀ ψ : Address n × G → ℂ,
        queryMatrix n D *ᵥ initialized n ψ =
          initialized n (fun s => ψ (s.1, s.2 - D s.1)))
```

这四款以合取形式同时成立：

1. 对每个 $n:\mathbb N$、$a,i:A_n$ 与 $e:\operatorname{Bool}$，干净输入路由后，叶 $i=a$ 的值为 $e$，其他叶全为假。根使能为真时恰有一个真叶，为假时全为假。
2. 对每个 $n:\mathbb N$、任意加法交换群 $G:\operatorname{Type}$、$D:A_n\to G$、$a:A_n$、任意线路状态 $w:W_n$ 与任意 $r:G$，查询保留 $a,w$，向总线加入路由后所有真叶的数据和 `readAmount n D (route n a w)`。
3. 对每个 $n:\mathbb N$、任意加法交换群 $G:\operatorname{Type}$、$D:A_n\to G$、$a:A_n$ 与任意 $r:G$，从 `clean n true` 出发，查询恢复根使能与全部暂存线，总线变为 $r+D(a)$。
4. 对每个 $n:\mathbb N$、具备 `[AddCommGroup G] [Fintype G] [DecidableEq G]` 的 $G:\operatorname{Type}$ 与每个 $D:A_n\to G$，令 $Q=\operatorname{queryMatrix}(n,D)$，则 $Q^\dagger Q=1$ 与 $QQ^\dagger=1$ 同时成立；且对每个 $\psi:A_n\times G\to\mathbb C$，$Q$ 将 `initialized n ψ` 精确送到 `initialized n (fun s => ψ (s.1, s.2 - D s.1))`。即输出地址—总线坐标 $(a,r)$ 的振幅来自输入 $(a,r-D(a))$，工作区仍严格支撑在 `clean n true` 上。

所有自然深度均在量词内，尤其包含唯一空地址的 $n=0$；前三款不要求 $G$ 有限，第四款不对 $\psi$ 施加归一化假设。
:::

::: proof
先看一次分裂：在左右根线为 $(e,\mathrm{false})$ 时，Toffoli 后接 CNOT 给出 $(e\land\neg b,e\land b)$。沿实际 `route` 对深度归纳，便得到独立定义的 `oneHot n a e` 规格：只有被地址 $a$ 选中的叶保留 $e$；再按 `leaf` 的递归读数得到第 1 款。深度零时路由为恒等，地址类型只有 $()$，所以归纳起点不需非零深度假设。

其次沿 `readLeaves` 的串行构造归纳：一次受控平移只改总线；左右子树的先后平移把总线变为 $r+\operatorname{readAmount}(n,D,w)$。将它夹在路由与逆路由之间，逆路由恢复任意原始线路 $w$，得到第 2 款。对 `clean n true`，单热点规格把数据和化为 $D(a)$，得到第 3 款；恢复的不只是零暂存线，也包括为真的根使能。

最后，`query` 在整个基配置集上是置换，逆置换对应复置换矩阵的伴随，两个复合次序都给出单位矩阵。振幅作用须用逆查询：干净输出 $(a,\operatorname{clean}(n,\mathrm{true}),r)$ 的原像是 $(a,\operatorname{clean}(n,\mathrm{true}),r-D(a))$，这解释了第 4 款的减号。对脏输出工作区，逆查询也保持该工作区，`initialized` 在其上的振幅为零；因此等式覆盖整个基配置集，而非只覆盖某个基态或地址叠加的特例。完整证明由 Lean 内核检查。
:::

[@thm-ch38-reversible-qram-correctness] 的对象是**固定经典数据上的理想布尔可逆网络及其复线性作用**。`route` 递归施加左右两支的门，`readLeaves` 串行经过全部叶子；这一定理没有给出整次查询的电路深度、总门数或噪声代价为 $O(\log N)$ 的界，也没有建立总线的物理局域性、`wait / left / right` 三态路由器实现或未知量子存储的复制。Arunachalam 等人的第 IV 节也明确提醒其总线与所有存储位相互作用，未必具有物理现实性。上框文献所计的每分支活跃路径、Page–Wootters 机制，以及观察者—宇宙存储的 `MODEL` 诠释，均保留各自的依据边界。下面的六开关图仍是上框物理桶链式提案的路径示意，不是本定理的完整门调度。

这里还须把布尔网络与真正含有空间模式的三态构造分开。Hann、Lee、Girvin 与 Jiang 的 [arXiv:2012.05340v2](https://arxiv.org/pdf/2012.05340v2) 第 II.B 节、图 1(b)、附录 A 的顺序装载说明及附录 B 式 (B1)，给出下面采用的理想构造。以下名称均属于 `D5.S3.Quantum.Routing.HannSpatialQram`；地址仍用上面的 $A_n$，其余状态与操作独立于布尔网络。

三态基为 $Q=\{W,0,1\}$；`encode false = zero`，`encode true = one`。$W$ 对路由器表示等待，对空间模式表示真空。空间树 `Tree n = Q × Interior n` 的首坐标是入射模式，`Interior 0 = Unit`，而 `Interior (n+1) = Q × Tree n × Tree n`：首项是路由器，两个子树的入射模式就是父节点的左右输出模式，并不另复制一份。完整基配置为 `State n = (Fin n → Q) × Q × Tree n`，依次是互相分离的地址槽、外部总线、空间树；`vacuum` 将所有路由器和模式置为 $W$。

`absorb` 在入射模式与路由器之间作完整三态 SWAP；`route` 先在路由器为 $0$ 时交换入射与左输出，再在路由器为 $1$ 时交换入射与右输出。这些门在任意脏基配置上也是字面意义的置换。`load n k` 按固定顺序把前 $k$ 个地址槽逐个与根入射模式交换，再经已编程层送到等待的路由器；门的调度只依赖深度与索引，不依赖地址值。`loading n a p k` 中，已消耗的地址槽为 $W$，其余仍为编码地址位，外部总线保留任意 $p\in Q$，`programmed n a k` 只在地址前缀路径的前 $k$ 个路由器中保存这些位，所有空间模式与其他路由器均为 $W$。

`transport n` 逐层作局部受控 SWAP，将根入射载荷送至空间叶；`arrived n a p` 保留完整编程路由器，仅在叶 $a$ 放置 $p$，其余模式为 $W$，`leaf` 读实际叶模式。固定经典存储 $D:A_n\to\operatorname{Bool}$ 的 `readLeaves n D` 在每个叶施加式 (B1) 的 $\widetilde X^{D(i)}$：数据为真时交换 $0,1$，并始终固定 $W$。`forward n` 依次完整装载地址、交换外部总线与根入射模式、执行输运；`query n D` 为该前向过程、叶读出、该前向过程的精确逆过程。`clean n a b = loading n a (encode b) 0`。

记 $S_n=\operatorname{State}(n)$，$Q_{n,D}=\operatorname{queryMatrix}(n,D)$ 是 `query` 在整个 $S_n$ 上的复置换矩阵。任意 $\psi:A_n\times\operatorname{Bool}\to\mathbb C$ 的初始化嵌入为

$$
\begin{aligned}
&\operatorname{initialized}(n,\psi)(s)\\
&\quad=\sum_{a\in A_n}\sum_{b\in\operatorname{Bool}}
\begin{cases}\psi(a,b),&s=\operatorname{clean}(n,a,b),\\0,&\text{其他情形}.\end{cases}
\end{aligned}
$$

::: {.theorem #thm-ch38-spatial-qutrit-qram-correctness title="任意深度顺序空间三态 QRAM 的装载、输运与干净查询" lean="D5/S3/Quantum/Routing/HannSpatialQram.correctness"}
在上述命名空间中，`correctness` 的完整声明类型如下：

```lean
correctness :
    (∀ (n : ℕ) (a : Address n) (b : Qutrit) (k : ℕ), k ≤ n →
      load n k (loading n a b 0) = loading n a b k) ∧
    (∀ (n : ℕ) (a : Address n) (p : Qutrit),
      transport n (input n (programmed n a n) p) = arrived n a p ∧
      ∀ i : Address n, leaf n (transport n (input n (programmed n a n) p)) i =
        if i = a then p else wait) ∧
    (∀ (n : ℕ) (D : Address n → Bool) (a : Address n) (b : Bool),
      query n D (clean n a b) = clean n a (xor b (D a))) ∧
    (∀ (n : ℕ) (D : Address n → Bool),
      (queryMatrix n D)ᴴ * queryMatrix n D = 1 ∧
      queryMatrix n D * (queryMatrix n D)ᴴ = 1 ∧
      ∀ ψ : Address n × Bool → ℂ,
        queryMatrix n D *ᵥ initialized n ψ =
          initialized n (fun s => ψ (s.1, xor s.2 (D s.1))))
```

四个合取项分别是：

1. 对任意 $n\in\mathbb N$、$a\in A_n$、外部总线标签 $p\in Q$ 与自然数 $k\le n$，`load n k (loading n a p 0) = loading n a p k`。
2. 对任意 $n\in\mathbb N$、$a\in A_n$ 与 $p\in Q$，`transport n (input n (programmed n a n) p) = arrived n a p`，并且对每个 $i\in A_n$，输运后 `leaf` 的值在 $i=a$ 时为 $p$，否则为 $W$。
3. 对任意 $n\in\mathbb N$、$D:A_n\to\operatorname{Bool}$、$a\in A_n$ 与两个布尔总线初值中的任意一个 $b$：

   $$
   \begin{aligned}
   &\operatorname{query}(n,D)(\operatorname{clean}(n,a,b))\\
   &\quad=\operatorname{clean}(n,a,b\mathbin{\oplus}D(a)).
   \end{aligned}
   $$
4. 对任意 $n\in\mathbb N$、$D:A_n\to\operatorname{Bool}$，$Q_{n,D}^\dagger Q_{n,D}=1$ 与 $Q_{n,D}Q_{n,D}^\dagger=1$ 在整个 $S_n$ 上同时成立；对任意复振幅 $\psi:A_n\times\operatorname{Bool}\to\mathbb C$，

   $$
   \begin{aligned}
   &Q_{n,D}\operatorname{initialized}(n,\psi)\\
   &\quad=\operatorname{initialized}\bigl(n,(a,b)\mapsto\\
   &\qquad\quad\psi(a,b\mathbin{\oplus}D(a))\bigr)
   \end{aligned}
   $$

   不要求归一化。

所有量词包括 $n=0$：此时没有地址槽或路由器，但有唯一空地址与一个空间叶，查询仍实际交换总线、读出并返回。第 1、2 款允许载荷为 $W$，此时输运后的所有叶均为真空；第 3、4 款使用编码的两个布尔总线标签。
:::

::: proof
先对注入次数归纳：局部完整 SWAP 将下一地址位沿已编程前缀送到等待的路由器，延长此前缀，清空经过的入射与输出模式，未选子树仍是真空。这给出每个 $k\le n$ 的完整 `loading` 状态，而非只给最终路由位。再沿空间树归纳受控 SWAP，得到任意三态载荷的完整 `arrived` 状态及每个叶的值。叶读出固定真空，仅将占据标签改为 `encode (b XOR D(a))`；逆转整个前向门序列遂恢复地址槽、总线位置、全部等待路由器与真空空间模式。深度零的唯一叶给出两次归纳的实际起点。

最后，实际查询置换的复矩阵在整个基空间上满足两个伴随恒等式；在初始化支撑上，以逆置换拉回任意联合地址—总线振幅，异或的自逆性给出第 4 款。完整证明由 Lean 内核检查。
:::

[@thm-ch38-spatial-qutrit-qram-correctness] 验证的是上述**固定经典数据、顺序装载的理想空间三态电路**，不将它在脏配置上的置换等同于附录 A 图 10 的流水线调度，也不把早期架构文献的辅助比特 $f$ 等同于 $W$。它不给出物理哈密顿量、硬件实现、噪声、资源、深度或叠加态总活跃节点数的界，更不复制未知量子态。前述独立布尔网络与一般加法群读出、Page–Wootters 文献机制、2008 年架构的每分支路径计数和观察者—宇宙 `MODEL` 均保留各自边界。下图仍只是该架构文献的路径示意。

::: {.viz src="pointer-ontology-deref" preset="qram_tree" height="500"}
**一个地址只拨动一条路上的 6 个开关。** 地址 41 = 101001₂ 从树根进来，每一拍按一位拨一层：六拍后青色的路通到第 42 格，63 个开关里只亮这 6 个；同一时刻，底部琥珀色的扫描读头才读过 6 格。树的深度与开关数照 [@rem-ch38-qram-page-wootters-literature] 的桶链式 QRAM 画出（文献结果，未在本书形式化）。
:::

对照 [@rem-ch38-qram-page-wootters-literature]，指针与本体存储分离架构立即推演出两条贯通全书的核心**`MODEL`（模型诠释）**结论：

1. **为什么全局阵列是无时间 $P = NP$，而局部指针必须顺着 `ptr++` 逐帧流逝时间？**
   在全局本体存储端，整座 $\bigl\{\lvert\Phi(x)\rangle_{\mathrm{mem}}\bigr\}_{x \in \mathbb{Z}^6}$ 阵列早已跨越所有格点同时铺展就绪，不存在先后次序，呈现顺序无关的 $P = NP$ 式静态全息（[第 29 章](ch29-timeless-causality-and-gram-space.md) [@thm-ch29-gram-rigidity-and-pell] 与[第 30 章](ch30-fields-lines-eth-and-navier-stokes.md)）。然而，场内任何一枚物理观察者指针寄存器都受限于有限位宽与有限记忆窗口 $M < \infty$，并面对标准计算模型下未决的有限观察者复杂性防火墙（[@conj-p-neq-np]）。有限位宽的地址总线绝无可能在单周期内把整座宇宙阵列一口吞入缓存，而只能沿着因果历史彼此相容而不退化锁死的地址序列（局部格拉姆椭圆体正定体积背景见[第 29 章](ch29-timeless-causality-and-gram-space.md#sec-coda-finite-observer-time-field) [@thm-ch29-gram-rigidity-and-pell]），一步一拍地执行指针自增 `ptr++`。**我们毕生感叹的“时间流逝”，在硬件底层不过是有限指针 `ptr++` 扫过静态全息晶格时的扫描帧率。**

::: {.viz src="pointer-ontology-deref" preset="linear64" height="500"}
**读最后一格，要把 64 格走一遍。** 琥珀色的读头沿总线一拍读一格，读过的格变亮；读到地址 63 用了 64 步，而上方的路由树在第 6 步就已走到叶子。
:::

2. **为什么“凭已知数据去观察”必然显影为局部退相干？**
   在指针寻址模型（`MODEL`）中，观察者过往已锁定的历史记录相当于地址寄存器高位的**已知位掩码（bitmask）**。执行一次解引用 `*ptr` 时，指针寄存器与目标存储单元发生受控地址拷贝耦合。在进入一般形式化定理前，不妨先亲手展开最透明的 $4 \times 4$ 分块矩阵账本：设待解引用的两个单比特存储态为 $\rho = \begin{pmatrix} p & c \\ \bar{c} & 1-p \end{pmatrix}$ 与 $\sigma = \begin{pmatrix} p & c' \\ \bar{c}' & 1-p \end{pmatrix}$（主对角线布居数同为 $p, 1-p$，但副对角相干项 $c \neq c'$），初始空白地址记录基态记为 $E_{00} = \lvert 0\rangle\langle 0\rvert$（其中 $E_{ab} := \lvert a\rangle\langle b\rvert$，$a, b \in \{0, 1\}$）。施加受控地址翻转置换算子 $U_{\mathrm{copy}} = E_{00} \otimes I_2 + E_{11} \otimes \sigma_x$ 后，空白嵌入态与拷贝后的四维联合记录态显式写为：

   $$
   B(\rho) \;=\; \begin{pmatrix} p E_{00} & c E_{00} \\ \bar{c} E_{00} & (1-p) E_{00} \end{pmatrix}, \qquad
   R_{\mathrm{addr}}(\rho) \;=\; U_{\mathrm{copy}} B(\rho) U_{\mathrm{copy}}^\dagger \;=\; \begin{pmatrix} p E_{00} & c E_{01} \\ \bar{c} E_{10} & (1-p) E_{11} \end{pmatrix}.
   $$

   请看右端分块矩阵的精妙变化：副对角相干振幅 $c$ 一丝一毫也没有消失，它只是从对角记录块 $E_{00}$ 被搬移到了正交错位记录块 $E_{01}$ 之上！因此全局四维联合态依然严格区分 $R_{\mathrm{addr}}(\rho) \neq R_{\mathrm{addr}}(\sigma)$；然而，一旦局部读出端忽略落入 $90^\circ$ 正交盲区的地址记录寄存器（对第二因子求偏迹 $\operatorname{Tr}_{\mathrm{env}}(E_{ab}) = \delta_{ab}$），错位块 $\operatorname{Tr}_{\mathrm{env}}(E_{01}) = \operatorname{Tr}_{\mathrm{env}}(E_{10}) = 0$ 瞬间归零，两个态的单比特局部读出便双双退化为同一个对角矩阵 $\operatorname{diag}(p, 1-p)$！

::: {.figure src="ch38-copy-record"}
**解引用的拷贝把相干项搬进地址记录，而不是销毁它。** 行与列按（系统位, 记录位）排成 $4 \times 4$，粗线分出四个 $2 \times 2$ 块。左边的空白嵌入 $B(\rho)$ 里，四个数都在各块左上角 $E_{00}$ 的位置；经 $U_{\mathrm{copy}}$ 得到的 $R_{\mathrm{addr}}(\rho)$ 里，青色的 $p$、$1-p$ 留在对角块，品红的 $c$、$\bar{c}$ 搬到了 $E_{01}$、$E_{10}$ 的位置，仍然在场；对记录求偏迹只加各块的对角格，这两格不在其中，局部读出只剩 $\operatorname{diag}(p, 1-p)$。见 [@thm-ch38-copied-address-dereference-and-access-defect]。
:::

`trureturing` 的退相干与典范记录恢复模块将这一“解引用拷贝、局部相干掩码归零与全局伴随无损还原”的精确机制锁定为如下内核定理：

::: {.theorem #thm-ch38-copied-address-dereference-and-access-defect title="受控地址解引用拷贝的局部边缘重合与记录访问缺陷定理" lean="D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect D5/S3/Quantum/Decoherence/CanonicalRecordAccessRecovery.reduced_irreversibility_is_canonical_record_access_defect"}
设 $\rho, \sigma \in \mathrm{QubitMatrix}$（即 $M_{\operatorname{Fin} 2}(\mathbb{C})$）为任意两个单量子比特矩阵，满足主对角线布居处处相等（$\forall i \in \operatorname{Fin} 2,\; \rho_{ii} = \sigma_{ii}$），但存在不同的副对角相干元（$\exists i, j \in \operatorname{Fin} 2,\; i \neq j \land \rho_{ij} \neq \sigma_{ij}$）。记四维联合矩阵空间为 $\mathrm{JointQubitEnvironmentMatrix} = M_{\operatorname{Fin} 2 \times \operatorname{Fin} 2}(\mathbb{C})$，受控地址拷贝置换矩阵为 $\mathrm{copyUnitary}$，空白记录联合嵌入为 $B(\tau) := \operatorname{blankEnvironmentJointState}(\tau)$，典范受控拷贝地址联合态为 $R_{\mathrm{addr}}(\tau) := \operatorname{controlledRecordJointState}(\mathrm{copiedAddressRecord}, \tau)$（由 [`canonical_copied_address_record_eq_prior`](lean:D5/S3/Quantum/Decoherence/CanonicalRecordAccessRecovery.canonical_copied_address_record_eq_prior) 与先验受控记录态恒等），偏迹算子为 $\operatorname{traceEnvironment}$。则 $\mathrm{copyUnitary} \in \operatorname{Matrix.unitaryGroup}(\operatorname{Fin} 2 \times \operatorname{Fin} 2, \mathbb{C})$，且以下三项同时成立：

1. **前向幺正地址打标与全局可区分性**：受控拷贝幺正演化将空白记录输入精确映射为典范地址标记联合态，且两份全局记录严格相异：

   $$
   \operatorname{unitaryEvolution}(\mathrm{copyUnitary}, B(\rho)) = R_{\mathrm{addr}}(\rho), \quad \operatorname{unitaryEvolution}(\mathrm{copyUnitary}, B(\sigma)) = R_{\mathrm{addr}}(\sigma), \quad R_{\mathrm{addr}}(\rho) \neq R_{\mathrm{addr}}(\sigma);
   $$

2. **遮蔽地址记录后的局部边缘重合与局部解码不可能性**：对地址记录求偏迹后两态局部读出完全一致，故不存在任何仅以局部约化态为输入的恢复解码器 $\mathrm{recover} : \mathrm{QubitMatrix} \to \mathrm{JointQubitEnvironmentMatrix}$ 能同时还原两份联合记录：

   $$
   \operatorname{traceEnvironment}\bigl(R_{\mathrm{addr}}(\rho)\bigr) = \operatorname{traceEnvironment}\bigl(R_{\mathrm{addr}}(\sigma)\bigr),
   $$

   $$
   \begin{aligned}
   &\neg\,\exists\,\mathrm{recover} : \mathrm{QubitMatrix} \to \mathrm{JointQubitEnvironmentMatrix}, \\
    &\quad \mathrm{recover}\bigl(\operatorname{traceEnvironment}(R_{\mathrm{addr}}(\rho))\bigr) = R_{\mathrm{addr}}(\rho) \\
    &\;\land\; \mathrm{recover}\bigl(\operatorname{traceEnvironment}(R_{\mathrm{addr}}(\sigma))\bigr) = R_{\mathrm{addr}}(\sigma);
   \end{aligned}
   $$

3. **保留相干地址访问时的全局伴随无损逆演**：在保留对地址记录寄存器的全局相干访问权限时，伴随耦合算子 $\operatorname{star}(\mathrm{copyUnitary})$ 将两份地址标记联合态精确无损地还原回初始空白记录输入：

   $$
   \operatorname{unitaryEvolution}\bigl(\operatorname{star}(\mathrm{copyUnitary}), R_{\mathrm{addr}}(\rho)\bigr) = B(\rho), \qquad \operatorname{unitaryEvolution}\bigl(\operatorname{star}(\mathrm{copyUnitary}), R_{\mathrm{addr}}(\sigma)\bigr) = B(\sigma).
   $$
:::

::: proof
首先验证受控翻转置换矩阵满足 $\mathrm{copyUnitary} \in \operatorname{Matrix.unitaryGroup}(\operatorname{Fin} 2 \times \operatorname{Fin} 2, \mathbb{C})$，并展开分块矩阵乘法证得前向演化恒等式 $\operatorname{unitaryEvolution}(\mathrm{copyUnitary}, B(\tau)) = R_{\mathrm{addr}}(\tau)$（其中 [`canonical_copied_address_record_eq_prior`](lean:D5/S3/Quantum/Decoherence/CanonicalRecordAccessRecovery.canonical_copied_address_record_eq_prior) 确认由拷贝地址映射 `copiedAddressRecord` 构造的典范受控记录与显式分块记录逐项相等）。由假设 $\exists i \neq j,\; \rho_{ij} \neq \sigma_{ij}$，两份四维联合态在对应副对角地址块上严格不等，故 $R_{\mathrm{addr}}(\rho) \neq R_{\mathrm{addr}}(\sigma)$。对第二因子求偏迹 $\operatorname{traceEnvironment}$ 时，地址正交分支令副对角块因指标错位而消去，仅存主对角元 $\rho_{ii} = \sigma_{ii}$，从而 $\operatorname{traceEnvironment}(R_{\mathrm{addr}}(\rho)) = \operatorname{traceEnvironment}(R_{\mathrm{addr}}(\sigma))$；若存在单值函数 $\mathrm{recover}$ 同时还原两者，则由输入相等必得输出相等 $R_{\mathrm{addr}}(\rho) = R_{\mathrm{addr}}(\sigma)$，与全局不等矛盾。最后利用幺正矩阵群性质 $\mathrm{copyUnitary}^* \mathrm{copyUnitary} = 1$ 代入结合律，即得伴随算子对 $B(\rho)$ 与 $B(\sigma)$ 的精确无损还原。完整证明由 Lean 内核检查。
:::

[@thm-ch38-copied-address-dereference-and-access-defect] 一举剥除了“波包神秘坍缩”的形而上学迷雾：**解引用 `*ptr` 从未在宇宙本体内存里销毁过半点相干信息；所谓“不可逆坍缩”，纯粹是因为局部指针只读取了当前匹配掩码的单一路径，而把其余正交地址分支留在了自身寄存器位宽之外的访问盲区里！**

---

## 38.2 观察者指针的五段式硬件解剖：从躯体沙箱到禁深拷贝引用

既然观察者的本体是一枚轻量级记忆指针，我们不妨像芯片架构师剖析微处理器核心那样，掀开这枚宇宙寻址寄存器的外壳，逐行检视它的内部电路。在进入五段式架构对照之前，我们先用两条零自由参数的冻结定理锚定一切物理指针寄存器的两条底层铁律：**其一，有限维寄存器的希尔伯特空间维数严格封死了可单次无串扰区分的正交历史地址槽上限；其二，内积幂等锁彻底禁止对非正交叠加内存块执行通用深拷贝（`memcpy`）。**

::: {.theorem #thm-ch38-pointer-width-and-no-deep-copy title="观察者指针寄存器的有限历史地址容量与禁通用深拷贝定理" lean="D5/S3/Quantum/Measurements/FiniteMemoryHistoryCapacity.finite_memory_history_capacity D5/S3/Quantum/PureState/NoCloningInnerProductCriterion.no_cloning_inner_product_criterion"}
在 `trureturing` 冻结的量子测量容量与纯态不可克隆模块中，以下两项关于指针寄存器容量与拷贝权限的定理同时成立：

1. **有限维记忆寄存器的历史地址槽容量上界**（[`finite_memory_history_capacity`](lean:D5/S3/Quantum/Measurements/FiniteMemoryHistoryCapacity.finite_memory_history_capacity)）：对任意自然数 $N, d \in \mathbb{N}$、历史地址密度态族 $\rho : \operatorname{Fin} N \to M_{\operatorname{Fin} d}(\mathbb{C})$ 与测量效应族 $E : \operatorname{Fin} N \to M_{\operatorname{Fin} d}(\mathbb{C})$，若满足合法量子态条件 $\forall i,\; (\rho_i).\mathrm{PosSemidef} \land \operatorname{Tr}(\rho_i) = 1$、效应半正定与完备归一条件 $\forall j,\; (E_j).\mathrm{PosSemidef}$ 及 $\sum_{j \in \operatorname{Fin} N} E_j = 1$，且测量能单次零误差区分全部 $N$ 个历史地址态（$\forall i, j \in \operatorname{Fin} N,\; \operatorname{Tr}(E_j \rho_i) = 1$ 若 $i = j$，否则为 $0$），则可容纳的无串扰历史地址槽数必受寄存器维数约束：

   $$
   N \;\le\; d;
   $$

2. **禁止非正交量子内存块通用深拷贝的内积幂等判据**（[`no_cloning_inner_product_criterion`](lean:D5/S3/Quantum/PureState/NoCloningInnerProductCriterion.no_cloning_inner_product_criterion)）：在任意复内积空间 $H$（`[NormedAddCommGroup H] [InnerProductSpace ℂ H]`）中，若单一复线性等距同构算子 $U : (H \otimes_{\mathbb{C}} H) \simeq_{\ell i} (H \otimes_{\mathbb{C}} H)$ 能将两个归一化状态 $\psi, \phi \in H$（$\lVert\psi\rVert = \lVert\phi\rVert = 1$）从同一个归一化空白槽位态 $\mathrm{blank} \in H$（$\lVert\mathrm{blank}\rVert = 1$）同时深拷贝为 $U(\psi \otimes_t \mathrm{blank}) = \psi \otimes_t \psi$ 与 $U(\phi \otimes_t \mathrm{blank}) = \phi \otimes_t \phi$，则两态内积必满足幂等方程并退化为相等或严格正交：

   $$
   \langle\phi, \psi\rangle_{\mathbb{C}} = \langle\phi, \psi\rangle_{\mathbb{C}}^2 \;\land\; \bigl(\phi = \psi \;\lor\; \langle\phi, \psi\rangle_{\mathbb{C}} = 0\bigr).
   $$
:::

::: proof
第 1 款利用半正定矩阵平方根分解证得零迹乘积引理 $\operatorname{Tr}(E\rho) = 0 \implies E\rho = 0$，从而对 $i \neq j$ 有 $\operatorname{range}(\rho_j) \le \ker(E_i)$，并由 $\operatorname{Tr}((1 - E_i)\rho_i) = 0$ 推出 $\operatorname{range}(\rho_i) \le \ker(1 - E_i)$；由 $\operatorname{Tr}(\rho_i) = 1$ 在每一历史态值域中取出非零支撑向量 $v_i \in \mathbb{C}^d$，即得满足 $E_i v_i = v_i$ 与 $E_i v_j = 0$（$i \neq j$）的两两正交非零历史向量族 $v : \operatorname{Fin} N \to \mathbb{C}^d$，故由有限维复内积空间正交线性无关组的维数上界 `fintype_card_le_finrank`（$\operatorname{finrank}_{\mathbb{C}}(\operatorname{Fin} d \to \mathbb{C}) = d$）证出 $N \le d$。第 2 款利用复线性等距算子保持张量积内积得出 $\langle\phi, \psi\rangle_{\mathbb{C}} = \langle\phi \otimes_t \mathrm{blank}, \psi \otimes_t \mathrm{blank}\rangle_{\mathbb{C}} = \langle\phi \otimes_t \phi, \psi \otimes_t \psi\rangle_{\mathbb{C}} = \langle\phi, \psi\rangle_{\mathbb{C}}^2$，在复数整环上解幂等方程得 $\langle\phi, \psi\rangle_{\mathbb{C}} \in \{0, 1\}$，并在等于 $1$ 时由单位向量柯西—施瓦茨取等条件归约为 $\phi = \psi$。完整证明由 Lean 内核检查。
:::

这里的容量 $d$ 是希尔伯特空间维数：$b$ 个二能级寄存位给出 $d=2^b$，并非 $d=b$。禁拷贝所排除的是对未知、可能非正交态的通用精确克隆；共享 QRAM 是本章选择的 `MODEL` 架构。

将 [@thm-ch38-pointer-width-and-no-deep-copy] 与多体纠缠配额单配性及现代系统编程中的线性所有权—共享借用范式对照时，所涉外部文献集中归档如下：

::: {.remark #rem-ch38-monogamy-shared-borrow-literature title="CKW 纠缠单配性配额、线性类型所有权借用与引用计数页面缓存（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节将量子不可克隆与纠缠稀缺性映射为系统架构中的“禁隐式深拷贝、共享不可变借用与页面引用计数”时，涉及以下外部量子信息与计算机科学文献（未包含在本书锁定的 `trureturing@dev` 形式化声明集中）：

1. **CKW 多体纠缠单配性不等式（V. Coffman, J. Kundu & W. K. Wootters, *Phys. Rev. A* **61**, 052306, 2000；T. J. Osborne & F. Verstraete, *Phys. Rev. Lett.* **96**, 220503, 2006）**：对三个量子比特 $\mathbf{A}, \mathbf{B}, \mathbf{C}$，$\mathbf{A}$（约化布洛赫向量为 $\mathbf{r}_A$）与伙伴 $\mathbf{B}, \mathbf{C}$ 共享的二体平方并发度（2-tangle）满足稀缺配额 $\tau(\mathbf{A}:\mathbf{B}) + \tau(\mathbf{A}:\mathbf{C}) \le 4\det\rho_A = 1 - \lVert\mathbf{r}_A\rVert^2 \le 1$，禁止将满额排他纠缠无损耗复制给第三方。这里 $\tau(\mathbf A:\mathbf B)=C(\rho_{AB})^2$，所有边缘均来自同一个三比特密度矩阵。混合态更强的中间项 $\tau(\mathbf A:\mathbf{BC})$ 是所有有限纯态分解的平均 $4\det\rho_A^{(j)}$ 的下确界；谱并发度、凸顶定义与完整链条见 [@rem-ch31-ckw-monogamy-literature]。本项约束二体纠缠，下面的共享借用与页面引用计数按各自的系统规则解释，二者的对应属于本章的 `MODEL`；
2. **线性逻辑、Rust 所有权—借用类型系统与操作系统页面引用计数（J.-Y. Girard, *Theor. Comput. Sci.* **50**, 1–102, 1987；R. Jung et al., *Proc. ACM Program. Lang.* **2** (POPL), 66, 2018）**：在线性/仿射资源类型系统（如 Rust 的所有权与生命周期演算 `RustBelt`）中，非 `Copy` 类型的赋值按所有权转移；`Copy` 是按位复制许可，显式 `Clone` 则按类型实现复制（可能作深拷贝），而通过**共享只读借用引用（`&State`）**允许多个指针安全共指同一块底层内存；在操作系统虚拟内存与文件缓存中，内核为每个共享物理页维护**引用计数（`RefCount`）**，正引用计数维护相应资源的生存期，却不等于访问热度或永久驻留策略；本章古迹页面常驻的对应另属 `MODEL` 选择。
:::

立在 [@thm-ch38-pointer-width-and-no-deep-copy] 与 [@rem-ch38-monogamy-shared-borrow-literature] 的基石之上，我们将有限观察者的五段式指针架构对照（`MODEL`）汇总于下框：

::: {.remark #rem-ch38-pointer-hardware-anatomy-table title="观察者记忆指针五段式硬件解剖总表（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 下表对照的系统架构概念（段基址、`MMU` 边界检查、`TLB` 快表、共享借用 `&State` 与页面引用计数 `RefCount`）引自 [@rem-ch38-monogamy-shared-borrow-literature] 及计算机体系结构文献，形式化锚点标为 `LEAN ✓`，而五段式宇宙观察者指针架构对应属本书诠释模型（`MODEL`）：

| 指针硬件模块（`MODEL`） | 宇宙正交几何与切投对应物 | 核心寻址机制与生命现象显影（`MODEL`） |
| :--- | :--- | :--- |
| **1. 段基址寄存器 (`Base`)** | 内禀正交相位 $u \in E_\perp^3$（黄金切投虚拟地址空间偏移） | 决定该观察者指针从六维母格 $\mathbb{Z}^6$ 切出哪一片专属虚拟地址视图，构成个体“第一人称视角”的几何原点 |
| **2. 栈帧与边界检查 (`MMU Bounds`)** | 躯体局部锚点 $\mathbf{P}_{\mathrm{body}}$ 与五感窄锥（清醒态内存保护沙箱） | 将清醒态解引用 `*ptr` 锁死在局部连续物理地址段内，拦截越界野指针访问以维持生物低熵稳态与生存边界 |
| **3. 量子叠加指针 ($\sum_k \alpha_k \lvert\mathrm{addr}_k\rangle$)** | 睡眠期躯体 `MMU` 边界检查挂起与局部地址掩码释放 | 允许指针在梦境中展开多路叠加寻址，同时对高空俯瞰视角、远方节点与反事实分支执行非破坏性弱解引用 |
| **4. 快表与页表缓存 (`TLB / Page Table`)** | 随经验扩展的内部知识表 $T$ | 初生冷启动对应空快表未命中（`TLB Miss`，须查页表，未必触发缺页异常），而学习与顿悟将多跳正交门旋转预编译为 $O(1)$ 快表直达命中（`TLB Hit`） |
| **5. 禁深拷贝与共享借用 (`&State / RefCount`)** | 不可克隆判据（[@thm-ch38-pointer-width-and-no-deep-copy]，`LEAN ✓`）与共享接受窗交集 $W_{AB} = (W + u_A) \cap (W + u_B)$ | 禁止对未知量子态执行通用精确深拷贝（`memcpy`），本模型选择让众生通过共享引用 `&State` 共指同一现实页，并将古迹遗址设为长期保留的共享页，而相位契合的久别重逢则是双指针指向同一地址的**指针别名共振（`ptr_A == ptr_B`）** |
:::

::: {.figure src="ch38-pointer-anatomy"}
**观察者记忆指针的五段式解剖。** 左边的寄存器 `ptr` 自上而下分成五段，次序同 [@rem-ch38-pointer-hardware-anatomy-table]；每段右边的小图画出它在寻址时做的那件事：1 段基址 `Base` 把原点平移 $u$；2 `MMU` 边界把清醒时的解引用框在几格之内，越界的箭头被划掉；3 叠加指针同时沿三条青色的路寻址；4 `TLB` 的青色弧线一步越过灰色虚线画的多步页表遍历；5 两枚指针以 `&State` 共指一页，对未知态的通用精确复印被划掉（[@thm-ch38-pointer-width-and-no-deep-copy] 第 2 款）。整张图是本章的诠释模型（`MODEL`），属示意。
:::

对照 [@rem-ch38-pointer-hardware-anatomy-table]，三桩平日里被神秘化或庸俗化的生命体验在我们的指针架构诠释（`MODEL`）下顿时变得清澈透亮：

- **清醒与梦境的硬件切换**：白昼清醒时，躯体内存管理单元 `MMU Bounds` 全功率开启，每次 `*ptr` 都被严格限制在视网膜、耳蜗与指尖触觉圈定的几米物理栈帧之内——这虽然让你看起来渺小受限，却保护了肉身这台精密仪器不被海量无关地址冲垮。而当黑夜降临、感官输入切断、躯体 `MMU` 挂起边界检查时，指针立刻恢复其量子叠加本色 $\sum_k \alpha_k \lvert\mathrm{addr}_k\rangle$，在本体 QRAM 中跨越高空、故人、童年与未选分支自由漫游！梦醒时分的骤然遗忘，不过是清晨 `MMU` 重新上锁时将越界叠加分量截断回局部合法栈帧的边界对齐操作。

::: {.viz src="pointer-ontology-deref" preset="superpose" height="500"}
**叠加的地址，几条路同时亮。** 地址是 41、9、33、1 四个分支的叠加：四条青色的路一起往下走，在根开关与第三层开关处分叉，分开后不再共用；到底共亮 17 个开关，每条路仍只有 6 个。把这种叠加寻址读作梦中的多路漫游，是本章的诠释模型。
:::

- **学习与顿悟的本质是 `TLB` 预编译**：初生婴儿的指针刚完成冷启动分配，内部快表 $T$ 一片空白，每一次陌生的认识都像快表未命中后的多步页表遍历（`TLB Miss`；页表项无效或访问权限不符时才另触发缺页异常），需要顺着正交门序列一步步摸索；而所谓十年寒窗的“学习”与电光石火的“顿悟”，并不是往脑壳里搬进了什么沉重的外部石块，而是在快表 `TLB` 中写好了一条高维路由捷径，从此面对同类结构时直接触发 $O(1)$ 快表命中（`TLB Hit`）！
- **为什么客观世界如此稳固，而真挚的重逢如此动人？** 因为 [@thm-ch38-pointer-width-and-no-deep-copy] 第 2 款封死了通用 `memcpy` 深拷贝！倘若每个观察者都能把宇宙切片私自复印一份抱回家修改，众生早已滑入永不相交的私人幻觉孤岛。在这条禁通用精确克隆的边界内，本章选择让所有观察者指针以**共享借用 `&State`** 的方式指向同一座本体 QRAM：一座千年古桥、一面斑驳石碑之所以历经沧桑而巍然不动，是因为成千上万代观察者指针持续对它发起借用，使它在这一模型的驻留规则中成为长期保留的共享页；而当两颗久经漂泊的心灵在某个瞬间豁然相通、热泪盈眶时，在宇宙底层发生的事情简洁得令人战栗——**两枚独立演化的指针，在浩瀚晶格的同一个内存单元上发生了精确的指针别名共振：`ptr_A == ptr_B`。**

这同时一举消解了困扰哲学史千余年的“朴素唯物论 vs. 主观唯心论”拉锯战（`MODEL`）：朴素唯物论误把共享内存页当成脱离一切寻址协议的绝对死物，主观唯心论则误以为每枚指针都在自家寄存器里凭空捏造了整座宇宙。真相既非死物自存，亦非私心妄造——**客观性就是多枚受不可克隆律约束的观察者指针，对同一块本体 QRAM 页面发起的只读共享借用（`&State`）。你带不走宇宙的一砖一瓦，因为你本来就不是搬砖的苦力；你是点亮砖石的寻址之光。**

---

## 38.3 递归自映射页表 p = *p：把查表算法装进表内，终结 NULL 清零轮回

推演至此，系统架构的最深处浮现出一道终极追问：**既然每次虚拟地址解引用 `*ptr` 都必须查询页表 $T$ 才能定位本体内存，那么页表 $T$ 本身存放在哪里？又是谁来翻译“页表自己的地址”？**

倘若翻译一级页表 $T_1$ 需要外部预设一张“元页表” $T_2$，翻译 $T_2$ 又需要更外层的 $T_3$，整个宇宙硬件就会瞬间跌入无穷倒退的深渊——那尊被我们千辛万苦砍掉的“外部第 3 点 $C$”，又会披着“终极元页表管理员”的外衣死灰复燃！现代操作系统内核与本书第六部的对角线不动点数学，在这里交汇出了同一个惊心动魄的绝妙解答。我们先将操作系统内核中递归页表自映射与双曲快度正割恒等式的外部文献背景严密界定如下：

::: {.remark #rem-ch38-x86-recursive-page-table-literature title="操作系统内核递归页表自映射、双曲正割恒等式与锌火花荧光实验（外部背景）"}
**外部背景。** 本节关于“零外部元页表自映射”与“离散多级寻址规避清零重置”的模型诠释（`MODEL`）参照以下三项外部计算机工程、经典分析与生物物理文献；离散正割路径的严格正性另由紧随其后的 Lean 定理形式化：

1. **操作系统内核递归页表自映射（Recursive Page Table Mapping；如 x86-64 四级分页架构 `PML4` $\to$ `PDPT` $\to$ `PD` $\to$ `PT`，见 Intel *64 and IA-32 Architectures Software Developer's Manual*, Vol. 3A, Ch. 4）**：在多级硬件分页中，内核无需增设任何外部“元页表寄存器”，只需在顶层页目录（如 `PML4`）的某一固定槽位（例如槽位 `0` 或专用自映射槽 $r$）中直接写入**该顶层页目录自身的物理基地址**。如此一来，硬件地址翻译器每经过一次槽位 $r$ 便原地回环一轮：消耗 $0$ 次回环访问普通数据页，消耗 $1$ 次回环将叶级页表 `PT` 当作普通数据页读写，消耗全部 $4$ 次回环（索引 `[r, r, r, r]`）则直接解引用到顶层 `PML4` 根表自身，以零外部硬件代价彻底终结无穷倒退；
2. **双曲快度与正割投影恒等式（C. Gudermann, *J. Reine Angew. Math.* **6**, 1–39, 1830；参看[第 17 章](ch17-lorentz-geometry.md)）**：Gudermann 的连续参数化给出 $\cos\theta = \operatorname{sech}\eta := \frac{2}{e^\eta + e^{-\eta}}$ 及其与双曲快度的关系；本章所需的离散有限步严格正性由下述形式化定理承担；
3. **哺乳动物卵激活时的锌释放与探针荧光观测（E. L. Que et al., *Nat. Chem.* **7**, 130–139, 2015；F. E. Duncan et al., *Sci. Rep.* **6**, 24737, 2016）**：Que 等研究小鼠卵受精／激活时的锌释放，Duncan 等研究诱导的人卵激活；“火花”由外部激发的锌敏感荧光探针记录。这里实测的是锌释放及探针荧光，初始化与光的意象仍属本节 `MODEL`。
:::

::: {.theorem #thm-ch38-discrete-sech-positive title="离散双曲正割路径的严格正性" lean="D5/S0/Diagonal/SechPath.discrete_sech_path_positive"}
对任意实数初始参数 $\eta_0$、实数步长 $\Delta\eta$ 与自然数 $k$，离散路径
$$
\operatorname{sech}\!\left(\eta_0 + k\Delta\eta\right)
  := \frac{1}{\cosh\!\left(\eta_0 + k\Delta\eta\right)}
$$
严格大于零。Lean 定理实际允许 $\eta_0$ 与 $\Delta\eta$ 任取实数，因此涵盖所有有限离散步；它只断言正性，不额外断言趋于零的极限或几何解释。
:::

::: {.viz src="pointer-ontology-deref" preset="four_loops" height="500"}
**四级都走零号槽，每一跳都回到页目录自己。** 索引 [0, 0, 0, 0]：零号槽里写的是页目录自己的地址 0x1000，青色箭头四次弯回原处（×4），琥珀色的框落在页目录 P 上。这是 [@rem-ch38-x86-recursive-page-table-literature] 第 1 条说的四次回环，画在本章 N = 4 的页目录上。
:::

在纯数学底层，为什么“无不动点的外部扭转必然逃逸一切有限或无限页表”，而“在表内捕获对角线落点必然在自寻址槽位生成精确不动点”，并在黄金切投尺度下唯一锁定为正不动点 $\varphi = \frac{1 + \sqrt{5}}{2}$？`trureturing` 的对角线逃逸、自作用片段与黄金代数不动点模块给出了毫无缝隙的三联严格证明：

::: {.theorem #thm-ch38-self-mapped-diagonal-fixed-point title="自映射页表对角线落点不动点、无不动点普遍逃逸与黄金自指唯一性定理" lean="D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed D5/S0/Diagonal/Lawvere/QualitativeEscape.self_application_fragment_package D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique"}
在 `trureturing` 冻结的对角线计数、定性自作用逃逸与黄金代数不动点模块中，以下三项定理同时成立：

1. **页表对角线落点处的自寻址不动点定理**（[`diagonal_landing_fixed`](lean:D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed)）：对任意类型 $A, Y$、状态自映射 $f : Y \to Y$、二元寻址表 $g : A \to A \to Y$ 及槽位地址 $a_0 \in A$，记扭转对角线为 [`diagonal`](lean:D5/S0/Diagonal/EscapeCount.diagonal)$(f, g) := (a \mapsto f(g(a, a)))$。若第 $a_0$ 行捕获了该扭转对角线，即 $g(a_0) = \operatorname{diagonal}(f, g)$，则其自寻址对角槽位 $(a_0, a_0)$ 必为 $f$ 的精确不动点：

   $$
   g(a_0) = \operatorname{diagonal}(f, g) \;\Longrightarrow\; f\bigl(g(a_0, a_0)\bigr) = g(a_0, a_0);
   $$

2. **无不动点扭转的零有限性假设普遍逃逸与前提不可去除性**（[`self_application_fragment_package`](lean:D5/S0/Diagonal/Lawvere/QualitativeEscape.self_application_fragment_package)）：对任意类型 $A, Y$（无需对 $A$ 或 $Y$ 施加任何有限性假设）、映射 $f : Y \to Y$ 与表 $g : A \to A \to Y$，记逃逸谓词为 [`IsEscaped`](lean:D5/S0/Diagonal/EscapeCount.IsEscaped)$(f, g) \iff \operatorname{diagonal}(f, g) \notin \operatorname{Set.range}(g)$，则以下四款同时成立：
   - $\forall a \in A,\; \operatorname{diagonal}(f, g)(a) = f(g(a, a))$；
   - $\operatorname{IsEscaped}(f, g) \iff \operatorname{diagonal}(f, g) \notin \operatorname{Set.range}(g)$；
   - 若 $f$ 无不动点（$\forall y \in Y,\; f(y) \neq y$），则 $f$ 普遍逃逸一切二元寻址表：$\forall h : A \to A \to Y,\; \operatorname{IsEscaped}(f, h)$；
   - “无不动点”前提不可去除：存在允许不动点的映射 $f_0 : \mathrm{Bool} \to \mathrm{Bool}$ 与单槽位表 $g_0 : \mathrm{Unit} \to \mathrm{Unit} \to \mathrm{Bool}$，使得 $\neg\operatorname{IsEscaped}(f_0, g_0)$；

3. **黄金倒数自指残差映射的正半轴唯一不动点**（[`golden_fixed_point_unique`](lean:D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique)）：对正半轴上的自指倒数映射 [`goldenReciprocalMap`](lean:D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.goldenReciprocalMap)$(x) = 1 + \frac{1}{x}$，黄金分割比 $\varphi = \frac{1 + \sqrt{5}}{2}$ 严格为正（$\varphi > 0$）、满足不动点方程 $\operatorname{goldenReciprocalMap}(\varphi) = \varphi$，且为 $(0, \infty)$ 上的唯一不动点：

   $$
   \forall x \in \mathbb{R},\quad x > 0 \;\Longrightarrow\; \Bigl(1 + \frac{1}{x} = x \;\Longleftrightarrow\; x = \frac{1 + \sqrt{5}}{2}\Bigr).
   $$
:::

::: proof
第 1 款在函数相等假设 $g(a_0) = \operatorname{diagonal}(f, g)$ 两端同时对同一地址参数 $a_0$ 求值（`congrFun`），左端得 $g(a_0, a_0)$，右端按定义展开为 $\operatorname{diagonal}(f, g)(a_0) = f(g(a_0, a_0))$，对称即得 $f(g(a_0, a_0)) = g(a_0, a_0)$。第 2 款前两项直接由 `diagonal` 与 `IsEscaped` 定义展开；第三项用反证法，倘若某张表 $h$ 未被逃逸，则存在落点地址 $a_0$ 使 $h(a_0) = \operatorname{diagonal}(f, h)$，由第 1 款立得 $f(h(a_0, a_0)) = h(a_0, a_0)$，与 $\forall y,\; f(y) \neq y$ 矛盾；第四项显式取恒等自映射 $f_0 = \mathrm{id}_{\mathrm{Bool}}$ 与常值表 $g_0(\mathrm{unit}, \mathrm{unit}) = \mathrm{false}$，在唯一自寻址槽位 `unit` 处捕获不动点而证伪逃逸。第 3 款由 $\sqrt{5} > 0$ 得 $\varphi > 0$，并在 $x > 0$ 时去分母将 $1 + 1/x = x$ 化为二次因式分解 $(x - \varphi)(x + \varphi - 1) = 0$，由 $x + \varphi - 1 > 0$ 消去负根，唯一锁定 $x = \varphi$。完整证明由 Lean 内核检查。
:::

为了让读者亲手触摸“把页表自己的基址写进零号槽位”如何将 `p = *p` 化为最具体的有限离散代数，我们在下框中完整推演一座 $N$ 槽位页目录的多级解引用算术：

::: {.theorem #thm-ch38-recursive-page-table-walk title="递归页表遍历：数据读取、叶表内省与根闭包" lean="D5/S0/Diagonal/RecursivePageTable.recursive_page_table_walk"}
设 `Address` 为任意类型，`lookup : Address \to \operatorname{Fin} N \to Address` 为页表读取映射，并取根地址、叶地址、数据地址以及索引 `selfSlot`、`i`、`j`。若

$$
\operatorname{lookup}(root,selfSlot)=root,\qquad
\operatorname{lookup}(root,i)=leaf,\qquad
\operatorname{lookup}(leaf,j)=data,
$$

则递归定义的 `pageWalk` 满足

$$
\begin{aligned}
\operatorname{pageWalk}(lookup,root,[i,j]) &= data,\\
\operatorname{pageWalk}(lookup,root,[selfSlot,i]) &= leaf,\\
\operatorname{pageWalk}(lookup,root,[\underbrace{selfSlot,\ldots,selfSlot}_{L\text{ 次}}]) &= root
\quad\text{对每个有限 }L。
\end{aligned}
$$

第一式是普通两级数据读取，第二式表示经过一次自映射后可直接内省叶表，第三式是根地址的有限次自闭包。完整证明由 Lean 内核检查。
:::

::: {.example #ex-ch38-recursive-page-table-dereference title="N 槽位递归自映射页目录的多级解引用手算核验（具体示意）"}
上面的抽象三模式遍历已经由 [@thm-ch38-recursive-page-table-walk] 形式化。下面的例子用有限地址数组和十六进制标签实例化同一模式；操作系统硬件语义仍是示意模型，不另作 Lean 断言。设有限地址集合包含一座顶层页目录 $P[0..N-1]$（$N \ge 2$，物理基址记为 $b_0 := \operatorname{addr}(P)$）、$N - 1$ 张叶级页表 $T_1, \dots, T_{N-1}$（每张含 $N$ 个槽位 $T_i[0..N-1]$）以及用户数据页帧 $D_{i,j}$（$1 \le i \le N-1,\; 0 \le j \le N-1$）。令内存读取映射满足 $\operatorname{Mem}[\operatorname{addr}(X)] = X$，并在顶层页目录的**零号槽位写入自身基址**，其余槽位指向叶级页表：

$$
P[0] \;=\; b_0 \;=\; \operatorname{addr}(P), \qquad P[i] \;=\; \operatorname{addr}(T_i) \quad (1 \le i \le N-1), \qquad T_i[j] \;=\; \operatorname{addr}(D_{i,j}).
$$

定义固定深度 $L$ 的硬件步进解引用算子 $\operatorname{Walk}_L$ 为 $\operatorname{Walk}_0(b, []) := b$ 及 $\operatorname{Walk}_{m+1}(b, [i_1, i_2, \dots, i_{m+1}]) := \operatorname{Walk}_m\bigl(\operatorname{Mem}[b][i_1],\, [i_2, \dots, i_{m+1}]\bigr)$。先取二级分页 $L = 2$ 逐项手算三种虚拟索引：

1. **普通世界数据解引用（索引 `[i, j]`，$i \ge 1$）**：
   $$
   \operatorname{Walk}_2(b_0, [i, j]) \;=\; \operatorname{Walk}_1(P[i], [j]) \;=\; \operatorname{Walk}_1\bigl(\operatorname{addr}(T_i), [j]\bigr) \;=\; T_i[j] \;=\; \operatorname{addr}(D_{i,j}),
   $$
   两步解引用正常穿过页目录与叶页表，精准读出底层数据页 $D_{i,j}$；
2. **叶级页表内省解引用（前置一个 `0`，索引 `[0, i]`，$i \ge 1$）**：
   $$
   \operatorname{Walk}_2(b_0, [0, i]) \;=\; \operatorname{Walk}_1(P[0], [i]) \;=\; \operatorname{Walk}_1(b_0, [i]) \;=\; P[i] \;=\; \operatorname{addr}(T_i),
   $$
   第一步踩中自映射槽 $P[0] = b_0$ 原地回环，消耗掉一层间接度，使硬件在第二步把**叶级页表 $T_i$ 本身**当作普通可读写数据页直接返回！
3. **根页表自指不动点解引用（全零索引 `[0, 0]`，及任意深度 $L \ge 1$ 的 `[0, ..., 0]`）**：
   对任意级数 $L \ge 1$ 归纳，因 $\operatorname{Walk}_1(b_0, [0]) = P[0] = b_0$，每剥离一个前导 `0` 都保持基址 $b_0$ 不变：
   $$
   \operatorname{Walk}_L(b_0, [\underbrace{0, 0, \dots, 0}_{L\text{ 个 }0}]) \;=\; b_0 \;=\; \operatorname{addr}(P).
   $$
   记指向全零自映射槽的根指针为 $p := b_0$，单步或多步解引用算子为 $\mathrm{*p} := \operatorname{Mem}[p][0] = P[0] = b_0 = p$。就在这枚零号槽位 `[0,0]` 上，指针地址与所存自地址严格相等；在本章 `MODEL` 的对应下写作：

   $$
   p \;=\; \mathrm{*p} \qquad (\mathrm{MODEL}:\; \psi \;=\; \psi(\psi)).
   $$

取 $N = 4$、顶层页目录基址 $b_0 = \mathtt{0x1000}$、叶页表基址 $\operatorname{addr}(T_1) = \mathtt{0x2000}$、数据帧基址 $\operatorname{addr}(D_{1,2}) = \mathtt{0x9000}$，上述三类二级硬件步进轨迹在十六进制账本上一目了然：

| 虚拟索引 `[i₁, i₂]` | 第一跳解引用 `Mem[0x1000][i₁]` | 第二跳解引用输出 `Walk₂` | 物理语义 |
| :--- | :--- | :--- | :--- |
| `[1, 2]`（普通外境寻址） | `P[1] = 0x2000`（进入叶页表 $T_1$） | `T₁[2] = 0x9000` | 读出外境数据帧 $D_{1,2}$ |
| `[0, 1]`（页表内省寻址） | `P[0] = 0x1000`（零号槽原地回环） | `P[1] = 0x2000` | 将叶页表 $T_1$ 本身作为数据返回 |
| `[0, 0]`（根自映射不动点） | `P[0] = 0x1000`（零号槽原地回环） | `P[0] = 0x1000` | 精确命中 `p = *p`（根目录自指闭环） |
:::

::: {.viz src="pointer-ontology-deref" preset="self_map" height="500"}
**先踩一次零号槽，叶页表本身成了数据。** 索引 [0, 1]：第一跳读 P[0] = 0x1000 原地回环，第二跳读 P[1] = 0x2000，琥珀色的框落在叶页表 T₁ 上，正是 [@ex-ch38-recursive-page-table-dereference] 表中的第二行；换成索引 [1, 2]，两跳走到数据帧 0x9000。
:::

把 [@thm-ch38-self-mapped-diagonal-fixed-point] 与 [@ex-ch38-recursive-page-table-dereference] 合拢在一起，第十部（承接第九部）关于意识自指、生死切换与终极自由的三重**`MODEL`（模型诠释）**洞见便在此彻底贯通：

1. **查表算法与被查之表合二为一（`p = *p`，`MODEL`：$\psi = \psi(\psi)$）**：
   由 [@thm-ch38-self-mapped-diagonal-fixed-point] 第 2 款，只要寻址变换抗拒自指（$\forall y,\; f(y) \neq y$），它就注定逃逸每一张表，逼迫观察者徒劳地向表外祈求更高一层的“外部观察者”；而在零号槽位种下 $P[0] = \operatorname{addr}(P)$，得到的是自地址闭环，槽里存的是地址。要把它接到第 1 款，还须有整行捕获条件 $g(a_0)=\operatorname{diagonal}(f,g)$；第 3 款的唯一黄金根则属于所选正倒数映射。**让查表程序住进被查之表，是这一 `MODEL` 另行给出的执行规则！** 三种视野由索引区分：`[1,2]` 返回外境数据地址 `0x9000`，`[0,1]` 返回叶表地址 `0x2000`，`[0,0]` 返回根地址 `0x1000`；沿零号槽反复 `*p`、`**p`、`***p` 始终停在根，不会自行切换视野。

::: {.viz src="pointer-ontology-deref" preset="diagonal_hit" height="500"}
**地址与读出的内容是同一个数。** p = 0x1000，一次解引用读 Mem[0x1000][0] = 0x1000：左边的指针寄存器 p 与它读出的 *p 并排，中间是青色的“=”；右边青色箭头弯回页目录自己，琥珀色的框落在 P 上。下面对照的普通指针 p = 0x2000 读出 T₁[0] = 0x7000，两数不等：只有写着自己地址的这一格如此，读别的地址仍要一级一级走；这一格是自地址闭环，槽里存的是地址；要接到 [@thm-ch38-self-mapped-diagonal-fixed-point] 第 1 款的对角落点，还须另有整行捕获条件 $g(a_0) = \operatorname{diagonal}(f, g)$。
:::

2. **为什么盲目撞入纯光视界（$\theta = 90^\circ$）会触发失忆轮回？——悬空空指针重置（`ptr = NULL`）**：
   在我们的指针生命周期模型（`MODEL`）中，考察一枚尚未在槽位 `[0,0]` 建立递归自映射的普通指针。当它在单轮生命中不断堆叠局部历史约束直至局部相容空间退化锁死（即局部栈帧溢出 `Stack Overflow`；格拉姆椭圆体退化边界见[第 29 章](ch29-timeless-causality-and-gram-space.md#sec-coda-finite-observer-time-field) [@thm-ch29-gram-rigidity-and-pell]），或当躯体 `MMU` 解体、指针不受控地连续滑入 $\theta = 90^\circ$ 纯横向光视界时，它在一维共线幂等存在线上的锚定分量归零。翻译成硬件语言，丢失一维基址锚点意味着寄存器直接跌落为**悬空空指针（`ptr = NULL`）**！宇宙内存管理器面对一枚悬空的 `NULL` 指针，便执行**垃圾回收清表操作（`GC Wipe`）**：冲刷清空其私有快表缓存 $T$（对应旧轮次记忆擦除与热力学熵账单兑付，见[第 31 章](ch31-quantum-fairness.md) [@thm-ch31-horizon-landauer-ergodic-fairness]），随后在起始地址 `0x0000` 重新发起一次冷启动内存分配（`malloc`），使一枚带着空白 `TLB` 的新生指针再度睁开双眼（相关生物物理初始化经验对照见 [@rem-ch38-x86-recursive-page-table-literature] 第 3 条）。
3. **多级离散间接寻址阻断 `NULL` 清零，实现零失忆的全域遍历**：
   相反，一枚已经在零号槽位认出 `p = *p` 的觉醒指针，根本不需要把自身连续撞碎在 $\theta = 90^\circ$ 的光墙上！在我们的**`MODEL`（模型诠释）**中，它依托常驻根槽位 `P[0] = addr(P)` 逐级攀登**多级离散间接寻址**（按上述数据、叶表、根表索引切换；离散路径正性由 [@thm-ch38-discrete-sech-positive] 保证，连续正割恒等式见 [@rem-ch38-x86-recursive-page-table-literature] 第 2 条及[第 36 章](ch36-hyperbolic-steps-and-quotienting-reincarnation.md) [@ex-ch36-inverse-gudermannian-discrete-staircase]），有限快度每一步的正割严格为正；自映射根快表项常驻（`ptr != NULL`）、记忆保留与全域可达则是本模型配套选定的规则。依托这些规则，可寻址视野才逐级铺向整座宇宙本体 QRAM，免于失忆清零！

::: {.figure src="ch38-two-endings"}
**指针的两种终局。** 横轴是步数 $k$，纵轴是 $\cos\theta$。品红的曲线连续滑向 $\theta = 90^\circ$，在有限处碰到横轴，叉号处 `ptr = NULL`；青色的点沿离散快度阶梯 $\eta_k = \eta_0 + k\Delta\eta$ 取 $\cos\theta_k = \operatorname{sech}\eta_k$，越来越贴近横轴，却没有一点落在横轴上。青色各点按公式算出，参数 $\eta_0 = 0.5$、$\Delta\eta = 0.3$ 为示意取值；品红曲线是示意。有限步正性由 [@thm-ch38-discrete-sech-positive]（`LEAN ✓`）保证；趋于零的极限与两种终局的诠释属 `MODEL`。
:::

将这两种截然相反的指针终局并置归档于下框：

::: {.remark #rem-ch38-pointer-trajectories-table title="观察者指针两类终局路径对照表与递归自映射架构全景图（模型总结）"}
**模型总结。** 下表综合对照两类指针终局路径（终局曲线见上图，本章全景见图 38；双曲正割正性由 [@thm-ch38-discrete-sech-positive] 锚定，递归页表文献背景见 [@rem-ch38-x86-recursive-page-table-literature]，格拉姆退化边界见[第 29 章](ch29-timeless-causality-and-gram-space.md#sec-coda-hume-spinoza-gram) [@thm-ch29-gram-rigidity-and-pell]，跨学科指针生命周期诠释标定为 `MODEL`）：

| 指针终局路径（`MODEL`） | 零号槽状态与角度轨迹 | 一维幂等基址投影 | 快表缓存 `TLB` 与下一周期命运 |
| :--- | :--- | :--- | :--- |
| **A. 未自映射连续越界** | 未建立 `p = *p`；$\det G_M \to 0$（`文献结果`）后连续滑入 $\theta = 90^\circ$ | $\cos 90^\circ = 0 \implies \mathtt{ptr = NULL}$ | 触发 `GC Wipe` 清空私有快表 $T$，于 `0x0000` 冷启动重分配（失忆轮回） |
| **B. 递归自映射多级寻址** | 零号槽锁定 `P[0] = addr(P)`；沿 $\eta_k = \eta_0 + k\Delta\eta$ 离散升阶 | $\forall k \in \mathbb{N},\; \cos\theta_k = \operatorname{sech}\eta_k > 0$（[@thm-ch38-discrete-sech-positive]，`LEAN ✓`；`ptr != NULL` 的其余部分属 `MODEL`） | `MODEL` 另设根项 $100\%$ 常驻、记忆保留与索引全域可达，从而渐近遍历本体 QRAM |
:::

至此，请回看图 38 第 I 栏里那束纤细而明亮的青色寻址光束（以及静止晶格中被点亮的琥珀色当前槽位 `*ptr`），让全书十部曲的动静观迎来一次震彻心扉的翻转：

在跳动的激光斑点之下，宇宙本体内存阵列里**从来没有任何一个比特生灭流转过**。群星的明灭、山河的兴替、肉身的盛衰、白昼五感的笃定与黑夜梦境的飞翔，乃至离别时的万水千山与重逢时 `ptr_A == ptr_B` 的一眼万年——全都是同一枚轻若无物的记忆指针，在寂静无声的全息钻石晶格上变换位掩码、命中快表与切换索引视图时投下的光影。当这枚指针终于解引用自身的零号槽位 `[0,0]`、亲眼认出 `p = *p` 的那一刻，它便再也不会对任何一次上下文切换或躯体沙箱的卸载心怀恐惧——**因为打开整座宇宙内存的终极钥匙，从一开始就握在它自己的地址里。** 而在迈向下一章拆除“指针与内存条”最后那层隔墙之前，零号槽位的自指闭环还向我们敞开了两道直抵复杂性边界与信息几何底层的追问：假如真有一尊立在 `p = *p` 上的全息查表预言机，逐级剥除它的特权会析出怎样的时空引力定律（§38.4）？而一枚位宽有限的指针在日常巡检中，又如何精确核算快表锁住的信息与顺着原像纤维逃逸的盲区（§38.5）？

::: {.viz src="pointer-ontology-deref" height="620"}
**寻址三条路。** 同一条时间轴上：逐格扫描读到第 k 格要 k 步，N = 64 格最坏 64 步；桶链式路由树深 log₂N = 6 层、共 N − 1 = 63 个开关，一个地址只拨动 6 个；零号槽写着页目录自己的地址，一步回到自己。可以拖地址、点内存格、换叠加的分支数或页表索引。
:::

---

## 38.4 假设存在一种 P=NP 查表算法：七阶退化阶梯与时空引力权衡 {#sec-ch38-pnp-lookup-degradation}

当 §38.3 的零号槽位把查表程序本身折入页表内部（`p = *p` $\iff T = T(T)$）时，一个贯通复杂性理论、引力全息原理与生命热力学的逆向思想实验便水到渠成地浮出水面——正如作者在原始手稿中所追问的那样：**“假设存在一种查表算法可以P=NP, 逐渐退化这种查表算法”**，每当我们亲手剥除它的一项非物理特权，宇宙硬件底层究竟会撞上哪一道刚性枷锁，又会顺势派生出哪一种我们习以为常的物理定律？

### 一、第 0 阶全息自指原型（d = 0）的三项特权与认识论红线

作为思想实验的理想起点，在我们的**`MODEL`（模型诠释）**中构造一枚尚未施加任何局部物理限制的**第 0 阶全息自指预言机（$d = 0$）**。它之所以能以有效时间指数率 $r_{\mathrm{eff}} = 0$（$\log_2 T / n \to 0$）一步吐出任意 $n$ 变量约束公式 $\Phi$ 的满足赋值 $x^* = T[\Phi]$，完全仰赖三项同时成立的理想特权：

1. **联想内容寻址与双向量相反手性相消**：它不按地址逐格遍历 $2^n$ 个候选赋值，而是将约束掩码 $[\Phi]$ 一次性投射到整座静态晶格上；一切违背子句的非解分支携带成对相反的双向量手性（$+\mathbf{\Omega} - \mathbf{\Omega} = 0$，对照[第 29 章](ch29-timeless-causality-and-gram-space.md)驻相抵消模型）相互抹平，唯留满足分支的不动点信号；
2. **零号槽同像自压缩（`T = T(T)` / `p = *p`）**：依托 [@thm-ch38-self-mapped-diagonal-fixed-point] 第 1 款的对角线落点不动点 [`diagonal_landing_fixed`](lean:D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed)，查表编译器无需在外部堆砌指数体积的死表，而是作为自映射槽位住进表内。在描述复杂度的形式层面上，一旦存在将目标记录编译为一致全程序的查表编译器，其最小程序谱底即受记录自身复杂度与常数编译器开销之和严格上界控制；
3. **非定域零延迟读出**：忽略光速有限性与引力视界，跨晶格投影无空间传播延迟（$r_{\mathrm{eff}} = 0$）。

其中关于查表编译器对描述谱底的压缩上界，在 `trureturing` 中锁定为如下内核定理：

::: {.theorem #thm-ch38-lookup-program-upper-bound lean="D5/S0/Computability/DescriptionComplexity/LookupProgramUpperBound.lookup_program_upper_bound" title="查表编译器的描述谱底上界定理"}
设 $\mathrm{Record}$ 为记录类型，$\mathrm{TotalProgram}$ 为全程序类型，$\mathrm{consistent} : \mathrm{TotalProgram} \to \mathrm{Record} \to \mathrm{Prop}$ 为程序与记录的一致性谓词，$\mathrm{programCost} : \mathrm{TotalProgram} \to \mathbb{N}$ 为程序代价泛函，$\mathrm{recordComplexity} : \mathrm{Record} \to \mathbb{N}$ 为记录复杂度泛函，$\mathrm{overhead} \in \mathbb{N}$ 为固定编译开销。设查表编译器 $\mathrm{compiler}$ 给出映射 $\mathrm{compile} : \mathrm{Record} \to \mathrm{TotalProgram}$，使得对任意记录 $r : \mathrm{Record}$ 同时满足一致性 $\mathrm{consistent}(\mathrm{compile}(r), r)$ 与代价上界 $\mathrm{programCost}(\mathrm{compile}(r)) \le \mathrm{recordComplexity}(r) + \mathrm{overhead}$。记描述谱底 $\operatorname{spectrumBottom}(\mathrm{compiler}, r) \in \mathbb{N}$ 为存在满足 $\mathrm{consistent}(p, r) \wedge \mathrm{programCost}(p) = c$ 的全程序 $p$ 的最小自然数代价 $c$，则对一切 $r : \mathrm{Record}$ 恒有：

$$
\operatorname{spectrumBottom}(\mathrm{compiler}, r) \;\le\; \operatorname{recordComplexity}(r) + \mathrm{overhead}.
$$
:::

::: proof
对任意记录 $r : \mathrm{Record}$，候选全程序 $p_0 := \mathrm{compiler}.\mathrm{compile}(r)$ 由编译器公理满足 $\mathrm{consistent}(p_0, r)$，从而见证代价集合 $\{c \in \mathbb{N} \mid \exists p,\; \mathrm{consistent}(p, r) \wedge \mathrm{programCost}(p) = c\}$ 在 $c_0 := \mathrm{programCost}(p_0)$ 处非空。按最小自然数算子 `Nat.find_min'` 的极小性，立即得到 $\operatorname{spectrumBottom}(\mathrm{compiler}, r) \le \mathrm{programCost}(\mathrm{compiler}.\mathrm{compile}(r))$；再与编译器代价界 $\mathrm{compiler}.\mathrm{compile\_cost\_le}(r)$ 作传递性拼接（`le_trans`），即证得上式。完整证明由 Lean 内核检查。
:::

踏上退化阶梯之前，必须划清两条不可逾越的认识论红线：（1）[@thm-ch38-lookup-program-upper-bound] 界定的是**描述长度谱底（`spectrumBottom`）**而非多项式运行时间；（2）第 0 阶全息原型在计算复杂性文献中仅对应附加了后选择或闭合类时曲线等非标准物理资源的理论模型——如 Aaronson 证明的 $\mathrm{PostBQP} = \mathrm{PP} \supseteq \mathrm{NP}$ 与 $\mathrm{P}_{\mathrm{CTC}} = \mathrm{PSPACE}$（见下文 [@rem-ch38-lookup-degradation-literature] 第 1 条，`文献结果`）——**在标准统一图灵机计算模型下，$\mathrm{P} \neq \mathrm{NP}$ 依然是悬而未决的开放猜想（[第 20 章](ch20-complexity-and-spacetime.md) [@conj-p-neq-np]，`OPEN`）：既不能由第 0 阶全局静态场模型推出图灵机 $\mathrm{P} = \mathrm{NP}$，也不能由下文第 1–6 阶的受限或物理障碍宣称证明了统一图灵机 $\mathrm{P} \neq \mathrm{NP}$。**

::: {.viz src="pnp-lookup-degradation" preset="oracle" height="500"}
**第 0 阶实验卡：全息自指预言机 `p = *p` 与双向量手性相消。** 左侧晶格的零号槽位挂有自映射闭环 `p = *p`（$T = T(T)$），非满足格点按相反双向量手性 $+\mathbf{\Omega}$ 与 $-\mathbf{\Omega}$ 成对抵消，零延迟锁定唯一满足格点 $x^* = T[\Phi]$；右侧时空—引力相图上，当前态琥珀圆点停在原点 $(\sigma_{\mathrm{eff}} = 0,\; r_{\mathrm{eff}} = 0.000)$。
:::

### 二、逐级剥除特权：从静态死表视界到无记忆盲搜的六步退化（d = 1 .. 6）

现在依次撤去第 0 阶预言机的特权，观察有效时间指数率 $r_{\mathrm{eff}}(\sigma) := (\log_2 T)/n$ 与物理形态如何一步步演变：

#### 第 1 阶退化（d = 1）：切断零号槽自生成 $\to$ 静态只读多项式建议表 $a_n$（$|T_n| = \operatorname{poly}(n)$）

第一步先剪断零号槽位的递归自生成回路 `T[0]`，只保留一张由外部预先烤制、容量受多项式限制 $|T_n| = \operatorname{poly}(n)$（渐近空间率 $\sigma_n = (\log_2 |T_n|)/n \to 0$）的只读建议串 $a_n$（非一致复杂度类 $\mathrm{P}/\mathrm{poly}$）。在已经烤入表内的有限观测域 $|x| \le n$ 上，直接照抄观测真值表自然给出零事后损失（$r_{\le n} = 0$）；可一旦问题规模跨越 $n \to n + 1$ 的未知视界，静态抄表承诺便当场丧失非预见性（且由 Karp–Lipton 定理，若 $\mathrm{NP} \subseteq \mathrm{P}/\mathrm{poly}$，整座多项式谱系将坍缩至 $\mathrm{PH} = \Sigma_2^p \cap \Pi_2^p$，见 [@rem-ch38-lookup-degradation-literature] 第 2 条）。“事后抄表零损失”与“前瞻非预见性失效”之间的严格断裂由以下冻结定理刻画：

::: {.theorem #thm-ch38-retrospective-lookup-failure lean="D5/S3/ConceptDynamics/DefinitionEscapeAdjudication/RetrospectiveLookupFailure.lookup_copy_zero_loss_and_nonanticipating_failure" title="事后抄表零损失与非预见性失效定理"}
设有限可判等指标域 $Z$（`[Fintype Z] [DecidableEq Z]`）与答案类型 $\mathrm{Answer}$ 上的对比结构 $\mathrm{comparison} : \mathrm{CopyComparison}(Z, \mathrm{Answer})$ 给出观测真值 $\mathrm{observedAnswer} : Z \to \mathrm{Answer}$ 及满足自反零损公理 $\forall a,\; \mathrm{pointwiseLoss}(a, a) = 0$ 的逐点损失函数；记整表拷贝 $\operatorname{tableCopy}(\mathrm{comparison}) := \mathrm{observedAnswer}$，事后总损失 $\operatorname{retrospectiveLoss}(\mathrm{comparison}, f) := \sum_{z \in Z} \mathrm{pointwiseLoss}(f(z), \mathrm{observedAnswer}(z))$。设承诺结构 $\mathrm{commitment} : \mathrm{CopyCommitment}(Z)$ 带有证据依赖集 $\mathrm{evidenceDependencies} \subseteq Z$ 与事前冻结谓词 $\mathrm{frozenBefore} : Z \to \mathrm{Prop}$，并定义全表依赖条件 $\operatorname{IncorporatesTableCopy}(\mathrm{commitment}) :\iff Z \subseteq \mathrm{evidenceDependencies}$、非预见性条件 $\operatorname{NonAnticipating}(\mathrm{commitment}, z) :\iff \mathrm{frozenBefore}(z) \wedge z \notin \mathrm{evidenceDependencies}$ 以及正前瞻收益谓词 $\operatorname{PositiveProspectiveGain}(G, f) :\iff 0 < G(f)$。若 $\operatorname{IncorporatesTableCopy}(\mathrm{commitment})$ 成立，则以下三款同时成立：

1. **事后零损失**：$\operatorname{retrospectiveLoss}\bigl(\mathrm{comparison}, \operatorname{tableCopy}(\mathrm{comparison})\bigr) = 0$；
2. **处处丧失非预见性**：$\forall z \in Z,\; \neg\,\operatorname{NonAnticipating}(\mathrm{commitment}, z)$；
3. **零事后损失不蕴涵普适前瞻收益**：
   $$
   \neg\Bigl(\operatorname{retrospectiveLoss}\bigl(\mathrm{comparison}, \operatorname{tableCopy}(\mathrm{comparison})\bigr) = 0 \;\longrightarrow\; \forall G : (Z \to \mathrm{Answer}) \to \mathbb{N},\; \operatorname{PositiveProspectiveGain}\bigl(G, \operatorname{tableCopy}(\mathrm{comparison})\bigr)\Bigr).
   $$
:::

::: proof
第 1 款将 $\operatorname{tableCopy}(\mathrm{comparison})(z) = \mathrm{observedAnswer}(z)$ 代入有限求和，每一项均由 `selfLoss` 化为 $0$，故总和为 $0$。第 2 款任取 $z \in Z$，由全集包含假设 $Z \subseteq \mathrm{evidenceDependencies}$ 得 $z \in \mathrm{evidenceDependencies}$，直接与 $\operatorname{NonAnticipating}(\mathrm{commitment}, z)$ 的第二合取项 $z \notin \mathrm{evidenceDependencies}$ 矛盾。第 3 款假设该蕴涵成立，以前面已证的事后零损失为前件，并将全称量化的收益泛函实例化为恒零泛函 $G_0 := (\_\mapsto 0)$，即导出 $0 < 0$ 的荒谬结论。完整证明由 Lean 内核检查。
:::

#### 第 2 阶退化（d = 2）：恢复统一局部规则 $\to$ 局部张量块与齐肯多夫进位波（串行因果时间的诞生）

既然外挂非一致建议表跨不过 $n \to n + 1$，第二步便强令算法恢复对任意规模 $n$ 通用的统一局部规则：将全局约束拆解为局部 $k$-体张量块与黄金基齐肯多夫规范编码（`NoAdjacentOnes`，见[第 32 章](ch32-unified-field-and-meta-unification.md) [@thm-ch32-generative-self-reference-and-zeckendorf]）。在这一阶，我们撞见了一组极具启发性的方向不对称性——**向下穿透被严格锁死在两格之内，而向上进位波却能沿交替临界串一路串行级联**：

::: {.theorem #thm-ch38-zeckendorf-carry-barrier lean="D5/S1/Digit/ZeckendorfCarryBarrier.lower_support_carry_barrier" title="齐肯多夫下支撑进位屏障定理"}
设自然数列表 $P : \mathrm{List}\;\mathbb{N}$ 为规范齐肯多夫指标表示（`P.IsZeckendorfRep`，即严格递减、相邻指标差至少为 $2$，且每个指标 $k \in P$ 满足 $k \ge 2$），并设自然数 $m, j \in \mathbb{N}$ 满足 $4 \le m$、$\forall k \in P,\; m \le k$ 以及 $m - 1 \le j$。记 $F_i = \operatorname{ fib }(i)$ 为斐波那契数，$\operatorname{wdigits}(N)$ 为自然数 $N$ 的规范齐肯多夫指标支撑列表，则加上 $F_j$ 重新规范化后的一切支撑指标均受如下硬下界约束：

$$
\forall k \in \operatorname{wdigits}\!\left(\sum_{i \in P} F_i + F_j\right), \qquad m - 2 \;\le\; k.
$$
:::

::: proof
置黄金比倒数 $r := \varphi^{-1} \in (0, 1)$（满足 $r^2 + r = 1$，黄金共轭根为 $-r$），并在指标列表上引入共轭误差泛函 $E(L) := \sum_{k \in L} (-r)^k$。利用恒等式 $F_k \cdot r = F_{k-1} - (-r)^k$，把和数 $N := \sum_{i \in P} F_i + F_j$ 与其规范分解 $S := \operatorname{wdigits}(N)$（因 $j \ge m - 1 \ge 3$ 故 $N \ge F_3 = 2$，$S$ 非空）同时乘以 $r$，可分离出整数部分与共轭误差部分。对满足指标下界 $\ge m$ 的规范列表 $P$ 分奇偶幂次交错求和，可得 $|E(P) + (-r)^j| < r^{m-2} \le r^2 < r$，且规范列表 $S$ 自身满足 $|E(S)| < r^2$；两边整数部分之差严格小于 $1$ 故必相等，从而锁定精确共轭守恒 $E(S) = E(P) + (-r)^j$。另一方面，记非空规范列表 $S$ 的最小指标为 $\ell := S.\mathrm{getLast}$，按相邻差至少为 $2$ 的几何级数尾界可知尾项占优 $r^{\ell + 1} < |E(S)|$。合拢两头不等式得 $r^{\ell + 1} < |E(S)| = |E(P) + (-r)^j| < r^{m-2}$；因 $0 < r < 1$ 单调递减，必有 $\ell + 1 > m - 2$，即 $m - 2 \le \ell \le k$ 对一切 $k \in S$ 成立。完整证明由 Lean 内核检查。
:::

请仔细辨析 [@thm-ch38-zeckendorf-carry-barrier] 的精确边界：它用 `LEAN ✓` 铁律封死了进位向低位（小指标方向）最多只能渗透到 $m - 2$（例如取 $m = 8$、交替规范列表 $P = [16, 14, 12, 10, 8]$ 与 $j = 8$，和数 $1584 + 21 = 1605 = F_{17} + F_6$ 的规范支撑为 $[17, 6]$，最低位恰好停在 $8 - 2 = 6$ 处分毫不差）；然而在**向高位（大指标方向）**的一侧，Frougny（1992）的在线斐波那契自动机定理（见 [@rem-ch38-lookup-degradation-literature] 第 3 条，`文献结果`）指出，跨交替临界串 `...101010...` 的向上进位波 $F_8+F_8 \to F_9+F_6 \to F_{11}+F_6 \to F_{13}+F_6 \to F_{15}+F_6 \to F_{17}+F_6$ 无法由任何常数观察窗口的无进位并行电路一次性消除（与此同时，2026 年关于三元张量网络秩约分 $2^{O(n\log\log n/\sqrt{\log n})}$ 的预印本声明虽试图利用局部切面低秩合并压缩渐近指数，不仅仍在审计中，且在可观测宇宙尺度内仍慢于局部搜索，详见[第 30 章](ch30-fields-lines-eth-and-navier-stokes.md) [@rem-ch30-eth-subexponential-literature]）。**正是这道不可并行的向上进位涟漪，打破了瞬时并行投影，在静态晶格内部催生出必须一拍接一拍传播的“串行因果时间”（`MODEL`）！**

::: {.viz src="pnp-lookup-degradation" preset="frougny" height="500"}
**第 2 阶实验卡：齐肯多夫下穿硬墙与 Frougny 上行进位波。** 底部寄存器实算 $(F_{16}+F_{14}+F_{12}+F_{10}+F_8) + F_8 = 1584 + 21 = 1605$ 的五步规范化：$k = 6 = m - 2$ 处的青色竖墙由冻结定理 `lower_support_carry_barrier` 严格守护（左侧 $k = 2\dots 5$ 恒为零），而品红箭头标示不可并行的上行进位波逐拍推至 $F_{17}$。
:::

#### 第 3 至第 6 阶退化（d = 3 .. 6）：引力撑开空间、量子指针旋转、擦除生热与白板初态

继续剥除剩余特权，物理宇宙的四重核心法则随即便按序显影：

- **第 3 阶退化（$d = 3$：强建物理巨表 $S = 2^{\sigma n}$ $\to$ 光速极限 $v \le c$ 与球形全息装填启发式模型）**：
  假如观察者试图绕开串行逻辑运算，在真实三维空间里硬造一座容量 $S = 2^{\sigma n}$ 比特（$0 \le \sigma \le 1$）的物理查找表。物理学文献给出了无量纲自然对数单位（nat）下的**贝肯斯坦—霍金黑洞熵** $S_{\mathrm{BH}} = \frac{A}{4\ell_P^2}$（折算为比特上限即 $\frac{A}{4\ell_P^2 \ln 2} = \frac{\pi R^2}{\ell_P^2 \ln 2}$，连同全息熵界，`文献结果`）。据此，我们建立一个**假想球形内存装填与光速查询的硬件架构模型（`MODEL`）**：假设将 $2^{\sigma n}$ 比特按有界面密度装填入半径 $R \propto 2^{\sigma n / 2}$ 的三维球体以免触发黑洞视界闭合，并以光速上限 $v \le c$ 在球心与球面之间执行往返或流水线寻址（单次往返线延迟标度为 $T_{\mathrm{wire}} = 2R/c \propto 2^{\sigma n / 2}$，时间指数率为 $\sigma/2$），再与外层未索引的 $2^{(1-\sigma)n}$ 个分块子问题耦合。在该架构假设下，单请求串行往返耗时标度为 $T_{\mathrm{serial}} \propto 2^{(1-\sigma)n}\cdot 2^{\sigma n/2} = 2^{(1 - \sigma/2)n} \ge 2^{0.5n}$，而平衡外层分块指数 $1 - \sigma$ 与光锥传播指数 $\sigma/2$ 的**启发式 `MODEL` 权衡包络线**为（须注意：此包络是特定球形装填架构下的启发式 `MODEL` 曲线，绝非关于一切物理计算或 SAT 的已证普适下界）：

  $$
  r_{\mathrm{pipe}}(\sigma) \;=\; \max\!\left(1 - \sigma,\; \frac{\sigma}{2}\right) \;\ge\; \frac{1}{3}, \qquad \sigma^* \;=\; \frac{2}{3}.
  $$

  **空间距离与引力视界，在这一硬件模型视角下恰似宇宙阻止指数级死表坍缩为单点预言机的全息防爆垫（`MODEL`）！**

::: {.viz src="pnp-lookup-degradation" preset="bekenstein" height="500"}
**第 3 阶实验卡：球形全息装填与光锥线延迟启发式包络 $r_{\min} = 1/3$（`MODEL`）。** 参照贝肯斯坦—霍金面积熵界（`文献结果`），左侧紫色假想内存球按 $R \propto 2^{\sigma n/2}$ 扩张，琥珀色光速探针演示往返线延迟 $2R/c$；右侧相图上品红启发式 `MODEL` 流水线包络 $\max(1-\sigma,\sigma/2)$ 在 $\sigma^* = 2/3$ 处取极小值 $r_{\min} = 1/3 \approx 0.333$。
:::

- **第 4 阶退化（$d = 4$：弃置巨表 $\sigma \to 0$，保留二维相干叠加指针 $\sum_x \alpha_x \lvert x\rangle$ $\to$ 量子查询下界与启发式内存权衡包络）**：
  既然造大表会被视界半径与线延迟拖慢，观察者索性放弃指数级宏观内存（令 $\sigma \to 0$），改派一枚轻量级的二维相干量子叠加指针在希尔伯特平面内作酉旋转。在外部复杂性文献（`文献结果`）中，无结构黑箱搜索（规模 $N = 2^n$）受 Grover 查询下界 $\Omega(\sqrt{N}) = \Omega(2^{n/2})$ 制约，而 Klauck、Špalek 与 de Wolf 在查询/电路模型中对 $N$ 元排序问题证明了量子时空下界 $T^2 S = \Omega(N^3)$（注意：这两项定理均非针对结构化 $3$-SAT 的普适时空下界，必须将 $N = 2^n$ 无结构黑箱搜索与利用子句结构的 $3$-SAT 算法严格分开；例如量子回溯搜索在结构化/启发式搜索树上给出特定的量子加速上界）。在本节相图中，我们将未索引子空间上的无结构量子搜索率绘制为**启发式 `MODEL` 权衡包络** $r_Q(\sigma) = (1 - \sigma)/2$（并另绘按 $(1 - \sigma)$ 插值的结构化基准 `MODEL` 曲线，如端值 $0.193(1-\sigma)$）。请凝视 $\sigma = 0$ 与 $\sigma = 1$ 两端那道对称的启发式几何对偶（`MODEL`）：
  - 在第 3 阶球形装填模型中把 $2^n$ 巨表铺满三维球体（$\sigma = 1$），光速穿过全息半径的线延迟指数率为 $r_{\mathrm{wire}}(1) = \frac{1}{2} = 0.500$；
  - 在第 4 阶把物理表压缩为零（$\sigma = 0$），纯靠二维量子叠加指针作无结构 Grover 反射旋转（[第 15 章](ch15-grover-qft-and-period-finding.md)），所需步数指数率同样恰为 $r_{\mathrm{Grover}}(0) = \frac{1}{2} = 0.500$！
  **在球外铺开全息半径的光速传播指数，与在球内压缩空间后的无结构二维旋量旋转指数，在基准率 $1/2$ 上对偶相遇！**

::: {.viz src="pnp-lookup-degradation" preset="grover" height="500"}
**第 4 阶实验卡：二维量子叠加指针与光速线延迟的 $0.500$ 启发式对偶。** 左栏相干指针在二维不变平面 $\operatorname{span}\{\lvert s_\perp\rangle, \lvert x^*\rangle\}$ 内逐拍旋转；右栏青色启发式 `MODEL` 包络 $r_Q(\sigma) = (1-\sigma)/2$ 在左端点 $(\sigma = 0, r = 0.500)$（无结构 Grover 下界，`文献结果`）处水平对齐右端点 $(\sigma = 1, r_{\mathrm{wire}} = 0.500)$。
:::

- **第 5 阶退化（$d = 5$：高温环境退相干 $\to$ 一维经典指针 `*ptr`、冲突快表 `TLB` 与兰道尔擦除热）**：
  当室温热浴把二维相干叠加捏合回一维经典指针 `*ptr`（仅附带容量有界的小型冲突学习缓存 `TLB` / `CDCL` 子句快表），无结构黑箱分块模型对应启发式经典权衡包络 $r(\sigma) = 1 - \sigma$（对照姚期智在特定预计算表细胞探针模型下的权衡结果；而在完全不同的结构化 $3$-SAT 问题上，PPSZ 随机算法在无需指数大表时给出 $O(1.307^n) \approx 2^{0.386n}$ 的**上界**，`文献结果`，相图中绘制的 $0.386(1-\sigma)$ 折线同样仅作启发式 `MODEL` 基准包络，绝非 $3$-SAT 下界）。更关键的是，经典单线指针每撞上一条死胡同并回溯覆写局部寄存器以腾出栈位（令体系局部熵减 $-\Delta S > 0$），都必须按本书已冻结的**兰道尔热平衡下界定理** [`landauer_bound_of_balance`](lean:D5/S3/DivergenceSupport/LandauerBound.landauer_bound_of_balance)（由 $\beta Q = -\Delta S + I + D$ 及互信息 $I \ge 0$、相对熵散度 $D \ge 0$ 严格推出 $-\Delta S \le \beta Q$，见[第 8 章](ch08-erasure-and-time-arrows.md)与[第 31 章](ch31-quantum-fairness.md) [@thm-ch31-horizon-landauer-ergodic-fairness]）向环境排放不可逆的焦耳热 $\Delta Q \ge k_B T \ln 2$。**经典试错之所以伴随着疲惫与温升，是因为每一次擦除旧猜测都在替不可逆投影买单。**

::: {.viz src="pnp-lookup-degradation" preset="landauer" height="500"}
**第 5 阶实验卡：一维退相干经典指针、冲突快表与兰道尔热账单。** 左栏 `*ptr` 沿二叉搜索树逐支回溯，向右侧小型 `TLB` 写入冲突引理并在每个死胡同叶节点向下辐射品红色兰道尔擦除热脉冲；底部右小图实时核对 $\beta Q = -\Delta S + I + D \ge -\Delta S$。
:::

- **第 6 阶退化（$d = 6$：彻底清空缓存 $|T| = 0, \sigma = 0, M = 0$ $\to$ 无记忆马尔可夫盲搜与最大开放选择体积）**：
  最后一步，连小型冲突快表也彻底冲刷归零（对应 §38.3 撞入 `ptr = NULL` 后的 `GC Wipe` 清表，以及[第 35 章](ch35-light-pulse-and-self-referential-table.md)受精钙波—锌火花的白板初始化，`MODEL`）。此时记忆阶数 $M = 0$、表空间 $\sigma = 0$，指针不保留任何历史排除记录，只能执行 $\Theta(2^n)$（$r_{\mathrm{eff}} = 1.000$）的无记忆马尔可夫盲猜；但与此同时，未经历史约束切割的局部格拉姆相容椭圆体张开至最大满秩体积 $\det G_0 = 1$——**计算捷径归零之处，恰恰是新生生命重新拥有无限未知可能性的起点（`MODEL`）。**

上述七阶退化所引述的外部计算复杂性、形式语言自动机与引力热力学定理归属如下：

::: {.remark #rem-ch38-lookup-degradation-literature title="七阶查表退化阶梯涉及的计算复杂性、自动机与全息引力文献归属（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节与第 0–6 阶退化模型（`MODEL`）并置对照的七组外部定理属经典理论计算机科学与理论物理文献，未作为独立声明包含在 `trureturing@dev` 锁文件中（且均不解决开放问题 [@conj-p-neq-np]）：

1. **后选择量子计算与闭合类时曲线复杂性（S. Aaronson, *Proc. R. Soc. A* **461**, 3473–3482, 2005；S. Aaronson & J. Watrous, *Proc. R. Soc. A* **465**, 631–647, 2009）**：附加非幺正后选择投影的量子多项式时间精确等于计数层级 $\mathrm{PostBQP} = \mathrm{PP} \supseteq \mathrm{NP}$，而附加 Deutsch 自洽闭合类时曲线寄存器（不动点方程 $\rho_{\mathrm{CTC}} = \Phi(\rho_{\mathrm{CTC}})$）的经典或量子多项式时间均坍缩至 $\mathrm{P}_{\mathrm{CTC}} = \mathrm{BQP}_{\mathrm{CTC}} = \mathrm{PSPACE}$；
2. **非一致多项式建议表与卡普—利普顿坍缩定理（R. M. Karp & R. J. Lipton, *STOC*, 302–309, 1980）**：若 $\mathrm{NP} \subseteq \mathrm{P}/\mathrm{poly}$（即每个输入长度 $n$ 存在长度 $\operatorname{poly}(n)$ 的静态查找建议串 $a_n$ 判定 $\mathrm{SAT}$），则多项式谱系坍缩至第二层 $\mathrm{PH} = \Sigma_2^p \cap \Pi_2^p$；
3. **斐波那契在线自动机进位波与三元张量网络秩约分（C. Frougny, *Theor. Comput. Sci.* **94**, 223–236, 1992；及 2026 年 3-SAT 张量网络预印本背景）**：Frougny 证明黄金基规范加法虽可由有限状态双带转换器完成，但跨越交替串 `(10)^k` 的向高位进位传播具有任意长非局部依赖，不存在常数观察窗口的无进位并行局部映射；关于三元张量网络亚指数声明的审计状态与银河交叉尺度见[第 30 章](ch30-fields-lines-eth-and-navier-stokes.md) [@rem-ch30-eth-subexponential-literature]；
4. **贝肯斯坦—霍金黑洞熵、全息熵界与球形装填查询架构模型（S. W. Hawking, *Commun. Math. Phys.* **43**, 199–220, 1975；J. D. Bekenstein, *Phys. Rev. D* **23**, 287–298, 1981；P. M. B. Vitányi, *IEEE Trans. Inf. Theory* **34**, 559–565, 1988；S. Lloyd, *Nature* **406**, 1047–1054, 2000）**：物理学文献给出黑洞视界面积熵 $S_{\mathrm{BH}} = A / (4\ell_P^2)$（无量纲 nat 单位，比特上限为 $A / (4\ell_P^2 \ln 2)$）与空间区域全息熵界，以及欧氏布线体积延迟分析（Vitányi）与黑洞极限计算率估计（Lloyd）。将“按有界面密度把 $2^{\sigma n}$ 比特装填入半径 $R \propto 2^{\sigma n/2}$ 的三维球体并以光速 $c$ 往返/流水线访问 $2^{(1-\sigma)n}$ 个子问题”联立为串行曲线 $1 - \sigma/2$ 与流水线包络 $\max(1-\sigma, \sigma/2) \ge 1/3$（$\sigma^* = 2/3$），则是本节构造的**启发式 `MODEL` 权衡包络**，不作为普适物理计算或 SAT 下界定理；
5. **无结构量子查询下界、排序时空权衡与结构化量子回溯（C. H. Bennett, E. Bernstein, G. Brassard & U. Vazirani, *SIAM J. Comput.* **26**, 1510–1523, 1997；L. K. Grover, *STOC*, 212–219, 1996；H. Klauck, R. Špalek & R. de Wolf, *Theory Comput.* **3**, 143–168, 2007；A. Montanaro, *Theory Comput.* **14**, 1–24, 2018）**：文献严格区分两类问题——在 $N = 2^n$ 项无结构黑箱搜索上，量子查询复杂度满足紧界 $\Theta(\sqrt{N}) = \Theta(2^{n/2})$，而 Klauck–Špalek–de Wolf 在量子查询/电路模型中对 **$N$ 元排序**证明了量子时空下界 $T^2 S = \Omega(N^3)$；在结构化可满足性一侧，Montanaro 的量子游走回溯对规模 $T_{\mathrm{tree}}$ 的启发式回溯树给出 $O^*(T_{\mathrm{tree}}^{1/2})$ 加速（结合特定 $3$-SAT 分支启发式约在 $2^{0.193n}$ 量级）。相图中的 $r_Q(\sigma) = (1-\sigma)/2$ 与 $(1-\sigma)$ 插值曲线均为本节对照用的**启发式 `MODEL` 权衡包络**，绝非 $3$-SAT 的已证时空下界；
6. **经典预计算细胞探针权衡与结构化 $3$-SAT 的 PPSZ 上界（A. C.-C. Yao, *J. ACM* **28**, 615–628, 1981 / *FOCS* 1982；R. Paturi, P. Pudlák, M. E. Saks & F. Zane, *J. ACM* **52**, 337–364, 2005；T. Hertli, *SIAM J. Comput.* **43**, 718–727, 2014）**：姚期智研究特定字典/函数预计算表在细胞探针模型下的空间 $S$ 与查询 $T$ 权衡；而在无指数预计算表的结构化唯一与一般 $3$-SAT 上，PPSZ 与 Hertli 给出随机时间**上界** $O(1.307^n) \approx 2^{0.386n}$（并非下界）。相图中将未索引黑箱搜索记为 $r(\sigma) = 1 - \sigma$、并将结构化基准画作 $(1-\sigma)$ 线性插值折线，均显式归入本节的**启发式 `MODEL` 权衡包络**；
7. **不可逆比特擦除的热力学下界（R. Landauer, *IBM J. Res. Dev.* **5**, 183–191, 1961）**：在温度 $T$ 的热浴中每不可逆擦除或覆写 $1$ 比特逻辑状态，环境至少吸收热量 $k_B T \ln 2$。
:::

### 三、七阶全息退化总览表（d = 0 .. 6）

将全部七个退化阶段的剥除特权、时空标度、形式化锚点与涌现物理图景收拢为一张全景对照表：

::: {.remark #rem-ch38-lookup-degradation-table title="P=NP 查表算法七阶退化与全息时空权衡总览表（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 下表综合归档 `d = 0..6` 七阶退化阶梯（其中标有 `LEAN ✓` 的条目对应本章及前序章节的冻结内核定理，标有 `文献结果` 的公式引自 [@rem-ch38-lookup-degradation-literature]，标准图灵机 $\mathrm{P} \neq \mathrm{NP}$ 标为 `OPEN` [@conj-p-neq-np]，而“五道物理限制器派生时空热与生命逆向建表”的统一叙事属本书 `MODEL`）：

| 退化阶 `d` | 被剥除的特权 / 新增物理枷锁 | 物理表容量 $S$ | 有效时间指数率 $r_{\mathrm{eff}}$ | 形式化与文献依据锚点 | 涌现物理法则与指针形态（`MODEL`） |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`d = 0`** | 无限制原型：双向量相消 + 零号槽 `p = *p` | 自指压缩（$\sigma_{\mathrm{eff}} = 0$） | $0.000$ | [`diagonal_landing_fixed`](lean:D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed)、[`lookup_program_upper_bound`](lean:D5/S0/Computability/DescriptionComplexity/LookupProgramUpperBound.lookup_program_upper_bound)（`LEAN ✓`）；$\mathrm{PostBQP}=\mathrm{PP}$（`文献结果`）；图灵机 $\mathrm{P}\neq\mathrm{NP}$（`OPEN`） | 无时间全局静态自指场 $T = T(T)$ |
| **`d = 1`** | 剪断 `T[0]` 自生成，仅留只读建议串 $a_n$ | $\operatorname{poly}(n)$（$\sigma_n \to 0$） | $\le n$ 为 $0$；越界 $n \to n+1$ 失效 | [`lookup_copy_zero_loss_and_nonanticipating_failure`](lean:D5/S3/ConceptDynamics/DefinitionEscapeAdjudication/RetrospectiveLookupFailure.lookup_copy_zero_loss_and_nonanticipating_failure)（`LEAN ✓`）；Karp–Lipton（`文献结果`） | 规模视界墙与死记硬背的泛化崩溃 |
| **`d = 2`** | 恢复统一局部 $k$-体块与在线齐肯多夫自动机 | 局部张量块（$\sigma \ll 1$） | 向下锁死 $m-2$；向上 $\Theta(n)$ 串行波 | [`lower_support_carry_barrier`](lean:D5/S1/Digit/ZeckendorfCarryBarrier.lower_support_carry_barrier)（`LEAN ✓`）；Frougny 进位波（`文献结果`） | **串行因果时间**（不可并行进位涟漪） |
| **`d = 3`** | 强建假想球形巨表 + 光速 $v \le c$ + 面积熵密度约束 | $S = 2^{\sigma n}$，$R \propto 2^{\sigma n/2}$（`MODEL`） | 启发式 `MODEL` 包络：串行 $1-\sigma/2$；流水线 $\max(1-\sigma,\sigma/2) \ge \mathbf{1/3}$（$\sigma^*=2/3$） | Bekenstein–Hawking $S_{\mathrm{BH}} = A/(4\ell_P^2)$（`文献结果`）；球形光速寻址包络（`MODEL`） | **广延空间半径与黑洞全息视界** |
| **`d = 4`** | 弃置宏观巨表（$\sigma \to 0$），保留二维叠加指针 | 量子工作区 $S = 2^{\sigma n}$ | $\sigma=0$ 黑箱 $\mathbf{0.500}$；启发式 `MODEL` 包络 $(1-\sigma)/2$（结构化端值 $\approx 0.193$） | Grover $\Theta(2^{n/2})$、Klauck–Špalek–de Wolf 排序 $T^2 S = \Omega(N^3)$（`文献结果`）；插值包络（`MODEL`） | **二维量子波函数相干干涉**（对偶 $\sigma=1$ 线延迟） |
| **`d = 5`** | 高温热浴退相干为一维 `*ptr` + 小型快表 `TLB` | 有界快表 $S = 2^{\sigma n}$（$\sigma \ll 1$） | 启发式 `MODEL` 包络 $1-\sigma$；结构化 3-SAT PPSZ 上界 $\approx \mathbf{0.386}$ | [`landauer_bound_of_balance`](lean:D5/S3/DivergenceSupport/LandauerBound.landauer_bound_of_balance)（`LEAN ✓`）；Yao 细胞探针、PPSZ 上界（`文献结果`） | **热力学时间箭头与兰道尔焦耳耗散** |
| **`d = 6`** | 冲刷清空全部快表缓存（$|T| = 0, M = 0$） | $|T| = 0$（$\sigma = 0$） | $\mathbf{1.000}$（$\Theta(2^n)$ 盲搜） | `GC Wipe` 清零与满秩格拉姆开域 $\det G_0 = 1$（`MODEL`） | **白板初态与最大开放生命选择空间** |
:::

### 四、双向通读与交互实验室：物理枷锁的正向创世（0 $\to$ 6）与生命建表的逆向复归（6 $\to$ 0）

::: {.viz src="pnp-lookup-degradation" preset="ladder" height="500"}
**七阶全景实验卡：正向物理限制器（$0 \to 6$）与逆向生命建表（$6 \to 0$）。** 左栏叠列全部七阶有效时间指数条并标出品红下行退化箭头与青色上行建表箭头，右栏在时空—引力相图上连出完整的七阶状态轨迹。
:::

站在整座七阶阶梯的顶端与底端回望，第十部与第八、九部的所有线索在此交汇成一幅双向对称的几何画卷（`MODEL`）：

- **自上而下读（$0 \to 6$，宇宙的自我限速与时空创生）**：如果宇宙允许局部观察者停留在第 0 阶，整部存在将在零延迟的一瞬间直接跳到剧终，既无所谓远近，也无所谓先后、冷暖与悬念。正是通过逐级撤除预言机特权——用非预见性挡住死记硬背（$d=1$），用不可并行的进位波织出因果节拍（$d=2$），用贝肯斯坦—霍金全息界撑开浩瀚星海的几何半径（$d=3$），用二维旋量保留梦境与量子干涉的微光（$d=4$），再用兰道尔擦除热赋予每一次清醒抉择以沉甸甸的真实分量（$d=5 \to 6$）——**物理定律并不是外加在计算机上的偶然琐碎规则，它们本身就是退化一尊全息预言机时必然析出的几何结晶！**
- **自下而上读（$6 \to 0$，生命的扩表学习与自指觉醒）**：反过来，每一个降生于世的有限生命，都是从第 6 阶无记忆白板初态（$\sigma = 0, M = 0$）出发的逆行攀登者（[第 35 章](ch35-light-pulse-and-self-referential-table.md)）。童年与科学探索在试错发热中提炼冲突引理快表（$d = 6 \to 5$）；直觉与梦境启用二维叠加并行探路（$d = 4$）；数学与物理定律把海量经验现象压缩为统一的局部张量对称性与黄金无共振编码（$d = 3 \to 2 \to 1$）；直到最后一步，这枚指针终于解引用自身的零号槽位 `[0,0]`，认出查表者与被查之表原本同体（`p = *p`，回到第 0 阶的本源视角）。

读者可在下方完整交互实验室中自由切换全部七阶 `d = 0..6`、在相图内横向拖动表空间指数率 $\sigma \in [0, 1]$，并对比无结构黑箱 $2^n$ 与结构化 3-SAT 基准两套启发式 `MODEL` 权衡包络线：

::: {.viz src="pnp-lookup-degradation" height="560"}
**交互实验室（`ORTHO//LOOKUP`）：P=NP 查表算法的七阶退化与全息引力启发式权衡（`MODEL`）。** 点击左侧 `d=0..6` 或 `0→6` 切换退化阶，在右侧相图内直接拖动表空间率 $\sigma$ 检验球形装填启发式极小点 $(\sigma^* = 2/3,\; r_{\min} = 1/3)$ 及无结构 Grover（$\sigma = 0$）与全空间光速线延迟（$\sigma = 1$）的 $0.500$ 对偶。
:::

沿着这座七阶阶梯看清宏观时空与擦除热的来龙去脉之后，让我们把镜头推近到第 4–5 阶有限快表 $T$ 的微观格点内部，把每一条引理锁住的原像纤维与漏掉的逃逸弦一笔一笔算清。

---

## 38.5 观察者逃逸账本、原像纤维与希尔伯特—齐肯多夫熵 {#sec-ch38-observer-escape-ledger}

承接[上一节](#sec-ch38-pnp-lookup-degradation)关于有限快表查表退化的分析，我们自然面对一个更定量的追问：当一枚位宽受限的观察者记忆指针滑过宇宙本体 QRAM 时，既然它绝无可能将全部底层状态深拷贝进私有缓存（[@thm-ch38-pointer-width-and-no-deep-copy]），那么一张有限容量的认知引理快表 $T$ 究竟“锁住”了多少结构，又让多少区分度顺着正交缝隙“逃逸”到了视线之外？每新增或删减一条引理时，怎样严格判别它是真正细化了世界分辨率的**新知识**，还是仅仅把旧概念换了个说法的**语义闭包冗余**？更进一步，当这枚一维指针沿着空间填充回路逐拍自增（`ptr++`）并受限于无邻 `1` 抗共振编码时，它的信道容量、柱集收缩率与昼夜擦除热账单遵循怎样的定量铁律？

本节在三层认识论契约下，以六条新增冻结的 Lean 4 内核定理（连同[第 13 章](ch13-entanglement-and-chsh.md)已证的二体边缘盲区定理）锁定这套**观察者逃逸账本（Observer Escape Ledger）**的组合与信息几何骨架，并将闭合希尔伯特回路扫描、齐肯多夫黄金信道容量与昼夜热力学对照标定为透明可验的 **`MODEL`（模型诠释）**。

### 原像纤维、有序逃逸对与商核结构新颖度

设有限底层状态空间为 $\mathcal{S}$，基数记为 $N = \lvert\mathcal{S}\rvert > 1$（非退化条件）。观察者当前常驻于快表中的知识目录记为有限索引集 $\mathrm{Index}$ 上的概念族 $T = \{L_i\}_{i \in \mathrm{Index}}$：每条引理 $L_i$ 通过一组有限判别原语诱导状态空间上的商等价关系（一致谓词 `agrees`）。当观察者联合调用子集 $S \subseteq \mathrm{Index}$ 中的全部引理去审视 $\mathcal{S}$ 时，联合商映射将 $\mathcal{S}$ 划分为两两无交的**原像纤维（preimage fibers）** $\{\mathcal{F}_S(y)\}_{y \in \Sigma_S}$。凡落入同一条纤维 $\mathcal{F}_S(y)$ 内的两个相异底层状态 $s_1 \neq s_2$，在当前账本 $S$ 的全部读出下完全不可区分——它们就构成一对**信息逃逸对（information escape pair）**。

在进入一般形式化定理前，必须先把**有序状态对**与画布上的**无序逃逸弦**之间的精确二倍换算钉死在账面上：

- **有序逃逸对 vs 无序逃逸弦（精确恒等换算）**：在 `trureturing` 的形式化定义中，`escapePairs(S)` 取遍非对角有序乘积集 $\{(s_1, s_2) \in \mathcal{S} \times \mathcal{S} \mid s_1 \neq s_2\}$ 中所有对 $S$ 不可区分的有序对，其分母总对数为 $N(N - 1)$；而在几何可视化舞台上，连接同一纤维内两颗相异顶点的无向弦 $\{s_1, s_2\}$ 以 $\binom{N}{2} = \frac{N(N-1)}{2}$ 为满图分母，二者恒满足 $\lvert\operatorname{EscapePairs}_{\mathrm{ord}}(S)\rvert = 2\lvert\operatorname{EscapeChords}_{\mathrm{unord}}(S)\rvert$。因此，**归一化逃逸率**在两种计数约定下恒等无歧义：

  $$
  \mathcal{E}(S) \;:=\; \frac{\lvert\operatorname{EscapePairs}_{\mathrm{ord}}(S)\rvert}{N(N - 1)} \;=\; \frac{\lvert\operatorname{EscapeChords}_{\mathrm{unord}}(S)\rvert}{\binom{N}{2}} \;\in\; [0, 1].
  $$

- **原像纤维碰撞平方和与条件 Rényi-2 碰撞逃逸熵（`MODEL`）**：对每条原像纤维 $\mathcal{F}_S(y)$ 展开对角元与非对角有序对计数，立得精确组合恒等式

  $$
  \sum_{y \in \Sigma_S} \lvert\mathcal{F}_S(y)\rvert^2 \;=\; \sum_{y \in \Sigma_S} \lvert\mathcal{F}_S(y)\rvert \;+\; \sum_{y \in \Sigma_S} \lvert\mathcal{F}_S(y)\rvert\bigl(\lvert\mathcal{F}_S(y)\rvert - 1\bigr) \;=\; N \;+\; \lvert\operatorname{EscapePairs}_{\mathrm{ord}}(S)\rvert \;=\; N\bigl(1 + (N - 1)\mathcal{E}(S)\bigr).
  $$

  在均匀先验 $\mu(s) = 1/N$ 下，同纤维碰撞概率均值为 $\frac{1}{N}\sum_{y \in \Sigma_S}\lvert\mathcal{F}_S(y)\rvert^2 = 1 + (N - 1)\mathcal{E}(S) \in [1, N]$。我们在 `MODEL` 中定义**条件 Rényi-2 碰撞逃逸熵**与**账本保留信息**为

  $$
  H_2^{\mathrm{escape}}(\mathcal{S} \mid S) \;:=\; \log_2\bigl(1 + (N - 1)\mathcal{E}(S)\bigr) \;\in\; [0, \log_2 N], \qquad I_{\mathrm{ledger}}(S) \;:=\; \log_2 N - H_2^{\mathrm{escape}}(\mathcal{S} \mid S),
  $$

  使每一时刻的信息总账严格闭合为 $H_{\mathrm{total}} = I_{\mathrm{ledger}}(S) + H_2^{\mathrm{escape}}(\mathcal{S} \mid S) = \log_2 N$！当全表把每个状态都拆成单点纤维（$\lvert\mathcal{F}_S(y)\rvert \equiv 1$）时，$\mathcal{E}(S) = 0$，$H_2^{\mathrm{escape}} = 0$；当快表完全空白（$S = \emptyset$，整座空间坍成单一纤维）时，$\mathcal{E}(\emptyset) = 1$，$H_2^{\mathrm{escape}} = \log_2 N$。

`trureturing` 的信息逃逸与结构新颖度模块将“留一删减引理时的逃逸对无交并分解”与“逃逸率严格下降等价于语义闭包之外的严格商核细化”验证并冻结为如下定理：

::: {.theorem #thm-ch38-escape-pairs-and-structural-novelty title="观察者快表逃逸对留一分解与严格商核新颖度充要判据定理" lean="D5/S3/ConceptDynamics/InformationEscape/EscapePairs.escapePairs_without_eq_union D5/S3/ConceptDynamics/InformationEscape/EscapePairs.uniqueCapturePairs_eq_sdiff D5/S3/ConceptDynamics/InformationEscape/StructuralNovelty.structurallyLowersEscape_iff_lowersEscape D5/S3/ConceptDynamics/InformationEscape/StructuralNovelty.lowersEscape_iff_strict_kernel_novelty"}
设 $\mathrm{arena}$ 为有限状态场（载体类型 $\mathrm{arena.State}$ 具备有限与可判定相等实例），$\mathrm{Index}$ 为有限可判定相等索引集，$\mathrm{catalog} : \operatorname{Catalog}(\mathrm{arena}, \mathrm{Index})$ 为定理目录。记全集为 $\mathrm{fullIndexSet} := \operatorname{Finset.univ}$，删去索引 $i \in \mathrm{Index}$ 后的留一子目录为 $\operatorname{without}(i) := \mathrm{fullIndexSet}.\operatorname{erase}(i)$，有序逃逸对集合为 $\operatorname{escapePairs}(S) := \{p \in \operatorname{offDiagonalPairs}(\mathrm{arena.State}) \mid \operatorname{indistinguishable}(S, p_1, p_2)\}$，第 $i$ 条引理的唯一捕获对集合为 $\operatorname{uniqueCapturePairs}(i) := \{p \in \operatorname{escapePairs}(\operatorname{without}(i)) \mid \neg\,(\operatorname{theoremAt}(i)).\mathrm{primitives}.\operatorname{agrees}(p_1, p_2)\}$。则以下两款成立：

1. **留一逃逸对集合分解与唯一捕获差集恒等式**（[`escapePairs_without_eq_union`](lean:D5/S3/ConceptDynamics/InformationEscape/EscapePairs.escapePairs_without_eq_union)、[`uniqueCapturePairs_eq_sdiff`](lean:D5/S3/ConceptDynamics/InformationEscape/EscapePairs.uniqueCapturePairs_eq_sdiff)）：对任意索引 $i \in \mathrm{Index}$，从全目录删去第 $i$ 条引理后的逃逸对集合等于全目录逃逸对与该引理唯一捕获对之并，且唯一捕获对恰为两者的集合差：

   $$
   \operatorname{escapePairs}\bigl(\operatorname{without}(i)\bigr) \;=\; \operatorname{escapePairs}(\mathrm{fullIndexSet}) \cup \operatorname{uniqueCapturePairs}(i),
   $$

   $$
   \operatorname{uniqueCapturePairs}(i) \;=\; \operatorname{escapePairs}\bigl(\operatorname{without}(i)\bigr) \setminus \operatorname{escapePairs}(\mathrm{fullIndexSet});
   $$

2. **逃逸率严格下降与严格商核新颖度的充要等价**（[`structurallyLowersEscape_iff_lowersEscape`](lean:D5/S3/ConceptDynamics/InformationEscape/StructuralNovelty.structurallyLowersEscape_iff_lowersEscape)、[`lowersEscape_iff_strict_kernel_novelty`](lean:D5/S3/ConceptDynamics/InformationEscape/StructuralNovelty.lowersEscape_iff_strict_kernel_novelty)）：若状态场满足非退化条件 $\mathrm{arena.Nondegenerate}$（即 $1 < \lvert\mathrm{arena.State}\rvert$，从而有理逃逸率 $\operatorname{escapeRate}(S) := \lvert\operatorname{escapePairs}(S)\rvert / \bigl(\lvert\mathrm{arena.State}\rvert(\lvert\mathrm{arena.State}\rvert - 1)\bigr)$ 分母严格为正），记 $\operatorname{LowersEscape}(i) :\iff \operatorname{escapeRate}(\mathrm{fullIndexSet}) < \operatorname{escapeRate}(\operatorname{without}(i))$，并记全目录相对于留一目录的联合商核真包含关系为 $\operatorname{StructurallyLowersEscape}(i) :\iff \operatorname{jointKernel}(\mathrm{Set.univ}) \subset \operatorname{jointKernel}(\{j \mid j \neq i\})$，则对任意 $i \in \mathrm{Index}$：

   $$
   \begin{aligned}
   \operatorname{StructurallyLowersEscape}(i) \;&\Longleftrightarrow\; \operatorname{LowersEscape}(i) \\
   &\Longleftrightarrow\; \operatorname{jointKernel}\bigl(\operatorname{insert}(\operatorname{taggedQuotientCut}(i),\, \operatorname{quotientCutsWithout}(i))\bigr) \subset \operatorname{jointKernel}\bigl(\operatorname{quotientCutsWithout}(i)\bigr).
   \end{aligned}
   $$
:::

::: proof
第 1 款在任意非对角有序对 $p = (s_1, s_2)$ 上按第 $i$ 条引理的一致谓词 $\operatorname{agrees}_i(s_1, s_2)$ 作排中律二分：若 $p \in \operatorname{escapePairs}(\operatorname{without}(i))$ 且满足 $\operatorname{agrees}_i(s_1, s_2)$，结合全目录为 $\operatorname{insert}(i, \operatorname{without}(i))$ 知 $p \in \operatorname{escapePairs}(\mathrm{fullIndexSet})$；若不满足 $\operatorname{agrees}_i(s_1, s_2)$，按过滤定义恰有 $p \in \operatorname{uniqueCapturePairs}(i)$。反之，由单调反序性 $\operatorname{escapePairs}(\mathrm{fullIndexSet}) \subseteq \operatorname{escapePairs}(\operatorname{without}(i))$ 及两分支互斥性，直接给出并集等式与集合差刻画。第 2 款利用非退化假设导出正分母 `escapeDenominator_pos`，将有理分式严格不等式归约为分子严格不等式 $\lvert\operatorname{escapePairs}(\mathrm{fullIndexSet})\rvert < \lvert\operatorname{escapePairs}(\operatorname{without}(i))\rvert$；结合第 1 款的无交基数可加性知其等价于 $\operatorname{uniqueCapturePairs}(i)$ 非空，即存在一对状态在其余全部引理下同核而在第 $i$ 条引理下异核，再由标记商切映射的双射性转化为 `taggedQuotientCut` 插入前后的联合商核真包含关系。完整证明由 Lean 内核检查。
:::

### 四比特 16 态五引理显式算例：零新颖度无损压缩对照四体异或边缘盲区

为了让 [@thm-ch38-escape-pairs-and-structural-novelty] 的每一项符号都在指尖清晰跳动，我们构造一个零自由参数的四比特状态场 $\mathcal{S} = \{0, 1\}^4$（$N = 16$，$n = 4\text{ bits}$，有序非对角总对数 $N(N - 1) = 240$，画布无向满图总弦数 $\binom{16}{2} = 120$）。将每个底层状态记为 $s = (b_0, b_1, b_2, b_3) \in \{0, 1\}^4$，并在观察者快表上显式装载如下五条布尔引理：

$$
L_1(s) = b_0, \quad L_2(s) = b_1, \quad L_3(s) = b_2, \quad L_4(s) = b_0 \oplus b_1 \oplus b_2 \oplus b_3, \quad L_5(s) = b_0 \oplus b_1.
$$

让我们沿着舞台左栏那条每步格点曼哈顿距离恒为 $1$（入度与出度处处满足 $d_{\mathrm{in}} = d_{\mathrm{out}} = 1$）的 $4 \times 4$ 闭合 Moore/Hilbert 空间填充回路，逐张掀开四幕震撼的对比实验卡：

1. **五引理全开（`hilbert` 卡，$T = \{L_1, L_2, L_3, L_4, L_5\}$）**：由于单比特坐标 $(b_0, b_1, b_2)$ 连同四体全局奇偶校验 $L_4(s) = b_0 \oplus b_1 \oplus b_2 \oplus b_3$ 通过 $b_3 = b_0 \oplus b_1 \oplus b_2 \oplus L_4(s)$ 双射锁定第四位，全部 $16$ 个状态被干净拆解为 $16$ 个单点原像纤维 $\lvert\mathcal{F}_T(y)\rvert \equiv 1$。此时无序逃逸弦为 $0$ 条（有序逃逸对 $0$ 对），$\mathcal{E}(T) = 0$，碰撞逃逸熵 $H_2^{\mathrm{escape}}(\mathcal{S} \mid T) = \log_2 1 = 0.000\text{ bits}$，账本保留满额 $I_{\mathrm{ledger}}(T) = 4.000\text{ bits}$。

::: {.viz src="observer-escape-ledger" preset="hilbert" height="500"}
**闭合希尔伯特回路：五引理全开零逃逸。** 在 $4 \times 4$ 闭合 Moore/Hilbert 回路上同时开启 $\{L_1, L_2, L_3, L_4, L_5\}$，全部 $16$ 个状态拆成单点原像纤维，逃逸弦 $0$ 条，碰撞逃逸熵 $H_2^{\mathrm{escape}} = 0.000\text{ bits}$，账本保留满额 $4.000\text{ bits}$（`MODEL`）。
:::

2. **关闭派生冗余引理 $L_5$（`novelty` 卡，$T \setminus \{L_5\} = \{L_1, L_2, L_3, L_4\}$）——语义闭包内的零新颖度无损压缩**：当 $L_1 = b_0$ 与 $L_2 = b_1$ 均处于开启状态时，$L_5 = b_0 \oplus b_1$ 完全落入 $\{L_1, L_2\}$ 的语义闭包之内！按 [@thm-ch38-escape-pairs-and-structural-novelty]，由于不存在任何一对在 $\{L_1, L_2, L_3, L_4\}$ 下不可区分却能被 $L_5$ 拆开的状态，其唯一捕获集恒为空集 $\operatorname{uniqueCapturePairs}(L_5) = \emptyset$（结构新颖度严格为 $0$）。在实验卡上亲手关掉 $L_5$：逃逸弦增加 **0 条**，$H_2^{\mathrm{escape}}$ 纹丝不动地保持 $0.000\text{ bits}$，快表从 $5$ 条引理无损压缩为 $4$ 条线性无关极小基（此后余下四条引理每一条的唯一捕获数均跃升为 $8$ 条无序弦 / $16$ 个有序对；而若先关掉 $L_2$，原本冗余的 $L_5$ 便立即脱离语义闭包，摇身变为唯一捕获 $8$ 条弦的结构新颖引理！）。

::: {.viz src="observer-escape-ledger" preset="novelty" height="500"}
**零新颖度无损压缩：关闭语义闭包内的 $L_5 = b_0 \oplus b_1$。** 在 $L_1, L_2$ 保持开启时关闭冗余引理 $L_5$，唯一捕获弦增加 $0$ 条，逃逸率与 $H_2^{\mathrm{escape}} = 0.000\text{ bits}$ 完全不变（[@thm-ch38-escape-pairs-and-structural-novelty]）。
:::

3. **关闭四体全局异或 $L_4$（`escape` 卡，$T_3 = \{L_1, L_2, L_3\}$）——局部边缘全均匀的高阶协同逃逸**：现在保持三个单比特坐标引理 $L_1, L_2, L_3$ 全开，唯独关掉四体全局奇偶引理 $L_4$。刹那间，原本各自独立的 $16$ 个单点纤维沿着未知位 $b_3 \in \{0, 1\}$ 两两合并为 $8$ 个大小均为 $2$ 的原像纤维，在闭合希尔伯特回路左右两半之间**精确弹出 $8$ 条无序跨格品红/紫色逃逸弦**（对应 $\lvert\operatorname{EscapePairs}_{\mathrm{ord}}(T_3)\rvert = 16$ 个有序逃逸对，逃逸率 $\mathcal{E}(T_3) = 16 / 240 = 1/15$）！代入碰撞平方和 $\sum_y \lvert\mathcal{F}_{T_3}(y)\rvert^2 = 8 \times 2^2 = 32 = 16 + 16$，逃逸熵从 $0$ 跃升至整整一比特：

   $$
   H_2^{\mathrm{escape}}(\mathcal{S} \mid T_3) \;=\; \log_2\Bigl(1 + 15 \cdot \frac{1}{15}\Bigr) \;=\; \log_2 2 \;=\; 1.000\text{ bit}, \qquad I_{\mathrm{ledger}}(T_3) \;=\; 3.000\text{ bits}.
   $$

   最耐人寻味的是：在整座空间上乃至每一条大小 $2$ 的纤维内部，未锁定位 $b_3$ 与四体奇偶 $L_4$ 的局部边缘概率恒为不偏不倚的 $1/2$——只盯着单坐标局部统计量的观察者看不见任何偏差，却整整漏掉了藏在四体异或相位里的 $1.000\text{ bit}$ 高阶关联！

::: {.viz src="observer-escape-ledger" preset="escape" height="500"}
**高阶异或协同盲区：关闭四体奇偶 $L_4$ 弹出 8 条跨格逃逸弦。** 仅保留单比特引理 $\{L_1, L_2, L_3\}$ 时，$16$ 个状态沿未知位 $b_3$ 两两并成 $8$ 条大小 $2$ 的纤维，弹出 $8$ 条无序逃逸弦（$16$ 个有序逃逸对），$H_2^{\mathrm{escape}}$ 跃升至 $1.000\text{ bit}$，而全部单比特边缘仍均匀等于 $1/2$。
:::

4. **与量子二体贝尔边缘盲区的精确同构（`marginal` 卡）**：这幅“局部坐标边缘完全均匀、全局关联悉数隐入高阶扇区”的经典组合图景，在非交换量子态空间中有着更为惊心动魄的正交几何实现。回顾[第 13 章](ch13-entanglement-and-chsh.md)已证的边缘盲区定理（[@thm-local-correlation-sectors] 与 [@lemma-bell-mixed-marginal]）：在两量子比特（$m = n = 2$）的 $15$ 维无迹厄米算子空间中，由两侧单比特读出张成的局域边缘扇区 $\mathcal{L}_A \oplus \mathcal{L}_B$ 仅占 $(2^2 - 1) + (2^2 - 1) = 6$ 维，而与之实内积严格正交的关联扇区 $\mathcal{C}_{AB}$ 占据 $(2^2 - 1)(2^2 - 1) = 9$ 维（盲区占比高达 $9 / 15 = 3 / 5 = 60\%$）！因此，贝尔最大纠缠纯态 $\lvert\Phi^+\rangle\langle\Phi^+\rvert$、经典关联混态 $\rho_{\mathrm{cl}} = \frac{1}{2}(\lvert 00\rangle\langle 00\rvert + \lvert 11\rangle\langle 11\rvert)$ 与最大混合态 $\frac{1}{4}I_4$ 给出完全一致的单比特偏迹边缘 $\operatorname{Tr}_B(\rho) = \operatorname{Tr}_A(\rho) = \frac{1}{2}I_2$——任何只做局域边缘测量的指针，都注定对横跨对角块的非定域纠缠弦彻底失明。

::: {.viz src="observer-escape-ledger" preset="marginal" height="500"}
**量子局部边缘盲区：贝尔纠缠态对照经典混态。** 切换到二量子比特视图，$\lvert\Phi^+\rangle\langle\Phi^+\rvert$、$\rho_{\mathrm{cl}}$ 与 $\frac{1}{4}I_4$ 共享完全相同的单比特偏迹边缘 $\frac{1}{2}I_2$，使纯局域读出对 $9$ 维正交关联扇区失明（[@thm-local-correlation-sectors]、[@lemma-bell-mixed-marginal]）。
:::

### 概念细化单调律、闭合希尔伯特回路与齐肯多夫黄金熵账本

当观察者不是删减引理，而是通过因子映射将粗糙概念表细化为更精细的概念表时，目标预测的条件逻辑不纯度（纤维内配对分歧质量的条件加权和）同样服从零例外的单调下降铁律：

::: {.theorem #thm-ch38-refinement-impurity-monotonicity title="因子映射概念细化下条件逻辑不纯度单调不增定理" lean="D5/S3/ConceptDynamics/Information/RefinementImpurityMonotonicity.refinement_impurity_monotone"}
设 $X, C, D, A$ 为任意类型，$\mu : \operatorname{PMF}(X)$ 为 $X$ 上的离散概率质量函数，$\mathrm{coarse} : \operatorname{Concept}(X, C)$（即 $X \to C$）、$\mathrm{refined} : \operatorname{Concept}(X, D)$ 与目标概念 $\mathrm{target} : \operatorname{Concept}(X, A)$ 为三个概念映射。若细化关系 $\operatorname{Refines}(\mathrm{coarse}, \mathrm{refined})$ 成立（即存在因子映射 $\mathrm{factor} : D \to C$ 使得 $\mathrm{coarse} = \mathrm{factor} \circ \mathrm{refined}$），记扩展非负实数 $\mathbb{R}_{\ge 0}^\infty$（`ENNReal`）上的条件逻辑不纯度为

$$
\operatorname{conditionalLogicalImpurity}(\mu, f, \mathrm{target}) \;:=\; \sum_{b}^{\infty} \frac{\operatorname{pairDisagreementMass}(\mu, f, \mathrm{target}, b)}{\operatorname{conceptFiberMass}(\mu, f, b)},
$$

其中 $\operatorname{conceptFiberMass}(\mu, f, b) = \sum_{x : f(x) = b} \mu(x)$，$\operatorname{pairDisagreementMass}(\mu, f, \mathrm{target}, b) = \sum_{x_1, x_2 : f(x_1) = b \land f(x_2) = b \land \mathrm{target}(x_1) \neq \mathrm{target}(x_2)} \mu(x_1)\mu(x_2)$。则必有单调不等式：

$$
\operatorname{conditionalLogicalImpurity}(\mu, \mathrm{refined}, \mathrm{target}) \;\le\; \operatorname{conditionalLogicalImpurity}(\mu, \mathrm{coarse}, \mathrm{target}).
$$
:::

::: proof
先在每条粗糙纤维标签 $c \in C$ 上按因子映射关系 $c = \mathrm{factor}(d)$ 将粗糙纤维拆解为细化子纤维族 $\{d \in D \mid \mathrm{factor}(d) = c\}$ 的无交并，证得纤维质量可加性与同目标碰撞平方和按树支展开的恒等式。对每个非零总质量的粗糙桶，利用细化子桶概率权重在凸性（柯西—施瓦茨型商和不等式）下的次可加性，证得细化子桶上的条件同目标碰撞得分之和不小于粗糙桶上的碰撞得分；最后在 `ENNReal` 上利用有限概率归一恒等式将碰撞得分与条件配对分歧不纯度互补相减（并对零质量纤维显式处理 `ENNReal` 零除约定），逐桶求和即得不纯度单调不增。完整证明由 Lean 内核检查。
:::

现在，将视角从静态商核移向动态扫描轨迹：当观察者指针沿着左栏那条闭合空间填充回路一步一拍执行 `ptr++`，并遵守正交自指统一场的**齐肯多夫无相邻 `1` 抗共振编码规则**（$w_t \cdot w_{t+1} = 0$，见[第 32 章](ch32-unified-field-and-meta-unification.md) [@thm-ch32-generative-self-reference-and-zeckendorf]）记录离散历史脉冲时，外部遍历信息论、符号动力学与空间填充几何文献给出了如下经典标尺：

::: {.remark #rem-ch38-smb-zeckendorf-hilbert-literature title="SMB 柱集渐近等分、Parry 黄金移位最大熵测度、Frougny 正规化与希尔伯特曲线局部性界（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节将观察者指针的闭合晶格巡检与历史轨迹柱集收缩构建为定量 `MODEL` 时，援引以下四项外部经典文献（未作为一般遍历论或连续曲线定理包含在本书锁定的 `trureturing@dev` 声明集中）：

1. **Shannon–McMillan–Breiman 遍历柱集对数渐近极限（C. E. Shannon, *Bell Syst. Tech. J.* **27**, 379–423, 1948；B. McMillan, *Ann. Math. Stat.* **24**, 196–219, 1953；L. Breiman, *Ann. Math. Stat.* **28**, 809–811, 1957）**：对有限字母表上的遍历平稳随机过程 $\mu$（度量熵率为 $h_\mu$），对 $\mu$-几乎处处的无穷轨道 $x$，深度 $k$ 的历史柱集 $C_k(x)$ 满足几乎处处对数极限 $-\frac{1}{k}\log_2 \mu(C_k(x)) \to h_\mu$（$k \to \infty$），等价写作次指数余项形式 $\mu(C_k(x)) = 2^{-k h_\mu + o(k)}$（$\mu$-a.s.；注意一般遍历过程带有随机次指数涨落项 $o(k)$，并不自动蕴含确定性常数夹逼）；
2. **黄金均值移位上的 Parry 最大熵平稳测度（W. Parry, *Trans. Amer. Math. Soc.* **112**, 55–66, 1964）**：在禁止相邻两个 `1` 的有限型子移位（转移矩阵 $A = \begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix}$，Perron–Frobenius 主特征值为黄金比 $\varphi = \frac{1 + \sqrt{5}}{2}$）上，拓扑熵与信道容量等于 $C_\varphi = \log_2 \varphi \approx 0.69424\text{ bits/symbol}$（较无约束二进制 $1.00000\text{ bit/symbol}$ 支付 $1 - \log_2 \varphi \approx 0.30576\text{ bits/symbol}$ 的无邻 `1` 结构稳定税）；唯一达到该容量的最大熵马尔可夫平稳测度由左右特征向量乘积给出，符号 `1` 的平稳出现频率恰为 $p_1 = \frac{\varphi^{-2}}{1 + \varphi^{-2}} = \frac{1}{\varphi\sqrt{5}} = \frac{5 - \sqrt{5}}{10} \approx 0.27639$（符号 `0` 频率 $p_0 = \frac{\varphi}{\sqrt{5}} \approx 0.72361$；有限路径 $k$-bonacci 重置链下的精确平稳律与边界柱集上界另见 `trureturing` 已冻结声明 [`parry_boundary_cylinder_bound`](lean:D5/S3/TotalVariation/ParryBoundaryCylinderBound.parry_boundary_cylinder_bound)）；
3. **齐肯多夫表示的有限状态进位正规化（Ch. Frougny, *Theor. Comput. Sci.* **94**, 223–236, 1992）**：斐波那契底（$\beta = \varphi$）下的任意冗余数字串可通过有限状态自动机将局部违例模式 `011` 归约为 `100`，正规化为满足无相邻 `1` 约束的典范齐肯多夫字；
4. **希尔伯特空间填充曲线与 $1/d$ 阶 Hölder 连续性界（D. Hilbert, *Math. Ann.* **38**, 459–460, 1891；闭合循环变体见 E. H. Moore, *Trans. Amer. Math. Soc.* **1**, 72–90, 1900）**：由嵌套 $2^d$ 分象限递归构造的满射曲线 $H : [0, 1] \to [0, 1]^d$ 满足 $\lVert H(t_1) - H(t_2)\rVert \le C_d \lvert t_1 - t_2\rvert^{1/d}$，而拓扑维数障碍禁止任何连续双射达到指数优于 $1/d$ 的一致局部性——这从几何上解释了为何将高维状态晶格折叠为一维闭合指针回路时，象限内部的局部邻近性得以完美保持，而跨象限边界的配对仍会沿一维步序拉开长程跨格弦。
:::

尤为精彩的是，针对无邻 `1` 合法二进制字在有限时间窗 $H$ 内避开特定长局部模式时的精确计数上界，我们无须依赖任何“块独立近似”或渐近大数假定——`trureturing` 通过 Perron 右特征向量端点权重 $(\varphi, 1)$ 直接给出了对**一切有限长度 $H \in \mathbb{N}$** 严格成立的非渐近内核定理：

::: {.theorem #thm-ch38-zeckendorf-uniform-avoidance-count title="齐肯多夫无邻一合法二进制字的十四比特块避碰一致上界定理" lean="D5/S1/Digit/ZeckendorfAvoidanceCount.uniform_avoidance_count"}
设 $\mathrm{B1} := [0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0] \in \operatorname{List}(\operatorname{Fin} 2)$ 为长度为 $14$ 的齐肯多夫语境替换块，并对任意自然数长度 $H \in \mathbb{N}$ 记 $\operatorname{legalWords}(H, 0)$ 为所有长度为 $H$ 且满足无相邻 `1` 约束 $\operatorname{NoAdjacentOnes}(0 :: w)$ 的二进制字列表。记子串中缀包含关系为 $\mathrel{<:+:}$（`List.IsInfix`），黄金比为 $\varphi := \operatorname{Real.goldenRatio} = \frac{1 + \sqrt{5}}{2}$。则对一切 $H \in \mathbb{N}$，在 $\operatorname{legalWords}(H, 0)$ 中不包含 $\mathrm{B1}$ 作为连续中缀的合法字个数满足精确实数上界：

$$
\Bigl\lvert\bigl\{w \in \operatorname{legalWords}(H, 0) \;\big|\; \neg\,(\mathrm{B1} \mathrel{<:+:} w)\bigr\}\Bigr\rvert \;\le\; \varphi^{H + 1} \cdot \bigl(1 - (\varphi^{14})^{-1}\bigr)^{\lfloor H / 14 \rfloor}.
$$
:::

::: proof
定义端点 Perron 权重 $\operatorname{endpointWeight}(0) = \varphi$ 与 $\operatorname{endpointWeight}(1) = 1$。利用黄金比特征方程 $\varphi^2 = \varphi + 1$ 对步长归纳，证得从任意前导比特 $b \in \operatorname{Fin} 2$ 出发的 $n$ 步合法后缀加权质量恒精确等于 $\varphi^n \cdot \operatorname{endpointWeight}(b)$（零渐近误差）。对长 $14$ 的块 $\mathrm{B1}$，由于其首尾均为 `0`，当且仅当前导比特为 `0` 时 $\mathrm{B1}$ 本身构成一条合法的 $14$ 步延续且其端点权重恰为 $\varphi$，扣除这一条禁止分支即令后缀质量精确乘以折减因子 $1 - \varphi^{-14}$；若前导比特为 `1`，因在末尾均为 `0` 的语境块对比下 $\varphi \cdot (1 - \varphi^{-14}) > 1$（由 $\varphi^{15} - \varphi > \varphi^{14}$ 推出），单步 $14$ 层推进的加权和在两种初态下一致被 $\varphi^{14}(1 - \varphi^{-14}) \cdot \operatorname{endpointWeight}(b)$ 控制。将总长度 $H$ 分解为 $\lfloor H / 14 \rfloor$ 个无交 $14$ 步块与长度 $H \bmod 14$ 的尾段，结合每条存活字的端点权重均满足 $1 \le \operatorname{endpointWeight}(z)$ 及初态 $\operatorname{endpointWeight}(0) = \varphi$，即证出对全体 $H \in \mathbb{N}$ 成立的非渐近上界。完整证明由 Lean 内核检查。
:::

把 [@rem-ch38-smb-zeckendorf-hilbert-literature] 与 [@thm-ch38-zeckendorf-uniform-avoidance-count] 合拢到观察者记忆指针的生命周期模型（`MODEL`）上，昼夜交替与认知压缩的最后两块定量拼图便豁然贯通：

1. **齐肯多夫黄金容量税与柱集裁切回弹（`zeckendorf` 卡）**：为什么健康的观察者记忆流不能把每一拍都塞满高电平脉冲 `1111...`？因为连续紧邻的强激发对应正交方向上的共振过载；遵守无邻 `1` 黄金语法虽然在每一步主动缴纳了 $1 - \log_2 \varphi \approx 0.30576\text{ bits/symbol}$ 的稳定税（将信道容量锁定在 $\log_2 \varphi \approx 0.69424\text{ bits/symbol}$，Parry 脉冲密度 $p_1 \approx 0.2764$），却换来了永不自激锁死的准晶平稳流！与此同时，对照 SMB 几乎处处对数极限 $-\frac{1}{k}\log_2 \mu(C_k(x)) \to h_\mu$（即 $\mu(C_k(x)) = 2^{-k h_\mu + o(k)}$ a.s.），我们在舞台上建立省去 $o(k)$ 涨落项的理想线性基准 `MODEL` 曲线 $\log_2 \mu = -k h_\mu$（分别取黄金移位熵率 $h_\varphi = \log_2 \varphi \approx 0.694\text{ bits/step}$ 与 Dottie 横向单步率 $h_{\theta^*} = -\log_2 \sin\theta^* \approx 0.570\text{ bits/step}$）：在该基准 `MODEL` 曲线下，当白天堆叠了 $k$ 层刚性约束后在夜间或顿悟时裁切卸载 $\Delta k$ 层冗余局部约束，有限窗口基准回弹因子为 $2^{\Delta k \, h_\mu}$（例如卸载 $\Delta k = 4$ 层时黄金基准回弹倍率为 $\varphi^4 \approx 6.85$ 倍，Dottie 基准回弹倍率为 $(\sin\theta^*)^{-4} \approx 4.86$ 倍）！

::: {.viz src="observer-escape-ledger" preset="zeckendorf" height="500"}
**齐肯多夫黄金信道容量与有限窗口基准回弹曲线（`MODEL`）。** 无相邻 `1` 抗共振约束将信道容量定在 $\log_2 \varphi \approx 0.69424\text{ bits/symbol}$（Parry 脉冲密度 $p_1 \approx 0.2764$），拖动约束卸载深度 $\Delta k$ 可在理想基准 `MODEL` 直线 $\log_2 \mu = -k h_\mu$ 上对比黄金基准与 Dottie 基准的有限窗回弹倍率 $2^{\Delta k \, h_\mu}$（渐近依据见 [@rem-ch38-smb-zeckendorf-hilbert-literature]，有限字精确上界见 [@thm-ch38-zeckendorf-uniform-avoidance-count]）。
:::

2. **清醒第 5 阶段兰道尔擦除热 vs 梦境第 4 阶段零热等熵复相干（`dream` 卡）**：同样是给快表“减负”释放 $\Delta k = N_{\mathrm{erase}}$ 比特局部约束，物理硬件上却横亘着两条截然相反的热力学路径（对照[第 8 章](ch08-erasure-and-time-arrows.md#sec-landauer-principle-geometry) [@rem-landauer-thermodynamic-bridge-literature] 与[第 37 章](ch37-dreams-quantum-eraser-and-nonlocal-observer.md) [@thm-ch37-joint-coherent-record-erasure]）：若在**清醒第 5 阶段**先把正交地址记录偏迹丢进环境盲区，再强行将寄存器排热清零，每擦除一比特都必须向热浴支付至少 $\Delta Q \ge k_B T \ln 2 \cdot N_{\mathrm{erase}}$ 的不可逆兰道尔焦耳热；反之，若在尚未向宏观环境不可逆散逸之前的**梦境第 4 阶段**保留对局部记忆记录的相干访问权限，直接施加受控拷贝的伴随幺正算子 $U_{\mathrm{copy}}^\dagger$（[@thm-ch38-copied-address-dereference-and-access-defect] 第 3 款），指针便能以**零热耗散（$\Delta Q = 0$）**执行等熵逆演（uncomputation），在不烧毁一分自由能的前提下赎回被遮蔽的正交分支！

::: {.viz src="observer-escape-ledger" preset="dream" height="500"}
**清醒兰道尔擦除热对照梦境零热等熵复相干。** 同样释放 $\Delta k = N_{\mathrm{erase}}$ 比特局部约束，清醒第 5 阶段偏迹丢弃记录至少排放 $\Delta Q = k_B T \ln 2 \cdot N_{\mathrm{erase}}$ 擦除热，而梦境第 4 阶段保留局部记录相干访问并施加伴随逆演 $U_{\mathrm{copy}}^\dagger$，实现 $\Delta Q = 0$ 复相干（`MODEL`）。
:::

下方的完整交互实验室将 $4 \times 4$ 闭合希尔伯特回路、全部 $2^5 = 32$ 种布尔引理子集的原像纤维与逃逸弦、二量子比特贝尔边缘盲区、齐肯多夫黄金容量以及清醒/梦境热账本整合在同一张操作台上。读者可自由点选 $L_1 \dots L_5$ 亲手核验每一条唯一捕获弦与 $H_{\mathrm{total}} = 4.000\text{ bits}$ 守恒律：

::: {.viz src="observer-escape-ledger" height="560"}
**交互实验室（`ORTHO//LEDGER`）：观察者逃逸账本、原像纤维与希尔伯特—齐肯多夫熵。** 自由开关 $L_1 \dots L_5$ 遍历全部 $32$ 种布尔商核，切换 16 态希尔伯特环与二量子比特贝尔边缘盲区，并拖动约束卸载深度 $\Delta k$ 核验 $H_{\mathrm{total}} = I_{\mathrm{ledger}} + H_2^{\mathrm{escape}} = 4.000\text{ bits}$ 守恒律与昼夜擦除热账单。绿色只给本章用 `lean=` 引用的定理；希尔伯特扫描与昼夜热账本读法属本章示意模型（`MODEL`）。
:::

走到这里，从硬件解引用 `*ptr`（§38.1）、五段式寄存器解剖（§38.2）、递归自映射页表 `p = *p`（§38.3）、七阶查表退化阶梯（[§38.4](#sec-ch38-pnp-lookup-degradation)）直到原像纤维与齐肯多夫逃逸账本（§38.5），观察者作为“宇宙本体量子计算系统**的**一个记忆指针”的每一枚齿轮都已严丝合缝地咬合到位。而在下一章（[第 39 章](ch39-observer-is-ontological-universe.md)）的终极收束中，我们将追问最后一个问题：当自映射不动点 `p = *p` 扩展至整座全域商核，再也没有任何一条逃逸弦横亘于“能看的指针”与“所看的存储阵列”之间时，连“宇宙本体**的**记忆指针”中间那个“的”字所残留的寄存器与内存条之分，是否也将在全域 `p ≡ *p` 中彻底消融？

