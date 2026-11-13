# 可分复 Hilbert 空间投影赋值：统一泛函、尾项与原生密度的采用规格

本规格供指定正文主笔核对完整应用的数学接口、来源与采用边界。从原始投影读数到同一组正归一连续复线性泛函、有限秩尾项与正原生迹类密度的完整联合结论，已有整体 Lean 内核核验的应用证据，包含解析迹一、每个有界算子的原生迹配对及仅凭原始投影读数的密度唯一性。它是既有结果的应用组合，没有保留新的 Lean 声明，应用没有独立的 theorem Describe 或公开原始输入 GID。中英文正文采用尚未完成。本规格只给工程采用接口与推导，不提供替换章节段落。

## 1. 固定来源与有限声明的关系

本规格的源码基准为 trureturing 不可变提交 `4367dc9542d65524f3c2a9b5055be18f85ca8d7e`。完整应用的两个对应来源是：

- [Blueprint：Application to a countably additive projection measure](https://github.com/the-omega-institute/trureturing/blob/4367dc9542d65524f3c2a9b5055be18f85ca8d7e/Blueprint/D5/S3/Quantum/GleasonComplexRepresentation.md#application-to-a-countably-additive-projection-measure)。
- [拥有该应用的 Scribe 定义](https://github.com/the-omega-institute/trureturing/blob/4367dc9542d65524f3c2a9b5055be18f85ca8d7e/Blueprint/D5/S3/Quantum/GleasonComplexRepresentation.scribe.cs)：`GleasonComplexRepresentationDocument.Create` 中同名 `DocumentBlock.Section`；它在有限定理的 `Describe.Lean` 之外，未增加另一个声明句柄。

同提交的[有限 Lean 源码](https://github.com/the-omega-institute/trureturing/blob/4367dc9542d65524f3c2a9b5055be18f85ca8d7e/D5/S3/Quantum/GleasonComplexRepresentation.lean#L899)仍声明 `Gleason.ProjectionPackage.gleason_representation`：对有限复矩阵、`N ≥ 3`、非负归一且二元正交可加的 `ProjectionPackage N`，存在唯一正半定迹一矩阵，代表全部星投影读数。该声明不是可分无限维原始输入定理。有限签名、完整 package 字段、唯一性、归属与全部有限采用位置，沿用[有限投影规格](spec-batch-gleason-projections.md)，此处只补应用所需的接口。

有限声明的[冻结记录](https://github.com/the-omega-institute/trureturing/blob/4367dc9542d65524f3c2a9b5055be18f85ca8d7e/Golden/Frozen/state/D5/S3/Quantum/GleasonComplexRepresentation.lean.json)仍含名称键 `ns(ns(ns(n0,7:Gleason),17:ProjectionPackage),22:gleason_representation)`、种类 `theorem`，模块状态 `statement_id` 为 `sha256:dd9874dc790ed4367402ce8fce42837ee0c9f1b2ff1ccb61b47c1769440a4326`。模块状态身份不能冒充新增应用的声明 ID。

[书库锁文件](../../trureturing.lock.json)保持在 `e526f0f5e3a1e84b05f05c0c009eab920bc3a06f`，共 549 条声明引用；尚未引用上述有限声明或下述向量级数供应声明，更没有覆盖本应用的无限维原始输入 GID。完整联合核验的应用证据、固定源码中的应用说明、既有冻结供应声明、锁内已采用声明各有不同的采用权限。不得给本应用附加 `lean` 属性或沿用有限 GID 覆盖其无限维范围。

## 2. 原始输入与精确可数法则

令 $H$ 为完备、可分的复内积空间，含一个正交单位三元组：存在 $e_0,e_1,e_2$，满足 $\langle e_i,e_j\rangle=\delta_{ij}$。这排除二维及更低维，包含所有满足条件的有限维 $H$；不要求 $H$ 无限维。令 $\mathrm{Op}=\mathcal B(H)$ 为有界复线性算子代数（Lean 类型 `H →L[ℂ] H`），单位为 $I$，乘法为算子复合。星投影指 $P^*=P$ 且 $P^2=P$，有限秩指其实际值域为有限维复子空间。

输入为总函数 $p:\mathrm{Op}\to\mathbb R$，以及以下全部条件：

1. 对每个星投影 $P$，$p(P)\ge0$。
2. $p(I)=1$。
3. 对每个星投影 $P$ 及每个星投影序列 $(Q_i)_{i\in\mathbb N}$，若 $Q_iQ_j=0$ 对所有 $i\ne j$ 成立，且

   $$
   \forall x\in H,\qquad
   \lim_{n\to\infty}\sum_{i<n}Q_i x=Px
   \quad\text{（在 $H$ 的范数拓扑中）},
   $$

   则必须有实数域中的

   $$
   \operatorname{HasSum}\bigl(i\mapsto p(Q_i),\ p(P)\bigr).
   $$

第三项的前提是向量逐点的强算子求和；不是算子范数下的级数收敛，不是只有某一固定基上的归一化，也不是只对有限秩目标 $P$ 要求可加。结论的 `HasSum` 是标量可求和断言，不能用未经求和性证明的形式 `tsum` 等式替代。

只有投影处的值受约束。原始 $p$ 在非投影效应、自伴非投影及一般算子上的值均自由；不输入连续性、可测性、线性、效应可加性，也不输入已给定的泛函、截断序列、密度、正规性或有限秩紧性（tightness）。非语境的同一投影同一读数、全部投影的定义域，以及上述复 Hilbert 结构均是数学前提，不能从物理观察或“两两公平”叙事中省略或声称已经推导出来。

## 3. 应用给出的同一组对象

在第 2 节完整原始输入下，应用同时给出一个正的连续复线性泛函 $\phi:\mathrm{Op}\to\mathbb C$、一个序列 $E:\mathbb N\to\mathrm{Op}$、一个算子 $\rho:\mathrm{Op}$ 及原生证据 $h_\rho:\operatorname{IsTraceClass}(\rho)$，满足

$$
\begin{aligned}
&\phi(I)=1,\qquad \|\phi\|=1,\qquad
  A\ge0\ \Longrightarrow\ \phi(A)\ge0,\\
&\forall P,\quad P^*=P,\ P^2=P\ \Longrightarrow\
  \phi(P)=(p(P):\mathbb C),\\
&\forall n,\quad E_n^*=E_n,\quad E_n^2=E_n,\quad
  \dim_{\mathbb C}\operatorname{range}(E_n)<\infty,\\
&\forall x\in H,\quad E_nx\longrightarrow x,\qquad
  \operatorname{Re}\phi(I-E_n)\longrightarrow0.
\end{aligned}
$$

并且同一个 $\rho$ 满足

$$
\begin{aligned}
&0\le\rho,\qquad \operatorname{trace}(\rho,h_\rho)=1\quad\text{（复数等式）},\\
&\forall A\in\mathrm{Op},\quad
  \exists h_{\rho A}:\operatorname{IsTraceClass}(\rho A),\quad
  \phi(A)=\operatorname{trace}(\rho A,h_{\rho A}),\\
&\forall P\text{ 为星投影},\quad
  \exists h_{\rho P}:\operatorname{IsTraceClass}(\rho P),\quad
  p(P)=\operatorname{Re}\operatorname{trace}(\rho P,h_{\rho P}).
\end{aligned}
$$

密度唯一性只用原始投影读数：对每个 $\sigma\in\mathrm{Op}$ 和 $h_\sigma:\operatorname{IsTraceClass}(\sigma)$，若 $0\le\sigma$、$\operatorname{trace}(\sigma,h_\sigma)=1$，并且对所有星投影 $P$ 都存在原生乘积证据 $h_{\sigma P}$ 使 $p(P)=\operatorname{Re}\operatorname{trace}(\sigma P,h_{\sigma P})$，则 $\sigma=\rho$。竞争者不以同一 $\phi$ 或全算子迹配对为前提；所需乘积证据由原生迹类理想供应项提供。

正性中的复数非负采用实轴非负序。全部结论属于**同一组** $\phi,E,\rho$，不能按投影或截断重新选泛函，亦不能为全算子配对另选密度。$E_n$ 来自单位算子的同一次基展开的前缀和，因而有限秩且递增。其强收敛及泛函尾质量趋零没有被加强为算子范数收敛或原生迹范数收敛。$\rho$ 的唯一性不唯一化辅助向量族、序列 $E$ 或原始 $p$ 的非投影值。第 6 节给出连接原生接口的构造。

## 4. 来源中的推导接口

以下是固定 Blueprint/Scribe 的原始输入到同一 $\phi,E$ 的推导对应，供采用时核对量词与依赖；它属于完整联合应用，不新增公开形式化声明。

**原始法则的有限后果。** 零序列给出 $p(0)=0$；序列 $P,Q,0,\ldots$ 给出二元正交可加。对互补投影得到 $p(P)+p(I-P)=1$，故所有投影的读数在 $[0,1]$。这些后果不使用 $p$ 的连续性。

**有质量的有限角。** 任取有限列表的有限秩星投影 $P_i$、实系数 $a_i$ 与 $a_0$；列表可空，$P_i$ 无须交换。取各值域与指定单位三元组张成的有限维空间 $U$，令 $N=\dim_{\mathbb C}U\ge3$。正交坐标等距嵌入 $J:\mathbb C^N\to H$ 给出 $F(A)=JAJ^*$、支撑投影 $E=F(I_N)$。每个 $P_i$ 均满足 $EP_i=P_iE=P_i$，故 $M_i=J^*P_iJ$ 确实是星投影。这里仅压缩已被 $E$ 支撑的投影；一般投影的任意压缩未必幂等。

令 $q(A)=p(F(A))$、$m=q(I_N)=p(E)\in[0,1]$。当 $m>0$ 时，对归一化的 $q/m$ 调用有限 `Gleason.ProjectionPackage.gleason_representation`，再乘回 $m$，得到正半定有限矩阵 $\rho_U$，满足 $\operatorname{Tr}\rho_U=m$，且全部矩阵星投影上 $q(A)=\operatorname{Re}\operatorname{Tr}(\rho_U A)$。当 $m=0$ 时，对 $A,I_N-A$ 用非负与可加得 $q(A)=0$，直接取 $\rho_U=0$，不得除以零。$\rho_U$ 是估计中的局部矩阵，不同于第 3 节作用在 $H$ 上的环境算子 $\rho$。

**包含补质量的范数界。** 令 $T=a_0I+\sum_i a_iP_i$、$B=a_0I_N+\sum_i a_iM_i=J^*TJ$。有 $\|B\|\le\|T\|$ 与

$$
\operatorname{Re}\operatorname{Tr}(B\rho_U)=a_0m+\sum_i a_ip(P_i).
$$

[`UniformVarianceTraceBound.re_trace_mul_le`](https://github.com/the-omega-institute/trureturing/blob/4367dc9542d65524f3c2a9b5055be18f85ca8d7e/D5/S3/Quantum/Matrix/UniformVarianceTraceBound.lean#L33) 对 $B$ 和 $-B$ 各用一次，再用 [`FiniteTraceDistance.traceNorm_of_posSemidef`](https://github.com/the-omega-institute/trureturing/blob/4367dc9542d65524f3c2a9b5055be18f85ca8d7e/D5/S3/Quantum/Foundation/FiniteTraceDistance.lean#L447) 的实部等式，得

$$
\left|a_0m+\sum_i a_ip(P_i)\right|\le\|T\|m.
$$

当 $E\ne I$ 时，$T(I-E)=a_0(I-E)$，除以严格正的 $\|I-E\|$ 得 $|a_0|\le\|T\|$。加入补质量 $a_0(1-m)$ 的界后，得到完整的

$$
\left|a_0+\sum_i a_ip(P_i)\right|
\le \left\|a_0I+\sum_i a_iP_i\right\|.
$$

当 $E=I$ 时 $m=1$，直接使用有限角的界，不能再除以零范数。这保留零质量角、全支撑角、空列表和有限维环境的情形。

**下降为实泛函，再取正延拓。** 令 $S$ 为所有有限秩星投影的集合，$X=\operatorname{span}_{\mathbb R}(\{I\}\cup S)$。在 $\mathbb R\times(S\to_0\mathbb R)$ 的形式组合上定义

$$
g(a_0,c)=a_0I+\sum_Pc(P)P,\qquad
r(a_0,c)=a_0+\sum_Pc(P)p(P).
$$

上述不等式使 $g(d)=0$ 蕴涵 $r(d)=0$，故 $r$ 与组合表示无关，下降为 $X$ 上连续实线性 $f$；源码叙述指定所钉 `LinearMap.compLeftInverse` 接口实现此下降，`LinearMap.compLeftInverse_apply_of_bdd` 给出各形式组合上的取值。$f(I)=1$、$f(P)=p(P)$ 对每个 $P\in S$ 成立，且 $\|f\|\le1$。三元组保证 $H$ 非平凡，$\|I\|=1$，故 $\|f\|=1$。

$X$ 的元素全自伴。[`CentralPositiveFunctionalExtension.exists_positive_extensions_norm_additive`](https://github.com/the-omega-institute/trureturing/blob/4367dc9542d65524f3c2a9b5055be18f85ca8d7e/D5/S3/Quantum/Algebra/CentralPositiveFunctionalExtension.lean#L86) 对自伴实子空间 $X$ 与 $f$ 给出两个正复泛函 $\psi_+,\psi_-$：实部之差在 $X$ 上等于 $f$，单位处实部之和为 $\|f\|=1$。单位处之差亦为 $1$，正性迫使 $\operatorname{Re}\psi_-(I)=0$、$\operatorname{Re}\psi_+(I)=1$。所钉 `PositiveContinuousLinearMap.ofReal_opNorm_eq_map_one` 给出 $\|\psi_-\|=0$，故负项消失。取 $\phi=\psi_+$，正泛函在自伴元上实值，得到单位归一、范数一和全部有限秩投影上的复等式。

**同一泛函覆盖全部投影。** 对任意星投影 $P$ 的闭值域使用可数正交基。固定来源为 [`HilbertPathFundamentalTheorem.lean`](https://github.com/the-omega-institute/trureturing/blob/4367dc9542d65524f3c2a9b5055be18f85ca8d7e/D5/S3/Observer/HilbertGeometry/HilbertPathFundamentalTheorem.lean#L229) 内的私有 `CountableBasisPort.exists_countable_hilbertBasis`，其参数覆盖完备可分的实或复 Hilbert 空间，应用通过该源模块的合法 `open private` 使用它。这里只借用复空间情形的基存在性；私有供应项不是可供书稿直接挂接的公开 GID。

将基指标注入 $\mathbb N$，把对应秩一投影在注入像外补零，得到两两正交的有限秩 $Q_i$。`HilbertBasis.hasSum_orthogonalProjectionOnto` 连同 `hasSum_extend_zero` 给出每个 $x$ 上 $\operatorname{HasSum}(i\mapsto Q_ix,Px)$。注入加补零同时处理有限基与空基（$P=0$），不假定指标与全体自然数等势。

设 $S_n=\sum_{i<n}Q_i$。向量求和及和的唯一性给出 $Q_iP=Q_i$，于是 $P-S_n$ 是星投影。正性和有限秩一致性给出

$$
\sum_{i<n}p(Q_i)=\operatorname{Re}\phi(S_n)\le\operatorname{Re}\phi(P).
$$

原始可数法则使左边趋于 $p(P)$。对 $I-P$ 重复此论证，结合互补归一及 $\phi(I)=1$，得到反向不等式。正泛函在投影上虚部为零，故这个已经选定的 $\phi$ 满足全部投影上的 $\phi(P)=(p(P):\mathbb C)$。

**同一泛函的尾项。** 在 $P=I$ 的基展开中取 $E_n=\sum_{i<n}Q_i$。它们是有限秩星投影，向量逐点趋于 $I$，并且

$$
\operatorname{Re}\phi(I-E_n)
=1-\sum_{i<n}p(Q_i)\longrightarrow0.
$$

有限维基可注入自然数并补零，因而该序列最终等于 $I$；一般投影的空基情形也已保留。无限维时尾质量趋零不蕴涵 $\|I-E_n\|\to0$。应用从原始读数推出 tightness，而没有把它作为隐藏输入。

## 5. 已冻结的向量级数供应：精确 telescope

该供应声明的身份为：

| 项目 | 精确值 |
| --- | --- |
| 固定提交 | `4367dc9542d65524f3c2a9b5055be18f85ca8d7e` |
| 模块 ID | `D5/S3/Quantum/Analysis/TightStateVectorSeries` |
| Lean 全名 | `D5.S3.Quantum.Analysis.TightStateVectorSeries.positive_functional_vector_series_of_finite_rank_tightness` |
| 冻结路径 | `Golden/Frozen/state/D5/S3/Quantum/Analysis/TightStateVectorSeries.lean.json` |
| 冻结名称键 | `ns(ns(ns(ns(ns(ns(n0,2:D5),2:S3),7:Quantum),8:Analysis),22:TightStateVectorSeries),58:positive_functional_vector_series_of_finite_rank_tightness)` |
| 种类 | `theorem` |
| 模块状态 `statement_id` | `sha256:f7c78106ec5a6bea403536dc0fe58df28263d684af4e8e99da7cc4af551e3ce3` |

该 `statement_id` 标识模块冻结状态，不是完整应用或单条定理签名的散列。

对应[固定 Lean 源码](https://github.com/the-omega-institute/trureturing/blob/4367dc9542d65524f3c2a9b5055be18f85ca8d7e/D5/S3/Quantum/Analysis/TightStateVectorSeries.lean#L23)与[冻结记录](https://github.com/the-omega-institute/trureturing/blob/4367dc9542d65524f3c2a9b5055be18f85ca8d7e/Golden/Frozen/state/D5/S3/Quantum/Analysis/TightStateVectorSeries.lean.json)。以下完整保留所有类型类、参数顺序和结论，只省略证明体：

```lean
open Filter Topology InnerProductSpace
open scoped BigOperators ComplexOrder

namespace D5.S3.Quantum.Analysis.TightStateVectorSeries

theorem positive_functional_vector_series_of_finite_rank_tightness
    {H : Type*}
    [NormedAddCommGroup H]
    [InnerProductSpace ℂ H]
    [CompleteSpace H]
    (φ : (H →L[ℂ] H) →ₚ[ℂ] ℂ)
    (hφone : φ 1 = 1)
    (E : ℕ → (H →L[ℂ] H))
    (hE : ∀ j, IsStarProjection (E j))
    (hEfinite : ∀ j, FiniteDimensional ℂ (E j).range)
    (htight :
      Tendsto (fun j => (φ (1 - E j)).re)
        atTop (𝓝 0)) :
    ∃ u : ℕ → H,
      HasSum (fun k => ‖u k‖ ^ 2) 1 ∧
      ∀ S : H →L[ℂ] H,
        HasSum
          (fun k => inner ℂ (u k) (S (u k)))
          (φ S)

end D5.S3.Quantum.Analysis.TightStateVectorSeries
```

`→ₚ[ℂ]` 是已打包的正复线性映射；它不是原始总函数 $p$，也没有把所有连续泛函自动视作正泛函。应用构造的正泛函连同其底层正线性映射、相同单位归一等式和相同 $E_n$、有限值域与尾项证据，正好提供该 telescope 的实参。该供应本身无可分性、正交三元组、$E_n$ 递增或 $E_n\to I$ 强收敛的参数；它要求的是已给定泛函的有限秩 tightness。

结论给出**同一组** $u_k$，满足实数质量 `HasSum` 为 $1$，以及对每个有界复线性算子 $A$ 的复级数

$$
\operatorname{HasSum}\bigl(k\mapsto\langle u_k,A u_k\rangle_{\mathbb C},\ \phi(A)\bigr).
$$

内积在第二变量复线性，方向是 $\langle u_k,A u_k\rangle$。这既非仅秩一或投影读数，也不要求 $A$ 正或自伴。供应证明使用正泛函压缩误差界、有限值域分解及可数非零支撑补零；证明体中的局部算子不扩充公开结论。其公开 telescope 不输出原生 `IsTraceClass ρ`、原生迹一、乘积迹类或从投影读数唯一识别原生密度算子的结论；这些结论由第 6 节的后续组合步骤给出，并与前述输入共同核验。

| 层次 | 输入与可使用结果 | 采用界限 |
| --- | --- | --- |
| 有限冻结定理 | 有限 `ProjectionPackage N`、$N\ge3$；唯一有限密度矩阵 | 第 4 节有质量有限角的供应；无限维环境没有变成有限矩阵。 |
| 完整联合应用 | 第 2 节原始 $p$；同一 $\phi,E,\rho$，全部投影一致性、尾项、原生迹一、全算子配对和投影读数唯一性 | 已有完整联合核验证据；没有独立公开声明、theorem Describe 或 GID。 |
| 冻结向量级数供应 | 已给定的正归一 $\phi$ 与有限秩 tightness；一组质量一向量代表全部有界算子 | 只输出向量族及 `HasSum`；完整原生结论还使用下节各供应项，不能归给该单条声明。 |
| 书稿采用 | 精确条件、来源、文献环境与双语对齐 | 尚待指定正文主笔采用；工程规格与联合核验证据不自动改变书稿环境或锁内引用。 |

## 6. 原生密度、解析迹与投影唯一性的构造

本节接第 5 节同一向量族 $u:\mathbb N\to H$，保持 $\operatorname{HasSum}(k\mapsto\|u_k\|^2,1)$ 及对每个 $A$ 的复 `HasSum`。这些步骤与第 2–4 节的原始输入构造已在一个完整联合结论中共同核验；这里呈现其数学组合和精确接口，不重新命名为公开定理。

下述 Mathlib 接口均属于该提交 [`lake-manifest.json`](https://github.com/the-omega-institute/trureturing/blob/4367dc9542d65524f3c2a9b5055be18f85ca8d7e/lake-manifest.json) 所钉的 `56a005855ea17e0b0958f73ec801ae140b0a1679`。路径以所钉依赖的模块名记载，不把当前其他版本的同名接口混入应用。

**从向量族到正算子。** 内积第一变量共轭线性，记

$$
R(w,v)=\operatorname{rankOne}_{\mathbb C}(w,v),\qquad
R(w,v)x=\langle v,x\rangle w,\qquad
B(v,w)=\phi(R(w,v)).
$$

由 $\|\phi\|=1$ 与 $\|R(w,v)\|\le\|w\|\|v\|$，有 $|B(v,w)|\le\|v\|\|w\|$。所钉 `Mathlib.Analysis.InnerProductSpace.Dual` 中的 `InnerProductSpace.continuousLinearMapOfBilin` 将此有界半双线性型变为 $\rho\in\mathrm{Op}$；`continuousLinearMapOfBilin_apply` 给出 $\langle\rho v,w\rangle=B(v,w)$。向量级数在 $R(w,v)$ 上给出

$$
B(v,w)=\sum_k\langle v,u_k\rangle\langle u_k,w\rangle,
\qquad
|\langle v,u_k\rangle\langle u_k,w\rangle|
\le\|v\|\|w\|\|u_k\|^2.
$$

故级数绝对可和，$B$ 为 Hermitian 型，$\rho$ 自伴。由此也有 $\langle v,\rho w\rangle=\sum_k\langle v,u_k\rangle\langle u_k,w\rangle$，特别是 $\langle x,\rho x\rangle=\sum_k|\langle u_k,x\rangle|^2\ge0$，给出真正的正算子 $0\le\rho$。此处的 $\rho$ 作用于 $H$，不是第 4 节的有限角矩阵 $\rho_U$。

**原生谓词与解析迹一。** 实际定义是 [`Analysis/TraceClass/Basic.lean`](https://github.com/the-omega-institute/trureturing/blob/4367dc9542d65524f3c2a9b5055be18f85ca8d7e/D5/S3/Quantum/Analysis/TraceClass/Basic.lean#L114) 中**根命名空间**的 `IsTraceClass` 与 `trace`。对 $T:\mathrm{Op}$，其定义为

$$
\operatorname{IsTraceClass}(T)\ \Longleftrightarrow\
\exists(w:\operatorname{Set}H)\,(b:\operatorname{HilbertBasis}(w,\mathbb C,H)),\quad
\operatorname{Summable}\bigl(i\mapsto
\operatorname{Re}\langle b_i,(\operatorname{CFC.abs}T)b_i\rangle\bigr).
$$

[`trace T hT`](https://github.com/the-omega-institute/trureturing/blob/4367dc9542d65524f3c2a9b5055be18f85ca8d7e/D5/S3/Quantum/Analysis/TraceClass/Basic.lean#L296) 是证据所选基上的复对角和。用前述可数基供应项为 $H$ 选取基 $b$，其指标可以有限。正性使 `CFC.abs_of_nonneg` 化简 $\operatorname{CFC.abs}\rho=\rho$，故

$$
d_i:=\operatorname{Re}\langle b_i,\rho b_i\rangle
=\sum_k|\langle u_k,b_i\rangle|^2\ge0.
$$

对每个有限基指标集 $F$，Parseval 和非负性给出 $\sum_{i\in F}d_i\le\sum_k\|u_k\|^2=1$。所钉 `summable_of_sum_le` 得到原生谓词所需的实可求和性，从而给出 $h_\rho:\operatorname{IsTraceClass}(\rho)$。同一 Basic 源码的 [`hasSum_norm_sq_inner_basis`](https://github.com/the-omega-institute/trureturing/blob/4367dc9542d65524f3c2a9b5055be18f85ca8d7e/D5/S3/Quantum/Analysis/TraceClass/Basic.lean#L129) 具有精确结论 $\operatorname{HasSum}(i\mapsto|\langle b_i,y\rangle|^2,\|y\|^2)$。结合内积共轭对称及 `summable_prod_of_nonneg`，非负双重和的总质量为

$$
\sum_i\sum_k|\langle u_k,b_i\rangle|^2
=\sum_k\sum_i|\langle u_k,b_i\rangle|^2
=\sum_k\|u_k\|^2=1.
$$

$\rho$ 的对角项为实数，故复对角和亦为复数 $1$，得到原生解析迹 $\operatorname{trace}(\rho,h_\rho)=1$。这使用真实的基对角可求和接口，不把 $\sum_k\|u_k\|^2$ 另定义成一个代理“迹”。

**真实乘积的迹类证据及任意算子的基公式。** 本节所用供应项均只要求完备复 Hilbert 空间上的有界算子；以下两项不要求算子或乘积正、自伴或有限秩。

| 固定来源与供应项 | 精确契约与本应用实参 |
| --- | --- |
| [`TraceClass/GeneralProduct.lean`](https://github.com/the-omega-institute/trureturing/blob/4367dc9542d65524f3c2a9b5055be18f85ca8d7e/D5/S3/Quantum/Analysis/TraceClass/GeneralProduct.lean)：`isTraceClass_mul_mul` | `{A B T : H →L[ℂ] H} (hT : IsTraceClass T) : IsTraceClass (A * T * B)`。取 `(A := 1) (B := A) hρ`，化简即得实际复合 $\rho A$ 的 $h_{\rho A}$；对竞争者同样取 `(A := 1) (B := P) hσ` 得 $h_{\sigma P}$。 |
| [`TraceClass/GeneralIdeal.lean`](https://github.com/the-omega-institute/trureturing/blob/4367dc9542d65524f3c2a9b5055be18f85ca8d7e/D5/S3/Quantum/Analysis/TraceClass/GeneralIdeal.lean)：`trace_eq_of_hilbertBasis` | `{T : H →L[ℂ] H} (hT : IsTraceClass T) {w : Set H} (b : HilbertBasis w ℂ H) : trace T hT = ∑' i : w, ⟪b i, T (b i)⟫_ℂ`。适用于任意迹类 $T$，包括非自伴 $\rho A$；只用正算子迹公式不足以完成全算子配对。 |

**绝对双重和与全算子复配对。** 任取 $A\in\mathrm{Op}$，核公式给出

$$
\langle b_i,\rho(A b_i)\rangle
=\sum_k\langle b_i,u_k\rangle\langle u_k,A b_i\rangle.
$$

令 $c_{ki}=\langle b_i,u_k\rangle\langle u_k,A b_i\rangle$。用 $\langle u_k,A b_i\rangle=\langle A^*u_k,b_i\rangle$ 重写后，[`TraceClass/HilbertSchmidt.lean`](https://github.com/the-omega-institute/trureturing/blob/4367dc9542d65524f3c2a9b5055be18f85ca8d7e/D5/S3/Quantum/Analysis/TraceClass/HilbertSchmidt.lean#L290) 的 `HilbertSchmidt.summable_norm_mul_of_square_sums` 对两个非负实系数族、各自的平方可和性给出乘积可和；平方可和性由上述 Parseval `HasSum` 供给。同文件的 `HilbertSchmidt.tsum_norm_inner_mul_inner_le` 对任意基 $b$ 与 $x,y$ 给出 $\sum_i|\langle x,b_i\rangle||\langle b_i,y\rangle|\le\|x\|\|y\|$，在此取 $x=A^*u_k$、$y=u_k$，得到

$$
\sum_i|c_{ki}|
\le\|A^*u_k\|\|u_k\|
\le\|A\|\|u_k\|^2,\qquad
\sum_k\|A\|\|u_k\|^2=\|A\|.
$$

对项的范数族使用 `summable_prod_of_nonneg`，先取得两个指标上的绝对可和，再用 `Summable.tsum_comm` 交换复数级数；仅有逐点收敛不能支持换序。所钉 `Mathlib.Analysis.InnerProductSpace.l2Space` 的 `HilbertBasis.hasSum_inner_mul_inner` 将内层基和算为 $\langle A^*u_k,u_k\rangle=\langle u_k,A u_k\rangle$，于是

$$
\begin{aligned}
\operatorname{trace}(\rho A,h_{\rho A})
&=\sum_i\sum_k\langle b_i,u_k\rangle\langle u_k,A b_i\rangle\\
&=\sum_k\langle u_k,A u_k\rangle=\phi(A).
\end{aligned}
$$

这是对每个有界复线性 $A$ 的复等式，且配对的是已构造的同一 $\phi$。取 $A=I$ 与解析迹一一致；取 $A=P$ 并用原始投影一致性得 $p(P)=\operatorname{Re}\operatorname{trace}(\rho P,h_{\rho P})$。原始非投影值 $p(A)$ 仍不受此等式约束。

**只从投影读数识别密度。** 设竞争者 $\sigma,h_\sigma$ 满足第 3 节的正性、原生迹一及全部原始投影读数条件。上述乘积理想公式自动提供读数所需的 $h_{\sigma P}$。对任意原生迹类 $T$ 及单位向量 $e$，同一个一般迹公式与 `HilbertBasis.hasSum_inner_mul_inner` 给出实际秩一配对

$$
\operatorname{trace}(T R(e,e),h_{T R})
=\sum_i\langle e,b_i\rangle\langle b_i,T e\rangle
=\langle e,T e\rangle.
$$

$R(e,e)$ 是星投影，故 $\operatorname{Re}\langle e,\sigma e\rangle= p(R(e,e))=\operatorname{Re}\langle e,\rho e\rangle$。正性使两边二次型均为实数，从而得到复数等式。对 $x=0$，两个二次型都为零。对 $x\ne0$，取 $e=(\|x\|^{-1}:\mathbb C)\mathbin{\cdot}x$，则 $\|e\|=1$ 且 $x=(\|x\|:\mathbb C)\mathbin{\cdot}e$。半双线性与正性给出

$$
\langle\sigma x,x\rangle
=(\|x\|^2:\mathbb C)(p(R(e,e)):\mathbb C)
=\langle\rho x,x\rangle.
$$

正性也保证上述两种对角内积方向一致。所钉 `Mathlib.Analysis.InnerProductSpace.LinearMap` 的 `ext_inner_map` 对 `σ.toLinearMap` 与 `ρ.toLinearMap` 将所有向量上的复二次型相等转为 $\sigma=\rho$。这保留零向量与非零归一化的分支，没有给竞争者增加同一 $\phi$ 或全算子配对前提。

$u$ 是不必唯一的辅助向量族；唯一的是代表全部原始投影读数的正原生迹类迹一 $\rho$。有限维环境、有限或空值域基、零向量、零质量角和全支撑角均保留。完整联合应用已有核验证据，与公开声明冻结及正文采用仍是不同事项。

## 7. 书稿落点与采用限制

下列为已有稳定环境，均按中英文原稿核对。全书有限版本的摘要和交叉引用清单见[有限规格第 5 节](spec-batch-gleason-projections.md#现有书稿对应与采用范围)，此处仅列本应用直接涉及的位置。

| 现有位置 | 稳定相对链接 | 正文采用必须保留的边界 |
| --- | --- | --- |
| 第 2 章 `rem-gleason-literature` | [中](../../books/quantum-geometry/zh/ch02-born-rule.md#rem-gleason-literature) / [英](../../books/quantum-geometry/en/ch02-born-rule.md#rem-gleason-literature) | 现有注记同时含有限/无限投影 Gleason、二维例外与无限维 Busch。有限复结果须单独对应有限声明；原生密度与唯一性已有完整应用核验证据，但当前正文环境仍保持文献归属，须由指定主笔按第 2–6 节条件采用。本应用应作为有明确来源和范围的推导说明，不能将整个注记升级为已冻结定理。 |
| 第 31 章 `rem-ch31-jvn-gleason-robertson-literature` 第 2 项 | [中](../../books/quantum-geometry/zh/ch31-quantum-fairness.md#rem-ch31-jvn-gleason-robertson-literature) / [英](../../books/quantum-geometry/en/ch31-quantum-fairness.md#rem-ch31-jvn-gleason-robertson-literature) | 现有“正交可加”/“ortho-additive”在无限维采用时须明确第 2 节的可数强和条件。原文还覆盖实空间，当前应用仅复空间；同一环境内其他三项文献结果也不随本应用升级。 |
| 第 31 章截断节与 `thm-ch31-truncation-strong-vs-uniform` | [中节](../../books/quantum-geometry/zh/ch31-quantum-fairness.md#sec-ch31-truncation-shadows) / [英节](../../books/quantum-geometry/en/ch31-quantum-fairness.md#sec-ch31-truncation-shadows)；[中定理](../../books/quantum-geometry/zh/ch31-quantum-fairness.md#thm-ch31-truncation-strong-vs-uniform) / [英定理](../../books/quantum-geometry/en/ch31-quantum-fairness.md#thm-ch31-truncation-strong-vs-uniform) | 已有强收敛与算子范数阻断的区分适用于理解 $E_n$。泛函尾质量趋零不能被读成算子范数间隙趋零，亦不自动成为原生迹范数结论。 |
| 第 31 章配对节、汇总节 | [中配对](../../books/quantum-geometry/zh/ch31-quantum-fairness.md#sec-ch31-pairing-phase-uncertainty) / [英配对](../../books/quantum-geometry/en/ch31-quantum-fairness.md#sec-ch31-pairing-phase-uncertainty)；[中汇总](../../books/quantum-geometry/zh/ch31-quantum-fairness.md#sec-ch31-time-orthogonal-expansion) / [英汇总](../../books/quantum-geometry/en/ch31-quantum-fairness.md#sec-ch31-time-orthogonal-expansion) | 公平、平方、相位与物理发生链的叙事不提供本应用的全部数学前提；实验卡与汇总标签不能扩大来源结论。 |

采用时先处理权威中文，再同步英文环境种类、ID、声明引用和媒体序列；现有稳定 ID 应继续承载文献边界入口。在指定正文主笔完成精确条件及来源的采用前，现有环境保留“文献结果，未在本书形式化”/“Literature result, not formalized in this book”的归属；这反映当前书稿采用状态，不能据此否认完整联合应用的核验证据。应用没有独立公开 GID，不给它添加正式定理徽章。向量级数供应即使日后单独采用，也必须完整呈现其**已给定泛函与 tightness**前提，不能把它改写为接收原始 $p$ 的定理。新增正式引用及锁文件解析、声明地图和相关图件由后续获准采用步骤处理。

投影域与效应域不可互换：本应用不约束原始非投影效应读数；既有 `thm-busch-effect-density` 的有限效应加性使用更强输入。复二维无法提供所需三元组；应用没有消除二维投影例外，也没有新增二维反例声明。内部使用实三维 Gleason 核心或实线性下降，不把目标提升为实 Hilbert 空间表出。给定内积、全投影非语境读数与可数可加法则都是物理解释之前的结构前提。

## 8. 数学与实现归属

数学文献锚为 Andrew M. Gleason，*Measures on the Closed Subspaces of a Hilbert Space*，*Journal of Mathematics and Mechanics* **6**，885–893（1957），[DOI: 10.1512/iumj.1957.6.56050](https://doi.org/10.1512/iumj.1957.6.56050)。固定源码的[文献归属说明](https://github.com/the-omega-institute/trureturing/blob/4367dc9542d65524f3c2a9b5055be18f85ca8d7e/Library/notes/gleason1957measures.md)定位 Lemma 3.4 于 pp. 891–892、Theorem 3.5 于 p. 892、Theorem 4.1 于 pp. 892–893；文献的可分实/复迹类表出范围超过当前有限复公开声明。

有限证明的形式化作者为 Zayn Blore，源码改编自 `zblore/csd-lean4@07e2273b0180e69b4cb8f84e9d2200faa19fe07d`，采用 Apache-2.0；初等实核心归于 Cooke、Keane、Moran（1985），*Math. Proc. Cambridge Philos. Soc.* **98**，117–128。完整归属、许可证与接收端修改说明见固定说明及[有限规格第 6 节](spec-batch-gleason-projections.md#文献与源码归属)。原生迹类供应源码注明改编自 `leanprover-community/physlib@b9043cc548ef6d63a28454cf3a57fb12a0c2e142`，作者 Tom Ole Diem，采用 Apache-2.0；各文件保留原始归属。这里记录已有来源和可采用接口，不主张数学新颖性，也不把应用推导包装成新冻结定理。
