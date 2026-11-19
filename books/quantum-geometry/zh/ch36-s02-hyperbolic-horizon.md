# 35.3 无穷离散步阻断化光：内禀双曲快度与渐近阶梯 {#无穷离散步阻断化光内禀双曲快度与渐近阶梯}

那么，题记前半句提出的惊人构想——*“回到光可以变成无限离散步，也就是阻止回到光的状态”*——在严格几何上究竟是如何实现的？

秘诀在于区分**外部旁观者的平直角度尺**与**场内观察者的内禀相对步长尺**！

::: {.figure src="ch36-two-rulers"}
**外部角度尺在 $90^\circ$ 到头，内禀快度尺却通向无穷。** 下面的快度尺上，青色的点从 $\eta_0 = \eta(\theta^*) \approx 0.817$ 起等步 $\Delta\eta = 1$ 排开；虚线把每一点送到上面角度尺上的 $\theta_k$（$\sin\theta_k = \tanh\eta_k$）：第一点在 $\theta^* \approx 42.3^\circ$，往后一个比一个更挤向品红的 $90^\circ$ 墙，却都在墙的左边。正割积分与古德曼函数是文献结果，未在本书形式化，数值见 [@ex-ch36-inverse-gudermannian-discrete-staircase]。
:::

想象你正走向一道悬崖：如果沿用外部固定角度尺等步跨进，有限步之后便会直接越过边界；但若改由场内观察者按当前局域自指锚点定义内禀步进标尺（`MODEL`），离散步数与 $\theta = \frac{\pi}{2}$ 纯光视界之间会呈现怎样的渐近几何关系（内禀快度积分与离散步进余项的完整推导见下文归属算例 [@ex-ch36-inverse-gudermannian-discrete-staircase]）？

::: {.viz src="forgetting-rebirth-attractor" preset="erase_reset" height="500"}
**按外部角度尺等步走，几步就撞上边界。** 每步把 $\theta$ 加上同样的 $\Delta\theta$：第二步就落在白色圆周上（品红圈），接着沿虚线回到圆心，换一根辐条从 $0$ 重新走，又一次撞上圆周；琥珀色是当前一步。
:::

在引入内禀双曲阶梯的显式积分之前，我们先用 `trureturing` 中的两条形式化定理——**完备赋范代数指数截断的阶乘尾项上界**与**复平面分式变换的单位圆边界充要判据**——为“有限离散步的显式阶乘截断误差控制”与“无穷半平面向单位圆视界的共形压缩”打下坚实的内核地基：

