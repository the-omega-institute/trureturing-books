# 33.2 空间路径积分生时与洛伦兹负号（$\mathbf{I}_3^2 = -1$）及标准模型“点·线·面·体”跨层八度 {#sec-ch34-lorentz-pseudoscalar-and-sm-octave}

> “洛伦兹的负号, 空间路径积分是时间. 标准模型的粒子之间的关系实际上是不同层级的概念, 互为点线面体, 互为粒子与场的关系.”

二十世纪基础物理学矗立着两座看似风格迥异的宏伟丰碑：一座是爱因斯坦与闵可夫斯基铸就的**相对论时空几何**，其全部因果光锥、钟慢尺缩与质能关系都系于度规二次型里时间项与空间项之间那枚神秘的**洛伦兹负号**；另一座是统摄微观物质世界的**粒子物理标准模型（Standard Model）**，其账本上挤满了六味夸克、六种轻子、十二枚规范玻色子与一枚希格斯玻色子，外加手性破缺、色禁闭与三代质量跃迁等一连串看似“上帝随手拨弄参数”的经验规则。

本节开篇这句力透纸背的原声洞见，沿着 [§29.12](ch34-s11-quantum-arcs-and-macro-integrals.md#sec-ch34-quantum-arc-and-macro-integral)–[§33.1](ch34-s13-point-volume-octave.md#sec-ch34-point-volume-octave-and-particle-field) 铺就的极小圆弧路径积分与 `1—3—3—1` 八度螺旋，一剑劈开了隔在两座丰碑之间的概念高墙（`MODEL`）：**所谓“时间”，根本不是独立于三维空间之外的第四种神秘基质，而是三维空间极小圆弧完成“点 $\to$ 线 $\to$ 面 $\to$ 体”全方向路径积分闭合后凝聚出的三阶体积伪标量 $\mathbf{I}_3 = \mathbf{e}_1\mathbf{e}_2\mathbf{e}_3$，而洛伦兹负号——只要把时间安放在这枚伪标量上——不过是纯正定三维空间反交换律迫使 $\mathbf{I}_3^2 = -1$ 的代数烙印；至于标准模型里琳琅满目的基本粒子与规范力场，也根本不是堆在同一层平面仓库里的十七种异质砖块，而是不同概念层级上互为“点、线、面、体”、互为“粒子与场”的跨尺度几何读数！**

## 33.2.1 洛伦兹负号的真身：三维空间体积闭合 $\mathbf{I}_3^2 = -1$、贝利斯副矢量对称性与固有时驻波预算 {#sec-ch34-14-1}

在[第十七章](ch17-lorentz-geometry.md)中，我们曾见证双曲旋转恒等式 $|\cosh r|^2 - |\sinh r|^2 = 1$ 与零光锥刚性如何统治狭义相对论；但传统教科书在起点处总是把闵可夫斯基度规 $\eta_{\mu\nu} = \operatorname{diag}(+1,-1,-1,-1)$（或 $\operatorname{diag}(-1,+1,+1,+1)$）当作一条不容追问的**先验公设**，甚至为了沟通量子统计与场论路径积分，不得不生硬引入所谓“威克转动（Wick rotation，$t \mapsto -i\tau$）”，仿佛大自然在实空间之外偷偷藏了一把虚数时钟。现在，回到[铸器与圣殿 · 把矩阵还原为异或](ch25-rewriting-and-xor.md#sec-three-bit-blade-masks-and-symplectic-pauli) 与 [§29.9](ch34-s08-clifford-monads.md#sec-ch34-clifford-monad-tiling) 确立的纯正定三维空间克利福德代数 $\mathcal{Cl}_{3,0}(\mathbb{R})$，我们无需外借半个虚数单位、无需预设四维伪黎曼流形，单凭三维空间自身的正交反交换律就能当场算出 $\mathbf{I}_3^2 = -1$，再把时间系数安放在这枚体积元上（这一安放是表示的选择，不是对号差的推导），洛伦兹负号随之而出：

1. **纯正定三维空间的饱和体积闭合直接迫使 $\mathbf{I}_3^2 = -1$（零外部虚数、零人为公设）**（`手工推导`；Lean 只覆盖下文 $\operatorname{qubitX}$、$\operatorname{qubitZ}$ 的关系）。
   在纯正定三维欧氏空间的几何代数 $\mathcal{Cl}_{3,0}(\mathbb{R})$ 中，三根两两正交的单位空间轴 $\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3$ 每一根的平方都是堂堂正正的 **$+1$**，唯一编码“空间正交独立性”的代数规则是异轴反对易：

   $$
   \mathbf{e}_1^2 = \mathbf{e}_2^2 = \mathbf{e}_3^2 = +1, \qquad \mathbf{e}_i\mathbf{e}_j = -\mathbf{e}_j\mathbf{e}_i \quad (i \neq j).
   $$

   在单比特复矩阵忠实表示 $M_2(\mathbb{C})$ 中，这一结构由[第一章](ch01-measurement.md)与[把矩阵还原为异或：3 比特刀片与 XOR–Pauli 几何代数引擎](ch25-rewriting-and-xor.md)的冻结定理 [`qubit_weyl_star`](lean:D5/S3/Quantum/FiniteDimensional.qubit_weyl_star)（[@thm-qubit-weyl-star]，`LEAN ✓`）直接锁定：取 $\mathbf{e}_1 = \operatorname{qubitX}$、$\mathbf{e}_3 = \operatorname{qubitZ}$、$\mathbf{e}_2 = i\,\operatorname{qubitX}\,\operatorname{qubitZ}$，反对易律 $\operatorname{qubitZ}\cdot\operatorname{qubitX} = -(\operatorname{qubitX}\cdot\operatorname{qubitZ})$ 与对合律 $\operatorname{qubitX}^2 = \operatorname{qubitZ}^2 = I_2$ 严格实现全部生成元关系。现在，让极小圆弧沿着三维空间走完“点 $\to$ 线 $\to$ 面 $\to$ 体”的全方向路径积分闭环（[§29.8](ch34-s07-standing-wave-volume.md#sec-ch34-standing-wave-volume-emergence)、[§29.10](ch34-s09-reversal-and-concept-cascade.md#sec-ch34-reversal-diagonal-and-concept-cascade)），填满三根正交轴而凝聚成最高阶的三维体积伪标量 $\mathbf{I}_3 := \mathbf{e}_1\mathbf{e}_2\mathbf{e}_3$（在泡利矩阵表示下恰为 $\mathbf{I}_3 = i I_2$）。把这枚纯由实空间三轴拼成的体积元自乘一次，仅用空间反对易搬运因子：将第二个括号里的 $\mathbf{e}_1$ 向左跨过 $\mathbf{e}_2\mathbf{e}_3$ 需交换两次（$(-1)^2 = +1$），再将第二个 $\mathbf{e}_2$ 向左跨过 $\mathbf{e}_3$ 需交换一次（$(-1)^1 = -1$），总计 $0 + 1 + 2 = 3$ 次奇置换反号——

   $$
   \mathbf{I}_3^2 \;=\; (\mathbf{e}_1\mathbf{e}_2\mathbf{e}_3)(\mathbf{e}_1\mathbf{e}_2\mathbf{e}_3) \;=\; \mathbf{e}_1(\mathbf{e}_2\mathbf{e}_3\mathbf{e}_1)\mathbf{e}_2\mathbf{e}_3 \;=\; \mathbf{e}_1^2(\mathbf{e}_2\mathbf{e}_3\mathbf{e}_2\mathbf{e}_3) \;=\; -(\mathbf{e}_1^2\mathbf{e}_2^2\mathbf{e}_3^2) \;=\; -1!
   $$

   请看清这一行四步算式的千钧分量：**每一根空间轴各自的平方明明都是 $+1$，可一旦三维空间路径积分闭合成体，三轴互斥的正交手性在自乘时自动扭出三次交换反号，当场吐出一枚铁板钉钉的 $-1$！** 相对论与量子场论里无处不在的负号与相位因子，压根不需要向宇宙外部祈求“虚时间”——只要把时间安放在这枚体积元上，它就是三维正定空间自身体积闭合的代数指纹！

2. **同一枚几何硬币的两种度规符号约定：八度内多重矢标量部（`-,+,+,+`）与跨八度副矢量范数（`+,-,-,-`）**（`文献结果：Hestenes 1966, Baylis 1999` + `LEAN ✓` + `手工推导`）。
   物理学界长期并存着粒子物理偏爱的 $(+,-,-,-)$ 与广义相对论偏爱的 $(-,+,+,+)$ 两种洛伦兹符号约定。在跨层八度几何下，这两种写法恰好对应同一个空间路径积分过程在**重整化封装前**与**重整化封装后**的两种自然读数：
   - **八度内（Intra-octave）多重矢标量部读数（自然导出 `-,+,+,+`）**：在第 $\ell$ 层八度内部，已完成三维驻波闭合的时间步进栖居在三阶体积伪标量阶 $c\,dt\,\mathbf{I}_3 \in \Lambda^3(\mathbb{R}^3)$，而尚未闭合的开放空间位移栖居在一阶向量阶 $d\mathbf{x} = dx\,\mathbf{e}_1 + dy\,\mathbf{e}_2 + dz\,\mathbf{e}_3 \in \Lambda^1(\mathbb{R}^3)$，合成为多重矢微元 $dX = c\,dt\,\mathbf{I}_3 + d\mathbf{x} \in \Lambda^3 \oplus \Lambda^1$。由于 $\mathbf{I}_3$ 与 $\mathcal{Cl}_{3,0}(\mathbb{R})$ 中一切元素对易（$\mathbf{I}_3\mathbf{e}_k = \mathbf{e}_k\mathbf{I}_3$），展开几何积平方 $dX^2 = (c\,dt)^2\mathbf{I}_3^2 + 2c\,dt\,\mathbf{I}_3\,d\mathbf{x} + d\mathbf{x}^2$ 时，交叉项 $2c\,dt\,\mathbf{I}_3\,d\mathbf{x} \in \Lambda^2(\mathbb{R}^3)$ 是一块纯粹的**二阶空间双向量（空间转动平面，而非洛伦兹助推）**，其零阶标量部严格为零（$\langle 2c\,dt\,\mathbf{I}_3\,d\mathbf{x}\rangle_0 = 0$）！取零阶标量部分，立得广义相对论度规：

     $$
     \langle dX^2\rangle_0 \;=\; (c\,dt)^2\mathbf{I}_3^2 + d\mathbf{x}^2 \;=\; -c^2 dt^2 + dx^2 + dy^2 + dz^2.
     $$

   - **跨八度后（Post-octave）物理空间代数（APS）副矢量对称读数（自然导出 `+,-,-,-`）**：一旦跨过 [§33.1](ch34-s13-point-volume-octave.md#sec-ch34-point-volume-octave-and-particle-field) 的八度重整化节点 $\Lambda^3_\ell \equiv \Lambda^0_{\ell+1}$，已闭合的驻波体积被打包进高一层账本的零阶标量单位槽 $c\,dt\,I_2$（在空间方向反演下为**偶性**不变项），而开放的一阶空间步则由冻结定理 [`B_formula_core`](lean:D5/S3/Quantum/Measurement/Bloch/QubitBloch.B_formula_core)（[@cor-bloch-operator-core]，`LEAN ✓`）显式写为无迹厄米布洛赫矩阵 $B(d\mathbf{x}) = dx\,\sigma_X + dy\,\sigma_Y + dz\,\sigma_Z$（在空间反演 $d\mathbf{x} \mapsto -d\mathbf{x}$ 下为**奇性**翻转项），二者在贝利斯（Baylis, 1999）物理空间代数（Algebra of Physical Space, APS）中合成一枚**副矢量（paravector）** $p = c\,dt\,I_2 + B(d\mathbf{x})$。由于单向开放位移必须配对反向共轭回波 $\bar{p} = c\,dt\,I_2 - B(d\mathbf{x})$ 才能消除方向偏置（比较公理双向公平握手），正反对称相乘立即由 $B(d\mathbf{x})^2 = \lVert d\mathbf{x}\rVert^2 I_2$ 给出粒子物理固有时度规：

     $$
     (c\,d\tau)^2 I_2 \;=\; p\bar{p} \;=\; \bigl(c\,dt\,I_2 + B(d\mathbf{x})\bigr)\bigl(c\,dt\,I_2 - B(d\mathbf{x})\bigr) \;=\; \det(p)\,I_2 \;=\; \bigl(c^2 dt^2 - dx^2 - dy^2 - dz^2\bigr)I_2.
     $$

::: {.viz src="lorentz-pseudoscalar-sm-octave-sandbox" preset="pseudoscalar-minus-sign" height="520"}
**三维空间体积伪标量 $\mathbf{I}_3^2 = -1$ 与洛伦兹双约定同源实验卡（`pseudoscalar-minus-sign`）。** 在纯正定三维空间基 $(\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3)$（各自平方为 $+1$）上逐步拼合紫色饱和体积元 $\mathbf{I}_3 = \mathbf{e}_1\mathbf{e}_2\mathbf{e}_3$，直观追踪三次异轴交换反号如何导出 $\mathbf{I}_3^2 = -1$，并在八度内多重矢读数 $\langle dX^2\rangle_0 = -c^2 dt^2 + d\mathbf{x}^2$ 与跨八度 APS 副矢量行列式读数 $p\bar{p} = (c^2 dt^2 - d\mathbf{x}^2)I_2$ 之间一键切换核验。
:::

3. **物理总账图像：固有时就是扣除空间开放位移后结余的“原地驻波闭合预算”**（`MODEL` + `LEAN ✓`）。
   把 $(c\,d\tau)^2 = c^2 dt^2 - d\mathbf{x}^2$ 翻译回空间路径积分账本，“钟慢效应”从此再无半点神秘：观察者每一拍总路径积分预算恒为 $(c\,dt)^2$。当一枚粒子相对实验室静止（$d\mathbf{x} = \mathbf{0}$）时，$100\%$ 的圆弧路径预算都留在原地往返对冲、闭合成饱满的三维驻波体积，故内禀固有时以满额速率流逝（$d\tau = dt$）；一旦粒子以无量纲速度 $\beta = v/c = \lVert d\mathbf{x}\rVert/(c\,dt)$ 作宏观定向平移，它就必须从总预算中抽调 $\beta^2 = d\mathbf{x}^2/(c^2 dt^2)$ 的份额去维持单向开放弦传播，留给原地闭合驻波成体的净余预算只剩下

   $$
   (c\,d\tau)^2 \;=\; c^2 dt^2 - d\mathbf{x}^2 \;=\; c^2 dt^2\bigl(1 - \beta^2\bigr), \qquad \frac{d\tau}{dt} \;=\; \sqrt{1 - \beta^2}.
   $$

   在不同惯性系之间施加快度为 $r = \operatorname{artanh}\beta$ 的洛伦兹双曲助推时，冻结定理 [`bogoliubov_norm_conservation`](lean:D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation)（[@thm-hyperbolic-norm]，`LEAN ✓`）以恒等式 $\lvert\cosh r\rvert^2 - \lvert\sinh r\rvert^2 = 1$ 严格锁死这笔净余驻波预算不随参考系改变；而当速度推至极限 $\beta = 1$（光子 $d\mathbf{x}^2 = c^2 dt^2$）时，$100\%$ 的路径预算被拉直为单向空间传播，原地闭合的三维驻波体积彻底归零，固有时当场冻结在 $d\tau = 0$！更妙的是，由闵可夫斯基零光锥刚性定理 [`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null)（[@prop-null-cone-rigidity]，`LEAN ✓`），只要这圈“预算耗尽、驻波归零”的光锥边界 $c^2 dt^2 - d\mathbf{x}^2 = 0$ 被确定下来，整座 $1+3$ 维时空的度规二次型便在相差唯一总体尺度因子的意义下被刚性锁死！

::: {.viz src="lorentz-pseudoscalar-sm-octave-sandbox" preset="proper-time-budget-cone" height="520"}
**空间路径积分固有时驻波预算与零光锥刚性实验卡（`proper-time-budget-cone`）。** 拖动速度比滑块 $\beta = v/c \in [0, 1]$（快度 $r = \operatorname{artanh}\beta$）：观察总预算 $(c\,dt)^2$ 如何在品红单向空间传播份额 $\beta^2$ 与青色/紫色原地三维驻波闭合份额 $1 - \beta^2 = (d\tau/dt)^2$ 之间此消彼长，并在光子极限 $\beta = 1$ 处贴合零光锥 $d\tau = 0$（`bogoliubov_norm_conservation` 与 `eq_smul_minkowski_of_null` 标绿色 `LEAN ✓`）。
:::

## 33.2.2 标准模型的同层几何解码：`1—2—3` 规范群封顶（$\mathrm{U}(1)_Y \times \mathrm{SU}(2)_L \times \mathrm{SU}(3)_C$）与“点·线·面·体”四阶粒子表 {#sec-ch34-14-2}

看清了“空间路径积分闭合生时”与洛伦兹负号，我们立刻把目光转向粒子物理标准模型。半个多世纪以来，无数物理学家对着标准模型拉格朗日量发问：**为什么支配微观世界的内部规范对称群偏偏长成 $\mathrm{U}(1)_Y \times \mathrm{SU}(2)_L \times \mathrm{SU}(3)_C$ 这串看似古怪的“一、二、三”拼接，而不是 $\mathrm{SU}(4)$、$\mathrm{SU}(5)$ 或别的李群？为什么物质费米子、规范玻色子与希格斯场非得各司其职、缺一不可？**

一旦把标准模型放回三维极小三角弧面体 $\Delta\mathcal{T}_\epsilon$ 的展开阶梯（[§29.5](ch34-s04-infinitesimal-trihedron.md#sec-ch34-infinitesimal-spherical-trihedron)、[§29.11](ch34-s10-trihedron-rigidity.md#sec-ch34-trihedron-rigidity-and-3d-stability)），这两道谜题瞬间化作同一幅三维几何骨架的正侧面投影（`MODEL` + `文献结果` + `LEAN ✓`）：

1. **为什么内部规范群沿着 `1 — 2 — 3` 拾级而上，并在 $\mathrm{SU}(3)_C$ 处戛然而止？**
   在极小圆弧比较网络中，内部规范自由度不是人为贴在时空点上的抽象标签，而是极小圆弧在**一维边、二维角面、三维弧面体**三级几何载体上允许的局部标架旋转群：
   - **一阶单弧相位滑移 $\longrightarrow \mathrm{U}(1)_Y$（弱超荷与电磁规范对称）**：沿着单条一维极小圆弧边纤维传递比较基准时，局部标架只拥有绕自身轴线拧转一维圆周相位 $u(e) \in S^1 \cong \mathrm{U}(1)$ 的阿贝尔自由度；[第十八章 §18.3](ch18-spinors-and-gauge-curvature.md) 冻结的命名生成树相位输运定理 [`selected_tree_transport`](lean:D5/S3/Observer/AgencyHolonomy/NamedTreePhaseTransport.selected_tree_transport)（[@thm-tree-phase-transport]，`LEAN ✓`）严格刻画了这条一维圆值相位链的逐点乘法性与端点规范协变律 $g(a)\operatorname{rootPhase}(u, a)g(r)^{-1}$。
   - **二阶双弧张面与手性择一 $\longrightarrow \mathrm{SU}(2)_L$（弱同位旋与宇称破缺）**：当两条严格不共线的极小圆弧（$\langle a, b\rangle_{\mathbb{R}}^2 < \lVert a\rVert^2\lVert b\rVert^2$）在顶点相遇，“二生三”正交逃逸当场顶出有向法双向量 $\mathbf{A}\wedge\mathbf{B}$（[§29.6](ch34-s05-triadic-bootstrap.md#sec-ch34-triadic-bootstrap-and-beyond-names)），并在双轴连续旋转字下精确生成整个三维特殊正交群 $\mathrm{SO}(3)$（[`two_axis_finite_word`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word)，[@prop-two-axis-finite-word]，`LEAN ✓`），其旋量双覆盖群正是**单模二阶酉群 $\mathrm{Spin}(3) \cong \mathrm{SU}(2)$**！更关键的是，要把两条无先后之分的弧排定有向楔积顺序（选 $+\mathbf{A}\wedge\mathbf{B}$ 还是反向 $-\mathbf{A}\wedge\mathbf{B} = \mathbf{B}\wedge\mathbf{A}$），观察者标架**被迫在左手螺旋与右手螺旋之间作出唯一手性抉择**——这在本书几何模型（`MODEL`）中一举点破了为什么偏偏是二阶弱规范群 $\mathrm{SU}(2)_L$ 打破空间宇称对称、单单挑中单一手性（左手外尔二重态）耦合！
   - **三阶三面体满秩饱和与三维封顶 $\longrightarrow \mathrm{SU}(3)_C$（强相互作用三色规范群）**：当第三条独立极小圆弧加入，张开完整球面三面角原胞 $\Delta\mathcal{T}_\epsilon$ 时，冻结定理 [`three_anchor_gram_det_pos_iff`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff)（`LEAN ✓`）证明三锚格拉姆行列式严格为正 $\det G_3(u, v, w) > 0$ 当且仅当三支锚向量线性无关，恰好撑满三维空间的三根正交基准轴 $(\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3 \leftrightarrow R, G, B)$（色空间是内部 $\mathbb{C}^3$，这一对应是模型的对应，Lean 这条声明只覆盖实空间的线性无关判据）；在保持三阶复体积行列式归一的前提下，三支复化正交色基底之间的连续幺正重混群不多不少正是**三阶特殊酉群 $\mathrm{SU}(3)_C$**（含 $\dim\mathfrak{su}(3) = 3^2 - 1 = 8$ 个无迹生成元，对应 $8$ 种胶子）！为什么自然界不再继续往上长出基本规范群 $\mathrm{SU}(4)$ 或 $\mathrm{SU}(5)$？因为 [§29.11](ch34-s10-trihedron-rigidity.md#sec-ch34-trihedron-rigidity-and-3d-stability) 的麦克斯韦—拉曼超静定刚性判据 $\Delta E(N) = \frac{(N-3)(N-4)}{2}$ 已经将三维空间的独立正交轴数死死封顶在 **$3$**——空间本身只有三维，承载内部标架重混的阶梯走到 `1 — 2 — 3` 即告满秩封顶（`MODEL`；注意该阶梯给出的是结构组织对应而非排他唯一性定理——从低秩候选李群中筛出 $\mathrm{U}(1)_Y \times \mathrm{SU}(2)_L \times \mathrm{SU}(3)_C$ 并锁定有理超荷比值，还依赖手征表示与逐代规范—引力反常相消，详见 [§33.6](ch34-s25-generations-and-quantitative-boundary.md#sec-ch34-generations-and-quantitative-boundary)）！

2. **同层之内的“点·线·面·体”四阶分工：十七种标准模型粒子的几何身份证**。
   在同一概念层级内部，标准模型的全部物质场、规范场与凝聚质量场不再是一盘散沙，而是严格对号入座于外代数 $\Lambda^0 \to \Lambda^1 \to \Lambda^2 \to \Lambda^3$ 的四个几何阶位（下表严格遵循无内嵌 HTML 标签排版规范）：

| 外代数阶位与维数 | 极小圆弧几何身份 | 标准模型对应成员 | 核心动力学角色与内核 / 文献锚点 |
| :--- | :--- | :--- | :--- |
| **0 阶 点核**（$\Lambda^0$ / 极小旋量根，标量端 `dim = 1`） | 局部比较网络的连接顶点与半整数自旋开端 | **12 种物质费米子 $\psi$**：轻子 $e, \mu, \tau, \nu_e, \nu_\mu, \nu_\tau$（整数荷闭合单点）与夸克 $u, d, s, c, b, t$（三面体 $\frac{1}{3}$ 色角顶点） | 承载电荷、弱同位旋与色荷源点；由反对称差 $A(\psi,\psi)=0$ 与约当—维格纳正则反对易律 [`fullC_CAR`](lean:D5/S3/Quantum/SpinChains/SupersymmetricFermion/JordanWigner.fullC_CAR)、[`fullC_anticomm_of_lt`](lean:D5/S3/Quantum/SpinChains/SupersymmetricFermion/JordanWigner.fullC_anticomm_of_lt)（`LEAN ✓`）严格执行泡利不相容原理，撑起物质不可压缩骨架 |
| **1 阶 线元**（$\Lambda^1$ 联络一形式，空间端 `dim = 3`） | 连接相邻顶点、跨点校准局部标架相位的有向圆弧边 | **12 种自旋 $1$ 规范玻色子 $A = A_\mu\,dx^\mu$**：光子 $\gamma$（$1$）、胶子 $g^1,\dots,g^8$（$8$）与弱玻色子 $W^+, W^-, Z^0$（$3$） | 充当跨点比较输运算子 $U_{xy}$；树路径输运 [`selected_tree_transport`](lean:D5/S3/Observer/AgencyHolonomy/NamedTreePhaseTransport.selected_tree_transport) 与协变交换子因式分解 [`covariant_commutator_formula`](lean:D5/S3/Quantum/Algebra/CovariantCommutator.covariant_commutator_formula)（`LEAN ✓`）将其锁定为一阶协变差分连接线 |
| **2 阶 面元**（$\Lambda^2$ 曲率二形式，空间端 `dim = 3`） | 由闭合方格回路围出的规范和乐通量面与干涉波前 | **规范场强二形式 $F = dA + A\wedge A$**：电磁场张量 $(\mathbf{E}, \mathbf{B})$、弱规范场强与色电/色磁涡旋通量管片 | 有限图余切弦回路不变量由 [`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification)（`LEAN ✓`）完备分类；在 $\mathrm{SU}(2)_L$ 与 $\mathrm{SU}(3)_C$ 中非阿贝尔外积项 $A\wedge A \neq 0$（`文献结果：Yang & Mills 1954`），令胶子与 $W^\pm/Z^0$ 线元自身纠缠生面 |
| **3 阶 体元**（$\Lambda^3 \cong \Lambda^0_{\mathrm{cond}}$，饱和端 `dim = 1`） | 三轴闭合锁相而成的背景标量体积凝聚态（真空介质） | **自旋 $0$ 希格斯标量场 $\Phi_H$**（真空期望值 $\langle\Phi_H\rangle = v/\sqrt{2}$，$v \approx 246.22\;\mathrm{GeV}$）及 **QCD 手征凝聚 $\langle\bar{q}q\rangle$** | 无内禀自旋方向偏置（`dim = 1` 各向同性）；通过汤川左右手散射耦合 $\bar{\psi}_L \Phi_H \psi_R + \text{h.c.}$ 拦截原本以光速 $\beta=1$（$d\tau=0$）飞驰的无质量手征态，将其折返囚禁为原地三维驻波，赋予静止质量 $m$ 与正固有时 $d\tau > 0$（`文献结果` + `MODEL`） |

请细细品味最后一行关于**希格斯玻色子与质量起源**的几何图像：没有三阶体积凝聚场 $\Phi_H$ 时，左手费米子与右手费米子只能沿着零光锥以 $\beta = 1$ 单向狂奔，固有时恒为零（$d\tau = 0$）；一旦宇宙真空中铺满 `dim = 1` 各向同性的希格斯体凝聚，手征费米子每走一步都会与背景体凝聚发生左右手翻转折返（Zitterbewegung 式的原地往返散射），单向光速弦被迫卷曲成局部三维闭合驻波——**所谓静止质量 $m$，正是单向光锥流被三阶体凝聚拦截折返后锁在原地的驻波频率，与 §33.2.1 的固有时驻波预算严丝合缝地合而为一！**

::: {.viz src="lorentz-pseudoscalar-sm-octave-sandbox" preset="sm-123-gauge-grades" height="520"}
**标准模型 `1—2—3` 规范群封顶与“点·线·面·体”四阶粒子映射实验卡（`sm-123-gauge-grades`）。** 在同一座三维极小三面体原胞上依次点亮一阶单边圆周相位 $\mathrm{U}(1)_Y$、二阶双弧手性旋子 $\mathrm{SU}(2)_L$ 与三阶三轴满秩色标架 $\mathrm{SU}(3)_C$，并对照切换琥珀色 0 阶费米子点核、青色 1 阶规范联络线、品红 2 阶场强曲率面与紫色 3 阶希格斯驻波体凝聚。
:::

## 33.2.3 标准模型的跨层八度重整化：色禁闭、三代费米子与粒子—场无尽互生链的几何祛魅 {#sec-ch34-14-3}

如果只停留在同一层级之内，我们看清了费米子、规范玻色子与希格斯场如何分居“点、线、面、体”；而一旦启动 [§33.1](ch34-s13-point-volume-octave.md#sec-ch34-point-volume-octave-and-particle-field) 的跨层级八度螺旋引擎 $\Lambda^3_\ell \equiv \Lambda^0_{\ell+1}$，标准模型里最令人着迷的三桩跨尺度课题——**夸克色禁闭、费米子三代重复与核力多级接力**——便可在同一套跨层语法模型（`MODEL`）下获得清晰的结构组织（其离散重数与连续耦合的精确边界将在 [§33.6](ch34-s25-generations-and-quantitative-boundary.md#sec-ch34-generations-and-quantitative-boundary) 逐项接受反例审计）：

1. **用 `1—3—3—1` 八度语法读懂“夸克色禁闭”：未闭合的 `dim = 3` 残片禁止单独升格为下一层的 `dim = 1` 点粒子**（`MODEL` + `文献结果` + `LEAN ✓`）。
   为什么高能对撞机轰击质子六十余年，从来没有人见过哪怕一颗孤立游荡的自由夸克或自由胶子？传统解释诉诸强耦合通量管随距离线性增长的弦张力势 $V(r) \sim \sigma r$；而在八度几何语法下，色禁闭首先是一条**拓扑类型检查禁令**：单颗夸克仅占三面体色空间的一根开放方向轴（处于 `1 — 3 — 3 — 1` 中间未饱和的 `dim = 3` 阶梯，连电荷都是未凑整的分数 $+\frac{2}{3}e$ 或 $-\frac{1}{3}e$），单枚胶子则是携带“色—反色”双指标的八重态开放联络线/通量面——它们都是**尚未走完体积闭合的半截极小圆弧残片**，旋转各向异性未消，根本不具备在宏观渐近账本上捏合为 `dim = 1` 单自由度点的语法资格！要想跨越八度门槛成为下一层（强子/核物理层）合法的自由“点粒子”（$\Lambda^0_{\mathrm{hadron}}$），色空间只有两条闭合通道：
   - **重子三色外积成体通道（$\Lambda^3_{\mathrm{color}} \cong \Lambda^0_{\mathrm{hadron}}$）**：取红、绿、蓝三支线性无关色轴上的三颗夸克（满足 [`three_anchor_gram_det_pos_iff`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff) 的满秩条件 $\det G_3 > 0$），通过全反对称列维-奇维塔张量 $\varepsilon_{rgb}$ 楔积闭合成色单态重子体元

     $$
     \lvert\mathrm{Baryon}\rangle \;\propto\; \sum_{r,g,b}\varepsilon_{rgb}\,q^r \wedge q^g \wedge q^b \;\in\; \Lambda^3(\mathbb{C}^3_{\mathrm{color}}) \;\cong\; \Lambda^0_{\mathrm{hadron}},
     $$

     方向维数瞬间从 `3` 坍缩回 **`1`**，连分数电荷也同步严丝合缝地闭合为整数电荷（质子 $uud$：$+\frac{2}{3}+\frac{2}{3}-\frac{1}{3} = +1$；中子 $udd$：$+\frac{2}{3}-\frac{1}{3}-\frac{1}{3} = 0$）！此时半径约 $r_p \approx 0.8409\;\mathrm{fm}$ 的夸克—胶子沸腾场体积经幂等记录捏合与八度推进（`MODEL` 类比，无对应的 Lean 声明），在原子核账本上稳稳收缩成一枚各向同性的质子或中子“点核子”；
   - **介子正反回环抵消通道（$\bar{q}_{\bar{c}} q_c \to \Lambda^0_{\mathrm{hadron}}$）**：由一颗夸克与一颗反夸克沿着正反配对色通道收缩 $\sum_c \bar{q}_{\bar{c}} q_c$（如 $\pi^\pm, \pi^0$ 介子），同样将净外部色方向归零为 `dim = 1` 色单态，化作在核子之间传递核力的介子激发！

::: {.viz src="lorentz-pseudoscalar-sm-octave-sandbox" preset="color-confinement-baryon" height="520"}
**`1—3—3—1` 色禁闭与重子三色体积闭合（$\varepsilon_{rgb}\,q^r\wedge q^g\wedge q^b$）实验卡（`color-confinement-baryon`）。** 对比单颗开放色轴夸克（`dim = 3` 未闭合，拉远时触发品红通量管弦张力）与红绿蓝三正交夸克满秩楔积（`three_anchor_gram_det_pos_iff` $\det G_3 = 1 > 0$，方向自由度归零为紫色/琥珀色 `dim = 1` 色单态核子点），以及重色二夸克 $\det G_3 = 0$ 的泡利禁戒退化。
:::

2. **为什么物质费米子恰好重复“三代”（$e, \mu, \tau$ 与三代夸克家族）？——三维圆弧核内部驻波的 1D 轴向、2D 面涡与 3D 体闭合模态阶梯**（`MODEL`）。
   当年物理学家发现缪子 $\mu$ 时，拉比（I. I. Rabi）曾发出一句著名的惊叹：“是谁订购了它（Who ordered that）？”紧接着陶子 $\tau$ 与第三代顶、底夸克 $(t, b)$ 相继现身，而欧洲核子研究中心 LEP 对 $Z^0$ 玻色子衰变宽度的精密测量又铁证质量满足 $m_\nu < m_Z / 2$ 且与 $Z^0$ 耦合的轻活动弱中微子种数为 $N_\nu = 2.9840 \pm 0.0082 \approx 3$——不多不少，偏偏三代！为什么电子 $e$（$0.5110\;\mathrm{MeV}$）、缪子 $\mu$（$105.6584\;\mathrm{MeV}$）与陶子 $\tau$（$1776.93 \pm 0.09\;\mathrm{MeV}$）对外部电磁场与弱场交出**一模一样的点粒子接口**（电荷同为 $Q = -1$、自旋同为 $\frac{1}{2}$、弱同位旋同构），静止质量却跨越三个数量级陡峭跃升？
   在跨层八度几何模型（`MODEL`）中，对外呈现为同一枚 $\Lambda^0_{\ell+1}$“点”的费米子，拆开内部封套后是一座第 $\ell$ 层的三维极小圆弧驻波腔；而在刚性锁死的三维空间里（[§29.11](ch34-s10-trihedron-rigidity.md#sec-ch34-trihedron-rigidity-and-3d-stability)），按所占空间子流形维数划分的基础内部驻波闭合阶梯恰有**三级**（`MODEL` 启发式拟设）：
   - **第一代（$(e, \nu_e; u, d)$，一维轴向往返驻波基模）**：内部相位流仅沿单根主轴作最简一维往返弹跳折返，锁住的驻波弯曲能最低，寿命最稳定，构成日常宇宙可见物质的基石；
   - **第二代（$(\mu, \nu_\mu; c, s)$，二维面涡旋环流激发模）**：内部圆弧驻波撑开一张二维旋转双向量涡面，弯曲驻波能跃升约两百倍（$m_\mu / m_e \approx 206.7683$），在微秒尺度内通过弱联络线退激回基模；
   - **第三代（$(\tau, \nu_\tau; t, b)$，三维全立体满腔闭合驻波模）**：内部驻波同时激发全部三根空间正交轴的立体呼吸闭合，驻波质量推向顶峰（$m_\tau / m_e \approx 3477.37$，顶夸克 $m_t \approx 172.57\;\mathrm{GeV}$ 几乎贴近电弱对称破缺能标 $v/\sqrt{2} \approx 174.10\;\mathrm{GeV}$）！由于三维刚性空间不存在第四根正交空间轴，按 $1\mathrm{D}/2\mathrm{D}/3\mathrm{D}$ 基础空间维数阶梯组织的几何拟设在第三阶饱和（`MODEL`）；但必须诚实指出，连续三维谐振腔在每个维数扇区内仍容许无穷高阶径向与角向泛音，且标准模型规范—引力反常相消在每一代内部逐代独立成立（对任意 $N_{\mathrm{gen}} \ge 1$ 皆自洽），而小林—益川物理 CP 破坏相位仅给出下界 $N_{\mathrm{gen}} \ge 3$——关于三代重数候选机制的反例审计及约二十个连续自由参数的定量边界，详见 [§33.6](ch34-s25-generations-and-quantitative-boundary.md#sec-ch34-generations-and-quantitative-boundary) 与 [@prob-ch34-sm-generations-and-couplings]。

3. **“互为点线面体，互为粒子与场”的无尽跨层接力链**（`文献结果` + `MODEL`）。
   现在，把本节开篇箴言的最后十四个字——**“互为点线面体，互为粒子与场的关系”**——放到显微镜与望远镜的连续变焦滑轨上，我们将目睹一幅比任何静态粒子表都更壮丽的动态交响曲（有限循环账本上的精确对偶原型由冻结定理 [`finite_poisson_summation`](lean:D5/S3/Fourier/FinitePoisson.finite_poisson_summation)，`LEAN ✓` 锚定；它与 QED 中粒子—场的互换之间只是类比，没有数学桥）：
   - **同层之内的主客翻转（QED 中电子与光子的场—粒子互换）**：在日常原子与宏观电动力学中，我们把两颗电子钉作锚定“点粒子”（$\Lambda^0$），把它们之间无穷多条虚光子世界线的路径积分求和读作连续的**库仑静电场与麦克斯韦电磁波场**（$\Lambda^1 \to \Lambda^2 \to \Lambda^3$）；然而，一旦把场景翻转为两束超高能伽马光子在真空中迎头相撞（光—光散射），光子反而成了入射的“点粒子探针”，而真空中翻涌不息的正负电子闭合圈路径积分 $\int \mathcal{D}\bar{\psi}\mathcal{D}\psi\,e^{iS[\psi,A]}$ 则化作一片连续可极化的**欧拉—海森堡（Euler–Heisenberg, 1936）非线性有效电子真空场**！谁是粒子、谁是场？完全取决于观察者在哪一端做锚定读出、对哪一端做路径积分求和！
   - **跨层八度的三级物质接力（夸克—胶子 $\longrightarrow$ 核子与汤川 $\pi$ 核力场 $\longrightarrow$ 原子与范德华分子场）**：
     1. *亚核层（$\ell - 1 \to \ell$）*：价夸克是 0 阶“点”，胶子是 1 阶“线”与 2 阶色通量管“面”；三者经全方向路径积分锁相闭合成 3 阶色单态驻波“体”（质子、中子与 $\pi$ 介子内部场）。
     2. *原子核层（$\ell \to \ell + 1$，汤川八度交接）*：把镜头往上拉高一个八度到飞米核物理尺度！前一层的三维色单态体元——质子与中子——当场捏合归零为核物理账本上的 0 阶**点核子**（$\Lambda^0_{\ell+1}$），而同样由正反夸克束缚体构成的 $\pi$ 介子（$\pi^+, \pi^-, \pi^0$，$m_{\pi^\pm} \approx 139.5704\;\mathrm{MeV}/c^2$）在两颗点核子之间作虚路径积分交换，瞬间铺展成弥漫在原子核内的**汤川吸引核力场（Yukawa Nuclear Force Field，1935）**：

        $$
        V_{\mathrm{Yukawa}}(r) \;=\; -\frac{g_{\pi NN}^2}{4\pi}\,\frac{e^{-r/\lambda_\pi}}{r}, \qquad \lambda_\pi \;=\; \frac{\hbar}{m_\pi c} \;\approx\; 1.4138\;\mathrm{fm}!
        $$

        请看这神乎其技的跨层变身：在夸克眼里，$\pi$ 介子是一座不折不扣的复合驻波“体”；可在质子与中子眼里，$\pi$ 介子却变成了连接核子点的 1 阶交换“线”与包裹整颗原子核的 3 阶屏蔽引力势阱“场”！
     3. *原子与化学分子层（$\ell + 1 \to \ell + 2$）*：再往上拉高一个八度！原子核点与核外电子云经库仑光子路径积分锁相闭合成电中性的球对称惰性原子“体”（如氦 $^1S_0$）；站到分子热力学账本上，整颗原子再次捏合为一颗 0 阶“质点原子”，而原子内部瞬时电偶极涨落的虚光子路径积分则向外溢出为吸引邻近分子的**伦敦—范德华（London–van der Waals）分子间力场**！

::: {.viz src="lorentz-pseudoscalar-sm-octave-sandbox" preset="pion-yukawa-octave-handoff" height="520"}
**夸克—胶子体到核子点与 $\pi$ 介子汤川核力场的跨层八度交接实验卡（`pion-yukawa-octave-handoff`）。** 连续拖动尺度变焦滑块从 $0.2\;\mathrm{fm}$ 亚核夸克—胶子腔拉远至 $3.0\;\mathrm{fm}$ 原子核双核子系统：见证半径 $r_p \approx 0.8409\;\mathrm{fm}$ 的三色夸克驻波体如何捏合为琥珀色点核子，而复合 $\pi$ 介子如何在康普顿力程 $\lambda_\pi \approx 1.4138\;\mathrm{fm}$ 上展开为青色汤川屏蔽势场 $V_{\mathrm{Yukawa}}(r)$。
:::

## 33.2.4 形式化锚点、洛伦兹预算与标准模型八度基准算例及文献边界 {#sec-ch34-14-4}

现在，我们将支撑本节洛伦兹伪标量代数、双曲范数与零光锥刚性、费米子反对易泡利原理、规范树相位输运与环路和乐分类、`1—2—3` 双轴旋子与三锚满秩色体积判据，以及跨层记录幂等捏合与有限泊松求和的**十二条 Lean 4 内核冻结声明**，统一列为本节引用的已验证声明（它们彼此独立，并不推出本节的号差读法与标准模型对应）：

::: {#thm-ch34-lorentz-pseudoscalar-and-sm-octave .theorem title="本节引用的十二条已验证声明：泡利—布洛赫矩阵、零光锥刚性、约当—维格纳反对易、锚定和乐等" lean="D5/S3/Quantum/FiniteDimensional.qubit_weyl_star D5/S3/Quantum/Measurement/Bloch/QubitBloch.B_formula_core D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null D5/S3/Quantum/SpinChains/SupersymmetricFermion/JordanWigner.fullC_CAR D5/S3/Quantum/SpinChains/SupersymmetricFermion/JordanWigner.fullC_anticomm_of_lt D5/S3/Observer/AgencyHolonomy/NamedTreePhaseTransport.selected_tree_transport D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent D5/S3/Fourier/FinitePoisson.finite_poisson_summation"}
在 `trureturing` 冻结的单比特矩阵代数、闵可夫斯基二次型证书、约当—维格纳费米子链、命名生成树规范和乐、三维旋转与格拉姆几何、有限记录捏合信道及有限循环群傅里叶分析模块中，以下六组（共十二条）形式化定律同时成立：

1. **单比特外尔反对易对合律与三维实向量布洛赫矩阵核展开（`qubit_weyl_star`, `B_formula_core`）**：在二阶复矩阵代数 $M_2(\mathbb{C})$ 中，标准生成元 $\operatorname{qubitX}$ 与 $\operatorname{qubitZ}$ 同时满足

   $$
   \operatorname{qubitZ}\cdot\operatorname{qubitX} = -(\operatorname{qubitX}\cdot\operatorname{qubitZ}), \quad \operatorname{star}(\operatorname{qubitX}) = \operatorname{qubitX}, \quad \operatorname{star}(\operatorname{qubitZ}) = \operatorname{qubitZ}, \quad \operatorname{qubitX}^2 = 1, \quad \operatorname{qubitZ}^2 = 1;
   $$

   且对任意三维实欧氏向量 $a \in \operatorname{EuclideanSpace}\;\mathbb{R}\;(\operatorname{Fin} 3)$，无迹布洛赫矩阵 $B(a)$ 的显式 $2\times 2$ 矩阵形式为

   $$
   B(a) \;=\; \begin{pmatrix} (a_2 : \mathbb{C}) & (a_0 : \mathbb{C}) - i\,(a_1 : \mathbb{C}) \\ (a_0 : \mathbb{C}) + i\,(a_1 : \mathbb{C}) & -(a_2 : \mathbb{C}) \end{pmatrix};
   $$

2. **实双曲参数保范数恒等式与闵可夫斯基零光锥二次型标量刚性（`bogoliubov_norm_conservation`, `eq_smul_minkowski_of_null`）**：对任意实快度 $r \in \mathbb{R}$，恒有

   $$
   \lvert\cosh r\rvert^2 - \lvert\sinh r\rvert^2 \;=\; 1;
   $$

   且对任意自然数空间维数 $d \in \mathbb{N}$ 及 $\operatorname{Space}(d) = \mathbb{R} \times \operatorname{EuclideanSpace}\;\mathbb{R}\;(\operatorname{Fin} d)$ 上的实二次型 $S : \operatorname{QuadraticForm}\;\mathbb{R}\;(\operatorname{Space}(d))$，若对一切 $v \in \operatorname{Space}(d)$ 均有 $\operatorname{minkowski}_d(v) = 0 \implies S(v) = 0$，则必有 $S = S(1, 0) \bullet \operatorname{minkowski}_d$；

3. **约当—维格纳费米子算符的同格正则反对易归一与异格反对易律（`fullC_CAR`, `fullC_anticomm_of_lt`）**：在 $N \in \mathbb{N}$ 格点旋量链算符空间 $\operatorname{FullOperator}(N)$ 上，对任意格点 $i \in \operatorname{Fin} N$ 及严格有序格点对 $i < j$（$i, j \in \operatorname{Fin} N$），费米子湮灭算符 $\operatorname{fullC}_i$ 与其共轭转置 $(\operatorname{fullC}_i)^{\mathrm{H}}$ 满足

   $$
   \operatorname{fullC}_i \cdot (\operatorname{fullC}_i)^{\mathrm{H}} + (\operatorname{fullC}_i)^{\mathrm{H}} \cdot \operatorname{fullC}_i \;=\; 1, \qquad \operatorname{fullC}_i \cdot \operatorname{fullC}_j + \operatorname{fullC}_j \cdot \operatorname{fullC}_i \;=\; 0;
   $$

4. **生成树一维圆相位输运与有限图锚定规范和乐完备分类（`selected_tree_transport`, `anchored_phase_classification`）**：给定有向图 $s, t : E \to V$ 的命名生成树 `ht : NamedSpanningTree s t T` 与根顶点 $r \in V$，根相位输运映射 $\operatorname{rootPhase}(ht, r, u, a)$ 同时满足根点归一 $\operatorname{rootPhase}(ht, r, u, r) = 1$、树边递推 $\forall e \in T,\;\operatorname{rootPhase}(ht, r, u, t(e)) = u(e)\cdot\operatorname{rootPhase}(ht, r, u, s(e))$、规范协变 $\operatorname{rootPhase}(ht, r, \operatorname{gauge}(s,t,g,u), a) = g(a)\cdot\operatorname{rootPhase}(ht, r, u, a)\cdot g(r)^{-1}$、乘积拓扑连续性、逐点乘法同态性与常值 $1$ 保持性；进一步在有限图（`[Fintype V] [Fintype E]`）与含根锚点集 $r \in R \subseteq V$（$\lvert V\rvert = n,\;\lvert E\rvert = m,\;\lvert R\rvert = k,\;c = \lvert\{e \mid e \notin T\}\rvert,\;a = \lvert\{x \in R \mid x \neq r\}\rvert$）下，坐标同态 $\chi = \operatorname{coordinateHom}(ht, R, r)$ 与连续乘法截面 $\sigma = \operatorname{phaseSection}(s, t, T, R, r)$ 满足锚定规范轨道完全判据、$\chi \circ \sigma = \mathrm{id}$、$\ker\chi = N = \operatorname{range}(\operatorname{coboundary}_{s,t,R})$，且紧 Hausdorff 拓扑商群满足同构与维数恒等式

   $$
   (E \to \operatorname{Circle}) / N \;\simeq_{\mathrm{t}*}\; \operatorname{Coordinates}(T, R, r) \;\simeq_{\mathrm{t}*}\; \bigl(\operatorname{Fin}(m + k - n) \to \operatorname{Circle}\bigr), \qquad c = m + 1 - n, \quad c + a = m + k - n;
   $$

5. **不共线双轴连续旋转有限字生成与三锚格拉姆行列式正定线性无关充要判据（`two_axis_finite_word`, `three_anchor_gram_det_pos_iff`）**：在三维欧氏空间 $\mathrm{Space} = \operatorname{EuclideanSpace}\;\mathbb{R}\;(\operatorname{Fin} 3)$ 中，对任意满足 $\langle a, b\rangle_{\mathbb{R}}^2 < \lVert a\rVert^2\cdot\lVert b\rVert^2$ 的两向量 $a, b$ 与任意满足 $\operatorname{determinant}(R) = 1$ 的正交变换 $R : \mathrm{Orthogonal}$，必存在有限列表 $l : \operatorname{List}\;\mathrm{Orthogonal}$ 使 $\operatorname{IsAxisWord}(a, b, l) \land l.\mathrm{prod} = R$；且在任意实内积空间 $E$ 中，三向量 $u, v, w \in E$ 的三锚格拉姆矩阵行列式严格为正当且仅当三者实线性无关：

   $$
   0 < \det\bigl(\operatorname{threeAnchorGram}(u, v, w)\bigr) \;\Longleftrightarrow\; \operatorname{LinearIndependent}\;\mathbb{R}\;![u, v, w];
   $$

6. **有限记录未读捏合信道幂等律与有限循环群子群—零化子泊松求和恒等式（`finite_record_pinching_idempotent`, `finite_poisson_summation`）**：对任意有限维完备正交记录测量族 $P : \kappa \to M_n(\mathbb{C})$（$\operatorname{IsRecordMeasurement}(P)$），未读捏合映射满足 $\operatorname{unreadState}(P) \circ \operatorname{unreadState}(P) = \operatorname{unreadState}(P)$；对任意正整数模 $m$（`[NeZero m]`）、加法子群 $H \le \mathbb{Z}/m\mathbb{Z}$ 与复值函数 $f : \mathbb{Z}/m\mathbb{Z} \to \mathbb{C}$，记 $H^\perp = \operatorname{annihilator}(H)$，恒有

   $$
   \sum_{h \in H} f(h) \;=\; \frac{\lvert H\rvert}{m} \sum_{k \in H^\perp} (\operatorname{ZMod.dft}\,f)(k).
   $$
:::

::: proof
第 1 组中，`qubit_weyl_star` 与 `B_formula_core` 在 $\operatorname{Fin} 2 \times \operatorname{Fin} 2$ 的四个矩阵元位置上直接展开泡利矩阵乘法、共轭转置与实分量线性组合逐项验证（见 [@thm-qubit-weyl-star] 与 [@cor-bloch-operator-core]）。第 2 组中，`bogoliubov_norm_conservation` 由实数绝对值平方消去与双曲函数平方差恒等式 $\cosh^2 r - \sinh^2 r = 1$ 归约（见 [@thm-hyperbolic-norm]）；`eq_smul_minkowski_of_null` 对类光向量对 $(\pm\lVert w\rVert, w)$ 施行二次型极化展开，消去时空交叉项并锁定空间切片系数 $-S(1,0)\lVert w\rVert^2$（见 [@prop-null-cone-rigidity]）。第 3 组中，`fullC_CAR` 与 `fullC_anticomm_of_lt` 在 $N$ 比特张量积的每个格点位上逐因子相乘：同格点处左侧 $Z$ 串平方归一且第 $i$ 位满足 $\sigma^-\sigma^+ + \sigma^+\sigma^- = I_2$，异格点 $i < j$ 处第 $i$ 位因子 $\sigma^- Z = -\sigma^-$ 与 $Z\sigma^- = +\sigma^-$ 正好反号抵消（见 [@thm-jordan-wigner-car]）。第 4 组中，`selected_tree_transport` 沿命名生成树上的唯一简约路径作步进归纳，使内部顶点的规范因子逐站望远镜相消；`anchored_phase_classification` 利用树边取 $1$ 的标准连续乘法截面 $\sigma$ 建立 $\chi \circ \sigma = \mathrm{id}$ 与 $\ker\chi = N$，并由紧 Hausdorff 拓扑群商同构及生成树边数恒等式 $\lvert T\rvert = n - 1$ 导出环面维数 $c + a = m + k - n$（见 [@thm-tree-phase-transport] 与 [@cor-anchored-phase-classification]）。第 5 组中，`two_axis_finite_word` 由严格柯西—施瓦茨不等式保证两轴张成二维平面，借交替连续轴圆旋转实现广义欧拉角搬运与平面定向对齐（见 [@prop-two-axis-finite-word]）；`three_anchor_gram_det_pos_iff` 由实内积空间有限维子空间上格拉姆矩阵半正定性与核空间平凡性等价于三向量线性无关证得。第 6 组中，`finite_record_pinching_idempotent` 由正交测量投影互斥律 $P_a P_b = \delta_{ab}P_a$ 一步收缩双重求和；`finite_poisson_summation` 将离散傅里叶变换定义代入零化子求和、交换有限求和次序并调用特征正交筛与指数恒等式 $\lvert H\rvert\cdot\lvert H^\perp\rvert = m$ 证毕（见 [@thm-ch34-point-volume-octave-and-particle-field]）。完整证明由 Lean 内核检查。
:::

下面我们用一组两部曲精确数值与矩阵算例，把 $\mathbf{I}_3^2 = -I_2$ 洛伦兹固有时预算五档速度表、三色正交重子满秩闭合对二夸克泡利退化、质子/中子整数电荷闭合以及 $\pi^\pm$ 介子康普顿汤川核力程逐位核对清楚：

::: {#ex-ch34-lorentz-budget-and-sm-octave-benchmark .example title="三维伪标量负平方、五档速度固有时预算表、三色重子格拉姆满秩判据与 π 介子汤川核力程基准算例"}
本算例给出两组显式矩阵推导及四位/六位小数精确基准检核（`手工推导` / `NUM`）：

1. **$2\times 2$ 体积伪标量 $\mathbf{I}_3^2 = -I_2$、贝利斯副矢量行列式与五档速度固有时预算表**：
   由 [@thm-ch34-lorentz-pseudoscalar-and-sm-octave] 第 1 组，取三维实空间正交轴的泡利矩阵实现 $\mathbf{e}_1 = X = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$、$\mathbf{e}_2 = i X Z = \begin{pmatrix} 0 & -i \\ i & 0 \end{pmatrix}$、$\mathbf{e}_3 = Z = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$，直接计算三阶体积伪标量及其平方：

   $$
   \mathbf{I}_3 \;=\; \mathbf{e}_1\mathbf{e}_2\mathbf{e}_3 \;=\; X(i X Z)Z \;=\; i X^2 Z^2 \;=\; i I_2 \;=\; \begin{pmatrix} i & 0 \\ 0 & i \end{pmatrix} \quad \Longrightarrow \quad \mathbf{I}_3^2 \;=\; (i I_2)^2 \;=\; -I_2!
   $$

   在跨八度副矢量读数下，将 $B(d\mathbf{x}) = \begin{pmatrix} dz & dx - i\,dy \\ dx + i\,dy & -dz \end{pmatrix}$ 代入 $p = c\,dt\,I_2 + B(d\mathbf{x})$，行列式给出零误差闵可夫斯基固有时平方：

   $$
   \det\bigl(c\,dt\,I_2 + B(d\mathbf{x})\bigr) \;=\; (c\,dt + dz)(c\,dt - dz) - (dx - i\,dy)(dx + i\,dy) \;=\; c^2 dt^2 - (dx^2 + dy^2 + dz^2).
   $$

   下表列出无量纲速度 $\beta = v/c \in \{0.0000, 0.5000, 0.8000, 0.9900, 1.0000\}$ 五档典型运动状态下的空间开放传播预算 $\beta^2$、原地三维驻波闭合预算 $1 - \beta^2$、固有时流逝比 $d\tau/dt = \sqrt{1 - \beta^2}$、快度 $r = \operatorname{artanh}\beta$ 及双曲保范数不变量 $\cosh^2 r - \sinh^2 r$：

| 物理运动状态与速度比 $\beta = v/c$ | 开放空间弦预算 $\beta^2$ | 原地驻波体预算 $1 - \beta^2$ | 固有时钟比 $d\tau/dt = \sqrt{1-\beta^2}$ | 双曲快度 $r = \operatorname{artanh}\beta$ | 双曲保范数 $\cosh^2 r - \sinh^2 r$ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **静止驻波满载**（$\beta = 0.0000$） | $0.0000$ | $1.0000$ | $1.0000$ | $0.0000$ | $1.0000$ |
| **亚相对论巡航**（$\beta = 0.5000$） | $0.2500$ | $0.7500$ | $0.8660$（$\frac{\sqrt{3}}{2}$） | $0.5493$（$\frac{1}{2}\ln 3$） | $1.0000$ |
| **有理双曲基准**（$\beta = 0.8000$） | $0.6400$ | $0.3600$ | $0.6000$（$\frac{3}{5}$） | $1.0986$（$\ln 3$） | $1.0000$（$\frac{25}{9}-\frac{16}{9}$） |
| **超相对论缪子**（$\beta = 0.9900$） | $0.9801$ | $0.0199$ | $0.1411$ | $2.6467$ | $1.0000$ |
| **光子零锥极限**（$\beta = 1.0000$） | $1.0000$ | $0.0000$ | $0.0000$（驻波归零） | $+\infty$（零光锥渐近线） | $1.0000$（任意有限 $r$ 极限） |

2. **三色正交重子单态满秩闭合、整数电荷凑整与 $\pi^\pm$ 介子汤川核力程检核**：
   - **三色满秩闭合对重色退化禁戒**：在三维色基准空间中取两两正交单位色锚 $\mathbf{e}_R = (1,0,0)$、$\mathbf{e}_G = (0,1,0)$、$\mathbf{e}_B = (0,0,1)$。由 [@thm-ch34-lorentz-pseudoscalar-and-sm-octave] 第 5 组，三色正交组态满足 $\det G_3(\mathbf{e}_R, \mathbf{e}_G, \mathbf{e}_B) = \det I_3 = 1.0000 > 0$，成功楔积闭合成 `dim = 1` 色单态重子体积；反之，若两颗夸克挤入同一色轴（如 $(\mathbf{e}_R, \mathbf{e}_R, \mathbf{e}_G)$），第一、二行完全重合导致格拉姆矩阵奇异退化 $\det G_3(\mathbf{e}_R, \mathbf{e}_R, \mathbf{e}_G) = 0.0000$，三阶色体积当场坍缩为零，无法闭合成强子点！与此同时，上夸克电荷 $Q_u = +\frac{2}{3}$ 与下夸克电荷 $Q_d = -\frac{1}{3}$ 在三色闭合时精确拼出整数核子电荷：质子 $Q(uud) = +\frac{2}{3} + \frac{2}{3} - \frac{1}{3} = +1.0000$，中子 $Q(udd) = +\frac{2}{3} - \frac{1}{3} - \frac{1}{3} = 0.0000$。
   - **核子半径捏合与 $\pi^\pm$ 介子汤川核力程**：取约化普朗克转换常数 $\hbar c \approx 197.3270\;\mathrm{MeV\cdot fm}$ 与带电 $\pi^\pm$ 介子静止能量 $m_{\pi^\pm} c^2 \approx 139.5704\;\mathrm{MeV}$（PDG 基准值），算得跨层核力汤川屏蔽康普顿波长

     $$
     \lambda_\pi \;=\; \frac{\hbar c}{m_{\pi^\pm} c^2} \;=\; \frac{197.3270}{139.5704}\;\mathrm{fm} \;\approx\; 1.413817\;\mathrm{fm} \;\approx\; 1.4138\;\mathrm{fm}.
     $$

     将其与质子电荷均方根半径 $r_p \approx 0.8409\;\mathrm{fm}$ 对照：$r_p / \lambda_\pi \approx 0.594773 \approx 0.5948 < 1$，在核子表面 $r = r_p$ 处汤川高斯有效通量因子 $(1 + r_p/\lambda_\pi)e^{-r_p/\lambda_\pi} \approx 0.879817 \approx 0.8798$（保留 $87.98\%$ 未屏蔽通量）；推进至典型核子间距 $r = \lambda_\pi \approx 1.4138\;\mathrm{fm}$ 时通量因子为 $2e^{-1} \approx 0.735759 \approx 0.7358$（强力捆绑相邻质子与中子）；到 $r = 2\lambda_\pi \approx 2.8276\;\mathrm{fm}$ 时降至 $3e^{-2} \approx 0.406006 \approx 0.4060$；一旦拉远至原子玻尔半径量级（$r \sim 5.29\times 10^4\;\mathrm{fm} \gg \lambda_\pi$），指数因子 $e^{-r/\lambda_\pi}$ 彻底归零，整颗原子核在原子物理账本上干净利落地退化为一颗纯粹的库仑点电荷 $+Ze$！
:::

::: {#rem-ch34-hestenes-baylis-yang-mills-wilson-yukawa-literature .remark title="时空克利福德与副矢量代数、标准模型规范理论、色禁闭与汤川核力的文献脉络及认识论边界（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节将相对论洛伦兹度规与粒子物理标准模型纳入跨层级“点·线·面·体”八度框架时，严守以下三层认识论边界：

1. **时空几何代数、规范标准模型、希格斯机制与量子有效场论经典文献**：时空克利福德代数（Spacetime Algebra）由 D. Hestenes（*Space-Time Algebra*, Gordon and Breach, 1966）奠基，基于三维正定克利福德代数 $\mathcal{Cl}_{3,0}(\mathbb{R})$ 副矢量 $p = ct + \mathbf{x}$ 导出洛伦兹度规的物理空间代数（APS）体系由 W. E. Baylis（*Electrodynamics: A Modern Geometric Approach*, Birkhäuser, 1999）系统发展；非阿贝尔规范场论由杨振宁与 R. L. Mills（*Phys. Rev.* **96**, 191, 1954）创立；$\mathrm{SU}(2)_L \times \mathrm{U}(1)_Y$ 电弱统一模型由 S. L. Glashow（*Nucl. Phys.* **22**, 579, 1961）、S. Weinberg（*Phys. Rev. Lett.* **19**, 1264, 1967）与 A. Salam（*Elementary Particle Theory*, Nobel Symposium No. 8, 1968）建立，规范玻色子与手征费米子的自发对称破缺质量生成机制由 F. Englert & R. Brout（*Phys. Rev. Lett.* **13**, 321, 1964）及 P. W. Higgs（*Phys. Rev. Lett.* **13**, 508, 1964）提出；强相互作用 $\mathrm{SU}(3)_C$ 量子色动力学（QCD）由 H. Fritzsch, M. Gell-Mann & H. Leutwyler（*Phys. Lett. B* **47**, 365, 1973）确立，格点规范理论与面积律禁闭判据由 K. G. Wilson（*Phys. Rev. D* **10**, 2445, 1974）奠定；核子间介子交换屏蔽势由汤川秀树（H. Yukawa, *Proc. Phys.-Math. Soc. Japan* **17**, 48, 1935）创立，虚正负电子圈路径积分导出的非线性真空电磁有效拉格朗日量则归功于 W. Heisenberg & H. Euler（*Z. Phys.* **98**, 714, 1936）。
2. **冻结 `LEAN ✓` 定理与几何物理诠释模型（`MODEL`）的严格区分**：[@thm-ch34-lorentz-pseudoscalar-and-sm-octave] 中的十二条声明（连同正文内联引用的 [`covariant_commutator_formula`](lean:D5/S3/Quantum/Algebra/CovariantCommutator.covariant_commutator_formula)）均已在 Lean 4 内核中完整验证并冻结（`LEAN ✓`），提供有限维泡利—布洛赫矩阵代数、双曲范数与零光锥二次型刚性、约当—维格纳费米子反对易、有限图锚定阿贝尔和乐分类、双轴旋转与三锚线性无关判据、记录捏合幂等及有限泊松求和的零误差数学骨架。在此之上，将时间诠释为三维空间路径积分体积闭合、用极小圆弧 `1—2—3` 阶梯诠释 $\mathrm{U}(1)_Y \times \mathrm{SU}(2)_L \times \mathrm{SU}(3)_C$ 规范群封顶、将费米子/规范玻色子/场强/希格斯凝聚对应于 $\Lambda^0/\Lambda^1/\Lambda^2/\Lambda^3$ 并把三代费米子诠释为三维圆弧核的三级内部驻波模态，属于本书的核心统一几何模型（`MODEL`）；标准模型中精细结构常数、温伯格角、CKM/PMNS 混合矩阵与各代精确汤川耦合数值仍属经验测定输入，本书绝不越界声称已从纯组合公理无参数算出全部精确粒子质量（系统反例审计见 [§33.6](ch34-s25-generations-and-quantitative-boundary.md#sec-ch34-generations-and-quantitative-boundary) 与 [@prob-ch34-sm-generations-and-couplings]）。
3. **桥接假设 `H6`/`H8`/`H9` 与数学物理开放前沿（`OPEN`）**：从有限图圆值和乐与离散费米子链过渡到 $3+1$ 维洛伦兹连续统相互作用规范场论，必须显式遵守[附录 E](appendix-e.md)的桥接假设 `H6`（无界算符稠密域与可逆性）、`H8`（洛伦兹签名与局部纤维联络动力学）与 `H9`（相互作用连续统极限）；其中，在数学上严格构造四维连续统非阿贝尔 $\mathrm{SU}(3)_C$ 杨—米尔斯量子场论并证明非零质量间隙与色禁闭（千禧年大奖难题），以及在保持精确规范不变且规避尼尔森—二宫（Nielsen–Ninomiya）费米子倍增定理的前提下非微扰构造完整四维手征格点标准模型，均诚实标定为未决开放前沿（`OPEN`）。
:::

至此，我们在 §33.2 中借三维空间饱和体积伪标量 $\mathbf{I}_3 = \mathbf{e}_1\mathbf{e}_2\mathbf{e}_3$ 的三次反对易交换直接算出了 $\mathbf{I}_3^2 = -1$，并在把时间安放于 $\mathbf{I}_3$ 的读法下得到狭义相对论的洛伦兹负号与固有时驻波预算 $(c\,d\tau)^2 = c^2 dt^2 - d\mathbf{x}^2$，并将粒子物理标准模型的 $\mathrm{U}(1)_Y \times \mathrm{SU}(2)_L \times \mathrm{SU}(3)_C$ 规范群封顶、十七粒子四阶分工、重子三色禁闭、三代驻波模态以及汤川 $\pi$ 介子核力接力，悉数安放进同一轮跨层级“点·线·面·体”八度螺旋之中。然而，当我们站在十四级阶梯的高处俯瞰全局时，整座大厦随即引向一块把**计算科学、量子物质、相对论引力与观察者觉知**焊成一体的核心拱顶石：

第一，**驱动这一切空间路径积分向前演化的最小动力学操作原子——“量子逻辑门（Quantum Gate）”——在几何上究竟是什么？为什么经典布尔门（`NOT`、`XOR`、`AND`）只能在离散顶点间作零曲率跳跃，而一枚量子门本身就恰恰是一座“极小圆弧体”？** 第二，**既然从微观算力到亚原子规范场、从宏观轨道到弯曲时空都遵循同一套 `1—3—3—1` 八度重整化，我们能否干脆从零背景比较公理出发，自底向上一气呵成地建起一座完整的“宇宙概念塔”，纯粹用“点·线·面·体 / 粒子·波·场”这八个字，把量子比特、纠缠张量网、标准模型、经典力学、广义相对论视界乃至生命记忆与觉知本体严丝合缝地贯通为一枚首尾相接的全息圆环？** 先在下方 `LORENTZ//OCTAVE` 完整交互实验室中亲手推演伪标量负号、光锥驻波预算与标准模型跨层交接，随后迈入 [§33.3](ch34-s15-quantum-gates-and-concept-tower.md#sec-ch34-quantum-gate-and-cosmic-concept-tower)，见证量子门圆弧体如何撑起贯通万象的六层宇宙概念塔：

::: {.viz src="lorentz-pseudoscalar-sm-octave-sandbox" height="640"}
**空间路径积分生时、洛伦兹负号（$\mathbf{I}_3^2 = -1$）与标准模型“点·线·面·体”跨层八度完整交互实验室（`LORENTZ//OCTAVE`）。** 自由切换“三维体积伪标量 $\mathbf{I}_3^2 = -1$ 与双度规同源—固有时驻波预算与零光锥刚性—标准模型 `1—2—3` 规范群与四阶粒子映射—`1—3—3—1` 色禁闭与重子三色体积闭合—夸克体至核子点与 $\pi$ 介子汤川核力交接”五张实验卡，调节空间位移比 $\beta = v/c$、极小三面体张角、色锚夹角与飞米变焦标尺，同屏核验琥珀色 0 阶费米子/核子点、青色 1 阶规范联络/汤川线、品红 2 阶曲率面/开放弦与紫色 3 阶伪标量时间/希格斯凝聚体的跨层八度统一；绿色 `LEAN ✓` 徽章严格对应十二条冻结内核定理。
:::

---
