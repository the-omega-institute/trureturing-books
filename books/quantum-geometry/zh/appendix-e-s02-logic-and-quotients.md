# E.2 逻辑、外延商化、米田嵌入与对角线分层 {#sec-appe-logic}

第一条推导链（对应推论 [@cor-ch32-extensionality-and-quotient]）考察如何从原始对象集上的比较读数走向莱布尼茨同一律、集合外延性、范畴论米田（Yoneda）视角以及自指悖论的阻断。其完整推导链写作：

$$
(X,\, \mathrm{CMP}) \;\xrightarrow{\;\text{T1 商核 } \sim_{\mathrm{CMP}}\;}\; X/{\sim_{\mathrm{CMP}}} \;\xrightarrow{\;\text{范畴化 Hom}\;}\; y(X) = \mathrm{Hom}_{\mathcal{C}}(-, X) \;\xrightarrow{\;\text{否定对角线逃逸}\;}\; \text{类型/正则分层}\quad (\nRightarrow\;\text{ZFC 无穷/幂集/AC, T4}).
$$

::: {.remark #rem-appe-logic-chain title="推导链一审计：外延商化、米田嵌入与集合论强度边界（LEAN ✓、文献结果与手工反例）"}
**逐步推导链、有限反例与公理强度边界。**

1. **从预外延比较核到 `T1` 外延商空间（`LEAN ✓`）**：
   在原始状态类型 $X$ 上，将全套比较读数收束为观测映射 $\mathrm{readout}_{\mathrm{CMP}}(x) := \bigl(\mathrm{CMP}(x, -),\, \mathrm{CMP}(-, x)\bigr)$。
   - **缺失商化时的 2 点有限反例（`手工推导`）**：取含两个相异元素的原始集合 $X = \{a_1, a_2\}$（$a_1 \neq a_2$），令 $\mathrm{CMP}(a_i, a_j) \equiv 1$。此时 $a_1$ 与 $a_2$ 对全宇宙一切探针给出完全相同的比较行与比较列，却在原始底集里占据两个不同标签——莱布尼茨不可分辨者同一律在商化前的原始 $X$ 上**不成立**。
   - **`T1` 典范商化消解（`LEAN ✓`）**：定义比较不可分等价核

     $$
     x \sim_{\mathrm{CMP}} y \;\Longleftrightarrow\; \forall z \in X,\quad \mathrm{CMP}(x, z) = \mathrm{CMP}(y, z) \;\land\; \mathrm{CMP}(z, x) = \mathrm{CMP}(z, y).
     $$

     由划分拓扑核刻画定理 [`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel)，拓扑不可分关系精确等于读出相等核；在非空源空间 `[Nonempty X]` 上，目标分解判据 [`target_factors_iff_continuous_partition`](lean:D5/S3/ConceptDynamics/ObservationTopology/TargetContinuityFactorization.target_factors_iff_continuous_partition) 与概念纤维分解定理 [`concept_fiber_decomposition`](lean:D5/S3/ConceptDynamics/ConceptFiberDecomposition.concept_fiber_decomposition) 证明：一切在比较核上无分歧的目标概念唯一穿过外延商空间 $X/{\sim_{\mathrm{CMP}}}$ 分解（在上例中 $X/{\sim_{\mathrm{CMP}}} \cong \{*\}$）。外延性无需额外公设，而是 `T1` 商化后的结构定理。
2. **范畴论米田嵌入与反自指对角线分层（`文献结果` + `LEAN ✓`）**：
   - 将对象间比较提升为局部小范畴 $\mathcal{C}$ 的态射集 $\mathrm{Hom}_{\mathcal{C}}(-, X)$，米田引理（`文献结果`）证明米田函子 $y : \mathcal{C} \hookrightarrow [\mathcal{C}^{\mathrm{op}}, \mathbf{Set}]$ 全忠实——对象同构当且仅当其对一切探针对象的关系态射函子自然同构。
   - 若企图在无分层单域中令编码表穷尽自身的全部否定对角线谓词（朴素概括 $U = \{x \mid x \notin x\}$），相对语义对角线逃逸定理 [`relative_semantic_diagonal_ne_listed_decode`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_ne_listed_decode) 与洛维尔（Lawvere）定性自应用包 [`self_application_fragment_package`](lean:D5/S0/Diagonal/Lawvere/QualitativeEscape.self_application_fragment_package)（`LEAN ✓`）证明：任何满射列出必被无不动点否定自修饰器击穿，从而强制导出正则分层或类型分层（后一步是本书的解释，不在 Lean 陈述中）。
3. **ZFC 高阶存在公理的诚实边界（`T4` + 有限与可数双反例）**：
   比较核商化与对角线逃逸（并见[第 38 章 §38.6](ch38-s06-uncompleted-horizon.md#sec-ch38-uncompleted-horizon-godel-pnp) 哥德尔自指盲点）**不能**导出 ZFC 的无穷公理、无限制配对/幂集公理、替换公理或选择公理。**有限与可数无穷双反例（`手工推导`）**：(i) 考察冯·诺依曼累积谱系的第 $5$ 层有限集 $V_5$（元素个数 $|V_5| = 65{,}536$），其上成员关系 $\in$ 满足外延公理、空集公理、正则基础公理、子集分离模式及对 $V_5$ 内元素的并集封闭性，但因一切元素均为有限集而直接证伪 **ZFC 无穷公理**，且在顶阶元素 $V_4 \in V_5$（$\operatorname{rank}(V_4) = 4$）处同时证伪无限制**配对公理与幂集公理**（单点对 $\{V_4\}$ 与幂集 $\mathcal{P}(V_4) = V_5$ 秩均为 $5$，逃出 $V_5$ 之外！）；(ii) 进一步升至可数无穷遗传有限集宇宙 $V_\omega := \bigcup_{k < \omega} V_k$，其上已完整满足 $\mathrm{ZFC} - \text{无穷公理}$ 的全部其余公理（含无限制配对、幂集、并集、基础与替换公理），却依然证伪 **ZFC 无穷公理**！高阶无穷基数与选择原则属于不可约的外部集合论强度（`T4` / `H9`）。
:::
