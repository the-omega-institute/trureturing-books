# M.2.3 增长尺度下的循环支撑跃迁

前一节的[近碰撞分析](ch34-s28-s03-s02-weighted-near-collisions.md)确定了固定格点半径下的循环最优解，其前部窗口位于零角附近，对径窗口位于对径点附近。半径增长时需要一致控制有限矩方程，尤其在新的对径层激活的阈值处。

## 前部窗口增长时的矩阵误差

让前部半宽 $N$ 随模数增长，取预算 $m=N(N+1)/5$。令 $h=2\pi/q$、$u=Nh$，并在前部用 $x=j/N$ 表示位置。取两个特征 $(1+\cos(xu))/2$ 与 $\sin^2(xu)/u^2$，其零网格极限为 $1$ 与 $x^2$。记 $G_N(u)$ 为在 $|j|\le N$ 上求特征对乘积之和再除以 $N$ 得到的二阶矩阵。对任意实数 $u$，每个矩阵元的误差满足

$$
\left|G_N(u)_{ab}-G_N(0)_{ab}\right|\le 2u^2 .
$$

正弦的三次余项给出第二个特征的一致误差。窗口内两个特征的绝对值至多为一，因此对乘积求和再除以 $N$ 后，每个矩阵元的误差仍为 $u^2$ 阶。当 $N\to\infty$ 且 $u\to0$ 时，极限矩阵的两行为 $(2,2/3)$ 与 $(2/3,2/5)$。若 $q/N^{5/2}\to\gamma>0$，与同一 $N$ 的零网格矩阵相比，误差为 $O(N^{-3})$。

令 $t=N(N+1)-1/2$、$Z=\sum_{|j|\le N}(t-j^2)$，取 $a=(Nt/Z,-N^3/Z)$。零网格矩阵将 $a$ 恰好映到 $(1,m/N^2)$。在网格 $u$ 上，矩残差满足

$$
\left|\left[G_N(u)a-(1,m/N^2)\right]_i\right|
\le 2u^2(|a_0|+|a_1|)\quad(i=0,1)。
$$

