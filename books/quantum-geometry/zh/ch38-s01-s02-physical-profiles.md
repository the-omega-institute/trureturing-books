# 36.2.2 物理记录轮廓与保真度极小输入 {#sec-ch38-s01-s02-physical-profiles}


先在前述 Hann 顺序空间电路的深度一情形手算一次。两个地址是 $a_0=(\mathrm{false},())$、$a_1=(\mathrm{true},())$，输入总线为 $\mathrm{false}$，地址振幅各为 $1/\sqrt2$；经典存储 $D$ 任意固定。完整装载后，唯一的路由器分别处于 $0$、$1$。取 $0\le q\le1$，用四维环境的正交归一基 $e_*,e_W,e_0,e_1$ 保存一次局部记录：

$$
\begin{aligned}
r_0&=\sqrt q\,e_*+\sqrt{1-q}\,e_0,\\
r_1&=\sqrt q\,e_*+\sqrt{1-q}\,e_1.
\end{aligned}
$$

两条记录各自范数为 $1$，交叉重叠为 $q$。继续执行原来的理想门后，两条正交输出基矢为 $\lvert o_i\rangle=\lvert\operatorname{clean}(1,a_i,D(a_i))\rangle$；总线初值为假，所以这里的异或结果就是 $D(a_i)$。系统与环境的联合向量为

$$
\frac{\lvert o_0\rangle\otimes r_0
+\lvert o_1\rangle\otimes r_1}{\sqrt2}.
$$

忽略环境，就是将每个系统矩阵元所乘的记录外积沿环境基求和。在输出基 $(o_0,o_1)$ 上，记录的重叠矩阵 $K_{1,q}$、约化态与理想向量的坐标分别为

$$
\begin{aligned}
K_{1,q}&=\begin{pmatrix}1&q\\q&1\end{pmatrix},\\
\rho_{\mathrm{out}}&=\frac12 K_{1,q},\\
u&=\frac1{\sqrt2}\begin{pmatrix}1\\1\end{pmatrix}.
\end{aligned}
$$

相对于这个理想纯态的**平方保真度**取 $F=u^\dagger\rho_{\mathrm{out}}u$，于是

$$
\begin{aligned}
F&=\frac{1+q+q+1}{4}\\
 &=\frac{1+q}{2}.
\end{aligned}
$$

$q=1/2$ 时得到 $F=3/4$。这里计算的是平方保真度本身，不再对它取平方根。

现在固定这一噪声范围：在 [@thm-ch38-spatial-qutrit-qram-correctness] 的实际顺序装载 `load n n` 之后，对每个实际内部路由器独立施加一次相同的局部记录耦合，随后执行原来的总线交换、空间输运、固定经典数据的叶读出与完整前向过程的逆。门、地址槽、外部总线和空间轨道均保持理想。前述理想布尔可逆网络、理想 Hann 空间三态电路与这里插入单次路由器保持阶段的电路，是三个须分别指定的有限对象；上图的文献路径示意仍按 [@rem-ch38-qram-page-wootters-literature] 解释。

为给出完整输出，沿用已定义的 $A_n$、$Q=\{W,0,1\}$ 与 $S_n=\operatorname{State}(n)$。令 $n\in\mathbb N$，包括 $0$，$N=2^n$，$q\in[0,1]$，$D:A_n\to\operatorname{Bool}$ 为任意固定经典存储。以下缩写对应 `HannRouterDephasing` 中的对象；其中 `load`、`clean`、`initialized` 与其余电路操作仍取前述 `HannSpatialQram` 定义。

每个路由器的环境坐标是 $\{*\}\sqcup Q$，即 `Option Qutrit` 的 `none` 与 `some s`。对任意标签 $s\in Q$，记

$$
r_s=\sqrt q\,e_*+\sqrt{1-q}\,e_s.
$$

其坐标 $r_s(e)$ 正是 `localRecord q s e`。对 $Q\times Q$ 复矩阵 $X$，$\operatorname{diag}_Q(X)$ 表示只保留 $W,0,1$ 基中对角元的矩阵；$\mathcal E_q(X)$ 表示将每个 $X_{st}$ 乘以 $\sum_e r_s(e)\overline{r_t(e)}$ 所得的局部边缘矩阵。所有独立环境的基指标集合 $\mathcal E_n$ 对应 `Environment n`：

$$
\begin{aligned}
\mathcal E_0&=\operatorname{Unit},\\
\mathcal E_{n+1}&=(\{*\}\sqcup Q)
\times\mathcal E_n\times\mathcal E_n.
\end{aligned}
$$

记 $I_n$ 为 `Tree n` 的内部路由器位置集：深度零为空，每个分叉由根路由器与左右两份子树位置组成；入射和输出轨道不在 $I_n$ 中。对任意树配置 $t$，令 $t_v$ 是位置 $v$ 的路由标签。乘积记录及其密度矩阵方向的重叠为

$$
\begin{aligned}
R_t(e)&=\prod_{v\in I_n}r_{t_v}(e_v),\\
\Omega_q(t,u)&=\sum_{e\in\mathcal E_n}
 R_t(e)\overline{R_u(e)}.
\end{aligned}
$$

它们分别对应 `environmentRecord`、`recordOverlap`；深度零的乘积为 $1$。令 $m(t,u)=\#\{v\in I_n:t_v\ne u_v\}$，即只数内部路由坐标的 `routerMismatch`。

对 $s\in S_n$，记 $T(s)=s.2.2$ 为其空间树投影。令 $L_n=\operatorname{load}(n,n)$，$P_{n,D}=\operatorname{postLoad}(n,D)$；后者按顺序执行 `exchange`、`transport`、`readLeaves n D`、`(forward n).symm`，每步在完整系统上保留未涉及的坐标。实际装载树与逆像缩写为

