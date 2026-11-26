# E.8.1.4 曲率从哪里来 {#sec-appe-curvature-from-half-comparison}

条款 IV 让一切三点和乐等于 $\mathbf{1}$，而球面角盈与贝里相位确实存在。两者并不冲突：平坦的是全比较，弯曲的是它的平方根。

::: {.remark #rem-appe-half-comparison-holonomy title="全比较平坦，半比较的三点和乐是吉拉尔角盈（手工推导与文献结果）"}
**手工推导。** 对求同读数为实标量 $s>-1$ 的公平元 $u$，由 $u+u^*=2s\mathbf{1}$ 得 $u^2=2su-\mathbf{1}$，于是 $(\mathbf{1}+u)^2=2(1+s)\,u$。令

$$
r(u):=\frac{\mathbf{1}+u}{\sqrt{2(1+s)}},
$$

则 $r(u)$ 是公平元且 $r(u)^2=u$，称为 $u$ 的**半比较**。它的求同读数满足 $S(r)^2=\frac{1+s}{2}=1-\frac v2$。

在 $\mathcal{Cl}_{3,0}$ 中取两两不对径的单位向量 $a,b,c$，记 $r_{ab}=r(ab)$，$[a,b,c]=a\cdot(b\times c)$，$\mathbf{I}=e_1e_2e_3$。则全比较满足 $ab\cdot bc\cdot ca=\mathbf{1}$，而

$$
r_{ab}\,r_{bc}\,r_{ca}=\frac{(1+a\cdot b+b\cdot c+c\cdot a)+[a,b,c]\,\mathbf{I}a}{\sqrt{2(1+a\cdot b)(1+b\cdot c)(1+c\cdot a)}} .
$$

推导：$(\mathbf{1}+ab)(\mathbf{1}+bc)(\mathbf{1}+ca)=2+ab+ba+ca+ac+bc+a(bc)a$，其中用到 $ab\cdot bc=ac$、$bc\cdot ca=ba$、$ab\cdot ca=a(bc)a$ 与 $ab\cdot bc\cdot ca=\mathbf{1}$。标量部分是 $2(1+a\cdot b+b\cdot c+c\cdot a)$。双向量部分是 $b\wedge c+a(b\wedge c)a$；记 $b\wedge c=\mathbf{I}n$，$n=b\times c$，则 $a(\mathbf{I}n)a=\mathbf{I}\bigl(2(a\cdot n)a-n\bigr)$，两项相加得 $2[a,b,c]\,\mathbf{I}a$。分母由 $r$ 的公平性确定，同时给出恒等式

$$
(1+a\cdot b+b\cdot c+c\cdot a)^2+[a,b,c]^2=2(1+a\cdot b)(1+b\cdot c)(1+c\cdot a).
$$

**文献结果。** 上式右端形如 $\cos\frac\Omega2+\sin\frac\Omega2\,\mathbf{I}a$，是保持 $a$ 不动的旋子，其中 $\frac\Omega2=\operatorname{atan2}\bigl([a,b,c],\,1+a\cdot b+b\cdot c+c\cdot a\bigr)$；分母为正时即 $\tan\frac\Omega2=\dfrac{[a,b,c]}{1+a\cdot b+b\cdot c+c\cdot a}$。$\lvert\Omega\rvert$ 是球面三角形 $abc$ 的面积，即吉拉尔角盈，$\Omega$ 的符号由 $[a,b,c]$ 的符号给出（van Oosterom–Strackee 1983；Eriksson 1990）。

**与冻结定理的对应。** 乘积公式与分母恒等式在泡利矩阵模型里已冻结，见 [@thm-appe-bloch-triangle-return-phase]。分子的两个量 $1+a\cdot b+b\cdot c+c\cdot a$ 与 $[a,b,c]$ 正是 [`triple_bargmann_bloch`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch) 中 $4\operatorname{Tr}(P_aP_bP_c)$ 的实部与虚部。把上面的恒等式与 $\det G(a,b,c)=[a,b,c]^2$ 联立（$[a,b,c]^2$ 的展开式冻结为 [`triangle_gram`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.triangle_gram)），得到

$$
\det G(a,b,c)=(2-v_{ab})(2-v_{bc})(2-v_{ca})\,(1-\cos\Omega),\qquad v_{xy}=1-x\cdot y ,
$$

其中 $\det G$ 的展开式见 [`three_anchor_gram_det_formula`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula)。
:::

$S(r)^2=1-\frac v2$ 在布洛赫球上就是 $\cos^2\frac\theta2$：半比较求同读数的平方等于 $1$ 减去半个矢高，这是玻恩权重的弦—矢高写法，它本身不替代 `H5` 的可加性前提。行列式公式说的是：三点格拉姆体积等于三个互补矢高之积乘以角盈的矢高，[§28.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison)“二生三”原胞的 $\det G=\sin^4\epsilon$ 是它的特例。对 `H8` 而言，第 1 层内生的射影和乐不需要新的输入，它是条款 IV 之下把全比较开平方的结果；仍然需要第 2 层新输入的，是随时空基点变化的纤维联络及其动力学。

乘积公式不只停在手工推导上。把 $\mathcal{Cl}_{3,0}$ 换成它的泡利矩阵模型（$e_k\mapsto\sigma_k$，$\mathbf{I}\mapsto i\mathbf{1}$，对合 ${}^*$ 对应共轭转置），半比较成为一个具体的 $2\times2$ 酉矩阵，下面两条结论已在 Lean 中验证。对 $r\in\mathbb{R}^3$ 记 $r\cdot\sigma=r_1\sigma_x+r_2\sigma_y+r_3\sigma_z$，$P_r=\frac12(\mathbf{1}+r\cdot\sigma)$；对 $\phi\in\mathbb{C}^2$ 记向 $r$ 的归一化投影

$$
N_r(\phi):=\frac{P_r\phi}{\sqrt{\operatorname{Re}\,\phi^\dagger P_r\phi}} .
$$

::: {.lemma #lem-appe-rotor-gate-normalized-projection title="旋子门把 $a\cdot\sigma$ 转到 $b\cdot\sigma$，在本征旋量上等于归一化投影" lean="D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.rotor_shortest_gate"}
设 $a,b\in\mathbb{R}^3$ 是单位向量且 $b\neq-a$，令

$$
R_{a\to b}:=\frac{\mathbf{1}+(b\cdot\sigma)(a\cdot\sigma)}{\sqrt{2(1+a\cdot b)}} .
$$

则

1. $R_{a\to b}\,R_{a\to b}^\dagger=\mathbf{1}$；
2. $R_{a\to b}\,(a\cdot\sigma)\,R_{a\to b}^\dagger=b\cdot\sigma$；
3. 对满足 $\psi^\dagger\psi=1$ 与 $P_a\psi=\psi$ 的 $\psi\in\mathbb{C}^2$，有 $R_{a\to b}\,\psi=N_b(\psi)$。
:::

::: proof
记 $A=a\cdot\sigma$，$B=b\cdot\sigma$，则 $A^2=B^2=\mathbf{1}$，$AB+BA=2(a\cdot b)\mathbf{1}$。分子 $\mathbf{1}+BA$ 满足 $(\mathbf{1}+BA)(\mathbf{1}+AB)=2(1+a\cdot b)\mathbf{1}$ 与 $(\mathbf{1}+BA)A(\mathbf{1}+AB)=2(1+a\cdot b)B$，这是前两条。第三条：$A\psi=\psi$ 给出 $(\mathbf{1}+BA)\psi=2P_b\psi$，而 $\psi^\dagger P_b\psi=\frac{1+a\cdot b}{2}>0$，两边的归一化因子相同。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-bloch-triangle-return-phase title="布洛赫三角上三次旋子门的返回相位" lean="D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.shortest_gate_triangle_holonomy"}
设 $a,b,c\in\mathbb{R}^3$ 是单位向量，$b\neq-a$，$c\neq-b$，$a\neq-c$。记

$$
S:=1+a\cdot b+b\cdot c+c\cdot a,\qquad D:=a\cdot(b\times c).
$$

则

1. $S^2+D^2=2(1+a\cdot b)(1+b\cdot c)(1+c\cdot a)$，且 $S^2+D^2>0$；
2. 三个旋子门的乘积为

   $$
   R_{c\to a}\,R_{b\to c}\,R_{a\to b}=\frac{S\,\mathbf{1}-iD\,(a\cdot\sigma)}{\sqrt{S^2+D^2}} ;
   $$

3. 对满足 $\psi^\dagger\psi=1$ 与 $P_a\psi=\psi$ 的 $\psi\in\mathbb{C}^2$，依次向 $b$、$c$、$a$ 做归一化投影，得

   $$
   N_a\bigl(N_c(N_b(\psi))\bigr)=\frac{S-iD}{\sqrt{S^2+D^2}}\,\psi .
   $$
:::

::: proof
第 1 条：记 $x=a\cdot b$，$y=b\cdot c$，$z=c\cdot a$。格拉姆恒等式 $D^2=1+2xyz-x^2-y^2-z^2$（[`triangle_gram`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.triangle_gram)）代入后，$S^2+D^2$ 展开为 $2(1+x)(1+y)(1+z)$；三个因子在两两不对径时都为正。第 2 条：三个分子相乘得 $(\mathbf{1}+AC)(\mathbf{1}+CB)(\mathbf{1}+BA)=2S\,\mathbf{1}-2iD\,A$，三个归一化因子之积由第 1 条等于 $2\sqrt{S^2+D^2}$。第 3 条：[@lem-appe-rotor-gate-normalized-projection] 的第 3 条把每一次归一化投影换成相应的旋子门，前两条保证每一步之后的旋量仍是单位旋量并落在下一步所需的本征空间里；最后用 $A\psi=\psi$。完整证明由 Lean 内核检查。
:::

与 [@rem-appe-half-comparison-holonomy] 对照：$R_{a\to b}$ 是 $r_{ba}=r_{ab}^*$ 的像，所以定理第 2 条是注记中乘积的对合 $(r_{ab}\,r_{bc}\,r_{ca})^*=r_{ac}\,r_{cb}\,r_{ba}$，$D$ 前的符号随之由正变负；第 1 条就是注记末尾的恒等式。第 3 条给出第 2 条的操作读法：从 $a$ 的本征旋量出发，沿 $a\to b\to c\to a$ 做三次归一化投影，回到原旋量并乘上模为 $1$ 的因子 $(S-iD)/\sqrt{S^2+D^2}$。Lean 没有陈述的部分照旧分层：把辐角 $\operatorname{atan2}(D,S)$ 等同于半个吉拉尔角盈是文献结果；旋子的指数形式没有形式化；“最短”意义下的最小性与唯一性也没有形式化，Lean 模块里 `rotor` 与 `shortestGate` 只是名字。Lean 中 $N_r(\phi)$ 对一切 $\phi$ 有定义（分母为零时按 Lean 的约定取零向量）；定理只在各步分母 $\sqrt{(1+u\cdot v)/2}>0$ 处用到它。

[@rem-appe-real-realizability-return-phase] 第 1、2 款在“有一个对象与其余每个对象都不正交”的情形已在所钉仓库冻结，陈述如下；这时不需要填满的条件。一般的填满情形与单比特的第 4 款仍是手工推导。

::: {.proposition #prop-appe-real-rephasing-star title="有一行不含零的厄米矩阵：可重定相为实矩阵，当且仅当三点乘积全为实" lean="D5/S3/Quantum/PureState/BargmannRealRephasing.exists_real_rephasing_iff_triple_products_real D5/S3/Quantum/PureState/BargmannRealRephasing.exists_real_gram_rephasing_iff_triple_products_real"}
设 $G$ 是 $N\times N$ 复矩阵，$i_0$ 是一个指标，并且 $G_{i_0j}\neq0$ 对每个 $j$ 成立。

1. 若 $G$ 是厄米矩阵，则存在实数 $\theta_1,\dots,\theta_N$ 使一切 $e^{i\theta_i}G_{ij}e^{-i\theta_j}$ 为实数，当且仅当对一切指标 $i,j,k$（允许重复），$G_{ij}G_{jk}G_{ki}$ 为实数。
2. 若 $G$ 半正定，则存在实数 $\theta_1,\dots,\theta_N$ 与 $N\times N$ 实矩阵 $B$，使 $e^{i\theta_i}G_{ij}e^{-i\theta_j}=\left(B^{\mathsf T}B\right)_{ij}$ 对一切 $i,j$ 成立，当且仅当对一切指标 $i,j,k$，$G_{ij}G_{jk}G_{ki}$ 为实数。
:::

::: proof
“仅当”：相位沿 $i\to j\to k\to i$ 相消，重定相不改变 $G_{ij}G_{jk}G_{ki}$，而它在实矩阵中算出来是实数。“当”：取 $\theta_j=\arg G_{i_0j}$。由厄米性 $G_{ji_0}=\overline{G_{i_0j}}$，于是

$$
e^{i\theta_i}G_{ij}e^{-i\theta_j}=\frac{G_{i_0i}\,G_{ij}\,G_{ji_0}}{\lvert G_{i_0i}\rvert\,\lvert G_{i_0j}\rvert},
$$

是三点乘积 $G_{i_0i}G_{ij}G_{ji_0}$ 的正实数倍，所以是实数；$G_{ij}=0$ 的元素重定相后仍为零。第 2 款：重定相是 $G\mapsto DGD^{*}$，$D$ 为对角酉矩阵，保持半正定；重定相后的矩阵元素全为实数，所以它是实对称半正定矩阵，可写成 $B^{\mathsf T}B$。

对厄米矩阵，含重复指标的三点乘积（如 $G_{ij}G_{ji}G_{ii}=\lvert G_{ij}\rvert^2G_{ii}$）与含零元的三点乘积自动是实数，所以条件只在非正交图的三角形上有内容，与 [@rem-appe-real-realizability-return-phase] 第 2 款的写法一致。完整证明由 Lean 内核检查。
:::

返回相位的虚部只在 $D\neq0$ 时出现。两两比较读得出 $D$ 是否为零，读不出它的符号：$D^2=1+2xyz-x^2-y^2-z^2$（$x=a\cdot b$，$y=b\cdot c$，$z=c\cdot a$，即 [`triangle_gram`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.triangle_gram)）只给出它的平方。$D$ 是否为零恰好回答一个与 `H7` 相邻的问题：一族对象是否需要复数振幅。

::: {.remark #rem-appe-real-realizability-return-phase title="一族对象何时可以只用实数描述：三点巴格曼乘积是否为实（手工推导与文献结果）"}
**手工推导。** 设 $\psi_1,\dots,\psi_N\in\mathbb{C}^d$ 是单位向量，$G_{ij}=\langle\psi_i,\psi_j\rangle$。把 $G_{ij}\neq0$ 的点对连成图 $\Gamma$，称为**非正交图**。称这族对象**可实化**，若有实数 $\theta_1,\dots,\theta_N$ 使一切 $e^{i\theta_i}G_{ij}e^{-i\theta_j}$ 都是实数。这时该实矩阵是 $e^{-i\theta_i}\psi_i$ 的格拉姆阵，实对称半正定，秩 $r=\operatorname{rank}G\le d$，可写成 $V^{\mathsf T}V$，$V$ 的列是 $\mathbb{R}^r\subseteq\mathbb{C}^d$ 中的实向量 $v_i$；两组向量的格拉姆阵相同，由冻结定理 [`exists_unitary_mul_eq_of_conjTranspose_mul_eq`](lean:D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq)，有 $d\times d$ 酉矩阵 $U$ 使 $e^{-i\theta_i}\psi_i=Uv_i$。所以可实化就是：乘过相位之后，这族向量落在一个实子空间的酉像里，并且格拉姆阵到相位为止不变。对 $\Gamma$ 中的闭走道 $i_0,i_1,\dots,i_k=i_0$，称 $G_{i_0i_1}G_{i_1i_2}\cdots G_{i_{k-1}i_0}$ 为它的**巴格曼乘积**；它在 $\psi_i\mapsto e^{-i\theta_i}\psi_i$ 下不变。

1. 可实化时，每个巴格曼乘积都是实数，特别是每个三点乘积 $G_{ij}G_{jk}G_{ki}$。
2. 反之，若 $\Gamma$ 被三角形填满（[@rem-appe-triangle-simple-connectivity]；例如任意两个对象都不正交，或 $\Gamma$ 是弦图），并且 $\Gamma$ 的每个三角形上三点乘积都是实数，则这族对象可实化。
3. 填满的条件不能去掉：$\mathbb{C}^3$ 中取 $\psi_1=e_1$，$\psi_2=\frac{1}{\sqrt3}(e_1+e_2+e_3)$，$\psi_3=e_2$，$\psi_4=\frac12\bigl(e_1+ie_2-(1+i)e_3\bigr)$。$\psi_1\perp\psi_3$，$\psi_2\perp\psi_4$，其余内积非零，$\Gamma$ 是没有三角形的四圈：第 2 款中“三角形上为实”的要求空真，而“被三角形填满”不成立。四圈的巴格曼乘积 $G_{12}G_{23}G_{34}G_{41}=\frac{1}{\sqrt3}\cdot\frac{1}{\sqrt3}\cdot\frac i2\cdot\frac12=\frac{i}{12}$ 不是实数，由第 1 款这族对象不可实化。
4. 单比特：设 $\psi_a$ 的布洛赫向量为 $a$。可实化当且仅当全部布洛赫向量落在一个过球心的平面上，当且仅当每三个的有向体积 $D=a\cdot(b\times c)$ 都为零；这里不需要填满的条件，例如 $a,b,-a,-b$ 的非正交图是四圈，它们仍可实化。对两两不对径的 $a,b,c$，[@thm-appe-bloch-triangle-return-phase] 的返回相位 $(S-iD)/\sqrt{S^2+D^2}$ 不是实数当且仅当 $D\neq0$。
5. 两两求同读数 $a\cdot b$、$b\cdot c$、$c\cdot a$ 只给出 $D^2$。复共轭 $\psi\mapsto\bar\psi$ 把布洛赫向量 $(r_x,r_y,r_z)$ 变为 $(r_x,-r_y,r_z)$：两两读数不变，$D$ 变号，返回相位取共轭。

推导：第 1 款，巴格曼乘积不变，而在实矩阵 $e^{i\theta_i}G_{ij}e^{-i\theta_j}$ 中算出的它是实数。第 2 款，在 $\Gamma$ 的边上令 $g(i,j)=\left(G_{ij}/\lvert G_{ij}\rvert\right)^2$，它只在 $G_{ij}\neq0$ 的边上定义，取值在单位圆群中。$G_{ji}=\overline{G_{ij}}$ 给出 $g(j,i)=g(i,j)^{-1}$。在三角形 $ijk$ 上，记 $B_{ijk}=G_{ij}G_{jk}G_{ki}\neq0$，则 $g(i,j)\,g(j,k)\,g(i,k)^{-1}=g(i,j)\,g(j,k)\,g(k,i)=\left(B_{ijk}/\lvert B_{ijk}\rvert\right)^2$，它等于 $1$ 当且仅当 $B_{ijk}$ 是实数（正负都可以）。所以三点乘积为实，正是 $g$ 在三角形上的链式律 $g(i,j)\,g(j,k)=g(i,k)$。由 [@rem-appe-triangle-simple-connectivity] 第 1 款（$\Gamma$ 是弦图时即 [@thm-appe-chordal-gain-potential]，群取单位圆群），有单位圆群中的 $\varphi_i$ 使 $g(i,j)=\varphi_i^{-1}\varphi_j$。取 $\theta_i$ 使 $e^{2i\theta_i}=\varphi_i$，则 $\left(e^{i\theta_i}G_{ij}e^{-i\theta_j}/\lvert G_{ij}\rvert\right)^2=\varphi_i\,g(i,j)\,\varphi_j^{-1}=1$，所以 $e^{i\theta_i}G_{ij}e^{-i\theta_j}$ 是实数；不相邻的点对上 $G_{ij}=0$ 本来就是实数。第 3 款是直接计算。第 4 款：对秩一投影 $P_a=\lvert\psi_a\rangle\langle\psi_a\rvert=\frac12(\mathbf{1}+a\cdot\sigma)$ 有 $G_{ab}G_{bc}G_{ca}=\operatorname{Tr}(P_aP_bP_c)$，而冻结定理 [`triple_bargmann_bloch`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch) 给出 $\operatorname{Tr}(P_aP_bP_c)=\frac14(S+iD)$，所以三点乘积为实当且仅当 $D=0$。若布洛赫向量都在一个过球心的平面上，用一个转动把这个平面转到 $xz$ 平面，转动由某个酉矩阵实现（$\mathrm{SU}(2)$ 到 $\mathrm{SO}(3)$ 是满射，`文献结果`）；$xz$ 平面上的单位向量 $(\sin\alpha,0,\cos\alpha)$ 的本征旋量是 $\left(\cos\frac\alpha2,\sin\frac\alpha2\right)$，是实向量，所以这族对象可实化。反之，可实化给出 $\mathbb{R}^r\subseteq\mathbb{C}^2$（$r\le2$）中的实向量 $v_i$ 与酉矩阵 $U$，实向量的布洛赫向量在 $xz$ 平面上，$U$ 把这个平面转成另一个过球心的平面。布洛赫向量共一个过球心的平面，当且仅当它们张成的空间至多二维，当且仅当任取三个的有向体积都为零。最后一句是 [@thm-appe-bloch-triangle-return-phase] 第 1、2 条：两两不对径时 $S^2+D^2>0$。第 5 款的 $D^2$ 公式见上文；复共轭的作用是直接计算（$\bar\sigma_y=-\sigma_y$）。

**文献结果。** 第 1 款的方向（非实的巴格曼乘积说明这族对象不能都写成实向量）是 Fernandes、Wagner、Novo 与 Galvão (2024) 的虚性见证；他们还指出，两两重叠的测量足以为四个态的集合见证虚性，对三个态的集合则不能。这与第 4、5 款不矛盾：三个单位向量的两两重叠模长总能由 $\mathbb{R}^3$ 中的实向量实现（把格拉姆阵的三个非对角元都换成它们的模长，行列式不会变小），而第 4 款用到了单比特的维数，并且这里的可实化要求格拉姆阵到相位为止不变。第 2 款的论证与增益图的平衡判据同型：增益图平衡当且仅当增益可以切换为恒等（Zaslavsky 1989）。
:::

`H7` 在台账里列的“中心复结构”是复合系统层析的输入，这条注记回答的是一个相邻而更窄的问题：一族给定的对象，在保留格拉姆阵到相位为止的意义下，是否需要复数振幅。只要可比三角形填满每个圈，答案可以由三点巴格曼乘积判定，也就是比较值乘积的读数；两两重叠的模长一般不够。在单比特上，两两求同读数通过 $D^2$ 就够了：可实化当且仅当没有三个对象围出非零的有向体积；两两读数看不到的只是 $D$ 的符号，即复共轭交换的那一对手性。这并没有推出复结构。实向量构成的模型满足全部条款（E.8.2.3 的计数），所以“需要复数”仍是输入；改变的是这条输入的形状。第 3 款的四圈与 [@rem-appe-triangle-simple-connectivity] 中的四圈是同一个图：在一般维数中，这个图既让三角相容不足以推出势表示，也让三点读数不足以判定可实化；单比特上的 $a,b,-a,-b$ 说明，在维数受限时同一个图并不妨碍判定。
