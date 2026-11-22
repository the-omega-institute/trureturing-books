# 35.6.7.2 局域父哈密顿量与热浴链 {#sec-ch39-s05-s07-s02-parent-and-heatbath}

::: {.example #ex-ch39-p2e-local-parent title="纸面推导（未经 Lean 验证）：选取合法字正等幅态的局域父哈密顿量"}
前面的熵计算指定了一个态。能否反过来写出一个局域能量，使它成为唯一基态？先看两个位置、禁止 `11` 的最小例子。在基 $00,01,10,11$ 中取

$$
H_{2,2}=\begin{pmatrix}
2&-1&-1&0\\
-1&1&0&0\\
-1&0&1&0\\
0&0&0&1
\end{pmatrix}.
$$

左上角是三顶点路径图 $01\leftrightarrow00\leftrightarrow10$ 的拉普拉斯矩阵：相邻顶点振幅相等时没有能量代价。最后一个对角元给非法字 `11` 加罚。谱为 $0,1,1,3$，唯一归一化零态到整体相位为 $(1,1,1,0)/\sqrt3$。下面把这个机制推广到所有有限长度。以下是标准配置图拉普拉斯方法的应用与纸面证明，完整构造尚未取得 Lean 验证。

固定 $K\ge2$、$N\ge0$，在完整空间 $\mathcal H_N=(\mathbb C^2)^{\otimes N}$ 中，令 $n_j=|1\rangle_j\langle1|$，$X_i$ 为第 $i$ 位的翻转算子。所有长度 $K$ 的窗口都完全位于链内，不作周期回绕。定义

$$
\begin{aligned}
B_a&=\prod_{j=a}^{a+K-1}n_j
\quad(1\le a\le N-K+1),\\
\mathcal W_i&=\{a:1\le a\le N-K+1,\ a\le i<a+K\},\\
C_i&=\prod_{a\in\mathcal W_i}
\left(I-\prod_{\substack{a\le j<a+K\\j\ne i}}n_j\right),\\
h_i&=C_i(I-X_i)C_i,\\
H_{K,N}&=\sum_{i=1}^{N}h_i+\sum_{a=1}^{N-K+1}B_a.
\end{aligned}
$$

空指标集上的和取 $0$、积取恒等算子，故 $N<K$ 时没有窗口。$C_i$ 是对角投影，不依赖中心位，与 $X_i$ 对易。它只检查距 $i$ 至多 $K-1$ 的位置：每一项 $h_i$ 支撑于至多 $2K-1$ 个连续位置，边界处截断；$B_a$ 支撑于 $K$ 个位置。$K=2$ 时 $C_i$ 就是链内相邻位置的空位投影之积。

**先在完整字基上展开。** 记 $\Omega_N=\{0,1\}^N$，位置从 $1$ 编到 $N$，$\sigma_iw$ 为只翻转第 $i$ 位的字。原控制投影的对角元就是

$$
\begin{aligned}
c_i(w)&:=\langle w|C_i|w\rangle\\
&=\prod_{a\in\mathcal W_i}
\left(1-\prod_{\substack{a\le j<a+K\\j\ne i}}w_j\right)\in\{0,1\},\\
c_i(\sigma_iw)&=c_i(w),\qquad \sigma_i^2w=w.
\end{aligned}
$$

每个因子都不读取 $w_i$，所以最后两式对全部完整字成立，包括非法字。以 $v$ 为行、$w$ 为列，$X_i$ 的置换矩阵元为 $\langle v|X_i|w\rangle=\delta_{v,\sigma_iw}$。插入完整字基的恒等分解，直接展开已定义的算符乘积，得到

$$
\begin{aligned}
\langle v|h_i|w\rangle
&=\sum_{r,s\in\Omega_N}
\langle v|C_i|r\rangle\langle r|I-X_i|s\rangle
\langle s|C_i|w\rangle\\
&=c_i(v)\bigl(\delta_{v,w}-\delta_{v,\sigma_iw}\bigr)c_i(w).
\end{aligned}
$$

若 $c_i(w)=1$，每个包含 $i$ 的完整窗口都有一个位于中心之外的零；翻转前后这个零都还在。其余窗口不变，故 $w\in W_N$ 当且仅当 $\sigma_iw\in W_N$，无需先假设 $w$ 合法。因此允许的翻转同时保持合法扇区和非法扇区。控制开启并不认证全局合法性：例如 $K=2,N=4,w=1100,i=4$，唯一包含中心的窗口 $[3,4]$ 由第 $3$ 位的零通过检验，故 $c_4(1100)=1$；但 $1100$ 与 $1101$ 都保留禁窗口 $[1,2]=11$。局部项 $h_4$ 在这对非法基矢上仍有对角元 $1$ 和翻转元 $-1$。

**能量怎样识别合法字？** 固定第 $i$ 位之外的配置 $\eta$，记对应的两个字为 $\eta0,\eta1$，中心数字均插在位置 $i$。$C_i(\eta)=1$ 当且仅当把中心置为 $1$ 不会形成任何包含 $i$ 的禁窗口。在这样的二维块上，$h_i$ 为

$$
\begin{pmatrix}1&-1\\-1&1\end{pmatrix};
$$

其余块为零，因此 $h_i$ 正半定。$B_a$ 也是正投影。对任意 $|\phi\rangle=\sum_w a_w|w\rangle$，令 $\nu_K(w)$ 为字 $w$ 中全 $1$ 的长度 $K$ 窗口数，得到完整空间上的能量恒等式

$$
\begin{aligned}
\langle\phi|H_{K,N}|\phi\rangle
={}&\sum_{i=1}^{N}\ \sum_{\eta:C_i(\eta)=1}
|a_{\eta0}-a_{\eta1}|^2\\
&+\sum_{w\in\{0,1\}^N}\nu_K(w)|a_w|^2.
\end{aligned}
$$

每个固定外部配置的无向翻转对只计一次，不另乘 $2$。零能量首先迫使所有非法字的振幅为零。对于合法字，删除任意一个 $1$ 都保持合法，而且该位置的 $C_i=1$，所以第一项又迫使这一对合法字的振幅相等。逐位删除到全零字，便把所有合法字连在一起。

反过来，一次满足 $C_i=1$ 的翻转不会改变字的合法性：包含 $i$ 的窗口在两个端点都不违规，其他窗口不受翻转影响。因此令合法字振幅相同、非法字振幅为零，会逐项消去上述全部平方项和罚项。若 $W_N$ 仍表示不含 $1^K$ 的全部长度 $N$ 字、$z_N=|W_N|$，则

$$
\begin{aligned}
|\Psi_{K,N}\rangle&=z_N^{-1/2}\sum_{w\in W_N}|w\rangle,\\
\ker H_{K,N}&=\mathbb C|\Psi_{K,N}\rangle.
\end{aligned}
$$

这既证明了完整张量空间中的唯一基态射线，也证明它同时使每一局域正项取零，即无挫折。合法字张成的子空间被各项保持；限制在该空间时，$\sum_i h_i$ 正是单比特合法翻转图的拉普拉斯。非法性罚项使这个限制空间中的唯一性提升到完整空间中的唯一性，不能省略：上面的 $K=N=2$ 例子若删去罚项，$|11\rangle$ 就多出一个零态。

**长度与物理解释的边界。** $N=0$ 时空间是一维真空空间，$H_{K,0}=0$，没有激发能级可定义谱隙。每个固定 $N\ge1$ 的矩阵都是有限维、正半定且恰有一维核，因而其第一正本征值严格大于零；这里没有给出对所有 $N$ 一致的下界。当 $1\le N<K$ 时，$C_i=I$ 且无罚项，$H_{K,N}=\sum_i(I-X_i)$，基态为 $|+\rangle^{\otimes N}$，谱隙恰为 $2$。

因此，前面实际正等幅态的有限切口熵与固定 $K$ 双侧极限，也是这个专门设计模型的基态纠缠结果。这不把它识别为真实里德堡阵列、黄金链、Tribonacci 跃迁链或 Rauzy 几何所选出的态，也不解决分形边界与纠缠标度的开放问题。

[FIB 原子理论卷 §15.9](https://github.com/the-omega-institute/trureturing-source-theories/blob/2a39da5107abbfa3a72cc883486dbc15a15994a1/docs/develop/theory/AURIC_FIB_ATOM_PYRAMID_BOUNDARY_CALCULUS.md#L1679) 的定义 15.22 与命题 15.23 已给出 $K=2$、正活动 $a_i$ 的合法空间局域父及逐位删除证明；这里取 $a_i=1$，把控制投影写成所有包含中心的禁窗口，并补入全空间罚项。该卷命题 15.25 明确指出不加罚项时全空间唯一性失败。[Lesanovsky 的三体模型](https://arxiv.org/abs/1010.2349v2)式 (3)–(5) 提供相关物理背景，符号、正尺度及边界对应见该卷数学引文 15.24；这里的任意 $K$ 构造由上述能量恒等式承担，不将其归为该文已证明的实验实现。
:::

::: {.example #ex-ch39-p2e-heatbath-scale title="纸面推导（未经 Lean 验证）：每站速率一的热浴链与完整空间谱隙"}
[@ex-ch39-p2e-local-parent] 的配置图拉普拉斯还给出一个精确的随机动力学对应。固定 $K\ge2$、$N\ge1$，沿用开放边界的 $W_N,z_N,C_i,h_i,B_a,H_{K,N}$ 与 $|\Psi_{K,N}\rangle$，简记 $z=z_N$。在合法字上取均匀律 $\pi(w)=1/z$。以下直接给出这一应用的纸面推导。

**一次刷新怎样作用？** 对位置 $i$，记 $\mathrm{outside}_i$ 为除第 $i$ 位外的全部位。对一个在 $W_N$ 中出现的外部配置 $\eta$，令

$$
\begin{aligned}
F_i(\eta)&=\{w\in W_N:w_{-i}=\eta\},\\
(E_i f)(w)&=\frac1{|F_i(w_{-i})|}
\sum_{v\in F_i(w_{-i})}f(v).
\end{aligned}
$$

这里固定的是第 $i$ 位以外的全部 $N-1$ 位。对合法字 $w$，把这个实际完成纤维另记为

$$
\begin{aligned}
A_i(w)&:=F_i(w_{-i})\\
&=\{u\in W_N:u_j=w_j\ \forall j\ne i\}.
\end{aligned}
$$

相同外部的布尔字只能是 $w$ 或 $\sigma_iw$。若 $c_i(w)=1$，父例的双向合法性说明两者都合法；它们第 $i$ 位不同，故 $A_i(w)=\{w,\sigma_iw\}$，基数恰为 $2$。若 $c_i(w)=0$，至少一个包含 $i$ 的完整窗口在所有非中心位上都是 $1$。$w$ 合法迫使 $w_i=0$，翻成 $1$ 就违反该窗口；因而 $A_i(w)=\{w\}$，基数恰为 $1$。这给出了原控制与实际纤维的对应，没有替换控制条件。

这就是给定 $\mathrm{outside}_i$ 的条件期望。把合法字的一位置零总是合法，故每个非空纤维或为 $\{\eta0,\eta1\}$，或为只能取零的单点 $\{\eta0\}$；中心位均插在位置 $i$。在双点纤维上 $C_i=1$，而在强制零的单点纤维上 $C_i=0$。因此相应的矩阵为

$$
\begin{aligned}
E_i&=\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix},\\
h_i&=\begin{pmatrix}1&-1\\-1&1\end{pmatrix}=2(I-E_i),
\end{aligned}
$$

其中最后的等式按函数值与合法基矢的对应来读；单点纤维上 $E_i=I$，两边均为零。

**逐个矩阵元核对系数二。** 在合法字上定义刷新核，约定行 $v$ 是当前字、列 $w$ 是刷新后的字。均匀律 $\pi$ 给出

$$
\begin{aligned}
T_i(v,w)&=\frac{\mathbf1_{\{w\in A_i(v)\}}}{|A_i(v)|},\\
(E_if)(v)&=\sum_{w\in W_N}T_i(v,w)f(w),\\
\sum_{w\in W_N}T_i(v,w)&=1.
\end{aligned}
$$

开启时，同纤维两点各有质量 $1/2$，包括以 $1/2$ 概率抽回当前字；关闭时只有 $T_i(v,v)=1$，其余为零。同纤维的 $A_i$ 相同，故 $T_i(v,w)=T_i(w,v)$。算符矩阵的行列则表示输出与输入振幅；把它与这里作用于函数的刷新核比较时，翻转的对合性给出 $\delta_{v,\sigma_iw}=\delta_{w,\sigma_iv}$，控制不变性给出 $c_i(\sigma_iv)=c_i(v)$。

现在取合法 $v,w$。对角情形，原乘积的矩阵元为 $c_i(v)^2=c_i(v)$，开启时等于 $2(1-1/2)=1$，关闭时等于 $2(1-1)=0$。若 $w=\sigma_iv$，两字都合法就迫使控制开启，否则上述禁窗口会排除其中一字；乘积元于是为 $-1=2(0-1/2)$。若既不相等也不互为这次翻转，则原乘积元和刷新质量都为零。因此在同一个合法字基上确有

$$
\langle v|h_i|w\rangle
=2\bigl(\delta_{v,w}-T_i(v,w)\bigr)
\qquad(v,w\in W_N).
$$

这里把 $W_N\subseteq\Omega_N$ 的每个合法字仍送到原来的完整字基矢；相等关系与 Kronecker 符号都不变。这正是上式 $h_i=2(I-E_i)$ 的限制空间含义。$T_i$ 的定义域是合法字，不能把这个随机核等式直接延伸到非法字上的原生算符。

例如 $K=N=2$、$i=2$，按合法基次序 $(00,01,10)$，实际纤维是 $\{00,01\}$ 和 $\{10\}$，故

$$
\begin{aligned}
T_2&=\begin{pmatrix}1/2&1/2&0\\1/2&1/2&0\\0&0&1\end{pmatrix},\\
h_2|_{\mathcal H_{\mathrm{legal}}}
&=\begin{pmatrix}1&-1&0\\-1&1&0\\0&0&0\end{pmatrix}
=2(I-T_2).
\end{aligned}
$$

三行刷新质量分别为 $1/2+1/2=1$、$1/2+1/2=1$、$1=1$。第 $1$ 站同样连接 $00$ 与 $10$；把两个局部矩阵相加，再把非法基矢 $11$ 的罚能 $1$ 加回，恰得父例原有的完整 $H_{2,2}$，谱仍为 $0,1,1,3$。当 $N<K$ 时，所有 $c_i=1$，每个实际单站纤维都含两个字；当 $N=0$ 时没有站点、没有这些矩阵元，也不由此断言存在激发谱隙。

让每个位置有独立的速率 $1$ 泊松钟；钟响时，按上述条件律重新抽取该位，允许抽回原值。这条热浴链作用在函数上的连续时间生成元是

$$
L=\sum_{i=1}^N(E_i-I).
$$

于是每条合法翻转边的跳转速率为 $1/2$。全链每单位时间平均有 $N$ 次刷新尝试。若 $P=N^{-1}\sum_iE_i$ 是每步均匀随机选一站刷新的离散时间算子，则

$$
-L=N(I-P).
$$

全链总速率 $1$ 的刷新过程则有生成元 $P-I=L/N$，两种时钟相差因子 $N$。

**从条件方差到量子能量。** 允许 $f,g:W_N\to\mathbb C$，约定内积对第一变量共轭线性，并定义

$$
\begin{aligned}
\langle f,g\rangle_\pi&=\frac1z\sum_{w\in W_N}\overline{f(w)}g(w),\\
\pi f&=\frac1z\sum_{w\in W_N}f(w),\\
\operatorname{Var}_\pi(f)&=\frac1z\sum_{w\in W_N}|f(w)-\pi f|^2.
\end{aligned}
$$

逐纤维平均使 $E_i$ 成为这个内积下的正交投影：它自伴、幂等，像空间是在每个纤维上为常数的函数。因此

$$
\begin{aligned}
\mathcal E(f,f)&:=-\langle f,Lf\rangle_\pi\\
&=\sum_i\|f-E_if\|_\pi^2\\
&=\sum_i\mathbb E_\pi\operatorname{Var}
(f\mid\mathrm{outside}_i)\\
&=\frac1{2z}\sum_{\{u,v\}\in\mathscr E_N}|f(u)-f(v)|^2,
\end{aligned}
$$

这里条件方差为 $E_i(|f-E_if|^2)$，$\mathscr E_N$ 是相差一位的无向合法字对集合，每条边只计一次。系数可逐对核对：双点纤维的条件方差为 $|f(u)-f(v)|^2/4$，纤维的 $\pi$ 质量为 $2/z$；单点纤维贡献为零。这也证明 $-L$ 自伴且正半定。

令 $\mathcal H_{\mathrm{legal}}=\operatorname{span}\{|w\rangle:w\in W_N\}$，定义

$$
Uf=z^{-1/2}\sum_{w\in W_N}f(w)|w\rangle.
$$

把这个对应反向用于原生复振幅时，记 $Z=z=z_N$，所以 $\pi(w)=1/Z$。任意合法支撑向量 $|\psi_L\rangle=\sum_{w\in W_N}a_w|w\rangle$ 的逆像显式为

$$
(U^{-1}\psi_L)(w)=f(w)=\sqrt Z\,a_w.
$$

若另一个合法支撑向量为 $|\phi_L\rangle=\sum_{w\in W_N}b_w|w\rangle$、$g(w)=\sqrt Z\,b_w$，则对第一变量取共轭的配对与范数满足

$$
\begin{aligned}
\langle f,g\rangle_\pi
&=\frac1Z\sum_{w\in W_N}
\overline{\sqrt Z\,a_w}\sqrt Z\,b_w\\
&=\sum_{w\in W_N}\overline{a_w}b_w
=\langle\psi_L,\phi_L\rangle,\\
\|f\|_\pi^2
&=\frac1Z\sum_{w\in W_N}|\sqrt Z\,a_w|^2
=\|\psi_L\|^2.
\end{aligned}
$$

这些和都是有限和，且 $Z>0$；因此任意合法复振幅都给出唯一逆像，无需额外的可积性或归一化假设。$U:L^2(\pi)\to\mathcal H_{\mathrm{legal}}$ 保内积且满射，故为酉映射。罚项在合法空间为零，逐纤维的矩阵等式于是给出

$$
\begin{aligned}
H_{\mathrm{legal}}
&:=H_{K,N}|_{\mathcal H_{\mathrm{legal}}}
=U(-2L)U^{-1}\\
&=2N\,U(I-P)U^{-1},\\
\langle Uf,H_{K,N}Uf\rangle&=2\mathcal E(f,f),\\
U1&=|\Psi_{K,N}\rangle,\\
\langle\Psi_{K,N}|Uf\rangle&=\pi f.
\end{aligned}
$$

对上述原生振幅，令 $\beta=\langle\Psi_{K,N}|\psi_L\rangle$。有限均值与方差公式具体成为

$$
\begin{aligned}
\pi f&=\frac1Z\sum_{w\in W_N}\sqrt Z\,a_w
=\beta,\\
\operatorname{Var}_\pi(f)
&=\|f\|_\pi^2-|\pi f|^2\\
&=\|\psi_L\|^2-|\beta|^2
=\|\psi_L-\beta\Psi_{K,N}\|^2.
\end{aligned}
$$

因此零均值恰对应于与基态正交。把原生自伴算符的二次型记为 $Q(A,\phi)=\langle\phi,A\phi\rangle$，逐站还有

$$
Q(h_i,\psi_L)=2\|f-E_if\|_\pi^2.
$$

对站点求和即恢复上面的总能量恒等式 $Q(H_{K,N},\psi_L)=2\mathcal E(f,f)$；合法支撑上所有 $B_a$ 的二次型均为零。这里的系数 $2$ 始终对应每站速率 $1$ 的时钟。

**为何合法空间的谱隙足够？** 合法字可逐位删除 $1$ 到全零字，故合法翻转图连通；$N\ge1$、$K\ge2$ 又保证全零字与仅首位为 $1$ 的字都是顶点。能量的边平方和因此恰在常数函数上为零，$-L$ 的第一正本征值 $\lambda_{K,N}$ 存在，且

$$
\lambda_{K,N}=\inf_{f\not\equiv\mathrm{constant}}
\frac{\mathcal E(f,f)}{\operatorname{Var}_\pi(f)}>0.
$$

这里的变分公式直接来自有限维自伴算子的谱分解：减去均值后，把函数展开在正本征值的正交本征基上，商是这些本征值的加权平均，最小本征向量取到下确界。

还须控制 $\mathcal H_{\mathrm{illegal}}=\mathcal H_{\mathrm{legal}}^\perp$。父例已证明 $C_i$ 允许的翻转保持合法性状态；因此每个 $h_i$ 保持这两个空间，对角的 $B_a$ 也如此。若非法空间非空，则对其中的任意 $|\chi\rangle=\sum_{w\notin W_N}a_w|w\rangle$，每个非法字至少含一个禁窗口，故

$$
\begin{aligned}
\langle\chi,H_{K,N}\chi\rangle
&\ge\sum_{w\notin W_N}\nu_K(w)|a_w|^2\\
&\ge\|\chi\|^2.
\end{aligned}
$$

第一步使用各 $h_i\ge0$，第二步使用 $\nu_K(w)\ge1$。设完整 $H_{K,N}$ 的第一正本征值为 $\Delta_{K,N}$。任意与基态正交的向量唯一分成 $Uf+\chi$，其中 $\pi f=0$，两块之间没有交叉能量，因而

$$
\begin{aligned}
\langle Uf+\chi,H_{K,N}(Uf+\chi)\rangle
&\ge2\lambda_{K,N}\|f\|_\pi^2+\|\chi\|^2,\\
\min\{1,2\lambda_{K,N}\}
&\le\Delta_{K,N}\le2\lambda_{K,N}.
\end{aligned}
$$

上界取合法空间内的最小正本征向量即可。若非法空间为空，则始终 $\chi=0$，实际有更精确的等式 $\Delta_{K,N}=2\lambda_{K,N}$，不能凭空添入能量为 $1$ 的激发态。

**两个精确的边界核对。** 当 $1\le N<K$ 时所有字都合法，非法空间为空，$E_i=(I+X_i)/2$。乘积字符 $f_A(w)=(-1)^{\sum_{i\in A}w_i}$（$A\subseteq\{1,\ldots,N\}$）构成函数空间的正交基，满足 $-Lf_A=|A|f_A$，故 $\lambda_{K,N}=1$、$\Delta_{K,N}=2$，也包括 $N=1$。当 $K=N=2$ 时，在合法字次序 $00,01,10$ 下

$$
-L=\frac12\begin{pmatrix}2&-1&-1\\-1&1&0\\-1&0&1\end{pmatrix}.
$$

向量 $(1,1,1)$、$(0,1,-1)$、$(-2,1,1)$ 的本征值依次为 $0,1/2,3/2$。非法字 $11$ 的两个 $h_i$ 均为零而罚能为 $1$，故完整谱为 $0,1,1,3$，与父例一致。

固定 $K$ 后，上面的两侧界说明：$\inf_{N\ge1}\Delta_{K,N}>0$ 当且仅当 $\inf_{N\ge1}\lambda_{K,N}>0$。由变分公式，这又当且仅当存在只依赖 $K$ 的有限常数 $C_K>0$，使所有 $N\ge1$ 及所有复值函数满足

$$
\operatorname{Var}_\pi(f)\le C_K\mathcal E(f,f).
$$

例如热浴谱隙下界 $c_K>0$ 将给出完整谱隙下界 $\min\{1,2c_K\}$；反向的完整谱隙下界 $d_K>0$ 将给出热浴谱隙下界 $d_K/2$。这个归约本身未证明这样的长度一致常数存在，也未给出其数值。下一例为同一硬约束、开放边界热浴链给出一个显式的长度一致 Poincaré 估计。沿字长方向的转移矩阵混合控制空间相关；若无进一步联系两种动力学的定理，它不能代替这里刷新时间方向的估计。
:::
