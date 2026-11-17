# 38.1 静态本体 QRAM：时间即指针自增 ptr++，观察即解引用 *ptr

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

先在前述 Hann 顺序空间电路的深度一情形手算一次。两个地址是 $a_0=(\mathrm{false},())$、$a_1=(\mathrm{true},())$，输入总线为 $\mathrm{false}$，地址振幅各为 $1/\sqrt2$；经典存储 $D$ 任意固定。完整装载后，唯一的路由器分别处于 $0$、$1$。取 $0\le q\le1$，用四维环境的正交归一基 $e_*,e_W,e_0,e_1$ 保存一次局部记录：

$$
\begin{aligned}
r_0&=\sqrt q\,e_*+\sqrt{1-q}\,e_0,\\
r_1&=\sqrt q\,e_*+\sqrt{1-q}\,e_1.
\end{aligned}
$$

两条记录各自范数为 $1$，交叉重叠为 $q$。继续执行原来的理想门后，两条正交输出基矢为 $\lvert o_i\rangle=\lvert\operatorname{clean}(1,a_i,D(a_i))\rangle$；总线初值为假，所以这里的异或结果就是 $D(a_i)$。系统与环境的联合向量为

$$
\frac{\lvert o_0\rangle\otimes r_0
+\lvert o_1\rangle\otimes r_1}{\sqrt2}.
$$

忽略环境，就是将每个系统矩阵元所乘的记录外积沿环境基求和。在输出基 $(o_0,o_1)$ 上，记录的重叠矩阵 $K_{1,q}$、约化态与理想向量的坐标分别为

$$
\begin{aligned}
K_{1,q}&=\begin{pmatrix}1&q\\q&1\end{pmatrix},\\
\rho_{\mathrm{out}}&=\frac12 K_{1,q},\\
u&=\frac1{\sqrt2}\begin{pmatrix}1\\1\end{pmatrix}.
\end{aligned}
$$

相对于这个理想纯态的**平方保真度**取 $F=u^\dagger\rho_{\mathrm{out}}u$，于是

$$
\begin{aligned}
F&=\frac{1+q+q+1}{4}\\
 &=\frac{1+q}{2}.
\end{aligned}
$$

$q=1/2$ 时得到 $F=3/4$。这里计算的是平方保真度本身，不再对它取平方根。

现在固定这一噪声范围：在 [@thm-ch38-spatial-qutrit-qram-correctness] 的实际顺序装载 `load n n` 之后，对每个实际内部路由器独立施加一次相同的局部记录耦合，随后执行原来的总线交换、空间输运、固定经典数据的叶读出与完整前向过程的逆。门、地址槽、外部总线和空间轨道均保持理想。前述理想布尔可逆网络、理想 Hann 空间三态电路与这里插入单次路由器保持阶段的电路，是三个须分别指定的有限对象；上图的文献路径示意仍按 [@rem-ch38-qram-page-wootters-literature] 解释。

为给出完整输出，沿用已定义的 $A_n$、$Q=\{W,0,1\}$ 与 $S_n=\operatorname{State}(n)$。令 $n\in\mathbb N$，包括 $0$，$N=2^n$，$q\in[0,1]$，$D:A_n\to\operatorname{Bool}$ 为任意固定经典存储。以下缩写对应 `HannRouterDephasing` 中的对象；其中 `load`、`clean`、`initialized` 与其余电路操作仍取前述 `HannSpatialQram` 定义。

每个路由器的环境坐标是 $\{*\}\sqcup Q$，即 `Option Qutrit` 的 `none` 与 `some s`。对任意标签 $s\in Q$，记

$$
r_s=\sqrt q\,e_*+\sqrt{1-q}\,e_s.
$$

其坐标 $r_s(e)$ 正是 `localRecord q s e`。对 $Q\times Q$ 复矩阵 $X$，$\operatorname{diag}_Q(X)$ 表示只保留 $W,0,1$ 基中对角元的矩阵；$\mathcal E_q(X)$ 表示将每个 $X_{st}$ 乘以 $\sum_e r_s(e)\overline{r_t(e)}$ 所得的局部边缘矩阵。所有独立环境的基指标集合 $\mathcal E_n$ 对应 `Environment n`：

$$
\begin{aligned}
\mathcal E_0&=\operatorname{Unit},\\
\mathcal E_{n+1}&=(\{*\}\sqcup Q)
\times\mathcal E_n\times\mathcal E_n.
\end{aligned}
$$

记 $I_n$ 为 `Tree n` 的内部路由器位置集：深度零为空，每个分叉由根路由器与左右两份子树位置组成；入射和输出轨道不在 $I_n$ 中。对任意树配置 $t$，令 $t_v$ 是位置 $v$ 的路由标签。乘积记录及其密度矩阵方向的重叠为

$$
\begin{aligned}
R_t(e)&=\prod_{v\in I_n}r_{t_v}(e_v),\\
\Omega_q(t,u)&=\sum_{e\in\mathcal E_n}
 R_t(e)\overline{R_u(e)}.
\end{aligned}
$$

它们分别对应 `environmentRecord`、`recordOverlap`；深度零的乘积为 $1$。令 $m(t,u)=\#\{v\in I_n:t_v\ne u_v\}$，即只数内部路由坐标的 `routerMismatch`。

对 $s\in S_n$，记 $T(s)=s.2.2$ 为其空间树投影。令 $L_n=\operatorname{load}(n,n)$，$P_{n,D}=\operatorname{postLoad}(n,D)$；后者按顺序执行 `exchange`、`transport`、`readLeaves n D`、`(forward n).symm`，每步在完整系统上保留未涉及的坐标。实际装载树与逆像缩写为

$$
\begin{aligned}
\tau_{a,b}&=T\bigl(L_n(\operatorname{clean}(n,a,b))\bigr),\\
v_s&=P_{n,D}^{-1}(s),\\
w_s&=L_n^{-1}(v_s).
\end{aligned}
$$

对任意联合复振幅 $\psi:A_n\times\operatorname{Bool}\to\mathbb C$，令 $\alpha_\psi=\operatorname{initialized}(n,\psi)$。在整个物理基空间上定义联合振幅 $J_\psi$ 与系统矩阵 $\rho_{\mathrm{out}}$：

$$
\begin{aligned}
J_\psi(s,e)&=\alpha_\psi(w_s)R_{T(v_s)}(e),\\
\rho_{\mathrm{out}}(s,t)
 &=\Omega_q\bigl(T(v_s),T(v_t)\bigr)\\
 &\quad\cdot\alpha_\psi(w_s)
 \overline{\alpha_\psi(w_t)}.
\end{aligned}
$$

这正是 `jointOutput n q D ψ` 与 `noisyOutput n q D ψ`，记录附着在实际装载之后、理想后续门之前的路由配置上。下一定理给出两者的环境偏迹关系。

