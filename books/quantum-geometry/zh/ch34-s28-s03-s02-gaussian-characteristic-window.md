# 从特征函数到短区间界

扰动后频率差的特征函数界可以控制近碰撞概率。以下估计适用于实直线上的任意有限测度 $\mu$。记 $\chi(t)=\int e^{itx}\,d\mu(x)$，并令 $W=[b-r,b+r]$，其中 $r>0$。

::: {.theorem #thm-ch31-gaussian-characteristic-window title="闭区间质量的高斯界" lean="D5/S3/Fourier/Concentration/GaussianCharacteristicWindow.measureReal_closedWindow_le_gaussian_charFun"}
区间质量满足

$$
\sqrt\pi\,\mu(W)\le e\int_{\mathbb R}e^{-t^2}|\chi(2t/r)|\,dt.
$$
:::

::: proof
函数 $e\exp(-((x-b)/r)^2)$ 在 $W$ 上至少为一，且处处非负。将高斯函数写成 $e^{-t^2}\exp(2it(x-b)/r)$ 对 $dt$ 的积分，再除以 $\sqrt\pi$。乘积被积函数的模是 $e^{-t^2}$。由于 $\mu$ 有限，可以交换积分次序。内层 $\mu$ 积分是 $e^{-2itb/r}\chi(2t/r)$，其中相位因子的模为一。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch31-quadratic-characteristic-window title="由二次倒数界得到线性区间界" lean="D5/S3/Fourier/Concentration/GaussianCharacteristicWindow.measureReal_closedWindow_le_of_quadratic_charFun"}
若 $k>0$ 且每个 $t\in\mathbb R$ 都满足 $|\chi(t)|\le (1+kt^2)^{-1}$，则

$$
\mu(W)\le \frac{e\sqrt\pi}{2\sqrt k}\,r.
$$
:::

::: proof
由于 $e^{-t^2}\le1$，高斯界中的积分至多为 $(1+(2\sqrt k\,t/r)^2)^{-1}$ 的积分，即 $\pi r/(2\sqrt k)$。完整证明由 Lean 内核检查。
:::

对系数平方和 $S>0$ 的独立均匀扰动，若有 $k=S/15$ 的二次倒数界，便得到与 $r/\sqrt S$ 成比例的概率上界。要把它用于共同近碰撞估计，特征函数和次数向量对的加权必须对应同一个乘积概率律。固定 ζ 零点纵坐标在规定分辨率下的结论仍需算术估计。
