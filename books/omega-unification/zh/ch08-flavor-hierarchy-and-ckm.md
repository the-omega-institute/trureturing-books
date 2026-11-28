# 第八章 轮换破缺、汤川层级障碍与夸克混合重构 {#sec-ch08}

> “保护三代整齐列队的对称，必先死去，质量与混合才得以诞生；但草率地砸碎它，只会撞上一堵又一堵精密的禁行高墙。”

如果[第七章](ch07-chiral-three-generations.md)是十九点贝伦德球壳的胜利序曲——坐标三循环把五种超荷的三个轻模锁进等重排列——那么本章直面的就是第三问前半程的残酷逆转：**各代粒子的质量层级与夸克混合究竟从何而来？**

自然界的费米子味谱绝不温和：顶夸克与底夸克在 $1\,\mathrm{TeV}$ 处的质量比逾四十，粲夸克与顶夸克之比压低至 $0.00361$，上型夸克与带电轻子的总范数比超过 $84.98$，而夸克混合矩阵 $V_{\mathrm{CKM}}$ 既远离单位阵又携带着不可消去的 CP 破坏相角。把这些冰冷的实验事实直接塞回十九点球壳，一场系统性的淘汰赛随即展开：精确的三重轮换强制 CKM 退化为置换阵；单希格斯局域顶角、任意站点密度势、七轨道非负权与单腿输运顶角逐一被区间证书击穿；三腿八系数输运虽能在单枚零点上拟合全部九个带电费米子质量与完整 CKM，却在重块耦合、真空四次迹和跨三零点检验上暴露出毁灭性的反噬。

在废墟之上，正向构造同样清晰浮现：电弱单态六面相位、二十八圈镜像三角、两边界站点五次脉冲与跨七零点精确到 $10^{-11}$ 的有限有理响应 $(I + T^{16})^{-1}$。同时，Lean 内核冻结的有理凯莱正交性与复格拉姆幺正扩张定理，则给折叠维数、四步有理牛顿逼近与跨零点固定矩阵刚性立下了不可撼动的代数界碑。

## 8.1 精确三重轮换障碍与定量破缺下界 {#sec-ch08-cyclic-obstruction}

在讨论任何具体汤川机制之前，先给十九点球壳的三重轮换写一张精确的几何体检单。

