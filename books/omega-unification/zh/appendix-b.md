# 附录 B 受控术语词典、六层证据总账与实时形式化统计

本附录为《OMEGA 统一》（`OMEGA//UNIFY`）全书五卷十五章提供四份核心速查总表：全书受控中英术语与数学符号词典、六层认识论证据分层总账、交互实验室 `OMEGA//UNIFY` 与九幅双语定制静态图索引，以及基于所钉 `trureturing@dev` 提交 [{commit}](trureturing:) 在构建时实时生成的全书形式化验证统计。上游复算仓库结构、`ShellProjection.lean` 与 34 支代表性脚本索引见 [附录 A](appendix-a.md)。

## B.1 受控双语术语与核心符号词典 {#sec-ou-appb-glossary}

下表统一全书五卷的中英文核心术语，明确每项概念的精确定义与适用边界，避免将模型内有效参数误读为第一性原理常数：

| 中文术语与核心符号 | 英文对应术语 | 精确数学定义与物理边界 | 正文入口 |
| :--- | :--- | :--- | :--- |
| **十九点贝伦德球壳** $S_{19}$ | 19-Point Behrend Shell | 整球面 $x_1^2 + x_2^2 + x_3^2 = 867$ 上的 19 点反三项等差构型，取平方弦长 $d^2 \le 804$ 的 135 条原边与 22 个独立频率 | [第一章](ch01-behrend-shell-and-frequencies.md) |
| **四元数双时钟** $(U, V)$ | Dual Quaternion Clocks | 由正黎曼零点纵坐标 $\gamma$ 与原弧角差 $p = (\theta_{724}-\theta_{244})\gamma$、$q = (\theta_{804}-\theta_{244})\gamma$（辅以最短原弧 $v = \theta_{12}\gamma$）生成的单位四元数比较钟 | [第二章](ch02-quaternion-clocks-and-haar-zeros.md) |
| **黎曼零点候选窗** | Candidate Riemann Zero Window | 经费耶尔核碰撞界、兰道围道与算术舒尔枢轴筛出的实际正零点区间（如 #8236、#8359、#11431、#148341、#226358 与 #2,306,888,100,085） | [第三章](ch03-riemann-zeros-fejer-and-landau.md)、[第十三章](ch13-winding-ladder-and-joint-vacuum.md) |
| **磁球壳质量算子** $L_\gamma$ | Magnetic Shell Mass Operator | 挂接双钟带荷边相位的十九点图拉普拉斯算子及其两步局部扩展 $\kappa L(L - cI)$，决定重模阈值与轻模谱隙 | [第四章](ch04-gauge-crossings-and-monotone-barriers.md) |
| **规范动能谱迹** $S(u), M_1$ | Gauge Kinetic Spectral Trace | 由单一正热核权生成的动能矩 $S(u) = \sum_i e^{-u y_i}$ 与一阶尺度导数 $M_1 = \sum_i y_i e^{-y_i}$；单迹配平存在锐下界 $r = Q/M > 189$ 与 $3.9Q$ 微扰封顶 | [第五章](ch05-kinetic-trace-and-uv-ceilings.md) |
| **中性门户秩五界** $d \ge 5$ | Rank-Five Neutral Portal Floor | 自旋配平两圈交汇窗内同时满足希格斯质量与四次稳定性的最小平坦规范中性单态维数（$d \le 4$ 严格排除） | [第六章](ch06-higgs-portals-and-electroweak-scale.md) |
| **共同谱隙与站点方差分界** | Universal Spectral Gap & Site-Variance Cut | 全双钟环面五荷共用的三轻模谱隙 $(8.685, 9.6)$，及由全壳非平凡二分跨界边权平方和最小值给出的站点方差分界 $T = 9 + (1-\delta)^2$（原固定分界三窗零点之共同谱隙皆含 $[9, 10.19]$） | [第七章](ch07-chiral-three-generations.md) |
| **三代轮换破缺与 42 圈 CP 底线** | Cyclic Breaking & 42-Loop CP Floor | 壳坐标轮换 $P:(x,y,z)\mapsto(y,z,x)$ 强制 CKM 单项化；实测混合要求 $\|[T,X]\|_{\mathrm{HS}} > 0.0414$，几何三角闭路重现参考 CP 相位恰需 42 圈 | [第八章](ch08-flavor-hierarchy-and-ckm.md) |
| **六面味坐标** $c$ | Six-Face Flavor Coordinate | 十九点壳上标定味结构的有理角坐标；[2]+[4] 联立强制 $|c| > 0.9404240$，10 位二进制码 `1011` 即排除单调全局真空（9 位码 `505` 有反例） | [第八章](ch08-flavor-hierarchy-and-ckm.md)、[第十三章](ch13-winding-ladder-and-joint-vacuum.md) |
| **重子三重对称** $\mathbb{Z}_3$ | Baryon Triality | 残余离散对称 $X = h(2Y-B) + q(3B) \pmod 3$，要求局域算符满足 $\Delta B \in 3\mathbb{Z}$，将轻场重子破坏算符推高至维数 15（保 $B-L$ 为 18） | [第九章](ch09-proton-stability-and-baryon-triality.md) |
| **四维单纯形雷吉作用与铰链负载** | Simplicial Regge Action & Hinge Load | 等边四单形上的角亏和 $K = A(2\pi N_2 - 10\theta N_4)$ 与三角面铰链阶数 $q_h$；在 $g = I - J/5$ 上复现自旋二 Fierz–Pauli 动能并暴露共形模发散障碍 | [第十章](ch10-regge-gravity-and-spin2.md) |
| **四层热核真空配平** | Four-Layer Vacuum Stencil | 利用四层重谱热核系数抵消主导紫外真空能的千分之二曲率窗方案，仍伴随显著暗能量灵敏度与共同标尺外生性 | [第十一章](ch11-induced-gravity-and-dark-energy.md) |
| **共同算术钟** $F(j)$ | Shared Arithmetic Clock | 单一正半定算子 $K$ 与单位源 $s$ 的二次预解式读数 $F(j) = \langle s, (I + j^2 K)^{-1}s\rangle$；基准尺度上，六项精确输入使 $p(B)>99.931\%$，六项输入的 44 位格锁定第七项 35 位码 `32071996606` | [第十二章](ch12-shared-arithmetic-clock.md) |
| **529 面双钟作用与绕数阶梯** | 529-Triangle Action & Winding Ladder | 十九点壳 529 个三角面的加权双钟变分作用，其临界阶梯依次经 19、21、27、31、36 圈抵达 105 圈跨高度全局门槛，且单调权全阶受阻 $> 1/4$ | [第十三章](ch13-winding-ladder-and-joint-vacuum.md) |
| **624 内部通道与三分之一中转格** | 624 Internal Channels & Denominator-Three Shell | 由极点三条最近邻有向弦比较派生的 624 通道及允许九步回程与 17 拍局部反射的 76 点三分之一球面中转格 | [第十四章](ch14-624-channels-and-memory-rank.md) |
| **局部辅助记忆秩阶梯** | Auxiliary Memory Rank Staircase | 在原十九点上精确复现三时钟完整响应所需的最小辅助维数随平方弦距截止 $D$ 的单调阶梯：$38 \to 29\text{--}31 \to 26\text{--}27 \to 25\text{--}26 \to 24 \to 23 \to 21 \to 20 \to 19$（$C_3$ 对称截止 $D = 392$） | [第十四章](ch14-624-channels-and-memory-rank.md) |

