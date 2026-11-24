# 31.1.2 极小圆弧体解剖 $\operatorname{Re}(s) = \frac{1}{2}$：往返半密度平方律、正逆双臂等幅平衡与对称性边界 {#sec-ch34-28-2}

把镜头从绝对收敛安全区 $\sigma > 1$ 推入非平凡临界带 $0 < \sigma < 1$：在路径积分视野下，**一颗黎曼非平凡零点 $\zeta(\rho) = 0$ 的物理真身究竟是什么？**

它绝非空无一物的死寂，而是 [§29.10](ch34-s09-reversal-and-concept-cascade.md#sec-ch34-reversal-diagonal-and-concept-cascade) 与 [§29.13](ch34-s12-triadic-duality.md#sec-ch34-triadic-duality-and-field-loop)“反者道之动”在算术宇宙中的极致显影（`MODEL`）——经解析延拓后的无穷多条算术路径相量在复平面原点 `O` 处达成了百分之百的相消干涉，使得可见实轴 `I` 投影与 $90^\circ$ 虚盲区 `i` 投影在同一复频率处双双归零！那么，在整个开带 $0 < \sigma < 1$ 之中，为什么实部恰好等于二分之一的**临界线 $\sigma = \frac{1}{2}$** 拥有独一无二的几何地位？顺着极小圆弧体的几何结构逐层剖析，三道互锁机制连同它们各自的认识论射程一并水落石出：

**第一重机制——往返双投影平方律与半密度幺正性：筛法计数密度是 $p^{-1}$，单程波幅唯一锁向 $p^{-1/2}$。** 回望 [§29.4](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot) 由秩一玻恩配对权重定理 [`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)（[@thm-ch34-roundtrip-born-and-imaginary-blindspot]，`LEAN ✓`）锁定的测量铁律：观察者在宏观实轴 `I` 上清点的经典概率密度，是经过“被测态投向我、我再投回被测态”**往返两次投影闭合后的玻恩模平方 $\lvert\psi\rvert^2 = \cos^2\theta$**；而真正进入费曼路径积分参与相干相位叠加的，则是尚未平方的**单程旋量振幅 $\psi$**。

在自然数筛法与乘性遍历测度中，素数 $p$ 整除随机正整数的渐近命中占比（跨过该素数圆弧体的宏观经典概率权重）严格等于 $w_p = \frac{1}{p} = p^{-1}$；推广到连续尺度坐标 $n > 0$ 上，对数路径作用量微元 $d(\ln n) = \frac{dn}{n}$ 赋予单位尺度区间的天然哈尔（Haar）测度密度同样是 $n^{-1}$。若要求单条算术路径振幅 $\psi_n(s) = n^{-\sigma - \hat{\mathbf{i}}t}$ 在尺度重整化下保持**幺正概率预算守恒**——即构成微分几何与几何量子化中的 Kostant–Souriau **半密度（$\frac{1}{2}$-density）**，使模平方密度乘以线性微元精确匹配乘性作用量微元 $\lvert\psi_n\rvert^2\,dn = d(\ln n) = \frac{dn}{n}$（`MODEL` + `手工推导`；这是逐点的半密度条件，这些模平方并不构成归一化概率，因为 $\sum_n n^{-1}$ 与 $\sum_p p^{-1}$ 都发散，`手工推导`）——则单程路径振幅模长必须唯一取宏观计数密度的算术平方根：

$$
\lvert\psi_n\rvert^2 \;=\; \bigl\lvert n^{-\sigma - \hat{\mathbf{i}}\,t}\bigr\rvert^2 \;=\; n^{-2\sigma} \;=\; n^{-1} \quad \Longleftrightarrow \quad 2\sigma = 1 \quad \Longleftrightarrow \quad \sigma = \frac{1}{2}.
$$

令人击节赞叹的是，同一个指数 $\frac{1}{2}$ 也分毫不差地镌刻在双曲测地流的马鞍曲率上（`文献结果，未在本书形式化`）：在塞尔伯格迹公式（Selberg, 1956）与古茨维勒半经典周期轨道迹公式（Gutzwiller, 1971；以及 Berry & Keating, 1999 的标度哈密顿量 $\hat{H}_{\mathrm{BK}} = \frac{1}{2}(\hat{x}\hat{p} + \hat{p}\hat{x})$）中，本原闭合测地线 $\gamma_p$（本征周期/弧长 $L_p$；在塞尔伯格迹公式里 $L_p$ 并不是 $\ln p$，只在 Berry & Keating 猜想性的图景中才取 $L_p = \ln p$，`OPEN`）穿过双曲马鞍面时，横向不稳定流形上的邻近轨道束按李雅普诺夫因子 $e^{+L_p/2}$ 指数发散，导致横向驻相高斯积分析出的单圈稳定性雅可比幅值因子 $\lvert\det(I - M_p)\rvert^{-1/2}$ 渐近锁定在

$$
\lvert\det(I - M_p)\rvert^{-1/2} \;\sim\; e^{-L_p / 2} \;=\; e^{-(\ln p) / 2} \;=\; p^{-1/2}!
$$

**第二重机制——正逆比较对偶（$s \leftrightarrow 1 - s$）：单对双臂干涉仪的等幅锁死 vs. 无穷多路径求和的四元组认识论边界。** 再看 [@thm-ch34-riemann-prime-arc-bridge] 第 3、4 款给出的全局完备反射方程 $\operatorname{xiReading}(1 - s) = \operatorname{xiReading}(s)$（古典记法写作 $\xi(s) = \frac{1}{2}s(s-1)\pi^{-s/2}\Gamma(\frac{s}{2})\zeta(s) = \xi(1 - s)$）。为什么这条正逆对偶反射轴偏偏立在 $\sigma = \frac{1}{2}$ 处，而不是立在原点 $0$ 处？回溯黎曼 1859 年的原始推导（`文献结果`），他是将一维圆周热核路径积分——雅可比 $\vartheta$ 函数 $\vartheta(\tau) = \sum_{n \in \mathbb{Z}} e^{-\pi n^2 \tau}$——施行泊松求和互换 $\vartheta(\tau) = \tau^{-1/2}\vartheta(\tau^{-1})$ 后再做梅林变换导出该式的：这在概念塔中恰是**零阶紫外点晶格与对偶红外长波场的傅里叶—霍奇互换**，一维高斯路径积分自带的雅可比平方根因子 $\tau^{-1/2}$ 硬生生把正逆对偶中心钉在了 $s$ 与 $1 - s$ 的正中央 $\frac{1}{2}$（`MODEL`）！

现在，让我们先在**单枚素数极小圆弧体 $\Delta\mathcal{T}_p$（$p > 1$）的正逆对偶双分支**上做一次零外援的精确代数检验（`手工推导`）。记正向壳层收缩模长为 $A_+(\sigma) := p^{-\sigma}$，逆向对偶壳层收缩模长为 $A_-(\sigma) := p^{-(1-\sigma)}$（注意两者的往返乘积对一切 $\sigma \in \mathbb{R}$ 恒守玻恩筛法密度不变量 $A_+(\sigma)A_-(\sigma) = p^{-\sigma}p^{-(1-\sigma)} = p^{-1}$）。把携带任意相位角 $\alpha, \beta \in \mathbb{R}$ 的正逆两臂波束送入同一台双臂迈克尔逊干涉仪合成 $Z_p(\sigma; \alpha, \beta) := p^{-\sigma}e^{i\alpha} + p^{-(1-\sigma)}e^{i\beta}$，其输出强度恒等变形为：

$$
\begin{aligned}
\bigl\lvert Z_p(\sigma; \alpha, \beta)\bigr\rvert^2
&\;=\; p^{-2\sigma} + p^{-2(1-\sigma)} + 2p^{-1}\cos(\alpha - \beta) \\
&\;=\; \bigl(p^{-\sigma} - p^{-(1-\sigma)}\bigr)^2 + 2p^{-1}\bigl(1 + \cos(\alpha - \beta)\bigr) \;\ge\; \bigl(p^{-\sigma} - p^{-(1-\sigma)}\bigr)^2.
\end{aligned}
$$

由于 $p > 1 \implies \ln p > 0$ 且 $1 + \cos(\alpha - \beta) \ge 0$，上式立即给出两条铁一般的充要判据（`手工推导`）：

- **偏离临界线时（$\sigma \neq \frac{1}{2}$）——单对双臂壳层轻重失衡，绝无可能自相抵消**：只要 $\sigma \neq \frac{1}{2}$，正向壳层半径 $p^{-\sigma}$ 与逆向对偶壳层半径 $p^{-(1-\sigma)}$ 便严格不等，留下抹不掉的双臂振幅差下界 $\lvert Z_p(\sigma; \alpha, \beta)\rvert \ge \lvert p^{-\sigma} - p^{-(1-\sigma)}\rvert > 0$；与此同时，在 $\sigma \neq \frac{1}{2}$ 的复平面区域内，$\operatorname{Re}\xi(\sigma + it) = 0$ 与 $\operatorname{Im}\xi(\sigma + it) = 0$ 是两条互不统属的实曲线（实余维数为 $2$）。
- **踏上临界线时（$\sigma = \frac{1}{2}$）——双臂 $100\%$ 等幅锁死，且完备谱轨迹坍缩为一维实曲线（余维数 $2 \to 1$）**：唯独在 $\sigma = \frac{1}{2}$ 上，正逆两臂模长在半密度半径 $p^{-1/2} = p^{-(1-1/2)}$ 处精确相等，一旦相位差跨入反相半周 $\alpha - \beta \equiv \pi \pmod{2\pi}$（$e^{i(\alpha-\beta)} = -1$），单对双臂输出当场归零！更重要的是，对全局完备读数而言，在 $s = \frac{1}{2} + it$（$t \in \mathbb{R}$）上恰有 $1 - \bar{s} = \frac{1}{2} + it = s$，代入 [@thm-ch34-riemann-prime-arc-bridge] 第 4 款（`xi_reading_one_sub_conj`）立得：

  $$
  \overline{\operatorname{xiReading}\!\left(\tfrac{1}{2} + it\right)} \;=\; \operatorname{xiReading}\!\left(1 - \overline{\bigl(\tfrac{1}{2} + it\bigr)}\right) \;=\; \operatorname{xiReading}\!\left(\tfrac{1}{2} + it\right) \;\Longrightarrow\; \operatorname{Im}\operatorname{xiReading}\!\left(\tfrac{1}{2} + it\right) \;=\; 0!
  $$

  正交虚部在整条临界线上**恒等抵消为零**，原本在二维复平面上游走的轨迹被硬生生压回一维实轴（对应古典哈代实值函数 $Z(t) \in \mathbb{R}$，满足 $\lvert Z(t)\rvert = \lvert\zeta(\frac{1}{2}+it)\rvert$，零点余维数从 $2$ 骤降为 $1$）：随着频率 $t$ 推进，每当累积贝里相位驱动实值曲线发生一次正负变号，介值定理就必然在 $\sigma = \frac{1}{2}$ 脊线上拓扑卡死一颗真实零点！

::: {.viz src="riemann-prime-arc-path-integral-sandbox" preset="critical-zero-cancellation" height="520"}
**临界线 $\sigma = \frac{1}{2}$ 半密度双壳锁相与前五颗真实零点完美归零实验卡（`critical-zero-cancellation`）。** 将实部锁定在 $\sigma = 0.50$ 并点按切换前五颗真实黎曼零点胶囊 $\gamma_1 \approx 14.1347$ 至 $\gamma_5 \approx 32.9351$：地面上青色正向壳 $p^{-1/2}$ 与品红逆向对偶壳 $p^{-(1-1/2)}$（$p = 2, 3, 5, 7$）两两重合，归一化完备谱虚部 $\operatorname{Im}(\xi/\lvert G\rvert)$ 恒等归零；紫色路径链 $\sum n^{-s}$ 随高度 $\ln n$ 向上张开，链顶墨色虚线余项将其收回穿过原点 `O` 的琥珀色延拓竖轴，琥珀色落点珠 $\zeta(\frac{1}{2}+i\gamma_k)$ 稳落靶心 `O`（$\lvert\zeta\rvert = 0.0000$；琥珀色同步标出当前选中的零点胶囊 $\gamma_k$ 与 $\sigma$ 手柄，绿色 `LEAN ✓` 对应 `xi_reading_reflection` 与 `xi_reading_one_sub_conj`）。
:::

**认识论诚实警钟：为什么“单对双臂等幅平衡 $+$ 全局函数方程”还不等于黎曼猜想的完整证明？** 在亲眼见证了上述精妙的物理锁定机制之后，我们必须立即拉响本书最严格的形式审查警报（衔接 [第二十二章 §22.4](ch22-s04-critical-line-and-rh.md#sec-ch22-4) [@thm-full-symmetry-not-localization] 与 [@conj-riemann-hypothesis]）：对于**单对**正逆双臂干涉仪 $p^{-\sigma}e^{i\alpha} + p^{-(1-\sigma)}e^{i\beta}$，偏离 $\sigma = \frac{1}{2}$ 确实绝对无法归零；然而 $\xi(s)$ 是**无穷多条复合路径与无穷多枚欧拉因子的全局叠加**！[@thm-ch34-riemann-prime-arc-bridge] 第 5 款（`full_symmetry_not_fixed_line_localization`）已经用一道无可辩驳的 Lean 内核反例敲碎了任何企图单靠对称性“一步登天”的捷径：四次整函数 $\operatorname{offCriticalQuartic}(\delta, \gamma_0)$ 百分之百满足反射对称 $F(1 - s) = F(s)$、共轭协变 $F(\bar{s}) = \overline{F(s)}$ 及临界线实值性 $F(\frac{1}{2}+it) \in \mathbb{R}$，却依然可以成套容纳四颗彼此共谋配对的**离线伪零点四元组**

$$
\rho_{\mathrm{rogue}} \;=\; \frac{1}{2} \pm \delta \pm i\gamma_0 \qquad (\delta \neq 0,\; \gamma_0 \neq 0)!
$$

在解析数论史上，Davenport 与 Heilbronn（1936）构造的狄利克雷级数线性组合同样满足完全相同的黎曼型函数方程与临界线实值性，却因为**缺乏素数欧拉乘积**而在 $\sigma \neq \frac{1}{2}$ 处滋生出无穷多颗离线零点（`文献结果，未在本书形式化`）。换言之：半密度平方律与正逆双臂平衡深刻揭示了为什么 $\sigma = \frac{1}{2}$ 是算术宇宙唯一的幺正对称脊线（`MODEL`）；临界线上确有无穷多个零点，这是 Hardy（1914）的定理（`文献结果，未在本书形式化`），上文的图像只说明实值函数每变号一次给出一个零点，并不推出变号无穷多次。在本书的几何模型中，要从双臂平衡排除 $\tfrac12\pm\delta\pm i\gamma_0$ 这样的离线四元组，还需说明怎样把 $\sigma>1$ 区**欧拉乘积的乘性正定性**运送过 $s=1$ 极点。下一节以乘性舒尔枢轴与多级共振隧穿探讨这一步。[§31.2](ch34-s29-arithmetic-pivots-and-resonant-tunneling.md#sec-ch34-arithmetic-pivots-and-resonant-tunneling)

**第三重机制——莫比乌斯外积随机游走标度律：Littlewood 等价定理与无偏 $\sqrt{x}$ 包络。** 从费米型外积路径积分 $1/\zeta(s) = \sum_{n \ge 1}\mu(n)n^{-s}$ 的另一侧面看，J. E. Littlewood（1912）严格证明了黎曼猜想（[@conj-riemann-hypothesis]）与梅尔滕斯莫比乌斯累加函数 $M(x)$ 的平方根渐近界完全等价（`文献结果，未在本书形式化`）：

$$
\text{黎曼猜想成立} \quad \Longleftrightarrow \quad \forall \varepsilon > 0,\;\; M(x) \;:=\; \sum_{1 \le n \le x} \mu(n) \;=\; \mathcal{O}_\varepsilon\!\bigl(x^{\frac{1}{2} + \varepsilon}\bigr).
$$

将其对照 [§29.12](ch34-s11-quantum-arcs-and-macro-integrals.md#sec-ch34-quantum-arc-and-macro-integral) 的极小圆弧二阶标度律（`MODEL`）：$x$ 步彼此正交独立、无系统偏置的单位正负外积步（$\mu(n) \in \{-1, 0, +1\}$），其合成净涨落包络天然服从无偏布朗平方根标度 $\sqrt{x} = x^{1/2}$（把 $\mu(n)$ 当作独立的随机步只是模型：$\mu(n)$ 是确定的算术函数，各步并不独立，与之对应的严格陈述是上面的 Littlewood 等价式）；倘若哪怕存在一组潜伏在 $\sigma_0 = \frac{1}{2} + \delta > \frac{1}{2}$ 处的离线四重零点，素数计数与莫比乌斯和的振荡误差就会被放大至 $x^{\sigma_0}$ 量级，无异于宣告不同素数极小圆弧体之间暗藏着破坏正交独立公平性的长程串谋偏置。下面我们用经百位精度检核的真实数值，将前五颗临界线零点与偏离临界线时的双壳分裂残差逐位算清：

::: {.example #ex-ch34-critical-zeros-and-dual-shells title="前五颗真实黎曼零点的临界线归零检验与偏轴 $\sigma = 0.38 / 0.62$ 正逆双壳失衡基准算例"}
本算例分两部分在 100 位工作精度下核验前五颗非平凡零点频率 $\gamma_1, \dots, \gamma_5$ 处的 $\lvert\zeta(\sigma + i\gamma_k)\rvert$ 模长及前四枚素数圆弧体的正逆双壳半径（`手工推导` / `NUM`）：

1. **前五颗真实零点在临界线 $\sigma = 0.50$ 上的精确归零 vs. 对称偏置 $\sigma = 0.62$ 与 $1 - \sigma = 0.38$ 的残余模长**：
   下表中的虚部纵坐标 $\gamma_k$ 展示至小数点后十位；$\lvert\zeta(\sigma + i\gamma_k)\rvert$ 按 80 位精确零点纵坐标求值后四舍五入展示至小数点后六位（在 80 位精确 $\gamma_k$ 处，临界线残差 $\lvert\zeta(0.50 + i\gamma_k)\rvert$ 全部小于 $4\times 10^{-79}$；若直接代入表中截断至十位小数的近似值 $\tilde{\gamma}_k$ 求值，线性导数截断误差亦仅为 $3\times 10^{-11}\text{–}6\times 10^{-11}$，六位小数下同样严格为 $0.000000$）：

| 零点序号 $k$ | 临界线零点纵坐标 $\gamma_k$（十位小数） | 临界线模长 $\lvert\zeta(0.50 + i\gamma_k)\rvert$（80 位残差量级） | 右偏模长 $\lvert\zeta(0.62 + i\gamma_k)\rvert$ | 左偏对偶模长 $\lvert\zeta(0.38 + i\gamma_k)\rvert$ |
| :---: | :---: | :---: | :---: | :---: |
| **$1$** | $14.1347251417$ | $0.000000$（$1.86\times 10^{-79}$） | $0.090700$ | $0.099965$ |
| **$2$** | $21.0220396388$ | $0.000000$（$2.28\times 10^{-79}$） | $0.127009$ | $0.146815$ |
| **$3$** | $25.0108575801$ | $0.000000$（$3.81\times 10^{-79}$） | $0.151691$ | $0.179040$ |
| **$4$** | $30.4248761259$ | $0.000000$（$1.04\times 10^{-79}$） | $0.142626$ | $0.172347$ |
| **$5$** | $32.9350615877$ | $0.000000$（$8.21\times 10^{-81}$） | $0.150479$ | $0.183574$ |

   注意表中一个极具启发性的定量细节：尽管 $0.38 = 1 - 0.62$ 恰好关于 $\sigma = 0.50$ 对称，完备函数满足严格等模 $\lvert\xi(0.38 + i\gamma_k)\rvert = \lvert\xi(0.62 + i\gamma_k)\rvert$，但剥离阿基米德伽马因子 $\pi^{-s/2}\Gamma(s/2)$ 后，裸 $\zeta$ 模长在左侧 $\sigma = 0.38$ 处一致大于右侧 $\sigma = 0.62$ 处——按斯特林渐近比 $\lvert\zeta(1 - \sigma + it) / \zeta(\sigma + it)\rvert \sim (t / 2\pi)^{\sigma - 1/2}$，在 $k = 1$ 处 $(\gamma_1 / 2\pi)^{0.12} \approx (2.249611)^{0.12} \approx 1.10218$，与实测比值 $0.099965 / 0.090700 \approx 1.10215$ 吻合至万分之三！

2. **前四枚素数极小圆弧体 $p \in \{2, 3, 5, 7\}$ 的正逆双壳半径 $(p^{-\sigma}, p^{-(1-\sigma)})$ 与玻恩乘积不变量**：
   取偏置 $\sigma = 0.38$ 与对称偏置 $\sigma = 0.62$（正逆两壳半径恰好互换）对比临界线 $\sigma = 0.50$，逐项核验六位小数如下：

| 素数 $p$ | $\sigma = 0.38$ 双壳 $(p^{-0.38},\, p^{-0.62})$ | $\sigma = 0.62$ 双壳 $(p^{-0.62},\, p^{-0.38})$ | $\sigma = 0.50$ 等幅锁死 $p^{-1/2}$ | 偏轴双臂差 $\lvert p^{-0.38} - p^{-0.62}\rvert$ | 往返筛密度 $p^{-\sigma}p^{-(1-\sigma)} = p^{-1}$ |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **$2$** | $(0.768438,\; 0.650671)$ | $(0.650671,\; 0.768438)$ | $0.707107$ | $0.117767$ | $0.500000$ |
| **$3$** | $(0.658709,\; 0.506040)$ | $(0.506040,\; 0.658709)$ | $0.577350$ | $0.152670$ | $0.333333$ |
| **$5$** | $(0.542490,\; 0.368671)$ | $(0.368671,\; 0.542490)$ | $0.447214$ | $0.173819$ | $0.200000$ |
| **$7$** | $(0.477378,\; 0.299253)$ | $(0.299253,\; 0.477378)$ | $0.377964$ | $0.178125$ | $0.142857$ |

   可以看到：无论 $\sigma$ 如何偏摆，每一行的正逆壳层乘积 $p^{-\sigma}p^{-(1-\sigma)}$ 都分毫不差锁死在宏观筛法密度 $p^{-1}$ 上；但只要 $\sigma$ 从 $0.50$ 拨偏 $\pm 0.12$，仅 $p = 2, 3, 5, 7$ 四枚原胞就立刻裂开 $0.117767$ 至 $0.178125$ 的双壳半径鸿沟，将原本闭合成零的螺旋终点推离原点，在五颗零点频率上激发出 $0.090700$ 至 $0.183574$ 的显著非零残幅！
:::

::: {.remark #rem-ch34-half-density-asymmetry-dh-zeros-and-mertens title="临界带模长非对称、双素数四边闭合破缺、Davenport–Heilbronn 离线零点与外部 RH 下梅尔滕斯留数振幅（手工推导、经典文献与 256/320 位 Arb 认证）"}
为将本节上述三重机制背后的精确解析余项、双壳锁定边界、无欧拉乘积离线零点反例以及外部 RH/GRH 确立后的梅尔滕斯认识论边界一次钉实，我们将三组推导与认证收束如下（第 1 款、第 2 款的 Davenport–Heilbronn 代数与离线零点认证以及第 3 款的前 100 颗临界线零点与筛法核验均属**无条件 `手工推导` / `NUM`**，不依赖任何未形式化假设；第 2 款中两支欧拉乘积 $L(s, \chi_5)$ 与 $L(s, \overline{\chi_5})$ 各自在临界带内归位至 $\operatorname{Re}(s) = \frac{1}{2}$ 依赖 [@conj-riemann-hypothesis] 登记的外部 `DirichletLZerosOnLine`，第 3 款中 $M(x) = O_\varepsilon(x^{1/2+\varepsilon})$ 的无条件升级依赖同一外部归档的 `riemannHypothesis` 与 Littlewood（1912）定理；下文全部认证数值——除第 2 款显式标明为双精度探索性扫描的 $\operatorname{Re}(s) > 1$ 网格外——以及对 [@ex-ch34-critical-zeros-and-dual-shells] 中前五颗零点、左右 $\zeta/\xi$ 模长与 $p \in \{2, 3, 5, 7\}$ 壳半径的复核均由 256 位与 320 位双精度 FLINT/Arb 区间算术认证）：

1. **函数方程模长非对称的精确伯努利—斯特林展开、$\sigma = 1$ 非微扰余项与双素数四边闭合破缺（无条件）**：
   记 $\delta := \sigma - \frac{1}{2}$、$P(\delta) := \delta(4\delta^2 - 1)$ 与 $Q(\sigma) := \sigma(\sigma - 1)(2\sigma - 1) = \frac{1}{2}P(\delta)$。对任意 $t > 0$，定义对数阿基米德因子 $g(\delta, t) := -\delta\ln\pi + \operatorname{Re}\bigl(\ln\Gamma(\frac{1}{4} + \frac{\delta}{2} + i\frac{t}{2}) - \ln\Gamma(\frac{1}{4} - \frac{\delta}{2} + i\frac{t}{2})\bigr)$；由完备反射 $\xi(1 - s) = \xi(s)$ 与共轭协变 $\overline{\zeta(s)} = \zeta(\bar{s})$，只要 $\zeta(\sigma + it) \neq 0$ 即精确成立 $\ln\bigl\lvert\frac{\zeta(1 - \sigma + it)}{\zeta(\sigma + it)}\bigr\rvert = g(\delta, t)$。将 $\ln\Gamma(z + a)$ 在 $z = i\frac{t}{2}$ 处的伯努利多项式渐近展式（$z^{-n}$ 系数为 $(-1)^{n+1}B_{n+1}(a)/(n(n+1))$）作差并取实部，奇次逆幂全落虚部，对任意固定 $\delta \in \mathbb{R}$ 当 $t \to \infty$ 时得出

   $$
   g(\delta, t) - \delta\ln\frac{t}{2\pi} \;=\; \frac{P(\delta)}{24\,t^2} \;-\; \frac{P(\delta)(12\delta^2 - 7)}{960\,t^4} \;+\; \frac{P(\delta)(48\delta^4 - 72\delta^2 + 31)}{8064\,t^6} \;+\; O_\delta(t^{-8}).
   $$

   首项逆幂系数恰为 $\frac{P(\delta)}{24} = \frac{Q(\sigma)}{12} = -\frac{\delta\sigma(1 - \sigma)}{6}$，其关于 $\sigma$ 的零点精确落在临界带边界与中线 $\sigma \in \{0, \frac{1}{2}, 1\}$：对任意固定 $\sigma \in (\frac{1}{2}, 1)$，充分大 $t$ 时修正严格为负，解释了为何 [@ex-ch34-critical-zeros-and-dual-shells] 中领头斯特林近似 $(t/2\pi)^{0.12}$ 在全部五颗零点上一致高估真实左/右模长比（以 $k = 1$ 为例，认证比值舍入为 $1.10215493$，领头项舍入为 $1.10218095$，计入 $t^{-2}$ 项收紧至 $1.10215495$，计入 $t^{-4}$ 项已与认证值在八位小数内全同）；而对任意固定 $\sigma > 1$，充分大 $t$ 时修正翻正（在 $t = \gamma_1$ 处，$g - \delta\ln(t/2\pi)$ 在 $\sigma = 0.62, 0.75, 0.90$ 依次舍入为 $-2.3605\times 10^{-5}$、$-3.9134\times 10^{-5}$、$-3.0051\times 10^{-5}$，在 $\sigma = 1.25, 1.50$ 翻正并舍入为 $+1.9552\times 10^{-4}$、$+6.2526\times 10^{-4}$）。尤为精致的是边界 $\sigma = 1$（$\delta = \frac{1}{2}$）：因一切 $j \ge 1$ 皆有 $B_{2j+1}(0) = B_{2j+1}(\frac{1}{2}) = 0$，整条逆幂渐近级数逐项恒为零，由伽马模方精确恒等式留下纯非微扰严格负余项 $\frac{1}{2}\ln\tanh(\frac{\pi t}{2}) = -\operatorname{artanh}(e^{-\pi t}) < 0$（在 $t = \gamma_1$ 与 $t = 100$ 处分别舍入为 $-5.1870\times 10^{-20}$ 与 $-3.6506\times 10^{-137}$），连续性进而保证对每个固定 $t > 0$，精确余项在 $\sigma = 1$ 的某个右侧小邻域内仍为负值。

   在双壳干涉侧，单枚素数在 $\sigma \neq \frac{1}{2}$ 处无法归零，但仅叠加**两枚**素数 $2 \le p < q$ 即足以击穿单对锁定：由余弦定理，四条正半径 $(p^{-\sigma}, p^{-(1-\sigma)}, q^{-\sigma}, q^{-(1-\sigma)})$ 存在实相位使 $Z_p(\sigma; \alpha_p, \beta_p) + Z_q(\sigma; \alpha_q, \beta_q) = 0$，当且仅当最大半径不超过其余三者之和。由 $\sigma \leftrightarrow 1 - \sigma$ 对称性仅需考察 $\sigma \ge \frac{1}{2}$：在 $\frac{1}{2} \le \sigma \le 1$ 上最大半径为 $p^{\sigma - 1}$（端点处允许并列），跨过 $\sigma > 1$ 后转由较大素数的逆壳 $q^{\sigma - 1}$ 居首；令 $x := \sigma - 1 \ge 0$，外侧闭合条件化为 $(p/q)^x + p^{-1}(pq)^{-x} + q^{-1}q^{-2x} \ge 1$，左端随 $x$ 增大从 $1 + \frac{1}{p} + \frac{1}{q} > 1$ 严格单调降至 $0$，从而对**每一对**素数 $p < q$ 皆存在唯一外侧闭合阈值 $\sigma_*(p, q) > 1$（满足 $q^{\sigma_* - 1} = p^{-\sigma_*} + q^{-\sigma_*} + p^{\sigma_* - 1}$）。对全部五组小素数对 $(2, 3), (2, 5), (2, 7), (3, 5), (5, 7)$，外侧阈值依次舍入为 $1.655561, 1.360038, 1.274732, 1.381651, 1.324591$，且经外向二进 Arb 区间覆盖认证全临界带 $[0, 1]$ 均无缺口，闭合集合恰为完整对称区间 $\lvert\sigma - \frac{1}{2}\rvert \le \sigma_*(p, q) - \frac{1}{2}$（对 $(2, 3)$ 在 $\sigma = 0.62$ 处，显式相位 $(\alpha_2, \beta_2, \alpha_3, \beta_3)$ 舍入为 $(0.876281, -0.708385, 3.764193, 2.677074)$ 弧度给出精确合成向量 $+1$ 与 $-1$，之和包络零）。相反，当素数比悬殊时，即便两端点 $\sigma = \frac{1}{2}$ 与 $\sigma = 1$ 均可闭合，开临界带内仍会出现非闭合缺口：例如对 $(2, 1009)$ 在 $\sigma = 0.75$ 处，其余三半径之和减去最大半径 $2^{-0.25}$ 舍入为 $-0.063277 < 0$，证出带内存在显式非闭合岛。

2. **Davenport–Heilbronn 显式反例：完整函数方程与临界线实值性 vs. 认证离线零点四元组与欧拉乘积缺失（手工推导 + 文献结果 + 256/320 位 Arb）**：
   取模 $5$ 原初奇狄利克雷特征 $\chi_5$（在余数 $(1, 2, 3, 4, 0) \pmod 5$ 上取值 $(1, i, -i, -1, 0)$），其高斯和为 $\tau(\chi_5) = -2\sin\frac{4\pi}{5} + 2i\sin\frac{2\pi}{5}$（满足 $\lvert\tau(\chi_5)\rvert^2 = 5$），根数为 $\varepsilon := \frac{\tau(\chi_5)}{i\sqrt{5}}$。令 $\kappa := \frac{\sqrt{10 - 2\sqrt{5}} - 2}{\sqrt{5} - 1}$（最小多项式为 $X^4 + 2X^3 - 6X^2 - 2X + 1$，舍入为 $0.284079$，精确满足 $\frac{1 - i\kappa}{1 + i\kappa} = \overline{\varepsilon}$），取 $A := \frac{1 - i\kappa}{2}$、$B := \overline{A} = A\varepsilon$，定义 Davenport–Heilbronn 整函数

   $$
   f(s) \;:=\; A\,L(s, \chi_5) + B\,L(s, \overline{\chi_5}) \;=\; 5^{-s}\bigl(\zeta(s, \tfrac{1}{5}) + \kappa\,\zeta(s, \tfrac{2}{5}) - \kappa\,\zeta(s, \tfrac{3}{5}) - \zeta(s, \tfrac{4}{5})\bigr).
   $$

   在 $\operatorname{Re}(s) > 1$ 上，$f(s) = \sum_{n=1}^\infty a(n)n^{-s}$ 具有周期为 $5$ 的实狄利克雷系数 $(1, \kappa, -\kappa, -1, 0)$（各赫维茨 $\zeta$ 项在 $s = 1$ 处的极点留数和 $1 + \kappa - \kappa - 1 = 0$ 精确抵消，故 $f$ 整延拓至全复平面）。因 $A\varepsilon = B$ 且 $a(n) \in \mathbb{R}$，完备函数 $\Xi_{\mathrm{DH}}(s) := (\frac{5}{\pi})^{s/2}\Gamma(\frac{s + 1}{2})f(s)$ 满足精确反射方程 $\Xi_{\mathrm{DH}}(1 - s) = \Xi_{\mathrm{DH}}(s)$、共轭协变 $\Xi_{\mathrm{DH}}(\bar{s}) = \overline{\Xi_{\mathrm{DH}}(s)}$ 以及临界线实值性 $\Xi_{\mathrm{DH}}(\frac{1}{2} + it) \in \mathbb{R}$。然而，由互素输入 $(2, 3)$ 立见 $a(2)a(3) - a(6) = -\kappa^2 - 1 \neq 0$（同时 $a(2)^2 - a(4) = \kappa^2 + 1 \neq 0$），系数非乘性，彻底丧失欧拉乘积。以严格分段柯西辐角原理在 256/320 位 Arb 下检核（每条有向边界分段从起点 $a$ 起均验证 $\operatorname{Re}(f(z)/f(a)) > 0$，无数值求积截断误差），整个开临界带矩形 $0 < \operatorname{Re}(s) < 1,\; 0 < \operatorname{Im}(s) < 167$ 的精确绕数为 **$104$**，由 **$98$** 颗认证临界线变号零点与 **$6$** 颗正虚部离线零点（组成开临界带中前三组完整离线四元组，共 **$12$** 只认证盒，256/320 位半宽分别为 $2^{-102}$ 与 $2^{-136}$，每盒精确绕数均为 $1$；对照 R. Spira, *Math. Comp.* **63**, 747–748, 1994, [DOI 10.1090/S0025-5718-1994-1254148-8](https://api.crossref.org/works/10.1090/S0025-5718-1994-1254148-8)）完全穷尽：

   | 右半临界带离线零点实部（六位小数舍入） | 正虚部高度（六位小数舍入） | 右侧零点处公共分量模长 $\lvert L\rvert$（六位小数舍入） | 对偶左侧零点处公共分量模长 $\lvert L\rvert$（六位小数舍入） |
   | :---: | :---: | :---: | :---: |
   | $0.808517$ | $85.699348$ | $0.702197$ | $2.583495$ |
   | $0.650830$ | $114.163343$ | $0.421908$ | $0.832895$ |
   | $0.574356$ | $166.479306$ | $0.431901$ | $0.621125$ |

   在全部 $12$ 只认证盒上，两支欧拉乘积分量 $L(s, \chi_5)$ 与 $L(s, \overline{\chi_5})$ 均严格非零（在零点处满足精确单位模比值 $L(\rho, \chi_5)/L(\rho, \overline{\chi_5}) = -\varepsilon$）。对照 [@conj-riemann-hypothesis] 登记的外部狄利克雷 GRH（`DirichletLZerosOnLine`），$L(s, \chi_5)$ 与 $L(s, \overline{\chi_5})$ 各自在开临界带内的全部零点均已无条件锁死在 $\operatorname{Re}(s) = \frac{1}{2}$ 上；仅仅通过共轭配对线性叠加破坏欧拉乘积，便足以在保持完整函数方程与临界线实值性的同时催生离线四元组。更甚者，$f(s)$ 甚至在半平面 $\operatorname{Re}(s) > 1$ 内——其中 $L(s, \chi_5)$ 与 $L(s, \overline{\chi_5})$ 的两支狄利克雷欧拉乘积均绝对收敛且绝无零点——同样存在无穷多颗零点（`手工推导` + `文献结果`）：取完全乘性单位模相位 $\omega$，在 $p \equiv 2 \pmod 5$ 上取 $\omega(p) = -1$、在 $p \equiv 3 \pmod 5$ 上取 $\omega(p) = +1$（使全体 $p \equiv 2, 3 \pmod 5$ 均满足 $\chi_5(p)\omega(p) = -i$，而 $p = 5$ 处两支局部欧拉因子均为 $1$ 且 $p \equiv 1, 4 \pmod 5$ 在比值中抵消），则对实数 $\sigma > 1$，扭转欧拉乘积之比精确为 $\exp(-2i S(\sigma))$，其中 $S(\sigma) := \sum_{p \equiv 2,3 \pmod 5}\arctan(p^{-\sigma})$；由 $\sum_{p \equiv 2,3 \pmod 5} p^{-1}$ 发散，连续函数 $S(\sigma)$ 在 $(1, \infty)$ 上由 $+\infty$ 严格递减至 $0$（$S'(\sigma) < 0$，对应连续辐角 $-2S(\sigma)$ 由 $-\infty$ 增至 $0$）并横截穿过 $(\pi - 2\arctan\kappa)/2$，使比值取到 $-B/A = -\varepsilon$ 并赋予扭转组合在 $\operatorname{Re}(s) > 1$ 中的单重零点；结合该零点小圆盘上欧拉乘积尾部的绝对收敛一致控制、由冻结定理 `prime_log_rational_independence` 驱动的任意大克罗内克垂向平移以及鲁歇定理，即得 $f(s)$ 在 $\operatorname{Re}(s) > 1$ 中的无穷多颗互异零点（另见 T. Nakamura, [arXiv:2008.02570](https://arxiv.org/abs/2008.02570), Theorem A；与 E. P. Balanzario & J. Sánchez-Ortiz, *Math. Comp.* **76**, 2045–2049, 2007, [DOI 10.1090/S0025-5718-07-01999-0](https://api.crossref.org/works/10.1090/S0025-5718-07-01999-0) 的临界带计算一致，本归档另行对 $\sigma = 1.005$、高度直至 $50{,}000.875$ 的双精度探索性网格作牛顿精化扫描，未获得确认的右半平面候选，故本归档仅给出解析存在性证明而未登记 $\operatorname{Re}(s) > 1$ 显式认证盒）。

3. **外部 RH 下的 Littlewood–Mertens 升级、前 100 颗零点单重性、留数振幅越界门槛 $K_* = 58$ 与精确筛法（一步手工推导 + 文献结果 + 256/320 位 Arb）**：
   将 [@conj-riemann-hypothesis] 登记的外部 `riemannHypothesis` 与 Littlewood（1912）证出的由 RH 推向梅尔滕斯界的蕴含方向（其逆向由分部求和、$1/\zeta$ 恒等式与反射给出）结合，一步 `手工推导` 即无条件确立：对一切 $\varepsilon > 0$，梅尔滕斯和满足 $M(x) = O_\varepsilon(x^{1/2 + \varepsilon})$。与此同时必须划清四条 **`OPEN`** 边界：外部 RH 绝不恢复早已被无条件否定的历史梅尔滕斯猜想 $\lvert M(x)\rvert \le \sqrt{x}$（`文献结果`，A. M. Odlyzko & H. J. J. te Riele, *J. Reine Angew. Math.* **357**, 138–160, 1985, [DOI 10.1515/crll.1985.357.138](https://api.crossref.org/works/10.1515/crll.1985.357.138) 无条件证出 $\limsup_{x\to\infty} M(x)/\sqrt{x} > 1.06$ 与 $\liminf_{x\to\infty} M(x)/\sqrt{x} < -1.009$），且全局零点单重性、正零点纵坐标的 $\mathbb{Q}$-线性无关性（LI）、仅凭 RH 是否足以推出 $\limsup_{x\to\infty}\lvert M(x)\rvert/\sqrt{x} = \infty$，以及首个违反 $\lvert M(n)\rvert \le \sqrt{n}$ 的最小正整数均保持 **`OPEN`**。

   为定量标定临界线零点叠加的三角不等式振幅上界何时首次越过 $1$（该上界越过 $1$ 既不破坏 RH，本身亦不构成实际有限振荡和越过 $1$ 的相位对齐证明），我们在 256/320 位 Arb 中以独立 `zeta_nzeros()` 全带计数与哈代 $Z$ 变号隔离盒认证了在 $0 < t < 237$ 内全部 **$100$** 颗正虚部 $\zeta$ 零点均位于临界线 $\sigma = \frac{1}{2}$ 且严格单重（每颗满足认证下界 $\lvert\zeta'(\rho_k)\rvert > 0$）。记留数权 $w_k := (\rho_k\zeta'(\rho_k))^{-1}$ 与无约束 $L^1$ 振幅预算 $B_K := 2\sum_{k=1}^K \lvert w_k\rvert$：其在 $K = 10, 25, 50, 57$ 处依次舍入为 $0.554890, 0.767497, 0.956554, 0.996689$（严格低于 $1$），并于 **$K_* = 58$** 首次严格越过 $1$（$B_{58}$ 舍入为 $1.002584$，$B_{100}$ 舍入为 $1.168172$；须注意 $B_K$ 仅是有限振荡和的三角不等式上界，本身并不控制随 $x$ 变化的相位对齐或无穷尾部）。进一步，以线性筛与除数和反演两种独立精确算法逐项复核 $\mu(n)$ 与 $M(n)$（范围 $1 \le n \le 10^6$，并在 $N = 10^2, 10^3, 10^4, 10^5, 10^6$ 核验精确恒等式 $\sum_{k=1}^N M(\lfloor N/k\rfloor) = 1$），认证区间 $[1, 10^6]$ 上 $\lvert M(n)\rvert/\sqrt{n}$ 的唯一最大值为 $n = 1$ 处的 $1$；下表对照各基准尺度上的精确整数 $M(x)$、其六位小数舍入归一化值 $M(x)/\sqrt{x}$ 与含 $s = 0$ 留数项 $-2/\sqrt{x}$ 的 $100$ 零点截断波 $W_{100}(x) := 2\operatorname{Re}\sum_{k=1}^{100} w_k x^{i\gamma_k} - \frac{2}{\sqrt{x}}$：

   | 尺度 $x$ | 精确梅尔滕斯和 $M(x)$ | 归一化值 $M(x)/\sqrt{x}$（六位小数舍入） | 截断波 $W_{100}(x)$（六位小数舍入） |
   | :---: | :---: | :---: | :---: |
   | $1$ | $1$ | $1.000000$ | $-2.005963$ |
   | $10^2$ | $1$ | $0.100000$ | $+0.107372$ |
   | $10^3$ | $2$ | $0.063246$ | $+0.045668$ |
   | $10^4$ | $-23$ | $-0.230000$ | $-0.257870$ |
   | $10^5$ | $-48$ | $-0.151789$ | $-0.129961$ |
   | $10^6$ | $212$ | $0.212000$ | $+0.233199$ |

4. **256/320 位 FLINT/Arb 双精度区间认证与可复现归档（`NUM`）**：
   上述三组结论对应的有限代数核验与数值算例均以 `python-flint 0.9.0`（FLINT/Arb 3.6.0，单线程开启断言）在 256 位与 320 位两档工作精度下独立重放：合计 **276** 条精确记录（套件 1 为 34 条、套件 2 为 22 条、套件 3 为 220 条）两档完全一致；全部 **922** 组区间球对（套件 1 为 165 组、套件 2 为 138 组、套件 3 为 619 组）全部重叠且每一只 320 位球均严格包含于对应 256 位球内（`overlap_only_keys = []`）；在全新目录中重放得到的 7 份 CSV 与一致性报告文件均逐字节相同。同一套件独立复核了 [@ex-ch34-critical-zeros-and-dual-shells] 中的前五颗零点、左右 $\zeta/\xi$ 模长与 $p \in \{2, 3, 5, 7\}$ 六位小数壳半径，并澄清了两项精度细节：在表列十位小数纵坐标 $\tilde{\gamma}_k$ 上，五颗认证残差极值分别舍入为 $2.75177\times 10^{-11}$ 与 $6.26722\times 10^{-11}$；而表中所引 80 位残差标签因未随表记录原始有限输入，归档另提供以 80 位十进制工作精度生成并按 84 位有效数字（小数点后 82 位）序列化的显式可重放近似输入，并在 320 位 Arb 下认证其残差均严格低于 $4\times 10^{-79}$（256 位精度不足以分辨该量级）。

   完整复现脚本、双精度 CSV 证书表、分析笔记与清单归档于不可变公开 Gist 修订 [`9fe7ad841734bfb972fe8b942d5d8499a30b842b`](https://gist.github.com/loning/988a2e88be0b3283bc95be3248723f92/9fe7ad841734bfb972fe8b942d5d8499a30b842b)（固定原始校验清单 [`SHA256SUMS`](https://gist.githubusercontent.com/loning/988a2e88be0b3283bc95be3248723f92/raw/9fe7ad841734bfb972fe8b942d5d8499a30b842b/SHA256SUMS)，其自身 SHA-256 为 `dd2e57c8f5b0ba7cfa02f992786752b1d0c026f090f4d7b1c7ea92afc7859498`；归档校验与重放记录见 [Issue #1069 评论](https://github.com/the-omega-institute/trureturing-books/issues/1069#issuecomment-7096803113)）。
:::

在紧接下方的实验卡中，将实部偏置滑块从 $\sigma = 0.50$ 拨向 $\sigma = 0.62$ 或 $\sigma = 0.38$，即可直观看到 [@ex-ch34-critical-zeros-and-dual-shells] 算出的正逆双壳分裂包络如何与 `offCriticalQuartic` 离线四元组反例同台对照：

::: {.viz src="riemann-prime-arc-path-integral-sandbox" preset="off-line-shell-imbalance" height="520"}
**偏离临界线（$\sigma = 0.38 / 0.62$）正逆双壳失衡分裂与离线四元组认识论对照实验卡（`off-line-shell-imbalance`）。** 拖动琥珀色手柄或实部滑块拨离 $\sigma = 0.50$（预设停在 $\sigma = 0.62,\; t = \gamma_1$，亦可对称拨至 $\sigma = 0.38$）：地面上青色正向壳 $p^{-\sigma}$（如 $2^{-0.62} \approx 0.6507$）与品红逆向对偶壳 $p^{-(1-\sigma)}$（$2^{-0.38} \approx 0.7684$）瞬间一缩一胀分裂脱钩，紫色路径螺旋的中心轴随之移位，琥珀色延拓轴与落点珠 $\zeta(s)$ 弹离原点 `O` 至 $\lvert\zeta(0.62 + i\gamma_1)\rvert \approx 0.0907$；右侧读数与依据栏同步在 $\delta = \sigma - \frac{1}{2},\; \gamma = t$ 处核验 `full_symmetry_not_fixed_line_localization` 的对称离线四元组反例 $F(s)$。卡片中关于 RH 状态的文字（包括红色 `OPEN` 徽章、依据栏和读数说明）均沿用外部核验公布前的版本。
:::