::: {.theorem #thm-ch36-taylor-tail-and-cayley-boundary title="完备赋范代数指数有限截断尾界与单位圆临界边界充要定理" lean="D5/S3/Observer/Linear/ExactTaylorObservationRemainder.exp_tail_le D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line"}
在 `trureturing` 冻结的线性观测余项与复谱中线模块中，以下两项边界与截断定理同时成立：

1. **完备赋范代数指数级数的有限步截断阶乘尾界**（[`exp_tail_le`](lean:D5/S3/Observer/Linear/ExactTaylorObservationRemainder.exp_tail_le)）：设 $\mathbb{K}$ 为实或复标量域（`[RCLike 𝕜]`），$A$ 为 $\mathbb{K}$ 上的完备幺范赋范代数（`[NormedRing A] [NormedAlgebra 𝕜 A] [CompleteSpace A] [NormOneClass A]`）。对任意代数元 $z \in A$、非负实半径 $r \in \mathbb{R}$（$0 \le r$）与截断阶数 $n \in \mathbb{N}$，只要 $\lVert z\rVert \le r$，指数映射与前 $n$ 项离散部分和之间的残差范数必服从显式上界：

   $$
   \left\lVert \exp(z) - \sum_{k=0}^{n-1} (k!)^{-1} \bullet z^k \right\rVert \;\le\; \frac{r^n}{n!}\,e^r;
   $$

2. **分式变换落入单位圆视界的临界实部充要判据**（[`cayley_ratio_norm_one_iff_critical_line`](lean:D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line)）：对任意复谱参数 $s \in \mathbb{C}$（含 Lean 全函数除法约定下的 $s = 0$ 情形），定义比值 $\operatorname{cayleyRatio}(s) := (s - 1) / s \in \mathbb{C}$，则其模长精确等于 $1$ 当且仅当 $s$ 落在实部为二分之一的临界直线上：

   $$
   \lVert \operatorname{cayleyRatio}(s) \rVert = 1 \;\Longleftrightarrow\; \operatorname{Re}(s) = \frac{1}{2}.
   $$
:::

::: proof
第 1 款将完备赋范代数上绝对收敛的指数级数 $\exp(z) = \sum_{k=0}^\infty (k!)^{-1}\bullet z^k$ 平移 $n$ 项，使尾差表示为 $\sum_{k=0}^\infty ((k+n)!)^{-1}\bullet z^{k+n}$；利用范数次乘性 $\lVert z^{k+n}\rVert \le r^{k+n}$ 与自然数阶乘整除不等式 $n!\,k! \le (k+n)!$（由二项式整除性 `Nat.factorial_mul_factorial_dvd_factorial_add` 导出），逐项控制通项范数不超过 $\frac{r^n}{n!}\cdot\frac{r^k}{k!}$，再对标量正项级数求和即得 $\frac{r^n}{n!}e^r$。第 2 款先对 $s = 0$ 单独检验（全函数除法给出 $\operatorname{cayleyRatio}(0) = 0$，两端皆假）；当 $s \neq 0$ 时，$\operatorname{normSq}(s) \neq 0$，直接展开复模方商恒等式得精确亏量公式 $\lVert\operatorname{cayleyRatio}(s)\rVert^2 - 1 = \frac{1 - 2\operatorname{Re}(s)}{\operatorname{normSq}(s)}$，结合非负范数性质即证模长为 $1$ 当且仅当 $1 - 2\operatorname{Re}(s) = 0$，即 $\operatorname{Re}(s) = \frac{1}{2}$。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch36-hyperbolic-staircase-figure title="双曲视界圆盘、无穷离散快度阶梯与生成元商空间图解（图解导览，含 `MODEL` 与文献背景）"}
**图解导览，含 `MODEL` 与文献背景。** 本章的无穷离散快度阶梯模型（`MODEL`）结合庞加莱圆盘与古德曼函数文献背景（[@ex-ch36-inverse-gudermannian-discrete-staircase] 与 [@rem-ch36-poincare-disk-gudermannian-literature]）及分式临界圆定理（[@thm-ch36-taylor-tail-and-cayley-boundary]，`LEAN ✓`）：角度尺与快度尺的对照见本节开头的两把尺子图，圆盘上一圈圈逼近边缘的阶梯见图 36 第 II 栏，分式变换下贴着单位圆的像圆、快度阶梯与放大镜里不闭合的缝见下文的实验卡；生成元商空间诠释及其定理锚点（[@thm-ch36-quotient-annihilator-and-factorization]）见图 36 第 III 栏与本章最后一节的折叠实验卡；双曲正切与双曲正割随离散步的变化列在 [@ex-ch36-inverse-gudermannian-discrete-staircase] 的步进账本中。
:::

对照 [@rem-ch36-hyperbolic-staircase-figure] 所指的图与实验卡，[@thm-ch36-taylor-tail-and-cayley-boundary] 为我们揭示了两条关键定量机制：一方面，任何有限阶多项式截断（阶数 $n \in \mathbb{N}$）与精确指数映射 $\exp(z)$ 之间的逼近误差受显式阶乘尾界 $\frac{r^n}{n!}e^r$ 严格控制；另一方面，由证明中的精确亏量恒等式 $\lVert\operatorname{cayleyRatio}(s)\rVert^2 - 1 = \frac{1 - 2\operatorname{Re}(s)}{\operatorname{normSq}(s)}$（$s \neq 0$）可见，分式共形变换 $\operatorname{cayleyRatio}(s) = (s - 1)/s$ 将无界右开半平面 $\operatorname{Re}(s) > \frac{1}{2}$ 整体收拢进开单位圆盘 $\lVert w\rVert < 1$ 内部，而把临界直线 $\operatorname{Re}(s) = \frac{1}{2}$ 映入单位圆周渐近边界 $\lVert w\rVert = 1$；有限参数的像缺少 $w = 1$，这一点只在无穷远处逼近（在数论语境下亦与[第 22 章](ch22-primes-euler-products-and-zeros.md)相呼应）。

