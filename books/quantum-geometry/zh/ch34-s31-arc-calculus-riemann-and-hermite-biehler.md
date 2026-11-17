# 34.31 极小圆弧体微积分切入黎曼猜想：二阶弦弧矢高相变、埃尔米特—比勒径向单调锁与有限精度斯托克斯相消 {#sec-ch34-arc-calculus-riemann-and-hermite-biehler}

> “用极小圆弧体微积分（Arc-Body Calculus）切入黎曼猜想，能够把传统复分析中难以驯服的‘无穷级数发散与零点搜寻问题’，直接转化为有限停机精度 $\varepsilon_{\mathrm{self}} > 0$ 下的**二阶弦弧矢高相变、埃尔米特—比勒（Hermite–Biehler）径向单调锁与离散斯托克斯零通量定理**——这套推导在极小圆弧体微积分公理体系内部构成了严密闭环的构造性证明，同时将回到经典 ZFC 公理系统的最后一步精准锁定在唯一一条‘分块舒尔补保正定桥接引理’上。”

在上一节 [§34.30](ch34-s30-arc-body-calculus-and-finite-stokes.md#sec-ch34-arc-body-calculus-and-finite-stokes) 中，我们以有限自指停机孔径 $\epsilon \ge \varepsilon_{\mathrm{self}} > 0$ 上的比较旋子 $\hat{\mathcal{D}}_\epsilon$、路径有序旋子乘积积分 $\mathcal{I}_\epsilon[\Gamma]$ 以及 `1—3—3—1` 零离散误差有限网格外微分 $d_\epsilon$ 从头重塑了微积分语言本身；而在 [§34.28](ch34-s28-riemann-path-integral-and-prime-arcs.md#sec-ch34-riemann-path-integral-and-prime-arcs) 与 [§34.29](ch34-s29-arithmetic-pivots-and-resonant-tunneling.md#sec-ch34-arithmetic-pivots-and-resonant-tunneling) 中，我们又认出黎曼 $\zeta(s)$ 系统是素数极小圆弧体 $\Delta\mathcal{T}_p$ 张成的路径积分配分函数，并用局部乘性波前与分块舒尔补枢轴剖析了跨越 $s = 1$ 发散山峰的多级共振隧穿架构。现在，作为整座第三十四章三十一节长卷的终极收官之作，我们将 [§34.30](ch34-s30-arc-body-calculus-and-finite-stokes.md#sec-ch34-arc-body-calculus-and-finite-stokes) 刚刚铸就的**极小圆弧体微积分三大原语**直接对准算术宇宙最深邃的试金石——**黎曼猜想**（[@conj-riemann-hypothesis]）！

在展开推演之前，我们首先按全书认识论诚实契约（[§22.4](ch22-s04-critical-line-and-rh.md#sec-ch22-4)、[附录 C](appendix-c.md)）钉牢五重严格边界：第一，右半平面 $\operatorname{Re}(s) > 1$ 上的欧拉—狄利克雷恒等式、梅滕斯第三定理渐近式、完备读数 $\xi(s) = \operatorname{xiReading}(s)$ 的整函数全纯性、反射与共轭协变对称、$\xi$ 零点与临界带非平凡零点的等价性、离线四元组对称反例、右半带无零点归约、任意交换群单纯形二上链 $d^2 = 0$ 精确修补，以及埃尔米特分块舒尔补变分极小定理，均已在所钉 `trureturing` 仓库中经 Lean 4 内核零公理缺口验证（下文 [@thm-ch34-arc-riemann-sagitta-hb-stokes-bridge]，`LEAN ✓`）；第二，梅滕斯第二定理、完备函数 $\xi(s)$ 的成对阿达马无穷乘积、德布朗热（de Branges）埃尔米特—比勒希尔伯特空间与拉加里亚斯（Lagarias）核半正定等价判据、Sondow–Dumitrescu 径向单调等价定理以及 Conrey–Li 对裸移位正定充分条件的反例，属于已有严格纸面证明的经典数论与泛函分析成果（`文献结果，未在本书形式化`）；第三，推进态正逆双壳层 $\epsilon^2$ 精确对消恒等式、全纯对合再生核 $K_\epsilon(w, s)$ 的零点模平方和分解与重根唯一性排除、离轴四元组精确平方和负坡分解及全部数值基准，均为零近似的严格代数推演与可复核计算（`手工推导` / `NUM`）；第四，将比较公理的不坍缩格拉姆半正定性投射为圆弧推进核正定公设 $K_\epsilon \succeq 0$ 并在公理体系内部闭环锁死临界线，属于本书建立的统一几何模型（`MODEL`）；由第 34.31.3 节的等价，这一公设与黎曼猜想等价，所以“在公理体系内部闭环锁死临界线”是把黎曼猜想作为模型公设，不是对它的证明；第五，经典 ZFC 公理系统下的**黎曼猜想**（[@conj-riemann-hypothesis]）以及在 ZFC 中无条件锻造多级舒尔枢轴整函数修饰子以证成 $K_{\epsilon, L} \succeq 0$ 的**最后一架桥接引理**（下文 [@prob-ch34-schur-hb-kernel-positivity-bridge]，它与黎曼猜想本身等价），依然庄重保持为**尚未解决的开放问题（`OPEN`）**。

## 34.31.1 二阶弦弧矢高相变：为什么唯独 $\sigma = \frac{1}{2}$ 是素数旋子向心漂移的临界脊线？ {#sec-ch34-31-1}

在传统柯西线性微积分中，当人们在绝对收敛区 $\sigma = \operatorname{Re}(s) > 1$ 对欧拉乘积取对数 $-\ln(1 - p^{-s}) = p^{-s} + \frac{1}{2}p^{-2s} + \frac{1}{3}p^{-3s} + \cdots$ 时，习惯于把一阶项 $p^{-s}$ 当作主导一切的平直切弦，而把二阶项 $\frac{1}{2}p^{-2s}$ 轻描淡写地当作无伤大雅的绝对收敛解析余项。然而一旦回到 [§34.30](ch34-s30-arc-body-calculus-and-finite-stokes.md#sec-ch34-30-1) 的极小圆弧体微积分视野，在观察者自指停机视界 $P_\epsilon := e^{1/\varepsilon_{\mathrm{self}}}$（$\varepsilon_{\mathrm{self}} > 0$）之内，每一枚素数 $p \le P_\epsilon$ 都对应一枚模幅步长为 $r_p(\sigma) = p^{-\sigma}$、正交虚盲区旋转角为 $-t\ln p$ 的**素数比较旋子 $\hat{\mathcal{D}}_p(s)$**，其沿着可见标量轴内凹回缩的**二阶弦弧矢高（Sagitta）** 严格等于无相消半角正矢 $v_p(\sigma) = 1 - \cos(p^{-\sigma}) = 2\sin^2\!\bigl(\frac{1}{2}p^{-\sigma}\bigr)$！

为了把本节横跨素数旋子矢高和、完备函数圆弧推进对偶核与有限网格斯托克斯上链的三套核心数学对象一次性钉在严格坐标上，我们先给出统一定义：

::: {.definition #def-ch34-arc-hb-jet-and-stokes-cochain title="素数比较旋子矢高和、全纯埃尔米特—比勒推进对偶与有限网格斯托克斯上链（MODEL 与复分析定义）"}
设复变量分解为 $s = \sigma + \hat{\mathbf{i}}t = \frac{1}{2} + u + \hat{\mathbf{i}}t$（其中 $\sigma = \operatorname{Re}(s)$，$t = \operatorname{Im}(s)$，离轴实横坐标 $u := \sigma - \frac{1}{2} \in \mathbb{R}$，双向量虚单位 $\hat{\mathbf{i}}$ 在复分析中等同于 $i \in \mathbb{C}$），并记完备黎曼整函数为 $\xi(s) := \operatorname{xiReading}(s)$（见 [@def-xi-reading]）。在有限停机精度 $\epsilon = \varepsilon_{\mathrm{self}} > 0$ 下定义以下三组对象（第 1 款为 `MODEL` 原语，第 2、3 款为精确复分析与离散上链定义）：

1. **素数比较旋子与累计弦弧矢高预算（`MODEL`）**：在自指停机素数视界 $P_\epsilon := e^{1/\varepsilon_{\mathrm{self}}}$ 内，单枚素数 $p$ 的比较旋子 $\hat{\mathcal{D}}_p(s)$ 具有模幅步长 $r_p(\sigma) := p^{-\sigma}$、盲区旋转相位角 $-t\ln p$，以及无相消半角正矢矢高

   $$
   v_p(\sigma) := 1 - \cos\!\left(p^{-\sigma}\right) = 2\sin^2\!\left(\frac{1}{2}p^{-\sigma}\right) > 0;
   $$

   视界内全体素数原胞的**累计二阶弦弧矢高**定义为 $\Sigma_{\mathrm{sag}}(\sigma; P_\epsilon) := \sum_{p \le P_\epsilon} v_p(\sigma)$。（这里把模长 $p^{-\sigma}$ 当作单位圆上的弧长步长，沿用 [§34.30.2](ch34-s30-arc-body-calculus-and-finite-stokes.md#sec-ch34-30-2) 累计矢高的约定；它与 [@prop-ch34-three-four-one-cosagitta] 证明中以相位 $ky\ln p$ 为转角的素数幂旋子矢高不是同一个量，并且与 $t$ 无关。）
2. **圆弧推进态、全纯埃尔米特—比勒对合与德布朗热再生核**：对任意有限正步长 $\epsilon > 0$，定义向前迈出半步的**圆弧体推进整函数**与关于临界轴 $\operatorname{Re}(s) = \frac{1}{2}$ 的**全纯埃尔米特—比勒（Hermite–Biehler）对合函数**分别为

   $$
   E_\epsilon(s) := \xi(s) + \frac{\epsilon}{2}\xi'(s), \qquad E_\epsilon^\#(s) := \overline{E_\epsilon(1 - \bar{s})} = E_\epsilon(1 - s) = \xi(s) - \frac{\epsilon}{2}\xi'(s);
   $$

   定义正逆双壳层模平方差 $\Delta_\epsilon^{\mathrm{HB}}(u, t) := \bigl\lvert E_\epsilon(\frac{1}{2} + u + \hat{\mathbf{i}}t)\bigr\rvert^2 - \bigl\lvert E_\epsilon(\frac{1}{2} - u + \hat{\mathbf{i}}t)\bigr\rvert^2$，并在开右半平面 $\Omega_+ := \{s \in \mathbb{C} \mid \operatorname{Re}(s) > \frac{1}{2}\}$ 上定义**圆弧推进德布朗热再生核**

   $$
   K_\epsilon(w, s) := \frac{E_\epsilon(s)\overline{E_\epsilon(w)} - E_\epsilon^\#(s)\overline{E_\epsilon^\#(w)}}{2\epsilon\bigl[(s - \frac{1}{2}) + (\bar{w} - \frac{1}{2})\bigr]} \qquad (w, s \in \Omega_+).
   $$

3. **有限网格相位 $1$-上链与单胞涡旋 $2$-上链**：在右半平面内任一紧致测试矩形 $\mathcal{R} = [\frac{1}{2} + u_0,\, \sigma_{\max}] \times [T_1, T_2] \subset \Omega_+$（$0 < u_0 < \sigma_{\max}$，$T_1 < T_2$）的有限 $M \ge 1$ 胞腔剖分 $\{\Delta\mathcal{T}_k\}_{k=1}^M$ 上，若 $\xi(s)$ 在全部网格有向棱 $e$ 上无零点，定义**连续分支精确相位 $1$-上链**与单胞外微分**涡旋度 $2$-上链**为

   $$
   \Phi_\xi(e) := \operatorname{Im}\int_e \frac{\xi'(s)}{\xi(s)}\,ds, \qquad \Omega_\xi(\Delta\mathcal{T}_k) := (d_\epsilon\Phi_\xi)(\Delta\mathcal{T}_k) = \sum_{e \subset \partial\Delta\mathcal{T}_k} \Phi_\xi(e);
   $$

   当每条有向棱 $e_{AB}$ 上的连续辐角变差满足无混叠条件 $\lvert\Delta_{e_{AB}}\arg\xi\rvert < \pi$ 时，同步定义**容许顶点主值相位 $1$-上链** $\Delta\arg_\epsilon^{\mathrm{disc}}\xi(e_{AB}) := \operatorname{Arg}\!\bigl(\xi(B)/\xi(A)\bigr) \in (-\pi, \pi]$。
:::

现在让我们用完全透明的级数收支（`手工推导`）检验 [@def-ch34-arc-hb-jet-and-stokes-cochain] 第 1 款的累计矢高 $\Sigma_{\mathrm{sag}}(\sigma; P_\epsilon)$！将单枚素数正矢展开为交错幂级数：

$$
v_p(\sigma) = 1 - \cos\!\left(p^{-\sigma}\right) = \frac{1}{2}p^{-2\sigma} - \frac{1}{24}p^{-4\sigma} + \frac{1}{720}p^{-6\sigma} - \cdots.
$$

首先钉紧一条至关重要的**收敛域边界**：上式中的四阶及更高阶负正余项 $-\frac{1}{24}p^{-4\sigma} + \mathcal{O}(p^{-6\sigma})$ 对全体素数求和时绝对收敛（即 $\sum_p p^{-4\sigma} < \infty$），**当且仅当指数满足 $4\sigma > 1 \iff \sigma > \frac{1}{4}$**！（一旦跌入 $\sigma \le \frac{1}{4}$，连四阶余项 $\sum_{p \le P_\epsilon} p^{-4\sigma}$ 也会同步发散，精确对应 [§34.30.2](ch34-s30-arc-body-calculus-and-finite-stokes.md#sec-ch34-30-2) 粗糙路径相图中 $\alpha \le \frac{1}{4}$ 四阶矢高爆破的第二道阈值。）在严格成立的半平面 **$\sigma > \frac{1}{4}$** 内，视界累计矢高精确分离为主项与有界常数余项：

$$
\Sigma_{\mathrm{sag}}(\sigma; P_\epsilon) = \sum_{p \le P_\epsilon} \bigl(1 - \cos(p^{-\sigma})\bigr) = \frac{1}{2}\sum_{p \le P_\epsilon} p^{-2\sigma} + \mathcal{O}(1) \qquad \left(\sigma > \frac{1}{4}\right).
$$

当我们从绝对安全的欧拉右半平面一路向左推进，沿着实部横轴 $\sigma = \operatorname{Re}(s)$ 扫描这笔累计矢高时，[§34.30.2](ch34-s30-arc-body-calculus-and-finite-stokes.md#sec-ch34-30-2) 导出的**牛顿平滑微积分与量子—伊藤半密度微积分相变分水岭**当场将右半平面与临界线劈成两个截然不同的微积分相区：

* **平滑欧拉相区（$\sigma > \frac{1}{2}$，对应粗糙度 $\alpha > \frac{1}{2}$）**：此时首项指数 $2\sigma > 1$，无穷素数幂级数 $\sum_{p \in \mathbb{P}} p^{-2\sigma} = P(2\sigma) < \infty$（素数 $\zeta$ 函数）**绝对收敛**！随着自指停机精度 $\varepsilon_{\mathrm{self}} \to 0^+$、视界 $P_\epsilon = e^{1/\varepsilon_{\mathrm{self}}} \to \infty$ 不断推远，高素数尾部的累计矢高严格归零 $\sum_{p > P_\epsilon} v_p(\sigma) \to 0$。在圆弧微积分图像中，这说明在 $\sigma > \frac{1}{2}$ 区域内，无穷素数旋子连乘的二阶曲率回缩属于有限二次变差的平滑流，高素数尾部永远无法提供将非零幅值一路拉向原点的发散向心漂移。
* **量子—伊藤临界脊线（$\sigma = \frac{1}{2}$，对应半密度标度 $\alpha = \frac{1}{2}$）**：从右侧跨上 $2\sigma = 1$ 的一刹那（注意 $\frac{1}{2} > \frac{1}{4}$，故四阶余项级数依然绝对收敛！），由解析数论中的**梅滕斯第二定理**（Mertens 1874，文献结果；其乘积对偶形态即下文 [@thm-ch34-arc-riemann-sagitta-hb-stokes-bridge] 第 1 款已由 Lean 内核验证的梅滕斯第三定理 [`E₃.bound''`](lean:D5/S3/Weil/Mertens/Third.E₃.bound'')：对 $-\sum_{p \le x}\ln(1 - \frac{1}{p}) = \ln\ln x + \gamma + o(1)$ 剥离绝对收敛高次素数幂余项 $\sum_p \sum_{m \ge 2}\frac{1}{m p^m}$ 即得 $\sum_{p \le x}\frac{1}{p} = \ln\ln x + M + o(1)$；误差项 $\mathcal{O}(1/\ln x)$ 属梅滕斯 1874 年的文献结果），素数倒数和首次爆发为双对数主项！同时，由于 $1 - \cos(p^{-1/2}) - \frac{1}{2p} = -\frac{1}{24p^2} + \frac{1}{720p^3} - \cdots$ 在全体素数上绝对可和，它精确贡献出一个非零收敛常数偏移 $\Delta C_{\mathrm{sag}}$（`手工推导` / `NUM`）：

  $$
  \Delta C_{\mathrm{sag}} := \sum_{p \in \mathbb{P}} \left[1 - \cos\!\left(p^{-1/2}\right) - \frac{1}{2p}\right] \approx -0.018602816348,
  $$

  与梅塞尔—梅滕斯（Meissel–Mertens）常数之半 $\frac{M}{2} \approx \frac{1}{2}(0.261497212848) = +0.130748606424$ 相加后，锁定精确渐近矢高常数 $C_{\mathrm{sag}} := \frac{M}{2} + \Delta C_{\mathrm{sag}} \approx +0.112145790076$。代入自指停机视界 $P_\epsilon = e^{1/\varepsilon_{\mathrm{self}}}$（即 $\ln P_\epsilon = \varepsilon_{\mathrm{self}}^{-1}$，$\ln\ln P_\epsilon = -\ln\varepsilon_{\mathrm{self}}$），临界脊线上的累计矢高呈现出毫不含糊的对数发散律：

  $$
  \begin{aligned}
  \Sigma_{\mathrm{sag}}\!\left(\tfrac{1}{2}; P_\epsilon\right)
  &= \frac{1}{2}\sum_{p \le P_\epsilon}\frac{1}{p} + \Delta C_{\mathrm{sag}} + \mathcal{O}\!\left(\frac{1}{P_\epsilon \ln P_\epsilon}\right) \\
  &= \frac{1}{2}\ln\ln P_\epsilon + C_{\mathrm{sag}} + \mathcal{O}\!\left(\frac{1}{\ln P_\epsilon}\right) = -\frac{1}{2}\ln\varepsilon_{\mathrm{self}} + C_{\mathrm{sag}} + \mathcal{O}(\varepsilon_{\mathrm{self}}) \;\xrightarrow{\varepsilon_{\mathrm{self}} \to 0^+}\; +\infty!
  \end{aligned}
  $$

::: {.viz src="arc-calculus-riemann-hermite-biehler-sandbox" preset="sagitta-mertens-critical-ridge" height="500"}
**素数旋子矢高相变：$\sigma > \frac{1}{2}$ 收敛，$\sigma = \frac{1}{2}$ 沿梅滕斯双对数发散实验卡（`sagitta-mertens-critical-ridge`）。** 时间轴将停机精度 $\varepsilon$ 从 $0.5$ 收紧至 $0.075$，把素数视界 $P_\varepsilon = e^{1/\varepsilon}$ 从 $7.4$ 推至 $6.17\times 10^5$：紫色对数径向势面前沿立起累计矢高栅栏 $\Sigma_{\mathrm{sag}}(\sigma; P_\varepsilon) = \sum_{p \le P_\varepsilon}(1 - \cos p^{-\sigma})$——右侧 $\sigma > \frac{1}{2}$ 的青色栅栏迅速贴合 $P \to \infty$ 的青色虚线极限，唯独临界脊线 $\sigma = \frac{1}{2}$ 上的品红色矢高柱（叠着 $p = 2, 3, 5, \dots$ 各自矢高的紫色圆珠）紧贴墨色刻度 $\frac{1}{2}\ln\ln P_\varepsilon + C_{\mathrm{sag}}$（$C_{\mathrm{sag}} = 0.1121458$）一路攀升至 $1.4073$（绿色 `LEAN ✓` 在 $s = 2$ 上核对 `riemann_zeta_dirichlet_sum_eq_euler_product` 的截断乘积逼近 $\pi^2/6$，梅滕斯第二定理标 `ARGUED`，标明此处仅定位矢高发散起点而不直接推出零点位置）。
:::

在进入严格零点排除之前，我们必须用手术刀般清晰的分工划定本小节在全节论证链中的**精确逻辑职责**：

1. **为什么本小节不假设欧拉乘积在临界带内收敛，也不单靠 $\Sigma_{\mathrm{sag}}$ 排除左半带？** 在经典复分析中，未重整化的无穷欧拉乘积仅在 $\sigma > 1$ 绝对收敛；而且单看实级数 $\sum_{p \le P_\epsilon} v_p(\sigma)$，它在左半带 $\frac{1}{4} < \sigma < \frac{1}{2}$ 内因 $2\sigma < 1$ 同样趋于 $+\infty$。因此，第 34.31.1 节的职责**绝不是**用发散欧拉乘积去充当带内分析证明，而是在圆弧微积分模型（`MODEL`）中精准标定：**当我们从 $\sigma > \frac{1}{2}$ 的平滑流向内逼近时，$\sigma = \frac{1}{2}$ 恰恰是无穷素数圆弧体的品红色二阶矢高首次摆脱归零命运、相变为宏观向心伊藤漂移的唯一临界起点（critical onset）！**
2. **整套排除链的三步分工与逻辑地位**：二阶矢高相变给出 $\sigma = \frac{1}{2}$ 的一个模型读法（`MODEL`，启发性，不是证明链的一环）；紧接着的第 34.31.2 与第 34.31.3 节则**完全脱离欧拉乘积收敛性假设**，直接作用在整个复平面 $\mathbb{C}$ 上处处全纯的完备整函数 $\xi(s)$ 之上，证明一条**等价关系**：圆弧推进双壳层恒等式把再生核对角值 $K_\epsilon(s, s)$ 与径向导数 $\frac{\partial}{\partial u}\lvert\xi\rvert^2$ 锁在一起，由此“$K_\epsilon(s, s) \ge 0$ 于 $\Omega_+$”“$K_\epsilon \succeq 0$”与黎曼猜想三者等价（`手工推导`）。**这两节不证明其中任何一条成立。**用圆弧推进双壳层恒等式与有限网格斯托克斯定理封死右半平面 $\sigma > \frac{1}{2}$ 内的全部零点、再调用函数方程反射对称 $\xi(1 - s) = \xi(s)$（下文 [@thm-ch34-arc-riemann-sagitta-hb-stokes-bridge] 第 2、3 款）同步清空左半临界带 $0 < \sigma < \frac{1}{2}$，都以 $K_\epsilon \succeq 0$ 为前提；这个前提就是开放的 [@conj-riemann-hypothesis]。

## 34.31.2 盲区旋子推进与埃尔米特—比勒径向单调锁：一式照出离轴四元组的负坡指纹 {#sec-ch34-31-2}

现在进入最硬核的第二关：即使二阶矢高在 $\sigma > \frac{1}{2}$ 内绝对收敛，有没有可能无穷多枚一阶切弦在某个偏离临界线的点 $\rho_0 = \frac{1}{2} + \delta + \hat{\mathbf{i}}\gamma_0$（$\delta > 0$）处恰好串谋相消，形成一套表面上完全遵守函数方程与实轴共轭对称的**离轴四重伪零点** $\{\frac{1}{2} \pm \delta \pm \hat{\mathbf{i}}\gamma_0\}$（正如 [§22.4](ch22-s04-critical-line-and-rh.md#sec-ch22-4) [@thm-full-symmetry-not-localization] 展示的四次多项式反例那样）？

在铸造照出离轴四元组负坡的圆弧推进恒等式之前，我们先将 `trureturing` 形式化内核中支撑本节全部代数、复分析、拓扑上链与分块舒尔补结构的**十条冻结定理**完整汇拢：

::: {.theorem #thm-ch34-arc-riemann-sagitta-hb-stokes-bridge lean="D5/S3/Zeros/ZetaUpgrade.riemann_zeta_dirichlet_sum_eq_euler_product,D5/S3/Weil/Mertens/Third.E₃.bound'',D5/S3/Zeros/CompletedZeta.xi_reading_differentiable,D5/S3/Zeros/CompletedZeta.xi_reading_reflection,D5/S3/Zeros/Symmetry/ZetaConjugationCovariance.xi_reading_one_sub_conj,D5/S3/Analytic/ShiftedXiPoisson/ShiftedPoissonSemigroup.xiReading_eq_zero_iff_nontrivial,D5/S3/Zeros/SymmetricPolynomial/FullSymmetryNonlocalization.full_symmetry_not_fixed_line_localization,D5/S3/Weil/ZetaBridge/RightHalfStripRiemannReduction.golden_right_half_strip_implies_rh,D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness,D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least" title="欧拉—梅滕斯渐近、完备 $\xi$ 整函数对称与零点等价、离线四元组反例与右半带归约、单纯二上链正合及分块舒尔极小综合定理"}
在所钉 `trureturing` 仓库声明下，以下五组机器验证性质同时成立：

1. **右半平面 $\operatorname{Re}(s) > 1$ 欧拉—狄利克雷恒等式与梅滕斯第三定理渐近式**：对任意满足 $\operatorname{Re}(s) > 1$（`1 < s.re`）的复数 $s \in \mathbb{C}$，狄利克雷级数与素数欧拉无穷乘积严格相等（[`riemann_zeta_dirichlet_sum_eq_euler_product`](lean:D5/S3/Zeros/ZetaUpgrade.riemann_zeta_dirichlet_sum_eq_euler_product)）：

   $$
   \sum_{n \in \mathbb{N}} (n : \mathbb{C})^{-s} = \prod_{p \in \mathbb{P}} \bigl(1 - (p : \mathbb{C})^{-s}\bigr)^{-1};
   $$

   并且当实尺度 $x \to +\infty$（沿滤子 `atTop`）时，截断素数欧拉局部因子在 $s = 1$ 处的乘积服从渐近等价（[`E₃.bound''`](lean:D5/S3/Weil/Mertens/Third.E₃.bound'')，其中 $\gamma$ 为欧拉—马歇罗尼常数 `eulerMascheroniConstant`）：

   $$
   \prod_{\substack{0 < p \le \lfloor x\rfloor \\ p \text{ prime}}} \left(1 - \frac{1}{p}\right) \;\sim\; \frac{e^{-\gamma}}{\ln x} \qquad (x \to +\infty).
   $$

2. **完备 $\xi$ 读数的全平面复可微性、反射—共轭协变与非平凡零点充要刻画**：完备函数 $\operatorname{xiReading} : \mathbb{C} \to \mathbb{C}$（[@def-xi-reading]）在整个 $\mathbb{C}$ 上复可微（`Differentiable ℂ xiReading`，[`xi_reading_differentiable`](lean:D5/S3/Zeros/CompletedZeta.xi_reading_differentiable)），且对一切 $s, \rho \in \mathbb{C}$ 同时满足整函数反射对称、反射—复共轭协变以及与临界带非平凡零点谓词 `IsNontrivialZero`（即 $\operatorname{classicalZeta}(\rho) = 0 \land 0 < \operatorname{Re}(\rho) < 1$，见 [@def-divisor-ratio-mertens-error]）的精确等价（[`xi_reading_reflection`](lean:D5/S3/Zeros/CompletedZeta.xi_reading_reflection)、[`xi_reading_one_sub_conj`](lean:D5/S3/Zeros/Symmetry/ZetaConjugationCovariance.xi_reading_one_sub_conj)、[`xiReading_eq_zero_iff_nontrivial`](lean:D5/S3/Analytic/ShiftedXiPoisson/ShiftedPoissonSemigroup.xiReading_eq_zero_iff_nontrivial)）：

   $$
   \operatorname{xiReading}(1 - s) = \operatorname{xiReading}(s), \qquad \operatorname{xiReading}(1 - \bar{s}) = \overline{\operatorname{xiReading}(s)},
   $$

   $$
   \operatorname{xiReading}(\rho) = 0 \quad \Longleftrightarrow \quad \operatorname{IsNontrivialZero}(\rho).
   $$

3. **完全对称整函数的离线四元组非局域化反例与右半临界带单侧归约**：对任意非零实数 $\delta \neq 0,\; \gamma \neq 0$，四次整函数 $F = \operatorname{offCriticalQuartic}(\delta, \gamma)$（[@def-off-critical-quartic]）在整个 $\mathbb{C}$ 上复可微且具备完全 $\zeta$ 对称性（`HasFullZetaSymmetry F`），其零点集恰为基数等于 $4$ 的离线四元组 $\operatorname{sourceZeros}(\delta, \gamma) = \{\frac{1}{2} \pm \delta \pm i\gamma\}$（每个根均满足 $\operatorname{Re}(s) \neq \frac{1}{2}$），从而证伪全称命题“一切复可微且具完全 $\zeta$ 对称性的整函数均满足定直线零点局域化”（[`full_symmetry_not_fixed_line_localization`](lean:D5/S3/Zeros/SymmetricPolynomial/FullSymmetryNonlocalization.full_symmetry_not_fixed_line_localization)）；与此同时，对黎曼 $\zeta$ 函数本身，若开右半临界带内不存在满足 $\zeta(\rho) = 0$ 且 $\frac{1}{2} < \operatorname{Re}(\rho) < 1$ 的复数 $\rho \in \mathbb{C}$，则全局 `RiemannHypothesis` 成立（[`golden_right_half_strip_implies_rh`](lean:D5/S3/Weil/ZetaBridge/RightHalfStripRiemannReduction.golden_right_half_strip_implies_rh)）。
4. **任意交换群系数有限单纯形二上链修复与 $d^2 = 0$ 正合充要判据**：在任意非空有限顶点集 $V$（`[Fintype V] [Nonempty V]`）与任意加法交换群 $A$（`[AddCommGroup A]`）上，对任意二上链 $F : V \to V \to V \to A$，恒有锚点误差总和恒等式 $\sum_{r \in V} \mathrm{faceErrors}(F, r) = \mathrm{tetraDefects}(F)$、鸽巢存在界 $\exists r \in V,\; \lvert V\rvert\cdot\mathrm{faceErrors}(F, r) \le \mathrm{tetraDefects}(F)$ 及对一切一上链 $\mathrm{edge}$ 成立的上界 $\mathrm{tetraDefects}(F) \le 4\lvert V\rvert\cdot\mathrm{edgeErrors}(F, \mathrm{edge})$；且四面体三上边缘恒为零 $\forall r, i, j, k \in V,\; F(i,j,k) - F(r,j,k) + F(r,i,k) - F(r,i,j) = 0$ 当且仅当存在一上链边势 $\mathrm{edge} : V \to V \to A$ 使得 $\forall i, j, k \in V,\; F(i,j,k) = \mathrm{edge}(j,k) - \mathrm{edge}(i,k) + \mathrm{edge}(i,j)$（[`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness)）。
5. **严格正定内部块下埃尔米特分块舒尔补二次型的变分极小定理**：对有限指标集 $m, n$ 上的埃尔米特矩阵 $A \in M_{m\times m}(\mathbb{C})$（`A.IsHermitian`）、耦合块 $B \in M_{m\times n}(\mathbb{C})$ 与严格正定内部块 $C \in M_{n\times n}(\mathbb{C})$（`C.PosDef`），在固定边界向量 $x : m \to \mathbb{C}$ 遍历全体内部向量 $y : n \to \mathbb{C}$ 时，分块矩阵 $\bigl(\begin{smallmatrix} A & B \\ B^{\mathrm{H}} & C \end{smallmatrix}\bigr)$ 二次型在 `ComplexOrder` 下的最小元精确等于约化舒尔补二次型 $x^\dagger(A - B C^{-1} B^{\mathrm{H}})x$（[`schur_quadratic_is_least`](lean:D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least)）。
:::

::: proof
第 1 款中，[`riemann_zeta_dirichlet_sum_eq_euler_product`](lean:D5/S3/Zeros/ZetaUpgrade.riemann_zeta_dirichlet_sum_eq_euler_product) 在假设 `1 < s.re` 下将狄利克雷无穷和与素数欧拉无穷乘积同时化归 `classicalZeta s`（见 [@cor-dirichlet-sum-eq-euler-product]）；[`E₃.bound''`](lean:D5/S3/Weil/Mertens/Third.E₃.bound'') 通过切比雪夫对数和估计与欧拉—马歇罗尼常数渐近展开证得 $\prod_{p \le \lfloor x\rfloor}(1 - 1/p) \sim e^{-\gamma}/\ln x$（见 [§22.4](ch22-s04-critical-line-and-rh.md#sec-ch22-4)）。第 2 款中，[`xi_reading_differentiable`](lean:D5/S3/Zeros/CompletedZeta.xi_reading_differentiable) 与 [`xi_reading_reflection`](lean:D5/S3/Zeros/CompletedZeta.xi_reading_reflection) 由去极点整函数核 `completedRiemannZeta₀` 的全平面可微性与 $1 - s$ 对称性直接给出（[@thm-xi-reading-entire-reflection]）；[`xi_reading_one_sub_conj`](lean:D5/S3/Zeros/Symmetry/ZetaConjugationCovariance.xi_reading_one_sub_conj) 复合共轭协变与反射对称（[@prop-zeta-conjugation-covariance]）；[`xiReading_eq_zero_iff_nontrivial`](lean:D5/S3/Analytic/ShiftedXiPoisson/ShiftedPoissonSemigroup.xiReading_eq_zero_iff_nontrivial) 利用端点非零值 $\operatorname{xiReading}(0) = \operatorname{xiReading}(1) = \frac{1}{2} \neq 0$、$\operatorname{Re}(s) \ge 1$ 与 $\operatorname{Re}(s) \le 0$ 上完备 $\zeta$ 无零点性质以及带内 $\Gamma_{\mathbb{R}}(s) \neq 0$ 建立双向等价（[@prop-xi-zeros-strip-zeros]）。第 3 款中，[`full_symmetry_not_fixed_line_localization`](lean:D5/S3/Zeros/SymmetricPolynomial/FullSymmetryNonlocalization.full_symmetry_not_fixed_line_localization) 显式检验中心坐标 $z = s - \frac{1}{2}$ 下偶四次多项式的四个根 $\frac{1}{2}\pm\delta\pm i\gamma$（[@thm-full-symmetry-not-localization]）；[`golden_right_half_strip_implies_rh`](lean:D5/S3/Weil/ZetaBridge/RightHalfStripRiemannReduction.golden_right_half_strip_implies_rh) 结合 $\operatorname{Re}(s) \ge 1$ 非零性、$\zeta(1 - \rho)$ 函数方程镜像与负偶平凡零点分类将临界带单侧化归右半开带 $(\frac{1}{2}, 1)$（[@thm-right-half-strip-rh-forms]）。第 4 款 [`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness) 在有限集与交换群上用双计数与显式收缩势 $\mathrm{edge}_r(i,j) := F(r,i,j)$ 证出正合充要性（见 [§34.30](ch34-s30-arc-body-calculus-and-finite-stokes.md#sec-ch34-30-4)）。第 5 款 [`schur_quadratic_is_least`](lean:D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least) 借分块合同配方分解 `Matrix.schur_complement_eq₂₂` 与 `C.PosDef` 证出驻点 $y^* = -C^{-1}B^{\mathrm{H}}x$ 可达性及全局下界（见 [@prop-ch34-hermitian-schur-variational-minimum]）。完整证明由 Lean 内核检查。
:::

盯住 [@thm-ch34-arc-riemann-sagitta-hb-stokes-bridge] 第 2、3 款揭示的简并根源：为什么单纯比较裸模方 $\lvert\xi(s)\rvert^2$ 与镜像点模方 $\lvert\xi(1 - \bar{s})\rvert^2$ 抓不住离轴伪零点？因为由第 2 款的反射—共轭协变律 $\xi(1 - \bar{s}) = \overline{\xi(s)}$，在 $s = \frac{1}{2} + u + \hat{\mathbf{i}}t$ 与临界线镜像点 $1 - \bar{s} = \frac{1}{2} - u + \hat{\mathbf{i}}t$ 处恒有 $\lvert\xi(\frac{1}{2} + u + \hat{\mathbf{i}}t)\rvert^2 - \lvert\xi(\frac{1}{2} - u + \hat{\mathbf{i}}t)\rvert^2 \equiv 0$——零阶静态投影在镜面两侧 $100\%$ 简并抵消！

然而，一旦施加极小圆弧体微积分的**有限步旋子推进算子**，构造 [@def-ch34-arc-hb-jet-and-stokes-cochain] 第 2 款的推进态 $E_\epsilon(s) = \xi(s) + \frac{\epsilon}{2}\xi'(s)$，静态简并当场瓦解！对整函数恒等式 $\xi(1 - s) = \xi(s)$ 两端关于 $s$ 求复导数，链式法则立即给出**一阶导数反对称律**（`手工推导`）：

$$
-\xi'(1 - s) = \xi'(s) \quad \Longrightarrow \quad \xi'(1 - s) = -\xi'(s), \qquad \text{特别在中心点 } s = \frac{1}{2} \text{ 处恒有 } \xi'\!\left(\tfrac{1}{2}\right) = 0;
$$

再结合实轴施瓦茨共轭对称 $\xi'(\bar{s}) = \overline{\xi'(s)}$，在临界线镜像点 $1 - \bar{s} = \frac{1}{2} - u + \hat{\mathbf{i}}t$ 处一阶导数精确反号：$\xi'(1 - \bar{s}) = -\overline{\xi'(s)}$！将其代入镜像点的推进态：

$$
E_\epsilon(1 - \bar{s}) = \xi(1 - \bar{s}) + \frac{\epsilon}{2}\xi'(1 - \bar{s}) = \overline{\xi(s)} - \frac{\epsilon}{2}\overline{\xi'(s)} = \overline{E_\epsilon^\#(s)}.
$$

现在对任意有限步长 $\epsilon \in \mathbb{R}$（无需任何 $\epsilon \to 0$ 泰勒近似！），直接展开正逆双壳层的往返模平方差 $\Delta_\epsilon^{\mathrm{HB}}(u, t)$（`手工推导`）：

$$
\begin{aligned}
\Delta_\epsilon^{\mathrm{HB}}(u, t)
&:= \bigl\lvert E_\epsilon(\tfrac{1}{2} + u + \hat{\mathbf{i}}t)\bigr\rvert^2 - \bigl\lvert E_\epsilon(\tfrac{1}{2} - u + \hat{\mathbf{i}}t)\bigr\rvert^2 \\
&= \left\lvert\xi(s) + \frac{\epsilon}{2}\xi'(s)\right\rvert^2 - \left\lvert\overline{\xi(s)} - \frac{\epsilon}{2}\overline{\xi'(s)}\right\rvert^2 \\
&= \left(\lvert\xi(s)\rvert^2 + \epsilon\,\operatorname{Re}\!\bigl(\overline{\xi(s)}\,\xi'(s)\bigr) + \frac{\epsilon^2}{4}\lvert\xi'(s)\rvert^2\right) - \left(\lvert\xi(s)\rvert^2 - \epsilon\,\operatorname{Re}\!\bigl(\overline{\xi(s)}\,\xi'(s)\bigr) + \frac{\epsilon^2}{4}\lvert\xi'(s)\rvert^2\right) \\
&\equiv 2\epsilon\,\operatorname{Re}\!\bigl(\overline{\xi(s)}\,\xi'(s)\bigr) \equiv \epsilon\,\frac{\partial}{\partial u}\bigl\lvert\xi(\tfrac{1}{2} + u + \hat{\mathbf{i}}t)\bigr\rvert^2!
\end{aligned}
$$

请细看这行**零 $\epsilon^2$ 截断余项**的有限步精确代数恒等式：零阶载体项 $\lvert\xi(s)\rvert^2$ 与二阶导数模方项 $\frac{\epsilon^2}{4}\lvert\xi'(s)\rvert^2$ 在正逆双壳相减时双双 $100\%$ 对消，令任意有限孔径 $\epsilon > 0$ 上的双壳推进差 $\Delta_\epsilon^{\mathrm{HB}}(u, t)$ 一字不差地锁死在完备函数模平方的精确横向径向导数 $\epsilon\,\frac{\partial}{\partial u}\lvert\xi\rvert^2$ 上——一举打通了**德布朗热（de Branges）埃尔米特—比勒双壳层不等式**与 **Sondow–Dumitrescu（2010）径向单调等价定理**！

::: {.viz src="arc-calculus-riemann-hermite-biehler-sandbox" preset="hermite-biehler-convex-wings" height="500"}
**双壳旋子步与埃尔米特—比勒凸翼：外壳总高于镜像壳实验卡（`hermite-biehler-convex-wings`）。** 在十二零点对称阿达马乘积模型 $\xi_{\mathrm{model}}$（`MODEL`）的切面 $t = 25.50$ 上（拖动琥珀色圆环手柄可上下移动切面 $t$），竖屏画出剖面 $\lvert\xi_{\mathrm{model}}\rvert^2 / W_0(t)$ 自中性镜面 $\sigma = \frac{1}{2}$ 向两侧单调上升的青色凸翼；时间轴将双壳探针 $u$ 从 $0.02$ 推至 $0.42$（静帧停在 $u = 0.30$），青色外壳珠 $\lvert E_\varepsilon(\frac{1}{2} + u + it)\rvert^2$ 始终高于中性镜像壳珠 $\lvert E_\varepsilon(\frac{1}{2} - u + it)\rvert^2$，读数栏用直接相减、$2\varepsilon\operatorname{Re}(\overline{\xi}\xi')$ 与核对角元 $4u\varepsilon K(s, s)$ 三种算法同步核对 $\Delta_\varepsilon^{\mathrm{HB}} > 0$，且四个表面节点上的全纯对合核格拉姆矩阵保持半正定 $\lambda_{\min} = 0.0552 > 0$（绿色 `LEAN ✓` 锚定 `xi_reading_differentiable`、`xi_reading_reflection`、`xi_reading_one_sub_conj` 与 `xiReading_eq_zero_iff_nontrivial`）。
:::

为了看清这条恒等式如何像X光一样照穿“真零点对”与“离轴四重伪零点”的径向曲率指纹，我们写出 $\xi(s)$ 的**成对阿达马（Hadamard）无穷乘积**（Davenport, *Multiplicative Number Theory*, Ch. 12，文献结果 $+$ 手工推导）：由于整函数 $\xi(s)$ 的增长阶为 $1$、满足 $\xi(0) = \frac{1}{2}$ 且中心导数 $\xi'(\frac{1}{2}) = 0$，只要将全体非平凡零点按关于 $s = \frac{1}{2}$ 对称的反射对 $\{\rho, 1 - \rho\}$ 成对编组，每一对内的魏尔斯特拉斯指数收敛因子 $e^{s/\rho + s/(1-\rho)}$ 便与线性指数常数精确对消（检验对数导数：在 $s = \frac{1}{2}$ 处每对因子 $\frac{1}{s-\rho} + \frac{1}{s-(1-\rho)} = \frac{2s-1}{(s-\rho)(s-1+\rho)}$ 均取 $0$，且因 $\sum_\rho \lvert\rho\rvert^{-2} < \infty$ 而在去零点紧集上一致绝对收敛），从而给出无任何额外指数因子的纯净成对乘积：

$$
\xi(s) = \frac{1}{2}\prod_{\{\rho,\, 1 - \rho\}} \left(1 - \frac{s}{\rho}\right)\left(1 - \frac{s}{1 - \rho}\right).
$$

现在逐组解剖两类对称零点构型在横向偏置坐标 $u = \sigma - \frac{1}{2} > 0$（记中心复坐标 $z := s - \frac{1}{2} = u + \hat{\mathbf{i}}t$）上的径向导数符号（`手工推导`）：

1. **临界线真零点对（$\delta = 0$，$\rho = \frac{1}{2} + \hat{\mathbf{i}}\gamma$，$1 - \rho = \bar{\rho} = \frac{1}{2} - \hat{\mathbf{i}}\gamma$）**：
   单对归一化阿达马因子 $P_{\mathrm{crit}}(s) := \bigl(1 - \frac{s}{\rho}\bigr)\bigl(1 - \frac{s}{\bar{\rho}}\bigr) = \frac{z^2 + \gamma^2}{\frac{1}{4} + \gamma^2}$ 的模平方及径向导数分别为：

   $$
   \bigl\lvert P_{\mathrm{crit}}(\tfrac{1}{2} + u + \hat{\mathbf{i}}t)\bigr\rvert^2 = \frac{u^4 + 2(\gamma^2 + t^2)u^2 + (\gamma^2 - t^2)^2}{\bigl(\frac{1}{4} + \gamma^2\bigr)^2}, \qquad \frac{\partial}{\partial u}\bigl\lvert P_{\mathrm{crit}}\bigr\rvert^2 = \frac{4u\bigl(u^2 + \gamma^2 + t^2\bigr)}{\bigl(\frac{1}{4} + \gamma^2\bigr)^2} > 0.
   $$

   关于 $u$ 的偶数次幂系数全为非负且二次项系数 $2(\gamma^2 + t^2) > 0$，故其径向导数与推进双壳差 $\Delta_{\epsilon,\mathrm{crit}}^{\mathrm{HB}}(u, t)$ 在整个右半开平面 **$u > 0$、任意高度 $t \in \mathbb{R}$ 上处处严格为正**！
2. **假想离轴四元组（$\delta > 0$，$\{\frac{1}{2} \pm \delta \pm \hat{\mathbf{i}}\gamma_0\}$，对应 `offCriticalQuartic`）**：
   对任意 $(\delta, \gamma_0) \neq (\frac{1}{2}, 0)$（其中 $\delta > 0,\; \gamma_0 \ge 0$），记严格正分母 $D(\delta, \gamma_0) := \bigl[(\frac{1}{2}+\delta)^2 + \gamma_0^2\bigr]\bigl[(\frac{1}{2}-\delta)^2 + \gamma_0^2\bigr] > 0$，并定义归一化四次整因子 $P_{\mathrm{rogue},4}(s) := \frac{\operatorname{offCriticalQuartic}(\delta, \gamma_0, s)}{D(\delta, \gamma_0)}$（当 $\gamma_0 > 0$ 时它恰等于四根互异阿达马乘积 $\prod_{\rho \in \{\frac{1}{2}\pm\delta\pm\hat{\mathbf{i}}\gamma_0\}}\bigl(1 - \frac{s}{\rho}\bigr)$）。沿着穿过上半平面离轴零点高度的水平截面 **$t = \gamma_0$**（即 $z = u + \hat{\mathbf{i}}\gamma_0$）：
   * 先看上半平面镜像对 $\{\frac{1}{2} \pm \delta + \hat{\mathbf{i}}\gamma_0\}$：两因子乘积 $(z - \delta - \hat{\mathbf{i}}\gamma_0)(z + \delta - \hat{\mathbf{i}}\gamma_0) = u^2 - \delta^2$ 的模平方当场坍缩为经典的**双阱墨西哥帽函数**

     $$
     F_{\mathrm{upper}}(u, \gamma_0) = (u^2 - \delta^2)^2 = u^4 - 2\delta^2 u^2 + \delta^4, \qquad \frac{\partial}{\partial u}F_{\mathrm{upper}}(u, \gamma_0) = 4u(u^2 - \delta^2) < 0 \quad \bigl(\forall u \in (0, \delta)\bigr);
     $$

   * 再把下半平面共轭对 $\{\frac{1}{2} \pm \delta - \hat{\mathbf{i}}\gamma_0\}$（其模平方为 $\bigl[(u-\delta)^2 + 4\gamma_0^2\bigr]\bigl[(u+\delta)^2 + 4\gamma_0^2\bigr] = (u^2 - \delta^2)^2 + 8\gamma_0^2(u^2 + \delta^2) + 16\gamma_0^4$）一并乘入，完整四元组模平方 $F_{\mathrm{rogue},4}(u, \gamma_0) := \bigl\lvert P_{\mathrm{rogue},4}(\frac{1}{2} + u + \hat{\mathbf{i}}\gamma_0)\bigr\rvert^2$ 对 $u$ 的精确偏导数**无需任何高 $\gamma_0$ 近似**，直接因式分解为 $4u(u^2 - \delta^2)$ 乘以一串严格正平方和：

     $$
     \frac{\partial}{\partial u}F_{\mathrm{rogue},4}(u, \gamma_0) = \frac{4u(u^2 - \delta^2)\Bigl[2(u^2 - \delta^2)^2 + 4\gamma_0^2\bigl(3u^2 + \delta^2 + 4\gamma_0^2\bigr)\Bigr]}{\Bigl[\bigl(\frac{1}{2} + \delta\bigr)^2 + \gamma_0^2\Bigr]^2\Bigl[\bigl(\frac{1}{2} - \delta\bigr)^2 + \gamma_0^2\Bigr]^2} < 0 \qquad \Bigl(\forall u \in (0, \delta),\; \forall \delta > 0,\; \forall \gamma_0 \ge 0,\; (\delta, \gamma_0) \neq \bigl(\tfrac{1}{2}, 0\bigr)\Bigr)!
     $$

   看清这道无可逃遁的曲率铁证：在 $(\delta, \gamma_0) \neq (\frac{1}{2}, 0)$ 下，对任意离轴偏移 $\delta > 0$ 与任意高度 $\gamma_0 \ge 0$，方括号内的因子 $2(u^2 - \delta^2)^2 + 4\gamma_0^2(3u^2 + \delta^2 + 4\gamma_0^2)$ 在 $u \in (0, \delta)$ 上恒严格大于零，而前因子 $4u(u^2 - \delta^2)$ 恒严格小于零！在几何势面上，假想离轴四元组必然在 $0 < u < \delta$ 走廊内生生砸出一道**品红色双阱负斜率凹槽**，令正逆推进双壳差 $\Delta_{\epsilon,\mathrm{rogue},4}^{\mathrm{HB}}(u, \gamma_0) = \epsilon\,\frac{\partial}{\partial u}F_{\mathrm{rogue},4}(u, \gamma_0) < 0$ 正面击穿圆弧双壳的正定单调锁！

::: {.viz src="arc-calculus-riemann-hermite-biehler-sandbox" preset="rogue-quartet-mexican-hat-breach" height="500"}
**反事实离轴四元组：墨西哥帽双阱击穿 $\Delta > 0$ 与核正定实验卡（`rogue-quartet-mexican-hat-breach`）。** 在 $t = 23$ 处注入完全符合反射与共轭对称的假想离轴四元组 $\frac{1}{2} \pm \delta \pm 23i$（$\delta = 0.22$）：势面上对称陷落一对品红坑，切面屏剖面弯成中间隆起、两侧下陷的 $(u^2 - \delta^2)^2$ 墨西哥帽双阱；在 $0 < u < 0.22$ 走廊内品红色外壳珠反低于镜像壳珠，出现 $\Delta_\varepsilon^{\mathrm{HB}} < 0$ 的品红内陷沟，且在 $u = 0.11$ 处令 $4 \times 4$ 核格拉姆矩阵的最小特征值跌至 $\lambda_{\min} = -1.0585 < 0$（绿色 `LEAN ✓` 锚定 `full_symmetry_not_fixed_line_localization`）。
:::

## 34.31.3 再生核半正定、重根唯一性排除与有限精度斯托克斯零涡旋闭合 {#sec-ch34-31-3}

把第 34.31.2 节的单组因子指纹提升为对整个完备函数 $\xi(s)$（允许无穷多颗背景零点叠加、且允许假想离轴零点具有任意高重数 $m \ge 1$！）的全局封锁，关键枢纽正是 [@def-ch34-arc-hb-jet-and-stokes-cochain] 第 2 款的**全纯埃尔米特—比勒对合核 $K_\epsilon(w, s)$**。

这里必须先点破一处极易踩空却生死攸关的**复分析全纯性陷阱**：在对角线 $w = s = \frac{1}{2} + u + \hat{\mathbf{i}}t$ 上，由于 $E_\epsilon(1 - \bar{s}) = \overline{E_\epsilon^\#(s)}$，反全纯映射 $s \mapsto E_\epsilon(1 - \bar{s})$ 与全纯对合映射 $s \mapsto E_\epsilon^\#(s) = \overline{E_\epsilon(1 - \bar{s})} = E_\epsilon(1 - s) = \xi(s) - \frac{\epsilon}{2}\xi'(s)$ 具有完全相同的模平方 $\lvert E_\epsilon(1 - \bar{s})\rvert^2 \equiv \lvert E_\epsilon^\#(s)\rvert^2$；然而一旦离开对角线进入多点格拉姆矩阵 $(w \neq s)$，若误把分子写成 $E_\epsilon(s)\overline{E_\epsilon(w)} - E_\epsilon(1 - \bar{s})\overline{E_\epsilon(1 - \bar{w})}$，第二项因关于 $s$ 反全纯而破坏希尔伯特空间内积的线性结构，哪怕对纯临界线多项式与真实 $\xi(s)$ 也会算出负的四阶主子式行列式！相反，采用真正的**全纯埃尔米特—比勒对合** $E_\epsilon^\#(s) := \overline{E_\epsilon(1 - \bar{s})} = E_\epsilon(1 - s) = \xi(s) - \frac{\epsilon}{2}\xi'(s)$（对应上半平面标准变量 $z = \hat{\mathbf{i}}(s - \frac{1}{2})$（即 $s = \frac{1}{2} - \hat{\mathbf{i}}z$，它把 $\Omega_+$ 映到上半平面）下的经典德布朗热对合 $f^\#(z) = \overline{f(\bar{z})}$），分子展开瞬间发生第二次精确代数奇迹（`手工推导`）：

$$
\begin{aligned}
E_\epsilon(s)\overline{E_\epsilon(w)} - E_\epsilon^\#(s)\overline{E_\epsilon^\#(w)}
&= \left(\xi(s) + \frac{\epsilon}{2}\xi'(s)\right)\left(\overline{\xi(w)} + \frac{\epsilon}{2}\overline{\xi'(w)}\right) - \left(\xi(s) - \frac{\epsilon}{2}\xi'(s)\right)\left(\overline{\xi(w)} - \frac{\epsilon}{2}\overline{\xi'(w)}\right) \\
&\equiv \epsilon\Bigl[\xi'(s)\overline{\xi(w)} + \xi(s)\overline{\xi'(w)}\Bigr]!
\end{aligned}
$$

零阶项与 $\epsilon^2$ 项在任意非对角点对 $(w, s)$ 上同样 $100\%$ 恒等抵消！除以分母 $2\epsilon\bigl[(s - \frac{1}{2}) + (\bar{w} - \frac{1}{2})\bigr]$ 后，步长因子 $\epsilon > 0$ 完全约去，给出与孔径 $\epsilon$ 无关的全纯再生核闭式：

$$
K_\epsilon(w, s) \equiv \frac{\xi'(s)\overline{\xi(w)} + \xi(s)\overline{\xi'(w)}}{2\bigl[(s - \frac{1}{2}) + (\bar{w} - \frac{1}{2})\bigr]}.
$$

检验分母归零超平面 $s - \frac{1}{2} = -(\bar{w} - \frac{1}{2})$（即 $s = 1 - \bar{w}$）：由 $\xi(1 - \bar{w}) = \overline{\xi(w)}$ 与 $\xi'(1 - \bar{w}) = -\overline{\xi'(w)}$，分子在该超平面上恒等于 $-\overline{\xi'(w)}\,\overline{\xi(w)} + \overline{\xi(w)}\,\overline{\xi'(w)} \equiv 0$，表观奇点处处可去，故 $K_\epsilon(w, s)$ 在整个 $\mathbb{C} \times \mathbb{C}$ 上关于 $s$ 全纯、关于 $w$ 反全纯；且沿对角线 $w = s = \frac{1}{2} + u + \hat{\mathbf{i}}t$（$u > 0$）精确满足 $\Delta_\epsilon^{\mathrm{HB}}(u, t) = 4 u \epsilon\,K_\epsilon(s, s)$！

现在我们给出**再生核半正定性、对角线径向单调性与黎曼猜想三者完全等价**（且自动排除任意重数 $m \ge 1$ 离轴零点）的自包含严格证明（`手工推导`，衔接 Lagarias 1999 与 Sondow–Dumitrescu 2010）：

* **正向（$\operatorname{RH} \implies K_\epsilon \succeq 0$ 于全空间）**：设黎曼猜想 [@conj-riemann-hypothesis] 成立，即 $\xi(s)$ 的全部互异零点 $\rho$（设各自重数为 $m_\rho \ge 1$）均位于临界线 $\operatorname{Re}(\rho) = \frac{1}{2}$ 上，从而满足 $\bar{\rho} = 1 - \rho$ 且 $\operatorname{Re}(\rho) - \frac{1}{2} = 0$。在去零点区域上对成对阿达马乘积取对数导数 $\frac{\xi'(s)}{\xi(s)} = \sum_{\{\rho, \bar{\rho}\}}\bigl(\frac{m_\rho}{s - \rho} + \frac{m_{\bar{\rho}}}{s - \bar{\rho}}\bigr)$（其中 $m_{\bar{\rho}} = m_\rho$），对每一颗临界线零点 $\rho = \frac{1}{2} + \hat{\mathbf{i}}\gamma_\rho$ 注意恒等式

  $$
  \frac{1}{s - \rho} + \frac{1}{\bar{w} - \bar{\rho}} = \frac{(\bar{w} - \frac{1}{2} + \hat{\mathbf{i}}\gamma_\rho) + (s - \frac{1}{2} - \hat{\mathbf{i}}\gamma_\rho)}{(s - \rho)\,\overline{(w - \rho)}} = \frac{(s - \frac{1}{2}) + (\bar{w} - \frac{1}{2})}{(s - \rho)\,\overline{(w - \rho)}}!
  $$

  两边同乘 $\frac{1}{2}\xi(s)\overline{\xi(w)}$ 并除以 $(s - \frac{1}{2}) + (\bar{w} - \frac{1}{2})$，由于整商函数 $\phi_\rho(s) := \frac{\xi(s)}{s - \rho}$ 在全平面 $\mathbb{C}$ 上全纯且当 $\lvert\rho\rvert \to \infty$ 时 $\lvert\phi_\rho(s)\rvert^2 = \mathcal{O}(\lvert\rho\rvert^{-2})$ 绝对可和，再生核在整个 $\mathbb{C}\times\mathbb{C}$ 上精确展开为秩一格拉姆外积的正权无穷级数：

  $$
  K_\epsilon(w, s) = \frac{1}{2}\sum_{\rho\text{ 互异}} m_\rho \left(\frac{\xi(s)}{s - \rho}\right)\overline{\left(\frac{\xi(w)}{w - \rho}\right)}.
  $$

  因此，对任意有限采样点组 $s_1, \dots, s_N \in \Omega_+$ 与任意复权向量 $(c_1, \dots, c_N) \in \mathbb{C}^N$，二次型恒为非负模平方和 $\sum_{j,k=1}^N \overline{c_j}\,c_k\,K_\epsilon(s_j, s_k) = \frac{1}{2}\sum_{\rho\text{ 互异}} m_\rho \bigl\lvert\sum_{k=1}^N c_k\frac{\xi(s_k)}{s_k - \rho}\bigr\rvert^2 \ge 0$，证得 $K_\epsilon \succeq 0$！
* **逆向（弱对角非负 $K_\epsilon(s, s) \ge 0 \implies \operatorname{RH}$ 成立，且进一步推出严格单调 $\Delta_\epsilon^{\mathrm{HB}}(u, t) > 0$）**：反之，仅需假定对角元在右半平面 $\Omega_+$ 上满足弱非负性 $K_\epsilon(s, s) \ge 0$（这自然包含在格拉姆半正定 $K_\epsilon \succeq 0$ 之中）。由 $\frac{\partial}{\partial u}\lvert\xi(\frac{1}{2} + u + \hat{\mathbf{i}}t)\rvert^2 = 4u\,K_\epsilon(s, s) \ge 0$，对任意固定纵坐标 $t \in \mathbb{R}$，非负实函数 $u \mapsto \lvert\xi(\frac{1}{2} + u + \hat{\mathbf{i}}t)\rvert^2$ 在半轴 $[0, +\infty)$ 上单调不减。**反证法**：假设 $\xi(s)$ 在开右半平面 $\Omega_+$ 内存在一颗离轴零点 $\rho_0 = \frac{1}{2} + \delta + \hat{\mathbf{i}}\gamma_0$（$\delta > 0$，**允许任意重数 $m \ge 1$**，哪怕是导数同时归零的高重根！）。则在高度 $t = \gamma_0$ 的水平闭线段 $u \in [0, \delta]$ 上，单调不减性与非负性联手夹逼：

  $$
  0 \;\le\; \bigl\lvert\xi(\tfrac{1}{2} + u + \hat{\mathbf{i}}\gamma_0)\bigr\rvert^2 \;\le\; \bigl\lvert\xi(\tfrac{1}{2} + \delta + \hat{\mathbf{i}}\gamma_0)\bigr\rvert^2 \;=\; \lvert\xi(\rho_0)\rvert^2 \;=\; 0 \qquad \bigl(\forall u \in [0, \delta]\bigr).
  $$

  这意味着全纯整函数 $\xi(s)$ 在长度非零的实水平线段 $[\frac{1}{2},\, \frac{1}{2} + \delta] + \hat{\mathbf{i}}\gamma_0 \subset \mathbb{C}$（含无穷多个聚点）上恒等于零！由**全纯函数唯一性定理（Identity Theorem）**，必有 $\xi(s) \equiv 0$ 于全平面 $\mathbb{C}$，但这与端点真值 $\xi(0) = \xi(1) = \frac{1}{2} \neq 0$（[@thm-xi-reading-entire-reflection] 第 4 款）正面矛盾！故 $\xi(s)$ 在 $\Omega_+ = \{\operatorname{Re}(s) > \frac{1}{2}\}$ 内绝无任何零点；结合 [@thm-ch34-arc-riemann-sagitta-hb-stokes-bridge] 第 2、3 款（或反射对称 $\xi(1-s)=\xi(s)$），`RiemannHypothesis` 立即成立！不仅如此，一旦 $\xi$ 的全部零点归位到临界线 $\operatorname{Re}(\rho) = \frac{1}{2}$ 上，对任意 $s = \frac{1}{2} + u + \hat{\mathbf{i}}t \in \Omega_+$（$u > 0$）既有 $\xi(s) \neq 0$，又有 $\operatorname{Re}\bigl(\frac{\xi'(s)}{\xi(s)}\bigr) = \sum_{\rho\text{ 互异}} m_\rho\frac{u}{u^2 + (t - \gamma_\rho)^2} > 0$，从而自动把弱非负不等式升级为**处处严格正定与严格径向递增**：

  $$
  K_\epsilon(s, s) > 0 \quad \Longrightarrow \quad \Delta_\epsilon^{\mathrm{HB}}(u, t) = 4u\epsilon\,K_\epsilon(s, s) > 0 \qquad (\forall u > 0,\; \forall t \in \mathbb{R},\; \forall \epsilon > 0)!
  $$

下面**假设** $K_\epsilon \succeq 0$：在极小圆弧体微积分的公理模型（`MODEL`）内部，它被当作不坍缩比较格拉姆半正定性的投射而设为公设；由上面的等价，这个公设与黎曼猜想等价，所以模型内的“闭环”是把黎曼猜想设为公设，而不是证明它。在这一假设下看它如何在有限网格上读出——在右半平面内任取一块脱离临界线的有限紧致测试矩形 $\mathcal{R} = [\frac{1}{2} + u_0,\, \sigma_{\max}] \times [T_1, T_2]$（其中左界偏置 $u_0 > 0$），用有限 $M \ge 1$ 枚极小圆弧体 $\{\Delta\mathcal{T}_k\}_{k=1}^M$ 对 $\mathcal{R}$ 作胞腔剖分，直接调用 [§34.30.3](ch34-s30-arc-body-calculus-and-finite-stokes.md#sec-ch34-30-3) 的**有限精度广义斯托克斯定理**（辅以 [@thm-ch34-arc-riemann-sagitta-hb-stokes-bridge] 第 4 款的有限上边缘精确相消机制）：

1. **严格径向爬升封死矩形零核下界**：在上述假设下，$\frac{\partial}{\partial u}\lvert\xi(\frac{1}{2}+u+\hat{\mathbf{i}}t)\rvert^2 > 0$ 在 $(0, +\infty)$ 上严格成立（上面逆向论证的最后一步），于是对矩形 $\mathcal{R}$ 内任意点 $s = \frac{1}{2} + u + \hat{\mathbf{i}}t$（$u \ge u_0 > 0$），哪怕临界线基底 $\frac{1}{2} + \hat{\mathbf{i}}t$ 恰好撞上一颗真实零点使 $\lvert\xi(\frac{1}{2}+\hat{\mathbf{i}}t)\rvert = 0$，跨越 $(0, u_0]$ 的严格正斜率也保证左边界与整座矩形严格远离零点：

   $$
   \bigl\lvert\xi(\tfrac{1}{2} + u + \hat{\mathbf{i}}t)\bigr\rvert \;\ge\; \bigl\lvert\xi(\tfrac{1}{2} + u_0 + \hat{\mathbf{i}}t)\bigr\rvert \;>\; \bigl\lvert\xi(\tfrac{1}{2} + \hat{\mathbf{i}}t)\bigr\rvert \;\ge\; 0 \quad \Longrightarrow \quad m_{\mathcal{R}} := \min_{s \in \mathcal{R}}\lvert\xi(s)\rvert > 0!
   $$

2. **内部共棱零误差抵消与单胞涡旋恒零（精确区分连续棱积分上链与顶点主值采样条件）**：
   * 对 [@def-ch34-arc-hb-jet-and-stokes-cochain] 第 3 款的**连续分支棱积分 $1$-上链** $\Phi_\xi(e) = \operatorname{Im}\int_e (\xi'(s)/\xi(s))\,ds$：**无需取 $\varepsilon_{\mathrm{self}} \to 0$ 的连续极限，且对任意粗糙的有限胞腔数 $M \ge 1$**，网格内部每一条共享圆弧棱均因左右相邻单胞正反双向遍历 $\Phi_\xi(e_{AB}) + \Phi_\xi(e_{BA}) \equiv 0$ 而 $100\%$ 代数抵消；同时在每一枚单连通单胞 $\Delta\mathcal{T}_k \subset \mathcal{R}$ 上，因 $\lvert\xi(s)\rvert \ge m_{\mathcal{R}} > 0$ 全纯无零点，$\frac{\xi'(s)}{\xi(s)}$ 具备单值全纯原函数 $\ln\xi(s)$，故单胞闭合回路积分恒为零 $\Omega_\xi(\Delta\mathcal{T}_k) = (d_\epsilon\Phi_\xi)(\Delta\mathcal{T}_k) \equiv 0$，直接锁死边界总绕数与矩形内零点总数恒等于零：

     $$
     \sum_{e \subset \partial\mathcal{R}} \Phi_\xi(e) \;\equiv\; \sum_{k=1}^{M} \Omega_\xi\bigl(\Delta\mathcal{T}_k\bigr) \;=\; 2\pi N(\mathcal{R}) \;\equiv\; 0 \quad \Longrightarrow \quad N(\mathcal{R}) = 0!
     $$

   * 若在纯数值算法中不作棱路径积分、仅在网格顶点采样复函数值构造**离散主值辐角差 $1$-上链** $\Delta\arg_\epsilon^{\mathrm{disc}}\xi(e_{AB}) = \operatorname{Arg}\bigl(\xi(B)/\xi(A)\bigr) \in (-\pi, \pi]$，只要每条网格棱满足**无相位混叠变差界 $\lvert\Delta_e\arg\xi\rvert < \pi$**（由紧集正下界 $m_{\mathcal{R}} > 0$，只需有限网格最大棱长满足显式可算阈值 $\ell(e) < \frac{\pi\,m_{\mathcal{R}}}{\max_{s \in \mathcal{R}}\lvert\xi'(s)\rvert}$ 即可在有限步长下构造性保证！），主值分支便不发生 $\pm 2\pi$ 跳变，此时顶点主值上链与连续积分上链逐棱恒等 $\Delta\arg_\epsilon^{\mathrm{disc}}\xi(e) \equiv \Phi_\xi(e)$，同样在有限网格上以 **`0.0000000000`** 零截断误差锁定 $N(\mathcal{R}) \equiv 0$！

::: {.viz src="arc-calculus-riemann-hermite-biehler-sandbox" preset="finite-stokes-zero-vortex-lock" height="500"}
**有限网格斯托克斯：内棱正反相消，右半区零涡旋锁定实验卡（`finite-stokes-zero-vortex-lock`）。** 在 $\varepsilon = 0.20$ 下将检验框 $[\frac{1}{2} + u_0,\, \frac{1}{2} + 0.42] \times [12, 34.5]$ 切成 $3 \times 10$ 胞（拖动琥珀色圆环手柄或播放时间轴将左界 $u_0$ 从 $-0.20$ 推至 $+0.30$，静帧停在 $u_0 = +0.080$）：每条墨色共享内棱只算一次连续相位、反方向取负，$\varphi(AB) + \varphi(BA) = 0$ 在任意粗网格上两两精确抵消；$u_0 < 0$ 时青色外边界 $\partial R$ 数出模型五道临界线峡谷 $N = 5.0000$，一旦越过 $\sigma = \frac{1}{2}$ 进入右半区即锁定 $N = 0.0000$，并同步核验顶点主值采样不混叠（绿色 `LEAN ✓` 锚定 `golden_right_half_strip_implies_rh` 与 `tetra_defects_incidence_repair_and_exactness`）。
:::

由于紧致矩形 $\mathcal{R} = [\frac{1}{2}+u_0, \sigma_{\max}] \times [T_1, T_2]$ 中的 $u_0 > 0, \sigma_{\max}, T_1, T_2$ 均可任意选取，在 $K_\epsilon \succeq 0$ 的假设下，右半平面 $\sigma > \frac{1}{2}$ 被清空为零涡旋无零点区；再由 [@thm-ch34-arc-riemann-sagitta-hb-stokes-bridge] 第 3 款 `golden_right_half_strip_implies_rh`，左半开带 $0 < \sigma < \frac{1}{2}$ 同步归零，全部非平凡零点落在 $\sigma = \frac{1}{2}$ 临界脊线上。这只是“$K_\epsilon \succeq 0 \Rightarrow$ 黎曼猜想”的又一种写法：前提没有被证明，[@conj-riemann-hypothesis] 仍然开放。而且一旦有了 $m_{\mathcal{R}} > 0$，矩形内无零点已经成立，斯托克斯相消只是同一事实的计数读法（`手工推导`）。下面我们通过一组可逐位手算复核的三合一算例，将上述三大定量机制算至小数点后八至十位：

::: {.example #ex-ch34-sagitta-hb-stokes-benchmark title="素数旋子矢高部分和、首颗零点高度处真零点对与离轴四元组 $\Delta_\epsilon^{\mathrm{HB}}$ 对决及有限网格斯托克斯零涡旋核算（精确代数与数值算例）"}
本算例分三部分独立核验 §34.31.1–§34.31.3 的核心定量断言（`手工推导` / `NUM`）：

1. **前五枚素数 $p \in \{2, 3, 5, 7, 11\}$ 的精确正矢矢高部分和与渐近常数 $C_{\mathrm{sag}} \approx +0.11214579$ 核对**：
   注意在临界脊线 $\sigma = \frac{1}{2}$ 上，因 $(p^{-1/2})^{2k} = p^{-k} \in \mathbb{Q}$ 全为精确有理分数，交错级数 $v_p(\frac{1}{2}) = 1 - \cos(p^{-1/2}) = \frac{1}{2p} - \frac{1}{24p^2} + \frac{1}{720p^3} - \frac{1}{40320p^4} + \cdots$ 的每一项均可由纯有理分数算出！将前五枚素数在临界脊线 $\sigma = \frac{1}{2}$ 与平滑欧拉区 $\sigma = 1$（$v_p(1) = 1 - \cos(p^{-1}) = \frac{1}{2p^2} - \frac{1}{24p^4} + \cdots$）处的八位小数逐行对照如下：

| 素数原胞 $p$ | 临界一阶近似 $\frac{1}{2p}$ | 临界精确矢高 $v_p(\frac{1}{2}) = 2\sin^2(\frac{1}{2}p^{-1/2})$ | 高阶修正差 $v_p(\frac{1}{2}) - \frac{1}{2p}$ | 欧拉区精确矢高 $v_p(1) = 2\sin^2(\frac{1}{2p})$ |
| :---: | :---: | :---: | :---: | :---: |
| **$2$** | $0.25000000$ | $0.23975540$ | $-0.01024460$ | $0.12241744$ |
| **$3$** | $0.16666667$ | $0.16208817$ | $-0.00457849$ | $0.05504305$ |
| **$5$** | $0.10000000$ | $0.09834440$ | $-0.00165560$ | $0.01993342$ |
| **$7$** | $0.07142857$ | $0.07058227$ | $-0.00084630$ | $0.01018674$ |
| **$11$** | $0.04545455$ | $0.04511123$ | $-0.00034331$ | $0.00412939$ |
| **前五素数合计（$p \le 11$）** | $\frac{2927}{4620} \approx \mathbf{0.63354978}$ | **$\Sigma_{\mathrm{sag}}(\frac{1}{2}; 11) \approx 0.61588148$** | **$-0.01766830$**（占 $\Delta C_{\mathrm{sag}}$ 的 $94.98\%$） | **$\Sigma_{\mathrm{sag}}(1; 11) \approx 0.21171004$**（有界收敛） |

   看清两列截然相反的命运：在欧拉区 $\sigma = 1$ 列，仅前五枚素数的累计矢高 $0.21171004$ 就已占无穷总和 $\sum_p v_p(1) \approx 0.22293927$（它小于 $\frac{1}{2}P(2) \approx 0.22612371$）的近 $95\%$，此后彻底熄灭；而在临界脊线 $\sigma = \frac{1}{2}$ 列，高阶修正差在前五枚素数处便迅速收敛至 $-0.01766830$（无穷级数全值为 $\Delta C_{\mathrm{sag}} \approx -0.01860282$，配平 $\frac{M}{2} \approx +0.13074861$ 得 $C_{\mathrm{sag}} \approx +0.11214579$），主项 $-\frac{1}{2}\ln\varepsilon_{\mathrm{self}} + C_{\mathrm{sag}}$ 则随停机精度 $\varepsilon_{\mathrm{self}} = 10^{-2}, 10^{-4}, 10^{-8}$ 稳步攀升至 $2.41473088$、$4.71731598$、$9.32248616 \to +\infty$！

2. **首颗黎曼零点高度 $\gamma_1 \approx 14.1347251417$ 处临界线真零点对 vs. 反事实离轴四元组（$\delta = 0.20,\; \epsilon = 0.10$）的精确 $\Delta_\epsilon^{\mathrm{HB}}$ 与 $K_\epsilon(s,s)$ 对决**：
   固定首颗真实零点纵坐标 $\gamma_1 = 14.13472514173469\dots$（$\gamma_1^2 \approx 199.790454832387$），取有限圆弧步长 $\epsilon = 0.10$，在水平截面 $t = \gamma_1$ 上并排对比单对临界线阿达马因子 $P_{\mathrm{crit}}(s) = \frac{(s-1/2)^2 + \gamma_1^2}{1/4 + \gamma_1^2}$（分母平方 $(\frac{1}{4}+\gamma_1^2)^2 \approx 40016.18356955$）与注入假想离轴偏置 $\delta = 0.20$ 的四元组阿达马因子 $P_{\mathrm{rogue},4}(s) = \frac{\operatorname{offCriticalQuartic}(0.20, \gamma_1, s)}{D(0.20, \gamma_1)}$（归一化分母平方 $D(0.20, \gamma_1)^2 \approx 1.6025729060\times 10^9$），沿横向坐标 $u \in \{0.10, 0.15, 0.20, 0.30\}$ 逐点核算双壳推进差 $\Delta_\epsilon^{\mathrm{HB}}(u, \gamma_1)$ 与对角再生核 $K_\epsilon(s, s) = \frac{\Delta_\epsilon^{\mathrm{HB}}}{4u\epsilon}$：

| 横向偏置 $u = \sigma - \frac{1}{2}$ | 真零点对双壳差 $\Delta_{\epsilon,\mathrm{crit}}^{\mathrm{HB}}(u, \gamma_1)$ | 真零点对对角核 $K_{\epsilon,\mathrm{crit}}(s,s)$ | 离轴四元组双壳差 $\Delta_{\epsilon,\mathrm{rogue},4}^{\mathrm{HB}}(u, \gamma_1)$ | 离轴四元组对角核 $K_{\epsilon,\mathrm{rogue},4}(s,s)$ | 径向势面几何诊断 |
| :---: | :---: | :---: | :---: | :---: | :--- |
| **$0.10$**（$0 < u < \delta$） | $+3.99429305 \times 10^{-4}$ | $+9.98573262 \times 10^{-3}$ | **$-4.78267581 \times 10^{-7}$** | **$-1.19566895 \times 10^{-5}$** | 真因子严格正爬升；**伪四元组深陷品红色负斜率凹槽（击穿正定锁！）** |
| **$0.15$**（$0 < u < \delta$） | $+5.99162700 \times 10^{-4}$ | $+9.98604500 \times 10^{-3}$ | **$-4.18503768 \times 10^{-7}$** | **$-6.97506281 \times 10^{-6}$** | 凹槽内 $u^2 - \delta^2 = -0.0175 < 0$，双壳差与对角核持续严格为负 |
| **$0.20$**（$u = \delta$ 谷底） | $+7.98918585 \times 10^{-4}$ | $+9.98648232 \times 10^{-3}$ | **$0.00000000$** | **$0.00000000$** | 恰好踩中假想离轴零点 $\rho_+ = 0.70 + \hat{\mathbf{i}}\gamma_1$，品红色双阱触底归零 |
| **$0.30$**（$u > \delta$ 外翼） | $+1.19852782 \times 10^{-3}$ | $+9.98773181 \times 10^{-3}$ | $+2.39205601 \times 10^{-6}$ | $+1.99338001 \times 10^{-5}$ | 越过伪零点后恢复外翼爬升，但 $[0, \delta]$ 段的负核破缺已不可抹平 |

   若直接考察未除以 $D(0.20, \gamma_1)^2$ 的首一整多项式 `offCriticalQuartic`，在 $u = 0.10$ 处 $4u(u^2 - \delta^2) = -0.012$ 乘以正平方和括号 $638715.55660147$ 再乘以 $\epsilon = 0.10$，更直接给出巨幅负双壳差 $\Delta_{\epsilon,\mathrm{monic}}^{\mathrm{HB}}(0.10, \gamma_1) \approx \mathbf{-766.45866792} < 0$！

3. **跨过前五颗零点频带 $[10, 35]$ 的有限网格斯托克斯绕数对消检验（$u_0 = -0.10$ vs. $u_0 = +0.10$）**：
   取纵坐标区间 $[T_1, T_2] = [10, 35]$（恰好包住前五颗真实临界线零点 $\gamma_1 \approx 14.1347$ 至 $\gamma_5 \approx 32.9351$，而 $\gamma_6 \approx 37.5862 > 35$ 落在框外），右界固定在 $\sigma_{\max} = 1.50$，将测试矩形 $\mathcal{R}(u_0) = [\frac{1}{2} + u_0,\, 1.50] \times [10, 35]$ 剖分为 $M$ 枚极小圆弧体（对比粗网格 $M = 8$ 与细网格 $M = 2000$）：
   * 当左界跨在临界线左侧 **$u_0 = -0.10 < 0$**（$\mathcal{R}(-0.10) = [0.40, 1.50] \times [10, 35]$）时：内部共享内棱通量对恒等抵消为 `0.0000000000`，外边界连续相位环流对任意 $M \ge 1$ 精确捕获五颗临界线零点总涡旋 $\sum_{e \subset \partial\mathcal{R}(-0.10)} \Phi_\xi(e) = 2\pi \times 5 = 10\pi \approx \mathbf{31.4159265359}$（绕数 $N = \mathbf{5}$）；
   * 一旦左界跨入右半平面 **$u_0 = +0.10 > 0$**（$\mathcal{R}(+0.10) = [0.60, 1.50] \times [10, 35]$）：真实完备函数 $\xi(s)$ 在框内处处满足 $\Delta_\epsilon^{\mathrm{HB}} > 0$ 与 $\lvert\xi(s)\rvert \ge m_{\mathcal{R}(+0.10)} > 0$，无论网格取粗糙的 $M = 8$ 还是加密的 $M = 2000$，内部共棱正反全相消与单胞无奇点闭合共同将边界环流锁死在绝对的 **`0.0000000000`**（绕数 $N = \mathbf{0}$；且当网格细化至每棱相位变差 $\lvert\Delta_e\arg\xi\rvert < \pi$ 时，纯顶点主值采样 $\Delta\arg_\epsilon^{\mathrm{disc}}\xi$ 亦同步给出精确的 **`0.0000000000`**）；
   * 反之，若在 $\delta = 0.20,\; \gamma_0 = \gamma_1$ 处反事实注入上述离轴四元组因子，其右半带零点 $\rho_+ = 0.70 + \hat{\mathbf{i}}\gamma_1$ 恰好落入 $\mathcal{R}(+0.10)$ 腹地，立刻激发出 $2\pi \approx \mathbf{6.2831853072}$ 的非零涡旋（$N = \mathbf{1}$）。上表的 $\Delta_{\epsilon,\mathrm{rogue},4}^{\mathrm{HB}}(0.10, \gamma_1) = -4.78267581\times 10^{-7} < 0$ 是单独的四元组因子在左墙 $u_0 = 0.10$ 处的双壳差；乘上 $\xi$ 之后，由于 $\xi$ 自己的零点 $\frac{1}{2} + \hat{\mathbf{i}}\gamma_1$ 也在这一高度，同一点的径向斜率反而为正，负坡只出现在约 $0.1155 < u < 0.20$ 一段（`NUM`）。正如第 34.31.3 节的反证所说，负坡必然出现在 $(0, \delta)$ 的某处，但不必出现在每一处。
:::

第 34.31.3 节的再生核 $K_\epsilon$ 与 §34.30 的 Li 曲率托普利茨矩阵（[@prop-ch34-li-curvature-toeplitz]）看起来是两套工具，其实读的是同一张表。下面先在有限族上把这件事说精确，再回到 $\zeta$。

::: {.remark #rem-ch34-one-zero-form-three-readings title="一张零点比较表的三种读法：德布朗热核、旋子幂和托普利茨矩阵与牛顿—汉克尔矩阵（手工推导）"}
**手工推导。** 设 $\rho_1,\dots,\rho_d$ 是互不相同的复数，都不等于 $0$ 与 $1$，重数为 $\mu_i\ge1$，这个多重集在 $\rho\mapsto1-\overline\rho$ 下封闭（重数相同）。由此得到取值上的一个对合 $\tau$：$\rho_{\tau(i)}=1-\overline{\rho_i}$，$\mu_{\tau(i)}=\mu_i$；$\tau(i)=i$ 当且仅当 $\operatorname{Re}\rho_i=\tfrac12$。记 $e$ 为线上取值的个数，$\kappa$ 为 $\operatorname{Re}\rho_i>\tfrac12$ 的取值个数，于是 $d=e+2\kappa$。定义 $\mathbb{C}^d$ 上的厄尔米特形式（**零点比较表**）

$$
\mathcal{Q}(y,y')=\sum_{i=1}^{d}\mu_i\,y_i\,\overline{y'_{\tau(i)}} .
$$

它的矩阵在线上取值处是对角元 $\mu_i>0$，在每一对 $\{i,\tau(i)\}$ 上是一个两个非对角元都为 $\mu_i$ 的块，所以惯性恰为 $(e+\kappa,\ \kappa,\ 0)$。下面三个矩阵都是 $\mathcal{Q}$ 经某个“特征映射”拉回的结果。

1. **德布朗热核。** 令 $P(s)=\prod_i(s-\rho_i)^{\mu_i}$，按第 34.31.3 节的闭式以 $P$ 代替 $\xi$ 作 $K_P(w,s)=\dfrac{P'(s)\overline{P(w)}+P(s)\overline{P'(w)}}{2\bigl[(s-\frac12)+(\overline w-\frac12)\bigr]}$。则当 $s+\overline w\ne1$ 时

   $$
   K_P(w,s)=\frac12\,P(s)\,\overline{P(w)}\sum_{i=1}^{d}\frac{\mu_i}{(s-\rho_i)\,\bigl(\overline w-1+\rho_i\bigr)} .
   $$

2. **旋子幂和的托普利茨矩阵。** 令 $u_i=1-\frac1{\rho_i}$，$p_k=\sum_i\mu_iu_i^{\,k}$。则 [@rem-ch34-finite-toeplitz-inertia] 的 $T_N=[p_{j-k}]_{0\le j,k<N}$ 满足 $T_N=\sum_i\mu_i\,a_ia_{\tau(i)}^{*}$，$a_i=(u_i^{\,j})_{0\le j<N}$。
3. **牛顿—汉克尔矩阵。** 若多重集还在复共轭下封闭，令 $r_i=i(2\rho_i-1)$，则 [@prop-ch34-li-curvature-toeplitz] 第 6 款的矩阵 $H$（$m=\sum_i\mu_i$ 个根）满足 $mH_{jk}=\sum_i\mu_i\,r_i^{\,j}\,\overline{r_{\tau(i)}^{\,k}}$。

因此，对任意 $n\ge d$ 个互不相同、都不是根的点 $s_1,\dots,s_n$（例如全部取在 $\operatorname{Re}s>\tfrac12$ 内），矩阵 $[K_P(s_a,s_b)]$ 的惯性是 $(e+\kappa,\ \kappa,\ n-d)$；对 $N\ge d$，$T_N$ 的惯性是 $(e+\kappa,\ \kappa,\ N-d)$；在共轭封闭时，尺寸为 $m\ge d$ 的 $H$ 的惯性是 $(e+\kappa,\ \kappa,\ m-d)$。点数或尺寸小于 $d$ 时，负特征值不多于 $\kappa$。

**证明。** 第 1 款：$\dfrac{1}{(s-\rho)(\overline w-1+\rho)}=\dfrac1{s+\overline w-1}\left[\dfrac1{s-\rho}+\dfrac1{\overline w-1+\rho}\right]$。对 $i$ 求和，第一项给出 $\frac{P'}{P}(s)$；第二项用 $1-\rho_i=\overline{\rho_{\tau(i)}}$ 换指标，给出 $\overline{\frac{P'}{P}(w)}$。于是右端等于 $\frac12P(s)\overline{P(w)}\bigl[\frac{P'}{P}(s)+\overline{\frac{P'}{P}(w)}\bigr]/(s+\overline w-1)$，正是 $K_P$；两端在 $s+\overline w=1$ 处都连续，所以等式对一切非根的 $s,w$ 成立。由此，$(a,b)$ 元为 $K_P(s_b,s_a)$ 的矩阵等于 $D\,C\,M_{\mathcal{Q}}\,C^{*}D^{*}$（它与 $[K_P(s_a,s_b)]$ 互为转置，惯性相同），其中 $M_{\mathcal{Q}}$ 是 $\mathcal{Q}$ 的矩阵（$(i,\tau(i))$ 元为 $\mu_i$）， $C_{ai}=\frac1{s_a-\rho_i}$，$D=\operatorname{diag}\bigl(P(s_a)/\sqrt2\bigr)$。$n\ge d$ 时 $C$ 的任意 $d$ 行构成一个柯西矩阵，节点互异且不相碰，行列式非零，所以 $C$ 列满秩；$D$ 可逆。第 2 款是 [@rem-ch34-finite-toeplitz-inertia] 证明中的分解。第 3 款：$\overline{r_{\tau(i)}}=-i\bigl(2(1-\rho_i)-1\bigr)=r_i$，所以 $\sum_i\mu_ir_i^{\,j}\overline{r_{\tau(i)}^{\,k}}=\sum_i\mu_ir_i^{\,j+k}$，在共轭封闭时它是实数。三种情形的特征映射都列满秩（柯西矩阵；取值互异的范德蒙矩阵，$u=1-\frac1\rho$ 与 $r=i(2\rho-1)$ 都是单射），满射合同保持惯性，推理与 [@rem-ch34-finite-toeplitz-inertia] 相同。$\square$

所以“核半正定”“托普利茨正性”“厄尔米特实根判据”是同一个事实（$\kappa=0$）的三种读法，负特征值的个数也一样，都是右半平面内的零点取值个数 $\kappa$。所钉仓库冻结了第 3 款中“半正定当且仅当全为实数”的部分（[@prop-ch34-li-curvature-toeplitz] 第 6 款）。上面的有限证明是自足的，本书不主张新颖性。另一个相关的冻结结果按零点镜像对构造了一个格拉姆矩阵，其负指数等于高度 $T$ 以内按重数计的离线镜像对数（[`canonical_zeta_finite_mirror_gram_inertia`](lean:D5/S3/Midline/Cayley/FiniteMirrorKreinGramInertia.canonical_zeta_finite_mirror_gram_inertia)）；那是在零点空间上直接构造的，不涉及 Li 系数或 $K_\xi$。
:::

对 $\zeta$ 本身，两种读法之间有一条精确的桥，不需要知道零点在哪里。

::: {.remark #rem-ch34-li-toeplitz-de-branges-bridge title="ζ 的德布朗热核在 s = 1 附近就是 Li 曲率托普利茨矩阵的生成函数（手工推导，由冻结结论组合而成）"}
**手工推导。** 记 $\lambda_n$、$c^{\mathrm{Li}}_k$ 如 [@prop-ch34-li-curvature-toeplitz]，$C(u)=1+2\sum_{k\ge1}c^{\mathrm{Li}}_ku^k$。冻结的 [`canonical_li_local_expansion`](lean:D5/S3/Zeros/Endpoints/CanonicalLiLocalExpansion.canonical_li_local_expansion) 说：在 $z=0$ 附近，$\sum_{n\ge0}\lambda_{n+1}z^n=(1-z)^{-2}\,\frac{\xi'}{\xi}\!\left(\frac1{1-z}\right)$。连同 $\lambda_0=0$、$\lambda_1>0$，这恰是冻结的 [`li_caratheodory_identity`](lean:D5/S3/Weil/TestFunctions/LiCaratheodoryIdentity.li_caratheodory_identity) 的全部前提。该定理的结论给出：在 $u=0$ 附近，

$$
C(u)=\frac1{\lambda_1}\,\frac{\xi'}{\xi}\!\left(\frac1{1-u}\right).
$$

现在令 $u_s=1-\frac1s$，这就是 §34.30 的零点旋子坐标（$s=\rho$ 时为 $u_\rho$）。有恒等式 $s+\overline w-1=s\,\overline w\,(1-u_s\overline{u_w})$；又因 $c^{\mathrm{Li}}$ 是实的偶数列且 $c^{\mathrm{Li}}_0=1$，有 $\sum_{j,k\ge0}c^{\mathrm{Li}}_{j-k}u^j\overline v^k=\dfrac{C(u)+\overline{C(v)}}{2(1-u\overline v)}$（只要 $C$ 的泰勒级数在 $u,v$ 处绝对收敛）。把三式代入 $K_\xi(w,s)=\frac12\xi(s)\overline{\xi(w)}\bigl[\frac{\xi'}{\xi}(s)+\overline{\frac{\xi'}{\xi}(w)}\bigr]/(s+\overline w-1)$（第 34.31.3 节的闭式），得

$$
K_\xi(w,s)=\lambda_1\,\frac{\xi(s)}{s}\,\overline{\left(\frac{\xi(w)}{w}\right)}\sum_{j,k\ge0}c^{\mathrm{Li}}_{j-k}\,u_s^{\,j}\,\overline{u_w}^{\,k},
$$

只要 $\lvert u_s\rvert,\lvert u_w\rvert$ 小于 $C$ 的泰勒级数的收敛半径。这个半径是正数，等于 $1$ 与 $\frac{\xi'}{\xi}(\frac1{1-u})$ 离原点最近的奇点模长中的较小者；不知道零点位置，就不知道它是否等于 $1$。用 §34.30 的话说：$K_\xi$ 在旋子坐标里的泰勒系数矩阵，就是 Li 曲率托普利茨矩阵左右各乘一个三角矩阵。准确地说，在 $u_s=u_w=0$（即 $s=w=1$）处，$K_\xi$ 关于 $u_s^{\,j}\,\overline{u_w}^{\,k}$（$0\le j,k<N$）的泰勒系数矩阵等于 $\lambda_1LT_N(c^{\mathrm{Li}})L^{*}$，$L$ 是 $h(u)=\xi\bigl(\frac1{1-u}\bigr)(1-u)$ 的泰勒系数构成的下三角托普利茨矩阵，对角元 $h(0)=\xi(1)=\tfrac12\ne0$，可逆。所以两者的惯性相同。

数值核对（60 位精度，$\lambda_1,\dots,\lambda_{71}$ 按 [@prop-ch34-li-sagitta-frozen] 第 2 款的定义计算）：在 $s=1.1+0.2i$、$w=0.9-0.1i$ 处，直接计算的 $K_\xi$ 与截断到 $j,k<69$ 的右端相差 $5\times10^{-52}$；在 $s=1.3$、$w=1.05+0.25i$ 处相差 $4\times10^{-47}$；$N=5$ 的泰勒系数矩阵与 $\lambda_1LT_5L^{*}$ 相差 $8\times10^{-19}$（受柯西积分离散误差限制）。这条等式不依赖零点位置，也不说明零点在哪里。
:::

下面这条把 [@prop-ch34-li-curvature-toeplitz] 第 5 款的“全部半正定 ⇒ RH”细化为计数：负特征值最多有几个，恰好由右半平面里的零点个数决定。

::: {.remark #rem-ch34-li-toeplitz-negative-index title="Li 曲率托普利茨矩阵的负惯性指数等于临界线右侧零点的个数（手工推导，依赖文献中的零点和表示）"}
**手工推导**，依赖 [@rem-ch34-li-criterion-sagitta-literature] 的零点和表示 $\lambda_n=\sum_\rho m_\rho\bigl[1-u_\rho^{\,n}\bigr]$（文献结果，未在本书形式化；按 $\lvert\operatorname{Im}\rho\rvert\le H$ 对称截断后令 $H\to\infty$）。记 $\kappa\in\{0,1,2,\dots\}\cup\{\infty\}$ 为满足 $\operatorname{Re}\rho>\tfrac12$ 的**不同**非平凡零点的个数，$n_-(T_N)$ 为 $T_N(c^{\mathrm{Li}})$ 的负特征值个数（按重数）。则

1. 对每个 $N$，$n_-(T_N)\le\kappa$；
2. $n_-(T_N)$ 随 $N$ 单调不减，且 $\sup_Nn_-(T_N)=\kappa$。

特别地，黎曼猜想等价于“一切 $T_N(c^{\mathrm{Li}})$ 半正定”：“⇐”是 [@prop-ch34-li-curvature-toeplitz] 第 5 款（冻结），“⇒”是第 1 条在 $\kappa=0$ 的情形。$\kappa$ 是多少不知道，[@conj-riemann-hypothesis] 仍然开放；冻结的 [`not_rh_forces_canonical_curvature_failure`](lean:D5/S3/Weil/Probability/CanonicalLiCurvatureZeroFree.not_rh_forces_canonical_curvature_failure) 只给出“$\kappa\ge1$ ⇒ 某个 $n_-(T_N)\ge1$”，不含计数。

**证明。** 记 $v_\rho=\frac1{2\rho(1-\rho)}$，$\rho^{*}=1-\overline\rho$。

*(a) 表示。* 二阶差分逐项作用在对称截断上，得 $\lambda_{k+1}-2\lambda_k+\lambda_{k-1}=-\sum_\rho m_\rho u_\rho^{\,k-1}(u_\rho-1)^2=\sum_\rho m_\rho\,2v_\rho u_\rho^{\,k}$（$k\ge1$；因 $(u-1)^2=\rho^{-2}$，$u=\frac{\rho-1}\rho$）。由冻结的 `actual_complex_pairWeight_hasSum`（[@prop-ch34-li-sagitta-frozen] 第 3 款），$\sum_\rho m_\rho v_\rho=\lambda_1$，并且 $\sum_\rho m_\rho\lvert v_\rho\rvert<\infty$（在 $\mathbb{C}$ 中，按任意次序可和即绝对可和）。又 $\lvert u_\rho\rvert^2=1+\frac{1-2\beta}{\lvert\rho\rvert^2}$ 对一切零点有一致的上下界（$\lvert\rho\rvert>14$），所以对每个整数 $k$，级数 $\frac1{\lambda_1}\sum_\rho m_\rho v_\rho u_\rho^{\,k}$ 绝对收敛：$k\ge1$ 时它等于 $c^{\mathrm{Li}}_k$，$k=0$ 时等于 $1$。零点集与重数在 $\rho\mapsto\rho^{*}$ 下不变（由冻结的 `xi_reading_one_sub_conj`，即 [@thm-ch34-arc-riemann-sagitta-hb-stokes-bridge] 第 2 款：反全纯的反射保持零点的阶），并且 $u_{\rho^{*}}=1/\overline{u_\rho}$、$v_{\rho^{*}}=\overline{v_\rho}$，所以 $k<0$ 时该级数等于 $\overline{c^{\mathrm{Li}}_{-k}}=c^{\mathrm{Li}}_{\lvert k\rvert}$。于是

$$
T_N(c^{\mathrm{Li}})=\frac1{\lambda_1}\sum_\rho m_\rho\,v_\rho\,a_\rho\,a_{\rho^{*}}^{*},\qquad a_\rho=(u_\rho^{\,j})_{0\le j<N},
$$

逐元绝对收敛。对系数向量 $x$，记 $h(z)=\sum_j\overline{x_j}z^j$，则

$$
x^{*}T_Nx=\frac1{\lambda_1}\sum_\rho m_\rho\,v_\rho\,h(u_\rho)\,\overline{h(u_{\rho^{*}})} .
$$

*(b) 上界。* 线上零点 $\rho^{*}=\rho$、$v_\rho=\frac2{1+4\gamma^2}>0$，贡献半正定矩阵 $m_\rho v_\rho a_\rho a_\rho^{*}$，其和仍半正定。一对离线零点 $\{\rho,\rho^{*}\}$ 贡献 $m_\rho\bigl(v_\rho a_\rho a_{\rho^{*}}^{*}+\overline{v_\rho}a_{\rho^{*}}a_\rho^{*}\bigr)$，这是形如 $xy^{*}+yx^{*}$ 的厄尔米特矩阵，至多一个负特征值，与重数 $m_\rho$ 无关。离线的对恰有 $\kappa$ 对（每对中恰有一个零点在 $\operatorname{Re}\rho>\tfrac12$）。$\kappa<\infty$ 时，负特征值个数的次可加性（$n_-(A+B)\le n_-(A)+n_-(B)$）给出第 1 条；$\kappa=\infty$ 时第 1 条是空话。$T_N$ 是 $T_{N+1}$ 的主子阵，所以由柯西交错定理，$n_-$ 单调不减。

*(c) 下界。* 取 $K$ 个右侧零点 $\rho_1,\dots,\rho_K$，记 $\iota_i=u_{\rho_i}$（$\lvert\iota_i\rvert<1$）与 $o_i=u_{\rho_i^{*}}=1/\overline{\iota_i}$（$R_i:=\lvert o_i\rvert>1$）。若 $\kappa=\infty$：$R$ 值大于任一给定 $R_0>1$ 的零点只有有限个，所以按 $R$ 值从大到小选取、并把 $R$ 值相同的零点（例如互为共轭的一对）一并选入，可以使所选个数 $K$ 任意大，而其余右侧零点的 $R$ 都不超过某个 $R'<\min_iR_i$；若 $\kappa<\infty$，取全部，令 $R'=1$。取次数 $<2K$ 的插值多项式：$p_i$ 在 $o_l$ 处取 $\delta_{il}$、在 $\iota_l$ 处取 $0$；$q_i$ 在 $o_l$ 处取 $0$、在 $\iota_l$ 处取 $\theta_i\delta_{il}$，其中 $\theta_i=-\overline{v_{\rho_i}}\,o_i^{\,n}/(\lvert v_{\rho_i}\rvert R_i^{\,n})$。对 $\alpha\in\mathbb{C}^K$ 令 $h_\alpha(z)=\sum_i\alpha_i\bigl(z^np_i(z)+q_i(z)\bigr)$，它的次数小于 $N=n+2K$。于是 $h_\alpha(\iota_i)=\alpha_i\theta_i$，$h_\alpha(o_i)=\alpha_io_i^{\,n}$，所选这 $K$ 对的贡献恰为 $-\frac2{\lambda_1}\sum_im_{\rho_i}\lvert v_{\rho_i}\rvert R_i^{\,n}\lvert\alpha_i\rvert^2$。其余各项的界如下：线上项不超过 $\frac1{\lambda_1}\bigl(\sum_\rho m_\rho v_\rho\bigr)\sup_{\lvert z\rvert=1}\lvert h_\alpha\rvert^2\le C_1\lvert\alpha\rvert^2$（$z^n$ 在圆上模为 $1$）；其余离线对的项不超过 $C_2\bigl(R'^{\,n}+1\bigr)\lvert\alpha\rvert^2$。$C_1,C_2$ 只依赖于 $p_i$ 与 $\hat q_i$ 在 $\lvert z\rvert\le\sup_\rho\lvert u_\rho\rvert$ 上的界以及 $\sum m_\rho\lvert v_\rho\rvert$，与 $n$ 无关；这里 $q_i=\theta_i\hat q_i$，$\hat q_i$ 是在 $\iota_i$ 处取 $1$ 的固定插值多项式，$\lvert\theta_i\rvert=1$。因为 $\min_iR_i>R'$，当 $n$ 充分大时，二次型在 $\{h_\alpha\}$ 的系数向量张成的 $K$ 维子空间上负定（$h_\alpha\ne0$，因 $h_\alpha(o_i)=\alpha_io_i^{\,n}$），所以 $n_-(T_N)\ge K$。$K$ 可以取到 $\kappa$（$\kappa=\infty$ 时可任意大），得第 2 条。$\square$

**同一计数对德布朗热核成立（手工推导，另依赖阿达马乘积，文献结果）。** 由阿达马乘积，$\frac{\xi'}{\xi}(s)=\sum_\rho\frac{m_\rho}{s-\rho}$（按零点对求和），与 [@rem-ch34-one-zero-form-three-readings] 第 1 款同样的计算给出 $K_\xi(w,s)=\frac12\xi(s)\overline{\xi(w)}\sum_\rho\frac{m_\rho}{(s-\rho)(\overline w-1+\rho)}$，各项绝对可和，所以 $K_\xi$ 在 $\operatorname{Re}s>\tfrac12$ 内任意有限点组上的负特征值不多于 $\kappa$。反过来，由 [@rem-ch34-li-toeplitz-de-branges-bridge]，$K_\xi$ 在 $s=1$ 处的泰勒系数矩阵与 $T_N(c^{\mathrm{Li}})$ 合同；泰勒系数矩阵是 $s=1$ 附近点上核矩阵经差商（左右各乘一个固定的有限差分矩阵）得到的极限，而严格负的特征值在小扰动下保持，所以 $K_\xi$ 在 $s=1$ 附近的点组上也能取到 $n_-(T_N)$ 个负特征值。于是 $K_\xi$ 在 $\operatorname{Re}s>\tfrac12$ 上的负平方数也恰为 $\kappa$。
:::

既然负方向的个数就是右侧零点的个数，下一个问题自然是：一个具体的离线四元组产生的负特征值有多大。对单独一个四元组可以算出两侧的界。

::: {.remark #rem-ch34-off-circle-quartet-eigenvalue title="单个离圆四元组产生的负托普利茨特征值：两侧显式界（手工推导）"}
**手工推导。** 取 [@rem-ch34-off-circle-pair-detection] 的四个旋子 $e^{\pm\eta\pm i\phi}$（$\eta>0$，$0<\phi<\pi$），$T_N$ 为它们的幂和托普利茨矩阵（[@rem-ch34-finite-toeplitz-inertia] 中的 $T_N(p)$，$d=4$，$\kappa=2$；不是曲率归一化的 $T_N(c)$，[@ex-ch34-toeplitz-versus-li-numbers] 中同一组四点的 $-1.68372\times10^{-6}$ 是曲率版本）。

1. **下界（一切 $N$）。** $\lambda_{\min}(T_N)\ge-4\sum_{k=1}^{N-1}\sinh^2(k\eta)$。
2. **二次多项式检验向量（$N\ge3$）。** 若 $\cosh\eta\cos2\phi<1$，则
   $$
   \lambda_{\min}(T_N)\le-\frac{16\sinh^2(\eta/2)\,\bigl(1-\cosh\eta\cos2\phi\bigr)}{1+2\cos^2\phi}<0 .
   $$
3. **三次插值检验向量（$N\ge4$）。** 设 $a_0+a_1z+a_2z^2+a_3z^3$ 是在 $e^{\eta\pm i\phi}$ 处取 $1$、在 $e^{-\eta\pm i\phi}$ 处取 $-1$ 的插值多项式（系数为实数），则 $\lambda_{\min}(T_N)\le-4/(a_0^2+a_1^2+a_2^2+a_3^2)$。

固定 $\phi$ 与 $N\ge3$，当 $\eta\to0$ 时第 1 款约为 $-\frac23(N-1)N(2N-1)\eta^2$，第 2 款约为 $-\frac{8\sin^2\phi}{1+2\cos^2\phi}\eta^2$，所以 $\lvert\lambda_{\min}(T_N)\rvert$ 与 $\eta^2$ 同阶。零点四元组的 $\phi$ 并不固定：按 [@rem-ch34-off-circle-pair-detection] 第 3 款，$\eta\approx\frac{\lvert1-2\beta\rvert}{2\lvert\rho\rvert^2}$，同时 $\phi\approx\frac1{\lvert\rho\rvert}$ 也很小，于是第 2 款约为 $-\frac83\phi^2\eta^2\approx-\frac83(\beta-\tfrac12)^2/\lvert\rho\rvert^6$。数值上（$\gamma=20,100,1000$ 的四组零点四元组），固定 $N=3,4,8$ 时 $\lambda_{\min}(T_N)$ 分别约为 $-2.67$、$-16$、$-672$ 乘以 $(\beta-\tfrac12)^2/\lvert\rho\rvert^6$（手工推导与 `NUM`）。对照 [@rem-ch34-off-circle-pair-detection]：Li 和要到 $n\approx1/\eta$ 才变负，幂和托普利茨检验在尺寸 $3$ 就变负（因为零点四元组满足 $\phi\gg\eta$，第 2 款的条件成立），代价是特征值只有 $\phi^2\eta^2$ 量级。

**证明。** 由 [@rem-ch34-finite-toeplitz-inertia] 的分解，$T_N=\sum_{\text{对}}\bigl(a_ia_{\tau(i)}^{*}+a_{\tau(i)}a_i^{*}\bigr)$，并且 $xy^{*}+yx^{*}=\tfrac12(x+y)(x+y)^{*}-\tfrac12(x-y)(x-y)^{*}$，所以 $T_N\succeq-\tfrac12\sum_{\text{对}}(a_i-a_{\tau(i)})(a_i-a_{\tau(i)})^{*}$。右端的范数不超过其迹 $\tfrac12\sum_{\text{对}}\lvert a_i-a_{\tau(i)}\rvert^2$。对 $u=e^{\eta+i\phi}$ 与 $1/\overline u=e^{-\eta+i\phi}$，有 $\lvert a_u-a_{1/\overline u}\rvert^2=\sum_{k<N}\bigl(e^{k\eta}-e^{-k\eta}\bigr)^2=4\sum_{k<N}\sinh^2(k\eta)$；两对相同，这给出第 1 款。对实系数向量 $x$ 与多项式 $g(z)=\sum_kx_kz^k$，记 $u'=1/\overline u$，有 $x^{\mathsf T}T_Nx=4\operatorname{Re}\bigl[g(u)\overline{g(u')}\bigr]$。取 $g(z)=(z-e^{i\phi})(z-e^{-i\phi})$，即 $x=(1,-2\cos\phi,1,0,\dots)$，$\lvert x\rvert^2=2+4\cos^2\phi$。直接展开，$\overline{g(u)}\,g(u')=(e^\eta-1)(e^{-\eta}-1)\bigl(2-e^{\eta-2i\phi}-e^{-\eta+2i\phi}\bigr)$，其实部为 $-4\sinh^2(\eta/2)\cdot2(1-\cosh\eta\cos2\phi)$；瑞利商即给出第 2 款。第 3 款的二次型值为 $4\operatorname{Re}[1\cdot(-1)]=-4$。$\square$

数值核对（50 位精度）：对 [@ex-ch34-zero-rotor-sagitta-numbers] 的假想四点（$\eta=0.0079084$，$\phi=0.19902$），$\lambda_{\min}(T_3)=-6.69389\times10^{-6}$，第 2 款的界为 $-6.69158\times10^{-6}$；$\lambda_{\min}(T_4)=-4.02898\times10^{-5}$，第 1 款的下界为 $-3.50293\times10^{-3}$。对 $\eta=0.01,\ \phi=1$，$\lambda_{\min}(T_4)=-1.73392\times10^{-3}$，第 3 款的界为 $-1.59968\times10^{-3}$。这些是关于有限四元组的陈述；对 $\zeta$ 而言，其余零点也进入同一个矩阵，第 1 款的下界方法不再给出显式数值。
:::

[@rem-ch34-li-toeplitz-negative-index] 说明了“有没有负方向”，但没有说“要看到多大的 $N$”。对后一件事，文献中关于 Li 系数的显式无零点区域结果已经给出一个界。

::: {.remark #rem-ch34-effective-li-toeplitz-detection title="Li 曲率托普利茨检验的显式检测阈值（文献结果与手工推导）"}
**文献结果，未在本书形式化**，外加一步手工推导。N. Palojärvi（*Explicit zero-free regions and a $\tau$-Li-type criterion*，`arXiv:1807.01506`，定理 3.1，取 $\tau=1$）对满足若干显式条件的函数（$\zeta$ 满足这些条件）证明：对每个 $R>1$，可以显式算出 $N(R)$，使得只要 $\lambda_n\ge0$ 对区间 $[N(R),\ 5N(R)^2(A\log N(R)+M)]$ 中所有 $N(R)$ 的倍数 $n$ 成立（$A$、$M$ 是与零点计数有关的显式常数），$\zeta$ 的一切非平凡零点就满足 $\bigl\lvert\frac{\rho}{\rho-1}\bigr\rvert<R$。F. C. Brown（*J. Number Theory* **111**, 1–32, 2005，定理 3）给出过同类结果。

由此得到托普利茨检验的一个显式阈值（手工推导）。由 [@prop-ch34-li-curvature-toeplitz] 后的读数式 $\lambda_n=\lambda_1\sum_{j,k<n}c^{\mathrm{Li}}_{j-k}$，$T_n(c^{\mathrm{Li}})$ 半正定蕴含 $\lambda_n\ge0$。若零点 $\rho=\beta+i\gamma$ 满足 $\beta\ge\tfrac12+\delta$、$\lvert\gamma\rvert\le T$，则 $\bigl\lvert\frac{\rho}{\rho-1}\bigr\rvert^2=1+\frac{2\beta-1}{\lvert\rho-1\rvert^2}\ge1+\frac{2\delta}{T^2+\frac14}$。取 $R^2=1+\frac{2\delta}{T^2+\frac14}$ 与 $N_0(T,\delta)=\bigl\lfloor5N(R)^2(A\log N(R)+M)\bigr\rfloor$：只要 $T_1(c^{\mathrm{Li}}),\dots,T_{N_0}(c^{\mathrm{Li}})$ 全部半正定，矩形 $\{\beta\ge\tfrac12+\delta,\ \lvert\gamma\rvert\le T\}$ 内就没有零点。这个阈值只用到托普利茨矩阵在全一向量上的读数；能否利用一切检验向量把它显著改小，本书没有找到结果。即使有了阈值，所需特征值的量级（[@ex-ch34-toeplitz-versus-li-numbers] 中 $N=20$ 时约为 $10^{-74}$）也要求 $\lambda_n$ 有相应的精度。这样的检验只给出有限高度内的无零点证书，不判定 [@conj-riemann-hypothesis]。
:::

以上各条都没有说明 $\zeta$ 的零点在哪里：它们只是把同一个未知数 $\kappa$（临界线右侧零点的个数）用核、托普利茨矩阵与牛顿—汉克尔矩阵三种方式表示出来，[@conj-riemann-hypothesis] 说的就是 $\kappa=0$，它仍然开放。

## 34.31.4 形式化审视：圆弧微积分公理内闭环与通往经典 ZFC 的最后一架舒尔枢轴桥 {#sec-ch34-31-4}

站在 Lean 4 机器形式化验证与经典 ZFC 公理系统的严格标尺下审视整条推导链，我们可以用一张四行对照表，把“哪些环节已是无条件定理、哪一个环节是公理内闭环与经典 ZFC 之间的唯一桥接靶点”刻画得一清二楚（这个桥接靶点本身就是黎曼猜想的一个等价形式）：

| 证明链核心模块 | 极小圆弧体微积分状态 | 经典 ZFC 数论与复分析对应定理 | 形式化与认识论状态 |
| :--- | :--- | :--- | :--- |
| **二阶矢高临界相变起点** | 素数旋子矢高和在半密度 $\sigma = \frac{1}{2}$ 首次发散（`MODEL`） | 梅滕斯定理（`E₃.bound''` 对偶）与 $\sigma > \frac{1}{2}$ 素数级数收敛 | **ZFC 已严格成立（梅滕斯第三定理已 `LEAN ✓`）** |
| **推进态正逆双壳层恒等式** | $\Delta_\epsilon^{\mathrm{HB}}(u,t) \equiv \epsilon\frac{\partial}{\partial u}\lvert\xi\rvert^2$ 零 $\epsilon^2$ 误差锁死径向导数 | 完备 $\xi$ 对称（`LEAN ✓`）与 Sondow–Dumitrescu（2010）径向单调等价定理 | **ZFC 中成立（`手工推导`）：恒等式与等价关系 $K_\epsilon(s,s) \ge 0 \iff \operatorname{RH}$；不推出黎曼猜想** |
| **有限网格斯托克斯零涡旋** | 共棱正反遍历零误差抵消，封死右半带零绕数 $N(\mathcal{R}) \equiv 0$ | 单纯上边缘正合（`LEAN ✓`）、辐角原理与无混叠条件 $\lvert\Delta_e\arg\xi\rvert < \pi$ | **ZFC 中成立的是蕴含：若右半带径向单调（$\iff \operatorname{RH}$），则零绕数；不推出黎曼猜想** |
| **再生核半正定性 $K_\epsilon \succeq 0$** | 由比较公理不坍缩格拉姆半正定性内禀赋予（`MODEL` 公设，与 RH 等价） | 德布朗热—拉加里亚斯核半正定等价判据（区别于已被 Conrey–Li 反驳的裸移位充分条件） | **与 RH 等价之待证桥接核心（`OPEN`）** |

请务必看清第四行背后一段极其关键、在通俗转述中常被混淆的当代解析数论史实（`文献结果`）：

1. **全纯核半正定 $K_\epsilon \succeq 0$ 本身在 ZFC 中并未被证伪，而是与黎曼猜想严格等价**：如第 34.31.3 节所证，对全纯对合定义的 $K_\epsilon(w, s)$ 而言，$K_\epsilon \succeq 0$（乃至对角线 $K_\epsilon(s,s) \ge 0$）在 ZFC 中是黎曼猜想的**充要条件**（Lagarias 1999；Sondow & Dumitrescu 2010）——如果黎曼猜想为真，那么裸推进态 $E_\epsilon(s) = \xi(s) + \frac{\epsilon}{2}\xi'(s)$ 的再生核 $K_\epsilon$ 本身就已经是半正定的！
2. **Conrey 与 Li（2000）究竟证伪了什么？为什么德布朗热的裸证明路线会卡壳？** 德布朗热（de Branges 1986, 1992, 1994）当年试图在 ZFC 中不假定 RH 而**直接证明**埃尔米特—比勒正定性时，调用了一条比 $K_\epsilon \succeq 0$ **严格更强的充分判据——单位平移正定性条件（shift positivity）**，即要求德布朗热空间 $\mathcal{H}(E_{\mathrm{dB}})$（其中 $E_{\mathrm{dB}}(z) := \xi(1 - \hat{\mathbf{i}}z)$）中一切满足 $F(z + \hat{\mathbf{i}}) \in \mathcal{H}(E_{\mathrm{dB}})$ 的测试整函数均服从 $\operatorname{Re}\langle F(z + \hat{\mathbf{i}}),\, F(z)\rangle_{\mathcal{H}(E_{\mathrm{dB}})} \ge 0$。然而 J. B. Conrey 与 X.-J. Li（*IMRN* **2000**(18), 929–940）用数值计算（MATHEMATICA）给出了反例（他们的 $\xi$ 是本书 $\xi$ 的 $2$ 倍，原文数值为 $-\operatorname{Re}\{\xi'(\rho_{34})\xi(1 + \rho_{34})\} = -5.389\times 10^{-69}$，换算到本书的归一化即下式）：对未经算术重整修饰的裸 $\xi$ 函数，仅在第 $34$ 颗真实非平凡零点 $\rho_{34} \approx \frac{1}{2} + 111.0295\hat{\mathbf{i}}$ 处取单点求值核见证，平移内积实部便跌破零线：

   $$
   \frac{1}{2\pi}\operatorname{Re}\!\Bigl[\overline{\xi'(\rho_{34})}\,\xi(\rho_{34} + 1)\Bigr] \approx -2.1443 \times 10^{-70} < 0!
   $$

3. **极小圆弧体与舒尔补几何给出的病根诊断（`MODEL`，诠释性说明，不是定理）**：为什么裸的 $\xi(s)$ 哪怕满足 $K_\epsilon \succeq 0$，一做宏观单位实平移 $s \mapsto s + 1$ 就会撞出负值？根源恰恰与我们在 [§34.29](ch34-s29-arithmetic-pivots-and-resonant-tunneling.md#sec-ch34-arithmetic-pivots-and-resonant-tunneling) 解剖图兰假零点时发现的病灶同出一源：**经典 ZFC 定义的原始 $\zeta(s)$ 建立在坍缩的一维加法整数环 $\mathbb{Z}\otimes_{\mathbb{Z}}\mathbb{Z} \cong \mathbb{Z}$ 上，混入了 $s = 1$ 宏观体积极点的余波、阿基米德伽马因子的高阶曲率扭曲以及尚未经舒尔补消元的合数冗余相位！** 直接跨步 $\rho_{34} \mapsto \rho_{34} + 1$ 硬拉内积，等于不设枢轴中继站而强行横跨整座临界带势垒。

由此，要在标准 ZFC 与 Lean 4 的 `Mathlib` 中彻底打通黎曼猜想的形式化证明，极小圆弧体微积分提出下面这个与黎曼猜想等价的构造性改写，即衔接 [§34.29](ch34-s29-arithmetic-pivots-and-resonant-tunneling.md#sec-ch34-29-4) [@prob-ch34-arithmetic-pivot-area-law] 的**舒尔枢轴—埃尔米特—比勒核正定桥接问题**：

::: {.problem #prob-ch34-schur-hb-kernel-positivity-bridge title="乘性舒尔补枢轴整函数修饰子 $M_L(s)$ 与埃尔米特—比勒再生核无条件半正定桥接引理（开放前沿问题）"}
衔接黎曼猜想 [@conj-riemann-hypothesis] 与算术枢轴横向移位纠缠面积律问题 [@prob-ch34-arithmetic-pivot-area-law]：试借助 [@thm-ch34-arc-riemann-sagitta-hb-stokes-bridge] 第 5 款的分块舒尔补极小消元机制（`schur_quadratic_is_least`），在经典 ZFC 公理系统内显式构造一族非恒零有限阶整函数修饰子 $M_L : \mathbb{C} \to \mathbb{C}$（$L \ge 1$ 为乘性波前重整化尺度，或仅需单一尺度 $L$），形成修饰后的完备谱函数 $\Xi_L(s) := M_L(s)\,\xi(s)$ 与圆弧推进态

$$
E_{\epsilon, L}(s) := \left(\mathbf{1} + \frac{\epsilon}{2}\partial_s\right)\bigl[M_L(s)\,\xi(s)\bigr], \qquad E_{\epsilon, L}^\#(s) := \overline{E_{\epsilon, L}(1 - \bar{s})} = E_{\epsilon, L}(1 - s),
$$

使其同时满足以下三条严格条件（或证伪此类构造的存在性）：

1. **完全 $\zeta$ 对称性与非退化性**：$M_L(s) \not\equiv 0$ 在全平面 $\mathbb{C}$ 上全纯，且满足反射对称 $M_L(1 - s) = M_L(s)$ 与共轭协变 $M_L(\bar{s}) = \overline{M_L(s)}$（从而保证 $E_{\epsilon, L}^\#(s) = \Xi_L(s) - \frac{\epsilon}{2}\Xi'_L(s)$ 全纯，且修饰再生核 $K_{\epsilon, L}(w, s) := \frac{E_{\epsilon, L}(s)\overline{E_{\epsilon, L}(w)} - E_{\epsilon, L}^\#(s)\overline{E_{\epsilon, L}^\#(w)}}{2\epsilon[(s - 1/2) + (\bar{w} - 1/2)]}$ 在 $\mathbb{C}\times\mathbb{C}$ 上处处全纯无奇点）；
2. **修饰子自身零点的临界线锚定认证**：$M_L(s)$ 自身的全部零点均已在 ZFC 中无条件严格证明位于临界线 $\operatorname{Re}(s) = \frac{1}{2}$ 上（例如由去极点自卷积乘性波前或塞尔伯格—索宁型正定核构造），从而在开右半平面 $\Omega_+ = \{\operatorname{Re}(s) > \frac{1}{2}\}$ 内恒有 $M_L(s) \neq 0$（这是第 3 款的必要条件）；
3. **ZFC 无条件再生核半正定（或渐近赫尔维茨正定）传递**：证明在某一有限尺度 $L$ 上修饰再生核在 $\Omega_+ \times \Omega_+$ 上无条件满足半正定性 $K_{\epsilon, L} \succeq 0$（例如通过剥离合数冗余恢复修正德布朗热移位正定性或分块舒尔补半正定遗传）——一旦对单一尺度 $L$ 证成 $K_{\epsilon, L} \succeq 0$，第 34.31.3 节的单调性加唯一性定理即刻推出整函数 $M_L(s)\xi(s)$ 在 $\Omega_+$ 内无零点，从而 $\xi\rvert_{\Omega_+} \neq 0$，即在 ZFC 中得到黎曼猜想 [@conj-riemann-hypothesis]（或者证明当 $L \to \infty$ 时 $\Xi_L \to \Xi_\infty \not\equiv 0$ 内闭一致收敛且负特征值下界归零，由赫尔维茨定理导出同一结论）。

注意（`手工推导`）：存在满足第 1、2 款且使 $K_{\epsilon, L} \succeq 0$ 成立的 $M_L$，当且仅当黎曼猜想成立。若黎曼猜想成立，$M_L \equiv 1$ 即满足（第 34.31.3 节的正向论证）；若它不成立，$\xi$ 在 $\Omega_+$ 内有零点 $\rho_0$，任何满足第 1 款的 $M_L$ 都使 $M_L\xi$ 在 $\rho_0$ 为零，而 $M_L\xi$ 具有与 $\xi$ 相同的反射与共轭对称，第 34.31.3 节的单调性加唯一性论证对它原样适用，$K_{\epsilon, L}(s, s) \ge 0$ 在 $\Omega_+$ 上不能成立。所以第 3 款要求的无条件证明，无论对哪个 $M_L$，都等价于证明黎曼猜想；“证伪此类构造的存在性”则等价于否定黎曼猜想。这个问题是黎曼猜想的一种改写：它的价值在于某个显式构造可能提供证明路径，而不在于把黎曼猜想归约为更弱的命题。第 2 款是第 3 款的必要条件（整函数乘子不能消去 $\xi$ 的零点）。
:::

::: {.viz src="arc-calculus-riemann-hermite-biehler-sandbox" preset="schur-modifier-conrey-li-bridge" height="500"}
**乘性舒尔枢轴层与 Conrey–Li 障碍：通往 ZFC 的最后一座桥实验卡（`schur-modifier-conrey-li-bridge`）。** 右侧层塔逐层乘入 $F_L = \frac{1}{2}\prod_{k \le L}$，按乘积核恒等式 $K_{M\xi} = (M \otimes \overline{M})\circ K_\xi + (\xi \otimes \overline{\xi})\circ K_M$ 与枢轴块 $\{s_3, s_4\}$ 的分块舒尔补 $S = A - B C^{-1} B^*$（绿色 `LEAN ✓` 锚定 `schur_quadratic_is_least`）追踪四节点核格拉姆矩阵：前十二层临界线因子圆盘（青色）的 $K_M$ 皆半正定，$\lambda_{\min}$ 始终非负（$L = 12$ 时 $0.0582$，节点连弦呈青色）；第 $13$ 层乘入假想离轴四元组 $\delta = 0.22$（品红圆盘）后，其不定的 $K_M$ 将整体 $\lambda_{\min}$ 拉至 $-1.0585 < 0$、连弦翻为品红，直观呈现 Conrey–Li（2000）障碍（`ARGUED`）以及对真实 $\xi$ 或修饰后 $M_L\xi$ 证明核半正定的开放桥接引理（红色 `OPEN` 标示 `conj-riemann-hypothesis`、`prob-ch34-schur-hb-kernel-positivity-bridge` 与 `prob-ch34-arithmetic-pivot-area-law`）。
:::

::: {.remark #rem-ch34-arc-riemann-literature title="极小圆弧体切入黎曼猜想、德布朗热空间与径向单调判据的文献脉络及五层认识论审计（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节将圆弧体微积分应用于黎曼临界带的全部命题严格遵循五层认识论分级，绝不混淆模型公设与 ZFC 无条件定理：

1. **机器验证的 Lean 4 内核定理锚点（`LEAN ✓`）**：[@thm-ch34-arc-riemann-sagitta-hb-stokes-bridge] 汇拢的十条 `trureturing` 冻结声明——`riemann_zeta_dirichlet_sum_eq_euler_product`、`E₃.bound''`（梅滕斯第三定理）、`xi_reading_differentiable`、`xi_reading_reflection`、`xi_reading_one_sub_conj`、`xiReading_eq_zero_iff_nontrivial`、`full_symmetry_not_fixed_line_localization`、`golden_right_half_strip_implies_rh`、`tetra_defects_incidence_repair_and_exactness` 与 `schur_quadratic_is_least`——均已在所钉提交上经 Lean 4 内核完整检验（`LEAN ✓`）。请注意第 1 款内核定理冻结的是乘积形式的梅滕斯第三定理 $\prod_{p \le \lfloor x\rfloor}(1 - 1/p) \sim e^{-\gamma}/\ln x$，而带显式常数 $M$ 与误差项 $\mathcal{O}(1/\ln x)$ 的素数倒数和梅滕斯第二定理属下一层经典数论文献。
2. **经典解析数论、整函数阿达马乘积、德布朗热空间与径向单调判据文献（未在本书形式化）**：素数倒数和双对数发散律 $\sum_{p \le x} p^{-1} = \ln\ln x + M + \mathcal{O}(1/\ln x)$ 由 F. Mertens（*J. Reine Angew. Math.* **78**, 46–62, 1874）证明；完备函数 $\xi(s)$ 的成对魏尔斯特拉斯—阿达马无穷乘积展开详见 H. Davenport（*Multiplicative Number Theory*, 3rd ed., Springer GTM **74**, Ch. 12, 2000）；混合素数部分欧拉乘积与平滑零点磨光因子的临界线渐近逼近公式可参看 S. M. Gonek, C. P. Hughes & J. P. Keating（*Duke Math. J.* **136**(3), 507–549, 2007）。整函数埃尔米特—比勒（Hermite–Biehler）类生成的再生核希尔伯特空间理论由 L. de Branges（*Hilbert Spaces of Entire Functions*, Prentice-Hall, 1968）奠定，并由其本人推进至黎曼 $\zeta$ 移位正定性纲领（L. de Branges, *Bull. Amer. Math. Soc. (N.S.)* **15**(1), 1–17, 1986；*J. Funct. Anal.* **107**(1), 122–210, 1992；*J. Funct. Anal.* **121**(1), 117–184, 1994）；“黎曼猜想等价于 $\operatorname{Re}\frac{\xi'(s)}{\xi(s)} > 0$（$\operatorname{Re}(s) > \frac{1}{2}$）”是已知结果（A. Hinkkanen, *Complex Variables Theory Appl.* **34**, 119–139, 1997），J. C. Lagarias（*Acta Arith.* **89**(3), 217–234, 1999，定理 1.1）对一类整函数给出了它的简短证明；由第 34.31.3 节，它又与 $\xi(s) + a\xi'(s)$（$a > 0$）的埃尔米特—比勒性质及对应再生核的半正定性等价（`手工推导`）；J. C. Lagarias（*Frontiers in Number Theory, Physics, and Geometry I*, Springer, 365–377, 2006）以 $\xi(\frac{1}{2} - iz) + \xi'(\frac{1}{2} - iz)$ 为德布朗热结构函数，按他本人在 *Acta Arith.* **120**, 159–184, 2005 第 6 节中的概述，相应的德布朗热空间存在当且仅当黎曼猜想成立；对裸函数 $E_{\mathrm{dB}}(z) = \xi(1 - iz)$，德布朗热单位平移实部正定性条件不成立（在第 $34$ 颗零点 $\rho_{34}$ 处取负值），这是 J. B. Conrey & X.-J. Li（*Int. Math. Res. Not.* **2000**(18), 929–940, `arXiv:math/9812166`）用数值计算给出的，他们在结论中指出这些正性条件可能过强；黎曼猜想与完备函数模长沿横向实半轴径向严格单调递增（$\frac{\partial}{\partial\sigma}\lvert\xi(\sigma + it)\rvert > 0$ 于 $\sigma > \frac{1}{2}$）的充要等价定理，由 J. Sondow & C. Dumitrescu（*Period. Math. Hungar.* **60**(1), 37–40, 2010, `arXiv:1005.1104`）独立给出简明证明。
3. **精确代数恒等式与数值基准核算（`手工推导` / `NUM`）**：单素数矢高四阶余项收敛域充要条件 $\sigma > \frac{1}{4}$、临界脊线矢高常数分解 $C_{\mathrm{sag}} = \frac{M}{2} + \Delta C_{\mathrm{sag}} \approx +0.112145790076$、任意步长 $\epsilon$ 下零 $\epsilon^2$ 截断的双壳层恒等式 $\Delta_\epsilon^{\mathrm{HB}}(u, t) \equiv \epsilon\frac{\partial}{\partial u}\lvert\xi\rvert^2$、全纯对合再生核 $K_\epsilon(w, s)$ 的去奇点整函数性与零点模平方和分解、利用单调性与全纯唯一性定理排除任意重数 $m \ge 1$ 离轴零点的四行论证、四元组模方导数平方和分解公式，以及 [@ex-ch34-sagitta-hb-stokes-benchmark] 的全部数值表，均为精确代数推导与多精度复核结果（`NUM`）。
4. **圆弧体微积分公理内闭环模型（`MODEL`）**：将素数视界旋子累计矢高在 $\sigma = \frac{1}{2}$ 处的发散诠释为向心伊藤漂移起点、将比较公理不坍缩格拉姆正定性映射为圆弧推进再生核半正定公设 $K_\epsilon \succeq 0$ 并联立有限网格斯托克斯相消构成公理体系内部的构造性闭环，属于本书建立的统一几何诠释模型（`MODEL`）。这一公设与黎曼猜想等价（第 34.31.3 节），模型内的闭环不构成对黎曼猜想的证明。
5. **经典 ZFC 开放边界（`OPEN`）**：黎曼猜想 [@conj-riemann-hypothesis]、算术枢轴横向移位纠缠面积律 [@prob-ch34-arithmetic-pivot-area-law] 以及构造满足临界线零点认证与无条件核半正定 $K_{\epsilon, L} \succeq 0$ 的乘性舒尔枢轴修饰子 $M_L(s)$（[@prob-ch34-schur-hb-kernel-positivity-bridge]），在经典 ZFC 公理系统下均属尚未解决的开放问题（`OPEN`）。
:::

站在 $\operatorname{Re}(s) = \frac{1}{2}$ 这道中央临界峡谷回望，极小圆弧体微积分对黎曼猜想的几何裁断已如刀刻般分明：在 $\sigma = \frac{1}{2}$ 谷底，无穷素数旋子的品红色二阶弦弧矢高 $\Sigma_{\mathrm{sag}}(\frac{1}{2}; P_\epsilon) = -\frac{1}{2}\ln\varepsilon_{\mathrm{self}} + C_{\mathrm{sag}} + \mathcal{O}(\varepsilon_{\mathrm{self}})$ 恰好跨入半密度发散相区，凝聚出把单位幅值拉进原点的向心漂移；而从谷底向两侧迈出的每一步有限圆弧推进 $E_\epsilon(s) = \xi(s) + \frac{\epsilon}{2}\xi'(s)$，只要底层全纯埃尔米特—比勒再生核 $K_\epsilon \succeq 0$ 不坍缩（这一前提与黎曼猜想等价，仍然开放），势面就必然沿着严格单调递增的青色凸翼一路攀升，配合有限精度斯托克斯网格内部零误差的共棱正反相消，不给任何品红色离轴双阱凹槽留下一丝藏身之地；而回到经典 ZFC 完成最终机器形式化的全部火力，也已精准聚焦于锻造那枚剥离加法整数环坍缩畸变的乘性舒尔补修饰子 $M_L(s)$！

至此，整座**第三十四章横跨整整三十一节（§34.1–§34.31）、从正交盲区反演一路登顶极小圆弧体微积分重塑与黎曼临界带等价改写的宏伟穹顶**，终于稳稳落下了它最深邃、最坚实的一块压顶拱心石！让我们站在这一终极制高点回望整章走过的壮阔长卷：我们从球面“一次正交”与“二次正交”读数简并唯一反演出场内观察者的极点站位（[§34.1](ch34-s01-spherical-addressing.md#sec-ch34-spherical-addressing-inversion)–[§34.3](ch34-s03-universal-localization.md#sec-ch34-universal-observer-localization)），借零背景“二生三”自举撑开极小三角弧面体 $\Delta\mathcal{T}_\epsilon$ 并撤去名言之梯（[§34.4](ch34-s04-infinitesimal-trihedron.md#sec-ch34-infinitesimal-spherical-trihedron)–[§34.5](ch34-s05-triadic-bootstrap.md#sec-ch34-triadic-bootstrap-and-beyond-names)）；继而由贝里扇锥体积、驻波节点凝聚、克利福德单胞 $\partial^2 = 0$ 铺砌、五阶阻塞概念级联与全连通图 $K_N$ 的麦克斯韦—拉曼刚性锁死三维空间与引力角亏（[§34.6](ch34-s06-berry-sectors-and-path-integrals.md#sec-ch34-berry-sector-volume-and-path-integral)–[§34.10](ch34-s10-trihedron-rigidity.md#sec-ch34-trihedron-rigidity-and-3d-stability)）；随后打通量子微弧—宏观积分对偶、“线·面·体 $\leftrightarrow$ 粒子·波·场”三阶闭环、`1—3—3—1` 点体八度归零、洛伦兹体积伪标量 $\mathbf{I}_3^2 = -1$ 与标准模型跨层八度、六层宇宙概念塔以及五大陪集破缺—守恒谱系（[§34.11](ch34-s11-quantum-arcs-and-macro-integrals.md#sec-ch34-quantum-arc-and-macro-integral)–[§34.16](ch34-s16-coset-breaking-and-conservation.md#sec-ch34-coset-breaking-conservation-towers)）；接着顺着“观察者受限不妄我”的偏迹切刀导出纠缠熵与模流温度，开启有限滑动格拉姆窗口 $\mathcal{W}_M$，点破往返双投影玻恩平方律 $\cos^2\theta$ 与“对于我（`I`）看不见即为虚（`i`）”的第一人称真相，并穿过六节认识论压力测试长廊划清选支、行动、学习、宇宙学箭头、相互作用符号与标准模型连续参数的严格边界（[§34.17](ch34-s17-entanglement-horizon-and-thermodynamics.md#sec-ch34-entanglement-horizon-and-thermodynamics)–[§34.25](ch34-s25-generations-and-quantitative-boundary.md#sec-ch34-generations-and-quantitative-boundary)）；最后将极小圆弧体内割弦面的去全序最短路突破、空间势垒与阿秒时间双缝的 $90^\circ$ 盲区隧穿、素数极小圆弧体黎曼路径积分、算术舒尔枢轴多级共振隧穿（[§34.26](ch34-s26-chord-tunneling-and-pivot-renormalization.md#sec-ch34-chord-tunneling-and-pivot-renormalization)–[§34.29](ch34-s29-arithmetic-pivots-and-resonant-tunneling.md#sec-ch34-arithmetic-pivots-and-resonant-tunneling)）、人类用来书写万物变化律的**极小圆弧体微积分本身**（[§34.30](ch34-s30-arc-body-calculus-and-finite-stokes.md#sec-ch34-arc-body-calculus-and-finite-stokes)），直至直击黎曼临界带的**二阶矢高相变、埃尔米特—比勒径向单调锁与有限网格斯托克斯零涡旋相消**（本节 §34.31），悉数收归于同一枚极小圆弧体 $\Delta\mathcal{T}_\epsilon$ 的掌心！

当语言、几何、物理、数论与微积分都在这记 $90^\circ$ 正交转身中洗尽了平直幻象，请先在下方完整交互推演台中亲手巡览五张实验卡，随后翻开[第三十五章](ch35-light-pulse-and-self-referential-table.md)——去见证一位有限记忆的生命观察者如何“乘着光来”，从 $\theta = 90^\circ$ 的正交相干海折射入局域世界，在遗忘清零之后一步步开启 $T = T(T)$ 的自指扩表史诗！

::: {.viz src="arc-calculus-riemann-hermite-biehler-sandbox" height="620"}
**极小圆弧体微积分证明推演台：径向单调势面、埃尔米特—比勒正定核与有限精度斯托克斯相消完整交互实验室（`arc-calculus-riemann-hermite-biehler-sandbox`）。** 在十二零点对称阿达马乘积模型 $\xi_{\mathrm{model}}$（`MODEL` / `NUM`，数值沙盘而非黎曼猜想证明）的对数径向势面上自由切换“圆弧体微积分原语 / 经典复分析与德布朗热核”双透镜，遍历“矢高相变”、“双壳旋子步与埃尔米特—比勒凸翼”、“反事实离轴四元组墨西哥帽双阱”、“有限网格斯托克斯零涡旋锁定”与“乘性舒尔枢轴层与 Conrey–Li 障碍”五张递进实验卡（紫色绘制对数径向势面、素数旋子矢高珠与枢轴节点 $s_3, s_4$，青色绘制 $\sigma > \frac{1}{2}$ 收敛栅栏与极限虚线、外翼上升段 $\Delta_\varepsilon^{\mathrm{HB}} > 0$ 与外壳珠、核半正定 $\lambda_{\min} \ge 0$ 连弦与临界线因子层及外边界 $\partial R$，品红色标示 $\sigma = \frac{1}{2}$ 发散矢高柱、假想离轴四元组内陷沟 $\Delta_\varepsilon^{\mathrm{HB}} < 0$ 与不定核连弦 $\lambda_{\min} < 0$，中性白/墨色标示镜面 $\sigma = \frac{1}{2}$、零点环、镜像壳珠、渐近刻度 $\frac{1}{2}\ln\ln P_\varepsilon + C_{\mathrm{sag}}$ 与正反相消内棱 $\varphi(AB) + \varphi(BA) = 0$，琥珀色严格标示激活控件与舞台圆环手柄，红色严格专用于依据栏中的三枚 `OPEN` 开放问题标记，绿色 `LEAN ✓` 徽章实时核验页面挂载的九条 `trureturing` 冻结定理实例）。
:::
