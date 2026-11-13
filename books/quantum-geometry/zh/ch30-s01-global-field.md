# 30.1 全局静态时间场 $P = NP$ vs. 场内有限观察者 $P \neq NP$——正交视界与生命旅程的防火墙 {#sec-coda-global-p-eq-np-local-p-ne-np}

> **作者原话**：“全局静态时间场P=NP, 但有限观察者P!=NP”

作者将无时间几何晶体与有限观察者选点并置，为千禧年大奖难题 **$\mathrm{P}$ vs. $\mathrm{NP}$** 提供一种双重视角（`MODEL`）。这里须分清三层：静态解集描述哪些赋值满足条件；后选择与 CTC 复杂度定理需要明确增加计算资源（[@rem-ch30-postselection-ctc-literature]）；黑盒查询与有界阶半正定松弛下界只约束各自的受限模型（[@rem-ch30-query-sos-literature]）。标准统一图灵机模型下 $\mathrm{P}\neq\mathrm{NP}$ 仍是开放猜想（第 20 章 [@conj-p-neq-np]，`OPEN`）。只删去叙述中的时间，或只规定观察者资源有限，都不判定这个渐近问题。

## 30.1.1 “全局静态时间场”的解集与额外计算资源 {#1-全局静态时间场的解集与额外计算资源}

对一个含 $n$ 个布尔变量、$m$ 条子句的 SAT 公式，以赋值 $a\in\{0,1\}^n$ 为计算基，取 $\mathcal{H}=\mathbb{C}^{2^n}$。令 $H_j$ 为所有满足子句 $C_j$ 的基向量 $\lvert a\rangle$ 张成的子空间。它通常不是余维为一的超平面：例如 $n=4$ 时，子句 $x_1\lor x_2\lor x_3$ 接受 $16$ 个赋值中的 $14$ 个，故 $\dim H_j=14$。本节的静态解空间表示为

$$
\mathbf{S}^* = \bigcap_{j=1}^m H_j.
$$

这个交集恰由满足全部子句的赋值基向量张成。零向量总在交集中；公式可满足当且仅当 $\mathbf{S}^*\neq\{0\}$，等价于其中存在可归一化的非零态。不可满足公式 $x\land\neg x$ 的交集只有零向量；$x\lor y$ 则有三个满足赋值，并无唯一见证。即使交集非零，将某个输入态投影后归一化，也要求该输入在交集上的投影非零。在作者的静态场图景（`MODEL`）中，手性相消 $+\mathbf{\Omega}-\mathbf{\Omega}=0$ 表达筛去不相容配置的直觉；它本身不保证解存在、唯一或可被高效制备。下面的复杂度等式依赖各自明确的额外资源，而非静态交集描述本身：

