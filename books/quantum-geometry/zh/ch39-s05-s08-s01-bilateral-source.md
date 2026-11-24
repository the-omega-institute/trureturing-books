# O.2.1 双向帕里源、柱集律与混合性 {#sec-ch39-s05-s08-s01-bilateral-source}

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
