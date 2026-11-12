# 走进 Lean 4 公理圣殿（下）：从秩一玻恩归约到未读不动点与 $\psi = \psi(\psi)$

> *“这就是我们最早研究的 psi=psi(psi)”*

当走完前二十七章的几何与算子长征，回望[第一章](ch01-measurement.md)中“成对测量与向量重叠”的起点，以及第二十四章中观察者自我映射的收缩不动点，读者会蓦然领悟题记里那句贯穿始终的感叹：**“这就是我们最早研究的 psi=psi(psi)”**！

在量子几何的语言里，观察者对系统施加一次记录测量 $P = \{P_k\}_{k \in \kappa}$，既可以通过单分支条件化将状态更新为 $\rho_k = (\operatorname{recordWeight}(P, \rho, k))^{-1} P_k \rho P_k$，也可以通过非选择性未读演化把状态更新为 $\operatorname{unreadState}(P, \rho) = \sum_{k \in \kappa} P_k \rho P_k$。什么时候一个量子态 $\rho$ 在自我测量的映射下达到**完全自洽的不动点** $\operatorname{unreadState}(P, \rho) = \rho$？答案不是哲学隐喻，而是 `trureturing@dev` 中被 Lean 4 内核一锤定音的双向充要定理：当且仅当所有异分支交叉干涉块 $P_k \rho P_l$（$k \neq l$）恒等于零！

本章作为全书形式化公理圣殿审计的下篇，将逐行解剖连接纯态内积模方、迹配对权重、吕德斯条件态完备性与未读不动点充要判据的四条核心源码，并给出覆盖第四部至第六部代表性冻结声明的**全景源码审计表**。

::: {.figure src="ch28-overview"}
**图 28。** 本章地图：左栏，琥珀色的箭头 $\psi$ 在青色的线 $\phi$ 上落下青色的影子 $\lvert\langle\phi\mid\psi\rangle\rvert = 3/5$，以影子为边的青色正方形就是记录权重 $9/25$（[@thm-audit-rank-one-born]）；中栏上半，长为 $1$ 的横条按权重 $w_0 = 9/25$、$w_1 = 16/25$ 分成两段，合起来是未读态（[@lemma-audit-born-pairing-weight]）；中栏下半，每段除以自己的权重，各自撑满一整根，条件态的迹回到 $1$（[@prop-audit-conditional-state]）；右栏，带品红交叉块的 $\rho$ 被挤压改变，交叉块划掉的 $\rho'$ 是不动点（[@cor-audit-unread-fixed-iff]）。数值取自本章末尾的例子。
:::

## 秩一玻恩模方归约与三合取配对桥的源码解剖 {#sec-audit-rank-one-born-and-pairing}

在[第一章](ch01-measurement.md)与[第二章](ch02-born-rule.md)中，我们曾指出：纯态 $\rho = \lvert\psi\rangle\langle\psi\rvert$ 在秩一投影 $P_k = \lvert\phi\rangle\langle\phi\rvert$ 下的迹配对 $\Tr(\rho P_k)$ 之所以化为内积模方 $\lvert\langle\phi \mid \psi\rangle\rvert^2$，完全源于外积矩阵 `Matrix.vecMulVec` 的乘法结合律与迹收缩恒等式。现在让我们打开 `D5/S3/Observer/BornReduction.lean:27`，审视其精确的 Lean 4 声明与内核证明（图 28 左栏）。

在 Mathlib 与 `Conditioning.lean` 中，对于任意有限指标类型 $n$（`[Fintype n]`）与复向量 $\phi, \psi : n \to \mathbb{C}$，秩一外积定义为 $\operatorname{vecMulVec}(\psi, \operatorname{star}\psi)_{ij} = \psi_i \overline{\psi_j}$，复厄米（Hermite）内积记作点积 `star phi ⬝ᵥ psi` $= \sum_{i \in n} \overline{\phi_i}\psi_i$，而记录权重定义为

$$
\operatorname{recordWeight}(P, \rho, k) = \operatorname{bornProbability}(\rho, P_k) = \Tr(\rho \cdot P_k) \in \mathbb{C}.
$$

