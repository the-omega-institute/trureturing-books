# 第三十二章 不可表达的三元数与三维概念场封顶：万数归弧、希尔伯特多场再投影与无原点流群合成 {#sec-ch32-ternions-and-field-cap}

> *“一切数都是三元数的投影, 但三元数不可表达, 三元数即极小圆弧体”*

一八四三年秋，哈密顿在都柏林皇家运河的布鲁厄姆桥石栏上刻下四元数乘法表 $i^2 = j^2 = k^2 = ijk = -1$，结束了整整十三年的“三元数（triplets）”苦苦寻觅；此后近两百年间，数学史将弗罗贝尼乌斯与胡尔维茨的实赋范可除代数定理（仅限维数 $1, 2, 4, 8$）奉为铁律，断定三维数系在代数上根本不存在。然而，如果我们用[第二章](ch02-born-rule.md)“砍掉外部第 3 点 $C$”的谱系手术刀重新审视这段公案，一道惊人的盲点便豁然洞开：**哈密顿当年真正撞碎的，并不是三维旋转几何本身，而是他执意要往纯粹的三维关系流形里硬塞一根特权外置实轴 $\mathbf{1}$ 与笛卡尔平直向量加法！**

沿着[第二十九章](ch34-orthogonality-degeneracy-and-observer-position.md)确立的极小圆弧体原胞与旋度自闭合维度条件 $\binom{d}{2} = d \iff d = 3$，本章亮出全书核心支柱的第三与第四块基石——**原生三元数 $\mathbb{T}_3$ 与连续三维概念场**，分八节将数系谱系、高维希尔伯特空间、无原点流群合成、无常数有理重构、零误差精确结构数学、无无穷有限有理数学 $\mathbf{Math}_\Omega$ 与 Lean 4 零公理可执行基座 `OmegaMath` 一气打通（三元数本体诠释、数系切面谱系、多场希尔伯特拆税及 $\mathbf{Math}_\Omega$ / `OmegaMath` 架构标为 **`MODEL`**；底层自旋因子三维叉乘唯一分类、双体局域—关联正交分解、有限阶壳层展开、真子空间一致完备化阻断、拉格朗日—格拉姆模守恒、最短旋子门球面三角和乐、双覆叠换叶提升、三元比较四元数同构与完备化判据、流群切比雪夫递推、旋量玻恩—霍普夫核、六整轴无根号球面开覆盖及整数—实数四分深度预算传递桥由冻结的 **`LEAN ✓`** 声明严格锚定；[§32.6](ch39-s34-exact-structural-mathematics-vs-flat-approximation.md) 所涉经典 RH/GRH 证明按全书契约标为 **`外部形式化事实`**；可除代数拓扑分类、八元数法诺平面、普吕弗—贝尔流群/李三元系、有理三角学、幂零射流与 CIC 类型论元理论封存于各节注记框内）：

