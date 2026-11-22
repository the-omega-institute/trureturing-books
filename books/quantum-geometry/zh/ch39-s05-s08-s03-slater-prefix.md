# 35.6.8.3 物理 Tribonacci 模型与 Slater 前缀 {#sec-ch39-s05-s08-s03-slater-prefix}

::: {.remark #rem-ch39-p2e-physical-tribonacci-interface title="物理 Tribonacci 文献模型与有限 Slater 前缀应用"}
**文献模型与边界约定。** 一个可供研究的具体物理对象是零在位势的最近邻跃迁链。依 Kolehmainen–Lado–Moustaj，*One-dimensional quasicrystals with tensor-network finite-state automata*（[arXiv:2609.06040v1](https://arxiv.org/pdf/2609.06040v1)，§III 式 (2)–(3)、附录 B.2），取替代规则 $\sigma(A)=AB$、$\sigma(B)=AC$、$\sigma(C)=A$，以及从 $A$ 出发的不动无限词 $W=\lim_{j\to\infty}\sigma^j(A)$，字母从 $W_0$ 编号。固定 $0<\rho<1$，以 $t_C=1$ 为能量单位，令 $t_A=\rho^2$、$t_B=\rho$，即 $t_A/t_B=t_B/t_C=\rho$。对每个整数 $N\ge2$，在单粒子格点空间 $\mathbb{C}^N$ 的基 $\{\lvert i\rangle:0\le i<N\}$ 上定义

$$
h_N=\sum_{i=0}^{N-2}t_{W_i}\bigl(\lvert i\rangle\langle i+1\rvert+\lvert i+1\rangle\langle i\rvert\bigr).
$$

这里使用 $W$ 的前 $N-1$ 个字母标记键，端点 $0$ 与 $N-1$ 不相连。该文张量中的数位编码的是这个单粒子格点指标；沿二进制或 Tribonacci 地址数位切分张量指标，并未指定实空间多体二分。这一区别也限制了与 §35.6.7 的直接编码纠缠秩之间的类比：不能据此把合法字的等权叠加认作该跃迁链的 Slater 基态。

**指定偶数开前缀的谱距离。** 令

$$
\begin{aligned}
L_j&=\lvert\sigma^j(A)\rvert,\qquad N_j=2\lfloor L_j/2\rfloor,\\
h_{\rho,j}&=h_{N_j}\quad(j\ge1).
\end{aligned}
$$

在这些确定的偶数格点开前缀上，定义

$$
\delta_{\rho,j}:=\min\{\lvert\lambda\rvert:\lambda\in\operatorname{Spec}(h_{\rho,j})\}.
$$

[@thm-ch39-p2e-tribonacci-open-chain-zero-gap] 的单独陈述给出每个固定 $\rho\in(0,1)$ 的全序列极限。更强的 [@ex-ch39-p2e-tribonacci-prefix-rate] 保留定量纸面推导：对所有 $j\ge4$、$0<\rho<1$，有 $\delta_{\rho,j}\le73728/N_j$，并由此得到关于 $\rho$ 的一致收敛。整条定量应用仍以纸面证明呈现，不带独立 Lean 验证徽章，也不声称解决外部新猜想。有限矩阵的可逆性、无限体积谱中零点的归属、有限分辨率态密度或 Anderson 局域化意义下的临界性，都不能直接替代这一指定边界与前缀序列的极限证明。Krebbekx–Moustaj–Dajani–Morais Smith 的 *Multifractal Properties of Tribonacci Chains*（[*Phys. Rev. B* **108**, 104204](https://doi.org/10.1103/PhysRevB.108.104204)，§II.B.1、§III.A.1、§V）采用周期逼近与微扰重整化研究物理谱及临界性；本书不将其解释为上述对所有 $\rho\in(0,1)$ 的有限开链结论。

**有序 Slater 振幅与字面前缀部分迹。** 下面的有限维应用独立于跃迁参数，允许任意自然数 $N$、$0\le k\le N$ 和复矩阵 $V\in\mathbb{C}^{N\times k}$，只要求 $V^\dagger V=I_k$。让原始格点保持自然顺序 $0,\ldots,N-1$，以布尔占据串的占据子集 $S$ 标记正交归一基 $\lvert S\rangle$。对大小为 $k$ 的 $S$，令 $V_S$ 按递增格点顺序保留这些行，列顺序保持不变，定义同一个实际多体向量

$$
\langle S\mid\Psi_V\rangle=
\begin{cases}
\det(V_S),&\lvert S\rvert=k,\\
0,&\lvert S\rvert\ne k.
\end{cases}
$$

空行列式取 $1$，所以 $k=0$ 给出真空。占据基已经归一化，振幅不再乘以 $1/\sqrt{k!}$。对 $V^\dagger,V$ 在自然格点次序下应用[矩形柯西–比内恒等式](lean:D5/S3/Quantum/Schatten/CompoundMatrices.cauchyBinet)，得到

$$
\sum_{|S|=k}\overline{\det(V_S)}\det(V_S)
=\det(V^\dagger V)=1.
$$

因而归一化来自列正交性。Dereziński 的 [*Clifford algebras and fermions*](https://www.fuw.edu.pl/~derezins/clifford.pdf)，§7.1–§7.2 式 (7.51)–(7.54)，给出 CAR、有序占据基与归一化 Slater 行列式的文献背景。把这个向量用于上述跃迁链的基态时，仍须指定所占模式、填充及多体哈密顿量，并核对能量最小性。

指定 $0\le\ell\le N$ 和连续前缀 $I=\{0,\ldots,\ell-1\}$。令 $a,a'\in\{0,1\}^{\ell}$、$b\in\{0,1\}^{N-\ell}$；$ab$ 表示按原始格点顺序先接前缀、再接尾部。定义

$$
\begin{aligned}
\psi_V(a,b)&:=\langle ab\mid\Psi_V\rangle,\\
M_V((a,b),(a',b'))&:=\psi_V(a,b)\overline{\psi_V(a',b')},\\
R_V(a,a')&:=\sum_{b\in\{0,1\}^{N-\ell}}
\psi_V(a,b)\overline{\psi_V(a',b)}.
\end{aligned}
$$

这是有序格点张量积上的普通部分迹 $R_V=\operatorname{Tr}_{\mathrm{tail}}M_V$，保留全部 $2^\ell$ 个前缀占据串。秩一矩阵 $M_V$ 半正定，[部分迹保半正定性](lean:D5/S3/Quantum/Information/PartialTraceMutualInformation.partialTraceRight_posSemidef)给出 $R_V\ge0$；将其对角和按拼接双射重排，前面的归一化给出 $\Tr R_V=1$。以下 $\rho_I$ 就是以这个 $R_V$ 为矩阵的密度态。

**原基中的酉对应与完整谱。** 写 $X=V_I$ 为前 $\ell$ 行、$Y$ 为其余 $N-\ell$ 行，令 $A=XX^\dagger$。全空间投影 $P=VV^\dagger$ 与 $I_N-P$ 均半正定；压缩后得到 $0\le A\le I_\ell$。取 $A$ 的正交归一特征向量矩阵 $Q$，并保留全部 $\ell$ 个特征值 $\nu_i$，于是

$$
\begin{aligned}
Q^\dagger Q&=QQ^\dagger=I_\ell,\\
Q^\dagger A Q&=\operatorname{diag}(\nu_1,\ldots,\nu_\ell),
\qquad 0\le\nu_i\le1,\\
\widetilde V&=(Q^\dagger\oplus I_{N-\ell})V.
\end{aligned}
$$

这里 $\widetilde V$ 的前缀行是 $\widetilde X=Q^\dagger X$，尾部仍为 $Y$，且 $\widetilde V^\dagger\widetilde V=I_k$。定义作用在全部 $m$ 格点占据串上的矩阵 $\Gamma_m(B)$：当两串占据子集等大时，其条目是 $B$ 在这两个子集上按自然递增行、列取出的子式；大小不等时条目为零。真空扇区的条目是空行列式 $1$。逐粒子数扇区应用柯西–比内恒等式，得到

$$
\begin{aligned}
\Gamma_m(BC)&=\Gamma_m(B)\Gamma_m(C),\\
\Gamma_m(B^\dagger)&=\Gamma_m(B)^\dagger,\qquad
\Gamma_m(I_m)=I_{2^m}.
\end{aligned}
$$

所以单粒子酉矩阵提升为整个布尔占据空间上的酉矩阵。这里始终使用自然次序；若改用固定经典次序的复合矩阵，须在左右占据子集各乘上对应重排的符号，不能直接忽略次序差异。

前缀格点全部先于尾部格点，因此分块子式没有额外交换符号，且

$$
\Gamma_N(B\oplus I_{N-\ell})(ab,a'b')
=\Gamma_\ell(B)(a,a')\,\delta_{bb'}.
$$

对同一个行列式向量应用这个恒等式，再用[局部共轭与部分迹恒等式](lean:D5/S3/Quantum/Dynamics/KickedIsingNegativityRefutation.trace_local_right)（尾部矩阵取恒等），得到实际边缘矩阵之间的关系

$$
\begin{aligned}
G&=\Gamma_\ell(Q^\dagger),\qquad G^\dagger G=GG^\dagger=I_{2^\ell},\\
R_{\widetilde V}&=G R_V G^\dagger.
\end{aligned}
$$

这个变换律由振幅与部分迹推出，没有假定关联矩阵变换律或高斯性。

还须计算 $R_{\widetilde V}$ 本身。对等大的前缀占据子集 $S,T$，记 $r=|S|=|T|$，并让 $\widetilde X_S,\widetilde X_T$ 保留各自递增的行。对叠在 $Y$ 上方的这些行赋多项式权重 $t$，对尾部行赋权重 $1$。柯西–比内展开中 $t^r$ 的系数恰好选出包含全部指定前缀行的子式，故

$$
R_{\widetilde V}(S,T)
=[t^r]\det\bigl(Y^\dagger Y+t\widetilde X_T^\dagger\widetilde X_S\bigr).
$$

这里 $[t^r]$ 表示取系数。令 $E_{T,S}$ 把 $S$ 的第 $q$ 个递增坐标送到 $T$ 的第 $q$ 个递增坐标，其余条目为零。利用 $Y^\dagger Y=I_k-\widetilde X^\dagger\widetilde X$，以及 $\det(I+BC)=\det(I+CB)$，上式中的行列式等于

$$
\det\bigl(I_\ell-D+tE_{T,S}D\bigr),
\qquad D=\operatorname{diag}(\nu_1,\ldots,\nu_\ell).
$$

按 $T$ 及其补集分块，$t^r$ 的系数是 $E_{T,S}D$ 在 $T$ 上的主子式，乘以 $\prod_{i\notin T}(1-\nu_i)$。当 $S=T$ 时该主子式为 $\prod_{i\in S}\nu_i$；当 $S\ne T$ 时，$T\setminus S$ 中的坐标给出零列，故系数为零。若 $|S|\ne|T|$，同一尾部占据子集不可能让两个总粒子数同时为 $k$，原部分迹中的每项已经为零。这就逐条计算出

$$
\begin{aligned}
b_i(0)&=1-\nu_i,\qquad b_i(1)=\nu_i,\\
\lambda_a&=\prod_{i=1}^{\ell}b_i(a_i),\qquad a\in\{0,1\}^{\ell},\\
R_{\widetilde V}&=\operatorname{diag}(\lambda_a),\\
U&=G^\dagger,\qquad
R_V=U\operatorname{diag}(\lambda_a)U^\dagger.
\end{aligned}
$$

最后一行把结论送回原格点基中的同一个 $R_V$。[厄米矩阵酉相似的谱重排定理](lean:D5/S3/Quantum/Schatten/MatrixSimilarity.IsHermitian.eigenvalues_eq_of_unitary_similarity_diagonal)因此将它的全部特征值按一个布尔占据串的置换与 $\lambda_a$ 逐项对应。谱多重集恰有 $2^\ell$ 项，相同数值、零特征值与不可能占据扇区均按重数保留。完全空或完全满的模式仍贡献一对权重 $1,0$；显式选择两个因子避免了 $0^0$。$\ell=0$ 时空乘积为 $1$，密度谱只有这一项。

占据模式上的 $k\times k$ Gram 矩阵 $X^\dagger X$ 与 $A$ 只有非零谱相同，维数可以不同。完整空间谱必须保留全部 $\ell$ 个空间模式：保留非零压缩谱的重数，再用零补足到 $\ell$ 项，不能把粒子模式数 $k$ 当作空间模式数。上述推导也包括 $N=0$、真空 $k=0$、满填充 $k=N$ 与全前缀 $\ell=N$；全前缀仍是纯态，其密度谱只有一个 $1$，其余为零。

**实际密度态的熵与文献对应。** 对这个由部分迹构造的 $\rho_I$，[谱熵恒等式](lean:D5/S3/Quantum/Information/PartialTraceMutualInformation.entropy_eq_spectral)给出其冯诺依曼熵。将 $x\log x$ 在零点连续延拓为零，则

$$
\begin{aligned}
S(\rho_I)&=-\Tr(\rho_I\log\rho_I)
=-\sum_{a\in\{0,1\}^{\ell}}\lambda_a\log\lambda_a\\
&=\sum_{i=1}^{\ell}h(\nu_i),\\
h(x)&=-x\log x-(1-x)\log(1-x).
\end{aligned}
$$

这一步使用的密度矩阵就是原基中的 $R_V$，并非另找的谱实现。乘积权重满足 $\sum_a\lambda_a=\prod_i((1-\nu_i)+\nu_i)=1$；按一个布尔坐标拆分求和，再用 $-(xy)\log(xy)=y(-x\log x)+x(-y\log y)$，逐坐标得到最后的二元熵和。此恒等式连同零点约定保留奇异密度态，故 $h(0)=h(1)=0$；对数取自然底，换成比特须除以 $\log2$。这里是原始有限矩阵结果的应用推导，不另立完整 Slater 定理或独立验证徽章。

Peschel，[*Calculation of reduced density matrices from correlation functions*](https://arxiv.org/pdf/cond-mat/0212631v1)，式 (8)–(11)，给出约化自由费米密度矩阵的模式描述。Klich，[*Lower entropy bounds and particle number fluctuations in a Fermi sea*](https://arxiv.org/pdf/quant-ph/0406068v2)，式 (4)、(7) 及其后的 $\operatorname{diag}(1-d_i,d_i)$ 因子与式 (11)，给出对应的投影模式分解、乘积谱与熵公式；这里 $d_i=\nu_i$，而 $\ell$ 是空间区域的格点数。Klich 的式 (7) 使用适当的费米张量积；上面的前缀推导另外明确了自然格点次序与字面张量部分迹之间的对应。

**同一 Slater 态的二点函数。** 仍取上述实际向量，记 $\psi_V(x)=\langle x\mid\Psi_V\rangle$、$\rho_V=\lvert\Psi_V\rangle\langle\Psi_V\rvert$，并使用原格点顺序下的 [`JordanWigner.fullC`](https://github.com/the-omega-institute/trureturing/blob/1691f49c1d5198ff7cf7354f5f318d08184c6436/D5/S3/Quantum/SpinChains/SupersymmetricFermion/JordanWigner.lean#L57) 作为 $c_i$。其[占据基矩阵元](lean:D5/S3/Quantum/SpinChains/SupersymmetricFermion/HardCoreCompression.fullC_entry) 在且仅在输入占据 $i$、输出将该位清空时非零，系数为 $(-1)^{n_S(i)}$，其中 $n_S(i)=|\{a\in S:a<i\}|$。由这些原始算符与行列式振幅可直接得到

$$
\begin{aligned}
K_{ij}&=\Tr\bigl((\rho_V c_j^\dagger)c_i\bigr)=P_{ij},\\
C_{ij}&=\Tr\bigl((\rho_V c_i^\dagger)c_j\bigr)
=P_{ji}=\overline{P_{ij}},\\
C&=P^{\mathsf T}.
\end{aligned}
$$

为看清交换符号，令 $E_{j,i}$ 只有第 $j$ 行、第 $i$ 列为 $1$，其余为零；在复系数多项式环中置

$$
\begin{aligned}
W(X)&=(I_N+XE_{j,i})V,\\
W(X)_{j,b}&=V_{j,b}+XV_{i,b}.
\end{aligned}
$$

其他行不变，$\psi_{W(X)}(x)$ 仍按同一递增行次序取子式，无须假定 $W(X)$ 的列正交。逐个占据词有

$$
[X]\psi_{W(X)}(x)
=\bigl(c_j^\dagger c_i\Psi_V\bigr)(x).
$$

这里 $[X]$ 取一次项系数。错误粒子数的词在两边均为零，因为该算符保持粒子数。以下设 $|S(x)|=k$。若 $j\notin S(x)$，所取子式不含变动行，产生算符在该输出处也为零。若 $j\in S(x)$，置 $R=S(x)\setminus\{j\}$；当 $i\in R$ 时，替换行产生重复行，行列式与湮灭作用都为零。其余情形把替换行移回递增位置，双方都给出

$$
(-1)^{n_R(j)+n_R(i)}\det V_{R\cup\{i\}}.
$$

两次计数分别记录移出 $j$ 与插入 $i$ 的行交换次数，因此也覆盖 $i=j$。这一符号对应可由[所钉源码根](trureturing:)中的 `D5/S3/Quantum/Fermionic/PeriodicSshExcessPseudoEntropyRefutation.lean` 的私有 `fullC_sparse`、`fullC_create_sparse`，以及 `D5/S3/Quantum/FermionicCorrelationalBound/PhysicalContractionRdmBridge.lean` 的私有 `sorted_position_count`、`sorted_removeNth` 读出：前两者给出上述稀疏作用，后两者把递增排列中的位置识别为较小元素个数，并保持删去一行后的递增顺序。后两者原以自然数下标陈述；将有限格点映到其自然数值，保持次序，即得到这里的行排列符号。这些是原始源码中的辅助声明，不另设公开声明链接。

现在对 $V^\dagger,W(X)$ 使用同一[柯西–比内恒等式](lean:D5/S3/Quantum/Schatten/CompoundMatrices.cauchyBinet)，这次系数环为 $\mathbb C[X]$，得到

$$
\begin{aligned}
F(X)&:=\det\bigl(V^\dagger W(X)\bigr)\\
&=\sum_{x\in\{0,1\}^N}
\overline{\psi_V(x)}\,\psi_{W(X)}(x)\\
&=\det\bigl(I_k+XV^\dagger E_{j,i}V\bigr).
\end{aligned}
$$

最后一行只用了 $V^\dagger V=I_k$。行列式展开中一次项来自恰好选取一个对角位置，故 $[X]\det(I+XB)=\Tr B$。在求和一侧提取系数，再将秩一密度矩阵的迹展开，给出

$$
\begin{aligned}
[X]F(X)
&=\sum_x\overline{\psi_V(x)}
\bigl(c_j^\dagger c_i\Psi_V\bigr)(x)\\
&=\Tr\bigl((\rho_V c_j^\dagger)c_i\bigr),\\
[X]F(X)
&=\Tr\bigl(V^\dagger E_{j,i}V\bigr)\\
&=\Tr\bigl(E_{j,i}VV^\dagger\bigr)=P_{ij}.
\end{aligned}
$$

这证明了同一实际态的 $K_{ij}=P_{ij}$；交换 $i,j$ 并用 $P^\dagger=P$ 得到 $C$ 的公式。没有预设关联矩阵、高斯性或归一化，也没有用另一密度矩阵替换 $\rho_V$。复相位不能丢掉：例如 $N=2,k=1$、$V=(3/5,4\mathrm{i}/5)^{\mathsf T}$ 时，$K_{01}=-12\mathrm{i}/25$ 而 $C_{01}=12\mathrm{i}/25$。上述有限求和同样覆盖真空（$K=0$）、满填充（$K=I_N$）、相同格点与两种不同格点次序；$N=0$ 时没有可选的 $i,j$。这是原始结果的标准应用，不另立完整端点定理或独立验证徽章。

Dereziński 的 [§7.1–§7.2、式 (7.51)–(7.54)](https://www.fuw.edu.pl/~derezins/clifford.pdf) 给出占据基与 Slater 约定；其定理 8.1，特别是式 (8.103) 的 $\omega_\pi(d\Gamma(h))=\Tr(\pi h)$，给出对应的一体期望公式。Peschel 的式 (7)、(9)–(10) 使用 $C$；其式 (12) 中的转置对复模式不能略去。Peschel 还指出，对非 Slater 态，按同一二点函数重建的自由费米密度矩阵一般不能复现其他期望值，故关联矩阵相合不能确定一般密度矩阵。更一般的粒子数规范不变高斯密度矩阵也有上述谱配方，但须另给高斯性假设；这与从指定行列式振幅出发的推导范围不同。含 $0$ 或 $1$ 时，不能直接套用 Peschel 式 (12) 的矩阵对数。任意非前缀格点子集还涉及 Jordan–Wigner 字符串与费米子系统选择，须另行建立对应；地址数位切口也仍不能充当物理空间切口。

Moustaj–Krebbekx–Morais Smith 的 *Anomalous Polarization in One-dimensional Aperiodic Insulators*（[10.3390/condmat10010003](https://doi.org/10.3390/condmat10010003)，§IV–V、§V.C 与附录 B）讨论含在位项的泵浦族及指定填充，其关联矩阵方法依赖所选 Slater／高斯态与子系统，不能直接移用于任意编码态。$\delta_{\rho,j}$ 只是单粒子能量到零的距离；多体激发隙还需填充、粒子数扇区与间隙约定。该单粒子极限与上面的平面贝尔对构造分别适用于不同的切口。指定填充下，实际链的空间切口与内部窗几何之间的关系仍须另行建立。该链 Slater 态的空间纠缠是 [@prob-ch39-p2e-fractal-horizon] 中的开放问题。
:::
