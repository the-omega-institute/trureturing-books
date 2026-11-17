# 第二章效应概率研究：全域稳定性与有限观测的边界

本项目研究笔记保存已完成的数学调查及其证据边界，供上游接收与指定主笔的中英回写接续；这里不新增书稿定理、冻结声明或发布承诺。既有[有限投影规格](spec-batch-gleason-projections.md)与[可分空间规格](spec-batch-gleason-separable.md)已说明投影域、效应域和无限维范围的区别；本笔记只补充全效应近似可加与有限观测拟合之间的定量边界，不改变既有接收和出版成果。

## 全域近似可加的稳定性

以下均为实际复矩阵。对每个整数 $d\ge1$，记 $\mathcal E_d=\{E\in M_d(\mathbb C):E\succeq0,\ I-E\succeq0\}$；密度矩阵指 $\rho\succeq0$ 且复数迹 $\operatorname{Tr}\rho=1$，记 $b_\rho(E)=\operatorname{Re}\operatorname{Tr}(\rho E)$。

已完成的稳定性结果接收任意实数 $\epsilon\ge0$ 和任意总函数 $p:M_d(\mathbb C)\to\mathbb R$，只要求

$$
\begin{aligned}
&p(E)\ge0 &&(\forall E\in\mathcal E_d),\qquad p(I)=1,\\
&|p(E+F)-p(E)-p(F)|\le\epsilon
&& (\forall E,F\succeq0\text{ 且 }E+F\in\mathcal E_d).
\end{aligned}
$$

结论是存在**同一个**实际密度矩阵 $\rho$，使

$$
\forall E\in\mathcal E_d,\qquad
|p(E)-b_\rho(E)|\le4(2d-1)^2(6d^2+1)\epsilon.
$$

量词覆盖所有 $d\ge1$、所有 $\epsilon\ge0$，包括一维与零误差。没有连续性、可测性、$p(0)=0$、秩、交换性、小误差或有限观测前提。尤其不能把输入增强为效应上的值域 $[0,1]$：原前提给出的是 $0\le p(E)\le1+\epsilon$，以及 $0\le p(0)\le\epsilon$。这里不主张正误差时的唯一性或常数最优性。

临时实现的实际证明链为“矩阵探针 → 带符号有限族误差 → 厄米候选估计 → 谱修复”，其参数对应如下。

- 取标准基的对角投影，以及每个 $i<j$ 的 $(e_i+e_j)(e_i+e_j)^*/2$、$(e_i+\mathrm i e_j)(e_i+\mathrm i e_j)^*/2$，共 $m=d^2$ 个实际效应 $B_a$。精确坐标展开给出 $E=\sum_a c_a(E)B_a$；令 $K=2d-1$，有 $|c_a(E)|\le K$、$\sum_a B_a\preceq KI$。由探针读数构造厄米矩阵 $A$，满足 $b_A(B_a)=p(B_a)$，从而 $b_A(E)=\sum_a c_a(E)p(B_a)$。
- 区间上的近似齐次误差至多 $2\epsilon$，非空加权 $m$ 项和的误差至多 $(3m-1)\epsilon$。把系数分成正负部分并按 $K^{-2}$ 缩放，使所用和保持为效应，带符号有限族估计得到 $|p(E)-b_A(E)|\le\eta$，其中 $\eta=K^2(6d^2+1)\epsilon$。这一步仍使用全域可加前提，不能由有限探针拟合代替。
- 在 $I$ 上代入及使用非负性，得到 $|\operatorname{Re}\operatorname{Tr}A-1|\le\eta$、$b_A(E)\ge-\eta$。谱分解 $A=A_+-A_-$ 后，用负谱投影测试得 $\operatorname{Tr}A_-\le\eta$。正部迹为正时归一化 $A_+$；为零时选一个秩一密度，已有误差条件足以覆盖该分支。所得密度对所有效应的配对修正至多 $3\eta$，合并候选误差即为 $4\eta$，无须假设 $\eta$ 小。

