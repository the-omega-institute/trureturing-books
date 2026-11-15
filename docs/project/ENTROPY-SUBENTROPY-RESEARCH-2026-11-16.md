# 熵、subentropy 与本书几何图景的研究

研究日期：2026-11-16。书库基线为 `2b5d975a2378cf6c2cc01d66ca814ca967dac5a9`，所钉 trureturing 为 `ccaf12043b8eaa43581decc99f584528f3564871`。以下统一用自然对数，单位为奈特；转换为比特须除以 $\ln 2$。

这是一份研究笔记：区分所钉库已有的冻结结果、原始文献结果与本轮手工推导。未修改书稿或锁文件，未新增 Lean 声明，未进行新的 Lean 编译；冻结身份来自确切钉版的源码与 `Golden/Frozen/state`。本轮不是全书内容审查或出版验收。

关于闭环相位、相干态路径积分及极小原胞的进一步比较，见[Subentropy、路径积分与极小圆弧](SUBENTROPY-PATH-INTEGRALS-AND-ARCS-2026-11-16.md)。

**主要判断：subentropy 可以把“两子丈量—外积面积—跨球纠缠”连成精确的信息几何。** 冯·诺依曼熵与 subentropy 都可以由同一份行列式体积信息表达；后者还等于随机测量基下的平均读数熵扣除纯态基线。对双体纯态，边缘 subentropy 又恰好是独立局部随机测量的联合读数熵相对于直积纯态的增量。这些联系有既有文献，不作新颖性主张。

## 1. 从 trureturing 的定义出发：同一个体积函数的两种读法

有限维密度算符满足 $\rho\ge0$、$\operatorname{Tr}\rho=1$。所钉库的 `VonNeumannEntropyPinching.vonNeumannEntropy` 定义

$$
S(\rho)=-\operatorname{Tr}(\rho\ln\rho),
$$

零本征值项按 $0\ln0=0$ 处理。`Subentropy/Basic.subentropy` 则通过底层矩阵定义

$$
Q(\rho)=\int_0^\infty\left[
\frac{t}{1+t}-\frac{1}{\det(I+\rho/t)}
\right]dt.
$$

Lean 对任意复矩阵的核取行列式实部；这里限定 $\rho\ge0$、$t>0$，行列式为正实数，因此上式与该定义一致。一般矩阵上的代数不变性不能自动赋予该矩阵物理熵的含义。核的可积性与密度态域上的连续性已有冻结证明。

令

$$
R_\rho(t):=\frac{\det(I+\rho/t)}{1+1/t}\ge1,\qquad t>0.
$$

分母是任意迹一纯态的行列式。对所有有限维密度态，包含零与重复本征值，有

$$
\boxed{\begin{aligned}
S(\rho)&=\int_0^\infty\ln R_\rho(t)\,dt,\\
Q(\rho)&=\int_0^\infty\frac{t}{1+t}\left(1-R_\rho(t)^{-1}\right)dt.
\end{aligned}}
$$

这是 Jozsa–Mitchison（2014）第 2 节、式 (13)–(14) 在迹一情形的改写。手算验证第一式：把对数展开为 $\sum_i\ln(1+\lambda_i/t)-\ln(1+1/t)$，在有限区间积分后用 $\sum_i\lambda_i=1$ 消去无穷远项，余下 $-\sum_i\lambda_i\ln\lambda_i$。第二式直接改写定义。$R\ge1$ 来自行列式展开的非负高阶项。

因此 $S$ 与 $Q$ 共用同一份体积数据，却以不同函数累计：$S$ 使用 $\ln R$，$Q$ 使用带权的 $1-1/R$。由 $0\le1-R^{-1}\le\ln R$ 与 $0<t/(1+t)<1$，立即得到 $0\le Q\le S$。这里是文献公式的手工应用，没有另增一条 Lean 验证声明。

## 2. 行列式里的“线、面、体”究竟是什么

设纯态系综

$$
\rho=\sum_{a=1}^m p_a|\psi_a\rangle\langle\psi_a|,
\qquad p_a\ge0,\quad\sum_a p_a=1,\quad\|\psi_a\|=1.
$$

把 $\sqrt{p_a}\psi_a$ 排成矩阵 $V$ 的列，则 $\rho=VV^\dagger$；加权 Gram 矩阵是 $G=V^\dagger V$，其条目为 $\sqrt{p_ap_b}\langle\psi_a|\psi_b\rangle$。所钉库已经证明

