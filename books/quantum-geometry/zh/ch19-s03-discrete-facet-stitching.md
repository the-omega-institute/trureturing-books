# 19.3 锥域与离散容量分片的拼接 {#sec-discrete-facet-stitching}

在 [@ex-bridge-two-three] 中，中间桥割容量 $3ac = 12$ 远大于两侧外边界割 $ad = bc = 6$，因此中间桥不会成为卡死流量的瓶颈。为什么二次锥条件 $a^2 + b^2 \le 3ab$ 与 $c^2 + d^2 \le 3cd$ 恰好落在保证中间三桥不构成瓶颈的自然区域之内？

不妨做一步初等代数检验：当 $a > 0$ 时，不等式 $a^2 + b^2 \le 3ab$ 意味着 $b^2 < a^2 + b^2 \le 3ab$，消去正因子 $b$（若 $b > 0$）即得 $b < 3a$，同理 $c > 0$ 与 $c^2 + d^2 \le 3cd$ 意味着 $d < 3c$。换言之，两个外边界比值 $b/a$ 与 $d/c$ 都被严格关在宽度因子 $3$ 以内：一旦乘上桥宽 $3$，就有 $3ac > bc$ 且 $3ac > ad$！因此，只要参数 $(a, b)$ 与 $(c, d)$ 落在二次锥域 $a^2 + b^2 \le 3ab$ 与 $c^2 + d^2 \le 3cd$（且 $a > 0, c > 0$）之内，中间割 $3ac$ 就永远大于或等于外边界割 $\min(ad, bc)$，从而最小割公式自动脱去外层的 $3ac$！

::: {.viz src="eth-horizon-crossover" preset="narrow" height="500"}
**桥太窄：三条桥成了瓶颈。** 桥图 $(a, b, c, d) = (1, 5, 1, 5)$：两道外割都是 $5$，三条桥却只能过 $3ac = 3$，品红虚线标出的最小割切过腿 $a$、三条桥与腿 $c$。右边的流矩阵是 $5 \times 5$ 的，青色的奇异值在第三个之后归零，秩只有 $3$。$1^2 + 5^2 = 26 > 3 \cdot 1 \cdot 5$，这组维数在锥域之外（[@prop-bridge-flow-cut-bound]）。
:::

