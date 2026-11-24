# 23.5 从二次型到四元数范数球面：$\mathbb{Z}$ 在 $\mathbb{Q}$ 中的可定义性全景 {#sec-ch23-3}

现在，让我们回答本章题记提出的那个核心问题：**如何把这种“用范数与迹锁定离散整数”的几何机制，从二元二次型推广到四维四元数代数，从而在有理数域 $\mathbb{Q}$ 的内部一阶定义出整数集 $\mathbb{Z}$？**

在二元二次型 $x^2 + xy + y^2$ 或 $x^2 - 5y^2$ 中，元素生活在二维平面（复二次域或实二次域）里；而取非零有理参数 $a, b \in \mathbb{Q}^\times$，在有理数域 $\mathbb{Q}$ 上构造的四维**四元数代数**（quaternion algebra）

$$
H_{a, b}(\mathbb{Q}) \;=\; \mathbb{Q} \oplus \mathbb{Q}\mathbf{i} \oplus \mathbb{Q}\mathbf{j} \oplus \mathbb{Q}\mathbf{k} \qquad (\mathbf{i}^2 = a,\; \mathbf{j}^2 = b,\; \mathbf{i}\mathbf{j} = -\mathbf{j}\mathbf{i} = \mathbf{k})
$$

中，每一个四元数 $\alpha = x_0 + x_1\mathbf{i} + x_2\mathbf{j} + x_3\mathbf{k} \in H_{a,b}(\mathbb{Q})$ 同样拥有**约化迹（reduced trace）**与**约化范数（reduced norm）**：

$$
\operatorname{Trd}(\alpha) = \alpha + \bar{\alpha} = 2x_0, \qquad
\operatorname{Nrd}(\alpha) = \alpha\bar{\alpha} = x_0^2 - a x_1^2 - b x_2^2 + ab x_3^2.
$$

::: {.figure src="ch23-quaternion-norm"}
**四维里还是同一把锁。** 取 $a = b = -1$（哈密顿四元数），$\operatorname{Nrd}(\alpha) = x_0^2 + x_1^2 + x_2^2 + x_3^2$。横轴是标量部 $x_0$（迹的一半），纵轴是向量部长度 $\lvert v\rvert$；四个青色半圆是 $\operatorname{Nrd} = 1, 2, 3, 4$，点旁的数是落在该点的整四元数个数，四个半圆上分别共 $8, 24, 32, 24$ 个（穷举计数）。半圆之间没有点，迹 $\operatorname{Trd} = 2x_0$ 只取 $-4$ 到 $4$ 的偶数。
:::

四元数约化范数 $\operatorname{Nrd}(\alpha)$ 如何在 $\mathbb{Q}$ 上完成局部—整体锁定，以及纯存在（$\exists$）、纯全称（$\forall$）与全称—存在（$\forall\exists$）三类一阶量词前缀之间的界限，先见下文文献注记（[@rem-diophantine-z-in-q-literature]）。其中，$\mathbb{Z}$ 在 $\mathbb{Q}$ 中是否具有纯存在 $\exists$ 定义仍是开放问题。在 §23.5.1 中，我们将围绕赫维茨—利普希茨范数球面、希尔伯特符号分歧互反与有理凯莱范数一迹锁给出显式推导与精确见证。

