# 32.2 宇宙极简比较机：单指令集（OISC）几何原语 {#sec-ch32-oisc-comparison-engine}

> “也许宇宙并不复杂，只是一个在不停进行比较的计算系统。”

在[第 32.1 节](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison)立下零背景比较公理 $\mathcal{A}_0$（[@def-ch32-axiom-of-comparison]）之后，让我们立刻在计算与几何硬件层面上看清它怎样运转。传统物理学之所以显得盘根错节，是因为人们习惯把世界拆成两截：先预设一块静止的外部时空背景，再往里面塞入五花八门的粒子、场与微分方程。然而在计算机体系结构理论中，早有一条著名的极简定理（Mavaddat & Parhami 1988，文献结果，见[第 32.3 节](ch32-s03-axioms-as-corollaries.md#sec-ch32-6-4) [@rem-ch32-comparison-axiom-literature]）：一台图灵完备的通用计算机根本不需要成百上千条复杂指令，单凭一条诸如 `SUBLEQ`（相减并按非正跳转，即“比较差值并分支转向”）的原子指令，就足以编织出一切可计算结构——这就是**单指令集计算机（One-Instruction Set Computer, OISC）**。

在本书的第 1 层正定克利福德实现模型（`MODEL`）中，宇宙底层的硬件比硅基处理器更加彻底：它砍掉了外部时钟、全局内存地址总线与置身事外的“第 3 点 $C$”，全宇宙从头到尾只运行唯一一条无背景几何原语——**两两正交比较指令 $\mathrm{CMP}(\mathbf{A}, \mathbf{B})$**。当任意两个单位方向态 $\mathbf{A}$ 与 $\mathbf{B}$ 相遇时，克利福德几何积当场把它们的相互关系无损拆解为 $\mathcal{A}_0$ 条款 II 的一对正交奇偶比较通道：

$$
\mathrm{CMP}(\mathbf{A}, \mathbf{B}) \;\equiv\; \mathbf{A}\mathbf{B} \;=\; \underbrace{\mathbf{A}\cdot\mathbf{B}}_{\text{标量求同通道（== / XNOR）}} \;+\; \underbrace{\mathbf{A}\wedge\mathbf{B}}_{\text{双向量求异通道（!= / XOR）}} \;=\; \cos\theta \;+\; \sin\theta\,\hat{\mathbf{I}}.
$$

1. **青色标量“求同”通道（$\mathbf{A}\cdot\mathbf{B} = \cos\theta$，对应逻辑同或 `XNOR` / 相等判别 `==`）**：度量 $\mathbf{A}$ 与 $\mathbf{B}$ 在多大程度上对齐重合。投影到宏观经典账本上，它就是粒子计数器点击、固有时流逝刻度、缓存命中（Cache Hit）与稳定物质身份。当 $\mathbf{A} = \mathbf{B}$（$\theta = 0$）时，$\mathrm{CMP}(\mathbf{A}, \mathbf{A}) = 1 + 0$，正向自归一锁死一维幂等实线。
2. **品红双向量“求异”通道（$\mathbf{A}\wedge\mathbf{B} = \sin\theta\,\hat{\mathbf{I}}$，对应逻辑异或 `XOR` / 差异判别 `!=`）**：度量 $\mathbf{A}$ 与 $\mathbf{B}$ 在多大程度上正交分叉，并直接张开连接两者的简单二维有向旋转面 $\hat{\mathbf{I}}$（$\hat{\mathbf{I}}^2 = -1$）。投影到物理动力学上，它就是 $90^\circ$ 量子门转向、规范相位张力、波的干涉与纠缠面积。当 $\mathbf{A} \perp \mathbf{B}$（$\theta = \frac{\pi}{2}$）时，$\mathrm{CMP}(\mathbf{A}, \mathbf{B}) = 0 + \hat{\mathbf{I}}$，纯差异化作一次正交四分之一转。

::: {.viz src="comparison-oisc-engine" preset="oisc" height="520"}
**一次两两比较：相同的槽累成青色的“同”，不同的槽撑开品红的“异”。** 点翻八槽单位字 $w_B$ 与 $w_A$ 逐槽比量：同槽（`XNOR`）与异槽（`XOR`）给出青色求同 $s = \cos\theta$ 与品红存异 $a = \sin\theta$（平行四边形律与玻恩权重标绿色 `LEAN ✓`），在非共线比较 $a \neq 0$ 时，双向乘积 $s^2 - \kappa a^2$ 唯在纯差自乘 $\hat{I}^2 = \kappa = -1$（`square_eq_neg_one_of_skewAdjoint_unitary` `LEAN ✓`）处落在 $(1, 0)$（共线 $a = 0$ 时对任意 $\kappa$ 均落于 $(1, 0)$，故唯 $\kappa = -1$ 对一切比较角守住单位预算；宇宙单指令诠释标 `MODEL`）。
:::

一旦看清宇宙只是在马不停蹄地执行 $\mathrm{CMP}(\mathbf{A}, \mathbf{B})$，六重看似风马牛不相及的宏观与微观现象，便在同一台极简比较机里依次涌现（以下跨学科统一图景属本书 `MODEL`，其中引用的数学物理定理与冻结声明分别标明证据层级）：

- **（一）量子概率与海森堡测不准：双向互易公平抹去手性符号**。没有外部裁判 $C$ 时，“拿 $\mathbf{A}$ 比 $\mathbf{B}$”与“拿 $\mathbf{B}$ 比 $\mathbf{A}$”必须给出完全对称的客观账目。由于求异通道反转手性 $\mathbf{B}\wedge\mathbf{A} = -\mathbf{A}\wedge\mathbf{B}$，唯一消去方向偏私的互易配对正是 $\mathcal{A}_0$ 条款 III 的共轭乘积：

  $$
  \mathrm{CMP}(\mathbf{A}, \mathbf{B})\,\mathrm{CMP}(\mathbf{B}, \mathbf{A}) \;=\; (\cos\theta + \sin\theta\,\hat{\mathbf{I}})(\cos\theta - \sin\theta\,\hat{\mathbf{I}}) \;=\; \cos^2\theta + \sin^2\theta \;=\; 1.
  $$

  青色相融权重 $\cos^2\theta$（玻恩概率骨架）与品红差异方差 $\sin^2\theta$ 共享总额为 $1$ 的公平预算；单次平方读数擦除了双向量正负朝向，遂内生出无需外力扰动的测不准界（有限维精确代数恒等式见 [@thm-ch32-comparison-extensionality-and-lagrange] 第 3 款 `lagrange_gram_identity`，`LEAN ✓`）。

::: {.viz src="comparison-oisc-engine" preset="uncertainty" height="520"}
**公平平方：青色的同² 加上品红的楔²，楔积垫出测不准下界。** 拖动琥珀色的向量 $v$ 与 $u$ 比量，右图把比较 $\bar{u}v$ 画成横轴为同、纵轴为楔的一点：$|u|^2|v|^2$ 恒拆成青色的同² 加品红的楔²，非零楔积像交换子一样垫在 $|u||v|$ 下方（绿色 `LEAN ✓` 锚定 `lagrange_gram_identity` 与 `robertson_schrodinger`）。
:::

- **（二）三维空间与几何距离：比较相似度矩阵的半正定嵌入**。宇宙起初并无预设的 $(x, y, z)$ 铁盒子，只有一族对象两两比较留下的内积相似度表 $G_{ij} = \mathbf{A}_i\cdot\mathbf{A}_j$。根据勋伯格半正定嵌入定理（Schoenberg 1935，文献结果，见 [@rem-ch32-comparison-axiom-literature]），只要相似度矩阵满足第 1 层半正定条件 $G \succeq 0$，它就自动在欧氏空间中凝结出弦距度规 $d_{ij} = \sqrt{2(1 - G_{ij})}$——“离得近”不过是两两比较经常一致，“离得远”不过是两两比较正交分叉。需特别注意一处算术几何事实：若取 $\{\pm 1\}^8/\sqrt{8}$ 中的 $8$ 个单位二元字并将 $8$ 个坐标槽位分组投影至秩 $3$ 子空间，因 $3 \nmid 8$，三组槽位数不可能均等，故槽位分组二元字绝不可能张成等边正方体；下方交互舞台选取最均衡的 **`3-3-2` 槽位分桶**（`BOX = [0,1,2,0,1,2,0,1]`），在三维空间中张成半轴长平方为 $(\frac{3}{8}, \frac{3}{8}, \frac{2}{8})$ 的**三维直角八角长方盒（三维八角盒）**。

::: {.viz src="comparison-oisc-engine" preset="emergence" height="520"}
**二十八次两两比较显影出三维八角盒。** 八个八槽单位字按均衡 `3-3-2` 槽位分桶逐对揭开半正定格拉姆表 $G = WW^{\mathsf{T}}$，经谱分解自动显影出半轴长平方为 $(3/8, 3/8, 2/8)$ 的三维八角长方盒（因 $3\nmid 8$ 无等分三轴故不可能为正方体），弦距满足 $d_{ij}^2 = 2(1-G_{ij})$（正算子格拉姆分解标 `LEAN ✓`，勋伯格嵌入定理标 `ARGUED`）。
:::

- **（三）时间流逝与正交开维：半正定比较表秩超限时的正交残差立轴**。只要有限个状态的全部两两比较都能塞进当前 $D$ 维空间（$G \succeq 0$ 且 $\operatorname{rank}(G) \le D$），系统就处于无时间的静态相容平衡（[第 29 章](ch29-timeless-causality-and-gram-space.md)）。若假想重叠表出现 $\det G < 0$，那意味着内积数据本身自相矛盾，除非修正重叠值否则在**任何**欧氏维数中均无法嵌入；真正的**正交维度扩张**则源于**半正定**比较表（$G_{D+1} \succeq 0$）的秩超出旧维数 $D$——对张成旧表子空间 $\mathcal{V}_D$ 的 $D$ 个线性无关旧态（$\det G_D > 0$），当新单位态 $w(\beta)$ 带有跳出 $\mathcal{V}_D$ 的非零正交残差 $r = (I - P_{\mathcal{V}_D})w = \sin\beta\,\mathbf{e}_{D+1} \neq 0$ 时，舒尔补恒等式给出 $\det G_{D+1} = (\det G_D)\,\lVert r\rVert^2 = (\det G_D)\sin^2\beta > 0$（标准正交旧基 $\det G_D = 1$ 下特化为 $\sin^2\beta > 0$），将欧氏嵌入秩严格从 $D$ 推升至 $D + 1$（$S^\perp \neq \{0\}$ 内存在单位正交向量由 `finite_layer_projection_escape` `LEAN ✓` 锁定，将秩增长 $D \to D + 1$ 诠释为时间轴扩张标 `MODEL`，见[第 31 章 §31.4](ch31-quantum-fairness.md#sec-ch31-fairness-square-expansion)）。

::: {.viz src="comparison-oisc-engine" preset="time-axis" height="520"}
**旧表平面装不下的残差，垂直立起成新轴。** 拖动琥珀色端点把新态 $w(\beta)$ 抬离旧平面 $\mathcal{V}_2 = \operatorname{span}(e_1, e_2)$：青色是留在表内的投影 $\cos\beta$，品红是与表内方向比较皆为零的正交残差 $\sin\beta\,e_3$，三态格拉姆行列式 $\sin^2\beta > 0$ 把秩从 $2$ 升到 $3$（`finite_layer_projection_escape` 标 `LEAN ✓`，时间开维诠释标 `MODEL`）。
:::

- **（四）同余分桶碰撞计数、粗粒化熵与局部搜索屏障：有限带宽比较的原像纤维**。有限观察者每次只能比对有限个投影特征位，微观态遂按读出核归入不可区分的原像纤维（[@thm-ch32-comparison-extensionality-and-lagrange] 第 2 款 `partition_inseparable_iff_kernel` 与[第 38 章 §38.4–§38.5](ch38-observer-memory-pointer-and-ontological-qram.md#sec-ch38-pnp-lookup-degradation)的 `escapePairs_without_eq_union`，`LEAN ✓`）。在含 $M$ 个微观态的单个读出桶内，`EscapePairs` 精确统计 $M(M-1)$ 个有序相异碰撞对；而粗粒化香农/玻尔兹曼熵则依赖显式微观态概率分布（仅在单桶均匀系综下等于 $\log_2 M$ 比特，对应物理热力学熵须在指明系综假设下归入 `MODEL`），缺乏全局导向场时被迫逐桶盲比则构成有限带宽下的指数级局部搜索屏障。
- **（五）生命演化与科学定律：历史比较结果的快表记忆化（$T \mapsto T(T)$）**。如果在每一拍面对环境变化时都从零做 $O(2^n)$ 次原始逐位硬比，任何有限系统都会瞬间耗尽步数预算。DNA 遗传密码、大脑突触权重与人类数学定理库，在计算本质上都是把亿万次存活下来的高频比较预先编译成前缀路由快表 $T$（[第 35 章](ch35-light-pulse-and-self-referential-table.md)与[第 38 章](ch38-observer-memory-pointer-and-ontological-qram.md)），把指数级硬扫描压缩为深度 $b$ 的低步数前缀命中，同时每一拍物理比对与字典扫描依然严格支付非零有限机器步数（下方 [@thm-ch32-paid-name-comparison-and-dictionary]，`LEAN ✓`）。

::: {.viz src="comparison-oisc-engine" preset="lookup" height="520"}
**读前 $b$ 位的前缀快表与自比较蛛网：省下的比较位数留下同桶逃逸对。** 十六个四位态只读前 $b$ 位时，深度为 $b$ 的前缀树只需 $b$ 次比较即可命中叶子，但同桶内留下 $16(2^{4-b}-1)$ 个分不开的逃逸对（`escapePairs_without_eq_union` `LEAN ✓`）；右侧时间轴运行自比较 $x_{n+1} = \cos x_n$，蛛网步步收向唯一正不动点 $\theta^* \approx 0.7391$（`rational_inverse_endpoint` `LEAN ✓`）。
:::

- **（六）自我意识与观察者涌现：比较算子折回自身的自指不动点**。当一台局部比较子网络不仅比对外界，还把比较指令折回自身——执行 $\mathrm{CMP}(\psi, \psi)$——求同标尺与被量倾角在实轴余弦投影下迎头相撞，收敛于唯一自指平衡角 $\cos\theta^* = \theta^* \approx 0.739085$（[第 24 章](ch24-cosine-fixed-points-and-self-reference.md)与[第 33 章](ch33-all-beings-observers-and-mutual-attractors.md)）。

下表将这六重涌现现象统一收束为宇宙单指令集比较机的总账单：

| 宏观物理 / 数学表象 | 底层比较机动作 | 几何与代数读数 | 证据分层 |
| :--- | :--- | :--- | :--- |
| **物质粒子 vs. 相互作用力** | 求同通道 vs. 求异通道 | $\mathbf{A}\cdot\mathbf{B} = \cos\theta$（标量线） vs. $\mathbf{A}\wedge\mathbf{B} = \sin\theta\,\hat{\mathbf{I}}$（双向量面） | `文献结果`（克利福德分解）+ `MODEL` |
| **玻恩概率与海森堡测不准** | 双向互易比较折叠手性符号 | $\mathrm{CMP}(\mathbf{A},\mathbf{B})\,\mathrm{CMP}(\mathbf{B},\mathbf{A}) = \cos^2\theta + \sin^2\theta = 1$ | `LEAN ✓`（`lagrange_gram_identity`）+ `MODEL` |
| **三维空间与弦距度规** | 两两相似度矩阵半正定嵌入 | $G_{ij} = \mathbf{A}_i\cdot\mathbf{A}_j \succeq 0,\; d_{ij} = \sqrt{2(1 - G_{ij})}$（均衡 `3-3-2` 分桶张成八角长方盒） | `文献结果`（Schoenberg 1935）+ `NUM` + `MODEL` |
| **时间之箭与维度扩张** | 半正定比较表超秩的正交残差立轴 | $G_{D+1} \succeq 0$ 且正交残差 $r = (I - P_{\mathcal{V}_D})w \neq 0$（$\det G_{D+1} = (\det G_D)\sin^2\beta > 0$，秩 $D \to D+1$） | `LEAN ✓`（`finite_layer_projection_escape`）+ `MODEL` |
| **粗粒化碰撞与搜索屏障** | 有限位比较的同余分桶盲区 | $\mathrm{readout}(x)=\mathrm{readout}(y)$ 碰撞对统计 `EscapePairs`（$M(M-1)$）与系综粗粒化熵 | `LEAN ✓`（`partition_inseparable_iff_kernel`、`escapePairs_without_eq_union`）+ `MODEL` |
| **生命、知识与自我意识** | 比较结果快表化与自指比较 | 字典扫描步数守恒、$T \mapsto T(T)$ 与自指平衡 $\cos\theta^* = \theta^*$ | `LEAN ✓`（`name_compare_run`、`dictionary_lookup_run`）+ `MODEL` |

为了彻底杜绝把“比较”与“查表”浪漫化为零成本神谕的幻觉，`trureturing` 的可计算性模块用多栈有限控制自动机（`FinTM2`）严格构造并验证了**逐位二元名字比较机**与**流式字典查表机**的精确步数守恒与无损纸带复原定理：

::: {.theorem #thm-ch32-paid-name-comparison-and-dictionary title="二元名字逐位比较机与查表字典扫描的精确步数守恒" lean="D5/S0/Computability/BinaryNameComparison.name_compare_run D5/S0/Computability/BinaryNameDictionary.dictionary_lookup_run"}
在 `trureturing` 冻结的二元名字比较与字典查找可计算性模块中，以下两项有偿运行上界与纸带复原定理同时成立：

1. **逐位二元名字比较机的步数上界与无损复原**（[`name_compare_run`](lean:D5/S0/Computability/BinaryNameComparison.name_compare_run)）：对任意两个二元比特字 $a, b \in \operatorname{List}\;\mathrm{Bool}$（长度不必相等）、已有输出栈 $\mathrm{output}$ 与帧栈 $\mathrm{frame}$，六栈有限控制自动机 `compareMachine` 从初始构型 $(\operatorname{some}\;\mathrm{compare},\, \langle\operatorname{none},\operatorname{none},\mathrm{true}\rangle,\, a,\, b,\, [],\, [],\, \mathrm{output},\, \mathrm{frame})$ 出发，必在至多

   $$
   T_{\mathrm{cmp}}(a, b) \;\le\; 2\bigl(\lvert a\rvert + \lvert b\rvert\bigr) + 4
   $$

   步内停机，将相等判别比特 $\operatorname{decide}(a = b)$ 压入输出栈顶得到 $\operatorname{decide}(a = b) :: \mathrm{output}$，清空两条暂存工作栈，并将左右输入字 $a, b$ 与上下文帧 $\mathrm{frame}$ 原样复原；

2. **二元名字字典扫描机的精确步数界与一元下标定位**（[`dictionary_lookup_run`](lean:D5/S0/Computability/BinaryNameDictionary.dictionary_lookup_run)）：对任意二元名字列表 $\mathrm{names} \in \operatorname{List}(\operatorname{List}\;\mathrm{Bool})$、待查字 $\mathrm{query} \in \operatorname{List}\;\mathrm{Bool}$ 与上下文帧 $\mathrm{frame}$，记分隔符编码字典流为 $\operatorname{dictionaryStream}(\mathrm{names})$，则自动机 `dictionaryMachine` 从初始查找构型出发，必在至多

   $$
   T_{\mathrm{dict}}(\mathrm{names}, \mathrm{query}) \;\le\; \bigl(2\lvert\mathrm{query}\rvert + 12\bigr)\lvert\mathrm{names}\rvert \;+\; 4\bigl\lvert\operatorname{dictionaryStream}(\mathrm{names})\bigr\rvert \;+\; 3
   $$

   步内停机，在输出栈精确写出命中判别位与一元位置码 $\operatorname{decide}(\mathrm{query} \in \mathrm{names}) :: \operatorname{replicate}(\mathrm{names.idxOf}(\mathrm{query}),\, \mathrm{true})$，同时完整复原 $\mathrm{query}$、$\operatorname{dictionaryStream}(\mathrm{names})$ 与 $\mathrm{frame}$。
:::

::: proof
第 1 款将 `compareMachine` 的执行拆为扫描比对阶段与回卷复原阶段：在 `compare` 状态逐拍弹出 $a, b$ 首比特压入暂存栈 `savedLeft, savedRight` 并累计匹配标志位（若一侧提前耗尽则置匹配位为 `false` 并转入耗尽清栈分支），随后在 `restore` 阶段将两条暂存栈逐位倒回左、右主栈，总步数精确受限于往返两趟字长之和加常数状态切换开销 $2(\lvert a\rvert + \lvert b\rvert) + 4$。第 2 款在 `dictionaryStream` 上对字典条目数 $\lvert\mathrm{names}\rvert$ 归纳：每扫过一个词条，机器调用内嵌逐位比对子例程并在未命中时追加一元计数符 `true`，扫完整个流后回卷复原字典流与查询字，累计步数满足线性界 $(2\lvert\mathrm{query}\rvert + 12)\lvert\mathrm{names}\rvert + 4\bigl\lvert\operatorname{dictionaryStream}(\mathrm{names})\bigr\rvert + 3$。完整证明由 Lean 内核检查。
:::

[@thm-ch32-paid-name-comparison-and-dictionary] 为宇宙单指令集比较机钉死了一条物理与计算的共同铁律（`MODEL`）：**不存在不读比特就能瞬间知道 $a = b$ 的零步神谕，也不存在可逆保住双方身份而不付线性步数预算的免费比较**。带着 $\mathcal{A}_0$ 与这台有偿单指令比较机，我们现在进入[第 32.3 节](ch32-s03-axioms-as-corollaries.md#sec-ch32-axioms-as-corollaries)，将数学与物理的五大公理群正式铸造成经内核验证的推论链。
