# 第二章效应概率研究：全域稳定性与有限观测的边界

本项目研究笔记保存截至 2026-11-14 已完成的数学调查及临时验证证据，供后续上游接收与指定主笔的中英回写接续；书库准备基线为 `d3907aab04cf6b80c483a2995942d69d764035ae`。这里不新增书稿定理、冻结声明或发布承诺。既有[有限投影规格](spec-batch-gleason-projections.md)与[可分空间规格](spec-batch-gleason-separable.md)已说明投影域、效应域和无限维范围的区别；本笔记只补充全效应近似可加与有限观测拟合之间的定量边界，不改变既有接收和出版成果。

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

另一个已完成结果的量词为：每个 $d\ge1$、每个任意**有限**实际效应集 $T\subset\mathcal E_d$、每个给定密度 $\rho_\star$，均存在一个定义在全部矩阵上的 Borel 可测实函数 $p$，其效应值域为 $[0,1]$，$p(0)=0$、$p(I)=1$，且 $p(E)=b_{\rho_\star}(E)$ 对所有 $E\in T$ 精确成立。同时：

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

## 临时证据的精确身份与限度

两项完整目标的接受证据均来自源提交 `008cea1ea7ea411a72d7826808b6c09f73e6487d`，使用 Lean `4.35.0`、mathlib `56a005855ea17e0b0958f73ec801ae140b0a1679`。实际整文件编译退出码为 0、错误和警告均为 0，生成了真实 `.olean`，完整目标打印的公理闭包仅为 `propext`、`Classical.choice`、`Quot.sound`。本笔记核对原始文件与记录的身份，复用已完成检查，没有重跑内核。

稳定性原始目录为 `/tmp/ray-record-effect-stability-integration-workspace-01a1d544/`；反模型原始目录为 `/tmp/ray-record-finite-observation-countermodel-lean-workspace-01a1d544/`。以下 SHA256 标识接受的源码字节，而不是新冻结身份。

| 原始文件 | SHA256 | 接受范围 |
| --- | --- | --- |
| `EffectDensityIntegration.lean` | `22d5cadc8f4fba980dc4d45d3a61a875f6ecefe960fa2f21fe524c918a6bb929` | `EffectDensityIntegration.approximate_effect_density` 的原始全维完整结论及整文件 |
| `Countermodel.lean` | `8c564b6b1c6b911e789334c96af79672bcba3c2ecb2218ce591cfaef8eb9dad4` | `FiniteObservation.finite_observation_countermodel` 的全部联合子句及整文件 |
| `CountermodelHelpers.lean` | `104b322737833f7e51af4fdeb9044d48315294cb2131bceb420341bfc0db0f31` | 上述构造实际消费的有限避让、标量尖峰、Born 界与可测性辅助 |

稳定性的 `verification.json`（SHA256 `545751572ef3bd74289b415e1f00051741d4908da9f22bfd4d4fa3cc844b6652`）中仅修正后主文件的完整检查支持上述结论；依赖源与编译产物对应见同目录 `suppliers.json`（`560b1a652759280db219c03f8067e516f60d5647bb8234ec9b34f27e029297ac`）。`ExactTargetCheck.lean` 有两条警告，未获接受，不作为完整目标或边界情形的证书。一维与零误差的覆盖来自主声明本身。反模型的 `compiler-evidence.json`（`d6af910aa200dd792805603cef93b4d71f9af78acbda03bf95b04d86bc5e0ef6`）记录接受的完整检查；早先失败或带警告的尝试不计入证据。

完成结论分别保存在 `/tmp/ray-record-effect-stability-integration-work-01a1d544/collected-envelope.json` 与 `/tmp/ray-record-finite-observation-countermodel-lean-work-01a1d544/collected-envelope.json`。它们及上述临时路径是交接定位，不保证永久可用；后续保留须核对字节及依赖，不能把路径或本笔记当作永久证明库。反模型完成记录另披露共享引用摘要曾变化且未归因；这不扩大为共享仓库完整性保证。

## 文献背景、残余假设与回写入口

Busch 的精确全效应表示背景为 *Quantum States and Generalized Observables: A Simple Proof of Gleason's Theorem*（2003），[DOI 10.1103/PhysRevLett.91.120403](https://doi.org/10.1103/PhysRevLett.91.120403)、[quant-ph/9909073v3](https://arxiv.org/abs/quant-ph/9909073v3)；沿用源仓库不可变提交 `06ee61685369528f2284faae15d77f1896143181` 的 `Library/Quantum/busch2003effectprobabilities.md` 与既有精确表示声明的归属。精确可加结果本身不提供正误差稳定界。

Hrushovski–Pitowsky，*Generalizations of Kochen and Specker's Theorem and the Effectiveness of Gleason's Theorem*，[quant-ph/0307139v1](https://arxiv.org/abs/quant-ph/0307139v1)，第 1 页及第 3 节 Lemma 2，是有限射线约束与有效近似的背景。实际输入为 `/tmp/ray-record-effect-literature-intake-01a1d544/` 中的 `intake-summary.json`、`hrushovski-pitowsky-0307139.pdf`（SHA256 `fc54c914f9a503101a27bb8147dd2c03d33cb4a327b25ce4e916fdf9bfad844e`）及其文本。文中态受非负、相位不变与正交基归一化等标架约束，先在维数至少三的实／复空间讨论；这与任意有限效应值的匹配不同。已有有界元数据与原文阅读没有建立本次两个精确结果的等价先例、优先权或原创性。

物理上仍需独立支持：复矩阵与实际操作的对应、所用有限维范围、同一效应的跨语境响应、归一化，以及**所有**允许二元和的统一误差控制。有限拟合与这些全域结构的依据是不同义务。若从有限样本外推，还须另有结构或正则性、未测区域覆盖及统计假设，并传播校准、估计误差和置信不确定性；本调查没有完成该推断或实验验证。反模型仅说明 Borel 可测也不足以由任意有限精确拟合保证全域接近，不表明自然界采用该构造。

源接收材料仅为已完成的提案：`/tmp/ray-record-effect-stability-source-intake-work-01a1d544/collected-envelope.json` 在 `06ee61685369528f2284faae15d77f1896143181` 检视了既有精确表示与谱供应，提出在 `Quantum/Foundation` 分别承载活跃的可加稳定性、谱修复与完整组合；`/tmp/ray-record-finite-observation-source-draft-work-01a1d544/collected-envelope.json` 在 `e267968c293719812b6b5a4332396e9985c087eb` 准备了反模型的原生 D5/Scribe 草稿。后者未编译、未发射，不能作为新证书；两者都不证明当前源接收、Reg 或冻结成功。本笔记不读取仍在进行的源集成与定量草拟工作。

后续源作者与仓库负责人仍须解决合法的预登记及原始时序依据、实际 theory/atom 对应、逐项准入与真实消费关系、同作者 Reg 审计及其必要的未完成披露，取得当前源兼容／内核／公理证据、Scribe 忠实性与独立审查，再完成正式 deposit、冻结和 `dev` 合入。新结果的规范 GID 均待这些实际步骤产生。随后由工程方建立配置分支可达的书库 pin，由指定主笔先中文再英文逐项回写条件、误差界及有限观测边界，并完成书库检查、所需构建、审查、`main` 合入、CI 与 Pages 验证。本次只准备本地工程笔记，没有执行上述接收与发布步骤，也没有完成更广的跨仓库目标。