## 任意有限观测仍允许的精确反模型

另一个已完成结果的量词为：每个 $d\ge1$、每个任意**有限**实际效应集 $T\subset\mathcal E_d$、每个给定密度 $\rho_\star$，均存在一个定义在全部矩阵上的 Borel 可测实函数 $p$，在效应上取值于 $[0,1]$，$p(0)=0$、$p(I)=1$，且 $p(E)=b_{\rho_\star}(E)$ 对所有 $E\in T$ 精确成立。同时：

- 所有允许的二元和上，$|p(E+F)-p(E)-p(F)|\le2$，并存在**不同的**允许效应 $E,F$ 达到 $2$。
- 对**每个**实际密度 $\rho$，所有效应上的 $|p(E)-b_\rho(E)|\le1$；对每个实数 $\eta>0$，另有实际效应使该距离严格大于 $1-\eta$。因此每个密度对应的全效应上确界均为 $1$，不声称一定取到最大值。

接受的原始实现使用以下具体机制。有限避让选出 $a>0$、$3a<1$，使 $0<t\le3a$ 的所有 $tI$ 都不在 $T$。令

$$
H=\{aI/(n+1):n\in\mathbb N\}\cup\{2aI\},\qquad
p(X)=\begin{cases}
1,&X\in H,\\
0,&X=3aI,\\
b_{\rho_\star}(X),&\text{其余矩阵}.
\end{cases}
$$

可数集及单点修改保持 Borel 可测，且避开有限测试与两个归一化端点。$aI,2aI$ 的和为 $3aI$，其读数为 $1,1,0$，故缺陷达到 $2$。任意密度都满足 $b_\rho(tI)=t$，而尖峰系数 $a/(n+1)$ 可任意小，于是得到严格的 $1-\eta$ 距离见证；值域与 Born 界给出统一上界 $1$。

