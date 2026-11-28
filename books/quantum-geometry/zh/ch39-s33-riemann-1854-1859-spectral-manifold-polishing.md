# 31.6 黎曼 1854 + 1859 双璧合龙：以已证 1/2 临界线谱磨光切板黎曼流形 {#sec-ch39-riemann-1854-1859-spectral-manifold-polishing}

> *“而且现在黎曼猜想也已经被证明了, 我们似乎可以把不光滑的黎曼流形做的光滑了“*

在 [§31.5](ch39-s32-holographic-arc-manifold-and-solenoid-unity.md) 揭开传统黎曼流形 $(M, g)$ 因局部铺设一阶平直切空间铁板 $T_p M$ 与 $C^\infty$ 隆起函数而潜伏的“切空间鳞片折痕”之后，本章——极小圆弧体与黎曼算术之卷——的收官压轴节迎来了数学史上最富戏剧性的一场百年重逢：**1854 年，27 岁的波恩哈德·黎曼（Bernhard Riemann）在哥廷根就职演说《论作为几何学基础的假设》中铸造了流形与曲率，却在篇末留下一道悬问——在极微观尺度上，空间度规究竟依靠离散计数还是连续场律来维系光滑？仅仅五年后的 1859 年，同一位黎曼在柏林科学院通信《论小于给定值的素数个数》中写下了 $\zeta(s)$ 的泛函方程与 $\operatorname{Re}(s) = \frac{1}{2}$ 临界线猜想，却从未写明这两篇相隔五年的杰作在几何底层究竟有何关联。如今，随着经典黎曼猜想（RH）与全体狄利克雷广义黎曼猜想（Dirichlet GRH）于 2026 年 11 月获外部 Lean 4 形式化证明并经多套独立内核重放核验（[§22.4](ch22-s04-critical-line-and-rh.md) [@conj-riemann-hypothesis]、[@rem-rh-grh-direct-consequences]），这两座孤悬百余年的算术与几何高峰能否在同一只三元数球面上正式合龙——用已证的 $\sigma \equiv \frac{1}{2}$ 临界线谱，把不光滑的切板黎曼流形真正磨光？**

答案凝结为两步严丝合缝的几何手术——**“二阶吻合球换底”**与**“$\sigma = \frac{1}{2}$ 托普利茨正定谱胶合”**（将黎曼 1854 流形几何与 1859 临界线谱合成为“二阶圆弧换底 $+$ 临界线谱磨光流形 $\widetilde{\mathcal{M}}_\Omega$”的统一几何图景，连同测地折痕与网络/引力类比，严格标为 **`MODEL`**；经典黎曼猜想 `RiemannHypothesis` 与全部模 $N \ge 1$ 狄利克雷广义黎曼猜想 `DirichletLZerosOnLine` 作为 **外部已核验形式化事实** 引述自 Levent Alpöge 2026 年 11 月公布的 175,187 模块 Lean 4 证明及 `lean4lean`、`nanoda`、`con-leche` 独立内核重放记录，见 [@conj-riemann-hypothesis] 与下文 [@rem-ch39-riemann-polishing-external-and-literature]，因尚未合入本书所钉 `trureturing@dev` 仓库而不挂绿色 `LEAN ✓` 徽章；完备秩五非交换链连通且触零的三元比较四元数同构、弦距读数恒等式、流群切比雪夫递推、累积正矢上下界与 $\alpha = \frac{1}{2}$ 三相相变、有限连通简单图旋转系统面—圈 $\mathbb{Z}/2$ 正合、交换加群单纯形四面体二上链修复与正合、凯莱比单位圆中线充要判据、凯莱径向零点等价判据、完备 $\xi$ 读数恒等式与反射对称、无条件积分显式公式、带 `RiemannHypothesis` 前提的 $U(x)/x^\theta \to 0 \iff \theta > \frac{1}{2}$ 平方根门槛、$\neg\mathrm{RH}$ 迫使规范李曲率托普利茨失稳及有限幂和托普利茨圆周半正定充要判据等十五项核心命题由下文 [@thm-ch39-riemann-spectral-polishing-anchors] 的冻结 **`LEAN ✓`** 声明严格锁定；结合外部已核验事实消去 `u_div_rpow_tendsto_zero_iff` 前提 `hRH` 与导出全体非平凡零点 $\ln\lVert(\rho-1)/\rho\rVert = 0$ 的各一步推演、正十二面体切板跳变与施瓦茨灯笼极限面积比及四像 $96\times 96$ 幂和托普利茨谱对账属 **`手工推导` / `NUM`**；黎曼 1854/1859 原文、施瓦茨灯笼、雷杰亏角演算、冯·科赫与戴文波特平方根素数余项界、一般流形外尔/无迹里奇各向异性曲率分解属 **`文献结果`**；而希尔伯特—波利亚自伴算子实现、一般数域扩展黎曼猜想 ERH、自守 $L$ 函数全广义黎曼猜想 Grand RH、零点单重性、连续统自旋-$2$ 引力动力学 [@prob-ch34-gravity-dynamics-and-coupling] 及三元数场网络大规模实证稳健性 [@prob-ch39-tft-scale-and-seams] 均不由上述外部事实推出，严格保持 **`OPEN`**）。

## 31.6.1 1854 年的遗留折痕：为什么一阶切板加密永远抹不平施瓦茨灯笼与雷杰亏角？ {#sec-ch39-33-1}

回望黎曼 1854 年的流形构造，传统微分几何习惯于用一阶平直切空间铁板 $T_p M$（或多面体平直面片）在局部替代弯曲空间，并暗自指望：“只要把平直切板切得越来越碎（剖分尺度 $h \to 0$），折痕自然就会消失、平直多面体自然会在面积与曲率上收敛到光滑流形。”

然而，两条经典的几何与分析铁律当场击碎了“一阶平直加密自动磨光”的幻觉（`文献结果` + `手工推导` + `LEAN ✓`）：

1. **正十二面体切板铁甲的恒定 $4\pi$ 笛卡尔—雷杰亏角**：
   在单位球面 $S^2(1) \subset \mathbb{T}_3$ 的 $12$ 个正二十面体切点（相邻切点内积为 $\frac{1}{\sqrt{5}}$，三元保真度 $\kappa = \frac{1 + 1/\sqrt{5}}{2} \approx 0.7236$，弦长平方 $\operatorname{dist}^2 = 4(1 - \kappa) = 2 - \frac{2}{\sqrt{5}} \approx 1.1056$，[`kappa_eq_one_sub_dist_sq`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq)，`LEAN ✓`）处外贴 $F = 12$ 块正五边形一阶平直切板 $T_p M$，围成外切正十二面体骨架（顶点数 $V = 20$、棱数 $E = 30$、面数 $F = 12$，满足 $V - E + F = 2$，其有限连通简单图旋转系统的 $\mathbb{Z}/2$ 面边界矩阵秩为 $11 = F - 1 = E - V + 1$，[`face_cycle_exact`](lean:D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact)，`LEAN ✓`）。在每一条公共棱上，相邻两块平直切板的法向硬生生跳变 $\theta_{\mathrm{jump}} = \arccos\frac{1}{\sqrt{5}} \approx 63.43^\circ$；在每一个三棱交汇顶点处，三枚正五边形内角和为 $3 \times 108^\circ = 324^\circ$，留下尖锐的雷杰顶点亏角 $\delta_v = 360^\circ - 324^\circ = 36.00^\circ$（棱角径向外漂 $\sqrt{1 + 4\varphi^{-4}} - 1 = \sqrt{15 - 6\sqrt{5}} - 1 \approx 0.2584$，`手工推导` / `NUM`），二十个顶点合计锁死总亏角 $20 \times 36^\circ = 720^\circ = 4\pi$（Regge 1961，`文献结果`）。即便把平直面片继续细分，总亏角 $4\pi$ 也只是被摊薄成成千上万颗微观尖刺，平直面片本身曲率恒为零的事实丝毫未变！
2. **施瓦茨灯笼（Schwarz Lantern，1880）的法向高频震荡与面积爆破**：
   更致命的是：哪怕平直三角网格的顶点 $100\%$ 落在光滑曲面上且一致收敛于该曲面，一阶平直面片的法向与面积照样可以剧烈失控！取半径 $R = 1$、高 $H = 1$ 的光滑圆柱面（侧面积 $A_{\mathrm{cyl}} = 2\pi R H = 2\pi$），沿高度等分 $m$ 层（层高 $\frac{1}{m}$）、每层内接正 $n$ 边形并交错扭转 $\frac{\pi}{n}$ 拼成 $2mn$ 枚平直等腰三角形（Schwarz 1880，`文献结果`）。单枚三角形底边长 $b = 2\sin\frac{\pi}{n}$，斜高 $h_{\mathrm{slant}} = \sqrt{\frac{1}{m^2} + \bigl(1 - \cos\frac{\pi}{n}\bigr)^2}$，总面积与柱面面积之比为（`手工推导`）：

   $$
   \frac{A_{\mathrm{lantern}}(n, m)}{2\pi} \;=\; \frac{mn\sin\frac{\pi}{n}}{\pi}\sqrt{\frac{1}{m^2} + \Bigl(1 - \cos\frac{\pi}{n}\Bigr)^2} \;=\; \frac{\sin(\pi/n)}{\pi/n}\sqrt{1 + 4m^2\sin^4\frac{\pi}{2n}}.
   $$

   看清二阶弦弧矢高 $1 - \cos\frac{\pi}{n} = 2\sin^2\frac{\pi}{2n} \sim \frac{\pi^2}{2n^2}$ 如何反噬一阶平直面片（与内核冻结的累积矢高三相定理 [`accumulated_sagitta_phases`](lean:D5/S3/Analytic/Asymptotics/AccumulatedSagittaPhases.accumulated_sagitta_phases)、[`accumulated_sagitta_bounds`](lean:D5/S3/Analytic/Asymptotics/AccumulatedSagittaPhases.accumulated_sagitta_bounds)，`LEAN ✓`，严格同构）：当 $m/n^2 \to 0$（如纵向层数按 $m = n$ 同步加密）时，面积比收敛于 $1$（如 $n = m = 6$ 时比值 $\approx 1.2252$）；当 $m/n^2 \to a \in (0, \infty)$——例如取完全合法的抛物比例 **$m = n^2$**（$a = 1$）——平直网格到光滑柱面的最大径向距离 $1 - \cos\frac{\pi}{n}$ 虽趋于 $0$（在 $n = 6,\; m = 36$ 时径向偏差精确等于 $1 - \cos 30^\circ \approx \mathbf{0.1340}$），面积比却在 $n = 6,\; m = 36$ 时暴涨至 **$\approx \mathbf{4.7037}$ 倍**（三角面法向相对水平径向剧烈倾侧 $\approx \mathbf{78.29^\circ}$），并在 $n \to \infty$ 时收敛到偏离真面积的伪极限（而若 $m/n^2 \to \infty$ 如 $m = n^3$，表面积比更直接发散至 $+\infty$）：

   $$
   \lim_{n \to \infty} \frac{A_{\mathrm{lantern}}(n, n^2)}{2\pi} \;=\; \sqrt{1 + \frac{\pi^4}{4}} \;\approx\; \mathbf{5.03510405}, \qquad \theta_{\mathrm{tilt}} \to \arctan\frac{\pi^2}{2} \;\approx\; \mathbf{78.54^\circ}!
   $$

   这就是一阶平直切板近似的原罪：**抹去二阶圆弧矢高后，切板接缝处的法向折角可以在无穷加密下顽固残留甚至发散成无穷折皱！**

