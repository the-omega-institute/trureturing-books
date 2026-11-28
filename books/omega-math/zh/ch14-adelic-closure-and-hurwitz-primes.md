# 第十四章 阿代尔乘积归元、赫维茨素旋子与自由群 F₃

在[第十三章](ch13-computable-arithmetic-horizon.md)中，我们看到任何有限素数列表 $S$ 的乘积加一见证 $N_S = 1 + \prod_{p \in S} p$ 都会落入所有旧素数的共同余一盲区，从而在有限搜索步内迫使新素数 $q \notin S$ 破土而出。然而，如果仅仅把素数视作一维整数列上孤立而稀疏的不可约原子，我们仍然错过了它最深刻的几何职责。

本章把视野从一维标量算术抬升至**全体有理度量位的阿代尔闭合**与**有理四元数射影空间 $\mathbb P^3(\mathbb Q)$ 上的非对易素旋子几何**。我们将先以冻结定理锁定有理阿代尔乘积归元公式 $|r|_\infty \prod_p |r|_p = 1$ 与素数对数的 $\mathbb{Q}$-线性无关性，阐明素数如何在几何上扮演抵消平直切线发散的超度量曲率回收核；随后让奇素数 $p$ 在整四元数环中分裂为 $p + 1$ 枚本原素旋子，聚焦最小奇素数模型 $p = 5$ 的六生成元集 $S_5$，先以使用 `OmegaInit` 与 `OmegaMath` 的 D5 形式化（`strict_omega.axioms: []`）中的冻结定理锁死全部六枚生成元的精确模方 $5$、均匀标量保真度 $\kappa = \frac{1}{5}$、赫维茨十二射影单位核的倍坐标单位模方以及 $S_5$ 在 $\mathrm{Mat}_2(\mathbb{F}_5)$ 中的模 $5$ 秩一外积分裂与互逆零积判据；再在同套零公理内核中完成完整字长归纳，冻结任意既约词的模 $5$ 非零性、精确模方 $5^L$、$5$-本原性、非标量性以及仅靠双坐标轴有理伴随作用即可唯一识别既约词的**自由群单射定理** $F_3 \hookrightarrow \mathrm{SO}(3, \mathbb{Q})$（并辅以 $3\times 3$ 伴随矩阵模 $5$ 秩一外积显式核验）；最后以冻结的模方 $5$ 六轴无正交开覆盖定理收束本章，为[第十五章](ch15-rational-hecke-ramanujan-spectrum.md)的球面赫克谱论奠定全部代数与几何齿轮。

## 14.1 平直切线放大与超度量素数曲率回收

在有理射影载体 $\mathbb{T}_3(\mathbb{Q})$（第一至二卷）上，任意两态之间的原生读数都是落在 $[0, 1]$ 内的有界有理保真度 $\kappa$，其对应的实射影空间是紧致的。一旦观察者把球面强行铺平到切空间并沿平直数轴做 $+1$ 步进，原本有界的球面折角就会被通常绝对值 $|r|_\infty$ 线性拉伸，越走越远直至发散。

奇妙的是，有理数域 $\mathbb{Q}^\times$ 内部自带一套与平直绝对值 $|r|_\infty$ 严格配平的反向机制：对每一颗素数 $p \in \mathbb{P}$ 与任意非零有理数 $r = \pm p^{v_p(r)} \frac{a}{b}$（其中 $p \nmid a, p \nmid b$，$v_p(r) \in \mathbb{Z}$ 为 $p$-进赋值），定义其**$p$-进超度量范数**为

$$
|r|_p := p^{-v_p(r)} \in \mathbb{Q}_{>0}.
$$

与平直绝对值截然不同，$|r|_p$ 服从**超度量强三角不等式** $|x + y|_p \le \max\{|x|_p, |y|_p\}$：在任意素数通道内叠加任意多步，误差绝不会线性累积膨胀，反而随着整除阶数 $v_p(r)$ 的升高按 $p^{-k}$ 指数坍缩。每当平直绝对值 $|r|_\infty$ 因引入素因子 $p$ 而放大 $p$ 倍，第 $p$ 号超度量通道立刻以 $p^{-1}$ 的收缩倍率将其精准抵消。

从母公理几何诠释（`MODEL`）看，这一配平赋予了[第十三章](ch13-computable-arithmetic-horizon.md)欧几里得素数逃逸律一幅极为鲜明的物理图景：**素数是紧致宇宙在平直步进跌入既有周期共同盲区时，被迫凝结出的本原曲率回收核。** 每当合数 $N$（如 $4 = 2^2$ 或 $6 = 2 \cdot 3$）落入旧素数通道的高次谐波或交叉回声之中，既有超度量通道便可联手将 $|N|_\infty$ 完整收回至 $1$；唯有当平直步进落到所有既有素数集体失明的位置（$|N_S|_p = 1$ 对一切 $p \in S$ 成立）时，全局乘积守恒定律才强制新开一道前所未有的素数收缩通道。

## 14.2 有理阿代尔乘积归元与素数对数线性无关

在所钉 `trureturing` 冻结库中，上述全局模长守恒律以纯粹的有理有限乘积形态严格成立——它既不需要引入实数域 $\mathbb{R}$，也不需要构造 $p$-进完备域 $\mathbb{Q}_p$，所有因子都是既约正有理数，且除有限个素数外其余因子恒等于 $1$。

