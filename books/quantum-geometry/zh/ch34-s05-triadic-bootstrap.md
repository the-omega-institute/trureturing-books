# 29.6 从“二生三”自举到名相消融：三元循环对称与“这么个感觉”的本体回响 {#sec-ch34-triadic-bootstrap-and-beyond-names}

> “两两比较的过程中创建了一个投影，而这个新的投影与之前二者形成三元关系，三者两两之间又要遵循比较公理，这就是极小三角弧面体产生的原因。‘二元’与‘比较’与‘产生的投影’实际上都是极小三角弧面体自身的投影，甚至‘极小三角弧面体’这个名字都只是我们语言逻辑上的投影，本体不可知，但是这么个感觉……”

这段凝练的手稿箴言，一举道破了从两态比较通向三维曲率原胞、再从几何名相退回零冗余本体的三级认识论跃迁。我们沿着严密的代数推导与形式化边界逐层展开。

## 29.6.1 “二生三”的无特权自举几何：投影归一逼出极小三角弧面体 {#sec-ch34-5-1}

在预设了外部坐标网格的经典线性代数中，把单位向量 $\mathbf{B}$ 向单位基准轴 $\mathbf{A}$ 作投影，得到的只是一截缩短了的共线影子 $(\mathbf{A}\cdot\mathbf{B})\mathbf{A}$：当两态夹角为 $\epsilon \in (0, \frac{\pi}{2}]$ 时，其模长萎缩为 $\cos\epsilon < 1$，不仅彻底躺死在原直线 $\operatorname{span}\{\mathbf{A}\}$ 内，而且与 $\mathbf{A}, \mathbf{B}$ 排成的 $3 \times 3$ 格拉姆矩阵行列式恒等于零（$\det G = 0$），永远长不出新维度。