为便于跨章对照公式，下表另列全书高频出现的数学符号速查：

| 符号 | 精确含义与量纲角色 | 首次或主要出处 |
| :--- | :--- | :--- |
| $\theta_j = \arccos(1 - j/1734)$ | 平方半径 $867$ 壳上平方弦长为 $j$ 的原弧圆心角（无量纲弧度） | [第一章](ch01-behrend-shell-and-frequencies.md)、[第二章](ch02-quaternion-clocks-and-haar-zeros.md) |
| $\gamma_n$ | 第 $n$ 枚正黎曼零点纵坐标（按重数计数） | [第三章](ch03-riemann-zeros-fejer-and-landau.md) |
| $r = Q/M,\;\tau = \log(Q/\mathrm{TeV})$ | 交汇尺度与重谱基频之比，及相对 $1\,\mathrm{TeV}$ 的对数跑动长度 | [第五章](ch05-kinetic-trace-and-uv-ceilings.md) |
| $W_L^{\log}, W_R^{\log},\;\alpha_G^{-1}$ | 左右重标量塔一圈对数暴露与交汇点处统一规范逆耦合 | [第五章](ch05-kinetic-trace-and-uv-ceilings.md) |
| $B \subset (0, \infty)$ | 共同算术钟浓缩 $>99.931\%$ 谱权的三段零点高度带并集 | [第十二章](ch12-shared-arithmetic-clock.md) |
| $T_j,\;F(j)$ | 黎曼 $\xi$ 函数参考算术时间与共同二次预解式第 $j$ 项读数 | [第十二章](ch12-shared-arithmetic-clock.md) |
| $k, d$ | 联合零点见证中的中心偶倍率（$k = 32$）与钟弦分母（$d = 724$） | [第十三章](ch13-winding-ladder-and-joint-vacuum.md) |
| $D$ | 旧十九点传播块允许局域修正的平方弦距截止（$56, 224, 296, 392, 544, 1152, 1376, 1568$） | [第十四章](ch14-624-channels-and-memory-rank.md) |

## B.2 六层认识论证据分层总账 {#sec-ou-appb-epistemic-ledger}

本书对每一条定理、数值区间、模型构造与开放目标均执行严格六层划界。各层之间实行**单向不可越级原则**：Arb 高精度区间认证、上游独立 `Init` 重放或外部 RH 形式化里程碑均不会自动把 `ARGUED`、`NUM`、`MODEL` 或 `OPEN` 条目抬升为本书所钉提交上的 `LEAN ✓` 冻结定理。