$$
\det(I+sVV^\dagger)=\det(I+sV^\dagger V),\qquad Q(VV^\dagger)=Q(V^\dagger V).
$$

后一个等式用的是定义于矩阵上的 `matrixSubentropy_rectangular_gram`。所以可以直接从两子复内积组成的 Gram 数据计算 $Q$，不需要增设外部绝对坐标。

再展开

$$
\det(I+s\rho)=1+s+e_2(\rho)s^2+\cdots+e_d(\rho)s^d.
$$

各系数是加权外积体积平方之和：

$$
e_k(\rho)=\sum_{a_1<\cdots<a_k}
p_{a_1}\cdots p_{a_k}
\|\psi_{a_1}\wedge\cdots\wedge\psi_{a_k}\|^2.
$$

这里的外积位于**复希尔伯特空间的外代数**；其平方范数等于对应 Gram 行列式。它不能直接等同于两根布洛赫箭头在实三维空间中的外积。该体积表达已有 Mitchison–Jozsa（2003）第 3 节、式 (9) 的来源。

特别地，$e_1=1$ 固定总权重，$e_2=(1-\operatorname{Tr}\rho^2)/2$ 记录加权二阶面积；更高阶 $e_k$ 记录不能由二阶面积总量替代的体积数据。若两个态在补零后的同一维数上满足所有 $e_k(\rho)\ge e_k(\sigma)$（$k\ge2$），其行列式逐点有序，上节公式立即给出 $S(\rho)\ge S(\sigma)$ 与 $Q(\rho)\ge Q(\sigma)$。这也是既有对称多项式理论的应用。

### 两态与三态的差别

对两纯态的混合 $p|a\rangle\langle a|+(1-p)|b\rangle\langle b|$，非零谱至多有两个，唯一高阶系数为

$$
e_2=p(1-p)(1-|\langle a|b\rangle|^2).
$$

相融度越低，加权外积面积越大，$S$、$Q$ 都增大。单比特中若两根纯态布洛赫箭头夹角为 $\beta$，则 $1-|\langle a|b\rangle|^2=\sin^2(\beta/2)$；这里必须保留半角。

三个或更多态不能只看每对 Born 模平方。取三个等权态，其未加权 Gram 矩阵分别为

$$
A_+=\begin{pmatrix}1&1/2&1/2\\1/2&1&1/2\\1/2&1/2&1\end{pmatrix},\qquad
A_-=\begin{pmatrix}1&1/2&1/2\\1/2&1&-1/2\\1/2&-1/2&1\end{pmatrix}.
$$

两者均半正定，都能由归一化纯态实现；所有不同态之间的 Born 权重都为 $1/4$，混合态纯度也都为 $1/2$。但对应密度态的谱分别为 $(2/3,1/6,1/6)$ 与 $(1/2,1/2,0)$，故

$$
e_3^+=1/54,\quad e_3^-=0,\qquad
Q_+\approx0.204299486>Q_-\approx0.193147181.
$$

丢掉的信息是规范不变的三态闭合相位：$\langle a|b\rangle\langle b|c\rangle\langle c|a\rangle$ 在两个例子中异号。完整的复内积 Gram 数据足够；只保存两子丈量的模平方就不够。这个例子也排除了“任意维 $Q$ 只是纯度的另一种写法”。

## 3. 随机视向：subentropy 是平均读数熵减去纯态基线

取复空间上的秩一完备正交测量基 $B$，记 $p_j^B=\operatorname{Tr}(\rho P_j^B)$，$H_B=-\sum_jp_j^B\ln p_j^B$。按归一化 $U(d)$ Haar 测度选择基，令 $C_d=\sum_{k=2}^d1/k$，则

$$
\boxed{\mathbb E_B H_B=C_d+Q(\rho).}
$$

这是 Datta 等（2014）式 (2)，其单纯形表达为式 (4)。每个纯态的平均读数熵都是 $C_d$；$Q$ 正是相对于这份纯态基线的额外读数分散。已知态的匹配测量可以确定，并不意味着其所有测量方向都确定。

秩一基的极值与平均应分开：

$$
\min_B H_B=S(\rho),\qquad
\mathbb E_B H_B=C_d+Q(\rho),\qquad
\max_B H_B=\ln d.
$$

