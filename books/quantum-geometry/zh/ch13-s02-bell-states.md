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

## 13.2.1 贝尔对角几何、纯态勾股守恒与部分转置秩饱和 {#sec-ch13-2-1-bell-tetrahedron-pythagorean-pt-rank}

前文以 [@lemma-bell-mixed-marginal] 与 [@thm-partial-transpose-rank-saturation] 确立了贝尔态的球心边缘特征与两项张量和的秩翻倍分类。沿着这两条结论继续追问，四个定量问题自然浮现：在边缘态同为 $\frac{1}{2}I_2$ 的贝尔对角四面体上按三维欧氏体积计量，可分态、纠缠但满足 CHSH 不等式的态以及违背 CHSH 的态各自占据多大比例？任意双比特纯态的局域布洛赫长度、关联张量与纠缠度遵循怎样的守恒律？[@thm-partial-transpose-rank-saturation] 的每一项前提为何缺一不可？把部分转置秩跃迁与 CHSH 极值放进同一张对照表，又能看到怎样的层次分野？下文逐一给出精确刻画。

### 13.2.1.1 贝尔对角四面体、可分八面体与精确 CHSH 违背体积 {#sec-ch13-2-1-1-bell-tetrahedron-octahedron-chsh-volume}

考虑全体局部布洛赫向量为零的对角关联态 $\rho(\mathbf{t}) = \frac{1}{4}\bigl(I_4 + \sum_{j=1}^3 t_j\,\sigma_j \otimes \sigma_j\bigr)$，其中 $\mathbf{t} = (t_1, t_2, t_3) \in \mathbb{R}^3$，$\sigma_1, \sigma_2, \sigma_3$ 依次记泡利矩阵 $\sigma_X, \sigma_Y, \sigma_Z$。在贝尔基 $(\lvert\Phi^+\rangle, \lvert\Phi^-\rangle, \lvert\Psi^+\rangle, \lvert\Psi^-\rangle)$ 下，$\rho(\mathbf{t})$ 对角化为四项线性特征值 $\lambda_v = \frac{1 + v \cdot \mathbf{t}}{4}$，对应的四个符号顶点为 $v_{\Phi^+} = (1, -1, 1)$、$v_{\Phi^-} = (-1, 1, 1)$、$v_{\Psi^+} = (1, 1, -1)$ 与 $v_{\Psi^-} = (-1, -1, -1)$。因 $\sum_v v = 0$ 且 $\sum_v v v^T = 4I_3$，四项特征值正是正四面体 $\mathcal{T} := \{\mathbf{t} \in \mathbb{R}^3 \mid \forall v,\; 1 + v \cdot \mathbf{t} \ge 0\}$ 的重心坐标；该单形的行列式绝对值为 $16$，故欧氏体积 $\operatorname{Vol}(\mathcal{T}) = \frac{8}{3}$。

