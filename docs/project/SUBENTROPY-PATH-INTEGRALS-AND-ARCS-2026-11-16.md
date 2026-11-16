# Subentropy、路径积分与极小圆弧

研究日期：2026-11-16。接续[熵与 subentropy 的几何研究](ENTROPY-SUBENTROPY-RESEARCH-2026-11-16.md)。书库基线为 2b5d975a2378cf6c2cc01d66ca814ca967dac5a9，trureturing 钉版为 ccaf12043b8eaa43581decc99f584528f3564871。对数取自然底，熵以奈特计。

本轮范围是比较本书第 34 章的圆弧、闭环相位、路径积分与 subentropy。以下分别标明冻结依据、经典几何及量子力学公式和手工推导；没有新增 Lean 验证结果，没有修改书稿或锁文件。

接续应用见[隧穿、时间自干涉与 subentropy](TUNNELING-TEMPORAL-INTERFERENCE-AND-SUBENTROPY-2026-11-16.md)，其中核对相关实验，并将出射历史的 Gram 重叠与约化态谱连起来。

**核心联系：态重叠同时携带度量与相位。闭环的有向相位进入相干路径振幅；邻近态经过明确的混合或约化操作后，其几何散布进入 subentropy。两者可以在同一装置中出现，但对应不同的可观测变化。**

## 1. 极小圆弧的共同底层：同一个复态重叠

书中入口为 [§34.4 极小三角弧面体](../../books/quantum-geometry/zh/ch34-s04-infinitesimal-trihedron.md)、[§34.6 贝里相位与路径积分](../../books/quantum-geometry/zh/ch34-s06-berry-sectors-and-path-integrals.md)及 [§34.11 量子极小圆弧](../../books/quantum-geometry/zh/ch34-s11-quantum-arcs-and-macro-integrals.md)。

设单位布洛赫方向 $n$ 对应纯态投影 $P(n)=(I+n\cdot\sigma)/2$。两方向的球心角为 $\beta$，则

$$
|\langle\psi(n)|\psi(n')\rangle|^2=\frac{1+n\cdot n'}2=\cos^2\frac\beta2.
$$

因此布洛赫球大圆弧长 $\beta$ 对应 Fubini–Study 距离 $\beta/2$。无穷小重叠模满足

$$
\log|\langle\psi|\psi+d\psi\rangle|
=-\frac12ds_{\rm FS}^2+o(ds_{\rm FS}^2),
\qquad ds_{\rm FS}^2=\frac14(d\theta^2+\sin^2\theta\,d\phi^2).
$$

在光滑局部规范下，相位由贝里联络 $\mathcal A=i\langle\psi|d\psi\rangle$ 给出。取旋量 $(\cos(\theta/2),e^{i\phi}\sin(\theta/2))$，有

$$
\mathcal A=-\frac{1-\cos\theta}{2}\,d\phi,\qquad
\mathcal F=d\mathcal A=-\frac12\sin\theta\,d\theta\wedge d\phi.
$$

度量与曲率同出自量子几何张量

$$
T_{\mu\nu}=\langle\partial_\mu\psi|(I-P)|\partial_\nu\psi\rangle,
\qquad g_{\mu\nu}=\operatorname{Re}T_{\mu\nu},\quad
\mathcal F_{\mu\nu}=-2\operatorname{Im}T_{\mu\nu}.
$$

这里固定了联络及有向面积的符号约定。球面闭环的贝里相位为 $\gamma=-\Omega/2$，模 $2\pi$ 理解。

上述联系提供统一几何语言。它本身不指定哈密顿量、环境耦合或观察者的混合操作。

## 2. 从圆弧到路径积分，需要动力学

### 有限闭环与有限切片

对归一化态 $|\psi_j\rangle$，令 $P_j=|\psi_j\rangle\langle\psi_j|$，有精确恒等式

$$
\operatorname{Tr}(P_0P_1\cdots P_{N-1})
=\langle\psi_0|\psi_1\rangle\cdots
\langle\psi_{N-1}|\psi_0\rangle.
$$

这是 Bargmann 闭环量；它的负辐角在光滑细分极限给出贝里相位。相邻重叠的模与相位都参与这个乘积。

真正的传播振幅还需指定 $H$。以时间不变的单比特哈密顿量为例，记 $d\nu(n)=d\Omega/(4\pi)$，则

$$
I=2\int P(n)\,d\nu(n).
$$

在每个中间切片插入此恒等算符，$\Delta t=T/N$，得到任意有限 $N$ 下的精确式

$$
\langle n_f|e^{-iHT/\hbar}|n_i\rangle
=2^{N-1}\int\prod_{j=1}^{N-1}d\nu(n_j)
\prod_{j=0}^{N-1}
\langle n_{j+1}|e^{-iH\Delta t/\hbar}|n_j\rangle.
$$