::: {.definition #def-ou-ch08-cyclic-rotation title="十九点球壳坐标轮换、六条三点轨道与希尔伯特—施密特对易子度量"}
定义十九点贝伦德球壳上的空间坐标循环置换 $P : (x, y, z) \mapsto (y, z, x)$。它在球壳上唯一固定极点 $(17, 17, 17)$，并将余下十八个站点精确划分为**六条互不相交的三点轨道**。在三维左手夸克代空间中，记带相位的三阶轮换生成元为

$$
T e_i = z_i e_{i + 1 \bmod 3}, \qquad |z_i| = 1 \quad (i = 0, 1, 2),
$$

于是 $T^3 = (z_0 z_1 z_2) I$，其三个本征值为同一单位数的三个互异立方根。对任意 $3 \times 3$ 复矩阵 $X$，定义轮换平均投影（掐对角算子）

$$
\mathcal{E}(X) := \frac{1}{3}\bigl(X + T X T^* + T^2 X T^{*2}\bigr).
$$

在 $T$ 的本征基中，$\mathcal{E}(X)$ 精确提取 $X$ 的对角元；由于三个互异单位立方根两两之间的弦长恒等于 $\sqrt{3}$，希尔伯特—施密特对易子范数满足精确恒等式

$$
\|[T, X]\|_{\mathrm{HS}} = \sqrt{3}\,\|X - \mathcal{E}(X)\|_{\mathrm{HS}}.
$$

:::

由此立刻落下第一道铁律（[三代轮换与混合推导](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-三代轮换与质子选择定则.md)）：

1. **未破缺轮换锁死置换型 CKM**：若一支希格斯双重态在轮换下只乘单一相位，且上下型汤川顶角均保持 $T$ 对称，则作用于共同左手代空间的厄米质量平方阵 $H_u = Y_u Y_u^*$ 与 $H_d = Y_d Y_d^*$ 均与 $T$ 对易（右手味旋转与希格斯相位在乘积中精确抵消）。两矩阵遂在 $T$ 的三条本征线上同时对角化。只要质量非简并，**不论三条边相位 $z_i$ 取何值，CKM 矩阵都只能是置换与相位的乘积**，绝无真实代际混合。
2. **连通混合图的共同相位定理**：更一般地，只要上下夸克质量均非简并，任何同时保持 $H_u, H_d$ 的左手幺正变换在各自质量基中必为对角相位阵，记作 $d_i, e_j$，于是 $d_i V_{ij} = V_{ij} e_j$。一旦由非零 $V_{ij}$ 构成的二部图连通，所有相位必须完全相等——**在已混合的轻夸克上，任何精确左手对称都只能退化为世代共同的整体相位**。特别地，一个连续 $SU(2)$ 时钟若同时保持两套固定汤川，因 $SU(2)$ 的连续一维特征标全为平凡，它对轻夸克只能作平凡作用。

把两个四维算子压缩到同一个三维超平面时，它们在压缩前彼此对易，会给出一条更强的限制。设这个超平面为 $W=n^\perp$。在两个厄米算子的共同本征基中，逐个调整基向量的相位即可让 $n$ 的分量全为实数。两算子在这个基下都是实对角阵，$W$ 也有实正交基。压缩后，上下型质量本征基因而都可取实。质量非简并时，有向混合量 $J=\operatorname{Im}(V_{11}V_{22}\overline{V_{12}V_{21}})$ 必为零。这个论证同样适用于复超平面。

允许增加站点后，两个可交换母算子能产生多大的混合？给定任意两个正定三代质量矩阵 $A,B$，只须五个站点，就能把站点上的两个正对角矩阵压缩到同一三维轻空间，分别得到 $A,B$。先从每个目标扣去一个小的正标量，记余项为 $A',B'$，设 $S=A'+B'$、$L=\|S\|_{\mathrm{op}}$。在 $S^{-1/2}$ 缩放的坐标里，两项之和为单位阵，因而可以在同一组基底中对角化。将这三个方向变回原坐标，除以 $\sqrt L$，三个站点对范数的贡献就是 $S/L$。它已有一个特征值等于一，补足范数所需的 $I-S/L$ 至多秩二，另外两个站点便够用。把扣去的标量加回每个站点即可。结合四站的超平面障碍，五是实现任何给定非零 $J$ 目标的最少站数。若 $A+B\le I$，两组母值都可选在 $(0,1)$ 内。

**第二个轻重耦合方向（手工推导）。** 即使站点数够用，压缩所得的 CP 混合也受轻空间通往重空间的耦合限制。令 $P$ 为轻空间 $W$ 上的正交投影，$Q=I-P$，并记对易母算子 $\widehat A,\widehat B$ 的轻重块为 $X=Q\widehat A|_W$、$Y=Q\widehat B|_W$。将两块横向拼接为 $L=(X\ \ Y)$，以 $\sigma_2(L)$ 记其第二奇异值，秩不足二时取零。由母算子对易可得 $C=[A,B]=Y^*X-X^*Y$，且

$$
\sigma_{\min}(C)\le \sigma_2(L)^2.
$$

无重空间时 $C=0$。否则取 $L$ 的第一左奇异方向，把两个块的输出各自拆成该方向与其正交余项。第一方向对 $C$ 的贡献至多秩二，在三维轻空间中必有零向量。记余项块为 $X_\perp,Y_\perp$。在任一单位向量 $v$ 上，余项对 $-iC$ 的期望值是 $\|(X_\perp+iY_\perp)v\|^2/2$ 与 $\|(X_\perp-iY_\perp)v\|^2/2$ 之差。两项都在 $[0,\sigma_2(L)^2]$ 内，所以余项的算子范数至多为 $\sigma_2(L)^2$。沿第一方向贡献的单位零向量应用此界，便得到上式。

对于两套非简并质量平方谱，记各自三个正谱隙的乘积为 $\Delta_A,\Delta_B$。由 $|\det C|=2\Delta_A\Delta_B|J|$，可得 $2\Delta_A\Delta_B|J|\le \sigma_1(C)\sigma_2(C)\sigma_2(L)^2$。因此可用的重空间即便超过一维，若两种耦合仍只通往同一条重方向，$J$ 也必为零。五站算例可在谱隙保持分离时使 $|J|$ 与 $\sigma_2(L)^2$ 同阶。[Jarlskog 的对易子不变量](https://doi.org/10.1103/PhysRevLett.55.1039) · [可复算的五站算例](https://github.com/the-omega-institute/trureturing-books/issues/1823#issuecomment-7238122058)

对站点规定旋转，还要说明轻空间是否随旋转保持不变。设旋转仅循环三个站点、固定其余站点，并要求两组母矩阵在站点基底中对角且在循环上取常值。五站只有两个固定站，其投影的公共正交补给两组质量矩阵留下一条共同本征线。六站可把上述三个对角化方向放在三个固定站，用三循环容纳补足范数的两行。若还要求轻空间在旋转下不变，非零 $J$ 迫使旋转在轻空间上是标量；两个非平凡特征空间都只有一维，故三代只能落在平凡特征空间。它含每个固定站和循环上的一条均匀线，共有 $N-2$ 维。要有五个有效坐标，物理站点便至少需要七个，且七站恰能实现。三个最少站数分别依赖这些几何条件。构造中的轻空间和母值都随给定质量矩阵选择。 [同一轻空间的构造与站数下界](https://github.com/the-omega-institute/trureturing-experiments/blob/ba92cd4b7b42fa78490a36e7a64d1411c9cf555c/experiments/ch39-omega-research/replay/ch39-commuting-flavor-sites.md)

若两个四维算子只须各自与同一轮换对易，质量谱还能留下多少相位自由？取一个固定点和一个三点轨道，在特征标基中写 $P=\operatorname{diag}(1,\omega,\bar\omega,1)$，其中 $\omega=e^{2\pi i/3}$。取 $n=(e_4+e_2+e_3)/\sqrt3$，令 $B$ 交换 $e_1,e_4$、固定 $e_2$、把 $e_3$ 变为 $-e_3$。上型算子取 $A_u=2I+B$。下型算子取 $A_d=D_t A_u D_t^*$，其中 $D_t=\operatorname{diag}(e^{it},1,1,1)$。两算子均正定且与 $P$ 对易。$D_t$ 固定 $n$，所以两者压缩到同一个 $W$ 后仍有相同的谱。具体地，$B$ 交换正交单位向量 $n,Bn$，在它们的正交补上各余一条本征值为 $-1,+1$ 的线。因此 $B$ 压缩到 $W$ 后的中间本征线由 $Bn$ 张成，两套质量平方均为 $(1,2,3)$。

基向量 $e_1$ 在中间本征线上的权重为 $|\langle e_1,Bn\rangle|^2=1/3$。由 $\langle e_1,Be_1\rangle=0$，其余两条线的权重也各为 $1/3$。在按质量递增排列的上型基中，可选相位使 $e_1$ 的三个坐标相等。相应下型基由 $D_t$ 作用得到，故 $V_{ij}=\delta_{ij}+(e^{it}-1)/3$。在 $t=0$ 处，$V=I$。在 $t=\pm2\pi/3$ 处，九个模平方均为 $1/3$，而 $J=\pm\sqrt3/18$。这组四站点算例固定了质量谱、轮换和压缩空间，调节的是两算子的相对相位。轮换会把 $W$ 送到另一个超平面。真实壳层须给出选择轻空间与相对相位的物理规律。

这两套质量基若测量同一个态，哪些上型概率 $p$ 与下型概率 $q$ 能够同时出现？先固定四站算例的任意相位 $t$。将密度矩阵分解为 $\rho=XX^*$，记 $X$ 的三行为 $x_j$，则 $p_j=\|x_j\|^2$。在下型基中，$V^*X$ 把每一行都平移同一个向量 $h=(e^{-it}-1)\sum_j x_j/3$，故 $q_j=\|x_j+h\|^2$。以下手工推导只须搜索平移长度 $r=\|h\|$。

若 $e^{it}=1$，恰好 $p=q$ 可达，振幅 $\sqrt{p_j}$ 就给出纯态。其余相位下，$r=0$ 时三行之和为零。此时恰好要求 $p=q$ 且三条长度 $\sqrt{p_j}$ 能闭合成三角形，允许退化。取其有向边为复振幅就得到纯态。对 $r>0$，令 $u=h/r$。在实内积 $\operatorname{Re}\langle\cdot,\cdot\rangle$ 下，写 $x_j=d_j u+v_j$，其中 $v_j$ 与 $u$ 正交。记横向向量之和的长度为 $K$。将两次范数读数相减，再对三行求和，得到
$$
d_j=\frac{q_j-p_j-r^2}{2r},\qquad
\ell_j=\sqrt{p_j-d_j^2},\qquad
K=\frac{3r}{2}\left|\cot\frac{t}{2}\right|.
$$
只取三个根号都有意义的 $r$。由归一化得 $\sum_j d_j=-3r/2$。另一方面，$\sum_j x_j=3ru/(e^{-it}-1)$，故横向向量 $v_j$ 的长度为 $\ell_j$，其和必须等于 $(3r/2)\cot(t/2)\,iu$，长度为 $K$。

于是，正长度 $r$ 可行当且仅当 $\ell_0,\ell_1,\ell_2,K$ 中的最大值至多占总长的一半。必要性来自三角不等式。反过来，满足此条件的四条非负边长能在平面内闭合。在 $\mathbb C^2$ 中选一个实平面，使它与 $u$ 实正交且包含 $iu$，再旋转闭合图形，使前三边之和等于指定向量。取这三边为 $v_j$，加回 $d_j u$ 就重建了一个秩至多二的共同态。若用纯态，横向只剩实直线 $\mathbb R\,iu$，故还须且只须某组符号满足 $|\sum_j\varepsilon_j\ell_j|=K$，其中 $\varepsilon_j\in\{-1,1\}$。对一对可达读数，若所有可行的 $r$ 都排除纯态，则最小秩为二。[非负边长的平面闭合定理](lean:D5/S3/Geometry/Polygons/BalancedPlanarClosure.result)

如何找齐正的纯态半径？令 $\lambda=r^2$，将四条边长的平方都乘以 $4\lambda$，得到 $D_j=4\lambda p_j-(q_j-p_j-\lambda)^2$（$0\le j<3$）和 $D_3=9\lambda^2\cot^2(t/2)$。记 $A=D_0+D_1-D_2-D_3$、$B=D_0D_1$、$C=D_2D_3$，则只须检验六次方程
$$
\frac{(A^2-4B-4C)^2-64BC}{\lambda^2}=0 .
$$
分子是八个带符号和 $\sqrt{D_0}\pm\sqrt{D_1}\pm\sqrt{D_2}\pm\sqrt{D_3}$ 的乘积。由 $\sum_j(q_j-p_j)=0$ 得 $A(0)^2=4B(0)$，而 $C$ 含因子 $\lambda^2$，故分母可以约去。每个使全部 $D_j\ge0$ 的正根都给出纯态半径 $r=\sqrt{\lambda}$。

若纯态判据无解，混合态只须检验一个半径 $U=\min_j(\sqrt{p_j}+\sqrt{q_j})$。事实上，每个根号都要求 $|\sqrt{p_j}-\sqrt{q_j}|\le r\le\sqrt{p_j}+\sqrt{q_j}$。若有正的可行半径，取其中最大者，正端点处的条件闭合。若它小于 $U$，稍增 $r$ 仍在根号的共同定义域内，因此四边中必有一边等于另三边之和，否则严格不等式会保持。这种共线闭合已经给出纯态。因此，排除纯态后，恰在 $U>0$ 且 $U$ 通过上述四边检验时最小秩为二，其余读数不可达。[六次式、端点判据与精确算例](https://github.com/the-omega-institute/trureturing-books/issues/1649#issuecomment-7235260192)

哪些相位能迫使制备混合？在 $t\equiv\pi\pmod{2\pi}$ 处，$K=0$。在正端点 $U$ 又有一条 $\ell_j=0$。若四边能闭合，余下两边必等长，仍可沿直线闭合。故此相位的每对可达读数都能由纯态实现。每个满足 $\sin t\ne0$ 的相位都能强制秩二。取 $\rho=\operatorname{diag}(1/2,1/2,0)$，记 $b=(e^{it}-1)/3$，则 $q_2=|b|^2$，$q_0=q_1=(1-|b|^2)/2$。正性使第三行列为零，唯一待定元是 $z=\rho_{01}$ 及其共轭。保持 $q_2$ 强制 $\operatorname{Re}z=0$，保持 $q_0$ 又要求 $\operatorname{Re}((b+|b|^2)z)=0$。由 $\operatorname{Im} b=\sin(t)/3\ne0$ 即得 $z=0$。例如 $t=\pi/2$ 给出 $q=(7,7,4)/18$，这两组读数唯一确定上述混合态。

若转动下型质量基时保持制备不变，能把分开取得的读数拼在一起吗？在上述四站算例中固定上型基，令 $\mathbf1=(1,1,1)^T$。给定该基中的概率 $p$，再在两个已知的相位读出 $q(t_1),q(t_2)$，其中 $0,t_1,t_2$ 模 $2\pi$ 两两不同。以下是这个有限模型的手工推导。设 $\lambda=\mathbf1^*\rho\mathbf1/3$ 为态在方向 $\mathbf1/\sqrt3$ 上的概率，$z=\rho\mathbf1-\lambda\mathbf1$。展开 $V(t)^*\rho V(t)$ 的对角线，利用 $|e^{it}-1|^2=2(1-\cos t)$，得到

$$
q_j(t)-p_j=\frac{2}{3}\operatorname{Re}\bigl((e^{it}-1)z_j\bigr).
$$

从单位圆上的点 $1$ 指向 $e^{it_1},e^{it_2}$ 的两条弦不共线，所以每个通道的两次读数唯一确定 $\operatorname{Re}z_j,\operatorname{Im}z_j$。三组概率各自归一，故 $\sum_j z_j=0$。这样便能预言其余相位的读数。要判定这些读数是否来自同一制备，还须检验正性。

若 $\lambda=0$，正性要求 $\rho\mathbf1=0$。若且唯若 $z=0$ 且三个 $\sqrt{p_j}$ 能围成三角形，此支可行，允许退化。必要性可由 $\rho=XX^*$ 的三行向量之和为零看出，反过来三条有向边就是纯态振幅。对 $0<\lambda\le1$，置 $w=z+\lambda\mathbf1$ 及 $d_j=3\lambda p_j-|w_j|^2$。此 $\lambda$ 的可行条件是三个 $d_j$ 都非负，且三个 $\sqrt{d_j}$ 能围成三角形。事实上，任何见证都使 $R=3\lambda\rho-ww^*$ 半正定，这是对 $\rho^{1/2}\mathbf1$ 应用柯西–施瓦茨不等式的结果。又有 $R\mathbf1=0$，故其格拉姆向量长度为 $\sqrt{d_j}$ 且和为零。反过来，取闭合的复平面边向量 $v_j$，则 $\rho=(ww^*+vv^*)/(3\lambda)$ 给出所需的对角线和行和。

因此，只须在 $0<\lambda\le1$ 上检验三个 $d_j\ge0$ 和三角不等式的多项式形式 $(d_2-d_0-d_1)^2\le4d_0d_1$。每组可行读数都有秩至多二的见证。在正 $\lambda$ 支，纯态存在的充要条件是某个可行 $\lambda$ 使所有 $d_j=0$，因为秩一时柯西–施瓦茨取等。[平面边长的冻结闭合定理](lean:D5/S3/Geometry/Polygons/BalancedPlanarClosure.result)

以两个 Fourier 相位 $t=\pm2\pi/3$ 为例。取 $p=(1,1,1)/3$，要求两处都读出 $q=(1+2v,1-v,1-v)/3$，其中 $0\le v\le1$。上式给出实向量 $z=(-2v,v,v)/3$。按 $0,1,2$ 编号，两行和之差给出 $v=\operatorname{Re}(\rho_{12}-\rho_{02})\le2/3$，因为二阶主子式要求 $|\rho_{ij}|\le1/3$。端点 $v=0,2/3$ 分别由 $\mathbf1/\sqrt3$ 与 $(-1,1,1)^T/\sqrt3$ 取得，混合二者便得到整个区间。区间内点的最小秩为二。纯态若给出 $v>0$，其非零行和向量 $\rho\mathbf1$ 为实，故可取实振幅 $\pm1/\sqrt3$，上面的差只能取 $0,\pm2/3$。

即使三对基各自都容许所给概率，三组读数也可能无法共用一个态。例如取 $v=17/25$，两处的 $q$ 都是 $(59,8,8)/75$。在任一 Fourier 相位，取该下型基中对角线为 $q$ 的对角态，便有均匀的上型读数。两套下型基也能一起给出这组 $q$。它们的第零个基向量内积的模为 $1/\sqrt3$。调相使内积为正后，沿两向量之和制备纯态，在两套基中第零个概率均为 $(1+1/\sqrt3)/2$，其余两个因交换对称而相等。这对应 $v=(1+\sqrt3)/4$。与 $I/3$ 混合可降至 $17/25$，而三组共用制备的上限为 $2/3$。[单变量判据与精确矩阵复算](https://github.com/the-omega-institute/trureturing-books/issues/1649#issuecomment-7238042900)

若三组读数相容，它们能否辨认出制备？在同一四站模型中，取 $F_{jk}=\omega^{jk}/\sqrt3$（$0\le j,k\le2$），写 $B=F^*\rho F$。三点 Fourier 基的第一列沿 $\mathbf1$，因而 $F^*V(t)F=\operatorname{diag}(e^{it},1,1)$。把各通道的概率合成一个复数，直接展开得
$$
\sum_{j=0}^2\omega^j q_j(t)= e^{-it}B_{01}+B_{12}+e^{it}B_{20},\qquad q(0)=p.
$$

两边乘以 $e^{it}$，右边成为关于 $e^{it}$ 的二次多项式。三个互异相位便确定三个系数。由于每组概率均为实数且和为一，这个复数也确定整组概率。于是全部相容制备恰为 $F B F^*$，其中 $B=C+\operatorname{diag}(x)$ 半正定，$\sum_j x_j=1$，而零对角厄米阵 $C$ 的非对角元已由读数确定。

正性有时能把缺少的对角元也完全确定。记 $m=\max_{|u_j|=1}(-u^*Cu)$。去掉共同相位后写 $u=(1,v,w)^T$。给定 $v$，选择 $w$ 使 $w(C_{02}+\bar v C_{12})$ 的实部最小，就只剩下一个圆周上的极值。

$$
m=2\max_{|v|=1}\left(\left|C_{02}+\bar v C_{12}\right|-\operatorname{Re}(C_{01}v)\right).
$$

下面手推 $m$ 是给 $C$ 补对角元所得半正定矩阵的最小迹。加上充分大的标量阵就能得到正定阵，而半正定且迹有界的矩阵构成有界集，故最小迹可取到，记一个极小矩阵为 $B_*$。在这个迹上，补对角元的仿射平面与正定锥不交，否则可减去小的正标量阵。分离两者的非零泛函 $\operatorname{tr}(Y\,\cdot)$ 可取在正定锥一侧有较大的值。沿锥缩放得 $Y\succeq0$ 及 $\operatorname{tr}(YB_*)=0$。平面包含全部无迹对角方向，故 $Y$ 的对角元相等，可归一为一。

对复相关矩阵上的实线性泛函 $X\mapsto-\operatorname{Re}\operatorname{tr}(CX)$ 应用三维相位格拉姆极大值定理，得 $m\ge-\operatorname{tr}(CY)=\operatorname{tr}B_*$。反向不等式来自每个相位向量都满足 $u^*B_*u\ge0$。[相位格拉姆极大值定理](lean:D5/S3/Quantum/Recovery/CommutingRandomUnitaryRecovery.phase_gram_max)

因此 $m>1$ 时无共同态。$m=1$ 时，任取一个取到极大值的 $u$，每个可行的 $B$ 都有 $u^*Bu=0$，正性迫使 $Bu=0$，故三个对角元唯一地等于 $x_j=-\bar u_j(Cu)_j$。$m<1$ 时，$B_*+(1-m)I/3$ 正定，沿两个独立的无迹对角方向作小扰动仍给出同一记录。

例如，各相位读数都均匀时 $C=0$，整个 Fourier 对角概率单纯形中的态都符合读数，秩一、二、三皆有。另一方面，取 $u=(1,1,-1)^T$，$B=(I-uu^*/3)/2$。它的秩为二且 $Bu=0$，故上述取等条件唯一确定它。在每个相位，其三个概率依次为 $4/9$、$(5+2\sqrt3\sin t)/18$ 和 $(5-2\sqrt3\sin t)/18$，全部严格为正。[补全构造与精确矩阵复算](https://github.com/the-omega-institute/trureturing-books/issues/1649#issuecomment-7238251495)

怎样用一次额外曝光读出剩下的两个 Fourier 布居自由度？假设在同一制备上可以先施加校准的相位掩模 $D_\theta=\operatorname{diag}(1,e^{i\theta},-1)$，再施加混合器 $H=V(\pi)$，最后按原顺序测量三个通道。令 $W=HD_\theta F$。从读数中减去已知的 $\operatorname{diag}(WCW^*)$，余量就是 $Mx$，其中 $M_{jk}=|W_{jk}|^2$。

手算只需两个通道。任意布居差都可唯一写成 $\delta=h(2,-1,-1)^T+k(0,1,-1)^T$。记 $c=\cos\theta,\ s=\sin\theta$，将 $W$ 前两行逐项取模平方，得

$$
\begin{aligned}
(M\delta)_0 &= (4/9-4c/3)h-(4\sqrt3\,s/27)k,\\
(M\delta)_1 &= -8h/9+(8\sqrt3\,s/27)k.
\end{aligned}
$$

系数矩阵的行列式为 $-32\sqrt3\,cs/81$。因此当且仅当 $\theta\notin(\pi/2)\mathbb Z$ 时，第四次曝光能辨认每一个制备：以均匀布居为原点解出 $h,k$，再补回 $C$ 即可。在每个例外角，第二行仍非零，恰有一个盲方向。沿该方向取充分小的非零布居差 $\delta$，则 $\mathbf1/3\pm\delta$ 给出两个正定态，四次读数完全相同。[精确矩阵复算与盲方向](https://github.com/the-omega-institute/trureturing-books/issues/1649#issuecomment-7238485270)

在 Fourier 相位，还可以数出实现同一对读数的纯态。先取 $t=2\pi/3$ 和 $D=\operatorname{diag}(\omega,1,1)$，直接相乘得 $iDVD=F$，其中 $F_{jk}=\omega^{jk}/\sqrt3$，指标从零起。基向量的相位不影响概率。负相位给出 $\bar F$，将态也取共轭便得到相同的可达读数。以下手工推导采用 $F$。在上型基中写密度矩阵 $\rho$，则 $p_j=\rho_{jj}$。把下型概率合成一个复数，由 $q_k=(F^*\rho F)_{kk}$ 得

$$
s=\sum_{k=0}^2 q_k\omega^{-k}=\rho_{01}+\rho_{12}+\rho_{20},\qquad q_k=\frac{1+2\operatorname{Re}(\omega^k s)}{3}.
$$

给定 $p$，这三个非对角元在纯态中的长度依次为 $a=\sqrt{p_0p_1}$、$b=\sqrt{p_1p_2}$、$c=\sqrt{p_2p_0}$。它们的相角是三个振幅的循环相位差，故纯态恰好给出平面点集

$$
\mathcal P_p=\{a e^{i\alpha}+b e^{i\beta}+c e^{-i(\alpha+\beta)}:\alpha,\beta\in\mathbb R\}.
$$

允许混合制备时，$s$ 的可达域恰为 $\mathcal P_p$ 的凸包。凸包中的点可由具有同一 $p$ 的纯态混合得到。反过来，正性迫使 $p_j=0$ 的整行整列为零。在余下的支撑上取 $S=\operatorname{diag}(\sqrt{p_j})$，则 $S^{-1}\rho S^{-1}$ 半正定且对角元全为一。对维数一至三的这类复相关矩阵，每个实线性泛函都在某个秩一相位矩阵上取到最大值。将这一结论用于 $s$ 在各方向的投影，凸包外的每个点都有一个投影超过纯态最大值，因而不可达。[相位格拉姆矩阵的极值定理](lean:D5/S3/Quantum/Recovery/CommutingRandomUnitaryRecovery.phase_gram_max)

特别地，均匀的 $q$ 对应 $s=0$，此时 $\operatorname{diag}(p)$ 总能实现读数。纯态可行当且仅当 $a,b,c$ 能首尾闭合成三角形，允许等号和零边。闭合后将三条边一起旋转，即可使三个方向角之和为零模 $2\pi$，零边的方向可以任取。将海伦公式的四个因子展开，并用 $p_0+p_1+p_2=1$，同一判据可写为 $(p_0p_1+p_1p_2+p_2p_0)^2\le 4p_0p_1p_2$。若三角不等式失效，最小秩恰为二。例如 $p=(1,8,8)/17$ 时最长边 $8/17$ 超过另外两边之和 $2\sqrt8/17$。在调过相位的上型基中，把向量 $(1,4,0)/\sqrt{17}$ 与 $(1,0,-4)/\sqrt{17}$ 等权混合，就得到所需的秩二态。

一般的 $q$ 也有一元纯态判据。若 $p$ 全正且不均匀，可循环移动上型指标而使 $b\ne c$。这只置换 $\rho_{j,j+1}$ 的三个求和项，因而保持 $s$。令 $w=e^{i\alpha}$、$u=e^{i\beta}$。相位方程为 $s-aw=bu+cw^{-1}\bar u$，与其共轭联立即得
$$
\begin{aligned}
N(w)&=bs-abw-c\bar s\,w^{-1}+acw^{-2},\\
u&=\frac{N(w)}{b^2-c^2}.
\end{aligned}
$$
因而只须检验 $w^3[N(w)\overline{N(1/\bar w)}-(b^2-c^2)^2]$ 有没有单位圆根。最高项和常数项的系数都是 $-a^2bc$。每个不同的单位圆根恰好给出一个纯态，整体相位视作相同。可先检验 $w=-1$，再用 $w=(1+ix)/(1-ix)$，将模平方的 Laurent 条件乘以 $(1+x^2)^3$ 得到实多项式。该因子在实轴上严格为正。重根只计一次。

$p$ 恰有两个正分量时，纯态的循环和位于对应单边长度的圆上，每个可行点给出唯一相对相位。单支撑只给 $s=0$。若 $p$ 均匀而 $q$ 不均匀，可交换两套基后使用同一判据。两者都均匀时，等边三角形的两个方向各给出三种整体旋转，恰有六个制备。六也是一般上界，可以在非均匀 $p$ 取到。例如 $p=(4,9,9)/22$、$q=(1,1,1)/3$ 的六次式可化为 $-8w^6+9w^3-8$，它有六个不同的单位圆根。 [六次判据与端点样例](https://github.com/the-omega-institute/trureturing-books/issues/1653#issuecomment-7232049615)

哪些四站点算子也能通过这种压缩产生非零的 $J$？按轮换特征标把空间分成二维不动平面 $F$ 和两条非平凡特征标线。与轮换对易的两个厄米算子可写成 $A=A_0\oplus a_+\oplus a_-$ 与 $B=B_0\oplus b_+\oplus b_-$。将共同轻空间的单位法向量写作 $n=(n_0,n_+,n_-)$。令 $C=[A_0,B_0]$、$\alpha=a_+-a_-$、$\beta=b_+-b_-$，并令 $X_0=\beta(A_0-a_-I)-\alpha(B_0-b_-I)$。把两算子压缩到 $n^\perp$ 得到 $H_A,H_B$，其对易子的有向行列式可分解为
$$
\det[H_A,H_B]=-|n_+n_-|^2\det(X_0)\,n_0^*C n_0.
$$
若两套谱均非简并并按递增排序，这个行列式等于 $2i\Delta_A\Delta_B J$，其中每个 $\Delta$ 是相应压缩算子的三个正本征值差的乘积。因此有向混合要求法向量在两条特征标线上均有非零权重、$X_0$ 可逆且不动平面分量满足 $n_0^*Cn_0\ne0$。任一压缩谱出现重根，行列式即为零。[Jarlskog 的对易子不变量](https://doi.org/10.1103/PhysRevLett.55.1039)

先取 $(\alpha,\beta)\ne(0,0)$。将 $A,B$ 分别减去 $a_-I,b_-I$ 得到 $A',B'$，再取 $X=\beta A'-\alpha B'$ 与 $Y=(\alpha A'+\beta B')/(\alpha^2+\beta^2)$。这个线性变换的行列式为一，压缩后的对易子保持不变。$X$ 只作用于 $F$，而 $Y$ 在两条特征标线上分别取值 $1,0$。令 $Q=I-nn^*$、$x=X_0n_0$，取 $F$ 的标准正交基 $f_1,f_2$，以 $Qf_1,Qf_2,QYn$ 为 $R$ 的三列。在两算子之间插入 $Q$ 得
$$
[H_A,H_B]=R\begin{pmatrix} C&-x\\ x^*&0\end{pmatrix}R^*.
$$
把单位法向量作为第四列补上，前三列张成的平行体的体积平方为 $|\det(f_1,f_2,Yn,n)|^2=|n_+n_-|^2$。中间矩阵的行列式为 $-x^* Cx$，因为二维对易子的迹为零。在 $X_0$ 的本征基中，$C=[X_0,Y|_F]$ 的对角元为零，故 $X_0 C X_0=\det(X_0) C$。若 $\alpha=\beta=0$，两条特征标线张成的平面中有一条垂直于 $n$ 的共同本征线，公式两端均为零。

固定 $A,B$ 并遍取共同复超平面，可得 $\max_n |\det[H_A,H_B]|=|\det X_0|\,\|iC\|_{\mathrm{op}}/27$。三个权重 $\|n_0\|^2,|n_+|^2,|n_-|^2$ 之和为一，乘积至多为 $1/27$。令三者相等，并让 $n_0$ 沿 $iC$ 取到算子范数的本征方向，即可达界。因而存在两套压缩谱均非简并且 $J\ne0$ 的轻空间，当且仅当 $\det X_0\ne0$ 且 $C\ne0$。若要比较不同法向量所得 $J$ 的大小，还需计入随法向量而变的质量谱隙 $\Delta_A\Delta_B$。

**四维 Fourier 双基（手工推导）。** 把共同态问题移到四维，取 $F_4=(i^{jk}/2)_{j,k=0}^3$，仍以 $p=\operatorname{diag}(\rho)$ 和 $q=\operatorname{diag}(F_4^*\rho F_4)$ 记读数。令 $u=(2,-1,2,-1)^T$、$v=(4,i,-4,-i)^T$，则 $\rho=(uu^*+vv^*)/44$ 给出
$$
p=(10,1,10,1)/22,\qquad q=(1,25,9,9)/44.
$$
这对读数只有这一个共同态，故最小秩恰为二。固定 $p$ 时，混合态的第二读数可达域在四维可以严格大于同一 $p$ 的纯态读数凸包。

取第一行 $(0,5+2i,2,5-2i)$ 的厄米循环矩阵 $A$。设 $c=(12,-6,-8,2)$，则 $F_4^*AF_4=\operatorname{diag}(c)$。令 $S=\operatorname{diag}(3,18,3,18)+A$。在平移两格的正、负特征空间上，其两个块分别为
$$
\begin{pmatrix}5&10\\10&20\end{pmatrix},\qquad
\begin{pmatrix}1&4i\\-4i&16\end{pmatrix}.
$$
两块各秩一且半正定，核由 $u,v$ 张成。共同实现 $p,q$ 的任一态 $X$ 都满足 $\operatorname{tr}(SX)=3(p_0+p_2)+18(p_1+p_3)+c\cdot q=0$，因而 $X=UHU^*$，其中 $U=[u\ v]$。第 $0,2$ 项对角元相等，第 $1,3$ 项对角元也相等，分别迫使 $H$ 的非对角元实部和虚部为零。其余两条对角方程确定 $H=I_2/44$。若 $q$ 来自第一读数同为 $p$ 的纯态凸组合，每个正权重分量都须使非负量 $\operatorname{tr}(SX)$ 为零。核内具有读数 $p$ 的态只有上述秩二态。[四维反例的精确核对](https://github.com/the-omega-institute/trureturing-books/issues/1657#issuecomment-7232238573)

**哪些第一读数会出现差距？** 记 $E=(p_0+p_2)/2$、$O=(p_1+p_3)/2$、$\delta_e=(p_0-p_2)/2$、$\delta_o=(p_1-p_3)/2$。四维 Fourier 双基中，固定 $p$ 的混合态读数严格超出同一 $p$ 的纯态读数凸包，当且仅当
$$
EO>0,\qquad E\ne O,\qquad
\left(\frac{\delta_e}{E}\right)^2+\left(\frac{\delta_o}{O}\right)^2<1.
$$
有零分量时，正性把问题限在至多三维的支撑上。此时对任一方向，前述相位格拉姆矩阵的极值定理保证纯态可以达到混合态的极值。

对满支撑的 $p$，用线性泛函分离两种读数的可达域。目标矩阵是厄米循环矩阵，固定对角的半正定规划有严格可行点。对偶松弛 $S$ 只调整对角元，最优态支撑在 $\ker S$。秩为零或三的 $S$ 总允许纯态最优解。秩一时，核条件给出闭合的向量和，其边长由 $p$ 与 $S$ 决定。同样边长可排成闭合平面多边形，给出所需的纯态。秩二时，若循环非对角元可通过对角酉变换化为实数，取实部可得核内实半正定解。将它的至多两个实外积因子作为一个复向量的实、虚部，就得到同一第一读数。

余下的秩二松弛由偶主块的 Schur 补分成平移两格的正、负特征块，核基可取 $(1,r,1,r)^T$、$(1,is,-1,-is)^T$，其中 $r,s$ 是非零实数。对置矩阵元相同，迫使 $r^2,s^2$ 位于 $1$ 的同一侧，或同为 $1$。若两个平方相等，核内可将任一可行对角读数实现为秩一。若它们不等，固定 $p$ 唯一确定核内的厄米系数矩阵 $\begin{pmatrix}a&z\\\bar z&b\end{pmatrix}$。差距要求它正定。于是 $E=a+b$、$O=r^2a+s^2b$ 给出 $E\ne O$，而 $E^2\ge4ab$、$O^2\ge4r^2s^2ab$、$|z|^2<ab$ 给出严格椭圆不等式。反过来，在严格区域内取 $a=b=E/2$，将两个互异的平方取在 $O/E$ 的两侧并充分靠近它，且使均值为 $O/E$。对角方程给出正定的系数矩阵，两个秩一块可拼出满足循环条件的 $S$。它的零面于是暴露一个唯一的秩二最优态。[分类的完整推导](https://github.com/the-omega-institute/trureturing-books/issues/1663)

**指定两套读数时的最小秩（手工推导）。** 把态写成 $XX^*$，其中 $X$ 的四行是向量 $x_0,\ldots,x_3$，令 $A=x_0+x_2$、$B=x_0-x_2$、$C=x_1+x_3$、$D=x_1-x_3$。傅里叶变换后的四个向量是 $(A+C,B-iD,A-C,B+iD)/2$。记 $a,b,c,d$ 为 $A,B,C,D$ 的范数平方。给定 $p,q$ 后只需搜索 $a$，因为 $b=2(p_0+p_2)-a$、$c=2(q_0+q_2)-a$、$d=2(p_1+p_3)-c$。四个平方须非负。记

$$
g=(p_0-p_2,\ q_1-q_3,\ p_1-p_3,\ q_0-q_2),\qquad m=(ab,bd,dc,ca).
$$

四个数 $g_j$ 是沿 $A,B,D,C,A$ 一圈的实重叠，第二条边先乘 $i$。任何实现都须满足 $g_j^2\le m_j$。若有范数为零，删去对应的顶点和边，剩余的每条路径可逐边选相位。因此这些不等式在退化情形已足以构造纯态。

若 $abcd>0$，先检验秩一。四段相位绕一圈相消，留下第二条边的因子 $i$。于是某组 $\epsilon_j\in\{-1,1\}$ 给出纯态，当且仅当

$$
\prod_{j=1}^4\bigl(g_j+i\epsilon_j\sqrt{m_j-g_j^2}\bigr)=i\,abcd.
$$

先将每个因子除以 $\sqrt{m_j}$，再将第二项乘以 $-i$，得到相邻相位比。依次恢复 $A,B,D,C$ 后即可反解 $x_j$。

在 $abcd>0$ 时，将 $g_j/\sqrt{m_j}$ 依次记为 $r,w,t,s$。把复向量当作实向量，$B,A,C$ 上两个已知的归一化内积把 $B,C$ 的归一化内积限制在以 $rs$ 为中心、半宽 $\sqrt{(1-r^2)(1-s^2)}$ 的区间。另一方面，$B$ 与 $-iD$ 的归一化内积为 $w$，故 $B,D$ 的归一化内积可以取遍 $[-T,T]$，其中 $T=\sqrt{1-w^2}$。再用 $C,D$ 的已知内积 $t$，从这条路径得到 $B,C$ 的区间 $[-M,M]$，其中 $|t|\le T$ 时 $M=1$，否则 $M=T|t|+|w|\sqrt{1-t^2}$。后一公式来自在 $|h|\le T$ 上最大化 $ht+\sqrt{(1-h^2)(1-t^2)}$。两个区间相交就可在实四维选取 $B,D$，再依次放入 $C,A$，因此有复二维见证。若某个 $a$ 通过秩一检验（零范数时用边不等式，正范数时用相位乘积），最小秩为一。其余可行情形的最小秩为二。若没有 $a$ 通过任一可行性检验，则两套读数无法共同实现。[区间端点与重建](https://github.com/the-omega-institute/trureturing-books/issues/1667)

**支撑差集与最小实现秩（手工推导）。** 在 $d$ 维的坐标基与循环 Fourier 基中，设第一读数恰支撑在 $S\subset\mathbb Z_d$ 上，令 $k=|S|$ 表示支撑大小。记 $m$ 为 $S$ 中不同位置之间的非零有向差所取的不同值数。每个可达的第二读数都有秩至多 $\lfloor\sqrt{k+m}\rfloor$ 的共同态。能强制秩 $k$ 的充要条件是全部 $k(k-1)$ 个有向差互异。在这个条件下，均匀第二读数唯一确定对角态。

正性使支撑外的行列消失。将第二读数作离散 Fourier 逆变换，每个循环差只读到该差上的矩阵元之和。相反的两个差给出一对共轭复数，偶数维时自逆的差单独给出一个实数，共至多 $m$ 条实条件。连同 $k$ 个对角元，在秩 $r$ 的像空间内若 $r^2>k+m$，就有非零厄米扰动同时保持两读数。将它加到原态，沿该方向移动到半正定锥的边界，秩下降而读数不变。若全部非零有向差互异，均匀第二读数使每个非对角元单独为零，故唯一的共同态秩为 $k$。

四维全支撑时 $k=4$、$m=3$，所以每套可达读数都能由秩至多二的共同态实现。上面的指定读数例子确能强制秩二。[附录 D](appendix-d.md) 给出满支撑秩的差集门槛，以及由子支撑收紧的秩界。三点支撑若有重复差，还可用三条边的长度直接求出纯态到均匀 Fourier 读数的最近距离，见[附录 D.3](appendix-d.md#sec-ou-appd-three-site-radius)。

在第 $2\,306\,888\,100\,085$ 枚正零点，把四个算术 Gram 源的正交化方向依次放在极点与三条射线的首站，用后三个原始源张成的空间代表三代。把荷 $-4,2$ 的壳算子分别压缩到这个空间，作为上型、下型左手夸克的质量平方矩阵。一步传播保留共同的反酉对称，Jarlskog 不变量 $J=0$。走两步再投影，多出了中途离开三代空间又返回的路径，给出 $J\simeq3.00189\times10^{-4}$。产生 CP 破坏后，还要同时解释夸克质量与顶底混合。在 $1\,\mathrm{TeV}$ 六个夸克汤川耦合各自的 $1\sigma$ 区间内，即使上下两部门各自任取十九个非负谱值，所得 $|V_{tb}|$ 也只能小于 $0.9936401$ 或大于 $0.99915018$，同尺度参考窗落在两者之间。若允许壳上的读数取负而压缩后的质量平方保持正定，两荷共用一个至多十一次的实多项式就能重现任意给定的六个正夸克质量与 CKM 矩阵。这个自由度使多项式的系数也成为统一模型必须解释的量。[两步传播](https://github.com/the-omega-institute/trureturing-experiments/blob/b0f5a77f57448869a358fdfb61c96dad5aa3f039/experiments/ch39-omega-research/replay/ch39-three-gram-source-flavor.py) · [非负谱的混合限制](https://github.com/the-omega-institute/trureturing-experiments/blob/b0f5a77f57448869a358fdfb61c96dad5aa3f039/experiments/ch39-omega-research/replay/ch39-three-source-positive-ckm.py) · [有符号多项式构造](https://github.com/the-omega-institute/trureturing-experiments/blob/b0f5a77f57448869a358fdfb61c96dad5aa3f039/experiments/ch39-omega-research/replay/ch39-signed-three-source-quark-pair.py) · [参考输入表 2](https://arxiv.org/html/2510.01312v2#Sx1.T2)

夸克数据还约束三代空间本身的取向。取极点与三个首站构成的实四维空间，将其中一个实三维超平面复化，作为上下型共有的味空间。记 $a$ 为其单位法向在三循环固定平面上的投影长度。允许两部门各自在四站上选取任意保持三循环的正半定算子，并把压缩读作质量平方。用同一张 $1\,\mathrm{TeV}$ 表的质量与混合误差窗，区间计算给出必要条件 $0.0096549<a<0.0332714$。四个算术源中任选三个，得到的 $a$ 都在 $0.5198$ 与 $0.5774$ 之间。取 $a=0.02145737$，同表中心值有严格正定的四站扩张。[四站正扩张的范围与构造](https://github.com/the-omega-institute/trureturing-experiments/blob/cd7ec54bd5afd349e0a6734cc600f16e66ce612c/experiments/ch39-omega-research/replay/ch39-free-four-site-positive-extensions.py)

在上述零点，取同一 $a$ 并选定共同味空间，给上下两荷的十九个壳能级分别赋予严格正的振幅，先压缩再平方，也能同时重现六个中心质量和完整 CKM。在这种读法下，即使任选共同实三维空间，匹配表中十个参数各自的 $1\sigma$ 区间，也要求至少一个上型谱振幅超过 $1.18$（以物理汤川耦合为单位）。精确匹配中心值时，这个下界提高到 $1.22$。上述构造的上型峰值约为 $1.768$。把空间固定，再将两组振幅按能量次序原样用于前后两枚零点，六个质量中分别有三项、四项出窗。第一、二代混合角也从中心的 $0.22704$ 弧度变为约 $0.15892$ 和 $0.25816$ 弧度。 [实际壳上的正振幅](https://github.com/the-omega-institute/trureturing-experiments/blob/f3a9b2fe627f7a47bb84763cfb0750a4a440c316/experiments/ch39-omega-research/replay/ch39-free-four-site-native-positive-spectrum.py) · [相邻零点检验](https://github.com/the-omega-institute/trureturing-experiments/blob/f3a9b2fe627f7a47bb84763cfb0750a4a440c316/experiments/ch39-omega-research/replay/ch39-native-positive-spectrum-holdout.py) · [上型谱振幅下界](https://github.com/the-omega-institute/trureturing-experiments/blob/850b244f08028f0b505652894aaaa2c44ecdf693/experiments/ch39-omega-research/replay/ch39-four-site-physical-amplitude-cap.py) · [十维误差窗](https://github.com/the-omega-institute/trureturing-experiments/blob/e459474410c699a431741bf2ca6d62be2170aba7/experiments/ch39-omega-research/replay/ch39-four-site-physical-cap-window.py)

若允许四站法向为复向量，其在两个非平凡循环特征方向上的模长可以不同。这样选取同一个三代空间，在中心零点也能精确重现上述夸克数据，而三十八个谱振幅全都小于一，上、下型峰值分别约为 $0.948$ 和 $0.376$。固定这个复空间，在左右两枚邻点分别重新选择两荷的全部非负谱权并允许任意大的振幅，仍找不到共同味基能重现六个中心质量与完整 CKM。在三个相邻编号中，最少需要几个这样的空间？将两荷谱振幅限于 $[0,1]$，答案恰为两个。中心 $N$ 与右邻 $N+1$ 可以共用空间，两点的味矩阵相差一次共同酉共轭。左邻可以单独实现同一组夸克数据，却无法与中心共用任何四站三代空间，即使两点各自选取共同味基、重新分配两荷的全部谱权。原因在于，共同超平面的法向确定同一条轴。若两处都匹配六个夸克质量和完整混合，各自允许的原生方向之间的弦距必须小于 $0.748$，实际最小弦距超过 $0.75042$。左邻与右邻也无法共用空间，其最小弦距超过 $0.67579$，而共轴要求小于 $0.670$。因此使用两个空间时，唯一的分组是左邻独用一个，中心与右邻共用另一个。[复味空间的有界振幅](https://github.com/the-omega-institute/trureturing-experiments/blob/b7b39455dda1dc8627e0b92029a57c00f078fa7b/experiments/ch39-omega-research/replay/ch39-complex-four-site-unit-quark-amplitudes.py) · [邻点的全部共同味基](https://github.com/the-omega-institute/trureturing-experiments/blob/51bfcbb58a8967557baa419327e272191843ab25/experiments/ch39-omega-research/replay/ch39-complex-neighbour-quark-orbits.py) · [左邻与中心的全参数分离](https://github.com/the-omega-institute/trureturing-experiments/blob/6d5ac0f06e75d0781f1564685f37ad746ace83fb/experiments/ch39-omega-research/replay/ch39-global-independent-weak-frame-separation.py) · [两个外邻的分离](https://github.com/the-omega-institute/trureturing-experiments/blob/5ad3848d5b67113a6b75980220939bc3bf49bd4b/experiments/ch39-omega-research/replay/ch39-left-right-independent-weak-frame-separation.py)

这三个零点能预测再向外一步的顶夸克质量吗？取 $N=2\,306\,888\,100\,085$，把 $N-1,N,N+1$ 的谱振幅固定。在 $N-2$ 或 $N+2$ 的每一层，用距离该层较近的训练谱点赋予较大或相等的权重，再作非负加权平均。这样的读数恰好落在一个简单的区间里：依距离排序，分别求最近一个、两个、三个直到全部训练点的平均，取这些平均的最小值和最大值作为两端。即使每层独立混合本荷 $57$ 点平均与三荷 $171$ 点平均，并重选四站复三代空间，两处顶汤川耦合的可达最大值也分别只有 $0.82723$ 和 $0.78561$（近似值），均低于 $1\,\mathrm{TeV}$ 参考窗的下限 $0.8573$。若五壳全部重新校准，恰好需要三个味空间。$N-2,N-1,N$ 中任意两枚对同一个超平面法向的要求都不相容，这给出三的下界。让 $N-2$ 和 $N-1$ 各用一个空间，$N,N+1,N+2$ 共用第三个。五处都能精确重现六个中心质量和完整 CKM。[近邻平均的可达范围](https://github.com/the-omega-institute/trureturing-experiments/blob/5dc5ad5b477e097bac65fb7b87e4c051ff1e4e68/experiments/ch39-omega-research/replay/ch39-distance-ordered-quark-holdout.py) · [五壳的三个味空间](https://github.com/the-omega-institute/trureturing-experiments/blob/e92b1976421a840dd7b77a7350ac79b3d9510417/experiments/ch39-omega-research/replay/ch39-five-shell-three-space-quark-witness.py) · [三个空间的下界](https://github.com/the-omega-institute/trureturing-experiments/blob/3ea9711819b9c0e12ef205afc43e272af7c3998d/experiments/ch39-omega-research/replay/ch39-five-shell-oriented-axis-triangle.py)

若内壳的振幅已经固定，跨壳输运在不同荷上能有多相似？从 $N+1$ 走到 $N+2$，固定上、下型各十九个源振幅。让两荷分别选取酉输运 $U_u,U_d$，可以在同一个四站三代空间中精确恢复六个夸克中心质量和完整 CKM。若两荷共用一个十九维酉矩阵，则即使重新选择整个四站复三代空间和弱基，仍无解。原因在于，同一输运使三循环的三个表示块各自受到一条两荷联合迹下界的约束。观测中心值至少违反其中一条。定量地，即使扣除整体相位，任一匹配也须有 $\min_\phi\lVert U_u-e^{i\phi}U_d\rVert_{\mathrm{op}}>0.000319$。[两荷分别输运的构造](https://github.com/the-omega-institute/trureturing-experiments/blob/bcd3487f2073c5a027055f80c4687d455b18fc1d/experiments/ch39-omega-research/replay/ch39-independent-unitary-quark-right-holdout.py) · [共同输运的全域下界](https://github.com/the-omega-institute/trureturing-experiments/blob/5057a85c532e6d4c3bcc4dc31006022e270eea10/experiments/ch39-omega-research/replay/ch39-all-spaces-common-unitary-quark-right.py)

即使两荷分别输运，三循环对称性也必须明显破缺。考虑在每个三站轨道上振幅相同的态。六个轨道加一个极点张成七维不变空间。要在右外壳精确匹配夸克中心，至少对一种荷，存在一个这样的输入态，输运后落在该空间之外的概率超过 $50.134\%$。若下型取 $X$、上型取 $X^{-2}$，则生成元 $X$ 本身也必须把某个不变态以超过 $23.244\%$ 的概率送出该空间。还能确定，上型输运本身也必须将某个不变态以超过 $45\%$ 的概率送出这个七维空间。即使允许在十二维正交补内任意混合两个非平凡字符，并让下型的十九个谱权任取非负值，保持七维空间仍无法同时恢复六个质量与完整 CKM。这也排除了仅由保持三循环的内、外壳磁拉普拉斯谱函数相乘得到的上型输运。[三循环不变空间的转移界](https://github.com/the-omega-institute/trureturing-experiments/blob/4f1ff7795f9386eec808590e1746124a40ff8e59/experiments/ch39-omega-research/replay/ch39-quark-cyclic-subspace-transfer.py) · [上型单荷的转移概率下界](https://github.com/the-omega-institute/trureturing-experiments/blob/97792698f89d64b04d9952cdef4f0cad8965f067/experiments/ch39-omega-research/replay/ch39-up-leakage-probability-floor.py)

若荷六输运 $G=X^3$ 保持这个七维空间，条件还能收紧。由 $X^{-2}=G^*X$，同一个输入态在上、下型输运下落到空间之外的概率相同，故必有一个态在两荷下都超过 $50.134\%$。要让态跨过这条边界，空间内外必须有一个共同的荷六本征值，生成元才能在该本征空间内混合两侧的方向。两壳的荷六谱投影和坐标轮换都保持这一区分。若只用这些输入，以同时换基下协变的单值规则选择生成元，所得算子仍保持七维空间。一个按目标校准的例子只调整第一条荷六高振幅源态在目的谱层上的相位，保留全部十九个荷六振幅及三项引力读数。所得荷六输运的一个四相位立方根，让两荷的转移概率都超过 $82.67\%$，并能在同一三代空间实现上、粲、顶三个质量中心。另一种选择是把两壳的十九条荷六谱线按能量次序逐一配对。即使每对的相位都可自由选择，再任选一对谱线互换，最轻的上型与下型夸克也无法同时入窗。[任意相位及单次交换的区间界](https://github.com/the-omega-institute/trureturing-experiments/blob/c639c08bfc88479f95bdf3b3b42802e939c3000b/experiments/ch39-omega-research/replay/ch39-energy-order-arbitrary-phases.py) · [荷六谱与两荷转移概率](https://github.com/the-omega-institute/trureturing-experiments/blob/7b29b6729564062f4a8732105bc65640d82d9024/experiments/ch39-omega-research/replay/%E8%8D%B7%E5%85%AD%E8%B0%B1%E7%9A%84%E5%AF%B9%E7%A7%B0%E6%80%A7%E4%B8%8E%E5%85%B1%E5%90%8C%E7%94%9F%E6%88%90%E5%85%83%E6%89%80%E9%9C%80%E7%9A%84%E7%AE%80%E5%B9%B6.md) · [四相位构造](https://github.com/the-omega-institute/trureturing-experiments/blob/a8f29cba49d1141de1c35f02da7356648a3649d3/experiments/ch39-omega-research/replay/ch39-rephased-involution-up-centers.py) · [两壳投影的共同对称性](https://github.com/the-omega-institute/trureturing-experiments/blob/708cd9fc62d2dba2d6b456c08b0a9fb0a7ff84ed/experiments/ch39-omega-research/replay/ch39-charge-six-projector-algebra-transport.py)

这个转移至少要动多少个站位？若其余站位严格保持恒等，在十九站中任选十站混合，最轻上夸克都高于参考窗上端。区间计算覆盖了全部 92,378 种选择。另一方面，已有十三站输运让四站振幅的四个本征值与三个目标质量严格交错，从而能在同一三代空间精确实现上、粲、顶三个质量中心。所需的最小站数因此在十一至十三之间。[十站排除](https://github.com/the-omega-institute/trureturing-experiments/blob/7699969d96390d24f43dfe9ec0320dc7a70e55a9/experiments/ch39-omega-research/replay/ch39-up-ten-site-cover.py) · [十三站构造](https://github.com/the-omega-institute/trureturing-experiments/blob/0c51fd050d0460ee3f7bc6f3b260db46b441ce61/experiments/ch39-omega-research/replay/ch39-local-unitary-up-mass-witness.py)

能产生六个质量的共同谱函数至少需要几次？在上面这枚零点和它的右邻分别考察，让上、下型共用一个在全实轴满足 $0<R(t)<1$ 的实有理函数，在共同的四站复三维空间上先压缩再平方。以约分后分子、分母次数的较大值计，最低次数恰为四。三次及以下即使允许两荷各选三代空间，也无法把六个质量同时送入各自的 $1\sigma$ 窗口。四次时，每枚零点各有一个函数能精确重现六个中心值。完整的混合矩阵还需要多少自由度？在中心零点，另一条四次函数能同时重现六个质量和 $|V_{ub}|$，但它给出 $|V_{cb}|\simeq0.9983$，远离参考值 $0.0427$。在中心及右邻分别取两荷各自的第十和第十七层，用这四个谱点构造次数至多为八的有理函数，则六个中心质量、九个 CKM 模平方和带符号的 Jarlskog 不变量都能同时重现。函数系数和味空间按编号分别选取。全实轴有界的非常数实有理函数约分后分母次数为偶数，右邻还有一个六次构造。因此完整夸克数据的最低次数在中心只可能是四、六或八，在右邻只可能是四或六。[低次数排除](https://github.com/the-omega-institute/trureturing-experiments/blob/cd77e22ffcdfad79fa9f5885649fbe24488859c9/experiments/ch39-omega-research/replay/ch39-common-quadratic-flavor-exclusion.py) · [四次构造与混合检验](https://github.com/the-omega-institute/trureturing-experiments/blob/cd77e22ffcdfad79fa9f5885649fbe24488859c9/experiments/ch39-omega-research/replay/ch39-common-quartic-six-masses.py) · [四次函数匹配 $|V_{ub}|$](https://github.com/the-omega-institute/trureturing-experiments/blob/679578c68c047c16917fa8df286ca992e1277d99/experiments/ch39-omega-research/replay/ch39-central-quartic-vub.py) · [四个谱点的完整混合构造](https://github.com/the-omega-institute/trureturing-experiments/blob/c434c5bc2be68117b9fb9aac02de3e193013b45b/experiments/ch39-omega-research/replay/ch39-sparse-rational-full-ckm.py) · [右邻的六次函数](https://github.com/the-omega-institute/trureturing-experiments/blob/39b561099993b46a610ea55d77cc5c58a2151abc/experiments/ch39-omega-research/replay/ch39-common-sextic-full-ckm.py)

这些质量基的几何关系还给出轮换必须破缺的最小幅度。

::: {.example #ex-ou-ch08-commutator-floor title="从 $1\,\mathrm{TeV}$ 质量与混合输入估计轮换破缺"}
把两个质量平方矩阵 $H_u, H_d$ 各自减去最小本征值再除以谱直径，记作无量纲归一矩阵 $A, B$（谱直径皆为 $1$）。因为 $\mathcal{E}(A)$ 与 $\mathcal{E}(B)$ 在 $T$ 本征基中同时对角，故 $[\mathcal{E}(A), \mathcal{E}(B)] = 0$。将 $[A, B]$ 拆作 $[A - \mathcal{E}(A), B] + [\mathcal{E}(A), B - \mathcal{E}(B)]$，并对谱直径至多为 $1$ 的厄米矩阵使用基本不等式 $\|[H, X]\|_{\mathrm{HS}} \le \|X\|_{\mathrm{HS}}$，立得

$$
\|[A, B]\|_{\mathrm{HS}} \;\le\; \|A - \mathcal{E}(A)\|_{\mathrm{HS}} + \|B - \mathcal{E}(B)\|_{\mathrm{HS}} \;\le\; \frac{2}{\sqrt{3}}\max_{X \in \{A, B\}} \|[T, X]\|_{\mathrm{HS}}.
$$

现在切入上型质量基，于是 $A = \operatorname{diag}(0, a_c, 1)$ 而 $B = V \operatorname{diag}(0, b_s, 1) V^*$。沿用 $1\,\mathrm{TeV}$ 汤川初值与保守混合输入 $|V_{cb}| > 0.035$、$|V_{tb}| > 0.98$，单看 $(c, t)$ 元就有 $|B_{ct}| \ge |V_{cb} V_{tb}| - b_s$；仅计入 $[A, B]$ 的 $(c, t)$ 与 $(t, c)$ 两项，已有 $\|[A, B]\|_{\mathrm{HS}} > 0.0479$，乘以 $\sqrt{3}/2$ 立刻钉死

$$
\max_{X \in \{A, B\}} \|[T, X]\|_{\mathrm{HS}} \;>\; 0.0414.
$$

**顶底质量线给出的锐界（手工推导）。** 记顶、底质量本征线的射影夹角为 $\theta=\arccos|V_{tb}|$，并取 $d=\min(\theta,\pi/2-\theta)$。若两套归一质量平方的最大与次大本征值之差均至少为 $g>0$，则

$$
\max_{X\in\{A,B\}}\|[T,X]\|_{\mathrm{HS}}
\ \ge\ \sqrt{3/2}\,g\sin d.
$$

在质量基中只保留连到最大本征值的矩阵元，可得 $\|[T,X]\|_{\mathrm{HS}}\ge g\|[T,P_X]\|_{\mathrm{HS}}$，其中 $P_X$ 投影到该质量线。在轮换本征基中，若该线的模平方读数为 $p_j$，则 $\|[T,P_X]\|_{\mathrm{HS}}^2=3(1-\sum_j p_j^2)$。两条质量线到各自最近轮换本征线的距离之和至少为 $d$。若就近的是同一条线，三角不等式给出下界 $\theta$。若是两条正交线，则给出 $\pi/2-\theta$。因此至少一条质量线的最大读数 $p=\max_j p_j$ 不超过 $\cos^2(d/2)$。当 $p\ge1/2$ 时，将其余读数合并得 $1-\sum_j p_j^2\ge 2p(1-p)\ge(\sin^2 d)/2$。当 $p\le1/2$ 时，直接用 $\sum_j p_j^2\le p$。

等号可在包含两条质量线的平面内达到。若 $\theta\le\pi/4$，用一条轮换本征线平分夹角。若 $\theta\ge\pi/4$，取两条正交轮换本征线，各向外偏离就近质量线 $d/2$。在各自质量线、平面内正交线和平面法线上，分别赋质量平方 $1,1-g,0$。两套谱隙不同时，也可按各自的谱隙分配偏角。[射影角的三角不等式](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.fs_angle_triangle) · [不同谱隙的最优分角](https://github.com/the-omega-institute/trureturing-books/issues/1849#issuecomment-7238283999)

在 $1\,\mathrm{TeV}$ 的参考输入表 2 中，$y_c/y_t\le0.00316/0.8573$，$y_s/y_b\le0.000271/0.01392$，因此可取 $g=0.9996$。沿用上面的保守混合输入，$|V_{tb}|>0.98$ 使 $d=\theta$，而 $\sin\theta\ge |V_{cb}|>0.035$ 使破缺严格大于 $0.0428$。直接以表 2 的边际区间构成输入盒时，$\sin\theta\ge\sin(0.04233)$，下界进一步超过 $0.0518$。[参考输入表 2](https://arxiv.org/html/2510.01312v2#Sx1.T2)
:::

## 8.2 汤川层级障碍图谱：单希格斯、密度势、输运顶角与最小站点支撑 {#sec-ch08-yukawa-nogo}

既然精确轮换必须破缺，最自然的物理猜测是：直接把十九点壳的轻夸克模与壳上的希格斯模或近邻输运耦合起来，让质量层级自然涌现。然而，跨越单枚零点与千枚连续零点窗的全面证书，把整整五类直觉机制逐一封死：

| 被检机制 | 检验零点与模型口径 | 精确禁行上界 / 强制代价 | 参考目标与出处 |
| :--- | :--- | :--- | :--- |
| 单轻希格斯局域顶角 | #22027, #28325；共享十九站顶角，前三希格斯模任意复叠加 | **$m_c / m_t > 0.0272$**；放开全部 $19$ 模求上下比须 **$99.858\%$** 真空入重模，希格斯质量平方改动 **$> 2.015 \times 10^{28}\,\mathrm{GeV}^2$** | 参考 $m_c / m_t \approx 0.00361$；右夸克单调平滑仍给上/下比 $< 1.557$ |
| 任意站点密度势局部真空 | #11431 单枚；以及 $[10855, 12092]$ 全部 $1238$ 枚零点 | #11431 任意密度势局部真空 **$m_t / m_b < 2.690$**（扩散动能 $< 3.923$）；**全部 $1238$ 枚**荷三动能配任意密度势 **$m_t / m_b < 30$** | 参考 $1\,\mathrm{TeV}$ $m_t / m_b > 40$；实测剖面必有负曲率相位方向 $< -0.006\|h\|^2$ |
| 七轨道非负局域汤川 | #22027, #28325；极点加六三点轨道任取非负权，三轻希格斯模 | 上型夸克／带电轻子总范数比 **$m_u / m_\ell < 3.34$** | $1\,\mathrm{TeV}$ 参考窗下端 **$84.98$**（缺口逾 $25$ 倍） |
| 单腿一步与三腿八系数输运 | #22027, #28325；三零点 (#11661, #11934, #22027) | 单腿输运至少一比低于目标 **$2.363\%$**；三腿八系数单枚可拟但重上块范数 **$> 16.63$**、真空四次迹系数 **$> 3.45 \times 10^{34}\,\mathrm{GeV}^2$**；三枚共用至少一比 **$< 98.7\%$** | 单枚校准交换失效（#28325 上 $m_u / m_\ell < 47.366$） |
| 最小站点支撑分类 | #11431 共同希格斯剖面；可微密度势驻态方程 | 达 $m_t / m_b$ 至少 **$8$ 站**（恰六组，全强制 **$m_c / m_t > 0.559$**；$9$ 站 $> 0.208$，$10$ 站 $> 0.01$）；双层级需 **$14$ 站**；驻态方程至少 **$16$ 站** | 少于 $16$ 站则在空站点留严格正场方程残差 |

### 8.2.1 单希格斯与任意密度势为何集体失灵

每一行数字背后都有硬核的变分几何理由（复算证书见 [`ch39-positive-orbit-yukawa.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-positive-orbit-yukawa.py)、[`ch39-minimum-flavor-support.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-minimum-flavor-support.py) 与 [Ω 复算说明](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/Ω复算说明.md)）：

- **单希格斯与重模脱耦势同水火**：在不外加味拟合系数的十九站点共享局域顶角下，前三轻希格斯模的任意复叠加都压不低粲顶比（$m_c/m_t > 0.0272$）。若硬把全部十九个希格斯分量都拉进来凑足上下型夸克整体范数比，至少要把希格斯真空期望平方范数的 **$99.858\%$** 倾泻到十六个重模上！对应的裸 Rayleigh 能标至少 $1.279 \times 10^{14}\,\mathrm{GeV}$，若要求该真空同时充当 $125.25\,\mathrm{GeV}$ 物理希格斯方向，原壳质量平方的厄米改动必须超过 **$2.015 \times 10^{28}\,\mathrm{GeV}^2$**（至少沿一方向负改动超 $1.63 \times 10^{28}\,\mathrm{GeV}^2$）——轻希格斯瞬间被重壳撕碎。即便只在右手夸克上加入任意共同非增拉普拉斯谱响应，两枚零点上的轻希格斯仍只能给出上下范数比 $< 1.557$。
- **任意密度势的相位盲区**：任意仅依赖各站密度 $|h_i|^2$ 的势能（哪怕非凸、哪怕跨站耦合）对站点相对相位浑然不觉；在 #11431 上，任何能凑出实测顶底层级的剖面都在保密度相位变分方向上带有严格负曲率（二阶变分小于 $-0.006\|h\|^2$），因此永远无法成为局部极小，所有真正的局部真空都被压在 $m_t / m_b < 2.690$（齐次凸势下甚至 $< 1.796$）。这一障碍绝非 #11431 的孤例：在连续区间 $[10855, 12092]$ 的**全部 $1238$ 枚实际零点**上，经 $1231$ 份单点证书与另 $7$ 枚的 $180$ 个方向分区认证，荷三动能加任意密度势的非零局部真空逐枚严格满足 $m_t / m_b < 30$。即便把 #11431 的 $117$ 条非树边权压到千分之一做对照，也只有单独篡改希格斯动能才能调到 $60.80$；若五荷共用同一两档边权，密度势局部真空仍被压死在 $3$ 以下，且一切回路相位均为 $\pm 1$ 时上下型奇异值直接逐项相等！

### 8.2.2 输运顶角的反噬与最小站点支撑阶梯

单腿一步平行输运完全不够力（至少一项质量比跌在参考下限的 $2.363\%$ 以下）。放大到三条腿各自在原场与一次邻边输运之间组合的八复系数顶角（[`ch39-minimal-product-transport.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-minimal-product-transport.py)），确实可以在单枚零点（#22027 或 #28325，最少需两项乘积输运项）上把九个带电费米子质量与完整 CKM 一网打尽。但它马上交出一张天价账单：任何满足参考范数比与顶质量窗的解，在重—重上型汤川块上的谱范数都必然超过 **$16.63$**（#28325 上超过 $16.68$），进而沿线性希格斯背景把既有重阈值的每色费米子质量四次迹二次项系数推高至 **$3.45 \times 10^{34}\,\mathrm{GeV}^2$ 以上**，直接掀翻[第六章](ch06-higgs-portals-and-electroweak-scale.md)的希格斯门户与[第十一章](ch11-induced-gravity-and-dark-energy.md)的真空配平！（虽然在每条费米子腿上叠加两次基于手征质量映射 $B$ 的有限有理响应，可把单枚零点上 $M_Z$ 至 $M_P$ 内的一圈真空增量压到暗能量基准密度的 $2.49 \times 10^{-9}$ 以下，但三枚候选 `#11661, #11934, #22027` 共用任意八系数时，六个部门质量比中至少一个仍低于参考下限的 **$98.7\%$**，跨零点障碍依然屹立。）

这道跨零点障碍是八项字典上的定理。若把作用律扩充为每腿至多两次邻边输运，在原八项外任加一个含二次输运的单项，三枚候选就能以同一组九个复系数使六个质量比全部越过参考下限的 $98.7\%$，十九种加法中有十五种越过下限本身；这一层面只涉及质量比，九项能否完整命中尚不知道。取全部二十七项，同一组系数在 `#11661`、`#11934`、`#22027` 上同时重现九个带电费米子质量与完整 CKM。代价仍在真空一侧：逐零点证书只能把重—重上型谱范数强制到 $0.2976$ 以上，而对这一字典及其任一子字典，任何命中都把重阈值每色费米子质量四次迹的二次项系数推到 $1.13 \times 10^{31}\,\mathrm{GeV}^2$ 以上；现有跨零点见证的重块谱范数超过 $6.5 \times 10^4$，该系数超过 $5.7 \times 10^{40}\,\mathrm{GeV}^2$。放弃跨零点共用后，这一代价可以大幅降低，但只降在重—重块上：在这三枚零点上各取一组互不相同的系数，九个质量与完整 CKM 精确等于目标值，重—重上型块谱范数依次小于 $4.4319$、$4.4289$、$4.1574$，低于 $4\pi$ 而高于 $\sqrt{4\pi}$；同一组系数下，完整的未投影上型顶角与重双重态乘轻单态的混合块谱范数仍大于 $53.7$，四次迹的二次项系数仍大于 $7.3 \times 10^{32}\,\mathrm{GeV}^2$。单零点精确命中的重—重块下确界因此夹在逐零点证书的下界与这些上界之间，而只用“在该零点上精确命中”这一条件的论证给不出高于它的下界：要证明共用命中的重块更大，必须用到共用条件（[单零点精确命中](https://github.com/the-omega-institute/trureturing-experiments/blob/55ea415e5a3274df2401423715e5f1121339982d/experiments/ch39-omega-research/replay/%E5%8D%95%E6%9E%9A%E9%9B%B6%E7%82%B9%E4%B8%8A%E4%BA%8C%E5%8D%81%E4%B8%83%E9%A1%B9%E5%AD%97%E5%85%B8%E5%AD%98%E5%9C%A8%E9%87%8D%E9%87%8D%E4%B8%8A%E5%9E%8B%E5%9D%97%E8%B0%B1%E8%8C%83%E6%95%B0%E4%BD%8E%E4%BA%8E%E5%9B%9B%E7%82%B9%E5%9B%9B%E5%9B%9B%E7%9A%84%E7%B2%BE%E7%A1%AE%E5%AE%8C%E6%95%B4%E5%91%BD%E4%B8%AD%E4%B8%94%E5%90%8C%E4%B8%80%E9%9B%B6%E7%82%B9%E7%9A%84%E9%80%90%E9%9B%B6%E7%82%B9%E8%AE%BA%E8%AF%81%E4%B8%8D%E8%83%BD%E7%BB%99%E5%87%BA%E6%9B%B4%E9%AB%98%E4%B8%8B%E7%95%8C.md) · [区间证书](https://github.com/the-omega-institute/trureturing-experiments/blob/55ea415e5a3274df2401423715e5f1121339982d/experiments/ch39-omega-research/replay/ch39-single-zero-heavy-block-double-hop-hit.py)）。共用的精确命中确实存在：在上述跨零点见证的相对距离 $10^{-9}$ 以内，有一组二十七项系数，配上三枚零点各自的希格斯真空方向，使九个质量与完整 CKM 在三枚零点上同时精确等于目标值，其重—重上型块谱范数依次落在 $(66633.4, 66633.5)$、$(66488.6, 66488.7)$、$(65983.2, 65983.3)$ 内。共用条件也给出了更高的已认证下界：只要同一组系数在三枚零点上都使各部门质量矩阵的 Frobenius 范数取目标值（完整命中满足这一条件），三枚零点重—重块谱范数的最大值就大于 $0.6233$，高于逐零点证书在这三枚零点上的最大下界 $0.4473$；这条界约束的是三者中的最大值，不是每一枚。共用完整命中上这一最大值的下确界因此落在 $(0.6233, 66633.5)$ 内，是否超过 $\sqrt{4\pi}$、$4.44$ 或 $4\pi$ 都未判定；新下界仍低于单零点命中给出的上界，所以还不能断言共用一定抬高下确界（[共用精确命中与联合下界](https://github.com/the-omega-institute/trureturing-experiments/blob/444f698dc38dbbc4252ea49d8f91d5c66038c094/experiments/ch39-omega-research/replay/%E4%B8%89%E9%9B%B6%E7%82%B9%E5%85%B1%E7%94%A8%E4%BA%8C%E5%8D%81%E4%B8%83%E9%A1%B9%E7%B3%BB%E6%95%B0%E7%9A%84%E7%B2%BE%E7%A1%AE%E5%AE%8C%E6%95%B4%E5%91%BD%E4%B8%AD%E5%AD%98%E5%9C%A8%E4%B8%94%E5%85%B1%E7%94%A8%E6%9D%A1%E4%BB%B6%E6%8A%8A%E4%B8%89%E9%9B%B6%E7%82%B9%E9%87%8D%E9%87%8D%E4%B8%8A%E5%9E%8B%E5%9D%97%E8%B0%B1%E8%8C%83%E6%95%B0%E6%9C%80%E5%A4%A7%E5%80%BC%E7%9A%84%E4%B8%8B%E7%95%8C%E6%8A%AC%E5%88%B0%E9%9B%B6%E7%82%B9%E5%85%AD%E4%BA%8C%E4%B8%89%E4%B8%89.md) · [区间证书](https://github.com/the-omega-institute/trureturing-experiments/blob/444f698dc38dbbc4252ea49d8f91d5c66038c094/experiments/ch39-omega-research/replay/ch39-shared-zero-exact-hit-and-joint-heavy-bound.py)）。单零点上重—重块低于 $\sqrt{4\pi}$ 的完整命中是否存在，仍是开放问题（[扩充字典的可迁移性与重块界](https://github.com/the-omega-institute/trureturing-experiments/blob/e89ffddb8b8e299add2ac0edca523c221a17a4f8/experiments/ch39-omega-research/replay/%E6%AF%8F%E8%85%BF%E8%87%B3%E5%A4%9A%E4%B8%A4%E6%AC%A1%E9%82%BB%E8%BE%B9%E8%BE%93%E8%BF%90%E6%97%B6%E7%AC%AC%E4%B9%9D%E9%A1%B9%E5%8D%B3%E8%A7%A3%E9%99%A4%E4%B8%89%E9%9B%B6%E7%82%B9%E5%85%B1%E5%90%8C%E7%B3%BB%E6%95%B0%E7%9A%84%E8%B4%A8%E9%87%8F%E6%AF%94%E9%9A%9C%E7%A2%8D.md) · [区间证书](https://github.com/the-omega-institute/trureturing-experiments/blob/e89ffddb8b8e299add2ac0edca523c221a17a4f8/experiments/ch39-omega-research/replay/ch39-per-leg-double-hop-transfer.py)）。

同时，按站点稀疏度逐级扫描 #11431 揭露出清晰的最小支撑阶梯：要凑出 $1\,\mathrm{TeV}$ 的 $m_t / m_b$ 至少要用 **$8$ 个站点**（全壳恰有六组，全部强迫 $m_c / m_t > 0.559$；$9$ 站仍 $> 0.208$，$10$ 站仍 $> 0.01$，另有 $12$ 站精确匹配顶、底、粲）；任取 **$14$ 个站点**即可同时拟定顶底与粲顶、奇底双层级（任取 $18$ 站可拟定两张完整矩阵）；但若要求剖面真正满足任意可微密度势的驻态场方程，至少必须点亮 **$16$ 个非零站点**，否则空站上必然留下严格正残差。

为何不同超荷的轻子空间在站点局域顶角下天然互相错位？在[第九章](ch09-proton-stability-and-baryon-triality.md)与[第十三章](ch13-winding-ladder-and-joint-vacuum.md)的联合零点见证 #2,306,888,100,085 上，把荷 $1$ 的三轻模分别与荷 $2$、荷 $-4$ 的三轻模直接配对比较，给出最直观的几何解释（[`ch39-joint-zero-light-subspaces.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-joint-zero-light-subspaces.py)）：即使给十九个站点各自任选一个对角相位来对齐，均匀输入的荷 $1$ 轻态落入另一荷**重空间**的概率仍分别超过 **$38.321\%$** 与 **$37.290\%$**；即使进一步允许任意重排十九个站点，两者仍分别超过 **$31.060\%$** 与 **$31.097\%$**！不同超荷的轻子空间在站点基中天生大幅错开，这正是单希格斯与朴素站点局域汤川必然受挫的几何根源。

## 8.3 有理凯莱折叠、格拉姆幺正扩张与四步牛顿逼近 {#sec-ch08-cayley-folding}

要把味矩阵从离散球壳的有限维线性代数稳健地压缩进低能质量与混合算子，我们需要两块毫无浮点漂移的代数基石：一是用有理向量生成精确三维正交旋转的**凯莱—伴随桥梁**，二是把两个具有相同厄米格拉姆矩阵 $B^* B = A^* A$ 的味张量严格联系起来的**左幺正扩张定理**。这两块基石均已由 Lean 内核直接冻结验证：

::: {.theorem #thm-ou-ch08-cayley-orthogonal title="三维有理凯莱变换的正交性与四元数伴随同态律" lean="D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.cayley_orthogonal D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.ad_hom"}
在 `OmegaCayleyRotation` 中，记 `Cayley s` 为有理三维向量 `s : RatVec3` 诱导的三阶有理凯莱旋转矩阵，记 `Ad p` 为非零四元数 `p : Quaternion` 在 `RatVec3` 上的有理伴随旋转作用。则以下两条精确恒等式同时成立：

1. **有理凯莱正交性**（`cayley_orthogonal`）：对任意 `s : RatVec3`，在 `RatMat3.Equiv` 下恒有

   $$
   \operatorname{Cayley}(s)^\top \operatorname{Cayley}(s) \;\equiv\; I_3.
   $$

2. **伴随作用乘法同态**（`ad_hom`）：对任意非零四元数 `p, q : Quaternion` 与任意向量 `v : RatVec3`，在 `RatVec3.Equiv` 下恒有

   $$
   \operatorname{Ad}(p q)(v) \;\equiv\; \operatorname{Ad}(p)\bigl(\operatorname{Ad}(q)(v)\bigr).
   $$

:::

::: {.proof}
第一条直接展开 `Cayley s` 的去分母有理分子矩阵与公分母 $1 + s_1^2 + s_2^2 + s_3^2$，逐元核对乘积 $\operatorname{Cayley}(s)^\top \operatorname{Cayley}(s)$ 的九个有理矩阵元：对角三元交叉相乘后恒等于公分母平方，非对角六元恒归零，由多项式环恒等式直接闭合。第二条利用四元数乘法的结合律与共轭反同态性 $\overline{pq} = \bar{q}\bar{p}$，配合四平方模方的乘法性 $\|pq\|^2 = \|p\|^2 \|q\|^2$，在有理等价意义下约去非零范数因子，把 $\operatorname{Ad}(pq)(v)$ 化归为嵌套伴随作用 $\operatorname{Ad}(p)(\operatorname{Ad}(q)(v))$。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ou-ch08-gram-unitary title="复格拉姆矩阵相等下的左幺正扩张定理" lean="D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq"}
设 $m$ 为有限可判定指标集、$n$ 为有限指标集，设复矩阵 $A, B \in M_{m \times n}(\mathbb{C})$ 具有完全相同的厄米格拉姆矩阵：

$$
B^* B = A^* A.
$$

则存在幺正矩阵 $U \in \mathrm{U}(m, \mathbb{C})$，使得

$$
B = U A.
$$

:::

::: {.proof}
条件 $B^* B = A^* A$ 表明线性映射 $A x \mapsto B x$ 在像空间 $\operatorname{ran}(A) \subseteq \mathbb{C}^m$ 上良定义且精确保内积（因为 $\|B x\|^2 = \langle x, B^* B x\rangle = \langle x, A^* A x\rangle = \|A x\|^2$，特别地 $\ker(A) = \ker(B)$）。因此它在 $\operatorname{ran}(A)$ 与 $\operatorname{ran}(B)$ 之间诱发等距同构，两者具有相同复维数，其正交补 $\operatorname{ran}(A)^\perp$ 与 $\operatorname{ran}(B)^\perp$ 亦具有相同复维数。在两正交补上各自选取标准正交基并将其一一对应，即得 $\mathbb{C}^m$ 上保内积的全体线性扩张 $U \in \mathrm{U}(m, \mathbb{C})$，满足对一切 $x$ 皆有 $U(A x) = B x$，亦即 $B = U A$。完整证明由 Lean 内核检查。
:::

[@thm-ou-ch08-cayley-orthogonal] 与 [@thm-ou-ch08-gram-unitary] 把“酉折叠”的边界刻画得纤毫毕现（[`ch39-unitary-fold-dilation.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-unitary-fold-dilation.py)、[`ch39-finite-rational-fold-accuracy.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-finite-rational-fold-accuracy.py)）：

- **跨零希格斯的严格酉折叠维数底线**：仅在电弱破缺点处做九十度酉折叠以压缩出三代带电质量，两侧已各至少需要 **$42$ 维**（配齐左手弱双重态则需 **$48$ 维**）。一旦要求严格酉折叠从破缺点平滑延拓到**零希格斯背景**（$H = 0$），每侧最小维数立刻抬升至 **$45$ 维**，且取等必须由对侧辅助空间容纳物理规范表示；同时，有限次数有理酉矩阵的物理子块会受到可在有限有理点直接检出的次数障碍，且若顶质量饱和折叠上限，光滑径向顶角必然归零。
- **四步有理牛顿折叠的高精度救赎**：放弃一步线性硬折，改在奇异值至多为 $4/5$ 的收缩窗内执行**四步有理牛顿迭代**，可在整个收缩窗内严格保持折叠酉性，同时把线性质量逼近误差压至 **$4^{-16}$** 以内、把任意方向的 Frobenius 导数误差压在扰动范数的 $2.03 \times 10^{-8}$ 倍以下，并在 #22027 与 #28325 两枚实零点上精确保留全部四项夸克混合读数！但代价同样可被对撞机直接证伪：若把严格有理凯莱折叠的质量斜率分支与[第六章](ch06-higgs-portals-and-electroweak-scale.md)的最少顶色六维标量伙伴联立，在全部 $26$ 种分配及五个轻夸克的任意斜率符号下，最低阶胶子融合相对顶夸克伴随产生（$gg \to H$ 比 $t\bar{t}H$）的归一率比严格大于标准模型值的 **$2.91467$ 倍**。

## 8.4 正向夸克混合重构、最小定向耦合与跨零点刚性 {#sec-ch08-ckm-reconstructions}

在排清了五类朴素禁行路线之后，十九点球壳的弧相位与边界端口究竟能走多远？四组精确的正向构造给出了清晰回答，同时也顺手量出了跨零点刚性的极限尺度。

### 8.4.1 六面电弱单态、二十八圈镜像三角与跨七零点有理响应

1. **六面电弱单态味标量与跨零点移用**：用含双钟的最短第三边六个三角形的平均和乐实部作为真空参数，引入一支电弱单态味标量并配以六次实势，即可通过 $\mathbb{Z}_3$ 破缺产生相互隔离的共轭 CP 破坏真空（[`ch39-chiral-neutral-flavor-phase.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-chiral-neutral-flavor-phase.py)）。在 **#11661** 的指定基底上用实系数标定夸克矩阵后，**完全冻结这些系数**直接移用到其他三窗零点，留出读数依次给出：
   - **#11934**：$|V_{ub}| \approx 0.001943$；
   - **#12207**：$|V_{ub}| \approx 0.004011$；
   - **#28325**：$|V_{ub}| \approx 0.003669$（且该零点同步给出两圈 $\alpha_s \approx 0.11838$ 与四层曲率比 $0.999411$）；
   - **#8359**：$|V_{ub}| \approx 0.002873$（比参考低 $23.026\%$）。

   为何坚持用电弱单态而非第二个电弱希格斯双重态提供额外轮换特征标？因为在 $125.25\,\mathrm{GeV}$ 实增一个复弱双重态（即便其新汤川为零、仅计规范负载），就会把 #11661、#11934、#12207 三枚候选的两圈反推强耦合 $\alpha_s(M_Z)$ 统统顶高到 **$0.1251$ 以上**，直接击穿第一问的规范交汇窗口！
2. **二十八圈镜像三角对照四十二圈基线**：若允许任意实正交味旋转，仅借不同零点之间的夸克三角闭路提供复 CP 相位，则原五枚候选的基线三角恰需 **$42$ 圈**才能重建参考 CKM（$41$ 圈的四元乘积相角至多 $1.115814$ 弧度，不及参考值 $1.139034$ 弧度）。换用**镜像候选三角 $(28325, 48067, 58214)$**，最少圈数锐降至恰为 **$28$ 圈**；更可贵的是，#48067 与 #58214 同样满足分界 $9$ 的五荷三模、两圈强耦合窗（分别约 $0.11844$、$0.11833$）与千分之二曲率窗，固定味校准下的 $|V_{ub}|$ 分别约 $0.00205$ 与 $0.00460$。
3. **两边界站点五次脉冲与跨七零点的有限有理响应 $(I + T^{16})^{-1}$**：利用荷一轻谱投影选通味平面并施以凯莱旋转（呼应 [@thm-ou-ch08-cayley-orthogonal]），任何单个固定站点的实强度脉冲序列永远只给 $J = 0$。但一旦取**两条边界射线的端点**，在 #28325 上仅用**五次校准脉冲**即可精确重建完整参考 CKM，同一组强度直接移至 #48067 与 #58214 分别给出 $|V_{ub}| \approx 0.003799$ 与 $0.003746$（跨七枚已核对零点，即使首尾任选站点并放宽目标角窗，首尾脉冲强度之比仍必超 $1.0548$）。进一步把离散脉冲提升为纯由原壳边与三个边界站点写出的**有限有理壳响应**：令 $T = \frac{3}{4} L_n (L_n - cI)$ 并取响应算子

   $$
   R_n := \bigl(I + T^{16}\bigr)^{-1},
   $$

   固定在 #28325 上校准的一组有理强度，便能在**全部七枚三窗零点**上把理想夸克混合门的轻块逼近到 **$10^{-11}$** 以内，同时将三轻态等权输入漏入重空间的概率死死压在 **$1.70 \times 10^{-30}$** 以下！
4. **固定厄米壳作用的最小定向耦合下界 $0.03010$**：若试图用一个固定的、保持径向向量不动的厄米作用直接生成味方向，将其反对称定向项写作 $\lambda\, i[\Pi_1, \Pi_2]$（其中 $\Pi_1, \Pi_2$ 为两条原钟边单位法向的投影），则书中整个 CKM 参数盒——在允许任意实对称部分、任意上下质量基重定相位与任意对数分支下——全部强迫

   $$
   |\lambda| \;>\; 0.03010,
   $$

   精确取中心 CKM 时的可达最小值落在 $(0.03898381516, 0.03898381517)$。这彻底排除了任何纯实对称的固定壳作用，证明时间反演／定向破缺的虚部对易子必不可少。

下表并列总结上述四类正向夸克混合重构及其各自所需的校准与结构界限：

| 正向重构协议 | 相位 / 旋转驱动源 | 核心精度与跨零点读数 | 仍需外加的校准或硬性门槛 |
| :--- | :--- | :--- | :--- |
| 六面电弱单态相位 | 六个最短第三边双钟三角平均和乐 + 六次实势 | #11661 标定移至 #11934 / #12207 / #28325 给 $|V_{ub}| \approx 0.00194 / 0.00401 / 0.00367$ | 须用电弱单态（第二弱双重态把 $\alpha_s$ 推过 $0.1251$）；味系数由 #11661 校准 |
| 镜像三角绕数闭路 | 候选三角 $(28325, 48067, 58214)$ + 任意实味旋转 | 重建参考 CKM 恰需 **$28$ 圈**（原五枚基线恰需 **$42$ 圈**） | 实旋转按参考 CKM 选取；物理回路选路律待解 |
| 两边界站点五次脉冲 | 荷一轻投影选通 + 两条边界射线端点凯莱脉冲 | #28325 五脉冲重建 CKM，移用至 #48067 / #58214 给 $|V_{ub}| \approx 0.00380 / 0.00375$ | 单站点恒给 $J = 0$；跨七零点首尾强度不对称度 $> 1.0548$ |
| 有限有理壳响应 | $(I + T^{16})^{-1}$，$T = \tfrac{3}{4}L_n(L_n - cI)$，三边界站 | 跨**全部七零点**匹配理想 CKM 轻块至 **$10^{-11}$**，入重泄漏 **$< 1.70 \times 10^{-30}$** | 有理强度固定于 #28325 校准；固定厄米作用须满足 $|\lambda| > 0.03010$ |

### 8.4.2 跨零点固定矩阵刚性阶梯

为什么上述跨七枚零点成功的混合门必须写成**依赖零点背景的谱函数** $(I + T^{16})^{-1}$，而绝不能是一张跨零点恒定不变的 $19 \times 19$ 矩阵？下面这份刚性阶梯给出了精确到整数枚数的终极答案（[`ch39-common-local-rigidity.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-common-local-rigidity.py)、[`ch39-covariant-edge-weight-rigidity.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-covariant-edge-weight-rigidity.py)）：

::: {.remark #rem-ou-ch08-rigidity-ladder title="跨零点刚性阶梯：从两枚零点到五枚与七枚的代数坍缩"}
| 共享零点数量与集合 | 允许的矩阵或动力学类 | 强制坍缩的唯一代数结论 | 最小性注记 |
| :--- | :--- | :--- | :--- |
| **$2$ 枚**（#28325 配 #22027 / #48067 / #58214） | 固定 $19 \times 19$ 酉矩阵保轻空间 | **禁止代际混合**（固定 #28325 CKM 在 #48067 必留 $\ge 6.94 \times 10^{-9}$ 入重泄漏） | 跨零点共享静态酉门即刻失效 |
| **$2$ 枚**（#28325, #48067） | 边相位随零点变、共享站点势与边磁动能系数 | 唯一作用族为 **$a I + b L_n$** | 含独立有向边电流时最小数为 **$5$ 枚** |
| **$5$ 枚**（`28325, 48067, 58214, 22027, 11661`） | 沿原壳边作用的固定局域生成元 | 全部坍缩为**单位矩阵标量倍 $\mathbb{C}I$** | 任取 $4$ 枚仍留一枚非标量局域候选 |
| **$7$ 枚**（再加 `11934, 12207`） | 放开距离的任意全站点固定矩阵 | 全部坍缩为**坐标轮换 $P$ 的二次多项式** | $7$ 为精确最小数 |
:::

这张刚性表把所有侥幸心理一扫而空：只要物理规律跨越多枚候选零点保持轻重分离，任何静态矩阵都会迅速坍缩为平凡标量或循环多项式；真正能携带夸克混合而不泄入重空间的统一法则，必然是随背景联络协变演化的谱算子。

::: {.film src="folding-the-mixing-matrix"}
**轮换锁死混合、证书筑起禁行墙，有理凯莱旋转与格拉姆幺正扩张给出精确的折叠工具，而共同的味作用律仍然开放（2 分 42 秒）。** 青色的十九个整点沿 $(1, 1, 1)$ 轴俯视，在坐标轮换下绕琥珀色极点 $(17, 17, 17)$ 转过三分之一圈、分成六条三点轨道（屏幕计算）；若 $H_u, H_d$ 都与 $T$ 对易，$|V_{\mathrm{CKM}}|$ 的方格只剩置换图样（紫色，书面论证）。三个单位立方根之间的弦长 $\sqrt{3}$ 与 $0.035 \times 0.98 = 0.0343$ 在屏幕上算出，品红的近对称区被 $0.0414$ 的下界排除（[@ex-ou-ch08-commutator-floor]，手算论证）。同一把对数标尺上，青色可达区与品红缺口对照 8.2 节区间证书给出的禁行界（`NUM`）。取 $s = (1/3, 2/3, 2/3)$，凯莱旋转是一张九分之几的矩阵，每行长度为一；绿色标签对应 [@thm-ou-ch08-cayley-orthogonal] 的正交性与四元数伴随同态律。两组列向量共用格拉姆矩阵 $\begin{pmatrix} 4 & 2 \\ 2 & 5 \end{pmatrix}$，紫色弧 $U$ 把一组转到另一组，绿色标签对应 [@thm-ou-ch08-gram-unitary]；折叠维数下界、二十八圈镜像三角、在 #28325 上校准（琥珀色）的 $(I + T^{16})^{-1}$ 与两枚、五枚、七枚零点的刚性阶梯均为复算证书（[@rem-ou-ch08-rigidity-ladder]）；红色的结尾对应开放问题 [@prob-ou-ch08-common-flavor-law]。
:::

::: {.problem #prob-ou-ch08-common-flavor-law title="第三问味侧未解边界：从同一弧作用律导出味谱、轻子混合与无校准混合门"}
本章完成了对十九点球壳味机制的系统清障与正向测绘：确立了 $\max_{X\in\{A,B\}}\|[T,X]\|_{\mathrm{HS}}>0.0428$ 的轮换破缺下界、五类朴素汤川层级的精确禁行界、四步有理牛顿折叠（$4^{-16}$ 精度）、$|\lambda| > 0.03010$ 的定向耦合下界、五／七零点跨背景刚性，以及跨七零点精确至 $10^{-11}$ 的有限有理响应 $(I + T^{16})^{-1}$。但两大核心环节依然开放：

1. **共同味作用律的缺失**：所有成功的 CKM 重构（六面单态、二十八圈镜像三角、五次边界脉冲与 $(I + T^{16})^{-1}$）所用的味系数、实旋转或脉冲强度仍由参考混合校准，尚未从球壳配分函数第一性原理推演而出。
2. **完整轻子谱与统一折叠**：在同一低维无反噬折叠算子下，如何不引发 $m_u/m_\ell$ 坍缩与 $10^{34}\,\mathrm{GeV}^2$ 重块四次迹反噬，同步导出全部夸克、带电轻子、中微子质量与 PMNS 混合，仍待解答。
:::

味谱的门槛已经量清，但第三问还有另一半更加古老、更加致命的拷问悬在头顶：把夸克与轻子写进同一套大统一账本之后，**质子到底会不会衰变？** 下一章我们将直视六维 $QQQL$ 算符，看看重子三重对称究竟如何保住质子、又在李代数与离散反常上索要怎样的代价。
