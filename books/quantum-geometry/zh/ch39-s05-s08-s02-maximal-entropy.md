# O.2.2 最大熵测度、回返时长与视界问题 {#sec-ch39-s05-s08-s02-maximal-entropy}

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

::: {.theorem #thm-ch39-p2e-parry-ks-maximizer title="双向帕里律是唯一的最大熵测度" lean="D5/S3/TotalVariation/ParryKSMaximizer.bilateral_parry_maximizer"}
设 $K\ge2$，取满足最近零位后缀性质的编码 $e$，以及在每个整数起点都具有 [@thm-ch39-p2e-native-bilateral-parry-law] 所给平稳后缀柱集的概率 $\mu$。记 $p=\operatorname{parryParameter}(K)$。对合法无符号双向路径上每个被左移 $T$ 保持的概率 $\rho$，

$$
h_{\mathrm{KS}}(\rho,T)\le -\log p,\qquad
h_{\mathrm{KS}}(\rho,T)=-\log p\quad\Longleftrightarrow\quad\rho=\mu.
$$
:::

::: proof
熵达到上界时，每段有限历史与下一后缀的联合律都等于该历史的边缘律接一次帕里转移。每个正后缀只有一个可能的前驱，所以平稳性确定初始后缀边缘。该边缘和转移公式确定所有后缀柱集。由于一个关系位为假恰好等价于下一后缀为零，柱集上的相等确定了整个双向关系律。完整证明由 Lean 内核检查。
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

对数为自然对数，单位为每原始步的纳特。$h_{\mathrm{KS}}$ 是所有有限可测分割的熵率的上确界，先视为扩展实数；上式同时证明它在这里是有限值。竞争范围是全部不变 Borel 概率测度，不另假定马尔可夫性、遍历性、生成性质、熵极限或唯一性。有符号扩张 $\nu$ 参与构造 $\mu$，但熵比较的载体始终是无符号空间 $X_K$。推导的所属源文见[双向帕里律的论述](https://github.com/the-omega-institute/trureturing/blob/07e441357b0ee5d7f285cdf7b48876eb9e0e8b64/Blueprint/D5/S3/TotalVariation/ParryBilateralLaw.md)；[@thm-ch39-p2e-parry-ks-entropy] 形式化了上界和达到性。等号判据见 [@thm-ch39-p2e-parry-ks-maximizer]，下文展开证明。

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

所用双向生成定理与整数迭代见 Marcel Morgenstern 的[生成定理](https://github.com/marcmorningstar/lean4-ergodic-theory/blob/040fec2e0ddf4fcba49af9f76c866d295308dd7f/ErgodicTheory/Entropy/GeneratorTheoremTwoSided.lean)及[整数迭代](https://github.com/marcmorningstar/lean4-ergodic-theory/blob/040fec2e0ddf4fcba49af9f76c866d295308dd7f/ErgodicTheory/Krieger/ZIterate.lean)，归属与许可见[熵论依据说明](https://github.com/the-omega-institute/trureturing/blob/07e441357b0ee5d7f285cdf7b48876eb9e0e8b64/Library/Entropy/morgenstern2026ks.md)。这些是库依据，不作为本书新增的冻结定理引用。仅用非负时间的生成条件不能代替这里的双向步骤。

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

第二行只是将 $H_N=H_m+\sum_{i=m}^{N-1}c_i$ 逐项估计，第三行随之取极限。这把熵极限与每个有限历史联系起来，并未把极限存在当作额外假设。有限链式法则、条件熵与极限的依据分别见库中的[分割](https://github.com/the-omega-institute/trureturing/blob/07e441357b0ee5d7f285cdf7b48876eb9e0e8b64/D5/S3/Entropy/KolmogorovSinai/Partition.lean)、[条件化](https://github.com/the-omega-institute/trureturing/blob/07e441357b0ee5d7f285cdf7b48876eb9e0e8b64/D5/S3/Entropy/KolmogorovSinai/GeneratorConditioning.lean)和[熵率](https://github.com/the-omega-institute/trureturing/blob/07e441357b0ee5d7f285cdf7b48876eb9e0e8b64/D5/S3/Entropy/KolmogorovSinai/EntropyRate.lean)；它们的分割条件熵恒等式也不等于下面另列的首次回归公式。

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

::: {.theorem #thm-ch39-p2e-iid-return-prefix title="独立同分布回返时长下的原始窗口" lean="D5/S3/TotalVariation/ParryReturnPrefix.iid_return_prefix"}
设 $K\in\mathbb{N}$，$X_K$ 为每段连续 $K$ 个位置中至少有一个零的双向比特路径空间。设 $\eta$ 为 $X_K$ 上的测度，对 $1\le d\le K$ 取权重 $q_d\in[0,\infty]$。记 $[w]_0$ 为从坐标 $0$ 起固定有限字 $w$ 的柱集。其余坐标在合法性约束下自由，包括坐标 $-1$。假设对每个有限时长列 $d_i\in\{1,\ldots,K\}$，把各块 $1^{d_i-1}0$ 连接得到的柱集的质量为 $\prod_{i<m}q_{d_i}$。空列也包括在内，其柱集是 $X_K$，空积为 $1$。对这样的时长列及任意 $j\in\mathbb{N}$，延长窗口的质量为

$$
\eta\bigl([1^{d_0-1}0\cdots 1^{d_{m-1}-1}0\,1^j]_0\bigr)
=\left(\prod_{i<m}q_{d_i}\right)\left(\sum_{d>j}q_d\right).
$$

最后一项在 $1\le d\le K$ 内求和。
:::

::: proof
完整回返时长确定已经读过的原始步数。在下一个回返起点，前 $j$ 位都为真当且仅当下一次回返时长严格大于 $j$。按这次时长划分窗口，得到不交的可测完整时长柱集。由假设，每个柱集的质量是对应权重的乘积。对下一次时长求和即得公式。完整证明由 Lean 内核检查。
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

**劳齐分形边界维数的有向图导出、一维线性上界与平面稳定子构造（手工推导，用到文献结果）。** 令 $\beta_3>1$ 满足 $\beta_3^3=\beta_3^2+\beta_3+1$，$\alpha$ 为其一个非实共轭根，$r=|\alpha|=\beta_3^{-1/2}$，最后一个等号来自三根之积。写 $\mathcal R=\mathcal R_3$ 表示整块 Tribonacci 劳齐瓦片，用 $U_1=\alpha\mathcal R$、$U_2=1+\alpha^2\mathcal R$、$U_3=1+\alpha+\alpha^3\mathcal R$ 表示三块子瓦片。合法地址禁止连续 $3$ 个 $1$。设 $K_i$ 为已连续读过 $i$ 个 $1$ 时容许的尾和集。对 $K_i\cap(K_j+\delta)$，同时读两边的合法数位 $u,v$，将进位 $\delta$ 更新为 $(\delta+v-u)/\alpha$。每条边的相似比为 $r$。合法尾差的模小于 $4$，所以只保留模不超过 $4$ 的进位，再删去无法无限延伸的状态。内部接缝 $J=U_1\cap(U_2\cup U_3)$ 的初始数位为 $0,1$，初始尾差为 $1/\alpha$。外边界来自与平移格 $\mathbb Z(\alpha-2)+\mathbb Z(\alpha^2-\alpha-2)$ 的非零邻瓦接触。

论文一的 Tribonacci contacts 引理列出了合并两地址互换后的有限图。循环强连通部分的全部简单有向环都经过同一顶点，长度是 $3,3,4$，故该部分是本原的，佩龙根 $\rho$ 满足 $\rho^{-3}+\rho^{-3}+\rho^{-4}=1$，亦即 $\rho^4-2\rho-1=0$。内外接触种子都到达这一部分，深度 $m$ 的路径数为 $\Theta(\rho^m)$。外边界维数的文献结果见 Ito–Kimura（1991）和 Messaoudi（2000）。沿用 Mauldin–Williams（1988）的图导向维数框架。在维数公式 $\rho r^{D_F}=1$ 中，所需的覆盖与下界也可直接由论文一的分离估计得到。不同合法长度 $m$ 前缀的实嵌入互异，最高不同位决定实数大小。其差是非零代数整数，实嵌入的模至多 $\beta_3^m/(\beta_3-1)$，取域范数得到复投影的间距至少 $\sqrt{\beta_3-1}\,r^m>\frac{9}{10}r^m$。每条深度 $m$ 路径给出一个半径至多 $4r^m$ 的柱集；半径 $r^m$ 的球只遇到有界多个有序前缀对，因为两边的前缀中心各自分离，从给定的定向种子出发，路径由按该种子方向记录的有序前缀对确定。按正佩龙权重 $w$ 给每条 $i\to j$ 边分配概率 $w_j/(\rho w_i)$，每个柱集的路径质量至多为常数乘 $\rho^{-m}$。质量分布原理给出豪斯多夫下界，柱集覆盖给出盒维数上界。因此外边界、$\partial U_1$ 与接缝 $J$ 的豪斯多夫维数、上盒维数和下盒维数相同，且

$$
D_F=\dim_H(\partial\mathcal R)=\dim_B(\partial\mathcal R)
=\frac{2\log\rho}{\log\beta_3}\approx 1.09336416,\qquad \rho\approx 1.39533699.
$$

**一维切投区间的上界（手工推导）。** 若点集的最小间距为 $a>0$，长度为 $R$ 的区间至多含 $1+R/a$ 个站点。每点的希尔伯特空间维数至多为 $d_{\mathrm{loc}}<\infty$ 时，区间约化态的熵至多为 $(1+R/a)\log d_{\mathrm{loc}}=O(R)$。由于 $D_F>1$，一维区间上无法实现 $R^{D_F}$ 的双侧熵标度。

**平面切投斑块上的局域贝尔对（手工推导）。** 令 $W_n$ 为长度 $n\ge1$ 的合法字，并取

$$
\begin{aligned}
R_n&=r^{-n},\qquad X_n=\left\{\alpha^{-n}\sum_{j=0}^{n-1}d_j\alpha^j:d\in W_n\right\},\\
A_n&=X_n\cap\alpha^{-n}U_1,\qquad B_n=X_n\setminus A_n .
\end{aligned}
$$

把 $\mathbb Z[\beta_3]$ 中实嵌入在 $[0,1)$ 的元素投到复嵌入平面，得到包含这些斑块的切投点集。斑块间距至少 $\frac{9}{10}$，截断无限地址表明，尺度化瓦片内任一点到 $X_n$ 的距离至多为 $4$。合法字计数从 $1,2,4$ 开始，满足 Tribonacci 递推，故 $\beta_3^n\le |X_n|\le 2\beta_3^n$。在论文一的接触图中，把合并的地址互换展开为两个方向，并用每条边记录的互换跟踪原始地址的顺序。只保留第一个定向数位为 $0$ 的边，反复删除无后继的顶点，便删尽整个定向图。交换地址后，第二个定向数位也满足同样的结论。因此末尾补零的有限前缀不在接缝上，$A_n$ 恰是首位为 $0$ 的点。连接 $A_n,B_n$ 中距离至多 $8$ 的点。从定向接缝种子出发，沿深度 $n-1$ 的路径按种子方向保留有序前缀对，得到 $\Theta(\rho^{n-1})$ 个不同的跨切口前缀对，两端各距同一个接触点至多 $4$。均匀间距将图的度数限制在常数 $\Delta$ 内，每条极大匹配的边至多覆盖 $2\Delta-1$ 条相邻边，所以极大匹配的大小 $m_n$ 有同阶下界。反过来，跨边的 $A_n$ 端点在距离 $8$ 以内必遇到 $\alpha^{-n}\partial U_1$；该边界可用 $O(\rho^{n-1})$ 个半径 $4$ 的球覆盖，把半径扩大到 $12$ 后每球仍只含有界多个站点。这给出 $m_n=O(\rho^{n-1})$。

每点放一个量子比特，每条匹配边放一个态 $\Phi=(\lvert00\rangle+\lvert11\rangle)/\sqrt2$，未配对点放 $\lvert0\rangle$。在匹配边上取 $I-\lvert\Phi\rangle\langle\Phi\rvert$，在未配对点取 $I-\lvert0\rangle\langle0\rvert$。这些投影项的支撑互不相交，因而对易。所得哈密顿量具有唯一的张量积稳定子基态、精确谱隙 $1$ 与相互作用距离上界 $8$。每条跨边贝尔对贡献 $\log 2$，故存在与 $n$ 无关的正数 $c_-,c_+$，使 $c_-R_n^{D_F}\le S(\rho_{A_n})=m_n\log 2\le c_+R_n^{D_F}$，因为 $\rho^n=R_n^{D_F}$。此处的区域是尺度化子瓦片，直径与 $R_n$ 同阶。几何接触与匹配计数见论文一的 *Tribonacci contacts* 与 *A planar local Bell-pair construction*，投影哈密顿量由这组互不相交的贝尔对直接给出。

::: {.problem #prob-ch39-p2e-fractal-horizon title="开放问题：皮索切投量子多体系统的劳齐分形视界纠缠标度"}
**仍待解决（`OPEN`）。** 上文给出一维区间的 $O(R_n)$ 上界，并在有限 Tribonacci 平面斑块的子瓦片切口上用局域对易投影哈密顿量实现 $S(\rho_{A_n})=\Theta(R_n^{D_F})$。逐站点旋转可产生同样的纠缠与谱隙，并使基态超出稳定子态类。加入湮灭基态的非对易局域正项也可保留基态与正谱隙。对于平移不变或全格统一的局域有隙哈密顿量，若相互作用规则独立于指定切口及其匹配，何时会出现 $R_n^{D_F}$ 的主项或分形次主项？实际 Tribonacci 跃迁链在指定填充下的 Slater 态有怎样的空间纠缠标度？一般的 $K\ge4$ 非各向同性皮索接受窗能否产生这类标度？在指定空间切口后，哪些谱隙与局域性条件是余维一面积律失效的充要判据？
:::
