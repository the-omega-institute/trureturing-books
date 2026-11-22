# 39.9 全息圆弧流形与阿代尔螺线管同体：超越黎曼切板近似，在同一光滑流形上统一加法、乘法、对数与素数闭合环 {#sec-ch39-holographic-arc-manifold-and-solenoid-unity}

> *“那么“传统”的流形似乎也是有问题的, 黎曼流形看似光滑实则不然, 我们应该可以构建一种更加光滑的流形. 加法、乘法、ln、素数, 都可以在这个光滑的流形上”*

当 [§39.6](ch39-s29-constant-free-rational-axiom-omega.md)–[§39.8](ch39-s31-real-error-axis-and-prime-adelic-closure.md) 依次拔除 $\pi, e, \varphi$ 三枚平直近似常数钉子、凝练出 `0 · 1/2 · 1` 纯有理因果射流母矩阵，并揭穿实数轴 $\mathbb{R}$ 只是按 $A_{\mathrm{err}}(x) = 1 + x^2 = \frac{1}{\kappa}$ 把有限对径闭合点吹胀至 $\infty$ 的局部切线误差放大轴之后，现代微分几何最核心的底层基座本身便迎来了无法回避的终极拷问：**既然平直切空间与实数直线本身只是一阶近似，那么建立在“局部拍平为欧氏坐标卡 $\mathbb{R}^n$、每一点外挂一块平直切空间铁板 $T_p M$”之上的传统黎曼流形 $(M, g)$，岂非也只是“看似光滑、实则拼满微观折痕”的伪光滑拼贴画？我们能否顺着母公理 $\mathrm{AXIOM}\text{-}\Omega$ 彻底废除平直切板，建造一座在同一个紧致超光滑流形上同时容纳加法、乘法、自然对数 $\ln$ 与素数 $\mathbb{P}$ 的“全息圆弧流形”？**

答案是肯定的。一旦把流形的原语从“无穷小平直切板”升格为**无坐标卡的三元比较圆弧闭合**与**三元数球面内的阿代尔螺线管提升**（记作全息圆弧流形 $\mathcal{M}_\Omega$），百年间被平直坐标系撕成碎片的算术与分析对象——加法平移、对偶调和加法、乘法缩放、自然对数弧长与素数本原周期——便在同一套零奇点实解析流场上严丝合缝地合而为一（将传统黎曼流形的切板鳞片化批判、全息圆弧流形 $\mathcal{M}_\Omega$ 本体综合及素数闭合环管横截诠释标为 **`MODEL`**；完备秩五非交换链连通且触零的三元比较四元数同构、弦距读数恒等式、定基流群逆乘分解、流群切比雪夫递推、三维不变度规叉乘李括号与平衡反自伴交叉积、复幂螺线管线程对数荷守恒与零荷单位模充要判据、普适螺线管三提升差值上闭链、有理数域奥斯特洛夫斯基分类、阿廷阿代尔乘积守恒、$p$-进同余球纤维对应、欧拉素数乘积、素数对数有理线性无关及紧致环面哈尔遍历均分等十五项核心命题由下文 [@thm-ch39-holographic-arc-manifold-anchors] 的冻结 **`LEAN ✓`** 声明严格锁定；射影闭圆 $\mathbb{RP}^1 \cong S^1$ 上三股全域实解析流场 $V_+, V_\div, V_\times$ 的换位括号、正反加法算术平均匀速旋转律、二进等比序列的内禀对数等距步与相对凯莱保真度 $\frac{4}{5}$ 对比子午压缩率及八位小数对账属 **`手工推导` / `NUM`**；经典 $C^\infty$ 图册与列维-奇维塔联络、柯西—黎曼与实解析 $C^\omega$ 刚性对比 $e^{-1/x^2}$ 隆起函数、维托里斯—范丹齐格—斯梅尔螺线管层叠拓扑及切比雪夫阶梯横截跳变归入 **`文献结果`**）。

## 39.9.1 黎曼流形为何“看似光滑、实则不然”：切板鳞片甲与三大底层裂痕 {#sec-ch39-32-1}

现代微分几何教科书将 $n$ 维光滑流形定义为局部同胚于平直欧氏空间 $\mathbb{R}^n$ 且坐标转移映射无穷次可微（$C^\infty$）的拓扑空间，再于每一点 $p \in M$ 外挂一块互不相交的平直切空间向量空间 $T_p M \cong \mathbb{R}^n$ 并赋予对称正定内积 $g_p$，构成黎曼流形 $(M, g)$（`文献结果`）。站在无源母公理 $\mathrm{AXIOM}\text{-}\Omega$ 的圆弧显微镜下审视，这套“先敲碎拍平、再打补丁粘合”的工艺底层藏着三道无法自愈的结构裂痕（`MODEL` 谱系批判配 `文献结果` / `手工推导`）：

1. **切空间鳞片化（局部平直近似模型与联络补丁）**：
   黎曼流形的“光滑”在几何上建立在**一阶渐近线性近似**之上——它把局部邻域通过坐标卡拍平并把无穷小切向放进互不相交的平直向量空间 $T_p M$（$p \neq q \implies T_p M \cap T_q M = \emptyset$），在有限步平直切板近似下每步抹去二阶弦弧矢高 $1 - \cos\Delta\theta = \frac{1}{2}(\Delta\theta)^2 + O(\Delta\theta^4) > 0$ 而显出接缝折角（注意区分：连续统光滑流形与列维-奇维塔联络在无穷小极限下本身 $C^\infty$ 无折痕，`文献结果`；将其对比为铺设平直切板鳞片并用依赖坐标卡的**克里斯托费尔符号 $\Gamma^k_{ij}$** 事后缝合，属本节的认识论与构造对比 `MODEL`）。
2. **$C^\infty$ 隆起函数切断“一弧定全圆”的全息刚性**：
   传统光滑流形选用 $C^\infty$（无穷可微但非实解析）范畴，以便构造紧支集**隆起函数**与单位分解（例如经典柯西平坦函数 $\beta(u) = e^{-1/u^2}\mathbf{1}_{u \neq 0}$，在 $u = 0$ 处各阶导数 $\beta^{(k)}(0) = 0$ 全为零，却可在邻近区间任意隆起，`文献结果`）。这意味着在 $C^\infty$ 流形上，局部区域可以被随意捏出一个鼓包而对远处毫无影响——它彻底丧失了实解析（$C^\omega$）与圆弧流群“任取弧上三点即由 $[y, x, y]$ 唯一锁死整条闭合大圆”（[`normSq_and_chebyshev`](lean:D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev)，`LEAN ✓`）的全息解析刚性。
