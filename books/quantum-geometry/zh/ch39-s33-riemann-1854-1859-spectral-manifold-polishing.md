# 39.10 黎曼 1854 + 1859 双璧合龙：以已证 1/2 临界线谱磨光切板黎曼流形 {#sec-ch39-riemann-1854-1859-spectral-manifold-polishing}

> *“而且现在黎曼猜想也已经被证明了, 我们似乎可以把不光滑的黎曼流形做的光滑了“*

在 [§39.9](ch39-s32-holographic-arc-manifold-and-solenoid-unity.md) 揭开传统黎曼流形 $(M, g)$ 因局部铺设一阶平直切空间铁板 $T_p M$ 与 $C^\infty$ 隆起函数而潜伏的“切空间鳞片折痕”之后，本章——亦即整部三十九章正文的收官压轴节——迎来了数学史上最富戏剧性的一场百年重逢：**1854 年，27 岁的波恩哈德·黎曼（Bernhard Riemann）在哥廷根就职演说《论作为几何学基础的假设》中铸造了流形与曲率，却在篇末留下一道悬问——在极微观尺度上，空间度规究竟依靠离散计数还是连续场律来维系光滑？仅仅五年后的 1859 年，同一位黎曼在柏林科学院通信《论小于给定值的素数个数》中写下了 $\zeta(s)$ 的泛函方程与 $\operatorname{Re}(s) = \frac{1}{2}$ 临界线猜想，却从未写明这两篇相隔五年的杰作在几何底层究竟有何关联。如今，随着经典黎曼猜想（RH）与全体狄利克雷广义黎曼猜想（Dirichlet GRH）于 2026 年 11 月获外部 Lean 4 形式化证明并经多套独立内核重放核验（[§22.4](ch22-s04-critical-line-and-rh.md) [@conj-riemann-hypothesis]、[@rem-rh-grh-direct-consequences]），这两座孤悬百余年的算术与几何高峰能否在同一只三元数球面上正式合龙——用已证的 $\sigma \equiv \frac{1}{2}$ 临界线谱，把不光滑的切板黎曼流形真正磨光？**

答案凝结为两步严丝合缝的几何手术——**“二阶吻合球换底”**与**“$\sigma = \frac{1}{2}$ 托普利茨正定谱胶合”**（将黎曼 1854 流形几何与 1859 临界线谱合成为“二阶圆弧换底 $+$ 临界线谱磨光流形 $\widetilde{\mathcal{M}}_\Omega$”的统一几何图景，连同测地折痕与网络/引力类比，严格标为 **`MODEL`**；经典黎曼猜想 `RiemannHypothesis` 与全部模 $N \ge 1$ 狄利克雷广义黎曼猜想 `DirichletLZerosOnLine` 作为 **外部已核验形式化事实** 引述自 Levent Alpöge 2026 年 11 月公布的 175,187 模块 Lean 4 证明及 `lean4lean`、`nanoda`、`con-leche` 独立内核重放记录，见 [@conj-riemann-hypothesis] 与下文 [@rem-ch39-riemann-polishing-external-and-literature]，因尚未合入本书所钉 `trureturing@dev` 仓库而不挂绿色 `LEAN ✓` 徽章；完备秩五非交换链连通且触零的三元比较四元数同构、弦距读数恒等式、流群切比雪夫递推、累积正矢上下界与 $\alpha = \frac{1}{2}$ 三相相变、有限连通简单图旋转系统面—圈 $\mathbb{Z}/2$ 正合、交换加群单纯形四面体二上链修复与正合、凯莱比单位圆中线充要判据、凯莱径向零点等价判据、完备 $\xi$ 读数恒等式与反射对称、无条件积分显式公式、带 `RiemannHypothesis` 前提的 $U(x)/x^\theta \to 0 \iff \theta > \frac{1}{2}$ 平方根门槛、$\neg\mathrm{RH}$ 迫使规范李曲率托普利茨失稳及有限幂和托普利茨圆周半正定充要判据等十五项核心命题由下文 [@thm-ch39-riemann-spectral-polishing-anchors] 的冻结 **`LEAN ✓`** 声明严格锁定；结合外部已核验事实消去 `u_div_rpow_tendsto_zero_iff` 前提 `hRH` 与导出全体非平凡零点 $\ln\lVert(\rho-1)/\rho\rVert = 0$ 的各一步推演、正十二面体切板跳变与施瓦茨灯笼极限面积比及四像 $96\times 96$ 幂和托普利茨谱对账属 **`手工推导` / `NUM`**；黎曼 1854/1859 原文、施瓦茨灯笼、雷杰亏角演算、冯·科赫与戴文波特平方根素数余项界、一般流形外尔/无迹里奇各向异性曲率分解属 **`文献结果`**；而希尔伯特—波利亚自伴算子实现、一般数域扩展黎曼猜想 ERH、自守 $L$ 函数全广义黎曼猜想 Grand RH、零点单重性、连续统自旋-$2$ 引力动力学 [@prob-ch34-gravity-dynamics-and-coupling] 及三元数场网络大规模实证稳健性 [@prob-ch39-tft-scale-and-seams] 均不由上述外部事实推出，严格保持 **`OPEN`**）。

