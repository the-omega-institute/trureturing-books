# 4.1 纯态是球皮（$\|\vv{r}\| = 1$），混合态是球肚子里截短的线（$\|\vv{r}\| < 1$） {#sec-ch04-1}

让我们先做一次三行就能算清的费曼式手算实验。假设你的单量子比特原本稳稳指向布洛赫球正东赤道极 $+\vv{e}_1$，即纯叠加态 $\lvert +\rangle = \frac{1}{\sqrt{2}}(\lvert 0\rangle + \lvert 1\rangle)$，此时横向相干长度 $r_x = 1$，箭头顶端紧贴在球皮上。

现在，有一颗路过的环境粒子（比如腔场里的一颗杂散光子，或衬底里的一个双能级缺陷）擦着你的量子比特飞了过去：当你的比特处在 $\lvert 0\rangle$ 时，环境保持初态 $\lvert e_0\rangle$ 不动；当你的比特处在 $\lvert 1\rangle$ 时，环境箭头被轻轻推偏了一个夹角 $\theta_{\mathrm{env}}$，转到了另一个单位态 $\lvert e_1\rangle$（两者的内积重叠度为 $\langle e_0\mid e_1\rangle = \cos\theta_{\mathrm{env}} \in [0, 1]$）。联合系统—环境的整体状态依然是一个百分之百模长为 $1$ 的纯态：

$$
\lvert\Psi_{\mathrm{SE}}\rangle = \frac{1}{\sqrt{2}}\bigl(\lvert 0\rangle \otimes \lvert e_0\rangle + \lvert 1\rangle \otimes \lvert e_1\rangle\bigr).
$$

接下来，那颗环境粒子飞出了你的探测器视野——你的视线只盯着手头的单量子比特，对环境自由度求偏迹（即把环境正交基上的投影无差别加总）。看看你手里的单比特密度矩阵 $\rho_{\mathrm{S}} = \Tr_{\mathrm{E}}(\lvert\Psi_{\mathrm{SE}}\rangle\langle\Psi_{\mathrm{SE}}\rvert)$ 变成了什么模样：

$$
\rho_{\mathrm{S}} = \frac{1}{2}\begin{pmatrix} \langle e_0\mid e_0\rangle & \langle e_1\mid e_0\rangle \\ \langle e_0\mid e_1\rangle & \langle e_1\mid e_1\rangle \end{pmatrix} = \frac{1}{2}\begin{pmatrix} 1 & \cos\theta_{\mathrm{env}} \\ \cos\theta_{\mathrm{env}} & 1 \end{pmatrix}!
$$

对照[第一章](ch01-measurement.md)的 [@prop-qubit-bloch-core]，这正是布洛赫向量 $\vv{r} = (\cos\theta_{\mathrm{env}},\, 0,\, 0)$！联合态依然是模长为 $1$ 的纯态。在这个等权叠加、环境记录内积为实且非负的例子里，局部布洛赫向量的长度是 $\|\vv{r}\| = \cos\theta_{\mathrm{env}}$；两条环境记录的夹角越大，“影子”就越短。这个角度是环境记录之间的夹角，偏迹并不是把联合态向量正交投影到某个三维局部子空间。

::: {.figure src="ch04-env-shadow"}
**环境里两条记录的影子，就是局部布洛赫箭头的长度。** 左边，环境的两个态 $\lvert e_0\rangle$ 与 $\lvert e_1\rangle$ 夹角 $\theta_{\mathrm{env}}$，$\lvert e_1\rangle$ 落在 $\lvert e_0\rangle$ 上的青色影子长 $\cos\theta_{\mathrm{env}}$；右边是布洛赫球的竖直截面，琥珀色的箭头 $\vv{r}$ 朝着球皮上的 $\lvert +\rangle$（虚线），只走到 $\cos\theta_{\mathrm{env}}$，它下方的青色线段与左边的影子一样长。图中取 $\theta_{\mathrm{env}} = 50^\circ$。
:::