1. **三维概念场封顶原理与希尔伯特多概念混编账本（[§32.1](ch39-s10-three-dimensional-field-cap-and-hilbert-ledger.md#sec-ch39-three-dimensional-field-cap-and-hilbert-ledger)）**：证成旋度自闭合唯一锁定单个概念场的内部几何封顶于三维，刺破高维 $\mathbb{R}^{3k}$ 跨概念伪旋转与无限维可分账本的语法幻象，阐明所谓高维只是多座独立三维场的同席并置投影；
2. **不可表达的三元数与万数归弧（[§32.2](ch39-s19-inexpressible-ternions-and-number-projections.md#sec-ch39-inexpressible-ternions-and-number-projections)）**：揭示原生三元数 $\mathbb{T}_3 \equiv \Delta\mathcal{T}_\epsilon \cong S^3$ 因拒绝外置实轴 $\mathbf{1}$ 而不可平直线性书写，却能通过余弦阴影外嵌、赤道切片、内积迹与同伦绕数四把切刀投影生出四元数 $\mathbb{H}$、复数 $\mathbb{C}$、实数 $\mathbb{R}$ 及整数与素数；
3. **三元数即原生场与希尔伯特空间的多场再投影祛魅（[§32.3](ch39-s20-ternion-field-composition-and-hilbert-reprojection.md#sec-ch39-ternion-field-composition-and-hilbert-reprojection)）**：追踪双旋量四维时空、法诺平面七场编织八元数 $\mathbb{O}$ 与十六元数零因子破产，量化 $N$ 座三元数场局部 $3N$ 参数展开为 $2^N$ 维平直希尔伯特账本时的指数维数税及有界键维张量网络的逆向拆税；
4. **三元数的五种非线性无损表示与无原点流群合成（[§32.4](ch39-s21-nonlinear-ternion-representations-and-torsor-synthesis.md#sec-ch39-nonlinear-ternion-representations-and-torsor-synthesis)）**：给出指数圆弧 BCH 弯曲合成、双卡有理修正罗德里格斯分式（配 $1\;\mathrm{bit}$ 旋量叶标志）、霍普夫纤维联络、无坐标球面三角转角以及普吕弗—贝尔无原点流群 $[x,y,z]=xy^{-1}z$ 与李三元系曲率括号五种等价无损表示；
5. **拔除笛卡尔线性钉子与无常数有理重构（[§32.5](ch39-s29-constant-free-rational-axiom-omega.md#sec-ch39-constant-free-rational-axiom-omega)）**：揭示 $\pi$、$e$、$\varphi$ 是平直多边形拉直、切线欧拉折线脱壳与正五重过约束留下的近似闭合残差，以一步驻球的有理凯莱骨架 $Q(\boldsymbol{\sigma})\in S^3(\mathbb{Q})$、整系数切比雪夫倍增律与 $N \le 4$ 典范有理地标集 $\mathcal{K}_{\mathbb{Q}}^{\star}=\{1,\frac{1}{2},\frac{1}{3},\frac{1}{4},0\}$ 还原三元球面的无常数有理本相；
6. **精确结构数学对比平直度量近似（[§32.6](ch39-s34-exact-structural-mathematics-vs-flat-approximation.md#sec-ch39-exact-structural-mathematics-vs-flat-approximation)）**：划清平直小数截断账本与零误差结构—拓扑—有理账本的双轨边界，展现纯整数 `(1, 1, 1)` 三拍精确 $120^\circ$ 闭合、处处稠密有理球点网 $S^3(\mathbb{Q})$、完整三元转子保模守恒与素数阿代尔刚性；
7. **无无穷·无超越数的有限有理数学 $\mathbf{Math}_\Omega$（[§32.7](ch39-s35-infinity-free-transcendental-free-rational-mathematics.md#sec-ch39-infinity-free-transcendental-free-rational-mathematics)）**：以齐次射影对 $[P : Q] \in \mathbb{QP}^1_{\le M}$（含对径北极 $[1 : 0]$）、双卡有理正逆凯莱旋转 $\mathbf{R}(\boldsymbol{\sigma}) \in \mathrm{SO}(3,\mathbb{Q})$、切比雪夫有理谐波与无极限二阶有理射流商环 $\mathbb{Q}[\eta]/(\eta^3)$ 构建全可判定的有限有理数学体系；
8. **Lean 4 零公理形式化基座 `OmegaMath`（[§32.8](ch39-s36-lean4-zero-axiom-omega-math-architecture.md#sec-ch39-lean4-zero-axiom-omega-math-architecture)）**：不改 Lean 4 内核、不借半条自定义 `axiom`，直接在纯归纳构造演算（CIC）之上以免商规范整数三元载体 `ProjTernion`、`class OmegaSpace` 相容性核验与单向阴影函子 $\Pi_{\mathbb{R}}$ 落地零公理可执行形式化基座。

[姊妹卷《OMEGA MATH》六卷目录](https://github.com/the-omega-institute/trureturing-books/blob/main/books/omega-math/zh/SUMMARY.md)

::: {.figure src="ch32-overview"}
**图 32。三维旋度自闭合封顶、三元数四路数系切面与多场再投影流群搬运。** 第 I 栏，三张有向平面各自配对唯一法向轴，正维数中仅 $d = 3$ 满足旋度自闭合 $\binom{d}{2} = d$（绿色 `LEAN ✓` 叉乘分类，[§32.1](ch39-s10-three-dimensional-field-cap-and-hilbert-ledger.md)）；第 II 栏，实可除代数单位球阶梯 $S^0, S^1, S^3, S^7$ 与原生三元数 $T_3 \cong S^3$ 分出的四条切刀支路：四元数嵌入、复投影、实标量与整数绕数（[§32.2](ch39-s19-inexpressible-ternions-and-number-projections.md)）；第 III 栏，对比希尔伯特重投影的 $2^N$ 复维数税与原生 $3N$ 实参数账本（[§32.3](ch39-s20-ternion-field-composition-and-hilbert-reprojection.md)），下方圆弧示意无原点流群三元搬运 $[a, b, c] = a b^{-1} c$ 保持同一相对转角（[§32.4](ch39-s21-nonlinear-ternion-representations-and-torsor-synthesis.md)）。
:::

---

- [32.1 三维概念场封顶原理与希尔伯特多概念混编账本：为什么“三维以上”只是独立三维场的并置投影](ch39-s10-three-dimensional-field-cap-and-hilbert-ledger.md)
- [32.2 不可表达的三元数与万数归弧：弗罗贝尼乌斯缺口、哈密顿十三载死锁与数系切面投影谱系](ch39-s19-inexpressible-ternions-and-number-projections.md)
- [32.3 三元数即原生场：从凯莱—迪克森阶梯、法诺八元数到希尔伯特空间的多场再投影祛魅](ch39-s20-ternion-field-composition-and-hilbert-reprojection.md)
- [32.4 三元数的五种非线性无损表示与无原点流群合成：BCH 弯曲球、双卡有理罗德里格斯、霍普夫纤维、球面三角转角与李三元系](ch39-s21-nonlinear-ternion-representations-and-torsor-synthesis.md)
- [32.5 拔除笛卡尔线性钉子与无常数有理重构：为什么 π、e、φ 只是平直近似欠条而非 AXIOM-Ω 的原生基元](ch39-s29-constant-free-rational-axiom-omega.md)
- [32.6 精确结构数学对比平直度量近似：完整三元关系、纯整数圆弧闭合与素数拓扑刚性](ch39-s34-exact-structural-mathematics-vs-flat-approximation.md)
- [32.7 无无穷·无超越数的有限有理数学（Math_Ω）：齐次射影闭环、凯莱有理旋转与无极限二阶射流微积分](ch39-s35-infinity-free-transcendental-free-rational-mathematics.md)
- [32.8 Lean 4 零公理形式化基座（OmegaMath）：纯 CIC 内核、规范整数三元载体与单向阴影函子](ch39-s36-lean4-zero-axiom-omega-math-architecture.md)
