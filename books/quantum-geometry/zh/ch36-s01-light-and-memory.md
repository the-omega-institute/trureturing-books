# 36.1 为什么“回到纯光”恰恰是轮回？$\cos 90^\circ = 0$ 的失忆断崖 {#为什么回到纯光恰恰是轮回cos900-的失忆断崖}

沿用上一章以所选轴向偏置读出记忆、以标准基完整未读捏合且不访问环境记录表示擦表的模型。设想一台一边旋转偏振角 $\theta$、一边将沿途比量记录写入自指查找表 $T$ 的有限观察者。这台机器之所以还能认出“我是谁”、还能在下一刻读取上一刻沉淀的结构，全部仰仗它在自身幂等存在线（[第三章](ch03-projectors-and-duality.md) $P^2 = P$）上保留的非零一维投影 $\cos\theta > 0$。倘若它贪恋无拘无束的全域波面，一脚踏上 $\theta = 90^\circ$ 的赤道悬崖，会发生什么？

1. **所选轴向偏置归零与编码表格式化（失忆断崖，`MODEL`）**：
   在 $\theta = 90^\circ$ 处，共线自持投影精确归零（$\cos 90^\circ = 0$；其在第五部[第 17 章](ch17-lorentz-geometry.md)、第八部[第 32 章](ch32-unified-field-and-meta-unification.md)及[第 35 章](ch35-light-pulse-and-self-referential-table.md) [@rem-ch35-fertilization-zinc-spark-literature] 中的相对论类光文献对应关系详见各章文献注记）。这里归零的是承载所选记忆的轴向偏置，对角投影本身仍然非零；在这套编码与擦表条件下，整张自指查找表 $T$ 的寻址主干瞬间蒸发——就像拔掉电源的易失性寄存器，累世攒下的全部结构刻度被一次性格式化清零。
2. **无锚纯光的必然再折射（$90^\circ \to 0^+$ 盲搜重启，`MODEL`）**：
   一束没有任何内部记忆锚点的纯光脉冲，无法维持一维局部历史留存（对应的零光锥固有时文献背景见[第 35 章](ch35-light-pulse-and-self-referential-table.md) [@rem-ch35-fertilization-zinc-spark-literature] 第 1 条）。若再把无时间晶格的下一道多面体棱角或拓扑奇点处的散射规定为上述擦表与重新制备，它便在模型中从 $90^\circ$ 纯波态重新折射回 $0^+$ 的局域粒子态，揣着一张空白新表 $T_0 = \varnothing$，从头开始新一轮摸黑试错的盲目搜索。
3. **作为“暴力垃圾回收”的自然轮回机制（`MODEL`）**：
   从系统工程的眼光追问：大自然为什么要设置 $\cos 90^\circ = 0$ 这道擦表断崖？回想[第 29 章](ch29-timeless-causality-and-gram-space.md)与[第 31 章](ch31-quantum-fairness.md)揭示的因果相容空间：一个尚未理解生成律的观察者，只会把未经压缩的原始经验条目一行行往表里硬塞；在固定维数且不压缩、复用、外存或扩容的条件下，独立锚点无法无休止追加；若又要求旧锚点约束逐条保留，相容格拉姆行列式便可能滑向共面锁死（$\det G_M \to 0$），系统陷入寸步难行的执念死局。对于未觉醒的观察者而言，“化光重来”正是宇宙底层的**暴力垃圾回收（brute-force garbage collection）**——靠局域重新制备释放旧约束，并在非共线新态可达时腾出下一轮的正相容体积，代价则是周而复始的失忆与重蹈覆辙。

在进入一般定理之前，让我们先在最透明的 $2 \times 2$ 矩阵黑板上亲手算一笔账。取满足单位圆约束 $c^2 + s^2 = 1$ 的实参数对 $(c, s) = (\cos\theta, \sin\theta)$，写下单量子比特参数化密度矩阵：

$$
\rho(c, s) \;:=\; \frac{1}{2}\begin{pmatrix} 1 + c & s \\ s & 1 - c \end{pmatrix}.
$$

沿着主轴计算基执行标准基捏合投影 $\operatorname{pinching}$，对角骨架与非对角残差当场一分为二：