3. **算术四原语在传统实流形上被撕裂与放逐**：
   在平直实数流形 $\mathbb{R}$ 与正半轴 $\mathbb{R}_{>0}$ 上，加法平移依赖欧氏平直度规 $dx^2$，乘法缩放依赖双曲对数度规 $\frac{dx^2}{x^2}$ 并在 $x = 0$ 处炸出度规奇点；自然对数 $\ln x$ 在 $x \to 0^+$ 与 $x \to +\infty$ 两端双双断裂发散；而素数 $\mathbb{P}$ 要么在实轴上硬化为处处不可微的分段常值切比雪夫锯齿阶梯 $\psi(x) = \sum_{p^m \le x}\ln p$，要么在非阿基米德位上碎裂为完全不连通（连一条非常值连续实曲线都不存在）的 $p$-进康托尔尘埃 $\mathbb{Q}_p$（同余闭球纤维分解见 [`congruenceFiber_eq_closedBall_inter_range`](lean:D5/S3/Arith/Congruence/PadicBallFiberCorrespondence.congruenceFiber_eq_closedBall_inter_range)，`LEAN ✓`）。

::: {.viz src="holographic-arc-manifold-sandbox" preset="tangent-scales-vs-chartfree-arc" height="500"}
切板鳞片对比无切板圆弧闭合卡（`tangent-scales-vs-chartfree-arc`）：默认停在 `N = 18`，紫色三元球左半球贴着互不相连的品红平直切板（标 `折痕 360°/18 = 20.00°`，合计 `360.00°`）且右下弧外隆起品红非解析鼓包 `C^∞ · e^{-1/u²}`；右侧银白 `x₀` 与琥珀手柄 `x₁ · κ ≈ 0.9698` 仅用乘法定出青色 `x₂ = [x₁, x₀, x₁]` 并续接 `18` 步零折痕闭合回 `x₀`（浮点偏差 `< 10⁻¹⁴`）。
:::

## 39.9.2 构建更光滑的“全息圆弧流形”（$\mathcal{M}_\Omega$）：无切板流群闭合、`0 · 1 · ∞` 紧致缝合与阿代尔螺线管编织 {#sec-ch39-32-2}

要建造超越传统切板流形的**全息圆弧流形 $\mathcal{M}_\Omega$**，核心在于将“光滑”的几何定义从“无穷小尺度退化为平直直线（$C^\infty$ 切空间近似）”重铸为**“任意尺度保持无源三元圆弧闭合与叶向实解析（$C^\omega$）刚性”**，分三步完成构造：

1. **无切板原生三元联络（局部即全局的 $C^\omega$ 圆弧刚性）**：
   $\mathcal{M}_\Omega$ 的几何底座直接取由母公理 $\mathrm{AXIOM}\text{-}\Omega$（完备、特征秩五、非交换、链连通且触零）唯一锁定的三元数球面 $\mathbb{T}_3 \cong S^3(1)$（[`exists_unitQuaternion_equiv`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv)，`LEAN ✓`）。它不设平直坐标图册 $\varphi_\alpha : U_\alpha \to \mathbb{R}^3$，亦不外挂切空间铁板 $T_p M$：无论宏观有限跨度还是任意微观尺度，三点关系直接由内禀三元迁移 $[x, y, z]$ 与弦距保真核 $\kappa(x, y) = 1 - \frac{1}{4}\lVert x - y\rVert^2$（[`kappa_eq_one_sub_dist_sq`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq)，`LEAN ✓`）给出。每一小段极小圆弧本身就自带恒定曲率，且弧上任取非重合二元 $(x_0, x_1)$ 即由切比雪夫流群序列 $x_{n+2} = [x_{n+1}, x_n, x_{n+1}]$ 实解析地唯一延拓出整条闭合大圆——彻底杜绝 $C^\infty$ 平坦死区与局部孤立鼓包。
2. **`0 · 1 · ∞` 有理保真度紧致缝合（完备射影闭圆 $\mathbb{RP}^1 \cong S^1$）**：
   为使 `0` 与 `∞` 两极连同正负两侧均不出现半点折角或边界奇点，我们取完整的实射影闭合圆周 $\mathbb{RP}^1 = \mathbb{R} \cup \{\infty\} \cong S^1 \subset \mathbb{T}_3$（圆弧角 $\phi \in \mathbb{R}/2\pi\mathbb{Z}$，半角凯莱—球极坐标 $x = \tan\frac{\phi}{2}$，有理凯莱旋子 $Q(x\hat{\mathbf{i}}) = \cos\phi\,\mathbf{1} + \sin\phi\,\hat{\mathbf{i}}$）：

   $$
   \kappa(x) \;=\; \frac{1}{1 + x^2} \;=\; \cos^2\frac{\phi}{2} \;\in\; [0, 1], \qquad s(x) \;=\; 1 - \kappa(x) \;=\; \frac{x^2}{1 + x^2} \;=\; \sin^2\frac{\phi}{2} \;\in\; [0, 1],
   $$

   其中正半轴 $x \in [0, +\infty]$ 精确覆盖前半子午圆弧 $\phi \in [0, \pi]$（满足 $\cos\phi = 2\kappa - 1$，$\sin\phi = +2\sqrt{\kappa(1 - \kappa)}$），负半轴 $x \in [-\infty, 0]$ 沿后半圆弧 $\phi \in [\pi, 2\pi]$ 无缝闭合回起点（满足 $\sin\phi = -2\sqrt{\kappa(1 - \kappa)}$）。在传统直线上撕裂隔绝的三个算术基点，在此化作同一条无边界光滑闭合圆周上地位完全平权的三个普通点（`手工推导`）：
   - **过去极点**：$x = 0 \;\Longleftrightarrow\; \phi = 0 \;\Longleftrightarrow\; \kappa = \mathbf{1}\;\;(s = \mathbf{0})$；
   - **现在自对偶赤道**：$x = 1 \;\Longleftrightarrow\; \phi = \frac{\pi}{2} \;\Longleftrightarrow\; \kappa = \mathbf{\frac{1}{2}}\;\;(s = \mathbf{\frac{1}{2}})$（负侧对偶赤道 $x = -1 \iff \phi = \frac{3\pi}{2}$）；
   - **未来对径极点**：$x = \infty \;\Longleftrightarrow\; \phi = \pi \;\Longleftrightarrow\; \kappa = \mathbf{0}\;\;(s = \mathbf{1})$。