`addressWord n a` 按实际装载次序把地址写成首位在前的长度 $n$ 布尔字：空地址对应空字，$(c,a)$ 对应在尾地址字前添 $c$。记 $\ell(a,a')$ 为这两个字的最长公共前缀长度，即 `BinaryWordGeometry.lcp` 的长度。定义

$$
\begin{aligned}
d_n(a,a')&=\begin{cases}
0,&a=a',\\
2(n-\ell(a,a'))-1,&a\ne a',
\end{cases}\\
K_{n,q}(a,a')&=\begin{cases}
1,&a=a',\\
q^{2(n-\ell(a,a'))-1},&a\ne a'.
\end{cases}
\end{aligned}
$$

$K_{n,q}$ 对应实值的 `kernel`。不同地址时 $\ell<n$，故指数为正整数；相同地址单独取值 $1$，也适用于 $q=0$ 和唯一空地址。

记 $\mathcal C_n=\{\operatorname{clean}(n,a,b):a\in A_n,\ b\in\operatorname{Bool}\}$。以输入地址和总线标签标记理想输出：

$$
\begin{aligned}
o_{a,b}&=\operatorname{clean}(n,a,b\mathbin{\oplus}D(a)),\\
\lvert\phi_\psi\rangle
 &=\sum_{a\in A_n}\sum_{b\in\operatorname{Bool}}
 \psi(a,b)\lvert o_{a,b}\rangle.
\end{aligned}
$$

$o_{a,b}$ 对应 `outputBasis n D (a,b)`，$\phi_\psi:S_n\to\mathbb C$ 是 `idealOutput n D ψ` 的完整坐标向量。定义地址权重、实二次型及平方保真度：

$$
\begin{aligned}
p_a&=\sum_{b\in\operatorname{Bool}}|\psi(a,b)|^2,\\
E_{n,q}(p)&=\sum_{a\in A_n}\sum_{a'\in A_n}
 p_a p_{a'}K_{n,q}(a,a'),\\
F_{n,q,D}(\psi)
 &=\langle\phi_\psi\rvert\rho_{\mathrm{out}}
 \lvert\phi_\psi\rangle\\
 &=\sum_{s,t\in S_n}\overline{\phi_\psi(s)}
 \rho_{\mathrm{out}}(s,t)\phi_\psi(t).
\end{aligned}
$$

三者分别对应 `addressProbability`、`addressEnergy`、`squaredFidelity`；$|z|^2$ 对应 `Complex.normSq z`。`Normalized n ψ` 的条件是

$$
\sum_{a\in A_n}\sum_{b\in\operatorname{Bool}}
 |\psi(a,b)|^2=1.
$$

不要求 $\psi(a,b)$ 分解为地址振幅与总线振幅的乘积。最后，记 `minimumFidelity n q` 为

$$
\begin{aligned}
f_n(q)&=\frac{1+\displaystyle\sum_{j=0}^{n-1}
 2^j q^{2j+1}}{2^n}\\
 &=2^{-n}\left(1+\sum_{j=1}^{n}
 2^{j-1}q^{2j-1}\right),
\end{aligned}
$$

其中 $n=0$ 时两种求和均为空。`uniformInput n` 记为 $h_n$：当 $b=\mathrm{false}$ 时 $h_n(a,b)=1/\sqrt{2^n}$，当 $b=\mathrm{true}$ 时为 $0$。

::: {.theorem #thm-ch38-single-hold-router-dephasing title="单次路由器保持阶段的退相干、完整输出与平方保真度的尖锐下界" lean="D5/S3/Quantum/Routing/HannRouterDephasing.result"}
对每个 $n\in\mathbb N$、$q\in[0,1]$ 及每个固定经典存储 $D:A_n\to\operatorname{Bool}$，采用上述实际装载、独立局部记录与原理想后续门，有以下结论。

1. 对任意 $Q\times Q$ 复矩阵 $X$，局部环境偏迹给出信道

   $$
   \mathcal E_q(X)=qX+(1-q)\operatorname{diag}_Q(X),
   $$

   其中 $\operatorname{diag}_Q$ 只保留 $W,0,1$ 基中的对角元。逐项地，对每个 $s,t\in Q$，

   $$
   \begin{aligned}
   &\left(\sum_{e\in\{*\}\sqcup Q}
   r_s(e)\overline{r_t(e)}\right)X_{st}\\
   &\quad=qX_{st}+(1-q)
   \begin{cases}X_{st},&s=t,\\0,&s\ne t.\end{cases}
   \end{aligned}
   $$

   对每个 $t\in\operatorname{Tree}(n)$，$\Omega_q(t,t)=1$。

2. 对所有 $a,a'\in A_n$ 与 $b,b'\in\operatorname{Bool}$，实际装载树满足

   $$
   \begin{aligned}
   m(\tau_{a,b},\tau_{a',b'})&=d_n(a,a'),\\
   \Omega_q(\tau_{a,b},\tau_{a',b'})&=K_{n,q}(a,a').
   \end{aligned}
   $$

   右端与两个总线标签均无关；实数 $K_{n,q}$ 在复等式中取其自然嵌入。

3. 对任意复振幅 $\psi$，不要求归一化，对所有 $s,t\in S_n$，完整环境偏迹为

   $$
   \sum_{e\in\mathcal E_n}
   J_\psi(s,e)\overline{J_\psi(t,e)}
   =\rho_{\mathrm{out}}(s,t).
   $$

   对所有 $a,a',b,b'$，每个干净输出矩阵元为

   $$
   \begin{aligned}
   &\rho_{\mathrm{out}}(o_{a,b},o_{a',b'})\\
   &\quad=\psi(a,b)\overline{\psi(a',b')}
   K_{n,q}(a,a').
   \end{aligned}
   $$

   若 $s\notin\mathcal C_n$ 或 $t\notin\mathcal C_n$，则 $\rho_{\mathrm{out}}(s,t)=0$；因此矩阵支撑于干净输出基矢的张成空间。

4. 若 $\psi$ 归一化，则理想完整输出向量也归一化，且平方保真度为实数并满足

   $$
   \begin{aligned}
   \sum_{s\in S_n}|\phi_\psi(s)|^2&=1,\\
   F_{n,q,D}(\psi)&=E_{n,q}(p)\\
   &=\sum_{a,a'\in A_n}p_a p_{a'}K_{n,q}(a,a')\\
   &\ge f_n(q).
   \end{aligned}
   $$

5. $h_n$ 是归一化输入，并且对每个地址 $a$，

   $$
   \begin{aligned}
   h_n(a,\mathrm{false})&=2^{-n/2},\\
   h_n(a,\mathrm{true})&=0,\\
   F_{n,q,D}(h_n)&=f_n(q),\\
   f_0(q)&=1.
   \end{aligned}
   $$

   这里 $2^{-n/2}$ 取正实值；该输入对所有上述 $n,q,D$ 均达到下界。
:::

::: proof
先沿实际 `load n n` 的装载正确性，把树投影识别为 `programmed n a n`。地址相同则所有路由器相同。地址不同而公共前缀长为 $\ell$ 时，前 $\ell$ 个路由器一致；第一次分歧处，一个路由器保存 $0$，另一个保存 $1$，贡献一次失配。分歧之后，两条路径进入互不相交的子树：每条尾路径上有 $n-\ell-1$ 个已占据路由器，而另一配置在这些位置为等待态 $W$。所以总失配数为

$$
1+2(n-\ell-1)=2(n-\ell)-1.
$$

装载时总线仍在独立的外部坐标，故这个计数不含 $b,b'$。每个局部记录重叠在标签相同时为 $1$，不同时为 $q$；独立环境使这些重叠相乘，得到实际装载树的 $K_{n,q}$，并使任意树的自重叠为 $1$。局部矩阵元公式也直接给出 $qX+(1-q)\operatorname{diag}_Q(X)$。

保持环境记录不变，只对系统施加原来的 $P_{n,D}$。理想查询把每个干净输入送到 $o_{a,b}$；在完整系统基上按逆置换拉回振幅，正得到 $J_\psi$ 与 $\rho_{\mathrm{out}}$ 的定义。沿环境坐标求和给出偏迹等式。初始化振幅在干净输入以外为零，而理想查询把干净基双射到干净基，因而所有干净矩阵元及离开该张成空间的零矩阵元都得到确定。

将理想向量代入完整系统双重求和，每对输入标签贡献 $|\psi(a,b)|^2|\psi(a',b')|^2K_{n,q}(a,a')$。分别对两个总线标签求和，留下 $p_a p_{a'}$，得到精确的实二次型；这里没有假设地址与总线的振幅独立。

下界沿二叉树深度归纳。将深度 $n+1$ 的实地址权重按首位分成 $p_0,p_1$，记其总质量为 $s=\sum_a p_0(a)$、$t=\sum_a p_1(a)$，令 $c=q^{2n+1}$。同支核是深度 $n$ 的核，异支核恒为 $c$，所以

$$
\begin{aligned}
E_{n+1,q}(p)&=E_{n,q}(p_0)+E_{n,q}(p_1)\\
 &\quad+2cst,\\
f_{n+1}(q)&=\frac{f_n(q)+c}{2}.
\end{aligned}
$$

归纳对任意总质量使用齐次下界 $E_{n,q}(p_i)\ge f_n(q)(\sum_a p_i(a))^2$。由 $0\le q\le1$，同一递推给出 $f_n(q)\ge c$。因此两支下界相加后，超过所需齐次界的余项为

$$
\begin{aligned}
&f_n(q)(s^2+t^2)+2cst\\
&\quad-f_{n+1}(q)(s+t)^2\\
&=\frac{f_n(q)-c}{2}(s-t)^2\ge0.
\end{aligned}
$$

深度零的二次型就是总质量的平方；归一化时总质量为 $1$，遂得下界。最后，每行核的和相同：

$$
\begin{aligned}
\sum_{a'\in A_n}K_{n,q}(a,a')
 &=1+\sum_{j=0}^{n-1}2^j q^{2j+1}\\
 &=2^n f_n(q).
\end{aligned}
$$

均匀输入 $h_n$ 在 $2^n$ 个地址上的概率均为 $2^{-n}$，总概率为 $1$；常行和遂给出 $F_{n,q,D}(h_n)=f_n(q)$。这个输入达到下界，因而下界是尖锐的。完整证明由 Lean 内核检查。
:::

直接代入有限和可得闭区间两端 $f_n(0)=2^{-n}$、$f_n(1)=1$。对任意归一化输入，$q=0$ 时仅消去不同地址间的项，故 $F=\sum_a p_a^2$，均匀地址权重达到 $2^{-n}$；$q=1$ 时所有核元均为 $1$，故 $F=(\sum_a p_a)^2=1$。$n=0$ 时没有路由器，空乘积与空和给出任意归一化输入在所有 $q\in[0,1]$ 下的 $F=1$。这些结论都属于 [@thm-ch38-single-hold-router-dephasing] 指定的单次独立路由器保持阶段与其余理想门。它补充了前述有限 Hann 电路的信道结论；原来的理想布尔网络、理想 Hann 查询与外部文献各按其陈述解释。这里不涉及门噪声、相关或重复保持阶段、现实硬件容错，也不证明下面无限地址本体及观察者指针的 `MODEL` 后果。

**异质路由器：环境究竟分辨了哪些地址？** 上面的同质保持阶段给每个路由器相同的 $q$。现在只放开这一处：每个实际内部路由器 $v$ 有自己的 $q(v)\in[0,1]$，仍在完整顺序装载后独立记录一次，随后执行原来的理想后续门。$q(v)=1$ 时，局部环境只保留共同坐标，读不出该路由器的标签；$q(v)=0$ 时，它完整区分 $W,0,1$。因此，地址数与不同环境记录的数目可以不同。要描述这种退化，先逐个找到被记录的物理坐标，再把具有相同可见标签的地址归为一类。

::: {.definition #def-ch38-profile-routers title="实际内部路由器与装载标签" lean="D5/S3/Quantum/Routing/HannRouterProfiles.Router D5/S3/Quantum/Routing/HannRouterProfiles.routerLabel D5/S3/Quantum/Routing/HannRouterProfiles.snoc D5/S3/Quantum/Routing/HannRouterProfiles.deepest D5/S3/Quantum/Routing/HannRouterProfiles.loadedLabel"}
沿用首位在前的地址 $A_0=\{()\}$、$A_{m+1}=\operatorname{Bool}\times A_m$，以及 $Q=\{W,0,1\}$、空间树与完整系统基空间 $S_n$。以下对象取自 `HannRouterProfiles`；电路操作仍取自 `HannSpatialQram`。

具体地，$\operatorname{Tree}(m)=Q\times\operatorname{Interior}(m)$，$\operatorname{Interior}(0)=\operatorname{Unit}$，$\operatorname{Interior}(m+1)=Q\times\operatorname{Tree}(m)\times\operatorname{Tree}(m)$，而 $S_n=(\operatorname{Fin}(n)\to Q)\times Q\times\operatorname{Tree}(n)$。树的首坐标是入射模式，内部结构的首坐标才是路由器。

内部路由器位置集为

$$
I_0=\varnothing,\qquad
I_{m+1}=\{\mathrm{root}\}\sqcup(\operatorname{Bool}\times I_m).
$$

它对应 `Router n`；根对应 `none`，$(c,v)$ 对应 `some (c,v)`，其中假选左子树，真选右子树。`routerLabel n t v` 只读树 $t$ 的路由器字段，记为 $t_v$；入射模式和输出轨道均不在 $I_n$ 中。

令 $L_n=\operatorname{load}(n,n)$，$T(s)$ 为系统配置 $s$ 的树投影。对 $a\in A_n$、任意外部三态总线标签 $\beta\in Q$，定义

$$
\begin{aligned}
\tau_{a,\beta}&=T\bigl(L_n(\operatorname{loading}(n,a,\beta,0))\bigr),\\
\lambda_{a,\beta}(v)&=(\tau_{a,\beta})_v.
\end{aligned}
$$

第二行即 `loadedLabel n a β v`。`snoc m u c` 在 $u\in A_m$ 的末尾添加一位 $c$；$d_m(u)=\operatorname{deepest}(m,u)\in I_{m+1}$ 是沿前缀 $u$ 到达的最深层路由器。它按地址首位在前的顺序递归定位。
:::

实际装载正确性给出 $\tau_{a,\beta}=\operatorname{programmed}(n,a,n)$，所以 $\lambda_{a,\beta}$ 与 $\beta$ 无关；下文也写作 $\lambda_a$。这里读的是装载完成时的树，并非另造一个只有路径名字的抽象地址编码。路径外的路由器仍有实际的 $W$ 标签，也参与环境记录。

::: {.definition #def-ch38-profile-records title="异质局部记录与物理张量环境" lean="D5/S3/Quantum/Routing/HannRouterProfiles.Environment D5/S3/Quantum/Routing/HannRouterProfiles.treeRecord D5/S3/Quantum/Routing/HannRouterProfiles.record"}
给定 $q:I_n\to[0,1]$，在每个位置 $v$ 使用一份具有正交归一基 $e_*,e_W,e_0,e_1$ 的环境，局部记录为

$$
r_{v,s}=\sqrt{q(v)}\,e_*+\sqrt{1-q(v)}\,e_s,
\qquad s\in Q.
$$

这是 `HannRouterDephasing.localRecord (q v) s`。环境基指标集为 $\mathcal E_n=(\{*\}\sqcup Q)^{I_n}$，对应本节的 `Environment n`。对任意 $t\in\operatorname{Tree}(n)$，定义

$$
\begin{aligned}
\mathcal R_t(e)&=\prod_{v\in I_n}r_{v,t_v}(e_v),\\
R_a(e)&=\prod_{v\in I_n}r_{v,\lambda_{a,W}(v)}(e_v).
\end{aligned}
$$

两者分别为 `treeRecord n q t` 与 `record n q a`。$n=0$ 时环境只有一个基指标，两个空乘积都为 $1$。

局部耦合将路由器基矢 $\lvert s\rangle$ 连同空白环境送到 $\lvert s\rangle\otimes r_{v,s}$；各位置独立耦合后，树基矢对应 $\lvert t\rangle\otimes\mathcal R_t$，其他系统坐标保持原值。
:::

::: {.definition #def-ch38-active-profiles title="实现的活跃轮廓与类记录" lean="D5/S3/Quantum/Routing/HannRouterProfiles.SameProfile D5/S3/Quantum/Routing/HannRouterProfiles.Separates D5/S3/Quantum/Routing/HannRouterProfiles.Profile D5/S3/Quantum/Routing/HannRouterProfiles.profile D5/S3/Quantum/Routing/HannRouterProfiles.classRecord"}
位置 $v$ 称为活跃的，当且仅当 $q(v)<1$。对任意实值函数 $q:I_n\to\mathbb R$，`SameProfile n q a a' β β'` 表示

$$
\forall v\in I_n,\quad q(v)<1\ \Longrightarrow\
\lambda_{a,\beta}(v)=\lambda_{a',\beta'}(v).
$$

`Separates n q` 表示对所有 $a,a'\in A_n$ 与 $\beta,\beta'\in Q$，这个条件都蕴含 $a=a'$。记 $\pi(a)$ 为 $\lambda_{a,W}$ 在活跃位置上的限制，$C_{n,q}=\pi(A_n)$ 为其实际像；它们对应 `profile` 与 `Profile`。不被任何地址实现的标签组合不属于 $C_{n,q}$。

在 $q(v)\in[0,1]$ 的物理范围内，类记录 $R_c$ 是任取满足 $\pi(a)=c$ 的代表地址所得的 $R_a$，对应 `classRecord`。相同类在活跃位置标签相同；其余位置的 $q(v)=1$，记录恒为 $e_*$，故此定义不依赖代表的选择。
:::

::: {.theorem #thm-ch38-profile-separation title="最深层物理路由器的精确分辨条件" lean="D5/S3/Quantum/Routing/HannRouterProfiles.profile_separation_iff"}
对任意 $m\in\mathbb N$ 及任意实值函数 $q:I_{m+1}\to\mathbb R$，不要求区间限制，

$$
\begin{aligned}
&\bigl[\forall a,a'\in A_{m+1},\ \forall\beta,\beta'\in Q,\\
&\qquad\operatorname{SameProfile}(m+1,q,a,a',\beta,\beta')
\ \Longrightarrow\ a=a'\bigr]\\
&\qquad\Longleftrightarrow\quad
\forall u\in A_m,\ q(d_m(u))<1.
\end{aligned}
$$
:::

::: {.proof #pf-ch38-profile-separation}
把任意地址写成 $\operatorname{snoc}(m,u,c)$。实际装载树在最深层位置满足

$$
\lambda_{\operatorname{snoc}(m,u,c),\beta}(d_m(i))
=\begin{cases}\operatorname{encode}(c),&i=u,\\W,&i\ne u.\end{cases}
$$

同一前缀 $u$ 下的两个末位兄弟地址，除 $d_m(u)$ 外的所有内部路由器标签都相同。若这个最深层位置不活跃，两个不同地址便具有相同活跃轮廓，必要性成立。反过来，若所有最深层位置都活跃，就观察第一个地址前缀下的 $d_m(u)$：不同前缀给出编码标签与 $W$ 的区别；相同前缀则由编码标签区分最后一位。装载标签不依赖外部总线，所以论证同时允许两个任意、彼此不同的总线标签。这一分辨条件本身只是组合陈述；物理记录的平方根与归一化仍使用闭区间假设。完整证明由 Lean 内核检查。
:::

::: {.definition #def-ch38-profile-gram-energy title="复格拉姆矩阵、类系数和与能量" lean="D5/S3/Quantum/Routing/HannRouterProfiles.gram D5/S3/Quantum/Routing/HannRouterProfiles.classSum D5/S3/Quantum/Routing/HannRouterProfiles.addressEnergy D5/S3/Quantum/Routing/HannRouterProfiles.classEnergy"}
在上述物理范围内，定义密度矩阵方向的复格拉姆矩阵

$$
G(a,a')=\sum_{e\in\mathcal E_n}R_a(e)\overline{R_{a'}(e)}.
$$

它对应 `gram n q`。对任意复系数 $z:A_n\to\mathbb C$，类系数和为

$$
(\Sigma_qz)_c=\sum_{a:\pi(a)=c}z_a,
$$

对应 `classSum`；同一有限和也用于实系数。对任意实向量 $p:A_n\to\mathbb R$ 与 $x:C_{n,q}\to\mathbb R$，定义

$$
\begin{aligned}
E_q(p)&=\sum_{a,a'\in A_n}p_ap_{a'}\operatorname{Re}G(a,a'),\\
H_q(x)&=\sum_{e\in\mathcal E_n}
\left|\sum_{c\in C_{n,q}}x_cR_c(e)\right|^2.
\end{aligned}
$$

它们分别对应 `addressEnergy` 与 `classEnergy`。这里 $|z|^2$ 是 `Complex.normSq z`；这些能量定义本身不要求系数非负或总和为 $1$。
:::

::: {.definition #def-ch38-profile-laws title="概率单纯形、类质量与最深层活跃性" lean="D5/S3/Quantum/Routing/HannRouterProfiles.AddressDistribution D5/S3/Quantum/Routing/HannRouterProfiles.ClassDistribution D5/S3/Quantum/Routing/HannRouterProfiles.classMass D5/S3/Quantum/Routing/HannRouterProfiles.inputDistribution D5/S3/Quantum/Routing/HannRouterProfiles.distributionInput D5/S3/Quantum/Routing/HannRouterProfiles.DeepestActive"}
记 $\Delta(A_n)$、$\Delta(C_{n,q})$ 为各自的概率单纯形，即非负权重总和为 $1$ 的集合，对应 `AddressDistribution` 与 `ClassDistribution`。类质量映射 `classMass` 为

$$
(\pi_*p)_c=\sum_{a:\pi(a)=c}p_a.
$$

对任意联合复振幅 $\psi:A_n\times\operatorname{Bool}\to\mathbb C$，令 $p^\psi_a=\sum_b|\psi(a,b)|^2$。若 $\sum_{a,b}|\psi(a,b)|^2=1$，称其归一化；此时 $p^\psi\in\Delta(A_n)$，即 `inputDistribution`。不要求地址与总线的乘积态形式。对 $p\in\Delta(A_n)$，`distributionInput` 为

$$
\psi_p(a,b)=\begin{cases}\sqrt{p_a},&b=\mathrm{false},\\0,&b=\mathrm{true},\end{cases}
$$

其中平方根作为非负实数嵌入 $\mathbb C$。

`DeepestActive n q` 在 $n=0$ 时为真；在 $n=m+1$ 时表示 $\forall u\in A_m,\ q(d_m(u))<1$。
:::

::: {.definition #def-ch38-profile-output title="实际保持阶段的完整输出与平方保真度" lean="D5/S3/Quantum/Routing/HannRouterProfiles.jointOutput D5/S3/Quantum/Routing/HannRouterProfiles.noisyOutput D5/S3/Quantum/Routing/HannRouterProfiles.squaredFidelity"}
固定任意经典存储 $D:A_n\to\operatorname{Bool}$。沿用 $P_{n,D}=\operatorname{postLoad}(n,D)$，依次执行原来的总线交换、空间输运、叶读出及完整前向过程的逆；它不作用于环境。对 $s\in S_n$ 记

$$
v_s=P_{n,D}^{-1}(s),\qquad w_s=L_n^{-1}(v_s),\qquad
\alpha_\psi=\operatorname{initialized}(n,\psi).
$$

异质记录的联合振幅、完整系统密度矩阵与平方保真度定义为

$$
\begin{aligned}
J^q_\psi(s,e)&=\alpha_\psi(w_s)\mathcal R_{T(v_s)}(e),\\
\rho^q_\psi(s,t)&=\sum_{e\in\mathcal E_n}
J^q_\psi(s,e)\overline{J^q_\psi(t,e)},\\
F^q_D(\psi)&=\sum_{s,t\in S_n}
\overline{\phi_\psi(s)}\rho^q_\psi(s,t)\phi_\psi(t).
\end{aligned}
$$

这里 $o_{a,b}=\operatorname{clean}(n,a,b\mathbin{\oplus}D(a))$，$\phi_\psi=\sum_{a,b}\psi(a,b)\lvert o_{a,b}\rangle$ 是原来的完整理想输出。上述三式对应本节的 `jointOutput`、`noisyOutput` 与 `squaredFidelity`，求和遍及整个物理系统 $S_n$，仅偏迹掉独立路由器环境。对未归一化振幅，三式仍按相同有限和定义；平方保真度的态比较含义用于归一化输入。

其中 $\operatorname{clean}(n,a,b)=\operatorname{loading}(n,a,\operatorname{encode}(b),0)$：地址槽保存编码地址，外部总线保存编码布尔位，树为真空。初始化满足 $\alpha_\psi(\operatorname{clean}(n,a,b))=\psi(a,b)$，在所有其他基配置上为零。
:::

::: {.theorem #thm-ch38-physical-profile-event title="异质物理轮廓、复系数核与全部保真度极小输入" lean="D5/S3/Quantum/Routing/HannRouterProfiles.physical_profile_event"}
对每个 $n\in\mathbb N$、每个实值路由器函数 $q:I_n\to\mathbb R$，假设对所有 $v\in I_n$ 均有 $0\le q(v)\le1$；固定任意经典存储 $D:A_n\to\operatorname{Bool}$。采用上述实际装载、独立单次记录与原理想后续门，以下各款同时成立。

1. **(P1) 任意总线的实际装载记录。** 对所有 $a\in A_n$、$\beta\in Q$，$\mathcal R_{\tau_{a,\beta}}=R_a$，等式为整个环境坐标函数的相等。
2. **(P2) 任意树的记录归一化。** 对所有 $t\in\operatorname{Tree}(n)$，$\sum_e|\mathcal R_t(e)|^2=1$。
3. **(P3) 类与可见标签等价。** 对所有 $a,a'\in A_n$、$\beta,\beta'\in Q$，

   $$
   \pi(a)=\pi(a')\ \Longleftrightarrow\
   \forall v\in I_n,\ q(v)<1\Rightarrow
   \lambda_{a,\beta}(v)=\lambda_{a',\beta'}(v).
   $$

4. **(P4) 类记录复线性无关。** $\{R_c:c\in C_{n,q}\}$ 在 $\mathbb C$ 上线性无关。
5. **(P5) 精确秩。** $\operatorname{rank}_{\mathbb C}G=|C_{n,q}|$。
6. **(P6) 任意复系数的完整核。** 对所有 $z:A_n\to\mathbb C$，

   $$
   Gz=0\ \Longleftrightarrow\
   \forall c\in C_{n,q},\ \sum_{a:\pi(a)=c}z_a=0.
   $$

7. **(P7) 全秩充要条件。** $\operatorname{rank}_{\mathbb C}G=2^n$ 当且仅当 `DeepestActive n q`。
8. **(P8) 深度零的秩。** 若 $n=0$，则 $\operatorname{rank}_{\mathbb C}G=1$。
9. **(P9) 类质量分解。** 对每个 $p\in\Delta(A_n)$，$E_q(p)=H_q(\pi_*p)$。
10. **(P10) 完整理想输出的逆像。** 对任意复振幅 $\psi$ 与所有 $s\in S_n$，$\phi_\psi(s)=\alpha_\psi(w_s)$，无需归一化。
11. **(P11) 每个干净输出矩阵元。** 对任意复振幅 $\psi$ 及所有 $a,a'\in A_n$、$b,b'\in\operatorname{Bool}$，

    $$
    \rho^q_\psi(o_{a,b},o_{a',b'})
    =\psi(a,b)\overline{\psi(a',b')}G(a,a').
    $$

12. **(P12) 完整系统的精确保真度式。** 对任意复振幅 $\psi$，$F^q_D(\psi)=E_q(p^\psi)$，右端自然嵌入 $\mathbb C$；无需归一化，该值为实数。
13. **(P13) 两个完整向量的归一化。** 若 $\psi$ 归一化，则

    $$
    \begin{aligned}
    \sum_{s\in S_n}\sum_{e\in\mathcal E_n}|J^q_\psi(s,e)|^2&=1,\\
    \sum_{s\in S_n}|\phi_\psi(s)|^2&=1.
    \end{aligned}
    $$

14. **(P14) 每个地址概率律可实现。** 对每个 $p\in\Delta(A_n)$，$\psi_p$ 归一化，且其 `inputDistribution` 恰为 $p$。
15. **(P15) 唯一类极小点与全部极小纤维。** 存在 $\mu^*\in\Delta(C_{n,q})$，满足 $H_q(\mu^*)\le H_q(\nu)$ 对所有 $\nu\in\Delta(C_{n,q})$ 成立；任何也满足此极小条件的类概率律均等于 $\mu^*$。映射 $\pi_*:\Delta(A_n)\to\Delta(C_{n,q})$ 为满射。对每个 $p\in\Delta(A_n)$，

    $$
    \begin{aligned}
    &[\forall r\in\Delta(A_n),\ E_q(p)\le E_q(r)]\\
    &\qquad\Longleftrightarrow\quad \pi_*p=\mu^*.
    \end{aligned}
    $$

    对每个归一化联合输入 $\psi$，

    $$
    \begin{aligned}
    &[\forall\varphi\ \text{归一化},\
    \operatorname{Re}F^q_D(\psi)\le\operatorname{Re}F^q_D(\varphi)]\\
    &\qquad\Longleftrightarrow\quad \pi_*p^\psi=\mu^*.
    \end{aligned}
    $$

    全部极小地址律正是满足 $p_a\ge0$、$\sum_ap_a=1$、$\sum_{a:\pi(a)=c}p_a=\mu^*_c$ 的整个集合；不要求类权重或地址权重严格为正。
:::

::: {.proof #pf-ch38-physical-profile-event}
实际装载树等于完整编程树，立刻给出 P1 与 P3 中对任意外部三态总线的独立性。对任意两种局部标签 $s,t$，逐项相乘四个环境坐标得到

$$
\sum_\eta r_{v,s}(\eta)\overline{r_{v,t}(\eta)}
=\begin{cases}1,&s=t,\\q(v),&s\ne t.\end{cases}
$$

相同标签贡献 $q(v)+(1-q(v))=1$；不同标签只共享共同坐标。有限张量积把各节点的重叠相乘。因此任意树记录的范数为 $1$，得到 P2；地址格拉姆元也可直接读成 $\prod_{v:\lambda_a(v)\ne\lambda_{a'}(v)}q(v)$。空乘积保留深度零和两端点，不需要除以任何 $q(v)$。

为看清 P4，给每个实现的类 $c$ 选择一个实际环境基指标 $e^{(c)}$：活跃节点取该类的标签坐标，其余节点取共同坐标。于是

$$
\begin{aligned}
R_d(e^{(c)})&=\begin{cases}\delta_q,&d=c,\\0,&d\ne c,\end{cases}\\
\delta_q&=\prod_{v:q(v)<1}\sqrt{1-q(v)}>0.
\end{aligned}
$$

在这个坐标上求值，就能从任意类记录的复线性组合中单独取出第 $c$ 个系数。令列矩阵 $M(e,a)=R_a(e)$。记录都是实数，所以本节密度方向的 $G$ 同时等于 $M^\dagger M$。格拉姆矩阵与列矩阵具有相同的核和秩；而

$$
\sum_a z_aR_a=\sum_c(\Sigma_qz)_cR_c.
$$

结合类记录线性无关及 $\pi$ 到实际像的满射，便得 P5、P6。再由 [@thm-ch38-profile-separation]，类映射在正深度单射恰好要求所有最深层路由器活跃，得到 P7。深度零只有空地址与单位记录，$G=(1)$，P8 成立，此时 `DeepestActive` 没有额外限制。

把实地址系数按类合并，记录叠加的平方范数正是 $E_q$，从而给出 P9。类记录的线性无关还说明：若实向量 $x\ne0$，则 $H_q(x)>0$。展开平方范数，得到中点缺口

$$
H_q\!\left(\frac{x+y}{2}\right)
=\frac{H_q(x)+H_q(y)}2-\frac{H_q(x-y)}4.
$$

类概率单纯形非空且紧，$H_q$ 连续，因而取得极小值。若有两个不同极小点，中点仍在单纯形内，而上式严格降低能量，矛盾。故极小类律唯一；这一步不要求极小点位于单纯形内部。

每个类都有代表地址。将某一类的质量全部放在它的一个代表上，就把任意类概率律提升为地址概率律，包括零质量的类。因此 $\pi_*$ 为满射。P9 与类极小点的唯一性遂给出 P15 的地址等价式，允许在各类内作任意非负分配。若 $\mu^*_c=0$，该类内每个地址权重都必须为零；这仍属于同一个完整纤维。

物理输出部分使用原来的实际电路。理想查询将 $\operatorname{clean}(n,a,b)$ 送到 $o_{a,b}$；逆置换拉回初始化振幅，给出 P10。在这个输出基上，$J^q_\psi(o_{a,b},e)=\psi(a,b)R_a(e)$，环境偏迹遂给出 P11。对于整个 $S_n$，联合振幅与密度矩阵仍由定义中的逆像和环境和确定；没有把系统先缩成只有地址的模型。由 P2、P10 及理想置换保持范数，联合向量与理想向量的范数均为 $1$，得到 P13。

将 P11 代入完整理想输出的期望值，每对输入标签贡献 $|\psi(a,b)|^2|\psi(a',b')|^2G(a,a')$。对 $b,b'$ 分别求和即得 P12，且不需要乘积态假设或归一化假设。对于 P14，非负平方根使 $\sum_b|\psi_p(a,b)|^2=p_a$，再对 $a$ 求和便是 $1$。因此每个地址律都有归一化联合输入实现；结合 P12，地址律上的极小条件与所有归一化联合输入上的极小条件完全等价，完成 P15。完整证明由 Lean 内核检查。
:::

::: {.example #ex-ch38-heterogeneous-profile-fiber title="深度二：三种记录与一条最优地址纤维"}
取深度 $2$，将根、左子、右子路由器依次记为 $r,\ell,h$，令 $q(r)=1$、$q(\ell)=0$、$q(h)=1$。地址按首位在前写作 $00,01,10,11$。实际装载标签逐项为

$$
\begin{array}{c|ccc}
a&r&\ell&h\\\hline
00&0&0&W\\
01&0&1&W\\
10&1&W&0\\
11&1&W&1
\end{array}
$$

只有左子路由器活跃。根与右子环境的记录均为 $e_*$，故按 $(r,\ell,h)$ 的张量顺序，

$$
\begin{aligned}
R_{00}&=e_*\otimes e_0\otimes e_*,\\
R_{01}&=e_*\otimes e_1\otimes e_*,\\
R_{10}=R_{11}&=e_*\otimes e_W\otimes e_*.
\end{aligned}
$$

这直接给出三个实现的类 $c_0=\{00\}$、$c_1=\{01\}$、$c_W=\{10,11\}$，以及

$$
G=\begin{pmatrix}
1&0&0&0\\0&1&0&0\\0&0&1&1\\0&0&1&1
\end{pmatrix}.
$$

其秩为 $3$，复系数核恰为 $z_{00}=z_{01}=0$、$z_{10}+z_{11}=0$。右子最深层路由器不活跃，正好对应两个兄弟地址合为一类。三个类记录正交归一，所以对类质量 $(x,y,z)$ 有 $H_q=x^2+y^2+z^2$。在 $x+y+z=1$ 下，

$$
x^2+y^2+z^2-\frac13
=\left(x-\frac13\right)^2+
\left(y-\frac13\right)^2+\left(z-\frac13\right)^2.
$$

唯一极小类律为 $(1/3,1/3,1/3)$，最小平方保真度为 $1/3$。全部极小地址律为

$$
(p_{00},p_{01},p_{10},p_{11})
=\left(\frac13,\frac13,t,\frac13-t\right),
\qquad 0\le t\le\frac13.
$$

两端各有一个零地址权重；不应在写纤维时把它们删掉。均匀地址律的类质量为 $(1/4,1/4,1/2)$，能量为 $3/8>1/3$。对每个固定经典 $D$，任意归一化联合复输入都是极小输入，当且仅当其三个类质量分别为 $1/3$；允许的复相位、类内地址分配及地址—总线纠缠均由这个条件保留。这些数值由上述实际记录手算得到，是 [@thm-ch38-physical-profile-event] 的具体代入。
:::

::: {.remark #rem-ch38-profile-scope title="秩、极小纤维与物理适用范围"}
P6 描述的是复格拉姆矩阵作用于地址系数向量的核，不能把它改称密度矩阵信道的核。P15 的唯一性也只属于类概率律；同一最优类质量内的全部非负地址分配都保留，联合输入还可具有不同相位与纠缠。一般情形没有要求 $\mu^*$ 满支撑，也没有给出任意异质参数下最小值的闭式公式或求解算法。上例说明同质情形的均匀地址最优结论不能无条件移用。

深度零时没有路由器，只有一个地址和一个类；单位记录给出 $G=(1)$，归一化输入的 $F=1$。若所有节点都取 $q(v)=1$，所有地址也只有一个类，$G$ 的每个元素均为 $1$，每个地址概率律都在极小纤维内。正深度的全秩条件只要求每个最深层路由器活跃，不要求所有祖先活跃；这里的“活跃”专指环境具有标签分辨能力，并不表示该路由器在每个地址分支都被编程。

本节仍只处理有限实际内部路由器、固定经典数据、完整顺序装载后的一次独立路由器记录及其余理想门。它不扩展到含噪后续门、门噪声、相关记录、重复保持阶段或现实硬件容错，也不赋予无限地址本体和观察者指针的 `MODEL` 诠释以新的物理证明。后文的诠释应继续按其自身前提阅读。
:::

**带符号重叠：从地址轮廓到有序复系数证书。** 前面的 Profiles 用四坐标实记录描述 $q(v)\in[0,1]$ 时的地址分辨。现在保留实际装载标签，改用三坐标复 Fourier 记录，把局部重叠参数的范围扩展到闭区间 $[-1/2,1]$。本段研究这些记录的复线性叠加、真空是否属于其像，以及一份明确递归给出的有序核列表；这需要同时保留两个端点。

沿用 [@def-ch38-profile-routers] 的 $Q=\{W,0,1\}$、首位在前的地址 $A_0=\{()\}$、$A_{n+1}=\operatorname{Bool}\times A_n$，以及内部路由器位置 $I_0=\varnothing$、$I_{n+1}=\{\mathrm{root}\}\sqcup(\operatorname{Bool}\times I_n)$。根为 `none`，子位置为 `some (b,v)`；$b=0,1$ 分别表示假、真，即左、右。这里的 $0,1$ 作为标签时指 $Q$ 中对应的编码标签。

仍令 $L_n=\operatorname{load}(n,n)$，$T$ 为系统配置的树投影，并使用

$$
\lambda_{a,\beta}(v)
=\operatorname{routerLabel}\bigl(n,T(L_n(\operatorname{loading}(n,a,\beta,0))),v\bigr)
=\operatorname{loadedLabel}(n,a,\beta,v).
$$

这是完整顺序装载后的实际路由器标签，路径外的 $W$ 标签也包括在内。实际装载与编程树的对应关系如前；虽然这些标签不依赖外部总线，本段始终保留任意 $\beta\in Q$，包括等待标签 $W$。

::: {.definition #def-ch38-signed-fourier-records title="三坐标 Fourier 记录与复系数空间" lean="D5/S3/Quantum/Routing/HannSignedCertificate.omega D5/S3/Quantum/Routing/HannSignedCertificate.labelIndex D5/S3/Quantum/Routing/HannSignedCertificate.localRecord D5/S3/Quantum/Routing/HannSignedCertificate.Environment D5/S3/Quantum/Routing/HannSignedCertificate.Coeff"}
置 $\omega=\exp(2\pi\mathrm i/3)$，$j(W)=0$、$j(0)=1$、$j(1)=2$，其中指数为整数。对 $r\in[-1/2,1]$、$s\in Q$，定义

$$
f_{r,s}=\left(
\sqrt{\frac{1+2r}{3}},\quad
\sqrt{\frac{1-r}{3}}\,\omega^{j(s)},\quad
\sqrt{\frac{1-r}{3}}\,\omega^{-j(s)}
\right)\in\mathbb C^3.
$$

三个坐标依次由 $\operatorname{Fin}(3)=\{0,1,2\}$ 索引。平方根均为非负实平方根，再嵌入 $\mathbb C$；记录的坐标一般为复数。记

$$
\mathcal F_n=I_n\to\operatorname{Fin}(3),\qquad
\mathcal C_n=A_n\to\mathbb C.
$$

它们分别对应本段的 `Environment n` 与 `Coeff n`。记录空间为 $\mathcal F_n\to\mathbb C$。$\mathcal F_n$ 与前面四坐标记录的环境指标集 $\mathcal E_n$ 分开记号。
:::

::: {.definition #def-ch38-signed-synthesis title="共同赋值的子树限制、实际记录与合成映射" lean="D5/S3/Quantum/Routing/HannSignedCertificate.restrict D5/S3/Quantum/Routing/HannSignedCertificate.childEnvironment D5/S3/Quantum/Routing/HannSignedCertificate.record D5/S3/Quantum/Routing/HannSignedCertificate.vacuumRecord D5/S3/Quantum/Routing/HannSignedCertificate.synthesis D5/S3/Quantum/Routing/HannSignedCertificate.embed"}
固定一个任意异质实赋值 $q:I_n\to\mathbb R$，并要求每个位置都满足 $-1/2\le q(v)\le1$。对任意 $a\in A_n$、$\beta\in Q$、$e\in\mathcal F_n$，定义实际记录、全等待真空记录与复线性合成映射

$$
\begin{aligned}
\widehat R_{n,q,\beta,a}(e)
&=\prod_{v\in I_n}f_{q(v),\lambda_{a,\beta}(v)}(e(v)),\\
V_{n,q}(e)&=\prod_{v\in I_n}f_{q(v),W}(e(v)),\\
(S_{n,q,\beta}x)(e)
&=\sum_{a\in A_n}x(a)\widehat R_{n,q,\beta,a}(e),
\qquad x\in\mathcal C_n.
\end{aligned}
$$

在深度 $n+1$，根参数为 $r=q(\mathrm{root})$；对 $b\in\{0,1\}$，子树参数与环境坐标为

$$
q_b(v)=q(\operatorname{some}(b,v)),\qquad
e_b(v)=e(\operatorname{some}(b,v)).
$$

它们对应 `restrict n q b` 与 `childEnvironment n e b`。每次继续进入子树都再次作这样的限制，故所有前缀上的输入都来自同一个 $q$，没有把不同节点的参数认同，也没有另选子树参数。根、左子树、右子树是下文张量坐标的顺序。

零延拓 $J_b:\mathcal C_n\to\mathcal C_{n+1}$ 定义为

$$
(J_bx)(c,a)=
\begin{cases}x(a),&c=b,\\0,&c\ne b.\end{cases}
$$

深度 $0$ 没有路由器，$A_0$ 与 $\mathcal F_0$ 各有一个元素；所有空乘积为 $1$，所以实际记录与真空记录均为单位函数，$S_{0,q,\beta}x=x(())$。
:::

::: {.definition #def-ch38-signed-recursion title="维数数据、有序核列表与优先真空代表的规定递归" lean="D5/S3/Quantum/Routing/HannSignedCertificate.Output D5/S3/Quantum/Routing/HannSignedCertificate.Output.flag D5/S3/Quantum/Routing/HannSignedCertificate.inherited D5/S3/Quantum/Routing/HannSignedCertificate.step D5/S3/Quantum/Routing/HannSignedCertificate.outputs"}
递归输出 $(d,K,U)$ 对应 `outputs n q`：$d\in\mathbb N$，$K$ 为 $\mathcal C_n$ 中向量的有序列表，$U\in\operatorname{Option}(\mathcal C_n)$。布尔标志 $t$ 严格定义为 $U.\mathrm{isSome}$：$U=\operatorname{Some}(u)$ 时 $t=\mathrm{true}$，$U=\operatorname{None}$ 时 $t=\mathrm{false}$。$U$ 是按规则选出的代表，不预先声称它是唯一原像；此处的列表 $K$ 也不同于前面同质情形的标量核函数。

叶端即深度 $0$ 的输出为

$$
d=1,\qquad K=[],\qquad
U=\operatorname{Some}(\delta_{()}),\qquad t=\mathrm{true},
\qquad \delta_{()}(())=1.
$$

在深度 $n+1$，先对 $q_0,q_1$ 递归，得到 $(d_0,K_0,U_0,t_0)$、$(d_1,K_1,U_1,t_1)$。置

$$
H=\operatorname{map}(J_0,K_0)\mathbin{+\!+}\operatorname{map}(J_1,K_1),
$$

其中 $+\!+$ 表示列表连接：先保留左子列表的原顺序，再保留右子列表的原顺序。根参数 $r=q(\mathrm{root})\in[-1/2,1]$ 决定

$$
d=\begin{cases}
d_0+d_1,&r<1,\\
d_0+d_1-\mathbf 1_{t_0\land t_1},&r=1.
\end{cases}
$$

指标 $\mathbf 1_{t_0\land t_1}$ 在两个子标志都为真时为 $1$，其余为 $0$。这里及下文 $2^n-d$ 的减法均为自然数截断减法：$a-b=\max(a-b,0)$。

有序列表的完整规则为

$$
K=\begin{cases}
H\mathbin{+\!+}[J_0u_0-J_1u_1],
&r=1,\ U_0=\operatorname{Some}(u_0),\ U_1=\operatorname{Some}(u_1),\\
H,&\text{其余情形}.
\end{cases}
$$

即只在上端点且两个子真空代表都存在时，在末尾追加这一条差向量；没有消元、重排、缩放或去重。

代表与标志的全部分支为

$$
\begin{array}{c|c|c}
\text{根参数与子条件}&U&t\\ \hline
r=-1/2,\ U_0=\operatorname{Some}(u_0),\ U_1=\operatorname{Some}(u_1)
&\operatorname{Some}(-J_0u_0-J_1u_1)&\mathrm{true}\\
r=-1/2,\ \text{至少一个子代表不存在}
&\operatorname{None}&\mathrm{false}\\
-1/2<r<1&\operatorname{None}&\mathrm{false}\\
r=1,\ U_0=\operatorname{Some}(u_0)
&\operatorname{Some}(J_0u_0)&\mathrm{true}\\
r=1,\ U_0=\operatorname{None},\ U_1=\operatorname{Some}(u_1)
&\operatorname{Some}(J_1u_1)&\mathrm{true}\\
r=1,\ U_0=U_1=\operatorname{None}
&\operatorname{None}&\mathrm{false}
\end{array}
$$

因此下端点的 $t=t_0\land t_1$，内部的 $t=\mathrm{false}$，上端点的 $t=t_0\lor t_1$。上端点两边均有代表时仍优先选左边；下端点必须保留两个负号。各子输出都有 $d_b>0$，所以上端点实际扣除 $1$ 的分支不会发生下溢。
:::

::: {.definition #def-ch38-signed-gram-orientations title="标准方向与密度方向的复 Gram 矩阵" lean="D5/S3/Quantum/Routing/HannSignedCertificate.recordMatrix D5/S3/Quantum/Routing/HannSignedCertificate.standardGram D5/S3/Quantum/Routing/HannSignedCertificate.densityGram"}
固定 $n,q,\beta$，以下省略记录和映射的这些下标。矩阵 $M$ 的行由环境坐标索引、列由地址索引：$M(e,a)=\widehat R_a(e)$，故 $Mx=Sx$。定义

$$
\begin{aligned}
G^{\mathrm{std}}&=M^{\mathrm H}M,\\
G^{\mathrm{std}}(a,b)&=\sum_{e\in\mathcal F_n}\overline{\widehat R_a(e)}\,\widehat R_b(e),\\
G^{\mathrm{den}}(a,b)&=\sum_{e\in\mathcal F_n}\widehat R_a(e)\,\overline{\widehat R_b(e)}.
\end{aligned}
$$

$M^{\mathrm H}$ 表示共轭转置。这两种方向一般互为逐项共轭；下面用实值局部重叠的乘积证明本情形中它们相等，然后才把标准 Gram 的核与秩结论用于密度方向。
:::

::: {.theorem #thm-ch38-signed-coefficient-event title="实际装载记录的完整带符号系数与 Gram 证书" lean="D5/S3/Quantum/Routing/HannSignedCertificate.signed_event"}
对每个自然数深度 $n\ge0$、每个实赋值 $q:I_n\to\mathbb R$，假设

$$
\forall v\in I_n,\qquad -\frac12\le q(v)\le1.
$$

对每个外部三态总线标签 $\beta\in Q$，取上述实际记录与规定递归的 $(d,K,U,t)$；置 $m=|K|$，$K_i=K.\mathrm{get}(i)$，$i\in\operatorname{Fin}(m)$。以下各项同时成立。

1. 合成像的复维数为 $\dim_{\mathbb C}\operatorname{range}S=d$。
2. 有序核列表的长度为 $|K|=2^n-d$，减法采用上述自然数截断约定。
3. 真空成员关系双向成立：$V_{n,q}\in\operatorname{range}S\ \Longleftrightarrow\ t=\mathrm{true}$。特别地，$t=\mathrm{false}$，亦即 $U=\operatorname{None}$，意味着真空不属于合成像。
4. 对每个 $u\in\mathcal C_n$，若 $U=\operatorname{Some}(u)$，则 $Su=V_{n,q}$。
5. 对每个复系数向量 $x\in\mathcal C_n$，

   $$
   Sx=0\quad\Longleftrightarrow\quad
   \exists!\,\alpha:\operatorname{Fin}(m)\to\mathbb C,\qquad
   x=\sum_{i\in\operatorname{Fin}(m)}\alpha(i)K_i.
   $$

   唯一性针对这份有序列表的全部复系数：任何另一组给出同一展开的系数都逐项等于 $\alpha$。
6. 对所有 $a,b\in A_n$，标准 Gram 元由实际装载标签给出：

   $$
   G^{\mathrm{std}}(a,b)=
   \left(\prod_{v\in I_n}
   \begin{cases}
   1,&\lambda_{a,\beta}(v)=\lambda_{b,\beta}(v),\\
   q(v),&\lambda_{a,\beta}(v)\ne\lambda_{b,\beta}(v)
   \end{cases}\right)\in\mathbb R\subset\mathbb C.
   $$

7. 密度方向与标准方向相等：$G^{\mathrm{den}}=G^{\mathrm{std}}$。
8. 作为作用在地址复系数空间 $\mathcal C_n$ 上的线性映射，$\ker(G^{\mathrm{den}}\cdot)=\ker S$。
9. 密度方向矩阵的复秩为 $\operatorname{rank}_{\mathbb C}G^{\mathrm{den}}=d$。
:::

::: proof
先沿实际树结构归纳，始终使用同一赋值的子树限制。局部 Fourier 恒等式来自 $\omega^3=1$ 与 $1+\omega+\omega^2=0$；特别地，

$$
f_{1,s}=f_{1,W},\qquad
f_{-1/2,W}=-f_{-1/2,0}-f_{-1/2,1}.
$$

在深度 $n+1$，以 $S_b=S_{n,q_b,\beta}$、$V_b=V_{n,q_b}$ 简写。实际装载标签把记录与真空按根、左、右分成

$$
\begin{aligned}
\widehat R_{n+1,q,\beta,(0,a)}
&=f_{r,0}\otimes\widehat R_{n,q_0,\beta,a}\otimes V_1,\\
\widehat R_{n+1,q,\beta,(1,a)}
&=f_{r,1}\otimes V_0\otimes\widehat R_{n,q_1,\beta,a},\\
V_{n+1,q}&=f_{r,W}\otimes V_0\otimes V_1.
\end{aligned}
$$

这里张量等式指相应环境坐标函数的逐点乘积。对 $x_b(a)=x(b,a)$，有 $x=J_0x_0+J_1x_1$，从而

$$
Sx=f_{r,0}\otimes(S_0x_0)\otimes V_1
+f_{r,1}\otimes V_0\otimes(S_1x_1).
$$

真空在整个区间内都非零。具体选取 $e_*(v)=1$ 当 $q(v)=-1/2$，其余取 $e_*(v)=0$；下端点的等待记录在坐标 $1$ 为 $\sqrt{1/2}>0$，其余位置的坐标 $0$ 为 $\sqrt{(1+2q(v))/3}>0$。有限乘积因此非零，深度 $0$ 则为单位空积。这个非零性允许在子树等式中选定非零真空坐标并消去其因子。

为同时处理核与真空，考虑任意 $c\in\mathbb C$ 及方程 $Sx=cV_{n+1,q}$。当 $r<1$ 时，局部方程

$$
f_{r,0}A+f_{r,1}B=f_{r,W}C
$$

的坐标 $1,2$ 强制 $A=B=-C$；若还满足 $r\ne-1/2$，非零的坐标 $0$ 又强制 $C=0$。把此式用于上述张量分解，并在非零子真空坐标上消因子，得到

$$
S_0x_0=-cV_0,\qquad S_1x_1=-cV_1,
\qquad r\ne-1/2\ \Longrightarrow\ c=0.
$$

取 $c=0$，两个子向量都在各自的核内，所以继承列表已涵盖全部核。取 $c=1$，只有下端点可能出现真空原像，而且两个子树都必须有真空原像；归纳假设把这等价为 $t_0\land t_1$。局部下端点恒等式给出反向构造 $-J_0u_0-J_1u_1$。内部 $-1/2<r<1$ 的 $c=1$ 不可能成立，故这里断言的是真空非成员，而非仅仅未选出代表。

当 $r=1$ 时，三个局部记录相同。利用两个子真空的非零性，方程 $Sx=cV_{n+1,q}$ 给出一个共同标量 $z\in\mathbb C$，满足

$$
S_0x_0=zV_0,\qquad S_1x_1=(c-z)V_1.
$$

若某子树没有真空原像，其对应的标量必须为零：否则用该非零标量的逆缩放，就会构造出真空原像。取 $c=1$，两标量之和为 $1$，故至少一棵子树有真空原像；反过来，任一子代表零延拓后都给出父真空。这说明上端点的标志为 $t_0\lor t_1$，并验证优先左边的规定代表。

取 $c=0$。若两边都有代表，则

$$
\begin{aligned}
x={}&J_0(x_0-zu_0)+J_1(x_1+zu_1)\\
&+z(J_0u_0-J_1u_1).
\end{aligned}
$$

前两项来自子核，最后一项正是规定追加的碰撞向量。若至少一边没有代表，相应标量强制 $z=0$，继承列表便已完备。$J_0,J_1$ 各自单射且支撑不相交，故继承保留复线性无关性。两代表存在时，新增差向量不在继承列表的张成中：先取左地址分量再施加 $S_0$，继承列表都给出零，差向量却给出非零的 $V_0$。因此整个规定列表既完备又复线性无关。

叶端直接给出单位代表与空核列表。上述归纳还保持每条列表向量的合成为零、所选代表合成为真空，以及 $d>0$ 和 $|K|+d=2^n$。由 $\dim_{\mathbb C}\mathcal C_n=2^n$、秩—零化度公式及列表的完备性与独立性，得到像维数、列表长度与唯一复系数展开；真空的两个方向和代表方程则已在各分支中得到。这证明前五项。

最后处理共轭方向。对整个闭区间内的 $r$ 及任意 $s,t\in Q$，局部记录满足

$$
\sum_{i\in\operatorname{Fin}(3)}\overline{f_{r,s}(i)}\,f_{r,t}(i)
=\begin{cases}1,&s=t,\\r,&s\ne t.\end{cases}
$$

将有限环境求和与节点乘积展开、交换，便把 $G^{\mathrm{std}}(a,b)$ 写成这些实局部重叠的乘积，得到第六项。因此 $G^{\mathrm{den}}(a,b)=\overline{G^{\mathrm{std}}(a,b)}=G^{\mathrm{std}}(a,b)$；这里使用的是重叠乘积为实数，而不是记录坐标为实数。再以 $G^{\mathrm{std}}=M^{\mathrm H}M$ 和 $M\cdot=S$，应用标准 Gram 的核、秩恒等式，得到最后两项。完整证明由 Lean 内核检查。
:::



深度零也完整落在定理范围内：$d=1$、$K=[]$、$t=\mathrm{true}$，$S$ 是一维恒等映射，$V=1$，两种 Gram 都是 $(1)$、秩为 $1$。第五项此时的系数域为 $\operatorname{Fin}(0)$；唯一的空系数族只展开出零向量，空和为零。对任意更深前缀，把原 $q$ 逐层限制到该子树即可应用同一陈述，无须正深度、同质参数或布尔总线的额外假设。下端点改变真空的成员条件而不追加核向量；上端点只有在两边真空都可合成时才追加一条核向量并扣除一维。

与 Profiles 的衔接只经过重叠：在共同范围 $q(v)\in[0,1]$，前面的四坐标实记录 $\sqrt{q(v)}e_*+\sqrt{1-q(v)}e_s$ 同样有“同标签为 $1$、异标签为 $q(v)$”的局部重叠，故其实际装载记录的 Gram 元与这里相应的实乘积一致。两套记录使用不同环境、不同坐标，不能据此把它们逐坐标认同，也不能把前面的物理输出结论直接延伸到带符号区间。

本定理的核始终是地址复系数合成映射的核。这里没有给出带符号区间的含噪输出或装载后续演化定理、Schur 算子空间的核、Choi 秩、递归的计算效率或硬件性能结论，也没有为后面的本体与观察者诠释增加证明。以下进入 `MODEL` 时，仍须保留这些范围界线。


::: {.theorem #thm-ch38-hann-uniform-original-section title="实际带符号 Hann 记录的原始叶均匀截面与零和证书" lean="D5/S3/Quantum/Routing/HannUniformSection.binary_conformal_kernel D5/S3/Quantum/Routing/HannUniformSection.zero_certificate D5/S3/Quantum/Routing/HannUniformSection.uniform_section"}
固定有限深度 $n$、异质路由参数 $q : \operatorname{Router}(n) \to \mathbb{R}$ 与三能级总线 `bus`，并假设每个路由节点都满足

$$
-\frac12 \le q(v) \le 1.
$$

这里的 `Section n q bus` 精确定义为所有实数 $z$ 的集合：存在一个只定义在原始叶地址 $a\in\operatorname{Address}(n)$ 上的概率分布 $p$，满足 $p(a)\ge0$、$\sum_a p(a)=1$，并且实际 signed Hann 记录的合成为真空记录的实数倍：

$$
\sum_{a\in\operatorname{Address}(n)} (p(a):\mathbb C)\,\operatorname{record}(n,q,\mathrm{bus},a)
= (z:\mathbb C)\,\operatorname{vacuumRecord}(n,q).
$$

则以下结论同时成立。

1. 任意非负且不为零的原始叶坐标核向量，都含有一个叶坐标取 $0/1$、节点坐标取 $0,\pm1$ 的同核证书；非零的叶坐标只出现在原向量的正支撑中，节点坐标保留原节点及根的符号。
2. 若某个上述概率分布 $p$ 使 $z=0$，则存在一个非空的原始叶子子集 $S$，其中每个叶子的概率严格为正，且
   $$
   \sum_{a\in S}\operatorname{record}(n,q,\mathrm{bus},a)=0.
   $$
   这里的零可以是截面的内部点，不要求它是端点。
3. `Section n q bus` 要么为空，要么是一个闭区间 $[l,r]$；两个端点都由原始叶子上的均匀分布达到。也就是说，存在非空有限子集 $S$ 及 $e\in\{-1,0,1\}$，使
   $$
   \sum_{a\in S}\operatorname{record}(n,q,\mathrm{bus},a)=(e:\mathbb C)\,\operatorname{vacuumRecord}(n,q),
   \qquad z=\frac{e}{|S|},
   $$
   且 $1\le |S|\le 2^n$；左右端点可以由不同的子集达到。

这是有限深度的 signed Hann 实数概率模型中的定理。它不把 signed record 解释成物理量子信道，不给出硬件实现、算法复杂度或计算时间结论，也不把任意可行概率分布断言为均匀分布。完整证明由 `trureturing` 的 Lean 内核检查。
:::
对照 [@rem-ch38-qram-page-wootters-literature]，指针与本体存储分离架构立即推演出两条贯通全书的核心**`MODEL`（模型诠释）**结论：

1. **为什么全局阵列是无时间 $P = NP$，而局部指针必须顺着 `ptr++` 逐帧流逝时间？**
   在全局本体存储端，整座 $\bigl\{\lvert\Phi(x)\rangle_{\mathrm{mem}}\bigr\}_{x \in \mathbb{Z}^6}$ 阵列早已跨越所有格点同时铺展就绪，不存在先后次序，呈现顺序无关的 $P = NP$ 式静态全息（这里借用 $P = NP$ 之名，见 §38.4；[第 29 章](ch29-timeless-causality-and-gram-space.md) [@thm-ch29-gram-rigidity-and-pell] 与[第 30 章](ch30-fields-lines-eth-and-navier-stokes.md)）。然而，场内任何一枚物理观察者指针寄存器都受限于有限位宽与有限记忆窗口 $M < \infty$，并面对标准计算模型下未决的有限观察者复杂性防火墙（[@conj-p-neq-np]）。有限位宽的地址总线绝无可能在单周期内把整座宇宙阵列一口吞入缓存，而只能沿着因果历史彼此相容而不退化锁死的地址序列（局部格拉姆椭圆体正定体积背景见[第 29 章](ch29-s03-timeless-gram-causality.md#sec-coda-finite-observer-time-field) [@thm-ch29-gram-rigidity-and-pell]），一步一拍地执行指针自增 `ptr++`。**我们毕生感叹的“时间流逝”，在硬件底层不过是有限指针 `ptr++` 扫过静态全息晶格时的扫描帧率。**

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

[@thm-ch38-copied-address-dereference-and-access-defect] 在 `MODEL` 中一举剥除了“波包神秘坍缩”的形而上学迷雾（它是退相干的一个两比特最小实例，并不解决“为何出现单一结果”的测量问题）：**解引用 `*ptr` 从未在宇宙本体内存里销毁过半点相干信息；所谓“不可逆坍缩”，纯粹是因为局部指针只读取了当前匹配掩码的单一路径，而把其余正交地址分支留在了自身寄存器位宽之外的访问盲区里！**

---
