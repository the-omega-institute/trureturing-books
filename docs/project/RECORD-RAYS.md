# 环境记录的射线分组与旋转相干块

第四章的重复记录误差界按记录向量完全相等分组，并假设不同组的 Gram 重叠模长统一小于一。只相差单位相位的向量不满足这个条件。本项研究保留原受控记录信道，研究改按射线分组后能否从归一化推出严格分离。

## 数学结果

设系统和环境指标分别为 `Fin d`、`Fin e`，每条记录满足

$$
\sum_a |E_i(a)|^2=1,
\qquad
G_{ij}=\sum_a E_i(a)\overline{E_j(a)},
\qquad
\Phi_E(\rho)_{ij}=G_{ij}\rho_{ij}.
$$

定义 $i\sim j$ 当且仅当存在 $|u|=1$ 使 $E_i=uE_j$，并令 $P_{\rm ray}$ 保留且仅保留这些同射线的矩阵元。由记录本身可以选出单位相位 $u_i$ 和 $q\in[0,1)$，使不同射线间 $|G_{ij}|\le q$，同射线上 $G_{ij}=u_i\overline{u_j}$。写 $U=\operatorname{diag}(u_i)$，则对任意复矩阵 $\rho$ 和自然数 $N$，

$$
\left\|\Phi_E^N(\rho)-U^N P_{\rm ray}(\rho)(U^N)^*\right\|_F
\le q^N\left\|\rho-P_{\rm ray}(\rho)\right\|_F.
$$

归一化记录视为有限维复内积空间中的单位向量。Cauchy–Schwarz 的等号判据说明，重叠模长为一恰好对应同一射线；有限个跨射线对的重叠模长可取统一严格上界，没有跨射线对时取零。每条射线选一个归一化代表，原记录与代表之间的比例给出 $u_i$。原信道的迭代等于代表记录信道的迭代再施加上述对角相位作用；该作用保持 Frobenius 范数。因此，代表记录直接使用既有冻结声明 `D5/S3/Quantum/Decoherence/RepeatedRecordExponentialDecay.repeated_record_exponential_decay` 的收缩界即可。

完整的一般命题及其对角共轭对应关系已通过临时 Lean 应用检查，公理闭包仅含 `propext`、`Classical.choice`、`Quot.sound`。检查也覆盖空系统与空环境指标，以及归一化同射线记录无法满足旧的向量不等分组严格界的情形。该推导经依赖展开可直接复用既有收缩定理及内积、张成空间、有限上确界与迭代规则，按上游准入规则不新增包装定理或冻结 GID。书稿将它作为已引定理的应用推导，保留原声明的准确范围。

## 透明特例与物理范围

取三条记录

$$
E_0=(1,0),\quad E_1=(\mathrm{i},0),\quad E_2=(3/5,4/5).
$$

射线分组为 $\{0,1\}$ 与 $\{2\}$，可选 $u=(1,\mathrm{i},1)$、$q=3/5$。初态取所有矩阵元均为 $1/3$ 的纯态密度矩阵，则第 $(0,1)$ 项为 $(-\mathrm{i})^N/3$，模长保持不变；四个跨组项的模长均为 $(3/5)^N/3$，所以到运动相干块的 Frobenius 误差恰为 $(2/3)(3/5)^N$。这是手算推导，不单独作为冻结实例。

极限比较对象随时间旋转，同射线相干不会因此消失。条件记录映射中的相位会成为系统分支间的相对相位；只知道环境记录的密度矩阵，不能据此确定这些条件相位。用于比较的旋转参考系需要由耦合本身或相位校准确定。

这一结果消去的是射线分组下独立的严格重叠假设。归一化记录、指定的受控耦合和反复施加同一约化信道仍是模型前提。新鲜且初始无相关的环境可以实现该重复信道；复用或相关环境需要另行导出多步动力学。此处没有实验识别结果，也不据此宣称模型获得经验验证。

