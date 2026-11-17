# 4.2 不用背 Kraus 算符看懂三种量子噪声 {#sec-ch04-2}

看清了环境偏迹如何在上例中缩短局部布洛赫向量之后，传统量子信息教科书里常见噪声信道的算符和公式瞬间退去了神秘面纱。不用死记硬背任何抽象矩阵，本节剖析的几类典型单比特噪声（捏合投影、相位阻尼、振幅阻尼与去极化），在几何上都不过是**把单位布洛赫球往不同方向挤压或平移**！

首先看最纯粹的横向去相干极限——**标准基捏合投影** $\mathcal{P}(\rho)$（Lean 模块 `QuantumChannels/Pinching` 中定义为 [`pinching`](lean:D5/S3/QuantumChannels/Pinching.pinching)，保留对角元 $\rho_{00}, \rho_{11}$、抹零副对角元 $\rho_{01}, \rho_{10}$）。在矩阵希尔伯特—施密特内积（[`hilbertSchmidtInner`](lean:D5/S3/QuantumChannels/Pinching.hilbertSchmidtInner) $\langle A, B\rangle_{\mathrm{HS}} = \Tr(A^* B)$）下，捏合不是粗暴的涂改，而是一次精确的正交勾股投影：整颗布洛赫球被垂直压扁到南北极直径线段 $[-\vv{e}_3, +\vv{e}_3]$ 上，而被压掉的水平赤道质量恰好等于两个副对角相干元的模平方之和！

::: {.viz src="bloch-noise" preset="pinch" height="500"}
**压到竖轴上。** 一步完全去相干：青色的球被压成竖直的一条线，紫色虚线标出整根竖轴都是不动点。$\rho$ 与 $\sigma$ 高度相同、只差横向部分，落到轴上同一点，白线缩成零；品红的两段是两个起点被压掉的横向部分，它们所带的正是相干质量，左上角读出 $\rho$ 的这份质量从 $0.375$ 降到 $0$（[@thm-pinching-pythagorean]）。
:::