::: {.corollary #cor-bridge-cone-mincut title="锥域内最小割" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowBound.cone_QMinCut"}
设自然数 $a, b, c, d \in \mathbb{N}$ 满足 $0 < a$、$0 < c$，且满足二次锥不等式

$$
a^2 + b^2 \le 3ab \qquad\text{与}\qquad c^2 + d^2 \le 3cd.
$$

则最小割容量化简为

$$
\operatorname{QMinCut}(a, b, c, d) = \min(ad, bc).
$$

:::

::: proof
按定义 $\operatorname{QMinCut}(a, b, c, d) = \min(3ac, \min(ad, bc))$，故只需证明 $\min(ad, bc) \le 3ac$。由假设 $a^2 + b^2 \le 3ab$ 与 $c^2 + d^2 \le 3cd$，结合自然数算术，若 $ad \le bc$ 且 $3ac < ad$，则 $3c < d$（由 $a > 0$ 消去 $a$），代入 $c^2 + d^2 \le 3cd$ 将导出 $c^2 + d^2 < d^2$ 的矛盾；同理若 $bc \le ad$ 且 $3ac < bc$，则 $3a < b$（由 $c > 0$ 消去 $c$），代入 $a^2 + b^2 \le 3ab$ 亦导出矛盾。故必有 $\min(ad, bc) \le 3ac$。完整证明由 Lean 内核检查。
:::

请注意 [@cor-bridge-cone-mincut] 的精确前提：本条推论只要求 $0 < a$、$0 < c$ 及两条二次锥不等式 $a^2 + b^2 \le 3ab$、$c^2 + d^2 \le 3cd$，**并不额外要求顺序条件 $a \le b$ 或 $c \le d$**（顺序条件将在下一节构造满秩下界时才引入）。

现在，让我们用本书的**离散分片与粘接视角（R3）**来审视 $\operatorname{QMinCut}(a, b, c, d) = \min(3ac, ad, bc)$ 的几何图景。对正整数维数 $a, b, c, d > 0$，取对数容量坐标

$$
u = \ln a, \qquad v = \ln b, \qquad w = \ln c, \qquad z = \ln d.
$$

由于对数函数严格单调递增，乘积变成加法，最小割的对数容量恰好化为**三张仿射超平面的下包络（lower envelope）**：

$$
\ln\operatorname{QMinCut}(a, b, c, d) = \min(\ln 3 + u + w,\; u + z,\; v + w).
$$

在四维参数空间 $(u, v, w, z)$ 中，这三张仿射平面像多面体的屋顶一样彼此交截，切出三片离散容量分片（facets）：当参数落在锥域内部时，屋顶的最高层 $\ln 3 + u + w$ 退居上方，下方由左边界分片 $u + z = \ln(ad)$ 与右边界分片 $v + w = \ln(bc)$ 沿**粘接接缝**（seam）$u + z = v + w$（即 $ad = bc$）拼接而成。

> 离散张量网络不直接生成光滑流形；它在对数容量的参数空间里切出一张张仿射多面体分片，而瓶颈割的跃迁正是跨越两张分片粘接接缝的折痕。

::: {.example #ex-log-capacity-facets title="对数容量多面体分片与接缝跨越（d = 2 → 3 → 4）"}
固定 $a = 2, b = 3, c = 2$（满足 $0 < a \le b$ 且 $a^2 + b^2 = 13 \le 3ab = 18$），让外腿维数 $d$ 依次取 $2 \to 3 \to 4$，追踪 $\operatorname{QMinCut}(a, b, c, d) = \min(3ac, \min(ad, bc))$ 从左边界分片穿过粘接接缝进入右边界分片的完整轨迹：

1. **左分片内部点 $(a, b, c, d) = (2, 3, 2, 2)$（$d = 2$）**：首先核对 $0 < c \le d$（$2 \le 2$）及二次锥条件 $c^2 + d^2 = 2^2 + 2^2 = 8 \le 3 \cdot 2 \cdot 2 = 12$。此时三道候选割容量为 $(3ac, ad, bc) = (12, 4, 6)$，对数坐标下三张仿射平面取值为 $(\ln 12, \ln 4, \ln 6)$，最小割容量为 $\operatorname{QMinCut}(2, 3, 2, 2) = \min(12, \min(4, 6)) = 4 = ad$。该格点严格落在 $ad < bc$（$4 < 6$）的左边界分片内部，全局最大秩由左边界割 $ad = 4$ 唯一控制。
2. **粘接接缝点 $(a, b, c, d) = (2, 3, 2, 3)$（$d = 3$）**：对数坐标为 $(u, v, w, z) = (\ln 2, \ln 3, \ln 2, \ln 3)$，三张仿射平面的取值分别为

$$
\ln 3 + u + w = \ln 12, \qquad u + z = \ln 6, \qquad v + w = \ln 6.
$$

此时 $(3ac, ad, bc) = (12, 6, 6)$，$ad = 6 = bc$，该格点恰好踩在左分片 $u + z$ 与右分片 $v + w$ 的粘接接缝 $ad = bc$ 上，最小割容量为 $\operatorname{QMinCut}(2, 3, 2, 3) = \min(12, \min(6, 6)) = 6$。

3. **跨越接缝进入右分片 $(a, b, c, d) = (2, 3, 2, 4)$（$d = 4$）**：将 $d$ 从 $3$ 增大到 $4$。首先核对 $(c, d) = (2, 4)$ 依然留在二次锥域内：

$$
c^2 + d^2 = 2^2 + 4^2 = 20 \le 3 \cdot 2 \cdot 4 = 24.
$$

此时三道候选割容量变为 $(3ac, ad, bc) = (12, 8, 6)$，对数容量下包络给出 $\operatorname{QMinCut}(2, 3, 2, 4) = \min(12, \min(8, 6)) = 6 = bc$。综观 $d = 2 \to 3 \to 4$ 的三步演进，候选割三元组依次走过 $(12, 4, 6) \to (12, 6, 6) \to (12, 8, 6)$，完整展示了格点如何从 $ad < bc$ 分片穿过接缝 $ad = bc$ 跃迁入 $ad > bc$ 分片，使控制全局最大秩的唯一瓶颈割由左边界割 $ad$ 切换为右边界割 $bc$。必须强调的是，本章的有限维秩定理只严格标定这些多面体分片上的离散整数维数格点，而不作连续实数维数插值。
:::

::: {.figure src="ch19-facet-seam"}
**最小割是三张平面的下包络，格点越过接缝就换了瓶颈。** 固定 $a = 2, b = 3, c = 2$，横轴是 $\ln d$：粗线先沿蓝色的 $\ln ad$ 上升，在竖直虚线 $ad = bc$ 处折到橙色的 $\ln bc$ 上，灰色的 $\ln 3ac$ 一直在上方。三个格点 $d = 2, 3, 4$ 标着候选割 $(12, 4, 6)$、$(12, 6, 6)$、$(12, 8, 6)$（[@ex-log-capacity-facets]）；定理只标定这些整数格点。
:::
