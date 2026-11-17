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

一般窗口的精确最小维数、一般相容迹矩实现与完整近似资源—误差权衡继续开放；后节保存小泄漏下的加权历史接口。第五步失效只限制这里的矩阵。源理论卷的十维信道没有从本节获得新的上构造。没有实验、物理普适律、无限时间窗、完整联合历史或中间干预规律随本节得到。既有方法、普通推导、部分形式核验及全球新颖性是不同层次；本节给出完整普通推导，并严格保留上述形式证据边界，不作全球新颖性声明。

## 实际加权历史的小泄漏接口与完整资源边界

本节接续三能级四步构造之后的近似问题，详见对应[第四章中文注记](../../books/quantum-geometry/zh/ch04-s02-quantum-noise.md#rem-weighted-history-stability)与[英文注记](../../books/quantum-geometry/en/ch04-s02-quantum-noise.md#rem-weighted-history-stability)。保存的是已完成的普通 C4 论证；四步三能级构造与其部分形式检查保持原有范围，不作为 C4 的证据。

### 来源、证据与既有供应

直接输入是 [trureturing #31078 的结果与边界](https://github.com/the-omega-institute/trureturing/issues/31078#issuecomment-6904102516)，以及本次写作之前完成的普通论证与独立评阅结论。它们是可出错的普通数学证据。本节忠实展开其代数，不新增独立验证结论；未读取诊断正文。

按所提供的来源核对，`D5/S3/Quantum/Matrix/AbedNikolaevaNovikovTwoContrastYoung.lean` 中私有的 `exists_polar_abs` 已经供应任意复方阵的原维数极补全，底层使用 `D5/S3/Quantum/Algebra/GramUnitaryExtension.lean` 的等 Gram 酉延拓。私有可见性不构成缺失数学。`D5/S3/Weil/ZetaLinear/RankTrace.lean` 中的 `RHLinalg.trace_mul_nonneg_of_posSemidef`，连同半正定合同变换与迹正性，供应不要求交换的正迹配对。这里复用这些来源，不重证、改名或建立包装声明；也不由组成供应推出完整事件已形式化。

Higham，*Computing the Polar Decomposition—with Applications*，DOI [10.1137/0907079](https://doi.org/10.1137/0907079)，[全文](https://eprints.maths.manchester.ac.uk/694/1/high86p.pdf)，Theorem 1.1 与 Lemma 2.1，只承担静态方阵极补全及正平方根识别。所提供的评阅记录已核对这两个段落；本次作者未重新验证原始论文。加权实际历史估计、带权最优性与全幂稳定性均不归于该文。没有全球新颖性或常数最优性结论。

### 完整普通推导

**普通书面推导，未在本书形式化。** 把联合演化看成在两条系统分支之间转动：压回原分支的部分会缩短，漏出的部分仍留在实际联合历史中，之后可能返回。极分解把这次压缩拆成“正的缩短”与“酉的转动”；即使压缩有零方向，也能在原环境空间内补齐那次转动。下面用同一固定转动逐步跟随真实历史，误差按步数相加。这里保存的是[已有完整普通论证](https://github.com/the-omega-institute/trureturing/issues/31078#issuecomment-6904102516)，不是新的形式化结论。

**对象、范数与完整量词。** 任取整数 $d,N\ge1$、作用于 $\mathbb C^2\otimes\mathbb C^d$ 的酉矩阵 $W\in M_{2d}(\mathbb C)$，以及任意半正定单位迹矩阵 $\sigma\in M_d(\mathbb C)$。星号表示共轭转置。对任意矩形复矩阵 $M$，希尔伯特—施密特范数与算子范数分别约定为

$$
\begin{aligned}
\|M\|_{\mathrm{HS}}^2&=\Tr(M^*M)=\sum_{i,j}|M_{ij}|^2,\\
\|M\|_{\mathrm{op}}&=\sup_{\|v\|_2\le1}\|Mv\|_2.
\end{aligned}
$$

后者衡量对向量的最大放大倍数；下文说一个分块是收缩时，指算子范数至多为一，不是该分块的希尔伯特—施密特范数至多为一。令 $e_0,e_1$ 为系统标准基，定义

$$
\begin{aligned}
S&=\sqrt{\sigma}\in M_d(\mathbb C),\qquad S^*=S,\quad S^2=\sigma,\\
J_b&:\mathbb C^d\longrightarrow\mathbb C^2\otimes\mathbb C^d,
\qquad J_bv=e_b\otimes v,\\
P_b&=J_bJ_b^*,\qquad Q_b=I_{2d}-P_b
\qquad(b\in\{0,1\}),\\
L_N&=\max_{\substack{b\in\{0,1\}\\0\le k\le N}}
\|Q_bW^kJ_bS\|_{\mathrm{HS}}^2,\qquad
\epsilon=\sqrt{L_N}.
\end{aligned}
$$

这里的 $k$ 为整数；$P_b,Q_b\in M_{2d}(\mathbb C)$ 是正交投影，$J_b^*J_b=I_d$，且 $\|S\|_{\mathrm{HS}}^2=\Tr\sigma=1$。$L_N$ 使用同一个 $W,\sigma$ 在两个分支上从第零步到第 $N$ 步的**实际加权历史**，不是单步泄漏、各时刻另选实现，或某个无权算子范数。对每组上述数据，存在原 $\mathbb C^d$ 上的酉矩阵 $A_0,A_1$，选定后对所有整数 $0\le n\le N$ 同时满足

$$
\max_{\substack{b\in\{0,1\}\\0\le n\le N}}
\|W^nJ_bS-J_bA_b^nS\|_{\mathrm{HS}}
\le4N\sqrt{L_N}.
$$

常数 $4$ 与 $d,N,W,\sigma$ 无关；这里不声称它最优。以下给出完整推导。

**压缩与一次极补全。** 固定任一分支 $b\in\{0,1\}$，简写 $J=J_b,P=P_b,Q=Q_b$，并在原有空间上定义

$$
\begin{aligned}
K&=J^*WJ\in M_d(\mathbb C),&
R&=QWJ\in M_{2d\times d}(\mathbb C),\\
B&=J^*WQ\in M_{d\times2d}(\mathbb C),&
E&=QWQ\in M_{2d}(\mathbb C).
\end{aligned}
$$

$J$ 为等距嵌入，$Q$ 为正交投影，$W$ 酉，所以 $K,R,B,E$ 的算子范数均不超过一。尤其 $B,E$ 左乘任意列数相容的矩阵时，希尔伯特—施密特范数不会增大：这是逐列应用向量收缩后求平方和。直接分块计算给出

$$
\begin{aligned}
K^*K+R^*R
&=J^*W^*(P+Q)WJ\\
&=J^*W^*WJ=I_d.
\end{aligned}
$$

有限维方阵的极分解可在奇异情形下补全为

$$
K=AH,\qquad A^*A=AA^*=I_d,\qquad
H=(K^*K)^{1/2},\qquad 0\le H\le I_d.
$$

这里 $A,H\in M_d(\mathbb C)$；$H$ 的每个特征值 $h$ 非负，且 $h^2\le1$，所以 $h\in[0,1]$。$A$ 仅从固定的 $K$ 选取一次。静态极分解的文献依据是 Higham，*Computing the Polar Decomposition—with Applications*，DOI [10.1137/0907079](https://doi.org/10.1137/0907079)，[全文](https://eprints.maths.manchester.ac.uk/694/1/high86p.pdf)，Theorem 1.1 与 Lemma 2.1；它们供应方阵酉补全及正平方根的识别，不供应下面的加权历史界。

**任意矩形权重上的极误差。** 在 $H$ 的酉特征基中，$2H(I_d-H)$ 的特征值为 $2h(1-h)\ge0$，故

$$
D:=(I_d-H^2)-(I_d-H)^2=2H(I_d-H)\ge0.
$$

对每个自然数 $r$ 和每个矩形矩阵 $X\in M_{d\times r}(\mathbb C)$，合同变换给出 $X^*DX\ge0$，其迹非负（等于各列 $x_j$ 的非负二次型 $\sum_j x_j^*Dx_j$）。因此，不要求 $X$ 与 $H$ 交换，便有

$$
\begin{aligned}
\|(K-A)X\|_{\mathrm{HS}}^2
&=\Tr\bigl(X^*(I_d-H)^2X\bigr)\\
&\le\Tr\bigl(X^*(I_d-H^2)X\bigr)\\
&=\Tr(X^*R^*RX)=\|RX\|_{\mathrm{HS}}^2.
\end{aligned}
$$

第一式用了 $K-A=A(H-I_d)$ 与 $A^*A=I_d$，末式用了 $I_d-H^2=R^*R$。这里取迹的半正定矩阵均给出实数。特别地，对 $T_k=J^*W^kJ\in M_d(\mathbb C)$ 代入实际权重 $X=T_kS$，由 $S^2=\sigma$ 与迹循环性，

$$
\begin{aligned}
\|(K-A)T_kS\|_{\mathrm{HS}}^2
&=\Tr\bigl(\sigma T_k^*(I_d-H)^2T_k\bigr)\\
&\le\Tr\bigl(\sigma T_k^*(I_d-H^2)T_k\bigr)\\
&=\|RT_kS\|_{\mathrm{HS}}^2.
\end{aligned}
$$

这是先作半正定合同变换再取迹的比较；只循环移动迹内因子，没有交换 $\sigma,T_k,H$，也没有除以 $\sigma$ 的特征值。

**实际轨迹的递推。** 对所有整数 $0\le k\le N$ 定义

$$
\begin{aligned}
x_k&=J^*W^kJS=T_kS\in M_d(\mathbb C),\\
y_k&=QW^kJS\in M_{2d\times d}(\mathbb C),\\
W^kJS&=Jx_k+y_k,\qquad Qy_k=y_k,\\
x_0&=S,\qquad y_0=0,\qquad
\|y_k\|_{\mathrm{HS}}\le\epsilon.
\end{aligned}
$$

对该分解施加同一个 $W$，再分别投影，对所有整数 $0\le k<N$ 得到

$$
\begin{aligned}
x_{k+1}&=Kx_k+By_k,\\
y_{k+1}&=Rx_k+Ey_k,\\
\|Rx_k\|_{\mathrm{HS}}
&=\|y_{k+1}-Ey_k\|_{\mathrm{HS}}\\
&\le\|y_{k+1}\|_{\mathrm{HS}}+\|y_k\|_{\mathrm{HS}}
\le2\epsilon.
\end{aligned}
$$

令 $r_k=x_{k+1}-Ax_k\in M_d(\mathbb C)$。把前面的矩形比较用于实际的 $X=x_k$，再利用 $B$ 的收缩性，便有

$$
\begin{aligned}
r_k&=(K-A)x_k+By_k,\\
\|r_k\|_{\mathrm{HS}}
&\le\|(K-A)x_k\|_{\mathrm{HS}}+\|By_k\|_{\mathrm{HS}}\\
&\le\|Rx_k\|_{\mathrm{HS}}+\|y_k\|_{\mathrm{HS}}
\le3\epsilon.
\end{aligned}
$$

**固定酉矩阵的加法望远镜。** 固定整数 $1\le n\le N$，令 $f(k)=A^{n-k}x_k$（$0\le k\le n$）。对 $k<n$，

$$
\begin{aligned}
f(k+1)-f(k)&=A^{n-1-k}(x_{k+1}-Ax_k)
=A^{n-1-k}r_k,\\
x_n-A^nS&=f(n)-f(0)
=\sum_{k=0}^{n-1}A^{n-1-k}r_k,\\
\|x_n-A^nS\|_{\mathrm{HS}}
&\le\sum_{k=0}^{n-1}\|r_k\|_{\mathrm{HS}}
\le3n\epsilon.
\end{aligned}
$$

这里只把矩阵的连续差在加法群中相加，并用酉左乘保持希尔伯特—施密特范数。最后由 $J$ 的等距性与三角不等式，

$$
\begin{aligned}
\|W^nJS-JA^nS\|_{\mathrm{HS}}
&=\|J(x_n-A^nS)+y_n\|_{\mathrm{HS}}\\
&\le3n\epsilon+\epsilon=(3n+1)\epsilon\\
&\le4N\epsilon\qquad(1\le n\le N).
\end{aligned}
$$

最后一步用了 $3n+1\le3N+1\le4N$；$n=0$ 时误差直接为零。对两个分支独立选取各自的极补全 $A_0,A_1$，并共用 $\epsilon=\sqrt{L_N}$，即得到所述最大值界。

**适用范围与尚存边界。** $L_N=0$ 时全部误差精确为零；论证没有除以 $\epsilon$。秩亏的 $\sigma$ 以及正特征值任意接近零的 $\sigma$ 都包含在内：只使用 $S=\sqrt\sigma$，不使用逆、满秩或谱隙。环境始终为原 $\mathbb C^d$，没有纯化、增维、重置、干预或随时间变化的 $A_b$，也不假设后续联合态因子化。压缩 $K$ 无需正规；不把 $T_k$ 认作 $K^k$，漏出后返回的部分由实际 $y_k$ 保留。

已有来源中的静态极补全与半正定迹正性是可复用供应，不在这里重新计作新数学。完整结果的 Lean 形式化证明尚未经验证；上述普通推导不构成 Lean 验证。这个历史接口也没有给出相对于目标去相位信道的 diamond 范数或任意有限未触碰参考的一致定量比较，没有给出实际可实现共同幂频率历史的定量下界与上构造。一般窗口的完整资源—误差权衡仍开放；这里不选择或证明后继事件，不作全球新颖性或物理普适性声明。

### 完整资源问题尚缺什么

为明确上述“完整资源—误差权衡”的对象，固定任意实数 $-1<\lambda<1$ 与整数 $d,N\ge1$。令 $\mathcal D_\mu(X)$ 保持 $X\in M_2(\mathbb C)$ 的对角元，并把两个非对角元乘以实数 $\mu$。同一环境只初始制备一次，初始独立于输入，所有时刻使用同一个 $W\in U(2d)$ 与同一个半正定单位迹 $\sigma\in M_d(\mathbb C)$；没有重置或中间干预。结果说明保留的目标量是

$$
\begin{aligned}
\Psi_n^{W,\sigma}(X)
&=\Tr_E\bigl(W^n(X\otimes\sigma)W^{*n}\bigr),\\
\Delta_{d,N}(\lambda)
&=\inf_{\substack{W\in U(2d)\\\sigma\ge0,\ \Tr\sigma=1}}
\max_{0\le n\le N}
\|\Psi_n^{W,\sigma}-\mathcal D_{\lambda^n}\|_\diamond.
\end{aligned}
$$

其中 $n$ 取整数，第零幂为恒等；对线性映射 $\Lambda:M_2(\mathbb C)\to M_2(\mathbb C)$，$\|\Lambda\|_\diamond=\sup_{s\ge1}\sup_{0\ne Z\in M_{2s}(\mathbb C)}\|(\Lambda\otimes\operatorname{id}_{M_s})(Z)\|_1/\|Z\|_1$，$s$ 为正整数，$\|Z\|_1=\Tr\sqrt{Z^*Z}$，参考不受演化触碰。这一范数约定使用全迹范数，不含半迹距离的因子。取下确界的量词是先选一组 $W,\sigma$ 再取整个窗口的最大值，不能拼接各时刻分别达到的最优实现。

C4 保存了从实际泄漏到固定分支共同幂的局部接口。它没有建立原实际信道、分支共同幂信道与目标 $\mathcal D_{\lambda^n}$ 之间对所有输入和任意有限参考一致的定量误差传递，也没有为实际可实现的共同幂迹频率历史给出定量障碍与匹配上构造。一般标量频率拟合或求积规则不自动满足同一 $d$ 维环境内两套酉矩阵及同一初态的相容性；不能把它们的最优误差直接当作 $\Delta_{d,N}(\lambda)$。一般紧致性或多项式 Hölder 存在性是既有方法供应，不能仅因没有明确常数就当作新的数学内容。本节不给出该目标量的新界，不增加锐性问题。

### 形式边界与接续状态

完整 C4 事件没有保留精确 Lean 证明，没有已接受的完整公理闭包；`proof_shape` 仍为 `unknown`，准入依据未建立。待核对的完整形式对应包括谱多项式的半正定比较、算子收缩作用于希尔伯特—施密特范数的混合范数事实及其全量词组合。缺少这些精确应用证据既不证明有新数学内容，也不证明完整事件必为纯供应组合。

已结束的 [#31078 结论记录](https://github.com/the-omega-institute/trureturing/issues/31078#issuecomment-6904103065)保持唯一终态 `unresolved`；原事件、预测及截止时间不变。其普通 C4 数学问题已有完整答案，不再为它安排新的实质求解。本节没有选择后继事件。未来若研究完整资源问题，须由负责选择的一方先核对来源与重复成果，说明剩余定量推论为何未被供应，再完成事前筛查；本节不作通过筛查的承诺。书面解释、完整形式证据、准入与持续研究目标分别记账，本次片段交付不表示持续研究目标完成。

## 最大混合初态的饱和矩容量障碍

本节保存最大混合初态下的一个明确不可达参数及完整普通证明。它对应[第四章中文注记](../../books/quantum-geometry/zh/ch04-s02-quantum-noise.md#rem-maxmixed-saturation-obstruction)与[英文注记](../../books/quantum-geometry/en/ch04-s02-quantum-noise.md#rem-maxmixed-saturation-obstruction)，与任意密度必要界、二级环境三步构造及实际加权历史接口分别保留适用范围。

**普通书面推导，未在本书形式化。** 前面的维数必要界允许样本数恰好达到矩阵空间的维数，却不保证这个边界可达。直观的障碍是容量：接近一的一阶矩要求几乎全部概率挤进单位圆上一段很短的弧；饱和的矩条件却使这段弧至多容纳两个节点，而最大混合初态又限制每个节点能承载的概率。下面从[原始结果及其边界](https://github.com/the-omega-institute/trureturing/issues/31099#issuecomment-6904917000)完整展开这个有限维论证。

**对象与要排除的饱和条件。** 固定整数 $d\ge2$、实数 $0<r<1$，令 $m=d^2$。任取两套作用于同一个 $\mathbb C^d$ 的酉矩阵 $A,B\in U(d)$，不要求它们交换。定义共同幂的归一化迹序列，并暂设它匹配到饱和窗口：

$$
f_n=\frac1d\operatorname{Tr}(A^nB^{-n})=r^n
\qquad(0\le n\le m-1).
$$

这里及下文的步数均为整数。目标是给出该条件的必要不等式，并据此排除一个明确参数；不是判定全部窗口的最优维数。

**谱权重与支集不能先行混淆。** 分别作酉谱分解，允许重复特征值：

$$
\begin{aligned}
A&=V\operatorname{diag}(a_0,\ldots,a_{d-1})V^*,\\
B&=W\operatorname{diag}(b_0,\ldots,b_{d-1})W^*,\qquad U=V^*W,\\
z_{ij}&=a_i\overline{b_j},\qquad |z_{ij}|=1,\\
w_{ij}&=\frac{|U_{ij}|^2}{d},\qquad
0\le w_{ij}\le\frac1d,\qquad
\sum_{i,j=0}^{d-1}w_{ij}=1,\\
\mu&=\sum_{i,j=0}^{d-1}w_{ij}\delta_{z_{ij}},\qquad
f_n=\int z^n\,\mathrm d\mu(z).
\end{aligned}
$$

星号表示共轭转置，$\delta_z$ 是节点 $z$ 上的单位点质量。迹的展开给出最后一式；酉矩阵每行的模平方和为一，给出权重总和与单项上界。因此 $\mu$ 是至多有 $m$ 个支集点的正概率测度。但此时若若干比值重合，合并后的单点质量可能超过 $1/d$；必须先证明这些比值确实互异，才能使用节点容量。由于权重实且非负，负次矩由共轭确定：

$$
\int z^q\,\mathrm d\mu(z)=r^{|q|}
\qquad(-(m-1)\le q\le m-1).
$$

**饱和迫使全部节点出现且互异。** 在多项式上使用测度诱导的半正定配对 $\langle p,q\rangle_\mu=\int\overline{p(z)}q(z)\,\mathrm d\mu(z)$。单项式的 Gram 矩阵为

$$
T_{jk}=\langle z^j,z^k\rangle_\mu=r^{|j-k|}
\qquad(0\le j,k\le m-1).
$$

把基改成常数 $1$ 与 $g_k(z)=z^k-rz^{k-1}$（$1\le k\le m-1$）。这是首项系数均为一的三角换基。直接用已知矩计算，

$$
\begin{aligned}
\langle1,g_k\rangle_\mu&=r^k-r\,r^{k-1}=0,\\
\langle g_j,g_k\rangle_\mu
&=r^{k-j}-r\,r^{k-j-1}-r\,r^{k-j+1}
+r^2r^{k-j}=0\quad(1\le j<k\le m-1),\\
\|1\|_\mu^2&=1,\qquad
\|g_k\|_\mu^2=1-2r^2+r^2=1-r^2>0.
\end{aligned}
$$

所以 $T$ 正定且秩为 $m$。若合并并删去零质量后只有 $K$ 个支集点，Gram 矩阵经这些点上的取值映射分解，秩至多为 $K$。故 $m\le K\le m$。原来总共只有 $m$ 个索引对，因而每个 $w_{ij}>0$，所有 $z_{ij}$ 两两不同。此后每个节点的实际质量就是原来的 $w_{ij}\le1/d$。重复特征值或零重叠权重并非隐藏的例外：它们会减少支集，已被满秩条件排除。

**节点多项式只需已有阶数的矩。** 将这 $m$ 个节点记为 $\zeta_1,\ldots,\zeta_m$，定义首一消去多项式及线性泛函：

$$
\begin{aligned}
P(z)&=\prod_{\ell=1}^{m}(z-\zeta_\ell),\\
L_k(F)&=\int z^{-k}F(z)\,\mathrm d\mu(z)
\qquad(1\le k\le m-1,\ \deg F\le m).
\end{aligned}
$$

因为 $P$ 在支集上为零，所有 $L_k(P)=0$。这些泛函在 $\operatorname{span}(z,\ldots,z^{m-1})$ 上的矩阵，是 $T$ 对应的正定主子矩阵，故联合秩为 $m-1$。次数至多 $m$ 的多项式空间维数为 $m+1$，所以公共核恰为二维。以下两个线性无关多项式都在核中：

$$
\begin{aligned}
Q(z)&=z^m-rz^{m-1},\qquad R(z)=1-rz,\\
L_k(Q)&=r^{m-k}-r\,r^{m-1-k}=0,\\
L_k(R)&=r^k-r\,r^{k-1}=0
\qquad(1\le k\le m-1).
\end{aligned}
$$

它们因次数不同而线性无关。比较首项系数，得到 $P=Q+cR$；由于全部根的模为一，常数项满足 $|c|=|P(0)|=\prod_{\ell=1}^m|\zeta_\ell|=1$。于是每个节点都满足

$$
z^{m-1}\frac{z-r}{1-rz}=\tau,\qquad
\tau=-c,\qquad |\tau|=1.
$$

分母不会为零，因为 $|rz|=r<1$。尤其，虽然 $Q$ 的次数为 $m$，在 $L_k(Q)$ 中最高的矩阶数只有 $m-1$；这里没有偷用第 $m$ 阶或更高矩。

**短闭弧至多容纳两个节点。** 取

$$
\theta=\frac{\pi}{2(m-1)},\qquad
\mathcal A_\theta=\{e^{\mathrm it}: -\theta\le t\le\theta\}.
$$

在这段弧上可选择如下连续辐角；半角公式直接验证其指数等于对应的分式：

$$
\begin{aligned}
\beta(t)&=2\arctan\left(\frac{1+r}{1-r}\tan\frac t2\right),\\
e^{\mathrm i\beta(t)}&=\frac{e^{\mathrm it}-r}{1-re^{\mathrm it}},\\
\beta'(t)&=\frac{1-r^2}{1-2r\cos t+r^2}>0
\qquad(-\theta\le t\le\theta).
\end{aligned}
$$

由于 $d\ge2$，整段弧严格位于 $-\pi<t<\pi$，所用正切连续。实反正切的取值严格介于 $-\pi/2$ 与 $\pi/2$，故 $\beta(\theta)-\beta(-\theta)<2\pi$。令 $h(t)=(m-1)t+\beta(t)$，则

$$
\begin{aligned}
h'(t)&=m-1+\beta'(t)>0,\\
h(\theta)-h(-\theta)
&=2(m-1)\theta+\beta(\theta)-\beta(-\theta)<3\pi.
\end{aligned}
$$

固定任意一个 $\tau$ 的辐角 $\alpha$，节点方程就是 $h(t)=\alpha+2\pi k$，其中 $k\in\mathbb Z$。严格递增性使不同节点对应不同整数。若有三个节点，最左与最右的相位至少相差 $4\pi$，与刚才的变化量上界矛盾。这也包含弧的两个端点。因此

$$
\mu(\mathcal A_\theta)\le\frac2d,\qquad
\mu(\mathbb T\setminus\mathcal A_\theta)\ge1-\frac2d,
\qquad \mathbb T=\{z\in\mathbb C:|z|=1\}.
$$

**容量必要不等式与精确反例。** 在弧外，$1-\operatorname{Re}z\ge1-\cos\theta$；在整圆上这个被积函数非负。一阶矩给出

$$
\begin{aligned}
1-r&=\int(1-\operatorname{Re}z)\,\mathrm d\mu(z)\\
&\ge\left(1-\frac2d\right)(1-\cos\theta)\\
&=\left(1-\frac2d\right)
\left(1-\cos\frac{\pi}{2(d^2-1)}\right).
\end{aligned}
$$

这对每个 $d\ge3$ 都是最大混合饱和实现的非平凡必要条件。取 $d=3$、$r=999/1000$，此时 $m=9$、$\theta=\pi/16$。正弦在 $[0,\pi/2]$ 上的凹性意味着它不低于连接两个端点的弦，即 $\sin x\ge2x/\pi$。所以

$$
\begin{aligned}
\sin\frac{\pi}{32}&\ge\frac1{16},\\
1-\cos\frac{\pi}{16}
&=2\sin^2\frac{\pi}{32}\ge\frac1{128},\\
1-r&\ge\frac13\cdot\frac1{128}=\frac1{384},\\
1-r&=\frac1{1000}<\frac1{384}.
\end{aligned}
$$

矛盾。也可以把同一计算直接读成装不下的质量：

$$
\begin{aligned}
\mu(\mathcal A_{\pi/16})
&\ge1-\frac{1-r}{1-\cos(\pi/16)}
\ge1-\frac{128}{1000}=\frac{109}{125},\\
\frac{109}{125}-\frac23&=\frac{77}{375}>0.
\end{aligned}
$$

因此不存在一对 $A,B\in U(3)$ 同时满足 $f_n=r^n$（$0\le n\le8$）。这是对所有酉矩阵对的排除，包含非交换情形；不是某种设参形式或数值优化失败。它甚至未使用谱比值网格及酉矩阵模平方权重所带来的全部相容性限制。

**零参数、负参数与二级环境。** 将 $A$ 换成 $-A$ 会使 $f_n$ 变成 $(-1)^nf_n$，因而同维参数 $r=-999/1000$ 也不可能。零参数则有完全不同的边界：对每个正整数 $d$ 都能实现饱和窗口。令

$$
\begin{aligned}
m&=d^2,\qquad \omega=e^{2\pi\mathrm i/m},\\
a_i&=\omega^i,\qquad b_j=\omega^{-dj},\\
F_{ij}&=\frac1{\sqrt d}e^{2\pi\mathrm i\,ij/d}
\qquad(0\le i,j<d),\\
A&=\operatorname{diag}(a_0,\ldots,a_{d-1}),\qquad
B=F\operatorname{diag}(b_0,\ldots,b_{d-1})F^*.
\end{aligned}
$$

有限等比求和给出 Fourier 矩阵 $F$ 的列正交，故它酉。相对本征基的模平方都为 $1/d$，于是每个权重为 $1/d^2=1/m$。比值 $a_i\overline{b_j}=\omega^{i+dj}$ 恰遍历全部 $m$ 次单位根；对 $d=1$ 也成立，只是窗口没有正步数。因此

$$
f_0=1,\qquad
f_n=\frac1m\sum_{q=0}^{m-1}\omega^{qn}=0
\qquad(1\le n\le m-1).
$$

零参数的第零幂约定为一。对 $d=2$，容量不等式右端因 $1-2/d=0$ 而退为平凡界，与已有的最大混合二级环境三步构造相容；这里不重复其证明。

**从迹矩到实际信道，以及反向归约。** 为避免与上面的本征基矩阵混淆，把联合酉记为 $\mathcal W$。设系统为 $\mathbb C^2$，环境初态固定为 $\sigma=I_d/d$ 且初始独立于输入。对受控联合酉及系统矩阵单位定义

$$
\begin{aligned}
E_{ab}&=|a\rangle\langle b|\quad(a,b\in\{0,1\}),\\
\mathcal W&=E_{00}\otimes A+E_{11}\otimes B,\\
\Psi_n(X)&=\operatorname{Tr}_E\bigl(\mathcal W^n(X\otimes I_d/d)\mathcal W^{*n}\bigr),\\
\Psi_n(E_{00})&=E_{00},\qquad \Psi_n(E_{11})=E_{11},\\
\Psi_n(E_{01})&=f_nE_{01},\qquad
\Psi_n(E_{10})=\overline{f_n}E_{10}.
\end{aligned}
$$

两个对角系数均为单位迹一；非对角式直接来自环境偏迹。矩阵单位构成所有系统矩阵的线性基，所以这些式子确定整个映射。对任意有限未触碰参考 $R$，将任意系统—参考矩阵写成 $Y=\sum_{a,b=0}^1E_{ab}\otimes Y_{ab}$；每个参考块 $Y_{ab}$ 保持原样，系统块逐项乘以上述系数。这包含系统与参考初始纠缠的情形，但环境仍须与整个输入独立。采用标准张量换序后，实际共同演化在系统—环境上作用，在参考上为恒等。

反过来，这个最大混合排除不只是预设受控形式的限制。把任意联合酉写成系统的二乘二环境分块 $\mathcal W=(C_{ab})_{a,b=0}^1$。若一步映射精确保持两个基态投影，错误布居为

$$
\begin{aligned}
0&=\langle1,\Psi_1(E_{00})1\rangle
=\frac1d\operatorname{Tr}(C_{10}C_{10}^*)
=\frac1d\|C_{10}\|_{\mathrm{HS}}^2,\\
0&=\langle0,\Psi_1(E_{11})0\rangle
=\frac1d\operatorname{Tr}(C_{01}C_{01}^*)
=\frac1d\|C_{01}\|_{\mathrm{HS}}^2.
\end{aligned}
$$

希尔伯特—施密特范数平方是各矩阵元模平方之和，因此 $C_{10}=C_{01}=0$。再由联合酉性得 $C_{00},C_{11}$ 都酉，故它们就是某一对 $A,B$。最大混合态的满秩性使零泄漏约束作用于整个环境空间。因此，若同一个三维最大混合环境的实际信道要在 $0\le n\le8$ 对所有输入实现参数 $r=999/1000$ 的去相位幂，上面的反例已在 $E_{01}$ 上排除了它；增加未触碰参考不会恢复可行性。

**适用边界。** 全过程只用同一个联合酉和一次初始制备，没有环境重置、替换、增维、时变控制或中间干预，也没有假设后续系统—环境态重新因子化。一般初始密度 $\sigma$ 的谱展开系数为 $\operatorname{Tr}(P_i\sigma Q_j)$，其中 $P_i,Q_j$ 分别为两套酉的谱投影；这些系数可能为复数，不具有这里的正概率解释或单节点容量。因此本注记没有反驳允许任意初始密度时的维数可达性主张。所给不等式只是必要条件，未证明充分性或最优性；它不完成一般窗口的可行性分类，不提供近似误差下界，也不确定完整联合态历史或中间干预的规律。

圆周正交多项式提供相邻的经典框架，可参见 Barry Simon，[arXiv:math/0405111](https://arxiv.org/abs/math/0405111) §1 的递推与 §2.1(c) 的 Bernstein–Szegő 情形；这些段落不作为本注记完整受限实现障碍的来源定理。所需节点、相位与容量证明均已在这里给出，不作全球新颖性或物理普适性声明。完整结论尚无本书可引用的完整 Lean 证明；普通推导不构成内核验证。

### 来源与形式边界

直接数学来源是 [trureturing #31099 的完整普通结果评论](https://github.com/the-omega-institute/trureturing/issues/31099#issuecomment-6904917000)。其中最大混合饱和矩条件、单点容量、节点相位论证、精确反例及受限边界由本节逐项展开。Simon 的原文 §1 与 §2.1(c) 只提供相邻的 OPUC 与 Bernstein–Szegő 框架；本节不把该文归因为完整受限信道不可达结论，也不由有限来源核对声称文献穷尽或全球原创。

本文件“最大混合环境的有限前缀维数障碍”说明满秩初态下一步基态投影保持如何迫使实际联合酉受控；上文再次写出了零泄漏分块计算。本文件“任意密度的二态手工应用与剩余边界”及[相应正文](../../books/quantum-geometry/zh/ch04-s02-quantum-noise.md#rem-arbitrary-density-prefix)保留复权重 Prony 必要界；它们不把任意密度变成这里的正概率测度。“混合量子比特环境的三步构造”提供二级边界的已有见证；“三能级环境的四步共同构造”提供另一窗口的见证，均不被本节扩张为一般饱和可达性。

完整形式事件 [#31099](https://github.com/the-omega-institute/trureturing/issues/31099) 的唯一终态为 `unresolved`。这个普通数学反例不改变该形式结算，也不将其计为形式否定。完整精确 Lean 证明、完整公理闭包核验、证明形状及准入依据均未由本节提供。这里没有新增定理、冻结声明或验证身份。任意初始密度下的一般最小维数、一般相容迹矩的实现与定量近似资源问题继续保留其原有边界。
