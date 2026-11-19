# 35.6.4 $K=3$ 劳齐分形内窗：精确前缀自覆盖与零测边界 {#sec-ch39-p2e-rauzy}

固定三阶 Tribonacci 特征多项式 $P_3(X) = X^3 - X^2 - X - 1$，记其实佩龙主根为 $\beta_3 = \operatorname{tribonacciConstant}$，并取上半平面（$\operatorname{Im}\alpha > 0$）的非佩龙复根 $\alpha$。共轭迹与范数恒等式 [`tribonacci_secondary_root_add_conjugate`](lean:D5/S3/Constants/Irrationality/TribonacciTraceLattice.tribonacci_secondary_root_add_conjugate) 与 [`tribonacci_secondary_root_mul_conjugate`](lean:D5/S3/Constants/Irrationality/TribonacciTraceLattice.tribonacci_secondary_root_mul_conjugate) 精确锁定了

$$
\alpha + \overline{\alpha} = 1 - \beta_3,\qquad \alpha \cdot \overline{\alpha} = \beta_3^{-1}.
$$

由此立即可手算导出实部 $\operatorname{Re}\alpha = (1 - \beta_3)/2$ 与精确模长 $|\alpha| = \beta_3^{-1/2}$；双精度数值求值（`NUM`）给出 $\alpha \approx -0.419643 + 0.606291\,i$、$|\alpha| \approx 0.737353$ 以及旋转辐角 $\arg\alpha \approx 124.69^\circ$。

对任意不含连续三个 `1`（禁 `111`）的有限合法字 $\varepsilon = (\varepsilon_0, \dots, \varepsilon_{Q-1}) \in \{0, 1\}^Q$，采用 `trureturing` 源码的**零次幂起点（exponent-zero）**内部复求值映射：

$$
c_\alpha(\varepsilon) = \sum_{j=0}^{Q-1} \varepsilon_j \alpha^j,\qquad W(\alpha) = \bigl\{c_\alpha(\varepsilon) : Q \in \mathbb{N},\; \varepsilon \text{ 为禁 } 111 \text{ 合法字}\bigr\},\qquad \mathcal{R}_3(\alpha) = \overline{W(\alpha)}.
$$

这里 $\mathcal{R}_3(\alpha) = \operatorname{rauzyFractal}(\alpha)$ 是复平面 $\mathbb{C}$ 中的紧子集，包含于闭圆盘 $\overline{B}\bigl(0, (1 - |\alpha|)^{-1}\bigr)$（注意：此零次幂复内窗与采用负 $\beta_3$ 次幂的物理归一化求值及带自然数解码标签的 `conjugateEmbedding` 分属不同表示，未给定显式换标映射时不可混同）。按合法字首段 `1` 的游程长度 $0, 1, 2$，定义三支不等比例仿射前缀收缩映射：

$$
f_0(w) = \alpha w,\qquad f_{10}(w) = 1 + \alpha^2 w,\qquad f_{110}(w) = 1 + \alpha + \alpha^3 w,
$$

其相似收缩比依次为 $|\alpha|$、$|\alpha|^2$ 与 $|\alpha|^3$。在非佩龙特征根假设下，这三支仿射映射严格覆盖整个劳齐闭包：