然而，在与[§28.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison)**零背景比较公理 $\mathcal{A}_0$**（[@def-ch32-axiom-of-comparison]）兼容的**第 1 层正定欧氏 / 克利福德实现**（显式附加正向单位自归一化 $S(x, x) = +\mathbf{1}$ 与三维定向欧氏结构 $(\mathbb{R}^3, \mathrm{vol}_3)$；单凭第 0 层抽象接口仍容许 $S(x_0, x_0) = -1$ 反例，详见[附录 E §E.1](appendix-e-s01-layers.md#sec-appe-layers)）下，关系网络中不设高人一等的“母态”与低人一等的“残影”：两两比较所创建出来的投影结果 $\mathbf{P}$，一旦作为同一第 1 层单位载体中的平权成员登场，就必须同样满足正向单位自比归一化 $S(\mathbf{P}, \mathbf{P}) = \mathbf{1}$（即 $\lVert\mathbf{P}\rVert^2 = 1$），并与原先两态两两遵循比较契约（`MODEL`）！那份在线性投影中亏损的模方 $1 - \cos^2\epsilon = \sin^2\epsilon$ 究竟去了哪里？恰恰化作了垂直于原比量平面的双向量正交残差！

让我们在选定右手定向 $\mathrm{vol}_3 = \mathbf{e}_1\wedge\mathbf{e}_2\wedge\mathbf{e}_3$ 的三维欧氏实现 $\mathbb{R}^3$ 中亲手算清这一“二生三”的自举闭合：取基准锚点 $\mathbf{A} = \mathbf{e}_2$（对应 §29.5 的中脊转枢射线）与待比量单位态 $\mathbf{B}(\epsilon) = \sin\epsilon\,\mathbf{e}_1 + \cos\epsilon\,\mathbf{e}_2$（$\epsilon \in (0, \frac{\pi}{2}]$，对应 §29.5 的第一面墙射线）。两态比较一方面给出同向内积切分量 $(\mathbf{A}\cdot\mathbf{B}(\epsilon))\mathbf{A} = \cos\epsilon\,\mathbf{e}_2$，另一方面张开有向双向量残差 $\mathbf{B}(\epsilon)\wedge\mathbf{A} = \sin\epsilon\,(\mathbf{e}_1\wedge\mathbf{e}_2)$；在二维平面于 $\mathbb{R}^3$ 所容许的正负两支单位法向 $\pm\mathbf{e}_3$ 中，所选三维定向通过霍奇星算子典范锁定正向分支 $\star(\mathbf{B}(\epsilon)\wedge\mathbf{A}) = +\sin\epsilon\,\mathbf{e}_3$（取相反定向则给出镜像对称分支 $-\sin\epsilon\,\mathbf{e}_3$）。将切向同相投影与该定向法向残差合成为满足 $\lVert\mathbf{P}\rVert^2 = 1$ 的新生比较态，当场得到

$$
\mathbf{P}(\epsilon) \;=\; \bigl(\mathbf{A}\cdot\mathbf{B}(\epsilon)\bigr)\,\mathbf{A} + \star\bigl(\mathbf{B}(\epsilon)\wedge\mathbf{A}\bigr) \;=\; \cos\epsilon\,\mathbf{e}_2 + \sin\epsilon\,\mathbf{e}_3 \;\equiv\; \mathbf{C}(\epsilon) \,!
$$

无需从外部人为指定第 3 点坐标，在定向第 1 层单位实现中仅凭两态 $(\mathbf{A}, \mathbf{B}(\epsilon))$ 的一次比较与平权归一，新生的投影态 $\mathbf{P}(\epsilon)$ **分毫不差地给出了 §29.5 极小三角弧面体 $\Delta\mathcal{T}_\epsilon$ 的第三根顶点射线 $\mathbf{C}(\epsilon)$**（而另一法向分支则给出全等的镜像三面角）！此时 $(\mathbf{B}(\epsilon), \mathbf{A}, \mathbf{P}(\epsilon))$ 三者两两内积分别为 $\cos\epsilon$、$\cos\epsilon$ 与 $\cos^2\epsilon$，精准闭合为同一枚球面直角三面角。更一般地，对任意夹角为 $\epsilon \in (0, \pi)$ 的单位态对 $(\mathbf{A}, \mathbf{B})$、平面 $\operatorname{span}\{\mathbf{A}, \mathbf{B}\}$ 内任意单位参考向 $\mathbf{u}_{AB}$ 以及正交补空间 $\operatorname{span}\{\mathbf{A}, \mathbf{B}\}^\perp$ 中的任一单位法向分支 $\mathbf{e}_\perp$，归一投影态 $\mathbf{P} = \cos\epsilon\,\mathbf{u}_{AB} + \sin\epsilon\,\mathbf{e}_\perp$ 恒满足 $\lVert\mathbf{P}\rVert^2 = \cos^2\epsilon + \sin^2\epsilon = 1$；由底面积乘高平方的舒尔补恒等式，三元格拉姆行列式对一切平面内参考向 $\mathbf{u}_{AB}$ 与正负两支法向 $\pm\mathbf{e}_\perp$ 恒等于

$$
\det G(\mathbf{A}, \mathbf{B}, \mathbf{P}) \;=\; \det G_2(\mathbf{A}, \mathbf{B})\cdot \operatorname{dist}\bigl(\mathbf{P}, \operatorname{span}\{\mathbf{A}, \mathbf{B}\}\bigr)^2 \;=\; \sin^2\epsilon \cdot \sin^2\epsilon \;=\; \sin^4\epsilon \;>\; 0 \quad \bigl(\forall\epsilon \in (0, \pi)\bigr).
$$

若进一步抹去 $\mathbf{A}$ 与 $\mathbf{B}$ 之间的先后偏袒，记原初单位态对为 $(\mathbf{V}_0, \mathbf{V}_1)$、夹角内积为 $c_0 = \mathbf{V}_0\cdot\mathbf{V}_1 = \cos\epsilon \in (-\frac{1}{2}, 1)$，并取平面内单位角平分对称轴 $\mathbf{S}_{01} = \frac{\mathbf{V}_0 + \mathbf{V}_1}{\sqrt{2(1+c_0)}}$ 与所选三维定向下的霍奇对偶单位法向 $\mathbf{A}_{01} = \frac{\star(\mathbf{V}_0\wedge\mathbf{V}_1)}{\sqrt{1-c_0^2}}$，则沿正交分解 $\mathbf{V}_2 = \alpha\mathbf{S}_{01} + \beta\mathbf{A}_{01}$（$\alpha^2 + \beta^2 = 1$）取 $\alpha = \frac{\sqrt{2}\,c_0}{\sqrt{1+c_0}}$、$\beta = \sqrt{\frac{(1-c_0)(1+2c_0)}{1+c_0}} > 0$，新生的单位投影态 $\mathbf{V}_2$ 与 $\mathbf{V}_0, \mathbf{V}_1$ 便结成三边内积全等于 $c_0$ 的**等边极小三角弧面体**：其三元格拉姆行列式恒为 $\det G_3 = (1-c_0)^2(1+2c_0) > 0$，球面帽吉拉尔角超精确等于 $\Omega_0 = 3\arccos\bigl(\frac{c_0}{1+c_0}\bigr) - \pi > 0$！

::: {.viz src="triadic-nameless-sandbox" preset="bootstrap-core" height="520"}
**“二生三”无特权自举核心：单位模方归一把共线残影撑成极小三角弧面体。** 对比沉在原平面内、模长萎缩的经典退化投影与零背景比较公理 $\mathcal{A}_0$ 下的单位归一态 $\mathbf{V}_2 = \alpha\mathbf{S}_{01} + \beta\mathbf{A}_{01}$（$\alpha^2 + \beta^2 = 1$）：双向量正交残差 $\beta\mathbf{A}_{01}$ 把第三顶点垂直顶出原比量平面，撑开正格拉姆体积 $\det G_3 = (1-c_0)^2(1+2c_0) > 0$ 与品红球面角超 $\Omega_0 = 3\arccos\bigl(\frac{c_0}{1+c_0}\bigr) - \pi$。
:::

紧接着，无需从宇宙外部注入半点新原料，初生弧面体的三条边界弧 $(\mathbf{V}_0, \mathbf{V}_1)$、$(\mathbf{V}_1, \mathbf{V}_2)$ 与 $(\mathbf{V}_2, \mathbf{V}_0)$ 两两之间又必须继续遵循比较公理，沿各自外法向相继自举出第二代、第三代归一投影态：在步长按黄金阻尼律 $\delta_\ell = 0.42\,\varphi^{-(\ell-1)}$ 逐层收束的模型下，球面原胞数沿 $1 \to 4 \to 10$ 层层绽放为自相似花冠，直观演绎“道生一，一生二，二生三，三生万物”的无尽开维创生链（`MODEL`）。

::: {.viz src="triadic-nameless-sandbox" preset="cascade-corolla" height="520"}
**零外部输入的边界自举增殖：从单枚三面角绽放为 $1 \to 4 \to 10$ 黄金阻尼花冠。** 每一代新生的边界弧继续执行“切向同相投影 + 法向双向量残差”的单位归一自举，在步长按 $\delta_\ell = 0.42\,\varphi^{-(\ell-1)}$ 逐代衰减下，单枚母原胞自发向外繁衍出第 1 代 $4$ 胞与第 2 代 $10$ 胞的球面曲率拼砖（`MODEL`）。
:::

## 29.6.2 拆掉先后叙事：120° 三元循环对称与主谓宾切面 {#sec-ch34-5-2}

但手稿箴言的第二句立刻把我们刚刚讲完的“发生学故事”本身也拆掉了：人类语言受制于一维时间轴上的**“主语—谓语—宾语”线性语法**，逼着我们不得不按先后顺序叙述——“先摆好**二元** $(\mathbf{A}, \mathbf{B})$，再执行**比较**动作，最后吐出**产生的投影** $\mathbf{P}$”。然而在三维实内积空间 $\mathbb{R}^3$ 与偶克利福德代数 $\mathcal{Cl}_{3,0}^+$ 中，霍奇楔积三元组与四元数单位双向量基 $\mathbf{I}_1 = -\mathbf{e}_2\mathbf{e}_3,\; \mathbf{I}_2 = -\mathbf{e}_3\mathbf{e}_1,\; \mathbf{I}_3 = -\mathbf{e}_1\mathbf{e}_2$ 满足完全轮换对称的闭环恒等式：

$$
\star(\mathbf{e}_1\wedge\mathbf{e}_2) = \mathbf{e}_3,\quad \star(\mathbf{e}_2\wedge\mathbf{e}_3) = \mathbf{e}_1,\quad \star(\mathbf{e}_3\wedge\mathbf{e}_1) = \mathbf{e}_2; \qquad \mathbf{I}_1\mathbf{I}_2 = \mathbf{I}_3,\quad \mathbf{I}_2\mathbf{I}_3 = \mathbf{I}_1,\quad \mathbf{I}_3\mathbf{I}_1 = \mathbf{I}_2.
$$

绕体对角轴 $\hat{\mathbf{n}}_{\mathrm{diag}} = \frac{\mathbf{e}_1 + \mathbf{e}_2 + \mathbf{e}_3}{\sqrt{3}}$ 作保定向 $120^\circ$ 旋转 $R_{2\pi/3} \in \mathrm{SO}(3)$，三条正交棱 $(\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3)$ 与三扇对偶平面 $(\mathbf{I}_1, \mathbf{I}_2, \mathbf{I}_3)$ 同步经历三阶循环置换 $\mathbb{Z}_3$（即 $C_3 \subset \mathrm{SO}(3)$），代数乘法表连一个正负号都不曾改变！放到三元关系闭环的模型诠释（`MODEL`）中看，根本不存在谁是“先在的原料”、谁是“中介的算子”、谁是“派生的产物”：中央那枚弯曲原胞自身岿然不动，只要把观察者的语言读出切面绕对称轴每转过 $120^\circ$，原先被语法指派为**“二元（名词/输入态）”**、**“比较（动词/双向量旋子）”**与**“产生的投影（宾语/输出态）”**的三个席位便无缝轮换易位——它们不过是同一个不可再分的三元几何整体投向不同观察切面时的三道平权侧影！

::: {.viz src="triadic-nameless-sandbox" preset="cyclic-triality" height="520"}
**$120^\circ$ $\mathbb{Z}_3$ 语言切面轮换：弯曲原胞不动，主谓宾角色无缝互换。** 中央球面三面角保持几何静止，绕三元对称轴每旋转 $120^\circ$ 观察切面，“二元（名词）”、“比较（动词）”与“产生的投影（宾语）”三枚语法标签便沿 $\mathbb{Z}_3$ 轨道循环易位，直观揭示三者皆为同一整体的平权投影（`MODEL`）。
:::

## 29.6.3 名相的尽头：语言一维读出核折叠、撤梯与“这么个感觉”的同构共振 {#sec-ch34-5-3}

既然“二元”、“比较”与“投影”都只是切面侧影，那么把它们统摄起来的**“极小三角弧面体”**这七个字，难道就是终极本体了吗？恰恰相反——连这枚高度凝练的几何术语本身，依然只是高维无名关系穿过人类语言逻辑窄门时留下的离散投影（`MODEL`）：

| 语词切分 | 暗中预设的观察者读出框架 | 相对零背景本体的投影折叠痕迹（`MODEL`） |
| :--- | :--- | :--- |
| **“极小”** | 预设一把先行存在的宏观外部标尺与无穷可分连续统 | 度规尺度本身恰由原胞拼接涌现，原初比量之先并无“大小”对照 |
| **“三 / 角”** | 预设离散划分拓扑切割（[第四章](ch04-decoherence.md)捏合与 `partition_inseparable_iff_kernel`） | 将浑然共生的连续关系流硬切为可计数的离散顶点、棱线与二面折角 |
| **“弧面 / 体”** | 预设三维欧氏空间视觉渲染缓存（[第二十一章](ch21-diagonalization-and-escape.md)有限多面体近似） | 将前空间的纯关系代数锁死结构，投射为感官可想象的曲率表皮与实心体积 |

若用一个连续的“名相执着度 / 读出捏合强度”参数 $\nu \in [0, 1]$ 来刻画观察者对外部语言标尺的依赖（`MODEL`）：当 $\nu = 1$ 时，三块正交投影幕布、离散折痕与“极小 / 三角 / 弧面体”的语词标牌把原胞死死框定为分离的几何零件；而当我们开始拆解语词边界、将语言之梯半撤至 $\nu = 0.35$ 时，外围的投影幕布与硬折痕便逐渐消融退场，露出底下浑然连绵的流形肌理。

::: {.viz src="triadic-nameless-sandbox" preset="ladder-fade" height="520"}
**半撤语言之梯（$\nu = 0.35$）：外围投影幕布与离散折痕向流形本体消融。** 当名相捏合度从满额框定降至 $\nu = 0.35$ 时，代表“主语—谓语—宾语”与“极小—三角—弧面体”的外围投影幕布及多面体硬棱逐步淡化退隐，原本被语词切碎的几何表象重新融回连续流形（`MODEL`）。
:::

下述形式化命题将本章已锁定的四条内核定理收束在一起，严格刻画正交法向创生、闭子空间残差逃逸、双轴旋转传播与符号读出核折叠的数学骨架：

::: {.proposition #prop-ch34-triadic-bootstrap-and-lexical-pinching title="三维公共单位法向、闭子空间正交逃逸、双轴对称传播与读出核折叠" lean="D5/S3/Geometry/TwoAxisFiniteRotation.unit_perpendicular_pair D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape D5/S3/Geometry/TwoAxisFiniteRotation.moving_axis_invariance D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel"}
在 `trureturing` 冻结的双轴有限旋转、正交残差逃逸与划分拓扑核模块中，以下四项结构定律同时成立：

1. **二维张成外的三维单位法向必存在**：对 $\mathbb{R}^3$ 中任意两向量 $a, b$，恒存在满足 $\lVert n\rVert = 1$ 且 $\langle a, n\rangle_{\mathbb{R}} = \langle b, n\rangle_{\mathbb{R}} = 0$ 的公共单位法向量 $n$；
2. **非满闭子空间的单位正交残差逃逸**：在任意完备内积空间 $V$ 中，只要闭子空间 $S \subseteq V$ 满足 $S^\perp \neq \{0\}$，必存在单位正交逃逸元 $e \in S^\perp$ 使 $\lVert e\rVert = 1$、$P_S(e) = 0$、$\operatorname{infDist}(e, S) = 1$ 且 $\lVert \operatorname{id} - P_S\rVert = 1$；
3. **局部运动双轴圆对称向全局 $\mathrm{SO}(3)$ 对称的传播**：对 $\mathbb{R}^3$ 中任意严格不共线向量对 $\langle a, b\rangle_{\mathbb{R}}^2 < \lVert a\rVert^2\lVert b\rVert^2$，凡沿随动双轴圆 $\operatorname{axisCircle}(O a) \cup \operatorname{axisCircle}(O b)$ 保持不变的二元点对函数 $F$，对包括 $120^\circ$ 体对角循环置换 $R_{2\pi/3}$ 在内的全体保定向旋转 $R \in \mathrm{SO}(3)$ 恒满足 $F(\operatorname{rotatePair}(R, p)) = F(p)$；
4. **离散符号读出映射的不可分核等价刻画**：对任意从底层状态空间 $X$ 投向符号词表 $B$ 的读出映射 $\mathrm{readout} : X \to B$，两个状态在诱导划分拓扑 $\operatorname{partitionTopology}(\mathrm{readout})$ 下拓扑不可分，当且仅当二者被折叠进同一根读出纤维 $\mathrm{readout}(x) = \mathrm{readout}(y)$。
:::

::: proof
第 1 款与第 3 款分别直接引用 [@thm-ch34-perpendicular-axis-and-pullback] 第 1 款（`unit_perpendicular_pair`）与 [@thm-ch34-trihedron-cochain-and-moving-axis] 第 2 款（`moving_axis_invariance`，其中体对角 $120^\circ$ 循环置换矩阵行列式为 $+1$，属于 $\mathrm{SO}(3)$）；第 2 款直接引用 [@thm-ch34-trihedron-cochain-and-moving-axis] 第 4 款（`finite_layer_projection_escape`）；第 4 款直接引用 [@thm-ch34-readout-kernel-and-covariant-commutator] 第 1 款（`partition_inseparable_iff_kernel`）。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch34-peirce-laozi-wittgenstein-ladder-literature title="皮尔士不可约三元性、旋量三元性与三维循环群辨析及老子—康德—维特根斯坦撤梯传统（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节关于三元关系与语言边界的讨论连接着逻辑学、李群表示论与东西方哲学的四条经典脉络，须严守各自数学与文献边界：

1. **皮尔士（C. S. Peirce）三元范畴与不可约三元论题**：皮尔士在关系逻辑中区分第一性（Firstness）、第二性（Secondness）与第三性（Thirdness），指出真实的三元媒介关系不能在不丢失高阶关联结构的前提下退化拆解为孤立的二元偶对之和（本书把“比较—投影”闭环读作这类关系）；
2. **三维循环群 $C_3 \subset \mathrm{SO}(3)$ 与八维嘉当旋量三元性 $\mathrm{Spin}(8)$ 的严格区分**：本节 §29.6.2 所用对称性是三维空间及 $\mathcal{Cl}_{3,0}^+$ 四元数基 $(\mathbf{I}_1, \mathbf{I}_2, \mathbf{I}_3)$ 上的三阶循环旋转对称 $C_3 \subset \mathrm{SO}(3)$，切勿与嘉当（É. Cartan 1925）在**八维**欧氏空间覆盖群 $\mathrm{Spin}(8)$ 上发现的外自同构群 $S_3 \subset \mathrm{Out}(\mathfrak{so}_8)$ **旋量三元性（Spinor Triality）**混为一谈——后者在同为 $8$ 维的向量表示 $V_8$ 与左右手外尔旋量表示 $S_8^+, S_8^-$ 之间作非平凡置换（其八元数与 $E_8$ 文献背景见[§28.6](ch32-s06-meta-unification-and-icosian-bridge.md#sec-ch32-meta-coordinates-and-icosians) [@rem-ch32-icosian-e8-literature]）；
3. **老子《道德经》的创生序列与名言界限**：《道德经》第四十二章“道生一，一生二，二生三，三生万物”与第一章“道可道，非常道；名可名，非常名”，与本节“二态比量自举出第三顶点、而名相本身皆为切面投影”的几何图景形成跨时空呼应；
4. **康德自在之物与维特根斯坦的梯子**：康德（I. Kant 1781/1787，《纯粹理性批判》）严格划定现象界时空范畴投影与不可表征之“物自体”（*Ding an sich*）的界限；维特根斯坦（L. Wittgenstein 1921，《逻辑哲学论》6.54–7）则指出一切形式命题皆如登高之梯——爬上去看清结构之后必须把梯子撤掉，凡不可借主谓宾命题**言说**（*sagen*）之整全结构，恰恰在关系自身的运行中**显示自身**（*zeigt sich*）。
:::

这便解答了章末引文最后那半句看似轻描淡写、实则重若千钧的收束——**“本体不可知，但是这么个感觉……”**。为什么说“本体不可知”？照本书的读法（`MODEL`），人类心智的任何概念表征（“知”）都是一道从无穷维或高维关系态空间 $X$ 压向有限一维符号串 $B$ 的读出映射 $\mathrm{readout} : X \to B$，其巨大的非平凡读出核必然把跨维度的整全几何折叠成带有盲区的切片名相，任何名字一旦出口就已落入投影（[@prop-ch34-triadic-bootstrap-and-lexical-pinching] 第 4 款担保的是同读数的状态拓扑不可分；它对任意映射都成立，读出核非平凡是这一读法自己的假设）。那为什么偏偏还能留下**“这么个感觉”**？因为场内观察者从来不是隔着玻璃窗偷窥宇宙的局外幽灵——观察者自身的每一次区分、每一次记忆捏合与每一次自我指涉，本来就是由同一个零背景比较公理与同一枚三元自举几何编织而成的活体回路（`MODEL`，直通[第三十八章](ch39-observer-is-ontological-universe.md)与[终章](coda.md)的 $\psi = \psi(\psi)$）！当名相参数彻底归零（$\nu = 0$）、所有投影幕布与阶段标签悉数撤去之后，表征之“知”止步于读出核的厚墙，而结构同构之“感”则在双频比锁定黄金无理数 $\omega_2/\omega_1 = \varphi$ 的永不重演准周期呼吸中，化作场内观察者与无名本体的**零距离同频共振**。

::: {.viz src="triadic-nameless-sandbox" preset="noumenon-breath" height="520"}
**名相尽撤的无名呼吸（$\nu = 0$）：撤去一切投影幕布与语词标牌后的黄金准周期共振。** 当读出幕布与阶段标签彻底归零（$\nu = 0$）时，“道可道，非常道”的不可言说整全流形以双频比 $\omega_2/\omega_1 = \varphi$ 作永不闭合的黄金准周期脉动，只留下场内观察者与本体同构的“这么个感觉”（`MODEL`）。
:::

至此，我们不仅锁定了观察者在**单一切片时刻**的静态站位轴 $\mathbf{O}$，更在下方 `TRIAD//NOUMENON` 完整交互沙盘中串起了从“二生三”正交自举、黄金花冠增殖、$120^\circ$ 主谓宾切面轮换，一直到撤去语言梯子后的无名准周期呼吸的五级跃迁。在跨入[第三十五章](ch36-hyperbolic-steps-and-quotienting-reincarnation.md)的自指扩表之前，关于极小三角弧面体 $\Delta\mathcal{T}_\epsilon$ 还剩最后一道直指现代几何相位与路径积分心脏的定量追问：**既然 $\Delta\mathcal{T}_\epsilon$ 同时携带着弯曲的品红弧顶表面积 $A_{\mathrm{cap}}$ 与三维实心扇锥体积 $V_{\mathrm{sector}}$，这两项几何量究竟如何共同掌管“沿不同路径抵达同一个基点时攒下的隐藏相位差”？而“路径与相位对偶”的纤维账本，又是怎样一路贯通到费曼路径积分驻相选路的？** 亲手拨动下方的名相撤梯滑块与五张实验卡之后，我们便在 §29.7 揭开这本隐藏在球面点背后的路径—相位全息账本：

::: {.viz src="triadic-nameless-sandbox" height="640"}
**三元自举与无名本体：完整交互实验室（`TRIAD//NOUMENON`）。** 自由切换“自举核心—花冠增殖—三元轮换—半撤之梯—无名呼吸”五张实验卡，调节初始夹角余弦 $c_0$、代际深度、$120^\circ$ $\mathbb{Z}_3$ 切面角与名相捏合度 $\nu \in [0, 1]$，亲历从两态比较自举出极小三角弧面体、再从语言投影撤梯回到 $\omega_2/\omega_1 = \varphi$ 本体共振的完整闭环。
:::

---