对第一个比特取部分转置 $\rho(\mathbf{t})^{T_A}$ 仅因 $\sigma_Y^T = -\sigma_Y$ 而把关联坐标反射为 $(t_1, -t_2, t_3)$，并将特征值多重集 $\{\lambda_v\}$ 映为 $\{\frac{1}{2} - \lambda_v\}$。原四面体 $\mathcal{T}$ 与反射四面体 $\mathcal{T}^{T_A}$ 的八道平面不等式穷尽全部符号组合 $\pm t_1 \pm t_2 \pm t_3 \le 1$，其交集恰好是正八面体 $\mathcal{O} := \{\mathbf{t} \in \mathbb{R}^3 \mid |t_1| + |t_2| + |t_3| \le 1\}$，体积为 $8 \cdot \frac{1}{6} = \frac{4}{3}$，恰占 $\frac{1}{2}$ 倍的 $\mathcal{T}$ 体积。六个坐标轴顶点 $\pm e_j$ 都是乘积本征态的等权混合，由凸性与双比特部分转置半正定判据（A. Peres，*Separability Criterion for Density Matrices*，*Phys. Rev. Lett.* **77**(8)，1996，pp. 1413–1415，Eqs. (3), (6)，[10.1103/PhysRevLett.77.1413](https://doi.org/10.1103/PhysRevLett.77.1413)；R. Horodecki & M. Horodecki，*Information-theoretic aspects of inseparability of mixed states*，*Phys. Rev. A* **54**(3)，1996，pp. 1838–1843，§§IV–V，[10.1103/PhysRevA.54.1838](https://doi.org/10.1103/PhysRevA.54.1838)；M. Horodecki, P. Horodecki & R. Horodecki，*Separability of mixed states: necessary and sufficient conditions*，*Phys. Lett. A* **223**(1–2)，1996，pp. 1–8，Theorem 3，[10.1016/S0375-9601(96)00706-2](https://doi.org/10.1016/S0375-9601%2896%2900706-2)）可得：$\rho(\mathbf{t})$ 可分当且仅当 $\mathbf{t} \in \mathcal{O}$。

其余区域 $\mathcal{T} \setminus \mathcal{O}$ 分裂为四个由 $\lambda_v > \frac{1}{2}$ 切出的全等角四面体，每个都以线性比例 $\frac{1}{2}$ 相似于 $\mathcal{T}$ 而占据体积 $\frac{1}{3}$。在 $\mathcal{T}$ 上，部分转置最小特征值恒为 $\lambda_{\min}(\rho^{T_A}) = \frac{1}{2} - \lambda_{\max}$，至多有一项为负，故负度为 $\mathcal{N}(\rho) = \max(0, \lambda_{\max} - \frac{1}{2})$。又因自旋翻转 $\widetilde{\rho} = (\sigma_Y \otimes \sigma_Y)\bar{\rho}(\sigma_Y \otimes \sigma_Y)$ 保持每个贝尔投影不变，Wootters 矩阵满足 $R = \sqrt{\sqrt{\rho}\,\widetilde{\rho}\,\sqrt{\rho}} = \rho$（W. K. Wootters，*Entanglement of Formation of an Arbitrary State of Two Qubits*，*Phys. Rev. Lett.* **80**(10)，1998，pp. 2245–2248，Eqs. (4)–(5), (9)–(10)，[10.1103/PhysRevLett.80.2245](https://doi.org/10.1103/PhysRevLett.80.2245)），由此得出并发度的精确线性公式 $C(\rho) = 2\mathcal{N}(\rho) = \max(0, 2\lambda_{\max} - 1)$。

进一步把双设置自旋 CHSH 违背判据叠加到 $\mathcal{T}$ 上（下文“CHSH 局域”均指该双设置自旋检验满足 $S_{\max} \le 2$，不与更一般的投影测量局域隐变量模型混同）。由 Horodecki 判据（R. Horodecki, P. Horodecki & M. Horodecki，*Violating Bell inequality by mixed spin-½ states: necessary and sufficient condition*，*Phys. Lett. A* **200**(5)，1995，pp. 340–344，[10.1016/0375-9601(95)00214-N](https://doi.org/10.1016/0375-9601%2895%2900214-N)），任意双比特态的最大自旋 CHSH 期望为 $S_{\max}(\rho) = 2\sqrt{M(\rho)}$，其中 $M(\rho)$ 为 $T^T T$ 的两个最大特征值之和；对贝尔对角态，记 $t_{(1)}, t_{(2)}$ 为按绝对值排序最大的两个坐标，则 $M(\mathbf{t}) = t_{(1)}^2 + t_{(2)}^2$。在八面体 $\mathcal{O}$ 内恒有 $M(\mathbf{t}) \le (\sum_{j=1}^3 |t_j|)^2 \le 1$，故违背区严格落在四个纠缠角内。在 $\Phi^+$ 角中令 $\mathbf{t} = (x, -y, z)$ 并取有序扇区 $x \ge y \ge z \ge 0$，四道面不等式里 $1 - x - y + z \ge 0$ 比其余三道分别小 $2(x + y)$、$2(x - z)$ 与 $2(y - z)$ 而构成唯一有效下界 $z \ge x + y - 1$；违背条件 $x^2 + y^2 > 1$ 迫使 $x + y > 1$，故对每个 $x \in (1/\sqrt{2}, 1]$ 与 $y \in (\sqrt{1 - x^2}, x]$，变量 $z$ 扫过长度为 $1 - x$ 的区间 $[x + y - 1, y]$。由于坐标置换与成对符号翻转同时保持四面体 $\mathcal{T}$ 与 CHSH 条件不变，乘以 $4$ 个角与 $6$ 种坐标置换即得精确闭式：

$$
\begin{aligned}
\lambda_{\Phi^\pm} &= \frac{1 \pm t_1 \mp t_2 + t_3}{4}, \qquad \lambda_{\Psi^\pm} = \frac{1 \pm t_1 \pm t_2 - t_3}{4}, \qquad \lambda_{\min}\bigl(\rho^{T_A}\bigr) = \frac{1}{2} - \lambda_{\max}, \\
C(\rho) &= 2\mathcal{N}(\rho) = \max\bigl(0,\, 2\lambda_{\max} - 1\bigr), \qquad \frac{\operatorname{Vol}(\mathcal{O})}{\operatorname{Vol}(\mathcal{T})} = \frac{4/3}{8/3} = \frac{1}{2}, \\
V_{\mathrm{CHSH}} &= 24 \int_{1/\sqrt{2}}^{1} \int_{\sqrt{1 - x^2}}^{x} (1 - x)\,dy\,dx = 4 + 4\sqrt{2} - 3\pi.
\end{aligned}
$$

将总违背体积 $V_{\mathrm{CHSH}} = 4 + 4\sqrt{2} - 3\pi \approx 0.232076$（单个角帽体积为 $1 + \sqrt{2} - \frac{3\pi}{4} \approx 0.058019$）除以 $\frac{8}{3}$，即得 $\mathcal{T}$ 的精确三元体积占比：可分八面体占 $\frac{1}{2}$（$0.500000$），纠缠但 CHSH 局域占 $\frac{9\pi}{8} - 1 - \frac{3\sqrt{2}}{2} \approx 0.412971$，CHSH 违背区仅占 $\frac{3}{2} + \frac{3\sqrt{2}}{2} - \frac{9\pi}{8} \approx 0.087029$——换言之，贝尔对角纠缠体积中逾五分之四都满足全部自旋 CHSH 不等式。

沿主对角线 $\mathbf{t} = (-p, -p, -p)$，Werner 族 $\rho_W(p) = (1 - p)\frac{I_4}{4} + p\lvert\Psi^-\rangle\langle\Psi^-\rvert$（R. F. Werner，*Quantum states with Einstein-Podolsky-Rosen correlations admitting a hidden-variable model*，*Phys. Rev. A* **40**(8)，1989，pp. 4277–4281，[10.1103/PhysRevA.40.4277](https://doi.org/10.1103/PhysRevA.40.4277)；及 Peres 1996，Eqs. (7)–(8)）把这一分层浓缩为一条一维切片。该族的物理区间为 $[-\frac{1}{3}, 1]$，可分区间为 $[-\frac{1}{3}, \frac{1}{3}]$；因 $M(\rho_W(p)) = 2p^2$，CHSH 违背当且仅当 $p > \frac{1}{\sqrt{2}} \approx 0.707107$ 时发生，留下宽为 $\frac{1}{\sqrt{2}} - \frac{1}{3} \approx 0.373773$ 的纠缠—CHSH 局域间隙 $(\frac{1}{3}, \frac{1}{\sqrt{2}}]$。

纯整数不等式 $2 \cdot 7^2 = 98 < 100 = 10^2$ 与 $2 \cdot 5^2 = 50 > 49 = 7^2$ 直接将阈值夹在 $p = \frac{7}{10}$（$M = \frac{49}{50}$，$S_{\max} = \frac{7\sqrt{2}}{5} \approx 1.979899 < 2$，但 $C = \frac{11}{20}$）与 $p = \frac{5}{7}$（$M = \frac{50}{49}$，$S_{\max} = \frac{10\sqrt{2}}{7} \approx 2.020305 > 2$）之间。下表并列连续体积占比（保留六位小数）与分母 $N = 12, 24$ 的有限整数格点普查（边界归入非严格区域）：

| 分区 | 连续体积占比 | 舍入值 | $N = 12$（共 $5225$） | $N = 24$（共 $39249$） |
| :----------------------- | :-------------------- | -------------: | -----------------: | ---------------------: |
| 可分（$\mathcal{O}$） | $\frac{1}{2}$ | $0.500000$ | $2625$ | $19649$ |
| 纠缠（$S_{\max} \le 2$） | $\frac{9\pi}{8} - 1 - \frac{3\sqrt{2}}{2}$ | $0.412971$ | $1900$ | $15416$ |
| 违背（$S_{\max} > 2$） | $\frac{3}{2} + \frac{3\sqrt{2}}{2} - \frac{9\pi}{8}$ | $0.087029$ | $700$ | $4184$ |

### 13.2.1.2 纯态勾股纠缠守恒律与有理纯态族 {#sec-ch13-2-1-2-pure-state-pythagorean-lock}

转向一般归一化双比特纯态 $\lvert\psi\rangle = \sum_{i,j=0}^1 c_{ij}\lvert ij\rangle$，将其四个振幅排成 $2 \times 2$ 矩阵 $A = (c_{ij})$（满足 $\|A\|_F^2 = 1$）。直接对第二个或第一个指标求和即得两个约化边缘态 $\rho_A = A A^*$ 与 $\rho_B = A^T \overline{A}$：两者共享迹 $1$ 与行列式 $|\det A|^2$，因而具有完全相同的二元特征谱 $\frac{1 \pm \sqrt{1 - C^2}}{2}$，其中 $C(\psi) := 2|\det A| = 2|c_{00}c_{11} - c_{01}c_{10}| \in [0, 1]$ 正是纯态并发度（Wootters 1998，Eq. (7)）。对照单比特布洛赫行列式 $\det\rho_A = \frac{1 - \|\vv{r}\|^2}{4}$，立得双侧局域布洛赫长度恒等且与并发度构成精确勾股关系 $\|\vv{r}\|^2 + C(\psi)^2 = 1$；再结合十六个双体泡利乘积的正交归一化关系 $4\Tr(\rho^2) = 1 + \|\vv{r}\|^2 + \|\vv{s}\|^2 + \|T\|_F^2 = 4$，关联扇区的弗罗贝尼乌斯平方范数被唯一锁定为 $\|T\|_F^2 = 1 + 2C(\psi)^2$。

这一守恒律同时解释了纯态与混合态在 CHSH 违背上的根本分叉。对振幅矩阵 $A$ 作奇异值分解，局域幺正变换可将 $\lvert\psi\rangle$ 化为 $u\lvert 00\rangle + v\lvert 11\rangle$（$u, v \ge 0$，$u^2 + v^2 = 1$，$C = 2uv$），其关联张量为对角阵 $\operatorname{diag}(C, -C, 1)$。因局域幺正变换在泡利坐标上诱导实正交旋转而保持奇异值不变，任意双比特纯态的关联张量 $T$ 皆具奇异值 $(1, C, C)$，故 $T^T T$ 的特征值为 $(1, C^2, C^2)$，由 Horodecki 判据得出 $S_{\max}(\psi) = 2\sqrt{1 + C(\psi)^2}$——这正是 Gisin 定理（N. Gisin，*Bell's inequality holds for all non-product states*，*Phys. Lett. A* **154**(5–6)，1991，pp. 201–202，[10.1016/0375-9601(91)90805-I](https://doi.org/10.1016/0375-9601%2891%2990805-I)）的精确定量形式：一切纠缠双比特纯态（$C > 0$）皆违背 CHSH。相对地，前文 [@lemma-bell-mixed-marginal] 第二条边界的根源也一目了然：在一般混合态中，纯度亏损 $1 - \Tr(\rho^2) = \frac{3 - (\|\vv{r}\|^2 + \|\vv{s}\|^2 + \|T\|_F^2)}{4} > 0$ 打破了总预算为 $3$ 的锁定，允许 $\vv{r} = \vv{s} = \vv{0}$ 在无纠缠时成立。

$$
\begin{aligned}
\|\vv{r}\|^2 &= \|\vv{s}\|^2 = 1 - C(\psi)^2, \qquad \|\vv{r}\|^2 + C(\psi)^2 = 1, \qquad \|T\|_F^2 = 1 + 2C(\psi)^2, \\
\|\vv{r}\|^2 &+ \|\vv{s}\|^2 + \|T\|_F^2 = 3, \qquad S_{\max}(\psi) = 2\sqrt{1 + C(\psi)^2}.
\end{aligned}
$$

取非零整数对 $(a, b)$ 并记 $d := a^2 + b^2 > 0$，可构造有理纯态族 $\lvert\psi_{a,b}\rangle$。其缩放密度矩阵 $d\,\rho_{a,b}$ 仅在 $(00, 11)$ 主块取 $\bigl(\begin{smallmatrix} a^2 & ab \\ ab & b^2 \end{smallmatrix}\bigr)$，部分转置（PT）把非对角项 $ab$ 移至 $(01, 10)$ 块。由此，密度矩阵元、共同局域长度 $\|\vv{r}\|$、并发度 $C$、关联范数平方 $\|T\|_F^2$、PT 特征谱与 $S_{\max}^2$ 均为精确有理数（其中 $\|\vv{r}\|$ 与 $C$ 恰成勾股数比，而 $S_{\max}$ 本身通常无理）：

$$
\begin{aligned}
\lvert\psi_{a,b}\rangle &:= \frac{a\lvert 00\rangle + b\lvert 11\rangle}{\sqrt{d}}, \qquad \|\vv{r}\| = \frac{|a^2 - b^2|}{d}, \qquad C = \frac{2|ab|}{d} \qquad (d := a^2 + b^2 > 0), \\
\operatorname{spec}\bigl(\rho_{a,b}^{T_A}\bigr) &= \left(\frac{a^2}{d},\; \frac{b^2}{d},\; +\frac{ab}{d},\; -\frac{ab}{d}\right), \qquad S_{\max}^2 = 4\bigl(1 + C^2\bigr).
\end{aligned}
$$

下表列出五组整数见证，其中 $(2, 1)$、$(3, 2)$、$(4, 3)$ 与 $(1, 1)$ 的 $S_{\max}$ 保留六位小数依次为 $2.561250$、$2.721816$、$2.772436$ 与 $2.828427$：

| $(a, b)$ | 共同局域长度 $\|\vv{r}\|$ | 并发度 $C$ | $\|T\|_F^2$ | PT 谱 | $S_{\max}$ |
| :---: | :---: | :---: | :---: | :---: | :---: |
| $(1, 0)$ | $1$ | $0$ | $1$ | $1, 0, 0, 0$ | $2$ |
| $(2, 1)$ | $3/5$ | $4/5$ | $57/25$ | $4/5, 1/5, \pm 2/5$ | $2\sqrt{41}/5$ |
| $(3, 2)$ | $5/13$ | $12/13$ | $457/169$ | $9/13, 4/13, \pm 6/13$ | $2\sqrt{313}/13$ |
| $(4, 3)$ | $7/25$ | $24/25$ | $1777/625$ | $16/25, 9/25, \pm 12/25$ | $2\sqrt{1201}/25$ |
| $(1, 1)$ | $0$ | $1$ | $3$ | $1/2, 1/2, \pm 1/2$ | $2\sqrt{2}$ |

### 13.2.1.3 部分转置秩饱和的分支机制与前提锐度 {#sec-ch13-2-1-3-partial-transpose-rank-witnesses}

现在回到 [@thm-partial-transpose-rank-saturation]，通过有限整数与高斯整数矩阵见证剖析两项张量和的秩机制。记两项张量和及其第一因子普通部分转置以及双侧分块拼接秩为：

$$
\begin{aligned}
S &:= A_1 \otimes_{\mathrm{K}} B_1 + A_2 \otimes_{\mathrm{K}} B_2, \qquad S^{T_1} := A_1^T \otimes_{\mathrm{K}} B_1 + A_2^T \otimes_{\mathrm{K}} B_2, \\
(v_A, h_A) &:= \bigl(\operatorname{vRank}(A_1, A_2),\, \operatorname{hRank}(A_1, A_2)\bigr), \qquad (v_B, h_B) := \bigl(\operatorname{vRank}(B_1, B_2),\, \operatorname{hRank}(B_1, B_2)\bigr).
\end{aligned}
$$

上游形式化证明的单侧公式表明：当 $v_B = 2h_B$ 时有 $\operatorname{rank} S = h_A h_B$ 与 $\operatorname{rank} S^{T_1} = v_A h_B$；对偶地，当 $h_B = 2v_B$ 时分别为 $v_A v_B$ 与 $h_A v_B$。因此，双侧同属 H 分支（$h = 2v$）不仅在 $2 \times 1$ 列向量上实现 $1 \to 2$ 翻倍，在 $4 \times 2$ 分块单位阵 $A_1 = B_1 = \binom{I_2}{0_2}$、$A_2 = B_2 = \binom{0_2}{I_2}$ 上也实现高秩 $4 \to 8$ 翻倍；双侧同属 V 分支（$v = 2h$）由 $1 \times 2$ 行向量实现 $1 \to 2$ 翻倍；而若一侧取 $2 \times 1$ 列、另一侧取 $1 \times 2$ 行（H/V 错配），秩反从 $2$ 减半为 $1$。

同样可以逐条验证 [@thm-partial-transpose-rank-saturation] 其余三项前提的不可省略性。其一，若任一侧矩阵对线性相关，则两项和坍缩为单个克罗内克积，普通部分转置保持其秩不变；取四个非零相关因子 $A_1 = \binom{2}{0}$、$A_2 = \binom{1}{0}$、$B_1 = \binom{1}{0}$ 与 $B_2 = \binom{-2}{0}$ 时，$S = S^{T_1} = 0$ 使等式 $0 = 2 \cdot 0$ 成立，但两侧 $(v, h) = (1, 1)$ 均不满足任何分类分支。其二，两项限制不可推广至多项和：对任意 $k \ge 1$，标准基和 $\sum_{j=1}^k e_j \otimes_{\mathrm{K}} e_j$（$e_j \in \mathbb{C}^{k \times 1}$）秩为 $1$，而其部分转置是秩为 $k$ 的单位阵 $I_k$（例如 $k = 3$ 给出 $1 \to 3$）；四项贝尔密度展开 $2\rho_{\Phi^+} = \sum_{i,j=0}^1 E_{ij} \otimes_{\mathrm{K}} E_{ij}$ 则从秩 $1$ 跃升至秩 $4$ 的交换矩阵。

其三，第一因子必须使用普通转置 $A_i^T$ 而非共轭转置 $A_i^*$。取 $\mathbb{C}$-线性无关的 $2 \times 2$ 高斯整数对角阵 $A_1 = I_2$、$A_2 = \operatorname{diag}(i, 2i)$、$B_1 = \operatorname{diag}(1, 2)$ 与 $B_2 = i I_2$：普通部分转置给出对角阵 $\operatorname{diag}(0, 1, -1, 0)$，秩为 $2$；共轭部分转置则给出 $\operatorname{diag}(2, 3, 3, 4)$，秩翻倍为 $4$（稀疏选取 $A_1 = B_1 = I_2$、$A_2 = B_2 = \operatorname{diag}(i, 0)$ 也已分离秩 $3$ 与秩 $4$）。而且 $2 \times 2$ 已是最小分离维数：若任一线性无关对由列向量或行余向量构成，可逆基变换将其化为前两列或前两行标准基，从而使变换后的秩完全取决于另一对的横向或纵向拼接秩，而后者在逐元共轭下不变；标量对则无法线性无关。下表汇总七组有限矩阵见证（其中 $e_1 = \binom{1}{0}$、$e_2 = \binom{0}{1}$）：

| 矩阵见证 | $(v_A, h_A)$ | $(v_B, h_B)$ | $\operatorname{rank} S \to \operatorname{rank} S^{T_1}$ | 共轭部分转置秩 |
| :----------------------------------------- | :---------: | :---------: | :-----------------: | :---------------: |
| H 分支极小列（$e_1, e_2$） | $(1, 2)$ | $(1, 2)$ | $1 \to 2$ | $2$ |
| H 分支高秩分块（$4 \times 2$） | $(2, 4)$ | $(2, 4)$ | $4 \to 8$ | $8$ |
| V 分支极小行（$e_1^T, e_2^T$） | $(2, 1)$ | $(2, 1)$ | $1 \to 2$ | $2$ |
| H/V 错配（列配行） | $(1, 2)$ | $(2, 1)$ | $2 \to 1$ | $1$ |
| 非零相关零和（$2e_1, e_1$ 配 $e_1, -2e_1$） | $(1, 1)$ | $(1, 1)$ | $0 \to 0$ | $0$ |
| 复稀疏分离（$I_2, \operatorname{diag}(i, 0)$） | $(2, 2)$ | $(2, 2)$ | $3 \to 3$ | $4$ |
| 复秩翻倍（$I_2, \operatorname{diag}(i, 2i)$） | $(2, 2)$ | $(2, 2)$ | $2 \to 2$ | $4$ |

### 13.2.1.4 八类典型双比特态对照与向 CHSH 换位子的交棒 {#sec-ch13-2-1-4-eight-state-comparison-and-chsh-bridge}

记前文 [@thm-local-correlation-sectors] 中的经典对角关联混合态为 $\rho_{\mathrm{cl}} := \mathrm{classicalCorrelatedDensity} = \frac{1}{4}(I_4 + \sigma_Z \otimes \sigma_Z)$，将上述全部标尺汇入同一张八态对照表，即可清晰分辨“球心边缘”“部分转置秩变化”“纠缠”与“CHSH 违背”四重概念的精确层级。表中的八个态均满足 $\|\vv{r}\| = \|\vv{s}\|$ 且 $\mathcal{N} = C/2$：处于八面体面上的 Werner 边界态 $\rho_W(1/3)$ 虽然满秩为 $4$，部分转置反而降秩为 $3$ 且完全可分（$S_{\max} = \frac{2\sqrt{2}}{3} \approx 0.942809$）；进入纠缠区的 $\rho_W(1/2)$（$S_{\max} = \sqrt{2} \approx 1.414214$）与 $\rho_W(7/10)$（$S_{\max} = \frac{7\sqrt{2}}{5} \approx 1.979899$）已出现负的部分转置特征值并保持 $4 \to 4$ 满秩，却仍未突破 CHSH 经典上界 $2$；表中唯有 $\lvert\psi_{2,1}\rangle$ 与 $\lvert\Phi^+\rangle$ 这两行同时呈现 $1 \to 4$ 秩跃迁与 $S_{\max} > 2$：

| 态 | $\|\vv{r}\|$ | $\Tr\rho^2$ | $\|T\|_F^2$ | $C$ | $\lambda_{\min}(\rho^{T_A})$ | 秩跃迁 | $S_{\max}$ |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| $\lvert 00\rangle$ | $1$ | $1$ | $1$ | $0$ | $0$ | $1 \to 1$ | $2$ |
| $\rho_{\mathrm{cl}}$ | $0$ | $1/2$ | $1$ | $0$ | $0$ | $2 \to 2$ | $2$ |
| $I_4/4$ | $0$ | $1/4$ | $0$ | $0$ | $1/4$ | $4 \to 4$ | $0$ |
| $\rho_W(1/3)$ | $0$ | $1/3$ | $1/3$ | $0$ | $0$ | $4 \to 3$ | $2\sqrt{2}/3$ |
| $\rho_W(1/2)$ | $0$ | $7/16$ | $3/4$ | $1/4$ | $-1/8$ | $4 \to 4$ | $\sqrt{2}$ |
| $\rho_W(7/10)$ | $0$ | $247/400$ | $147/100$ | $11/20$ | $-11/40$ | $4 \to 4$ | $7\sqrt{2}/5$ |
| $\lvert\psi_{2,1}\rangle$ | $3/5$ | $1$ | $57/25$ | $4/5$ | $-2/5$ | $1 \to 4$ | $2\sqrt{41}/5$ |
| $\lvert\Phi^+\rangle$ | $0$ | $1$ | $3$ | $1$ | $-1/2$ | $1 \to 4$ | $2\sqrt{2}$ |

**证据边界与配套档案（`ARGUED` / `NUM`）。** 本小节书面论证（`ARGUED`）确立贝尔对角特征谱、部分转置反射与正八面体 $\frac{1}{2}$ 体积比，CHSH 违背体积精确积分 $4 + 4\sqrt{2} - 3\pi$ 与三元占比，任意双比特纯态的勾股守恒律与奇异值 CHSH 公式，以及部分转置秩见证与 $2 \times 2$ 最小分离维数论证。双比特可分判据、并发度、Werner 族、Gisin 纯态违背与 Horodecki 判据援引上列七篇文献；[@thm-local-correlation-sectors]、[@lemma-bell-mixed-marginal] 与 [@thm-partial-transpose-rank-saturation] 所引三条 `trureturing` 声明均已在 `origin/dev` 上核对过精确签名与前提边界。

配套计算复核（Python 符号与双工作精度 Arb 核验，以及无显式导入的独立 Lean 辅助校验）均不计入本书所钉 `trureturing` 账本的定理计数，而是作为 `NUM` 证据由 `loning` 存于[议题 #1247](https://github.com/the-omega-institute/trureturing-books/issues/1247) 关联的[固化校验档案](https://gist.github.com/loning/91667ca09a60a05a1ffd676fbadf9260/ef0aba5718a1f508ce44fa2121fa4e3e8b222410)：

- [`verify_cycle22_bell_states.py`](https://gist.githubusercontent.com/loning/91667ca09a60a05a1ffd676fbadf9260/raw/ef0aba5718a1f508ce44fa2121fa4e3e8b222410/verify_cycle22_bell_states.py)：生成全部 $96$ 组在 $256$ 位与 $320$ 位工作精度下嵌套的 Arb 区间包络（其中 $62$ 组非点区间严格内含，$34$ 组精确点区间重合），以独立数值积分复核 $V_{\mathrm{CHSH}} = 4 + 4\sqrt{2} - 3\pi$，并核验八态对照表与全部矩阵秩；
- `cycle22_bell_tetrahedron_pt_rank_check`（[`bell_tetrahedron_pt_rank_check.lean`](https://gist.githubusercontent.com/loning/91667ca09a60a05a1ffd676fbadf9260/raw/ef0aba5718a1f508ce44fa2121fa4e3e8b222410/bell_tetrahedron_pt_rank_check.lean)）：核验 $N = 12$ 与 $N = 24$ 两组格点普查、贝尔特征值与反射系数、四组 Werner 见证、五组缩放有理纯态及其部分转置特征多项式、九组两项整数与高斯整数秩见证、三项向量 $1 \to 3$ 跃迁及五组密度矩阵部分转置秩跃迁；
- Lean 校验文件 SHA-256：`6e107321eba5bb1ba00d3540f51c1b9801a1895686df06328d843346a36ba8a0`；
- [`SHA256SUMS`](https://gist.githubusercontent.com/loning/91667ca09a60a05a1ffd676fbadf9260/raw/ef0aba5718a1f508ce44fa2121fa4e3e8b222410/SHA256SUMS)：SHA-256 为 `411f12dc928c15e6c2b9eafd5ddd5c42e13d795358123f409e30bfbea7923e52`。

至此，球心边缘、关联张量与部分转置秩如何把可分态、纠缠 CHSH 局域态与 CHSH 违背态层层分开已经完全量化。带着 $S_{\max}(\rho) = 2\sqrt{M(\rho)}$ 与 $\rho_{\mathrm{cl}}$、$\lvert\Phi^+\rangle$ 的精确对照，下文 [§13.3](ch13-s03-chsh-commutator-area.md#sec-chsh-commutator-area) 将直接展开 CHSH 算子的平方，揭示超越经典上界 $2$ 的几何引擎如何来自两侧非对易测量尺的换位子面积。