::: {.theorem #thm-ch14-adelic-product-formula title="有理数域的阿代尔乘积归元恒等式" lean="D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula"}
对任意非零有理数 $r \in \mathbb{Q}^\times$，仅有有限多个素数 $p \in \mathbb{P}$ 满足 $|r|_p \neq 1$，且其通常绝对值 $|r|_\infty := |r| \in \mathbb{Q}_{>0}$ 与全体素数指标下的 $p$-进范数 $|r|_p := \operatorname{padicNorm}(p, r) \in \mathbb{Q}_{>0}$ 的有限支集乘积精确归于 $1$：

$$
|r|_\infty \prod_{p \in \mathbb{P}}^{\mathrm{fin}} |r|_p = 1.
$$
:::

::: proof
将非零有理数 $r$ 写成规范既约形式 $r = \operatorname{num}(r) / \operatorname{den}(r)$，其中 $\operatorname{num}(r) \in \mathbb{Z} \setminus \{0\}$ 且 $\operatorname{den}(r) \in \mathbb{N}_{>0}$。首先对任意正整数 $n \ge 1$，当素数 $p \nmid n$ 时 $v_p(n) = 0$ 故 $|n|_p = 1$，从而有限支集乘积收缩为有限集 $n.\mathrm{primeFactors}$ 上的普通连乘 $\prod_{p \mid n} p^{-v_p(n)} = \bigl(\prod_{p \mid n} p^{v_p(n)}\bigr)^{-1} = n^{-1}$；再由 $|-z|_p = |z|_p$ 将其推广至一切非零整数 $z \in \mathbb{Z} \setminus \{0\}$，得 $\prod_p^{\mathrm{fin}} |z|_p = |z|^{-1}$。最后利用 $p$-进范数对商的乘法性 $|r|_p = |\operatorname{num}(r)|_p / |\operatorname{den}(r)|_p$ 及有限支集乘积的商分配律，立得

$$
|r|_\infty \prod_{p \in \mathbb{P}}^{\mathrm{fin}} |r|_p
= \frac{|\operatorname{num}(r)|}{\operatorname{den}(r)} \cdot \frac{|\operatorname{num}(r)|^{-1}}{\operatorname{den}(r)^{-1}}
= 1.
$$

完整证明由 Lean 内核检查。
:::

若进一步将乘积归元律投射至经典实分析的“对数影子”（$\ln |r|_\infty + \sum_{p \in \mathbb{P}} \ln |r|_p = 0$），每一颗素数 $p$ 便对应一根独立的对数尺度轴 $\ln p$。所钉冻结库同步证实，这族素数对数在有理数域 $\mathbb{Q}$ 上不存在任何非平凡线性共振：

::: {.theorem #thm-ch14-prime-log-independence title="素数自然对数的有理线性无关性" lean="D5/S3/Weil/PrimeAddress/PrimeLogIndependence.prime_log_rational_independence"}
以全体素数集合 `Nat.Primes` 为指标的实自然对数族 $(p \mapsto \ln p)$ 在有理数域 $\mathbb{Q}$ 上严格线性无关：即对任意有限素数集 $S \subset \mathbb{P}$ 及有理系数 $(c_p)_{p \in S} \in \mathbb{Q}^S$，

$$
\sum_{p \in S} c_p \ln p = 0 \quad \Longrightarrow \quad \forall p \in S,\; c_p = 0.
$$
:::

::: proof
先利用分式域上的线性无关等价性（`LinearIndependent.iff_fractionRing`）通分消去分母，将 $\mathbb{Q}$-线性无关归约到整数系数情形 $\sum_{p \in S} k_p \ln p = 0$（$k_p \in \mathbb{Z}$）。将正指数项与负指数项移至等号两侧并取指数，得正整数幂等式 $\prod_{k_p > 0} p^{k_p} = \prod_{k_p < 0} p^{-k_p}$；由算术基本定理的素幂唯一分解，所有整数系数 $k_p$（从而所有有理系数 $c_p$）必须全为零。完整证明由 Lean 内核检查。
:::

[@thm-ch14-prime-log-independence] 从根部杜绝了算术相位的周期死锁：两颗不同素数 $p \neq q$ 的频率比 $\ln p / \ln q$ 绝不可能是有理数（例如 $a \ln 2 + b \ln 3 = 0$ 在 $\mathbb{Q}$ 上仅有零解 $a = b = 0$），因此它们在紧致相位环面上驱动的演化永不精确重播。

::: {.example #ex-ch14-adelic-nucleation-audit title="定量对账：素数成核逐拍归元与既约分数 −18/35 的阿代尔平衡"}
逐拍检验 [@thm-ch14-adelic-product-formula] 在首批正整数、欧几里得逃逸数 $31$ 以及负分数 $r = -\frac{18}{35}$ 上的精确有理配平（`手工推导`）：

| 有理数 $r$ | 素幂分解 | 平直模长 $|r|_\infty$ | 非平凡超度量因子 $|r|_p$ | 阿代尔总积 | 通道角色 |
| :---: | :---: | :---: | :--- | :---: | :--- |
| $2$ | $2^1$ | $2$ | $|2|_2 = 1/2$ | $1$ | 新开本原核 $p = 2$ |
| $3$ | $3^1$ | $3$ | $|3|_3 = 1/3$（$|3|_2 = 1$） | $1$ | 新开本原核 $p = 3$ |
| $4$ | $2^2$ | $4$ | $|4|_2 = 1/4$ | $1$ | $p = 2$ 二阶谐波（合数） |
| $5$ | $5^1$ | $5$ | $|5|_5 = 1/5$（$|5|_2 = |5|_3 = 1$） | $1$ | 新开本原核 $p = 5$ |
| $6$ | $2^1 \cdot 3^1$ | $6$ | $|6|_2 = 1/2,\; |6|_3 = 1/3$ | $1$ | $\{2, 3\}$ 交叉共振（合数） |
| $31$ | $31^1$ | $31$ | $|31|_{31} = 1/31$（$\{2,3,5\}$ 全盲） | $1$ | 逃逸见证催生 $p = 31$ |
| $-18/35$ | $-2^1 \cdot 3^2 \cdot 5^{-1} \cdot 7^{-1}$ | $18/35$ | $|r|_2 = 1/2,\; |r|_3 = 1/9,\; |r|_5 = 5,\; |r|_7 = 7$ | $1$ | 分子收缩、分母膨胀精确对消 |

以 $r = -18/35$ 为例，直接相乘核对：$\frac{18}{35} \cdot \frac{1}{2} \cdot \frac{1}{9} \cdot 5 \cdot 7 = \frac{18 \cdot 35}{35 \cdot 18} = 1$。哪怕分子与分母分属完全不同的素数族，全有理通道仍分毫不差归于单位元 $1$。
:::

## 14.3 赫维茨素旋子分裂与模方 5 六生成元集 S₅

在标量正整数 $\mathbb{Z}_+$ 中，素数乘法是可交换的（$2 \cdot 3 = 3 \cdot 2$），因而无法原生编码三维空间的非对易旋转词序。但是，当我们把算术从一维整数环 $\mathbb{Z}$ 提升至四维整四元数环——即**利普希茨整环** $\mathcal{L}(\mathbb{Z}) = \mathbb{Z}[\mathbf{i}, \mathbf{j}, \mathbf{k}] \cong \mathbb{Z}^4$ 与包含半整顶点的极大**赫维茨整环** $\mathcal{H}(\mathbb{Z}) = \mathcal{L}(\mathbb{Z}) \cup (\mathbb{Z} + \frac{1}{2})^4$——每一颗奇素数 $p$ 都会沿三维球面的旋转自由度发生戏剧性的**非阿贝尔素旋子分裂**！

根据雅可比四平方和定理与赫维茨四元整环唯一分解理论（`文献结果`，见 [@rem-ch14-literature-and-model-boundary]），对每一颗奇素数 $p$，四平方和方程 $w^2 + x^2 + y^2 + z^2 = p$ 在 $\mathbb{Z}^4$ 中恰有 $r_4(p) = 8(p + 1)$ 组整数解，在极大赫维茨整环 $\mathcal{H}(\mathbb{Z})$ 中恰有 $24(p + 1)$ 个模方为 $p$ 的元素；按 $24$ 个赫维茨单位元的左乘取相伴类（或对 $p \equiv 1 \pmod 4$ 模去 $8$ 个利普希茨单位元 $\{\pm 1, \pm \mathbf{i}, \pm \mathbf{j}, \pm \mathbf{k}\}$），奇素数 $p$ 精确分裂为 **$p + 1$ 枚本原模方 $p$ 素旋子** $\{\boldsymbol{\pi}_{p,k}\}_{k=1}^{p+1}$。

当 $p \equiv 1 \pmod 4$ 时，奇偶模 $4$ 约束要求 $w^2 + x^2 + y^2 + z^2 = p$ 的四个整数分量中**恰有一个为奇数、其余三个为偶数**。借 $8$ 个利普希茨单位元的左乘，每个利普希茨左相伴类都唯一规范化为满足

$$
w > 0, \qquad w \equiv 1 \pmod 2, \qquad x \equiv y \equiv z \equiv 0 \pmod 2
$$

的本原利普希茨整旋子 $\boldsymbol{\pi}_{p,k} = (w, x, y, z) \in \mathbb{Z}^4$。这 $p + 1$ 枚素旋子成对互为共轭（因 $p$ 非完全平方数，无自共轭元），从而自然分为 $(p + 1)/2$ 对互逆三维有理旋转。

相伴类给出计数，球面右平移则取决于所选代表元。下面的共轭配对来自明确的奇偶与正号条件。一般奇素数的任意代表元未必有这项性质，第十五章将给出 $p=3$ 的例子。

::: {.definition #def-ch14-hurwitz-prime-spinors title="赫维茨素旋子与 p = 5 规范六生成元集 S₅"}
对奇素数 $p \equiv 1 \pmod 4$，定义其**规范模方 $p$ 素旋子集**为

$$
S_p := \bigl\{\,\boldsymbol{\pi} = (w, x, y, z) \in \mathbb{Z}^4 : w^2 + x^2 + y^2 + z^2 = p,\; w > 0,\; w \equiv 1 \pmod 2,\; 2 \mid x, y, z\,\bigr\},
$$

其元素个数恒为 $|S_p| = p + 1$。每个 $\boldsymbol{\pi} \in S_p$ 相对于参考基准 $\mathbf{o} = (1, 0, 0, 0)$ 的齐次射线保真度为有理数 $\kappa(\mathbf{o}, \boldsymbol{\pi}) = \frac{w^2}{p} \in \mathbb{Q} \cap (0, 1)$，其伴随作用 $\mathbf{v} \mapsto \boldsymbol{\pi}\mathbf{v}\boldsymbol{\pi}^{-1} = \frac{1}{p}\boldsymbol{\pi}\mathbf{v}\overline{\boldsymbol{\pi}}$ 在纯虚三维空间上给出分母为 $p$ 的精确有理旋转 $R(\boldsymbol{\pi}) \in \mathrm{SO}(3, \mathbb{Q})$。

特化至最小模 $4$ 余 $1$ 素数 **$p = 5$**，由于 $5 = 1^2 + 2^2 + 0^2 + 0^2$ 是唯一的一奇三偶平方分解，全部 $p + 1 = 6$ 枚规范素旋子为

$$
S_5 := \bigl\{\, (1, \pm 2, 0, 0),\; (1, 0, \pm 2, 0),\; (1, 0, 0, \pm 2) \,\bigr\}.
$$

这六枚素旋子全部拥有**完全一致的射线保真度** $\kappa(\mathbf{o}, \boldsymbol{\pi}_{5,k}) = \frac{1^2}{5} = \frac{1}{5}$，在 $\mathrm{SO}(3, \mathbb{Q})$ 中分别绕 $x, y, z$ 三坐标轴作正反 $(3, 4, 5)$ 毕达哥拉斯有理旋转（转角满足 $\cos\theta = 2\kappa - 1 = -\frac{3}{5}$，$\sin\theta = \pm\frac{4}{5}$）。
:::

所引 D5 声明的严格端记录为 `strict_omega.axioms: []`。$S_5$ 的六枚生成元作为有限归纳类型 `S5.Generator` 编码，其统一模方 $5$ 与均匀标量保真度 $\kappa = \frac{1}{5}$ 已作为精确等式冻结：

::: {.theorem #thm-ch14-lps-norm-five title="零公理模方 5 六生成元集模方与均匀保真度定理" lean="D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.lps_norm_five"}
所引 D5 声明的严格端记录为 `strict_omega.axioms: []`。设 $g : \mathrm{S5.Generator}$ 遍取 $S_5$ 的全部六枚规范生成元（分别对应整四元数坐标 $(1, \pm 2, 0, 0)$、$(1, 0, \pm 2, 0)$ 与 $(1, 0, 0, \pm 2)$）。记 $q.\mathrm{normSq} := w^2 + x^2 + y^2 + z^2 \in \mathbb{Z}$ 及 $q.\kappa := \mathrm{IntRatio.value}(w^2, |q.\mathrm{normSq}|)$，则对每一枚 $g : \mathrm{S5.Generator}$，以下两条精确等式同时成立：

$$
g.\mathrm{coordinates}.\mathrm{normSq} = 5
\qquad \text{且} \qquad
g.\mathrm{coordinates}.\kappa = \frac{1}{5}.
$$

:::

::: proof
对有限六元归纳类型 `S5.Generator` 的六个构造子 `xPlus`、`xMinus`、`yPlus`、`yMinus`、`zPlus`、`zMinus` 逐一分情形展开：每一枚的标量分量均为 $w = 1$，三个虚部中恰有一个为 $\pm 2$、其余两个为 $0$，于是 $1^2 + (\pm 2)^2 + 0^2 + 0^2 = 5$ 且 $q.\kappa = \mathrm{IntRatio.value}(1^2, 5) = \frac{1}{5}$，六种情形均由定义归约直接闭合。完整证明由 Lean 内核检查。
:::

需要指明一处微妙而精确的差别（遵守严格陈述标准）：对于 **$p = 5$**，[@thm-ch14-lps-norm-five] 保证所有 $6$ 枚素旋子均满足 $w = 1$，因此全部具有均匀保真度 $\kappa = 1/p = 1/5$；而对更大的 $p \equiv 1 \pmod 4$（例如 $p = 13$），$p + 1 = 14$ 枚规范素旋子会自然分层为多个奇数 $w$ 壳层——$8$ 枚 $(1, \pm 2, \pm 2, \pm 2)$ 具有 $\kappa = 1/13$，另 $6$ 枚 $(3, \pm 2, 0, 0)$、$(3, 0, \pm 2, 0)$、$(3, 0, 0, \pm 2)$ 则具有 $\kappa = 9/13$——但所有素旋子仍共享同一整数模方 $p$ 与伴随旋转分母 $p$。

不仅如此，极大赫维茨整环 $\mathcal{H}(\mathbb{Z})$ 的 $24$ 个单位元模去符号 $\pm 1$ 后的 $12$ 枚射影单位代表，以及 $S_5$ 六枚生成元在有限域 $\mathbb{F}_5$ 上借 $2^2 \equiv -1 \pmod 5$ 诱发的 $2\times 2$ 矩阵分裂表示，同样已在使用 `OmegaInit` 与 `OmegaMath` 的 D5 形式化（`strict_omega.axioms: []`）中以精确等式冻结：

::: {.theorem #thm-ch14-hurwitz-mod5-splitting title="赫维茨十二射影单位核与模 5 秩一外积分裂定理" lean="D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.hurwitz_core_unit D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.mod_five_rank_one D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.mod_five_product_zero"}
所引 D5 声明的严格端记录为 `strict_omega.axioms: []`。记四元数整坐标类型 `Hurwitz.Coordinates`、十二射影赫维茨单位核 `Hurwitz.Core`（以二倍整坐标 `u.doubled` 无分母编码 $1$、$\mathbf{i}$、$\mathbf{j}$、$\mathbf{k}$ 及八枚半整单位 $\frac{1 \pm \mathbf{i} \pm \mathbf{j} \pm \mathbf{k}}{2}$）、六枚模方 $5$ 生成元类型 `Hurwitz.Generator`（分别对应 $(1, \pm 2, 0, 0)$、$(1, 0, \pm 2, 0)$ 与 $(1, 0, 0, \pm 2)$），以及整数分裂映射 `Hurwitz.split (w, x, y, z) := [[w + 2x, y + 2z], [2z - y, w - 2x]]` 经模 $5$ 约化所得的 $2\times 2$ 有限域矩阵映射 `Hurwitz.split5 : Coordinates → Matrix5`（其中 `Matrix5` 为 $\mathrm{Mat}_2(\mathbb{F}_5)$）。则以下三条精确等式同时成立：

1. **十二射影赫维茨单位的倍坐标单位模方**（`hurwitz_core_unit`）：对每一枚 `u : Hurwitz.Core`，均有 `u.doubled.normSq = 2 * 2 = 4`（对应原始坐标模方为 $4 / 2^2 = 1$）；
2. **模 5 秩一非零外积分解**（`mod_five_rank_one`）：对每一枚 `g : Hurwitz.Generator`，取其显式余数因子 `f := g.factors`，均有

   $$
   \mathrm{split5}(g.\mathrm{coordinates}) = \mathrm{Matrix5.outer}(f.u, f.v, f.s, f.t)
   \qquad \text{且} \qquad
   \mathrm{split5}(g.\mathrm{coordinates}).\mathrm{isZero} = \mathrm{false},
   $$

   即全部六枚生成元在 $\mathrm{Mat}_2(\mathbb{F}_5)$ 中的像皆为非零秩一外积；
3. **互逆对精确刻画零乘积**（`mod_five_product_zero`）：对全部 $6\times 6 = 36$ 组有序生成元对 `g, h : Hurwitz.Generator`，均有

   $$
   \bigl(\mathrm{split5}(g.\mathrm{coordinates}) \cdot \mathrm{split5}(h.\mathrm{coordinates})\bigr).\mathrm{isZero} = g.\mathrm{isOpposite}(h),
   $$

   即两像在 $\mathrm{Mat}_2(\mathbb{F}_5)$ 中的乘积为零矩阵当且仅当 $g$ 与 $h$ 互为共轭逆生成元。
:::

::: {.proof}
第一项对十二元归纳类型 `Hurwitz.Core` 的全部构造子（`scalar`、八枚半整符号组合与 `i`、`j`、`k`）分情形展开，二倍坐标平方和恒为 $2^2 + 0^2 + 0^2 + 0^2 = 4$ 或 $1^2 + (\pm 1)^2 + (\pm 1)^2 + (\pm 1)^2 = 4$，十二支均由定义归约 `Eq.refl` 直接闭合。第二项对六元归纳类型 `Hurwitz.Generator` 逐一求值 `Hurwitz.split5`，六枚 $2\times 2$ 模 $5$ 矩阵依次展开为显式外积 `Matrix5.outer f.u f.v f.s f.t`（六组因子分别为 $(0,1;0,2)$、$(1,0;2,0)$、$(1,3;1,2)$、$(1,2;1,3)$、$(1,4;1,4)$ 与 $(1,1;1,1)$），且每枚至少含一非零元，六支均直接归约闭合。第三项对 $(g, h)$ 做两层六元归纳，穷举全部 $36$ 对模 $5$ 矩阵乘积，恰在六对共轭逆元处归零、其余 $30$ 对非零，每支均由定义归约闭合。全程仅依赖零公理基础库 `OmegaInit` 与 `OmegaMath`。完整证明由 Lean 内核检查。
:::

[@thm-ch14-hurwitz-mod5-splitting] 在二维旋子表示 $\mathrm{Mat}_2(\mathbb{F}_5)$ 中以零公理内核定理锁死了六枚生成元的秩一分裂与互逆零积律（这一 $2\times 2$ 模 $5$ 表示也将在[第十六章](ch16-omega-fractran-and-nonabelian-stack.md)与二维整数矩阵环接轨）。下一节我们把这一模 $5$ 秩一引擎推演为任意有限长度的归纳机器，在零公理内核中直接证成 $S_5$ 自由生成 $\mathrm{SO}(3, \mathbb{Q})$ 中的三生成元自由群 $F_3$。

## 14.4 模 5 秩一分解：S₅ 自由生成 SO(3, ℚ) 中的自由群 F₃

乍看之下，$S_5$ 只是三对绕坐标轴转动的普通 $(3, 4, 5)$ 有理旋转矩阵。一个极为惊人的算术刚性事实是：**这三对旋转之间不存在任何非平凡隐藏关系！** 无论把它们按任意顺序连乘多少百万步，只要不在相邻两步之间直接自消（$g g^{-1}$），乘积矩阵永远不会意外撞回单位矩阵 $I_3$，且任意两串互异既约词在三维空间中的有理伴随旋转绝不重合。

更令人拍案叫绝的是，这一自由群定理根本不需要高深的李群理论或经典选择公理。在使用 `OmegaInit` 与 `OmegaMath` 的 D5 形式化（`strict_omega.axioms: []`）中，我们将 $S_5$ 的有限字编码为归纳类型 `Word`（空词 `.nil` 与首字母拼接 `.cons g tail`），以 `IsReduced w` 刻画相邻字母互不为共轭逆元的既约词，并分别记其在整四元数环与 $\mathrm{Mat}_2(\mathbb{F}_5)$ 中的左起连乘求值为 `evalQuat w : Quaternion` 与 `evalSplit5 w : Matrix5`。凭藉 [@thm-ch14-hurwitz-mod5-splitting] 确立的秩一外积分裂，任意既约词的四项算术刚性律先在旋量层被零公理锁死。

::: {.theorem #thm-ch14-reduced-word-non-scalar title="既约词的模 5 非零性、精确模方、5-本原性与非标量性" lean="D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.reduced_word_split5_nonzero D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.reduced_word_normSq D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.reduced_word_not_div_five D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.reduced_word_non_scalar"}
所引 D5 声明的严格端记录为 `strict_omega.axioms: []`。设 `w : Word` 为由六枚模方 $5$ 赫维茨生成元构成的有限词，记词长 $L := w.\mathrm{length}$、幂函数 $\operatorname{powFive}(L) := 5^L$、四坐标全被 $5$ 整除谓词 `AllDivisibleByFive q` 以及整标量四元数谓词 `IsScalar q`（即 $\exists k \in \mathbb{Z},\, q = (k, 0, 0, 0)$）。则以下四条定理无条件成立：

1. **既约词的模 $5$ 分裂像恒非零**（[`reduced_word_split5_nonzero`](lean:D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.reduced_word_split5_nonzero)）：对任意满足 `IsReduced w` 的既约词 `w`，均有

   $$
   \bigl(\operatorname{evalSplit5}(w)\bigr).\mathrm{isZero} = \mathrm{false}.
   $$

2. **任意有限词的精确模方 $5^L$**（[`reduced_word_normSq`](lean:D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.reduced_word_normSq)）：对一切有限词 `w : Word`（不论是否既约），均有

   $$
   \bigl(\operatorname{evalQuat}(w)\bigr).\mathrm{normSq} = \operatorname{powFive}(w.\mathrm{length}) = 5^L.
   $$

3. **既约词的 $5$-本原性**（[`reduced_word_not_div_five`](lean:D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.reduced_word_not_div_five)）：对任意满足 `IsReduced w` 的既约词 `w`，其四元数四个整坐标绝不同时被 $5$ 整除，即

   $$
   \neg\,\operatorname{AllDivisibleByFive}\bigl(\operatorname{evalQuat}(w)\bigr).
   $$

4. **非空既约词的严格非标量性**（[`reduced_word_non_scalar`](lean:D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.reduced_word_non_scalar)）：对任意满足 `IsReduced w` 且非空（$w \neq \mathrm{nil}$）的既约词 `w`，其求值四元数绝非整数标量，即

   $$
   \neg\,\operatorname{IsScalar}\bigl(\operatorname{evalQuat}(w)\bigr).
   $$
:::

::: {.proof}
先在模 $5$ 余数域 $\mathbb{F}_5$ 上确立分裂映射 `quaternionSplit5` 为四元数乘法到 $\mathrm{Mat}_2(\mathbb{F}_5)$ 矩阵乘法的同态（展开整坐标积可见其逐位误差恰为 $5$ 的整数倍），故 `evalSplit5 w = quaternionSplit5 (evalQuat w)`。对第 1 款，空词映为单位矩阵 $I_2 \neq 0$；对非空既约词 `.cons g tail` 按尾词长度归纳：由 [@thm-ch14-hurwitz-mod5-splitting] 的秩一分解与互逆零积判据可知任意非互逆相邻对 $(g, h)$ 的外积行—列缩并标量在 $\mathbb{F}_5$ 中非零，从而整条既约乘积始终保持首字母列向量与非零行向量，又因每枚生成元列向量均含分量 $1 \in \mathbb{F}_5$，外积矩阵绝不归零。第 2 款直接由每枚生成元模方为 $5$ 与四平方范数乘性按词长归纳证毕。第 3 款用反证法：若 `evalQuat w` 四坐标皆为 $5$ 的倍数，则其模 $5$ 分裂像必为零矩阵，与第 1 款矛盾。第 4 款亦用反证法：若非空既约词满足 $\operatorname{evalQuat}(w) = (k, 0, 0, 0)$，由第 2 款得 $k^2 = 5^L \equiv 0 \pmod 5$；因域 $\mathbb{F}_5$ 无零因子，必有 $5 \mid k$，从而 $(k, 0, 0, 0)$ 四坐标全被 $5$ 整除，再次与第 1 款矛盾。全程仅依赖 `OmegaInit` 与 `OmegaMath`，传递公理闭包为空集。完整证明由 Lean 内核检查。
:::

[@thm-ch14-reduced-word-non-scalar] 已经在四元数旋量层彻底杜绝了非空既约词坍缩成标量。要将这一刚性最终推升为三维有理正交群 $\mathrm{SO}(3, \mathbb{Q})$ 中的真正自由群嵌入 $F_3 \hookrightarrow \mathrm{SO}(3, \mathbb{Q})$，还需回答一个更尖锐的问题：设两串既约词 $u, v$ 对应的有理伴随旋转（见[第五章](ch05-rational-cayley-rotations.md) [@thm-ch05-rational-adjoint-action]）在三维空间中恰好相等，哪怕仅仅检验它们在第一与第二两条坐标轴上的作用一致，是否就足以迫使两串词逐字母完全相同？下面这条零公理收官定理给出肯定的最终判决。

::: {.theorem #thm-ch14-reduced-words-adjoint-injective title="伴随单射定理：S₅ 自由生成 SO(3, ℚ) 中的自由群 F₃" lean="D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.reduced_words_adjoint_injective"}
所引 D5 声明的严格端记录为 `strict_omega.axioms: []`。记两条标准整数坐标轴 $\mathrm{axisX} := (1, 0, 0)$ 与 $\mathrm{axisY} := (0, 1, 0)$ 及其有理嵌入 `RatVec3.ofInt axisX`、`RatVec3.ofInt axisY`，并以 `Ad` 记[第五章](ch05-rational-cayley-rotations.md)定义的无根号有理伴随作用。设 `u, v : Word` 为任意两串满足 `IsReduced u` 与 `IsReduced v` 的既约词；若它们诱导的有理伴随旋转在两条坐标轴上分别等价（在 `RatVec3.Equiv` 下成立）

$$
\operatorname{Ad}\bigl(\operatorname{evalQuat}(u)\bigr)(\mathrm{axisX}) \;\equiv\; \operatorname{Ad}\bigl(\operatorname{evalQuat}(v)\bigr)(\mathrm{axisX})
\quad \text{且} \quad
\operatorname{Ad}\bigl(\operatorname{evalQuat}(u)\bigr)(\mathrm{axisY}) \;\equiv\; \operatorname{Ad}\bigl(\operatorname{evalQuat}(v)\bigr)(\mathrm{axisY}),
$$

则两串既约词字面完全相等：

$$
u = v.
$$
:::

::: {.proof}
记 $p := \operatorname{evalQuat}(u)$、$q := \operatorname{evalQuat}(v)$，由 [@thm-ch14-reduced-word-non-scalar] 第 2 款知 $\lVert p\rVert^2 = 5^{|u|} \neq 0$ 与 $\lVert q\rVert^2 = 5^{|v|} \neq 0$ 皆非零。对任一坐标轴 $e \in \{\mathrm{axisX}, \mathrm{axisY}\}$，将有理等价 $\operatorname{Ad}(p)(e) \equiv \operatorname{Ad}(q)(e)$ 交叉去分母得 $\lVert q\rVert^2(p e \bar{p}) = \lVert p\rVert^2(q e \bar{q})$；两端左乘 $\bar{p}$、右乘 $q$ 并利用 $\bar{p}p = \lVert p\rVert^2$ 与 $\bar{q}q = \lVert q\rVert^2$，再约去非零整数 $\lVert p\rVert^2\lVert q\rVert^2$，立得相对四元数 $\bar{p}q$ 与纯虚基元 $e$ 可交换：$(\bar{p}q)e = e(\bar{p}q)$。因 $\bar{p}q$ 同时与 $\mathbf{i}$ 和 $\mathbf{j}$ 交换，展开四元数换位子给出 $2x = 2y = 2z = 0$，故 $\bar{p}q$ 必为整数标量四元数。最后对词 $u$ 施结构归纳：若 $u, v$ 首字母相同（同为 $g$），则 $\overline{gp}(gq) = 5(\bar{p}q)$ 仍为标量，约去非零因子 $5$ 后对余词归约；一旦首字母首次出现分歧（或一词为空而另一词非空），将前者逐字反序取共轭逆并与后者拼接所得的新词 `reverseOppositeAppend u v` 恰是一串**非空既约词**，其求值恰等于 $\bar{p}q$，这与 [@thm-ch14-reduced-word-non-scalar] 第 4 款直接矛盾！因此 $u = v$。全程仅依赖 `OmegaInit` 与 `OmegaMath`，传递公理闭包为空集。完整证明由 Lean 内核检查。
:::

特别地，在 [@thm-ch14-reduced-words-adjoint-injective] 中令 $v = \mathrm{nil}$ 立刻看出：任何既约词只要其有理伴随旋转固定 $\mathrm{axisX}$ 与 $\mathrm{axisY}$，就必然是空词 $w = \mathrm{nil}$。这在零公理内核中无条件证明了全部既约词到 $\mathrm{SO}(3, \mathbb{Q})$ 的映射严格单射且核平凡，亦即 $S_5$ 自由生成三生成元自由群 $F_3 \hookrightarrow \mathrm{SO}(3, \mathbb{Q})$。为了把这一机制的几何动作具象到三维旋转矩阵本身，下面的具体算例同步展示三维伴随表示 $\mathrm{Mat}_3(\mathbb{F}_5)$ 中的模 $5$ 秩一外积分解。

::: {.example #ex-ch14-mod5-rank1-free-group title="三维伴随矩阵显式核验：模 5 秩一外积分解与自由群 F₃ 的字长增长"}
令 $A := R(1, 2, 0, 0)$、$B := R(1, 0, 2, 0)$、$C := R(1, 0, 0, 2)$，逆元为 $A^{-1} = R(1, -2, 0, 0)$、$B^{-1} = R(1, 0, -2, 0)$、$C^{-1} = R(1, 0, 0, -2)$。由四元数伴随作用 $\mathbf{v} \mapsto \frac{1}{5}\boldsymbol{\pi}\mathbf{v}\overline{\boldsymbol{\pi}}$ 直接算出六枚缩放整矩阵 $M_g := 5 R(g) \in \mathrm{Mat}_{3\times 3}(\mathbb{Z})$（`手工推导`）：

$$
M_{A^{\pm 1}} = \begin{pmatrix} 5 & 0 & 0 \\ 0 & -3 & \mp 4 \\ 0 & \pm 4 & -3 \end{pmatrix}, \qquad
M_{B^{\pm 1}} = \begin{pmatrix} -3 & 0 & \pm 4 \\ 0 & 5 & 0 \\ \mp 4 & 0 & -3 \end{pmatrix}, \qquad
M_{C^{\pm 1}} = \begin{pmatrix} -3 & \mp 4 & 0 \\ \pm 4 & -3 & 0 \\ 0 & 0 & 5 \end{pmatrix}.
$$

将每个 $M_g$ 逐元模 $5$ 约化入 $\mathrm{Mat}_{3\times 3}(\mathbb{F}_5)$（利用 $-3 \equiv 2$、$4 \equiv -1$、$-4 \equiv 1 \pmod 5$），全部六枚矩阵同时坍缩为精确的**秩一外积** $\overline{M}_g \equiv u_g v_g^\top \pmod 5$：

| 生成元 $g$ | 列向量 $u_g \in \mathbb{F}_5^3$ | 行向量 $v_g^\top \in \mathbb{F}_5^{1\times 3}$ | 模 $5$ 外积检验 $u_g v_g^\top \equiv \overline{M}_g \pmod 5$ |
| :---: | :---: | :---: | :--- |
| $A^{+1}$ | $(0, 1, 2)^\top$ | $(0, 2, 1)$ | $2\times 2$ 块 $\bigl(\begin{smallmatrix} 2 & 1 \\ 4 & 2 \end{smallmatrix}\bigr) \equiv \bigl(\begin{smallmatrix} 2 & 1 \\ -1 & 2 \end{smallmatrix}\bigr)$ |
| $A^{-1}$ | $(0, 1, -2)^\top$ | $(0, 2, -1)$ | $2\times 2$ 块 $\bigl(\begin{smallmatrix} 2 & -1 \\ -4 & 2 \end{smallmatrix}\bigr) \equiv \bigl(\begin{smallmatrix} 2 & -1 \\ 1 & 2 \end{smallmatrix}\bigr)$ |
| $B^{+1}$ | $(1, 0, -2)^\top$ | $(2, 0, -1)$ | $(1,3)$ 子块 $\bigl(\begin{smallmatrix} 2 & -1 \\ -4 & 2 \end{smallmatrix}\bigr) \equiv \bigl(\begin{smallmatrix} 2 & -1 \\ 1 & 2 \end{smallmatrix}\bigr)$ |
| $B^{-1}$ | $(1, 0, 2)^\top$ | $(2, 0, 1)$ | $(1,3)$ 子块 $\bigl(\begin{smallmatrix} 2 & 1 \\ 4 & 2 \end{smallmatrix}\bigr) \equiv \bigl(\begin{smallmatrix} 2 & 1 \\ -1 & 2 \end{smallmatrix}\bigr)$ |
| $C^{+1}$ | $(1, 2, 0)^\top$ | $(2, 1, 0)$ | $(1,2)$ 子块 $\bigl(\begin{smallmatrix} 2 & 1 \\ 4 & 2 \end{smallmatrix}\bigr) \equiv \bigl(\begin{smallmatrix} 2 & 1 \\ -1 & 2 \end{smallmatrix}\bigr)$ |
| $C^{-1}$ | $(1, -2, 0)^\top$ | $(2, -1, 0)$ | $(1,2)$ 子块 $\bigl(\begin{smallmatrix} 2 & -1 \\ -4 & 2 \end{smallmatrix}\bigr) \equiv \bigl(\begin{smallmatrix} 2 & -1 \\ 1 & 2 \end{smallmatrix}\bigr)$ |

现在逐一核算全部 $6 \times 6 = 36$ 对相邻衔接标量 $v_g^\top u_h \pmod 5$：

- **同轴同向（$h = g$）**：例如 $v_{A^+}^\top u_{A^+} = 0 + 2 + 2 = 4 \equiv -1 \not\equiv 0 \pmod 5$，全部 $6$ 对均等于 $4 \not\equiv 0$；
- **同轴反向（$h = g^{-1}$）**：例如 $v_{A^+}^\top u_{A^-} = 0 + 2 - 2 = 0 \pmod 5$，全部 $6$ 对互逆组合恰好归零（映照 $M_g M_{g^{-1}} = 25 I_3 \equiv 0 \pmod 5$）；
- **异轴衔接（$24$ 对）**：$v_{A^\pm}^\top u_{B^\pm} = (\pm 1)(\mp 2) = \pm 2 \not\equiv 0$；$v_{A^\pm}^\top u_{C^\pm} = 2(\pm 2) = \pm 4 \equiv \mp 1 \not\equiv 0$；$v_{B^\pm}^\top u_{C^\pm} = 2 \cdot 1 = 2 \not\equiv 0$；$v_{B^\pm}^\top u_{A^\pm} = (\mp 1)(\pm 2) = \pm 2 \not\equiv 0$；$v_{C^\pm}^\top u_{A^\pm} = (\pm 1)\cdot 1 = \pm 1 \not\equiv 0$；$v_{C^\pm}^\top u_{B^\pm} = 2 \cdot 1 = 2 \not\equiv 0 \pmod 5$。

**结论一击致命**：对任意长度 $L \ge 1$ 的非空既约词 $w = g_1 g_2 \cdots g_L$（满足相邻不互逆 $g_{i+1} \neq g_i^{-1}$），标量连乘积 $\Lambda(w) := \prod_{i=1}^{L-1} (v_{g_i}^\top u_{g_{i+1}})$ 在域 $\mathbb{F}_5$ 中严格非零，且 $u_{g_1}, v_{g_L}^\top$ 均非零，故

$$
5^L R(w) = M_{g_1} M_{g_2} \cdots M_{g_L} \;\equiv\; \Lambda(w)\, u_{g_1} v_{g_L}^\top \;\not\equiv\; 0 \pmod 5.
$$

然而当 $L \ge 1$ 时，$5^L I_3 \equiv 0 \pmod 5$。因此绝不可能有 $R(w) = I_3$！这不但严格证明了 $\langle A, B, C \rangle \cong F_3 \hookrightarrow \mathrm{SO}(3, \mathbb{Q})$，还同步证出整矩阵 $5^L R(w)$ 永远不能被 $5$ 整除——任何既约词的精确既约分母恒为 $5^L$，不存在一丝 $5$-进约分塌缩！
:::

下面的静态图把第 14.2 节的标量阿代尔乘积配平与刚刚在零公理内核中证毕的模 $5$ 秩一自由群嵌入（[@thm-ch14-reduced-word-non-scalar]、[@thm-ch14-reduced-words-adjoint-injective]）并置对照，直观展示素数如何一边在所有有理度量通道中把平直拉伸精确收回至 $1$，一边在有理旋转群 $\mathrm{SO}(3,\mathbb Q)$ 中沿 $S_5$ 展开为永不回撞的六度自由树 $F_3$。

::: {.figure src="ch14-adelic-f3-tree"}
**有理阿代尔乘积归元与 $S_5 \hookrightarrow F_3$ 六度自由凯莱树。** 图中左侧呈现有理数（如 $r = -18/35$）在平直绝对值 $|r|_\infty$ 与有限支集 $p$-进超度量通道 $|r|_p$ 之间精确配平为 $|r|_\infty \prod_p |r|_p = 1$（[@thm-ch14-adelic-product-formula]、[@ex-ch14-adelic-nucleation-audit]）；右侧展示六枚模方 $5$ 赫维茨素旋子 $S_5$（[@thm-ch14-lps-norm-five]）在伴随表示中借模 $5$ 秩一外积分裂（[@thm-ch14-hurwitz-mod5-splitting]、[@ex-ch14-mod5-rank1-free-group]）织出的无回溯 $6$-正则自由树 $F_3 \hookrightarrow \mathrm{SO}(3, \mathbb{Q})$，既约词数按 $1, 6, 30, 150, \dots$ 指数展开且永无 $5$-进约分塌缩。
:::

## 14.5 字数指数增长、比特高度率与模方 5 六轴球面覆盖

自由群嵌入 $F_3 \hookrightarrow \mathrm{SO}(3, \mathbb{Q})$ 赋予了有理球面几何极高的信息打包密度。统计恰由 $L$ 枚门构成的既约词数量：长度为 $0$ 的空词有 $1$ 个；长度为 $1$ 的单门有 $6$ 个；此后每追加一拍，只需避开前一步的逆门，尚余 $5$ 种独立分支选择，因此精确字数呈几何级数暴涨 $N_{\mathrm{words}}(L) = 6 \cdot 5^{L - 1}$（$L \ge 1$）：

| 词长（门数）$L$ | 精确既约词数 $N_{\mathrm{words}}(L)$ | 累计词数（球半径 $\le L$） | 旋子模方 $\|\mathbf{q}\|^2 = 5^L$ | 旋子坐标比特高度 $\frac{L}{2}\log_2 5$ |
| :---: | ---: | ---: | ---: | ---: |
| $0$ | $1$ | $1$ | $1$ | $0.000000$ |
| $1$ | $6$ | $7$ | $5$ | $1.160964$ |
| $2$ | $30$ | $37$ | $25$ | $2.321928$ |
| $3$ | $150$ | $187$ | $125$ | $3.482892$ |
| $4$ | $750$ | $937$ | $625$ | $4.643856$ |
| $5$ | $3750$ | $4687$ | $3125$ | $5.804820$ |

审视最右一列：每乘入一枚模方 $5$ 素旋子 $\boldsymbol{\pi}_{5,k}$，四元整旋子 $\mathbf{q} = \boldsymbol{\pi}_{5,k_1} \cdots \boldsymbol{\pi}_{5,k_L} \in \mathbb{Z}^4$ 的欧氏模方严格乘以 $5$（正如零公理定理 [@thm-ch14-reduced-word-non-scalar] 第 2、3 款所证，$\|\mathbf{q}\|^2 = 5^L$ 且 $\mathbf{q}$ 本原不可被 $5$ 约去），因此每个整坐标的绝对值受 $\|\mathbf{q}\| = 5^{L/2}$ 控制，单门旋子存储的**比特高度增长率**精确为

$$
h_{\mathrm{spinor}}(5) = \frac{1}{2}\log_2 5 \approx 1.160964\;\text{比特/门}
$$

（对应伴随旋转矩阵 $R(w) \in \mathrm{SO}(3, \mathbb{Q})$ 的分母 $5^L$ 消耗两倍高度 $\log_2 5 \approx 2.321928$ 比特/门）。长度恰为五的既约词给出 $3750$ 枚互异的有理旋转。

更值得注意的是，同一枚“$(1, \pm 2)$ 模方 $5$ 六轴”整系数构型，在二维单位球面 $S^2 \subset \mathbb{R}^3$ 的覆盖几何中也展现出惊人的代数效率——在所钉 `trureturing` 冻结库中，六条模方 $5$ 有理轴只需一条显式非负多项式恒等式，便足以给出整个球面的无正交开覆盖：

::: {.theorem #thm-ch14-six-axis-open-cover title="模方 5 六条整数有理轴对二维单位球面的无正交开覆盖" lean="D5/S3/Geometry/Orthogonality/RationalSixAxisCover.rational_six_axis_open_cover"}
在三维欧氏空间 $\mathbb{R}^3$ 中，取六条未归一化的模方 $5$ 整数轴（每条满足 $\|a_i\|^2 = 5$）：

$$
a_0 = (1, 2, 0),\quad a_1 = (1, -2, 0),\quad a_2 = (0, 1, 2),\quad a_3 = (0, 1, -2),\quad a_4 = (2, 0, 1),\quad a_5 = (-2, 0, 1),
$$

并在实单位二维球面 $S^2$ 上定义六片严格投影超水平集

$$
C_i := \bigl\{\, x \in S^2 : 5 < 2\langle x, a_i \rangle^2 \,\bigr\} \qquad (i = 0, 1, \dots, 5).
$$

则以下三项同时成立：

1. 每一片 $C_i$ 均是 $S^2$ 的相对开集；
2. 任意同一片 $C_i$ 内部均不含正交对（对任意 $x, y \in C_i$，必有 $\langle x, y \rangle \neq 0$）；
3. 六片开集完整覆盖整个球面：$\bigcup_{i=0}^5 C_i = S^2$。
:::

::: proof
第 1 项直接由连续映射 $x \mapsto 2\langle x, a_i\rangle^2$ 的开原像得出。第 2 项用贝塞尔不等式一举封死：若 $x, y \in C_i$ 互相正交，则 $\{x, y\}$ 为标准正交对，于是 $\langle x, a_i\rangle^2 + \langle y, a_i\rangle^2 \le \|a_i\|^2 = 5$；然而 $x, y \in C_i$ 分别要求 $2\langle x, a_i\rangle^2 > 5$ 与 $2\langle y, a_i\rangle^2 > 5$，相加即得 $5 < \langle x, a_i\rangle^2 + \langle y, a_i\rangle^2 \le 5$，矛盾。第 3 项由一条纯代数非负多项式证书完成：令 $a = |x_0|, b = |x_1|, c = |x_2|$，$M = \max\{a+2b, b+2c, c+2a\}$，并记非负余量 $u = M - a - 2b$、$v = M - b - 2c$、$w = M - c - 2a$，则精确恒等式

$$
3 M^2 - 9(a^2 + b^2 + c^2) = u v + v w + w u + 6(a w + b u + c v) + \frac{(a - b)^2 + (b - c)^2 + (c - a)^2}{2} \ge 0
$$

直接证出对球面上任意 $x$ 必存在某轴 $a_i$ 使 $\langle x, a_i\rangle^2 \ge 3\|x\|^2 = 3$，从而 $2\langle x, a_i\rangle^2 \ge 6 > 5$，即 $x \in C_i$。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch14-literature-and-model-boundary title="雅可比四平方和、赫维茨整环分解与阿代尔几何诠释的证据边界"}
本章的证据按三层严格划界：[@thm-ch14-adelic-product-formula]、[@thm-ch14-prime-log-independence] 与 [@thm-ch14-six-axis-open-cover] 锚定于所钉 `trureturing` 经典阴影冻结声明，而 [@thm-ch14-lps-norm-five]、[@thm-ch14-hurwitz-mod5-splitting]、[@thm-ch14-reduced-word-non-scalar] 与 [@thm-ch14-reduced-words-adjoint-injective] 全部冻结于使用 `OmegaInit` 与 `OmegaMath` 的 D5 形式化（`strict_omega.axioms: []`），完整覆盖模方 $5$ 六生成元、赫维茨十二射影单位核、$\mathrm{Mat}_2(\mathbb{F}_5)$ 秩一外积分裂、任意既约词的 $5$-本原性与非标量性，以及 $S_5$ 自由生成 $F_3 \hookrightarrow \mathrm{SO}(3, \mathbb{Q})$ 的双轴伴随单射定理；第 14.4 节在 $3\times 3$ 伴随表示 $\mathrm{Mat}_3(\mathbb{F}_5)$ 中的补充显式外积核验（[@ex-ch14-mod5-rank1-free-group]）以及字长表与比特高度率 $\frac{1}{2}\log_2 5$ 为完整初等代数论证（`手工推导`）；将素数解读为平直切线发散下的超度量曲率回收核属本书概念诠释（`MODEL`）。**文献结果，未在本书形式化**：正整数四平方和表法数 $r_4(n) = 8\sum_{4 \nmid d \mid n} d$ 源于 C. G. J. Jacobi（*Fundamenta Nova*, 1829）；极大四元整环 $\mathcal{H}(\mathbb{Z})$ 的带余除法与素元分解源于 A. Hurwitz（*Nachr. Ges. Wiss. Göttingen*, 1896, pp. 313–340）；$(3,4,5)$ 旋转生成自由群与一般奇素数 $p \equiv 1 \pmod 4$ 的自由积结构见 S. Świerczkowski（*Fund. Math.* **46**, 187–189, 1958）及 A. Lubotzky, R. Phillips & P. Sarnak（*Combinatorica* **8**, 261–277, 1988）。另需注意，[@thm-ch14-six-axis-open-cover] 的六条轴位于三维空间 $\mathbb{R}^3$ 并共享模方 $5$ 的 $(1, \pm 2)$ 整系数构型，它与四维四元数旋子集 $S_5 \subset \mathbb{Z}^4$ 分属不同维度载体，切勿混同。
:::

下面的短片沿本章主线走一遍：从每个素数一把尺，到六枚素旋子织出的自由树，再到六轴球面覆盖。

::: {.film src="a-ruler-for-every-prime"}
**平直尺拉长多少，素数尺就收回多少；一颗素数 $5$ 分裂成六枚素旋子，织出一棵永不回头的自由树（2 分 42 秒）。** 对数刻度的条形图上，青色条是平直读数 $|n|_\infty$，品红条是素数读数 $|n|_p$，两边等长；$2$ 至 $6$ 与对 $2$、$3$、$5$ 号尺全盲的逃逸见证 $31$ 的总积均在屏幕上重算为 $1$，绿色标签对应 [@thm-ch14-adelic-product-formula] 与 [@thm-ch14-prime-log-independence]，把素数读作曲率回收核的紫色面板是本书诠释。随后 $(1 + 2i)(1 - 2i) = 5$ 给出六枚素旋子，绿色标签对应 [@thm-ch14-lps-norm-five]；$1 + 2i$ 的 $(3, 4, 5)$ 旋转矩阵、六个模 $5$ 的 $2\times 2$ 矩阵及其“一列乘一行”分解、$6\times 6$ 乘积表中恰在互逆对处的 $6$ 个品红零格为屏幕计算，绿色标签对应 [@thm-ch14-hurwitz-mod5-splitting]。既约词 $(1 + 2i)(1 + 2j)(1 + 2k) = (-7, 6, -2, 6)$ 的模方 $125 = 5^3$、衔接标量 $3$ 与 $4$、琥珀色的模 $5$ 余数 $3, 1, 3, 1$ 为屏幕计算，“衔接处非零”的链式图景是证明思路；绿色标签对应 [@thm-ch14-reduced-word-non-scalar] 第 1、2 款与 [@thm-ch14-reduced-words-adjoint-injective]。径向自由树以青、品红、紫三色区分 $i$、$j$、$k$ 三轴，词数 $6$、$30$、$150$，长度不超过 $3$ 的 $187$ 个既约词给出 $187$ 个互异旋转，比特高度 $\tfrac12 \log_2 5 \approx 1.160964$，均为屏幕计算（参见 [@ex-ch14-mod5-rank1-free-group]）。最后六根模方 $5$ 的轴及其 $45^\circ$ 球冠盖满球面，绿色标签对应 [@thm-ch14-six-axis-open-cover]，球面上的采样点只是示意。
:::

读者可在下方的交互实验卡中亲手验证本章的两条主轴：一方面输入任意非零有理数实时拆解阿代尔乘积恒等式 $|r|_\infty \prod_p |r|_p = 1$，另一方面沿六枚模方 $5$ 生成元 $S_5$ 自由拼接旋转词，现场观察六度凯莱树的无碰撞生长与全部 $36$ 对模 $5$ 秩一外积衔接标量。

::: {.viz src="adelic-arithmetic-observer-lab" preset="adelic-balance-and-f3-tree" height="520"}
**阿代尔乘积归元与 $S_5 \hookrightarrow F_3$ 自由树实验卡（`adelic-balance-and-f3-tree`）。** 交互调节有理数 $r \in \mathbb{Q}^\times$ 核验平直范数 $|r|_\infty$ 与有限支集 $p$-进范数精确配平 $|r|_\infty \prod_p |r|_p = 1$（[@thm-ch14-adelic-product-formula]），并在同卡中逐拍拼接 $S_5$ 六枚模方 $5$ 素旋子（[@thm-ch14-lps-norm-five]），实时展开 $6$-正则自由群凯莱树 $F_3$ 与模 $5$ 秩一矩阵外积分裂（[@thm-ch14-hurwitz-mod5-splitting]、[@ex-ch14-mod5-rank1-free-group]），直观确认仅互逆对归零、所有非空既约词精确保持分母 $5^L$。
:::

现在，六枚模方 $5$ 素旋子 $S_5$ 已经在 $\mathrm{SO}(3, \mathbb{Q})$ 中织出一棵永不闭合的 $6$-正则自由树 $F_3$。自然而迫切的下一个问题是：**当这六枚素旋子作为球面平均算子同时作用于三维球面上的高阶有理谐波时，它们的扩散速度究竟有多快？能否把谱理论中原本依赖复数 $\mathbb{C}$、对数 $\ln p$ 与平方根 $\sqrt{p}$ 的拉马努金最优谱隙，彻底改写为一条零复数、零根号的纯有理半正定不等式？** 这将引领我们进入卷五的高潮——[第十五章](ch15-rational-hecke-ramanujan-spectrum.md)。