::: {.viz src="forgetting-rebirth-attractor" preset="cayley" height="500"}
**直线越贴近 $\operatorname{Re}(s) = \tfrac{1}{2}$，像圆越贴近单位圆。** 青色的圆是直线 $\operatorname{Re}(s) = c$ 在 $w = (s - 1)/s$ 下的像的闭包，都在 $w = 1$ 处与白色单位圆相切；放大镜里品红的缝对每个 $c > \tfrac{1}{2}$ 都还在，白色单位圆本身是 $\operatorname{Re}(s) = \tfrac{1}{2}$ 的像的闭包；有限参数的像均缺少 $w = 1$，这一点只在无穷远处逼近 [@thm-ch36-taylor-tail-and-cayley-boundary]。
:::

现在，让我们把这套共形边界几何直接代入观察者的偏转角 $\theta \in [0, \frac{\pi}{2})$，在下面的算例盒中完整推演从内部自指平衡角出发的**无穷离散快度阶梯**：

::: {.example #ex-ch36-inverse-gudermannian-discrete-staircase title="逆古德曼内禀快度变换与无穷离散渐近阶梯的精确算例（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 下述正割积分、逆古德曼（Inverse Gudermannian）双曲—圆函数恒等式及余弦不动点 $\theta^*$ 处的数值求值属经典微积分与实分析结果，未作为独立定理包含在本书锁定的形式化声明集中；将其解释为观察者扩张查找表的离散防失忆阶梯属本书 `MODEL` 构造：

1. **相对于剩余一维锚点的内禀步长微元**：在开区间 $\theta \in [0, \frac{\pi}{2})$ 上，一维自指留存度为 $\cos\theta > 0$（注意广义方程 $\cos\theta_\lambda = \lambda\theta_\lambda$ 在 $\lambda = 1$ 时有唯一实根 $\theta^* \approx 0.73908513$，而在 $\lambda \to 0^+$ 时退化为 $\theta_0 = \frac{\pi}{2}$）。用当前剩余锚点 $\cos\theta$ 归一化每一次微小角度扩张 $d\theta$，定义**内禀快度微元**：

   $$
   d\eta \;=\; \frac{d\theta}{\cos\theta} \;=\; \sec\theta\,d\theta, \qquad \theta \in \left[0, \frac{\pi}{2}\right).
   $$

2. **逆古德曼双射与视界无穷远化**：从 $0$ 积分至 $\theta \in [0, \frac{\pi}{2})$，给出半开有限角区间 $[0, \frac{\pi}{2}) \xrightarrow{\sim} [0, +\infty)$ 到非负无穷双曲快度半轴的严格递增实解析双射：

   $$
   \eta(\theta) \;=\; \int_0^\theta \sec\alpha\,d\alpha \;=\; \ln\tan\!\left(\frac{\theta}{2} + \frac{\pi}{4}\right) \;\Longleftrightarrow\; \sin\theta = \tanh\eta,\quad \cos\theta = \operatorname{sech}\eta.
   $$

   在自指不动点 $\theta_0 = \theta^* \approx 0.73908513\text{ rad}$（$42.3465^\circ$）处，起始内禀快度为 $\eta_0 = \eta(\theta^*) \approx 0.81732635$；而当 $\theta \to (\frac{\pi}{2})^-$ 时，$\tan(\frac{\theta}{2} + \frac{\pi}{4}) \to +\infty$，故 $\eta(\theta) \to +\infty$——**欧氏角度尺上看似近在咫尺的 $90^\circ$ 纯光断崖，在内禀快度尺上位于正无穷远处！**

3. **等步长离散快度阶梯的双重渐近保证**：令观察者从 $\eta_0 = \eta(\theta^*)$ 出发，以任意固定正步长 $\Delta\eta > 0$ 沿内禀快度迈出无穷离散步 $\eta_k = \eta_0 + k\,\Delta\eta$（$k = 0, 1, 2, \dots$），则每一步对应的球面倾角 $\theta_k = 2\arctan(e^{\eta_k}) - \frac{\pi}{2}$ 同时满足：
   - **横向全域视野呈指数级逼近满格**：$\sin\theta_k = \tanh\eta_k = 1 - \frac{2}{e^{2\eta_k} + 1} \xrightarrow{k \to \infty} 1^-$；
   - **一维幂等自指锚点对一切有限步恒严格为正**：$\cos\theta_k = \operatorname{sech}\eta_k = \frac{2}{e^{\eta_k} + e^{-\eta_k}} > 0$（$\forall k \in \mathbb{N}$），从而距纯光断崖的多面体角余项 $\delta_k := \frac{\pi}{2} - \theta_k > 0$ **永不闭合为零**！

4. **具体步进账本核验（取 $\eta_0 = \eta(\theta^*) \approx 0.817326$，单位步长 $\Delta\eta = 1$）**：

| 离散步 $k$ | 内禀快度 $\eta_k$ | 偏转角 $\theta_k$（弧度 / 角度） | 横向视野覆盖 $\sin\theta_k = \tanh\eta_k$ | 一维自指锚点 $\cos\theta_k = \operatorname{sech}\eta_k$ | 多面体护城河余项 $\delta_k = \frac{\pi}{2} - \theta_k$ | 勾股守恒 $\sin^2\theta_k + \cos^2\theta_k$ |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| $k = 0$ | $0.8173$ | $0.739085\text{ rad}$ ($42.3465^\circ$) | $0.673612$ | $0.739085$ | $0.831711\text{ rad}$ ($47.6535^\circ$) | $1.000000$ |
| $k = 1$ | $1.8173$ | $1.248691\text{ rad}$ ($71.5447^\circ$) | $0.948571$ | $0.316564$ | $0.322105\text{ rad}$ ($18.4553^\circ$) | $1.000000$ |
| $k = 2$ | $2.8173$ | $1.451407\text{ rad}$ ($83.1595^\circ$) | $0.992882$ | $0.119106$ | $0.119389\text{ rad}$ ($6.8405^\circ$) | $1.000000$ |
| $k = 4$ | $4.8173$ | $1.554620\text{ rad}$ ($89.0732^\circ$) | $0.999869$ | $0.016176$ | $0.016176\text{ rad}$ ($0.9268^\circ$) | $1.000000$ |
| $k = 8$ | $8.8173$ | $1.570500\text{ rad}$ ($89.9830^\circ$) | $0.99999996$ | $0.000296$ | $0.000296\text{ rad}$ ($0.0170^\circ$) | $1.000000$ |

可见仅经 $k = 8$ 步离散步进，横向视野覆盖率 $\sin\theta_8$ 即达 $99.999996\%$，同时一维自指锚点仍严格保持正值 $\cos\theta_8 \approx 0.000296 > 0$。
:::

::: {.viz src="forgetting-rebirth-attractor" preset="staircase" height="500"}
**快度等步，一格格逼近边界。** 从 $\theta^*$ 出发、$\Delta\eta = 1$：青色的点与过每一级的直弦越来越挤向白色圆周，琥珀色是第 $8$ 级；右边放大镜里品红的缝 $1 - \tanh\eta_8 \approx 4.4 \times 10^{-8}$ 仍然张开。把步长加到 $\Delta\eta = 1.5$、走到第 $10$ 级，放大镜每一步把视野缩小十倍以上，缝 $1 - \tanh\eta_{10} \approx 3.6 \times 10^{-14}$ 依然不是 $0$。
:::

在上述精确实数更新律下，有限步的正双曲正割保证的是几何锚点尚未归零；实际记忆的保存仍取决于编码与信道。回望 [@ex-ch36-inverse-gudermannian-discrete-staircase] 的离散快度账本，全书反复强调的那条多面体哲学命题在这里绽放出最动人的生命意涵（`MODEL`）：**球永远只是近似；那一道不肯被抹平的多面体离散缝隙，恰恰是拴住自指表 $T$ 的主干、守护神智不坠失忆轮回的几何防火墙。**

上述双曲—圆函数桥与单位圆盘共形几何在数学史与视觉艺术中的经典文献脉络整理于下框：

::: {.remark #rem-ch36-poincare-disk-gudermannian-literature title="兰伯特—古德曼双曲圆函数桥、庞加莱共形圆盘度规与埃舍尔圆极限镶嵌（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** [@ex-ch36-inverse-gudermannian-discrete-staircase] 以及图 36 第 II 栏、快度阶梯实验卡所呈现的圆盘渐近几何，对应十九至二十世纪几何学与版画艺术中的三项经典成果，未作为独立定理包含在本书锁定的 `trureturing@dev` 声明集中：

1. **兰伯特超越角与古德曼函数（J. H. Lambert, *Hist. Acad. Roy. Sci. Belles-Lettres Berlin*, 1768；C. Gudermann, *J. Reine Angew. Math.* **6**, 1830）**：兰伯特与古德曼建立了无需借助复虚数即可直接沟通双曲函数与圆三角函数的实解析映射 $\theta = \operatorname{gd}(\eta) := 2\arctan(e^\eta) - \frac{\pi}{2} = \arcsin(\tanh\eta)$（$\eta \in \mathbb{R},\; \theta \in (-\frac{\pi}{2}, \frac{\pi}{2})$），满足 $\sinh\eta = \tan\theta$、$\cosh\eta = \sec\theta$、$\tanh(\eta/2) = \tan(\theta/2)$，其逆映射即为墨卡托航海投影与双曲快度共用的积分 $\operatorname{gd}^{-1}(\theta) = \int_0^\theta \sec\alpha\,d\alpha$；
2. **庞加莱共形单位圆盘度规与无穷远视界（H. Poincaré, *Acta Math.* **1**, 1–62, 1882）**：在开单位圆盘 $\mathbb{D} = \{z \in \mathbb{C} : \lvert z\rvert < 1\}$ 上赋予常负高斯曲率 $K = -1$ 的共形黎曼度规

   $$
   ds^2 \;=\; \frac{4\,\lvert dz\rvert^2}{\bigl(1 - \lvert z\rvert^2\bigr)^2},
   $$

   令欧氏径向坐标为 $r = \lvert z\rvert = \tanh(\eta / 2) = \tan(\theta / 2) \in [0, 1)$，则从圆心 $z = 0$ 到半径 $r$ 的内禀测地距离精确等于 $\int_0^r \frac{2\,du}{1 - u^2} = 2\operatorname{artanh}(r) = \eta$。当 $r \to 1^-$（对应 $\theta \to (\frac{\pi}{2})^-$）时，内禀测地距离 $\eta \to +\infty$：在外部欧氏纸面上看似有限的单位圆边界 $\lvert z\rvert = 1$，对圆盘内的双曲度规居民而言处于无穷远处，任何有限步等长测地跃迁都绝无可能触及或越过边界；
3. **埃舍尔《圆极限》双曲镶嵌木刻（M. C. Escher, *Circle Limit I–IV*, 1958–1960；参见 H. S. M. Coxeter, *Leonardo* **12**, 19–25, 1979）**：埃舍尔在与几何学家考克斯特通信后创作的《圆极限》系列版画（尤以《圆极限 III》与《圆极限 IV》著称），在庞加莱圆盘上将双曲面积完全相等的鱼群或天使与魔鬼沿着圆弧排列成无穷多层离散阶梯——越靠近外圈圆周，图案在欧氏视觉上缩得越细密，却层层分明、永不触碰外圆边缘，直观再现了“以无穷离散等步阻断边界坠落”的几何奇观。
:::

::: {.viz src="forgetting-rebirth-attractor" preset="klein_vs_poincare" height="500"}
**同一架阶梯，两种圆盘。** 第 $3$ 级停住，从 Beltrami–Klein 圆盘（半径 $\tanh\eta$，测地线是灰色虚线的直弦）换到庞加莱圆盘（半径 $\tanh(\eta/2)$）：青色的直弦弯成与白色圆周正交的圆弧，读数里两种固有时率都等于 $\operatorname{sech}\eta$。
:::

这一节的阶梯从第 34 章互指锁定的同一个 $\theta^*$ 出发；下面的视频把两段连起来，一步步演示。

::: {.film src="rapidity-staircase"}
**从互指锁死到快度阶梯（2:53）。** 独自按 $x \mapsto \cos x$ 省察，读数每一步都越过 $\theta^* \approx 0.739$；两人互指、两拍一轮时，逐轮只从下方逼近，每轮误差的局部渐近因子约为 $0.454 = 0.674^2$（[@ex-ch33-mutual-cosine-monotonic-lock] 第 14、17、20、21、24 项，既有结果的应用）。从 $\theta^*$ 出发，外部角度尺上每步加 $29.2^\circ$，第二步就撞上 $90^\circ$；在快度 $\eta$ 上每步加 $1$，角度 $42.3^\circ$、$71.5^\circ$、$83.2^\circ$、$87.5^\circ$……挤向墙边，第 $8$ 步的缝 $1 - \tanh\eta_8 \approx 4.4 \times 10^{-8}$ 仍未闭合（[@ex-ch36-inverse-gudermannian-discrete-staircase]，文献结果）。最后，直线 $\operatorname{Re}(s) = c$ 在 $w = (s - 1)/s$ 下的像圆随 $c \to \tfrac{1}{2}$ 贴近单位圆，模长为 $1$ 当且仅当 $\operatorname{Re}(s) = \tfrac{1}{2}$，这由 [@thm-ch36-taylor-tail-and-cayley-boundary] 第 2 款保证；片中其余数字都是屏幕上的计算。
:::

---