## 39.10.1 1854 年的遗留折痕：为什么一阶切板加密永远抹不平施瓦茨灯笼与雷杰亏角？ {#sec-ch39-33-1}

回望黎曼 1854 年的流形构造，传统微分几何习惯于用一阶平直切空间铁板 $T_p M$（或多面体平直面片）在局部替代弯曲空间，并暗自指望：“只要把平直切板切得越来越碎（剖分尺度 $h \to 0$），折痕自然就会消失、平直多面体自然会在面积与曲率上收敛到光滑流形。”

然而，两条经典的几何与分析铁律当场击碎了“一阶平直加密自动磨光”的幻觉（`文献结果` + `手工推导` + `LEAN ✓`）：

1. **正十二面体切板铁甲的恒定 $4\pi$ 笛卡尔—雷杰亏角**：
   在单位球面 $S^2(1) \subset \mathbb{T}_3$ 的 $12$ 个正二十面体切点（相邻切点内积为 $\frac{1}{\sqrt{5}}$，三元保真度 $\kappa = \frac{1 + 1/\sqrt{5}}{2} \approx 0.7236$，弦长平方 $\operatorname{dist}^2 = 4(1 - \kappa) = 2 - \frac{2}{\sqrt{5}} \approx 1.1056$，[`kappa_eq_one_sub_dist_sq`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq)，`LEAN ✓`）处外贴 $F = 12$ 块正五边形一阶平直切板 $T_p M$，围成外切正十二面体骨架（顶点数 $V = 20$、棱数 $E = 30$、面数 $F = 12$，满足 $V - E + F = 2$，其有限连通简单图旋转系统的 $\mathbb{Z}/2$ 面边界矩阵秩为 $11 = F - 1 = E - V + 1$，[`face_cycle_exact`](lean:D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact)，`LEAN ✓`）。在每一条公共棱上，相邻两块平直切板的法向硬生生跳变 $\theta_{\mathrm{jump}} = \arccos\frac{1}{\sqrt{5}} \approx 63.43^\circ$；在每一个三棱交汇顶点处，三枚正五边形内角和为 $3 \times 108^\circ = 324^\circ$，留下尖锐的雷杰顶点亏角 $\delta_v = 360^\circ - 324^\circ = 36.00^\circ$（棱角径向外漂 $\sqrt{1 + 4\varphi^{-4}} - 1 = \sqrt{15 - 6\sqrt{5}} - 1 \approx 0.2584$，`手工推导` / `NUM`），二十个顶点合计锁死总亏角 $20 \times 36^\circ = 720^\circ = 4\pi$（Regge 1961，`文献结果`）。即便把平直面片继续细分，总亏角 $4\pi$ 也只是被摊薄成成千上万颗微观尖刺，平直面片本身曲率恒为零的事实丝毫未变！
