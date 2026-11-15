# 39.5.5 克利福德正交分解：一维膨胀轴与二维内禀旋面 {#sec-ch39-p2e-clifford}

对有理系数或整系数的三阶代数编码 $x = a + b\beta_3 + c\beta_3^2$，经典三次闵可夫斯基实线性坐标映射写为

$$
(a, b, c) \longmapsto \Bigl(a + b\beta_3 + c\beta_3^2,\; \operatorname{Re}(a + b\alpha + c\alpha^2),\; \operatorname{Im}(a + b\alpha + c\alpha^2)\Bigr) \in E_\parallel^1 \oplus E_\perp^2.
$$

（顺带指出：对一般有理系数 $(a,b,c) \in \mathbb{Q}^3$，三嵌入迹 $(a+b\beta_3+c\beta_3^2) + 2\operatorname{Re}(a+b\alpha+c\alpha^2) = 3a + b + 3c$ 是有理数，仅当系数取整数或特定扫描格点时才必为整数。）在这一分解下，乘以主根 $\beta_3$ 在一维物理方向 $E_\parallel^1$ 上表现为倍率 $\beta_3 > 1$ 的单向拉伸，而在二维内部平面 $E_\perp^2$ 上则由复根乘法 $w \mapsto \alpha w$ 表现为模长 $|\alpha| = \beta_3^{-1/2} < 1$ 的均匀收缩与角度 $\arg\alpha \approx 124.69^\circ$ 的平面旋转之复合。

::: {.remark #rem-ch39-p2e-unification-model title="诠释模型：闵可夫斯基嵌入的克利福德线—面词典（MODEL）"}
在[第 6 章](ch06-geometric-product.md)建立的三维克利福德代数 $\mathrm{Cl}_{3,0}(\mathbb{R})$ 语言中，我们可以为上述 $E_\parallel^1 \oplus E_\perp^2$ 分解建立一套清晰的几何诠释词典（`MODEL`）：将一维膨胀方向对齐单位一阶向量轴 $\mathbf{e}_1$（粒子式标尺读数轴），将二维内部复平面对齐正交单位双向量面 $B_\perp = \mathbf{e}_2 \wedge \mathbf{e}_3$（满足 $B_\perp^2 = -1$ 的波式相干旋面），则内部单步演化 $w \mapsto \alpha w$ 可写为带阻尼的缩放旋子（scaled rotor）作用

$$
\mathcal{D}_\perp = \beta_3^{-1/2}\bigl(\cos\vartheta + B_\perp \sin\vartheta\bigr),\qquad \vartheta = \arg\alpha \approx 124.69^\circ,
$$

而三维行列式（伪标量体积缩放因子）满足 $\beta_3 \cdot \bigl(\beta_3^{-1/2}\bigr)^2 = 1$，体现出“纵向拉伸多少倍，横向双向量面积就精确收缩多少倍”的体积守恒律。在阅读这一词典时须恪守三条形式边界：第一，$(a,b,c) \mapsto (\dots)$ 是代数实线性坐标嵌入，只有在显式选定基与内积度规后才谈得上标准整数格 $\mathbb{Z}^3$ 的正交欧氏投影；第二，劳齐集 $\mathcal{R}_3(\alpha)$ 本身严格栖居在**二维内部平面** $E_\perp^2$ 内，三维沙盘中的立体视角变换只是摄像机观察操作，不会改变 $\mathcal{R}_3(\alpha)$ 的数学维数；第三，将 $E_\parallel^1$ 与 $E_\perp^2$ 诠释为观察者的外部时间轴与内部相位记忆面属于 `MODEL` 综合，此处不宣称存在额外的形式同构定理。
:::

::: {.viz src="pisot-clifford-rauzy-sandtable" preset="clifford" height="500"}
**克利福德线—面分解卡（`clifford`）**：三维代数坐标舞台将沿青色一维轴 $E_\parallel$ 的倍率 $\beta_3$ 膨胀，与二维内部平面 $E_\perp$ 上绕双向量轴的紫色旋转收缩 $|\alpha| e^{i\arg\alpha}$ 同台呈现；琥珀色圆点标出当前可拖拽的格点分解位置。坐标求值属 `NUM`，克利福德观察者词典属 `MODEL`。
:::

既然二维内部旋面上的单步收缩模长定格在 $|\alpha|_{K=3} = \beta_3^{-1/2} \approx 0.737353$，一个自然的数值追问随之浮现：它与[第 24 章](ch24-cosine-fixed-points-and-self-reference.md)和[第 33 章](ch33-all-beings-observers-and-mutual-attractors.md)反复出现的余弦自指不动点 $\theta^* = \cos\theta^* \approx 0.739085$ 究竟是什么关系？
