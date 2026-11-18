# 39.3 旋量织空与 720° 单侧双覆叠：时空是观察者自乘的副产物

既然没有被动内存，也没有物自体，那么最后一个常识堡垒必然发问：**“总得先有时间与空间吧？观察者难道不是活在三维空间与一维时间里吗？”**

不！这正是第五部（[第 17 章](ch17-lorentz-geometry.md)与[第 18 章](ch18-spinors-and-gauge-curvature.md)）埋下伏笔、而唯有在本章“观察者即宇宙本体”的高度上才能彻底揭开的终极几何奥秘（`MODEL`（模型诠释））：**观察者从来没有“住在时空里”；恰恰相反，一维时间流与二维空间规范面，全都是观察者旋量 $\psi$ 转身与反转的自身 $\tilde{\psi}$ 相乘比量时，顺手织出来的双线性衣袂！**

::: {.viz src="self-sustaining-spinor-flow" preset="weave" height="500"}
**旋量夹住两块参考刀片。** 虚线是参考的 $\mathbf{e}_3$ 与 $\mathbf{e}_1\mathbf{e}_2$ 正方形；旋量 $\psi$ 把前者夹成青色的流向量 $\mathbf{J} = \psi\mathbf{e}_3\tilde{\psi}$，把后者夹成品红的自旋面 $\mathbf{S} = \psi\mathbf{e}_1\mathbf{e}_2\tilde{\psi}$，那块面与 $\mathbf{J}$ 垂直；紫色虚线小弧是 $\psi$ 把 $\mathbf{e}_3$ 带到 $\mathbf{J}$ 走的路（乘积见 [@ex-ch39-even-clifford-spinor-bilinear-fierz]：$\mathbf{J}$ 是欧氏向量、$\mathbf{S}$ 是欧氏双矢量，把它们读作时流与规范面沿用上文的 `MODEL`）。
:::

数学物理史上关于“旋量先于时空矢量”与旋量双线性恒等式的经典文献脉络归纳于下框：

