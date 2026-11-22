# 36.2.3 带符号 Fourier 记录与地址解引用 {#sec-ch38-s01-s03-signed-fourier-records}


**带符号重叠：从地址轮廓到有序复系数证书。** 前面的 Profiles 用四坐标实记录描述 $q(v)\in[0,1]$ 时的地址分辨。现在保留实际装载标签，改用三坐标复 Fourier 记录，把局部重叠参数的范围扩展到闭区间 $[-1/2,1]$。本段研究这些记录的复线性叠加、真空是否属于其像，以及一份明确递归给出的有序核列表；这需要同时保留两个端点。

沿用 [@def-ch38-profile-routers] 的 $Q=\{W,0,1\}$、首位在前的地址 $A_0=\{()\}$、$A_{n+1}=\operatorname{Bool}\times A_n$，以及内部路由器位置 $I_0=\varnothing$、$I_{n+1}=\{\mathrm{root}\}\sqcup(\operatorname{Bool}\times I_n)$。根为 `none`，子位置为 `some (b,v)`；$b=0,1$ 分别表示假、真，即左、右。这里的 $0,1$ 作为标签时指 $Q$ 中对应的编码标签。

仍令 $L_n=\operatorname{load}(n,n)$，$T$ 为系统配置的树投影，并使用

$$
\lambda_{a,\beta}(v)
=\operatorname{routerLabel}\bigl(n,T(L_n(\operatorname{loading}(n,a,\beta,0))),v\bigr)
=\operatorname{loadedLabel}(n,a,\beta,v).
$$

这是完整顺序装载后的实际路由器标签，路径外的 $W$ 标签也包括在内。实际装载与编程树的对应关系如前；虽然这些标签不依赖外部总线，本段始终保留任意 $\beta\in Q$，包括等待标签 $W$。

