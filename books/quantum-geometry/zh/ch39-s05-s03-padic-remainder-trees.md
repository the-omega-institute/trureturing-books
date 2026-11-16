# 39.5.3 $p$ 进余数树与有限视界细化超度量 {#sec-ch39-p2e-padic}

在算术同余侧，固定素数 $p$，对整数 $x \in \mathbb{Z}$ 定义第 $k$ 层精度读出为 $\operatorname{precisionReading}(p, k, x) = x \bmod p^k$。对任意相异整数 $x \neq y$，最小区分精度定理 [`first_distinguishing_precision`](lean:D5/S3/Arith/Congruence/PadicPrecisionBlindSpot.first_distinguishing_precision) 证明：两者读数首次分叉的最小层级恰为 $k^* = v_p(x - y) + 1$，此前一切 $k \le v_p(x - y)$ 均处于精度盲区。相应地，观测距离恒等式 [`observation_distance_eq_padic_valuation`](lean:D5/S3/Arith/Congruence/PadicObservationDistance.observation_distance_eq_padic_valuation) 将相异整数间的观测距离锁定为 $p^{-v_p(x - y)}$（相等时为 $0$），而同余纤维闭球对应定理 [`congruenceFiber_eq_closedBall_inter_range`](lean:D5/S3/Arith/Congruence/PadicBallFiberCorrespondence.congruenceFiber_eq_closedBall_inter_range) 证明模 $p^k$ 的整数同余纤维恰好等于 $\mathbb{Q}_p$ 中半径 $p^{-k}$ 的闭球与 $\mathbb{Z} \hookrightarrow \mathbb{Q}_p$ 值域的交集（而非整个完备 $p$ 进闭球）。

在更一般的概念动力学侧，只要状态空间按离散层级依次读出，无需借用素数指数赋值，有限视界细化距离本身就天然服从超度量强三角不等式：

::: {.theorem #thm-ch39-p2e-padic-readout title="有限视界概念细化距离的超度量强三角不等式" lean="D5/S3/ConceptDynamics/RefinementGeometry/RefinementUltrametric.refinementDistance_ultrametric"}
设 $X$ 为任意状态类型，$\mathrm{Coordinate} : \mathbb{N} \to \mathrm{Type}^*$ 为按层级索引的坐标类型族，$\mathrm{readout} : (\ell : \mathbb{N}) \to \operatorname{Concept}(X, \mathrm{Coordinate}(\ell))$ 为逐层概念读出序列，$H \in \mathbb{N}$ 为有限观测视界。记共同深度 $\operatorname{commonDepth}(x, y) \le H$ 为 $x, y$ 从第 $0$ 层起连续保持读数一致的最大前缀层数，并定义有限视界细化距离 $d_H(x, y) = \operatorname{refinementDistance}(\mathrm{Coordinate}, \mathrm{readout}, H, x, y) = H - \operatorname{commonDepth}(x, y)$。则无需任何点分离假设，对任意三元状态 $x, y, z \in X$ 恒有

$$
d_H(x, z) \le \max\bigl(d_H(x, y),\; d_H(y, z)\bigr).
$$
:::

::: proof
令 $m = \min\bigl(\operatorname{commonDepth}(x, y),\; \operatorname{commonDepth}(y, z)\bigr)$。对任意层级 $\ell < m$，既有 $\ell < \operatorname{commonDepth}(x, y)$ 又有 $\ell < \operatorname{commonDepth}(y, z)$，故在第 $\ell$ 层上 $\mathrm{readout}(\ell)(x) = \mathrm{readout}(\ell)(y)$ 且 $\mathrm{readout}(\ell)(y) = \mathrm{readout}(\ell)(z)$；由等号传递性得 $\mathrm{readout}(\ell)(x) = \mathrm{readout}(\ell)(z)$。因此 $x$ 与 $z$ 至少在前 $m$ 层连续一致，即 $\operatorname{commonDepth}(x, z) \ge m$。两边同被有限视界 $H$ 相减并反转不等号，即得 $H - \operatorname{commonDepth}(x, z) \le H - m = \max\bigl(H - \operatorname{commonDepth}(x, y),\; H - \operatorname{commonDepth}(y, z)\bigr)$。完整证明由 Lean 内核检查。
:::

这里必须划清一条关键的形式边界：**$p$ 进余数树与 $K$-Bonacci 合法前缀树是两个形式上彼此独立的数学对象**。前者按整数的低位 $p$ 进余数分层，度量采用指数型赋值 $p^{-v_p(x-y)}$；后者按有限二元字的禁 $1^K$ 规则剪枝，[@thm-ch39-p2e-padic-readout] 中的 $d_H = H - \operatorname{commonDepth}$ 是有限视界伪超度量（当读出在视界 $H$ 内分离各点时成为严格超度量），并非按定义等同于指数型 $p$ 进度量，且两个齐肯多夫字的共同前缀长度并不自动等于其解码整数之差的 $p$ 进赋值。将 $K \to \infty$ 时 $\beta_K \nearrow 2$ 的满二元查表极限与素数基数 $p$ 的零进位余数树并置对照（亦可参看[第 36 章](ch36-hyperbolic-steps-and-quotienting-reincarnation.md)商空间分解 [@thm-ch36-quotient-annihilator-and-factorization]），属于跨系统的结构诠释词典（`MODEL`），而非自动成立的拓扑共轭定理。

::: {.viz src="pisot-clifford-rauzy-sandtable" preset="padic" height="500"}
**素数幂余数树与细化超度量卡（`padic`）**：以树状舞台展示模 $p^k$ 同余分层。青色树枝标出两整数共享的低位余数前缀，品红分叉点标出首次区分层级 $k^* = v_p(x-y)+1$，琥珀色高亮当前选定的状态对与视界 $H$。局部同余精度与 `refinementDistance` 强三角不等式属 `LEAN ✓`，与 $K$-Bonacci 树的跨系统对照属 `MODEL`。
:::

在纵向分层树之外，皮索主根在开单位圆盘内的复共轭根又把同一批合法有限字投影到横向收缩空间中。当阶数从 $K = 2$ 跨入 $K = 3$ 时，原本一维的实共轭线段第一次因一对共轭复根而绽放为二维分形内窗。
