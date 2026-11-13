# 有限维复投影 Gleason 定理：形式化采用规格

本规格给出已冻结定理到现有书稿的精确对应，供后续中英文正文采用。数学对象限于有限维复矩阵上的投影概率赋值。书稿采用尚未完成；本规格不是章节正文、新数学定理或一次新的 Lean 编译证明。

## 1. 冻结声明身份

| 项目 | 精确值 |
| --- | --- |
| trureturing 提交 | `e526f0f5e3a1e84b05f05c0c009eab920bc3a06f`，与[书库锁文件](../../trureturing.lock.json)一致 |
| 源模块 | `D5/S3/Quantum/GleasonComplexRepresentation.lean` |
| Lean 全名 | `Gleason.ProjectionPackage.gleason_representation` |
| 消费端 GID | `D5/S3/Quantum/GleasonComplexRepresentation.Gleason.ProjectionPackage.gleason_representation` |
| 冻结状态路径 | `Golden/Frozen/state/D5/S3/Quantum/GleasonComplexRepresentation.lean.json` |
| 冻结名称键 | `ns(ns(ns(n0,7:Gleason),17:ProjectionPackage),22:gleason_representation)` |
| 冻结种类 | `theorem` |
| 状态 `statement_id` | `sha256:dd9874dc790ed4367402ce8fce42837ee0c9f1b2ff1ccb61b47c1769440a4326` |

