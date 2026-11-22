# 35.6.7 跨切口 $1^K$ 禁戒与直接编码器的可达施密特秩 {#sec-ch39-p2e-entanglement}

设想把长度为 $m_X + m_Y$（$m_X, m_Y \ge 1$）的二元物理寄存器沿切口拆成左半 $X$（长 $m_X$）与右半 $Y$（长 $m_Y$）。即便左字 $x \in \{0, 1\}^{m_X}$ 与右字 $y \in \{0, 1\}^{m_Y}$ 各自内部都不含 $1^K$，拼接字 $xy$ 跨越切口时仍可能拼出连续 $K$ 个 `1`：记 $\tau(x)$ 为 $x$ 末尾连续 `1` 的个数，$\iota(y)$ 为 $y$ 开头连续 `1` 的个数，则跨切口拼接合法的充要条件恰为

$$
\tau(x) + \iota(y) < K.
$$

::: {.example #ex-ch39-fib-pyramid title="三位禁邻金字塔与端点联合概率"}
取 $K=2$，只看三个位置。中位为 $0$ 时，两端的四种取值给出正方形的四个角 `000`、`100`、`001`、`101`。中位为 $1$ 时两端只能为 $0$，给出顶点 `010`。合法字的概率律给出三个占位均值 $(\mu_1,\mu_2,\mu_3)$。这些均值构成五个顶点的凸包，恰由非负性和 $\mu_1+\mu_2\le1$、$\mu_2+\mu_3\le1$ 刻画。[三位占位金字塔](lean:D5/S1/Words/AdmissibleWords/PathStableSetPolytope.convexHull_three_pyramid)

令 $q=\Pr(101)$。按 `000`、`100`、`010`、`001`、`101` 的顺序，五个概率依次为 $1-\mu_1-\mu_2-\mu_3+q$、$\mu_1-q$、$\mu_2$、$\mu_3-q$、$q$。逐项要求非负就得到

$$
\max(0,\mu_1+\mu_2+\mu_3-1)\le q\le\min(\mu_1,\mu_3).
$$

例如，中位恒为 $0$ 时，从四个底面字各占 $1/4$ 改为 `000`、`101` 各占 $1/2$，两端的占位仍各为 $1/2$，共同占位概率却从 $1/4$ 变成 $1/2$。这个改动给四格表的对角各加 $1/4$，给反对角各减 $1/4$，保持了行和与列和。[§39.3](ch39-s26-axiom-omega-quantum-mechanics-five-postulates.md) 的固定种子构造也用到这个四格变换。知道每个字的计算基概率后，字与字之间的相对相位仍可变化，见 [@ex-ch39-p2e-phase-counterexample]。[FIB 原子理论卷 §2–4](https://github.com/the-omega-institute/trureturing-source-theories/blob/2a39da5107abbfa3a72cc883486dbc15a15994a1/docs/develop/theory/AURIC_FIB_ATOM_PYRAMID_BOUNDARY_CALCULUS.md#L178-L216)
:::

在 `trureturing` 的直接编码器模型中，给定整数 $N \ge 2$ 与阶数 $K \ge 2$，将 $\{0, 1, \dots, N\}$ 按是否为素数划分为非素数逻辑页（$b = \mathrm{false}$，维数 $M_0 > 0$）与素数逻辑页（$b = \mathrm{true}$，维数 $M_1 > 0$）。记 $C_{m, b}$ 为首比特等于 $b$ 的长度 $m$ 禁 $1^K$ 合法字集，其基数为 $c_{m, b} = |C_{m, b}|$；对每个阈值 $0 \le s < K$，定义左端低尾游程累计行数与右端相容邻域字数：

$$
a_s = \#\bigl\{x \in C_{m_X, 1} : \tau(x) < s\bigr\},\qquad n_s = \#\bigl\{y \in C_{m_Y, 1} : \iota(y) < K - s\bigr\},
$$

并据此定义两页的组合秩上界：

$$
R_0 = \min\bigl(c_{m_X, 0},\; \lfloor c_{m_Y, 0} / M_0 \rfloor\bigr),\qquad R_1 = \min\Bigl(c_{m_X, 1},\; \min_{0 \le s < K}\bigl(a_s + \lfloor n_s / M_1 \rfloor\bigr)\Bigr).
$$

称等距编码矩阵 $J : \mathbb{C}^{\mathrm{Logical}(N)} \to \mathbb{C}^{\{0,1\}^{m_X} \times \{0,1\}^{m_Y}}$ 与左寄存器页密度态 $\sigma_0, \sigma_1$ 满足**直接编码契约**（`directContract`），若：（i）$J^* J = I$；（ii）$X$ 与 $Y$ 两侧的首比特物理页投影均与逻辑页投影 $\Pi_b$ 交织，且 $\sigma_b$ 支撑在 $C_{m_X, b}$ 上；（iii）对一切逻辑算子 $A$ 成立部分迹替换律 $\operatorname{Tr}_Y(J A J^*) = \sum_{b \in \{0,1\}} \operatorname{Tr}(\Pi_b A)\,\sigma_b$；（iv）对一切逻辑输入态 $\psi$，凡跨切口拼接违背禁 $1^K$ 规则的字对 $(x, y)$ 其编码振幅恒为零 $(J\psi)(x, y) = 0$。在这一精确契约下，可达施密特秩与冯·诺依曼纠缠熵由以下充要定理完整锁定：

- [35.6.7.1 直接编码器的秩与纠缠熵](ch39-s05-s07-s01-rank-and-entropy.md)
- [35.6.7.2 局域父哈密顿量与热浴链](ch39-s05-s07-s02-parent-and-heatbath.md)
- [35.6.7.3 固定禁戒长度下的一致谱隙](ch39-s05-s07-s03-uniform-gap.md)
