# 31.1.3.2.1 Möbius 窗口的 Fourier 恢复 {#sec-ch34-s28-s03-s02-fourier-recovery}

对带符号余项取对数平均，可以恢复算术常数和 ζ 零点谱。

::: {.theorem #thm-ch31-prime-window-even-cesaro title="固定窗宽的对数平均恢复算术系数" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusEvenCutoff.signed_window_even_cutoff_cesaro"}
假设 RH 成立。存在共同的 $U_0>0$，使每个整数 $m\ge2$、$q=m+1=2r$ 都有一个适用于所有对数窗宽 $L>0$ 的常数 $C>0$。对任意 $U\ge U_0$ 与 $T>0$，函数

$$
F(u)=\frac{E_m(e^u,e^{u+L})}{D_{s_m}(e^u,e^{u+L})}
$$

在 $[U,U+T]$ 上 Lebesgue 可积，并满足

$$
\left|\frac1T\int_U^{U+T}F(u)\,du+\frac{\mu(q)q}{(q-1)s_m}\right|\le\frac{C}{T}.
$$
:::

::: proof
分母为 $e^{-s_m u}(1-e^{-s_m L})>0$。在 RH 下，归一化的次数 $r$ 根原始量增量由频率 $\operatorname{Im}(\rho)/r$ 的可绝对求和级数给出。两个端点对应同一个零点，仅相差固定窗宽的因子。零点高度下界使每个频率的指数积分由同一个常数控制，从而得到有界的谱原始量。两个平移积分相减后只剩两段长度为 $L$ 的边界区间。结合 $e^{-s_m L}L/(1-e^{-s_m L})\le 1/s_m$，得到独立于 $U,T,L$ 的根谱积分界。归一化后的 $E_q$ 按 $e^{-\delta_m u}$ 衰减，也有独立于 $U,T$ 的积分界。将两项的积分界除以 $T$，留下常数 $-\mu(q)q/((q-1)s_m)$。
:::

若 $q$ 含平方因子，算术平均为零。次数 $r$ 的根谱项仍由 $\mu(r)$ 决定，端点展开允许它在个别窗口中出现。误差常数可以依赖于阶数 $m$。

::: {.theorem #thm-ch31-prime-window-even-fourier title="傅里叶系数恢复零点频率与重数" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusEvenCutoffFourier.signed_window_even_cutoff_fourier"}
假设 RH。取 $q=m+1=2r$、$m\ge2$，固定对数窗宽 $L>0$。沿用 [@thm-ch31-prime-window-even-cesaro] 中的 $s=s_m$ 与归一化余项 $F$。对非平凡零点 $\rho$，令 $\omega_\rho=\operatorname{Im}(\rho)/r$，并定义

$$
b_{r,L}(\rho)=
\frac{2r^2}{\rho(r-\rho)(r-2\rho)}
\frac{e^{(-s+i\omega_\rho)L}-1}{1-e^{-sL}}.
$$

令 $A(0)=-\mu(q)q/((q-1)s)$。对 $\omega\ne0$，定义

$$
A(\omega)=-\mu(r)\sum_{k:\,\omega_{\rho_k}=\omega} b_{r,L}(\rho_k),
$$

其中 $\rho_k$ 按解析重数枚举实际非平凡零点。存在共同起点阈值 $U_0>0$。对每个固定的 $m,L,\omega$，存在常数 $C>0$，使得对所有 $U\ge U_0$ 与 $T>0$，调制后的余项在 $[U,U+T]$ 上 Lebesgue 可积，且

$$
\left|\frac{1}{T}\int_U^{U+T} F(u)e^{-i\omega u}\,du-A(\omega)\right|
\le \frac{C}{T}.
$$

对每个解析重数为 $n_\rho$ 的非平凡零点 $\rho$，有 $A(\omega_\rho)=-\mu(r)n_\rho b_{r,L}(\rho)$，且 $b_{r,L}(\rho)\ne0$。
:::

::: proof
将偶数截断展开除以幂差，得到算术常数、归一化的根原函数增量，以及由常数乘 $e^{-\delta_m u}$ 控制的余项。归一化增量有绝对可和的指数展开。实际零点项按共轭配对，故其和为实数。每个零点项的系数包含两个端点的变化，这给出 $b_{r,L}$ 中的窗宽因子。

乘以 $e^{-i\omega u}$ 后，每一项的频率都减去 $\omega$。频率匹配的每个零点项贡献其系数乘 $T$。ζ 零点集合是闭离散集。删去 $1/2+ir\omega$ 后仍得到闭集，它与被删点的距离为正。在 RH 下，这给出 $\omega$ 与所有不匹配频率的正间隔。每个不匹配的指数项积分的模至多为该间隔倒数的两倍，此界与 $U,T$ 无关。绝对可和性给出这些项的总积分界，指数衰减也给出余项的积分界。在零频处没有匹配的零点项，在非零频处算术常数的振荡积分有界。单频积分界与调制步骤沿用对照仓库中的频率检验。 [单频积分界](https://github.com/the-omega-institute/riemann-hypothesis/blob/b8864ecd5798c6030a03d756fab95f0b89a12754/src/Development/AbelianVarietyTheory/Proofs/DivisorProofs/ExpSumCoeffEqZeroOfVanishing.lean#L32-L62) · [系数提取](https://github.com/the-omega-institute/riemann-hypothesis/blob/b8864ecd5798c6030a03d756fab95f0b89a12754/src/Development/AbelianVarietyTheory/Proofs/DivisorProofs/ExpSumCoeffEqZeroOfVanishing.lean#L109-L143)

在 RH 下，一个虚部确定临界线上的唯一点。匹配项的因子相同，恰好出现 $n_\rho$ 次。窗宽因子分子中的指数项模长为 $e^{-sL}<1$，各分母也均非零。
:::

若 $\mu(r)\ne0$，非零测试频率的系数非零当且仅当 $1/2+ir\omega$ 是实际零点。此时除以 $-\mu(r)b_{r,L}(1/2+ir\omega)$，便得到该零点的解析重数。若 $r$ 含平方因子，所有非零频率的系数均为零。这里的误差常数允许依赖测试频率与固定窗宽；零频处对所有正窗宽统一的估计见 [@thm-ch31-prime-window-even-cesaro]。

::: {.theorem #thm-ch31-prime-window-fourier-uniform-width title="傅里叶恢复对所有正窗宽统一" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusEvenCutoffUniformWidth.signed_window_even_cutoff_fourier_uniform_width"}
假设 RH。沿用 [@thm-ch31-prime-window-even-fourier] 中的偶数截断、归一化余项 $F$ 与依赖窗宽的目标系数 $A$。存在共同起点阈值 $U_0>0$。对每个允许的阶数 $m$ 与每个实测试频率 $\omega$，存在 $C>0$，使得对所有 $L>0$、$U\ge U_0$ 与 $T>0$，调制后的余项在 $[U,U+T]$ 上 Lebesgue 可积，且

$$
\left|\frac{1}{T}\int_U^{U+T}F(u)e^{-i\omega u}\,du-A(\omega)\right|
\le \frac{C}{T}.
$$

在每个正窗宽，零频系数等于 $-\mu(q)q/((q-1)s)$。每个实际非平凡零点 $\rho$ 在 $\omega_\rho$ 处的系数等于 $-\mu(r)n_\rho b_{r,L}(\rho)$，其中 $b_{r,L}(\rho)\ne0$。
:::

::: proof
对频率 $\lambda$，记 $t=e^{-sL}$。将 $te^{i\lambda L}-1$ 写成 $t(e^{i\lambda L}-1)-(1-t)$。由 $|e^{i\lambda L}-1|\le|\lambda|L$ 与 $tL/(1-t)\le 1/s$，得到

$$
\left|\frac{e^{(-s+i\lambda)L}-1}{1-e^{-sL}}\right|\le 1+\frac{|\lambda|}{s}.
$$

根原函数将每项系数除以其复指数。对于零点项 $\rho_k$，$\lambda=\operatorname{Im}(\rho_k)/r$ 是该指数的虚部，故 $|\lambda|$ 不超过该指数的模。估计系数范数时，新增的 $|\lambda|$ 因子被逆指数吸收。所得系数上界可和，且与 $L$ 无关。傅里叶误差用这些范数之和乘上其余频率的间隔倒数控制。算术项与余项的估计已经覆盖所有正窗宽。系数的恒等式见 [@thm-ch31-prime-window-even-fourier]。
:::

误差常数可以依赖 $\omega$。在非零频率处，要恢复的系数仍依赖窗宽。

::: {.theorem #thm-ch31-prime-window-detuned-fourier title="测试频率附近的有限时长响应" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusEvenCutoffFourierResolution.signed_window_even_cutoff_detuned_fourier"}
假设 RH。沿用 [@thm-ch31-prime-window-fourier-uniform-width] 的偶数截断、归一化带符号余项 $F_L$ 与系数 $A_L(\omega)$，下标表示窗宽。记 $K(v)=\int_0^1 e^{-ivt}\,dt$。存在共同起点阈值 $U_0>0$。对每个允许的截断阶数 $m$ 和实参考频率 $\omega$，存在 $C>0$，使得对所有 $L>0$、$U\ge U_0$、$T>0$、$R\ge0$ 及满足 $|v|\le R$ 的实数 $v$，下式中的被积函数 Lebesgue 可积，且

$$
\left|\frac{1}{T}\int_U^{U+T}F_L(u)e^{-i\omega u}e^{-iv(u-U)/T}\,du
-A_L(\omega)K(v)\right|\le\frac{C(1+R)}{T}.
$$

对每个正窗宽，$A_L(0)=-\mu(q)q/((q-1)s)$。若非平凡零点 $\rho$ 的解析重数为 $n_\rho$，则 $A_L(\omega_\rho)=-\mu(r)n_\rho b_{r,L}(\rho)$，其中 $b_{r,L}(\rho)\ne0$。
:::

::: proof
窗宽一致估计用同一常数控制平均区间每段前缀上的原函数 $\int_U^x(F_L(u)e^{-i\omega u}-A_L(\omega))\,du$。把复数乘积展开成实部和虚部的各项，再对附加相位分部积分。该相位的模为一，导数的模为 $|v|/T$，故端点项的界与 $T$ 无关，导数项至多为常数乘 $|v|$。最后除以 $T$。对常数系数项作代换 $u=U+Tt$，便得到响应 $K(v)$，即单频检验使用的指数平均。 [指数平均](https://github.com/the-omega-institute/riemann-hypothesis/blob/b8864ecd5798c6030a03d756fab95f0b89a12754/src/Development/AbelianVarietyTheory/Proofs/DivisorProofs/ExpSumCoeffEqZeroOfVanishing.lean#L32-L62)
:::

附加相位对应频率 $\omega+v/T$，相位校正 $e^{ivU/T}$ 将偏移相位的原点放在左端点。若 $v\ne0$，则 $K(v)=e^{-iv/2}\sin(v/2)/(v/2)$，而 $K(0)=1$。该界给出对有界偏移 $v$、所有正窗宽及足够晚起点的一致收敛，极限为 $A_L(\omega)K(v)$。常数可以依赖参考频率。
