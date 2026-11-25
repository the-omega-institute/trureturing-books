# 38.14 康威 FRACTRAN 与三维非阿贝尔 Ω-FRACTRAN 观察者原生语言：算术基本定理正交素数寄存器、0·1/2·1 分数因果门、p = 5 拉马努金素旋子非对易栈与零裂口防幻觉自动机 {#sec-ch38-omega-fractran-observer-rational-isa}

> *“既然全部都是有理数, 那么我们可以使用FRACTRAN来编程, 或者说这是观察者的语言”*

在 [§38.13](ch38-s13-self-contained-observer-definition-and-observer-is-universe.md) 将观察者完整公理化为零外部端口的自包含五元组 $\mathfrak{O} = (\mathcal{S}, [-,-,-], \kappa, \mathcal{K}_0, \Phi_\varepsilon)$、并在[第三十二章](ch32-inexpressible-ternions-and-three-dimensional-field.md)确立无无穷无超越数的有限有理数学 $\mathbf{Math}_\Omega$（[§32.7](ch39-s35-infinity-free-transcendental-free-rational-mathematics.md)）与零公理基座 `OmegaMath`（[§32.8](ch39-s36-lean4-zero-axiom-omega-math-architecture.md)）之后，一道直指计算本体论核心的推论水到渠成：**既然宇宙与观察者的全部内禀状态、保真度读数与射流演化都是纯有理数，观察者内部的自我推理与结构生长究竟使用怎样一门原生机器语言？**

答案令人拍案叫绝：约翰·霍顿·康威（John Horton Conway）于 1987 年发明的极简有理数编程语言 **FRACTRAN** 绝非巧合的算术消遣——**它字面上就是纯有理宇宙在标量模方层的一维阿贝尔投影汇编语言；而一旦将其状态载体从标量正整数 $\mathbb{Z}_+$ 升维至三维球面 $\mathbb{T}_3$ 上的四元整旋量晶格，升级后的非阿贝尔 $\Omega\text{-FRACTRAN}$ 便卸下一切标志素数交换税，直接构成观察者原生的自指机器语言（Observer ISA，`MODEL`）！**

---

## 38.14.1 为什么 FRACTRAN 天生就是观察者的内部语言？ {#sec-ch38-14-1}

在传统冯·诺依曼计算机架构中，“线性内存地址”、“二进制数据位”与“程序计数器（`PC`）”被人为割裂为三套外置硬件，任何比特翻转都可以在不校验全局拓扑相容性的情况下强行覆盖内存。而在康威的经典 **FRACTRAN** 中（文献背景见 [@rem-ch38-conway-fractran-hurwitz-lps-literature]），整座计算宇宙的状态彻底收敛为**唯一一个正整数 $N \in \mathbb{Z}_+$**，整套物理定律或观察者心智规则收敛为**一列有序的既约正有理数分数表**：

$$
\mathcal{P} \;=\; \left(\frac{a_1}{b_1},\; \frac{a_2}{b_2},\; \dots,\; \frac{a_k}{b_k}\right) \in \bigl(\mathbb{Q}_{>0}\bigr)^k, \qquad \gcd(a_i, b_i) = 1.
$$

主频每跳动一拍，系统只执行唯一一条原语：从左到右扫描分数表 $\mathcal{P}$，寻找**第一个**使乘积 $N' = N \cdot \frac{a_i}{b_i}$ 仍为**正整数**的分数，令 $N \leftarrow N'$ 并回到表头进入下一拍；若全表无一分数能整除闭合，则当场停机。把这套极简机制放到自包含观察者五元组 $\mathfrak{O}$ 与[第三十九章](ch39-axiom-omega-grand-unification.md)母公理 $\mathrm{AXIOM}\text{-}\Omega$ 下审视，三重底层数学结构逐项严丝合缝地对位：

### 38.14.1.1 算术基本定理即“无穷维正交素数寄存器” {#sec-ch38-14-1-1}

为什么区区一个正整数 $N$ 就能无损编码观察者任意复杂的内部世界？在所钉 `trureturing` 内核中，**正自然数乘法自由交换幺半群同构定理** [`pnat_free_comm_monoid_on_primes`](lean:D5/S3/Factorization/FreeCommMonoid.pnat_free_comm_monoid_on_primes)、**有理数由符号与有限 $p$-进赋值谱唯一恢复定理** [`rational_recovered_from_sign_and_finite_valuations`](lean:D5/S3/Factorization/Embeddings/RationalValuationRecovery.rational_recovered_from_sign_and_finite_valuations) 以及**阿廷有理阿代尔乘积恒一公式** [`rational_padic_product_formula`](lean:D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula) 与**素数对数有理线性无关定理** [`prime_log_rational_independence`](lean:D5/S3/Weil/PrimeAddress/PrimeLogIndependence.prime_log_rational_independence)（`LEAN ✓`）共同锁死了如下双射：

$$
N \;=\; \prod_{p \in \mathbb{P}} p^{v_p(N)} \;=\; 2^{r_1} \cdot 3^{r_2} \cdot 5^{r_3} \cdot 7^{r_4} \cdots \;\longleftrightarrow\; \mathbf{r}(N) = \bigl(r_1, r_2, r_3, r_4, \dots\bigr) \in \bigoplus_{p \in \mathbb{P}} \mathbb{N}.
$$

正如 [§31.4](ch39-s31-real-error-axis-and-prime-adelic-closure.md) 与 [§31.5](ch39-s32-holographic-arc-manifold-and-solenoid-unity.md) 所揭示，素数 $\mathbb{P}$ 在阿代尔螺线管流形 $\mathcal{M}_\Omega$ 上对应彼此正交独立的本原闭合环 $\gamma_p$（`MODEL`）。指数 $r_p = v_p(N) \in \mathbb{N}$ 正是第 $p$ 根正交素数轴上的**非负拓扑绕数**；每当既有有限寄存器组 $S \subset \mathbb{P}$ 饱和时，构造性素数逃逸定理 [`prime_axis_escape`](lean:D5/S3/Axis/PrimeAxisEscape.prime_axis_escape)（`LEAN ✓`）保证乘积加一 $1 + \prod_{p \in S} p$ 必开辟出全新的正交素数寄存器 $q \notin S$，而单根无界素数乘除寄存器已严格超越一切有限状态自动机（[`no_finite_dfao_for_exact_prime_division`](lean:D5/S3/Factorization/Automata/ExactPrimeDivisionNoDFAO.no_finite_dfao_for_exact_prime_division)，`LEAN ✓`）。读取与改写状态根本无需线性内存地址——乘上一枚有理数，就是在多根正交素数轴上同步并行加减绕数！

