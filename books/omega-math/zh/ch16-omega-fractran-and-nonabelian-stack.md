# 第十六章 Ω-FRACTRAN 非阿贝尔旋子机与二维矩阵环

> *“既然宇宙与观察者的全部状态、保真度读数与射流演化都是纯有理数，观察者内部的自指推演就不必借用外置字节数组与程序计数器——它以素数绕数为正交寄存器，以整四元数旋子为非对易因果栈。”*

前五卷从纯归纳构造演算（CIC）与齐次射影闭环出发，历经三维本原三元流形、无原点流群、无极限射流微积分、无 $\pi$ 球面调和分析，直至阿代尔乘积归元与模方 $5$ 的有理赫克—拉马努金谱隙，始终不曾向实数连续统 $\mathbb{R}$ 或超越常数赊借半分。跨入第六卷，一个直指计算论底层的问题水落石出：**在一个全有理、零外部背景的几何宇宙里，计算机器的原生指令集（ISA）究竟长什么样？**

本章分三节回答这一问题。第 16.1 节由康威（John H. Conway）的标量有理机器 FRACTRAN 切入，以冻结 **`LEAN ✓`** 定理锚定正交素数寄存器、显式步数可计算性以及使用 `OmegaInit` 与 `OmegaMath` 的 D5 形式化（`strict_omega.axioms: []`）中的标量 FRACTRAN 精确语义、确定性、正态保持、停机稳定性与四门有理程序 $P_\Omega$ 从 $2^{17} = 131{,}072$ 经 $15$ 次跃迁首次精确停机于 $22$ 的完整轨迹（配以五素数指数手算账本）；第 16.2 节揭示标量乘法可交换性所带来的“阿贝尔词序税”，将状态载体升维至整四元数旋子晶格 $\mathbb{Z}^4 \subset \mathcal{H}(\mathbb{Z})$，建立基于精确整除闸门（`Output(1) ≡ Input(0')`）的非阿贝尔 $\Omega$-FRACTRAN 旋子机（架构诠释标为 **`MODEL`**），在逐分量手算核验 `psiXY` 与 `psiYX` 的模 $5$ 分离之后，以零公理冻结 **`LEAN ✓`** 定理（`strict_omega.axioms: []`，`OmegaInit` $+$ `OmegaMath`）锚定一般整除跃迁确定性与该模 $5$ 词序分离；第 16.3 节构造零公理二维整数矩阵环 `Mat2`，先以显式多项式展开呈现四条核心矩阵算术律，再以零公理冻结 **`LEAN ✓`** 定理完整锚定迹循环性、行列式乘性 $\det(AB) = \det(A)\det(B)$、伴随阵双侧恒等式与普适凯莱—哈密顿恒等式 $A^2 - \operatorname{tr}(A)A + \det(A)I = 0$，将非阿贝尔旋子计算与矩阵代数严密贯通。

## 16.1 标量 FRACTRAN、正交素数寄存器与 16 阶停机轨迹 {#sec-om-ch16-scalar-fractran}

传统冯·诺依曼计算模型把平直字节数组、外部内存地址与程序计数器割裂成三套外置装置，允许任意比特位在不检验全局相容性的情况下被强行覆写。康威于 1987 年提出的 **FRACTRAN**（`文献结果`）则将整台机器压缩到极致：

- **机器状态**：唯一一个正整数 $N \in \mathbb{Z}_+$；
- **机器程序**：一列有序的既约正有理数表 $P = \bigl(\frac{a_1}{b_1}, \frac{a_2}{b_2}, \dots, \frac{a_k}{b_k}\bigr) \in (\mathbb{Q}_{>0})^k$；
- **单拍执行规则**：从左至右依次扫描分数表，选取**第一枚**使 $N' = N \cdot \frac{a_i}{b_i}$ 仍为正整数的分数（即满足整除守卫 $b_i \mid N$），令 $N \leftarrow N'$ 并回到表头；若表中无一分母整除 $N$，机器立即幂等停机。

这台只有一条规则的算术机器之所以拥有无界多寄存器计算能力，根植于算术基本定理在正有理数乘法群上的精确群同构，以及可计算步骤对显式资源上界的构造性控制。下面两条冻结声明从底层的素指数账本与显式步数比较机两个维度给出严格锚定。

::: {.theorem #thm-om-ch16-signed-prime-ledger title="有限支集带符号素数账本与正有理数乘法群同构" lean="D5/S3/Factorization/PositiveRationalGroup.signed_prime_ledger_equiv_positive_rationals"}
设有限支集带符号素数指数函数空间为 $\mathrm{SignedPrimeLedger} := (\mathrm{Nat.Primes} \to_0 \mathbb{Z})$，正有理数乘法群为 $\mathrm{PositiveRational} := \mathbb{Q}_{\ge 0}^\times$。则规范加法群同态 `primeExponentEquivPositiveRational : (Nat.Primes →₀ Int) ≃+ Additive NNRatˣ` 为双射（`Function.Bijective`），将带符号素数账本的逐素数加法严格同构于正有理数的乘法。
:::

::: {.proof}
先由算术基本定理建立正自然数乘法与有限支集自然数素指数账本之间的同构，再将自然数素指数账本与正自然数乘法幺半群各自作格罗滕迪克群局部化（Grothendieck group localization），由局部化的泛性质得到加法群等价 `primeExponentEquivPositiveRational`，故其底映射必然双射。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-om-ch16-binary-name-compare title="二进制名称比较机的显式线性步数停机定理" lean="D5/S0/Computability/BinaryNameComparison.name_compare_run"}
对任意二进制字 $a, b, \mathrm{output}, \mathrm{frame} : \mathrm{List}\;\mathrm{Bool}$，名称比较机转移函数 `compareMachine.step` 从初态 `compareCfg (some .compare) ⟨none, none, true⟩ a b [] [] output frame` 出发，在至多 $2(\lvert a\rvert + \lvert b\rvert) + 4$ 步内必然停机于 `some (compareCfg none ⟨none, none, true⟩ a b [] [] (decide (a = b) :: output) frame)`：精确写出布尔相等判定结果 `decide (a = b)`，无损复原两枚无界操作数 $a, b$，清空两枚备份栈，并原样保留调用帧与先前输出。
:::

