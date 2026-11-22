# 35.6.7.1 直接编码器的秩与纠缠熵 {#sec-ch39-s05-s07-s01-rank-and-entropy}

页秩上界 $R_0, R_1$ 与直接编码契约（`directContract`）见 [§35.6.7](ch39-s05-s07-cut-entanglement.md#sec-ch39-p2e-entanglement)。

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
