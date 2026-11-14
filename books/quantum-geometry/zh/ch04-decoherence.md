# 第四章 当视线移开或被遮蔽：退相干、混合态与缩进球心的截短之线

> *“所以一切都结束了，没有任何例外，连观察者结构都是这样的。”*

在前三章里，我们的单量子比特箭头 $\vv{a}$ 一直骄傲地站在单位球面 $S^2$ 的**球皮**上（模长 $\norm{\vv{a}} = 1$）：在[第一章](ch01-measurement.md)它是剥去全局相位冗余后的三维实射线，在[第二章](ch02-born-rule.md)它给出零冗余半角投影 $\cos^2(\theta/2)$，在[第三章](ch03-projectors-and-duality.md)它被幂等判别尺 $P^2 = P$ 切成轴向粒子偏离与赤道波动余量。

但在真实的超导芯片、离子阱与室温凝聚态实验室里，实验物理学家最常打交道的却不是球皮上的纯态，而是缩进了球体肚子里的**混合态**（mixed state）：布洛赫向量 $\vv{r}$ 的长度不再等于 $1$，而是变成了一根截短的线段 $\norm{\vv{r}} < 1$，甚至一步步萎缩成球心正中央那个毫无方向可言的死点 $\vv{r} = \vv{0}$。

那截原本好端端的长度 $1 - \norm{\vv{r}}$ 究竟被谁偷走了？“退相干（decoherence）”真的是微观世界在某种神秘摩擦下发生了不可逆的本体毁灭吗？作为第一部“从点到线”的收官之章，我们将揭开混合态的几何机制：**正交记录耦合与环境偏迹边缘化如何在更大空间中压短局部状态**（[@thm-nonselective-marginal]、[@thm-reduced-access-defect]，并由 C\*-代数表示压缩 [@thm-stinespring-dilation] 与一般信道薛定谔图景扩张文献 [@rem-stinespring-literature] 对照补充）。不妨借斜刺的长矛和它截短的影子来想象局部布洛赫向量的缩短；实际求偏迹的是联合密度算子。

::: {.figure src="ch04-overview"}
**图 4。** 本章地图，三栏都是布洛赫球的竖直截面：第 I 栏，琥珀色的局部箭头朝着球皮上的 $\lvert +\rangle$（虚线），却只到 $\cos\theta_{\mathrm{env}}$ 就停在球里；第 II 栏，振幅阻尼（$\gamma = \frac{1}{2}$）把球缩小并往北推成青色的椭圆，北极的 $\rho$ 不动，$+x$ 上的 $\sigma$ 被拉向北方，两点之间的线从虚线缩成实线，$T$ 从 $0.707$ 降到 $0.433$（[@prop-trace-distance-metric-contraction]；这个信道的布洛赫形式是文献结果，未在本书形式化）；第 III 栏，琥珀色的点先抹掉横向部分、落到竖轴上，再抹掉 $r_z$、落到紫色的球心 $\frac{1}{2}I$。
:::

## 4.1 纯态是球皮（$\|\vv{r}\| = 1$），混合态是球肚子里截短的线（$\|\vv{r}\| < 1$） {#sec-ch04-1}

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

## 4.2 不用背 Kraus 算符看懂三种量子噪声 {#sec-ch04-2}

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

## 4.3 最大混合死点（$\vv{r} = \vv{0}$） {#sec-ch04-3}

顺着这张几何形变表往下看：先用标准基捏合彻底抹掉赤道相干元（把球压到竖直主轴上），再连竖直主轴上的粒子偏置 $r_z$ 也一并消磨殆尽，整根布洛赫向量就会彻底缩进球的几何中心——**最大混合死点** $\vv{r} = \vv{0}$。

::: {.viz src="bloch-noise" preset="centre" height="500"}
**球心：从哪来都一样。** 强度为 $1$ 的去极化把整颗球缩成紫色的球心一点：北极的 $\rho$ 与 $+x$ 的 $\sigma$ 落在同一处，白线长度为零。
:::

