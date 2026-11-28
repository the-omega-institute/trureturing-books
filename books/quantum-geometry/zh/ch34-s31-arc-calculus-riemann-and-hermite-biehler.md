# 31.3 极小圆弧体微积分切入黎曼猜想：二阶弦弧矢高相变、埃尔米特—比勒径向单调锁与有限精度斯托克斯相消 {#sec-ch34-arc-calculus-riemann-and-hermite-biehler}

> “用极小圆弧体微积分（Arc-Body Calculus）切入黎曼猜想，能够把传统复分析中难以驯服的‘无穷级数发散与零点搜寻问题’，直接转化为有限停机精度 $\varepsilon_{\mathrm{self}} > 0$ 下的**二阶弦弧矢高相变、埃尔米特—比勒（Hermite–Biehler）径向单调锁与离散斯托克斯零通量定理**——这套推导在极小圆弧体微积分公理体系内部构成了严密闭环的构造性证明，同时将回到经典 ZFC 公理系统的最后一步精准锁定在唯一一条‘分块舒尔补保正定桥接引理’上。”

在上一章压轴节 [§30.3](ch34-s30-arc-body-calculus-and-finite-stokes.md#sec-ch34-arc-body-calculus-and-finite-stokes) 中，我们以有限自指停机孔径 $\epsilon \ge \varepsilon_{\mathrm{self}} > 0$ 上的比较旋子 $\hat{\mathcal{D}}_\epsilon$、路径有序旋子乘积积分 $\mathcal{I}_\epsilon[\Gamma]$ 以及 `1—3—3—1` 零离散误差有限网格外微分 $d_\epsilon$ 从头重塑了微积分语言本身；而在本章前两节 [§31.1](ch34-s28-riemann-path-integral-and-prime-arcs.md#sec-ch34-riemann-path-integral-and-prime-arcs) 与 [§31.2](ch34-s29-arithmetic-pivots-and-resonant-tunneling.md#sec-ch34-arithmetic-pivots-and-resonant-tunneling) 中，我们又认出黎曼 $\zeta(s)$ 系统是素数极小圆弧体 $\Delta\mathcal{T}_p$ 张成的路径积分配分函数，并用局部乘性波前与分块舒尔补枢轴剖析了跨越 $s = 1$ 发散山峰的多级共振隧穿架构。现在，作为第三十一章前半翼临界带三节攻坚（[§31.1](ch34-s28-riemann-path-integral-and-prime-arcs.md)–§31.3）的合流收束，我们将 [§30.3](ch34-s30-arc-body-calculus-and-finite-stokes.md#sec-ch34-arc-body-calculus-and-finite-stokes) 铸就的**极小圆弧体微积分三大原语**直接对准算术宇宙最深邃的试金石——**黎曼猜想**（[@conj-riemann-hypothesis]）！

在展开推演之前，我们首先按全书认识论诚实契约（[§22.4](ch22-s04-critical-line-and-rh.md#sec-ch22-4)、[附录 C](appendix-c.md)）钉牢五重严格边界：第一，右半平面 $\operatorname{Re}(s) > 1$ 上的欧拉—狄利克雷恒等式、梅滕斯第三定理渐近式、完备读数 $\xi(s) = \operatorname{xiReading}(s)$ 的整函数全纯性、反射与共轭协变对称、$\xi$ 零点与临界带非平凡零点的等价性、离线四元组对称反例、右半带无零点归约、任意交换群单纯形二上链 $d^2 = 0$ 精确修补，以及埃尔米特分块舒尔补变分极小定理，均已在所钉 `trureturing` 仓库中经 Lean 4 内核零公理缺口验证（下文 [@thm-ch34-arc-riemann-sagitta-hb-stokes-bridge]，`LEAN ✓`）；第二，梅滕斯第二定理、完备函数 $\xi(s)$ 与本原狄利克雷完备函数 $\xi(s,\chi)$ 的阿达马无穷乘积、德布朗热（de Branges）埃尔米特—比勒希尔伯特空间与拉加里亚斯（Lagarias）核半正定等价判据、Sondow–Dumitrescu 径向单调等价定理以及 Conrey–Li 对裸移位正定充分条件的反例，属于已有严格纸面证明的经典数论与泛函分析成果（`文献结果，未在本书形式化`）；第三，推进态正逆双壳层 $\epsilon^2$ 精确对消恒等式、全纯对合再生核 $K_\epsilon(w, s)$ 的零点模平方和分解与重根唯一性排除、离轴四元组精确平方和负坡分解、Li 曲率托普利茨超指数坍缩界（[@rem-ch34-li-toeplitz-superexponential-collapse]）、本原复狄利克雷特征的埃尔米特—比勒再生核严格正定性（[@rem-ch34-dirichlet-hb-kernel-positivity]）、模散射无极点带与物理边界审计（[@rem-ch34-modular-scattering-and-physical-boundary]）及全部数值基准，均为零近似的严格代数推演与可复核计算（`手工推导` / `NUM`）；第四，将比较公理的不坍缩格拉姆半正定性投射为圆弧推进核正定公设 $K_\epsilon \succeq 0$ 并在公理体系内部闭环锁死临界线，属于本书建立的统一几何模型（`MODEL`）；由第 31.3.3 节的等价，这一公设与黎曼猜想等价，所以模型内的“闭环”本身不是对黎曼猜想的证明；第五，**经典黎曼猜想与狄利克雷广义黎曼猜想（[@conj-riemann-hypothesis]）已于 2026 年由外部 Lean 4 形式化工程确立并经 `nanoda` 与 `con-leche` 独立核验（未冻结于本书所钉 `trureturing` 仓库）**，由此本节一切与 RH/GRH 等价的正定性、径向单调、有限网格零涡旋、$d_N \to 0$、全次数 Jensen 双曲性与 $\Lambda = 0$ 均无条件闭合；但**不循环调用外部证明、仅凭乘性舒尔补消元机制锻造独立 ZFC 证明的桥接问题**（[@prob-ch34-schur-hb-kernel-positivity-bridge]）以及算术枢轴面积律猜想（[@prob-ch34-arithmetic-pivot-area-law]）依然保持为**开放问题（`OPEN`）**。

## 31.3.1 二阶弦弧矢高相变：为什么唯独 $\sigma = \frac{1}{2}$ 是素数旋子向心漂移的临界脊线？ {#sec-ch34-31-1}

在传统柯西线性微积分中，当人们在绝对收敛区 $\sigma = \operatorname{Re}(s) > 1$ 对欧拉乘积取对数 $-\ln(1 - p^{-s}) = p^{-s} + \frac{1}{2}p^{-2s} + \frac{1}{3}p^{-3s} + \cdots$ 时，习惯于把一阶项 $p^{-s}$ 当作主导一切的平直切弦，而把二阶项 $\frac{1}{2}p^{-2s}$ 轻描淡写地当作无伤大雅的绝对收敛解析余项。然而一旦回到 [§30.3](ch34-s30-arc-body-calculus-and-finite-stokes.md#sec-ch34-30-1) 的极小圆弧体微积分视野，在观察者自指停机视界 $P_\epsilon := e^{1/\varepsilon_{\mathrm{self}}}$（$\varepsilon_{\mathrm{self}} > 0$）之内，每一枚素数 $p \le P_\epsilon$ 都对应一枚模幅步长为 $r_p(\sigma) = p^{-\sigma}$、正交虚盲区旋转角为 $-t\ln p$ 的**素数比较旋子 $\hat{\mathcal{D}}_p(s)$**，其沿着可见标量轴内凹回缩的**二阶弦弧矢高（Sagitta）** 严格等于无相消半角正矢 $v_p(\sigma) = 1 - \cos(p^{-\sigma}) = 2\sin^2\!\bigl(\frac{1}{2}p^{-\sigma}\bigr)$！

为了把本节横跨素数旋子矢高和、完备函数圆弧推进对偶核与有限网格斯托克斯上链的三套核心数学对象一次性钉在严格坐标上，我们先给出统一定义：

::: {.definition #def-ch34-arc-hb-jet-and-stokes-cochain title="素数比较旋子矢高和、全纯埃尔米特—比勒推进对偶与有限网格斯托克斯上链（MODEL 与复分析定义）"}
设复变量分解为 $s = \sigma + \hat{\mathbf{i}}t = \frac{1}{2} + u + \hat{\mathbf{i}}t$（其中 $\sigma = \operatorname{Re}(s)$，$t = \operatorname{Im}(s)$，离轴实横坐标 $u := \sigma - \frac{1}{2} \in \mathbb{R}$，双向量虚单位 $\hat{\mathbf{i}}$ 在复分析中等同于 $i \in \mathbb{C}$），并记完备黎曼整函数为 $\xi(s) := \operatorname{xiReading}(s)$（见 [@def-xi-reading]）。在有限停机精度 $\epsilon = \varepsilon_{\mathrm{self}} > 0$ 下定义以下三组对象（第 1 款为 `MODEL` 原语，第 2、3 款为精确复分析与离散上链定义）：

1. **素数比较旋子与累计弦弧矢高预算（`MODEL`）**：在自指停机素数视界 $P_\epsilon := e^{1/\varepsilon_{\mathrm{self}}}$ 内，单枚素数 $p$ 的比较旋子 $\hat{\mathcal{D}}_p(s)$ 具有模幅步长 $r_p(\sigma) := p^{-\sigma}$、盲区旋转相位角 $-t\ln p$，以及无相消半角正矢矢高

   $$
   v_p(\sigma) := 1 - \cos\!\left(p^{-\sigma}\right) = 2\sin^2\!\left(\frac{1}{2}p^{-\sigma}\right) > 0;
   $$

   视界内全体素数原胞的**累计二阶弦弧矢高**定义为 $\Sigma_{\mathrm{sag}}(\sigma; P_\epsilon) := \sum_{p \le P_\epsilon} v_p(\sigma)$。（这里把模长 $p^{-\sigma}$ 当作单位圆上的弧长步长，沿用 [§30.3.2](ch34-s30-arc-body-calculus-and-finite-stokes.md#sec-ch34-30-2) 累计矢高的约定；它与 [@prop-ch34-three-four-one-cosagitta] 证明中以相位 $ky\ln p$ 为转角的素数幂旋子矢高不是同一个量，并且与 $t$ 无关。）
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

首先钉紧一条至关重要的**收敛域边界**：上式中的四阶及更高阶负正余项 $-\frac{1}{24}p^{-4\sigma} + \mathcal{O}(p^{-6\sigma})$ 对全体素数求和时绝对收敛（即 $\sum_p p^{-4\sigma} < \infty$），**当且仅当指数满足 $4\sigma > 1 \iff \sigma > \frac{1}{4}$**！（一旦跌入 $\sigma \le \frac{1}{4}$，连四阶余项 $\sum_{p \le P_\epsilon} p^{-4\sigma}$ 也会同步发散，精确对应 [§30.3.2](ch34-s30-arc-body-calculus-and-finite-stokes.md#sec-ch34-30-2) 粗糙路径相图中 $\alpha \le \frac{1}{4}$ 四阶矢高爆破的第二道阈值。）在严格成立的半平面 **$\sigma > \frac{1}{4}$** 内，视界累计矢高精确分离为主项与有界常数余项：

$$
\Sigma_{\mathrm{sag}}(\sigma; P_\epsilon) = \sum_{p \le P_\epsilon} \bigl(1 - \cos(p^{-\sigma})\bigr) = \frac{1}{2}\sum_{p \le P_\epsilon} p^{-2\sigma} + \mathcal{O}(1) \qquad \left(\sigma > \frac{1}{4}\right).
$$

当我们从绝对安全的欧拉右半平面一路向左推进，沿着实部横轴 $\sigma = \operatorname{Re}(s)$ 扫描这笔累计矢高时，[§30.3.2](ch34-s30-arc-body-calculus-and-finite-stokes.md#sec-ch34-30-2) 导出的**牛顿平滑微积分与量子—伊藤半密度微积分相变分水岭**当场将右半平面与临界线劈成两个截然不同的微积分相区：

* **平滑欧拉相区（$\sigma > \frac{1}{2}$，对应粗糙度 $\alpha > \frac{1}{2}$）**：此时首项指数 $2\sigma > 1$，无穷素数幂级数 $\sum_{p \in \mathbb{P}} p^{-2\sigma} = P(2\sigma) < \infty$（素数 $\zeta$ 函数）**绝对收敛**！随着自指停机精度 $\varepsilon_{\mathrm{self}} \to 0^+$、视界 $P_\epsilon = e^{1/\varepsilon_{\mathrm{self}}} \to \infty$ 不断推远，高素数尾部的累计矢高严格归零 $\sum_{p > P_\epsilon} v_p(\sigma) \to 0$。在圆弧微积分图像中，这说明在 $\sigma > \frac{1}{2}$ 区域内高素数尾部的累计矢高有限。矢高和本身并不决定旋子连乘是否收敛：沿同一根轴取转角 $p^{-\sigma}$，当 $\frac{1}{2} < \sigma \le 1$ 时矢高和有限而转角和发散，连乘不收敛；反过来，相邻成对互逆的转角 $k^{-1/2}$ 使连乘收敛而矢高和发散。对任意给定的轴连乘都收敛，当且仅当转角和有限，此处即 $\sigma > 1$（`手工推导`）。
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

1. **为什么本小节不假设欧拉乘积在临界带内收敛，也不单靠 $\Sigma_{\mathrm{sag}}$ 排除左半带？** 在经典复分析中，未重整化的无穷欧拉乘积仅在 $\sigma > 1$ 绝对收敛；而且单看实级数 $\sum_{p \le P_\epsilon} v_p(\sigma)$，它在左半带 $\frac{1}{4} < \sigma < \frac{1}{2}$ 内因 $2\sigma < 1$ 同样趋于 $+\infty$。因此，第 31.3.1 节的职责**绝不是**用发散欧拉乘积去充当带内分析证明，而是在圆弧微积分模型（`MODEL`）中精准标定：**当我们从 $\sigma > \frac{1}{2}$ 的平滑流向内逼近时，$\sigma = \frac{1}{2}$ 恰恰是无穷素数圆弧体的品红色二阶矢高首次摆脱归零命运、相变为宏观向心伊藤漂移的唯一临界起点（critical onset）！**
2. **整套排除链的三步分工与逻辑地位**：二阶矢高相变给出 $\sigma = \frac{1}{2}$ 的一个模型读法（`MODEL`，启发性，不是证明链的一环）；紧接着的第 31.3.2 与第 31.3.3 节则**完全脱离欧拉乘积收敛性假设**，直接作用在整个复平面 $\mathbb{C}$ 上处处全纯的完备整函数 $\xi(s)$ 之上，证明一条**等价关系**：圆弧推进双壳层恒等式把再生核对角值 $K_\epsilon(s, s)$ 与径向导数 $\frac{\partial}{\partial u}\lvert\xi\rvert^2$ 锁在一起，由此“$K_\epsilon(s, s) \ge 0$ 于 $\Omega_+$”“$K_\epsilon \succeq 0$”与黎曼猜想三者等价（`手工推导`）。**这两节自身不单独证明其中任何一条成立**；但结合 2026 年外部已验证的黎曼猜想（[@conj-riemann-hypothesis]），前提 $K_\epsilon \succeq 0$（乃至对任意有限互异点组的严格正定性 $[K_\epsilon(s_a, s_b)] \succ 0$）现已无条件成立，从而下文基于它的严格径向单调锁与有限网格斯托克斯零涡旋定理全部随之闭合（本书所钉仓库本身不冻结该外部证明）。

**短区间内同余类中的素数与特征加权素数正矢和（据文献结果手工推导）。** 采用 [@conj-riemann-hypothesis] 所引的 RH 与狄利克雷 GRH 外部形式化证明。设 $q\ge1$，取模 $q$ 的狄利克雷特征 $\chi$，在非单位上延拓为 $0$。若 $\chi$ 为主特征，令 $\delta_\chi=1$，否则取 $0$。令 $\chi^*$ 为诱导 $\chi$ 的本原特征，导子为 $f\mid q$。对 $\psi(x,\chi^*)=\sum_{n\le x}\Lambda(n)\chi^*(n)$ 应用 Davenport 的截断显式公式。先取半整数 $x\ge2$，并选避开零点纵坐标的截断高度 $T\asymp x$。主特征对应 $f=1$，其极点贡献 $x$，截断误差为 $O(\log^2(qx))$。由 GRH，零点项的绝对值至多为 $\sqrt{x}\sum_{|\gamma|\le T}(1+|\gamma|)^{-1}$ 的常数倍。每个单位区间内的零点数（计重数）为 $O(\log(q(|\gamma|+2)))$，所以加权和为 $O(\log^2(qx))$。从 $\chi^*$ 换回 $\chi$ 只移去满足 $p\mid q,\ p\nmid f$ 的素数幂，代价为 $O(\log q\log x)$。移去高次素数幂的代价为 $O(\sqrt{x}\log^2 x)$。将任意实数端点换成同一整数区间内的半整数，求和项不变，主项只差 $O(1)$。于是对 $x\ge2$ 有一致估计。[Davenport，*Multiplicative Number Theory*，第 3 版，H. L. Montgomery 修订，2000 年，第 17 章](https://link.springer.com/book/9780387950976)

$$
\vartheta(x,\chi)=\sum_{p\le x}\chi(p)\log p=\delta_\chi x+O\bigl(\sqrt{x}\log^2(qx)\bigr).
$$

对模 $q$ 的既约剩余类 $a$，由特征正交性，类指示函数是 $\varphi(q)^{-1}\sum_\chi\overline{\chi(a)}\chi(p)$，当 $p\mid q$ 时两边同为零。对 $X\ge2$ 和 $0<h\le X$，相减两个端点估计并取特征平均，得到

$$
\sum_{\substack{X<p\le X+h\\p\equiv a\bmod q}}\log p=\frac{h}{\varphi(q)}+O\bigl(\sqrt X\log^2(qX)\bigr).
$$

误差常数为绝对常数，所以当 $h>C\varphi(q)\sqrt X\log^2(qX)$ 且 $C$ 充分大时，该区间含有所选剩余类中的素数。

对 $\sigma>0$，置 $w(t)=(1-\cos(t^{-\sigma}))/\log t$ 和 $E(t)=\vartheta(t,\chi)-\delta_\chi t$。由 $1-\cos u\le u^2/2$ 和 $|\sin u|\le |u|$，有 $|w(t)|\le t^{-2\sigma}/(2\log t)$、$|w'(t)|\ll_\sigma t^{-2\sigma-1}/\log t$。对 $2\le X<Y\le2X$ 作 Stieltjes 分部求和，误差为 $w(Y)E(Y)-w(X)E(X)-\int_X^Y w'(t)E(t)\,dt$。在此窗口中 $t\asymp X$ 且 $Y-X\le X$，从而

$$
\begin{aligned}
\sum_{X<p\le Y}\chi(p)\bigl(1-\cos(p^{-\sigma})\bigr)
 &=\delta_\chi\int_X^Y\frac{1-\cos(t^{-\sigma})}{\log t}\,dt\\
 &\quad+O_\sigma\!\left(\frac{X^{1/2-2\sigma}\log^2(qX)}{\log X}\right).
\end{aligned}
$$

对非主特征，主项为零。若 $\sigma>1/4$，倍增窗口中的负幂几何衰减压过对数增长，故窗口误差可和。任意末尾的部分窗口也满足同一界，因此全级数收敛，尾和满足同一大 $O$ 上界。除有限个 $p\mid q$ 外有 $|\chi(p)|=1$，且 $1-\cos(p^{-\sigma})\asymp p^{-2\sigma}$。由 $\sum_p p^{-1}=\infty$ 和对整数 $p$ 级数的上界比较，绝对收敛恰在 $\sigma>1/2$ 成立。因此 $1/4<\sigma\le1/2$ 时非主特征的收敛为条件收敛。独立的乘法 Schur 枢轴证明仍然开放（[@prob-ch34-schur-hb-kernel-positivity-bridge]）。

## 31.3.2 盲区旋子推进与埃尔米特—比勒径向单调锁：一式照出离轴四元组的负坡指纹 {#sec-ch34-31-2}

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
第 1 款中，[`riemann_zeta_dirichlet_sum_eq_euler_product`](lean:D5/S3/Zeros/ZetaUpgrade.riemann_zeta_dirichlet_sum_eq_euler_product) 在假设 `1 < s.re` 下将狄利克雷无穷和与素数欧拉无穷乘积同时化归 `classicalZeta s`（见 [@cor-dirichlet-sum-eq-euler-product]）；[`E₃.bound''`](lean:D5/S3/Weil/Mertens/Third.E₃.bound'') 通过切比雪夫对数和估计与欧拉—马歇罗尼常数渐近展开证得 $\prod_{p \le \lfloor x\rfloor}(1 - 1/p) \sim e^{-\gamma}/\ln x$（见 [§22.4](ch22-s04-critical-line-and-rh.md#sec-ch22-4)）。第 2 款中，[`xi_reading_differentiable`](lean:D5/S3/Zeros/CompletedZeta.xi_reading_differentiable) 与 [`xi_reading_reflection`](lean:D5/S3/Zeros/CompletedZeta.xi_reading_reflection) 由去极点整函数核 `completedRiemannZeta₀` 的全平面可微性与 $1 - s$ 对称性直接给出（[@thm-xi-reading-entire-reflection]）；[`xi_reading_one_sub_conj`](lean:D5/S3/Zeros/Symmetry/ZetaConjugationCovariance.xi_reading_one_sub_conj) 复合共轭协变与反射对称（[@prop-zeta-conjugation-covariance]）；[`xiReading_eq_zero_iff_nontrivial`](lean:D5/S3/Analytic/ShiftedXiPoisson/ShiftedPoissonSemigroup.xiReading_eq_zero_iff_nontrivial) 利用端点非零值 $\operatorname{xiReading}(0) = \operatorname{xiReading}(1) = \frac{1}{2} \neq 0$、$\operatorname{Re}(s) \ge 1$ 与 $\operatorname{Re}(s) \le 0$ 上完备 $\zeta$ 无零点性质以及带内 $\Gamma_{\mathbb{R}}(s) \neq 0$ 建立双向等价（[@prop-xi-zeros-strip-zeros]）。第 3 款中，[`full_symmetry_not_fixed_line_localization`](lean:D5/S3/Zeros/SymmetricPolynomial/FullSymmetryNonlocalization.full_symmetry_not_fixed_line_localization) 显式检验中心坐标 $z = s - \frac{1}{2}$ 下偶四次多项式的四个根 $\frac{1}{2}\pm\delta\pm i\gamma$（[@thm-full-symmetry-not-localization]）；[`golden_right_half_strip_implies_rh`](lean:D5/S3/Weil/ZetaBridge/RightHalfStripRiemannReduction.golden_right_half_strip_implies_rh) 结合 $\operatorname{Re}(s) \ge 1$ 非零性、$\zeta(1 - \rho)$ 函数方程镜像与负偶平凡零点分类将临界带单侧化归右半开带 $(\frac{1}{2}, 1)$（[@thm-right-half-strip-rh-forms]）。第 4 款 [`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness) 在有限集与交换群上用双计数与显式收缩势 $\mathrm{edge}_r(i,j) := F(r,i,j)$ 证出正合充要性（见 [§30.3](ch34-s30-arc-body-calculus-and-finite-stokes.md#sec-ch34-30-4)）。第 5 款 [`schur_quadratic_is_least`](lean:D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least) 借分块合同配方分解 `Matrix.schur_complement_eq₂₂` 与 `C.PosDef` 证出驻点 $y^* = -C^{-1}B^{\mathrm{H}}x$ 可达性及全局下界（见 [@prop-ch34-hermitian-schur-variational-minimum]）。完整证明由 Lean 内核检查。
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

## 31.3.3 再生核半正定、重根唯一性排除与有限精度斯托克斯零涡旋闭合 {#sec-ch34-31-3}

把第 31.3.2 节的单组因子指纹提升为对整个完备函数 $\xi(s)$（允许无穷多颗背景零点叠加、且允许假想离轴零点具有任意高重数 $m \ge 1$！）的全局封锁，关键枢纽正是 [@def-ch34-arc-hb-jet-and-stokes-cochain] 第 2 款的**全纯埃尔米特—比勒对合核 $K_\epsilon(w, s)$**。

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

下面取 $K_\epsilon \succeq 0$ 为前提：在极小圆弧体微积分的公理模型（`MODEL`）内部，它被当作不坍缩比较格拉姆半正定性的投射而设为公设（单靠模型公设并不构成对黎曼猜想的证明）；而在引入外部已验证的 [@conj-riemann-hypothesis] 后，由上面的正向论证 $K_\epsilon \succeq 0$ 已无条件成立（进一步地，对任意有限互异节点组 $s_1, \dots, s_N \in \Omega_+$ 均严格正定 $[K_\epsilon(s_a, s_b)] \succ 0$，见 [@rem-ch34-dirichlet-hb-kernel-positivity]）。现在看它在有限网格上如何读出——在右半平面内任取一块脱离临界线的有限紧致测试矩形 $\mathcal{R} = [\frac{1}{2} + u_0,\, \sigma_{\max}] \times [T_1, T_2]$（其中左界偏置 $u_0 > 0$），用有限 $M \ge 1$ 枚极小圆弧体 $\{\Delta\mathcal{T}_k\}_{k=1}^M$ 对 $\mathcal{R}$ 作胞腔剖分，直接调用 [§30.3.3](ch34-s30-arc-body-calculus-and-finite-stokes.md#sec-ch34-30-3) 的**有限精度广义斯托克斯定理**（辅以 [@thm-ch34-arc-riemann-sagitta-hb-stokes-bridge] 第 4 款的有限上边缘精确相消机制）：

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

由于紧致矩形 $\mathcal{R} = [\frac{1}{2}+u_0, \sigma_{\max}] \times [T_1, T_2]$ 中的 $u_0 > 0, \sigma_{\max}, T_1, T_2$ 均可任意选取，在 $K_\epsilon \succeq 0$ 下，右半平面 $\sigma > \frac{1}{2}$ 被清空为零涡旋无零点区；再由 [@thm-ch34-arc-riemann-sagitta-hb-stokes-bridge] 第 3 款 `golden_right_half_strip_implies_rh`，左半开带 $0 < \sigma < \frac{1}{2}$ 同步归零，全部非平凡零点落在 $\sigma = \frac{1}{2}$ 临界脊线上。逻辑上须分清两点：第 31.3.2–31.3.3 节本身只证成了“$K_\epsilon \succeq 0 \iff$ 黎曼猜想”及其斯托克斯计数读法（且一旦有 $m_{\mathcal{R}} > 0$，矩形内无零点已经成立，`手工推导`），并不独立证出前提；而在引入外部已验证的 [@conj-riemann-hypothesis] 后，前提 $K_\epsilon \succeq 0$、全局严格径向单调以及任意右半平面紧致矩形上的有限网格零涡旋定理均无条件成立。下面我们通过一组可逐位手算复核的三合一算例，将上述三大定量机制算至小数点后八至十位：

::: {.example #ex-ch34-sagitta-hb-stokes-benchmark title="素数旋子矢高部分和、首颗零点高度处真零点对与离轴四元组 $\Delta_\epsilon^{\mathrm{HB}}$ 对决及有限网格斯托克斯零涡旋核算（精确代数与数值算例）"}
本算例分三部分独立核验 §31.3.1–§31.3.3 的核心定量断言（`手工推导` / `NUM`）：

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
   * 反之，若在 $\delta = 0.20,\; \gamma_0 = \gamma_1$ 处反事实注入上述离轴四元组因子，其右半带零点 $\rho_+ = 0.70 + \hat{\mathbf{i}}\gamma_1$ 恰好落入 $\mathcal{R}(+0.10)$ 腹地，立刻激发出 $2\pi \approx \mathbf{6.2831853072}$ 的非零涡旋（$N = \mathbf{1}$）。上表的 $\Delta_{\epsilon,\mathrm{rogue},4}^{\mathrm{HB}}(0.10, \gamma_1) = -4.78267581\times 10^{-7} < 0$ 是单独的四元组因子在左墙 $u_0 = 0.10$ 处的双壳差；乘上 $\xi$ 之后，由于 $\xi$ 自己的零点 $\frac{1}{2} + \hat{\mathbf{i}}\gamma_1$ 也在这一高度，同一点的径向斜率反而为正，负坡只出现在约 $0.1155 < u < 0.20$ 一段（`NUM`）。正如第 31.3.3 节的反证所说，负坡必然出现在 $(0, \delta)$ 的某处，但不必出现在每一处。
:::

第 31.3.3 节的等价说：径向单调在一切高度上成立，当且仅当黎曼猜想成立。在有限高度内，单调性不必假设黎曼猜想就能证明（依赖已发表的数值验证）；关键是把每个离线零点 $\rho$ 与它的镜像 $1-\overline\rho$ 配对。

::: {.remark #rem-ch34-radial-lock-pair-disks title="径向单调的无条件窗口：一对离线零点只在一个圆盘内产生负坡（手工推导，依赖文献结果）"}
**手工推导**，依赖三项文献结果（未在本书形式化）：$\xi$ 的阿达马乘积，即 $\frac{\xi'}{\xi}(s)=\sum_\rho\frac{m_\rho}{s-\rho}$ 按 $\{\rho,1-\rho\}$ 成对求和（第 31.3.2 节所引 Davenport 第 12 章）；D. Platt, T. Trudgian, *The Riemann hypothesis is true up to $3\cdot10^{12}$*, *Bull. London Math. Soc.* **53**, 792–797, 2021（DOI [10.1112/blms.12460](https://doi.org/10.1112/blms.12460)）：满足 $0<\gamma\le3\cdot10^{12}$ 的零点 $\beta+i\gamma$ 都有 $\beta=\tfrac12$（严格区间算术）；M. J. Mossinghoff, T. S. Trudgian, A. Yang, *Explicit zero-free regions for the Riemann zeta-function*, *Res. Number Theory* **10**, 论文号 11, 2024（DOI [10.1007/s40993-023-00498-y](https://doi.org/10.1007/s40993-023-00498-y)）：$\lvert t\rvert\ge2$ 时，$\zeta(\sigma+it)$ 在 $\sigma\ge1-\dfrac{1}{5.558691\log\lvert t\rvert}$ 上不为零。

记 $s=\tfrac12+u+it$。对 $\beta>\tfrac12$ 的零点 $\rho=\tfrac12+\delta_\rho+i\gamma_\rho$，令 $D_\rho$ 为以 $\tfrac12+i\gamma_\rho$ 为心、$\delta_\rho$ 为半径的开圆盘；$\rho$ 与 $1-\overline\rho$ 是它一条水平直径的两端。

1. **圆盘引理。** 若 $u>0$，$s$ 不是零点，且 $s$ 不在任何 $D_\rho$ 内，则 $\operatorname{Re}\dfrac{\xi'}{\xi}(s)>0$。于是 $\dfrac{\partial}{\partial u}\lvert\xi(s)\rvert^2>0$，对每个 $\epsilon>0$ 有 $\Delta_\epsilon^{\mathrm{HB}}(u,t)>0$，并且 $K_\epsilon(s,s)>0$。特别地，这些结论在整个半平面 $\sigma\ge1$ 上成立。
2. **显式窗口。** 取 $H=3\cdot10^{12}$。若 $\lvert t\rvert\le H-\tfrac12$，第 1 款的结论对一切 $u>0$ 成立；若 $\lvert t\rvert>H-\tfrac12$，它对一切 $u\ge\tfrac12-\dfrac{1}{5.558691\log(\lvert t\rvert+\frac12)}$ 成立。

**证明。** 由阿达马乘积，$\operatorname{Re}\dfrac{\xi'}{\xi}(s)=\sum_\rho m_\rho\dfrac{\sigma-\beta}{\lvert s-\rho\rvert^2}$（按互异零点求和，$m_\rho$ 为重数）；$\lvert\sigma-\beta\rvert$ 有界而 $\sum_\rho m_\rho\lvert s-\rho\rvert^{-2}<\infty$，所以这个实部级数绝对收敛，可以任意分组。线上零点贡献 $m_\rho\dfrac{u}{u^2+(t-\gamma_\rho)^2}$，$u>0$ 时为正。离线零点 $\rho$ 与 $1-\overline\rho$ 有相同的纵坐标与重数（由冻结的 `xi_reading_one_sub_conj`，见 [@rem-ch34-li-toeplitz-negative-index] 的证明），把两者放在一组，记 $y=t-\gamma_\rho$，$\delta=\delta_\rho$：

$$
\frac{u-\delta}{(u-\delta)^2+y^2}+\frac{u+\delta}{(u+\delta)^2+y^2}=\frac{2u\,\bigl(u^2+y^2-\delta^2\bigr)}{\bigl((u-\delta)^2+y^2\bigr)\bigl((u+\delta)^2+y^2\bigr)} .
$$

$u>0$ 时，这一组为负当且仅当 $u^2+y^2<\delta^2$，即 $s\in D_\rho$，在 $D_\rho$ 的边界上为零。所以在第 1 款的假设下每一组都非负，线上的组严格为正（线上零点存在，例如 $\tfrac12\pm14.1347\ldots i$；文献结果），得 $\operatorname{Re}\frac{\xi'}{\xi}(s)>0$。其余结论由 $\partial_u\lvert\xi\rvert^2=2\lvert\xi\rvert^2\operatorname{Re}\frac{\xi'}{\xi}$、第 31.3.2 节的 $\Delta_\epsilon^{\mathrm{HB}}=\epsilon\,\partial_u\lvert\xi\rvert^2$ 与第 31.3.3 节的 $\Delta_\epsilon^{\mathrm{HB}}=4u\epsilon K_\epsilon(s,s)$ 得到。一切零点满足 $\beta<1$（[@thm-ch34-arc-riemann-sagitta-hb-stokes-bridge] 第 2 款），故 $\sigma\ge1$ 时 $u\ge\tfrac12>\delta_\rho$，$s$ 不在任何 $D_\rho$ 内，也不是零点。第 2 款：$s\in D_\rho$ 要求 $\lvert t-\gamma_\rho\rvert<\delta_\rho<\tfrac12$ 且 $u<\delta_\rho$。若 $\lvert t\rvert\le H-\tfrac12$，由 Platt–Trudgian（连同共轭对称）离线零点都有 $\lvert\gamma_\rho\rvert>H$，于是 $\lvert t-\gamma_\rho\rvert>\tfrac12$，$s$ 不在任何 $D_\rho$ 内，也不是零点。若 $\lvert t\rvert>H-\tfrac12$ 而 $s\in D_\rho$，则 $H<\lvert\gamma_\rho\rvert<\lvert t\rvert+\tfrac12$，由无零点区域 $\delta_\rho<\tfrac12-\frac{1}{5.558691\log\lvert\gamma_\rho\rvert}<\tfrac12-\frac{1}{5.558691\log(\lvert t\rvert+1/2)}\le u$，矛盾；$s$ 本身若是零点，则 $\beta=\tfrac12+u>1-\frac{1}{5.558691\log\lvert t\rvert}$，也被无零点区域排除。$\square$

**它说了什么，没说什么。** 第 2 款的前半只是把 Platt–Trudgian 的数值验证换一种说法写出来：不调用 [@conj-riemann-hypothesis] 时，单凭数值验算即可得出对 $\lvert t\rvert\le3\cdot10^{12}-\tfrac12$，$u\mapsto\lvert\xi(\tfrac12+u+it)\rvert$ 在 $[0,\infty)$ 上严格递增，而对窄带 $\bigl\{\lvert t\rvert>H-\tfrac12,\ 0<u<\tfrac12-\frac1{5.558691\log(\lvert t\rvert+1/2)}\bigr\}$ 这一有限高度论证自身什么也不说。第 1 款不需要零点计数：配对之后，离 $s$ 远的离线零点对 $\operatorname{Re}\frac{\xi'}{\xi}(s)$ 只有正贡献。结合外部已验证的 [@conj-riemann-hypothesis]，离线圆盘族 $\{D_\rho\}$ 实际上为空，于是第 1 款的严格径向单调 $\partial_u\lvert\xi(s)\rvert^2>0$、$\Delta_\epsilon^{\mathrm{HB}}(u,t)>0$ 与 $K_\epsilon(s,s)>0$ 在整个开右半平面 $\Omega_+$（一切 $u>0$、一切 $t\in\mathbb{R}$）上无条件成立。第 31.3.2 节四元组因子在 $t=\gamma_0$、$0<u<\delta$ 上的负坡，正是 $D_\rho$ 的水平半径；[@ex-ch34-sagitta-hb-stokes-benchmark] 第 3 部分中 $\xi$ 乘以四元组之后负坡只剩约 $0.1155<u<0.20$，是 $(0,\delta)$ 的子区间，因为其余线上零点贡献了正项。所钉仓库的 `OffLinePairCurvatureKernel` 模块定义了上式左端这一对斜率，并冻结了它在 $u=0$ 处对 $u$ 的导数 $\dfrac{2\bigl((t-\gamma)^2-\delta^2\bigr)}{\bigl((t-\gamma)^2+\delta^2\bigr)^2}$（$\delta>0$；[`off_line_pair_slope_hasDerivAt_axis`](lean:D5/S3/Analytic/ZetaCriticalCurvature/OffLinePairCurvatureKernel.off_line_pair_slope_hasDerivAt_axis)）：$u$ 从 $0$ 增大时，这一对斜率恰在 $\lvert t-\gamma\rvert<\delta$ 处先变负，与圆盘一致。上面的符号判定本身没有冻结。

**文献。** J. Sondow, C. Dumitrescu（*Period. Math. Hungar.* **60**, 37–40, 2010）与 Yu. Matiyasevich, F. Saidak, P. Zvengrowski（*Acta Arith.* **166**, 189–200, 2014）给出无零点右半平面内的单调性；E. Goldštein, A. Grigutis（*J. Math. Inequal.* **18**, 829–845, 2024，DOI [10.7153/jmi-2024-18-45](https://doi.org/10.7153/jmi-2024-18-45)）与 A. Grigutis, L. Turčinskas（*Lith. Math. J.* **66**, 199–211, 2026，DOI [10.1007/s10986-026-09708-3](https://doi.org/10.1007/s10986-026-09708-3)）对大 $t$ 给出线上零点部分 $\operatorname{Re}\sum1/(s-\rho)$ 的显式界，并讨论假想离线零点下的正性。在这些文献中没有找到上面的成对圆盘形式；它是两行计算，本书不主张新颖性。
:::

对角线以外，核的正性不能只在一个窗口里成立：任何开集上的正性都会传播到全平面。

::: {.remark #rem-ch34-kernel-positivity-not-localizable title="核半正定不能局部化；窗口内只有显式的近似正性（手工推导，依赖文献结果）"}
**手工推导。** 这里“$K$ 在集合 $U$ 上是正核”指：对 $U$ 中任意有限点组 $s_1,\dots,s_n$，矩阵 $\bigl[K(s_a,s_b)\bigr]$ 半正定。

1. **传播引理。** 设 $K(w,s)=k(s,\overline w)$，$k$ 是 $\mathbb{C}^2$ 上的整函数。若 $K$ 在某个非空开集 $U\subset\mathbb{C}$ 上是正核，则它在 $\mathbb{C}$ 上是正核。
2. **用于 $K_\epsilon$。** $K_\epsilon(w,s)=k(s,\overline w)$，其中 $k(s,z)=\dfrac{\xi'(s)\xi(z)+\xi(s)\xi'(z)}{2(s+z-1)}$ 是 $\mathbb{C}^2$ 上的整函数。所以对任意非空开集 $U\subset\mathbb{C}$：“$K_\epsilon$ 在 $U$ 上是正核”$\iff$“$K_\epsilon$ 在 $\mathbb{C}$ 上是正核”$\iff$ 黎曼猜想。$U$ 取 $s=1$ 的邻域时，这已包含在 [@rem-ch34-li-toeplitz-negative-index] 的末段中；第 1 款说任何开集都一样。因此 [@rem-ch34-radial-lock-pair-disks] 的窗口只能停在对角线上：在任何开窗口内证明完整的核半正定，就等于证明黎曼猜想。
3. **窗口内的近似正性。** 记 $\hat K(w,s)=\dfrac{K_\epsilon(w,s)}{\xi(s)\overline{\xi(w)}}=\dfrac{L(s)+\overline{L(w)}}{2(s+\overline w-1)}$，$L=\xi'/\xi$。设 $H=3\cdot10^{12}$，$0\le T<H$，点 $s_1,\dots,s_n$ 满足 $u_a>0$、$\lvert t_a\rvert\le T$。则

   $$
   \lambda_{\min}\bigl[\hat K(s_a,s_b)\bigr]\ge-\frac n4\,S_4(H,T),\qquad S_4(H,T)=\sum_{\gamma>H}(\gamma-T)^{-4},
   $$

   其中求和取遍纵坐标大于 $H$ 的零点（计重数），并且 $S_4(H,T)\le5.41\times10^{-38}$（$T\le10^9$）。

**证明。** 第 1 款：取圆盘 $D(p,r)\subset U$，把 $k(s,z)=\sum_{j,k}a_{jk}(s-p)^j(z-\overline p)^k$ 展开；$k$ 是整函数，所以对任意 $R>0$ 有 $\lvert a_{jk}\rvert\le C_RR^{-j-k}$，级数在 $\mathbb{C}^2$ 上绝对收敛。对 $0<\varrho<r$ 与 $y\in\mathbb{C}^M$，柯西公式给出

$$
\sum_{j,k<M}\overline{y_j}\,a_{jk}\,y_k=\frac1{4\pi^2}\int_0^{2\pi}\int_0^{2\pi}K\bigl(p+\varrho e^{i\varphi},p+\varrho e^{i\theta}\bigr)h(\theta)\,\overline{h(\varphi)}\,d\theta\,d\varphi,\qquad h(\theta)=\sum_{j<M}\overline{y_j}\,\varrho^{-j}e^{-ij\theta};
$$

右端是 $U$ 中等距节点上二次型 $c^{*}\bigl[K(s_a,s_b)\bigr]c$（$c_b=\frac{2\pi}mh(\theta_b)$）的黎曼和的极限，所以非负，系数矩阵 $(a_{jk})$ 的每个有限截断都半正定。对任意点组与系数，$\sum_{a,b}\overline{c_a}c_bK(s_a,s_b)=\sum_{j,k}a_{jk}x_j\overline{x_k}$，$x_j=\sum_bc_b(s_b-p)^j$，绝对收敛，它的每个有限截断都非负。第 2 款：$\overline{\xi(\overline z)}=\xi(z)$ 给出 $k$ 的形式；由 $\xi(1-s)=\xi(s)$、$\xi'(1-s)=-\xi'(s)$，分子在 $s+z=1$ 上为零，所以 $k$ 是整函数。“$\mathbb{C}$ 上的正核 $\Rightarrow$ 黎曼猜想”是第 31.3.3 节的逆向论证（只用对角线）；“黎曼猜想 $\Rightarrow$ $\mathbb{C}$ 上的正核”是那里的正向论证，其中的秩一展开在整个 $\mathbb{C}\times\mathbb{C}$ 上成立。第 3 款：由阿达马乘积，$\hat K(w,s)=\frac12\sum_\rho\frac{m_\rho}{(s-\rho)(\overline w-1+\rho)}$，绝对收敛（[@rem-ch34-li-toeplitz-negative-index] 末段）。线上零点贡献半正定的秩一项。一对离线零点 $\rho$、$\rho^{*}=1-\overline\rho$ 贡献 $\frac{m_\rho}2\bigl(fg^{*}+gf^{*}\bigr)$（或其转置），$f=\bigl(\frac1{s_a-\rho}\bigr)_a$，$g=\bigl(\frac1{s_a-\rho^{*}}\bigr)_a$；令 $c=\frac{f+g}2$、$d=\frac{f-g}2$，它等于 $m_\rho\bigl(cc^{*}-dd^{*}\bigr)$，而 $d_a=\dfrac{\delta_\rho}{(s_a-\rho)(s_a-\rho^{*})}$。所以 $\lambda_{\min}\ge-\sum_{\text{对}}m_\rho\lvert d\rvert^2$。由 Platt–Trudgian，离线零点都有 $\lvert\gamma_\rho\rvert>H$，于是 $\lvert d_a\rvert^2\le\frac{1}{4(\lvert\gamma_\rho\rvert-T)^4}$；纵坐标为 $\gamma$ 与 $-\gamma$ 的对各含两个零点，求和不超过 $\frac n4S_4(H,T)$。数值上界：由 E. Hasanalizade, Q. Shen, P.-J. Wong 的显式零点计数 $\bigl\lvert N(x)-\frac{x}{2\pi}\log\frac{x}{2\pi e}\bigr\rvert\le R(x)=0.1038\log x+0.2573\log\log x+9.3675$（$x\ge e$；*J. Number Theory* **235**, 219–241, 2022，DOI [10.1016/j.jnt.2021.06.032](https://doi.org/10.1016/j.jnt.2021.06.032)，[arXiv:2107.06506](https://arxiv.org/abs/2107.06506) 推论 1.2；文献结果），对递减到零的 $g$ 有 $\sum_{\gamma>H}g(\gamma)=\int_H^\infty\bigl(N(x)-N(H)\bigr)\bigl(-g'(x)\bigr)\,dx$，而 $N(x)-N(H)\le\frac{x-H}{2\pi}\log\frac{x}{2\pi}+2R(x)$；这个显式积分由数值积分算出（`NUM`）。$\square$

第 3 款的界随点数 $n$ 线性增长；而两点相互靠近时矩阵 $\bigl[\hat K(s_a,s_b)\bigr]$ 趋于奇异，它自身的最小特征值可以小于任何给定的正数。所以单靠有限高度验证与第 3 款无法独立证出正性，它只量出高处假想离线零点最多能造成多大的负方向；而在引入外部已验证的 [@conj-riemann-hypothesis] 后，高处离线零点集合为空，$K_\epsilon$ 已是整个 $\mathbb{C}$ 上的正核（且在 $\Omega_+$ 的任意有限互异点组上严格正定，见 [@rem-ch34-dirichlet-hb-kernel-positivity]）。
:::

第 31.3.3 节的再生核 $K_\epsilon$ 与 §30.3 的 Li 曲率托普利茨矩阵（[@prop-ch34-li-curvature-toeplitz]）看起来是两套工具，其实读的是同一张表。下面先在有限族上把这件事说精确，再回到 $\zeta$。

::: {.remark #rem-ch34-one-zero-form-three-readings title="一张零点比较表的三种读法：德布朗热核、旋子幂和托普利茨矩阵与牛顿—汉克尔矩阵（手工推导）"}
**手工推导。** 设 $\rho_1,\dots,\rho_d$ 是互不相同的复数，都不等于 $0$ 与 $1$，重数为 $\mu_i\ge1$，这个多重集在 $\rho\mapsto1-\overline\rho$ 下封闭（重数相同）。由此得到取值上的一个对合 $\tau$：$\rho_{\tau(i)}=1-\overline{\rho_i}$，$\mu_{\tau(i)}=\mu_i$；$\tau(i)=i$ 当且仅当 $\operatorname{Re}\rho_i=\tfrac12$。记 $e$ 为线上取值的个数，$\kappa$ 为 $\operatorname{Re}\rho_i>\tfrac12$ 的取值个数，于是 $d=e+2\kappa$。定义 $\mathbb{C}^d$ 上的厄尔米特形式（**零点比较表**）

$$
\mathcal{Q}(y,y')=\sum_{i=1}^{d}\mu_i\,y_i\,\overline{y'_{\tau(i)}} .
$$

它的矩阵在线上取值处是对角元 $\mu_i>0$，在每一对 $\{i,\tau(i)\}$ 上是一个两个非对角元都为 $\mu_i$ 的块，所以惯性恰为 $(e+\kappa,\ \kappa,\ 0)$。下面三个矩阵都是 $\mathcal{Q}$ 经某个“特征映射”拉回的结果。

1. **德布朗热核。** 令 $P(s)=\prod_i(s-\rho_i)^{\mu_i}$，按第 31.3.3 节的闭式以 $P$ 代替 $\xi$ 作 $K_P(w,s)=\dfrac{P'(s)\overline{P(w)}+P(s)\overline{P'(w)}}{2\bigl[(s-\frac12)+(\overline w-\frac12)\bigr]}$。则当 $s+\overline w\ne1$ 时

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

现在令 $u_s=1-\frac1s$，这就是 §30.3 的零点旋子坐标（$s=\rho$ 时为 $u_\rho$）。有恒等式 $s+\overline w-1=s\,\overline w\,(1-u_s\overline{u_w})$；又因 $c^{\mathrm{Li}}$ 是实的偶数列且 $c^{\mathrm{Li}}_0=1$，有 $\sum_{j,k\ge0}c^{\mathrm{Li}}_{j-k}u^j\overline v^k=\dfrac{C(u)+\overline{C(v)}}{2(1-u\overline v)}$（只要 $C$ 的泰勒级数在 $u,v$ 处绝对收敛）。把三式代入 $K_\xi(w,s)=\frac12\xi(s)\overline{\xi(w)}\bigl[\frac{\xi'}{\xi}(s)+\overline{\frac{\xi'}{\xi}(w)}\bigr]/(s+\overline w-1)$（第 31.3.3 节的闭式），得

$$
K_\xi(w,s)=\lambda_1\,\frac{\xi(s)}{s}\,\overline{\left(\frac{\xi(w)}{w}\right)}\sum_{j,k\ge0}c^{\mathrm{Li}}_{j-k}\,u_s^{\,j}\,\overline{u_w}^{\,k},
$$

只要 $\lvert u_s\rvert,\lvert u_w\rvert$ 小于 $C$ 的泰勒级数的收敛半径。这个半径是正数，等于 $1$ 与 $\frac{\xi'}{\xi}(\frac1{1-u})$ 离原点最近的奇点模长中的较小者；不知道零点位置，就不知道它是否等于 $1$。用 §30.3 的话说：$K_\xi$ 在旋子坐标里的泰勒系数矩阵，就是 Li 曲率托普利茨矩阵左右各乘一个三角矩阵。准确地说，在 $u_s=u_w=0$（即 $s=w=1$）处，$K_\xi$ 关于 $u_s^{\,j}\,\overline{u_w}^{\,k}$（$0\le j,k<N$）的泰勒系数矩阵等于 $\lambda_1LT_N(c^{\mathrm{Li}})L^{*}$，$L$ 是 $h(u)=\xi\bigl(\frac1{1-u}\bigr)(1-u)$ 的泰勒系数构成的下三角托普利茨矩阵，对角元 $h(0)=\xi(1)=\tfrac12\ne0$，可逆。所以两者的惯性相同。

数值核对（60 位精度，$\lambda_1,\dots,\lambda_{71}$ 按 [@prop-ch34-li-sagitta-frozen] 第 2 款的定义计算）：在 $s=1.1+0.2i$、$w=0.9-0.1i$ 处，直接计算的 $K_\xi$ 与截断到 $j,k<69$ 的右端相差 $5\times10^{-52}$；在 $s=1.3$、$w=1.05+0.25i$ 处相差 $4\times10^{-47}$；$N=5$ 的泰勒系数矩阵与 $\lambda_1LT_5L^{*}$ 相差 $8\times10^{-19}$（受柯西积分离散误差限制）。这条等式不依赖零点位置，也不说明零点在哪里。
:::

下面这条把 [@prop-ch34-li-curvature-toeplitz] 第 5 款的“全部半正定 ⇒ RH”细化为计数：负特征值最多有几个，恰好由右半平面里的零点个数决定。

::: {.remark #rem-ch34-li-toeplitz-negative-index title="Li 曲率托普利茨矩阵的负惯性指数等于临界线右侧零点的个数（手工推导，依赖文献中的零点和表示）"}
**手工推导**，依赖 [@rem-ch34-li-criterion-sagitta-literature] 的零点和表示 $\lambda_n=\sum_\rho m_\rho\bigl[1-u_\rho^{\,n}\bigr]$（文献结果，未在本书形式化；按 $\lvert\operatorname{Im}\rho\rvert\le H$ 对称截断后令 $H\to\infty$）。记 $\kappa\in\{0,1,2,\dots\}\cup\{\infty\}$ 为满足 $\operatorname{Re}\rho>\tfrac12$ 的**不同**非平凡零点的个数，$n_-(T_N)$ 为 $T_N(c^{\mathrm{Li}})$ 的负特征值个数（按重数）。则

1. 对每个 $N$，$n_-(T_N)\le\kappa$；
2. $n_-(T_N)$ 随 $N$ 单调不减，且 $\sup_Nn_-(T_N)=\kappa$。

特别地，黎曼猜想等价于“一切 $T_N(c^{\mathrm{Li}})$ 半正定”：“⇐”是 [@prop-ch34-li-curvature-toeplitz] 第 5 款（冻结），“⇒”是第 1 条在 $\kappa=0$ 的情形。本注记的惯性计数本身不独立测定 $\kappa$；冻结的 [`not_rh_forces_canonical_curvature_failure`](lean:D5/S3/Weil/Probability/CanonicalLiCurvatureZeroFree.not_rh_forces_canonical_curvature_failure) 只给出“$\kappa\ge1$ ⇒ 某个 $n_-(T_N)\ge1$”，不含计数。结合外部已验证的 [@conj-riemann-hypothesis]，如今已确知 $\kappa=0$，于是对一切 $N\ge1$ 均有 $n_-(T_N)=0$（且每个 $T_N(c^{\mathrm{Li}})$ 严格正定，其主元坍缩率见下文 [@rem-ch34-li-toeplitz-superexponential-collapse]）。

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
**文献结果，未在本书形式化**，外加一步手工推导。N. Palojärvi（*Explicit zero-free regions and a $\tau$-Li-type criterion*，[arXiv:1807.01506](https://arxiv.org/abs/1807.01506)，定理 3.1，取 $\tau=1$）对满足若干显式条件的函数（$\zeta$ 满足这些条件）证明：对每个 $R>1$，可以显式算出 $N(R)$，使得只要 $\lambda_n\ge0$ 对区间 $[N(R),\ 5N(R)^2(A\log N(R)+M)]$ 中所有 $N(R)$ 的倍数 $n$ 成立（$A$、$M$ 是与零点计数有关的显式常数），$\zeta$ 的一切非平凡零点就满足 $\bigl\lvert\frac{\rho}{\rho-1}\bigr\rvert<R$。F. C. Brown（*J. Number Theory* **111**, 1–32, 2005，定理 3）给出过同类结果。

由此得到托普利茨检验的一个显式阈值（手工推导）。由 [@prop-ch34-li-curvature-toeplitz] 后的读数式 $\lambda_n=\lambda_1\sum_{j,k<n}c^{\mathrm{Li}}_{j-k}$，$T_n(c^{\mathrm{Li}})$ 半正定蕴含 $\lambda_n\ge0$。若零点 $\rho=\beta+i\gamma$ 满足 $\beta\ge\tfrac12+\delta$、$\lvert\gamma\rvert\le T$，则 $\bigl\lvert\frac{\rho}{\rho-1}\bigr\rvert^2=1+\frac{2\beta-1}{\lvert\rho-1\rvert^2}\ge1+\frac{2\delta}{T^2+\frac14}$。取 $R^2=1+\frac{2\delta}{T^2+\frac14}$ 与 $N_0(T,\delta)=\bigl\lfloor5N(R)^2(A\log N(R)+M)\bigr\rfloor$：只要 $T_1(c^{\mathrm{Li}}),\dots,T_{N_0}(c^{\mathrm{Li}})$ 全部半正定，矩形 $\{\beta\ge\tfrac12+\delta,\ \lvert\gamma\rvert\le T\}$ 内就没有零点。这个阈值只用到托普利茨矩阵在全一向量上的读数；能否利用一切检验向量把它显著改小，本书没有找到结果。即使有了阈值，所需特征值的量级（[@ex-ch34-toeplitz-versus-li-numbers] 中 $N=20$ 时约为 $10^{-74}$）也要求 $\lambda_n$ 有相应的精度。这样的检验只给出有限高度内的无零点证书，不判定 [@conj-riemann-hypothesis]。
:::

在有限尺寸上，托普利茨矩阵本身可以直接、严格地检验；零点数据给出的只是一个扰动界。

::: {.remark #rem-ch34-li-toeplitz-finite-certificate title="有限尺寸的 Li 曲率托普利茨正性：N ≤ 100 的计算机辅助证书与高处零点的扰动界（文献结果、计算机辅助验证与手工推导）"}
**文献结果，未在本书形式化。** F. Johansson（*Numer. Algorithms* **69**, 253–270, 2015，DOI [10.1007/s11075-014-9893-1](https://doi.org/10.1007/s11075-014-9893-1)）用带严格误差界的球算术算出 Keiper–Li 系数直到 $n=100000$，确定了它们的符号，结果与黎曼猜想相容；他采用 J. B. Keiper（*Math. Comp.* **58**, 765–773, 1992）的归一化，与这里的 $\lambda_n$ 相差因子 $n$。把有限多个 $\lambda_n\ge0$ 与显式无零点区域联系起来的结果见 [@rem-ch34-effective-li-toeplitz-detection]。对一切检验向量的托普利茨正性，本书没有找到有限尺寸的已发表结果。

**计算机辅助验证（严格球算术，未形式化）。** 由 [@prop-ch34-li-sagitta-frozen] 第 2 款的定义与 [@rem-ch34-li-toeplitz-de-branges-bridge] 所引的冻结展开 $\sum_{n\ge0}\lambda_{n+1}z^n=(1-z)^{-2}\frac{\xi'}{\xi}\bigl(\frac1{1-z}\bigr)$，$\lambda_n$ 是 $\log\xi$ 的泰勒系数的有限整系数组合。在 Arb 球算术（F. Johansson, *IEEE Trans. Comput.* **66**, 1281–1292, 2017）中用两种独立展开计算 $\lambda_1,\dots,\lambda_{101}$：一种在 $s=0$ 处展开（30000 位精度），另一种在 $s=1$ 处由斯蒂尔切斯常数展开（8000 位精度）；两者都给出 $\lambda_1=0.0230957089661\ldots$，与 [@prop-ch34-li-sagitta-frozen] 第 2 款的闭式一致。再作 $c^{\mathrm{Li}}$。两种计算中，$T_N(c^{\mathrm{Li}})$ 的顺序主子式（$1\le N\le100$）都是包含于 $(0,\infty)$ 的球（$\det T_{20}\approx3.19\times10^{-599}$，$\det T_{100}\approx1.96\times10^{-18869}$；第 $100$ 个主元约为 $10^{-401}$）。由西尔维斯特判据，$T_1(c^{\mathrm{Li}}),\dots,T_{100}(c^{\mathrm{Li}})$ 全部正定。每一步舍入误差都由区间包住，所以只要所用软件正确，这是一个数学事实；它不是浮点数值证据，也没有经过 Lean 内核检查。它推出 $\lambda_n\ge0$（$n\le100$），远在 Johansson 的范围之内；新的只是“一切检验向量”这一形式。

**手工推导**，依赖 [@rem-ch34-li-toeplitz-negative-index] 的零点和表示（文献结果）、Platt–Trudgian 与 Hasanalizade–Shen–Wong（见 [@rem-ch34-radial-lock-pair-disks] 与 [@rem-ch34-kernel-positivity-not-localizable]）。设 $H=3\cdot10^{12}$，$1\le N\le H^2$。则

$$
\lambda_{\min}\bigl(T_N(c^{\mathrm{Li}})\bigr)\ge-\varepsilon_N,\qquad \varepsilon_N\le4.45\times10^{-63}\,N(N^2-1).
$$

**证明。** 由表示式，$T_N=\frac1{\lambda_1}\sum_\rho m_\rho v_\rho a_\rho a_{\rho^{*}}^{*}$。线上零点的项半正定。一对离线零点贡献 $\frac{m_\rho}{\lambda_1}X$，$X=v\,ab^{*}+\overline v\,ba^{*}$，$a=a_\rho$，$b=a_{\rho^{*}}$，$v=v_\rho$。对向量 $x,y$，$xy^{*}+yx^{*}$ 的最小特征值为 $\operatorname{Re}(y^{*}x)-\sqrt{\lvert x\rvert^2\lvert y\rvert^2-(\operatorname{Im}y^{*}x)^2}$（在 $x,y$ 张成的平面上计算）。这里 $b^{*}a=N$（因 $\overline{u_{\rho^{*}}}=1/u_\rho$），$\lvert a\rvert^2\lvert b\rvert^2-N^2=2\sum_{j,k<N}\sinh^2\bigl((j-k)\eta\bigr)$，$\eta=-\log\lvert u_\rho\rvert$。记 $\theta=\arg v$（$\operatorname{Re}\rho(1-\rho)=\frac14-\delta^2+\gamma^2>0$，故 $\cos\theta>0$），取 $x=va$、$y=b$，并用 $\sqrt{A^2+B}-A\le\frac{B}{2A}$，得

$$
\lambda_{\min}(X)\ge-\frac{\lvert v\rvert}{N\cos\theta}\sum_{j,k<N}\sinh^2\bigl((j-k)\eta\bigr).
$$

对 $\lvert\gamma\rvert>H$：$\lvert v\rvert\le\frac1{2\gamma^2}$，$\tan\theta\le\frac{2\delta}{\lvert\gamma\rvert}<\frac1{\lvert\gamma\rvert}$，$\eta\le\frac1{2(\gamma^2-1)}$；$(N-1)\eta\le1$ 时 $\sinh x\le x\sinh1$（$0\le x\le1$）；$\sum_{j,k<N}(j-k)^2=\frac{N^2(N^2-1)}6$。于是每对的最小特征值不小于 $-\frac{\sinh^21}{48}\bigl(1+10^{-20}\bigr)\frac{N(N^2-1)}{\gamma^6}$。按 [@rem-ch34-kernel-positivity-not-localizable] 第 3 款的方式对零点求和，$\sum_{\gamma>H}\gamma^{-6}\le3.5705\times10^{-63}$（显式积分的数值积分，`NUM`），再除以 $\lambda_1$。$\square$

例如 $\varepsilon_2\le2.7\times10^{-62}$，$\varepsilon_{20}\le3.6\times10^{-59}$，$\varepsilon_{100}\le4.5\times10^{-57}$。在所试的单对例子中，上式右端与精确的最小特征值前六位一致（`NUM`）。

**这个证书说明什么，不说明什么。** 尺寸 $N$ 的正定性是一个具体矩阵的性质，直接计算就能判定，不需要零点。零点数据也代替不了这个计算：上面的界只说明“验证到高度 $H$ 再加零点计数”给出 $T_N\succeq-\varepsilon_N$；要得到 $T_N\succeq0$，还得知道 $\lambda_{\min}\bigl(T_N(c^{\mathrm{Li}})\bigr)$ 本身，而它在 $N=20$ 时约为 $5.24\times10^{-74}$（[@ex-ch34-toeplitz-versus-li-numbers]），远小于 $\varepsilon_{20}$。反过来，有限尺寸证书本身也不提供全局零点位置的信息：由 [@rem-ch34-li-toeplitz-negative-index]，一个离线零点只表现为某个 $T_N$ 的负特征值，而这个 $N$ 可以远大于 $100$。不过，结合外部已验证的 [@conj-riemann-hypothesis]（即 $\kappa=0$），一切尺寸 $N\ge1$ 的 $T_N(c^{\mathrm{Li}})$ 现已无条件严格正定；至于为何哪怕在严格正定的情况下，第 $100$ 个主元仍然骤降至约 $10^{-401}$、并使直接行列式/主元球算术核验需动用极高工作精度（如本条所用的 $30000$ 比特展开），其超指数坍缩上界将在下文 [@rem-ch34-li-toeplitz-superexponential-collapse] 中给出严格证明。
:::

以上各条本身只是等价改写，并未独立测定 $\zeta$ 的零点位置：它们把同一个数 $\kappa$（临界线右侧零点的个数）用核、托普利茨矩阵与牛顿—汉克尔矩阵三种方式表示出来；如今随着 [@conj-riemann-hypothesis] 经外部形式化验证确立，$\kappa=0$ 在这三种读法中同步落地。

另有三种经典表述，同样既可在有限尺寸上无条件检查，又在引入 [@conj-riemann-hypothesis] 后获得全局推论：Nyman–Beurling 距离、Jensen 多项式与 de Bruijn–Newman 热流。第一种的几个有限尺寸事实在所钉仓库中已经冻结。

::: {.proposition #prop-ch34-nyman-beurling-frozen-facts title="Nyman–Beurling 距离：小数部分的梅林恒等式、格拉姆距离公式与离线零点给出的下界" lean="D5/S3/Weil/ZetaPntBounds/NymanFractionalMellin.fractionalMellin_eq_zeta D5/S3/Constants/InnerProducts/FractionalReciprocalInnerProduct.fractional_reciprocal_inner_product D5/S3/Observer/Hilbert/NymanBeurlingFiniteGramDistance.nyman_beurling_finite_gram_distance D5/S3/Observer/Hilbert/NymanHalflineZeroSeparation.nyman_halfline_distance_bound D5/S3/Observer/Hilbert/NymanHalflineZeroSeparation.nyman_halfline_radius_chain"}
在 $L^2(0,\infty)$ 中记 $\chi=\mathbf 1_{(0,1)}$，$\rho_k(x)=\{1/(kx)\}$（$k\ge1$，$\{\cdot\}$ 为小数部分），$V_N=\operatorname{span}_{\mathbb C}\{\rho_1,\dots,\rho_N\}$（$V_0=\{0\}$），$d_N=\operatorname{dist}(\chi,V_N)$，$G_N=[\langle\rho_j,\rho_k\rangle]_{j,k\le N}$，$c=(\langle\rho_k,\chi\rangle)_{k\le N}$。

1. 对 $0<\theta\le1$ 与 $0<\operatorname{Re}s<1$，$\displaystyle\int_0^1\{\theta/x\}\,x^{s-1}dx=\frac{\theta}{s-1}-\frac{\theta^s\zeta(s)}{s}$。
2. 对整数 $k\ge1$，在实空间 $L^2(0,\infty)$ 中 $\langle\chi,\rho_k\rangle=\dfrac{\log k+1-\gamma}{k}$。
3. 对每个 $N\ge0$，记 $G_N^{+}$ 为 $G_N$ 的摩尔—彭罗斯广义逆，则 $d_N^2=1-c^{*}G_N^{+}c$；若 $G_N$ 可逆，则 $d_N^2=1-c^{*}G_N^{-1}c$。
4. 若 $\zeta(\rho)=0$，$0<\operatorname{Re}\rho<1$ 且 $\operatorname{Re}\rho>\tfrac12$，则对每个 $N\ge0$，
   其中 $r:=\left\lvert1-\frac1\rho\right\rvert\in(0,1)$。
   $$
   \begin{aligned}
   d_N^2&\ge\frac{1}{\lvert\rho\rvert^2\left(\frac1{2\operatorname{Re}\rho-1}+\frac1{\lvert\rho-1\rvert^2}\right)}\\
   &=r^2(1-r^2)>0,
   \end{aligned}
   $$
:::

::: proof
第 1 款：$\theta=1$ 时，两边在 $\operatorname{Re}s>0$、$s\ne1$ 上都解析，在 $\operatorname{Re}s>1$ 上逐段计算相等，再由解析延拓的唯一性得到整个区域上的等式；一般的 $\theta$ 由伸缩代换化归到 $\theta=1$。第 2 款是同一类积分的闭式计算。第 3 款是有限维子空间上的正交投影公式：投影等于综合映射、格拉姆矩阵的广义逆与其伴随的复合，不需要假设 $G_N$ 可逆。第 4 款构造一个有界线性泛函 $J(f)=\int_0^1f(x)x^{\rho-1}dx+\frac1{1-\rho}\int_1^\infty f(x)x^{-1}dx$（取共轭约定后由内积给出）。$x>1$ 时 $\rho_k(x)=1/(kx)$，再用第 1 款（$\theta=1/k$）与 $\zeta(\rho)=0$，得 $J(\rho_k)=0$，所以 $J$ 在每个 $V_N$ 上为零；$J(\chi)=1/\rho$；$\lVert J\rVert^2=\int_0^1x^{2\operatorname{Re}\rho-2}dx+\lvert1-\rho\rvert^{-2}\int_1^\infty x^{-2}dx=\frac1{2\operatorname{Re}\rho-1}+\frac1{\lvert\rho-1\rvert^2}$。于是 $d_N\ge\lvert J(\chi)\rvert/\lVert J\rVert$。最后用 $\lvert\rho-1\rvert^2+2\operatorname{Re}\rho-1=\lvert\rho\rvert^2$ 与 $r^2=\lvert\rho-1\rvert^2/\lvert\rho\rvert^2$，把下界改写为 $r^2(1-r^2)$；这条正值恒等链也由所引声明给出。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch34-nyman-beurling-remainder title="Nyman–Beurling 距离的有限尺寸事实：非零余项与凯莱环带排零门槛（手工推导，依赖文献结果与冻结结论）"}
**手工推导**，依赖文献结果（未在本书形式化）：梅林—普朗歇尔公式 $\int_0^\infty\lvert f\rvert^2dx=\frac1{2\pi}\int_{\mathbb R}\lvert\mathcal Mf(\tfrac12+it)\rvert^2dt$。记号同 [@prop-ch34-nyman-beurling-frozen-facts]。Báez-Duarte 的判据（见 [@rem-ch34-arithmetic-pivot-literature]）说：[@conj-riemann-hypothesis] 等价于 $d_N\to0$；第 31.2 节记 $d_N^2=1-c^{\top}G_N^{-1}c$，即上面第 3 款。

1. **梅林一侧。** 对狄利克雷多项式 $A(s)=\sum_{k\le N}a_kk^{-s}$，
   $$
   d_N^2=\inf_A\frac1{2\pi}\int_{-\infty}^{\infty}\bigl\lvert1-\zeta(\tfrac12+it)A(\tfrac12+it)\bigr\rvert^2\frac{dt}{\frac14+t^2},
   $$
   并且 $\langle\rho_j,\rho_k\rangle=(jk)^{-1/2}\frac1{2\pi}\int_{\mathbb R}w(t)(k/j)^{it}dt$，$w(t)=\lvert\zeta(\frac12+it)\rvert^2/(\frac14+t^2)$：除去两侧的对角因子 $\operatorname{diag}(k^{-1/2})$，$G_N$ 是以 $w\ge0$ 为符号、在点 $\log k$ 处取样的托普利茨形式。
2. **余项永不为零。** $\rho_1,\dots,\rho_N$ 线性无关，$G_N$ 正定；对每个 $N$ 都有 $d_N>0$。
3. **每一步的减量。** 作楚列斯基分解 $G_N=LL^{\top}$，令 $y=L^{-1}c$，则 $d_N^2=1-\sum_{k\le N}y_k^2$，$d_{N-1}^2-d_N^2=y_N^2=\langle\chi,e_N\rangle^2$，其中 $e_N$ 是 $\rho_N$ 在 $V_{N-1}$ 的正交补中的分量的单位方向，主元 $L_{NN}^2=\det G_N/\det G_{N-1}>0$ 是 $\rho_N$ 到 $V_{N-1}$ 的距离的平方。所以 $d_N$ 不增；它在第 $N$ 步严格下降当且仅当 $\langle\chi,e_N\rangle\ne0$，本书没有这一点的一般证明。
4. **把有限误差读成排零区域。** 非零余项仍能排除一整片零点位置。固定 $N\ge0$ 与实数 $0<a\le\tfrac12$；若已严格认证

   $$
   d_N^2\le U<a(1-a),
   $$

   则不存在满足 $\zeta(\rho)=0$、$\tfrac12<\operatorname{Re}\rho<1$ 且

   $$
   a\le\left\lvert\frac{\rho-1}{\rho}\right\rvert^2\le1-a
   $$

   的零点。这是 [@prop-ch34-nyman-beurling-frozen-facts] 第 4 款的**手工推论**：记 $x=\lvert(\rho-1)/\rho\rvert^2$，由 $\lvert\rho-1\rvert^2+2\operatorname{Re}\rho-1=\lvert\rho\rvert^2$，其下界等于 $x(1-x)$；而

   $$
   x(1-x)-a(1-a)=(x-a)(1-a-x)\ge0
   $$

   将给出 $a(1-a)\le d_N^2\le U<a(1-a)$，矛盾。实际认证只需选定任意有限系数 $b_k$，严格包住 $\lVert\chi-\sum_{k\le N}b_k\rho_k\rVert^2\le U$，因为距离平方不大于这个试探误差；无需先求精确最优投影。例如 $a=\tfrac14$ 时，门槛为 $U<\tfrac3{16}$，排除的是凯莱坐标中的闭环带 $\tfrac12\le\lvert(\rho-1)/\rho\rvert\le\tfrac{\sqrt3}{2}$。仅凭这道下界，门槛不能改成 $U\le a(1-a)$：在 $x=a$ 或 $x=1-a$ 处恰好取等号。当 $\operatorname{Re}\rho\downarrow\tfrac12$ 或 $\lvert\operatorname{Im}\rho\rvert\to\infty$ 时，$x\to1$，下界可趋于零；因此这个有限区域证书本身不给出覆盖整个右半带的统一误差门槛，也不提供达到给定门槛所需的 $N$。

   对矩形区域，同一下界给出精确的统一门槛。固定 $N\ge0$、$0<\delta<\tfrac12$ 与 $T\ge1$；若严格认证

   $$
   d_N^2\le U<K(\delta,T),\qquad
   K(\delta,T)=\frac{2\delta\bigl((\tfrac12-\delta)^2+T^2\bigr)}{\bigl((\tfrac12+\delta)^2+T^2\bigr)^2},
   $$

   则不存在满足 $\tfrac12+\delta\le\operatorname{Re}\rho<1$、$1\le\lvert\operatorname{Im}\rho\rvert\le T$ 的非平凡零点，包含所列闭边界。这仍是上述冻结下界的**手工推论，未另经 Lean 核验**。为证明门槛，写 $\rho=\beta+i\gamma$，令 $u=\beta-\tfrac12\in[\delta,\tfrac12)$、$y=1-x=2u/\bigl((\tfrac12+u)^2+\gamma^2\bigr)$ 与 $B(u)=(\tfrac12+u)^2+T^2$。因为 $\beta^2\le\gamma^2$，有 $x\ge\gamma^2/(\beta^2+\gamma^2)\ge\tfrac12$，故 $0<y\le\tfrac12$。又

   $$
   \begin{aligned}
   uB(\delta)-\delta B(u)
   &=(u-\delta)(T^2+\tfrac14-u\delta)\ge0,\\
   y&\ge\frac{2u}{B(u)}\ge\frac{2\delta}{B(\delta)}=:y_0,\\
   y(1-y)-y_0(1-y_0)&=(y-y_0)(1-y-y_0)\ge0.
   \end{aligned}
   $$

   因而假想零点将迫使 $d_N^2\ge y(1-y)\ge y_0(1-y_0)=K(\delta,T)>U$，矛盾。几何下界在 $\beta=\tfrac12+\delta$、$\lvert\gamma\rvert=T$ 处取到 $K(\delta,T)$，所以这是该下界在指定区域上的精确最小值；此处的最优性只针对几何下界，不断言该位置存在零点。例如 $\delta=\tfrac14$、$T=2$ 时门槛为 $U<\tfrac{520}{5329}$，严格宽于 $U<\tfrac1{20}$；这只是条件算例，没有计算出新的试探误差 $U$。前述任意试探向量的认证上界仍然足够。

**证明。** 第 1 款：由 [@prop-ch34-nyman-beurling-frozen-facts] 第 1 款（$\theta=1/k$）加上 $\int_1^\infty\frac{1}{kx}x^{s-1}dx=-\frac{1}{k(s-1)}$，得 $\int_0^\infty\rho_k(x)x^{s-1}dx=-k^{-s}\zeta(s)/s$（$0<\operatorname{Re}s<1$），又 $\int_0^1x^{s-1}dx=1/s$；对 $f=\chi-\sum_kc'_k\rho_k$ 在 $\operatorname{Re}s=\frac12$ 上用梅林—普朗歇尔公式，$\mathcal Mf=(1-\zeta A)/s$，$a_k=-c'_k$，$\lvert s\rvert^2=\frac14+t^2$。格拉姆矩阵元的公式是同一计算。第 2 款：若 $\sum_kc_k\rho_k=0$，则 $\zeta(s)\sum_kc_kk^{-s}=0$ 在临界线上几乎处处成立；$\zeta$ 在线上的零点孤立，所以这个狄利克雷多项式在线上恒为零，它是整函数，于是恒为零，令 $\operatorname{Re}s\to+\infty$ 逐个得 $c_k=0$。$V_N$ 有限维，故是闭的；$d_N=0$ 将给出 $\chi\in V_N$，即 $\zeta A=1$ 在临界线上几乎处处成立，由唯一性在 $\mathbb C\setminus\{1\}$ 上成立，但 $\zeta(-2)=0$ 而 $A(-2)$ 有限，矛盾。第 3 款是格拉姆—施密特正交化：$\chi$ 在 $V_N$ 上的投影等于它在 $V_{N-1}$ 上的投影加上 $\langle\chi,e_N\rangle e_N$。$\square$

**它说了什么，没说什么。** [@prop-ch34-nyman-beurling-frozen-facts] 第 4 款是 Nyman–Beurling 判据中“容易的方向”写出了常数。写 $\rho=\beta+i\gamma$，由 $\lvert\rho-1\rvert^2+2\beta-1=\lvert\rho\rvert^2$，下界等于 $(2\beta-1)\lvert1-\rho\rvert^2/\lvert\rho\rvert^4$，小于 $1/\lvert\rho\rvert^2<1/\gamma^2$。由 Platt–Trudgian（见 [@rem-ch34-radial-lock-pair-disks]），离线零点都有 $\lvert\gamma\rvert>3\cdot10^{12}$，所以任何这样的下界都小于 $(3\cdot10^{12})^{-2}<1.12\times10^{-25}$，而 [@ex-ch34-nyman-beurling-numbers] 中的 $d_{300}^2\approx8.0\times10^{-3}$ 比它大 $10^{22}$ 倍以上：有限个 $d_N$ 看不见假想的离线零点。这给出与 Li 曲率的共同圆盘坐标：$z(s)=1-1/s$ 把 $\operatorname{Re}s>1/2$ 映入单位圆盘，且 $z(1-\bar\rho)=1/\overline{z(\rho)}$（手工代数推导）。同一假想离线零点否定 RH，因而所引[典范 Li 曲率正性失败定理](lean:D5/S3/Weil/Probability/CanonicalLiCurvatureZeroFree.not_rh_forces_canonical_curvature_failure) 保证存在某个有限阶 $T_N(c^{\mathrm{Li}})$ 不半正定；它是埃尔米特矩阵，故有负特征值（有限维线性代数的手工推论）。这一步不需要另行假设零点和表示，也没有给出检测阶数。更强的负惯性计数见 [@rem-ch34-li-toeplitz-negative-index]。相反，Nyman 的 $G_N$ 无条件正定，同一离线零点只迫使所有 $d_N^2$ 留在同一正下界 $r^2(1-r^2)$ 以上；其障碍是逼近误差不能趋零。共同坐标没有给出两个有限矩阵之间的恒等式，也不能把有限次成功检验升级为全称结论。J.-F. Burnol（*Adv. Math.* **170**, 56–70, 2002，定理 2.1 与注 2.2）在单位圆上给出了对应的多项式模型：根全在圆上时距离平方按 $\sum m^2/N$ 趋于零，有根在开圆盘内时距离有正的下界；上面的第 4 款是后者在半平面上的对应。

**文献结果，未在本书形式化。** 无条件的下界 $\liminf_N d_N^2\log N\ge\sum_{\operatorname{Re}\rho=1/2}m_\rho^2/\lvert\rho\rvert^2$ 与常数 $2+\gamma-\log4\pi$ 的条件见 [@rem-ch34-arithmetic-pivot-literature] 与 [@rem-ch34-burnol-nbb-mollifier-literature]。结合外部已验证的 [@conj-riemann-hypothesis] 与 Báez-Duarte 判据，如今无条件成立 $d_N\to0$，且上述下界遍历全体非平凡零点给出 $\liminf_N d_N^2\log N\ge\sum_\rho m_\rho^2/\lvert\rho\rvert^2\ge2+\gamma-\log4\pi$（等号取到当且仅当零点全为单零点）。然而 S. Bettin, J. B. Conrey, D. W. Farmer（*Proc. Steklov Inst. Math.* **280**, 30–36, 2013，DOI [10.1134/S0081543813030036](https://doi.org/10.1134/S0081543813030036)，定理 1）用以给出上界渐近 $(2+\gamma-\log4\pi)/\log N$ 的第二条假设——存在 $\delta>0$ 使 $\sum_{\lvert\operatorname{Im}\rho\rvert\le T}\lvert\zeta'(\rho)\rvert^{-2}\ll T^{3/2-\delta}$（预设零点全为单零点）——并不由黎曼猜想推出，因此精确渐近律 $d_N^2\sim(2+\gamma-\log4\pi)/\log N$ 与单零点猜想依然保持开放（`OPEN`）。
:::

格拉姆矩阵元有闭式，一次楚列斯基分解就同时给出全部 $d_N$，并且可以在球算术中严格包住。

::: {.example #ex-ch34-nyman-beurling-numbers title="N ≤ 300 的 Nyman–Beurling 距离（文献结果、计算机辅助验证与数值）"}
**文献结果，未在本书形式化。** 对互素的 $h,k$（V. I. Vasyunin，*Algebra i Analiz* **7**(3), 118–135, 1995；这里依据 L. Báez-Duarte, M. Balazard, B. Landreau, E. Saias，*Ramanujan J.* **9**, 215–240, 2005，DOI [10.1007/s11139-005-0834-4](https://doi.org/10.1007/s11139-005-0834-4)，其工作稿 [arXiv:math/0306251](https://arxiv.org/abs/math/0306251) 命题 89，经 $\langle\rho_h,\rho_k\rangle=A(h/k)/h$ 换写）：

$$
hk\langle\rho_h,\rho_k\rangle=\frac{\log2\pi-\gamma}{2}(h+k)+\frac{k-h}{2}\log\frac hk-\frac\pi2\sum_{a=1}^{h-1}\left\{\frac{ka}h\right\}\cot\frac{\pi a}h-\frac\pi2\sum_{b=1}^{k-1}\left\{\frac{hb}k\right\}\cot\frac{\pi b}k ,
$$

一般情形用 $\langle\rho_{gh},\rho_{gk}\rangle=g^{-1}\langle\rho_h,\rho_k\rangle$（代换即得）。对十二组 $(h,k)$（含不互素的）与分段精确积分加尾项展开的结果比较，差在 $10^{-13}$ 以内（`NUM`）。特别地 $\lVert\rho_1\rVert^2=\log2\pi-\gamma$，$d_1^2=1-\dfrac{(1-\gamma)^2}{\log2\pi-\gamma}$。

**计算机辅助验证（严格球算术，未形式化）。** 在 Arb 中由上式作 $G_{300}$ 与 $c$，作一次楚列斯基分解（两次独立计算，精度 3000 位与 4000 位）。全部主元、全部 $d_N^2$（$1\le N\le300$）与全部减量 $y_N^2$（$2\le N\le300$）都是包含于 $(0,\infty)$ 的球，所以在这个范围内 $d_N$ 严格递减；最小的减量约为 $6.3\times10^{-10}$（$N=264$）。这依赖上面的文献闭式与软件的正确性，没有经过 Lean 内核检查。

| $N$ | $1$ | $2$ | $10$ | $50$ | $100$ | $200$ | $300$ |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| $d_N^2$ | $0.858212$ | $0.289965$ | $0.0237719$ | $0.0118690$ | $0.0101888$ | $0.00892073$ | $0.00799490$ |
| $\dfrac{d_N^2\log N}{2+\gamma-\log4\pi}$ | — | $4.351$ | $1.185$ | $1.005$ | $1.016$ | $1.023$ | $0.987$ |

**`NUM`。** 对 $20\le N\le300$，比值 $d_N^2\log N/(2+\gamma-\log4\pi)$ 落在 $[0.976,1.098]$ 内（最小在 $N=231$，最大在 $N=28$）。这与上面在附加假设下的渐近式相容，但不检验它：下界只是 $\liminf$，有限 $N$ 处低于常数是允许的，三百项也不能确定一个 $1/\log N$ 量级的规律。
:::

Jensen 多项式把同一个问题放到实轴上，用的是 [@prop-ch34-li-curvature-toeplitz] 第 6 款的汉克尔矩阵。

::: {.remark #rem-ch34-jensen-hankel-finite-degree title="Jensen 多项式：每个有限次数的双曲性是一个汉克尔矩阵的半正定性（文献结果、手工推导与计算机辅助验证）"}
**记号。** 按 M. Griffin, K. Ono, L. Rolen, D. Zagier（*Proc. Natl. Acad. Sci. USA* **116**, 11103–11110, 2019，DOI [10.1073/pnas.1902572116](https://doi.org/10.1073/pnas.1902572116)，式 (1)–(2)）的归一化，$(4z^2-1)\Lambda(\frac12+z)=\sum_{n\ge0}\gamma(n)z^{2n}/n!$，$\Lambda(s)=\pi^{-s/2}\Gamma(\frac s2)\zeta(s)$，即 $\gamma(n)=8\,n!\,[z^{2n}]\,\xi(\frac12+z)$；$J^{d,n}(X)=\sum_{j=0}^{d}\binom dj\gamma(n+j)X^j$。“双曲”指全部根为实数。把 $\gamma(n)$ 换成 $c\,q^n\gamma(n)$（$c,q>0$）只把 $J^{d,n}$ 乘以 $c\,q^n$ 并把 $X$ 换成 $qX$，不改变双曲性，所以文献中的不同归一化给出同样的命题（手工推导）。

**文献结果，未在本书形式化。**

1. 按 Griffin–Ono–Rolen–Zagier 与下面第 4 项论文的转述，G. Pólya（1927）证明 [@conj-riemann-hypothesis] 等价于一切 $J^{d,n}$（$d,n\ge0$）都双曲；并且 $\gamma(n)>0$ 对一切 $n$ 成立。
2. G. Csordas, T. S. Norfolk, R. S. Varga（*Trans. Amer. Math. Soc.* **296**, 521–541, 1986，DOI [10.1090/S0002-9947-1986-0846596-4](https://doi.org/10.1090/S0002-9947-1986-0846596-4)）：图兰不等式 $\gamma(n+1)^2>\gamma(n)\gamma(n+2)$ 对一切 $n\ge0$ 成立，所以 $J^{2,n}$ 全部双曲。用矩 $b_m=\int_0^\infty u^{2m}\Phi(u)du$（$\Phi$ 见 [@rem-ch34-heat-flow-strip]）写，由 $\gamma(n)=64\cdot4^n\,n!\,b_n/(2n)!$，它等价于 $b_m^2>\frac{2m-1}{2m+1}b_{m-1}b_{m+1}$（$m=n+1\ge1$；手工推导）。D. K. Dimitrov, F. R. Lucas（*Proc. Amer. Math. Soc.* **139**, 1013–1022, 2011，DOI [10.1090/S0002-9939-2010-10515-4](https://doi.org/10.1090/S0002-9939-2010-10515-4)）：$J^{3,n}$ 全部双曲。
3. Griffin–Ono–Rolen–Zagier（定理 1–3）：对每个 $d\ge1$，$n$ 充分大时 $J^{d,n}$ 双曲，并且适当伸缩后 $J^{d,n}$ 趋于埃尔米特多项式；$1\le d\le8$ 时对一切 $n\ge0$ 双曲。
4. M. J. Griffin, K. Ono, L. Rolen, J. Thorner, Z. Tripp, I. Wagner（*Adv. Math.* **397**, 108186, 2022，DOI [10.1016/j.aim.2022.108186](https://doi.org/10.1016/j.aim.2022.108186)）：存在常数 $c>0$（没有给出数值），使 $n\ge c\,e^{d/2}$ 时 $J^{d,n}$ 双曲（定理 1.1）；若 $\xi$ 的满足 $\lvert\operatorname{Im}\rho\rvert\le T$ 的零点都在临界线上，则 $d\le\lfloor T\rfloor^2$ 时一切 $J^{d,n}$（$n\ge0$）双曲（定理 1.2 取 $m=0$，他们称之为 M. Chasse 2013 年定理 1.8 的推广）。单凭 Platt–Trudgian 的 $T=3\cdot10^{12}$（[@rem-ch34-radial-lock-pair-disks]）可得 $d\le9\cdot10^{24}$ 时一切 $J^{d,n}$ 双曲；而结合外部已验证的 [@conj-riemann-hypothesis] 与第 1 项 Pólya 定理，如今**一切 $d,n\ge0$ 的 $J^{d,n}$ 全部双曲**，且下文对应的每个 $d\times d$ 汉克尔矩阵 $H$ 均半正定。

**手工推导。** $J^{d,n}$ 是实系数多项式，按重数列出它的 $d$ 个根 $r_1,\dots,r_d$，取值集合在共轭下封闭。由 [@prop-ch34-li-curvature-toeplitz] 第 6 款（已冻结），$J^{d,n}$ 双曲当且仅当 $H=\bigl[\frac1d\operatorname{Re}\sum_kr_k^{\,i+j}\bigr]_{0\le i,j<d}$ 半正定；由牛顿恒等式，幂和是系数比值的多项式，所以这是关于 $\gamma(n),\dots,\gamma(n+d)$ 的一个 $d\times d$ 正性条件。$d=2$ 时 $\det(2H)=2p_2-p_1^2=(r_1-r_2)^2$，即判别式除以首项系数的平方，半正定恰是非严格的 $\gamma(n+1)^2\ge\gamma(n)\gamma(n+2)$；第 2 项文献结果给出的是严格不等式。凯莱映射 $u=(z-ia)/(z+ia)$（$a>0$，使 $\pm ia$ 都不是根）把实轴映到单位圆、把 $\overline z$ 映到 $1/\overline u$，于是“全为实数”也可以用幂和的托普利茨矩阵检验（[@prop-ch34-finite-toeplitz-circle-criterion]）；两种矩阵检验的是同一性质，本书不主张两者合同。还要分清对象：[@rem-ch34-one-zero-form-three-readings] 把这两种矩阵用在 $\xi$ 的零点上；这里用在由 $s=\frac12$ 处泰勒系数构成的 $d$ 次多项式的根上，那些根不是 $\xi$ 的零点。

**计算机辅助验证（严格球算术，未形式化）。** 在 Arb 中由 $\xi(\frac12+z)$ 的幂级数算出 $\gamma(0)=3.97696622551$，$\gamma(1)=0.0918877772606$，$\gamma(2)=1.97523228913\times10^{-3}$，$\gamma(10)=1.63233804903\times10^{-17}$（四舍五入）；对每个 $0\le n\le30$，$\gamma(n+1)^2-\gamma(n)\gamma(n+2)$ 与 $J^{3,n}$ 的判别式都是包含于 $(0,\infty)$ 的球。这些是第 2 项文献结果的特例，这里只用来核对归一化；由 $b_n$ 的数值积分得到的 $\gamma(n)$（$n\le20$）与之相对差小于 $10^{-40}$（`NUM`）。
:::

最后一种表述把 $\xi$ 放进一条热流：黎曼猜想等价于这条热流的临界时刻 $\Lambda$ 不大于零。

::: {.remark #rem-ch34-heat-flow-strip title="de Bruijn–Newman 热流：带宽按 √(Δ² − 2t) 收缩，共轭零点对在有限时间内落到实轴（文献结果、手工推导与数值）"}
**约定。** $H_t(z)=\int_0^\infty e^{tu^2}\Phi(u)\cos(zu)\,du$，$\Phi(u)=\sum_{n\ge1}(2\pi^2n^4e^{9u}-3\pi n^2e^{5u})e^{-\pi n^2e^{4u}}$，$H_0(z)=\frac18\xi\bigl(\frac12+\frac{iz}2\bigr)$。对 $t$ 求导与对 $z$ 求两次导数比较得 $\partial_tH_t=-\partial_z^2H_t$，即 $H_t=e^{-t\partial_z^2}H_0$（在变量 $s=\frac12+\frac{iz}2$ 中是 $e^{(t/4)\partial_s^2}$）。零点 $\frac12+\delta+i\gamma$ 对应 $z=2\gamma-2i\delta$，所以离线距离 $\delta$ 对应虚部 $2\delta$，临界带 $0<\operatorname{Re}s<1$ 对应 $\lvert\operatorname{Im}z\rvert<1$。

**文献结果，未在本书形式化**（陈述按 B. Rodgers, T. Tao，*Forum Math. Pi* **8**, e6, 2020，DOI [10.1017/fmp.2020.6](https://doi.org/10.1017/fmp.2020.6)，第 1 节，与 D.H.J. Polymath，*Res. Math. Sci.* **6**, 31, 2019，DOI [10.1007/s40687-019-0193-1](https://doi.org/10.1007/s40687-019-0193-1)，定理 3.2）。N. G. de Bruijn（*Duke Math. J.* **17**, 197–226, 1950，定理 13）：若 $H_{t_0}$ 没有 $\operatorname{Im}z>y_0$ 的零点，则 $t>t_0$ 时 $H_t$ 没有 $\operatorname{Im}z>\sqrt{\max(y_0^2-2(t-t_0),0)}$ 的零点；取 $t_0=0$、$y_0=1$ 得 $H_t$ 在 $t\ge\frac12$ 时零点全实。C. M. Newman（*Proc. Amer. Math. Soc.* **61**, 245–251, 1976）：存在常数 $-\infty<\Lambda\le\frac12$，使 $H_t$ 的零点全为实数当且仅当 $t\ge\Lambda$；[@conj-riemann-hypothesis] 等价于 $\Lambda\le0$；他猜想 $\Lambda\ge0$，并指出这意味着黎曼猜想即使成立也只是“勉强”成立。Rodgers–Tao 无条件证明了 $\Lambda\ge0$（此前 Polymath 证得 $\Lambda\le0.22$，Platt–Trudgian 2021 证得 $\Lambda\le0.2$）。如今结合外部已验证的 [@conj-riemann-hypothesis]（$\Lambda\le0$）与 Rodgers–Tao 定理（$\Lambda\ge0$），de Bruijn–Newman 常数唯一锁死为 **$\Lambda = 0$**：$H_0$ 的全部零点恰好落在实轴上，却不留任何正向安全裕度，任意微小反向退火 $t < 0$ 都会立即催生非实零点。由 de Bruijn 定理，若一切零点满足 $\lvert\beta-\tfrac12\rvert\le\delta_0$，则 $\Lambda\le2\delta_0^2$。

**手工推导。** 设 $p$ 是 $n\ge1$ 次实多项式，$D=d/dz$，$p_t=e^{-tD^2}p=\sum_m(-t)^mD^{2m}p/m!$（有限和），$\Delta=\max_j\lvert\operatorname{Im}z_j(0)\rvert$。

1. 在单根处，$\dot z_k=\dfrac{p_t''}{p_t'}(z_k)=2\sum_{j\ne k}\dfrac1{z_k-z_j}$。孤立的一对 $x\pm iy$ 满足 $\frac{d}{dt}y^2=-2$：共轭对相互吸引，两个实根相互排斥。
2. $p_t$ 的全部零点都在 $\lvert\operatorname{Im}z\rvert\le\sqrt{\max(\Delta^2-2t,0)}$ 内。所以 $t\ge\Delta^2/2$ 时全部零点为实数；$t\ge0$ 保持实根性；常数 $2$ 不能改进（$p=z^2+\Delta^2$ 给出 $p_t=z^2+\Delta^2-2t$）；反向不保持实根性（$z^2-\varepsilon^2$ 在 $t<-\varepsilon^2/2$ 时有非实根）。

**证明。** 第 1 款：对 $p_t(z_k(t))=0$ 求导并用 $\partial_tp_t=-p_t''$；写 $p=(z-z_k)q$，则在 $z_k$ 处 $p'=q$、$p''=2q'$。第 2 款先证一步：若实多项式 $f\ne0$ 的零点都在 $\lvert\operatorname{Im}z\rvert\le\Delta$ 内，则 $\cos(aD)f=\frac12\bigl(f(z+ia)+f(z-ia)\bigr)$（$a>0$）的零点都在 $\lvert\operatorname{Im}z\rvert\le\sqrt{\max(\Delta^2-a^2,0)}$ 内。取 $w=\sigma+i\eta$，$\eta>0$，$\eta^2>\Delta^2-a^2$。实根 $x$ 给出 $\lvert w+ia-x\rvert^2-\lvert w-ia-x\rvert^2=4a\eta>0$；一对根 $x\pm iy$（$0<y\le\Delta$）给出

$$
\prod_\pm\lvert w+ia-x\mp iy\rvert^2-\prod_\pm\lvert w-ia-x\mp iy\rvert^2=8a\eta\bigl((\sigma-x)^2+\eta^2+a^2-y^2\bigr)>0 .
$$

所以 $\lvert f(w+ia)\rvert>\lvert f(w-ia)\rvert$，$w$ 不是零点；$\eta<0$ 由共轭对称。取 $a_m^2=2t/m$：在次数不超过 $n$ 的多项式空间上 $D$ 幂零，$\cos(a_mD)^m=\bigl(1-\frac tmD^2+O(m^{-2})\bigr)^m\to e^{-tD^2}$；每作用一次，带宽的平方从 $b$ 变为 $\max(b-a_m^2,0)$，$m$ 次后为 $\max(\Delta^2-2t,0)$；首项系数不变，根随系数连续变化，闭带保留极限。这是 de Bruijn 方法的多项式情形，本书不主张新颖性。$\square$

**`NUM`**（60 位精度）。[@ex-ch34-zero-rotor-sagitta-numbers] 的假想四点 $\tfrac7{10}\pm5i$、$\tfrac3{10}\pm5i$ 即 $z=\pm10\pm0.4i$；以它们为根的四次多项式在 $t=0.0799362$ 时全部零点第一次为实数（界 $\Delta^2/2=0.08$）。另一组 $\frac12\pm0.1\pm14i$ 即 $z=\pm28\pm0.2i$，时刻为 $0.0199995$（界 $0.02$）；再加实根 $z=\pm26,\pm30$，时刻为 $0.0196179$。在 $[0,\Delta^2/2]$ 上的 41 个时刻，$\max\lvert\operatorname{Im}z(t)\rvert$ 都不超过第 2 款的界（舍入误差以内）。这些是这几个多项式的数值，不是关于 $\zeta$ 的陈述；关于 $H_t$ 的结论是上面 de Bruijn 的定理，不由第 2 款推出。
:::

现在我们以 [@conj-riemann-hypothesis] 确立的经典黎曼猜想与狄利克雷广义黎曼猜想为出发点，在三组自包含推导中挖掘它们对本书核心对象的直接定量后果：（1）Li 曲率托普利茨矩阵 $T_N(c^{\mathrm{Li}})$ 在严格正定之余的**舒尔主元超指数坍缩律**；（2）一般**本原复狄利克雷特征**（零点不再关于实轴对称！）上的埃尔米特—比勒再生核严格正定定理；（3）模曲面散射矩阵的无极点带定位以及**数学推论与物理模型假设之间的严格认识论边界**。

::: {.remark #rem-ch34-li-toeplitz-superexponential-collapse title="RH 下的 Li 曲率托普利茨严格正定性与舒尔主元超指数坍缩界（手工推导，以 [@conj-riemann-hypothesis] 为前提）"}
**手工推导（以 [@conj-riemann-hypothesis]、[@rem-ch34-li-toeplitz-negative-index] 的零点和表示以及冻结定理 `actual_complex_pairWeight_hasSum`、`schur_quadratic_is_least` 为前提）。** 将上半平面内全部**互异**非平凡零点按正虚部递增排为 $\rho_k = \frac{1}{2} + i\gamma_k$（$0 < \gamma_1 < \gamma_2 < \cdots$，$\gamma_1 \approx 14.13472514$），各自重数为 $m_k \ge 1$，并记 $T_N := T_N(c^{\mathrm{Li}})$ 及第 $(N+1)$ 个舒尔补主元 $\pi_N := \frac{\det T_{N+1}}{\det T_N}$（$N \ge 1$，$\pi_0 := 1$；注意 [@rem-ch34-li-toeplitz-finite-certificate] 中提到的 $T_{100}$ 的“第 $100$ 个主元 $\approx 10^{-401}$”即此记号下的 $\pi_{99}$）。则：

1. **全尺寸严格正定与纯原子概率测度**：$\mu_{\mathrm{Li}} := \frac{1}{2\lambda_1}\sum_{\rho\text{ 互异}}\frac{m_\rho}{\lvert\rho\rvert^2}\,\delta_{u_\rho}$ 是单位圆 $S^1$ 上具有可数无穷原子集 $\{u_\rho\} \subset S^1 \setminus \{1\}$、拓扑支撑为其闭包 $\{u_\rho\} \cup \{1\}$（唯一聚点为 $u = 1$）的纯原子波莱尔概率测度，满足 $c^{\mathrm{Li}}_k = \int_{S^1} u^k\,d\mu_{\mathrm{Li}}(u)$（$\forall k \in \mathbb{Z}$）。由此对一切 $N \ge 1$ 均有 $T_N \succ 0$（$\det T_N > 0$、$\lambda_{\min}(T_N) > 0$）且 $\lambda_n = \lambda_1\mathbf{1}_n^* T_n \mathbf{1}_n > 0$。
2. **零点消去多项式给出的无参数舒尔主元上界**：记剔除前 $K$ 对共轭零点后的剩余概率质量为 $\tau_K := 1 - \frac{1}{\lambda_1}\sum_{k=1}^K \frac{m_k}{\lvert\rho_k\rvert^2} \in (0, 1)$（$K \ge 1$，$\tau_0 := 1$）。则对一切 $K \ge 1$ 与 $N \ge 1$，成立严格上界：
   $$
   0 < \lambda_{\min}(T_{2K+1}) \le \pi_{2K} < \tau_K \prod_{k=1}^K \frac{1}{\lvert\rho_k\rvert^4} < \prod_{k=1}^K \frac{1}{\lvert\rho_k\rvert^4}, \qquad \pi_{2K+1} < \frac{\tau_K}{\lvert\rho_{K+1}\rvert^2}\prod_{k=1}^K \frac{1}{\lvert\rho_k\rvert^4},
   $$
   以及仅依赖首零点 $\rho_1$ 的初等二项瑞利界与切比雪夫短弧界：
   $$
   \lambda_{\min}(T_{N+1}) \le \binom{2N}{N}^{-1}\lvert\rho_1\rvert^{-2N}, \qquad \pi_{2K} \le 4\bigl(1 + 4\gamma_1^2\bigr)^{-2K}.
   $$
3. **超指数坍缩与条件数爆破**：当 $N \to \infty$ 时，$\pi_N^{1/N} \to 0$、$\lambda_{\min}(T_N)^{1/N} \to 0$，且 $2$-条件数 $\kappa_2(T_N) := \lambda_{\max}(T_N)/\lambda_{\min}(T_N)$ 满足 $\kappa_2(T_N)^{1/N} \to +\infty$。结合黎曼—冯·曼戈尔特零点计数（文献结果，且无需假定单零点，因互异第 $k$ 纵坐标 $\gamma_k$ 不小于计重数第 $k$ 纵坐标 $\tilde\gamma_k \sim \frac{2\pi k}{\ln k}$），得到定量超指数衰减上界
   $$
   \ln\lambda_{\min}(T_{N+1}) \;\le\; \ln\pi_N \;\le\; -2N\ln N + 2N\ln\ln N + O(N) \qquad (N \to \infty).
   $$

**证明。** *第 1 款*：由 [@conj-riemann-hypothesis]，每颗非平凡零点均具形式 $\rho = \frac{1}{2} + i\gamma_\rho$，故 $\rho^* = 1 - \bar\rho = \rho$、$u_\rho = 1 - \frac{1}{\rho} = -\frac{\bar\rho}{\rho} \in S^1$、$v_\rho = \frac{1}{2\rho(1-\rho)} = \frac{1}{2\lvert\rho\rvert^2} > 0$。代入 [@rem-ch34-li-toeplitz-negative-index] 证明 *(a)* 与冻结定理 `actual_complex_pairWeight_hasSum`（$\sum_\rho m_\rho v_\rho = \lambda_1$）即得概率测度表示 $c^{\mathrm{Li}}_k = \int_{S^1} u^k\,d\mu_{\mathrm{Li}}(u)$。对任一非零向量 $x \in \mathbb{C}^N$，次数不超过 $N - 1$ 的非零多项式 $h(u) = \sum_{j=0}^{N-1}\overline{x_j}u^j$ 至多有 $N - 1$ 个根，而 $\mu_{\mathrm{Li}}$ 拥有无穷多个带正权的原子，故 $x^* T_N x = \int_{S^1}\lvert h(u)\rvert^2\,d\mu_{\mathrm{Li}}(u) > 0$。

*第 2 款*：将 $T_{N+1}$ 按前 $N$ 维与末维分块，对固定末分量 $x_N = 1$ 调用冻结定理 `schur_quadratic_is_least`（[@thm-ch34-arc-riemann-sagitta-hb-stokes-bridge] 第 5 款），即得塞格—舒尔变分刻画 $\pi_N = \min\{\int_{S^1}\lvert P(u)\rvert^2\,d\mu_{\mathrm{Li}}(u) : P\text{ 为 }N\text{ 次首一多项式}\}$；又任一首一多项式的系数向量满足 $\lVert x\rVert_2^2 \ge 1$，故 $\lambda_{\min}(T_{N+1}) \le \pi_N$。对临界线上任意两零点 $\rho = \frac{1}{2} + i\gamma_\rho$ 与 $\rho_k = \frac{1}{2} + i\gamma_k$，直接通分 $u_\rho - u_{\rho_k} = \frac{\rho - \rho_k}{\rho\rho_k} = \frac{i(\gamma_\rho - \gamma_k)}{\rho\rho_k}$ 给出精确共轭对恒等式
$$
\lvert u_\rho - u_{\rho_k}\rvert\,\lvert u_\rho - u_{\bar\rho_k}\rvert = \frac{\lvert\gamma_\rho^2 - \gamma_k^2\rvert}{\lvert\rho\rvert^2\lvert\rho_k\rvert^2}.
$$
当 $\lvert\gamma_\rho\rvert > \gamma_k$ 时，$0 < \gamma_\rho^2 - \gamma_k^2 < \gamma_\rho^2 + \frac{1}{4} = \lvert\rho\rvert^2$，故上式严格小于 $\lvert\rho_k\rvert^{-2}$！取 $2K$ 次首一零点消去多项式 $Q_{2K}(u) := \prod_{k=1}^K (u - u_{\rho_k})(u - u_{\bar\rho_k})$，它在前 $K$ 对共轭零点上全部归零，而在其余每颗零点（$\lvert\gamma_\rho\rvert > \gamma_K$）上均满足 $\lvert Q_{2K}(u_\rho)\rvert^2 < \prod_{k=1}^K\lvert\rho_k\rvert^{-4}$；对 $\mu_{\mathrm{Li}}$ 积分（每对共轭零点的总质量为 $2\cdot\frac{m_k}{2\lambda_1\lvert\rho_k\rvert^2} = \frac{m_k}{\lambda_1\lvert\rho_k\rvert^2}$）立即得到 $\pi_{2K} < \tau_K \prod_{k=1}^K \lvert\rho_k\rvert^{-4}$。奇数步取 $Q_{2K+1}(u) := (u - 1)Q_{2K}(u)$：对每颗存活零点（$\lvert\gamma_\rho\rvert \ge \gamma_{K+1}$）均有 $\lvert u_\rho - 1\rvert = \lvert\rho\rvert^{-1} \le \lvert\rho_{K+1}\rvert^{-1}$，从而立得奇数步上界。取 $P(u) = (u - 1)^N$（系数平方和为 $\sum_{j=0}^N\binom{N}{j}^2 = \binom{2N}{N}$，且 $\lvert u_\rho - 1\rvert \le \lvert\rho_1\rvert^{-1}$）得二项瑞利界。最后，全部 $u_\rho = e^{i\theta_\rho}$ 落在短弧 $\lvert\theta_\rho\rvert \le \theta_1 = 2\arctan\frac{1}{2\gamma_1}$ 上，令 $c = \frac{1+\cos\theta_1}{2}$、$r = \frac{1-\cos\theta_1}{2} = \sin^2\frac{\theta_1}{2} = \frac{1}{4\lvert\rho_1\rvert^2} = \frac{1}{1 + 4\gamma_1^2}$，取 $2K$ 次首一多项式 $P_{2K}^{\mathrm{Cheb}}(u) := 2^K u^K \tilde T_K\!\bigl(\frac{u+u^{-1}}{2}\bigr)$（其中 $\tilde T_K(x) = 2^{1-K}r^K T_K(\frac{x-c}{r})$ 为 $[\cos\theta_1, 1]$ 上的 $K$ 次首一切比雪夫多项式），在整段弧上 $\lvert P_{2K}^{\mathrm{Cheb}}(e^{i\theta})\rvert \le 2r^K = 2(1 + 4\gamma_1^2)^{-K}$，平方积分即得切比雪夫短弧界。

*第 3 款*：由于 $\gamma_k \to \infty$，第 2 款直接给出 $\pi_N^{1/N} \to 0$；又因 $\lambda_{\max}(T_N) \ge \frac{1}{N}\operatorname{tr}(T_N) = 1$，有 $\kappa_2(T_N) \ge 1/\lambda_{\min}(T_N) \ge 1/\pi_{N-1}$，故 $\kappa_2(T_N)^{1/N} \to \infty$。对 $\ln\pi_N$，由 $\gamma_k \ge \tilde\gamma_k \sim \frac{2\pi k}{\ln k}$ 与斯特林公式求和 $\sum_{k=1}^K 4\ln\tilde\gamma_k = 4K\ln K - 4K\ln\ln K + O(K) = 2N\ln N - 2N\ln\ln N + O(N)$（$N = 2K$ 或 $2K+1$）即证。$\square$

**高精度数值核验（`NUM`，650 位与 725 位十进制两套独立计算一致至至少 62 位有效数字，下表全部数值由 725 位计算四舍五入至 8 位有效数字；复现 [@ex-ch34-toeplitz-versus-li-numbers] 的 $\det T_{20} \approx 3.18781398\times 10^{-599}$ 与 $\lambda_{\min}(T_{20}) \approx 5.24343443\times 10^{-74}$）：**

| $K$（$N = 2K$） | 最小特征值 $\lambda_{\min}(T_{2K+1})$ | 舒尔主元 $\pi_{2K}$ | 加权零点消去界 $\tau_K\prod_{k\le K}\lvert\rho_k\rvert^{-4}$ | 裸乘积界 $\prod_{k\le K}\lvert\rho_k\rvert^{-4}$ | 切比雪夫短弧界 $4(1+4\gamma_1^2)^{-2K}$ |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **$1$**（$2$） | $6.0739974\times 10^{-7}$ | $3.6384352\times 10^{-6}$ | $1.9580912\times 10^{-5}$ | $2.4989889\times 10^{-5}$ | $6.2474723\times 10^{-6}$ |
| **$2$**（$4$） | $6.8815792\times 10^{-14}$ | $4.8017843\times 10^{-12}$ | $8.7632531\times 10^{-11}$ | $1.2781261\times 10^{-10}$ | $9.7577277\times 10^{-12}$ |
| **$5$**（$10$） | $9.6516331\times 10^{-37}$ | $1.7743743\times 10^{-31}$ | $1.7132447\times 10^{-28}$ | $3.2339135\times 10^{-28}$ | $3.7177634\times 10^{-29}$ |
| **$10$**（$20$） | $2.7777433\times 10^{-78}$ | $3.8048932\times 10^{-67}$ | $2.0801916\times 10^{-61}$ | $5.0252029\times 10^{-61}$ | $3.4554411\times 10^{-58}$ |
| **$20$**（$40$） | $4.2295995\times 10^{-168}$ | $4.5127487\times 10^{-145}$ | $4.2755248\times 10^{-134}$ | $1.3837101\times 10^{-133}$ | $2.9850183\times 10^{-116}$ |
| **$50$**（$100$） | $4.9588402\times 10^{-465}$ | $4.4500364\times 10^{-406}$ | $8.8761458\times 10^{-380}$ | $4.5017892\times 10^{-379}$ | $1.9243210\times 10^{-290}$ |

对比最后两列可见：仅用首零点弧长 $\theta_1$ 的切比雪夫界在 $K = 1, 2$ 时较紧，但本质上只是单指数衰减 $(1 + 4\gamma_1^2)^{-N}$；到了 $K = 50$（$N = 100$），它落后零点消去界近 $90$ 个数量级。从解析上界看，全部临界线零点向唯一聚点 $u = 1$ 的算术拥挤迫使舒尔补主元 $\pi_N$ 至少以 $\exp(-2N\ln N + 2N\ln\ln N + O(N))$ 速率超指数坍缩（$2$-条件数 $\kappa_2(T_N)$ 至少以同级超指数速率爆破；第 3 款证明的是衰减上界而非匹配下界），且数值上已有 $\pi_{100} \approx 4.45\times 10^{-406}$、$\lambda_{\min}(T_{101}) \approx 4.96\times 10^{-465}$——这解释了为什么 [@rem-ch34-li-toeplitz-finite-certificate] 对 $T_{100}$ 正定性做直接行列式/主元球算术核验时须动用超高工作精度（如该处采用的 8,000 至 30,000 比特级展开）：正定性在每个 $N$ 上始终严格成立，但数值病态程度以超指数速率急剧恶化。
:::

::: {.remark #rem-ch34-dirichlet-hb-kernel-positivity title="狄利克雷 GRH 向本原复特征的推广：非对称零点谱下的埃尔米特—比勒再生核严格正定性（手工推导，以 [@conj-riemann-hypothesis] 为前提）"}
**手工推导（以 [@conj-riemann-hypothesis] 中的 `PrimitiveDirichletLZerosOnLine` 及经典本原狄利克雷 $L$-函数函数方程与阿达马乘积为前提，文献见 Davenport, *Multiplicative Number Theory*, Ch. 9, 12, 16）。** 设 $\chi \pmod q$（$q \ge 2$）为**本原（primitive）**狄利克雷特征，奇偶性 $\mathfrak{a} \in \{0, 1\}$ 满足 $\chi(-1) = (-1)^{\mathfrak{a}}$，记高斯和 $\tau(\chi) := \sum_{a=1}^q \chi(a)e^{2\pi i a/q}$、单位模根数 $\varepsilon(\chi) := \frac{\tau(\chi)}{i^{\mathfrak{a}}\sqrt{q}}$（$\lvert\varepsilon(\chi)\rvert = 1$）与完备 $L$-函数

$$
\xi(s, \chi) := \left(\frac{q}{\pi}\right)^{(s+\mathfrak{a})/2}\Gamma\!\left(\frac{s+\mathfrak{a}}{2}\right)L(s, \chi).
$$

对**复本原特征** $\chi \neq \bar\chi$，完备函数 $\xi(s, \chi)$ 不再具有实轴对称性 $\xi(\bar s,\chi) \neq \overline{\xi(s,\chi)}$，其临界线零点也不再上下成对对称；然而只要按单位根数相位 $e^{2i\theta_\chi} = \varepsilon(\chi)$（$\theta_\chi \in \mathbb{R}$）旋转定义 $\widetilde{\xi}_\chi(s) := e^{-i\theta_\chi}\xi(s, \chi)$，全纯埃尔米特—比勒双壳层结构与再生核严格正定性依然一字不差地成立：

1. **相位旋转后的跨线共轭对称与零 $\epsilon^2$ 双壳恒等式**：由 $\xi(s, \chi) = \varepsilon(\chi)\,\xi(1 - s, \bar\chi)$ 与 $\overline{\xi(\bar s, \chi)} = \xi(s, \bar\chi)$ 得 $\widetilde{\xi}_\chi(1 - \bar s) = \overline{\widetilde{\xi}_\chi(s)}$（故 $\widetilde{\xi}_\chi$ 在临界线 $\operatorname{Re} s = \frac{1}{2}$ 上取实值）且 $\widetilde{\xi}'_\chi(1 - \bar s) = -\overline{\widetilde{\xi}'_\chi(s)}$。对任意 $\epsilon > 0$，定义推进态与**全纯埃尔米特—比勒对合** $E_{\epsilon,\chi}(s) := \widetilde{\xi}_\chi(s) + \frac{\epsilon}{2}\widetilde{\xi}'_\chi(s)$、$E_{\epsilon,\chi}^\#(s) := \overline{E_{\epsilon,\chi}(1 - \bar s)} = \widetilde{\xi}_\chi(s) - \frac{\epsilon}{2}\widetilde{\xi}'_\chi(s)$（注意当 $\chi \neq \bar\chi$ 时 $E_{\epsilon,\chi}^\#(s) \neq E_{\epsilon,\chi}(1 - s)$，必须保留 $1 - \bar s$ 共轭定义！），则相位 $e^{-i\theta_\chi}$ 与步长 $\epsilon$ 在核中双双约去，给出相位不变的整再生核
   $$
   K_\chi(w, s) := \frac{E_{\epsilon,\chi}(s)\overline{E_{\epsilon,\chi}(w)} - E_{\epsilon,\chi}^\#(s)\overline{E_{\epsilon,\chi}^\#(w)}}{2\epsilon\bigl[(s - \frac{1}{2}) + (\bar w - \frac{1}{2})\bigr]} = \frac{\xi'(s,\chi)\overline{\xi(w,\chi)} + \xi(s,\chi)\overline{\xi'(w,\chi)}}{2\bigl[(s - \frac{1}{2}) + (\bar w - \frac{1}{2})\bigr]},
   $$
   且在对角线 $s = \frac{1}{2} + u + it$ 上精确满足 $\Delta^{\mathrm{HB}}_{\epsilon,\chi}(u, t) := \lvert E_{\epsilon,\chi}(\frac{1}{2}+u+it)\rvert^2 - \lvert E_{\epsilon,\chi}(\frac{1}{2}-u+it)\rvert^2 \equiv \epsilon\frac{\partial}{\partial u}\lvert\xi(\frac{1}{2}+u+it,\chi)\rvert^2 \equiv 4u\epsilon K_\chi(s, s)$。
2. **阿达马秩一正定展开与有限点组严格正定性**：在 `PrimitiveDirichletLZerosOnLine` 下，对任意本原特征 $\chi \pmod q$（$q \ge 2$），全纯再生核在整个 $\mathbb{C}\times\mathbb{C}$ 上展开为绝对收敛正权秩一级数：
   $$
   K_\chi(w, s) = \frac{1}{2}\sum_{\rho\text{ 互异}} m_\rho \left(\frac{\xi(s, \chi)}{s - \rho}\right)\overline{\left(\frac{\xi(w, \chi)}{w - \rho}\right)}.
   $$
   因此，对开右半平面 $\Omega_+ = \{\operatorname{Re} s > \frac{1}{2}\}$ 内任意有限个互异节点 $s_1, \dots, s_N$，格拉姆矩阵 $[K_\chi(s_a, s_b)]_{1 \le a,b \le N}$ **严格正定**（全部顺序主子式及一切埃尔米特分块舒尔补严格为正），并且横向模方沿全体高度严格递增 $\frac{\partial}{\partial u}\lvert\xi(\frac{1}{2}+u+it,\chi)\rvert^2 = 4u K_\chi(s,s) > 0$（同一论证亦将 $\xi(s)$ 自身的 $K_\epsilon \succeq 0$ 升级为任意有限互异节点组上的严格正定 $[K_\epsilon(s_a, s_b)] \succ 0$）。
3. **非本原特征的边界**：若 $\chi \pmod q$ 由更小导子 $q^* \mid q$（$q^* < q$）的本原特征 $\chi^*$ 诱导，则 $L(s, \chi) = L(s, \chi^*)\prod_{p \mid q,\, p \nmid q^*}(1 - \chi^*(p)p^{-s})$。只要 $q$ 存在至少一个不整除 $q^*$ 的素因子 $p$（使该乘积非空），$L(s, \chi)$ 便在虚轴 $\operatorname{Re} s = 0$ 上额外多出无穷多颗零点并破坏关于 $\operatorname{Re} s = \frac{1}{2}$ 的函数方程对称（反之，若 $q$ 的全部素因子均已整除 $q^*$，例如 $q^* = 3,\; q = 9$，则该乘积为空且 $L(s, \chi) \equiv L(s, \chi^*)$ 与本原 $L$-函数完全一致）；这正是 `the-omega-institute/riemann-hypothesis` 将一般特征的 `DirichletLZerosOnLine` 限定于临界带 $0 < \operatorname{Re} s < 1$、并将完备埃尔米特—比勒核自然限定于本原完备函数 $\xi(s, \chi^*)$ 的精确分析根源。

**证明。** 第 1 款直接按第 31.3.2–31.3.3 节展开分子，利用 $\widetilde{\xi}_\chi(1 - \bar w) = \overline{\widetilde{\xi}_\chi(w)}$ 与 $\widetilde{\xi}'_\chi(1 - \bar w) = -\overline{\widetilde{\xi}'_\chi(w)}$ 确认超平面 $s = 1 - \bar w$ 上分子为零、奇点可去。第 2 款：由本原特征的阿达马乘积（Davenport, Ch. 12），$\frac{\xi'(s,\chi)}{\xi(s,\chi)} = B(\chi) + \sum_{\rho\text{ 互异}} m_\rho\bigl(\frac{1}{s-\rho} + \frac{1}{\rho}\bigr)$，其中每项 $\frac{1}{s-\rho} + \frac{1}{\rho} = \frac{s}{\rho(s-\rho)}$ 绝对可和。由 $\widetilde{\xi}_\chi(1 - \bar s) = \overline{\widetilde{\xi}_\chi(s)}$ 得临界线非零点处 $\operatorname{Re}\frac{\xi'(\frac{1}{2}+it,\chi)}{\xi(\frac{1}{2}+it,\chi)} = 0$；又由 `PrimitiveDirichletLZerosOnLine`，每颗零点 $\rho = \frac{1}{2} + i\gamma_\rho$ 均满足 $\operatorname{Re}\frac{1}{\frac{1}{2}+it - \rho} = 0$，故 $\operatorname{Re} B(\chi) = -\sum_\rho m_\rho\operatorname{Re}(\frac{1}{\rho}) = -\sum_\rho \frac{m_\rho}{2\lvert\rho\rvert^2}$（绝对收敛）。于是 $B(\chi) + \overline{B(\chi)} = -\sum_\rho m_\rho(\frac{1}{\rho} + \frac{1}{\bar\rho})$ 精确抵消掉阿达马和中的常数 $\frac{1}{\rho} + \frac{1}{\bar\rho}$（包括虚部 $\operatorname{Im} B(\chi)$ 在内的全部常数项完全消去！），留下 $\frac{\xi'(s,\chi)}{\xi(s,\chi)} + \overline{\frac{\xi'(w,\chi)}{\xi(w,\chi)}} = \sum_\rho m_\rho\bigl(\frac{1}{s-\rho} + \frac{1}{\bar w-\bar\rho}\bigr) = \bigl[(s-\frac{1}{2})+(\bar w-\frac{1}{2})\bigr]\sum_\rho\frac{m_\rho}{(s-\rho)\overline{(w-\rho)}}$，乘以 $\frac{1}{2}\xi(s,\chi)\overline{\xi(w,\chi)}$ 即得秩一展开。关于严格正定性：若 $\sum_{a,b=1}^N \overline{c_a} c_b K_\chi(s_a, s_b) = 0$，则有理函数 $R(z) := \sum_{b=1}^N \frac{c_b\xi(s_b,\chi)}{s_b - z}$ 在 $\xi(s,\chi)$ 的无穷多颗互异零点（Davenport, Ch. 16）处全部为零，故 $R(z) \equiv 0$；在各互异极点 $s_b \in \Omega_+$ 处取留数得 $c_b\xi(s_b,\chi) = 0$，而 `PrimitiveDirichletLZerosOnLine` 保证 $\xi(s_b,\chi) \neq 0$，迫使 $c_b = 0$（$\forall b$）。$\square$

**模 $5$ 本原复特征的 80 位精度数值核验（`NUM`）：** 取奇本原复特征 $\chi \pmod 5$（$\chi(2) = i$，$\mathfrak{a} = 1$），得 $\tau(\chi) \approx -1.17557050 + 1.90211303\,i$、$\varepsilon(\chi) \approx 0.85065081 + 0.52573111\,i$（$\theta_\chi \approx 0.27678718\;\mathrm{rad}$）。函数方程残差与临界线虚部残差均低于 $2.25\times 10^{-81}$；上下非对称性肉眼可见：$\lvert\xi(0.7+2i,\chi)\rvert \approx 1.11421450 \neq 0.72979185 \approx \lvert\xi(0.7-2i,\chi)\rvert$，绝对值最小的两颗零点位于不对称高度 $t \approx -4.13290371$ 与 $t \approx +6.18357820$。取 $\epsilon = 0.1$，在 $(u, t) = (0.2, 2.0)$ 处 $K_\chi(s, s) \approx 0.13106753$、$\Delta^{\mathrm{HB}}_{\epsilon,\chi} \approx 0.01048540$；在 $(0.3, -3.0)$ 处 $K_\chi(s, s) \approx 0.04685500$、$\Delta^{\mathrm{HB}}_{\epsilon,\chi} \approx 0.00562260$（恒等式残差 $< 10^{-82}$）。在四点非对称采样集 $\{0.7+i,\; 0.8+2i,\; 0.9-1.5i,\; 1.2+0.5i\} \subset \Omega_+$ 上，格拉姆矩阵 $[K_\chi(s_a, s_b)]$ 的四个特征值严格为正（$5.989248\times 10^{-7}$、$3.794266\times 10^{-4}$、$0.01797909$、$0.6418593$），顺序主子式依次为 $0.1850041$、$4.336955\times 10^{-4}$、$1.401905\times 10^{-6}$、$2.622453\times 10^{-12}$，关于后两节点的 $2\times 2$ 分块舒尔补特征值为 $1.833074\times 10^{-6}$ 与 $3.298700\times 10^{-3}$，全部严格正定。
:::

::: {.remark #rem-ch34-modular-scattering-and-physical-boundary title="模散射矩阵无极点带与严格认识论边界：RH/GRH 确立了什么、绝对没有确立什么（手工推导与经典文献结果）"}
**手工推导与经典谱理论文献结果（以 [@conj-riemann-hypothesis] 为前提）。** 在双曲模曲面 $\mathrm{SL}_2(\mathbb{Z})\backslash\mathbb{H}$ 上，非全纯爱森斯坦级数 $E(z, s)$ 的常数项散射系数为 $\varphi(s) := \frac{\Lambda(2s - 1)}{\Lambda(2s)}$（其中 $\Lambda(s) = \pi^{-s/2}\Gamma(s/2)\zeta(s)$ 为 [@def-xi-reading] 的完备 $\zeta$ 读数）。

1. **模散射无极点带与闭极限圆周最优均分误差**：由已冻结的反射与共轭对称（[@thm-xi-reading-entire-reflection]、[@prop-zeta-conjugation-covariance]），在临界线 $s = \frac{1}{2} + it$ 上无条件成立幺正性 $\lvert\varphi(\frac{1}{2} + it)\rvert = 1$（且 $\varphi(\frac{1}{2}) = -1$；80 位精度核验幺正残差 $1.05\times 10^{-81}$）。由于 $\varphi(s)$ 在 $\operatorname{Re} s < \frac{1}{2}$ 的全部极点位于 $s = \rho/2$（此外仅在 $s = 1$ 处有一个对应常数特征函数的平凡单极点）、在 $\operatorname{Re} s > \frac{1}{2}$ 的全部零点位于 $s = (1+\rho)/2$（此外仅在 $s = 0$ 处有一个平凡单零点），结合 [@conj-riemann-hypothesis] 立即得出：$\varphi(s)$ 在整个开带 **$\frac{1}{4} < \operatorname{Re} s < \frac{3}{4}$ 内全纯且无零点**，其在 $\operatorname{Re} s < \frac{1}{2}$ 内的全部非平凡复散射共振极点严格锁死在直线 $\operatorname{Re} s = \frac{1}{4}$ 上（最低一对位于 $\frac{1}{4} \pm i\frac{\gamma_1}{2} \approx 0.25 \pm 7.06736257\,i$），而在 $\operatorname{Re} s > \frac{1}{2}$ 内的全部非平凡散射零点严格锁死在 $\operatorname{Re} s = \frac{3}{4}$ 上。由 D. Zagier（*Automorphic Forms, Representation Theory and Arithmetic*, Springer, 1981, 275–301）与 P. Sarnak（*Comm. Pure Appl. Math.* **34**, 719–739, 1981），这一最优无极点带无条件确立闭极限圆周在模曲面上的锐利均分误差界：对任意紧支光滑函数 $f \in C_c^\infty(\mathrm{SL}_2(\mathbb{Z})\backslash\mathbb{H})$ 与 $\varepsilon > 0$，
   $$
   \int_0^1 f(x + iy)\,dx = \frac{3}{\pi}\int_{\mathrm{SL}_2(\mathbb{Z})\backslash\mathbb{H}} f(z)\,\frac{dx\,dy}{y^2} + O_{f,\varepsilon}\!\bigl(y^{3/4 - \varepsilon}\bigr) \qquad (y \to 0^+).
   $$
2. **必须拒绝的过度外推与物理/图论认识论边界**：严格区分“解析数论定理的真实蕴含”与“未经证明的物理或谱图论联想”是本书的硬约束：
   * **不证明本书的任何物理模型假设**：RH 与狄利克雷 GRH **绝不**推出玻恩规则、$3+1$ 维爱因斯坦引力与牛顿常数（[@prob-ch34-gravity-dynamics-and-coupling]）、宇宙学常数标度与过去假设（[@prob-ch34-past-hypothesis-and-cosmological-constant]）、标准模型三代手征谱与规范耦合统一（[@prob-ch34-sm-generations-and-couplings]、[@prob-ch39-af-gut-threshold-and-proton-stability]），也不推出算术枢轴横向移位纠缠的面积律衰减（[@prob-ch34-arithmetic-pivot-area-law]）；这些问题的 `MODEL` 与 `OPEN` 地位保持原样。
   * **拉马努金扩展图不依赖 GRH**：经典的 Lubotzky–Phillips–Sarnak（1988）拉马努金图谱隙界无条件源于 Deligne（1974）对权 $2$ 全纯模形式拉马努金—彼得松猜想的证明，而非狄利克雷 GRH；GRH 仅在需要确定性选取最小二次非剩余或生成元时提供算法界（见 [@rem-rh-grh-direct-consequences] 第 4 款）。
   * **量子混沌与希尔伯特—波利亚算符仍开放**：$\varphi(s)$ 位于 $\operatorname{Re} s < \frac{1}{2}$ 的全部非平凡散射极点归位 $\operatorname{Re} s = \frac{1}{4}$ 虽清除了异常复共振，但并未构造出以 $\{\gamma_k\}$ 为谱的自伴算符，也未证明蒙哥马利对关联 / GUE 统计或单零点猜想。
:::

## 31.3.4 形式化审视：圆弧微积分公理内闭环与通往经典 ZFC 的最后一架舒尔枢轴桥 {#sec-ch34-31-4}

站在 Lean 4 机器形式化验证与经典 ZFC 公理系统的严格标尺下审视整条推导链，我们可以用一张四行对照表，把“本节自身证出的等价关系、外部形式化证明 [@conj-riemann-hypothesis] 带来的无条件闭合，以及仍在等待独立乘性构造的开放靶点”刻画得一清二楚：

| 证明链核心模块 | 极小圆弧体微积分状态 | 经典 ZFC 数论与复分析对应定理 | 形式化与认识论状态 |
| :--- | :--- | :--- | :--- |
| **二阶矢高临界相变起点** | 素数旋子矢高和在半密度 $\sigma = \frac{1}{2}$ 首次发散（`MODEL`） | 梅滕斯定理（`E₃.bound''` 对偶）与 $\sigma > \frac{1}{2}$ 素数级数收敛 | **ZFC 已严格成立（梅滕斯第三定理已 `LEAN ✓`）** |
| **推进态正逆双壳层恒等式** | $\Delta_\epsilon^{\mathrm{HB}}(u,t) \equiv \epsilon\frac{\partial}{\partial u}\lvert\xi\rvert^2$ 零 $\epsilon^2$ 误差锁死径向导数 | 完备 $\xi$ 对称（`LEAN ✓`）与 Sondow–Dumitrescu（2010）径向单调等价定理 | **本节自身证出恒等式与等价 $K_\epsilon(s,s) \ge 0 \iff \operatorname{RH}$；结合外部已验证的 [@conj-riemann-hypothesis] 现无条件成立 $\Delta_\epsilon^{\mathrm{HB}} > 0$** |
| **有限网格斯托克斯零涡旋** | 共棱正反遍历零误差抵消，封死右半带零绕数 $N(\mathcal{R}) \equiv 0$ | 单纯上边缘正合（`LEAN ✓`）、辐角原理与无混叠条件 $\lvert\Delta_e\arg\xi\rvert < \pi$ | **本节自身证出条件蕴含；结合外部已验证的 [@conj-riemann-hypothesis] 现对一切 $\mathcal{R} \subset \Omega_+$ 无条件成立 $N(\mathcal{R}) \equiv 0$** |
| **再生核严格正定性 $K_\epsilon \succ 0$** | 由比较公理不坍缩格拉姆半正定性内禀赋予（`MODEL` 公设） | 德布朗热—拉加里亚斯核正定等价判据（区别于 Conrey–Li 反驳的裸移位条件） | **由外部已验证的 [@conj-riemann-hypothesis] 无条件闭合（未冻结于 `trureturing`）；独立乘性舒尔补构造路径仍 `OPEN`（[@prob-ch34-schur-hb-kernel-positivity-bridge]）** |

请务必看清第四行背后一段极其关键、在通俗转述中常被混淆的当代解析数论史实（`文献结果`）：

1. **全纯核正定 $K_\epsilon \succeq 0$ 与黎曼猜想严格等价，现已由外部形式化证明无条件闭合**：如第 31.3.3 节所证，对全纯对合定义的 $K_\epsilon(w, s)$ 而言，$K_\epsilon \succeq 0$（乃至对角线 $K_\epsilon(s,s) \ge 0$）在 ZFC 中是黎曼猜想的**充要条件**（Lagarias 1999；Sondow & Dumitrescu 2010）——结合外部已验证的 [@conj-riemann-hypothesis]，裸推进态 $E_\epsilon(s) = \xi(s) + \frac{\epsilon}{2}\xi'(s)$ 的再生核 $K_\epsilon$ 本身现已无条件严格正定（见 [@rem-ch34-dirichlet-hb-kernel-positivity]）！
2. **Conrey 与 Li（2000）究竟证伪了什么？为什么德布朗热的裸证明路线会卡壳？** 德布朗热（de Branges 1986, 1992, 1994）当年试图在 ZFC 中不假定 RH 而**直接证明**埃尔米特—比勒正定性时，调用了一条比 $K_\epsilon \succeq 0$ **严格更强的充分判据——单位平移正定性条件（shift positivity）**，即要求德布朗热空间 $\mathcal{H}(E_{\mathrm{dB}})$（其中 $E_{\mathrm{dB}}(z) := \xi(1 - \hat{\mathbf{i}}z)$）中一切满足 $F(z + \hat{\mathbf{i}}) \in \mathcal{H}(E_{\mathrm{dB}})$ 的测试整函数均服从 $\operatorname{Re}\langle F(z + \hat{\mathbf{i}}),\, F(z)\rangle_{\mathcal{H}(E_{\mathrm{dB}})} \ge 0$。然而 J. B. Conrey 与 X.-J. Li（*IMRN* **2000**(18), 929–940）用数值计算（MATHEMATICA）给出了反例（他们的 $\xi$ 是本书 $\xi$ 的 $2$ 倍，原文数值为 $-\operatorname{Re}\{\xi'(\rho_{34})\xi(1 + \rho_{34})\} = -5.389\times 10^{-69}$，换算到本书的归一化即下式）：对未经算术重整修饰的裸 $\xi$ 函数，仅在第 $34$ 颗真实非平凡零点 $\rho_{34} \approx \frac{1}{2} + 111.0295\hat{\mathbf{i}}$ 处取单点求值核见证，平移内积实部便跌破零线：

   $$
   \frac{1}{2\pi}\operatorname{Re}\!\Bigl[\overline{\xi'(\rho_{34})}\,\xi(\rho_{34} + 1)\Bigr] \approx -2.1443 \times 10^{-70} < 0!
   $$

3. **极小圆弧体与舒尔补几何给出的病根诊断（`MODEL`，诠释性说明，不是定理）**：为什么裸的 $\xi(s)$ 哪怕满足 $K_\epsilon \succ 0$，一做宏观单位实平移 $s \mapsto s + 1$ 就会撞出负值？根源恰恰与我们在 [§31.2](ch34-s29-arithmetic-pivots-and-resonant-tunneling.md#sec-ch34-arithmetic-pivots-and-resonant-tunneling) 解剖图兰假零点时发现的病灶同出一源：**经典 ZFC 定义的原始 $\zeta(s)$ 建立在坍缩的一维加法整数环 $\mathbb{Z}\otimes_{\mathbb{Z}}\mathbb{Z} \cong \mathbb{Z}$ 上，混入了 $s = 1$ 宏观体积极点的余波、阿基米德伽马因子的高阶曲率扭曲以及尚未经舒尔补消元的合数冗余相位！** 直接跨步 $\rho_{34} \mapsto \rho_{34} + 1$ 硬拉内积，等于不设枢轴中继站而强行横跨整座临界带势垒。

虽然经典黎曼猜想本身已由 2026 年的外部定正幺正群 $\theta$-提升链证明确立（[@conj-riemann-hypothesis]），但沿着乘性波前与分块舒尔补消元机制寻找一条**完全独立、可直接冻结入本书 `trureturing` 仓库**的德布朗热—舒尔补证明路径，依然是衔接 [§31.2](ch34-s29-arithmetic-pivots-and-resonant-tunneling.md#sec-ch34-29-4) [@prob-ch34-arithmetic-pivot-area-law] 的重要开放问题：

::: {.remark #rem-ch34-modifier-classification-and-shift-nogo title="对称整函数修饰子的完全正定分类、德布朗热移位相位公式与多项式—高斯修饰子不行定理（手工推导与高精度数值，未在本书形式化）"}
**手工推导与 350 比特 Arb 区间算术核验（`NUM`，未在本书形式化）。** 在正式列出 [@prob-ch34-schur-hb-kernel-positivity-bridge] 之前，先用两组自包含定理划清整函数修饰子 $M(s)\,\xi(s)$ 的两条硬分析边界：（一）单靠“$M$ 的零点全在临界线上”并不足以保持埃尔米特—比勒核正定性，指数因子的二阶亏格符号必须满足拉盖尔—波利亚（Laguerre–Pólya）限制 $Q(z) = a z^2$（$a \ge 0$）；（二）德布朗热（de Branges）的固定步长 $\delta$-移位正定性即便在零点全居临界线时也会因紧密零点间距或正高斯相位漂移 $2a\delta\gamma$ 而失守，且多项式—高斯修饰子族面对固定步长的几乎所有正高斯系数以及变步长 $\delta \to \infty$（在任一满足 $M(\rho) \neq 0$ 的 $\xi$ 正高度简单零点 $\rho$ 处）均存在严格禁阻。

1. **精确乘积核恒等式与对称整函数修饰子的完全正定分类**：记中心变量 $z := s - \frac{1}{2}$ 与本节的 $\epsilon$-无关埃尔米特—比勒再生核 $K_F(w, s) := \frac{F'(s)\overline{F(w)} + F(s)\overline{F'(w)}}{2(s + \bar{w} - 1)}$。对任意非恒零整函数 $M(s)$ 与 $\Xi(s) := M(s)\,\xi(s)$，导数乘积法则在超平面 $s + \bar{w} = 1$ 之外（即 $s + \bar{w} \neq 1$）给出精确逐点恒等式

   $$
   K_{M\xi}(w, s) \;=\; M(s)\overline{M(w)}\,K_\xi(w, s) \;+\; \xi(s)\overline{\xi(w)}\,K_M(w, s)
   $$

   （当 $M$ 偶且实对称、即 $M(1 - s) = M(s)$ 且 $M(\bar{s}) = \overline{M(s)}$ 时，分子沿 $s + \bar{w} = 1$ 恒为零，故 $K_M$、$K_\xi$ 与 $K_{M\xi}$ 均延拓为 $\mathbb{C}\times\mathbb{C}$ 上关于 $s$ 全纯、关于 $w$ 反全纯——即关于 $(s, \bar{w})$ 整全纯——的函数，恒等式随之延拓至全 $\mathbb{C}\times\mathbb{C}$；350 比特 Arb 在四节点 $\{0.73+0.31i,\ 1.18-0.69i,\ 1.54+1.10i,\ 2.07-1.45i\}$ 的全部 $16$ 对有序节点上对四个测试修饰子 $e^{\pm 0.01 z^2}(1 + z^2/100)$ 与 $e^{\pm 10^{-4} z^4}$ 核验了该恒等式，全部残差区间含零且向外取整后的绝对上界低于 $3.6 \times 10^{-103}$）。设 $M \not\equiv 0$ 为有限阶、偶且实对称的整函数，其临界线非中心零点按重数计满足逆平方可和 $\sum_{\mu > 0} m_\mu/\mu^2 < \infty$。则**$K_M \succeq 0$ 在开右半平面 $\Omega_+ = \{\operatorname{Re} s > \frac{1}{2}\}$ 上成立，当且仅当 $M$ 在临界线外无零点且具有拉盖尔—波利亚形式**

   $$
   M\!\left(\tfrac{1}{2} + z\right) \;=\; C\,e^{a z^2}\,z^{2r}\prod_{\mu > 0}\left(1 + \frac{z^2}{\mu^2}\right)^{m_\mu},
   \qquad
   C \in \mathbb{R}\setminus\{0\},\quad a \ge 0,\quad r \in \mathbb{Z}_{\ge 0}.
   $$

   在充分性方向调用 [@conj-riemann-hypothesis] 所登记的外部终端声明 `riemannZeta_eq_zero_re : RiemannZetaZerosOnLine`（给出 $K_\xi \succ 0$，见 [@rem-ch34-dirichlet-hb-kernel-positivity]），**上述同一充要条件亦精确刻画 $K_{M\xi} \succeq 0$ 于 $\Omega_+$**（且一旦满足，任意有限互异节点集上的 $[K_{M\xi}(s_a, s_b)]$ 均严格正定）。

   **证明。** 对角线半正定性 $K_F(s, s) \ge 0$ 使 $\lvert F(\frac{1}{2}+u+it)\rvert^2$ 沿 $u > 0$ 单调不减；若 $F$ 在 $\Omega_+$ 内有零点，则迫使 $F$ 在一条水平区间上恒为零，矛盾，再由反射对称排除左半平面零点。按共轭对合并的阿达马分解遂将 $F$（取 $F = M$ 或 $M\xi$）写成 $C\,e^{Q(z)}z^{2r}\prod_{\mu > 0}(1 + z^2/\mu^2)^{m_\mu}$，其中偶实系数多项式按 $Q(0) = 0$ 归一（常数项吸收进 $C \in \mathbb{R}\setminus\{0\}$；特别地，$\xi(\frac{1}{2}+z)$ 为 $1$ 阶偶整函数，其配对阿达马分解不含非零偶多项式指数项，故 $F = M\xi$ 与 $M$ 具有完全相同的指数多项式 $Q(z)$）。记中心重数 $m_0 := 2r$，则在射线 $z = \varrho e^{i\theta}$（$\varrho > 0$、$\theta \in (-\frac{\pi}{2}, \frac{\pi}{2})$）上，归一化对角线核为

   $$
   \frac{K_F(s, s)}{\lvert F(s)\rvert^2} \;=\; \frac{\operatorname{Re} Q'(z)}{2\operatorname{Re} z} \;+\; \frac{1}{2}\sum_{\mu \in \mathbb{R}}\frac{m_\mu}{\lvert z - i\mu\rvert^2}.
   $$

   其中中心项 $\frac{r}{\varrho^2} \to 0$，而对一切 $\mu \neq 0$ 直接配方得精确一致下界 $\lvert \varrho e^{i\theta} - i\mu\rvert^2 = (\varrho - \mu\sin\theta)^2 + \mu^2\cos^2\theta \ge \mu^2\cos^2\theta$。结合假设 $\sum_{\mu > 0} m_\mu/\mu^2 < \infty$ 与冻结定理 [`actual_complex_pairWeight_hasSum`](lean:D5/S3/Weil/ZeroData/ActualReciprocalSquareBounds.actual_complex_pairWeight_hasSum)（在临界线上该冻结权和给出 $\sum_{\gamma > 0} m_\gamma/(\frac{1}{4}+\gamma^2) < \infty$，远离至多有限个低零点处与 $\gamma^{-2}$ 同阶——实际上因 $\lvert\gamma\rvert > 10$ 全程可比——故 $\sum_{\gamma > 0} m_\gamma/\gamma^2 < \infty$），由控制收敛定理立即推知**沿任意固定射线 $\theta \in (-\frac{\pi}{2}, \frac{\pi}{2})$，当 $\varrho \to +\infty$ 时零点求和项恒趋于 $0$**。由此：若 $Q(z) = a z^2$ 且 $a < 0$，取实射线 $\theta = 0$ 得归一化对角线极限为 $a < 0$；若 $Q(z)$ 含更高偶次首项 $b z^{2m}$（$m \ge 2$、$b \in \mathbb{R}\setminus\{0\}$），因 $(2m - 1)\theta$ 覆盖长度 $(2m-1)\pi \ge 3\pi$ 的开区间，必存在射线 $\theta \in (-\frac{\pi}{2}, \frac{\pi}{2})$ 使 $b\cos((2m-1)\theta) < 0$，沿该射线 $\frac{\operatorname{Re} Q'(z)}{2\operatorname{Re} z} \sim m b\,\frac{\cos((2m-1)\theta)}{\cos\theta}\,\varrho^{2m-2} \to -\infty$。反之，当 $Q(z) = a z^2$ 且 $a \ge 0$ 时，$K_M(w, s) = a\,M(s)\overline{M(w)} + \frac{1}{2}\sum_{\mu \in \mathbb{R}} m_\mu\bigl(\frac{M(s)}{s - (\frac{1}{2}+i\mu)}\bigr)\overline{\bigl(\frac{M(w)}{w - (\frac{1}{2}+i\mu)}\bigr)} \succeq 0$；代入乘积核恒等式即证。$\square$

   **350 比特 Arb 核验（`NUM`）**：即便修饰子在全平面**完全无零点**（从而空洞满足 [@prob-ch34-schur-hb-kernel-positivity-bridge] 原第 2 款的零点位置要求），违反 $Q(z) = a z^2$（$a \ge 0$）仍必然击穿 $K_{M\xi} \succeq 0$：对负高斯 $M(s) = e^{-a_0 z^2}$（实射线 $z = u > 0$，变号点满足 $\sum_{\gamma > 0} m_\gamma/(u^2 + \gamma^2) = a_0$，因左端随 $u > 0$ 严格单调递减趋于 $0$ 而首值超过 $\lambda_1 \approx 0.0231 > a_0$，故交叉点**唯一**），$a_0 = 0.01,\ 0.001,\ 0.0001$ 的 Arb 认证变号交叉点依次为 $u_* \approx 56.428587$、$1341.584644$ 与 $20187.828665$（在 $u = 10^7$ 处归一化对角线分别落至 $\approx -0.00999964$、$-0.00099964$ 与 $-0.00009964$，贴近 $-a_0$）；对四次指数 $e^{+10^{-4}z^4}$（射线 $\theta = \frac{\pi}{3}$）与 $e^{-10^{-4}z^4}$（实射线 $\theta = 0$），将归一化对角线除以 $r^2$ 后指数项为负常数（$-4\times 10^{-4}$ 与 $-2\times 10^{-4}$），而零点求和项的每个分母 $r^2\lvert r e^{i\theta} - i\mu\rvert^2$ 在 $\theta = 0$ 为 $r^4 + \mu^2 r^2$、在 $\theta = \frac{\pi}{3}$ 为 $r^4 \mp \sqrt{3}\mu r^3 + \mu^2 r^2$（导数 $r(4r^2 \mp 3\sqrt{3}\mu r + 2\mu^2)$ 的判别式 $27 - 32 = -5 < 0$ 恒正），故零点项除以 $r^2$ 均严格单调递减，从而唯一变号交叉点分别为 $r_* \approx 8.480527$ 与 $10.086296$（在 $r = 1000$ 处归一化对角线分别跌至 $\approx -399.997464$ 与 $-199.998732$）。相反，对容许正修饰子 $M(s) = e^{0.01 z^2}(1 + z^2/100)$，上述四节点上的修饰子格拉姆矩阵 $[K_M]$ 恰为**秩 $3$ 半正定**（高斯项贡献秩 $1$、单对零点贡献秩 $2$，三正特征值约 $2.287393 \times 10^{-6}$、$4.726681 \times 10^{-4}$ 与 $0.08045701$），而全乘积核 $[K_{M\xi}]$ 严格正定且最小特征值 $\approx 7.444890 \times 10^{-10}$ 经区间认证严格高于缩放裸核 $M M^* \circ K_\xi$ 的最小特征值 $\approx 6.901708 \times 10^{-11}$（半正定增量本身仅保证弱不等式 $\ge$，此处严格增幅由区间算术认证）。

2. **德布朗热 $\delta$-移位正定性的精确相位公式、最小偶次多项式反例与前 500 颗零点审计**：对容许族中的整函数 $\Xi(\frac{1}{2}+z) = C\,e^{a z^2}z^{2r}\prod_{\tau > 0}(1 + z^2/\tau^2)^{m_\tau}$（$a \ge 0$、$\sum m_\tau/\tau^2 < \infty$），在其任一简单正高度临界线零点 $\rho = \frac{1}{2} + i\gamma$（$\gamma > 0$）处，令 $R(u) := \frac{\Xi(\rho + u)}{u\,\Xi'(\rho)}$（$R(0) = 1$）。因该乘积形式的全部零点均位于临界线，自动有 $R(u) \neq 0$（$\forall u > 0$），无需额外假设即可将 $\log R(u)$ 从 $\log R(0) = 0$ 沿水平射线 $u \in [0, \delta]$ 唯一连续解析延拓。结合精确复恒等式 $\overline{\Xi'(\rho)}\,\Xi(\rho + \delta) = \delta\lvert\Xi'(\rho)\rvert^2 R(\delta)$，即得对数积分表示与绝对收敛的配对反正切连续相位公式：

   $$
   \log R(\delta) \;=\; \int_0^\delta\left(\frac{\Xi'(\rho + u)}{\Xi(\rho + u)} - \frac{1}{u}\right)du,
   $$

   $$
   \Theta_\Xi(\gamma; \delta) \;:=\; \operatorname{Im}\log R(\delta) \;=\; 2a\delta\gamma \;-\; 2r\arctan\!\left(\frac{\delta}{\gamma}\right) \;-\; \arctan\!\left(\frac{\delta}{2\gamma}\right) \;+\; \sum_{\tau > 0,\;\tau \neq \gamma} m_\tau\left[\arctan\!\left(\frac{\delta}{\tau - \gamma}\right) - \arctan\!\left(\frac{\delta}{\tau + \gamma}\right)\right].
   $$

   因此实移位见证精确分解为 $\operatorname{Re}\bigl[\overline{\Xi'(\rho)}\,\Xi(\rho + \delta)\bigr] = \delta\lvert\Xi'(\rho)\rvert^2\lvert R(\delta)\rvert\cos\Theta_\Xi(\gamma; \delta)$，其严格为正当且仅当 $\cos\Theta_\Xi(\gamma; \delta) > 0$。该公式立刻揭示：**有限步长移位正定性的失守既可源于临界线上的紧密零点间距，也可在保持全部零点不动时由正高斯相位漂移 $2a\delta\gamma$ 单独触发，均非存在离轴零点的征兆**——
   - **最小偶次全临界线多项式反例（四次即足）**：二次偶多项式 $\Xi_2(\frac{1}{2}+z) = z^2 + t_1^2$ 恒满足 $\operatorname{Re} R(\delta) \equiv 1 > 0$；但对仅含**两对**简单临界线零点的偶四次多项式 $\Xi_4(\frac{1}{2}+z) = (z^2 + t_1^2)(z^2 + t_2^2)$（$0 < t_1 < t_2$、$D := t_2^2 - t_1^2 > 0$），直接展开即得下零点 $\frac{1}{2}+it_1$ 处 $\operatorname{Re} R(\delta) = 1 + \frac{2\delta^2}{D}$，而上零点 $\frac{1}{2}+it_2$ 处精确满足

     $$
     \operatorname{Re} R(\delta) \;=\; 1 - \frac{2\delta^2}{D} \;<\; 0 \qquad\Longleftrightarrow\qquad \delta \;>\; \sqrt{\frac{t_2^2 - t_1^2}{2}}
     $$

     （例如 $(t_1, t_2, \delta) = (0.1, 0.2, 1)$ 时两零点原始实见证精确等于 $+0.002436$ 与 $-0.009456$；另可对照奇三次模型 $z(z^2 + g^2)$ 在 $s = \frac{1}{2}+ig$ 处给出原始见证 $2g^2\delta(2g^2 - \delta^2) < 0 \iff \delta > \sqrt{2}\,g$，取 $g = \frac{1}{2},\ \delta = 1$ 得 $-\frac{1}{4}$；以及偶六次三零点簇 $\prod_{k=-1}^{1}(z^2 + (t_0 + kg)^2)$ 在 $(t_0, g, \delta) = (10, 0.5, 1)$ 的下正零点 $9.5$ 处相位 $\approx 1.738768\;\mathrm{rad} \approx 99.624^\circ$、原始实见证精确为 $-7{,}285{,}882.5$）。
   - **裸 $\xi(s)$ 前 $500$ 颗零点与首对 Lehmer 零点的 350 比特 Arb 审计（`NUM`，有限点符号认证独立于全局 RH）**：在单位移位 $\delta = 1$ 下，前 $500$ 颗零点中**恰有 $32$ 颗给出严格负见证**（编号为 `34, 71, 106, 127, 144, 173, 184, 186, 196, 233, 257, 265, 282, 289, 298, 315, 334, 363, 368, 380, 394, 401, 409, 423, 436, 453, 462, 477, 483, 485, 492, 497`）：首颗失守零点确为 $j = 34$（$\gamma_{34} \approx 111.029536$，本书归一化下 $\frac{1}{2\pi}\operatorname{Re}[\overline{\xi'(\rho_{34})}\,\xi(\rho_{34}+1)] \approx -2.144255 \times 10^{-70}$，连续相位 $\Theta_\xi(\gamma_{34}; 1) \approx 1.658791\;\mathrm{rad} \approx 95.042^\circ$，仅紧邻上零点间距 $\gamma_{35} - \gamma_{34} \approx 0.845124$ 单项即贡献 $+\arctan(1/(\gamma_{35}-\gamma_{34})) \approx +0.869140\;\mathrm{rad}$ 而将总相位推过 $90^\circ$），末颗为 $j = 497$（$\gamma_{497} \approx 808.151815$，相位 $\approx 1.626429\;\mathrm{rad} \approx 93.188^\circ$）。在著名首对 Lehmer 零点 $j = 6709, 6710$（$\gamma_{6709} \approx 7005.062866$、$\gamma_{6710} \approx 7005.100565$，间距 $\approx 0.037698$）上，下零点 $j = 6709$ 在 $\delta = 1$ 处失守（原始实见证 $\approx -7.192528 \times 10^{-4766}$）；而在更小步长 $\delta \in \{0.5, 0.25, 0.1\}$ 下，前 $500$ 颗零点及该 Lehmer 对的两个零点全部保持严格为正。（文献边界须分清：J. B. Conrey & X.-J. Li，*A note on some positivity conditions related to zeta- and $L$-functions*，*Int. Math. Res. Not.* **2000**(18), 929–940，§3.1 式 (3.1)–(3.2)，[10.1155/S1073792800000489](https://doi.org/10.1155/S1073792800000489)，给出了整函数空间移位正定性的 $j = 34$ 反例，其 §4 引述的 Sarnak 解析论证针对另一空间 $\mathcal{F}(W)$ 的商值条件 (3.3)；裸 $\xi$ 在固定 $\delta = 1$ 下是否存在无穷多个严格负的单零点见证，本文不宣称已证。）

3. **多项式—高斯修饰子族的三重移位禁阻结果**：考虑由有限个正虚部临界线零点对（不含中心零点，正半轴总重数 $L := \sum_{\mu > 0} m_\mu < \infty$）与容许高斯因子构成的任意修饰子 $M(\frac{1}{2}+z) = C\,e^{a z^2}z^{2r}\prod_{\mu > 0}(1 + z^2/\mu^2)^{m_\mu}$（$a \ge 0$）：
   - **纯多项式修饰子（$a = 0$）的高高度相位消逝**：在任一不与 $M$ 零点重合的简单零点 $\rho = \frac{1}{2} + i\gamma$ 上，

     $$
     \arg\frac{M(\rho + \delta)}{M(\rho)} \;=\; -\frac{2(r + L)\,\delta}{\gamma} \;+\; \frac{\frac{2}{3}(r + L)\,\delta^3 - 2\delta\sum_{\mu > 0} m_\mu\mu^2}{\gamma^3} \;+\; O(\gamma^{-5}) \;\longrightarrow\; 0 \qquad (\gamma \to \infty).
     $$

     因而任意固定有限次对称修饰子在高高度处仅施加 $O(\gamma^{-1})$ 的消逝相移（例如 $\delta = 1$ 下 $1 + z^2/100$ 原封不动保留前 $500$ 颗零点的全部 $32$ 个负号；即便专门乘入 $1 + z^2/\gamma_{34}^2$ 强行把 $\rho_{34}$ 变为重零点使该处见证归零，其余 $31$ 个负号仍然一个不少！若存在一列相位与 $\pm\frac{\pi}{2}\pmod{2\pi}$ 保持正距离的裸 $\xi$ 失守零点，则任何固定有限次多项式修饰子都必然保留其尾部无穷多颗失守零点）。
   - **正高斯修饰子（$a > 0$）对每个固定步长 $\delta > 0$ 的几乎处处 $50\%$ 失守律**：固定任意 $\delta > 0$ 与上述容许族中的任意有限多项式因子 $P$（仅含临界线零点，故在 $\Omega_+$ 上无零点），将不与 $P$ 零点重合的 $\xi$ 正高度简单临界线零点依次排为 $\tilde\gamma_1 < \tilde\gamma_2 < \cdots$；结合外部已验证的 `riemannZeta_eq_zero_re : RiemannZetaZerosOnLine`（[@conj-riemann-hypothesis]），$P\xi$ 在 $(\rho, \rho + \delta]$ 上处处非零，从而连续相位 $\Theta_{P\xi}(\tilde\gamma_j; \delta)$ 在每颗零点上均有明确定义。由经典局部零点计数 $N(T + 1) - N(T) = O(\log T)$（H. Davenport，*Multiplicative Number Theory*，第 3 版，Ch. 15）与临界线简单零点占正比例的无条件定理（K. Pratt, N. Robles, A. Zaharescu & D. Zeindler，*More than five-twelfths of the zeros of $\zeta$ are on the critical line*，*Res. Math. Sci.* **7**, 2, 2020，§1.3 与 §8，[10.1007/s40687-019-0199-8](https://doi.org/10.1007/s40687-019-0199-8)；[arXiv:1802.10521v3](https://arxiv.org/abs/1802.10521v3)，给出简单临界线零点比例下界 $\kappa^* \ge 0.407511$，其中定理 1.2 针对全体临界线零点），有 $\tilde\gamma_N = O(N)$。对任一非零整数频率 $m \neq 0$ 与有界区间 $[a_1, a_2] \subset (0, \infty)$，将指数和的模方 $\bigl\lvert\frac{1}{N}\sum_{j=1}^N e^{i m(2a\delta\tilde\gamma_j + \Theta_{P\xi}(\tilde\gamma_j; \delta))}\bigr\rvert^2$ 对 $a \in [a_1, a_2]$ 积分，每个非对角项绝对值至多为 $O_{m,\delta,a_1,a_2}\bigl(\min(1, \lvert\tilde\gamma_j - \tilde\gamma_k\rvert^{-1})\bigr)$；按单位高度区间分组求和即得该积分均值为 $O(\log^2 N / N)$。沿 $N = k^2$ 可和并结合 Borel–Cantelli 引理与步间插值，由外尔（Weyl）均分判据推出：**对每个固定 $\delta > 0$ 与勒贝格几乎所有 $a > 0$，相位 $\Theta_{M\xi}(\tilde\gamma_j; \delta) \bmod 2\pi$ 在圆周上均匀分布，严格负见证在简单临界线零点中的比例精确收敛于 $\frac{1}{2}$！**（Arb 在 $\delta = 1$、前 $500$ 颗零点上对 $P \equiv 1$ 实测：$a = 0.01,\ 0.1,\ 1$ 分别产生 **$285$、$248$ 与 $258$** 个严格负见证，约占半数，远糟于裸 $\xi$ 的 $32$ 个！）
   - **无条件变步长 $\delta \to \infty$ 下的单零点无穷次失守**：对上述族中**每一个**固定修饰子 $M$（含任意 $a \ge 0$）与任一不与 $M$ 零点重合的正高度简单零点 $\rho_j = \frac{1}{2} + i\gamma_j$，在半平面 $\operatorname{Re}(\rho_j + \delta) > 1$（即 $\delta > \frac{1}{2}$）上，由本书已冻结的 [@prop-xi-zeros-strip-zeros]（$\xi$ 在 $\operatorname{Re} s \ge 1$ 无零点）与 $M$ 仅含临界线零点即无条件保证 $(M\xi)(\rho_j + \delta) \neq 0$；因而不依赖全局 RH，在 $\delta \in [1, \infty)$ 上连续取 $\arg\bigl(\overline{(M\xi)'(\rho_j)}\,(M\xi)(\rho_j + \delta)\bigr)$（结合 `riemannZeta_eq_zero_re` 时与从 $u = 0$ 延拓的 $\Theta_{M\xi}(\gamma_j; \delta)$ 一致），由斯特林公式即得其渐近为 $2a\gamma_j\delta + \frac{\gamma_j}{2}\log\delta + O(1) \to +\infty$（$\delta \to \infty$），连续穿越无穷多个区间 $(\frac{\pi}{2} + 2\pi k,\ \frac{3\pi}{2} + 2\pi k)$，从而在**单颗零点上无条件迫使无穷多个步长 $\delta > 0$ 给出严格负见证**。

综上，沿 [@prob-ch34-schur-hb-kernel-positivity-bridge] 构造独立证明时，修饰子首先必须落入 $Q(z) = a z^2$（$a \ge 0$）的拉盖尔—波利亚容许类。至于德布朗热固定步长移位正定性，上述三条结果虽未在逻辑上排除“某个特定多项式或零测度例外 $a > 0$ 恰好在某一指定步长 $\delta$ 下消除全部负见证”的可能性，却彻底封死了“在多项式—高斯族内跨一切 $\delta > 0$ 一致修复、或借一般正高斯因子在固定步长下修复”的路线（顺便指出，单点标量见证除以 $\delta$ 后取 $\delta \to 0^+$ 仅给出 $\lvert\Xi'(\rho)\rvert^2 > 0$，并不自动推出双变量核正定性）；因此独立证明路径须直接针对双变量埃尔米特—比勒再生核 $K_{M\xi} \succeq 0$ 本身建立论证。
:::

::: {.problem #prob-ch34-schur-hb-kernel-positivity-bridge title="乘性舒尔补枢轴整函数修饰子 $M_L(s)$ 与埃尔米特—比勒再生核的独立证明桥接引理（开放前沿问题）"}
衔接 [@conj-riemann-hypothesis] 与算术枢轴横向移位纠缠面积律问题 [@prob-ch34-arithmetic-pivot-area-law]：在**不循环调用 2026 年外部 $\theta$-提升证明**的前提下，试借助 [@thm-ch34-arc-riemann-sagitta-hb-stokes-bridge] 第 5 款的分块舒尔补极小消元机制（`schur_quadratic_is_least`），在经典 ZFC 与本书所钉 `trureturing` 体系内显式构造一族非恒零有限阶整函数修饰子 $M_L : \mathbb{C} \to \mathbb{C}$（$L \ge 1$ 为乘性波前重整化尺度，或仅需单一尺度 $L$），形成修饰后的完备谱函数 $\Xi_L(s) := M_L(s)\,\xi(s)$ 与圆弧推进态

$$
E_{\epsilon, L}(s) := \left(\mathbf{1} + \frac{\epsilon}{2}\partial_s\right)\bigl[M_L(s)\,\xi(s)\bigr], \qquad E_{\epsilon, L}^\#(s) := \overline{E_{\epsilon, L}(1 - \bar{s})} = E_{\epsilon, L}(1 - s),
$$

使其同时满足以下三条严格条件：

1. **完全 $\zeta$ 对称性与非退化性**：$M_L(s) \not\equiv 0$ 在全平面 $\mathbb{C}$ 上全纯，且满足反射对称 $M_L(1 - s) = M_L(s)$ 与共轭协变 $M_L(\bar{s}) = \overline{M_L(s)}$（从而保证 $E_{\epsilon, L}^\#(s) = \Xi_L(s) - \frac{\epsilon}{2}\Xi'_L(s)$ 全纯，且修饰再生核 $K_{\epsilon, L}(w, s) := \frac{E_{\epsilon, L}(s)\overline{E_{\epsilon, L}(w)} - E_{\epsilon, L}^\#(s)\overline{E_{\epsilon, L}^\#(w)}}{2\epsilon[(s - 1/2) + (\bar{w} - 1/2)]}$ 在 $\mathbb{C}\times\mathbb{C}$ 上关于 $s$ 全纯、关于 $w$ 反全纯，即关于 $(s, \bar{w})$ 处处整全纯无奇点）；
2. **修饰子自身零点的临界线锚定、逆平方可和与拉盖尔—波利亚指数认证**：$M_L(s)$ 自身的全部零点均已无条件严格证明位于临界线 $\operatorname{Re}(s) = \frac{1}{2}$ 上（从而 $M_L(s) \neq 0$ 于 $\Omega_+$），并且其非中心零点按重数满足逆平方可和 $\sum_{\mu > 0} m_\mu/\mu^2 < \infty$、阿达马指数因子满足 $Q(s - \frac{1}{2}) = a(s - \frac{1}{2})^2$ 且 $a \ge 0$（按 [@rem-ch34-modifier-classification-and-shift-nogo] 的分类定理，不含负高斯系数 $a < 0$ 或四次及以上偶次首项，否则即便无零点亦会破坏 $K_{\epsilon, L} \succeq 0$），由此同时保证 $K_{M_L} \succeq 0$；
3. **独立于外部证明的双变量再生核半正定传递**：不借助 [@conj-riemann-hypothesis] 的外部证明，直接证成在某一有限尺度 $L$ 上修饰再生核在 $\Omega_+ \times \Omega_+$ 上满足半正定性 $K_{\epsilon, L} \succeq 0$（鉴于 [@rem-ch34-modifier-classification-and-shift-nogo] 对多项式—高斯族移位正定性的禁阻结果，应直接沿分块舒尔补半正定遗传或其他面向双变量核的机制建立紧凑可形式化证明）——一旦独立证成 $K_{\epsilon, L} \succeq 0$，第 31.3.3 节的单调性加唯一性定理即刻给出黎曼猜想的一条独立自包含证明（或者证明当 $L \to \infty$ 时 $\Xi_L \to \Xi_\infty \not\equiv 0$ 在 $\mathbb{C}$ 上内闭一致收敛——从而导数 $\Xi'_L \to \Xi'_\infty$ 亦内闭一致收敛——且对每个固定有限节点集 $[K_{\epsilon, L}(s_a, s_b)]$ 的负特征值下界趋于 $0$，于是极限核满足 $K_{\epsilon, \infty} \succeq 0$，再对非零极限函数 $\Xi_\infty$ 应用对角单调性即可排除 $\Omega_+$ 内零点，因 $\xi$ 的每个零点在一致极限中均保留为 $\Xi_\infty$ 的零点，遂导出同一结论）。

注意（`手工推导`）：须区分“核正定数学命题本身是否成立”与“不调用外部证明的独立构造性证明”：结合外部已验证的 `riemannZeta_eq_zero_re`（[@conj-riemann-hypothesis]）与第 31.3.3 节的正向论证，平凡修饰子 $M_L \equiv 1$ 及 [@rem-ch34-modifier-classification-and-shift-nogo] 刻画的全体 $a \ge 0$ 拉盖尔—波利亚修饰子均已满足第 1、2 款与第 3 款中的核半正定陈述本身（故“证伪此类容许修饰子上的 $K_{\epsilon, L} \succeq 0$”已被排除）。因此本问题如今不再是判断正定存在与否的真值问题，而是一个**独立的构造性证明与形式化问题**：寻获一枚显式容许修饰子 $M_L$ 及不依赖外部 $\theta$-提升归档、可直接冻结入 `trureturing` 的 $K_{\epsilon, L} \succeq 0$ 乘性舒尔补证明。
:::

::: {.viz src="arc-calculus-riemann-hermite-biehler-sandbox" preset="schur-modifier-conrey-li-bridge" height="500"}
**乘性舒尔枢轴层与 Conrey–Li 障碍：通往独立舒尔补构造的桥接实验卡（`schur-modifier-conrey-li-bridge`）。** 右侧层塔逐层乘入 $F_L = \frac{1}{2}\prod_{k \le L}$，按乘积核恒等式 $K_{M\xi} = (M \otimes \overline{M})\circ K_\xi + (\xi \otimes \overline{\xi})\circ K_M$ 与枢轴块 $\{s_3, s_4\}$ 的分块舒尔补 $S = A - B C^{-1} B^*$（绿色 `LEAN ✓` 锚定 `schur_quadratic_is_least`）追踪四节点核格拉姆矩阵：前十二层临界线因子圆盘（青色）的 $K_M$ 皆半正定，$\lambda_{\min}$ 始终非负（$L = 12$ 时 $0.0582$，节点连弦呈青色）；第 $13$ 层乘入假想离轴四元组 $\delta = 0.22$（品红圆盘）后，其不定的 $K_M$ 将整体 $\lambda_{\min}$ 拉至 $-1.0585 < 0$、连弦翻为品红，直观呈现 Conrey–Li（2000）障碍（`ARGUED`）与舒尔修饰子桥接构型（页面面板仍沿用本书所钉 `trureturing` 仓库未冻结该证明时的三枚红色 `OPEN` 标记；实际认识论上 [@conj-riemann-hypothesis] 已由外部形式化证明确立，仍保持 `OPEN` 的是 [@prob-ch34-arithmetic-pivot-area-law] 与 [@prob-ch34-schur-hb-kernel-positivity-bridge] 的独立舒尔补证明路径）。
:::

::: {.remark #rem-ch34-arc-riemann-literature title="极小圆弧体切入黎曼猜想、德布朗热空间与径向单调判据的文献脉络及五层认识论审计（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节将圆弧体微积分应用于黎曼临界带的全部命题严格遵循五层认识论分级，绝不混淆模型公设、本书所钉仓库内核定理与外部形式化事实：

1. **机器验证的 Lean 4 内核定理锚点（`LEAN ✓`）**：[@thm-ch34-arc-riemann-sagitta-hb-stokes-bridge] 汇拢的十条 `trureturing` 冻结声明——`riemann_zeta_dirichlet_sum_eq_euler_product`、`E₃.bound''`（梅滕斯第三定理）、`xi_reading_differentiable`、`xi_reading_reflection`、`xi_reading_one_sub_conj`、`xiReading_eq_zero_iff_nontrivial`、`full_symmetry_not_fixed_line_localization`、`golden_right_half_strip_implies_rh`、`tetra_defects_incidence_repair_and_exactness` 与 `schur_quadratic_is_least`——均已在所钉提交上经 Lean 4 内核完整检验（`LEAN ✓`）。请注意第 1 款内核定理冻结的是乘积形式的梅滕斯第三定理 $\prod_{p \le \lfloor x\rfloor}(1 - 1/p) \sim e^{-\gamma}/\ln x$，而带显式常数 $M$ 与误差项 $\mathcal{O}(1/\ln x)$ 的素数倒数和梅滕斯第二定理属下一层经典数论文献。
2. **经典解析数论、整函数阿达马乘积、德布朗热空间与径向单调判据文献（未在本书形式化）**：素数倒数和双对数发散律 $\sum_{p \le x} p^{-1} = \ln\ln x + M + \mathcal{O}(1/\ln x)$ 由 F. Mertens（*J. Reine Angew. Math.* **78**, 46–62, 1874）证明；完备函数 $\xi(s)$ 与本原狄利克雷完备函数 $\xi(s, \chi)$ 的阿达马无穷乘积展开详见 H. Davenport（*Multiplicative Number Theory*, 3rd ed., Springer GTM **74**, Ch. 9, 12, 16, 2000）；混合素数部分欧拉乘积与平滑零点磨光因子的临界线渐近逼近公式可参看 S. M. Gonek, C. P. Hughes & J. P. Keating（*Duke Math. J.* **136**(3), 507–549, 2007）。整函数埃尔米特—比勒（Hermite–Biehler）类生成的再生核希尔伯特空间理论由 L. de Branges（*Hilbert Spaces of Entire Functions*, Prentice-Hall, 1968）奠定，并由其本人推进至黎曼 $\zeta$ 移位正定性纲领（L. de Branges, *Bull. Amer. Math. Soc. (N.S.)* **15**(1), 1–17, 1986；*J. Funct. Anal.* **107**(1), 122–210, 1992；*J. Funct. Anal.* **121**(1), 117–184, 1994）；“黎曼猜想等价于 $\operatorname{Re}\frac{\xi'(s)}{\xi(s)} > 0$（$\operatorname{Re}(s) > \frac{1}{2}$）”是已知结果（A. Hinkkanen, *Complex Variables Theory Appl.* **34**, 119–139, 1997），J. C. Lagarias（*Acta Arith.* **89**(3), 217–234, 1999，定理 1.1）对一类整函数给出了它的简短证明；由第 31.3.3 节，它又与 $\xi(s) + a\xi'(s)$（$a > 0$）的埃尔米特—比勒性质及对应再生核的半正定性等价（`手工推导`）；J. C. Lagarias（*Frontiers in Number Theory, Physics, and Geometry I*, Springer, 365–377, 2006）以 $\xi(\frac{1}{2} - iz) + \xi'(\frac{1}{2} - iz)$ 为德布朗热结构函数，按他本人在 *Acta Arith.* **120**, 159–184, 2005 第 6 节中的概述，相应的德布朗热空间存在当且仅当黎曼猜想成立；对裸函数 $E_{\mathrm{dB}}(z) = \xi(1 - iz)$，德布朗热单位平移实部正定性条件不成立（在第 $34$ 颗零点 $\rho_{34}$ 处取负值），这是 J. B. Conrey & X.-J. Li（*Int. Math. Res. Not.* **2000**(18), 929–940, [arXiv:math/9812166](https://arxiv.org/abs/math/9812166)）用数值计算给出的，他们在结论中指出这些正性条件可能过强；黎曼猜想与完备函数模长沿横向实半轴径向严格单调递增（$\frac{\partial}{\partial\sigma}\lvert\xi(\sigma + it)\rvert > 0$ 于 $\sigma > \frac{1}{2}$）的充要等价定理，由 J. Sondow & C. Dumitrescu（*Period. Math. Hungar.* **60**(1), 37–40, 2010, [arXiv:1005.1104](https://arxiv.org/abs/1005.1104)）独立给出简明证明。模散射均分误差见 D. Zagier（1981）与 P. Sarnak（1981，[@rem-ch34-modular-scattering-and-physical-boundary]）。
3. **精确代数恒等式、RH/GRH 新推导与数值基准核算（`手工推导` / `NUM`）**：单素数矢高四阶余项收敛域充要条件 $\sigma > \frac{1}{4}$、临界脊线矢高常数分解 $C_{\mathrm{sag}} = \frac{M}{2} + \Delta C_{\mathrm{sag}} \approx +0.112145790076$、任意步长 $\epsilon$ 下零 $\epsilon^2$ 截断的双壳层恒等式 $\Delta_\epsilon^{\mathrm{HB}}(u, t) \equiv \epsilon\frac{\partial}{\partial u}\lvert\xi\rvert^2$、全纯对合再生核 $K_\epsilon(w, s)$ 的去奇点整函数性与零点模平方和分解、利用单调性与全纯唯一性定理排除任意重数 $m \ge 1$ 离轴零点的四行论证、四元组模方导数平方和分解公式、[@ex-ch34-sagitta-hb-stokes-benchmark] 的全部数值表，以及以 [@conj-riemann-hypothesis] 为前提导出的 Li 曲率托普利茨超指数坍缩界（[@rem-ch34-li-toeplitz-superexponential-collapse]）、本原复特征埃尔米特—比勒核严格正定性（[@rem-ch34-dirichlet-hb-kernel-positivity]）与模散射无极点带及认识论边界（[@rem-ch34-modular-scattering-and-physical-boundary]），均为精确代数推导与多精度复核结果（`NUM`）。
4. **圆弧体微积分公理内闭环模型（`MODEL`）**：将素数视界旋子累计矢高在 $\sigma = \frac{1}{2}$ 处的发散诠释为向心伊藤漂移起点、将比较公理不坍缩格拉姆正定性映射为圆弧推进再生核半正定公设 $K_\epsilon \succeq 0$ 并联立有限网格斯托克斯相消构成公理体系内部的构造性闭环，属于本书建立的统一几何诠释模型（`MODEL`）。这一公设与黎曼猜想等价（第 31.3.3 节），模型内的闭环本身不构成对黎曼猜想的证明。
5. **已知外部形式化事实与仍开放的前沿边界（区别于 `LEAN ✓` 与 `OPEN`）**：经典黎曼猜想与狄利克雷广义黎曼猜想（[@conj-riemann-hypothesis]）已于 2026 年由外部 Lean 4 形式化工程确立并经多重独立内核重放验证（未冻结于本书所钉 `trureturing` 仓库），从而使 $K_\epsilon \succ 0$、$K_\chi \succ 0$、$\Delta_\epsilon^{\mathrm{HB}} > 0$、$T_N(c^{\mathrm{Li}}) \succ 0$、$d_N \to 0$、全次数 $J^{d,n}$ 双曲与 $\Lambda = 0$ 全部无条件成立；而算术枢轴横向移位纠缠面积律（[@prob-ch34-arithmetic-pivot-area-law]）、不循环调用外部证明的乘性舒尔枢轴修饰子独立证明路径（[@prob-ch34-schur-hb-kernel-positivity-bridge]），以及单零点猜想、扩展/大黎曼猜想和全部物理桥接假设（[@rem-ch34-modular-scattering-and-physical-boundary]），依然保持为**开放问题（`OPEN`）**。
:::

站在 $\operatorname{Re}(s) = \frac{1}{2}$ 这道中央临界峡谷回望，极小圆弧体微积分对黎曼临界带的几何读数已如刀刻般分明：在 $\sigma = \frac{1}{2}$ 谷底，无穷素数旋子的品红色二阶弦弧矢高 $\Sigma_{\mathrm{sag}}(\frac{1}{2}; P_\epsilon) = -\frac{1}{2}\ln\varepsilon_{\mathrm{self}} + C_{\mathrm{sag}} + \mathcal{O}(\varepsilon_{\mathrm{self}})$ 恰好跨入半密度发散相区，但每个样本连乘仍是单位旋子，模长恒为 $1$；只有在相互独立的对称符号下，平均乘积的模长 $\prod_p\cos p^{-\sigma}$ 才随矢高和发散而趋于 $0$（`手工推导`）；而从谷底向两侧迈出的每一步有限圆弧推进 $E_\epsilon(s) = \xi(s) + \frac{\epsilon}{2}\xi'(s)$，在外部已验证的 [@conj-riemann-hypothesis] 保障下，底层全纯埃尔米特—比勒再生核 $K_\epsilon$（乃至全体本原复特征的 $K_\chi$）现已无条件严格正定，势面沿严格单调递增的青色凸翼一路攀升，配合有限精度斯托克斯网格内部零误差的共棱正反相消，不给任何品红色离轴双阱凹槽留下一丝藏身之地；而将这幅图景独立于外部 $\theta$-提升工程而直接以乘性舒尔补消元机制在 `trureturing` 内锻造为紧凑自包含证明，正是留给 [@prob-ch34-schur-hb-kernel-positivity-bridge] 的下一步攻关焦点！

至此，横跨 **[第二十九章](ch34-orthogonality-degeneracy-and-observer-position.md)**、**[第三十章](ch30-chord-tunneling-and-arc-calculus.md)** 与本章前翼（[§31.1](ch34-s28-riemann-path-integral-and-prime-arcs.md#sec-ch34-riemann-path-integral-and-prime-arcs)–§31.3）的极小圆弧体几何、微积分与临界带谱判据三阶攀登已告贯通：我们在第二十九章（[§29.1](ch34-s01-spherical-addressing.md#sec-ch34-spherical-addressing-inversion)–[§29.13](ch34-s12-triadic-duality.md#sec-ch34-triadic-duality-and-field-loop)）从球面正交简并反演极点、点破往返双投影 $\cos^2\theta$ 与 $90^\circ$ 正交虚数盲区 `i` 出发，借零背景“二生三”自举撑开极小三角弧面体 $\Delta\mathcal{T}_\epsilon$，贯通贝里扇锥体积、驻波节点成体、克利福德单胞 $\partial^2 = 0$ 铺砌、五阶概念级联、全连通图 $K_N$ 的麦克斯韦—拉曼三维刚性锁死以及“线·面·体 $\leftrightarrow$ 粒子·波·场”的三阶闭环；继而在第三十章（[§30.1](ch34-s26-chord-tunneling-and-pivot-renormalization.md#sec-ch34-chord-tunneling-and-pivot-renormalization)–[§30.3](ch34-s30-arc-body-calculus-and-finite-stokes.md#sec-ch34-arc-body-calculus-and-finite-stokes)）顺着球内平直割弦击穿图论最短路径排序壁垒、统一空间势垒与阿秒时间双缝的 $90^\circ$ 盲区隧穿，并以比较旋子、四相区矢高相变与有限网格斯托克斯定理从头重塑了**极小圆弧体微积分**；直至在本章前半程（[§31.1](ch34-s28-riemann-path-integral-and-prime-arcs.md#sec-ch34-riemann-path-integral-and-prime-arcs)–§31.3）将素数极小圆弧体路径积分、算术舒尔枢轴多级共振隧穿与**二阶矢高相变、埃尔米特—比勒径向单调锁和有限网格斯托克斯零涡旋相消**悉数收归同一枚极小圆弧体 $\Delta\mathcal{T}_\epsilon$ 的掌心！

紧接着，本章后半翼（[§31.4](ch39-s31-real-error-axis-and-prime-adelic-closure.md)–[§31.6](ch39-s33-riemann-1854-1859-spectral-manifold-polishing.md)）将顺势揭开算术与流形底层的更深谜底：请先在下方完整交互推演台中亲手巡览五张实验卡，随后步入 **[§31.4 实数误差放大轴与素数阿代尔归元闭合](ch39-s31-real-error-axis-and-prime-adelic-closure.md)**、**[§31.5 全息圆弧流形与阿代尔螺线管同体](ch39-s32-holographic-arc-manifold-and-solenoid-unity.md)** 与 **[§31.6 黎曼 1854 + 1859 双璧合龙](ch39-s33-riemann-1854-1859-spectral-manifold-polishing.md)**——去彻查平直实数轴为何只是局部切线误差放大器，见证加法、乘法、自然对数与素数如何在无切板全息圆弧流形上光滑合一，并目睹已证的 $\sigma \equiv \frac{1}{2}$ 临界线谱如何把切板黎曼流形的残余折痕彻底磨光，再向[第三十二章](ch32-inexpressible-ternions-and-three-dimensional-field.md)的三元数与无无穷零公理数学交棒！

::: {.viz src="arc-calculus-riemann-hermite-biehler-sandbox" height="620"}
**极小圆弧体微积分证明推演台：径向单调势面、埃尔米特—比勒正定核与有限精度斯托克斯相消完整交互实验室（`arc-calculus-riemann-hermite-biehler-sandbox`）。** 在十二零点对称阿达马乘积模型 $\xi_{\mathrm{model}}$（`MODEL` / `NUM`，数值沙盘而非黎曼猜想证明）的对数径向势面上自由切换“圆弧体微积分原语 / 经典复分析与德布朗热核”双透镜，遍历“矢高相变”、“双壳旋子步与埃尔米特—比勒凸翼”、“反事实离轴四元组墨西哥帽双阱”、“有限网格斯托克斯零涡旋锁定”与“乘性舒尔枢轴层与 Conrey–Li 障碍”五张递进实验卡（紫色绘制对数径向势面、素数旋子矢高珠与枢轴节点 $s_3, s_4$，青色绘制 $\sigma > \frac{1}{2}$ 收敛栅栏与极限虚线、外翼上升段 $\Delta_\varepsilon^{\mathrm{HB}} > 0$ 与外壳珠、核半正定 $\lambda_{\min} \ge 0$ 连弦与临界线因子层及外边界 $\partial R$，品红色标示 $\sigma = \frac{1}{2}$ 发散矢高柱、假想离轴四元组内陷沟 $\Delta_\varepsilon^{\mathrm{HB}} < 0$ 与不定核连弦 $\lambda_{\min} < 0$，中性白/墨色标示镜面 $\sigma = \frac{1}{2}$、零点环、镜像壳珠、渐近刻度 $\frac{1}{2}\ln\ln P_\varepsilon + C_{\mathrm{sag}}$ 与正反相消内棱 $\varphi(AB) + \varphi(BA) = 0$，琥珀色严格标示激活控件与舞台圆环手柄，红色用于依据栏中保留旧所钉仓库口径的三枚 `OPEN` 标记——外部证明与实际仍开放前沿的区分见 [@conj-riemann-hypothesis] 与 [@rem-ch34-arc-riemann-literature]，绿色 `LEAN ✓` 徽章实时核验页面挂载的九条 `trureturing` 冻结定理实例）。
:::
