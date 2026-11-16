# 14.2 Pauli 字与稳定子综合征 {#sec-pauli-syndrome-parity}

既然 [@thm-no-cloning-overlap] 禁止我们把任意未知叠加态 $\alpha\lvert 0\rangle + \beta\lvert 1\rangle$ 复制成 $(\alpha\lvert 0\rangle + \beta\lvert 1\rangle)^{\otimes 3}$，量子纠错码究竟靠什么施展魔法？

诀窍在于：**不复制整个叠加态，而是只把正交基嵌入多体纠缠空间**（例如将 $\lvert 0\rangle \mapsto \lvert 000\rangle$、$\lvert 1\rangle \mapsto \lvert 111\rangle$ 线性延拓为 $\alpha\lvert 0\rangle + \beta\lvert 1\rangle \mapsto \alpha\lvert 000\rangle + \beta\lvert 111\rangle$），然后不再测量任何会暴露 $\alpha, \beta$ 的局部单比特方向线，而是专门测量多体**泡利字（Pauli words）**的联合奇偶校验面！

::: {.figure src="ch14-syndrome-table"}
**校验读出错在哪一位，读不出 $\alpha$、$\beta$。** 四行依次是错误 $I$、$X_1$、$X_2$、$X_3$；每行左边是 $E\lvert 000\rangle$，右边是 $E\lvert 111\rangle$，被翻的那一位描成品红；每串旁的两盏灯是 $g_1 = Z_1Z_2$ 与 $g_2 = Z_2Z_3$，亮起（品红）表示读数 $-1$。四种错误亮四组不同的灯；同一行左右两串亮的灯一样，所以读灯分不出 $\lvert 000\rangle$ 与 $\lvert 111\rangle$，也就碰不到 $\alpha$、$\beta$。灯亮不亮的规则是下文 [@lemma-pauli-word-phase] 之后的模 $2$ 奇偶。
:::

为了在任意有限模式数 $N \in \mathbb{N}$ 与任意局部能级数 $p \in \mathbb{N}$（满足非零条件 `[NeZero p]`；注意此处 **$p$ 未要求是素数，且 $N$ 允许为 $0$**）的一般框架下刻画这套代数，源码模块 `StabilizerGenuineEntanglementCommutationRank` 定义了 $N$ 模式模 $p$ 泡利字结构 `PauliWord N p`，包含三个字段：

- 离散相位指标 $\mathrm{phase} : \mathrm{ZMod}\,p$；
- 位移（翻转）指数向量 $x : \mathrm{Fin}\,N \to \mathrm{ZMod}\,p$；
- 时钟（相位）指数向量 $z : \mathrm{Fin}\,N \to \mathrm{ZMod}\,p$。

记 $p$ 次本原单位根为 $\omega_p = \mathrm{windowRoot}\,p = \exp(2\pi i / p)$。在单个 $p$ 能级模式（$M_{\mathrm{Fin}\,p}(\mathbb{C})$）上，循环移位矩阵 $X$ 与对角时钟矩阵 $Z = \operatorname{diag}(\omega_p^{j.\mathrm{val}})$ 组成单模 Weyl 位移算子 $D(e, f) = X^{e.\mathrm{val}} Z^{f.\mathrm{val}}$（注意算子固定次序为先作用 $Z$、后作用 $X$）。由此，泡利字 $w \in \mathrm{PauliWord}\,N\,p$ 在 $N$ 模式联合空间 $(\mathrm{Fin}\,N \to \mathrm{Fin}\,p)$ 上对应的矩阵算子定义为

$$
\bigl(\mathrm{pauliWordOperator}(w)\bigr)_{u, v} = \omega_p^{w.\mathrm{phase}.\mathrm{val}} \prod_{n \in \mathrm{Fin}\,N} D(w.x_n, w.z_n)_{u_n, v_n},
$$

而两个泡利字 $a, b$ 的形式字乘积定义为各字段在 $\mathrm{ZMod}\,p$ 中的逐分量加法：

$$
\mathrm{wordMul}(a, b) = \bigl(a.\mathrm{phase} + b.\mathrm{phase},\; a.x + b.x,\; a.z + b.z\bigr).
$$

当两个泡利字算子相乘时，由于每个格点 $n$ 上左侧的 $Z^{a.z_n}$ 必须跨过右侧的 $X^{b.x_n}$ 才能归并成标准次序 $X^{a.x_n + b.x_n} Z^{a.z_n + b.z_n}$，每一次跨越都会因为非对易关系 $Z^{a.z_n} X^{b.x_n} = \omega_p^{(a.z_n b.x_n).\mathrm{val}} X^{b.x_n} Z^{a.z_n}$ 吐出一枚交叉相位！下面的引理精确锁定了这一核心乘法法则。