最小值由本征基取得；最大值可用与本征基相互无偏的 Fourier 基取得。这里平均的是**给定所选基的条件读数熵**。先平均概率再取熵得到的是 $\ln d$，会失去 $Q$ 的状态依赖。实正交 Haar 测量的分布也不同，不能沿用同一个 $C_d$。

对本书第 8 章的秩一捏合 $\Delta_B\rho=\sum_jP_j^B\rho P_j^B$，$S(\Delta_B\rho)=H_B$，因此

$$
\boxed{\mathbb E_B[S(\Delta_B\rho)-S(\rho)]
=C_d+Q(\rho)-S(\rho).}
$$

配合每个基的捏合恒等式，左端也等于平均相干擦除相对熵 $\mathbb E_BD(\rho\|\Delta_B\rho)$。它**不是 $Q(\rho)$**。纯态的 $Q=0$，平均捏合熵增却为 $C_d$；最大混合态的 $Q=\ln d-C_d$，每个基的捏合熵增反而都是零。Datta 等的平均相对熵表达式 (6) 使用的也是另一对状态，不能混为这一熵增公式。

## 4. 单比特手算：与第 30 章施密特角共用一条径向坐标

写 $\rho=(I+\mathbf r\cdot\boldsymbol\sigma)/2$，$r=\|\mathbf r\|\in[0,1]$。沿单位方向 $\mathbf n$ 的两结果权重是 $(1\pm\mathbf r\cdot\mathbf n)/2$。固定 $\mathbf r$ 后，均匀球面方向的 $u=\cos\alpha$ 在 $[-1,1]$ 上均匀，于是

$$
Q(r)=\frac12\int_{-1}^1h\!\left(\frac{1+ru}{2}\right)du-\frac12,
\qquad h(p)=-p\ln p-(1-p)\ln(1-p).
$$

令 $a=(1+r)/2$、$b=(1-r)/2$，可直接积分得到

$$
Q(r)=-\frac{a^2\ln a-b^2\ln b}{r}\quad(0<r<1),\qquad
Q(0)=\ln2-\frac12,\quad Q(1)=0.
$$

这两个端点须用连续延拓或积分定义处理，不能直接代入有零分母的谱公式。又令 $\delta=\det\rho=(1-r^2)/4$，行列式定义变成正核

$$
Q(\delta)=\int_0^\infty\frac{\delta t}{(1+t)(t^2+t+\delta)}\,dt.
$$

每个被积函数对 $\delta\ge0$ 递增且凹，所以 $Q$ 也递增且凹。它不超过 $\delta/(1+t)^2$ 的积分；连接 $\delta=0,1/4$ 两端的弦给出下界。因此本轮手工推导得到

$$
\boxed{(\ln2-1/2)(1-r^2)\le Q(r)\le\frac{1-r^2}{4}.}
$$

在第 30 章的双体纯态 $|\psi(\theta)\rangle=\cos(\theta/2)|00\rangle+\sin(\theta/2)|11\rangle$ 中，$0\le\theta\le\pi/2$，边缘半径 $r=\cos\theta$、纠缠度 $\tau=\sin^2\theta=1-r^2$。所以

$$
(\ln2-1/2)\tau\le Q(\rho_A)\le\tau/4.
$$

这是单比特边缘、全局双体纯态的特例；一般混合全局态的 $1-r^2$ 不能解释成纠缠度。它也没有从熵推出第 30 章所选自指角的动力学优越性。

| 边缘半径 $r$ | $\tau=1-r^2$ | $S$ | $Q$ | 平均读数熵 $1/2+Q$ | 平均捏合熵增 $1/2+Q-S$ |
| ---: | ---: | ---: | ---: | ---: | ---: |
| $1$ | $0$ | $0$ | $0$ | $0.500000$ | $0.500000$ |
| $\theta^*\approx0.739085$ | $0.453753$ | $0.387255$ | $0.096107$ | $0.596107$ | $0.208852$ |
| $0.6$ | $0.64$ | $0.500402$ | $0.130724$ | $0.630724$ | $0.130322$ |
| $0$ | $1$ | $0.693147$ | $0.193147$ | $0.693147$ | $0$ |

表中自指点使用 $r=\cos\theta^*=\theta^*$，$\cos\theta^*=\theta^*$。其 $S\approx0.558691$ 比特、$Q\approx0.138653$ 比特；球心 $Q\approx0.278652$ 比特。