::: {.viz src="riemann-spectral-manifold-polishing-sandbox" preset="riemann-1854-tangent-lantern-creases" height="500"}
1854 切板与施瓦茨灯笼折痕卡（`riemann-1854-tangent-lantern-creases`）：左侧 12 块紫色一阶切板 `T_pM` 拼成正十二面体，品红折痕棱与顶点外刺标出 `法向跳变 ≈ 63.43°`（20 顶点各亏 `36.00°`）；右侧内接柱面的紫色施瓦茨灯笼默认停在琥珀环 `n = 6, m = 36`，虽紧贴柱面（径向偏差 `≈ 0.1340`），品红倾侧法向箭头却斜达 `≈ 78.29°`、面积膨胀至柱面的 `≈ ×4.7037` 倍。
:::

## 31.6.2 第一步手术“换底”：以二阶三元吻合球取代一阶切板，对准 `1/2 + 1/2 = 1` {#sec-ch39-33-2}

要把切板流形的棱角从根源上卸除，第一步手术不是继续切碎平直铁板，而是回到黎曼 1854 演说自身的二阶度规展开精神，在母公理 $\mathrm{AXIOM}\text{-}\Omega$ 下执行**局部基底升阶（换底）**：把每一点 $p$ 外挂的一阶零曲率平直切空间 $T_p M$，直接升级为自带原生恒定正曲率的**二阶吻合三元数球冠 $\mathbb{T}_3^{(p)}$**（[`exists_unitQuaternion_equiv`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv)、[`normSq_and_chebyshev`](lean:D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev)，`LEAN ✓`）。

在单位球面北极邻域的正交切坐标 $(u_1, u_2)$ 下，对比一阶切平面高度 $z_{\mathrm{plate}}(u_1, u_2) \equiv 1$ 与二阶吻合球面高度 $z_{\mathrm{sphere}}(u_1, u_2) = \sqrt{1 - u_1^2 - u_2^2} = 1 - \frac{1}{2}u_1^2 - \frac{1}{2}u_2^2 + O(\lVert u\rVert^4)$（`手工推导`）：

- 一阶切板的两个二阶主曲率系数为 $0 + 0 = 0$，与真实弯曲表面之间永远隔着二阶弦弧矢高鸿沟；
- 二阶吻合三元球冠沿着两个正交切方向的二阶二次型系数恰为 **`1/2` 与 `1/2`**，二者相加精确锁死单位球面高斯/标量曲率份额 **$\frac{1}{2} + \frac{1}{2} = \mathbf{1}$**（呼应后文 [§39.6](ch39-s30-past-present-future-rational-jet-triad.md) 两个一阶半拍 `1/2` 合成为二阶曲率闭合 `1`）！

