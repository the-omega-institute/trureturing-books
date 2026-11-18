# E.3 算术、无穷素数轴、虚数旋转与奥斯特洛夫斯基完备化分岔 {#sec-appe-arithmetic}

第二条推导链（对应推论 [@cor-ch32-successor-primes-and-zeckendorf]）追踪算术常数 $(0, 1)$、自然数后继、无穷素数轴、无进位编码、复虚数单位 $i$ 以及实数 $\mathbb{R}$ 与 $p$ 进数 $\mathbb{Q}_p$ 的双轨涌现：

$$
(0, 1) \;\xrightarrow{\;S^\perp \neq \bot\text{ (T2/T4)}\;}\; \mathbb{N}\text{ 与 }\bigoplus_{p}\mathbb{Z} \;\xrightarrow{\;\text{分式化}\;}\; \mathbb{Q} \;\xrightarrow{\;\text{Ostrowski 分岔 (T3) + 柯西完备化 (T1)}\;}\; \bigl\{\mathbb{R} \xrightarrow{R^2=-I} \mathbb{C},\;\; \mathbb{Q}_p\bigr\}.
$$

::: {.remark #rem-appe-arithmetic-chain title="推导链二审计：正交逃逸后继、无穷素数轴、虚数旋转与奥斯特洛夫斯基完备化分岔（LEAN ✓ 与反例审计）"}
**逐步推导链、有限与可数无穷反例审计。**

1. **正交零元 $0$、自配对单位 $1$ 与开放维度后继（`LEAN ✓` + 有限饱和反例）**：
   在 Layer 1 内积实现中，完全正交 $S(x, y) = 0$ 给出加法零元读数 $0$，单位态自比较 $S(x, x) = 1$ 给出乘法基准 $1$。要生成永不循环回撞的皮亚诺（Peano）后继链，有限层投影逃逸定理 [`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape)（`LEAN ✓`）证明：当且仅当当前有限已探明子空间的正交补非平凡（$S^\perp \neq \bot$）时，必存在逃出当前投影层的单位正交新方向。
   - **闭合有限维反例与空间维数刚性边界（`手工推导`）**：在固定有限维欧氏空间 $\mathbb{R}^n$ 中，至多只能选出 $n$ 根两两正交的单位向量，第 $n+1$ 步时 $S^\perp = \{0\}$ 彻底饱和；而在有限模环 $\mathbb{Z}/N\mathbb{Z}$ 中，后继映射 $k \mapsto k + 1$ 在第 $N$ 步回撞原点 $N \equiv 0$（违背皮亚诺公理“$0$ 不是任何元素的后继”）。同时必须指出：不论是[第 38 章 §38.7](ch38-s07-blindspot-and-relativization.md#sec-ch38-stereographic-blindspot-relativization-suspension) 在固定有限维 $D$ 上的北极球极投影同胚 $\Pi_N : S^D \setminus \{N\} \xrightarrow{\sim} \mathbb{R}^D$（仅对固定拓扑维数 $D$ 去紧化），还是[第 34 章 §34.10](ch34-s10-trihedron-rigidity.md#sec-ch34-trihedron-rigidity-and-3d-stability) 的三维麦克斯韦—拉曼桁架刚性锁 $\Delta E(3) = \Delta E(4) = 0$（锁定宏观底空间维数 $D = 3$），都**不会**自动免除希尔伯特态空间的正交余项不竭假设 `H4`（$\dim\mathcal{H} = \infty$，$S_n^\perp \neq \bot$）。
2. **素数正交轴与齐肯多夫禁邻自动机语言（`LEAN ✓` + `文献结果`）**：
   一旦正交后继向全体正整数敞开，素数轴逃逸定理 [`prime_axis_escape`](lean:D5/S3/Axis/PrimeAxisEscape.prime_axis_escape)（`LEAN ✓`）保证在任意有限素数集之外恒有正交新素数轴，使正有理数乘法嵌入无穷素数格 $\bigoplus_p \mathbb{Z}$；在最简二阶递推编码侧，冻结自动机语言定理 [`base_success_iff_noAdjacentOnes`](lean:D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes)（`LEAN ✓`）精确证明：二状态确定性有限自动机 `binaryZeckendorfBase` 接受二进制字 $\mathrm{word} \in \operatorname{List}(\operatorname{Fin} 2)$ 当且仅当该字不含相邻双 $1$（`NoAdjacentOnes word`）；至于每个自然数均可唯一表为不相邻斐波那契数之和的算术唯一性，则属于齐肯多夫算术表示定理层（`文献结果`）。
3. **四分之一拍正交转向与复结构平方负一签名 $R^2 = -I_n$（`LEAN ✓` + `T3` 实载体维数奇偶）**：
   在冻结形式化库中，反自伴幺正平方负一定理 [`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary)（`LEAN ✓`）精确建立在有限维复矩阵 $R \in M_n(\mathbb{C})$（`[Fintype n] [DecidableEq n]`）上：由 $R^\dagger = -R$ 与 $R R^\dagger = I_n$ 直接推出 $R^2 = -I_n$；若将其限制到实矩阵载体 $R \in M_n(\mathbb{R})$（即 $R^{\mathsf{T}} = -R,\; R^{\mathsf{T}} R = I_n$，从而在不预设外部 $\mathbb{C}$ 的实内积空间上内生实现平面双向量四分之一拍旋转生成元），则在奇数实维 $n = 2m + 1$ 上 $\det(R^{\mathsf{T}}) = (-1)^{2m+1} \det R$ 迫使 $\det R = 0$ 奇异，故全局实线性复结构仅存在于偶数实维 $n = 2m$（`T3` 载体维数奇偶约束）。
4. **奥斯特洛夫斯基绝对值分岔（`T3`）与柯西度量完备化（`T1`）**：
   从有理数域 $\mathbb{Q}$ 走向完备数域须跨越两步：首先，奥斯特洛夫斯基分类定理 [`rational_absolute_value_classification`](lean:D5/S3/Arith/AbsoluteValues/OstrowskiClassification.rational_absolute_value_classification)（[@thm-ch36-ostrowski-padic-ball-and-blind-spot]，`LEAN ✓`）证明 $\mathbb{Q}$ 上非平凡绝对值精确分岔为连续阿基米德实标尺 $|\cdot|_\infty$ 与离散素数 $p$ 进超度量标尺 $|\cdot|_p$ 两族（`T3` 估值分岔），并由阿代尔乘积公式 [`rational_padic_product_formula`](lean:D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula)（[@thm-ch36-crt-and-adelic-product-formula]，`LEAN ✓`）锁定全局乘积恒等于 $1$；其次，施加度量柯西完备化（`T1` / `H3`）方分别得到 $\mathbb{R}$（进而 $\mathbb{C} = \mathbb{R}[R]/(R^2+1)$）与 $\mathbb{Q}_p$（同样地，实球极投影 $\Pi_N$ 已预设完备实流形 $S^D$，并不能替代对有理骨架 $\mathbb{Q}^D$ 的 `H3` 柯西完备化）。
   - **可数无穷不完备反例（`手工推导`，严格区分于有限集）**：注意任何**有限**度量空间必然柯西完备（因最小非零点间距大于零，一切柯西列终将常值化），故柯西不完备性的极小反例必须是**可数无穷**前希尔伯特空间——例如有理内积平面 $\mathbb{Q}^2$ 或高斯有理空间 $\mathbb{Q}[i]$：其上逼近单位圆无理相点 $(\cos\theta^*, \sin\theta^*)$ 或对角线长度 $\sqrt{2}$ 的有理序列 $\{q_k\}_{k=1}^\infty$ 满足 $\|q_k - q_m\|_2 \to 0$，却在 $\mathbb{Q}^2$ 内无极限点，唯有经 `T1` 柯西完备化才能闭合分析极限。
:::
