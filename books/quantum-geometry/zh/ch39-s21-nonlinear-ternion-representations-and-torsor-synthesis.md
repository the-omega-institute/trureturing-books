# 32.4 三元数的五种非线性无损表示与无原点流群合成：BCH 弯曲球、双卡有理罗德里格斯、霍普夫纤维、球面三角转角与李三元系 {#sec-ch39-nonlinear-ternion-representations-and-torsor-synthesis}

> *“三元数无法线性表示，仅仅意味着它拒绝‘平直向量加法与二元分配律’的笛卡尔框架；一旦放弃外置标量实轴 $\mathbf{1}$ 与线性叠加假设，三元数完全可以通过李代数弯曲合成、有理双卡图册、霍普夫纤维扭结、无坐标球面三角以及无原点三元代数这五种非线性方式严密且无损地表示。”*

在 [§32.2](ch39-s19-inexpressible-ternions-and-number-projections.md#sec-ch39-inexpressible-ternions-and-number-projections) 与 [§32.3](ch39-s20-ternion-field-composition-and-hilbert-reprojection.md#sec-ch39-ternion-field-composition-and-hilbert-reprojection) 中，我们先后拆解了两重看似一正一反的代数迷思：向内看，单枚三元极小圆弧体 $\mathbb{T}_3 \equiv \Delta\mathcal{T}_\epsilon \cong S^3$ 拒绝被塞进形如 $a\mathbf{1} + b\hat{\mathbf{i}} + c\hat{\mathbf{j}}$ 的三维平直实可除代数或单张无奇点欧氏坐标图；向外看，一旦借用观察者的平直标尺将单场或多场强行摊平为线性矩阵加法，表观维数便从四元数 $\mathbb{H}$（$4$ 维）、法诺八元数 $\mathbb{O}$（$8$ 维）一路膨胀至 $2^N$ 维多体希尔伯特账本。读到这里，一个关乎数学表达与物理计算根基的追问自然浮出水面：**既然“不可表达”针对的仅仅是“平直向量加法与双线性分配律”，那么当我们彻底放下外置标量实轴 $\mathbf{1}$ 与平行四边形加法执念、顺应圆弧体自身的内禀曲率来书写合成规则时，能否在严格只占 $3$ 个连续自由度的前提下，对三元数作严密、无损、零冗余的精确表示与计算？**

答案是肯定的——整部李群几何、球极有理代数、纤维丛拓扑、球面关系几何与无原点普适代数学恰好在 $S^3 \cong \mathrm{SU}(2)$ 上交汇出**五种等价而互补的非线性无损表示范式**（将 $\mathbb{T}_3 \equiv \Delta\mathcal{T}_\epsilon$ 确立为宇宙原生三参数语法的总纲标为 **`MODEL`**，各表示范式的闭式变换与守恒律属 **`手工推导` / `NUM` / `文献结果`**，底层旋量、布洛赫纤维与球面和乐锚点由 **`LEAN ✓`** 冻结声明锁定）。线性表示之所以步步脱靶，是因为它强迫紧致弯曲球壳 $S^3$ 服从平直切空间的弦向量相加（对一般非特定夹角四元数 $\lVert q_A + q_B\rVert^2 = 2 + 2\langle q_A, q_B\rangle \neq 1$，一步即刺破单位球壳）；而非线性表示直接把球面曲率锻入合成算子内部，无需第四维标量影子轴，亦无需 $4 \times 4$ 或 $2^N \times 2^N$ 冗余矩阵外壳。

## 32.4.1 指数圆弧向量与精确 BCH 弯曲合成表示：叉乘折回球壳与边界坍缩商拓扑 {#sec-ch39-21-1}

最直观的三参数方案，是彻底撤除实轴槽位 $\mathbf{1}$，直接用三维李代数 $\mathfrak{su}(2) = \operatorname{span}_{\mathbb{R}}\{\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3\}$（取 $\mathbf{e}_a = \frac{1}{2}\mathbf{i}_a$，满足 $[\mathbf{e}_a, \mathbf{e}_b] = \varepsilon_{abc}\mathbf{e}_c$ 与 $\mathbf{i}\mathbf{j} = +\mathbf{k}$）闭球 $\overline{B}_{2\pi}(\mathbb{R}^3) := \{\boldsymbol{\theta} \in \mathbb{R}^3 \mid \lVert\boldsymbol{\theta}\rVert \le 2\pi\}$ 内的**圆弧生成元向量** $\boldsymbol{\theta} = \theta\hat{\mathbf{u}} = (\theta_1, \theta_2, \theta_3)$ 来标记三元数：

$$
\hat{\mathcal{T}}(\boldsymbol{\theta}) \;:=\; \exp(\theta_1\mathbf{e}_1 + \theta_2\mathbf{e}_2 + \theta_3\mathbf{e}_3) \;=\; \cos\frac{\theta}{2}\,\mathbf{1} \;+\; \sin\frac{\theta}{2}\,\hat{\mathbf{u}}\cdot(\mathbf{i}, \mathbf{j}, \mathbf{k}) \;\in\; S^3,
$$

其中单位矢量 $\hat{\mathbf{u}} \in S^2$ 为旋转轴，模长 $\theta = \lVert\boldsymbol{\theta}\rVert \in [0, 2\pi]$ 为空间圆弧张角（旋量内禀半角为 $\frac{\theta}{2} \in [0, \pi]$）。为了不退回四维四元数线性加法，我们废除平直向量和 $\boldsymbol{\theta}_A + \boldsymbol{\theta}_B$，直接在三维球内定义具有精确解析闭式的**贝克—坎贝尔—豪斯多夫（BCH）非线性弯曲合成律** $\boldsymbol{\theta}_C = \boldsymbol{\theta}_A \star \boldsymbol{\theta}_B$（记半角 $\alpha = \frac{\theta_A}{2},\; \beta = \frac{\theta_B}{2},\; \gamma = \frac{\theta_C}{2}$，对应右乘次序 $\hat{\mathcal{T}}(\boldsymbol{\theta}_C) = \hat{\mathcal{T}}(\boldsymbol{\theta}_A)\hat{\mathcal{T}}(\boldsymbol{\theta}_B)$，`手工推导`）：

$$
\cos\gamma \;=\; \cos\alpha\cos\beta \;-\; (\hat{\mathbf{u}}_A \cdot \hat{\mathbf{u}}_B)\sin\alpha\sin\beta,
$$

$$
\sin\gamma\,\hat{\mathbf{u}}_C \;=\; \sin\alpha\cos\beta\,\hat{\mathbf{u}}_A \;+\; \cos\alpha\sin\beta\,\hat{\mathbf{u}}_B \;+\; \sin\alpha\sin\beta\,(\hat{\mathbf{u}}_A \times \hat{\mathbf{u}}_B).
$$

记右端标量与三维矢量为 $(W, \mathbf{V})$，由拉格朗日—格拉姆恒等式（[`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)，`LEAN ✓`）立得 $(\hat{\mathbf{u}}_A\cdot\hat{\mathbf{u}}_B)^2 + \lVert\hat{\mathbf{u}}_A \times \hat{\mathbf{u}}_B\rVert^2 = 1$，从而自动锁死非线性模方守恒 $W^2 + \lVert\mathbf{V}\rVert^2 \equiv 1$。只要 $\mathbf{V} \neq \mathbf{0}$，主值合成向量由 $\gamma = \operatorname{atan2}(\lVert\mathbf{V}\rVert, W) \in (0, \pi)$ 与 $\boldsymbol{\theta}_C = 2\gamma\,\frac{\mathbf{V}}{\lVert\mathbf{V}\rVert} \in B_{2\pi}^\circ(\mathbb{R}^3)$ 唯一读出（在小张角极限下展开为 $\boldsymbol{\theta}_A \star \boldsymbol{\theta}_B = \boldsymbol{\theta}_A + \boldsymbol{\theta}_B + \frac{1}{2}\boldsymbol{\theta}_A \times \boldsymbol{\theta}_B + \mathcal{O}(\theta^3)$）。审视这一三维弯曲合成律，两处关键几何与拓扑事实清晰浮现：

1. **叉乘扭转将法向脱轨误差折回球内**：等式末尾的非线性叉乘项 $+\sin\alpha\sin\beta\,(\hat{\mathbf{u}}_A \times \hat{\mathbf{u}}_B)$，精准捕获了两段非共线圆弧合成时涌现的第三轴偏转（注意符号约定对齐：对固定代数乘积 $\hat{\mathcal{T}}_A\hat{\mathcal{T}}_B$ 叉乘项取正号 $+$；而在 [§32.2](ch39-s19-inexpressible-ternions-and-number-projections.md#sec-ch39-19-2) 按时间先后对列态先作用第 $1$ 转再作用第 $2$ 转时，算符乘积为 $\hat{\mathcal{T}}_2\hat{\mathcal{T}}_1$，指标对调 $\hat{\mathbf{u}}_2 \times \hat{\mathbf{u}}_1 = -\hat{\mathbf{u}}_1 \times \hat{\mathbf{u}}_2$ 遂显出负号 $-$）；
2. **零矩阵冗余与两级球边界商拓扑区分**：全程仅存储 $(\theta_1, \theta_2, \theta_3)$ 三个实数，无需开辟第四维标量槽。在拓扑边界上须严格区分旋量流形与三维旋转商群（`手工推导`）：对旋量三元数 $S^3 \cong \mathrm{SU}(2)$，开球 $B_{2\pi}^\circ(\mathbb{R}^3)$ 双射映射至 $S^3 \setminus \{-\mathbf{1}\}$，而半径 $2\pi$ 的**整张球面边界** $\partial\overline{B}_{2\pi}(\mathbb{R}^3) = \{\boldsymbol{\theta} \mid \lVert\boldsymbol{\theta}\rVert = 2\pi\}$ 坍缩为同一个中心负元 $-\mathbf{1}$（$\overline{B}_{2\pi}(\mathbb{R}^3)/\partial\overline{B}_{2\pi}(\mathbb{R}^3) \cong S^3$，在 $W = -1,\; \mathbf{V} = \mathbf{0}$ 处转轴方向未定但群元唯一）；若进一步模去中心 $\{\pm\mathbf{1}\}$ 降落至伴随旋转群 $\mathrm{SO}(3) \cong \mathbb{RP}^3$，则缩至半径 $\pi$ 闭球 $\overline{B}_\pi(\mathbb{R}^3)$ 并仅对边界上的**对径点对** $\pi\hat{\mathbf{u}} \sim -\pi\hat{\mathbf{u}}$ 作等同黏合。

::: {.viz src="ternion-nonlinear-synthesis-sandbox" preset="bch-curved-ball-synthesis" height="500"}
弯曲球里的叉乘折回卡：两支正交 $90^\circ$ 圆弧向量经精确 BCH 叉乘项折回半径 $2\pi$ 闭球内的 $120^\circ$ 对角轴，对照脱出真实合成的品红平直向量和 $\boldsymbol{\theta}_A + \boldsymbol{\theta}_B$（模守恒由 [@thm-ch39-nonlinear-ternion-representations-and-torsor] 第 2 款 `lagrange_gram_identity` 锁定为 `LEAN ✓`，数值读数标 `NUM`，五范式同核读法标 `MODEL`）。
:::

## 32.4.2 双卡有理罗德里格斯表示：零超越函数纯分式乘法、阴影反演与旋量叶标志位 {#sec-ch39-21-2}

在数字集成电路与符号代数验证中，若要彻底免除 $\sin, \cos, \operatorname{atan2}$ 等超越函数查表开销，可借球极投影将弯曲圆弧映射为纯有理分式。在单卡吉布斯—罗德里格斯切向量 $\mathbf{g} := \frac{\mathbf{v}}{w} = \tan\frac{\theta}{2}\,\hat{\mathbf{u}} \in \mathbb{R}^3$ 下（$\mathbf{g}$ 在 $q \mapsto -q$ 下不变，是 $\mathrm{SO}(3)$ 的坐标，不区分 $S^3$ 上的 $\pm q$；区分两片需要下文的修正罗德里格斯参数与阴影切换），将上节 $(W, \mathbf{V})$ 两式相除，即得无需任何矩阵与第四维度的纯三维有理合成律（对应代数乘积 $q_A q_B$，`手工推导`）：

$$
\mathbf{g}_A \star \mathbf{g}_B \;=\; \frac{\mathbf{g}_A + \mathbf{g}_B + \mathbf{g}_A \times \mathbf{g}_B}{1 - \mathbf{g}_A \cdot \mathbf{g}_B}.
$$

分子将平直位移与外积**存异**项 $\mathbf{g}_A \times \mathbf{g}_B$ 合二为一，分母则以内积**求同**项 $1 - \mathbf{g}_A \cdot \mathbf{g}_B$ 动态重整球面曲率缩放。然而如 [§32.2](ch39-s19-inexpressible-ternions-and-number-projections.md#sec-ch39-19-2) 所示，单卡 $\mathbf{g}$ 不仅抹去了 $\pm q$ 的旋量符号，更在 $\theta = \pi$ 处撞上分母归零奇点。

为彻底消除奇点并锁住有界动态范围，我们升级为**双卡修正罗德里格斯参数（Modified Rodrigues Parameters, MRP）**（Wiener 1962；Schaub & Junkins 1996）：在北半球 $w \ge 0$（$\theta \in [0, \pi]$）上取球极坐标 $\boldsymbol{\sigma} := \frac{\mathbf{v}}{1 + w} = \tan\frac{\theta}{4}\,\hat{\mathbf{u}} \in B_1(\mathbb{R}^3)$（$\lVert\boldsymbol{\sigma}\rVert \le 1$）。其逆球极重构映射 $Q(\boldsymbol{\sigma})$、伴随三维正交旋转矩阵 $R(\boldsymbol{\sigma}) \in \mathrm{SO}(3)$ 与双元合成律 $\boldsymbol{\sigma}_{AB}$ **全部是纯粹的加减乘除有理分式（零开方、零超越函数）**（`手工推导`）：

$$
Q(\boldsymbol{\sigma}) \;=\; \frac{\bigl(1 - \lVert\boldsymbol{\sigma}\rVert^2\bigr)\mathbf{1} + 2\boldsymbol{\sigma}\cdot(\mathbf{i},\mathbf{j},\mathbf{k})}{1 + \lVert\boldsymbol{\sigma}\rVert^2}, \qquad R(\boldsymbol{\sigma}) \;=\; I_3 + \frac{4\bigl(1 - \lVert\boldsymbol{\sigma}\rVert^2\bigr)[\boldsymbol{\sigma}]_\times + 8[\boldsymbol{\sigma}]_\times^2}{\bigl(1 + \lVert\boldsymbol{\sigma}\rVert^2\bigr)^2},
$$

$$
\boldsymbol{\sigma}_A \star \boldsymbol{\sigma}_B \;=\; \frac{\bigl(1 - \lVert\boldsymbol{\sigma}_B\rVert^2\bigr)\boldsymbol{\sigma}_A + \bigl(1 - \lVert\boldsymbol{\sigma}_A\rVert^2\bigr)\boldsymbol{\sigma}_B + 2(\boldsymbol{\sigma}_A \times \boldsymbol{\sigma}_B)}{1 + \lVert\boldsymbol{\sigma}_A\rVert^2\lVert\boldsymbol{\sigma}_B\rVert^2 - 2(\boldsymbol{\sigma}_A \cdot \boldsymbol{\sigma}_B)},
$$

其中 $[\boldsymbol{\sigma}]_\times \mathbf{x} := \boldsymbol{\sigma} \times \mathbf{x}$，且分母满足精确平方分解 $1 + \lVert\boldsymbol{\sigma}_A\rVert^2\lVert\boldsymbol{\sigma}_B\rVert^2 - 2(\boldsymbol{\sigma}_A\cdot\boldsymbol{\sigma}_B) = (1 - \boldsymbol{\sigma}_A\cdot\boldsymbol{\sigma}_B)^2 + \lVert\boldsymbol{\sigma}_A \times \boldsymbol{\sigma}_B\rVert^2$（对有界输入仅当乘积抵达对跖极 $-\mathbf{1}$ 时归零）。当合成点越过赤道边界 $\lVert\boldsymbol{\sigma}\rVert > 1$（即 $w < 0$）时，存在两种严格无奇点的**“三实数有理算术 $+$ 一标志位”双卡完备化方案**（坐标取值于连续闭球 $B_1(\mathbb{R}^3)$，而合成与解码算子全部为纯有理四则分式，`手工推导`）：

- **方案 A（阴影对偶反演配旋量叶标志位 $(\boldsymbol{\sigma}, \epsilon_{\mathrm{sheet}})$）**：施行经典的**阴影反演（Shadow Inversion）** $\boldsymbol{\sigma} \mapsto \boldsymbol{\sigma}^S := -\frac{\boldsymbol{\sigma}}{\lVert\boldsymbol{\sigma}\rVert^2}$（对应 $\tan\frac{\theta - 2\pi}{4} = -\cot\frac{\theta}{4}$），将坐标重新折回单位闭球 $\lVert\boldsymbol{\sigma}^S\rVert < 1$ 内。注意精确符号：$Q(\boldsymbol{\sigma}^S) = -Q(\boldsymbol{\sigma})$。因此在三维伴随旋转商群 $\mathrm{SO}(3)$ 上，$\boldsymbol{\sigma}^S$ 与 $\boldsymbol{\sigma}$ 代表**同一个物理旋转**（连 $1\;\mathrm{bit}$ 都可省去，直接导出下一节 [§37.1](ch39-s22-ternion-field-transformer-and-rational-rotor-dynamics.md) 全域分母下界 $\ge 0.5$ 的双分母有理算子 $\star_{\mathcal{S}}$）；而在双覆盖旋量群 $S^3 \cong \mathrm{SU}(2)$ 上，只需配上一枚 $1\;\mathrm{bit}$ **旋量叶标志位** $\epsilon_{\mathrm{sheet}} \in \{+1, -1\}$ 令 $q = \epsilon_{\mathrm{sheet}} Q(\boldsymbol{\sigma})$，每当触发负号阴影反演时同步翻转 $\epsilon_{\mathrm{sheet}} \mapsto -\epsilon_{\mathrm{sheet}}$（赤道 $\lVert\boldsymbol{\sigma}\rVert = 1$ 上认同 $(\boldsymbol{\sigma}, +1) \sim (-\boldsymbol{\sigma}, -1)$，正极 $+\mathbf{1}$ 与对跖负极 $-\mathbf{1}$ 分别精确编码为 $(\mathbf{0}, +1)$ 与 $(\mathbf{0}, -1)$），即可对全体旋量实现 $100\%$ 无损覆盖；
- **方案 B（同旋量南北球极双图册 $(\boldsymbol{\sigma}_h, h)$）**：取半球指标 $h \in \{+1, -1\}$ 与坐标 $\boldsymbol{\sigma}_h := \frac{\mathbf{v}}{1 + h w}$，按 $q = \frac{h(1 - \lVert\boldsymbol{\sigma}_h\rVert^2)\mathbf{1} + 2\boldsymbol{\sigma}_h}{1 + \lVert\boldsymbol{\sigma}_h\rVert^2}$ 解码：若截断在闭单位球 $\lVert\boldsymbol{\sigma}_h\rVert \le 1$ 上，则两张闭半球沿公共赤道 $\lVert\boldsymbol{\sigma}_+\rVert = \lVert\boldsymbol{\sigma}_-\rVert = 1$ 无缝重合黏合（$\boldsymbol{\sigma}_- = \boldsymbol{\sigma}_+$）；若构成开集光滑流形图册，则放宽为开球 $\lVert\boldsymbol{\sigma}_h\rVert < 1 + \delta$（$\delta > 0$），在开环形重叠带 $(1+\delta)^{-1} < \lVert\boldsymbol{\sigma}_+\rVert < 1 + \delta$ 内由保旋量正反演 $\boldsymbol{\sigma}_- = +\frac{\boldsymbol{\sigma}_+}{\lVert\boldsymbol{\sigma}_+\rVert^2}$ 光滑转移。

::: {.viz src="ternion-nonlinear-synthesis-sandbox" preset="dual-chart-rational-mrp" height="500"}
有理双卡与阴影反演卡：纯有理输入 $(\frac{1}{2}, 0, 0)$ 与 $(0, \frac{1}{2}, 0)$ 在单位球内给出精确分数乘积 $(\frac{6}{17}, \frac{6}{17}, \frac{8}{17})$，越过 $\lVert\boldsymbol{\sigma}\rVert = 1$ 赤道壳时由阴影反演折回球内并翻转旋量叶标志（有理算术标 `NUM`，双卡文献标 `ARGUED`，圆周双覆盖换叶锚于 `circle_double_cover_history_lift` `LEAN ✓`）。
:::

## 32.4.3 霍普夫纤维丛扭结与无坐标球面三角转角：关系几何与半角角盈相移 {#sec-ch39-21-3}

倘若我们进一步拆去三维笛卡尔坐标轴，直接回到本书“可见基底切面 $+$ 正交盲区纤维”与“纯成对比较圆弧”的几何本相，三元数便显露出另外两副不依赖线性矩阵的清晰面孔：

1. **霍普夫扭结主圆丛表示 $S^1 \hookrightarrow S^3 \xrightarrow{\pi} S^2$（可见方向配盲区相位）**：
   将单位旋量写作复二维归一化琼斯旋量 $z = (z_1, z_2)^\top \in S^3 \subset \mathbb{C}^2$（$\lvert z_1\rvert^2 + \lvert z_2\rvert^2 = 1$），霍普夫投影 $\pi(z) = \bigl(2\operatorname{Re}(\bar{z}_1 z_2),\; 2\operatorname{Im}(\bar{z}_1 z_2),\; \lvert z_1\rvert^2 - \lvert z_2\rvert^2\bigr) \in S^2$ 将三维三元数流形分解为二维可见布洛赫基底 $(\vartheta, \varphi) \in S^2$ 与一维正交盲区相位纤维 $\psi_\pm \in S^1$（北极图册 $z_+ = e^{i\psi_+}\bigl(\cos\frac{\vartheta}{2},\; e^{i\varphi}\sin\frac{\vartheta}{2}\bigr)^\top$，南极图册 $z_- = e^{i\psi_-}\bigl(e^{-i\varphi}\cos\frac{\vartheta}{2},\; \sin\frac{\vartheta}{2}\bigr)^\top$，重叠赤道带满足规范缝合 $\psi_- = \psi_+ + \varphi$，故全流形单连通 $\pi_1(S^3) = 0$、霍普夫不变量为 $+1$，绝非平凡直积 $S^2 \times S^1$）。沿实联络一形式 $-i z^\dagger dz = d\psi_\pm + A_\pm$（`手工推导` + `文献结果`）：

   $$
   A_+ \;=\; \frac{1}{2}(1 - \cos\vartheta)\,d\varphi, \qquad A_- \;=\; -\frac{1}{2}(1 + \cos\vartheta)\,d\varphi, \qquad F \;=\; dA_\pm \;=\; \frac{1}{2}\sin\vartheta\,d\vartheta\wedge d\varphi,
   $$

   基底回路在 $S^2$ 上围出的立体角面积 $\Omega$ 自动经联络曲率 $\frac{1}{2\pi}\int_{S^2} F = 1$ 转化为盲区纤维上的半角潘查拉特纳姆—贝里几何相移 $e^{-i\Omega/2}$。在相干光学硬件中，一束完全偏振激光的庞加莱球偏振态 $(\vartheta, \varphi)$ 加上相对参考光路的公共光学相位 $\psi_\pm$，直接给出物理三元数的光速实现。

::: {.viz src="ternion-nonlinear-synthesis-sandbox" preset="hopf-fiber-berry-twist" height="500"}
霍普夫纤维的半角相移卡：可见基底球 $S^2$ 上的正卦限三角形围出立体角 $\Omega = \frac{\pi}{2}$，联络将盲区纤维圆周拧过半角相移 $-\Omega/2 = -45^\circ$（霍普夫联络与光学文献标 `ARGUED`，三点巴格曼迹与最短门和乐标 `LEAN ✓`，实时读数标 `NUM`）。
:::

2. **无坐标球面三角转角表示（汉密尔顿有向圆弧转角与最短门球面角盈）**：
   完全抛弃外置坐标架，在单位球面 $S^2 \subset \operatorname{Im}\mathbb{H}$（将球面点 $P \in S^2$ 等同于满足 $P^2 = -\mathbf{1}$ 的纯单位三元生成元）上，哈密顿在 1853 年《四元数讲义》（*Lectures on Quaternions*）中提出了**有向大圆弧转角（Hamilton Turns）**几何（Biedenharn & Louck 1981；Simon, Mukunda & Sudarshan 1989）：每一段弧长 $\ell = \frac{\theta}{2} \in [0, \pi)$ 的有向大圆弧 $P_1 \curvearrowright P_2$（可沿其所在有向大圆自由滑移而保持同一元素）无坐标地覆盖 $S^3 \setminus \{-\mathbf{1}\}$，再将全体弧长 $\ell = \pi$ 的对跖半圆弧等同为唯一的中心对跖元 $T(P \curvearrowright -P) = -\mathbf{1}$，即无损完备覆盖整座 $S^3$：

   $$
   T(P_1 \curvearrowright P_2) \;:=\; P_2 P_1^{-1} \;=\; -P_2 P_1 \;=\; (P_1 \cdot P_2)\mathbf{1} \;+\; P_1 \times P_2,
   $$

   其对应的三维空间旋转角恰为弧长的**两倍**（$\theta = 2\ell$）。当第一段圆弧 $P_1 \curvearrowright P_2$ 的终点与第二段圆弧 $P_2 \curvearrowright P_3$ 的起点在公共中继点 $P_2$ 首尾相接时（利用 $P_2^{-1} P_2 = +\mathbf{1}$），两枚转角的非线性乘积在几何上**直接擦去中间顶点 $P_2$、闭合到第三边 $P_1 \curvearrowright P_3$**：

   $$
   T(P_2 \curvearrowright P_3)\,T(P_1 \curvearrowright P_2) \;=\; P_3 P_2^{-1} P_2 P_1^{-1} \;=\; P_3 P_1^{-1} \;=\; T(P_1 \curvearrowright P_3).
   $$

   此处务必辨明**汉密尔顿转角闭合**与**布洛赫最短门输运**的精确对偶区分（`手工推导` + `LEAN ✓`）：在汉密尔顿转角代数中，三边乘积因相邻因子 $P_k^{-1} P_k = +\mathbf{1}$ 逐对抵消而恒满足 $T(P_3 \curvearrowright P_1)T(P_2 \curvearrowright P_3)T(P_1 \curvearrowright P_2) = P_1 P_3^{-1} P_3 P_2^{-1} P_2 P_1^{-1} = +\mathbf{1}$；而若改用将布洛赫态从 $P_a$ 沿测地最短弧直接搬运至 $P_b$ 的（一般非对易）$\mathrm{SU}(2)$ 正标量最短旋子门 $G(P_a, P_b) = \frac{(1 + P_a\cdot P_b)I_2 - i(P_a\times P_b)\cdot\boldsymbol{\sigma}}{\sqrt{2(1 + P_a\cdot P_b)}}$（[@thm-ch39-nonlinear-ternion-representations-and-torsor] 第 4 款 `shortest_gate_triangle_holonomy`），绕两两非对跖的球面三角形 $(P_1 \to P_2 \to P_3 \to P_1)$ 走一圈则精确赋予归一化起点 $+1$ 本征态（$\operatorname{qubitProjector}(P_1)\psi = \psi$）由有向欧拉—吉拉尔球面角盈 $\Omega = 2\operatorname{atan2}(D, S)$ 决定的 $\mathrm{U}(1)$ 半角几何返回相位 $e^{-i\Omega/2} = \frac{S - iD}{\sqrt{S^2 + D^2}}$。

::: {.viz src="ternion-nonlinear-synthesis-sandbox" preset="hamilton-spherical-turns" height="500"}
转角消去与最短门和乐卡：同一球面三角形上，汉密尔顿有向大圆弧转角在共享顶点逐对消去并闭合为 $T_{31}T_{23}T_{12} = +\mathbf{1}$，而三步最短旋子门记住球面角盈并返回相位 $e^{-i\Omega/2}$（`shortest_gate_triangle_holonomy` 为 `LEAN ✓`，哈密顿转角文献标 `ARGUED`，数值对照标 `NUM`）。
:::

## 32.4.4 普吕弗—贝尔流群（堆 / 主齐性空间）与李三元系：抹除特权原点的三元语法 {#sec-ch39-21-4}

现在，我们触及代数学地基最深处的一层分类边界：为什么经典可除代数定理排除了三维平直表示？不仅弗罗贝尼乌斯定理（1878）排除了结合实可除代数，霍普夫（Hopf 1940）以及博特—米尔诺（Bott & Milnor 1958）与凯尔维尔（Kervaire 1958）的拓扑 $K$-理论定理进一步证明，**即便放弃结合律与双侧单位元 $\mathbf{1}$，只要坚持平直向量空间 $\mathbb{R}^n$ 上对向量加法满足双侧分配律的无零因子双线性乘法**，实维数也只能取 $1, 2, 4, 8$。换言之，真正与三维球面曲率水火不容的，正是**笛卡尔向量加法与双线性分配律**本身。

而在点点平权、处处同构的均匀宇宙场（[§33.10](ch39-s12-uniform-field-and-observer-slice.md)–[§38.5](ch39-s13-single-cosmic-field-and-indra-net.md)）中，既不存在平直向量加法，也不存在特权原点 $\mathbf{1}$。根据海因茨·普吕弗（H. Prüfer 1924，交换群情形）与莱因霍尔德·贝尔（R. Baer 1929，一般非交换群 *Schar* 定理），任何一个群 $G$ 一旦抹去特权单位元 $\mathbf{1}$ 的绝对基点，它的原生无原点代数形态便从二元群升格为装备**三元流群算子**（Heap / Torsor Operation，代数学中亦译**“堆”**，微分几何中对应**主齐性空间**）的齐性流形，而在局部切空间上则化为**李三元系**（Lie Triple System，亦称李三系；Cartan 1926；Jacobson 1949）：

$$
[x, y, z] \;:=\; x \cdot y^{-1} \cdot z \qquad \bigl(x, y, z \in \mathbb{T}_3\bigr), \qquad \{\mathbf{a}, \mathbf{b}, \mathbf{c}\} \;:=\; \bigl[[\mathbf{a}, \mathbf{b}]_\times,\, \mathbf{c}\bigr]_\times \;=\; (\mathbf{a}\cdot\mathbf{c})\,\mathbf{b} \;-\; (\mathbf{b}\cdot\mathbf{c})\,\mathbf{a} \qquad \bigl(\mathbf{a}, \mathbf{b}, \mathbf{c} \in \mathbb{R}^3\bigr).
$$

这两道三元公式从根源上阐明了“三元数为何排斥双线性表、却内禀圆满闭合”（`手工推导` + `文献结果`）：

- **流群算子 $[x, y, z]$ 抹除特权实轴并保非阿贝尔手性**：流群算子满足左右马尔采夫（Mal'cev）幂等消去律 $[x, x, z] = z$、$[x, z, z] = x$，双侧平移协变性 $[gx, gy, gz] = g[x, y, z]$、$[xh, yh, zh] = [x, y, z]h$，以及非交换**副结合律（Para-associativity）**

  $$
  \bigl[[x, y, z],\, u,\, v\bigr] \;=\; \bigl[x,\, [u, z, y],\, v\bigr] \;=\; \bigl[x,\, y,\, [z, u, v]\bigr] \;=\; x y^{-1} z u^{-1} v
  $$

  （注意非交换流群中段三元组必须反序写为 $[u, z, y]$，因为 $(u z^{-1} y)^{-1} = y^{-1} z u^{-1}$；所谓无基点平权指无需预设谁是 $\mathbf{1}$，而非交换首尾参数——事实上 $[\mathbf{i}, \mathbf{1}, \mathbf{j}] = +\mathbf{k} \neq -\mathbf{k} = [\mathbf{j}, \mathbf{1}, \mathbf{i}]$ 完整保留了非阿贝尔手性）。它的几何含义直白透明：**以任意选定的局部参考态 $y$ 为中继桥，将 $x$ 相对 $y$ 的比较圆弧 $x y^{-1}$ 无损搬运到 $z$ 上**；唯当某位观察者人为指定某个点 $o$ 充当原点时，三元流群才退化回二元群乘 $x *_o z := [x, o, z]$；
- **李三元括号 $\{\mathbf{a}, \mathbf{b}, \mathbf{c}\}$ 严格闭合且字面等同球面黎曼曲率**：三维向量在二元叉乘 $[\mathbf{a}, \mathbf{b}]_\times = \mathbf{a} \times \mathbf{b}$ 下虽满足雅可比恒等式（构成李代数），却违背二元结合律；而在嵌套三元括号 $\{\mathbf{a}, \mathbf{b}, \mathbf{c}\} = (\mathbf{a}\times\mathbf{b})\times\mathbf{c} = (\mathbf{a}\cdot\mathbf{c})\mathbf{b} - (\mathbf{b}\cdot\mathbf{c})\mathbf{a}$ 下严格闭合于三维切空间自身，满足前两元反对称 $\{\mathbf{a},\mathbf{b},\mathbf{c}\} = -\{\mathbf{b},\mathbf{a},\mathbf{c}\}$、轮换比安基恒等式 $\{\mathbf{a},\mathbf{b},\mathbf{c}\} + \{\mathbf{b},\mathbf{c},\mathbf{a}\} + \{\mathbf{c},\mathbf{a},\mathbf{b}\} = \mathbf{0}$ 与三元导子律。在截面曲率 $K = +1$ 的单位圆球面 $S^3$ 标准正交切标架下，黎曼曲率张量字面上就等于这枚三元括号（在 do Carmo 曲率约定 $R(X,Y)Z = \nabla_{[X,Y]}Z - [\nabla_X, \nabla_Y]Z$ 下 $R(\mathbf{a}, \mathbf{b})\mathbf{c} = +\{\mathbf{a}, \mathbf{b}, \mathbf{c}\}$；在 Lee 约定 $R(X,Y)Z = [\nabla_X, \nabla_Y]Z - \nabla_{[X,Y]}Z$ 下为 $-\{\mathbf{a}, \mathbf{b}, \mathbf{c}\}$；若改用单位球上模长为 $\frac{1}{2}$ 的生成元 $[\mathbf{e}_a, \mathbf{e}_b] = \varepsilon_{abc}\mathbf{e}_c$，双不变列维-奇维塔联络 $\nabla_X Y = \frac{1}{2}[X,Y]$ 给出 $R(X,Y)Z = \pm\frac{1}{4}[[X,Y], Z]$；无穷小李三元系为 $\mathrm{SU}(2)$ 与 $\mathrm{SO}(3)$ 局部共享，全局旋量双覆盖由流群拓扑承载）。

::: {.viz src="ternion-nonlinear-synthesis-sandbox" preset="prufer-baer-heap-torsor" height="500"}
无原点流群与李三元曲率卡：沿路径 $x \to 1 \to z$ 推进琥珀中继桥点 $y$，实时对照紫色三元搬运 $[x, y, z]$（在 $y = 1$ 处 $[\mathbf{i}, \mathbf{1}, \mathbf{j}] = +\mathbf{k}$）与首尾对调翻号 $[z, y, x]$（$[\mathbf{j}, \mathbf{1}, \mathbf{i}] = -\mathbf{k}$），并核对单位球截面曲率 $K = +1$ 与李三元括号 $\{\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_1\} = +\mathbf{e}_2$（流群与李三元文献标 `ARGUED`，分量对账标 `NUM`，原生三元语法标 `MODEL`）。
:::

我们将五种非线性无损表示统一收束为如下形式模型定义与八款冻结定理支撑：

::: {.definition #def-ch39-five-nonlinear-ternion-representations title="原生三元数的五种三自由度非线性无损表示与三元流群体系（模型定义）"}
对无外置标量轴的原生三元数流形 $\mathbb{T}_3 \equiv \Delta\mathcal{T}_\epsilon \cong S^3 \cong \mathrm{SU}(2)$（`MODEL`），定义以下五种不依赖 $4 \times 4$ 线性矩阵加法的三自由度表示与合成体系：

1. **李代数球指数—BCH 表示**：$\boldsymbol{\theta} \in \overline{B}_{2\pi}(\mathbb{R}^3)/\partial\overline{B}_{2\pi}(\mathbb{R}^3)$，配精确半角叉乘弯曲合成 $\boldsymbol{\theta}_A \star \boldsymbol{\theta}_B$；
2. **双卡有理修正罗德里格斯表示**：有界球实矢 $\boldsymbol{\sigma} \in B_1(\mathbb{R}^3)$ 配 $1\;\mathrm{bit}$ 旋量叶标志位 $\epsilon_{\mathrm{sheet}} \in \{\pm 1\}$（或南北球极双图册 $(\boldsymbol{\sigma}_h, h)$），配纯四则有理分式合成与赤道反演；
3. **霍普夫主圆丛表示**：可见布洛赫基底 $(\vartheta, \varphi) \in S^2$ 配分片盲区纤维相位 $\psi_\pm \in S^1$（$\psi_- - \psi_+ = \varphi$）及联络 $A_\pm = \frac{1}{2}(\pm 1 - \cos\vartheta)d\varphi$；
4. **汉密尔顿无坐标球面转角表示**：单位球面有向大圆弧等价类 $T(P_1 \curvearrowright P_2) = -P_2 P_1$（含对跖半圆弧等同类 $-\mathbf{1}$），配共顶点消去合成 $T(P_2 \curvearrowright P_3)T(P_1 \curvearrowright P_2) = T(P_1 \curvearrowright P_3)$（及对偶最短门球面角盈和乐）；
5. **无原点普吕弗—贝尔流群与李三元系表示**：齐性流形 $(\mathbb{T}_3, [\cdot,\cdot,\cdot])$ 上的三元搬运算子 $[x, y, z] = x y^{-1} z$，配切空间李三元曲率括号 $\{\mathbf{a}, \mathbf{b}, \mathbf{c}\} = (\mathbf{a}\cdot\mathbf{c})\mathbf{b} - (\mathbf{b}\cdot\mathbf{c})\mathbf{a}$。
:::

::: {.theorem #thm-ch39-nonlinear-ternion-representations-and-torsor title="自旋因子叉乘分类、拉格朗日—格拉姆模守恒、最短门旋子与球面三角和乐、三点与多点单比特巴格曼环路积、双轴旋转有限字及圆周双覆盖路径提升定理" lean="D5/S3/Quantum/SpinFactor/OriginalClassification.complete_consequences,D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity,D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.rotor_shortest_gate,D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.shortest_gate_triangle_holonomy,D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch,D5/S3/Quantum/Information/BargmannImaginaryMaximizers.bargmann_path_product,D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word,D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift"}
在所钉 `trureturing` 冻结声明集中，以下八项支撑弯曲圆弧合成、最短旋子输运、球面三角相位与双覆盖路径提升的数学定理同时成立：

1. **四维自旋因子上三维有向叉乘的分类与泡利接口**（[`complete_consequences`](lean:D5/S3/Quantum/SpinFactor/OriginalClassification.complete_consequences)）：在 $E = \mathbb{R} \times \mathbb{R}^3$ 上，任意满足 `P2 D` 与 `PB D` 的二元映射皆存在定向 $\varepsilon \in \{+1, -1\}$ 使一切 $a, b \in E$ 满足 $D(a, b) = \operatorname{crossD}(\varepsilon, a, b)$，并同时满足后果集 `Consequences D` 与泡利矩阵接口 `MatrixInterfaces`；
2. **实向量拉格朗日—格拉姆二阶反对称余子式恒等式**（[`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)）：对有限指标集上的实向量 $u, v : \iota \to \mathbb{R}$，恒有 $\lVert u\rVert^2\lVert v\rVert^2 - \langle u, v\rangle^2 = \frac{1}{2}\sum_{i,j}(u_i v_j - u_j v_i)^2$（在三维单位轴下即 $(\hat{\mathbf{u}}_A\cdot\hat{\mathbf{u}}_B)^2 + \lVert\hat{\mathbf{u}}_A\times\hat{\mathbf{u}}_B\rVert^2 = 1$）；
3. **非对跖单位方向间的测地最短旋子门幺正性与轴搬运**（[`rotor_shortest_gate`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.rotor_shortest_gate)）：对任意非对跖三维单位向量 $u, v$（$v \neq -u$），最短旋子 $\operatorname{rotor}(u, v)$ 属于 $2 \times 2$ 幺正群，将泡利组合轴 $\operatorname{pauliCombination}(u)$ 共轭搬运至 $\operatorname{pauliCombination}(v)$，且在归一化初始 $+1$ 本征态（$\operatorname{qubitProjector}(u)\psi = \psi$）上与归一化投影搬运一致；
4. **三步（一般非对易）最短旋子门闭合回路的球面三角和乐**（[`shortest_gate_triangle_holonomy`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.shortest_gate_triangle_holonomy)）：两两非对跖单位方向 $a, b, c$ 的三步最短旋子乘积精确等于 $(S_{abc}^2 + D_{abc}^2)^{-1/2}\bigl(S_{abc}I_2 - i D_{abc}\operatorname{pauliCombination}(a)\bigr)$，且赋予归一化起点 $+1$ 本征态（$\operatorname{qubitProjector}(a)\psi = \psi$）$\mathrm{U}(1)$ 返回相位 $\frac{S_{abc} - i D_{abc}}{\sqrt{S_{abc}^2 + D_{abc}^2}}$；
5. **单比特三顶点巴格曼迹的实标量与有向体积分解**（[`triple_bargmann_bloch`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch)）：对任意三维实向量 $a, b, c$，单比特布洛赫三点巴格曼迹等于 $\frac{1}{4}(S_{abc} + i D_{abc})$，其中 $S_{abc} = 1 + a\cdot b + b\cdot c + c\cdot a$，$D_{abc} = a\cdot(b\times c)$；
6. **单比特多顶点投影环路迹与旋量内积循环乘积恒等式**（[`bargmann_path_product`](lean:D5/S3/Quantum/Information/BargmannImaginaryMaximizers.bargmann_path_product)）：对 $\mathbb{C}^2$ 中非空有限向量链，其外积算符有序乘积的迹精确等于相邻态矢内积的闭环乘积（一般维数外积链的同类收缩可由线性代数直接推广）；
7. **不共线双圆弧轴有限字完备生成 $\mathrm{SO}(3)$**（[`two_axis_finite_word`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word)）：任意两支不共线三维轴上的单参数旋转圆有限乘积满射生成全部三维正交旋转（配同模块局部至全局运动轴不变性 [`moving_axis_invariance`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.moving_axis_invariance)）；
8. **圆周平方双覆盖唯一路径历史提升与 $360^\circ$ 对跖变号**（[`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift)，配无连续全局截面 [`no_continuous_global_section`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section)）：在圆周平方覆盖 `Circle → Circle` 上，给定兼容覆盖起点，每条连续底路径皆具唯一连续提升，且从 $+1$ 绕底圆一整圈精确停在对跖负叶 $-1$。
:::

::: proof
第 1、4、7、8 款证明同 [@thm-ch39-ternion-spin-factor-and-number-projections] 第 1、4、3、6–7 款。第 2 款展开双重求和 $\sum_{i,j}(u_i v_j - u_j v_i)^2 = 2(\sum_i u_i^2)(\sum_j v_j^2) - 2(\sum_i u_i v_i)^2$ 除以 $2$ 即得。第 3 款直接核验 $\operatorname{rotor}(u,v)\operatorname{rotor}(u,v)^\dagger = I_2$、泡利代数共轭恒等式 $\operatorname{rotor}(u,v)(u\cdot\boldsymbol{\sigma})\operatorname{rotor}(u,v)^\dagger = v\cdot\boldsymbol{\sigma}$ 及对归一化 $+1$ 本征态（$\operatorname{qubitProjector}(u)\psi = \psi$）的投影一致性。第 5 款将 $P_u = \frac{1}{2}(I_2 + u\cdot\boldsymbol{\sigma})$ 代入 $\operatorname{Tr}(P_a P_b P_c)$ 并应用 $\operatorname{Tr}\bigl((a\cdot\boldsymbol{\sigma})(b\cdot\boldsymbol{\sigma})(c\cdot\boldsymbol{\sigma})\bigr) = 2i\,a\cdot(b\times c)$ 即得 $\frac{1}{4}(S_{abc} + i D_{abc})$。第 6 款在 $\mathbb{C}^2$ 上利用外积结合律 $\lvert\psi_k\rangle\langle\psi_k\rvert\psi_{k+1}\rangle = \langle\psi_k\mid\psi_{k+1}\rangle\lvert\psi_k\rangle$ 逐拍缩并并取矩阵迹完成归纳。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch39-bch-mrp-hopf-turns-torsor-literature title="BCH 公式、修正罗德里格斯参数、霍普夫—庞加莱琼斯光学、汉密尔顿转角、普吕弗—贝尔流群与李三元系文献及物理硬件边界"}
**文献归属与物理实现边界。** 本节五种非线性表示的经典数学源流与物理硬件适用域如下：

1. **李群指数 BCH 合成、双线性可除代数维数禁律与修正罗德里格斯参数（MRP）**（G. Frobenius, 1878；H. Hopf, 1940；R. Bott & J. Milnor, *Bull. Amer. Math. Soc.* **64**, 87–89, 1958；M. Kervaire, *Proc. Natl. Acad. Sci. USA* **44**, 280–283, 1958；O. Rodrigues, 1840；A. Cayley, *J. Reine Angew. Math.* **32**, 119–123, 1846；J. E. Campbell, 1897；H. F. Baker, 1905；F. Hausdorff, 1906；T. F. Wiener, *Sc.D. Thesis*, MIT, 1962；S. R. Marandi & V. J. Modi, *Acta Astronaut.* **15**, 833–843, 1987, DOI [10.1016/0094-5765(87)90038-5](https://doi.org/10.1016/0094-5765(87)90038-5)；H. Schaub & J. L. Junkins, *J. Astronaut. Sci.* **44**(1), 1–19, 1996；G. Terzakis, M. Lourakis & D. Ait-Boudaoud, *J. Math. Imaging Vis.* **60**, 422–442, 2018, DOI [10.1007/s10851-017-0765-x](https://doi.org/10.1007/s10851-017-0765-x)）：确立双线性可除代数 $1, 2, 4, 8$ 维数限制、$\mathfrak{su}(2)$ 闭式合成、$\boldsymbol{\sigma} = \tan(\frac{\theta}{4})\hat{\mathbf{u}}$ 纯有理乘法矩阵与 $\lVert\boldsymbol{\sigma}\rVert = 1$ 阴影切换；
2. **霍普夫纤维化、汉密尔顿球面转角与琼斯偏振光学**（W. R. Hamilton, *Lectures on Quaternions*, Hodges & Smith, Dublin, 1853；H. Hopf, *Math. Ann.* **104**, 637–665, 1931, DOI [10.1007/BF01457962](https://doi.org/10.1007/BF01457962)；L. C. Biedenharn & J. D. Louck, *Angular Momentum in Quantum Physics*, Addison-Wesley, 1981；M. V. Berry, *Proc. R. Soc. Lond. A* **392**, 45–57, 1984；R. Simon, N. Mukunda & E. C. G. Sudarshan, *Pramana — J. Phys.* **32**, 769–792, 1989, DOI [10.1007/BF02845998](https://doi.org/10.1007/BF02845998)）：无损双折射波片级联实现 $\mathrm{SU}(2)$ 琼斯旋子合成（纯强度斯托克斯—穆勒测量会抹去公共光学相位与 $\pm 1$ 旋量叶，完整旋量读取需保留干涉参考支）；纳米磁隧道结（MTJ）中的磁矩进动服从朗道—栗弗席兹—吉尔伯特（LLG）方程（基底态位于 $S^2$ 且含吉尔伯特阻尼耗散，J. C. Sankey et al., *Nat. Phys.* **4**, 67–71, 2008, DOI [10.1038/nphys783](https://doi.org/10.1038/nphys783)），在短于阻尼弛豫时间的相干脉冲窗口内近似实现球面圆弧旋转；
3. **无原点流群（*Schar* / Heap）与李三元系曲率几何**（H. Prüfer, *Math. Z.* **20**, 165–187, 1924, DOI [10.1007/BF01188079](https://doi.org/10.1007/BF01188079)；R. Baer, *J. Reine Angew. Math.* **160**, 199–207, 1929, DOI [10.1515/crll.1929.160.199](https://doi.org/10.1515/crll.1929.160.199)；É. Cartan, *Bull. Soc. Math. France* **54**, 214–264, 1926；É. Cartan & J. A. Schouten, *Proc. Akad. Wetensch. Amsterdam* **29**, 803–815, 1926；O. Loos, *Symmetric Spaces I: General Theory*, Benjamin, 1969；N. Jacobson, *Amer. J. Math.* **71**, 149–170, 1949, DOI [10.2307/2372102](https://doi.org/10.2307/2372102)；M. P. do Carmo, *Riemannian Geometry*, 1992；J. M. Lee, *Introduction to Riemannian Manifolds*, 2nd ed., 2018, DOI [10.1007/978-3-319-91755-9](https://doi.org/10.1007/978-3-319-91755-9)）：确立无单位元群的三元流群等价性与对称空间切丛李三元曲率；将双卡有理算子用于重构深度神经网络属本书几何计算架构模型（`MODEL`，详见下一节 [§37.1](ch39-s22-ternion-field-transformer-and-rational-rotor-dynamics.md)）。
:::

下面我们在四联八位小数精确审计中，对五种非线性表示在正交四分周圆弧合成、纯有理分数对账、正卦限球面三角转角与非交换流群搬运上的数值一致性逐一验算：

::: {.example #ex-ch39-five-nonlinear-ternion-representations-audit title="五种非线性表示同构核验：BCH 对平直脱轨误差、纯有理双卡 MRP 合成、正卦限转角和乐与流群三元搬运算例"}
我们对同一组三元数非阿贝尔圆弧合成作跨范式精确对账（`手工推导` / `NUM`，80 位精度复核）：

1. **第一联：指数 BCH 弯曲合成对比平直向量加法脱轨误差（`NUM`）**：
   取两支正交 $90^\circ$ 圆弧向量 $\boldsymbol{\theta}_A = (\frac{\pi}{2}, 0, 0)$、$\boldsymbol{\theta}_B = (0, \frac{\pi}{2}, 0)$（半角 $\alpha = \beta = \frac{\pi}{4}$）。精确 BCH 公式给出 $W = \cos\gamma = \frac{1}{2}$、$\mathbf{V} = \frac{1}{2}(1, 1, 1)$（模方 $W^2 + \lVert\mathbf{V}\rVert^2 = \frac{1}{4} + \frac{3}{4} = 1.00000000$），即合成半角 $\gamma = \frac{\pi}{3}$（空间转角 $120^\circ$），精确合成向量为 $\boldsymbol{\theta}_C = \boldsymbol{\theta}_A \star \boldsymbol{\theta}_B = \frac{2\pi}{3\sqrt{3}}(1, 1, 1) \approx (1.20919958, 1.20919958, 1.20919958)$；若误用平直向量加法 $\boldsymbol{\theta}_{\mathrm{lin}} = \boldsymbol{\theta}_A + \boldsymbol{\theta}_B = (\frac{\pi}{2}, \frac{\pi}{2}, 0) \approx (1.57079633, 1.57079633, 0)$，不仅漏掉第三轴 $z$ 分量，参数空间欧氏误差达 $\lVert\boldsymbol{\theta}_{\mathrm{lin}} - \boldsymbol{\theta}_C\rVert \approx \mathbf{1.31288539\;\mathrm{rad}}$，投回 $S^3$ 的内禀测地误差达 $\mathbf{0.54410876\;\mathrm{rad}}$（约 $31.17513557^\circ$），而四维平直弦和模方更直接越出球壳：$\lVert q_A + q_B\rVert^2 = 2 + 2\cdot\frac{1}{2} = \mathbf{3.00000000} \neq 1$。

2. **第二联：零超越函数纯有理 MRP 合成与双卡跨越 $180^\circ \to 360^\circ$ 旋量叶对账（`手工推导`）**：
   MRP 坐标有理时，单位提升也有理，所得空间旋转构成 $\operatorname{Ad}(S^3(\mathbb Q))$。例如 $(1,1,0,0)$ 代表的四分之一转具有有理矩阵，但其单位提升需要 $\sqrt{2}$。取纯有理输入 $\boldsymbol{\sigma}_A = (\frac{1}{2}, 0, 0)$、$\boldsymbol{\sigma}_B = (0, \frac{1}{2}, 0) \in B_1(\mathbb{Q}^3)$（对应 $Q(\boldsymbol{\sigma}_A) = (\frac{3}{5}, \frac{4}{5}, 0, 0)$，$Q(\boldsymbol{\sigma}_B) = (\frac{3}{5}, 0, \frac{4}{5}, 0)$）。纯四则有理公式一步算出分母 $1 + \frac{1}{16} - 0 = \frac{17}{16}$，分子 $\frac{3}{4}(\frac{1}{2}, 0, 0) + \frac{3}{4}(0, \frac{1}{2}, 0) + 2(0, 0, \frac{1}{4}) = (\frac{3}{8}, \frac{3}{8}, \frac{1}{2})$，故

   $$
   \boldsymbol{\sigma}_A \star \boldsymbol{\sigma}_B \;=\; \left(\frac{6}{17},\; \frac{6}{17},\; \frac{8}{17}\right), \qquad Q(\boldsymbol{\sigma}_{AB}) \;=\; \left(\frac{9}{25},\; \frac{12}{25},\; \frac{12}{25},\; \frac{16}{25}\right), \qquad R(\boldsymbol{\sigma}_{AB}) \;=\; \frac{1}{625}\begin{pmatrix} -175 & 0 & 600 \\ 576 & -175 & 168 \\ 168 & 600 & 49 \end{pmatrix} \in \mathrm{SO}(3, \mathbb{Q}),
   $$

   全程仅用整数加减乘除，三列正交归一（如第三列模方 $\frac{600^2 + 168^2 + 49^2}{625^2} = \frac{360000 + 28224 + 2401}{390625} = 1$，首末两列内积 $\frac{-105000 + 96768 + 8232}{625^2} = 0$，$\det R = +1$）。再沿固定轴 $\hat{\mathbf{e}}_1$ 将 $\theta$ 从 $0^\circ$ 扫过 $180^\circ, 270^\circ, 360^\circ$：在 $270^\circ$ 处主卡 $\tan(67.5^\circ) = \sqrt{2}+1 \approx 2.41421356 > 1$，阴影反演将其折回 $\boldsymbol{\sigma}^S = -(\sqrt{2}-1)\hat{\mathbf{e}}_1 \approx (-0.41421356, 0, 0)$ 并翻转叶标志 $\epsilon_{\mathrm{sheet}} = -1$，解码 $\epsilon_{\mathrm{sheet}} Q(\boldsymbol{\sigma}^S) = (-\frac{\sqrt{2}}{2}, \frac{\sqrt{2}}{2}, 0, 0)$ 分毫不差；至 $360^\circ$ 时 $(\boldsymbol{\sigma}^S, \epsilon_{\mathrm{sheet}}) = (\mathbf{0}, -1)$ 精确复原旋量对跖极 $-\mathbf{1}$。

3. **第三联：正卦限球面三角形 $+z \to +x \to +y \to +z$ 上的转角消去与半角角盈和乐（`手工推导`）**：
   取正卦限三正交顶点 $P_1 = \mathbf{k},\; P_2 = \mathbf{i},\; P_3 = \mathbf{j}$（内角皆为 $\frac{\pi}{2}$，吉拉尔球面角盈 $\Omega = \frac{\pi}{2} + \frac{\pi}{2} + \frac{\pi}{2} - \pi = \frac{\pi}{2} \approx 1.57079633\;\mathrm{sr}$）。汉密尔顿转角给出 $T_{12} = -\mathbf{i}\mathbf{k} = +\mathbf{j}$、$T_{23} = -\mathbf{j}\mathbf{i} = +\mathbf{k}$，共顶点消去得 $T_{23}T_{12} = \mathbf{k}\mathbf{j} = -\mathbf{i} = -\mathbf{j}\mathbf{k} = T_{13}$，三边闭环 $T_{31}T_{23}T_{12} = (-\mathbf{k}\mathbf{j})(-\mathbf{i}) = \mathbf{i}(-\mathbf{i}) = +\mathbf{1}$；与此同时，三步最短旋子门 `shortest_gate_triangle_holonomy`（$S = 1,\; D = +1$）给出起点本征态返回相位 $\frac{1 - i}{\sqrt{2}} = e^{-i\pi/4} = e^{-i\Omega/2}$，恰与霍普夫联络沿第一卦限边界积分 $\oint A_+ = \int_0^{\pi/2}\frac{1}{2}(1 - 0)\,d\varphi = \frac{\pi}{4}$（相移 $e^{-i\pi/4}$）一致。

4. **第四联：流群无原点搬运与李三元曲率核验（`手工推导`）**：
   在 $(\mathbb{T}_3, [\cdot,\cdot,\cdot])$ 上，$[\mathbf{i}, \mathbf{1}, \mathbf{j}] = \mathbf{i}\mathbf{1}^{-1}\mathbf{j} = +\mathbf{k}$ 而首尾互换得 $[\mathbf{j}, \mathbf{1}, \mathbf{i}] = -\mathbf{k}$；任换参照原点 $g \in \mathbb{T}_3$，$[g\mathbf{i}, g\mathbf{1}, g\mathbf{j}] = g\mathbf{i}\cdot\mathbf{1}g^{-1}\cdot g\mathbf{j} = g\mathbf{k}$ 协变守恒；切空间单位正交基上 $\{\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_1\} = (\mathbf{e}_1\cdot\mathbf{e}_1)\mathbf{e}_2 - (\mathbf{e}_2\cdot\mathbf{e}_1)\mathbf{e}_1 = +\mathbf{e}_2$，精确给出单位 $S^3$ 沿 $(\mathbf{e}_1, \mathbf{e}_2)$ 二维切面的截面曲率 $\langle\{\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_1\}, \mathbf{e}_2\rangle = +1.00000000$。
:::

我们将五种非线性无损表示范式的数学载体、参数开销、合成机制与物理硬件契合度总括如下（单行单元格排版）：

| 非线性表示范式 | 核心数学载体 | 参数开销 | 非线性合成机制 | 奇点结构与物理 / 计算硬件特性 |
| :--- | :--- | :---: | :--- | :--- |
| **1. 指数 BCH 表示** | 李代数球 $\overline{B}_{2\pi}(\mathbb{R}^3)/\partial\overline{B}_{2\pi}$ | $3$ 实数 | 半角三角函数配叉乘折回 | 边界球面缩为 $-\mathbf{1}$（$\mathrm{SO}(3)$ 为对径认同），零矩阵冗余 |
| **2. 双卡有理罗德里格斯** | 有界单位球实矢 $\boldsymbol{\sigma} \in B_1(\mathbb{R}^3)$ | $3$ 实数 $+$ $1\;\mathrm{bit}$ | 纯加减乘除有理分式与反演 | 零超越函数，天然有界 $[-1,1]$，宜定点数字硅芯片 |
| **3. 霍普夫主圆丛** | 可见基底 $S^2$ 配盲区纤维 $S^1$ | $3$ 角度坐标 | 球面联络 $A_\pm$ 加半角相移 | 契合相干激光庞加莱偏振加相位波片光速合成 |
| **4. 球面三角转角** | 无坐标大圆弧等价类 $P_1\curvearrowright P_2$ | $3$ 球面自由度 | 共顶点消去与最短门角盈 | 纯成对关系几何，零笛卡尔背景坐标架依赖 |
| **5. 三元流群与李三元系** | 无原点齐性流形配三元括号 | 内禀 $3$ 维流形 | 三元搬运 $[x,y,z]$ 与曲率门 | 根除特权实轴 $\mathbf{1}$ 预设，切括号字面等同黎曼曲率 |

凝视上表指明的两条物理与计算进路（`MODEL` + `文献结果`）：在光子物理硬件中，相干光脉冲的琼斯偏振—相位态穿过双折射波片即在零次浮点运算下完成三元数合成；而在硅基数字计算中，**双卡有理修正罗德里格斯乘法**、**球面非阿贝尔角盈**、**无原点三元流群搬运 $[x, y, z]$** 与**李三元曲率括号 $\{\mathbf{a}, \mathbf{b}, \mathbf{c}\}$** 这四件纯有理几何工具不仅将在后文[第 37 章](ch37-ternion-field-transformer-and-geodesic-intelligence.md)（[§37.1](ch39-s22-ternion-field-transformer-and-rational-rotor-dynamics.md)）直接重铸三元数场 Transformer（TFT），更直接推开了本章后半翼（[§32.5](ch39-s29-constant-free-rational-axiom-omega.md)–[§32.8](ch39-s36-lean4-zero-axiom-omega-math-architecture.md)）的无常数有理与零公理数学重铸之旅！接下来，让我们步入 **[§32.5 拔除笛卡尔线性钉子与无常数有理重构](ch39-s29-constant-free-rational-axiom-omega.md)**——查明为何 $\pi, e, \varphi$ 只是平直近似留下的欠条，继而在 [§32.6](ch39-s34-exact-structural-mathematics-vs-flat-approximation.md)–[§32.8](ch39-s36-lean4-zero-axiom-omega-math-architecture.md) 中立起无无穷、无超越数的有限有理数学 $\mathbf{Math}_\Omega$ 与 Lean 4 零公理基座 `OmegaMath`，再翻开第八部压轴之卷 **[第三十三章 万力归弧与极小圆弧场大统一（AF-GUT）](ch33-unified-arc-forces-and-af-gut.md)**！

::: {.viz src="ternion-nonlinear-synthesis-sandbox" height="620"}
完整实验室：在“无原点三元合成本体读法”与“五种非线性李群与流群几何读法”双透镜间切换，拖动琥珀手柄（球内卡调节 $B$，球面卡调节顶点 $P_3$）或滑动 $\theta_A, \theta_B, \chi$，实时对照 BCH 弯曲球叉乘折回、双卡有理 MRP 分式与阴影反演、霍普夫纤维半角相移、汉密尔顿球面转角与普吕弗—贝尔流群搬运。八条冻结声明、数值对账、文献边界与模型读法在依据栏与理论抽屉中分层标注。
:::