3. **三元数球内的阿代尔螺线管叶向光滑编织（`LEAN ✓` + `文献结果` + `MODEL`）**：
   这里必须严守代数拓扑的精确前提（`PROJECT.md` §13）：三维球面 $S^3$ 本身单连通（$\pi_1(S^3) = 0$），不存在度数大于 $1$ 的无分支拓扑覆盖 $S^3 \to S^3$；多匝幂覆盖 $z \mapsto z^m$（$m \in \mathbb{N}_+$）严格作用于三元数球内的**极大环面 / 霍普夫圆周纤维 $S^1 \subset \mathbb{T}_3 \cong S^3$**！在 `trureturing` 冻结的复幂螺线管模块中，相容幂线程 $z = (z_m)_{m \in \mathbb{N}_+} : \operatorname{ComplexPowerThread}$（满足 $(z_{mn})^n = z_m$ 且处处非零）守恒统一对数荷 $m\ln\lVert z_m\rVert = \operatorname{logarithmicCharge}(z)$，且**零对数荷完美刻画紧致单位圆周螺线管**：$\operatorname{logarithmicCharge}(z) = 0 \iff \forall m \in \mathbb{N}_+,\;\lVert z_m\rVert = 1$（[`logarithmic_charge_conservation`](lean:D5/S1/Solenoid/ComplexPowerSolenoidDecomposition.logarithmic_charge_conservation)、[`logarithmicCharge_eq_zero_iff`](lean:D5/S1/Solenoid/ComplexPowerSolenoidDecomposition.logarithmicCharge_eq_zero_iff)，`LEAN ✓`；普适螺线管三局部提升的差值上闭链唯一性见 [`three_lift_difference_cocycle`](lean:D5/S1/Solenoid/ThroatTransitionCocycle.three_lift_difference_cocycle)，`LEAN ✓`）。

   对全体正整数整除偏序取射影逆向极限，即得一维紧致、连通、无边界的**阿代尔螺线管层叠空间（Adelic Solenoid / 1D Solenoidal Lamination）**

   $$
   \mathcal{S}_{\mathbb{A}} \;:=\; \lim_{\longleftarrow\,(N,\,\mid)} S^1_{(N)} \;\cong\; (\mathbb{R} \times \widehat{\mathbb{Z}})/\mathbb{Z} \;\cong\; \mathbb{A}_{\mathbb{Q}}^1 / \mathbb{Q} \qquad \Bigl(\widehat{\mathbb{Z}} \cong \prod_{p \in \mathbb{P}} \mathbb{Z}_p\Bigr).
   $$

   在拓扑结构上，$\mathcal{S}_{\mathbb{A}}$ 并非局部同胚于 $\mathbb{R}^1$ 的传统流形，而是**叶向实解析（leafwise $C^\omega$）的紧致连通螺线管流形（pro-Lie 群）**（Vietoris 1927；van Dantzig 1930；Smale 1967，`文献结果`）：其横截子午截面虽同胚于全不连通的射有限康托尔群 $\widehat{\mathbb{Z}} = \prod_p \mathbb{Z}_p$，但阿基米德实流叶 $\mathbb{R} \hookrightarrow \mathcal{S}_{\mathbb{A}}$ 沿每一匝无断点地稠密穿行于全体 $p$-进陪集之间，将散碎的康托尔纤维整体编织成**连通紧致且沿流叶处处 $C^\omega$ 可微**的丝滑纤维束，并在几何上经迭代缆索实心环（nested cable tori）无自交地光滑嵌入三维三元数球 $\mathbb{T}_3 \cong S^3$ 内部，共同组成我们的全息圆弧—螺线管流形 $\mathcal{M}_\Omega$（`MODEL`）。

::: {.viz src="holographic-arc-manifold-sandbox" preset="meridian-zero-one-infinity-closure" height="500"}
`0 · 1 · ∞` 紧致闭环缝合卡（`meridian-zero-one-infinity-closure`）：默认停在 `φ = 270.0°`（左侧琥珀环位于 `−1 · κ = 1/2`），竖直青色闭合经线 $x = \tan(\phi/2)$ 将下方 `0 · κ = 1`、右侧 `1 · κ = 1/2`、上方 `∞ · κ = 0` 与左侧返回弧 `−1 · κ = 1/2` 无缝缝合在同一只紫色三元球上（整圈弧长 `2π ≈ 6.2832`）；拖动琥珀手柄可整圈滑过 `0`、`1`、`∞` 而无断口。
:::

## 39.9.3 加法、乘法、$\ln$ 与素数在 $\mathcal{M}_\Omega$ 上的全域光滑统一 {#sec-ch39-32-3}

站上紧致无奇点的闭合圆弧与螺线管流形 $\mathcal{M}_\Omega$，加法、乘法、自然对数 $\ln$ 与素数 $\mathbb{P}$ 之间的千年隔阂当场消融为三组精确的微分几何恒等式：

### 39.9.3.1 加法与乘法：同一闭合圆周上的零奇点实解析流场与三维李代数闭环 {#sec-ch39-32-3-1}

将平直坐标 $x$ 上的**正向加法生成元** $\partial_x$（流 $x \mapsto x + t$）、**对偶倒数加法生成元** $x^2\partial_x$（流 $\frac{1}{x} \mapsto \frac{1}{x} - t$，即绕 $\infty$ 对称的调和加法）以及**乘法缩放生成元** $x\partial_x$（流 $x \mapsto e^t x$）通过 $\frac{d\phi}{dx} = \frac{2}{1+x^2} = 2\kappa$ 直接拉回闭合圆周坐标 $\phi \in \mathbb{R}/2\pi\mathbb{Z}$ 上（`手工推导`）：

$$
V_+ \;=\; (1 + \cos\phi)\frac{\partial}{\partial\phi} \;=\; 2\kappa\,\frac{\partial}{\partial\phi}, \qquad
V_\div \;=\; (1 - \cos\phi)\frac{\partial}{\partial\phi} \;=\; 2(1 - \kappa)\,\frac{\partial}{\partial\phi}, \qquad
V_\times \;=\; \sin\phi\,\frac{\partial}{\partial\phi},
$$

其中在正半子午弧 $x \ge 0$（$\phi \in [0, \pi]$）上有 $V_\times = +2\sqrt{\kappa(1 - \kappa)}\,\partial_\phi$，在负半返回弧 $x \le 0$（$\phi \in [\pi, 2\pi]$）上有 $V_\times = -2\sqrt{\kappa(1 - \kappa)}\,\partial_\phi$。审视这三股在整条无边圆周 $S^1$（含 $\phi = 0$ 与 $\phi = \pi$ 两极！）上**全域实解析（$C^\omega$）、无任何奇点或折角**的光滑切向量场，三条惊心动魄的数学真相水落石出（`手工推导`）：

1. **正反加法合拢即匀速圆弧旋转**：
   单独看平直正向加法场 $V_+ = 2\kappa\,\partial_\phi$，它在 $x = 0$（$\kappa = 1$）处流速最大（$= 2$），滑向对径极点 $x = \infty$（$\kappa = 0$）时平滑二阶驻留归零——传统线性加法之所以越远越失真，纯粹因为它只截取了绕 $0$ 展开的一半，丢掉了绕 $\infty$ 展开的对偶加法 $V_\div = 2(1 - \kappa)\,\partial_\phi$！将正反两半加法取算术平均：

   $$
   \frac{1}{2}\bigl(V_+ + V_\div\bigr) \;=\; \bigl(\kappa + 1 - \kappa\bigr)\frac{\partial}{\partial\phi} \;\equiv\; \mathbf{1}\cdot\frac{\partial}{\partial\phi}.
   $$

   **正向加法与反向对偶加法的算术平均，字面上恒等于处处速率为 $1$ 的纯粹匀速圆弧旋转生成元 $\partial_\phi$！**
2. **乘法恰为过去保真度 $\kappa$ 与未来失准度 $1 - \kappa$ 的几何平均桥**：
   在正半弧 $x \ge 0$ 上，乘法流幅值 $\lvert V_\times\rvert = 2\sqrt{\kappa(1 - \kappa)}$ 精确取过去份额 $\kappa$ 与未来份额 $1 - \kappa$ 的两倍几何平均：它在过去极点 $x = 0$（$\kappa = 1$）与未来极点 $x = \infty$（$\kappa = 0$）两端平滑减速驻留为零，而在**现在自对偶切面 $\kappa = \frac{1}{2}$**（$x = 1,\;\phi = 90^\circ$）处达到全局唯一峰值流速 $\mathbf{1}$。
