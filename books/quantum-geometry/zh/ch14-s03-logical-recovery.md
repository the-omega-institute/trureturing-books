# 14.3 正交综合征中的逻辑恢复 {#sec-orthogonal-syndrome-recovery}

当环境噪声把原本安居在基准码空间里的逻辑态 $\rho \in M_d(\mathbb{C})$ 踢进了不同的错误通道时，为什么我们能够像外科手术一样把错误剥离、让 $\rho$ 原封不动地复原？

从几何上看，秘密全在于**正交分室（orthogonal syndrome subspaces）**（见图 14 面板 II）。设想物理空间 $\mathbb{C}^n$ 中有 $|s|$ 间两两正交、每间都是 $d$ 维的房间，由一族等距嵌入矩阵 $S : s \to M_{n \times d}(\mathbb{C})$ 刻画（此处 $s, n, d$ 为有限指标类型，带 `[DecidableEq s]` 与 `[DecidableEq d]`，$n$ 无需显式可判等假设）。源码模块 `OrthogonalSyndromeDecoding` 定义谓词 `OrthogonalSyndromes S` 为：

$$
\forall i, j : s,\qquad S_i^* S_j = \begin{cases} I_d & \text{若 } i = j, \\ 0 & \text{若 } i \neq j. \end{cases}
$$

这意味着：对每一个综合征编号 $i \in s$，$S_i^* S_i = I_d$ 保证 $S_i$ 把 $d$ 维逻辑球体无畸变地等距放进第 $i$ 间综合征子空间；而当 $i \neq j$ 时，$S_i^* S_j = 0$ 保证不同综合征房间之间严格垂直、绝不串门！

::: {.viz src="syndrome-decoding" preset="rooms" height="500"}
**错误把态整个搬进另一间房。** 下面的八个基态按两道校验的读数分成四间房 $S_j = E_jV$（$E \in \{I, X_1, X_2, X_3\}$）。中间的比特翻了，两盏灯都亮；$\alpha\lvert 000\rangle + \beta\lvert 111\rangle$ 的两根青色柱子原样搬进 $(-1,-1)$ 那间房，落在 $\lvert 010\rangle$、$\lvert 101\rangle$ 上，另外三间房空着。
:::

在此几何舞台上，任意携带综合征系数矩阵 $\sigma \in M_s(\mathbb{C})$（允许包含不同错误分支之间的非对角相干项 $\sigma_{jk}$）的受损物理态由**综合征编码映射**给出：

$$
\mathrm{syndromeEncoding}(S, \sigma, \rho) = \sum_{j \in s} \sum_{k \in s} \sigma_{jk}\, S_j \rho S_k^* \in M_n(\mathbb{C}),
$$

而将各综合征房间里的状态重新拉回逻辑空间叠加的**综合征解码映射**定义为：

$$
\mathrm{syndromeDecoding}(S, \mathrm{state}) = \sum_{i \in s} S_i^* \,\mathrm{state}\, S_i \in M_d(\mathbb{C}).
$$

下面的命题证明：无论噪声矩阵 $\sigma$ 与逻辑矩阵 $\rho$ 长什么模样，只要房间之间两两正交，解码映射就能一举抹平全部跨房间的非对角干扰，把输出精确归约为 $\Tr(\sigma) \cdot \rho$！