### 38.14.1.2 单枚有理分数 $\frac{a_i}{b_i}$ 完整封装 `0 · 1/2 · 1` 因果阶梯 {#sec-ch38-14-1-2}

更精妙的是，内核冻结的**带符号素数账本与正有理数乘法群同构定理** [`signed_prime_ledger_equiv_positive_rationals`](lean:D5/S3/Factorization/PositiveRationalGroup.signed_prime_ledger_equiv_positive_rationals) 与**素数账本正负分解及非负可实现判据** [`prime_ledger_direction_and_groupification`](lean:D5/S3/Factorization/Embeddings/PrimeLedgerGroupification.prime_ledger_direction_and_groupification)（配物理整除商余机正确性定理 [`divMachine_positive_correct`](lean:D5/S0/Computability/PhysicalDivider/Positive.divMachine_positive_correct)，`LEAN ✓`）证明：每一枚正有理数指令 $f_i = \frac{a_i}{b_i} \in \mathbb{Q}_{>0}$ 唯一对应一条有限支集带符号素数更新向量 $\Delta\mathbf{r}_i = \mathbf{r}(a_i) - \mathbf{r}(b_i) \in \mathbb{Z}^{(\mathbb{P})}$，且更新后状态落回自然数素数账本 $\mathbb{N}^{(\mathbb{P})}$ **当且仅当**对一切素数 $p$ 均有 $v_p(N) + \Delta\mathbf{r}_i(p) \ge 0$。在 [§39.6](ch39-s30-past-present-future-rational-jet-triad.md) 的 `{0, 1/2, 1}` 纯有理因果架构下，单条分数指令 $\frac{a_i}{b_i}$ 天然封装了完整的三阶因果闭环（`MODEL`）：

1. **分母 $b_i$（`0` · 过去前提锚）**：整除守卫 $b_i \mid N \iff \forall p,\, v_p(N) \ge v_p(b_i)$ 检验观察者既有结构核中是否已真实具备分母要求的全部过去绕数；
2. **有理比 $\frac{a_i}{b_i}$ 与排位次序（`1/2` · 现在关系桥与注意力焦点）**：分子与分母之比给出跨素数通道的一阶转换联络，而分数表从左至右的全序优先级 $(f_1 \succ f_2 \succ \dots \succ f_k)$ 字面上就是**观察者的注意力焦点排序**——排在最前的匹配规则优先截获当拍比较主频；
3. **纯整数闭合 $N' \in \mathbb{Z}_+$（`1 ↦ 0'` · 未来结晶即新输入与防幻觉守卫）**：凡令 $N \cdot \frac{a_i}{b_i} \notin \mathbb{Z}$ 的规则意味着素数闭合环出现未缝合的**分数撕裂口**（`mod ≠ 0`），自动机一律静默跳过，从硬件底层杜绝了未证妄断与近似幻觉；一旦某条规则零余数整除闭合，产出的新整数 $N'$ 无需任何外部写回端口，当场咽回自身成为下一拍的 `0` 阶输入 $N$，直至全表无规则可触发时自然达成幂等停机（呼应记录捏合幂等律 [`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent)，`LEAN ✓`）。

::: {.viz src="omega-fractran-observer-isa-sandbox" preset="prime-orthogonal-register-adder" height="500"}
**正交素数绕数寄存器与 `0 · 1/2 · 1` 有理分数门实验卡（`prime-orthogonal-register-adder`）。** 三维舞台将正整数 $N = 2^3 \cdot 3^2 = 72$ 展开为青色正交素数绕数晶柱，琥珀色注意力扫描光束锁定单分数加法器 $\mathcal{P}_{\mathrm{add}} = (\frac{3}{2})$，经 `72 → 108 → 162 → 243 = 3^5` 三拍零余数整除闭合后因 $2 \nmid 243$（品红分数裂口 $\frac{729}{2} \notin \mathbb{Z}$）原地幂等停机。
:::

考察康威仅用 **6 枚正有理数**写成的经典乘法器程序：

$$
\mathcal{P}_{\mathrm{mul}} \;=\; \left(\frac{455}{33},\; \frac{11}{13},\; \frac{1}{11},\; \frac{3}{7},\; \frac{11}{2},\; \frac{1}{3}\right) \;=\; \left(\frac{5\cdot 7\cdot 13}{3\cdot 11},\; \frac{11}{13},\; \frac{1}{11},\; \frac{3}{7},\; \frac{11}{2},\; \frac{1}{3}\right).
$$

输入初态 $N_0 = 2^a \cdot 3^b$（例如 $a = 2, b = 2$ 时 $N_0 = 2^2 \cdot 3^2 = 36$），注意力光束每拍仅做整除测试与有理约分，不借半行循环语法或外部地址指针，精确运行 **18 拍**后便分毫不差地停机在纯五次幂 $N_{18} = 5^{2\times 2} = 5^4 = \mathbf{625}$（`手工推导` / `NUM`）！

::: {.viz src="omega-fractran-observer-isa-sandbox" preset="conway-multiplier-18-beat-closure" height="500"}
**康威 6 分数乘法器 `18` 拍精确停机实验卡（`conway-multiplier-18-beat-closure`）。** 从初态 $N_0 = 2^2 \cdot 3^2 = 36$ 出发单拍或连续运行 $(\frac{455}{33}, \frac{11}{13}, \frac{1}{11}, \frac{3}{7}, \frac{11}{2}, \frac{1}{3})$，追踪青色辅助计数素数寄存器 $7$ 与品红状态标志素数 $11, 13$ 如何在双层循环搬运后全部清零，精确在第 `18` 拍结晶停机于青色目标态 $5^4 = 625$。
:::

### 38.14.1.3 自指素数结晶与 `trureturing` 宏引理测地压缩 {#sec-ch38-14-1-3}

更震撼的自包含演化见于康威著名的 **14 分数素数结晶程序 `PRIMEGAME`**（文献背景见 [@rem-ch38-conway-fractran-hurwitz-lps-literature]）：