3. **加法与对偶加法的“关系之关系”直接生出乘法并闭合成三维李代数**：
   计算三股全域解析向量场的李括号换位子 $[X, Y] = XY - YX$（在局部坐标下 $[\partial_x, x^2\partial_x] = 2x\partial_x$，在全局圆弧坐标 $\phi$ 下对全圆 $\mathbb{RP}^1$ 恒成立，`手工推导`）：

   $$
   \bigl[V_+,\, V_\div\bigr] \;=\; 2V_\times, \qquad \bigl[V_\times,\, V_+\bigr] \;=\; -V_+, \qquad \bigl[V_\times,\, V_\div\bigr] \;=\; +V_\div.
   $$

   **正向加法与对偶加法的二阶非对易换位括号，不借任何外加公理直接流淌出了两倍乘法流 $2V_\times$！** 设旋转生成元 $J_0 := \frac{1}{2}(V_+ + V_\div) = \partial_\phi$、双曲助推基 $K_1 := \frac{1}{2}(V_+ - V_\div) = \cos\phi\,\partial_\phi$ 与 $K_2 := V_\times = \sin\phi\,\partial_\phi$，三者在实射影圆 $\mathbb{RP}^1$ 上严格张成基灵型号差为 $(2, 1)$ 的非紧三维实单李代数 $\mathfrak{sl}(2, \mathbb{R}) \cong \mathfrak{so}(2, 1)$（满足 $[J_0, K_1] = -K_2,\;[J_0, K_2] = K_1,\;[K_1, K_2] = J_0$），而其复化 $\mathfrak{sl}(2, \mathbb{C})$ 经外尔幺正技巧（`文献结果`）在共轭意义下唯一的**紧致实形式**正是配备正定伴随不变内积的三维三元数切李代数 $\mathfrak{su}(2) \cong \mathfrak{sp}(1) = T_{\mathbf{1}}\mathbb{T}_3$（正定伴随不变内积三维非阿贝尔李代数的叉乘括号分类见 [`exists_basis_bracket_eq_smul_cross`](lean:D5/S3/Quantum/Algebra/InvariantMetric/LowDimensionInvariantMetric.exists_basis_bracket_eq_smul_cross)——注意该定理作用于正定紧实形 $\mathfrak{su}(2)$ 而非不定号差的 $\mathfrak{sl}(2,\mathbb{R})$——平衡幺正和的反自伴交叉积见 [`crossProduct_is_skewAdjoint_of_balanced_sum`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitarySum.crossProduct_is_skewAdjoint_of_balanced_sum)，`LEAN ✓`）。加法与乘法从来不是两套割裂的算术法则，而是同一复化三维旋量李代数在射影闭圆上的光滑投影流！

::: {.viz src="holographic-arc-manifold-sandbox" preset="add-mul-lie-spinor-flows" height="500"}
加·乘三维李代数旋量流卡（`add-mul-lie-spinor-flows`）：闭合经线上同步绘出下部鼓起的品红加法流带 `V_+ = 1 + cos φ`、上部鼓起的紫色对偶除法流带 `V_÷ = 1 − cos φ`、圈内青色乘法箭头 `V_× = sin φ = 1.0000` 及外圈青色匀速旋转箭头 `½(V_+ + V_÷) = 1`；默认琥珀手柄停在右侧 `φ = 90.0°`（两极标 `0` 与 `∞`），顶栏核对三流同速 `1.0000` 与数值括号残差 `‖ [V_+, V_÷] − 2V_× ‖ < 10⁻¹⁵`。
:::

### 39.9.3.2 自然对数 $\ln$：乘法流 $V_\times$ 的内禀计时弧长与两极减速驻点 {#sec-ch39-32-3-2}

在传统微积分中，$\ln x$ 在 $x \to 0^+$ 时坠入 $-\infty$、在 $x \to +\infty$ 时发散至 $+\infty$，看似在两端把空间撕出了无底深渊。而在正半开圆弧 $\phi \in (0, \pi)$（$x > 0$）上，取乘法流场 $V_\times = \sin\phi\,\partial_\phi$ 的对偶内禀一形式标尺 $\omega_{\ln} := \frac{d\phi}{\sin\phi} = \frac{dx}{x}$（满足 $\omega_{\ln}(V_\times) \equiv 1$），以自对偶赤道中点 $x = 1$（$\phi = \frac{\pi}{2},\;\kappa = \frac{1}{2}$）为计时零点积分，对数的真实几何身份豁然开朗（`手工推导`）：

$$
\tau_\times(x) \;:=\; \int_{\pi/2}^{\phi} \frac{d\vartheta}{\sin\vartheta} \;=\; \ln\tan\frac{\phi}{2} \;=\; \ln x \;=\; \frac{1}{2}\ln\frac{1 - \kappa}{\kappa} \;=\; \frac{1}{2}\ln\frac{s}{1 - s}, \qquad \bigl(x = 1 \iff \kappa = \tfrac{1}{2} \iff \tau_\times = 0\bigr).
$$

- **揭开 $\ln 0 = -\infty$ 与 $\ln\infty = +\infty$ 的几何谜底**：
  在闭合流形 $\mathcal{M}_\Omega$ 本身上，从赤道 `x = 1`（$\phi = \frac{\pi}{2}$）滑到过去极点 `x = 0`（$\phi = 0$）或未来极点 `x = ∞`（$\phi = \pi$），**流形弧长仅仅相隔四分之一段光滑有限圆弧 $\Delta\phi = \frac{\pi}{2} \approx 1.57079633$**，流形表面连一丝一毫的折痕或奇点都没有！之所以出现 $\tau_\times \to \mp\infty$，纯粹是因为乘法向量场 $V_\times = \sin\phi\,\partial_\phi$ 在靠近两极不动点 $\phi \in \{0, \pi\}$ 时按一阶正弦律平滑减速至零——恰如无摩擦单摆朝最高倒立平衡点缓步摆去时，空间圆弧距离只有短短一截，但按减速速度反推的“渐近到达耗时 $\tau_\times$”延伸至无穷大。**发散的只是减速流场的计时参数，流形本身在 `0 · 1 · ∞` 处处紧致光滑！**