插入恒等算符是振幅的重写；实施投影测量并遗忘结果则是另一个物理操作。

对光滑相邻态提取相位，得到常用的自旋相干态作用量

$$
\mathcal S[\psi]=\int_0^T
\left(i\hbar\langle\psi|\dot\psi\rangle
-\langle\psi|H|\psi\rangle\right)d\tau.
$$

连续路径积分的测度、符号选择及正则化仍需另行处理。有限切片的精确矩阵元包含非对角 $H$ 符号；将它直接换为对角期望值，是光滑路径层面的提取，不能用来跳过整个连续极限。所钉 Lie–Trotter 乘积定理也不单独提供完整的自旋路径积分构造。

### “极小”的三种含义

| 含义 | 数学条件 | 与本问题的关系 |
| --- | --- | --- |
| 很小的弧元 | $\epsilon\ll1$ | 本书 §34.4 的直接含义，允许二阶展开 |
| 两端间最短弧 | 最小化 FS 长度 | 无控制约束时是大圆短弧；布洛赫球距离须除以二 |
| 作用量驻值路径 | $\delta\mathcal S=0$ | 依赖 $H$ 与边界条件，驻值可以包含鞍点 |

例如 $H=(\hbar\omega/2)\sigma_z$ 使一般纯态沿纬线转动。除赤道等特殊情形外，这条轨道不是球面测地线；沿途 $S=Q=0$。若另给各向同性正定动能作用量，才会在相应端点和局部最小条件下选出测地线。

### 光滑细分也能保留非零几何相位

固定纬度 $\theta_0$ 绕行一圈：

$$
\gamma=-\pi(1-\cos\theta_0).
$$

把同一光滑回路等分为 $N$ 步，每步布洛赫角 $\beta_j=O(N^{-1})$，故 $\sum_j\beta_j^2=O(N^{-1})\to0$，而 $\gamma$ 仍趋于上述固定非零值。这说明“逐步矢高总和消失”不能推出“固定闭环的几何相位消失”。

贝里相位也可以由跨越整个闭环的曲面积分 $\int_\Sigma\mathcal F$ 计算。沿一条曲线细分与把一块曲面铺成微小三角形，步数和面积的计数关系不同。

本书讨论的 $N\epsilon^2=O(1)$ 是特定扩散尺度。正的 Wiener 路径测度、实时间的振荡费曼振幅及布洛赫态轨迹之间，还需指定模型与映射；不能仅凭这个尺度把三者识别。尤其不能由光滑细分的局部平方和趋零，推出量子几何必须依赖布朗轨道。

## 3. Subentropy 的积分与路径积分有两座精确桥梁

### 正高斯积分桥梁

从钉版定义出发，$\rho\ge0$、$\operatorname{Tr}\rho=1$：

$$
Q(\rho)=\int_0^\infty
\left[\frac{t}{1+t}-\det(I+\rho/t)^{-1}\right]dt.
$$

对 $t>0$，复高斯积分给出

$$
\boxed{
\det(I+\rho/t)^{-1}
=\int_{\mathbb C^d}\frac{d^{2d}z}{\pi^d}
e^{-z^\dagger(I+\rho/t)z}
=\mathbb E_{z\sim{\rm CN}(0,I)}
e^{-z^\dagger\rho z/t}.}
$$

手工证明：酉对角化 $\rho$ 后，积分拆成 $d$ 个 $\int_{\mathbb C}e^{-a|z|^2}d^2z/\pi=1/a$，其中 $a=1+\lambda_j/t>0$。

因此 $Q$ 的核可以解释为有限维正高斯配分函数相对于纯态基线的差。这里 $t$ 是谱尺度参数，$z$ 是辅助积分变量。若要建立随物理时间发展的场或历史路径积分，还必须给出时间切片间的耦合、作用量及连续极限；$I+\rho/t$ 并不自动具有这些结构。

### Gram 闭环桥梁

若 $\rho=\sum_a p_a|\psi_a\rangle\langle\psi_a|$，$G_{ab}=\sqrt{p_ap_b}\langle\psi_a|\psi_b\rangle$，则

$$
\operatorname{Tr}\rho^k=\operatorname{Tr}G^k
=\sum_{a_1,\ldots,a_k}p_{a_1}\cdots p_{a_k}
\langle\psi_{a_1}|\psi_{a_2}\rangle\cdots
\langle\psi_{a_k}|\psi_{a_1}\rangle.
$$

所以谱信息可以由态标签上的闭合 Bargmann 回路重建。再通过行列式，进入 $Q$。例如当 $|s|\|G\|<1$ 时，

$$
\log\det(I+sG)
=\sum_{k\ge1}\frac{(-1)^{k+1}s^k}{k}\operatorname{Tr}G^k.
$$

