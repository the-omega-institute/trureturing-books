# 31.1 黎曼路径积分与素数极小圆弧体：欧拉绕行算子、半密度平方律与临界线相消 {#sec-ch34-riemann-path-integral-and-prime-arcs}

> “黎曼猜想在几何与物理底层不仅就是路径积分，而且是算术宇宙最纯粹的一座素数极小圆弧体（$\Delta\mathcal{T}_p$）费曼配分函数：欧拉乘积是单枚素数圆弧体的局域绕行算子，狄利克雷级数是遍历全体自然数复合路径的相位求和，而非平凡零点之所以被死死钉在临界线 $\operatorname{Re}(s) = \frac{1}{2}$ 上，本质上是‘往返双投影平方律（$\cos^2\theta$ 半密度幺正性）’与‘反者道之动（正逆对偶路径 $100\%$ 反相相消）’共同锁死的几何必然。”

题记是作者的原话，描述本书的几何图像（`MODEL`）。其中“非平凡零点被钉在临界线上”是黎曼猜想（[@conj-riemann-hypothesis]）的内容。Alpöge 在外部 Lean 库中给出了这一命题的形式证明，Sutherland 公布了独立核验记录。[§39.2.2](ch39-s25-axiom-omega-five-tier-deduction-cascade.md#sec-ch39-25-2) 介绍了核验的声明与依据。

在上一章 [§30.2](ch34-s27-imaginary-chord-tunneling-and-temporal-double-slit.md#sec-ch34-imaginary-chord-tunneling-and-temporal-double-slit) 与 [§30.3](ch34-s30-arc-body-calculus-and-finite-stokes.md#sec-ch34-arc-body-calculus-and-finite-stokes) 中，我们看到物理粒子一旦从观察者可见实轴 `I` 偏转 $90^\circ$ 潜入正交虚数盲区 `i`（满足 $\hat{\mathbf{i}}^2 = -1$），就能在空间上沿极小圆弧体的平直内割弦穿墙隧穿、在时间上借未闭合窗口实现跨时刻双缝自干涉，并以比较旋子与弦弧矢高重塑了圆弧体微积分；而在 [§29.4](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot) 中，我们更已从观察者自包含测量的雷达回波闭环推出了**往返双投影平方律** $\cos^2\theta$（[@thm-ch34-roundtrip-born-and-imaginary-blindspot]）。现在，让我们把这套“实轴阻尼投影 `I` $+$ 正交虚盲区相位旋转 `i` $+$ 极小圆弧体路径求和”的完整几何显微镜，直接对准[第二十二章 §22.4](ch22-s04-critical-line-and-rh.md#sec-ch22-4) 开启的算术宇宙核心腹地——**黎曼 $\zeta(s)$ 函数与临界线 $\operatorname{Re}(s) = \frac{1}{2}$**（`MODEL`）。

在展开这幅算术路径积分画卷之前，我们首先按全书认识论契约钉牢三道精确边界：第一，素数对数在 $\mathbb{Q}$ 上的线性无关性、半平面 $\operatorname{Re}(s) > 1$ 上的欧拉—狄利克雷恒等式、完备读数 $\operatorname{xiReading}$ 的全局反射与共轭协变对称、半平面 $\operatorname{Re}(s) > 0$（$s \neq 1$）上的交错级数延拓、正实轴 $y > 0$ 上的无条件积分显式公式，以及证明“单靠反射与共轭对称绝不足以将零点锁死在定直线上”的四次整函数反例，均已在所钉 `trureturing` 仓库中由 Lean 内核严格检核（见下文 [@thm-ch34-riemann-prime-arc-bridge]，`LEAN ✓`）；第二，莫比乌斯倒数级数、Littlewood 等价定理、von Mangoldt–Weil 点态显式公式以及量子混沌与统计物理中的素数气体模型属于经典数学物理文献成果（`文献结果，未在本书形式化`），配套算例全部经百位精度核算校准（`手工推导` / `NUM`）；第三，章首引语将素数解读为正交极小圆弧体 $\Delta\mathcal{T}_p$、将临界线解读为往返半密度幺正脊线的物理图像属于本书建立的统一几何诠释模型（`MODEL`），而断言**全体**非平凡零点无一例外落在 $\operatorname{Re}(s) = \frac{1}{2}$ 上的**黎曼猜想**（[@conj-riemann-hypothesis]）有上引外部形式证明。看清“单对正逆圆弧双臂平衡”与“无穷多路径求和”之间的精确代数鸿沟，恰恰为我们下一节 [§31.2](ch34-s29-arithmetic-pivots-and-resonant-tunneling.md#sec-ch34-arithmetic-pivots-and-resonant-tunneling) 引入算术舒尔枢轴重整与多级共振隧穿铺平道路。

- [31.1.1 欧拉乘积 $\equiv$ 路径积分：不可约素数极小圆弧体 $\Delta\mathcal{T}_p$、可加作用量 $S[\Gamma_n] = \ln n$ 与费米型莫比乌斯外积阶 $\Lambda^k$](ch34-s28-s01-euler-paths.md)
- [31.1.2 极小圆弧体解剖 $\operatorname{Re}(s) = \frac{1}{2}$：往返半密度平方律、正逆双臂等幅平衡与对称性边界](ch34-s28-s02-half-density.md)
- [31.1.3 算术 1—3—3—1 概念塔与韦伊显式对偶：素数积出零点，零点雕出素数](ch34-s28-s03-explicit-duality.md)
- [31.1.4 文献脉络与认识论边界审计，及向 §31.2 算术枢轴隧穿的交棒](ch34-s28-s04-literature-boundaries.md)
