# 35.6.7 跨切口 $1^K$ 禁戒与直接编码器的可达施密特秩 {#sec-ch39-p2e-entanglement}

设想把长度为 $m_X + m_Y$（$m_X, m_Y \ge 1$）的二元物理寄存器沿切口拆成左半 $X$（长 $m_X$）与右半 $Y$（长 $m_Y$）。即便左字 $x \in \{0, 1\}^{m_X}$ 与右字 $y \in \{0, 1\}^{m_Y}$ 各自内部都不含 $1^K$，拼接字 $xy$ 跨越切口时仍可能拼出连续 $K$ 个 `1`：记 $\tau(x)$ 为 $x$ 末尾连续 `1` 的个数，$\iota(y)$ 为 $y$ 开头连续 `1` 的个数，则跨切口拼接合法的充要条件恰为

$$
\tau(x) + \iota(y) < K.
$$

在 `trureturing` 的直接编码器模型中，给定整数 $N \ge 2$ 与阶数 $K \ge 2$，将 $\{0, 1, \dots, N\}$ 按是否为素数划分为非素数逻辑页（$b = \mathrm{false}$，维数 $M_0 > 0$）与素数逻辑页（$b = \mathrm{true}$，维数 $M_1 > 0$）。记 $C_{m, b}$ 为首比特等于 $b$ 的长度 $m$ 禁 $1^K$ 合法字集，其基数为 $c_{m, b} = |C_{m, b}|$；对每个阈值 $0 \le s < K$，定义左端低尾游程累计行数与右端相容邻域字数：

$$
a_s = \#\bigl\{x \in C_{m_X, 1} : \tau(x) < s\bigr\},\qquad n_s = \#\bigl\{y \in C_{m_Y, 1} : \iota(y) < K - s\bigr\},
$$

并据此定义两页的组合秩上界：

$$
R_0 = \min\bigl(c_{m_X, 0},\; \lfloor c_{m_Y, 0} / M_0 \rfloor\bigr),\qquad R_1 = \min\Bigl(c_{m_X, 1},\; \min_{0 \le s < K}\bigl(a_s + \lfloor n_s / M_1 \rfloor\bigr)\Bigr).
$$

称等距编码矩阵 $J : \mathbb{C}^{\mathrm{Logical}(N)} \to \mathbb{C}^{\{0,1\}^{m_X} \times \{0,1\}^{m_Y}}$ 与左寄存器页密度态 $\sigma_0, \sigma_1$ 满足**直接编码契约**（`directContract`），若：（i）$J^* J = I$；（ii）$X$ 与 $Y$ 两侧的首比特物理页投影均与逻辑页投影 $\Pi_b$ 交织，且 $\sigma_b$ 支撑在 $C_{m_X, b}$ 上；（iii）对一切逻辑算子 $A$ 成立部分迹替换律 $\operatorname{Tr}_Y(J A J^*) = \sum_{b \in \{0,1\}} \operatorname{Tr}(\Pi_b A)\,\sigma_b$；（iv）对一切逻辑输入态 $\psi$，凡跨切口拼接违背禁 $1^K$ 规则的字对 $(x, y)$ 其编码振幅恒为零 $(J\psi)(x, y) = 0$。在这一精确契约下，可达施密特秩与冯·诺依曼纠缠熵由以下充要定理完整锁定：

::: {.theorem #thm-ch39-p2e-direct-encoder-ranks title="K-Bonacci 直接编码器的可达页秩矩形与冯·诺依曼纠缠熵极值定理" lean="D5/S3/Quantum/Entanglement/KBonacciDirectRankEntropy.complete_original_direct_rank_entropy"}
对任意整数 $N \ge 2$、$K \ge 2$ 与块长 $m_X, m_Y \ge 1$，非素数与素数逻辑页维数均严格为正（$M_0 > 0,\; M_1 > 0$）。记页秩 $r_b = \operatorname{rank}(\sigma_b)$（$b \in \{0, 1\}$），$R_0, R_1$ 如上式所定义，则：

1. **秩上界与谱分解必要性**：凡满足 `directContract` 的编码对 $(J, \sigma)$ 必满足 $r_0 \le R_0$、$r_1 \le R_1$ 以及第 $1$ 页的全行谱分解必要条件（`totalRowSpectralNecessity`）；
2. **可达页秩充要矩形**：对任意自然数对 $(d_0, d_1)$，存在联合选定的 $(J, \sigma)$ 满足 `directContract` 且 $(r_0, r_1) = (d_0, d_1)$，当且仅当 $1 \le d_0 \le R_0$ 且 $1 \le d_1 \le R_1$；特别地，合法直接编码器存在当且仅当 $R_0 \ge 1$ 且 $R_1 \ge 1$；
3. **页纯态施密特秩恒等式**：若满足 `directContract`，则对完全支撑在第 $b$ 逻辑页内的任意归一化纯态 $\psi$，其编码双体态 $J\psi$ 跨 $X \mid Y$ 切口的施密特秩恒等于页密度矩阵秩 $r_b = \operatorname{rank}(\sigma_b)$；
4. **冯·诺依曼熵紧上界与联合同时可达性**：凡满足 `directContract` 的 $(J, \sigma)$ 均满足自然对数单位下的熵上界 $S(\sigma_0) \le \ln R_0$ 与 $S(\sigma_1) \le \ln R_1$；且只要 $R_0 \ge 1$ 且 $R_1 \ge 1$，存在同一组联合构造 $(J, \sigma)$ 同时达到四角极值 $r_0 = R_0$、$r_1 = R_1$、$S(\sigma_0) = \ln R_0$ 与 $S(\sigma_1) = \ln R_1$。
:::

::: proof
必要性由编码器谱阻塞定理 [`actual_encoder_spectral_obstruction`](lean:D5/S3/Quantum/Entanglement/KBonacciDirectSupportObstruction.actual_encoder_spectral_obstruction) 给出：对任意满足 `directContract` 的给定编码器，在 $\sigma_b$ 的非零本征子空间上分解等距算子 $W$，跨切口禁戒 $\tau(x) + \iota(y) < K$ 迫使凡满足 $\tau(x) \ge s$ 的左端加权行张成的子空间 $V_s$ 在右端只能支撑于基数为 $n_s$ 的合法邻域内；由于 $M_1$ 个正交逻辑态在右端互不重叠，必有 $M_1 \dim V_s \le n_s$，从而 $r_1 \le a_s + \dim V_s \le a_s + \lfloor n_s / M_1 \rfloor$ 对一切 $0 \le s < K$ 成立，第 $0$ 页同理得 $r_0 \le \min(c_{m_X, 0}, \lfloor c_{m_Y, 0}/M_0 \rfloor) = R_0$。充分性与同时极值构造则通过在各游程分层内显式配对正交右端字块并以均匀本征值 $1/d_b$（极值处取 $1/R_b$）组装 $\sigma_b$ 与 $J$ 完成；由支撑秩为 $r_b$ 的密度态最大冯·诺依曼熵不超过 $\ln r_b \le \ln R_b$ 即得紧熵界（这组跨切口秩界与[第 36 章](ch38-observer-memory-pointer-and-ontological-qram.md)指针历史容量界 [@thm-ch38-pointer-width-and-no-deep-copy] 刻画的是不同物理约束）。完整证明由 Lean 内核检查。
:::

[@thm-ch39-p2e-direct-encoder-ranks] 揭示了一条极易被口号掩盖的关键事实：**直接编码器的施密特秩并不普遍恒等于 $K$！** 只有当参数满足 $1 \le K \le R_b$ 时，秩等于 $K$ 才是可达矩形 $[1, R_0] \times [1, R_1]$ 中的**一个条件性可选值**。以独立枚举的具体参数 $N = 2,\; K = 3,\; m_X = 4,\; m_Y = 5$ 为例（`NUM`）：$\{0, 1, 2\}$ 中非素数页 $\{0, 1\}$ 维数 $M_0 = 2$，素数页 $\{2\}$ 维数 $M_1 = 1$；直接清点禁 `111` 字可得 $c_4 = (7, 6)$、$c_5 = (13, 11)$，且第 $1$ 页各阈值计数值为 $(a_0, a_1, a_2) = (0, 3, 5)$ 与 $(n_0, n_1, n_2) = (11, 7, 0)$，代入公式给出

$$
R_0 = \min\bigl(7, \lfloor 13 / 2 \rfloor\bigr) = 6,\qquad R_1 = \min\bigl(6, \min(0 + 11,\; 3 + 7,\; 5 + 0)\bigr) = 5.
$$

此时区间 $1 \le r_0 \le 6$ 与 $1 \le r_1 \le 5$ 内的任意整点秩对均可实现：$r_0 = r_1 = K = 3$ 只是其中一种合法选择，而最大可达秩实为 $(6, 5)$，对应最大页纠缠熵 $(\ln 6, \ln 5)$。

::: {.example #ex-ch39-p2e-positive-ket-handcalculation title="手算：同一切口上的正等幅合法字态"}
这是指定有限态的纸面计算，不是新增的 Lean 验证定理。取 $m=n=1$（即 $m_X=m_Y=1$），沿 $X\mid Y$ 切开两比特字。$K=2$ 时，合法字恰为 $00,01,10$；选择正等幅相干态

$$
\lvert\psi\rangle=\frac{\lvert00\rangle+\lvert01\rangle+\lvert10\rangle}{\sqrt3},
\qquad \langle\psi\mid\psi\rangle=\frac{3}{3}=1.
$$

两侧均按字序 $0,1$ 排列，系数矩阵与部分迹为

$$
\begin{aligned}
M&=\frac1{\sqrt3}\begin{pmatrix}1&1\\1&0\end{pmatrix},\\
\rho_X&=\operatorname{Tr}_Y(\lvert\psi\rangle\langle\psi\rvert)
=MM^*=\frac13\begin{pmatrix}2&1\\1&1\end{pmatrix}.
\end{aligned}
$$

具体地，$\rho_{xx'}=\sum_{y=0}^1 M_{xy}\overline{M_{x'y}}$：$00$ 与 $10$ 共享右字 $y=0$，故留下非对角元 $\rho_{01}=\rho_{10}=1/3$。因此

$$
\begin{aligned}
\det(tI-\rho_X)&=t^2-t+\frac19,\\
\lambda_+&=\frac{3+\sqrt5}{6},\qquad
\lambda_-=\frac{3-\sqrt5}{6}.
\end{aligned}
$$

两本征值各有重数 $1$，均为正且和为 $1$；约化秩为 $2$，施密特系数为 $\sqrt{\lambda_+},\sqrt{\lambda_-}$。以自然对数计，纠缠熵是

$$
S(\rho_X)=-\lambda_+\ln\lambda_+-\lambda_-\ln\lambda_->0.
$$

仅数出三个字或取 $\ln3$ 都不能得到这个熵；将三字等概率混成对角经典混合态，会抹去上述相干项。

同一切口上，每个 $K\ge3$ 都允许全部四字 $00,01,10,11$。此时所选正等幅态为

$$
\begin{aligned}
\lvert\psi\rangle&=\frac{\lvert00\rangle+\lvert01\rangle+\lvert10\rangle+\lvert11\rangle}{2}
=\lvert+\rangle\otimes\lvert+\rangle,\\
\lvert+\rangle&=\frac{\lvert0\rangle+\lvert1\rangle}{\sqrt2},\qquad
\langle\psi\mid\psi\rangle=4\left(\frac12\right)^2=1,\\
\rho_X&=\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix}.
\end{aligned}
$$

其本征值 $1,0$ 各有重数 $1$，约化秩为 $1$，唯一非零施密特系数为 $1$，故 $S(\rho_X)=0$（约定 $0\ln0=0$）。这里在所有合法字上指定态，未固定首比特页，也未施加逻辑 `directContract`；前一定理则在该契约下联合选择编码器与页态，刻画可达秩与熵极值。本例不确定物理基态，也不推出一般固定 $K$ 的熵极限；后文开放问题仍然开放。
:::