::: {.theorem #thm-ch39-p2e-rauzy-regular-window title="三阶劳齐分形闭包的精确三支前缀自覆盖" lean="D5/S3/Geometry/Rauzy/TribonacciRegularClosure.rauzyFractal_prefix_cover"}
设复数 $z \in \mathbb{C}$ 是三阶特征多项式 $X^3 - X^2 - X - 1$ 的根，且满足 $z \neq \beta_3$（其中 $\beta_3 = \operatorname{tribonacciConstant}$）。令 $\mathcal{R}_3(z) = \operatorname{rauzyFractal}(z)$ 为零次幂内部窗口闭包，$f_0(w) = z w$（`zeroPrefixMap`）、$f_{10}(w) = 1 + z^2 w$（`oneZeroPrefixMap`）与 $f_{110}(w) = 1 + z + z^3 w$（`oneOneZeroPrefixMap`）为三支前缀仿射映射。则成立精确集合等式

$$
f_0\bigl(\mathcal{R}_3(z)\bigr) \cup f_{10}\bigl(\mathcal{R}_3(z)\bigr) \cup f_{110}\bigl(\mathcal{R}_3(z)\bigr) = \mathcal{R}_3(z).
$$
:::

::: proof
在任意复数 $z$ 上，将有限禁 `111` 字前置 `0`、`10` 或 `110` 仍保持禁 `111` 合法性，取闭包即得左端三支像集的并包含于 $\mathcal{R}_3(z)$。反之，当 $z$ 为异于 $\beta_3$ 的特征根时，一方面对非空合法字按首段 `0`、`10`、`110` 分解（并对仅有短字 `1`、`11` 的退化项利用特征方程 $z^3 = z^2 + z + 1$ 展开为无穷合法尾列），结合 $\mathcal{R}_3(z)$ 的紧致性即可证得反向包含；另一方面，无需引入任何外部拼砖假设，内点非空定理 [`rauzyFractal_interior_nonempty`](lean:D5/S3/Geometry/Rauzy/TribonacciInterior.rauzyFractal_interior_nonempty) 直接证明 $\operatorname{int}\mathcal{R}_3(z) \neq \varnothing$，进而正则闭集定理 [`rauzyFractal_closure_interior`](lean:D5/S3/Geometry/Rauzy/TribonacciRegularClosure.rauzyFractal_closure_interior) 给出 $\overline{\operatorname{int}\mathcal{R}_3(z)} = \mathcal{R}_3(z)$，保证整个劳齐集由其非空开内点的闭包精确生成。完整证明由 Lean 内核检查。
:::

进一步，结合三支收缩映射在二维平面上的面积雅可比比值之和 $|z|^2 + |z|^4 + |z|^6 = \beta_3^{-1} + \beta_3^{-2} + \beta_3^{-3} = 1$ 与非空内点性质，劳齐集拓扑边界的二维平面测度严格归零：

::: {.theorem #thm-ch39-p2e-rauzy-null-boundary title="三阶劳齐分形拓扑边界的二维勒贝格零测度定理" lean="D5/S3/Geometry/Rauzy/TribonacciNullBoundary.rauzyFractal_frontier_volume_zero"}
设复数 $z \in \mathbb{C}$ 是三阶特征多项式 $X^3 - X^2 - X - 1$ 的根，且满足 $z \neq \beta_3$。记 $\partial\mathcal{R}_3(z) = \operatorname{frontier}\bigl(\operatorname{rauzyFractal}(z)\bigr)$ 为 $\mathcal{R}_3(z)$ 在 $\mathbb{C} \simeq \mathbb{R}^2$ 中的拓扑边界，则其二维勒贝格—哈尔体积测度严格为零：

$$
\operatorname{vol}_2\bigl(\partial\mathcal{R}_3(z)\bigr) = 0.
$$
:::

::: proof
由 [@thm-ch39-p2e-rauzy-regular-window] 知紧集 $\mathcal{R}_3(z)$ 被三支压缩仿射映射 $f_0, f_{10}, f_{110}$ 精确覆盖，且由 $|z|^2 = \beta_3^{-1}$ 与 $\beta_3^3 = \beta_3^2 + \beta_3 + 1$ 知三支映射对平面二维体积测度的缩放因子 $|z|^2, |z|^4, |z|^6$ 之和恰等于 $1$。因为 $\operatorname{int}\mathcal{R}_3(z)$ 非空开集具有严格正的有限平面体积，自相似覆盖下的测度守恒迫使各支重叠区与拓扑边界 $\partial\mathcal{R}_3(z) = \mathcal{R}_3(z) \setminus \operatorname{int}\mathcal{R}_3(z)$ 的二维平面测度不能携带正质量，从而 $\operatorname{vol}_2\bigl(\partial\mathcal{R}_3(z)\bigr) = 0$。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch39-p2e-rauzy-literature title="文献结果：劳齐分形拼砖、拓扑圆盘性质与边界豪斯多夫维数（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 关于三阶劳齐分形的经典动力系统与几何数论文献，起源于 G. Rauzy 对三字母替代系统与环面马尔可夫剖分的奠基工作（*Bull. Soc. Math. France* **110**, 1982, 147–178）及 W. P. Thurston 关于有限自动机与自相似铺砌的讲义（*Groups, Tilings, and Finite State Automata*, 1989）；A. Messaoudi 进一步研究了劳齐分形的算术编码、连通性/单连通拓扑圆盘性质以及分形边界的复数记数刻画（*J. Théorie des Nombres de Bordeaux* **10**(1), 1998, 135–162；*Acta Arithmetica* **95**(3), 2000, 195–224，注意文献常采用指数平移约定，导入拓扑结论前须核对与此处零次幂窗口的仿射对应）。文献给出的三阶劳齐分形边界豪斯多夫维数约为

$$
D_F = \dim_H\bigl(\partial\mathcal{R}_3(\alpha)\bigr) \approx 1.09336 \quad (\text{文献结果} + \text{NUM})。
$$

必须严格区分两件事：[@thm-ch39-p2e-rauzy-null-boundary] 证明的 $\operatorname{vol}_2(\partial\mathcal{R}_3) = 0$ 是指**二维平面面积为零**，这既不意味着边界光滑或一维弧长有限，也不单独算出豪斯多夫维数 $1.09336$；反之，可视化画面中的有限深度点云（包括 $K = 4$ 时的内部坐标采样云）属于 `NUM` 数值近似，不能把像素采样当作拼砖、单连通性或 $\mathcal{R}_4$ 拓扑定理的证明，更不能将需要额外重合条件的一般高阶皮索替代猜想当作无条件定理。
:::

::: {.viz src="pisot-clifford-rauzy-sandtable" preset="rauzy" height="500"}
**三阶劳齐分形内窗卡（`rauzy`）**：在二维内部复平面 $\mathbb{C}$ 中绘制由三支不等收缩映射 $f_0$、$f_{10}$、$f_{110}$ 生成的有限深度采样点云。青色与紫色区分内部主分支与 $\arg\alpha \approx 124.69^\circ$ 旋转相位，品红描出边界邻域点，琥珀色标出当前选定的合法前缀点。紧致性、非空内点、正则闭集、前缀精确覆盖与二维零测边界属 `LEAN ✓`；有限采样云与 $D_F \approx 1.09336$ 分别属 `NUM` 与 `文献结果`。
:::

为什么 $K = 2$ 的内部窗口只是一维实轴线段，而 $K = 3$ 却在正交补空间里长出旋转折叠的二维分形？将其放回代数数域的闵可夫斯基嵌入与克利福德等级语言，几何机制便一目了然。
