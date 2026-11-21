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

四元数范数 $\operatorname{Nrd}(\alpha)$ 如何在 $\mathbb{Q}$ 上完成局部—整体锁定，以及“存在性丢番图（$\exists$）”与“一阶可定义（$\forall$ 或 $\forall\exists$）”之间的量词边界，全部汇总于下面的文献边界审计框中（[@rem-diophantine-z-in-q-literature]）。

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

> 有理数的汪洋看似无边无际、随处可分；但只要把二次范数球面与迹投影的准星扣紧，离散的整数骨架便从连续的迷雾里浮现出来。

至此，在第六部的前三章里，我们已经走过了逻辑的逃逸（第 21 章）、素数的正交基（第 22 章）与整数的范数骨架（第 23 章）。现在，整部《量子计算的几何直觉》前六部的全部线索，终于要在第六部的压轴之章——[第二十四章](ch24-cosine-fixed-points-and-self-reference.md)——汇聚成那道终极的闪电：

当丈量的算子（$\cos$）不再向外寻找别的刻度，而是拿自己丈量出的相融投影当场作为下一轮张开的角度（$\cos\theta = \theta$），那个名叫 $\cos$ 的外衣究竟是从哪里生出来的？余弦自指不动点 $\theta^* \approx 0.7390851332$（其经典分析与算术性质见第二十四章文献注记）又是如何在自指的尽头化作 $\psi = \psi(\psi)$ 的？让我们翻开[第二十四章](ch24-cosine-fixed-points-and-self-reference.md)。