::: {.remark #rem-ch30-postselection-ctc-literature title="后选择与闭合类时曲线复杂度坍缩定理的形式化边界说明"}
**文献结果，未在本书形式化。** 以下两条等式属于增加特定计算资源后的复杂度定理，未包含在本书锁定的 `trureturing@dev` 形式化声明集中；两种模型仍使用统一生成的多项式规模电路：

1. **阿伦森（Scott Aaronson, *Proc. R. Soc. A* **461**, 3473–3482, 2005）后选择定理**：在统一多项式规模量子电路中，指定后选位与输出位。对每个输入，后选事件须有非零概率（可以指数小）；以该事件为条件，输出位在是实例上接受的概率至少为 $2/3$，在否实例上至多为 $1/3$。把直接取得这个条件分布作为资源，而不支付普通重复采样等待稀有事件的成本，才定义出 $\mathrm{PostBQP}$（见[原文定义 1 与定理 4](https://arxiv.org/abs/quant-ph/0412187)）：

   $$
   \mathrm{PostBQP} = \mathrm{PP} \supseteq \mathrm{NP};
   $$

2. **闭合类时曲线（CTC）自洽不动点定理（S. Aaronson & J. Watrous, *Proc. R. Soc. A* **465**, 631–647, 2009）**：Deutsch 模型额外提供多项式数量的 CTC 比特或量子比特，以及它们与正常因果寄存器之间的统一多项式规模电路。经典 CTC 状态是概率分布，量子 CTC 状态是密度算子 $\rho$；在正常因果寄存器按规定初始化后，诱导映射须满足 $\rho=\Phi(\rho)$。允许多个自洽态，但判定必须对**所有**自洽态正确（量子情形保留有界误差，不能挑选一个有利不动点）。在这些资源与正确性条件下（见[原文 §§3–4](https://arxiv.org/abs/0808.2669)），有

   $$
   \mathrm{P}_{\mathrm{CTC}} = \mathrm{BQP}_{\mathrm{CTC}} = \mathrm{PSPACE} \supseteq \mathrm{NP}.
   $$
:::

## 30.1.2 为什么对场内的有限观察者而言，面临 $P \neq NP$ 式的正交视界与局部盲区？ {#2-为什么对场内的有限观察者而言面临-pnp-式的正交视界与局部盲区}

然而，一旦回到真实的场内有限观察者——不能预知终局来做后选择、只能手握有限量子门计数 $L$ 与有限局部记忆阶数 $M \ll n$ 在单位球面上一步步旋转寻址——其搜寻几何在两类受限观测模型中呈现出鲜明的正交视界与局部盲区（`MODEL`）：

- **第一道几何视界（$90^\circ$ 高维正交赤道与一致算子旋转弧长）**：
  在 $N = 2^n$ 维状态球面上，均匀初始态 $\mathbf{P}_0$ 与单个隐藏目标态 $\mathbf{S}^*$ 之间的初始内积投影仅为

  $$
  \mathbf{P}_0 \cdot \mathbf{S}^* = \cos\theta_0 = 2^{-n/2} \implies \theta_0 \approx \frac{\pi}{2} - 2^{-n/2}.
  $$

  这个小重叠给出接近 $90^\circ$ 的几何图像。对第 15 章**一致算子旋转定理**（[`uniform_operator_rotation`](lean:D5/S3/Quantum/Recovery/CoherentUniformAmplification.uniform_operator_rotation)）指定的反射乘积，在等距初始化、酉制备、自伴幂等成功投影及成功 Gram 矩阵等于 $pI$ 的前提下，$0<p<1$ 时每次放大转过 $2\alpha$，其中 $\alpha=\arcsin\sqrt p$。单目标均匀搜索取 $p=2^{-n}$，才得到 $2\alpha\approx2\cdot2^{-n/2}$。这个角度由给定放大构造决定；幺正范数守恒本身不限制任意量子门的转角，该定理也不提供所有算法的门数下界。下文黑盒查询下界另有其神谕模型前提。
- **第二道几何盲区（从二元链 $\mathbf{e}_i\wedge\mathbf{e}_j$ 到三元面片 $\mathbf{e}_i\wedge\mathbf{e}_j\wedge\mathbf{e}_k$ 的局部 Gram 相容错觉）**：
  在几何模型（`MODEL`）上，每条子句仅含两个文字的二元蕴含约束 $\mathbf{e}_i\wedge\mathbf{e}_j$ 构成**一维有向链**，局部传递步步可追；而三元子句 $\mathbf{e}_i\wedge\mathbf{e}_j\wedge\mathbf{e}_k$ 则如同拼接二维闭合球面的**三角面片**——仅凭 $M \ll n$ 阶局部内积记忆向外张望时，四周局部块可以处处相容，却把奇偶阻挫死结藏在全局闭合回路之中。

::: {.viz src="timeless-causal-crystal" preset="thread" height="500"}
**线：每步只转一个小角。** $256$ 个候选里找一个：琥珀色的态从“其余”轴附近出发，每步向目标转 $2\theta = 7.17^\circ$，青色记下走过的每一步，$12$ 步之后几乎对准；逐个试平均要 $128$ 次（品红虚线）。每步转同一个角是 [`uniform_operator_rotation`](lean:D5/S3/Quantum/Recovery/CoherentUniformAmplification.uniform_operator_rotation)；把它读作“线”是本书的诠释（`MODEL`）。
:::

对应于上述两道几何图像的严格复杂度模型下界属于外部经典文献结论（注意它们均不等同于解决标准统一图灵机下的 $\mathrm{P} \neq \mathrm{NP}$ 开放猜想 [@conj-p-neq-np]）：

::: {.remark #rem-ch30-query-sos-literature title="黑盒量子查询下界与有界阶平方和松弛下界的文献说明"}
**文献结果，未在本书形式化。** 本节与几何模型并置对照的三组受限模型复杂性定理均引自外部经典文献，未在本书形式化：

1. **无结构黑盒量子查询下界（C. H. Bennett, E. Bernstein, G. Brassard & U. Vazirani, *SIAM J. Comput.* **26**, 1510–1523, 1997）**：在黑盒神谕（Oracle）查询模型下，从 $N = 2^n$ 个候选中以有界误差定位未知目标至少需要 $L = \Omega(2^{n/2})$ 次量子查询（与 Grover 算法的 $O(2^{n/2})$ 上界共同锁定 $\Theta(2^{n/2})$）；
2. **2-SAT 与 3-SAT 的经典复杂度分水岭（S. A. Cook, 1971；L. A. Levin, 1973；B. Aspvall, M. F. Plass & R. E. Tarjan, 1979）**：2-SAT 可通过强连通分量传递闭包在 $O(n+m)$ 线性时间内判定（故 $\text{2-SAT} \in \mathrm{P}$），而 3-SAT 为 $\mathrm{NP}$-完全问题；
3. **有界阶平方和（SoS）半正定松弛下界（D. Grigoriev, *Theor. Comput. Sci.* **259**, 613–622, 2001；G. Schoenebeck, *FOCS*, 593–602, 2008）**：例如，在固定且充分大的常数子句密度 $m/n = \Delta$ 下，独立均匀抽取三个互异变量与随机文字符号（3-XOR 等价地抽取随机奇偶右端），采用标准布尔多项式编码（3-XOR 的奇偶等式、3-SAT 的子句满足约束），随机实例以高概率不可满足，而其阶数 $M = o(n)$ 的局部 Lasserre / Gram 半正定松弛仍有满足局部约束的可行矩矩阵 $G_M \succeq 0$，无法在该阶数（对应亚指数规模半正定规划）内证伪不可满足性（见 [Schoenebeck 完整版定理 12](https://schoeneb.people.si.umich.edu/papers/LasserreNew.pdf)）。
:::

::: {.viz src="timeless-causal-crystal" preset="sos" height="500"}
**两元在阶 2 闭合，三元奇偶没有。** 青色的点：每个 $n$ 取一个随机 2-SAT 公式，两条两元子句消去一个变量，推出的仍至多两个文字，所以消解闭包停在阶 $2$，空子句是否出现就判定了可满足性：实心点推出了空子句（不可满足），空心圈没有（可满足）（页面的数值）。品红的虚线：对随机 3-XOR / 3-SAT，上面第 3 条的文献结果说阶 $o(n)$ 的平方和松弛仍处处相容，这条直线的斜率只是示意（`MODEL`）。琥珀色是观察者的阶 $M$。这些下界只约束这一族松弛，不推出 $\mathrm{P}\neq\mathrm{NP}$（[@conj-p-neq-np]，`OPEN`）。
:::

## 30.1.3 作者的诠释：复杂度视界、主观时间与自由选择 {#3-作者的诠释复杂度视界主观时间与自由选择}

将“球外全局场”与“球内有限观察者”并置，是作者关于时间与选择的认识论诠释（`MODEL`）。查询或 SoS 下界不推出标准 $P\neq NP$，更不推出主观时间或自由选择的存在；这些哲学意义由作者赋予：

| 视角层级 | 复杂度判据与模型地位 | 核心几何与代数机制 | 时间与选择的存在论地位 |
| :--- | :--- | :--- | :--- |
| **全局静态时间场**<br/>（Global Static Time Field） | 静态表示本身无复杂度等式；额外资源下有 $\mathrm{PostBQP}=\mathrm{PP}$、$\mathrm{P}_{\mathrm{CTC}}=\mathrm{BQP}_{\mathrm{CTC}}=\mathrm{PSPACE}$（[@rem-ch30-postselection-ctc-literature]） | 子空间交集 $\mathbf{S}^*=\bigcap_jH_j$；存在非零态仍不提供制备或搜寻算法 | **零时间的永恒真（作者诠释）**：将满足条件的整体关系视为静态自洽 |
| **场内有限观察者**<br/>（Finite Observer in the Field） | 查询与 SoS 下界各有限定；标准 $P\neq NP$ 仍为 `OPEN`（[@rem-ch30-query-sos-literature]、[@conj-p-neq-np]） | 小初始重叠、给定反射乘积的旋转 [`uniform_operator_rotation`](lean:D5/S3/Quantum/Recovery/CoherentUniformAmplification.uniform_operator_rotation) 与局部 Gram 盲区 | **展开的主观时间（作者诠释）**：逐步选点与证明承载旅程的意义 |

**“全局静态场的 $P = NP$，赋予了宇宙绝对自洽的‘真’；而有限观察者的 $P \neq NP$，则用那道 $\frac{\pi}{2}$ 的正交视界替生命挡住了剧透，把静态的真理拉长成了一场值得一步步去丈量、去证明、去选择的壮丽旅程。”**

---