下面的谱例子把“计算正确”与“独立证明正性”分开：[第三章 §3.1](ch03-riemann-zeros-fejer-and-landau.md#sec-ou-3-1) 的凯莱判据可以用有限维负惯性指数精确读出，但矩阵本身仍由实际零点构造。

::: {.theorem #thm-ou-appb-mirror-gram-inertia title="有限镜像奇子空间的 Gram 惯性" lean="D5/S3/Midline/Cayley/FiniteMirrorKreinGramInertia.canonical_zeta_finite_mirror_gram_inertia"}
取库中无外部参数的典范表示 `zetaZeroData`，记其互异非平凡零点为 $\rho_n$、解析重数为 $m_n>0$。同高镜像指标置换 $\sigma$ 保持重数并满足 $\rho_{\sigma(n)}=1-\overline{\rho_n}$。对任意 $T\in\mathbb R$，定义

$$
\begin{aligned}
W_T&=\{n:|\rho_n-\tfrac12|\le T\},\\
R_T&=\{n\in W_T:n<\sigma(n)\},\\
\kappa_T&=\sum_{n\in R_T}m_n.
\end{aligned}
$$

在 $H=\ell^2(\{(n,k):k<m_n\};\mathbb C)$ 的标准基上，令 $J e_{n,k}=e_{\sigma(n),k}$、$[x,y]_J=\langle x,Jy\rangle$，并对 $n\in R_T$、$0\le k<m_n$ 取 $v_{n,k}=e_{n,k}-e_{\sigma(n),k}$。这些向量的实际 Gram 矩阵 $G_T=([v_{n,k},v_{r,l}]_J)$ 满足

$$
\begin{aligned}
G_T&=-2I,\\
n_-(G_T)&=\kappa_T,\\
n_-(G_T)>0
&\ \Longleftrightarrow\
\exists n\in W_T:\operatorname{Re}\rho_n\ne\tfrac12.
\end{aligned}
$$

这里 $n_-$ 按重数计负特征值，矩阵由 $\kappa_T$ 个镜像奇向量索引。窗口是谱半径窗 $|\rho-\tfrac12|\le T$，并非只限制 $|\operatorname{Im}\rho|$ 的高度窗。
:::

::: proof
每个非固定二元镜像轨道只取一个代表；不同代表及其镜像占据互不相交的标准基坐标，同一零点的不同重数副本也正交。因此这些向量的普通希尔伯特 Gram 矩阵为 $2I$，而 $Jv_{n,k}=-v_{n,k}$，故实际镜像 Gram 矩阵为 $-2I$。每个所选轨道贡献恰好 $m_n$ 个负特征值；镜像固定恰等价于零点在临界线上，且解析重数为正，得到最后的等价。完整证明由 Lean 内核检查。
:::

该计数对临界线外零点的存在保持条件式。结合第三章引述的外部 RH 形式化事实，可推出每个 $T$ 的 $\kappa_T=0$（组合这两层证据的手工推导，`ARGUED`）；上面的内核定理本身给出精确惯性公式。

若通过有限个预解式方向观察一个厄米型，怎样保证负方向没有被遗漏？一个充分保证是这些方向张成整个待测空间。先看两点手算（`ARGUED`）：取支撑点 $x_0=0,x_1=1$、中心 $z=-1$，连续两阶倒数幂给出 $C=\begin{pmatrix}1&1\\1/2&1/4\end{pmatrix}$，且 $\det C=-1/4\ne0$。两个方向确实独立；一般情形由同一个 Vandermonde 机制控制。

::: {.theorem #thm-ou-appb-cauchy-jet-inverse title="互异支撑点的单中心 Cauchy 射流逆" lean="D5/S3/Analytic/GoldenTomography/CauchyFeatureRightInverse.cauchy_feature_right_inverse"}
设 $n\in\mathbb N$，复支撑点 $x_0,\ldots,x_{n-1}$ 两两互异，且 $z\in\mathbb C$ 满足每个 $x_a\ne z$。定义方阵

$$
C_{ak}=(x_a-z)^{-(k+1)},\qquad 0\le a,k<n,
$$

并令 $R$ 为库中 `cauchyJetFeatureRightInverse` 指定的矩阵逆。则

$$
CR=RC=I_n,
$$

且映射 $v\mapsto Cv$ 为单射。
:::

::: proof
令 $r_a=(x_a-z)^{-1}$，则 $C=\operatorname{diag}(r_a)V$，其中 $V_{ak}=r_a^k$。避开中心使每个 $r_a\ne0$，而平移后取倒数保持支撑点互异。因此对角因子与 Vandermonde 因子均可逆，矩阵逆同时给出左右逆和分析映射的单射性。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ou-appb-cauchy-source-rank title="射流分离谱值，源覆盖重数空间"}
以下算子解释与惯性推论是手工推导（`ARGUED`）。在上述条件下，对 $n$ 维单谱自伴算子 $K=\operatorname{diag}(x_a)$，设源向量 $s$ 的每个坐标 $s_a\ne0$。以 $(K-zI)^{-(k+1)}s$ 为列的矩阵为 $B=\operatorname{diag}(s_a)C$，故 $B^{-1}=R\operatorname{diag}(s_a^{-1})$。对任意厄米型 $Q$，二次型恒等式 $v^*B^*QBv=(Bv)^*Q(Bv)$ 与 $B$ 的双射性给出 $n_\pm(B^*QB)=n_\pm(Q)$：每个正定或负定子空间及其维数均可沿此双射来回传递。

有重谱值时，互异性只适用于不同谱值，不能把重数副本当成互异支撑点。精确地说，设有限维复内积空间上的自伴算子 $K$ 有 $q$ 个不同谱值，$P_\lambda$ 为对应谱投影，源为 $s_1,\ldots,s_p$，且 $z\notin\operatorname{spec}K$。则

$$
\begin{aligned}
\mathcal O&=\operatorname{span}\{(K-zI)^{-(k+1)}s_j:0\le k<q,\ 1\le j\le p\}\\
&=\bigoplus_{\lambda\in\operatorname{spec}K}
\operatorname{span}\{P_\lambda s_j:1\le j\le p\}.
\end{aligned}
$$

每个滤波向量都是右侧投影源的线性组合；反过来，对每个固定源用上述 $q\times q$ 射流矩阵的逆，可逐个取回 $P_\lambda s_j$。所以完整观测恰要求每个本征空间被投影源张成。单源在每个本征空间至多提供一个方向；增加射流阶数无法补出缺失的重数方向。

这里使用的是同一中心的连续倒数幂（即预解式对 $z$ 求导所得的归一化射流），不是任意采样列表，也不是仅给出 [第十二章](ch12-shared-arithmetic-clock.md#sec-ch12) 若干标量钟读数就已知这些向量或整个 Gram 矩阵。可逆性没有给出统一的误差放大界，更没有控制无限谱尾项。独立 RH 谱路线仍需从算术或几何构造正性并识别完整零点谱；有限个窗口的检查不能代替对所有 $T$ 的控制。
:::

即使观测覆盖全部方向，正性也要检验完整的二次型。若其中一块已知正定，可以先让这部分系数自由调整，只保留剩余端口的最小读数；这个读数由 Schur 补给出，而不是某个端口单独的对角读数。

::: {.theorem #thm-ou-appb-schur-attained-minimum title="正定内部块的 Schur 极小值" lean="D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least"}
设 $m,d\in\mathbb N$，$A\in\mathbb C^{m\times m}$ 为厄米矩阵，$B\in\mathbb C^{m\times d}$，$C\in\mathbb C^{d\times d}$ 为正定厄米矩阵。令

$$
H=\begin{pmatrix}A&B\\B^*&C\end{pmatrix},\qquad S=A-BC^{-1}B^*.
$$

对每个固定的 $x\in\mathbb C^m$，下列最小值实际达到：

$$
\min_{y\in\mathbb C^d}
\begin{pmatrix}x\\y\end{pmatrix}^{\!*}
H\begin{pmatrix}x\\y\end{pmatrix}=x^*Sx.
$$
:::

::: proof
正定性保证 $C$ 可逆，配方给出

$$
\begin{pmatrix}x\\y\end{pmatrix}^{\!*}H\begin{pmatrix}x\\y\end{pmatrix}
=x^*Sx+(y+C^{-1}B^*x)^*C(y+C^{-1}B^*x).
$$

第二项非负，取 $y=-C^{-1}B^*x$ 即为零，故 $x^*Sx$ 是值域中实际达到的最小元。完整证明由 Lean 内核检查。
:::

由此可作手工推导（ARGUED）：在 $C\succ0$ 的前提下，$H\succeq0$ 恰等价于 $S\succeq0$。一向由配方直接得出；另一向在每个固定 $x$ 的极小点检验 $H$。因此正定背景不会掩盖经过消元的负残差，但检验残差需要保留跨块读数 $B$。

::: {.example #ex-ou-appb-collective-schur-residual title="正定背景后的单个负残差"}
以下矩阵代入与显式见证是手工推导（ARGUED）。取整数 $n\ge3$、实数 $1/(n-1)<a<1/(n-2)$，记 $\mathbf1_k=(1,\ldots,1)^T$，并把一个端口与其余 $n-1$ 个端口分块：

$$
\begin{aligned}
H&=(1+a)I_n-a\mathbf1_n\mathbf1_n^*,\\
A&=1,\qquad B=-a\mathbf1_{n-1}^*,\\
C&=(1+a)I_{n-1}-a\mathbf1_{n-1}\mathbf1_{n-1}^*,\\
p&=1-(n-2)a>0.
\end{aligned}
$$

在 $\mathbf1_{n-1}$ 方向上，$C$ 的特征值为 $p$；在其正交补上为 $1+a>0$，故 $C\succ0$。于是 $C^{-1}\mathbf1_{n-1}=p^{-1}\mathbf1_{n-1}$，最后一个 Schur 残差为

$$
s=1-\frac{(n-1)a^2}{p}
=\frac{(1+a)(1-(n-1)a)}{p}<0.
$$

把保留端口的系数固定为 $x=1$，极小点及其完整读数为

$$
\begin{aligned}
y_{\min}&=\frac{a}{p}\mathbf1_{n-1},\qquad
w=\begin{pmatrix}1\\y_{\min}\end{pmatrix},\\
Hw&=\begin{pmatrix}s\\0\end{pmatrix},\qquad w^*Hw=s.
\end{aligned}
$$

等式 $Hw=(s,0)^T$ 还说明，在 $H$ 所定义的型下，这个残差方向与整个内部块正交。取 $n=3,a=3/4$，即得 $p=1/4$、$w=(1,3,3)^T$ 与 $w^*Hw=-7/2$。两个内部端口的块已正定，逐个端口的对角读数也都是 $1$，但经过联合调整的一个残差已足以否定整体正性。这需要完整的跨端口 Gram 读数，不能从若干标量算术钟读数直接推出；矩阵是代数模型，不指定实际零点，也不构造独立的 RH 正性证明。若 $C$ 只有正半定性，上述逆矩阵与极小值论证不再直接适用。
:::

::: {.remark #rem-ou-appb-schur-regularization title="正则化显露核方向的耦合"}
给奇异内部块加上小的正对角项，可以继续使用 [@thm-ou-appb-schur-attained-minimum]，但正则化的极小值未必有有限极限。以下精确分解与误差界是手工推导（`ARGUED`）。设 $m,d\in\mathbb N$，$A\in\mathbb C^{m\times m}$ 厄米，$B\in\mathbb C^{m\times d}$，$C\in\mathbb C^{d\times d}$ 半正定。令 $P_0$ 为到 $\ker C$ 的正交投影，$P_\lambda$ 为各个正谱值的谱投影，并定义

$$
\begin{aligned}
C^\dagger&=\sum_{\lambda>0}\lambda^{-1}P_\lambda,\\
S_\dagger&=A-BC^\dagger B^*,\\
S_\varepsilon&=A-B(C+\varepsilon I)^{-1}B^*,\qquad \varepsilon>0.
\end{aligned}
$$

所有求和仅遍历 $C$ 的有限个正谱值，下列极限均取 $\varepsilon\to0^+$。在每个谱子空间上取倒数，便得到

$$
\begin{aligned}
S_\varepsilon&=S_\dagger-\frac1\varepsilon BP_0B^*+E_\varepsilon,\\
E_\varepsilon&=B\left(\sum_{\lambda>0}
\frac{\varepsilon}{\lambda(\lambda+\varepsilon)}P_\lambda\right)B^*.
\end{aligned}
$$

取 $\gamma>0$ 使每个正谱值均不小于 $\gamma$；若 $C=0$，可任取 $\gamma>0$，此时和式为空且 $E_\varepsilon=0$。由于每个系数都在 $0$ 与 $\varepsilon/[\gamma(\gamma+\varepsilon)]$ 之间，

$$
\begin{aligned}
0&\preceq E_\varepsilon
\preceq\frac{\varepsilon}{\gamma(\gamma+\varepsilon)}B(I-P_0)B^*,\\
\|E_\varepsilon\|_{\mathrm{op}}
&\le\frac{\varepsilon}{\gamma(\gamma+\varepsilon)}
\|B(I-P_0)\|_{\mathrm{op}}^2.
\end{aligned}
$$

这里的范数均为欧氏算子范数。因此 $S_\varepsilon+\varepsilon^{-1}BP_0B^*$ 总在算子范数下趋于 $S_\dagger$，而未经补偿的 $S_\varepsilon$ 有有限矩阵极限恰当且仅当 $BP_0=0$，此时极限就是 $S_\dagger$，误差由上式控制。具体地，对每个固定保留向量 $x$，

$$
x^*S_\varepsilon x=x^*S_\dagger x
-\frac{\|P_0B^*x\|^2}{\varepsilon}+x^*E_\varepsilon x.
$$

若 $P_0B^*x\ne0$，该极小读数趋于 $-\infty$；否则趋于 $x^*S_\dagger x$。这也证明了矩阵极限的必要条件：$BP_0\ne0$ 时，其伴随 $P_0B^*$ 非零，必有前一种 $x$。对每个 $\varepsilon>0$，正则化的极小点是 $y_\varepsilon=-(C+\varepsilon I)^{-1}B^*x$，同一谱分解给出 $\varepsilon y_\varepsilon\to-P_0B^*x$，量出发散的内部响应。

一次固定尺度的正性检查只能认证 $H_\varepsilon=H+\operatorname{diag}(0,\varepsilon I)$。例如 $A=[1],B=[1],C=[0]$ 时，$S_\dagger=[1]$，但 $S_\varepsilon=[1-1/\varepsilon]$；$H_\varepsilon$ 在 $\varepsilon\ge1$ 时半正定，在 $0<\varepsilon<1$ 时不半正定。若能在趋零的一列 $\varepsilon$ 上证明 $H_\varepsilon\succeq0$，则逐个固定向量取极限才可推出 $H\succeq0$。这些有限维结论不给出跨谱窗口的统一正谱隙，也不识别实际零点谱；独立 RH 谱路线仍须另外控制完整观测、极限与谱尾项。
:::

有限维可恢复性还留下一个观测问题：检出某个负方向，是否必须先准确重构指定的负方向？两点模型把这两种误差要求分开。

::: {.example #ex-ou-appb-optimal-negative-detection title="检测负方向与检验指定见证的精度分界"}
以下是完整的手工推导（`ARGUED`）。取精确节点 $1,u=1+h$，其中 $h>0$，固定读数尺度为

$$
\begin{aligned}
A_h&=\begin{pmatrix}1&u^{-1}\\1&u^{-2}\end{pmatrix},
&J_0&=\operatorname{diag}(1,-1),\\
K_h&=A_hJ_0A_h^*=\begin{pmatrix}a&b\\b&d\end{pmatrix},\\
a&=1-u^{-2},\quad b=1-u^{-3},\quad d=1-u^{-4}.
\end{aligned}
$$

三项 $a,b,d$ 均正。置 $\tau=a+d$、$\delta=h/u^2$，直接展开得 $\det K_h=-\delta^2$。解特征方程 $\lambda^2-\tau\lambda-\delta^2=0$，得唯一负特征值 $-\gamma_h$，其中

$$
\gamma_h=\frac{\sqrt{\tau^2+4\delta^2}-\tau}{2}>0.
$$

若 Hermitian 误差 $E$ 满足欧氏算子范数 $\|E\|_{2\to2}<\gamma_h$，取负特征值的单位特征向量 $v$，即有 $v^*(K_h+E)v\le-\gamma_h+\|E\|_{2\to2}<0$。在边界取 $E=\gamma_hvv^*$，则 $K_h+E$ 正半定，故这一范数下的严格阈值为 $\gamma_h$。

实际逐项认证 $|E_{ij}|\le\eta$ 时，也能求出整个矩阵保有负方向的锐阈值。对 $\eta\ge0$，置

$$
\begin{aligned}
D&=a+d+2b,\\
\eta_*&=\frac{\delta^2}{D}
=\frac{h}{(2u+1)(2u^2+u+1)},\\
t&=\frac{b+d}{D},\qquad w=(t,-(1-t)).
\end{aligned}
$$

因 $0<t<1$，有 $\|w\|_1=1$。二次型配方给出

$$
a s^2-2b s(1-s)+d(1-s)^2
=D(s-t)^2-\eta_*.
$$

因此 $w^*K_hw=-\eta_*$，而 $|w^*Ew|\le\eta\|w\|_1^2=\eta$；只要 $\eta<\eta_*$，每个允许的 Hermitian 扰动都仍有严格负方向。反过来，取

$$
E_*=\eta_*\begin{pmatrix}1&-1\\-1&1\end{pmatrix}.
$$

矩阵 $K_h+E_*$ 的对角元均正，且行列式为 $-\delta^2+\eta_*D=0$，所以它正半定。这个误差对每个 $\eta\ge\eta_*$ 都合法，证明上述严格阈值对整个负方向检测问题是锐的。

比较指定源方向的见证 $c_h=(u^2/h)(1,-1)$：它满足 $A_h^*c_h=(0,1)$ 与 $c_h^*K_hc_h=-1$。由 $|c_h^*Ec_h|\le\eta\|c_h\|_1^2$，其逐项误差保证的严格阈值为 $\eta_{\mathrm{fixed}}=h^2/(4u^4)$；取同形误差 $E=\eta_{\mathrm{fixed}}\begin{pmatrix}1&-1\\-1&1\end{pmatrix}$ 即使该见证变为零。两种检测保证的差别在节点靠拢时尤为清楚：

$$
\begin{aligned}
\lim_{h\to0^+}\frac{\gamma_h}{h}&=\sqrt{10}-3,\\
\lim_{h\to0^+}\frac{\eta_*}{h}&=\frac1{12},\\
\lim_{h\to0^+}\frac{\eta_{\mathrm{fixed}}}{h^2}&=\frac14.
\end{aligned}
$$

由 $\tau/h=(u+1)(2u^2+1)/u^4\to6$、$\delta/h=1/u^2\to1$ 及显式阈值即得这些极限。检出某个负方向可容许线性尺度的误差，指定重构见证却只容许平方尺度；两种容差都随 $h\to0^+$ 消失。这些结论假定整个 Gram 读数的误差已获认证，不涵盖节点误差、无限谱尾项或仅有若干标量钟读数的情形。节点与矩阵是代数模型，不指定实际零点，也不提供独立的 RH 正性构造。
:::

带着有限维恢复、误差下检测与独立正性之间的这些区别，再读下表，各层证据各自承担的责任便清楚了。

| 证据层级与徽章 | 验证机制与数据来源 | 逻辑边界与公理责任 | 全书代表内容与交叉入口 |
| :--- | :--- | :--- | :--- |
| **第 1 层 · Lean 4 冻结内核锚点**（`LEAN ✓`） | `the-omega-institute/trureturing@dev` 所钉提交 [{commit}](trureturing:) 上的冻结声明（同时涵盖零公理 `OmegaInit`/`OmegaMath` 基座与经典 `Mathlib` 对照锚点） | 经 Lean 4 内核完整校验并写入 `Golden/Frozen/state/`；按所钉快照的公理元数据区分为零公理（`axioms: []`）、已记录标准公理侧与快照未记录公理闭包的冻结声明，实时计数见 [§B.4](#sec-ou-appb-live-stats) | 有理射影重叠与凯莱正交旋转、无 $\pi$ 哈尔矩与彼得—魏尔正交、有理拉格朗日—格拉姆与舒尔补极小、赫维茨 $F_3$ 伴随单射与模方 5 赫克谱界 |
| **第 2 层 · 外部已形式化 RH/GRH 边界**（外部形式化事实） | 2026 年 11 月 21 日 Lean FRO 与 Mathlib Initiative 联合确认的 [Alpöge 黎曼猜想形式化证明](https://leanprover-community.github.io/blog/posts/riemann-hypothesis/) | 作为外部独立形式化里程碑予以引述，明确区隔于本书采用的有限高度算术包围检验，且绝不自动赋予物理匹配模型或选权假设任何形式化背书 | [第三章](ch03-riemann-zeros-fejer-and-landau.md) 临界线零点谱底座与 [第十二章](ch12-shared-arithmetic-clock.md) 算术钟有限高度区间边界 |
| **第 3 层 · 书面证明与文献边界**（`ARGUED`） | 作者与评审逐行核验的代数、分析与组合证明（载于 `Ω复算说明.md` 与 9 份专题档案）及注明出处的文献定论 | 不佩戴 `LEAN ✓` 内核徽章；须满足前提透明、反例可核对，部分纯代数核心具备后续下沉 Lean 形式化的条件 | 单正谱迹 $r \le 189$ 凸性排除（[第五章](ch05-kinetic-trace-and-uv-ceilings.md)）、三代轮换 $\|[T,X]\|_{\mathrm{HS}} > 0.0414$ 与 42 圈 CP 下界（[第八章](ch08-flavor-hierarchy-and-ckm.md)）、Gauss–Radau 极值与伯恩斯坦证书框架（[第十二章](ch12-shared-arithmetic-clock.md)）及 PDG 实测输入边界 |
| **第 4 层 · 计算证书与数值实验诊断**（`NUM`） | 组织实验库 `trureturing-experiments`（`experiments/ch39-omega-research/replay/`）1,785 文件复算归档中的 `Fraction` / `python-flint`（Arb、`fmpq_mat`）断言脚本、`Init`-重放的 `ShellProjection.lean`（`rfl`），以及 `OMEGA//UNIFY` 交互实验室的浏览器实时数值诊断 | 精确有理、Arb 与 `rfl` 复算证书具零浮点舍入漂移保证，严格依赖所声明的输入区间与截断前提；实验室实时数值诊断（如有限相位网格上的双精度雅可比本征值计算）显式披露精度与抽样边界；上游独立 `ShellProjection.lean` 归此层，不并入 `trureturing@dev` 冻结统计 | 平方半径 17 九点壳压缩（[附录 A §A.2](appendix-a.md#sec-ou-appa-shell-projection)）、35 位第七时间码 `32071996606`（[第十二章](ch12-shared-arithmetic-clock.md)）、单调权 $> 1/4$ 排斥与 105 圈联合零点见证（[第十三章](ch13-winding-ladder-and-joint-vacuum.md)）、$38 \to 19$ 最小辅助记忆秩阶梯（[第十四章](ch14-624-channels-and-memory-rank.md)） |
| **第 5 层 · 模型内有效构造**（`MODEL`） | 明确写明全部额外表示、势函数、标尺与权重输入的有效构造（对应四问中 **4/4** 的模型内通过分支） | 严禁冒充无参数第一性原理推导；每条构造必须同页并列其外生自由度与灵敏度账单 | $r = 400$ 两圈规范交汇与秩五中性希格斯门户（[第 5–6 章](ch05-kinetic-trace-and-uv-ceilings.md)）、54 模矩阵希格斯味拟合与 $\mathrm{U}(1)_X$ 重子三重完备（[第 8–9 章](ch08-flavor-hierarchy-and-ckm.md)）、四层热核曲率窗（[第十一章](ch11-induced-gravity-and-dark-energy.md)）与 105 圈 100 维权族（[第十三章](ch13-winding-ladder-and-joint-vacuum.md)） |
| **第 6 层 · 第一性原理开放前沿**（`OPEN`） | 对应原书四问中 **0/4** 尚未从单一主联络无事后拟合导出的核心硬问题 | 严格保留未证状态，不附验证引用，为后续理论突破与形式化提供明确验收门槛 | 导出重阈值与电弱标度、从主联络选定站点方差分界并构造四维相互作用手征三代、导出共同味作用与动态质子选择定则、导出 $G_N$ 与暗能量以及建立自然非单调选权原理（汇总于 [第十五章](ch15-unified-verdict-and-open-roadmap.md) 与 [终章](coda.md)） |

### B.2.1 谱桥中的证据边界：镜像守恒与正定性 {#sec-ou-appb-mirror-unitarity}

[第三章的凯莱判据](ch03-riemann-zeros-fejer-and-landau.md#sec-ou-3-1)把临界线条件转成单位圆条件。函数方程还提供同高镜像 $\rho\mapsto1-\bar\rho$，但镜像守恒究竟保住了哪一种内积？这个问题让上表中的证据边界落到一个可以手算的谱模型上。

给定库中完整的 `ZeroData` $Z$，包括互异零点 $\rho_n$、精确解析重数 $m_n$、穷尽性、两种对称及局部有限性。令 $I_Z=\{(n,k)\in\mathbb N^2:k<m_n\}$，$H_Z=\ell^2(I_Z;\mathbb C)$。同高镜像保持重数，因而诱导坐标对合 $\sigma$ 与自伴对合等距算子 $(J_Z\psi)(v)=\psi(\sigma v)$。记 $[\psi,\phi]_Z=\langle\psi,J_Z\phi\rangle$，并令 $C_Z$ 为对角系数 $c_n=(\rho_n-1)/\rho_n$ 定义的有界凯莱算子。

::: {.theorem #thm-ou-appb-mirror-j-unitarity title="镜像凯莱守恒与严格负方向" lean="D5/S3/Midline/Cayley/CanonicalZetaCayleyJUnitary.zeroCayleyOperator_j_unitary D5/S3/Midline/Cayley/CanonicalZetaMirrorFundamentalSymmetry.mirror_odd_vector_strictly_negative"}
对任意上述 `ZeroData` $Z$，不添加 RH 假设，恒有

$$
C_Z^*J_ZC_Z=J_Z.
$$

若坐标 $v\in I_Z$ 满足 $\sigma v\ne v$，则其标准单位向量 $e_v$ 给出的镜像奇向量 $w_v=e_v-J_Ze_v$ 满足

$$
\operatorname{Re}[w_v,w_v]_Z<0.
$$
:::

::: proof
若 $c$ 为某坐标的系数，$c'$ 为其镜像系数，则 $c'=1/\bar c$，故 $\bar c c'=1$；逐坐标配对并求和即得算子恒等式。若 $\sigma v\ne v$，则 $w_v\ne0$ 且 $J_Zw_v=-w_v$，于是 $\operatorname{Re}[w_v,w_v]_Z=-\|w_v\|^2<0$。完整证明由 Lean 内核检查。
:::

::: {.example #ex-ou-appb-j-unitary-not-unitary title="不定内积守恒不保证普通酉性"}
以下为二维代数手算（`ARGUED`）。在 $\mathbb C^2$ 上取

$$
J=\begin{pmatrix}0&1\\1&0\end{pmatrix},\qquad
C=\begin{pmatrix}2&0\\0&1/2\end{pmatrix}.
$$

直接相乘得 $C^*JC=J$，而 $C^*C=\operatorname{diag}(4,1/4)\ne I$。向量 $w=(1,-1)$ 满足 $\langle w,Jw\rangle=-2$。这组矩阵只检验从 $J$-酉性推出普通酉性的逻辑，不声称来自实际的 $\zeta$ 零点。
:::

即使观测向量已经张成整个空间，检验哪些线性组合仍然重要。[@thm-ou-ch12-observation-inertia] 的右逆条件保证完整 Gram 矩阵保留惯性；只检验固定观测向量的两两主子矩阵，却可能遗漏必须联合所有端口才能看到的负方向。

::: {.example #ex-ou-appb-collective-gram-negativity title="所有真主子矩阵正定，整体仍可不定"}
以下为有限维手工推导（`ARGUED`）。先看三个端口：

$$
G_3=\begin{pmatrix}1&-3/4&-3/4\\-3/4&1&-3/4\\-3/4&-3/4&1\end{pmatrix}.
$$

每个二阶主子矩阵的特征值都是 $1/4,7/4$，严格为正。然而 $\mathbf1_3=(1,1,1)^T$ 满足 $G_3\mathbf1_3=-\mathbf1_3/2$，故 $\mathbf1_3^*G_3\mathbf1_3=-3/2<0$。三端口共同变化暴露了两两检验看不到的负方向。

这种现象可发生在任意端口数。设整数 $n\ge3$，记 $\mathbf1_n=(1,\ldots,1)^T$，取实数 $a$ 满足

$$
\frac1{n-1}<a<\frac1{n-2},\qquad
G_n=(1+a)I_n-a\mathbf1_n\mathbf1_n^*.
$$

对任意含 $m$ 个端口的非空主子矩阵，$1\le m\le n$，把向量分成 $\mathbf1_m$ 方向及其正交补，直接得到特征值

$$
1-(m-1)a\quad\text{（重数 }1\text{）},\qquad
1+a\quad\text{（重数 }m-1\text{）}.
$$

因此每个非空真主子矩阵都正定，而整体恰有一个负特征值 $1-(n-1)a$。上述开区间也恰好是这两个性质同时成立的参数范围：全体端口的共同方向要求左侧严格不等式，$n-1$ 个端口的共同方向要求右侧严格不等式。

它也能实现为一组张成整个空间的观测向量的实际不定 Gram 矩阵。令

$$
\begin{aligned}
P&=\frac{\mathbf1_n\mathbf1_n^*}{n},&J&=I_n-2P,\\
B&=\sqrt{1+a}\,(I_n-P)+\sqrt{(n-1)a-1}\,P.
\end{aligned}
$$

由 $P=P^*=P^2$，有 $J=J^*$、$J^2=I_n$，且 $B$ 在两个正交子空间上的系数均严格为正，故可逆。以 $b_j=Be_j$ 为观测向量，在形式 $[x,y]_J=x^*Jy$ 下相乘即得

$$
(b_i^*Jb_j)_{ij}=B^*JB
=(1+a)(I_n-P)-((n-1)a-1)P=G_n.
$$

所以缺失的并非源方向，而是联合端口的正性检验。这里的子矩阵只取固定观测向量的子列表，未检验它们的任意线性组合。对任意固定上限 $r\ge2$，取 $n=r+1$，便得到所有至多 $r$ 端口的主子矩阵正定而整体不定的例子；有限窗口的核正性须控制任意系数的完整二次型。这些是代数模型，不声称来自实际零点，也不改变第三章所引的外部 RH 事实。
:::

识别负方向还涉及读数精度：即使有限观测代数上可逆，两个支撑点靠近时，逆映射也可能放大误差。下面的模型把“恢复全部方向”与“可靠认证一个负方向”分开；它使用完整的半双线性 Gram 读数，而非[第十二章](ch12-shared-arithmetic-clock.md)的若干标量钟读数。

::: {.example #ex-ou-appb-two-node-recovery-precision title="两点靠近时的恢复精度"}
以下全为手工推导（`ARGUED`），支撑点和矩阵均为代数模型，不指定实际零点。取 $h>0$、$u=1+h$，在中心 $0$ 对支撑点 $1,u$ 读取倒数一次与二次幂。固定节点与读数尺度，令未知复振幅 $x\in\mathbb C^2$ 的读数为 $y=A_hx$，其中

$$
\begin{aligned}
A_h&=\begin{pmatrix}1&u^{-1}\\1&u^{-2}\end{pmatrix},
&\det A_h&=-\frac{h}{u^2},\\
A_h^{-1}&=\frac1h\begin{pmatrix}-1&u\\u^2&-u^2\end{pmatrix},
&\|A_h^{-1}\|_{\infty\to\infty}&=\frac{2u^2}{h}.
\end{aligned}
$$

双侧相乘核对逆矩阵；其两行绝对值和分别为 $(1+u)/h$ 与 $2u^2/h$，后者因 $u>1$ 较大。若读数误差 $\|e\|_\infty\le\varepsilon$，其中 $\varepsilon\ge0$，则

$$
\|A_h^{-1}(y+e)-x\|_\infty\le\frac{2u^2}{h}\varepsilon.
$$

取 $e=(\varepsilon,-\varepsilon)$ 即达等号，所以在这一固定读数尺度下不存在与 $h$ 无关的统一误差放大界。

再取不定形式 $J_0=\operatorname{diag}(1,-1)$，记观测向量 $A_h^*e_1,A_h^*e_2$ 的 Gram 矩阵为 $K_h=A_hJ_0A_h^*$，其中 $e_1,e_2$ 为标准基。令

$$
\begin{aligned}
c_h&=(A_h^{-1})^*e_2=\frac{u^2}{h}(1,-1),\\
c_h^*K_hc_h&=-1.
\end{aligned}
$$

若已认证 Hermitian 读数 $\widehat K_h=K_h+E$ 的逐项误差满足 $|E_{ij}|\le\eta$，其中 $\eta\ge0$，则三角不等式给出

$$
\begin{aligned}
|c_h^*E c_h|&\le\eta\Bigl(\sum_i|(c_h)_i|\Bigr)^2
=\frac{4u^4}{h^2}\eta,\\
\eta<\frac{h^2}{4u^4}&\quad\Longrightarrow\quad c_h^*\widehat K_hc_h<0.
\end{aligned}
$$

误差 $E=\eta\begin{pmatrix}1&-1\\-1&1\end{pmatrix}$ 达到该误差上界，并在阈值处使此见证的二次型恰为零。因此严格阈值对这个固定见证的逐项误差保证是锐的；它不声称是所有负方向检测方法的极限。精确可逆性适用于每个 $h>0$，而该认证所允许的 Gram 误差随 $h\to0$ 按平方尺度缩小；这里未控制节点误差或无限谱尾项。
:::

因此，函数方程给出的镜像守恒允许正、负方向相互配平；第三章单位圆条件要求的是每个凯莱系数自身的模长等于 $1$。把前者用于独立谱证明时，还须证明额外的正定性或相应的普通酉性条件。已知外部 RH 证明可以支持临界线结论，却不会仅凭这条镜像恒等式给出独立的希尔伯特—波利亚算子构造。

## B.3 交互实验室与全书九幅静态图索引 {#sec-ou-appb-media-map}

本书配有一座五卡联动的交互三维与数值实验室 **`OMEGA//UNIFY`**（目录标识 `behrend-unification-lab`），以及 **9 幅双语定制语义静态图**（由 `books/omega-unification/figures/` 下的脚本按主题与印刷版统一配色角色生成：绿色与蓝色保留给 Lean 核验与零公理内核、紫色标记书面证明与精确证书及已证锐障、琥珀色标记当前模型选择、红色严格保留给开放前沿）。下表先列出交互实验室全部五张实验卡的部署位置与操控对象：

| 实验室代号与实验卡 ID | 核心实验对象与实时读数 | 正文嵌入章 | 综合工作台入口 |
| :--- | :--- | :---: | :---: |
| **`OMEGA//UNIFY`** · `shell-clocks` | 十九点贝伦德球壳（$r^2 = 867$，底层 135 原边）三维分布、选定弦类弧与双四元数时钟相位联动 | [第一章](ch01-behrend-shell-and-frequencies.md) | [第十五章](ch15-unified-verdict-and-open-roadmap.md) |
| **`OMEGA//UNIFY`** · `three-gen-gap` | 五种荷质量谱随双钟角滑动，实时对比站点方差分界 $T$、固定分界 $9$ 与全环面三轻模共同谱隙 $(8.685, 9.6)$ | [第七章](ch07-chiral-three-generations.md) | [第十五章](ch15-unified-verdict-and-open-roadmap.md) |
| **`OMEGA//UNIFY`** · `clock-bands` | 共同算术钟前六项约束下的三高度带 $B$ 谱权浓缩（$>99.931\%$）与第七项 35 位码分离 | [第十二章](ch12-shared-arithmetic-clock.md) | [第十五章](ch15-unified-verdict-and-open-roadmap.md) |
| **`OMEGA//UNIFY`** · `winding-ladder` | 529 面双钟作用的 $19 \to 21 \to 27 \to 31 \to 36 \to 105$ 绕数阶梯与单调权 $> 1/4$ 能隙 | [第十三章](ch13-winding-ladder-and-joint-vacuum.md) | [第十五章](ch15-unified-verdict-and-open-roadmap.md) |
| **`OMEGA//UNIFY`** · `memory-rank` | 旧壳修正弦距截止 $D$ 滑动下的 $38 \to 19$ 三时钟最小辅助记忆秩阶梯与 $D = 392$ 对称槛 | [第十四章](ch14-624-channels-and-memory-rank.md) | [第十五章](ch15-unified-verdict-and-open-roadmap.md) |

下表逐一索引全书全部 **9 幅双语定制语义静态图**：

| 序号 | 静态图脚本标识 | 所属章节 | 图景主题与关键数学边界 |
| :---: | :--- | :---: | :--- |
| 1 | `ou-five-volumes` | [前言](README.md) | 五卷全景路线图：从十九点贝伦德球壳与黎曼零点入口经五卷直抵 `4/4` 模型见证与 `0/4` 零拟合总账 |
| 2 | `ch01-behrend-shell` | [第一章](ch01-behrend-shell-and-frequencies.md) | 十九点贝伦德球壳单位球投影、极点 $(17, 17, 17)$、六条三点循环轨道与最短弦 $12$ 及双钟弦 $724, 804$ |
| 3 | `ch03-zero-window-landscape` | [第三章](ch03-riemann-zeros-fejer-and-landau.md) | 第 `#11431` 枚零点相对 `#11628` 的中点隔离、Fejér 四阶矩占比与三条谐波相位亏额对数时间窗 |
| 4 | `ch05-gauge-threshold-boundaries` | [第五章](ch05-kinetic-trace-and-uv-ceilings.md) | 标量阈值族 $r \le 189$ 排除、$r = 400$ 与自旋配平 $r \approx 8.53$ 交汇及 $3.9Q / 14Q / 20Q / 30Q$ 微扰紫外上界 |
| 5 | `ch07-three-generation-gap` | [第七章](ch07-chiral-three-generations.md) | 五荷单步磁拉普拉斯全环面三轻模共同谱隙 $(8.685, 9.6)$、公共截断 $9$ 与 $(1, \omega, \omega^2)$ 循环特征标 |
| 6 | `ch11-vacuum-balance-sensitivity` | [第十一章](ch11-induced-gravity-and-dark-energy.md) | 从普朗克标度至 $10^{-122}$ 暗能量的对数曲率阶梯、紫外截止变号门槛与四层 $(-1, 3, -3, 1)$ 矩抵消模板 |
| 7 | `ch12-arithmetic-clock-bands` | [第十二章](ch12-shared-arithmetic-clock.md) | 六项时间强迫的三高度带浓缩（$>99.931\%$）与第七拍 $35$ 位预测码 `32071996606` vs. 参考码 `32071992476` |
| 8 | `ch13-winding-threshold-ladder` | [第十三章](ch13-winding-ladder-and-joint-vacuum.md) | 529 面双钟绕数阶梯（$\le 18, 19, 21, 27, 31, 36, 105$）、非增权 $> 1/4$ 能差与联合零点见证 `#2,306,888,100,085` |
| 9 | `ch14-memory-rank-staircase` | [第十四章](ch14-624-channels-and-memory-rank.md) | 平方弦距截止 $D$ 下的三时钟最小辅助记忆秩阶梯（$38 \to 19$）、$D = 392$ 循环对称门槛与 $D = 512$ 时钟跳变 |

## B.4 全书实时形式化统计 {#sec-ou-appb-live-stats}

遵循本仓库“源文件唯一真理、统计产物编译期自动生成”的契约，本节不手工抄录任何定理或环境总数，而是直接嵌入构建工具依据 `trureturing.lock.json`（所钉 `trureturing@dev` 提交 [{commit}](trureturing:)）实时编译的全书形式化证据摘要表：

::: {.stats src="summary"}
:::

覆盖本书全部正文与媒体引用的冻结声明完整索引（附所钉提交上的源码逐行链接）由构建流水线按需独立生成；条目被纳入统计索引并不改变其所属的认识论层级。

::: {.stats src="declarations" display="link" format="html"}
查看编译生成的完整声明索引
:::

查阅上方动态统计与声明索引时，请始终严守编译统计与数学证明责任之间的清晰边界：

::: {.remark #rem-ou-appb-epistemic-boundary title="动态统计与证据责任的边界"}
上方的实时汇总与声明索引精确记录本书在所钉 `trureturing@dev` 提交上引用的机器核验声明、公理分布与环境频次；但索引收录、统计汇总或三维交互演示本身从不替代数学证明，也不将 `ARGUED`、`NUM`、`MODEL` 或 `OPEN` 结论升级为 `LEAN ✓`。同样，[附录 A](appendix-a.md) 中的上游 Python / Arb 证书与独立 `Init`-重放文件 `ShellProjection.lean` 属于第 4 层计算证据（`NUM`），与 `trureturing@dev` 冻结声明分账管理；核查任一命题时，请始终回到对应章节的完整前提与边界条件。
:::
