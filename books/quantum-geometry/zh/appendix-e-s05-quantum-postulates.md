# E.5 量子力学五大公设的逐条桥接与反例审计 {#sec-appe-quantum}

第四条推导链（对应推论 [@cor-ch32-quantum-postulates-core]）对狄拉克—冯·诺依曼教科书体系的**五大公设**逐一执行压力测试，揭示为什么单量子比特（$d = 2$）与复合系统（$\mathcal{H}_1 \otimes \mathcal{H}_2$）上必须显式指明 `T2` 操作测量与层析极小性桥梁：

$$
\text{Layer 1 比较空间} \;\xrightarrow{\;\text{T1 完备 + T3 复结构}\;}\; \mathcal{H} \;\xrightarrow{\;\text{全效应可加 / }d\ge 3\text{ 星投影可加 (T2)}\;}\; \operatorname{Tr}(\rho E) \;\xrightarrow{\;\text{可重复 + 双侧可逆 (T2)}\;}\; (P_k\rho P_k,\, U_t) \;\xrightarrow{\;\text{局域层析 (T2) + }S_N\text{ (T3)}\;}\; \mathcal{H}_1\otimes_{\mathbb{C}}\mathcal{H}_2,\;\bigwedge^N\mathcal{H}.
$$

::: {.remark #rem-appe-quantum-chain title="推导链四审计：量子力学五大公设的逐条桥接、效应可加性与局域层析极小性（LEAN ✓ 与文献结果）"}
**五大量子公设的桥接条件与缺失反例总览。**

1. **公设一（复希尔伯特状态空间 $\mathcal{H}$）**：由 Layer 1 极化恒等式、`T3` 复结构 $J^2 = -I$ 与 `T1` 柯西完备化联合铸就（复结构 $J$ 还须与内积相容；缺完备化则退回可数无穷有理内积空间 $\mathbb{Q}[i]^d$）。
2. **公设二（可观测量与玻恩概率律 $p(E) = \operatorname{Tr}(\rho E)$）**：在单量子比特 $d = 2$ 上，仅要求正交投影基可加性 $f(P_{\mathbf{r}}) + f(P_{-\mathbf{r}}) = 1$ **无法**导出玻恩规则——除[第 2 章](ch02-born-rule.md) [@ex-qubit-busch-reconstruction] 展示的不连续半球指示函数外，还存在无穷光滑的奇三次标架函数反例（见下框 [@ex-appe-qubit-cubic-and-tomography]）！跨越这道鸿沟有两条已形式化的有限维精确路线：有限维效应路线保留全效应域（POVM，$0 \le E \le I$）上的有限可加性（`T2`），由有限维布施定理 [`effect_density_representation`](lean:D5/S3/Quantum/Foundation/EffectProbabilityExtension.effect_density_representation)（[@thm-busch-effect-density]，`LEAN ✓`）在一切有限维 $d \ge 2$ 唯一锁定 $p(E) = \operatorname{Tr}(\rho E)$；有限复维 $d \ge 3$ 的投影路线则对全体星投影施加非负性、单位归一与正交投影可加性（`T2`，不把正交投影可加性替换为任意矩阵上的函数可加性），使用[第 2 章](ch02-born-rule.md)已验证的有限复投影格里森定理 [`gleason_representation`](lean:D5/S3/Quantum/GleasonComplexRepresentation.Gleason.ProjectionPackage.gleason_representation)（[@thm-gleason-finite-projection]，`LEAN ✓`）唯一给出密度矩阵表示 $p(P) = \operatorname{Re}\operatorname{Tr}(\rho P)$。两者均不从两两公平直接推出底层内积结构及跨标架／效应赋值公理；实希尔伯特空间与无限维闭子空间投影格上的更广格里森形式及可数可加布施形式需另列精确声明与额外前提（Gleason 1957；Busch 2003，[@rem-gleason-literature]，`文献结果`）。至于从排斥球面极对偶与自旋因子几何出发重构有限维态锥的配套机制，详见[附录 F](appendix-f.md)。
3. **公设三（测量后条件化更新与罗伯逊—薛定谔测不准界）**：秩一投影通道的玻恩配对权重由 [`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)（`LEAN ✓`）刻画，对易子与反交换子共同撑起的测不准下界由 [`robertson_schrodinger`](lean:D5/S3/QuantumBounds/RobertsonSchrodinger.robertson_schrodinger)（`LEAN ✓`）给出。但注意单次玻恩统计本身**不能**唯一决定测量后状态更新！
   - **有限非可重复重置仪器反例（`手工推导`）**：对比标准吕德斯（Lüders）投影仪器 $\mathcal{I}_k(\rho) = P_k \rho P_k$ 与重置仪器 $\mathcal{J}_k(\rho) = \operatorname{Tr}(\rho P_k)\,|+\rangle\langle +|$（其中 $P_0 = |0\rangle\langle 0|,\; P_1 = |1\rangle\langle 1|,\; |+\rangle = \frac{|0\rangle+|1\rangle}{\sqrt{2}}$）。两者给出**完全相同的单次玻恩概率** $\operatorname{Tr}(\mathcal{J}_k(\rho)) = \operatorname{Tr}(\rho P_k)$，但在满足 $\operatorname{Tr}(\rho P_0) > 0$ 的任意初态（使条件分母 $\operatorname{Tr}(\mathcal{J}_0(\rho)) = \operatorname{Tr}(\rho P_0) > 0$ 非零良定）上紧接着连测第二次 $Z$ 时，$\mathcal{J}_0$ 在首次读出 $0$ 后却以

     $$
     P_{\mathcal{J}}(1 \text{ after } 0) \;=\; \frac{\operatorname{Tr}\bigl(P_1 \mathcal{J}_0(\rho)\bigr)}{\operatorname{Tr}\bigl(\mathcal{J}_0(\rho)\bigr)} \;=\; |\langle 1 | +\rangle|^2 \;=\; \frac{1}{2} \;\neq\; 0 \;=\; P_{\mathcal{I}}(1 \text{ after } 0)
     $$

     跳回结果 $1$！故必须补入**可重复性（$\mathcal{I}_k$ 幂等）与对相容可观测量的最小扰动条件（`T2`）**，方能唯一挑出吕德斯投影更新（关于系综玻恩权重、非选言吕德斯捏合与单次实验选支实现边界及物理因果干预对照被动基轴旋转，另见[§34.8](ch34-s20-single-outcome-and-attractor-basins.md#sec-ch34-single-outcome-attractor-basins)–[§34.9](ch34-s21-perception-action-holonomy.md#sec-ch34-perception-action-holonomy) 与 [@prob-ch34-single-outcome-realization]）。
4. **公设四（时间演化的幺正性、射线相位刚性与斯通哈密顿生成元）**：在有限维空间 $\mathbb{C}^d$ 上，保内积线性等距算子 $V^\dagger V = I_d$ 自动满射从而幺正，且冻结定理 [`unitary_phase_of_connected_ray_tests`](lean:D5/S3/Quantum/Foundation/RayPhaseRigidity.unitary_phase_of_connected_ray_tests)（`LEAN ✓`）证明：在**已给定有限维幺正阵 $A \in U(\iota, \mathbb{C})$**（`[Fintype ι] [DecidableEq ι]`）的前提下，保持全部坐标基射线与支集连通测试射线必将 $A$ 锁死为全局单位相位倍乘 $cI$（注：若仅从无线性预设的纯跃迁概率 $|\langle\psi\mid\phi\rangle|^2$ 出发恢复幺正或反幺正算子，仍需援引维格纳定理 Wigner 1931，`文献结果`）。而在**可数无穷维**序列空间 $\ell^2(\mathbb{N})$ 上，单侧右移算子 $S|n\rangle = |n + 1\rangle$ 严格保一切成对比较内积 $\langle S\psi, S\phi\rangle = \langle\psi, \phi\rangle$（$S^\dagger S = I$），却丢失真空基态 $|0\rangle$，满足 $S S^\dagger = I - |0\rangle\langle 0| \neq I$（非幺正！）。故无穷维演化须显式要求**双侧可逆性（满射等距，`T2`）**（它不能由比较公理的条款 I–IV 与正性条件推出，过去完备是它的一个充分条件，见 [@ex-appe-bilateral-shift-model]），再结合强连续单参数群斯通定理（Stone 1932，`文献结果`，排除选择公理哈默尔基构造的时间不连续自同构）以及**选定具体自伴哈密顿量 $H$**（`T4` 动力学输入）导出薛定谔演化 $U(t) = e^{-itH/\hbar}$。
5. **公设五（复合系统复张量积 $\mathcal{H}_1 \otimes_{\mathbb{C}} \mathcal{H}_2$ 与费米子泡利外幂扇区 $\bigwedge^N\mathcal{H}$）**：两体规则包含两道完全不同的桥接条件——第一，为什么复合空间是无暗扇区的复张量积？必须补入**复局域层析极小性（Local Tomographic Minimality，`T2`）**（Hardy 2001；Chiribella–D'Ariano–Perinotti 2011，`文献结果`；实双比特与直和暗扇区反例见下框 [@ex-appe-qubit-cubic-and-tomography]）；第二，为什么全同费米子服从泡利不相容 $|\psi\rangle \wedge |\psi\rangle = 0$？在双粒子空间中，对称玻色态 $|\psi\rangle \otimes |\psi\rangle \in \mathrm{Sym}^2(\mathcal{H})$ 非零且同样合法——外幂反对易关系精确对应对称群 $S_N$ 的**奇符号表示分支（`T3` 交换统计分岔）**，其在 $3+1$ 维相对论局域量子场论中与半整数自旋的绑定由泡利自旋统计定理（Pauli 1940，`文献结果`）完成。
:::

::: {.example #ex-appe-qubit-cubic-and-tomography title="单比特奇三次标架函数反例与实双比特局域层析破缺（手工推导）"}
**手工推导。** 以下两个有限维算例精确锁定了公设二与公设五中 `T2` 操作假设的不可替代性：

1. **单比特光滑奇三次标架函数（证伪 $d = 2$ 仅靠正交投影可加性导出玻恩律）**：
   在布洛赫球面 $\mathbf{r} = (r_x, r_y, r_z) \in S^2$ 上，为每个秩一投影 $P_{\mathbf{r}} = \frac{1}{2}(I_2 + \mathbf{r}\cdot\boldsymbol{\sigma})$ 赋光滑函数

   $$
   f(P_{\mathbf{r}}) \;:=\; \frac{1}{2}\bigl(1 + r_z^3\bigr), \qquad f(0) := 0, \qquad f(I_2) := 1.
   $$

   因 $r_z \in [-1, 1]$，显然 $0 \le f(P_{\mathbf{r}}) \le 1$；且单比特上任意一组正交完备投影基必由对跖点对 $\{P_{\mathbf{r}}, P_{-\mathbf{r}}\}$ 构成，立得

   $$
   f(P_{\mathbf{r}}) + f(P_{-\mathbf{r}}) \;=\; \frac{1}{2}(1 + r_z^3) + \frac{1}{2}\bigl(1 + (-r_z)^3\bigr) \;=\; 1,
   $$

   即 $f$ 在单比特**全体正交投影基**上无懈可击地满足概率可加性，但因含非线性三次项 $r_z^3$ 而绝不能写成任何密度矩阵的线性迹配对 $\operatorname{Tr}(\rho P_{\mathbf{r}}) = \frac{1}{2}(1 + \mathbf{s}\cdot\mathbf{r})$！现在拿 $x\text{-}z$ 子午面上的三元对称三叉戟 POVM（trine POVM）$E_k = \frac{2}{3}P_{\mathbf{r}_k}$（$k = 1, 2, 3$）检验它，其中

   $$
   \mathbf{r}_1 = (0, 0, 1), \qquad \mathbf{r}_2 = \left(\tfrac{\sqrt{3}}{2},\, 0,\, -\tfrac{1}{2}\right), \qquad \mathbf{r}_3 = \left(-\tfrac{\sqrt{3}}{2},\, 0,\, -\tfrac{1}{2}\right), \qquad \sum_{k=1}^3 \mathbf{r}_k = \mathbf{0} \;\Longrightarrow\; \sum_{k=1}^3 E_k = I_2.
   $$

   若 $f$ 可延拓为效应上有限可加的概率泛函 $p$，可加性本身已给出有理齐次：由 $P_{\mathbf{r}} = 3\cdot\tfrac{1}{3}P_{\mathbf{r}}$ 得 $p(\tfrac{2}{3}P_{\mathbf{r}}) = \tfrac{2}{3}f(P_{\mathbf{r}})$，无须另设齐次或连续（`手工推导`），于是三项读数之和必须等于 $f(I_2) = 1$；然而直接代入 $r_{1,z}^3 = 1$ 与 $r_{2,z}^3 = r_{3,z}^3 = -\frac{1}{8}$ 却算出

   $$
   \sum_{k=1}^3 \frac{2}{3}\,f(P_{\mathbf{r}_k}) \;=\; \frac{2}{3}\left[1 + \frac{1}{2}\left(1 - \frac{1}{8}\right) + \frac{1}{2}\left(1 - \frac{1}{8}\right)\right] \;=\; \frac{2}{3}\left(1 + \frac{7}{16} + \frac{7}{16}\right) \;=\; \frac{5}{4} \;\neq\; 1!
   $$

   这一 $1.25 \neq 1$ 的精确破缺直观展示了 [@thm-busch-effect-density]（`effect_density_representation`）为何仅凭效应可加性就能一举封杀全部非线性标架函数。
2. **实双比特（two-rebit）反对称关联与直和暗扇区（证伪无局域层析假设时自动导出 $\mathcal{H}_1 \otimes_{\mathbb{C}} \mathcal{H}_2$）**：
   - *实量子力学局域层析破缺*：在实双比特空间 $\mathbb{R}^2 \otimes_{\mathbb{R}} \mathbb{R}^2 \cong \mathbb{R}^4$ 中，可观测量为实对称矩阵（维数 $\frac{4 \times 5}{2} = 10$），而单实比特实对称矩阵维数为 $\frac{2 \times 3}{2} = 3$，局域乘积可观测量仅张成 $3 \times 3 = 9 < 10$ 维！所缺的第 $10$ 维恰由双反对称生成元张量积

     $$
     W \;=\; J \otimes J, \qquad J = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}, \qquad W^{\mathsf{T}} = (-J) \otimes (-J) = J \otimes J = W \neq 0
     $$

     给出：对任意实对称局域可观测量 $A_1^{\mathsf{T}} = A_1,\; A_2^{\mathsf{T}} = A_2$，因反对称与对称矩阵乘积迹恒为零，恒有 $\operatorname{Tr}\bigl(W(A_1 \otimes A_2)\bigr) = \operatorname{Tr}(J A_1)\operatorname{Tr}(J A_2) = 0 \cdot 0 = 0$——全局正交态 $\rho_{\pm} = \frac{1}{4}(I_4 \pm W)$ 在一切局域乘积测量下完全隐身！而在复希尔伯特空间 $\mathbb{C}^d$ 上，厄米空间实维数满足 $(d_1 d_2)^2 = d_1^2 \cdot d_2^2$，局域层析严丝合缝。
   - *直和暗扇区非极小扩张*：若令复合空间取 $(\mathcal{H}_1 \otimes_{\mathbb{C}} \mathcal{H}_2) \oplus \mathcal{K}$（$\dim\mathcal{K} \ge 1$），并按迹归一延拓局域效应，$E \otimes F \mapsto (E \otimes F) \oplus \frac{\operatorname{Tr}E}{d_1}\frac{\operatorname{Tr}F}{d_2}\,\mathbf{1}_{\mathcal{K}}$（$d_i = \dim\mathcal{H}_i$；零延拓 $(A_1 \otimes A_2) \oplus 0_{\mathcal{K}}$ 会让单位测试在 $\mathcal{K}$ 上取零，破坏归一化），则完备乘积测试仍完备、$\mathcal{H}_1 \otimes_{\mathbb{C}} \mathcal{H}_2$ 上的权重原封不动，而支撑在暗扇区 $\mathcal{K}$ 上的每个态都只给出最大混合态 $\mathbf{1}/(d_1 d_2)$ 的乘积统计，$\mathcal{K}$ 中两个正交态无法被任何乘积测试区分（`手工推导`）。故必须联合**复标量结构与无冗余暗扇区的局域层析极小性（`T2`）**，才能唯一锁定 $\mathcal{H}_1 \otimes_{\mathbb{C}} \mathcal{H}_2$。
:::