一般量子信道保留旋转分量的现象已有文献：Victor V. Albert, *Asymptotics of quantum channels: conserved quantities, an adiabatic limit, and matrix product states*, Quantum **3**, 151，DOI [10.22331/q-2019-06-06-151](https://doi.org/10.22331/q-2019-06-06-151)，[arXiv:1803.00109](https://arxiv.org/abs/1803.00109)，第 2 节的旋转点与渐近投影。该文说明一般背景；此处有限记录的具体范数界按上述代表构造与既有收缩结果推导，不作新颖性声明。

## 验证、交付与接续

上游的应用说明与 Scribe 投影见 [trureturing PR #30071](https://github.com/the-omega-institute/trureturing/pull/30071)，双语第四章、研究笔记和泛化 skill 的修订见 [书库 PR #248](https://github.com/the-omega-institute/trureturing-books/pull/248)。两者的合并状态、当前候选检查与部署结果以各 PR 和对应工作流为准。这里复用既有冻结声明，不新增 `lean=` 引用，合法钉版仍可沿用；不能把临时应用检查称作新增冻结定理。

与主线迁移整合后的结构检查为零错误、65 项警告：9 项既有媒体警告，以及新版检查发现的 56 项既有目录与页标题不一致。双语 HTML、三种 PDF、EPUB、幻灯片与整站已构建，新公式经桌面、手机与深浅主题检查。共享的短动画采样、说明栏、实体舞台准备与材质释放问题已通过正式 [模板 v0.9.3](https://github.com/the-omega-institute/trureturing-books-template/releases/tag/v0.9.3) 引入；四页的自身布局修复保留原质量阈值。完整工具测试共 1114 项，通过并按适用条件跳过 62 项。整合后的四页常规测试分别为 471/471、414/414、447/447、424/424，通过 49 项说明栏检查；规定截图与被引用静态图已重新生成并查看。双缝页面的动画阶段读取已改为同步捕获，后续自动擦除仍验证；哈尔卡片的测试按共享契约核对两行说明栏的末行可达性，同时保留整页及其他元素不滚动的要求。两项修复的实际断言已在普通与慢帧下检查，最终候选的完整远端常规与慢帧套件及独立审查仍待完成。构建证据不替代两仓合并与线上部署证据；本地未改视频因可选工具链不齐而使用海报。

## 固定有限环境的回返边界

从实际联合动力学出发，需要区分以下三个对象：反复施加同一个约化信道、在同一个有限联合空间上反复施加同一个酉算子，以及每一步使用新环境的碰撞模型。前面的 Gram 系数幂公式属于第一个对象；它没有证明后两个对象与它相同。

以下区分文献结果、既有 Lean 结果的精确应用，以及尚未形式化的联合态与偏迹推导。David Wallace，*Recurrence Theorems: a unified account*，DOI [10.1063/1.4907384](https://doi.org/10.1063/1.4907384)，[全文](https://arxiv.org/html/1306.3925)，定理 6 证明有限维、有界、保内积动力学的统一度量回返；定理 8–9 将回返推广到全有界、保距离的度量动力学。这里不使用依赖每步投影检测的“受监测回返”：每次检测都会改变实际演化，不能用其返回概率替代未受监测的酉幂。

### 任意晚的共同回返

设 $H$ 为任意有限维复内积空间，$U:H\to H$ 为一个固定酉算子。对每个实数 $\varepsilon>0$ 和自然数 $N$，存在自然数 $n>N$，使

$$
\lVert U^n-I\rVert_{\mathrm{op}}<\varepsilon.
$$

这是算子范数中的共同回返，而非只对一个态、允许另选全局相位的回返。因此，对每个给定的有限向量集 $F\subset H$，也能选一个共同的 $n>N$，使 $\lVert U^nx-x\rVert<\varepsilon$ 对所有 $x\in F$ 成立；空集合和零维空间也在范围内。

任意晚的量词不需要由一次正回返猜测而来。固定 $L=N+1$，把 Wallace 的统一回返用于 $U^L$ 在单位球上的作用，得到正整数 $k$；于是 $n=Lk>N$。单位球上的统一误差控制算子范数。要保持严格小于 $\varepsilon$，可先以 $\varepsilon/2$ 为回返精度。有限向量集的结论再以 $\varepsilon/(1+\max_{x\in F}\lVert x\rVert)$ 为算子精度得到；空集合单独取任意 $n>N$。

### 联合态、偏迹与固定读数

令 $S,E$ 都是有限维复希尔伯特空间，$H=S\otimes E$，$W$ 是 $H$ 上一个固定酉算子，$R$ 是一个固定联合密度矩阵。允许 $R$ 含有系统—环境初始相关，不要求纯态或张量积。实际历史定义为

$$
R_n=W^nR(W^\dagger)^n,
\qquad \rho_n=\operatorname{Tr}_E(R_n).
$$

同一个 $W,E,R$ 对所有 $n$ 保持不变，中间没有测量、重置或环境替换。由前面的共同回返，可以递归选出严格递增的 $n_k$，使 $\lVert W^{n_k}-I\rVert_{\mathrm{op}}\to0$。记 $A_k=W^{n_k}$，则

$$
\begin{aligned}
A_kRA_k^\dagger-R
  &=(A_k-I)RA_k^\dagger+R(A_k^\dagger-I),\\
\lVert A_kRA_k^\dagger-R\rVert_{\mathrm{op}}
  &\le 2\lVert R\rVert_{\mathrm{op}}
       \lVert A_k-I\rVert_{\mathrm{op}}\longrightarrow0.
\end{aligned}
$$

有限维上的偏迹是连续线性映射，故 $\rho_{n_k}\to\rho_0$。这不是声称偏迹在算子范数下以常数一收缩：若 $e=\dim E$，其标准估计为

$$
\lVert\operatorname{Tr}_E(X)\rVert_{\mathrm{op}}
\le e\lVert X\rVert_{\mathrm{op}}.
$$

例如，选定系统正交基中的两个指标 $i,j$，令 $c_n=(\rho_n)_{ij}$，便有 $c_{n_k}\to c_0$。若 $c_0\ne0$，则不可能存在固定有限实常数 $C\ge0$、$0\le q<1$ 和自然数 $N_0$，使 $|c_n|\le Cq^n$ 对所有 $n\ge N_0$ 成立：右侧沿任意趋于无穷的子列都趋零，与 $c_{n_k}\to c_0$ 矛盾。这里的相干量是一项固定矩阵元；不能随 $n$ 更换读出基或挑选不同观测量。

### 全时间近似也有误差地板

更一般地，设目标序列 $\tau_n$ 在任意一个固定系统矩阵范数下趋于 $\tau_\infty$。由同一子列的回返和范数连续性，

$$
\lVert\rho_{n_k}-\tau_{n_k}\rVert
\longrightarrow\lVert\rho_0-\tau_\infty\rVert.
$$

因此，每个对所有足够晚的 $n$ 都成立的统一误差界

$$
\lVert\rho_n-\tau_n\rVert\le\delta
$$

都必须满足 $\delta\ge\lVert\rho_0-\tau_\infty\rVert$。这将“不能精确实现全时间衰减”加强为一个准确的全时间近似障碍。若初态已经等于目标极限，右侧为零，这个论证不提供正的误差地板，也不否定其他耗散观测量的模型。

第四章的振幅压缩近似版本同样成立。令 $U$ 为上述有限维空间 $H$ 上的酉算子，$T:E_0\to E_0$ 为有界线性算子。若 $V:E_0\to H$ 为有界线性算子、$V^\dagger Vx=x$，且 $T^nx\to0$，则沿回返子列

$$
\lVert V^\dagger U^{n_k}Vx-T^{n_k}x\rVert
\longrightarrow\lVert x\rVert.
$$

这里 $V^\dagger U^{n_k}Vx\to V^\dagger Vx=x$，而 $T^{n_k}x\to0$，故由范数的连续性得到所示极限；无需假设压缩恒等式。若另要求对每个 $n$ 都有 $V^\dagger U^nVx=T^nx$，则非零 $x$ 与该极限矛盾。这仍是线性算子的压缩结论，不能不经联合态和偏迹的对应就将其直接称为量子信道的环境实现。

### 保留的边界与形式化缺口

这些书面推导没有给出最优回返时间、数值上可行的搜索算法、精确周期、热耗散或实验支持。有限维联合空间是关键条件；单独的环境有限维不足以控制一个无限维系统。若环境或酉算子随目标时间窗更换、环境不断补充新自由度、中间作测量或重置，模型已经改变。任意给定有限时间窗上的精确实现或近似均不被上述全时间障碍排除。

现有 Lean 的 `RepeatedRecordExponentialDecay`、`EnvironmentMarginalChannel` 与 `UnitaryPowerDilation` 分别供应重复约化信道、单次记录偏迹及共同全幂压缩的存在性。任意晚的有限向量集共同回返可直接复用钉版 Mathlib 的 `mapClusterPt_one_atTop_pow`：有限维有界算子空间是 proper 的，酉群闭且有界，故紧；对紧群幂在单位元的聚点性质，应用有限多个向量读数的共同邻域即可。这个精确应用包含空集合与零维空间，已通过 Lean 核验，只依赖标准逻辑公理，不新增绑定包装声明。对应来源为 [Mathlib SubmonoidClosure](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/Topology/Algebra/Group/SubmonoidClosure.lean)。

`UnitaryPowerDilation` 的既有 Blueprint 也已用该紧群路线解释非零衰减向量的有限总维数障碍。这里的联合密度矩阵、偏迹与固定相干读数应用仍为书面推导，不冒领相应 Lean 验证。仓内 V84 理论卷定理 6.1 已有更强的书面回返及时间上界陈述，不将上述应用计作原创发现；若新增对应形式化声明，仍须经该理论卷的摄入与 atom 路径及准入核验。研究入口为 [trureturing #30767](https://github.com/the-omega-institute/trureturing/issues/30767)。

仍需推进的独立问题是有限时间窗的资源—误差关系：在固定系统、选定衰减率和误差范数后，允许使用一个依赖窗口 $N$ 的有限环境，研究其维数如何控制对 $0\le n\le N$ 全部约化信道的共同逼近。一个终端时刻的 Stinespring 实现不自动实现全部前缀；每个输入态分别有好的环境，也不等于同一个环境对全部输入和未触碰参照都有效。该后继问题尚未完成现有成果检索或正式选题，不作新增定理声明。


## 有限终端词集的长度约束

全时间回返障碍不排除有限窗口实现。研究有限窗口的资源时，先要区分一个终端时刻的 Kraus 词跨度与所有前缀的共同实现：前者可由精确词长的代数关系控制，后者还要求同一个联合动力学同时满足所有时间条件。

一个可独立核验的代数步骤如下。设 $G$ 为任意群，$u^2=v^2=1$，令 $R=uv$，$\mathcal P_n$ 为恰好 $n$ 个来自 $\{u,v\}$ 的因子的有序乘积集合，并令 $\mathcal P_0=\{1\}$。对每个自然数 $m$，

$$
\begin{aligned}
\mathcal P_{2m}&=\{R^k:-m\le k\le m\},\\
\mathcal P_{2m+1}&=\{uR^k:-m\le k\le m+1\}.
\end{aligned}
$$

这里是集合的相等，不是表示的唯一性：允许 $u=v$、恒等生成元、$R$ 有限阶以及平凡群，不推出集合大小为区间长度。证明先观察 $\{u,v\}^2=\{1,R,R^{-1}\}$，再归纳得到后者的 $m$ 次乘积恰好是指数区间 $[-m,m]$。归纳时两个新端点分别由向前和向后一步取得，内部指数可补恒等步。奇数长度时，左乘 $u$ 保留指数，左乘 $v=uR$ 将指数加一；两个区间的并为 $[-m,m+1]$。这也解释了奇数区间的不对称上端点。

通常的二面体正规形已有经典来源：Iain Raeburn 与 Allan M. Sinclair，*The C*-algebra generated by two projections*，Mathematica Scandinavica **65** (1989)，278–290，DOI [10.7146/math.scand.a-12283](https://doi.org/10.7146/math.scand.a-12283)，[原文](https://journals.msp.org/mscand/article/download/1364/1363)。其第 280 页证明将两个二阶群的自由积写成二面体正规形；这里另核对精确步数的区间端点，不作数学原创性声明。

任意群中的上述两个等式已通过 Lean 编译，检查也覆盖三点置换群的两个不交换换位及零步退化情形。公理闭包仅含标准逻辑公理；交付入口为 [trureturing #30779](https://github.com/the-omega-institute/trureturing/issues/30779)。它只补上源理论卷式 (8.12) 的群论步骤：矩阵最小多项式、四个幂的线性独立性、Kraus/Choi 秩对应与环境最小维数仍需各自的证明。单独的词集等式不证明全部前缀可由同一有限环境实现，也不提供资源最优性。

## 混合量子比特环境的三步构造

全时间回返与有限前缀实现之间，可以用一个明确的二能级模型检验边界。以下给出代数推导；完整的实参数量词和任意有限参考系统已经通过临时 Lean 应用检查，公理闭包仅含标准逻辑公理。该检查不赋予新增冻结声明或资源最优性结论。研究问题见 [trureturing #30787](https://github.com/the-omega-institute/trureturing/issues/30787)。

令 $-1<\lambda<1$，$D_\lambda$ 保持二阶矩阵的对角项，将两个非对角项乘以实数 $\lambda$。取

$$
\begin{aligned}
t&=\sqrt{1-\lambda^2},&a&=\sqrt{1+t},&b&=\sqrt{3-t},\\
x&=a/2,&u&=b/2,&y&=\lambda/(2a),\\
q&=3\lambda/(2b),&r&=\sqrt2\,t/b.
\end{aligned}
$$

这里 $0<t\le1$，$a,b>0$，故分母不会为零，零与负的 $\lambda$ 均在范围内。设 $Z=\operatorname{diag}(1,-1)$，$X=\left(\begin{smallmatrix}0&1\\1&0\end{smallmatrix}\right)$，定义环境算子

$$
A=xI+\mathrm{i}uZ,\qquad
B=yI+\mathrm{i}(qZ+rX).
$$

由 $t^2+\lambda^2=1$ 可直接得到

$$
x^2+u^2=1,\quad y^2+q^2+r^2=1,\quad
xy=\lambda/4,\quad uq=3\lambda/4,\quad x^2+y^2=1/2.
$$

其中 $y^2=(1-t)/4$，而 $q^2+r^2=(3+t)/4$。因 $ZX+XZ=0$，$A$ 与 $B$ 均为酉算子。令

$$
W=|0\rangle\langle0|\otimes A+|1\rangle\langle1|\otimes B,
\qquad \sigma=I_2/2.
$$

这是系统与一个混合量子比特环境上的固定酉算子；重复施加 $W$，中间不重置环境。约化演化保持对角项，非对角项的乘子为 $f_n=\operatorname{Tr}(A^n(B^n)^\dagger)/2$ 及其复共轭。

为计算前三步，记 $s=x^2$、$h=y^2$。则 $s+h=1/2$、$sh=\lambda^2/16$。Pauli 乘法给出

$$
\begin{aligned}
f_0&=1,\\
f_1&=xy+uq=\lambda,\\
f_2&=(2s-1)(2h-1)+4xyuq=\lambda^2,\\
f_3&=xy(4s-3)(4h-3)+uq(4s-1)(4h-1)\\
&=\tfrac\lambda4(\lambda^2+3)+\tfrac{3\lambda}4(\lambda^2-1)
=\lambda^3.
\end{aligned}
$$

因此，这个书面构造在 $n=0,1,2,3$ 对所有系统矩阵实现 $D_\lambda^n$。它还保持任意有限未触碰参考：将系统—参考矩阵按参考指标写成系统矩阵块 $M_{rs}$，实际演化使用 $W^n\otimes I_R$，初始环境仍为 $\sigma$。对每个 $(r,s)$ 的环境偏迹就是上述作用于 $M_{rs}$ 的线性映射；块相等给出整个系统—参考矩阵相等。这里初始系统—参考可有关联，但环境必须与其独立。这个论证不把系统—参考边缘相等误当成整个联合历史相等，也不假设中间时刻的系统—环境重新成为乘积态。

在 $\lambda=0$ 时，$A=(I+\mathrm{i}Z)/\sqrt2$，$B=\mathrm{i}X$，于是 $f_1=f_2=f_3=0$，但 $A^4=-I$、$B^4=I$，$f_4=-1$。所以此构造的三步窗口不能直接延长为四步；这个特例本身不排除其他构造，二级环境在任意初始密度下的四步排除由下节的分支历史应用另行给出。私有实验仓库中的固定参数采样另外核对了实际八维演化、环境偏迹与参考量子比特全部矩阵单位，时间 $0$ 至 $3$ 的最大数值误差为 $1.1102230246251565\times10^{-15}$，预定阈值为 $10^{-10}$。这些数值不替代上述代数推导或普遍 Lean 检查。

文献的适用关系也需保留。Levick–Martin 的 *Matrix N-dilations of Quantum Channels*（[arXiv:1808.04677](https://arxiv.org/abs/1808.04677)，定理 10）使用随窗口增大的张量环境，不能直接供应这里固定 $M_2$ 的资源要求。Haagerup–Musat 的因子化判据（DOI [10.1007/s00220-011-1216-y](https://doi.org/10.1007/s00220-011-1216-y)，引理 2.8）供应单次 Schur 乘子的迹酉表示，不自动给出同一个算子的共同幂。圆上 Szegő 求积的矩匹配也不自动将任意节点和权重实现为混合量子比特的两个受控分支。上述对照不宣称文献中不存在这一特殊构造或数学原创性。

这一二能级去相位模型不同于源理论卷第 9.3 节的十维信道；不能拿它反驳该信道的混合量子比特排除结论。本模型二级环境在任意初始密度下的四步障碍见下节的手工应用；四步窗口的三级可达性见“三能级环境的四步共同构造”节。一般窗口的最小环境维数，以及哪些有限矩数据能够由同一对环境酉算子的迹重叠共同实现，仍需独立研究。它们均不是此三步构造的推论。

有限维压缩膨胀的最小维数已有明确文献供应：Eliahu Levy 与 Orr Moshe Shalit，*Dilation theory in finite dimensions: the possible, the impossible and the unknown*，DOI [10.1216/rmj-2014-44-1-203](https://doi.org/10.1216/rmj-2014-44-1-203)，[arXiv:1012.4514v2](https://arxiv.org/abs/1012.4514v2)，定理 1.3 与推论 2.2。对作用于 $n$ 维空间的收缩算子 $T$，记 $d_T=\operatorname{rank}(I-T^*T)^{1/2}$，其酉 $N$ 步压缩膨胀的最小总维数为 $n+Nd_T$。这里的总空间维数与环境维数不是同一资源；用于上述混合环境信道前，仍须从实际共同演化导出符合该定义的同一个压缩表示，并核对其空间维数。后继研究应复用这一下界，而不把它重新计作新定理。

## 最大混合环境的有限前缀维数障碍

固定正整数 $d$、自然数 $N$ 和实数 $-1<\lambda<1$。设同一个酉算子 $W$ 作用于 $\mathbb C^2\otimes\mathbb C^d$，环境只在初始时制备为 $I_d/d$，此后不重置。若对每个系统矩阵 $X$ 及每个 $0\le n\le N$，实际约化映射

$$
\operatorname{Tr}_E\bigl(W^n(X\otimes I_d/d)W^{*n}\bigr)
$$

保持 $X$ 的对角元并将两个非对角元乘以 $\lambda^n$，则必有

$$
N+1\le d^2.
$$

这里不预设 $W$ 受控。若 $N\ge1$，将一步保持的纯系统基态代入，错误输出基态的对角元等于相应非对角系统分块所有矩阵元模平方之和除以 $d$。各项非负且总和为零，故这些分块全为零，因而 $W=\operatorname{diag}(A,B)$，其中 $A,B$ 为环境酉矩阵。取系统矩阵单位 $|0\rangle\langle1|$，得到

$$
\operatorname{Tr}(A^nB^{*n})=d\lambda^n\qquad(0\le n\le N).
$$

在 $d^2$ 维 Hilbert–Schmidt 空间中令 $v_n=A^nB^{*n}$。对 $0\le i\le j\le N$，酉性和迹的循环性给出

$$
\langle v_i,v_j\rangle
=\operatorname{Tr}(A^{j-i}B^{*(j-i)})
=d\lambda^{j-i}.
$$

此处不要求 $A$ 与 $B$ 交换。令 $w_0=v_0$，$w_n=v_n-\lambda v_{n-1}$（$n\ge1$）。代入上述内积可得指标 $0\le i\ne j\le N$ 的 $w_i,w_j$ 正交，且

$$
\|w_0\|^2=d,\qquad
\|w_n\|^2=d(1-\lambda^2)>0\quad(1\le n\le N).
$$

因此有 $N+1$ 个非零正交向量，维数至少为 $N+1$。当 $N=0$ 时，由 $d\ge1$ 直接得到结论。这也解释了有限压缩膨胀文献与本模型的资源对应：相关矩向量所在空间维数是 $d^2$，不是环境维数 $d$ 本身。

特别地，$d=2$ 时必有 $N\le3$。结合前述三步构造，固定初态 $I_2/2$ 的共同自主量子比特环境恰能实现三个非平凡退相干步骤，不能实现第四步；结论包含 $\lambda=0$ 与负 $\lambda$。

上述完整任意 $W$ 命题已做临时 Lean 精确应用检查，并经独立陈述核对；它属于既有结果的应用，没有新增或冻结对应数学声明，因此不作为本书冻结 Lean 定理引用。结果与证据见 [trureturing #30800](https://github.com/the-omega-institute/trureturing/issues/30800)。这里的正交矩阵空间证明依赖最大混合初态；这份应用检查的范围仍限于该初态，不承担下面任意密度版本的验证，也未解决一般窗口的最小环境维数。

### 任意密度的二态手工应用与剩余边界

**手工应用推导，未在本书形式化。** 完整的分支历史与复权重 Prony 论证见[第四章相应正文](../../books/quantum-geometry/zh/ch04-s02-quantum-noise.md#rem-arbitrary-density-prefix)，并有对应英文版本。固定 $m\ge2,d\ge1,N\in\mathbb N,-1<\lambda<1$、正交单位态 $a,b\in\mathbb C^m$、任意半正定单位迹环境密度 $\sigma\in M_d(\mathbb C)$ 及同一个联合酉算子 $W$。若实际映射 $\Psi_n(X)=\operatorname{Tr}_E(W^n(X\otimes\sigma)W^{*n})$ 在 $0\le n\le N$ 保持两个纯投影，并满足 $\langle a,\Psi_n(\lvert a\rangle\langle b\rvert)b\rangle=\lambda^n$，则必要地 $N+1\le d^2$。环境初始独立、全过程无重置、干预、外部时钟控制或环境更换；$N=0$、零与负的 $\lambda$ 都在范围内，$\lambda=\pm1$ 则不在范围内。

来源是[源理论卷 §§9–10 的 Theorem 10.1 及其证明](https://github.com/the-omega-institute/trureturing/blob/3476ce98dd3c4326181683b37fc2ddad3e33a743/docs/develop/theory/RECURSIVE_RELATIONAL_OBSERVATION_MINIMAL_RECORD_DILATIONS.md#L980-L1058)：该定理处理平衡十维信道，先验证实际正交态 $h_+,h_-$ 的投影保持与相干乘子 $1-4p$；书中以 $a,b$ 对应这两个态，沿用其后续证明，而非将通用二态版本冒充为源文逐字陈述。实现桥来自同一个实际 $W$ 在正支集历史跨度上的线性等距作用，再在原 $d$ 维环境内延拓；不预设全局受控形式，也不纯化增维。谱权重 $\operatorname{Tr}(P_i\sigma Q_j)$ 可为复数，消去式不依赖正性，不能用最大混合态的正交增量证明代替。研究入口为 [trureturing #31041](https://github.com/the-omega-institute/trureturing/issues/31041)。这条任意密度应用未提供新的 Lean 证明；不能据组成结果的验证声称该通用陈述已经 Lean 验证。

对二能级去相位取 $m=2,a=e_0,b=e_1,d=2$，任意 $\sigma$ 都有 $N\le3$。结合[前述三步显式构造](#混合量子比特环境的三步构造)，对每个固定 $-1<\lambda<1$，允许选择初始密度的二级环境在这一自主共同前缀契约下最多实现三个演化步骤（$n=1,2,3$），且由 $\sigma=I_2/2$ 的同一个 $W$ 达到。该构造要求环境与初始系统及任意有限未触碰参考独立，并实现所有系统矩阵上的信道等式；没有中间干预或重置。

这个必要界本身不提供可达性；下一节补上四步窗口的三能级见证。一般窗口的精确最小维数、其余维数与窗口的可达性、近似资源—误差界及一般相容迹矩的物理实现仍未解决。上述压缩膨胀文献的下界不自动成为信道环境资源界，Levick–Martin 的环境随窗口增长也不提供固定维数的最优性。未受干预的边缘恒等式不确定保留环境的完整联合态历史或干预过程张量；没有物理普适律或实验结论随此界得到。

## 三能级环境的四步共同构造

**普通书面推导，未在本书形式化。** 本节保存[第四章中文注记](../../books/quantum-geometry/zh/ch04-s02-quantum-noise.md#rem-four-step-qutrit)及[对应英文注记](../../books/quantum-geometry/en/ch04-s02-quantum-noise.md#rem-four-step-qutrit)的构造与完整初等代数。四步存在性是这里要解释的既有普通数学结果；本节不声明新的冻结定理、形式证明或数学原创发现。

### 对象、契约与分块机制

固定任意实数 $-1<\lambda<1$。在系统 $S=\mathbb C^2$ 上，对所有复矩阵 $X=(x_{ij})$ 定义

$$
\mathcal D_\lambda(X)=\begin{pmatrix}x_{00}&\lambda x_{01}\\\lambda x_{10}&x_{11}\end{pmatrix}.
$$

它是 $\frac{1+\lambda}{2}\operatorname{id}+\frac{1-\lambda}{2}\operatorname{Ad}_{Z_S}$，其中 $Z_S=\operatorname{diag}(1,-1)$，所以整个严格实区间都给出信道。自然数第零幂取 $1$，包括 $\lambda=0$。

要为每个这样的 $\lambda$ 选取一个环境 $E=\mathbb C^3$、一个与输入独立的密度矩阵 $\sigma$、一个 $S\otimes E$ 上的酉矩阵 $W$，使同一组数据同时满足

$$
\Tr_E\bigl(W^n(X\otimes\sigma)W^{-n}\bigr)=\mathcal D_\lambda^n(X)
\qquad(X\in M_2(\mathbb C),\ 0\le n\le4).
$$

量词顺序是先固定 $\lambda$、再选 $W,\sigma$、然后对所有输入和所有指定步数成立。环境只初始制备一次；没有中间干预、测量、重置、环境更换、随时间变化的耦合或外部时钟控制。三个环境维数拆成 $\mathbb C\oplus\mathbb C^2$：静止线提供常数项，二维块中两套条件旋转的迹重叠提供两个余弦。下面的矩阵才是这些标量矩确实可实现的依据。

### 参数与全部定义域

设

$$
\begin{aligned}
D&=\sqrt{\lambda^2+2\lambda+5},&p&=\frac{1+\lambda}{5-3\lambda},\\
k&=\frac{2\lambda}{D},&r&=\sqrt{1-k^2},\\
x_+&=\frac{\lambda-1+D}{4},&x_-&=\frac{\lambda-1-D}{4},\\
\theta_+&=\arccos x_+,&\theta_-&=\arccos x_-,\\
\alpha&=\frac{\theta_++\theta_-}{2},&\beta&=\frac{\theta_--\theta_+}{2},\\
w&=\frac{1+k}{2}=\frac12+\frac{\lambda}{D}.
\end{aligned}
$$

因为 $D^2=(\lambda+1)^2+4>0$，有 $D>0$；因为 $-1<\lambda<1$，有 $5-3\lambda>2$、$1+\lambda>0$，并且

$$
\begin{aligned}
1-p&=\frac{4(1-\lambda)}{5-3\lambda}>0,\\
D^2-4\lambda^2&=-3\lambda^2+2\lambda+5
=(\lambda+1)(5-3\lambda)>0,\\
1-k^2&=\frac{(\lambda+1)(5-3\lambda)}{D^2}>0.
\end{aligned}
$$

故 $0<p<1$、$-1<k<1$、$r>0$、$k^2+r^2=1$、$0<w<1$，所有分母均不为零。

直接计算根的和、积：

$$
\begin{aligned}
x_++x_-&=\frac{\lambda-1}{2},\\
x_+x_-&=\frac{(\lambda-1)^2-D^2}{16}=-\frac{\lambda+1}{4}.
\end{aligned}
$$

所以它们是二次多项式

$$
q(x)=x^2-\frac{\lambda-1}{2}x-\frac{\lambda+1}{4}
$$

的两个不同实根，且 $x_-<x_+$。又有

$$
q(-1)=\frac{\lambda+1}{4}>0,\qquad
q(0)=-\frac{\lambda+1}{4}<0,\qquad
q(1)=\frac{5-3\lambda}{4}>0.
$$

连续性在 $(-1,0)$、$(0,1)$ 各给出一根，二次式至多两根，故 $-1<x_-<0<x_+<1$。两角都在 $(0,\pi)$，并满足 $\alpha-\beta=\theta_+$、$\alpha+\beta=\theta_-$。这些检查没有假设 $\lambda\ne0$ 或 $\lambda>0$；端点 $\lambda=\pm1$ 不在本节范围内。

### 实际矩阵、正性与共同幂

将任意输入记为 $X$；Pauli 矩阵专用 $Z,X_P$：

$$
Z=\begin{pmatrix}1&0\\0&-1\end{pmatrix},\qquad
X_P=\begin{pmatrix}0&1\\1&0\end{pmatrix},\qquad H=kZ+rX_P.
$$

取 $P_0=\lvert0\rangle\langle0\rvert$、$P_1=\lvert1\rangle\langle1\rvert$ 为系统投影，并定义

$$
\begin{aligned}
A_2&=\cos\alpha\,I_2+\mathrm i\sin\alpha\,Z,\\
B_2&=\cos\beta\,I_2+\mathrm i\sin\beta\,H,\\
A&=1\oplus A_2
=\begin{pmatrix}1&0&0\\0&e^{\mathrm i\alpha}&0\\0&0&e^{-\mathrm i\alpha}\end{pmatrix},\\
B&=1\oplus B_2
=\begin{pmatrix}
1&0&0\\
0&\cos\beta+\mathrm i k\sin\beta&\mathrm i r\sin\beta\\
0&\mathrm i r\sin\beta&\cos\beta-\mathrm i k\sin\beta
\end{pmatrix},\\
\sigma&=\operatorname{diag}\left(p,\frac{1-p}{2},\frac{1-p}{2}\right),\\
W&=P_0\otimes A+P_1\otimes B
=\begin{pmatrix}A&0_3\\0_3&B\end{pmatrix}\in M_6(\mathbb C).
\end{aligned}
$$

$\sigma$ 三个特征值均正且和为 $1$，所以它是满秩密度；满秩仅是这个见证的选择。$\sigma$ 的二维块为标量，因此与 $A,B$ 交换。由 Pauli 反交换关系，

$$
\begin{aligned}
Z^*&=Z,\quad X_P^*=X_P,\quad Z^2=X_P^2=I_2,\quad ZX_P+X_PZ=0,\\
H^*&=H,\qquad H^2=(k^2+r^2)I_2=I_2.
\end{aligned}
$$

若 $K^*=K$、$K^2=I$，则

$$
\begin{aligned}
&(\cos t\,I+\mathrm i\sin t\,K)(\cos t\,I-\mathrm i\sin t\,K)\\
&\qquad=\cos^2t\,I+\sin^2t\,K^2=I.
\end{aligned}
$$

反向乘积也相同，故 $A_2,B_2,A,B$ 酉。$P_0P_1=P_1P_0=0$、$P_0+P_1=I_2$ 进一步给出 $WW^*=W^*W=I_2\otimes I_3$。这是一个在所有时刻使用的受控 $6\times6$ 酉矩阵；不是对任意实现的结构假设。

同一个对合的旋转满足

$$
\begin{aligned}
&(\cos s\,I+\mathrm i\sin s\,K)(\cos t\,I+\mathrm i\sin t\,K)\\
&\qquad=\cos(s+t)I+\mathrm i\sin(s+t)K.
\end{aligned}
$$

从第零幂归纳，且用共轭转置处理负幂，得到对所有自然数 $n$

$$
\begin{aligned}
A_2^n&=\cos(n\alpha)I_2+\mathrm i\sin(n\alpha)Z,\\
B_2^{-n}&=\cos(n\beta)I_2-\mathrm i\sin(n\beta)H,\\
W^n&=P_0\otimes A^n+P_1\otimes B^n.
\end{aligned}
$$

### 迹重叠与四步矩的完整计算

有 $\Tr Z=\Tr X_P=\Tr H=0$，而

$$
\Tr(ZH)=k\Tr I_2+r\Tr(ZX_P)=2k.
$$

将两个旋转相乘，含单个 $Z,H$ 的项迹为零，交叉项中 $\mathrm i(-\mathrm i)=1$，因此

$$
\begin{aligned}
g_n&:=\tfrac12\Tr(A_2^nB_2^{-n})\\
&=\cos(n\alpha)\cos(n\beta)+k\sin(n\alpha)\sin(n\beta)\\
&=\frac{1+k}{2}\cos(n(\alpha-\beta))
+\frac{1-k}{2}\cos(n(\alpha+\beta))\\
&=wT_n(x_+)+(1-w)T_n(x_-),\\
f_n&:=\Tr(A^n\sigma B^{-n})=p+(1-p)g_n.
\end{aligned}
$$

$T_n(\cos\theta)=\cos(n\theta)$ 定义第一类 Chebyshev 多项式。这里从未把 $A^nB^{-n}$ 换成 $(AB^{-1})^n$，不要求 $A,B$ 交换。

置 $M_j=wx_+^j+(1-w)x_-^j$。首先

$$
\begin{aligned}
M_0&=1,\\
M_1&=\frac{x_++x_-}{2}+\frac{\lambda}{D}(x_+-x_-)\\
&=\frac{\lambda-1}{4}+\frac{\lambda}{2}
=\frac{3\lambda-1}{4}.
\end{aligned}
$$

由根方程 $x_\pm^2=\frac{\lambda-1}{2}x_\pm+\frac{\lambda+1}{4}$，乘以 $x_\pm^j$ 再按权重相加，得到对所有 $j\ge0$

$$
M_{j+2}=\frac{\lambda-1}{2}M_{j+1}+\frac{\lambda+1}{4}M_j.
$$

逐项代入，完整列出到第五步所需的值：

$$
\begin{aligned}
M_2&=\frac{(\lambda-1)(3\lambda-1)+2(\lambda+1)}8
=\frac{3\lambda^2-2\lambda+3}{8},\\
M_3&=\frac{(\lambda-1)(3\lambda^2-2\lambda+3)+(\lambda+1)(3\lambda-1)}{16}\\
&=\frac{3\lambda^3-2\lambda^2+7\lambda-4}{16},\\
M_4&=\frac{(\lambda-1)(3\lambda^3-2\lambda^2+7\lambda-4)
+(\lambda+1)(3\lambda^2-2\lambda+3)}{32}\\
&=\frac{3\lambda^4-2\lambda^3+10\lambda^2-10\lambda+7}{32},\\
M_5&=\frac{(\lambda-1)(3\lambda^4-2\lambda^3+10\lambda^2-10\lambda+7)
+(\lambda+1)(3\lambda^3-2\lambda^2+7\lambda-4)}{64}\\
&=\frac{3\lambda^5-2\lambda^4+13\lambda^3-15\lambda^2+20\lambda-11}{64}.
\end{aligned}
$$

利用 $T_0=1$、$T_1=x$、$T_2=2x^2-1$、$T_3=4x^3-3x$、$T_4=8x^4-8x^2+1$、$T_5=16x^5-20x^3+5x$，各项分别为

$$
\begin{aligned}
g_0&=M_0=1,\\
g_1&=M_1=\frac{3\lambda-1}{4},\\
g_2&=2M_2-1=\frac{3\lambda^2-2\lambda-1}{4},\\
g_3&=4M_3-3M_1=\frac{3\lambda^3-2\lambda^2-2\lambda-1}{4},\\
g_4&=8M_4-8M_2+1
=\frac{3\lambda^4-2\lambda^3-2\lambda^2-2\lambda-1}{4},\\
g_5&=16M_5-20M_3+5M_1
=\frac{3\lambda^5-2\lambda^4-2\lambda^3-5\lambda^2+4}{4}.
\end{aligned}
$$

对 $1\le n\le4$，这些值满足 $4g_n=3\lambda^n-2\sum_{j=1}^{n-1}\lambda^j-1$。由于

$$
(1-\lambda)\sum_{j=1}^{n-1}\lambda^j=\lambda-\lambda^n,
$$

其中 $n=1$ 时两边均为零，得到

$$
\begin{aligned}
1+\lambda+4(1-\lambda)g_n
&=1+\lambda+3(1-\lambda)\lambda^n
-2(\lambda-\lambda^n)-(1-\lambda)\\
&=(5-3\lambda)\lambda^n,\\
f_n&=\frac{1+\lambda+4(1-\lambda)g_n}{5-3\lambda}
=\lambda^n\quad(1\le n\le4),\\
f_0&=p+(1-p)=1.
\end{aligned}
$$

整个计算没有除以 $\lambda$。例如 $\lambda=0$ 时，$p=1/5$、$k=0$、$r=1$、$x_\pm=(-1\pm\sqrt5)/4$，故 $(f_0,\ldots,f_4)=(1,0,0,0,0)$。负参数同样覆盖。

第五步则为

$$
\begin{aligned}
&(5-3\lambda)(f_5-\lambda^5)\\
&=1+\lambda+(1-\lambda)
(3\lambda^5-2\lambda^4-2\lambda^3-5\lambda^2+4)
-(5-3\lambda)\lambda^5\\
&=3\lambda^3-5\lambda^2-3\lambda+5\\
&=(5-3\lambda)(1-\lambda^2).
\end{aligned}
$$

因此 $f_5-\lambda^5=1-\lambda^2>0$。这只排除上述固定矩阵的第五步延续，不是一般三能级环境的不可能性结论。

### 全矩阵输入与任意有限未触碰参考

设 $E_{ij}=\lvert i\rangle\langle j\rvert$ 为系统矩阵单位。受控幂的展开给出

$$
\begin{aligned}
W^n(E_{00}\otimes\sigma)W^{-n}&=E_{00}\otimes A^n\sigma A^{-n},\\
W^n(E_{11}\otimes\sigma)W^{-n}&=E_{11}\otimes B^n\sigma B^{-n},\\
W^n(E_{01}\otimes\sigma)W^{-n}&=E_{01}\otimes A^n\sigma B^{-n},\\
W^n(E_{10}\otimes\sigma)W^{-n}&=E_{10}\otimes B^n\sigma A^{-n}.
\end{aligned}
$$

前两项的环境迹均为 $\Tr\sigma=1$，后两项分别为 $f_n$ 与 $\overline{f_n}$，因为 $\sigma^*=\sigma$。所以对所有复系统矩阵，

$$
\Psi_n(X)=\begin{pmatrix}x_{00}&f_nx_{01}\\\overline{f_n}x_{10}&x_{11}\end{pmatrix}
=\mathcal D_{\lambda^n}(X)=\mathcal D_\lambda^n(X)
\quad(0\le n\le4).
$$

这不是只核对一个态或若干数值采样。对任意正整数 $s$ 与有限参考 $R=\mathbb C^s$，任意 $Y\in M_{2s}(\mathbb C)$ 可写成 $Y=\sum_{a,b}X_{ab}\otimes F_{ab}$。为在 $Y\otimes\sigma$ 的 $S\otimes R\otimes E$ 次序上写出实际演化，定义标准酉置换

$$
\begin{aligned}
J&:S\otimes R\otimes E\longrightarrow S\otimes E\otimes R,\\
J(u\otimes v\otimes z)&=u\otimes z\otimes v,\\
\widehat{W}&=J^{-1}(W\otimes I_R)J,\\
\widehat{W}^{\,n}&=J^{-1}(W^n\otimes I_R)J.
\end{aligned}
$$

置换只固定张量记号，参考全过程未触碰；$\widehat{W}$ 始终由同一个 $W$ 给出。初始环境为独立的 $\sigma$，按每个参考矩阵单位应用上一式，得

$$
\begin{aligned}
&\Tr_E\bigl[\widehat{W}^{\,n}(Y\otimes\sigma)
\widehat{W}^{-n}\bigr]\\
&\qquad=\sum_{a,b}\Psi_n(X_{ab})\otimes F_{ab}
=(\mathcal D_\lambda^n\otimes\operatorname{id}_R)(Y)
\quad(0\le n\le4).
\end{aligned}
$$

故所有可能纠缠的系统—参考密度矩阵均包含在内。初始环境独立是前提；后续系统—环境无需重新因子化。参考全过程未触碰。这里不推断完整联合态历史相等，也不推断任何插入干预的过程张量规律。

### 标量求积关系与物理实现的区别

Poisson–Chebyshev 概率测度可写成

$$
\begin{aligned}
\mathrm d\mu_\lambda(x)
&=\frac{1-\lambda^2}{\pi(1-2\lambda x+\lambda^2)\sqrt{1-x^2}}\,\mathrm dx
\quad(-1<x<1),\\
\int_{-1}^1 T_n(x)\,\mathrm d\mu_\lambda(x)&=\lambda^n\quad(n\ge0).
\end{aligned}
$$

其分母中 $1-2\lambda x+\lambda^2\ge(1-|\lambda|)^2>0$，端点的平方根奇性可积。第二式可直接由 $x=\cos\theta$、$0\le\theta\le\pi$ 与 Poisson 核展开得到：

$$
\frac{1-\lambda^2}{1-2\lambda\cos\theta+\lambda^2}
=1+2\sum_{j=1}^\infty\lambda^j\cos(j\theta).
$$

$|\lambda|<1$ 保证一致绝对收敛，可以逐项积分；$\int_0^\pi\cos(n\theta)\,\mathrm d\theta=0$（$n\ge1$），而不同正整数频率正交，同频率平方的积分为 $\pi/2$。故第零矩为 $1$，正整数第 $n$ 矩为 $\lambda^n$，负 $\lambda$ 也包含在内。

上面已直接算出的 $f_0,\ldots,f_4$ 表明

$$
\int h(x)\,\mathrm d\mu_\lambda(x)
=p\,h(1)+(1-p)w\,h(x_+)+(1-p)(1-w)\,h(x_-)
\quad(\deg h\le4),
$$

因为 $T_0,\ldots,T_4$ 构成次数至多四的多项式空间的一组基。这就是带指定端点 $1$ 的三节点 Gauss–Radau 标量矩规则的关系；方法本身已有经典来源，不作为数学发现。也可将余弦拆成圆周上的五个频率：$1$ 的权重为 $p$，$e^{\pm\mathrm i\theta_+}$ 的权重各为 $(1-p)w/2$，$e^{\pm\mathrm i\theta_-}$ 的权重各为 $(1-p)(1-w)/2$。这些权重均正且总和为 $1$。

标量矩匹配只给数据。本节另以显式 $1+2$ 的 SU(2) 迹嵌入实现了这些特定数据：$A_2,B_2$ 的特征值分别为 $e^{\pm\mathrm i\alpha}$、$e^{\pm\mathrm i\beta}$，行列式都为 $1$。任意给定的标量节点与权重不自动满足一个固定维数物理实现的相容性。本节不依赖未读原始论文中的求积定理来证明构造。

### 最小性、来源与仍未解决的问题

前节及[第四章任意密度注记](../../books/quantum-geometry/zh/ch04-s02-quantum-noise.md#rem-arbitrary-density-prefix)给出的普通必要界适用于任意初始环境密度和任意实际联合酉矩阵。取 $m=2,a=e_0,b=e_1,N=4$，得到 $5\le d^2$，故正整数 $d$ 至少为 $3$；本节达到 $3$。因此，对每个严格实参数 $-1<\lambda<1$，在同一个自主单比特去相位模型、允许任意初始密度的意义下，四步精确最小环境维数在普通书面推导层面为 $3$。本节没有把该必要界或组合最小性升级为 Lean 验证。已有 Lean 检查覆盖参数范围、密度矩阵的半正定性与单位迹、两套条件旋转的酉性及乘法和幂恒等式、$n=0,\ldots,4$ 的迹矩，以及按环境—系统次序编号的六阶分块矩阵的酉性和对角分支迹。这些只是完整推导的部分环节：所有系统矩阵的偏迹组装、系统—环境与环境—系统的类型对应、任意有限参考扩展及完整存在性结论均未得到完整 Lean 验证。任意密度必要界及组合最小性也仍属普通书面推导。完整形式证明的形状尚未确定；不能由这些局部检查推断完整结论已验证。

直接来源与用途如下：

- [trureturing #31054 的构造与部分形式证据](https://github.com/the-omega-institute/trureturing/issues/31054#issuecomment-6903256672)及[结论边界](https://github.com/the-omega-institute/trureturing/issues/31054#issuecomment-6903257082)：本单比特四步共同实现的来源与证据范围。普通证明由本节的参数、矩阵与恒等式给出；局部 Lean 检查不承担完整信道及参考恒等式。
- [源理论卷 §§9–10](https://github.com/the-omega-institute/trureturing/blob/fa5e97b5e2402d2360c22b2a6996d2e3838bf905/docs/develop/theory/RECURSIVE_RELATIONAL_OBSERVATION_MINIMAL_RECORD_DILATIONS.md#L810-L1058)：§9.1 固定共同前缀契约；Theorem 9.3 处理另一平衡十维信道的两步实现；Theorem 10.1 的正支集历史与复权重 Prony 论证供应既有必要界。书中的通用二态版本是该证明的手工应用，并非源定理逐字陈述。
- [Radau Quadrature 的二级说明](https://mathworld.wolfram.com/RadauQuadrature.html)：用于说明指定端点的已知标量求积方法。此链接不承担物理实现证明；未独立阅读的 Gautschi、Golub 原始论文不作为本节的证明依据。
- 本文件的“混合量子比特环境的三步构造”供应已有的 Pauli 迹机制及参考矩阵块扩展思路；本节将明确的三能级四步见证保存为同一研究主题的接续，不重新包装这些基础步骤为新定理。

一般窗口的精确最小维数、一般相容迹矩实现与近似资源—误差关系继续开放。第五步失效只限制这里的矩阵。源理论卷的十维信道没有从本节获得新的上构造。没有实验、物理普适律、无限时间窗、完整联合历史或中间干预规律随本节得到。既有方法、普通推导、部分形式核验及全球新颖性是不同层次；本节给出完整普通推导，并严格保留上述形式证据边界，不作全球新颖性声明。
