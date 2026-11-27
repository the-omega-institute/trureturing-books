# 33.5 绕向奇偶与正矢高合成：规范相消、引力类比与动力学边界 {#sec-ch34-interaction-sign-and-sagitta-composition}

在 [§29.5](ch34-s04-infinitesimal-trihedron.md#sec-ch34-infinitesimal-spherical-trihedron)、[§33.2](ch34-s14-lorentz-and-standard-model-octave.md#sec-ch34-lorentz-pseudoscalar-and-sm-octave) 与 [§33.4](ch34-s16-coset-breaking-and-conservation.md#sec-ch34-coset-breaking-conservation-towers) 中，我们将极小三角弧面体 $\Delta\mathcal{T}_\epsilon$ 同时视作规范联络和乐与时空曲率角超的共同微观原胞（`MODEL`）。一旦把两种相互作用放回同一枚原胞上对照，一个关乎宏观宇宙结构的核心物理分野便迎面而来：**为什么电磁与非阿贝尔规范相互作用天然容许正负异号荷（$\pm q$、色与反色），从而在宏观大块物质中相互屏蔽成电中性与色单态；唯独引力源在静态宏观尺度下从不正负抵消，纵使微观耦合极弱，却能跨天文尺度持续累加而主宰星系与宇宙结构？**

要诚实回答这一问题，绝不能拿一句含混的“曲率恒正所以万物相吸”敷衍过关，而必须把**运动学奇偶恒等式**与**动力学传播子假设**逐层剥离开来：在单枚球面三面角原胞 $\Delta\mathcal{T}_\epsilon$ 上，哪些正负抵消律与偶次非负残差确实已经由内积—克利福德几何严格锁定？反过来，仅凭局部正定矢高 $d(\epsilon) \ge 0$ 与格拉姆体积正定性，为什么**不足以**自动推出四维洛伦兹自旋-$2$ 场的普适吸引号、零质量长程 $1/r$ 传播律以及随粒子种类跨越六个数量级的引力—静电力强弱比？本节以精确代数推导与四个显式反例给出完整划界。

## 33.5.1 绕向奇偶与阶次分离：有向和乐相消与偶正定矢高残差 {#sec-ch34-24-1}

回到 [§29.5](ch34-s04-infinitesimal-trihedron.md#sec-ch34-infinitesimal-spherical-trihedron) 的单位球面 $S^2 \subset \mathbb{R}^3$ 坐标设定：固定直角转枢射线 $\mathbf{z}_0 := \mathbf{e}_2 = (0, 1, 0)$，对步长角 $\epsilon \in (0, \frac{\pi}{2}]$，沿两面互相垂直的坐标墙 $\mathbf{e}_2 \wedge \mathbf{e}_1$ 与 $\mathbf{e}_2 \wedge \mathbf{e}_3$ 取墙面单位射线

$$
\mathbf{z}_0 \;=\; (0, 1, 0), \qquad \mathbf{x}_\epsilon \;=\; (\sin\epsilon, \cos\epsilon, 0), \qquad \mathbf{y}_\epsilon \;=\; (0, \cos\epsilon, \sin\epsilon).
$$

比较算子 $\mathrm{CMP}(\mathbf{u}, \mathbf{v}) = \langle\mathbf{u}, \mathbf{v}\rangle\mathbf{1} + \mathbf{u}\wedge\mathbf{v}$ 在同一枚原胞上同时给出两类截然不同的几何读数——**奇绕向有向读数**与**偶对称正定残差**：

1. **开放单步 $O(\epsilon)$ 横向奇振幅与闭合三态 $O(\epsilon^2)$ 巴格曼绕向奇虚部**：
   先看沿第一面坐标墙的单步开放弧 $\mathbf{z}_0 \to \mathbf{x}_{\sigma\epsilon} = (\sigma\sin\epsilon, \cos\epsilon, 0)$（$\sigma \in \{+1, -1\}$ 标记沿墙迈步的左右定向）。其两槽比较展开为 $\mathrm{CMP}(\mathbf{z}_0, \mathbf{x}_{\sigma\epsilon}) = \cos\epsilon\,\mathbf{1} + q_\sigma(\epsilon)\,(\mathbf{e}_2\wedge\mathbf{e}_1)$，其中一阶横向有向振幅

   $$
   q_\sigma(\epsilon) \;:=\; \sigma\sin\epsilon \;=\; \sigma\epsilon - \frac{\sigma}{6}\epsilon^3 + O(\epsilon^5), \qquad q_+(\epsilon) + q_-(\epsilon) \;=\; 0,
   $$

   是关于定向号 $\sigma$ 的严格**奇函数**。再看由秩一纯态投影 $P(\mathbf{r}) = \frac{1}{2}(I_2 + \mathbf{r}\cdot\boldsymbol{\sigma})$ 构成的闭合三态回路：记 $\sigma = +1$ 对应右手正序回路 $(\mathbf{x}_\epsilon, \mathbf{z}_0, \mathbf{y}_\epsilon)$，$\sigma = -1$ 对应交换两面侧墙支腿 $\mathbf{x}_\epsilon \leftrightarrow \mathbf{y}_\epsilon$ 后的反向绕行回路 $(\mathbf{y}_\epsilon, \mathbf{z}_0, \mathbf{x}_\epsilon)$。直接计算标量内积与标量三重积，有 $\mathbf{x}_\epsilon\cdot\mathbf{z}_0 = \mathbf{z}_0\cdot\mathbf{y}_\epsilon = \cos\epsilon$、$\mathbf{x}_\epsilon\cdot\mathbf{y}_\epsilon = \cos^2\epsilon$，且因 $\mathbf{z}_0 \times \mathbf{y}_\epsilon = (\sin\epsilon, 0, 0)$，混合积满足 $\mathbf{x}_\epsilon\cdot(\mathbf{z}_0 \times \mathbf{y}_\epsilon) = +\sin^2\epsilon$ 而互换支腿后 $\mathbf{y}_\epsilon\cdot(\mathbf{z}_0 \times \mathbf{x}_\epsilon) = -\sin^2\epsilon$。于是三态巴格曼不变量精确等于

   $$
   B_\sigma(\epsilon) \;=\; \frac{(1 + \cos\epsilon)^2}{4} \;+\; i\sigma\,\frac{\sin^2\epsilon}{4}, \qquad B_-(\epsilon) \;=\; \overline{B_+(\epsilon)}, \qquad \operatorname{Im} B_+(\epsilon) + \operatorname{Im} B_-(\epsilon) \;=\; 0.
   $$

2. **闭合回路中“绕向反转”与“双腿步长同取负号”的关键对称性辨析**：
   在分析 $B_\sigma(\epsilon)$ 的符号时，有一处极易混淆的代数陷阱必须当场挑明：如果在 $\mathbf{x}_\epsilon = (\sin\epsilon, \cos\epsilon, 0)$ 与 $\mathbf{y}_\epsilon = (0, \cos\epsilon, \sin\epsilon)$ 上**同时施加参数反号 $\epsilon \mapsto -\epsilon$**，两条支腿变为 $(-\sin\epsilon, \cos\epsilon, 0)$ 与 $(0, \cos\epsilon, -\sin\epsilon)$。这一变换恰好等价于绕转枢轴 $\mathbf{z}_0 = \mathbf{e}_2$ 作 $180^\circ$ **正常欧氏旋转** $R_{\mathbf{e}_2}(\pi) = \operatorname{diag}(-1, +1, -1) \in \mathrm{SO}(3)$（$\det R_{\mathbf{e}_2}(\pi) = +1$）！由于标量三重积在一切 $\mathrm{SO}(3)$ 正常旋转下严格不变，$(-\sin\epsilon)(-\sin\epsilon) = +\sin^2\epsilon$ 的双负号相乘使 $B_\sigma(-\epsilon) = B_\sigma(\epsilon)$ **原封不动、毫不反号**。真正令闭合和乐虚部反号（$B_+ \leftrightarrow B_-$）的操作，必须是行列式为 $-1$ 的**非正常反射或环路绕向反转**：要么互换两条墙支腿的遍历先后次序 $\mathbf{x}_\epsilon \leftrightarrow \mathbf{y}_\epsilon$，要么仅翻转单条支腿的步长符号 $(\epsilon_1, \epsilon_2) \mapsto (-\epsilon_1, +\epsilon_2)$（使混合积 $\sin\epsilon_1\sin\epsilon_2$ 精确反号）。

3. **绕向偶对称的非负径向矢高 $d(\epsilon)$ 与格拉姆面积/体积亏损**：
   与上述一阶开放奇振幅 $q_\sigma(\epsilon) = O(\epsilon)$ 及二阶闭合绕向奇虚部 $\operatorname{Im} B_\sigma(\epsilon) = O(\epsilon^2)$ 形成鲜明对照，比较算子的偶对称标量部 $S(\mathbf{z}_0, \mathbf{x}_{\sigma\epsilon}) = \cos\epsilon$ 相对于单位自配对基准 $S(\mathbf{z}_0, \mathbf{z}_0) = 1$ 必然产生非负的**径向矢高亏损（radial sagitta）**，并伴随二态面积残差与三态格拉姆体积残差：

   $$
   d(\epsilon) \;:=\; 1 - \cos\epsilon \;=\; 2\sin^2\frac{\epsilon}{2} \;=\; \frac{\epsilon^2}{2} - \frac{\epsilon^4}{24} + O(\epsilon^6) \;\ge\; 0, \qquad \det G(\mathbf{x}_\epsilon, \mathbf{z}_0, \mathbf{y}_\epsilon) \;=\; (1 - \cos^2\epsilon)^2 \;=\; \sin^4\epsilon \;\ge\; 0.
   $$

   无论单步定向取 $\sigma = +1$ 还是 $\sigma = -1$，无论回路沿右手还是左手绕行，$d(\epsilon)$、$1 - \cos^2\epsilon = \sin^2\epsilon$ 与 $\det G(\epsilon) = \sin^4\epsilon$ 全都是偶次平方量，在 $(0, \frac{\pi}{2}]$ 上严格为正且对 $\sigma \mapsto -\sigma$ 与 $\epsilon \mapsto -\epsilon$ 完全不变。

::: {.remark #rem-ch34-parity-versus-order-contract title="绕向奇偶、双腿符号变换与偶正定格拉姆残差的形式化契约"}
本小节使用的四项核心运动学恒等式均由 Lean 内核定理精确锚定，其适用范围与模型诠释边界严格划定如下：

1. **三态巴格曼布洛赫分解与八分卦限定向反号**：定理 [triple_bargmann_bloch](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch) 对任意三支三维实向量 $\mathbf{r}_1, \mathbf{r}_2, \mathbf{r}_3 \in \mathbb{R}^3$ 给出精确分解 $\operatorname{tripleBargmann}(\mathbf{r}_1, \mathbf{r}_2, \mathbf{r}_3) = \frac{1}{4}(1 + \mathbf{r}_1\cdot\mathbf{r}_2 + \mathbf{r}_2\cdot\mathbf{r}_3 + \mathbf{r}_3\cdot\mathbf{r}_1) + \frac{i}{4}\,\mathbf{r}_1\cdot(\mathbf{r}_2 \times \mathbf{r}_3)$；定理 [explicit_qubit_orientation](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.explicit_qubit_orientation) 在正交八分极限 $\epsilon = \frac{\pi}{2}$ 处直接核验单轴反向 $(0, 1, 0) \mapsto (0, -1, 0)$ 将三态不变量由 $\frac{1 + i}{4}$ 共轭翻转为 $\frac{1 - i}{4}$。代入 $(\mathbf{x}_\epsilon, \mathbf{z}_0, \mathbf{y}_\epsilon)$ 及其支腿互换回路 $(\mathbf{y}_\epsilon, \mathbf{z}_0, \mathbf{x}_\epsilon)$，即得 $B_\sigma(\epsilon) = \frac{(1+\cos\epsilon)^2}{4} + i\sigma\frac{\sin^2\epsilon}{4}$（回路遍历反转 $\sigma \mapsto -\sigma$ 令 $O(\epsilon^2)$ 虚部精确反号，而双支腿同时反号 $\epsilon \mapsto -\epsilon$ 属 $\mathrm{SO}(3)$ 半周正常旋转，保持 $B_\sigma$ 完全不变）。
2. **三锚格拉姆行列式与拉格朗日—格拉姆平方和恒等式**：定理 [three_anchor_gram_det_formula](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula) 在任意实内积空间上给出三向量格拉姆行列式展开 $\det G(u, v, w) = \lVert u\rVert^2\lVert v\rVert^2\lVert w\rVert^2 + 2\langle u, v\rangle\langle u, w\rangle\langle v, w\rangle - \lVert u\rVert^2\langle v, w\rangle^2 - \lVert v\rVert^2\langle u, w\rangle^2 - \lVert w\rVert^2\langle u, v\rangle^2$；定理 [lagrange_gram_identity](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity) 给出二元柯西—比内平方和残差 $(\sum_i u_i^2)(\sum_i v_i^2) - (\sum_i u_i v_i)^2 = \frac{1}{2}\sum_{i,j}(u_i v_j - u_j v_i)^2 \ge 0$。作用于单位射线组 $(\mathbf{x}_\epsilon, \mathbf{z}_0, \mathbf{y}_\epsilon)$，即锁定二态面积亏损 $1 - \cos^2\epsilon = \sin^2\epsilon \ge 0$ 与三态体积亏损平方 $\det G(\epsilon) = \sin^4\epsilon \ge 0$（连同径向矢高 $d(\epsilon) = 1 - \cos\epsilon = 2\sin^2(\epsilon/2) \ge 0$）全为绕向偶对称非负量（并见 [@thm-ch34-trihedron-cochain-and-moving-axis]）。
3. **显式特殊角 $\epsilon = \frac{\pi}{6}$ 数值对账（`手工推导`）**：取 $\epsilon = \frac{\pi}{6}$（$\sin\frac{\pi}{6} = \frac{1}{2}$，$\cos\frac{\pi}{6} = \frac{\sqrt{3}}{2}$），有向奇可观测量给出开放横向振幅 $q_\pm(\frac{\pi}{6}) = \pm\frac{1}{2} = \pm 0.5000$（$q_+ + q_- = 0$）与闭合和乐虚部 $\operatorname{Im} B_\pm(\frac{\pi}{6}) = \pm\frac{1}{16} = \pm 0.0625$（$\operatorname{Im} B_+ + \operatorname{Im} B_- = 0$，实部同为 $\operatorname{Re} B_\pm(\frac{\pi}{6}) = \frac{7 + 4\sqrt{3}}{16} \approx 0.870513$）；而偶对称非负残差则一致保持严格正值：$d(\frac{\pi}{6}) = 1 - \frac{\sqrt{3}}{2} \approx 0.133975 > 0$，$1 - \cos^2\frac{\pi}{6} = \frac{1}{4} = 0.2500 > 0$，$\det G(\frac{\pi}{6}) = \frac{1}{16} = 0.0625 > 0$。将奇绕向相消对应规范荷屏蔽、将独立原胞偶矢高累加类比引力源不可屏蔽性，属于本书的跨层物理诠释（`MODEL`）。
:::

## 33.5.2 合成法则分岔与四个动力学反例检核 {#sec-ch34-24-2}

既然在单枚原胞上 $d(\epsilon) = 2\sin^2(\epsilon/2) > 0$ 且 $\det G(\epsilon) = \sin^4\epsilon > 0$ 恒不取负值，我们能否就此宣称“仅凭比较公理的局部运动学正定性，已经无假设推出了万有引力的普适 $1/r$ 吸引定律”？答案是**绝对不能**（参见[附录 E §E.4](appendix-e-s04-metric-and-gram-curvature.md#sec-appe-geometry)、[§E.6](appendix-e-s06-spacetime-gauge-and-thermodynamics.md#sec-appe-spacetime) 与 [§E.7](appendix-e-s07-intermediate-hypotheses-audit.md#sec-appe-audit-table)）。局部标量残差非负只是“正源同号”的运动学必要前提；一旦混淆合成规则或忽略场传播子与相对论应力，立刻会撞上下列四个精确反例：

::: {.example #ex-ch34-orientation-and-composition-countermodels title="独立原胞源可加性与引力动力学欠定的四个手工反例"}
**手工推导。** 以下四个显式算例逐一标定了局部运动学矢高 $d(\epsilon) \ge 0$ 通往宏观相互作用定律时不可省略的物理桥接条件：

1. **反例 (i) 独立原胞源广延相加 vs. 单态串行逆门相消、电偶极多极余场与非阿贝尔 $\mathrm{SU}(3)_c$ 色单态禁闭**：
   - *两种截然相反的合成法则*：设两枚**空间分离的独立原胞** $\mathcal{C}_1, \mathcal{C}_2$ 各自承载步长 $\epsilon > 0$、绕向相反的局域激发 $(\sigma_1, \sigma_2) = (+1, -1)$。对广延局域源求和时，奇绕向荷精确归零，$q_+(\epsilon) + q_-(\epsilon) = 0$ 且 $\operatorname{Im} B_+(\epsilon) + \operatorname{Im} B_-(\epsilon) = 0$，而偶对称径向矢高严格累加为

     $$
     d_{\mathrm{sep}}(\epsilon, -\epsilon) \;=\; d(\epsilon) + d(-\epsilon) \;=\; 2(1 - \cos\epsilon) \;=\; 4\sin^2\frac{\epsilon}{2} \;>\; 0.
     $$

     反之，若在**同一量子纯态上串行复合互逆幺正逻辑门** $\hat{U}(\epsilon) = \exp(-\frac{\epsilon}{2}\mathbf{e}_1\mathbf{e}_2)$ 与 $\hat{U}(-\epsilon) = \exp(+\frac{\epsilon}{2}\mathbf{e}_1\mathbf{e}_2)$，群乘法给出 $\hat{U}(-\epsilon)\hat{U}(\epsilon) = \mathbf{1}$，净转角严格归零，合成后的单态净矢高为

     $$
     d_{\mathrm{seq}}(\epsilon, -\epsilon) \;=\; d(0) \;=\; 1 - \cos 0 \;=\; 0!
     $$

     因此，“正负微扰的矢高不抵消”仅在**跨独立原胞（或退相干独立历史）的广延源可加律**下成立，绝不适用于单一相干态上的可逆门串行乘积。
   - *电磁多极余场与非阿贝尔色单态机制差异*：即便在阿贝尔静电学中，相距 $\mathbf{s} \neq \mathbf{0}$ 的异号点电荷 $+q$ 与 $-q$ 也只消去了远场 $O(r^{-2})$ 单极通量，仍留下非零电偶极矩 $\mathbf{p} = q\mathbf{s}$ 及其 $O(r^{-3})$ 偶极电场与正静电能；而在非阿贝尔 $\mathrm{SU}(3)_c$ 强相互作用（[§33.2](ch34-s14-lorentz-and-standard-model-octave.md#sec-ch34-lorentz-pseudoscalar-and-sm-octave)）中，宏观色中性根本不是标量正负号相加，而是张量积表示论中的单态投影（介子 $\mathbf{3}\otimes\bar{\mathbf{3}} = \mathbf{1}\oplus\mathbf{8}$ 与重子 $\mathbf{3}\otimes\mathbf{3}\otimes\mathbf{3} = \mathbf{1}\oplus\mathbf{8}\oplus\mathbf{8}\oplus\mathbf{10}$）配合红外色禁闭（[§33.2](ch34-s14-lorentz-and-standard-model-octave.md#sec-ch34-lorentz-pseudoscalar-and-sm-octave) [@ex-ch34-lorentz-budget-and-sm-octave-benchmark]）！

2. **反例 (ii) 静态汤川势族 $U_{\sigma,\mu}(r)$ 对吸引/排斥符号与力程的双重欠定**：
   取两枚携带严格正矢高源 $d_1, d_2 > 0$（对等步长原胞即 $d_1 = d_2 = d(\epsilon) > 0$）的局域原胞，考察由总体符号 $\sigma \in \{+1, -1\}$ 与质量屏蔽参数 $\mu \ge 0$ 索引的静态中心势族（耦合常数 $\kappa > 0$）：

   $$
   U_{\sigma,\mu}(r) \;=\; \sigma\,\kappa\,d_1 d_2\,\frac{e^{-\mu r}}{r}, \qquad \sigma \in \{+1, -1\}, \quad \mu \ge 0.
   $$

   在单原胞上令 $d_1 = d_2 = d > 0$ 即化为 $U_{\sigma,\mu}(r) = \sigma\kappa d^2 e^{-\mu r}/r$。源强乘积恒正 $d^2 > 0$ 仅保证“全宇宙同类正源具有统一的相互作用符号”，却对以下两项动力学参数完全沉默：(a) 它**不锁定吸引号 $\sigma = -1$**——在相对论场论中，同号正荷通过奇数自旋（自旋-$1$ 矢量场）静态交换产生普适**排斥**（$\sigma = +1$），唯有偶数自旋（自旋-$0$ 标量或自旋-$2$ 张量）交换才给出普适**吸引**（$\sigma = -1$）；(b) 它**不锁定零质量长程律 $\mu = 0$**——若传播媒介具有非零质量隙 $\mu > 0$（如 [§33.4](ch34-s16-coset-breaking-and-conservation.md#sec-ch34-coset-breaking-conservation-towers) [@ex-ch34-ccwz-electroweak-skyrmion-meissner-benchmark] 中的电弱 $W^\pm/Z^0$ 玻色子或核力 $\pi$ 介子），即使源恒正，宏观天体尺度 $r \gg \mu^{-1}$ 上的相互作用仍会指数归零！

3. **反例 (iii) 三维欧氏正四面体拼合中的正负双号雷吉（Regge）铰链角亏**：
   单枚球面原胞 $\Delta\mathcal{T}_\epsilon$ 的吉拉尔角超 $\Omega(\epsilon) > 0$ 恒正，是否意味着由平直单纯形拼合出的离散空间曲率也必然处处恒正？在三维欧氏正四面体中，任意两面夹角（二面角）精确等于

   $$
   \theta_{\mathrm{tet}} \;=\; \arccos\!\left(\frac{1}{3}\right) \;\approx\; 1.230959\;\mathrm{rad} \;\approx\; 70.5288^\circ.
   $$

   围绕同一条内部公共棱（余维 $2$ 铰链）拼合 $m$ 枚全等正四面体时，雷吉角亏 $\delta_m := 2\pi - m\,\theta_{\mathrm{tet}}$ 随配位数 $m$ 直接改变正负号：
   - 当配位数 $m = 5$ 时，$\delta_5 = 2\pi - 5\arccos(1/3) \approx 6.283185 - 6.154797 = +0.128388\;\mathrm{rad} > 0$（正曲率椭圆角亏，测地线局部汇聚）；
   - 当配位数 $m = 6$ 时，$\delta_6 = 2\pi - 6\arccos(1/3) \approx 6.283185 - 7.385756 = -1.102571\;\mathrm{rad} < 0$（负曲率双曲角超，测地线局部发散）！

   这直接证明：多原胞单纯形骨架上的离散雷吉曲率天然是**有正有负的带号几何量**，单原胞格拉姆体积正定性 $\det G > 0$ 绝不蕴涵宏观离散曲率恒正。

4. **反例 (iv) 弗里德曼—勒梅特—罗伯逊—沃克（FLRW）宇宙学中的负压强加速膨胀**：
   在 $3+1$ 维广义相对论中，均匀各向同性宇宙标度因子 $a(t)$ 的二阶弗里德曼（雷乔杜里）加速方程为

   $$
   \frac{\ddot{a}}{a} \;=\; -\frac{4\pi G}{3}\!\left(\rho + \frac{3p}{c^2}\right).
   $$

   即便局部能量密度严格为正（$\rho > 0$），只要相对论主压强取真空暗能量状态方程 $p = -\rho c^2$，有效主动引力质量密度即翻转为 $\rho + 3p/c^2 = -2\rho < 0$，从而给出 $\ddot{a}/a = +\frac{8\pi G}{3}\rho > 0$ 的**宇宙学加速排斥**！可见在洛伦兹时空中，决定测地线汇聚或发散的并非单纯静止标量密度 $\rho > 0$，而是完整二阶能动张量 $T_{\mu\nu}$ 的迹组合。
:::

## 33.5.3 自旋-2 普适吸引定理、粒子种类层级表与引力动力学开放边界 {#sec-ch34-24-3}

通过上述四重反例检核，比较几何在相互作用符号问题上的真实贡献与诚实边界已经一目了然：在运动学底层，$\Delta\mathcal{T}_\epsilon$ 确实内生区分了“随绕向反号的一阶/二阶有向相位荷”与“绕向偶对称的非负二阶矢高及四阶体积残差”；但要从这枚离散运动学种子跨入真实的宏观万有引力，物理学依赖的是**洛伦兹协变无质量自旋-$2$ 传播结构**与**粒子物理标准模型的质量生成机制**。

::: {.remark #rem-ch34-spin2-and-species-hierarchy title="无质量自旋-2 普适耦合定理、视界热力学与粒子种类引力静电力层级表"}
**文献结果，未在本书形式化（配 CODATA 数值对账 `NUM`）。** 将局部偶矢高类比延伸至相对论引力理论时，必须严格对齐以下经典场论定理与实验量级表：

1. **温伯格软定理、德泽尔自耦合、温伯格—威滕禁戒、雷吉离散引力与雅各布森视界状态方程**：
   - *自旋-$1$ 荷守恒对自旋-$2$ 等效原理与普适吸引*：S. Weinberg（*Phys. Rev.* **135**, B1049, 1964, DOI [10.1103/PhysRev.135.B1049](https://doi.org/10.1103/PhysRev.135.B1049)）由洛伦兹不变性与无质量散射振幅软极点规范不变性严格证明：螺旋度 $\pm 1$ 光子软因子要求总荷守恒 $\sum_a q_a = 0$（容许异号电荷屏蔽），而螺旋度 $\pm 2$ 无质量引力子软因子迫使一切粒子以**完全相同的普适常数 $\kappa$** 耦合于其四动量 $p^\mu$（等效原理的量子场论起源，且令 $\mu = 0$），同时正能态之间的二阶对称张量交换精确给出静态吸引号 $\sigma = -1$；S. Deser（*Gen. Relativ. Gravit.* **1**, 9, 1970）进一步证明平坦背景上自洽自相互作用的无质量自旋-$2$ 场唯一重求和为完整的非线性爱因斯坦—希尔伯特作用量。
   - *复合无质量自旋-$2$ 场的平直背景禁戒*：S. Weinberg 与 E. Witten（*Phys. Lett. B* **96**, 59, 1980）证明：在任何具备洛伦兹协变守恒能动张量 $T^{\mu\nu}$ 的四维庞加莱协变场论中，不存在携带非零引力矩阵元的螺旋度 $\lvert h\rvert > 1$ 无质量基本粒子或复合粒子——这意味着任何企图在**固定平直闵可夫斯基背景上直接把引力子拼成普通复合激发**的捷径均被严格封死，时空微分同胚几何本身必须与物质同步涌现。
   - *离散铰链作用量与局域视界热力学路线*：T. Regge（*Nuovo Cimento* **19**, 558, 1961）提出无坐标单纯形引力作用量 $S_{\mathrm{Regge}} = \frac{c^3}{8\pi G}\sum_h A_h \delta_h$，以余维 $2$ 铰链面积 $A_h$ 加权带号角亏 $\delta_h$；T. Jacobson（*Phys. Rev. Lett.* **75**, 1260, 1995, DOI [10.1103/PhysRevLett.75.1260](https://doi.org/10.1103/PhysRevLett.75.1260)）则证明，若局域林德勒（Rindler）因果视界满足克劳修斯关系 $\delta Q = T\,dS$ 且纠缠熵正比于视界面积 $\delta S = \eta\,\delta\mathcal{A}$，由雷乔杜里测地线聚焦方程即可反推出爱因斯坦场方程 $R_{\mu\nu} - \frac{1}{2}R g_{\mu\nu} + \Lambda g_{\mu\nu} = \frac{8\pi G}{c^4}T_{\mu\nu}$（牛顿常数由 $G = \frac{c^3}{4\hbar\eta}$ 标定）。
   - *相交零锥一阶引力代数量子化与闭合迹有限性边界*：V. Chandrasekaran（*An algebraic quantization of gravity from the null cone*, [arXiv:2611.34924v1](https://arxiv.org/html/2611.34924v1), 2026）从经典四维一阶 Plebański 真空引力出发，在相交零锥上求解零约束，将角面面积密度 $\mathscr{A}/(8\pi G_N)$ 与局域相对助推快度配对为引力边模式共轭荷，并给出有限耦合下绝对收敛、而在 $g = 4G_N\hbar/\mathscr{A} \to 0^+$ 三阶微扰展开时呈调和对数发散 $-i\sum_{k=1}^N 1/k$ 的相位重求和模型 $\frac{g^2}{2}\sum_{k\ge 1} e^{-2ikg}/k^2$。对照本书的严格边界审计须同时标明：该框架自顶向下预设四维光滑纯真空广义相对论与 $G_N$（不含标准模型物质场），其 I 型因子表示依赖人工选取纯态延拓 $\omega$（不同延拓的酉等价性仍开放），有限 $G_N,\hbar$ 下非对易时钟投影非空性保留经典 Wigner 启发式，且第 5.2 节的有限维循环重排反证与不连通热迹论证需要独立的闭合迹迹类有限性或重排不变性前提——在无穷维 $\ell^2(\mathbb{N})$ 基上，耗尽全空间的对称截断网与 $r$-循环重排网对同一有界减除可观测量分别趋于 $+2N \to +\infty$ 与 $(4-r)N \to -\infty$（$r \ge 5$），而不连通联合截面的无序绝对可和性恰等价于热迹 $\sum_i w_i < \infty$ 本身；当额外具备正迹类下界 $c\mathbf{1} \le W$（$c > 0$）时，确可严格推出 $\dim\mathcal{H} \le \operatorname{Tr}(W)/c < \infty$。
2. **随粒子种类剧烈跳变的引力—静电力无量纲比值表（`NUM`）**：
   对任意两颗携带基本电荷量值 $\lvert q_1\rvert = \lvert q_2\rvert = e$、静止质量分别为 $m_1, m_2$ 的粒子，牛顿引力与库仑静电力在同一间距 $r$ 处的比值与距离无关，精确等于

   $$
   \left\lvert\frac{F_G}{F_E}\right\rvert \;=\; \frac{G\,m_1 m_2}{e^2 / (4\pi\varepsilon_0)} \;=\; \frac{G\,m_1 m_2}{\alpha(0)\,\hbar c} \;=\; \frac{m_1 m_2}{\alpha(0)\,m_{\mathrm{Pl}}^2},
   $$

   其中 CODATA 2022 零动量精细结构常数 $\alpha(0)^{-1} \approx 137.035999$（$\alpha(0) \approx 7.297353\times 10^{-3}$），普朗克质量 $m_{\mathrm{Pl}} = \sqrt{\hbar c / G} \approx 1.220890\times 10^{19}\;\mathrm{GeV}/c^2$，电子质量 $m_e \approx 0.510999\;\mathrm{MeV}/c^2$，质子质量 $m_p \approx 938.272089\;\mathrm{MeV}/c^2$（$m_p / m_e \approx 1836.15267$）。下表列出三种典型带电粒子对的精确 CODATA 2022 量级对比：

| 粒子对组合 | 静电耦合基准 | 质量乘积来源机制 | 无量纲力强比 $\lvert F_G / F_E\rvert = G m_1 m_2 / (\alpha(0)\hbar c)$ | 相对 $e\text{--}e$ 放大倍数 |
| :--- | :---: | :--- | :---: | :---: |
| **电子—电子（$e\text{--}e$）** | $\alpha(0)\hbar c$ | 纯电弱希格斯—电子汤川耦合 $y_e^2 v^2 / 2$ | $2.40 \times 10^{-43}$ | $1$ |
| **电子—质子（$e\text{--}p$）** | $\alpha(0)\hbar c$ | 电弱轻子汤川质量 $\times$ 非微扰 QCD 强子束缚能 | $4.41 \times 10^{-40}$ | $m_p / m_e \approx 1.84 \times 10^3$ |
| **质子—质子（$p\text{--}p$）** | $\alpha(0)\hbar c$ | 近 $99\%$ 源于 $\mathrm{SU}(3)_c$ 胶子场强与夸克迹反常标度 $\Lambda_{\mathrm{QCD}}^2$ | $8.09 \times 10^{-37}$ | $(m_p / m_e)^2 \approx 3.37 \times 10^6$ |

   这张数值表一针见血地封堵了任何“用单一普适步长角 $\epsilon_*$ 的几何比值 $d(\epsilon_*)/\sin\epsilon_* = \tan(\epsilon_*/2)$ 直接算出引力强弱比”的企图：三组粒子对携带**完全相同的单位电荷量值 $e$**，但 $\lvert F_G / F_E\rvert$ 却随粒子种类横跨 **$3.37 \times 10^6$ 倍**！原因在于引力耦合于粒子的惯性/引力质量 $m_a$，而电子质量由电弱汤川矩阵元决定、质子质量主要由非微扰 QCD 动态标度生成——不先解决普朗克标度 $m_{\mathrm{Pl}}$ 归一化与标准模型质量谱起源，单凭纯运动学原胞角度不可能敲定这组跨六个数量级的比值。
:::

上述围绕零锥闭合迹有限性、循环重排边界及有限耦合相位重求和的泛函分析结论，已在内核严格验证为以下定理：

::: {.theorem #thm-ch34-closed-trace-finiteness-and-phase-resummation title="迹类下界有限维界、循环重排异号发散反例、联合截面可和充要条件与相位重求和发散" lean="D5/S3/Quantum/Analysis/NullConeGravity/ClosedTraceFinitenessBoundary.finiteDimensional_and_finrank_le_of_isTraceClass_lower_bound, D5/S3/Quantum/Analysis/NullConeGravity/ClosedTraceFinitenessBoundary.finiteDimensional_and_finrank_range_le_of_isTraceClass_lower_bound, D5/S3/Quantum/Analysis/NullConeGravity/ClosedTraceFinitenessBoundary.cycle_rearrangement_sign_flip, D5/S3/Quantum/Analysis/NullConeGravity/ClosedTraceFinitenessBoundary.disjoint_joint_cut_summable_iff, D5/S3/Quantum/Analysis/NullConeGravity/NonperturbativePhaseResummation.summable_and_norm_le_modeTerm, D5/S3/Quantum/Analysis/NullConeGravity/NonperturbativePhaseResummation.iteratedDeriv_three_partialPhaseSum_zero, D5/S3/Quantum/Analysis/NullConeGravity/NonperturbativePhaseResummation.tendsto_neg_im_cubic_coeff_atTop"}
1. **正迹类一致下界的有限维与精确维数上界**（[`finiteDimensional_and_finrank_le_of_isTraceClass_lower_bound`](lean:D5/S3/Quantum/Analysis/NullConeGravity/ClosedTraceFinitenessBoundary.finiteDimensional_and_finrank_le_of_isTraceClass_lower_bound)、[`finiteDimensional_and_finrank_range_le_of_isTraceClass_lower_bound`](lean:D5/S3/Quantum/Analysis/NullConeGravity/ClosedTraceFinitenessBoundary.finiteDimensional_and_finrank_range_le_of_isTraceClass_lower_bound)）：在任意复希尔伯特空间 $\mathcal{H}$ 上，若正迹类算符 $W \ge 0$ 对常数 $c > 0$ 满足 $c\lVert x\rVert^2 \le \operatorname{Re}\langle x, W x\rangle$（或正迹类 $C \ge 0$ 在星投影 $p$ 的值域上满足该下界），则 $\mathcal{H}$（或 $\operatorname{ran} p$）必有限维且维数至多为 $\operatorname{Re}(\operatorname{Tr} W)/c$（或 $\operatorname{Re}(\operatorname{Tr} C)/c$）。
2. **无穷维循环重排异号发散反例**（[`cycle_rearrangement_sign_flip`](lean:D5/S3/Quantum/Analysis/NullConeGravity/ClosedTraceFinitenessBoundary.cycle_rearrangement_sign_flip)）：对任意整数 $r \ge 5$，在无穷维基 $\mathbb{N}$ 上存在 $r$ 阶循环置换 $V_r$，使得耗尽全空间的对称截断 `symCut N` 与 $V_r$-不变的 $r$-循环并截断 `cycCut r N` 均强收敛于恒等算符，但同一有界减除核的闭合截断振幅满足 $\mathrm{cutAmplitudeX}(\mathrm{symCut}\;N) = 2N \to +\infty$ 而 $\mathrm{cutAmplitudeX}(\mathrm{cycCut}\;r\;N) = (4 - r)N \le -N \to -\infty$。
3. **不连通联合截面可和的精确充要条件**（[`disjoint_joint_cut_summable_iff`](lean:D5/S3/Quantum/Analysis/NullConeGravity/ClosedTraceFinitenessBoundary.disjoint_joint_cut_summable_iff)）：对任意非负序列 $w : \mathbb{N} \to \mathbb{R}$ 与非退化有限概率分布 $v$（满足 $p = \sum_{a\in I} v_a \in (0, 1)$），乘积项 $f(i, a) = w_i v_a (\mathbf{1}_I(a) - p)$ 在每条纤维上恒有 $\sum_a f(i, a) = 0$ 与纤维 $L^1$ 范数 $2p(1-p)w_i$，且 $f$ 在 $\mathbb{N} \times \alpha$ 上无序可和**当且仅当** $\sum_i w_i$ 可和。
4. **有限耦合相位重求和绝对收敛与零耦合三阶调和发散**（[`summable_and_norm_le_modeTerm`](lean:D5/S3/Quantum/Analysis/NullConeGravity/NonperturbativePhaseResummation.summable_and_norm_le_modeTerm)、[`iteratedDeriv_three_partialPhaseSum_zero`](lean:D5/S3/Quantum/Analysis/NullConeGravity/NonperturbativePhaseResummation.iteratedDeriv_three_partialPhaseSum_zero)、[`tendsto_neg_im_cubic_coeff_atTop`](lean:D5/S3/Quantum/Analysis/NullConeGravity/NonperturbativePhaseResummation.tendsto_neg_im_cubic_coeff_atTop)）：对每个实耦合 $g \in \mathbb{R}$，振荡级数 $F(g) = \sum_{k=0}^\infty \frac{g^2}{2(k+1)^2} e^{-2i(k+1)g}$ 绝对收敛且满足 $\lVert F(g)\rVert \le g^2$；但对每个有限截断 $F_N(g)$，其在 $g = 0$ 处的三阶泰勒系数恰为 $-i\sum_{k=0}^{N-1} \frac{1}{k+1}$，随 $N \to \infty$ 调和发散至 $+\infty$。
:::

::: proof
第 1 款在任意正交规范基上用一致下界把有限子集基数压在 $\operatorname{Re}(\operatorname{Tr} W)/c$ 之下，从而导出基有限与 `Module.finrank` 上界（投影情形限制于 $\operatorname{ran} p$ 的正交规范基）。第 2 款显式构造 $\mathbb{N} \times \mathrm{Fin}\,r \simeq \mathbb{N}$ 的分块循环双射（每组含 $1$ 个奇数指标与 $r - 1$ 个偶数指标），直接计算两种截断的基数与配对核之和。第 3 款在每条有限纤维上直接展开 $\sum_a v_a(\mathbf{1}_I(a) - p) = 0$ 与 $\sum_a |v_a(\mathbf{1}_I(a) - p)| = 2p(1-p)$，再由非负项级数的乘积可和性推出充要等价。第 4 款以 $p$-级数 $\sum (k+1)^{-2} \le 2$ 控制绝对收敛与一致上界，并对有限和逐项三次求导得 $-i H_N$ 后应用调和级数发散定理。完整证明由 Lean 内核检查。
:::

进一步，当对闭合截面振幅补充显式有限正性锚点 $F_0$ 时，上述无限维循环重排障碍可严格修复为如下定量维数封顶与单侧尾模定理：

::: {.theorem #thm-ch34-quantitative-closed-cut-repair title="循环并最优方差界、有限正性锚点维数封顶与不连通联合截面单侧尾模" lean="D5/S3/Quantum/Analysis/NullConeGravity/QuantitativeClosedCutBound.optimal_cycle_union_area_variance_bound, D5/S3/Quantum/Analysis/NullConeGravity/QuantitativeClosedCutBound.finite_and_card_fiber_le_of_eventually_positive, D5/S3/Quantum/Analysis/NullConeGravity/QuantitativeClosedCutBound.finrank_le_of_eventually_positive_cycle_cuts, D5/S3/Quantum/Analysis/NullConeGravity/QuantitativeClosedCutBound.disjoint_joint_cut_one_sided_tail_bound"}
1. **循环并加权面积方差的精确最优上界**（[`optimal_cycle_union_area_variance_bound`](lean:D5/S3/Quantum/Analysis/NullConeGravity/QuantitativeClosedCutBound.optimal_cycle_union_area_variance_bound)）：对非空有限指标集 $s$、子集 $I \subseteq s$、权重 $w_i \in [c, 1]$（$c > 0$）、带内偏差 $\le d$ 与带外偏差 $\le D$（$0 \le d \le D$），若带外基数满足 $|s \setminus I|\,r \le |s|$（$r \ge 1$），则加权均方偏差严格满足
   $$
   \frac{\sum_{i\in s} w_i (\mathrm{val}_i - s_0)^2}{\sum_{i\in s} w_i} \;\le\; d^2 + \frac{D^2 - d^2}{1 + c(r - 1)},
   $$
   且该常数对 $1$ 个权 $1$ 偏差 $D$ 的带外项配 $r - 1$ 个权 $c$ 偏差 $d$ 的带内项精确取等。
2. **有限正性锚点下的谱带容量与总维数定量上界**（[`finite_and_card_fiber_le_of_eventually_positive`](lean:D5/S3/Quantum/Analysis/NullConeGravity/QuantitativeClosedCutBound.finite_and_card_fiber_le_of_eventually_positive)、[`finrank_le_of_eventually_positive_cycle_cuts`](lean:D5/S3/Quantum/Analysis/NullConeGravity/QuantitativeClosedCutBound.finrank_le_of_eventually_positive_cycle_cuts)）：设复希尔伯特空间 $\mathcal{H}$ 具有分入 $m$ 个谱带的希尔伯特基、权重 $w_i \in [c, 1]$、满足 $K^2(d^2 + D^2/(rc)) \le \delta^2/4$（$r \ge 2$）的助推方差上界；若存在有限锚点集 $F_0$（记 $q = |F_0|$、$q_j = |F_0 \cap \mathrm{band}_j|$）使得对一切含 $F_0$ 的非空有限截断 $F$ 均有闭合振幅 $\mathrm{cutoffAmplitude}(F) > 0$，则 $\mathcal{H}$ 必有限维，每个谱带基数至多为 $\max(1, q_j + (r - 1)(q - q_j)) - 1$，且总维数满足 $q = 0 \implies \dim\mathcal{H} = 0$，对 $q > 0$ 有
   $$
   \dim_{\mathbb{C}} \mathcal{H} \;\le\; q\bigl[1 + (m - 1)(r - 1)\bigr] - m.
   $$
3. **不连通联合截面的精确单侧尾模**（[`disjoint_joint_cut_one_sided_tail_bound`](lean:D5/S3/Quantum/Analysis/NullConeGravity/QuantitativeClosedCutBound.disjoint_joint_cut_one_sided_tail_bound)）：对非负序列 $w : \mathbb{N} \to \mathbb{R}$、满足 $p = \sum_{a\in I} v_a \in (0, 1)$ 的有限分布 $v$ 及任意已完成的有限纤维集 $J \subset \mathbb{N}$，任取落在 $J$ 之外的有限对集 $S \subset (\mathbb{N}\setminus J)\times\alpha$，其带号联合截面和恒满足精确界
   $$
   \Bigl\lvert\sum_{x\in S} f(x)\Bigr\rvert \;\le\; p(1 - p)\sum_{i\in \pi_1(S)} w_i,
   $$
   且正负两侧单边事件矩形 $K \times I$ 与 $K \times (\alpha \setminus I)$ 分别精确取到 $\pm p(1 - p)\sum_{i\in K} w_i$。
:::

::: proof
第 1 款把带内权下界 $W_{\mathrm{in}} \ge c(r-1)|s\setminus I|$ 与带外权上界 $W_{\mathrm{out}} \le |s\setminus I|$ 联立得 $W_{\mathrm{out}}/W_s \le (1 + c(r-1))^{-1}$，再用权重凸组合导出最优常数并显式在 $\mathrm{Finset.range}\;r$ 上验证取等。第 2 款反证：若某谱带至少含 $q_j + (r-1)(q-q_j)$ 个基元，则保留 $F_0$ 并在该谱带内为每个带外锚点配齐 $r-1$ 个新基元形成满足带外比例 $\le 1/r$ 的有限扩充集 $F \supseteq F_0$，代入已冻结方差界 [`cycle_union_area_variance_bound`](lean:D5/S3/Quantum/Analysis/NullConeGravity/ClosedTraceFinitenessBoundary.cycle_union_area_variance_bound) 导出 $\mathrm{cutoffAmplitude}(F) \le 0$ 矛盾；对 $m$ 个谱带求和即得总维数上界。第 3 款按第一坐标分组并利用单纤维正部和与负部和恰为 $\pm p(1-p)w_i$ 导出双侧精确取等与一般有限子集上界。完整证明由 Lean 内核检查。
:::

在通往四维洛伦兹无质量自旋-$2$ 几何运动学的第一步上，四维代数曲率张量的正交分解与零锥横截屏（null screen）潮汐重构的精确阈值亦已由 Lean 内核严格验证：

::: {.theorem #thm-ch34-weyl-null-screen-reconstruction title="四维代数曲率分解与五条零光线 Weyl 潮汐重构定理" lean="D5/S3/Geometry/Lorentz/WeylNullScreen.finrank_algebraicCurvature4, D5/S3/Geometry/Lorentz/WeylNullScreen.finrank_weyl4, D5/S3/Geometry/Lorentz/WeylNullScreen.finrank_tracelessRicci4, D5/S3/Geometry/Lorentz/WeylNullScreen.null_tidal_ricci_invariance, D5/S3/Geometry/Lorentz/WeylNullScreen.weyl_null_screen_sampling, D5/S3/Geometry/Lorentz/WeylNullScreen.weyl_null_screen_zero, D5/S3/Geometry/Lorentz/WeylNullScreen.weyl_null_screen_vanishing"}
1. **四维代数曲率空间的不可约正交分解**（[`finrank_algebraicCurvature4`](lean:D5/S3/Geometry/Lorentz/WeylNullScreen.finrank_algebraicCurvature4)、[`finrank_weyl4`](lean:D5/S3/Geometry/Lorentz/WeylNullScreen.finrank_weyl4)、[`finrank_tracelessRicci4`](lean:D5/S3/Geometry/Lorentz/WeylNullScreen.finrank_tracelessRicci4)，经由显式线性同构 [`curvature_ricci_split`](lean:D5/S3/Geometry/Lorentz/WeylNullScreen.curvature_ricci_split) 与 [`weyl_electric_magnetic_equiv`](lean:D5/S3/Geometry/Lorentz/WeylNullScreen.weyl_electric_magnetic_equiv)）：四维洛伦兹代数曲率空间满足显式实线性同构 $\mathrm{AlgebraicCurvature}_4 \simeq \mathrm{Weyl}_4 \times \mathrm{TracelessRicci}_4 \times \mathbb{R}$，维数满足精确分解 $20 = 10 + 9 + 1$；其中 $10$ 维外尔（Weyl）子空间通过电—磁潮汐对同构于 $\mathrm{Sym}^2_0(\mathbb{R}^3) \times \mathrm{Sym}^2_0(\mathbb{R}^3)$，并携带等价于 $5$ 维复空间的自对偶复结构（$4$ 次射影多项式 $\mathrm{WeylQuartic}$）。
2. **零屏潮汐张量的里奇无关性**（[`null_tidal_ricci_invariance`](lean:D5/S3/Geometry/Lorentz/WeylNullScreen.null_tidal_ricci_invariance)）：对任意未来零光线 $r$ 及其正交类空二维屏标架 $(e_0, e_1)$，全曲率张量 $R$ 在该二维屏上诱导的对称无迹潮汐分量与纯外尔部分 $W$ 完全重合，里奇与标量曲率分量严格消去，每条零光线提供恰好 $2$ 个实自旋-$2$（复 $1$ 维）潮汐偏振读数。
3. **精确的五条零光线重构阈值与四光线盲区**（[`weyl_null_screen_sampling`](lean:D5/S3/Geometry/Lorentz/WeylNullScreen.weyl_null_screen_sampling)、[`weyl_null_screen_zero`](lean:D5/S3/Geometry/Lorentz/WeylNullScreen.weyl_null_screen_zero)、[`weyl_null_screen_vanishing`](lean:D5/S3/Geometry/Lorentz/WeylNullScreen.weyl_null_screen_vanishing)）：对任意 $N$ 条互异的未来零光线，联合零屏潮汐采样算符满足精确实秩公式 $\operatorname{rank}_{\mathbb{R}} = \min(10, 2N)$ 与核维数 $\max(0, 10 - 2N)$。特别地，**任意 $5$ 条互异未来零光线**上的无迹潮汐测量即可唯一忠实重构完整的 $10$ 维四维外尔曲率（全为零当且仅当 $C = 0$）；相反，对**任意 $N \le 4$ 条零光线**，均存在非零外尔张量在其全部横截屏上的潮汐读数为零。
:::

::: proof
在 $6$ 维二形式对基上将第一比安基恒等式与洛伦兹里奇迹写成显式线性约束，先由电—磁分解构造 $\mathrm{Weyl}_4 \simeq \mathrm{Sym}^2_0(\mathbb{R}^3)^2$ 与 $20 = 10 + 9 + 1$ 分解，再借助立体投影把未来零光线参数化为天球 $\widehat{\mathbb{C}} = \mathrm{Option}\,\mathbb{C}$，将每条零光线上的复潮汐读数与次数 $\le 4$ 复多项式的射影求值严格等同。由此，对互异的 $N$ 条零光线，拉格朗日插值与范德蒙满射/单射直接给出精确秩 $\min(10, 2N)$ 与 $N = 5$ 时的忠实重构；当 $N \le 4$ 时，以这 $N$ 个射影点为根的非零四次多项式之逆像即构成显式非零盲区外尔张量。该定理严格锁定四维纯引力自旋-$2$ 曲率的零锥代数运动学，而连续统动力学场方程、能动张量耦合及 $G_N$ 标定仍属下列开放问题。完整证明由 Lean 内核检查。
:::

进一步，在一阶四维引力的普莱班斯基—乌尔班特克（Plebański–Urbantke）表述中，无需先预设度规张量，即可由三元组二形式 $B$ 经三次交错收缩重构共形度规及其洛伦兹实性条件，相关普适代数恒等式、共形唯一性与复简性反例亦已由内核严格验证：

::: {.theorem #thm-ch34-plebanski-urbantke-metric-reconstruction title="四维 Plebański–Urbantke 普适度规重构、共形唯一性与复洛伦兹实性定理" lean="D5/S3/Geometry/Lorentz/Urbantke.exteriorSquare_eq_smul_id_imp_scalar, D5/S3/Geometry/Lorentz/Urbantke.urbantke_conformal_uniqueness, D5/S3/Geometry/Lorentz/Urbantke.urbantke_polynomial_identities, D5/S3/Geometry/Lorentz/Urbantke.urbantke_nondegenerate_iff_and_chiral_star, D5/S3/Geometry/Lorentz/Urbantke.urbantke_conformal_uniqueness_of_chiral_plane, D5/S3/Geometry/Lorentz/Urbantke.urbantke_lorentz_reality, D5/S3/Geometry/Lorentz/Urbantke.urbantke_lorentz_witness, D5/S3/Geometry/Lorentz/Urbantke.simplicity_not_sufficient_for_real_lorentz"}
在定向六对二形式基 $(01, 02, 03, 23, 31, 12)$ 与楔积配对矩阵 $W$ 下，对任意特征零域 $K$ 上的 $6 \times 3$ 二形式三元组 $B$，记楔积格拉姆矩阵 $Q(B) = B^\top W B$ 与乌尔班特克三次度规密度矩阵 $U(B)$：

1. **无前提普适多项式恒等式与非退化手征星号**（[`urbantke_polynomial_identities`](lean:D5/S3/Geometry/Lorentz/Urbantke.urbantke_polynomial_identities)、[`urbantke_nondegenerate_iff_and_chiral_star`](lean:D5/S3/Geometry/Lorentz/Urbantke.urbantke_nondegenerate_iff_and_chiral_star)）：对**任意**三元组 $B$（不预设简性或非退化性），恒有对称性 $U(B)^\top = U(B)$、精确行列式恒等式与外平方特征平面恒等式
   $$
   \det U(B) \;=\; \frac{(\det Q(B))^2}{64}, \qquad
   \bigl(\Lambda^2 U(B)\bigr)\,W\,B \;=\; \frac{\det Q(B)}{8}\,B.
   $$
   因此 $\det U(B) \neq 0 \iff \det Q(B) \neq 0$；当非退化时，$B$ 的三列线性无关，手征星号 $H = (\det Q/8)\,W\,(\Lambda^2 U)^{-1}$ 满足 $H^2 = I_6$，其 $+1$ 特征空间恰为 $B$ 的列张成三维手征平面，$-1$ 特征空间为其 $W$-正交补。
2. **外平方与手征平面的共形唯一性**（[`exteriorSquare_eq_smul_id_imp_scalar`](lean:D5/S3/Geometry/Lorentz/Urbantke.exteriorSquare_eq_smul_id_imp_scalar)、[`urbantke_conformal_uniqueness`](lean:D5/S3/Geometry/Lorentz/Urbantke.urbantke_conformal_uniqueness)、[`urbantke_conformal_uniqueness_of_chiral_plane`](lean:D5/S3/Geometry/Lorentz/Urbantke.urbantke_conformal_uniqueness_of_chiral_plane)）：若四阶矩阵 $A$ 满足 $\Lambda^2 A = c I_6$（$c \neq 0$），则 $A$ 必为纯量矩阵；从而任意两个诱导成比例外平方或共享同一非退化手征三维平面的可逆对称四阶度规 $g_1, g_2$ 必满足 $g_2 = \lambda g_1$（$\lambda \neq 0$）。
3. **复洛伦兹共形实性定理与复简性不足反例**（[`urbantke_lorentz_reality`](lean:D5/S3/Geometry/Lorentz/Urbantke.urbantke_lorentz_reality)、[`urbantke_lorentz_witness`](lean:D5/S3/Geometry/Lorentz/Urbantke.urbantke_lorentz_witness)、[`simplicity_not_sufficient_for_real_lorentz`](lean:D5/S3/Geometry/Lorentz/Urbantke.simplicity_not_sufficient_for_real_lorentz)）：在复域 $\mathbb{C}$ 上，若 $\det Q(B) \neq 0$ 且满足洛伦兹实性正交条件 $B^\top W \bar{B} = 0$，则 $U(B)$ 必为某个实可逆对称四阶度规 $g$ 的非零复标量倍，且 $\det g < 0$、实霍奇星号满足 $H_{\mathrm{real}}(g)^2 = -I_6$（锁定洛伦兹奇数符号差）。标准见证 $B = [I_3;\, i I_3]$ 精确给出 $U = \operatorname{diag}(1, -1, -1, -1)$ 与 $D = -i$；相反，显式三元组 $B = [I_3;\, (1+i)I_3]$ 满足复普莱班斯基非退化简性条件 $Q = 2(1+i)I_3$，却给出 $U = \operatorname{diag}(1, 2i, 2i, 2i)$，不是任何实矩阵的复标量倍。
:::

::: proof
第 1 款在电块 $E$ 可逆的稠密图卡上借 $C = E^{-1}$ 化为 $[I_3;\, H]$，拆分 $H = S + [w]_\times$ 后用行列式为 $1$ 的余标架剪切 $L$ 将乌尔班特克矩阵对角化为 $L^\top \operatorname{diag}(1, \operatorname{adj} S) L$，直接验算 $\det(\operatorname{adj} S) = (\det S)^2$ 与 $\Lambda^2(\operatorname{adj} S) = (\det S) S$，再沿一元多项式族 $E + t I_3$ 由无限特征零域多项式根数有限性延拓至一切（含奇异电块或奇异 $Q$ 的）三元组 $B$。第 2 款由外平方对角元与余子式比例锁死 $A = a I_4$，再应用于 $g_1^{-1} g_2$ 得共形唯一性。第 3 款把 $B^\top W \bar{B} = 0$ 转化为共轭星号与原星号反号关系，从而由共形唯一性抽取出满足 $H_{\mathrm{real}}^2 = -I_6$ 与 $\det g < 0$ 的实代表元，并对 $i I_3$ 与 $(1+i)I_3$ 直接分量求值。完整证明由 Lean 内核检查。
:::

更进一步，针对上文 [@rem-ch34-spin2-and-species-hierarchy] 所引用的四维无质量自旋-$1$ 规范雅可比恒等式、自旋-$2$ 等效原理与高自旋禁戒，以及“引力 $=$ 杨—米尔斯平方”的树图 KLT 与经典 Kerr–Schild 史瓦西双拷贝，其完整四维旋量螺旋度代数结构亦已由 Lean 内核严格形式化（连续统量子循环振幅与完整非线性场论重求和仍属开放问题）：

::: {.theorem #thm-ch34-spinor-helicity-and-kerr-schild-double-copy title="四维旋量螺旋度四点自洽性统一（雅可比、等效原理与高自旋禁戒）、树图 KLT 与 Kerr–Schild Petrov D 型双拷贝" lean="D5/S3/Geometry/Lorentz/SpinorHelicityDoubleCopy4D.schouten, D5/S3/Geometry/Lorentz/SpinorHelicityDoubleCopy4D.null_iff_rankOne, D5/S3/Geometry/Lorentz/SpinorHelicityDoubleCopy4D.det_sigma, D5/S3/Geometry/Lorentz/SpinorHelicityDoubleCopy4D.nullGenerator_spinor_factor, D5/S3/Geometry/Lorentz/SpinorHelicityDoubleCopy4D.three_point_branches, D5/S3/Geometry/Lorentz/SpinorHelicityDoubleCopy4D.spin_one_consistency_iff_jacobi, D5/S3/Geometry/Lorentz/SpinorHelicityDoubleCopy4D.spin_two_consistency_iff_associative, D5/S3/Geometry/Lorentz/SpinorHelicityDoubleCopy4D.spin_two_orthogonal_split, D5/S3/Geometry/Lorentz/SpinorHelicityDoubleCopy4D.higher_spin_single_zero, D5/S3/Geometry/Lorentz/SpinorHelicityDoubleCopy4D.nonzero_graviton_matter_universal, D5/S3/Geometry/Lorentz/SpinorHelicityDoubleCopy4D.soft_ward_universal, D5/S3/Geometry/Lorentz/SpinorHelicityDoubleCopy4D.gravityMHV4_bcfw, D5/S3/Geometry/Lorentz/SpinorHelicityDoubleCopy4D.klt_four_point, D5/S3/Geometry/Lorentz/KerrSchildWeylDoubleCopy4D.ks_inverse, D5/S3/Geometry/Lorentz/KerrSchildWeylDoubleCopy4D.ks_det, D5/S3/Geometry/Lorentz/KerrSchildWeylDoubleCopy4D.coulomb_raw_square, D5/S3/Geometry/Lorentz/KerrSchildWeylDoubleCopy4D.coulomb_to_schwarzschild_stf, D5/S3/Geometry/Lorentz/KerrSchildWeylDoubleCopy4D.schwarzschild_weylQuartic, D5/S3/Geometry/Lorentz/KerrSchildWeylDoubleCopy4D.schwarzschild_tide_eval, D5/S3/Geometry/Lorentz/KerrSchildWeylDoubleCopy4D.schwarzschild_is_type_D"}
1. **四维旋量螺旋度桥接与三点运动学二分**（[`schouten`](lean:D5/S3/Geometry/Lorentz/SpinorHelicityDoubleCopy4D.schouten)、[`null_iff_rankOne`](lean:D5/S3/Geometry/Lorentz/SpinorHelicityDoubleCopy4D.null_iff_rankOne)、[`det_sigma`](lean:D5/S3/Geometry/Lorentz/SpinorHelicityDoubleCopy4D.det_sigma)、[`nullGenerator_spinor_factor`](lean:D5/S3/Geometry/Lorentz/SpinorHelicityDoubleCopy4D.nullGenerator_spinor_factor)、[`three_point_branches`](lean:D5/S3/Geometry/Lorentz/SpinorHelicityDoubleCopy4D.three_point_branches)）：$2\times 2$ 动量矩阵满足 $-\det\sigma(x) = \mathrm{minkowski}(x, x)$、零动量等价于秩一外积 $\lambda\tilde\lambda^\top$、直接因子化 `WeylNullScreen.nullGenerator`，且三点无质量动量守恒 $\sum_{i=1}^3 \lambda_i\tilde\lambda_i^\top = 0$ 必然强制全反全纯括号为零或全全纯括号为零。
2. **四点 BCFW 自洽性统一：杨—米尔斯雅可比、多引力子正交分裂、等效原理与高自旋禁戒**（[`spin_one_consistency_iff_jacobi`](lean:D5/S3/Geometry/Lorentz/SpinorHelicityDoubleCopy4D.spin_one_consistency_iff_jacobi)、[`spin_two_consistency_iff_associative`](lean:D5/S3/Geometry/Lorentz/SpinorHelicityDoubleCopy4D.spin_two_consistency_iff_associative)、[`spin_two_orthogonal_split`](lean:D5/S3/Geometry/Lorentz/SpinorHelicityDoubleCopy4D.spin_two_orthogonal_split)、[`higher_spin_single_zero`](lean:D5/S3/Geometry/Lorentz/SpinorHelicityDoubleCopy4D.higher_spin_single_zero)、[`nonzero_graviton_matter_universal`](lean:D5/S3/Geometry/Lorentz/SpinorHelicityDoubleCopy4D.nonzero_graviton_matter_universal)、[`soft_ward_universal`](lean:D5/S3/Geometry/Lorentz/SpinorHelicityDoubleCopy4D.soft_ward_universal)）：
   - 对反对称自旋-$1$ 耦合 $f_{abc}$，四点位移自洽性**当且仅当**满足李代数雅可比恒等式；
   - 对对称自旋-$2$ 耦合，四点自洽性等价于结合交换代数，在有限维实内积空间上正交直和谱分解为彼此解耦的独立一维引力子扇区，且混合引力子—物质四点方程与软引力子 Ward 恒等式均强制普适耦合 $\kappa_a = \kappa$（代数等效原理）；
   - 对任意整数高自旋 $s \ge 3$，单种无质量粒子四点自洽性强制自耦合 $g = 0$。
3. **精确四点树图 KLT 双拷贝（$\mathrm{Gravity} = \mathrm{YM}^2$）**（[`gravityMHV4_bcfw`](lean:D5/S3/Geometry/Lorentz/SpinorHelicityDoubleCopy4D.gravityMHV4_bcfw)、[`klt_four_point`](lean:D5/S3/Geometry/Lorentz/SpinorHelicityDoubleCopy4D.klt_four_point)）：在满足动量守恒与非退化尖括号的四点无质量旋量运动学上，四点 MHV 引力振幅严格满足
   $$
   \mathcal{M}_4^{\mathrm{grav}} \;=\; -s_{12}\,\mathcal{A}_4^{\mathrm{YM}}(1,2,3,4)\,\mathcal{A}_4^{\mathrm{YM}}(1,2,4,3).
   $$
4. **Kerr–Schild 精确逆度规、单位行列式与库仑—史瓦西 Petrov D 型 Weyl 双拷贝**（[`ks_inverse`](lean:D5/S3/Geometry/Lorentz/KerrSchildWeylDoubleCopy4D.ks_inverse)、[`ks_det`](lean:D5/S3/Geometry/Lorentz/KerrSchildWeylDoubleCopy4D.ks_det)、[`coulomb_raw_square`](lean:D5/S3/Geometry/Lorentz/KerrSchildWeylDoubleCopy4D.coulomb_raw_square)、[`coulomb_to_schwarzschild_stf`](lean:D5/S3/Geometry/Lorentz/KerrSchildWeylDoubleCopy4D.coulomb_to_schwarzschild_stf)、[`schwarzschild_weylQuartic`](lean:D5/S3/Geometry/Lorentz/KerrSchildWeylDoubleCopy4D.schwarzschild_weylQuartic)、[`schwarzschild_tide_eval`](lean:D5/S3/Geometry/Lorentz/KerrSchildWeylDoubleCopy4D.schwarzschild_tide_eval)、[`schwarzschild_is_type_D`](lean:D5/S3/Geometry/Lorentz/KerrSchildWeylDoubleCopy4D.schwarzschild_is_type_D)）：对任意零向量 $k$（$\mathrm{minkowski}(k,k) = 0$）与任意纯量 $\varphi$，Kerr–Schild 度规 $g = \eta + \varphi k k^\top$ 严格满足 $g^{-1} = \eta - \varphi k^\sharp (k^\sharp)^\top$ 与 $\det g = -1$；将径向库仑电场的无迹平方除以纯量零拷贝后经 `WeylNullScreen.weyl_electric_magnetic_equiv.symm` 映入四维 Weyl 空间，其射影四次多项式精确等于 $24(M/r^3) X^2$，在南、北两条主零方向（$0$ 与 $\infty$）上横截潮汐同时归零，属于精确 Petrov D 型。
:::

::: proof
第 1 款通过 $2\times 2$ 行列式与矩阵元分类直接证得零动量秩一分解与 Schouten 恒等式，由 $\det(p_1 + p_2) = \det(-p_3) = 0$ 及旋量线性相关性导出三点分支二分。第 2 款在有理通道多项式上代入互异通道坐标锁死自旋-$1$ 雅可比、自旋-$2$ 结合律及 $s \ge 3$ 的非零幂系数矛盾，借有限维交换对称算符族的联合特征分解构造正交一维引力子基，并由四点极点抵消与软极点规范不变性推出 $\kappa_a = \kappa$。第 3 款由四点动量守恒与 Schouten 恒等式化简 MHV 引力与 Parke–Taylor 有理式证得 KLT 等式。第 4 款展开 $4\times 4$ 矩阵乘积与行列式按 `minkowski k k = 0` 精确消去全部 $\varphi$ 高次项，并在 `WeylNullScreen` 固定定向与电—磁等价下直接计算史瓦西 Weyl 四次多项式及其双二重根结构。完整证明由 Lean 内核检查。
:::

更进一步，在从零锥光学与局域视界热力学直接通往四维爱因斯坦场方程的关键一步上，内核现已严格形式化 Sachs–Raychaudhuri 聚焦与有限仿射焦散上界、由局域林德勒（Rindler）视界克劳修斯关系联立已冻结零光锥刚性定理导出带宇宙学常数 $\Lambda$ 的爱因斯坦场方程，以及四维洛伦兹李代数手征分裂 $\mathfrak{so}(1,3) \simeq_{\mathbb{R}} \mathfrak{sl}(2,\mathbb{C})$ 对接乌尔班特克霍奇星与外尔零屏幕的完整定理链（如何在不预设连续光滑流形与熵密度 $\eta$ 的前提下从离散比较网络导出这些连续统输入仍属下方开放问题）：

::: {.theorem #thm-ch34-sachs-jacobson-einstein-and-chiral-lorentz title="Sachs–Raychaudhuri 聚焦焦散界、Jacobson 局域视界爱因斯坦场方程与四维手征洛伦兹李代数" lean="D5/S3/Geometry/Lorentz/SachsJacobsonEinstein4D.area_radius_focusing, D5/S3/Geometry/Lorentz/SachsJacobsonEinstein4D.optical_nec_bounds, D5/S3/Geometry/Lorentz/SachsJacobsonEinstein4D.reciprocal_expansion_bound, D5/S3/Geometry/Lorentz/SachsJacobsonEinstein4D.no_positive_optics_through_focal_bound, D5/S3/Geometry/Lorentz/SachsJacobsonEinstein4D.radius_zero_le_focal_bound, D5/S3/Geometry/Lorentz/SachsJacobsonEinstein4D.weyl_generates_shear, D5/S3/Geometry/Lorentz/SachsJacobsonEinstein4D.clock_deficit_of_optics, D5/S3/Geometry/Lorentz/SachsJacobsonEinstein4D.screen_riccati_components, D5/S3/Geometry/Lorentz/SachsJacobsonEinstein4D.horizon_first_variation, D5/S3/Geometry/Lorentz/SachsJacobsonEinstein4D.null_identity_of_clausius, D5/S3/Geometry/Lorentz/SachsJacobsonEinstein4D.symmetric_eq_metric_of_null, D5/S3/Geometry/Lorentz/SachsJacobsonEinstein4D.jacobson_einstein_on, D5/S3/Geometry/Lorentz/HodgeChiralLie.lorentz_coords_bracket, D5/S3/Geometry/Lorentz/HodgeChiralLie.finrank_lorentz_real, D5/S3/Geometry/Lorentz/HodgeChiralLie.chiral_generator_images, D5/S3/Geometry/Lorentz/HodgeChiralLie.chiral_mixed_bracket, D5/S3/Geometry/Lorentz/HodgeChiralLie.real_hodge_square, D5/S3/Geometry/Lorentz/HodgeChiralLie.hodge_eigenspaces_eq_chiral, D5/S3/Geometry/Lorentz/HodgeChiralLie.chiral_brackets, D5/S3/Geometry/Lorentz/HodgeChiralLie.chiral_graph_gram, D5/S3/Geometry/Lorentz/HodgeChiralLie.urbantke_chiral_graph, D5/S3/Geometry/Lorentz/HodgeChiralLie.weyl_screen_in_chiral_plane"}
1. **Sachs–Raychaudhuri 零光学聚焦、有限仿射焦散界与外尔剪切激发**（[`area_radius_focusing`](lean:D5/S3/Geometry/Lorentz/SachsJacobsonEinstein4D.area_radius_focusing)、[`optical_nec_bounds`](lean:D5/S3/Geometry/Lorentz/SachsJacobsonEinstein4D.optical_nec_bounds)、[`reciprocal_expansion_bound`](lean:D5/S3/Geometry/Lorentz/SachsJacobsonEinstein4D.reciprocal_expansion_bound)、[`no_positive_optics_through_focal_bound`](lean:D5/S3/Geometry/Lorentz/SachsJacobsonEinstein4D.no_positive_optics_through_focal_bound)、[`radius_zero_le_focal_bound`](lean:D5/S3/Geometry/Lorentz/SachsJacobsonEinstein4D.radius_zero_le_focal_bound)、[`weyl_generates_shear`](lean:D5/S3/Geometry/Lorentz/SachsJacobsonEinstein4D.weyl_generates_shear)、[`screen_riccati_components`](lean:D5/S3/Geometry/Lorentz/SachsJacobsonEinstein4D.screen_riccati_components)、[`clock_deficit_of_optics`](lean:D5/S3/Geometry/Lorentz/SachsJacobsonEinstein4D.clock_deficit_of_optics)）：沿零测地线汇，面积半径 $\varrho$ 严格满足线性聚焦方程 $\varrho'' + \frac{1}{2}(\lvert\sigma\rvert^2 + \Phi_{00})\varrho = 0$；在零能量条件（$\Phi_{00} \ge 0$）下，膨胀 $\theta$ 单调递减、$\varrho$ 凹性成立，且一旦初值 $\theta_0 < 0$ 则正半径光学汇不能越过有限仿射焦散上界 $L \le 2/\lvert\theta_0\rvert$；即使在真空（$\Phi_{00} = 0$）中，非零外尔潮汐项亦会在邻域内瞬时激发剪切并导致严格聚焦，并与 [@thm-ch39-null-cone-shear-clock-area-rigidity] 的时钟亏损分解精确对接。
2. **Jacobson 局域视界热力学导出带 $\Lambda$ 的爱因斯坦场方程**（[`horizon_first_variation`](lean:D5/S3/Geometry/Lorentz/SachsJacobsonEinstein4D.horizon_first_variation)、[`null_identity_of_clausius`](lean:D5/S3/Geometry/Lorentz/SachsJacobsonEinstein4D.null_identity_of_clausius)、[`symmetric_eq_metric_of_null`](lean:D5/S3/Geometry/Lorentz/SachsJacobsonEinstein4D.symmetric_eq_metric_of_null)、[`jacobson_einstein_on`](lean:D5/S3/Geometry/Lorentz/SachsJacobsonEinstein4D.jacobson_einstein_on)）：在任意连通开图卡 $\Omega \subset \mathbb{R}^4$ 上，若洛伦兹度规场 $g$、联络 $\Gamma$、里奇场 $R$ 与能动场 $T$ 满足度规相容性、缩并比安基恒等式、$\nabla\cdot T = 0$，并在每点每条非零零矢量处局部视界满足昂鲁温度 $T_U = \frac{\hbar\kappa}{2\pi}$ 与熵面积密度 $\eta$ 的克劳修斯关系 $\delta Q = T_U \eta\,dA$，则必然存在全局积分常数（宇宙学常数）$\Lambda \in \mathbb{R}$，使全图卡上精确成立
   $$
   R(x) - \frac{1}{2} R_{\mathrm{scal}}(x)\,g(x) + \Lambda\,g(x) \;=\; 8\pi \left(\frac{1}{4\hbar\eta}\right) T(x).
   $$
3. **四维手征洛伦兹李代数与乌尔班特克—外尔霍奇桥接**（[`lorentz_coords_bracket`](lean:D5/S3/Geometry/Lorentz/HodgeChiralLie.lorentz_coords_bracket)、[`finrank_lorentz_real`](lean:D5/S3/Geometry/Lorentz/HodgeChiralLie.finrank_lorentz_real)、[`chiral_generator_images`](lean:D5/S3/Geometry/Lorentz/HodgeChiralLie.chiral_generator_images)、[`chiral_mixed_bracket`](lean:D5/S3/Geometry/Lorentz/HodgeChiralLie.chiral_mixed_bracket)、[`real_hodge_square`](lean:D5/S3/Geometry/Lorentz/HodgeChiralLie.real_hodge_square)、[`hodge_eigenspaces_eq_chiral`](lean:D5/S3/Geometry/Lorentz/HodgeChiralLie.hodge_eigenspaces_eq_chiral)、[`chiral_brackets`](lean:D5/S3/Geometry/Lorentz/HodgeChiralLie.chiral_brackets)、[`chiral_graph_gram`](lean:D5/S3/Geometry/Lorentz/HodgeChiralLie.chiral_graph_gram)、[`urbantke_chiral_graph`](lean:D5/S3/Geometry/Lorentz/HodgeChiralLie.urbantke_chiral_graph)、[`weyl_screen_in_chiral_plane`](lean:D5/S3/Geometry/Lorentz/HodgeChiralLie.weyl_screen_in_chiral_plane)）：$6$ 维实洛伦兹李代数实现显式实李同构 $\mathfrak{so}(1,3) \simeq_{\mathbb{R}} \mathfrak{sl}(2,\mathbb{C})$ 与复化手征直和分裂 $\mathfrak{so}(1,3)_{\mathbb{C}} \simeq_{\mathbb{C}} \mathfrak{sl}(2,\mathbb{C}) \oplus \mathfrak{sl}(2,\mathbb{C})$（混合括号恒零），其左右手征因子精确等同于实霍奇星（$H^2 = -I_6$）的 $\mp i$ 特征空间，手征图三元组由乌尔班特克映射直接还原闵可夫斯基度规 $-\eta$，且每条未来零光线的屏幕楔积精确落入 $-i$ 手征平面。
:::

::: proof
第 1 款在矩阵黎卡提方程与面积半径 $\varrho = \sqrt{A}$ 上求导证得 $\varrho'' + \mathrm{focusing}\cdot\varrho = 0$，由倒数 $\theta^{-1}$ 的导数下界 $\frac{1}{2}$ 导出有限焦散界 $L \le 2/\lvert\theta_0\rvert$，并在 $\sigma(t) = 0$ 处由非零导数 $-\Psi_0$ 证得去心邻域非零剪切与严格聚焦。第 2 款由局域林德勒克劳修斯极限导出所有零矢量上的 $(R - \frac{2\pi}{\hbar\eta}T)(v, v) = 0$，经线性标架变换调用已冻结的 `MinkowskiNullConeRigidity.eq_smul_minkowski_of_null` 锁死 $R - cT = f g$，再以缩并比安基与 $\nabla\cdot T = 0$ 推出 $d(f - \frac{1}{2}R_{\mathrm{scal}}) = 0$ 从而在连通开集 $\Omega$ 上等于常数 $-\Lambda$。第 3 款在助推—旋转坐标上显式构造至 $\mathfrak{sl}(2,\mathbb{C})$ 与双拷贝 $\mathfrak{sl}(2,\mathbb{C})^2$ 的李等价，直接核对 `Urbantke.hodge` 特征方程、乌尔班特克重构 $-\eta$ 与 `WeylNullScreen.screenWedge` 的 $-i$ 本征条件。完整证明由 Lean 内核检查。
:::

我们将从离散比较几何通往四维相对论引力动力学的完整未决桥接任务正式立案如下：

::: {.problem #prob-ch34-gravity-dynamics-and-coupling title="离散比较几何导出四维洛伦兹自旋-2 引力动力学与牛顿常数归一化的开放问题"}
在[附录 E](appendix-e-s07-intermediate-hypotheses-audit.md#sec-appe-audit-table) 桥接假设 `H8` 与 `H9` 的严格审视下，如何不预设连续四维伪黎曼流形与爱因斯坦—希尔伯特作用量，而从离散比较复形、粗粒化记录捏合熵（[§E.6](appendix-e-s06-spacetime-gauge-and-thermodynamics.md#sec-appe-spacetime)）与局域因果视界出发，严格完成以下三步推导：

1. **洛伦兹无质量自旋-$2$ 有效动力学与规避温伯格—威滕禁戒**：证明多原胞比较网络在宏观连续统极限下涌现出微分同胚协变的 $3+1$ 维洛伦兹度规动力学，在不违背温伯格—威滕定理的前提下导出无质量自旋-$2$ 传播子（从而由动力学而非人为假定同时锁定长程律 $\mu = 0$ 与静态吸引号 $\sigma = -1$）；
2. **完整相对论能动张量 $T_{\mu\nu}$ 的普适耦合**：导出离散物质激发与几何角亏/视界熵流之间的变分耦合恒等式，使引力源精确收敛于包含相对论压强与剪切应力的完整守恒张量 $T_{\mu\nu}$（兼容雷乔杜里聚焦与真空负压宇宙学效应）；
3. **牛顿引力常数 $G_N$（普朗克质量 $m_{\mathrm{Pl}}$）的第一性原理标定**：定量确定引力耦合标度 $G_N = \hbar c / m_{\mathrm{Pl}}^2$ 相对于微观离散步长或视界纠缠熵密度 $\eta$ 的归一化关系，并与规范/汤川质量标度接轨以解释 $\lvert F_G / F_E\rvert \sim 10^{-43}\text{–}10^{-37}$ 的巨大等级差？
:::

上一张表格的最后一列已经把球传到了粒子物理标准模型的腹地：既然引力与规范力的定量比值直接取决于费米子家族谱与连续耦合常数，那么本书多处涌现的离散整数 **`3`** 与 **`6`** 究竟能否锁定三代费米子，而约二十个连续标准模型参数又停留在怎样的认识论边界上？让我们立即进入下一节 [§33.6](ch34-s25-generations-and-quantitative-boundary.md#sec-ch34-generations-and-quantitative-boundary) 展开全面定量边界审计。