该收敛域不覆盖整个 $s=1/t$ 半轴，不能未经控制就把级数逐项放入 $Q$ 的全积分。

这说明 subentropy 与闭环相位确有代数联系：一般高维混合态的谱可以依赖闭环相位。但这些回路索引的是系综标签，未必是时间历史；系综重排不会改变 $Q$，整体复共轭也保持谱，而有向贝里相位会反号。

## 4. 把本书同一枚小原胞直接算成 subentropy

采用书中方向

$$
A=(\sin\epsilon,\cos\epsilon,0),\quad B=(0,1,0),\quad
C=(0,\cos\epsilon,\sin\epsilon),\qquad c=\cos\epsilon.
$$

直接代入冻结的三态 Bargmann 公式，

$$
\Delta=\operatorname{Tr}(P_A P_B P_C)
=\frac{(1+c)^2+i\sin^2\epsilon}{4},
\qquad
\arg\Delta=\frac{\Omega(\epsilon)}2.
$$

其中

$$
\Omega(\epsilon)=2\arctan\!\left(\tan^2\frac\epsilon2\right)
=\frac{\epsilon^2}2+\frac{\epsilon^4}{12}+O(\epsilon^6).
$$

如果系统相干地沿闭环返回，密度态仍为纯态，$Q=0$，而几何相位为 $-\Omega/2$。

另做一个明确的统计操作：以相等概率制备三个顶点态并遗忘标签，得到

$$
\bar\rho=\frac{P_A+P_B+P_C}{3},\quad
\bar n=\frac13(\sin\epsilon,1+2c,\sin\epsilon),\quad
r^2=|\bar n|^2=\frac{3+4c+2c^2}{9}.
$$

令 $a=(1+r)/2$、$b=(1-r)/2$，则

$$
q(r):=Q(\bar\rho)
=-\frac{a^2\ln a-b^2\ln b}{r},
$$

端点连续取值 $q(0)=\ln2-1/2$、$q(1)=0$。这是谱公式在二维的改写。

设 $\delta=\det\bar\rho=(1-r^2)/4$，则手工展开得到

$$
\delta=\frac{\epsilon^2}{9}-\frac{5\epsilon^4}{216}+O(\epsilon^6),
\qquad q=\delta+O(\delta^2|\ln\delta|),
$$

因而

$$
\boxed{
Q(\bar\rho)=\frac{\epsilon^2}{9}
+O(\epsilon^4|\ln\epsilon|),\qquad
\gamma=-\frac{\epsilon^2}{4}+O(\epsilon^4).}
$$

两者同为二阶小量，源于不同结构：混合后的谱收缩与闭环的有向面积。改变三个制备权重会改变 $Q$，球面三角形的几何相位保持原值；倒转闭环会反转相位，混合态保持原值。所以等权小角下 $Q/|\gamma|\to4/9$ 是这个具体操作的比例，不能推广为普遍换算律。

### 更一般的局部关系：subentropy 的首项是 FS 方差

对任意单比特纯态系综，设两方向夹角为 $\beta_{ab}$，精确有

$$
\delta=\det\rho
=\sum_{a<b}p_ap_b\sin^2\frac{\beta_{ab}}2.
$$

当所有态位于同一 $O(\epsilon)$ 邻域内，$Q=\delta+O(\delta^2|\ln\delta|)$。取该邻域的局部坐标位移 $x_a=O(\epsilon)$、$\bar x=\sum_a p_ax_a$，即有

$$
Q(\rho)=\sum_a p_a\,g_0(x_a-\bar x,x_a-\bar x)+o(\epsilon^2).
$$

手工证明：$\sin^2(\beta_{ab}/2)=d_{\rm FS}(a,b)^2+O(\epsilon^4)$，局部二次项为 $g_0(x_a-x_b,x_a-x_b)$；再用加权两两距离恒等式。这里 $g_0$ 是共同参考点的 FS 度量。

这给出与“极小圆弧”最直接的 subentropy 关系：态云局部混合时，首项测量的是 FS 几何方差；贝里相位测量曲率的有向面积。二者都能由同一量子几何张量讨论。

这个近纯态极限还解释了为何这里特别适合研究 subentropy：单比特冯·诺依曼熵满足 $S=\delta(1-\ln\delta)+O(\delta^2|\ln\delta|)$，而 $Q=\delta+O(\delta^2|\ln\delta|)$。前者的首项带对数增强，后者直接给出局部二次几何量。它们分别保留完整的谱熵和随机测量基下扣除纯态基线的平均读数熵，各有操作含义。

### 两种 Gram 体积必须保留各自的空间

书中实三维方向的 Gram 行列式为

$$
\det[(n_a\cdot n_b)_{a,b=A,B,C}]=\sin^4\epsilon>0.
$$

