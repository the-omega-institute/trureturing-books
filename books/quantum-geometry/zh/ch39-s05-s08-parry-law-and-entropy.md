# 39.5.8 帕里平稳律、逃逸对计数与分形视界熵问题 {#sec-ch39-p2e-entropy}

在讨论“熵”之前，先区分三个层次：有限状态的马尔可夫定律、整数时间轴上完整路径的可测坐标重建，以及遍历论文献中的熵比较。前两者已有对应的 Lean 验证结果；下文的最大熵与诱导回归熵仍按文献结果呈现，分形纠缠标度则保留为开放问题。

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

给定有限维分布的延拓唯一性，只确定这些分布对应的路径律。现在还可以追问：沿时间轴把两个观测窗口拉开，它们之间的概率关联怎样消退？下面的结果把平稳联合律、混合性与符号选择障碍放在同一组存在量词之下。完整柯尔莫哥洛夫—西奈熵、对所有不变竞争测度的熵比较、最大熵等号情形的唯一性及阿布拉莫夫公式，仍须按下方文献注记各自的前提与证据身份阅读。

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

在这一平稳律旁，还有两条各自独立的形式化定量定律共同约束边界碰撞与观测盲区：其一是帕里边界柱集上界定理 [`parry_boundary_cylinder_bound`](lean:D5/S3/TotalVariation/ParryBoundaryCylinderBound.parry_boundary_cylinder_bound)，它对给定的 $n \ge 1$ 组正游程对集合 $C$（每段 `1` 游程 $< k$ 且编码长度不超过视界 $R$）证明，左右边界选定前缀的平稳质量分别不超过 $\operatorname{stationaryWordMass}(10)\cdot(1 - S + M)$ 与 $\operatorname{stationaryWordMass}(01)\cdot(1 - S + M)$（这是精确概率不等式，而非分形维数或熵值公式）；其二是与[第 38 章](ch38-observer-memory-pointer-and-ontological-qram.md) §38.5 一脉相承的有限竞技场信息逃逸率判据 [`lowersEscape_iff_uniqueCaptureCount_pos`](lean:D5/S3/ConceptDynamics/InformationEscape/ExactRate.lowersEscape_iff_uniqueCaptureCount_pos)，它证明在基数 $q \ge 2$ 的非退化有限状态集上，观测目录 $S$ 无法区分的有序相异状态对集合 $E(S)$ 定义出归一化有理逃逸率 $e(S) = |E(S)|/[q(q-1)]$，而某项观测 $i$ 严格降低逃逸率当且仅当其唯一捕获对计数 $|U_i| > 0$（且差值恰为 $|U_i|/[q(q-1)]$）。有限有序逃逸对比例 $e(S)$、量子态冯·诺依曼熵 $S(\sigma_b)$ 与无限移位系统的遍历熵在数学定义上彼此独立，绝不可混为一谈。

