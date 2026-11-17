# 33.5 多观察者共识张量、去相干指针基涌现与无绝对客观事实 {#sec-ch33-consensus-decoherence-pointer}

> “观察者的共识选择决定了去相干方向, 没有绝对客观存在”

前四节已经消融了“活主体 vs. 死客体”的断崖，并展示了两位观察者如何结成互吸引子双螺旋；但要将隐藏在传统教科书背后的“外部第 3 点裁判 $C$”彻底连根拔除，我们还必须正面回答退相干理论最核心的追问（原话台账见[附录 A](appendix-a-s03-verbatim-ledger.md#sec-appendix-a-verbatim-ledger) `A76`）：**当无数观察者汇聚成宏观环境时，为什么量子态会沿着某一组特定的“经典指针基（pointer basis）”去相干，而不是沿着别的方向？脱离了具体观察者群体的丈量轴分布，宇宙中真的预先刻着一套“绝对客观存在”的优选坐标吗？**

标准教材在讲退相干时，往往先默认“系统与外部环境通过某个固定的对角相互作用哈密顿量耦合”，再由此推导出对角基存活、非对角相干衰减。然而，只要我们回到本章“万物皆为观察者”的第一性原理就会看穿：**所谓“环境”，根本不是一块置身事外的死背景板，而是围绕被测系统展开两子比量的一群内生观察者 $\{\mathcal{O}_1, \dots, \mathcal{O}_N\}$！** 系统本身是一颗处处平权的单位布洛赫球面 $S^2$，球面上没有任何一条方向天生带着“经典特权”；唯有当周围观察者群体的丈量轴 $\{\mathbf{n}_1, \dots, \mathbf{n}_N\}$ 在二阶张量层面上结成**共识主轴**时，纵向极化才得以存留、横向相干才被一致抹平。一旦观察者轴各向同性散开，球体便向球心均匀收缩而不存在任何优选指针基；一旦观察者分化为两团正交共识泡，局部指针事实便不再能拼成单一的脱语境全局布尔真值表。本节严格遵循三层认识论契约：代数投影、相位二次型、记录捏合、参数化布洛赫轴收缩换位子、多副本反演阻断、划分拓扑核、冲突修正非对易与正交余项逃逸由十五条冻结的 Lean 4 定理（`LEAN ✓`）锚定，二阶共识张量、泡利去相干矩阵乘积与双分支互信息曲线作为显式初等推导与数值实算（`手工推导` / `NUM`）呈现，量子达尔文主义与扩展维格纳朋友局域友好性禁行定理归入物理文献（`文献结果`），而“共识选择决定去相干方向、无脱观察者绝对客观存在”的总括标定为本书几何模型（`MODEL`）。

## 33.5.1 二阶共识结构张量、符号规范不变性与各向同性迷雾 {#sec-ch33-consensus-tensor-axis}

让我们直接在三维实布洛赫坐标空间 $\mathbb{R}^3$ 中算清多观察者轴系如何合成宏观去相干几何。设有 $N \ge 1$ 位参与丈量的观察者，第 $j$ 位观察者的归一化耦合权重（或独立相遇频率）为 $w_j \ge 0$（$\sum_{j=1}^N w_j = 1$），其单位丈量轴方向为 $\mathbf{n}_j \in \mathbb{R}^3$（$\|\mathbf{n}_j\| = 1$）。若冒然对方向向量做一阶线性加权平均 $\overline{\mathbf{n}} = \sum_{j=1}^N w_j \mathbf{n}_j$，立刻就会闹出几何乌龙：把同一条未定向测量轴的正负结果标签对调（$\mathbf{n}_j \mapsto -\mathbf{n}_j$），两支沿 $+Z$ 与 $-Z$ 丈量同一自旋轴的观察者竟会在线性求和中彼此抵消为零！原因在于，一条二结果投影测量轴本质上是三维布洛赫空间中的**未定向一维直线**，其数学本体是秩一正交投影并矢 $P_j := \mathbf{n}_j \otimes \mathbf{n}_j = \mathbf{n}_j \mathbf{n}_j^{\mathsf{T}}$（满足 $P_j^{\mathsf{T}} = P_j$ 且 $P_j^2 = P_j$）。对全体观察者的投影并矢作凸组合，便得到**二阶共识结构张量**（`手工推导`）：

$$
\mathbf{M}_{\mathrm{cons}} \;:=\; \sum_{j=1}^N w_j\,\mathbf{n}_j \otimes \mathbf{n}_j \;=\; \sum_{j=1}^N w_j\,\mathbf{n}_j \mathbf{n}_j^{\mathsf{T}}.
$$

直接检验矩阵元可知 $\mathbf{M}_{\mathrm{cons}}$ 具备四条严整的初等谱性质：（1）**轴向符号重标不变性**：对每一位观察者独立翻转测量轴正负号 $\mathbf{n}_j \mapsto -\mathbf{n}_j$，恒有 $(-\mathbf{n}_j)(-\mathbf{n}_j)^{\mathsf{T}} = \mathbf{n}_j \mathbf{n}_j^{\mathsf{T}}$，故 $\mathbf{M}_{\mathrm{cons}}$ 逐元严格不变（注意：翻转测量轴 $\mathbf{n}_j \mapsto -\mathbf{n}_j$ 只是对调同一测量基的两个结果标签，**绝不是**把布洛赫球南北两极的正交纯态 $|+\mathbf{n}_j\rangle$ 与 $|-\mathbf{n}_j\rangle$ 混为一谈——两者的密度矩阵满足 $\|\rho(+\mathbf{n}_j) - \rho(-\mathbf{n}_j)\|_{\mathrm{HS}} = \sqrt{2} > 1$；它也不同于希尔伯特空间态矢量乘共同复相位 $z \mapsto e^{i\theta} z$ 的 $U(1)$ 规范不变性）；（2）**对称半正定与格拉姆分解**：令加权观测行矩阵 $B \in \mathbb{R}^{N \times 3}$ 取元 $B_{ja} = \sqrt{w_j}\,n_{j,a}$，则 $\mathbf{M}_{\mathrm{cons}} = B^{\mathsf{T}} B = \mathbf{M}_{\mathrm{cons}}^{\mathsf{T}}$，且对一切 $\mathbf{v} \in \mathbb{R}^3$ 有 $0 \le \mathbf{v}^{\mathsf{T}}\mathbf{M}_{\mathrm{cons}}\mathbf{v} = \sum_{j=1}^N w_j (\mathbf{n}_j \cdot \mathbf{v})^2 \le \|\mathbf{v}\|^2$，即 $0 \preceq \mathbf{M}_{\mathrm{cons}} \preceq I_3$；（3）**单位迹与主特征值界**：因 $\operatorname{Tr}(P_j) = \|\mathbf{n}_j\|^2 = 1$，将本征值按降序排为 $\lambda_1 \ge \lambda_2 \ge \lambda_3 \ge 0$，必有 $\operatorname{Tr}(\mathbf{M}_{\mathrm{cons}}) = \lambda_1 + \lambda_2 + \lambda_3 = 1$，从而 $\frac{1}{3} \le \lambda_1 \le 1$，据此定义液晶向列相式的**共识序参量**与**主谱隙**

$$
\kappa \;:=\; \frac{3\lambda_1 - 1}{2} \;\in\; [0, 1], \qquad \Delta\lambda \;:=\; \lambda_1 - \lambda_2 \;\in\; [0, 1];
$$

（4）**指针主轴的存在唯一性判据与简并迷雾边界**：投影算子的凸组合一般不再是投影算子（$\mathbf{M}_{\mathrm{cons}}^2 = \mathbf{M}_{\mathrm{cons}}$ 当且仅当谱为 $(1, 0, 0)$，即所有正权重观察者轴严格共线或反平行）。唯有当主谱隙严格为正 $\Delta\lambda = \lambda_1 - \lambda_2 > 0$ 时，最大特征子空间才定出**唯一一条未定向共识指针线** $\pm\mathbf{e}_{\mathrm{ptr}}$；反之，只要 $\lambda_1 = \lambda_2$——无论是六轴均分的**各向同性迷雾** $\mathbf{M}_{\mathrm{cons}} = \frac{1}{3}I_3$（$\lambda = (\frac{1}{3}, \frac{1}{3}, \frac{1}{3}),\; \kappa = 0,\; \Delta\lambda = 0$），还是赤道两正交团平分的**平面顶层简并** $\operatorname{diag}(\frac{1}{2}, \frac{1}{2}, 0)$（$\kappa = \frac{1}{4},\; \Delta\lambda = 0$）——**物理上根本不存在唯一的去相干指针轴**！（在数值舞台中，当 $\Delta\lambda < \varepsilon = 10^{-8}$ 时必须将主轴标为“未分辨”，绝不能把数值特征求解器随意吐出的某一列当作物理优选方向。）

下方第一张实验卡直观展示“光靠人多势众并不能选出经典世界”：当六束等权观察者轴沿 $\pm x, \pm y, \pm z$ 均匀散开时，整颗布洛赫球向中心均匀塌缩，没有任何一条极轴幸免：

::: {.viz src="observer-consensus-decoherence" preset="isotropic-fog" height="500"}
**各向同性迷雾卡（`isotropic-fog`）**：六根等权观察者轴沿 $\pm x, \pm y, \pm z$ 对称散开，$\mathbf{M}_{\mathrm{cons}} = \frac{1}{3}I_3$，谱 $\lambda = (\frac{1}{3}, \frac{1}{3}, \frac{1}{3})$，共识序参量 $\kappa = 0$，谱隙 $\Delta\lambda = 0$（`pointerAxis = null`）。在 $N = 16, \alpha = 0.4$ 的系综平均信道下，布洛赫球按精确比例因子 $[(1 + 2\cos 0.4)/3]^k$（弱耦合连续近似标尺 $e^{-k\cdot 0.4^2 / 3}$ 单独标出）向球心各向同性均匀收缩，不涌现任何优选指针轴（`MODEL` / `NUM`）。
:::

为什么量子振幅层面的共同相位规范不变性与正定配对可实现性必然指向二次厄米与格拉姆伴随平方结构，而单根测量轴的正交补投影又如何严丝合缝地劈开纵向保留与横向正交空间？`trureturing` 的共同相位不变多项式、格拉姆可实现性与正交补投影模块给出了三条精确的形式化支柱：

::: {.theorem #thm-ch33-consensus-quadratic-and-gram title="共同相位不变二次厄米表出、正算子格拉姆可实现性与正交补投影六恒等式" lean="D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem D5/S3/QuantumBounds/GramRealizability.gram_realizability D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities"}
在 `trureturing` 冻结的量子代数与量子界模块中，以下三项定理同时成立：

1. **共同相位不变多项式的电荷平衡、最低二次次数与唯一厄米矩阵表出**（[`complete_common_phase_polynomial_theorem`](lean:D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem)）：设 $\iota$ 为有限指标类型（`[Fintype ι]`），$p \in \operatorname{Poly}\iota = \operatorname{MvPolynomial}(\iota \oplus \iota)\,\mathbb{C}$ 以 $\operatorname{actual} p\, z$ 在复振幅向量 $z$ 与共轭 $\operatorname{star} z$ 处求值。则：（a）存在唯一的笛卡尔多项式 $q$ 使 $\forall z,\; \operatorname{actual} q\, z = \operatorname{eval}(\operatorname{cartesian} z)\, p$，且 $\operatorname{toCartesian}$ 保持总次数与齐次性；（b）共同相位 $z \mapsto e^{i\theta} z$ 下的不变性 $\operatorname{Invariant} p$ 等价于全纯—反全纯次数平衡 $\operatorname{Balanced} p$，亦等价于属于二次生成元子代数 $\operatorname{quadraticAlgebra}(\iota := \iota)$，并蕴涵 $\operatorname{actual} p \in \operatorname{actualQuadraticAlgebra}(\iota := \iota)$；（c）任何非常数（$\neg\exists c \in \mathbb{C},\, p = C(c)$）的共同相位不变多项式必满足 $2 \le p.\mathrm{totalDegree}$，且每个对角二次生成元均不变且总次数为 $2$；（d）若 $p$ 为二阶齐次、处处取实值（$\forall z,\; (\operatorname{actual} p\, z).\mathrm{im} = 0$）且共同相位不变，则存在唯一的复矩阵 $H \in M_\iota(\mathbb{C})$ 满足厄米性 $H.\mathrm{IsHermitian}$、二次型求值 $\forall z,\; \operatorname{actual} p\, z = \operatorname{star} z \mathbin{\bullet_v} (H *_{\!v} z)$、系数对应 $\forall i, j,\; H_{ji} = p.\mathrm{coeff}(\operatorname{pairExponent}\; i\; j)$ 及非负性等价判据 $(\forall z,\; 0 \le (\operatorname{actual} p\, z).\mathrm{re}) \iff H.\mathrm{PosSemidef}$，且任意给出同一求值函数的矩阵 $K \in M_\iota(\mathbb{C})$ 必满足 $K = H$；
2. **完备复内积空间正连续自同态的格拉姆伴随平方可实现性**（[`gram_realizability`](lean:D5/S3/QuantumBounds/GramRealizability.gram_realizability)）：设 $V$ 为完备复内积空间（`[NormedAddCommGroup V] [InnerProductSpace ℂ V] [CompleteSpace V]`），$Q : V \to_L[\mathbb{C}] V$ 为连续 $\mathbb{C}$-线性自同态。则 $Q$ 在算子序下非负当且仅当它可分解为同一空间上某连续线性算子 $O$ 的伴随平方并实现格拉姆内积配对：

   $$
   0 \le Q \;\Longleftrightarrow\; \exists\, O : V \to_L[\mathbb{C}] V,\quad Q = O^\dagger \circ_L O \;\land\; \forall x, y \in V,\; \langle Q x, y \rangle_{\mathbb{C}} = \langle O x, O y \rangle_{\mathbb{C}};
   $$

3. **闭子空间正交补投影的六重分解恒等式**（[`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities)）：设 $\mathbb{K}$ 满足 `[RCLike 𝕜]`，$E$ 为 $\mathbb{K}$ 上的完备内积空间，$M \le E$ 为闭子空间（`[IsClosed (M : Set E)]`），记正交投影 $P_M = M.\mathrm{starProjection}$ 与 $P_{M^\perp} = M^\perp.\mathrm{starProjection}$，则六条算子恒等式同时成立：

   $$
   P_{M^\perp} = \operatorname{id}_{\mathbb{K},E} - P_M,\quad P_M \circ_L P_M = P_M,\quad P_{M^\perp} \circ_L P_{M^\perp} = P_{M^\perp},\quad P_M \circ_L P_{M^\perp} = 0,\quad P_{M^\perp} \circ_L P_M = 0,\quad P_M + P_{M^\perp} = \operatorname{id}_{\mathbb{K},E}.
   $$
:::

::: proof
第 1 款通过实虚部线性可逆换元证明笛卡尔表出唯一与次数守恒，利用傅里叶模式正交性证明共同 $U(1)$ 相位不变性等价于每个非零单项式的全纯与反全纯总次数相等（从而非零非常数项总次数至少为 $2$，双线性配对生成全部平衡单项式），再在二阶实值齐次子空间上由偏振恒等式唯一读出厄米矩阵 $H$ 及其半正定判据。第 2 款正向对非负连续自同态调用 $C^*$-代数连续平方根提取自伴算子 $O$ 使 $Q = O^\dagger \circ_L O$，反向由伴随定义得 $\langle Q x, x \rangle_{\mathbb{C}} = \|O x\|^2 \ge 0$。第 3 款由希尔伯特空间直和分解 $E = M \oplus M^\perp$ 与自伴投影幂等正交性逐项核验。完整证明由 Lean 内核检查。
:::

对照 [@thm-ch33-consensus-quadratic-and-gram] 的严格前提边界，下方第二张实验卡将实测轴正负重标 $\mathbf{n}_j \mapsto -\mathbf{n}_j$ 与复态矢共同相位变换 $z \mapsto e^{i\theta} z$ 分栏并列核验：

::: {.viz src="observer-consensus-decoherence" preset="phase-gauge" height="500"}
**轴向符号重标与复相位规范对照卡（`phase-gauge`）**：主舞台含八根未定向测量轴（$z$ 组 4 根总权重 $0.60$、$x$ 组 2 根总权重 $0.25$、$y$ 组 2 根总权重 $0.15$），给出 $\mathbf{M}_{\mathrm{cons}} = \operatorname{diag}(0.25, 0.15, 0.60)$，谱 $(0.60, 0.25, 0.15)$，$\kappa = 0.40$，谱隙 $\Delta\lambda = 0.35$。逐根翻转轴端正负标签时，$\mathbf{M}_{\mathrm{cons}}$ 的每一个矩阵元、本征谱与系综平均收缩信道纹丝不动；独立附图展示复态矢共同相位旋转 $z \mapsto e^{i\theta} z$ 下二次厄米与格拉姆内积的不变性（[@thm-ch33-consensus-quadratic-and-gram]），严格区分轴标签翻转与对径正交纯态。
:::

## 33.5.2 泡利去相干布洛赫收缩、纵向指针存留与横向相干勾股消去 {#sec-ch33-consensus-pinching-pointer}

有了静态的共识结构张量 $\mathbf{M}_{\mathrm{cons}}$，我们再来精确推导多观察者逐次耦合如何在动力学上雕塑布洛赫球（`手工推导`）。设单量子比特密度矩阵写为 $\rho = \frac{1}{2}(I_2 + \mathbf{r}\cdot\vec{\sigma})$（$\|\mathbf{r}\| \le 1$），对单位测量轴 $\mathbf{n}$ 令泡利可观测量 $A = \mathbf{n}\cdot\vec{\sigma}$（满足 $A^\dagger = A,\; A^2 = I_2$）。取耦合角 $\alpha \in [0, \frac{\pi}{2}]$，克劳斯算符 $L_0 = \cos(\frac{\alpha}{2}) I_2$ 与 $L_1 = \sin(\frac{\alpha}{2}) A$ 满足 $\sum_{s=0}^1 L_s^\dagger L_s = I_2$，定义保迹完全正定（CPTP）双极泡利去相干信道

$$
\mathcal{E}_{\mathbf{n},\alpha}(\rho) \;=\; \cos^2\!\Bigl(\frac{\alpha}{2}\Bigr)\rho + \sin^2\!\Bigl(\frac{\alpha}{2}\Bigr)(\mathbf{n}\cdot\vec{\sigma})\rho(\mathbf{n}\cdot\vec{\sigma}).
$$

由泡利代数恒等式 $A(\mathbf{r}\cdot\vec{\sigma})A = \bigl[2(\mathbf{n}\cdot\mathbf{r})\mathbf{n} - \mathbf{r}\bigr]\cdot\vec{\sigma}$，该信道在三维布洛赫向量上的精确线性矩阵并非启发式拟合，而是严格的投影分解

$$
\mathbf{K}(\mathbf{n}, \alpha) \;=\; \cos\alpha\,I_3 + (1 - \cos\alpha)\mathbf{n}\mathbf{n}^{\mathsf{T}} \;=\; P_{\mathbf{n}} + \cos\alpha\,(I_3 - P_{\mathbf{n}}),
$$

其本征值为 $(1, \cos\alpha, \cos\alpha)$：沿测量轴 $\mathbf{n}$ 的纵向分量原封保留，垂直于 $\mathbf{n}$ 的两个横向分量同步乘以 $\cos\alpha$（在默认去相干区间 $0 \le \alpha \le \frac{\pi}{2}$ 内单调非负衰减：$\alpha = 0$ 为恒等映射，$\alpha = \frac{\pi}{2}$ 恰为完全未读秩一捏合，而 $\alpha = \pi$ 则是幺正泡利翻转而非不可逆去相干）。当 $N$ 位观察者依次或随机与系统耦合时，必须严格区分三种截然不同的多体复合机制，绝不能用含糊的等号混为一谈：

1. **给定先后次序的确定性乘积（`ordered`）**：$\mathbf{r}_N = \mathbf{K}_{\mathrm{seq}}\mathbf{r}_0$，其中 $\mathbf{K}_{\mathrm{seq}} = \mathbf{K}(\mathbf{n}_N, \alpha_N)\cdots\mathbf{K}(\mathbf{n}_1, \alpha_1)$（第 $1$ 位观察者作用在最右侧）。当各轴斜交时因子互不对易，$\mathbf{K}_{\mathrm{seq}}$ 一般不再对称，单凭汇总张量 $\mathbf{M}_{\mathrm{cons}}$ 无法反推单条有限有序历史；
2. **独立加权随机相遇的系综平均步（`mean`）**：若每次相遇以概率 $w_j$ 独立抽取轴 $\mathbf{n}_j$ 且取公共强度 $\alpha$，由条件期望与独立性得精确单步平均矩阵 $\overline{\mathbf{K}} = \cos\alpha\,I_3 + (1 - \cos\alpha)\mathbf{M}_{\mathrm{cons}}$ 及 $\mathbb{E}[\mathbf{r}_N] = \overline{\mathbf{K}}^{\,N}\mathbf{r}_0$，其主轴本征模态精确缩放因子为 $\overline{\Gamma}_i(N) = \bigl[\lambda_i + (1 - \lambda_i)\cos\alpha\bigr]^N$；
3. **弱耦合连续半群 / 李—特罗特（Lie–Trotter）极限（`weak-limit`）**：利用展开 $\mathbf{K}(\mathbf{n}, \alpha) = I_3 - \frac{1}{2}\alpha^2(I_3 - P_{\mathbf{n}}) + O(\alpha^4)$，在固定有效耗散时间 $t = \frac{1}{2}N\alpha^2$ 下令 $\alpha \to 0,\; N \to \infty$（或取确定性特罗特步 $\cos\alpha_j = e^{-(t/L)w_j}$ 并令 $L \to \infty$），密度矩阵服从林德布拉德（Lindblad）耗散生成元 $\mathcal{L}(\rho) = \frac{1}{2}\sum_{j=1}^N w_j(A_j\rho A_j - \rho)$，布洛赫向量服从精确耗散生成元 $G = \sum_{j=1}^N w_j(I_3 - P_j) = I_3 - \mathbf{M}_{\mathrm{cons}}$：

   $$
   \frac{d\mathbf{r}}{dt} \;=\; -(I_3 - \mathbf{M}_{\mathrm{cons}})\mathbf{r}, \qquad \Gamma_i^{\mathrm{lim}}(N) \;=\; \exp\Bigl[-\frac{1}{2}N\alpha^2(1 - \lambda_i)\Bigr].
   $$

这一公式一举照亮了“共识决定去相干方向”的定量机制：当全体正权重观察者达成**完全共线共识**（$\lambda_1 = 1,\; \lambda_2 = \lambda_3 = 0,\; \kappa = 1$）时，沿共识指针轴 $\mathbf{e}_{\mathrm{ptr}}$ 的纵向极化衰减率为 $1 - \lambda_1 = 0$，有限信道与连续极限均严格给出 $\Gamma_\parallel = 1$（指针布居数分毫无损），而垂直于指针轴的横向相干圆盘在有限对齐信道下精确按 $\Gamma_{\perp,2} = \Gamma_{\perp,3} = (\cos\alpha)^N$ 指数塌缩（小 $\alpha$ 时渐近逼近 $e^{-\frac{1}{2}N\alpha^2}$，例如 $\alpha = 0.4, N = 16$ 时有限值为 $(\cos 0.4)^{16} \approx 0.2683$，连续近似为 $e^{-1.28} \approx 0.2780$，二者不得在有限 $\alpha$ 下直接画等号）；若观察者仅达成部分共识（$\lambda_2 < \lambda_1 < 1$），长时间下三模皆向最大混态 $\frac{1}{2}I_2$ 衰减，但纵向对横向的相对存活比按 $e^{t(\lambda_1 - \lambda_2)}$ 指数拉开，使主本征线涌现为有限时间内的准稳定指针轴。

::: {.remark #rem-ch33-ordered-history-coverage-loss title="同一有限有序历程的初始覆盖量与损失界（手工推导，未形式化）"}
有限有序乘积虽然不能由汇总共识张量重建，却仍可直接从本节的投影分解、正交勾股恒等式与有限 Cauchy–Schwarz 不等式得到一个覆盖量与损失的比较。固定任意整数 $L \ge 1$、一条实际实现的有序历程 $\{(\mathbf{n}_j,\alpha_j)\}_{j=1}^L$，其中 $\|\mathbf{n}_j\|=1$、$\alpha_j\in[0,\pi/2]$，以及任意初始向量 $\mathbf{r}\in\mathbb{R}^3$。记

$$
\begin{aligned}
c_j&=\cos\alpha_j\in[0,1], & a_j&=1-c_j,\\
P_j&=\mathbf{n}_j\mathbf{n}_j^{\mathsf{T}}, & Q_j&=I_3-P_j,\\
\mathbf{x}_0&=\mathbf{r}, & \mathbf{x}_j&=(P_j+c_jQ_j)\mathbf{x}_{j-1}\quad(1\le j\le L).
\end{aligned}
$$

这里 $P_j$ 与 $Q_j$ 分别是轴线及其正交补的正交投影，范数均为欧氏范数。定义**初始覆盖量**与**窗口损失**

$$
\begin{aligned}
C_L(\mathbf{r})&:=\sum_{j=1}^L a_j\|Q_j\mathbf{r}\|^2,\\
D_L(\mathbf{r})&:=\|\mathbf{r}\|^2-\|\mathbf{x}_L\|^2.
\end{aligned}
$$

覆盖量把这条历程中的每根轴都作用于同一个初始向量；损失则沿这条历程实际产生的中间向量计算。两者满足

$$
C_L(\mathbf{r})\;\le\;\frac{L(L+1)}{2}\,D_L(\mathbf{r}).
$$

逐步推导如下。由 $P_i\mathbf{x}_{i-1}\perp Q_i\mathbf{x}_{i-1}$，保留的纵向部分在范数平方相减时消去，故每步损失 $d_i$ 与位移满足

$$
\begin{aligned}
d_i&:=\|\mathbf{x}_{i-1}\|^2-\|\mathbf{x}_i\|^2
     =(1-c_i^2)\|Q_i\mathbf{x}_{i-1}\|^2\ge0,\\
\mathbf{x}_{i-1}-\mathbf{x}_i&=(1-c_i)Q_i\mathbf{x}_{i-1},\\
\|\mathbf{x}_{i-1}-\mathbf{x}_i\|^2
     &=(1-c_i)^2\|Q_i\mathbf{x}_{i-1}\|^2\le d_i,\\
\sum_{i=1}^L d_i&=D_L(\mathbf{r}).
\end{aligned}
$$

其中不等式用到 $(1-c_i)^2\le1-c_i^2$；最后一行沿同一历程裂项相消。现在固定 $1\le j\le L$，令 $\mathbf{v}_i=Q_j(\mathbf{x}_{i-1}-\mathbf{x}_i)$（$1\le i<j$），并令 $\mathbf{v}_j=Q_j\mathbf{x}_{j-1}$。投影的线性性与此前缀的裂项相消给出

$$
\sum_{i=1}^j\mathbf{v}_i
=Q_j\left(\sum_{i=1}^{j-1}(\mathbf{x}_{i-1}-\mathbf{x}_i)+\mathbf{x}_{j-1}\right)
=Q_j\mathbf{r}.
$$

对 $i<j$，由正交投影不增范数及 $0\le a_j\le1$，有 $a_j\|\mathbf{v}_i\|^2\le\|\mathbf{x}_{i-1}-\mathbf{x}_i\|^2\le d_i$；末项则由 $a_j=1-c_j\le1-c_j^2$ 得 $a_j\|\mathbf{v}_j\|^2\le d_j$。于是三角不等式与有限 Cauchy–Schwarz 不等式给出

$$
\begin{aligned}
a_j\|Q_j\mathbf{r}\|^2
&\le a_j\left(\sum_{i=1}^j\|\mathbf{v}_i\|\right)^2\\
&\le j\sum_{i=1}^j a_j\|\mathbf{v}_i\|^2
\le j\sum_{i=1}^j d_i
\le jD_L(\mathbf{r}).
\end{aligned}
$$

再对 $j$ 求和，并用 $\sum_{j=1}^L j=L(L+1)/2$，便得到所述三角形系数的界。若对所考察的初始向量已有相对覆盖下界 $C_L(\mathbf{r})\ge\gamma\|\mathbf{r}\|^2$（$\gamma>0$），则**同一有限窗口**必有 $D_L(\mathbf{r})\ge\frac{2\gamma}{L(L+1)}\|\mathbf{r}\|^2$；非零初始向量因此有严格正的损失。这并不自动提供后续窗口的覆盖下界，也不把这一实际有序历程等同于独立同分布抽样的系综平均、汇总张量的谱衰减或弱耦合连续极限。

整个推导没有除以 $a_j$、$c_j$ 或向量范数，也不要求轴互异、因子对易、严格衰减或正的覆盖下界才能成立。因此 $L=1$、$\alpha_j=0$ 或 $\pi/2$、重复或共线轴以及 $\mathbf{r}=0$ 均包括在内。它在上述线性模型中对所有 $\mathbf{r}\in\mathbb{R}^3$ 成立；只有 $\|\mathbf{r}\|\le1$ 才对应物理密度态，$D_L$ 是范数平方损失，不是熵产或现实测量的实验证据。此处完整推论仅为手工推导，尚未作精确 Lean 陈述的编译、内核验证或公理闭包检查；相邻冻结定理不构成这条完整推论的形式化验证。系数来自上述有限求和，不主张其最优性。
:::

更进一步，在完全捏合极限 $\alpha = \frac{\pi}{2}$ 下（经幺正基变换将指针轴旋至计算基），被删去的横向圆盘分量 $\rho_{+-} = \frac{1}{2}(r_2 - i r_3)$ 恰是希尔伯特—施密特勾股分解中的正交余项，单步全捏合的冯·诺依曼熵增精确等于量子相对熵，而后续重复同轴捏合因幂等律（[@thm-ch33-observer-pinching-and-memory-spectrum] 第 1 款）熵增归零，最终不动点恰由跨记录块相干归零刻画：

::: {.theorem #thm-ch33-consensus-pinching-and-fixed-points title="单比特捏合希尔伯特—施密特勾股恒等式、相干删除熵产恒等式与未读记录不动点判据" lean="D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity D5/S3/Observer/Conditioning.unreadState_fixed_iff"}
在 `trureturing` 冻结的量子信道捏合、熵产动力学与观察者条件化模块中，以下三项定理同时成立：

1. **单比特计算基捏合的希尔伯特—施密特勾股分解**（[`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean)）：对任意 $2 \times 2$ 复矩阵 $\rho \in \mathrm{QubitMatrix} = M_{\operatorname{Fin} 2}(\mathbb{C})$，记计算基对角捏合为 $\operatorname{pinching}(\rho)$，希尔伯特—施密特内积为 $\langle A, B \rangle_{\mathrm{HS}} = \operatorname{Tr}(A^\dagger B)$，则总范数平方精确正交分解为保留对角部分与丢弃非对角相干部分之和：

   $$
   \langle \rho, \rho \rangle_{\mathrm{HS}} \;=\; \langle \operatorname{pinching}(\rho), \operatorname{pinching}(\rho) \rangle_{\mathrm{HS}} \;+\; \langle \rho - \operatorname{pinching}(\rho),\, \rho - \operatorname{pinching}(\rho) \rangle_{\mathrm{HS}};
   $$

2. **幺正共轭接完全基捏合序列的逐拍与累积熵产恒等式**（[`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity)）：设 $n$ 为有限可判定类型，$U \in \operatorname{unitaryGroup}(n, \mathbb{C})$ 为固定幺正矩阵，密度态序列 $\rho : \mathbb{N} \to \operatorname{DensityState} n$ 满足递推律 $\forall k \in \mathbb{N},\; \rho(k + 1) = \operatorname{basisPinchingState}(\sigma_k)$（其中 $\sigma_k := \operatorname{unitaryConjugateState}\; U\; h_U\; (\rho(k))$，冯·诺依曼熵 $S_{\mathrm{vN}}$ 与量子相对熵 $D(\cdot\,\|\,\cdot)$ 均以自然对数计）。则每一步熵增精确等于捏合前态对其基捏合态的非负相对熵，且有限 $N$ 步总熵变精确裂项求和：

   $$
   \forall k \in \mathbb{N},\quad S_{\mathrm{vN}}(\rho(k+1)) - S_{\mathrm{vN}}(\rho(k)) = D\bigl(\sigma_k \,\big\|\, \operatorname{basisPinchingState}(\sigma_k)\bigr) \ge 0, \qquad S_{\mathrm{vN}}(\rho(N)) - S_{\mathrm{vN}}(\rho(0)) = \sum_{k=0}^{N-1} D\bigl(\sigma_k \,\big\|\, \operatorname{basisPinchingState}(\sigma_k)\bigr);
   $$

3. **完备正交记录测量下未读状态的不动点充要判据**（[`unreadState_fixed_iff`](lean:D5/S3/Observer/Conditioning.unreadState_fixed_iff)）：设 $n, \kappa$ 为有限可判定类型，投影族 $P : \kappa \to M_n(\mathbb{C})$ 满足记录测量公理 `IsRecordMeasurement P`。对任意矩阵 $\rho \in M_n(\mathbb{C})$，未读记录信道保持 $\rho$ 不动当且仅当一切跨记录分支相干块全为零：

   $$
   \operatorname{unreadState}(P)(\rho) = \rho \;\Longleftrightarrow\; \forall k, l \in \kappa,\; k \neq l \implies P_k \rho P_l = 0.
   $$
:::

::: proof
第 1 款展开 $2 \times 2$ 矩阵的对角投影 $\operatorname{pinching}(\rho)$ 与非对角余项 $\rho - \operatorname{pinching}(\rho)$，因两者支撑元素处处不相交，交叉迹项 $\langle \operatorname{pinching}(\rho), \rho - \operatorname{pinching}(\rho) \rangle_{\mathrm{HS}} = 0$，勾股恒等式直接成立。第 2 款利用幺正共轭熵不变性 $S_{\mathrm{vN}}(\sigma_k) = S_{\mathrm{vN}}(\rho(k))$ 与完全基捏合交叉迹恒等式 $\operatorname{Tr}(\sigma_k \ln \operatorname{basisPinchingState}(\sigma_k)) = \operatorname{Tr}(\operatorname{basisPinchingState}(\sigma_k) \ln \operatorname{basisPinchingState}(\sigma_k))$ 证得单步相对熵恒等式，结合克莱因不等式给出非负性并经有限归纳裂项求和得 $N$ 步总账。第 3 款正向在 $\operatorname{unreadState}(P)(\rho) = \rho$ 两端左乘 $P_k$、右乘 $P_l$（$k \neq l$），由 $P_k P_m = \delta_{km} P_k$ 使左端化为零从而 $P_k \rho P_l = 0$；反向由完备性 $\sum_k P_k = 1$ 将 $\rho = \sum_{k,l} P_k \rho P_l$ 中的非对角项全部消去即得 $\sum_k P_k \rho P_k = \rho$。完整证明由 Lean 内核检查。
:::

注意 [@thm-ch33-consensus-pinching-and-fixed-points] 的两道精确适用护栏：第 2 款要求每步均为固定幺正演化后接**完全基捏合**（取 $U = I$ 即给出单次全捏合熵增 $\Delta S_{\mathrm{vN}} = D(\rho\,\|\,\mathcal{P}(\rho))$，换算为比特只需两边同除以 $\ln 2$；部分强度的分数阶泡利去相干 $0 < \alpha < \frac{\pi}{2}$ 并不满足 $\Delta S_{\mathrm{vN}} = D(\rho\,\|\,\mathcal{E}(\rho))$）；第 3 款刻画的是对角（或块对角）混合态不动点，本身并不声称单靠线性信道就坍缩出了单一结果。下方实验卡直观呈现共线共识下纵向指针存留与横向圆盘收缩：

::: {.viz src="observer-consensus-decoherence" preset="axis-consensus" height="500"}
**共线轴共识与横向相干收缩卡（`axis-consensus`）**：十六根等权观察者轴沿 $\pm z$ 共线排列（正负交替验证符号不变性），$\lambda = (1, 0, 0),\; \kappa = 1$。对初态 $\mathbf{r}_0 = (1, 0, 1)/\sqrt{2}$ 施加 $N = 16, \alpha = 0.4$ 的精确泡利信道序列：青色纵向极化 $r_z = 1/\sqrt{2}$ 精确守恒（$\Gamma_\parallel = 1$），品红横向相干圆盘按 $(\cos\alpha)^k$ 逐拍收缩；拨动独立“完全捏合（$\alpha = \pi/2$）”开关可即时检验希尔伯特—施密特勾股分解、全捏合相对熵增与对角不动点判据（[@thm-ch33-consensus-pinching-and-fixed-points]）。
:::

## 33.5.3 量子达尔文主义冗余平台、局部翻转阻断与共识账本交集核 {#sec-ch33-consensus-darwinism-kernel}

既然单靠未读去相干信道只会留下指针基上的经典概率混合，为什么在日常经验中，十位路人先后打量同一块路标，读到的总是一致的经典指针标签，而且任何一位路人把自己的笔记擦掉都无法让路标重新回到叠加态？要算清这本账，我们转入固定公共指针基 $\{|0\rangle_S, |1\rangle_S\}$ 下的**纯双分支受控记录模型**（`手工推导`，与上一小节一般非共线泡利信道严格区分）：设系统初态与 $N$ 份空白观察者记录经等距分支耦合演化为全局纯态

$$
|\Psi\rangle \;=\; \sqrt{p_0}\,|0\rangle_S \bigotimes_{j=1}^N |\phi_j^{(0)}\rangle \;+\; e^{i\chi}\sqrt{p_1}\,|1\rangle_S \bigotimes_{j=1}^N |\phi_j^{(1)}\rangle \qquad (p_0, p_1 \ge 0,\; p_0 + p_1 = 1),
$$

记第 $j$ 份记录的条件态内积重叠为 $c_j := \langle\phi_j^{(0)}\mid\phi_j^{(1)}\rangle$（实重叠标准实现如 $|\phi_j^{(0)}\rangle = (1, 0)^{\mathsf{T}},\, |\phi_j^{(1)}\rangle = (\cos\alpha_j, \sin\alpha_j)^{\mathsf{T}}$，由受控旋转 $U_j = |0\rangle\langle 0| \otimes I_2 + |1\rangle\langle 1| \otimes R_y(2\alpha_j)$ 精确生成，偏迹第 $j$ 份记录恰把系统非对角相干乘以 $c_j = \cos\alpha_j$）。对任意包含 $m$ 位观察者的子集 $F \subseteq \{1, \dots, N\}$（记补集为 $F^c$，重叠乘积 $\Pi_F := \prod_{j \in F} c_j$，$\Pi_\varnothing := 1$），边缘记录态 $\rho_F = p_0 |\Phi_F^{(0)}\rangle\langle\Phi_F^{(0)}| + p_1 |\Phi_F^{(1)}\rangle\langle\Phi_F^{(1)}|$ 的秩至多为 $2$，与 $2 \times 2$ 格拉姆矩阵

$$
V_F^\dagger V_F \;=\; \begin{pmatrix} p_0 & \sqrt{p_0 p_1}\,\Pi_F \\ \sqrt{p_0 p_1}\,\overline{\Pi_F} & p_1 \end{pmatrix}, \qquad \det(V_F^\dagger V_F) \;=\; p_0 p_1\bigl(1 - |\Pi_F|^2\bigr)
$$

共享全部非零本征值 $\frac{1 \pm d(\Pi_F)}{2}$，其中判别式因子 $d(q) := \sqrt{1 - 4 p_0 p_1(1 - |q|^2)}$。记二元香农熵为 $H_2(x) = -x\log_2 x - (1-x)\log_2(1-x)$ 并令 $h(q) := H_2\bigl(\frac{1 - d(q)}{2}\bigr)$，因全局态 $|\Psi\rangle$ 为纯态故 $S(\rho_{SF}) = S(\rho_{F^c})$，无须对角化 $2^{N+1} \times 2^{N+1}$ 指数巨阵即可在 $O(N)$ 前缀—后缀乘积内算出任意观察者片段 $\mathcal{O}_m = \{1, \dots, m\}$ 与系统的精确量子互信息（以比特计）：

$$
S(\rho_S) = h(\Pi_{\mathrm{all}}), \quad S(\rho_{\mathcal{O}_m}) = h(\Pi_F), \quad S(\rho_{S\mathcal{O}_m}) = h(\Pi_{F^c}), \quad I(S : \mathcal{O}_m) \;=\; h(\Pi_{\mathrm{all}}) + h(\Pi_F) - h(\Pi_{F^c}).
$$

这条精确解析曲线揭示了三道标志性台阶：（1）在左端点 $m = 0$，$\Pi_\varnothing = 1, h(1) = 0$，故 $I(S : \varnothing) = 0$；（2）在内部区间 $0 < m < N$，只要 $0 < p_0 < 1$ 且已读重叠积 $|\Pi_F|$ 与未读重叠积 $|\Pi_{F^c}|$ 均充分小（例如基准参数 $N = 16,\, p_0 = \frac{1}{2},\, c_j = 0.3$ 时，在整段 $m = 3, \dots, 13$ 上 $|I(S : \mathcal{O}_m) - S(\rho_S)| < 5.26 \times 10^{-4}\text{ bits}$），三项熵同时贴近经典指针香农熵 $H_2(p_0)$，从而拉出一条平坦的**经典冗余共识平台** $I(S : \mathcal{O}_m) \approx H_2(p_0)$——哪怕只访问一小撮观察者片段，也能几乎读尽指针分支的全部经典信息（注意：这条平台刻画的是纯双分支对齐态下跨片段的冗余经典关联，并不代表非幺正单结果坍缩）；（3）在右端点 $m = N$ 把**全体** $N$ 份记录尽数收拢（$\Pi_\varnothing = 1, h(\Pi_{F^c}) = 0$），互信息达到全纯化量子上限 $I(S : \mathcal{O}_N) = 2 S(\rho_S)$！

这恰恰解释了为什么局部观察者感到“历史不可逆”：在上述受控旋转模型中，若你只能对其中的可控子集 $A \subset \{1, \dots, N\}$ 施加逆门 $U_j^\dagger$，系统残余非对角相干模长只恢复到 $|\rho_{01}^{\mathrm{res}}| = \sqrt{p_0 p_1}\prod_{j \notin A}|c_j|$——只要哪怕漏掉唯一一份正交拷贝（$c_k = 0$）或低重叠拷贝（$|c_k| < 1$），局部相干依然被死死锁住！在 `trureturing` 中，幺模振幅共轭信道的幸存副本阻断与双副本精确复原证书、受控正交拷贝的偏迹访问缺陷，以及多观察者乘积读出的划分拓扑核共同构成了这一机制的形式底座：

::: {.theorem #thm-ch33-consensus-redundant-records-and-kernel title="幸存副本反演阻断、双副本相位逆转证书、偏迹记录访问缺陷与划分拓扑不可分核" lean="D5/S3/ObserverMemory/JointCoherentReversal.surviving_copy_blocks_reversal D5/S3/ObserverMemory/JointCoherentReversal.two_copy_joint_reversal_certificate D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel"}
在 `trureturing` 冻结的观察者记忆相干逆转、退相干访问缺陷与观测划分拓扑模块中，以下四项定理同时成立：

1. **单一幸存记录副本对局部振幅共轭逆转的精确阻断**（[`surviving_copy_blocks_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.surviving_copy_blocks_reversal)）：设 `Copy` 为有限可判定副本类型，环境记录族 $\mathrm{records} : \mathrm{Copy} \to \mathrm{EnvironmentRecord}$，矩阵 $\rho \in \mathrm{QubitMatrix}$，指标 $i, j \in \operatorname{Fin} 2$ 与特定副本 $k \in \mathrm{Copy}$。记 $c_l := \operatorname{recordOverlap}(\mathrm{records}\; l)\; i\; j$；若除 $k$ 以外的一切副本均满足幺模条件 $\forall l \neq k,\; \overline{c_l}\, c_l = 1$，而第 $k$ 份幸存副本满足 $c_k \neq 1$ 且初始矩阵元 $\rho_{ij} \neq 0$，则对除 $k$ 外的全部副本施加记录振幅共轭逆信道后，$(i, j)$ 矩阵元变为 $c_k \rho_{ij}$，严格无法复原初始值：

   $$
   \operatorname{reverseChannelOn}(\operatorname{Finset.univ.erase}\; k)\;\mathrm{records}\bigl(\operatorname{multiRecordChannel}\;\mathrm{records}\;\rho\bigr)_{ij} \;\neq\; \rho_{ij};
   $$

2. **双副本相位记录局部失配与全集联合复原的四值证书**（[`two_copy_joint_reversal_certificate`](lean:D5/S3/ObserverMemory/JointCoherentReversal.two_copy_joint_reversal_certificate)）：令 $\rho = \operatorname{equalSuperpositionDensity}$，取仅在地址 $a = 0$ 非零、条件振幅为 $1$（$i = 0$）与 $i$（$i = 1$，重叠为 $-i$）的相位记录 $\mathrm{phaseRecord}$ 及其双副本族 $\mathrm{records} : \operatorname{Fin} 2 \to \mathrm{EnvironmentRecord}$，则 $(0, 1)$ 相干矩阵元在初始、写入双副本、仅逆转第 $0$ 份副本与联合逆转全部两份副本四个阶段精确取以下四个复数值：

   $$
   \rho_{01} = \frac{1}{2}, \quad \operatorname{multiRecordChannel}(\mathrm{records}, \rho)_{01} = -\frac{1}{2}, \quad \operatorname{reverseChannelOn}(\{0\}, \mathrm{records}, \dots)_{01} = -\frac{i}{2}, \quad \operatorname{reverseChannelOn}(\mathrm{univ}, \mathrm{records}, \dots)_{01} = \frac{1}{2};
   $$

3. **受控拷贝的约化态不可逆性纯粹源于记录访问缺陷**（[`reduced_irreversibility_is_access_defect`](lean:D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect)）：设 $\rho, \sigma \in \mathrm{QubitMatrix}$ 对角元处处相等（$\forall i,\; \rho_{ii} = \sigma_{ii}$）但至少一处非对角元相异（$\exists i \neq j,\; \rho_{ij} \neq \sigma_{ij}$）。则受控拷贝算子 $\mathrm{copyUnitary} \in \operatorname{unitaryGroup}(\operatorname{Fin} 2 \times \operatorname{Fin} 2, \mathbb{C})$ 将空白环境初态幺正演化为相异的联合记录态 $\tau_\rho \neq \tau_\sigma$，但偏迹环境后的约化矩阵完全重合 $\operatorname{traceEnvironment}(\tau_\rho) = \operatorname{traceEnvironment}(\tau_\sigma)$，故不存在任何仅依赖约化矩阵的恢复映射能同时还原 $\tau_\rho$ 与 $\tau_\sigma$；反之，对联合记录态施加伴随算子 $\operatorname{star}\;\mathrm{copyUnitary}$ 则同时精确复原两份原始输入；
4. **概念读出划分拓扑的不可分关系与读出等值核恒等式**（[`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel)）：对任意类型 $X, B$、读出映射 $\mathrm{readout} : \operatorname{Concept} X B$ 及状态 $x, y \in X$，$x$ 与 $y$ 在划分拓扑 $\operatorname{partitionTopology}(\mathrm{readout})$ 下拓扑不可分当且仅当读出赋予它们完全相同的值：

   $$
   \operatorname{Inseparable}_{\operatorname{partitionTopology}(\mathrm{readout})}(x, y) \;\Longleftrightarrow\; \mathrm{readout}(x) = \mathrm{readout}(y).
   $$
:::

::: proof
第 1 款展开多副本记录信道与逆信道的逐元阿达马乘积，消去一切 $l \neq k$ 上的幺模因子 $\overline{c_l} c_l = 1$ 后只剩 $c_k \rho_{ij}$，由 $c_k \neq 1$ 与 $\rho_{ij} \neq 0$ 得 $c_k \rho_{ij} \neq \rho_{ij}$。第 2 款直接代入双副本重叠 $-i$，依次核验 $(-i)^2 \cdot \frac{1}{2} = -\frac{1}{2}$、$i \cdot (-\frac{1}{2}) = -\frac{i}{2}$ 与 $i^2 \cdot (-\frac{1}{2}) = \frac{1}{2}$。第 3 款核验受控拷贝置换的幺正性、偏迹对角保留与非对角消去，由相同输入必有相同函数输出证伪单侧恢复映射，再由伴随矩阵乘积还原空白环境初态。第 4 款展开拉回离散拓扑的开集包定义即得不可分等价于函数值相等。完整证明由 Lean 内核检查。
:::

这里同样要看清两条精细的数学边界：第一，[@thm-ch33-consensus-redundant-records-and-kernel] 第 1、2 款中的 `reverseChannelOn` 是对记录振幅作共轭，仅在幺模相位重叠 $|c_l| = 1$ 时构成信道逆（对 $|c| < 1$ 的有噪分支记录作振幅共轭只会把相干再乘一次 $|c|^2$ 而非复原，故有噪分支的可逆擦除必须通过联合受控逆门 $U_j^\dagger$ 实现，第 2 款的四值相位证书则在实验卡中单独成窗展示）；第二，将第 4 款应用于多观察者乘积读出 $R(x) = (r_1(x), \dots, r_N(x))$ 得到的是各观察者等值核的**交集** $\bigcap_{j=1}^N \ker_{\mathrm{eq}}(r_j)$（比单个读出更细，绝不能误称为“共同知识”或与线性零空间 $\ker\mathbf{M}_{\mathrm{cons}}$ 混同；真正的跨语境公共客观因子仍须按 [@thm-ch33-contextual-attractor-and-common-factor] 第 4 款另行给出不变商映射见证）。

::: {.viz src="observer-consensus-decoherence" preset="darwinism-plateau" height="500"}
**量子达尔文主义冗余平台与局部逆转阻断卡（`darwinism-plateau`）**：纯双分支受控记录模型（$N = 16,\, p_0 = \frac{1}{2},\, c_j = 0.3$）。随已读观察者片段规模 $m = 0 \dots 16$ 推进，精确互信息曲线从 $I(0) = 0$ 迅速跃上逼近 $1\text{ bit}$ 的平坦经典冗余平台（$m = 3 \dots 13$ 偏差小于 $5.3 \times 10^{-4}\text{ bits}$），直到底端 $m = 16$ 全局联合访问时才翘升至 $2 S(\rho_S)$。拨动记录逆转开关可检验未控副本重叠积对残余相干的封锁，独立附图展示 `two_copy_joint_reversal_certificate` 的 $\frac{1}{2} \to -\frac{1}{2} \to -\frac{i}{2} \to \frac{1}{2}$ 四步复数相位轨迹（[@thm-ch33-consensus-redundant-records-and-kernel]）。
:::

## 33.5.4 双维格纳正交共识泡、局域友好性禁行界与新维度拓荒残差 {#sec-ch33-consensus-wigner-pioneers}

现在我们逼近最富戏剧性的极限思想实验：**假如宇宙中没有统一的单一共识，而是同时存在着两团相互隔离、丈量轴彼此垂直（$90^\circ$）的观察者共识泡——比如一团锁在 $Z$ 轴上的观察者泡 $\mathcal{C}_A$ 与另一团锁在 $X$ 轴上的观察者泡 $\mathcal{C}_B$——会发生什么？**

先在单比特布洛赫空间里把账算得一清二楚，切忌张冠李戴（`手工推导`）：若把两团等权正交观察者合写成一个总张量 $\mathbf{M}_{AB} = \frac{1}{2}(\mathbf{x}\mathbf{x}^{\mathsf{T}} + \mathbf{z}\mathbf{z}^{\mathsf{T}})$，其降序本征谱为 $(\frac{1}{2}, \frac{1}{2}, 0)$，主谱隙 $\Delta\lambda = 0$——尽管 $\mathcal{C}_A$ 内部有明确的 $Z$ 指针、$\mathcal{C}_B$ 内部有明确的 $X$ 指针，两泡合并后**根本不存在唯一的全局顶层指针轴**，在两泡均以非零强度耦合时，两者的公共未读不动点集合坍缩为球心孤点 $\{\frac{1}{2}I_2\}$。写成 $\mathbf{K}(\mathbf{n},c) = cI_3 + (1-c)\mathbf{n}\mathbf{n}^{\mathsf{T}}$ 后，参数化布洛赫轴结果 [@thm-ch33-axis-contraction-commutator] 给出**未读（unread）**泡利去相干超算符的精确矩阵换位子：

$$
[\mathbf{K}_{\mathbf{n}}, \mathbf{K}_{\mathbf{m}}] \;=\; (1 - \cos\alpha_n)(1 - \cos\alpha_m)(\mathbf{n}\cdot\mathbf{m})\bigl(\mathbf{n}\mathbf{m}^{\mathsf{T}} - \mathbf{m}\mathbf{n}^{\mathsf{T}}\bigr),
$$

::: {.theorem #thm-ch33-axis-contraction-commutator title="参数化布洛赫轴收缩换位子恒等式与斜交轴非对易判据" lean="D5/S3/Quantum/Measurement/Bloch/AxisContractionCommutator.axisOuter_eq_implies_parallel D5/S3/Quantum/Measurement/Bloch/AxisContractionCommutator.axisContraction_commutator D5/S3/Quantum/Measurement/Bloch/AxisContractionCommutator.axisContraction_commutator_ne_zero_of_nonparallel_nonorthogonal"}
冻结的布洛赫轴模块给出三条代数事实。第一，若第一根轴向量非零，且交换两轴后秩一外积矩阵不变，则第二根轴是第一根轴的实数倍。第二，对任意三坐标向量 $\mathbf{n},\mathbf{m}$ 与实数因子 $c,d$，有

$$
\mathbf{K}(\mathbf{n},c)\mathbf{K}(\mathbf{m},d)-\mathbf{K}(\mathbf{m},d)\mathbf{K}(\mathbf{n},c)
= (1-c)(1-d)(\mathbf{n}\cdot\mathbf{m})\bigl(\mathbf{n}\mathbf{m}^{\mathsf T}-\mathbf{m}\mathbf{n}^{\mathsf T}\bigr).
$$

因此，只要第一根轴非零、第二根轴不平行、两轴点积非零且 $c,d\ne 1$，换位子就非零。
:::

::: proof
第一条事实选取 $n_i\ne 0$ 的坐标 $i$。外积相等给出对每个 $j$ 都有 $n_i m_j=m_i n_j$，因而 $\mathbf{m}=(m_i/n_i)\mathbf{n}$。恒等式逐元展开两个矩阵乘积与有限的三坐标点积，再将所得多项式表达式归一化。对于非对易结论，第一条事实与不平行假设说明反对称外积差非零；非零点积与 $c,d\ne 1$ 又使其标量系数非零。完整证明由 Lean 内核检查。
:::

在 §33.5.2 的单比特信道解释中，轴是单位向量，且 $c=\cos\alpha_n$、$d=\cos\alpha_m$ 位于 $[0,1]$；Lean 结果本身是代数矩阵命题，不声称某个 CPTP 实现。作为精确代数实例，取 $\mathbf{e}=(1,0,0)$、$\mathbf{m}=(3/5,4/5,0)$、$c=1/2$、$d=1/3$。$\mathbf{K}(\mathbf{e},c)\mathbf{K}(\mathbf{m},d)$ 与 $\mathbf{K}(\mathbf{m},d)\mathbf{K}(\mathbf{e},c)$ 的 $(0,1)$ 元分别为 $8/25$ 与 $4/25$。

对于单位轴，这一换位子在平行（$\mathbf{n}\cdot\mathbf{m} = \pm 1$）**与严格正交**（$\mathbf{n}\cdot\mathbf{m} = 0$）两处均精确为零；在 $45^\circ$ 等斜交情形且两个因子均不等于 $1$ 时则非零。因此，$90^\circ$ 正交双泡的先后次序冲突**并非**来自未读退相干信道，而是来自**选择性条件更新（selective instrument）** $\mathcal{J}_{\mathbf{n},+}(\rho) = P_{\mathbf{n},+}\rho P_{\mathbf{n},+}$（其中 $P_{\mathbf{n},+} = \frac{1}{2}(I_2 + \mathbf{n}\cdot\vec{\sigma})$）：从最大混态 $\frac{1}{2}I_2$ 出发，先读 $Z_+$ 再读 $X_+$ 得到 $\mathcal{J}_{X,+}(\mathcal{J}_{Z,+}(\frac{1}{2}I_2)) = \frac{1}{4}P_{X,+}$，而先读 $X_+$ 再读 $Z_+$ 得到 $\mathcal{J}_{Z,+}(\mathcal{J}_{X,+}(\frac{1}{2}I_2)) = \frac{1}{4}P_{Z,+}$——两条分支发生概率同为 $\frac{1}{4}$，归一化条件终态却分别落在 $|+X\rangle$ 与 $|+Z\rangle$（未归一化希尔伯特—施密特范数差恰为 $\frac{1}{4}$）。在离散信念集合修正层面，冲突重置更新的非对易性与有限共识子空间外的单位正交逃逸则由以下两条冻结定理精确刻画：

::: {.theorem #thm-ch33-consensus-revision-and-escape title="冲突信念修正次序非对易性与闭子空间正交余项单位逃逸定理" lean="D5/S3/ConceptDynamics/Revision/RevisionConflictNoncommutation.revision_conflict_noncommutation D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape"}
在 `trureturing` 冻结的概念冲突修正与有限层投影逃逸模块中，以下两项定理同时成立：

1. **三世界冲突重置信念修正算子的次序非对易性**（[`revision_conflict_noncommutation`](lean:D5/S3/ConceptDynamics/Revision/RevisionConflictNoncommutation.revision_conflict_noncommutation)）：在有限三元状态集 $\operatorname{Fin} 3 = \{0, 1, 2\}$ 上，定义冲突重置修正算子 $\operatorname{revision}(P, A)$ 在 $A \cap P \neq \varnothing$ 时取交集 $A \cap P$、否则重置为新证据集 $P$。取初始信念集 $A = \{0\}$ 及两份证据集 $P = \{1, 2\},\; Q = \{0, 1\}$，则单步与两步复合精确满足

   $$
   \operatorname{revision}(P, A) = P,\quad \operatorname{revision}(Q, A) = A,\quad \operatorname{revision}(Q, \operatorname{revision}(P, A)) = \{1\},\quad \operatorname{revision}(P, \operatorname{revision}(Q, A)) = P = \{1, 2\},
   $$

   从而先后次序严格不可交换：$\operatorname{revision}(Q, \operatorname{revision}(P, A)) \neq \operatorname{revision}(P, \operatorname{revision}(Q, A))$；
2. **非平凡正交补下的单位残差向量与单位余投影算子范数**（[`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape)）：设 $\mathbb{K}$ 满足 `[RCLike 𝕜]`，$V$ 为 $\mathbb{K}$ 上的完备内积空间，$S \le V$ 为闭子空间（`[IsClosed (S : Set V)]`）且正交补非退化 $S^\perp \neq \bot$。则必存在正交逃逸向量 $e \in S^\perp$ 满足

   $$
   \|e\| = 1,\qquad S.\mathrm{starProjection}(e) = 0,\qquad \operatorname{infDist}(e, S) = 1,\qquad \bigl\|\operatorname{id}_{\mathbb{K},V} - S.\mathrm{starProjection}\bigr\| = 1.
   $$
:::

::: proof
第 1 款在 $\operatorname{Fin} 3$ 上直接核验集合交是否非空：$\{0\} \cap \{1, 2\} = \varnothing$ 触发重置得 $\{1, 2\}$，再与 $\{0, 1\}$ 相交得非空单点集 $\{1\}$；反序下 $\{0\} \cap \{0, 1\} = \{0\}$ 保持 $\{0\}$，再遇 $\{1, 2\}$ 交集为空而重置为 $\{1, 2\} \neq \{1\}$。第 2 款由子空间 $S^\perp \neq \bot$ 取出非零向量并归一化得单位元 $e \in S^\perp$，由正交补性质知 $P_S e = 0$，对任意 $s \in S$ 由勾股定理 $\|e - s\|^2 = \|e\|^2 + \|s\|^2 = 1 + \|s\|^2 \ge 1$（在 $s = 0$ 取等）定出 $\operatorname{infDist}(e, S) = 1$，并结合余投影有界性 $\|\operatorname{id} - P_S\| \le 1$ 与在 $e$ 处达界锁定算子范数等于 $1$。完整证明由 Lean 内核检查。
:::

当我们将两座局部观察者泡提升为类空分离的两间编码逻辑实验室（各自以等距映射 $V_A|k\rangle = |k\rangle|F_k\rangle$ 将待测比特与“朋友记录”相干绑定），并允许外部超级观察者在各自实验室上执行包含联合逆耦合在内的互补基测量时，“是否存在一套独立于观察者测量语境、同时赋予所有已观测事件单一全局布尔真值的绝对客观账本”就不再只是哲学思辨，而是可以被严格不等式检验的物理命题。下方实验卡并列呈现单系统双正交泡更新对照与双实验室局域友好性（Local Friendliness, LF）违背见证，其完整文献出处与假设边界紧随其后归档：

::: {.viz src="observer-consensus-decoherence" preset="dual-wigner-bubbles" height="500"}
**双维格纳正交共识泡与局域友好性违背卡（`dual-wigner-bubbles`）**：主舞台上半部分对比 $Z$ 泡与 $X$ 泡（等权合并谱 $(\frac{1}{2}, \frac{1}{2}, 0)$ 无唯一全局主轴）：未读去相干 $[\mathbf{K}_Z, \mathbf{K}_X] = 0$ 顺序一致（可切换 $45^\circ$ 斜交轴观察非零未读换位子），而选择性分支更新终态分岔为 $|+X\rangle$ 与 $|+Z\rangle$（附三世界集合修正非对易小窗，[@thm-ch33-consensus-revision-and-escape] 第 1 款）；下半部分展示双编码实验室 LF 见证：经局部标架旋转使双方第 $1$ 档读各自朋友记录（$A_1 = Z,\; B_1' = X$），在纯态可见度 $v = 1$ 时取得 $F_{\mathrm{LF}} = \sqrt{5} + 3 + \sqrt{2 + \sqrt{2}} \approx 7.0838 > 6$，并在白噪声阈值 $v_{\mathrm{crit}} \approx 0.8470$ 处精确跨过 LF 多胞体上界 $6$。
:::

::: {.remark #rem-ch33-quantum-darwinism-local-friendliness-literature title="环境诱导超选择、量子达尔文主义与扩展维格纳朋友局域友好性定理（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节关于宏观指针基冗余存储与跨观察者“观测事件绝对性”禁行界的三组核心物理文献结论未包含在 `trureturing@dev` 锁定声明集中，其精确出处与成立前提如下：

1. **环境诱导超选择（Einselection）与量子达尔文主义冗余平台（W. H. Zurek, *Phys. Rev. D* **24**, 1516, 1981；*Rev. Mod. Phys.* **75**, 715, 2003；*Nature Physics* **5**, 181–188, 2009；R. Blume-Kohout & W. H. Zurek, *Found. Phys.* **35**, 1857–1876, 2005）**：祖雷克等人指出，与环境的持续监测使对易（或最抗去相干）的指针态成为动力学稳定岛，并在纯多自旋分支环境中导出量子互信息 $I(S : \mathcal{F}_m)$ 随环境片段比例 $f = m/N$ 在 $0 < f < 1$ 内部呈平坦经典平台 $H(S)$、在 $f \to 1$ 翘升至 $2H(S)$ 的特征曲线。正如上文推导所标明，该闭式平台依赖对齐无损分支与初始无关联纯记录假设，刻画的是经典记录的冗余广播而非单次结果的非幺正坍缩；
2. **扩展维格纳朋友无绝对事实论证（Č. Brukner, *Entropy* **20**, 350, 2018；D. Frauchiger & R. Renner, *Nat. Commun.* **9**, 3711, 2018）**：将维格纳朋友思想实验与贝尔纠缠结合，论证若假设量子演化对包含内部观察者的封闭实验室普遍有效，则无法把各内部朋友记录与外部超级观察者测量结果无矛盾地拼入同一张脱语境全局真值表；
3. **真正局域友好性（Genuine Local Friendliness）多胞体不等式与量子违背见证（K.-W. Bong et al., *Nature Physics* **16**, 1199–1205, 2020）**：在无需假定内部结果由局部隐变量预先决定的更弱前提——**已观测事件绝对性（Absoluteness of Observed Events, AOE）**、**局域性（参数独立性）**与**无超决定论（测量选择独立性）**——之下，双边各取三档输入 $x, y \in \{1, 2, 3\}$、二值输出 $a, b \in \{-1, +1\}$（第 $1$ 档读取朋友结果）的关联多胞体（共 $96$ 个顶点，严格大于局部贝尔多胞体）恒满足真正 LF 小面不等式

   $$
   F_{\mathrm{LF}} \;:=\; -a_1 - a_2 - b_1 - b_2 - E_{11} - 2E_{12} - 2E_{21} + 2E_{22} - E_{23} - E_{32} - E_{33} \;\le\; 6,
   $$

   其中 $a_x = \langle A_x\rangle,\; b_y = \langle B_y\rangle,\; E_{xy} = \langle A_x B_y\rangle$。在理想相干受控的双编码量子比特模型中，对最大纠缠态 $|\Phi^+\rangle$ 取 $XZ$ 平面单位泡利观测量 $A_1 = Z,\, A_2 = X,\, A_3 = (X+Z)/\sqrt{2}$ 与 $B_1 = -(Z+2X)/\sqrt{5},\, B_2 = -[(2+\frac{1}{\sqrt{2}})Z + (-2+\frac{1}{\sqrt{2}})X]/3,\, B_3 = -[\frac{1}{\sqrt{2}}Z + (1+\frac{1}{\sqrt{2}})X]/\sqrt{2+\sqrt{2}}$（再对乙方态与算符同步施加绕 $Y$ 轴旋转 $\theta = \operatorname{atan2}(-1, -2)$，即使得 $A_1 = Z,\, B_1' = X$ 而一切关联不变），各局域均值为零且精确给出违背值

   $$
   F_{\mathrm{LF}} \;=\; \|A_1 + 2A_2\| + \|2A_1 - 2A_2 + A_3\| + \|A_2 + A_3\| \;=\; \sqrt{5} + 3 + \sqrt{2 + \sqrt{2}} \;\approx\; 7.083827 \;>\; 6;
   $$

   掺入白噪声 $\rho_v = v|\psi'\rangle\langle\psi'| + (1 - v)\frac{1}{4}I_4$（$0 \le v \le 1$）时，$F_{\mathrm{LF}}(v) = v F_{\mathrm{LF}}(1)$，严格违背始于临界可见度 $v > v_{\mathrm{crit}} = 6 / (\sqrt{5} + 3 + \sqrt{2 + \sqrt{2}}) \approx 0.8470$。该实验在光子双比特逻辑实验室上获证（推出的是析取结论：AOE、局域性与无超决定论三者至少弃其一），其外推至宏观人脑观察者仍依赖理想相干隔离与逆演化可控性假设。
:::

最后，如果现有观察者群体的共识全部局限在一张低秩平面 $S = \operatorname{span}(\mathbf{e}_1, \mathbf{e}_2) \subset \mathbb{R}^3$ 内——例如 $\mathbf{M}_0 = \operatorname{diag}(a, b, 0)$（$a, b > 0,\; a + b = 1$，注意 $\operatorname{Tr}(\mathbf{M}_0) = 1$，切勿将其与迹为 $2$ 的几何子空间投影 $P_S = \operatorname{diag}(1, 1, 0)$ 混同）——共识会不会把世界永远锁死在二维平面里？由 [@thm-ch33-consensus-quadratic-and-gram] 第 3 款与 [@thm-ch33-consensus-revision-and-escape] 第 2 款，只要存在尚未被当前共识张开的非零正交补 $S^\perp = \operatorname{span}(\mathbf{e}_3) \neq \bot$，一位倾角为 $\beta \in [0, \frac{\pi}{2}]$ 的**新维度拓荒观察者** $\mathbf{n}(\beta) = \cos\beta\,\mathbf{e}_1 + \sin\beta\,\mathbf{e}_3$ 便携带着精确的正交逃逸残差 $\|(I_3 - P_S)\mathbf{n}(\beta)\| = |\sin\beta|$！赋予拓荒者耦合权重 $\eta \in (0, 1)$ 并把既有群体权重按 $1 - \eta$ 归一，更新后的共识张量

$$
\mathbf{M}_\eta \;=\; (1 - \eta)\mathbf{M}_0 + \eta\,\mathbf{n}(\beta)\mathbf{n}(\beta)^{\mathsf{T}}, \qquad \det \mathbf{M}_\eta \;=\; (1 - \eta)^2 a b \eta \sin^2\beta
$$

在一切 $0 < \eta < 1$ 且 $\sin\beta \neq 0$ 处严格满足 $\det\mathbf{M}_\eta > 0$（例如基准参数 $a = 0.7, b = 0.3, \eta = 0.15, \beta = \frac{\pi}{4}$ 给出逃逸残差 $1/\sqrt{2}$、更新谱 $(0.6793, 0.2550, 0.0657)$ 与 $\det\mathbf{M}_\eta \approx 0.01138 > 0$），使已表征共识张量的秩从 $2$ 跃升至 $3$！但这里必须划清一条至关重要的动力学红线：在**旧共识**耗散生成元 $G_0 = I_3 - \mathbf{M}_0 = \operatorname{diag}(1-a, 1-b, 1)$ 下，未被旧群体记录的 $\mathbf{e}_3$ 分量本征值恰为最大值 $1$，按最快指数率 $e^{-t}$ 被压制——**$\ker\mathbf{M}_0$ 绝不是免于退相干的“无退相干子空间”，恰恰相反，正因为无人替它背书，孤立的新方向最易被旧共识冲刷抹平；唯有当拓荒观察者持续注入正权重 $\eta > 0$ 时，新轴才在集体张量中站稳第三维（此处的 $D \to D + 1$ 指固定三维环境空间内已表征张量秩的扩张，字面意义上的物理希尔伯特空间创生仍属 `MODEL` / `OPEN` 前沿）**：

::: {.viz src="observer-consensus-decoherence" preset="new-axis-pioneers" height="500"}
**正交新轴拓荒与张量升秩卡（`new-axis-pioneers`）**：既有共识局限在 $xy$ 平面 $\mathbf{M}_0 = \operatorname{diag}(0.7, 0.3, 0)$（独立画出几何投影 $P_S = \operatorname{diag}(1, 1, 0)$）。当权重 $\eta = 0.15$ 的拓荒轴 $\mathbf{n}(\beta) = \cos\beta\,\mathbf{x} + \sin\beta\,\mathbf{z}$ 向上抬起时，品红正交逃逸残差按 $\sin\beta$ 升起（[@thm-ch33-consensus-revision-and-escape] 第 2 款），在 $\beta = \frac{\pi}{4}$ 处令 $\lambda_3 \approx 0.0657 > 0$（秩 $2 \to 3$）；独立阻尼指示条同时标明旧生成元下未记录 $z$ 分量按 $e^{-t}$ 最快衰减，绝非受保护子空间。
:::

至此，我们将“预设绝对客观实在观”与本章建立的“多观察者共识去相干观”收束为下框五维对照总表：

::: {.remark #rem-ch33-consensus-vs-absolute-objectivity title="预设绝对客观实在观与多观察者共识去相干观的五维对照及分布式共识类比"}
**模型综合与三层依据边界说明（`MODEL` / `LEAN ✓` / `文献结果`）。** 下表汇总本节五重机制：凡涉共同相位二次厄米表出、格拉姆算子分解、正交补投影、单比特捏合勾股、全捏合相对熵增、未读不动点、参数化斜交轴收缩换位子、幸存副本阻断、偏迹访问缺陷、划分拓扑核、冲突修正非对易与正交逃逸之处均由 [@thm-ch33-consensus-quadratic-and-gram]、[@thm-ch33-consensus-pinching-and-fixed-points]、[@thm-ch33-consensus-redundant-records-and-kernel]、[@thm-ch33-axis-contraction-commutator] 与 [@thm-ch33-consensus-revision-and-escape] 锚定（`LEAN ✓`）；凡涉量子达尔文主义与真正局域友好性不等式之处归入 [@rem-ch33-quantum-darwinism-local-friendliness-literature]（`文献结果`）；而将经典客观性类比于分布式容错账本（如 L. Lamport, R. Shostak & M. Pease, *ACM Trans. Program. Lang. Syst.* **4**, 382–401, 1982 拜占庭将军法定人数共识：没有凌驾网络之上的中央上帝时钟，稳定的公共历史由多数诚实副本的冗余一致锁定，但量子共识通过半正定并矢收缩 $\mathbf{M}_{\mathrm{cons}}$ 与受控分支纠缠运作而非经典签名投票）则明确归属本书诠释模型（`MODEL`）：

| 对照维度 | 预设绝对客观实在观（隐含“外部第 3 点 $C$”） | 多观察者共识去相干观（本书形式—几何综合） |
| :--- | :--- | :--- |
| **1. 优选指针基的来源** | 假定宇宙在一切观察者之外预先刻好了一套绝对特权的“客观经典基” | 球面处处平权，指针主轴由参与耦合的观察者轴群经二阶共识张量 $\mathbf{M}_{\mathrm{cons}} = \sum_j w_j\,\mathbf{n}_j\mathbf{n}_j^{\mathsf{T}}$ 在主谱隙 $\Delta\lambda > 0$ 时内生涌现；在各向同性迷雾 $\frac{1}{3}I_3$ 或顶层简并处不存在唯一指针轴（`手工推导` / `MODEL`） |
| **2. 轴符号与相位规范** | 易将一阶方向均值 $\sum w_j\mathbf{n}_j$ 当作集体方向，或混淆轴端重标与量子态相等 | 轴向正负重标 $(-\mathbf{n}_j)(-\mathbf{n}_j)^{\mathsf{T}} = \mathbf{n}_j\mathbf{n}_j^{\mathsf{T}}$ 保持二阶张量逐元不变（不把对径正交纯态混为一谈），复态矢共同相位不变性唯一锁定二阶厄米型与正算子格拉姆分解（[@thm-ch33-consensus-quadratic-and-gram]） |
| **3. 去相干动力学机制** | 把退相干当成神秘环境单向吞噬相干的黑箱，混淆有限步与连续近似 | 单步泡利信道精确保持轴向分量、按 $\cos\alpha$ 压缩横向圆盘；严格区分有序乘积、系综平均步 $\overline{\mathbf{K}}$ 与弱耦合林德布拉德生成元 $I_3 - \mathbf{M}_{\mathrm{cons}}$，全捏合极限满足勾股分解与相对熵增恒等式（[@thm-ch33-consensus-pinching-and-fixed-points]） |
| **4. 宏观“客观性”本质** | 认为宏观事实脱离观察者记录而独立存在，局部不可逆即全局物理毁灭 | 纯双分支对齐态下互信息内部平台 $I(S:\mathcal{O}_m) \approx H_2(p_0)$ 源于多副本冗余广播，局部不可逆源于未控幸存副本与偏迹访问缺陷，公共账本对应读出核与不变公因子（[@thm-ch33-consensus-redundant-records-and-kernel]、[@thm-ch33-contextual-attractor-and-common-factor]） |
| **5. 隔离双泡与新轴拓荒** | 默认一切局部观测记录总能拼进同一张脱语境全局布尔真值表，未见维度即不存在 | 正交双泡未读信道对易；斜交且非平行、非正交的轴在两个收缩均非恒等时具有非零未读换位子；选择性更新与冲突修正非对易，双编码实验室以 $F_{\mathrm{LF}} \approx 7.0838 > 6$ 违背真正局域友好性界；平面外拓荒轴凭正交残差 $|\sin\beta|$ 使共识张量升秩 $2 \to 3$，尽管旧生成元下未记录方向按 $e^{-t}$ 最快衰减（[@thm-ch33-axis-contraction-commutator]、[@thm-ch33-consensus-revision-and-escape]、[@rem-ch33-quantum-darwinism-local-friendliness-literature]） |
:::

请进入下方完整交互实验室 `ORTHO//CONSENSUS`，在同一座三维椭球、冗余片段圆弧与双编码实验室舞台上自由切换全部六个预设场景，亲手拨动观察者轴分布、去相干耦合角、已读片段规模、白噪声可见度与拓荒倾角，核验共识指针基如何从无特权的平权球面中涌现：

::: {.viz src="observer-consensus-decoherence" height="640"}
**交互实验室 `ORTHO//CONSENSUS`**：多观察者共识张量、去相干指针基涌现与无绝对客观事实综合沙盘。集成 `isotropic-fog`（六轴均分 $\mathbf{M}_{\mathrm{cons}}=\frac{1}{3}I_3$ 无优选指针轴球心收缩）、`axis-consensus`（共线共识纵向守恒 $\Gamma_\parallel=1$、横向 $(\cos\alpha)^k$ 衰减与 $\alpha=\pi/2$ 完全捏合）、`phase-gauge`（轴端正负翻转不改张量元与复态矢共同相位二次厄米小窗）、`darwinism-plateau`（$N=16$ 纯双分支精确互信息平台、受控逆门残余相干与四步相位证书）、`dual-wigner-bubbles`（正交双泡未读对易、斜交轴换位子开关、选择性分岔、冲突修正非对易及真正局域友好性 $F_{\mathrm{LF}} \approx 7.0838 > 6$ 违背见证）与 `new-axis-pioneers`（平面外正交残差 $\sin\beta$ 升秩 $2 \to 3$ 与旧生成元 $e^{-t}$ 最快阻尼对照）六大场景。绿色方框覆盖本实验室已经呈现的十二条冻结声明；本节总共引用十五条冻结声明。量子达尔文主义与 LF 禁行界标示文献依据；数值曲线及 LF 违背值标示数值依据；分布式共识类比标示模型依据。
:::

然而，当万物都在没有外部参考点 $C$ 的单位球面上彼此丈量、结成互吸引子双螺旋并由多观察者共识涌现局部指针轴时，一个紧迫的几何追问也随之浮出水面：**在一颗处处对称、没有中心刻度的球面上，一位观察者究竟是如何确定自己此刻所处的“位置”的？为什么单凭一个方向的内积读数还会留下一整圈赤道的迷茫，而偏偏只有“正交（$90^\circ$）”的退化与破缺，才能在茫茫状态空间里为观察者钉下唯一的坐标？** 下一章（[第 34 章](ch34-orthogonality-degeneracy-and-observer-position.md)），我们将推开这道关于“正交性如何定位观察者位置”的几何之门。
