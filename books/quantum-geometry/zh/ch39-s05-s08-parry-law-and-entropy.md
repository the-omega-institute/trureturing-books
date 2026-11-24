# O.2 帕里平稳律、逃逸对计数与分形视界熵问题 {#sec-ch39-p2e-entropy}

在讨论“熵”之前，先区分三个层次：有限状态的马尔可夫定律、整数时间轴上完整路径的可测坐标重建，以及对所有不变概率测度的熵比较。路径律、度量熵上界及其达到性、拓扑熵公式已有对应的 Lean 核验。最大熵测度的唯一性也有 Lean 定理，下文给出推导并讨论诱导回归熵。下文手工推导长度为 $R_n$ 的一维区间的 $O(R_n)$ 熵上界，并在有限 Tribonacci 平面斑块的子瓦片切口上用贝尔对实现 $S(\rho_{A_n})=\Theta(R_n^{D_F})$。采用平移不变或全格统一局域规则的有隙实现、实际 Tribonacci 跃迁链的 Slater 态空间纠缠、一般 $K\ge4$ 非各向同性皮索窗，以及余维一面积律失效的谱隙与局域性充要判据仍是开放问题。

在马尔可夫链侧，对任意阶数 $k \ge 2$，令互反帕里参数为 $p = \operatorname{parryParameter}(k) = \beta_k^{-1}$。在带绝对符号位与当前连续 `1` 游程长度的有向状态空间 $\operatorname{State}(k) = \mathrm{Bool} \times \operatorname{Fin} k$ 上，定义后缀权重 $w_j = \operatorname{suffixWeight}(k, p, j) = \sum_{a=0}^{k-j-1} p^{a+1}$、归一化常数 $Z_k = \sum_{j=0}^{k-1} p^j w_j$、符号翻转对合 $\operatorname{flip}(b, j) = (!b, j)$，以及重置转移核 $P_k = \operatorname{kernel}(k, p)$：从状态 $s = (b, j)$ 出发，以概率 $p / w_j$ 翻转符号并重置游程至 $(!b, 0)$，当 $j + 1 < k$ 时以概率 $p\, w_{j+1} / w_j$ 保持符号并推进游程至 $(b, j + 1)$，其余转移概率为 $0$。对应状态分布定义为

$$
\pi_k(b, j) = \operatorname{parryLaw}\bigl(k, (b, j)\bigr) = \frac{p^j w_j}{2 Z_k}.
$$

这组有向重置核的随机性、归一化、平稳不变性与正负号对称性已由 Lean 内核完整验证：

- [O.2.1 双向帕里源、柱集律与混合性](ch39-s05-s08-s01-bilateral-source.md)
- [O.2.2 最大熵测度、回返时长与视界问题](ch39-s05-s08-s02-maximal-entropy.md)
- [O.2.3 物理 Tribonacci 模型与 Slater 前缀](ch39-s05-s08-s03-slater-prefix.md)
- [O.2.4 非连续切口、纯度与方向复形](ch39-s05-s08-s04-cuts-and-circuits.md)
- [O.2.5 替代词交替偏差与对数平方界](ch39-s05-s08-s05-substitution-discrepancy.md)
- [O.2.6 三对角局部化与开链谱距离](ch39-s05-s08-s06-open-chain-spectrum.md)
