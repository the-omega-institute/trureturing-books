# 4.2.1 相位阻尼、重复记录与保留环境 {#sec-ch04-s02-s01-phase-and-environment}

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