## 5. 最贴近“球外之球”的联系：局部随机读数的纯态纠缠增量

设 $|\Psi\rangle_{AB}$ 是有限维双体**纯态**，$\rho_A=\operatorname{Tr}_B|\Psi\rangle\langle\Psi|$。两边独立按各自完整复酉 Haar 测度选择秩一正交基，联合分布为 $p_{ij}=|\langle a_i b_j|\Psi\rangle|^2$。则

$$
\boxed{\mathbb E_{B_A,B_B}H(p_{ij})=C_{d_A}+C_{d_B}+Q(\rho_A).}
$$

透明的手工推导只需链式法则：$H(i,j)=H(i)+\sum_ip_iH(j|i)$。$A$ 边任意非零概率的秩一测量结果使 $B$ 条件态成为纯态，故再对 $B$ 基取平均，第二项恒为 $C_{d_B}$；第一项对 $A$ 基取平均是 $C_{d_A}+Q(\rho_A)$。零概率分支的贡献为零。

因此，**同一全局纯态的局部联合读数，相对于任意直积纯态多出的平均分散，精确等于边缘 subentropy**。Mintert–Życzkowski（2003/2004）用局部 Husimi 分布的 Wehrl 熵表达了这一结果，见式 (20)–(21)。边缘 $Q$ 是纯态纠缠的一个单调量；这不意味着把任意混合态的边缘 $Q$ 当作混态纠缠度。

以贝尔态为例，全局 $Q(\rho_{AB})=0$，边缘 $Q(\rho_A)=\ln2-1/2$。随机**全局**四维测量的平均熵是 $C_4=13/12$；两个独立随机**局部**二元测量的联合平均熵是 $1+Q(\rho_A)=\ln2+1/2$。两种平均的允许基集合不同，不能把 $U(4)$ Haar 平均替换成 $U(2)\times U(2)$。

从本书图景看，偏迹得到球心，并不意味着跨球联合读数没有结构：纠缠在局部随机联合读数的熵增量中留下可定量的痕迹。这个结论比把熵泛称为“被遮蔽的面积”更精确，因为它指定了全局纯态、测量集合、平均测度与参照基线。

## 6. 信息的操作意义及其边界

对任意纯态系综 $\{p_x,|\psi_x\rangle\}$，平均态为 $\rho$。测量基 $B$ 随机选择并被保留为已知设置，得到读数 $J$。文献给出

$$
\mathbb E_B I(X:J\mid B=b)=Q(\rho).
$$

这里左端表示对基的条件互信息取平均；由 $I=H(J)-H(J|X)$、每个纯态的平均读数熵均为 $C_d$ 可立即得到。这是对输入标签的信息，区别于单独一条读数的随机性。对混态信号，右端改为 $Q(\rho)-\sum_xp_xQ(\rho_x)$。

对固定系综优化测量，$Q(\rho)\le I_{\rm acc}\le S(\rho)$；两界在允许的纯态系综范围内均紧，允许连续系综时下界由 Scrooge 系综达到。这不说每个测量都给出至少 $Q$，也不说平均态相同的所有系综有相同最优可访问信息。例如 $I/2$ 的正交二态系综可读出 $\ln2$，Haar 纯态系综则只有 $\ln2-1/2$ 的最优信息。

最大值 $Q(I/d)=\ln d-C_d$ 随维数趋于 $1-\gamma\approx0.422784$ 奈特，即约 $0.609949$ 比特。该有界性描述这个特定随机读出或最小可访问信息问题，不能当成高维量子系统的一般通信容量上限，也不取代 $S$ 的压缩率或热力学角色。

## 7. 次可加成立，强次可加失败：历史问题不能继续标成开放

所钉库已有有限维任意双体态的冻结结论

$$
Q(\rho_{AB})\le Q(\rho_A)+Q(\rho_B).
$$

但 $Q$ 对独立系统一般不相加。取 $\rho_A=\rho_B=I_2/2$，有

$$
Q(\rho_A)+Q(\rho_B)-Q(\rho_A\otimes\rho_B)
=2(\ln2-1/2)-(\ln4-13/12)=1/12.
$$

所以这个差额不能直接解释为相关性或经典互信息：此例两系统完全独立。