::: {.theorem #thm-audit-rank-one-born title="秩一纯态与秩一投影下的玻恩内积模方归约定理（内核审计版）" lean="D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction"}
设 $n$ 为有限指标类型（`[Fintype n]`），$\kappa$ 为结果指标类型，$P : \kappa \to M_n(\mathbb{C})$ 为算符族，$\rho \in M_n(\mathbb{C})$ 为复方阵，$k \in \kappa$ 为给定结果，$\phi, \psi : n \to \mathbb{C}$ 为两个复向量。若满足秩一投影条件与秩一纯态条件：

$$
P_k = \operatorname{Matrix.vecMulVec}\bigl(\phi,\, \operatorname{star}\phi\bigr), \qquad \rho = \operatorname{Matrix.vecMulVec}\bigl(\psi,\, \operatorname{star}\psi\bigr),
$$

则第 $k$ 个记录结果的迹权重精确归约为复内积欧氏范数的平方（嵌入 $\mathbb{C}$）：

$$
\operatorname{recordWeight}(P, \rho, k) = \bigl(\norm{\operatorname{star}\phi \bullet_{v} \psi}^2 : \mathbb{R}\bigr).
$$
:::

::: proof
在源码文件 `D5/S3/Observer/BornReduction.lean:27` 中，完整证明脚本为：

```lean
theorem rank_one_pure_state_modulus_square_reduction
    (P : kappa -> Matrix n n ℂ) (rho : Matrix n n ℂ) (k : kappa)
    (phi psi : n -> ℂ)
    (hProjection : P k = Matrix.vecMulVec phi (star phi))
    (hPureState : rho = Matrix.vecMulVec psi (star psi)) :
    recordWeight P rho k = ((‖star phi ⬝ᵥ psi‖ ^ 2 : ℝ) : ℂ) := by
  rw [recordWeight, D5.S3.Quantum.FiniteDimensional.bornProbability, hPureState, hProjection,
    Matrix.vecMulVec_mul_vecMulVec, Matrix.trace_vecMulVec, dotProduct_smul,
    dotProduct_comm psi (star phi), Matrix.star_dotProduct, smul_eq_mul]
  simpa only [RCLike.star_def, Complex.normSq_eq_norm_sq] using
    (Complex.normSq_eq_conj_mul_self (z := star phi ⬝ᵥ psi)).symm
```

让我们逐项追踪 `rw` 链条中的 9 个重写动作：

1. `recordWeight` 与 `bornProbability` 展开目标左端为 $\Tr(\rho \cdot P_k)$；
2. `hPureState` 与 `hProjection` 将 $\rho$ 与 $P_k$ 替换为两个秩一外积 $\operatorname{vecMulVec}(\psi, \operatorname{star}\psi)$ 与 $\operatorname{vecMulVec}(\phi, \operatorname{star}\phi)$；
3. `Matrix.vecMulVec_mul_vecMulVec` 执行外积收缩恒等式 $(\lvert\psi\rangle\langle\psi\rvert)(\lvert\phi\rangle\langle\phi\rvert) = (\operatorname{star}\psi \bullet_{v} \phi)\bullet \operatorname{vecMulVec}(\psi, \operatorname{star}\phi)$；
4. `Matrix.trace_vecMulVec` 与 `dotProduct_smul` 将外积的迹化为点积 $\Tr(\operatorname{vecMulVec}(u, v)) = v \bullet_{v} u$，得到 $(\operatorname{star}\psi \bullet_{v} \phi) \bullet (\operatorname{star}\phi \bullet_{v} \psi)$；
5. `dotProduct_comm psi (star phi)` 与 `Matrix.star_dotProduct` 将前一因子改写为 $\operatorname{star}(\operatorname{star}\phi \bullet_{v} \psi)$，再由 `smul_eq_mul` 化为复数乘法 $\overline{z} \cdot z$（其中 $z = \operatorname{star}\phi \bullet_{v} \psi$）；
6. 最后调用 `Complex.normSq_eq_conj_mul_self.symm` 与 `Complex.normSq_eq_norm_sq`，将 $\overline{z} z$ 精确折叠为 `((‖star phi ⬝ᵥ psi‖ ^ 2 : ℝ) : ℂ)`。

完整证明由 Lean 内核检查。
:::

::: {.figure src="ch28-rank-one-chain"}
**秩一归约是一条六步的重写链。** 从上往下，每个箭头旁是证明里那一步用的引理：迹先被拆成两个外积 $\lvert\psi\rangle\langle\psi\rvert$、$\lvert\phi\rangle\langle\phi\rvert$，外积相乘收缩出一个内积，取迹再收缩出另一个内积，两者正好互为共轭，乘起来是青色的 $\lvert z\rvert^2$，$z = \langle\phi\mid\psi\rangle$；链的终点是绿色的 [@thm-audit-rank-one-born]。
:::

更进一步，在 `D5/S3/Observer/Conditioning/RankOneBornPairingWeight.lean:36` 中，单分支的秩一模方公式被无缝桥接到全套有限记录测量系综的分解定理上（图 28 中上栏）。

::: {.lemma #lemma-audit-born-pairing-weight title="秩一玻恩配对权重与未读条件态凸组合的三合取桥接引理（内核审计版）" lean="D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight"}
设 $n$ 为具有可判等性的有限指标类型（`[Fintype n] [DecidableEq n]`），$\kappa$ 为有限结果类型（`[Fintype kappa]`），$P : \kappa \to M_n(\mathbb{C})$ 满足记录测量公理 `hP : IsRecordMeasurement P`，$\rho \in M_n(\mathbb{C})$ 满足正半定与单位迹条件 `hState : rho.PosSemidef ∧ Matrix.trace rho = 1`。若对指定结果 $k \in \kappa$ 及向量 $\phi, \psi : n \to \mathbb{C}$ 有

$$
P_k = \operatorname{Matrix.vecMulVec}\bigl(\phi,\, \operatorname{star}\phi\bigr), \qquad \rho = \operatorname{Matrix.vecMulVec}\bigl(\psi,\, \operatorname{star}\psi\bigr),
$$

则同时成立以下三条等式：

1. **秩一模方归约**：$\operatorname{recordWeight}(P, \rho, k) = \bigl(\norm{\operatorname{star}\phi \bullet_{v} \psi}^2 : \mathbb{R}\bigr)$；
2. **迹配对恒等式**：$\operatorname{recordWeight}(P, \rho, k) = \Tr(\rho \cdot P_k)$；
3. **未读态的加权条件态展开**：
   $$
   \operatorname{unreadState}(P, \rho) = \sum_{j \in \kappa} \operatorname{recordWeight}(P, \rho, j) \bullet \operatorname{conditionalState}(P, \rho, j).
   $$
:::

::: proof
在 `RankOneBornPairingWeight.lean:36` 中，证明通过 `refine ⟨?_, ?_, ?_⟩` 分为三个子目标：

- 第一合取项直接调用 `rank_one_pure_state_modulus_square_reduction P rho k phi psi hProjection hPureState`；
- 第二合取项由定义等价 `rfl` 直接成立；
- 第三合取项调用 `Conditioning.lean:189` 的加权系综重构定理 `unread_eq_weighted_ensemble hP hState.1`（对应 `weighted_ensemble_reconstructs_unreadState`）。该定理对每个求和项 $j \in \kappa$ 按 `by_cases hk : recordWeight P rho j = 0` 分支：
  - 若权重非零（$w_j \neq 0$），则由 `smul_smul` 与 `mul_inv_cancel₀ hk` 得 $w_j \bullet (w_j^{-1} \bullet (P_j \rho P_j)) = 1 \bullet (P_j \rho P_j) = P_j \rho P_j$；
  - 若权重为零（$w_j = 0$），左边 $0 \bullet \operatorname{conditionalState}(P, \rho, j) = 0$，而右边调用关键引理 `compressed_eq_zero_of_recordWeight_eq_zero`：由于压缩矩阵 $P_j \rho P_j$ 是正半定的（`hCompressed : (P_j * rho * P_j).PosSemidef`）且其迹等于 $w_j = 0$，Mathlib 定理 `hCompressed.trace_eq_zero_iff.mp` 保证**迹为零的正半定矩阵必为零矩阵** $P_j \rho P_j = 0$！因此零概率分支不会留下任何幽灵算子残余。

源码文件第 57–91 行还附带了三组匿名 `example` 检验探针（分别位于第 57、72 与 88 行）：第一组探针（第 57 行）通过 `.2.1` 投影提取第二合取项迹配对恒等式 $\operatorname{recordWeight}(P, \rho, k) = \Tr(\rho P_k)$，第二组探针（第 72 行）通过 `.2.2` 投影提取第三合取项加权条件态系综重构恒等式 $\operatorname{unreadState}(P, \rho) = \sum_j \operatorname{recordWeight}(P, \rho, j)\bullet\operatorname{conditionalState}(P, \rho, j)$，第三组探针（第 88 行）证明 `Matrix.trace (0 : Matrix n n ℂ) ≠ 1`（即 $\Tr(0) \neq 1$），从而验证零矩阵 $\rho = 0$ 被单位迹状态假设 $\Tr(\rho) = 1$ 严格排除。完整证明由 Lean 内核检查。
:::

::: {.figure src="ch28-bridge-skeleton"}
**三合取桥：一项借上一条定理，一项按定义，一项逐项分两种情形。** 绿色的“① 秩一归约”就是 [@thm-audit-rank-one-born]；② 用 `rfl`；③ 用 `unread_eq_weighted_ensemble`，它对每个 $j$ 按 $w_j$ 是否为零分支——不为零时数乘互相抵消，为零时借虚线圈里的 $\rho \succeq 0$ 推出 $P_j \rho P_j = 0$。三路汇入绿色的 [@lemma-audit-born-pairing-weight]；图中 $\rho_j$ 即 $\operatorname{conditionalState}(P, \rho, j)$。
:::

## 吕德斯条件态完备性与未读不动点充要判据 {#sec-audit-conditional-state-and-fixed-point}

现在我们打开 `D5/S3/Observer/Conditioning.lean` 的第 108 行与第 143 行，审计观察者条件化理论中最核心的两条定理（图 28 中下栏与右栏）。

在 `Conditioning.lean:137` 中，给定结果 $k \in \kappa$ 后的**吕德斯条件态**（Lüders conditional state）定义为

$$
\operatorname{conditionalState}(P, \rho, k) = \bigl(\operatorname{recordWeight}(P, \rho, k)\bigr)^{-1} \bullet (P_k \rho P_k).
$$

在 Lean 4 与 Mathlib 中，复数的逆 `0⁻¹ = 0` 是全函数，因此 `conditionalState` 的定义本身无需携带非零证明；但要证明条件化后的算子仍是一个合法的物理量子态（正半定且迹等于 $1$），则必须显式提供非零权重前提 `hk : recordWeight P rho k ≠ 0`。

::: {.proposition #prop-audit-conditional-state title="非零权重下吕德斯条件态的正半定与单位迹保持定理（内核审计版）" lean="D5/S3/Observer/Conditioning.conditionalState_isState"}
设 $n$ 为具有可判等性的有限指标类型（`[Fintype n] [DecidableEq n]`），$\kappa$ 为有限结果类型（`[Fintype kappa]`），$P : \kappa \to M_n(\mathbb{C})$ 满足记录测量公理 `hP : IsRecordMeasurement P`，$\rho \in M_n(\mathbb{C})$ 满足正半定性 `hRho : rho.PosSemidef` 与单位迹 `hTr : Matrix.trace rho = 1`。若结果 $k \in \kappa$ 的记录权重非零（`hk : recordWeight P rho k ≠ 0`），则条件态满足：

$$
\bigl(\operatorname{conditionalState}(P, \rho, k)\bigr).\operatorname{PosSemidef} \qquad\land\qquad \Tr\bigl(\operatorname{conditionalState}(P, \rho, k)\bigr) = 1.
$$
:::

::: proof
在 `D5/S3/Observer/Conditioning.lean:143` 中（注意源码以 `omit decEqKappa in` 显式标明该证明不依赖结果集 $\kappa$ 的可判等性），证明分四步完成：

1. **证明压缩分子 $P_k \rho P_k$ 正半定（`hCompressed`）**：由 `hP.selfAdjoint k` 知 $(P_k)^* = P_k$，故调用 `hRho.mul_mul_conjTranspose_same (P k)` 直接得到 `(P k * rho * P k).PosSemidef`；
2. **证明压缩分子的迹等于记录权重（`hTraceCompressed`）**：利用 `Matrix.trace_mul_cycle`、`hP.idempotent k` 与 `Matrix.trace_mul_comm` 建立 `calc` 链：
   $$
   \Tr(P_k \rho P_k) = \Tr(P_k P_k \rho) = \Tr(P_k \rho) = \Tr(\rho P_k) = \operatorname{recordWeight}(P, \rho, k);
   $$
3. **证明记录权重非负且其逆非负**：调用 `(born_probability_skeleton rho hRho hTr).2.2 (P k) (hP.selfAdjoint k) (hP.idempotent k)` 得到复偏序下的 `hWeightNonneg : 0 ≤ recordWeight P rho k`，再由 `inv_nonneg.mpr hWeightNonneg` 得到逆因子非负 `0 ≤ (recordWeight P rho k)⁻¹`；
4. **组装正半定性与单位迹**：
   - 正半定性由正半定锥在非负标量数乘下的封闭性 `hCompressed.smul (inv_nonneg.mpr hWeightNonneg)` 证得；
   - 单位迹由迹的线性性 `Matrix.trace_smul` 化为 $(\operatorname{recordWeight}(P, \rho, k))^{-1} \cdot \Tr(P_k \rho P_k)$，代入 `hTraceCompressed` 后由域上非零元左逆消去律 `inv_mul_cancel₀ hk` 化为 $1$！

完整证明由 Lean 内核检查。
:::

::: {.figure src="ch28-conditional-skeleton"}
**条件态完备性的四步，第三步借用第二十七章的玻恩骨架。** 右列自上而下是证明的四步，每步旁是所用的引理；左边虚线圈里的前提各喂进一步，绿色的 [@lemma-audit-born-skeleton] 喂进第 ③ 步，给出权重非负。链的终点是绿色的 [@prop-audit-conditional-state]；图中 $\rho_k$ 即 $\operatorname{conditionalState}(P, \rho, k)$，$w_k$ 即 $\operatorname{recordWeight}(P, \rho, k)$。
:::

最后，我们审计 `Conditioning.lean:108` 的**未读测量不动点充要定理**。这正是连接量子测量与自指方程 $\psi = \psi(\psi)$ 的严格算子判据（图 28 右栏）：把测量信道 $\mathcal{E}_P(\rho) = \operatorname{unreadState}(P, \rho)$ 视为观察者对自身状态空间的投影自映射，那么 $\rho$ 成为不动点 $\mathcal{E}_P(\rho) = \rho$ 的充要条件，恰好是所有异指标交叉块 $P_k \rho P_l$（$k \neq l$）全部消失。

::: {.figure src="ch28-fixed-skeleton"}
**不动点判据的两个方向，各三步。** 左列“⇒”从 $U(\rho) = \rho$ 出发，把 $\rho$ 换成 $U(\rho)$，左投影吸收后由正交性归零；右列“⇐”从交叉块为零出发，用完备性把 $P_k\rho$ 展开成和式，和式只剩对角那一项，再对 $k$ 求和回到 $\rho$。两列汇入绿色的 [@cor-audit-unread-fixed-iff]；图中 $U(\rho)$ 即 $\operatorname{unreadState}(P, \rho)$。
:::

::: {.corollary #cor-audit-unread-fixed-iff title="未读记录测量不动点与异分支交叉块归零的充要定理（内核审计版）" lean="D5/S3/Observer/Conditioning.unreadState_fixed_iff"}
设 $n$ 为具有可判等性的有限指标类型（`[Fintype n] [DecidableEq n]`），$\kappa$ 为有限结果类型（`[Fintype kappa]`），$P : \kappa \to M_n(\mathbb{C})$ 满足记录测量公理 `hP : IsRecordMeasurement P`，$\rho \in M_n(\mathbb{C})$ 为任意复方阵。则未读状态等于原状态，当且仅当所有相异分支之间的非对角投影块全为零：

$$
\operatorname{unreadState}(P, \rho) = \rho \;\Longleftrightarrow\; \forall k, l \in \kappa,\; k \neq l \longrightarrow P_k \rho P_l = 0.
$$
:::

::: proof
在 `D5/S3/Observer/Conditioning.lean:108` 中，双向等价证明极具对称美感：

1. **必要性（`→`）**：假设 `hFixed : unreadState P rho = rho`，并任取 $k, l \in \kappa$ 满足 `hkl : k ≠ l`。将目标左端 $P_k \rho P_l$ 中的 $\rho$ 按 `← hFixed` 改写为 $P_k \cdot \operatorname{unreadState}(P, \rho) \cdot P_l$。先由左投影引理 `left_project_unread hP rho k` 将前两项化简为 $P_k \rho P_k$，于是整体变为
   $$
   (P_k \rho P_k) P_l = P_k \rho (P_k P_l).
   $$
   由正交性 `hP.orthogonal k l hkl : P k * P l = 0`，右端立刻归零：$P_k \rho \cdot 0 = 0$！
2. **充分性（`←`）**：假设 `hOffDiagonal : ∀ k l, k ≠ l → P k * rho * P l = 0`。先证一个按行吸收引理 `hRow (k : kappa) : P k * rho = P k * rho * P k`：
   - 利用完备性公理 `hP.complete : ∑ l, P l = 1`，将左端改写为 $P_k \rho \cdot 1 = P_k \rho \bigl(\sum_{l \in \kappa} P_l\bigr) = \sum_{l \in \kappa} P_k \rho P_l$；
   - 调用 `Finset.sum_eq_single k`：对一切 $l \neq k$，由假设 `hOffDiagonal k l hlk.symm` 知 $P_k \rho P_l = 0$，故整条求和坍缩为对角单点项 $P_k \rho P_k$！
   - 最后对 $k \in \kappa$ 求和：
     $$
     \operatorname{unreadState}(P, \rho) = \sum_{k \in \kappa} P_k \rho P_k = \sum_{k \in \kappa} P_k \rho = \Bigl(\sum_{k \in \kappa} P_k\Bigr)\rho = 1 \cdot \rho = \rho.
     $$

完整证明由 Lean 内核检查。
:::

::: {.viz src="lean-declaration-map" preset="closure" height="500"}
**第二十八章解剖的四条。** 青色的线从第二十八章的柱脚连回第二、三章的四个绿色实心格；琥珀色框住的是未读不动点判据（[@cor-audit-unread-fixed-iff]），它第一次出场在第三章，琥珀色的线连到另外引用它的章。
:::

## 第四至六部冻结声明全景审计表 {#sec-parts-iv-to-vi-frozen-audit-table}

与上一章的第一至三部审计表相呼应，下表汇总了本书第四部（纠缠、贝尔边界与傅里叶对偶）、第五部（玻戈留波夫双曲变换、闵可夫斯基光锥刚性、规范完整群、张量网络流割与电路深度反例）以及第六部（对角拓扑逃逸、黎曼 $\zeta$ 欧拉乘积、艾森斯坦范数型与收缩不动点）在 `trureturing@dev`（提交 [{commit}](trureturing:)）中的精确源码坐标、语句摘要哈希前缀（`statement_id`）及形式化边界。

::: {.figure src="ch28-declaration-parts"}
**全书各部各引用了多少条冻结声明。** 每根柱子是一部，最后一根是终章与附录合在一起；柱高是该部各章用 `lean=` 引用的不同声明数（一条声明在两部都被引用时两部各算一次），柱上标着总数；下段绿色是锁文件里种类为定理的声明，上段灰色是定义与归纳类型。上方两道括号标出两章审计表各自覆盖的部：第二十七章是第一至第三部，本章是第四至第六部。图由脚本从 `trureturing.lock.json` 与中文章节算出。
:::

| 所属章节 | 冻结声明 GID | 源码路径与行号 | `statement_id` 前缀 | 精确形式化范围与契约边界 |
| :---------: | ---------------------------- | ---------------------------- | :------------------: | ----------------------------------------------------- |
| Ch 2 / Ch 28 | [`D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction`](lean:D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction) | [{source}](lean:D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction) | [{statement_id}](lean:D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction) | 秩一纯态与秩一投影下 $\operatorname{recordWeight}(P,\rho,k)=\norm{\operatorname{star}\phi\bullet_{v}\psi}^2$ |
| Ch 2 / Ch 28 | [`D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight) | [{source}](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight) | [{statement_id}](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight) | 秩一模方、迹配对与未读态加权条件态展开的三合取桥 |
| Ch 3 / Ch 28 | [`D5/S3/Observer/Conditioning.conditionalState_isState`](lean:D5/S3/Observer/Conditioning.conditionalState_isState) | [{source}](lean:D5/S3/Observer/Conditioning.conditionalState_isState) | [{statement_id}](lean:D5/S3/Observer/Conditioning.conditionalState_isState) | 非零权重 $w_k \neq 0$ 下吕德斯条件态保持正半定与单位迹 |
| Ch 3 / Ch 28 | [`D5/S3/Observer/Conditioning.unreadState_fixed_iff`](lean:D5/S3/Observer/Conditioning.unreadState_fixed_iff) | [{source}](lean:D5/S3/Observer/Conditioning.unreadState_fixed_iff) | [{statement_id}](lean:D5/S3/Observer/Conditioning.unreadState_fixed_iff) | $\operatorname{unreadState}(P,\rho)=\rho \iff \forall k\neq l,\; P_k\rho P_l = 0$ |
| Ch 13 | [`D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal`](lean:D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal) | [{source}](lean:D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal) | [{statement_id}](lean:D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal) | 贝尔纯态偏迹边缘态等于最大混合态 $\frac{1}{2}I_2$ |
| Ch 13 | [`D5/S3/QuantumBounds/LandauIdentity.landau_identity`](lean:D5/S3/QuantumBounds/LandauIdentity.landau_identity) | [{source}](lean:D5/S3/QuantumBounds/LandauIdentity.landau_identity) | [{statement_id}](lean:D5/S3/QuantumBounds/LandauIdentity.landau_identity) | 对合算子 CHSH 算符平方的朗道恒等式 $S^2 = 4I - [A_0,A_1][B_0,B_1]$ |
| Ch 13 | [`D5/S3/QuantumBounds/LandauCommutingCollapse.chsh_square_eq_four_of_local_pair_commutes`](lean:D5/S3/QuantumBounds/LandauCommutingCollapse.chsh_square_eq_four_of_local_pair_commutes) | [{source}](lean:D5/S3/QuantumBounds/LandauCommutingCollapse.chsh_square_eq_four_of_local_pair_commutes) | [{statement_id}](lean:D5/S3/QuantumBounds/LandauCommutingCollapse.chsh_square_eq_four_of_local_pair_commutes) | 一侧局域对合观测量可交换时 $S^2 = 4I$；只是算子恒等式，不陈述期望值上界 |
| Ch 13 | [`D5/S3/QuantumBounds/CHSHSpectrum.chsh_spectrum`](lean:D5/S3/QuantumBounds/CHSHSpectrum.chsh_spectrum) | [{source}](lean:D5/S3/QuantumBounds/CHSHSpectrum.chsh_spectrum) | [{statement_id}](lean:D5/S3/QuantumBounds/CHSHSpectrum.chsh_spectrum) | $0 < N < 4$ 且换位子项实谱 $\subseteq \{N, -N\}$ 时，CHSH 算子实谱 $\subseteq \{\pm\sqrt{4+N}, \pm\sqrt{4-N}\}$（只是包含关系） |
| Ch 13 | [`D5/S3/QuantumBounds/PeritoTsirelson.bell_value_le`](lean:D5/S3/QuantumBounds/PeritoTsirelson.bell_value_le) | [{source}](lean:D5/S3/QuantumBounds/PeritoTsirelson.bell_value_le) | [{statement_id}](lean:D5/S3/QuantumBounds/PeritoTsirelson.bell_value_le) | 有限维幺正策略的贝尔值 $\le 2/\sin(\pi/(2d))$，$d \ge 2$；$d = 2$ 时（手工推导）即 CHSH 的 $2\sqrt{2}$ |
| Ch 13 | [`D5/S3/QuantumBounds/TsirelsonTightness.bell_chsh_state_expectation_is_greatest`](lean:D5/S3/QuantumBounds/TsirelsonTightness.bell_chsh_state_expectation_is_greatest) | [{source}](lean:D5/S3/QuantumBounds/TsirelsonTightness.bell_chsh_state_expectation_is_greatest) | [{statement_id}](lean:D5/S3/QuantumBounds/TsirelsonTightness.bell_chsh_state_expectation_is_greatest) | 齐雷尔森 $2\sqrt{2}$ 上界及其在贝尔态上的紧性实现 |
| Ch 13 | [`D5/S3/QuantumBounds/ClassicalFiberBound.classical_chsh_bound_is_exact`](lean:D5/S3/QuantumBounds/ClassicalFiberBound.classical_chsh_bound_is_exact) | [{source}](lean:D5/S3/QuantumBounds/ClassicalFiberBound.classical_chsh_bound_is_exact) | [{statement_id}](lean:D5/S3/QuantumBounds/ClassicalFiberBound.classical_chsh_bound_is_exact) | 有限纤维、非负归一权重下确定性局域模型的 $\lvert\mathrm{CHSH}\rvert$ 集合以 $2$ 为最大元 |
| Ch 14 | [`D5/S3/Quantum/Recovery/OrthogonalSyndromeDecoding.orthogonal_syndrome_recovery`](lean:D5/S3/Quantum/Recovery/OrthogonalSyndromeDecoding.orthogonal_syndrome_recovery) | [{source}](lean:D5/S3/Quantum/Recovery/OrthogonalSyndromeDecoding.orthogonal_syndrome_recovery) | [{statement_id}](lean:D5/S3/Quantum/Recovery/OrthogonalSyndromeDecoding.orthogonal_syndrome_recovery) | 正交伴随式子空间投影解码的精确恢复定理 |
| Ch 14 | [`D5/S3/Quantum/CloningMachine.machine_reduced_spectrum`](lean:D5/S3/Quantum/CloningMachine.machine_reduced_spectrum) | [{source}](lean:D5/S3/Quantum/CloningMachine.machine_reduced_spectrum) | [{statement_id}](lean:D5/S3/Quantum/CloningMachine.machine_reduced_spectrum) | 归一化输入下 $\frac{1}{3}\psi\psi^{*} + \frac{2}{3}\psi^\perp(\psi^\perp)^{*}$ 的谱恰为 $\{\frac{1}{3}, \frac{2}{3}\}$ |
| Ch 15 | [`D5/S3/Fourier/FinitePoisson.finite_poisson_summation`](lean:D5/S3/Fourier/FinitePoisson.finite_poisson_summation) | [{source}](lean:D5/S3/Fourier/FinitePoisson.finite_poisson_summation) | [{statement_id}](lean:D5/S3/Fourier/FinitePoisson.finite_poisson_summation) | 循环群 $\mathrm{ZMod}\;m$ 的加法子群 $H$ 与对偶零化子上的有限泊松求和公式 |
| Ch 17 | [`D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation`](lean:D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation) | [{source}](lean:D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation) | [{statement_id}](lean:D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation) | 双曲归一化恒等式 $(\cosh r)^2 - (\sinh r)^2 = 1$ |
| Ch 17 | [`D5/S0/Certificates/MinkowskiNullConeRigidity.null_cone_spatial_rigidity`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.null_cone_spatial_rigidity) | [{source}](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.null_cone_spatial_rigidity) | [{statement_id}](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.null_cone_spatial_rigidity) | 闵可夫斯基零光锥（$t^2=x^2+y^2+z^2$）上消失二次型 $Q$ 的空间限制 $Q(0,x,y,z)=-Q(1,0,0,0)(x^2+y^2+z^2)$ 与零极化交叉项 |
| Ch 18 | [`D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification) | [{source}](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification) | [{statement_id}](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification) | 锚定闭合回路完整群相位的精确分类定理 |
| Ch 19 | [`D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowMinCut.result`](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowMinCut.result) | [{source}](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowMinCut.result) | [{statement_id}](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowMinCut.result) | 桥图张量网络量子最大流最小割定理 |
| Ch 20 | [`D5/S3/Quantum/Dynamics/OpenIntegrableCircuitDepthRefutation.result`](lean:D5/S3/Quantum/Dynamics/OpenIntegrableCircuitDepthRefutation.result) | [{source}](lean:D5/S3/Quantum/Dynamics/OpenIntegrableCircuitDepthRefutation.result) | [{statement_id}](lean:D5/S3/Quantum/Dynamics/OpenIntegrableCircuitDepthRefutation.result) | 开放可积系统电路深度朴素界的显式有限反例 |
| Ch 21 | [`D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_topological_settlement`](lean:D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_topological_settlement) | [{source}](lean:D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_topological_settlement) | [{statement_id}](lean:D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_topological_settlement) | 四合取结算：非细化（$\neg(\mathrm{Obs}\le\mathrm{Target})$）、目标可观测量不连续、分离赤字非空及添入对角见证后的严格拓扑细化 |
| Ch 21 | [`D5/S3/Observer/Linear/ExactTaylorObservationRemainder.exp_tail_le`](lean:D5/S3/Observer/Linear/ExactTaylorObservationRemainder.exp_tail_le) | [{source}](lean:D5/S3/Observer/Linear/ExactTaylorObservationRemainder.exp_tail_le) | [{statement_id}](lean:D5/S3/Observer/Linear/ExactTaylorObservationRemainder.exp_tail_le) | 完备赋范代数中 $\lVert\exp z - \sum_{k<n} z^k/k!\rVert \le \frac{r^n}{n!}e^r$（$\lVert z\rVert \le r$） |
| Ch 21 | [`D5/S3/Quantum/QuantumChannels/FiniteRecordCosineObstruction.finite_record_cosine_obstruction`](lean:D5/S3/Quantum/QuantumChannels/FiniteRecordCosineObstruction.finite_record_cosine_obstruction) | [{source}](lean:D5/S3/Quantum/QuantumChannels/FiniteRecordCosineObstruction.finite_record_cosine_obstruction) | [{statement_id}](lean:D5/S3/Quantum/QuantumChannels/FiniteRecordCosineObstruction.finite_record_cosine_obstruction) | 平移记录信道：任意恢复信道的最坏迹距离误差 $\ge \frac{1}{2}\bigl(1 - \cos\frac{\pi}{\lfloor N/\lvert\ell\rvert\rfloor + 2}\bigr) > 0$ |
| Ch 22 | [`D5/S3/Zeros/ZetaUpgrade.riemann_zeta_dirichlet_sum_eq_euler_product`](lean:D5/S3/Zeros/ZetaUpgrade.riemann_zeta_dirichlet_sum_eq_euler_product) | [{source}](lean:D5/S3/Zeros/ZetaUpgrade.riemann_zeta_dirichlet_sum_eq_euler_product) | [{statement_id}](lean:D5/S3/Zeros/ZetaUpgrade.riemann_zeta_dirichlet_sum_eq_euler_product) | 半平面 $\operatorname{Re}(s)>1$ 上黎曼 $\zeta(s)$ 级数与欧拉乘积恒等 |
| Ch 22 | [`D5/S3/Zeros/CompletedZeta.xi_reading_reflection`](lean:D5/S3/Zeros/CompletedZeta.xi_reading_reflection) | [{source}](lean:D5/S3/Zeros/CompletedZeta.xi_reading_reflection) | [{statement_id}](lean:D5/S3/Zeros/CompletedZeta.xi_reading_reflection) | 去极点 $\xi$ 读数的反射对称 $\xi(1 - s) = \xi(s)$（一切 $s \in \mathbb{C}$） |
| Ch 22 | [`D5/S3/Zeros/Symmetry/ZetaConjugationCovariance.riemann_zeta_conj`](lean:D5/S3/Zeros/Symmetry/ZetaConjugationCovariance.riemann_zeta_conj) | [{source}](lean:D5/S3/Zeros/Symmetry/ZetaConjugationCovariance.riemann_zeta_conj) | [{statement_id}](lean:D5/S3/Zeros/Symmetry/ZetaConjugationCovariance.riemann_zeta_conj) | $\zeta(\overline{s}) = \overline{\zeta(s)}$（一切 $s \in \mathbb{C}$） |
| Ch 22 | [`D5/S3/Zeros/Symmetry/ZetaConjugationCovariance.xi_reading_conj`](lean:D5/S3/Zeros/Symmetry/ZetaConjugationCovariance.xi_reading_conj) | [{source}](lean:D5/S3/Zeros/Symmetry/ZetaConjugationCovariance.xi_reading_conj) | [{statement_id}](lean:D5/S3/Zeros/Symmetry/ZetaConjugationCovariance.xi_reading_conj) | $\xi(\overline{s}) = \overline{\xi(s)}$（一切 $s \in \mathbb{C}$） |
| Ch 22 | [`D5/S3/Zeros/Symmetry/ZetaConjugationCovariance.xi_reading_one_sub_conj`](lean:D5/S3/Zeros/Symmetry/ZetaConjugationCovariance.xi_reading_one_sub_conj) | [{source}](lean:D5/S3/Zeros/Symmetry/ZetaConjugationCovariance.xi_reading_one_sub_conj) | [{statement_id}](lean:D5/S3/Zeros/Symmetry/ZetaConjugationCovariance.xi_reading_one_sub_conj) | $\xi(1-\overline{s}) = \overline{\xi(s)}$（一切 $s \in \mathbb{C}$） |
| Ch 22 | [`D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line`](lean:D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line) | [{source}](lean:D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line) | [{statement_id}](lean:D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line) | $\norm{(s-1)/s} = 1 \iff \operatorname{Re}(s) = \tfrac12$（一切 $s \in \mathbb{C}$） |
| Ch 22 | [`D5/S3/Midline/Cayley/CayleyCriticalLineZetaCriterion.cayley_critical_line_zeta_criterion`](lean:D5/S3/Midline/Cayley/CayleyCriticalLineZetaCriterion.cayley_critical_line_zeta_criterion) | [{source}](lean:D5/S3/Midline/Cayley/CayleyCriticalLineZetaCriterion.cayley_critical_line_zeta_criterion) | [{statement_id}](lean:D5/S3/Midline/Cayley/CayleyCriticalLineZetaCriterion.cayley_critical_line_zeta_criterion) | `RiemannHypothesis` 等价于每个非平凡零点的对数径向亏量为零（等价改写，非证明） |
| Ch 22 | [`D5/S3/Zeros/SymmetricPolynomial/FullSymmetryNonlocalization.full_symmetry_not_fixed_line_localization`](lean:D5/S3/Zeros/SymmetricPolynomial/FullSymmetryNonlocalization.full_symmetry_not_fixed_line_localization) | [{source}](lean:D5/S3/Zeros/SymmetricPolynomial/FullSymmetryNonlocalization.full_symmetry_not_fixed_line_localization) | [{statement_id}](lean:D5/S3/Zeros/SymmetricPolynomial/FullSymmetryNonlocalization.full_symmetry_not_fixed_line_localization) | $\delta,\gamma \ne 0$ 时离线四次式为整函数、具完全 $\zeta$ 对称性、恰有四个零点且全不在临界线上 |
| Ch 23 | [`D5/S3/PrimeForms/Crossing/CrossingNormForm.Qform_range_eq_eisNorm`](lean:D5/S3/PrimeForms/Crossing/CrossingNormForm.Qform_range_eq_eisNorm) | [{source}](lean:D5/S3/PrimeForms/Crossing/CrossingNormForm.Qform_range_eq_eisNorm) | [{statement_id}](lean:D5/S3/PrimeForms/Crossing/CrossingNormForm.Qform_range_eq_eisNorm) | 整二次型 $a^2-ab+b^2$ 值域与艾森斯坦整数环范数像恒等 |
| Ch 24 | [`D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize`](lean:D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize) | [{source}](lean:D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize) | [{statement_id}](lean:D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize) | 有限集 $X$ 上仅删减更新 $U(S)\subseteq S$ 必在 $\le (S_0).\mathrm{ncard}$ 步内达不动点 |
| Ch 24 | [`D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique`](lean:D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique) | [{source}](lean:D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique) | [{statement_id}](lean:D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique) | 黄金比正性（$0<\varphi$）、不动点方程 $\varphi=1+1/\varphi$（$\varphi^2=\varphi+1$）及正实数域 $(0,\infty)$ 上的唯一性 |
| Ch 24 | [`D5/S0/Diagonal/SelfApplicationFates.self_application_four_fates`](lean:D5/S0/Diagonal/SelfApplicationFates.self_application_four_fates) | [{source}](lean:D5/S0/Diagonal/SelfApplicationFates.self_application_four_fates) | [{statement_id}](lean:D5/S0/Diagonal/SelfApplicationFates.self_application_four_fates) | 非退化二元分式映射恰有一种自作用命运；`live` 当且仅当属于 $\varphi$ 族 |
| Ch 24 | [`D5/S3/Constants/PentagonCosines.pentagon_golden_cosines`](lean:D5/S3/Constants/PentagonCosines.pentagon_golden_cosines) | [{source}](lean:D5/S3/Constants/PentagonCosines.pentagon_golden_cosines) | [{statement_id}](lean:D5/S3/Constants/PentagonCosines.pentagon_golden_cosines) | $2\cos\frac{\pi}{5} = \varphi$、$2\cos\frac{2\pi}{5} = \varphi^{-1}$、两者之和为 $\sqrt{5}$、后者无理 |
| Ch 24 | [`D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed`](lean:D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed) | [{source}](lean:D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed) | [{statement_id}](lean:D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed) | $g\ a_0 = \operatorname{diagonal} f\ g \Rightarrow f(g\ a_0\ a_0) = g\ a_0\ a_0$ |
| Ch 24 | [`D5/S0/Diagonal/Lawvere/QualitativeEscape.self_application_fragment_package`](lean:D5/S0/Diagonal/Lawvere/QualitativeEscape.self_application_fragment_package) | [{source}](lean:D5/S0/Diagonal/Lawvere/QualitativeEscape.self_application_fragment_package) | [{statement_id}](lean:D5/S0/Diagonal/Lawvere/QualitativeEscape.self_application_fragment_package) | 无不动点扭转使一切列表逃逸（无有限性假设），且该前提不可去除 |
| Ch 24 | [`D5/S3/Geometry/FixedPoint/Brouwer.Brouwer`](lean:D5/S3/Geometry/FixedPoint/Brouwer.Brouwer) | [{source}](lean:D5/S3/Geometry/FixedPoint/Brouwer.Brouwer) | [{statement_id}](lean:D5/S3/Geometry/FixedPoint/Brouwer.Brouwer) | 标准单纯形 $\operatorname{stdSimplex}\ \mathbb{R}\ (\operatorname{Fin} n)$ 的连续自映射必有不动点 |
| Ch 24 | [`D5/S1/Phase/ContinuousAverage.continuous_average_tendsto_haar`](lean:D5/S1/Phase/ContinuousAverage.continuous_average_tendsto_haar) | [{source}](lean:D5/S1/Phase/ContinuousAverage.continuous_average_tendsto_haar) | [{statement_id}](lean:D5/S1/Phase/ContinuousAverage.continuous_average_tendsto_haar) | 无理旋转下连续函数的轨道平均趋于 Haar 积分（任意初相） |
| Ch 25 | [`D5/S3/Quantum/Algebra/WeylDisplacement.displacement_mul`](lean:D5/S3/Quantum/Algebra/WeylDisplacement.displacement_mul) | [{source}](lean:D5/S3/Quantum/Algebra/WeylDisplacement.displacement_mul) | [{statement_id}](lean:D5/S3/Quantum/Algebra/WeylDisplacement.displacement_mul) | $D(a,b)\,D(c,d) = \omega^{bc}\,D(a+c,\ b+d)$（一切 $a,b,c,d \in \mathbb{Z}_M$） |
| Ch 25 | [`D5/S3/Quantum/Algebra/WeylDisplacementAdjoint.displacement_adjoint`](lean:D5/S3/Quantum/Algebra/WeylDisplacementAdjoint.displacement_adjoint) | [{source}](lean:D5/S3/Quantum/Algebra/WeylDisplacementAdjoint.displacement_adjoint) | [{statement_id}](lean:D5/S3/Quantum/Algebra/WeylDisplacementAdjoint.displacement_adjoint) | $D(a,b)^{\dagger} = \omega^{ab}\,D(-a,-b)$ |
| Ch 25 | [`D5/S3/Quantum/Algebra/WeylDisplacement.displacement_comm`](lean:D5/S3/Quantum/Algebra/WeylDisplacement.displacement_comm) | [{source}](lean:D5/S3/Quantum/Algebra/WeylDisplacement.displacement_comm) | [{statement_id}](lean:D5/S3/Quantum/Algebra/WeylDisplacement.displacement_comm) | $\omega^{da}\,D(a,b)D(c,d) = \omega^{bc}\,D(c,d)D(a,b)$ |
| Ch 25 | [`D5/S3/Quantum/Algebra/WeylDisplacementConjugation.displacement_conjugation`](lean:D5/S3/Quantum/Algebra/WeylDisplacementConjugation.displacement_conjugation) | [{source}](lean:D5/S3/Quantum/Algebra/WeylDisplacementConjugation.displacement_conjugation) | [{statement_id}](lean:D5/S3/Quantum/Algebra/WeylDisplacementConjugation.displacement_conjugation) | $D(a,b)\,D(c,d)\,D(a,b)^{\dagger} = \omega^{bc-ad}\,D(c,d)$ |
| Ch 25 | [`D5/S3/Quantum/Algebra/WeylDisplacement.displacement_two_anticommute`](lean:D5/S3/Quantum/Algebra/WeylDisplacement.displacement_two_anticommute) | [{source}](lean:D5/S3/Quantum/Algebra/WeylDisplacement.displacement_two_anticommute) | [{statement_id}](lean:D5/S3/Quantum/Algebra/WeylDisplacement.displacement_two_anticommute) | $M = 2$：$D(0,1)D(1,0) = -D(1,0)D(0,1)$ |

::: {.viz src="lean-declaration-map" preset="table28" height="500"}
**审计表伸进第四至六部。** 第二十八章（连同上面的审计表）引用的 44 条声明描了青边：其中 36 条落在第四至六部，其余是第二、三章的四条审计定理与第二十五章的四条外尔位移定律。
:::

让我们通过一个具体数值算例，把本章的四条审计定理串联在同一个单量子比特态上。

::: {.example #ex-lean-audit-part4-6 title="单量子比特叠加态在 $Z$ 测量下的秩一玻恩权重、条件态与未读不动点核查"}
设 $n = \kappa = \operatorname{Fin} 2 = \{0, 1\}$，$Z$ 基秩一投影测量为 $P_0 = \lvert 0\rangle\langle 0\rvert = \operatorname{vecMulVec}(\phi_0, \operatorname{star}\phi_0)$、$P_1 = \lvert 1\rangle\langle 1\rvert = \operatorname{vecMulVec}(\phi_1, \operatorname{star}\phi_1)$，其中 $\phi_0 = (1, 0)$、$\phi_1 = (0, 1)$。取纯态向量 $\psi = (\frac{3}{5}, \frac{4}{5}i)$，对应密度矩阵

$$
\rho = \operatorname{vecMulVec}(\psi, \operatorname{star}\psi) = \begin{pmatrix} 9/25 & -12i/25 \\ 12i/25 & 16/25 \end{pmatrix}.
$$

1. **秩一模方归约（[@thm-audit-rank-one-born]）**：内积 $\operatorname{star}\phi_0 \bullet_{v} \psi = \frac{3}{5}$，$\operatorname{star}\phi_1 \bullet_{v} \psi = \frac{4}{5}i$，故记录权重为
   $$
   w_0 = \operatorname{recordWeight}(P, \rho, 0) = \Bigl|\frac{3}{5}\Bigr|^2 = \frac{9}{25} \neq 0, \qquad w_1 = \operatorname{recordWeight}(P, \rho, 1) = \Bigl|\frac{4}{5}i\Bigr|^2 = \frac{16}{25} \neq 0.
   $$
2. **吕德斯条件态与凸组合桥（[@prop-audit-conditional-state] 与 [@lemma-audit-born-pairing-weight]）**：因 $w_0, w_1 \neq 0$，两个分支的条件态分别为 $\rho_0 = (25/9) P_0 \rho P_0 = \lvert 0\rangle\langle 0\rvert$ 与 $\rho_1 = (25/16) P_1 \rho P_1 = \lvert 1\rangle\langle 1\rvert$，二者皆正半定且迹为 $1$；加权和给出未读态
   $$
   \rho' = \operatorname{unreadState}(P, \rho) = \frac{9}{25}\lvert 0\rangle\langle 0\rvert + \frac{16}{25}\lvert 1\rangle\langle 1\rvert = \begin{pmatrix} 9/25 & 0 \\ 0 & 16/25 \end{pmatrix}.
   $$
3. **未读不动点判据（[@cor-audit-unread-fixed-iff]）**：对初始纯态 $\rho$，异分支交叉块 $P_0 \rho P_1 = \begin{pmatrix} 0 & -12i/25 \\ 0 & 0 \end{pmatrix} \neq 0$，故 $\operatorname{unreadState}(P, \rho) \neq \rho$；而一旦经历一次未读测量到达对角混合态 $\rho'$，异分支交叉块化为 $P_0 \rho' P_1 = 0$ 且 $P_1 \rho' P_0 = 0$，于是 $\rho'$ 精确满足不动点方程 $\operatorname{unreadState}(P, \rho') = \rho'$！
:::

::: {.remark #rem-psi-fixed-point-synthesis-literature title="冯·诺依曼测量链、吕德斯规则与自指不动点综合（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 关于量子测量条件化、退相干不动点与自指不动点方程的经典文献背景如下：

1. **冯·诺依曼—吕德斯投影更新规则**（J. von Neumann, *Mathematische Grundlagen der Quantenmechanik*, Springer, 1932；G. Lüders, *Über die Zustandsänderung durch den Meßprozeß*, Annalen der Physik **443**(5–8), 322–328, 1950, DOI `10.1002/andp.19504430510`）：吕德斯将冯·诺依曼的一维投影测量推广到任意维正交投影族 $\{P_k\}$，给出了条件化更新 $\rho \mapsto P_k \rho P_k / \Tr(\rho P_k)$ 与非选择性对角挤压信道 $\rho \mapsto \sum_k P_k \rho P_k$。在本书的冻结定理 [@prop-audit-conditional-state] 与 [@cor-audit-unread-fixed-iff] 中，这两条规则在任意有限维完备正交投影族上得到了无漏洞的内核级形式化。
2. **题记 $\psi = \psi(\psi)$ 的哲学综合与形式化纪律边界**：在本书中，符号 $\psi = \psi(\psi)$ 是统摄多条严格不动点定理的**哲学与几何母题**，它在各章分别具象化为具体的绿色冻结定理：在[第三章](ch03-projectors-and-duality.md)与本章中体现为未读挤压算子的幂等性与零相干不动点判据 $\operatorname{unreadState}(P, \rho) = \rho$（[@cor-audit-pinching-idempotent]、[@cor-audit-unread-fixed-iff]）；在第二十一章中体现为观察拓扑对角见证的四合取逃逸结算；在第二十四章中体现为有限集删减更新 $U(S)\subseteq S$ 在 $(S_0).\mathrm{ncard}$ 步内达不动点以及正实数域上黄金不动点 $\varphi = 1 + 1/\varphi$ 的唯一性。遵循本书的验证契约，我们绝不将未形式化的宇宙学或意识哲学外推包装成 `LEAN ✓` 定理——每一分绿色的确定性，都精准停留在 Lean 4 内核所签发的定义、前提与结论之内。
:::

至此，第七部“构造与验证”的四章旅程已全部完成：我们亲手编写了零依赖的 3 比特克利福德几何代数与泡利辛重写法引擎（[第二十五章](ch25-rewriting-and-xor.md)），构造了单量子比特 ZYZ 欧拉转子编译器（[第二十六章](ch26-single-qubit-rotor-compilation.md)），并走入 `trureturing@dev` 的源码圣殿完成了全书前六部核心定理的逐行审计（[第二十七章](ch27-reading-frozen-proofs-i.md)与本章）。手握这套经内核锁定的几何与代数利器，让我们迈入第八部（[第二十九章](ch29-timeless-causality-and-gram-space.md)），直面无时间因果相容空间、计算复杂性视界与连续流体涡丝的终极贯通。
