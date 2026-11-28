# 第七章 共同谱隙、站点方差分界与四维格点手征三代 {#sec-ch07}

> “数出三个低本征值，只是听见了三声回响；造出四维手征外尔测度，才算替宇宙安上了不可逆的心脏。”

在第二卷中，十九点贝伦德球壳的重模塔决定了规范耦合的跑动、双尺度配平与希格斯门户的秩五下界。现在视线翻过谱隙，落到低能端——直面统一总账的第二问：**为什么轻费米子恰有三代，而且在四维时空中只保留标准模型所需的手征？**

这是整个研究计划中最容易产生幻觉、也最考验诚实尺度的关口。人们往往把“内部有限图上出现三个低模”直接当成“三代手征费米子已经导出”。实则二者之间隔着三道深沟：第一，十九点壳上的五种超荷磁拉普拉斯为何恰好切出三模而非一模或十五模，切口究竟是人为数字还是球壳内禀不变量；第二，有限图上的正本征值绝不是四维手征外尔费米子，它必须经由单侧边界伙伴或四维格点重叠核升维，并在微扰与味色散阶上经受检验；第三，真正致命的考验不在平直背景而在粗糙规范场——一旦放开完整四维规范路径积分，手征行列式线上的中心反常与 Cartan 荷会无情击穿粗糙背景，迫使我们量清到底需要几份正交希格斯标架才能守住谱隙，以及非微扰的十二费米子电弱瞬子顶点究竟活不活着。

本章把这三道深沟逐一丈量到底，并将 Lean 内核冻结定理、精确区间证书与尚未闭合的动力学问题彻底划清。

## 7.1 五荷壳谱隙、站点方差分界与特征标正交底座 {#sec-ch07-spectral-gap}

沿用[第一章](ch01-behrend-shell-and-frequencies.md)与[第四章](ch04-gauge-crossings-and-monotone-barriers.md)的几何设定：十九点贝伦德球壳有 $135$ 条定向边、两条原生钟弦平方长 $d = 724, 804$ 驱动的两只相位时钟，以及三条连接极点 $(17,17,17)$ 的软化辐边（边权 $1 - \delta$，其余边权为 $1$，其中 $\delta > 0$ 为随黎曼零点高度衰减的正辐边亏额）。标准模型一代手征物质的五种有符号超荷表示为 $Q, d^c, L, u^c, e^c$，在整数归一化 $6Y$ 下对应五组有符号荷 $q \in \{1, 2, -3, -4, 6\}$（因 $L_{-q} = \overline{L_q}$，其谱仅依赖绝对荷 $|q| \in \{1, 2, 3, 4, 6\}$）。

