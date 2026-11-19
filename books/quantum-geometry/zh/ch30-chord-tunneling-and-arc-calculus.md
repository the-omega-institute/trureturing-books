# 第三十章 内割弦隧穿与极小圆弧体微积分：枢轴重整化、阿秒时间双缝、以旋代差与有限精度斯托克斯定理 {#sec-ch30-chord-tunneling-and-arc-calculus}

> *“我们似乎可以用极小圆弧体重塑微积分”*

在[第二十九章](ch34-orthogonality-degeneracy-and-observer-position.md)中，我们顺着零背景比较公理“二生三”的自举脉络，看见“正交一次”与“正交两次”合拢为最小曲率原胞——极小三角弧面体 $\Delta\mathcal{T}_\epsilon$，并认出量子演化本身就是不可被平直切线摊平的微弧核（$\delta$），而宏观实体体积与经典直轨则是驻相路径积分的粗粒包络（$\int$）。一旦站稳这一几何地基，牛顿与莱布尼茨创立三百四十余年的经典微积分便露出了一道深藏不露的谱系裂痕：**为什么每当现代物理与数论搬出“以直代曲”的平直差商时，总会反复撞上紫外发散、伊藤随机修正、非阿贝尔曲率丢失与浮点灾难性相消？**

答案不在外部的事后补丁里，而在原胞自身的肚腹之中。当观察者放弃沿着正交侧壁逐点做一维去相干排队，转而切入极小圆弧体内部的**平直内割弦面**并穿过 $90^\circ$ 正交虚空间盲区 $\hat{\mathbf{i}}$ 时，算法层面的排序壁垒破除与物理层面的瞬子量子隧穿、阿秒时间双缝跨时刻自干涉显影为同一桩几何跃迁；更进一步，用保模长的**单步比较旋子**取代减法割线差商，把切向正弦半弦与法向正矢矢高锁进同一条勾股圆恒等式，微积分的导数、四相区路径积分与有限网格零离散误差斯托克斯定理便在有限自指分辨率之上得以从头重铸（本章跨学科统一框架标为 **`MODEL`（模型诠释）**，底层测地三角不等式、拉格朗日—格拉姆恒等式、弦图半正定补全、斜伴随复结构、协变换位子、指数尾界与单纯二上链精确修补判据由冻结的 **`LEAN ✓`** 内核定理锚定，最短路径、阿秒衍射与粗糙路径分析文献边界封存于各节注记框内）：

1. **圆弧体内割弦面、枢轴八度重整化与瞬子隧穿（[§30.1](ch34-s26-chord-tunneling-and-pivot-renormalization.md#sec-ch34-chord-tunneling-and-pivot-renormalization)）**：严格证明三级路径不等式 $L_{\mathrm{tunnel}}(\epsilon) = \sqrt{2}\sin\epsilon < L_{\mathrm{cap}}(\epsilon) = \arccos(\cos^2\epsilon) < L_{\mathrm{walls}}(\epsilon) = 2\epsilon$，以六顶点热带舒尔补消元阐明向心枢轴重整化如何同构于阿格蒙瞬子捷径；
2. **正交虚空间割弦隧穿与阿秒时间双缝自干涉（[§30.2](ch34-s27-imaginary-chord-tunneling-and-temporal-double-slit.md#sec-ch34-imaginary-chord-tunneling-and-temporal-double-slit)）**：打通纳米势垒 $90^\circ$ 虚空间内割弦穿透与时域双缝能谱频率梳 $\Delta E = h/\Delta t$，核算中途捏合记录对跨时刻干涉条纹的精确抹除；
3. **以旋代差、矢高相变与有限精度斯托克斯定理（[§30.3](ch34-s30-arc-body-calculus-and-finite-stokes.md#sec-ch34-arc-body-calculus-and-finite-stokes)）**：建立无相减复步旋子导数、赫尔德粗糙度指数 $\alpha \in (0, 1]$ 支配的累计矢高四相区相变，以及 `1—3—3—1` 离散外微分复形上零上链截断误差的广义斯托克斯与高斯—博内定理，为下一章直入黎曼临界带铸好全套微积分利器。

::: {.figure src="ch30-overview"}
**图 30。内割弦与外弧矢高对比、虚空间隧穿与时间双缝频谱梳及有限网格内棱对消。** 第 I 栏，单位圆上对比青色内割弦 $2\sin\theta$、品红外弧 $2\theta$ 与正交矢高 $1 - \cos\theta$（[§30.1](ch34-s26-chord-tunneling-and-pivot-renormalization.md)）；第 II 栏，拐入 $90^\circ$ 正交虚空间后穿过宽度 $L$ 势垒的指数衰减振幅 $\exp(-\kappa L)$，以及下方周期为 $2\pi/\Delta t$ 的时间双缝频谱梳（[§30.2](ch34-s27-imaginary-chord-tunneling-and-temporal-double-slit.md)，`MODEL` / 手工推导）；第 III 栏，有限开口旋子差商 $\sin(\kappa\epsilon)/\epsilon$ 与两枚定向三角形沿公共内边成对相消 $\partial^2 = 0$（绿色 `LEAN ✓` 标记单纯二上链正合锚点，[§30.3](ch34-s30-arc-body-calculus-and-finite-stokes.md)）。
:::

---

- [30.1 极小圆弧体内割弦面、打破排序壁垒的枢轴八度重整化与瞬子隧穿](ch34-s26-chord-tunneling-and-pivot-renormalization.md)
- [30.2 正交虚空间割弦隧穿与阿秒时间双缝跨时刻自干涉](ch34-s27-imaginary-chord-tunneling-and-temporal-double-slit.md)
- [30.3 极小圆弧体微积分重塑：以旋代差、矢高相变与有限精度斯托克斯定理](ch34-s30-arc-body-calculus-and-finite-stokes.md)