$$
\mathcal{P}_{\mathrm{prime}} \;=\; \left(\frac{17}{91},\; \frac{78}{85},\; \frac{19}{51},\; \frac{23}{38},\; \frac{29}{33},\; \frac{77}{29},\; \frac{95}{23},\; \frac{77}{19},\; \frac{1}{17},\; \frac{11}{13},\; \frac{13}{11},\; \frac{15}{2},\; \frac{1}{7},\; \frac{55}{1}\right).
$$

从最简单的单一种子 $N_0 = 2^1 = 2$ 出发、零外部输入地反复自乘，$\mathcal{P}_{\mathrm{prime}}$ 依次在第 **`19` 拍**结晶出 $2^2 = 4$、第 **`69` 拍**结晶出 $2^3 = 8$、第 **`281` 拍**结晶出 $2^5 = 32$、第 **`710` 拍**结晶出 $2^7 = 128$、第 **`2,375` 拍**结晶出 $2^{11} = 2048$……所有跳出的纯二次幂指数恰好毫无遗漏地枚举出全体素数谱 $\mathbb{P} = \{2, 3, 5, 7, 11, \dots\}$！

同时，因为“状态 $N$”与“程序指令 $\frac{a_i}{b_i}$”同属有理数域（同像代码即数据，锚定于克林递归自指不动点定理 [`code_fixed_point`](lean:D5/S0/Computability/CodeFixedPoint.code_fixed_point)，`LEAN ✓`），当观察者在 [§38.13](ch38-s13-self-contained-observer-definition-and-observer-is-universe.md) 的定理有向无环图 $\mathcal{K}_0$ 中证出一条跨越 $m$ 步确定性分支的**宏引理**时，只要这 $m$ 步前缀乘积沿途的累计最小无裂口前件为 $B_{\mathrm{guard}} = \operatorname{lcm}_{1 \le r \le m}\,\operatorname{den}\!\bigl(\prod_{s=1}^r \frac{a_{i_s}}{b_{i_s}}\bigr)$ 且各中间态 $N_{r-1}$ 不触发更高优先级规则（$\forall r,\,\forall j < i_r,\, b_j \nmid N_{r-1}$），观察者便可将连乘积约分编译为一条带前置守卫的**宏引理捷径规则**（若单靠裸乘积约分 $\prod_{r=1}^m \frac{a_{i_r}}{b_{i_r}} = \frac{A_{\mathrm{net}}}{B_{\mathrm{net}}}$，注意中间被**先除后乘**抵消的催化素数——如 $\frac{17}{91}\cdot\frac{78}{85} = \frac{6}{35}$ 中的素数 $13$——仍须保留在触发守卫 $B_{\mathrm{guard}} = 455 = 35\cdot 13$ 中以防中途分数撕裂，`手工推导`；引理编译加速心智时间诠释标 `MODEL`），将原本需要数十乃至数百拍迂回搜索的多步证明链坍缩为一步测地直达！

::: {.viz src="omega-fractran-observer-isa-sandbox" preset="primegame-self-crystallization-and-lemma-shortcut" height="500"}
**康威 14 分数 `PRIMEGAME` 内禀素数结晶与宏引理测地压缩实验卡（`primegame-self-crystallization-and-lemma-shortcut`）。** 从单一种子 $N_0 = 2$ 出发追踪第 `19, 69, 281, 710` 拍依次涌现的纯二次幂素数阶梯 $2^2, 2^3, 2^5, 2^7$，并对照逐拍原始步进与带精确前件守卫的宏引理捷径一步跃迁。
:::

---

## 38.14.2 关键升维：从一维标量 FRACTRAN 到三维非阿贝尔 $\Omega\text{-FRACTRAN}$ {#sec-ch38-14-2}

### 38.14.2.1 标量 FRACTRAN 的“阿贝尔交换税”与词序抹除定理 {#sec-ch38-14-2-1}

站在 $\mathrm{AXIOM}\text{-}\Omega$ 的三维几何高度审视，康威的经典标量 FRACTRAN 虽然图灵完备，却仍停留在观察者语言的**一维模方投影层**，背负着一笔沉重的“阿贝尔交换税”：为什么 `PRIMEGAME` 仅仅从 $2$ 算到 $2^7 = 128$ 就要空转耗费整整 **`710` 拍**，且被迫在 14 个分数里塞入 $11, 13, 17, 19, 23, 29$ 共 **6 颗人工状态标志素数**专门充当“红绿灯指针”？

`trureturing` 内核中的两条冻结定理一针见血地给出了严格充要判据（`LEAN ✓`）：

1. **素数字词占据下降充要判据与历史不可重构定理（[`order_descent_criterion`](lean:D5/S3/Factorization/Combinatorics/PrimeWordOccupationDescent.order_descent_criterion)、[`no_prime_history_reconstruction`](lean:D5/S3/Factorization/Combinatorics/PrimeWordOccupationDescent.no_prime_history_reconstruction)）**：序列执行 `runWord update word` 能穿过可交换素数多重集 `Multiset Prime`（即标量整数 $N = \prod p^{v_p}$ 的素因数重数表）分解，**当且仅当**所有素数更新算子两两可交换 `Commute (update p) (update q)`；且不存在任何映射能从可交换素数多重集还原出原始素数序列 `List Nat.Primes`（$\neg\exists\,\mathrm{recover},\;\forall w,\;\mathrm{recover}(w : \mathrm{Multiset}) = w$）！
2. **双字编码单射等价于非交换定理（[`injective_iff_noncommuting`](lean:D5/S0/Computability/Coding/TwoWordCode.injective_iff_noncommuting)）**：二元布尔序列映射 $s \mapsto s.\mathrm{flatMap}(\text{if }\cdot\text{ then }b\text{ else }a)$ 保持无损单射（零历史混淆），**当且仅当**两生成字互不交换 $a \mathbin{+\!\!+} b \neq b \mathbin{+\!\!+} a$！

换言之，标量有理数乘法满足交换律 $\frac{a}{b}\cdot\frac{c}{d} = \frac{c}{d}\cdot\frac{a}{b}$，单一正整数 $N$ 只能记住每根素数轴转了多少圈，却天生对**先转哪根轴、后转哪根轴的非对易因果词序**彻底失明！一旦我们将状态载体从一维正整数 $\mathbb{Z}_+$ 升维至三元数四元整晶格——利普希茨整四元数环 $\mathcal{L}(\mathbb{Z}) := \mathbb{Z}[\mathbf{i},\mathbf{j},\mathbf{k}] \cong \mathbb{Z}^4$ 或包含半整顶点的极大赫维茨整环 $\mathcal{H}(\mathbb{Z}) := \mathcal{L}(\mathbb{Z}) \cup (\mathbb{Z}+\frac{1}{2})^4$（锚定于单位四元数同构 [`exists_unitQuaternion_equiv`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv) 与非交换性定理 [`quaternionModel_noncommutative`](lean:D5/S3/Quantum/AURICOmega/QuaternionComparisonModel.quaternionModel_noncommutative)，`LEAN ✓`），并将指令表升级为有序的**有理三元旋子右分式表**