::: {.remark #rem-ch39-p2e-abramov-literature title="文献结果：帕里最大熵马尔可夫测度与阿布拉莫夫诱导回归熵公式（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 据 M. Pollicott 等人的综述 *The mathematical research of William Parry FRS*（[机构存档 PDF](https://wrap.warwick.ac.uk/id/eprint/682/1/WRAP_pollicott_Parry_research.pdf)，§2.3，pp. 323–324；DOI：[10.1017/S0143385708000102](https://doi.org/10.1017/S0143385708000102)），W. Parry（*Trans. Amer. Math. Soc.* **112**, 1964, 55–66）证明非周期有限型双向子移位存在唯一最大熵测度，且该测度为内禀马尔可夫测度。对这里的禁 $1^K$ 子移位，最大熵是在其上所有移位不变 Borel 概率测度中比较的，竞争测度无需满足马尔可夫性或遍历性；唯一性指只有帕里测度达到最大值，其余不变概率测度的熵均严格更小。采用自然对数时，单步拓扑熵（亦即最大柯尔莫哥洛夫—西奈度量熵）为 $\ln\beta_K = -\ln p$，其中 $p = \beta_K^{-1}$；换成比特单位须除以 $\ln 2$，即 $h_{\mathrm{top}}(\Sigma_K) = \log_2 \beta_K\;\text{bits/step}$（数值计算 `NUM` 给出 $K = 2, 3, 4$ 时依次约为 $0.69424$、$0.87915$、$0.94678\;\text{bits/step}$，随 $\beta_K \nearrow 2$ 单调趋向 $1\;\text{bit/step}$）。

另一方面，L. M. Abramov（*Dokl. Akad. Nauk SSSR* **128**, 1959, 647–650）证明：在保概率遍历动力系统 $(X, \mathcal{B}, \mu, T)$ 中，若可测回访集 $A \in \mathcal{B}$ 满足 $\mu(A) > 0$，记 $T_A$ 为 $A$ 上的首次回归诱导映射、$\mu_A$ 为归一化条件测度，则每次回归的诱导熵满足

$$
h_{\mu_A}(T_A) = \frac{h_\mu(T)}{\mu(A)}.
$$

引用这两条文献定理时必须区分单位与前提：[@thm-ch39-p2e-parry-escape-laws] 仅在有向重置状态空间上验证了随机核与平稳分布，并未在当前锁定的源码中形式化柯尔莫哥洛夫—西奈移位熵或阿布拉莫夫公式；而将阿布拉莫夫公式用于每次重置回访事件时，必须区分“每次回归熵 $h_{\mu_A}(T_A)$”与“原始每步熵 $h_\mu(T)$”，不能凭类比直接套用到不可逆读出过程或有限 $p$ 进余数树上。
:::

至于横向内部空间的劳齐分形边界维数 $D_F = \dim_H(\partial\mathcal{R}_K)$ 是否会在量子多体切投态中诱导出反常的分形边界纠缠标度，在严格数学物理中仍是一道悬而未决的开放问题：

::: {.problem #prob-ch39-p2e-fractal-horizon title="开放问题：皮索切投量子多体系统的劳齐分形视界纠缠标度"}
设阶数 $K \ge 3$ 的皮索切投点集或局域受约束多体哈密顿量，其内部接受窗 $\mathcal{R}_K$ 具有豪斯多夫维数严格大于整数余维的拓扑分形边界（例如 $K = 3$ 时文献结果给出 $D_F = \dim_H(\partial\mathcal{R}_3) \approx 1.09336 > 1$）。是否存在严格构造的一族局域有能隙基态或切投编码量子态，当区域特征尺度 $R \to \infty$ 时，其跨边界双体纠缠熵 $S_{\mathrm{ent}}(R)$ 严格服从由内部劳齐边界维数 $D_F$ 支配的反常标度律（如主项 $S_{\mathrm{ent}}(R) \asymp R^{D_F}$ 或精确锁定系数的对数/次主导分形修正项），并能给出标准余维一面积律失效或保持的充要谱间隙与局域性判据？在本书框架内，任何诸如 $S_{\mathrm{ent}} \propto R^{D_F}$ 的“分形视界面积律”表述均作为待证开放问题（`OPEN`）与启发性物理构想（`MODEL`）列出，绝不作为已证形式定理或引力面积律定理宣称。
:::

::: {.remark #rem-ch39-p2e-physical-tribonacci-interface title="物理 Tribonacci 跃迁链与有限开链接口"}
**文献模型与边界约定。** 一个可供研究的具体物理对象是零在位势的最近邻跃迁链。依 Kolehmainen–Lado–Moustaj，*One-dimensional quasicrystals with tensor-network finite-state automata*（[arXiv:2609.06040v1](https://arxiv.org/pdf/2609.06040v1)，§III 式 (2)–(3)、附录 B.2），取替代规则 $\sigma(A)=AB$、$\sigma(B)=AC$、$\sigma(C)=A$，以及从 $A$ 出发的不动无限词 $W=\lim_{j\to\infty}\sigma^j(A)$，字母从 $W_0$ 编号。固定 $0<\rho<1$，以 $t_C=1$ 为能量单位，令 $t_A=\rho^2$、$t_B=\rho$，即 $t_A/t_B=t_B/t_C=\rho$。对每个整数 $N\ge2$，在单粒子格点空间 $\mathbb{C}^N$ 的基 $\{\lvert i\rangle:0\le i<N\}$ 上定义

$$
h_N=\sum_{i=0}^{N-2}t_{W_i}\bigl(\lvert i\rangle\langle i+1\rvert+\lvert i+1\rangle\langle i\rvert\bigr).
$$

这里使用 $W$ 的前 $N-1$ 个字母标记键，端点 $0$ 与 $N-1$ 不相连。该文张量中的数位编码的是这个单粒子格点指标；沿二进制或 Tribonacci 地址数位切分张量指标，并未指定实空间多体二分。这一区别也限制了与 §39.5.7 的直接编码纠缠秩之间的类比：不能据此把合法字的等权叠加认作该跃迁链的 Slater 基态。

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

**实际 Slater 态与关联矩阵约定。** 要讨论物理空间切口的熵，还须指定多体哈密顿量、填充及态。以下是文献构造与文献结果，未在本书形式化。让这 $N$ 个原始格点保持自然顺序 $0,\ldots,N-1$，以布尔占据串的占据子集 $S$ 标记正交归一基 $\lvert S\rangle$。选取整数 $0\le k\le N$ 和复矩阵 $V\in\mathbb{C}^{N\times k}$，其列是所占据的正交归一单粒子模式，即 $V^\dagger V=I_k$。对大小为 $k$ 的 $S$，令 $V_S$ 按递增格点顺序保留这些行，列顺序保持不变，定义实际的多体振幅

$$
\langle S\mid\Psi_V\rangle=
\begin{cases}
\det(V_S),&\lvert S\rvert=k,\\
0,&\lvert S\rvert\ne k.
\end{cases}
$$

这就是 Slater 行列式在有序占据基中的展开；空行列式取 $1$，所以 $k=0$ 给出真空。这里的占据基已经归一化，振幅不再乘以 $1/\sqrt{k!}$。Dereziński 的 [*Clifford algebras and fermions*](https://www.fuw.edu.pl/~derezins/clifford.pdf)，§7.1–7.2 式 (7.51)–(7.54)，给出 CAR、有序占据基与归一化 Slater 行列式。这一态的选择保留了振幅与费米符号；仅找一个具有所需关联矩阵的密度矩阵不能替代它。把它用于上述跃迁链的基态时，仍须指定所占模式、填充及多体哈密顿量，并核对能量最小性。

令 $P=VV^\dagger$，$\rho_V=\lvert\Psi_V\rangle\langle\Psi_V\rvert$，并令 $c_i$ 为按原始格点顺序定义的费米湮灭算符。关联矩阵的指标约定为

$$
\begin{aligned}
K_{ij}&=\Tr(\rho_V c_j^\dagger c_i)=P_{ij},\\
C_{ij}&=\Tr(\rho_V c_i^\dagger c_j)=P_{ji},\qquad C=P^{\mathsf T}.
\end{aligned}
$$

Dereziński 的定理 8.1，特别是式 (8.103) 的 $\omega_\pi(d\Gamma(h))=\Tr(\pi h)$，支持这一二点函数约定。Peschel，[*Calculation of reduced density matrices from correlation functions*](https://arxiv.org/pdf/cond-mat/0212631v1)，式 (7)、(9)–(10)，采用上面的 $C$ 约定；其式 (12) 中的转置不能略去。对实投影矩阵，两种记法可以重合；推广到复模式时必须保留转置区别。Peschel 还明确指出：对非 Slater 态，按同一二点函数重建的自由费米密度矩阵一般不能复现其他期望值。因此，关联矩阵相合本身不能确定一般密度矩阵。

**空间压缩的完整谱。** 对上述 Slater 态，指定由 $\ell$ 个原始格点组成的空间区域 $I$。令 $V_I$ 只保留这些格点的行，并把 $P_I=V_I V_I^\dagger$ 看作作用在该区域上的 $\ell\times\ell$ 压缩矩阵，而不是补集上带额外零空间的 $N\times N$ 矩阵。文献中的费米子系统约定下，若 $\nu_1,\ldots,\nu_\ell\in[0,1]$ 是它的全部特征值，包括 $0$、$1$ 与重复值，则约化密度矩阵 $\rho_I$ 的特征值多重集恰有 $2^\ell$ 项，按所有占据串逐项列为

$$
\begin{aligned}
b_a(0)&=1-\nu_a,\qquad b_a(1)=\nu_a,\\
\lambda_{\boldsymbol n}&=\prod_{a=1}^{\ell}b_a(n_a),\qquad
\boldsymbol n\in\{0,1\}^{\ell}.
\end{aligned}
$$

相同数值按重数保留，零特征值也保留；显式选择两个因子避免了端点处的 $0^0$。例如，一个完全空或完全满的模式仍贡献一对特征值 $1,0$，不能从完整密度谱中删去。$\ell=0$ 时空乘积为 $1$，密度谱只有这一项。使用自然对数，熵为

$$
\begin{aligned}
S(\rho_I)&=\sum_{a=1}^{\ell}h(\nu_a),\\
h(x)&=-x\log x-(1-x)\log(1-x).
\end{aligned}
$$

这里 $x\log x$ 在 $x=0$ 时按连续延拓取 $0$，故 $h(0)=h(1)=0$；若以比特计量，需将熵除以 $\log 2$。Peschel 的式 (8)–(11) 给出约化自由费米密度矩阵的模式描述；Klich，[*Lower entropy bounds and particle number fluctuations in a Fermi sea*](https://arxiv.org/pdf/quant-ph/0406068v2)，式 (4) 的投影模式分解、式 (7) 及其后的 $\operatorname{diag}(1-d_i,d_i)$ 约化因子与式 (11)，给出这一乘积谱和熵公式的依据。更一般的粒子数规范不变高斯密度矩阵也有同样配方，此时压缩的是其单粒子关联算符，不要求全空间关联算符为投影。高斯性是这里的假设，不能由所期待的谱公式倒推。含 $0$ 或 $1$ 时，Peschel 式 (12) 的矩阵对数不能直接使用；上述因子与连续延拓保留了这些端点。

占据模式上的 $k\times k$ Gram 矩阵 $V_I^\dagger V_I$ 与 $P_I$ 有相同的非零谱，但两者维数可以不同。只掌握前者的谱还不足以列出空间密度矩阵的全部 $2^\ell$ 个特征值：必须把非零压缩谱按重数保留，再用零补足到 $\ell$ 项。熵求和中零模式贡献为零，容易掩盖这一完整谱的维数差别。这些谱关系是已有文献结论；本书尚需建立它们与具体占据载体的对应。

**尚待形式化的空间接口。** 直接目标限定为 $0\le\ell\le N$ 时的连续前缀 $I=\{0,\ldots,\ell-1\}$。令 $a,a'\in\{0,1\}^{\ell}$ 为前缀占据串，$b\in\{0,1\}^{N-\ell}$ 为尾部占据串；$ab$ 表示按原始格点顺序先接 $a$、再接 $b$。用前面定义的同一个行列式振幅写出普通张量部分迹：

$$
\begin{aligned}
\psi_V(a,b)&:=\langle ab\mid\Psi_V\rangle,\\
R_I(a,a')&:=\sum_{b\in\{0,1\}^{N-\ell}}
\psi_V(a,b)\,\overline{\psi_V(a',b)}.
\end{aligned}
$$

这里 $R_I$ 是作用在全部 $2^\ell$ 个前缀占据串上的矩阵，求和遍历被迹去的尾部格点占据串。形式化目标是证明这个具体矩阵具有上面的完整谱多重集与端点安全的熵公式，包括 $\ell=0,N$，并使用全部 $\ell$ 个压缩特征值及其重数。Klich 的式 (7) 使用费米张量积。下文从行列式的行顺序出发，推导它与普通张量部分迹何时给出同一个谱。这里的格点切口按物理空间的顺序取，地址数位切口属于另一种分解。

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

当 $k\le 1$ 时，任意非零振幅的 $c(a,b)$ 都为零。满填充只有一个占据串，重排符号是整体相位。当 $k=N-1$ 时，每个非零振幅都满足 $a=I$ 或 $b=J$，取决于唯一的空穴在哪一侧。两种情况下都有

$$
c(a,b)=c(a,J)+c(I,b)-c(I,J).
$$

因此重排符号分解为保留侧的因子 $(-1)^{c(a,J)}$ 与被迹去侧的因子 $(-1)^{c(I,b)+c(I,J)}$。前者给出对角酉共轭，后者在部分迹中相消。

对于 $2\le k\le N-2$，在四个交替格点之外任选 $k-2$ 个格点，组成固定占据集 $T$。把这些格点的单位向量作为附加轨道，列在原来的两条轨道之后。非零行列式必须占据整个 $T$，并在四个交替格点中占据两个。计算这些行列式时，把 $T$ 的行移到最后并按附加轨道的顺序排列。每个占据的交替格点 $i$ 贡献相位 $(-1)^{|\{s\in T\mid s<i\}|}$。这些相位按两侧分解，因而保留原四点手算例的两个非零特征值 $1/2,1/2$。固定的占据或空置只给普通约化谱添零。压缩 $P_I$ 则是秩 $1+|T\cap I|$ 的投影，全部压缩特征值为 $0$ 或 $1$，故费米乘积谱仍只有一个非零特征值 $1$。

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

::: {.remark #rem-ch39-p2e-tridiagonal-localization title="保留端点残差的三对角局部化（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 将一个整轴向量硬截成有限区段，会在区段两端留下残差；逐渐收窄的正弦权窗可以定量控制这项代价。Chandler-Wilde–Chonchaiya–Lindner，*On spectral inclusion sets and computing the spectra and pseudospectra of bounded linear operators*（[*J. Spectr. Theory* **14**, 719–804](https://doi.org/10.4171/JST/514)，§5.1，推论 5.2、5.4）给出如下工具。设 $A$ 是 $\ell^2(\mathbb{Z})$ 上的有界三对角算子，$M_\pm=\sup_{i\in\mathbb{Z}}|A_{i,i\pm1}|$；对任意非零定义域的有界算子 $B$，记 $\nu(B)=\inf_{\|x\|_2=1}\|Bx\|_2$。对每个整数 $n\ge1$，令 $E_{n,k}$ 为仅支撑在站点 $k+1,\ldots,k+n$ 上的向量空间，则

$$
\begin{aligned}
\inf_{k\in\mathbb{Z}}\nu\!\left(A|_{E_{n,k}}\right)
&\le \nu(A)+\varepsilon_n,\\
\varepsilon_n&=2(M_-+M_+)\sin\frac{\pi}{2(n+1)}.
\end{aligned}
$$

这里仅限制输入支撑，输出仍在整轴上：对应的 $(n+2)\times n$ 矩阵保留两条向外的残差行，不能将它换成丢弃这两行的 $n\times n$ 压缩。该式对位置取下确界；选取实际区段与单位向量时可保留任意正余量。它提供了 $1/n$ 量级的 $\ell^2$ 局部化工具。若沿此整轴路线研究 Tribonacci 有限开链，仍须证明相应整轴模型的零谱前提，并把连同一层邻接站点的实际词区段转植进指定的有限开前缀，核对长度比例与小尺度情形。这些接口在本书中仍未验证；[@thm-ch39-p2e-tribonacci-open-chain-zero-gap] 的有限矩阵证明不依赖它们。
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
**帕里平稳权重、有限逃逸对与回归熵对照卡（`entropy`）**：分栏呈现有向重置链的青色帕里平稳分布权重 $\pi_K$、有限观测竞技场中被品红标出的未区分逃逸对 $E(S)$，以及单独标注依据等级的移位熵 $\log_2\beta_K$ 与诱导回归熵读数；琥珀色标出当前选定的阶数 $K$，红色标签标示分形视界标度开放问题（[@prob-ch39-p2e-fractal-horizon]）。平稳律与逃逸对计数属 `LEAN ✓`，移位熵与阿布拉莫夫公式属 `文献结果`，分形面积律属 `OPEN`。
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
| **8. 平稳核、逃逸对与熵** | 有向重置链帕里平稳律 [`parry_stationary_law`](lean:D5/S3/TotalVariation/ParryResetLaw.parry_stationary_law)（[@thm-ch39-p2e-parry-escape-laws]）、边界柱集不等式 [`parry_boundary_cylinder_bound`](lean:D5/S3/TotalVariation/ParryBoundaryCylinderBound.parry_boundary_cylinder_bound) 与有限逃逸对判据 [`lowersEscape_iff_uniqueCaptureCount_pos`](lean:D5/S3/ConceptDynamics/InformationEscape/ExactRate.lowersEscape_iff_uniqueCaptureCount_pos) | `LEAN ✓`（有限与马尔可夫定律）+ `文献结果`（$\log_2\beta_K$ 与阿布拉莫夫公式，[@rem-ch39-p2e-abramov-literature]）+ `OPEN`（分形视界纠缠标度，[@prob-ch39-p2e-fractal-horizon]） |

当我们在下面的综合实验室中把阶数从 $K = 2$ 拨向 $K = 3$ 再继续上推时，整章自指本体论 $\psi \equiv \psi(\psi)$ 的多切面几何结构便清清楚楚地浮现出来：$K = 2$ 时内部收缩空间还只是一条实轴线段；跨入 $K = 3$ 的瞬间，复共轭根在二维正交平面上旋出三支精确自覆盖、平面边界零测的劳齐分形内窗；而在每一个阶数上，已被 Lean 内核锁定的离散计数、多项式根圆盘、细化超度量、可达纠缠秩矩形与帕里平稳核构成了坚硬的绿色骨架，支撑起周围明确标界的经典文献、数值实验与跨学科几何诠释。穿越这座离散自指沙盘之后，本章后六节将沿 [§39.6](ch39-s06-fivefold-self-reference-spectrum.md)–[§39.9](ch39-s09-unified-arc-forces-and-planck-convergence.md) 贯通五阶自指不动点谱系、主动停机精度与时间长河谱排序、普适比较主频钟慢以及极小圆弧体万力合流，再在 [§39.10](ch39-s10-three-dimensional-field-cap-and-hilbert-ledger.md)–[§39.11](ch39-s11-af-gut-arc-field-grand-unification.md) 确立三维概念场封顶原理、希尔伯特多概念混编账本与极小圆弧场大统一理论（AF-GUT），并在峰顶推开正文的最后一道门扉，步入[终章](coda.md)《在所有的球之外》。

::: {.viz src="pisot-clifford-rauzy-sandtable" height="640"}
**交互实验室 `ORTHO//RAUZY`**：齐肯多夫、皮索与劳齐八概念综合沙盘。自由切换上表对应的八个预设场景、调节阶数 $K$、素数基数 $p$、字长视界与三维观察视角，并直接拖拽物理轴与内部平面上的分解点：实时核对禁 $1^K$ 合法字计数、皮索共轭根单位圆盘收缩、模 $p^k$ 余数树首次区分层级、$K = 3$ 劳齐内窗三支仿射覆盖（及 $K = 4$ 内部坐标采样云）、$\theta^*$ 与 $|\alpha|_{K=3}$ 的数值比对、跨切口可达秩矩形 $[1, R_0] \times [1, R_1]$，以及帕里平稳分布与有限逃逸对账本。绿色依据框严格对应 Lean 已验证定理，文献结论、数值计算、诠释模型与开放问题分别按各自标签独立标示。
:::