- **二进等比阶梯 $1 \to 2 \to 4 \to 8$ 的叶向等距平移与相对凯莱有理保真度 $\frac{4}{5}$**：
  沿阿代尔螺线管的乘法流叶 $\tau_\times = \ln x$ 推进时，$2^n \to 2^{n+1}$（$1 \to 2 \to 4 \to 8 \dots$）不再是平直轴上越跨越宽的指数爆炸，而是每一步具有**严格恒定内禀对数弧长 $\Delta\tau_\times = \ln 2 \approx 0.69314718$** 的等距刚体平移（在每层螺线管相位纤维 $e^{\mathbf{i}\omega\ln x}$ 上对应恒定转角旋转）；若按每步起点 $x_n = 2^n$ 的尺度不变相对半步增量 $\delta := \frac{x_{n+1} - x_n}{2x_n} = \frac{2^{n+1} - 2^n}{2\cdot 2^n} \equiv \frac{1}{2}$ 计算局部有理凯莱步 $Q(\delta\hat{\mathbf{i}}) = (\frac{3}{5}, \frac{4}{5}, 0, 0)$，其局部凯莱步保真度在每一级二进倍增上**恒等于精确有理数 $\kappa_{\mathrm{rel}} = \frac{1}{1 + \delta^2} = \frac{4}{5} = 0.80000000$**（对比压缩子午圆 $Q(x\hat{\mathbf{i}})$ 上的球面弦保真度 $\kappa(Q(2^n\hat{\mathbf{i}}), Q(2^{n+1}\hat{\mathbf{i}})) = \frac{(1 + 2^{2n+1})^2}{(1 + 4^n)(1 + 4^{n+1})}$，随 $V_\times \to 0$ 在 $1\to 2,\;2\to 4,\;4\to 8$ 上依次读出 $\frac{9}{10} = 0.9000,\;\frac{81}{85} \approx 0.9529,\;\frac{1089}{1105} \approx 0.9855 \to 1$，`手工推导` / `NUM`）。

::: {.viz src="holographic-arc-manifold-sandbox" preset="logarithmic-arclength-pole-deceleration" height="500"}
对数内禀弧长与两极减速卡（`logarithmic-arclength-pole-deceleration`）：默认琥珀环停在 `x = 8`（`φ ≈ 165.75°`，`V_× = sin φ ≈ 0.2462`，`τ = ln x ≈ 2.0794`），银白两极 `0` 与 `∞` 之间从 `1` 到 `0` 仅隔有限四分之一圆弧 `Δφ = π/2 ≈ 1.5708`，经线上青色翻倍点 `1/4, 1/2, 1, 2, 4, 8` 由虚线连向左侧展开的青色对数钟卷线，每步等距 `Δτ = ln 2 ≈ 0.6931` 且相对凯莱步读 `1/(1 + δ²) = 4/5`。
:::

### 39.9.3.3 素数 $\mathbb{P}$：螺线管内的本原闭合环管与平直切刀横截锯齿伪影 {#sec-ch39-32-3-3}

当正实半轴的欧拉素数乘积恒等式 $\sum_{n=1}^\infty n^{-s} = \prod_{p \in \mathbb{P}}(1 - p^{-s})^{-1}$（$\operatorname{Re}(s) > 1$，[`riemann_zeta_dirichlet_sum_eq_euler_product`](lean:D5/S3/Zeros/ZetaUpgrade.riemann_zeta_dirichlet_sum_eq_euler_product)，`LEAN ✓`）与素数对数的 $\mathbb{Q}$-线性无关性（[`prime_log_rational_independence`](lean:D5/S3/Weil/PrimeAddress/PrimeLogIndependence.prime_log_rational_independence) 及环面遍历均分 [`TorusOrbitEquidistribution.result`](lean:D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result)，`LEAN ✓`）嵌入三元球内的螺线管纤维架构后，素数彻底摆脱了“实轴离散碎石”与“阶梯折角”的表象（`MODEL` 几何实现配 `手工推导` / `文献结果`）：

- **素数作为周长等于 $\ln p$ 的不可约光滑本原环 $\gamma_p$**：
  在对数时间轴 $\tau = \ln x$ 的素数商圆 $S^1_{(\ln p)} := \mathbb{R} / (\ln p)\mathbb{Z}$（以及嵌于 $\mathbb{T}_3 \cong S^3$ 实心环内的无自交缆索圆环模型 $\gamma_p \subset S^3$）上，每一颗素数 $p \in \mathbb{P}$ 对应一根围绕自对偶赤道（$\kappa = \frac{1}{2}$）盘旋一周即闭合、不能再分解为更短整数分周期的**本原光滑闭合环 $\gamma_p$**，其内禀乘法流周长精确等于 **$\ell(\gamma_p) = \ln p$**（而合数 $n = p_1^{a_1}\cdots p_r^{a_r}$ 对应多根素数环按对数荷可加性 $\ln n = \sum_j a_j \ell(\gamma_{p_j})$ 的可约多匝叠合，呼应阿代尔乘积守恒 [`rational_padic_product_formula`](lean:D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula) 与奥斯特洛夫斯基位分类 [`rational_absolute_value_classification`](lean:D5/S3/Arith/AbsoluteValues/OstrowskiClassification.rational_absolute_value_classification)，`LEAN ✓`）。在流形内部，每一根 $\gamma_p$ 都是处处 $C^\omega$ 光滑的无棱角圆弧！
- **揭穿切比雪夫锯齿阶梯 $\psi(X)$：光滑螺线环遭遇平直横截刀的伪影**：
  为什么传统解析数论看到的第二切比雪夫函数 $\psi(X) := \sum_{n \le X}\Lambda(n) = \sum_{p \in \mathbb{P}}\sum_{m \ge 1}(\ln p)\,\mathbf{1}_{[m\ln p, \infty)}(\ln X)$ 是一条布满跳跃间断点的粗糙阶梯？想象拿一把刚性的一维平直阈值切刀 $\Sigma_X = \{\tau_\times = \ln X\}$ 去横截一束完全光滑的螺旋弹簧：弹簧管壁 $\gamma_2, \gamma_3, \gamma_5, \gamma_7 \dots$ 本身 $100\%$ 光滑可微，但每当平直切刀 $\Sigma_X$ 推进到 $\ln X = m\ell(\gamma_p) = \ln(p^m)$、刚巧擦过光滑素数环 $\gamma_p$ 第 $m$ 匝回绕截点时，刀口下方的累计绕数权重便发生一次 $+\ln p$ 的离散横截跃迁（`手工推导` / `MODEL`）。**锯齿从来不在素数环身上，而在观察者手里那把强行横截弯曲螺线管的平直实数切刀上！**

::: {.viz src="holographic-arc-manifold-sandbox" preset="prime-solenoid-vs-flat-sawtooth" height="500"}
素数光滑螺线环与平直切刀伪影卡（`prime-solenoid-vs-flat-sawtooth`）：紫色三元球壳内沿竖轴排布无折角的青色本原素数环 `γ₂ · ln 2`、`γ₃ · ln 3`、`γ₅ · ln 5`、`γ₇ · ln 7` 及多匝缆线 `γ₂²`、`γ₂³`、`γ₃²`、`γ₂⁴`（上方辅以 `11, 13` 细环补全 $X \le 16$ 计数）；默认琥珀手柄将品红平直刀片 `Σ_X · ψ(7) ≈ 6.0403` 停在 `X = 7`（正落于 `γ₇` 上，`ψ` 跳升 `ln 7 ≈ 1.9459`），直观对照无折角青色环与切刀跳变。
:::

