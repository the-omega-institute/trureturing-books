# 35.6.8 帕里平稳律、逃逸对计数与分形视界熵问题 {#sec-ch39-p2e-entropy}

在讨论“熵”之前，先区分三个层次：有限状态的马尔可夫定律、整数时间轴上完整路径的可测坐标重建，以及对所有不变概率测度的熵比较。路径律、度量熵上界及其达到性、拓扑熵公式已有对应的 Lean 核验。下文给出最大熵测度唯一性的推导，也讨论诱导回归熵。分形纠缠标度仍是开放问题。

在马尔可夫链侧，对任意阶数 $k \ge 2$，令互反帕里参数为 $p = \operatorname{parryParameter}(k) = \beta_k^{-1}$。在带绝对符号位与当前连续 `1` 游程长度的有向状态空间 $\operatorname{State}(k) = \mathrm{Bool} \times \operatorname{Fin} k$ 上，定义后缀权重 $w_j = \operatorname{suffixWeight}(k, p, j) = \sum_{a=0}^{k-j-1} p^{a+1}$、归一化常数 $Z_k = \sum_{j=0}^{k-1} p^j w_j$、符号翻转对合 $\operatorname{flip}(b, j) = (!b, j)$，以及重置转移核 $P_k = \operatorname{kernel}(k, p)$：从状态 $s = (b, j)$ 出发，以概率 $p / w_j$ 翻转符号并重置游程至 $(!b, 0)$，当 $j + 1 < k$ 时以概率 $p\, w_{j+1} / w_j$ 保持符号并推进游程至 $(b, j + 1)$，其余转移概率为 $0$。对应状态分布定义为

$$
\pi_k(b, j) = \operatorname{parryLaw}\bigl(k, (b, j)\bigr) = \frac{p^j w_j}{2 Z_k}.
$$

这组有向重置核的随机性、归一化、平稳不变性与正负号对称性已由 Lean 内核完整验证：