$$
\begin{aligned}
\tau_{a,b}&=T\bigl(L_n(\operatorname{clean}(n,a,b))\bigr),\\
v_s&=P_{n,D}^{-1}(s),\\
w_s&=L_n^{-1}(v_s).
\end{aligned}
$$

对任意联合复振幅 $\psi:A_n\times\operatorname{Bool}\to\mathbb C$，令 $\alpha_\psi=\operatorname{initialized}(n,\psi)$。在整个物理基空间上定义联合振幅 $J_\psi$ 与系统矩阵 $\rho_{\mathrm{out}}$：

$$
\begin{aligned}
J_\psi(s,e)&=\alpha_\psi(w_s)R_{T(v_s)}(e),\\
\rho_{\mathrm{out}}(s,t)
 &=\Omega_q\bigl(T(v_s),T(v_t)\bigr)\\
 &\quad\cdot\alpha_\psi(w_s)
 \overline{\alpha_\psi(w_t)}.
\end{aligned}
$$

这正是 `jointOutput n q D ψ` 与 `noisyOutput n q D ψ`，记录附着在实际装载之后、理想后续门之前的路由配置上。下一定理给出两者的环境偏迹关系。

`addressWord n a` 按实际装载次序把地址写成首位在前的长度 $n$ 布尔字：空地址对应空字，$(c,a)$ 对应在尾地址字前添 $c$。记 $\ell(a,a')$ 为这两个字的最长公共前缀长度，即 `BinaryWordGeometry.lcp` 的长度。定义

$$
\begin{aligned}
d_n(a,a')&=\begin{cases}
0,&a=a',\\
2(n-\ell(a,a'))-1,&a\ne a',
\end{cases}\\
K_{n,q}(a,a')&=\begin{cases}
1,&a=a',\\
q^{2(n-\ell(a,a'))-1},&a\ne a'.
\end{cases}
\end{aligned}
$$

$K_{n,q}$ 对应实值的 `kernel`。不同地址时 $\ell<n$，故指数为正整数；相同地址单独取值 $1$，也适用于 $q=0$ 和唯一空地址。

记 $\mathcal C_n=\{\operatorname{clean}(n,a,b):a\in A_n,\ b\in\operatorname{Bool}\}$。以输入地址和总线标签标记理想输出：

$$
\begin{aligned}
o_{a,b}&=\operatorname{clean}(n,a,b\mathbin{\oplus}D(a)),\\
\lvert\phi_\psi\rangle
 &=\sum_{a\in A_n}\sum_{b\in\operatorname{Bool}}
 \psi(a,b)\lvert o_{a,b}\rangle.
\end{aligned}
$$

$o_{a,b}$ 对应 `outputBasis n D (a,b)`，$\phi_\psi:S_n\to\mathbb C$ 是 `idealOutput n D ψ` 的完整坐标向量。定义地址权重、实二次型及平方保真度：

$$
\begin{aligned}
p_a&=\sum_{b\in\operatorname{Bool}}|\psi(a,b)|^2,\\
E_{n,q}(p)&=\sum_{a\in A_n}\sum_{a'\in A_n}
 p_a p_{a'}K_{n,q}(a,a'),\\
F_{n,q,D}(\psi)
 &=\langle\phi_\psi\rvert\rho_{\mathrm{out}}
 \lvert\phi_\psi\rangle\\
 &=\sum_{s,t\in S_n}\overline{\phi_\psi(s)}
 \rho_{\mathrm{out}}(s,t)\phi_\psi(t).
\end{aligned}
$$

三者分别对应 `addressProbability`、`addressEnergy`、`squaredFidelity`；$|z|^2$ 对应 `Complex.normSq z`。`Normalized n ψ` 的条件是

$$
\sum_{a\in A_n}\sum_{b\in\operatorname{Bool}}
 |\psi(a,b)|^2=1.
$$

不要求 $\psi(a,b)$ 分解为地址振幅与总线振幅的乘积。最后，记 `minimumFidelity n q` 为

$$
\begin{aligned}
f_n(q)&=\frac{1+\displaystyle\sum_{j=0}^{n-1}
 2^j q^{2j+1}}{2^n}\\
 &=2^{-n}\left(1+\sum_{j=1}^{n}
 2^{j-1}q^{2j-1}\right),
\end{aligned}
$$

其中 $n=0$ 时两种求和均为空。`uniformInput n` 记为 $h_n$：当 $b=\mathrm{false}$ 时 $h_n(a,b)=1/\sqrt{2^n}$，当 $b=\mathrm{true}$ 时为 $0$。

::: {.theorem #thm-ch38-single-hold-router-dephasing title="单次路由器保持阶段的退相干、完整输出与平方保真度的尖锐下界" lean="D5/S3/Quantum/Routing/HannRouterDephasing.result"}
对每个 $n\in\mathbb N$、$q\in[0,1]$ 及每个固定经典存储 $D:A_n\to\operatorname{Bool}$，采用上述实际装载、独立局部记录与原理想后续门，有以下结论。

1. 对任意 $Q\times Q$ 复矩阵 $X$，局部环境偏迹给出信道

   $$
   \mathcal E_q(X)=qX+(1-q)\operatorname{diag}_Q(X),
   $$

   其中 $\operatorname{diag}_Q$ 只保留 $W,0,1$ 基中的对角元。逐项地，对每个 $s,t\in Q$，

   $$
   \begin{aligned}
   &\left(\sum_{e\in\{*\}\sqcup Q}
   r_s(e)\overline{r_t(e)}\right)X_{st}\\
   &\quad=qX_{st}+(1-q)
   \begin{cases}X_{st},&s=t,\\0,&s\ne t.\end{cases}
   \end{aligned}
   $$

   对每个 $t\in\operatorname{Tree}(n)$，$\Omega_q(t,t)=1$。

2. 对所有 $a,a'\in A_n$ 与 $b,b'\in\operatorname{Bool}$，实际装载树满足

   $$
   \begin{aligned}
   m(\tau_{a,b},\tau_{a',b'})&=d_n(a,a'),\\
   \Omega_q(\tau_{a,b},\tau_{a',b'})&=K_{n,q}(a,a').
   \end{aligned}
   $$

   右端与两个总线标签均无关；实数 $K_{n,q}$ 在复等式中取其自然嵌入。

3. 对任意复振幅 $\psi$，不要求归一化，对所有 $s,t\in S_n$，完整环境偏迹为

   $$
   \sum_{e\in\mathcal E_n}
   J_\psi(s,e)\overline{J_\psi(t,e)}
   =\rho_{\mathrm{out}}(s,t).
   $$

   对所有 $a,a',b,b'$，每个干净输出矩阵元为

   $$
   \begin{aligned}
   &\rho_{\mathrm{out}}(o_{a,b},o_{a',b'})\\
   &\quad=\psi(a,b)\overline{\psi(a',b')}
   K_{n,q}(a,a').
   \end{aligned}
   $$

   若 $s\notin\mathcal C_n$ 或 $t\notin\mathcal C_n$，则 $\rho_{\mathrm{out}}(s,t)=0$；因此矩阵支撑于干净输出基矢的张成空间。

4. 若 $\psi$ 归一化，则理想完整输出向量也归一化，且平方保真度为实数并满足

   $$
   \begin{aligned}
   \sum_{s\in S_n}|\phi_\psi(s)|^2&=1,\\
   F_{n,q,D}(\psi)&=E_{n,q}(p)\\
   &=\sum_{a,a'\in A_n}p_a p_{a'}K_{n,q}(a,a')\\
   &\ge f_n(q).
   \end{aligned}
   $$

5. $h_n$ 是归一化输入，并且对每个地址 $a$，

   $$
   \begin{aligned}
   h_n(a,\mathrm{false})&=2^{-n/2},\\
   h_n(a,\mathrm{true})&=0,\\
   F_{n,q,D}(h_n)&=f_n(q),\\
   f_0(q)&=1.
   \end{aligned}
   $$

   这里 $2^{-n/2}$ 取正实值；该输入对所有上述 $n,q,D$ 均达到下界。
:::

::: proof
先沿实际 `load n n` 的装载正确性，把树投影识别为 `programmed n a n`。地址相同则所有路由器相同。地址不同而公共前缀长为 $\ell$ 时，前 $\ell$ 个路由器一致；第一次分歧处，一个路由器保存 $0$，另一个保存 $1$，贡献一次失配。分歧之后，两条路径进入互不相交的子树：每条尾路径上有 $n-\ell-1$ 个已占据路由器，而另一配置在这些位置为等待态 $W$。所以总失配数为

$$
1+2(n-\ell-1)=2(n-\ell)-1.
$$

装载时总线仍在独立的外部坐标，故这个计数不含 $b,b'$。每个局部记录重叠在标签相同时为 $1$，不同时为 $q$；独立环境使这些重叠相乘，得到实际装载树的 $K_{n,q}$，并使任意树的自重叠为 $1$。局部矩阵元公式也直接给出 $qX+(1-q)\operatorname{diag}_Q(X)$。

保持环境记录不变，只对系统施加原来的 $P_{n,D}$。理想查询把每个干净输入送到 $o_{a,b}$；在完整系统基上按逆置换拉回振幅，正得到 $J_\psi$ 与 $\rho_{\mathrm{out}}$ 的定义。沿环境坐标求和给出偏迹等式。初始化振幅在干净输入以外为零，而理想查询把干净基双射到干净基，因而所有干净矩阵元及离开该张成空间的零矩阵元都得到确定。

将理想向量代入完整系统双重求和，每对输入标签贡献 $|\psi(a,b)|^2|\psi(a',b')|^2K_{n,q}(a,a')$。分别对两个总线标签求和，留下 $p_a p_{a'}$，得到精确的实二次型；这里没有假设地址与总线的振幅独立。

下界沿二叉树深度归纳。将深度 $n+1$ 的实地址权重按首位分成 $p_0,p_1$，记其总质量为 $s=\sum_a p_0(a)$、$t=\sum_a p_1(a)$，令 $c=q^{2n+1}$。同支核是深度 $n$ 的核，异支核恒为 $c$，所以

$$
\begin{aligned}
E_{n+1,q}(p)&=E_{n,q}(p_0)+E_{n,q}(p_1)\\
 &\quad+2cst,\\
f_{n+1}(q)&=\frac{f_n(q)+c}{2}.
\end{aligned}
$$

归纳对任意总质量使用齐次下界 $E_{n,q}(p_i)\ge f_n(q)(\sum_a p_i(a))^2$。由 $0\le q\le1$，同一递推给出 $f_n(q)\ge c$。因此两支下界相加后，超过所需齐次界的余项为

$$
\begin{aligned}
&f_n(q)(s^2+t^2)+2cst\\
&\quad-f_{n+1}(q)(s+t)^2\\
&=\frac{f_n(q)-c}{2}(s-t)^2\ge0.
\end{aligned}
$$

深度零的二次型就是总质量的平方；归一化时总质量为 $1$，遂得下界。最后，每行核的和相同：

$$
\begin{aligned}
\sum_{a'\in A_n}K_{n,q}(a,a')
 &=1+\sum_{j=0}^{n-1}2^j q^{2j+1}\\
 &=2^n f_n(q).
\end{aligned}
$$

均匀输入 $h_n$ 在 $2^n$ 个地址上的概率均为 $2^{-n}$，总概率为 $1$；常行和遂给出 $F_{n,q,D}(h_n)=f_n(q)$。这个输入达到下界，因而下界是尖锐的。完整证明由 Lean 内核检查。
:::

直接代入有限和可得闭区间两端 $f_n(0)=2^{-n}$、$f_n(1)=1$。对任意归一化输入，$q=0$ 时仅消去不同地址间的项，故 $F=\sum_a p_a^2$，均匀地址权重达到 $2^{-n}$；$q=1$ 时所有核元均为 $1$，故 $F=(\sum_a p_a)^2=1$。$n=0$ 时没有路由器，空乘积与空和给出任意归一化输入在所有 $q\in[0,1]$ 下的 $F=1$。这些结论都属于 [@thm-ch38-single-hold-router-dephasing] 指定的单次独立路由器保持阶段与其余理想门。它补充了前述有限 Hann 电路的信道结论；原来的理想布尔网络、理想 Hann 查询与外部文献各按其陈述解释。这里不涉及门噪声、相关或重复保持阶段、现实硬件容错，也不证明下面无限地址本体及观察者指针的 `MODEL` 后果。

**异质路由器：环境究竟分辨了哪些地址？** 上面的同质保持阶段给每个路由器相同的 $q$。现在只放开这一处：每个实际内部路由器 $v$ 有自己的 $q(v)\in[0,1]$，仍在完整顺序装载后独立记录一次，随后执行原来的理想后续门。$q(v)=1$ 时，局部环境只保留共同坐标，读不出该路由器的标签；$q(v)=0$ 时，它完整区分 $W,0,1$。因此，地址数与不同环境记录的数目可以不同。要描述这种退化，先逐个找到被记录的物理坐标，再把具有相同可见标签的地址归为一类。

::: {.definition #def-ch38-profile-routers title="实际内部路由器与装载标签" lean="D5/S3/Quantum/Routing/HannRouterProfiles.Router D5/S3/Quantum/Routing/HannRouterProfiles.routerLabel D5/S3/Quantum/Routing/HannRouterProfiles.snoc D5/S3/Quantum/Routing/HannRouterProfiles.deepest D5/S3/Quantum/Routing/HannRouterProfiles.loadedLabel"}
沿用首位在前的地址 $A_0=\{()\}$、$A_{m+1}=\operatorname{Bool}\times A_m$，以及 $Q=\{W,0,1\}$、空间树与完整系统基空间 $S_n$。以下对象取自 `HannRouterProfiles`；电路操作仍取自 `HannSpatialQram`。

具体地，$\operatorname{Tree}(m)=Q\times\operatorname{Interior}(m)$，$\operatorname{Interior}(0)=\operatorname{Unit}$，$\operatorname{Interior}(m+1)=Q\times\operatorname{Tree}(m)\times\operatorname{Tree}(m)$，而 $S_n=(\operatorname{Fin}(n)\to Q)\times Q\times\operatorname{Tree}(n)$。树的首坐标是入射模式，内部结构的首坐标才是路由器。

内部路由器位置集为

$$
I_0=\varnothing,\qquad
I_{m+1}=\{\mathrm{root}\}\sqcup(\operatorname{Bool}\times I_m).
$$

它对应 `Router n`；根对应 `none`，$(c,v)$ 对应 `some (c,v)`，其中假选左子树，真选右子树。`routerLabel n t v` 只读树 $t$ 的路由器字段，记为 $t_v$；入射模式和输出轨道均不在 $I_n$ 中。

令 $L_n=\operatorname{load}(n,n)$，$T(s)$ 为系统配置 $s$ 的树投影。对 $a\in A_n$、任意外部三态总线标签 $\beta\in Q$，定义

$$
\begin{aligned}
\tau_{a,\beta}&=T\bigl(L_n(\operatorname{loading}(n,a,\beta,0))\bigr),\\
\lambda_{a,\beta}(v)&=(\tau_{a,\beta})_v.
\end{aligned}
$$

第二行即 `loadedLabel n a β v`。`snoc m u c` 在 $u\in A_m$ 的末尾添加一位 $c$；$d_m(u)=\operatorname{deepest}(m,u)\in I_{m+1}$ 是沿前缀 $u$ 到达的最深层路由器。它按地址首位在前的顺序递归定位。
:::

实际装载正确性给出 $\tau_{a,\beta}=\operatorname{programmed}(n,a,n)$，所以 $\lambda_{a,\beta}$ 与 $\beta$ 无关；下文也写作 $\lambda_a$。这里读的是装载完成时的树，并非另造一个只有路径名字的抽象地址编码。路径外的路由器仍有实际的 $W$ 标签，也参与环境记录。

::: {.definition #def-ch38-profile-records title="异质局部记录与物理张量环境" lean="D5/S3/Quantum/Routing/HannRouterProfiles.Environment D5/S3/Quantum/Routing/HannRouterProfiles.treeRecord D5/S3/Quantum/Routing/HannRouterProfiles.record"}
给定 $q:I_n\to[0,1]$，在每个位置 $v$ 使用一份具有正交归一基 $e_*,e_W,e_0,e_1$ 的环境，局部记录为

$$
r_{v,s}=\sqrt{q(v)}\,e_*+\sqrt{1-q(v)}\,e_s,
\qquad s\in Q.
$$

这是 `HannRouterDephasing.localRecord (q v) s`。环境基指标集为 $\mathcal E_n=(\{*\}\sqcup Q)^{I_n}$，对应本节的 `Environment n`。对任意 $t\in\operatorname{Tree}(n)$，定义

$$
\begin{aligned}
\mathcal R_t(e)&=\prod_{v\in I_n}r_{v,t_v}(e_v),\\
R_a(e)&=\prod_{v\in I_n}r_{v,\lambda_{a,W}(v)}(e_v).
\end{aligned}
$$

两者分别为 `treeRecord n q t` 与 `record n q a`。$n=0$ 时环境只有一个基指标，两个空乘积都为 $1$。

局部耦合将路由器基矢 $\lvert s\rangle$ 连同空白环境送到 $\lvert s\rangle\otimes r_{v,s}$；各位置独立耦合后，树基矢对应 $\lvert t\rangle\otimes\mathcal R_t$，其他系统坐标保持原值。
:::

::: {.definition #def-ch38-active-profiles title="实现的活跃轮廓与类记录" lean="D5/S3/Quantum/Routing/HannRouterProfiles.SameProfile D5/S3/Quantum/Routing/HannRouterProfiles.Separates D5/S3/Quantum/Routing/HannRouterProfiles.Profile D5/S3/Quantum/Routing/HannRouterProfiles.profile D5/S3/Quantum/Routing/HannRouterProfiles.classRecord"}
位置 $v$ 称为活跃的，当且仅当 $q(v)<1$。对任意实值函数 $q:I_n\to\mathbb R$，`SameProfile n q a a' β β'` 表示

$$
\forall v\in I_n,\quad q(v)<1\ \Longrightarrow\
\lambda_{a,\beta}(v)=\lambda_{a',\beta'}(v).
$$

`Separates n q` 表示对所有 $a,a'\in A_n$ 与 $\beta,\beta'\in Q$，这个条件都蕴含 $a=a'$。记 $\pi(a)$ 为 $\lambda_{a,W}$ 在活跃位置上的限制，$C_{n,q}=\pi(A_n)$ 为其实际像；它们对应 `profile` 与 `Profile`。不被任何地址实现的标签组合不属于 $C_{n,q}$。

在 $q(v)\in[0,1]$ 的物理范围内，类记录 $R_c$ 是任取满足 $\pi(a)=c$ 的代表地址所得的 $R_a$，对应 `classRecord`。相同类在活跃位置标签相同；其余位置的 $q(v)=1$，记录恒为 $e_*$，故此定义不依赖代表的选择。
:::

::: {.theorem #thm-ch38-profile-separation title="最深层物理路由器的精确分辨条件" lean="D5/S3/Quantum/Routing/HannRouterProfiles.profile_separation_iff"}
对任意 $m\in\mathbb N$ 及任意实值函数 $q:I_{m+1}\to\mathbb R$，不要求区间限制，

$$
\begin{aligned}
&\bigl[\forall a,a'\in A_{m+1},\ \forall\beta,\beta'\in Q,\\
&\qquad\operatorname{SameProfile}(m+1,q,a,a',\beta,\beta')
\ \Longrightarrow\ a=a'\bigr]\\
&\qquad\Longleftrightarrow\quad
\forall u\in A_m,\ q(d_m(u))<1.
\end{aligned}
$$
:::

::: {.proof #pf-ch38-profile-separation}
把任意地址写成 $\operatorname{snoc}(m,u,c)$。实际装载树在最深层位置满足

$$
\lambda_{\operatorname{snoc}(m,u,c),\beta}(d_m(i))
=\begin{cases}\operatorname{encode}(c),&i=u,\\W,&i\ne u.\end{cases}
$$

同一前缀 $u$ 下的两个末位兄弟地址，除 $d_m(u)$ 外的所有内部路由器标签都相同。若这个最深层位置不活跃，两个不同地址便具有相同活跃轮廓，必要性成立。反过来，若所有最深层位置都活跃，就观察第一个地址前缀下的 $d_m(u)$：不同前缀给出编码标签与 $W$ 的区别；相同前缀则由编码标签区分最后一位。装载标签不依赖外部总线，所以论证同时允许两个任意、彼此不同的总线标签。这一分辨条件本身只是组合陈述；物理记录的平方根与归一化仍使用闭区间假设。完整证明由 Lean 内核检查。
:::

::: {.definition #def-ch38-profile-gram-energy title="复格拉姆矩阵、类系数和与能量" lean="D5/S3/Quantum/Routing/HannRouterProfiles.gram D5/S3/Quantum/Routing/HannRouterProfiles.classSum D5/S3/Quantum/Routing/HannRouterProfiles.addressEnergy D5/S3/Quantum/Routing/HannRouterProfiles.classEnergy"}
在上述物理范围内，定义密度矩阵方向的复格拉姆矩阵

$$
G(a,a')=\sum_{e\in\mathcal E_n}R_a(e)\overline{R_{a'}(e)}.
$$

它对应 `gram n q`。对任意复系数 $z:A_n\to\mathbb C$，类系数和为

$$
(\Sigma_qz)_c=\sum_{a:\pi(a)=c}z_a,
$$

对应 `classSum`；同一有限和也用于实系数。对任意实向量 $p:A_n\to\mathbb R$ 与 $x:C_{n,q}\to\mathbb R$，定义

$$
\begin{aligned}
E_q(p)&=\sum_{a,a'\in A_n}p_ap_{a'}\operatorname{Re}G(a,a'),\\
H_q(x)&=\sum_{e\in\mathcal E_n}
\left|\sum_{c\in C_{n,q}}x_cR_c(e)\right|^2.
\end{aligned}
$$

它们分别对应 `addressEnergy` 与 `classEnergy`。这里 $|z|^2$ 是 `Complex.normSq z`；这些能量定义本身不要求系数非负或总和为 $1$。
:::

::: {.definition #def-ch38-profile-laws title="概率单纯形、类质量与最深层活跃性" lean="D5/S3/Quantum/Routing/HannRouterProfiles.AddressDistribution D5/S3/Quantum/Routing/HannRouterProfiles.ClassDistribution D5/S3/Quantum/Routing/HannRouterProfiles.classMass D5/S3/Quantum/Routing/HannRouterProfiles.inputDistribution D5/S3/Quantum/Routing/HannRouterProfiles.distributionInput D5/S3/Quantum/Routing/HannRouterProfiles.DeepestActive"}
记 $\Delta(A_n)$、$\Delta(C_{n,q})$ 为各自的概率单纯形，即非负权重总和为 $1$ 的集合，对应 `AddressDistribution` 与 `ClassDistribution`。类质量映射 `classMass` 为

$$
(\pi_*p)_c=\sum_{a:\pi(a)=c}p_a.
$$

对任意联合复振幅 $\psi:A_n\times\operatorname{Bool}\to\mathbb C$，令 $p^\psi_a=\sum_b|\psi(a,b)|^2$。若 $\sum_{a,b}|\psi(a,b)|^2=1$，称其归一化；此时 $p^\psi\in\Delta(A_n)$，即 `inputDistribution`。不要求地址与总线的乘积态形式。对 $p\in\Delta(A_n)$，`distributionInput` 为

$$
\psi_p(a,b)=\begin{cases}\sqrt{p_a},&b=\mathrm{false},\\0,&b=\mathrm{true},\end{cases}
$$

其中平方根作为非负实数嵌入 $\mathbb C$。

`DeepestActive n q` 在 $n=0$ 时为真；在 $n=m+1$ 时表示 $\forall u\in A_m,\ q(d_m(u))<1$。
:::

::: {.definition #def-ch38-profile-output title="实际保持阶段的完整输出与平方保真度" lean="D5/S3/Quantum/Routing/HannRouterProfiles.jointOutput D5/S3/Quantum/Routing/HannRouterProfiles.noisyOutput D5/S3/Quantum/Routing/HannRouterProfiles.squaredFidelity"}
固定任意经典存储 $D:A_n\to\operatorname{Bool}$。沿用 $P_{n,D}=\operatorname{postLoad}(n,D)$，依次执行原来的总线交换、空间输运、叶读出及完整前向过程的逆；它不作用于环境。对 $s\in S_n$ 记

$$
v_s=P_{n,D}^{-1}(s),\qquad w_s=L_n^{-1}(v_s),\qquad
\alpha_\psi=\operatorname{initialized}(n,\psi).
$$

异质记录的联合振幅、完整系统密度矩阵与平方保真度定义为

$$
\begin{aligned}
J^q_\psi(s,e)&=\alpha_\psi(w_s)\mathcal R_{T(v_s)}(e),\\
\rho^q_\psi(s,t)&=\sum_{e\in\mathcal E_n}
J^q_\psi(s,e)\overline{J^q_\psi(t,e)},\\
F^q_D(\psi)&=\sum_{s,t\in S_n}
\overline{\phi_\psi(s)}\rho^q_\psi(s,t)\phi_\psi(t).
\end{aligned}
$$

这里 $o_{a,b}=\operatorname{clean}(n,a,b\mathbin{\oplus}D(a))$，$\phi_\psi=\sum_{a,b}\psi(a,b)\lvert o_{a,b}\rangle$ 是原来的完整理想输出。上述三式对应本节的 `jointOutput`、`noisyOutput` 与 `squaredFidelity`，求和遍及整个物理系统 $S_n$，仅偏迹掉独立路由器环境。对未归一化振幅，三式仍按相同有限和定义；平方保真度的态比较含义用于归一化输入。

其中 $\operatorname{clean}(n,a,b)=\operatorname{loading}(n,a,\operatorname{encode}(b),0)$：地址槽保存编码地址，外部总线保存编码布尔位，树为真空。初始化满足 $\alpha_\psi(\operatorname{clean}(n,a,b))=\psi(a,b)$，在所有其他基配置上为零。
:::

::: {.theorem #thm-ch38-physical-profile-event title="异质物理轮廓、复系数核与全部保真度极小输入" lean="D5/S3/Quantum/Routing/HannRouterProfiles.physical_profile_event"}
对每个 $n\in\mathbb N$、每个实值路由器函数 $q:I_n\to\mathbb R$，假设对所有 $v\in I_n$ 均有 $0\le q(v)\le1$；固定任意经典存储 $D:A_n\to\operatorname{Bool}$。采用上述实际装载、独立单次记录与原理想后续门，以下各款同时成立。

1. **(P1) 任意总线的实际装载记录。** 对所有 $a\in A_n$、$\beta\in Q$，$\mathcal R_{\tau_{a,\beta}}=R_a$，等式为整个环境坐标函数的相等。
2. **(P2) 任意树的记录归一化。** 对所有 $t\in\operatorname{Tree}(n)$，$\sum_e|\mathcal R_t(e)|^2=1$。
3. **(P3) 类与可见标签等价。** 对所有 $a,a'\in A_n$、$\beta,\beta'\in Q$，

   $$
   \pi(a)=\pi(a')\ \Longleftrightarrow\
   \forall v\in I_n,\ q(v)<1\Rightarrow
   \lambda_{a,\beta}(v)=\lambda_{a',\beta'}(v).
   $$

4. **(P4) 类记录复线性无关。** $\{R_c:c\in C_{n,q}\}$ 在 $\mathbb C$ 上线性无关。
5. **(P5) 精确秩。** $\operatorname{rank}_{\mathbb C}G=|C_{n,q}|$。
6. **(P6) 任意复系数的完整核。** 对所有 $z:A_n\to\mathbb C$，

   $$
   Gz=0\ \Longleftrightarrow\
   \forall c\in C_{n,q},\ \sum_{a:\pi(a)=c}z_a=0.
   $$

7. **(P7) 全秩充要条件。** $\operatorname{rank}_{\mathbb C}G=2^n$ 当且仅当 `DeepestActive n q`。
8. **(P8) 深度零的秩。** 若 $n=0$，则 $\operatorname{rank}_{\mathbb C}G=1$。
9. **(P9) 类质量分解。** 对每个 $p\in\Delta(A_n)$，$E_q(p)=H_q(\pi_*p)$。
10. **(P10) 完整理想输出的逆像。** 对任意复振幅 $\psi$ 与所有 $s\in S_n$，$\phi_\psi(s)=\alpha_\psi(w_s)$，无需归一化。
11. **(P11) 每个干净输出矩阵元。** 对任意复振幅 $\psi$ 及所有 $a,a'\in A_n$、$b,b'\in\operatorname{Bool}$，

    $$
    \rho^q_\psi(o_{a,b},o_{a',b'})
    =\psi(a,b)\overline{\psi(a',b')}G(a,a').
    $$

12. **(P12) 完整系统的精确保真度式。** 对任意复振幅 $\psi$，$F^q_D(\psi)=E_q(p^\psi)$，右端自然嵌入 $\mathbb C$；无需归一化，该值为实数。
13. **(P13) 两个完整向量的归一化。** 若 $\psi$ 归一化，则

    $$
    \begin{aligned}
    \sum_{s\in S_n}\sum_{e\in\mathcal E_n}|J^q_\psi(s,e)|^2&=1,\\
    \sum_{s\in S_n}|\phi_\psi(s)|^2&=1.
    \end{aligned}
    $$

14. **(P14) 每个地址概率律可实现。** 对每个 $p\in\Delta(A_n)$，$\psi_p$ 归一化，且其 `inputDistribution` 恰为 $p$。
15. **(P15) 唯一类极小点与全部极小纤维。** 存在 $\mu^*\in\Delta(C_{n,q})$，满足 $H_q(\mu^*)\le H_q(\nu)$ 对所有 $\nu\in\Delta(C_{n,q})$ 成立；任何也满足此极小条件的类概率律均等于 $\mu^*$。映射 $\pi_*:\Delta(A_n)\to\Delta(C_{n,q})$ 为满射。对每个 $p\in\Delta(A_n)$，

    $$
    \begin{aligned}
    &[\forall r\in\Delta(A_n),\ E_q(p)\le E_q(r)]\\
    &\qquad\Longleftrightarrow\quad \pi_*p=\mu^*.
    \end{aligned}
    $$

    对每个归一化联合输入 $\psi$，

    $$
    \begin{aligned}
    &[\forall\varphi\ \text{归一化},\
    \operatorname{Re}F^q_D(\psi)\le\operatorname{Re}F^q_D(\varphi)]\\
    &\qquad\Longleftrightarrow\quad \pi_*p^\psi=\mu^*.
    \end{aligned}
    $$

    全部极小地址律正是满足 $p_a\ge0$、$\sum_ap_a=1$、$\sum_{a:\pi(a)=c}p_a=\mu^*_c$ 的整个集合；不要求类权重或地址权重严格为正。
:::

::: {.proof #pf-ch38-physical-profile-event}
实际装载树等于完整编程树，立刻给出 P1 与 P3 中对任意外部三态总线的独立性。对任意两种局部标签 $s,t$，逐项相乘四个环境坐标得到

$$
\sum_\eta r_{v,s}(\eta)\overline{r_{v,t}(\eta)}
=\begin{cases}1,&s=t,\\q(v),&s\ne t.\end{cases}
$$

相同标签贡献 $q(v)+(1-q(v))=1$；不同标签只共享共同坐标。有限张量积把各节点的重叠相乘。因此任意树记录的范数为 $1$，得到 P2；地址格拉姆元也可直接读成 $\prod_{v:\lambda_a(v)\ne\lambda_{a'}(v)}q(v)$。空乘积保留深度零和两端点，不需要除以任何 $q(v)$。

为看清 P4，给每个实现的类 $c$ 选择一个实际环境基指标 $e^{(c)}$：活跃节点取该类的标签坐标，其余节点取共同坐标。于是

$$
\begin{aligned}
R_d(e^{(c)})&=\begin{cases}\delta_q,&d=c,\\0,&d\ne c,\end{cases}\\
\delta_q&=\prod_{v:q(v)<1}\sqrt{1-q(v)}>0.
\end{aligned}
$$

在这个坐标上求值，就能从任意类记录的复线性组合中单独取出第 $c$ 个系数。令列矩阵 $M(e,a)=R_a(e)$。记录都是实数，所以本节密度方向的 $G$ 同时等于 $M^\dagger M$。格拉姆矩阵与列矩阵具有相同的核和秩；而

$$
\sum_a z_aR_a=\sum_c(\Sigma_qz)_cR_c.
$$

结合类记录线性无关及 $\pi$ 到实际像的满射，便得 P5、P6。再由 [@thm-ch38-profile-separation]，类映射在正深度单射恰好要求所有最深层路由器活跃，得到 P7。深度零只有空地址与单位记录，$G=(1)$，P8 成立，此时 `DeepestActive` 没有额外限制。

把实地址系数按类合并，记录叠加的平方范数正是 $E_q$，从而给出 P9。类记录的线性无关还说明：若实向量 $x\ne0$，则 $H_q(x)>0$。展开平方范数，得到中点缺口

$$
H_q\!\left(\frac{x+y}{2}\right)
=\frac{H_q(x)+H_q(y)}2-\frac{H_q(x-y)}4.
$$

类概率单纯形非空且紧，$H_q$ 连续，因而取得极小值。若有两个不同极小点，中点仍在单纯形内，而上式严格降低能量，矛盾。故极小类律唯一；这一步不要求极小点位于单纯形内部。

每个类都有代表地址。将某一类的质量全部放在它的一个代表上，就把任意类概率律提升为地址概率律，包括零质量的类。因此 $\pi_*$ 为满射。P9 与类极小点的唯一性遂给出 P15 的地址等价式，允许在各类内作任意非负分配。若 $\mu^*_c=0$，该类内每个地址权重都必须为零；这仍属于同一个完整纤维。

物理输出部分使用原来的实际电路。理想查询将 $\operatorname{clean}(n,a,b)$ 送到 $o_{a,b}$；逆置换拉回初始化振幅，给出 P10。在这个输出基上，$J^q_\psi(o_{a,b},e)=\psi(a,b)R_a(e)$，环境偏迹遂给出 P11。对于整个 $S_n$，联合振幅与密度矩阵仍由定义中的逆像和环境和确定；没有把系统先缩成只有地址的模型。由 P2、P10 及理想置换保持范数，联合向量与理想向量的范数均为 $1$，得到 P13。

将 P11 代入完整理想输出的期望值，每对输入标签贡献 $|\psi(a,b)|^2|\psi(a',b')|^2G(a,a')$。对 $b,b'$ 分别求和即得 P12，且不需要乘积态假设或归一化假设。对于 P14，非负平方根使 $\sum_b|\psi_p(a,b)|^2=p_a$，再对 $a$ 求和便是 $1$。因此每个地址律都有归一化联合输入实现；结合 P12，地址律上的极小条件与所有归一化联合输入上的极小条件完全等价，完成 P15。完整证明由 Lean 内核检查。
:::

::: {.example #ex-ch38-heterogeneous-profile-fiber title="深度二：三种记录与一条最优地址纤维"}
取深度 $2$，将根、左子、右子路由器依次记为 $r,\ell,h$，令 $q(r)=1$、$q(\ell)=0$、$q(h)=1$。地址按首位在前写作 $00,01,10,11$。实际装载标签逐项为

$$
\begin{array}{c|ccc}
a&r&\ell&h\\\hline
00&0&0&W\\
01&0&1&W\\
10&1&W&0\\
11&1&W&1
\end{array}
$$

只有左子路由器活跃。根与右子环境的记录均为 $e_*$，故按 $(r,\ell,h)$ 的张量顺序，

$$
\begin{aligned}
R_{00}&=e_*\otimes e_0\otimes e_*,\\
R_{01}&=e_*\otimes e_1\otimes e_*,\\
R_{10}=R_{11}&=e_*\otimes e_W\otimes e_*.
\end{aligned}
$$

这直接给出三个实现的类 $c_0=\{00\}$、$c_1=\{01\}$、$c_W=\{10,11\}$，以及

$$
G=\begin{pmatrix}
1&0&0&0\\0&1&0&0\\0&0&1&1\\0&0&1&1
\end{pmatrix}.
$$

其秩为 $3$，复系数核恰为 $z_{00}=z_{01}=0$、$z_{10}+z_{11}=0$。右子最深层路由器不活跃，正好对应两个兄弟地址合为一类。三个类记录正交归一，所以对类质量 $(x,y,z)$ 有 $H_q=x^2+y^2+z^2$。在 $x+y+z=1$ 下，

$$
x^2+y^2+z^2-\frac13
=\left(x-\frac13\right)^2+
\left(y-\frac13\right)^2+\left(z-\frac13\right)^2.
$$

唯一极小类律为 $(1/3,1/3,1/3)$，最小平方保真度为 $1/3$。全部极小地址律为

$$
(p_{00},p_{01},p_{10},p_{11})
=\left(\frac13,\frac13,t,\frac13-t\right),
\qquad 0\le t\le\frac13.
$$

两端各有一个零地址权重；不应在写纤维时把它们删掉。均匀地址律的类质量为 $(1/4,1/4,1/2)$，能量为 $3/8>1/3$。对每个固定经典 $D$，任意归一化联合复输入都是极小输入，当且仅当其三个类质量分别为 $1/3$；允许的复相位、类内地址分配及地址—总线纠缠均由这个条件保留。这些数值由上述实际记录手算得到，是 [@thm-ch38-physical-profile-event] 的具体代入。
:::

::: {.remark #rem-ch38-profile-scope title="秩、极小纤维与物理适用范围"}
P6 描述的是复格拉姆矩阵作用于地址系数向量的核，不能把它改称密度矩阵信道的核。P15 的唯一性也只属于类概率律；同一最优类质量内的全部非负地址分配都保留，联合输入还可具有不同相位与纠缠。一般情形没有要求 $\mu^*$ 满支撑，也没有给出任意异质参数下最小值的闭式公式或求解算法。上例说明同质情形的均匀地址最优结论不能无条件移用。

深度零时没有路由器，只有一个地址和一个类；单位记录给出 $G=(1)$，归一化输入的 $F=1$。若所有节点都取 $q(v)=1$，所有地址也只有一个类，$G$ 的每个元素均为 $1$，每个地址概率律都在极小纤维内。正深度的全秩条件只要求每个最深层路由器活跃，不要求所有祖先活跃；这里的“活跃”专指环境具有标签分辨能力，并不表示该路由器在每个地址分支都被编程。

本节仍只处理有限实际内部路由器、固定经典数据、完整顺序装载后的一次独立路由器记录及其余理想门。它不扩展到含噪后续门、门噪声、相关记录、重复保持阶段或现实硬件容错，也不赋予无限地址本体和观察者指针的 `MODEL` 诠释以新的物理证明。后文的诠释应继续按其自身前提阅读。
:::
