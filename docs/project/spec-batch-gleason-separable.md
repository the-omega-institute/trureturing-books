# 可分复 Hilbert 空间投影赋值：统一泛函与尾项的采用规格

本规格供正文主笔核对已合并应用的数学接口、来源与采用边界。应用从原始投影读数构造一个正归一泛函，并为同一个泛函构造有限秩尾项控制；它是既有结果的应用推导，没有在应用地址新增公开 Lean 声明。完整的原始读数到原生迹类密度算子的联合目标，以及中英文正文采用，仍是分别未完成的义务。本规格不提供替换章节段落，也不报告新的 Lean 编译、原生密度证明或登记审计通过。

## 1. 固定来源与有限声明的关系

本规格的源码基准为 trureturing 提交 `11e63bdd12fa3891c91a2e3307416a1e4ad91823`。应用的两个对应来源是：

- [Blueprint：Application to a countably additive projection measure](https://github.com/the-omega-institute/trureturing/blob/11e63bdd12fa3891c91a2e3307416a1e4ad91823/Blueprint/D5/S3/Quantum/GleasonComplexRepresentation.md#application-to-a-countably-additive-projection-measure)。
- [拥有该应用的 Scribe 定义](https://github.com/the-omega-institute/trureturing/blob/11e63bdd12fa3891c91a2e3307416a1e4ad91823/Blueprint/D5/S3/Quantum/GleasonComplexRepresentation.scribe.cs)：`GleasonComplexRepresentationDocument.Create` 中同名 `DocumentBlock.Section`；它在有限定理的 `Describe.Lean` 之外，未增加另一个声明句柄。

同提交的[有限 Lean 源码](https://github.com/the-omega-institute/trureturing/blob/11e63bdd12fa3891c91a2e3307416a1e4ad91823/D5/S3/Quantum/GleasonComplexRepresentation.lean#L899)仍声明 `Gleason.ProjectionPackage.gleason_representation`：对有限复矩阵、`N ≥ 3`、非负归一且二元正交可加的 `ProjectionPackage N`，存在唯一正半定迹一矩阵，代表全部星投影读数。该声明不是可分无限维原始输入定理。有限签名、完整 package 字段、唯一性、归属与全部有限采用位置，沿用[有限投影规格](spec-batch-gleason-projections.md)，此处只补应用所需的接口。

有限声明的[冻结记录](https://github.com/the-omega-institute/trureturing/blob/11e63bdd12fa3891c91a2e3307416a1e4ad91823/Golden/Frozen/state/D5/S3/Quantum/GleasonComplexRepresentation.lean.json)仍含名称键 `ns(ns(ns(n0,7:Gleason),17:ProjectionPackage),22:gleason_representation)`、种类 `theorem`，模块状态 `statement_id` 为 `sha256:dd9874dc790ed4367402ce8fce42837ee0c9f1b2ff1ccb61b47c1769440a4326`。模块状态身份不能冒充新增应用的声明 ID。

[书库锁文件](../../trureturing.lock.json)保持在 `e526f0f5e3a1e84b05f05c0c009eab920bc3a06f`，共 549 条声明引用；尚未引用上述有限声明或下述向量级数供应声明，更没有覆盖本应用的无限维原始输入 GID。固定合并源码中的应用说明、既有冻结供应声明、锁内已采用声明是三个不同层次。不得给本应用附加 `lean` 属性或沿用有限 GID 覆盖其无限维范围。

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

只有投影处的值受约束。原始 $p$ 在非投影效应、自伴非投影及一般算子上的值均自由；不输入连续性、可测性、线性、效应可加性，也不输入一个已给定的泛函、正规性或有限秩紧性（tightness）。非语境的同一投影同一读数、全部投影的定义域，以及上述复 Hilbert 结构均是数学前提，不能从物理观察或“两两公平”叙事中省略或声称已经推导出来。

## 3. 应用给出的同一组对象

在第 2 节输入下，应用构造一个正的连续复线性泛函 $\phi:\mathrm{Op}\to\mathbb C$ 和一个序列 $E:\mathbb N\to\mathrm{Op}$，同时满足

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

正性中的复数非负采用通常的实轴非负序。构造先固定一个 $\phi$，再证明它在每个投影上的复等式，最后对这个相同 $\phi$ 构造 $E_n$ 并证明尾项极限；不能按投影或截断分别挑选不同泛函。$E_n$ 来自单位算子的同一次基展开的前缀和，因而有限秩且递增。应用没有把 $E_n\to I$ 加强为算子范数收敛，也没有在此声称泛函唯一性或原生迹类密度唯一性。

## 4. 来源中的推导接口

以下是固定 Blueprint/Scribe 的推导对应，供采用时核对量词与依赖；不是新增形式化证明。

**原始法则的有限后果。** 零序列给出 $p(0)=0$；序列 $P,Q,0,\ldots$ 给出二元正交可加。对互补投影得到 $p(P)+p(I-P)=1$，故所有投影的读数在 $[0,1]$。这些后果不使用 $p$ 的连续性。

**有质量的有限角。** 任取有限列表的有限秩星投影 $P_i$、实系数 $a_i$ 与 $a_0$；列表可空，$P_i$ 无须交换。取各值域与指定单位三元组张成的有限维空间 $U$，令 $N=\dim_{\mathbb C}U\ge3$。正交坐标等距嵌入 $J:\mathbb C^N\to H$ 给出 $F(A)=JAJ^*$、支撑投影 $E=F(I_N)$。每个 $P_i$ 均满足 $EP_i=P_iE=P_i$，故 $M_i=J^*P_iJ$ 确实是星投影。这里仅压缩已被 $E$ 支撑的投影；一般投影的任意压缩未必幂等。

令 $q(A)=p(F(A))$、$m=q(I_N)=p(E)\in[0,1]$。当 $m>0$ 时，对归一化的 $q/m$ 调用有限 `Gleason.ProjectionPackage.gleason_representation`，再乘回 $m$，得到正半定有限矩阵 $\rho_U$，满足 $\operatorname{Tr}\rho_U=m$，且全部矩阵星投影上 $q(A)=\operatorname{Re}\operatorname{Tr}(\rho_U A)$。当 $m=0$ 时，对 $A,I_N-A$ 用非负与可加得 $q(A)=0$，直接取 $\rho_U=0$，不得除以零。$\rho_U$ 是估计中的局部矩阵，尚非联合目标中的环境算子 $\rho$。

**包含补质量的范数界。** 令 $T=a_0I+\sum_i a_iP_i$、$B=a_0I_N+\sum_i a_iM_i=J^*TJ$。有 $\|B\|\le\|T\|$ 与

$$
\operatorname{Re}\operatorname{Tr}(B\rho_U)=a_0m+\sum_i a_ip(P_i).
$$

[`UniformVarianceTraceBound.re_trace_mul_le`](https://github.com/the-omega-institute/trureturing/blob/11e63bdd12fa3891c91a2e3307416a1e4ad91823/D5/S3/Quantum/Matrix/UniformVarianceTraceBound.lean#L33) 对 $B$ 和 $-B$ 各用一次，再用 [`FiniteTraceDistance.traceNorm_of_posSemidef`](https://github.com/the-omega-institute/trureturing/blob/11e63bdd12fa3891c91a2e3307416a1e4ad91823/D5/S3/Quantum/Foundation/FiniteTraceDistance.lean#L447) 的实部等式，得

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

上述不等式使 $g(d)=0$ 蕴涵 $r(d)=0$，故 $r$ 与组合表示无关，下降为 $X$ 上连续实线性 $f$；源码叙述指定所钉 `LinearMap.compLeftInverse` 接口实现此下降。$f(I)=1$、$f(P)=p(P)$ 对每个 $P\in S$ 成立，且 $\|f\|\le1$。三元组保证 $H$ 非平凡，$\|I\|=1$，故 $\|f\|=1$。

$X$ 的元素全自伴。[`CentralPositiveFunctionalExtension.exists_positive_extensions_norm_additive`](https://github.com/the-omega-institute/trureturing/blob/11e63bdd12fa3891c91a2e3307416a1e4ad91823/D5/S3/Quantum/Algebra/CentralPositiveFunctionalExtension.lean#L86) 对自伴实子空间 $X$ 与 $f$ 给出两个正复泛函 $\psi_+,\psi_-$：实部之差在 $X$ 上等于 $f$，单位处实部之和为 $\|f\|=1$。单位处之差亦为 $1$，正性迫使 $\operatorname{Re}\psi_-(I)=0$、$\operatorname{Re}\psi_+(I)=1$。正泛函范数恒等式给出 $\|\psi_-\|=0$，故负项消失。取 $\phi=\psi_+$，正泛函在自伴元上实值，得到单位归一、范数一和全部有限秩投影上的复等式。

**同一泛函覆盖全部投影。** 对任意星投影 $P$ 的闭值域使用可数正交基。固定来源为 [`HilbertPathFundamentalTheorem.lean`](https://github.com/the-omega-institute/trureturing/blob/11e63bdd12fa3891c91a2e3307416a1e4ad91823/D5/S3/Observer/HilbertGeometry/HilbertPathFundamentalTheorem.lean#L229) 内的私有 `CountableBasisPort.exists_countable_hilbertBasis`，其参数覆盖完备可分的实或复 Hilbert 空间。这里只借用复空间情形的基存在性；私有供应项不是可供书稿直接挂接的公开 GID。

将基指标注入 $\mathbb N$，把对应秩一投影在注入像外补零，得到两两正交的有限秩 $Q_i$。`HilbertBasis.hasSum_orthogonalProjectionOnto` 给出每个 $x$ 上 $\operatorname{HasSum}(i\mapsto Q_ix,Px)$。注入加补零同时处理有限基与空基（$P=0$），不假定指标与全体自然数等势。

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
| 固定提交 | `11e63bdd12fa3891c91a2e3307416a1e4ad91823` |
| 模块 ID | `D5/S3/Quantum/Analysis/TightStateVectorSeries` |
| Lean 全名 | `D5.S3.Quantum.Analysis.TightStateVectorSeries.positive_functional_vector_series_of_finite_rank_tightness` |
| 冻结路径 | `Golden/Frozen/state/D5/S3/Quantum/Analysis/TightStateVectorSeries.lean.json` |
| 冻结名称键 | `ns(ns(ns(ns(ns(ns(n0,2:D5),2:S3),7:Quantum),8:Analysis),22:TightStateVectorSeries),58:positive_functional_vector_series_of_finite_rank_tightness)` |
| 种类 | `theorem` |
| 模块状态 `statement_id` | `sha256:f7c78106ec5a6bea403536dc0fe58df28263d684af4e8e99da7cc4af551e3ce3` |

对应[固定 Lean 源码](https://github.com/the-omega-institute/trureturing/blob/11e63bdd12fa3891c91a2e3307416a1e4ad91823/D5/S3/Quantum/Analysis/TightStateVectorSeries.lean#L23)与[冻结记录](https://github.com/the-omega-institute/trureturing/blob/11e63bdd12fa3891c91a2e3307416a1e4ad91823/Golden/Frozen/state/D5/S3/Quantum/Analysis/TightStateVectorSeries.lean.json)。以下完整保留所有类型类、参数顺序和结论，只省略证明体：

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

内积在第二变量复线性，方向是 $\langle u_k,A u_k\rangle$。这既非仅秩一或投影读数，也不要求 $A$ 正或自伴。供应证明使用正泛函压缩误差界、有限值域分解及可数非零支撑补零；证明体中的局部算子不扩充公开结论。其公开 telescope 不输出原生 `IsTraceClass ρ`、原生迹一、乘积迹类或从投影读数唯一识别原生密度算子的结论。

| 层次 | 输入与可使用结果 | 采用界限 |
| --- | --- | --- |
| 有限冻结定理 | 有限 `ProjectionPackage N`、$N\ge3$；唯一有限密度矩阵 | 第 4 节有质量有限角的供应；无限维环境没有变成有限矩阵。 |
| 合并应用推导 | 第 2 节原始 $p$；构造一个 $\phi$、全部投影一致性及同一 $E$ 的尾项 | 没有新增公开无限维声明或 GID。 |
| 冻结向量级数供应 | 已给定的正归一 $\phi$ 与有限秩 tightness；一组质量一向量代表全部有界算子 | 可接应用的输出；不能倒读为已经证明原始输入到原生迹类联合目标。 |
| 原生密度联合目标 | 还需下节全部原生义务及投影输入唯一性 | 仍在进行，未核验完成；不能以向量级数或重新命名的求和替代。 |

## 6. 保留完整原始到原生联合目标

目标必须仍从第 2 节完整原始条件出发，给出**同一组** $\phi,E,\rho$。除第 3 节全部结论外，还要求 $\rho\in\mathcal B(H)$ 为正算子，带有原生 `ProbabilisticTheory.IsTraceClass ρ` 证据 $h_\rho$，并满足原生解析迹 `ProbabilisticTheory.trace ρ hρ = 1`。定义来源为固定提交的 [`Analysis/HilbertTraceClass.lean`](https://github.com/the-omega-institute/trureturing/blob/11e63bdd12fa3891c91a2e3307416a1e4ad91823/D5/S3/Quantum/Analysis/HilbertTraceClass.lean)：迹类谓词使用 `CFC.abs` 的基对角可求和性，迹使用该迹类见证的 Hilbert 基对角和。不能另定义“迹”直接等于 $\sum_k\|u_k\|^2$ 来绕过此接口。

对**每个**有界算子 $A$，还必须给出实际乘积的原生迹类证据 $h_{\rho A}:\operatorname{IsTraceClass}(\rho A)$，并证明

$$
\phi(A)=\operatorname{trace}(\rho A,h_{\rho A}).
$$

这里的 $\rho A$ 是真实算子复合，$A$ 不限于正、自伴、有限秩或投影。尤其全部原始投影上应有 $p(P)=\operatorname{Re}\operatorname{trace}(\rho P,h_{\rho P})$，且该迹为对应的实读数。不能只给向量级数、有限矩阵迹或代理配对。

唯一性必须量化任意正的原生迹类迹一 $\sigma$：仅当它在**所有原始星投影**上的原生迹读数等于 $p(P)$ 时，就推出 $\sigma=\rho$。用于写出这些读数的 $\sigma P$ 原生迹类证据亦须有合法来源；不得额外要求竞争者已满足所有有界 $A$ 上的 $\phi(A)=\operatorname{trace}(\sigma A)$。把竞争者条件加强到全算子配对会削弱原始投影唯一性目标，不能算完成。

从向量级数接到原生迹类、解析迹一、全算子乘积配对及上述投影唯一性的同一联合证明，仍未获得完成核验证据。合并应用不关闭它；既有有限声明与供应声明的冻结状态也不代表该组合已有公开声明或已经通过整体验证。正文采用须单独完成，不能因工程规格已交付而视作完成。

## 7. 书稿落点与采用限制

下列为已有稳定环境，均按中英文原稿核对。全书有限版本的摘要和交叉引用清单见[有限规格第 5 节](spec-batch-gleason-projections.md#现有书稿对应与采用范围)，此处仅列本应用直接涉及的位置。

| 现有位置 | 稳定相对链接 | 正文采用必须保留的边界 |
| --- | --- | --- |
| 第 2 章 `rem-gleason-literature` | [中](../../books/quantum-geometry/zh/ch02-born-rule.md#rem-gleason-literature) / [英](../../books/quantum-geometry/en/ch02-born-rule.md#rem-gleason-literature) | 现有注记同时含有限/无限投影 Gleason、二维例外与无限维 Busch。有限复结果须单独对应有限声明；无限维原生密度与唯一性保持文献归属。本应用只能作为有明确来源和范围的推导说明，不能将整个注记升级为已冻结定理。 |
| 第 31 章 `rem-ch31-jvn-gleason-robertson-literature` 第 2 项 | [中](../../books/quantum-geometry/zh/ch31-quantum-fairness.md#rem-ch31-jvn-gleason-robertson-literature) / [英](../../books/quantum-geometry/en/ch31-quantum-fairness.md#rem-ch31-jvn-gleason-robertson-literature) | 现有“正交可加”/“ortho-additive”在无限维采用时须明确第 2 节的可数强和条件。原文还覆盖实空间，当前应用仅复空间；同一环境内其他三项文献结果也不随本应用升级。 |
| 第 31 章截断节与 `thm-ch31-truncation-strong-vs-uniform` | [中节](../../books/quantum-geometry/zh/ch31-quantum-fairness.md#sec-ch31-truncation-shadows) / [英节](../../books/quantum-geometry/en/ch31-quantum-fairness.md#sec-ch31-truncation-shadows)；[中定理](../../books/quantum-geometry/zh/ch31-quantum-fairness.md#thm-ch31-truncation-strong-vs-uniform) / [英定理](../../books/quantum-geometry/en/ch31-quantum-fairness.md#thm-ch31-truncation-strong-vs-uniform) | 已有强收敛与算子范数阻断的区分适用于理解 $E_n$。泛函尾质量趋零不能被读成算子范数间隙趋零，亦不自动成为原生迹范数结论。 |
| 第 31 章配对节、汇总节 | [中配对](../../books/quantum-geometry/zh/ch31-quantum-fairness.md#sec-ch31-pairing-phase-uncertainty) / [英配对](../../books/quantum-geometry/en/ch31-quantum-fairness.md#sec-ch31-pairing-phase-uncertainty)；[中汇总](../../books/quantum-geometry/zh/ch31-quantum-fairness.md#sec-ch31-time-orthogonal-expansion) / [英汇总](../../books/quantum-geometry/en/ch31-quantum-fairness.md#sec-ch31-time-orthogonal-expansion) | 公平、平方、相位与物理发生链的叙事不提供本应用的全部数学前提；实验卡与汇总标签不能扩大来源结论。 |

采用时先处理权威中文，再同步英文环境种类、ID、声明引用和媒体序列；现有稳定 ID 应继续承载文献边界入口。原生联合目标尚未完成前，保留“文献结果，未在本书形式化”/“Literature result, not formalized in this book”的归属，不给应用添加正式定理徽章。向量级数供应即使日后单独采用，也必须完整呈现其**已给定泛函与 tightness**前提，不能把它改写为接收原始 $p$ 的定理。新增正式引用及锁文件解析、声明地图和相关图件由后续获准采用步骤处理。

投影域与效应域不可互换：本应用不约束原始非投影效应读数；既有 `thm-busch-effect-density` 的有限效应加性使用更强输入。复二维无法提供所需三元组；应用没有消除二维投影例外，也没有新增二维反例声明。内部使用实三维 Gleason 核心或实线性下降，不把目标提升为实 Hilbert 空间表出。给定内积、全投影非语境读数与可数可加法则都是物理解释之前的结构前提。

## 8. 数学与实现归属

数学文献锚为 Andrew M. Gleason，*Measures on the Closed Subspaces of a Hilbert Space*，*Journal of Mathematics and Mechanics* **6**，885–893（1957），[DOI: 10.1512/iumj.1957.6.56050](https://doi.org/10.1512/iumj.1957.6.56050)。固定源码的[文献归属说明](https://github.com/the-omega-institute/trureturing/blob/11e63bdd12fa3891c91a2e3307416a1e4ad91823/Library/notes/gleason1957measures.md)定位 Lemma 3.4 于 pp. 891–892、Theorem 3.5 于 p. 892、Theorem 4.1 于 pp. 892–893；文献的可分实/复迹类表出范围超过当前有限复公开声明。

有限证明的形式化作者为 Zayn Blore，源码改编自 `zblore/csd-lean4@07e2273b0180e69b4cb8f84e9d2200faa19fe07d`，采用 Apache-2.0；初等实核心归于 Cooke、Keane、Moran（1985），*Math. Proc. Cambridge Philos. Soc.* **98**，117–128。完整归属、许可证与接收端修改说明见固定说明及[有限规格第 6 节](spec-batch-gleason-projections.md#文献与源码归属)。原生迹接口另有其源码记载的实现归属。这里记录已有来源和可采用接口，不主张数学新颖性，也不把应用推导包装成新冻结定理。