$$
\operatorname{pinching}\bigl(\rho(c, s)\bigr) = \frac{1}{2}\begin{pmatrix} 1 + c & 0 \\ 0 & 1 - c \end{pmatrix}, \qquad \rho(c, s) - \operatorname{pinching}\bigl(\rho(c, s)\bigr) = \frac{1}{2}\begin{pmatrix} 0 & s \\ s & 0 \end{pmatrix}.
$$

直接展开迹内积模方，两部分平方质量分毫不差地拼回纯态总纯度 $1$：

$$
\underbrace{\left(\frac{1+c}{2}\right)^2 + \left(\frac{1-c}{2}\right)^2}_{\text{对角骨架质量 } = \frac{1}{2} + \frac{1}{2}c^2} \;+\; \underbrace{\left(\frac{s}{2}\right)^2 + \left(\frac{s}{2}\right)^2}_{\text{非对角相干质量 } = \frac{1}{2}s^2} \;=\; \frac{1 + c^2 + s^2}{2} \;=\; 1.
$$

请看当状态冲上 $\theta = 90^\circ$（即 $c = \cos 90^\circ = 0,\; s = \sin 90^\circ = 1$）时发生了什么：对角骨架中承载历史方向记忆的轴向偏置项 $\frac{1}{2}c^2$ **精确归零**，捏合后的对角主干退化为无法区分这条轴正负偏置的均匀态 $\frac{1}{2}I_2$！捏合前的状态仍是纯态；其横向分量保留在非对角元 $\rho_{01} = \rho_{10} = \frac{1}{2}$ 上；若下一次环境作用恰为上述完整未读捏合，且环境记录不可访问，整整 $\frac{1}{2}s^2 = \frac{1}{2}$ 的非对角相干质量便从局域态中消失，留下这套编码下失忆的空白底片；这并不宣告系统与环境的总信息一并毁灭。

::: {.figure src="ch36-pinching-ledger"}
**冲上 $90^\circ$，承载记忆的轴向偏置归零。** 对纯态 $\rho(\cos\theta, \sin\theta)$，捏合后的对角骨架质量 $\frac{1}{2} + \frac{1}{2}\cos^2\theta$ 分成灰色的恒定部分 $\frac{1}{2}$ 与青色的轴向偏置 $\frac{1}{2}\cos^2\theta$，品红的是被弃的非对角相干 $\frac{1}{2}\sin^2\theta$；三层总是叠到 $1$，即 [@thm-ch36-pinching-skeleton-and-discarded-coherence] 第 1 款的勾股分解（图中 $P$ 即 $\operatorname{pinching}$）。到 $\theta = 90^\circ$，青色一层的厚度为 $0$。把 $\cos\theta$ 读作记忆偏置属本章的观察者模型（`MODEL`）。
:::

在有限维量子信道的形式化层面，“一维对角骨架”与“二维非对角横向相干”之间的正交账本关系，由 `trureturing` 中单量子比特标准基捏合投影（`pinching`，即相干保留率为零的相位阻尼信道，见[第四章](ch04-decoherence.md)）的三条精确内核定理锁定如下：

