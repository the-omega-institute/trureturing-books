# P.1 可逆路由与干净查询 {#sec-ch38-s01-s01-routing-and-query}

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

[@thm-ch38-spatial-qutrit-qram-correctness] 验证的是上述**固定经典数据、顺序装载的理想空间三态电路**，不将它在脏配置上的置换等同于附录 A 图 10 的流水线调度，也不把早期架构文献的辅助比特 $f$ 等同于 $W$。它不给出物理哈密顿量、硬件实现、噪声、资源、深度或叠加态总活跃节点数的界，更不复制未知量子态。前述独立布尔网络与一般加法群读出、Page–Wootters 文献机制、2008 年架构的每分支路径计数和观察者—宇宙 `MODEL` 均保留各自边界。