::: {.proof}
将执行过程拆为逐位比较并压入备份栈、长度不等分支清理、逐位弹出恢复两枚操作数以及写入相等判定并停机四个阶段，对列表长度归纳累计各阶段精确转移步数，总步数受 $2(\lvert a\rvert + \lvert b\rvert) + 4$ 显式上界控制，且不依赖任何外部停机证书。完整证明由 Lean 内核检查。
:::

结合 [@thm-om-ch16-signed-prime-ledger]，每一个正整数状态 $N = \prod_{p} p^{v_p(N)}$ 唯一对应一根非负整数向量 $\mathbf{r}(N) = (v_2(N), v_3(N), v_5(N), \dots) \in \mathbb{N}^{(\mathbb{P})}$，每颗素数 $p$ 充当一根彼此正交的独立计数器寄存器；每一条分数规则 $\frac{a_i}{b_i}$ 对应一条有限支集带符号更新向量 $\Delta\mathbf{r}_i = \mathbf{r}(a_i) - \mathbf{r}(b_i) \in \mathbb{Z}^{(\mathbb{P})}$。整除守卫 $b_i \mid N$ 等价于检查 $\forall p,\, v_p(N) + \Delta r_i(p) \ge 0$：凡会产生负素指数（即非整数“分数裂口”）的规则一律被静默阻断，凡零余数通过者则把输出态 $N'$ 原地喂回为下一拍输入（`Output(1) ≡ Input(0')`）。

更进一步，标量 FRACTRAN 的单拍执行器与首启用分母关系语义的等价性、转移确定性、正整数态保持性以及停机后的幂等稳定性，均已在使用 `OmegaInit` 与 `OmegaMath` 的 D5 形式化（`strict_omega.axioms: []`）中完整冻结：

::: {.theorem #thm-ch16-scalar-fractran-semantics title="标量 FRACTRAN 精确语义、确定性、正态保持与停机稳定性" lean="D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.fractran_step_iff D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.fractran_deterministic D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.fractran_positive D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.fractran_stable"}
在所引 D5 定理（`strict_omega.axioms: []`）使用的 `Omega.Fractran` 命名空间中，每条分数规则 `Rule` 以前驱对存储正分子 `numerator := numeratorPred.succ` 与正分母 `denominator := denominatorPred.succ`，有序程序 `Fractran.Program` 为规则的归纳表；单条规则检验所存分母是否整除输入态（对既约分数即等价于通常的整乘积判定）。记自左向右扫描的求值器为 `Fractran.step prog n`，首启用规则的关系语义为 `Fractran.Step prog n m`，无规则启用谓词为 `Fractran.Halts prog n`，而 `Fractran.run prog k n` 为停机时原样保持的迭代算子 `advance prog` 的 $k$ 拍迭代。则对任意 `prog : Fractran.Program` 与自然数 `n, m, m₁, m₂, k, extra : Omega.Nat`，以下四项同时成立：

1. **求值器与关系语义等价**（`fractran_step_iff`）：`Fractran.step prog n = .some m ↔ Fractran.Step prog n m`；
2. **单步转移确定性**（`fractran_deterministic`）：若 `Fractran.Step prog n m₁` 与 `Fractran.Step prog n m₂` 同时成立，则 `m₁ = m₂`；
3. **正整数状态闭保持性**（`fractran_positive`）：若 $0 < n$，则对任意步数 $k$ 恒有 $0 < \mathrm{Fractran.run}\;\mathrm{prog}\;k\;n$；
4. **停机态的幂等稳定性**（`fractran_stable`）：若 `Fractran.Halts prog (Fractran.run prog k n)` 成立，则对任意追加步数 `extra` 恒有 `Fractran.run prog (k + extra) n = Fractran.run prog k n`。
:::

::: {.proof}
第一项对程序列表 `prog` 做结构归纳：利用整商求值器 `exactQuotient` 的完备刻画（返回 `.some q` 当且仅当 `denominator * q = n`，返回 `.none` 当且仅当 `¬ Divides rule n`），逐项对照 `step` 的首命中分支与 `Step` 的 `fire`/`skip` 分支，得可靠性与完备性双向蕴含。第二项将两条关系跃迁经第一项映射到同一求值结果 `.some m₁ = step prog n = .some m₂`，由 `Result.some` 单射性即得 `m₁ = m₂`。第三项对步数 $k$ 归纳：若某步停机（`step = .none`）则状态不变仍为正；若某条规则以商 $q$ 触发，则 `denominator * q = s > 0` 迫使 $q > 0$，又因 `numerator = numeratorPred.succ > 0`，故新态 `q * numerator > 0`。第四项先由 `extra` 归纳拆出 `run prog (k + extra) n = run prog extra (run prog k n)`，再由 `halts_iff` 知停机态满足 `step = .none` 从而 `advance` 恒等不动，归纳即得追加任意步均不改变状态。全程仅依赖零公理基础库 `OmegaInit` 与 `OmegaMath`。完整证明由 Lean 内核检查。
:::

下面先用一台具体的四门有理程序直观展开五素数寄存器的逐拍账本，再以零公理内核定理将其完整 $15$ 次跃迁与首次停机性严格锁定。

::: {.example #ex-om-ch16-sixteen-state-fractran-trace title="四门有理程序 $P_\Omega$ 从 $2^{17}$ 停机于 $22$ 的 16 阶轨迹"}
考察作用在五座正交素数寄存器 $\{2, 3, 5, 7, 11\}$ 上的有序四门程序（下表五素数指数分解为 `手工推导` 账本，完整 $15$ 步跃迁与首次停机见下方 [@thm-ch16-p-omega-halts-at-22]）：

$$
P_\Omega \;=\; \left[\frac{11}{49},\; \frac{7}{25},\; \frac{5}{9},\; \frac{3}{4}\right] \;=\; \left[\frac{11}{7^2},\; \frac{7}{5^2},\; \frac{5}{3^2},\; \frac{3}{2^2}\right].
$$

从单一纯二次幂种子 $N_0 = 2^{17} = 131{,}072$（指数向量 $(17, 0, 0, 0, 0)$）起步，机器依次把低阶素数的两份进位兑换为高一阶素数的一份，历经 $15$ 次有效整除跃迁（覆盖 $16$ 个状态 $M_1$–$M_{16}$），并于第 $16$ 拍扫描检验全部四枚分母皆不整除终态 $22 = 2^1 \cdot 11^1$ 时幂等停机：

| 步序 / 里程碑 | 触发规则 | 状态 $N$ | 五素数指数 $(v_2, v_3, v_5, v_7, v_{11})$ |
| :---: | :---: | ---: | :---: |
| $0$（$M_1$） | 初态种子 | $131{,}072$ | $(17, 0, 0, 0, 0)$ |
| $1$（$M_2$） | 规则 4（$3/4$） | $98{,}304$ | $(15, 1, 0, 0, 0)$ |
| $2$（$M_3$） | 规则 4（$3/4$） | $73{,}728$ | $(13, 2, 0, 0, 0)$ |
| $3$（$M_4$） | 规则 3（$5/9$） | $40{,}960$ | $(13, 0, 1, 0, 0)$ |
| $4$（$M_5$） | 规则 4（$3/4$） | $30{,}720$ | $(11, 1, 1, 0, 0)$ |
| $5$（$M_6$） | 规则 4（$3/4$） | $23{,}040$ | $(9, 2, 1, 0, 0)$ |
| $6$（$M_7$） | 规则 3（$5/9$） | $12{,}800$ | $(9, 0, 2, 0, 0)$ |
| $7$（$M_8$） | 规则 2（$7/25$） | $3{,}584$ | $(9, 0, 0, 1, 0)$ |
| $8$（$M_9$） | 规则 4（$3/4$） | $2{,}688$ | $(7, 1, 0, 1, 0)$ |
| $9$（$M_{10}$） | 规则 4（$3/4$） | $2{,}016$ | $(5, 2, 0, 1, 0)$ |
| $10$（$M_{11}$） | 规则 3（$5/9$） | $1{,}120$ | $(5, 0, 1, 1, 0)$ |
| $11$（$M_{12}$） | 规则 4（$3/4$） | $840$ | $(3, 1, 1, 1, 0)$ |
| $12$（$M_{13}$） | 规则 4（$3/4$） | $630$ | $(1, 2, 1, 1, 0)$ |
| $13$（$M_{14}$） | 规则 3（$5/9$） | $350$ | $(1, 0, 2, 1, 0)$ |
| $14$（$M_{15}$） | 规则 2（$7/25$） | $98$ | $(1, 0, 0, 2, 0)$ |
| $15$（$M_{16}$） | 规则 1（$11/49$） | $22$ | $(1, 0, 0, 0, 1)$ |
| $16$（停机检验） | 无（$49, 25, 9, 4 \nmid 22$） | $22$ | $(1, 0, 0, 0, 1)$ |

每一步的指数守恒与权重递推清晰可见：$17 = 1 + 2^4$，恰好消耗掉 $16$ 枚素因子 $2$ 逐级归并成 $1$ 枚素因子 $11$，留下一枚不可再约的残余素因子 $2$，最终锁定于 $22 = 2 \cdot 11$。
:::

上表中的完整 $15$ 次跃迁轨迹及其“恰在第 $15$ 步首次抵达停机态 $22$”的精确断言，已不再只是手算算例，而是在使用 `OmegaInit` 与 `OmegaMath` 的 D5 形式化（`strict_omega.axioms: []`）中由 Lean 内核直接认证的冻结见证定理：

::: {.theorem #thm-ch16-p-omega-halts-at-22 title="四门有理程序 $P_\Omega$ 从 $2^{17}$ 经 15 次跃迁首次精确停机于 $22$" lean="D5/S3/Quantum/AURICOmega/OmegaComposeAndWitnesses.p_omega_halts_at_22"}
在所引 D5 定理（`strict_omega.axioms: []`）使用的 `Omega.Fractran` 命名空间中，取有序四门程序 `pOmega` $= [\frac{11}{49}, \frac{7}{25}, \frac{5}{9}, \frac{3}{4}]$、十进制编码初态 `pOmegaStart` $= 131{,}072$（即 $2^{17}$）、终态 `pOmegaFinal` $= 22$，以及由 [@ex-om-ch16-sixteen-state-fractran-trace] 步序 $1$–$15$ 依次排成的后继状态表 `pOmegaTrace` $= [98{,}304,\, 73{,}728,\, 40{,}960,\, 30{,}720,\, 23{,}040,\, 12{,}800,\, 3{,}584,\, 2{,}688,\, 2{,}016,\, 1{,}120,\, 840,\, 630,\, 350,\, 98,\, 22]$。记逐拍关系链谓词为 `Follows`（要求相邻前后态依次满足首启用规则关系 `Fractran.Step`），则如下四项合取严格成立：

$$
\begin{aligned}
&\mathrm{Follows}\;\mathrm{pOmega}\;\mathrm{pOmegaTrace}\;\mathrm{pOmegaStart} \\
&\land\; \mathrm{run}\;\mathrm{pOmega}\;15\;\mathrm{pOmegaStart} = \mathrm{pOmegaFinal} \\
&\land\; \mathrm{Halts}\;\mathrm{pOmega}\;\mathrm{pOmegaFinal} \\
&\land\; \forall k < 15,\; \neg\,\mathrm{Halts}\;\mathrm{pOmega}\;(\mathrm{run}\;\mathrm{pOmega}\;k\;\mathrm{pOmegaStart}).
\end{aligned}
$$

即从 $131{,}072$ 出发，`pOmega` 严格沿 `pOmegaTrace` 完成 $15$ 次有效整除跃迁并在第 $15$ 步首次抵达停机态 $22$，此前任意步数 $k < 15$ 均不停机。
:::

::: {.proof}
模块将所有大整数表示为低位在前的十进制数字表（`decimalValue`），并基于零公理欧几里得除法构造逐位长除算法 `divideDigits`，经归纳证得等式 `d * quotient + remainder = decimalValue digits`（`divideDigits_sound`）。当某条规则的分母余数为 $0$ 且目标态对分子的整商与之相等时，`fire_decimal` 直接给出该规则激活的 `Step` 证据；当余数满足 $0 < r < d$ 时，欧几里得余数唯一性（`skip_decimal`）当场排除了整除可能，从而给出严格跳过前序规则的证据。逐一构造这 $15$ 条跃迁引理即证 `Follows pOmega pOmegaTrace pOmegaStart`；沿 `Follows` 链对表长归纳（`run_follows`）并调用单步关系可靠性 `Step.sound` 立得 `run pOmega 15 pOmegaStart = pOmegaFinal`；在 `d22` 处对全部四枚分母 $49, 25, 9, 4$ 分别施以 `skip_decimal` 证得 `Halts pOmega pOmegaFinal`。最后，沿有效轨迹 `Follows` 做归纳（`running_before_trace_end`）：任意 $k < 15$ 处的中间态均存在合法后继跃迁 `Step`，由 `Step.sound` 与 `halts_iff`（[@thm-ch16-scalar-fractran-semantics]）知其 `step` 返回 `.some` 而非 `.none`，故必有 `¬ Halts pOmega (run pOmega k pOmegaStart)`。全程仅依赖零公理基础库 `OmegaInit` 与 `OmegaMath`。完整证明由 Lean 内核检查。
:::

## 16.2 非阿贝尔 $\Omega$-FRACTRAN 旋子机与精确整除闸门 {#sec-om-ch16-omega-fractran-spinor-gate}

标量 FRACTRAN 虽然图灵完备，却背负着一笔根本性的代数代价：**标量有理数乘法满足交换律** $\frac{a}{b}\cdot\frac{c}{d} = \frac{c}{d}\cdot\frac{a}{b}$。因此，单个正整数 $N$ 只能记录每根素数轴上累积了多少份绕数，却彻底抹除了“先施加哪条操作、后施加哪条操作”的因果词序。要在标量 FRACTRAN 中模拟调用栈或分支时序，程序不得不额外开辟大量人工“标志素数”充当红绿灯。

在 $\mathbf{Math}_\Omega$ 的三维球面几何下，解除这笔阿贝尔交换税只需一次极其自然的升维：将标量正整数 $N \in \mathbb{Z}_+$ 替换为四元整旋子 $\mathbf{\Psi} = (w, x, y, z) \in \mathbb{Z}^4 \subset \mathcal{H}(\mathbb{Z})$（其中利普希茨整环 $\mathbb{Z}[\mathbf{i},\mathbf{j},\mathbf{k}] \cong \mathbb{Z}^4$ 嵌入在极大赫维茨整环 $\mathcal{H}(\mathbb{Z}) = \mathbb{Z}[\mathbf{i},\mathbf{j},\mathbf{k}, \frac{1+\mathbf{i}+\mathbf{j}+\mathbf{k}}{2}]$ 内）。这一载体天生具备**双重编码能力**（`MODEL`）：

1. **径向标量模方编码正交素数寄存器**：由四平方乘性恒等式 $\|\mathbf{\Psi}_1\mathbf{\Psi}_2\|^2 = \|\mathbf{\Psi}_1\|^2 \|\mathbf{\Psi}_2\|^2$，标量模方 $\|\mathbf{\Psi}\|^2 = w^2 + x^2 + y^2 + z^2 = \prod_p p^{v_p}$ 完整保留了经典 FRACTRAN 的全部正交素数寄存器账本；
2. **球面非对易取向编码原生因果词序栈**：四元数乘法不满足交换律，同一标量模方下不同乘积次序对应三维球面上的不同方向，令操作历史直接刻进状态本身的几何取向之中，无需任何外置堆栈指针或辅助标志素数。

::: {.definition #def-om-ch16-omega-fractran-machine title="非阿贝尔 Ω-FRACTRAN 旋子机与精确整除闸门"}
在整四元数晶格 $\mathbb{Z}^4 \subset \mathcal{H}(\mathbb{Z})$ 上，定义一台**非阿贝尔 $\Omega$-FRACTRAN 旋子机**（`MODEL`）由非零初态 $\mathbf{\Psi}_0 \in \mathbb{Z}^4 \setminus \{0\}$ 与有序旋子闸门表 $\mathcal{G} = \bigl((A_1, p_1), (A_2, p_2), \dots, (A_k, p_k)\bigr)$（其中 $A_i \in \mathbb{Z}^4 \setminus \{0\}$，$p_i \in \mathbb{Z}_{>0}$ 为正整数除数，典型取为 $A_i$ 的素模方）组成。单拍步进算子按顺序扫描 $\mathcal{G}$，选取第一枚满足**四分量精确整除闸门条件**

$$
\frac{\mathbf{\Psi}\cdot A_i}{p_i} \;\in\; \mathbb{Z}^4 \qquad \Longleftrightarrow \qquad \mathbf{\Psi}\cdot A_i \;\equiv\; (0, 0, 0, 0) \pmod{p_i}
$$

的闸门，输出新状态 $\mathbf{\Psi}' := \mathbf{\Psi}\cdot A_i / p_i$ 并立即将 `Output(1)` 咽回作下一拍的 `Input(0')`；若任意分量模 $p_i$ 余数非零，该闸门当场阻塞并静默跳过；若全表皆阻塞，则机器幂等停机于 $\mathbf{\Psi}$。特别地，当退栈闸门取为共轭整旋子 $A_i = \overline{B_i}$ 且 $p_i = \|B_i\|^2$ 时，由 $\mathbf{\Psi}'\cdot B_i = \frac{\mathbf{\Psi}\overline{B_i}B_i}{\|B_i\|^2} = \mathbf{\Psi}$ 可知每一步激活转移皆为**零余数可逆退栈**。
:::

把两枚模方同为 $5$ 的本原素旋子 $X = (1, 2, 0, 0)$ 与 $Y = (1, 0, 2, 0)$ 按相反顺序相乘，得到标量模方完全相等、但球面手性截然相反的两个态 `psiXY` 与 `psiYX`。将它们送入同一枚模 $5$ 退栈闸门 `gateUnwindY = (1, 0, -2, 0)`，乘法次序直接决定闸门放行还是阻塞。

::: {.figure src="ch16-omega-fractran-gate"}
**乘法次序决定非阿贝尔整除闸门能否开启。** 左右两列输入态 `psiXY = (1, 2, 2, 4)` 与 `psiYX = (1, 2, 2, −4)` 的标量模方同为 $25$，经同一紫色右乘闸门 `gateUnwindY = (1, 0, −2, 0)` 后：左列青色链产物 $(5, 10, 0, 0)$ 四个分量皆被 $5$ 整除，干净转移至 $(1, 2, 0, 0)$；右列品红链产物 $(5, −6, 0, −8)$ 在模 $5$ 下留下非零余数 $(0, 4, 0, 2)$，闸门当场阻塞。
:::

::: {.example #ex-om-ch16-nonabelian-stack-proof title="手算分离：psiXY 与 psiYX 在模 5 精确整除闸门下的完整验证"}
记四元数基元满足 $\mathbf{i}^2 = \mathbf{j}^2 = \mathbf{k}^2 = \mathbf{i}\mathbf{j}\mathbf{k} = -1$（故 $\mathbf{i}\mathbf{j} = \mathbf{k},\; \mathbf{j}\mathbf{i} = -\mathbf{k},\; \mathbf{k}\mathbf{j} = -\mathbf{i}$）。取两枚模方为 $5$ 的整旋子 $X = (1, 2, 0, 0) = 1 + 2\mathbf{i}$ 与 $Y = (1, 0, 2, 0) = 1 + 2\mathbf{j}$，以及 $Y$ 的共轭退栈闸门 `gateUnwindY` $= \overline{Y} = (1, 0, -2, 0) = 1 - 2\mathbf{j}$（除数 $p = 5$）（`手工推导`）：

1. **构造两枚同模方、异词序状态**：

   $$
   \begin{aligned}
   \mathrm{psiXY} &= X\cdot Y = (1 + 2\mathbf{i})(1 + 2\mathbf{j}) = 1 + 2\mathbf{i} + 2\mathbf{j} + 4\mathbf{k} = (1, 2, 2, 4), \\
   \mathrm{psiYX} &= Y\cdot X = (1 + 2\mathbf{j})(1 + 2\mathbf{i}) = 1 + 2\mathbf{i} + 2\mathbf{j} - 4\mathbf{k} = (1, 2, 2, -4).
   \end{aligned}
   $$

   两者标量模方均为 $1^2 + 2^2 + 2^2 + (\pm 4)^2 = \mathbf{25} = 5^2$，在标量 FRACTRAN 下彻底不可分辨。
2. **`psiXY` 零余数干净通过并可逆退栈**：

   $$
   \begin{aligned}
   \mathrm{psiXY}\cdot\mathrm{gateUnwindY}
   &= (1 + 2\mathbf{i} + 2\mathbf{j} + 4\mathbf{k})(1 - 2\mathbf{j}) \\
   &= (1 + 4) + (2 + 8)\mathbf{i} + (2 - 2)\mathbf{j} + (4 - 4)\mathbf{k} = (5, 10, 0, 0).
   \end{aligned}
   $$

   四个整数分量模 $5$ 全为零，除以 $5$ 精准还原先压栈元素 $(1, 2, 0, 0) = X \in \mathbb{Z}^4$；反向右乘 $Y$ 立得 $(1, 2, 0, 0)\cdot(1, 0, 2, 0) = (1, 2, 2, 4)$，实现无损可逆转移。
3. **`psiYX` 因非阿贝尔余数当场阻塞**：

   $$
   \begin{aligned}
   \mathrm{psiYX}\cdot\mathrm{gateUnwindY}
   &= (1 + 2\mathbf{i} + 2\mathbf{j} - 4\mathbf{k})(1 - 2\mathbf{j}) \\
   &= (1 + 4) + (2 - 8)\mathbf{i} + (2 - 2)\mathbf{j} + (-4 - 4)\mathbf{k} = (5, -6, 0, -8).
   \end{aligned}
   $$

   由于 $-6 \equiv 4 \pmod 5$、$-8 \equiv 2 \pmod 5$，其模 $5$ 非负余数向量为 $(0, 4, 0, 2) \neq (0, 0, 0, 0)$，分数撕裂立即关闭闸门！反之，若将 `psiYX` 送入次序靠后的 `gateUnwindX` $= (1, -2, 0, 0)$，则 $(1 + 2\mathbf{i} + 2\mathbf{j} - 4\mathbf{k})(1 - 2\mathbf{i}) = (5, 0, 10, 0)$ 整除 $5$ 得 $(1, 0, 2, 0) = Y$。两枚闸门不耗费半颗标志素数，原生执行严格的后进先出（LIFO）非阿贝尔栈！
:::

上述手算不仅是一次直观验算：整四元数旋子闸门的一般转移确定性（对任意态、任意旋子与任意非零整数分母，合法整除跃迁唯一确定后继态），以及等模方异词序双态 `psiXY` 与 `psiYX` 在模 $5$ 退栈闸门 `gateUnwindY` 下的严格分离，均由冻结的 D5 模块 `OmegaBargmannHaarHecke` 给出，所引声明的严格端记录为 `strict_omega.axioms: []`。

::: {.theorem #thm-ch16-quaternion-fractran-gate title="非阿贝尔四元数 Ω-FRACTRAN 闸门的确定性与模 5 词序分离" lean="D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.quaternion_fractran_deterministic, D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.quaternion_fractran_order_separation"}
在所引 D5 声明（`strict_omega.axioms: []`）使用的整四元数类型 `Quad4` 上，记整除跃迁关系 `Step psi A p q`（刻画态 `psi` 经旋子 `A` 与非零整数分母 `p` 精确整除转移至后继态 `q`）及启用谓词 `Enabled psi A p`（存在后继态 `q : Quad4` 使该跃迁成立）。则以下两项结论同时成立：

1. **单步整除跃迁的确定性**（`quaternion_fractran_deterministic`）：对任意 `psi, A, q₁, q₂ : Quad4` 与整数 `p : Int`，若 `p ≠ 0` 且同时满足 `psi * A = p • q₁` 与 `psi * A = p • q₂`，则必有 `q₁ = q₂`。
2. **等模方异词序双态的模 5 精确分离**（`quaternion_fractran_order_separation`）：取 `psiX = (1, 2, 0, 0)`、`psiXY = (1, 2, 2, 4)`、`psiYX = (1, 2, 2, -4)` 与 $Y$ 轴退栈闸门 `gateUnwindY = (1, 0, -2, 0)` 及分母 $5$，则有

   $$
   \begin{aligned}
   &\mathrm{psiXY}.\mathrm{normSq} = 5^2 \;\land\; \mathrm{psiYX}.\mathrm{normSq} = 5^2 \\
   &\land\; \mathrm{Step}\;\mathrm{psiXY}\;\mathrm{gateUnwindY}\;5\;\mathrm{psiX} \\
   &\land\; \neg\,\mathrm{Enabled}\;\mathrm{psiYX}\;\mathrm{gateUnwindY}\;5,
   \end{aligned}
   $$

   即两枚相反词序状态共享模方 $5^2 = 25$，而分母为 $5$ 的退栈闸门 `gateUnwindY` 将 `psiXY` 干净转移至 `psiX` 同时阻塞 `psiYX`。
:::

::: {.proof}
第一部分：由 `psi * A = p • q₁` 与 `psi * A = p • q₂` 经等式传递性得 `p • q₁ = p • q₂`。在零公理整数环 `Omega.Int` 上逐分量展开，四个坐标分别满足 $p a_1 = p a_2$，即 $p(a_1 - a_2) = 0$；因 `p ≠ 0` 且整数环无零因子，左消去 `p` 即得四分量逐一相等，从而 `q₁ = q₂`。

第二部分：直接由整四元数模方定义计算得 `psiXY.normSq` $= 1^2 + 2^2 + 2^2 + 4^2 = 25 = 5^2$ 与 `psiYX.normSq` $= 1^2 + 2^2 + 2^2 + (-4)^2 = 25 = 5^2$。对 `psiXY` 展开四元数乘积得 `psiXY * gateUnwindY` $= (5, 10, 0, 0) = 5 \cdot (1, 2, 0, 0) = 5 \cdot \mathrm{psiX}$，结合 $5 \neq 0$ 立得 `Step psiXY gateUnwindY 5 psiX`。对 `psiYX` 展开得 `psiYX * gateUnwindY` $= (5, -6, 0, -8)$；若反设 `Enabled psiYX gateUnwindY 5` 成立，则存在整四元数 $q = (w, x, y, z) : \mathrm{Quad4}$ 满足 $5 \cdot q = (5, -6, 0, -8)$，尤其第二分量必满足 $5x = -6$。但对任意整数 $x$，若 $x \le -2$ 则 $5x \le -10 < -6$，若 $x \ge -1$ 则 $5x \ge -5 > -6$，导出矛盾，故 `¬ Enabled psiYX gateUnwindY 5`。全程仅依赖 `OmegaInit` 与 `OmegaMath` 中的零公理整数算术。完整证明由 Lean 内核检查。
:::

由此，非阿贝尔 $\Omega$-FRACTRAN 闸门不仅在概念层作为免标志素数的原生 LIFO 因果栈（`MODEL`），其核心整除确定性与模 $5$ 词序分离律本身亦以零公理内核定理稳固锚定。

## 16.3 二维整数矩阵环与普适凯莱—哈密顿恒等式 {#sec-om-ch16-mat2-cayley-hamilton}

为了把四元数旋子机与线性代数及有限域分裂表示直接接轨，在零公理基础层上只需构造由四枚整数打包而成的二维矩阵环 $\mathrm{Mat}_2(\mathbb{Z})$。记矩阵

$$
A \;=\; \begin{pmatrix} a & b \\ c & d \end{pmatrix}, \qquad B \;=\; \begin{pmatrix} e & f \\ g & h \end{pmatrix} \;\in\; \mathrm{Mat}_2(\mathbb{Z}),
$$

定义零公理算子：迹 $\operatorname{tr}(A) := a + d$、行列式 $\det(A) := ad - bc$、单位阵 $I := \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$，以及伴随矩阵 $\operatorname{adj}(A) := \begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$。无需任何特征值存在性定理、复数代数闭域或线性空间的基底选择，纯整数环四则恒等展开立即呈现四条核心算术律：

1. **迹的循环不变性**：

   $$
   \operatorname{tr}(AB) \;=\; (ae + bg) + (cf + dh) \;=\; (ea + fc) + (gb + hd) \;=\; \operatorname{tr}(BA);
   $$

2. **行列式的严格乘性**：

   $$
   \begin{aligned}
   \det(AB) &= (ae + bg)(cf + dh) - (af + bh)(ce + dg) \\
            &= ad(eh - fg) - bc(eh - fg) \;=\; (ad - bc)(eh - fg) \;=\; \det(A)\det(B);
   \end{aligned}
   $$

3. **伴随矩阵双侧恒等式**：直接逐元相乘即见非对角元 $b d - b d = 0$ 与 $c a - c a = 0$ 恒等消去，对角元恰为 $ad - bc$，故

   $$
   A\,\operatorname{adj}(A) \;=\; \operatorname{adj}(A)\,A \;=\; \det(A)\,I;
   $$

4. **普适凯莱—哈密顿恒等式**：观察线性恒等式 $A + \operatorname{adj}(A) = \begin{pmatrix} a+d & 0 \\ 0 & a+d \end{pmatrix} = \operatorname{tr}(A)\,I$，两侧同乘 $A$ 并代入伴随恒等式即得

   $$
   A^2 - \operatorname{tr}(A)\,A + \det(A)\,I \;=\; A\bigl(A + \operatorname{adj}(A) - \operatorname{tr}(A)\,I\bigr) \;=\; \mathbf{0}.
   $$

这条两行证毕的纯多项式恒等式，恰恰是四元数旋子与二维矩阵计算之间的黄金桥梁。一方面，任意整四元数 $q = w + x\mathbf{i} + y\mathbf{j} + z\mathbf{k}$ 与其共轭 $\bar{q} = w - x\mathbf{i} - y\mathbf{j} - z\mathbf{k}$ 满足 $q + \bar{q} = 2w$ 且 $q\bar{q} = \|q\|^2$，因而满足完全同构的二次特征方程 $q^2 - 2w\,q + \|q\|^2 = 0$——伴随阵 $\operatorname{adj}(A)$ 正是四元数共轭 $\bar{q}$ 在 $\mathrm{Mat}_2$ 中的孪生化身！另一方面，正如第十四章 [@thm-ch14-hurwitz-mod5-splitting] 在模 $5$ 有限域 $\mathbb{F}_5$（$2^2 \equiv -1 \pmod 5$）中所冻结的分裂映射 $\mathbf{i} \mapsto \begin{pmatrix} 2 & 0 \\ 0 & -2 \end{pmatrix}$、$\mathbf{j} \mapsto \begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix}$，整四元数环精确同态映入 $\mathrm{Mat}_2(\mathbb{F}_5)$，使标量模方对应行列式、实部二倍对应矩阵迹，并将 `psiXY` 与 `psiYX` 的模 $5$ 整除闸门直接化为 $2\times 2$ 矩阵的零矩阵检验。

上述全部四条二维整数矩阵算术律——迹循环不变性、行列式乘性、伴随阵双侧恒等式与普适凯莱—哈密顿恒等式——均已在使用 `OmegaInit` 与 `OmegaMath` 的 D5 形式化（`strict_omega.axioms: []`）中正式冻结：

::: {.theorem #thm-ch16-mat2-cayley-hamilton title="二维整数矩阵环的迹循环、行列式乘性、伴随恒等式与凯莱—哈密顿定理" lean="D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.trace_mul_comm D5/S3/Quantum/AURICOmega/OmegaComposeAndWitnesses.mat2_det_mul D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.adjugate_identities D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.cayley_hamilton"}
在所引 D5 声明（`strict_omega.axioms: []`）使用的二维整数矩阵结构 `Omega.Mat2` 上，记矩阵乘积 `A.mul B`、标量倍乘 `Mat2.scale`、单位阵 `Mat2.one`、零阵 `Mat2.zero`、迹 `A.trace := a + d`、行列式 `A.det := ad - bc` 与伴随阵 `A.adj := ⟨d, -b, -c, a⟩`。则对任意 `A, B : Mat2`，以下四条恒等式普遍成立：

1. **迹的循环不变性**（`trace_mul_comm`）：

   $$
   (A.\mathrm{mul}\;B).\mathrm{trace} = (B.\mathrm{mul}\;A).\mathrm{trace};
   $$

2. **行列式的严格乘性**（`mat2_det_mul`）：

   $$
   (A.\mathrm{mul}\;B).\mathrm{det} = A.\mathrm{det}.\mathrm{mul}\;B.\mathrm{det};
   $$

3. **伴随矩阵双侧恒等式**（`adjugate_identities`）：

   $$
   A.\mathrm{mul}\;A.\mathrm{adj} = \mathrm{Mat2.scale}\;A.\mathrm{det}\;\mathrm{Mat2.one}
   \qquad \text{且} \qquad
   A.\mathrm{adj}.\mathrm{mul}\;A = \mathrm{Mat2.scale}\;A.\mathrm{det}\;\mathrm{Mat2.one};
   $$

4. **普适凯莱—哈密顿恒等式**（`cayley_hamilton`）：

   $$
   \bigl((A.\mathrm{mul}\;A).\mathrm{sub}\;(\mathrm{Mat2.scale}\;A.\mathrm{trace}\;A)\bigr).\mathrm{add}\;(\mathrm{Mat2.scale}\;A.\mathrm{det}\;\mathrm{Mat2.one}) = \mathrm{Mat2.zero}.
   $$

:::

::: {.proof}
第一项直接按矩阵乘法展开两条迹和式 $(ae + bg) + (cf + dh)$ 与 $(ea + fc) + (gb + hd)$，仅凭零公理整数加乘交换结合律（`Int.add_add_add_comm` 与 `Int.mul_comm`）一步重排相等。第二项先用四项展开引理 `expand` 分别展开 $(ae + bg)(cf + dh)$ 与 $(af + bh)(ce + dg)$，由左侧公项消去引理 `sub_common_left` 精确抵消共有交叉项 $(ac)(ef) + (bd)(gh)$，再将余下的 $(ad)(eh) + (bc)(fg) - \bigl((ad)(fg) + (bc)(eh)\bigr)$ 逆向因式分解为 $(ad - bc)(eh - fg) = A.\mathrm{det}\cdot B.\mathrm{det}$。第三项以矩阵分量外延性 `Mat2.ext` 分别核对 $A\operatorname{adj}(A)$ 与 $\operatorname{adj}(A)A$ 的四个分量：非对角元由加法逆元精确抵消为 $0 = \det(A)\cdot 0$，两枚对角元均化为 $ad - bc = \det(A)\cdot 1$。第四项同样由 `Mat2.ext` 逐元展开：两条非对角分量按 $(ab + bd) - (a + d)b + \det(A)\cdot 0 = 0$ 恒等消去，两条对角分量按 $((a^2 + bc) - (a + d)a) + (ad - bc) = 0$（及 $a, d$ 对换）由整数环分配律与逆元律消去为零。全程仅依赖零公理基础库 `OmegaInit` 与 `OmegaMath`。完整证明由 Lean 内核检查。
:::

::: {.example #ex-om-ch16-mat2-numeric-audit title="二维整数矩阵环四律的显式整数核验"}
取 $A = \begin{pmatrix} 2 & 3 \\ 1 & 4 \end{pmatrix}$ 与 $B = \begin{pmatrix} 1 & -2 \\ 5 & 3 \end{pmatrix}$（`手工推导`）：

- $\operatorname{tr}(A) = 6$，$\det(A) = 8 - 3 = 5$；$\operatorname{tr}(B) = 4$，$\det(B) = 3 - (-10) = 13$；
- 乘积 $AB = \begin{pmatrix} 17 & 5 \\ 21 & 10 \end{pmatrix}$ 与 $BA = \begin{pmatrix} 0 & -5 \\ 13 & 27 \end{pmatrix}$ 均具相同迹 $\operatorname{tr}(AB) = \operatorname{tr}(BA) = 27$，且 $\det(AB) = 170 - 105 = 65 = 5 \times 13 = \det(A)\det(B)$；
- 平方 $A^2 = \begin{pmatrix} 7 & 18 \\ 6 & 19 \end{pmatrix}$，代入凯莱—哈密顿式得 $A^2 - 6A + 5I = \begin{pmatrix} 7-12+5 & 18-18 \\ 6-6 & 19-24+5 \end{pmatrix} = \begin{pmatrix} 0 & 0 \\ 0 & 0 \end{pmatrix}$，全程零除法、零根号、零公理。
:::

::: {.remark #rem-om-ch16-literature-boundaries title="文献结果与证据分层说明"}
**文献结果，未在本书形式化。** 经典标量语言 FRACTRAN 及其通过模拟双计数器机器确立的图灵完备性见 J. H. Conway（“FRACTRAN: A Simple Universal Programming Language for Arithmetic,” in *Open Problems in Communication and Computation*, Springer, 1987, pp. 4–26）与 M. L. Minsky（*Ann. of Math.* **74**, 437–455, 1961）；极大整四元数环 $\mathcal{H}(\mathbb{Z})$ 的算术分解见 A. Hurwitz（*Nachr. Ges. Wiss. Göttingen*, 313–340, 1896）。本章中 [@thm-om-ch16-signed-prime-ledger] 与 [@thm-om-ch16-binary-name-compare] 对应所钉 `trureturing` 冻结 **`LEAN ✓`** 声明，[@thm-ch16-scalar-fractran-semantics]、[@thm-ch16-p-omega-halts-at-22]、[@thm-ch16-quaternion-fractran-gate] 与 [@thm-ch16-mat2-cayley-hamilton] 则在使用 `OmegaInit` 与 `OmegaMath` 的 D5 形式化（`strict_omega.axioms: []`）中以冻结 **`LEAN ✓`** 声明分别锚定标量 FRACTRAN 精确语义与停机稳定性、四门程序 $P_\Omega$ 从 $2^{17}$ 经 $15$ 次跃迁首次停机于 $22$ 的完整轨迹、非阿贝尔四元数闸门确定性与 `psiXY`/`psiYX` 模 $5$ 词序分离，以及 `Mat2` 的迹循环、行列式乘性、双侧伴随恒等式与凯莱—哈密顿恒等式；[@ex-om-ch16-sixteen-state-fractran-trace] 中的五素数指数分解、[@ex-om-ch16-nonabelian-stack-proof] 中的逐分量展开与 `gateUnwindX` 伴随核验，以及具体数值示例 [@ex-om-ch16-mat2-numeric-audit] 为精确整数 **`手工推导`**；将非阿贝尔 $\Omega$-FRACTRAN 阐释为观察者原生机器语言属 **`MODEL`**。
:::

下面的短片把本章的三台机器依次跑一遍：标量 FRACTRAN、非阿贝尔整除闸门与二维整数矩阵环。

::: {.film src="the-spinor-machine"}
**一个数只记得“有多少”，一枚整四元数旋子还记得“谁先谁后”（2 分 49 秒）。** 标量 FRACTRAN 只保存一个正整数，每拍乘上第一枚使其保持整数的分数；分解质因数后，五座素数寄存器 $2, 3, 5, 7, 11$ 画成青色格柱，$\frac{3}{4}$ 的更新向量 $(-2, +1, 0, 0, 0)$ 从 2 号柱取走两格、给 3 号柱添上一格，整除守卫即任何寄存器不得低于零（品红虚线格）。右侧十六行账本随寄存器逐拍步进：$P_\Omega$ 从 $2^{17} = 131{,}072$ 经 $15$ 次跃迁停于 $22 = 2 \cdot 11$，$17 = 16 + 1$（屏幕计算，与 [@ex-om-ch16-sixteen-state-fractran-trace] 逐行一致）；绿色标签指向 [@thm-ch16-p-omega-halts-at-22] 与 [@thm-ch16-scalar-fractran-semantics] 中的停机稳定性。$3 \cdot 5 = 5 \cdot 3$ 抹去次序，标志素数为示意，整四元数状态的双重编码属 `MODEL`（紫色）。$X = 1 + 2\mathbf{i}$、$Y = 1 + 2\mathbf{j}$ 给出 $XY = (1, 2, 2, 4)$ 与 $YX = (1, 2, 2, -4)$，两枚虚部箭头一青一品红，模方同为 $25$；闸门右乘 $1 - 2\mathbf{j}$ 再除以 $5$：青色一列得 $(5, 10, 0, 0)$、余数全零而放行还原 $X$，品红一列得 $(5, -6, 0, -8)$、余数 $(0, 4, 0, 2)$ 而盖上 BLOCKED 印章，闸门 $1 - 2\mathbf{i}$ 把 $YX$ 退回 $Y$（[@ex-om-ch16-nonabelian-stack-proof]，后进先出的读法属 `MODEL`）；绿色标签指向 [@thm-ch16-quaternion-fractran-gate]。最后 $A = \begin{pmatrix} 2 & 3 \\ 1 & 4 \end{pmatrix}$、$B = \begin{pmatrix} 1 & -2 \\ 5 & 3 \end{pmatrix}$ 的 $AB$ 与 $BA$ 迹同为 $27$、$\det(AB) = 65 = 5 \times 13$、$A^2 - 6A + 5I$ 为琥珀色零矩阵（[@ex-om-ch16-mat2-numeric-audit]，屏幕计算），绿色标签指向 [@thm-ch16-mat2-cayley-hamilton]。
:::

读者可在下方的交互实验卡中把本章的标量有理计算与二维整数矩阵环并排跑通：逐拍回放康威四门程序 $P_\Omega$ 从 $2^{17} = 131{,}072$ 经 $15$ 次整除跃迁精准停机于 $22$ 的完整素指数账本，并实时改动整数矩阵 $A, B \in \mathrm{Mat}_2(\mathbb{Z})$ 的元素，逐分量核验迹循环、行列式乘性、双侧伴随阵与凯莱—哈密顿恒等式 $A^2 - \operatorname{tr}(A)A + \det(A)I = 0$。

::: {.viz src="adelic-arithmetic-observer-lab" preset="scalar-fractran-and-mat2" height="520"}
**标量 FRACTRAN 轨迹与 `Mat2` 凯莱—哈密顿实验卡（`scalar-fractran-and-mat2`）。** 逐拍步进四门有理程序 $P_\Omega = [\frac{11}{49}, \frac{7}{25}, \frac{5}{9}, \frac{3}{4}]$ 从初态 $131{,}072 = 2^{17}$ 经 $15$ 次有效整除跃迁首次收敛至幂等停机态 $22 = 2 \cdot 11$ 的五素数指数演化（[@thm-ch16-scalar-fractran-semantics]、[@thm-ch16-p-omega-halts-at-22]、[@ex-om-ch16-sixteen-state-fractran-trace]），并同步调节二维整数矩阵 $A, B \in \mathrm{Mat}_2(\mathbb{Z})$ 的整数分量，现场核对迹循环性 $\operatorname{tr}(AB) = \operatorname{tr}(BA)$、行列式乘性 $\det(AB) = \det(A)\det(B)$、双侧伴随恒等式 $A\operatorname{adj}(A) = \det(A)I$ 与普适凯莱—哈密顿恒等式 $A^2 - \operatorname{tr}(A)A + \det(A)I = \mathbf{0}$（[@thm-ch16-mat2-cayley-hamilton]、[@ex-om-ch16-mat2-numeric-audit]）。
:::

有了以正交素数寄存器与非阿贝尔旋子栈合一的原生计算语言，下一章将视角从指令集抬升至整座自包含主体本身：当观察者所能接收的一切信息都封闭在内部、没有任何外部端口时，时间、空间、引力梯度与推理行动如何从同一枚有理保真度梯度中一体涌现。
