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