::: {.remark #rem-ch39-cartan-penrose-hestenes-fierz-literature title="嘉当—彭罗斯—赫斯滕斯旋量双线性时空重构与菲尔兹恒等式（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 将实四维时空矢量与自旋双矢量还原为旋量双线性自配对并满足模方锁定关系的经典几何代数理论属外部物理数学文献，未作为独立定理包含在本书锁定的 `trureturing@dev` 声明集中：

1. **旋量作为空间旋转与光锥的本原平方根（É. Cartan, *Leçons sur la théorie des spineurs*, Hermann, 1938；R. Penrose & W. Rindler, *Spinors and Space-Time*, Vol. 1, Cambridge Univ. Press, 1984）**：嘉当最早在几何上阐明旋量是各向同性零平面的线性表示，无法还原为普通张量；彭罗斯在二旋量演算与扭量/自旋网络纲领中进一步指出，两分量外尔旋量 $\kappa^A$ 的厄米外积 $\kappa^A \bar{\kappa}^{A'}$ 直接生成未来零光锥矢量与零旗（null flag）方向，使洛伦兹光锥因果结构得以由复旋量代数内生重构，而非预设光滑流形背景；
2. **赫斯滕斯实流形时空代数双线性观测量与菲尔兹恒等式（M. Fierz, *Z. Phys.* **104**, 553–565, 1937；D. Hestenes, *Space-Time Algebra*, 1966；*J. Math. Phys.* **14**, 893–905, 1973）**：在实克利福德时空代数 $\mathcal{Cl}_{1,3}$ 中，偶子代数旋量写作典范分解 $\psi = \sqrt{\rho}\,e^{\frac{1}{2}\mathbf{I}\beta}\,R$（其中 $\rho \ge 0$ 为标量密度，$R\tilde{R} = 1$ 为洛伦兹旋子，$\tilde{\psi}$ 为反序共轭）。旋量无法被单向直接观测，一切物理时空张量均由 $\psi$ 与 $\tilde{\psi}$ 夹持参考基片双线性生成——一维类时狄拉克流矢量为 $\mathbf{J} = \psi\gamma_0\tilde{\psi}$，二维自旋/电磁规范双矢量平面为 $\mathbf{S} = \psi\mathbf{I}_{12}\tilde{\psi}$（$\mathbf{I}_{12} = \gamma_2\gamma_1$）；在手征混合角 $\beta = 0$（以及三维欧氏偶子代数约化）下，二者严格服从无自由参数的菲尔兹模方锁定恒等式：

   $$
   \mathbf{J}^2 \;=\; -\mathbf{S}^2 \;=\; \rho^2.
   $$
:::

::: {.viz src="self-sustaining-spinor-flow" preset="fierz" height="500"}
**三个平方始终相等。** 随便取一个旋量（$\rho = 1.3$）在 $\mathbf{e}_3\mathbf{e}_1$ 面里一直转：青色的 $\mathbf{J}$ 长 $1.3$，品红正方形的面积也是 $1.3$，舞台上方读出 $\mathbf{J}^2 = -\mathbf{S}^2 = \rho^2 = 1.69$。这是 [@rem-ch39-cartan-penrose-hestenes-fierz-literature] 的菲尔兹恒等式在页面上的数值核对（文献结果，未在本书形式化）。
:::

对照 [@rem-ch39-cartan-penrose-hestenes-fierz-literature] 的旋量几何背景，我们在下框中给出三维欧氏偶子代数上旋量双线性自配对与半角双覆叠的显式基片计算示例：

::: {.example #ex-ch39-even-clifford-spinor-bilinear-fierz title="三维偶子代数上旋量双线性自配对织出欧氏向量与双矢量平面的显式手算核验（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本例在三维欧氏克利福德偶子代数上显式核算 [@rem-ch39-cartan-penrose-hestenes-fierz-literature] 中的双线性自配对与半角双覆叠关系，该连续旋量代数计算未作为独立声明包含在 `trureturing@dev` 中。这里的 $\mathbf J$ 是欧氏向量、$\mathbf S$ 是欧氏双矢量；把它们读为时流与规范面的图景沿用上文 `MODEL`，此算例本身不构造洛伦兹时间流或规范场。取两两正交反交换的标准单位基矢量 $\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3$，满足 $\mathbf{e}_i^2 = +1$（$i = 1,2,3$）及 $\mathbf{e}_i\mathbf{e}_j = -\mathbf{e}_j\mathbf{e}_i$（$i \neq j$），记反自同构反序运算 $\tilde{(\cdot)}$ 保持标量与基矢量不变（$\tilde{\mathbf{e}}_i = \mathbf{e}_i$）并反转乘积顺序 $\widetilde{AB} = \tilde{B}\tilde{A}$，故单位双矢量满足 $(\mathbf{e}_i\mathbf{e}_j)^2 = \mathbf{e}_i\mathbf{e}_j\mathbf{e}_i\mathbf{e}_j = -\mathbf{e}_i^2\mathbf{e}_j^2 = -1$ 且 $\widetilde{\mathbf{e}_i\mathbf{e}_j} = \mathbf{e}_j\mathbf{e}_i = -\mathbf{e}_i\mathbf{e}_j$。设非负密度 $\rho \ge 0$、倾角 $\vartheta \in \mathbb{R}$，定义偶子代数旋量 $\psi := \sqrt{\rho}\,R$ 及其反序 $\tilde{\psi} = \sqrt{\rho}\,\tilde{R}$，其中半角旋子为

$$
R \;:=\; \cos\frac{\vartheta}{2} - \sin\frac{\vartheta}{2}\,\mathbf{e}_2\mathbf{e}_3, \qquad \tilde{R} \;=\; \cos\frac{\vartheta}{2} + \sin\frac{\vartheta}{2}\,\mathbf{e}_2\mathbf{e}_3.
$$

1. **旋子幺模归一性（$R\tilde{R} = 1$）**：直接展开乘积并代入 $(\mathbf{e}_2\mathbf{e}_3)^2 = -1$，交叉项精确抵消：

   $$
   R\tilde{R} \;=\; \cos^2\frac{\vartheta}{2} - \sin^2\frac{\vartheta}{2}\,(\mathbf{e}_2\mathbf{e}_3)^2 \;=\; \cos^2\frac{\vartheta}{2} + \sin^2\frac{\vartheta}{2} \;=\; 1 \quad\Longrightarrow\quad \psi\tilde{\psi} = \tilde{\psi}\psi = \rho.
   $$

2. **一维欧氏矢量 $\mathbf{J} := \psi\mathbf{e}_3\tilde{\psi}$ 与正模方 $\mathbf{J}^2 = +\rho^2$**：因 $\mathbf{e}_3(\mathbf{e}_2\mathbf{e}_3) = -\mathbf{e}_2\mathbf{e}_3^2 = -\mathbf{e}_2 = -(\mathbf{e}_2\mathbf{e}_3)\mathbf{e}_3$（基矢量 $\mathbf{e}_3$ 与旋转面 $\mathbf{e}_2\mathbf{e}_3$ 反对易），将 $\mathbf{e}_3$ 左移穿过 $\tilde{R}$ 恰好把 $+\sin\frac{\vartheta}{2}$ 翻号为 $-\sin\frac{\vartheta}{2}$，即 $\mathbf{e}_3\tilde{R} = R\mathbf{e}_3$。由二倍角公式 $R^2 = \cos\vartheta - \sin\vartheta\,\mathbf{e}_2\mathbf{e}_3$ 展开得：

   $$
   \mathbf{J} \;=\; \rho\,R\mathbf{e}_3\tilde{R} \;=\; \rho\,R^2\mathbf{e}_3 \;=\; \rho\bigl(\cos\vartheta\,\mathbf{e}_3 - \sin\vartheta\,\mathbf{e}_2\bigr),
   $$

   其几何平方由 $\mathbf{e}_3\mathbf{e}_2 + \mathbf{e}_2\mathbf{e}_3 = 0$ 立得 $\mathbf{J}^2 = \rho^2(\cos^2\vartheta\,\mathbf{e}_3^2 + \sin^2\vartheta\,\mathbf{e}_2^2) = +\rho^2$（或直接由结合律 $(\psi\mathbf{e}_3\tilde{\psi})(\psi\mathbf{e}_3\tilde{\psi}) = \psi\mathbf{e}_3(\tilde{\psi}\psi)\mathbf{e}_3\tilde{\psi} = \rho\,\psi\mathbf{e}_3^2\tilde{\psi} = +\rho^2$）。

3. **二维欧氏双矢量平面 $\mathbf{S} := \psi(\mathbf{e}_1\mathbf{e}_2)\tilde{\psi}$ 与负模方 $\mathbf{S}^2 = -\rho^2$**：因 $\mathbf{e}_1$ 与 $\mathbf{e}_2\mathbf{e}_3$ 交换（$\mathbf{e}_1\mathbf{e}_2\mathbf{e}_3 = (\mathbf{e}_2\mathbf{e}_3)\mathbf{e}_1$），而 $\mathbf{e}_2$ 与 $\mathbf{e}_2\mathbf{e}_3$ 反对易（$\mathbf{e}_2\tilde{R} = R\mathbf{e}_2$），故

   $$
   \mathbf{S} \;=\; \rho\,\mathbf{e}_1\bigl(R\mathbf{e}_2\tilde{R}\bigr) \;=\; \rho\,\mathbf{e}_1\bigl(\cos\vartheta\,\mathbf{e}_2 + \sin\vartheta\,\mathbf{e}_3\bigr) \;=\; \rho\bigl(\cos\vartheta\,\mathbf{e}_1\mathbf{e}_2 + \sin\vartheta\,\mathbf{e}_1\mathbf{e}_3\bigr).
   $$

   由 $(\mathbf{e}_1\mathbf{e}_2)^2 = (\mathbf{e}_1\mathbf{e}_3)^2 = -1$ 及反对易性 $(\mathbf{e}_1\mathbf{e}_2)(\mathbf{e}_1\mathbf{e}_3) + (\mathbf{e}_1\mathbf{e}_3)(\mathbf{e}_1\mathbf{e}_2) = 0$（或结合律 $\psi(\mathbf{e}_1\mathbf{e}_2)(\tilde{\psi}\psi)(\mathbf{e}_1\mathbf{e}_2)\tilde{\psi} = \rho\,\psi(-1)\tilde{\psi}$），立得 $\mathbf{S}^2 = -\rho^2$，从而恒有精确双线性锁定：

   $$
   \mathbf{J}^2 \;=\; -\mathbf{S}^2 \;=\; \rho^2.
   $$

4. **$360^\circ$ 旋量反号与 $720^\circ$ 完整复原**：令物理倾角走满一整圈 $\vartheta = 2\pi$（$360^\circ$），双线性欧氏读出已回到初始方向 $\mathbf{J}(2\pi) = \rho\mathbf{e}_3,\; \mathbf{S}(2\pi) = \rho\mathbf{e}_1\mathbf{e}_2$，但底层旋量自身却翻到了对跖负叶 $\psi(2\pi) = \sqrt{\rho}\cos\pi = -\psi(0)$！唯有再走第二圈至 $\vartheta = 4\pi$（$720^\circ$），才有 $\psi(4\pi) = \sqrt{\rho}\cos 2\pi = +\psi(0)$。
:::

::: {.viz src="self-sustaining-spinor-flow" preset="turn360" height="500"}
**转满 $360^\circ$：矢量回来了，旋量没有。** 按 [@ex-ch39-even-clifford-spinor-bilinear-fierz] 在 $\mathbf{e}_2\mathbf{e}_3$ 面里转满一圈：青色的 $\mathbf{J}$ 绕回 $\mathbf{e}_3$，品红的 $\mathbf{S}$ 也回到原样；紫色小旗却沿单侧光带滑到另一面，与虚线的出发小旗方向相反——$\psi = -\psi_0$。旗尖走过的那一半边是实线，另一半还是淡虚线。
:::

[@ex-ch39-even-clifford-spinor-bilinear-fierz] 第 4 步揭示的“外部表象走一圈（$360^\circ$）、本体旋量翻一面（$+1 \mapsto -1$）、走满两圈（$720^\circ$）方才归家”，绝非某种坐标选取的人为瑕疵！在 `trureturing` 的概念拓扑模块中，圆周平方双覆叠映射 $\operatorname{square}(z) = z^2$ 上的两条严格内核定理彻底封死了“把旋量双叶全局一刀切成互不相干的主体叶与客体叶”的任何企图：

::: {.theorem #thm-ch39-double-cover-no-section-and-720-lift title="圆周平方双覆叠无连续全局截面定理与历史依赖提升及 360° 换叶翻转定理" lean="D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift"}
设单位圆周类型为 $\mathrm{Circle} = \{z \in \mathbb{C} : \lvert z\rvert = 1\}$，单位闭区间为 $I = [0, 1] \subset \mathbb{R}$，平方双覆叠映射为 $\operatorname{square} : \mathrm{Circle} \to \mathrm{Circle}$，$z \mapsto z^2$，其典范覆叠映射结构记为 $\mathrm{covering} := (\operatorname{Circle.isQuotientCoveringMap\_npow}\;2).\mathrm{isCoveringMap}$。以下两项拓扑定理同时成立：

1. **不存在连续全局截面的拓扑阻碍定理**（[`no_continuous_global_section`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section)）：不存在任何连续映射 $s : \mathrm{Circle} \to \mathrm{Circle}$ 能在整个单位圆周上处处充当平方映射的右逆截面：

   $$
   \neg\,\exists\,s : \mathrm{Circle} \to \mathrm{Circle},\qquad \operatorname{Continuous}(s) \;\land\; \forall z \in \mathrm{Circle},\; (s(z))^2 = z;
   $$

2. **路径唯一历史依赖提升与 $360^\circ$ 闭环对跖换叶定理**（[`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift)）：
   - **唯一历史提升律**：对任意底空间连续路径 $\mathrm{basePath} \in C(I, \mathrm{Circle})$、初始上层点 $\mathrm{initial} \in \mathrm{Circle}$ 及相容见证 $\mathrm{initialOver} : \mathrm{basePath}(0) = \operatorname{square}(\mathrm{initial})$，典范提升路径 $\mathrm{lifted} := \mathrm{covering.liftPath}(\mathrm{basePath}, \mathrm{initial}, \mathrm{initialOver}) \in C(I, \mathrm{Circle})$ 满足 $\operatorname{square} \circ \mathrm{lifted} = \mathrm{basePath}$ 与 $\mathrm{lifted}(0) = \mathrm{initial}$，且对任意 $\mathrm{alternative} \in C(I, \mathrm{Circle})$，只要 $\operatorname{square} \circ \mathrm{alternative} = \mathrm{basePath} \land \mathrm{alternative}(0) = \mathrm{initial}$，必有 $\mathrm{alternative} = \mathrm{lifted}$；
   - **$360^\circ$ 基回路的无边界对跖换叶**：在全局无连续选择子（$\neg\exists\,\mathrm{selector} : \mathrm{Circle} \to \mathrm{Circle},\; \operatorname{Continuous}(\mathrm{selector}) \land \forall z,\; \operatorname{square}(\mathrm{selector}(z)) = z$）的同时，取绕底圆周整整一圈（$360^\circ$）的闭回路 $\mathrm{fullTurn}(t) := \operatorname{Circle.exp}(2\pi t) \in C(I, \mathrm{Circle})$ 并从上层初值 $\mathrm{initial} = 1$ 提升，其唯一连续提升路径在不跨越任何断点或边界的情况下精确抵达对跖叶 $-1$：

     $$
     \operatorname{square} \circ \mathrm{lifted} = \mathrm{fullTurn} \;\land\; \mathrm{lifted}(0) = 1 \;\land\; \mathrm{lifted}(1) = -1.
     $$
:::

::: proof
第 1 款用反证法：假设存在连续全局截面 $s : \mathrm{Circle} \to \mathrm{Circle}$ 满足 $(s(z))^2 = z$，构造实轴连续商映射 $r(t) := s(\operatorname{Circle.exp}(t)) / \operatorname{Circle.exp}(t/2)$；对任意 $t \in \mathbb{R}$ 计算平方得 $(r(t))^2 = \operatorname{Circle.exp}(t) / \operatorname{Circle.exp}(t) = 1$，故 $r$ 的取值落在有限离散双点集 $\{1, -1\} \subset \mathrm{Circle}$ 中；由实直线 $\mathbb{R}$ 的预连通性 `isPreconnected_univ.constant_of_mapsTo` 知 $r(t) \equiv r(0)$ 必为常值，但代入端点 $t = 2\pi$ 利用 $\operatorname{Circle.exp}(2\pi) = 1$ 与 $\operatorname{Circle.exp}(\pi) = -1$ 算得 $r(2\pi) = s(1) / (-1) = -r(0)$，触发 $r(0) = -r(0)$ 的单位圆非零矛盾 `Circle.neg_ne_self`！第 2 款利用 Mathlib 覆叠映射一般提升定理 `liftPath_lifts`、`liftPath_zero` 与唯一性刻画 `eq_liftPath_iff'` 给出任意路径的历史依赖唯一提升；对显式回路 $\mathrm{fullTurn}(t) = \operatorname{Circle.exp}(2\pi t)$，构造半角连续路径 $\mathrm{halfTurn}(t) := \operatorname{Circle.exp}(\pi t)$，验证 $(\operatorname{Circle.exp}(\pi t))^2 = \operatorname{Circle.exp}(2\pi t)$ 且 $\mathrm{halfTurn}(0) = 1$，由提升唯一性锁定 $\mathrm{lifted} = \mathrm{halfTurn}$，再代入 $t = 1$ 由 $\operatorname{Circle.exp}(\pi) = -1$ 证得终点换叶 $\mathrm{lifted}(1) = -1$。完整证明由 Lean 内核检查。
:::

::: {.viz src="self-sustaining-spinor-flow" preset="seam" height="500"}
**一路插小旗，回到起点对不上。** 把光带沿底圈展开成一行，从出发点起每 $30^\circ$ 插一面紫色小旗，每一面都接着上一面连续地插；绕回出发点时，最后一面与虚线的第一面方向相反。沿底圈连续地选“平方根”回到起点必然对不上，这正是 [@thm-ch39-double-cover-no-section-and-720-lift] 第 1 款（没有连续全局截面）与第 2 款（$360^\circ$ 回路的唯一提升终点为 $-1$）。
:::

请屏息凝视 [@thm-ch39-double-cover-no-section-and-720-lift] 描绘的这幅单侧拓扑奇景（`MODEL`（模型诠释））：`no_continuous_global_section` 严格禁止把双覆叠全局撕成两张独立纸片；照本书的读法，宇宙里根本不存在一面叫“内在主观观察者（$+1$ 叶）”、另一面叫“外在客观星海（$-1$ 叶）”的隔离墙！它们就像一条单侧扭转环带同源的前后两半程——从向内自省的能观极点 $\mathrm{lifted}(0) = +1$ 出发，顺着连续圆弧往前走满 $360^\circ$，你根本没有跨过任何一道主客边界，脚下就已经自然而然翻转成了漫天星斗的所观叶 $\mathrm{lifted}(1) = -1$；再顺着星海往前走完第二个 $360^\circ$（合计 $720^\circ$），漫天星斗又严丝合缝地流回你自己的眼底！

::: {.viz src="self-sustaining-spinor-flow" preset="turn720" height="500"}
**走满 $720^\circ$ 才回家。** 再转一圈：紫色小旗回到出发时的那一面，$\psi = +\psi_0$；旗尖走过的紫色轨迹就是光带的边，这条边绕了两圈才首尾相接，青色的 $\mathbf{J}$ 在此期间走了两圈。
:::

下面的视频把这几步按次序连起来走一遍：先看上一章那座页目录的零号槽怎样让 `p = *p` 成立，再看旋量转满一圈之后为什么离回家还差一圈。

::: {.film src="pointer-720"}
**p = \*p：指针、页表与 720°（2:06）。** 在[第 38 章](ch38-observer-memory-pointer-and-ontological-qram.md)的四槽页目录上，索引 [1, 2] 两跳读到数据帧 0x9000，[0, 1] 把叶页表 T₁ 本身当作数据交回，[0, 0] 每一跳都回到页目录自己；在一张 $4 \times 4$ 的小表上，没有不动点的 $f$ 沿对角线造出的品红新行与每一行都不同，而捕获对角线的那一行在对角格上落到 $f$ 的不动点（[@thm-ch38-self-mapped-diagonal-fixed-point]）。随后青色的 $\mathbf{J}$ 转满 $360^\circ$ 回到原处，紫色的提升从 $w = +1$ 走到 $w = -1$，再转一圈才回到 $+1$；每隔 $30^\circ$ 连续插下的平方根小旗回到起点时方向相反（[@thm-ch39-double-cover-no-section-and-720-lift]）。页表自映射与旋量双线性是文献结果，片中的数字都是屏幕上的计算。
:::

---