再取 $\rho_{ABC}=|\Phi^+\rangle\langle\Phi^+|_{AB}\otimes I_C/2$，谱与偏迹给出

$$
\begin{aligned}
Q(ABC)=Q(B)&=\ln2-1/2,\\
Q(AB)&=0,\qquad Q(BC)=\ln4-13/12,
\end{aligned}
$$

故 $Q(ABC)+Q(B)-Q(AB)-Q(BC)=1/12>0$，反驳通常方向的强次可加性。所钉库的公开 `StrongSubadditivityRefutation.result` 是对完整猜想的否定；具体见证及精确差额在其证明依赖中计算，并非一条独立公开的 `witness_gap` 定理。

本轮直接核对的近期论文 Zhang–Zhang–Ma，arXiv:2611.15431v1（2026-11-11），定理 3.1、3.10 与第 3.3 节也给出这些结论，并扩展到 Nichols–Wootters 熵族。Datta 等（2014）的猜想和 Zhang–Singh–Pati（2017）附录 7.1 的未决提问是历史状态，不能据此断言目前仍开放。

近期论文还把 $S$ 与 $Q$ 之间的熵族解释为不同程度的随机部分投影所保留的通信率；这是继续结合本书“有限观察者、投影与剩余量子自由度”的方向。中间量 $S_k^{(d)}$ 通常依赖共同环境维数：论文第 2.3 节明确要求比较不同子系统时补零到同一维数。端点 $S$、$Q$ 的补零不变性不能推广给所有中间量。所钉库本轮核对的 subentropy 模块不等于对近期论文全部扩展定理的形式化。

## 8. 冻结依据、待补桥梁与书稿落点

以下选择子均在确切钉版的相应 `Golden/Frozen/state/D5/S3/Quantum/Subentropy/<module>.lean.json` 中核对了声明种类，且读取了相关源码陈述。

| 模块 | 选择子 | 已核对范围 |
| --- | --- | --- |
| `Basic` | `subentropy` | `def`，密度态的行列式积分定义 |
| `Basic` | `matrixSubentropy_rectangular_gram` | 任意有限矩形复矩阵的两 Gram 矩阵不变性 |
| `Basic` | `matrixSubentropy_pure` | 归一化秩一态的 $Q=0$ |
| `SpectralFormula` | `matrixSubentropy_diagonal_eq_distinct_formula` | 正、两两不同且和为一的对角谱公式 |
| `DensityKernel` | `continuousOn_matrixSubentropy` | 半正定迹一域的连续性，含零与重复本征值 |
| `UniformValues` | `subentropy_uniformTwo`、`subentropy_uniformFour` | 均匀二级、四级的精确值 |
| `PinchingGap` | `matrix_subentropy_concave` | 半正定迹一域的凹性 |
| `PinchingGap` | `actual_pinching_gap_laws` | 指定分块捏合下的非负且凸的增量 |
| `Subadditivity` | `subentropy_subadditive` | 任意有限维双体态的次可加性 |
| `StrongSubadditivityRefutation` | `result` | 强次可加猜想的反例否定 |
| `POVMGram` | `cq_conditional_subentropy_guessing` | 有限经典—量子系综的 $Q(X|B)\le1-p_{\rm guess}\le-\ln p_{\rm guess}$ |

后三类结果的量词、分块与测量前提应在正式引入时逐条保留。这里条件 subentropy 是 $Q(\rho_{XB})-Q(\rho_B)$，并非第 6 节混态系综的平均信息差 $Q(\rho_B)-\sum_xp_xQ(\rho_x)$。

最值得继续做的形式化与写作有三项，按依赖排列：

1. 把行列式积分、归一化 Gram 体积展开与 $S$ 的对数积分连成可复用的公开桥梁；优先完整复用已有对称多项式、Gram 与谱结果。
2. 建立复 Haar 测量、单纯形测度与 $Q$ 的公开对应，再推出平均捏合熵增和双体纯态局部联合读数公式。所审读模块已有高斯、单纯形及行列式之间的桥接依赖，不能把它们当作全新缺口；本轮尚未定位可直接覆盖这两条完整操作陈述的冻结声明，需要进一步全库检索。
3. 以单比特径向公式和 $\tau$ 的上下界连接第 3–4 章、第 8 章与第 13/30 章。没有匹配冻结声明的部分可按文献结果明确标注；若进入定理类环境，仍须遵守书库的证据与形式化请求契约。