::: {.theorem #thm-ch39-p2e-parry-escape-laws title="有向 K-Bonacci 重置链的帕里随机核、平稳分布与符号翻转对称律" lean="D5/S3/TotalVariation/ParryResetLaw.parry_stationary_law"}
对任意满足 $k \ge 2$ 的自然数阶，令 $p = \operatorname{parryParameter}(k) = \beta_k^{-1}$。则在上述状态空间 $\operatorname{State}(k) = \mathrm{Bool} \times \operatorname{Fin} k$ 上同时成立：

1. **互反主根范围与幂和归一**：$1/2 < p \le \varphi^{-1}$，且 $\sum_{a=1}^k p^a = 1$；
2. **后缀权重与归一化界**：对一切 $j \in \operatorname{Fin} k$ 有 $p \le w_j \le 1$，且归一化因子满足 $1 \le Z_k$；
3. **非负行随机核**：对一切 $s, t \in \operatorname{State}(k)$ 有 $P_k(s, t) \ge 0$，且每一行概率之和满足 $\sum_t P_k(s, t) = 1$；
4. **平稳不变性与符号翻转公平性**：对一切 $s \in \operatorname{State}(k)$ 有 $\pi_k(s) \ge 0$，$\sum_s \pi_k(s) = 1$；对一切目标态 $t \in \operatorname{State}(k)$ 成立平稳方程 $\sum_s \pi_k(s) P_k(s, t) = \pi_k(t)$；且对一切 $s$ 成立符号翻转不变性 $\pi_k(\operatorname{flip}(s)) = \pi_k(s)$。
:::

::: proof
因 $\beta_k$ 在 $k \ge 2$ 上自 $\beta_2 = \varphi$ 严格递增趋向 $2$，其倒数 $p = \beta_k^{-1}$ 严格落在 $(1/2, \varphi^{-1}]$ 内；将特征方程 $\beta_k^k = \sum_{i=0}^{k-1} \beta_k^i$ 两边同乘 $\beta_k^{-k}$ 即得 $\sum_{a=1}^k p^a = 1$。由此可知每个后缀部分和 $w_j = \sum_{a=1}^{k-j} p^a$ 至少包含首项 $p > 0$ 且不超过全和 $1$，并满足末端值 $w_{k-1} = p$ 与向后递推 $w_j = p + p w_{j+1}$（$j + 1 < k$），故 $P_k$ 各元素非负且每行重置项与递增项之和恰为 $(p + p w_{j+1})/w_j = 1$（末端行重置项恰为 $p/p = 1$）。再把左特征幂 $p^j$ 与右特征权重 $w_j$ 相乘并均分给正负两个符号页，流入 $(b, 0)$ 的平稳总质量等于 $\sum_j \frac{p^j w_j}{2 Z_k} \cdot \frac{p}{w_j} = \frac{p}{2 Z_k}\sum_{j=0}^{k-1} p^j = \frac{w_0}{2 Z_k} = \pi_k(b, 0)$，流入 $(b, j+1)$ 的质量亦精确等于 $\frac{p^j w_j}{2 Z_k}\cdot\frac{p w_{j+1}}{w_j} = \pi_k(b, j+1)$，且对合 $\operatorname{flip}$ 仅翻转不影响公式的符号分量。完整证明由 Lean 内核检查。
:::

有限状态只记录“现在的符号与游程”。若要恢复整条轨道，还须给出所有整数时刻的关系位，并指定原点的一个绝对符号。令 $\mathrm{false}=0$、$\mathrm{true}=1$，$\neg$ 表示布尔取反，$\oplus$ 表示异或；定义实际的双向路径空间

$$
\begin{aligned}
X_k&=\operatorname{RelationPath}(k)\\
&=\{r:\mathbb Z\to\mathrm{Bool}\mid
  \forall u\in\mathbb Z,\ \exists i\in\{0,\ldots,k-1\},\ r_{u+i}=\mathrm{false}\},\\
Y_k&=\operatorname{ResetPath}(k)\\
&=\{x:\mathbb Z\to\operatorname{State}(k)\mid
  \forall t\in\mathbb Z,\ P_k(x_t,x_{t+1})>0\}.
\end{aligned}
$$

这里仍取 $k\ge2$、$p=\operatorname{parryParameter}(k)$ 及上述 $P_k=\operatorname{kernel}(k,p)$。$\mathrm{Bool}$ 与 $\operatorname{Fin}k$ 带离散可测结构，函数空间带由各坐标柱集生成的乘积 $\sigma$-代数，$X_k$、$Y_k$ 带相应的子空间可测结构，$\mathrm{Bool}\times X_k$ 带乘积可测结构。对状态 $s=(b,j)$，写 $a(s)=b$、$j(s)=j$（计算下标时把 $j\in\operatorname{Fin}k$ 视为自然数）。给定原点符号 $b$ 与 $r\in X_k$，源码的 `signAt` 在两个时间方向都只作有限次异或：

$$
\begin{aligned}
\operatorname{signAt}(b,r,n)
 &=b\oplus\bigoplus_{i=0}^{n-1}\neg r_i &&(n\in\mathbb N),\\
\operatorname{signAt}(b,r,-n)
 &=b\oplus\bigoplus_{i=0}^{n-1}\neg r_{-i-1} &&(n\in\mathbb N,\ n\ge1).
\end{aligned}
$$

空异或取 $\mathrm{false}$。因此原点值为 $b$，且在每个 $t\in\mathbb Z$ 都满足 $a_{t+1}=a_t\oplus\neg r_t$；关系位为真时保持符号，为假时翻转符号。

::: {.theorem #thm-ch39-p2e-native-bilateral-reset-coding title="双向重置路径的可测坐标重建与锚点斜移位" lean="D5/S3/TotalVariation/ParryBilateralLaw.bilateral_reset_coding"}
对每个自然数 $k\ge2$，存在可测等价 $e:\mathrm{Bool}\times X_k\simeq_{\mathrm m}Y_k$，即双射及其逆映射均可测，并同时满足：

1. 对每个 $b\in\mathrm{Bool}$、$r\in X_k$ 与 $t\in\mathbb Z$，$a(e(b,r)_t)=\operatorname{signAt}(b,r,t)$。
2. 对每个 $z=(b,r)\in\mathrm{Bool}\times X_k$ 与 $t\in\mathbb Z$，令 $j=j(e(z)_t)$，则 $0\le j<k$，并且

   $$
   r_{t-j-1}=\mathrm{false},\qquad
   \forall i\in\mathbb N,\ i<j\ \Longrightarrow\ r_{t-i-1}=\mathrm{true}.
   $$

3. 对每条 $x\in Y_k$，逆映射精确为

   $$
   \begin{aligned}
   e^{-1}(x)&=(a(x_0),\operatorname{readRelation}(x)),\\
   \operatorname{readRelation}(x)_t
     &=\neg\bigl(a(x_t)\oplus a(x_{t+1})\bigr)\quad(t\in\mathbb Z).
   \end{aligned}
   $$

   特别地，读出的关系路径属于 $X_k$。
4. 令 $(\operatorname{relationShift}r)_t=r_{t+1}$。对所有 $(b,r)\in\mathrm{Bool}\times X_k$ 及 $t\in\mathbb Z$，有精确的锚点斜移位公式

   $$
   e\bigl(b\oplus\neg r_0,\operatorname{relationShift}r\bigr)_t
     =e(b,r)_{t+1}.
   $$
:::

::: proof
对任意整数 $t$，前面的 $k$ 位 $r_{t-k},\ldots,r_{t-1}$ 中至少有一个假位。取使 $r_{t-j-1}=\mathrm{false}$ 的最小自然数 $j$，便有 $j<k$，且所有更近的位都为真；这也唯一刻画了后缀。随时间前进一步，假位使后缀归零，真位使后缀加一。把它与上述双向有限异或得到的符号配成状态，定义 $e(b,r)_t$。由于 $p>0$ 且每个 $w_j>0$，$P_k(s,s')>0$ 恰好对应两类边：翻号并归零，或同号并把后缀加一（后缀始终小于 $k$）。故所构造路径确在 $Y_k$。

反过来，任意 $x\in Y_k$ 的正核边都遵循这两条规则。从时刻 $t$ 的后缀 $j$ 向过去回溯：前 $j$ 条边必须同号递增，再前一条边必须翻号归零，给出第 2 项的最近零位刻画。对任意整数块起点 $u$，在 $t=u+k$ 应用这一刻画，就在 $u,\ldots,u+k-1$ 内找到一个读出的假位，故 `readRelation` 属于 $X_k$。原点符号及相邻符号的异或恢复关系位；符号递推在正、负两个方向唯一，后缀又由最近零位唯一确定，因此第 3 项确为双向逆映射。

每个固定时刻的后缀只读前面至多 $k$ 位，符号只读原点锚点与有限段关系位，逆映射的每个关系坐标只读两个相邻状态。因此这些坐标映射在所述乘积及子空间可测结构上均可测。最后，把时间原点移到 $1$，新锚点必为 $b\oplus\neg r_0$；平移后的符号递推与最近零位刻画不变，由两者的唯一性得到第 4 项。完整证明由 Lean 内核检查。
:::

这给出每条受支持双向路径在每个整数原点的可测坐标重建，没有把时间截成非负半轴，也没有把 $Y_k$ 扩成任意状态路径。斜移位会更新锚点：固定选 $b=\mathrm{false}$ 虽可给每条关系路径选一条提升，却不能由此得到与移位交换的固定符号页。单独的编码定理没有指定路径上的概率测度，因而不提供不变概率律的存在性，也不提供锚点公平且独立的联合律。下面另引的概率律定理同时选取编码与测度，补上这两项概率结论。完整柯尔莫哥洛夫—西奈熵的生成分割接口、对所有不变概率测度的熵比较及最大熵等号情形的唯一性，仍需单独建立。

坐标告诉我们怎样读一条路径；概率律还须告诉我们每个有限窗口出现的质量。沿用上文的 $X_k,Y_k,p,w_j,Z_k,\pi_k,P_k$，在下面这一定理中简记 $S=\operatorname{State}(k)=\mathrm{Bool}\times\operatorname{Fin}k$、$Z=Z_k=\operatorname{normalizer}(k)$。令 $u=\operatorname{fairAnchor}$ 为两个符号上的公平概率测度，即

$$
u(\{\mathrm{false}\})=u(\{\mathrm{true}\})=\frac12.
$$

对 $j,h\in\operatorname{Fin}k$，记 $\bar j=j.\mathrm{val}$、$\bar h=h.\mathrm{val}$，定义无符号后缀的质量与转移核

$$
\begin{aligned}
q_j&=\operatorname{suffixLaw}(k,j)=\frac{p^{\bar j}w_j}{Z},\\
Q_{jh}&=\operatorname{suffixKernel}(k,j,h)\\
&=\begin{cases}
p/w_j,&\bar h=0,\\
pw_h/w_j,&\bar h\ne0\ \text{且}\ \bar h=\bar j+1,\\
0,&\text{其余情形}.
\end{cases}
\end{aligned}
$$

这些下标始终属于实际的 $\operatorname{Fin}k$；当 $\bar j=k-1$ 时，没有可用的递增状态。对满足上述四条编码性质的可测编码 $e:\mathrm{Bool}\times X_k\simeq_{\mathrm m}Y_k$，记 $F_e(b,r)=(e(b,r)).\mathrm{val}\in S^{\mathbb Z}$，并令

$$
J_t^e(r)=j\bigl(F_e(\mathrm{false},r)_t\bigr)\in\operatorname{Fin}k.
$$

这里 $J_t^e$ 读的是时刻 $t$ 之前的真位游程。后面的定理使这一后缀由整条关系路径确定，选用 $\mathrm{false}$ 只是写出后缀事件的约定。再记 $(\operatorname{shiftPath}x)_t=x_{t+1}$。公式中的 $\operatorname{ofReal}:\mathbb R\to[0,\infty]$ 是 Lean 的 `ENNReal.ofReal`，将非负实数按原值嵌入，并将负数送到 $0$。

::: {.theorem #thm-ch39-p2e-native-bilateral-parry-law title="实际双向帕里源、独立公平锚点与精确柱集律" lean="D5/S3/TotalVariation/ParryBilateralLaw.bilateral_parry_law"}
对每个自然数 $k\ge2$，存在同一个可测等价 $e:\mathrm{Bool}\times X_k\simeq_{\mathrm m}Y_k$、$X_k$ 上的概率测度 $\mu$ 及整个整数状态路径空间 $S^{\mathbb Z}$ 上的概率测度 $\nu$，同时满足以下各项：

1. 这个 $e$ 满足 [@thm-ch39-p2e-native-bilateral-reset-coding] 的全部四条编码性质。具体地，对每个 $b\in\mathrm{Bool}$、$r\in X_k$、$t\in\mathbb Z$，

   $$
   a(F_e(b,r)_t)=\operatorname{signAt}(b,r,t).
   $$

   令 $j_t=j(F_e(b,r)_t)$，则 $j_t\in\operatorname{Fin}k$，并且

   $$
   \begin{aligned}
   r_{t-j_t.\mathrm{val}-1}&=\mathrm{false},\\
   r_{t-i-1}&=\mathrm{true}\quad(i\in\mathbb N,\ i<j_t.\mathrm{val}).
   \end{aligned}
   $$

   对每条 $x\in Y_k$，

   $$
   \begin{aligned}
   e^{-1}(x)&=(a(x_0),\operatorname{readRelation}(x)),\\
   \operatorname{readRelation}(x)_t
   &=\neg\bigl(a(x_t)\oplus a(x_{t+1})\bigr)\quad(t\in\mathbb Z).
   \end{aligned}
   $$

   对所有 $b,r$ 及每个 $t\in\mathbb Z$，

   $$
   F_e\bigl(b\oplus\neg r_0,\operatorname{relationShift}r\bigr)_t
   =F_e(b,r)_{t+1}.
   $$

2. 两个测度分别在各自移位下平稳：

   $$
   \begin{aligned}
   (\operatorname{relationShift})_*\mu&=\mu,\\
   (\operatorname{shiftPath})_*\nu&=\nu.
   \end{aligned}
   $$

3. 编码把公平锚点与关系源的乘积测度精确送到有符号路径律：

   $$
   (F_e)_*(u\otimes\mu)=\nu.
   $$

   因而这里的原点符号服从 $u$，并与整条关系路径独立。
4. 对每个 $\ell\in\mathbb Z$、$m\in\mathbb N$ 及每个词 $w:\operatorname{Fin}(m+1)\to S$，都有

   $$
   \begin{aligned}
   &\nu\{x\in S^{\mathbb Z}:\ \forall i\in\operatorname{Fin}(m+1),\ x_{\ell+i.\mathrm{val}}=w_i\}\\
   &\quad=\operatorname{ofReal}\!\left(
   \pi_k(w_0)\prod_{i\in\operatorname{Fin}m}
   P_k\bigl(w_{i.\mathrm{castSucc}},w_{i.\mathrm{succ}}\bigr)\right).
   \end{aligned}
   $$

5. 对每个 $\ell\in\mathbb Z$、$m\in\mathbb N$ 及每个词 $v:\operatorname{Fin}(m+1)\to\operatorname{Fin}k$，都有

   $$
   \begin{aligned}
   &\mu\{r\in X_k:\ \forall i\in\operatorname{Fin}(m+1),\ J^e_{\ell+i.\mathrm{val}}(r)=v_i\}\\
   &\quad=\operatorname{ofReal}(q_{v_0})
   \prod_{i\in\operatorname{Fin}m}
   \operatorname{ofReal}\!\left(Q_{v_{i.\mathrm{castSucc}},v_{i.\mathrm{succ}}}\right).
   \end{aligned}
   $$

这里 $i.\mathrm{castSucc},i.\mathrm{succ}\in\operatorname{Fin}(m+1)$ 的自然数值分别为 $i.\mathrm{val}$ 与 $i.\mathrm{val}+1$。第 4、5 项不要求词的转移质量为正；$m=0$ 时乘积为空，取值为 $1$。
:::

::: proof
先用 $\pi_k$ 与 $P_k$ 写出有限有符号状态词的马尔可夫质量。核的行和为 $1$ 保证删去末端坐标后质量相容，$\pi_k$ 的平稳性保证删去首端坐标后相容。对中心窗口 $[-n,n]$ 应用已有的逆极限概率延拓定理，再把相容窗口识别为整数路径，得到 $\nu$。裁剪足够大的中心窗口，就得到任意整数原点的第 4 项。零核边的两点柱集质量为零，而整数边只有可数多条，故 $\nu$ 几乎处处落在 $Y_k$。

通过编码的可测逆映射，把这一受支持的路径律拉回为 $\mathrm{Bool}\times X_k$ 上的概率测度 $\rho$，并令 $\mu$ 为其关系路径边缘。有限有符号词的质量在全体符号同时取反时不变。编码的逆映射在该变换下只翻转原点符号，保持所有关系位。指定这些有限维分布的延拓唯一性把该对称性传到路径律及 $\rho$，所以对任意可测 $A\subseteq X_k$ 与每个 $b\in\mathrm{Bool}$，

$$
\rho(\{b\}\times A)=\frac12\mu(A).
$$

两个锚点切片合起来给出 $\rho=u\otimes\mu$，从而得到第 3 项；独立性适用于整条关系路径的任意可测事件。

最近零位刻画使后缀不依赖锚点符号。把有限有符号词质量对符号求和，初始质量变成 $q_j$，转移质量变成 $Q_{jh}$，得到第 5 项。所有整数原点的有限维分布还给出 $\nu$ 的移位不变性；利用编码的斜移位公式，再投影到关系坐标，得到 $\mu$ 的移位不变性。完整证明由 Lean 内核检查。
:::

这里的存在量词同时选取 $e,\mu,\nu$；陈述没有把一个任意预先选定的编码作为输入。$\nu$ 的定义域是整个 $S^{\mathbb Z}$，而乘积推前等式使它集中在正核路径 $Y_k$ 上。另一方面，$\mu$ 就定义在实际禁 $1^k$ 的双向关系空间 $X_k$ 上，后缀事件使用的正是 $e(\mathrm{false},r)$ 的实际第二坐标。于是“公平且独立”是一条联合概率律，不能仅用公平符号边缘分布来代替。

两条柱集公式保留了源码各自的写法：有符号公式对整个实数乘积作一次 $\operatorname{ofReal}$，无符号公式先对每个因子作 $\operatorname{ofReal}$ 再相乘。这里 $\pi_k,P_k,q,Q$ 的各项均非负，因此用普通实数概率表示时，就是初始质量乘以逐步转移概率。$m=0$ 分别给出单点质量 $\pi_k(w_0)$ 与 $q_{v_0}$；任何含零转移的词，包括违反相应重置规则的禁用词，质量都为 $0$。公式适用于所有整数 $\ell$，也适用于负时间。

给定有限维分布的延拓唯一性，只确定这些分布对应的路径律。现在还可以追问：沿时间轴把两个观测窗口拉开，它们之间的概率关联怎样消退？下面的结果把平稳联合律、混合性与符号选择障碍放在同一组存在量词之下。对所有不变竞争测度的柯尔莫哥洛夫—西奈熵比较与最大熵唯一性另见 [@rem-ch39-p2e-abramov-literature] 的应用推导。同一路径空间的拓扑熵见 [@thm-ch39-p2e-parry-topological-entropy]。

沿用上文的 $X_k,Y_k,S=\operatorname{State}(k)$、$\pi_k$、$F_e$ 及公平锚点测度 $u=\operatorname{fairAnchor}$。这里始终以 $P_k=\operatorname{kernel}(k,\operatorname{parryParameter}(k))$ 表示**带符号状态**的转移矩阵；$Q$ 仍专指上一条概率律中的**无符号后缀**转移核。对有限词 $w:\operatorname{Fin}(m+1)\to S$，记

$$
\begin{aligned}
H_m(w)&=\prod_{i=0}^{m-1}P_k(w_i,w_{i+1}),\\
L_m(w)&=\pi_k(w_0)H_m(w),\\
C_{\ell,m}(w)&=\{x\in S^{\mathbb Z}:\ \forall i\in\operatorname{Fin}(m+1),\ x_{\ell+i.\mathrm{val}}=w_i\}.
\end{aligned}
$$

空乘积取 $1$。给定此类词的有限集合 $A$，令 $E_{\ell,m}(A)=\bigcup_{w\in A}C_{\ell,m}(w)$；它可以表示该有限窗口上的任意事件。对下述存在结论所选取的测度，记 $\nu_{\mathbb R}(D)=(\nu(D)).\operatorname{toReal}$、$\mu_{\mathbb R}(D)=(\mu(D)).\operatorname{toReal}$，即 Lean 的 `Measure.real`。原概率律的两条柱集公式仍保留各自的 $\operatorname{ofReal}$ 写法；下面的联合公式、有限块估计和 $\nu$ 的混合极限使用实数概率。再令

$$
\begin{aligned}
(\sigma x)_t&=x_{t+1},\qquad \tau=\operatorname{relationShift},\\
\rho&=u\otimes\mu,\\
T(b,r)&=(b\oplus\neg r_0,\tau r),\\
\Delta(h)&=\mu_{\mathbb R}\{r\in X_k:\ (h(\tau r)\oplus h(r))\oplus\neg r_0=\mathrm{true}\}.
\end{aligned}
$$

记号 $\sigma^{-n}B$ 与 $T^{-n}B$ 都表示迭代 $n$ 次后的逆像事件。

::: {.theorem #thm-ch39-p2e-native-bilateral-parry-mixing title="实际双向帕里源的混合性与不可取到的零选择缺陷下确界" lean="D5/S3/TotalVariation/ParryBilateralMixing.bilateral_parry_mixing"}
对每个自然数 $k\ge2$，存在一组可测等价 $e:\mathrm{Bool}\times X_k\simeq_{\mathrm m}Y_k$、$X_k$ 上的概率测度 $\mu$ 和整个 $S^{\mathbb Z}$ 上的概率测度 $\nu$，同时满足 [@thm-ch39-p2e-native-bilateral-parry-law] 的全部结论以及下列各项。所保留的九条性质精确为：该定理第 1 项中的四条编码性质（符号重建、最近零位后缀、逆映射、锚点斜移位），第 2 项中的两个平稳等式，第 3 项的公平独立锚点乘积推前等式，以及第 4、5 项的有符号柱集律与无符号后缀柱集律。它们保留原有的全部量词及测度取值形式。

1. 对每个 $\ell\in\mathbb Z$、$a,b,g\in\mathbb N$ 及任意词 $w:\operatorname{Fin}(a+1)\to S$、$v:\operatorname{Fin}(b+1)\to S$，

   $$
   \begin{aligned}
   &\nu_{\mathbb R}\bigl(C_{\ell,a}(w)\cap C_{\ell+a+g,b}(v)\bigr)\\
   &\quad=L_a(w)(P_k^g)(w_a,v_0)H_b(v).
   \end{aligned}
   $$

   这里 $w_a=w_{\operatorname{Fin.last}(a)}$；不要求词可容许，也不要求其质量为正。
2. 对每个 $\ell\in\mathbb Z$、$a,b,g\in\mathbb N$ 及任意有限词集 $A\subseteq S^{\operatorname{Fin}(a+1)}$、$B\subseteq S^{\operatorname{Fin}(b+1)}$，

   $$
   \begin{aligned}
   \Bigl|&\nu_{\mathbb R}\bigl(E_{\ell,a}(A)\cap E_{\ell+a+g,b}(B)\bigr)\\
   &-\nu_{\mathbb R}\bigl(E_{\ell,a}(A)\bigr)\nu_{\mathbb R}\bigl(E_{0,b}(B)\bigr)\Bigr|\\
   &\le\left(\frac34\right)^{\lfloor g/3\rfloor}.
   \end{aligned}
   $$

   指数 $\lfloor g/3\rfloor$ 是自然数除法的商。
3. 对每一对**固定的**可测集 $A,B\subseteq S^{\mathbb Z}$，有实数概率极限

   $$
   \lim_{n\to\infty}\nu_{\mathbb R}(A\cap\sigma^{-n}B)
   =\nu_{\mathbb R}(A)\nu_{\mathbb R}(B),\qquad n\in\mathbb N.
   $$

4. 在公平锚点扩张 $(\mathrm{Bool}\times X_k,\rho,T)$ 上，对每一对固定的可测集 $A,B$，

   $$
   \lim_{n\to\infty}\rho(A\cap T^{-n}B)=\rho(A)\rho(B),\qquad n\in\mathbb N.
   $$

   此式按源码在 $[0,\infty]$ 中取极限；$T$ 关于 $\rho$ 遍历。
5. 对**每个可测映射** $h:X_k\to\mathrm{Bool}$，等变关系

   $$
   h(\tau r)=h(r)\oplus\neg r_0
   $$

   不可能对 $\mu$ 几乎处处的 $r$ 成立，并且 $\Delta(h)>0$。
6. 这些实数缺陷满足

   $$
   \inf\{\Delta(h):\ h:X_k\to\mathrm{Bool},\ h\text{ 可测}\}=0.
   $$

   该下确界不被任何可测 $h$ 取到。
:::

::: proof
从原概率律同时取得 $e,\mu,\nu$ 及其九条性质。先看两个有限词：从第一个词的末态 $w_a$ 到第二个词的首态 $v_0$，把所有中间状态求和，恰好得到矩阵幂 $(P_k^g)(w_a,v_0)$。两侧各自的路径权重给出第 1 项，不需要除以柱集质量。$g=0$ 时另用恒等矩阵处理共同端点。把末态送到未来整块词的映射写成行和为 $1$ 的非负概率通道，再用总变差的数据处理不等式与已有的端点混合估计，对词集求和，得到第 2 项。

有限坐标柱集能在对称差测度下逼近任意可测事件。先对逼近所得的两个固定有限窗口应用衰减估计，再用移位保测度性控制所有时刻的逼近误差，便得到第 3 项的固定事件极限。编码 $F_e$ 是到受支持路径的可测嵌入，满足 $(F_e)_*\rho=\nu$ 且 $F_e\circ T=\sigma\circ F_e$，所以混合极限传回公平锚点扩张。对不变事件应用这一极限，其概率等于自身的平方，得到遍历性。

若可测 $h$ 几乎处处满足所列等变式，图集 $G_h=\{(b,r):b=h(r)\}$ 就在 $T$ 下模零不变。公平且独立的锚点使 $\rho(G_h)=1/2$，与遍历性矛盾。若 $\Delta(h)=0$，布尔恒等式又会使等变关系几乎处处成立，因此每个可测选择器都有严格正缺陷。

另一方面，把依赖有限个严格过去坐标的规则视为 $X_k$ 上的可测映射，精确柱集律把它的实际缺陷识别为已有的有限平稳缺陷。已有有限窗口构造给出趋于零的缺陷上界；其中用到 $0<p<1$ 时多项式乘几何幂趋于零。所有缺陷非负，而常值规则保证取值集合非空，故下确界为零；逐个选择器的严格正性说明它不能取到。完整证明由 Lean 内核检查。
:::

这里的 $g$ 是第一个窗口末端与第二个窗口首端之间的步数。$g=1$ 时两块相邻，$g=0$ 时它们共享时刻 $\ell+a$，不是两个不交窗口。此时 $P_k^0=I$，所以只有 $w_a=v_0$ 才可能有非零联合质量；端点一致时也只把这个共同状态计入一次。含零转移的禁用词仍在公式量词中，其质量为零。$a=0$ 或 $b=0$ 以及负整数原点都不需另加假设。

有限块估计中的第二个边缘写在原点 $0$，与源码一致；平稳性使它等于放在 $\ell+a+g$ 处的边缘。这个估计控制的是指定有限块上的事件。第 3、4 项则先固定任意两个可测事件，再令时间间隔趋于无穷；它们没有为任意随间隔改变的全路径事件提供同一个指数速率。由有限窗口逼近得到的等待时间可以依赖事件与精度。

选择器 $h$ 在这里可以读取整条双向关系路径；严格正缺陷并不限于有限窗口规则。它说每个可测选择器都会在正概率的一步移位比较中违背符号更新关系。下确界为零又说明，可以通过改变规则把这个概率压得任意小，但没有某一个可测规则把它压到零。因而，逐步更新锚点的可测编码与不存在几乎处处等变的可测符号选择器，可以同时成立。

这里的存在量词选出一组同时承载全部结论的 $e,\mu,\nu$，没有把任意预先指定的三元组作为输入，也没有宣称不变概率测度唯一。混合性与选择器障碍已经有了本条引用的依据；完整移位熵、最大熵比较与唯一性、阿布拉莫夫公式、谱隙、可计算采样算法和物理实现仍超出这条定理的结论。下方的边界碰撞概率、有限逃逸对比例与各类熵，仍须分别按各自定义阅读。

在这一平稳律旁，还有两条各自独立的形式化定量定律共同约束边界碰撞与观测盲区：其一是帕里边界柱集上界定理 [`parry_boundary_cylinder_bound`](lean:D5/S3/TotalVariation/ParryBoundaryCylinderBound.parry_boundary_cylinder_bound)，它对给定的 $n \ge 1$ 组正游程对集合 $C$（每段 `1` 游程 $< k$ 且编码长度不超过视界 $R$）证明，左右边界选定前缀的平稳质量分别不超过 $\operatorname{stationaryWordMass}(10)\cdot(1 - S + M)$ 与 $\operatorname{stationaryWordMass}(01)\cdot(1 - S + M)$（这是精确概率不等式，而非分形维数或熵值公式）；其二是与[第 36 章](ch38-observer-memory-pointer-and-ontological-qram.md) §36.6 一脉相承的有限竞技场信息逃逸率判据 [`lowersEscape_iff_uniqueCaptureCount_pos`](lean:D5/S3/ConceptDynamics/InformationEscape/ExactRate.lowersEscape_iff_uniqueCaptureCount_pos)，它证明在基数 $q \ge 2$ 的非退化有限状态集上，观测目录 $S$ 无法区分的有序相异状态对集合 $E(S)$ 定义出归一化有理逃逸率 $e(S) = |E(S)|/[q(q-1)]$，而某项观测 $i$ 严格降低逃逸率当且仅当其唯一捕获对计数 $|U_i| > 0$（且差值恰为 $|U_i|/[q(q-1)]$）。有限有序逃逸对比例 $e(S)$、量子态冯·诺依曼熵 $S(\sigma_b)$ 与无限移位系统的遍历熵在数学定义上彼此独立，绝不可混为一谈。

::: {.theorem #thm-ch39-p2e-parry-ks-entropy title="帕里律达到双向移位的熵上界" lean="D5/S3/TotalVariation/ParryKSEntropy.bilateral_parry_entropy"}
固定 $K\ge2$，记 $p=\operatorname{parryParameter}(K)$，令 $T$ 为合法双向关系路径空间 $X_K$ 上的左移。存在双向编码 $e$ 及 $X_K$ 上的不变概率 $\mu$，使它在每个整数起点的后缀柱集都满足 [@thm-ch39-p2e-native-bilateral-parry-law] 的平稳公式。对这个概率律，

$$
h_{\mathrm{KS}}(\mu,T)=-\log p,\qquad
h_{\mathrm{KS}}(\rho,T)\le-\log p
\quad\text{对 }X_K\text{ 上每个不变概率 }\rho.
$$
:::

::: proof
任意能实现的后缀词若有 $n$ 次转移，其帕里质量的对数就是 $n\log p$ 加上只依赖首、末后缀的项。后缀字母表有限，所以这些项一致有界。Gibbs 不等式以相对于帕里质量的交叉熵给出每个竞争测度的词熵上界。同一个端点估计还给出帕里律自身的词熵下界。除以词长并取极限，端点项消失。

从越来越早的起点读取后缀，得到的划分因平稳性具有相同的熵率。这些划分沿正向移位生成所有布尔坐标，因为一位为假恰好等价于其后一位置的后缀为零。因此共同熵率就是完整的柯尔莫哥洛夫–西奈熵。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch39-p2e-abramov-literature title="实际双向帕里律的最大熵应用与独立文献边界"}
**应用的对象与结论。** 固定任意整数阶数 $K\ge2$（即上文的 $k=K$），令 $p=\operatorname{parryParameter}(K)$、$X_K=\operatorname{RelationPath}(K)$、$T=\operatorname{relationShift}$，即 $(Tr)_t=r_{t+1}$。取 [@thm-ch39-p2e-native-bilateral-parry-law] 同时给出的 $e,\mu,\nu$，下文始终使用其中同一个无符号概率律 $\mu$。对 $X_K$ 上每个满足 $T_*\rho=\rho$ 的 Borel 概率测度 $\rho$，以下应用推导给出

$$
\begin{aligned}
h_{\mathrm{KS}}(\rho,T)&\le-\log p,\\
h_{\mathrm{KS}}(\mu,T)&=-\log p,\\
h_{\mathrm{KS}}(\rho,T)=-\log p
&\quad\Longleftrightarrow\quad\rho=\mu,\\
\rho\ne\mu&\quad\Longrightarrow\quad h_{\mathrm{KS}}(\rho,T)<-\log p.
\end{aligned}
$$

对数为自然对数，单位为每原始步的纳特。$h_{\mathrm{KS}}$ 是所有有限可测分割的熵率的上确界，先视为扩展实数；上式同时证明它在这里是有限值。竞争范围是全部不变 Borel 概率测度，不另假定马尔可夫性、遍历性、生成性质、熵极限或唯一性。有符号扩张 $\nu$ 参与构造 $\mu$，但熵比较的载体始终是无符号空间 $X_K$。推导的所属源文见[双向帕里律的论述](https://github.com/the-omega-institute/trureturing/blob/dev/Blueprint/D5/S3/TotalVariation/ParryBilateralLaw.md)；[@thm-ch39-p2e-parry-ks-entropy] 形式化了上界和达到性。下文的推导还给出等号判据。

**从实际后缀到双向生成分割。** 令 $J_t(r)=J_t^e(r)$，即 $e(\mathrm{false},r)$ 在整数时刻 $t$ 的第二坐标。最近零位刻画使 $J_t$ 恰等于 $t$ 之前的连续真位数，且与符号锚点无关。它对每条合法路径满足

$$
\begin{aligned}
J_{t+1}(r)&=\begin{cases}
0,&r_t=\mathrm{false},\\
J_t(r)+1,&r_t=\mathrm{true},
\end{cases}\\
r_t=\mathrm{false}&\quad\Longleftrightarrow\quad J_{t+1}(r)=0.
\end{aligned}
$$

真位分支自动满足 $J_t+1<K$。对任意 $c\in\mathbb Z$，整数平移 $(\theta_c r)_t=r_{t+c}$ 保持 $X_K$，且 $J_t(\theta_c r)=J_{t+c}(r)$。这些是逐路径恒等式，包括零概率路径。

取有限可测分割 $\mathcal P_j=\{r:J_0(r)=j\}$，$j\in\operatorname{Fin}K$。$T=\theta_1$ 的可测逆为 $\theta_{-1}$。$X_K$ 是离散布尔双向乘积空间的闭子集，带其 Borel 可测结构，因而是标准 Borel 空间。每个后缀格可测；反过来，每个关系位事件由上式中的平移零后缀格恢复，所以 $\mathcal P$ 的**所有整数平移**生成整个 Borel $\sigma$-代数。这里应用的是可逆保概率系统的双向有限生成分割定理，得到

$$
h_{\mathrm{KS}}(\rho,T)=h_\rho(T,\mathcal P).
$$

所用双向生成定理与整数迭代见 Marcel Morgenstern 的[生成定理](https://github.com/marcmorningstar/lean4-ergodic-theory/blob/040fec2e0ddf4fcba49af9f76c866d295308dd7f/ErgodicTheory/Entropy/GeneratorTheoremTwoSided.lean)及[整数迭代](https://github.com/marcmorningstar/lean4-ergodic-theory/blob/040fec2e0ddf4fcba49af9f76c866d295308dd7f/ErgodicTheory/Krieger/ZIterate.lean)，归属与许可见[熵论依据说明](https://github.com/the-omega-institute/trureturing/blob/dev/Library/Entropy/morgenstern2026ks.md)。这些是库依据，不作为本书新增的冻结定理引用。仅用非负时间的生成条件不能代替这里的双向步骤。

**有限历史与熵率。** 对 $n\ge0$、$w\in(\operatorname{Fin}K)^n$，记

$$
\begin{aligned}
A_{\ell,n}(w)&=\{r:\ J_{\ell+i}(r)=w_i\ (0\le i<n)\},\\
m_n(w)&=\rho(A_{0,n}(w)),\\
H_n&=-\sum_w m_n(w)\log m_n(w),\\
c_n&=H_\rho(J_n\mid J_0,\ldots,J_{n-1}).
\end{aligned}
$$

空历史给出单格分割，$H_0=0$；$c_0=H_\rho(J_0)$。零质量项按 $0\log0=0$ 解释。有限分割链式法则给出 $H_{n+1}=H_n+c_n$。增加条件不增条件熵，再用同一联合律的平稳性，得到 $c_{n+1}\le c_n$；这里没有用竞争测度的马尔可夫性。平稳有限分割的 $H_n$ 次可加，Fekete 熵率极限定理给出

$$
\begin{aligned}
h_\rho(T,\mathcal P)&=\lim_{N\to\infty}\frac{H_N}{N},\\
H_N&\le H_m+(N-m)c_m\quad(N\ge m),\\
h_\rho(T,\mathcal P)&\le c_m\quad(m\ge0).
\end{aligned}
$$

第二行只是将 $H_N=H_m+\sum_{i=m}^{N-1}c_i$ 逐项估计，第三行随之取极限。这把熵极限与每个有限历史联系起来，并未把极限存在当作额外假设。有限链式法则、条件熵与极限的依据分别见库中的[分割](https://github.com/the-omega-institute/trureturing/blob/dev/D5/S3/Entropy/KolmogorovSinai/Partition.lean)、[条件化](https://github.com/the-omega-institute/trureturing/blob/dev/D5/S3/Entropy/KolmogorovSinai/GeneratorConditioning.lean)和[熵率](https://github.com/the-omega-institute/trureturing/blob/dev/D5/S3/Entropy/KolmogorovSinai/EntropyRate.lean)；它们的分割条件熵恒等式也不等于下面另列的首次回归公式。

**同一联合分布的 KL 缺陷。** 沿用原律的 $Q=\operatorname{suffixKernel}(K)$、$q_j=\operatorname{suffixLaw}(K,j)$，并写 $R_j=w_j=\operatorname{suffixWeight}(K,p,j)$。由 [@thm-ch39-p2e-parry-escape-laws] 的范围与归一化性质，$p>1/2$、$0<R_j\le1$、$R_0=1$，且 $Q$ 非负、每行和为 $1$。在且仅在允许的边 $i\to j$（$j=0$，或存在的 $j=i+1$）上，$Q(i,j)>0$，并有

$$
\log Q(i,j)=\log p+\log R_j-\log R_i.
$$

固定任意历史长度 $n\ge1$，在有限指标 $(w,j)$ 上取两个数组

$$
\begin{aligned}
a(w,j)&=\rho\bigl(A_{0,n}(w)\cap\{J_n=j\}\bigr),\\
b(w,j)&=m_n(w)Q(w_{n-1},j).
\end{aligned}
$$

它们均非负且总和为 $1$，并满足 $b(w,j)=0\Rightarrow a(w,j)=0$：若 $m_n(w)=0$，其每个扩展质量都为零；若核项为零，后缀递推使这个禁用扩展事件本身为空。因而绝对连续性适用于所有历史，包括零质量历史与禁用转移，而非仅在 $\mu$ 下成立。

对这个实际联合数组，其行和是 $m_n(w)$，下一后缀的列和是 $\rho(J_n=j)$，最后历史后缀的边缘则是 $\rho(J_{n-1}=i)$。后两者由平稳性相同。只在 $a(w,j)>0$ 的项展开对数，零项贡献定义为零，于是

$$
\begin{aligned}
D(a\Vert b)
&=\sum_{a(w,j)>0}a(w,j)\log\frac{a(w,j)}{b(w,j)}\\
&=-c_n-\sum_{a(w,j)>0}a(w,j)\log Q(w_{n-1},j)\\
&=-c_n-\log p.
\end{aligned}
$$

最后一步中 $\log R$ 的两项期望由上述相同边缘精确抵消。[有限 Gibbs 非负性](lean:D5/S3/Divergence/GrandmotherTheorem.kl_divergence_nonneg)给出 $D(a\Vert b)\ge0$，所以对每个 $n\ge1$ 都有

$$
h_{\mathrm{KS}}(\rho,T)\le c_n\le-\log p.
$$

这用的是同一历史—下一后缀联合分布，没有用两个另取的边缘分布替代它。

**等号迫使每段历史服从原核。** 若 $h_{\mathrm{KS}}(\rho,T)=-\log p$，上式迫使每个 $c_n=-\log p$，从而每个历史长度的 $D(a\Vert b)=0$。[Gibbs 等号判据](lean:D5/S3/Divergence/GibbsEquality.kl_divergence_eq_zero_iff)遂给出逐项的 $a=b$。$T$ 可逆且保测度，所以 $\rho$ 在每个 $\theta_\ell$ 下不变；平移后，对所有 $\ell\in\mathbb Z$、$n\ge1$、词 $w$ 与目标后缀 $j$，

$$
\begin{aligned}
&\rho\bigl(A_{\ell,n}(w)\cap\{J_{\ell+n}=j\}\bigr)\\
&\qquad=\rho(A_{\ell,n}(w))Q(w_{n-1},j).
\end{aligned}
$$

历史质量为正时可相除，得到给定这段完整有限历史的下一后缀条件分布就是 $Q(w_{n-1},\cdot)$。未相除的恒等式同时保留零历史；这里不需要也没有断言无限过去的条件期望公式。

**原来的 $\mu$ 确实达到上界。** 原律的第 5 项柱集公式直接给出，对每个 $\ell$、$n\ge1$ 与每个词 $w$，

$$
\mu(A_{\ell,n}(w))=q_{w_0}\prod_{i=0}^{n-2}Q(w_i,w_{i+1}).
$$

$n=1$ 时乘积为空；含零转移的词仍保留在公式内。把词延长一项即得到上一段的未相除转移恒等式，初始质量仍是同一个 $q$，没有另构造候选律。因此在 $\rho=\mu$ 时，每个 $n\ge1$ 的 KL 缺陷为零，$c_n=-\log p$。单调性还给出 $c_0\ge-\log p$，链式法则于是给出 $H_N\ge N(-\log p)$。应用已给出的 Fekete 极限与普适上界，便得 $h_{\mathrm{KS}}(\mu,T)=-\log p$。

**从平稳边缘到整个概率律的刚性。** 仍设 $\rho$ 达到上界。长度一的转移恒等式与平稳性使 $u_j=\rho(J_0=j)$ 满足 $uQ=u$；原律同样满足 $qQ=q$。这个初始边缘的唯一性无需预设：由于每行 $Q(i,0)=p/R_i\ge1/2$，令

$$
\begin{aligned}
d_j&=\tfrac12\mathbf1_{\{j=0\}},\\
U(i,j)&=2\bigl(Q(i,j)-d_j\bigr).
\end{aligned}
$$

$U$ 非负且行和为 $1$。对任意归一化平稳概率行 $u,v$，共同的重置质量抵消，故[总变差的随机信道收缩](lean:D5/S3/TotalVariation/DataProcessing.total_variation_channel_le)给出

$$
\operatorname{TV}(u,v)
=\tfrac12\operatorname{TV}(uU,vU)
\le\tfrac12\operatorname{TV}(u,v).
$$

结合[非负性](lean:D5/S3/TotalVariation/Metric.total_variation_nonneg)与[零值判据](lean:D5/S3/TotalVariation/Metric.total_variation_eq_zero_iff)，得到 $u=v$，特别地 $u=q$。再从这个共同的初始质量出发，对词长使用未相除的转移恒等式归纳，便得 $\rho$ 与 $\mu$ 在每个整数原点的所有有限后缀柱集上相等；长度零的柱集事件为全空间，质量都是 $1$。

通过 $r_t=\mathrm{false}\Longleftrightarrow J_{t+1}=0$，每个有限关系位窗口是一个有限后缀窗口的可测函数。后缀柱集等式因此给出实际布尔关系路径的所有柱集等式。[双向布尔柱集唯一性](lean:D5/S3/Observer/ProbabilisticClosure/TrajectoryLaws/TwelveStateGhost.visible_eq_of_cylinders)使两测度推到 $\mathrm{Bool}^{\mathbb Z}$ 后相等，再由 $X_K$ 的可测子空间嵌入得到 $\rho=\mu$。反方向就是已证的原律达到上界。这证明等号充要条件；在扩展实数序中，普适上界与排除等号又给出每个 $\rho\ne\mu$ 的严格不等式。这里的严格性逐个测度成立，不提供对所有不同测度共同为正的熵差下界。

**一般帕里定理。** 上面的应用给出此双向系统的度量熵上界、达到性与唯一性。一般有限型子移位的最大熵定理见下列文献。M. Pollicott 等人的综述 *The mathematical research of William Parry FRS*（[机构存档 PDF](https://wrap.warwick.ac.uk/id/eprint/682/1/WRAP_pollicott_Parry_research.pdf)，§2.3，pp. 323–324；DOI：[10.1017/S0143385708000102](https://doi.org/10.1017/S0143385708000102)）在有限邻接矩阵**本原，即不可约且非周期**的假设下介绍唯一的内禀马尔可夫最大熵测度；单独的非周期性不代替不可约性。本节阅读的是这篇综述；Parry 的 1964 年原论文（*Trans. Amer. Math. Soc.* **112**, 55–66；DOI：[10.1090/S0002-9947-1964-0161372-1](https://doi.org/10.1090/S0002-9947-1964-0161372-1)）只核对了书目信息，未阅读原文。

**首次回归的阿布拉莫夫公式：独立文献结果，未在本书形式化。** L. M. Abramov（*Dokl. Akad. Nauk SSSR* **128**, 1959, 647–650）证明：在保概率遍历动力系统 $(X,\mathcal B,\eta,S)$ 中，若可测回访集 $A\in\mathcal B$ 满足 $\eta(A)>0$，则首次回归时间 $\tau_A(x)=\min\{n\ge1:S^nx\in A\}$ 在 $A$ 上几乎处处有限。以 $S_A(x)=S^{\tau_A(x)}x$ 表示诱导映射，以 $\eta_A(B)=\eta(B\cap A)/\eta(A)$ 表示归一化条件测度，则

$$
h_{\eta_A}(S_A)=\frac{h_\eta(S)}{\eta(A)}.
$$

两边须使用相同的对数底；左边以每次回归计量，右边的 $h_\eta(S)$ 以原始每步计量。上面的最大熵应用没有证明这条首次回归公式，也没有据此提供物理实现、不可逆读出或有限 $p$ 进余数树的熵公式。对这些对象应用文献结果，仍须分别建立实际的保测度系统、回访集及对应关系。
:::

::: {.theorem #thm-ch39-p2e-parry-topological-entropy title="双向帕里移位的拓扑熵" lean="D5/S3/TotalVariation/ParryTopologicalEntropy.bilateral_entropy"}
设 $K\ge2$。在布尔路径空间 $\mathrm{Bool}^{\mathbb Z}$ 上取乘积一致结构，令 $X_K$ 为每个长度为 $K$ 的窗口都含零的路径集。记 $T$ 为向左移一位，$\beta_K$ 为 $K$ 阶 d-bonacci Perron 根。取 Mathlib 在 $X_K$ 上的覆盖熵，则

$$
h_{\mathrm{top}}(T,X_K)=\log\beta_K.
$$
:::

::: proof
每个合法的有限字都可以在右端补零，延拓为单边路径。记 $n$ 位字数为 $a_n$。字数和 $\beta_K^n$ 满足同一 $K$ 项递推，初值给出 $\beta_K^n\le a_n\le 2^K\beta_K^n$。取对数、除以 $n$ 并取极限，得到单边移位的拓扑熵 $\log\beta_K$。

对任意非正整数起点，从该处读取整个向右尾部，便把双边路径空间满射到同一个单边子移位，且读取与移位可交换。起点向左移动时，读数包含任给的有限坐标集。双边乘积一致结构的每个邻域关系都能在某次尾部读取中检验，因此双边覆盖熵等于单边覆盖熵。完整证明由 Lean 内核检查。
:::

逐位取反把此模型对应到 $S=\{0,\ldots,K-1\}$ 的有限 $S$-间隔移位。Ahmadi Dastjerdi 与 Jangjoo 的熵函数也给出这里的公式。 [Computations on Sofic S-gap Shifts](https://doi.org/10.1007/s12346-013-0096-2)

以比特计量时除以 $\log 2$，得到 $\log_2\beta_K$ 比特每步。$K=2,3,4$ 时的数值依次约为 $0.69424$、$0.87915$、$0.94678$ 比特每步。随 $\beta_K\nearrow2$，该值单调趋向每步一比特。

在上述双向帕里系统里，可以把回访集取为刚刚读到一个零的路径。每条路径至多再读 $K$ 步就会遇到零。此时，原测度可以从回访集上的条件测度重构。

::: {.theorem #thm-ch39-p2e-native-parry-first-return title="双向帕里源的首次回归与占据测度" lean="D5/S3/TotalVariation/ParryFirstReturn.actual_first_return_system"}
设 $K\ge2$。在 $X_K$ 上令 $T$ 为左移，令 $J_t$ 为上述双向编码在时刻 $t$ 给出的后缀长度。取一组满足 [@thm-ch39-p2e-native-bilateral-parry-law] 中最近零位条件、左移不变性与后缀柱集公式的编码和概率 $\mu$。令 $A=\{r:r_{-1}=\mathrm{false}\}$。则 $A=\{J_0=0\}$，且 $\mu(A)=1/\operatorname{normalizer}(K)>0$，其中 $\operatorname{normalizer}(K)=\sum_{j=0}^{K-1}p^jR_j$。

对每条 $r\in X_K$，令 $\tau(r)$ 为满足 $T^{\tau(r)}r\in A$ 的最小正整数。它满足 $1\le\tau(r)\le K$。映射 $T_A(r)=T^{\tau(r)}r$ 保持概率 $\mu_A=\mu|_A/\mu(A)$，其中 $\mu_A$ 表示为定义在 $X_K$ 上、集中于 $A$ 的测度。原概率满足测度等式

$$
\mu=\mu(A)\sum_{i=0}^{K-1}(T^i)_*
  \bigl(\mu_A|_{\{r:\,i<\tau(r)\}}\bigr).
$$
:::

::: proof
$J_0$ 记录位置 $0$ 前面连续真的位数，因此 $J_0=0$ 恰好表示 $r_{-1}=\mathrm{false}$。长度为一的后缀柱集公式给出这个事件的概率。每个位置向前至多 $K$ 步就会遇到零。按首次回归时间划分 $A$ 后，每块上的回归映射都是一个固定次数的左移。对像路径，从索引 $-2$ 开始向过去寻找第一个零，把这个零移到索引 $-1$ 就唯一找回反向分支。因此各块的像互不相交并覆盖 $A$。左移不变性由此给出条件概率的不变性。

对第 $i$ 层，只选从 $A$ 出发且走了 $i$ 步仍未回返的路径。把这些路径左移 $i$ 步，恰好得到 $J_0=i$ 的全部路径。向后平移 $i$ 步找回该层在 $A$ 中的起点，最近零位条件排除了中间回返。于是对每个可测事件，可以按 $J_0$ 的值把它的质量拆开。把各层的条件概率乘回 $\mu(A)$ 并相加，就恢复了原事件的质量。完整证明由 Lean 内核检查。
:::

现在考虑同一时长字母表上的任意概率分布。一次回返携带的熵须除以平均经过的原始位数，才能与每步熵比较。

::: {.remark #rem-ch39-p2e-parry-duration-entropy-rate title="帕里分布唯一最大化每原始步熵"}
设 $K\ge2$，$p=\beta_K^{-1}$，$q_d=p^d$，其中 $1\le d\le K$。令 $a=(a_1,\ldots,a_K)$ 为任意概率向量，$H(a)=-\sum_d a_d\log a_d$，$\ell(a)=\sum_d d\,a_d$。以自然对数计量，并取概率为零的项为零，则

$$
D(a\Vert q)=-H(a)-\ell(a)\log p,
\qquad
\frac{H(a)}{\ell(a)}\le-\log p.
$$

当且仅当 $a=q$ 时取等号。

逐项展开 $a_d\log(a_d/q_d)$，并代入 $\log q_d=d\log p$。概率为零时，各项直接为零。由于时长至少为一，$\ell(a)\ge1$。由[有限 Gibbs 不等式](lean:D5/S3/Divergence/GrandmotherTheorem.kl_divergence_nonneg)，相对熵非负，除以平均时长便得上界。[Gibbs 等号判据](lean:D5/S3/Divergence/GibbsEquality.kl_divergence_eq_zero_iff)给出最优分布的唯一性。
:::

::: {.theorem #thm-ch39-p2e-parry-raw-window title="帕里零截面上的原始比特窗口" lean="D5/S3/TotalVariation/ParryFirstReturn.zero_section_raw_window"}
采用 [@thm-ch39-p2e-native-parry-first-return] 的编码与测度，记 $p=\beta_K^{-1}$、$h_j=\sum_{\ell=1}^{K-j}p^\ell$。设 $v_0,\ldots,v_m\in\{0,\ldots,K-1\}$ 从 $v_0=0$ 出发，在每一步满足 $v_{i+1}\in\{0,v_i+1\}$。令 $w_i=\mathbf{1}_{v_{i+1}\ne 0}$，其中 $0\le i<m$，而 $0$ 和 $1$ 分别表示假和真的关系位。则

$$
\mu_A\{r:(r_0,\ldots,r_{m-1})=w\}=p^m h_{v_m}.
$$

当 $m=0$ 时，事件为整个路径空间，且 $h_0=1$。
:::

::: proof
在 $A$ 上，位置零的后缀长度为零。之后每个原始比特使后缀重置为零或加一。从 $v_0=0$ 归纳，$A$ 上的原始窗口事件恰好是单个后缀柱集 $(v_0,\ldots,v_m)$。柱集质量除以 $\mu(A)$ 后消去初始后缀质量，合法转移概率中的比值 $h_{v_{i+1}}/h_{v_i}$ 望远镜相消，留下 $h_{v_m}$。因此窗口末端的未完成游程保留了一个后缀权重。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch39-p2e-parry-zero-marginals title="原始移位下的零截面条件律" lean="D5/S3/TotalVariation/ParrySectionMarginals.section_zero_marginals"}
采用 [@thm-ch39-p2e-native-parry-first-return] 的双向帕里律与条件概率 $\mu_A$，记 $p=\beta_K^{-1}$。则

$$
\mu_A\{r:r_0=0\}=p,\qquad
\mu_A\{r:r_1=0\}=2p^2.
$$

单步左移 $T$ 不保持 $\mu_A$。
:::

::: proof
窗口 $0$、$00$ 与 $10$ 都以零后缀结束。由 [@thm-ch39-p2e-parry-raw-window]，其条件质量依次为 $p$、$p^2$ 与 $p^2$。窗口 $00$ 与 $10$ 不交，且穷尽 $r_1=0$ 的事件，该事件是 $r_0=0$ 在 $T$ 下的原像。因为 $p>1/2$，原像质量严格更大。完整证明由 Lean 内核检查。
:::

一段回返轨道可以按「读到下一个零用了几步」来记录。在零截面上，连续回返的联合概率可以直接从原路径的后缀柱集算出。

::: {.theorem #thm-ch39-p2e-parry-return-durations title="双向帕里源的回返时长联合分布" lean="D5/S3/TotalVariation/ParryFirstReturn.return_time_cylinder_probability"}
沿用 [@thm-ch39-p2e-native-parry-first-return] 的 $K$、编码和概率 $\mu$，以及零截面 $A$、首次回归时间 $\tau$、回归映射 $T_A$ 和条件概率 $\mu_A$。令 $p=\beta_K^{-1}$。对任意有限时长序列 $d_0,\ldots,d_{m-1}\in\{1,\ldots,K\}$，有

$$
\mu_A\bigl(\{r\in A:\tau(T_A^i r)=d_i\ \text{对每个 }0\le i<m\}\bigr)
=\prod_{i=0}^{m-1}p^{d_i}.
$$

$m=0$ 时，事件为整个截面，空乘积为 $1$。
:::

::: proof
一次时长为 $d$ 的回返对应后缀序列 $0,1,\ldots,d-1,0$。末尾的零同时是下一段回返的起点。把相邻段的公共零位重合起来，整个时长事件就恰好是原路径上的一个后缀柱集。沿每条允许的转移，后缀核贡献一个 $p$ 和终点权重与起点权重之比。所有权重之比相消，因为首末后缀都是零。柱集概率里的初始质量 $\mu(A)$ 再由条件化约去，留下每段一个 $p^d$。完整证明由 Lean 内核检查。
:::

回返时长的分布还能计算诱导系统的熵。这里的一步是一次回返，可能跨过原系统的多个位置。

::: {.theorem #thm-ch39-p2e-parry-induced-entropy title="帕里零截面诱导映射的柯尔莫哥洛夫–西奈熵" lean="D5/S3/TotalVariation/ParryInducedEntropy.actual_return_entropy"}
在 [@thm-ch39-p2e-native-parry-first-return] 的假设下，令 $T_A$ 为同一个零截面上的实际首次回归映射，$\mu_A$ 为其归一化条件概率。记 $p=\beta_K^{-1}$。以自然对数计量，有

$$
h_{\mu_A}(T_A)
=-\sum_{d=1}^{K}p^d\log(p^d)
=\frac{-\log p}{\mu(A)}.
$$

熵以每次回返为单位。
:::

::: proof
由 [@thm-ch39-p2e-parry-return-durations]，前 $n$ 次回返的时长联合熵等于 $n$ 倍的单次时长熵。用时长划分得到柯尔莫哥洛夫–西奈熵的下界。

为求上界，在前 $n$ 个回归点各取一个半径为 $m$ 的关系位窗口。一段时长 $d$ 唯一确定字块 $1^{d-1}0$。知道起点之前的 $m$ 个关系位和前 $n+m$ 个时长，就能重构所有这些窗口。前者至多贡献 $m\log 2$ 的熵。除以 $n$ 并取极限，任意固定半径的窗口熵率都至多等于单次时长熵。半径递增的窗口生成整个双向路径的可测结构，因此这个上界也适用于所有有限可测划分的熵率上确界。

最后，展开平稳后缀权重。对每个 $d$，$p^d$ 在归一化和中出现 $d$ 次，因此 $\sum_{d=1}^K d\,p^d=\operatorname{normalizer}(K)=1/\mu(A)$。把 $\log(p^d)=d\log p$ 代回即得第二个等号。完整证明由 Lean 内核检查。
:::

至于横向内部空间的劳齐分形边界维数 $D_F = \dim_H(\partial\mathcal{R}_K)$ 是否会在量子多体切投态中诱导出反常的分形边界纠缠标度，在严格数学物理中仍是一道悬而未决的开放问题：

::: {.problem #prob-ch39-p2e-fractal-horizon title="开放问题：皮索切投量子多体系统的劳齐分形视界纠缠标度"}
设阶数 $K \ge 3$ 的皮索切投点集或局域受约束多体哈密顿量，其内部接受窗 $\mathcal{R}_K$ 具有豪斯多夫维数严格大于整数余维的拓扑分形边界（例如 $K = 3$ 时文献结果给出 $D_F = \dim_H(\partial\mathcal{R}_3) \approx 1.09336 > 1$）。是否存在严格构造的一族局域有能隙基态或切投编码量子态，当区域特征尺度 $R \to \infty$ 时，其跨边界双体纠缠熵 $S_{\mathrm{ent}}(R)$ 严格服从由内部劳齐边界维数 $D_F$ 支配的反常标度律（如主项 $S_{\mathrm{ent}}(R) \asymp R^{D_F}$ 或精确锁定系数的对数/次主导分形修正项），并能给出标准余维一面积律失效或保持的充要谱间隙与局域性判据？在本书框架内，任何诸如 $S_{\mathrm{ent}} \propto R^{D_F}$ 的“分形视界面积律”表述均作为待证开放问题（`OPEN`）与启发性物理构想（`MODEL`）列出，绝不作为已证形式定理或引力面积律定理宣称。
:::

::: {.remark #rem-ch39-p2e-physical-tribonacci-interface title="物理 Tribonacci 文献模型与有限 Slater 前缀应用"}
**文献模型与边界约定。** 一个可供研究的具体物理对象是零在位势的最近邻跃迁链。依 Kolehmainen–Lado–Moustaj，*One-dimensional quasicrystals with tensor-network finite-state automata*（[arXiv:2609.06040v1](https://arxiv.org/pdf/2609.06040v1)，§III 式 (2)–(3)、附录 B.2），取替代规则 $\sigma(A)=AB$、$\sigma(B)=AC$、$\sigma(C)=A$，以及从 $A$ 出发的不动无限词 $W=\lim_{j\to\infty}\sigma^j(A)$，字母从 $W_0$ 编号。固定 $0<\rho<1$，以 $t_C=1$ 为能量单位，令 $t_A=\rho^2$、$t_B=\rho$，即 $t_A/t_B=t_B/t_C=\rho$。对每个整数 $N\ge2$，在单粒子格点空间 $\mathbb{C}^N$ 的基 $\{\lvert i\rangle:0\le i<N\}$ 上定义

$$
h_N=\sum_{i=0}^{N-2}t_{W_i}\bigl(\lvert i\rangle\langle i+1\rvert+\lvert i+1\rangle\langle i\rvert\bigr).
$$

这里使用 $W$ 的前 $N-1$ 个字母标记键，端点 $0$ 与 $N-1$ 不相连。该文张量中的数位编码的是这个单粒子格点指标；沿二进制或 Tribonacci 地址数位切分张量指标，并未指定实空间多体二分。这一区别也限制了与 §35.6.7 的直接编码纠缠秩之间的类比：不能据此把合法字的等权叠加认作该跃迁链的 Slater 基态。

**指定偶数开前缀的谱距离。** 令

$$
\begin{aligned}
L_j&=\lvert\sigma^j(A)\rvert,\qquad N_j=2\lfloor L_j/2\rfloor,\\
h_{\rho,j}&=h_{N_j}\quad(j\ge1).
\end{aligned}
$$

在这些确定的偶数格点开前缀上，定义

$$
\delta_{\rho,j}:=\min\{\lvert\lambda\rvert:\lambda\in\operatorname{Spec}(h_{\rho,j})\}.
$$

[@thm-ch39-p2e-tribonacci-open-chain-zero-gap] 的单独陈述给出每个固定 $\rho\in(0,1)$ 的全序列极限。更强的 [@ex-ch39-p2e-tribonacci-prefix-rate] 保留定量纸面推导：对所有 $j\ge4$、$0<\rho<1$，有 $\delta_{\rho,j}\le73728/N_j$，并由此得到关于 $\rho$ 的一致收敛。整条定量应用仍以纸面证明呈现，不带独立 Lean 验证徽章，也不声称解决外部新猜想。有限矩阵的可逆性、无限体积谱中零点的归属、有限分辨率态密度或 Anderson 局域化意义下的临界性，都不能直接替代这一指定边界与前缀序列的极限证明。Krebbekx–Moustaj–Dajani–Morais Smith 的 *Multifractal Properties of Tribonacci Chains*（[*Phys. Rev. B* **108**, 104204](https://doi.org/10.1103/PhysRevB.108.104204)，§II.B.1、§III.A.1、§V）采用周期逼近与微扰重整化研究物理谱及临界性；本书不将其解释为上述对所有 $\rho\in(0,1)$ 的有限开链结论。

**有序 Slater 振幅与字面前缀部分迹。** 下面的有限维应用独立于跃迁参数，允许任意自然数 $N$、$0\le k\le N$ 和复矩阵 $V\in\mathbb{C}^{N\times k}$，只要求 $V^\dagger V=I_k$。让原始格点保持自然顺序 $0,\ldots,N-1$，以布尔占据串的占据子集 $S$ 标记正交归一基 $\lvert S\rangle$。对大小为 $k$ 的 $S$，令 $V_S$ 按递增格点顺序保留这些行，列顺序保持不变，定义同一个实际多体向量

$$
\langle S\mid\Psi_V\rangle=
\begin{cases}
\det(V_S),&\lvert S\rvert=k,\\
0,&\lvert S\rvert\ne k.
\end{cases}
$$

空行列式取 $1$，所以 $k=0$ 给出真空。占据基已经归一化，振幅不再乘以 $1/\sqrt{k!}$。对 $V^\dagger,V$ 在自然格点次序下应用[矩形柯西–比内恒等式](lean:D5/S3/Quantum/Schatten/CompoundMatrices.cauchyBinet)，得到

$$
\sum_{|S|=k}\overline{\det(V_S)}\det(V_S)
=\det(V^\dagger V)=1.
$$

因而归一化来自列正交性。Dereziński 的 [*Clifford algebras and fermions*](https://www.fuw.edu.pl/~derezins/clifford.pdf)，§7.1–§7.2 式 (7.51)–(7.54)，给出 CAR、有序占据基与归一化 Slater 行列式的文献背景。把这个向量用于上述跃迁链的基态时，仍须指定所占模式、填充及多体哈密顿量，并核对能量最小性。

指定 $0\le\ell\le N$ 和连续前缀 $I=\{0,\ldots,\ell-1\}$。令 $a,a'\in\{0,1\}^{\ell}$、$b\in\{0,1\}^{N-\ell}$；$ab$ 表示按原始格点顺序先接前缀、再接尾部。定义

$$
\begin{aligned}
\psi_V(a,b)&:=\langle ab\mid\Psi_V\rangle,\\
M_V((a,b),(a',b'))&:=\psi_V(a,b)\overline{\psi_V(a',b')},\\
R_V(a,a')&:=\sum_{b\in\{0,1\}^{N-\ell}}
\psi_V(a,b)\overline{\psi_V(a',b)}.
\end{aligned}
$$

这是有序格点张量积上的普通部分迹 $R_V=\operatorname{Tr}_{\mathrm{tail}}M_V$，保留全部 $2^\ell$ 个前缀占据串。秩一矩阵 $M_V$ 半正定，[部分迹保半正定性](lean:D5/S3/Quantum/Information/PartialTraceMutualInformation.partialTraceRight_posSemidef)给出 $R_V\ge0$；将其对角和按拼接双射重排，前面的归一化给出 $\Tr R_V=1$。以下 $\rho_I$ 就是以这个 $R_V$ 为矩阵的密度态。

**原基中的酉对应与完整谱。** 写 $X=V_I$ 为前 $\ell$ 行、$Y$ 为其余 $N-\ell$ 行，令 $A=XX^\dagger$。全空间投影 $P=VV^\dagger$ 与 $I_N-P$ 均半正定；压缩后得到 $0\le A\le I_\ell$。取 $A$ 的正交归一特征向量矩阵 $Q$，并保留全部 $\ell$ 个特征值 $\nu_i$，于是

$$
\begin{aligned}
Q^\dagger Q&=QQ^\dagger=I_\ell,\\
Q^\dagger A Q&=\operatorname{diag}(\nu_1,\ldots,\nu_\ell),
\qquad 0\le\nu_i\le1,\\
\widetilde V&=(Q^\dagger\oplus I_{N-\ell})V.
\end{aligned}
$$

这里 $\widetilde V$ 的前缀行是 $\widetilde X=Q^\dagger X$，尾部仍为 $Y$，且 $\widetilde V^\dagger\widetilde V=I_k$。定义作用在全部 $m$ 格点占据串上的矩阵 $\Gamma_m(B)$：当两串占据子集等大时，其条目是 $B$ 在这两个子集上按自然递增行、列取出的子式；大小不等时条目为零。真空扇区的条目是空行列式 $1$。逐粒子数扇区应用柯西–比内恒等式，得到

$$
\begin{aligned}
\Gamma_m(BC)&=\Gamma_m(B)\Gamma_m(C),\\
\Gamma_m(B^\dagger)&=\Gamma_m(B)^\dagger,\qquad
\Gamma_m(I_m)=I_{2^m}.
\end{aligned}
$$

所以单粒子酉矩阵提升为整个布尔占据空间上的酉矩阵。这里始终使用自然次序；若改用固定经典次序的复合矩阵，须在左右占据子集各乘上对应重排的符号，不能直接忽略次序差异。

前缀格点全部先于尾部格点，因此分块子式没有额外交换符号，且

$$
\Gamma_N(B\oplus I_{N-\ell})(ab,a'b')
=\Gamma_\ell(B)(a,a')\,\delta_{bb'}.
$$

对同一个行列式向量应用这个恒等式，再用[局部共轭与部分迹恒等式](lean:D5/S3/Quantum/Dynamics/KickedIsingNegativityRefutation.trace_local_right)（尾部矩阵取恒等），得到实际边缘矩阵之间的关系

$$
\begin{aligned}
G&=\Gamma_\ell(Q^\dagger),\qquad G^\dagger G=GG^\dagger=I_{2^\ell},\\
R_{\widetilde V}&=G R_V G^\dagger.
\end{aligned}
$$

这个变换律由振幅与部分迹推出，没有假定关联矩阵变换律或高斯性。

还须计算 $R_{\widetilde V}$ 本身。对等大的前缀占据子集 $S,T$，记 $r=|S|=|T|$，并让 $\widetilde X_S,\widetilde X_T$ 保留各自递增的行。对叠在 $Y$ 上方的这些行赋多项式权重 $t$，对尾部行赋权重 $1$。柯西–比内展开中 $t^r$ 的系数恰好选出包含全部指定前缀行的子式，故

$$
R_{\widetilde V}(S,T)
=[t^r]\det\bigl(Y^\dagger Y+t\widetilde X_T^\dagger\widetilde X_S\bigr).
$$

这里 $[t^r]$ 表示取系数。令 $E_{T,S}$ 把 $S$ 的第 $q$ 个递增坐标送到 $T$ 的第 $q$ 个递增坐标，其余条目为零。利用 $Y^\dagger Y=I_k-\widetilde X^\dagger\widetilde X$，以及 $\det(I+BC)=\det(I+CB)$，上式中的行列式等于

$$
\det\bigl(I_\ell-D+tE_{T,S}D\bigr),
\qquad D=\operatorname{diag}(\nu_1,\ldots,\nu_\ell).
$$

按 $T$ 及其补集分块，$t^r$ 的系数是 $E_{T,S}D$ 在 $T$ 上的主子式，乘以 $\prod_{i\notin T}(1-\nu_i)$。当 $S=T$ 时该主子式为 $\prod_{i\in S}\nu_i$；当 $S\ne T$ 时，$T\setminus S$ 中的坐标给出零列，故系数为零。若 $|S|\ne|T|$，同一尾部占据子集不可能让两个总粒子数同时为 $k$，原部分迹中的每项已经为零。这就逐条计算出

$$
\begin{aligned}
b_i(0)&=1-\nu_i,\qquad b_i(1)=\nu_i,\\
\lambda_a&=\prod_{i=1}^{\ell}b_i(a_i),\qquad a\in\{0,1\}^{\ell},\\
R_{\widetilde V}&=\operatorname{diag}(\lambda_a),\\
U&=G^\dagger,\qquad
R_V=U\operatorname{diag}(\lambda_a)U^\dagger.
\end{aligned}
$$

最后一行把结论送回原格点基中的同一个 $R_V$。[厄米矩阵酉相似的谱重排定理](lean:D5/S3/Quantum/Schatten/MatrixSimilarity.IsHermitian.eigenvalues_eq_of_unitary_similarity_diagonal)因此将它的全部特征值按一个布尔占据串的置换与 $\lambda_a$ 逐项对应。谱多重集恰有 $2^\ell$ 项，相同数值、零特征值与不可能占据扇区均按重数保留。完全空或完全满的模式仍贡献一对权重 $1,0$；显式选择两个因子避免了 $0^0$。$\ell=0$ 时空乘积为 $1$，密度谱只有这一项。

占据模式上的 $k\times k$ Gram 矩阵 $X^\dagger X$ 与 $A$ 只有非零谱相同，维数可以不同。完整空间谱必须保留全部 $\ell$ 个空间模式：保留非零压缩谱的重数，再用零补足到 $\ell$ 项，不能把粒子模式数 $k$ 当作空间模式数。上述推导也包括 $N=0$、真空 $k=0$、满填充 $k=N$ 与全前缀 $\ell=N$；全前缀仍是纯态，其密度谱只有一个 $1$，其余为零。

**实际密度态的熵与文献对应。** 对这个由部分迹构造的 $\rho_I$，[谱熵恒等式](lean:D5/S3/Quantum/Information/PartialTraceMutualInformation.entropy_eq_spectral)给出其冯诺依曼熵。将 $x\log x$ 在零点连续延拓为零，则

$$
\begin{aligned}
S(\rho_I)&=-\Tr(\rho_I\log\rho_I)
=-\sum_{a\in\{0,1\}^{\ell}}\lambda_a\log\lambda_a\\
&=\sum_{i=1}^{\ell}h(\nu_i),\\
h(x)&=-x\log x-(1-x)\log(1-x).
\end{aligned}
$$

这一步使用的密度矩阵就是原基中的 $R_V$，并非另找的谱实现。乘积权重满足 $\sum_a\lambda_a=\prod_i((1-\nu_i)+\nu_i)=1$；按一个布尔坐标拆分求和，再用 $-(xy)\log(xy)=y(-x\log x)+x(-y\log y)$，逐坐标得到最后的二元熵和。此恒等式连同零点约定保留奇异密度态，故 $h(0)=h(1)=0$；对数取自然底，换成比特须除以 $\log2$。这里是原始有限矩阵结果的应用推导，不另立完整 Slater 定理或独立验证徽章。

Peschel，[*Calculation of reduced density matrices from correlation functions*](https://arxiv.org/pdf/cond-mat/0212631v1)，式 (8)–(11)，给出约化自由费米密度矩阵的模式描述。Klich，[*Lower entropy bounds and particle number fluctuations in a Fermi sea*](https://arxiv.org/pdf/quant-ph/0406068v2)，式 (4)、(7) 及其后的 $\operatorname{diag}(1-d_i,d_i)$ 因子与式 (11)，给出对应的投影模式分解、乘积谱与熵公式；这里 $d_i=\nu_i$，而 $\ell$ 是空间区域的格点数。Klich 的式 (7) 使用适当的费米张量积；上面的前缀推导另外明确了自然格点次序与字面张量部分迹之间的对应。

**同一 Slater 态的二点函数。** 仍取上述实际向量，记 $\psi_V(x)=\langle x\mid\Psi_V\rangle$、$\rho_V=\lvert\Psi_V\rangle\langle\Psi_V\rvert$，并使用原格点顺序下的 [`JordanWigner.fullC`](lean:D5/S3/Quantum/SpinChains/SupersymmetricFermion/JordanWigner.fullC) 作为 $c_i$。其[占据基矩阵元](lean:D5/S3/Quantum/SpinChains/SupersymmetricFermion/HardCoreCompression.fullC_entry) 在且仅在输入占据 $i$、输出将该位清空时非零，系数为 $(-1)^{n_S(i)}$，其中 $n_S(i)=|\{a\in S:a<i\}|$。由这些原始算符与行列式振幅可直接得到

$$
\begin{aligned}
K_{ij}&=\Tr\bigl((\rho_V c_j^\dagger)c_i\bigr)=P_{ij},\\
C_{ij}&=\Tr\bigl((\rho_V c_i^\dagger)c_j\bigr)
=P_{ji}=\overline{P_{ij}},\\
C&=P^{\mathsf T}.
\end{aligned}
$$

为看清交换符号，令 $E_{j,i}$ 只有第 $j$ 行、第 $i$ 列为 $1$，其余为零；在复系数多项式环中置

$$
\begin{aligned}
W(X)&=(I_N+XE_{j,i})V,\\
W(X)_{j,b}&=V_{j,b}+XV_{i,b}.
\end{aligned}
$$

其他行不变，$\psi_{W(X)}(x)$ 仍按同一递增行次序取子式，无须假定 $W(X)$ 的列正交。逐个占据词有

$$
[X]\psi_{W(X)}(x)
=\bigl(c_j^\dagger c_i\Psi_V\bigr)(x).
$$

这里 $[X]$ 取一次项系数。错误粒子数的词在两边均为零，因为该算符保持粒子数。以下设 $|S(x)|=k$。若 $j\notin S(x)$，所取子式不含变动行，产生算符在该输出处也为零。若 $j\in S(x)$，置 $R=S(x)\setminus\{j\}$；当 $i\in R$ 时，替换行产生重复行，行列式与湮灭作用都为零。其余情形把替换行移回递增位置，双方都给出

$$
(-1)^{n_R(j)+n_R(i)}\det V_{R\cup\{i\}}.
$$

两次计数分别记录移出 $j$ 与插入 $i$ 的行交换次数，因此也覆盖 $i=j$。这一符号对应可由[所钉源码根](trureturing:)中的 `D5/S3/Quantum/Fermionic/PeriodicSshExcessPseudoEntropyRefutation.lean` 的私有 `fullC_sparse`、`fullC_create_sparse`，以及 `D5/S3/Quantum/FermionicCorrelationalBound/PhysicalContractionRdmBridge.lean` 的私有 `sorted_position_count`、`sorted_removeNth` 读出：前两者给出上述稀疏作用，后两者把递增排列中的位置识别为较小元素个数，并保持删去一行后的递增顺序。后两者原以自然数下标陈述；将有限格点映到其自然数值，保持次序，即得到这里的行排列符号。这些是原始源码中的辅助声明，不另设公开声明链接。

现在对 $V^\dagger,W(X)$ 使用同一[柯西–比内恒等式](lean:D5/S3/Quantum/Schatten/CompoundMatrices.cauchyBinet)，这次系数环为 $\mathbb C[X]$，得到

$$
\begin{aligned}
F(X)&:=\det\bigl(V^\dagger W(X)\bigr)\\
&=\sum_{x\in\{0,1\}^N}
\overline{\psi_V(x)}\,\psi_{W(X)}(x)\\
&=\det\bigl(I_k+XV^\dagger E_{j,i}V\bigr).
\end{aligned}
$$

最后一行只用了 $V^\dagger V=I_k$。行列式展开中一次项来自恰好选取一个对角位置，故 $[X]\det(I+XB)=\Tr B$。在求和一侧提取系数，再将秩一密度矩阵的迹展开，给出

$$
\begin{aligned}
[X]F(X)
&=\sum_x\overline{\psi_V(x)}
\bigl(c_j^\dagger c_i\Psi_V\bigr)(x)\\
&=\Tr\bigl((\rho_V c_j^\dagger)c_i\bigr),\\
[X]F(X)
&=\Tr\bigl(V^\dagger E_{j,i}V\bigr)\\
&=\Tr\bigl(E_{j,i}VV^\dagger\bigr)=P_{ij}.
\end{aligned}
$$

这证明了同一实际态的 $K_{ij}=P_{ij}$；交换 $i,j$ 并用 $P^\dagger=P$ 得到 $C$ 的公式。没有预设关联矩阵、高斯性或归一化，也没有用另一密度矩阵替换 $\rho_V$。复相位不能丢掉：例如 $N=2,k=1$、$V=(3/5,4\mathrm{i}/5)^{\mathsf T}$ 时，$K_{01}=-12\mathrm{i}/25$ 而 $C_{01}=12\mathrm{i}/25$。上述有限求和同样覆盖真空（$K=0$）、满填充（$K=I_N$）、相同格点与两种不同格点次序；$N=0$ 时没有可选的 $i,j$。这是原始结果的标准应用，不另立完整端点定理或独立验证徽章。

Dereziński 的 [§7.1–§7.2、式 (7.51)–(7.54)](https://www.fuw.edu.pl/~derezins/clifford.pdf) 给出占据基与 Slater 约定；其定理 8.1，特别是式 (8.103) 的 $\omega_\pi(d\Gamma(h))=\Tr(\pi h)$，给出对应的一体期望公式。Peschel 的式 (7)、(9)–(10) 使用 $C$；其式 (12) 中的转置对复模式不能略去。Peschel 还指出，对非 Slater 态，按同一二点函数重建的自由费米密度矩阵一般不能复现其他期望值，故关联矩阵相合不能确定一般密度矩阵。更一般的粒子数规范不变高斯密度矩阵也有上述谱配方，但须另给高斯性假设；这与从指定行列式振幅出发的推导范围不同。含 $0$ 或 $1$ 时，不能直接套用 Peschel 式 (12) 的矩阵对数。任意非前缀格点子集还涉及 Jordan–Wigner 字符串与费米子系统选择，须另行建立对应；地址数位切口也仍不能充当物理空间切口。

Moustaj–Krebbekx–Morais Smith 的 *Anomalous Polarization in One-dimensional Aperiodic Insulators*（[doi:10.3390/condmat10010003](https://doi.org/10.3390/condmat10010003)，§IV–V、§V.C 与附录 B）讨论含在位项的泵浦族及指定填充，其关联矩阵方法依赖所选 Slater／高斯态与子系统，不能直接移用于任意编码态。$\delta_{\rho,j}$ 只是单粒子能量到零的距离；多体激发隙还需填充、粒子数扇区与间隙约定。上述极限只处理这一单粒子谱前提：物理长度 $R$ 与内部窗坐标的对应、空间切口与劳齐边界的联系及熵标度，仍需另外建立；[@prob-ch39-p2e-fractal-horizon] 的完整问题仍然保留。
:::

**不连续格点的手算例。** 在按 $0,1,2,3$ 排列的四个格点上取正交归一轨道 $u=(e_0+e_2)/\sqrt{2}$ 和 $v=(e_1+e_3)/\sqrt{2}$，保留 $I=\{0,2\}$。按递增格点顺序取两行的行列式，得到

$$
\lvert\Psi\rangle
=\tfrac12\bigl(\lvert1100\rangle+\lvert1001\rangle
-\lvert0110\rangle+\lvert0011\rangle\bigr).
$$

在普通张量部分迹中，按 $(1,3)$ 上的占据串分组。被迹去的格点处于 $10$ 时，保留部分的振幅向量为 $(\lvert10\rangle-\lvert01\rangle)/2$。被迹去的格点处于 $01$ 时，向量为 $(\lvert10\rangle+\lvert01\rangle)/2$。这两个向量彼此正交，模平方各为 $1/2$，所以保留区的密度矩阵谱为 $(1/2,1/2,0,0)$，熵为 $\log 2$。

同一态的单粒子压缩 $P_I=u_Iu_I^\dagger$ 有特征值 $1,0$，代入费米模式乘积公式得到谱 $(1,0,0,0)$ 和零熵。把第二个轨道改为 $e_3$，则 $P_I$ 完全相同，而普通部分迹只剩下被迹去格点处于 $01$ 的一个分量，保留区成为纯态。因此，对这个不连续切口，$P_I$ 本身无法确定普通张量部分迹的谱。占据 $1,2$ 时，递增行顺序先取到 $v$ 的分量，再取到 $u$ 的分量，行列式因此带负号。两块之间的 Jordan–Wigner 字符串如何进入约化态，见 Fagotti 与 Calabrese 的 [*Entanglement entropy of two disjoint blocks in XY chains*，§2，式 (11)–(19)](https://arxiv.org/pdf/1003.1110)。

**哪些切口总能使用乘积谱？** 对有限有序格点，记 $I$ 为保留侧，$J$ 为被迹去的一侧。若要求对每个粒子数 $0\le k\le N$ 以及该粒子数下的每个 Slater 态，普通张量部分迹都具有上式的完整费米模式乘积谱，那么条件恰好是 $I$ 或 $J$ 为原格点顺序中的区间，空集也算区间。等价地，从左到右读每个格点所属的一侧，至多换侧两次。换侧至少三次时，从最先出现的四个连续同侧段各取一点，就得到递增的 $I,J,I,J$ 或 $J,I,J,I$。

把已占据的格点分别记为 $a\subseteq I$ 和 $b\subseteq J$。振幅只在 $|a|+|b|=k$ 时有支撑。把行列式中按原格点顺序排列的行改为先列 $a$、再列 $b$，并保留两侧各自的顺序。每个在 $i\in a$ 左侧的 $j\in b$ 恰好越过 $i$ 一次，因此两种振幅相差 $(-1)^{c(a,b)}$，其中

$$
c(a,b)=\bigl|\{(i,j)\in a\times b\mid j<i\}\bigr|.
$$

按两侧分组后的振幅正是先列全部 $I$、再列全部 $J$ 时的有序前缀振幅。在这个顺序下，占据基的楔积先写保留侧的基向量，再写被迹去侧的基向量，因此费米张量积对应的系数恰好是这个分组行列式。轨道矩阵只重排了行，$P_I=V_I V_I^\dagger$ 在 $I$ 的原有顺序中保持相同。对这些分组系数做部分迹，谱由上面的费米模式乘积公式给出。

如果 $I$ 是非空区间，记 $b_{\mathrm{left}}$ 为 $b$ 中位于该区间左侧的格点。每个这样的格点越过所有 $a$ 中的格点，所以 $c(a,b)=(k-|b|)|b_{\mathrm{left}}|$。符号仅依赖 $b$，在对 $b$ 求部分迹时与其共轭相消。如果 $J$ 是非空区间，记 $a_{\mathrm{right}}$ 为 $a$ 中位于该区间右侧的格点，则 $c(a,b)=(k-|a|)|a_{\mathrm{right}}|$。这个符号只依赖 $a$，使保留侧的密度矩阵与分组后的密度矩阵相差一次对角酉共轭。两种情形都保留了全部特征值及重数。若一侧为空，$c(a,b)=0$。

若存在四个交替格点，就在这四点上放置上面的两条轨道，其余格点均取空态。换成另一种交替顺序时，保留与迹去的角色互换，四点纯态在两侧的约化谱仍由同一组施密特系数给出。两种顺序的普通部分迹都恰有两个非零特征值，各为 $1/2$。另一方面，压缩 $P_I$ 是投影到完全位于保留侧的那条轨道上的秩一投影，因此乘积谱只有一个非零特征值 $1$。额外的空格点只给谱添零。这就给出了每个含交替四点的切口上的两粒子反例。

**固定填充时的判据。** 若只要求在给定的 $k$ 下对所有 Slater 态成立，当 $k\le 1$ 或 $N-k\le 1$ 时，任意切口都满足乘积谱公式。在 $2\le k\le N-2$ 时，仍恰好要求 $I$ 或 $J$ 是区间。

把空穴分成 $a^{\mathrm h}=I\setminus a$ 和 $b^{\mathrm h}=J\setminus b$。将 $I\times J$ 按两端各自占据或空置分成四类，再对 $j<i$ 的格点对计数，得到

$$
c(a,b)+c(I,J)=c(a,J)+c(I,b)+c(a^{\mathrm h},b^{\mathrm h}).
$$

因此，占据串与对应的空穴串的重排符号只相差分别依赖 $a$ 和 $b$ 的两个因子 $(-1)^{c(a,J)}$ 与 $(-1)^{c(I,b)+c(I,J)}$。前者在保留侧给出对角酉共轭，后者在对 $b$ 求部分迹时相消。这也解释了两个端点。当 $k\le1$ 时，非零振幅的 $c(a,b)$ 都为零。当 $N-k\le1$ 时，至少一侧没有空穴，空穴交叉项 $c(a^{\mathrm h},b^{\mathrm h})$ 为零。

对于 $2\le k\le N-2$，在四个交替格点之外任选 $k-2$ 个格点，组成固定占据集 $T$。把这些格点的单位向量按格点递增顺序附加到原来的两条轨道之后。新轨道两两正交，也与原来的两条轨道正交，因为它们的支撑不相交。若占据集遗漏 $T$ 中任意一点，对应的附加列在行列式中全为零。若占据集包含 $T$，其余两个占据点必须来自原来的四个格点，否则有一行全为零。

对形如 $a\cup b\cup T$ 的占据集，其中 $a$、$b$ 分别是原四个格点在 $I$、$J$ 侧的占据子集，把 $T$ 的行移到最后并保持递增顺序。这些行与附加列形成一个单位矩阵块，剩下的行列式恰是四点例中的振幅。移行时，每对满足 $s<i$ 的 $s\in T$、$i\in a\cup b$ 相互跨过一次。令 $m_T(i)=|\{s\in T\mid s<i\}|$，总符号为

$$
(-1)^{\sum_{i\in a}m_T(i)}\,(-1)^{\sum_{j\in b}m_T(j)}.
$$

用 $D_I,D_J$ 表示这两个因子在四点例的两侧占据基上给出的对角符号矩阵。令 $E_I$ 把四点例的保留侧基向量 $\lvert a\rangle$ 送到 $\lvert a\cup(T\cap I)\rangle$，令 $E_J$ 对被迹去的一侧作同样的嵌入。其余格点固定为空。这两个映射都把不同的基向量送到不同的基向量，因而是等距嵌入。若 $M_0$、$M_T$ 分别是四点态和附加轨道后的振幅矩阵，则

$$
\begin{aligned}
M_T&=E_I D_I M_0 D_J E_J^\dagger,\\
M_T M_T^\dagger&=E_I D_I M_0M_0^\dagger D_I^\dagger E_I^\dagger.
\end{aligned}
$$

因此，普通约化态在 $E_I$ 的像上保留四点例的谱，在正交补上为零。完整谱仍只有两个非零特征值 $1/2,1/2$。压缩 $P_I$ 在原先的秩一投影上加上各 $s\in T\cap I$ 的坐标投影。这些投影的像彼此正交，故 $P_I$ 是秩 $1+|T\cap I|$ 的投影，全部压缩特征值为 $0$ 或 $1$。费米乘积谱由此只有一个非零特征值 $1$。

**单粒子压缩何时足以确定约化谱？** 固定切口和粒子数 $k$。只要上面的乘积谱判据成立，$P_I$ 就决定普通张量部分迹的完整谱。对处于中间填充且含四个交替格点的切口，取刚才的四点构造，并保留固定占据集 $T$。把完全支撑在 $J$ 上的那条轨道替换成其支撑中任一格点的单位向量。两组轨道在 $I$ 上逐列相同，所以给出同一个 $P_I$。替换后，所有非零振幅在 $J$ 上都有同一占据串，即 $T\cap J$ 加上新轨道所在的格点。按 $J$ 上的占据串分组时只剩一个振幅向量，故约化态是纯态。

记 $D=2^{|I|}$。替换前后的两个约化态的特征多项式分别为 $x^{D-2}(x-1/2)^2$ 与 $x^{D-1}(x-1)$，熵分别为 $\log 2$ 与 $0$。这个书面推导表明，填充和切口已知时，$P_I$ 对所有 Slater 态都能确定约化谱的条件，恰好就是上面的乘积谱判据。

**多个两点轨道的交替矩阵。** 取 $a$ 条完全位于 $I$ 的轨道与 $b$ 条完全位于 $J$ 的轨道，每条轨道在自己的一对格点上取振幅 $1/\sqrt{2}$，所有格点对互不相交。把保留侧的列排在前面。用 $x\in\mathbb F_2^a$ 与 $y\in\mathbb F_2^b$ 编码每对取较早还是较晚的端点。每个非零行列式恰好从每对取一个端点，所以振幅矩阵在这些占据串之外为零。令 $A_{ij}\in\mathbb F_2$ 等于第 $i$ 个保留对与第 $j$ 个弃置对的端点交替指示量。

在非零占据串上，行重排的符号由逆序数给出。同一侧内部的符号只依赖该侧的占据串。各取一个保留侧和弃置侧的格点对，四种端点选择的逆序指示之和模 $2$ 等于两个保留端点之间的弃置端点数模 $2$。因此，其关于 $x_i,y_j$ 的混合系数正是 $A_{ij}$。吸收只依赖单侧的符号后，振幅矩阵为

$$
M_{xy}=2^{-(a+b)/2}(-1)^{x^\mathsf T A y}.
$$

对 $y$ 求和时，若 $A^\mathsf T x=A^\mathsf T x'$，则 $(MM^\dagger)_{xx'}=2^{-a}$。否则沿一个使指数翻转的坐标将 $y$ 两两配对，求和为零。设 $r=\operatorname{rank}_{\mathbb F_2} A$。映射 $A^\mathsf T$ 的每个非空纤维有 $2^{a-r}$ 个元素，故约化态有 $2^r$ 个常数方块，各给出一个特征值 $2^{-r}$。计入其余占据串上的零空间，完整特征多项式为

$$
x^{\,2^{|I|}-2^r}(x-2^{-r})^{2^r}.
$$

这个二元秩公式也出现在图态的二分切口中。此处的矩阵元由实际 Slater 行列式的格点顺序给出。[Hein、Eisert 与 Briegel，命题 3](https://arxiv.org/abs/quant-ph/0307130)

把每条 $J$ 轨道换成该对较早端点的单位向量，保留侧压缩仍相同。弃置侧只剩一个占据串，普通约化态成为纯态，熵差为 $r\log 2$。例如，将 $m$ 个按 $I,J,I,J$ 排列的四点块依次拼接，块间端点不交替，故 $A$ 是 $m$ 阶单位矩阵。这给出固定在 $2m$ 粒子的两个 Slater 态，在同一切口具有相同的单粒子压缩，普通约化熵分别为 $m\log 2$ 与 $0$。

在这个实际词上，普通字母计数的平衡性与按位置奇偶加权的和是不同的量。沿用 $A=0$、$B=1$、$C=2$ 的字母编码，取整数权重

$$
\begin{aligned}
w(A)&=2,\qquad w(B)=1,\qquad w(C)=0,\\
F(v)&=\sum_{r=0}^{|v|-1}(-1)^r w(v_r),\\
W_{[s,s+m)}&=W_sW_{s+1}\cdots W_{s+m-1}.
\end{aligned}
$$

这里 $s,m\in\mathbb N$，位置从零编号；空字 $\varepsilon$ 满足 $F(\varepsilon)=0$。每个区段的首项都取正号，与全局起点 $s$ 的奇偶无关。前面的跃迁恰为 $t_X=\rho^{w(X)}$，故有限乘积满足

$$
\prod_{r=0}^{m-1}t_{W_{s+r}}^{\,(-1)^r}
=\rho^{F(W_{[s,s+m)})}.
$$

这说明交替电荷为什么会进入跃迁比值的估计，却尚未给出谱界。下面的精确陈述与构造来自 [Tribonacci 前缀反例的源证明](https://github.com/the-omega-institute/trureturing/pull/30577)。

::: {.theorem #thm-ch39-p2e-tribonacci-prefix-log-refutation title="实际 Tribonacci 词的统一对数区段界不成立" lean="D5/S1/Words/TribonacciPrefixRefutation.result"}
对上述固定的实际词 $W$ 与整数权重 $w$，有

$$
\neg\left(
\begin{aligned}
&\exists K\in\mathbb R,\quad 0<K\ \land\\
&\forall s,m\in\mathbb N,\quad
\left|F(W_{[s,s+m)})\right|
\le K\log(m+2)
\end{aligned}
\right).
$$

不等式中的整数电荷与自然数长度均视为实数，$\log$ 为自然对数；量词包含 $m=0$，没有长度下限或起点限制。
:::

::: proof
取 $\tau=\sigma^4$，将其逐字延伸到有限字。四次实际替代给出

$$
\begin{aligned}
\tau(A)&=ABACABAABACAB,&|\tau(A)|&=13,\\
\tau(B)&=ABACABAABAC,&|\tau(B)|&=11,\\
\tau(C)&=ABACABA,&|\tau(C)|&=7.
\end{aligned}
$$

每个 $\tau^n(X)$ 的长度都为奇数：$n=0$ 时长度为一；下一层分别拼接 $13$、$11$ 或 $7$ 个前层奇长块，故可对所有字母同时归纳。任意有限字的拼接恒等式为

$$
F(uv)=F(u)+(-1)^{|u|}F(v).
$$

因此，展开 $\tau^{n+1}(X)$ 时，每个前层块都翻转下一块的符号。令 $a_n=F(\tau^n(A))$、$b_n=F(\tau^n(B))$、$c_n=F(\tau^n(C))$。在上述三个实际像中逐块交替取号，得到对每个 $n\in\mathbb N$ 都成立的递推

$$
\begin{aligned}
(a_0,b_0,c_0)&=(2,1,0),\\
a_{n+1}&=a_n,\\
b_{n+1}&=2a_n-b_n,\\
c_{n+1}&=4a_n-2b_n-c_n.
\end{aligned}
$$

由 $a_{n+1}=a_n$ 与初值知 $a_n=2$，于是 $b$ 的递推化为 $b_{n+1}-2=-(b_n-2)$。再令 $d_n=(-1)^n(c_n-2)$，$c$ 的递推化为 $d_{n+1}=d_n-2$，且 $d_0=-2$。于是全层数的解为

$$
\begin{aligned}
a_n&=2,\\
b_n&=2-(-1)^n,\\
c_n&=2-(2n+2)(-1)^n.
\end{aligned}
$$

整块 $A$ 像的电荷恒为 $2$，却不能控制它内部的前缀。定义具体的有限字族

$$
U_0=\varepsilon,\qquad
U_{n+1}=\tau^{n+1}(C)U_n,\qquad m_n=|U_n|.
$$

新块接在前面。逐字恒等式 $\tau(A)=\tau(C)\,A\,BACAB$ 给出

$$
\tau^{n+1}(A)=
\tau^{n+1}(C)\,\tau^n(A)\,\tau^n(BACAB).
$$

空字 $U_0$ 是 $A$ 的前缀；若 $\tau^n(A)=U_nR_n$，则上式变成

$$
\tau^{n+1}(A)=
U_{n+1}R_n\,\tau^n(BACAB).
$$

归纳可知 $U_n$ 是 $\tau^n(A)=\sigma^{4n}(A)$ 的实际前缀，因而

$$
W_{[0,m_n)}=U_n.
$$

这一步使用的正是从 $A$ 出发的原始无限词，没有另设出现位置假设，也没有循环闭合或位置平移。三个四步像都非空，故 $m_n>0$（$n\ge1$）；对所有字母同时归纳，每层至多拼接十三个前层像，得到 $|\tau^n(X)|\le13^n$。结合前缀包含关系，

$$
0<m_n\le|\tau^n(A)|\le13^n\qquad(n\ge1).
$$

令 $q_n=F(U_n)$。新接在前面的 $\tau^{n+1}(C)$ 长为奇数，所以

$$
q_0=0,\qquad q_{n+1}=c_{n+1}-q_n.
$$

为显式解出这次累积，令 $r_n=(-1)^n(q_n-1)$。代入 $c_{n+1}$ 的公式，得到 $r_0=-1$ 与 $r_{n+1}=r_n-(2n+4)$。求和即得

$$
\begin{aligned}
q_n&=1-(-1)^n(n^2+3n+1)\\
&=\begin{cases}
-n(n+3),&n\text{ 为偶数},\\
(n+1)(n+2),&n\text{ 为奇数}.
\end{cases}
\end{aligned}
$$

故 $|q_n|\ge n^2$，包括 $n=0$。另一方面，当 $n\ge1$ 时，$13^n\ge1$ 且 $3\le3^n$，故 $m_n+2\le13^n+2\le3\cdot13^n\le39^n$，从而

$$
\log(m_n+2)\le n\log39.
$$

现在假设定理中被否定的统一界成立，取其常数 $K>0$，再取自然数 $n>K\log39$。因 $K\log39>0$，有 $n\ge1$。在真正从零开始的前缀上，

$$
\begin{aligned}
\left|F(W_{[0,m_n)})\right|
&=|q_n|\ge n^2\\
&>Kn\log39
\ge K\log(m_n+2),
\end{aligned}
$$

与 $s=0$、$m=m_n$ 时的统一界矛盾。这个反证覆盖每个正实数 $K$；从零开始的具体反例族是证明中的构造，不是另加假设，也不是由有限样本外推的结论。完整证明由 Lean 内核检查。
:::

反例族说明某些真实前缀的电荷可以逐层累积；要控制任意起点、任意长度的区段，还须同时控制每层块内部的所有前缀。这里可以复用一个与 Tribonacci 字母表无关的估计：每层至多留下一块未走完的子块，其余完整子块的电荷逐层相加。

下列前缀包络控制一般替代词的所有截取前缀，统一对数平方界控制实际 Tribonacci 词的任意区段；后文的开链收敛定理给出每个固定 $0<\rho<1$ 下，指定偶数开前缀的最小绝对特征值沿全序列趋零。[@ex-ch39-p2e-tribonacci-prefix-rate] 中的定量界及参数一致收敛仍属纸面应用，不由这条收敛定理提供。

::: {.lemma #lem-ch39-p2e-substitution-prefix-envelope title="替代词的逐层前缀包络" lean="D5/S1/Words/SubstitutionPrefixEnvelope.prefix_envelope"}
设 $\mathcal A$ 为任意字母表，$w:\mathcal A\to\mathbb Z$ 为整数权重，$f$ 将每个字母映为一个有限字，并按拼接延伸到有限字。约定 $f^0(a)$ 为单字母字 $a$，且

$$
Q(v)=\sum_{r=0}^{|v|-1}(-1)^r w(v_r).
$$

设 $M\in\mathbb Z$、$B\in\mathbb N$、$H:\mathbb N\to\mathbb Z$ 满足

$$
\begin{aligned}
&0\le M,\qquad 0\le H(i)
&&\text{对所有 }i\in\mathbb N,\\
&|w(a)|\le M,\qquad |f(a)|\le B
&&\text{对所有 }a\in\mathcal A,\\
&|Q(f^i(a))|\le H(i)
&&\text{对所有 }i\in\mathbb N,\ a\in\mathcal A.
\end{aligned}
$$

则对所有 $j,t\in\mathbb N$ 与 $a\in\mathcal A$，

$$
\left|Q\bigl(\operatorname{take}_t(f^j(a))\bigr)\right|
\le P(j):=M+B\sum_{i=0}^{j-1}H(i).
$$

其中 $\operatorname{take}_t$ 取前 $\min(t,|f^j(a)|)$ 个字母，$j=0$ 时求和为空。结论包含空前缀、整个像与超出字长的截取指标；不要求字母表有限、像非空或像长具有特定奇偶性。
:::

::: {.proof #pf-ch39-p2e-substitution-prefix-envelope}
本证明依照 [源声明 `prefix_envelope`](lean:D5/S1/Words/SubstitutionPrefixEnvelope.prefix_envelope) 的陈述与论证展开。

局部从正号开始的交替和满足 $Q(uv)=Q(u)+(-1)^{|u|}Q(v)$，所以 $|Q(uv)|\le|Q(u)|+|Q(v)|$。零层像只是一个字母，所有前缀的绝对电荷至多为 $M$。将 $f^{j+1}(a)$ 写成由 $f(a)$ 指定的至多 $B$ 个 $j$ 层子块，任意前缀由若干完整子块与至多一个子块的前缀组成。完整部分贡献至多 $BH(j)$，未完成的部分由归纳假设控制在 $P(j)$ 内，故总量至多 $P(j)+BH(j)=P(j+1)$。若截取指标超过总长，则只有完整块；空像同样不增加电荷。整个归纳只用绝对值估计，不丢掉拼接时的相位。

完整证明由 Lean 内核检查。
:::

对于实际 Tribonacci 词，完整块的电荷公式给出线性的 $H(j)$，上式便给出二次的 $P(j)$。还需把任意实际区段放进合适层数的块中，才能得到与起点无关的界。

::: {.theorem #thm-ch39-p2e-tribonacci-uniform-log-squared title="实际 Tribonacci 词的统一对数平方区段界" lean="D5/S1/Words/TribonacciUniformLogSquared.uniform_log_squared"}
取 $\sigma(A)=AB$、$\sigma(B)=AC$、$\sigma(C)=A$，令 $W=\lim_{n\to\infty}\sigma^n(A)$ 为从 $A$ 出发、从零编号的无限词。赋予整数权重 $w(A)=2$、$w(B)=1$、$w(C)=0$，并在每个区段内部从正号开始定义

$$
F(W_{[s,s+m)})=\sum_{r=0}^{m-1}(-1)^r w(W_{s+r}).
$$

存在一个与起点及长度都无关的实常数 $C>0$，使

$$
\forall s,m\in\mathbb N,\qquad
\left|F(W_{[s,s+m)})\right|
\le C\bigl(\log(m+2)\bigr)^2.
$$

整数电荷与自然数长度在不等式中视为实数，$\log$ 为自然对数。量词包含 $m=0$，此时电荷为零；即使 $s$ 为奇数，区段首项仍取正号。
:::

::: {.proof #pf-ch39-p2e-tribonacci-uniform-log-squared}
本证明依照 [源声明 `uniform_log_squared`](lean:D5/S1/Words/TribonacciUniformLogSquared.uniform_log_squared) 的陈述与论证展开。

**完整块到前缀。** 沿用 $\tau=\sigma^4$。它的三个像长分别为 $13,11,7$。前面求出的完整块电荷为 $2$、$2-(-1)^j$ 与 $2-(2j+2)(-1)^j$，因此对所有字母 $X$ 与层数 $j$，

$$
|F(\tau^j(X))|\le H(j):=2j+4.
$$

把 [@lem-ch39-p2e-substitution-prefix-envelope] 用于 $M=2$、$B=13$ 与此 $H$，得到每个 $j$ 层像的所有前缀的共同包络

$$
\begin{aligned}
P(j)&=2+13\sum_{i=0}^{j-1}(2i+4)\\
&=2+13j^2+39j.
\end{aligned}
$$

这是对所有截取位置的控制，不能仅由完整 $A$ 块的恒定电荷 $2$ 代替。

**前缀到局部区段。** 设 $v$ 是 $T=\tau^j(X)\tau^j(Y)$ 的一个连续子字。$T$ 的每个前缀至多由这两个块各自的一个前缀拼成，故其绝对电荷至多为 $2P(j)$。若 $R$ 是 $v$ 之前的前缀，则 $R$ 与 $Rv$ 都是 $T$ 的前缀，而

$$
F(Rv)-F(R)=(-1)^{|R|}F(v).
$$

取绝对值得到

$$
|F(v)|\le4P(j)\le156(j+1)^2\qquad(j\in\mathbb N).
$$

这个两块估计不要求块长为奇数，也不预设这两个块在无限词中的出现位置。只落在一个块内的区段也适用，因为它是 $\tau^j(X)\tau^j(X)$ 的连续子字。

**实际词中的包含关系。** 三个 $\tau$ 像的长度都至少为 $7$。从零层长度为一出发，对所有字母同时归纳，每一步至少拼接七个前层像，故

$$
|\tau^j(X)|\ge7^j\qquad\text{对所有 }j\in\mathbb N,\ X\in\{A,B,C\}.
$$

现在固定任意 $s$ 与 $m>0$，取 $k=\lfloor\log_7 m\rfloor$、$j=k+1$，使 $7^k\le m<7^j$。选足够大的 $N\ge j$，使 $s+m\le|\tau^N(A)|$。由于这些 $A$ 像是 $W$ 的实际前缀，$W_{[s,s+m)}$ 恰等于从 $\tau^N(A)$ 删去前 $s$ 个字母后再取 $m$ 个字母的字。迭代的拼接恒等式进一步给出

$$
\tau^N(A)=\tau^j\bigl(\tau^{N-j}(A)\bigr).
$$

右边是按实际出现顺序排列的 $j$ 层块，且每一块都严格长于 $m$。从区段首字母所在块开始，长度为 $m$ 的区段只能留在这一块内，或进入紧随其后的第二块；若进入第二块，剩余长度小于 $m$，不可能穿过整个第二块。若首块已经是最后一块，则总长度条件保证区段在该块内结束。因此，整个实际区段确实包含于一块或两块相邻像中，可以应用上一段的 $156(j+1)^2$ 界。选择较高的 $N$ 只为容纳起点 $s$；决定估计大小的 $j$ 只由 $m$ 决定。

**层数到长度。** 由 $2^k\le7^k\le m$ 与对数的单调性，

$$
\begin{aligned}
k\log2&\le\log(m+2),\\
\log2&\le\log(m+2),\\
(j+1)\log2=(k+2)\log2&\le3\log(m+2).
\end{aligned}
$$

两边非负且 $\log2>0$，所以平方并代入区段估计，得到

$$
\begin{aligned}
|F(W_{[s,s+m)})|
&\le156(j+1)^2\\
&\le\frac{1404}{(\log2)^2}\bigl(\log(m+2)\bigr)^2.
\end{aligned}
$$

空区段的电荷为零，另行直接满足同一不等式。于是 $C=1404/(\log2)^2>0$ 是存在量词的一个充分见证；这里没有优化这个常数。

完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch39-p2e-tribonacci-refutation-boundaries title="交替偏差、谱文献与物理适用边界"}
**文献背景与适用边界，未作为本书的物理形式化结论。** 前缀反例中 $|q_n|\ge n^2$ 的平方是替代层数 $n$ 的平方，但已有的长度估计也确定了最坏情形的阶。在本备注中，记 $Q(s,m)=F(W_{[s,s+m)})$，并将电荷与长度视为实数参与以下不等式。对 $n\ge1$，已有 $0<\log(m_n+2)\le n\log39$；两边非负且 $\log39>0$，平方后结合 [@thm-ch39-p2e-tribonacci-uniform-log-squared]，用同一个 $C>0$ 得到

$$
\begin{aligned}
\frac{(\log(m_n+2))^2}{(\log39)^2}
&\le n^2\le|q_n|=|Q(0,m_n)|\\
&\le C(\log(m_n+2))^2.
\end{aligned}
$$

递推式给出 $m_{n+1}=|\sigma^{4(n+1)}(C)|+m_n>m_n$，因为每个字母像都非空。因此，这些实际前缀长度严格递增且无界，沿它们已得到对数平方阶的双侧界。$n=0$ 时 $m_0=q_0=0$，不在这个正下界的适用范围内。

为明确长度截止与精确长度的区别，在本备注中定义

$$
\begin{aligned}
P(M)&=\max_{\substack{m\in\mathbb N\\0\le m\le M}}|Q(0,m)|,\\
R(M)&=\sup_{\substack{s\in\mathbb N\\m\in\mathbb N,\ m\le M}}|Q(s,m)|.
\end{aligned}
$$

这里 $M\in\mathbb N$；$R(M)$ 中的起点 $s$ 遍历所有自然数，不受 $M$ 限制。$P(M)$ 是非空有限集的最大值；统一上界使 $R(M)$ 的非空取值集有上界。对每个正自然数 $M$，同一个常数 $C>0$ 满足

$$
\begin{aligned}
\frac{(\log(M+2))^2}{4(\log39)^2}
&\le P(M)\le R(M)\\
&\le C(\log(M+2))^2.
\end{aligned}
$$

下界可直接由已有前缀估计推出。当 $M\ge13$ 时，取 $n=\lfloor\log_{13}M\rfloor\ge1$，则 $13^n\le M<13^{n+1}$，而 $m_n\le13^n\le M$，故 $P(M)\ge|Q(0,m_n)|\ge n^2$。又由 $M+2\le3M$，

$$
\begin{aligned}
\log(M+2)&\le\log3+\log M\\
&\le\log3+(n+1)\log13\\
&\le(n+1)\log39\le2n\log39.
\end{aligned}
$$

平方并除以正数 $4(\log39)^2$ 即得所需下界。当 $1\le M\le12$ 时，用实际单字母前缀 $W_{[0,1)}=A$，其电荷 $Q(0,1)=2$，故 $P(M)\ge2$；同时 $\log(M+2)\le\log14<\log39$，所需下界的左端小于 $1/4$。上界则对每个 $m\le M$ 与任意 $s\in\mathbb N$ 使用统一界和 $0<\log(m+2)\le\log(M+2)$，再取最大值或上确界；$s=0$ 的情形给出 $P(M)\le R(M)$。因此，前缀累计最大值与所有起点的累计上确界都是对数平方阶，统一上界的最坏情形阶已经是锐的。这里没有优化常数；$M=0$ 时 $P(0)=R(0)=0$，上述正下界不成立。

这仍须与每个精确长度上的断言区分开。完整 $A$ 像给出另一族实际前缀：令 $\ell_n=|\sigma^{4n}(A)|$，则前面的 $a_n=2$ 与实际前缀包含关系给出

$$
Q(0,\ell_n)=2,\qquad \ell_n\ge4n+1\qquad(n\in\mathbb N).
$$

长度下界来自 $\sigma^{k+1}(A)=\sigma^k(A)\sigma^k(B)$（$k\ge0$）：每个 $B$ 像非空，故长度从一开始，每一步至少增加一。因而 $\ell_n\to\infty$，而 $|Q(0,\ell_n)|/(\log(\ell_n+2))^2\to0$：不存在 $c>0$ 与 $m_0\in\mathbb N$，使所有 $m\ge m_0$ 都有 $|Q(0,m)|\ge c(\log(m+2))^2$。对所有起点同时要求这种下界也不成立，因为它包含起点零。若固定精确长度后才对起点取上确界，记 $E(m)=\sup_{s\in\mathbb N}|Q(s,m)|$，则是否存在 $c>0$、$m_0\in\mathbb N$，使每个 $m\ge m_0$ 都满足 $E(m)\ge c(\log(m+2))^2$，并未由这里的论证确定；一个起点上的常电荷不控制其他起点，而累计最大值允许选取较短的长度。最优常数同样未在这里确定。$m_n$ 是键字的前缀长度，不能直接等同于前面指定的偶数格点数 $N_j$。

Adamczewski，*Symbolic discrepancy and self-similar dynamics*（[doi:10.5802/aif.2079](https://doi.org/10.5802/aif.2079)，定理 1、命题 10–11）提供替代系统偏差与临界谱消去的一般框架。其加权下界中存在合适零均值字母权重的结论，并不自动指定这里随位置交替的权重；若把位置奇偶性编码进扩充字母表，还须另行核对本原性、频率、权重与消去条件。上面的证明直接计算原始字，既不借用该存在性结论来指定权重，也不据此主张机制或具体公式的文献新颖性。

对物理谱量，Juhász 从开边界横场 Ising 链得到辅助矩阵方法（[doi:10.1103/PhysRevB.106.064204](https://doi.org/10.1103/PhysRevB.106.064204)，arXiv:2206.11575v2）：式 (6) 的 $2L\times2L$ 零对角开链矩阵（$L>1$，相邻耦合均非零）的正本征值，等于式 (7) 双对角矩阵的奇异值；式 (18)、(28) 给出最小正值的有限链上下界。其附录 B 式 (B4) 将常用近似能隙放在严格下界之下，该近似因而不能充作真能隙的上界。这里可比较的是辅助矩阵的谱问题，不能直接把原 Ising 多体能隙认作本跃迁链的多体能隙。

Hermisson 对多字母替代的边缘重整化特征值与无穷动力学指数的讨论（[doi:10.1088/0305-4470/33/1/304](https://doi.org/10.1088/0305-4470/33/1/304)，arXiv:cond-mat/9808238，第 11 页）没有在该处给出本字的特定标度。Hida 的 Fibonacci XXZ 分析（[doi:10.1143/JPSJ.73.2296](https://doi.org/10.1143/JPSJ.73.2296)，arXiv:cond-mat/0404606v2）中，式 (38) 的 $\Delta E\sim\exp[-\kappa(\log N)^2]$ 属于强弱耦合分离下的相互作用各向同性模型的微扰重整化；式 (28) 的自由 XY 情形给出的是有限指数幂律 $\Delta E\sim N^{-z}$。这些结论不替代对本链实际有限矩阵、端点、奇偶截断与所求谱量的核对。

[@thm-ch39-p2e-tribonacci-prefix-log-refutation] 排除了把该统一对数区段界当作逆矩阵估计前提的路线。[@thm-ch39-p2e-tribonacci-uniform-log-squared] 提供的是实际词上、对起点一致的交替电荷控制；结合前面的有限乘积恒等式，它可作为分析跃迁比值的组合输入。它本身没有给出完整逆矩阵的范数或质量估计，也没有反驳某个多项式谱隙界。[@thm-ch39-p2e-tribonacci-open-chain-zero-gap] 另用具体正电荷前缀和一个完整逆矩阵元素证明 $\delta_{\rho,j}\to0$；下文 [@ex-ch39-p2e-tribonacci-prefix-rate] 已按同一组实际跃迁、奇数重复窗口与完整逆矩阵质量估计的前提，完成更强的 $73728/N_j$ 纸面应用，并给出参数一致收敛；它不由交替电荷界单独推出。沿前述 Slater 态路线讨论空间纠缠时，还须构造实际占据投影并分析空间压缩；物理态、空间切口与劳齐边界的对应及 [@prob-ch39-p2e-fractal-horizon] 的熵标度仍需独立建立。
:::

::: {.remark #rem-ch39-p2e-tridiagonal-localization title="保留两端残差的三对角算子下范数局部化"}
设 $A$ 是 $H=\ell^2(\mathbb Z;\mathbb C)$ 上的有界复线性算子。只假设其矩阵元 $A_{ij}=(Ae_j)_i$ 在 $|i-j|>1$ 时为零，其中 $e_j$ 是第 $j$ 个坐标单位向量。即使输入只占一个站点 $j$，输出也可能占据 $j-1,j,j+1$ 三个站点。对每个整数 $n\ge1$ 和 $k\in\mathbb Z$，令 $E_{n,k}$ 为支撑在 $k+1,\ldots,k+n$ 上的向量子空间。限制 $A|_{E_{n,k}}$ 的陪域仍是 $H$。计算输出范数时，$(n+2)\times n$ 矩阵保留第 $k$ 与第 $k+n+1$ 行，取 $n\times n$ 主子矩阵会丢掉这两行。

从 $A$ 的三条对角线读出 $a_i=A_{i,i-1}$、$b_i=A_{ii}$、$c_i=A_{i,i+1}$。由 $|A_{ij}|\le\|Ae_j\|\le\|A\|$，三个系数序列都有界。记 $M_-=\sup_i|a_i|$、$M_+=\sup_i|c_i|$，上确界均取遍 $\mathbb Z$。令 $(Ux)_i=x_{i-1}$，以 $M_f$ 表示逐坐标乘以 $f$。双向移位 $U$ 保持范数（`updateLinearIsometryEquiv`），乘法算子的范数等于系数的上确界范数（`diagonalOperator_norm`）。在每个 $e_j$ 上核对三项，再用所钉 Mathlib 的 `lp.ext_continuousLinearMap` 将等式延拓到整个 $H$，得到

$$
\begin{aligned}
A &= M_a U+M_b+M_c U^{-1},\\
(Ax)_i &= a_i x_{i-1}+b_i x_i+c_i x_{i+1}.
\end{aligned}
$$

对定义域非零的有界算子 $B$，记 $\nu(B)=\inf_{\|x\|=1}\|Bx\|$。每个窗口都含单位向量 $e_{k+1}$。给定窗口长度 $n$，下范数的局部化估计为

$$
\begin{aligned}
\inf_{k\in\mathbb Z}\nu(A|_{E_{n,k}})&\le \nu(A)+\delta_n,\\
\delta_n&=2(M_-+M_+)\sin\frac{\pi}{2(n+1)}.
\end{aligned}
$$

对固定的 $A$，这个误差界是 $O(1/n)$。正弦因子来自窗权平移一格的代价。取 $\theta=\pi/(n+1)$，在 $1\le j\le n$ 置 $w_j=\sin(j\theta)$，在其余整数上置零。将正弦递推 $w_{j-1}+w_{j+1}=2\cos(\theta)w_j$（`sine_reference_eigenvector`）乘以 $w_j$，对窗内站点求和。写 $S=\|w\|^2>0$，展开平方差即得

$$
\begin{aligned}
T=\|Uw-w\|^2 &= \sum_{j=0}^{n}(w_{j+1}-w_j)^2\\
&=2(1-\cos\theta)S=4\sin^2(\theta/2)S .
\end{aligned}
$$

在 $n=1$ 时，窗权从 $0$ 升到 $1$ 再降到 $0$，两端各贡献一个平方项。对任意 $x\in H$，用 $(D_kx)_i=w_{i-k}x_i$ 加窗。固定 $i$ 后对 $k$ 求和，每个坐标的平方质量都出现为 $S|x_i|^2$，因而 $\sum_k\|D_kx\|^2=S\|x\|^2$，这对无限支撑也成立。在 $AD_kx-D_kAx$ 中，对角项抵消。由 [@thm-observer-read-update-commutator] 的移位差公式及其有界算子分解 `readout_update_commutator_factorization`，两条副对角线分别给出向左、向右差分的窗权。两种差分的范数都是 $\sqrt T$。对整族输出在 $\ell^2(\mathbb Z;H)$ 中用三角不等式，得到

$$
\left(\sum_k\|AD_kx\|^2\right)^{1/2}
\le \sqrt S\,\|Ax\|+(M_-+M_+)\sqrt T\,\|x\|.
$$

给定任意 $\eta>0$，选单位向量 $x$ 使 $\|Ax\|<\nu(A)+\eta/2$。令 $q=\|Ax\|+\delta_n+\eta/2$。若每个窗口都满足 $\|AD_kx\|\ge q\|D_kx\|$，则上式左端至少为 $q\sqrt S$，而右端等于 $(q-\eta/2)\sqrt S$。故存在整数 $k$ 使不等式严格反向，且 $D_kx\ne0$。将它归一化便得到一个实际的 $u\in E_{n,k}$，满足 $\|u\|=1$ 与 $\|Au\|<\nu(A)+\delta_n+\eta$。对位置取下确界并令 $\eta$ 趋于零，即得上述估计。即使下确界未取到、$A$ 非自伴或任一条乃至两条副对角线恒为零，这一选窗论证仍成立。

这一标量复 Hilbert 空间应用对应 Chandler-Wilde、Chonchaiya 与 Lindner 的局部化估计（§5.1，命题 5.1、推论 5.2，第 765–766 页，第 767 页取正弦窗）。谱包含关系及误差常数的最优性各需另证。[文献原文，*J. Spectr. Theory* **14**, 719–804](https://doi.org/10.4171/JST/514)

若要沿此路线推出 Tribonacci 有限开链的谱隙界，仍须证明 $0$ 属于相应整轴模型的谱，把实际词区段连同两侧各一层邻接站点转植进指定的有限开前缀，并核对长度比例及小尺度情形。[@thm-ch39-p2e-tribonacci-open-chain-zero-gap] 直接在有限矩阵上证明。物理态、空间切口与劳齐边界的对应，以及 [@prob-ch39-p2e-fractal-horizon] 的纠缠熵标度，仍是独立问题。
:::

另一条有限矩阵路线利用奇数长度的重复：奇数平移把偶数键与奇数键互换，前代入中的两串跃迁比值因而可以配对。下面的下界把这一抵消机制写成实际逆矩阵的定量结论。

::: {.theorem #thm-ch39-p2e-odd-repeat-inverse-mass title="奇数重复段的逆矩阵质量下界" lean="D5/S3/Quantum/Dynamics/OddSquareGreenMass.odd_square_inverse_paired_mass"}
设 $q\in\mathbb{N}$，$t:\mathbb{N}\to\mathbb{R}$ 满足对每个 $i\in\mathbb{N}$ 都有 $0<t(i)\le1$，并且

$$
t(i+2q+1)=t(i)\qquad(0\le i<2q).
$$

令 $n=2q+1$。下双对角矩阵 $L\in\mathbb{R}^{n\times n}$ 从零编号，其非零位置为

$$
\begin{aligned}
L_{i,i}&=t(2i) &&(0\le i<n),\\
L_{i+1,i}&=-t(2i+1) &&(0\le i<n-1).
\end{aligned}
$$

其余位置为零。记 $G=L^{-1}$；对 $0\le l<q$、$0\le d<q-l$，定义成对质量

$$
\begin{aligned}
P_{l,d}&=G_{l+d+1,l}\\
&\quad+G_{q+l+d+1,q+l+1}.
\end{aligned}
$$

则所有这些矩阵指标都在 $0,\ldots,2q$ 内，且

$$
q(q+1)\le\sum_{l=0}^{q-1}\sum_{d=0}^{q-l-1}P_{l,d}.
$$

$q=0$ 时两重求和为空，按零计。
:::

::: proof
正的对角元保证前代入给出实际逆矩阵。奇数重复使每对中的两个正项之积恰为 $1/[t(2l)t(2(l+d+1))]\ge1$，所以每对之和至少为 $2$。三角形指标域共有 $q(q+1)/2$ 对，求和即得下界。完整证明由 Lean 内核检查。
:::

若 $m=2q+1$、$s$ 为偶数，实际词满足 $W_{s+i+m}=W_{s+i}$（$0\le i<m-1$），且 $s+2m\le N_j$，则可取 $t(i)=t_{W_{s+i}}$ 来匹配这一矩阵模型及前缀内的 $2m$ 站点窗口。下面的定理从替代词本身给出所需窗口及其与前缀长度的统一比较。

::: {.theorem #thm-ch39-p2e-aligned-tribonacci-windows title="实际 Tribonacci 前缀中的均匀奇数重复窗口" lean="D5/S1/Words/TribonacciAlignedWindows.aligned_windows"}
对上述实际词 $W$、替代长度 $L_j=|\sigma^j(A)|$ 与偶数前缀长度 $N_j=2\lfloor L_j/2\rfloor$，存在自然数 $K>0$、$J\ge1$，使每个自然数 $j\ge J$ 都有自然数 $m,s$ 满足

$$
\begin{aligned}
m&\ge3,\qquad m\text{ 为奇数},\quad s\text{ 为偶数},\\
N_j&\le Km,\qquad s+2m\le N_j,\\
W_{s+i+m}&=W_{s+i}\qquad(0\le i<m-1).
\end{aligned}
$$

最后一行对范围内的每个自然数 $i$ 成立；常数 $K,J$ 不随 $j$ 改变。
:::

::: proof
形式证明取 $K=128$、$J=4$。第四次替代中的两份 $ABA$ 提供重复块，四步替代保持三个字母像长度的奇性，从而给出奇数块长与偶数起点。非空尾段保证向下取偶数后仍包含整个窗口，七步长度增长给出因子 $128$。下面的例子展开这一构造；完整证明由 Lean 内核检查。
:::

::: {.example #ex-ch39-p2e-aligned-tribonacci-windows title="奇数重复窗口的显式构造"}
对每个 $j\ge4$，令 $r=\lfloor(j-4)/4\rfloor$、$k=4r$，于是 $k+4\le j\le k+7$。将第四次替代写成四段：

$$
\sigma^4(A)=ABAC\,\vert\,ABA\,\vert\,ABA\,\vert\,CAB.
$$

记 $a=\sigma^k(A)$、$b=\sigma^k(B)$、$c=\sigma^k(C)$，竖线表示拼接而非额外字母。再施加 $k$ 次替代，得到

$$
\sigma^{k+4}(A)=(abac)\,(aba)\,(aba)\,(cab).
$$

取 $s=|abac|$、$m=|aba|$。在每个四的倍数层，$a,b,c$ 的长度均为奇数：零层长度都是 $1$；第四次替代的三个字母像分别含 $13,11,7$ 个字母，故四步替代保持这三个长度的奇性。于是 $s$ 为偶数，$m\ge3$ 为奇数，且两份 $aba$ 给出所需的重复等式。尾段 $cab$ 非空，故将前缀长度向下取偶数仍保留整个重复窗口。每步替代至多使长度翻倍，因此

$$
\begin{aligned}
N_j&\le L_j\le L_{k+7}\le128L_k\le128m,\\
s+2m&\le N_j,\\
W_{s+i+m}&=W_{s+i}\qquad(0\le i<m-1).
\end{aligned}
$$

这里 $s,m$ 都是非负整数；常数 $128$ 与 $j$ 及跃迁参数 $\rho$ 无关。这给出 [@thm-ch39-p2e-aligned-tribonacci-windows] 中常数与窗口的具体选择。
:::

::: {.example #ex-ch39-p2e-full-inverse-euclidean title="从局部质量到完整逆矩阵的欧氏估计"}
取正且不超过 $1$ 的跃迁序列 $t$，令 $G=L(t,n)^{-1}$ 为上述双对角块的完整逆矩阵。设整数 $q\ge1$、$a\ge0$ 满足 $a+2q+1\le n$，并且

$$
t\bigl(2a+i+(2q+1)\bigr)=t(2a+i)\qquad(0\le i<2q).
$$

令 $x=(1,\ldots,1)\in\mathbb R^n$，$v=x/\sqrt n$。所有范数都取欧氏范数，则

$$
\|v\|_2=1,\qquad q(q+1)\le 2n\|Gv\|_2.
$$

这里的逆矩阵保留窗口两侧的所有外部站点。前代入给出的逆元公式说明：把局部逆矩阵的行、列同时平移 $a$，恰得到 $G$ 中对应的元素。由于 $G$ 的所有元素非负，[@thm-ch39-p2e-odd-repeat-inverse-mass] 的两个三角区域各自嵌入全矩阵后，给出

$$
q(q+1)\le2\sum_{i,j=0}^{n-1}G_{ij}.
$$

因子 $2$ 允许分别控制这两个区域，无须额外证明它们互不重叠。另一方面，柯西—施瓦茨不等式给出

$$
\begin{aligned}
\sum_{i,j=0}^{n-1}G_{ij}&=\langle x,Gx\rangle,\\
&\le\|x\|_2\|Gx\|_2,\\
&=n\|Gv\|_2.
\end{aligned}
$$

合并即得所示估计。对前述窗口，参数对应为 $m=2q+1$、$s=2a$、$N_j=2n$。这是既有逆矩阵质量结论、前代入公式和欧氏不等式的应用推导，不新增形式化声明，本例不带独立的 Lean 验证徽章。
:::

::: {.example #ex-ch39-p2e-open-chain-residual title="从完整逆矩阵到有限开链的谱残差界"}
对整数 $n\ge1$，取实跃迁序列 $t:\mathbb N\to\mathbb R$，满足每个 $k\in\mathbb N$ 都有 $t_k>0$。在按自然数从零编号的 $2n$ 个站点上，定义实际开链矩阵 $H\in\mathbb R^{2n\times2n}$：

$$
H_{ij}=\begin{cases}
t_i,&i+1=j,\\
t_j,&j+1=i,\\
0,&\text{其他情形},
\end{cases}
\qquad 0\le i,j<2n.
$$

它的对角线为零，最后一条物理键为 $t_{2n-2}$，没有首尾闭合键；$n=1$ 时就是仅含键 $t_0$ 的两个站点。同一逐项公式也定义作用在 $\mathbb C^{2n}$ 上的厄米矩阵。实对称矩阵的实正交特征基同时是复空间的正交特征基，特征值保持相同的实数；因此以下谱距离估计也适用于前面定义的复数开链。令 $B=L(t,n)$ 为前述下双对角块，即

$$
\begin{aligned}
B_{i,i}&=t_{2i} &&(0\le i<n),\\
B_{i,i-1}&=-t_{2i-1} &&(1\le i<n),
\end{aligned}
$$

其余元素为零。下三角性给出 $\det B=\prod_{i=0}^{n-1}t_{2i}>0$，故普通矩阵逆 $G=B^{-1}$ 存在。对每个欧氏单位向量 $v\in\mathbb R^n$，都存在实数 $\lambda$ 和非零实向量 $z\in\mathbb R^{2n}$，使

$$
\begin{aligned}
Hz&=\lambda z,\\
|\lambda|\,\|Gv\|_2&\le1.
\end{aligned}
$$

具体地，按偶站点、奇站点重排坐标，写 $C_{ij}=H_{2i,2j+1}$。矩阵 $C$ 的对角元为 $t_{2i}$，次对角元为 $t_{2i-1}$，其余元素为零。取 $D=\operatorname{diag}((-1)^i)_{i=0}^{n-1}$，则 $D^2=I$，且逐项计算得到

$$
\begin{aligned}
H&=\begin{pmatrix}0&C\\C^{\mathsf T}&0\end{pmatrix},\\
DCD&=B,\qquad CD=DB.
\end{aligned}
$$

第一行表示重排后的矩阵。构造辅助向量 $u$，令 $u_{\mathrm{even}}=0$、$u_{\mathrm{odd}}=DGv$。由 $BG=I$，

$$
\begin{aligned}
(Hu)_{\mathrm{even}}&=CDGv=DBGv=Dv,\\
(Hu)_{\mathrm{odd}}&=0,\\
\|u\|_2&=\|Gv\|_2,\qquad \|Hu\|_2=1.
\end{aligned}
$$

这里 $D$ 只改变坐标符号，保持欧氏范数；$BGv=v\ne0$ 还保证 $u\ne0$。由于 $H$ 是有限维实对称矩阵，取它的实正交归一特征基 $e_k$，对应实特征值 $\lambda_k$（$0\le k<2n$）。令 $\alpha=\min_{0\le k<2n}|\lambda_k|$，将 $u=\sum_k c_ke_k$ 代入 Parseval 恒等式，得到

$$
\begin{aligned}
\alpha^2\|u\|_2^2
&=\alpha^2\sum_{k=0}^{2n-1}c_k^2,\\
&\le\sum_{k=0}^{2n-1}\lambda_k^2c_k^2
=\|Hu\|_2^2=1.
\end{aligned}
$$

有限的非空特征值集合中存在 $k_0$ 使 $|\lambda_{k_0}|=\alpha$。取 $\lambda=\lambda_{k_0}$、$z=e_{k_0}$，开平方即得所示不等式。$z$ 是选出的特征向量，辅助向量 $u$ 一般并不是特征向量。本例不要求跃迁有上界。

若还满足 [@ex-ch39-p2e-full-inverse-euclidean] 的上界与重复窗口假设，使用其中同一个单位向量 $v$，便有

$$
\begin{aligned}
|\lambda|q(q+1)
&\le2n|\lambda|\,\|Gv\|_2\le2n,\\
\delta:=\min_{\mu\in\operatorname{Spec}(H)}|\mu|
&=|\lambda|\le\frac{2n}{q(q+1)}.
\end{aligned}
$$

这把完整逆矩阵的质量估计转成同一有限开链到零能量的谱距离界。
:::

::: {.example #ex-ch39-p2e-tribonacci-prefix-rate title="指定偶数开前缀的纸面谱界"}
回到实际词 $W$，固定 $0<\rho<1$，令 $t(i)=t_{W_i}$，其中 $t_A=\rho^2$、$t_B=\rho$、$t_C=1$。这些跃迁在所有位置都满足 $0<t(i)\le1$。对每个 $j\ge4$，采用 [@ex-ch39-p2e-aligned-tribonacci-windows] 的显式窗口，写

$$
\begin{aligned}
m&=2q+1,\qquad s=2a,\qquad N_j=2n,\\
q&\ge1,\qquad a+m\le n,\qquad N_j\le128m.
\end{aligned}
$$

这里 $q,a,n$ 都是自然数。相同字母具有相同跃迁，所以窗口中的字等式给出

$$
t\bigl(2a+i+(2q+1)\bigr)=t(2a+i)\qquad(0\le i<2q).
$$

因此前两个例子适用于这同一条 $N_j$ 站点开链：局部矩阵是移位跃迁 $t(2a+\cdot)$ 的块，完整逆矩阵仍取全前缀的 $L(t,n)^{-1}$，没有删除窗口外的站点，也没有添加闭合键。取其中同一个单位向量 $v$，得到 $\delta_{\rho,j}q(q+1)\le N_j$。由 $q\ge1$，

$$
\begin{aligned}
9q(q+1)-2(2q+1)^2&=(q-1)(q+2)\ge0,\\
N_j\delta_{\rho,j}
&\le\frac{N_j^2}{q(q+1)}
\le\frac{128^2(2q+1)^2}{q(q+1)}
\le73728.
\end{aligned}
$$

常数 $73728=128^2\cdot9/2$ 与 $j$ 和 $\rho$ 无关，不声称最优。每个替代迭代都以 $A$ 开头；替代不擦除字母，而这个首字母至少增加一个字母，所以 $L_{j+1}\ge L_j+1$、$L_j\ge j+1$，进而 $N_j\ge L_j-1\ge j$。故 $\delta_{\rho,j}\le73728/N_j\to0$。这一尾段结论不要求另行估计 $j=1,2,3$。

这个界还给出对跃迁参数的一致收敛。对任意 $\varepsilon>0$，取

$$
J=\max\left\{4,\left\lfloor\frac{73728}{\varepsilon}\right\rfloor+1\right\}.
$$

由于 $N_j\ge j$，对每个 $j\ge J$ 和每个 $0<\rho<1$ 都有

$$
0\le\delta_{\rho,j}\le\frac{73728}{N_j}\le\frac{73728}{j}<\varepsilon.
$$

这里 $J$ 与 $\rho$ 无关；结论覆盖整个开区间，不把端点 $\rho=0$ 的退化模型纳入假设。

这是所列窗口构造、完整逆矩阵质量估计与有限维谱转换的纸面应用推导，不带独立 Lean 验证徽章；其参数对应与形式化来源见[形式化接口](https://github.com/the-omega-institute/trureturing/issues/30166)。有限开链的这一谱界不构造多体基态，也不确定空间切口的纠缠熵或劳齐边界的维数。
:::

上例给出指定偶数开前缀的纸面 $1/N_j$ 界与趋零结论。分形熵标度仍需独立的物理态与空间切口论证；[@prob-ch39-p2e-fractal-horizon] 的这些部分保持开放。

前面的定量纸面应用已经给出更强的速率。另一个独立论证只需 [@thm-ch39-p2e-tribonacci-prefix-log-refutation] 中构造的实际前缀：奇数层的正电荷无界，因而可使完整逆矩阵的一个条目充分大。

::: {.theorem #thm-ch39-p2e-tribonacci-open-chain-zero-gap title="实际正跃迁 Tribonacci 开链的全序列谱距离趋零" lean="D5/S3/Quantum/Dynamics/TribonacciOpenPathGap.gap_tendsto_zero"}
取 $\sigma(A)=AB$、$\sigma(B)=AC$、$\sigma(C)=A$ 的从 $A$ 出发的实际不动词 $W$，以及权重 $w(A)=2$、$w(B)=1$、$w(C)=0$。对每个固定实数 $0<\rho<1$，令 $t_i=\rho^{w(W_i)}$。对整数 $j\ge1$，令

$$
\begin{aligned}
L_j&=|\sigma^j(A)|,\qquad N_j=2\lfloor L_j/2\rfloor,\\
(h_{\rho,j})_{ab}&=\begin{cases}
t_a,&a+1=b,\\
t_b,&b+1=a,\\
0,&\text{其他情形},
\end{cases}\quad 0\le a,b<N_j,\\
\delta_{\rho,j}&=\min\{|\lambda|:\lambda\in\operatorname{Spec}(h_{\rho,j})\}.
\end{aligned}
$$

矩阵作用于 $\mathbb C^{N_j}$，对角线为零，只有最近邻物理键 $t_0,\ldots,t_{N_j-2}$，没有首尾闭合键；其特征值均为实数。则

$$
\lim_{j\to\infty}\delta_{\rho,j}=0.
$$

等价地，对每个 $\varepsilon>0$，存在整数 $J\ge1$，使每个整数 $j\ge J$ 都满足 $0\le\delta_{\rho,j}<\varepsilon$。
:::

::: {.proof #pf-ch39-p2e-tribonacci-open-chain-zero-gap}
本证明依照 [源声明 `gap_tendsto_zero`](lean:D5/S3/Quantum/Dynamics/TribonacciOpenPathGap.gap_tendsto_zero) 的陈述与论证展开。

先固定一个真实的奇长前缀，再把同一个前缀放进所有足够长的开链。沿用 [@thm-ch39-p2e-tribonacci-prefix-log-refutation] 证明中的 $\tau=\sigma^4$、$F$ 与

$$
U_0=\varepsilon,\qquad U_{n+1}=\sigma^{4(n+1)}(C)U_n,\qquad m_n=|U_n|.
$$

该证明已逐字建立 $U_n=W_{[0,m_n)}$ 以及 $F(U_n)=1-(-1)^n(n^2+3n+1)$。每个新增块 $\sigma^{4(n+1)}(C)$ 都为奇长，所以 $m_{n+1}\equiv1+m_n\pmod2$。由 $m_0=0$ 归纳得到 $m_n\equiv n\pmod2$。故对每个奇数 $n$，可写

$$
m_n=2q+1,\qquad F(U_n)=(n+1)(n+2)>0.
$$

设 $N_j\ge m_n+1$，记 $M=\lfloor L_j/2\rfloor$，则 $N_j=2M$ 且 $q<M$。取整条物理开链 $H=h_{\rho,j}$。使用 [@ex-ch39-p2e-open-chain-residual] 的双对角块 $B=L(t,M)$、正块 $C$ 与 $D=\operatorname{diag}((-1)^r)_{r=0}^{M-1}$；它们满足

$$
\begin{aligned}
B_{r,r}&=t_{2r},\qquad B_{r,r-1}=-t_{2r-1},\\
D^2&=I,\qquad DCD=B.
\end{aligned}
$$

第二个矩阵元素公式用于 $1\le r<M$。所有 $t_i>0$，所以 $B$ 的对角元非零，普通逆矩阵 $G=B^{-1}$ 存在，且 $C^{-1}=DGD$。把站点按偶数 $2r$、奇数 $2r+1$ 排列，整条开链及其逆为

$$
\begin{aligned}
H&=\begin{pmatrix}0&C\\C^{\mathsf T}&0\end{pmatrix},\\
H^{-1}&=\begin{pmatrix}0&(C^{-1})^{\mathsf T}\\C^{-1}&0\end{pmatrix}.
\end{aligned}
$$

这里两式都表示置换后的坐标；$H$ 的可逆性也随之得到。前代入的首列从 $G_{0,0}=1/t_0$ 开始，对 $1\le r<M$ 满足 $t_{2r}G_{r,0}=t_{2r-1}G_{r-1,0}$，因而

$$
G_{q,0}=\frac{\prod_{r=0}^{q-1}t_{2r+1}}{\prod_{r=0}^{q}t_{2r}}>0.
$$

这就是前述 Green 元素公式在起点零的情形，$q=0$ 时分子按空积 $1$ 计。回到物理站点，$D$ 的符号给出 $(H^{-1})_{2q+1,0}=(-1)^qG_{q,0}$。代入实际跃迁 $t_i=\rho^{w(W_i)}$，注意分母包含最后一条偶数键 $t_{2q}$，得到

$$
\begin{aligned}
|(H^{-1})_{2q+1,0}|&=G_{q,0}\\
&=\rho^{-\sum_{i=0}^{2q}(-1)^iw(W_i)}\\
&=\rho^{-F(U_n)}=\rho^{-(n+1)(n+2)}.
\end{aligned}
$$

用到的物理键恰在 $0,\ldots,2q$ 内，站点 $2q+1<N_j$；$N_j\ge|U_n|+1$ 正是保留最后这条键及其右端站点的条件。这里取的是完整 $N_j$ 站点矩阵的逆元素，外侧站点都保留，没有以局部压缩的逆替代它，也没有补接边界键。

谱转换使用复欧氏空间上的诱导算子范数 $\|T\|_{2\to2}=\sup_{\|v\|_2=1}\|Tv\|_2$。以单位坐标向量 $e_0$ 测试，

$$
|(H^{-1})_{2q+1,0}|\le\|H^{-1}e_0\|_2\le\|H^{-1}\|_{2\to2}.
$$

此处不使用逐元素最大值范数。$H$ 是可逆 Hermitian 矩阵，其逆仍为 Hermitian，逆的特征值为原特征值的倒数。有限维谱定理使 $H^{-1}$ 的欧氏算子范数等于其特征值绝对值的最大值；所以存在原矩阵的实特征值 $\lambda$，满足

$$
\begin{aligned}
|\lambda|&=\|H^{-1}\|_{2\to2}^{-1},\\
0\le\delta_{\rho,j}&\le|\lambda|\le\rho^{(n+1)(n+2)}.
\end{aligned}
$$

最后给定 $\varepsilon>0$。因 $0<\rho<1$，可选自然数 $k$ 使 $\rho^k<\varepsilon$，再固定奇数 $n=2k+1$。有 $(n+1)(n+2)\ge k$，故上述界小于 $\varepsilon$。实际替代长度满足 $L_j\ge j+1$，从而 $N_j\ge L_j-1\ge j$；因此存在 $J\ge1$，使所有 $j\ge J$ 都有 $N_j\ge m_n+1$，并适用同一个前缀的估计。$n$ 只按 $\rho,\varepsilon$ 选择一次，此后每个 $j\ge J$ 都得到 $0\le\delta_{\rho,j}<\varepsilon$，并非只挑出一条子序列。

源声明将 $j=0$ 时的 `gap` 定义为 $0$，以避开零维矩阵的空特征值集合；$j\ge1$ 时 $L_j\ge2$，其定义正是这里非空有限实谱的最小绝对值。这个单点约定不改变极限。

完整证明由 Lean 内核检查。
:::

这条单独的收敛定理只陈述每个固定正 $\rho$ 的全序列极限；它的单个逆矩阵条目论证不提供 $1/N_j$ 速率。前面的 [@ex-ch39-p2e-tribonacci-prefix-rate] 已用实际重复窗口与完整逆矩阵质量估计给出更强的 $73728/N_j$ 纸面界及参数一致收敛。两条论证的证据范围须分别保留；物理态、空间切口与分形熵标度仍需另外建立。

::: {.viz src="pisot-clifford-rauzy-sandtable" preset="entropy" height="500"}
**帕里平稳权重、有限逃逸对与回归熵对照卡（`entropy`）**：分栏呈现有向重置链的青色帕里平稳分布权重 $\pi_K$、有限观测竞技场中被品红标出的未区分逃逸对 $E(S)$，以及单独标注依据等级的移位熵 $\log_2\beta_K$ 与诱导回归熵读数；琥珀色标出当前选定的阶数 $K$，红色标签标示分形视界标度开放问题（[@prob-ch39-p2e-fractal-horizon]）。平稳律与逃逸对计数属 `LEAN ✓`；卡片的拓扑熵识别与阿布拉莫夫公式属 `文献结果`，实际无符号律的度量熵比较见 [@rem-ch39-p2e-abramov-literature] 的应用推导；分形面积律属 `OPEN`。
:::

至此，我们可以把本节审视的全部八项概念汇总在一张无折行认识论总表之中，使每一环的形式内核、文献依托与诠释边界清晰对齐：

| 八概念环节 | 精确数学对象与代表性冻结声明 | 认识论等级与边界定位 |
| :--- | :--- | :--- |
| **1. 齐肯多夫禁邻语言** | $K = 2$ 禁相邻 `11` 自动机 [`base_success_iff_noAdjacentOnes`](lean:D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes)（[@thm-ch39-fiber-reconstruction-and-zeckendorf-thread] 第 3 款）与合法字计数 [`dbonacci_name_card`](lean:D5/S0/Tower/DBonacci/Names.dbonacci_name_card)（$F_{Q+2}$）及短前缀全满律 [`dbonacci_name_card_of_lt`](lean:D5/S0/Tower/DBonacci/Names.dbonacci_name_card_of_lt) | `LEAN ✓`（注意 `List (Fin 2)` 与 `Fin Q → Bool` 载体转换） |
| **2. $K$-Bonacci 皮索谱** | 特征多项式 $P_K(X)$ 整/有理不可约 [`dbonacci_irreducible`](lean:D5/S0/Tower/DBonacci/Irreducibility.dbonacci_irreducible)、主根恒等式 $2-\beta_K=\beta_K^{-K}$ [`two_sub_dbonacciPerronRoot_eq_inv_pow`](lean:D5/S0/Tower/DBonacci/PerronRoot.two_sub_dbonacciPerronRoot_eq_inv_pow)、极限 $\beta_K \to 2$ [`dbonacciPerronRoot_tendsto_two`](lean:D5/S0/Tower/DBonacci/PerronRoot.dbonacciPerronRoot_tendsto_two) 与复共轭单位圆盘收缩 [`dbonacci_complex_root_location`](lean:D5/S0/Tower/DBonacci/Irreducibility.dbonacci_complex_root_location)（[@thm-ch39-p2e-kbonacci-pisot]） | `LEAN ✓`（代数根定位定理）；具体小数 $\beta_3 \approx 1.839287$ 属 `NUM` |
| **3. $p$ 进余数树与超度量** | 模 $p^k$ 首次区分精度 $v_p(x-y)+1$ [`first_distinguishing_precision`](lean:D5/S3/Arith/Congruence/PadicPrecisionBlindSpot.first_distinguishing_precision)、观测距离 [`observation_distance_eq_padic_valuation`](lean:D5/S3/Arith/Congruence/PadicObservationDistance.observation_distance_eq_padic_valuation)、同余纤维交集 [`congruenceFiber_eq_closedBall_inter_range`](lean:D5/S3/Arith/Congruence/PadicBallFiberCorrespondence.congruenceFiber_eq_closedBall_inter_range) 与有限视界细化超度量 [`refinementDistance_ultrametric`](lean:D5/S3/ConceptDynamics/RefinementGeometry/RefinementUltrametric.refinementDistance_ultrametric)（[@thm-ch39-p2e-padic-readout]） | `LEAN ✓`（各自独立成立）；$p$ 进树与 $K$-Bonacci 树的跨系统并置属 `MODEL` |
| **4. $K=3$ 劳齐分形内窗** | 零次幂内窗非空内点 [`rauzyFractal_interior_nonempty`](lean:D5/S3/Geometry/Rauzy/TribonacciInterior.rauzyFractal_interior_nonempty)、正则闭集 [`rauzyFractal_closure_interior`](lean:D5/S3/Geometry/Rauzy/TribonacciRegularClosure.rauzyFractal_closure_interior)、三支前缀精确自覆盖 [`rauzyFractal_prefix_cover`](lean:D5/S3/Geometry/Rauzy/TribonacciRegularClosure.rauzyFractal_prefix_cover)（[@thm-ch39-p2e-rauzy-regular-window]）与二维零测边界 [`rauzyFractal_frontier_volume_zero`](lean:D5/S3/Geometry/Rauzy/TribonacciNullBoundary.rauzyFractal_frontier_volume_zero)（[@thm-ch39-p2e-rauzy-null-boundary]） | `LEAN ✓`（集合与平面面积零测）；拼砖、圆盘连通性与 $\dim_H \partial\mathcal{R}_3 \approx 1.09336$ 属 `文献结果` + `NUM`（[@rem-ch39-p2e-rauzy-literature]） |
| **5. 克利福德线—面分解** | 三次闵可夫斯基实线性坐标嵌入 $E_\parallel^1 \oplus E_\perp^2$ 与内部复平面缩放旋子 $\beta_3^{-1/2}(\cos\vartheta + B_\perp\sin\vartheta)$ | `MODEL`（需显式声明基与度规，观察者线—面词典见 [@rem-ch39-p2e-unification-model]） |
| **6. 自指收缩尺度对照** | 正实轴余弦端点 $\cos\theta^* = \theta^*$ [`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint) 与三阶共轭范数 $|\alpha| = \beta_3^{-1/2}$ [`tribonacci_secondary_root_mul_conjugate`](lean:D5/S3/Constants/Irrationality/TribonacciTraceLattice.tribonacci_secondary_root_mul_conjugate) | `LEAN ✓`（各自端点与恒等式）+ `文献结果`（$\theta^*$ 超越性）+ `NUM`（$\approx 0.234\%$ 数值邻近，严格不等）+ `MODEL`（$\psi=\psi(\psi)$ 母题，[@ex-ch39-p2e-pisot-dottie-numerics]） |
| **7. 跨切口编码纠缠秩** | 跨切口条件 $\tau(x)+\iota(y)<K$ 下的可达页秩充要矩形 $1 \le r_b \le R_b$ 与最大页熵 $\ln R_b$ [`complete_original_direct_rank_entropy`](lean:D5/S3/Quantum/Entanglement/KBonacciDirectRankEntropy.complete_original_direct_rank_entropy)（[@thm-ch39-p2e-direct-encoder-ranks]）及谱阻塞 [`actual_encoder_spectral_obstruction`](lean:D5/S3/Quantum/Entanglement/KBonacciDirectSupportObstruction.actual_encoder_spectral_obstruction) | `LEAN ✓`（秩等于 $K$ 仅在 $K \le R_b$ 时条件可达，非普适恒等）+ `NUM`（如 $R_0=6, R_1=5$）+ `文献结果`（黄金链与里德堡实验，[@rem-ch39-p2e-rydberg-anyon-literature]） |
| **8. 平稳核、逃逸对与熵** | 有向重置链帕里平稳律 [`parry_stationary_law`](lean:D5/S3/TotalVariation/ParryResetLaw.parry_stationary_law)（[@thm-ch39-p2e-parry-escape-laws]）、实际双向律与柱集（[@thm-ch39-p2e-native-bilateral-parry-law]）、边界柱集不等式 [`parry_boundary_cylinder_bound`](lean:D5/S3/TotalVariation/ParryBoundaryCylinderBound.parry_boundary_cylinder_bound) 与有限逃逸对判据 [`lowersEscape_iff_uniqueCaptureCount_pos`](lean:D5/S3/ConceptDynamics/InformationEscape/ExactRate.lowersEscape_iff_uniqueCaptureCount_pos) | `LEAN ✓`（所引概率律与计数）+ [@thm-ch39-p2e-parry-ks-entropy]（同一无符号律的 KS 上界与达到性）+ 应用推导（最大熵测度唯一性）+ `文献结果`（拓扑熵识别与首次回归阿布拉莫夫公式，[@rem-ch39-p2e-abramov-literature]）+ `OPEN`（分形视界纠缠标度，[@prob-ch39-p2e-fractal-horizon]） |

当我们在下面的综合实验室中把阶数从 $K = 2$ 拨向 $K = 3$ 再继续上推时，自指扩表语法的多切面几何结构便清清楚楚地浮现出来：$K = 2$ 时内部收缩空间还只是一条实轴线段；跨入 $K = 3$ 的瞬间，复共轭根在二维正交平面上旋出三支精确自覆盖、平面边界零测的劳齐分形内窗；而在每一个阶数上，已被 Lean 内核锁定的离散计数、多项式根圆盘、细化超度量、可达纠缠秩矩形与帕里平稳核构成了坚硬的绿色骨架，支撑起周围明确标界的经典文献、数值实验与跨学科几何诠释。穿越这座离散自指沙盘之后，让我们步入本章收官节 [§35.7 `trureturing` 的“黄金切投”形式原语与灵魂—遗迹吸引子的几何诠释](coda-s03-golden-cut-observers.md)，在闵可夫斯基切投模型集与有界间隙环面回归中完成第三十五章的合拢，随后迈入[第三十六章](ch38-observer-memory-pointer-and-ontological-qram.md)的梦境量子擦除与本体 QRAM 架构。

::: {.viz src="pisot-clifford-rauzy-sandtable" height="640"}
**交互实验室 `ORTHO//RAUZY`**：齐肯多夫、皮索与劳齐八概念综合沙盘。自由切换上表对应的八个预设场景、调节阶数 $K$、素数基数 $p$、字长视界与三维观察视角，并直接拖拽物理轴与内部平面上的分解点：实时核对禁 $1^K$ 合法字计数、皮索共轭根单位圆盘收缩、模 $p^k$ 余数树首次区分层级、$K = 3$ 劳齐内窗三支仿射覆盖（及 $K = 4$ 内部坐标采样云）、$\theta^*$ 与 $|\alpha|_{K=3}$ 的数值比对、跨切口可达秩矩形 $[1, R_0] \times [1, R_1]$，以及帕里平稳分布与有限逃逸对账本。绿色依据框严格对应 Lean 已验证定理，文献结论、数值计算、诠释模型与开放问题分别按各自标签独立标示。
:::