特别地，当环境彻底分辨了系统的不同分支（$\theta_{\mathrm{env}} = 90^\circ$，环境记录彼此正交 $\cos 90^\circ = 0$），联合演化就成了一次标准的等距记录耦合，而“移开视线忽略环境”在数学上精确等价于[第三章](ch03-projectors-and-duality.md)定义的吕德斯未读捏合 $\sum_a P_a \rho P_a$。下面的定理在任意有限维系统与任意有限结果寄存器上严格证明了这一核心等价。

::: {.viz src="bloch-noise" preset="shorten" height="500"}
**拖动记录的夹角，局部箭头跟着变短。** 右下角是环境的两条记录 $\lvert e_0\rangle$、$\lvert e_1\rangle$，夹角 $\theta_{\mathrm{env}}$ 沿时间轴从 $0^\circ$ 转到 $90^\circ$，青色的影子是它们的内积 $\cos\theta_{\mathrm{env}}$。对环境求偏迹后，从 $\lvert +\rangle$ 出发的琥珀色 $\rho$（与从 $\lvert -\rangle$ 出发的白色 $\sigma$）沿横轴缩短，长度正是 $\cos\theta_{\mathrm{env}}$。画面停在 $75^\circ$，箭头只剩 $0.26$；转到 $90^\circ$，两条记录正交，箭头缩到球心。
:::