`statement_id` 是该模块冻结状态携带的身份，不能当作单独这条定理签名的散列。声明位于[固定源码第 899 行](https://github.com/the-omega-institute/trureturing/blob/e526f0f5e3a1e84b05f05c0c009eab920bc3a06f/D5/S3/Quantum/GleasonComplexRepresentation.lean#L899)，对应[固定冻结状态](https://github.com/the-omega-institute/trureturing/blob/e526f0f5e3a1e84b05f05c0c009eab920bc3a06f/Golden/Frozen/state/D5/S3/Quantum/GleasonComplexRepresentation.lean.json)。源码与冻结名称键共同确定消费者可引用的声明。

当前锁文件有 **549 条声明引用**，尚无上述 GID；中英文书稿也尚无该定理的 `lean` 引用。钉到包含定理的提交，不等于已经把它纳入书稿的验证账本。后续正文新增引用后，须按[项目规则](../../PROJECT.md)通过 `./tbook pin --refresh` 解析，并同步相关声明地图与图件；本规格不改变锁文件或既有环境 ID。

## 2. 原始签名与完整前提

以下保留源码的命名空间、隐式维数参数、显式参数顺序及结论；省略证明体。

```lean
namespace Gleason
variable {N : ℕ}
theorem ProjectionPackage.gleason_representation (OP : ProjectionPackage N) (hN : 3 ≤ N) :
    ∃! ρ : Matrix (Fin N) (Fin N) ℂ, ρ.PosSemidef ∧ ρ.trace = 1 ∧
      ∀ P, IsStarProjection P → OP.p P = ((ρ * P).trace).re
end Gleason
```

这里唯一的外层隐式参数是 `{N : ℕ}`；没有另外的类型类前提，也没有待提供的实三维核心引理、连续性或可测性假设。源码中的条件版 `gleason_representation_of_core` 接收 `hcore : CoreLemma`，但消费端目标是上面的无此参数版本：同模块 `coreLemma` 已提供该核心结论。

`ProjectionPackage` 来自同一提交的[投影几何源码](https://github.com/the-omega-institute/trureturing/blob/e526f0f5e3a1e84b05f05c0c009eab920bc3a06f/D5/S3/Quantum/GleasonFrameGeometry.lean#L102)，结构的全部字段如下。

```lean
namespace Gleason
structure ProjectionPackage (N : ℕ) where
  p : Matrix (Fin N) (Fin N) ℂ → ℝ
  nonneg : ∀ P, IsStarProjection P → 0 ≤ p P
  total_one : p 1 = 1
  additive : ∀ P Q, IsStarProjection P → IsStarProjection Q → P * Q = 0 → p (P + Q) = p P + p Q
end Gleason
```

数学语义必须逐项保留：

| 源码项 | 采用时的数学含义 |
| --- | --- |
| `N : ℕ`、`3 ≤ N` | 任意有限整数维数 $N\ge 3$，不是只对三维成立；标量域固定为 $\mathbb C$。 |
| `OP.p` | 一个定义在全部 $M_N(\mathbb C)$ 上、取实数值的总函数 $p$。同一投影在不同正交基或测量语境中使用同一个值。 |
| `IsStarProjection P` | $P^*=P$ 且 $P^2=P$；不是任意幂等矩阵，也不是任意正效应。矩阵的星为共轭转置。 |
| `nonneg` | 仅对上述投影要求 $p(P)\ge 0$。 |
| `total_one` | $p(I)=1$；源码的 `1` 是单位矩阵。 |
| `additive` | 对任意两个星投影 $P,Q$，若 $PQ=0$，则 $p(P+Q)=p(P)+p(Q)$。自伴性也使 $QP=0$；不另加非正交投影的可加性。 |

二元正交可加可迭代到有限个两两正交投影。$p(0)=0$ 与投影上的 $p(P)\le 1$ 是这些前提的后果，不是额外输入。约束遍及所有投影，不能缩成某一个选定正交基上的归一化规则。

**非投影上的值自由。** 即使 $p$ 的类型覆盖全部矩阵，也不要求它在非投影效应、一般厄米矩阵或其他矩阵上非负、可加或等于迹配对。定理不假设 $p$ 连续、可测、线性、对所有效应可加或可数可加。

## 3. 结论、迹方向与唯一性

结论是存在唯一的矩阵 $\rho\in M_N(\mathbb C)$，同时满足

$$
\rho\succeq 0,\qquad \operatorname{Tr}(\rho)=1,\qquad
\forall P\;(P^*=P,\ P^2=P)\;\Longrightarrow\;
p(P)=\operatorname{Re}\operatorname{Tr}(\rho P).
$$

`ρ.PosSemidef` 包含厄米性与正半定性；`ρ.trace = 1` 是复数域内的等式。Lean 明确写的是 `((ρ * P).trace).re`，乘法顺序是 **$\rho P$**。由于 $\rho$ 与 $P$ 都自伴，有限维迹的循环性保证该迹为实数，因此书中可用 $\operatorname{Tr}(\rho P)$ 表达同一配对，但应交代实值性。无须假设 $\rho P=P\rho$，也不能宣称乘积 $\rho P$ 本身一定自伴或正半定。

秩一约定来自源码 `rankOne v = vecMulVec v (star v)`，即 $P_v=vv^*$，且仅在 $\lVert v\rVert=1$ 时为秩一投影。与源码 `trace_mul_vecMulVec` 一致的方向是

$$
\operatorname{Tr}(\rho vv^*)=v^*\rho v,
\qquad p(P_v)=\operatorname{Re}(v^*\rho v).
$$

`∃!` 唯一化的是满足**正半定、迹一、代表全部投影**这三个条件的矩阵：任意另一满足它们的 $\sigma$ 都等于 $\rho$。源码用所有单位向量的秩一投影读数识别厄米二次型，再得到矩阵相等。它不声称单个测量基的读数足以确定态，也不唯一化 $p$ 在非投影上的延拓，更不提供实验估计或计算复杂度结论。

## 4. 适用边界

| 范围 | 可采用的结论与限制 |
| --- | --- |
| 有限复维 $N\ge 3$ | 以上完整投影公理推出唯一密度矩阵；无须增强为全效应可加。 |
| 复维 $N=2$ | `hN` 无法满足，不能调用目标定理。纯投影归一化与正交可加允许非 Born 赋值，是现有文献讨论的边界；本目标声明本身没有形式化二维反例。 |
| 效应 $0\le E\le I$ | `p(E)=\operatorname{Tr}(\rho E)` 不在目标结论内。二维效应表出由现有 `thm-busch-effect-density` 讨论，它使用效应上的更强可加前提；不得与纯投影前提互换。 |
| 实希尔伯特空间 | 文献有实版本；该消费端签名的矩阵系数为 $\mathbb C$。证明内部使用实三维核心，不等于目标签名覆盖任意实希尔伯特空间。 |
| 无限维可分希尔伯特空间 | 仍是文献结果、未在本书形式化。需要明确可数正交可加等无限维条件；有限维二元可加定理不提供无限维迹类密度算子。 |
| 物理解释 | 赋值已在给定复内积结构的所有投影上满足跨语境一致的公理；定理不从“两两公平”、观察者记录或分支计数推导该结构与公理。 |

无限维的完整联合结论仍未核验：从原始投影赋值 $p$，到一个统一的 $\phi$，再到所有投影上的同一表示、尾项控制与原生迹类算子及其迹配对，不能由本有限维声明拼接成已完成的定理。局部或仅绑定成功的临时检查不构成可引用的公开定理声明，也不能支持整条无限维组合或全部登记审计已通过的说法。

## 5. 现有书稿对应与采用范围

以下范围来自 `books/quantum-geometry/{zh,en}/*.md`，按不区分大小写的 `gleason|格里森|格利森|格莱森` 检索；只计书稿 Markdown，含环境标题、ID 与交叉引用。它们是**待核对的对应位置**，不表示已经修改、分拆或采用完毕。

| 文件（两语言同名） | 中文匹配行 / 出现次数 | 英文匹配行 / 出现次数 | 显式 Gleason 环境交叉引用（中 / 英） |
| --- | --- | --- | --- |
| `README.md` | 1 / 1 | 1 / 1 | 0 / 0 |
| `ch02-born-rule.md` | 9 / 13 | 9 / 13 | 5 / 5 |
| `ch31-quantum-fairness.md` | 6 / 9 | 6 / 8 | 1 / 1 |
| `appendix-a.md` | 4 / 4 | 4 / 4 | 0 / 0 |
| `appendix-d.md` | 4 / 5 | 4 / 4 | 0 / 0 |
| **合计** | **24 / 32** | **24 / 30** | **6 / 6** |

完整目标范围为 **5 对、10 个文件，48 个匹配行、62 次出现**。其中显式 `[@…]` 引用共有 **12 处**：`rem-gleason-literature` 10 处，`rem-ch31-jvn-gleason-robertson-literature` 2 处；这 48 行不能解释为 48 条正式定理引用。目标定理 GID 的书稿引用数为 **0**。

| 现有稳定位置 | 中英文相对链接 | 后续形式化对齐要求 |
| --- | --- | --- |
| `sec-honesty-rules` | [中](../../books/quantum-geometry/zh/README.md#sec-honesty-rules) / [英](../../books/quantum-geometry/en/README.md#sec-honesty-rules) | 诚实契约以 Gleason 作未形式化例子；须区分已冻结的有限复投影版本与仍属文献的更广版本，保留三层规则。 |
| `rem-gleason-literature` | [中](../../books/quantum-geometry/zh/ch02-born-rule.md#rem-gleason-literature) / [英](../../books/quantum-geometry/en/ch02-born-rule.md#rem-gleason-literature) | 第 2 章主要归属点；涉及有限维投影、无限维投影、二维例外与 Busch 效应四种范围。有限复版本需独立、精确的正式环境；既有复合文献注记不能整体改挂一个 GID。保留现有 ID 作为文献边界入口。 |
| 第 2 章引言、`sec-ch02-3`、`rem-povm-effect-converse-literature` | [中引言](../../books/quantum-geometry/zh/ch02-born-rule.md) / [英引言](../../books/quantum-geometry/en/ch02-born-rule.md)；[中 §2.3](../../books/quantum-geometry/zh/ch02-born-rule.md#sec-ch02-3) / [英 §2.3](../../books/quantum-geometry/en/ch02-born-rule.md#sec-ch02-3)；[中效应注记](../../books/quantum-geometry/zh/ch02-born-rule.md#rem-povm-effect-converse-literature) / [英效应注记](../../books/quantum-geometry/en/ch02-born-rule.md#rem-povm-effect-converse-literature) | 覆盖指向主注记的五处交叉引用：引言、效应界注记、充分性与唯一性总结、最小确认分解后的边界、反向表出问题。投影逆向唯一性、效应逆向唯一性与已有 Born 正向充分性须分别归属。 |
| `rem-ch31-jvn-gleason-robertson-literature` | [中](../../books/quantum-geometry/zh/ch31-quantum-fairness.md#rem-ch31-jvn-gleason-robertson-literature) / [英](../../books/quantum-geometry/en/ch31-quantum-fairness.md#rem-ch31-jvn-gleason-robertson-literature) | 第 2 项 Gleason 文献条目含可分实或复空间；有限复矩阵声明只覆盖其中一部分。无限维叙述须显式保留可数正交可加要求，其他三项文献结果不随之升级。 |
| `sec-ch31-pairing-phase-uncertainty`、`sec-ch31-time-orthogonal-expansion` | [中配对节](../../books/quantum-geometry/zh/ch31-quantum-fairness.md#sec-ch31-pairing-phase-uncertainty) / [英配对节](../../books/quantum-geometry/en/ch31-quantum-fairness.md#sec-ch31-pairing-phase-uncertainty)；[中汇总节](../../books/quantum-geometry/zh/ch31-quantum-fairness.md#sec-ch31-time-orthogonal-expansion) / [英汇总节](../../books/quantum-geometry/en/ch31-quantum-fairness.md#sec-ch31-time-orthogonal-expansion) | 包含指数选择的结构公理段、`fair-square` 卡说明与汇总表第 3、4 行。核对有限维标签和已有文献交叉引用；不把所有公平性或相位解释都标成目标定理的结论。 |
| `rem-appendix-a-master-dictionary`、`rem-appendix-a-epistemic-boundary` | [中字典](../../books/quantum-geometry/zh/appendix-a.md#rem-appendix-a-master-dictionary) / [英字典](../../books/quantum-geometry/en/appendix-a.md#rem-appendix-a-master-dictionary)；[中边界](../../books/quantum-geometry/zh/appendix-a.md#rem-appendix-a-epistemic-boundary) / [英边界](../../books/quantum-geometry/en/appendix-a.md#rem-appendix-a-epistemic-boundary) | 覆盖字典中公平性与量子基础两组摘要、边界环境内 A72 行及文末文献清单，四处均须区分有限复版本与广义文献结果。 |
| `rem-appendix-d-puzzle-3`、`rem-appendix-d-interpretations-ledger`、`rem-appendix-d-epistemic-boundary` | [中难题三](../../books/quantum-geometry/zh/appendix-d.md#rem-appendix-d-puzzle-3) / [英难题三](../../books/quantum-geometry/en/appendix-d.md#rem-appendix-d-puzzle-3)；[中诠释表](../../books/quantum-geometry/zh/appendix-d.md#rem-appendix-d-interpretations-ledger) / [英诠释表](../../books/quantum-geometry/en/appendix-d.md#rem-appendix-d-interpretations-ledger)；[中边界表](../../books/quantum-geometry/zh/appendix-d.md#rem-appendix-d-epistemic-boundary) / [英边界表](../../books/quantum-geometry/en/appendix-d.md#rem-appendix-d-epistemic-boundary) | 覆盖难题三标签与非等权叠加段、诠释表的 Born 文献项、D.21 行。保留单比特例外及“内积结构已预设”的边界；不能用本定理宣称解决复数结构起源或解释学问题。 |

第 2 章现有 `thm-born-probability-skeleton` 是正向充分性，`thm-busch-effect-density` 是效应域逆向表出；均不是本 GID 的替代名字。正文采用仍需由正文职责完成：先确定有限复版本的独立正式环境与对应 GID，再同步中英文环境序列及上述摘要归属，同时保留既有环境 ID 与无限维文献边界。以上没有提供替换段落，也没有把未完成的采用记作完成。

## 6. 文献与源码归属

数学文献锚为 Andrew M. Gleason，*Measures on the Closed Subspaces of a Hilbert Space*，*Journal of Mathematics and Mechanics* **6**，885–893（1957），[DOI: 10.1512/iumj.1957.6.56050](https://doi.org/10.1512/iumj.1957.6.56050)。固定源码与[归属说明](https://github.com/the-omega-institute/trureturing/blob/e526f0f5e3a1e84b05f05c0c009eab920bc3a06f/Library/notes/gleason1957measures.md)定位 Lemma 3.4 于 pp. 891–892、Theorem 3.5 于 p. 892、Theorem 4.1 于 pp. 892–893。后者是可分实或复希尔伯特空间上的正迹类表示文献结果，不能把其全部范围归给当前有限维 GID。

源码头部署名 **Zayn Blore**，采用 **Apache-2.0**，改编自 [`zblore/csd-lean4@07e2273b0180e69b4cb8f84e9d2200faa19fe07d`](https://github.com/zblore/csd-lean4/tree/07e2273b0180e69b4cb8f84e9d2200faa19fe07d/CsdLean4/Mathlib/Analysis/InnerProductSpace/Gleason)。完整许可证保留在上述固定归属说明中；该说明记载此上游源码闭包没有 `NOTICE`。此处只记录来源与接口，不复制证明实现或许可证全文，也不作新的登记审计结论。

形式化所用的初等实核心归于 Cooke、Keane、Moran（1985），*Mathematical Proceedings of the Cambridge Philosophical Society* **98**，117–128；固定归属说明还区分其第 6、7 节与实际形式化收尾的差别。接收端调整了导入、模块分组与部分供应证明，不主张数学新颖性。该固定提交使用 Lean `4.35.0` 与 Mathlib `56a005855ea17e0b0958f73ec801ae140b0a1679`；这里记录已有源码与冻结身份，不报告新的编译或无限维核验。

效应域对照保留现有书稿文献：P. Busch，*Quantum states and generalized observables: A simple proof of Gleason's theorem*，*Physical Review Letters* **91**，120403（2003）。它与 Gleason 投影定理的定义域及维数条件不同；有限维效应版本的既有形式化与其无限维文献版本也须分开。