::: {.lemma #lemma-pauli-word-phase title="多模广义泡利字算子的乘法与交叉相位引理" lean="D5/S3/Quantum/Codes/StabilizerGenuineEntanglementCommutationRank.pauli_word_mul"}
设 $N, p \in \mathbb{N}$ 且满足 `[NeZero p]`。对任意两个泡利字 $a, b : \mathrm{PauliWord}\,N\,p$，其对应矩阵算子的乘积恒等于

$$
\begin{aligned}
&\mathrm{pauliWordOperator}(a) \cdot \mathrm{pauliWordOperator}(b) \\
&= \mathrm{windowRoot}(p)^{\bigl(\sum_{n \in \mathrm{Fin}\,N} a.z_n \cdot b.x_n\bigr).\mathrm{val}} \bullet \mathrm{pauliWordOperator}\bigl(\mathrm{wordMul}(a, b)\bigr).
\end{aligned}
$$
:::

::: proof
在每个模式 $n \in \mathrm{Fin}\,N$ 上，单模 Weyl 算子的乘积为 $D(a.x_n, a.z_n) D(b.x_n, b.z_n) = X^{a.x_n.\mathrm{val}} Z^{a.z_n.\mathrm{val}} X^{b.x_n.\mathrm{val}} Z^{b.z_n.\mathrm{val}}$。利用时钟矩阵与循环移位矩阵的交换关系 $Z^{a.z_n.\mathrm{val}} X^{b.x_n.\mathrm{val}} = \omega_p^{(a.z_n \cdot b.x_n).\mathrm{val}} X^{b.x_n.\mathrm{val}} Z^{a.z_n.\mathrm{val}}$，以及循环群与对角相位在模 $p$ 加法下的周期性 $X^{(a.x_n + b.x_n).\mathrm{val}}$、$Z^{(a.z_n + b.z_n).\mathrm{val}}$，单模乘积化为 $\omega_p^{(a.z_n \cdot b.x_n).\mathrm{val}} D(a.x_n + b.x_n, a.z_n + b.z_n)$。对全体 $n \in \mathrm{Fin}\,N$ 求乘积，将各模式的交叉相位指数在 $\mathrm{ZMod}\,p$ 中相加为 $\sum_{n} a.z_n \cdot b.x_n$，同时外部固有相位 $\omega_p^{a.\mathrm{phase}.\mathrm{val}} \omega_p^{b.\mathrm{phase}.\mathrm{val}} = \omega_p^{(a.\mathrm{phase} + b.\mathrm{phase}).\mathrm{val}}$ 归入 $\mathrm{wordMul}(a, b)$ 的相位字段，即得结论。完整证明由 Lean 内核检查。
:::

请仔细留意 [@lemma-pauli-word-phase] 中的精妙分工：

1. **绝不能漏掉外部交叉相位标量**：在源码定义中，形式加法 $\mathrm{wordMul}(a, b)$ 的 `phase` 字段只负责把两人原有的相位 $a.\mathrm{phase} + b.\mathrm{phase}$ 相加；所有因非对易跨越产生的交叉相位 $\omega_p^{(\sum_n a.z_n b.x_n).\mathrm{val}}$ **全部以标量数乘 $\bullet$ 的形式立在 $\mathrm{pauliWordOperator}(\mathrm{wordMul}(a,b))$ 外部**。哪怕在最熟悉的多量子比特情形 $p = 2$（$\omega_2 = -1$）下，单模算子依然严格按 $X^{x_n} Z^{z_n}$ 排列，每一次 $Z X = -X Z$ 都会通过指数 $(a.z_n \cdot b.x_n).\mathrm{val}$ 贡献一个负号 $(-1)$，绝不能在计算中忽略。
2. **从双向交叉相位差导出辛内积与稳定子综合征**：由于 $\mathrm{wordMul}(a, b) = \mathrm{wordMul}(b, a)$，若我们将 [@lemma-pauli-word-phase] 正向乘一次 $(a \cdot b)$、反向乘一次 $(b \cdot a)$，两者的唯一差别就在于外部指数从 $\sum_n a.z_n b.x_n$ 变成了 $\sum_n b.z_n a.x_n$！特别地，当 $p = 2$ 时，稳定子校验算子 $a$ 与错误算子 $b$ 是对易（特征值 $+1$，无警报）还是反对易（特征值 $-1$，拉响警报），完全由模 $2$ 二元辛奇偶校验和

   $$
   \langle a, b\rangle_{\mathrm{symp}} = \sum_{n \in \mathrm{Fin}\,N} \bigl(a.z_n b.x_n + a.x_n b.z_n\bigr) \pmod 2
   $$

   决定！需要强调的是，[@lemma-pauli-word-phase] 本身是泡利字算子的精确代数乘法引理；至于如何利用这套综合征在不破坏逻辑态的前提下完整恢复受损信息，还需要引入码空间与正交综合征投影的恢复架构——这正是下一节的主题。

::: {.viz src="syndrome-decoding" preset="single" height="500"}
**一盏灯指出翻了哪一个比特。** 三比特重复码的两道校验 $g_1 = Z_1Z_2$、$g_2 = Z_2Z_3$ 跨在相邻两个比特之上。第一个比特翻了（品红的 X），只有跨在它上面的 $g_1$ 亮起（品红），$g_2$ 不亮：$X_1$ 与 $g_1$ 反对易、与 $g_2$ 对易，正是上式的模 $2$ 奇偶，交叉相位来自 [@lemma-pauli-word-phase]。解码器照灯翻回第一个比特（琥珀色），青色的柱子回到码空间，落在虚线上。
:::