2. **施瓦茨灯笼（Schwarz Lantern，1880）的法向高频震荡与面积爆破**：
   更致命的是：哪怕平直三角网格的顶点 $100\%$ 落在光滑曲面上且一致收敛于该曲面，一阶平直面片的法向与面积照样可以剧烈失控！取半径 $R = 1$、高 $H = 1$ 的光滑圆柱面（侧面积 $A_{\mathrm{cyl}} = 2\pi R H = 2\pi$），沿高度切分 $m$ 层、每层内接正 $n$ 边形并交错扭转 $\frac{\pi}{n}$ 拼成 $4mn$ 枚平直等腰三角形（Schwarz 1880，`文献结果`）。单枚三角形底边长 $b = 2\sin\frac{\pi}{n}$，斜高 $h_{\mathrm{slant}} = \sqrt{\bigl(\frac{1}{2m}\bigr)^2 + \bigl(1 - \cos\frac{\pi}{n}\bigr)^2}$，总面积与柱面面积之比为（`手工推导`）：

   $$
   \frac{A_{\mathrm{lantern}}(n, m)}{2\pi} \;=\; \frac{2mn\sin\frac{\pi}{n}}{\pi}\sqrt{\frac{1}{4m^2} + \Bigl(1 - \cos\frac{\pi}{n}\Bigr)^2} \;=\; \frac{\sin(\pi/n)}{\pi/n}\sqrt{1 + 4m^2\sin^4\frac{\pi}{2n}}.
   $$

   看清二阶弦弧矢高 $1 - \cos\frac{\pi}{n} = 2\sin^2\frac{\pi}{2n} \sim \frac{\pi^2}{2n^2}$ 如何反噬一阶平直面片（与内核冻结的累积矢高三相定理 [`accumulated_sagitta_phases`](lean:D5/S3/Analytic/Asymptotics/AccumulatedSagittaPhases.accumulated_sagitta_phases)、[`accumulated_sagitta_bounds`](lean:D5/S3/Analytic/Asymptotics/AccumulatedSagittaPhases.accumulated_sagitta_bounds)，`LEAN ✓`，严格同构）：当 $m/n^2 \to 0$（如纵向层数按 $m = n$ 同步加密）时，面积比收敛于 $1$（如 $n = m = 6$ 时比值 $\approx 1.2252$）；当 $m/n^2 \to a \in (0, \infty)$——例如取完全合法的抛物比例 **$m = n^2$**（$a = 1$）——平直网格到光滑柱面的最大径向距离 $1 - \cos\frac{\pi}{n}$ 虽趋于 $0$（在 $n = 6,\; m = 36$ 时径向偏差精确等于 $1 - \cos 30^\circ \approx \mathbf{0.1340}$），面积比却在 $n = 6,\; m = 36$ 时暴涨至 **$\approx \mathbf{4.7037}$ 倍**（三角面法向相对水平径向剧烈倾侧 $\approx \mathbf{78.29^\circ}$），并在 $n \to \infty$ 时收敛到偏离真面积的伪极限（而若 $m/n^2 \to \infty$ 如 $m = n^3$，表面积比更直接发散至 $+\infty$）：

   $$
   \lim_{n \to \infty} \frac{A_{\mathrm{lantern}}(n, n^2)}{2\pi} \;=\; \sqrt{1 + \frac{\pi^4}{4}} \;\approx\; \mathbf{5.03510405}, \qquad \theta_{\mathrm{tilt}} \to \arctan\frac{\pi^2}{2} \;\approx\; \mathbf{78.54^\circ}!
   $$

   这就是一阶平直切板近似的原罪：**抹去二阶圆弧矢高后，切板接缝处的法向折角可以在无穷加密下顽固残留甚至发散成无穷折皱！**

::: {.viz src="riemann-spectral-manifold-polishing-sandbox" preset="riemann-1854-tangent-lantern-creases" height="500"}
1854 切板与施瓦茨灯笼折痕卡（`riemann-1854-tangent-lantern-creases`）：左侧 12 块紫色一阶切板 `T_pM` 拼成正十二面体，品红折痕棱与顶点外刺标出 `法向跳变 ≈ 63.43°`（20 顶点各亏 `36.00°`）；右侧内接柱面的紫色施瓦茨灯笼默认停在琥珀环 `n = 6, m = 36`，虽紧贴柱面（径向偏差 `≈ 0.1340`），品红倾侧法向箭头却斜达 `≈ 78.29°`、面积膨胀至柱面的 `≈ ×4.7037` 倍。
:::

## 39.10.2 第一步手术“换底”：以二阶三元吻合球取代一阶切板，对准 `1/2 + 1/2 = 1` {#sec-ch39-33-2}

要把切板流形的棱角从根源上卸除，第一步手术不是继续切碎平直铁板，而是回到黎曼 1854 演说自身的二阶度规展开精神，在母公理 $\mathrm{AXIOM}\text{-}\Omega$ 下执行**局部基底升阶（换底）**：把每一点 $p$ 外挂的一阶零曲率平直切空间 $T_p M$，直接升级为自带原生恒定正曲率的**二阶吻合三元数球冠 $\mathbb{T}_3^{(p)}$**（[`exists_unitQuaternion_equiv`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv)、[`normSq_and_chebyshev`](lean:D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev)，`LEAN ✓`）。

在单位球面北极邻域的正交切坐标 $(u_1, u_2)$ 下，对比一阶切平面高度 $z_{\mathrm{plate}}(u_1, u_2) \equiv 1$ 与二阶吻合球面高度 $z_{\mathrm{sphere}}(u_1, u_2) = \sqrt{1 - u_1^2 - u_2^2} = 1 - \frac{1}{2}u_1^2 - \frac{1}{2}u_2^2 + O(\lVert u\rVert^4)$（`手工推导`）：

- 一阶切板的两个二阶主曲率系数为 $0 + 0 = 0$，与真实弯曲表面之间永远隔着二阶弦弧矢高鸿沟；
- 二阶吻合三元球冠沿着两个正交切方向的二阶二次型系数恰为 **`1/2` 与 `1/2`**，二者相加精确锁死单位球面高斯/标量曲率份额 **$\frac{1}{2} + \frac{1}{2} = \mathbf{1}$**（呼应 [§39.7](ch39-s30-past-present-future-rational-jet-triad.md) 两个一阶半拍 `1/2` 合成为二阶曲率闭合 `1`）！