三个对应旋量属于 $\mathbb C^2$，因此

$$
\det[(\langle\psi_a|\psi_b\rangle)_{a,b=A,B,C}]=0,\qquad e_3(\bar\rho)=0.
$$

三根实方向撑开三维体积，与三个复旋量线性相关同时成立。因此前一笔记里行列式系数的复外积体积，不能直接替换成本书原胞的实三维体积。对单比特，$Q$ 最终只依赖 $\delta$。

## 5. 可检验的连接：两路径干涉仪

让两条正交路径模式承载相对相位 $\phi$，其中可含小三角回路的几何贡献 $-\Omega/2$。路径再与环境纠缠，环境态重叠模为 $v\in[0,1]$。平衡输入的路径约化态可写为

$$
\rho_{\rm path}=\frac12
\begin{pmatrix}1&ve^{-i\phi}\\ve^{i\phi}&1\end{pmatrix}.
$$

这里环境重叠的相位已并入 $\phi$。其谱为 $(1\pm v)/2$，而平衡输出端的概率为

$$
P_+=\frac{1+v\cos\phi}{2},\qquad Q(\rho_{\rm path})=q(v).
$$

| 操作 | 干涉图样 | Subentropy |
| --- | --- | --- |
| 改变闭环面积，调节 $\phi$ | 平移条纹 | 固定 $v$ 时保持原值 |
| 降低环境态重叠 $v$ | 降低条纹可见度 | 在此模型中增大 |
| $v=1$ | 完全可见的干涉 | $Q=0$ |
| $v=0$ | $P_+=1/2$，条纹消失 | $Q=\ln2-1/2$ |

这是相位与 subentropy 同时进入同一实验的明确方案。路径积分给振幅、相位及环境纠缠；先求约化密度态，才有确定的 $Q$。它不要求把“路径数”或“相位剩余”直接定义成熵。

## 6. 冻结依据、计算证据与后续落点

本轮及前一轮直接检查了确切钉版的以下源码及冻结片。列出的只是它们覆盖的数学内容，不把后续手工应用计为新冻结定理。

| 冻结 GID | 核对范围 |
| --- | --- |
| D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch | 任意实三矢量的 Pauli 投影表达式之三重迹；单位方向时解释为纯态闭环 |
| D5/S3/Quantum/Information/BargmannImaginaryMaximizers.bargmann_path_product | 任意有限 C² 向量链的秩一算子迹与闭合重叠乘积 |
| D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula | 实三锚 Gram 行列式 |
| D5/S3/QuantumBounds/FubiniStudyRecordTime.fs_angle_triangle | 纯态射影角的三角不等式，约定为内积模的反余弦 |
| D5/S3/Quantum/Analysis/TrotterProduct.trotter_product | 完备赋范代数中的指数乘积极限 |
| D5/S3/Quantum/Subentropy/Basic.matrixSubentropy_rectangular_gram | 两 Gram 矩阵的矩阵 subentropy 相同 |
| D5/S3/Quantum/Subentropy/Basic.matrixSubentropy_pure | 归一化秩一态的 $Q=0$ |

贝里联络、FS 度量、自旋相干态切片及正高斯积分属于标准数学物理公式，这里给出所用约定与有限维推导。本轮没有将它们逐条登记成书中定理。局部 FS 方差、具体三角形的 $Q$ 渐近式及两路径例子是本轮手工应用，不作新颖性主张。

[复算脚本](subentropy_geometry_check.py)新增了原胞投影子、正反闭环、实与复 Gram、混合谱、四阶闭合态标签回路及干涉仪读数的独立矩阵计算，最大代数浮点差为 $5.6\times10^{-16}$。45 位精度下，$\epsilon=10^{-4}$ 时 $Q/\epsilon^2=0.1111111085193944$，趋近 $1/9$；$\Omega/\epsilon^2=0.5000000008333333$。

正高斯积分使用独立种子 20261117、每个尺度 50,000 个样本，在 $t=0.2,1,3$ 与行列式预测相符，偏差小于一个估计标准误。纬度 $\theta_0=1.1$ 的光滑回路细分到 2048 步时，离散相位与 $-\pi(1-\cos\theta_0)$ 相差 $8.9\times10^{-7}$ 弧度；平方步长和继续下降。抽样与有限计算提供复算证据，普遍结论仍依赖以上解析论证。

若接续书稿写作，最合适的落点是：§34.4 算原胞的几何相位；§34.6 说明带 $H$ 的相干态切片；§34.11 加入“相干拼接—明确约化—求谱熵”的操作链，并用两路径干涉仪分别展示相位位移和可见度变化。把 $Q$ 提升为选路原理、热力学熵产生率或宏观动力学，还缺少具体演化律与实验对应。
