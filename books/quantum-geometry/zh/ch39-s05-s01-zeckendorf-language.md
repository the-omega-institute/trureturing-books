# 35.6.1 齐肯多夫禁邻语言：从 $K=2$ 防进位编码起步 {#sec-ch39-p2e-zeckendorf}

一切始于最底层的局部防进位规则。在阶数 $K = 2$ 时，二元齐肯多夫自动机处理的字载体为 `List (Fin 2)`：本章 §38.2 已锁定的冻结定理 [`base_success_iff_noAdjacentOnes`](lean:D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes)（[@thm-ch39-fiber-reconstruction-and-zeckendorf-thread] 第 3 款）证明，该自动机接受一个二元数字列表，当且仅当其中不出现相邻的两个 `1`（`NoAdjacentOnes`）。将局部禁戒窗口从 $2$ 推广到任意阶数 $K \ge 2$，`trureturing` 在函数载体 `Fin Q → Bool` 上定义长度为 $Q$ 且不含连续 $K$ 个 `true` 的合法字类型 `DBonacciName K Q`（从 `List (Fin 2)` 到定长布尔函数需经显式载体转换）。

计数定理 [`dbonacci_name_card`](lean:D5/S0/Tower/DBonacci/Names.dbonacci_name_card) 给出任意阶数 $d \ge 2$ 与字长 $Q \in \mathbb{N}$ 的精确基数归一化：

$$
\bigl|\operatorname{DBonacciName}(K, Q)\bigr| = \operatorname{dbonacci}(K, Q + 2),
$$

其递推满足 $C_K(n + K) = \sum_{i=0}^{K-1} C_K(n + i)$。当字长尚未触及禁戒阈值（$Q < K$）时，短前缀定理 [`dbonacci_name_card_of_lt`](lean:D5/S0/Tower/DBonacci/Names.dbonacci_name_card_of_lt) 证明不发生任何截断，合法字数恰为全二元树的 $2^Q$；一旦 $Q \ge K$，满载的 $1^K$ 分支被精确剪除。在 $K = 2$ 时，$Q = 0, 1, 2, 3, 4, 5$ 的合法字数依次为斐波那契数 $F_{Q+2} = 1, 2, 3, 5, 8, 13$；在 $K = 3$（禁 `111`）时，$Q = 0, 1, 2, 3, 4$ 的合法字数依次为 $1, 2, 4, 7, 13$。与此同时，有限名称网格在深度 $Q$ 处呈现 $\min(K, Q)$ 种不同的相邻间隙长度——仅当 $Q \ge K$ 时才稳定展现全部 $K$ 种尺度。

::: {.viz src="pisot-clifford-rauzy-sandtable" preset="zeckendorf" height="500"}
**齐肯多夫禁邻语言卡（`zeckendorf`）**：展示阶数 $K = 2$ 下长度递增的二元字树。青色节点与路径标出不含相邻 `11` 的合法字，品红叉号标出刚触及 `11` 即被剪除的禁戒分支，琥珀色高亮当前选中的字长层 $Q$ 与对应斐波那契计数 $F_{Q+2}$。自动机等价性（[@thm-ch39-fiber-reconstruction-and-zeckendorf-thread] 第 3 款）与精确字数公式属 `LEAN ✓`。
:::

当观察者把禁戒窗口从 $K = 2$ 放宽到一般的 $K \ge 2$ 时，离散字数的渐近增长率便由一条统一的特征多项式接管。
