# 24.1 离散收缩的必然收束：有限收缩更新稳定化定理 {#sec-ch24-1}

第二十一章中，带无不动点翻转 `twist` 的对角线会逃出给定目录；而有些反馈更新却能停在不动点上。哪些额外条件保证稳定？

这里先比较两种不同的稳定机制。在连续区间 $[0, 1]$ 上，$\cos$ 的导数模长满足 $|\cos'\theta| = |\sin\theta| \le \sin 1 < 1$，因而它压缩任意两点之间的距离，迭代趋于唯一不动点。有限集合更新则只要求**不增加候选**：$U : \mathcal{P}(X) \to \mathcal{P}(X)$ 满足 $\forall A \subseteq X,\; U(A) \subseteq A$。这种向内筛除是序关系条件，不是度量压缩，也不要求 $U$ 保持任意两个集合之间的包含关系；有限性保证筛除过程终会停止。

让我们在 Lean 模块 `D5/S1/FixedPoints/FiniteContractingStability` 中，严格建立这条离散收缩稳定化定理。请特别留意定理盒内完整保留的每一项前提（有限类型 `[Finite X]`、逐点子集收缩 `hU : ∀ A, U A ⊆ A` 与递推更新律 `hS : ∀ n, S (n + 1) = U (S n)`）及其双重结论：不仅序列必在至多 $|S_0|$ 步内抵达不动点 $U(S_N) = S_N$，而且在整个无穷时间轴上发生严格状态改变的步数总和也受到初始规模 $|S_0|$ 的精确上界约束！

::: {.theorem #thm-finite-contracting-updates-stabilize title="有限状态空间上收缩集合更新的稳定化与严格变化次数上界定理" lean="D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize"}
设 $X$ 为有限类型（`[Finite X]`），$U : \operatorname{Set} X \to \operatorname{Set} X$ 为集合更新映射，$S : \mathbb{N} \to \operatorname{Set} X$ 为子集序列。若同时满足：

1. **逐点向内收缩性（`hU`）**：对任意子集 $A \subseteq X$，均有 $U(A) \subseteq A$；
2. **递推演化律（`hS`）**：对任意步数 $n \in \mathbb{N}$，均有 $S(n + 1) = U(S(n))$；

则以下两项结论同时成立（其中 `.ncard` 表示集合的自然数基数）：

1. **有限步内抵达不动点并永久稳定**：存在稳定化步数 $N \le (S(0)).\mathrm{ncard}$，使得对一切 $n \ge N$ 均有

   $$
   S(n) = S(N) \qquad \bigl(\text{特别地 } U(S(N)) = S(N+1) = S(N)\bigr)\,;
   $$

2. **严格变化步数的精确上界**：序列发生严格改变的时刻集合之基数不超过初始集合基数：

   $$
   \bigl\{\, n \in \mathbb{N} \;\big|\; S(n + 1) \neq S(n) \,\bigr\}.\mathrm{ncard} \;\le\; (S(0)).\mathrm{ncard}.
   $$
:::

::: proof
首先由 `hS` 与 `hU` 知对每个 $n \in \mathbb{N}$ 有 $S(n+1) = U(S(n)) \subseteq S(n)$，故集合序列 $S$ 单调递减（`Antitone S`），其有限基数序列 $n \mapsto (S(n)).\mathrm{ncard} \in \mathbb{N}$ 亦单调非增。其次，一旦某一步基数停止下降，即 $(S(n)).\mathrm{ncard} = (S(n+1)).\mathrm{ncard}$，由于有限集的子集与母集基数相等必全等（`Set.eq_of_subset_of_ncard_le`），立得集合不动点 $S(n+1) = S(n)$；两边再作用算子 $U$ 并由 `hS` 递推，即得 $S(n+2) = U(S(n+1)) = U(S(n)) = S(n+1)$，从而后续所有步的集合与基数全部锁死不变。对非增自然数序列应用 Mathlib 的稳定化引理 `Nat.stabilises_of_antitone`，即得存在 $N \le (S(0)).\mathrm{ncard}$ 使对一切 $n \ge N$ 均有 $S(n) = S(N)$（结论 1）。再证结论 2：对任意 $n \ge N$，因 $n+1 \ge N$，有 $S(n+1) = S(N) = S(n)$，故一切满足 $S(n+1) \neq S(n)$ 的严格变化下标 $n$ 必落在有限初始段 $\operatorname{Set.Iio}(N) = \{0, 1, \dots, N-1\}$ 内。由子集基数单调性知严格变化时刻的个数不超过 $|\operatorname{Iio}(N)| = N \le (S(0)).\mathrm{ncard}$。完整证明由 Lean 内核检查。
:::

[@thm-finite-contracting-updates-stabilize] 为有限候选筛除提供了离散基石：在它的更新律下，至多 $|S_0|$ 步后便有 $U(S_N)=S_N$。这个稳定集可以依赖初始集，也可以为空。例如 $U(A)=A$ 使每个集合都是不动点，$U(A)=\varnothing$ 则将全部候选删空；二者都满足前提。因此，唯一性或非空“自洽内核”都需要额外条件，不能从筛除稳定化推出。

::: {.figure src="ch24-three-stops"}
**都会停下，停在哪里却不一定。** 三行都从 $S_0 = \{0, 1, 2\}$ 出发，每向右一格作用一次更新，直到相邻两格相同；停下的那一格用青色框出，旁边的小圈箭头表示再作用一次还是它。第一行是正文例子“删去大于 $0$ 的最大元”，停在 $\{0\}$；第二行 $U(A) = A$ 一开始就停在 $\{0, 1, 2\}$；第三行 $U(A) = \varnothing$ 停在空集。三行都满足 [@thm-finite-contracting-updates-stabilize] 的前提，都在 $|S_0| = 3$ 步之内停下。
:::
