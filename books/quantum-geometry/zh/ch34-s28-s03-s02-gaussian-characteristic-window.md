# M.2.4 从特征函数到短区间界 {#从特征函数到短区间界}

扰动后频率差的特征函数界可以控制近碰撞概率。以下估计适用于实直线上的任意有限测度 $\mu$。记 $\chi(t)=\int e^{itx}\,d\mu(x)$，并对任意实数 $r$ 令 $W=\{x:|x-b|\le r\}$。

::: {.theorem #thm-ch31-gaussian-characteristic-window title="闭区间质量的高斯界" lean="D5/S3/Fourier/Concentration/GaussianCharacteristicWindow.measureReal_closedWindow_le_gaussian_charFun"}
对任意平滑尺度 $s>0$，定义

$$
G(b,s)=\int_{\mathbb R}e^{-t^2}e^{-2itb/s}\chi(2t/s)\,dt.
$$

于是

$$
\sqrt\pi\,\mu(W)\le e^{(r/s)^2}|G(b,s)|,\qquad |G(b,s)|\le\int_{\mathbb R} e^{-t^2}|\chi(2t/s)|\,dt.
$$
:::

::: proof
函数 $\exp((r/s)^2)\exp(-((x-b)/s)^2)$ 在 $W$ 上至少为一，且处处非负。将第二个因子写成 $e^{-t^2}\exp(2it(x-b)/s)$ 对 $dt$ 的积分，再除以 $\sqrt\pi$。乘积被积函数的模是 $e^{-t^2}$。由于 $\mu$ 有限，可以交换积分次序。内层 $\mu$ 积分是 $e^{-2itb/s}\chi(2t/s)$。第二条不等式用三角不等式去掉相位因子。单位原子落在区间端点时，第一条不等式取等号。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch31-quadratic-characteristic-window title="由二次倒数界得到线性区间界" lean="D5/S3/Fourier/Concentration/GaussianCharacteristicWindow.measureReal_closedWindow_le_of_quadratic_charFun"}
若 $r>0$、$k>0$ 且每个 $t\in\mathbb R$ 都满足 $|\chi(t)|\le (1+kt^2)^{-1}$，则

$$
\mu(W)\le \frac{e^{1/2}\sqrt\pi}{\sqrt2\sqrt k}\,r.
$$
:::

::: proof
由于 $e^{-t^2}\le1$，模长的高斯积分至多为 $(1+(2\sqrt k\,t/s)^2)^{-1}$ 的积分，即 $\pi s/(2\sqrt k)$。取 $s=\sqrt2 r$，由 $(r/s)^2=1/2$ 得到所述界。完整证明由 Lean 内核检查。
:::

对系数平方和 $S>0$ 的独立均匀扰动，若有 $k=S/15$ 的二次倒数界，便得到与 $r/\sqrt S$ 成比例的概率上界。要把它用于共同近碰撞估计，特征函数和次数向量对的加权必须对应同一个乘积概率律。固定 ζ 零点纵坐标在规定分辨率下的结论仍需算术估计。
