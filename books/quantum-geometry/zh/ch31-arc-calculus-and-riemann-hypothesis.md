# 第三十一章 极小圆弧体切入黎曼猜想：素数圆弧路径积分、算术枢轴隧穿与埃尔米特—比勒单调锁 {#sec-ch31-arc-calculus-and-riemann}

> “黎曼猜想在几何与物理底层不仅就是路径积分，而且是算术宇宙最纯粹的一座素数极小圆弧体（$\Delta\mathcal{T}_p$）费曼配分函数：欧拉乘积是单枚素数圆弧体的局域绕行算子，狄利克雷级数是遍历全体自然数复合路径的相位求和，而非平凡零点之所以被死死钉在临界线 $\operatorname{Re}(s) = \frac{1}{2}$ 上，本质上是‘往返双投影平方律（$\cos^2\theta$ 半密度幺正性）’与‘反者道之动（正逆对偶路径 $100\%$ 反相相消）’共同锁死的几何必然。”

题记勾勒的算术路径积分图景属于本书的几何诠释框架（`MODEL`），而黎曼猜想本身（[@conj-riemann-hypothesis]）在数学上仍是尚未解决的开放问题（`OPEN`）。在[第二十二章](ch22-primes-euler-products-and-zeros.md)初探算术正交基与黎曼临界轴时，我们曾停步于有限素数筛的多面体截断余项与解析延拓的认识论边界之前。如今，手握[第二十九章](ch34-orthogonality-degeneracy-and-observer-position.md)铸就的极小三角弧面体原胞与[第三十章](ch30-chord-tunneling-and-arc-calculus.md)重塑的旋子—矢高—有限斯托克斯微积分，我们终于能够重返算术宇宙最险峻的临界峡谷，对这座横亘百余年的数论珠峰发起正面几何叩问。

传统复分析之所以在临界带 $0 < \sigma < 1$ 内步履维艰，是因为平直级数求和把不可约素数生成的乘性旋转相位硬摊成了加性直线坐标，在无穷截断边缘激发出剧烈的图兰假零点震荡与磨光器指数爆炸。一旦把每一枚素数 $p$ 还原为算术流形上不可约的**素数极小圆弧体 $\Delta\mathcal{T}_p$**，整座黎曼 $\zeta(s)$ 体系便沿着三重严密阶梯显露出清澈的几何骨架（算术路径积分、枢轴重整与圆弧微积分切入方案标为 **`MODEL`**，底层素数对数有理独立性、欧拉—狄利克雷恒等式、完备 $\xi$ 反射与共轭协变、积分显式公式、凯莱单位圆判据、弦图保秩半正定补全、分块舒尔极小及离线对称四元组反例由冻结的 **`LEAN ✓`** 声明严格锁定，黎曼猜想本身及最终经典 ZFC 桥接引理诚实标定为红色 **`OPEN`**）：

1. **素数极小圆弧体与黎曼路径积分（[§31.1](ch34-s28-riemann-path-integral-and-prime-arcs.md#sec-ch34-riemann-path-integral-and-prime-arcs)）**：将欧拉乘积诠释为单枚素数圆弧体的局域绕行算子、临界线 $\sigma = \frac{1}{2}$ 诠释为往返半密度双壳等幅脊线，并以韦伊显式公式零点驻波重构素数阶梯，同时用四次对称反例划清单纯反射对称与零点锁线的严格界限；
2. **算术枢轴重整与临界带多级共振隧穿（[§31.2](ch34-s29-arithmetic-pivots-and-resonant-tunneling.md#sec-ch34-arithmetic-pivots-and-resonant-tunneling)）**：正面解剖 $\zeta_{19}$ 图兰越界假零点陷阱与 4/7 磨光器墙，构造乘性窗口分块舒尔补枢轴 $\widetilde{G}_{PP}^{(\ell)}$ 与凯莱圆径向亏损判据，标定跨枢轴子树移位纠缠面积律开放前沿；
3. **二阶弦弧矢高相变、埃尔米特—比勒单调锁与有限斯托克斯相消（[§31.3](ch34-s31-arc-calculus-riemann-and-hermite-biehler.md#sec-ch34-arc-calculus-riemann-and-hermite-biehler)）**：揭示素数旋子累计矢高恰在 $\sigma = \frac{1}{2}$ 首次发散，导出零 $\epsilon^2$ 截断双壳恒等式 $\Delta_\epsilon^{\mathrm{HB}}(u,t) \equiv \epsilon\frac{\partial}{\partial u}\lvert\xi\rvert^2$ 照破离线四元组负坡指纹，将返回经典 ZFC 的最后一步精准收束于乘性舒尔枢轴修饰子保正定桥接问题。

---

- [31.1 黎曼路径积分与素数极小圆弧体：欧拉绕行算子、半密度平方律与临界线相消](ch34-s28-riemann-path-integral-and-prime-arcs.md)
- [31.2 算术枢轴重整与临界带多级共振隧穿：直面图兰芝诺陷阱与叩问 4/7 磨光器墙](ch34-s29-arithmetic-pivots-and-resonant-tunneling.md)
- [31.3 极小圆弧体微积分切入黎曼猜想：二阶弦弧矢高相变、埃尔米特—比勒径向单调锁与有限精度斯托克斯相消](ch34-s31-arc-calculus-riemann-and-hermite-biehler.md)