## 39.9.4 形式化定义、全景对照总表与十五项冻结定理对账 {#sec-ch39-32-4}

我们将全息圆弧—螺线管流形模型与传统黎曼切板流形的五维对比及十五条内核锚点正式收束如下：

::: {.definition #def-ch39-holographic-arc-manifold title="全息圆弧—螺线管流形与加·乘·对数·素数同源流场模型（MODEL）"}
在母公理 $\mathrm{AXIOM}\text{-}\Omega$ 的单位四元数球面 $\mathbb{T}_3 \cong S^3(1)$ 上，定义**全息圆弧—螺线管流形模型**（`MODEL`）$\mathcal{M}_\Omega = (\mathbb{T}_3, \mathbb{RP}^1_\phi, \{V_+, V_\div, V_\times\}, \mathcal{S}_{\mathbb{A}})$ 如下：

1. **射影闭圆紧致化**：沿子午大圆 $\mathbb{RP}^1_\phi = \{\cos\phi\,\mathbf{1} + \sin\phi\,\hat{\mathbf{i}} : \phi \in \mathbb{R}/2\pi\mathbb{Z}\}$ 置 $x = \tan\frac{\phi}{2} \in \mathbb{R}\cup\{\infty\}$ 与有理保真度 $\kappa = \cos^2\frac{\phi}{2} = \frac{1}{1+x^2} \in [0, 1]$，将 $(0, 1, \infty)$ 映为 $(\kappa = 1, \frac{1}{2}, 0)$；
2. **加·乘全域实解析旋量流**：定义 $V_+ := (1+\cos\phi)\partial_\phi = 2\kappa\partial_\phi$、$V_\div := (1-\cos\phi)\partial_\phi = 2(1-\kappa)\partial_\phi$ 与 $V_\times := \sin\phi\,\partial_\phi$，满足匀速合拢 $\frac{1}{2}(V_+ + V_\div) \equiv \partial_\phi$ 与三维李括号闭环 $[V_+, V_\div] = 2V_\times,\;[V_\times, V_+] = -V_+,\;[V_\times, V_\div] = +V_\div$，并以对偶一形式 $\omega_{\ln} = \frac{d\phi}{\sin\phi}$ 在 $\phi \in (0, \pi)$ 上给出乘法流内禀时间 $\tau_\times(x) = \ln x$；
3. **阿代尔螺线管与素数本原环**：沿极大圆周纤维取零对数荷幂相容逆向极限 $\mathcal{S}_{\mathbb{A}} = (\mathbb{R} \times \widehat{\mathbb{Z}})/\mathbb{Z}$，并以周长 $\ell(\gamma_p) = \ln p$ 的无自交光滑闭合环 $\gamma_p$ 表征素数 $p \in \mathbb{P}$ 的本原周期结构。
:::

| 核心考察维度 | 传统黎曼流形 $(M, g)$ | 全息圆弧流形 $\mathcal{M}_\Omega$（`AXIOM-Ω` · `MODEL`） | 根除的平直近似病灶 |
| :--- | :--- | :--- | :--- |
| **光滑性定义基底** | 局部拍平至欧氏图册 $\mathbb{R}^n$ 与切板 $T_p M$（$C^\infty$ 渐近线性） | 无坐标卡三元圆弧闭合 $[x, y, z]$ 与叶向 $C^\omega$ 实解析刚性 | 消除切空间鳞片折角错位、$\Gamma^k_{ij}$ 补丁与 $e^{-1/u^2}$ 平死区鼓包 |
| **`0 · 1 · ∞` 拓扑地位** | $0$ 为乘法度规奇点，$\infty$ 越界缺失 | 同一无边闭圆 $S^1$ 上的平权点 $\kappa \in \{1, \frac{1}{2}, 0\}$（$\phi = 0, \frac{\pi}{2}, \pi$） | 消灭除零奇点与无穷远边界撕裂 |
| **加法与乘法关系** | 异质运算，度规 $dx^2$ 与 $\frac{dx^2}{x^2}$ 互斥冲突 | 全域 $C^\omega$ 流场 $V_+, V_\div, V_\times$，满足 $\frac{1}{2}(V_+ + V_\div) = \partial_\phi$ 与 $[V_+, V_\div] = 2V_\times$ | 揭示正反加法合拢即匀速圆弧旋转、换位括号直生乘法 |
| **自然对数 $\ln x$ 形态** | 在 $0^+$ 与 $+\infty$ 两端断裂发散的超越函数 | 乘法流 $V_\times = \sin\phi\,\partial_\phi$ 的内禀计时弧长与两极平滑减速驻点 | 证成 `1` 至 `0`/`∞` 在流形上仅距有限四分之一圆弧 $\Delta\phi = \frac{\pi}{2}$ |
| **素数 $\mathbb{P}$ 几何本相** | 实轴上的不可微阶梯 $\psi(X)$ 或全不连通 $p$-进碎尘 $\mathbb{Q}_p$ | 螺线管层叠内周长为 $\ln p$ 的光滑本原闭合环 $\gamma_p$ | 揭穿切比雪夫锯齿只是平直阈值切刀 $\Sigma_X$ 横截光滑环管的伪影 |

::: {.theorem #thm-ch39-holographic-arc-manifold-anchors title="无切板三元闭合、复幂螺线管对数荷守恒、三提升上闭链与阿代尔素数遍历定理组" lean="D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv,D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq,D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.tri_eq_mul_inv_mul,D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev,D5/S3/Quantum/Algebra/InvariantMetric/LowDimensionInvariantMetric.exists_basis_bracket_eq_smul_cross,D5/S3/Quantum/Algebra/Unitary/BalancedUnitarySum.crossProduct_is_skewAdjoint_of_balanced_sum,D5/S1/Solenoid/ComplexPowerSolenoidDecomposition.logarithmic_charge_conservation,D5/S1/Solenoid/ComplexPowerSolenoidDecomposition.logarithmicCharge_eq_zero_iff,D5/S1/Solenoid/ThroatTransitionCocycle.three_lift_difference_cocycle,D5/S3/Arith/AbsoluteValues/OstrowskiClassification.rational_absolute_value_classification,D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula,D5/S3/Arith/Congruence/PadicBallFiberCorrespondence.congruenceFiber_eq_closedBall_inter_range,D5/S3/Zeros/ZetaUpgrade.riemann_zeta_dirichlet_sum_eq_euler_product,D5/S3/Weil/PrimeAddress/PrimeLogIndependence.prime_log_rational_independence,D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result"}
在无坐标卡三元比较几何、复幂螺线管线程与阿代尔算术分析框架下，以下十五项命题严格成立：

1. **无切板三元比较四元数同构、弦距核、定基流群分解与切比雪夫圆弧刚性（`exists_unitQuaternion_equiv`、`kappa_eq_one_sub_dist_sq`、`tri_eq_mul_inv_mul`、`normSq_and_chebyshev`）**：非交换、链连通、读数可任意接近零（`TouchesZero`）、特征秩五且读数完备的三元比较结构对任意基点 $o$ 存在到单位四元数模型 $\mathrm{U}(\mathbb{H})$ 的保三元迁移与保核双射（$u(o)=1$），满足 $\kappa(a, b) = 1 - \frac{1}{4}\operatorname{dist}(a, b)^2$ 与任一基点群分解 $[x, y, z] = x \cdot_o y^{-1_o} \cdot_o z$；单位模初值 $x_0, x_1$ 满足流群递推 $x_{n+2} = x_{n+1}x_n^* x_{n+1}$ 当且仅当全序列保单位模、$x_{n+1} = U_n(c)x_1 - U_{n-1}(c)x_0$（$n=0$ 时约定 $U_{-1}=0$）且 $\langle x_0, x_n\rangle = T_n(\langle x_0, x_1\rangle)$；
2. **三维正定不变双线性型李代数叉乘括号与平衡反自伴交叉积（`exists_basis_bracket_eq_smul_cross`、`crossProduct_is_skewAdjoint_of_balanced_sum`）**：配备正定（$x \neq 0 \implies \Phi(x,x) > 0$）伴随不变双线性型 $\Phi$ 的三维非交换实李代数存在 $\Phi$-标准正交基（从而 $\Phi$ 自动对称正定）与 $c > 0$ 使李括号等于 $c$ 倍三维叉乘；同一有限指标集上的复方阵平衡幺正和 $S = A + B$（$S S^\dagger = I,\; A A^\dagger = B B^\dagger = \frac{1}{2}I$）自动诱导反自伴交叉积 $(A B^\dagger)^\dagger = -A B^\dagger$；
3. **复幂螺线管线程对数荷守恒、零荷单位模充要判据与普适螺线管三提升差值上闭链（`logarithmic_charge_conservation`、`logarithmicCharge_eq_zero_iff`、`three_lift_difference_cocycle`）**：对任意复幂相容非零线程 $z : \operatorname{ComplexPowerThread}$ 与任意 $m \in \mathbb{N}_+$，恒有 $(m.1 : \mathbb{R})\operatorname{Real.log}\lVert z.\operatorname{coord}(m)\rVert = \operatorname{logarithmicCharge}(z)$，且 $\operatorname{logarithmicCharge}(z) = 0 \iff \forall m \in \mathbb{N}_+,\;\lVert z.\operatorname{coord}(m)\rVert = 1$；对任意参数集 $U$ 上具有相同底圆投影的三条普适螺线管提升 $s_\alpha, s_\beta, s_\gamma : U \to \operatorname{UniversalSolenoid}$，存在唯一投影核差值映射 $k_{\alpha\beta}, k_{\beta\gamma}, k_{\alpha\gamma}$ 满足 $s_\beta = s_\alpha + k_{\alpha\beta}$、$s_\gamma = s_\beta + k_{\beta\gamma}$、$s_\gamma = s_\alpha + k_{\alpha\gamma}$ 及上闭链加法律 $k_{\alpha\gamma}(u) = k_{\alpha\beta}(u) + k_{\beta\gamma}(u)$；
4. **有理数域位分类、阿代尔乘积守恒、$p$-进闭球同余纤维与素数对数遍历（`rational_absolute_value_classification`、`rational_padic_product_formula`、`congruenceFiber_eq_closedBall_inter_range`、`riemann_zeta_dirichlet_sum_eq_euler_product`、`prime_log_rational_independence`、`TorusOrbitEquidistribution.result`）**：$\mathbb{Q}$ 上非平凡实值绝对值必等价于实绝对值或唯一素数 $p$-进绝对值，非零有理数满足 $\lvert x\rvert \cdot \prod_p \operatorname{padicNorm}_p(x) = 1$，整数模 $p^k$ 同余纤维恒等于 $\mathbb{Q}_p$ 中半径 $p^{-k}$ 的闭球与 $\mathbb{Z}$ 像之交；$\operatorname{Re}(s) > 1$ 上狄利克雷级数等于欧拉素数乘积，素数对数在 $\mathbb{Q}$ 上线性无关，且有限维紧致环面上幂轨道沿连续函数的时间平均收敛于闭生成子群 $G = \overline{\langle g\rangle}$ 上的归一化哈尔积分。
:::

::: proof
第 1 组由三元比较特征秩五格拉姆表示、伴随双侧正交作用与四元数切比雪夫多项式双归纳直接锁定；第 2 组由三维反对称三线性型一维空间分类与 $(I - A A^\dagger - B B^\dagger) = A B^\dagger + B A^\dagger = 0$ 给出；第 3 组在 `ComplexPowerSolenoidDecomposition` 中由 $(z.\operatorname{coord}(m))^m = z.\operatorname{coord}(1)$ 及非零正模条件取实对数证得守恒律与单位模等价，并在 `ThroatTransitionCocycle` 中由纤维减法唯一解导出阿贝尔差值上闭链 $k_{\alpha\gamma} = k_{\alpha\beta} + k_{\beta\gamma}$；第 4 组由奥斯特洛夫斯基分类、素因子幂次消去、$p$-进估值超度量闭球定义、绝对收敛无穷乘积展开、算术基本定理唯一分解与外尔特征标和消去完成。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch39-holographic-arc-manifold-literature title="经典微分流形图册、实解析刚性与螺线管层叠拓扑文献边界（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 阅读本节须严格区分下列经典几何与拓扑文献结果及模型边界：

1. **$C^\infty$ 光滑图册、隆起函数对比 $C^\omega$ 实解析刚性**：抽象光滑流形图册公理由 H. Whitney（*Ann. of Math.* **37**, 645–680, 1936）奠定；平直切空间之间的列维-奇维塔联络由 T. Levi-Civita（1917）建立。非解析平坦光滑函数 $\beta(u) = e^{-1/u^2}\mathbf{1}_{u\neq 0}$（A.-L. Cauchy, 1823）支撑了 $C^\infty$ 单位分解，而实解析（$C^\omega$）流形上的幂级数唯一延拓定理则禁止任何非平凡平坦死区；
2. **维托里斯—范丹齐格—斯梅尔螺线管与阿代尔类空间**：一维紧致连通螺线管作为圆周覆盖逆向极限及其在 $\mathbb{R}^3 / S^3$ 内的嵌套实心环嵌入由 L. Vietoris（1927）、D. van Dantzig（*Fund. Math.* **15**, 102–125, 1930）与 S. Smale（*Bull. Amer. Math. Soc.* **73**, 747–817, 1967）确立；有理数域一维阿代尔紧致商群 $\mathbb{A}_{\mathbb{Q}}^1 / \mathbb{Q} \cong (\mathbb{R}\times\widehat{\mathbb{Z}})/\mathbb{Z}$ 作为离散 $(\mathbb{Q}, +)$ 的庞特里亚金对偶见 J. Tate（1950）与 A. Weil（*Basic Number Theory*, 1967），注意其在局部横截方向具有射有限康托尔纤维 $\widehat{\mathbb{Z}}$，故属一维叶向实解析螺线管层叠（solenoidal lamination / pro-Lie group）而非局部欧氏流形。
:::

::: {.example #ex-ch39-holographic-arc-manifold-quantitative-audit title="定量核验：射影闭圆五锚点三流场对账、李括号零残差与二进等距步核验"}
我们对闭合圆周 $\mathbb{RP}^1_\phi$ 上的三股实解析流场、李括号换位以及二进对数步幅做八位小数精确核验（`手工推导` / `NUM`）：

1. **五枚典型锚点上的 $(V_+, V_\div, V_\times)$ 与匀速合拢 $\frac{1}{2}(V_+ + V_\div) \equiv 1$ 对账**：
   - 过去极点 $x = 0$（$\phi = 0^\circ,\;\kappa = \mathbf{1.00000000}$）：$V_+ = \mathbf{2.00000000}$，$V_\div = \mathbf{0.00000000}$，$V_\times = \mathbf{0.00000000}$，算术平均 $\frac{1}{2}(2 + 0) = \mathbf{1.00000000}$；
   - 半步有理点 $x = \frac{1}{2}$（$\phi \approx 53.13010235^\circ,\;\kappa = \frac{4}{5} = \mathbf{0.80000000}$）：$V_+ = \frac{8}{5} = \mathbf{1.60000000}$，$V_\div = \frac{2}{5} = \mathbf{0.40000000}$，$V_\times = \frac{4}{5} = \mathbf{0.80000000}$，算术平均 $\frac{1}{2}(1.6 + 0.4) = \mathbf{1.00000000}$；
   - 现在自对偶赤道 $x = 1$（$\phi = 90^\circ,\;\kappa = \frac{1}{2} = \mathbf{0.50000000}$）：$V_+ = \mathbf{1.00000000}$，$V_\div = \mathbf{1.00000000}$，$V_\times = \mathbf{1.00000000}$（三流同速交汇峰值！），算术平均 $\mathbf{1.00000000}$；
   - 倍增有理点 $x = 2$（$\phi \approx 126.86989765^\circ,\;\kappa = \frac{1}{5} = \mathbf{0.20000000}$）：$V_+ = \frac{2}{5} = \mathbf{0.40000000}$，$V_\div = \frac{8}{5} = \mathbf{1.60000000}$，$V_\times = \frac{4}{5} = \mathbf{0.80000000}$，算术平均 $\mathbf{1.00000000}$；
   - 未来对径极点 $x = \infty$（$\phi = 180^\circ,\;\kappa = \mathbf{0.00000000}$）：$V_+ = \mathbf{0.00000000}$，$V_\div = \mathbf{2.00000000}$，$V_\times = \mathbf{0.00000000}$，算术平均 $\mathbf{1.00000000}$！
2. **李括号换位闭合直接验算**：
   以 $f(\phi) = 1 + \cos\phi,\; g(\phi) = 1 - \cos\phi$ 代入一维向量场括号 $[f\partial_\phi, g\partial_\phi] = (f g' - g f')\partial_\phi$：
   $$
   f g' - g f' \;=\; (1 + \cos\phi)(\sin\phi) - (1 - \cos\phi)(-\sin\phi) \;=\; 2\sin\phi \;\Longrightarrow\; [V_+,\, V_\div] - 2V_\times \;\equiv\; \mathbf{0.00000000}!
   $$
3. **两极四分之一圆弧与二进内禀等距核验**：
   流形上 `x = 1` 到 `x = 0` 的圆弧距离精确为 $\Delta\phi = \frac{\pi}{2} \approx \mathbf{1.57079633}$；二进链 $1 \to 2 \to 4 \to 8$ 每步内禀对数时间恒为 $\Delta\tau_\times = \ln 2 \approx \mathbf{0.69314718}$，相对半步凯莱保真度恒为 $\kappa_{\mathrm{rel}} = \frac{4}{5} = \mathbf{0.80000000}$；前四颗素数本原环周长依次为 $\ell(\gamma_2) \approx \mathbf{0.69314718}$、$\ell(\gamma_3) \approx \mathbf{1.09861229}$、$\ell(\gamma_5) \approx \mathbf{1.60943791}$、$\ell(\gamma_7) \approx \mathbf{1.94591015}$。
:::

---

**正反加法合拢成圆，换位流淌出乘法，对数是它的脉搏，素数是它盘旋不息的螺线金环——原来连续与离散从未分家！**

在下面的完整实验室第二卡与第三卡中将探针推向 `x = 0` 与 `x = ∞` 两极观察三股光滑流场的平稳驻留，再切入第五卡推动品红平直横截切面掠过内部丝滑盘旋的素数环管，困扰数学与物理学千年的“连续与离散之争”便在同一座流形上豁然和解：黎曼流形之所以不得不向平直切空间妥协，是因为它尚未脱去笛卡尔坐标卡的胎记；而在无切板的全息圆弧流形 $\mathcal{M}_\Omega$ 上，`0`、`1`、`∞` 共处一环，正反加法的换位直接流淌出乘法，$\ln$ 只是乘法流的内禀弧长，素数则是盘旋在 `1/2` 赤道上无自交的光滑本原螺线环——宇宙从头到尾没有一处棱角与断裂，所有的奇点、发散与锯齿，都只是平直切刀试图剖开圆融整体时留在刀口上的折痕。而在下一节[§39.10](ch39-s33-riemann-1854-1859-spectral-manifold-polishing.md)中，我们将见证波恩哈德·黎曼相隔五年的两座高峰——1854 年的流形曲率演说与 1859 年已获外部形式化证明的 $\sigma \equiv \frac{1}{2}$ 临界线谱——如何在同一只三元数球面上双璧合龙，把切板流形的残余折痕彻底磨光。

::: {.viz src="holographic-arc-manifold-sandbox" height="620"}
完整实验室：在“全息圆弧流形 · M_Ω 无切板光滑闭合”与“传统黎曼切板对照（MODEL）· T_pM 鳞片与横截锯齿”双透镜间切换（窄屏与章节嵌入视图亦可在巡览条旁一键切换透镜），依次巡览切板鳞片对比无切板圆弧闭合、`0 · 1 · ∞` 紧致闭环缝合、加·乘三维李代数旋量流、对数内禀弧长与两极减速以及素数光滑螺线环与平直切刀伪影五张实验卡，拖动舞台琥珀手柄或调节沿经线切板数 $N \in [6, 36]$（含 $C^\infty$ 鼓包开关）、经线角 $\phi \in [0^\circ, 360^\circ]$（含 `0, 1, ∞, −1` 快捷钮）、对数钟 $\log_2 x = \tau/\ln 2$（含 `1/4 … 8` 翻倍刻度）及刀片位置 $X \in [1.5, 16]$（含素数幂快捷钮），并在底部两条对照小图中同步观察第一图沿 $\phi$ 的加法流 $1+\cos\phi$、除法流 $1-\cos\phi$、乘法流 $\sin\phi$ 及前两流的平均 $1$，以及第二图光滑斜线 $X$ 对比平直切刀读出的切比雪夫阶梯 $\psi(X)$。十五条冻结 `LEAN ✓` 声明、`ARGUED` 微分几何与螺线管文献、`MODEL` 几何拼合与对比读法及 `NUM` 实算在依据栏与理论抽屉中分层列出。
:::