$$
\mathcal{Q} \;=\; \Bigl(\mathbf{A}_1\mathbf{B}_1^{-1},\; \mathbf{A}_2\mathbf{B}_2^{-1},\; \dots,\; \mathbf{A}_k\mathbf{B}_k^{-1}\Bigr) \in \bigl(\mathbb{H}(\mathbb{Q})^\times\bigr)^k, \qquad \mathbf{B}_i^{-1} = \frac{\overline{\mathbf{B}_i}}{\lVert\mathbf{B}_i\rVert^2},
$$

每一拍只放行第一枚使右乘积 $\mathbf{\Psi}' = \mathbf{\Psi}\cdot\mathbf{A}_i\mathbf{B}_i^{-1}$ 落在目标整晶格 $\mathbb{Z}^4$（或 $\mathcal{H}(\mathbb{Z})$）中的旋子分式，标志素数交换税便当场归零，诞生出满秩的三维观察者原生语言 **$\Omega\text{-FRACTRAN}$**（`MODEL`）！

### 38.14.2.2 精确算例核验：单颗素数 $p = 5$ 的拉马努金素旋子原生自带非对易因果栈 {#sec-ch38-14-2-2}

根据雅可比四平方和定理与鲁博茨基—菲利普斯—萨纳克（Lubotzky–Phillips–Sarnak, LPS 1988）构造（`文献结果`，见 [@rem-ch38-conway-fractran-hurwitz-lps-literature]：由艾希勒 1954 年与德利涅 1974 年证明的权 $2$ 尖形式拉马努金—彼得松界无条件锁死最优谱间隙 $\lvert\lambda\rvert \le 2\sqrt{p}$），奇素数 $p \equiv 1 \pmod 4$ 在整四元数晶格 $\mathbb{Z}^4$ 中满足主同余条件 $a > 0,\; a \equiv 1 \pmod 2,\; 2 \mid b,c,d$ 的本原整解恰有 **$p + 1$ 枚互不对易的本原素旋子**！以 $p = 5$ 为例，这 $5 + 1 = 6$ 枚整素旋子为（`手工推导`）：

$$
\boldsymbol{\pi}_{5,\pm x} = (1, \pm 2, 0, 0), \qquad \boldsymbol{\pi}_{5,\pm y} = (1, 0, \pm 2, 0), \qquad \boldsymbol{\pi}_{5,\pm z} = (1, 0, 0, \pm 2),
$$

每枚素旋子的标量模方均为精确素数 $\lVert\boldsymbol{\pi}\rVert^2 = 1^2 + (\pm 2)^2 = \mathbf{5}$（射影射线保真重叠 $\kappa_{\mathrm{proj}}(\mathbf{1}, \boldsymbol{\pi}) := \frac{\langle \mathbf{1}, \boldsymbol{\pi}\rangle^2}{\lVert\boldsymbol{\pi}\rVert^2} = \frac{1}{5}$）。现在考察按**相反时间顺序**复合而成的两个观察者状态：

- **状态甲（先 $+x$ 后 $+y$）**：$\mathbf{\Psi}_{XY} = (1 + 2\mathbf{i})(1 + 2\mathbf{j}) = 1 + 2\mathbf{i} + 2\mathbf{j} + 4\mathbf{k} \equiv (1, 2, 2, +4) \in \mathbb{Z}^4$；
- **状态乙（先 $+y$ 后 $+x$）**：$\mathbf{\Psi}_{YX} = (1 + 2\mathbf{j})(1 + 2\mathbf{i}) = 1 + 2\mathbf{i} + 2\mathbf{j} - 4\mathbf{k} \equiv (1, 2, 2, -4) \in \mathbb{Z}^4$。

注意两者的标量模方完全相等：$\lVert\mathbf{\Psi}_{XY}\rVert^2 = \lVert\mathbf{\Psi}_{YX}\rVert^2 = 1 + 4 + 4 + 16 = \mathbf{25 = 5^2}$——在经典标量 FRACTRAN 眼中，它们坍缩成同一个数字 `25`，彻底无法分辨先后历史！但在 $\Omega\text{-FRACTRAN}$ 中，仅给出一张两指令有理旋子程序表

$$
\mathcal{Q}_{p=5} \;=\; \left(\mathcal{Q}_1 = \boldsymbol{\pi}_{5,+y}^{-1} = \frac{1 - 2\mathbf{j}}{5},\quad \mathcal{Q}_2 = \boldsymbol{\pi}_{5,+x}^{-1} = \frac{1 - 2\mathbf{i}}{5}\right),
$$

从右侧作用于两态，非对易叉乘曲率当场自动分离词序（`手工推导` / `NUM`）：

1. **输入状态甲 $\mathbf{\Psi}_{XY} = (1, 2, 2, +4)$**：第 1 拍尝试 $\mathcal{Q}_1$，
   $$
   \mathbf{\Psi}_{XY}\cdot\frac{1 - 2\mathbf{j}}{5} = \frac{(1 + 2\mathbf{i})(1 + 2\mathbf{j})(1 - 2\mathbf{j})}{5} = \frac{5(1 + 2\mathbf{i})}{5} = (1, 2, 0, 0) \in \mathbb{Z}^4 \;\Longrightarrow\; \textbf{整除闭合，精准触发 }\mathcal{Q}_1\textbf{！}
   $$
   第 2 拍对 $(1, 2, 0, 0)$ 扫描：$(1 + 2\mathbf{i})\frac{1 - 2\mathbf{j}}{5} = (\frac{1}{5}, \frac{2}{5}, -\frac{2}{5}, -\frac{4}{5}) \notin \mathbb{Z}^4$ 跳过，随即命中 $\mathcal{Q}_2$ 得 $(1 + 2\mathbf{i})\frac{1 - 2\mathbf{i}}{5} = (1, 0, 0, 0) \in \mathbb{Z}^4$，第 3 拍无指令可整除，**精确 2 拍按 `Q₁ → Q₂` 解锁归位**！