::: {.proposition #prop-orthogonal-syndrome-recovery title="正交综合征子空间上的精确逻辑恢复恒等式" lean="D5/S3/Quantum/Recovery/OrthogonalSyndromeDecoding.orthogonal_syndrome_recovery"}
设 $s, n, d$ 为有限指标类型（带 `[DecidableEq s]` 与 `[DecidableEq d]`），$S : s \to M_{n \times d}(\mathbb{C})$ 满足正交综合征条件 `OrthogonalSyndromes S`。则对任意复矩阵 $\sigma \in M_s(\mathbb{C})$ 与任意复矩阵 $\rho \in M_d(\mathbb{C})$，恒有

$$
\mathrm{syndromeDecoding}\bigl(S,\, \mathrm{syndromeEncoding}(S, \sigma, \rho)\bigr) = \Tr(\sigma) \bullet \rho.
$$
:::

::: proof
将 $\mathrm{syndromeEncoding}(S, \sigma, \rho)$ 的双重求和代入 $\mathrm{syndromeDecoding}$ 的定义，利用矩阵乘法对加法的分配律与标量提出律，得

$$
\mathrm{syndromeDecoding}\bigl(S,\, \mathrm{syndromeEncoding}(S, \sigma, \rho)\bigr)
= \sum_{i \in s} \sum_{j \in s} \sum_{k \in s} \sigma_{jk}\, (S_i^* S_j)\, \rho\, (S_k^* S_i).
$$

由前提 `OrthogonalSyndromes S`，左侧内积满足 $S_i^* S_j = \delta_{ij} I_d$，右侧内积满足 $S_k^* S_i = (S_i^* S_k)^* = \delta_{ik} I_d$。因此在固定 $i \in s$ 时，所有 $j \neq i$ 或 $k \neq i$ 的项全部乘以零矩阵而消失，唯独 $j = i$ 且 $k = i$ 的对角项幸存为 $\sigma_{ii} (I_d \rho I_d) = \sigma_{ii} \rho$。对全体 $i \in s$ 求和，即得 $\bigl(\sum_{i \in s} \sigma_{ii}\bigr)\rho = \Tr(\sigma) \bullet \rho$。完整证明由 Lean 内核检查。
:::

::: {.figure src="ch14-trace-survives"}
**解码之后，$\sigma$ 只剩对角线。** 上面是 $4\times 4$ 的噪声矩阵 $\sigma$：对角线上青色的四格取例 [@ex-repetition-code-syndrome] 第四步的 $\frac{1}{2}, \frac{1}{4}, \frac{1}{8}, \frac{1}{8}$，其余十二格是品红的跨房间相干项，全部划掉。四个对角数相加得 $\Tr\sigma = 1$，解码输出 $1 \cdot \rho = \rho$（[@prop-orthogonal-syndrome-recovery]）。相干项取非零值时，在三比特码上的数值核对给出同一个 $\rho$。
:::

[@prop-orthogonal-syndrome-recovery] 的代数结构干净得令人赞叹，在应用时需把握两条精确边界：

1. **无需假设 $\sigma$ 对角、半正定或迹一**：定理对**任意**复矩阵 $\sigma \in M_s(\mathbb{C})$ 和 $\rho \in M_d(\mathbb{C})$ 均成立。哪怕物理噪声是多个错误算子的相干叠加（使得 $\sigma$ 具有非零的非对角元 $\sigma_{jk}$，$j \neq k$），正交投影夹逼 $S_i^* S_j \rho S_k^* S_i$ 也会自动切掉所有 $j \neq k$ 的跨综合征相干项，只留下对角迹和 $\sum_i \sigma_{ii} = \Tr(\sigma)$；特别地，当噪声权重归一化满足 $\Tr(\sigma) = 1$ 时，立刻作为特例给出无缩放的精确恢复 $\mathrm{syndromeDecoding}(S, \mathrm{syndromeEncoding}(S, \sigma, \rho)) = \rho$。

::: {.viz src="syndrome-decoding" preset="mix" height="500"}
**四个分支各回各的，拼回原态。** 取 $\sigma = \operatorname{diag}\bigl(\frac{1}{2}, \frac{1}{4}, \frac{1}{8}, \frac{1}{8}\bigr)$（例 [@ex-repetition-code-syndrome] 第四步）与 $\rho = \lvert +\rangle\langle +\rvert$：不出错、翻第一个、翻第二个、翻第三个四个分支，青色柱子的宽窄就是权重，各进各的房。解码时各自拉回码空间，并排拼成一整根，正好填满虚线：$\Tr(\sigma)\,\rho = \rho$，即 [@prop-orthogonal-syndrome-recovery]。
:::

2. **支持子空间上的代数解码与全空间迹保持信道的区分**：$\mathrm{syndromeDecoding}(S, \cdot) = \sum_{i \in s} S_i^* (\cdot) S_i$ 是在可纠综合征支持集 $\mathcal{W} = \bigoplus_{i \in s} \operatorname{range}(S_i)$ 上定义的解码代数式。由于 $s$ 个 $d$ 维正交房间占用的总维数为 $|s|d \le n$，当 $|s|d < n$（即 $\sum_{i \in s} S_i S_i^* \neq I_n$）时，不能无条件声称仅由 $\{S_i^*\}_{i \in s}$ 构成的映射已在整个 $n$ 维物理空间 $M_n(\mathbb{C})$ 上定义了一个迹保持（CPTP）量子信道；若要延拓为全空间上的迹保持信道，还必须把支持子空间正交补 $I_n - \sum_{i \in s} S_i S_i^*$ 上的附加 Kraus 算子补齐。

正交综合征只是最透明的坐标形状：它把系数矩阵先验地写成对角形式。冻结源码还给出了不要求对角化的有限矩形版本。其输入 $E_a$ 是 $n\times d$ 矩阵，输出恢复算子是 $d\times n$ 矩阵；因此它真正跨越了物理空间与逻辑空间的维数边界。

::: {.theorem #thm-finite-kraus-recovery-sufficiency title="有限矩形 Kraus 标量条件给出充分的实际恢复" lean="D5/S3/Quantum/Recovery/FiniteKrausReversibility.scalar_products_construct_left_inverse"}
设 $s,n,d$ 为有限指标类型，均带有有限型与可判等实例。设有限误差族 $E : s \to M_{n\times d}(\mathbb{C})$、一个逻辑指标 $v : d$ 以及系数矩阵 $c \in M_s(\mathbb{C})$ 满足

$$
\sum_{a\in s} E_a^*E_a=I_d,
\qquad
E_a^*E_b=c_{ab}I_d \quad (a,b\in s).
$$

则存在某个有限 $r\in\mathbb{N}$ 与恢复 Kraus 族 $A : \mathrm{Fin}\,r \to M_{d\times n}(\mathbb{C})$，使得

$$
\sum_{b\in\mathrm{Fin}\,r} A_b^*A_b=I_n
$$

并且对每一个复逻辑矩阵 $X\in M_d(\mathbb{C})$，都有

$$
\sum_{b\in\mathrm{Fin}\,r} A_b
\left(\sum_{a\in s}E_a X E_a^*\right)A_b^*=X.
$$

这里显式给出的 $v:d$ 是非空逻辑接口的见证；定理没有把零维逻辑空间当作“所有输入”的空洞情形。矩形尺寸也很具体：噪声把逻辑矩阵送入 $M_n(\mathbb{C})$，$A_b$ 再把它送回 $M_d(\mathbb{C})$。
:::

::: proof
证明沿用源码 Blueprint 的既有谱构造。先用选定的 $v$ 把 $c$ 写成一个 Gram 矩阵，从而得到半正定性；再作厄米谱分解，把误差族酉旋转成按谱权重正交的族。严格为正的谱支用 $\sqrt{\lambda}$ 归一化，零特征值支先由实际的有限子类型删去，所以没有除以零的分支。对剩下的正交综合征族，源码的 `completeKraus` 在其支撑空间正交补上补入互补重置行；这一步把只在纠正支撑上成立的伴随解码扩展为整个物理输入空间上的归一恢复。最后将有限指标重编号为 `Fin r`，得到上述对所有复矩阵 $X$ 的恒等式。完整证明由 Lean 内核检查。
:::

这条充分性结果比 [@prop-orthogonal-syndrome-recovery] 多做了三件事：系数矩阵 $c$ 可以先有非对角相干，再由谱旋转变成正交房间；零谱权重被明确移除，而不是假设每个错误分支都有正概率；恢复族在物理空间的剩余正交补上补齐，因此归一式确实覆盖整个物理输入。它仍然只是一族**有限** Kraus 矩阵的结论，不声称一般捆绑量子信道都有有限 Kraus 表示，也不给出恢复时间或噪声鲁棒性界。

**普通编码记号下的纸面代入（应用推导，不是新增的 Lean 专门检查）。** 设物理维数 $n$ 与逻辑维数 $d$ 都是有限正整数，误差指标集 $s$ 有限。令 $V\in M_{n\times d}(\mathbb{C})$ 满足 $V^*V=I_d$，令物理误差族 $(E_i)_{i\in s}$ 中的 $E_i\in M_n(\mathbb{C})$ 满足 $\sum_iE_i^*E_i=I_n$，并设 $F_i=E_iV\in M_{n\times d}(\mathbb{C})$。若逻辑 Knill–Laflamme 条件为

$$
V^*E_i^*E_jV=\alpha_{ij}I_d,
$$

则两条前提恰好传到上面的矩形定理：

$$
F_i^*F_j=V^*E_i^*E_jV=\alpha_{ij}I_d,
\qquad
\sum_iF_i^*F_i=V^*\left(\sum_iE_i^*E_i\right)V=V^*V=I_d.
$$

取任意逻辑指标 $v\in\{1,\ldots,d\}$ 作为非空见证，于是得到某个有限 $r$ 与恢复族 $(A_t)_{t\in\mathrm{Fin}\,r}$，其中 $A_t\in M_{d\times n}(\mathbb{C})$ 且 $\sum_t A_t^*A_t=I_n$；并对每一个复矩阵 $X\in M_d(\mathbb{C})$ 有

$$
\sum_tA_t\left(\sum_iE_iVXV^*E_i^*\right)A_t^*=X.
$$

括号内是物理 $n\times n$ 输出，左乘右乘 $A_t$ 后的 $X$ 是逻辑 $d\times d$ 输出；两者的边界不能混写成物理空间上的恒等式。
