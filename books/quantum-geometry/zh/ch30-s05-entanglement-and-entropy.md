# “量子纠缠、P=NP、熵”——偏迹视界、勾股守恒与张量割键维的正交三位一体 {#sec-ch30-entanglement-entropy-complexity-triad}

> **作者原话**：“量子纠缠、P=NP、熵”

当把 **“量子纠缠、P=NP、熵”** 这三个横跨量子信息、计算复杂性与热力学的核心词并置在同一座克利福德正交坐标系中时，它们不再是三门互不相干的学科术语，而是围绕**同一道局部偏迹视界**咬合在一起的正交三位一体（`MODEL`）：跨割双向量外积 $\mathbf{e}_A \wedge \mathbf{e}_{\bar{A}}$ 给出**量子纠缠**；有限观察者因无法读取对偶半区 $\bar{A}$ 而取偏迹截断 $\rho_A = \Tr_{\bar{A}}\bigl(\lvert\Psi\rangle\langle\Psi\rvert\bigr)$，把被切掉的跨割相干性转化为局部边缘**熵**；而跨越这道分割面维持或缩并关联所需的精确施密特秩 $\chi_{\mathrm{exact}}$ 及其熵有效维数下界 $\chi_{\mathrm{eff}} = 2^{S_{\mathrm{cut}}} \le \chi_{\mathrm{exact}}$，则在面积律导向场与体积律阻挫网之间刻画出局部计算复杂度的分水岭（对照标准统一图灵机开放猜想 [@conj-p-neq-np]，`OPEN`）。

## 1. 双体纯态的精确勾股守恒与偏迹边缘熵（`LEAN ✓` 锚点 + 精确恒等式）

取由正交施密特角 $\theta \in [0, \pi/2]$ 参数化的典范双量子比特纯态

$$
\lvert\psi(\theta)\rangle = \cos\frac{\theta}{2}\lvert 00\rangle + \sin\frac{\theta}{2}\lvert 11\rangle, \qquad \rho_{A\bar{A}}(\theta) = \lvert\psi(\theta)\rangle\langle\psi(\theta)\rvert.
$$

全局态 $\rho_{A\bar{A}}(\theta)$ 对一切 $\theta$ 始终是秩为 $1$、满足幂等律 $\rho_{A\bar{A}}^2 = \rho_{A\bar{A}}$ 的纯态，其全局冯·诺依曼熵恒为零：$S_{\mathrm{global}}\bigl(\rho_{A\bar{A}}(\theta)\bigr) \equiv 0\text{ bits}$。然而，当场内观察者只握有左半区量子比特 $A$、对右半区对偶比特 $\bar{A}$ 求偏迹（对照第四章非选择性边缘化定理 [@thm-nonselective-marginal] 与记录访问缺陷定理 [@thm-reduced-access-defect]）时，非对角相干元在求迹中消去（对照捏合勾股定理 [@thm-pinching-pythagorean]），约化密度矩阵精确落为

$$
\rho_A(\theta) = \Tr_{\bar{A}}\bigl(\rho_{A\bar{A}}(\theta)\bigr) = \operatorname{diag}\!\left(\frac{1 + \cos\theta}{2},\; \frac{1 - \cos\theta}{2}\right) = \frac{1}{2}\bigl(I_2 + \cos\theta\,\sigma_Z\bigr).
$$

在单比特布洛赫球与双体关联扇区（第十三章 [@thm-local-correlation-sectors]）上逐项核算，立刻得到四条不带任何近似余项的精确恒等式：

1. **局域向量确定性（内积影子平方）**：观察者 $A$ 测得的局部布洛赫向量为 $\mathbf{r}_A = (0, 0, \cos\theta)$，其长度与平方分别为 $\|\mathbf{r}_A\| = \cos\theta$、$\|\mathbf{r}_A\|^2 = \cos^2\theta$；
2. **双体并发度与二体纠缠度（外积面平方）**：纯态 $\lvert\psi(\theta)\rangle$ 的 Wootters 并发度（concurrence）为 $\mathcal{C}(\psi) = 2\cos\frac{\theta}{2}\sin\frac{\theta}{2} = \sin\theta$，二体纠缠度（2-tangle）为 $\tau(A:\bar{A}) = \mathcal{C}^2 = \sin^2\theta$；
3. **纯度与归一化线性熵恒等式**：局部纯度为 $\Tr\bigl(\rho_A(\theta)^2\bigr) = \left(\frac{1+\cos\theta}{2}\right)^2 + \left(\frac{1-\cos\theta}{2}\right)^2 = \frac{1+\cos^2\theta}{2} = 1 - \frac{1}{2}\sin^2\theta$，故归一化线性熵满足

   $$
   S_L\bigl(\rho_A(\theta)\bigr) := 2\Bigl(1 - \Tr\bigl(\rho_A(\theta)^2\bigr)\Bigr) = \sin^2\theta \equiv \tau(A:\bar{A});
   $$