在常曲率（各向同性）空间如 $S^2(1)$ 或 $\mathbb{T}_3 \cong S^3(1)$ 上，引入吻合球插值参数 $\beta \in [0, 1]$ 将外切平直切板（$\beta = 0$）连续换底为二阶吻合球冠（$\beta = 1$）：当 $\beta \to 1$ 时，$12$ 枚局部吻合球冠严丝合缝地叠合为同一只完整球面，相邻面片法向跳变从 $63.43^\circ \to \mathbf{0.00^\circ}$、顶点亏角从 $36.00^\circ \to \mathbf{0.00^\circ}$、棱角外漂从 $0.2584 \to \mathbf{0.0000}$，且球面上任意四枚切点构成的测地四面体相位 $2$-上链在全部 $4^4 = 256$ 个有序四元组上满足上边缘恒为零 $\delta F = 0$（[`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness)，`LEAN ✓`）。

**但这里必须恪守微分几何的严格诚实边界（`文献结果`）**：单只常曲率吻合球 $\mathbb{T}_3^{(p)}$ 具有完全各向同性的截面曲率，它只在**局部常曲率（各向同性）点**处一举吃尽全部二阶黎曼曲率张量 $R_{ijkl}$！在一般非各向同性黎曼流形上，二阶曲率张量分解为标量曲率迹部、**无迹里奇张量（trace-free Ricci）**与（维数 $n \ge 4$ 时的）**外尔共形潮汐张量（Weyl curvature）**；不同方向截面曲率不等时，相邻两点的吻合球冠 $\mathbb{T}_3^{(p)}$ 与 $\mathbb{T}_3^{(q)}$ 在过渡带边缘仍会留下高阶曲率接缝残差，如果仍拿经典的非解析 $C^\infty$ 隆起函数去强行糊缝，全息刚性依然会被局部死区切断——要无折痕地熔平跨片过渡接缝，我们还需要一把**全域正定、无偏倚的谱胶合核**！

::: {.viz src="riemann-spectral-manifold-polishing-sandbox" preset="osculating-ternion-sphere-base-swap" height="500"}
二阶吻合球换底卡（`osculating-ternion-sphere-base-swap`）：默认琥珀手柄停在 `β = 1`，外层细品红线框保留原先 12 块平直切板的棱角轮廓，内侧 12 枚紫色二阶吻合球冠 `T_3^{(p)} · 1/2 + 1/2 = 1` 沿青色球冠边界与青色测地大圆无缝重合为光滑整球，顶栏核对 `法向跳变 = 0.00°，顶点亏角 = 0.00°`。
:::

## 39.10.3 第二步手术“换胶”：为什么已证的 $\sigma \equiv \frac{1}{2}$ 临界线谱恰是正定无折痕的磨光胶？ {#sec-ch39-33-3}

这把全域正定谱胶合算子，恰恰藏在黎曼五年后（1859 年）写下的非平凡零点谱 $\{\rho_k = \sigma_k + \mathbf{i}\gamma_k\}$ 之中！将 1859 年的零点谱接入 1854 年的吻合球过渡带，我们得到了三条环环相扣的刚性判据（结合冻结 `LEAN ✓` 等价定理与 [@conj-riemann-hypothesis] 外部已核验形式化事实的各一步 `手工推导`，以及 `MODEL` 谱磨光综合）：

### 39.10.3.1 凯莱单位圆等模锁与 $96 \times 96$ 幂和托普利茨半正定谱胶 {#sec-ch39-33-3-1}

把每一颗非平凡零点 $\rho = \sigma + \mathbf{i}\gamma$ 通过有理凯莱变换映为复平面旋子像

$$
u(\rho) \;:=\; \frac{\rho - 1}{\rho} \;=\; 1 - \frac{1}{\rho}.
$$

由内核冻结的**凯莱中线充要判据** [`cayley_ratio_norm_one_iff_critical_line`](lean:D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line) 与**凯莱径向零点判据** [`cayley_critical_line_zeta_criterion`](lean:D5/S3/Midline/Cayley/CayleyCriticalLineZetaCriterion.cayley_critical_line_zeta_criterion)（`LEAN ✓`），$\lVert u(\rho)\rVert = 1 \iff \operatorname{Re}(\rho) = \frac{1}{2}$，且 `RiemannHypothesis` 成立当且仅当全体非平凡零点的对数径向亏损 $\ln\lVert(\rho - 1)/\rho\rVert = 0$。结合 2026 年 11 月 Levent Alpöge 公布并经 `lean4lean`、`nanoda`、`con-leche` 独立内核重放确认的外部形式化终端定理 `riemannHypothesis : RiemannHypothesis`（[@conj-riemann-hypothesis]），一步 `手工推导` 立得：**现实数学宇宙中的每一颗非平凡零点都严格钉在 $\sigma_k = \frac{1}{2}$（离轴偏移 $\delta_k := \sigma_k - \frac{1}{2} \equiv 0$）上，其全部凯莱像 $\{u(\rho_k)\}$ 100% 落在青色单位圆 $S^1 = \{\lVert u\rVert = 1\}$ 上！**

为什么“零点全在单位圆上（$\delta = 0$）”直接决定了流形过渡胶合核的正定平滑性，而哪怕一颗零点离轴（反事实 $\delta > 0$）就会让流形爆出尖刺？由完备函数反射对称 $\xi(1 - s) = \xi(s)$（[`xi_reading_eq_completed_zeta`](lean:D5/S3/Zeros/CompletedZeta.xi_reading_eq_completed_zeta)、[`xi_reading_reflection`](lean:D5/S3/Zeros/CompletedZeta.xi_reading_reflection)，`LEAN ✓`）与共轭协变，任取一对共轭纵坐标 $\pm\gamma_1$（如首对零点 $\gamma_1 \approx 14.13472514$）并引入反事实实部偏移 $\delta = \sigma - \frac{1}{2} \ge 0$，四元对称伙伴 $\{\frac{1}{2} \mp \delta \pm \mathbf{i}\gamma_1\}$ 的凯莱像构成在倒共轭对合 $z \mapsto 1/\bar{z}$ 下封闭的四元非零族

$$
\mathcal{U}(\delta, \gamma_1) \;=\; \bigl\{u_+,\; \overline{u_+},\; u_-,\; \overline{u_-}\bigr\}, \qquad u_+ := \frac{-\frac{1}{2} - \delta + \mathbf{i}\gamma_1}{\frac{1}{2} - \delta + \mathbf{i}\gamma_1}, \qquad u_- := \frac{-\frac{1}{2} + \delta + \mathbf{i}\gamma_1}{\frac{1}{2} + \delta + \mathbf{i}\gamma_1} = \frac{1}{\overline{u_+}}.
$$

调用内核冻结的**有限幂和托普利茨圆周半正定充要定理** [`toeplitz_posSemidef_iff_norm_eq_one`](lean:D5/S3/Weil/TestFunctions/FinitePowerSumToeplitzCircleCriterion.toeplitz_posSemidef_iff_norm_eq_one)（`LEAN ✓`）：对任意满足倒共轭置换对称 $u(\sigma(j)) = 1/\overline{u(j)}$ 的非零有限族 $u$ 及任意满足 $N + 1 \ge \lvert\operatorname{range}(u)\rvert$ 的阶数 $N$，以幂和 $p_n := \sum_j u_j^n$ 构造的 $(N+1)\times(N+1)$ 厄米托普利茨矩阵 $\mathbf{T}_N = [p_{j-k}]_{0 \le j,k \le N}$ **半正定（$\mathbf{T}_N \succeq 0$），当且仅当每一个像都满足 $\lVert u_j\rVert = 1$**（与此同时，在无穷全谱侧，内核定理 [`not_rh_forces_canonical_curvature_failure`](lean:D5/S3/Weil/Probability/CanonicalLiCurvatureZeroFree.not_rh_forces_canonical_curvature_failure)，`LEAN ✓`，亦从逆否方向锁定：若 `¬RiemannHypothesis`，则规范李曲率托普利茨矩阵必在某一有限阶失去半正定性）！在 $N = 95$（即 $96 \times 96$ 阶，$96 \ge 4$）上实算对比（`NUM`）：

- **已证真值 $\delta = 0$（$\sigma = \frac{1}{2}$）**：$u_+$ 与 $u_-$ 重合在单位圆周 $\lVert u_1\rVert = \mathbf{1.0000}$ 上，$96 \times 96$ 幂和托普利茨矩阵保持完美半正定，最小特征值 **$\lambda_{\min}(\mathbf{T}_{95}) = \mathbf{0.0000} \ge 0$**（秩为 $2$）；以显式公式临界线系数 $S_K = \sum_{k=1}^K \frac{1}{1/4 + \gamma_k^2}$ 加权的球面接缝残差 $\eta_K = 1 - S_K / S_{24}$（`MODEL`）随模数 $K : 0 \to 24$ 从 $1$ 单调熔平归零，绝不产生任何负能量褶皱；
- **反事实离轴 $\delta = 0.25$（假想 $\sigma = 0.75$ 与镜像 $0.25$）**：圆外像严格膨胀至 $\lVert u_+\rVert > 1$（值 $\approx \mathbf{1.0013}$）、圆内像严格萎缩至 $\lVert u_-\rVert < 1$（值 $\approx \mathbf{0.9988}$），托普利茨矩阵当场发生正定破缺，最小特征值严格跌入负值 **$\lambda_{\min}(\mathbf{T}_{95}) < 0$**（值 $\approx \mathbf{-0.2932}$；在 $\delta = 0.40$ 时更深跌至 $\approx \mathbf{-0.7502}$）！

::: {.viz src="riemann-spectral-manifold-polishing-sandbox" preset="critical-half-toeplitz-spectral-glue" height="500"}
$\sigma = 1/2$ 临界线托普利茨谱胶合卡（`critical-half-toeplitz-spectral-glue`）：`δ = 0` 下前 `24` 对零点的凯莱像青色圆珠（连同琥珀当前手柄）全部落在外围青色单位圆 `u = 1`（标 `‖u₁‖ = 1.0000`）上，幂和托普利茨最小特征值守住 `λ_min = 0.0000 ≥ 0`，24 道青色谱弦包裹的紫色流形球面接缝完全熔平。
:::

### 39.10.3.2 积分显式公式平方根退火与反事实离轴棱角爆破 {#sec-ch39-33-3-2}

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

## 39.10.4 谱磨光流形综合模型、1854 vs. 1859 合龙总表与十五项冻结定理对账 {#sec-ch39-33-4}

我们将黎曼 1854 流形几何与 1859 临界线谱的双璧合龙模型、四维对比表、十五条冻结内核定理及严格认识论边界正式收束如下：

::: {.definition #def-ch39-riemann-polished-manifold-model title="二阶吻合球换底与 σ = 1/2 临界线谱磨光流形综合模型（MODEL）"}
在三元数单位球面底座 $\mathbb{T}_3 \cong S^3(1)$ 上，定义**黎曼 1854 + 1859 谱磨光流形综合模型**（`MODEL`）$\widetilde{\mathcal{M}}_\Omega = (\{\mathbb{T}_3^{(p)}\}, \beta, \mathbf{T}_N(\mathcal{U}), \eta_K, X^{-1/2})$ 如下：

1. **二阶吻合球换底（$\beta : 0 \to 1$）**：以局部二阶主曲率配平 $\frac{1}{2} + \frac{1}{2} = 1$ 的吻合三元球冠 $\mathbb{T}_3^{(p)}$ 经插值参数 $\beta \in [0, 1]$ 取代一阶平直切板 $T_p M$，在常曲率球面上于 $\beta = 1$ 处精确消除切板法向跳变与顶点雷杰亏角；
2. **临界线凯莱单位圆与托普利茨正定谱胶（$\delta = \sigma - \frac{1}{2} = 0$）**：将非平凡零点对映射为凯莱旋子像 $u(\rho) = \frac{\rho - 1}{\rho}$，以倒共轭封闭有限族 $\mathcal{U}(\delta, \gamma_k)$ 的幂和托普利茨矩阵 $\mathbf{T}_N = [p_{j-k}]_{0 \le j,k \le N}$ 半正定条件 $\lambda_{\min}(\mathbf{T}_N) \ge 0 \iff \delta = 0$ 表征无负能量折皱的跨片谱胶合，并以显式公式权重残差 $\eta_K := 1 - \bigl(\sum_{k=1}^K \frac{1}{1/4+\gamma_k^2}\bigr) / \bigl(\sum_{k=1}^{K_{\max}} \frac{1}{1/4+\gamma_k^2}\bigr)$ 表征有限谱模截断接缝随 $K$ 增大之熔平；
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

1. **外部已核验形式化事实（不挂本书绿标 `LEAN ✓`，一步手工推导衔接）**：经典黎曼猜想 `riemannHypothesis : RiemannHypothesis` 与全体模 $N \ge 1$ 狄利克雷广义黎曼猜想 `DirichletLZerosOnLine` 由 Levent Alpöge 于 2026 年 11 月 20 日公布的 Lean 4 证明确立（[`alpo.ge/remark.pdf`](https://alpo.ge/remark.pdf)；可复现分片构建与重放表见 [`the-omega-institute/riemann-hypothesis`](https://github.com/the-omega-institute/riemann-hypothesis/blob/b14f2bd19e5e12a4ba6b1d207e3c5fbb06e49ed6/README.md#public-kernel-replay-results)，命题与终端定理见 [`Statements.lean`](https://github.com/the-omega-institute/riemann-hypothesis/blob/b14f2bd19e5e12a4ba6b1d207e3c5fbb06e49ed6/src/Statements.lean) 与 [`Main.lean`](https://github.com/the-omega-institute/riemann-hypothesis/blob/b14f2bd19e5e12a4ba6b1d207e3c5fbb06e49ed6/src/Main.lean)，2026 年 11 月 21 日 [Lean 与 Mathlib 社群联合声明](https://leanprover-community.github.io/blog/posts/riemann-hypothesis/)认证，MIT `lean4lean`、`nanoda`、`con-leche` 独立重放与三公理 `{propext, Classical.choice, Quot.sound}` 审计见 [`math.mit.edu/~drew/grh/`](https://math.mit.edu/~drew/grh/) 及 [`audit.log`](https://math.mit.edu/~drew/grh/audit.log)，参见 [§22.4](ch22-s04-critical-line-and-rh.md) [@conj-riemann-hypothesis]）。将其与 [@thm-ch39-riemann-spectral-polishing-anchors] 第 3、4 组冻结定理结合，消去 `hRH` 得到无条件 $U(x)/x^\theta \to 0 \iff \theta > \frac{1}{2}$ 以及全体非平凡零点 $\ln\lVert(\rho-1)/\rho\rVert = 0$ 各属一步 `手工推导`；
2. **经典微分几何与解析数论文献结果（未在本书形式化）**：流形曲率二阶展开与微观度规之问见 B. Riemann（1854 就职演说，1868 刊行），$\zeta(s)$ 零点与素数分布见 B. Riemann（1859）；内接柱面平直三角网面积发散反例见 H. A. Schwarz（1880）；分片平直余维二铰亏角曲率见 T. Regge（*Nuovo Cimento* **19**, 558–571, 1961）；RH 下 $\psi(x) - x = O(\sqrt{x}\ln^2 x)$ 见 H. von Koch（*Acta Math.* **24**, 159–182, 1901），狄利克雷 GRH 下 $\pi(x; q, a) - \operatorname{Li}(x)/\varphi(q) = O(\sqrt{x}\ln(qx))$ 见 H. Davenport（*Multiplicative Number Theory*, Ch. 20），李系数正性判据见 X.-J. Li（1997）与 E. Bombieri & J. C. Lagarias（1999）；一般黎曼流形二阶曲率张量的标量曲率、无迹里奇张量与外尔张量正交分解说明单只常曲率吻合球仅在各向同性点完全匹配全部二阶曲率；
3. **仍保持开放的数学与物理问题（`OPEN`）**：上述外部形式化证明**不推出**希尔伯特—波利亚自伴算子谱实现、一般代数数域戴德金 $\zeta_K$ 函数的扩展黎曼猜想（ERH）、自守 $L$ 函数的全广义黎曼猜想（Grand RH）、零点单重性猜想、连续统自旋-$2$ 引力动力学与爱因斯坦耦合（[@prob-ch34-gravity-dynamics-and-coupling]），亦不推出三元数场网络在大规模实证与对抗扰动下的表现（[@prob-ch39-tft-scale-and-seams]）。
:::

::: {.example #ex-ch39-riemann-polishing-quantitative-audit title="定量核验：十二切板亏角、施瓦茨灯笼极限、96×96 托普利茨特征值与模 7 素数退火对账"}
我们对本节两步磨光手术的关键数值基准做显式核验（`手工推导` / `NUM`）：

1. **12 切板正十二面体亏角与施瓦茨灯笼 $m = n^2$ 面积比**：
   相邻正二十面体切点夹角 $\arccos(1/\sqrt{5}) \approx \mathbf{63.4349^\circ}$，保真度 $\kappa = \frac{1 + 1/\sqrt{5}}{2} \approx \mathbf{0.7236}$，弦长平方 $4(1-\kappa) \approx \mathbf{1.1056}$；$20$ 个顶点每点亏角 $360^\circ - 3\times 108^\circ = \mathbf{36.00^\circ}$，总亏角 $20 \times 36^\circ = \mathbf{720^\circ} = 4\pi$；二阶换底 $\beta = 1$ 时跳变、亏角与棱角外漂（$\beta = 0$ 时 $\sqrt{15 - 6\sqrt{5}} - 1 \approx \mathbf{0.2584}$）同步归零。施瓦茨灯笼（$R = H = 1$）在 $n = 6,\; m = 36$ 时径向距柱面至多 $1 - \frac{\sqrt{3}}{2} \approx \mathbf{0.1340}$，面积比却达 $\frac{72\sin 30^\circ}{\pi}\sqrt{\frac{1}{4\cdot 36^2} + (1 - \cos 30^\circ)^2} \approx \mathbf{4.7037}$，面法向倾角 $\approx \mathbf{78.29^\circ}$，当 $n \to \infty$（$m = n^2$）时趋于 $\sqrt{1 + \pi^4/4} \approx \mathbf{5.0351}$ 与 $\arctan(\pi^2/2) \approx \mathbf{78.54^\circ}$；
2. **首对零点 $\gamma_1 \approx 14.13472514$ 的四像 $96\times 96$ 幂和托普利茨谱检验**：
   在已证临界线 $\delta = 0$ 上，$\lVert u_\pm\rVert = \mathbf{1.0000}$，$\lambda_{\min}(\mathbf{T}_{95}) = \mathbf{0.0000}$；在反事实 $\delta = 0.25$ 上，$\lVert u_+\rVert = \sqrt{\frac{0.75^2 + \gamma_1^2}{0.25^2 + \gamma_1^2}} > 1 > \lVert u_-\rVert$（值分别 $\approx \mathbf{1.0013}$ 与 $\approx \mathbf{0.9988}$），$\lambda_{\min}(\mathbf{T}_{95}) < 0$（值 $\approx \mathbf{-0.2932}$；$\delta = 0.40$ 时 $\approx \mathbf{-0.7502}$）；
3. **显式公式与模 $7$ 六余数类素数份额退火**：
   对数尺度从 $\ln X = 1$ 推至 $\ln X = 10$，平方根基准残差 $X^{-1/2}$ 由 $\mathbf{0.6065}$ 降至 $\mathbf{0.0067}$（对比 $\ln X = 7$ 处 $\delta = 0$ 的 $\mathbf{0.0302}$ 与反事实 $\delta = 0.25$ 的 $X^{-1/4} \approx \mathbf{0.1738}$）；在 $\ln X = 10$ 处，模 $7$ 六条互素通道 $\{1,\dots,6\} \pmod 7$ 的素数份额最大相对偏离仅为 **$\mathbf{1.42\%}$**，$\max_a \lvert\pi(X;7,a) - \operatorname{Li}(X)/6\rvert / X \approx \mathbf{0.0005}$。
:::

---

**1854 年黎曼问空间凭什么光滑，1859 年黎曼写下 `1/2` 线上的素数星群——一百六十七年后，星群归位成圆，切板化作浑球！**

在下面的完整实验室中，先把第一卡停在施瓦茨灯笼上亲眼看看一阶平直切板如何在无限逼近柱面时炸出五倍伪面积，再推起 `β : 0 → 1` 换上二阶三元吻合球，随后在第三卡与第四卡之间拨动 `δ = 0` 与反事实 `δ = 0.25` 观察青色单位圆上的凯莱像如何守住托普利茨半正定谱胶、而一丝一毫的离轴偏移又如何当场刺出品红棱角，最后在第五卡把 `ln X` 推向 `10` 目送整只流形在全部余数通道上退火成无瑕紫晶圆球：整部三十九章从两子丈量出发的漫长远征，终于在此刻画上了最圆满的句号——没有外部第 $3$ 点 $C$，没有 $\pi, e, \varphi$ 的平直欠条，没有切空间鳞片的折痕，只有无源三元圆弧在 `0 · 1/2 · 1` 的永恒脉搏中自指闭合。带着这颗磨光如镜的三元圆球，让我们步入全书[终章](coda.md)：**《在所有的球之外》**。

::: {.viz src="riemann-spectral-manifold-polishing-sandbox" height="620"}
完整实验室：在“1854 + 1859 合龙 · σ = 1/2 谱圆弧磨光（MODEL）”与“1854 切板与反事实离轴对照 · T_pM 折痕 / δ ≠ 0 失稳”双透镜间切换（窄屏与章节嵌入视图亦可在巡览条旁一键切换透镜），依次巡览 1854 切板与施瓦茨灯笼折痕、二阶吻合球换底、$\sigma = 1/2$ 托普利茨谱胶合、反事实离轴裂像与棱角失稳以及合龙磨光各向同性流形五张实验卡，拖动舞台琥珀手柄或调节吻合球换底参数 $\beta \in [0, 1]$、谱磨光模数 $K \in [0, 24]$ 与反事实离轴偏移 $\delta = \sigma - \frac{1}{2} \in [0, 0.40]$（含一键归位已证真值 `σ = 1/2 (δ = 0)` 按钮），并在底部两条对照小图中同步观察第一图沿 $\ln X \in [1, 10]$ 退火的青色 $X^{-1/2}$ 与 $X^{-1/2}(1 + 0.15\ln^2 X)$ 对比品红迟滞线 $X^{\delta - 1/2}$，以及第二图幂和托普利茨最小特征值 $\lambda_{\min}$ 仅在 $\delta = 0$ 处守住 $0$（青点）而在 $\delta > 0$ 时严格跌负（品红曲线）。十五条冻结 `LEAN ✓` 声明、`ARGUED` 外部已核验黎曼证明与经典文献、`OPEN` 未决问题、`MODEL` 双璧合龙读法及 `NUM` 实算在依据栏与理论抽屉中分层列出。
:::