::: {.definition #def-ch38-signed-fourier-records title="三坐标 Fourier 记录与复系数空间" lean="D5/S3/Quantum/Routing/HannSignedCertificate.omega D5/S3/Quantum/Routing/HannSignedCertificate.labelIndex D5/S3/Quantum/Routing/HannSignedCertificate.localRecord D5/S3/Quantum/Routing/HannSignedCertificate.Environment D5/S3/Quantum/Routing/HannSignedCertificate.Coeff"}
置 $\omega=\exp(2\pi\mathrm i/3)$，$j(W)=0$、$j(0)=1$、$j(1)=2$，其中指数为整数。对 $r\in[-1/2,1]$、$s\in Q$，定义

$$
f_{r,s}=\left(
\sqrt{\frac{1+2r}{3}},\quad
\sqrt{\frac{1-r}{3}}\,\omega^{j(s)},\quad
\sqrt{\frac{1-r}{3}}\,\omega^{-j(s)}
\right)\in\mathbb C^3.
$$

三个坐标依次由 $\operatorname{Fin}(3)=\{0,1,2\}$ 索引。平方根均为非负实平方根，再嵌入 $\mathbb C$；记录的坐标一般为复数。记

$$
\mathcal F_n=I_n\to\operatorname{Fin}(3),\qquad
\mathcal C_n=A_n\to\mathbb C.
$$

它们分别对应本段的 `Environment n` 与 `Coeff n`。记录空间为 $\mathcal F_n\to\mathbb C$。$\mathcal F_n$ 与前面四坐标记录的环境指标集 $\mathcal E_n$ 分开记号。
:::

::: {.definition #def-ch38-signed-synthesis title="共同赋值的子树限制、实际记录与合成映射" lean="D5/S3/Quantum/Routing/HannSignedCertificate.restrict D5/S3/Quantum/Routing/HannSignedCertificate.childEnvironment D5/S3/Quantum/Routing/HannSignedCertificate.record D5/S3/Quantum/Routing/HannSignedCertificate.vacuumRecord D5/S3/Quantum/Routing/HannSignedCertificate.synthesis D5/S3/Quantum/Routing/HannSignedCertificate.embed"}
固定一个任意异质实赋值 $q:I_n\to\mathbb R$，并要求每个位置都满足 $-1/2\le q(v)\le1$。对任意 $a\in A_n$、$\beta\in Q$、$e\in\mathcal F_n$，定义实际记录、全等待真空记录与复线性合成映射

$$
\begin{aligned}
\widehat R_{n,q,\beta,a}(e)
&=\prod_{v\in I_n}f_{q(v),\lambda_{a,\beta}(v)}(e(v)),\\
V_{n,q}(e)&=\prod_{v\in I_n}f_{q(v),W}(e(v)),\\
(S_{n,q,\beta}x)(e)
&=\sum_{a\in A_n}x(a)\widehat R_{n,q,\beta,a}(e),
\qquad x\in\mathcal C_n.
\end{aligned}
$$

在深度 $n+1$，根参数为 $r=q(\mathrm{root})$；对 $b\in\{0,1\}$，子树参数与环境坐标为

$$
q_b(v)=q(\operatorname{some}(b,v)),\qquad
e_b(v)=e(\operatorname{some}(b,v)).
$$

它们对应 `restrict n q b` 与 `childEnvironment n e b`。每次继续进入子树都再次作这样的限制，故所有前缀上的输入都来自同一个 $q$，没有把不同节点的参数认同，也没有另选子树参数。根、左子树、右子树是下文张量坐标的顺序。

零延拓 $J_b:\mathcal C_n\to\mathcal C_{n+1}$ 定义为

$$
(J_bx)(c,a)=
\begin{cases}x(a),&c=b,\\0,&c\ne b.\end{cases}
$$

深度 $0$ 没有路由器，$A_0$ 与 $\mathcal F_0$ 各有一个元素；所有空乘积为 $1$，所以实际记录与真空记录均为单位函数，$S_{0,q,\beta}x=x(())$。
:::

::: {.definition #def-ch38-signed-recursion title="维数数据、有序核列表与优先真空代表的规定递归" lean="D5/S3/Quantum/Routing/HannSignedCertificate.Output D5/S3/Quantum/Routing/HannSignedCertificate.Output.flag D5/S3/Quantum/Routing/HannSignedCertificate.inherited D5/S3/Quantum/Routing/HannSignedCertificate.step D5/S3/Quantum/Routing/HannSignedCertificate.outputs"}
递归输出 $(d,K,U)$ 对应 `outputs n q`：$d\in\mathbb N$，$K$ 为 $\mathcal C_n$ 中向量的有序列表，$U\in\operatorname{Option}(\mathcal C_n)$。布尔标志 $t$ 严格定义为 $U.\mathrm{isSome}$：$U=\operatorname{Some}(u)$ 时 $t=\mathrm{true}$，$U=\operatorname{None}$ 时 $t=\mathrm{false}$。$U$ 是按规则选出的代表，不预先声称它是唯一原像；此处的列表 $K$ 也不同于前面同质情形的标量核函数。

叶端即深度 $0$ 的输出为

$$
d=1,\qquad K=[],\qquad
U=\operatorname{Some}(\delta_{()}),\qquad t=\mathrm{true},
\qquad \delta_{()}(())=1.
$$

在深度 $n+1$，先对 $q_0,q_1$ 递归，得到 $(d_0,K_0,U_0,t_0)$、$(d_1,K_1,U_1,t_1)$。置

$$
H=\operatorname{map}(J_0,K_0)\mathbin{+\!+}\operatorname{map}(J_1,K_1),
$$

其中 $+\!+$ 表示列表连接：先保留左子列表的原顺序，再保留右子列表的原顺序。根参数 $r=q(\mathrm{root})\in[-1/2,1]$ 决定

$$
d=\begin{cases}
d_0+d_1,&r<1,\\
d_0+d_1-\mathbf 1_{t_0\land t_1},&r=1.
\end{cases}
$$

指标 $\mathbf 1_{t_0\land t_1}$ 在两个子标志都为真时为 $1$，其余为 $0$。这里及下文 $2^n-d$ 的减法均为自然数截断减法：$a-b=\max(a-b,0)$。

有序列表的完整规则为

$$
K=\begin{cases}
H\mathbin{+\!+}[J_0u_0-J_1u_1],
&r=1,\ U_0=\operatorname{Some}(u_0),\ U_1=\operatorname{Some}(u_1),\\
H,&\text{其余情形}.
\end{cases}
$$

即只在上端点且两个子真空代表都存在时，在末尾追加这一条差向量；没有消元、重排、缩放或去重。

代表与标志的全部分支为

$$
\begin{array}{c|c|c}
\text{根参数与子条件}&U&t\\ \hline
r=-1/2,\ U_0=\operatorname{Some}(u_0),\ U_1=\operatorname{Some}(u_1)
&\operatorname{Some}(-J_0u_0-J_1u_1)&\mathrm{true}\\
r=-1/2,\ \text{至少一个子代表不存在}
&\operatorname{None}&\mathrm{false}\\
-1/2<r<1&\operatorname{None}&\mathrm{false}\\
r=1,\ U_0=\operatorname{Some}(u_0)
&\operatorname{Some}(J_0u_0)&\mathrm{true}\\
r=1,\ U_0=\operatorname{None},\ U_1=\operatorname{Some}(u_1)
&\operatorname{Some}(J_1u_1)&\mathrm{true}\\
r=1,\ U_0=U_1=\operatorname{None}
&\operatorname{None}&\mathrm{false}
\end{array}
$$

因此下端点的 $t=t_0\land t_1$，内部的 $t=\mathrm{false}$，上端点的 $t=t_0\lor t_1$。上端点两边均有代表时仍优先选左边；下端点必须保留两个负号。各子输出都有 $d_b>0$，所以上端点实际扣除 $1$ 的分支不会发生下溢。
:::

::: {.definition #def-ch38-signed-gram-orientations title="标准方向与密度方向的复 Gram 矩阵" lean="D5/S3/Quantum/Routing/HannSignedCertificate.recordMatrix D5/S3/Quantum/Routing/HannSignedCertificate.standardGram D5/S3/Quantum/Routing/HannSignedCertificate.densityGram"}
固定 $n,q,\beta$，以下省略记录和映射的这些下标。矩阵 $M$ 的行由环境坐标索引、列由地址索引：$M(e,a)=\widehat R_a(e)$，故 $Mx=Sx$。定义

$$
\begin{aligned}
G^{\mathrm{std}}&=M^{\mathrm H}M,\\
G^{\mathrm{std}}(a,b)&=\sum_{e\in\mathcal F_n}\overline{\widehat R_a(e)}\,\widehat R_b(e),\\
G^{\mathrm{den}}(a,b)&=\sum_{e\in\mathcal F_n}\widehat R_a(e)\,\overline{\widehat R_b(e)}.
\end{aligned}
$$

$M^{\mathrm H}$ 表示共轭转置。这两种方向一般互为逐项共轭；下面用实值局部重叠的乘积证明本情形中它们相等，然后才把标准 Gram 的核与秩结论用于密度方向。
:::

::: {.theorem #thm-ch38-signed-coefficient-event title="实际装载记录的完整带符号系数与 Gram 证书" lean="D5/S3/Quantum/Routing/HannSignedCertificate.signed_event"}
对每个自然数深度 $n\ge0$、每个实赋值 $q:I_n\to\mathbb R$，假设

$$
\forall v\in I_n,\qquad -\frac12\le q(v)\le1.
$$

对每个外部三态总线标签 $\beta\in Q$，取上述实际记录与规定递归的 $(d,K,U,t)$；置 $m=|K|$，$K_i=K.\mathrm{get}(i)$，$i\in\operatorname{Fin}(m)$。以下各项同时成立。

1. 合成像的复维数为 $\dim_{\mathbb C}\operatorname{range}S=d$。
2. 有序核列表的长度为 $|K|=2^n-d$，减法采用上述自然数截断约定。
3. 真空成员关系双向成立：$V_{n,q}\in\operatorname{range}S\ \Longleftrightarrow\ t=\mathrm{true}$。特别地，$t=\mathrm{false}$，亦即 $U=\operatorname{None}$，意味着真空不属于合成像。
4. 对每个 $u\in\mathcal C_n$，若 $U=\operatorname{Some}(u)$，则 $Su=V_{n,q}$。
5. 对每个复系数向量 $x\in\mathcal C_n$，

   $$
   Sx=0\quad\Longleftrightarrow\quad
   \exists!\,\alpha:\operatorname{Fin}(m)\to\mathbb C,\qquad
   x=\sum_{i\in\operatorname{Fin}(m)}\alpha(i)K_i.
   $$

   唯一性针对这份有序列表的全部复系数：任何另一组给出同一展开的系数都逐项等于 $\alpha$。
6. 对所有 $a,b\in A_n$，标准 Gram 元由实际装载标签给出：

   $$
   G^{\mathrm{std}}(a,b)=
   \left(\prod_{v\in I_n}
   \begin{cases}
   1,&\lambda_{a,\beta}(v)=\lambda_{b,\beta}(v),\\
   q(v),&\lambda_{a,\beta}(v)\ne\lambda_{b,\beta}(v)
   \end{cases}\right)\in\mathbb R\subset\mathbb C.
   $$

7. 密度方向与标准方向相等：$G^{\mathrm{den}}=G^{\mathrm{std}}$。
8. 作为作用在地址复系数空间 $\mathcal C_n$ 上的线性映射，$\ker(G^{\mathrm{den}}\cdot)=\ker S$。
9. 密度方向矩阵的复秩为 $\operatorname{rank}_{\mathbb C}G^{\mathrm{den}}=d$。
:::

::: proof
先沿实际树结构归纳，始终使用同一赋值的子树限制。局部 Fourier 恒等式来自 $\omega^3=1$ 与 $1+\omega+\omega^2=0$；特别地，

$$
f_{1,s}=f_{1,W},\qquad
f_{-1/2,W}=-f_{-1/2,0}-f_{-1/2,1}.
$$

在深度 $n+1$，以 $S_b=S_{n,q_b,\beta}$、$V_b=V_{n,q_b}$ 简写。实际装载标签把记录与真空按根、左、右分成

$$
\begin{aligned}
\widehat R_{n+1,q,\beta,(0,a)}
&=f_{r,0}\otimes\widehat R_{n,q_0,\beta,a}\otimes V_1,\\
\widehat R_{n+1,q,\beta,(1,a)}
&=f_{r,1}\otimes V_0\otimes\widehat R_{n,q_1,\beta,a},\\
V_{n+1,q}&=f_{r,W}\otimes V_0\otimes V_1.
\end{aligned}
$$

这里张量等式指相应环境坐标函数的逐点乘积。对 $x_b(a)=x(b,a)$，有 $x=J_0x_0+J_1x_1$，从而

$$
Sx=f_{r,0}\otimes(S_0x_0)\otimes V_1
+f_{r,1}\otimes V_0\otimes(S_1x_1).
$$

真空在整个区间内都非零。具体选取 $e_*(v)=1$ 当 $q(v)=-1/2$，其余取 $e_*(v)=0$；下端点的等待记录在坐标 $1$ 为 $\sqrt{1/2}>0$，其余位置的坐标 $0$ 为 $\sqrt{(1+2q(v))/3}>0$。有限乘积因此非零，深度 $0$ 则为单位空积。这个非零性允许在子树等式中选定非零真空坐标并消去其因子。

为同时处理核与真空，考虑任意 $c\in\mathbb C$ 及方程 $Sx=cV_{n+1,q}$。当 $r<1$ 时，局部方程

$$
f_{r,0}A+f_{r,1}B=f_{r,W}C
$$

的坐标 $1,2$ 强制 $A=B=-C$；若还满足 $r\ne-1/2$，非零的坐标 $0$ 又强制 $C=0$。把此式用于上述张量分解，并在非零子真空坐标上消因子，得到

$$
S_0x_0=-cV_0,\qquad S_1x_1=-cV_1,
\qquad r\ne-1/2\ \Longrightarrow\ c=0.
$$

取 $c=0$，两个子向量都在各自的核内，所以继承列表已涵盖全部核。取 $c=1$，只有下端点可能出现真空原像，而且两个子树都必须有真空原像；归纳假设把这等价为 $t_0\land t_1$。局部下端点恒等式给出反向构造 $-J_0u_0-J_1u_1$。内部 $-1/2<r<1$ 的 $c=1$ 不可能成立，故这里断言的是真空非成员，而非仅仅未选出代表。

当 $r=1$ 时，三个局部记录相同。利用两个子真空的非零性，方程 $Sx=cV_{n+1,q}$ 给出一个共同标量 $z\in\mathbb C$，满足

$$
S_0x_0=zV_0,\qquad S_1x_1=(c-z)V_1.
$$

若某子树没有真空原像，其对应的标量必须为零：否则用该非零标量的逆缩放，就会构造出真空原像。取 $c=1$，两标量之和为 $1$，故至少一棵子树有真空原像；反过来，任一子代表零延拓后都给出父真空。这说明上端点的标志为 $t_0\lor t_1$，并验证优先左边的规定代表。

取 $c=0$。若两边都有代表，则

$$
\begin{aligned}
x={}&J_0(x_0-zu_0)+J_1(x_1+zu_1)\\
&+z(J_0u_0-J_1u_1).
\end{aligned}
$$

前两项来自子核，最后一项正是规定追加的碰撞向量。若至少一边没有代表，相应标量强制 $z=0$，继承列表便已完备。$J_0,J_1$ 各自单射且支撑不相交，故继承保留复线性无关性。两代表存在时，新增差向量不在继承列表的张成中：先取左地址分量再施加 $S_0$，继承列表都给出零，差向量却给出非零的 $V_0$。因此整个规定列表既完备又复线性无关。

叶端直接给出单位代表与空核列表。上述归纳还保持每条列表向量的合成为零、所选代表合成为真空，以及 $d>0$ 和 $|K|+d=2^n$。由 $\dim_{\mathbb C}\mathcal C_n=2^n$、秩—零化度公式及列表的完备性与独立性，得到像维数、列表长度与唯一复系数展开；真空的两个方向和代表方程则已在各分支中得到。这证明前五项。

最后处理共轭方向。对整个闭区间内的 $r$ 及任意 $s,t\in Q$，局部记录满足

$$
\sum_{i\in\operatorname{Fin}(3)}\overline{f_{r,s}(i)}\,f_{r,t}(i)
=\begin{cases}1,&s=t,\\r,&s\ne t.\end{cases}
$$

将有限环境求和与节点乘积展开、交换，便把 $G^{\mathrm{std}}(a,b)$ 写成这些实局部重叠的乘积，得到第六项。因此 $G^{\mathrm{den}}(a,b)=\overline{G^{\mathrm{std}}(a,b)}=G^{\mathrm{std}}(a,b)$；这里使用的是重叠乘积为实数，而不是记录坐标为实数。再以 $G^{\mathrm{std}}=M^{\mathrm H}M$ 和 $M\cdot=S$，应用标准 Gram 的核、秩恒等式，得到最后两项。完整证明由 Lean 内核检查。
:::



深度零也完整落在定理范围内：$d=1$、$K=[]$、$t=\mathrm{true}$，$S$ 是一维恒等映射，$V=1$，两种 Gram 都是 $(1)$、秩为 $1$。第五项此时的系数域为 $\operatorname{Fin}(0)$；唯一的空系数族只展开出零向量，空和为零。对任意更深前缀，把原 $q$ 逐层限制到该子树即可应用同一陈述，无须正深度、同质参数或布尔总线的额外假设。下端点改变真空的成员条件而不追加核向量；上端点只有在两边真空都可合成时才追加一条核向量并扣除一维。

与 Profiles 的衔接只经过重叠：在共同范围 $q(v)\in[0,1]$，前面的四坐标实记录 $\sqrt{q(v)}e_*+\sqrt{1-q(v)}e_s$ 同样有“同标签为 $1$、异标签为 $q(v)$”的局部重叠，故其实际装载记录的 Gram 元与这里相应的实乘积一致。两套记录使用不同环境、不同坐标，不能据此把它们逐坐标认同，也不能把前面的物理输出结论直接延伸到带符号区间。

本定理的核始终是地址复系数合成映射的核。这里没有给出带符号区间的含噪输出或装载后续演化定理、Schur 算子空间的核、Choi 秩、递归的计算效率或硬件性能结论，也没有为后面的本体与观察者诠释增加证明。以下进入 `MODEL` 时，仍须保留这些范围界线。


::: {.theorem #thm-ch38-hann-uniform-original-section title="实际带符号 Hann 记录的原始叶均匀截面与零和证书" lean="D5/S3/Quantum/Routing/HannUniformSection.binary_conformal_kernel D5/S3/Quantum/Routing/HannUniformSection.zero_certificate D5/S3/Quantum/Routing/HannUniformSection.uniform_section"}
固定有限深度 $n$、异质路由参数 $q : \operatorname{Router}(n) \to \mathbb{R}$ 与三能级总线 `bus`，并假设每个路由节点都满足

$$
-\frac12 \le q(v) \le 1.
$$

这里的 `Section n q bus` 精确定义为所有实数 $z$ 的集合：存在一个只定义在原始叶地址 $a\in\operatorname{Address}(n)$ 上的概率分布 $p$，满足 $p(a)\ge0$、$\sum_a p(a)=1$，并且实际 signed Hann 记录的合成为真空记录的实数倍：

$$
\sum_{a\in\operatorname{Address}(n)} (p(a):\mathbb C)\,\operatorname{record}(n,q,\mathrm{bus},a)
= (z:\mathbb C)\,\operatorname{vacuumRecord}(n,q).
$$

则以下结论同时成立。

1. 任意非负且不为零的原始叶坐标核向量，都含有一个叶坐标取 $0/1$、节点坐标取 $0,\pm1$ 的同核证书；非零的叶坐标只出现在原向量的正支撑中，节点坐标保留原节点及根的符号。
2. 若某个上述概率分布 $p$ 使 $z=0$，则存在一个非空的原始叶子子集 $S$，其中每个叶子的概率严格为正，且
   $$
   \sum_{a\in S}\operatorname{record}(n,q,\mathrm{bus},a)=0.
   $$
   这里的零可以是截面的内部点，不要求它是端点。
3. `Section n q bus` 要么为空，要么是一个闭区间 $[l,r]$；两个端点都由原始叶子上的均匀分布达到。也就是说，存在非空有限子集 $S$ 及 $e\in\{-1,0,1\}$，使
   $$
   \sum_{a\in S}\operatorname{record}(n,q,\mathrm{bus},a)=(e:\mathbb C)\,\operatorname{vacuumRecord}(n,q),
   \qquad z=\frac{e}{|S|},
   $$
   且 $1\le |S|\le 2^n$；左右端点可以由不同的子集达到。

这是有限深度的 signed Hann 实数概率模型中的定理。它不把 signed record 解释成物理量子信道，不给出硬件实现、算法复杂度或计算时间结论，也不把任意可行概率分布断言为均匀分布。完整证明由 `trureturing` 的 Lean 内核检查。
:::
对照 [@rem-ch38-qram-page-wootters-literature]，指针与本体存储分离架构立即推演出两条贯通全书的核心**`MODEL`（模型诠释）**结论：

1. **为什么全局阵列是无时间 $P = NP$，而局部指针必须顺着 `ptr++` 逐帧流逝时间？**
   在全局本体存储端，整座 $\bigl\{\lvert\Phi(x)\rangle_{\mathrm{mem}}\bigr\}_{x \in \mathbb{Z}^6}$ 阵列早已跨越所有格点同时铺展就绪，不存在先后次序，呈现顺序无关的 $P = NP$ 式静态全息（这里借用 $P = NP$ 之名，见 §36.5；[第 25 章](ch29-timeless-causality-and-gram-space.md) [@thm-ch29-gram-rigidity-and-pell] 与[第 26 章](ch30-fields-lines-eth-and-navier-stokes.md)）。然而，场内任何一枚物理观察者指针寄存器都受限于有限位宽与有限记忆窗口 $M < \infty$，并面对标准计算模型下未决的有限观察者复杂性防火墙（[@conj-p-neq-np]）。有限位宽的地址总线绝无可能在单周期内把整座宇宙阵列一口吞入缓存，而只能沿着因果历史彼此相容而不退化锁死的地址序列（局部格拉姆椭圆体正定体积背景见[§25.1.4](ch29-s03-timeless-gram-causality.md#sec-coda-finite-observer-time-field) [@thm-ch29-gram-rigidity-and-pell]），一步一拍地执行指针自增 `ptr++`。**我们毕生感叹的“时间流逝”，在硬件底层不过是有限指针 `ptr++` 扫过静态全息晶格时的扫描帧率。**

::: {.viz src="pointer-ontology-deref" preset="linear64" height="500"}
**读最后一格，要把 64 格走一遍。** 琥珀色的读头沿总线一拍读一格，读过的格变亮；读到地址 63 用了 64 步，而上方的路由树在第 6 步就已走到叶子。
:::

2. **为什么“凭已知数据去观察”必然显影为局部退相干？**
   在指针寻址模型（`MODEL`）中，观察者过往已锁定的历史记录相当于地址寄存器高位的**已知位掩码（bitmask）**。执行一次解引用 `*ptr` 时，指针寄存器与目标存储单元发生受控地址拷贝耦合。在进入一般形式化定理前，不妨先亲手展开最透明的 $4 \times 4$ 分块矩阵账本：设待解引用的两个单比特存储态为 $\rho = \begin{pmatrix} p & c \\ \bar{c} & 1-p \end{pmatrix}$ 与 $\sigma = \begin{pmatrix} p & c' \\ \bar{c}' & 1-p \end{pmatrix}$（主对角线布居数同为 $p, 1-p$，但副对角相干项 $c \neq c'$），初始空白地址记录基态记为 $E_{00} = \lvert 0\rangle\langle 0\rvert$（其中 $E_{ab} := \lvert a\rangle\langle b\rvert$，$a, b \in \{0, 1\}$）。施加受控地址翻转置换算子 $U_{\mathrm{copy}} = E_{00} \otimes I_2 + E_{11} \otimes \sigma_x$ 后，空白嵌入态与拷贝后的四维联合记录态显式写为：

   $$
   B(\rho) \;=\; \begin{pmatrix} p E_{00} & c E_{00} \\ \bar{c} E_{00} & (1-p) E_{00} \end{pmatrix}, \qquad
   R_{\mathrm{addr}}(\rho) \;=\; U_{\mathrm{copy}} B(\rho) U_{\mathrm{copy}}^\dagger \;=\; \begin{pmatrix} p E_{00} & c E_{01} \\ \bar{c} E_{10} & (1-p) E_{11} \end{pmatrix}.
   $$

   请看右端分块矩阵的精妙变化：副对角相干振幅 $c$ 一丝一毫也没有消失，它只是从对角记录块 $E_{00}$ 被搬移到了正交错位记录块 $E_{01}$ 之上！因此全局四维联合态依然严格区分 $R_{\mathrm{addr}}(\rho) \neq R_{\mathrm{addr}}(\sigma)$；然而，一旦局部读出端忽略落入 $90^\circ$ 正交盲区的地址记录寄存器（对第二因子求偏迹 $\operatorname{Tr}_{\mathrm{env}}(E_{ab}) = \delta_{ab}$），错位块 $\operatorname{Tr}_{\mathrm{env}}(E_{01}) = \operatorname{Tr}_{\mathrm{env}}(E_{10}) = 0$ 瞬间归零，两个态的单比特局部读出便双双退化为同一个对角矩阵 $\operatorname{diag}(p, 1-p)$！

::: {.figure src="ch38-copy-record"}
**解引用的拷贝把相干项搬进地址记录，而不是销毁它。** 行与列按（系统位, 记录位）排成 $4 \times 4$，粗线分出四个 $2 \times 2$ 块。左边的空白嵌入 $B(\rho)$ 里，四个数都在各块左上角 $E_{00}$ 的位置；经 $U_{\mathrm{copy}}$ 得到的 $R_{\mathrm{addr}}(\rho)$ 里，青色的 $p$、$1-p$ 留在对角块，品红的 $c$、$\bar{c}$ 搬到了 $E_{01}$、$E_{10}$ 的位置，仍然在场；对记录求偏迹只加各块的对角格，这两格不在其中，局部读出只剩 $\operatorname{diag}(p, 1-p)$。见 [@thm-ch38-copied-address-dereference-and-access-defect]。
:::

`trureturing` 的退相干与典范记录恢复模块将这一“解引用拷贝、局部相干掩码归零与全局伴随无损还原”的精确机制锁定为如下内核定理：

::: {.theorem #thm-ch38-copied-address-dereference-and-access-defect title="受控地址解引用拷贝的局部边缘重合与记录访问缺陷定理" lean="D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect D5/S3/Quantum/Decoherence/CanonicalRecordAccessRecovery.reduced_irreversibility_is_canonical_record_access_defect"}
设 $\rho, \sigma \in \mathrm{QubitMatrix}$（即 $M_{\operatorname{Fin} 2}(\mathbb{C})$）为任意两个单量子比特矩阵，满足主对角线布居处处相等（$\forall i \in \operatorname{Fin} 2,\; \rho_{ii} = \sigma_{ii}$），但存在不同的副对角相干元（$\exists i, j \in \operatorname{Fin} 2,\; i \neq j \land \rho_{ij} \neq \sigma_{ij}$）。记四维联合矩阵空间为 $\mathrm{JointQubitEnvironmentMatrix} = M_{\operatorname{Fin} 2 \times \operatorname{Fin} 2}(\mathbb{C})$，受控地址拷贝置换矩阵为 $\mathrm{copyUnitary}$，空白记录联合嵌入为 $B(\tau) := \operatorname{blankEnvironmentJointState}(\tau)$，典范受控拷贝地址联合态为 $R_{\mathrm{addr}}(\tau) := \operatorname{controlledRecordJointState}(\mathrm{copiedAddressRecord}, \tau)$（由 [`canonical_copied_address_record_eq_prior`](lean:D5/S3/Quantum/Decoherence/CanonicalRecordAccessRecovery.canonical_copied_address_record_eq_prior) 与先验受控记录态恒等），偏迹算子为 $\operatorname{traceEnvironment}$。则 $\mathrm{copyUnitary} \in \operatorname{Matrix.unitaryGroup}(\operatorname{Fin} 2 \times \operatorname{Fin} 2, \mathbb{C})$，且以下三项同时成立：

1. **前向幺正地址打标与全局可区分性**：受控拷贝幺正演化将空白记录输入精确映射为典范地址标记联合态，且两份全局记录严格相异：

   $$
   \operatorname{unitaryEvolution}(\mathrm{copyUnitary}, B(\rho)) = R_{\mathrm{addr}}(\rho), \quad \operatorname{unitaryEvolution}(\mathrm{copyUnitary}, B(\sigma)) = R_{\mathrm{addr}}(\sigma), \quad R_{\mathrm{addr}}(\rho) \neq R_{\mathrm{addr}}(\sigma);
   $$

2. **遮蔽地址记录后的局部边缘重合与局部解码不可能性**：对地址记录求偏迹后两态局部读出完全一致，故不存在任何仅以局部约化态为输入的恢复解码器 $\mathrm{recover} : \mathrm{QubitMatrix} \to \mathrm{JointQubitEnvironmentMatrix}$ 能同时还原两份联合记录：

   $$
   \operatorname{traceEnvironment}\bigl(R_{\mathrm{addr}}(\rho)\bigr) = \operatorname{traceEnvironment}\bigl(R_{\mathrm{addr}}(\sigma)\bigr),
   $$

   $$
   \begin{aligned}
   &\neg\,\exists\,\mathrm{recover} : \mathrm{QubitMatrix} \to \mathrm{JointQubitEnvironmentMatrix}, \\
    &\quad \mathrm{recover}\bigl(\operatorname{traceEnvironment}(R_{\mathrm{addr}}(\rho))\bigr) = R_{\mathrm{addr}}(\rho) \\
    &\;\land\; \mathrm{recover}\bigl(\operatorname{traceEnvironment}(R_{\mathrm{addr}}(\sigma))\bigr) = R_{\mathrm{addr}}(\sigma);
   \end{aligned}
   $$

3. **保留相干地址访问时的全局伴随无损逆演**：在保留对地址记录寄存器的全局相干访问权限时，伴随耦合算子 $\operatorname{star}(\mathrm{copyUnitary})$ 将两份地址标记联合态精确无损地还原回初始空白记录输入：

   $$
   \operatorname{unitaryEvolution}\bigl(\operatorname{star}(\mathrm{copyUnitary}), R_{\mathrm{addr}}(\rho)\bigr) = B(\rho), \qquad \operatorname{unitaryEvolution}\bigl(\operatorname{star}(\mathrm{copyUnitary}), R_{\mathrm{addr}}(\sigma)\bigr) = B(\sigma).
   $$
:::

::: proof
首先验证受控翻转置换矩阵满足 $\mathrm{copyUnitary} \in \operatorname{Matrix.unitaryGroup}(\operatorname{Fin} 2 \times \operatorname{Fin} 2, \mathbb{C})$，并展开分块矩阵乘法证得前向演化恒等式 $\operatorname{unitaryEvolution}(\mathrm{copyUnitary}, B(\tau)) = R_{\mathrm{addr}}(\tau)$（其中 [`canonical_copied_address_record_eq_prior`](lean:D5/S3/Quantum/Decoherence/CanonicalRecordAccessRecovery.canonical_copied_address_record_eq_prior) 确认由拷贝地址映射 `copiedAddressRecord` 构造的典范受控记录与显式分块记录逐项相等）。由假设 $\exists i \neq j,\; \rho_{ij} \neq \sigma_{ij}$，两份四维联合态在对应副对角地址块上严格不等，故 $R_{\mathrm{addr}}(\rho) \neq R_{\mathrm{addr}}(\sigma)$。对第二因子求偏迹 $\operatorname{traceEnvironment}$ 时，地址正交分支令副对角块因指标错位而消去，仅存主对角元 $\rho_{ii} = \sigma_{ii}$，从而 $\operatorname{traceEnvironment}(R_{\mathrm{addr}}(\rho)) = \operatorname{traceEnvironment}(R_{\mathrm{addr}}(\sigma))$；若存在单值函数 $\mathrm{recover}$ 同时还原两者，则由输入相等必得输出相等 $R_{\mathrm{addr}}(\rho) = R_{\mathrm{addr}}(\sigma)$，与全局不等矛盾。最后利用幺正矩阵群性质 $\mathrm{copyUnitary}^* \mathrm{copyUnitary} = 1$ 代入结合律，即得伴随算子对 $B(\rho)$ 与 $B(\sigma)$ 的精确无损还原。完整证明由 Lean 内核检查。
:::

[@thm-ch38-copied-address-dereference-and-access-defect] 在 `MODEL` 中一举剥除了“波包神秘坍缩”的形而上学迷雾（它是退相干的一个两比特最小实例，并不解决“为何出现单一结果”的测量问题）：**解引用 `*ptr` 从未在宇宙本体内存里销毁过半点相干信息；所谓“不可逆坍缩”，纯粹是因为局部指针只读取了当前匹配掩码的单一路径，而把其余正交地址分支留在了自身寄存器位宽之外的访问盲区里！**

---