正文最自然的顺序是：先在第 3–4 章算随机尺子的读数；第 8 章解释 $C_d+Q-S$ 的平均相干擦除；第 13/30 章再解释跨球纯态的局部联合读数增量。第 38 章的纤维熵与轨迹熵需要额外操作对应，不能直接改名为 subentropy。

## 9. 本轮实际数值核对与文献

复算脚本：[subentropy_geometry_check.py](subentropy_geometry_check.py)。在安装 `numpy` 与 `mpmath` 的环境运行 `python3 docs/project/subentropy_geometry_check.py`。脚本使用 45 位十进制精度，核对单比特球面积分、行列式积分、闭式公式、三组不同正谱、Gram 主子式体积、三态同纯度例子及 $1/12$ 差额；另用种子 `20261116`、每种情形 50,000 次复 QR 随机基或独立球面方向采样，核对平均熵与纯态系综平均信息，以及三个施密特角的局部联合熵。

单比特三表达式的最大数值差约 $1.3\times10^{-43}$；三组谱的 $S$ 对数体积积分与谱熵的最大数值差小于 $2\times10^{-46}$；Gram 相关计算的最大浮点差小于 $8\times10^{-16}$；所有抽样平均与解析预测之差均落在六个估计标准误以内。数值覆盖只证明这些计算的符合程度，普遍结论依赖上文解析推导、原始文献或明确列出的冻结声明。

已直接读取以下原文或其所列部分：

- Datta, Dorlas, Jozsa, Benatti，*Properties of subentropy*，J. Math. Phys. **55**, 062203 (2014)，[DOI:10.1063/1.4882935](https://doi.org/10.1063/1.4882935)，[arXiv:1310.1312v1](https://arxiv.org/abs/1310.1312v1)。重点核对第 1 节、式 (1)–(6)、第 2.2 节及次可加性的历史猜想。
- Mitchison, Jozsa，*Towards a geometrical interpretation of quantum information compression*，Phys. Rev. A **69**, 032304 (2004)，[DOI:10.1103/PhysRevA.69.032304](https://doi.org/10.1103/PhysRevA.69.032304)，[arXiv:quant-ph/0309177](https://arxiv.org/abs/quant-ph/0309177)。重点核对第 3 节 Gram 主子式体积与第 5 节 subentropy。
- Jozsa, Mitchison，*Symmetric polynomials in information theory: entropy and subentropy*，2014，[arXiv:1404.7694](https://arxiv.org/abs/1404.7694)。重点核对第 2–3 节半轴积分及对称多项式单调性。
- Mintert, Życzkowski，*Wehrl entropy, Lieb conjecture and entanglement monotones*，Phys. Rev. A **69**, 022317 (2004)，[DOI:10.1103/PhysRevA.69.022317](https://doi.org/10.1103/PhysRevA.69.022317)，[arXiv:quant-ph/0307169v2](https://arxiv.org/abs/quant-ph/0307169v2)。重点核对第 III–IV 节、式 (9)–(21)，仅采用相关有限维结果，不沿用其引言中其他问题的历史开放状态。
- Zhang, Singh, Pati，*Average subentropy, coherence and entanglement of random mixed quantum states*，Ann. Phys. **377**, 125–146 (2017)，[DOI:10.1016/j.aop.2016.12.024](https://doi.org/10.1016/j.aop.2016.12.024)，[arXiv:1510.08859v2](https://arxiv.org/abs/1510.08859v2)。核对原文第 7.1 节的历史提问。
- Zhang, Zhang, Ma，*Subadditivity and the failure of strong subadditivity in the Nichols–Wootters family of entropies*，2026-11-11，[arXiv:2611.15431v1](https://arxiv.org/abs/2611.15431v1)。核对摘要、第 2 节与第 3.1–3.5 节相关陈述；未复核全文 110 页的每条证明，操作应用的细节保留为后续研究。

原始 subentropy 可访问信息结果由上述文献追溯至 Jozsa, Robb, Wootters，*Lower bound for accessible information in quantum mechanics*，Phys. Rev. A **49**, 668 (1994)，[DOI:10.1103/PhysRevA.49.668](https://doi.org/10.1103/PhysRevA.49.668)。本轮直接读取的是 Datta 等对该结果的陈述与推导，没有重新审查 1994 年原文的全部证明。