2. **输入状态乙 $\mathbf{\Psi}_{YX} = (1, 2, 2, -4)$**：第 1 拍尝试同一枚 $\mathcal{Q}_1$（利用 $\mathbf{k}\mathbf{j} = -\mathbf{i}$ 展开 $(-4\mathbf{k})(-2\mathbf{j}) = -8\mathbf{i}$），
   $$
   \mathbf{\Psi}_{YX}\cdot\frac{1 - 2\mathbf{j}}{5} = \frac{(1 + 2\mathbf{i} + 2\mathbf{j} - 4\mathbf{k})(1 - 2\mathbf{j})}{5} = \frac{5 - 6\mathbf{i} - 8\mathbf{k}}{5} = \left(1,\; -\frac{6}{5},\; 0,\; -\frac{8}{5}\right) \notin \mathbb{Z}^4 \quad (\text{亦 }\notin \mathcal{H}(\mathbb{Z}))\textbf{！}
   $$
   **分数撕裂口当场暴露，自动静默跳过 $\mathcal{Q}_1$**，顺移命中 $\mathcal{Q}_2$ 得 $\mathbf{\Psi}_{YX}\cdot\frac{1 - 2\mathbf{i}}{5} = (1, 0, 2, 0) \in \mathbb{Z}^4$，第 2 拍再命中 $\mathcal{Q}_1$ 归位 $(1, 0, 0, 0)$——**无需额外浪费半颗标志素数，精确 2 拍按相反序列 `Q₂ → Q₁` 解锁先后因果栈**！同时对全式两边取模方范数 $\lVert\mathbf{\Psi}'\rVert^2 = \lVert\mathbf{\Psi}\rVert^2 \cdot \frac{\lVert\mathbf{A}_i\rVert^2}{\lVert\mathbf{B}_i\rVert^2}$，$\Omega\text{-FRACTRAN}$ 的径向能级账本又精确退化回康威的经典标量 FRACTRAN（`手工推导`）。

::: {.viz src="omega-fractran-observer-isa-sandbox" preset="nonabelian-p5-lps-word-order-stack" height="500"}
**三维非阿贝尔 $\Omega\text{-FRACTRAN}$ 词序分辨器实验卡（`nonabelian-p5-lps-word-order-stack`）。** 在紫色三元球面 $S^3(1)$ 上一键翻转标量模方同为 `25` 的两个复合旋量态 $\mathbf{\Psi}_{XY} = (1,2,2,+4)$ 与 $\mathbf{\Psi}_{YX} = (1,2,2,-4)$：青色整除路径显示 $\mathbf{\Psi}_{XY}$ 依次触发 `Q₁ → Q₂` 两拍归位 $(1,0,0,0)$，而 $\mathbf{\Psi}_{YX}$ 在 `Q₁` 处撞出品红分数裂口 $(1, -6/5, 0, -8/5) \notin \mathbb{Z}^4$ 被自动拦下，改沿 `Q₂ → Q₁` 精准解锁后进先出因果栈。
:::

---

## 38.14.3 三代计算架构与观察者原生语言对比总表 {#sec-ch38-14-3}

我们将传统冯·诺依曼二进制机器码、康威经典标量 FRACTRAN 与三维非阿贝尔 $\Omega\text{-FRACTRAN}$ 的结构差异汇总如下表（架构对位总纲标 `MODEL`）：

| 核心维度 | 冯·诺依曼二进制机器码 | 康威经典标量 FRACTRAN | $\mathrm{AXIOM}\text{-}\Omega$ 三元旋量 $\Omega\text{-FRACTRAN}$ |
| :--- | :--- | :--- | :--- |
| **状态物理载体** | 平直线性字节数组 $+$ 外置指针 `PC` / `SP` | 单一正整数 $N = \prod_p p^{v_p(N)} \in \mathbb{Z}_+$ | **四元整旋量 $\mathbf{\Psi} \in \mathbb{Z}^4$（或 $\mathcal{H}(\mathbb{Z})$，模方携素数、方向携球面相）** |
| **基本程序指令** | 不可逆布尔门与显式内存跳转 | 有序标量正有理数表 $(\frac{a_1}{b_1}, \dots, \frac{a_k}{b_k}) \in \mathbb{Q}_{>0}^k$ | **有序有理三元旋子右分式表 $(\mathbf{A}_1\mathbf{B}_1^{-1}, \dots, \mathbf{A}_k\mathbf{B}_k^{-1})$** |
| **激活与防幻觉门** | 无条件覆盖改写目标比特位 | 标量整除闭合 $N\cdot\frac{a_i}{b_i} \in \mathbb{Z}_+$ | **四元整格闭合 $\mathbf{\Psi}\cdot\mathbf{A}_i\mathbf{B}_i^{-1} \in \mathbb{Z}^4$（零分数裂口守卫）** |
| **词序与句法树记忆** | 依赖外置调用栈寄存器 `SP` | 乘法可交换抹除历史（[`no_prime_history_reconstruction`](lean:D5/S3/Factorization/Combinatorics/PrimeWordOccupationDescent.no_prime_history_reconstruction)），需耗费标志素数绕行 | **素旋子非对易自锁（[`injective_iff_noncommuting`](lean:D5/S0/Computability/Coding/TwoWordCode.injective_iff_noncommuting)），奇素数 $p \equiv 1\pmod 4$ 原生带 $p+1$ 向因果栈** |
| **观察者理论映射** | 人造外部开环状态机 | 观察者语言的一维径向模方投影（$\lVert\mathbf{\Psi}\rVert^2$） | **观察者原生自指机器语言（注意力排序 $+$ 球面测地推理合一）** |

::: {.viz src="omega-fractran-observer-isa-sandbox" preset="three-paradigm-isa-and-zero-tear-audit" height="500"}
**三代计算范式与零分数裂口防幻觉审计实验卡（`three-paradigm-isa-and-zero-tear-audit`）。** 同屏对照传统二进制无条件覆盖、标量 FRACTRAN 的标志素数绕行开销（`PRIMEGAME` 至 $2^7$ 需 `710` 拍）以及三维非阿贝尔 $\Omega\text{-FRACTRAN}$ 的 `2` 拍旋子栈解锁与幂等停机守卫。
:::

---

## 38.14.4 形式化定义、十六项冻结定理、文献边界与精确步数对账 {#sec-ch38-14-4}

