# 第五章 三维凯莱有理正逆桥、伴随旋转与切比雪夫谐波

> *“只要把李代数反对称阵送进有理凯莱分式，一步加减乘除就能严格守住正交球面，连半个自然底数 $e$ 与圆周率 $\pi$ 都不必惊动；一旦流群递推走上切比雪夫整系数轨道，简谐波哪怕运转百亿拍，振幅也绝不偏移一毫。”*

在[第四章](ch04-heaps-and-lie-triple-curvature.md)确立了无原点流群、利雅三元曲率与有号旋量双覆叠之后，我们将目光转向动力学与空间变换的核心操作：**如何把三维切空间里的反对称旋转生成元 $X \in \mathfrak{so}(3, \mathbb{Q})$ 送入三维正交旋转群 $\mathrm{SO}(3, \mathbb{Q})$，再无损反解回来，并让离散旋转与简谐振荡在纯有理数域内永远精准闭合？**

传统教科书在此毫不动摇地祭出矩阵指数 $\exp(X) = \sum_{k=0}^\infty \frac{1}{k!} X^k$、矩阵对数 $\ln\mathbf{R}$ 以及三角函数 $\cos\theta, \sin\theta$。然而任何有限步长的泰勒截断多项式都会当场破坏正交性，迫使数值计算不断注入投影修补与舍入漂移。本章用四套零超越函数的纯有理算子彻底替代这套超越脚手架，并在认识论上清晰对照严格零公理层与经典实阴影层：三维**有理凯莱正逆桥**的闭合方程、恒等正交性、单位行列式与任意有限步迭代保范律，**无奇点双卡 MRP 图册**的归一化分母和为一、构造性 $\frac{1}{2}$ 下界、展开 MRP 等同与闭单位球锁定，**无根号伴随旋转** $\operatorname{Ad}(p)$ 的保内积、缩放不变与乘法同态律，以及有号毕达哥拉斯旋量 `PythSpinor` 的**流群递推单位模方守恒律**，均已在使用 `OmegaInit` 与 `OmegaMath` 的 D5 形式化（`strict_omega.axioms: []`）中由 Lean 内核直接证成；并与经典实阴影侧的**流群切比雪夫谐波闭式**、**连续射线分类定理**及**有理六轴球面覆盖**并置，把离散谐波与超越常数 $\pi$ 的真实出处一次讲透。

## 5.1 废除超越指数：三维有理凯莱正逆变换

任取三维有理向量 $\boldsymbol{\sigma} = (\sigma_1, \sigma_2, \sigma_3)^\top \in \mathbb{Q}^3$，记其反对称叉乘矩阵为

$$
X = [\boldsymbol{\sigma}]_\times := \begin{pmatrix} 0 & -\sigma_3 & \sigma_2 \\ \sigma_3 & 0 & -\sigma_1 \\ -\sigma_2 & \sigma_1 & 0 \end{pmatrix} \in \mathfrak{so}(3, \mathbb{Q}),
$$

使 $X\mathbf{v} = \boldsymbol{\sigma} \times \mathbf{v}$ 且 $X^\top = -X$。由三重叉积恒等式 $\boldsymbol{\sigma}\times(\boldsymbol{\sigma}\times\mathbf{v}) = (\boldsymbol{\sigma}\cdot\mathbf{v})\boldsymbol{\sigma} - \lVert\boldsymbol{\sigma}\rVert^2\mathbf{v}$，反对称阵 $X$ 恒满足三条纯多项式关系：

$$
X\boldsymbol{\sigma} = \mathbf{0}, \qquad X^2 = \boldsymbol{\sigma}\boldsymbol{\sigma}^\top - \lVert\boldsymbol{\sigma}\rVert^2\mathbf{I}, \qquad X^3 = -\lVert\boldsymbol{\sigma}\rVert^2 X.
$$

由此立刻读出其特征多项式 $\det(\lambda\mathbf{I} - X) = \lambda(\lambda^2 + \lVert\boldsymbol{\sigma}\rVert^2)$。代入 $\lambda = 1$ 可见，对一切 $\boldsymbol{\sigma} \in \mathbb{Q}^3$，行列式 $\det(\mathbf{I} - X) = 1 + \lVert\boldsymbol{\sigma}\rVert^2 \ge 1 > 0$ **永远严格为正**，矩阵 $\mathbf{I} - X$ 在有理数域上处处可逆！凯莱（A. Cayley，1846）借这一恒正可逆性搭起了无需无穷级数的正逆有理桥梁。

