# 13.2 贝尔态：球心边缘态与共享关联 {#sec-bell-local-zero}

现在，让我们把放大镜对准 [@thm-local-correlation-sectors] 中登场的贝尔纯态 $\mathrm{bellVector} = \lvert\Phi^+\rangle = \frac{1}{\sqrt{2}}(\lvert 00\rangle + \lvert 11\rangle)$ 及其密度矩阵 $\mathrm{bellDensity} = \lvert\Phi^+\rangle\langle\Phi^+\rvert$。

如果一个经典的观察者坚信“整体不过是局部零件的简单拼装”，那么当他听说双比特系统处于一个百分之百确定、秩为 $1$、满足幂等律 $\rho^2 = \rho$ 的纯态时，他一定会断定：Alice 手里的单比特与 Bob 手里的单比特也必定各自指向某个确定的纯态方向。然而，下面的引理用七条严丝合缝的矩阵合取，在贝尔态上证明了恰恰相反的事实：整体纯粹地交织成贝尔态时，局部看到的箭头彻底缩进了球心！

::: {.lemma #lemma-bell-mixed-marginal title="贝尔纯态具有最大混合局部边缘态" lean="D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal"}
对固定双比特贝尔态向量 $\mathrm{bellVector} = \frac{1}{\sqrt{2}}(\lvert 00\rangle + \lvert 11\rangle)$ 与固定 $4\times 4$ 复密度矩阵 $\mathrm{bellDensity} = \mathrm{vecMulVec}\,\mathrm{bellVector}\,(\mathrm{star}\,\mathrm{bellVector})$，以下七条性质同时成立：

1. **态向量单位归一化**：$\mathrm{star}\,\mathrm{bellVector} \mathbin{\cdot_{\mathrm{v}}} \mathrm{bellVector} = 1$；
2. **全局半正定性**：$\mathrm{bellDensity}.\mathrm{PosSemidef}$；
3. **全局迹一归一化**：$\Tr(\mathrm{bellDensity}) = 1$；
4. **全局秩一纯度**：$\operatorname{rank}(\mathrm{bellDensity}) = 1$；
5. **全局投影幂等性**：$\mathrm{bellDensity} \cdot \mathrm{bellDensity} = \mathrm{bellDensity}$；
6. **对第二因子求偏迹得最大混合态**：

   $$
   \mathrm{traceEnvironment}(\mathrm{bellDensity}) = \Bigl(\frac{1}{2} : \mathbb{C}\Bigr) \cdot (1 : \mathrm{QubitMatrix}) = \frac{1}{2}I_2;
   $$

7. **局部边缘态严格非幂等（失去纯态幂等性）**：

   $$
   \mathrm{traceEnvironment}(\mathrm{bellDensity}) \cdot \mathrm{traceEnvironment}(\mathrm{bellDensity}) \neq \mathrm{traceEnvironment}(\mathrm{bellDensity}).
   $$
:::

::: proof
在四个双比特基指标 $(0,0), (0,1), (1,0), (1,1)$ 上直接展开，$\mathrm{bellVector}$ 在 $(0,0)$ 与 $(1,1)$ 处各取 $1/\sqrt{2}$，其余两处取 $0$，故自内积为 $(1/\sqrt{2})^2 + (1/\sqrt{2})^2 = 1$（性质 1）。由此生成的秩一外积矩阵 $\mathrm{bellDensity}$ 自然半正定、迹等于内积 $1$、秩为 $1$，且满足 $(\lvert\Phi^+\rangle\langle\Phi^+\rvert)^2 = \langle\Phi^+\mid\Phi^+\rangle\lvert\Phi^+\rangle\langle\Phi^+\rvert = \mathrm{bellDensity}$（性质 2 至 5）。对第二个比特指标 $a \in \mathrm{Fin}\,2$ 求和计算偏迹 $\mathrm{traceEnvironment}(\mathrm{bellDensity})_{i,j} = \sum_{a \in \{0,1\}} (\mathrm{bellDensity})_{(i,a),(j,a)}$：当 $i = j = 0$ 时得 $(0,0)$ 对角元 $1/2 + 0 = 1/2$；当 $i = j = 1$ 时得 $(1,1)$ 对角元 $0 + 1/2 = 1/2$；当 $i \neq j$ 时，因 $\mathrm{bellVector}$ 仅在对角对 $(0,0)$ 与 $(1,1)$ 非零，故不存在同一个 $a$ 使 $(i,a)$ 与 $(j,a)$ 同时非零，非对角元恒为 $0$。因此 $\mathrm{traceEnvironment}(\mathrm{bellDensity}) = \frac{1}{2}I_2$（性质 6）。最后计算其平方：$(\frac{1}{2}I_2)(\frac{1}{2}I_2) = \frac{1}{4}I_2 \neq \frac{1}{2}I_2$，证得局部边缘态非幂等（性质 7）。完整证明由 Lean 内核检查。
:::

对照[第三章](ch03-projectors-and-duality.md)“存在即幂等线（$P^2 = P$）”的几何准则，[@lemma-bell-mixed-marginal] 的第 5 条与第 7 条形成了一组极具冲击力的对比（见图 13 面板 II）：

- 在 $4\times 4$ 全局空间里，$\mathrm{bellDensity}^2 = \mathrm{bellDensity}$ 严格成立——双体系统是一根毫不含糊的全局幂等纯态；
- 但在 $2\times 2$ 局部空间里，$(\frac{1}{2}I_2)^2 = \frac{1}{4}I_2 \neq \frac{1}{2}I_2$——Alice 的局部布洛赫向量 $\vv{r} = \vv{0}$ 与 Bob 的局部布洛赫向量 $\vv{s} = \vv{0}$ 双双缩成了长度为零的球心原点！

那份全局纯度究竟藏到了哪里？用泡利基将 $\rho_{\Phi^+} = \mathrm{bellDensity}$ 按四个扇区展开，一切水落石出：

$$
\rho_{\Phi^+} = \frac{1}{4}\bigl(I_2 \otimes I_2 + \sigma_X \otimes \sigma_X - \sigma_Y \otimes \sigma_Y + \sigma_Z \otimes \sigma_Z\bigr).
$$

在局域扇区 $\sigma_i \otimes I_2$ 与 $I_2 \otimes \sigma_j$ 上，系数全都是 $0$（所以偏迹只剩标量项 $\frac{1}{2}I_2$）；而在 $9$ 维关联扇区 $\sigma_i \otimes \sigma_j$ 上，对角线上三格 $(X,X)$、$(Y,Y)$、$(Z,Z)$ 的关联系数分别达到了极值 $+1$、$-1$、$+1$，构成关联张量矩阵 $T_{\Phi^+} = \operatorname{diag}(+1, -1, +1)$！

在运用 [@lemma-bell-mixed-marginal] 时，请务必留意两处精确的符号与逻辑边界：

1. **区分冻结声明中的三重态 $\lvert\Phi^+\rangle$ 与教科书常画的自旋单态 $\lvert\Psi^-\rangle$**：[@lemma-bell-mixed-marginal] 形式化的 `bellVector` 是对称贝尔态 $\lvert\Phi^+\rangle = \frac{1}{\sqrt{2}}(\lvert 00\rangle + \lvert 11\rangle)$，其关联矩阵为 $T_{\Phi^+} = \operatorname{diag}(+1, -1, +1)$（因为 $\sigma_Y \otimes \sigma_Y$ 含有两个虚数单位 $(-i)(-i) = -1$，在 $\lvert 00\rangle \leftrightarrow \lvert 11\rangle$ 翻转下给出负号）；而反对称自旋单态（singlet）由于 $i\sigma_Y\lvert 0\rangle = -\lvert 1\rangle$ 且 $i\sigma_Y\lvert 1\rangle = \lvert 0\rangle$，满足精确态向量恒等式 $\lvert\Psi^-\rangle = \frac{1}{\sqrt{2}}(\lvert 01\rangle - \lvert 10\rangle) = \bigl(I_2 \otimes (-i\sigma_Y)\bigr)\lvert\Phi^+\rangle = (i\sigma_Y \otimes I_2)\lvert\Phi^+\rangle$（若作用 $(I_2 \otimes i\sigma_Y)\lvert\Phi^+\rangle = -\lvert\Psi^-\rangle$ 则相差一个全局相位 $-1$，但对应同一个密度矩阵 $\rho_{\Psi^-}$），其泡利展开式为

   $$
   \rho_{\Psi^-} = \frac{1}{4}\bigl(I_2 \otimes I_2 - \sigma_X \otimes \sigma_X - \sigma_Y \otimes \sigma_Y - \sigma_Z \otimes \sigma_Z\bigr), \qquad T_{\Psi^-} = -I_3 = \operatorname{diag}(-1, -1, -1).
   $$

   单态 $\lvert\Psi^-\rangle$ 在任意相同测量轴 $\vv{n}$ 下呈现全向反相关 $\langle(\vv{n}\cdot\vv{\sigma})\otimes(\vv{n}\cdot\vv{\sigma})\rangle_{\Psi^-} = -1$；而 $\lvert\Phi^+\rangle$ 在 $(Z, X)$ 实平面（$n_y = 0$）内任意相同方向 $\vv{n} = (\sin\alpha, 0, \cos\alpha)$ 下呈现正相关 $\langle(\vv{n}\cdot\vv{\sigma})\otimes(\vv{n}\cdot\vv{\sigma})\rangle_{\Phi^+} = \sin^2\alpha + \cos^2\alpha = +1$，唯独在 $Y$ 轴上反号为 $-1$。两者之间通过 Bob 端的局域泡利变换 $-i\sigma_Y = \sigma_X \sigma_Z$（或 Alice 端的 $i\sigma_Y = \sigma_Z \sigma_X$）精确互译，绝不能把 $\lvert\Phi^+\rangle$ 与 $\lvert\Psi^-\rangle$ 的 $\sigma_Y \otimes \sigma_Y$ 符号混为一谈。
2. **仅凭“局域边缘态为 $\frac{1}{2}I_2$（局域零向量）”不能反推任意双体态最大纠缠**：唯有在已知**全局态是纯态**（$\operatorname{rank}\rho = 1$，$\Tr(\rho^2) = 1$）的前提下，局部边缘态等于 $\frac{1}{2}I_2$ 才充要地标志着双比特最大纠缠。对于一般混合态，如 [@thm-local-correlation-sectors] 中的经典关联态 $\mathrm{classicalCorrelatedDensity} = \frac{1}{4}(I_4 + \sigma_Z \otimes \sigma_Z)$（$T = \operatorname{diag}(0, 0, 1)$）乃至完全无关联的最大混合态 $\frac{1}{4}I_4$（$T = 0$），它们的局部边缘态同样等于 $\frac{1}{2}I_2$，却丝毫不具量子纠缠。

除了对某一个子系统求偏迹之外，在两项克罗内克张量和上对第一个因子作**部分转置**（partial transpose），也能从矩阵秩翻倍的角度直接照亮贝尔叠加的代数刚性。先手算与未归一化贝尔态 $\lvert 00\rangle + \lvert 11\rangle$ 对应的 $2\times 1$ 列矩阵算例：取 $m_1 = m_2 = 2$、$n_1 = n_2 = 1$，令 $A_1 = B_1 = \binom{1}{0}$、$A_2 = B_2 = \binom{0}{1}$，则 $(A_1, A_2)$ 与 $(B_1, B_2)$ 在 $\mathbb{C}$ 上各自线性无关。两项张量和 $\operatorname{tensorSum}(A_1, A_2, B_1, B_2) = A_1 \otimes_{\mathrm{K}} B_1 + A_2 \otimes_{\mathrm{K}} B_2$ 是秩为 $1$ 的 $4\times 1$ 列矩阵 $(1, 0, 0, 1)^T$；但将第一因子取普通矩阵转置后，$\operatorname{partialTranspose}(A_1, A_2, B_1, B_2) = A_1^T \otimes_{\mathrm{K}} B_1 + A_2^T \otimes_{\mathrm{K}} B_2 = \bigl(\begin{smallmatrix} 1 & 0 \\ 0 & 1 \end{smallmatrix}\bigr) = I_2$ 的秩翻倍为 $2 = 2 \cdot 1$。再看分块拼接秩：纵向叠放 $\operatorname{fromRows}(A_1, A_2) = (1, 0, 0, 1)^T$ 的秩为 $\operatorname{vRank}(A_1, A_2) = 1$，横向并排 $\operatorname{fromCols}(A_1, A_2) = I_2$ 的秩为 $\operatorname{hRank}(A_1, A_2) = 2 = 2\,\operatorname{vRank}(A_1, A_2)$（$B_1, B_2$ 完全相同）。

更一般地，对任意自然数维数 $m_1, n_1, m_2, n_2 \in \mathbb{N}$ 及长方复矩阵 $A_1, A_2 \in M_{m_1 \times n_1}(\mathbb{C})$、$B_1, B_2 \in M_{m_2 \times n_2}(\mathbb{C})$，按源码精确定义两项张量和 $\operatorname{tensorSum}(A_1, A_2, B_1, B_2) := A_1 \otimes_{\mathrm{K}} B_1 + A_2 \otimes_{\mathrm{K}} B_2$、第一因子普通转置下的部分转置 $\operatorname{partialTranspose}(A_1, A_2, B_1, B_2) := \operatorname{tensorSum}(A_1^T, A_2^T, B_1, B_2)$，以及横向拼接秩 $\operatorname{hRank}(X_1, X_2) := \operatorname{rank}\bigl(\operatorname{fromCols}(X_1, X_2)\bigr) \in \mathbb{N}$ 与纵向拼接秩 $\operatorname{vRank}(X_1, X_2) := \operatorname{rank}\bigl(\operatorname{fromRows}(X_1, X_2)\bigr) \in \mathbb{N}$。下面的分类定理给出了部分转置秩恰好达到两倍上界（秩饱和）的充要条件。

::: {.theorem #thm-partial-transpose-rank-saturation title="两项张量和的部分转置秩饱和分类" lean="D5/S3/Quantum/Entanglement/PartialTransposeSaturation/Classification.result"}
设 $m_1, n_1, m_2, n_2 \in \mathbb{N}$，长方复矩阵 $A_1, A_2 \in M_{m_1 \times n_1}(\mathbb{C})$ 与 $B_1, B_2 \in M_{m_2 \times n_2}(\mathbb{C})$ 满足复线性无关条件 $\operatorname{LinearIndependent}_{\mathbb{C}}\,![A_1, A_2]$ 与 $\operatorname{LinearIndependent}_{\mathbb{C}}\,![B_1, B_2]$。则部分转置矩阵的秩恰好等于原两项张量和之秩的两倍，当且仅当两侧矩阵对同时满足纵向秩翻倍或同时满足横向秩翻倍：

$$
\begin{aligned}
&\operatorname{rank}\bigl(\operatorname{partialTranspose}(A_1, A_2, B_1, B_2)\bigr) = 2\,\operatorname{rank}\bigl(\operatorname{tensorSum}(A_1, A_2, B_1, B_2)\bigr) \\
\iff\;& \bigl(\operatorname{vRank}(A_1, A_2) = 2\,\operatorname{hRank}(A_1, A_2) \;\land\; \operatorname{vRank}(B_1, B_2) = 2\,\operatorname{hRank}(B_1, B_2)\bigr) \\
&\lor\; \bigl(\operatorname{hRank}(A_1, A_2) = 2\,\operatorname{vRank}(A_1, A_2) \;\land\; \operatorname{hRank}(B_1, B_2) = 2\,\operatorname{vRank}(B_1, B_2)\bigr).
\end{aligned}
$$
:::

::: proof
在两侧二元族各自 $\mathbb{C}$-线性无关的前提下，利用行空间与列空间的直和分解可将两项克罗内克和 $A_1 \otimes_{\mathrm{K}} B_1 + A_2 \otimes_{\mathrm{K}} B_2$ 的秩表示为两侧横向拼接秩 $\operatorname{hRank}$、纵向拼接秩 $\operatorname{vRank}$ 与单矩阵秩的组合关系，而对第一因子施加普通转置 $(\cdot)^T$ 恰好将 $(A_1, A_2)$ 的横向拼接秩与纵向拼接秩互换：$\operatorname{hRank}(A_1^T, A_2^T) = \operatorname{vRank}(A_1, A_2)$，$\operatorname{vRank}(A_1^T, A_2^T) = \operatorname{hRank}(A_1, A_2)$。由子空间维数上界，部分转置秩至多为原两项张量和之秩的 $2$ 倍；等号饱和当且仅当原张量和在列空间或行空间之一完全重合压缩、而在被转置翻转后的另一侧形成零交直和使维数精确翻倍，化简两侧秩等式即充要地分裂为“双侧 $\operatorname{vRank} = 2\,\operatorname{hRank}$”或“双侧 $\operatorname{hRank} = 2\,\operatorname{vRank}$”两个分支。完整证明由 Lean 内核检查。
:::

引用 [@thm-partial-transpose-rank-saturation] 时需注意其精确范围：定理允许任意自然数长方矩阵维数 $m_1, n_1, m_2, n_2 \in \mathbb{N}$（不限于方阵密度算符），`partialTranspose` 对第一因子采用的是**普通矩阵转置** $A_i^T$（而非共轭转置 $A_i^*$），且秩函数取值于 $\mathbb{N}$；同时，两侧矩阵对的 $\mathbb{C}$-线性无关前提与“两项张量和”的项数限制均不可省去，不能直接外推为三项以上施密特秩张量和的秩公式、一般混合态的 Peres–Horodecki 半正定可分判据，或仅凭矩阵秩直接判定 CHSH 违背。
