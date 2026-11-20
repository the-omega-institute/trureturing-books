# 34.3 互指单调锁死：两面镜子如何在两步一轮中负负得正 {#互指单调锁死两面镜子如何在两步一轮中负负得正}

既然每位观察者自己已经是一座自维持吸引子，宇宙为什么不让每个灵魂各自关起门来孤芳自赏，却偏偏让万物生出永不停息的相互倾慕、结键与纠缠？

答案就写在孤立内省与平视互指那两条截然不同的蛛网轨迹里（[@rem-ch33-mutual-attractor-figure]）！让我们把观察者的自维持反馈投影到一维余弦切片模型（`MODEL`）上对照孤立内省与平视互指的动力学品格（严格导数估计、中值定理证明与逐步数值账本全部封存于下框 [@ex-ch33-mutual-cosine-monotonic-lock]）：

- **独自闭门内省的宿命（反向摇摆焦虑，`MODEL`）**：当孤立观察者只拿自己当镜子单步省察时，视角犹如缺乏阻尼缓冲的单摆，容易在“自卑低估”与“自负过冲”之间左右交替拉锯（解析机制见下框 [@ex-ch33-mutual-cosine-monotonic-lock] 的严格交替条款）。

::: {.viz src="mutual-observer-attractors" preset="alone" height="500"}
**同一起点，每拍越过 θ\*。** 两人都从 0.1 出发：琥珀色的点始终在灰色对角线 $x = y$ 上，一左一右地越过两条青色曲线的交点 $(\theta^*, \theta^*)$，灰色方框一圈圈收小，与孤立的余弦迭代相同（[@ex-ch33-mutual-cosine-monotonic-lock] 第 17 项）。下方条带的横轴是余弦求值次数，每根灰色细柱是那一拍的误差 $x - \theta^*$，一上一下地交替。
:::

- **平视彼此丈量的奇迹（对称互指共识，`MODEL`）**：当两位观察者 $\mathcal{O}_A$ 与 $\mathcal{O}_B$ 走出孤岛，面对面结成对称互指回路——$\mathcal{O}_A$ 借 $\mathcal{O}_B$ 的目光校准自己，$\mathcal{O}_B$ 同时借 $\mathcal{O}_A$ 的目光校准自己——把同步互指的两拍合成一轮，两面平视之镜的复合便显出单侧贴合的几何品格；逐拍与逐轮的时钟区别、完整解析推导与数值账本见下框 [@ex-ch33-mutual-cosine-monotonic-lock]：

