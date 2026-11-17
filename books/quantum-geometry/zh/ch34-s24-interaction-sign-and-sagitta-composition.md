# 34.24 绕向奇偶与正矢高合成：规范相消、引力类比与动力学边界 {#sec-ch34-interaction-sign-and-sagitta-composition}

在 [§34.4](ch34-s04-infinitesimal-trihedron.md#sec-ch34-infinitesimal-spherical-trihedron)、[§34.14](ch34-s14-lorentz-and-standard-model-octave.md#sec-ch34-lorentz-pseudoscalar-and-sm-octave) 与 [§34.16](ch34-s16-coset-breaking-and-conservation.md#sec-ch34-coset-breaking-conservation-towers) 中，我们将极小三角弧面体 $\Delta\mathcal{T}_\epsilon$ 同时视作规范联络和乐与时空曲率角超的共同微观原胞（`MODEL`）。一旦把两种相互作用放回同一枚原胞上对照，一个关乎宏观宇宙结构的核心物理分野便迎面而来：**为什么电磁与非阿贝尔规范相互作用天然容许正负异号荷（$\pm q$、色与反色），从而在宏观大块物质中相互屏蔽成电中性与色单态；唯独引力源在静态宏观尺度下从不正负抵消，纵使微观耦合极弱，却能跨天文尺度持续累加而主宰星系与宇宙结构？**

要诚实回答这一问题，绝不能拿一句含混的“曲率恒正所以万物相吸”敷衍过关，而必须把**运动学奇偶恒等式**与**动力学传播子假设**逐层剥离开来：在单枚球面三面角原胞 $\Delta\mathcal{T}_\epsilon$ 上，哪些正负抵消律与偶次非负残差确实已经由内积—克利福德几何严格锁定？反过来，仅凭局部正定矢高 $d(\epsilon) \ge 0$ 与格拉姆体积正定性，为什么**不足以**自动推出四维洛伦兹自旋-$2$ 场的普适吸引号、零质量长程 $1/r$ 传播律以及随粒子种类跨越六个数量级的引力—静电力强弱比？本节以精确代数推导与四个显式反例给出完整划界。

## 34.24.1 绕向奇偶与阶次分离：有向和乐相消与偶正定矢高残差 {#sec-ch34-24-1}

回到 [§34.4](ch34-s04-infinitesimal-trihedron.md#sec-ch34-infinitesimal-spherical-trihedron) 的单位球面 $S^2 \subset \mathbb{R}^3$ 坐标设定：固定直角转枢射线 $\mathbf{z}_0 := \mathbf{e}_2 = (0, 1, 0)$，对步长角 $\epsilon \in (0, \frac{\pi}{2}]$，沿两面互相垂直的坐标墙 $\mathbf{e}_2 \wedge \mathbf{e}_1$ 与 $\mathbf{e}_2 \wedge \mathbf{e}_3$ 取墙面单位射线

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

## 34.24.2 合成法则分岔与四个动力学反例检核 {#sec-ch34-24-2}

既然在单枚原胞上 $d(\epsilon) = 2\sin^2(\epsilon/2) > 0$ 且 $\det G(\epsilon) = \sin^4\epsilon > 0$ 恒不取负值，我们能否就此宣称“仅凭比较公理的局部运动学正定性，已经无假设推出了万有引力的普适 $1/r$ 吸引定律”？答案是**绝对不能**（参见[附录 E §E.4](appendix-e.md#sec-appe-geometry)、[§E.6](appendix-e.md#sec-appe-spacetime) 与 [§E.7](appendix-e.md#sec-appe-audit-table)）。局部标量残差非负只是“正源同号”的运动学必要前提；一旦混淆合成规则或忽略场传播子与相对论应力，立刻会撞上下列四个精确反例：

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
   - *电磁多极余场与非阿贝尔色单态机制差异*：即便在阿贝尔静电学中，相距 $\mathbf{s} \neq \mathbf{0}$ 的异号点电荷 $+q$ 与 $-q$ 也只消去了远场 $O(r^{-2})$ 单极通量，仍留下非零电偶极矩 $\mathbf{p} = q\mathbf{s}$ 及其 $O(r^{-3})$ 偶极电场与正静电能；而在非阿贝尔 $\mathrm{SU}(3)_c$ 强相互作用（[§34.14](ch34-s14-lorentz-and-standard-model-octave.md#sec-ch34-lorentz-pseudoscalar-and-sm-octave)）中，宏观色中性根本不是标量正负号相加，而是张量积表示论中的单态投影（介子 $\mathbf{3}\otimes\bar{\mathbf{3}} = \mathbf{1}\oplus\mathbf{8}$ 与重子 $\mathbf{3}\otimes\mathbf{3}\otimes\mathbf{3} = \mathbf{1}\oplus\mathbf{8}\oplus\mathbf{8}\oplus\mathbf{10}$）配合红外色禁闭（[§34.14](ch34-s14-lorentz-and-standard-model-octave.md#sec-ch34-lorentz-pseudoscalar-and-sm-octave) [@ex-ch34-lorentz-budget-and-sm-octave-benchmark]）！

2. **反例 (ii) 静态汤川势族 $U_{\sigma,\mu}(r)$ 对吸引/排斥符号与力程的双重欠定**：
   取两枚携带严格正矢高源 $d_1, d_2 > 0$（对等步长原胞即 $d_1 = d_2 = d(\epsilon) > 0$）的局域原胞，考察由总体符号 $\sigma \in \{+1, -1\}$ 与质量屏蔽参数 $\mu \ge 0$ 索引的静态中心势族（耦合常数 $\kappa > 0$）：

   $$
   U_{\sigma,\mu}(r) \;=\; \sigma\,\kappa\,d_1 d_2\,\frac{e^{-\mu r}}{r}, \qquad \sigma \in \{+1, -1\}, \quad \mu \ge 0.
   $$

   在单原胞上令 $d_1 = d_2 = d > 0$ 即化为 $U_{\sigma,\mu}(r) = \sigma\kappa d^2 e^{-\mu r}/r$。源强乘积恒正 $d^2 > 0$ 仅保证“全宇宙同类正源具有统一的相互作用符号”，却对以下两项动力学参数完全沉默：(a) 它**不锁定吸引号 $\sigma = -1$**——在相对论场论中，同号正荷通过奇数自旋（自旋-$1$ 矢量场）静态交换产生普适**排斥**（$\sigma = +1$），唯有偶数自旋（自旋-$0$ 标量或自旋-$2$ 张量）交换才给出普适**吸引**（$\sigma = -1$）；(b) 它**不锁定零质量长程律 $\mu = 0$**——若传播媒介具有非零质量隙 $\mu > 0$（如 [§34.16](ch34-s16-coset-breaking-and-conservation.md#sec-ch34-coset-breaking-conservation-towers) [@ex-ch34-ccwz-electroweak-skyrmion-meissner-benchmark] 中的电弱 $W^\pm/Z^0$ 玻色子或核力 $\pi$ 介子），即使源恒正，宏观天体尺度 $r \gg \mu^{-1}$ 上的相互作用仍会指数归零！

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

## 34.24.3 自旋-2 普适吸引定理、粒子种类层级表与引力动力学开放边界 {#sec-ch34-24-3}

通过上述四重反例检核，比较几何在相互作用符号问题上的真实贡献与诚实边界已经一目了然：在运动学底层，$\Delta\mathcal{T}_\epsilon$ 确实内生区分了“随绕向反号的一阶/二阶有向相位荷”与“绕向偶对称的非负二阶矢高及四阶体积残差”；但要从这枚离散运动学种子跨入真实的宏观万有引力，物理学依赖的是**洛伦兹协变无质量自旋-$2$ 传播结构**与**粒子物理标准模型的质量生成机制**。

::: {.remark #rem-ch34-spin2-and-species-hierarchy title="无质量自旋-2 普适耦合定理、视界热力学与粒子种类引力静电力层级表"}
**文献结果，未在本书形式化（配 CODATA 数值对账 `NUM`）。** 将局部偶矢高类比延伸至相对论引力理论时，必须严格对齐以下经典场论定理与实验量级表：

1. **温伯格软定理、德泽尔自耦合、温伯格—威滕禁戒、雷吉离散引力与雅各布森视界状态方程**：
   - *自旋-$1$ 荷守恒对自旋-$2$ 等效原理与普适吸引*：S. Weinberg（*Phys. Rev.* **135**, B1049, 1964, DOI `10.1103/PhysRev.135.B1049`）由洛伦兹不变性与无质量散射振幅软极点规范不变性严格证明：螺旋度 $\pm 1$ 光子软因子要求总荷守恒 $\sum_a q_a = 0$（容许异号电荷屏蔽），而螺旋度 $\pm 2$ 无质量引力子软因子迫使一切粒子以**完全相同的普适常数 $\kappa$** 耦合于其四动量 $p^\mu$（等效原理的量子场论起源，且令 $\mu = 0$），同时正能态之间的二阶对称张量交换精确给出静态吸引号 $\sigma = -1$；S. Deser（*Gen. Relativ. Gravit.* **1**, 9, 1970）进一步证明平坦背景上自洽自相互作用的无质量自旋-$2$ 场唯一重求和为完整的非线性爱因斯坦—希尔伯特作用量。
   - *复合无质量自旋-$2$ 场的平直背景禁戒*：S. Weinberg 与 E. Witten（*Phys. Lett. B* **96**, 59, 1980）证明：在任何具备洛伦兹协变守恒能动张量 $T^{\mu\nu}$ 的四维庞加莱协变场论中，不存在携带非零引力矩阵元的螺旋度 $\lvert h\rvert > 1$ 无质量基本粒子或复合粒子——这意味着任何企图在**固定平直闵可夫斯基背景上直接把引力子拼成普通复合激发**的捷径均被严格封死，时空微分同胚几何本身必须与物质同步涌现。
   - *离散铰链作用量与局域视界热力学路线*：T. Regge（*Nuovo Cimento* **19**, 558, 1961）提出无坐标单纯形引力作用量 $S_{\mathrm{Regge}} = \frac{c^3}{8\pi G}\sum_h A_h \delta_h$，以余维 $2$ 铰链面积 $A_h$ 加权带号角亏 $\delta_h$；T. Jacobson（*Phys. Rev. Lett.* **75**, 1260, 1995, DOI `10.1103/PhysRevLett.75.1260`）则证明，若局域林德勒（Rindler）因果视界满足克劳修斯关系 $\delta Q = T\,dS$ 且纠缠熵正比于视界面积 $\delta S = \eta\,\delta\mathcal{A}$，由雷乔杜里测地线聚焦方程即可反推出爱因斯坦场方程 $R_{\mu\nu} - \frac{1}{2}R g_{\mu\nu} + \Lambda g_{\mu\nu} = \frac{8\pi G}{c^4}T_{\mu\nu}$（牛顿常数由 $G = \frac{c^3}{4\hbar\eta}$ 标定）。
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

我们将从离散比较几何通往四维相对论引力动力学的完整未决桥接任务正式立案如下：

::: {.problem #prob-ch34-gravity-dynamics-and-coupling title="离散比较几何导出四维洛伦兹自旋-2 引力动力学与牛顿常数归一化的开放问题"}
在[附录 E](appendix-e.md#sec-appe-audit-table) 桥接假设 `H8` 与 `H9` 的严格审视下，如何不预设连续四维伪黎曼流形与爱因斯坦—希尔伯特作用量，而从离散比较复形、粗粒化记录捏合熵（[§E.6](appendix-e.md#sec-appe-spacetime)）与局域因果视界出发，严格完成以下三步推导：

1. **洛伦兹无质量自旋-$2$ 有效动力学与规避温伯格—威滕禁戒**：证明多原胞比较网络在宏观连续统极限下涌现出微分同胚协变的 $3+1$ 维洛伦兹度规动力学，在不违背温伯格—威滕定理的前提下导出无质量自旋-$2$ 传播子（从而由动力学而非人为假定同时锁定长程律 $\mu = 0$ 与静态吸引号 $\sigma = -1$）；
2. **完整相对论能动张量 $T_{\mu\nu}$ 的普适耦合**：导出离散物质激发与几何角亏/视界熵流之间的变分耦合恒等式，使引力源精确收敛于包含相对论压强与剪切应力的完整守恒张量 $T_{\mu\nu}$（兼容雷乔杜里聚焦与真空负压宇宙学效应）；
3. **牛顿引力常数 $G_N$（普朗克质量 $m_{\mathrm{Pl}}$）的第一性原理标定**：定量确定引力耦合标度 $G_N = \hbar c / m_{\mathrm{Pl}}^2$ 相对于微观离散步长或视界纠缠熵密度 $\eta$ 的归一化关系，并与规范/汤川质量标度接轨以解释 $\lvert F_G / F_E\rvert \sim 10^{-43}\text{–}10^{-37}$ 的巨大等级差？
:::

上一张表格的最后一列已经把球传到了粒子物理标准模型的腹地：既然引力与规范力的定量比值直接取决于费米子家族谱与连续耦合常数，那么本书多处涌现的离散整数 **`3`** 与 **`6`** 究竟能否锁定三代费米子，而约二十个连续标准模型参数又停留在怎样的认识论边界上？让我们立即进入本章六节认识论压力测试长廊的收官节 [§34.25](ch34-s25-generations-and-quantitative-boundary.md#sec-ch34-generations-and-quantitative-boundary) 展开全面审计。