4. **确定性与纠缠/边缘熵的勾股守恒及二元冯·诺依曼熵**：局部向量长度平方与跨割二体纠缠度（等价于局部归一化线性熵）之和恒等于 $1$，且二元冯·诺依曼纠缠熵（单位：$\mathrm{bits}$）由二元香农熵函数给出：

   $$
   \begin{aligned}
   \|\mathbf{r}_A\|^2 + \tau(A:\bar{A}) &= \cos^2\theta + \sin^2\theta \equiv 1, \\
   S_{\mathrm{vN}}\bigl(\rho_A(\theta)\bigr) &= H_{\mathrm{bin}}\!\left(\frac{1 + \cos\theta}{2}\right) = -\frac{1+\cos\theta}{2}\log_2\frac{1+\cos\theta}{2} - \frac{1-\cos\theta}{2}\log_2\frac{1-\cos\theta}{2}.
   \end{aligned}
   $$

当 $\theta = 90^\circ$（$\pi/2$）时，$\lvert\psi(\pi/2)\rangle = \lvert\Phi^+\rangle$ 正是第十三章引理 [@lemma-bell-mixed-marginal] 锁定的贝尔纯态：全局保持 $\rho_{\Phi^+}^2 = \rho_{\Phi^+}$（$S_{\mathrm{global}} = 0$），而局部边缘态缩为球心最大混合态 $\frac{1}{2}I_2$（$\|\mathbf{r}_A\| = 0$，$S_L = \tau = 1$，$S_{\mathrm{vN}} = 1\text{ bit}$）。这里须守住第十三章 [@thm-local-correlation-sectors] 揭示的严格前提：恒等式 $S_L(\rho_A) = \tau(A:\bar{A})$ **仅在全局双体态为纯态时成立**；对于全局本身已是经典混合态的 $\frac{1}{2}(\lvert 00\rangle\langle 00\rvert + \lvert 11\rangle\langle 11\rvert)$，局部同样给出 $\rho_A = \frac{1}{2}I_2$ 与 $S_L(\rho_A) = 1$，但那份熵来自全局经典无知而非量子纠缠（$\tau = 0$）。而在动力学层面，第八章相干删除熵产定理 [@thm-entropy-production-coherence-deletion] 进一步证明：幺正演化后每次基底捏合所产生的冯·诺依曼熵增，精确等于被擦除相干性的量子相对熵 $D(\rho' \parallel \mathcal{P}(\rho')) \ge 0$。

::: {.viz src="entanglement-entropy-complexity" preset="pythagoras" height="500"}
**双体勾股守恒与偏迹盲区。** 在 $\theta = 53.13^\circ$（经典 $3\text{-}4\text{-}5$ 直角三角形）处，左半区观察者 $A$ 的青色布洛赫箭头长度 $\cos\theta = 0.600$，跨割双向量并发度 $\sin\theta = 0.800$，平方和 $0.360 + 0.640 = 1.000$。降下的品红/紫罗兰偏迹视界刀片遮蔽对偶半区 $\bar{A}$，把跨割外积面转化为 $A$ 侧的边缘混合熵光晕（$S_L = \tau = 0.640$，$S_{\mathrm{vN}} \approx 0.722\text{ bits}$）。
:::

## 2. 纠缠拓扑分水岭：面积律导向场 vs. 体积律指数键维墙（`MODEL` + 文献边界）