::: {.theorem #thm-pinching-pythagorean title="单比特捏合投影的希尔伯特—施密特勾股分解与丢弃相干质量" lean="D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass"}
设 $\rho \in M_2(\mathbb{C})$ 为任意单比特复矩阵，记标准基捏合算子为 $\mathcal{P}(\rho)_{ij} = \delta_{ij}\rho_{ij}$，希尔伯特—施密特内积为 $\langle A, B\rangle_{\mathrm{HS}} = \Tr(A^* B)$。则同时成立：

1. **正交勾股分解**：

   $$
   \langle \rho, \rho\rangle_{\mathrm{HS}} = \langle \mathcal{P}(\rho), \mathcal{P}(\rho)\rangle_{\mathrm{HS}} + \langle \rho - \mathcal{P}(\rho),\, \rho - \mathcal{P}(\rho)\rangle_{\mathrm{HS}};
   $$

2. **丢弃相干质量显式公式**：

   $$
   \langle \rho - \mathcal{P}(\rho),\, \rho - \mathcal{P}(\rho)\rangle_{\mathrm{HS}} = |\rho_{01}|^2 + |\rho_{10}|^2.
   $$

:::

::: proof
将 $\rho$ 分解为对角部分 $\mathcal{P}(\rho)$ 与纯副对角残差 $D = \rho - \mathcal{P}(\rho)$ 之和。因 $\mathcal{P}$ 对希尔伯特—施密特内积自伴（$\langle \mathcal{P}(A), B\rangle_{\mathrm{HS}} = \langle A, \mathcal{P}(B)\rangle_{\mathrm{HS}}$）且满足 $\mathcal{P}(D) = 0$，交叉内积 $\langle \mathcal{P}(\rho), D\rangle_{\mathrm{HS}} = \langle \rho, \mathcal{P}(D)\rangle_{\mathrm{HS}} = 0$ 与 $\langle D, \mathcal{P}(\rho)\rangle_{\mathrm{HS}} = 0$ 双双归零，双线性展开 $\langle \mathcal{P}(\rho) + D,\, \mathcal{P}(\rho) + D\rangle_{\mathrm{HS}}$ 遂给出正交勾股等式（结论 1）。再将 $D = \bigl(\begin{smallmatrix} 0 & \rho_{01} \\ \rho_{10} & 0 \end{smallmatrix}\bigr)$ 代入 $\Tr(D^* D)$，主对角线两项分别为 $\overline{\rho_{10}}\rho_{10} = |\rho_{10}|^2$ 与 $\overline{\rho_{01}}\rho_{01} = |\rho_{01}|^2$，相加即得 $|\rho_{01}|^2 + |\rho_{10}|^2$（结论 2）。完整证明由 Lean 内核检查。
:::

在实际物理时间里，环境很少一步到位地把球压成一根细棍，而是通过一次次微弱碰撞，在严格含噪区间内每次把赤道半径乘上一个保留系数 $c \in [0, 1)$（$c = 1$ 则对应无噪恒等端点）。这就是超导与核磁共振实验里天天测量的**相位阻尼信道**（phase damping，对应横向弛豫时间 $T_2$）：当 $c \in [0, 1)$ 时，每走一步，布洛赫球的南北高度 $r_z$ 纹丝不动，水平腰围 $(r_x, r_y)$ 则按等比数列 $c^N$ 一圈圈往里严格收腰，从圆球瘦身成橄榄形的雪茄椭球，最终在 $N \to \infty$ 时收敛到南北主轴！

::: {.viz src="bloch-noise" preset="dephase" height="500"}
**只收腰，不掉高。** 每一步横向乘 $c = 0.7$，高度不动：青色的球收成竖直的雪茄，再细向紫色的竖轴；$\rho$ 与 $\sigma$ 沿水平方向走向轴线。下方时间轴数的是步数 $N$（[@prop-phase-damping-decay]）。
:::

::: {.proposition #prop-phase-damping-decay title="迭代相位阻尼的矩阵元演化与等权叠加态的相干指数衰减" lean="D5/S3/Quantum/QubitWitnesses.phaseDampingIterate_apply D5/S3/Quantum/Decoherence/CoherenceDecay.equal_superposition_coherence_tendsto_zero"}
设相干保留系数 $c \in [0, 1]$，单步实相位阻尼映射保持对角元不变并将副对角元乘以 $c$，记其 $N$ 次迭代为 $\mathcal{D}_c^{(N)}$（$N \in \mathbb{N}$）。则：

1. 对任意单比特矩阵 $\rho \in M_2(\mathbb{C})$ 及下标 $i, j \in \{0, 1\}$，

   $$
   \bigl(\mathcal{D}_c^{(N)}(\rho)\bigr)_{i, j} = \begin{cases} \rho_{i, j}, & i = j, \\ c^N \rho_{i, j}, & i \neq j; \end{cases}
   $$

2. 若严格阻尼条件 $c < 1$ 成立，记赤道等权叠加态密度矩阵为 $\rho_+ = \frac{1}{2}\begin{pmatrix} 1 & 1 \\ 1 & 1 \end{pmatrix}$，则当迭代步数 $N \to \infty$ 时，其副对角相干元收敛于零：

   $$
   \lim_{N \to \infty} \bigl(\mathcal{D}_c^{(N)}(\rho_+)\bigr)_{0, 1} = 0.
   $$

:::

::: proof
结论 1 对自然数 $N$ 归纳：$N = 0$ 时 $c^0 = 1$ 为恒等映射；由 $N$ 到 $N+1$ 时，对角位置 $(i = j)$ 保持不变，副对角位置 $(i \neq j)$ 再乘一次因子 $c$，得到 $c \cdot (c^N \rho_{ij}) = c^{N+1}\rho_{ij}$。结论 2 将 $\rho_+$ 代入结论 1，得第 $(0, 1)$ 元为 $\frac{1}{2}c^N$；因 $0 \le c < 1$，实数（及嵌入复数后）的模长满足 $|c| < 1$，故几何级数项 $c^N \to 0$，乘以常数 $\frac{1}{2}$ 后仍收敛于 $0$。完整证明由 Lean 内核检查。
:::

在 [@prop-phase-damping-decay] 中，南北极计算基之所以充当免受退相干侵蚀的“指针基”，是因为 `phaseDamping` 直接在计算基坐标下保留对角元。若把相位阻尼改放在傅里叶（阿达马）坐标下作用，不动点脊梁就会随之旋转到赤道正交轴上。为精确刻画这一坐标切换，对单比特复矩阵空间 `QubitMatrix := Matrix (Fin 2) (Fin 2) ℂ` 与闭区间阻尼系数 `DampingCoefficient := Set.Icc (0 : ℝ) 1`（即 $c \in [0, 1]$），记单步计算基相位阻尼为 $(\operatorname{phaseDamping}(c,\rho))_{ij} = \rho_{ij}$（$i=j$）及 $c\,\rho_{ij}$（$i\neq j$）；对任意双射等价 `coordinates : QubitMatrix ≃ QubitMatrix`，定义基底变换下的阻尼映射为 $\operatorname{phaseDampingInBasis}(\mathrm{coordinates}, c, \rho) := \mathrm{coordinates}^{-1}\bigl(\operatorname{phaseDamping}(c, \mathrm{coordinates}(\rho))\bigr)$。取自逆的阿达马坐标映射

$$
\operatorname{hadamardCoordinates}(\rho) := \begin{pmatrix} \dfrac{\rho_{00} + \rho_{01} + \rho_{10} + \rho_{11}}{2} & \dfrac{\rho_{00} - \rho_{01} + \rho_{10} - \rho_{11}}{2} \\[6pt] \dfrac{\rho_{00} + \rho_{01} - \rho_{10} - \rho_{11}}{2} & \dfrac{\rho_{00} - \rho_{01} - \rho_{10} + \rho_{11}}{2} \end{pmatrix},
$$

其正逆映射均为自身（构成对合等价 `hadamardCoordinateEquiv`），并定义傅里叶相位阻尼为 $\operatorname{fourierPhaseDamping}(c, \rho) := \operatorname{phaseDampingInBasis}(\mathrm{hadamardCoordinateEquiv}, c, \rho)$。我们可以先手算完全退相位端点 $c = 0$ 下的两枚基准纯态：取赤道态 $\rho_+ = \lvert +\rangle\langle +\rvert = \frac{1}{2}\bigl(\begin{smallmatrix} 1 & 1 \\ 1 & 1 \end{smallmatrix}\bigr)$，则 $\operatorname{hadamardCoordinates}(\rho_+) = \bigl(\begin{smallmatrix} 1 & 0 \\ 0 & 0 \end{smallmatrix}\bigr)$ 副对角元全为零，经 $\operatorname{phaseDamping}(0, \cdot)$ 保持不变，再施一次 $\operatorname{hadamardCoordinates}$ 便原封不动退回 $\rho_+$；反之取北极态 $\rho_0 = \lvert 0\rangle\langle 0\rvert = \bigl(\begin{smallmatrix} 1 & 0 \\ 0 & 0 \end{smallmatrix}\bigr)$，则 $\operatorname{hadamardCoordinates}(\rho_0) = \frac{1}{2}\bigl(\begin{smallmatrix} 1 & 1 \\ 1 & 1 \end{smallmatrix}\bigr)$，经 $c = 0$ 抹去副对角元后变为 $\frac{1}{2}I_2$，逆变回来仍是球心最大混合态 $\frac{1}{2}I_2 \neq \rho_0$。下面的定理将这一不动点判据推广到一切严格含噪系数 $c \neq 1$。

::: {.theorem #thm-fourier-pointer-fixed title="傅里叶指针基的相位阻尼不动点" lean="D5/S3/Quantum/PointerBasis.fourier_phase_damping_fixed_iff"}
设阻尼系数 $c \in [0, 1]$（`c : DampingCoefficient`）满足严格非恒等条件 $(c : \mathbb{R}) \neq 1$，且 $\rho \in M_2(\mathbb{C})$（`rho : QubitMatrix`）。则 $\rho$ 为傅里叶相位阻尼映射的不动点，当且仅当其阿达马坐标矩阵的所有副对角元均为零：

$$
\operatorname{fourierPhaseDamping}(c, \rho) = \rho \iff \forall i, j \in \mathrm{Fin}\,2,\; i \neq j \implies \operatorname{hadamardCoordinates}(\rho)_{i,j} = 0.
$$
:::

::: proof
由定义，$\operatorname{fourierPhaseDamping}(c, \rho) = \mathrm{hadamardCoordinateEquiv}^{-1}\bigl(\operatorname{phaseDamping}(c, \operatorname{hadamardCoordinates}(\rho))\bigr)$。因 `hadamardCoordinateEquiv` 为双射，两端同时作用正映射后，不动点等式等价于矩阵等式 $\operatorname{phaseDamping}(c, \operatorname{hadamardCoordinates}(\rho)) = \operatorname{hadamardCoordinates}(\rho)$。逐分量核对 `Fin 2` 上的指标：当 $i = j$ 时对角元恒相等；当 $i \neq j$ 时，等式化为 $c \cdot \operatorname{hadamardCoordinates}(\rho)_{i,j} = \operatorname{hadamardCoordinates}(\rho)_{i,j}$，移项即 $(c - 1)\operatorname{hadamardCoordinates}(\rho)_{i,j} = 0$。由于实数 $(c : \mathbb{R}) \neq 1$ 蕴含复数域中 $c - 1 \neq 0$，利用无零因子消去律可知该条件对所有 $i \neq j$ 成立当且仅当 $\operatorname{hadamardCoordinates}(\rho)_{i,j} = 0$。完整证明由 Lean 内核检查。
:::

这里有两条必须守住的边界：第一，前提 $(c : \mathbb{R}) \neq 1$ 缺一不可——在无噪端点 $c = 1$ 处，$\operatorname{fourierPhaseDamping}(1, \cdot)$ 退化为 $M_2(\mathbb{C})$ 上的恒等映射，任何矩阵（包括阿达马副对角元非零的 $\lvert 0\rangle\langle 0\rvert$）都是不动点；第二，尽管具体的 `hadamardCoordinates` 在 $2\times 2$ 矩阵上恰好等于阿达马幺正共轭 $H\rho H$，一般组合子 `phaseDampingInBasis` 接受的只是抽象类型双射 `QubitMatrix ≃ QubitMatrix`（未必自动代表物理幺正信道），且该定理刻画的是特定傅里叶相位阻尼模型下的不动点子空间，并不声称 $\{\lvert +\rangle, \lvert -\rangle\}$ 是任意环境噪声的普适指针基。

上述单比特公式把环境作用压缩为一个实数 $c$。如果系统有许多分支、环境记录之间还带有复相位，完全正交是否仍是必要的起点？先把每个系统地址 $i$ 配上一个单位环境向量 $E_i$。受控记录映射 $V\lvert i\rangle=\lvert i\rangle\otimes\lvert E_i\rangle$ 对环境求偏迹后，第 $(i,j)$ 个矩阵元恰好乘以 $G_{ij}=\sum_a E_i(a)\overline{E_j(a)}$，即 [`environment_marginal_channel`](lean:D5/S3/Quantum/Decoherence/EnvironmentMarginalChannel.environment_marginal_channel) 的矩阵元公式。于是，“环境记录完全正交”可以放宽为一个带数值误差的充分条件。

::: {.theorem #thm-repeated-record-decay title="重复有限记录对记录类捏合的指数误差界" lean="D5/S3/Quantum/Decoherence/RepeatedRecordExponentialDecay.repeated_record_exponential_decay"}
设 $d,e\in\mathbb{N}$，$E:\mathrm{Fin}\,d\to\mathrm{Fin}\,e\to\mathbb{C}$，且对每个系统地址 $i$ 有 $\sum_a |E_i(a)|^2=1$。定义

$$
G_{ij}=\sum_a E_i(a)\overline{E_j(a)},\qquad
\Phi_E(\rho)_{ij}=G_{ij}\rho_{ij}.
$$

给定 $q\in[0,1)$，假设 $E_i\ne E_j$ 时均有 $|G_{ij}|\le q$。对每个 $v\in\operatorname{range} E$ 定义对角投影

$$
\begin{aligned}
(P_v)_{ij}&=\begin{cases}1,&i=j\text{ 且 }E_i=v,\\0,&\text{其他情形},\end{cases}\\
\Pi_E(\rho)&=\sum_{v\in\operatorname{range}E}P_v\rho P_v.
\end{aligned}
$$

则对任意 $N\in\mathbb{N}$、$\rho\in M_d(\mathbb{C})$ 及 $i,j\in\mathrm{Fin}\,d$，同时成立

$$
\begin{aligned}
\bigl(\Phi_E^N(\rho)\bigr)_{ij}&=G_{ij}^N\rho_{ij},\\
\Pi_E(\rho)_{ij}&=\begin{cases}\rho_{ij},&E_i=E_j,\\0,&E_i\ne E_j,\end{cases}\\
\|\Phi_E^N(\rho)-\Pi_E(\rho)\|_{\mathrm F}
&\le q^N\|\rho-\Pi_E(\rho)\|_{\mathrm F},
\end{aligned}
$$

其中 $\|A\|_{\mathrm F}=(\sum_{i,j}|A_{ij}|^2)^{1/2}$ 为 Frobenius 范数，亦即希尔伯特—施密特范数；$\Phi_E^0$ 为恒等映射。
:::

::: proof
每次作用只将第 $(i,j)$ 元再乘以 $G_{ij}$，归纳得到第一式。对角投影 $P_v$ 的左右乘法只保留同属记录 $v$ 的行列，求和得到第二式。同类记录因归一化而满足 $G_{ij}=1$，故误差在那里为零；不同类的误差则为 $G_{ij}^N\rho_{ij}$，其模不超过 $q^N|\rho_{ij}|$。逐项平方、求和再开方即得第三式。完整证明由 Lean 内核检查。
:::

::: {.example #ex-nonorthogonal-record-decay title="每次只分开一点，十次后的误差有多大？"}
取两条非正交单位记录 $E_0=(1,0)$、$E_1=(1/2,\sqrt{3}/2)$，则 $G_{01}=G_{10}=1/2$，可取 $q=1/2$。两条记录互不相同，记录类都是单点，因而 $\Pi_E$ 就是计算基捏合。对赤道初态 $\rho_+=\frac12\bigl(\begin{smallmatrix}1&1\\1&1\end{smallmatrix}\bigr)$，直接代入上式可得

$$
\Phi_E^N(\rho_+)=\frac12\begin{pmatrix}1&2^{-N}\\2^{-N}&1\end{pmatrix},\qquad
\|\Phi_E^N(\rho_+)-\Pi_E(\rho_+)\|_{\mathrm F}=\frac{2^{-N}}{\sqrt2}.
$$

十次后，相对于初始副对角残差的误差比为 $1/1024$。有限步没有被说成“精确归零”；这里计算的是指定模型下的相干残差。
:::

这里的“类”按**记录向量完全相等**划分，同类内部的相干保留；只有类全是单点时，极限才是逐个基地址的完全去相干。若 $E_1=-E_0$，两向量虽然不相等，却有 $|G_{01}|=1$，不满足严格重叠界：作用只改变相位，不使这项相干的模衰减。向量不同，不能自动当作环境获得了可区分的记录。

::: {.remark #rem-ray-record-orbit title="按射线分组的代表归约与旋转相干块（应用推导）"}
若改按**环境记录所在的单位射线**分组，上一段的全局相位冗余便可直接并入 [@thm-repeated-record-decay] 的应用推导，同时完整保留原受控记录信道 $\Phi_E$，而不能把记录向量 $E_i$ 改写成向量化密度矩阵 $\lvert E_i\rangle\langle E_i\rvert$（那样会把 Gram 矩阵元 $G_{ij}$ 替换成 $|G_{ij}|^2$，改变原有信道）。

设 $d,e\in\mathbb{N}$ 为任意自然数，$E:\mathrm{Fin}\,d\to\mathrm{Fin}\,e\to\mathbb{C}$ 满足每条记录归一化 $\sum_a |E_i(a)|^2=1$，仍记

$$
G_{E,ij}=\sum_a E_i(a)\overline{E_j(a)},\qquad
\Phi_E(\rho)_{ij}=G_{E,ij}\rho_{ij}.
$$

定义射线等价 $i\sim j$ 当且仅当存在单位模长复标量 $u\in\mathbb{C}$（$|u|=1$）把 $E_j$ 变成 $E_i$（$E_i=uE_j$），并令射线捏合映射 $P_{\mathrm{ray}}$ 保留且只保留同射线矩阵元：

$$
P_{\mathrm{ray}}(\rho)_{ij}=\begin{cases}\rho_{ij},&i\sim j,\\0,&i\not\sim j.\end{cases}
$$

从每条射线 $c$ 中选定一个单位代表向量 $R_c$，对每个系统地址 $i\in\mathrm{Fin}\,d$ 取代表记录 $R_i=R_{c(i)}$（代表记录仍按系统地址索引，同行使用同一个代表），则有 $E_i=u_i R_{c(i)}$ 且 $|u_i|=1$。在有限维复内积空间中，由 Cauchy–Schwarz 不等式 $|G_{R,ij}|\le\|R_i\|_2\|R_j\|_2=1$ 的等号判据，两个单位向量的内积模长达到上界当且仅当二者位于同一射线（$i\sim j$）；因此不同射线代表（$i\not\sim j$，即 $R_i\ne R_j$）的重叠模长必满足 $|G_{E,ij}|=|G_{R,ij}|<1$。由于跨射线下标对 $(i,j)$ 只有有限个，其重叠模长存在统一上界 $q\in[0,1)$（没有跨射线对时取 $q=0$）。该常数 $q$ 由给定记录族 $E$ 确定，对所有下标 $i,j$、步数 $N\in\mathbb{N}$ 与系统矩阵 $\rho$ 一致成立；这里不声称对所有记录族存在同一个正间隙。

直接展开内积给出 $G_{E,ij}=u_i\overline{u_j}G_{R,ij}$。令单位对角矩阵 $U=\operatorname{diag}(u_i)$，则对任意 $N\in\mathbb{N}$ 与任意复系统矩阵 $\rho\in M_d(\mathbb{C})$，原信道的迭代与代表记录信道满足

$$
\Phi_E^N(\rho)=U^N\Phi_R^N(\rho)(U^N)^*.
$$

代表记录 $R$ 的向量相等类 $R_i=R_j$ 恰是原射线类 $i\sim j$，故其向量相等捏合 $\Pi_R$ 等于 $P_{\mathrm{ray}}$，且 $R_i\ne R_j$ 时 $|G_{R,ij}|\le q<1$。将 [@thm-repeated-record-decay] 应用于代表记录 $R$，再由单位对角共轭保持 Frobenius 范数，即得对所有自然数 $N\in\mathbb{N}$ 和任意复系统矩阵 $\rho\in M_d(\mathbb{C})$（无需额外密度矩阵、正性、单位迹或非空前提）：

$$
\bigl\|\Phi_E^N(\rho)-U^N P_{\mathrm{ray}}(\rho)(U^N)^*\bigr\|_{\mathrm F}
\le q^N\bigl\|\rho-P_{\mathrm{ray}}(\rho)\bigr\|_{\mathrm F}.
$$

因此，射线分组下的极限比较对象是**运动中的相干块轨道** $U^N P_{\mathrm{ray}}(\rho)(U^N)^*$，而不是静态完全对角化。在同一射线上（$i\sim j$），$G_{E,ij}=u_i\overline{u_j}$，迭代 $N$ 步后相干模长 $|\rho_{ij}|$ 保持不变，而条件相位仍可随步数旋转。这些条件相位由实际受控耦合或相位校准确定；只知道单独环境记录的密度矩阵 $\lvert E_i\rangle\langle E_i\rvert$ 不能确定这些相位。一般量子信道在渐近演化中保留旋转分量的现象并非新物理发现（文献结果，未在本书形式化：见 Victor V. Albert, *Asymptotics of quantum channels: conserved quantities, an adiabatic limit, and matrix product states*, Quantum **3**, 151 (2019), DOI [10.22331/q-2019-06-06-151](https://doi.org/10.22331/q-2019-06-06-151)，第 2 节关于旋转点与渐近投影的讨论；该文仅提供一般信道背景，上式的有限记录范数界则由上述代表构造与 [@thm-repeated-record-decay] 直接导出）。
:::

::: {.example #ex-ray-record-rotation title="三条记录的手算：同射线相干旋转与跨射线指数收缩同时发生"}
取 $d=3,e=2$ 与三条单位环境记录

$$
E_0=(1,0),\qquad
E_1=(i,0),\qquad
E_2=\left(\frac{3}{5},\frac{4}{5}\right).
$$

其中 $E_0$ 与 $E_1$ 仅差单位相位，射线类为 $\{0,1\}$ 与 $\{2\}$。选射线代表 $R_0=R_1=(1,0)$、$R_2=(3/5,4/5)$，可取相位 $u=(1,i,1)$，跨射线重叠模长 $|G_{02}|=|G_{12}|=3/5$，故取 $q=3/5$。

设初态 $\rho\in M_3(\mathbb{C})$ 的所有 $3\times 3$ 矩阵元均为 $1/3$，它是归一化等权叠加纯态的密度矩阵。作用 $N$ 步后：

1. **同射线相干旋转且模长不减**：下标 $(0,1)$ 同属一条射线，$G_{01}=1\cdot\overline{i}=-i$，故

   $$
   \bigl(\Phi_E^N(\rho)\bigr)_{01}=\frac{(-i)^N}{3},\qquad
   \bigl|\bigl(\Phi_E^N(\rho)\bigr)_{01}\bigr|=\frac{1}{3},
   $$

   共轭元 $(1,0)$ 为 $i^N/3$，模长始终为 $1/3$。
2. **跨射线项按 $(3/5)^N$ 收缩**：四个跨射线项 $(0,2),(2,0),(1,2),(2,1)$ 的模长均为 $\frac{1}{3}(3/5)^N$，因此到运动相干块 $U^N P_{\mathrm{ray}}(\rho)(U^N)^*$ 的 Frobenius 误差恰为

   $$
   \begin{aligned}
   \bigl\|\Phi_E^N(\rho)-U^N P_{\mathrm{ray}}(\rho)(U^N)^*\bigr\|_{\mathrm F}
   &=\sqrt{4\cdot\frac{1}{9}\left(\frac{3}{5}\right)^{2N}} \\
   &=\frac{2}{3}\left(\frac{3}{5}\right)^N.
   \end{aligned}
   $$

   在 $N=0$ 时误差为 $2/3$，$N=1$ 时为 $2/5$，$N=10$ 时为 $\frac{2}{3}(3/5)^{10}=0.0040310784$。
:::

把 $\Phi_E^N$ 解释为连续碰撞，还需要每一步确实实现同一个约化信道；一种实现是每次使用新的、初始不相关的环境寄存器和相同记录耦合。反复访问同一环境或环境之间已有相关时，不能仅凭单次重叠套用 $G_{ij}^N$。这一组结果给出了放宽理想正交条件后的误差控制：原向量分组定理 [@thm-repeated-record-decay] 仍将严格重叠界作为假设前提，而 [@rem-ray-record-orbit] 的射线应用则从有限单位记录推导该界；至于记录归一化、指定受控耦合以及同一约化信道反复作用的现实适用性，在两种表述下均仍是模型前提，需要独立的物理证据支持，且这里的 Frobenius 范数不能直接读作迹距离或实验判别错误率。

::: {.remark #rem-retained-environment-defect title="保留环境下的累积因子化缺陷界（应用推导）"}
若环境未被丢弃更换而是随系统保留演化，也可以在不把真实边缘轨迹定义为信道幂的前提下，将真实约化态与重置模型直接比较。设 $\tau_k$ 为在固定联合幺正算子 $U$ 下演化的真实联合密度态（$\tau_{k+1}=U\tau_k U^*$），$\rho_k=\Tr_{\mathrm{E}}(\tau_k)$ 为其系统边缘态，$\eta$ 为固定的参考环境密度态，并定义单步重置信道 $R(\rho)=\Tr_{\mathrm{E}}\bigl(U(\rho\otimes\eta)U^*\bigr)$。记 $D(\rho,\sigma)=\frac{1}{2}\|\rho-\sigma\|_1$ 为态差迹范数的一半（即下文 [@def-trace-distance] 的迹距离），并记第 $k$ 步的联合因子化缺陷为 $\delta_k=D(\tau_k,\,\rho_k\otimes\eta)$。下文 [@prop-trace-distance-metric-contraction] 的信道收缩声明针对输入与输出同指标类型的信道（如联合空间上的幺正共轭 $X\mapsto UXU^*$ 及系统空间上的同指标重置信道 $R$）；对于从联合空间到系统空间的跨指标偏迹 $\Tr_{\mathrm{E}}$，其收缩性则作为该定理盒之外的应用推导直接给出：将任意厄米差写成正负部分解 $A=P-Q$（$P,Q$ 半正定且 $\operatorname{traceNorm}(A)=\Tr(P)+\Tr(Q)$），由 $\Tr_{\mathrm{E}}$ 的保正性与保迹性、迹范数三角不等式以及正算子恒等式 $\operatorname{traceNorm}(B)=\Tr(B)$，立得 $\operatorname{traceNorm}(\Tr_{\mathrm{E}}A)\le\operatorname{traceNorm}(\Tr_{\mathrm{E}}P)+\operatorname{traceNorm}(\Tr_{\mathrm{E}}Q)=\Tr(P)+\Tr(Q)=\operatorname{traceNorm}(A)$。结合 $D$ 在张量乘入固定密度态 $\eta$ 下的不变性（$D(\rho\otimes\eta,\sigma\otimes\eta)=D(\rho,\sigma)$）、上述偏迹与同指标重置信道 $R$ 的收缩性以及三角不等式，对 $0\le k<N$ 逐项累加得

$$
\begin{aligned}
D\bigl(\rho_{k+1},\,R(\rho_k)\bigr)&=D\Bigl(\Tr_{\mathrm{E}}(U\tau_k U^*),\,\Tr_{\mathrm{E}}\bigl(U(\rho_k\otimes\eta)U^*\bigr)\Bigr)\le D(\tau_k,\,\rho_k\otimes\eta)=\delta_k,\\
D\bigl(R(\rho_k),\,R^{k+1}(\rho_0)\bigr)&=D\Bigl(\Tr_{\mathrm{E}}\bigl(U(\rho_k\otimes\eta)U^*\bigr),\,\Tr_{\mathrm{E}}\bigl(U(R^k(\rho_0)\otimes\eta)U^*\bigr)\Bigr)\le D\bigl(\rho_k,\,R^k(\rho_0)\bigr),\\
D\bigl(\rho_N,\,R^N(\rho_0)\bigr)&\le\sum_{k=0}^{N-1}\delta_k.
\end{aligned}
$$

此处参考态 $\eta$ 可以是混合态；该估计既不将真实边缘轨迹 $\rho_k$ 定义为重置幂 $R^k(\rho_0)$，也不假定或证明缺陷 $\delta_k$ 很小。

当参考态取为纯环境基态 $\eta=\lvert a\rangle\langle a\rvert$（$a\in\mathrm{Fin}\,e$）时，受控记录耦合可由 $U$ 在参考环境列 $(j,a)$ 上的真实矩阵元指定为 $U_{(i,b),\,(j,a)}=[j=i]\,E_i(b)$。设 $J$ 将系统向量嵌入环境坐标 $a$（$J_{(i,b),\,j}=[j=i][b=a]$），$W$ 为受控记录矩阵 $W_{(i,b),\,j}=[j=i]\,E_i(b)$，则这组列直接给出 $UJ=W$ 与 $\rho\otimes\lvert a\rangle\langle a\rvert=J\rho J^*$，由前文偏迹恒等式 `environment_marginal_channel` 立得 $R(\rho)=\Tr_{\mathrm{E}}(W\rho W^*)=\Phi_E(\rho)$（即 $\operatorname{recordChannel}(E)$）。同时，读取 $U^* U=I$ 的第 $((j,a),(j,a))$ 个对角元有

$$
1=(U^* U)_{(j,a),\,(j,a)}=\sum_{i\in\mathrm{Fin}\,d}\,\sum_{b\in\mathrm{Fin}\,e}\bigl|U_{(i,b),\,(j,a)}\bigr|^2=\sum_{b\in\mathrm{Fin}\,e}|E_j(b)|^2,
$$

故每条记录的归一化 $\sum_b |E_j(b)|^2=1$ 由这组受控幺正列直接导出，无需作为独立假设另行附加。但单独的 $U$ 幺正性并不推出上述受控列形式：指定的受控耦合列结构、纯参考基态 $\lvert a\rangle\langle a\rvert$ 以及联合相关缺陷 $\delta_k$ 的控制仍是物理模型假设。对于按字面向量相等划分的记录类 $E_i=E_j$，[@thm-repeated-record-decay] 仍需保留严格的跨类重叠上界（$E_i\ne E_j$ 时 $|G_{ij}|\le q<1$）；若改用 [@rem-ray-record-orbit] 的射线表述，则比较目标旋转为 $U_{\mathrm{ray}}^N P_{\mathrm{ray}}(\rho_0)(U_{\mathrm{ray}}^N)^*$（其中 $U_{\mathrm{ray}}=\operatorname{diag}(u_i)$ 为地址相位对角阵），且不同射线（$i\not\sim j$）之间的严格分离界 $q<1$ 由有限单位记录几何给出。

在保留严格跨类重叠前提下，将 [@thm-repeated-record-decay] 应用于 $R^N(\rho_0)=\Phi_E^N(\rho_0)$。因 Frobenius 范数不超过迹范数（$\|M\|_{\mathrm F}\le\|M\|_1$），而 $D(\rho,\sigma)=\frac{1}{2}\|\rho-\sigma\|_1$ 采用半迹范数约定，将 $D(\rho_N,R^N(\rho_0))$ 换算为 Frobenius 范数会引入因子 $2$，从而真实系统边缘态相对于记录类捏合 $\Pi_E(\rho_0)$ 的 Frobenius 误差满足

$$
\begin{aligned}
\bigl\|\rho_N-R^N(\rho_0)\bigr\|_{\mathrm F}&\le\bigl\|\rho_N-R^N(\rho_0)\bigr\|_1=2\,D\bigl(\rho_N,\,R^N(\rho_0)\bigr)\le 2\sum_{k=0}^{N-1}\delta_k,\\
\bigl\|\rho_N-\Pi_E(\rho_0)\bigr\|_{\mathrm F}&\le 2\sum_{k=0}^{N-1}\delta_k+q^N\bigl\|\rho_0-\Pi_E(\rho_0)\bigr\|_{\mathrm F}.
\end{aligned}
$$

（在 [@rem-ray-record-orbit] 的射线表述下，只需将左端的 $\Pi_E(\rho_0)$ 换为旋转目标 $U_{\mathrm{ray}}^N P_{\mathrm{ray}}(\rho_0)(U_{\mathrm{ray}}^N)^*$、右端换为 $P_{\mathrm{ray}}(\rho_0)$，即可对不同射线的分离界 $q<1$ 得到相应的旋转相干块误差界。）这一不等式是在定理盒之外联合既有估计所做的应用推理，不是所引 GID 冻结声明中的附加条款或新定理。
:::

::: {.example #ex-retained-environment-cnot title="双比特受控翻转：定常环境与重置偏离"}
环境边缘态保持定常，并不自动给出累积联合缺陷 $\sum_{k<N}\delta_k$ 的上界。考察双比特上的系统受控 $X$ 门 $U=\lvert 0\rangle\langle 0\rvert\otimes I+\lvert 1\rangle\langle 1\rvert\otimes X$，取系统初态为赤道纯态 $\rho_0=\lvert +\rangle\langle +\rvert=\frac{1}{2}\bigl(\begin{smallmatrix}1&1\\1&1\end{smallmatrix}\bigr)$，参考环境态为 $\eta_r=\frac{1}{2}(I+rX)=\frac{1}{2}\bigl(\begin{smallmatrix}1&r\\r&1\end{smallmatrix}\bigr)$（$0\le r\le 1$），并从乘积初态 $\tau_0=\rho_0\otimes\eta_r$ 出发沿 $\tau_{k+1}=U\tau_k U^*$ 演化：

1. **真实演化周期为 $2$，而重置信道逐次乘以 $r$**：因 $X\eta_r X=\eta_r$，真实环境边缘态在每一步均保持定常 $\Tr_{\mathrm{S}}(\tau_k)=\eta_r$。与此同时，联合幺正门满足 $U^2=I$（周期为 $2$），而单步重置信道 $R(\rho)=\Tr_{\mathrm{E}}\bigl(U(\rho\otimes\eta_r)U^*\bigr)$ 将系统的横向非对角元乘以 $\Tr(\eta_r X)=r$。因此在偶数步 $N=2m$ 时，真实系统边缘态与重置迭代态分别为

   $$
   \rho_{2m}=\rho_0=\frac{1}{2}\begin{pmatrix}1&1\\1&1\end{pmatrix},\qquad
   R^{2m}(\rho_0)=\frac{1}{2}\begin{pmatrix}1&r^{2m}\\r^{2m}&1\end{pmatrix}.
   $$

2. **偶数步迹距离与近纯环境数值对比**：直接计算矩阵差 $\rho_{2m}-R^{2m}(\rho_0)=\frac{1-r^{2m}}{2}X$ 与 $\eta_1-\eta_r=\frac{1-r}{2}X$，可得偶数步 $N=2m$ 时真实系统态与重置迭代态的迹距离，以及 $\eta_r$ 到纯态 $\lvert +\rangle\langle +\rvert$ 的迹距离：

   $$
   D\bigl(\rho_{2m},\,R^{2m}(\rho_0)\bigr)=\frac{1-r^{2m}}{2},\qquad
   D\bigl(\eta_r,\,\lvert +\rangle\langle +\rvert\bigr)=\frac{1-r}{2}.
   $$

   例如取 $r=0.99$、$N=100$（$m=50$），环境偏离纯态 $\lvert +\rangle\langle +\rvert$ 的迹距离不纯度仅为 $\frac{1-0.99}{2}=0.005$，但第 $100$ 步真实系统态与重置迭代态之间的迹距离偏离达到

   $$
   D\bigl(\rho_{100},\,R^{100}(\rho_0)\bigr)=\frac{1-0.99^{100}}{2}\approx 0.3169838293633854.
   $$

3. **精确纯态端点与两类极限命题的区分**：当 $r=1$ 时，$\eta_1=\lvert +\rangle\langle +\rvert$，上述迹距离偏离恒为 $0$；因此该算例并不否定“环境精确为纯态且保持不变”这一前提。它展示的是两件不同的数学义务：对任意**固定**步数 $N=2m$，当 $r\to 1$ 时偏离 $\frac{1-r^{2m}}{2}\to 0$；但对任意固定的 $r\in[0,1)$，关于偶数步时间的上确界恒为 $\sup_{m\ge 1}\frac{1-r^{2m}}{2}=\frac{1}{2}$，不能仅凭环境边缘态定常且单步接近纯态就断言时间一致的重置近似界。这一双比特手算仅用于说明上述数学区分，不声称物理实验、原创发现或开放系统演化的普适解释；联合相关性的实际控制、物理耦合的标定与实验验证仍处于这些数学应用之外。
:::

::: {.remark #rem-pure-environment-marginal-defect title="环境边缘态的精确纯度因子化与近纯态单步缺陷界（应用推导）"}
与 [@ex-retained-environment-cnot] 中混合环境边缘态仅保持定常不同，**真实环境边缘态的精确纯度**具有更强的代数后果；而当真实环境边缘态仅接近指定纯态时，其偏离量则可直接控制单步因子化缺陷（以下均为定理盒之外的应用推导，不构成所引冻结声明的附加条款或新的形式化定理）：

1. **真实环境边缘态精确为纯基态时的张量积因子化**：设 $X\in M_{\mathrm{Fin}\,d\times\mathrm{Fin}\,e}(\mathbb{C})$ 为有限维半正定且迹为 $1$ 的联合矩阵，记对系统求偏迹为 $\Tr_{\mathrm{S}}(X)$（其第 $(b,b')$ 元为 $\sum_i X_{(i,b),\,(i,b')}$），对环境求偏迹为 $\Tr_{\mathrm{E}}(X)$（其第 $(i,j)$ 元为 $\sum_b X_{(i,b),\,(j,b)}$）。固定环境基下标 $a\in\mathrm{Fin}\,e$ 及纯基态投影 $p=\lvert a\rangle\langle a\rvert$（矩阵元 $p_{b,b'}=\delta_{b,a}\delta_{b',a}$）。若真实环境边缘态精确满足 $\Tr_{\mathrm{S}}(X)=p=\lvert a\rangle\langle a\rvert$，则对任意 $b\ne a$，环境对角元满足

   $$
   0=p_{b,b}=\bigl(\Tr_{\mathrm{S}}(X)\bigr)_{b,b}=\sum_{i\in\mathrm{Fin}\,d}X_{(i,b),\,(i,b)}.
   $$

   因 $X$ 半正定，每个联合对角元 $X_{(i,b),\,(i,b)}\ge 0$；非负实数之和为零迫使每一项各自为零，即对所有 $i$ 与所有 $b\ne a$ 均有 $X_{(i,b),\,(i,b)}=0$。再由半正定矩阵的矩阵元上界 $|X_{\alpha,\beta}|^2\le X_{\alpha,\alpha}X_{\beta,\beta}$（对平方根 $\sqrt{X}$ 的列向量应用 Cauchy–Schwarz 不等式），凡满足 $b\ne a$ 或 $b'\ne a$ 的联合矩阵元必有 $X_{(i,b),\,(j,b')}=0$，即 $a$ 之外的所有联合行与列恒为零。唯一保留下来的 $(a,a)$ 环境块恰为真实系统边缘态 $\bigl(\Tr_{\mathrm{E}}(X)\bigr)_{i,j}=\sum_b X_{(i,b),\,(j,b)}=X_{(i,a),\,(j,a)}$，从而

   $$
   X=\bigl(\Tr_{\mathrm{E}}(X)\bigr)\otimes p.
   $$

   这一因子化无需额外假设全局联合态 $X$ 为纯态，也无需事先假定 $X$ 为乘积态；但它只是从“真实环境边缘态等于 $p$”出发的代数推论，并不证明物理演化中的真实环境边缘态会保持为纯态。

2. **有限步轨迹上各输入步精确纯边缘态导出重置幂**：固定有限步数 $N\in\mathbb{N}$ 与联合幺正算子 $U$，令真实联合密度态按 $\tau_{k+1}=U\tau_k U^*$ 演化，记真实系统边缘态为 $\rho_k=\Tr_{\mathrm{E}}(\tau_k)$，并显式定义对应于纯投影 $p=\lvert a\rangle\langle a\rvert$ 的单步重置映射

   $$
   R_p(\rho)=\Tr_{\mathrm{E}}\bigl(U(\rho\otimes p)U^*\bigr).
   $$

   若在每一个输入步 $0\le k<N$ 上，$\tau_k$ 半正定（且迹为 $1$）且真实环境边缘态均精确等于同一个纯投影 $\Tr_{\mathrm{S}}(\tau_k)=p$，则由第 1 条知在每个输入步 $0\le k<N$ 上均有 $\tau_k=\rho_k\otimes p$，从而 $\rho_{k+1}=\Tr_{\mathrm{E}}(U\tau_k U^*)=\Tr_{\mathrm{E}}\bigl(U(\rho_k\otimes p)U^*\bigr)=R_p(\rho_k)$。对 $k$ 归纳即得

   $$
   \rho_N=R_p^N(\rho_0),
   $$

   其中包含 $N=0$ 的恒等情形（$R_p^0(\rho_0)=\rho_0$）。因此在所需输入步 $k<N$ 上假设真实环境边缘态精确为同一个纯态 $p$，即可省去独立的乘积态假设；但“在每个输入步 $k<N$ 上 $\Tr_{\mathrm{S}}(\tau_k)=p$”本身仍是逐步施加的物理模型前提，不能由 $U$ 的幺正性导出，不能泛化为一切开放量子系统的普遍性质，也必须与单纯的环境边缘态定常性、近似纯度或仅供比较而人为选定的纯参考态严格区分。

3. **近纯真实环境边缘态的与维数无关单步因子化缺陷界**：对任意有限维半正定且 $\Tr(X)=1$ 的联合矩阵 $X\in M_{\mathrm{Fin}\,d\times\mathrm{Fin}\,e}(\mathbb{C})$，固定环境基点 $a\in\mathrm{Fin}\,e$ 与纯投影 $p=\lvert a\rangle\langle a\rvert$，记真实系统边缘态为 $\sigma=\Tr_{\mathrm{E}}(X)$，并定义环境在基态 $a$ 之外的布居漏出量

   $$
   \varepsilon=1-\operatorname{Re}\Bigl(\bigl(\Tr_{\mathrm{S}}(X)\bigr)_{a,a}\Bigr)\in[0,1].
   $$

   沿用半迹范数约定 $D(A,B)=\frac{1}{2}\operatorname{traceNorm}(A-B)=\frac{1}{2}\|A-B\|_1$，无需对 $X$ 作任何乘积态假设，即有与系统维数 $d$ 和环境维数 $e$ 均无关的单步缺陷界

   $$
   D(X,\,\sigma\otimes p)\le\sqrt{\varepsilon}+\frac{\varepsilon}{2}.
   $$

   其自包含证明机制由两步估计合成。首先，令联合正交投影 $P=I\otimes p$（满足 $P^*=P=P^2$），取半正定平方根 $S=\sqrt{X}$（$S^*=S$，$S^2=X$）并置 $C=PS$。由 $\Tr(PX)=\bigl(\Tr_{\mathrm{S}}(X)\bigr)_{a,a}=1-\varepsilon$ 与 $(I-P)^2=I-P$，Frobenius 范数满足 $\|S\|_{\mathrm F}^2=\Tr(X)=1$、$\|C\|_{\mathrm F}^2=\Tr(S^* P^2 S)=\Tr(PX)=1-\varepsilon\le 1$ 以及 $\|S-C\|_{\mathrm F}^2=\Tr\bigl(S^*(I-P)^2 S\bigr)=\Tr\bigl((I-P)X\bigr)=\varepsilon$，即 $\|S\|_{\mathrm F}=1$、$\|C\|_{\mathrm F}\le 1$、$\|S-C\|_{\mathrm F}=\|S^*-C^*\|_{\mathrm F}=\sqrt{\varepsilon}$。将 $X-PXP=SS^*-CC^*$ 展开为 $(S-C)S^*+C(S^*-C^*)$，应用迹范数三角不等式与乘积迹范数受 Frobenius 范数之积控制的不等式 $\operatorname{traceNorm}(AB)\le\|A\|_{\mathrm F}\|B\|_{\mathrm F}$，可得

   $$
   \begin{aligned}
   \operatorname{traceNorm}(X-PXP)&\le\operatorname{traceNorm}\bigl((S-C)S^*\bigr)+\operatorname{traceNorm}\bigl(C(S^*-C^*)\bigr) \\
   &\le\|S-C\|_{\mathrm F}\|S^*\|_{\mathrm F}+\|C\|_{\mathrm F}\|S^*-C^*\|_{\mathrm F}\le 2\sqrt{\varepsilon}.
   \end{aligned}
   $$

   其次，记 $X$ 在环境指标 $b$ 上的对角块为 $(A_b)_{i,j}=X_{(i,b),\,(j,b)}$，并简记 $a$ 块为 $A_0=A_a$。则 $PXP=A_0\otimes p$，而差矩阵 $\sigma-A_0=\sum_{b\ne a}A_b$ 是其余环境对角主子块之和；每个对角主子块 $A_b$ 均半正定，故 $\sigma-A_0$ 与 $(\sigma-A_0)\otimes p$ 亦半正定，其迹范数等于其迹：

   $$
   \begin{aligned}
   \operatorname{traceNorm}\bigl((\sigma-A_0)\otimes p\bigr)&=\Tr\bigl((\sigma-A_0)\otimes p\bigr) \\
   &=\bigl(\Tr(\sigma)-\Tr(A_0)\bigr)\Tr(p)=1-(1-\varepsilon)=\varepsilon.
   \end{aligned}
   $$

   最后利用 $X-\sigma\otimes p=(X-PXP)-\bigl((\sigma-A_0)\otimes p\bigr)$，由迹范数三角不等式并除以 $2$，立得 $D(X,\sigma\otimes p)\le\frac{1}{2}(2\sqrt{\varepsilon}+\varepsilon)=\sqrt{\varepsilon}+\frac{\varepsilon}{2}$。

4. **有限步轨迹累加、受控记录条件与纯/混合重置参考的区分**：对真实演化轨迹 $\tau_{k+1}=U\tau_k U^*$，相对于同一个固定纯基态 $p=\lvert a\rangle\langle a\rvert$ 定义第 $k$ 步漏出量 $\varepsilon_k=1-\operatorname{Re}\bigl((\Tr_{\mathrm{S}}\tau_k)_{a,a}\bigr)\in[0,1]$，则单步纯参考缺陷满足 $\delta_{k,p}=D(\tau_k,\rho_k\otimes p)\le\sqrt{\varepsilon_k}+\varepsilon_k/2$。代入 [@rem-retained-environment-defect] 针对纯参考重置映射 $R_p$ 的累加不等式，对任意有限步数 $N\in\mathbb{N}$ 有

   $$
   D\bigl(\rho_N,\,R_p^N(\rho_0)\bigr)\le\sum_{k=0}^{N-1}\left(\sqrt{\varepsilon_k}+\frac{\varepsilon_k}{2}\right).
   $$

   仅当在 [@rem-retained-environment-defect] 已说明的实际受控列假设 $U_{(i,b),\,(j,a)}=[j=i]\,E_i(b)$ 下能够将 $R_p$ 认同为受控记录信道 $\Phi_E$（并配合跨类重叠界 $|G_{ij}|\le q<1$ 或 [@rem-ray-record-orbit] 的射线分离界）时，上述有限步累加和才能进一步给出真实轨迹对记录类捏合的 Frobenius 误差预算。同时必须区分比较目标：上述缺陷界衡量的是相对于**纯投影** $p$ 的偏离 $D(\tau_k,\rho_k\otimes p)$，其直接受控的比较对象是 $R_p(\rho)=\Tr_{\mathrm{E}}\bigl(U(\rho\otimes p)U^*\bigr)$，**并不自动给出** $R_p$ 与混合参考重置映射 $R_\eta(\rho)=\Tr_{\mathrm{E}}\bigl(U(\rho\otimes\eta)U^*\bigr)$ 相等或针对 $R_\eta$ 的误差界（不同参考态未必导出不同的重置映射，例如 $U=I$ 对任意迹为 $1$ 的环境参考态均导出系统恒等映射；但除非独立证明 $R_p=R_\eta$，将 $\eta$ 替换为 $p$ 仍需对 $R_p$ 与 $R_\eta$ 及其迭代另作比较），因此不能将该纯参考界直接套用于 [@ex-retained-environment-cnot] 中以混合态 $\eta_r$（$0\le r<1$）定义的重置信道 $R_{\eta_r}$。此外，这一单步估计在轨迹上按有限步数 $N$ 累加，既不证明具体物理系统中 $\varepsilon_k$ 必然微小，也不自动给出关于时间 $N$ 一致成立的小误差界。
:::

::: {.remark #rem-pure-record-support-compatibility title="受控记录下保纯环境的布居支集限制与相干模长守恒（应用推导）"}
[@rem-pure-environment-marginal-defect] 第 2 条的有限步恒等式 $\rho_N=R_p^N(\rho_0)$ 仅要求在各**输入步** $0\le k<N$ 上真实环境边缘态满足 $\Tr_{\mathrm{S}}(\tau_k)=p=\lvert a\rangle\langle a\rvert$，并不约束末端输出步 $\tau_N$：即便在单步 $N=1$ 时，$\Tr_{\mathrm{S}}(\tau_0)=p$ 已足以给出 $\rho_1=R_p(\rho_0)$，而末端输出 $\tau_1$ 仍可发生真实的环境记录与系统退相干。若进一步要求单步跃迁 $\tau'=U\tau U^*$ **跨跃迁保持**同一个指定的纯环境边缘态 $p=\lvert a\rangle\langle a\rvert$，则必须在输入与输出两个端点同时施加精确纯度条件 $\Tr_{\mathrm{S}}(\tau)=p$ 与 $\Tr_{\mathrm{S}}(\tau')=p$，这是一项严格更强的限制（以下仍为定理盒之外的有限维分析应用推导，不构成所引冻结声明的附加条款或新的形式化定理）。沿用 [@rem-retained-environment-defect] 在 $\mathrm{Fin}\,d\times\mathrm{Fin}\,e$ 上的受控记录列假设 $U_{(i,b),\,(j,a)}=[j=i]\,E_i(b)$（故每条记录满足归一化 $\sum_{b\in\mathrm{Fin}\,e}|E_i(b)|^2=1$ 且 $R_p=\Phi_E$），设联合输入 $\tau$ 半正定且迹为 $1$，记系统边缘态为 $\rho=\Tr_{\mathrm{E}}(\tau)$，并记其在控制基下的**布居支集**为 $S=\{i\in\mathrm{Fin}\,d:\rho_{ii}>0\}$。由 [@rem-pure-environment-marginal-defect] 第 1 条，输入端 $\Tr_{\mathrm{S}}(\tau)=p$ 已直接导出张量积因子化 $\tau=\rho\otimes p$。在这一受控列结构下，输出联合态 $\tau'=U(\rho\otimes p)U^*$ 在环境指标 $b\in\mathrm{Fin}\,e$ 处的边缘对角元恰为 $\sum_{i\in\mathrm{Fin}\,d}\rho_{ii}|E_i(b)|^2$；若输出环境边缘态仍精确等于 $p=\lvert a\rangle\langle a\rvert$，则对一切 $b\ne a$ 有

$$
0=p_{b,b}=\Bigl(\Tr_{\mathrm{S}}\bigl(U(\rho\otimes p)U^*\bigr)\Bigr)_{b,b}=\sum_{i\in\mathrm{Fin}\,d}\rho_{ii}|E_i(b)|^2.
$$

因 $\rho$ 半正定，每一求和项均满足 $\rho_{ii}|E_i(b)|^2\ge 0$；非负实数之和为零迫使每一项各自为零，故对一切受占地址 $i\in S$（$\rho_{ii}>0$）及一切 $b\ne a$ 均有 $E_i(b)=0$。结合记录归一化 $\sum_{b\in\mathrm{Fin}\,e}|E_i(b)|^2=1$，布居支集 $S$ 上的每条受占记录向量必沿 $\lvert a\rangle$ 方向且仅差一个单位复相位：

$$
E_i=u_i\lvert a\rangle,\qquad u_i=E_i(a)\in\mathbb{C},\qquad |u_i|=1\qquad (i\in S).
$$

由此，对任意一对受占地址 $i,j\in S$，Gram 乘子满足 $G_{ij}=\sum_{b\in\mathrm{Fin}\,e}E_i(b)\overline{E_j(b)}=u_i\overline{u_j}$ 且模长恒为 $|G_{ij}|=1$，单步信道公式 $R_p(\rho)_{ij}=\Phi_E(\rho)_{ij}=G_{ij}\rho_{ij}$ 在 $S\times S$ 上保持矩阵元模长 $|\rho_{ij}|$ 不变。而在受占支集之外，只要 $i\notin S$ 或 $j\notin S$，非负对角布居 $\rho_{ii},\rho_{jj}\ge 0$ 中至少有一项为零；由半正定矩阵元上界 $|\rho_{ij}|^2\le\rho_{ii}\rho_{jj}$，零对角布居迫使其所在的整行与整列恒为零（$\rho_{ij}=0$，从而输出亦有 $R_p(\rho)_{ij}=G_{ij}\rho_{ij}=0$）。因此，包括 $S$ 之外的零行列在内，系统密度矩阵的**每一个矩阵元模长**在跨跃迁后均精确守恒：

$$
G_{ij}=u_i\overline{u_j},\quad |G_{ij}|=1\quad (i,j\in S),\qquad \bigl|R_p(\rho)_{ij}\bigr|=|\rho_{ij}|\quad (\forall i,j\in\mathrm{Fin}\,d).
$$

相对相位因子 $u_i\overline{u_j}$ 的旋转（或实部、虚部等正交分量的改变）只是复平面上的相位转动，不构成相干模长 $|\rho_{ij}|$ 的衰减。这一推导仅用到输入态的半正定性、单位迹以及两端环境边缘态等于 $p$，无需额外假设系统态 $\rho$ 为纯态、联合态 $\tau$ 为纯态、$\rho$ 满秩或布居支集 $S$ 占满全部系统地址；反过来，秩为 $1$ 的纯叠加态（如全基等权叠加态）完全可以拥有满布居支集 $S=\mathrm{Fin}\,d$。

由于求和式 $\sum_i\rho_{ii}|E_i(b)|^2=0$ 只约束 $\rho_{ii}>0$ 的受占地址，上述条件对全局信道 $R_p$ 的限制取决于输入态的布居支集 $S$。当输入具有**满布居支集** $S=\mathrm{Fin}\,d$ 时，$E_i=u_i\lvert a\rangle$（$|u_i|=1$）遍及全部系统地址，记相位对角幺正阵为 $U_{\mathrm{ray}}=\operatorname{diag}(u_i)$，则重置映射在**任意**复系统矩阵 $\sigma\in M_d(\mathbb{C})$ 上均化为幺正对角共轭 $R_p(\sigma)=U_{\mathrm{ray}}\sigma U_{\mathrm{ray}}^*$。当输入**布居支集不满**（$S\subsetneq\mathrm{Fin}\,d$）时，未受占地址 $i\notin S$ 的记录列 $E_i$ 不受该条轨迹约束，全局重置信道 $R_p$ 未必是幺正共轭：例如取 $d=3$ 及正交环境基态 $\lvert a\rangle\perp\lvert b\rangle$，令 $E_0=E_1=\lvert a\rangle$、$E_2=\lvert b\rangle$，则任何支集落在 $\{0,1\}$ 上的相干输入都保持输出环境边缘态为 $p$ 且保持全部矩阵元模长不变，但对占据地址 $2$ 的其他输入，涉及地址 $2$ 的相干元仍因 $G_{02}=G_{12}=0$ 而发生完全退相干。另一方面，若沿**同一个固定**受控幺正算子 $U$ 生成真实联合轨迹 $\tau_{k+1}=U\tau_k U^*$，则初态 $\tau_0$ 在首步跃迁上保持环境边缘态 $p$ 一旦确定了对一切 $i\in S=\{i:(\rho_0)_{ii}>0\}$ 有 $U(\lvert i\rangle\otimes\lvert a\rangle)=u_i(\lvert i\rangle\otimes\lvert a\rangle)$，由 $\{\lvert i\rangle\otimes\lvert a\rangle:i\in S\}$ 张成的联合子空间（以及支集在 $S\times\{a\}$ 上的联合密度矩阵）即成为 $U$ 的不变子空间。于是对角布居 $(\rho_k)_{ii}=(\rho_0)_{ii}$ 与支集 $S$ 保持固定，后续每一步 $k\in\mathbb{N}$ 均自动维持 $\Tr_{\mathrm{S}}(\tau_k)=p$ 且满足

$$
(\rho_k)_{ij}=(u_i\overline{u_j})^k(\rho_0)_{ij}\quad (i,j\in S),\qquad \bigl|(\rho_k)_{ij}\bigr|=\bigl|(\rho_0)_{ij}\bigr|\quad (\forall i,j\in\mathrm{Fin}\,d),
$$

对于这同一个固定受控算子 $U$，无需在后续步 $k\ge 1$ 上重复追加新的输出端纯度假设。若每步耦合算子随时间改变，则仍须在每次跃迁上分别满足相应的受控列结构与纯边缘态保持条件；同时，该结论不涵盖未观测的连续中间时刻，也不适用于脱离受控记录列结构的任意联合幺正算子——例如单比特 Hadamard 门与环境恒等算子的张量积 $U=H\otimes I$ 在保持环境边缘态 $p$ 的同时会将赤道态 $\lvert +\rangle\langle +\rvert$ 旋转为计算基态 $\lvert 0\rangle\langle 0\rvert$，这改变的是计算基下的相干与布居分布，而非受控记录下的退相干。

将上述支集性质与前文的衰减条件对照，即可厘清不同模型前提之间的相容边界。若在保持纯环境 $p$ 的同时还要求满足 [@thm-repeated-record-decay] 按字面向量划分的严格跨类重叠界（$E_i\ne E_j$ 时 $|G_{ij}|\le q<1$），则因任意两个受占地址 $i,j\in S$ 的重叠模长恒为 $|G_{ij}|=|u_i\overline{u_j}|=1$，不可能满足 $1\le q<1$；故 $S$ 上的所有受占记录向量必须按字面完全相等（对同一公共单位相位 $u$ 有 $E_i=u\lvert a\rangle$），此时 $R_p(\rho)=\rho$，该输入态相对于记录类捏合的误差 $\|\rho-\Pi_E(\rho)\|_{\mathrm F}$ 恒为零。若采用 [@rem-ray-record-orbit] 的射线表述，则 $S$ 上的受占记录 $E_i=u_i\lvert a\rangle$ 共处同一条射线 $\mathbb{C}\lvert a\rangle$，不存在跨射线受占对，射线捏合误差 $\|\rho-P_{\mathrm{ray}}(\rho)\|_{\mathrm F}$ 同样为零，仅保留相位轨道 $(u_i\overline{u_j})^k\rho_{ij}$ 的相干旋转。在整个分析中，必须将**真实完整环境边缘态的精确纯度** $\Tr_{\mathrm{S}}(\tau)=p$ 与以下五类不同条件严格区分：单条条件记录向量 $\lvert E_i\rangle$ 的纯态性（在任何受控记录模型中 $\lvert E_i\rangle$ 本身皆为单位纯态，但其加权边缘态 $\sum_i\rho_{ii}\lvert E_i\rangle\langle E_i\rvert$ 仍可因记录分岔而混合）、全局联合态 $\tau$ 的纯态性、仅在定义 $R_p$ 时人为选作比较基准的纯参考态 $p$、混合环境边缘态的定常性（如 [@ex-retained-environment-cnot]），以及近似纯度（[@rem-pure-environment-marginal-defect] 中的 $\varepsilon_k>0$）——这五者均不能替代两端边缘态精确为 $p$ 的前提。上述结论均基于有限维矩阵、偏迹与受控记录恒等式的分析推演，不声称逆命题、无穷维推广、原创数学发现或实验验证。
:::

::: {.remark #rem-actual-environment-purity-loss title="真实输出环境纯度对单步系统相干损失的控制（应用推导）"}
[@rem-pure-environment-marginal-defect] 与 [@rem-pure-record-support-compatibility] 均以预先选定的纯环境参考基态 $p=\lvert a\rangle\langle a\rvert$ 作为比较基准。若不预先指定任何参考射线，也能直接将单步受控记录后的**系统纯度（及副对角相干）损失**与**真实输出环境边缘态的纯度**相比较（以下仍为定理盒之外的有限维分析应用推导，不构成所引冻结声明的附加条款或新的形式化定理）。先看最直观的单比特手算（$d=2$）：设两条单位环境记录 $E_0,E_1$ 的内积重叠为 $G_{01}=\sum_b E_0(b)\overline{E_1(b)}$。若系统初态取赤道纯叠加态 $\rho=\lvert +\rangle\langle +\rvert=\frac{1}{2}\bigl(\begin{smallmatrix}1&1\\1&1\end{smallmatrix}\bigr)$（对角布居 $p_0=p_1=\frac{1}{2}$，副对角元模平方 $|\rho_{01}|^2=|\rho_{10}|^2=\frac{1}{4}$），则受控记录后系统约化态 $\rho'$ 的副对角元乘以 $G_{01}$ 与 $\overline{G_{01}}$，系统纯度从 $F_2(\rho)=\Tr(\rho^2)=1$ 降为 $F_2(\rho')=\Tr(\rho'^2)=\frac{1}{2}+\frac{1}{2}|G_{01}|^2$，纯度损失恰为 $L_2=F_2(\rho)-F_2(\rho')=\frac{1-|G_{01}|^2}{2}$；与此同时，真实输出环境边缘态 $\sigma_{\mathrm{E}}=\frac{1}{2}\lvert E_0\rangle\langle E_0\rvert+\frac{1}{2}\lvert E_1\rangle\langle E_1\rvert$ 的纯度为 $q=F_2(\sigma_{\mathrm{E}})=\Tr(\sigma_{\mathrm{E}}^2)=\frac{1+|G_{01}|^2}{2}$，其线性熵 $\Delta=1-q=\frac{1-|G_{01}|^2}{2}$ 与 $L_2$ 完全相等。反之，若系统初态改取球心最大混合态 $\rho=\frac{1}{2}I_2$ 且两条环境记录正交（$G_{01}=0$），则系统边缘态保持 $\rho'=\rho=\frac{1}{2}I_2$ 不变（$L_2=0$），而真实输出环境仍等权分岔为两条正交记录的混合态（$q=\frac{1}{2}$，$\Delta=1-q=\frac{1}{2}$）：

$$
\begin{aligned}
\rho=\lvert +\rangle\langle +\rvert:\quad & L_2=F_2(\rho)-F_2(\rho')=\frac{1-|G_{01}|^2}{2}=1-q=\Delta,\\
\rho=\frac{1}{2}I_2\;\;(G_{01}=0):\quad & L_2=0<\frac{1}{2}=1-q=\Delta.
\end{aligned}
$$

将这一手算推广到任意有限维系统与环境（$d,e\in\mathbb{N}$）：设 $\rho\in M_d(\mathbb{C})$ 为半正定且迹为 $1$ 的系统密度矩阵，每条环境记录 $E_i\in\mathbb{C}^e$（$i\in\mathrm{Fin}\,d$）满足归一化 $\sum_{b\in\mathrm{Fin}\,e}|E_i(b)|^2=1$，沿用 [@thm-repeated-record-decay] 的记号写对角布居 $p_i=\rho_{ii}\ge 0$ 及 Gram 矩阵元 $G_{ij}=\sum_{b\in\mathrm{Fin}\,e}E_i(b)\overline{E_j(b)}$。定义受控记录矩阵 $W_{(i,b),\,j}=[j=i]\,E_i(b)$（记录归一化使 $W^*W=I_d$ 为保内积等距算子），并令联合记录态及其两个真实偏迹边缘态为

$$
\begin{aligned}
X&=W\rho W^*,\qquad \sigma_{\mathrm{E}}=\Tr_{\mathrm{S}}(X),\qquad \rho'=\Tr_{\mathrm{E}}(X),\\
F_2(A)&=\|A\|_{\mathrm F}^2=\sum_{i,j}|A_{ij}|^2,\qquad C_2(A)=\|A-\operatorname{diag}(A)\|_{\mathrm F}^2=\sum_{i\ne j}|A_{ij}|^2.
\end{aligned}
$$

此处 $\sigma_{\mathrm{E}}$ 与 $\rho'$ 是同一个记录联合态 $X$ 的两个真实边缘态；记号 $F_2(A)$ 与 $C_2(A)$ 中的下标 $2$ 明确表示它们本身已是按本章 Frobenius 范数 $\|A\|_{\mathrm F}=\bigl(\sum_{i,j}|A_{ij}|^2\bigr)^{1/2}$ 定义的**平方量**（即全部矩阵元或全部副对角元的模平方和，而非对某个范数再取二次平方）。若要把 $X=W\rho W^*$ 解释为某个联合幺正算子 $U$ 的真实单步输出 $U(\rho\otimes\lvert a\rangle\langle a\rvert)U^*$，则初始联合态必须取纯初始环境下的乘积态 $\rho\otimes\lvert a\rangle\langle a\rvert$（$a\in\mathrm{Fin}\,e$），且 $U$ 满足 [@rem-retained-environment-defect] 中指定的受控列条件 $UJ=W$（即 $U_{(i,b),\,(j,a)}=[j=i]\,E_i(b)$）；下述系数为 $1$ 的不等式仅在这一纯初始环境与归一化有限记录的前提下成立，不对混合初始环境断言。

直接展开对系统的偏迹 $\sigma_{\mathrm{E}}=\Tr_{\mathrm{S}}(W\rho W^*)$，其第 $(b,c)$ 个矩阵元为 $(\sigma_{\mathrm{E}})_{b,c}=\sum_{i\in\mathrm{Fin}\,d}p_i E_i(b)\overline{E_i(c)}$，对全部 $b,c\in\mathrm{Fin}\,e$ 求模平方和即得真实输出环境的纯度 $q=F_2(\sigma_{\mathrm{E}})=\sum_{i,j\in\mathrm{Fin}\,d}p_i p_j|G_{ij}|^2$（等价地，将各记录向量 $E_i$ 排成 $e\times d$ 矩阵 $B$ 的列，则 $\sigma_{\mathrm{E}}=B\operatorname{diag}(p)B^*$ 且 $(B^*B)_{ij}=\overline{G_{ij}}$，由迹的循环性同样给出 $\Tr(\sigma_{\mathrm{E}}^2)=\sum_{i,j}p_i p_j|G_{ij}|^2$）。另一方面，前文 [@thm-repeated-record-decay] 所用的偏迹恒等式 `environment_marginal_channel` 给出 $\rho'_{ij}=G_{ij}\rho_{ij}$。因输入态 $\rho$ 与两个边缘态 $\rho',\sigma_{\mathrm{E}}$ 均为厄米密度矩阵，对它们而言 $F_2(A)=\Tr(A^2)$。记系统纯度损失为 $L_2=F_2(\rho)-F_2(\rho')$，输出环境的线性熵为 $\Delta=1-q=1-F_2(\sigma_{\mathrm{E}})$；利用 $\sum_{i,j}p_i p_j=\bigl(\sum_i p_i\bigr)^2=1$、记录归一化给出的 $G_{ii}=1$ 与 $|G_{ij}|\le 1$，以及 [@rem-pure-environment-marginal-defect] 中半正定矩阵 $\rho$ 的矩阵元上界 $|\rho_{ij}|^2\le\rho_{ii}\rho_{jj}=p_i p_j$，逐项比较非负项 $1-|G_{ij}|^2\ge 0$ 立得

$$
\begin{aligned}
(\sigma_{\mathrm{E}})_{b,c}&=\sum_{i\in\mathrm{Fin}\,d}p_i E_i(b)\overline{E_i(c)},\qquad q=F_2(\sigma_{\mathrm{E}})=\sum_{i,j\in\mathrm{Fin}\,d}p_i p_j|G_{ij}|^2,\\
L_2&=F_2(\rho)-F_2(\rho')=C_2(\rho)-C_2(\rho')=\sum_{i,j\in\mathrm{Fin}\,d}|\rho_{ij}|^2\bigl(1-|G_{ij}|^2\bigr),\\
\Delta&=1-q=1-F_2(\sigma_{\mathrm{E}})=\sum_{i,j\in\mathrm{Fin}\,d}p_i p_j\bigl(1-|G_{ij}|^2\bigr),\qquad 0\le L_2\le 1-q=\Delta.
\end{aligned}
$$

这一估计完全由记录归一化与半正定矩阵元上界直接导出：既不需要选定参考比较射线，也不需要对布居数 $p_i$ 施加正下界或假设 $\rho$ 满秩（当 $p_i=0$ 时，$|\rho_{ij}|^2\le p_i p_j$ 自动迫使 $\rho_{ij}=0$，不会产生任何零除或例外）。由于对角元满足 $\rho'_{ii}=G_{ii}\rho_{ii}=\rho_{ii}$ 而保持不变，系统纯度损失 $L_2$ 精确等于副对角 Frobenius 相干模平方和的减少量 $C_2(\rho)-C_2(\rho')$；注意它是前后两态各自平方范数之差，**而不是**态差矩阵的 Frobenius 范数平方 $F_2(\rho-\rho')=\|\rho-\rho'\|_{\mathrm F}^2$。当系统初态 $\rho$ 为纯态时，对一切 $i,j$ 均有 $|\rho_{ij}|^2=p_i p_j$，故等号恒成立（$L_2=1-q=\Delta$）；而对一般混合系统初态则仅成立不等式 $L_2\le 1-q$，如上文球心最大混合态 $\frac{1}{2}I_2$ 配正交记录即给出 $L_2=0<\frac{1}{2}=1-q$。

特别地，当真实输出环境边缘态具有单位纯度 $q=F_2(\sigma_{\mathrm{E}})=1$（即 $\Delta=1-q=0$）时，非负求和式 $\sum_{i,j}p_i p_j(1-|G_{ij}|^2)=0$ 迫使布居支集 $S=\{i\in\mathrm{Fin}\,d:p_i>0\}$ 上的每一对受占地址 $i,j\in S$ 均满足 $|G_{ij}|=1$。由单位向量上 Cauchy–Schwarz 不等式取等号的充要条件，所有受占记录必共处同一条单位输出射线：存在某个单位环境向量 $v\in\mathbb{C}^e$（$\sum_{b\in\mathrm{Fin}\,e}|v(b)|^2=1$）及单位复相位 $u_i\in\mathbb{C}$（$i\in S$ 时 $|u_i|=1$），使得 $E_i=u_i v$（$i\in S$）。在该输入态 $\rho$ 上，系统仅经历相应的对角相位旋转 $\rho'_{ij}=u_i\overline{u_j}\rho_{ij}$（$S$ 之外仍恒为零），相干模长处处守恒（$L_2=0$）。然而，由于此处并未固定输入参考态，公共输出射线 $v$ **不必等于**初始环境参考基态 $\lvert a\rangle$，输出系统态 $\rho'$ 也**不必等于**输入态 $\rho$。例如对单比特初态 $\rho=\lvert +\rangle\langle +\rvert$ 取反向共线记录 $E_0=v$、$E_1=-v$，则输出环境边缘态 $\sigma_{\mathrm{E}}=\lvert v\rangle\langle v\rvert$ 纯度为 $1$（$L_2=\Delta=0$），但系统边缘态被翻转为正交的西极纯态 $\rho'=\lvert -\rangle\langle -\rvert$，按后文 [@def-trace-distance] 计算的半迹范数距离高达 $D(\rho,\rho')=\frac{1}{2}\|\rho-\rho'\|_1=1$：

$$
\begin{aligned}
q=1\;\;(\Delta=0)\quad&\Longrightarrow\quad E_i=u_i v,\quad |u_i|=1\quad (i\in S),\qquad \rho'_{ij}=u_i\overline{u_j}\rho_{ij}\quad (i,j\in S),\\
E_0=v,\;E_1=-v,\;\rho=\lvert +\rangle\langle +\rvert\quad&\Longrightarrow\quad \rho'=\lvert -\rangle\langle -\rvert,\quad L_2=\Delta=0,\quad D(\rho,\rho')=1.
\end{aligned}
$$

不仅如此，与 [@rem-pure-record-support-compatibility] 中跨跃迁两端保持**同一个**参考纯态 $p=\lvert a\rangle\langle a\rvert$ 因而导出固定 $U$ 下不变受占子空间与后续全部步数保纯的结论截然不同：单步输出环境若仅仅落入**另一条**纯射线 $\lvert v\rangle\ne\lvert a\rangle$，对于同一个固定联合幺正算子 $U$ 的后续演化**并不提供任何未来保纯或相干保持保证**。具体而言，在三维环境标准正交基 $\{\lvert 0\rangle,\lvert 1\rangle,\lvert 2\rangle\}$（$e=3$）与单控制比特（$d=2$）上，取受控幺正算子 $U=\lvert 0\rangle\langle 0\rvert\otimes V_0+\lvert 1\rangle\langle 1\rvert\otimes V_1$，其中 $V_0$ 交换 $\lvert 0\rangle\leftrightarrow\lvert 1\rangle$ 并固定 $\lvert 2\rangle$，而 $V_1$ 作三元循环置换 $\lvert 0\rangle\mapsto\lvert 1\rangle\mapsto\lvert 2\rangle\mapsto\lvert 0\rangle$。从环境初态 $\lvert 0\rangle$ 与系统赤道纯态 $\rho_0=\lvert +\rangle\langle +\rvert$ 出发：第一次接触后，两条条件记录同为 $V_0\lvert 0\rangle=V_1\lvert 0\rangle=\lvert 1\rangle$，联合态为 $\tau_1=\lvert +\rangle\langle +\rvert\otimes\lvert 1\rangle\langle 1\rvert$，首步输出环境纯度 $q_1=1$ 且系统完整保留全部相干 $\rho_1=\lvert +\rangle\langle +\rvert$；但保留该环境再作用一次同一个 $U$ 时，两条分支上的环境从 $\lvert 1\rangle$ 分别演化为正交的 $V_0\lvert 1\rangle=\lvert 0\rangle$ 与 $V_1\lvert 1\rangle=\lvert 2\rangle$，第二步系统边缘态 $\rho_2=\frac{1}{2}I_2$ 的横向相干被彻底抹去：

$$
\begin{aligned}
V_0\lvert 0\rangle&=\lvert 1\rangle,\quad V_0\lvert 1\rangle=\lvert 0\rangle,\quad V_0\lvert 2\rangle=\lvert 2\rangle,\qquad
V_1\lvert 0\rangle=\lvert 1\rangle,\quad V_1\lvert 1\rangle=\lvert 2\rangle,\quad V_1\lvert 2\rangle=\lvert 0\rangle,\\
\tau_1&=\lvert +\rangle\langle +\rvert\otimes\lvert 1\rangle\langle 1\rvert\quad (q_1=1,\;\rho_1=\lvert +\rangle\langle +\rvert),\qquad
\rho_2=\frac{1}{2}I_2,\quad \sigma_{\mathrm{E},2}=\frac{1}{2}\bigl(\lvert 0\rangle\langle 0\rvert+\lvert 2\rangle\langle 2\rvert\bigr)\quad (q_2=\frac{1}{2}).
\end{aligned}
$$

综上，当输出环境线性熵 $\Delta=1-q$ 较小时，不等式 $0\le L_2\le 1-q=\Delta$ 精确控制的是**依赖于输入态的相干模平方损失总和**；由于 $\Delta=\sum_{i,j}p_i p_j(1-|G_{ij}|^2)$ 按输入布居权重 $p_i p_j$ 加权，当某些布居数可以任意微小时，微小的 $\Delta$ 并不能一致控制每一对下标上的相对相干损失因子 $1-|G_{ij}|^2$，也不能控制态间迹距离 $D(\rho,\rho')$。这一单步比较同样不提供多步重置信道等同性、保留环境轨迹的单调性、关于时间一致成立的误差界或指数衰减律，也不主张任何数学原创性或实验验证。
:::

**衰减到零，还算可逆吗？** [@prop-phase-damping-decay] 里的相干元每一步乘以 $c$，$N$ 步后只剩 $c^N\rho_{01}$，最终归零。4.1 节说过，单步退相干可以看成一次可逆耦合之后丢掉环境（[@thm-stinespring-dilation]、[@thm-reduced-access-defect]）。可“每一步都能这样看”与“所有步数合起来仍是同一个可逆演化的影子”是两回事：前者允许每一步各换一个扩张，后者要求一个酉算子 $U$ 一次管住全部的 $T^n$。下面的定理说，后者对任何压缩算子都成立。

::: {.theorem #thm-unitary-power-dilation title="Sz.-Nagy 酉幂扩张：压缩算子的每一次幂都是同一个酉算子的影子" lean="D5/S3/HilbertOperators/UnitaryPowerDilation.exists_unitary_power_dilation"}
设 $E$ 为复希尔伯特空间（完备的复内积空间），$T : E \to E$ 为有界线性算子，且 $\lVert T\rVert \le 1$。则存在复希尔伯特空间 $H$、有界线性算子 $V : E \to H$ 与 $H$ 上的酉算子 $U$，使得：

1. $V$ 保内积：对一切 $x, y \in E$，$\langle Vx, Vy\rangle = \langle x, y\rangle$；
2. 对一切 $n \in \mathbb{N}$ 与 $x \in E$，$V^{\dagger}\,U^n\,V x = T^n x$。
:::

::: proof
Lean 的证明分两步，第二步正是“碰撞模型”。

（1）一步：Halmos 扩张。在 $E \oplus E$ 上取自伴分块算子 $a = \begin{pmatrix} 0 & T \\ T^{\dagger} & 0 \end{pmatrix}$，其范数不超过 $\lVert T\rVert \le 1$；用连续函数演算构造 $\sqrt{I - a^2}$，则 $a + i\sqrt{I - a^2}$ 是酉算子，再乘以交换两个分量的置换，得到酉算子 $J$。由于 $a^2$ 是分块对角的，$\sqrt{I - a^2}$ 也是分块对角的，所以从 $(x, 0)$ 出发，$J$ 输出的第一分量恰是 $Tx$。

（2）全部步数：碰撞模型。取 $H = \ell^2(\mathbb{Z};\, E \oplus E)$，每个整数格点上有一份系统、一份环境。$U$ 先在每个格点上同时做一次 $J$，再让所有环境分量向右移一格；两个酉算子之积仍是酉算子。$V$ 把 $x$ 放进第 0 格的系统分量，$V^{\dagger}$ 读回第 0 格的系统分量。对 $n$ 归纳：$n$ 步之后，第 0 格的系统分量是 $T^n x$，第 0 格的环境分量为零，负号格点全为零。原因是第 0 格的系统每一步都迎来从左边移来的空白环境，用过的环境向右离开，再也不回来。完整证明由 Lean 内核检查。
:::

**为什么总扩张空间 $H$ 必须无穷维。** 当存在衰减向量时，证明里把总扩张空间 $H$ 构造成无穷维并非偷懒（以下是正文的手工应用推导，未在本书形式化；已冻结的存在性定理 [@thm-unitary-power-dilation] 本身不直接陈述该推论）：固定完备复希尔伯特空间 $E, H$、有界线性算子 $T : E \to E$ 与 $V : E \to H$ 以及 $H$ 上的固定酉算子 $U$，假设对某个非零向量 $x \in E$（$x \neq 0$）有 $\lVert T^n x\rVert \to 0$，且同一个 $(U, V)$ 对一切自然数幂 $n \in \mathbb{N}$ 精确满足全幂次压缩 $V^{\dagger} U^n V x = T^n x$（其中 $n = 0$ 已给出 $V^{\dagger} V x = T^0 x = x$，故这项矛盾推导甚至无需单独假定 $V$ 全局保内积或 $\lVert T\rVert \le 1$）。若**总扩张空间 $H$ 是有限维的**，则 $H$ 上的有界算子空间有限维，其酉群既闭且有界，因而紧致。由紧群中的幂序列回返性质（或直接从 $U^n$ 中抽取收敛子列 $U^{n_k} \to W$ 并使严格递增的下标间隔 $m_k = n_{k+1} - n_k \to \infty$，从而 $U^{m_k} = U^{n_{k+1}}(U^{n_k})^{-1} \to W W^{-1} = I$），存在严格递增的任意晚幂次子列 $m_k \to \infty$ 使 $U^{m_k} \to I$。对连续的压缩观测函数 $W \mapsto \lVert V^{\dagger} W V x\rVert$ 取极限，沿该子列有

$$
\lVert T^{m_k} x\rVert = \lVert V^{\dagger} U^{m_k} V x\rVert \;\longrightarrow\; \lVert V^{\dagger} I V x\rVert = \lVert x\rVert > 0,
$$

这与全序列衰减 $\lVert T^n x\rVert \to 0$ 矛盾！因此，只要 $T$ 拥有非零衰减向量 $\lVert T^n x\rVert \to 0$，对所有自然数幂的精确共同酉压缩就要求**总扩张空间 $H$ 必为无穷维**。注意这里紧致性所用的前提是**整个总扩张空间 $H$ 有限维**，而非单独的“环境有限维”：当系统空间 $E$ 本身可能无穷维时，有限维环境并不会使总空间 $H$ 成为有限维，故单凭环境维数有限不能推出上述阻碍；只有在系统 $E$ 本身有限维（如下例 $E = \mathbb{C}$）时，总空间 $H$ 无穷维才迫使辅助环境无穷维。同时，这一紧群回返论证不给出定量的回返时间上界，不声称一般的精确周期性，也不排除有限步（$n \le N$）的精确扩张或有限步近似。

::: {.example #ex-halmos-one-step-recurrence title="一步扩张只管一步：c = 0.8 时，漏出去的振幅会回来"}
取最简单的压缩：$E = \mathbb{C}$、$T = c = 0.8$，它就是 [@prop-phase-damping-decay] 里相干元每步所乘的那个因子。记 $s = \sqrt{1 - c^2} = 0.6$，证明第（1）步的 Halmos 构造给出

$$
J = \begin{pmatrix} c & i s \\ i s & c \end{pmatrix} = \begin{pmatrix} 0.8 & 0.6\,i \\ 0.6\,i & 0.8 \end{pmatrix}.
$$

第一步它确实把振幅 $1$ 送成 $0.8$，漏进环境的是 $0.6\,i$。若反复使用同一个 $J$、同一份环境，那么 $J = \cos\varphi\, I + i\sin\varphi\,\sigma_x$（$\varphi = \arccos 0.8 = 36.87^\circ$）只是绕 $x$ 轴的转动，$(J^n)_{00} = \cos n\varphi$。下表第四列是对碰撞模型的数值模拟（第 0 格每一步迎来新环境），数值四舍五入到所示位数：

| $n$ | $c^n$（应得） | $(J^n)_{00}$（同一份环境反复用） | 碰撞模型第 0 格 | 漏出的概率 $1 - c^{2n}$ |
| ---: | ---: | ---: | ---: | ---: |
| $1$ | $0.8000$ | $0.8000$ | $0.8000$ | $0.3600$ |
| $2$ | $0.6400$ | $0.2800$ | $0.6400$ | $0.5904$ |
| $3$ | $0.5120$ | $-0.3520$ | $0.5120$ | $0.7379$ |
| $4$ | $0.4096$ | $-0.8432$ | $0.4096$ | $0.8322$ |
| $5$ | $0.3277$ | $-0.9971$ | $0.3277$ | $0.8926$ |
| $6$ | $0.2621$ | $-0.7522$ | $0.2621$ | $0.9313$ |

从第二步起，单份环境就把漏出去的振幅送了回来；到 $n = 39$，$(J^{39})_{00} = 0.99934$，几乎完全复原，而 $c^{39} = 0.00017$。碰撞模型的第 0 格逐行恰是 $c^n$，与证明里的归纳结论一致。漏出的概率 $1 - c^{2n}$ 并没有消失，它散在第 $1, 2, \dots, n$ 格上，总范数始终是 $1$。
:::

::: {.figure src="ch04-fresh-environment"}
**同一份环境会把振幅送回来，新环境才一去不返。** 青色的点列是碰撞模型第 $0$ 格的 $c^n$（$c = 0.8$），每一步迎来一份新环境，一路衰减到零（[@thm-unitary-power-dilation]）；灰色的点列是同一份环境反复使用时的 $(J^n)_{00} = \cos n\varphi$，在 $-1$ 与 $1$ 之间来回摆，到 $n = 39$ 回到 $0.999$（圈出的那一点）。两列数值来自 [@ex-halmos-one-step-recurrence] 的手算；“有限维总扩张空间必回返”是正文的手工应用推导，未在本书形式化。
:::

> 漏出去的振幅不回来，不是因为它消失了，而是因为迎面来的环境永远是新的。

::: {.remark #rem-arbitrary-density-prefix title="任意初始环境密度的精确前缀界（手工应用推导）"}
**手工应用推导，未在本书形式化。** 全时间回返并不排除有限窗口；但若两个纯态始终不动、它们之间的相干严格按等比数列衰减，窗口长度也会受到固定环境维数的限制。以下沿用[源理论卷 §§9–10，Theorem 10.1 的证明](https://github.com/the-omega-institute/trureturing/blob/3476ce98dd3c4326181683b37fc2ddad3e33a743/docs/develop/theory/RECURSIVE_RELATIONAL_OBSERVATION_MINIMAL_RECORD_DILATIONS.md#L980-L1058)。源定理针对平衡十维信道：它在固定坐标变换中找到正交态 $h_+,h_-$，验证两个纯投影不变、相干乘子为 $\lambda=1-4p$ 且 $|\lambda|<1$，再作分支历史与有限 Prony 消去。这里以 $a,b$ 对应 $h_+,h_-$，将同一段证明用于满足相同二态条件的模型；下述通用二态表述是应用整理，源定理本身仍是该十维信道的结论。相关研究入口为 [trureturing #31041](https://github.com/the-omega-institute/trureturing/issues/31041)。

固定整数 $m\ge2,d\ge1$、自然数 $N$、实数 $-1<\lambda<1$，以及 $\mathbb C^m$ 中的正交单位向量 $a,b$。令 $E=\mathbb C^d$，环境初态 $\sigma\in M_d(\mathbb C)$ 半正定且 $\Tr\sigma=1$，允许任意秩及任意基下的相干。一个固定酉算子 $W$ 作用于 $\mathbb C^m\otimes E$，实际约化映射为

$$
\Psi_n(X)=\Tr_E\bigl(W^n(X\otimes\sigma)W^{*n}\bigr).
$$

初始环境与系统输入独立；$W,E,\sigma,a,b,\lambda$ 在整个窗口内保持固定，没有重置、中间干预、外部时钟控制或环境更换。记 $P_a=\lvert a\rangle\langle a\rvert$、$P_b=\lvert b\rangle\langle b\rvert$ 及 $O=\lvert a\rangle\langle b\rvert$。若对每个 $0\le n\le N$ 都有

$$
\begin{aligned}
\Psi_n(P_a)&=P_a,\qquad \Psi_n(P_b)=P_b,\\
\langle a,\Psi_n(O)b\rangle&=\lambda^n,
\end{aligned}
$$

则 $N+1\le d^2$：包括第零项在内，不能匹配超过 $d^2$ 个这样的精确等比相干样本。$O$ 本身不是密度矩阵；这里的映射由上述公式定义在所有系统矩阵上。若已知整个信道在密度矩阵上相等，线性性也确定其对 $O$ 的作用。

**从纯输出读出实际分支。** $N=0$ 时，结论就是 $1\le d^2$；以下取 $N\ge1$。在 $\sigma$ 的正支集 $S=\operatorname{supp}\sigma$ 上作谱分解

$$
\sigma=\sum_{j=1}^r s_j\lvert e_j\rangle\langle e_j\rvert,
\qquad s_j>0,\quad \sum_j s_j=1,
$$

其中 $r=\dim S$，$e_j$ 为 $S$ 的正交单位基。纯输出 $\Psi_n(P_a)=P_a$ 意味着离开 $a$ 方向的总概率为零：

$$
\begin{aligned}
0&=\Tr\bigl((I-P_a)\Psi_n(P_a)\bigr)\\
&=\sum_j s_j\bigl\|((I-P_a)\otimes I_E)W^n(a\otimes e_j)\bigr\|^2.
\end{aligned}
$$

每项非负且 $s_j>0$，故每项都为零。由线性性，对所有 $e\in S$ 有

$$
\begin{aligned}
W^n(a\otimes e)&=a\otimes T_{a,n}e,\\
W^n(b\otimes e)&=b\otimes T_{b,n}e
\qquad(0\le n\le N).
\end{aligned}
$$

酉性保证每个 $T_{a,n},T_{b,n}:S\to E$ 保内积，且 $T_{a,0},T_{b,0}$ 都是支集的包含映射。这里对角化的是任意给定的 $\sigma$，没有假设它在某个指定基下对角，也没有用纯化扩大环境维数。

**同一个演化保证历史相容。** 置

$$
F_a=\operatorname{span}\{T_{a,n}S:0\le n<N\}.
$$

对每个生成向量，实际的 $W$ 满足

$$
W(a\otimes T_{a,n}e)=a\otimes T_{a,n+1}e.
$$

因此 $W$ 将 $a\otimes F_a$ 映入 $a\otimes E$，定义单一线性等距映射 $L_a:F_a\to E$，使 $L_aT_{a,n}e=T_{a,n+1}e$。若若干历史向量的线性组合为零，对它施加实际的线性算子 $W$ 后仍为零，所以上述赋值尊重所有线性关系，并非另行假设各时刻独立选出的历史相容。由于 $F_a$ 与 $L_a(F_a)$ 等维，它们在 $E$ 中的正交补也等维；在两补空间之间选一个保内积双射，就将 $L_a$ 延拓为 $E$ 上的酉算子 $A$。对 $b$ 分支同样得到酉算子 $B$。归纳给出

$$
A^ne=T_{a,n}e,\qquad B^ne=T_{b,n}e
\quad(e\in S,\ 0\le n\le N).
$$

这两个辅助算子只重现受占支集上的窗口历史，并未给出 $W$ 在整个联合空间上的受控分解。

**相干成为有限个圆周频率的叠加。** 定义辅助序列 $f_n=\Tr(A^n\sigma B^{-n})$（$n\ge0$）。在窗口内，对实际非对角输入作偏迹得到

$$
\begin{aligned}
\langle a,\Psi_n(O)b\rangle
&=\sum_j s_j\langle B^ne_j,A^ne_j\rangle\\
&=\Tr(A^n\sigma B^{-n})=f_n=\lambda^n.
\end{aligned}
$$

窗口之外不要求该辅助序列与实际 $W$ 的读数相同。将 $A=\sum_i u_iP_i$、$B=\sum_j v_jQ_j$ 作谱分解，$|u_i|=|v_j|=1$，便有

$$
\begin{aligned}
f_n&=\sum_{i,j}c_{ij}(u_i\overline{v_j})^n,\\
c_{ij}&=\Tr(P_i\sigma Q_j).
\end{aligned}
$$

这些权重可以是复数，不能当成非负概率；任意密度下也不能直接套用最大混合态的正 Gram 矩阵与正交增量论证。合并相同频率并删除合并后权重为零的项，得到 $f_n=\sum_{\ell=1}^K\alpha_\ell\omega_\ell^n$，其中 $|\omega_\ell|=1$。每个酉算子至多有 $d$ 个不同特征值，且 $f_0=\Tr\sigma=1$ 保证至少留下一项，故 $1\le K\le d^2$。

有限 Prony 消去式只需多项式

$$
q(z)=\prod_{\ell=1}^K(z-\omega_\ell)=\sum_{j=0}^K q_jz^j.
$$

逐项代入即得 $\sum_{j=0}^Kq_jf_j=\sum_\ell\alpha_\ell q(\omega_\ell)=0$，不需要权重为正。若 $N\ge K$，窗口内的等比值便给出 $q(\lambda)=0$；但 $q$ 的根全在单位圆上，而 $|\lambda|<1$，矛盾。因此 $N<K\le d^2$，也就是 $N+1\le d^2$。零与负的 $\lambda$ 均包含在内：第零幂始终为 $1$；在 $\lambda=0$ 时，$q(0)=(-1)^K\prod_\ell\omega_\ell\ne0$。端点 $\lambda=\pm1$ 不满足严格收缩条件，这个矛盾在那里不成立。

对单比特去相位取 $m=2,a=e_0,b=e_1$，对角纯态保持不动、副对角元乘以 $\lambda^n$，恰好满足以上条件。因此 $d=2$ 时 $N\le3$，任意初始环境密度都不能支持一直到第四步的精确共同前缀。这只是所述自主模型的必要界；四步窗口的三能级可达性另见 [@rem-four-step-qutrit]。该必要界本身不提供一般窗口的精确最小环境维数、一般可达性、近似误差界或任意谱矩数据的物理实现，也不把该条件结论当作普遍物理定律。未受干预的边缘信道恒等式同样不确定保留环境的完整联合态历史或带中间干预的过程张量。上述通用应用的形式化状态仍未核定，不能因其组成结果已有验证而将它称为 Lean 已验证。
:::

::: {.remark #rem-four-step-qutrit title="一个三能级环境的四步共同实现（书面推导）"}

**普通书面推导，未在本书形式化。** 前面的必要界排除了四步窗口中的二级环境，却没有给出三级环境。这里把环境拆成一条静止的线与一个旋转的二维平面：静止线贡献常数，两套条件旋转在平面上的迹重叠贡献两个余弦。恰当选择它们的角度与权重，就能让同一个六阶酉矩阵的前四个非平凡幂产生所需的等比相干。这里的“平面”是复二维子空间，迹重叠是代数机制，不另引入一个随时间更新的随机环境。

**对象与量词。** 固定任意实数 $-1<\lambda<1$，系统为 $S=\mathbb C^2$，环境为 $E=\mathbb C^3$。对任意复矩阵 $X=(x_{ij})\in M_2(\mathbb C)$，定义

$$
\mathcal D_\lambda(X)=
\begin{pmatrix}x_{00}&\lambda x_{01}\\\lambda x_{10}&x_{11}\end{pmatrix},
\qquad \mathcal D_\lambda^0=\operatorname{id}.
$$

该映射也可写成 $\frac{1+\lambda}{2}X+\frac{1-\lambda}{2}Z_SXZ_S$，其中 $Z_S=\operatorname{diag}(1,-1)$，故零与负的 $\lambda$ 也给出信道。目标是先为这个 $\lambda$ 选定一组 $W,\sigma$，然后同时覆盖所有输入和 $n=0,1,2,3,4$；不是为每个输入或每个时刻另选实现。第零幂约定为 $1$，包括 $\lambda=0$。

**显式参数。** 以下参数只依赖 $\lambda$：

$$
\begin{aligned}
D&=\sqrt{\lambda^2+2\lambda+5},&
p&=\frac{1+\lambda}{5-3\lambda},\\
k&=\frac{2\lambda}{D},&r&=\sqrt{1-k^2},\\
x_+&=\frac{\lambda-1+D}{4},&x_-&=\frac{\lambda-1-D}{4},\\
\theta_+&=\arccos x_+,&\theta_-&=\arccos x_-,\\
\alpha&=\frac{\theta_++\theta_-}{2},&
\beta&=\frac{\theta_--\theta_+}{2}.
\end{aligned}
$$

所有分母与根号都有明确的定义域。因为 $D^2=(\lambda+1)^2+4>0$、$5-3\lambda>2$，有

$$
\begin{aligned}
0<p<1,\qquad 1-p&=\frac{4(1-\lambda)}{5-3\lambda}>0,\\
1-k^2&=\frac{(\lambda+1)(5-3\lambda)}{D^2}>0.
\end{aligned}
$$

所以 $-1<k<1$、$r>0$。两个节点是 $q(x)=x^2-\frac{\lambda-1}{2}x-\frac{\lambda+1}{4}$ 的根。由 $q(-1)=(\lambda+1)/4>0$、$q(0)=-(\lambda+1)/4<0$、$q(1)=(5-3\lambda)/4>0$，得到 $-1<x_-<0<x_+<1$。于是两个反余弦都取在 $(0,\pi)$，并且 $\alpha-\beta=\theta_+$、$\alpha+\beta=\theta_-$。

**固定的矩阵。** 在环境的二维块上用 $Z,X_P$ 表示 Pauli 矩阵，避免与任意系统输入 $X$ 混淆：

$$
Z=\begin{pmatrix}1&0\\0&-1\end{pmatrix},\qquad
X_P=\begin{pmatrix}0&1\\1&0\end{pmatrix},\qquad
H=kZ+rX_P.
$$

在 $E=\mathbb C\oplus\mathbb C^2$ 上取

$$
\begin{aligned}
A&=1\oplus A_2,\qquad A_2=\cos\alpha\,I_2+\mathrm i\sin\alpha\,Z,\\
B&=1\oplus B_2,\qquad B_2=\cos\beta\,I_2+\mathrm i\sin\beta\,H,\\
A&=\begin{pmatrix}
1&0&0\\0&e^{\mathrm i\alpha}&0\\0&0&e^{-\mathrm i\alpha}
\end{pmatrix},\\
B&=\begin{pmatrix}
1&0&0\\
0&\cos\beta+\mathrm i k\sin\beta&\mathrm i r\sin\beta\\
0&\mathrm i r\sin\beta&\cos\beta-\mathrm i k\sin\beta
\end{pmatrix},\\
\sigma&=\operatorname{diag}\left(p,\frac{1-p}{2},\frac{1-p}{2}\right).
\end{aligned}
$$

令 $P_0=\lvert0\rangle\langle0\rvert$、$P_1=\lvert1\rangle\langle1\rvert$ 为系统投影，并定义唯一使用的联合酉矩阵

$$
W=P_0\otimes A+P_1\otimes B
=\begin{pmatrix}A&0_3\\0_3&B\end{pmatrix}
\quad\text{on }\mathbb C^2\otimes\mathbb C^3.
$$

这里 $W$ 是 $6\times6$ 矩阵。$Z^*=Z$、$X_P^*=X_P$、$Z^2=X_P^2=I_2$、$ZX_P+X_PZ=0$ 给出 $H^*=H$、$H^2=(k^2+r^2)I_2=I_2$。任意自伴对合 $K$ 都满足 $(\cos t\,I+\mathrm i\sin t\,K)(\cos t\,I-\mathrm i\sin t\,K)=I$，故 $A,B,W$ 均酉。$\sigma$ 的三个对角元严格为正且总和为 $1$，所以它是满秩密度矩阵，并与 $A,B$ 交换。满秩是本见证的选择，不是对所有可能实现的假设；受控形式也是这里的构造，不用于限制前述必要界中的任意 $W$。

**共同幂怎样产生两个余弦。** 对自伴对合的乘法用角度加法公式归纳，得

$$
\begin{aligned}
A_2^n&=\cos(n\alpha)I_2+\mathrm i\sin(n\alpha)Z,\\
B_2^{-n}&=\cos(n\beta)I_2-\mathrm i\sin(n\beta)H
\qquad(n\ge0).
\end{aligned}
$$

利用 $\Tr Z=\Tr H=0$、$\Tr(ZH)=2k$，实际相干乘子为

$$
\begin{aligned}
f_n&=\Tr(A^n\sigma B^{-n})=p+(1-p)g_n,\\
g_n&=\tfrac12\Tr(A_2^nB_2^{-n})\\
&=\cos(n\alpha)\cos(n\beta)+k\sin(n\alpha)\sin(n\beta)\\
&=w\cos(n\theta_+)+(1-w)\cos(n\theta_-),\\
w&=\frac{1+k}{2}=\frac12+\frac{\lambda}{D}\in(0,1).
\end{aligned}
$$

这一步保留了 $A^nB^{-n}$ 的次序，不把它偷换成 $(AB^{-1})^n$，也不要求 $A,B$ 交换。令 $T_n$ 为第一类 Chebyshev 多项式，即 $T_n(\cos\theta)=\cos(n\theta)$。于是 $g_n=wT_n(x_+)+(1-w)T_n(x_-)$。

**前四步的精确矩。** 记 $M_j=wx_+^j+(1-w)x_-^j$。节点的二次方程立即给出

$$
\begin{aligned}
M_0&=1,\qquad M_1=\frac{3\lambda-1}{4},\\
M_{j+2}&=\frac{\lambda-1}{2}M_{j+1}
+\frac{\lambda+1}{4}M_j\qquad(j\ge0).
\end{aligned}
$$

将递推代入 $T_0=1$、$T_1=x$、$T_2=2x^2-1$、$T_3=4x^3-3x$、$T_4=8x^4-8x^2+1$，逐项得到

$$
\begin{aligned}
g_0&=1,\\
g_1&=\frac{3\lambda-1}{4},\\
g_2&=\frac{3\lambda^2-2\lambda-1}{4},\\
g_3&=\frac{3\lambda^3-2\lambda^2-2\lambda-1}{4},\\
g_4&=\frac{3\lambda^4-2\lambda^3-2\lambda^2-2\lambda-1}{4}.
\end{aligned}
$$

其中对 $1\le n\le4$，统一写法为 $4g_n=3\lambda^n-2\sum_{j=1}^{n-1}\lambda^j-1$；空和为零。用 $(1-\lambda)\sum_{j=1}^{n-1}\lambda^j=\lambda-\lambda^n$，无需除以 $\lambda$，便得到

$$
\begin{aligned}
f_0&=p+(1-p)=1,\\
f_n&=\frac{1+\lambda+4(1-\lambda)g_n}{5-3\lambda}
=\lambda^n\qquad(1\le n\le4).
\end{aligned}
$$

例如 $\lambda=0$ 时，$p=1/5$、$k=0$、$r=1$、$x_\pm=(-1\pm\sqrt5)/4$，上述式子直接给出 $(f_0,f_1,f_2,f_3,f_4)=(1,0,0,0,0)$。负的 $\lambda$ 同样使用这些矩阵与恒等式，不另分支修改动力学。

**从标量回到整个信道。** 设 $E_{ij}=\lvert i\rangle\langle j\rvert$。由系统投影的正交性，$W^n=P_0\otimes A^n+P_1\otimes B^n$。两个对角矩阵单位的环境迹均为 $1$，两个非对角矩阵单位分别得到 $f_n$ 与 $\overline{f_n}$。因此对每个 $X\in M_2(\mathbb C)$，

$$
\begin{aligned}
\Psi_n(X)&:=\Tr_E\bigl(W^n(X\otimes\sigma)W^{-n}\bigr)\\
&=\begin{pmatrix}x_{00}&f_nx_{01}\\\overline{f_n}x_{10}&x_{11}\end{pmatrix}\\
&=\mathcal D_\lambda^n(X)=\mathcal D_{\lambda^n}(X)
\qquad(0\le n\le4).
\end{aligned}
$$

任取正整数 $s$ 与有限维未触碰参考 $R=\mathbb C^s$，将任意系统—参考矩阵写成 $Y=\sum_{a,b}X_{ab}\otimes F_{ab}$，其中 $F_{ab}$ 是参考矩阵单位。在 $Y\otimes\sigma$ 所用的 $S\otimes R\otimes E$ 次序上，显式定义标准酉置换与实际演化：

$$
\begin{aligned}
J&:S\otimes R\otimes E\longrightarrow S\otimes E\otimes R,\\
J(u\otimes v\otimes z)&=u\otimes z\otimes v,\\
\widehat{W}&=J^{-1}(W\otimes I_R)J,\\
\widehat{W}^{\,n}&=J^{-1}(W^n\otimes I_R)J.
\end{aligned}
$$

置换只固定张量记号；$\widehat{W}$ 在参考上取恒等，并始终使用同一个 $W$。对每个 $X_{ab}$ 使用上一式，得到

$$
\begin{aligned}
&\Tr_E\bigl[\widehat{W}^{\,n}(Y\otimes\sigma)
\widehat{W}^{-n}\bigr]\\
&\qquad=(\mathcal D_\lambda^n\otimes\operatorname{id}_R)(Y)
\qquad(0\le n\le4).
\end{aligned}
$$

这包括所有可能纠缠的系统—参考密度矩阵；初始环境必须与系统—参考独立。环境只制备一次，同一个 $W,E,\sigma$ 覆盖所有时刻，中间没有干预、重置、环境更换或外部时钟控制，也不假设后续联合态重新因子化。

**已知标量方法与实现的边界。** 节点 $1,x_+,x_-$ 及权重 $p,(1-p)w,(1-p)(1-w)$ 与 Poisson–Chebyshev 矩的三节点 Gauss–Radau 端点求积相联系：这三个节点匹配所有次数不超过四的多项式矩。这是已知的标量矩方法；这里的证据是上面的直接公式与 $1+2$ 块实现，而不是引用一条未经核对的求积定理。任意标量求积节点和权重未必都能由固定维数的共同酉幂实现。有关已知方法可参看 [Radau 求积的说明](https://mathworld.wolfram.com/RadauQuadrature.html)；本构造不承担全球数学新颖性声明。

结合 [@rem-arbitrary-density-prefix] 中仍未形式化的任意密度必要界，$N=4$ 时 $5\le d^2$ 排除 $d\le2$，本构造达到 $d=3$。因此，在这里精确定义的自主单比特去相位模型中，对每个 $-1<\lambda<1$，允许选择任意初始环境密度的四步最小环境维数在普通书面推导层面为 $3$；这不是 Lean 最小性结论。完整信道及参考恒等式尚未形式化；现有 Lean 检查只覆盖部分参数、矩阵与迹恒等式，不能替代完整结论。构造来源与部分形式证据见 [trureturing #31054 的结果说明](https://github.com/the-omega-institute/trureturing/issues/31054#issuecomment-6903256672)。

继续同一递推到 $T_5=16x^5-20x^3+5x$，得到

$$
\begin{aligned}
g_5&=\frac{3\lambda^5-2\lambda^4-2\lambda^3-5\lambda^2+4}{4},\\
f_5-\lambda^5&=1-\lambda^2>0.
\end{aligned}
$$

所以这组矩阵不能继续实现第五步；这并不排除另一组三能级矩阵。一般窗口的精确最小维数、一般相容迹矩的实现以及完整近似资源—误差权衡仍未解决；下一个注记保存的是小泄漏下的加权历史接口。本构造不延伸到源理论卷的平衡十维信道，不给出保留环境的完整联合历史或插入干预的过程张量恒等式，也不提供实验支持或模型普适性结论。

:::

::: {.remark #rem-weighted-history-stability title="小泄漏下的固定酉加权历史界（书面推导）"}

**普通书面推导，未在本书形式化。** 把联合演化看成在两条系统分支之间转动：压回原分支的部分会缩短，漏出的部分仍留在实际联合历史中，之后可能返回。极分解把这次压缩拆成“正的缩短”与“酉的转动”；即使压缩有零方向，也能在原环境空间内补齐那次转动。下面用同一固定转动逐步跟随真实历史，误差按步数相加。这里保存的是[已有完整普通论证](https://github.com/the-omega-institute/trureturing/issues/31078#issuecomment-6904102516)，不是新的形式化结论。

**对象、范数与完整量词。** 任取整数 $d,N\ge1$、作用于 $\mathbb C^2\otimes\mathbb C^d$ 的酉矩阵 $W\in M_{2d}(\mathbb C)$，以及任意半正定单位迹矩阵 $\sigma\in M_d(\mathbb C)$。星号表示共轭转置。对任意矩形复矩阵 $M$，希尔伯特—施密特范数与算子范数分别约定为

$$
\begin{aligned}
\|M\|_{\mathrm{HS}}^2&=\Tr(M^*M)=\sum_{i,j}|M_{ij}|^2,\\
\|M\|_{\mathrm{op}}&=\sup_{\|v\|_2\le1}\|Mv\|_2.
\end{aligned}
$$

后者衡量对向量的最大放大倍数；下文说一个分块是收缩时，指算子范数至多为一，不是该分块的希尔伯特—施密特范数至多为一。令 $e_0,e_1$ 为系统标准基，定义

$$
\begin{aligned}
S&=\sqrt{\sigma}\in M_d(\mathbb C),\qquad S^*=S,\quad S^2=\sigma,\\
J_b&:\mathbb C^d\longrightarrow\mathbb C^2\otimes\mathbb C^d,
\qquad J_bv=e_b\otimes v,\\
P_b&=J_bJ_b^*,\qquad Q_b=I_{2d}-P_b
\qquad(b\in\{0,1\}),\\
L_N&=\max_{\substack{b\in\{0,1\}\\0\le k\le N}}
\|Q_bW^kJ_bS\|_{\mathrm{HS}}^2,\qquad
\epsilon=\sqrt{L_N}.
\end{aligned}
$$

这里的 $k$ 为整数；$P_b,Q_b\in M_{2d}(\mathbb C)$ 是正交投影，$J_b^*J_b=I_d$，且 $\|S\|_{\mathrm{HS}}^2=\Tr\sigma=1$。$L_N$ 使用同一个 $W,\sigma$ 在两个分支上从第零步到第 $N$ 步的**实际加权历史**，不是单步泄漏、各时刻另选实现，或某个无权算子范数。对每组上述数据，存在原 $\mathbb C^d$ 上的酉矩阵 $A_0,A_1$，选定后对所有整数 $0\le n\le N$ 同时满足

$$
\max_{\substack{b\in\{0,1\}\\0\le n\le N}}
\|W^nJ_bS-J_bA_b^nS\|_{\mathrm{HS}}
\le4N\sqrt{L_N}.
$$

常数 $4$ 与 $d,N,W,\sigma$ 无关；这里不声称它最优。以下给出完整推导。

**压缩与一次极补全。** 固定任一分支 $b\in\{0,1\}$，简写 $J=J_b,P=P_b,Q=Q_b$，并在原有空间上定义

$$
\begin{aligned}
K&=J^*WJ\in M_d(\mathbb C),&
R&=QWJ\in M_{2d\times d}(\mathbb C),\\
B&=J^*WQ\in M_{d\times2d}(\mathbb C),&
E&=QWQ\in M_{2d}(\mathbb C).
\end{aligned}
$$

$J$ 为等距嵌入，$Q$ 为正交投影，$W$ 酉，所以 $K,R,B,E$ 的算子范数均不超过一。尤其 $B,E$ 左乘任意列数相容的矩阵时，希尔伯特—施密特范数不会增大：这是逐列应用向量收缩后求平方和。直接分块计算给出

$$
\begin{aligned}
K^*K+R^*R
&=J^*W^*(P+Q)WJ\\
&=J^*W^*WJ=I_d.
\end{aligned}
$$

有限维方阵的极分解可在奇异情形下补全为

$$
K=AH,\qquad A^*A=AA^*=I_d,\qquad
H=(K^*K)^{1/2},\qquad 0\le H\le I_d.
$$

这里 $A,H\in M_d(\mathbb C)$；$H$ 的每个特征值 $h$ 非负，且 $h^2\le1$，所以 $h\in[0,1]$。$A$ 仅从固定的 $K$ 选取一次。静态极分解的文献依据是 Higham，*Computing the Polar Decomposition—with Applications*，DOI [10.1137/0907079](https://doi.org/10.1137/0907079)，[全文](https://eprints.maths.manchester.ac.uk/694/1/high86p.pdf)，Theorem 1.1 与 Lemma 2.1；它们供应方阵酉补全及正平方根的识别，不供应下面的加权历史界。

**任意矩形权重上的极误差。** 在 $H$ 的酉特征基中，$2H(I_d-H)$ 的特征值为 $2h(1-h)\ge0$，故

$$
D:=(I_d-H^2)-(I_d-H)^2=2H(I_d-H)\ge0.
$$

对每个自然数 $r$ 和每个矩形矩阵 $X\in M_{d\times r}(\mathbb C)$，合同变换给出 $X^*DX\ge0$，其迹非负（等于各列 $x_j$ 的非负二次型 $\sum_j x_j^*Dx_j$）。因此，不要求 $X$ 与 $H$ 交换，便有

$$
\begin{aligned}
\|(K-A)X\|_{\mathrm{HS}}^2
&=\Tr\bigl(X^*(I_d-H)^2X\bigr)\\
&\le\Tr\bigl(X^*(I_d-H^2)X\bigr)\\
&=\Tr(X^*R^*RX)=\|RX\|_{\mathrm{HS}}^2.
\end{aligned}
$$

第一式用了 $K-A=A(H-I_d)$ 与 $A^*A=I_d$，末式用了 $I_d-H^2=R^*R$。这里取迹的半正定矩阵均给出实数。特别地，对 $T_k=J^*W^kJ\in M_d(\mathbb C)$ 代入实际权重 $X=T_kS$，由 $S^2=\sigma$ 与迹循环性，

$$
\begin{aligned}
\|(K-A)T_kS\|_{\mathrm{HS}}^2
&=\Tr\bigl(\sigma T_k^*(I_d-H)^2T_k\bigr)\\
&\le\Tr\bigl(\sigma T_k^*(I_d-H^2)T_k\bigr)\\
&=\|RT_kS\|_{\mathrm{HS}}^2.
\end{aligned}
$$

这是先作半正定合同变换再取迹的比较；只循环移动迹内因子，没有交换 $\sigma,T_k,H$，也没有除以 $\sigma$ 的特征值。

**实际轨迹的递推。** 对所有整数 $0\le k\le N$ 定义

$$
\begin{aligned}
x_k&=J^*W^kJS=T_kS\in M_d(\mathbb C),\\
y_k&=QW^kJS\in M_{2d\times d}(\mathbb C),\\
W^kJS&=Jx_k+y_k,\qquad Qy_k=y_k,\\
x_0&=S,\qquad y_0=0,\qquad
\|y_k\|_{\mathrm{HS}}\le\epsilon.
\end{aligned}
$$

对该分解施加同一个 $W$，再分别投影，对所有整数 $0\le k<N$ 得到

$$
\begin{aligned}
x_{k+1}&=Kx_k+By_k,\\
y_{k+1}&=Rx_k+Ey_k,\\
\|Rx_k\|_{\mathrm{HS}}
&=\|y_{k+1}-Ey_k\|_{\mathrm{HS}}\\
&\le\|y_{k+1}\|_{\mathrm{HS}}+\|y_k\|_{\mathrm{HS}}
\le2\epsilon.
\end{aligned}
$$

令 $r_k=x_{k+1}-Ax_k\in M_d(\mathbb C)$。把前面的矩形比较用于实际的 $X=x_k$，再利用 $B$ 的收缩性，便有

$$
\begin{aligned}
r_k&=(K-A)x_k+By_k,\\
\|r_k\|_{\mathrm{HS}}
&\le\|(K-A)x_k\|_{\mathrm{HS}}+\|By_k\|_{\mathrm{HS}}\\
&\le\|Rx_k\|_{\mathrm{HS}}+\|y_k\|_{\mathrm{HS}}
\le3\epsilon.
\end{aligned}
$$

**固定酉矩阵的加法望远镜。** 固定整数 $1\le n\le N$，令 $f(k)=A^{n-k}x_k$（$0\le k\le n$）。对 $k<n$，

$$
\begin{aligned}
f(k+1)-f(k)&=A^{n-1-k}(x_{k+1}-Ax_k)
=A^{n-1-k}r_k,\\
x_n-A^nS&=f(n)-f(0)
=\sum_{k=0}^{n-1}A^{n-1-k}r_k,\\
\|x_n-A^nS\|_{\mathrm{HS}}
&\le\sum_{k=0}^{n-1}\|r_k\|_{\mathrm{HS}}
\le3n\epsilon.
\end{aligned}
$$

这里只把矩阵的连续差在加法群中相加，并用酉左乘保持希尔伯特—施密特范数。最后由 $J$ 的等距性与三角不等式，

$$
\begin{aligned}
\|W^nJS-JA^nS\|_{\mathrm{HS}}
&=\|J(x_n-A^nS)+y_n\|_{\mathrm{HS}}\\
&\le3n\epsilon+\epsilon=(3n+1)\epsilon\\
&\le4N\epsilon\qquad(1\le n\le N).
\end{aligned}
$$

最后一步用了 $3n+1\le3N+1\le4N$；$n=0$ 时误差直接为零。对两个分支独立选取各自的极补全 $A_0,A_1$，并共用 $\epsilon=\sqrt{L_N}$，即得到所述最大值界。

**适用范围与尚存边界。** $L_N=0$ 时全部误差精确为零；论证没有除以 $\epsilon$。秩亏的 $\sigma$ 以及正特征值任意接近零的 $\sigma$ 都包含在内：只使用 $S=\sqrt\sigma$，不使用逆、满秩或谱隙。环境始终为原 $\mathbb C^d$，没有纯化、增维、重置、干预或随时间变化的 $A_b$，也不假设后续联合态因子化。压缩 $K$ 无需正规；不把 $T_k$ 认作 $K^k$，漏出后返回的部分由实际 $y_k$ 保留。

已有来源中的静态极补全与半正定迹正性是可复用供应，不在这里重新计作新数学。完整结果的 Lean 形式化证明尚未经验证；上述普通推导不构成 Lean 验证。这个历史接口也没有给出相对于目标去相位信道的 diamond 范数或任意有限未触碰参考的一致定量比较，没有给出实际可实现共同幂频率历史的定量下界与上构造。一般窗口的完整资源—误差权衡仍开放；这里不选择或证明后继事件，不作全球新颖性或物理普适性声明。

:::

::: {.remark #rem-maxmixed-saturation-obstruction title="最大混合初态下的饱和矩容量障碍（普通推导）"}

**普通书面推导，未在本书形式化。** 前面的维数必要界允许样本数恰好达到矩阵空间的维数，却不保证这个边界可达。直观的障碍是容量：接近一的一阶矩要求几乎全部概率挤进单位圆上一段很短的弧；饱和的矩条件却使这段弧至多容纳两个节点，而最大混合初态又限制每个节点能承载的概率。下面从[原始结果及其边界](https://github.com/the-omega-institute/trureturing/issues/31099#issuecomment-6904917000)完整展开这个有限维论证。

**对象与要排除的饱和条件。** 固定整数 $d\ge2$、实数 $0<r<1$，令 $m=d^2$。任取两套作用于同一个 $\mathbb C^d$ 的酉矩阵 $A,B\in U(d)$，不要求它们交换。定义共同幂的归一化迹序列，并暂设它匹配到饱和窗口：

$$
f_n=\frac1d\operatorname{Tr}(A^nB^{-n})=r^n
\qquad(0\le n\le m-1).
$$

这里及下文的步数均为整数。目标是给出该条件的必要不等式，并据此排除一个明确参数；不是判定全部窗口的最优维数。

**谱权重与支集不能先行混淆。** 分别作酉谱分解，允许重复特征值：

$$
\begin{aligned}
A&=V\operatorname{diag}(a_0,\ldots,a_{d-1})V^*,\\
B&=W\operatorname{diag}(b_0,\ldots,b_{d-1})W^*,\qquad U=V^*W,\\
z_{ij}&=a_i\overline{b_j},\qquad |z_{ij}|=1,\\
w_{ij}&=\frac{|U_{ij}|^2}{d},\qquad
0\le w_{ij}\le\frac1d,\qquad
\sum_{i,j=0}^{d-1}w_{ij}=1,\\
\mu&=\sum_{i,j=0}^{d-1}w_{ij}\delta_{z_{ij}},\qquad
f_n=\int z^n\,\mathrm d\mu(z).
\end{aligned}
$$

星号表示共轭转置，$\delta_z$ 是节点 $z$ 上的单位点质量。迹的展开给出最后一式；酉矩阵每行的模平方和为一，给出权重总和与单项上界。因此 $\mu$ 是至多有 $m$ 个支集点的正概率测度。但此时若若干比值重合，合并后的单点质量可能超过 $1/d$；必须先证明这些比值确实互异，才能使用节点容量。由于权重实且非负，负次矩由共轭确定：

$$
\int z^q\,\mathrm d\mu(z)=r^{|q|}
\qquad(-(m-1)\le q\le m-1).
$$

**饱和迫使全部节点出现且互异。** 在多项式上使用测度诱导的半正定配对 $\langle p,q\rangle_\mu=\int\overline{p(z)}q(z)\,\mathrm d\mu(z)$。单项式的 Gram 矩阵为

$$
T_{jk}=\langle z^j,z^k\rangle_\mu=r^{|j-k|}
\qquad(0\le j,k\le m-1).
$$

把基改成常数 $1$ 与 $g_k(z)=z^k-rz^{k-1}$（$1\le k\le m-1$）。这是首项系数均为一的三角换基。直接用已知矩计算，

$$
\begin{aligned}
\langle1,g_k\rangle_\mu&=r^k-r\,r^{k-1}=0,\\
\langle g_j,g_k\rangle_\mu
&=r^{k-j}-r\,r^{k-j-1}-r\,r^{k-j+1}
+r^2r^{k-j}=0\quad(1\le j<k\le m-1),\\
\|1\|_\mu^2&=1,\qquad
\|g_k\|_\mu^2=1-2r^2+r^2=1-r^2>0.
\end{aligned}
$$

所以 $T$ 正定且秩为 $m$。若合并并删去零质量后只有 $K$ 个支集点，Gram 矩阵经这些点上的取值映射分解，秩至多为 $K$。故 $m\le K\le m$。原来总共只有 $m$ 个索引对，因而每个 $w_{ij}>0$，所有 $z_{ij}$ 两两不同。此后每个节点的实际质量就是原来的 $w_{ij}\le1/d$。重复特征值或零重叠权重并非隐藏的例外：它们会减少支集，已被满秩条件排除。

**节点多项式只需已有阶数的矩。** 将这 $m$ 个节点记为 $\zeta_1,\ldots,\zeta_m$，定义首一消去多项式及线性泛函：

$$
\begin{aligned}
P(z)&=\prod_{\ell=1}^{m}(z-\zeta_\ell),\\
L_k(F)&=\int z^{-k}F(z)\,\mathrm d\mu(z)
\qquad(1\le k\le m-1,\ \deg F\le m).
\end{aligned}
$$

因为 $P$ 在支集上为零，所有 $L_k(P)=0$。这些泛函在 $\operatorname{span}(z,\ldots,z^{m-1})$ 上的矩阵，是 $T$ 对应的正定主子矩阵，故联合秩为 $m-1$。次数至多 $m$ 的多项式空间维数为 $m+1$，所以公共核恰为二维。以下两个线性无关多项式都在核中：

$$
\begin{aligned}
Q(z)&=z^m-rz^{m-1},\qquad R(z)=1-rz,\\
L_k(Q)&=r^{m-k}-r\,r^{m-1-k}=0,\\
L_k(R)&=r^k-r\,r^{k-1}=0
\qquad(1\le k\le m-1).
\end{aligned}
$$

它们因次数不同而线性无关。比较首项系数，得到 $P=Q+cR$；由于全部根的模为一，常数项满足 $|c|=|P(0)|=\prod_{\ell=1}^m|\zeta_\ell|=1$。于是每个节点都满足

$$
z^{m-1}\frac{z-r}{1-rz}=\tau,\qquad
\tau=-c,\qquad |\tau|=1.
$$

分母不会为零，因为 $|rz|=r<1$。尤其，虽然 $Q$ 的次数为 $m$，在 $L_k(Q)$ 中最高的矩阶数只有 $m-1$；这里没有偷用第 $m$ 阶或更高矩。

**短闭弧至多容纳两个节点。** 取

$$
\theta=\frac{\pi}{2(m-1)},\qquad
\mathcal A_\theta=\{e^{\mathrm it}: -\theta\le t\le\theta\}.
$$

在这段弧上可选择如下连续辐角；半角公式直接验证其指数等于对应的分式：

$$
\begin{aligned}
\beta(t)&=2\arctan\left(\frac{1+r}{1-r}\tan\frac t2\right),\\
e^{\mathrm i\beta(t)}&=\frac{e^{\mathrm it}-r}{1-re^{\mathrm it}},\\
\beta'(t)&=\frac{1-r^2}{1-2r\cos t+r^2}>0
\qquad(-\theta\le t\le\theta).
\end{aligned}
$$

由于 $d\ge2$，整段弧严格位于 $-\pi<t<\pi$，所用正切连续。实反正切的取值严格介于 $-\pi/2$ 与 $\pi/2$，故 $\beta(\theta)-\beta(-\theta)<2\pi$。令 $h(t)=(m-1)t+\beta(t)$，则

$$
\begin{aligned}
h'(t)&=m-1+\beta'(t)>0,\\
h(\theta)-h(-\theta)
&=2(m-1)\theta+\beta(\theta)-\beta(-\theta)<3\pi.
\end{aligned}
$$

固定任意一个 $\tau$ 的辐角 $\alpha$，节点方程就是 $h(t)=\alpha+2\pi k$，其中 $k\in\mathbb Z$。严格递增性使不同节点对应不同整数。若有三个节点，最左与最右的相位至少相差 $4\pi$，与刚才的变化量上界矛盾。这也包含弧的两个端点。因此

$$
\mu(\mathcal A_\theta)\le\frac2d,\qquad
\mu(\mathbb T\setminus\mathcal A_\theta)\ge1-\frac2d,
\qquad \mathbb T=\{z\in\mathbb C:|z|=1\}.
$$

**容量必要不等式与精确反例。** 在弧外，$1-\operatorname{Re}z\ge1-\cos\theta$；在整圆上这个被积函数非负。一阶矩给出

$$
\begin{aligned}
1-r&=\int(1-\operatorname{Re}z)\,\mathrm d\mu(z)\\
&\ge\left(1-\frac2d\right)(1-\cos\theta)\\
&=\left(1-\frac2d\right)
\left(1-\cos\frac{\pi}{2(d^2-1)}\right).
\end{aligned}
$$

这对每个 $d\ge3$ 都是最大混合饱和实现的非平凡必要条件。取 $d=3$、$r=999/1000$，此时 $m=9$、$\theta=\pi/16$。正弦在 $[0,\pi/2]$ 上的凹性意味着它不低于连接两个端点的弦，即 $\sin x\ge2x/\pi$。所以

$$
\begin{aligned}
\sin\frac{\pi}{32}&\ge\frac1{16},\\
1-\cos\frac{\pi}{16}
&=2\sin^2\frac{\pi}{32}\ge\frac1{128},\\
1-r&\ge\frac13\cdot\frac1{128}=\frac1{384},\\
1-r&=\frac1{1000}<\frac1{384}.
\end{aligned}
$$

矛盾。也可以把同一计算直接读成装不下的质量：

$$
\begin{aligned}
\mu(\mathcal A_{\pi/16})
&\ge1-\frac{1-r}{1-\cos(\pi/16)}
\ge1-\frac{128}{1000}=\frac{109}{125},\\
\frac{109}{125}-\frac23&=\frac{77}{375}>0.
\end{aligned}
$$

因此不存在一对 $A,B\in U(3)$ 同时满足 $f_n=r^n$（$0\le n\le8$）。这是对所有酉矩阵对的排除，包含非交换情形；不是某种设参形式或数值优化失败。它甚至未使用谱比值网格及酉矩阵模平方权重所带来的全部相容性限制。

**零参数、负参数与二级环境。** 将 $A$ 换成 $-A$ 会使 $f_n$ 变成 $(-1)^nf_n$，因而同维参数 $r=-999/1000$ 也不可能。零参数则有完全不同的边界：对每个正整数 $d$ 都能实现饱和窗口。令

$$
\begin{aligned}
m&=d^2,\qquad \omega=e^{2\pi\mathrm i/m},\\
a_i&=\omega^i,\qquad b_j=\omega^{-dj},\\
F_{ij}&=\frac1{\sqrt d}e^{2\pi\mathrm i\,ij/d}
\qquad(0\le i,j<d),\\
A&=\operatorname{diag}(a_0,\ldots,a_{d-1}),\qquad
B=F\operatorname{diag}(b_0,\ldots,b_{d-1})F^*.
\end{aligned}
$$

有限等比求和给出 Fourier 矩阵 $F$ 的列正交，故它酉。相对本征基的模平方都为 $1/d$，于是每个权重为 $1/d^2=1/m$。比值 $a_i\overline{b_j}=\omega^{i+dj}$ 恰遍历全部 $m$ 次单位根；对 $d=1$ 也成立，只是窗口没有正步数。因此

$$
f_0=1,\qquad
f_n=\frac1m\sum_{q=0}^{m-1}\omega^{qn}=0
\qquad(1\le n\le m-1).
$$

零参数的第零幂约定为一。对 $d=2$，容量不等式右端因 $1-2/d=0$ 而退为平凡界，与已有的最大混合二级环境三步构造相容；这里不重复其证明。

**从迹矩到实际信道，以及反向归约。** 为避免与上面的本征基矩阵混淆，把联合酉记为 $\mathcal W$。设系统为 $\mathbb C^2$，环境初态固定为 $\sigma=I_d/d$ 且初始独立于输入。对受控联合酉及系统矩阵单位定义

$$
\begin{aligned}
E_{ab}&=|a\rangle\langle b|\quad(a,b\in\{0,1\}),\\
\mathcal W&=E_{00}\otimes A+E_{11}\otimes B,\\
\Psi_n(X)&=\operatorname{Tr}_E\bigl(\mathcal W^n(X\otimes I_d/d)\mathcal W^{*n}\bigr),\\
\Psi_n(E_{00})&=E_{00},\qquad \Psi_n(E_{11})=E_{11},\\
\Psi_n(E_{01})&=f_nE_{01},\qquad
\Psi_n(E_{10})=\overline{f_n}E_{10}.
\end{aligned}
$$

两个对角系数均为单位迹一；非对角式直接来自环境偏迹。矩阵单位构成所有系统矩阵的线性基，所以这些式子确定整个映射。对任意有限未触碰参考 $R$，将任意系统—参考矩阵写成 $Y=\sum_{a,b=0}^1E_{ab}\otimes Y_{ab}$；每个参考块 $Y_{ab}$ 保持原样，系统块逐项乘以上述系数。这包含系统与参考初始纠缠的情形，但环境仍须与整个输入独立。采用标准张量换序后，实际共同演化在系统—环境上作用，在参考上为恒等。

反过来，这个最大混合排除不只是预设受控形式的限制。把任意联合酉写成系统的二乘二环境分块 $\mathcal W=(C_{ab})_{a,b=0}^1$。若一步映射精确保持两个基态投影，错误布居为

$$
\begin{aligned}
0&=\langle1,\Psi_1(E_{00})1\rangle
=\frac1d\operatorname{Tr}(C_{10}C_{10}^*)
=\frac1d\|C_{10}\|_{\mathrm{HS}}^2,\\
0&=\langle0,\Psi_1(E_{11})0\rangle
=\frac1d\operatorname{Tr}(C_{01}C_{01}^*)
=\frac1d\|C_{01}\|_{\mathrm{HS}}^2.
\end{aligned}
$$

希尔伯特—施密特范数平方是各矩阵元模平方之和，因此 $C_{10}=C_{01}=0$。再由联合酉性得 $C_{00},C_{11}$ 都酉，故它们就是某一对 $A,B$。最大混合态的满秩性使零泄漏约束作用于整个环境空间。因此，若同一个三维最大混合环境的实际信道要在 $0\le n\le8$ 对所有输入实现参数 $r=999/1000$ 的去相位幂，上面的反例已在 $E_{01}$ 上排除了它；增加未触碰参考不会恢复可行性。

**适用边界。** 全过程只用同一个联合酉和一次初始制备，没有环境重置、替换、增维、时变控制或中间干预，也没有假设后续系统—环境态重新因子化。一般初始密度 $\sigma$ 的谱展开系数为 $\operatorname{Tr}(P_i\sigma Q_j)$，其中 $P_i,Q_j$ 分别为两套酉的谱投影；这些系数可能为复数，不具有这里的正概率解释或单节点容量。因此本注记没有反驳允许任意初始密度时的维数可达性主张。所给不等式只是必要条件，未证明充分性或最优性；它不完成一般窗口的可行性分类，不提供近似误差下界，也不确定完整联合态历史或中间干预的规律。

圆周正交多项式提供相邻的经典框架，可参见 Barry Simon，[arXiv:math/0405111](https://arxiv.org/abs/math/0405111) §1 的递推与 §2.1(c) 的 Bernstein–Szegő 情形；这些段落不作为本注记完整受限实现障碍的来源定理。所需节点、相位与容量证明均已在这里给出，不作全球新颖性或物理普适性声明。完整结论尚无本书可引用的完整 Lean 证明；普通推导不构成内核验证。

:::

除了“只收腰、不掉高”的相位阻尼外，实验室里还有另一类截然不同的能量耗散过程——**振幅阻尼信道**（amplitude damping，对应自发辐射能量弛豫时间 $T_1$）：处于激发态（南极 $-1$）的量子比特会向低温环境吐出一颗能量光子而跌回基态（北极 $+1$）。因此，在几何上，整颗布洛赫球不仅在往里收缩，而且球心还在往北极 $u = +1$ 方向**整体上漂**：轴向坐标按仿射律 [`dampedAxis`](lean:D5/S3/QuantumChannels/AmplitudeDampingContraction.dampedAxis) $u \mapsto u' = (1 - \gamma)u + \gamma$（阻尼率 $0 \le \gamma < 1$）向 $+1$ 聚拢！

::: {.viz src="bloch-noise" preset="amp" height="500"}
**缩小并往北漂。** 振幅阻尼每一步取 $\gamma = 0.3$：青色的球一边缩小一边往北极上漂，横向缩得比纵向慢；紫色的北极 $\lvert 0\rangle$ 不动，从南极出发的琥珀色 $\rho$ 一路爬向北极。
:::

有趣的是，在量子信息几何（Petz 单调黎曼度规族）中，当我们用对称对数导数度规（SLD，径向权重函数 $\varphi_{\mathrm{SLD}}(u) = 1$）与右对数导数度规（RLD，径向权重函数 $\varphi_{\mathrm{RLD}}(u) = \frac{1}{1 - u^2}$）分别衡量振幅阻尼下的横向相干收缩比 [`coherenceRatio`](lean:D5/S3/QuantumChannels/AmplitudeDampingContraction.coherenceRatio) $\mathcal{R}_\varphi(\gamma, u) = (1 - \gamma)\frac{\varphi(u')}{\varphi(u)}$ 时，两把几何标尺在纯态北极边界 $u \to 1^-$ 处呈现出截然不同的端点极限行为！

::: {.proposition #prop-amplitude-damping-contraction title="振幅阻尼轴向漂移下 SLD 与 RLD 相干收缩比的端点定理" lean="D5/S3/QuantumChannels/AmplitudeDampingContraction.amplitude_damping_sld_rld_endpoints"}
设阻尼参数满足 $0 \le \gamma < 1$，记轴向阻尼映射为 $u'(\gamma, u) = (1 - \gamma)u + \gamma$，对径向轮廓函数 $\varphi : \mathbb{R} \to \mathbb{R}$ 记相干收缩比为 $\mathcal{R}_\varphi(\gamma, u) = (1 - \gamma)\varphi(u'(\gamma, u)) / \varphi(u)$。取 $\varphi_{\mathrm{SLD}}(u) = 1$ 与 $\varphi_{\mathrm{RLD}}(u) = \frac{1}{1 - u^2}$，则同时成立：

1. **SLD 常值均匀收缩**：对一切 $u \in \mathbb{R}$，$\mathcal{R}_{\varphi_{\mathrm{SLD}}}(\gamma, u) = 1 - \gamma$；
2. **RLD 单调上界与纯态边界极限**：对一切混合态内部坐标 $u \in (-1, 1)$ 均有 $\mathcal{R}_{\varphi_{\mathrm{RLD}}}(\gamma, u) \le 1$，且当 $u$ 从球体内部趋近于纯态极点边界 $1^-$ 时，

   $$
   \lim_{u \to 1^-} \mathcal{R}_{\varphi_{\mathrm{RLD}}}(\gamma, u) = 1.
   $$

:::

::: proof
对结论 1，因 $\varphi_{\mathrm{SLD}}$ 恒为 $1$，直接约分即得 $\mathcal{R}_{\varphi_{\mathrm{SLD}}}(\gamma, u) = 1 - \gamma$。对结论 2（Lean 中封装为纯态边界端点谓词 [`HasPureBoundaryEndpoint`](lean:D5/S3/QuantumChannels/AmplitudeDampingContraction.HasPureBoundaryEndpoint)，即同时满足开区间 $u \in (-1, 1)$ 上的逐点上界 $\le 1$ 与左邻域滤子极限 $u \to 1^-$ 收敛于 $1$），当 $u \in (-1, 1)$ 且 $0 \le \gamma < 1$ 时，计算 $1 - u' = 1 - ((1 - \gamma)u + \gamma) = (1 - \gamma)(1 - u)$；代入 $\varphi_{\mathrm{RLD}}(v) = \frac{1}{(1 - v)(1 + v)}$，因子 $(1 - \gamma)$ 与 $(1 - u)$ 上下精确约消，将收缩比化简为极其透明的分式：

$$
\mathcal{R}_{\varphi_{\mathrm{RLD}}}(\gamma, u) = (1 - \gamma)\cdot\frac{1 - u^2}{1 - u'^2} = (1 - \gamma)\cdot\frac{(1 - u)(1 + u)}{(1 - \gamma)(1 - u)(1 + u')} = \frac{1 + u}{1 + (1 - \gamma)u + \gamma}.
$$

因 $u < 1$ 且 $\gamma \ge 0$，分母减去分子等于 $\gamma(1 - u) \ge 0$，且分子分母皆正，故对一切 $u \in (-1, 1)$ 恒有 $\mathcal{R}_{\varphi_{\mathrm{RLD}}}(\gamma, u) \le 1$；再令 $u \to 1^-$，分子与分母连续趋于同一正数 $2$，故左极限精确等于 $\frac{2}{2} = 1$。完整证明由 Lean 内核检查。
:::

现在，我们可以把量子计算工程里最核心的四种噪声信道排成一张一目了然的**布洛赫球几何形变速查表**——从此看到任何噪声信道，脑海里浮现的不再是一堆枯燥的 $E_k$ 符号，而是直观的三维橡皮球挤压动画：

| 量子噪声信道（严格收缩参数域） | 布洛赫向量仿射变换 $\vv{r} = (r_x, r_y, r_z) \mapsto \vv{r}'$ | 三维球体几何形变图像 | 严格收缩域下的不动点集 |
| :--- | :---: | :--- | :--- |
| **相位阻尼 / 去相干**（$0 \le c < 1$） | $(c\,r_x,\; c\,r_y,\; r_z)$ | 绕竖直 $Z$ 轴向内水平收腰（压成竖直橄榄球） | 竖直 $Z$ 轴线段 $(0, 0, r_z)$ |
| **比特翻转噪声**（$0 < p < 1$） | $\bigl(r_x,\; (1-2p)r_y,\; (1-2p)r_z\bigr)$ | 绕水平 $X$ 轴向内径向收腰（$p > \frac{1}{2}$ 时伴随横向反号翻转） | 水平 $X$ 轴线段 $(r_x, 0, 0)$ |
| **退极化噪声**（$0 < \lambda \le 1$） | $\bigl((1-\lambda)r_x,\; (1-\lambda)r_y,\; (1-\lambda)r_z\bigr)$ | 各向同性均匀向球心同心缩小 | 仅球心唯一死点 $\vv{r} = \vv{0}$ |
| **振幅阻尼 / 能量弛豫**（$0 < \gamma < 1$） | $\bigl(\sqrt{1-\gamma}\,r_x,\; \sqrt{1-\gamma}\,r_y,\; (1-\gamma)r_z + \gamma\bigr)$ | 椭球收缩的同时，整体向北极基态 $+\vv{e}_3$ 上漂 | 仅北极基态单点 $+\vv{e}_3 = (0, 0, 1)$ |

（注：在**零噪声恒等端点** $c = 1$、$p = 0$、$\lambda = 0$ 或 $\gamma = 0$ 处，上述信道均退化为恒等映射 $\vv{r}' = \vv{r}$，不动点集扩展为**整颗布洛赫球**。在 $p = 1$ 端点，比特翻转映射给出绕 $X$ 轴的幺正 $\pi$ 旋转 $\rho \mapsto X\rho X$、$\vv{r}' = (r_x, -r_y, -r_z)$，保持两态间距离；在 $\gamma = 1$ 端点，振幅阻尼则一步将整颗布洛赫球重置到纯态北极 $+\vv{e}_3 = (0, 0, 1)$，任意两态的输出距离均为零。）

::: {.figure src="ch04-noise-gallery"}
**四种噪声，四种变形。** 四幅都是布洛赫球的竖直截面，强度都取一半（$c = \frac{1}{2}$、$p = \frac{1}{4}$、$\lambda = \frac{1}{2}$、$\gamma = \frac{1}{2}$），按上表的仿射公式画出：细线是原来的球皮，青色是作用一次后的像，紫色是不动的部分。相位阻尼收成竖直的窄椭圆，竖轴不动；比特翻转压成扁平的横椭圆，$x$ 轴不动；去极化缩成半径一半的同心圆，只有球心不动；振幅阻尼缩小并整体上移，顶端贴着北极，只有北极不动。表中的仿射形式是文献结果，未在本书形式化。
:::

顺着最后一行追问：固定朝向基态北极的轴向漂移之后，**横向最多能保留多少长度，椭球才不会刺穿球皮？** 下文以 $\lambda$ 表示两个横向坐标共有的实数保留因子，考察

$$
F_{a,\lambda}(x,y,z) = (\lambda x,\,\lambda y,\,az+1-a), \qquad 0 \le a \le 1.
$$

北极 $(0,0,1)$ 始终不动。与前文的参数对应是 $a=1-\gamma$：展开已有的轴向坐标，恰有 $\operatorname{dampedAxis}(1-a,z)=az+1-a$。把它解释为弛豫时，我们限定在**零温、朝固定北极的仿射轴向漂移与各向同性横向因子**这一模型内。

::: {.theorem #thm-north-pole-ball-criterion title="固定北极的仿射映射保持整个闭单位球的充要条件" lean="D5/S3/QuantumChannels/ContractionGeometry/NorthPoleBallCriterion.north_pole_ball_preserving_iff"}
设 $a,\lambda \in \mathbb{R}$ 且 $0 \le a \le 1$，$\lambda$ 可取任意符号。以下两条等价：

1. 对任意实数 $x,y,z$，只要 $x^2+y^2+z^2 \le 1$，就有

   $$
   (\lambda x)^2+(\lambda y)^2+(az+1-a)^2 \le 1.
   $$

2. $\lambda^2 \le a$。
:::

::: proof
充分性先把横向平方半径压到轴向因子之下：由 $\lambda^2 \le a$ 及输入点在球内，

$$
\begin{aligned}
&\lambda^2(x^2+y^2)+(az+1-a)^2 \\
&\quad\le a(1-z^2)+(az+1-a)^2 \\
&\quad=1-a(1-a)(1-z)^2 \le 1.
\end{aligned}
$$

必要性给出一个具体的逃逸点。若 $\lambda^2>a$，取

$$
\begin{gathered}
\delta=\frac{\lambda^2-a}{\lambda^2+1}, \\
(x,y,z)=\bigl(\sqrt{\delta(2-\delta)},\,0,\,1-\delta\bigr).
\end{gathered}
$$

因 $0\le a$，有 $0<\delta\le1$，故该点为实数点且 $x^2+y^2+z^2=1$。利用 $\delta(\lambda^2+1)=\lambda^2-a$ 及 $\delta(\lambda^2-a^2)\le\delta(\lambda^2+1)$，其像超出球皮的平方半径为

$$
\begin{aligned}
&\norm{F_{a,\lambda}(x,0,z)}^2-1 \\
&\quad=\delta\bigl[2(\lambda^2-a)-\delta(\lambda^2-a^2)\bigr] \\
&\quad\ge\delta(\lambda^2-a)>0.
\end{aligned}
$$

因此，北极球冠的直觉对应着整个闭球上的精确判据，端点 $a=0$ 与 $a=1$ 也包含在内。完整证明由 Lean 内核检查。
:::

[@thm-north-pole-ball-criterion] 给出的是横向上界 $|\lambda|\le\sqrt a$。表中的纯振幅阻尼取 $\lambda=\sqrt a$，即 $\lambda^2=a$，恰好饱和；额外横向衰减则可以使不等式严格成立。特别地，$a=0$ 时必须 $\lambda=0$，$a=1$ 时则允许且只允许 $|\lambda|\le1$。这里判定的是球的保持性；完全正性还涉及扩展系统上的条件，不能只凭这个实坐标判据认定。

::: {.figure src="ch04-ball-criterion"}
**横向能留多少，由轴向因子说了算。** 绿色的区域是 [@thm-north-pole-ball-criterion] 的充要条件 $\lambda^2 \le a$，由两支抛物线 $\lambda = \pm\sqrt{a}$ 围成，上边界正是纯振幅阻尼 $\lambda = \sqrt{a}$；它在 $a = 0$ 处收成一点，在 $a = 1$ 处张开到 $|\lambda| \le 1$。区域外品红的点 $(a, \lambda) = (0.15, 0.75)$ 对应的映射把球的一部分推出了球皮。
:::

现在把**同一个映射**中的两个因子取为指数包络。对任意正实数 $T_1,T_2,t$，令

$$
a=e^{-t/T_1}, \qquad \lambda=e^{-t/T_2}.
$$

此时 $0<a<1$。由上述定理，$F_{a,\lambda}$ 将整个闭单位球映入自身，当且仅当

$$
\begin{aligned}
&e^{-2t/T_2}\le e^{-t/T_1} \\
&\quad\Longleftrightarrow -\frac{2t}{T_2}\le-\frac{t}{T_1} \\
&\quad\Longleftrightarrow T_2\le2T_1.
\end{aligned}
$$

第一步用实指数函数的严格单调性，第二步约去正时间并乘以正的时间常数。这是定理在给定指数包络下的直接特例解释。$t=0$ 时，无论正的 $T_1,T_2$ 取何值，两个因子都等于 $1$，映射都是恒等映射；单靠零时刻不约束任何速率。

::: {.viz src="bloch-noise" preset="wide" height="500"}
**横向留太多，就刺穿球皮。** 取 $T_2 = 6T_1$，即 $\lambda = a^{1/6} > \sqrt{a}$：青色的像在北极附近从侧面鼓出玻璃球壳画的单位球，品红的部分已不在球里，品红点标出离球心最远的像点。改回 $T_2 \le 2T_1$，品红随即消失（[@thm-north-pole-ball-criterion]）。
:::

::: {.remark #rem-relaxation-envelope-literature title="指数包络与速率相加的物理条件（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** Krantz 等的 *A quantum engineer's guide to superconducting qubits*（[arXiv:1904.06560v3](https://arxiv.org/abs/1904.06560v3)，式 40–43）在 Bloch–Redfield 描述中引入纵向与横向弛豫速率，并在式 41 相邻文字中明确指出：把横向速率写成各速率之和，预设各个衰减函数为指数型。这为这里的弛豫模型提供物理背景。

若在纯振幅阻尼之外，再**额外假设包络相乘**，并给定非负的纯退相干速率 $k\ge0$，即

$$
e^{-t/T_2}=e^{-t/(2T_1)}e^{-kt},
$$

则在 $T_1,T_2,t>0$ 时取对数并约去 $t$，得到

$$
\frac{1}{T_2}=\frac{1}{2T_1}+k\ge\frac{1}{2T_1}.
$$

当 $k>0$ 时可记 $k=1/T_\varphi$；$k=0$ 对应纯振幅阻尼的饱和情形。包络乘积律是额外的物理假设，几何保持性本身不推出它。这里的 $T_2\le2T_1$ 对应固定北极、零温仿射漂移、各向同性横向收缩及指数包络的上述范围，不外推为任意环境或任意非指数衰减的定律。
:::

三种噪声的形变各不相同，却有一个共同点：它们都不会把球里的两个点拉得更远。这句话有精确的形式。两态之间的**迹距离**是 $T(\rho, \sigma) = \frac{1}{2}\lVert\rho - \sigma\rVert_1$；对单比特，$\rho - \sigma = \frac{1}{2}(\vv{r} - \vv{s})\cdot\vv{\sigma}$ 的两个本征值是 $\pm\frac{1}{2}\lVert\vv{r} - \vv{s}\rVert$，所以

$$
T(\rho, \sigma) \;=\; \frac{1}{2}\,\lVert\vv{r} - \vv{s}\rVert ,
$$

即两根布洛赫矢量之间欧氏距离的一半（这一步是手工计算）。

::: {.definition #def-trace-distance title="有限维密度态之间的迹距离" lean="D5/S3/Quantum/Foundation/FiniteTraceDistance.traceDistance"}
设 $\iota$ 为有限类型（`[Fintype ι]`、`[DecidableEq ι]`）。对两个密度态 $\rho, \sigma$（`DensityState ι`：半正定且迹为 $1$ 的 $\iota \times \iota$ 复矩阵），定义

$$
\operatorname{traceDistance}(\rho, \sigma) \;=\; \frac{1}{2}\,\operatorname{traceNorm}(\rho - \sigma),
$$

其中 `traceNorm` $M$ 是 $\sqrt{M^{\dagger}M}$ 的迹的实部。
:::

::: {.proposition #prop-trace-distance-metric-contraction title="迹距离的界与同一有限指标类型上量子信道下的不增性" lean="D5/S3/Quantum/Foundation/FiniteTraceDistance.traceDistance_nonneg D5/S3/Quantum/Foundation/FiniteTraceDistance.traceDistance_symm D5/S3/Quantum/Foundation/FiniteTraceDistance.traceDistance_triangle D5/S3/Quantum/Foundation/FiniteTraceDistance.traceDistance_le_one D5/S3/Quantum/Foundation/FiniteTraceDistance.traceDistance_contract"}
设 $\iota$ 为有限类型，$\rho, \sigma, \tau$ 为 $\iota$ 上的密度态，沿用 [@def-trace-distance] 的记号并简记 $T = \operatorname{traceDistance}$。则：

1. **非负**：$0 \le T(\rho, \sigma)$；
2. **对称**：$T(\rho, \sigma) = T(\sigma, \rho)$；
3. **三角不等式**：$T(\rho, \tau) \le T(\rho, \sigma) + T(\sigma, \tau)$；
4. **有界**：$T(\rho, \sigma) \le 1$；
5. **信道收缩**：对输入输出均以 $\iota$ 为指标的任意量子信道 $\Phi$（`QuantumChannel ι ι`，即迹保持的完全正映射），

   $$
   T\bigl(\Phi(\rho),\ \Phi(\sigma)\bigr) \;\le\; T(\rho, \sigma).
   $$
:::

::: proof
前四条来自迹范数的非负性、$\operatorname{traceNorm}(-M) = \operatorname{traceNorm}(M)$、迹范数的三角不等式（`traceNorm_add_le`），以及半正定矩阵的迹范数等于它的迹。第 5 条：把厄米矩阵 $\rho - \sigma$ 作若尔当分解 $\rho - \sigma = P - M$，其中 $P, M$ 分别是它的正部与负部，均半正定，且迹范数等于 $\operatorname{Tr} P + \operatorname{Tr} M$（`trace_norm_jordan_mass`）。信道把半正定矩阵送到半正定矩阵并保持迹，故 $\operatorname{traceNorm}\bigl(\Phi(P) - \Phi(M)\bigr) \le \operatorname{Tr}\Phi(P) + \operatorname{Tr}\Phi(M) = \operatorname{Tr} P + \operatorname{Tr} M$。两端除以 $2$ 即得结论。完整证明由 Lean 内核检查。
:::

::: {.example #ex-bloch-distance-contraction title="三种单比特噪声下的距离收缩：数值核对（含文献说明，未在本书形式化）"}
**文献结果，未在本书形式化。** 下述一般退相位、振幅阻尼与去极化三种单比特信道的标准布洛赫球仿射映射形式及单比特欧氏距离换算 $T(\rho, \sigma) = \frac{1}{2}\lVert\vv{r} - \vv{s}\rVert_2$ 属于标准量子信息教材算例，用于具体数值例示上文经内核验证的一般信道迹距离收缩命题 [@prop-trace-distance-metric-contraction]。

取三种信道的布洛赫形式，参数都取 $\frac{1}{2}$：退相位 $(x, y, z) \mapsto \bigl(\frac{x}{2}, \frac{y}{2}, z\bigr)$；振幅阻尼 $(x, y, z) \mapsto \bigl(\frac{x}{\sqrt{2}}, \frac{y}{\sqrt{2}}, \frac{1 + z}{2}\bigr)$；去极化 $\vv{r} \mapsto \frac{1}{2}\vv{r}$。考察两对态：北极与 $+x$（$\vv{r} = (0, 0, 1)$，$\vv{s} = (1, 0, 0)$），以及 $+x$ 与 $-x$。迹距离按 $T = \frac{1}{2}\lVert\vv{r} - \vv{s}\rVert$ 计算：

| 信道 | 北极与 $+x$ | $+x$ 与 $-x$ |
| :---: | :---: | :---: |
| 作用之前 | $0.7071$ | $1.0000$ |
| 退相位 | $0.5590$ | $0.5000$ |
| 振幅阻尼 | $0.4330$ | $0.7071$ |
| 去极化 | $0.3536$ | $0.5000$ |

每一格都不超过第一行，与 [@prop-trace-distance-metric-contraction] 的结论 5 一致。振幅阻尼一行的第一个数另用 Kraus 算子直接作用于密度矩阵再求迹范数复算，同为 $0.4330$。注意振幅阻尼把整个球推向北极，球心并不固定，但任意两点之间的距离照样不增。
:::

所以“混合态是球肚子里截短的线”可以说成一条不依赖具体噪声模型的定理：信道可以平移、压扁、旋转这只球，唯独不能把其中任何两点拉开。可分辨性只会丢，不会凭空长出来。

::: {.viz src="bloch-noise" preset="distance" height="500"}
**两个态只会靠近。** 例中第一对态：北极的 $\rho$ 与 $+x$ 的 $\sigma$，振幅阻尼走一步（$\gamma = \frac{1}{2}$）。$\rho$ 不动，$\sigma$ 被拉向北方；白线标出的距离从虚线的 $0.707$ 缩到 $0.433$（[@prop-trace-distance-metric-contraction]）。
:::
