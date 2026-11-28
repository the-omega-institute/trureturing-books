# 附录 C 固定哈尔窗计数的显式常数

设 $W$ 是第 2 章的固定四相位接受域，$A_W(T)$ 按重数计其中高度不超过 $T$ 的正零点。采用黎曼假设，下面的计算（`ARGUED`）给出

$$
\left|A_W(T)-\frac{T}{4\pi^2}\left(\log\frac{T}{2\pi}-1\right)\right|\le 10^9T\qquad(T\ge1).
$$

对任何起始高度 $H\ge1$，这个界可用于[第 12 章的分部求和](ch12-shared-arithmetic-clock.md#rem-ou-ch12-windowed-rate)。常数的大小决定了读数误差估计开始起作用的高度。

## 尖截断的陆道和

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

## 带限夹逼和求和常数

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
