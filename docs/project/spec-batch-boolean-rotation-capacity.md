# 布尔旋转码本容量界的采用规格

本规格给出第 35 章采用既有冻结定理所需的数学接口、来源和证据边界，供指定正文主笔使用；不提供替换章节段落。对应的中英文正文文件均为 `ch35-light-pulse-and-self-referential-table.md`。采用位置在 `ex-ch35-self-indexing-table-rank-collapse` 及其配图之后、35.4 节之前。原例子的“文献结果，未在本书形式化”标签继续保留：下面的精度与码本容量界没有覆盖该例子的全部架构和自指主张。

## 1. 冻结来源与声明

来源是已合并提交 `33cb9c960eb43d74a910b74aa62c0d628198fac4` 中的：

- [Lean 源码](https://github.com/the-omega-institute/trureturing/blob/33cb9c960eb43d74a910b74aa62c0d628198fac4/D5/S3/Geometry/BooleanRotationCodebook.lean)。
- [Blueprint 说明](https://github.com/the-omega-institute/trureturing/blob/33cb9c960eb43d74a910b74aa62c0d628198fac4/Blueprint/D5/S3/Geometry/BooleanRotationCodebook.md)。
- [模块冻结记录](https://github.com/the-omega-institute/trureturing/blob/33cb9c960eb43d74a910b74aa62c0d628198fac4/Golden/Frozen/state/D5/S3/Geometry/BooleanRotationCodebook.lean.json)。

拟采用的两条 GID 为：

```text
D5/S3/Geometry/BooleanRotationCodebook.finite_codebook_lower_bound
D5/S3/Geometry/BooleanRotationCodebook.finite_codebook_upper_bound
```

两条均为冻结的 `theorem`。书稿采用后由 `./tbook pin --refresh` 解析新增引用，锁文件不手写。一个结论盒共同引用两条声明时，按写作手册使用 `lean="GID1 GID2"`，中英文使用同一环境 ID、GID 序列与公式范围。可用环境 ID 为 `thm-ch35-uniform-rotation-codebook-capacity`。

## 2. 对象、误差和量词

取自然数 $n\ge1$、实数 $0<\varepsilon<2\pi/3$，定义

$$
d_{2\pi}(t)=\inf_{z\in\mathbb Z}|t-2\pi z|,
\qquad Q_n=\{0,1\}^n.
$$

对有限集合 $C\subset\mathbb R^n$，充分性指

$$
\forall\theta\in\mathbb R^n\quad
\exists\phi\in C\quad
\forall x\in Q_n,\qquad
d_{2\pi}\!\left(\sum_{i=1}^n x_i(\theta_i-\phi_i)\right)
\le\varepsilon.
$$

这里 $C$ 在所有输入 $\theta$ 之前固定；每个 $\theta$ 只选一次 $\phi$，该码字服务全部查询 $x$。不能把量词改为逐查询选择码字。Lean 使用 `Fin n` 和有限子集 $s$；对应为 $s=\{i:x_i=1\}$，两种求和相同。

固定解码器为

$$
x\longmapsto R\!\left(\sum_i x_i\phi_i\right),
\qquad
R(\alpha)=
\begin{pmatrix}
\cos\alpha&-\sin\alpha\\
\sin\alpha&\cos\alpha
\end{pmatrix}.
$$

矩阵使用字面实矩阵相等，周期是 $2\pi$。矩阵精度结论是：每个查询存在 $|\delta|\le\varepsilon$，使目标矩阵等于 $R(\sum_i x_i\phi_i+\delta)$；不是把矩阵算子范数误差直接定义成 $\varepsilon$，也没有对整体相位取商。

## 3. 可采用的完整结论

每个充分的有限码本都满足

$$
|C|\binom{2n}{n}\varepsilon^n\ge n!(2\pi)^n.
$$

另有一个固定的充分码本，同时满足原字面旋转矩阵解码条件，且

$$
|C|\le\left\lceil\frac{\pi n}{\varepsilon}\right\rceil^n.
$$

上界没有声称达到下界或给出最小码本。Lean 上界使用自然数上取整；在正实参数下与这里的整数上取整一致。其一般声明允许任意 $L>0$、$\varepsilon>0$，并在 $L=2\pi$ 时提供同一码本的矩阵结论；下界的一般声明要求 $3\varepsilon<L$。本规格统一采用第 2 节范围，避免把两条声明的适用条件混淆。

证明说明可沿既有 Blueprint：全部布尔查询的小误差先限制正、负坐标的总质量；相应误差体的体积是 $\binom{2n}{n}\varepsilon^n/n!$。在周期环面上，有限个平移误差体必须覆盖总体积 $(2\pi)^n$，得到下界。上界使用每坐标 $\lceil\pi n/\varepsilon\rceil$ 个等距点，先共同选定各坐标的近邻，再用误差和控制所有子集查询。体积公式及其正交象限分解已有 Kovačević–Tan、Rogers–Shephard 文献先例，不能将其单独称为新发现。

## 4. 与原例子的关系及未覆盖边界

这两条定理量化固定旋转解码器在有限精度下需要多少个可选参数向量，补充原例子对行数的讨论。它们没有证明任意解码器的存储下界、机器运行时间、有限硬件实现、学习能力、自更新收敛或经验物理主张；码本基数也不直接等于存储位数。不得将原例子的 $2^n\to n+1$ 行数比较改写成这两条定理的结论。

二维误差 $L/(3k)$ 下最优基数 $3k^2$ 的精确应用已有临时内核检查证据，但没有对应的新增冻结 GID，不能以本节两条 GID 为该完整最优结论附加绿色定理标签。联合构造的内容准入与保留边界仍未解决，见[对应问题](https://github.com/the-omega-institute/trureturing/issues/30256)。上游六条公开定理的逃逸登记审计也仍有[未结项](https://github.com/the-omega-institute/trureturing/issues/30194)；冻结与内核核验不表示这些登记已完成。