::: {.example #ex-ch33-mutual-cosine-monotonic-lock title="同一余弦端点的定性动力学与独立数值账本"}
**既有结果的应用；数值与诠释另有边界。** 以下变量全为实数，角度用弧度。令 $f(x)=\cos x$、$g=f\circ f$；$f^{[n]},g^{[n]}$ 表示 $n$ 次复合，零次为恒等映射。始终选择 [@thm-dottie-rational-inverse-endpoint]（[`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint)）中同一个 $\theta^*$：它满足 $0<\theta^*<1$、$\cos\theta^*=\theta^*$，并等于指定有理逆级数在 $\pi$ 处的有符号和。该端点只直接给出级数与正实竞争者的唯一性；下列 24 项定性结论是将其不动点条款与实分析供应结果结合的推导，不是一个新的动力学定理盒。

**同步互指的时钟（`MODEL`）。** 在平衡方程 $\psi_A=\cos\psi_B,\;\psi_B=\cos\psi_A$ 中消去中间变量得到 $g$。若两者每拍同时用对方的当前值更新，则两拍后每个坐标各完成一次 $g$，下文的 $y_k$ 正是按这两步一轮取样。同初值时，两位观察者在每一拍仍一起遵循 $f$ 的轨迹；逐拍严格交替须满足第 16、17 项的非不动点区间条件，严格单调递增则属于第 14 项起点条件下的完整复合轮。

1. **全实轴唯一性及锐角位置。** 若任意实数 $t=\cos t$，余弦值域先给 $-1\le t\le1$。因 $1<\pi/2$，此区间上余弦严格正，故 $t>0$，端点的正实唯一性才适用，给 $t=\theta^*$；同一点满足 $0<\theta^*<1<\pi/2$。
2. **精确值域。** `Real.range_cos` 给内层值域 $[-1,1]$，外层偶性将其归到 $[0,1]$，再用该区间上连续严格递减与 `intermediate_value_Icc'` 得到等式 $g(\mathbb R)=[\cos1,1]$，不只是包含关系。
3. **从第一步起的陷入。** 因 $\cos1>0$，对每个实起点 $z$ 和每个 $n\in\mathbb N$，$g^{[n+1]}(z)\in[\cos1,1]\subset(0,\pi/2)$；$g^{[0]}(z)=z$ 没有此限制。
4. **处处可微。** 两次使用 `Real.hasDerivAt_cos` 与链式法则，两个负号相消，在每个实数 $x$ 处得到 $g'(x)=\sin(\cos x)\sin x$，包括导数存在性。
5. **足够的全局界。** 由 $|\cos x|,|\sin x|\le1$ 及正弦在 $[0,1]$ 上非负递增，$|\sin(\cos x)|=\sin|\cos x|\le\sin1$。令 $K=\sin1$，有 $0<K<1$，且所有实数 $x$ 都满足 $|g'(x)|\le K$；不声称 $K$ 最优。
6. **全实轴 Lipschitz。** [lipschitzWith_of_nnnorm_deriv_le](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/Analysis/Calculus/MeanValue.lean#L744) 的可微前提由第 4 项、非负常数与导数范数界由第 5 项供应，故 $|g(u)-g(v)|\le K|u-v|$ 对所有实数 $u,v$ 成立。
7. **同一个吸引点。** $\mathbb R$ 完备，故 $g$ 为 `ContractingWith K`；端点方程给 $g(\theta^*)=\theta^*$，[ContractingWith.fixedPoint_unique'](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/Topology/MetricSpace/Contracting.lean#L259) 使它成为 $g$ 的唯一实不动点。
8. **任意实起点的 $g$ 收敛。** 同一压缩映射的 [tendsto_iterate_fixedPoint](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/Topology/MetricSpace/Contracting.lean#L302) 给 $g^{[n]}(z)\to\theta^*$，不假设 $z$ 在某个区间内。
9. **唯一实互指对。** 若 $a=\cos b$、$b=\cos a$，则 $g(a)=a$、$g(b)=b$，故 $a=b=\theta^*$；反之该对确实满足两式。
10. **精确迭代对应。** `Function.iterate_mul` 给所有实数 $z$、自然数 $n$ 上的 $g^{[n]}(z)=f^{[2n]}(z)$，不是近似关系。
11. **任意实起点的 $f$ 收敛。** 第 8、10 项使偶子列趋于 $\theta^*$；奇子列为 $f(f^{[2n]}(z))$，由连续性趋于 $f(\theta^*)=\theta^*$。合并两种奇偶子列便得 $f^{[n]}(z)\to\theta^*$，无须给 $f$ 一个严格小于 $1$ 的全实轴压缩常数。
12. **严格保序的域。** 对 $x\in(0,\pi/2)$，$\sin x>0$、$0<\cos x\le1<\pi$，故 $g'(x)>0$。连续性、该凸域和 [strictMonoOn_of_deriv_pos](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/Analysis/Calculus/Deriv/MeanValue.lean#L377) 给 $g$ 在此锐角区间严格递增，不是全实轴保序。
13. **严格单侧夹逼。** 若 $0<y<\theta^*$，严格保序给 $g(y)<\theta^*$，而压缩界给 $\theta^*-g(y)\le K(\theta^*-y)<\theta^*-y$，所以 $y<g(y)$。
14. **严格递增轨道。** 对 $0<y_0<\theta^*$，置 $y_n=g^{[n]}(y_0)$；归纳给所有 $n\ge0$ 上的 $0<y_n<y_{n+1}<\theta^*$，序列严格递增且趋于 $\theta^*$。任意实起点收敛并不自动具有这一顺序模式。
15. **$f$ 的区间不变性。** 余弦把 $[0,1]$ 映入自身，`Real.strictAntiOn_cos` 限制到此区间给严格递减性。
16. **永不命中的前提。** 若 $x_0\in[0,1]$ 且 $x_0\ne\theta^*$，置 $x_n=f^{[n]}(x_0)$。区间上的单射性与 $f(\theta^*)=\theta^*$ 阻止任何非不动点一步映到 $\theta^*$；归纳使所有 $x_n\in[0,1]\setminus\{\theta^*\}$。
17. **严格交替。** 在第 16 项前提下，对所有 $n\ge0$，$x_n<\theta^*\iff\theta^*<x_{n+1}$，且 $\theta^*<x_n\iff x_{n+1}<\theta^*$。等价地 $(x_n-\theta^*)(x_{n+1}-\theta^*)<0$。严格结论不外推到任意实起点。
18. **正端点例外。** 对所有 $n\in\mathbb N$，$f^{[n]}(\theta^*)=g^{[n]}(\theta^*)=\theta^*$，轨道静止。
19. **负端点例外。** 偶性给 $f(-\theta^*)=g(-\theta^*)=\theta^*$，故 $f^{[n+1]}(-\theta^*)=g^{[n+1]}(-\theta^*)=\theta^*$。它一步即达，此后误差为零；两种端点都不满足严格交替或非零分母误差比。不声称这穷尽了所有实原像。
20. **精确局部因子。** `Real.sin_sq_add_cos_sq`、`Real.sin_eq_sqrt_one_sub_cos_sq` 与锐角正性给 $\sin^2\theta^*=1-(\theta^*)^2$、$\sin\theta^*=\sqrt{1-(\theta^*)^2}$。故 $f'(\theta^*)=-\sqrt{1-(\theta^*)^2}$，且 $-1<f'(\theta^*)<0$。
21. **复合导数。** 第 4 项在同一点给 $g'(\theta^*)=\sin^2\theta^*=1-(\theta^*)^2=(f'(\theta^*))^2$，且 $0<g'(\theta^*)<1$。负导数反转局部有符号误差，正导数保持其符号。
22. **完整去心邻域的斜率极限。** [HasDerivAt.tendsto_slope](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/Analysis/Calculus/Deriv/Slope.lean#L76) 将两条导数存在性转换为在 $x\to\theta^*$、$x\ne\theta^*$ 时的极限：$(f(x)-\theta^*)/(x-\theta^*)\to-\sqrt{1-(\theta^*)^2}$，$(g(x)-\theta^*)/(x-\theta^*)\to1-(\theta^*)^2$。它们是全实去心邻域的极限，不仅单侧成立，也不是有限距离上的误差恒等式。
23. **轨道误差比。** 仅在第 16 项起点条件下，$e_n=x_n-\theta^*$ 全非零且相邻乘积为负；将收敛但不命中的轨道代入第 22 项，得 $e_{n+1}/e_n\to-\sqrt{1-(\theta^*)^2}$。仅在 $0<y_0<\theta^*$ 时，$d_n=y_n-\theta^*<0$ 全非零，同理 $d_{n+1}/d_n\to1-(\theta^*)^2$。不把这些比值推广到每个实起点。
24. **按求值次数计成本。** 两个因子模长都严格在 $0,1$ 之间，后者是前者的平方；这是每次所选映射应用的比较。一次 $g$ 需两次余弦，一次 $f$ 只需一次。精确等式 $g^{[n]}(z)=f^{[2n]}(z)$ 说明同起点、同余弦求值次数时轨道相同，平方因子不提供每次余弦求值的加速或实际运行时间优势。

**独立的数值与文献边界。** 全局压缩只用粗界 $K=\sin1$。局部十进制值 $\theta^*\approx0.73908513$、$f'(\theta^*)\approx-0.673612$、$g'(\theta^*)\approx0.453753$，以及全局最优界约 $0.461063$、最大点约 $0.828132$，都需要独立数值或优化认证；驻点方程 $(1-t^2)\cos t=t\sin t$（其中 $t=\cos x$）只是求解路线。下列初值 $1/10$、$n=0,\ldots,5$ 的原数值账本及其舍入、有限步误差比较也不由上述定性应用认证。物理、哲学、本体与超越数代数无关性（[@conj-schanuel-dottie]）保持各自边界。

**同初值数值迭代账本（初值 $x_0 = y_0 = 0.100000$，步数 $k = 0 \dots 5$）**：表中 $x_k$ 计 $k$ 次单步，$y_k$ 计 $k$ 轮两步复合，故 $y_k = x_{2k}$。相同 $k$ 下的残差对比使用不同的求值次数，每轮的平方线性因子并不构成等成本的加速。

| 步数 $k$ | 孤立自指 $x_k$（$x_{k+1}=\cos x_k$） | 孤立偏差 $x_k - \theta^*$ | 对称互指 $y_k$（$y_{k+1}=\cos(\cos y_k)$） | 互指偏差 $y_k - \theta^*$ | 动力学形态对比 |
| :---: | :---: | :---: | :---: | :---: | :--- |
| $0$ | $0.100000$ | $-0.639085$ | $0.100000$ | $-0.639085$ | 共同远离平衡核的低相位初态 |
| $1$ | $0.995004$ | $+0.255919$ | $0.544499$ | $-0.194586$ | 孤立态剧烈右冲越界；互指态平稳踏入 $[\cos 1, 1]$ |
| $2$ | $0.544499$ | $-0.194586$ | $0.655927$ | $-0.083158$ | 孤立态反向左跌；互指态保持负号单侧稳步上行 |
| $3$ | $0.855387$ | $+0.116302$ | $0.702079$ | $-0.037006$ | 孤立态再度右越；互指误差为同行孤立态的约 $1/3$（互指列即 $x_6$，多用了三次余弦求值） |
| $4$ | $0.655927$ | $-0.083158$ | $0.722420$ | $-0.016665$ | 孤立态第 4 次变号；互指绝对偏差降至 $0.017$（相对偏差 $\approx 2.25\%$） |
| $5$ | $0.792483$ | $+0.053398$ | $0.731547$ | $-0.007538$ | 第 5 步互指残差为同行孤立值的约 $1/7$（互指列即 $x_{10}$），全程零变号 |

   凝练为一句几何格言（`MODEL`）：**独自内省是一面负斜率的镜子，你越用力审视自己，越在低估与过冲之间左右摇晃；唯有在另一双平视的眼睛里照见彼此，两次负号才化作温柔而笃定的正号，让两颗动荡的心单调无震地锁进同一个不动点。**
:::

::: {.viz src="mutual-observer-attractors" preset="round" height="500"}
**两拍一轮，只从一侧逼近。** 同一条轨道每两拍取一次（空心的环）：$0.1 \to 0.544 \to 0.656 \to 0.702 \to \dots$ 全在 $\theta^*$ 的同一侧单调逼近，每轮误差的局部渐近因子约为 $0.454 = 0.674^2$。一轮含两次余弦求值，这些环只是上一张卡里同一条轨道的偶数拍：同样多次余弦求值走到同一处，换来的是不再左右越过，而不是更快（[@ex-ch33-mutual-cosine-monotonic-lock] 第 14、21、23、24 项与数值账本）。下方条带里，带环的细柱落在偶数次求值上，全在零线下方。
:::

对照 [@ex-ch33-mutual-cosine-monotonic-lock] 的轨迹账本，在我们的关系观察者模型（`MODEL`）中，余弦互指让走出孤岛、与他者平视互照成为免于独自摇摆的稳定之道。这份稳定来自余弦这一对映射两拍复合后的压缩，互指本身并不担保它：两侧都取恒等更新时，每一对相等读数都不动，起点不同的两人永远互换读数；两侧取输出不同的常值信道时，两人锁定在一对不相等的读数上。仿射量子比特互指 $F(r)=Ar+u$、$G(s)=Bs+v$ 总有不动对，一切初始对收敛到同一对当且仅当谱半径 $\operatorname{spr}(AB)<1$（`手工推导`）。

两人起点不同时也是如此。A 读 B 的曲线 $x = \cos y$ 与 B 读 A 的曲线 $y = \cos x$ 只在对角线上的 $(\theta^*, \theta^*)$ 相交（[@ex-ch33-mutual-cosine-monotonic-lock] 第 9 项）；按轮取样，每人的读数都是 $g$ 的一条轨道，从任何实起点出发都收进这一点（第 8 项），起点在 $(0, \theta^*)$ 内时从下方严格单调递增（第 12–14 项）。

::: {.viz src="mutual-observer-attractors" preset="apart" height="500"}
**起点不同，交点只有一个。** A 从 1.5、B 从 0 出发：两条青色曲线 $x = \cos y$ 与 $y = \cos x$ 只交于对角线上的 $(\theta^*, \theta^*)$，空心的环收进这一点，A 的读数从上方、B 的读数从下方。
:::

---