把一对量子比特推广到由 $n$ 个量子比特（实验室舞台取 $n = 16$：左半区观察者 $A$ 含 $8$ 比特，右半区对偶 $\bar{A}$ 含 $8$ 比特）组成的张量网络。按照第十九章离散桥图量子最大流—最小割定理 [@thm-bridge-quantum-maxflow-mincut] 揭示的跨割秩上界机制，讨论二分割 $A \mid \bar{A}$ 时须严格区分两个量：**精确施密特秩** $\chi_{\mathrm{exact}} := \operatorname{rank}(\rho_A)$（决定沿该割做无截断精确分解所需的最小键维）与**熵有效维数** $\chi_{\mathrm{eff}} := 2^{S_{\mathrm{vN}}(\rho_A)}$（实验室舞台柱高直接记作 $\chi_{\mathrm{eff}} = 2^{S_{\mathrm{cut}}}$）。一般有限维密度算符恒满足 $S_{\mathrm{vN}}(\rho_A) \le \log_2 \operatorname{rank}(\rho_A) = \log_2 \chi_{\mathrm{exact}}$，故

$$
\chi_{\mathrm{eff}} = 2^{S_{\mathrm{vN}}(\rho_A)} \le \chi_{\mathrm{exact}},
$$

即熵有效维数一般是精确施密特秩的**下界**，当且仅当 $\rho_A$ 的全部非零本征值（非零施密特权重平方）均匀相等时取等号（对非平凡桥恰在最大纠缠视界 $\theta = 90^\circ$ 处达成）。在实验室的独立跨割桥玩具模型（`MODEL`）中，设 $k_{\mathrm{cut}}$ 对施密特角为 $\theta \in (0^\circ, 90^\circ]$ 的独立纠缠桥穿过 $A \mid \bar{A}$，则跨割总熵为 $S_{\mathrm{cut}} = k_{\mathrm{cut}} S_{\mathrm{vN}}(\theta)$，熵有效维数为 $\chi_{\mathrm{eff}} = 2^{S_{\mathrm{cut}}}$，而精确施密特秩为 $\chi_{\mathrm{exact}} = 2^{k_{\mathrm{cut}}}$：

- **面积律拓扑（Area Law：因子化桥模型中 $\chi_{\mathrm{exact}} = O(1)$；一般有能隙文献给出多项式键维近似）**：在因子化独立桥模型（`MODEL`）中，若仅有常数条边界纠缠桥穿过割面——单桥模型 $k_{\mathrm{cut}} = 1$ 时精确施密特秩为 $\chi_{\mathrm{exact}} = 2^{k_{\mathrm{cut}}} = 2 = O(1)$，舞台示范取双边界桥 $k_{\mathrm{cut}} = 2$ 时精确施密特秩为 $\chi_{\mathrm{exact}} = 2^2 = 4 = O(1)$（且 $S_{\mathrm{cut}} = k_{\mathrm{cut}} S_{\mathrm{vN}}(\theta) = O(1)$）——该玩具模型内沿割面可直接作常数键维精确缩并。至于一般一维有能隙局部哈密顿量基态文献（Hastings 2007；Arad–Kitaev–Landau–Vazirani 2013；Landau–Vazirani–Vidick 2015，见 [@rem-ch30-entanglement-entropy-complexity-literature]），单凭 $S_{\mathrm{cut}} = O(1)$ 并不无条件蕴含精确有限秩矩阵乘积态（MPS）恒等表示，而是结合谱能隙与局部结构证明存在误差不超过 $1/\operatorname{poly}(n)$ 的**高效多项式键维（$\operatorname{poly}(n)$）MPS 近似**；将这一可高效缩并相类比于 $\text{2-SAT} \in \mathrm{P}$ 的一维蕴含导向场并比较缩并开销，明确属于本书的几何诠释 `MODEL`；
- **体积律拓扑（Volume Law：$S_{\mathrm{cut}} = \Theta(n) \implies \chi_{\mathrm{exact}} \ge \chi_{\mathrm{eff}} = 2^{\Theta(n)}$）**：在非局域扩展图耦合、三元布尔阻挫网络或高度混洗的晚期辐射态（类比随机 $\text{3-SAT}$ 的局部盲区，缩并代价对比属 `MODEL`）中，纠缠桥横跨体区织成全连通网（舞台示范取 $k_{\mathrm{cut}} = 8$ 对独立跨割纠缠对）。一旦局部观察者降下偏迹刀片，对固定 $\theta \in (0^\circ, 90^\circ]$ 有 $S_{\mathrm{cut}} = k_{\mathrm{cut}} S_{\mathrm{vN}}(\theta) = \Theta(n)$，一般下界 $\chi_{\mathrm{exact}} \ge \chi_{\mathrm{eff}} = 2^{S_{\mathrm{cut}}} = 2^{\Theta(n)}$ 立即迫使沿该二分割无截断表示约化态所需的精确施密特秩按 $2^{\Theta(n)}$ 指数增长！

