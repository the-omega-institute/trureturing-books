# 附录 C 固定哈尔窗计数的显式常数

设 $W$ 是第 2 章的固定四相位接受域，$A_W(T)$ 按重数计其中高度不超过 $T$ 的正零点。采用黎曼假设，下面的计算（`ARGUED`）给出

$$
\left|A_W(T)-\frac{T}{4\pi^2}\left(\log\frac{T}{2\pi}-1\right)\right|\le 10^9T\qquad(T\ge1).
$$

对任何起始高度 $H\ge1$，这个界可用于[第 12 章的分部求和](ch12-shared-arithmetic-clock.md#rem-ou-ch12-windowed-rate)。常数的大小决定了读数误差估计开始起作用的高度。

## C.1 尖截断的陆道和 {#尖截断的陆道和}

记 $J_T(v)=\int_0^T e^{ivt}\,dt$。给定 $x>1$，取离 $x$ 最近的素数幂 $q$，距离相同任选其一。对 $T\ge2$，有

$$
\left|\sum_{0<\gamma\le T}x^\rho+
 \frac{\Lambda(q)}{2\pi}J_T\bigl(\log(x/q)\bigr)\right|
\le 10^6\left[x\log^2(3xT)+\frac{\log(2T)}{\log x}\right],
$$

其中 $\rho=\beta+i\gamma$ 按重数计，$\Lambda$ 是冯·曼戈尔特函数。这一步不使用黎曼假设。

令 $\lambda=\log x$、$\sigma=1+1/\log(3x)$、$s=\sigma+it$。完备化 zeta 函数的 Hadamard 乘积给出

$$
\sum_{\rho}\frac{\sigma-\beta}{(\sigma-\beta)^2+(t-\gamma)^2}
=\Re\left(\frac1s+\frac1{s-1}-\frac{\log\pi}{2}
 +\frac12\psi(s/2)+\frac{\zeta'}{\zeta}(s)\right).
$$

乘以 $e^{i\lambda t}$，在 $[0,T]$ 上积分，再乘 $x^\sigma/\pi$。左边每个核的全线 Fourier 积分为 $\pi e^{-(\sigma-\beta)\lambda}e^{i\lambda\gamma}$。对区间内零点，以全线积分替代有限积分。对其余零点，以零替代有限积分。由显式总零点计数界，任一以 $u$ 为中心的单位区间中，含正负高度的零点数至多 $50\log(3+|u|)$。对 $|\gamma|\le2T$，Poisson 核的尾积分给出单点误差至多 $8/(1+|\gamma|)+8/(1+|\gamma-T|)$，也覆盖 $\gamma=T$。按到两个端点的整数距离分组，合计至多 $1600\log(8T)(1+\log(4T))$。对 $R<|\gamma|\le2R$、$R=2^{j+1}T$，单点误差至多 $8T/R^2$，点数至多 $200R\log(4R)$。再求和得至多 $1600(\log(8T)+\log2)$。在乘 $x^\sigma/\pi$ 之前，两项之和小于 $10^5\log^2(2T)$。[显式总计数，推论 1.2](https://doi.org/10.1016/j.jnt.2021.06.032)

右边的两个极点项实部在 $t\ge0$ 单调递减。$\psi$ 项的实部单调递增。由 $\Re\psi(u+iv)-\psi(u)=\sum_{m\ge0}v^2/((m+u)((m+u)^2+v^2))$，在 $1/2\le u\le1$、$0\le v\le T/2$ 时，把和式在 $\lceil T\rceil$ 处分开，可把变差界在 $5+\log(2T)$ 内，且 $|\psi(u)|<3$。分部积分把这些项和常数项的积分界在 $30(\log(3x)+\log(2T))/\lambda$ 内。

展开 $\Re(\zeta'/\zeta)$ 后，每个整数 $n\ge2$ 有两项 $J_T(\lambda\pm\log n)$，系数为 $-\Lambda(n)(x/n)^\sigma/(2\pi)$。加号项及 $n\notin[x/2,2x]$ 的减号项，用 $|J_T(v)|\le2/|v|$ 和 $\sum_{n\ge2}\log n/n^\sigma\le(\sigma-1)^{-2}+(\log2)/(\sigma-1)$ 控制。后一界可逐个区间 $[n-1,n]$ 积分 $\log(t+1)t^{-\sigma}$ 得到。区间 $[x/2,2x]$ 内保留最近的 $q$。其余素数幂按距离排序，第 $j$ 个距 $x$ 至少 $j/2$，且 $|\log(x/n)|\ge|x-n|/(2x)$、$(x/n)^\sigma\le4$。这些项合计至多 $32x\log(2x)(1+\log(2x+1))$。最后，$|(x/q)^\sigma-1|\le8|\log(x/q)|$，把保留项的系数替换为 $-\Lambda(q)/(2\pi)$ 的代价至多 $16\log(2x)$。用 $x^\sigma\le ex$ 合并上面的不等式即得所述界。[恒等式与均匀陆道公式](https://arxiv.org/abs/0805.2745)

## C.2 带限夹逼和求和常数 {#带限夹逼和求和常数}

用单位周期坐标取环面的上确界距离。接受阈值 $F=\sin^2p\sin^2q|\sin v|$ 在三维底面上 Lipschitz 常数至多 $6\pi$，其中角度用弧度。$u=0$ 的接缝邻域宽度至多 $2r$，$u=F$ 的图面邻域在每个竖直截面上的宽度至多 $2(1+6\pi)r$。故 $\partial W$ 的厚 $r$ 邻域测度小于 $42r$。

对 $K\ge1$ 令 $n=\lfloor K/2\rfloor+1$。令 $J$ 为四个一维 Fejér 核的平方归一化后所得的乘积，每个核的平方积分是 $(2n^2+1)/(3n)$。由 $\sin(\pi t)\ge2t$（$0\le t\le1/2$）和四坐标并集界，$J$ 在半径 $r$ 的盒外的质量至多 $\min(1,1/(4n^3r^3))$。写 $\phi(z)=(1+n\,d(z,\partial W))^{-2}$。于是 $|J*\mathbf1_W-\mathbf1_W|\le4\phi$。半径 $1/n$ 的盒内至少有 $3/4$ 的质量，且盒内平移使 $\phi$ 最多下降到原值的四分之一。因而 $P_K^\pm=J*\mathbf1_W\pm32J*\phi$ 逐点夹住窗函数，频率满足 $\|k\|_\infty\le K$。由管邻域界，$\int\phi\le42/n$，进而

$$
\|P_K^\pm-\mathbf1_W\|_1\le3024/K,\qquad
\|P_K^\pm-\mathbf1_W\|_2\le400/\sqrt K,\qquad
\|P_K^\pm\|_\infty\le33.
$$

用次数 $M-1$ 的同类逼近估计 $\mathbf1_W$ 的 Fourier 尾部。任一夹逼多项式在二倍频层 $M\le\|k\|_\infty<2M$（$M\le K$）的系数 $\ell^2$ 范数至多 $1000/\sqrt M$。$M=1$ 用整体范数界。

设 $y=\log T\ge24000$，取 $K=\lfloor y/12000\rfloor$。第 12 章的范数界给出不同正频率的间距大于 $2T^{-1/3}$，非零频率满足 $1/|\lambda_k|\le T^{1/6}$，且 $e^{|\lambda_k|}\le T^{1/500}$。在黎曼假设下将陆道和除以 $\sqrt x$。所有非主项以及 $|\lambda_k-\log q|\ge T^{-1/3}$ 的主项，用 Fourier 系数绝对和的上界 $33(2K+1)^2$ 加权后，合计至多 $3\cdot10^{10}y^4e^{-2y/3}T<T$。

每个素数幂至多匹配一个近共振正频率。在 $M=2^r$ 的频层内，至多有 $S=(5M)^4$ 个匹配整数。由于 $\log^2 n/n$ 在 $n\ge S$ 递减，把这组整数在 $S$ 处分开可得 $\sum_q\Lambda(q)^2/q\le\log^2 S(2+\log S)$。近共振时 $1/x\le e/q$。结合 Cauchy–Schwarz 和频层系数界，这一层正频率的贡献在除以 $T$ 后至多为 $10^6(r+1)^2\,2^{-r/2}$。负频率给出共轭项。由于 $\sum_{r\ge0}(r+1)^2\,2^{-r/2}<100$，近共振项合计至多 $2\cdot10^8T$。

此时 $K\ge y/24000$ 且 $N(T)\le Ty$，故常数项的误差至多 $96\cdot10^6T$。最后用显式总计数界，代入 $\mu(W)=1/(2\pi)$，增加的误差小于 $T$。对 $1\le T\le e^{24000}$，同一总计数界与 $0\le A_W(T)\le N(T)$ 已给出小于 $10^5T$ 的误差，$T<e$ 时直接用 $N(e)$ 控制计数。这给出附录开头在全高度范围内的常数。

## C.3 半径趋零的两钟相位窗 {#sec-ou-appc-shrinking-windows}

**手工推导（ARGUED）。** 设 $D$ 是归一化两钟环面上一个圆盘、正方形或菱形，由固定形状缩放 $r$ 倍再平移得到。令 $L=\log T$、$n=\lfloor\kappa L\rfloor$，其中 $\kappa>0$ 固定且充分小。对充分小的 $r$ 且 $r\ge 1/n$，有

$$
\#\{0<\gamma\le T:\ b\gamma\bmod 1\in D\}
  = N(T)\mu(D)+O(Tr+TL^{-2}),
$$

其中 $b=(\theta_{724}-\theta_{244},\theta_{804}-\theta_{244})/(2\pi)$，零点按重数计，误差对窗的位置一致。由于 $\mu(D)\asymp r^2$，只要 $r(T)\log T\to\infty$，相对误差就趋于零。

宽 $1/n$ 的边界管面积为 $\asymp r/n$。用慢核与边界管卷积得到 $0\le B\le1$，其均值 $w_0\asymp r/n$。快核平滑窗指标，再加减常数倍的 $B$，给出夹逼多项式 $P^\pm$，其均值为 $\mu(D)+O(r/n)$。三者的频率盒半径都是 $O(n)$，实环面上都一致有界。在速度 $b$ 的方向作虚移 $y$ 时，二阶导数由 $Cn^2 e^{Cn|y|} B$ 控制，右边的 $B$ 取在实点。对快核，在导数卷积中扣去实点的窗指标，只剩距离足以跨过边界的位移。慢核的下界来自最近边界点处、半径 $1/(2n)$ 的球包含在边界管内。实轴上一阶导数也满足 $|B'|\le CnB$。这些常数对 $r$ 和窗的平移一致。[边界管与带限核的构造](https://github.com/the-omega-institute/trureturing-books/issues/1637#issuecomment-7233283092)

**复移位求和。** 写 $\lambda_k=2\pi k\cdot b$。取正频率，负频率由零点对称性和共轭处理。若最近素数幂 $q\le L^A$，其中 $A$ 是任意固定常数，Baker 的代数系数对数线性型界给出 $|\lambda_k-\log q|\ge\exp[-O_A((1+\log L)^C)]$。线性型以两个固定的纯虚钟对数和实对数 $\log q$ 为底，将最后一个对数的系数取 $i$。它非零，因为 $q>1$ 时，若有等号，代数数 $e^{i\lambda_k}$ 就会等于由 Gelfond–Schneider 定理判为超越数的 $q^i$。因此低素数幂不会进入宽 $T^{-1/3}$ 的近频区。对 $q>L^A$，即使发生近频，归一后的陆道主项至多是 $O_A(T\log L\,L^{-A/2})$。频率仅有 $O(L^2)$ 个，取 $A$ 足够大即可。离开近频区时，陆道主项用 $|J_T(v)|\le 2/|v|$ 控制，其余误差沿用小带宽下的幂次节省。因此对 $F=B,P^\pm$，复移位和为 $N(T)\int F+O(TL^{-2})$。[Baker，*A sharpening of the bounds for linear forms in logarithms*（1972），第 117 页](https://doi.org/10.4064/aa-21-1-117-129) · [第 12 章的频率与素数幂估计](ch12-shared-arithmetic-clock.md)

**保留局部权重的均方。** 在每个 $X\ge T^{3/4}$ 的高度块上记 $\ell=\log X$、$W(t)=B(bt)$、$F=\zeta M$。第 12 章的 mollifier 在此取长度 $X^{1/100}$。对 $[X/2,5X/2]$ 内的积分区间 $I$，Green 恒等式所用的输入为

$$
\int_I W(t)\,|F(\sigma+it)-1|^2\,dt
\ll Xw_0 e^{-c(\sigma-1/2)\ell},
\qquad 1/2+1/\ell\le\sigma\le2 .
$$

先取 $\sigma-1/2\le C\log\ell/\ell$。把 $|F-1|^2$ 展开为 $|\zeta|^2|M|^2-2\Re(\zeta M)+1$。$W$ 的零模正好是普通均方乘 $w_0$。短 mollifier 消去首批 Dirichlet 系数，配合筛权平方和及无扭转均方公式，普通均方为 $O(Xe^{-c_0(\sigma-1/2)\ell})$。对非零模，将二次项按平滑乘积近似函数方程展开为原项与对偶项，以 $mn\le X^{1+\eta}$ 截断，$\eta>0$ 固定且足够小。该范围内二者振幅及乘 $X$ 的时间导数皆为 $O((mn)^{-1/2})$，对偶项用到因子 $X^{1-2\sigma}$。乘 $|M|^2$ 后按既约比 $a/d$ 合并，振幅及上述导数都由 $\ell^{O(1)}(ad)^{-1/2+\epsilon}$ 控制，此处可取任意小的固定 $\epsilon>0$，并且 $ad\le X^\rho$，$\rho<2$ 固定。截到 $10X$ 的线性项及常数同样处理。对分离的比值分部积分，用代数对数下界排除小比值近频，得到每个非零钟模 $O_D(X\ell^{-D})$，其中 $D$ 可任意固定。由 $|\widehat B(k)|\le w_0$ 及 $O(\ell^2)$ 个模，增大 $D$ 后总误差为 $O_D(Xw_0\ell^{-D})$。按钟频分离逐模积分得 $\int_I W\ll Xw_0$，截断的点态余项也因此保留 $w_0$。[普通均方与乘积展开](https://github.com/the-omega-institute/trureturing-books/issues/1637#issuecomment-7234629760) · [局部权重下的非零模](https://github.com/the-omega-institute/trureturing-books/issues/1733#issuecomment-7235395614)

若 $\sigma-1/2>C\log\ell/\ell$，用 $0\le W\le1$ 和普通均方界。取 $c_0 C/2>2$，由 $r\ge1/n$ 与 $X\ge T^{3/4}$，有 $e^{-c_0(\sigma-1/2)\ell/2}\ll\ell^{-2}\ll w_0$。近侧取 $D>cC$，使对数幂误差纳入所需的指数界。由此得到整个范围的局部输入。

**带权计数与换回实轴。** 对 $X\ge T^{3/4}$ 和 $u\ge2/L$，在 $1/2+2u/3$ 使用带权 Green 恒等式。直线积分与面积积分都是 $O(Xw_0e^{-cu\log X})$，测试函数在被计零点上至少为 $u/3\ge 2/(3L)$。按二倍区间相加。低于 $T^{3/4}$ 的零点至多贡献 $O(T^{3/4}L)$。由于 $w_0\gg L^{-2}$，可将指数常数取为 $0<c_1<1/2$ 并吸收这项，得到

$$
\sum_{0<\gamma\le T,\,\lvert\beta-1/2\rvert\ge u}
 B(b\gamma) \ll TLw_0e^{-c_1uL}\qquad(2/L\le u\le1/2).
$$

同高对称零点的虚移一阶项相消。内条带的二阶代价至多是实轴上 $\sum B$ 的四分之一。外条带以 $u^2e^{Cnu}$ 对上面的尾计数分部积分，再乘 $n^2$，给出 $O(TLw_0)$。先对 $B$ 自身换和并吸收内条带误差，再用 $P^\pm$ 夹逼。均值误差 $O(N(T)r/n)$ 与换和误差都并入 $O(Tr+TL^{-2})$。[带权二阶矩与 Green 归约](https://github.com/the-omega-institute/trureturing-books/issues/1637#issuecomment-7234629760) · [二倍区间的截止](https://github.com/the-omega-institute/trureturing-books/issues/1637#issuecomment-7234728563)