::: {.definition #def-ou-ch07-site-variance-cut title="五荷磁拉普拉斯、站点方差分界与三循环特征标分解"}
设 $L_0$ 为十九点贝伦德球壳的中性加权图拉普拉斯算子，边权为 $w_{uv} > 0$；对五种超荷 $q \in \{1, 2, -3, -4, 6\}$，记 $L_q$ 为将弧相位 $u_{uv}^q$ 装入各边后得到的 $19 \times 19$ 厄米磁拉普拉斯算子，令均值中心 $c := \operatorname{tr}(L_0)/18$，并定义两步无量纲质量算子

$$
D_q := L_q(L_q - cI), \qquad h_{q,j} := \bigl|\lambda_j(L_q)\bigl(\lambda_j(L_q) - c\bigr)\bigr|.
$$

在此算子族上并列两套轻重分界口径：

1. **固定数字分界**：以统一无量纲常数 $9$ 截断低谱（轻模记作满足 $h_{q,j} < 9$ 或单步谱 $\lambda_j(L_q) < 9$ 的模式）。
2. **内禀最小割（站点方差分界）**：对球壳全部非平凡二分计算跨界边权平方和，其最小值等价于中性拉普拉斯在单站点态 $|v\rangle$ 上的最小方差，

   $$
   T := \min_v \Bigl(\langle v|L_0^2|v\rangle - \langle v|L_0|v\rangle^2\Bigr) = \min_v \sum_{u \sim v} w_{uv}^2 = 9 + (1 - \delta)^2.
   $$

此外，空间三坐标的循环置换 $P : (x, y, z) \mapsto (y, z, x)$ 保持球壳顶点、边权与定向输运相位，从而与每个 $L_q$ 对易；记 $\omega := e^{2\pi i/3}$，每个十九维荷扇区随之正交分解为三条循环特征标子空间 $(1, \omega, \omega^2)$。
:::

### 7.1.1 全双钟环面的一致谱隙与特征标正交性

这套分解的第一个惊人之处，是低端谱隙对时钟相位的彻底不敏感性。为何无论两只黎曼零点时钟转到环面上的哪个角落，五种荷的第三与第四本征值都绝不相撞？直觉上只需做一个“剪枝手术”：把两类钟边汇入的三处内站（编号 $6, 7, 8$）暂时删去，剩下的 $16 \times 16$ 主块 $D$ 完全不依赖两只钟的相位！经全域区间舒尔补认证（[`ch39-all-zero-three-mode-gap.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-all-zero-three-mode-gap.py)），在 $\delta = 0$ 时五种荷的主块均满足 $\lambda_3(D) < 8.685 < 9.6001 < \lambda_4(D)$；由柯西特征值交错定理，完整 $19 \times 19$ 矩阵的第三特征值立刻被死死压在 $8.685$ 以下。

接着在能量 $t = 9.6001$ 对 $D - tI$ 做舒尔消元，三站点上的补块 $C - tI - B^*(D - tI)^{-1}B$ 因循环对称而在 $(1, \omega, \omega^2)$ 特征标基中彻底对角化为十五个标量——每个都是一个实常数加上 $u, v, \bar{u}v$ 及其共轭的三角谐波。检验全部十五个标量，常数项减两倍谐波系数绝对值之和均大于 $0.04$；计入三条软化辐边引入的负半定扰动（范数至多 $6\delta$，覆盖全部正零点所满足的 $\delta \in (0, (23/25)2^{-20}/14^2) \subset [0, 10^{-8}]$），便得到覆盖**整张双钟环面与全部正黎曼零点**的统一谱隙：

$$
\lambda_3(L_q) < 8.685 \;<\; 9 \;<\; 9.6 < \lambda_4(L_q) \qquad (\forall\, q \in \{1, 2, -3, -4, 6\}),
$$

且三个循环特征标 $(1, \omega, \omega^2)$ 在截断以下永远各占严格一模——即重数恒为 $(1, 1, 1)$，绝不随零点高度翻越边界。

固定荷、两钟相位和软化参数后，要确定轻带中的一个态，最少需要读取三个站位的复振幅。任取两个坐标，三维轻带中总有非零态在这两处同时为零。在中央正零点（编号 $2\,306\,888\,100\,085$）比较第三枢轴末端口所选八站内的三站组合，得到三站组 $S=\{0,3,5\}$。在上述五种荷、整个双钟相位环面和允许的软化范围内，每个归一化轻态在 $S$ 上的振幅向量范数都大于 $0.29747$，即坐标限制的最小奇异值大于 $0.29747$。这三个站位经过候选比较选定，由作用量选出它们仍是开放问题。

即使让三条辐边各自取亏额 $0\le d_j\le D=10^{-8}$，这组三站仍有同样的读数下界（手工推导）。每卸去一条辐边的部分权重，都是减去一个半正定算子。因此 $H(D,D,D)\preceq H(d_1,d_2,d_3)\preceq H(0,0,0)$，两端的谱界将第三级压在 $8.685$ 以下，把第四级托在 $9.6$ 以上。从共同亏额 $D/2$ 出发，算子的改变量在二次型意义下夹在 $\pm(D/2)K$ 之间，其中三辐边星图的拉普拉斯算子 $K$ 的范数为 $4$。沿线段对轻带投影求导，其轻重带之间的块满足 Sylvester 方程，故投影和三站最小奇异值的改变量都至多为 $2D/(9.6-8.685)$。等亏额证书把下界按百万分之一向下取整仍至少为 $297471$，扣除这项误差后，$\{0,3,5\}$ 的下界仍大于 $0.29747$。[整数下界](https://github.com/the-omega-institute/trureturing-experiments/blob/cb58c8e64ecea67184e0c1d68a690be098a7a384/experiments/ch39-omega-research/replay/ch39-terminal-port-trial-energy.py#L94-L98) · [Sylvester 算子范数界](lean:D5/S3/HilbertOperators/DavisKahanProjector.opNorm_le_div_of_comp_sub_comp_eq)

这里用于消元的三条边界射线首站 $\{6,7,8\}$ 所起的作用不同。对每种荷和每个固定的允许软化参数，环面上都有一个相位背景，使某个非零轻态在这三站同时消失。固定 $\varepsilon>0$。在零软化下，轻带的谱隙保证连续性。每个盲点周围都有一个开方格，其中最小奇异值低于 $\varepsilon/2$。将方格取得足够小，软化量充分小时整个方格仍低于 $\varepsilon$。径向软化量随高度趋于零，因而双钟的无条件等分布给出各荷在任意 $\varepsilon>0$ 下的正下密度，正零点按重数计。对 $0<\varepsilon\le1$，所引证书给出下界 $(\varepsilon/(5\pi))^2$。[三站读取的区间界](https://github.com/the-omega-institute/trureturing-experiments/blob/cb58c8e64ecea67184e0c1d68a690be098a7a384/experiments/ch39-omega-research/replay/ch39-terminal-port-trial-energy.py) · [实际零点上的下密度](https://github.com/the-omega-institute/trureturing-experiments/blob/4c6373343aac016bf533de5bbb2ee3ff3da2bdc6/experiments/ch39-omega-research/replay/%E4%B8%89%E4%B8%AA%E7%AB%99%E4%BD%8D%E8%AF%BB%E5%8F%96%E4%BA%94%E8%8D%B7%E8%BD%BB%E5%B8%A6%E7%9A%84%E4%B8%8B%E7%95%8C%E4%B8%8E%E4%B8%89%E6%9D%A1%E5%8E%9F%E7%94%9F%E5%B0%84%E7%BA%BF%E9%A6%96%E7%AB%99%E7%9A%84%E7%9B%B2%E7%82%B9.md) · [三射线的不可见轻态](https://github.com/the-omega-institute/trureturing-experiments/blob/cb58c8e64ecea67184e0c1d68a690be098a7a384/experiments/ch39-omega-research/replay/ch39-first-ray-light-zeros.py)

现在让五种荷共用同一对物理钟。固定 $0\leq\delta\leq10^{-8}$ 时，对每种荷 $q$，三条射线首站只在两个**有效**相位对失去一个秩。物理钟角 $(a,b)$ 通过 $(qa,qb)$ 进入算子，每个有效相位对在物理环面上有 $q^2$ 个原像。对于 $q=1,-4,2,-3,6$，盲点数依次为 $2,32,8,18,72$，而这五个集合两两不交。因而在任何共同背景下，至少四种荷的每个轻态都由这三站的振幅唯一确定。

固定两钟后，还可以从本征值直接读出每条轻线在三站留下多少振幅（`ARGUED`）。在三个首站上作单位 Fourier 变换，每个特征标 $k=0,1,2$ 的读数沿各自的单位向量 $e_k$，把 $e_k$ 在站外补零。记 $H_k$ 为该特征标的磁拉普拉斯块，$u_k$ 为其归一化轻态，$\lambda_k$ 为相应的单本征值。三个输出方向正交，所以三站限制的三个奇异值正是 $s_k=|\langle e_k,u_k\rangle|$。沿 $e_k$ 删去一行一列得到 $D_k$。令 $p_k(z)=\det(zI-H_k)$、$d_k(z)=\det(zI-D_k)$，则

$$
s_k^2=\frac{d_k(\lambda_k)}{p'_k(\lambda_k)}.
$$

余子式公式给出预解式在 $e_k$ 上的对角元 $d_k(z)/p_k(z)$。按本征向量展开，同一对角元在 $\lambda_k$ 的留数是 $s_k^2$。由于 $p'_k(\lambda_k)\ne0$，分子为零恰好表示该线不可见，此时预解式的这个对角元在该点可去。三站的秩等于 $d_k(\lambda_k)\ne0$ 的特征标个数，即使不同特征标的轻本征值重合也可逐块判定。[Denton、Parke、Tao 与 Zhang，*Eigenvectors from eigenvalues: A survey of a basic identity in linear algebra*（2022），定理 1](https://doi.org/10.1090/bull/1722)

要在整个环面上数尽失秩点，只须考察删点块的最低态。若最低态在这里消失，变分原理迫使其余坐标组成删点块的最低本征向量。十五个块的这条本征线都由能隙隔离，能量都低于 $8.685$。将向量补零后只须满足剩下的边界行 $A+B e^{-iqa}+C e^{-iqb}=0$。每种荷只有一个特征标允许这三项闭合成三角形，两种朝向给出全部解。对每一对不同的荷，第一只物理钟已经将两组解分开。[全部盲点的区间枚举](https://github.com/the-omega-institute/trureturing-experiments/blob/0552844d61bd96ceae35e463e603d92d0cd01219/experiments/ch39-omega-research/replay/ch39-common-ray-blind-clocks.md)

若三辐边稍有不均，三条射线首站仍会同时看漏一个轻态（手工推导）。固定平均亏额 $\bar d$，写 $d_j=\bar d+h_j$，其中 $\sum_j h_j=0$。在等亏额盲点 $\theta_0$ 取轻带正交标架 $V$，令 $P$ 为随钟角和亏额变化的轻带投影，$R$ 为三首站的坐标限制。附近的 $PV$ 仍张成轻带，所以只须解一个复方程 $\det(RPV)=0$。在等亏额点，恰有一个特征标振幅为零，上述非退化三角形使这个方程对两钟角的实雅可比可逆。于是附近恰有一个秩二盲点 $\theta(h)$。轮换三条辐边只会轮换输出，盲点的位置相同。在零和偏差平面上，这个轮换是 $120^\circ$ 旋转，故钟角位移的一次项为零，二次项只能是 $v\sum_j h_j^2$，其中二分量向量 $v$ 由盲点决定。在原钟角上，最小奇异值也至多为 $O(\|h\|_2^2)$。由紧性，充分小的不均保留五种荷各自的盲点数及其两两分离性。覆盖整个亏额立方体的盲点计数仍待确定。[推导与十九站复算](https://github.com/the-omega-institute/trureturing-books/issues/1679#issuecomment-7239377312)

这些孤立的盲点还决定了实际读数能以多高的频率接近零。记 $\sigma_q$ 为三站限制的最小奇异值，在正黎曼零点上按重数计数。固定一个充分小的阈值 $\varepsilon>0$，先让计数高度趋于无穷。由上述双钟等分布与辐边软化趋零，$\sigma_q<\varepsilon$ 的极限比例等于零软化环面上的归一化面积。再令 $\varepsilon\downarrow0$，这个面积为 $C_q\varepsilon^2+O(\varepsilon^4)$。按上面的荷顺序，$C_q$ 约为 $25.99279,17.37426,26.16959,12.59218,14.28552$。每个盲点处，边界复振幅对两个钟角的实雅可比可逆，半径 $\varepsilon$ 的振幅圆盘因此在钟面上截出面积为二阶的邻域。五种荷的这些邻域在充分小的阈值下仍两两不交，故至少一荷近盲的二次项系数约为 $96.41434$。精确失秩的正零点集由此具有自然密度零。[面积系数的推导和复算](https://github.com/the-omega-institute/trureturing-experiments/blob/408bafb236c0918d30571356d15798d2cd21a511/experiments/ch39-omega-research/replay/ch39-ray-near-blind-density.md)

::: {.theorem #thm-ou-ch07-two-clock-frequency-separation title="双钟频率的显式分离" lean="D5/S3/Fourier/Asymptotics/TwoClockFrequencySeparation.frequency_separation"}
令 $\theta_d=\arccos(1-d/1734)$，$a=\theta_{724}-\theta_{244}$，$b=\theta_{804}-\theta_{244}$。对任意不同时为零的整数 $m,n$，令 $M=\max(|m|,|n|)$，则
$$
|ma+nb|\ge \frac{1}{128\cdot 1734^{32M}}.
$$
:::

三个相位所在的共同数域次数至多为八。独立共轭能单独反转任一相位，而三个相位的有理迹均非整数，使它们各自具有无限阶。非零模式的相位积因此异于一。用 $1734$ 清除各相位和逆相位的分母后，非零代数整数的范数给出显式下界。

::: {.theorem #thm-ou-ch07-zeta-ordinate-reflection title="零点和的反射抵消" lean="D5/S3/Weil/ZeroData/ZetaOrdinateReflectionTransfer.actual_reflection_bound"}
令 $\rho=\beta+i\gamma$ 遍历互异的非平凡零点，$m_\rho$ 为解析重数。任取实数 $v,T$，记 $d_\rho=|v(\beta-1/2)|$。则

$$
\left|\sum_{0<\gamma\le T}m_\rho e^{v(\rho-1/2)}
      -\sum_{0<\gamma\le T}m_\rho e^{iv\gamma}\right|
\le \sum_{0<\gamma\le T}m_\rho\,d_\rho^2e^{d_\rho}.
$$
:::

::: proof
映射 $\rho\mapsto1-\bar\rho$ 保持高度与重数，并把实部偏移反号。将原求和与反射重排后的求和取平均，指数展开的一次项相消，剩下的二阶余项给出上界。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ou-ch07-zeta-density-transfer title="由右半条带计数控制纵坐标和" lean="D5/S3/Weil/ZeroData/ZetaOrdinateDensityTransfer.actual_reflection_bound_of_exponential_tail"}
沿用上面的零点和重数。设 $r>0$，对每个 $t>0$，在 $0<\gamma\le T$ 的零点中，满足 $\beta\ge1/2+t$ 的带重数计数至多为 $Ae^{-rt}$。若实频率 $v$ 满足 $|v|\le r/4$，则

$$
\left|\sum_{0<\gamma\le T}m_\rho e^{v(\rho-1/2)}
      -\sum_{0<\gamma\le T}m_\rho e^{iv\gamma}\right|
\le 64A(v/r)^2.
$$
:::

::: proof
同高反射把左尾的计数化为右尾计数。记 $D=|\beta-1/2|$。沿距离积分，得到 $e^{rD/2}-1$ 的带重数总和至多为 $2A$。指数级数给出 $D^2e^{|v|D}\le(32/r^2)(e^{rD/2}-1)$，代回反射定理即得上界。完整证明由 Lean 内核检查。
:::

取 $L=\log T$。Selberg 的零点密度界给出 $r=L/4$ 和 $A=O(TL)$。将这两个参数代入传递定理，在 $|v|\le L/16$ 内得到 $O(Tv^2/L)$ 的误差。 [Ford–Zaharescu，引理 2](https://arxiv.org/abs/math/0405459v2)

**随高度缩小的阈值（`ARGUED`）。** 若 $\varepsilon(T)\to0$ 且 $\varepsilon(T)\sqrt L\to\infty$，那么在模型的五种荷中，每种荷的近盲零点比例均为 $C_q\varepsilon(T)^2+o(\varepsilon(T)^2)$，仍按重数计数。取 $J=\lfloor L/[128(1+\pi+\log1734)]\rfloor$。对 $0<\|m\|_\infty\le J$，双钟频率 $v=m_1a+m_2b$ 满足 $(128T^{1/4})^{-1}\le |v|\le L/16$。在 Ford–Meng–Zaharescu 引理 1 中取 $x=e^{|v|}$，最近素数幂主项除以 $\sqrt{x}$ 后为 $O(T)$。其余项为 $O(T^{1/32}L^2+T^{1/4}L)=o(T)$。负频率的纵坐标和是正频率的复共轭。结合上述传递界和 $N(T)\asymp TL$，标准化纵坐标和为 $O(L^{-1}+\|m\|_\infty^2L^{-2})$。 [零点和估计](https://arxiv.org/abs/1511.06814v2) · [频率截断与归一化](https://github.com/the-omega-institute/trureturing/issues/35082#issuecomment-7236017586)

在每个盲点，取以该点为中心的局部角坐标。设边界振幅在盲点的实雅可比为可逆映射 $A$。给定 $0<\eta<1$，选取 $0<r_-<(1+\eta)^{-1}$ 和 $r_+>(1-\eta)^{-1}$。在固定的局部坐标球内，把位移写成 $\varepsilon u$。对所有足够小的正阈值 $\varepsilon$，两个预先选定的光滑紧支撑函数分别从下、从上夹住振幅模小于 $\varepsilon$ 的指示函数。两窗的平面积分分别至少为 $\pi r_-^2/|\det A|$ 和至多为 $\pi r_+^2/|\det A|$。这里的指示函数在坐标球之外取零。 [局部椭圆的光滑夹逼](lean:D5/S3/Fourier/Asymptotics/PlanarSublevelSandwich.smooth_local_ellipse_sandwich)

将钟角除以 $2\pi$，以 $p_\gamma=(a\gamma,b\gamma)/(2\pi)$ 作为周期一的采样点，并以各零点的重数除以 $N(T)$ 作为权重。若 $f$ 是角坐标中的固定测试函数，换元后用 $u\mapsto f(2\pi u)$，其平面积分正好带来归一化因子 $(2\pi)^{-2}$。把上面的纵坐标和估计代入光滑窗的采样定理，常数项为 $O(L^{-1})$，二次频率项贡献 $O(\varepsilon^{-2}L^{-2})$，超过 $J$ 的尾项为 $O((\varepsilon J)^{-4})$。三项之和为 $o(\varepsilon^2)$。让内外逼近的面积趋于同一椭圆面积即可恢复同一个 $C_q$。这一步使用上面的零点和估计与局部雅可比可逆性。 [光滑平面窗的采样定理](lean:D5/S3/Fourier/Asymptotics/PlanarWindowSampling.compact_window_sampling)

固定荷与钟角，轻线随辐边软化能移动多远？写 $H_k(\delta)=H_k(0)-\delta K_k$。三条单位辐边构成一个星图。在极点与三叶均匀单位向量的基下，平凡特征标上的星图块为 $\left(\begin{smallmatrix}3&-\sqrt3\\-\sqrt3&1\end{smallmatrix}\right)$。两个非平凡叶模式在极点相消，各自的本征值为 $1$。其余方向上的星图作用为零，故 $K_k$ 的谱宽依次为 $w_k=4,1,1$。[软化权重的定义](https://github.com/the-omega-institute/trureturing-experiments/blob/cb58c8e64ecea67184e0c1d68a690be098a7a384/experiments/ch39-omega-research/replay/ch39-three-ray-chiral-boundary.py#L34)

取共同谱隙下界 $g=9.6-8.685=183/200$。沿软化区间选取相位使 $\langle u_k,u'_k\rangle=0$，并记 $P_k=u_ku_k^*$。对本征方程求导，得到 $(H_k-\lambda_k I)u'_k=(I-P_k)K_ku_k$。右边可将 $K_k$ 换为 $K_k-w_k I/2$，其范数为 $w_k/2$。在轻线的正交补上，$H_k-\lambda_k I$ 的本征值至少为 $g$，把 $u'_k$ 和右端分别看作一维域上的算子 $X,Y$。分离谱估计 $\|X\|\le\|Y\|/g$ 给出 $\|u'_k\|\le w_k/(2g)$。[Sylvester 算子范数界](lean:D5/S3/HilbertOperators/DavisKahanProjector.opNorm_le_div_of_comp_sub_comp_eq)

对单位向量 $e_k$ 取内积再积分，在任意 $0\le\delta_0,\delta_1\le10^{-8}$ 下都有

$$
|s_k(\delta_1)-s_k(\delta_0)|\le\frac{w_k}{2g}|\delta_1-\delta_0|.
$$

因此三站最小奇异值的改变量至多为 $(400/183)|\delta_1-\delta_0|$。盲点枚举还表明每种荷只有一个可能不可见的特征标，且它非平凡。只要这条轻线的 $s_k(0)>(100/183)10^{-8}$，同一对钟角在整个软化区间都保持三站满秩。模型给出的亏额为 $\delta(\gamma)=O(\gamma^{-2})$。在 $\sqrt T\le\gamma\le T$ 上，读数误差为 $O(T^{-1})=o(\varepsilon(T))$，早期零点的比例则为 $O(T^{-1/2})=o(\varepsilon(T)^2)$。于是用平坦模型的两个相对扰动阈值即可夹住实际计数。

**逆平方阈值下的计数上界（`ARGUED`）。** 对每个固定 $C>0$，在 $0<\gamma\le T$ 的正零点中按重数计数，至少一荷满足 $\sigma_q(\gamma)\le C\gamma^{-2}$ 的零点数至多为 $O_C(T^{1-\eta}\log T)$，其中 $\eta>0$ 只依赖双钟速度。统一谱隙控制软化带来的 $O(\gamma^{-2})$ 读数扰动。再用平坦盲点的可逆雅可比，得到钟相位与某个平坦盲点相距 $O_C(\gamma^{-2})$。在一个二倍高度区间 $[U,2U]$ 固定盲点，以两钟的整数圈数记每次接近。两个读数的圈数差 $(k,\ell)$ 满足 $|k|=O(U)$ 和 $|\alpha k-\ell|=O_C(U^{-2})$，其中 $\alpha$ 是第二钟速度与第一钟速度的比。

以同一次接近为原点，任意两圈数差向量的整数行列式为 $O_C(U^{-1})$，故在足够大的 $U$ 处为零。若有不同的第一钟圈数，差向量都为同一原始整向量 $(d,e)$ 的整数倍，取 $d>0$。两钟的角速度是固定代数旋转的对数除以 $i$，且两个旋转乘法独立。Baker–Wüstholz 的复对数线性型下界给出 $|\alpha d-e|\gg d^{-\tau}$，可取固定 $\tau>2$。因此占用圈数至多为 $1+O_C(\min(U/d,U^{-2}d^\tau))=O_C(U^{1-3/(\tau+1)})$。每圈的高度区间长 $O_C(U^{-2})$，其中至多有 $O(\log U)$ 个带重数的正零点。对有限盲点和二倍高度区间求和即可取 $\eta=3/(\tau+1)$。精确失秩也受此界约束。[Baker–Wüstholz，*Logarithmic forms and group varieties*（1993），第 20 页主定理](https://doi.org/10.1515/crll.1993.442.19) · [圈数计数推导](https://github.com/the-omega-institute/trureturing-books/issues/1687#issuecomment-7233591419)

**有限高度的排除（`CERT`）。** 对原软化模型，Arb 区间计算在整个连续高度段 $14\le t\le14\cdot2^{80}$ 上排除了五种荷的首站精确失秩。先在每个二倍高度区间圈住删除块的最低本征线，求出边界三角方程的全部相位分支，再把双钟同时命中的必要条件化为有理模余数计数。$180$ 位和 $200$ 位两种有理网格均给出零个候选圈数。第一枚正零点高于 $14$，所以该段涵盖截至 $14\cdot2^{80}$ 的全部正零点。更高处的精确命中仍开放。[固定输入版本和两种网格的复算](https://github.com/the-omega-institute/trureturing-experiments/blob/be74a3657a65f06b756d49db4bb81bb37344d67d/experiments/ch39-omega-research/replay/ch39-pinned-interval-replays.md#finite-height-exclusion-for-the-ray-readout)

如果保留原来的三个首站，只能再装一个读数器，该放在哪里？其余十六个站点中，除极点 $14$ 外，任一站都可以。每种荷在盲点只丢失一个非平凡循环特征的轻态。这个态在极点的振幅因旋转对称而恒为零，在其余十五个候选站的单站振幅却都大于 $0.0174$。加上其中任一站后，对每种荷分别读取四个坐标，在整个双钟环面和 $0\le\delta\le10^{-8}$ 上，三维轻空间限制的最小奇异值都大于 $4\times10^{-5}$。这个较小的界计入了不同特征在第四站的干涉。若读数站集本身也须保持三循环，最少要补一个完整三站轨道，共用六站。 [十五种单站补读与全域下界](https://github.com/the-omega-institute/trureturing-experiments/blob/7168d863ca1b4d92fec7cd8cbf50f5013f9282ac/experiments/ch39-omega-research/replay/ch39-ray-head-extra-site.md)

若仪器只记录五种荷的总振幅，站数怎样改变？这里假定五荷共用已知的站点坐标和相位参考，输入是五个独立的三维轻态。十五个复系数至少需要十五个复读数。在中心正零点，六个三站轨道中任选五个都能还原这五个态。两个物理钟角各移动至多 $10^{-7}$ 弧度、辐边软化遍取允许区间时，六种方案的最小奇异值都大于 $0.00019$。沿轨道作傅里叶变换后，每个循环特征只需分辨来自五荷的五列。在完整双钟环面上，每种十五站方案都有一个零软化背景，使平凡特征中的五列线性相关；此时某个非零输入在十五站相消。各方案的失秩背景可不同。[五荷总振幅的局部反演与六个失秩角盒](https://github.com/the-omega-institute/trureturing-experiments/blob/914db8de6ac29a9dca8cca4261b32247725fe221/experiments/ch39-omega-research/replay/ch39-common-charge-amplitudes.md)

给这十五站加上极点能消去所有盲点吗？极点在非平凡循环特征中的振幅恒为零。对六种选法中的每一种，也对每个允许的辐边软化值，都有一对共同钟角使第一非平凡特征的五个荷分量在十五站相消，极点也读到零。因此，要让旋转不变的站集在全环面上还原五荷，至少需要六个完整轨道，共十八站。补回缺少的轨道后，十八站在六个已认证的盲点角盒内都恢复满秩，最小奇异值大于 $0.00467$。[十六站盲点与十八站补读的区间证书](https://github.com/the-omega-institute/trureturing-experiments/blob/2f7cd9b8705205f7437d9ca5acff651f751c1f04/experiments/ch39-omega-research/replay/ch39-five-charge-pole-readout.md)

取齐六个轨道也足以覆盖整个共同双钟环面。对每对钟角和每个辐边软化值 $0\leq\delta\leq10^{-8}$，十八站读取的最小奇异值都大于 $0.00004$。为控制采样点之间的钟角，在每个循环特征内对五列作插值，在每个角盒内给所有控制矩阵验证同一个近似左逆。统一谱隙控制试探列投到真实最低线时的误差。因此，在背景已知且五荷共用相位参考时，要从旋转不变的站集还原五个轻态，最少恰需十八站。[全环面下界与推导](https://github.com/the-omega-institute/trureturing-experiments/blob/1499a01569f845d3230d2120ad8c4c3a347b20c7/experiments/ch39-omega-research/replay/ch39-five-charge-full-torus.md)

若同一个三站轨道有两站失效，余下十六站在整个共同双钟环面和允许的软化区间内仍能还原五个输入。在每个背景上，五个完整轨道都能分别还原至少两个循环特征的输入。扣除这两部分的贡献后，受损轨道的幸存站以模为 $1/\sqrt3$ 的系数读到余下一个特征。无论哪个轨道受损、哪一站幸存，最小奇异值都大于 $5\times10^{-11}$。若该轨道还保留第二站，十七站也有同一下界。[轨道缺站时的证明与误差界](https://github.com/the-omega-institute/trureturing-experiments/blob/c27504b38d60383f43ee456154edc1f09a9db377/experiments/ch39-omega-research/replay/ch39-five-charge-orbit-erasure.md)

**任意两普通站缺失（`CERT`）。** 两个失效站分属不同轨道时，整体循环置换保持奇异值。六个轨道的十五个无序对各有三种相对位置，所以四十五个代表覆盖全部一百三十五种情形。复算把三个循环特征的试探列变回物理站坐标，删去对应两行，再为每个通过检验的双钟角盒（含细分后的角盒）选取一个共同近似左逆，核对它对九个控制矩阵的最大左逆残差严格低于证书阈值。扣除连续角插值与软化投影误差后，对全环面和 $0\le\delta\le10^{-8}$，异轨道布局的归一化最小奇异值大于 $1.5\times10^{-9}$。结合前面的同轨道界，在已知背景和共同相位参考下，十八个普通站任意丢失两个，剩余读数都能恢复五个轻态，统一最小奇异值仍大于 $5\times10^{-11}$。[四十五类的区间复算](https://github.com/the-omega-institute/trureturing-experiments/blob/33a29e92533c75630538304fac7909a21d2583eb/experiments/ch39-omega-research/replay/ch39-distinct-orbit-erasure.md)

**保留极点时的三站缺失判据（`ARGUED`）。** 设十八普通站的读数矩阵为 $A$，极点行是 $p$。失去三个普通站后，所有幸存普通站读数为零，恰好意味着 $Ax$ 只支撑在三个缺失位置。用三个循环特征各自的左零空间约束检验这个向量是否在 $A$ 的像内，再用满足 $b^*A=p$ 的旋转不变行检验极点读数。将三条左零空间行限制到缺站坐标，得到三阶矩阵。它的任意两列都独立，否则只失去两站就会留下盲输入。因此十五个普通读数一旦失秩，盲输入恰有一个复维度。补读极点能否消除盲点，只须检查极点行在这条线上的读数是否非零。

若两个缺失位置在同一轨道，改用这两个振幅的和与差。至少一条非平凡特征行能解出差值，否则同轨道二缺站也会出现盲点。消去差值后，唯一恢复等价于余下三行两列的矩阵具有满列秩。仅用两条旋转不变的行就得到一个充分判据，等价于检验平凡特征中四个未受损轨道与极点组成的五行五列矩阵。[三行两列判据的推导](https://github.com/the-omega-institute/trureturing-books/issues/1784#issuecomment-7237324584)

**平凡特征子式的零点仍可补读（`CERT`）。** 对十对轨道，区间复算各给出一个角半宽为 $3\times10^{-8}$ 弧度的角盒。每个允许的软化值在各自角盒内都有一对钟角，使上述五行五列的行列式为零。每个角盒中，两站缺失的轨道有两种选法，第三站有三种相对位置。全部六种布局在整个角盒与软化区间内仍可恢复五种荷、三个循环特征的十五条轻线，单位范数轻线的读数最小奇异值大于 $6.61\times10^{-5}$。[十个角盒与六十个读数矩阵的区间复算](https://github.com/the-omega-institute/trureturing-experiments/blob/4e80d089798d24fb8aa479521d12bba72e668052/experiments/ch39-omega-research/replay/ch39-pole-trivial-character-roots.md) · [复算函数 `verify`](https://github.com/the-omega-institute/trureturing-experiments/blob/4e80d089798d24fb8aa479521d12bba72e668052/experiments/ch39-omega-research/replay/ch39-pole-trivial-character-roots.py#L41)

**两轨道三缺站的全环面恢复（`CERT`）。** 保留极点，从一个循环轨道失去两个普通站，从另一轨道失去一个普通站。固定已知的共同双钟背景、站点基与跨荷相位参考。以五荷三个循环特征上的十五条单位范数轻线为输入基，在整个双钟环面及 $0\leq\delta\leq10^{-8}$ 上，剩余十六行读数的最小奇异值严格大于 $5\times10^{-7}$。九十个循环代表覆盖全部二百七十种布局。交换两个空间坐标并取复共轭，会同时反转两个钟角并把软化的三条辐边移到反射轨道。两种软化共用一个误差界，因此只需复算半个环面。每个角盒用同一近似左逆核对全部三次 Bernstein 控制矩阵，再扣除插值、舍入和轻线投影误差。[反射推导、区间复算与覆盖记录](https://github.com/the-omega-institute/trureturing-experiments/blob/9cf2a32c4301fc2cf079e70c8afb0af1acb3dbb8/experiments/ch39-omega-research/replay/ch39-pole-two-orbit-torus.md)

**三条辐边分别软化时的恢复（`ARGUED`）。** 保持同一站点布局，令原来的三条辐边各取亏额 $d_j\in[0,D]$，其中 $D=10^{-8}$。分别改变辐边权重后，每荷的输入空间仍取最低三维轻带，并用其中任意一个标准正交基表示。固定钟角和荷 $q$，沿 $t\in[0,1]$ 从共同亏额 $D/2$ 直线移到所选的 $(d_1,d_2,d_3)$。算子导数夹在 $\pm(D/2)K_q$ 之间，$K_q$ 是三辐边的单位权星图拉普拉斯算子，范数为 $4$。前面的端点排序给出沿途统一谱隙 $g=183/200$。

记 $P_q$ 为轻带投影。统一谱隙使 $P_q$ 沿路径光滑，可用输运方程 $U'_q=(P'_qP_q-P_qP'_q)U_q$ 选取标准正交标架，使 $U_q^*U'_q=0$。设 $A_q$、$B_q$ 分别为重带算子和轻带在此标架中的矩阵。对 $H_qU_q=U_qB_q$ 求导并投到重带，得 $A_qU'_q-U'_qB_q=-(I-P_q)H'_qU_q$。分离谱的 Sylvester 范数界给出 $\|U'_q\|\le 2D/g$。积分后把五荷的标架横向拼接，再限制到十六个幸存站。由 Cauchy–Schwarz 不等式，读数算子的改变量至多为 $2\sqrt{5}D/g$。把它从共同亏额中点的证书下界扣除，得到 $5\times10^{-7}-2\sqrt{5}D/g>4.51\times10^{-7}$。改用其他标准正交基只会在输入端乘以酉矩阵，因此这个最小奇异值下界适用于全部二百七十种布局和整个双钟环面。[Sylvester 算子范数界](lean:D5/S3/HilbertOperators/DavisKahanProjector.opNorm_le_div_of_comp_sub_comp_eq)

**三个不同轨道各缺一站时的原点邻域（`CERT`）。** 保留极点，六个普通轨道中任选三个，各失去一站。整体旋转保持读数矩阵的奇异值，所以二十组轨道选择各只需检查九种相对站位。一百八十个代表覆盖全部五百四十种布局。在共同钟角满足 $|\theta_1|,|\theta_2|\leq10^{-6}$ 弧度且 $0\leq\delta\leq10^{-8}$ 时，十六个读数可恢复五荷在三个循环特征上的十五个复振幅。以单位范数轻线为输入基，最小奇异值严格大于 $1.32\times10^{-5}$。区间复算在原点检验每个矩阵的近似左逆，再用谱隙控制各循环特征的轻线随钟角与软化的变化。 [区间证书与复算](https://github.com/the-omega-institute/trureturing-experiments/blob/baf6f85649cd36a0eede93f0b61dbf8cb83c0996/experiments/ch39-omega-research/replay/ch39-pole-three-orbit-origin.md)

利用上面的标架输运界，还可以让三条辐边分别取亏额（`ARGUED`）。在共同亏额中点固定站点限制，扣除 $2\sqrt{5}D/g$ 后，全部五百四十种布局在同一原点邻域的最小奇异值仍严格大于 $1.3151\times10^{-5}$。对下文等亏额全环面下界至少为 $4.08\times10^{-7}$ 的具体布局，同一扣除给出分别软化后的全环面下界 $3.59\times10^{-7}$。这两个估计都以每荷三维轻带的标准正交基为输入。

**固定两个外缺站，内站可沿轨道换位（区间证书，`CERT`）。** 省去外站 $(1,29,5)$ 和 $(5,29,1)$，第三个缺站可取内轨道上的任一站 $(13,13,23)$、$(13,23,13)$ 或 $(23,13,13)$。保留极点，在上述背景与输入条件下，三个布局的十六行读数在整个双钟环面及 $0\leq\delta\leq10^{-8}$ 上的最小奇异值都严格大于 $4.08\times10^{-7}$。交换后两个坐标再作一次整体三循环，会互换第一和第三种内站，固定第二种。区间复算在零亏额下利用这一对称，再分别用谱隙扣除原软化对轻线的影响。三个布局各作整体三循环，共覆盖九种物理布局。[两种换位的全环面区间证书与复算](https://github.com/the-omega-institute/trureturing-books/issues/1856#issuecomment-7240856990)

撤去极点后，第一和第三种内站布局各有一个发布闭角盒。对每个允许的亏额，各自盒内恰有一个秩十四盲点，极点对单位盲输入的振幅模都大于 $1.0483\times10^{-3}$。第二种内站布局有两个互不相交的闭角盒，每个允许的亏额在每盒内恰有一个秩十四盲点，极点振幅模都大于 $1.65326\times10^{-4}$。零亏额时，后两处盲点的钟角在环面上互为相反数。取盒中的角度代表，亏额为正时第二钟的两角之和比 $2\pi$ 少 $0.0430\delta$ 至 $0.0432\delta$ 弧度。反射把实际软化的三条辐边移到另一外轨道，因而正亏额下两角不再恰好相消。[第一和第三种内站的发布角盒](https://github.com/the-omega-institute/trureturing-experiments/blob/1c485355843e787bf64af78c6c21b0dffd0fbd78/experiments/ch39-omega-research/replay/ch39-five-charge-fifteen-masks.json#L179-L189) · [第二种内站的全环面证书与双角盒复算](https://github.com/the-omega-institute/trureturing-books/issues/1856#issuecomment-7240449523) · [第二种内站的发布角盒](https://github.com/the-omega-institute/trureturing-experiments/blob/1c485355843e787bf64af78c6c21b0dffd0fbd78/experiments/ch39-omega-research/replay/ch39-five-charge-fifteen-masks.json#L168)

**一个异轨道布局的全环面极点补读（`CERT`）。** 保留极点 $(17,17,17)$，固定省去 $(1,29,5)$、$(7,17,23)$ 与 $(13,23,13)$。给定共同双钟背景、站点基和跨荷相位参考，以五荷各三个循环特征的单位范数轻线为输入基，在整个共同双钟环面及 $0\leq\delta\leq10^{-8}$ 上，十六行读数的最小奇异值大于 $4.06\times10^{-7}$。区间复算用各角盒内的共同近似左逆控制读数，再用谱隙计入各轻线随软化的变化。交换后两个坐标并计入整体三循环，同一界共覆盖六种物理布局。若撤去原布局的极点，每个允许亏额在发布的同一个角盒内都恰有一个秩十四盲点，单位盲输入在极点的振幅模大于 $0.0010321$。 [全环面区间证书与复算](https://github.com/the-omega-institute/trureturing-books/issues/1856#issuecomment-7239455711) · [发布的盲点角盒](https://github.com/the-omega-institute/trureturing-experiments/blob/1c485355843e787bf64af78c6c21b0dffd0fbd78/experiments/ch39-omega-research/replay/ch39-five-charge-fifteen-masks.json#L834)

**三个不同轨道的盲点与极点补读（`CERT`）。** 固定失去 $(1,29,5)$、$(7,17,23)$ 与 $(23,13,13)$。以 $(0.070570416068505,6.012461310014705)$ 弧度为中心，两钟角的半宽各为 $10^{-8}$ 弧度。在每个 $0\le\delta\le10^{-8}$ 下，盒内恰有一对钟角使十五个幸存普通站的读数矩阵秩为十四。保留极点后，这个布局及其余异轨道三缺站布局在整盒内均可恢复，最小奇异值大于 $2.5\times10^{-6}$。在同一失站布局的已发表盲点角盒中，十五个普通读数也恰有一个盲点，而保留极点后，全部异轨道布局在该盒内的最小奇异值大于 $5.9\times10^{-4}$。两个角盒互不相交。区间复算用 Schur 补的压缩映射隔离普通站盲点，再用轻线的谱扰动界把十六行矩阵的格心下界传到整盒。 [已发表角盒](https://github.com/the-omega-institute/trureturing-experiments/blob/1c485355843e787bf64af78c6c21b0dffd0fbd78/experiments/ch39-omega-research/replay/ch39-five-charge-fifteen-masks.json#L879) · [两盒的推导与 Arb 复算](https://github.com/the-omega-institute/trureturing-books/issues/1856#issuecomment-7238582634)

**固定三缺站布局的全环面恢复（`CERT`）。** 保留极点，固定失去 $(1,29,5)$、$(7,17,23)$ 与 $(23,13,13)$。在整个共同双钟环面及 $0\leq\delta\leq10^{-8}$ 内，十六个读数的最小奇异值严格大于 $2.9\times10^{-7}$，输入基取五荷三个循环特征的单位范数轻线。因此，无论普通站在何处相消，极点都能补足这一布局的读数。区间复算先用三角多项式近似轻线，再在每个角盒用同一个左逆候选控制插值矩阵，最后扣除插值、舍入和谱投影误差。三个缺站一起循环轮换时下界相同。[全环面区间证书与复算](https://github.com/the-omega-institute/trureturing-books/issues/1856#issuecomment-7238769348)

这套补读也适用于两个外轨道同时丢站。固定省去互为反射、分属不同循环轨道的 $(1,29,5)$ 和 $(1,5,29)$，第三个缺站可取内轨道上的任一站 $(13,13,23)$、$(13,23,13)$ 或 $(23,13,13)$。保留极点，以同样的十五条单位范数轻线为输入基，十六行读数在整个共同双钟环面及 $0\leq\delta\leq10^{-8}$ 上的最小奇异值都严格大于 $4.06\times10^{-7}$（区间证书，`CERT`）。交换后两个坐标时，前两个内站互换，第三个内站固定。再作整体三循环，一共覆盖九种布局。[反射互换布局的全环面证书](https://github.com/the-omega-institute/trureturing-books/issues/1856#issuecomment-7240088601) · [反射固定布局的全环面证书](https://github.com/the-omega-institute/trureturing-books/issues/1856#issuecomment-7240268268)

撤去极点后，内站缺在 $(13,13,23)$ 时，每个允许亏额在发布闭角盒内恰有一个秩十四盲点，单位盲输入在极点的振幅模大于 $3.394\times10^{-4}$。内站缺在 $(23,13,13)$ 时，两个互不相交的闭角盒内各恰有一个秩十四盲点，极点对单位盲输入的振幅模都大于 $4.1685\times10^{-4}$。零亏额时，后两处盲点的钟角在环面上互为相反数。亏额为正时，取两个角盒中的角度代表，第二钟的角度之和比 $2\pi$ 少 $0.04645\delta$ 至 $0.04647\delta$ 弧度。这个偏移来自实际软化的三条辐边在反射下移到另一外轨道。[第一种内站的发布角盒](https://github.com/the-omega-institute/trureturing-experiments/blob/1c485355843e787bf64af78c6c21b0dffd0fbd78/experiments/ch39-omega-research/replay/ch39-five-charge-fifteen-masks.json#L64) · [双角盒与软化偏移的区间复算](https://github.com/the-omega-institute/trureturing-books/issues/1856#issuecomment-7240268268)

如果把第二个外缺站移到 $(29,1,5)$，内轨道的三个位置仍可任选。固定省去 $(1,29,5)$、$(29,1,5)$，再省去 $(13,13,23)$、$(13,23,13)$ 或 $(23,13,13)$。保留极点时，在同样的背景与输入条件下，十六行读数在整个共同双钟环面及 $0\leq\delta\leq10^{-8}$ 上的最小奇异值严格大于 $4.06\times10^{-7}$（区间证书，`CERT`）。整体三循环给出九种布局。交换前两个坐标互换后两种内缺站。零亏额下，这一反射配合复共轭可传递全域界，再对两种布局分别计入实际软化的轻线位移。[九种布局的全环面区间证书](https://github.com/the-omega-institute/trureturing-books/issues/1856#issuecomment-7241146723)

内缺站为 $(13,13,23)$ 时已有更强的全域下界 $4.08\times10^{-7}$。撤去极点后，每个允许亏额在两个不相交的闭角盒内各有一个秩十四盲点。在这两处，单位盲输入的极点振幅模均大于 $3.4227\times10^{-4}$。零亏额时，两处角对在环面上互为相反数。正亏额时，取盒中的角度代表，第一钟角之和比 $2\pi$ 多 $0.04037\delta$ 至 $0.04041\delta$ 弧度，第二钟角之和比 $2\pi$ 少 $0.06319\delta$ 至 $0.06323\delta$ 弧度。[发布的盲点角盒](https://github.com/the-omega-institute/trureturing-experiments/blob/1c485355843e787bf64af78c6c21b0dffd0fbd78/experiments/ch39-omega-research/replay/ch39-five-charge-fifteen-masks.json#L335) · [全环面、双盲点与角度漂移的区间复算](https://github.com/the-omega-institute/trureturing-books/issues/1856#issuecomment-7240613830)

内缺站为 $(13,23,13)$ 或 $(23,13,13)$ 时，撤去极点后，每个允许亏额在各自的发布闭角盒内也恰有一个秩十四盲点。在这两处，单位盲输入的极点振幅模均大于 $0.00159328$。 [第一处发布角盒](https://github.com/the-omega-institute/trureturing-experiments/blob/1c485355843e787bf64af78c6c21b0dffd0fbd78/experiments/ch39-omega-research/replay/ch39-five-charge-fifteen-masks.json#L345) · [第二处发布角盒](https://github.com/the-omega-institute/trureturing-experiments/blob/1c485355843e787bf64af78c6c21b0dffd0fbd78/experiments/ch39-omega-research/replay/ch39-five-charge-fifteen-masks.json#L324)

全环面固定读出至少需要十六站。从十九站中无论选哪十五站，对每个允许的软化值，都有一对共同钟角使某个非零输入完全相消。全部 $3876$ 种布局按旋转分为 $1296$ 类。其中 $36$ 类省去了一个完整轨道，继承极点方案的盲点，其余 $1260$ 类各有一个经过区间检验的盲点角盒。若已知背景并允许按背景换站，十五站就够了。在十八个非极点站中选行列式模最大的十五行，另三行在此基底中的每个系数模至多为一，所以所选读数的最小奇异值大于 $4\times10^{-5}/\sqrt{46}$。十四个复读数无法确定十五个独立复振幅。[固定布局的完整分类与按背景选站的界](https://github.com/the-omega-institute/trureturing-experiments/blob/1c485355843e787bf64af78c6c21b0dffd0fbd78/experiments/ch39-omega-research/replay/ch39-five-charge-fifteen-masks.md)

**极点补读达到十六站下界（`CERT`）。** 保留极点 $(17,17,17)$，固定省去 $(1,29,5)$、$(23,7,17)$ 和 $(23,13,13)$。在整个共同双钟环面及 $0\leq\delta\leq10^{-8}$ 上，以五荷三个循环特征的单位范数轻线为输入基，十六行读数的最小奇异值严格大于 $3\times10^{-7}$。同时循环轮换三个缺站保留此界。全环面区间复算在每个角盒为插值矩阵检验共同近似左逆，再扣除插值、舍入和轻线投影误差。撤去极点后，每个允许的软化值在以 $(0.10916845464151226,6.001545099145768)$ 弧度为中心、两角半宽各 $10^{-8}$ 弧度的闭盒内恰有一个秩十四盲点。在该点取单位盲输入，极点读到的振幅模仍大于 $3.04\times10^{-5}$。 [全环面下界与盲点角盒的区间复算](https://github.com/the-omega-institute/trureturing-books/issues/1856#issuecomment-7239039416)

**保留极点的十六站构造（`CERT`）。** 固定省去 $(1,29,5)$、$(17,23,7)$ 和 $(23,13,13)$，保留极点 $(17,17,17)$。以五荷三个循环特征的单位范数轻线为输入基，十六行读数在整个共同双钟环面及 $0\leq\delta\leq10^{-8}$ 上的最小奇异值严格大于 $2.9\times10^{-7}$。同时轮换三个缺站保持此界。若撤去极点，每个允许的亏额值都在一个固定的闭角盒内恰有一个秩十四盲点。沿这条一维盲方向，十五个普通站的振幅相消，极点仍能读出振幅。全域下界来自逐盒检验插值矩阵的共同近似左逆，再扣除插值、舍入和轻线投影误差。 [全环面下界与盲点角盒的区间复算](https://github.com/the-omega-institute/trureturing-books/issues/1856#issuecomment-7238902136)

**固定十六站的全环面读出（区间证书，`CERT`）。** 保留极点 $(17,17,17)$，固定省去 $(1,29,5)$、$(17,23,7)$ 与 $(13,23,13)$。给定共同双钟背景、站点基与跨荷相位参考，以五荷在三个循环特征中的十五条单位范数轻线为输入基，读数矩阵在全环面及 $0\leq\delta\leq10^{-8}$ 上的最小奇异值严格大于 $4.06\times10^{-7}$。区间复算在每个角盒中检验共同近似左逆的残差。零亏额的反射对称性与软化误差界将下界传给交换后两个坐标的布局，两个布局各自整体轮换，共得到六种物理布局。对原布局撤去极点后，每个允许亏额在以 $(1.21516103101645979556790,1.21713882847807256312945)$ 弧度为中心、两角半宽各为 $1.000001\times10^{-9}$ 弧度的闭盒内恰有一个秩十四盲点。该点的单位盲输入在极点产生的振幅模大于 $3.370\times10^{-4}$。 [壳算子](https://github.com/the-omega-institute/trureturing-experiments/blob/cb58c8e64ecea67184e0c1d68a690be098a7a384/experiments/ch39-omega-research/replay/ch39-three-ray-chiral-boundary.py#L29) · [全环面区间证书与复算](https://github.com/the-omega-institute/trureturing-books/issues/1856#issuecomment-7239606424) · [已发表的盲点角盒](https://github.com/the-omega-institute/trureturing-experiments/blob/1c485355843e787bf64af78c6c21b0dffd0fbd78/experiments/ch39-omega-research/replay/ch39-five-charge-fifteen-masks.json#L865)

若前两个缺站仍是 $(1,29,5)$ 和 $(17,23,7)$，把第三个缺站移到同一轨道的 $(13,13,23)$，极点仍能补足读数。对同样的十五条单位轻线，在整个共同双钟环面及 $0\leq\delta\leq10^{-8}$ 上，十六行矩阵的最小奇异值严格大于 $4.08\times10^{-7}$（区间证书，`CERT`）。交换后两个坐标得到的布局与两种布局的整体三循环也有同一下界。只用原布局的十五个普通站时，每个允许亏额在发布闭盒内恰有一个秩十四的盲点。在该点，任一单位盲输入在极点产生的振幅模大于 $9.3173\times10^{-4}$。 [全环面证书、对称性推导与复算](https://github.com/the-omega-institute/trureturing-books/issues/1856#issuecomment-7239820534) · [发布的盲点角盒](https://github.com/the-omega-institute/trureturing-experiments/blob/1c485355843e787bf64af78c6c21b0dffd0fbd78/experiments/ch39-omega-research/replay/ch39-five-charge-fifteen-masks.json#L810)

**十六站的全环面极点补读（区间证书，`CERT`）。** 保留极点 $(17,17,17)$，固定省去 $(1,29,5)$、$(23,7,17)$ 和 $(13,23,13)$。在整个共同双钟环面和 $0\leq\delta\leq10^{-8}$ 上，以五荷各三个循环特征的单位范数轻线为输入基，十六行读数的最小奇异值大于 $4.04\times10^{-7}$。零亏额下，复共轭与交换后两个坐标把这一界的零亏额部分传给反射布局。再用三个循环特征的谱宽控制原软化边集对轻线的移动，同一个界适用于两种布局及其整体循环轮换。撤去原布局的极点时，每个允许的亏额都在已认证的闭角盒内给出一个秩十四盲点。极点在该盲方向上的单位输入振幅模大于 $2.27\times10^{-4}$。 [全环面证书、反射推导与盲点角盒](https://github.com/the-omega-institute/trureturing-books/issues/1856#issuecomment-7239332953)

保持前两个缺站 $(1,29,5)$、$(23,7,17)$，把第三个从 $(13,23,13)$ 移到 $(13,13,23)$，就得到另一组布局。对这一布局、交换后两个坐标得到的反射布局及两者的整体三循环，在同一环面和亏额范围内，十六行读数的最小奇异值都大于 $3\times10^{-7}$。只在第三个缺站为 $(13,13,23)$ 的原布局撤去极点，取中心为 $(5.783384228530862,1.5385522156509284)$ 弧度、两角半宽均为 $10^{-8}$ 弧度的闭盒。每个允许的亏额在此盒内恰有一个秩十四盲点，任一单位盲输入在极点产生的振幅模都大于 $5.2\times10^{-4}$。其余相对站位的全域分类仍开放。[全环面证书、反射推导与盲点角盒](https://github.com/the-omega-institute/trureturing-books/issues/1856#issuecomment-7239192062)

实际的两只钟由同一个黎曼零点的纵坐标驱动。它们多常走近固定布局的盲点？在第 $2\,306\,888\,100\,085$ 个正零点逐一取出所有十五行方阵，无论用实际软化还是零软化，每个布局的最小奇异值都大于 $3.11736\times10^{-6}$。这个共同锚点也决定了一个密度问题。每个布局的行 Gram 矩阵都可用各荷、各循环特征的最低线投影来写。谱隙使这些投影随钟角实解析，各布局的 Gram 行列式之积在零软化锚点严格为正，故其零集面积为零。由两钟等分布及实际软化随高度趋零，按重数计的正零点中，全部 $3876$ 种布局同时满秩的比例趋于一。

**近盲零点计数（手工推导，`ARGUED`）。** 满秩时还要问测量误差会放大多少。固定一种布局，记 $s$ 为其最小奇异值。零软化时，两钟角沿短弧总共移动 $h$ 弧度，$s$ 至多改变 $\sqrt{132}h$。故一个盲点周围就有一块面积可算的近盲菱形。令 $\varepsilon(T)\downarrow0$ 且 $\varepsilon(T)\log T\to\infty$。在高度 $T$ 以内全部正零点中，满足 $s<\varepsilon(T)$ 且所有布局都满秩的比例，除以 $\varepsilon(T)^2$ 后下极限至少为 $1/(264\pi^2)$。先将近盲菱形的半径乘以任意固定的 $1-\eta$，其中 $0<\eta<1$。依[附录 C.3](appendix-c.md#sec-ou-appc-shrinking-windows)，收缩后的菱形计数等于其 Haar 面积乘 $N(T)$ 加上低阶项。在盲相位处，所有零软化 Gram 行列式之积具有一个非零的首项齐次 Taylor 多项式。这个首项在缩放后的菱形中只在零测集上为零。用有限个闭包避开零集和边界的小方形逼近菱形面积。由同一收缩计数，每个方形给出相应比例的零点。方形内首项有正的绝对值下界，乘积在原角坐标下至少为 $\varepsilon(T)$ 的固定幂乘一个正数。对高于 $\sqrt T$ 的零点，实际软化造成的 $O(T^{-1})$ 扰动更小，故这里的所有布局都满秩。实际软化对 $s$ 的 $O(T^{-1})$ 扰动也小于余量 $\eta\varepsilon(T)$。舍去高度低于 $\sqrt T$ 的零点只损失 $O(\sqrt T\log T)=o(\varepsilon(T)^2N(T))$。最后令 $\eta\downarrow0$，恢复整个菱形给出的常数。各布局各有自己的近盲零点。某个实际零点是否恰好失秩仍开放。[逐布局锚点、近盲面积与零点计数](https://github.com/the-omega-institute/trureturing-experiments/blob/bc1aeeab70bbe7a36e7f8df8365267542da81aad/experiments/ch39-omega-research/replay/ch39-five-charge-zero-density.md) · [收缩计数与精确失秩的局部排除](https://github.com/the-omega-institute/trureturing-books/issues/1725#issuecomment-7235116636)

在简单盲点 $p$，同一对数尺度给出精确的局部首项。设零软化读出在 $p$ 的秩为十四，取单位左右零向量 $u,v$，令 $J_p h=u^*D_\theta A(p,0)[h]v$。要求 $J_p$ 作为从两枚物理弧度坐标到 $\mathbb C$ 的实线性映射可逆。标量 Schur 余项给出 $s(p+h)=|J_p h|+O(|h|^2)$。极限椭圆的面积除以 $(2\pi)^2$，得到局部近盲零点数 $N(T)\varepsilon(T)^2/(4\pi|\det_{\mathbb R}J_p|)+o(N(T)\varepsilon(T)^2)$。用方格逼近并沿用 Taylor 排除，即使要求全部布局在同一零点满秩，首项也成立。省去站点 $\{0,1,2,3\}$ 的布局有一个已认证盲点，其首项系数经区间复跑严格介于 $1400$ 与 $1500$。省去 $\{0,1,2,4\}$ 时，另一已认证盲点的系数在 $(18.34553814,18.34553818)$ 内。区间检验覆盖 $1260$ 个旋转代表，各有一个已认证简单盲点，系数均在 $(1.87,55680)$ 内。旋转只置换行并改变列的单位相位，因而这些证书适用于 $3780$ 个布局。其余 $36$ 个旋转代表共用六个继承根，亦通过简单性检验。因此每个布局至少有一个已认证简单盲点。全部 $1266$ 个选定根的邻域两两分离。对每个布局，只取两钟相位落在该布局的指定根邻域内、且该布局的实际读数满足 $s<\varepsilon(T)$ 的正零点。对这些集合取并集，再保留全部布局同时满秩的零点。同一继承根的多个极限椭圆同心且成比例，只计最大的一个。这个选定并集的首项为 $C_{\mathrm{sel}}N(T)\varepsilon(T)^2$，其中 $880360<C_{\mathrm{sel}}<880361$。整环面首项仍需分类其余盲集。[局部首项与归一化复算](https://github.com/the-omega-institute/trureturing-books/issues/1725#issuecomment-7237713397) · [旋转代表的区间证书](https://github.com/the-omega-institute/trureturing-books/issues/1725#issuecomment-7237961900) · [所有布局与选定局部并集](https://github.com/the-omega-institute/trureturing-books/issues/1725#issuecomment-7238210477)

将内部空间按特征标正交拆块，背后依托的是一条无 $\pi$、纯有理的群论正交骨架。正如[第二章](ch02-quaternion-clocks-and-haar-zeros.md)在双时钟球面哈尔积分中所确立的，偶次切比雪夫特征多项式 $E_m(\kappa)$ 在全阶上的正交归一性已在 Lean 内核中不依赖实数极限而严格冻结：

::: {.theorem #thm-ou-ch07-peter-weyl-orthonormal title="全阶偶次彼得—魏尔特征核的无 π 有理哈尔正交归一性" lean="D5/S3/Quantum/AURICOmega/OmegaSphericalHaarMidpoint.all_degree_peter_weyl_orthonormal"}
在 `OmegaSphericalHaarMidpoint` 中，记 `haarInner` 为无 $\pi$ 有理球面哈尔内积，记 `evenCharPoly m` 为第 $m$ 阶偶次切比雪夫特征多项式 $E_m(\kappa)$，并记 `degreeDelta m n` 为取值于 `Omega.IntRatio` 的克罗内克增量 $\delta_{m,n}$。则对一切自然数 $m, n \in \mathbb{N}$，在有理等价关系 `Equivalent` 下恒有

$$
\operatorname{haarInner}(\operatorname{evenCharPoly}\; m,\; \operatorname{evenCharPoly}\; n) \;\approx\; \delta_{m,n}.
$$

:::

::: {.proof}
先由偶次切比雪夫特征标乘积融合律将 $E_m(\kappa) E_n(\kappa)$ 展开为有限和 $\sum_{r = |m - n|}^{m + n} E_r(\kappa)$，再利用 `haarKappaPoly` 在逐项相等系数表下的良定义性化为对单阶特征标的逐项求积。证明对全部移位幂次 $j \in \mathbb{N}$ 与阶数 $r \in \mathbb{N}$ 同步建立闭式移位矩表，通过双阶归纳与无 $\pi$ 阶乘矩递推将每一步归约为整系数多项式恒等式；令 $j = 0$ 时，所有 $r \ge 1$ 的分子均含下降阶乘首因子 $0$ 而精确归零，仅 $r = 0$ 给出 $1$。由于 $r = 0$ 落入区间 $[|m - n|, m + n]$ 当且仅当 $m = n$，有限和精确坍缩为 `degreeDelta m n`。完整证明由 Lean 内核检查。
:::

### 7.1.2 全零点容许秩分类、六次有理滤波与双分界对决

[@thm-ou-ch07-peter-weyl-orthonormal] 保证了特征标投影的代数正交性绝非数值凑巧。然而，物理诚实立刻要求我们追问下一句：**在全环面与全部正零点上，共同谱隙究竟是不是只有“留三模”这一条？** 答案是否定的。对五种荷与全部正零点统一排查所有可能的单一固定截断，全环面区间舒尔证书连同 $34$ 枚实际零点排尽其他一切可能后，给出完整分类（[`ch39-all-common-shell-ranks.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-all-common-shell-ranks.py)）：

- **全部非平凡共同低模数集合**恰为 $\{1, 3, 7, 15\}$。
- 若按“最宽共同谱隙”原则自动切分，胜出的不是 $3$，而是 **$1$ 模**。
- 若施加对称条件“三个循环特征标 $(1, \omega, \omega^2)$ 等重”，则 $1$ 与 $7$ 被排除，但 **$3$ 与 $15$ 同时幸存**。

换言之，三代并非从单纯谱隙宽度中白捡来的，它需要一条额外机制把 $3$ 从 $\{3, 15\}$ 中真正钉死。

有理滤波的算术障碍来自真实双钟的联合等分布。令 $\theta_d=\arccos(1-d/1734)$，$a=\theta_{724}-\theta_{244}$，$b=\theta_{804}-\theta_{244}$。三个相位 $e^{i\theta_d}$ 所在的平方类 $-d(3468-d)$ 分别含有仅见于各自一项的素因子 $13,181,37$，因此可以分别共轭。若 $ka+lb=0$，将关系指数化并对 $724$ 或 $804$ 的相位单独共轭，就会有 $e^{2ik\theta_{724}}=e^{2il\theta_{804}}=1$。这两个相位的有理迹 $2\cos\theta_d$ 均非整数，所以都不是单位根，故 $k=l=0$。Hlawka 的定理给出任意非零实数 $\alpha$ 下零点纵坐标的 $\{\alpha\gamma\}$ 无条件等分布（按重数计）。对每个非零整数对 $(k,l)$ 取 $\alpha=q(ka+lb)/(2\pi)$，多维 Weyl 判据便给出各非零荷的双钟相位在整个环面上等分布。[Ford 与 Zaharescu，*On the distribution of imaginary parts of zeros of the Riemann zeta function*（2005），§1](https://doi.org/10.1515/crll.2005.2005.579.145)

荷二最低本征值的闭包因此覆盖连续区间 $[0.042, 2.035]$，于是任何固定的单变量有理函数若在全部正零点上精确湮灭轻带，就只能恒等于零。一旦允许有限精度误差，局势立刻逆转：**固定六次有理复合滤波**即可把整张双钟环面上的轻重两带平方质量提升误差压制到 **$1.26 \times 10^{-47}$** 以下。

::: {.figure src="ch07-three-generation-gap"}
**十九点贝伦德球壳五荷共用的三模单步谱隙。** 在任意单位双钟相位与辐边减重 $\delta \le 10^{-8}$ 下，五种超荷扇区 $q \in \{1, 2, -3, -4, 6\}$ 的单步磁拉普拉斯前三轻模（青色，按三循环特征标 $1, \omega, \omega^2$ 各占一模）均严格低于 $8.685$，其余十六个重模均严格高于 $9.6$（空心圆圈标示严格界）；琥珀色虚线标出位于共享谱隙 $(8.685, 9.6)$ 内的公共截断 $9$。
:::

若用**每个保留态的平均单步能量**比较这两个截断，秩十五要为多收的十二个态付出多少？在上述辐边减重范围内固定任一荷与任一对钟相位，令 $Q_*$ 投到三个最低本征态，$E_*=(\lambda_1+\lambda_2+\lambda_3)/3$。对任意秩为 $r\ge3$ 的正交投影 $Q$，记 $s=\operatorname{tr}(Q Q_*)$。在能量本征基中，$Q$ 的对角元介于零与一之间。相对 $Q_*$，轻带少了 $3-s$ 的权重，每单位至多损失 $\lambda_3$，重带多了 $r-s$ 的权重，每单位至少增加 $\lambda_4$。于是
$$
\frac{\operatorname{tr}(L_q Q)}{r}-E_*
\ge (\lambda_4-\lambda_3)\left(1-\frac{s}{r}\right)
  +(\lambda_3-E_*)\left(1-\frac{3}{r}\right)
\ge 0.915\left(1-\frac{s}{r}\right).
$$
等于最低平均能量要求 $s=r$，即整个保留空间都在三维轻带内，故 $r=3$ 且 $Q=Q_*$。要求子空间在轮换下不变、每个特征标内保留相同正秩，就给出了所需的秩下限。只要求测量三个特征标的概率相同则允许秩一：沿三条轻线各取一根单位向量，它们的等幅归一化叠加也有平均能量 $E_*$。由作用量推出采用哪种占据约束和能量泛函，仍是三代问题的一部分。

上面的极小化容许五个荷各选一套轻态。如果五荷使用相同的站点基、同一对钟角和同一辐边减重，并且须共用**同一个三维子空间**，最低平均能量会升高多少？记 $e(A)=(\lambda_1(A)+\lambda_2(A)+\lambda_3(A))/3$，用尖括号表示五荷等权平均。各荷单独择态时，每态平均能量的最小值是 $\langle e(L_q)\rangle$。共用投影 $Q$ 时，先对矩阵取平均再选其最低三态，最小值为 $e(\langle L_q\rangle)$。对每一个 $0\le\delta\le10^{-8}$，两者之差即使在整张双钟环面上取最小，仍严格介于 $0.09$ 和 $0.09236$ 个单步能量单位之间。上界由钟角 $(2\pi/48,-2\pi/48)$ 给出；下界利用单荷轻带的谱隙控制格点之间的能量变化，覆盖所有钟角及任意秩三投影。这里的代价依赖五荷之间给定的站点识别；独立重相或改用两步质量都会改变比较。[五荷共用轻空间的区间证书](https://github.com/the-omega-institute/trureturing-experiments/blob/5d8a634411623615974fe8139da257218503d2ad/experiments/ch39-omega-research/replay/ch39-common-single-step-energy.md)

若改用谱截断的可加能量，选择会怎样改变？整张双钟环面上，无论取五荷共同的还是单荷的谱隙宽度与谱隙比，逐点胜出的都是单模。对一切可加泛函 $\Phi(r) = \sum_{j \le r} \varphi(\lambda_j)$，所选的秩完全由第 $2$–$3$、$4$–$7$、$8$–$15$ 三段层上的增量 $\Delta_1, \Delta_2, \Delta_3$ 决定，选出三代当且仅当 $\Delta_1 < 0$、$\Delta_2 > 0$ 且 $\Delta_2 + \Delta_3 > 0$。在新增的各层上，一圈零点能、对数行列式与配分函数的被加项均为正，所以这三个和随秩严格递增。有限逆温度 $\beta\ge0$ 时，截断吉布斯熵也严格递增，而自由能 $-\log Z_r/\beta$ 在 $\beta>0$ 时严格递减。这些量的极值都在端点 $1$ 或 $15$ 处。被加项单调递增时条件化为 $\Delta_1 < 0 < \Delta_2$，典型是以能级 $\mu$ 计量的狄拉克海 $\sum_{j \le r}(\lambda_j - \mu)$：它在每个荷、每一点一致选出三代，当且仅当 $\mu$ 落在一个宽约 $2.4$ 的窗内，该窗包含 $[8.221, 10.6]$、含于 $(8.220648, 10.635617)$。球壳自带的能级中，站点方差最小割、最小度与固定数 $9$ 落在此窗；度 $14$、平均度与谱中心选出 $7$，度 $18$ 选出 $15$，度 $16$ 处于 $7$ 与 $15$ 的过渡带。三代的选择由此被归约为“费米能级落在此窗内”，取哪一个原生能级仍是模型输入；这一结论只针对单步谱，不推及下面的两步质量读数（[完全判别与窗口证书](https://github.com/the-omega-institute/trureturing-experiments/blob/ac54bd3d7a08f15c1d8b64b7ba503edd479ebce6/experiments/ch39-omega-research/replay/%E8%B4%B9%E7%B1%B3%E8%83%BD%E7%BA%A7%E7%8B%84%E6%8B%89%E5%85%8B%E6%B5%B7%E9%80%89%E5%87%BA%E4%B8%89%E4%BB%A3%E5%BD%93%E4%B8%94%E4%BB%85%E5%BD%93%E8%83%BD%E7%BA%A7%E8%90%BD%E5%9C%A8%E5%AE%BD%E7%BA%A6%E4%BA%8C%E7%82%B9%E5%9B%9B%E7%9A%84%E7%AA%97%E5%86%85.md) · [区间证书](https://github.com/the-omega-institute/trureturing-experiments/blob/ac54bd3d7a08f15c1d8b64b7ba503edd479ebce6/experiments/ch39-omega-research/replay/ch39-native-rank-selector-classes.py)）。

上述区间证书还可量出秩十五的代价。记 $a_{i,j}$ 为第 $i$ 至 $j$ 层的平均能量。证书给出 $\lambda_1<3.1$、$a_{2,3}<8.22501$、$a_{4,7}>10.5999$、$a_{8,15}>15.81795$。任何十五维子空间的总能量至少是最低十五层之和，故其平均能量比 $E_*$ 至少多 $(4a_{4,7}+8a_{8,15}-12E_*)/15>6$ 个单步能量单位，其中 $E_*=(\lambda_1+2a_{2,3})/3$。

两步质量读数下的情形确实不同。取 $h = |\lambda(\lambda - c)|$ 并在每个荷内按 $h$ 升序编号，在整张双钟环面上，五荷逐点共同的两步分界只剩秩 $15$：$\max_q h_{(15)} < 60.3494 < 61.94212 < \min_q h_{(16)}$。秩 $3$ 只在一个开集上是共同分界，例如在 $U = V = 1$ 处有 $\max_q h_{(3)} < 7.53559 < 10.6225 < \min_q h_{(4)}$；在另一个开集上它失效。$q = 1$ 与 $q = -3$ 两个扇区各有一致的三模窗，障碍来自 $q = 2$、$-4$、$6$：它们的第三与第四两步质量在环面上值域相交。所以只要容许的秩包含 $2$、$3$、$4$，任何被加函数不随相位变的可加泛函 $\sum_{j \le r}\varphi(h_{(j)})$ 都不能在整张环面上一致选出三代，以 $h$ 计量的费米能级窗是空集。容许的秩不同时含 $2$ 与 $4$ 时可以有窗：沿用单步读数的 $\{1, 3, 7, 15\}$，窗包含 $[13, 17]$、含于 $(11.68872, 17.97989)$，这时最小割、最小度与固定数 $9$ 全部落在窗的下方，度 $14$ 至 $16$、平均度与谱中心落在窗内。两步读数下共同的秩只有 $15$，$\{1, 3, 7, 15\}$ 在这里是外加的选择（[两步读数下的共同秩与能级窗](https://github.com/the-omega-institute/trureturing-experiments/blob/6c0c783f5f6b1a0691611ae65607a3f018d4cebb/experiments/ch39-omega-research/replay/%E4%B8%A4%E6%AD%A5%E8%B4%A8%E9%87%8F%E8%AF%BB%E6%95%B0%E4%B8%8B%E5%AE%B9%E8%AE%B8%E7%A7%A9%E5%90%AB%E4%BA%8C%E4%B8%89%E5%9B%9B%E6%97%B6%E4%BA%94%E8%8D%B7%E4%B8%80%E8%87%B4%E7%9A%84%E4%B8%89%E4%BB%A3%E8%B4%B9%E7%B1%B3%E8%83%BD%E7%BA%A7%E7%AA%97%E4%B8%BA%E7%A9%BA%E8%80%8C%E5%85%A8%E7%8E%AF%E9%9D%A2%E5%85%B1%E5%90%8C%E4%B8%A4%E6%AD%A5%E5%88%86%E7%95%8C%E5%8F%AA%E5%89%A9%E7%A7%A915.md) · [区间证书](https://github.com/the-omega-institute/trureturing-experiments/blob/6c0c783f5f6b1a0691611ae65607a3f018d4cebb/experiments/ch39-omega-research/replay/ch39-two-step-three-generation-window.py)）。

若容许秩保留 $2$ 与 $3$，上方最近的竞争秩究竟可以多近？设它为 $R>3$。手工比较各秩的能量 $\sum_{j\le r}(h_{(j)}-\mu)$。逐项相减可见，秩 $3$ 胜过秩 $2$ 当且仅当 $\mu>h_{(3)}$，胜过秩 $R$ 当且仅当 $\mu<(h_{(4)}+\cdots+h_{(R)})/(R-3)$。质量按升序排列，前一条件也排除更小的秩，后一条件也排除更大的秩。在五荷、整张双钟环面及 $0\le\delta\le10^{-8}$ 上，区间证书给出 $h_{(3)}<16.4$，且第四至第七质量的均值大于 $17.5$。所以 $R\ge7$ 时，整个能级区间 $[16.4,17.5]$ 都可用。反过来，荷 $-4$ 在一处的第三质量超过 $16.28$，荷 $1$ 在双钟相位皆为 $1$ 处的第四至第六质量均值低于 $12.82$，同一个能级无法满足两端。由于右侧均值随 $R$ 不减，$R\le6$ 全部被排除。若 $3$ 已是最高容许秩，只需满足下界。 [区间复算与见证](https://github.com/the-omega-institute/trureturing-books/issues/1818#issuecomment-7238183105)

这两条全环面结论还可以完全不经过余弦与正弦来核验。把两只钟的相位当作单位圆上的自由点，用 Cayley 参数的两张图覆盖圆；球壳的固定边相位是代数数，$117$ 条非辐边中有 $114$ 条含无理平方根，分属 $20$ 个平方类，把它们换成分母为 $2^{30}$ 的有理点，并用整数平方根把由此带来的本征值误差精确控制在 $10^{-8}$ 以内。两条结论于是化为有理系数矩阵族的惯性命题，由三循环分块、舒尔补的惯性可加性与伯恩斯坦系数定号逐盒核验，全程只有整数与有理数运算。上面两处的界就取自这份证书：它覆盖整张实环面，端点的见证点又都取在有理联合相位上，所以无论对每个荷各自的有理相位量化，还是只对两只钟的有理联合相位量化，这些界都原样成立。费米能级落在 $(8.220648,\, 8.221)$ 或 $(10.6,\, 10.635617)$ 时是否仍一致选出三代，尚未判定。换一种证明没有改变结论的身份，它们仍是模型内定理（[精确有理证书](https://github.com/the-omega-institute/trureturing-experiments/blob/0382ed8bb2cd901b85f322063845a616acca1b88/experiments/ch39-omega-research/replay/%E9%92%9F%E7%9B%B8%E4%BD%8D%E5%8F%96%E5%9C%86%E4%B8%8A%E8%87%AA%E7%94%B1%E7%82%B9%E6%97%B6%E4%B8%A4%E6%AD%A5%E5%88%86%E7%95%8C%E5%8F%AA%E5%89%A9%E7%A7%A915%E4%B8%94%E5%8D%95%E6%AD%A5%E4%B8%89%E4%BB%A3%E7%AA%97%E5%8C%85%E5%90%AB%E5%85%AB%E7%82%B9%E4%BA%8C%E4%BA%8C%E4%B8%80%E8%87%B3%E5%8D%81%E7%82%B9%E5%85%AD%E5%B9%B6%E5%90%AB%E4%BA%8E%E5%85%AB%E7%82%B9%E4%BA%8C%E4%BA%8C%E9%9B%B6%E5%85%AD%E5%9B%9B%E5%85%AB%E8%87%B3%E5%8D%81%E7%82%B9%E5%85%AD%E4%B8%89%E4%BA%94%E5%85%AD%E4%B8%80%E4%B8%83%E5%9D%87%E6%9C%89%E7%B2%BE%E7%A1%AE%E6%9C%89%E7%90%86%E8%AF%81%E4%B9%A6.md) · [复算脚本](https://github.com/the-omega-institute/trureturing-experiments/blob/0382ed8bb2cd901b85f322063845a616acca1b88/experiments/ch39-omega-research/replay/ch39-rational-torus-shell-gap-certificates.py)）。

这三个轻态能直接充当[第八章](ch08-flavor-hierarchy-and-ckm.md)的三代味空间吗？在两只钟的全部允许相位上，任一单位轻态至少有八分之一的概率落在极点与三条射线首站之外。因此轻带与支撑在这四站上的味空间只有零向量相交。在第 $2\,306\,888\,100\,085$ 枚正零点，五种荷分别与四种三源空间配对，二十个正交投影全都满秩，但最小主夹角仍超过 $65.73^\circ$。即使把投影换成距离它最近的保长映射，上下夸克轻线得到的九个混合矩阵元的模也全部大于 $0.025$，超过参考上界 $|V_{ub}|\le0.003787$。把轻模数定为三之后，还须解释它们怎样耦合到夸克味空间。[轻带与三源的主夹角](https://github.com/the-omega-institute/trureturing-experiments/blob/5f3cbc15b521eb464c16e0b08dcca0c2fdf98cdf/experiments/ch39-omega-research/replay/ch39-native-band-gram-angles.py) · [保长映射与夸克混合](https://github.com/the-omega-institute/trureturing-experiments/blob/5f3cbc15b521eb464c16e0b08dcca0c2fdf98cdf/experiments/ch39-omega-research/replay/ch39-polar-light-band-ckm.py)

取支撑在这四站上的三个算术 Gram 源 $g_1,g_2,g_3$。对每种荷 $q$，在第一枚正零点的高度 $\gamma_1$ 对三个源施加 $F(L_q(\gamma_1))$，其中 $F(x)=1/(1+(x/9)^{512})$。对双钟的任意目标相位和 $0\le\delta\le10^{-8}$，把三个制备源正交投影到目标单步磁拉普拉斯的最低三态上，所得三列总能张成这一轻带，其最小奇异值大于 $1.36754\times10^{-5}$。若把这三列的奇异值直接读作夸克质量（每个部门可自选标尺），即使对三源作任意共同可逆换基，上、下部门最重与最轻质量比的商 $(m_t/m_u)/(m_b/m_d)$ 也小于 $9.874$，而 $1\,\mathrm{TeV}$ 的参考区间要求它大于 $128.56$。[三源滤波](https://github.com/the-omega-institute/trureturing-experiments/blob/d3cb0b4a94354155c551903735e34d1dc42640fd/experiments/ch39-omega-research/replay/ch39-first-zero-filtered-gram-sources.py) · [质量层级界](https://github.com/the-omega-institute/trureturing-experiments/blob/da61c6d00d968234d46c687971ca3ebcb9b87467/experiments/ch39-omega-research/replay/ch39-first-zero-relative-quark-spectrum.py) · [跑动质量参考区间](https://arxiv.org/html/2510.01312v2#Sx1.T2)

换一个共同制备背景，能同时恢复六个夸克质量和 CKM 混合吗？沿用上述三源与滤波器，在各自目标单步轻带的正交归一标架中把上、下型投影列记为 $A_u,A_d$。任一矩阵失秩便给出零质量。若两者可逆，共同换基在 $A_uA_d^{-1}$ 中消去，两部门各自的整体标尺也保留其奇异值 $j_1\le j_2\le j_3$ 的两个相邻比。在整个允许的共同制备域内，即使两部门独立选取目标轻带，$j_2/j_1$ 和 $j_3/j_2$ 至少有一个小于 $52.90$，而 $1\,\mathrm{TeV}$ 的质量与混合参考窗分别要求它们大于 $77.12$ 和 $61.32$。若两部门各选连续制备相位并在各自的制备背景上读取，按目标校准相位、共同换基和部门标尺就能精确达到六质量及带号 CKM 的中心值。对应到实际零点，上型取第 $2\,345\,666$ 枚、下型取第 $964\,890$ 枚正零点，按数据校准任意可逆的共同复换基与两个独立正标尺后，无论只拟合六个 Yukawa 耦合和三个 CKM 混合角，还是再计入带号 CP 相位，各项相对参考中心的绝对偏差除以各自半宽后的最大值，最小都约为 $5.7433945\%$。让两个编号各自在中心前后 $64$ 号内变化，每个部门在自己的制备壳上读出并逐对校准共同换基和部门标尺，$16\,641$ 对中有 $97$ 对能达到六质量窗，再要求最小混合角 $\theta_{13}$ 入窗就只剩中央对。即使可逐对另选两个目标轻带，十项同时入窗的仍只有这一对。复共轭保留质量和相对奇异谱，却翻转 Jarlskog 不变量的符号，因此这项校准仍需输入 CP 方向。[共同背景的相邻比界](https://github.com/the-omega-institute/trureturing-experiments/blob/313876c5c32cb7dc5a40161c6108581f582ca5e2/experiments/ch39-omega-research/replay/ch39-moving-preparation-quark-shape.py) · [独立制备的中心解](https://github.com/the-omega-institute/trureturing-experiments/blob/0952a5c729475f341f367b3ffe731dfcd099301b/experiments/ch39-omega-research/replay/ch39-independent-preparation-quark-target.py) · [CP 符号辨识](https://github.com/the-omega-institute/trureturing-experiments/blob/977f4ebfc50aa2b6ea73dae7fbd7e17ed5114d7d/experiments/ch39-omega-research/replay/ch39-relative-spectrum-ckm-reconstruction.py) · [实际零点对与邻号唯一性](https://github.com/the-omega-institute/trureturing-experiments/blob/fa54e8191067267e884e04f5f6897efefe4cbf23/experiments/ch39-omega-research/replay/%E5%AE%9E%E9%99%85%E5%A4%B8%E5%85%8B%E9%9B%B6%E7%82%B9%E5%AF%B9%E5%9C%A8%E5%89%8D%E5%90%8E%E5%85%AD%E5%8D%81%E5%9B%9B%E5%8F%B7%E7%BB%84%E5%90%88%E4%B8%AD%E7%9A%84%E5%94%AF%E4%B8%80%E6%80%A7.md) · [九项与十项的最优校准精度](https://github.com/the-omega-institute/trureturing-experiments/blob/d0c5ab50ebaf763fea12e2629cb6760205448f08/experiments/ch39-omega-research/replay/%E4%B8%A4%E4%B8%AA%E6%8C%87%E5%AE%9A%E9%9B%B6%E7%82%B9%E4%B8%8A%E5%A4%B8%E5%85%8B%E4%B9%9D%E9%A1%B9%E4%B8%8E%E5%8D%81%E9%A1%B9%E7%9A%84%E6%9C%80%E4%BD%B3%E5%90%8C%E6%97%B6%E6%8B%9F%E5%90%88%E7%B2%BE%E5%BA%A6.md)

若改用壳的三个轻能量选编号，在每个三循环字符块取最低能量 $e_{q,j}(n)$，两部门对所有正零点编号 $n$ 分别最小化同一非常数实多项式给出的 $\sum_{j=0}^{2}f(e_{q,j}(n))$。即使允许并列，要让两枚中央编号各自达到全局最小，$f$ 的最低次数也恰为十二。取六个目标能量的指定有限小数近似 $a_i$，所得有理系数多项式 $f(t)=\prod_{i=1}^{6}(t-a_i)^2$ 使上型与下型的中央编号各自成为本部门唯一的全局极小点。两钟相位置零、辐边权取一，在每个含三站轨道的循环不变子集上，以主子块或诱导图的三个字符最低能量为参考根。上下型共有 $63\,504$ 种配对。对每一对，都有一枚竞争零点，在六根各自偏移至多 $1/200$ 的整个闭盒内，其完整软化壳作用比本部门目标低 $112$ 以上。固定一组十二种配方及其全部参考根，只按目标校准正有理权重，就能使上下型中央编号及其各自前后邻号组成的九对中的任意一对，在各自部门的全体正零点中唯一取到最小作用。若上下型各自从全部 $126$ 个子集中独立均匀抽取，只要边界约定与子集选择独立，上型第 $24\,685$ 枚的平均作用就低于上型中央编号。要复现每对编号各自的校准多项式（容许相差常数），可问在几何类内等权抽样之外，至少须用多少概率直接指定子集对。中央配对约需 $0.01654324\%$，在两部门各取中央及前后各两枚的 $25$ 对中唯一最低，预登记的外圈 $16$ 对均高于它。固定同一个已校准的复源、制备算子和两个部门标尺，上型改用第 $27\,804\,036$ 枚、下型仍用第 $964\,890$ 枚，所需比例就严格低于中央，且六个夸克质量、三个 CKM 混合角和 CP 相位到各自参考中心的偏差都小于对应半宽的 $1/8$。按重数计的零点正纵坐标上，双钟等分布还保证存在满足这两项条件、两枚零点高度都可任意大的配对。若允许三个轻能量之间出现对称交叉项，也允许其他编号并列，则共同实对称多项式所需的最低总次数是四，达到该次数的构造用两个目标的能量总和校准。[十一次及以下的排除](https://github.com/the-omega-institute/trureturing-experiments/blob/5434b34bb36e0b45997a48bd7c1dcc1081fabbdd/experiments/ch39-omega-research/replay/%E4%B8%A4%E4%B8%AA%E5%A4%B8%E5%85%8B%E9%9B%B6%E7%82%B9%E5%85%B1%E5%90%8C%E5%8F%96%E5%BE%97%E5%8F%AF%E5%8A%A0%E8%B0%B1%E4%BD%9C%E7%94%A8%E5%85%A8%E5%B1%80%E6%9C%80%E5%B0%8F%E7%9A%84%E6%9C%80%E4%BD%8E%E6%AC%A1%E6%95%B0.md) · [十二次有理构造与唯一性](https://github.com/the-omega-institute/trureturing-experiments/blob/1e1b690191e430c95bc87a0663bd532914fdf17a/experiments/ch39-omega-research/replay/%E5%8D%81%E4%BA%8C%E6%AC%A1%E6%9C%89%E7%90%86%E8%B0%B1%E4%BD%9C%E7%94%A8%E5%9C%A8%E5%85%A8%E4%BD%93%E9%9B%B6%E7%82%B9%E4%B8%AD%E5%94%AF%E4%B8%80%E9%80%89%E5%87%BA%E4%B8%A4%E6%9E%9A%E5%A4%B8%E5%85%8B%E7%BC%96%E5%8F%B7.md) · [允许对称交叉项时的最低总次数](https://github.com/the-omega-institute/trureturing-experiments/blob/514b82caf47eb3fc7e5802097da011c73aedf456/experiments/ch39-omega-research/replay/%E5%85%81%E8%AE%B8%E4%B8%89%E4%B8%AA%E8%BD%BB%E8%83%BD%E9%87%8F%E4%BA%A4%E5%8F%89%E6%97%B6%E5%85%B1%E5%90%8C%E6%9E%81%E5%B0%8F%E7%9A%84%E6%9C%80%E4%BD%8E%E6%80%BB%E6%AC%A1%E6%95%B0.md) · [子图权重与九个可选配对](https://github.com/the-omega-institute/trureturing-experiments/blob/1c85262bb02c0eda3bdfe2417b844d0ac2693894/experiments/ch39-omega-research/replay/%E5%8E%9F%E5%A3%B3%E5%AD%90%E5%9B%BE%E4%BD%9C%E7%94%A8%E7%9A%84%E5%8D%95%E4%B8%80%E9%85%8D%E6%96%B9%E4%B8%8E%E6%AD%A3%E6%9D%83%E6%B7%B7%E5%90%88.md) · [指定子集的最小概率与近邻比较](https://github.com/the-omega-institute/trureturing-experiments/blob/346ea0a3e9b196486a7f7ba1e3c4e3b4cf3e69ab/experiments/ch39-omega-research/replay/%E6%8C%89%E8%BD%A8%E9%81%93%E8%BA%AB%E4%BB%BD%E9%85%8D%E9%87%8D%E7%9A%84%E6%9C%80%E5%B0%8F%E6%A6%82%E7%8E%87%E4%B8%8E%E5%8D%81%E5%85%AD%E7%BB%84%E7%95%99%E5%87%BA%E6%A3%80%E9%AA%8C.md) · [冻结十项读出后的任意高低费用配对](https://github.com/the-omega-institute/trureturing-experiments/blob/99d2dfdc981e39188b389241e6adfa814282d956/experiments/ch39-omega-research/replay/%E5%86%BB%E7%BB%93%E5%A4%B8%E5%85%8B%E5%8D%81%E9%A1%B9%E8%AF%BB%E5%87%BA%E5%90%8E%E4%BB%8D%E6%9C%89%E4%BB%BB%E6%84%8F%E9%AB%98%E7%9A%84%E4%BD%8E%E8%B4%B9%E7%94%A8%E7%BC%96%E5%8F%B7%E5%AF%B9.md)

**三能量的孤立极小值（`ARGUED`）。** 若要求同一实对称多项式在整个实能量空间非负，且零点恰为两组三能量的所有排列，最低总次数是六。写 $S_1,S_2,S_3$ 为三个基本对称多项式，在能量变量中的次数依次为 $1,2,3$。次数至多五的作用对 $S_3$ 至多是仿射函数。每组目标的三个能量互异，因此从能量到 $(S_1,S_2,S_3)$ 的 Vandermonde 雅可比可逆。在目标附近固定 $S_1,S_2$，$S_3$ 可以向两侧改变。仿射函数若在这段区间内非负且在内点为零，就在整段为零，无法给出孤立零点。设两组目标的能量和为 $a,b$，对 $j=2,3$，令 $L_j$ 线性插值两组目标的 $(S_1,S_j)$。六次作用

$$
[(S_1-a)(S_1-b)]^2+[S_2-L_2(S_1)]^2+[S_3-L_3(S_1)]^2
$$

的零点由三个基本对称量确定，恰是目标能量的排列。只在实际零点编号上要求唯一时，已知的总次数范围为四至六。

在这两个零点各自的制备壳上读取，取正交三源坐标中的两个 Gram 矩阵 $U=A_u^*A_u$ 和 $D=A_d^*A_d$，则要用它们的厄米多项式直接给出正定源协方差 $S=KK^*$ 并使十项同时入窗，最低次数是二。若再固定原校准的部门标尺并要求精确重现原换基给出的十项读数，恰有四个不同的二次协方差满足条件，每个解中 $i(UD-DU)$ 的系数都非零。若每个矩阵乘积与它的反序乘积共用一个实系数，重现同一组精确读数的最低次数是三，全部三次协方差解构成两条互不相交的光滑闭曲线。[最低次数](https://github.com/the-omega-institute/trureturing-experiments/blob/7f7156132c22c3c1194c770cf0f773b2ee23cf88/experiments/ch39-omega-research/replay/%E4%B8%A4%E4%B8%AA%E5%A4%B8%E5%85%8B%E5%AE%9E%E9%99%85%E9%9B%B6%E7%82%B9%E7%9A%84%E6%9C%80%E4%BD%8E%E4%BA%8C%E6%AC%A1Gram%E5%A4%9A%E9%A1%B9%E5%BC%8F.md) · [四个协方差](https://github.com/the-omega-institute/trureturing-experiments/blob/7f7156132c22c3c1194c770cf0f773b2ee23cf88/experiments/ch39-omega-research/replay/%E5%9B%BA%E5%AE%9A%E4%B8%A4%E9%9B%B6%E7%82%B9%E5%8D%81%E9%A1%B9%E8%AF%BB%E6%95%B0%E6%81%B0%E6%9C%89%E5%9B%9B%E4%B8%AA%E5%8E%84%E7%B1%B3%E4%BA%8C%E6%AC%A1%E6%BA%90%E5%8D%8F%E6%96%B9%E5%B7%AE.md) · [实系数下的三次解](https://github.com/the-omega-institute/trureturing-experiments/blob/7957c7a1c405c8248edde2c8afc7de3afbd136b9/experiments/ch39-omega-research/replay/%E5%9B%BA%E5%AE%9A%E5%8D%81%E9%A1%B9%E8%AF%BB%E6%95%B0%E6%97%B6%E5%AE%9E%E7%B3%BB%E6%95%B0%E4%B8%89%E6%AC%A1%E6%BA%90%E7%9A%84%E4%B8%A4%E6%9D%A1%E9%97%AD%E6%9B%B2%E7%BA%BF.md)

在上述实系数约束下，二次协方差可以让六个夸克质量同时入窗，但再要求最小混合角 $\theta_{13}$ 入窗就排除了整个二次族，即使允许各部门任选正标尺。在同一对制备背景上，若令单个振幅 $X$ 为 $U,D$ 的至多二次复系数多项式，则每个三阶半正定协方差都可写成 $S=XX^*$，因此要预测质量与混合，仍须由作用量独立于目标数据确定系数。[六质量与一个混合角](https://github.com/the-omega-institute/trureturing-experiments/blob/20621e8c850a1b22e863fd009c702edde8139d2d/experiments/ch39-omega-research/replay/%E5%85%AD%E8%B4%A8%E9%87%8F%E4%B8%8E%E4%B8%80%E4%B8%AA%E6%B7%B7%E5%90%88%E8%A7%92%E6%8E%92%E9%99%A4%E5%85%A8%E9%83%A8%E5%AE%9E%E7%B3%BB%E6%95%B0%E4%BA%8C%E6%AC%A1%E6%BA%90.md) · [二次振幅的因子分解](https://github.com/the-omega-institute/trureturing-experiments/blob/78e2205080b6770d57f6a429328e7af9a3582ebc/experiments/ch39-omega-research/replay/%E5%8D%95%E4%B8%AA%E4%BA%8C%E6%AC%A1%E6%8C%AF%E5%B9%85%E5%A4%8D%E7%8E%B0%E5%A4%B8%E5%85%8B%E6%BA%90%E5%B9%B6%E5%9C%A8%E5%85%A8%E9%83%A8%E8%BF%91%E9%82%BB%E4%BF%9D%E6%8C%81%E6%AD%A3%E5%AE%9A.md)

这个三阶例子恰在一个余维界上。七个词 $I,U,D,U^2,UD,DU,D^2$ 在这对制备上复线性无关，在九维矩阵空间中留下两个独立的复约束。一般地，设振幅有 $m$ 行、$n$ 列。手工推导表明，只要允许的复线性子空间的复余维至多为 $n-1$，每个秩至多为 $n$ 的 $m$ 阶半正定源都有振幅因子，即使源是奇异的。右乘酉矩阵保持 $XX^*$ 不变，这一自由度足以同时满足这些约束。再多一个约束便可能漏掉指定的非零目标 $S$：取 $u^*Su>0$，要求 $u^*X=0$ 恰好给出 $n$ 个独立复约束，却使 $u^*XX^*u=0$。零源总可取 $X=0$，而超过 $n$ 的秩已超出振幅的列数。[余维界的变分推导](https://github.com/the-omega-institute/trureturing-books/issues/1617#issuecomment-7230510590) · [矩形因子](https://github.com/the-omega-institute/trureturing-books/issues/1617#issuecomment-7230517942)

**七个词的条件数（`ARGUED`）。** 从振幅反求七个系数时，误差会放大多少？先固定各词的尺度，令 $u=U/\operatorname{tr}U$、$d=D/\operatorname{tr}D$，以 $Wc$ 表示系数为 $c\in\mathbb C^7$、按 $I,u,d,u^2,ud,du,d^2$ 排列的振幅。系数取欧氏范数，振幅取 Frobenius 范数。在上型第 $2{,}345{,}666$ 个零点与下型第 $964{,}890$ 个零点的两个制备盒内，$W$ 的最小奇异值大于 $0.000155736$，最大与最小奇异值之比介于 $17092.48$ 与 $17092.53$ 之间。用区间包住七个词，再对舍入后的词计算Gram 矩阵，以精确的行列式符号即可核对这些界。因此，词空间中两个振幅的系数差满足 $\|\Delta c\|_2\le\|\Delta X\|_F/\sigma_{\min}(W)$。给定协方差后，每个容许因子 $X=Wc$ 都满足 $\|c\|_2\le\sqrt{\operatorname{tr}S}/\sigma_{\min}(W)$，因为 $\|X\|_F^2=\operatorname{tr}S$。协方差仍允许每个非零因子取任意整体相位。[条件数证书与推导](https://github.com/the-omega-institute/trureturing-books/issues/1771#issuecomment-7236486034)

这个估计还给出了所有半正定源都能分解的邻域。在同一组源坐标内扰动 $u,d$，使各自的 Frobenius 误差至多为 $\eta$，并保持半正定且迹为一。各矩阵的算子范数都至多为一，由 $a'b'-ab=(a'-a)b'+a(b'-b)$，每个二次词的误差至多为 $2\eta$。两个一次词与四个二次词合起来给出 $\|W'-W\|_{\mathrm{op}}\le\sqrt{2+4\cdot 2^2}\,\eta$。对单位系数向量取最小值，就得到最小奇异值变化的同一个上界。也可把正奇异值看作对角块为零、非对角块为 $W,W^*$ 的厄米矩阵的本征值，应用[厄米矩阵的本征值扰动界](lean:D5/S3/SpectralTopology/HermitianEigenvaluePerturbation.abs_eigenvalues0_sub_le_norm)。当 $\eta\le 3.67\times10^{-5}$ 时，七个词仍然线性无关，所张空间的复余维仍为二，因而上述分解论证也覆盖奇异的目标源。

若约束只要求实线性，二阶振幅的统一保证是三个实约束。设 $S=TT^*\succeq0$。任意因子 $X$ 与 $T$ 有相同的行 Gram 矩阵，行张成空间之间的等距映射可扩张为整个空间上的酉变换，所以 $X=TU$，也涵盖奇异的 $S$。取 $\det U$ 的一个单位复数平方根，可写 $U=(c+is)Q(z,w)$，其中 $c^2+s^2=1$，$Q$ 的两行为 $(z,w)$ 和 $(-\bar w,\bar z)$，且 $|z|^2+|w|^2=1$。用 $q\in\mathbb R^4$ 表示 $z,w$ 的实坐标。若 $F$ 汇集实约束，记 $Aq=F(TQ)$、$Bq=F(iTQ)$。三个约束至多使 $A$ 有三行，取其任意非零核向量归一化，就得到一个因子。对任意指定的非零 $S$，取 $v^*Sv>0$。条件 $v^*X=0$ 给出四个独立的实约束，并将 $v^*XX^*v$ 强制为零，因此三个的保证是锐的。$S=0$ 总可取 $X=0$。

恰有四个实约束时，给定 $S$ 能否实现，等价于齐次式 $\det(cA+sB)$ 在实投影直线上是否有根。以 $s/c$ 为仿射坐标时还须检查 $[0:1]$。将根的代表 $(c,s)$ 和对应的非零核向量 $q$ 各自归一化，便可重构因子。若 $S=uu^*$ 且 $u\ne0$，所有因子可写成 $X=uv^*$，其中 $\|v\|=1$，此时只须判断实线性映射 $v\mapsto F(uv^*)$ 的秩是否小于四。此时行列式要么恒为零，要么对所有实投影点都非零。以 $S=I$ 为例，选取 $T=I$。规定第一行全为零给出行列式 $(c^2+s^2)^2$，没有实投影根。规定四个元素的虚部都为零则允许 $X=I$，对应 $[c:s]=[1:0]$。[实约束锐界与行列式判据](https://github.com/the-omega-institute/trureturing-books/issues/1630#issuecomment-7230975830)

在这两个零点的原制备区间内，要用多少个壳算子的谱来制备六个夸克质量？令 $R$ 表示壳的坐标三循环 $(x,y,z)\mapsto(y,z,x)$，将 $i(R-R^*)$ 和极点的坐标投影压缩到三源空间，分别记为 $H,P$。每个部门用三个正质量平方之和除以这三个平方的几何平均数，便可消去部门标尺。六个 $1\,\mathrm{TeV}$ 质量参考窗要求上型与下型两项之比超过 $75.43$。只用非零实线性组合 $aH+bP$ 选源时，即使将与不同组合对易的半正定源按正权混合，这个比值也小于 $34$。加入 $H^2$ 后，取 $L\in\operatorname{span}_{\mathbb R}\{P,H,H^2\}$。与单个非零 $L$ 对易的半正定源仍无法达到六个窗，即使允许重本征空间内有任意复相干。按质量校准两个方向、谱权与部门标尺，就能使六项同时入窗，所得 $S=f_1(L_1)+f_2(L_2)$ 的两项都是正定谱函数。在六质量入窗、CP 相位自由时，极点与壳三循环所定的实对称源能同时拟合的混合角对只有 $\{\theta_{12},\theta_{13}\}$，因此三个角无法全部入窗。在这对实际零点上，增添一个纯虚厄米方向 $i[H,P]$ 并取实系数即可达到含带号 CP 相位的十项全局最优，固定下型标尺为一时恰有四个这样的最优协方差。[两项壳算子的迹比界](https://github.com/the-omega-institute/trureturing-experiments/blob/2741b3dda6d6ebbf0398291aad3347dd77f52673/experiments/ch39-omega-research/replay/%E5%85%AD%E4%B8%AA%E5%A4%B8%E5%85%8B%E8%B4%A8%E9%87%8F%E6%8E%92%E9%99%A4%E5%85%A8%E9%83%A8%E5%A3%B3%E4%B8%89%E5%BE%AA%E7%8E%AF%E4%B8%8E%E6%9E%81%E7%82%B9%E7%9A%84%E5%AE%9E%E5%8E%84%E7%B1%B3%E9%93%85%E7%AC%94%E8%B0%B1%E6%BA%90.md) · [两个谱方向的必要性与构造](https://github.com/the-omega-institute/trureturing-experiments/blob/14bde35861a49cf9db6cdb15c2e47b8ef7d49ff8/experiments/ch39-omega-research/replay/%E4%B8%89%E9%A1%B9%E5%AE%9E%E5%A3%B3%E9%93%85%E7%AC%94%E6%BB%A1%E8%B6%B3%E5%85%AD%E8%B4%A8%E9%87%8F%E7%AA%97%E6%81%B0%E9%9C%80%E4%B8%A4%E4%B8%AA%E8%B0%B1%E6%96%B9%E5%90%91.md) · [实源可同时拟合的两个混合角](https://github.com/the-omega-institute/trureturing-experiments/blob/526fd479e652ec84adcf31c8a21e6ad770266f13/experiments/ch39-omega-research/replay/%E5%85%AD%E8%B4%A8%E9%87%8F%E6%9D%A1%E4%BB%B6%E4%B8%8B%E5%A3%B3%E5%AE%9E%E6%BA%90%E7%9A%84%E7%AC%AC%E4%BA%8C%E6%B7%B7%E5%90%88%E8%A7%92%E4%B8%8D%E8%83%BD%E4%B8%8E%E5%8F%A6%E4%B8%80%E4%B8%AA%E8%A7%92%E5%90%8C%E7%AA%97.md) · [四个十项最优源](https://github.com/the-omega-institute/trureturing-experiments/blob/2846e3d51e4c026377bd34278e3948559173509f/experiments/ch39-omega-research/replay/%E5%9B%BA%E5%AE%9A%E4%B8%A4%E9%9B%B6%E7%82%B9%E7%9A%84%E5%8D%95%E4%BA%A4%E6%8D%A2%E5%AD%90%E5%A3%B3%E6%BA%90%E8%BE%BE%E5%88%B0%E5%8D%81%E9%A1%B9%E5%85%A8%E5%B1%80%E6%9C%80%E4%BC%98.md)

不同荷的三维轻空间彼此之间又错开多少？旗舰零点上的读数见[第十三章](ch13-winding-ladder-and-joint-vacuum.md)的压力测试，它并不是那一个钟相位的偶然。按 $h$ 升序取前三个模作轻空间（在旗舰零点上与以 $h < 9$ 取轻模的读法一致；在环面上五种荷都不是处处恰有三个 $h < 9$ 的模），在整张双钟环面与全部辐边亏额上，每个荷的三个轻模恰在轮换特征标 $1, \omega, \omega^2$ 中各占一维：奇荷三条轻线的扇区标签处处固定，偶荷只有特征标 $1$ 的那条线在两个候选之间换手。两种荷之间按固定站点对应计的泄漏 $\Lambda(q, r) = 1 - \tfrac13 \operatorname{tr}(P_q P_r)$ 因此等于 $1$ 减去三个扇区夹角余弦平方的平均：奇荷与偶荷之间处处大于 $0.4$、小于 $0.65$；任意两荷之间处处至少 $0.001$，没有一个钟相位能让两种荷的轻空间重合。允许逐站调相与站点重排时，旗舰零点上给出 $31\%$ 的那个下界泛函在环面上别处可以低于 $0.3015$，不是一致下界；调相与重排后的泄漏在整张环面上的下确界尚未判定（[全环面上的跨荷轻空间泄漏](https://github.com/the-omega-institute/trureturing-experiments/blob/9c43576f64e505d1aacf5a19e3c21831d842fff3/experiments/ch39-omega-research/replay/%E4%BA%94%E8%8D%B7%E4%B8%A4%E6%AD%A5%E4%B8%89%E7%BB%B4%E8%BD%BB%E7%A9%BA%E9%97%B4%E5%9C%A8%E5%85%A8%E9%92%9F%E7%9B%B8%E4%BD%8D%E7%8E%AF%E9%9D%A2%E4%B8%8A%E6%AF%8F%E4%B8%AA%E8%BD%AE%E6%8D%A2%E7%89%B9%E5%BE%81%E6%A0%87%E5%90%84%E5%8D%A0%E4%B8%80%E7%BB%B4%E5%A5%87%E5%81%B6%E8%8D%B7%E9%97%B4%E6%B3%84%E6%BC%8F%E5%A4%84%E5%A4%84%E5%A4%A7%E4%BA%8E%E9%9B%B6%E7%82%B9%E5%9B%9B%E8%80%8C%E4%BB%BB%E6%84%8F%E4%B8%A4%E8%8D%B7%E9%83%BD%E4%B8%8D%E9%87%8D%E5%90%88.md) · [区间证书](https://github.com/the-omega-institute/trureturing-experiments/blob/9c43576f64e505d1aacf5a19e3c21831d842fff3/experiments/ch39-omega-research/replay/ch39-torus-cross-charge-light-leakage.py)）。

把固定分界 $9$ 与内禀站点方差最小割 $T = 9 + (1 - \delta)^2$ 放到真实黎曼零点序列的**两步质量读数** $h_{q,j} = |\lambda_j(L_q)(\lambda_j(L_q) - c)|$ 上正面交锋，二者的物理差异马上水落石出。在十九点图中，按“(顶点度数, 软辐边数)”统计，顶点分布依次为 $(10, 0):3$、$(10, 1):3$、$(14, 0):3$、$(16, 0):6$、$(18, 0):3$ 与 $(18, 3):1$；度为 $d$ 且带 $k$ 条软边的顶点给出跨界平方权和 $d - k + k(1 - \delta)^2$，故三个受软化的十度外点同时取到最小割 $T = 9 + (1 - \delta)^2$。对全体实际正零点有 $0 < \delta < (23/25)2^{-20}/14^2$，于是 $9.99999999 < T < 10$。

::: {.example #ex-ou-ch07-cutoff-comparison title="零点 #8236、#8359 与 #148341 在两步质量读数下的固定分界 9、最小割 T 与双态投影逐项对账"}
在两步无量纲质量读数 $h_{q,j} = |\lambda_j(L_q)(\lambda_j(L_q) - c)|$（$c = 15 - \delta/3$）与原十六重标量两圈强耦合窗 $[0.117, 0.119]$、四层曲率窗 $[0.998, 1.002]$ 下，三枚关键实际正黎曼零点清晰暴露了三套分界口径的边界差异（[`ch39-first-native-cut.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-first-native-cut.py)、[`ch39-neutral-site-variance-gap.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-neutral-site-variance-gap.py)、[`ch39-conjugate-site-projection-gap.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-conjugate-site-projection-gap.py)）：

| 零点编号 | 两步谱在固定分界 $9$ 下表现 | 两步谱在内禀最小割 $T = 9 + (1-\delta)^2$ 下表现 | 物理窗读数与结构注记 |
| :---: | :--- | :--- | :--- |
| **#8236** | 荷六第三两步质量落在 $(9, T)$，未通过分界 $9$ | **最小割首枚三窗命中**（$\gamma \approx 8354.9185$） | $\max_q h_{q,3} \approx 9.2061 < T < 10.5855 \approx \min_q h_{q,4}$；$\alpha_s \in (0.118306, 0.118312)$；曲率比 $\approx 1.000938$ |
| **#8359** | **分界 $9$ 首枚三窗命中**（前 $8192$ 枚中 $67$ 枚三模但 $0$ 枚三窗） | 通过（居中方盒与原三窗零点的共同两步间隙皆含 $[9, 10.19]$） | 扩充至正负荷双态共轭实投影时，**荷二仅余两模** |
| **#148341** | 荷六两步谱仅剩两模低于 $9$，被分界 $9$ 淘汰 | **被最小割挽救**：五荷各三模且过另两窗 | $\max_q h_{q,3} \approx 9.4749 < T < 10.5917 \approx \min_q h_{q,4}$；两钟角距 $\approx 0.2315\,\mathrm{rad}$，六面味坐标 $\approx 0.9722$ |

这两个零点把谱投影与另两窗的作用分开。令 $P_q(a)$ 投影到两步质量严格小于 $a$ 的模。因为 $T>9$，从 $P_q(9)$ 换到 $P_q(T)$ 恰好纳入质量落在 $[9,T)$ 的模。在第 $8359$ 枚零点，五种荷的共同谱隙覆盖这段区间，两个分界给出完全相同的五个投影。在第 $8236$ 枚零点，荷六的第三个模落在 $(9,T)$，因而两个分界给出的轻谱不同。两种比较均沿用同一十六重标量表与四层曲率处方，所以在各自零点上强耦合和曲率的读数与分界选择无关。要检验手征分界会怎样反过来影响另两窗，需要按该分界选出的重场谱重新计算它们。

尤为警醒的是正负荷双态站点投影反例：在每个站点放入一对电荷 $(+q, -q)$ 并以 $U_{ij} = \operatorname{diag}(u_{ij}^q, \bar{u}_{ij}^q)$ 沿边输运，允许每站独立取非平凡复正交投影 $P_i \in M_2(\mathbb{C})$，其平方对易子能量 $E_q(P) = \frac{1}{2}\|[L_q \oplus L_{-q}, P]\|_{\mathrm{HS}}^2$ 在五种荷与全部双钟相位上的**极小值全部归零**！原因在于无钟三角形 $14 \to 0 \to 16 \to 14$ 的闭路相位 $u$ 对五个荷皆满足 $u^q \neq \bar{u}^q$，迫使与和乐对易的秩一投影精确锁在两根恒定电荷轴上。即使强加电荷共轭实结构 $J P_i J^{-1} = P_i$ 使极小值重返正数（荷六恰等于 $T$），把这条实投影规则用到 #8359 时仍会把荷二轻模从三减为二。
:::

这组对账说明，站点方差分界 $T$ 是一枚仅读原壳边权的简洁内禀量，它确实严格扩宽了三窗零点集合、把首枚见证前移到 #8236 并挽救了 #148341，但它本身仍是模型假设，而非在任意站点代数扩充下都纹丝不动的普适不变量。在下面的交互实验卡中，读者可以沿高度轴 $\gamma$ 连续扫描单步磁拉普拉斯 $L_q$（无软化 $\delta = 0$）的五荷谱，拖动谱分界 $\Lambda$ 并与站点方差线 $T = 10$ 正面比对。

::: {.viz src="behrend-unification-lab" preset="three-gen-gap" height="500"}
**十九点球壳五荷谱隙与站点方差分界实验卡（`three-gen-gap`）。** 沿高度时间轴 $\gamma$ 连续扫描五种超荷 $q \in \{1, 2, -3, -4, 6\}$ 的单步磁拉普拉斯 $L_q$ 全谱（纵轴在 $7 \le \lambda \le 11.5$ 区间放大；青色三轻模恒低于 $8.685$ 且按 $(1, \omega, \omega^2)$ 循环特征标各占一模，紫色重模恒高于 $9.6$），自由拖动谱分界 $\Lambda$ 并对照未软化站点方差线 $T = 10$（例如在 $\gamma_3 \approx 25.01$ 处，$q = -4$ 扇区的第四模已落入 $T = 10$ 之下——对照模式下以品红色高亮——但仍稳居共同谱隙 $(8.685, 9.6)$ 与 $\Lambda = 9$ 之上）。
:::

## 7.2 四维格点手征外尔构造、边界伙伴与味色散匹配 {#sec-ch07-4d-lattice-weyl}

内部球壳上的三个正本征值绝不自动等同于四维手征外尔费米子。首先横着一条硬限制：如果正权磁拉普拉斯自身提供荷一零模，那么所有整数荷的平行输运都可以同时规范化为平坦，彻底丧失非平凡磁通。因此，必须区分**内部边界手征零模**与**四维格点重叠手征算子**两条显式升维路径。

### 7.2.1 三射线单侧边界伙伴、钟边覆盖与零陈数

在内部球壳侧，几何拓扑给出了清晰的低模读取结构：

- **三射线单侧边界伙伴**：十九点壳上存在三条最小分母射线；对每类标准模型表示，在三条射线的首站缺去一侧手征伙伴后，精确留下**三个同手征内部零模**。
- **唯一三站点覆盖与零陈数**：三条射线首站恰是球壳全部钟边的**唯一最小三站点顶点覆盖**；随着两只钟绕遍整个相位环面 $\mathbb{T}^2$，三条低模循环特征标线丛的第一陈数严格为 **$(0, 0, 0)$**，意味着低模纤维丛在钟环面上整体平凡、无拓扑缠绕障碍。
- **外端三点轨道读出与内站盲相位**：每组三条时钟边的外端轨道均能在全相位域稳定独立地读出全部三个轻态，重构矩阵的逆放大因子严格小于 $4$；相反，三条内射线首站上存在使某一轻模完全不可见的“盲相位”。

### 7.2.2 五步单纯形重叠核、十九点壳升维与有限程味匹配

进入真正的四维欧氏格点时，常数通量共用的有理度量是 $g = I - J/5$（该度量将在[第十章](ch10-regge-gravity-and-spin2.md)同样充当四维单纯形雷吉引力的平直底座）。在这一度量上构造**五步单纯形威尔逊—重叠核**（[`ch39-simplex-overlap.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-simplex-overlap.py)）：

1. **三物种自由质量窗**：当威尔逊调节器质量 $m$ 落在区间

   $$
   \frac{25 - 5\sqrt{5}}{4} \;<\; m \;<\; \frac{7}{2}
   $$

   之内时，自由核恰好给出**三个同手征定向的外尔物种**，其重叠核的统一谱隙精确等于 $m$ 到最近窗口端点的距离（在格盒边长为 $30$ 的倍数时取到）。
2. **光滑磁通的普法夫指数律**：对严格闭合的五步核（负对角步取四条坐标链的逆积），取 $m = 139/40$，只要有限周期盒上单位荷方格的主转数全都至多为 $2^{-29}$，手征指数便严格等于

   $$
   I = -3\operatorname{Pf}(C),
   $$

   其中 $C$ 为六个整数磁通组成的 $4 \times 4$ 反对称矩阵（[`ch39-smooth-flux-index.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-smooth-flux-index.py)）。例如两面单位磁通精确给出 $I_{\bar{\mathbf{5}}} = -6$、$I_{\mathbf{10}} = -18$，且所有满足同一光滑界的对角规范场中，各 Cartan 行列式荷统统精确抵消。
3. **十九点壳升维为四维重叠核**：将十九点壳质量矩阵本身作为四维威尔逊质量项、令外部规范输运在十九分量间共用，小曲率规范场下**十九点壳的完整重叠指数恰为单份指数的三倍**，而其余十六个重层的手征指数全部为零。更进一步，零超荷磁通的小曲率弱扇区以及纯超荷的全部容许磁通扇区都拥有规范不变的三代外尔测度——甚至允许四维每个格点在零点 #11431 与 #133931 之间独立切换，仍保有同一测度与三倍指数！让两只钟分别沿不同空间轴各绕相位环面一周时，只要控制相邻格点的质量变化界，四维核在整个构型空间仍维持严格谱隙 **$> 0.008$**。这一升维核的局域性有显式常数：凡方格误差不超过 $1/200$，任一正零点常数壳的重叠核满足 $\|D(x, y)\| \le 1155\,e^{-0.001523793\,d(x, y)}$，测度构造中的加藤（Kato）输运项对两条相距 $d$ 的链的二阶变分，在一代十五个分量上合计不超过 $1.002 \times 10^{20}\,e^{-0.003047586\,d}$（变分范数取各表示中的最大值），常数与体积无关；四维各格在 #11431 与 #133931 之间任意切换时，率降到 $0.000850412$，前因子仍有限。这些界要到约 $2900$ 至 $25000$ 个格距之外才小于一，衡量的是谱隙仅约 $10^{-2}$ 时该估计方法的上界尺度，不是物理关联长度（[符号核与输运项的显式界](https://github.com/the-omega-institute/trureturing-experiments/blob/d2ca3fd9b24cc2591e2d49a308c04407fce60ee0/experiments/ch39-omega-research/replay/%E5%8D%81%E4%B9%9D%E7%82%B9%E5%A3%B3%E9%87%8D%E5%8F%A0%E6%A0%B8%E4%B8%8E%E6%B5%8B%E5%BA%A6%E8%BE%93%E8%BF%90%E9%A1%B9%E7%9A%84%E6%98%BE%E5%BC%8F%E6%8C%87%E6%95%B0%E5%B1%80%E5%9F%9F%E6%80%A7.md) · [常数证书](https://github.com/the-omega-institute/trureturing-experiments/blob/d2ca3fd9b24cc2591e2d49a308c04407fce60ee0/experiments/ch39-omega-research/replay/ch39-shell-overlap-kato-locality.py)）。

   完整测度流还包含参考测度的连接。它对两条不同链的二阶变分可分为反对称的曲率部分与对称部分，两者的身份不同。曲率部分只由手征投影决定，与参考测度的具体构造无关；这是测度项的可积性条件（文献结果，未在本书形式化：M. Lüscher，*Abelian chiral gauge theories on the lattice with exact gauge invariance*（1999），第 3.4 节，[10.1016/S0550-3213(99)00115-7](https://doi.org/10.1016/S0550-3213%2899%2900115-7)）。由此，参考连接的曲率等于终点三个标准重叠块的贝里（Berry）曲率，完整测度的曲率等于十九点壳投影的贝里曲率，加藤输运项的曲率恰为两者之差。曲率部分也有与体积无关的显式常数：凡方格误差不超过 $1/200$，参考连接的曲率在一代十五个分量上合计不超过 $2.606 \times 10^6\,e^{-0.15069244\,d}$，任一正零点常数壳的完整测度曲率不超过 $1.184 \times 10^{16}\,e^{-0.003047586\,d}$。对称部分则不由手征投影与容许性条件决定：在不限定局域范围的容许参考测度类中，给参考测度乘以一个局域的规范不变相位，就能把对称部分放大到任意倍，并使其衰减慢于任一给定的率。因此对称部分须对所选的参考测度构造另行估计（[曲率部分的显式界与对称部分的任意性](https://github.com/the-omega-institute/trureturing-experiments/blob/c9b3a7d9d302879ba9a8d632ed831bdb31cb1dc3/experiments/ch39-omega-research/replay/%E5%A4%96%E5%B0%94%E6%B5%8B%E5%BA%A6%E6%B5%81%E7%9A%84%E6%9B%B2%E7%8E%87%E9%83%A8%E5%88%86%E6%98%BE%E5%BC%8F%E6%8C%87%E6%95%B0%E5%B1%80%E5%9F%9F%E8%80%8C%E5%AF%B9%E7%A7%B0%E9%83%A8%E5%88%86%E5%8F%AF%E9%9A%8F%E5%8F%82%E8%80%83%E9%80%89%E6%8B%A9%E4%BB%BB%E6%84%8F%E6%94%BE%E5%A4%A7%E4%B8%94%E8%A1%B0%E5%87%8F%E4%BB%BB%E6%84%8F%E5%8F%98%E6%85%A2.md) · [常数证书](https://github.com/the-omega-institute/trureturing-experiments/blob/c9b3a7d9d302879ba9a8d632ed831bdb31cb1dc3/experiments/ch39-omega-research/replay/ch39-shell-measure-curvature-locality.py)）。对称部分里与相位选取无关的那一部分可以单独定出：它随相位的变动是相位泛函的海森矩阵，不随相位改变的是它的旋度，而旋度恒等于曲率的一阶导数；在凸的或单连通的场区域上，对称部分模去相位海森矩阵后的等价类由旋度完全决定，全局情形未判定。曲率导数同样有与体积无关的显式界：参考端点上，三条链的十五个分量合计不超过 $7.929 \times 10^7\,e^{-0.07534622\,P}$，$P$ 为三个基点的周长，对一切相位选取成立。在纯超荷切片上平凡场的一个凸邻域内，若取沿每条射线平行输运的定相，超荷方向的参考对称部分不超过 $2.434 \times 10^{12}\,e^{-0.11301933\,d}$；但这条定相规则规范不变当且仅当十五分量加权的手征密度在该邻域上恒为零，小格点上的数值迹象指向它不为零，尚未证明。所以这些界还不是任何容许参考测度的对称部分常数，对所选构造的显式常数仍待给出（[对称部分的相位无关部分与射线定相](https://github.com/the-omega-institute/trureturing-experiments/blob/69984f1cb28f4d691551bc34867ee203e243fd2e/experiments/ch39-omega-research/replay/%E5%87%B8%E7%89%87%E4%B8%8A%E5%A4%96%E5%B0%94%E6%B5%8B%E5%BA%A6%E6%B5%81%E5%AF%B9%E7%A7%B0%E9%83%A8%E5%88%86%E6%A8%A1%E7%9B%B8%E4%BD%8DHessian%E7%94%B1%E6%9B%B2%E7%8E%87%E5%AF%BC%E6%95%B0%E5%86%B3%E5%AE%9A%E4%B8%94%E7%BA%AF%E8%B6%85%E8%8D%B7%E5%87%B8%E7%89%87%E4%B8%8A%E7%9A%84%E5%B0%84%E7%BA%BF%E5%AE%9A%E7%9B%B8%E5%8F%82%E8%80%83%E9%83%A8%E5%88%86%E4%BB%A5%E7%8E%87%E9%9B%B6%E7%82%B9%E4%B8%80%E4%B8%80%E4%B8%89%E6%8C%87%E6%95%B0%E5%B1%80%E5%9F%9F.md) · [常数证书](https://github.com/the-omega-institute/trureturing-experiments/blob/69984f1cb28f4d691551bc34867ee203e243fd2e/experiments/ch39-omega-research/replay/ch39-measure-symmetric-part-ray-gauge.py)）。

然而，四维单纯形格上的三个轻锥并不天然享有三阶对称。在裸动能层面，三个物种的平移特征只允许交换共轭一对，而不支持十九点壳上的三阶坐标轮换，并且裸动能从二、三阶余动量展开起就区分三个中心。能否靠有限程改进把三锥色散拉平？答案是一套清晰的有限步分级结构（[`ch39-finite-taste-jets.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-finite-taste-jets.py)）：

- 仅用单步虚部的严格递增五次多项式，即可在整个三物种质量窗内配平三个轻锥的全部二、三阶色散并保留自由谱隙（五次最小；固定原威尔逊项时，四阶两个动量不变量留下不可消去的差）。
- 若要三个轻中心的**完整重叠算子**在相同余动量下匹配到 $K\ge1$ 阶，至多用 $2\lceil K/3\rceil$ 步。另一构造至多用 $\max(2,K-1)$ 步。对 $K=4,5$，三步均已足够。步数指极分解前核中五种基本平移及其逆的最长字长。$K=1,2,3$ 时最少恰需两步。单步核若配平三个非退化锥的线性项，必会产生额外的轻动量点。

记 $z_j=e^{i\theta_j}$、$u=\tfrac15\sum_j z_j$。两步动能向量 $Y_j=\operatorname{Im}(z_j\bar u)$ 在五个中心附近完全相同。可选择一个两步标量，使它在三个轻中心的展开到二阶均为零，在两个重中心取正值。取其 $n$ 次幂后，它在轻点附近只贡献 $O(|k|^{3n})$。记轻点处取负值的威尔逊标量为 $B$，归一化算子是 $Y/(-B)$ 的解析函数。由于 $Y=O(|k|)$，三个中心的完整算子匹配到 $3n$ 阶。在 $B$ 中加入中心移位不变的 $1-|u|^2$ 的适当倍数，可使其在其他动能零点均取正值。由自由环面的紧性可得统一正隙，将整个核乘以正整数即可达到原谱隙下界，且极分解所得的归一化算子相同。另用逐分量 Hermite 插值，奇数 $K$ 至多用 $3K$ 步、偶数 $K$ 至多用 $3K+1$ 步，即可在每个动量逐点控制核范数不低于原值。

要配平到五阶，标量在轻中心可以有非零曲率，只需三个轻中心的曲率及其余四阶以内的展开系数相同。一个显式三步构造取 $N=\sum_j z_j^2/5$、$c=\cos(2\pi/5)$、$t=2(1+c)$ 和 $f=-(t+6c)/(6t+28c)$，令
$$
 F=t-1+\Re\!\left(2tfu-t(1+f)u|u|^2-tfN\bar u-5fu^2+fN+(1+4f)u^3\right).
$$
$F$ 在三个轻中心取零，在两个重中心均取 $5(1+\sqrt5)/4$。傅里叶矩的精确复算给出轻中心共同的四阶展开。令 $B=-1+F+32(1-|u|^2)$，在 $Y$ 的线性项为 $k$ 的单位下，自由谱隙至少为 $1/200$，三个同定向轻锥的完整矩阵匹配到五阶。若动能向量在中心移位下不变，四阶与五阶的最短作用程都是三步，六阶恰需四步。此时四阶匹配强制标量的三阶展开相同，而这对两步标量已强制五个中心同值。六阶匹配对三步标量施加的相应约束秩为七，已强制取平均后的轻重中心同值。即使允许任意动能向量，只要三个轻中心的威尔逊质量相等，四阶与五阶匹配仍恰需三步。对两步核，三次傅里叶矩恒等式迫使两个标量梯度差的正加权平方和正比于四维余动量的欧氏二次型。平方和的秩至多为二，故两个梯度差均须为零。此时四阶匹配又强制重中心与轻中心同号。因此一般两步解必须具有不全相等的轻中心质量，且零号中心的动能展开满足秩亏条件。固定五个中心质量后，这类标量落在一个余维至少为四的代数集合内。写 $b=-B$，给它加上 $t(\sin\theta_1+\cos\theta_1-\sin\theta_2-\cos\theta_2)$，五个中心的质量均固定。即使每个 $t$ 都另选动能向量，也至多有十二个实数 $t$ 能配平四阶。理由是一个四十八次行列式在每个可行点至少要有四重零点，才能容纳四个独立速度方向。更一般地，取 $\sum_j v_j=0$，给同一标量加上 $\sum_j v_j(\sin\theta_j+\cos\theta_j)$。即使同时改变四个独立权重，每个这样的四维族也只有有限多个候选。例外点上是否有解仍待确定。[构造、谱隙与精确秩检验](https://github.com/the-omega-institute/trureturing-experiments/blob/fe602dba36bfa75bd1e664c4e570947104ce8685/experiments/ch39-omega-research/replay/ch39-three-step-fifth-jet.md)

还可以单独检验一对轻中心。若威尔逊标量在这两点同值且梯度相同，动能三阶项之差就是二次型 $H$ 乘余动量 $x$。两步带电频率的三次幂张成十四维空间；四个分量同时满足这一限制，迫使 $H$ 正比于 $\sum_i x_i^2$。再比较置换平均后的四阶项，第三个轻中心也必须取相同质量，遂落入上述等质量障碍。因此，若恰有两个轻中心同质量，任何两步解都必须在这两点具有不同的标量梯度。[两中心的系数推导](https://github.com/the-omega-institute/trureturing-experiments/blob/6c8a495f532db3784728865920b7f1194566f057/experiments/ch39-omega-research/replay/ch39-three-step-fifth-jet.md#coinciding-scalar-first-jets-at-any-pair-of-light-centers)

质量不全相等时，三个轻中心的对数梯度 $d\log(-B)$ 也不能全相同。若它们相同，把每个中心的动能除以该点的正质量后，三阶差便是余动量乘一个二次型。分别对三坐标作交错和、对两对互不相交的坐标作交换投影，两组检验在十维二次型空间中均有秩九，迫使这个二次型正比于欧氏平方范数。此时可以对动能作置换平均；四阶系数对相位的要求与三个轻质量均为正相矛盾。这个限制也适用于三个中心共有同一个非零对数梯度的情形。[对数梯度与轻质量的相位条件](https://github.com/the-omega-institute/trureturing-experiments/blob/b4d8ad6e50863b86bc90688571f46b235f77ad84/experiments/ch39-omega-research/replay/ch39-three-step-fifth-jet.md#common-logarithmic-gradients-at-three-positive-light-masses)

还可以用两点的曲率检验质量。记 $m_s=-B_s(0)>0$，在各中心把标量除以自身的 $m_s$。若两个外侧中心的对数梯度相同，且归一化标量的二次项之差正比于 $\sum_i x_i^2$，则四阶配平要求 $m_0=(m_+^2+m_-^2)/(m_++m_-)$。例如两侧质量为 $1,2$ 时，中间质量必须为 $5/3$。对任意一对轻中心，若两点归一化标量的一阶、二阶项都相同，四阶配平会迫使三个质量全相等。[两点曲率的质量判据](https://github.com/the-omega-institute/trureturing-experiments/blob/51aa7b2469249f9640368fa776e45d9f771556bd/experiments/ch39-omega-research/replay/ch39-three-step-fifth-jet.md#a-mass-test-from-the-curvature-at-two-centers)

质量与梯度还有一个联合限制。令 $g_s=d(-B_s)(0)$。任何两步解都要求三个点 $(m_s,g_s)$ 仿射无关。若质量不全相等而 $g_s=g_*+m_s v$，取一个同时消去常数和质量的中心线性组合，它也消去梯度。三、四阶比较将质量差限制到一个例外比值；在该比值处，两个带电傅里叶矩阵的秩分别为 $20,99$，迫使带电动能系数具有置换对称性。取平均便得到梯度全为零、轻质量仍为正且不全相等的三个标量振幅，已被共同对数梯度的障碍排除。仿射无关时的完整四阶匹配仍然开放。[质量与梯度的联合限制](https://github.com/the-omega-institute/trureturing-experiments/blob/50902f50eecc74bcd202cb3e300afa8ac3cf7c7a/experiments/ch39-omega-research/replay/ch39-three-step-fifth-jet.md#the-wilson-gradient-contrasts-cannot-be-affine-in-the-mass-contrasts)

动量反演还给出一个锐的作用程界。若 $B(-\theta)=B(\theta)$，或动能向量满足 $Y(-\theta)=-Y(\theta)$，四阶配平的最短作用程都是三步。两种条件中的任意一个都会使外侧中心相对于中间中心的振幅比 $R_\pm(x)=B_\pm(x)/B_0(x)$ 满足 $R_+(x)$ 与 $R_-(-x)$ 的二阶展开相同，其中一阶项可以非零。取动能的反演奇部，二步频率在每个分量上只给出三十个正弦系数。三阶条件确定这些系数，剩下的两个四阶横向分量不能同时为零。上述三步构造同时具有两种反演性质。[反演条件与精确消元](https://github.com/the-omega-institute/trureturing-experiments/blob/7ec305604987e42d8047a24d57078f004be3da5d/experiments/ch39-omega-research/replay/ch39-three-step-fifth-jet.md#reflection-of-two-outer-amplitude-jets)

仿射无关的轻中心数据已可在有隙二步模型中实现。令 $\alpha=2\pi/5$、$\epsilon=\lambda=10^{-3}$，一个显式核给出 $m_s=1+\epsilon\sin(2s\alpha)$ 与 $g_s=-\lambda\epsilon\cos(2s\alpha)(x_1-x_2)$。两端质量不同，梯度相同且与中间梯度不同，故三组数据仿射无关。自由谱隙至少为 $1/300$，恰有三个正定向轻中心。三个完整矩阵匹配至三阶，因此标量色散匹配至四阶。固定此标量，仅比较中间与任一外侧轻中心的完整四阶展开，再加上五个中心的动能零值，便在全部 $61$ 个二步频率上给出满列秩：重选动能也无法使这一对达到完整四阶匹配。[显式二步核、全环面谱隙与两点秩检验](https://github.com/the-omega-institute/trureturing-experiments/blob/95d40941c33bb2a8a930d4b0fdba3ba2e372885c/experiments/ch39-omega-research/replay/ch39-three-step-fifth-jet.md#a-gapped-example-with-affinely-independent-light-data)

甚至在选取标量曲率之前，一般的一阶数据就已排除四阶配平。固定三个轻质量及两个相对振幅 $b_\pm/b_0$ 的梯度，把未知的二步动能系数、相对标量二次项和共同速度尺度代入三阶比较，得到 $300\times265$ 的矩阵。若其秩为 $263$，所有三阶解均由两个共轭复解生成。实动能必须同时使用二者，而四阶横向项的消去要求它们在两端的二次振幅均相等，这与三个正质量不全相等矛盾。故候选只可能出现在秩至多为 $262$ 处。在质量各异的情形，以及每一种恰有两质量相等的情形中，这都是一阶数据空间的真代数子集；其中是否有解仍开放。[三阶矩阵、四阶差项与精确子式](https://github.com/the-omega-institute/trureturing-experiments/blob/e6589f0e8cb29f58a4beb1fea1d439ad27e164be/experiments/ch39-omega-research/replay/ch39-three-step-fifth-jet.md#a-cubic-rank-test-using-only-light-masses-and-gradients)

相同的精度也约束最短作用程。在五个中心连续三轻、其余两个重中心的标量色散均为四时，任一有隙的平移不变实标量与克利福德向量核，若配平完整算子，必须有 $12r\ge 2K+7$；只配平标量色散也须有 $24r\ge 2K+10$。沿零和方向 $(2,2,2,-3,-3)$ 绕环面一周会经过所有五个中心。长度 $r$ 限制了沿此方向所见的傅里叶频率，而三轻中心的匹配要求相邻读数的差在两处出现高重数零点，两者给出上述必要界。一般阶数的最短作用程仍待确定。[插值构造、谱隙与五中心下界](https://github.com/the-omega-institute/trureturing-experiments/blob/021220d28b25ffdc2bcbe07f1ad59675b464edcb/experiments/ch39-omega-research/replay/%CE%A9%E5%A4%8D%E7%AE%97%E8%AF%B4%E6%98%8E.md#%E4%B8%89%E4%B8%AA%E8%BD%BB%E9%94%A5%E9%85%8D%E5%B9%B3%E5%88%B0%E4%BB%BB%E6%84%8F%E6%8C%87%E5%AE%9A%E6%9C%89%E9%99%90%E9%98%B6%E9%9C%80%E8%A6%81%E5%A4%9A%E8%BF%9C%E7%9A%84%E4%BD%9C%E7%94%A8)

下表将这四类从球壳通往四维手征三代的显式构造并列成一张清晰的对照账：

| 构造路径 | 核心条件与质量窗 | 拓扑指数 / 读出常数 | 保留的结构局限 |
| :--- | :--- | :--- | :--- |
| 三射线单侧边界伙伴 | 最小分母三射线首站缺单侧伙伴 | $3$ 枚同手征内部零模；唯一 $3$ 站钟边覆盖；钟环面第一陈数 **$(0, 0, 0)$** | 内站存在盲相位；外端三点轨道读出逆放大 $< 4$ |
| 五步单纯形重叠核 | 度量 $g = I - J/5$，$(25 - 5\sqrt{5})/4 < m < 7/2$ | 自由 $3$ 同手征物种；光滑（方格主转数 $\le 2^{-29}$）指数 **$-3\operatorname{Pf}(C)$** | 裸动能自二、三阶起区分三轻锥，不支持三阶轮换 |
| 十九点壳四维重叠升维 | 壳矩阵作四维威尔逊质量，共用外部规范链 | 小曲率下全壳重叠指数 **$3 \times$ 单份指数**，十六重层指数恒零 | 逐格切换 #11431/#133931 保测度；双钟空间绕周保隙 $> 0.008$ |
| 高阶味色散匹配核 | 改进动能与威尔逊标量至任意阶 $K$ | 自由环面至多 $2\lceil K/3\rceil$ 步即可配平完整算子，$K=1,2,3$ 时恰需两步，$K=4,5$ 时三步足够 | 引入光滑或粗糙规范背景须给出相应的规范协变延拓 |

逐分量插值与原自由核之间存在保隙的连续形变。其规范协变延拓继承足够光滑单位磁通背景上的指数 $-3$。

## 7.3 粗糙规范测度障碍、正交希格斯标架与纯弱十二费米子顶点 {#sec-ch07-rough-measure}

在光滑背景上一切看似风平浪静。可是一旦进入真正的四维格点路径积分，测度由粗糙规范链主导——在六个满足规范与牛顿标定的黎曼零点上，把共同系数放进完整 $SU(5)$ 微观面权，单个坐标方格距单位不超过 $0.15$ 的条件概率仍小于 $0.184$，而满足光滑定理所需 $2^{-26}$ 小球的概率更是跌到 **$2^{-560}$ 以下**（[`ch39-amplified-smoothness.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-amplified-smoothness.py)）！更直白地说，在未放大的黎曼零点三角面权下，即便将费米子的负对角步严格锁定为四条坐标链的逆积，任意固定正谱隙阈值在足够大的有限盒内都以任意高置信度被最小奇异值击穿，且任意固定近零窗口内的期望本征值数都有正比于可容纳不交子盒数的正下界（[`ch39-closed-link-spectrum.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-closed-link-spectrum.py)）。粗糙背景不是罕见边缘，而是路径积分的压倒性主体。

### 7.3.1 粗糙中心反常、电磁 Cartan 荷与二次指数律

正是在这片粗糙海洋里，四项非微扰判定定理划出了生与死的精确边界：

| 检验维度 | 显式格点构造与输入 | 量化障碍或阈值结论 | 复算证书 |
| :--- | :--- | :--- | :--- |
| $SU(5)$ 粗糙中心反常 | $5^4$ 周期盒闭合 $SU(5)$ 链 | $(I_{\bar{\mathbf{5}}}, I_{\mathbf{10}}) = (2, 7)$，左手行列式中心荷 $-2 + 14 \equiv 2 \pmod 5$；三背景覆盖全质量窗 | [`ch39-rough-overlap-index.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-rough-overlap-index.py) |
| 电磁 Cartan 荷与二次律 | $5^4$ 盒两面电磁方向有限磁通 | 五阶中心荷消去后，弱同位旋 Cartan 荷仍为 **$-100$**（$460/625$ 赋值非平凡）；无障碍等价于 $I(k) = c k^2$ | [`ch39-magnetic-weyl-index.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-magnetic-weyl-index.py) |
| 平行正交希格斯标架数 | 有序正交基本 $SU(5)$ 希格斯场 | **$3$ 份**仍留 $SU(2)$，大盒必现近零模；**$4$ 份**维持共同谱隙 $1/100$，所需动能刚度 $\kappa$ 仅随盒长对数增长 | [`ch39-higgs-rank-gap.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-higgs-rank-gap.py) |
| 纯弱三代瞬子顶点 | $2^4$ 盒纯 $SU(2)$ 奇指数链 + 六 RH 面权 | $12$ 份双重态实配对使 $(QQQL)^3$ 积分处处同号，归一 $\Delta B = \Delta L = 3$ 期望 **$> 2^{-9472}$** | [`ch39-rh-weighted-weak-vertex.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-rh-weighted-weak-vertex.py) |

第一道重击是**全域正测度中心障碍**：在 $5^4$ 周期盒上构造的显式闭合 $SU(5)$ 粗糙背景，直接给出共轭基本表示与外平方表示的重叠指数 $(I_{\bar{\mathbf{5}}}, I_{\mathbf{10}}) = (2, 7)$。在左手外尔行列式线上，$\mathbb{Z}_5$ 中心生成元积累的净荷为

$$
-I_{\bar{\mathbf{5}}} + 2 I_{\mathbf{10}} = -2 + 14 = 12 \equiv 2 \pmod 5 \neq 0.
$$

这一反例在零点面权的一个正概率开集上稳定存在；即便放宽让 $\bar{\mathbf{5}}$ 与 $\mathbf{10}$ 独立挑选各自的三物种窗口质量 $(m_{\bar{\mathbf{5}}}, m_{\mathbf{10}})$，只需三个显式背景就能彻底覆盖整片二维质量窗（[`ch39-uniform-center-obstruction.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-uniform-center-obstruction.py)）。由此一锤定音：不约束粗糙规范域，这套五步重叠核无法在全构型空间定义规范等变的外尔测度。

第二道重击来自**电磁 Cartan 荷与二次指数律**：哪怕把目光缩回普通电磁方向，在 $5^4$ 盒上施加两面有限磁通使五阶中心荷恰好归零，弱同位旋生成元仍在左手行列式线上留下 **$-100$** 的巨额 Cartan 荷，且全部 $625$ 种有序对角磁通赋值中有 $460$ 种带有非平凡 Cartan 荷！对任意尚未发生模合并的有限阿贝尔链场，这条检验给出充要判据：所有对角赋值上的 Cartan 荷全消，**当且仅当指数函数满足精确的二次定律 $I(k) = c k^2$**（平行四边形恒等式）。光滑普法夫区自动服从二次律，粗糙区公然背叛它。

### 7.3.2 正交希格斯标架的护隙相变与纯弱十二费米子瞬子顶点

能否借协变平行的基本希格斯标架把粗糙规范场拉回安全区？这里的相变精准得如同刀刻：

::: {.remark #rem-ou-ch07-three-vs-four-frames title="为何三份正交希格斯标架守不住谱隙，而四份恰好以对数刚度锁死"}
把 $SU(5)$ 规范群逐个钉在有序正交的基本希格斯向量上，剩余未破缺子群依次为 $SU(4)$（$1$ 份）、$SU(3)$（$2$ 份）、$SU(2)$（$3$ 份）与平凡群 $\{1\}$（$4$ 份）。

- **一至三份标架失守**：只要还留着一个非交换的 $SU(2)$ 子群，即便希格斯动能刚度 $\kappa$ 任意大、甚至取严格平行约化，在足够大的有限盒内总能塞进足够多彼此不交的小子盒，令 $\bar{\mathbf{5}}$ 与 $\mathbf{10}$ 两核以任意给定高置信度同时涌现近零模；在 $(2, 7)$ 粗糙背景的局部轨道上，三份基本场虽可由列行列式构造近最优等变相位，却挡不住大盒中的 $SU(2)$ 粗糙涨落。
- **四份标架的对数护隙**：当正交基本希格斯标架增至**四份**，所有非平凡连续规范自由度被全部钉死！要在边长 $L$ 的大盒中以固定置信度维持共同核谱隙 $\delta \ge 1/100$，所需的有限动能刚度 $\kappa$ 随 $L$ 的增长阶**仅仅是对数级**。在四标架加一条对角边复读数的满概率开域上，还可构造与全部格点平移相容的光滑等变手征测度相位（额外缺陷集实余维至少为 $2$），且测度流满足体积无关的指数局域性界 $\le 2^{45}\delta^{-4}(1 + \delta^2/2^{18})^{-2D}$。
:::

最后，检验一套三代格点手征模型是否真正活着的终极试金石，是它能否在非微扰规范积分后生出 ’t Hooft 预言的三代重子—轻子数破坏顶点 $\Delta B = \Delta L = 3$。在 $2^4$ 格上构造纯 $SU(2)$ 奇指数弱链时，三代共十二份弱双重态的实配对奇迹般地使 $(QQQL)^3$ 乘积的费米子积分在每个有隙构型上**处处同号**！于是完成全部弱规范链积分后不存在符号相消灾难：逐面代入六个校准黎曼零点高度的面权，三代十二费米子顶点的归一化期望严格满足

$$
\bigl\langle (QQQL)^3 \bigr\rangle_{\text{weak}} \;>\; 2^{-9472},
$$

且任意更换全部面上的这六个零点编号，相对变化小于 $2.576 \times 10^{-7}$；在纯弱有隙域之上打开色场与超荷的显式正体积邻域后，全标准模型规范链积分的顶点模仍严格大于 **$2^{-9474}$**！同时在一切 $L \ge 2^{22}$ 的大周期盒上均存在光滑纯弱奇指数链（每方格距单位至多 $360464/L^2$，威尔逊作用上界与体积无关）。

::: {.problem #prob-ou-ch07-chiral-selection title="第二问未解边界：三代唯一选择律与无外置标架的四维相互作用手征理论"}
本章在球壳与四维格点上确立了覆盖全部正黎曼零点的五荷三模谱隙（$\lambda_3 < 8.685 < 9.6 < \lambda_4$）、内禀站点方差分界 $T = 9 + (1-\delta)^2$、五步单纯形三物种重叠核（光滑指数 $-3\operatorname{Pf}(C)$）、四标架对数护隙测度，以及非零的 $\Delta B = \Delta L = 3$ 纯弱十二费米子顶点（$> 2^{-9472}$）。但依原书第一性原理标准，仍有三道根本缺口尚未闭合：

1. **三代唯一性**：全零点共享截断的容许低模数为 $\{1, 3, 7, 15\}$，最宽谱隙选出 $1$，循环字符等重仍同时容许 $3$ 与 $15$；尚未由圆弧几何自身唯一排除 $1$ 与 $15$。
2. **分界的动力学起源**：站点方差最小割 $T$ 仅依赖原球壳边权，但在扩充为正负荷双态站点投影时会坍缩或改变荷二计数；为何物理有效理论恰好读取 $T$（或 $9$）仍属模型假设。
3. **非微扰手征测度的内生护盾**：在无外置四份正交基本希格斯标架的纯规范粗糙路径积分中，如何消除 $(I_{\bar{\mathbf{5}}}, I_{\mathbf{10}}) = (2, 7)$ 留下的中心荷 $2 \pmod 5$ 与电磁 Cartan 荷 $-100$，仍待新的四维相互作用格点方案解答。
:::

::: {.film src="three-light-modes"}
**十九点球壳上，五种超荷各自恰有三个轻模（2 分 46 秒）。** 片中沿极点 $(17, 17, 17)$ 俯视十九点球壳及其 $135$ 条边（青色与品红是两类钟边），在 $\delta = 0$ 时现算五种荷 $q \in \{1, 2, -3, -4, 6\}$ 磁拉普拉斯算子的全部本征值：琥珀色点沿钟环面上一条缠绕路径扫过时，三个青色轻模始终低于 $8.685$，其余十六个始终高于 $9.6$；覆盖整张环面与全部正零点的结论标为区间复算证书（NUM）。坐标轮换把画面转 $120^\circ$ 映回自身，特征标 $1, \omega, \omega^2$ 的三块（大小 $7, 6, 6$）各含一个轻模；绿色标签只给 [@thm-ou-ch07-peter-weyl-orthonormal]。共同低模数 $\{1, 3, 7, 15\}$、零点 #8236、#148341 与 #8359 的两步质量读数、五步重叠核的质量窗与指数均标为证书；站点方差分界 $T = 9 + (1-\delta)^2$ 由屏幕上现算的度数普查读出，把 $T$ 读作物理分界与四份希格斯标架护隙标为论证（紫色），第二问的三道缺口 [@prob-ou-ch07-chiral-selection] 以红色标为开放。
:::

现在我们手上已经握住了三代轻费米子的内部舞台与它的全部非微扰裂纹。但只要把三代放进质量与混合的熔炉，一场更剧烈的风暴立刻迎面扑来：保护三代完美等重的 $\mathbb{Z}_3$ 轮换对称，恰恰是夸克混合与质量层级的死敌。这就是下一章要正面剖开的第三问前半程。