缩放后的格点权重 $N(t-j^2)/Z$ 在 $j=N$ 与 $j=N+1$ 的符号余量为 $N^{-1}$ 量级。要确定整个循环群的支撑，还须控制对径矩方程和对径激活阈值上的边界符号。 [Gram 矩阵误差的 Lean 证明](lean:D5/S3/Fourier/Asymptotics/CyclicGrowingFrontFit.frontGram_sub_le) · [残差界的 Lean 证明](lean:D5/S3/Fourier/Asymptotics/CyclicGrowingFrontFit.frontGram_reference_residual_le) · [对径支撑问题](https://github.com/the-omega-institute/trureturing/issues/34029)

## 前部窗口与对径窗口的联立拟合

固定一个非空有限集合 $S$，其中各元素是相对于对径点的有符号实偏移。令 $c$ 为取样余弦，取 $F=(1+c)/2$、$W=(1-c)/2$、$X=(1-c^2)/(Nh)^2$。零网格处取两个窗口中的连续延拓。在前部格点及 $S$ 上令拟合权重为 $v=AF/N+CX/N+BW/N^3$。三个矩方程的左边分别为 $\sum Fv$、$\sum Xv$ 与 $N^3\sum W^2v$。利用 $W^2=W-u^2X/4$，公共余弦下限 $1-2mh^2$ 使三行的目标值为 $(1-mh^2,m/N^2,3N^3mh^2/4)$。

设 $M_N$ 为按系数顺序 $(A,C,B)$ 排列的三阶矩阵。若 $N^3(Nh)^4\to0$，则

$$
M_N\longrightarrow
\begin{pmatrix}
2 & 2/3 & 0\\
2/3 & 2/5 & 0\\
0 & \sum_{r\in S}r^2 & |S|
\end{pmatrix}。
$$

前部对末行的贡献有常数倍 $N^3u^4$ 与 $Nu^6$ 的界。在固定的对径偏移 $r$ 处，$W\to1$、$N^2X\to r^2$ 且 $N^2F\le r^2u^2/4$。这些一致估计给出上述矩阵极限，无需将逐点估计和增长的求和直接交换。极限行列式为 $16|S|/45$，故充分大的 $N$ 上，任意给定的三个矩目标均有唯一的拟合系数。

当 $q/N^{5/2}\to\gamma>0$ 时，目标向量趋于 $(1,1/5,3\pi^2/(5\gamma^2))$。解的极限为 $A\to3/4$、$C\to-3/4$ 以及

$$
B\longrightarrow \frac{3\pi^2/(5\gamma^2)+(3/4)\sum_{r\in S}r^2}{|S|}。
$$

故在每个固定且纳入拟合的对径格点，$N^3v(r)\to B_\infty-3r^2/4$。该计算允许拟合权重有符号。验证最优权重的支撑仍须控制前部两侧以及对径激活层上的符号，并处理极限权重恰为零的层。 [矩阵收敛的 Lean 证明](lean:D5/S3/Fourier/Asymptotics/CyclicGrowingCoupledFit.coupledMatrix_tendsto) · [唯一带符号拟合的 Lean 证明](lean:D5/S3/Fourier/Asymptotics/CyclicGrowingCoupledFit.coupledFit_eventually) · [联立拟合研究](https://github.com/the-omega-institute/trureturing/issues/34029)

## 增长窗口边界的定量符号

临界尺度下的拟合可以和格点参考系数作更精细的比较。记 $K=\lim_{N\to\infty}N^5h^2=4\pi^2/\gamma^2$，令 $(A_N,C_N,B_N)$ 为上述逆矩阵拟合。对于 $t=N(N+1)-1/2$ 与 $Z=\sum_{|j|\le N}(t-j^2)$，
$$
A_N-\frac{Nt}{Z}=O(N^{-3}),
\qquad
C_N+\frac{N^3}{Z}=O(N^{-3}).
$$

此估计仅要求 $N^5h^2$ 有界。联立矩阵的前两行与补上零第三列的格点 Gram 矩阵之差，乘以 $N^3$ 后保持有界。前部特征乘积误差以 $2u^2$ 为界，且 $N^3u^2=O(1)$。有限个对径偏移在缩放前两行中的贡献逐项趋于零，目标质量的缩放扰动满足 $N^3mh^2=O(1)$。目标向量与联立矩阵的逆有界，故拟合系数有界。固定第三个系数 $B_N$ 时，左上二阶矩阵的逆将缩放残差界传递为前部系数的误差界。

记 $p_N(j)$ 为前部的带符号拟合值，并以同一三角函数公式延拓到实数 $j$。任意固定实数 $d$，格点参考值在 $j=N+d$ 处乘以 $N^2$ 后趋于 $\frac34(1-2d)$。特征与系数误差的控制保持了这个极限，
$$
N^2p_N(N+d)\longrightarrow \frac34(1-2d).
$$
因此充分大的 $N$ 下，$N$ 处的带符号拟合值严格为正，而 $N+1$ 处严格为负。由偶对称性，前部窗口负端也有相应的符号。半步 $d=1/2$ 处首项极限为零，精细比较给出 $N^3p_N(N+1/2)\to-9/16$。

每个固定实数对径偏移 $r$ 处，同一拟合系数的对径带符号值满足
$$
N^3p_N^{\mathrm{rear}}(r)\longrightarrow B_\infty-\tfrac34r^2.
$$
极限非零时可确定充分大 $N$ 下的严格符号。这些极限适用于固定的非空有限对径集合 $S$ 上的带符号拟合。认证循环群最优解仍需建立有限循环格点的对应并将补集的符号控制延伸至所有剩余格点。当 $B_\infty=3r^2/4$ 时，该层的激活状态仍待判定。 [系数误差阶的 Lean 证明](lean:D5/S3/Fourier/Asymptotics/CyclicGrowingEdgeLimits.refined_coefficients) · [前部与半步极限](lean:D5/S3/Fourier/Asymptotics/CyclicGrowingEdgeLimits.scaled_boundary_value) · [对径极限](lean:D5/S3/Fourier/Asymptotics/CyclicGrowingEdgeLimits.scaled_rear_value) · [研究问题](https://github.com/the-omega-institute/trureturing/issues/34029)

## 对径阈值之外的精确支撑

固定周期最终的奇偶性 $e\in\{0,1\}$，假设 $N^5h^2\to K>0$，记 $Q=3K/20$。指标为 $l\ge0$ 的对径窗口 $S_l$ 包含相对于对径角从 $-l-e/2$ 到 $l+e/2$ 的单位步长偏移。定义

$$
T_0(l)=\frac{l(2l-1)(2l+1)}4,\qquad
T_1(l)=l(l+1/2)(l+1).
$$

若 $Q$ 不等于任何 $T_e(l)$，则恰有一个 $l$ 满足 $T_e(l)<Q<T_e(l+1)$。充分大的 $N$ 上，循环群上的唯一最优解 $v$ 由前部格点 $|j|\le N$ 与对径窗口 $S_l$ 上的联立拟合给出，其余格点权重均为零。这两个窗口内的权重严格为正，且两个余弦矩均达到 $1-2mh^2$。对任意可行的概率权重 $w$，

$$
\sum_j w_j^2\ge\sum_j v_j^2+\sum_j(w_j-v_j)^2.
$$

记 $R=l+e/2$，对径极限截距为 $B=(Q+(3/4)\sum_{r\in S_l}r^2)/|S_l|$。有限求和给出

$$
\begin{aligned}
\tfrac34\left(|S_l|R^2-\sum_{r\in S_l}r^2\right)&=T_e(l),\\
\tfrac34\left(|S_l|(R+1)^2-\sum_{r\in S_l}r^2\right)&=T_e(l+1).
\end{aligned}
$$

因而严格阈值条件等价于 $3R^2/4<B<3(R+1)^2/4$。边界极限保证两个窗口最后纳入的格点上拟合权重为正，紧邻的第一个未纳入格点带符号值为负。拟合多项式关于采样余弦为凸函数，四个边界符号由此控制整个循环格点。精确格点对应将拟合矩方程转移至循环群，有限最优性证书给出上述平方距离不等式。

若 $q/N^{5/2}\to\gamma>0$，则 $Q=3\pi^2/(5\gamma^2)$。偶周期第一对新增对径格点在 $\gamma<2\pi/\sqrt5$ 时激活，奇周期相应条件为 $\gamma<\pi/\sqrt5$。同一公式分类全部后续跃迁中严格偏离阈值的情形。在等号处，对应对径层的极限带符号值为零，激活状态仍需判定。 [Lean 内核核验的证明](https://github.com/the-omega-institute/trureturing/pull/34065) · [研究与证明](https://github.com/the-omega-institute/trureturing/issues/34029)

## 阈值等号处的一阶激活

记 $Q_N=3N^5h^2/20$，假设 $Q_N\to Q>0$ 且 $N(Q_N-Q)\to L$。对于固定非空有限对径集合 $S$ 与实偏移 $r$，定义

$$
D=|S|r^2-\sum_{s\in S}s^2.
$$

对径带符号值的下一阶展开为

$$
N\left(|S|N^3p_N^{\mathrm{rear}}(r)-Q+\tfrac34D\right)
\longrightarrow L+Q+\tfrac98 D.
$$

精确格点归一化常数为 $Z=\frac43N^3+2N^2-N/3-1/2$。结合前部拟合系数的三次误差界，得到 $N(C_N+3/4)\to9/8$。联立拟合末行与 $(0,\sum_{s\in S}s^2,|S|)$ 的差为 $o(1/N)$。增长前部的贡献为 $O(N^{-3})$，有限个固定对径特征的误差受 $N^2h^2$ 或 $h^2$ 的常数倍控制。同样的估计给出 $N^3p_N^{\mathrm{rear}}(r)=C_Nr^2+B_N+o(1/N)$。利用末行精确目标 $Q_N(1+1/N)$ 消去 $B_N$，即得上述极限。

现设 $Q=T_e(l+1)$ 且周期的最终奇偶性为 $e$。$S_l$ 的第一个未纳入对径半径是 $S_{l+1}$ 的最后一个纳入半径。对于这两个窗口，该半径均满足 $3D/4=Q$。其一阶符号因此由 $L+5Q/2$ 决定。若该量为正，最优解最终选取较大的对径窗口 $S_{l+1}$，若为负则选取 $S_l$。两种情况下前部支撑均为 $|j|\le N$，并满足两个精确矩等式与上述平方距离能量界。当 $L+5Q/2=0$ 时，更细的符号仍待判定。 [Lean 一阶对径展开证明](lean:D5/S3/Fourier/Asymptotics/CyclicGrowingRearFirstOrder.scaled_rear_first_order) [Lean 阈值处最终支撑定理](lean:D5/S3/Fourier/Asymptotics/CyclicGrowingRearFirstOrder.eventual_support_at_threshold)

若在临界比例上 $q/N^{5/2}\to\gamma>0$，且 $N(q/(\gamma N^{5/2})-1)\to\eta$，则 $Q=3\pi^2/(5\gamma^2)$ 且 $L=-2Q\eta$。因此激活由 $\eta$ 小于或大于 $5/4$ 决定。特别地，将 $\gamma N^{5/2}$ 按固定奇偶性作有界误差舍入得到 $\eta=0$，故进入较大的窗口。$\eta=5/4$ 的情形需要进一步展开。

## 一阶余量消失时的二阶激活

进一步假设 $N(N(Q_N-Q)-L)\to H$。对固定非空有限对径集合 $S$ 和任意实偏移 $r$，记 $D=|S|r^2-\sum_{s\in S}s^2$，则二阶极限为

$$
\begin{aligned}
N\Big[N\big(|S|N^3p_N^{\mathrm{rear}}(r)-Q+\tfrac34D\big)
 -(L+Q+\tfrac98D)\Big]
\longrightarrow H+L-\tfrac{15}{8}D .
\end{aligned}
$$

精确归一化常数给出 $N(N(C_N+3/4)-9/8)\to-15/8$。前部系数的三次误差界足以保证这一极限。联立拟合末行与对径读出误差乘以 $N^2$ 后仍趋于零。再次利用精确的第三个矩方程消去对径截距，即得上述修正项。

在正阈值 $Q=T_e(l+1)$ 上若 $L=-5Q/2$，两个相邻窗口共同的争议半径满足 $3D/4=Q$，二阶修正项化为 $H-5Q$。该量为正时选取 $S_{l+1}$，为负时选取 $S_l$。两种情形的前部窗口均为 $|j|\le N$，两个余弦矩均取到下界，唯一最优解仍满足上述平方距离能量不等式。

以周期表示，设 $N(N(q/(\gamma N^{5/2})-1)-5/4)\to\xi$。对倒数平方展开得到 $H=Q(75/16-2\xi)$，故跃迁位置为 $\xi=-5/32$。当 $H=5Q$（在上述周期假设下即 $\xi=-5/32$）时，更高阶渐近符号判据仍待解决。下节给出精确的有限判别。 [Lean 二阶展开证明](lean:D5/S3/Fourier/Asymptotics/CyclicGrowingRearSecondOrder.scaled_rear_second_order) [Lean 二阶支撑证明](lean:D5/S3/Fourier/Asymptotics/CyclicGrowingRearSecondOrder.eventual_support_at_second_order_threshold)

## 首项阈值等号处的精确有限支撑

在任意正阈值 $Q=T_e(l+1)$ 上，相邻对径窗口 $S=S_l$ 和 $T=S_{l+1}$ 具有共同的争议边界半径 $R=l+1+e/2$。这两个窗口的带符号拟合值满足精确恒等式

$$
\det(M_S)p_S(R)=\det(M_T)p_T(R).
$$

较大窗口新增 $\pm R$ 两点，其取样特征一致。若对应的矩列与系数行为 $u$ 和 $r$，则 $M_T=M_S+2ur^{\mathsf T}$。两个拟合系数向量满足右端相同的矩方程。将方程相减并应用矩阵行列式引理即可得到上述恒等式。两个行列式分别趋于 $16|S|/45$ 与 $16|T|/45$，故充分大的 $N$ 上均为正。

对每个充分大的 $N$，考察较小窗口在争议半径上的带符号拟合值。若 $p_S(R)>0$，选取 $T$ 可使其纳入边界的权重为正。若 $p_S(R)\le0$，选取 $S$ 可使其未纳入边界的带符号值非正，包括精确等于零的情形。其余对径边界和前部边界的严格符号由首项极限保证。选取的拟合给出两个窗口上的精确正权重支撑，满足两个矩等式与平方距离能量不等式。该分类只要求首项收敛 $Q_N\to T_e(l+1)$ 与最终奇偶性，允许所选窗口随 $N$ 变化。

前述漂移定理依次给出渐近符号的充分条件。即使二阶余量消失，有限比较仍可确定精确支撑。有限跃迁位置更高阶的显式渐近估计是另一个待推进的问题。 [Lean 精确值恒等式证明](lean:D5/S3/Fourier/Asymptotics/CyclicGrowingThresholdExact.adjacent_fit_score) [Lean 精确阈值支撑证明](lean:D5/S3/Fourier/Asymptotics/CyclicGrowingThresholdExact.eventual_support_at_leading_threshold)
