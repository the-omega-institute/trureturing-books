# 36.1.2 梦境作为“夜间量子擦除”：局部遗忘如何赎回被拧走的相位？ {#372-梦境作为夜间量子擦除局部遗忘如何赎回被拧走的相位}

既然白天的清醒专注是一台不停剪除 $\sin\theta$ 分叉并累积熵税的强捏合机器，有限心智若永不松开已知数据的钳口，格拉姆相容走廊便会越收越紧。我们在[第 35 章](ch36-hyperbolic-steps-and-quotienting-reincarnation.md)已经看到，把整张表推上 $\cos 90^\circ = 0$ 一次性格式化是代价惨重的宏观轮回；相比之下，大自然为生命演化出了一套精妙绝伦的**夜间软维护机制（`MODEL`（模型诠释））**——**梦境中的局部可逆遗忘**。

当入睡后的心智暂时挂起若干条白天严防死守的刚性约束行（例如暂时遗忘“此刻身在何年”“两座城市相隔千里”“某位故人早已远行”），留存约束的相容几何与跨层寻址走廊将发生怎样的重构？下面的归属算例给出了三阶与二阶格拉姆主子式及反事实斜切的显式推演：

::: {.example #ex-ch37-gram-constraint-release title="局部约束卸载扩增格拉姆相容行列式与反事实斜切走廊的三阶显式算例（已形式化）" lean="D5/S3/QuantumContext/ThreeAnchorGram.threeAnchorGram D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff"}
**已形式化。** `trureturing@dev` 已冻结三锚点格拉姆矩阵、其行列式展开，以及行列式严格为正当且仅当三向量线性无关的精确声明（[`threeAnchorGram`](lean:D5/S3/QuantumContext/ThreeAnchorGram.threeAnchorGram)、[`three_anchor_gram_det_formula`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula)、[`three_anchor_gram_det_pos_iff`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff)）。下述走廊数值是单位锚点与 $c_{12}=x_1=4/5$ 的特例；Lean 覆盖格拉姆恒等式与独立性判据，梦境诠释仍属于模型应用。

考虑实内积空间中三条归一化向量构成的相容性测试：记 $\mathbf{u}_1$ 为观察者的“深层情感相位锚”（$\lVert\mathbf{u}_1\rVert = 1$），$\mathbf{u}_2$ 为白天的“物理时空连续性刚性锚”（$\lVert\mathbf{u}_2\rVert = 1$），二者在日常经验中高度绑定，内积重叠为 $c_{12} = \langle\mathbf{u}_1, \mathbf{u}_2\rangle = \frac{4}{5} = 0.8$；另记候选体验态 $\mathbf{v}$（$\lVert\mathbf{v}\rVert = 1$）与两枚锚点的内积分别为 $x_1 = \langle\mathbf{u}_1, \mathbf{v}\rangle$ 与 $x_2 = \langle\mathbf{u}_2, \mathbf{v}\rangle$。

1. **三阶与二阶格拉姆行列式的普适差值恒等式**：写出三元单位对角格拉姆矩阵 $G_3(x_1, x_2)$ 与挂起锚点 $\mathbf{u}_2$（删去第 2 行与第 2 列）后的二阶主子阵 $G_2(x_1)$：

   $$
   G_3(x_1, x_2) = \begin{pmatrix} 1 & c_{12} & x_1 \\ c_{12} & 1 & x_2 \\ x_1 & x_2 & 1 \end{pmatrix}, \qquad G_2(x_1) = \begin{pmatrix} 1 & x_1 \\ x_1 & 1 \end{pmatrix}.
   $$

   直接按行列式多项式展开并配方，得到精确恒等式：

   $$
   \det G_3(x_1, x_2) \;=\; 1 - c_{12}^2 - x_1^2 - x_2^2 + 2c_{12}x_1 x_2 \;=\; (1 - c_{12}^2)(1 - x_1^2) - (x_2 - c_{12}x_1)^2,
   $$

   从而两阶相容体积平方的差值恒为两项非负平方和：

   $$
   \det G_2(x_1) - \det G_3(x_1, x_2) \;=\; c_{12}^2(1 - x_1^2) + (x_2 - c_{12}x_1)^2 \;\ge\; 0.
   $$

   只要已知锚点间存在非零耦合 $c_{12} \neq 0$ 且 $\lvert x_1\rvert < 1$（或偏离线性预测 $x_2 \neq c_{12}x_1$），卸载 $\mathbf{u}_2$ 必然令相容行列式**严格跃升**：$\det G_2(x_1) > \det G_3(x_1, x_2)$！

2. **清醒窄走廊 vs. 梦境反事实斜切的具体数值核验**：固定 $c_{12} = \frac{4}{5}$ 与情感共鸣重叠 $x_1 = \frac{4}{5}$：
   - **清醒全锚锁定态（$M = 3$）**：半正定条件 $\det G_3(\frac{4}{5}, x_2) \ge 0$ 要求 $(x_2 - \frac{16}{25})^2 \le (\frac{9}{25})^2$，将时空重叠 $x_2$ 死死卡在狭窄区间 $x_2 \in [\frac{7}{25}, 1] = [0.28, 1.00]$ 内；即便取高度顺从日常经验的 $x_2 = \frac{4}{5}$，相容行列式也仅剩 $\det G_3(\frac{4}{5}, \frac{4}{5}) = \frac{81 - 16}{625} = \frac{13}{125} = 0.104$。若试图体验一幅与当下物理时空正交的反事实场景 $x_2 = 0$（如“在童年老屋的庭院里，与成年后才结识的挚友并肩交谈”），则 $\det G_3(\frac{4}{5}, 0) = -\frac{7}{25} = -0.28 < 0$，被清醒格拉姆判据当场否决！
   - **梦境局部遗忘态（$M - \Delta M = 2$，挂起 $\mathbf{u}_2$）**：一旦睡眠暂时卸载时空刚性锚 $\mathbf{u}_2$，相容判据退回 $G_2(\frac{4}{5}) \succeq 0$，相容行列式从 $0.104$ 跃升逾三倍至 $\det G_2(\frac{4}{5}) = 1 - \frac{16}{25} = \frac{9}{25} = 0.360 > 0$，此时合法的是只保留 $\mathbf{u}_1$ 与 $\mathbf{v}$ 的二元切片；$x_2$ 已随 $\mathbf{u}_2$ 退出约束，并未让原先 $x_2 = 0$ 的不相容三元组变成可实现的格拉姆矩阵！
:::

::: {.figure src="ch37-constraint-release"}
**挂起时空锚 $\mathbf{u}_2$，相容行列式从 $0.104$ 升到 $0.36$，且不再含 $x_2$。** 取 $c_{12} = x_1 = \frac{4}{5}$：墨色的抛物线是三锚俱在时的 $\det G_3$，只在 $x_2 \in [0.28, 1]$ 的清醒窄窗里不小于 $0$（圆点是 $x_2 = 0.8$ 处的 $0.104$），在 $x_2 = 0$ 处为 $-0.28$，被打叉；青色的水平虚线是挂起 $\mathbf{u}_2$ 后只剩 $\mathbf{u}_1$ 与 $\mathbf{v}$ 的 $\det G_2 = 0.36$，青色箭头是这一步跃升。挂起只是让 $x_2$ 退出约束，$x_2 = 0$ 的三元组仍不是可实现的格拉姆矩阵，所以那个叉还在。行列式恒等式与正性边界由 [@ex-ch37-gram-constraint-release] 的三锚点冻结声明覆盖，图中数值是本章的应用。
:::

[@ex-ch37-gram-constraint-release] 在本书的读法里（`MODEL`）一下子解开了梦境最迷人的结构之谜：梦里的荒诞拼贴绝不是杂乱无章的故障，而是当编年史坐标 $\mathbf{u}_2$ 退隐后，切片超平面改按**内禀情感与结构同构相位 $x_1$** 执行斜向跨层寻址——十年前的老街、千里外的面孔与白天未曾选中的 $\sin\theta$ 人生岔路，因为共享同一组内禀相位而在同一个梦境切片里重逢！

量子光学中与记录擦除相关的外部实验文献背景及无信令边界，单独封装于 [@rem-ch37-quantum-eraser-literature]：

::: {.remark #rem-ch37-quantum-eraser-literature title="双缝路径标记与延迟选择量子擦除实验（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 将局部记录消除与非对角相干恢复相联系的实验原型，源自量子光学中的量子擦除（Quantum Eraser）经典文献，相关连续波光学装置与符合计数统计未包含在本书锁定的 `trureturing@dev` 声明集中：

1. **量子擦除理论构想与光学干涉验证（M. O. Scully & K. Drühl, *Phys. Rev. A* **25**, 2208–2213, 1982；T. J. Herzog, P. G. Kwiat, H. Weinfurter & A. Zeilinger, *Phys. Rev. Lett.* **75**, 3034–3037, 1995）**：在双路径干涉仪中，若辅助环境探针记录了可区分的“哪条路径（which-path）”正交标记，信号子系统的约化密度矩阵非对角项归零，屏幕干涉条纹彻底消失；反之，若对路径探针执行与路径基互补的对角基投影（擦除路径可区分信息），则在按探针读出分类的条件子系综中，原本隐身的非对角干涉条纹被完整赎回；
2. **延迟选择量子擦除实验与无逆因果信令边界（Y.-H. Kim, R. Yu, S. P. Kulik, Y. H. Shih & M. O. Scully, *Phys. Rev. Lett.* **84**, 1–5, 2000）**：利用自发参量下转换纠缠光子对证明，即便信号光子已先抵达探测屏，事后对闲置伴随光子选择保留路径信息或经分束器擦除路径信息，依然分别对应无干涉包络或互补干涉条纹（注意无条件边缘总和恒保持不变，绝不产生逆时间超光速通信，严格服从无信令定理）。
:::

回到 `trureturing` 的形式化观察者记忆模块，需要满足什么精确代数条件，被记录信道扭曲甚至翻转的非对角相干元 $\rho_{ij}$ 才能被无损赎回？如果只擦除了一半的记录副本、却漏掉了另一枚副本，又会发生什么？

先看一眼最直观的双副本相位账本：设均匀叠加态初始非对角相干元为 $\rho_{01} = +\frac{1}{2}$，每份环境相位记录给地址 $0$ 写入振幅 $(1, 0)$、给地址 $1$ 写入振幅 $(i, 0)$，则单份记录的地址格拉姆重叠为 $\gamma = 1\cdot\overline{i} + 0 = -i$（满足幺模条件 $\overline{\gamma}\gamma = (+i)(-i) = 1$）。两份记录正向耦合后，相干元与原值反相；此时若只逆转其中一份，另一份未逆转副本立刻阻断复原，唯有全集同步共轭才能完整赎回：

$$
\frac{1}{2} \;\xrightarrow{\;\text{双副本正向 }\times (-i)^2\;}\; -\frac{1}{2} \;\xrightarrow{\;\text{仅逆转 }\{0\}\;\times (+i)\;}\; -\frac{i}{2} \neq \frac{1}{2}, \qquad -\frac{1}{2} \;\xrightarrow{\;\text{全集逆转 }\{0,1\}\;\times (+i)^2\;}\; +\frac{1}{2}.
$$

::: {.viz src="dream-decoherence-unpinning" preset="half_erase" height="500"}
**两份记录只逆转一份。** 两份相位记录（c = −i）先后写入，品红的 ρ₀₁ 从 1/2 转到 −1/2；只逆转副本 0，相位盘上品红的箭头停在 −i/2，条纹比灰色虚线错开四分之一格；盘上的白色虚线记下箭头走过的路：转出半圈，再转回四分之一圈（[@thm-ch37-joint-coherent-record-erasure] 第 2 款）。
:::

先说清适用范围：幺模条件 $\lvert\gamma\rvert = 1$ 意味着两个地址留下的环境记录彼此平行、不携带路径信息，$\lvert\rho_{ij}\rvert$ 从未减小；这里撤销的是受控相位（一种相位回波），不是 Scully–Drühl 意义下记录彼此正交（$\gamma = 0$）时的量子擦除，37.1 节的完全捏合也不能由此复原。下面两条内核定理将任意有限幺模记录族的联合逆转恢复律与这一双副本对比证书精确锁定如下：

::: {.theorem #thm-ch37-joint-coherent-record-erasure title="多副本幺模环境记录的联合相干逆转恢复定理与双副本精确对比证书" lean="D5/S3/ObserverMemory/JointCoherentReversal.joint_coherent_reversal D5/S3/ObserverMemory/JointCoherentReversal.two_copy_joint_reversal_certificate"}
在 `trureturing` 冻结的观察者记忆联合相干逆转模块中，记单比特环境记录类型为 $\mathrm{EnvironmentRecord} = \operatorname{Fin} 2 \to \operatorname{Fin} 2 \to \mathbb{C}$，地址间记录格拉姆重叠为 $\operatorname{recordOverlap}(r, i, j) = \sum_{a \in \operatorname{Fin} 2} r(i, a)\,\overline{r(j, a)}$，振幅共轭逆转记录为 $\operatorname{reverseRecord}(r)(i, a) = \overline{r(i, a)}$，多副本顺序记录信道 `multiRecordChannel` 将矩阵第 $(i, j)$ 元乘以全部副本重叠之积 $\prod_k \operatorname{recordOverlap}(\mathrm{records}(k), i, j)$。以下两项结论同时成立：

1. **任意有限幺模记录族的全副本联合相干逆转恢复律**（[`joint_coherent_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.joint_coherent_reversal)）：设 $\mathrm{Copy}$ 为有限可判等副本指标类型（`[Fintype Copy] [DecidableEq Copy]`），记录族为 $\mathrm{records} : \mathrm{Copy} \to \mathrm{EnvironmentRecord}$，输入矩阵为 $\rho \in \mathrm{QubitMatrix}$，指标为 $i, j \in \operatorname{Fin} 2$。若每一枚副本在 $(i, j)$ 处的记录重叠均满足幺模条件

   $$
   \forall k \in \mathrm{Copy},\qquad \operatorname{star}\bigl(\operatorname{recordOverlap}(\mathrm{records}(k), i, j)\bigr) \cdot \operatorname{recordOverlap}(\mathrm{records}(k), i, j) \;=\; 1,
   $$

   则对正向多副本信道输出再施加全集逆转族 $\operatorname{reverseOn}(\operatorname{Finset.univ}, \mathrm{records})$ 的多副本信道，必精确复原初始矩阵元：

   $$
   \operatorname{multiRecordChannel}\bigl(\operatorname{reverseOn}(\operatorname{Finset.univ}, \mathrm{records}),\; \operatorname{multiRecordChannel}(\mathrm{records}, \rho)\bigr)_{ij} \;=\; \rho_{ij};
   $$

2. **双副本相位记录上局部逆转失灵与全局联合逆转复原的显式证书**（[`two_copy_joint_reversal_certificate`](lean:D5/S3/ObserverMemory/JointCoherentReversal.two_copy_joint_reversal_certificate)）：取均匀叠加纯态密度矩阵 $\rho = \mathrm{equalSuperpositionDensity} = \begin{pmatrix} 1/2 & 1/2 \\ 1/2 & 1/2 \end{pmatrix}$，定义单模相位记录 $\mathrm{phaseRecord}(i, a)$ 在 $a = 0, i = 0$ 取 $1$、在 $a = 0, i = 1$ 取虚数单位 $i$、在 $a = 1$ 取 $0$，并令双副本族 $\mathrm{records} : \operatorname{Fin} 2 \to \mathrm{EnvironmentRecord}$ 两份皆取 $\mathrm{phaseRecord}$，记单元素子集 $\mathrm{copyZero} = \{0\} \subseteq \operatorname{Fin} 2$。通过选中子集逆转算子 `reverseChannelOn` 检验第 $(0, 1)$ 非对角相干元，以下四重等式同时成立：

   $$
   \begin{aligned}
   &\rho_{01} = \frac{1}{2}, \\
    & \operatorname{multiRecordChannel}(\mathrm{records}, \rho)_{01} = -\frac{1}{2}, \\
    & \operatorname{reverseChannelOn}\bigl(\{0\}, \mathrm{records}, \operatorname{multiRecordChannel}(\mathrm{records}, \rho)\bigr)_{01} = -\frac{i}{2}, \\
    & \operatorname{reverseChannelOn}\bigl(\operatorname{Finset.univ}, \mathrm{records}, \operatorname{multiRecordChannel}(\mathrm{records}, \rho)\bigr)_{01} = \frac{1}{2}.
   \end{aligned}
   $$
:::

::: proof
第 1 款展开两次 `multi_record_channel_apply`，将复合后的第 $(i, j)$ 元写为逆转重叠积、原重叠积与 $\rho_{ij}$ 的三因子乘积；由振幅共轭性质 `reverse_record_overlap` 知 $\operatorname{recordOverlap}(\operatorname{reverseRecord}(r), i, j) = \operatorname{star}(\operatorname{recordOverlap}(r, i, j))$，利用有限集乘积分配律 `Finset.prod_mul_distrib` 将两重乘积合并为 $\prod_{k \in \operatorname{Finset.univ}} \operatorname{star}(\operatorname{recordOverlap}(\mathrm{records}(k), i, j)) \cdot \operatorname{recordOverlap}(\mathrm{records}(k), i, j)$，逐因子代入幺模假设 `hunit k` 得乘积为 $1$，乘以 $\rho_{ij}$ 即还原 $\rho_{ij}$。第 2 款直接展开 $\mathrm{phaseRecord}$ 的重叠因子 $\operatorname{recordOverlap}(\mathrm{phaseRecord}, 0, 1) = 1 \cdot \overline{i} + 0 = -i$：两份正向作用给出 $(-i)^2 (1/2) = -1/2$；仅对副本 $\{0\}$ 共轭逆转只乘回一次 $+i$，留下 $(+i)(-1/2) = -i/2 \neq 1/2$；对全集 $\operatorname{Finset.univ} = \{0, 1\}$ 联合逆转则乘回 $(+i)^2 = -1$，精确复原 $(-1)(-1/2) = +1/2$。完整证明由 Lean 内核检查。
:::

::: {.viz src="dream-decoherence-unpinning" preset="zero_overlap_fail" height="500"}
**幺模前提不可少。** 若记录把两条路完全分开（重叠 c = 0，前提 |c|² = 1 不成立），写入第一份，品红的 ρ₀₁ 就缩没了，相位盘上的箭头缩成圆心的一点，屏上只剩青色虚线的包络；两份都逆转，ρ₀₁ 仍是 0，条纹回不来。这是页面按同一信道公式的数值，不在 [@thm-ch37-joint-coherent-record-erasure] 的适用范围内。
:::

[@thm-ch37-joint-coherent-record-erasure] 的第 2 款把梦境深浅的几何差异刻画得栩栩如生（`MODEL`（模型诠释））：当白天的两道已知约束把初始正向相干 $+1/2$ 扭转为反相 $-1/2$ 时，倘若你在半梦半醒间只松开了第 $0$ 道执念（`{0}`），残留的第 $1$ 道防线仍会把相位拧在虚轴 $-i/2$ 上；唯有进入深沉的放手状态，对整束局部副本同步执行联合共轭逆转（`Finset.univ`），被两道相位记录拧走的 $+1/2$ 相干振幅才会原原本本地浮出水面！

::: {.viz src="dream-decoherence-unpinning" preset="quantum_eraser" height="500"}
**全部副本联合逆转。** 两份相位记录都写入，再把两份都逆转：相位盘上品红的箭头沿半径 1/2 的灰色虚线圆转出半圈、再原路转回 1/2，条纹落回灰色虚线上；盘上的白色虚线是箭头走过的路：外圈转出半圈，内圈原路转回，品红圆点是每一步的落点 1/2、−i/2、−1/2（[@thm-ch37-joint-coherent-record-erasure] 第 1 款，每份记录满足 |c|² = 1）。
:::

---