::: {.definition #def-ch05-rational-cayley-bridge title="三维有理凯莱正逆变换"}
对任意有理生成元 $\boldsymbol{\sigma} \in \mathbb{Q}^3$ 及其反对称阵 $X = [\boldsymbol{\sigma}]_\times \in \mathfrak{so}(3, \mathbb{Q})$，定义**正向有理凯莱变换**：

$$
\mathbf{R}(\boldsymbol{\sigma}) := (\mathbf{I} - X)^{-1}(\mathbf{I} + X) = \frac{\bigl(1 - \lVert\boldsymbol{\sigma}\rVert^2\bigr)\mathbf{I} + 2X + 2\boldsymbol{\sigma}\boldsymbol{\sigma}^\top}{1 + \lVert\boldsymbol{\sigma}\rVert^2} \in \mathrm{SO}(3, \mathbb{Q}).
$$

反之，对任意非半周旋转 $\mathbf{R} \in \mathrm{SO}(3, \mathbb{Q})$（即满足 $\det(\mathbf{R} + \mathbf{I}) \neq 0$，旋转角不为 $180^\circ$），定义**逆向有理凯莱变换**：

$$
X = (\mathbf{R} + \mathbf{I})^{-1}(\mathbf{R} - \mathbf{I}) \in \mathfrak{so}(3, \mathbb{Q}).
$$

:::

所引 D5 声明的严格端记录为 `strict_omega.axioms: []`。我们完全不依赖实数连续统或商公理 `Quot.sound`：三维有理向量以带公共严格正自然数分母的整三元组 `RatVec3` 编码，三维有理矩阵以带公共严格正自然数分母的整矩阵 `RatMat3` 编码，有理相等由交叉相乘等价关系 `RatVec3.Equiv`、`RatMat3.Equiv` 与 `Omega.IntRatio.Equivalent` 刻画。记 $\mathbf{I} - X$ 为 `skewMinus s`、$\mathbf{I} + X$ 为 `skewPlus s`、正向凯莱闭式矩阵 $\mathbf{R}(\boldsymbol{\sigma})$ 为 `Cayley s`，并记从 $\mathbf{v}$ 出发连续作用 $n$ 次凯莱矩阵的结果为 `cayleyIterate s v n`（即 $\mathbf{R}(\boldsymbol{\sigma})^n \mathbf{v}$）。以下四条核心性质在零公理内核中全部无条件成立。

::: {.theorem #thm-ch05-rational-cayley-core title="三维有理凯莱变换的闭合、正交、行列式与迭代保范定理" lean="D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.cayley_identity D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.cayley_orthogonal D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.cayley_det D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.cayley_iterate_norm"}
所引 D5 声明的严格端记录为 `strict_omega.axioms: []`。对任意有理三维向量 `s, v : RatVec3` 与任意自然数 `n : Nat`，正向有理凯莱矩阵 `Cayley s`（记作 $\mathbf{R}(\boldsymbol{\sigma})$）满足以下四条精确恒等式：

1. **去分母凯莱闭合方程**（[`cayley_identity`](lean:D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.cayley_identity)）：在 `RatMat3.Equiv` 下成立

   $$
   (\mathbf{I} - X)\,\mathbf{R}(\boldsymbol{\sigma}) \;\equiv\; \mathbf{I} + X.
   $$

2. **恒等正交性**（[`cayley_orthogonal`](lean:D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.cayley_orthogonal)）：在 `RatMat3.Equiv` 下成立

   $$
   \mathbf{R}(\boldsymbol{\sigma})^\top \mathbf{R}(\boldsymbol{\sigma}) \;\equiv\; \mathbf{I}.
   $$

3. **精确单位行列式**（[`cayley_det`](lean:D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.cayley_det)）：在 `Omega.IntRatio.Equivalent` 下成立

   $$
   \det\mathbf{R}(\boldsymbol{\sigma}) \;\equiv\; 1.
   $$

4. **任意有限步迭代精确保范**（[`cayley_iterate_norm`](lean:D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.cayley_iterate_norm)）：在 `Omega.IntRatio.Equivalent` 下，对一切 $n \in \mathbb{N}$ 成立

   $$
   \bigl\langle \operatorname{cayleyIterate}(\boldsymbol{\sigma}, \mathbf{v}, n),\; \operatorname{cayleyIterate}(\boldsymbol{\sigma}, \mathbf{v}, n)\bigr\rangle \;\equiv\; \langle\mathbf{v}, \mathbf{v}\rangle.
   $$

:::

::: {.proof}
将 `s : RatVec3` 记为 $\boldsymbol{\sigma} = \mathbf{s}_0 / d$，其中整分子 $\mathbf{s}_0 = (x, y, z) \in \mathbb{Z}^3$、公共分母 $d \ge 1$ 严格为正，并构造非零整四元数 $q := (d, x, y, z)$，其整数模方 $N := d^2 + x^2 + y^2 + z^2 \ge 1$ 恒正。记 `Cayley s` 的整分子矩阵为 $C(d, \mathbf{s}_0) := (d^2 - \lVert\mathbf{s}_0\rVert^2)\mathbf{I} + 2d[\mathbf{s}_0]_\times + 2\mathbf{s}_0\mathbf{s}_0^\top$、分母为 $N$，并记 `skewPlus s` 与 `skewMinus s` 的整分子分别为 $S_+ := d\mathbf{I} + [\mathbf{s}_0]_\times$ 与 $S_- := S_+^\top = d\mathbf{I} - [\mathbf{s}_0]_\times$（公共分母 $d$）。直接展开整系数多项式（等价于代入 $[\mathbf{s}_0]_\times \mathbf{s}_0 = \mathbf{0}$ 与 $[\mathbf{s}_0]_\times^2 = \mathbf{s}_0\mathbf{s}_0^\top - \lVert\mathbf{s}_0\rVert^2\mathbf{I}$）立得三条纯整数矩阵恒等式：

$$
S_- C(d, \mathbf{s}_0) = N S_+, \qquad C(d, \mathbf{s}_0)^\top C(d, \mathbf{s}_0) = N^2 \mathbf{I}, \qquad \det C(d, \mathbf{s}_0) = N^3.
$$

由于 $N > 0$，分子分母同约去 $N$、$N^2$ 与 $N^3$ 立刻在 `RatMat3.Equiv` 与 `Omega.IntRatio.Equivalent` 下证毕第 1–3 款。对第 4 款，展开逐分量乘积可见 `Cayley s` 的向量作用与非零四元数 $q = (d, x, y, z)$ 的伴随作用 $\operatorname{Ad}(q)(\mathbf{v})$ 逐位相等，结合下节 [@thm-ch05-rational-adjoint-action] 第 1 款（`ad_dot`）得知单步凯莱映射严格保持三维有理点积；以 $n = 0$ 处的等价自反性为基例对 $n \in \mathbb{N}$ 施数学归纳，即得任意有限步迭代模方恒等于 $\langle\mathbf{v}, \mathbf{v}\rangle$，全程零公理。完整证明由 Lean 内核检查。
:::

在此零公理内核基础之上，两条补充代数性质（逆变换与合成律）同样由两行初等有理矩阵代数确立（手工推导）：

1. **精确互逆**：由 [@thm-ch05-rational-cayley-core] 第 1 款 $(\mathbf{I} - X)\mathbf{R} = \mathbf{I} + X$ 移项得 $\mathbf{R} - \mathbf{I} = X(\mathbf{R} + \mathbf{I})$。只要 $\det(\mathbf{R} + \mathbf{I}) \neq 0$，又因 $\mathbf{R} + \mathbf{I}$ 与 $\mathbf{R} - \mathbf{I}$ 皆为 $\mathbf{R}$ 的多项式而可交换，立得 $X = (\mathbf{R} - \mathbf{I})(\mathbf{R} + \mathbf{I})^{-1} = (\mathbf{R} + \mathbf{I})^{-1}(\mathbf{R} - \mathbf{I})$。
2. **有理罗德里格斯合成与半周双步分解**：当 $1 - \mathbf{a}\cdot\mathbf{b} \neq 0$ 时，两枚凯莱旋转的矩阵积仍由纯有理分式闭合：

   $$
   \mathbf{R}(\mathbf{a})\,\mathbf{R}(\mathbf{b}) = \mathbf{R}\!\left(\frac{\mathbf{a} + \mathbf{b} + \mathbf{a} \times \mathbf{b}}{1 - \mathbf{a}\cdot\mathbf{b}}\right);
   $$

   即便遭遇逆变换奇点处的 $180^\circ$ 半周旋转 $\mathbf{R}_\pi(\mathbf{n}) = \frac{2\mathbf{n}\mathbf{n}^\top}{\lVert\mathbf{n}\rVert^2} - \mathbf{I}$（$\mathbf{n} \in \mathbb{Z}^3 \setminus \{\mathbf{0}\}$），它也精确分解为两步正则有理凯莱旋转之积：$\mathbf{R}(\mathbf{n})\,\mathbf{R}(\mathbf{n}/\lVert\mathbf{n}\rVert^2) = \mathbf{R}_\pi(\mathbf{n})$。

反观传统的指数泰勒截断 $T_k(X) = \sum_{j=0}^k \frac{1}{j!} X^j$（$k \ge 1$，手工推导）：在垂直于 $\boldsymbol{\sigma}$ 的二维旋转平面上，$X^2 = -u\mathbf{I}$（$u := \lVert\boldsymbol{\sigma}\rVert^2$），故 $T_k(X)^\top T_k(X)$ 把该平面内向量的模方乘以非恒常多项式 $M_k(u) = \bigl\lvert\sum_{j=0}^k \frac{(i\sqrt{u})^j}{j!}\bigr\rvert^2$。其中 $M_k(u) - 1$ 次数为 $k$ 且首项系数 $\frac{1}{(k!)^2} > 0$，因此**任意有限阶泰勒截断都不可能在非零生成元邻域上保持正交性**。

::: {.example #ex-ch05-cayley-vs-taylor title="十二步有理凯莱精确锁球对比二阶泰勒膨胀脱轨"}
取有理生成元 $\boldsymbol{\sigma} = \bigl(\frac{1}{2}, \frac{1}{2}, 0\bigr)^\top \in \mathbb{Q}^3$，则 $u = \lVert\boldsymbol{\sigma}\rVert^2 = \frac{1}{2}$、$1 + u = \frac{3}{2}$。代入正向凯莱闭式一步算出纯分数正交阵：

$$
\mathbf{R}\!\left(\tfrac{1}{2}, \tfrac{1}{2}, 0\right) = \frac{1}{3}\begin{pmatrix} 2 & 1 & 2 \\ 1 & 2 & -2 \\ -2 & 2 & 1 \end{pmatrix} \in \mathrm{SO}(3, \mathbb{Q}), \qquad \mathbf{R}^\top\mathbf{R} = \mathbf{I}, \quad \det\mathbf{R} = 1.
$$

将 $\mathbf{R}$ 连续作用 $12$ 次于初始单位向量 $\mathbf{v}_0 = (0, 0, 1)^\top \perp \boldsymbol{\sigma}$，正如 [@thm-ch05-rational-cayley-core] 第 4 款（`cayley_iterate_norm`）对一切 $n \in \mathbb{N}$ 所锁死的，所得有理向量 $\mathbf{R}^{12}\mathbf{v}_0 \in \frac{1}{3^{12}}\mathbb{Z}^3$（精确分母 $3^{12} = 531{,}441$）的模方恒等于精确分数 $\frac{1}{1}$。若对同一反对称生成元 $X = [\boldsymbol{\sigma}]_\times$ 改用二阶泰勒截断 $T_2(X) = \mathbf{I} + X + \frac{1}{2}X^2$，单步模方缩放因子为 $M_2(\frac{1}{2}) = 1 + \frac{u^2}{4} = \frac{17}{16} > 1$，十二步后 $\lVert T_2(X)^{12}\mathbf{v}_0\rVert^2 = \bigl(\frac{17}{16}\bigr)^{12} > 2.069$，早已严重脱离单位球面。
:::

## 5.2 无奇点双卡乘法与分母下界 1/2

上节单卡吉布斯—罗德里格斯合成 $\frac{\mathbf{a}+\mathbf{b}+\mathbf{a}\times\mathbf{b}}{1-\mathbf{a}\cdot\mathbf{b}}$ 在 $\mathbf{a}\cdot\mathbf{b}=1$ 时触到半周旋转的坐标奇点。修正罗德里格斯参数（MRP）先把有理参数提升为有理单位旋量，再在两个分母间切换。它在 $\operatorname{Ad}(S^3(\mathbb{Q}))$ 上给出有界、无奇点的有理乘法。

::: {.definition #def-ch05-dual-chart-star title="双卡无奇点有理乘法算子"}
对任意两枚三维有理参数 $\boldsymbol{\sigma}_A, \boldsymbol{\sigma}_B \in \mathbb{Q}^3$，定义公共分子矢 $\mathbf{N}$、主卡分母 $D_+$ 与对偶阴影卡分母 $D_-$：

$$
\mathbf{N}(\boldsymbol{\sigma}_A, \boldsymbol{\sigma}_B) := \bigl(1 - \lVert\boldsymbol{\sigma}_A\rVert^2\bigr)\boldsymbol{\sigma}_B + \bigl(1 - \lVert\boldsymbol{\sigma}_B\rVert^2\bigr)\boldsymbol{\sigma}_A + 2(\boldsymbol{\sigma}_A \times \boldsymbol{\sigma}_B),
$$

$$
D_+(\boldsymbol{\sigma}_A, \boldsymbol{\sigma}_B) := 1 + \lVert\boldsymbol{\sigma}_A\rVert^2\lVert\boldsymbol{\sigma}_B\rVert^2 - 2(\boldsymbol{\sigma}_A \cdot \boldsymbol{\sigma}_B), \qquad D_-(\boldsymbol{\sigma}_A, \boldsymbol{\sigma}_B) := \lVert\boldsymbol{\sigma}_A + \boldsymbol{\sigma}_B\rVert^2.
$$

定义**无奇点双卡乘法** $\star_{\mathcal{S}}$ 为

$$
\boldsymbol{\sigma}_A \star_{\mathcal{S}} \boldsymbol{\sigma}_B := \begin{cases} +\dfrac{\mathbf{N}(\boldsymbol{\sigma}_A, \boldsymbol{\sigma}_B)}{D_+}, & D_+ \ge D_-, \\[8pt] -\dfrac{\mathbf{N}(\boldsymbol{\sigma}_A, \boldsymbol{\sigma}_B)}{D_-}, & D_+ < D_-. \end{cases}
$$

:::

球极旋量提升 $Q(\boldsymbol{\sigma})=\frac{(1-\lVert\boldsymbol{\sigma}\rVert^2)\mathbf{1}+2\boldsymbol{\sigma}}{1+\lVert\boldsymbol{\sigma}\rVert^2}\in S^3(\mathbb{Q})$ 满足 $Q(-\boldsymbol{\sigma}/\lVert\boldsymbol{\sigma}\rVert^2)=-Q(\boldsymbol{\sigma})$（$\boldsymbol{\sigma}\ne0$）。两枚互为反号的旋量给出同一个伴随旋转。若需追踪旋量符号，选取 $D_-$ 时翻转一位符号即可。

反过来，给定有理单位旋量 $(w,\mathbf{v})$，选符号使 $w\ge0$，再取 $\boldsymbol{\sigma}=\mathbf{v}/(1+w)$。代回 $Q$ 即还原该旋量，且 $\lVert\boldsymbol{\sigma}\rVert^2=(1-w)/(1+w)\le1$。于是有理闭单位球内的 MRP 参数恰好覆盖该旋量子群的伴随像。下一节的整数 $90^\circ$ 旋转会给出像外的例子。

所引 D5 声明的严格端记录为 `strict_omega.axioms: []`。整套双卡图册无需任何实数或经典选择公理即可直接用 `PythSpinor` 与 `RatVec3` 锁定。对两枚有理三维向量 `u, v : RatVec3`（分别记作 $\mathbf{u} = \mathbf{x}/d$ 与 $\mathbf{v} = \mathbf{y}/e$，整分子 $\mathbf{x}, \mathbf{y} \in \mathbb{Z}^3$，严格正分母 $d, e \ge 1$），先借球极提升 `lift u` $:= ((d^2 - \lVert\mathbf{x}\rVert^2,\, 2d\mathbf{x});\; d^2 + \lVert\mathbf{x}\rVert^2) : \mathrm{PythSpinor}$ 形成旋量乘积 $p := \operatorname{product}(\mathbf{u}, \mathbf{v}) := (\operatorname{lift}\mathbf{u})\cdot(\operatorname{lift}\mathbf{v})$，其标量部记为 $w_p := p.\mathrm{num}.w$、虚部记为 $\mathbf{v}_p := \operatorname{Vec3.imaginary}(p.\mathrm{num})$、严格正半径记为 $r_p := p.\mathrm{radius} = (d^2 + \lVert\mathbf{x}\rVert^2)(e^2 + \lVert\mathbf{y}\rVert^2) > 0$。定义一对**归一化双卡分母**

$$
\operatorname{denomPlus}(\mathbf{u}, \mathbf{v}) := \frac{r_p + w_p}{2 r_p}, \qquad \operatorname{denomMinus}(\mathbf{u}, \mathbf{v}) := \frac{r_p - w_p}{2 r_p} \;\in\; \mathrm{IntRatio},
$$

以及去输入分母后的**展开 MRP 整分子**

$$
\operatorname{mrpPlusNum}(\mathbf{u}, \mathbf{v}) := d^2 e^2 + \lVert\mathbf{x}\rVert^2\lVert\mathbf{y}\rVert^2 - 2de(\mathbf{x}\cdot\mathbf{y}), \qquad \operatorname{mrpMinusNum}(\mathbf{u}, \mathbf{v}) := \lVert\mathbf{x}\rVert^2 e^2 + d^2\lVert\mathbf{y}\rVert^2 + 2de(\mathbf{x}\cdot\mathbf{y}),
$$

并按 $w_p \ge 0$ 取正号、$w_p < 0$ 取负号的构造性符号切换 `orientNumerator`，定义选定卡的球极输出 `output u v` $:= \operatorname{orientNumerator}(w_p, \mathbf{v}_p) / (r_p + \lvert w_p\rvert) : \mathrm{RatVec3}$。下面这条零公理内核定理一举确立归一化分母的 MRP 展开、精确归一和、零选择公理的 $\frac{1}{2}$ 构造下界以及输出闭球锁定。

::: {.theorem #thm-ch05-dual-chart-singularity-free title="双卡修正罗德里格斯分母归一化、构造性半界与闭单位球锁定" lean="D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.dual_chart_mrp_denominators D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.dual_chart_denom_sum_one D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.dual_chart_denom_ge_half D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.dual_chart_ball_containment"}
所引 D5 声明的严格端记录为 `strict_omega.axioms: []`。对任意两枚三维有理向量 `u, v : RatVec3`，记 $r_p := (\operatorname{product}(\mathbf{u}, \mathbf{v})).\mathrm{radius}$ 与分母前驱 $r := (\operatorname{product}(\mathbf{u}, \mathbf{v})).\mathrm{radiusPred}$（故 $r + 1 = r_p$）。则以下四条定理无条件成立：

1. **归一化分母与展开 MRP 分式精确等同**（[`dual_chart_mrp_denominators`](lean:D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.dual_chart_mrp_denominators)）：在 `Omega.IntRatio.Equivalent` 下同时成立

   $$
   \operatorname{denomPlus}(\mathbf{u}, \mathbf{v}) \;\equiv\; \frac{\operatorname{mrpPlusNum}(\mathbf{u}, \mathbf{v})}{r_p}
   \qquad \text{且} \qquad
   \operatorname{denomMinus}(\mathbf{u}, \mathbf{v}) \;\equiv\; \frac{\operatorname{mrpMinusNum}(\mathbf{u}, \mathbf{v})}{r_p}.
   $$

2. **归一化双分母之和恒等于一**（[`dual_chart_denom_sum_one`](lean:D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.dual_chart_denom_sum_one)）：在 `Omega.IntRatio.Equivalent` 下成立

   $$
   \operatorname{denomPlus}(\mathbf{u}, \mathbf{v}) + \operatorname{denomMinus}(\mathbf{u}, \mathbf{v}) \;\equiv\; 1.
   $$

3. **无选择公理的构造性半界析取**（[`dual_chart_denom_ge_half`](lean:D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.dual_chart_denom_ge_half)）：在有理序 `Omega.IntRatio.Le` 下成立构造性析取（零 `Classical.choice`）

   $$
   \frac{1}{2} \le \operatorname{denomPlus}(\mathbf{u}, \mathbf{v})
   \quad \lor \quad
   \frac{1}{2} \le \operatorname{denomMinus}(\mathbf{u}, \mathbf{v}).
   $$

4. **双卡输出自动锁入三维闭单位球**（[`dual_chart_ball_containment`](lean:D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.dual_chart_ball_containment)）：在 `Omega.IntRatio.Le` 下成立

   $$
   \bigl\langle\operatorname{output}(\mathbf{u}, \mathbf{v}),\, \operatorname{output}(\mathbf{u}, \mathbf{v})\bigr\rangle \;\le\; 1.
   $$
:::

::: {.proof}
对第 1 款，展开球极旋量积的半径 $r_p = (d^2 + \lVert\mathbf{x}\rVert^2)(e^2 + \lVert\mathbf{y}\rVert^2)$ 与标量部 $w_p = (d^2 - \lVert\mathbf{x}\rVert^2)(e^2 - \lVert\mathbf{y}\rVert^2) - 4de(\mathbf{x}\cdot\mathbf{y})$，直接整系数多项式合并即得 $r_p + w_p = 2\,\operatorname{mrpPlusNum}(\mathbf{u}, \mathbf{v})$ 与 $r_p - w_p = 2\,\operatorname{mrpMinusNum}(\mathbf{u}, \mathbf{v})$；在 `Omega.IntRatio.Equivalent` 下约去公因子 $2$ 即证毕两式。对第 2 款，分子相加得 $(r_p + w_p) + (r_p - w_p) = 2r_p$，与严格正公分母 $2r_p$ 约分归于 $1$。对第 3 款，直接对有号整数 $w_p$ 施行归纳分情形（`Int.rec`）：若 $w_p = a \ge 0$，则交叉差 $2(r_p + a) - 2r_p = 2a \ge 0$ 构造性给出左支 $\frac{1}{2} \le \operatorname{denomPlus}(\mathbf{u}, \mathbf{v})$；若 $w_p = -(a + 1) < 0$，则 $r_p - w_p = r_p + a + 1$ 对应交叉差 $2(a + 1) \ge 0$ 构造性给出右支 $\frac{1}{2} \le \operatorname{denomMinus}(\mathbf{u}, \mathbf{v})$，全程不碰 `Classical.choice`。对第 4 款，记 $a := \lvert w_p\rvert$ 与 $s := \lVert\mathbf{v}_p\rVert^2$；符号翻转 `orientNumerator` 保持平方和 $s$ 不变，结合旋量模方等式 $a^2 + s = r_p^2$ 代入多项式恒等式 $(r_p + a)^2 - s = (r_p^2 - (a^2 + s)) + 2a(r_p + a)$，得精确非负余量 $2a(r_p + a) \ge 0$，从而 $\lVert\operatorname{output}(\mathbf{u}, \mathbf{v})\rVert^2 = s / (r_p + a)^2 \le 1$。本声明仅依赖 `OmegaInit` 与 `OmegaMath`，传递公理闭包为空集。完整证明由 Lean 内核检查。
:::

把 [@thm-ch05-dual-chart-singularity-free] 与 [@def-ch05-dual-chart-star] 中的未归一化 MRP 分母 $D_+, D_-$ 精确对接（手工推导）：分子与分母同除 $d^2 e^2$ 可见 $\operatorname{mrpPlusNum}(\mathbf{u}, \mathbf{v}) = d^2 e^2 D_+(\mathbf{u}, \mathbf{v})$、$\operatorname{mrpMinusNum}(\mathbf{u}, \mathbf{v}) = d^2 e^2 D_-(\mathbf{u}, \mathbf{v})$，且 $r_p = d^2 e^2(1 + \lVert\mathbf{u}\rVert^2)(1 + \lVert\mathbf{v}\rVert^2) = d^2 e^2(D_+ + D_-)$。因此归一化分母正是比例份额 $\operatorname{denomPlus} \equiv \frac{D_+}{D_+ + D_-}$ 与 $\operatorname{denomMinus} \equiv \frac{D_-}{D_+ + D_-}$，而由虚部展开 $\mathbf{v}_p = 2d^2 e^2 \mathbf{N}(\mathbf{u}, \mathbf{v})$ 与 $w_p \ge 0 \iff D_+ \ge D_-$，选定卡输出 `output u v` 与 $\mathbf{u} \star_{\mathcal{S}} \mathbf{v}$ 逐位重合。因为 $D_+ + D_- = (1 + \lVert\mathbf{u}\rVert^2)(1 + \lVert\mathbf{v}\rVert^2) \ge 1$，第 3 款的归一化半界立时同步导出未归一化分母的全局下界 $\max(D_+, D_-) = (D_+ + D_-)\max(\operatorname{denomPlus}, \operatorname{denomMinus}) \ge \frac{1}{2}(1 + \lVert\mathbf{u}\rVert^2)(1 + \lVert\mathbf{v}\rVert^2) \ge \frac{1}{2}$；且分子模方分解 $\lVert\mathbf{N}\rVert^2 = D_+ D_-$ 从另一侧印证了第 4 款的闭球锁定 $\lVert\mathbf{u} \star_{\mathcal{S}} \mathbf{v}\rVert^2 = \frac{\min(D_+, D_-)}{\max(D_+, D_-)} \le 1$。单次除法既永不触零，又无需任何人工再归一化。

下图把前两节的核心几何机制并置呈现：一边是精确驻留单位球面的有理凯莱变换（[@thm-ch05-rational-cayley-core]）对比向外膨胀脱轨的二阶泰勒截断，另一边则是以零公理半界与闭球锁定定理（[@thm-ch05-dual-chart-singularity-free]）将合成结果锁在单位闭球内的双卡切换结构。

::: {.figure src="ch05-cayley-dual-chart"}
**三维有理凯莱锁球轨道对比泰勒截断漂移，以及无奇点双卡切换下界 $\max(D_+, D_-) \ge \frac{1}{2}$。** 图中对照正向有理凯莱迭代 $\mathbf{R}(\boldsymbol{\sigma})^n \mathbf{v}_0$ 在每一步精确保持单位模方（反观二阶泰勒截断 $T_2(X)$ 沿径向逐步膨胀脱轨），并展示双卡乘法 $\boldsymbol{\sigma}_A \star_{\mathcal{S}} \boldsymbol{\sigma}_B$ 在主卡分母 $D_+$ 与阴影卡分母 $D_-$ 之间切换时如何借助 $D_+ + D_- = (1 + \lVert\boldsymbol{\sigma}_A\rVert^2)(1 + \lVert\boldsymbol{\sigma}_B\rVert^2) \ge 1$ 保证 $\max(D_+, D_-) \ge \frac{1}{2}$ 与自动锁球；定理见 [@thm-ch05-rational-cayley-core]，双卡定义见 [@def-ch05-dual-chart-star]，十二步数值算例见 [@ex-ch05-cayley-vs-taylor]。
:::

## 5.3 无根号伴随旋转：非平方模方也能生成整数正交阵

如果把视角进一步抬升到齐次四元整载体 `ProjTernion`，连双卡切换本身也可以省去。这里隐藏着一个极其精妙的有理代数奇迹：**即使一枚整四元组 $p = (w, x, y, z) \in \mathbb{Z}^4 \setminus \{\mathbf{0}\}$ 的模方 $\lVert p\rVert^2$ 不是完全平方数——因而在传统线性代数中归一化 $p / \lVert p\rVert$ 必然强行引入无理平方根——它在三维空间上诱导的伴随旋转却依然 $100\%$ 落在有理正交群 $\mathrm{SO}(3, \mathbb{Q})$ 之内！**

::: {.definition #def-ch05-rational-adjoint title="无根号齐次伴随旋转"}
对任意非零整（或有理）四元组 $p = (w, x, y, z) = (w, \mathbf{u}) \in \mathbb{Z}^4 \setminus \{\mathbf{0}\}$，令 $N := \lVert p\rVert^2 = w^2 + x^2 + y^2 + z^2 \ge 1$。它在三维纯虚空间 $\mathbb{Q}^3$ 上诱导的**无根号伴随作用**定义为

$$
\operatorname{Ad}(p)(\mathbf{v}) := \frac{p\,\mathbf{v}\,\bar{p}}{\lVert p\rVert^2} = \frac{\bigl(w^2 - \lVert\mathbf{u}\rVert^2\bigr)\mathbf{v} + 2w(\mathbf{u} \times \mathbf{v}) + 2(\mathbf{u}\cdot\mathbf{v})\mathbf{u}}{w^2 + \lVert\mathbf{u}\rVert^2}.
$$

写成显式 $3 \times 3$ 有理矩阵即

$$
\operatorname{Ad}(p) = \frac{1}{N}\begin{pmatrix}
w^2 + x^2 - y^2 - z^2 & 2(xy - wz) & 2(xz + wy) \\
2(xy + wz) & w^2 - x^2 + y^2 - z^2 & 2(yz - wx) \\
2(xz - wy) & 2(yz + wx) & w^2 - x^2 - y^2 + z^2
\end{pmatrix} \in \mathrm{SO}(3, \mathbb{Q}).
$$

:::

为什么根号凭空蒸发了？因为共轭作用同时在两侧乘上 $p$ 与 $\bar{p}$，把本该出现两次的 $\sqrt{N}$ 合并成了单一严格正整数分母 $N = \lVert p\rVert^2 \in \mathbb{Z}_{>0}$！这一无根号伴随作用的三条基本代数法则——三维有理内积守恒、非零整缩放不变（含符号翻转 $p \mapsto -p$）以及四元数乘法同态——已在使用 `OmegaInit` 与 `OmegaMath` 的 D5 形式化（`strict_omega.axioms: []`）中由 Lean 内核直接锁死。

::: {.theorem #thm-ch05-rational-adjoint-action title="无根号齐次伴随旋转的保内积、缩放不变与乘法同态定理" lean="D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.ad_dot D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.ad_scale D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.ad_hom"}
所引 D5 声明的严格端记录为 `strict_omega.axioms: []`。设 `p, q : Quaternion` 为满足非零条件 `p.Nonzero` 与 `q.Nonzero` 的整四元数，`k : Int` 为任意非零有号整数（$k \neq 0$），`u, v : RatVec3` 为任意有理三维向量。则齐次无根号伴随作用 `Ad` 满足：

1. **有理内积守恒**（[`ad_dot`](lean:D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.ad_dot)）：在 `Omega.IntRatio.Equivalent` 下成立

   $$
   \bigl\langle \operatorname{Ad}(p)\mathbf{u},\; \operatorname{Ad}(p)\mathbf{v}\bigr\rangle \;\equiv\; \langle\mathbf{u}, \mathbf{v}\rangle.
   $$

2. **非零整缩放不变性**（[`ad_scale`](lean:D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.ad_scale)）：在 `RatVec3.Equiv` 下成立

   $$
   \operatorname{Ad}(k p)\mathbf{v} \;\equiv\; \operatorname{Ad}(p)\mathbf{v}.
   $$

3. **群乘法同态律**（[`ad_hom`](lean:D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.ad_hom)）：在 `RatVec3.Equiv` 下成立

   $$
   \operatorname{Ad}(p q)\mathbf{v} \;\equiv\; \operatorname{Ad}(p)\bigl(\operatorname{Ad}(q)\mathbf{v}\bigr).
   $$

:::

::: {.proof}
对任意整三维向量 $\mathbf{w} \in \mathbb{Z}^3$（嵌入为纯虚四元数），直接展开整系数多项式可知双侧共轭积 $p\,\mathbf{w}\,\bar{p}$ 的标量部恒为零，因此其纯虚部 `adjointNum p w` 在四元数环中即等于 $p\,\mathbf{w}\,\bar{p}$。由四元数左右乘的模方内积伸缩律，立得整数内积恒等式 $\langle p\,\mathbf{u}_0\,\bar{p},\, p\,\mathbf{v}_0\,\bar{p}\rangle = \langle\mathbf{u}_0, \mathbf{v}_0\rangle \cdot \lVert p\rVert^4$；因 `p.Nonzero` 保证 $\lVert p\rVert^2 > 0$，分子中的 $\lVert p\rVert^4 > 0$ 与分母 $(\lVert p\rVert^2 d_u)(\lVert p\rVert^2 d_v)$ 中的 $\lVert p\rVert^4$ 精确抵消，证毕第 1 款。对第 2 款，将 $p$ 缩放为 $kp$（$k \neq 0$）使双线性分子 `adjointNum` 与分母 $\lVert p\rVert^2$ 同乘严格正因子 $k^2 = \lvert k\rvert^2 > 0$，交叉相乘即得 `RatVec3.Equiv`。对第 3 款，由四元数结合律、共轭反同态 $\overline{pq} = \bar{q}\bar{p}$ 与 $q\,\mathbf{v}_0\,\bar{q}$ 的纯虚性得 $(pq)\mathbf{v}_0\overline{pq} = p(q\mathbf{v}_0\bar{q})\bar{p}$，再由四平方范数乘性 $\lVert pq\rVert^2 = \lVert p\rVert^2\lVert q\rVert^2$ 知两端分子与分母逐项相等，从而在 `RatVec3.Equiv` 下零公理证毕。完整证明由 Lean 内核检查。
:::

由 [@thm-ch05-rational-adjoint-action] 第 2 款立见 $\operatorname{Ad}(-p)\equiv\operatorname{Ad}(p)$。直接展开（手工推导）还有 $\operatorname{Ad}(\bar p)=\operatorname{Ad}(p)^\top$。若写 $p=(w,\mathbf{u})$，则 $w\ne0$ 时 $\operatorname{Ad}(p)=\mathbf{R}(\mathbf{u}/w)$，而 $w=0$ 时 $\operatorname{Ad}(0,\mathbf{u})=2\mathbf{u}\mathbf{u}^\top/\lVert\mathbf{u}\rVert^2-\mathbf{I}$。前一式接住了普通凯莱逆式覆盖的所有有理旋转，后一式接住了半周旋转。后者的轴可取 $\ker(R-\mathbf{I})$ 中一个非零有理向量，因为该零空间可用有理消元求得。两种情况都可清分母得到整四元组。

若两个非零有理四元数给出同一伴随旋转，它们的商与 $\mathbf{i},\mathbf{j},\mathbf{k}$ 都交换，故是非零有理标量。因此每个旋转对应一条有理射线。该射线有有理单位代表元当且仅当任一代表元的平方范数是有理平方数。有单位代表元时恰有互为反号的两个。

::: {.example #ex-ch05-phalf-integer-rotation title="非平方模方整态 pHalf = (1, 1, 0, 0) 的精确整数 90° 旋转"}
考察赤道正交锚态 `pHalf` $= (1, 1, 0, 0)$：其模方 $N = 1^2 + 1^2 = 2$ 并非有理平方数，若强行归一化为单位旋量则被迫写出无理数 $\frac{1 + \mathbf{i}}{\sqrt{2}}$。然而代入无根号伴随公式 $\operatorname{Ad}(p_{\mathrm{Half}})$，分母 $2$ 与分子中的公因子 $2$ 全部约尽，竟给出整系数 $90^\circ$ 旋转矩阵：

$$
\operatorname{Ad}(1, 1, 0, 0) = \frac{1}{2}\begin{pmatrix} 2 & 0 & 0 \\ 0 & 0 & -2 \\ 0 & 2 & 0 \end{pmatrix} = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 0 & -1 \\ 0 & 1 & 0 \end{pmatrix} \in \mathrm{SO}(3, \mathbb{Z}),
$$

即绕第一轴的精确 $90^\circ$ 映射 $(x, y, z) \mapsto (x, -z, y)$！同理，体对角整态 $g_{120} = (1, 1, 1, 1)$（$N = 4$）给出精确坐标循环置换 $\operatorname{Ad}(1, 1, 1, 1)(x, y, z) = (z, x, y) \in \mathrm{SO}(3, \mathbb{Z})$；模方为 $5$（亦非平方数）的赫维茨素旋子 $(1, 2, 0, 0)$ 给出公分母仅为 $5$ 的有理旋转 $\frac{1}{5}\bigl(\begin{smallmatrix} 5 & 0 & 0 \\ 0 & -3 & -4 \\ 0 & 4 & -3 \end{smallmatrix}\bigr) \in \mathrm{SO}(3, \mathbb{Q})$。

这枚绕第一轴的整数矩阵迹为 $1$。单位四元数 $(w,\mathbf{v})$ 的伴随矩阵对角线之和为 $4w^2-1$，因此这里必须有 $w^2=1/2$。这个方程无有理解，所以 $p_{\mathrm{Half}}$ 的伴随旋转落在普通有理凯莱图内，却没有有理 MRP 表示。双卡分母半界和闭球结论适用于有理 MRP 输入所合成的旋转。
:::

## 5.4 流群切比雪夫谐波、连续射线分类与有理六轴球面覆盖

确立了无超越数的三维旋转后，我们转向时间演化中的简谐振荡与大范围球面覆盖。在[第四章](ch04-heaps-and-lie-triple-curvature.md)中，[@thm-ch04-anchored-heap-and-reflection] 已经证明迭代流群反射 $x_{n+2} = [x_{n+1}, x_n, x_{n+1}]$ 等同于定基群中的等步幂次 $b^n$，而 [@def-ch04-pyth-spinor-and-bridge] 则构筑了严格区分 $\pm p$ 的有号毕达哥拉斯旋量载体 `PythSpinor`（带整四元组分子与严格正半径 $r > 0$，满足 $\lVert p_{\mathrm{num}}\rVert^2 = r^2$）。在使用 `OmegaInit` 与 `OmegaMath` 的 D5 形式化（`strict_omega.axioms: []`）内部，这条有号旋量流群递推在每一个节拍 $n \in \mathbb{N}$ 上都严格守住精确有理单位模方，全程无需实数或开方。

::: {.theorem #thm-ch05-spinor-heap-norm-preserved title="有号毕达哥拉斯旋量流群递推的单位模方守恒定理" lean="D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.heap_norm_preserved"}
所引 D5 声明的严格端记录为 `strict_omega.axioms: []`。设 `a, b : PythSpinor` 为任意两枚有号毕达哥拉斯旋量，记 `heapAt a b n : PythSpinor` 为以 $x_0 = a$、$x_1 = b$ 为初值的迭代流群反射序列 $x_{n+2} = [x_{n+1}, x_n, x_{n+1}]$ 在第 $n$ 拍的状态，并记 `spinorNormSq p` 为旋量 $p$ 的有理平方范数 $\lVert p_{\mathrm{num}}\rVert^2 / r^2 \in \mathrm{IntRatio}$。则对一切自然数 `n : Nat`，在 `Omega.IntRatio.Equivalent` 下恒有

$$
\operatorname{spinorNormSq}\bigl(\operatorname{heapAt}(a, b, n)\bigr) \;\equiv\; 1.
$$

:::

::: {.proof}
从初值对 $(a, b)$ 出发，递推每一步将相邻状态对 $(x_n, x_{n+1})$ 推进为 $(x_{n+1},\, [x_{n+1}, x_n, x_{n+1}])$；由四平方范数乘性，有号毕达哥拉斯旋量在三元流群反射下封闭，故每一拍 $p := \operatorname{heapAt}(a, b, n)$ 都继续满足毕达哥拉斯模方方程 $\lVert p_{\mathrm{num}}\rVert^2 = r^2$ 且半径 $r := p_{\mathrm{radius}} > 0$ 严格为正。于是分母 $r^2 > 0$ 且分子与之相等，直接给出 `spinorNormSq p` $= r^2 / r^2 \equiv 1$ 在 `Omega.IntRatio.Equivalent` 下零公理成立。完整证明由 Lean 内核检查。
:::

[@thm-ch05-spinor-heap-norm-preserved] 在严格零公理层将任意步数的有号旋量流群轨迹永久锁在有理单位球面之上。现在对照经典实四元数阴影侧（`Mathlib` 中的 $\mathbb{H}$）：把同一条非线性三次递推投射到实四元数上时，它进一步显露出与整系数切比雪夫多项式 $T_n, U_n \in \mathbb{Z}[X]$ 之间的精确充要等价性。

::: {.theorem #thm-ch05-chebyshev-heap-recurrence title="四元数流群递推的模方守恒与切比雪夫闭式" lean="D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev"}
设 $x : \mathbb{N} \to \mathbb{H}$ 为四元数序列，记首步实内积 $c := \langle x_0, x_1\rangle$，以 $T_n, U_n \in \mathbb{Z}[X]$ 记第一、二类切比雪夫多项式（并约定 $n = 0$ 时 $U_{-1} = 0$）。则以下两条陈述充要等价：

1. 首两项具单位模方且全序列满足无原点流群反射递推：

   $$
   \operatorname{normSq}(x_0) = 1 \;\land\; \operatorname{normSq}(x_1) = 1 \;\land\; \forall\, n \in \mathbb{N},\; x_{n+2} = x_{n+1}\,\bar{x}_n\,x_{n+1};
   $$

2. 对一切 $n \in \mathbb{N}$，全序列严格保持单位模方并满足切比雪夫闭式与内积余弦律：

   $$
   \operatorname{normSq}(x_n) = 1, \qquad x_{n+1} = U_n(c)\,x_1 - U_{n-1}(c)\,x_0, \qquad \langle x_0, x_n\rangle = T_n(c).
   $$

:::

::: {.proof}
正向推导依托四元数反射恒等式 $a\bar{b}a = 2\langle a, b\rangle a - \operatorname{normSq}(a)\,b$。当 $\operatorname{normSq}(x_n) = \operatorname{normSq}(x_{n+1}) = 1$ 时，由模方乘性立得 $\operatorname{normSq}(x_{n+2}) = 1$，且相邻内积守恒 $\langle x_{n+1}, x_{n+2}\rangle = \langle x_{n+1}, x_{n+1}\bar{x}_n x_{n+1}\rangle = \langle x_n, x_{n+1}\rangle = c$。于是三次流群递推化为常系数二阶递推 $x_{n+2} = 2c\,x_{n+1} - x_n$，按 $n$ 归纳直接匹配 $U_{n+1}(c) = 2c\,U_n(c) - U_{n-1}(c)$，再与 $x_0$ 作内积由 $c\,U_{n-1}(c) - U_{n-2}(c) = T_n(c)$ 得 $\langle x_0, x_n\rangle = T_n(c)$。反向由切比雪夫多项式恒等式直接核验首两项模方及 $x_{n+1}\bar{x}_n x_{n+1} = 2c\,x_{n+1} - x_n = x_{n+2}$。完整证明由 Lean 内核检查。
:::

合看零公理定理 [@thm-ch05-spinor-heap-norm-preserved] 与经典阴影定理 [@thm-ch05-chebyshev-heap-recurrence]：若初值取自有理单位旋量 $x_0, x_1 \in S^3(\mathbb{Q})$（故 $c = \langle x_0, x_1\rangle \in \mathbb{Q}$），则 $x_{n+2} = 2c\,x_{n+1} - x_n$ 仅需两次有理数乘加即可永久在单位球面上步进，读数 $\kappa(x_0, x_n) = \frac{1 + T_n(c)}{2} \in \mathbb{Q} \cap [0, 1]$ 生成零能量漂移的**纯有理谐波**。

::: {.example #ex-ch05-rational-harmonic-stepping title="有理种子 c = 3/5 的切比雪夫谐波前四拍实算"}
取 $x_0 = (1, 0, 0, 0)$ 与毕达哥拉斯凯莱点 $x_1 = Q(\frac{1}{2}, 0, 0) = (\frac{3}{5}, \frac{4}{5}, 0, 0)$，于是 $c = \frac{3}{5}$、$\kappa_1 = \frac{4}{5}$。按线性流群递推 $x_{n+1} = \frac{6}{5}x_n - x_{n-1}$ 逐拍展开：

| 节拍 $n$ | 有理状态 $x_n \in S^3(\mathbb{Q})$ | 模方核验 $\lVert x_n\rVert^2$ | 切比雪夫值 $T_n(3/5)$ | 保真度 $\kappa(x_0, x_n)$ |
| :---: | :---: | :---: | :---: | :---: |
| $0$ | $(1, 0, 0, 0)$ | $1/1$ | $1$ | $1$ |
| $1$ | $(\frac{3}{5}, \frac{4}{5}, 0, 0)$ | $\frac{9 + 16}{25} = 1$ | $\frac{3}{5}$ | $\frac{4}{5}$ |
| $2$ | $(-\frac{7}{25}, \frac{24}{25}, 0, 0)$ | $\frac{49 + 576}{625} = 1$ | $-\frac{7}{25}$ | $\frac{9}{25}$ |
| $3$ | $(-\frac{117}{125}, \frac{44}{125}, 0, 0)$ | $\frac{13689 + 1936}{15625} = 1$ | $-\frac{117}{125}$ | $\frac{4}{125}$ |
| $4$ | $(-\frac{527}{625}, -\frac{336}{625}, 0, 0)$ | $\frac{277729 + 112896}{390625} = 1$ | $-\frac{527}{625}$ | $\frac{49}{625}$ |

检验倍增关系：$\kappa_2 = (2\cdot\frac{4}{5} - 1)^2 = \frac{9}{25}$，$\kappa_4 = (2\cdot\frac{9}{25} - 1)^2 = \frac{49}{625}$，全程不见半个 $\sin$、$\cos$ 或浮点数舍入，而每一步均严丝合缝地留在 $S^3(\mathbb{Q})$ 之上。
:::

至此，两道深层问题自然收束到一起：既然流群倍增律 $\varphi(g^2) = (2\varphi(g) - 1)^2$ 与切比雪夫递推完全不需要圆周率 $\pi$，那么经典物理中的 $\pi$ 与 $\cos^2$ 究竟是在哪一步闯进来的？另一方面，在三维旋转的基底单位球面 $S^2$ 上，能否完全不用无理数与三角函数就构筑出无正交对的有限开覆盖？下面这条经典实阴影侧的冻结定理同时回答了这两个问题。

::: {.theorem #thm-ch05-continuous-ray-and-six-axis title="连续射线倍角律分类与模方 5 有理六轴球面开覆盖" lean="D5/S3/Quantum/Algebra/Comparison/RoundTripPeriodMetric.comparison_classification_of_continuous_rays D5/S3/Geometry/Orthogonality/RationalSixAxisCover.rational_six_axis_open_cover"}
以下两条分别刻画连续切射线倍角分类与球面有理覆盖的定理在内核中严格成立：

1. **连续射线倍角律分类**（[`comparison_classification_of_continuous_rays`](lean:D5/S3/Quantum/Algebra/Comparison/RoundTripPeriodMetric.comparison_classification_of_continuous_rays)）：设 $A$ 为有限维实赋范代数，$L \subseteq A$ 为对换位子 $[X, Y] = XY - YX$ 封闭的实线性子空间，$G \le A^\times$ 为满足 $\exp(L) \subseteq G$ 及 $\forall g \in G,\; g L g^{-1} \subseteq L$ 的子群。若 $\varphi : G \to [0, 1]$ 满足忠实性 $\varphi(g) = 1 \iff g = 1$、倍角律 $\varphi(g^2) = (2\varphi(g) - 1)^2$、共轭不变性 $\varphi(kgk^{-1}) = \varphi(g)$，且对一切 $X \in L$ 沿连续射线 $t \mapsto \varphi(\exp tX)$ 连续，则存在 $L$ 上正定且 $\operatorname{ad}$-不变的对称双线性型 $h$，使：

   - 对一切 $t \in \mathbb{R}$ 与 $X \in L$，$\varphi(\exp tX) = \cos^2\bigl(t\sqrt{h(X, X)/2}\bigr)$；
   - 对一切非零 $X \in L$，存在最小正返回周期 $T > 0$ 使 $\exp(tX) = 1 \iff t \in T\mathbb{Z}$，且 $h(X, X) = \frac{2\pi^2}{T^2}$；
   - 任意非零元的中心化子为一维直线，从而 $\dim_{\mathbb{R}} L \in \{0, 1, 3\}$；当 $\dim_{\mathbb{R}} L = 3$ 时存在 $h$-标准正交基 $b_0, b_1, b_2$ 与 $\mu > 0$ 使 $[b_0, b_1] = \mu b_2$（轮换成立）。

2. **无根号有理六轴球面开覆盖**（[`rational_six_axis_open_cover`](lean:D5/S3/Geometry/Orthogonality/RationalSixAxisCover.rational_six_axis_open_cover)）：在 $\mathbb{R}^3$ 中取六根模方均为 $5$ 的纯整数轴

   $$
   \mathrm{axis}_i \in \bigl\{(1, \pm 2, 0),\; (0, 1, \pm 2),\; (\pm 2, 0, 1)\bigr\},
   $$

   并定义六个无根号有理不等式区域 $U_i := \bigl\{x \in S^2 : 2\langle x, \mathrm{axis}_i\rangle^2 > 5\bigr\}$。则每个 $U_i$ 皆为 $S^2$ 上的相对开集，每个 $U_i$ 内部均不含任何互相正交的单位向量对，且六个区域之并覆盖整只单位二球面：$S^2 = \bigcup_{i=1}^6 U_i$。
:::

::: {.proof}
第 1 款先在固定非零方向 $X \in L$ 上令 $p(t) := 2\varphi(\exp tX) - 1$，由忠实性、指数局部单射与倍角方程 $p(2t) = 2p(t)^2 - 1$ 导出最小正周期 $T > 0$ 与 $p(t) = \cos(2\pi t/T)$；再由左乘表示复化迹型 $B(X, Y) = -\operatorname{Re}\operatorname{tr}(\rho(X)\rho(Y))$ 在去心连通切空间上锁定共同归一化周期 $T_0$，令 $h := 2(\pi/T_0)^2 B$ 得到共轭不变内积、中心化子一维性与维数锁定 $\{0, 1, 3\}$。第 2 款中，每个 $U_i$ 由严格二次不等式定义故为相对开集；若 $x, y \in S^2$ 正交，贝塞尔不等式给出 $\langle x, \mathrm{axis}_i\rangle^2 + \langle y, \mathrm{axis}_i\rangle^2 \le \lVert\mathrm{axis}_i\rVert^2 = 5$，故两者的 $2\langle\cdot, \mathrm{axis}_i\rangle^2$ 不可能同时严格大于 $5$，从而 $U_i$ 内无正交对；对任意 $x \in S^2$ 在三对轮换轴中各取同号支，总有一支满足 $2\langle x, \mathrm{axis}_i\rangle^2 > 5$，覆盖整个 $S^2$。完整证明由 Lean 内核检查。
:::

下面的短片把本章的四套无超越数机制依次串起来：一次除法的凯莱桥、双卡半界、无根号伴随旋转与切比雪夫节拍，最后停在 $\pi$ 真正进来的地方。

::: {.film src="rotation-without-exponentials"}
**一次除法、两张坐标卡、无根号伴随与切比雪夫节拍：转动全程只用精确分数（2 分 39 秒）。** 青色的凯莱轨道把 $(0, 0, 1)$ 连转十二次，停在 $(302680, -302680, -314959)/3^{12}$，模方恰为 $1$；品红的二阶泰勒螺线每步把模方乘以 $\frac{17}{16}$，十二步后超过 $2.069$（屏幕计算，见 [@ex-ch05-cayley-vs-taylor]），绿色标签对应 [@thm-ch05-rational-cayley-core] 第 4 款。份额条显示双卡分母的归一化份额：输入 $(1, 0, 0)$ 与 $(\frac{1}{2}, \frac{1}{2}, 0)$ 时 $D_+$ 只占 $\frac{1}{6}$，阴影卡接手，结果 $(-\frac{1}{5}, 0, -\frac{2}{5})$ 落在单位闭球内（屏幕计算），绿色半界标签对应 [@thm-ch05-dual-chart-singularity-free] 第 3 款。$p_{\mathrm{Half}} = (1, 1, 0, 0)$ 的伴随矩阵约掉分母 $2$ 成为整数 $90^\circ$ 转动（屏幕计算，见 [@ex-ch05-phalf-integer-rotation]），绿色标签对应 [@thm-ch05-rational-adjoint-action] 第 1 款。单位圆上的节拍按 $x_{n+1} = \frac{6}{5}x_n - x_{n-1}$ 前进，内积为 $T_n(\frac{3}{5})$，第二十拍分母为 $5^{20}$、模方仍为 $1$（屏幕计算，见 [@ex-ch05-rational-harmonic-stepping]），两枚绿色标签对应 [@thm-ch05-spinor-heap-norm-preserved] 与经典实阴影侧的 [@thm-ch05-chebyshev-heap-recurrence]。最后一幕的连续射线公式与线框球面上的六顶帽子对应经典实阴影侧的 [@thm-ch05-continuous-ray-and-six-axis]，琥珀色帽子与点 $(2, 2, 1)/3$ 的得分 $8 > 5$ 为屏幕计算，余弦曲线为示意；紫色框中“$\pi$ 是实数时钟的代价”是 [@rem-ch05-where-pi-enters] 的解读。
:::

在进入第六章之前，不妨打开下面的交互实验卡，将本章的三套无超越数旋转机制放在同一座三维舞台上实时对照：调节有理生成元 $\boldsymbol{\sigma}$ 与迭代步数，直观比较精确锁球的 $\mathbf{R}(\boldsymbol{\sigma})$ 及无根号整系数伴随旋转 $\operatorname{Ad}(p_{\mathrm{Half}})$ 如何始终严守单位模方 $1/1$，而二阶泰勒截断 $T_2(X)$ 步步向外漂移；再把相同的有理坐标另作 MRP 输入，实时检查分母下界 $\max(D_+, D_-) \ge \frac{1}{2}$ 如何永不触零并将结果锁在三维单位闭球之内。

::: {.viz src="ternion-cayley-lab" preset="cayley3d-vs-taylor-drift" height="520"}
**三维有理凯莱旋转 $\mathbf{R}(\boldsymbol{\sigma})$、无根号伴随旋转 $\operatorname{Ad}(p_{\mathrm{Half}})$ 对比泰勒漂移与双卡分母下界实验。** 实时迭代比较精确有理凯莱变换与二阶泰勒截断 $T_2(X)$ 的模方漂移，核验非平方模方锚点 `pHalf = (1, 1, 0, 0)` 的整系数 $90^\circ$ 伴随作用，并观测双卡乘法中 $\max(D_+, D_-) \ge \frac{1}{2}$ 在有理 MRP 输入上的无奇点切换；证明见 [@thm-ch05-rational-cayley-core] 与 [@thm-ch05-rational-adjoint-action]，双卡与数值对照见 [@def-ch05-dual-chart-star]、[@ex-ch05-cayley-vs-taylor] 与 [@ex-ch05-phalf-integer-rotation]。
:::

::: {.remark #rem-ch05-where-pi-enters title="圆周率从何闯入，以及迈向球面有理三角学"}
[@thm-ch05-continuous-ray-and-six-axis] 第 1 款给“无超越数数学”提供了最犀利的反向诊断：纯离散的倍角律 $\varphi(g^2) = (2\varphi(g) - 1)^2$、有理凯莱与无奇点双卡乘法（[@thm-ch05-rational-cayley-core]、[@thm-ch05-dual-chart-singularity-free]）、无根号伴随旋转（[@thm-ch05-rational-adjoint-action]）以及有号旋量流群递推（[@thm-ch05-spinor-heap-norm-preserved]）里根本没有 $\pi$；圆周率 $\pi$ 仅仅在我们离开流群本体、强行用平直实数轴参数 $t \mapsto \exp(tX)$ 线性拉伸弯曲大圆时，才通过周期标度 $h(X, X) = 2\pi^2/T^2$ 渗入公式。而第 2 款中那六根模方为 $5$ 的整坐标轴则昭示：即使在二维球面的全局覆盖问题上，我们只需纯整数平方不等式 $2\langle x, \mathrm{axis}_i\rangle^2 > 5$，完全无需正弦、余弦与开方。顺着这条彻底消去三角函数的轨道前进，[第六章](ch06-bargmann-gram-spherical-trigonometry.md)将立起整个第二卷的收官支柱——**球面有理三角基本定理（巴格曼—格拉姆闭合律）**。
:::