让我们先用一条紧接 [@thm-pinching-pythagorean] 的推论，把“赤道相干彻底清零”的代数判据钉死。

::: {.corollary #cor-pinching-zero-offdiag title="单比特零丢弃相干质量与捏合不动点的副对角归零判据" lean="D5/S3/QuantumChannels/CoherenceMassBridge.pinching_eq_self_iff_offDiag_eq_zero D5/S3/QuantumChannels/CoherenceMassBridge.pinching_discarded_mass_eq_zero_iff"}
对任意单比特矩阵 $\rho \in M_2(\mathbb{C})$，记其副对角元有序对为 $\operatorname{offDiag}(\rho) = (\rho_{01}, \rho_{10}) \in \mathbb{C} \times \mathbb{C}$。则以下三条陈述两两等价：

1. $\rho$ 是标准基捏合映射的不动点：$\mathcal{P}(\rho) = \rho$；
2. 捏合丢弃的希尔伯特—施密特相干质量为零：$\langle \rho - \mathcal{P}(\rho),\, \rho - \mathcal{P}(\rho)\rangle_{\mathrm{HS}} = 0$；
3. $\rho$ 的两个副对角元同时为零：$\operatorname{offDiag}(\rho) = (0, 0)$。
:::

::: proof
（$1 \Leftrightarrow 3$）：$\mathcal{P}(\rho)$ 与 $\rho$ 在对角位置 $(0, 0), (1, 1)$ 恒相等，而在副对角位置 $(0, 1), (1, 0)$ 处 $\mathcal{P}(\rho)$ 取 $0$，故矩阵相等 $\mathcal{P}(\rho) = \rho$ 当且仅当 $\rho_{01} = 0$ 且 $\rho_{10} = 0$。（$2 \Leftrightarrow 3$）：由 [@thm-pinching-pythagorean] 的结论 2，丢弃相干质量等于两个非负实数之和 $|\rho_{01}|^2 + |\rho_{10}|^2$；两个非负实数之和为 $0$ 当且仅当每一项各自为 $0$，这又当且仅当 $\rho_{01} = \rho_{10} = 0$。完整证明由 Lean 内核检查。
:::

现在，在副对角元归零（$r_x = r_y = 0$）的基础上再令对角粒子偏置归零（$\rho_{00} = \rho_{11} = \frac{1}{2}$，即 $r_z = 0$），我们便抵达了单量子比特世界最对称、也最沉寂的奇点：$\rho_* = \frac{1}{2}I$。让我们在下面的综合剖析中仔细端详这颗球心死点——它既是第一部“从点到线”的终点，也是通往后续双矢量面积与多体纠缠的秘密虫洞！

::: {.example #ex-maximally-mixed-center title="球心最大混合态的全方位几何诊断与多球纠缠伏笔"}
取布洛赫球心向量 $\vv{r} = (0, 0, 0)$，由[第一章](ch01-measurement.md) [@prop-qubit-bloch-core] 知 $B(\vv{0}) = 0$，对应的单比特密度矩阵为单位矩阵的一半：

$$
\rho_* = \frac{1}{2}\bigl(I + B(\vv{0})\bigr) = \frac{1}{2}\begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}.
$$

这颗球心死点集齐了四重意味深长的几何特征：

1. **全向各向同性失明**：任取球面上**任何一根**单位探测方向 $\vv{n} \in S^2$（对应投影尺 $P_{\vv{n}} = \frac{1}{2}(I + B(\vv{n}))$），按[第二章](ch02-born-rule.md) [@ex-bloch-half-angle] 计算玻恩通过率：

   $$
   \Tr(\rho_* P_{\vv{n}}) = \frac{1 + \vv{0}\cdot\vv{n}}{2} = \frac{1}{2}.
   $$

   无论你把偏振片或斯特恩—革拉赫磁铁转到东南西北哪个角度，探测器永远只吐出毫无倾向的 $50\% : 50\%$ 白噪声！正如[序曲](README.md)第四重盲区所言，当你放弃一切特定方向、把整颗球面不偏不倚地平均揉成一团（$\frac{1}{4\pi}\int_{S^2} \vv{a}\,d\Omega = \vv{0}$）时，“全知”瞬间坍缩成了“全盲”。
2. **零纯度盈余**：计算 $\rho_*^2 = \frac{1}{4}I$，纯度跌至二维空间的绝对下限 $\Tr(\rho_*^2) = \frac{1}{2}$。代入[第三章](ch03-projectors-and-duality.md)的互补勾股定理 [@thm-complementary-pythagoras]（$|d| = 2$），左端纯度盈余 $\Tr(\rho_*^2) - \frac{1}{2} = 0$，意味着无论可见粒子偏离还是正交波动余量都一滴不剩。
3. **经典系综拆解的无穷歧义**：把五成北极与五成南极混在一起，$\frac{1}{2}\rho_{+\vv{e}_3} + \frac{1}{2}\rho_{-\vv{e}_3} = \frac{1}{2}I$；把五成东极与五成西极混在一起，$\frac{1}{2}\rho_{+\vv{e}_1} + \frac{1}{2}\rho_{-\vv{e}_1} = \frac{1}{2}I$！一旦缩成球心一点，任何实验都无法倒推它当初是由南北对冲还是东西对冲混合而成的——因为密度矩阵只记录合成后的净几何重心 $\vv{r}$，从不替历史保存混配配方。
4. **通往第四部“多球纠缠”的惊天伏笔**：最奇妙的一幕还在后头！回到本章 4.1 节开头的双比特联合纯态，令 $\theta_{\mathrm{env}} = 90^\circ$，即著名的**最大纠缠贝尔态（Bell state）** $\lvert\Phi^+\rangle = \frac{1}{\sqrt{2}}(\lvert 00\rangle + \lvert 11\rangle)$，其密度矩阵展开为 $\rho_{AB} = \frac{1}{4}(I \otimes I + \sigma_x \otimes \sigma_x - \sigma_y \otimes \sigma_y + \sigma_z \otimes \sigma_z)$。整个双比特系统明明处在最纯粹、零熵、模长为 $1$ 的全局纯态（$\Tr(\rho_{AB}^2) = 1$），可是当你单独去量第一颗比特 $A$ 时，$\rho_A = \frac{1}{2}I$（$\vv{r}_A = \vv{0}$）；单独去量第二颗比特 $B$ 时，$\rho_B = \frac{1}{2}I$（$\vv{r}_B = \vv{0}$）！两颗局部球心里空空如也，单比特局域泡利分量 $\sigma_i \otimes I$ 与 $I \otimes \sigma_j$ 全部为零——那么那整整 $100\%$ 的非平凡纯度藏到哪儿去了？答案一清二楚：**它百分之百储存在联合双比特泡利关联扇区 $\sigma_i \otimes \sigma_j$ 之中（第四部第十三章将在几何上把这组跨球张量关联阐释为横跨两颗球的共享关联平面）！**
:::

::: {.figure src="ch04-centre-mixtures"}
**球心不记得自己是怎么混出来的。** 南北两极各取 $\frac{1}{2}$、东西两极各取 $\frac{1}{2}$，或者斜虚线两端的另一对对径点各取 $\frac{1}{2}$，混出的布洛赫向量都是弦的中点，全都落在紫色的球心 $\frac{1}{2}I$（[@ex-maximally-mixed-center] 第 3 条）。
:::

---

### 4.3.1 第一部小结：从“点”站成“线”，下一步向“面”展翼 {#第一部小结从点站成线下一步向面展翼}

回望第一部走过的四章征程，我们用经 Lean 4 内核逐条核验的定理级结论及其锁定的形式化声明，完成了量子几何地基的第一轮重塑；各条对应关系列在本书的形式化验证账本中：

- **第一章**拆穿了孤立单子与外部第 3 点 $C$ 的双重幻觉，证明单比特矩阵代数无特征标（[@thm-qubit-no-character]），并用幺正射线刚性（[@thm-ray-phase-rigidity]）与布洛赫展开（[@prop-qubit-bloch-core]）把双分量复列向量（四个实坐标）还原为球面上的三维实单位线 $\vv{a} \in S^2$；
- **第二章**以已知态自身为基，把“点 $C$”还原为内生相融影子 $\vv{c} = (\vv{a}\cdot\vv{b})\vv{a}$，从迹配对与勾股模长守恒严格导出玻恩模平方定则（[@thm-born-modulus-square]、[@thm-rank-one-born-pairing]）及半角换算 $\cos^2(\theta/2) = \frac{1 + \cos\theta}{2}$，并证明在探针上为正的读数可由最小确认逐层剥出（[@thm-positive-dual-generation]），以及有限维里效应上可加的概率必是某个密度矩阵的迹配对（[@thm-busch-effect-density]）；
- **第三章**指出粒子、概念与经典时间刻度全都是幂等投影线 $P^2 = P$ 的不动点（[@thm-pinching-idempotent]、[@thm-unread-fixed-iff]、[@thm-conditional-state-valid]），用互补勾股定理（[@thm-complementary-pythagoras]）揭示了粒子轴与霍奇对偶波平面的伴生宿命，并给出 $d$ 维系统的记录容量上界 $N \le d$（[@prop-record-capacity]）与互补语境的熵不确定关系（[@prop-collision-entropy-uncertainty]）；
- **第四章**追踪了视线移开后的偏迹边缘化（[@thm-nonselective-marginal]），证明局部不可逆只是环境访问缺陷（[@thm-reduced-access-defect]），给出了相位阻尼、振幅阻尼与捏合投影的几何收缩图像（[@thm-pinching-pythagorean]、[@prop-phase-damping-decay]、[@prop-amplitude-damping-contraction]、[@cor-pinching-zero-offdiag]），以 Stinespring 扩张（[@thm-stinespring-dilation]）说明表示压缩的结构，以 Sz.-Nagy 酉幂扩张（[@thm-unitary-power-dilation]）说明任意多步的压缩仍是同一个酉演化的影子，并由迹距离在同一有限指标类型上的量子信道下不增（[@prop-trace-distance-metric-contraction]）刻画两态可分辨性的限制。

::: {.viz src="bloch-noise" height="560"}
**完整实验室。** 切换三种噪声、调每一步的强度与 $T_2 / T_1$，或在球皮上拖动 $\rho$ 与 $\sigma$，沿时间轴看青色的球怎样变形、白线怎样只缩不长。
:::

至此，第一重帷幕“从点到线”已彻底落下。在接下来的**第二部《展翼·从线到面》**中，我们将把目光从静态的一维投影线 $\vv{a} \cdot \vv{b} = \cos\theta$ 抬高三寸，正面迎向那片在第一部里已经频频显露锋芒的**二维有向面积** $\vv{a} \wedge \vv{b} = \sin\theta\,\hat{I}$——看清虚数单位 $i$ 为什么其实就是平面 $90^\circ$ 正交转向算子，并用一行克利福德几何积恒等式 $AB = A\cdot B + A\wedge B$ 将全部单比特量子门与量子力学五大公理一举合拢！

::: {.film src="002-pairwise-born"}
**两子丈量：从一对箭头到玻恩权重（1 分 26 秒）。** 两支相隔 $60^\circ$ 的箭头由平行四边形的两条对角线读出夹角（[@thm-parallelogram-norm-law]）；让 $A$ 自己当轴，垂足 $C$ 成了 $B$ 落在 $A$ 上的青色影子 $\cos\theta$；把影子从 $[-1, 1]$ 压进 $[0, 1]$，就是权重 $\cos^2(\theta/2)$（[@thm-born-modulus-square]）；只有平方能让快门与它的补分完全部权重（[@thm-born-probability-skeleton]）；最后环境记下分支，箭头缩成球内竖轴上的一截短线（[@thm-nonselective-marginal]）。
:::