这里的 $p$ **依赖** $T$ 与 $\rho_\star$，不是一个通过所有有限测试集的共同函数。它的最坏全域缺陷是 $2$，不反驳上述条件稳定性结果，也不识别物理定律。[第二章原定理](../../books/quantum-geometry/zh/ch02-born-rule.md#thm-busch-effect-density)及其[英文版](../../books/quantum-geometry/en/ch02-born-rule.md#thm-busch-effect-density)已经明确要求全域前提；单比特重构例也先假定这些条件。因此本调查不构成既有书稿出错的结论。

## 定性正则性与可用定量界

[有限拟合下的解析反模型与统一模量](EFFECT-FINITE-REGULARITY.md)给出另一个完整纸面构造，尚未在 Lean 中形式化：对每个 $d\ge1$、任意有限实际效应集 $T$、给定密度 $\rho_\star$ 及每个 $\eta>0$，可选择一个在全部复矩阵的实坐标上实解析、全局取值于 $[0,1]$ 且具有某个有限全局算子范数 Lipschitz 常数的响应。它保持 $p(0)=0$、$p(I)=1$ 与 $T$ 上的精确玻恩配对，仍在不同可行效应上达到可加缺陷 $2$；同一个效应对所有比较密度的误差均严格大于 $1-\eta$。响应在精度之后选定，不是一个连续响应同时对所有精度达到原 Borel 结果的上确界一。

该构造的任意 Lipschitz 常数至少为 $1/t$，其中 $0<t<\eta$；各个模型都有有限常数，不提供候选类共用的已知常数。反过来，固定连续归一响应对每个正定密度的最大误差严格小于一，依赖效应域紧性和满秩的端点刻画，不能把这个结论套到奇异密度。后面的有限设计证书仍要求独立支持的已知 $L$、联合可行覆盖、校准和统计前提；定性光滑、实解析或存在某个未知有限界均不能独自提供这些证据。该补充不改动前述完整稳定性目标、Borel 反模型或其临时内核证书。

## 有限测量的条件解析证书

以下协议尚未形式化或冻结；其证据与后述全域稳定性、Borel 反模型分开。定义联合可行域及全域缺陷

$$
\mathcal K_d=\{(E,F):E,F\succeq0,\ E+F\preceq I\},\qquad
D_p(E,F)=p(E+F)-p(E)-p(F),\qquad
\Delta(p)=\sup_{(E,F)\in\mathcal K_d}|D_p(E,F)|.
$$

协议另行假定一个实际效应上的函数 $p:\mathcal E_d\to[0,1]$、$p(I)=1$，以及有独立依据的已知有限常数 $L\ge0$，满足 $|p(H)-p(H')|\le L\|H-H'\|_{\rm op}$ 对**所有**实际效应成立。这些附加适用前提不改动前述任意实值函数的稳定性结果。

采用成对 Frobenius 范数 $\|(E,F)\|_\times=(\|E\|_F^2+\|F\|_F^2)^{1/2}$。厄米矩阵的实维数是 $d+2\binom d2=d^2$；取对角单位与除以 $\sqrt2$ 的对称／虚反对称非对角单位作实正交归一基。效应的 Frobenius 范数至多 $\sqrt d$，故联合域落在 $2d^2$ 维坐标立方体 $[-\sqrt d,\sqrt d]^{2d^2}$ 内。给定 $r>0$，网格参数及中心数界为

$$
q=\left\lceil\frac{\sqrt{2d^3}}r\right\rceil,\qquad
h=\frac{2\sqrt d}{q},\qquad M\le(q+1)^{2d^2}.
$$

将完整步长 $h$ 网格的每一点**联合**度量投影到非空紧凸集 $\mathcal K_d$，得到 $M$ 个可行中心，满足上述数量界。逐坐标舍入误差至多 $\sqrt{2d^2}h/2\le r$；投影最优性给出 $\|x-\Pi_{\mathcal K_d}g\|_\times\le\|x-g\|_\times$（$x\in\mathcal K_d$），因而这些中心覆盖全域。分别裁剪两个矩阵不能保证和仍小于 $I$。若每个近似中心仍经认证可行，且与对应精确投影的成对范数误差至多 $\nu\ge0$，覆盖半径为 $r+\nu$。这是投影存在及误差认证的数学规格，不提供已实现的 SDP 求解器或已验证仪器。

在验证读数之前固定设计、语境及全部误差／置信预算。每个中心 $(E_i,F_i)$ 的 $E_i,F_i,E_i+F_i$ 三项用分别的二元测量批次估计，共 $1\le J\le3M$ 个固定设置—语境条目；下式每个 $\widehat p$ 均指相应条目的点击比例。各标签及其语境对应须有独立操作依据，第三项不能由前两项频率相加定义。每个预期效应 $H$ 的实际实现 $\widetilde H\in\mathcal E_d$ 满足 $\|\widetilde H-H\|_{\rm op}\le\kappa$，固定均值满足 $|\mu_H-p(\widetilde H)|\le\beta$，其中 $\kappa,\beta\ge0$；同一效应跨语境使用同一个 $p$，有界语境残差计入 $\beta$。若联合实现一对，还须保证实际对可行、以其和实现第三项，并逐项满足三个校准界。每条目有 $n$ 次平稳、独立同分布的 Bernoulli 点击；条目之间无需独立。取

$$
\begin{aligned}
&a>0,\quad 0<\delta<1,\quad
n\ge\left\lceil\frac{\log(2J/\delta)}{2a^2}\right\rceil,\qquad
u=a+\beta+L\kappa,\\
&\widehat D=\max_{1\le i\le M}
|\widehat p(E_i+F_i)-\widehat p(E_i)-\widehat p(F_i)|.
\end{aligned}
$$

对每个固定且满足上述前提的 $p$、设计、仪器及采样律，以至少 $1-\delta$ 的概率，**同一个事件**同时控制所有可行对：

$$
\max(0,\widehat D-3u)\le\Delta(p)\le
\epsilon_{\rm eff}:=\min\bigl(2,\widehat D+3u+2\sqrt2L(r+\nu)\bigr).
$$

证明骨架是：Bernoulli Hoeffding 界与条目上的联合界把失败概率控制为 $2J e^{-2na^2}\le\delta$，并给出每条目 $|\widehat p(H)-p(H)|\le u$；三项误差相加为 $3u$。又由 $\|H\|_{\rm op}\le\|H\|_F$ 及三角不等式，$|D_p(E,F)-D_p(E',F')|\le2\sqrt2 L\|(E-E',F-F')\|_\times$；覆盖控制未测区域，下端点由已测可行对给出，值域 $[0,1]$ 给出上限 $2$。将 $p$ 在效应域外任意延拓不增加前提；在该事件上直接应用**不变的**全域稳定性结果，得到**一个** $\rho\succeq0$、复数迹 $\operatorname{Tr}\rho=1$，使

$$
\forall E\in\mathcal E_d,\qquad
|p(E)-b_\rho(E)|\le C_d\epsilon_{\rm eff},\qquad
C_d=4(2d-1)^2(6d^2+1).
$$

概率只针对各个固定合格模型下的验证点击，不是覆盖所有假想 $p$ 的共同事件，也不是前提为真的后验概率、通过概率、检验功效或数据结论。若校准及覆盖本身仅以失败预算 $\delta_{\rm cal}$、$\delta_{\rm cover}$ 成立，须有另行论证的相应事件，总失败预算至多 $\delta+\delta_{\rm cal}+\delta_{\rm cover}$。同批有限拟合读数不能独立支持全局 $L$、语境识别、归一化或平稳 iid 假设。上述公式对所有 $L\ge0$ 有效；有限设计与样本数要求 $r,a>0$、$\delta\in(0,1)$。设置数上界随 $d^2$ 指数增长，$Jn$ 次点击只是数学设计成本界，不含求解器运行时间／位复杂度，也未形成可执行的实际实验。

条件解析证书的数学范围仅是上文列出的正则性、覆盖、校准与统计前提；它不枚举连续域，也不提供内核、装置、准入或出版证据。该证书与全域稳定性及 Borel 反模型分别记账，不能把任一证据边界扩大为另一结果的保证。

## 证据身份与限度

两项完整目标的源身份均固定在提交 `008cea1ea7ea411a72d7826808b6c09f73e6487d`，对应 Lean `4.35.0` 与 mathlib `56a005855ea17e0b0958f73ec801ae140b0a1679`；完整目标的公理闭包仅含 `propext`、`Classical.choice`、`Quot.sound`。以下 SHA256 标识接受的源码字节，不替代上游冻结身份。

| 原始文件 | SHA256 | 接受范围 |
| --- | --- | --- |
| `EffectDensityIntegration.lean` | `22d5cadc8f4fba980dc4d45d3a61a875f6ecefe960fa2f21fe524c918a6bb929` | `EffectDensityIntegration.approximate_effect_density` 的原始全维完整结论及整文件 |
| `Countermodel.lean` | `8c564b6b1c6b911e789334c96af79672bcba3c2ecb2218ce591cfaef8eb9dad4` | `FiniteObservation.finite_observation_countermodel` 的全部联合子句及整文件 |
| `CountermodelHelpers.lean` | `104b322737833f7e51af4fdeb9044d48315294cb2131bceb420341bfc0db0f31` | 上述构造实际消费的有限避让、标量尖峰、Born 界与可测性辅助 |

稳定性的证据范围是 `EffectDensityIntegration.approximate_effect_density` 主声明，包括一维与零误差；`ExactTargetCheck.lean` 不作为证书。反模型的证据范围是完整联合子句，不包括其他尝试或共享仓库完整性保证。条件解析证书的源文为 `finite-effect-operational-applicability.md`，SHA256 `d0ff9f57854881af22a62376dbdce5b11d5113b9407a7d21b1a7bf5812b9b069`。这些身份不保证原临时副本永久可用，引用时仍须核对源码与依赖。

原生来源位于 `Quantum/Foundation` 的 `EffectAdditivityStability`、`EffectDensityRepair`、`EffectDensityStability` 与 `EffectFiniteObservationCountermodel`。稳定性草稿的源基线为 `06ee61685369528f2284faae15d77f1896143181`，反模型草稿的源基线为 `e267968c293719812b6b5a4332396e9985c087eb`；原生反模型版本为 `bf123334329e8eaf6f1774353b6634bdb5756c70`（基线 `1ff680e6cc902e88cfbba1b684826388e2ac8d37`），其中 `EffectFiniteObservationCountermodel.lean` 的 SHA256 为 `5b887ec550cd433f208105c620445d8d223c0e3812ab2fd46530eca17dd6f8ab`。四模块的完整来源单元固定在 `64426c6c3068c76d44fe7753b853439b9c24ee0c`，相关已合入 `dev` 的源身份为 `d4a6bd75fd78850fed8cf60aebb6ce7fceffa2e1`；展示范围是 63 条稳定性声明及反模型的 8 个联合子句。书库原接收基线为 `d3907aab04cf6b80c483a2995942d69d764035ae`。这些源身份不替换上表的原始实现，也不是冻结 GID。

三份稳定性模块的 48 条公开定理／引理登记及对应 Reg 源码仍未完成；反模型 Reg 的已编译证明与 `declared_validated` 记录不能代替它们。完整 Law、合法已登记读出、变动、敏感性、观察依赖和绑定证据的缺口见 [上游 issue 30392](https://github.com/the-omega-institute/trureturing/issues/30392)，该披露不构成豁免。已有证据不提供最终交付批准，也不覆盖完整 elaborated 依赖闭包、先验独立性或追溯信用。准入、规范 deposit、冻结与书库接收须按各自契约完成；源身份及编译证据不赋予书稿 Lean 验证身份。

## 文献背景、残余假设与回写入口

Busch 的精确全效应表示背景为 *Quantum States and Generalized Observables: A Simple Proof of Gleason's Theorem*（2003），[DOI 10.1103/PhysRevLett.91.120403](https://doi.org/10.1103/PhysRevLett.91.120403)、[quant-ph/9909073v3](https://arxiv.org/abs/quant-ph/9909073v3)；沿用源仓库不可变提交 `06ee61685369528f2284faae15d77f1896143181` 的 `Library/Quantum/busch2003effectprobabilities.md` 与既有精确表示声明的归属。精确可加结果本身不提供正误差稳定界。

Hrushovski–Pitowsky，*Generalizations of Kochen and Specker's Theorem and the Effectiveness of Gleason's Theorem*，[quant-ph/0307139v1](https://arxiv.org/abs/quant-ph/0307139v1)，第 1 页及第 3 节 Lemma 2，是有限射线约束与有效近似的背景。所用论文文本的 SHA256 为 `fc54c914f9a503101a27bb8147dd2c03d33cb4a327b25ce4e916fdf9bfad844e`。文中态受非负、相位不变与正交基归一化等标架约束，先在维数至少三的实／复空间讨论；这与任意有限效应值的匹配不同。该来源不建立本次两个精确结果的等价先例、优先权或原创性。

物理上仍需独立支持：复矩阵与实际操作的对应、所用有限维范围、同一效应的跨语境响应、归一化，以及**所有**允许二元和的统一误差控制。有限拟合与这些全域结构的依据是不同义务。上述条件证书已完成在明确正则性、覆盖及统计前提下的有限样本误差传播；这些前提对真实装置的依据与实验验证仍未完成。反模型仅说明 Borel 可测也不足以由任意有限精确拟合保证全域接近，不表明自然界采用该构造。

既有静态相融理论假设 6.1 是精确 Busch 假设及其推导，包含唯一性与线性延拓；本笔记的新定量存在性结论没有覆盖它，不能据此声称整个 atom 已完成。V28 第 11.2 节的固定射线／语境连续有限测试结果也不同于这里的任意维实际效应反模型。数学陈述若有变化，原证据不自动覆盖新陈述；上游登记、冻结与双语书稿接收仍各自承担相应证明和发布义务。