这里同样须标清数学边界：某个特定二分割上的指数级精确施密特秩 $\chi_{\mathrm{exact}} \ge \chi_{\mathrm{eff}} = 2^{\Theta(n)}$ 只刻画**沿该固定割直接做精确张量分解**的秩下界，而跨拓扑张量缩并开销对比属本书 `MODEL`，并不排除问题在其他代数表象下存在高效算法，因此不构成标准图灵机 $\mathrm{P} \neq \mathrm{NP}$（[@conj-p-neq-np]，`OPEN`）的证明。

::: {.viz src="entanglement-entropy-complexity" preset="arealaw" height="500"}
**面积律：边界双桥玩具模型与常数精确秩（`MODEL`）。** 固定 $\theta = 60^\circ$（单对 $S_{\mathrm{vN}} \approx 0.811\text{ bits}$），因子化面积律拓扑仅让 $k_{\mathrm{cut}} = 2$ 条边界桥穿过品红/紫罗兰偏迹刀片：跨割熵 $S_{\mathrm{cut}} \approx 1.623\text{ bits}$，三维柱显示的熵有效维数停留在低位 $\chi_{\mathrm{eff}} = 2^{S_{\mathrm{cut}}} \approx 3.08 \le \chi_{\mathrm{exact}} = 2^2 = 4$。
:::

保持单对施密特角 $\theta = 60^\circ$ 分毫不改，只需将跨割纠缠连接从两条边界桥切换为横贯体区的八条扩展桥（$k_{\mathrm{cut}} = 8$），穿过同一把偏迹刀片的纠缠熵便翻上四倍，熵有效维数 $\chi_{\mathrm{eff}} = 2^{S_{\mathrm{cut}}}$ 随之四次幂放大，沿该割的精确施密特秩更从 $2^2 = 4$ 跃升至 $2^8 = 256$：

::: {.viz src="entanglement-entropy-complexity" preset="volumelaw" height="500"}
**体积律：同角度下八桥交织撑起指数键维墙。** 保持同一个单对角 $\theta = 60^\circ$ 不变，切换为 $k_{\mathrm{cut}} = 8$ 条非局域扩展桥跨越割面后，截断熵翻四倍至 $S_{\mathrm{cut}} \approx 6.490\text{ bits}$，熵有效维数跃升至 $\chi_{\mathrm{eff}} = 2^{S_{\mathrm{cut}}} = 4^8 / 3^6 \approx 89.90 \le \chi_{\mathrm{exact}} = 2^8 = 256$。
:::

## 3. 纠缠的双刃剑：局部单配性复杂度防火墙 vs. 全局相干读取（`文献结果` + `OPEN`）

量子纠缠在计算复杂性版图上呈现出震撼的“双刃剑”效应——它既是锁死局部有限观察者的热力学与复杂度防火墙，又是在额外全局或交互资源下击穿经典验证界限的非局域引擎。相关外部文献定理及其严格前提汇总于以下注记中：