::: {.remark #rem-diophantine-z-in-q-literature title="Koenigsmann (2016) 在 ℚ 中一阶定义 ℤ 的量词结构、四元数范数锁与希尔伯特第十问题边界审计（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 四元数约化范数 $\operatorname{Nrd}(\alpha)$ 之所以能胜任二元二次型做不到的全局锁定工作，核心依赖两条代数数论机制：(a) **Hasse–Minkowski 局部—整体原理与有限素数分歧集**——四元二次型在 $\mathbb{Q}$ 上有非零零点，当且仅当它在 $\mathbb{R}$ 与每个 $p$-进数域 $\mathbb{Q}_p$ 上都有非零零点。调节非零参数 $(a, b)$ 所得到的分歧集受互反律约束；例如取 $a, b > 0$，代数在实处分裂，有限素数分歧集 $\Delta_{a,b}$ 的基数为偶数。(b) **二次互反律与迹和遍历素数锁**——在 Poonen（2009）的构造中，取有理范数一元素的约化迹集 $S_{a,b}$，再将两个迹相加并加入有限个整数平移，所得 $T_{a,b}$ 恰为 $\bigcap_{p \in \Delta_{a,b}} \mathbb{Z}_{(p)}$；这里沿用 $a, b > 0$ 的实处分裂条件。遍历这族参数便能覆盖每个素数的整性锁，经 $\bigcap_{p \text{ prime}} \mathbb{Z}_{(p)} = \mathbb{Z}$ 合拢为全局整数集。这条局部—整体路线贯穿 Robinson（1949）、Poonen（2009）与 Koenigsmann（2016）的研究脉络。关于该研究脉络、量词复杂度及与 [§23.4](ch23-s04-eisenstein-and-golden-pell.md) 四个冻结 Lean 定理的严格边界如下：

1. **概念澄清：丢番图定义（$\exists$）与一般一阶可定义性（$\forall, \forall\exists, \dots$）的严格区分**：
   - 在数理逻辑与算术几何中，域 $K$ 的一个子集 $S \subseteq K$ 称为在 $K$ 中是**丢番图的（Diophantine，即存在性可定义的 $\exists$）**，是指存在整系数（或 $K$-系数）多项式 $P(t, x_1, \dots, x_m)$，使得

     $$
     t \in S \quad\Longleftrightarrow\quad \exists x_1, \dots, x_m \in K,\; P(t, x_1, \dots, x_m) = 0.
     $$

   - 若定义公式允许同时使用全称量词 $\forall$ 与存在量词 $\exists$，则称为在域语言中的**一阶可定义（first-order definable）**。日常口语有时将“用多项式方程加量词刻画 $\mathbb{Z} \subset \mathbb{Q}$”宽泛地统称为“丢番图可定义性研究”，但在严格学术意义上，**量词前缀是决定可计算性命运的分水岭**：由于 Matiyasevich–Robinson–Davis–Putnam 定理（1970）已证明整数环上的希尔伯特第十问题 $\mathrm{H10}(\mathbb{Z})$（判定整系数多项式方程是否有整数解）不可判定，一旦 $\mathbb{Z}$ 在 $\mathbb{Q}$ 中拥有纯存在性（$\Sigma_1$，即 $\exists$）丢番图定义，就立即可以将 $\mathrm{H10}(\mathbb{Z})$ 归约为有理数域上的希尔伯特第十问题 $\mathrm{H10}(\mathbb{Q})$，从而直接证明 $\mathrm{H10}(\mathbb{Q})$ 不可判定！相反，正如 Bjorn Poonen 在综述《*Mazur's work relating logic and arithmetic geometry*》中所阐明的，算术几何中著名的 **Mazur 实拓扑猜想**（断言任意 $\mathbb{Q}$-代数簇的有理点集 $V(\mathbb{Q})$ 在实点空间 $V(\mathbb{R})$ 中的拓扑闭包只有有限多个连通分支）一旦成立，反而会**直接排除** $\mathbb{Z}$ 在 $\mathbb{Q}$ 中存在纯存在性（$\exists$）丢番图定义的可能（因为离散无限集 $\mathbb{Z} \subset \mathbb{R}$ 拥有无穷多个实连通分支）！**直到今天，“$\mathbb{Z}$ 在 $\mathbb{Q}$ 中是否是纯存在性（$\exists$）丢番图的”以及“$\mathrm{H10}(\mathbb{Q})$ 是否可判定”仍然是尚未解决的重大开放问题（`OPEN`）。**
2. **从 Robinson (1949)、Poonen (2009) 到 Koenigsmann (2016) 及后续工作的精确量词压缩脉络**：
   - **Julia Robinson（1949，*Journal of Symbolic Logic* 14(2), 98–114，〈Definability and decision problems in arithmetic〉）**：首次证明 $\mathbb{Z}$ 在 $\mathbb{Q}$ 中是一阶可定义的，其公式利用二次型局部—整体原理构造，量词复杂度为 $\Pi_3$（即 $\forall\exists\forall$，交替三层量词）；
   - **Bjorn Poonen（2009，*American Journal of Mathematics* 131(3), 675–682，〈Characterizing integers among rational numbers with a universal-existential formula〉）**：引入四元数代数的约化范数与迹条件，将定义 $\mathbb{Z} \subset \mathbb{Q}$ 的量词前缀大幅压缩至 $\Pi_2$（即 $\forall^2\exists^7$，仅含 $2$ 个全称量词与 $7$ 个存在量词）；
   - **Jochen Koenigsmann（2016，*Annals of Mathematics* 183(1), 73–93，〈Defining $\mathbb{Z}$ in $\mathbb{Q}$〉，[arXiv:1011.3424](https://arxiv.org/abs/1011.3424)）**：利用四元数代数与四元二次范数型、Hasse–Minkowski 局部—整体原理、**Jacobson 根（Jacobson radical）的存在性可定义性**（其证明 §2 Step 3 的核心技巧）以及二次互反律，建立了**两项彼此独立的核心定理**：
     1. **Theorem 1（$\mathbb{Z} \subset \mathbb{Q}$ 的纯全称 $\Pi_1$ 定义 / $\mathbb{Q} \setminus \mathbb{Z}$ 的存在性 $\Sigma_1$ 丢番图定义）**：证明了非整数补集 $\mathbb{Q} \setminus \mathbb{Z}$ 在 $\mathbb{Q}$ 中是丢番图的（$\Sigma_1$；这一定义的 $418$ 变量计数沿用早期预印本 [arXiv:1011.3424v1](https://arxiv.org/abs/1011.3424v1)，其中明列下述全称公式）；在允许不等号 $\neq$（即等号之否定）的标准一阶环语言中直接取否定，等价于证明 **$\mathbb{Z}$ 在 $\mathbb{Q}$ 中是纯全称（$\Pi_1$，仅含一层全称量词）可定义的**：

        $$
        t \in \mathbb{Z} \quad\Longleftrightarrow\quad \forall x_1, \dots, x_{418} \in \mathbb{Q},\; g(t, x_1, \dots, x_{418}) \neq 0.
        $$

     2. **Corollary 21（单全称量词 $\forall^1\exists$ 算术压缩构造）**：并非靠将 $\neq 0$ 作语法改写，而是通过另一套独立的算术编码将素数局部条件打包进单个全称变量，证明了 $\mathbb{Z}$ 在 $\mathbb{Q}$ 中可由**仅含 $1$ 个全称量词**的 $\forall\exists$ 公式（形如 $\forall y\,\exists z_1, \dots, \exists z_M$）一阶定义。
   - **后续具名文献进展（Dittmann 2018；Daans 2021；Zhang–Sun 2022；Daans 2023/2024）**：
     1. **Philip Dittmann（2018，*Compositio Mathematica* 154(4), 761–772，〈Irreducibility of polynomials over global fields is Diophantine〉，[10.1112/S0010437X17007977](https://doi.org/10.1112/S0010437X17007977)，[arXiv:1601.07829](https://arxiv.org/abs/1601.07829)）**：将范数—迹方法推广到素数次数的中心单代数，结合局部—整体原理与类域论，证明了全局域上多项式不可约性是丢番图的；
     2. **Nicolas Daans（2021，*Documenta Mathematica* 26, 1851–1869，〈Universally defining finitely generated subrings of global fields〉，[10.4171/dm/858](https://doi.org/10.4171/dm/858)，[arXiv:1812.04372](https://arxiv.org/abs/1812.04372)）**：建立了全局域有限生成子环在其分式域中的纯全称定义，并将定义 $\mathbb{Z} \subset \mathbb{Q}$ 所需的全称量词个数压缩至 **$37$ 个**（$\forall^{37}$）；
     3. **张耿瑞与孙智伟（Geng-Rui Zhang and Zhi-Wei Sun，2022，*Bulletin of the Polish Academy of Sciences: Mathematics* 70(2), 93–106，〈$\mathbb{Q}\setminus\mathbb{Z}$ is diophantine over $\mathbb{Q}$ with $32$ unknowns〉，[10.4064/ba221231-19-3](https://doi.org/10.4064/ba221231-19-3)，[arXiv:2104.02520](https://arxiv.org/abs/2104.02520)）**：证明了 $\mathbb{Q} \setminus \mathbb{Z}$ 在 $\mathbb{Q}$ 上可用 $32$ 个未知量给出丢番图（$\Sigma_1$）定义，等价地将 $\mathbb{Z}$ 在 $\mathbb{Q}$ 中的纯全称定义压缩至 **$32$ 个全称量词**（$\forall^{32}$）；
     4. **Nicolas Daans（2023 预印本 / 2024，*Journal of the London Mathematical Society* 109(2), e12864，〈Universally defining $\mathbb{Z}$ in $\mathbb{Q}$ with $10$ quantifiers〉，[10.1112/jlms.12864](https://doi.org/10.1112/jlms.12864)，[arXiv:2301.02107](https://arxiv.org/abs/2301.02107)）**：结合二次型范数方程与精化的局部—整体互反律，将 $\mathbb{Z}$ 在 $\mathbb{Q}$ 中的纯全称（$\Pi_1$）定义大幅压缩至**仅需 $10$ 个全称量词**（$\forall^{10}$）。这些工作推进了全称（$\Pi_1$）与 $\forall\exists$（$\Pi_2$）可定义性的边界，但均未宣称解决 $\mathbb{Z} \subset \mathbb{Q}$ 的存在性（$\Sigma_1$）丢番图定义问题。
3. **§23.4 四个冻结 Lean 定理的精确认领边界**：[§23.4](ch23-s04-eisenstein-and-golden-pell.md) 经 Lean 内核验证的四个正式条目——[@thm-qform-eq-eisnorm]（`Qform_eq_eisNorm`）、[@lem-qform-discriminant]（`Qform_discriminant`）、[@cor-qform-range-eq-eisnorm]（`Qform_range_eq_eisNorm`）与 [@prop-pell-form-eq-four-mul-norm]（`pell_form_eq_four_mul_norm`）——证明的是整数环 $\mathbb{Z}$ 上 $\Delta = -3$ 艾森斯坦交越范数型的幺模剪切不变性、值域等同以及 $\Delta = +5$ 黄金整数环的佩尔迹—范数恒等式。它们以具体、完全形式化的二次代数范数锁展示了“迹投影与二次范数如何锁定离散整数格”的核心代数机制，**并不构成 Koenigsmann (2016) 关于 $\mathbb{Z} \subset \mathbb{Q}$ 一阶可定义性定理的形式化证明**。
:::

## 23.5.1 赫维茨—利普希茨范数球面、希尔伯特符号分歧互反与有理凯莱范数一迹锁 {#sec-ch23-5-hurwitz-jacobi-hilbert-ramification-trace-locks}

上述局部—整体算术锁如何在具体而透明的精确算例中逐层展开——从单个四维整序的球面计数与欧氏覆盖半径，经过局部希尔伯特符号的分歧互反，直到由有限族实分裂代数的有理凯莱迹逐素数筛去既约分母中的素因子？以下三节按此递进路线给出核心书面推导与代表性精确见证，区分本节书面论证（`ARGUED`）、所引经典文献定理（[Serre 1973](https://api.crossref.org/works/10.1007/978-1-4684-9884-4)、[Conway & Smith 2003](https://api.crossref.org/works/10.1201/9781439864180)、[Poonen 2009](https://api.crossref.org/works/10.1353/ajm.0.0057)、[Koenigsmann 2016](https://arxiv.org/abs/1011.3424)、[Voight 2021](https://api.crossref.org/works/10.1007/978-3-030-56694-4) 与 [Daans 2024](https://arxiv.org/abs/2301.02107)）及配套档案中的有限计算检验（`NUM`）。

### 23.5.1.1 利普希茨格 $\mathcal{L}$ 与赫维茨极大序 $\mathcal{H}$：雅可比四平方律、半整奇范数律与覆盖半径 {#sec-ch23-5-1-lipschitz-hurwitz-jacobi}

取 $a = b = -1$，记利普希茨整数序为 $\mathcal{L} = \mathbb{Z} + \mathbb{Z}\mathbf{i} + \mathbb{Z}\mathbf{j} + \mathbb{Z}\mathbf{k}$，记赫维茨极大序为 $\mathcal{H} = \mathcal{L} \cup \bigl(\mathcal{L} + h\bigr)$，其中 $h = \frac{1 + \mathbf{i} + \mathbf{j} + \mathbf{k}}{2}$。在倍坐标 $2\alpha \in \mathbb{Z}^4$ 下，$\mathcal{H}$ 的两个陪集分别对应四坐标全偶与四坐标全奇，且首倍坐标恰等于约化迹 $\operatorname{Trd}(\alpha)$。因任意奇数的平方均满足 $(2k + 1)^2 \equiv 1 \pmod 8$，四个奇数平方之和恒满足 $\sum_{j=0}^3 (2k_j + 1)^2 \equiv 4 \pmod 8$，除以 $4$ 后必余 $1 \pmod 2$——故**每一枚严格半整赫维茨四元数的约化范数必为奇数**。

记正整数 $n$ 的奇因子和为 $\sigma_{\mathrm{odd}}(n) = \sum_{d \mid n,\; 2 \nmid d} d$；按经典雅可比四平方定理（[Voight 2021](https://api.crossref.org/works/10.1007/978-3-030-56694-4)，式 $(1.4.2)$），利普希茨范数球面点数为 $r_4(n) = 8 \sum_{d \mid n,\; 4 \nmid d} d$（写作 $n = 2^s m$ 且 $m$ 为奇数时，当 $s = 0$ 得 $8\sigma(m)$，当 $s \ge 1$ 得 $24\sigma(m)$）。进一步，右乘 $1 + \mathbf{i}$ 将 $(w, x, y, z)$ 映至 $(w - x, w + x, y + z, z - y)$，把约化范数加倍并把 $\mathcal{H}$ 的两个陪集一并映入 $\mathcal{L}$；反之，对任一 $\beta \in \mathcal{L}$ 且满足 $\operatorname{Nrd}(\beta) = 2n$，其四个整坐标之和为偶数，因而前后两对坐标和具有相同奇偶性，故逆映射 $\beta \mapsto \beta(1 - \mathbf{i})/2$ 的四个分量同为整数或同为半整数而严格落回 $\mathcal{H}$。该双射结合雅可比定理直接推出对一切正整数 $n \ge 1$ 恒有

$$
r_{\mathcal{H}}(n) \;=\; r_4(2n) \;=\; 24\,\sigma_{\mathrm{odd}}(n), \qquad \frac{r_{\mathcal{H}}(n)}{r_4(n)} \;=\; \begin{cases} 3, & 2 \nmid n, \\ 1, & 2 \mid n. \end{cases}
$$

下表对照 $n = 1, \dots, 8$ 的球面计数（与前图 `ch23-quaternion-norm` 中 $n = 1, 2, 3, 4$ 的 $8, 24, 32, 24$ 精确吻合，配套档案已穷举核验至 $n = 24$）：

| $n$ | $r_4(n)$ | $r_{\mathcal{H}}(n)$ | $r_{\mathcal{H}}(n)/r_4(n)$ |
| --------: | --------------: | ----------------------: | ------------------------: |
| $1$ | $8$ | $24$ | $3$ |
| $2$ | $24$ | $24$ | $1$ |
| $3$ | $32$ | $96$ | $3$ |
| $4$ | $24$ | $24$ | $1$ |
| $5$ | $48$ | $144$ | $3$ |
| $6$ | $96$ | $96$ | $1$ |
| $7$ | $64$ | $192$ | $3$ |
| $8$ | $24$ | $24$ | $1$ |

在迹分布上，$\mathcal{L}$ 仅取偶约化迹，而 $\mathcal{H}$ 在奇数范数处补出奇约化迹：在 $n = 1$ 上，$8$ 枚利普希茨单位元（四元数群 $Q_8$）按 $\operatorname{Trd} \in \{-2, 0, 2\}$ 分布为 $1, 6, 1$，而 $24$ 枚赫维茨单位元（二元四面体群 $\mathcal{H}^\times \cong Q_8 \rtimes C_3 \cong 2T$，其中 $(-1 + \mathbf{i} + \mathbf{j} + \mathbf{k})/2$ 阶为 $3$ 且共轭轮换三虚轴）按 $\operatorname{Trd} \in \{-2, -1, 0, 1, 2\}$ 分布为 $1, 8, 6, 8, 1$；在 $n = 3$ 上，$\mathcal{L}$ 按 $\operatorname{Trd} \in \{-2, 0, 2\}$ 分布为 $12, 8, 12$，而 $\mathcal{H}$ 按 $\operatorname{Trd} \in \{-3, -2, -1, 0, 1, 2, 3\}$ 分布为 $8, 12, 24, 8, 24, 12, 8$；在偶数范数 $n = 2, 4$ 上两序迹直方图完全一致（$n = 2$ 按 $\operatorname{Trd} \in \{-2, 0, 2\}$ 为 $6, 12, 6$；$n = 4$ 按 $\operatorname{Trd} \in \{-4, -2, 0, 2, 4\}$ 为 $1, 8, 6, 8, 1$）。以 $\{1, \mathbf{i}, \mathbf{j}, h\}$ 为基，共轭迹配对格拉姆矩阵行列式为 $2^4 (1/2)^2 = 4$，故 $\mathcal{H}$ 的约化判别式等于 $2$，与代数判别式一致，确认 $\mathcal{H}$ 为极大序（[Voight 2021](https://api.crossref.org/works/10.1007/978-3-030-56694-4)，§§11.2–11.3；[Conway & Smith 2003](https://api.crossref.org/works/10.1201/9781439864180)）。

两序在算术可除性上的分水岭来自四维欧氏覆盖半径：对任一实四元组，记各分量到最近整数的距离为 $d_j \in [0, 1/2]$，则到整陪集与半整陪集的欧氏距离平方分别为 $A = \sum_{j=0}^3 d_j^2$ 与 $B = \sum_{j=0}^3 (1/2 - d_j)^2$。由初等不等式 $d^2 + (1/2 - d)^2 \le 1/4$ 即证上界 $\min(A, B) \le (A + B)/2 \le 1/2$，且于 $(1/2, 1/2, 0, 0)$ 处取得等号 $A = B = 1/2$（配套档案核验其 $8$ 个最近赫维茨格点为 $0, 1, \mathbf{i}, 1 + \mathbf{i}$ 及 $(1 + \mathbf{i} \pm \mathbf{j} \pm \mathbf{k})/2$），从而 $\mathcal{H}$ 的精确覆盖半径为 $\sqrt{1/2}$（档案 Arb 包络四舍五入至六位小数为 $0.707107$），按范数乘性在左右两侧均成立余项范数不超过除数范数一半的欧几里得带余除法；相反，由 $A \le 1$ 并在 $h$ 处取等，得 $\mathcal{L}$ 的覆盖半径为 $1$，令被除数为 $1 + \mathbf{i} + \mathbf{j} + \mathbf{k}$、除数为 $2$ 时，任何利普希茨余项的范数均不小于 $4 = \operatorname{Nrd}(2)$，带余除法失效。映射 $(w, x, y, z) \mapsto (w + x, w - x, y + z, y - z)$ 按 $\sqrt{2}$ 倍缩放将 $\mathcal{H}$ 映为根格 $D_4 = \{u \in \mathbb{Z}^4 : \sum u_j \equiv 0 \pmod 2\}$，故 $\mathcal{H}$ 的余体积为 $2/(\sqrt{2})^4 = 1/2$（而 $\mathcal{L}$ 的余体积为 $1$）；两格最短非零向量长度均为 $1$（装球半径 $1/2$），结合四维球体积公式 $\frac{\pi^2}{2} r^4$，四维球装填密度精确为 $\Delta(\mathcal{H}) = \frac{\pi^2}{16}$（与 $D_4$ 相同，档案包络四舍五入至六位小数为 $0.616850$）对比 $\Delta(\mathcal{L}) = \frac{\pi^2}{32}$（四舍五入至六位小数为 $0.308425$），密度之比精确为 $2$。

### 23.5.1.2 局部希尔伯特符号、分歧互反偶性、显式分裂同构与正定艾希勒质量 {#sec-ch23-5-2-hilbert-symbols-ramification-splitting}

对任意非零有理数对 $(a, b) \in (\mathbb{Q}^\times)^2$，四元数代数 $H_{a,b}(\mathbb{Q})$ 在位 $v$ 分裂当且仅当局部希尔伯特符号 $(a, b)_v = +1$（[Serre 1973](https://api.crossref.org/works/10.1007/978-1-4684-9884-4)，Ch. III；[Voight 2021](https://api.crossref.org/works/10.1007/978-3-030-56694-4)，§§12.4、14.2）。在实位 $\infty$ 上，$(a, b)_\infty = -1$ 当且仅当 $a < 0$ 且 $b < 0$；在素数 $p$ 处，写作 $a = p^m u$、$b = p^n v$，其中局部 $p$-进单位为 $u, v$，则奇素数 $p$ 处的局部符号由 $u, v$ 模 $p$ 约化后的勒让德符号给出：

$$
(a, b)_p \;=\; (-1)^{m n (p - 1)/2}\left(\frac{u}{p}\right)^n \left(\frac{v}{p}\right)^m,
$$

而在 $p = 2$ 处有 $(a, b)_2 = (-1)^e$，其中指数 $e = \frac{(u - 1)(v - 1)}{4} + m\frac{v^2 - 1}{8} + n\frac{u^2 - 1}{8}$ 按模 $2$ 读取。对任意奇素数 $p$，只要 $v_p(a) = v_p(b) = 0$（当 $a, b \in \mathbb{Z} \setminus \{0\}$ 时等价于 $p \nmid ab$），恒有 $(a, b)_p = +1$；由有理平方类上的双线性性，在生成元 $-1, 2$ 及正奇素数上逐对验算二次互反律与两条补充律，即得经典**希尔伯特互反律** $\prod_v (a, b)_v = +1$，故分歧位集 $\Delta_{a,b} = \{v : (a, b)_v = -1\}$ 恒有限且基数为偶数（记有限分歧素数之积为约化判别式 $D_{a,b} = \prod_{p \in \Delta_{a,b} \setminus \{\infty\}} p$）。三类典型呈现一目了然地展现这一偶性约束：哈密顿正定呈现 $(-1, -1)$ 恰在 $\Delta_{-1,-1} = \{2, \infty\}$ 分歧（$D = 2$）；实分裂分歧呈现 $(2, 3)$ 在实处分裂、在 $p = 2, 3$ 处各取符号 $-1$（$\Delta_{2,3} = \{2, 3\}$，$D = 6$），在模 $16$ 与模 $9$ 上均无本原范数零点，从初等同余层直接独立证实两处局部各向异性（因任意非零 $p$-进范数零点皆可缩放为本原 $p$-进整向量）；而全域分裂呈现 $(2, 7)$ 在全部位取 $+1$（$\Delta_{2,7} = \emptyset$，$D = 1$）。配套档案进一步给出了覆盖这三类的全部 $13$ 组四元数呈现的希尔伯特符号表及全部 $17$ 处有限分歧位的模幂本原零点穷举核验（本原零点数均为 $0$）。

对于全域分裂呈现 $(2, 7)$（以及同构的分裂呈现 $(3, 13)$ 与 $(5, 11)$），取整数 $c = 3$（另两例取 $c = 4$）均满足 $c^2 = a + b$，直接给出本原整范数零点 $(c, 1, 1, 0)$ 及显式有理矩阵同构 $\phi : H_{a,b}(\mathbb{Q}) \xrightarrow{\sim} M_2(\mathbb{Q})$：

$$
\phi(\mathbf{i}) \;=\; I \;=\; \begin{pmatrix} 0 & a \\ 1 & 0 \end{pmatrix}, \qquad \phi(\mathbf{j}) \;=\; J \;=\; \begin{pmatrix} c & -a \\ 1 & -c \end{pmatrix}, \qquad \phi(\mathbf{k}) \;=\; I J \;=\; \begin{pmatrix} a & -ac \\ c & -a \end{pmatrix}.
$$

直接矩阵乘法验得 $I^2 = a E$、$J^2 = (c^2 - a)E = b E$ 与 $I J = -J I$；基 $\{E, I, J, I J\}$ 按行展开的 $4 \times 4$ 变换行列式为 $4ab$（三例依次为 $56, 156, 220 \neq 0$），且对符号四元数 $x_0 + x_1\mathbf{i} + x_2\mathbf{j} + x_3\mathbf{k}$ 恒有 $\operatorname{Tr}(\phi(\alpha)) = 2x_0 = \operatorname{Trd}(\alpha)$ 与 $\det(\phi(\alpha)) = \operatorname{Nrd}(\alpha)$。此外，对 $\mathbb{Q}$ 上约化判别式为 $D$ 的正定四元数代数中的极大序，按右理想类 $[I]$ 求和并记左序 $\mathcal{O}_L(I) = \{x \in H_{a,b}(\mathbb{Q}) : x I \subseteq I\}$，文献中的艾希勒质量公式（[Voight 2021](https://api.crossref.org/works/10.1007/978-3-030-56694-4)，Theorem 25.3.15）给出 $\sum_{[I]} \lvert\mathcal{O}_L(I)^\times / \{\pm 1\}\rvert^{-1} = \frac{1}{12}\prod_{p \mid D}(p - 1)$；在 $D = 2, 3, 5$ 对应的 $(-1, -1)$、$(-1, -3)$ 与 $(-2, -5)$ 处分别得精确质量 $\frac{1}{12}, \frac{1}{6}, \frac{1}{3}$（档案 Arb 包络四舍五入至六位小数分别为 $0.083333, 0.166667, 0.333333$）。档案在三处分别验证了三组显式范数一有限乘法群的乘法封闭性：$D = 2$ 的 $24$ 枚赫维茨单位元；$D = 3$ 中取 $u = \mathbf{j}$（$u^2 = -3$），由 $6$ 阶范数一元 $(1 + u)/2$ 与 $\mathbf{i}$ 共同生成的 $12$ 阶群；以及 $D = 5$ 中取 $u = (\mathbf{i} + \mathbf{k})/2$（$u^2 = -3$），单由 $(1 + u)/2$ 生成的 $6$ 阶群。对任一有限群 $G \subset H_{a,b}^1(\mathbb{Q})$ 与任一满 $\mathbb{Z}$-格 $\Lambda_0$，和格 $\Lambda = \sum_{g \in G} g\Lambda_0$ 为 $G$-不变满格，故 $G$ 必落于左序 $\mathcal{O}_L(\Lambda)$ 进而包含于某个极大序的单位群中；配合文献中 $D = 2, 3, 5$ 处极大序类数为 $1$ 的分类结果（[Voight 2021](https://api.crossref.org/works/10.1007/978-3-030-56694-4)，Table 25.4.4），三组单位群模 $\{\pm 1\}$ 的阶数 $12, 6, 3$（完整阶数 $24, 12, 6$）恰好耗尽全部质量。

### 23.5.1.3 广义有理凯莱参数化、亨泽尔 $p$-进迹锁证明与有限素数筛交集 {#sec-ch23-5-3-cayley-trace-locks-and-sieve}

为了把上述局部—整体分歧机制写成显式有理公式，考虑 [@rem-diophantine-z-in-q-literature] 引入的有理范数一迹集 $S_{a,b} = \{\operatorname{Trd}(\alpha) : \alpha \in H_{a,b}^1(\mathbb{Q})\}$。对任意纯四元数 $v = x_1\mathbf{i} + x_2\mathbf{j} + x_3\mathbf{k} \in H_{a,b}^0(\mathbb{Q})$，记 $N = \operatorname{Nrd}(v) = -a x_1^2 - b x_2^2 + ab x_3^2$。由 $v^2 = -N$ 得 $(1 - v)(1 + v) = 1 + N$，故在定义域 $1 + N \neq 0$ 上，**广义有理凯莱图卡**给出范数一元素及其约化迹的纯四则有理式：

$$
\alpha(v) \;=\; (1 + v)(1 - v)^{-1} \;=\; \frac{1 - N + 2v}{1 + N}, \qquad \operatorname{Nrd}(\alpha(v)) \;=\; \frac{(1 - N)^2 + 4N}{(1 + N)^2} \;=\; 1, \qquad \operatorname{Trd}(\alpha(v)) \;=\; \frac{2(1 - N)}{1 + N}.
$$

反之，对任一满足 $\alpha + 1$ 可逆（即 $\operatorname{Nrd}(\alpha + 1) = 2 + \operatorname{Trd}(\alpha) \neq 0$）的范数一元 $\alpha$，$v = (\alpha - 1)(\alpha + 1)^{-1}$ 为纯四元数；当 $H_{a,b}(\mathbb{Q})$ 为除法代数（如一切具有非空分歧集的代数）时，$1 + N(v) = \operatorname{Nrd}(1 - v)$ 在全体有理纯四元数上恒非零，且图卡补集仅含单点 $-1$（因 $\operatorname{Trd}(\alpha) = -2$ 迫使 $(\alpha + 1)^2 = 0$，无零因子即得 $\alpha = -1$）。

由此可给出一记完全自包含的**分歧素数迹整性锁证明**（[Poonen 2009](https://api.crossref.org/works/10.1353/ajm.0.0057)，Lemma 2.1）：设有限分歧素数 $p \in \Delta_{a,b} \setminus \{\infty\}$ 使 $H_{a,b}(\mathbb{Q}_p)$ 为除法代数，先对任意局部范数一元 $\alpha \in H_{a,b}^1(\mathbb{Q}_p)$ 记 $t = \operatorname{Trd}(\alpha)$，则 $\alpha$ 满足二次方程 $X^2 - t X + 1 = 0$。若反设 $v_p(t) < 0$，则 $f(X) = X^2 - (1 - 4/t^2) \in \mathbb{Z}_p[X]$ 在初值 $X_0 = 1$ 处满足 $v_p(f(1)) = 2 v_p(2) - 2 v_p(t) > 2 v_p(2) = 2 v_p(f'(1))$，按亨泽尔引理 $1 - 4/t^2$ 在 $\mathbb{Q}_p^\times$ 中必为平方元；于是判别式 $t^2(1 - 4/t^2)$ 为非零平方，多项式 $X^2 - t X + 1$ 在 $\mathbb{Q}_p$ 中分解为两个互异一次因式。由于除法代数 $H_{a,b}(\mathbb{Q}_p)$ 无零因子，$\alpha$ 必等于某个标量根 $r \in \mathbb{Q}_p$；继而 $1 = \operatorname{Nrd}(r) = r^2$ 迫使 $r = \pm 1$，故 $t = \operatorname{Trd}(\alpha) = \pm 2$（满足 $v_p(\pm 2) \ge 0$），与 $v_p(t) < 0$ 矛盾！因此对每个有限分歧素数 $p \in \Delta_{a,b} \setminus \{\infty\}$ 与任意局部范数一元均成立 $v_p(\operatorname{Trd}(\alpha)) \ge 0$（约定 $v_p(0) = +\infty$）；限制到有理范数一元，即证对单个代数恒有 $S_{a,b} \subseteq \bigcap_{p \in \Delta_{a,b} \setminus \{\infty\}} \mathbb{Z}_{(p)}$。相反，在任意非分歧有限素数 $\ell \notin \Delta_{a,b}$ 处，$H_{a,b}(\mathbb{Q}_\ell) \cong M_2(\mathbb{Q}_\ell)$ 中的对角矩阵 $\operatorname{diag}(\ell^{-k}, \ell^k)$（$k \ge 1$）行列式为 $1$、迹赋值恰为 $-k$ 且加单位阵可逆，对应某个局部纯凯莱参数 $v_0 \in H_{a,b}^0(\mathbb{Q}_\ell)$；由于分母非零条件 $1 + N(v) \neq 0$ 与精确赋值 $v_\ell(\operatorname{Trd}(\alpha(v))) = -k$ 均在 $v_0$ 的某个 $\ell$-进开邻域上局部常值，由有理纯空间 $H_{a,b}^0(\mathbb{Q})$ 在 $H_{a,b}^0(\mathbb{Q}_\ell)$ 中的稠密性，存在有理纯参数 $v$ 在 $\ell$ 处放出任意高阶迹极点 $v_\ell(\operatorname{Trd}(\alpha(v))) = -k$！

以实分裂分歧代数 $H_{2,3}$（$\Delta_{2,3} = \{2, 3\}$）为例，这一双面约束可以手算直见：纯整三元组 $(1, 0, 1)$、$(0, 0, 2)$ 与 $(3, 6, 0)$ 代入凯莱图卡后，在非分歧素数 $\ell = 5$ 处依次给出精确范数一迹 $\operatorname{Trd} = -\frac{6}{5}, -\frac{46}{25}, -\frac{254}{125}$（满足 $v_5 = -1, -2, -3$），同时在两个分歧素数 $p = 2, 3$ 处均严格保持 $v_p \ge 0$。注意到 $-\frac{6}{5}$ 虽落入 $H_{2,3}$ 自身的局部化交集 $\mathbb{Z}_{(2)} \cap \mathbb{Z}_{(3)}$，却并不属于锁定 $5$ 的更大交集——这是因为每座代数单独只锁住自身的分歧素数集 $\Delta_{a,b}$。更进一步，对单个实分裂代数 $H_{a,b}$，[Poonen 2009](https://api.crossref.org/works/10.1353/ajm.0.0057)（Lemma 2.5，将同一代数 $S_{a,b}$ 中的两枚迹相加并配以 $\{0, \dots, 2309\}$ 内的整平移）与 [Koenigsmann 2016](https://arxiv.org/abs/1011.3424)（Proposition 6，直接取同一代数的两迹和集 $S_{a,b} + S_{a,b}$）分别证明这类迹和严格填满该代数的局部化交集 $\bigcap_{p \in \Delta_{a,b}} \mathbb{Z}_{(p)}$。将这些按代数构造出的迹和子环跨有限族取交，便能逐素数筛去有理分母：四个基础代数 $H_{2,3}, H_{2,5}, H_{3,7}, H_{3,5}$ 的分歧素数之并为 $\{2, 3, 5, 7\}$，其交集 $\bigcap_{p \in \{2,3,5,7\}} \mathbb{Z}_{(p)}$ 要求既约分母与 $210$ 互素（允许分母剩余类占比 $\frac{\varphi(210)}{210} = \frac{48}{210} = \frac{8}{35}$，档案 Arb 包络四舍五入至六位小数为 $0.228571$）；追加 $H_{5,13}$ 锁定 $\{2, 3, 5, 7, 13\}$（模 $2730$，占比 $\frac{96}{455}$，四舍五入至六位小数为 $0.210989$）；再补入 $H_{2,11}$（因 $\left(\frac{2}{11}\right) = -1$ 且 $(11^2 - 1)/8 = 15$ 为奇，得 $\Delta_{2,11} = \{2, 11\}$）——事实上仅 $H_{2,3}, H_{2,5}, H_{3,7}, H_{2,11}, H_{5,13}$ 五个代数即已覆盖全部素数 $p \le 13$——将既约分母锁在与 $30030$ 互素的 $5760$ 个剩余类内，占比 $\frac{192}{1001}$（四舍五入至六位小数为 $0.191808$）；逐素数延展欧拉筛占比 $\prod_{p \le P}(1 - 1/p)$ 至 $P = 29$（模 $6469693230$），精确占比收缩至 $\frac{442368}{2800733}$（四舍五入至六位小数为 $0.157947$）。当交集取遍全部素数时，便精确收束为 $\bigcap_{p} \mathbb{Z}_{(p)} = \mathbb{Z}$；在独立的一阶可定义性压缩方向上，[Daans 2024](https://arxiv.org/abs/2301.02107) 将 $\mathbb{Z} \subset \mathbb{Q}$ 的纯全称定义压缩至 $10$ 个全称量词。

**证据边界与配套档案（`ARGUED` / `NUM`）。** 本小节书面论证（`ARGUED`）确立赫维茨—利普希茨球面双射、欧氏覆盖半径上界、显式矩阵分裂同构、有限单位群的不变格包含性、亨泽尔 $p$-进迹整性锁，以及经有理纯参数稠密性推出的任意阶非分歧迹极点存在性；雅可比四平方定理、希尔伯特互反律、艾希勒质量公式与 $D = 2, 3, 5$ 类数为 $1$ 的分类以及 Poonen、Koenigsmann 与 Daans 的可定义性定理均为所引经典文献结论。本节引用的有限计算与完整检验明细——涵盖 $12$ 轮扫描共 $17028$ 组凯莱网格求值、$36$ 组非分歧极点见证、已保存的向外填充双工作精度 Arb 区间包络，以及一个无显式导入的独立 Lean 辅助脚本（核验所列有限布尔算例，包含全部 $256$ 组奇剩余四元组的四平方和皆同余于 $4 \pmod 8$）——归档于 [Issue #1158](https://github.com/the-omega-institute/trureturing-books/issues/1158) 对应的[固化校验档案](https://gist.github.com/loning/2cffe5c2c751b34484955cff4da6b892/b8c3983b777aea8e45a27ac3accd00d9b181d4b1)（原始 [`SHA256SUMS`](https://gist.githubusercontent.com/loning/2cffe5c2c751b34484955cff4da6b892/raw/b8c3983b777aea8e45a27ac3accd00d9b181d4b1/SHA256SUMS) 的 SHA-256 为 `885f3486d36f29847bcb82b88e0dd64565cbe0fbcaef4eb170bf44233a65f411`）；所有有限计算结果标为 `NUM`，该独立辅助脚本不计入本书所钉 `trureturing` 冻结 `LEAN ✓` 定理计数。

> 有理数的汪洋看似无边无际、随处可分；但只要把二次范数球面与迹投影的准星扣紧，离散的整数骨架便从连续的迷雾里浮现出来。

至此，在第六部的前三章里，我们已经走过了逻辑与拓扑的对角逃逸（[第 21 章](ch21-diagonalization-and-escape.md)）、素数的正交基（[第 22 章](ch22-primes-euler-products-and-zeros.md)）与整数的范数骨架（[第 23 章](ch23-diophantine-definability.md)）。既然本章用范数与迹辨识出离散算术结构，接下来我们将整部《量子计算的几何直觉》前六部的全部线索汇聚到第六部的压轴之章——[第 24 章](ch24-cosine-fixed-points-and-self-reference.md)——追问当一次测量的输出直接成为同一算子的下一次输入时会发生什么：

当丈量的算子（$\cos$）不再向外寻找别的刻度，而是拿自己丈量出的相融投影当场作为下一轮张开的角度（$\cos\theta = \theta$），那个名叫 $\cos$ 的外衣究竟是从哪里生出来的？余弦自指不动点 $\theta^* \approx 0.7390851332$（其经典分析与算术性质见第二十四章文献注记）又是如何在自指的尽头化作 $\psi = \psi(\psi)$ 的？让我们翻开[第二十四章](ch24-cosine-fixed-points-and-self-reference.md)。