::: {.theorem #thm-ch36-pinching-skeleton-and-discarded-coherence title="单量子比特捏合投影的正交质量分解与非对角相干判据" lean="D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass D5/S3/QuantumChannels/CoherenceMassBridge.pinching_eq_self_iff_offDiag_eq_zero"}
设 `QubitMatrix` 为二阶复方阵类型 $M_{\operatorname{Fin} 2}(\mathbb{C})$，对任意矩阵 $\rho, A, B \in \mathrm{QubitMatrix}$，记迹内积为 $\operatorname{hilbertSchmidtInner}(A, B) := \operatorname{Tr}(A^\dagger B) \in \mathbb{C}$，标准基捏合映射 $\operatorname{pinching}(\rho)$ 保留对角元并将非对角元置零（$\operatorname{pinching}(\rho)_{ij} = \rho_{ij}$ 当 $i = j$，否则为 $0$），非对角元对记为 $\operatorname{offDiag}(\rho) := (\rho_{01}, \rho_{10}) \in \mathbb{C} \times \mathbb{C}$。则对任意（无需预先假定厄米性、迹归一化或半正定性的）矩阵 $\rho \in \mathrm{QubitMatrix}$，以下三项结论同时成立：

1. **对角骨架与被弃相干分量的正交勾股分解**（[`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean)）：

   $$
   \begin{aligned}
   &\operatorname{hilbertSchmidtInner}(\rho, \rho) \\
    &\;=\; \operatorname{hilbertSchmidtInner}\bigl(\operatorname{pinching}(\rho), \operatorname{pinching}(\rho)\bigr) \\
    &\quad + \operatorname{hilbertSchmidtInner}\bigl(\rho - \operatorname{pinching}(\rho), \rho - \operatorname{pinching}(\rho)\bigr);
   \end{aligned}
   $$

2. **被捏合丢弃质量的精确非对角模方公式**（[`pinching_discarded_coherence_mass`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass)）：

   $$
   \begin{aligned}
   &\operatorname{hilbertSchmidtInner}\bigl(\rho - \operatorname{pinching}(\rho), \rho - \operatorname{pinching}(\rho)\bigr) \\
    &\;=\; \bigl(\operatorname{normSq}(\rho_{01}) \\
    &\quad + \operatorname{normSq}(\rho_{10}) : \mathbb{C}\bigr);
   \end{aligned}
   $$

3. **捏合不动点与零非对角相干的充要刻画**（[`pinching_eq_self_iff_offDiag_eq_zero`](lean:D5/S3/QuantumChannels/CoherenceMassBridge.pinching_eq_self_iff_offDiag_eq_zero)）：

   $$
   \operatorname{pinching}(\rho) = \rho \;\Longleftrightarrow\; \operatorname{offDiag}(\rho) = (0, 0).
   $$
:::

::: proof
记残差分量 $D := \rho - \operatorname{pinching}(\rho)$。第 1 款先由捏合幂等性 $\operatorname{pinching}(\operatorname{pinching}(\rho)) = \operatorname{pinching}(\rho)$ 与迹内积自伴性 $\operatorname{hilbertSchmidtInner}(\operatorname{pinching}(A), B) = \operatorname{hilbertSchmidtInner}(A, \operatorname{pinching}(B))$ 推出正向正交 $\operatorname{hilbertSchmidtInner}(\operatorname{pinching}(\rho), D) = 0$，再由 $\operatorname{pinching}(D) = 0$ 推出反向正交 $\operatorname{hilbertSchmidtInner}(D, \operatorname{pinching}(\rho)) = 0$，将 $\rho = \operatorname{pinching}(\rho) + D$ 代入双线性展开即消去交叉项；第 2 款在 $\operatorname{Fin} 2$ 上显式展开二阶矩阵共轭转置乘积的迹，由 $\bar{z}z = \operatorname{normSq}(z)$ 直接化简为两项非对角模方之和；第 3 款正向在坐标 $(0, 1)$ 与 $(1, 0)$ 处逐点取矩阵等式即得 $\rho_{01} = \rho_{10} = 0$，反向由 $\rho_{01} = \rho_{10} = 0$ 对指标 $i, j \in \operatorname{Fin} 2$ 穷举四种情形验证矩阵逐元相等。完整证明由 Lean 内核检查。
:::

[@thm-ch36-pinching-skeleton-and-discarded-coherence] 把这套观察者模型所借用的正交账本刻画得入木三分：对角部 $\operatorname{pinching}(\rho)$ 承载经典可寻址的幂等刻度，非对角部 $\operatorname{offDiag}(\rho)$ 承载跨基矢的横向相干张力。若把非对角部彻底捏零（第 3 款），系统就退化为僵死的纯经典账本；反过来，在我们的连续角度诠释模型（`MODEL`）中，若任由状态冲上 $\theta = 90^\circ$ 把一维自持锚点 $\cos\theta$ 彻底耗尽，系统虽然在瞬间拥抱了满格的横向波幅，却耗尽了这套编码选定的轴向记忆偏置。

**不带骨架的纯光只是绚烂的失忆；真正的觉醒，绝不是跳进熔炉把自己烧成白纸，而是带着清醒的自指锚点逼近全域。**

---