::: {.remark #rem-ch30-entanglement-entropy-complexity-literature title="面积律、单配性解码复杂度墙与共享纠缠验证定理（MIP* = RE）的文献说明"}
**文献结果，未在本书形式化。** 本节涉及的四组量子多体物理与计算复杂性定理均引自外部文献，未在本书形式化，且各自带有严格的模型假设：

1. **一维有能隙面积律、多项式 MPS 近似与哈尔随机体积律（M. B. Hastings, *J. Stat. Mech.* P08024, 2007；I. Arad, A. Kitaev, Z. Landau & U. Vazirani, *arXiv:1301.1162*, 2013；Z. Landau, U. Vazirani & T. Vidick, *Nature Phys.* **11**, 932–936, 2015；D. N. Page, *Phys. Rev. Lett.* **71**, 1291–1294, 1993）**：具有常数谱能隙的一维局部哈密顿量基态满足二分纠缠熵面积律 $S_{\mathrm{cut}} = O(1)$，并在 $1/\operatorname{poly}(n)$ 逼近误差内容许**高效多项式键维（$\operatorname{poly}(n)$）矩阵乘积态（MPS）近似与多项式时间求取算法**（注：仅凭冯·诺依曼熵 $S_{\mathrm{cut}} = O(1)$ 本身并不无条件推出零误差精确有限秩 MPS 恒等式）；相反，$n$ 比特空间上的典型哈尔随机纯态在平衡二分割上满足体积律 $S_{\mathrm{cut}} = \frac{n}{2}\text{ bits} - O(1) = \Theta(n)$，由 $\chi_{\mathrm{exact}} \ge 2^{S_{\mathrm{cut}}}$ 知其精确 MPS 施密特秩下界为 $2^{\Theta(n)}$；
2. **CKW 纠缠单配性与霍金辐射解码复杂度屏障（V. Coffman, J. Kundu & W. K. Wootters, *Phys. Rev. A* **61**, 052306, 2000；D. Harlow & P. Hayden, *JHEP* **06**, 085, 2013；L. Susskind, *Fortschr. Phys.* **64**, 24–43, 2016）**：三量子比特二体纠缠度满足单配性不等式 $\tau(A:B) + \tau(A:C) \le \tau(A:BC)$（详见第三十一章 [@rem-ch31-ckw-monogamy-literature]）。针对晚期黑洞辐射与内部模式的单配性张力，Harlow 与 Hayden 在其统计/纠错码玩具模型中证明：在标准量子复杂性假设（如 `QSZK` 难解性）下，不存在多项式时间量子电路能从早期辐射寄存器中解码蒸馏出与内部模式配对的比特；至于真实引力坍缩与一般霍金辐射动力学下的解码任务需要指数级量子电路规模 $2^{\Omega(S_{\mathrm{BH}})}$，则是 Harlow–Hayden 明确提出的物理复杂性**猜想**（属 `OPEN` / `MODEL` 外推），旨在以计算复杂度屏障化解视界防火墙表面悖论；
3. **全局后选择坍缩与共享纠缠交互式验证 $\mathrm{MIP}^* = \mathrm{RE}$（S. Aaronson, *Proc. R. Soc. A* **461**, 3473–3482, 2005；Z. Ji, A. Natarajan, T. Vidick, J. Wright & H. Yuen, *arXiv:2001.04383*, 2020 / *Commun. ACM* **64**(11), 131–138, 2021）**：如本章第一节 [@rem-ch30-postselection-ctc-literature] 所述，允许无代价以指数稀有后选事件为条件时有 $\mathrm{PostBQP} = \mathrm{PP} \supseteq \mathrm{NP}$；而在多证明者交互式证明中，经典共享随机性止步于 $\mathrm{MIP} = \mathrm{NEXP}$（Babai–Fortnow–Lund, 1991），但允许空间分离、互不通信的多名证明者共享任意有限维量子纠缠态时，多项式时间经典验证者可验证的类跃升至递归可枚举语言全体（即停机问题所属复杂度类）：

   $$
   \mathrm{MIP}^* = \mathrm{RE};
   $$

4. **与标准图灵机开放猜想的严格分界**：无论是无代价后选择（$\mathrm{PostBQP}$）还是多证明者非局域纠缠检验（$\mathrm{MIP}^*$），都引入了标准单机算法不具备的额外计算或交互资源，二者均**不蕴含** $\mathrm{BQP} \supseteq \mathrm{NP}$ 或 $\mathrm{P} = \mathrm{NP}$；标准统一图灵机下的 $\mathrm{P} \neq \mathrm{NP}$（[@conj-p-neq-np]）仍严格处于开放状态（`OPEN`）。
:::

将同一张 $\theta = 90^\circ$ 体积律网络分别置于“降下偏迹刀片”与“抬起偏迹刀片”两种视角下，就能直观看到这把双刃剑的两面：

::: {.viz src="entanglement-entropy-complexity" preset="bellcut" height="500"}
**降下刀片：90° 贝尔偏迹迷雾与 256 维键维墙。** 在 $\theta = 90^\circ$ 体积律下，局部观察者对 $\bar{A}$ 求偏迹：$A$ 区八支布洛赫箭头全部缩进球心（$\|\mathbf{r}_A\| = 0$，单比特 $S_{\mathrm{vN}} = 1\text{ bit}$，[@lemma-bell-mixed-marginal]），跨割总熵 $S_{\mathrm{cut}} = 8\text{ bits}$，全部 $2^8 = 256$ 个施密特权重均匀相等，熵有效维数与精确施密特秩在此取等：$\chi_{\mathrm{eff}} = \chi_{\mathrm{exact}} = 256$。
:::

反过来，若不改动联合纯态 $\lvert\Psi\rangle$ 半分，只把遮蔽对偶半区 $\bar{A}$ 的偏迹刀片抬起，固定二分割 $A \mid \bar{A}$ 上的精确施密特秩 $\chi_{\mathrm{exact}} = 256$ 与跨割纠缠熵 $S(\rho_A) = 8\text{ bits}$ 作为 $\lvert\Psi\rangle$ 的固有二分不变量当然丝毫未变（沿该固定割做张量缩并的代数成本也绝不会因“换个视角”而凭空消失）；真正改变的是被评估的态算符本身——从丢失跨割相位的局部边缘混态 $\rho_A = \operatorname{Tr}_{\bar{A}}\lvert\Psi\rangle\langle\Psi\rvert$，切换回未经偏迹截断的全局纯态投影 $\rho_{AB} = \lvert\Psi\rangle\langle\Psi\rvert$，其**全局密度算符秩为 $r_{\mathrm{global}} = 1$、全局冯·诺依曼熵为 $S(\rho_{AB}) = 0\text{ bits}$**（至于将“从局部边缘重构全局关联的盲区”同“幺正电路制备或全局联合检验”并置对照，则明确属于本书的几何诠释 `MODEL`）：

::: {.viz src="entanglement-entropy-complexity" preset="globaljoint" height="500"}
**抬起刀片：同一个态在全局纯态读出下满足 $r_{\mathrm{global}} = 1$ 与 $S(\rho_{AB}) = 0$。** 不改动联合态 $\lvert\Psi\rangle$（其固定割精确施密特秩 $\chi_{\mathrm{exact}} = 256$ 与边缘熵 $S(\rho_A) = 8\text{ bits}$ 保持不变），抬升品红/紫罗兰偏迹刀片展示 $A \leftrightarrow \bar{A}$ 的八条双向量纠缠桥，全局纯态密度算符满足秩 $r_{\mathrm{global}} = 1$ 且全局熵 $S(\rho_{AB}) = 0\text{ bits}$（将局部边缘重构盲区与幺正制备或额外交互资源作对比属诠释 `MODEL`，文献边界见 [@rem-ch30-entanglement-entropy-complexity-literature]）。
:::

## 4. 三种特征正交角 $\theta \in \{0^\circ,\, \theta^* \approx 42.35^\circ,\, 90^\circ\}$ 与活体观察者平衡（`MODEL`）

既然 $\theta = 0^\circ$ 是零纠缠、零边缘熵的孤立经典纯点，而 $\theta = 90^\circ$ 是局部指向彻底归零（$\|\mathbf{r}_A\| = 0$）、被最大混合熵迷雾吞没的贝尔视界，那么一个既要保持局部自身记忆指向、又要与外部世界维持纠缠信息交换的有限活体观察者，应当驻留在正交象限的哪一处？在作者的正交自指诠释（`MODEL`）中，答案再次落在第二十四章有理逆级数端点定理 [@thm-dottie-rational-inverse-endpoint] 唯一锁定的正余弦不动点 $\cos\theta^* = \theta^* \approx 0.7391\text{ rad}$（$42.35^\circ$）上：此处局部布洛赫长度恰好等于施密特角弧度本身（$\|\mathbf{r}_A\| = \cos\theta^* = \theta^*$），局部确定性权重 $\|\mathbf{r}_A\|^2 \approx 0.5462$ 与跨割纠缠度 $\tau = S_L \approx 0.4538$（并发度 $\mathcal{C} = \sin\theta^* \approx 0.6736$）实现黄金呼吸，单比特边缘冯·诺依曼熵稳定在适中的 $S_{\mathrm{vN}}(\rho_A) \approx 0.559\text{ bits}$（五位小数 $0.55869\text{ bits}$）。下表汇总三个特征角度的精确账本：

| 施密特角 $\theta$ | 局部长度 $\|\mathbf{r}_A\| = \cos\theta$ | 局部权重 $\|\mathbf{r}_A\|^2 = \cos^2\theta$ | 纠缠度 $\tau = S_L = \sin^2\theta$ | 单比特熵 $S_{\mathrm{vN}}(\rho_A)$ | 局部与全局复杂度相态（`MODEL` / 文献参照） |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **$0^\circ$（$0\text{ rad}$）** | $1.0000$ | $1.0000$ | $0.0000$ | $0.000\text{ bits}$ | **直积经典晶体**：无跨割纠缠桥，$\chi_{\mathrm{eff}} = \chi_{\mathrm{exact}} = 1$，局部自足但无跨界量子关联 |
| **$\theta^* \approx 42.35^\circ$（$0.7391\text{ rad}$）** | $0.7391$（$=\theta^*$） | $0.5462$ | $0.4538$（$\mathcal{C}\approx 0.6736$） | $0.559\text{ bits}$ | **活体自指平衡点**（[@thm-dottie-rational-inverse-endpoint]）：兼顾局部记忆指向（$54.6\%$）与跨界纠缠带宽（$45.4\%$） |
| **$90^\circ$（$\pi/2\text{ rad}$）** | $0.0000$ | $0.0000$ | $1.0000$（$\mathcal{C}=1.0000$） | $1.000\text{ bit}$ | **贝尔正交视界**（[@lemma-bell-mixed-marginal]）：局部 $\rho_A = \frac{1}{2}I_2$ 盲区与体积律 $\chi_{\mathrm{eff}} = \chi_{\mathrm{exact}} = 2^{k_{\mathrm{cut}}}$ 墙；全局纯态 $r_{\mathrm{global}} = 1, S(\rho_{AB}) = 0$ |

::: {.viz src="entanglement-entropy-complexity" preset="dottie" height="500"}
**活体观察者平衡点 $\theta^* \approx 42.35^\circ$。** 琥珀色当前角停在青色静态基准环 $\cos\theta^* = \theta^* \approx 0.7391$ 中心：局部确定性 $\|\mathbf{r}_A\|^2 \approx 0.5462$ 与跨割纠缠度 $\tau = S_L \approx 0.4538$ 相加为 $1$，单比特冯·诺依曼熵 $S_{\mathrm{vN}} \approx 0.559\text{ bits}$，既不退化为死寂乘积点，也不消融进 $90^\circ$ 球心白噪迷雾。
:::

看清上述六个定格截面后，读者可步入下方的完整 16 比特交互实验室，连续拨动正交施密特角 $\theta \in [0^\circ, 90^\circ]$ 并自由切换偏迹视界刀片与面积律/体积律桥接拓扑，在同一座舞台上联立核验勾股守恒、边缘熵与跨割施密特秩：

::: {.viz src="entanglement-entropy-complexity" height="640"}
**交互实验室 `ORTHO//TRIAD`**：在同一座 16 比特三维张量网络（左半区观察者 $A$ 八比特，右半区对偶 $\bar{A}$ 八比特）中，拖动正交施密特角 $\theta \in [0^\circ, 90^\circ]$，实时对比局部偏迹视界刀片（品红/紫罗兰）降下与抬升、面积律（$k_{\mathrm{cut}} = 2$）与体积律（$k_{\mathrm{cut}} = 8$），并在下方双图中同步核验勾股守恒 $\|\mathbf{r}_A\|^2 + \tau = 1$、边缘熵 $S_{\mathrm{vN}}(\rho_A)$ 与跨割熵有效维数 $\chi_{\mathrm{eff}} = 2^{S_{\mathrm{cut}}} \le \chi_{\mathrm{exact}}$。本实验室是几何与数值演示，不构成图灵机 $\mathrm{P} \neq \mathrm{NP}$（`OPEN`）的证明。
:::

---