::: {.theorem #thm-nonselective-marginal title="等距记录耦合对记录寄存器求偏迹等于非选择性块和" lean="D5/S3/Quantum/Decoherence/NonselectiveMarginalization.nonselective_recording_marginal"}
设 $\mathrm{System}$ 与 $\mathrm{Outcome}$ 为有限可判等类型，$\{P_a\}_{a \in \mathrm{Outcome}}$ 为 $\mathrm{System}$ 上满足自伴性 $P_a^* = P_a$、正交幂等性 $P_a P_b = \delta_{ab} P_a$ 及完备性 $\sum_{a} P_a = I$ 的投影算子族。定义典范记录矩阵 $V \in M_{(\mathrm{System} \times \mathrm{Outcome}) \times \mathrm{System}}(\mathbb{C})$ 及对结果寄存器的偏迹映射 $\Tr_{\mathrm{Outcome}}$ 为

$$
V_{(i, a),\, j} = (P_a)_{i, j}, \qquad \bigl(\Tr_{\mathrm{Outcome}}(J)\bigr)_{i, j} = \sum_{a \in \mathrm{Outcome}} J_{(i, a),\, (j, a)}.
$$

则对任意系统矩阵 $\rho \in M_{\mathrm{System}}(\mathbb{C})$，忽略记录寄存器后的约化边缘态恒等于各投影对角块的非选择性总和：

$$
\Tr_{\mathrm{Outcome}}(V \rho V^*) = \sum_{a \in \mathrm{Outcome}} P_a \rho P_a.
$$
:::

::: proof
先考察联合矩阵 $J = V \rho V^*$ 在结果块对 $(a, b)$ 上的第 $(i, j)$ 个矩阵元：按矩阵乘法与共轭转置定义展开，有

$$
(V \rho V^*)_{(i, a),\, (j, b)} = \sum_{k, l \in \mathrm{System}} V_{(i, a),\, k}\,\rho_{k, l}\,\overline{V_{(j, b),\, l}} = \sum_{k, l \in \mathrm{System}} (P_a)_{i, k}\,\rho_{k, l}\,(P_b^*)_{l, j} = (P_a \rho P_b)_{i, j},
$$

这里用到了自伴性 $P_b^* = P_b$（Lean 中由前置引理 `recording_isometry_and_state_blocks` 给出；顺带一提，$V^* V = \sum_a P_a^* P_a = \sum_a P_a = I$ 正表明 $V$ 是保内积等距嵌入）。现在按偏迹定义令 $b = a$ 并对全体 $a \in \mathrm{Outcome}$ 求和，非对角环境交叉块 $(a \neq b)$ 完全不进入对角迹和，剩下的逐元素恰好是 $\sum_{a} (P_a \rho P_a)_{i, j}$。完整证明由 Lean 内核检查。
:::

在这个正交记录模型中，[@thm-nonselective-marginal] 把“坍缩去相干从何而来”拆解得一清二楚：跨分支干涉项 $P_a \rho P_b$（$a \neq b$）并没有从联合矩阵 $V \rho V^*$ 中消失——它们依然完好无损地躺在环境异号块 $(a, b)$ 里！只是当你执行 $\Tr_{\mathrm{Outcome}}$ 只取环境对角元 $(a, a)$ 时，你的局部账本主动跳过了那些异号块。传统哥本哈根诠释曾在微观系统与宏观仪器之间划下一道神秘的“海森堡切口”，仿佛观察者拥有豁免于量子几何之外的特权；在本书的几何诠释中，等距记录为跨越这道人为切口提供了统一模型——**所以一切都结束了，没有任何例外，连观察者结构都是这样的**：观察者的记忆寄存器也可在此模型中由正交耦合与偏迹描述。“高维长矛的斜影”只是上述等权双分支例子的比喻，不是偏迹的一般向量投影公式。

[@thm-nonselective-marginal] 是为一族正交投影亲手搭出来的等距记录扩张。一般完全正映射的 Stinespring 扩张则是表示压缩 $\varphi(a)=V^{\dagger}\pi(a)V$，其中 $V$ 未必等距；它的一般 C\*-代数形式已经冻结在所钉仓库里。这里用的是海森堡图景：映射 $\varphi$ 作用在可观测量上，而不是作用在态上。

::: {.theorem #thm-stinespring-dilation title="Stinespring 扩张定理：完全正映射是某个表示被夹在 V† 与 V 之间" lean="D5/S3/HilbertOperators/Stinespring.stinespring_dilation"}
设 $A$ 为含幺复 C\*-代数，带有与星运算相容的偏序（`[CStarAlgebra A]`、`[PartialOrder A]`、`[StarOrderedRing A]`），$H$ 为复希尔伯特空间（`[NormedAddCommGroup H]`、`[InnerProductSpace ℂ H]`、`[CompleteSpace H]`），$\varphi : A \to B(H)$ 为完全正映射（`φ : A →CP (H →L[ℂ] H)`），其中 $B(H)$ 表示 $H$ 上的有界线性算子。则存在

- 一个复希尔伯特空间 $K$，
- 一个保幺的 \*-代数同态 $\pi : A \to B(K)$（`π : A →⋆ₐ[ℂ] (K →L[ℂ] K)`），
- 一个有界线性算子 $V : H \to K$，

使得对一切 $a \in A$ 与 $x \in H$，

$$
\varphi(a)\,x \;=\; V^{\dagger}\,\pi(a)\,V\,x ,
$$

其中 $V^{\dagger}$ 是 $V$ 的伴随。
:::

::: proof
构造与 GNS 构造同型。在取值于 $H$ 的有限支撑函数空间（即形式和 $\sum_i a_i \otimes x_i$）上定义半双线性型 $\bigl\langle \sum_i a_i \otimes x_i,\ \sum_j b_j \otimes y_j \bigr\rangle = \sum_{i,j} \langle x_i,\ \varphi(a_i^{*} b_j)\,y_j\rangle$。完全正性恰好保证这个型半正定（`cp_gram_sum_nonneg`）。商去零向量并完备化，得到希尔伯特空间 $K$。$A$ 在形式和上的左乘 $a \cdot (b \otimes y) = ab \otimes y$ 关于这个型有界，延拓到 $K$ 上给出 $\pi(a)$；逐条验证它保持加法、数乘、乘法、单位元与星运算，于是 $\pi$ 是 \*-代数同态。算子 $V$ 把 $x$ 送到 $1 \otimes x$ 的等价类，同样有界。最后由内积恒等式 $\langle x,\ V^{\dagger}\pi(a)V y\rangle = \langle 1 \otimes x,\ a \otimes y\rangle = \langle x,\ \varphi(a)\,y\rangle$ 得到结论（`stinespringV_inner_rep`）。完整证明由 Lean 内核检查。
:::

在 [@thm-stinespring-dilation] 中取 $a = 1$，由 $\pi(1) = 1$ 立得 $\varphi(1) = V^{\dagger}V$：$V$ 是等距当且仅当 $\varphi$ 保单位（一行手工推导）。在有限维态—可观测量对偶下，$\varphi$ 保单位对应态映射保迹。

::: {.example #ex-pinching-stinespring-by-hand title="单比特计算基捏合的 Stinespring 扩张：手算核对"}
取 $A = M_2(\mathbb{C})$，$H = \mathbb{C}^2$，$\varphi$ 为计算基捏合在可观测量上的作用：

$$
\varphi(a) \;=\; P_0\,a\,P_0 + P_1\,a\,P_1 \;=\; \begin{pmatrix} a_{00} & 0 \\ 0 & a_{11} \end{pmatrix}, \qquad P_j = \lvert j\rangle\langle j\rvert .
$$

一组扩张数据是：$K = \mathbb{C}^2 \otimes \mathbb{C}^2$，$\pi(a) = a \otimes I_2$，$V\lvert j\rangle = \lvert j\rangle \otimes \lvert j\rangle$（$j = 0, 1$）。$\pi$ 显然是保幺的 \*-同态。逐个矩阵元核对：

$$
\langle i\rvert\, V^{\dagger}\,(a \otimes I_2)\,V\,\lvert j\rangle \;=\; \bigl(\langle i\rvert \otimes \langle i\rvert\bigr)\,(a \otimes I_2)\,\bigl(\lvert j\rangle \otimes \lvert j\rangle\bigr) \;=\; a_{ij}\,\langle i \mid j\rangle \;=\; a_{ij}\,\delta_{ij},
$$

即 $V^{\dagger}\pi(a)V = \operatorname{diag}(a_{00}, a_{11}) = \varphi(a)$。又 $V^{\dagger}V = I_2$，与 $\varphi(I_2) = I_2$ 相符。这里的 $V$ 正是 [@thm-nonselective-marginal] 中把分支标签抄进记录寄存器的那个等距：第二个因子 $\mathbb{C}^2$ 就是记录。非对角元 $a_{01}$、$a_{10}$ 并没有消失，它们留在 $a \otimes I_2$ 里，只是被 $V$ 夹掉了。
:::

::: {.remark #rem-stinespring-literature title="Stinespring 扩张定理与微观热浴欠定性（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本章的 [@thm-nonselective-marginal] 针对有限正交投影族 $\{P_a\}$ 给出了显式构造的等距记录扩张，而下文的 [@thm-reduced-access-defect] 则对单比特受控拷贝给出了显式幺正扩张。对于任意完全正且保迹（CPTP）的一般量子信道 $\mathcal{E} : M_d(\mathbb{C}) \to M_{d'}(\mathbb{C})$，其高维保范嵌入由算子代数中的经典 **Stinespring 扩张定理**（W. F. Stinespring, *Positive functions on $C^*$-algebras*, Proc. Amer. Math. Soc. **6**, 211–216, 1955）给出：

1. **等距与幺正扩张的存在性**：必存在有限维辅助环境空间 $\mathcal{H}_{\mathrm{E}}$（维数可取至多 $d d'$，极小扩张维数等于 $\mathcal{E}$ 的 Choi 秩）及保内积等距算子 $V : \mathcal{H}_{\mathrm{S}} \to \mathcal{H}_{\mathrm{S}'} \otimes \mathcal{H}_{\mathrm{E}}$（$V^* V = I_{\mathrm{S}}$），使得对一切 $\rho \in M_d(\mathbb{C})$ 恒有 $\mathcal{E}(\rho) = \Tr_{\mathrm{E}}(V \rho V^*)$；当输入输出同维（$d' = d$）时，固定环境纯初态 $\lvert e_0\rangle \in \mathcal{H}_{\mathrm{E}}$ 并将 $V\lvert\psi\rangle = U(\lvert\psi\rangle \otimes \lvert e_0\rangle)$ 延拓为联合空间上的幺正算子 $U$，即化为联合幺正偏迹形式 $\mathcal{E}(\rho) = \Tr_{\mathrm{E}}\bigl(U(\rho \otimes \lvert e_0\rangle\langle e_0\rvert)U^*\bigr)$。
2. **极小扩张的环境幺正等价唯一性与物理热浴欠定性**：在极小扩张条件下（即 Kraus 算子线性无关、无冗余未耦合环境维数），同一信道 $\mathcal{E}$ 的任意两个极小等距扩张 $(\mathcal{H}_{\mathrm{E}_1}, V_1)$ 与 $(\mathcal{H}_{\mathrm{E}_2}, V_2)$ 之间差且仅差一个作用在辅助环境上的幺正变换 $W : \mathcal{H}_{\mathrm{E}_1} \to \mathcal{H}_{\mathrm{E}_2}$，满足 $(I_{\mathrm{S}'} \otimes W)V_1 = V_2$。然而在物理层面上，仅凭局部约化信道 $\mathcal{E}$ **无法唯一反推真实的微观环境历史**：非极小热浴的冗余自由度、环境空间局部基的幺正旋转 $W$，以及产生该净映射的连续时间系统—热浴哈密顿量 $H_{\mathrm{SE}}(t)$，对于仅握有局部数据的观察者而言均保持欠定。

其中存在性的一般 C\*-代数形式（海森堡图景，$\varphi(a) = V^{\dagger}\pi(a)V$）已由 [@thm-stinespring-dilation] 验证。从它到上面第 1 条的有限维薛定谔图景形式还需要两步：矩阵代数 $M_{d'}(\mathbb{C})$ 的每个表示都酉等价于 $a \mapsto a \otimes I_{\mathrm{E}}$，以及对偶关系 $\Tr(\mathcal{E}(\rho)\,a) = \Tr(\rho\,\varphi(a))$；$\mathcal{E}$ 保迹使其对偶 $\varphi$ 保单位，因而此时 $V$ 等距。这两步连同维数界与第 2 条的极小等距唯一性仍由经典文献给出，不列入本书的 Lean 形式化账本。
:::

这立刻引出一个震撼人心的推论：**局部看到的“不可逆退相干”，本质上根本不是动力学不可逆，而是观察者丢掉环境钥匙后的“访问缺陷（access defect）”！**

举个最尖锐的例子：拿正东纯态 $\rho = \lvert +\rangle\langle +\rvert = \frac{1}{2}\bigl(\begin{smallmatrix}1 & 1\\ 1 & 1\end{smallmatrix}\bigr)$ 与正西纯态 $\sigma = \lvert -\rangle\langle -\rvert = \frac{1}{2}\bigl(\begin{smallmatrix}1 & -1\\ -1 & 1\end{smallmatrix}\bigr)$ 分别与空白环境寄存器 $\lvert 0\rangle_{\mathrm{env}}$ 做一次完全可逆的受控地址拷贝幺正门 $U_{\mathrm{copy}}$（即量子计算中最基础的受控非门 CNOT：系统为 $0$ 时环境不动，系统为 $1$ 时翻转环境比特 $a \mapsto 1 - a$）。演化之后：

1. 在局部单比特视野里，$\rho$ 和 $\sigma$ 的约化密度矩阵双双塌缩成了同一个球心死点 $\frac{1}{2}I$——哪怕请来全世界最聪明的解码器，只看这颗单比特也休想分清它刚才到底是东极 $\lvert +\rangle$ 还是西极 $\lvert -\rangle$；
2. 但在包含环境的双比特全局视野里，两个联合状态依然泾渭分明，只要把同一扇受控门倒着推回去（作用 $U_{\mathrm{copy}}^*$），$\rho$ 和 $\sigma$ 连一根毫毛都不少地双双满血复活！

下面的定理将上述六个环环相扣的论断一次性全部形式化。

::: {.theorem #thm-reduced-access-defect title="局部退相干不可逆性的本质是环境记录访问缺陷" lean="D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect"}
设 $\rho, \sigma \in M_2(\mathbb{C})$ 为两个单比特矩阵，满足主对角元处处相等（$\forall i,\, \rho_{ii} = \sigma_{ii}$），但至少有一处非对角相干元不同（$\exists i \neq j,\, \rho_{ij} \neq \sigma_{ij}$）。记受控地址拷贝置换矩阵为 $U_{\mathrm{copy}} \in M_{\mathrm{Fin}\,2 \times \mathrm{Fin}\,2}(\mathbb{C})$，空白环境联合嵌入为 $B(\tau) = \tau \otimes \lvert 0\rangle\langle 0\rvert_{\mathrm{env}}$，受控拷贝后的联合记录态为 $R(\tau)$，对环境求偏迹算子为 $\Tr_{\mathrm{env}}$。则以下六条结论同时成立：

1. **全局耦合幺正性**：$U_{\mathrm{copy}} \in U(\mathrm{Fin}\,2 \times \mathrm{Fin}\,2, \mathbb{C})$；
2. **前向幺正写入记录**：$U_{\mathrm{copy}} B(\rho) U_{\mathrm{copy}}^* = R(\rho)$ 且 $U_{\mathrm{copy}} B(\sigma) U_{\mathrm{copy}}^* = R(\sigma)$；
3. **局部边缘态完全重合同化**：$\Tr_{\mathrm{env}}(R(\rho)) = \Tr_{\mathrm{env}}(R(\sigma))$；
4. **全局联合态严格可区分**：$R(\rho) \neq R(\sigma)$；
5. **局部恢复映射的不可能性**：不存在任何仅以单比特约化矩阵为输入的函数 $\mathcal{R} : M_2(\mathbb{C}) \to M_{\mathrm{Fin}\,2 \times \mathrm{Fin}\,2}(\mathbb{C})$ 能同时满足 $\mathcal{R}(\Tr_{\mathrm{env}}(R(\rho))) = R(\rho)$ 与 $\mathcal{R}(\Tr_{\mathrm{env}}(R(\sigma))) = R(\sigma)$；
6. **全局伴随幺正精确可逆恢复**：$U_{\mathrm{copy}}^* R(\rho) U_{\mathrm{copy}} = B(\rho)$ 且 $U_{\mathrm{copy}}^* R(\sigma) U_{\mathrm{copy}} = B(\sigma)$。
:::

::: proof
作为自逆置换 $(i, a) \mapsto (i, a \oplus i)$ 的置换矩阵，$U_{\mathrm{copy}}$ 满足 $U_{\mathrm{copy}}^* U_{\mathrm{copy}} = I$，故属于幺正群（结论 1）。将 $U_{\mathrm{copy}}$ 左右共轭作用于空白环境态 $B(\tau)$，把矩阵下标按置换重排后，系统行号 $i$ 与列号 $j$ 自动拷贝到环境轨道 $(i, i)$ 与 $(j, j)$ 上，得到受控记录态 $R(\tau)$（结论 2）。对环境指标求和取 $\Tr_{\mathrm{env}}(R(\tau))$ 时，当 $i \neq j$ 环境轨道正交失配而归零，仅保留对角元 $\tau_{ii}$；因前提 $\rho_{ii} = \sigma_{ii}$，故 $\Tr_{\mathrm{env}}(R(\rho)) = \Tr_{\mathrm{env}}(R(\sigma))$（结论 3）。另一方面，$R(\tau)$ 在联合对角地址 $((i, i), (j, j))$ 处完整保留了原矩阵元 $\tau_{ij}$；既然存在 $i \neq j$ 使 $\rho_{ij} \neq \sigma_{ij}$，必有 $R(\rho) \neq R(\sigma)$（结论 4）。若存在单值函数 $\mathcal{R}$ 从相等的输入 $\Tr_{\mathrm{env}}(R(\rho)) = \Tr_{\mathrm{env}}(R(\sigma))$ 同时输出不同的 $R(\rho) \neq R(\sigma)$，立即违背函数单值性（结论 5）。最后，在联合空间上作用逆幺正演化 $U_{\mathrm{copy}}^*$，由 $U_{\mathrm{copy}}^* U_{\mathrm{copy}} = I$ 精确还原空白环境初态 $B(\rho)$ 与 $B(\sigma)$（结论 6）。完整证明由 Lean 内核检查。
:::

把 [@thm-reduced-access-defect] 里的 $4\times 4$ 联合矩阵直接摊开在桌面上（按双比特基序 $\{\lvert 00\rangle, \lvert 01\rangle, \lvert 10\rangle, \lvert 11\rangle\}$ 排列），你会看得更加触目惊心。对东极 $\rho = \lvert +\rangle\langle +\rvert$ 与西极 $\sigma = \lvert -\rangle\langle -\rvert$，初始空白环境嵌入 $B(\rho), B(\sigma)$ 与受控拷贝后的联合态 $R(\rho), R(\sigma)$ 分别是：

$$
B\Bigl(\lvert \pm\rangle\langle \pm\rvert\Bigr) = \frac{1}{2}\begin{pmatrix} 1 & 0 & \pm 1 & 0 \\ 0 & 0 & 0 & 0 \\ \pm 1 & 0 & 1 & 0 \\ 0 & 0 & 0 & 0 \end{pmatrix} \;\xrightarrow{\;U_{\mathrm{copy}}\,\cdot\,U_{\mathrm{copy}}^*\;}\; R\Bigl(\lvert \pm\rangle\langle \pm\rvert\Bigr) = \frac{1}{2}\begin{pmatrix} 1 & 0 & 0 & \pm 1 \\ 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 \\ \pm 1 & 0 & 0 & 1 \end{pmatrix}!
$$

请盯住右边那张 $4\times 4$ 矩阵的四个角：区分正号与负号的相干印记 $\pm\frac{1}{2}$ 并没有被抹掉，它们只是从 $(00, 10)$ 搬家到了外侧对角 $(00, 11)$ 与 $(11, 00)$！然而，当你对第二个比特求偏迹 $\Tr_{\mathrm{env}}$ 时，规则要求你把左上 $2\times 2$ 块的迹、右上 $2\times 2$ 块的迹分别加起来：右上 $2\times 2$ 块的主对角元是 $(00, 10)$ 与 $(01, 11)$，那两个位置偏偏都是 $0$，而真正装着 $\pm\frac{1}{2}$ 的右上角 $(00, 11)$ 根本不在环境小块的迹对角线上！于是偏迹交到你手里的只剩一模一样的 $\frac{1}{2}\bigl(\begin{smallmatrix} 1+0 & 0+0 \\ 0+0 & 0+1 \end{smallmatrix}\bigr) = \frac{1}{2}I$。

::: {.figure src="ch04-copy-matrix"}
**相干没有消失，只是搬到了偏迹够不着的角上。** 两张 $4\times 4$ 方格按 $00, 01, 10, 11$ 排列，细框分出四个 $2\times 2$ 块，偏迹只读每块对角线上的两格（青色的边）。左边是受控拷贝之前的 $B(\lvert\pm\rangle\langle\pm\rvert)$：品红的 $\pm\frac{1}{2}$ 在 $(00, 10)$ 与 $(10, 00)$，落在青色的格里，偏迹读得到；右边是拷贝之后的 $R(\lvert\pm\rangle\langle\pm\rvert)$：$\pm\frac{1}{2}$ 搬到 $(00, 11)$ 与 $(11, 00)$，不在任何一块的对角线上，偏迹交出的都是 $\frac{1}{2}I$，而用 $U_{\mathrm{copy}}^*$ 倒推回去即复原（[@thm-reduced-access-defect] 的结论 2、3、4、6；矩阵元是正文的手算）。
:::

> 所谓“覆水难收”，只是因为你把目光锁死在了水杯里；对整间屋子而言，每一滴水汽的相位都还写在空气的账本上。