在常曲率（各向同性）空间如 $S^2(1)$ 或 $\mathbb{T}_3 \cong S^3(1)$ 上，引入吻合球插值参数 $\beta \in [0, 1]$ 将外切平直切板（$\beta = 0$）连续换底为二阶吻合球冠（$\beta = 1$）：当 $\beta \to 1$ 时，$12$ 枚局部吻合球冠严丝合缝地叠合为同一只完整球面，相邻面片法向跳变从 $63.43^\circ \to \mathbf{0.00^\circ}$、顶点亏角从 $36.00^\circ \to \mathbf{0.00^\circ}$、棱角外漂从 $0.2584 \to \mathbf{0.0000}$，且球面上任意四枚切点构成的测地四面体相位 $2$-上链在全部 $4^4 = 256$ 个有序四元组上满足上边缘恒为零 $\delta F = 0$（[`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness)，`LEAN ✓`）。

**但这里必须恪守微分几何的严格诚实边界（`文献结果`）**：单只常曲率吻合球 $\mathbb{T}_3^{(p)}$ 具有完全各向同性的截面曲率，它只在**局部常曲率（各向同性）点**处一举吃尽全部二阶黎曼曲率张量 $R_{ijkl}$！在一般非各向同性黎曼流形上，二阶曲率张量分解为标量曲率迹部、**无迹里奇张量（trace-free Ricci）**与（维数 $n \ge 4$ 时的）**外尔共形潮汐张量（Weyl curvature）**；不同方向截面曲率不等时，相邻两点的吻合球冠 $\mathbb{T}_3^{(p)}$ 与 $\mathbb{T}_3^{(q)}$ 在过渡带边缘仍会留下高阶曲率接缝残差，如果仍拿经典的非解析 $C^\infty$ 隆起函数去强行糊缝，全息刚性依然会被局部死区切断——要无折痕地熔平跨片过渡接缝，我们还需要一把**全域正定、无偏倚的谱胶合核**！

::: {.viz src="riemann-spectral-manifold-polishing-sandbox" preset="osculating-ternion-sphere-base-swap" height="500"}
二阶吻合球换底卡（`osculating-ternion-sphere-base-swap`）：默认琥珀手柄停在 `β = 1`，外层细品红线框保留原先 12 块平直切板的棱角轮廓，内侧 12 枚紫色二阶吻合球冠 `T_3^{(p)} · 1/2 + 1/2 = 1` 沿青色球冠边界与青色测地大圆无缝重合为光滑整球，顶栏核对 `法向跳变 = 0.00°，顶点亏角 = 0.00°`。
:::

## 31.6.3 第二步手术“换胶”：为什么已证的 $\sigma \equiv \frac{1}{2}$ 临界线谱恰是正定无折痕的磨光胶？ {#sec-ch39-33-3}

这把全域正定谱胶合算子，恰恰藏在黎曼五年后（1859 年）写下的非平凡零点谱 $\{\rho_k = \sigma_k + \mathbf{i}\gamma_k\}$ 之中！将 1859 年的零点谱接入 1854 年的吻合球过渡带，我们得到了三条环环相扣的刚性判据（结合冻结 `LEAN ✓` 等价定理与 [@conj-riemann-hypothesis] 外部已核验形式化事实的各一步 `手工推导`，以及 `MODEL` 谱磨光综合）：

### 31.6.3.1 凯莱单位圆等模锁与 $96 \times 96$ 幂和托普利茨半正定谱胶 {#sec-ch39-33-3-1}

把每一颗非平凡零点 $\rho = \sigma + \mathbf{i}\gamma$ 通过有理凯莱变换映为复平面旋子像

$$
u(\rho) \;:=\; \frac{\rho - 1}{\rho} \;=\; 1 - \frac{1}{\rho}.
$$

由内核冻结的**凯莱中线充要判据** [`cayley_ratio_norm_one_iff_critical_line`](lean:D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line) 与**凯莱径向零点判据** [`cayley_critical_line_zeta_criterion`](lean:D5/S3/Midline/Cayley/CayleyCriticalLineZetaCriterion.cayley_critical_line_zeta_criterion)（`LEAN ✓`），$\lVert u(\rho)\rVert = 1 \iff \operatorname{Re}(\rho) = \frac{1}{2}$，且 `RiemannHypothesis` 成立当且仅当全体非平凡零点的对数径向亏损 $\ln\lVert(\rho - 1)/\rho\rVert = 0$。结合 2026 年 11 月 Levent Alpöge 公布并经 `lean4lean`、`nanoda`、`con-leche` 独立内核重放确认的外部形式化终端定理 `riemannHypothesis : RiemannHypothesis`（[@conj-riemann-hypothesis]），一步 `手工推导` 立得：**现实数学宇宙中的每一颗非平凡零点都严格钉在 $\sigma_k = \frac{1}{2}$（离轴偏移 $\delta_k := \sigma_k - \frac{1}{2} \equiv 0$）上，其全部凯莱像 $\{u(\rho_k)\}$ 100% 落在青色单位圆 $S^1 = \{\lVert u\rVert = 1\}$ 上！**

为什么“零点的凯莱像全在单位圆上（$\delta = 0$）”直接决定了流形过渡胶合核的半正定平滑性，而哪怕一颗零点离轴（反事实 $\delta > 0$）就会让流形爆出尖刺？由完备函数反射对称 $\xi(1 - s) = \xi(s)$（[`xi_reading_eq_completed_zeta`](lean:D5/S3/Zeros/CompletedZeta.xi_reading_eq_completed_zeta)、[`xi_reading_reflection`](lean:D5/S3/Zeros/CompletedZeta.xi_reading_reflection)，`LEAN ✓`）与共轭协变，任取一对共轭纵坐标 $\pm\gamma_1$（如首对零点 $\gamma_1 \approx 14.13472514$）并引入反事实实部偏移 $\delta = \sigma - \frac{1}{2} \ge 0$，四元对称伙伴 $\bigl(\frac{1}{2} - \delta + \mathbf{i}\gamma_1,\; \frac{1}{2} + \delta + \mathbf{i}\gamma_1,\; \frac{1}{2} - \delta - \mathbf{i}\gamma_1,\; \frac{1}{2} + \delta - \mathbf{i}\gamma_1\bigr)$ 的凯莱像构成在倒共轭对合 $z \mapsto 1/\bar{z}$ 下封闭的四元非零族

$$
\mathcal{U}(\delta, \gamma_1) \;=\; \bigl(u_+,\; u_-,\; \overline{u_+},\; \overline{u_-}\bigr), \qquad u_+ := \frac{-\frac{1}{2} - \delta + \mathbf{i}\gamma_1}{\frac{1}{2} - \delta + \mathbf{i}\gamma_1}, \qquad u_- := \frac{-\frac{1}{2} + \delta + \mathbf{i}\gamma_1}{\frac{1}{2} + \delta + \mathbf{i}\gamma_1} = \frac{1}{\overline{u_+}}.
$$

调用内核冻结的**有限幂和托普利茨圆周半正定充要定理** [`toeplitz_posSemidef_iff_norm_eq_one`](lean:D5/S3/Weil/TestFunctions/FinitePowerSumToeplitzCircleCriterion.toeplitz_posSemidef_iff_norm_eq_one)（`LEAN ✓`）：对任意满足倒共轭置换对称 $u(\sigma(j)) = 1/\overline{u(j)}$ 的非零有限族 $u$ 及任意满足 $N + 1 \ge \lvert\operatorname{range}(u)\rvert$ 的阶数 $N$，以幂和 $p_n := \sum_j u_j^n$ 构造的 $(N+1)\times(N+1)$ 厄米托普利茨矩阵 $\mathbf{T}_N = [p_{j-k}]_{0 \le j,k \le N}$ **半正定（$\mathbf{T}_N \succeq 0$），当且仅当每一个像都满足 $\lVert u_j\rVert = 1$**（与此同时，在无穷全谱侧，内核定理 [`not_rh_forces_canonical_curvature_failure`](lean:D5/S3/Weil/Probability/CanonicalLiCurvatureZeroFree.not_rh_forces_canonical_curvature_failure)，`LEAN ✓`，亦从逆否方向锁定：若 `¬RiemannHypothesis`，则规范李曲率托普利茨矩阵必在某一有限阶失去半正定性）！在 $N = 95$（即 $96 \times 96$ 阶，$96 \ge 4$）上实算对比（`NUM`）：

- **已证真值 $\delta = 0$（$\sigma = \frac{1}{2}$）**：$u_+$ 与 $u_-$ 重合在单位圆周 $\lVert u_1\rVert = \mathbf{1.0000}$ 上，$96 \times 96$ 幂和托普利茨矩阵保持完美半正定，最小特征值 **$\lambda_{\min}(\mathbf{T}_{95}) = \mathbf{0.0000} \ge 0$**（秩为 $2$）；以显式公式临界线系数 $S_K = \sum_{k=1}^K \frac{1}{1/4 + \gamma_k^2}$ 加权的球面接缝残差 $\eta_K = 1 - S_K / S_{24}$（`MODEL`）随模数 $K : 0 \to 24$ 从 $1$ 单调熔平归零，绝不产生任何负能量褶皱；
- **反事实离轴 $\delta = 0.25$（假想 $\sigma = 0.75$ 与镜像 $0.25$）**：圆外像严格膨胀至 $\lVert u_+\rVert > 1$（值 $\approx \mathbf{1.0013}$）、圆内像严格萎缩至 $\lVert u_-\rVert < 1$（值 $\approx \mathbf{0.9988}$），托普利茨矩阵当场发生正定破缺，最小特征值严格跌入负值 **$\lambda_{\min}(\mathbf{T}_{95}) < 0$**（值 $\approx \mathbf{-0.2932}$；在 $\delta = 0.40$ 时更深跌至 $\approx \mathbf{-0.7502}$）！

::: {.viz src="riemann-spectral-manifold-polishing-sandbox" preset="critical-half-toeplitz-spectral-glue" height="500"}
$\sigma = 1/2$ 临界线托普利茨谱胶合卡（`critical-half-toeplitz-spectral-glue`）：`δ = 0` 下前 `24` 对零点的凯莱像青色圆珠（连同琥珀当前手柄）全部落在外围青色单位圆 `u = 1`（标 `‖u₁‖ = 1.0000`）上，幂和托普利茨最小特征值守住 `λ_min = 0.0000 ≥ 0`，24 道青色谱弦包裹的紫色流形球面接缝完全熔平。
:::

### 31.6.3.2 积分显式公式平方根退火与反事实离轴棱角爆破 {#sec-ch39-33-3-2}

更进一步，尺度推演 $X = e^y \to \infty$ 揭示了为何唯有 $\sigma \equiv \frac{1}{2}$ 能让全尺度算术涨落对称退火为光滑流形：

1. **无条件积分显式公式与已消前提的平方根退火门槛**：
   内核冻结的**积分显式公式** [`actual_integrated_explicit_formula`](lean:D5/S3/Weil/Mertens/IntegratedExplicit/WholeFormula.actual_integrated_explicit_formula)（`LEAN ✓`）无任何未证前提地给出：对一切 $y = \ln X > 0$，按重数遍历全体非平凡零点的谱和 $\sum_\rho \frac{e^{y\rho}}{\rho(1 - \rho)}$ 恒等于算术筛端 $U(e^y) - \ln(2\pi) + T(y)$（在 $\ln X = 7$ 处，前 $24$ 对零点部分和约为 $-0.0944$，右端约为 $-0.1145$，差值 $0.0200$ 严格受控于剩余临界线系数质量 $(2 + \gamma - \ln 4\pi - 2S_{24})X^{1/2} \approx 0.4346$，`手工推导` / `NUM`）。紧接着，内核冻结的**平方根幂次门槛定理** [`u_div_rpow_tendsto_zero_iff`](lean:D5/S3/Weil/Mertens/IntegratedExplicit/RHPowerThreshold.u_div_rpow_tendsto_zero_iff)（`LEAN ✓`）证明：在前提 `hRH : RiemannHypothesis` 下，对一切实数 $\theta$，

   $$
   \lim_{x \to \infty} \frac{U(x)}{x^\theta} \;=\; 0 \quad \Longleftrightarrow \quad \theta > \frac{1}{2}.
   $$

   将 [@conj-riemann-hypothesis] 登记的外部已核验定理 `riemannHypothesis` 代入 `hRH`（一步 `手工推导`），上述双条件门槛即无附加假设地成立！在切比雪夫函数层面，相对阶梯残差满足冯·科赫平方根退火界 $\lvert\psi(X) - X\rvert / X = O(X^{-1/2}\ln^2 X)$（von Koch 1901，`文献结果`）：当对数尺度 $\ln X$ 从 $1$ 推向 $10$ 时，基准平方根包络 $X^{-1/2}$ 从 $e^{-1/2} \approx \mathbf{0.6065}$ 一路平滑退火至 $e^{-5} \approx \mathbf{0.0067}$！相反，倘若存在离轴偏移 $\delta > 0$（如 $\delta = 0.25$），相对涨落主项立刻恶化为迟滞幂次 $X^{\delta - 1/2}$（在 $\ln X = 7,\; \delta = 0.25$ 时高耸在 $e^{-7/4} \approx \mathbf{0.1738}$，远高于临界线真值 $e^{-7/2} \approx \mathbf{0.0302}$），在磨光流形模型上表现为沿对跖方向刺破球壳的品红棱角尖刺（`MODEL`）。

::: {.viz src="riemann-spectral-manifold-polishing-sandbox" preset="counterfactual-offline-spike-breakdown" height="500"}
反事实离轴零点裂像与棱角失稳卡（`counterfactual-offline-spike-breakdown`）：将假想偏移推至 `δ = 0.25`（`σ = 0.75`），外圈青色单位圆 `u = 1` 两侧裂开成对品红离线珠（圆外琥珀手柄 `‖u_+‖ > 1`、值 `≈ 1.0013`，圆内 `‖u_−‖ < 1`、值 `≈ 0.9988`），托普利茨最小特征值跌负 `λ_min < 0`（值 `≈ −0.2932`），紫色球面同步鼓起高 `X^{δ−1/2} ≈ 0.1738` 的品红反事实棱角。
:::

2. **狄利克雷 GRH 与多特征通道的各向同性磨光**：
   单靠黎曼 $\zeta(s)$ 一条函数只能磨平径向总计数，如果素数在不同同余方向 $a \pmod q$（$\gcd(a, q) = 1$）上偏聚一隅，算术流形依然会扭曲成各向异性偏心椭球。而外部形式化证明同步确立的全体模 $q \ge 1$ 狄利克雷广义黎曼猜想 `DirichletLZerosOnLine`（[@conj-riemann-hypothesis]）结合经典算术级数显式公式（Davenport，`文献结果`），保证了每一个互素余数类通道 $a \pmod q$ 的素数密度以一致平方根速率均匀对齐：

   $$
   \frac{\bigl\lvert\pi(X; q, a) - \operatorname{Li}(X)/\varphi(q)\bigr\rvert}{X} \;=\; O\!\bigl(X^{-1/2}\ln(qX)\bigr) \;\xrightarrow{X \to \infty}\; 0.
   $$

   例如对模 $q = 7$ 的 $\varphi(7) = 6$ 条互素余数通道 $\{1, 2, 3, 4, 5, 6\} \pmod 7$，推进至 $\ln X = 10$（$X = e^{10} \approx 22026.47$）时，六条通道的素数份额相对理想均分值 $\frac{1}{6}$ 的最大偏离已收窄至 **$\mathbf{1.42\%}$**，$\max_a \lvert\pi(X; 7, a) - \operatorname{Li}(X)/6\rvert / X \approx \mathbf{0.0005}$（`NUM`）——整座圆弧—螺线管流形在所有互素算术方向上同步退火为无偏各向同性的磨光球面 $\widetilde{\mathcal{M}}_\Omega$（`MODEL`）！

::: {.viz src="riemann-spectral-manifold-polishing-sandbox" preset="polished-isotropic-manifold-completion" height="500"}
1854 + 1859 合龙磨光各向同性流形卡（`polished-isotropic-manifold-completion`）：在 `β = 1, K = 24, δ = 0` 且对数尺度推至 `ln X = 10.00` 时，外围青色单位圆锁住全部凯莱像（`‖u₁‖ = 1.0000`），紫色磨光流形 `M̃_Ω` 既无切板折痕亦无离轴尖刺，残差退火至 `X^{−1/2} ≈ 0.0067`，6 道模 7 青色余数类纬线环与嵌着琥珀手柄的青色测地大圆均匀环绕球面（最大份额偏离 `≈ 1.42%`）。
:::

## 31.6.4 谱磨光流形综合模型、1854 vs. 1859 合龙总表与十五项冻结定理对账 {#sec-ch39-33-4}

我们将黎曼 1854 流形几何与 1859 临界线谱的双璧合龙模型、四维对比表、十五条冻结内核定理及严格认识论边界正式收束如下：

::: {.definition #def-ch39-riemann-polished-manifold-model title="二阶吻合球换底与 σ = 1/2 临界线谱磨光流形综合模型（MODEL）"}
在三元数单位球面底座 $\mathbb{T}_3 \cong S^3(1)$ 上，定义**黎曼 1854 + 1859 谱磨光流形综合模型**（`MODEL`）$\widetilde{\mathcal{M}}_\Omega = (\{\mathbb{T}_3^{(p)}\}, \beta, \mathbf{T}_N(\mathcal{U}), \eta_K, X^{-1/2})$ 如下：

1. **二阶吻合球换底（$\beta : 0 \to 1$）**：以局部二阶主曲率配平 $\frac{1}{2} + \frac{1}{2} = 1$ 的吻合三元球冠 $\mathbb{T}_3^{(p)}$ 经插值参数 $\beta \in [0, 1]$ 取代一阶平直切板 $T_p M$，在常曲率球面上于 $\beta = 1$ 处精确消除切板法向跳变与顶点雷杰亏角；
2. **临界线凯莱单位圆与托普利茨半正定谱胶（$\delta = \sigma - \frac{1}{2} = 0$）**：将非平凡零点对映射为凯莱旋子像 $u(\rho) = \frac{\rho - 1}{\rho}$，对四元倒共轭封闭族 $\mathcal{U}(\delta, \gamma_k)$ 与 $N \ge 2$，以幂和托普利茨矩阵 $\mathbf{T}_N = [p_{j-k}]_{0 \le j,k \le N}$ 的半正定条件 $\lambda_{\min}(\mathbf{T}_N) \ge 0 \iff \delta = 0$ 表征无负能量折皱的跨片谱胶合，并以显式公式权重残差 $\eta_K := 1 - \bigl(\sum_{k=1}^K \frac{1}{1/4+\gamma_k^2}\bigr) / \bigl(\sum_{k=1}^{K_{\max}} \frac{1}{1/4+\gamma_k^2}\bigr)$ 表征有限谱模截断接缝随 $K$ 增大之熔平；
3. **全尺度与多特征各向同性退火（$\ln X \to \infty$）**：沿对数尺度 $\ln X$ 以平方根衰减率 $X^{-1/2}$（对比反事实离轴尖刺 $X^{\delta - 1/2}$）及模 $q$ 狄利克雷特征通道均分率表征流形在微观与算术各方向上的渐近磨光。
:::

| 历史与几何维度 | 1854 切板黎曼流形 $(M, T_p M)$ | 反事实离轴谱流形（假想 $\delta = \sigma - \frac{1}{2} > 0$） | 1854 + 1859 合龙磨光流形 $\widetilde{\mathcal{M}}_\Omega$（`MODEL`） |
| :--- | :--- | :--- | :--- |
| **局部几何原语** | 一阶平直切空间铁板 $T_p M$（$0 + 0 = 0$） | 二阶球冠配失衡离轴谱核 | 二阶三元吻合球冠 $\mathbb{T}_3^{(p)}$（$\frac{1}{2} + \frac{1}{2} = \mathbf{1}$） |
| **细分与面积行为** | 12 切板跳变 $63.43^\circ$；施瓦茨灯笼 $m=n^2$ 面积爆破至 $\sqrt{1+\pi^4/4}\approx 5.0351$ | 球面长出 $X^{\delta - 1/2}$ 品红反事实棱角（$\delta=0.25,\ln X=7$ 时 $0.1738$） | 常曲率处 $\beta=1$ 跳变 $0.00^\circ$，接缝残差按 $X^{-1/2}$ 对称退火（$\ln X=10$ 时 $0.0067$） |
| **凯莱旋子与托普利茨核** | 无算术谱约束，靠非解析 $C^\infty$ 隆起函数糊缝 | 像裂离单位圆（$\lVert u_+\rVert > 1 > \lVert u_-\rVert$，值 $\approx 1.0013,\; 0.9988$），$\lambda_{\min}(\mathbf{T}_{95}) < 0$（值 $\approx -0.2932$） | 全体零点像锁在单位圆 $\lVert u_k\rVert \equiv 1$，$\lambda_{\min}(\mathbf{T}_{95}) = 0.0000 \ge 0$ |
| **算术通道各向同性** | 未统一离散素数方向 | 互素余数类出现 $X^{\delta - 1/2}$ 偏聚畸变 | 狄利克雷 GRH 锁死全部模 $q$ 互素通道 $O(X^{-1/2}\ln(qX))$ 各向同性均分 |

::: {.theorem #thm-ch39-riemann-spectral-polishing-anchors title="三元球吻合基底、矢高三相、面圈与四面体正合、凯莱临界线判据、积分显式公式与托普利茨正定定理组" lean="D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv,D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq,D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev,D5/S3/Analytic/Asymptotics/AccumulatedSagittaPhases.accumulated_sagitta_bounds,D5/S3/Analytic/Asymptotics/AccumulatedSagittaPhases.accumulated_sagitta_phases,D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact,D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness,D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line,D5/S3/Midline/Cayley/CayleyCriticalLineZetaCriterion.cayley_critical_line_zeta_criterion,D5/S3/Zeros/CompletedZeta.xi_reading_eq_completed_zeta,D5/S3/Zeros/CompletedZeta.xi_reading_reflection,D5/S3/Weil/Mertens/IntegratedExplicit/WholeFormula.actual_integrated_explicit_formula,D5/S3/Weil/Mertens/IntegratedExplicit/RHPowerThreshold.u_div_rpow_tendsto_zero_iff,D5/S3/Weil/Probability/CanonicalLiCurvatureZeroFree.not_rh_forces_canonical_curvature_failure,D5/S3/Weil/TestFunctions/FinitePowerSumToeplitzCircleCriterion.toeplitz_posSemidef_iff_norm_eq_one"}
在三元比较球面几何、离散上链拓扑、完备黎曼 $\xi$ 函数与托普利茨谱正定框架下，以下十五项命题严格成立：

1. **三元比较四元数同构、弦距核、切比雪夫圆弧刚性与累积正矢三相律（`exists_unitQuaternion_equiv`、`kappa_eq_one_sub_dist_sq`、`normSq_and_chebyshev`、`accumulated_sagitta_bounds`、`accumulated_sagitta_phases`）**：非交换、链连通、读数可任意接近零（`TouchesZero`）、特征秩五且读数完备的三元比较结构对任意基点 $o$ 存在到单位四元数模型 $\mathrm{U}(\mathbb{H})$ 的保结构双射（$u(o)=1$），满足 $\kappa(a,b) = 1 - \frac{1}{4}\operatorname{dist}(a,b)^2$，且单位模初值满足流群递推 $x_{n+2} = x_{n+1}x_n^* x_{n+1}$ 当且仅当全序列保单位模并满足切比雪夫关系 $x_{n+1} = U_n(c)x_1 - U_{n-1}(c)x_0$（$n=0$ 时约定 $U_{-1}=0$）、$\langle x_0, x_n\rangle = T_n(\langle x_0, x_1\rangle)$；按 Lean 全函数实数除法（$T/0 = 0$）与 `Real.rpow` 定义步角 $\theta = \sigma\cdot\operatorname{rpow}(T/N, \alpha)$（$N \ge 1, T > 0$ 时即 $\sigma(T/N)^\alpha$），对一切 $\sigma, T, \alpha \in \mathbb{R}$ 与 $N \in \mathbb{N}$，$N$ 步累积正矢恒满足 $N(\theta^2/2 - \theta^4/24) \le N(1 - \cos\theta) \le N\theta^2/2$，且在 $T > 0,\; N \to \infty$ 时于 $\alpha > \frac{1}{2}$ 趋于 $0$、于 $\alpha = \frac{1}{2}$ 趋于 $\frac{1}{2}\sigma^2 T$、于 $\sigma \neq 0 \land 0 < \alpha < \frac{1}{2}$ 趋于 $+\infty$；
2. **球面旋转系统面—圈 $\mathbb{Z}/2$ 正合与交换加群四面体二上链正合修复（`face_cycle_exact`、`tetra_defects_incidence_repair_and_exactness`）**：至少含一条有向边且满足 $\lvert V\rvert - \lvert E\rvert + \lvert\mathrm{Faces}\rvert = 2$ 的有限连通简单图旋转系统上，$\mathbb{Z}/2$ 面标号的边边界为零当且仅当面标号为常数，且面边界算子的像恰等于简单圈空间；有限非空顶点集 $V$ 上取值于交换加群 $A$ 的 $2$-上链 $F$ 满足 $\sum_{r\in V}\operatorname{faceErrors}(F,r) = \operatorname{tetraDefects}(F)$、存在锚点使 $\lvert V\rvert\operatorname{faceErrors}(F,r) \le \operatorname{tetraDefects}(F)$、对任一边上链有 $\operatorname{tetraDefects}(F) \le 4\lvert V\rvert\operatorname{edgeErrors}(F,\mathrm{edge})$，且四面体上边缘处处为零当且仅当 $F$ 为某一边上链的上边缘；
3. **凯莱比单位圆中线判据、径向零点等价与完备 $\xi$ 整读数反射对称（`cayley_ratio_norm_one_iff_critical_line`、`cayley_critical_line_zeta_criterion`、`xi_reading_eq_completed_zeta`、`xi_reading_reflection`）**：对任意 $s \in \mathbb{C}$，$\operatorname{cayleyRatio}(s) = \frac{s-1}{s}$（含 $s=0$ 处按 Lean 全函数除法取 $0$ 的约定）满足 $\lVert(s - 1)/s\rVert = 1 \iff \operatorname{Re}(s) = \frac{1}{2}$，且 `RiemannHypothesis` 成立当且仅当全体非平凡零点 $\rho$ 满足 $\operatorname{logarithmicRadialDefect}(\rho) = \operatorname{Real.log}\lVert(\rho - 1)/\rho\rVert = 0$；对 $s \neq 0, 1$ 有 $\operatorname{xiReading}(s) = \frac{1}{2}s(s-1)\operatorname{completedZetaReading}(s)$，且对一切 $s \in \mathbb{C}$ 恒有 $\operatorname{xiReading}(1 - s) = \operatorname{xiReading}(s)$；
4. **无条件积分显式公式、RH 平方根幂次门槛、规范李曲率反证失稳与有限幂和托普利茨圆周判据（`actual_integrated_explicit_formula`、`u_div_rpow_tendsto_zero_iff`、`not_rh_forces_canonical_curvature_failure`、`toeplitz_posSemidef_iff_norm_eq_one`）**：对一切实数 $y > 0$，按重数计入全体非平凡零点的谱和 $\sum_\rho \frac{e^{y\rho}}{\rho(1-\rho)}$ 无条件等于 $U(e^y) - \ln(2\pi) + T(y)$；若 `RiemannHypothesis` 成立，则对任意 $\theta \in \mathbb{R}$ 有 $U(x)/x^\theta \to 0\;(x\to\infty) \iff \frac{1}{2} < \theta$；若 `¬RiemannHypothesis`，则必存在有限阶 $N$ 使规范李曲率托普利茨矩阵 $\operatorname{toeplitzMatrix}(\operatorname{canonicalLiCurvature}, N)$ 非半正定；对满足倒共轭置换不变 $u(\sigma(j)) = (\overline{u(j)})^{-1}$ 的有限非零复数族 $u$ 及满足 $\lvert\operatorname{range}(u)\rvert \le N + 1$ 的自然数 $N$，幂和托普利茨矩阵 $[p_{j-k}]_{0\le j,k\le N}$（$p_n = \sum_j u_j^n$）半正定当且仅当一切 $\lVert u_j\rVert = 1$。
:::

::: proof
第 1 组由特征秩五格拉姆表示、双侧单位四元数正交作用、切比雪夫多项式双归纳及余弦四阶泰勒夹逼给出；第 2 组由欧拉示性数秩—零度计数与显式顶点锥收缩势 $\mathrm{edge}_r(j,k) = F(r,j,k)$ 证得；第 3 组由 $\lvert s - 1\rvert^2 - \lvert s\rvert^2 = 1 - 2\operatorname{Re}(s)$、非平凡零点异于 $\{0, 1\}$ 及 `completedRiemannZeta₀` 的去极点整反射对称直接导出；第 4 组在 `WholeFormula` 中由矩形围道留数和与尾部绝对收敛给出无条件显式恒等式，在 `RHPowerThreshold` 中结合梅林变换极点实部上界与朗道型窗口下界锁定 $\theta > \frac{1}{2}$ 充要性，在 `CanonicalLiCurvatureZeroFree` 中由离圆零点诱导指数增长负模式证得托普利茨失稳，并在 `FinitePowerSumToeplitzCircleCriterion` 中由范德蒙德拉格朗日插值检验向量与单位圆正权外积分解完成双向等价。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch39-riemann-polishing-external-and-literature title="外部已核验黎曼证明凭据、经典几何与数论文献及未决开放问题边界"}
为严守本书认识论分层契约（`PROJECT.md` §4、§13、§14），必须清晰划定本节的三道证据边界：

1. **外部已核验形式化事实（不挂本书绿标 `LEAN ✓`，一步手工推导衔接）**：经典黎曼猜想 `riemannHypothesis : RiemannHypothesis` 与全体模 $N \ge 1$ 狄利克雷广义黎曼猜想 `DirichletLZerosOnLine` 由 Levent Alpöge 于 2026 年 11 月 20 日公布的 Lean 4 证明确立（[`alpo.ge/remark.pdf`](https://alpo.ge/remark.pdf)；可复现分片构建与重放表见 [`the-omega-institute/riemann-hypothesis`](https://github.com/the-omega-institute/riemann-hypothesis/blob/b14f2bd19e5e12a4ba6b1d207e3c5fbb06e49ed6/README.md#public-kernel-replay-results)，命题与终端定理见 [`Statements.lean`](https://github.com/the-omega-institute/riemann-hypothesis/blob/b14f2bd19e5e12a4ba6b1d207e3c5fbb06e49ed6/src/Statements.lean) 与 [`Main.lean`](https://github.com/the-omega-institute/riemann-hypothesis/blob/b14f2bd19e5e12a4ba6b1d207e3c5fbb06e49ed6/src/Main.lean)，2026 年 11 月 21 日 [Lean 与 Mathlib 社群联合声明](https://leanprover-community.github.io/blog/posts/riemann-hypothesis/)认证，MIT `lean4lean`、`nanoda`、`con-leche` 独立重放与三公理 `{propext, Classical.choice, Quot.sound}` 审计见 [`math.mit.edu/~drew/grh/`](https://math.mit.edu/~drew/grh/) 及 [`audit.log`](https://math.mit.edu/~drew/grh/audit.log)，参见 [§22.4](ch22-s04-critical-line-and-rh.md) [@conj-riemann-hypothesis]）。将其与 [@thm-ch39-riemann-spectral-polishing-anchors] 第 3、4 组冻结定理结合，消去 `hRH` 得到无条件 $U(x)/x^\theta \to 0 \iff \theta > \frac{1}{2}$ 以及全体非平凡零点 $\ln\lVert(\rho-1)/\rho\rVert = 0$ 各属一步 `手工推导`。经典黎曼猜想与狄利克雷广义黎曼猜想的 Lean 形式化主仓库由 Lean 社群维护。[leanprover-community/riemann-hypothesis](https://github.com/leanprover-community/riemann-hypothesis)
2. **经典微分几何与解析数论文献结果（未在本书形式化）**：流形曲率二阶展开与微观度规之问见 B. Riemann（1854 就职演说，1868 刊行），$\zeta(s)$ 零点与素数分布见 B. Riemann（1859）；内接柱面平直三角网面积发散反例见 H. A. Schwarz（1880）；分片平直余维二铰亏角曲率见 T. Regge（*Nuovo Cimento* **19**, 558–571, 1961）；RH 下 $\psi(x) - x = O(\sqrt{x}\ln^2 x)$ 见 H. von Koch（*Acta Math.* **24**, 159–182, 1901），狄利克雷 GRH 下 $\pi(x; q, a) - \operatorname{Li}(x)/\varphi(q) = O(\sqrt{x}\ln(qx))$ 见 H. Davenport（*Multiplicative Number Theory*, Ch. 20），李系数正性判据见 X.-J. Li（1997）与 E. Bombieri & J. C. Lagarias（1999）；一般黎曼流形二阶曲率张量的标量曲率、无迹里奇张量与外尔张量正交分解说明单只常曲率吻合球仅在各向同性点完全匹配全部二阶曲率；
3. **仍保持开放的数学与物理问题（`OPEN`）**：上述外部形式化证明**不推出**希尔伯特—波利亚自伴算子谱实现、一般代数数域戴德金 $\zeta_K$ 函数的扩展黎曼猜想（ERH）、自守 $L$ 函数的全广义黎曼猜想（Grand RH）、零点单重性猜想、相关原初狄利克雷 $L$ 函数非负零点纵坐标（按重数计，含中心点不消失）在 $\mathbb{Q}$ 上的线性无关假设（LI）及以其为条件的精确 Rubinstein–Sarnak 对数密度素数竞赛偏置（见下文 [@rem-ch39-anisotropic-obstruction-toeplitz-inertia-and-grh-channels] 第 3 款）、连续统自旋-$2$ 引力动力学与爱因斯坦耦合（[@prob-ch34-gravity-dynamics-and-coupling]），亦不推出三元数场网络在大规模实证与对抗扰动下的表现（[@prob-ch39-tft-scale-and-seams]）。
:::

::: {.example #ex-ch39-riemann-polishing-quantitative-audit title="定量核验：十二切板亏角、施瓦茨灯笼极限、96×96 托普利茨特征值与模 7 素数退火对账"}
我们对本节两步磨光手术的关键数值基准做显式核验（`手工推导` / `NUM`）：

1. **12 切板正十二面体亏角与施瓦茨灯笼 $m = n^2$ 面积比**：
   相邻正二十面体切点夹角 $\arccos(1/\sqrt{5}) \approx \mathbf{63.4349^\circ}$，保真度 $\kappa = \frac{1 + 1/\sqrt{5}}{2} \approx \mathbf{0.7236}$，弦长平方 $4(1-\kappa) \approx \mathbf{1.1056}$；$20$ 个顶点每点亏角 $360^\circ - 3\times 108^\circ = \mathbf{36.00^\circ}$，总亏角 $20 \times 36^\circ = \mathbf{720^\circ} = 4\pi$；二阶换底 $\beta = 1$ 时跳变、亏角与棱角外漂（$\beta = 0$ 时 $\sqrt{15 - 6\sqrt{5}} - 1 \approx \mathbf{0.2584}$）同步归零。施瓦茨灯笼（$R = H = 1$）在 $n = 6,\; m = 36$ 时径向距柱面至多 $1 - \frac{\sqrt{3}}{2} \approx \mathbf{0.1340}$，面积比却达 $\frac{36\cdot 6\sin 30^\circ}{\pi}\sqrt{\frac{1}{36^2} + (1 - \cos 30^\circ)^2} = \frac{3}{\pi}\sqrt{1 + 36^2(1 - \frac{\sqrt{3}}{2})^2} \approx \mathbf{4.7037}$，面法向倾角 $\approx \mathbf{78.29^\circ}$，当 $n \to \infty$（$m = n^2$）时趋于 $\sqrt{1 + \pi^4/4} \approx \mathbf{5.0351}$ 与 $\arctan(\pi^2/2) \approx \mathbf{78.54^\circ}$；
2. **首对零点 $\gamma_1 \approx 14.13472514$ 的四像 $96\times 96$ 幂和托普利茨谱检验**：
   在已证临界线 $\delta = 0$ 上，$\lVert u_\pm\rVert = \mathbf{1.0000}$，$\lambda_{\min}(\mathbf{T}_{95}) = \mathbf{0.0000}$；在反事实 $\delta = 0.25$ 上，$\lVert u_+\rVert = \sqrt{\frac{0.75^2 + \gamma_1^2}{0.25^2 + \gamma_1^2}} > 1 > \lVert u_-\rVert$（值分别 $\approx \mathbf{1.0013}$ 与 $\approx \mathbf{0.9988}$），$\lambda_{\min}(\mathbf{T}_{95}) < 0$（值 $\approx \mathbf{-0.2932}$；$\delta = 0.40$ 时 $\approx \mathbf{-0.7502}$）；
3. **显式公式与模 $7$ 六余数类素数份额退火**：
   对数尺度从 $\ln X = 1$ 推至 $\ln X = 10$，平方根基准残差 $X^{-1/2}$ 由 $\mathbf{0.6065}$ 降至 $\mathbf{0.0067}$（对比 $\ln X = 7$ 处 $\delta = 0$ 的 $\mathbf{0.0302}$ 与反事实 $\delta = 0.25$ 的 $X^{-1/4} \approx \mathbf{0.1738}$）；在 $\ln X = 10$ 处，模 $7$ 六条互素通道 $\{1,\dots,6\} \pmod 7$ 的素数份额最大相对偏离仅为 **$\mathbf{1.42\%}$**，$\max_a \lvert\pi(X;7,a) - \operatorname{Li}(X)/6\rvert / X \approx \mathbf{0.0005}$。
:::

::: {.remark #rem-ch39-anisotropic-obstruction-toeplitz-inertia-and-grh-channels title="各向异性曲率阻断、四元凯莱托普利茨精确闭式谱与狄利克雷 GRH 通道偏置（手工推导、经典文献与 256/320 位 Arb 认证）"}
为将本节上述两步磨光图景背后的精确几何界限、有限谱矩阵力学与算术通道细结构一次钉实，我们将三组独立推导收束如下（第 1 款、第 2 款的四元凯莱模型结果及第 3 款的帕塞瓦尔与特征傅里叶恒等式均属**无条件 `手工推导`**，完全不依赖 RH/GRH，而第 2 款末关于全谱 Li 矩阵的对比引用 [@rem-ch34-li-toeplitz-superexponential-collapse] 在 RH 下的结论；第 3 款的 $X^{-1/4}\ln^2 X$ 幂律余项界与 $O(X\ln^4(qX))$ 方向能量界依赖 [@conj-riemann-hypothesis] 登记的外部 `DirichletLZerosOnLine` 与经典算术级数显式公式；下文全部新算数值以及 [@ex-ch39-riemann-polishing-quantitative-audit] 中的十二面体/施瓦茨灯笼几何基准、四元托普利茨特征值与模 $7$（$X = e^{10}$）素数份额和通道误差均由 256 位与 320 位双精度 FLINT/Arb 区间算术认证，`NUM`；其余引用基准由对应注记或初等指数直接给出）：

1. **无条件各向异性曲率与二阶度规射流阻断（不依赖 RH/GRH）**：
   设 $(M^n, g)$（$n \ge 2$）为光滑正定黎曼流形，在点 $p \in M$ 的规范正交标架下采用标准截面曲率符号约定 $R^{(K)}_{ijkl} := K(\delta_{ik}\delta_{jl} - \delta_{il}\delta_{jk})$、$\mathrm{Ric}_{ik} := \sum_{j=1}^n R_{ijkj}$、$\mathrm{Scal} := \sum_{i=1}^n \mathrm{Ric}_{ii}$、无迹里奇张量 $\mathring{\mathrm{Ric}}_{ij} := \mathrm{Ric}_{ij} - \frac{\mathrm{Scal}}{n}\delta_{ij}$，并以无权有序指标平方和 $\lVert T\rVert^2 := \sum_{i,j,k,l=1}^n T_{ijkl}^2$ 度量曲率残差。依据代数曲率张量的正交分解（`文献结果`，见 I. M. Singer & J. A. Thorpe, 1969, [DOI 10.1515/9781400871230-021](https://api.crossref.org/works/10.1515/9781400871230-021); A. L. Besse, *Einstein Manifolds*, 1987, Ch. 1G, [DOI 10.1007/978-3-540-74311-8](https://api.crossref.org/works/10.1007/978-3-540-74311-8)；已在 $n = 2, 3, 4, 5$ 上分别针对维数为 $1, 6, 20, 50$ 的完整有理代数曲率基做精确格拉姆矩阵核验），当 $n \ge 3$ 时，$R = R_{\mathrm{Scal}} + R_{\mathring{\mathrm{Ric}}} + W$ 两两正交，其中 $R_{\mathrm{Scal}} := R^{(K_*)}$、$K_* := \frac{\mathrm{Scal}}{n(n-1)}$、$(R_{\mathring{\mathrm{Ric}}})_{ijkl} := \frac{1}{n-2}(\mathring{\mathrm{Ric}}_{ik}\delta_{jl} + \delta_{ik}\mathring{\mathrm{Ric}}_{jl} - \mathring{\mathrm{Ric}}_{il}\delta_{jk} - \delta_{il}\mathring{\mathrm{Ric}}_{jk})$，从而对任意截面曲率为 $K \in \mathbb{R}$ 的常曲率比较空间形式（$K > 0$ 为球面、$K = 0$ 为欧氏空间、$K < 0$ 为双曲空间）精确成立

   $$
   \lVert R - R^{(K)}\rVert^2 \;=\; \lVert W\rVert^2 \;+\; \frac{4}{n - 2}\lVert\mathring{\mathrm{Ric}}\rVert^2 \;+\; \frac{2}{n(n - 1)}\bigl(\mathrm{Scal} - n(n - 1)K\bigr)^2 \qquad (n \ge 3),
   $$

   且 $n = 2$ 时退化为 $\lVert R - R^{(K)}\rVert^2 = 4(K_G - K)^2$。因此单只常曲率比较空间形式的唯一弗罗贝尼乌斯最优常曲率为 $K_* = \frac{\mathrm{Scal}}{n(n-1)}$；当 $n \ge 3$ 且 $p$ 点截面曲率非恒定时，不可约各向异性下界 $\lVert W\rVert^2 + \frac{4}{n-2}\lVert\mathring{\mathrm{Ric}}\rVert^2$ 必严格为正。进一步，在黎曼法坐标下有 $g_{ij}(x) - g^{(K)}_{ij}(x) = (J_{ijkl} - J^{(K)}_{ijkl})x^k x^l + O(\lvert x\rvert^3)$，其中对称化二阶度规射流系数为 $J_{ijkl} := -\frac{1}{6}(R_{ikjl} + R_{iljk})$。记 $A_{ijkl} := R_{ikjl}$ 与 $B_{ijkl} := R_{iljk}$：第一比安基恒等式给出 $A - B = R$，而指标置换保持范数 $\lVert A\rVert = \lVert B\rVert = \lVert R\rVert$；代入平行四边形恒等式 $\lVert A + B\rVert^2 + \lVert A - B\rVert^2 = 2\lVert A\rVert^2 + 2\lVert B\rVert^2$ 即得 $\lVert\frac{1}{2}(A + B)\rVert^2 = \frac{3}{4}\lVert R\rVert^2$，从而对曲率差精确成立

   $$
   \lVert J - J^{(K)}\rVert^2 \;=\; \frac{1}{12}\lVert R - R^{(K)}\rVert^2.
   $$

   下表以嘉当结构方程显式隔离出三个正定黎曼算例（记伯杰球拉伸因子 $\lambda > 0$ 与 $a := \lambda^2 > 0$，史瓦西潮汐尺度 $b := \frac{m}{r^3}$，$r > 2m > 0$）：（a）沿霍普夫纤维拉伸的三维伯杰球 $(S^3, g_\lambda)$（$g_\lambda = \lambda^2\sigma_1^2 + \sigma_2^2 + \sigma_3^2$，$d\sigma_1 = -2\sigma_2\wedge\sigma_3$ 循环）直接形变单位三元球 $\mathbb{T}_3 \cong S^3(1)$，其最优常曲率 $K_* = \frac{4 - a}{3}$ 在 $\lambda > 2$ 时转为负值（最优比较空间形式转为双曲空间），最小阻断仅当 $\lambda = 1$ 归零；（b）三维史瓦西空间切片 $g = (1 - \frac{2m}{r})^{-1}dr^2 + r^2(d\theta^2 + \sin^2\theta\,d\phi^2)$ 标量平坦（$\mathrm{Scal} \equiv 0 \implies K_* = 0$，最优比较空间形式退化为平直 $\mathbb{R}^3$）而无迹里奇非零；（c）四维欧氏史瓦西瞬子 $g = (1 - \frac{2m}{r})d\tau^2 + (1 - \frac{2m}{r})^{-1}dr^2 + r^2(d\theta^2 + \sin^2\theta\,d\phi^2)$ 严格正定且里奇平坦（$\mathrm{Ric} \equiv 0 \implies K_* = 0$），留下纯外尔潮汐阻断。

   | 正定黎曼算例 | 字典序标架对截面曲率 | 最优常曲率 $K_*$ | 最小曲率阻断 $\lVert R - R^{(K_*)}\rVert$ | 最小射流阻断 $\lVert J - J^{(K_*)}\rVert$ |
   | :--- | :--- | :---: | :---: | :---: |
   | 三维伯杰球 $(S^3, g_\lambda)$ | $(a,\; a,\; 4 - 3a)$ | $\frac{4 - a}{3}$ | $8\sqrt{\frac{2}{3}}\,\lvert a - 1\rvert$ | $\frac{4\sqrt{2}}{3}\,\lvert a - 1\rvert$ |
   | 三维史瓦西切片 $(r,\theta,\phi)$ | $b(-1,\; -1,\; 2)$ | $0$ | $2\sqrt{6}\,b$ | $\sqrt{2}\,b$ |
   | 四维欧氏史瓦西 $(\tau,r,\theta,\phi)$ | $b(2,\; -1,\; -1,\; -1,\; -1,\; 2)$ | $0$ | $4\sqrt{3}\,b$ | $2\,b$ |

   在外蕴曲面侧，在任意 $C^2$ 曲面 $\Sigma \subset \mathbb{R}^3$ 上，设主曲率满足 $\kappa_1 \ge \kappa_2$（平均曲率 $H := \frac{\kappa_1 + \kappa_2}{2}$、主曲率差 $d := \kappa_1 - \kappa_2 \ge 0$），欧拉公式 $\kappa_n(\theta) = H + \frac{d}{2}\cos(2\theta)$ 表明任一有符号曲率 $k \in \mathbb{R}$ 的相切比较球（$k = 0$ 时退化为切平面）均满足精确一致与均方根缺陷

   $$
   D_\infty(k) := \sup_{\theta \in [0, 2\pi)} \lvert\kappa_n(\theta) - k\rvert = \lvert k - H\rvert + \frac{d}{2} \ge \frac{d}{2}, \qquad D_2(k) := \left(\frac{1}{2\pi}\int_0^{2\pi}\bigl(\kappa_n(\theta) - k\bigr)^2\,d\theta\right)^{1/2} = \sqrt{(H - k)^2 + \frac{d^2}{8}} \ge \frac{d}{2\sqrt{2}}.
   $$

   两类误差同时在 $k = H$ 处唯一取极小值 $D_\infty(H) = \frac{d}{2}$ 与 $D_2(H) = \frac{d}{2\sqrt{2}}$（$H = 0$ 时极小比较面为切平面），该极小缺陷归零当且仅当该点为脐点（$d = 0$），而对一般 $k \in \mathbb{R}$，任一缺陷归零当且仅当同时满足 $d = 0$ 且 $k = H$。落到施瓦茨灯笼的单位圆柱面（$\kappa_1 = 1,\; \kappa_2 = 0$）：若匹配内蕴高斯曲率 $K_G = 0$，则被迫退回平直切板（$k = 0,\; D_\infty(0) = 1$）；若匹配圆截面 $k = 1$，则轴向仍留 $D_\infty(1) = 1$；即便采用最优半径 $R_* = 2$（$k = H = \frac{1}{2}$）的吻合球，仍无法抹除不可约外蕴缺陷 $D_\infty(\frac{1}{2}) = \frac{1}{2}$ 与 $D_2(\frac{1}{2}) = \frac{1}{2\sqrt{2}} \approx 0.3536$。

2. **四元凯莱幂和托普利茨矩阵 $\mathbf{T}_N(\mathcal{U}(\delta, \gamma))$ 的精确中心对称闭式谱、惯性 $(2, 2, N - 3)$ 与双标度律（四元模型无条件，不依赖 RH）**：
   对任意 $\gamma > 0$ 与 $0 \le \delta < \frac{1}{2}$，记 $A := \gamma^2 + \delta^2 + \frac{1}{4}$；将 $u_\pm = 1 - (\frac{1}{2} \mp \delta + i\gamma)^{-1} = \frac{(A - \frac{1}{2}) + i\gamma}{A \mp \delta}$ 分母有理化后，分子具有完全相同的实部与虚部 $(A - \frac{1}{2},\; \gamma)$，故外像 $u_+$ 与内像 $u_-$ 共享精确同一辐角 $\theta(\delta, \gamma) = \operatorname{Arg}((A - \frac{1}{2}) + i\gamma) \in (0, \pi)$，而对数模长互为相反数 $\pm\alpha(\delta, \gamma)$，其中 $\alpha(\delta, \gamma) := \ln\lvert u_+\rvert = \operatorname{artanh}(\frac{\delta}{A}) \ge 0$，即 $u_\pm = e^{\pm\alpha + i\theta}$。将 $\mathcal{U}(\delta, \gamma) := (u_+, u_-, \overline{u_+}, \overline{u_-})$ 视作按指标计重的四元族（在 $\delta = 0$ 处每个单位圆根保留重数 $2$，而非去重为两元集合以免幂和减半），其幂和矩阵 $\mathbf{T}_N = [4\cosh((j - k)\alpha)\cos((j - k)\theta)]_{0 \le j,k \le N}$ 为实对称中心对称托普利茨矩阵（与反转对合 $P_N$ 对易）。设范德蒙德矩阵 $V := [v(u_+),\; v(u_-),\; v(\overline{u_+}),\; v(\overline{u_-})] \in \mathbb{C}^{(N+1)\times 4}$（$v(z)_j = z^j$）及双对换符号阵 $J_4 := \operatorname{diag}(\sigma_x, \sigma_x)$（特征值 $+1, +1, -1, -1$），则精确成立 $\mathbf{T}_N = V J_4 V^*$：当 $\delta = 0$ 时，$u_+ = u_- = e^{i\theta_0} \neq e^{-i\theta_0}$，故对一切 $N \ge 1$ 秩恒为 $2$、惯性为 $(2, 0, N - 1)$；当 $0 < \delta < \frac{1}{2}$ 且 $N \ge 3$ 时，四像两两互异，故 $\operatorname{rank}(V) = 4$，由西尔维斯特惯性定理直接锁死**精确惯性 $(n_+, n_-, n_0) = (2, 2, N - 3)$**。

   进一步，令 $L := N + 1$、中心指标 $m := j - \frac{N}{2}$，利用 $\cosh(\alpha(m - m'))\cos(\theta(m - m'))$ 的和差展开，将 $\mathbf{T}_N$ 正交分解为 $P_N$-偶（$\sigma = +1$）与 $P_N$-奇（$\sigma = -1$）两块秩至多为 $2$ 的实对称块 $4(u_\sigma u_\sigma^\top - w_\sigma w_\sigma^\top)$，其中 $u_{\mathrm{e}}(m) = \cosh(\alpha m)\cos(\theta m)$、$w_{\mathrm{e}}(m) = \sinh(\alpha m)\sin(\theta m)$、$u_{\mathrm{o}}(m) = \cosh(\alpha m)\sin(\theta m)$、$w_{\mathrm{o}}(m) = \sinh(\alpha m)\cos(\theta m)$。定义基本双曲—三角几何和 $S_h := \frac{\sinh(L\alpha)}{\sinh\alpha}$（$\alpha = 0$ 时取 $L$）、$S_c := \frac{\sin(L\theta)}{\sin\theta}$ 与 $C + iS := \frac{\sinh(L(\alpha + i\theta))}{\sinh(\alpha + i\theta)}$，两块 $2\times 2$ 约化矩阵立即给出全部四个非零特征值的**精确闭式公式**（对一切 $N \ge 3$ 与 $0 < \delta < \frac{1}{2}$）：

   $$
   \lambda_{\sigma, \pm}(N; \delta, \gamma) \;=\; (L + \sigma C) \;\pm\; \sqrt{(S_h + \sigma S_c)^2 - S^2} \qquad (\sigma \in \{+1, -1\}),
   $$

   且在 $\delta = 0$ 处精确退化为两个正特征值 $\lambda_{\sigma, +} = 2(L + \sigma S_c) > 0$ 与 $\lambda_{\sigma, -} = 0$。上述公式同时澄清了低阶门槛、渐近标度与全谱病态性三项细节：

   - **低阶门槛与一般四像定理的锐性**：记 $t_d := 4\cosh(d\alpha)\cos(d\theta)$。在 $(\gamma_1, \delta = 0.25)$ 上，$2\times 2$ 阵 $\mathbf{T}_1$ 仍严格正定（$\lambda_{\min}(\mathbf{T}_1) = 4 - \lvert t_1\rvert \approx 0.0099886 > 0$）；而对一切离圆凯莱四元组（$0 < \delta < \frac{1}{2},\; \gamma > 0$），在 $N = 2$（$3\times 3$ 阵）处偶扇区向量 $u_{\mathrm{e}}, w_{\mathrm{e}} \in \mathbb{R}^3$ 已因中心分量 $u_{\mathrm{e}}(0) = 1$、$w_{\mathrm{e}}(0) = 0$ 与非零外端分量 $w_{\mathrm{e}}(\pm 1) = \sinh\alpha\sin\theta \neq 0$ 而线性无关，迫使偶扇区当场出现严格负特征值 $\lambda_{\mathrm{e}, -}(\mathbf{T}_2) = 4 + \frac{1}{2}(t_2 - \sqrt{t_2^2 + 8t_1^2}) < 0$（在 $(\gamma_1, 0.25)$ 处为 $\approx -2.0838\times 10^{-8}$），同时奇扇区单特征值为 $\lambda_{\mathrm{o}}(\mathbf{T}_2) = 4 - t_2$（当小 $\gamma$ 满足 $t_2 > 4$ 时可已转负），而 $N = 3$ 则是对一切 $(\delta, \gamma)$ **一致保证**双负模式（惯性 $(2, 2, 0)$）的最低阶数。不过对冻结定理 `toeplitz_posSemidef_iff_norm_eq_one` 面向的**一般**四互异倒共轭族，一致门槛 $N \ge 3$（$N + 1 \ge 4$）依然严格锐利：例如离圆倒共轭四元组 $\{2, \frac{1}{2}, i, -i\}$ 满足 $\mathbf{T}_2 \succ 0$，其三个精确特征值为 $\frac{41 - \sqrt{881}}{8} \approx 1.4148$、$\frac{7}{4}$ 与 $\frac{41 + \sqrt{881}}{8}$。
   - **弱漂移三次标度区与指数失控区**：固定 $N \ge 3$ 与内点辐角 $\theta \in (0, \pi)$ 令 $\alpha \to 0^+$，有 $\lambda_{\sigma, -} = -c_\sigma(N, \theta)\alpha^2 + O(\alpha^4)$，其中 $c_\sigma = 4\bigl(\lVert z_\sigma\rVert^2 - \frac{\langle u_\sigma(0), z_\sigma\rangle^2}{\lVert u_\sigma(0)\rVert^2}\bigr)$（$u_\sigma(0)$ 表示 $\alpha = 0$ 处的 $u_\sigma$，$z_{\mathrm{e}} = m\sin(\theta m)$、$z_{\mathrm{o}} = m\cos(\theta m)$）且随阶数满足 $c_\sigma = \frac{1}{6}N^3 + O_\theta(N^2)$。因而在弱漂移窗口 $(\sin\theta)^{-1} \ll N \ll \alpha^{-1}$ 内成立 $-\lambda_{\min}(\mathbf{T}_N) \sim \frac{1}{6}\alpha^2 N^3$（小 $\delta$ 时 $\alpha \sim \frac{\delta}{\gamma^2 + 1/4}$，故 $-\lambda_{\min} \sim \frac{\delta^2 N^3}{6(\gamma^2 + 1/4)^2}$）——令负模式在该窗口内达到 $\Theta(1)$ 量级需 $N \asymp \alpha^{-2/3} \sim \bigl((\gamma^2 + \frac{1}{4})/\delta\bigr)^{2/3}$（大 $\gamma$ 下简化为 $(\gamma^2/\delta)^{2/3}$；在 $\gamma_1,\; \delta = 10^{-3}$ 下，比值 $-\lambda_{\min}/(\frac{1}{6}\alpha^2 N^3)$ 沿 $N = 200, 500, 1000, 2000$ 依次舍入为 $1.2240, 1.0733, 1.0452, 1.0045$）；而在 $N = 95,\; \gamma_1$ 处，$\lambda_{\min}(\mathbf{T}_{95})$ 在 $\delta = 0.25$ 与 $0.40$ 下均落于奇扇区（$\sigma = -1$），认证值分别舍入为 $-0.29317011$ 与 $-0.75017762$，精确印证 [@ex-ch39-riemann-polishing-quantitative-audit]。跨入大阶指数失控区 $N\alpha \gg 1$（门槛 $N_{\mathrm{exp}} := \alpha^{-1} \sim \frac{\gamma^2 + 1/4}{\delta}$，在 $(\gamma_1, 0.25)$ 处为 $\approx 800.41$），记 $\phi := \operatorname{Arg}\sinh(\alpha + i\theta)$、$\psi_N := L\theta - \phi$、$k := \frac{\sinh\alpha}{\sqrt{\sinh^2\alpha + \sin^2\theta}} \in (0, 1)$ 与 $H_N := \frac{e^{L\alpha}}{2\sinh\alpha}$，精确闭式导出

     $$
     -\frac{\lambda_{\sigma, -}}{H_N} \;=\; \sqrt{1 - k^2\sin^2\psi_N} \;-\; \sigma k\cos\psi_N \;+\; O_{\alpha,\theta}\bigl(L e^{-L\alpha}\bigr),
     $$

     主振幅严格落于 $[1 - k, 1 + k]$（在 $(\gamma_1, 0.25)$ 上，偶/奇扇区精确值与主项之比在 $N = 2048$ 时舍入为 $0.5965, 0.5998$，在 $N = 4096$ 时舍入为 $0.9382, 0.9392$，此时 $\lambda_{\min}(\mathbf{T}_{4096}) \approx -63461.72$）。
   - **与全谱规范 Li 曲率托普利茨病态性的结构分野**：本节孤立四像模型在 $\delta = 0$（$N \ge 1$）时秩恒为 $2$、在 $\delta > 0$（$N \ge 3$）时惯性恒为 $(2, 2, N - 3)$；与之相对，[§31.3](ch34-s31-arc-calculus-riemann-and-hermite-biehler.md#rem-ch34-li-toeplitz-superexponential-collapse) [@rem-ch34-li-toeplitz-superexponential-collapse] 证明的真全谱 Li 托普利茨矩阵 $T_N(c^{\mathrm{Li}})$ 因承载凯莱像向 $u = 1$ 聚拢的无穷多颗临界线零点，在 RH 下虽对一切 $N \ge 1$ 严格正定，却承受超指数舒尔主元坍缩 $\ln\lambda_{\min}(T_{N+1}) \le \ln\pi_N \le -2N\ln N + 2N\ln\ln N + O(N)$（如 $\pi_{100} \approx 4.45\times 10^{-406}$、$\lambda_{\min}(T_{101}) \approx 4.96\times 10^{-465}$）。可见有限四像矩阵精确示范了 `toeplitz_posSemidef_iff_norm_eq_one` 的半正定/破缺符号判据，而并不等同于全谱算术矩阵的数值条件数行为。

3. **字符帕塞瓦尔径向—方向分解、实二次特征傅里叶投射与 $X^{1/2}$ / $X^{1/3}$ 素数幂偏置（无条件恒等式 + 外部狄利克雷 GRH，无需 LI）**：
   设模 $q \ge 3$、$G := (\mathbb{Z}/q\mathbb{Z})^\times$、$\varphi := \varphi(q)$。对任一余数类计数函数 $F_a = F(X; q, a)$、其字符变换 $\widehat{F}(\chi) := \sum_{a \in G} F_a \overline{\chi(a)}$ 与公共径向基准 $M(X)$（对 $\theta, \psi$ 取 $X$，对 $\pi$ 取 $\operatorname{Li}(X) := \operatorname{li}(X) - \operatorname{li}(2)$），字符正交性无条件给出勾股能量分解

   $$
   E_{\mathrm{tot}}^F(X) := \sum_{a \in G}\left(F_a - \frac{M(X)}{\varphi}\right)^2 \;=\; \underbrace{\frac{1}{\varphi}\bigl\lvert\widehat{F}(\chi_0) - M(X)\bigr\rvert^2}_{E_{\mathrm{rad}}^F(X)} \;+\; \underbrace{\frac{1}{\varphi}\sum_{\chi \neq \chi_0}\bigl\lvert\widehat{F}(\chi)\bigr\rvert^2}_{E_{\mathrm{dir}}^F(X)}.
   $$

   对上述素数计数函数 $F \in \{\theta, \psi, \pi\}$ 及其对应径向基准 $M(X)$，径向项 $E_{\mathrm{rad}}^F$ 由经典 RH（除有限个 $p \mid q$ 外）支配，而方向各向异性项 $E_{\mathrm{dir}}^F$ 直接由非主特征的狄利克雷 GRH（`DirichletLZerosOnLine`，[@conj-riemann-hypothesis]）支配：对 $F = \psi$ 给出对 $q \le X$ 一致成立的方向能量界 $E_{\mathrm{dir}}^\psi(X) = O(X\ln^4(qX))$（帕塞瓦尔公式对 $\varphi - 1$ 条非主特征求和再除以 $\varphi$，给出因子 $\frac{\varphi - 1}{\varphi} < 1$）。

   然而，一旦从宏观相对尺度 $O(X^{-1/2}\ln(qX))$ 下潜至精细平方根尺度 $\sqrt{X}$，素数与素数幂之间的确定性偏置立即显形。定义黎曼素数幂计数函数 $\Pi(X; q, a) := \sum_{p^k \le X,\, p^k \equiv a \pmod q} \frac{1}{k}$ 与 $k$ 次剩余根重数 $c_k(q; a) := \#\{b \in G : b^k \equiv a \pmod q\}$（$k = 2, 3$）。拆出素数平方（$k = 2$）、素数立方（$k = 3$）与 $k \ge 4$ 高次幂后，虽说首项极限 $c_2(q; a)/\varphi$ 本身已由算术级数素数定理无条件成立，但外部狄利克雷 GRH（固定 $q$，经 Davenport 第 20 章）不仅将素数幂零点涨落 $(\psi(X; q, a) - X/\varphi)/\sqrt{X}$ 锁在 $O(\ln^2(qX))$ 量级，而且将两项展开后的剩余误差同时收紧至显式幂律速率（其中 $\Pi - \pi$ 归一化因 $\operatorname{Li}(\sqrt{X})$ 在 $X = 4$ 处为零而取域 $X \ge 8$；同时揭示：只要 $c_3(q; a) > 0$，忽略 $k = 3$ 立方项会留下 $\Theta_q(X^{-1/6})$ 误差，远大于 GRH 的 $O_q(X^{-1/4}\ln^2 X)$ 级波动）：

   $$
   R_3^{\psi-\theta}(X; q, a) := \frac{\psi(X; q, a) - \theta(X; q, a)}{\sqrt{X}} - \frac{c_2(q; a)}{\varphi} - \frac{c_3(q; a)}{\varphi} X^{-1/6} \;=\; O_q\!\bigl(X^{-1/4}\ln^2 X\bigr) \qquad (X \ge 2),
   $$

   $$
   R_3^{\Pi-\pi}(X; q, a) := \frac{\Pi(X; q, a) - \pi(X; q, a)}{\operatorname{Li}(\sqrt{X})/2} - \frac{c_2(q; a)}{\varphi} - \frac{c_3(q; a)}{\varphi}\cdot\frac{2\,\operatorname{Li}(X^{1/3})}{3\,\operatorname{Li}(\sqrt{X})} \;=\; O_q\!\bigl(X^{-1/4}\ln^2 X\bigr) \qquad (X \ge 8).
   $$

   当 $3 \nmid \varphi(q)$（如 $q \in \{3, 4, 5, 8, 12\}$）时，立方映射置换 $G$ 故 $c_3(q; a) \equiv 1$，从而任意二次剩余与非剩余通道相减时 $X^{-1/6}$ 项精确抵消；反之对本节所选 $q = 7$（$\varphi(7) = 6$），二次剩余 $\{1, 2, 4\}$ 具 $c_2 = 2$（非剩余 $\{3, 5, 6\}$ 为 $0$），而立方剩余 $\{1, 6\}$ 具 $c_3 = 3$（其余四类为 $0$），在 $X = \lfloor e^{14}\rfloor = 1{,}202{,}604$ 处产生肉眼可见的 $\frac{3}{6}X^{-1/6} \approx 0.048486$ 立方劈裂（见下表）。更进一步，经 $a = b^2$ 重排求和，无条件成立特征傅里叶恒等式

   $$
   \widehat{c_2}(\chi) := \sum_{a \in G}\overline{\chi(a)}\, c_2(q; a) \;=\; \sum_{b \in G}\overline{\chi^2(b)} \;=\; \varphi\,\mathbf{1}_{\chi^2 = \chi_0}.
   $$

   由此确定性平方根偏置 $-\frac{c_2(q; a)}{\varphi}\sqrt{X}$ 百分之百局域在主特征 $\chi_0$ 与全部 $r_2(q) := \#\{\chi \neq \chi_0 : \chi^2 = \chi_0\} = c_2(q; 1) - 1$ 条非主实二次特征所张子空间内（在一切复特征 $\chi^2 \neq \chi_0$ 上恒为零），自带精确方向偏置能量基线 $\frac{r_2(q)}{\varphi(q)} X$（对 $q = 3, 4, 5, 7$ 有 $r_2 = 1$；对 $q = 8, 12$ 有 $r_2 = 3$）。这同时刻画了最锐利的认识论边界：外部狄利克雷 GRH **无需任何零点线性无关假设**即可锁死宏观 $O(X^{-1/2}\ln(qX))$ 各向同性以及在 $\sqrt{X}$ 尺度上二次剩余相对素数幂通道的确定性偏移 $-\frac{c_2(q; a)}{\varphi}$；相比之下，切比雪夫素数竞赛中诸如 $3 \pmod 4$ 领先 $1 \pmod 4$ 的精确对数密度偏置取值（`文献结果`，见 M. Rubinstein & P. Sarnak, *Exp. Math.* **3**, 173–197, 1994, [DOI 10.1080/10586458.1994.10504289](https://api.crossref.org/works/10.1080/10586458.1994.10504289); A. Granville & G. Martin, *Amer. Math. Monthly* **113**, 1–33, 2006, [arXiv:math/0408319](https://arxiv.org/abs/math/0408319)）仍以尚未证明的相关原初狄利克雷 $L$ 函数非负零点纵坐标（按重数计，含中心点不消失）在 $\mathbb{Q}$ 上的**线性无关假设（LI）**为条件，严格保持 **`OPEN`**。

4. **256/320 位 FLINT/Arb 双精度区间认证与可复现归档（`NUM`）**：
   上述三组结论对应的有限代数核验与数值算例均以 `python-flint 0.9.0`（FLINT/Arb 3.6.0）在 256 位与 320 位两档工作精度下独立重放：合计 **316** 条精确记录（曲率套件 9 条，含 $n = 2, 3, 4, 5$ 曲率格拉姆恒等式与嘉当算例；四元凯莱托普利茨套件 59 条；素数通道套件 248 条，含特征表、剩余根重数与有理素数幂计数）两档完全一致；全部 **6,503** 组区间球对（曲率套件 470 组、四元凯莱托普利茨套件 1,454 组、素数通道与显式公式套件 4,579 组，其中包括 88 组球对，来自全部 22 条跨越 $q \in \{3, 4, 5, 7, 8, 12\}$ 的特征 $\widehat{c_2}(\chi)$ 傅里叶核验，每条特征 4 组：系数实部/虚部及其包络零的残差实部/虚部）全部重叠且每一只 320 位球均包含于对应 256 位球内（其中 5,646 组严格收窄）。该套件同步复核了 [@ex-ch39-riemann-polishing-quantitative-audit] 中的十二面体/施瓦茨灯笼几何基准、四元托普利茨特征值与模 $7$ 素数通道基准：在 $q = 7,\; X = e^{10}$ 处六类素数计数为 $(407, 405, 413, 415, 412, 413)$，最大相对份额偏离精确等于 $\frac{700}{493}\% \approx 1.419878\%$（舍入为 $1.42\%$），归一化通道误差在 $\operatorname{Li}$ 约定下舍入为 $0.0004630$、在 $\operatorname{li}$ 约定下舍入为 $0.0004709$（均进一步舍入为 $0.0005$）；在 $y = 7$ 处，24 对零点谱和、筛端、有符号差值与尾界的认证区间分别四舍五入为 $-0.094435$、$-0.114481$、$+0.020046$ 与 $0.434601$（其中尾界认证上端点低于 $0.434602$）。下表列出 $q = 7,\; y = 14$（$X = 1{,}202{,}604$；在 $a \in \{1, 6\}$ 处 $\psi - \theta$ 立方偏置项舍入为 $0.048486$、$\Pi - \pi$ 立方偏置项舍入为 $0.053291$，其余四类均为 $0$）扣除立方项前后的认证残差：

   | 余数类 $a \pmod 7$ | $c_2(7; a)$ | $c_3(7; a)$ | 仅扣平方残差 $\frac{\psi - \theta}{\sqrt{X}} - \frac{c_2}{6}$ | 两项残差 $R_3^{\psi-\theta}$ | 两项残差 $R_3^{\Pi-\pi}$ |
   | :---: | :---: | :---: | :---: | :---: | :---: |
   | $1$ | $2$ | $3$ | $+0.046748$ | $-0.001738$ | $-0.011391$ |
   | $2$ | $2$ | $0$ | $-0.003742$ | $-0.003742$ | $+0.000175$ |
   | $3$ | $0$ | $0$ | $+0.002469$ | $+0.002469$ | $+0.003600$ |
   | $4$ | $2$ | $0$ | $-0.005671$ | $-0.005671$ | $+0.000818$ |
   | $5$ | $0$ | $0$ | $+0.003471$ | $+0.003471$ | $+0.004555$ |
   | $6$ | $0$ | $3$ | $+0.055554$ | $+0.007068$ | $+0.005981$ |

   完整复现脚本、双精度证书表、分析报告与清单归档于不可变公开 Gist 修订 [`f932fcd015412f8e14fd39fa0ed174b7a5e04f00`](https://gist.github.com/loning/518f40cb465e7e1e4e91915e9d92ef11/f932fcd015412f8e14fd39fa0ed174b7a5e04f00)（固定原始校验清单 [`SHA256SUMS`](https://gist.githubusercontent.com/loning/518f40cb465e7e1e4e91915e9d92ef11/raw/f932fcd015412f8e14fd39fa0ed174b7a5e04f00/SHA256SUMS)，其自身 SHA-256 为 `b7a3b56c05413e9d06cb7a0474ee46e39a6b5fe98f149ead9fa21f6ee691b6f4`；独立核验记录见 [Issue #1050 评论](https://github.com/the-omega-institute/trureturing-books/issues/1050#issuecomment-7092135313)）。
:::

---

**1854 年黎曼问空间凭什么光滑，1859 年黎曼写下 `1/2` 线上的素数星群——一百六十七年后，星群归位成圆，切板化作浑球！**

在下面的完整实验室中，先把第一卡停在施瓦茨灯笼上亲眼看看一阶平直切板如何在无限逼近柱面时炸出五倍伪面积，再推起 `β : 0 → 1` 换上二阶三元吻合球，随后在第三卡与第四卡之间拨动 `δ = 0` 与反事实 `δ = 0.25` 观察青色单位圆上的凯莱像如何守住托普利茨半正定谱胶、而一丝一毫的离轴偏移又如何当场刺出品红棱角，最后在第五卡把 `ln X` 推向 `10` 目送整只流形在全部余数通道上退火成无瑕紫晶圆球：完成 1854 流形几何与 1859 临界谱的合龙之后，让我们在下一节 **[§31.7 素数硬件寄存器与黎曼零点全局驻波对偶](ch31-s07-prime-register-riemann-zero-duality-and-dual-uniformity.md)** 继续追问——既然素数是局部正交寄存器，全居临界线 $\operatorname{Re}(s) = \frac{1}{2}$ 的黎曼零点究竟承担何种物理算术角色，而素数与零点又分别在哪把本征标尺上实现严格均匀？

::: {.viz src="riemann-spectral-manifold-polishing-sandbox" height="620"}
完整实验室：在“1854 + 1859 合龙 · σ = 1/2 谱圆弧磨光（MODEL）”与“1854 切板与反事实离轴对照 · T_pM 折痕 / δ ≠ 0 失稳”双透镜间切换（窄屏与章节嵌入视图亦可在巡览条旁一键切换透镜），依次巡览 1854 切板与施瓦茨灯笼折痕、二阶吻合球换底、$\sigma = 1/2$ 托普利茨谱胶合、反事实离轴裂像与棱角失稳以及合龙磨光各向同性流形五张实验卡，拖动舞台琥珀手柄或调节吻合球换底参数 $\beta \in [0, 1]$、谱磨光模数 $K \in [0, 24]$ 与反事实离轴偏移 $\delta = \sigma - \frac{1}{2} \in [0, 0.40]$（含一键归位已证真值 `σ = 1/2 (δ = 0)` 按钮），并在底部两条对照小图中同步观察第一图沿 $\ln X \in [1, 10]$ 退火的青色 $X^{-1/2}$ 与 $X^{-1/2}(1 + 0.15\ln^2 X)$ 对比品红迟滞线 $X^{\delta - 1/2}$，以及第二图幂和托普利茨最小特征值 $\lambda_{\min}$ 仅在 $\delta = 0$ 处守住 $0$（青点）而在 $\delta > 0$ 时严格跌负（品红曲线）。十五条冻结 `LEAN ✓` 声明、`ARGUED` 外部已核验黎曼证明与经典文献、`OPEN` 未决问题、`MODEL` 双璧合龙读法及 `NUM` 实算在依据栏与理论抽屉中分层列出。
:::