::: {.example #ex-ch39-p2e-phase-counterexample title="手算：概率相同，纠缠不同"}
沿用前例的 $m=n=1$ 与 $X\mid Y$ 切口，固定任意 $K\ge3$；合法字恰为 $00,01,10,11$。
比较 $\lvert\psi_+\rangle=(\lvert00\rangle+\lvert01\rangle+\lvert10\rangle+\lvert11\rangle)/2$ 与 $\lvert\psi_{\mathrm{phase}}\rangle=(\lvert00\rangle+\lvert01\rangle+\lvert10\rangle-\lvert11\rangle)/2$：只将 $11$ 振幅的相位改为 $\pi$。
两态的范数平方均为 $4(1/4)=1$，在计算基中每个字的概率均为 $1/4$。两侧按 $0,1$ 排列，后一态给出

$$
\begin{aligned}
M_{\mathrm{phase}}&=\frac12\begin{pmatrix}1&1\\1&-1\end{pmatrix},\\
\rho_X&=\operatorname{Tr}_Y(\lvert\psi_{\mathrm{phase}}\rangle\langle\psi_{\mathrm{phase}}\rvert)=M_{\mathrm{phase}}M_{\mathrm{phase}}^*\\
&=\frac14\begin{pmatrix}1+1&1-1\\1-1&1+1\end{pmatrix}=\frac{I_2}{2}.
\end{aligned}
$$

部分迹中，右字 $y=0,1$ 对非对角元的贡献分别为 $1/4,-1/4$，恰好抵消。约化谱按重数列为 $(1/2,1/2)$（本征值 $1/2$ 的重数为 $2$），施密特系数为 $1/\sqrt2,1/\sqrt2$；自然对数下的纠缠熵为 $S(\rho_X)=-2(1/2)\ln(1/2)=\ln2$，而前例的 $\psi_+$ 给出 $0$。

这个相位变化是联合受控变号操作 $\operatorname{diag}(1,1,1,-1)$，不是两个单比特局域相位操作的乘积：局域酉操作保持施密特系数，不能把 $\psi_+$ 的唯一非零施密特系数 $1$ 变成上述两个系数。

因此，相同的合法字支撑、计数乃至计算基概率都不足以确定纠缠；所选正相位等幅态族仍是有意义的额外态规定。这只是有限态的纸面计算，不给出基态、物理实现或分形纠缠标度结论。
:::

::: {.example #ex-ch39-p2e-finite-kernel title="纸面推导（未经 Lean 验证）：将正等幅态的约化谱压缩到 K 维"}
前两个手算可以推广为同一指定态族的有限矩阵计算。以下是纸面推导，不是新增的 Lean 验证结果。固定 $K\ge2$ 与任意 $m,n\ge0$，令 $W_L$ 为全部禁连续 $1^K$ 的长 $L$ 二进制字，$z_L=|W_L|$，并选取

$$
\lvert\psi_{m,n}\rangle
=\frac1{\sqrt{Z}}\sum_{w\in W_{m+n}}\lvert w\rangle,
\qquad Z=z_{m+n}>0.
$$

全零字保证 $Z>0$，这里仍未固定首比特页。以末端连续 `1` 的长度 $r$ 将 $W_m$ 分为 $A_r$，以开头连续 `1` 的长度 $s$ 将 $W_n$ 分为 $B_s$；空字的这两个长度都取 $0$。因为字本身合法，$0\le r,s<K$。记实际有限计数为 $a_r=|A_r|$、$b_s=|B_s|$，允许它们为 $0$。左右字 $x\in A_r$、$y\in B_s$ 的拼接合法当且仅当 $r+s<K$，所以

$$
Z=\sum_{r+s<K}a_r b_s.
$$

在完整的 $2^m$、$2^n$ 维计算基空间内，为每个非空类取归一化指标向量 $u_r=\sum_{x\in A_r}|x\rangle/\sqrt{a_r}$、$v_s=\sum_{y\in B_s}|y\rangle/\sqrt{b_s}$；空类对应零向量，不对 $0$ 开方后取倒数。以它们为列组成 $U,V$，再定义 $K\times K$ 矩阵

$$
C_{rs}=\mathbf1_{\{r+s<K\}}\sqrt{\frac{a_r b_s}{Z}}.
$$

实际态的系数矩阵为 $M_{xy}=\mathbf1_{\{xy\in W_{m+n}\}}/\sqrt Z$。逐项展开 $UCV^*$：合法 $x,y$ 各只落入一个非空类，归一化因子抵消；非法字或非法拼接的系数为 $0$。因此 $M=UCV^*$。非空类彼此不交，故

$$
\begin{aligned}
U^*U&=D_A=\operatorname{diag}(\mathbf1_{\{a_r>0\}}),\\
V^*V&=D_B=\operatorname{diag}(\mathbf1_{\{b_s>0\}}),\\
D_A C D_B&=C.
\end{aligned}
$$

最后一式处理了短字和空类：不能把带零列的 $U,V$ 当成整个 $K$ 维空间上的等距嵌入。现在对实际纯态作部分迹，得到

$$
\begin{aligned}
\rho_X&=MM^*=U G U^*,\qquad G=CC^*,\\
G_{rr'}&=\frac{\sqrt{a_r a_{r'}}}{Z}
\sum_{s=0}^{K-1-\max(r,r')}b_s.
\end{aligned}
$$

这个和只数能与两条左端游程同时相接的右字。$G$ 在空的左类上为零，而 $U$ 限制到非空类张成的坐标空间后是等距嵌入；所以 $G$ 与 $\rho_X$ 的全部正本征值及其重数相同。右约化态亦有同一正谱，因为 $C^*C$ 与 $CC^*$ 的正谱相同。若 $R=\operatorname{rank}C$，两侧物理零本征值的重数分别为 $2^m-R$、$2^n-R$；辅助矩阵 $G$ 的零重数则是 $K-R$，三者不能混用。

由 $\operatorname{Tr}G=\sum_{r,s}|C_{rs}|^2=1$，将正本征值按重数记为 $\nu_1,\ldots,\nu_R$，有限切口的自然对数纠缠熵就是

$$
\begin{aligned}
S(\rho_X)&=-\sum_{j=1}^{R}\nu_j\ln\nu_j,\\
0\le S(\rho_X)&\le\ln R
\le\ln\!\bigl(\min\{K,2^m,2^n\}\bigr).
\end{aligned}
$$

熵上界用的是 $R$ 个正数之和为 $1$ 的通常 Shannon 熵界。$m=0$ 或 $n=0$ 时 $R=1$、熵为 $0$；$m=n=1$ 时，上式的非零部分给回 [@ex-ch39-p2e-positive-ket-handcalculation] 的矩阵。这个计算使用实际类计数，不要求先给出它们的闭式，也不把有限计数替换为平稳概率。固定 $K$ 时，它使此正等幅态族的切口熵一致有界。对 $K$ 的进一步控制见 [@ex-ch39-p2e-uniform-entropy]；这里的有限核计算本身不证明熵极限存在，也不指定物理基态或建立劳齐边界维数与纠缠的关系。这些计数不包含相位信息；改变相位后是否仍有同一谱，须另外核对，前例的联合变号即改变谱。
:::

::: {.example #ex-ch39-p2e-exact-rank title="纸面推导（未经 Lean 验证）：短词到饱和的精确施密特秩"}
继续 [@ex-ch39-p2e-finite-kernel] 中全正等幅态的纸面推导，令 $p=\min(m,K-1)$、$q=\min(n,K-1)$。左末尾恰有 $r$ 个连续 $1$ 的类非空，当且仅当 $0\le r\le p$：当 $r<m$ 时可取 $0^{m-r}1^r$，当 $r=m<K$ 时取全 $1$ 字；空字对应 $r=0$。右侧同理，用 $1^s0^{n-s}$ 给出 $0\le s\le q$ 的代表。因此，删去零行列后的系数核是

$$
C_{\mathrm{occ}}=Z^{-1/2}D_A T D_B,
\qquad T_{rs}=\mathbf 1_{\{r+s<K\}},
$$

其中 $D_A=\operatorname{diag}(\sqrt{a_0},\ldots,\sqrt{a_p})$、$D_B=\operatorname{diag}(\sqrt{b_0},\ldots,\sqrt{b_q})$ 均可逆。它的秩等于这个 $(p+1)\times(q+1)$ 的 $0$–$1$ 矩阵的秩。

记 $T$ 的第 $r$ 行为 $v_r$，列坐标为 $0,\ldots,q$。第零行 $v_0$ 全为 $1$；对 $1\le r\le p$，相邻行之差为

$$
v_r-v_{r-1}=
\begin{cases}
-e_{K-r},&K-r\le q,\\
0,&K-r>q.
\end{cases}
$$

这里 $1\le K-r$，所以各个非零差向量占据互异的非零列坐标；它们共有 $h=\max(0,p+q-K+1)$ 个。逐行相减与逐项求和说明，行空间恰由 $v_0$ 和这 $h$ 个坐标向量张成。观察第零列先排除 $v_0$ 的非零系数，再逐个观察其余坐标，就得到这组向量线性无关。因此，原纯态的施密特秩为

$$
R=1+\max(0,p+q-K+1).
$$

这给出精确的有限长度边界：$R=K$ 当且仅当 $m,n\ge K-1$；$R=1$ 当且仅当 $m=0$、$n=0$ 或 $m+n<K$。对非空的两侧，禁字约束能跨过切口时，即 $m+n\ge K$，这个选定态才出现纠缠。纯态的正谱有 $R$ 项，故 $R=1$ 时熵为零，$R>1$ 时每项都严格小于 $1$，熵严格为正。满秩本身不保证正谱等权，熵是否达到 $\ln K$ 仍须读取前例的谱。这里没有新增 Lean 验证，也没有建立熵极限或物理基态的结论。
:::


::: {.example #ex-ch39-p2e-uniform-entropy title="纸面推导（未经 Lean 验证）：禁戒变长时，纠缠一致消失"}
自动机的状态数随 $K$ 增加，并不迫使这个选定态的纠缠增加。对 [@ex-ch39-p2e-finite-kernel] 的全正等幅态，可用经典相关不等式得到对所有有限切口统一的估计。以下仍是纸面推导，不新增 Lean 验证。

在长 $m+n$ 的均匀二进制字上，令 $D$ 表示左右两半分别合法，$E$ 表示有一个跨过切口的全 $1$ 长 $K$ 窗。把字表示为其 $1$ 的位置集合，则 $D$ 对删去位置封闭，$E$ 对加入位置封闭。Harris–Kleitman 不等式给出这种下降事件与上升事件的负相关；这是经典文献结果（Kleitman, *Families of Non-disjoint Subsets*, [10.1016/S0021-9800(66)80012-1](https://doi.org/10.1016/S0021-9800(66)80012-1)，第 154 页引理）。因此

$$
\begin{aligned}
\delta_{K;m,n}
&:=\Pr(E\mid D)
=1-\frac{z_{m+n}}{z_mz_n}\\
&\le\Pr(E)\le d_K,
\qquad d_K=(K-1)2^{-K}.
\end{aligned}
$$

这里 $\Pr(D)=z_mz_n/2^{m+n}>0$。任一跨切口长 $K$ 窗占有 $K$ 个互异位点，在均匀字下全为 $1$ 的概率是 $2^{-K}$；这种窗至多有 $K-1$ 个，故最后一步只是并集上界。短侧或空侧只会减少窗数；当没有这样的窗时 $E$ 为空。

令 $\lvert u\rangle$、$\lvert v\rangle$ 分别为左右合法字的归一化等幅叠加，$\lvert\phi\rangle=\lvert u\rangle\otimes\lvert v\rangle$。直接清点共同非零系数得到

$$
|\langle\phi\mid\psi_{m,n}\rangle|^2
=\frac{z_{m+n}}{z_mz_n}=1-\delta_{K;m,n}.
$$

若 $\lambda_{\max}$ 是实际约化态的最大本征值，系数矩阵的奇异值分解给出 $\lambda_{\max}\ge |\langle\phi\mid\psi_{m,n}\rangle|^2$：任意单位乘积向量与纯态的重叠不超过最大施密特系数。于是 $t:=1-\lambda_{\max}$ 满足 $0\le t\le\delta_{K;m,n}\le d_K\le1/4$。最后一个界由 $(K-1)\le2^{K-2}$ 得到，适用于全部 $K\ge2$。

前例已给出秩至多为 $K$，故除最大本征值外最多还有 $K-1$ 项，和为 $t$。$t>0$ 时将它们除以 $t$，用通常的有限概率熵界；$t=0$ 时直接取连续值。记 $h(t)=-t\ln t-(1-t)\ln(1-t)$，两端取连续值，则

$$
\begin{aligned}
S_K(m,n)
&\le h(t)+t\ln(K-1)\\
&\le h(d_K)+d_K\ln(K-1)\\
&\le (K-1)2^{-K}(1+K\ln2).
\end{aligned}
$$

第二步用 $h$ 在 $[0,1/2]$ 上递增及 $\ln(K-1)\ge0$；第三步用 $-(1-d)\ln(1-d)\le d$，再代入 $d_K$。右端趋于 $0$，且不依赖 $m,n$。所以对每个 $\varepsilon>0$，存在与切口长度无关的 $K_0\ge2$，使所有 $K\ge K_0$、$m,n\ge0$ 都满足 $S_K(m,n)<\varepsilon$。这是这个指定态族的结果：秩可以达到 $K$，但除最大本征值之外的谱质量仍一致趋于零。它不建立固定 $K$ 的长区间熵极限，不指定物理基态，也不解答劳齐边界维数与纠缠标度之间的开放问题。
:::

::: {.example #ex-ch39-p2e-fixed-order-entropy-limit title="纸面推导（未经 Lean 验证）：固定禁串阶数的双侧熵极限"}
固定 $K\ge2$，让切口两侧都变长，问题便从“有多少个非零 Schmidt 系数”变成“这些系数的质量怎样稳定下来”。这里继续研究 [@ex-ch39-p2e-finite-kernel] 的实际正等幅态：所有不含 $1^K$ 的二进制字都参与叠加，不固定首位或粒子数。以下是纸面推导，完整应用尚未编译为 Lean；它不指定物理基态。

记 $W_L$ 为合法长度 $L$ 的字集，$z_L=|W_L|$，其中 $z_0=1$。令 $\beta=\beta_K$、$p=\beta^{-1}$，并定义

$$
\begin{aligned}
w_j&=\sum_{a=1}^{K-j}p^a\quad(0\le j<K),\\
T&=\sum_{j=0}^{K-1}p^j w_j=\sum_{a=1}^{K}a p^a.
\end{aligned}
$$

根方程给出 $1<\beta<2$、$\sum_{a=1}^Kp^a=1$，故 $w_0=1$、$p\le w_j\le1$ 且 $T>0$。定义实 $K\times K$ 矩阵

$$
\begin{aligned}
C^\infty_{rs}&=\mathbf1_{\{r+s<K\}}\frac{p^{(r+s+1)/2}}{\sqrt T},\\
G^\infty_{rr'}&=\frac{p^{(r+r')/2}w_{\max(r,r')}}{T}.
\end{aligned}
$$

下面证明 $G^\infty=C^\infty(C^\infty)^*$ 正定且迹为 $1$。对其按重数列出的特征值 $\lambda_1,\ldots,\lambda_K$，实际态的熵满足

$$
\begin{aligned}
\lim_{\min(m,n)\to\infty}S_K(m,n)
&=S_K^\infty:=-\sum_{i=1}^{K}\lambda_i\ln\lambda_i,\\
0&<S_K^\infty<\ln K.
\end{aligned}
$$

两个长度必须同时趋于无穷，但不要求按相同比例增长。

**先恢复自由端点的实际字数。** 使用下一节的有符号 Parry 链 $Q$，状态为 $(b,j)\in\{\mathrm{false},\mathrm{true}\}\times\{0,\ldots,K-1\}$。从 $(b,j)$ 读到 $0$ 时翻转符号并重置到 $(!b,0)$，权重为 $p/w_j$；读到 $1$ 时保持符号并前进到 $(b,j+1)$，权重为 $p w_{j+1}/w_j$，仅在 $j+1<K$ 时允许。从 $x_0=(\mathrm{false},0)$ 出发，每个合法字恰好对应一条允许路径；相邻状态又唯一恢复每一位。末端符号不受限制，不额外乘以 $2$，也不要求路径闭合。

长度 $L$、末端游程为 $j$ 的路径权重望远镜消去为 $p^Lw_j$。若 $N_L(b,j)$ 是到达 $(b,j)$ 的路径数，矩阵乘法展开便给出

$$
\begin{aligned}
(Q^L)_{x_0,(b,j)}&=N_L(b,j)p^Lw_j,\\
z_Lp^L&=\sum_{b,j}\frac{(Q^L)_{x_0,(b,j)}}{w_j}.
\end{aligned}
$$

末端因子 $1/w_j$ 不能省略：自由端点计数不是直接取平稳边缘分布。已有链混合界与平稳律为

$$
\begin{aligned}
\pi(b,j)&=\frac{p^jw_j}{2T},\\
\operatorname{TV}(Q^L(x,\cdot),\pi)
&\le\theta_L:=(3/4)^{\lfloor L/3\rfloor}.
\end{aligned}
$$

总变差取有限 $\ell^1$ 距离的一半。由 $w_j\ge p$，对末端重加权求和得到

$$
\begin{aligned}
z_Lp^L&=c+\varepsilon_L,\\
c&=\sum_{b,j}\frac{\pi(b,j)}{w_j}
=\frac{\sum_{j=0}^{K-1}p^j}{T}=\frac1{pT}>0,\\
|\varepsilon_L|&\le\frac2p\theta_L.
\end{aligned}
$$

常数 $c$ 的最后一个等式使用根方程。这一步把链混合接到了实际自由边界字数上。

**再把端点字数接回量子态。** 当 $m,n\ge K$ 时，左侧末端恰有 $r$ 个 $1$ 的字唯一写成 $u\,0\,1^r$，其中 $u\in W_{m-r-1}$；右侧首端恰有 $s$ 个 $1$ 的字唯一写成 $1^s\,0\,v$，其中 $v\in W_{n-s-1}$。插入的 $0$ 阻断跨接处的禁串，故这些是实际双射，有 $a_r=z_{m-r-1}$、$b_s=z_{n-s-1}$；该最终范围内没有全 $1$ 字的例外。

有限核推导由非空类的归一化示性向量给出实际系数矩阵 $M=UC^{m,n}V^*$，其中

$$
C^{m,n}_{rs}=\mathbf1_{\{r+s<K\}}\sqrt{\frac{a_rb_s}{z_{m+n}}}.
$$

因此实际约化态的正特征值及重数恰由 $G^{m,n}=C^{m,n}(C^{m,n})^*$ 给出；物理空间多出的零特征值不贡献熵。对 $r+s<K$，代入字数渐近式得到

$$
(C^{m,n}_{rs})^2
=p^{r+s+2}\frac{(c+\varepsilon_{m-r-1})(c+\varepsilon_{n-s-1})}
{c+\varepsilon_{m+n}}
\longrightarrow\frac{p^{r+s+1}}T.
$$

全部移位指标至少为 $\min(m,n)-K$，故同一个趋于零的量 $2\theta_{\min(m,n)-K}/p$ 控制全部有限个误差项。分母趋于正数 $c$，取非负平方根得到联合尾部极限 $C^{m,n}\to C^\infty$，继而 $G^{m,n}\to G^\infty$。直接相乘给出所显示的 $G^\infty$ 公式，且 $\operatorname{Tr}G^\infty=\sum_r p^rw_r/T=1$。作为对照，单独半字的端点频率趋于 $a_r/z_m\to p^{r+1}$；平稳游程质量则为 $p^rw_r/T$。后者出现在极限 Gram 矩阵的对角线上，但非对角元仍须保留。

**最后控制谱与熵。** 固定维数 $K$ 使逐项收敛推出算子范数收敛，例如 $\|E\|_{\mathrm{op}}\le K\max_{r,s}|E_{rs}|$。对两个 Hermitian Gram 矩阵应用有序特征值扰动界，

$$
|\lambda_i(G^{m,n})-\lambda_i(G^\infty)|
\le\|G^{m,n}-G^\infty\|_{\mathrm{op}}\longrightarrow0.
$$

排序保留全部重数，不要求单谱。函数 $\eta(x)=-x\ln x$ 取连续端点值 $\eta(0)=0$，故固定 $K$ 项之和收敛；通过上述实际谱对应，这正是物理约化态的熵极限。

把 $C^\infty$ 的列倒序后得到三角矩阵，对角元均为 $p^{K/2}/\sqrt T$，所以 $\det G^\infty=p^{K^2}/T^K>0$。它的 $K\ge2$ 个特征值都严格为正且和为 $1$，故熵严格为正。严格凸性给出熵不超过 $\ln K$，等号仅在全部特征值为 $1/K$ 时成立；Hermitian 谱定理此时迫使 $G^\infty=I_K/K$。然而 $G^\infty_{0,1}=\sqrt p\,w_1/T>0$，排除了等号。

所复用的根方程、链混合与谱扰动工具见本书[当前所钉源码](trureturing:)中的 `DBonacci/PerronRoot`、`ParryTwistedComparison.parry_mixing_and_complete_prefix` 与 `HermitianEigenvaluePerturbation.abs_eigenvalue_sub_eigenvalue_le_norm`；连续熵函数与 Hermitian 对角化采用所钉 Mathlib 的标准结果。路径计数、末端重加权及实际态的极限连接已在上面完整写出，但尚未取得完整应用的 Lean 验证。$S_K^\infty$ 是一次切口的纠缠熵，区别于每步移位熵 $\log_2\beta_K$；[@ex-ch39-p2e-uniform-entropy] 的一致界也传递给 $S_K^\infty$。固定一侧长度、改变相位、物理基态与 Rauzy 边界熵律仍需各自的论证。
:::


::: {.example #ex-ch39-p2e-local-parent title="纸面推导（未经 Lean 验证）：选取合法字正等幅态的局域父哈密顿量"}
前面的熵计算指定了一个态。能否反过来写出一个局域能量，使它成为唯一基态？先看两个位置、禁止 `11` 的最小例子。在基 $00,01,10,11$ 中取

$$
H_{2,2}=\begin{pmatrix}
2&-1&-1&0\\
-1&1&0&0\\
-1&0&1&0\\
0&0&0&1
\end{pmatrix}.
$$

左上角是三顶点路径图 $01\leftrightarrow00\leftrightarrow10$ 的拉普拉斯矩阵：相邻顶点振幅相等时没有能量代价。最后一个对角元给非法字 `11` 加罚。谱为 $0,1,1,3$，唯一归一化零态到整体相位为 $(1,1,1,0)/\sqrt3$。下面把这个机制推广到所有有限长度。以下是标准配置图拉普拉斯方法的应用与纸面证明，完整构造尚未取得 Lean 验证。

固定 $K\ge2$、$N\ge0$，在完整空间 $\mathcal H_N=(\mathbb C^2)^{\otimes N}$ 中，令 $n_j=|1\rangle_j\langle1|$，$X_i$ 为第 $i$ 位的翻转算子。所有长度 $K$ 的窗口都完全位于链内，不作周期回绕。定义

$$
\begin{aligned}
B_a&=\prod_{j=a}^{a+K-1}n_j
\quad(1\le a\le N-K+1),\\
\mathcal W_i&=\{a:1\le a\le N-K+1,\ a\le i<a+K\},\\
C_i&=\prod_{a\in\mathcal W_i}
\left(I-\prod_{\substack{a\le j<a+K\\j\ne i}}n_j\right),\\
h_i&=C_i(I-X_i)C_i,\\
H_{K,N}&=\sum_{i=1}^{N}h_i+\sum_{a=1}^{N-K+1}B_a.
\end{aligned}
$$

空指标集上的和取 $0$、积取恒等算子，故 $N<K$ 时没有窗口。$C_i$ 是对角投影，不依赖中心位，与 $X_i$ 对易。它只检查距 $i$ 至多 $K-1$ 的位置：每一项 $h_i$ 支撑于至多 $2K-1$ 个连续位置，边界处截断；$B_a$ 支撑于 $K$ 个位置。$K=2$ 时 $C_i$ 就是链内相邻位置的空位投影之积。

**先在完整字基上展开。** 记 $\Omega_N=\{0,1\}^N$，位置从 $1$ 编到 $N$，$\sigma_iw$ 为只翻转第 $i$ 位的字。原控制投影的对角元就是

$$
\begin{aligned}
c_i(w)&:=\langle w|C_i|w\rangle\\
&=\prod_{a\in\mathcal W_i}
\left(1-\prod_{\substack{a\le j<a+K\\j\ne i}}w_j\right)\in\{0,1\},\\
c_i(\sigma_iw)&=c_i(w),\qquad \sigma_i^2w=w.
\end{aligned}
$$

每个因子都不读取 $w_i$，所以最后两式对全部完整字成立，包括非法字。以 $v$ 为行、$w$ 为列，$X_i$ 的置换矩阵元为 $\langle v|X_i|w\rangle=\delta_{v,\sigma_iw}$。插入完整字基的恒等分解，直接展开已定义的算符乘积，得到

$$
\begin{aligned}
\langle v|h_i|w\rangle
&=\sum_{r,s\in\Omega_N}
\langle v|C_i|r\rangle\langle r|I-X_i|s\rangle
\langle s|C_i|w\rangle\\
&=c_i(v)\bigl(\delta_{v,w}-\delta_{v,\sigma_iw}\bigr)c_i(w).
\end{aligned}
$$

若 $c_i(w)=1$，每个包含 $i$ 的完整窗口都有一个位于中心之外的零；翻转前后这个零都还在。其余窗口不变，故 $w\in W_N$ 当且仅当 $\sigma_iw\in W_N$，无需先假设 $w$ 合法。因此允许的翻转同时保持合法扇区和非法扇区。控制开启并不认证全局合法性：例如 $K=2,N=4,w=1100,i=4$，唯一包含中心的窗口 $[3,4]$ 由第 $3$ 位的零通过检验，故 $c_4(1100)=1$；但 $1100$ 与 $1101$ 都保留禁窗口 $[1,2]=11$。局部项 $h_4$ 在这对非法基矢上仍有对角元 $1$ 和翻转元 $-1$。

**能量怎样识别合法字？** 固定第 $i$ 位之外的配置 $\eta$，记对应的两个字为 $\eta0,\eta1$，中心数字均插在位置 $i$。$C_i(\eta)=1$ 当且仅当把中心置为 $1$ 不会形成任何包含 $i$ 的禁窗口。在这样的二维块上，$h_i$ 为

$$
\begin{pmatrix}1&-1\\-1&1\end{pmatrix};
$$

其余块为零，因此 $h_i$ 正半定。$B_a$ 也是正投影。对任意 $|\phi\rangle=\sum_w a_w|w\rangle$，令 $\nu_K(w)$ 为字 $w$ 中全 $1$ 的长度 $K$ 窗口数，得到完整空间上的能量恒等式

$$
\begin{aligned}
\langle\phi|H_{K,N}|\phi\rangle
={}&\sum_{i=1}^{N}\ \sum_{\eta:C_i(\eta)=1}
|a_{\eta0}-a_{\eta1}|^2\\
&+\sum_{w\in\{0,1\}^N}\nu_K(w)|a_w|^2.
\end{aligned}
$$

每个固定外部配置的无向翻转对只计一次，不另乘 $2$。零能量首先迫使所有非法字的振幅为零。对于合法字，删除任意一个 $1$ 都保持合法，而且该位置的 $C_i=1$，所以第一项又迫使这一对合法字的振幅相等。逐位删除到全零字，便把所有合法字连在一起。

反过来，一次满足 $C_i=1$ 的翻转不会改变字的合法性：包含 $i$ 的窗口在两个端点都不违规，其他窗口不受翻转影响。因此令合法字振幅相同、非法字振幅为零，会逐项消去上述全部平方项和罚项。若 $W_N$ 仍表示不含 $1^K$ 的全部长度 $N$ 字、$z_N=|W_N|$，则

$$
\begin{aligned}
|\Psi_{K,N}\rangle&=z_N^{-1/2}\sum_{w\in W_N}|w\rangle,\\
\ker H_{K,N}&=\mathbb C|\Psi_{K,N}\rangle.
\end{aligned}
$$

这既证明了完整张量空间中的唯一基态射线，也证明它同时使每一局域正项取零，即无挫折。合法字张成的子空间被各项保持；限制在该空间时，$\sum_i h_i$ 正是单比特合法翻转图的拉普拉斯。非法性罚项使这个限制空间中的唯一性提升到完整空间中的唯一性，不能省略：上面的 $K=N=2$ 例子若删去罚项，$|11\rangle$ 就多出一个零态。

**长度与物理解释的边界。** $N=0$ 时空间是一维真空空间，$H_{K,0}=0$，没有激发能级可定义谱隙。每个固定 $N\ge1$ 的矩阵都是有限维、正半定且恰有一维核，因而其第一正本征值严格大于零；这里没有给出对所有 $N$ 一致的下界。当 $1\le N<K$ 时，$C_i=I$ 且无罚项，$H_{K,N}=\sum_i(I-X_i)$，基态为 $|+\rangle^{\otimes N}$，谱隙恰为 $2$。

因此，前面实际正等幅态的有限切口熵与固定 $K$ 双侧极限，也是这个专门设计模型的基态纠缠结果。这不把它识别为真实里德堡阵列、黄金链、Tribonacci 跃迁链或 Rauzy 几何所选出的态，也不解决分形边界与纠缠标度的开放问题。

来源与对应：本书[当前所钉源码](trureturing:) 中的理论卷 `docs/develop/theory/AURIC_FIB_ATOM_PYRAMID_BOUNDARY_CALCULUS.md` §15.9、定义 15.22 与命题 15.23 已给出 $K=2$、正活动 $a_i$ 的合法空间局域父及逐位删除证明；这里取 $a_i=1$，把控制投影写成所有包含中心的禁窗口，并补入全空间罚项。该卷命题 15.25 明确指出不加罚项时全空间唯一性失败。[Lesanovsky 的三体模型](https://arxiv.org/abs/1010.2349v2)式 (3)–(5) 提供相关物理背景，符号、正尺度及边界对应见该卷数学引文 15.24；这里的任意 $K$ 构造由上述能量恒等式承担，不将其归为该文已证明的实验实现。
:::

::: {.example #ex-ch39-p2e-heatbath-scale title="纸面推导（未经 Lean 验证）：每站速率一的热浴链与完整空间谱隙"}
[@ex-ch39-p2e-local-parent] 的配置图拉普拉斯还给出一个精确的随机动力学对应。固定 $K\ge2$、$N\ge1$，沿用开放边界的 $W_N,z_N,C_i,h_i,B_a,H_{K,N}$ 与 $|\Psi_{K,N}\rangle$，简记 $z=z_N$。在合法字上取均匀律 $\pi(w)=1/z$。以下直接给出这一应用的纸面推导。

**一次刷新怎样作用？** 对位置 $i$，记 $\mathrm{outside}_i$ 为除第 $i$ 位外的全部位。对一个在 $W_N$ 中出现的外部配置 $\eta$，令

$$
\begin{aligned}
F_i(\eta)&=\{w\in W_N:w_{-i}=\eta\},\\
(E_i f)(w)&=\frac1{|F_i(w_{-i})|}
\sum_{v\in F_i(w_{-i})}f(v).
\end{aligned}
$$

这里固定的是第 $i$ 位以外的全部 $N-1$ 位。对合法字 $w$，把这个实际完成纤维另记为

$$
\begin{aligned}
A_i(w)&:=F_i(w_{-i})\\
&=\{u\in W_N:u_j=w_j\ \forall j\ne i\}.
\end{aligned}
$$

相同外部的布尔字只能是 $w$ 或 $\sigma_iw$。若 $c_i(w)=1$，父例的双向合法性说明两者都合法；它们第 $i$ 位不同，故 $A_i(w)=\{w,\sigma_iw\}$，基数恰为 $2$。若 $c_i(w)=0$，至少一个包含 $i$ 的完整窗口在所有非中心位上都是 $1$。$w$ 合法迫使 $w_i=0$，翻成 $1$ 就违反该窗口；因而 $A_i(w)=\{w\}$，基数恰为 $1$。这给出了原控制与实际纤维的对应，没有替换控制条件。

这就是给定 $\mathrm{outside}_i$ 的条件期望。把合法字的一位置零总是合法，故每个非空纤维或为 $\{\eta0,\eta1\}$，或为只能取零的单点 $\{\eta0\}$；中心位均插在位置 $i$。在双点纤维上 $C_i=1$，而在强制零的单点纤维上 $C_i=0$。因此相应的矩阵为

$$
\begin{aligned}
E_i&=\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix},\\
h_i&=\begin{pmatrix}1&-1\\-1&1\end{pmatrix}=2(I-E_i),
\end{aligned}
$$

其中最后的等式按函数值与合法基矢的对应来读；单点纤维上 $E_i=I$，两边均为零。

**逐个矩阵元核对系数二。** 在合法字上定义刷新核，约定行 $v$ 是当前字、列 $w$ 是刷新后的字。均匀律 $\pi$ 给出

$$
\begin{aligned}
T_i(v,w)&=\frac{\mathbf1_{\{w\in A_i(v)\}}}{|A_i(v)|},\\
(E_if)(v)&=\sum_{w\in W_N}T_i(v,w)f(w),\\
\sum_{w\in W_N}T_i(v,w)&=1.
\end{aligned}
$$

开启时，同纤维两点各有质量 $1/2$，包括以 $1/2$ 概率抽回当前字；关闭时只有 $T_i(v,v)=1$，其余为零。同纤维的 $A_i$ 相同，故 $T_i(v,w)=T_i(w,v)$。算符矩阵的行列则表示输出与输入振幅；把它与这里作用于函数的刷新核比较时，翻转的对合性给出 $\delta_{v,\sigma_iw}=\delta_{w,\sigma_iv}$，控制不变性给出 $c_i(\sigma_iv)=c_i(v)$。

现在取合法 $v,w$。对角情形，原乘积的矩阵元为 $c_i(v)^2=c_i(v)$，开启时等于 $2(1-1/2)=1$，关闭时等于 $2(1-1)=0$。若 $w=\sigma_iv$，两字都合法就迫使控制开启，否则上述禁窗口会排除其中一字；乘积元于是为 $-1=2(0-1/2)$。若既不相等也不互为这次翻转，则原乘积元和刷新质量都为零。因此在同一个合法字基上确有

$$
\langle v|h_i|w\rangle
=2\bigl(\delta_{v,w}-T_i(v,w)\bigr)
\qquad(v,w\in W_N).
$$

这里把 $W_N\subseteq\Omega_N$ 的每个合法字仍送到原来的完整字基矢；相等关系与 Kronecker 符号都不变。这正是上式 $h_i=2(I-E_i)$ 的限制空间含义。$T_i$ 的定义域是合法字，不能把这个随机核等式直接延伸到非法字上的原生算符。

例如 $K=N=2$、$i=2$，按合法基次序 $(00,01,10)$，实际纤维是 $\{00,01\}$ 和 $\{10\}$，故

$$
\begin{aligned}
T_2&=\begin{pmatrix}1/2&1/2&0\\1/2&1/2&0\\0&0&1\end{pmatrix},\\
h_2|_{\mathcal H_{\mathrm{legal}}}
&=\begin{pmatrix}1&-1&0\\-1&1&0\\0&0&0\end{pmatrix}
=2(I-T_2).
\end{aligned}
$$

三行刷新质量分别为 $1/2+1/2=1$、$1/2+1/2=1$、$1=1$。第 $1$ 站同样连接 $00$ 与 $10$；把两个局部矩阵相加，再把非法基矢 $11$ 的罚能 $1$ 加回，恰得父例原有的完整 $H_{2,2}$，谱仍为 $0,1,1,3$。当 $N<K$ 时，所有 $c_i=1$，每个实际单站纤维都含两个字；当 $N=0$ 时没有站点、没有这些矩阵元，也不由此断言存在激发谱隙。

让每个位置有独立的速率 $1$ 泊松钟；钟响时，按上述条件律重新抽取该位，允许抽回原值。这条热浴链作用在函数上的连续时间生成元是

$$
L=\sum_{i=1}^N(E_i-I).
$$

于是每条合法翻转边的跳转速率为 $1/2$。全链每单位时间平均有 $N$ 次刷新尝试。若 $P=N^{-1}\sum_iE_i$ 是每步均匀随机选一站刷新的离散时间算子，则

$$
-L=N(I-P).
$$

全链总速率 $1$ 的刷新过程则有生成元 $P-I=L/N$，两种时钟相差因子 $N$。

**从条件方差到量子能量。** 允许 $f,g:W_N\to\mathbb C$，约定内积对第一变量共轭线性，并定义

$$
\begin{aligned}
\langle f,g\rangle_\pi&=\frac1z\sum_{w\in W_N}\overline{f(w)}g(w),\\
\pi f&=\frac1z\sum_{w\in W_N}f(w),\\
\operatorname{Var}_\pi(f)&=\frac1z\sum_{w\in W_N}|f(w)-\pi f|^2.
\end{aligned}
$$

逐纤维平均使 $E_i$ 成为这个内积下的正交投影：它自伴、幂等，像空间是在每个纤维上为常数的函数。因此

$$
\begin{aligned}
\mathcal E(f,f)&:=-\langle f,Lf\rangle_\pi\\
&=\sum_i\|f-E_if\|_\pi^2\\
&=\sum_i\mathbb E_\pi\operatorname{Var}
(f\mid\mathrm{outside}_i)\\
&=\frac1{2z}\sum_{\{u,v\}\in\mathscr E_N}|f(u)-f(v)|^2,
\end{aligned}
$$

这里条件方差为 $E_i(|f-E_if|^2)$，$\mathscr E_N$ 是相差一位的无向合法字对集合，每条边只计一次。系数可逐对核对：双点纤维的条件方差为 $|f(u)-f(v)|^2/4$，纤维的 $\pi$ 质量为 $2/z$；单点纤维贡献为零。这也证明 $-L$ 自伴且正半定。

令 $\mathcal H_{\mathrm{legal}}=\operatorname{span}\{|w\rangle:w\in W_N\}$，定义

$$
Uf=z^{-1/2}\sum_{w\in W_N}f(w)|w\rangle.
$$

把这个对应反向用于原生复振幅时，记 $Z=z=z_N$，所以 $\pi(w)=1/Z$。任意合法支撑向量 $|\psi_L\rangle=\sum_{w\in W_N}a_w|w\rangle$ 的逆像显式为

$$
(U^{-1}\psi_L)(w)=f(w)=\sqrt Z\,a_w.
$$

若另一个合法支撑向量为 $|\phi_L\rangle=\sum_{w\in W_N}b_w|w\rangle$、$g(w)=\sqrt Z\,b_w$，则对第一变量取共轭的配对与范数满足

$$
\begin{aligned}
\langle f,g\rangle_\pi
&=\frac1Z\sum_{w\in W_N}
\overline{\sqrt Z\,a_w}\sqrt Z\,b_w\\
&=\sum_{w\in W_N}\overline{a_w}b_w
=\langle\psi_L,\phi_L\rangle,\\
\|f\|_\pi^2
&=\frac1Z\sum_{w\in W_N}|\sqrt Z\,a_w|^2
=\|\psi_L\|^2.
\end{aligned}
$$

这些和都是有限和，且 $Z>0$；因此任意合法复振幅都给出唯一逆像，无需额外的可积性或归一化假设。$U:L^2(\pi)\to\mathcal H_{\mathrm{legal}}$ 保内积且满射，故为酉映射。罚项在合法空间为零，逐纤维的矩阵等式于是给出

$$
\begin{aligned}
H_{\mathrm{legal}}
&:=H_{K,N}|_{\mathcal H_{\mathrm{legal}}}
=U(-2L)U^{-1}\\
&=2N\,U(I-P)U^{-1},\\
\langle Uf,H_{K,N}Uf\rangle&=2\mathcal E(f,f),\\
U1&=|\Psi_{K,N}\rangle,\\
\langle\Psi_{K,N}|Uf\rangle&=\pi f.
\end{aligned}
$$

对上述原生振幅，令 $\beta=\langle\Psi_{K,N}|\psi_L\rangle$。有限均值与方差公式具体成为

$$
\begin{aligned}
\pi f&=\frac1Z\sum_{w\in W_N}\sqrt Z\,a_w
=\beta,\\
\operatorname{Var}_\pi(f)
&=\|f\|_\pi^2-|\pi f|^2\\
&=\|\psi_L\|^2-|\beta|^2
=\|\psi_L-\beta\Psi_{K,N}\|^2.
\end{aligned}
$$

因此零均值恰对应于与基态正交。把原生自伴算符的二次型记为 $Q(A,\phi)=\langle\phi,A\phi\rangle$，逐站还有

$$
Q(h_i,\psi_L)=2\|f-E_if\|_\pi^2.
$$

对站点求和即恢复上面的总能量恒等式 $Q(H_{K,N},\psi_L)=2\mathcal E(f,f)$；合法支撑上所有 $B_a$ 的二次型均为零。这里的系数 $2$ 始终对应每站速率 $1$ 的时钟。

**为何合法空间的谱隙足够？** 合法字可逐位删除 $1$ 到全零字，故合法翻转图连通；$N\ge1$、$K\ge2$ 又保证全零字与仅首位为 $1$ 的字都是顶点。能量的边平方和因此恰在常数函数上为零，$-L$ 的第一正本征值 $\lambda_{K,N}$ 存在，且

$$
\lambda_{K,N}=\inf_{f\not\equiv\mathrm{constant}}
\frac{\mathcal E(f,f)}{\operatorname{Var}_\pi(f)}>0.
$$

这里的变分公式直接来自有限维自伴算子的谱分解：减去均值后，把函数展开在正本征值的正交本征基上，商是这些本征值的加权平均，最小本征向量取到下确界。

还须控制 $\mathcal H_{\mathrm{illegal}}=\mathcal H_{\mathrm{legal}}^\perp$。父例已证明 $C_i$ 允许的翻转保持合法性状态；因此每个 $h_i$ 保持这两个空间，对角的 $B_a$ 也如此。若非法空间非空，则对其中的任意 $|\chi\rangle=\sum_{w\notin W_N}a_w|w\rangle$，每个非法字至少含一个禁窗口，故

$$
\begin{aligned}
\langle\chi,H_{K,N}\chi\rangle
&\ge\sum_{w\notin W_N}\nu_K(w)|a_w|^2\\
&\ge\|\chi\|^2.
\end{aligned}
$$

第一步使用各 $h_i\ge0$，第二步使用 $\nu_K(w)\ge1$。设完整 $H_{K,N}$ 的第一正本征值为 $\Delta_{K,N}$。任意与基态正交的向量唯一分成 $Uf+\chi$，其中 $\pi f=0$，两块之间没有交叉能量，因而

$$
\begin{aligned}
\langle Uf+\chi,H_{K,N}(Uf+\chi)\rangle
&\ge2\lambda_{K,N}\|f\|_\pi^2+\|\chi\|^2,\\
\min\{1,2\lambda_{K,N}\}
&\le\Delta_{K,N}\le2\lambda_{K,N}.
\end{aligned}
$$

上界取合法空间内的最小正本征向量即可。若非法空间为空，则始终 $\chi=0$，实际有更精确的等式 $\Delta_{K,N}=2\lambda_{K,N}$，不能凭空添入能量为 $1$ 的激发态。

**两个精确的边界核对。** 当 $1\le N<K$ 时所有字都合法，非法空间为空，$E_i=(I+X_i)/2$。乘积字符 $f_A(w)=(-1)^{\sum_{i\in A}w_i}$（$A\subseteq\{1,\ldots,N\}$）构成函数空间的正交基，满足 $-Lf_A=|A|f_A$，故 $\lambda_{K,N}=1$、$\Delta_{K,N}=2$，也包括 $N=1$。当 $K=N=2$ 时，在合法字次序 $00,01,10$ 下

$$
-L=\frac12\begin{pmatrix}2&-1&-1\\-1&1&0\\-1&0&1\end{pmatrix}.
$$

向量 $(1,1,1)$、$(0,1,-1)$、$(-2,1,1)$ 的本征值依次为 $0,1/2,3/2$。非法字 $11$ 的两个 $h_i$ 均为零而罚能为 $1$，故完整谱为 $0,1,1,3$，与父例一致。

固定 $K$ 后，上面的两侧界说明：$\inf_{N\ge1}\Delta_{K,N}>0$ 当且仅当 $\inf_{N\ge1}\lambda_{K,N}>0$。由变分公式，这又当且仅当存在只依赖 $K$ 的有限常数 $C_K>0$，使所有 $N\ge1$ 及所有复值函数满足

$$
\operatorname{Var}_\pi(f)\le C_K\mathcal E(f,f).
$$

例如热浴谱隙下界 $c_K>0$ 将给出完整谱隙下界 $\min\{1,2c_K\}$；反向的完整谱隙下界 $d_K>0$ 将给出热浴谱隙下界 $d_K/2$。这个归约本身未证明这样的长度一致常数存在，也未给出其数值。下一例为同一硬约束、开放边界热浴链给出一个显式的长度一致 Poincaré 估计。沿字长方向的转移矩阵混合控制空间相关；若无进一步联系两种动力学的定理，它不能代替这里刷新时间方向的估计。
:::

::: {.example #ex-ch39-p2e-uniform-parent-gap title="纸面推导（未经 Lean 验证）：固定禁戒长度下的一致谱隙"}
一次刷新只改一位，但零位能截断连续的全一禁戒。把若干相邻位一起刷新，两个边界条件造成的分歧便会在遇到第一个共同零时停止传播。下面把这个机制变成一个随链长不变的显式估计；这是书面推导，不新增 Lean 验证。

沿用 [@ex-ch39-p2e-heatbath-scale] 的模型，固定整数 $K\ge2$，令

$$
R=K-1,\qquad \ell=2K-1,\qquad C_K=\ell^2 2^\ell.
$$

对每个 $N\ge1$，我们将证明

$$
\begin{aligned}
\operatorname{Var}_\pi(f)&\le C_K\mathcal E(f,f)
&&\text{对每个 }f:W_N\to\mathbb C,\\
\lambda_{K,N}&\ge C_K^{-1},\\
\Delta_{K,N}&\ge 2C_K^{-1}
=\frac{2^{2-2K}}{(2K-1)^2}.
\end{aligned}
$$

常数不依赖 $N$；这里不声称它是最优常数，也不声称对 $K$ 一致。

**先做分块刷新。** 把格点编号为 $1,\ldots,N$。对每个整数 $a=2-\ell,\ldots,N$，保留带索引的非空区间

$$
B_a=[a,a+\ell-1]\cap[1,N],\qquad M=N+\ell-1.
$$

即使两个截断区间相同，也保留它们各自的索引。每个位点恰在 $\ell$ 个块内：包含 $u$ 的索引正是 $u-\ell+1,\ldots,u$。

先把一次条件刷新写成实际合法字上的矩阵。对任意有限位点集 $B\subseteq[1,N]$，补集均在 $[1,N]$ 内取。令 $Z=\#W_N=z_N>0$（全零字合法），并对 $x,y\in W_N$ 定义

$$
\begin{aligned}
\mathcal A_B(x)&=\{y\in W_N:y|_{B^c}=x|_{B^c}\},\\
m_B(x)&=\#\mathcal A_B(x)>0,\\
T_B(x,y)&=\frac{\mathbf1_{\{y\in\mathcal A_B(x)\}}}{m_B(x)},\\
(E_Bf)(x)&=\sum_{y\in W_N}T_B(x,y)f(y).
\end{aligned}
$$

因为 $x\in\mathcal A_B(x)$，分母非零。给定整个外部 $x|_{B^c}$，纤维的概率为 $m_B(x)/Z$，其中每个完整字的条件概率恰为 $(1/Z)/(m_B(x)/Z)=1/m_B(x)$。所以 $T_B$ 正是固定全部块外数据后的均匀合法字刷新；限制到 $B$ 就给出块内更新律。

相同外部数据把 $W_N$ 分成互不相交的非空纤维。若 $y\in\mathcal A_B(x)$，则 $\mathcal A_B(y)=\mathcal A_B(x)$ 且 $m_B(y)=m_B(x)$；若二者不在同一纤维，两向矩阵元都为零。因此 $T_B$ 是非负实对称矩阵，每行把质量均分给该行所在纤维，每列之和也由对称性等于 $1$。特别地，联合律 $\pi(x)T_B(x,y)$ 的两个边缘都精确等于原来的均匀律：

$$
\begin{aligned}
\sum_yT_B(x,y)&=1, &\sum_xT_B(x,y)&=1,\\
\sum_y\pi(x)T_B(x,y)&=\frac1Z,
&\sum_x\pi(x)T_B(x,y)&=\frac1Z.
\end{aligned}
$$

对每个这样的纤维 $C$，记 $\bar f_C=(\#C)^{-1}\sum_{x\in C}f(x)$。$E_Bf$ 在 $C$ 上恒为 $\bar f_C$，再次平均不变，故 $E_B^2=E_B$。对任意复值 $f,g$，按纤维分组有限和得到

$$
\begin{aligned}
\langle f,E_Bg\rangle_\pi
&=\frac1Z\sum_C(\#C)\overline{\bar f_C}\,\bar g_C\\
&=\langle E_Bf,g\rangle_\pi,\\
\langle f,E_Bf\rangle_\pi
&=\frac1Z\sum_C(\#C)|\bar f_C|^2\ge0.
\end{aligned}
$$

所以 $E_B$ 自伴、正半定，且为投向纤维上常值函数的正交投影。这些性质来自实际纤维平均。相应的剩余能量也可逐纤维直接算出：展开复模平方并使用 $\sum_{x\in C}f(x)=(\#C)\bar f_C$，便有

$$
\begin{aligned}
\sum_{x\in C}\overline{f(x)}(f(x)-\bar f_C)
&=\sum_{x\in C}|f(x)|^2
-\frac{\left|\sum_{x\in C}f(x)\right|^2}{\#C}\\
&=\sum_{x\in C}|f(x)-\bar f_C|^2\\
&=\frac1{2\#C}\sum_{x,y\in C}|f(x)-f(y)|^2.
\end{aligned}
$$

最后一步同样只是展开有限和；交叉项以复共轭成对合并为实部。条件方差在这里定义为 $\operatorname{Var}(f\mid B^c)=E_B(|f-E_Bf|^2)$，使用复模平方。把上式对所有纤维求和并除以全局字数 $Z$，得到

$$
\begin{aligned}
\operatorname{Re}\langle f,(I-E_B)f\rangle_\pi
&=\frac1{2Z}\sum_x\sum_yT_B(x,y)|f(x)-f(y)|^2\\
&=\frac1Z\sum_x\sum_yT_B(x,y)
|f(y)-(E_Bf)(x)|^2\\
&=\pi\!\left[\operatorname{Var}(f\mid B^c)\right].
\end{aligned}
$$

左侧内积本已是非负实数，也等于 $\|f-E_Bf\|_\pi^2$。一个纤维 $C$ 的外部数据出现概率是 $\#C/Z$，其条件方差为 $(\#C)^{-1}\sum_{x\in C}|f(x)-\bar f_C|^2$；这解释了取外部平均后的全局因子 $1/Z$。当 $B=\varnothing$ 时 $E_B=I$；当 $B=[1,N]$ 时 $E_Bf=\pi f$。这些纤维恒等式对 $N=0$ 的单个空字也成立，但不赋予空链激发谱隙。

现在对原来的块索引定义

$$
P_B=\frac1M\sum_a E_{B_a},\qquad
L_B=M(P_B-I),\qquad
\mathcal E_B(f,f)=\sum_a\pi\!\left[\operatorname{Var}(f\mid B_a^c)\right].
$$

这里每个带索引的块都有速率 $1$ 的时钟。于是 $-L_B=\sum_a(I-E_{B_a})$；逐索引相加刚证明的能量恒等式，得到 $\mathcal E_B(f,f)=\langle f,-L_Bf\rangle_\pi$。重复块值仍按其时钟索引重复计入，不另加 $1/M$。

**一个边界分歧只留下有限代价。** 先取在位点 $u$ 以外处处相同的两个合法字 $x,y$（也允许 $x=y$），并为两条链选择相同的块索引。若块含 $u$，块外完全相同，刷新时可以选取相同的整个块，于是分歧消失。

对远处的块，需要比较的是固定全部块外数据后，限制到块内的条件分布。更一般地，取任意有限位点集 $B\subseteq[1,N]\setminus\{u\}$，并假设每个 $v\in B$ 都满足 $|v-u|\ge K$。对 $z=x,y$，沿用上面定义的 $\mathcal A_B(z)$；把完整字在该纤维上的均匀条件律限制到 $B$，记为 $\mu_B^z$。这两个完成字集合分别含 $x,y$，所以归一化分母非零。

把 $w\in\mathcal A_B(x)$ 的第 $u$ 位改为 $y_u$，其余各位不动，得到 $\Phi(w)$。不含 $u$ 的长度 $K$ 窗口保持不变；含 $u$ 的窗口不可能遇到 $B$，故改写后该窗口与合法字 $y$ 完全一致。因此 $\Phi(w)$ 合法，且在整个 $B^c$ 上等于 $y$。反向把第 $u$ 位改回 $x_u$，便得到逆映射。这个双射还逐位保留 $B$，故总完成字数以及每个块内赋值 $b\in\{0,1\}^B$ 的完成字数都相同。于是

$$
\begin{aligned}
\mu_B^x(b)
&=\frac{\#\{w\in\mathcal A_B(x):w|_B=b\}}{\#\mathcal A_B(x)}\\
&=\frac{\#\{w\in\mathcal A_B(y):w|_B=b\}}{\#\mathcal A_B(y)}
=\mu_B^y(b).
\end{aligned}
$$

所以可以从这个共同的块内分布抽取同一个赋值来同步刷新，不产生新分歧；若 $x_u\ne y_u$，刷新后的完整字仍在块外的 $u$ 处不同，完整字的条件分布也不相等。上述论证只需没有长度 $K$ 的窗口同时遇到 $u$ 和 $B$，距离条件保证了这一点。$B$ 无需连续、非空或只在 $u$ 的一侧；$B=\varnothing$、$x=y$ 及短链 $N<K$ 也适用（短链没有这样的窗口）。

其余不含 $u$ 的受影响块至多有 $2R$ 个：右侧块的起点在 $u+1,\ldots,u+R$，左侧块的终点在 $u-R,\ldots,u-1$。截断只会减少这些索引；当 $N<\ell$ 时，相同的整链块仍按各自索引计入包含 $u$ 的块。

对一个受影响的右侧块，从左向右逐位抽取条件分布。固定任一条链已抽到的合法前缀后，下一位为 $0$ 的条件概率至少为 $1/2$：把下一位为 $1$ 的任一合法完成字改成 $0$，其余各位不变，得到一个不同的、下一位为 $0$ 的合法完成字。这是一个单射，因为删除 $1$ 不会制造全一禁戒。

每一步使用一个新的共同均匀随机数，按两条链各自的条件概率决定下一位。条件于双方完整的已抽历史，两边同时得到 $0$ 的概率至少为 $1/2$。第一次共同得到 $0$ 后，余下后缀的两个条件分布完全相同：任何连接先前历史与未抽后缀的连续窗口都经过这个零，故相应禁戒已自动满足；未抽后缀另一端的块外数据又相同。因此此后可同步抽取整个后缀。这一构造每一步都保留各自的条件抽样律，停止事件不会改变两条链的边缘分布。

令 $m=|B|$，按扫描次序把输出比特对记为 $(X_j,Y_j)$，$1\le j\le m$。把“首个共同零的位置”补成一个在所有输出上都有定义的随机变量：若块内存在共同零，取最早的扫描位置；若始终没有，令 $T=m+1$。记 $\mathcal G_j$ 为前 $j$ 对已抽样比特所生成的信息，并令 $A_j=\{T>j\}$，其中 $A_0$ 是整个样本空间。这里所有关于已抽样历史的条件概率陈述都只针对正概率历史。

在首个共同零之前，即使两条剩余条件律已经相同，也仍逐步使用新的共同均匀随机数；共同零之后只需从共同的后缀分布同步完成。在 $A_{j-1}$ 上，下一步出现共同零的条件概率至少为 $1/2$，所以对 $1\le j\le m$，

$$
\begin{aligned}
\Pr(A_j)
&=\mathbb E\!\left[\mathbf1_{A_{j-1}}
  \Pr\!\left((X_j,Y_j)\ne(0,0)\mid\mathcal G_{j-1}\right)\right]\\
&\le\frac12\Pr(A_{j-1})
\le2^{-j}.
\end{aligned}
$$

事件 $A_j$ 只排除前 $j$ 步中的共同零，仍允许 $(1,1)$，并不等于“每一步都有分歧”。一旦出现共同零，该位置两位相同且后缀同步，故扫描位置 $j$ 上的分歧要求 $T>j$。于是同一个联合分布同时满足

$$
\begin{aligned}
\Pr(X_j\ne Y_j)&\le\Pr(T>j)\le2^{-j}
&& (1\le j\le m),\\
\mathbb E\!\left[\sum_{j=1}^{m}\mathbf1_{X_j\ne Y_j}\right]
&\le\sum_{j=1}^{m}2^{-j}=1-2^{-m}\le1.
\end{aligned}
$$

期望的估计只用有限和的线性性，不要求不同位置的分歧事件独立。$j=m$ 时，$A_m=\{T=m+1\}$ 正是整块没有共同零的事件。本例使用非空块；若把这一纸面构造延伸到 $m=0$，则 $T=1$，和为空且代价为零。若初始两条条件块分布已经相同，也可以直接作同步抽样；此时比特分歧代价为零，并不需要块中实际出现一个零。

为把“原生输出”与上面的纸面共享阈值构造分开，先固定有限坐标。令 $W_n=\operatorname{Fin}(n)\to\{\mathrm{false},\mathrm{true}\}$，$C(k,n,F,z)$ 是所有满足原始 `DBonacciAdmissible` 扫描且在有限集 $F\subseteq\operatorname{Fin}(n)$ 上等于 $z$ 的完整字；若该纤维有见证 $h$，令 $L(F,z,h)=\operatorname{completionLaw}(F,z,h)$。对两个非空纤维，记原始定义的 $P(s,F,x,y,h_x,h_y)=\operatorname{prefixCoupling}(s,F,x,y,h_x,h_y)$。照 Lean 源码，这几个名字的意思是：$\operatorname{completionLaw}(F,z,h)$ 是非空纤维 $C(k,n,F,z)$ 上的均匀分布；$\operatorname{resetReady}(F,x,y)$ 指存在坐标 $z_0$，使 $x(z_0)=y(z_0)=\mathrm{false}$，所有不超过 $z_0$ 的坐标都在 $F$ 中，且 $F$ 中大于 $z_0$ 的坐标上 $x$ 与 $y$ 相同；$P$ 是两份完成字的联合分布，按扫描表 $s$ 递归定义——若 $\operatorname{resetReady}(F,x,y)$ 成立，就选定这样的 $z_0$ 与 $y$ 纤维里的一个合法字 $v$，按 $L(F,x,h_x)$ 抽一个完成字 $u$，输出 $(u,\operatorname{resetMap}(z_0,v,u))$，其中 $\operatorname{resetMap}(z_0,v,u)$ 在不超过 $z_0$ 的坐标上取 $v$、其余坐标取 $u$；否则若 $s$ 为空，两侧按各自的 completionLaw 独立抽样；若 $s=i::s'$，先用共享阈值耦合对两侧在坐标 $i$ 上的条件比特抽一对 $(b_1,b_2)$（两个边缘分布不变，共同为 `false` 的概率取两侧取 `false` 概率的较小者），把 $i$ 并入 $F$、把 $x(i),y(i)$ 分别改成 $b_1,b_2$，在 $s'$ 上递归；某侧细化纤维为空时（这样的比特对质量为零）退回独立抽样。对输出对 $w=(w_1,w_2)$，定义

$$
A_j(w)\;:\Longleftrightarrow\;\forall i\in\operatorname{take}(j,s),\;
\neg\bigl(w_1(i)=\mathrm{false}\land w_2(i)=\mathrm{false}\bigr).
$$

这里的 `take` 按列表顺序取前 $j$ 个坐标；坐标只要求 `Nodup`，不要求递增、覆盖补集或组成区间。于是原生输出事件得到精确的 Lean 归属：

::: {.theorem #thm-ch39-p2e-native-emitted-tail title="原始条件耦合完整输出的共同零尾界" lean="D5/S1/Words/AdmissibleWords/KBonacciEmittedTail.prefix_coupling_emitted_tail"}
对任意 $k,n\in\mathbb N$ 且 $0<k$，任意无重复坐标表 $s:\operatorname{List}(\operatorname{Fin}(n))$，任意有限固定集 $F:\operatorname{Finset}(\operatorname{Fin}(n))$，只要 $s$ 中每个坐标都不在 $F$ 内；再任取 $x,y:W_n$，并假设 $C(k,n,F,x)$ 与 $C(k,n,F,y)$ 都非空。对每个 $j\le |s|$，在原始联合分布 $P(s,F,x,y,h_x,h_y)$ 下，事件 $A_j$ 的指示函数均值满足

$$
\operatorname{mean}\!\left(P(s,F,x,y,h_x,h_y),\;w\mapsto\mathbf 1_{A_j(w)}\right)\le 2^{-j}.
$$

这一定义保留 `prefixCoupling` 的初始 `resetReady` 检查、递归分支与不可能细化时的独立回退；事件允许 $(\mathrm{true},\mathrm{true})$，并包含 $j=0$、空扫描、整张扫描、$x=y$ 以及初始重置分支。
:::

::: proof
对每个固定纤维作计数归纳：任取 $s$ 中的一个自由坐标，把该位为 `true` 的完成字改为 `false`，得到单射，故所有前 $j$ 位均为 `true` 的事件至多占 $2^{-j}$。在 `resetReady` 分支，两份输出在自由坐标逐位相同，事件恰化为这个全 `true` 计数界；在递归分支，首个输出对是采样到的比特对，`(false,false)` 子分支对事件贡献为零，其余有正质量的子分支进入相应细化纤维并使用归纳假设，而半失败预算给出下一步再乘 $1/2$。零质量或不可能的细化不贡献均值。整个归纳直接作用于原始 `prefixCoupling`，没有替换其初始测试或独立回退。完整证明由 Lean 内核检查。
:::

共同零尾界只控制“尚未遇到共同零”的概率；要把它用于后续分歧，还需要知道完整输出在共同零之后确实相同。对于递增且扫尽全部自由坐标的扫描，头部共同为 `false` 后，其左侧已全部固定；若更远的固定数据也相同，原始重置条件便成立。下面把这一机制直接落实到同一个 $P$ 的输出支撑上。

::: {.theorem #thm-ch39-p2e-native-supported-coalescence title="原始条件耦合完整输出支撑上的共同零汇合" lean="D5/S1/Words/AdmissibleWords/KBonacciSupportedCoalescence.prefix_coupling_supported_coalescence"}
对任意 $k,n\in\mathbb N$ 且 $0<k$，取无重复（`Nodup`）且按坐标值严格递增的列表 $s:\operatorname{List}(\operatorname{Fin}(n))$，以及有限固定集 $F:\operatorname{Finset}(\operatorname{Fin}(n))$，满足对每个 $i\in\operatorname{Fin}(n)$，$i\in s$ 当且仅当 $i\notin F$。任取历史 $x,y:W_n$ 及原始完成纤维 $C(k,n,F,x)$、$C(k,n,F,y)$ 非空的见证 $h_x,h_y$，并假设

$$
\forall i\in s,\;\forall t\in F,\quad i<t\ \Longrightarrow\ x(t)=y(t).
$$

对每个完整输出对 $w=(w_1,w_2)\in W_n\times W_n$，若 $P(s,F,x,y,h_x,h_y)(w)\ne0$，则对所有 $r,q\in\operatorname{Fin}(|s|)$ 且 $r\le q$，

$$
w_1(s[r])=\mathrm{false}\ \land\ w_2(s[r])=\mathrm{false}
\quad\Longrightarrow\quad w_1(s[q])=w_2(s[q]).
$$

这里 $s[r]$ 是从零开始编号的第 $r$ 个扫描坐标；历史 $x,y$ 自身不必是可容许字。空扫描及 $n=0$ 时结论为空量化；$F=\varnothing$、$x=y$、初始即满足重置条件、$r=q$ 与 $k=1$ 的情形均包含在上述陈述中。
:::

::: proof
对扫描列表归纳，始终保留同一个完整输出对 $w$。若初始 `resetReady` 已成立，原始定义先选重置坐标 $z$，并从 $y$ 的完成纤维选取实际的合法代表 $v$。重置分布的映射支撑把 $w$ 写成 $(u,\operatorname{resetMap}(z,v,u))$：不超过 $z$ 的坐标全在固定集内，所以每个自由扫描坐标都严格大于 $z$，而 `resetMap` 在那里保留 $u$；两份完整输出因而在全部扫描坐标上一致。这里不把任意历史本身当作合法代表，也不要求所选重置坐标就是刚扫描的头部。

若初始不重置，非空扫描按原始下一位耦合采样头部比特对。绑定分布的支撑给出一个有非零质量的比特对，并把同一个 $w$ 留在对应子分布的支撑内。该比特对的两个细化完成纤维均非空；原始定义中任一纤维不可能时的两个独立回退分支仍保留，只是它们的比特对没有正质量。子耦合的精确完成律边缘与固定坐标性质共同保证：$w$ 的头部正是这次采样的比特对。若共同零出现在头部，两边采样值于是都为 `false`；严格递增、补集覆盖和更远固定坐标上的一致性使细化历史满足 `resetReady`，由前一段得到所有剩余扫描位置相同。若共同零在后续位置，则严格次序、补集覆盖与更远固定一致性随细化历史传给子问题，归纳适用于同一个 $w$，包括子问题已经重置的情形。$r=q$ 直接由共同为 `false` 得到，空扫描没有可选的有限索引。完整证明由 Lean 内核检查。
:::

在 [@thm-ch39-p2e-native-supported-coalescence] 的全部假设下，可以把它与 [@thm-ch39-p2e-native-emitted-tail] 用于同一个原生联合分布，得到逐点分歧与有限汉明代价的估计。具体地，保持 $k>0$、$n\in\mathbb N$，令 $s$ 无重复、按坐标值严格递增并恰好枚举 $F$ 的补集；任意历史 $x,y$ 的两个原始完成纤维均非空，且对 $i\in s$、$t\in F$，有 $i<t\Rightarrow x(t)=y(t)$。历史本身不必可容许。固定

$$
\begin{aligned}
m&=|s|,\qquad a=\tfrac12\in\mathbb R_{\ge0}\cup\{\infty\},\\
P&=P(s,F,x,y,h_x,h_y).
\end{aligned}
$$

这里的 $P$ 始终是上述原始 `prefixCoupling`，包括初始 `resetReady` 检查、实际完成代表的选择以及不可能细化时的两个独立回退分支。对从零开始的 $q\in\operatorname{Fin}(m)$，定义取值为扩展非负实数的分歧指标与扫描代价

$$
\begin{aligned}
D_q(w)&=\mathbf1_{\{w_1(s[q])\ne w_2(s[q])\}},\\
H_s(w)&=\sum_{q\in\operatorname{Fin}(m)}D_q(w)
=\operatorname{scanHamming}(s,w).
\end{aligned}
$$

$H_s$ 只数扫描坐标上的分歧；列表无重复，所以每个自由坐标恰计一次。与前面纸面构造的一基编号对应时，这里的 $q$ 对应 $j=q+1$；这一编号对应本身不识别两种联合律。

固定 $q$，并取 $P(w)\ne0$ 的完整输出。若前 $q+1$ 个扫描位置中有共同 `false`，其零基索引就是某个 $r\le q$，支撑汇合结论便给出第 $q$ 位相同。取其逆否命题，得到

$$
\{w:D_q(w)=1\}\cap\operatorname{supp}(P)
\subseteq A_{q+1}\cap\operatorname{supp}(P).
$$

这里仍用前面定义的 $A_j$：它排除共同零，允许 $(\mathrm{true},\mathrm{true})$，并不要求每一位都有分歧。支撑之外 $P(w)=0$，因此即使该处不满足事件包含，相应加权项也为零。于是对所有完整输出，均有

$$
P(w)D_q(w)\le P(w)\mathbf1_{A_{q+1}(w)}.
$$

把这些非负项求和，再将尾界用于同一个 $P$ 和 $j=q+1\le m$，便有

$$
\begin{aligned}
\Pr_P(D_q=1)
&=\operatorname{mean}(P,D_q)\\
&\le\operatorname{mean}(P,\mathbf1_{A_{q+1}})
\le a^{q+1}.
\end{aligned}
$$

现在把同一联合律下的逐点界相加。完整字对集合 $W_n\times W_n$ 和扫描索引集都有限；将 `mean` 中的非负求和写成有限和，逐项分配乘法，再交换两个有限和，得到

$$
\begin{aligned}
\operatorname{mean}(P,H_s)
&=\sum_{w\in W_n\times W_n}P(w)
  \sum_{q\in\operatorname{Fin}(m)}D_q(w)\\
&=\sum_{q\in\operatorname{Fin}(m)}\operatorname{mean}(P,D_q)\\
&\le\sum_{q=0}^{m-1}a^{q+1}=1-a^m.
\end{aligned}
$$

最后的几何和在扩展非负实数中也按合法的减法解释。先在 $\mathbb R_{\ge0}$ 中令 $b=1/2$；有限几何和恒等式给出

$$
\left(\sum_{q=0}^{m-1}b^q\right)(1-b)=1-b^m,
\qquad 1-b=b.
$$

所以 $\sum_{q=0}^{m-1}b^{q+1}=1-b^m$。再沿 $\mathbb R_{\ge0}\hookrightarrow\mathbb R_{\ge0}\cup\{\infty\}$ 的标准嵌入，利用它保持有限和、幂和截断减法的性质，得到上面的 $a$ 恒等式。这里 $b^m\le1$，所有项及结果均有限，没有对无穷量作消去。整个均值计算只用有限和，不要求不同位置的分歧事件独立。

当 $m=0$ 时，逐点陈述为空量化，$H_s=0$，右端为 $1-a^0=0$；$n=0$ 也包含在内。非空扫描的末端 $q=m-1$ 使用的恰是整张扫描事件 $A_m$，得到 $a^m$，没有丢掉最后一位。$F=\varnothing$、$x=y$、初始即重置以及 $k=1$ 都保留在同一组假设内，既不排除退化情形，也不另换耦合。

以上是两条所引结果在同一原生联合律上的应用推导；它们各自的 Lean 声明并未单独陈述这组组合不等式。原始 `prefixCoupling` 的两个完成律边缘已经确立，所缺的不是这两个原生边缘。要接到本例后续的实际块刷新，还须把所用完成纤维及其限制、补回外部后的分布精确识别为这里的 $\mu_B^z$ 与 $T_B(z,\cdot)$；对左侧块，还须通过 `Fin.rev` 同时搬运两份输出、支撑和事件。上面的纸面共享阈值构造与原生联合律是否同律也未由此给出，且不从这些估计推出。因此此前纸面推导的完整 P2E 应用边界仍保留；这里也没有建立任何实验哈密顿量的物理识别。

左侧块反向抽样即可。以下用 $d$ 表示完整字的汉明距离。

把块内耦合变成完整字的同一个联合分布时，必须补回块外数据。对任意块 $B$，同样用 $\mu_B^z$ 表示 $T_B(z,\cdot)$ 限制到块内的分布。对 $z=x,y$，把赋值 $b\in\{0,1\}^B$ 接回原来的外部，记为

$$
R_z(b)_i=
\begin{cases}
b_i,&i\in B,\\
z_i,&i\notin B.
\end{cases}
$$

限制映射 $w\mapsto w|_B$ 把 $\mathcal A_B(z)$ 双射到 $\mu_B^z$ 的支持，其逆映射就是 $R_z$：给定块外数据后，每个可行的块内赋值恰有一个完整字。因此从 $\mu_B^z$ 抽样再接回外部，所得完整字精确服从 $T_B(z,\cdot)$，且必为合法字。令 $J$ 为刚构造的两条块内更新律的联合分布；先抽取 $(b,c)\sim J$，再同时令 $(X',Y')=(R_x(b),R_y(c))$，便得到同一个合法完整字对上的联合分布 $Q$。它的两个边缘分别是 $T_B(x,\cdot)$ 与 $T_B(y,\cdot)$。

当 $u\notin B$ 时，块外除 $u$ 外处处相同。记 $\delta=\mathbf1_{\{x_u\ne y_u\}}$，并令 $d_B(b,c)=\sum_{i\in B}\mathbf1_{\{b_i\ne c_i\}}$。逐点距离及其在上述联合分布下的平均满足

$$
\begin{aligned}
d(R_x(b),R_y(c))&=d_B(b,c)+\delta,\\
\mathbb E_Q[d(X',Y')]&=\mathbb E_J[d_B(b,c)]+\delta.
\end{aligned}
$$

所以远块的同步耦合使完整距离恰为 $\delta$；受影响块的扫描耦合使其期望不超过 $1+\delta$，在相邻字对上不超过 $2$。若块含 $u$，前面选取的共同完整字则使距离为 $0$。若 $x=y$，可在所有块上直接选相同刷新，保持完整距离为 $0$。

把上述三种情况按块索引平均，整个一步分块刷新因而满足

$$
\mathbb E[d(X',Y')]
\le 1-\frac\ell M+\frac{2R}M
=1-\frac1M
\quad\text{当 }d(x,y)=1.
$$

**从耦合到分块谱隙。** 这里仅需相邻合法字的实际耦合。先把其有限求和形式写清楚：简记 $T_a=E_{B_a}$，对每个有向相邻字对 $(s,t)$ 和每个原时钟索引 $a$，令 $Q_a(s,t;v,w)$ 为上面构造的同一个刷新后完整字联合律的质量。它满足

$$
\begin{aligned}
Q_a(s,t;v,w)&\ge0,\\
\sum_wQ_a(s,t;v,w)&=T_{B_a}(s,v),\\
\sum_vQ_a(s,t;v,w)&=T_{B_a}(t,w),\\
\sum_{v,w}Q_a(s,t;v,w)&=\sum_vT_{B_a}(s,v)=1.
\end{aligned}
$$

所有字指标均在原来的 $W_N$ 中。最后一式由第一边缘及已证明的行和推出。用这个联合律定义完整汉明代价

$$
C_a(s,t)=\sum_{v,w}Q_a(s,t;v,w)d(v,w).
$$

因为 $0\le d(v,w)\le N$ 且总质量为 $1$，$C_a(s,t)$ 是 $[0,N]$ 内的有限实数。含分歧位的 $\ell$ 个索引代价为零，至多 $2R$ 个受影响索引代价不超过 $2$，其余代价为 $1$。因此对这些同一实际耦合，

$$
\begin{aligned}
\sum_a(C_a(s,t)-1)&\le-\ell+2R=-1,\\
\sum_a C_a(s,t)&\le M-1.
\end{aligned}
$$

这里索引数恰为 $N-(2-\ell)+1=M=N+\ell-1\ge\ell\ge3$，所以第二行只是展开第一行的 $M$ 个减一项。若均匀选取一个索引，联合质量为 $M^{-1}\sum_aQ_a(s,t;v,w)$，总质量为 $1$，两个边缘为 $P_B(s,\cdot)$ 与 $P_B(t,\cdot)$，期望完整距离为 $M^{-1}\sum_aC_a(s,t)$。这也说明前面的一步期望估计中 $1/M$ 的来源；重复截断块仍逐索引计数。

现在看函数差。合法字集对删除 $1$ 封闭。由 $x$ 先删到逐位交 $x\cap y$，再添到 $y$，路径的前半段始终逐位不超过 $x$，后半段始终逐位不超过 $y$，故全程合法。每个相异坐标恰翻转一次，路径长度为 $d(x,y)$；任何单比特路径至少需要这么多步。因此合法翻转图的最短路距离就是完整汉明距离。$N\ge1,K\ge2$ 保证全零字和仅首位为 $1$ 的字构成一条边，图的边集非空。

对任意 $g:W_N\to\mathbb C$，定义有限相邻边最大值及全局半范数

$$
\begin{aligned}
L_{\partial}(g)&=\max_{d(s,t)=1}|g(s)-g(t)|,\\
\operatorname{Lip}(g)&=\max_{x\ne y}
\frac{|g(x)-g(y)|}{d(x,y)}.
\end{aligned}
$$

两者的最大值都在非空有限集上取到。沿上述路径对函数差使用三角不等式，得 $|g(x)-g(y)|\le L_{\partial}(g)d(x,y)$，所以 $\operatorname{Lip}(g)\le L_{\partial}(g)$；把相邻字对代入全局最大值给出反向不等式。故两者相等，并且恰在 $g$ 为常数时等于零。尤其非常数函数的相邻边最大值严格为正且有限。

固定一条相邻边和一个时钟，两个原边缘给出如下同一联合律下的比较：

$$
\begin{aligned}
(T_ag)(s)-(T_ag)(t)
&=\sum_{v,w}Q_a(s,t;v,w)(g(v)-g(w)),\\
|(T_ag)(s)-(T_ag)(t)|
&\le\sum_{v,w}Q_a(s,t;v,w)|g(v)-g(w)|\\
&\le L_{\partial}(g)C_a(s,t).
\end{aligned}
$$

等式分别使用行边缘与列边缘；不等式使用质量非负以及刚证明的全局函数差界。再对原来的 $M$ 个时钟平均，直接在每条边上得到

$$
\begin{aligned}
|(P_Bg)(s)-(P_Bg)(t)|
&\le\frac{L_{\partial}(g)}M\sum_aC_a(s,t)\\
&\le\left(1-\frac1M\right)L_{\partial}(g).
\end{aligned}
$$

沿合法最短路相加这些函数差估计，便对任意 $x,y\in W_N$ 得到

$$
\begin{aligned}
|(P_Bg)(x)-(P_Bg)(y)|
&\le\left(1-\frac1M\right)\operatorname{Lip}(g)d(x,y),\\
\operatorname{Lip}(P_Bg)
&\le\left(1-\frac1M\right)\operatorname{Lip}(g).
\end{aligned}
$$

这一步只延伸函数差的界，不要求为非相邻字对构造联合律。若非常数特征函数满足 $P_Bg=\mu g$，半范数的齐次性和严格正性立即给出已述的绝对值界 $|\mu|\le1-1/M$，也排除了特征值 $1$ 的额外特征函数。

生成元的下界还可以在一条取到最大值的边上直接读出。令

$$
A=-L_B=\sum_a(I-T_a)=M(I-P_B).
$$

设实值非常数函数 $h$ 满足 $Ah=\lambda h$，$\lambda\in\mathbb R$。取达到 $L=L_{\partial}(h)>0$ 的边，必要时交换端点，使 $h(s)-h(t)=L$。在这条边上使用刚才各时钟的比较，并相减两端的特征函数方程，得

$$
\begin{aligned}
(M-\lambda)L
&=\sum_a\bigl((T_ah)(s)-(T_ah)(t)\bigr)\\
&\le L\sum_aC_a(s,t)\le L(M-1).
\end{aligned}
$$

除以严格正的有限数 $L$，即得 $\lambda\ge1$。此处是每个索引速率 $1$ 的生成元下界；若把总刷新速率改为 $1$，生成元才是 $-A/M$，对应下界为 $1/M$。

上述特征函数比较依赖实际边缘与代价，不依赖矩阵对称性。实对称性用于下一步谱分解：各 $T_a$ 的实际纤维矩阵实对称，故 $A$ 在均匀内积下有实正交归一特征基。行和为 $1$ 给出 $A1=0$，前面的比较排除了所有非常数零特征函数；又因 $\|1\|_\pi^2=Z/Z=1$，可取 $e_0=1$，其余 $e_j$ 均与常数正交，特征值 $\lambda_j\ge1$。条件投影及其补投影的正性还给出 $0\le P_B\le I$，所以离散时间特征值非负；其绝对值收缩界本身已由边上的估计得到。

对任意实值 $h$，令 $u=h-\pi h=\sum_{j=1}^{Z-1}c_je_j$。由正交归一性和自伴性，

$$
\begin{aligned}
\operatorname{Var}_\pi(h)=\|u\|_\pi^2
&=\sum_{j=1}^{Z-1}c_j^2\\
&\le\sum_{j=1}^{Z-1}\lambda_jc_j^2
=\langle u,Au\rangle_\pi\\
&=\langle h,Ah\rangle_\pi.
\end{aligned}
$$

最后的等式使用 $A1=0$ 以及 $\langle1,Ah\rangle_\pi=\langle A1,h\rangle_\pi=0$；归一化始终是原来的 $\pi=1/Z$。对复值 $f=h+ik$，实矩阵 $A$ 分别作用于实部与虚部，方差与能量分别相加：

$$
\begin{aligned}
\operatorname{Var}_\pi(f)
&=\operatorname{Var}_\pi(h)+\operatorname{Var}_\pi(k)\\
&\le\langle h,Ah\rangle_\pi+\langle k,Ak\rangle_\pi\\
&=\operatorname{Re}\langle f,Af\rangle_\pi
=\mathcal E_B(f,f).
\end{aligned}
$$

最后一步正是上面按原时钟求和的复值条件方差恒等式。因此原有的复值分块方差界来自有限标量谱分解，无须增加全字对耦合假设。

**把分块能量交还给单点时钟。** 固定一个块 $B=B_a$。对实际可出现的外部赋值 $e\in\{0,1\}^{B^c}$，记 $e\sqcup b$ 为把外部 $e$ 与块内赋值 $b$ 按坐标拼回的完整字，并定义

$$
\begin{aligned}
A_e&=\{b\in\{0,1\}^B:e\sqcup b\in W_N\},\\
m_e&=\#A_e,\qquad \pi_e(b)=\frac1{m_e}\quad(b\in A_e),\\
f_e(b)&=f(e\sqcup b),\\
\Pr_\pi(w|_{B^c}=e)&=\frac{m_e}{Z}.
\end{aligned}
$$

可实现性保证 $m_e>0$，且固定外部后每个块内赋值恰对应一个完整字，所以 $\pi_e$ 就是实际的块内条件律。删除封闭性在这里仅作用于 $B$ 内的坐标：把 $b$ 中任意一些 $1$ 改成 $0$ 不会产生禁窗口，且整个外部 $e$ 保持不动。因此 $A_e$ 是非空的删除封闭族，$m_e\le2^{|B|}\le2^\ell$。

再固定 $i\in B$ 以外的所有块内位，要求这些数据在 $A_e$ 中可实现。第 $i$ 位的条件支持只能是 $\{0\}$ 或 $\{0,1\}$，不会是 $\{1\}$：若 $1$ 可行，删除它便给出同一外部和其余各位下的可行值 $0$。均匀律 $\pi_e$ 在双点纤维上各赋概率 $1/2$，在单点纤维上保持不动。因此每站速率 $1$ 的条件热浴时钟在每条合法翻转边上的跳转速率恰为 $1/2$。

记 $\mathscr D_e$ 为 $A_e$ 中相差一位的有序字对集合，$\mathscr U_e$ 为相应的无序边集合（每条边只计一次）。对任意复值函数 $g:A_e\to\mathbb C$，条件单点能量于是为

$$
\begin{aligned}
\mathcal E_{\mathrm{site},A_e}(g,g)
&:=\sum_{i\in B}\mathbb E_{\pi_e}
\operatorname{Var}_{\pi_e}(g\mid B\setminus\{i\})\\
&=\frac1{4m_e}\sum_{(b,c)\in\mathscr D_e}|g(b)-g(c)|^2\\
&=\frac1{2m_e}\sum_{\{b,c\}\in\mathscr U_e}|g(b)-g(c)|^2.
\end{aligned}
$$

这里方差仍使用复模平方。双点纤维的条件方差为 $|g(b)-g(c)|^2/4$，其 $\pi_e$ 质量为 $2/m_e$，故每条无序边的系数为 $1/(2m_e)$；单点纤维的贡献为零。

暂记 $A=A_e$、$m=m_e$，沿用上面的删除封闭族路径估计。任意 $x,y\in A$ 之间经过交集的合法路径长度至多为 $\ell$。均匀方差恒等式、路径上的 Cauchy–Schwarz 不等式，以及每条边至多被全部 $m(m-1)/2$ 个无序字对使用，给出

$$
\begin{aligned}
\operatorname{Var}_A(g)
&=\frac1{m^2}\sum_{\{x,y\}\subset A}|g(x)-g(y)|^2\\
&\le\frac\ell2\sum_{\{x,y\}\text{ 为合法单比特边}}|g(x)-g(y)|^2\\
&=\ell m\,\mathcal E_{\mathrm{site},A}(g,g)
\le\ell2^\ell\mathcal E_{\mathrm{site},A}(g,g).
\end{aligned}
$$

若 $m_e=1$，方差和所有能量都为零；$B=\varnothing$ 时 $A_e$ 只含空赋值，单点能量的空和也为零。

现在把条件单点能量还原到原链。固定 $e$ 和 $b|_{B\setminus\{i\}}$，就是固定完整字在 $i^c=[1,N]\setminus\{i\}$ 上的全部数据。因此条件支持和各点概率都与原链的第 $i$ 站条件律完全相同。令 $v_i(w)=\operatorname{Var}_\pi(f\mid i^c)(w)$，便有

$$
\mathcal E_{\mathrm{site},A_e}(f_e,f_e)
=\sum_{i\in B}\frac1{m_e}\sum_{b\in A_e}v_i(e\sqcup b).
$$

以原链抽到的 $e=w|_{B^c}$ 为随机外部，按其实际概率 $m_e/Z$ 平均，得到

$$
\begin{aligned}
\mathbb E_\pi[\mathcal E_{\mathrm{site},A_e}(f_e,f_e)]
&=\sum_e\frac{m_e}{Z}\mathcal E_{\mathrm{site},A_e}(f_e,f_e)\\
&=\frac1Z\sum_e\sum_{b\in A_e}\sum_{i\in B}v_i(e\sqcup b)\\
&=\sum_{i\in B}\mathbb E_\pi[\operatorname{Var}_\pi(f\mid i^c)].
\end{aligned}
$$

这里对 $e$ 的求和只取可实现的外部；各 $e\sqcup b$ 恰遍历一次 $W_N$。条件平均中的 $1/m_e$ 已与外部概率中的 $m_e$ 抵消，不再添加归一化因子。把删除封闭族的方差界用于 $f_e$，再按同一外部律平均，便得到每块的比较

$$
\mathbb E_\pi[\operatorname{Var}_\pi(f\mid B^c)]
\le\ell2^\ell\sum_{i\in B}
\mathbb E_\pi[\operatorname{Var}_\pi(f\mid i^c)].
$$

最后按原来的全部块索引 $a$ 求和。每个位点 $i$ 恰出现在 $a=i-\ell+1,\ldots,i$ 这 $\ell$ 个块中；即使短链上若干块都等于整链，它们各自速率 $1$ 的时钟仍分别计入。因此

$$
\begin{aligned}
\mathcal E_B(f,f)
&\le\ell2^\ell\sum_a\sum_{i\in B_a}
\mathbb E_\pi[\operatorname{Var}_\pi(f\mid i^c)]\\
&=\ell^2 2^\ell\mathcal E(f,f).
\end{aligned}
$$

与分块方差界合并就得到所述 Poincaré 界及 $\lambda_{K,N}\ge C_K^{-1}$。再用 [@ex-ch39-p2e-heatbath-scale] 的完整空间谱比较，因为 $K\ge2$ 时 $2/C_K<1$，得到 $\Delta_{K,N}\ge2/C_K$。例如 $K=2$ 给出 $1/36$，$K=3$ 给出 $1/400$。空链 $N=0$ 仍没有激发谱隙；短链 $1\le N<K$ 的精确谱隙仍为 $2$。

**从谱隙到任意振幅的能量估计。** 固定 $K\ge2,N\ge1$，简记 $H=H_{K,N}$、$\Psi=\Psi_{K,N}$。任意完整布尔字空间中的复向量 $|\psi\rangle=\sum_{w\in\Omega_N}a_w|w\rangle$ 都按实际合法字与非法字分解为

$$
\begin{aligned}
\psi&=\psi_L+\psi_I,\\
|\psi_L\rangle&=\sum_{w\in W_N}a_w|w\rangle,\\
|\psi_I\rangle&=\sum_{w\in\Omega_N\setminus W_N}a_w|w\rangle,\\
\beta&=\langle\Psi|\psi\rangle
=\langle\Psi|\psi_L\rangle.
\end{aligned}
$$

取上例的逆像 $f(w)=\sqrt Z\,a_w$，其中 $Z=|W_N|$。由已经逐项核对的归一化与能量恒等式，再用本例的实际 Poincaré 界，得到

$$
\begin{aligned}
\pi f&=\beta,\\
\operatorname{Var}_\pi(f)&=\|\psi_L\|^2-|\beta|^2,\\
Q(H,\psi_L)&=2\mathcal E(f,f)\\
&\ge\frac2{C_K}
\bigl(\|\psi_L\|^2-|\beta|^2\bigr).
\end{aligned}
$$

父例的矩阵元展开已给出合法与非法扇区之间的零矩阵元，因此两块没有交叉能量；上例的非法罚能估计给出 $Q(H,\psi_I)\ge\|\psi_I\|^2$。由于 $C_K=(2K-1)^2 2^{2K-1}\ge72$，令 $c_K=2/C_K\le1$，便可合并为

$$
\begin{aligned}
Q(H,\psi)&=Q(H,\psi_L)+Q(H,\psi_I)\\
&\ge c_K\bigl(\|\psi_L\|^2-|\beta|^2\bigr)
+\|\psi_I\|^2\\
&\ge c_K\bigl(\|\psi\|^2-|\langle\Psi|\psi\rangle|^2\bigr).
\end{aligned}
$$

这就是二次型意义下的原生算符不等式 $H\ge c_K(I-|\Psi\rangle\langle\Psi|)$。向量无需归一化，也无需与基态正交；若 $\|\psi\|=1$，右侧残量就是 $1-|\langle\Psi|\psi\rangle|^2$。当 $1\le N<K$ 时所有字合法，$\psi_I=0$，同一推导仍成立。$N=0$ 只有一维真空，能量与去掉基态后的残量都为零，不能据此声称存在激发谱隙。

这把已推导的固定 $K$、链长一致谱隙明确用于任意态的能量估计，仍是上述纸面推导的应用，不新增 Lean 验证。它没有把该模型等同于实际里德堡或任意子哈密顿量，也没有建立与 Rauzy 边界维数的物理对应。
:::

::: {.remark #rem-ch39-p2e-rydberg-anyon-literature title="文献结果：斐波那契任意子黄金链与里德堡原子阻塞实验背景（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 在凝聚态与原子分子光物理文献中，$K = 2$ 的禁邻 `11` 希尔伯特空间在两类著名多体系统中获得了物理实现或理论建模：其一是 A. E. Feiguin 等人提出的拓扑斐波那契任意子“黄金链”（golden chain）模型（*Phys. Rev. Lett.* **98**, 2007, 160409），其融合规则 $\tau \times \tau = \mathbf{1} + \tau$ 使有限链融合空间维数按斐波那契数增长；其二是里德堡（Rydberg）原子阵列中的偶极/范德瓦耳斯 $1/r^6$ 阻塞机制（理论建模见 I. Lesanovsky, *Phys. Rev. Lett.* **106**, 2011, 025301；51 原子量子模拟器实验见 H. Bernien et al., *Nature* **551**, 2017, 579–584）。引用这些物理背景时须注意两重边界：第一，最近邻两体里德堡阻塞刚好实现禁相邻激发 $|11\rangle$（对应 $K = 2$ 的 PXP 子空间），但单纯拉大两体阻塞半径只会禁止距离 $R_b$ 内的一切激发对（例如连 `101` 一并禁止），**并不会自动产生 $K > 2$ 的禁连续 $1^K$ 约束**——若要在物理哈密顿量中实现 $K > 2$ 的 $K$-Bonacci 子空间，必须另行设计专门的 $K$ 体局域相互作用；第二，任意子融合空间与有限阻塞比实验哈密顿量均非 [@thm-ch39-p2e-direct-encoder-ranks] 中精确零振幅等距直接编码器的形式同义物。
:::

::: {.viz src="pisot-clifford-rauzy-sandtable" preset="entanglement" height="500"}
**跨切口禁戒与可达秩矩形卡（`entanglement`）**：左侧展示跨切口拼接检验 $\tau(x) + \iota(y) < K$（青色标出相容拼接字对，品红标出触发 $1^K$ 阻塞的非法拼接），右侧绘制可达页秩矩形 $[1, R_0] \times [1, R_1]$ 与页熵上界 $\ln R_b$，琥珀色标出当前选定的参数与秩点。可达秩矩形与熵界属 `LEAN ✓`，具体参数枚举属 `NUM`，里德堡与任意子物理背景属 `文献结果`。
:::

最后，当有限长合法字延展为无穷轨道，系统的不确定性与可区分性便同时在马尔可夫平稳核、边界柱集概率与有限观测逃逸对三条轨道上显影。