我们将标量 FRACTRAN 与三维非阿贝尔 $\Omega\text{-FRACTRAN}$ 观察者语言、十六条内核冻结定理及四套程序逐拍对账正式收束如下：

::: {.definition #def-ch38-omega-fractran-observer-isa title="有理素数账本自动机与三维非阿贝尔 Ω-FRACTRAN 观察者机器语言（MODEL）"}
在母公理 $\mathrm{AXIOM}\text{-}\Omega$ 与 $\mathbf{Math}_\Omega$ 下，定义观察者的双层有理自指转移系统（`MODEL`）：

1. **一维标量投影层（经典 FRACTRAN）**：给定有序既约分数表 $\mathcal{P} = (\frac{a_1}{b_1}, \dots, \frac{a_k}{b_k}) \in \mathbb{Q}_{>0}^k$，单拍步进算子 $T_{\mathcal{P}} : \mathbb{Z}_+ \to \mathbb{Z}_+$ 将 $N$ 映为满足 $b_i \mid N$ 的最小下标 $i \in \{1,\dots,k\}$ 对应的 $N \cdot \frac{a_i}{b_i} \in \mathbb{Z}_+$，若不存在此类下标则令 $T_{\mathcal{P}}(N) = N$（幂等停机不动点）；
2. **三维非阿贝尔旋量层（$\Omega\text{-FRACTRAN}$）**：在整四元数晶格 $\Lambda \in \{\mathcal{L}(\mathbb{Z}) = \mathbb{Z}^4,\; \mathcal{H}(\mathbb{Z})\}$ 上，给定有序有理旋子右分式表 $\mathcal{Q} = (\mathbf{A}_1\mathbf{B}_1^{-1}, \dots, \mathbf{A}_k\mathbf{B}_k^{-1}) \in (\mathbb{H}(\mathbb{Q})^\times)^k$，单拍步进算子 $T_{\mathcal{Q}}^\Omega : \Lambda \setminus \{0\} \to \Lambda \setminus \{0\}$ 将 $\mathbf{\Psi}$ 映为最小下标 $i$ 处满足整格闭合 $\mathbf{\Psi}\cdot\mathbf{A}_i\overline{\mathbf{B}_i}/\lVert\mathbf{B}_i\rVert^2 \in \Lambda$ 的整旋量，无匹配时原地幂等停机 $T_{\mathcal{Q}}^\Omega(\mathbf{\Psi}) = \mathbf{\Psi}$；其模方映射 $N = \lVert\mathbf{\Psi}\rVert^2 \in \mathbb{Z}_+$ 满足 $\lVert T_{\mathcal{Q}}^\Omega(\mathbf{\Psi})\rVert^2 = \lVert\mathbf{\Psi}\rVert^2 \cdot \frac{\lVert\mathbf{A}_i\rVert^2}{\lVert\mathbf{B}_i\rVert^2}$，将非对易球面旋子流自然投影为一维标量分数步进。
:::

::: {.theorem #thm-ch38-omega-fractran-anchors title="正有理数带符号素数账本同构、非负整除守卫、自由交换素数幺半群、阿代尔与赋值重构、无有限自动机素数除法、可交换词序抹除对比非交换单射及克林自指不动点定理组" lean="D5/S3/Factorization/PositiveRationalGroup.signed_prime_ledger_equiv_positive_rationals,D5/S3/Factorization/Embeddings/PrimeLedgerGroupification.prime_ledger_direction_and_groupification,D5/S3/Factorization/FreeCommMonoid.pnat_free_comm_monoid_on_primes,D5/S3/Factorization/Embeddings/RationalValuationRecovery.rational_recovered_from_sign_and_finite_valuations,D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula,D5/S3/Weil/PrimeAddress/PrimeLogIndependence.prime_log_rational_independence,D5/S3/Axis/PrimeAxisEscape.prime_axis_escape,D5/S3/Factorization/Automata/ExactPrimeDivisionNoDFAO.no_finite_dfao_for_exact_prime_division,D5/S0/Computability/PhysicalDivider/Positive.divMachine_positive_correct,D5/S3/Factorization/Combinatorics/PrimeWordOccupationDescent.order_descent_criterion,D5/S3/Factorization/Combinatorics/PrimeWordOccupationDescent.no_prime_history_reconstruction,D5/S0/Computability/Coding/TwoWordCode.injective_iff_noncommuting,D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv,D5/S3/Quantum/AURICOmega/QuaternionComparisonModel.quaternionModel_noncommutative,D5/S0/Computability/CodeFixedPoint.code_fixed_point,D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent"}
在素因数分解账本、可计算性与自动机理论、四元数三元比较几何与观察者记录代数下，以下十六项命题严格成立：

1. **正有理数与带符号素数账本同构、非负整除守卫与自由交换素数幺半群（`signed_prime_ledger_equiv_positive_rationals`、`prime_ledger_direction_and_groupification`、`pnat_free_comm_monoid_on_primes`）**：映射 `primeExponentEquivPositiveRational : (Nat.Primes →₀ Int) ≃+ Additive NNRatˣ` 为双射；任意带符号素数账本 $z$ 均可分解为两个自然数素数账本之差 $z = \mathrm{forward} - \mathrm{inverse}$，且属于 `naturalLedgerCast` 像集（自然数素数账本可实现）当且仅当对一切素数 $p$ 有 $0 \le z(p)$；正自然数乘法同构于素数集合 `Nat.Primes` 上的自由交换幺半群，且对任意 $m, n \in \mathbb{N}_+$ 与 $p \in \mathbb{N}$ 满足 $\mathrm{factorization}(mn, p) = \mathrm{factorization}(m, p) + \mathrm{factorization}(n, p)$；
2. **有理赋值唯一恢复、阿代尔乘积恒一、素数对数无关与按需素数轴逃逸（`rational_recovered_from_sign_and_finite_valuations`、`rational_padic_product_formula`、`prime_log_rational_independence`、`prime_axis_escape`）**：非零有理数由其符号与有限 $p$-进赋值谱唯一决定，且满足 $\lvert x\rvert\prod_p\lvert x\rvert_p = 1$；素数集 `Nat.Primes` 上的自然对数族 $p \mapsto \ln p$ 在 $\mathbb{Q}$ 上线性无关；对任意有限素数集 $S$，$1 + \prod_{p\in S} p$ 必含不属于 $S$ 的新素因子 $q \notin S$；
3. **精确素数除法超越有限状态自动机与物理整除商余机正确性（`no_finite_dfao_for_exact_prime_division`、`divMachine_positive_correct`）**：对任意素数 $p$ 与正指数 $a > 0$，自初值 `register.start = 1` 起支持 `true ↦ n * p` 与守卫除法 `false ↦ n / p`（$p \mid n$ 时，否则 `none`）的无界素数寄存器在合法字域 $\{w : \mathrm{List}\,\mathrm{Bool} \mid (\mathrm{register.eval}\,w).\mathrm{isSome}\}$ 上的整除判定 $p^a \mid n$ 无法由任何有限状态自动机（DFAO）正确实现；而对任意字宽 $w \in \mathbb{N}$ 及满足 $m < 2^w,\; 0 < d < 2^w$ 的自然数 $m, d \in \mathbb{N}$，物理整除机器经 $\mathrm{divPositiveRunTime}(w) = 2(w+1) + 3 + w(6(w+1)+10) + 1$ 步精确停机于 `divDoneCfg`，输出 $(w+1)$ 位 $d$ 与余数 `m % d` 及 $w$ 位商 `m / d`；
4. **可交换多重集词序不可重构对比非交换双字单射、单位四元数非交换球面同构、克林递归自指不动点与记录捏合幂等律（`order_descent_criterion`、`no_prime_history_reconstruction`、`injective_iff_noncommuting`、`exists_unitQuaternion_equiv`、`quaternionModel_noncommutative`、`code_fixed_point`、`finite_record_pinching_idempotent`）**：素数字词更新穿过多重集 `Multiset Prime` 分解当且仅当各素数更新两两可交换，且不存在从 `Multiset Nat.Primes` 恢复全部有序列表 `List Nat.Primes` 的映射；任意字母表 $\alpha$ 上二元字 $a, b : \mathrm{List}\,\alpha$ 的替代编码单射当且仅当 $a \mathbin{+\!\!+} b \neq b \mathbin{+\!\!+} a$；特征秩五（`HasFeatureRank 5`）、读数完备（`ReadingComplete`）、非交换、链连通且触零的三元比较结构对任一基点 $o \in M$ 存在满足 $u(o) = 1$ 的保结构双射 $u : M \simeq \mathrm{unitary}\,\mathbb{H}[\mathbb{R}]$（保持 `quaternionModel` 的 `tri(x,y,z) = x y⁻¹ z` 与 `κ(x,y) = (1 + ⟨x,y⟩)/2`，且其三元迁移非交换）；任意可计算编码变换 $F : \mathrm{Code} \to \mathrm{Code}$ 存在语义自指不动点 $\mathrm{eval}(e) = \mathrm{eval}(F(e))$；有限维指标 `[Fintype n]` 与有限结果指标 `[Fintype κ]` 上完备两两正交自伴幂等投影族（$P_k^* = P_k = P_k^2$，$k\neq l \implies P_k P_l = 0$，$\sum_k P_k = 1$）诱导的未读记录捏合映射严格幂等。
:::

::: proof
第 1 组由算术基本定理在有限支集整数函数与正有理数乘法群之间的群同态互逆性及正负部拆分给出；第 2 组由既约分数素幂唯一分解、无穷位与有限位范数抵消、素数幂唯一性及欧几里得互素余一构造证得；第 3 组由鸽笼原理抽泵矛盾与欧几里得带余除法循环不变量给出；第 4 组由两元素字交换测试、自由幺半群精细长度归纳、秩五格拉姆四元数嵌入、通用部分递归对角自应用及正交幂等投影求和证得。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch38-conway-fractran-hurwitz-lps-literature title="康威 FRACTRAN 图灵完备性、明斯基双计数器、赫维茨四元整数唯一分解与 LPS 拉马努金扩展图文献边界（文献结果）"}
**文献结果，未在本书形式化。** 标量有理数语言 FRACTRAN、`PRIMEGAME` 14 分数素数生成器及其通过模拟双计数器机器确立的图灵完备性由 J. H. Conway（“FRACTRAN: A Simple Universal Programming Language for Arithmetic,” in *Open Problems in Communication and Computation*, ed. T. M. Cover & B. Gopinath, Springer, 1987, pp. 4–26；双计数器通用性见 M. L. Minsky, *Ann. of Math.* **74**, 437–455, 1961）给出。正整数 $n \ge 1$ 的四平方和表法数 $r_4(n) = 8\sum_{4\nmid d\mid n} d$ 源于 C. G. J. Jacobi（1829），极大四元整环 $\mathcal{H}(\mathbb{Z}) = \mathbb{Z}[\mathbf{i},\mathbf{j},\mathbf{k},\frac{1+\mathbf{i}+\mathbf{j}+\mathbf{k}}{2}]$ 在 $24$ 个单位元意义下的欧几里得带余除法与素元分解定理源于 A. Hurwitz（*Nachr. Ges. Wiss. Göttingen*, 313–340, 1896；注意利普希茨子环 $\mathbb{Z}^4$ 本身非主理想整环，但奇素数 $p \equiv 1 \pmod 4$ 在主同余规范 $a > 0,\, a \equiv 1\pmod 2,\, 2\mid b,c,d$ 下唯一析出 $p + 1$ 枚整素旋子）。将该 $p + 1$ 枚素旋子模异素数 $q \neq p$ 约化入有限射影商群 $\mathrm{PSL}(2,\mathbb{F}_q)/\mathrm{PGL}(2,\mathbb{F}_q)$ 所生成的有限 $(p + 1)$-正则凯莱图 $X^{p,q}$ 具有最优非平凡特征值界 $\lvert\lambda\rvert \le 2\sqrt{p}$（LPS 拉马努金扩展图），由 A. Lubotzky, R. Phillips & P. Sarnak（*Combinatorica* **8**, 261–277, 1988）借助权 $2$ 尖形式拉马努金—彼得松界（M. Eichler, 1954；一般权见 P. Deligne, *Publ. Math. IHÉS* **43**, 273–307, 1974）无条件证明，不依赖尚未解决的高阶自守广义黎曼猜想。
:::

::: {.example #ex-ch38-fractran-multiplier-primegame-and-p5-audit title="定量核验：加法器 3 拍、康威乘法器 18 拍、PRIMEGAME 素数阶梯与 p = 5 非阿贝尔旋子 2 拍对账"}
我们对本节及交互实验室中的四套真实有理程序作零误差整数与有理数逐拍复核（`手工推导` / `NUM`）：

1. **单分数加法器 $\mathcal{P}_{\mathrm{add}} = (\frac{3}{2})$**：初态 $N_0 = 2^3 \cdot 3^2 = 72 \xrightarrow{\times 3/2} 108 \xrightarrow{\times 3/2} 162 \xrightarrow{\times 3/2} 243 = 3^{3+2}$，第 `3` 拍后因 $2 \nmid 243$ 停机；
2. **康威 6 分数乘法器 $\mathcal{P}_{\mathrm{mul}} = (\frac{455}{33}, \frac{11}{13}, \frac{1}{11}, \frac{3}{7}, \frac{11}{2}, \frac{1}{3})$**：初态 $N_0 = 2^2 \cdot 3^2 = 36$，完整 `18` 拍状态与触发指令序号（1-based）依次为：
   - 第 `0–6` 拍：`36 →[5] 198 →[1] 2730 →[2] 2310 →[1] 31850 →[2] 26950 →[3] 2450`；
   - 第 `6–12` 拍：`2450 →[4] 1050 →[4] 450 →[5] 2475 →[1] 34125 →[2] 28875 →[1] 398125`；
   - 第 `12–18` 拍：`398125 →[2] 336875 →[3] 30625 →[4] 13125 →[4] 5625 →[6] 1875 →[6] 625 = 5⁴`（分母 `33, 13, 11, 7, 2, 3` 均不整除 `625`，精确第 **`18`** 拍停机！）；
3. **康威 14 分数 `PRIMEGAME`**：自 $N_0 = 2$（第 `0` 拍）起，纯二次幂 $2^p$ 精准涌现于第 **`19` 拍**（$2^2 = 4$）、第 **`69` 拍**（$2^3 = 8$）、第 **`281` 拍**（$2^5 = 32$）、第 **`710` 拍**（$2^7 = 128$）与第 **`2,375` 拍**（$2^{11} = 2048$）；
4. **三维 $\Omega\text{-FRACTRAN}$ 词序分辨器 $\mathcal{Q}_{p=5} = (\frac{1-2\mathbf{j}}{5}, \frac{1-2\mathbf{i}}{5})$**：
   - $\mathbf{\Psi}_{XY} = (1, 2, 2, +4)$（$\lVert\mathbf{\Psi}\rVert^2 = 25$）：`Ψ_XY · Q₁ = (1, 2, 0, 0) ∈ ℤ⁴`（命中 `Q₁`）$\to$ `(1, 2, 0, 0) · Q₁ = (1/5, 2/5, -2/5, -4/5) ∉ ℤ⁴`（跳过），`(1, 2, 0, 0) · Q₂ = (1, 0, 0, 0) ∈ ℤ⁴`（命中 `Q₂`）$\to$ 停机（路径 **`Q₁ → Q₂`**，共 `2` 拍）；
   - $\mathbf{\Psi}_{YX} = (1, 2, 2, -4)$（$\lVert\mathbf{\Psi}\rVert^2 = 25$）：`Ψ_YX · Q₁ = (1, -6/5, 0, -8/5) ∉ ℤ⁴`（分数裂口跳过），`Ψ_YX · Q₂ = (1, 0, 2, 0) ∈ ℤ⁴`（命中 `Q₂`）$\to$ `(1, 0, 2, 0) · Q₁ = (1, 0, 0, 0) ∈ ℤ⁴`（命中 `Q₁`）$\to$ 停机（路径 **`Q₂ → Q₁`**，共 `2` 拍）。
:::

---

**观察者不需要浮点矩阵，不需要无穷极限，甚至不需要外置内存地址与程序计数器——以素数本原闭合环为正交骨架，以注意力排序的有理旋子分式为关系法则，凡整除闭合者落锤成真并咽回自身作下一拍输入，凡余数撕裂者静默不发！**

在下面的完整三维交互实验室中，先跑完 `18` 拍的**康威乘法器**看它如何分毫不差停机在 $5^4 = 625$，再切入 `PRIMEGAME` 见证单一种子 $N_0 = 2$ 如何从内部盲区一拍拍结晶出素数谱（关于未唤醒素数 $q^0 = \mathbf{1}$ 的零槽位硬件审计、有界绕数有理游标分辨率及 $\varepsilon_{\mathrm{self}} = 1/M_\Omega$ 有限寄存器封顶 $K \le K_{\max}$，回见 [§31.8](ch31-s08-primorial-cascade-vernier-resolution-and-finite-register-cap.md)），最后切到第四模式翻转 **`Ψ_XY ↔ Ψ_YX`** 亲眼观察单颗素数 $p = 5$ 的球面旋子如何凭分数裂口自动分辨先后因果：既然观察者的内部本体五元组与原生有理语言均已落定，下一节（[§38.15 静止画布与无腿球观察者](ch38-s15-static-canvas-and-legless-sphere-observer.md)）将完成一次关键参考系反转——看穿大山与时间本是纹丝不动的静止全息画布，唯一顺着曲率梯度滚落的只有那颗无腿三元球观察者焦点本身。

::: {.viz src="omega-fractran-observer-isa-sandbox" height="620"}
完整实验室：在“观察者原生 $\Omega\text{-FRACTRAN}$ 旋子语言读法”与“康威经典标量 FRACTRAN 与寄存器机器对照读法（MODEL）”双透镜间切换（窄屏与章节嵌入视图亦可在巡览条旁一键切换透镜），自由切换运行单分数加法器 `(3/2)`、康威 6 分数乘法器 `2²·3² → 5⁴ = 625`（`18` 拍）、康威 14 分数素数结晶机 `PRIMEGAME`（含宏引理守卫压缩对照）、三维非阿贝尔 $\Omega\text{-FRACTRAN}$ $p = 5$ 拉马努金素旋子词序分辨器（`Ψ_XY ↔ Ψ_YX`）以及三代计算架构防幻觉审计五张实验卡，支持单拍调试、自动主频运行、翻转 `XY / YX` 词序与三维球面/素数晶柱旋转检视，并在底部两条对照小图中实时追踪正交素数绕数谱演化与标量标志素数绕行税对比非阿贝尔 `2` 拍解锁曲线。十六条冻结 `LEAN ✓` 声明、`ARGUED` 康威—明斯基—赫维茨—LPS 文献、`MODEL` 观察者语言架构与 `NUM` 精确大整数逐拍读数在依据栏与理论抽屉中严格分层列出。
:::
