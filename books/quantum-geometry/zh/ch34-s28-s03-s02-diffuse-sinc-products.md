# sinc 乘积的欧氏尺度

对一对次数向量 $m,n$，坐标 $j$ 的中心均匀扰动以系数 $c_j=(m_j-n_j)r_j$ 进入频率差，其中 $r_j$ 是扰动半径。对 $[-1,1]$ 上独立的均匀变量，每个坐标给特征函数贡献一个因子 $\operatorname{sinc}(c_jt)$。固定截距仅贡献模长为一的相位。系数分散在多个坐标时，下面的界利用系数平方和。

::: {.theorem #thm-ch31-diffuse-sinc-product title="乘积的二次倒数界" lean="D5/S3/Fourier/Concentration/DiffuseSincProduct.diffuse_sinc_product_le"}
设 $A$ 是有限集，$c_j$ 为实系数。记 $S=\sum_{j\in A}c_j^2$，并设每个 $j\in A$ 都满足 $c_j^2\le S/2$。令 $\operatorname{sinc}(0)=1$，$x\ne0$ 时令 $\operatorname{sinc}(x)=\sin(x)/x$。任意实数 $t$ 满足

$$
\prod_{j\in A}|\operatorname{sinc}(c_jt)|
\le \frac{1}{1+St^2/24}.
$$
:::

::: proof
先证 $\operatorname{sinc}(x)^2(1+x^2/12)\le1$。在 $0\le x\le2$ 上，积分 $\cos u\le 1-u^2/8$ 得到 $0\le\operatorname{sinc}(x)\le 1-x^2/24$。记 $z=x^2/24$，所需不等式由 $(1-z)^2(1+2z)=1-z^2(3-2z)$ 得出。对 $x\ge2$，用 $|\sin x|\le1$ 和 $1+x^2/12\le x^2$。偶性覆盖负数。

令 $b_j=(c_jt)^2/12$，$U=\sum_j b_j$。乘积 $\prod_j(1+b_j)$ 的常数项、一次项及二次项之和是 $1+U+(U^2-\sum_j b_j^2)/2$。其余每项非负。由每个 $b_j\le U/2$，二次项至少为 $U^2/4$。将单坐标估计相乘，再用 $\prod_j(1+b_j)\ge(1+U/2)^2$ 即得结论。完整证明由 Lean 内核检查。
:::

当 $S>0$ 时，上界的积分是 $\pi\sqrt{24/S}$。要把它用作近碰撞预算，还需从特征函数过渡到短区间概率的估计。Rudelson 与 Vershynin 的密度定理对独立均匀扰动给出了更强的概率界。长度为 $2\eta$ 的区间，其概率至多为 $\min(1,\sqrt2\,\eta/\sqrt S)$。固定的 ζ 零点纵坐标仍需单独的算术估计。 [Rudelson 与 Vershynin，定理 1.2](https://arxiv.org/html/1402.4492#S1.Thmtheorem2)
