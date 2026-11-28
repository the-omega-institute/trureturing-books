# 第十二章 二次扩张域与有理舒尔正定性 {#第十二章-零公理二次扩张域与有理舒尔正定性}

> *“遇到 $\sqrt{2}$ 或黄金比 $\varphi$ 并不需要退回依赖选择公理的实数连续统；只需在有理数对上添入一条有限二次关系 $\alpha^2 = b\alpha + c$，所有代数极值、切比雪夫五角闭环与舒尔补正定证书都在有限步四则运算内零公理闭合。”*

前两章在纯有理数域 $\mathbb{Q}$ 内走到了令人惊叹的深度：整自旋特征标 $E_n(\kappa)$ 消除了根号，三维球面哈尔积分 $H(a, b, c, d)$ 消除了 $\pi$。然而，物理与几何中确实存在三类无法留在 $\mathbb{Q}$ 内部的硬边界对象：

1. **沿同一射线作单位归一化**：齐次赤道态 `pHalf = (1, 1, 0, 0)` 的模方 $\lVert p_{\mathrm{Half}}\rVert^2 = 2$ 不是平方数。尽管它的射影保真度 $\kappa = \frac{1}{2}$ 与伴随旋转 $\operatorname{Ad}(p_{\mathrm{Half}}) \in \mathrm{SO}(3, \mathbb{Z})$ 全是有理数，一旦要求沿同一射线取单位旋量 $p_{\mathrm{Half}} / \lVert p_{\mathrm{Half}}\rVert$，就不可避免地碰上 $\sqrt{2}$；
2. **量子非定域极值**：克劳泽—霍恩—西蒙尼—霍尔特（CHSH）贝尔不等式的齐雷尔森（Tsirelson）量子天花板精确等于 $2\sqrt{2}$；
3. **五重对称与黄金切比雪夫闭合**：五角形与二十面体旋量周期对应的余弦 $\cos(\pi/5) = \varphi/2$ 满足不可约二次方程 $4x^2 - 2x - 1 = 0$。

传统分析遇到这三道门槛时，会不加思索地把整个系统一脚踢进由柯西商集与选择公理构造的实数域 $\mathbb{R}$。本章展现 `OmegaMath` 的精准外科手术：**绝不为了添一枚二次根号而吞下整座不可数实无穷连续统**。只需直接把既约有理数或有限比值打包成有序对，构造零公理二次代数扩张域 `QuadPoly(b, c)`（及其整参数有理实现 `RatQuadPoly b c`），再配合有理拉格朗日—格拉姆恒等式与分块舒尔补配方法，就能在无极限、无特征值数值逼近的纯代数世界里一口气打通旋量极值与算子正定性——全套二次范数乘性、精确求逆、`QSqrt2` 与 `QPhi` 极值、五角切比雪夫闭合以及有理拉格朗日—舒尔极小值定理，均已在使用 `OmegaInit` 与 `OmegaMath` 的 D5 形式化（`strict_omega.axioms: []`）中由 Lean 内核直接证成。

---

## 12.1 二次代数扩张域 QuadPoly(b, c) 的纯有序对构造 {#sec-ch12-quadpoly-extensions}

所谓二次扩张 $\mathbb{Q}[\alpha]/(\alpha^2 - b\alpha - c)$（其中 $b, c \in \mathbb{Q}$），并不需要先在实数轴上“找到”一个无限不循环小数 $\alpha$。在裸归纳构造演算（CIC）中，它纯粹是由两个有理数构成的有序对 $(p, q) \in \mathbb{Q}^2$（记作 $p + q\alpha$），连同由替换规则 $\alpha^2 \mapsto b\alpha + c$ 唯一决定的有限步四则运算。

::: {.definition #def-ch12-quadpoly title="二次代数扩张环与域的有序对定义"}
固定有理参数 $b, c \in \mathbb{Q}$，定义二次商代数 $\operatorname{QuadPoly}(b, c) := \mathbb{Q}[\alpha]/(\alpha^2 - b\alpha - c)$ 的载体为有理数有序对 $(p, q) \in \mathbb{Q} \times \mathbb{Q}$（直观记为 $p + q\alpha$），并赋予如下零公理有理运算：

1. **加减法与乘法**：

   $$
   (p, q) \pm (r, s) \;=\; (p \pm r,\; q \pm s), \qquad (p, q) \cdot (r, s) \;=\; (pr + c q s,\; ps + qr + b q s);
   $$

2. **伽罗瓦共轭（Galois conjugation）**：利用韦达定理 $\alpha + \bar{\alpha} = b$，定义

   $$
   \overline{(p, q)} \;:=\; (p + bq,\; -q);
   $$

3. **伽罗瓦范数（Galois norm）与精确求逆**：定义有理值范数

   $$
   N(p, q) \;:=\; p^2 + b p q - c q^2 \;\in\; \mathbb{Q}.
   $$

   当 $N(p, q) \neq 0$ 时，$(p, q)$ 的精确乘法逆元由四次有理运算直接给出：

   $$
   (p, q)^{-1} \;=\; \left(\frac{p + bq}{N(p, q)},\; \frac{-q}{N(p, q)}\right).
   $$

:::

上述结构的一切核心域论性质，都是展开有序对即可一眼验明的纯多项式恒等式，零极限、零公理：

- **共轭乘积恒等式**：直接展开 $(p, q)\cdot\overline{(p, q)}$，一次项系数为 $-pq + q(p + bq) - bq^2 = 0$，常数项系数为 $p(p + bq) - cq^2 = N(p, q)$，故 $(p, q)\cdot\overline{(p, q)} = (N(p, q), 0)$，乘以 $N(p, q)^{-1}$ 立即验证 $(p, q)\cdot(p, q)^{-1} = (1, 0)$；
- **伽罗瓦自同构与范数乘性**：逐项展开核对即知 $\overline{x \cdot y} = \bar{x}\cdot\bar{y}$，于是立即收获**普遍范数乘性律**

  $$
  N(x \cdot y) \;=\; (x \cdot y)\,\overline{(x \cdot y)} \;=\; x\bar{x}\,y\bar{y} \;=\; N(x)\,N(y);
  $$

- **不可约判别式与真域判据**：令判别式 $\Delta := b^2 + 4c \in \mathbb{Q}$，配方立得

  $$
  4\,N(p, q) \;=\; (2p + bq)^2 - \Delta\,q^2.
  $$

  只要 $\Delta$ 不是有理数的平方，任何非零有序对 $(p, q) \neq (0, 0)$ 必满足 $N(p, q) \neq 0$（否则若 $q \neq 0$ 便得 $\Delta = ((2p+bq)/q)^2$，矛盾；若 $q = 0$ 则 $p = 0$）。此时 `QuadPoly(b, c)` 无需商集、无需选择公理，直接成为一座**可计算、可判定的真二次代数数域**！

---

## 12.2 两座核心物理扩张域：QSqrt2 与 QPhi {#sec-ch12-qsqrt2-and-qphi}

将参数 $(b, c)$ 特化为两组最基础的整系数，便立刻覆盖了量子测量极值与五重几何对称的全部精确代数结构。

### 12.2.1 QSqrt2（$b = 0, c = 2$）：单位 $90^\circ$ 旋量与 CHSH 齐雷尔森极值 {#sec-ch12-qsqrt2-chsh}

取 $b = 0,\; c = 2$（关系式 $\delta^2 = 2$，判别式 $\Delta = 8$ 非有理平方数），得到零公理扩张域 $\operatorname{QSqrt2} = \mathbb{Q}[\delta]/(\delta^2 - 2)$，共轭为 $\overline{p + q\delta} = p - q\delta$，范数为 $N(p, q) = p^2 - 2q^2$。在这座域上，两项曾经似乎非实数不可的构造瞬间化为精确代数：

1. **单位 $90^\circ$ 旋量 $u_{90^\circ}$ 与八拍双覆叠闭合**：沿赤道射线 `pHalf = (1, 1, 0, 0)` 取单位旋量 $u_{90^\circ} := \frac{\delta}{2}(1 + \mathbf{i})$。它的模方在 `QSqrt2` 内精确等于 $\bigl(\frac{\delta}{2}\bigr)^2 + \bigl(\frac{\delta}{2}\bigr)^2 = \frac{2}{4} + \frac{2}{4} = 1$；逐拍自乘给出

   $$
   u_{90^\circ}^2 \;=\; \frac{\delta^2}{4}(1 + 2\mathbf{i} - 1) \;=\; \mathbf{i}, \qquad u_{90^\circ}^4 \;=\; -1, \qquad u_{90^\circ}^8 \;=\; 1.
   $$

   伴随空间每拍旋转 $90^\circ$：第四拍转满 $360^\circ$ 精确翻号为 $-1$，第八拍转满 $720^\circ$ 完整回归 $+1$。

2. **零浮点误差的 CHSH 齐雷尔森天花板**：在最大纠缠贝尔态 $\lvert\Phi^+\rangle = \frac{\delta}{2}(\lvert 00\rangle + \lvert 11\rangle)$ 上（其泡利关联满足 $\langle Z \otimes Z\rangle = \langle X \otimes X\rangle = 1$，$\langle Z \otimes X\rangle = \langle X \otimes Z\rangle = 0$），取四枚定义在 `QSqrt2` 上的自伴酉可观测量

   $$
   A_0 = Z, \qquad A_1 = X, \qquad B_0 = \frac{\delta}{2}(Z + X), \qquad B_1 = \frac{\delta}{2}(Z - X).
   $$

   直接由 $Z^2 = X^2 = I$、$ZX + XZ = 0$ 与 $\delta^2 = 2$ 即验明 $B_0^2 = B_1^2 = \frac{\delta^2}{4}(2I) = I$。四项双边关联精确等于 $\langle A_0 \otimes B_0\rangle = \langle A_0 \otimes B_1\rangle = \langle A_1 \otimes B_0\rangle = +\frac{\delta}{2}$ 与 $\langle A_1 \otimes B_1\rangle = -\frac{\delta}{2}$，因此贝尔组合值精确锁定为

   $$
   S_{\mathrm{CHSH}} \;=\; \langle A_0 \otimes B_0\rangle + \langle A_0 \otimes B_1\rangle + \langle A_1 \otimes B_0\rangle - \langle A_1 \otimes B_1\rangle \;=\; 2\delta, \qquad S_{\mathrm{CHSH}}^2 \;=\; 4\delta^2 \;=\; 8.
   $$

   在算子阴影层上，任意自伴酉算符组对应的 CHSH 算符 $C = A_0\otimes(B_0 + B_1) + A_1\otimes(B_0 - B_1)$ 满足兰道恒等式 $C^2 = 4I - [A_0, A_1]\otimes[B_0, B_1]$，故 $\lVert C\rVert^2 \le 8$；上述 `QSqrt2` 代数构造以纯有限算术精确触顶。

一般整参数有理二次代数 `RatQuadPoly b c` 的范数乘性与非零范数精确求逆，连同 `QSqrt2` 中单位 $90^\circ$ 旋量八拍闭合与 CHSH 平方极值，均已在使用 `OmegaInit` 与 `OmegaMath` 的 D5 形式化（`strict_omega.axioms: []`）中由 Lean 内核直接证成：

::: {.theorem #thm-ch12-zero-axiom-quadpoly-qsqrt2 title="二次扩张范数乘性、精确求逆与 QSqrt2 旋量及贝尔极值" lean="D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.quadratic_norm_mul D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.quadratic_mul_inv D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.sqrt_two_spinor D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.sqrt_two_bell"}
所引 D5 声明的严格端记录为 `strict_omega.axioms: []`。以下四条定理严格成立：

1. **普遍二次范数乘性律**（`quadratic_norm_mul`）：对任意整数参数 `b c : Omega.Int` 及任意 `z w : RatQuadPoly b c`，在 `Omega.FiniteRatio.Equivalent` 下恒有

   $$
   N(z \cdot w) \;\equiv\; N(z)\,N(w).
   $$

2. **非零范数精确求逆**（`quadratic_mul_inv`）：对任意整数参数 `b c : Omega.Int` 与 `z : RatQuadPoly b c`，只要范数分子非零（`(norm z).num ≠ 0`），即在 `QuadPoly.Equivalent` 下精确满足

   $$
   z \cdot z^{-1} \;\equiv\; 1.
   $$

3. **单位 $90^\circ$ 旋量归一化与八拍闭合**（`sqrt_two_spinor`）：在 `QSqrt2` 中，直角旋量 `u90` 同时满足标量模方 $\operatorname{normSq}(u_{90}) \equiv 1$（`QSqrt2.scalarRing.eqv`）与旋量八次幂 $u_{90}^8 \equiv 1$（`QSqrt2.spinorRing.eqv`）。

4. **CHSH 贝尔组合平方锁定**（`sqrt_two_bell`）：在 `QSqrt2` 中，贝尔组合 `QSqrt2.bell` 在 `QSqrt2.scalarRing.eqv` 下精确满足

   $$
   \mathrm{bell}^2 \;\equiv\; 8.
   $$

:::

::: {.proof}
前两款在 `module` $+$ `prelude` 隔离环境中直接对有序对乘法 `(pr + cqs, ps + qr + bqs)` 与范数 $N(p, q) = p^2 + bpq - cq^2$ 展开验证：直接展开并利用有限有理环交换律与结合律得 $N(zw) \equiv N(z)N(w)$；当范数分子非零时，`z.inv` 的分母非零，直接代入 $z \cdot \bar{z} = (N(z), 0)$ 约去 $N(z)$ 得 $z \cdot z^{-1} \equiv 1$。后两款在 `QSqrt2`（$\delta^2 = 2$）中对 `u90` 直接核验模方 $\frac{\delta^2}{4} + \frac{\delta^2}{4} \equiv 1$ 与三次连续平方 $u_{90}^2 \equiv \mathbf{i}$、$u_{90}^4 \equiv -1$、$u_{90}^8 \equiv 1$，并对 `QSqrt2.bell` 展开平方得 $4\delta^2 \equiv 8$。完整证明由 Lean 内核检查。
:::

### 12.2.2 QPhi（$b = 1, c = 1$）：斐波那契幂律、卡西尼范数与五角切比雪夫闭合 {#sec-ch12-qphi-fibonacci-pentagon}

取 $b = 1,\; c = 1$（关系式 $\varphi^2 = \varphi + 1$，判别式 $\Delta = 5$ 非有理平方数），得到黄金二次扩张域 $\operatorname{QPhi} = \mathbb{Q}[\varphi]/(\varphi^2 - \varphi - 1)$，共轭为 $\overline{p + q\varphi} = (p + q) - q\varphi$（即 $\bar{\varphi} = 1 - \varphi$），范数为 $N(p, q) = p^2 + pq - q^2$。三条贯穿数论与五重几何的黄金定律在此成为三行归纳：

1. **普遍斐波那契幂律**：记斐波那契数列 $F_0 = 0, F_1 = 1, F_{n+1} = F_n + F_{n-1}$。对 $n = 1$ 有 $\varphi^1 = 0 + 1\cdot\varphi = F_0 + F_1\varphi$；若 $\varphi^n = F_{n-1} + F_n\varphi$，则

   $$
   \varphi^{n+1} \;=\; F_{n-1}\varphi + F_n(\varphi + 1) \;=\; F_n + (F_{n-1} + F_n)\varphi \;=\; F_n + F_{n+1}\varphi.
   $$

   由此对一切正整数 $n \ge 1$ 普遍成立 $\varphi^n = F_{n-1} + F_n\varphi$。

2. **普遍伽罗瓦范数与卡西尼恒等式**：因 $N(\varphi) = N(0, 1) = 0 + 0 - 1 = -1$，由普遍范数乘性律立得

   $$
   N(\varphi^n) \;=\; N(\varphi)^n \;=\; (-1)^n \quad \Longrightarrow \quad F_{n-1}^2 + F_{n-1}F_n - F_n^2 \;=\; F_{n+1}F_{n-1} - F_n^2 \;=\; (-1)^n.
   $$

3. **无三角函数的五角切比雪夫精确闭合**：无需调用 $\cos(\pi/5)$ 或 $\cos(2\pi/5)$，直接分解五阶第一类切比雪夫多项式 $T_5(x) = 16x^5 - 20x^3 + 5x$：

   $$
   T_5(x) + 1 \;=\; (x + 1)(4x^2 - 2x - 1)^2, \qquad T_5(x) - 1 \;=\; (x - 1)(4x^2 + 2x - 1)^2.
   $$

   在 `QPhi` 内检验 $x_1 := \frac{\varphi}{2}$：$4(\frac{\varphi}{2})^2 - 2(\frac{\varphi}{2}) - 1 = \varphi^2 - \varphi - 1 = 0$，立即得到 $T_5(\varphi/2) = -1$，再由倍角复合 $T_{10}(x) = 2 T_5(x)^2 - 1$ 立刻闭合至 $T_{10}(\varphi/2) = 2(-1)^2 - 1 = 1$！同时检验 $x_2 := \frac{\varphi - 1}{2}$：$4(\frac{\varphi - 1}{2})^2 + 2(\frac{\varphi - 1}{2}) - 1 = (\varphi^2 - 2\varphi + 1) + (\varphi - 1) - 1 = \varphi^2 - \varphi - 1 = 0$，立得 $T_5\bigl(\frac{\varphi - 1}{2}\bigr) = 1$。

这三条黄金定律均已在使用 `OmegaInit` 与 `OmegaMath` 的 D5 形式化（`strict_omega.axioms: []`）中跨 `OmegaQuadraticAndSchur` 与 `OmegaChebyshevHecke` 联合证成：

::: {.theorem #thm-ch12-zero-axiom-qphi-fibonacci-pentagon title="黄金扩张 QPhi 斐波那契幂律、范数律与五角切比雪夫闭合" lean="D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.phi_fibonacci D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.phi_power_norm D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.pentagonal_chebyshev"}
在所引 D5 声明（`strict_omega.axioms: []`）使用的黄金二次扩张 `QPhi`（$b = 1, c = 1$，即 $\varphi^2 = \varphi + 1$）中，以下三条定理严格成立：

1. **斐波那契幂律**（`phi_fibonacci`）：对一切自然数 `n : Omega.Nat`，在 `QuadPoly.Equivalent` 下恒有

   $$
   \varphi^{n+1} \;\equiv\; F_n + F_{n+1}\,\varphi.
   $$

2. **黄金幂次伽罗瓦范数律**（`phi_power_norm`）：对一切自然数 `n : Omega.Nat`，在 `Omega.FiniteRatio.Equivalent` 下恒有

   $$
   N(\varphi^n) \;\equiv\; (-1)^n.
   $$

3. **五角第一类切比雪夫精确闭合**（`pentagonal_chebyshev`）：在 `QPhi.scalarRing.eqv` 下同时成立

   $$
   T_5\!\left(\frac{\varphi}{2}\right) \;\equiv\; -1, \qquad T_{10}\!\left(\frac{\varphi}{2}\right) \;\equiv\; 1, \qquad T_5\!\left(\frac{\varphi - 1}{2}\right) \;\equiv\; 1.
   $$

:::

::: {.proof}
第 1 款对 $n \in \mathbb{N}$ 归纳：基例 $n = 0$ 时 $\varphi^1 = (0, 1) = (F_0, F_1)$；归纳步把 $\varphi^{n+1} \equiv F_n + F_{n+1}\varphi$ 乘以 $\varphi$ 并代入 $\varphi^2 = \varphi + 1$ 得 $F_{n+1} + (F_n + F_{n+1})\varphi = F_{n+1} + F_{n+2}\varphi$。第 2 款由基例 $N(\varphi^0) = 1$ 与 $N(\varphi) = -1$ 结合 [@thm-ch12-zero-axiom-quadpoly-qsqrt2] 的范数乘性律对 $n$ 归纳即得 $N(\varphi^n) \equiv (-1)^n$。第 3 款在 `QPhi.scalarRing` 中按切比雪夫递推直接求值（配合 $\varphi^2 = \varphi + 1$ 与倍阶公式 $T_{10}(x) = 2 T_5(x)^2 - 1$），零三角函数即证毕三项等式。完整证明由 Lean 内核检查。
:::

::: {.example #ex-ch12-quadpoly-ledger title="二次扩张域 QSqrt2 与 QPhi 的逐项代数核验账本"}
将两座域的生成关系与递推验证浓缩如下（纯有序对算术手算）：

- **`QSqrt2` 中的逆元与 CHSH 核算**：$(1, 1)^{-1} = (1 + \delta)^{-1}$ 满足 $N(1, 1) = 1 - 2 = -1$，故 $(1, 1)^{-1} = (-1, 1)$；验证 $(1, 1)(-1, 1) = (-1 + 2, 1 - 1) = (1, 0)$。在 CHSH 极值处，四项关联之和 $S = (0, \frac{1}{2}) + (0, \frac{1}{2}) + (0, \frac{1}{2}) - (0, -\frac{1}{2}) = (0, 2)$，其平方 $(0, 2)(0, 2) = (2\cdot 4, 0) = (8, 0)$。
- **`QPhi` 中的高次幂与切比雪夫逐拍轨道**：取 $n = 12$，斐波那契数 $F_{11} = 89,\; F_{12} = 144$ 给出 $\varphi^{12} = (89, 144)$，核验范数 $N(89, 144) = 89^2 + 89\cdot 144 - 144^2 = 7921 + 12816 - 20736 = 1 = (-1)^{12}$。对 $x_1 = (0, \frac{1}{2})$ 逐拍计算切比雪夫递推 $T_{k+1}(x) = 2x T_k(x) - T_{k-1}(x)$：

  $$
  T_0(x_1) = 1, \quad T_1(x_1) = \frac{\varphi}{2}, \quad T_2(x_1) = \frac{\varphi - 1}{2}, \quad T_3(x_1) = \frac{1 - \varphi}{2}, \quad T_4(x_1) = -\frac{\varphi}{2}, \quad T_5(x_1) = -1,
  $$

  恰好画出正十边形的半周精确有理轨道，第十拍 $T_{10}(\varphi/2) = 1$ 严丝合缝闭合！
:::

---

## 12.3 有理拉格朗日—格拉姆恒等式与分块舒尔补正定性 {#sec-ch12-lagrange-schur-positivity}

解决了代数扩张之后，调和分析与量子界还面临最关键的一类不等式：**如何不求无理特征值、不借连续极值定理，就证明一个二次型或格拉姆矩阵半正定并求出它的精确最小值？**

答案藏在两把古老却锋利无比的纯有理代数手术刀之中——**平方和配方（拉格朗日恒等式）**与**块消元配方（舒尔补）**。先看最透明的二元二次型：当 $c > 0$ 时，对任意有理数 $a, b, c$ 与变量 $x, y$，直接展开右端即验明如下精确恒等式：

$$
a x^2 + 2 b x y + c y^2 \;=\; \left(a - \frac{b^2}{c}\right)x^2 \;+\; c\!\left(y + \frac{b}{c}x\right)^2.
$$

这一行初等配方同时完成了两件大事：第一，它把二次型拆成了两个完全平方的加权和，从而**半正定判据完全归约为两条有理不等式 $c > 0$ 与 $S := a - b^2/c \ge 0$**，根本不需要求解特征多项式的无理根；第二，由于 $c > 0$ 且平方项非负，对固定边界变量 $x$，内部变量 $y$ 跑遍全域时的精确最小值无条件落在唯一消元点 $y^* = -\frac{b}{c}x$ 处，最小取值恰等于舒尔补二次型 $S x^2 = (a - b^2/c)x^2$！

这整套纯有理正定与极小化引擎——涵盖任意有限有理坐标对序列的拉格朗日—格拉姆恒等式与柯西—施瓦茨不等式，以及任意非零主元的标量舒尔配方与正主元全局可达极小值——均已在使用 `OmegaInit` 与 `OmegaMath` 的 D5 形式化（`strict_omega.axioms: []`）中直接对 `Omega.FiniteRatio` 证成：

::: {.theorem #thm-ch12-zero-axiom-lagrange-schur title="有理拉格朗日—格拉姆恒等式、柯西—施瓦茨不等式与标量舒尔补极小值" lean="D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.rational_lagrange_gram D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.rational_cauchy_schwarz D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.rational_schur_complete D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.rational_schur_min"}
所引 D5 声明的严格端记录为 `strict_omega.axioms: []`。以下四条有理正定与极小值定理严格成立：

1. **有理拉格朗日—格拉姆恒等式**（`rational_lagrange_gram`）：对任意有限有理坐标对序列 `xs : Sequence (CoordinatePair FiniteRatio)`，在 `Omega.FiniteRatio.Equivalent` 下恒有

   $$
   \operatorname{gramDet}(\mathrm{xs}) \;\equiv\; \operatorname{minorSquares}(\mathrm{xs}),
   $$

   其中 $\operatorname{gramDet}(\mathrm{xs}) = \operatorname{sumU2}(\mathrm{xs})\cdot\operatorname{sumV2}(\mathrm{xs}) - (\operatorname{sumUV}(\mathrm{xs}))^2$，$\operatorname{minorSquares}(\mathrm{xs})$ 为全部两两坐标子式平方 $(u_i v_j - u_j v_i)^2$（$i < j$）之和。

2. **有理柯西—施瓦茨不等式**（`rational_cauchy_schwarz`）：对任意有限有理坐标对序列 `xs : Sequence (CoordinatePair FiniteRatio)`，在有理序 `FiniteRatio.Le` 下恒有

   $$
   \bigl(\operatorname{sumUV}(\mathrm{xs})\bigr)^2 \;\le\; \operatorname{sumU2}(\mathrm{xs}) \cdot \operatorname{sumV2}(\mathrm{xs}).
   $$

3. **非零主元有理舒尔配方恒等式**（`rational_schur_complete`）：对任意有限有理数 `a b c x y : Omega.FiniteRatio`，只要主元非零（`c.num ≠ 0`，正负皆可），在 `Omega.FiniteRatio.Equivalent` 下恒有

   $$
   a x^2 + 2 b x y + c y^2 \;\equiv\; \left(a - \frac{b^2}{c}\right)x^2 \;+\; c\!\left(y + \frac{b}{c}x\right)^2.
   $$

4. **正主元全局可达舒尔极小值**（`rational_schur_min`）：对任意有限有理数 `a b c x : Omega.FiniteRatio`，只要主元严格为正（$0 < c$，即 `FiniteRatio.zero.Lt c`），则同时成立：

   - 对一切 `y : Omega.FiniteRatio`，在 `FiniteRatio.Le` 下满足 $(a - b^2/c)x^2 \le a x^2 + 2 b x y + c y^2$；
   - 在显式消元点 $y^* = -(b/c)x$（`schurMinPoint b c x`）处，在 `Omega.FiniteRatio.Equivalent` 下精确取到该下界：$a x^2 + 2 b x y^* + c (y^*)^2 \equiv (a - b^2/c)x^2$。
:::

::: {.proof}
第 1 款对有限序列 `xs` 作结构归纳，在交换环定律下展开新增一项 `(u, v)` 后 `gramDet` 的增量，恰好等于该项与其余各项构成的 $2 \times 2$ 子式平方和，全程无需除以 $2$；第 2 款由 `Omega.FiniteRatio` 中任意平方非负推出 `minorSquares xs ≥ 0`，结合第 1 款立得柯西—施瓦茨不等式；第 3 款在 `c.num ≠ 0` 保证有理倒数存在的前提下直接展开右端并消去 $\pm (b^2/c)x^2$；第 4 款在 $0 < c$ 下由平方项 $c(y + (b/c)x)^2 \ge 0$ 给出全局下界，并代入 $y^* = -(b/c)x$ 使平方项归零从而精确触达舒尔值。完整证明由 Lean 内核检查。
:::

对照上述零公理核心，经典实复分析阴影层同样在 Lean 内核中保留了高维实求和版与任意有限维复分块矩阵版的对应定理。首先，任意有限指标集上的实数拉格朗日—格拉姆恒等式把柯西—施瓦茨亏量显式写成二重外积楔平方和：

::: {.theorem #thm-ch12-lagrange-gram title="拉格朗日—格拉姆平方和恒等式" lean="D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity"}
设 $\iota$ 为任意指标类型，$s \subseteq \iota$ 为有限子集，$u, v : \iota \to \mathbb{R}$ 为实值函数。则柯西—施瓦茨亏量恒等于显式非负平方和：

$$
\left(\sum_{i \in s} u_i^2\right)\left(\sum_{i \in s} v_i^2\right) - \left(\sum_{i \in s} u_i v_i\right)^2 \;=\; \frac{1}{2}\sum_{i \in s}\sum_{j \in s} (u_i v_j - u_j v_i)^2.
$$

:::

::: {.proof}
将右端二重求和内的 $(u_i v_j - u_j v_i)^2 = u_i^2 v_j^2 + u_j^2 v_i^2 - 2 u_i v_i u_j v_j$ 逐项展开，利用有限求和交换次序得 $\sum_{i,j} u_j^2 v_i^2 = \sum_{i,j} u_i^2 v_j^2$，从而合并为 $2\bigl(\sum_i u_i^2\bigr)\bigl(\sum_j v_j^2\bigr) - 2\bigl(\sum_i u_i v_i\bigr)^2$，两边除以 $2$ 即证。完整证明由 Lean 内核检查。
:::

而上述二元配方法的任意有限维矩阵推广，正是分块舒尔补极小值定理。它在[第十八章](ch18-zero-axiom-kernel-and-shadow-bridge.md)与观察者记忆窗切分中同样扮演核心骨架：将状态向量切分为外部可见分量 $x$ 与内部隐藏分量 $y$，当内部块 $C$ 严格正定时，对内部自由度 $y$ 取极小化严格等于边界上的舒尔补矩阵 $S = A - B C^{-1} B^{\mathsf{H}}$。

::: {.theorem #thm-ch12-schur-minimum title="分块舒尔补二次型是内部变量的精确最小值" lean="D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least"}
设 $m, n$ 为有限指标类型，$A \in M_m(\mathbb{C})$ 为厄米矩阵，$B \in M_{m \times n}(\mathbb{C})$ 为任意复矩阵，$C \in M_n(\mathbb{C})$ 为严格正定矩阵。记舒尔补矩阵 $S := A - B C^{-1} B^{\mathsf{H}}$。则对任意边界向量 $x \in \mathbb{C}^m$，边界二次型值 $x^* S x$ 精确是内部变量 $y$ 遍取 $\mathbb{C}^n$ 时整体分块二次型值集

$$
\left\{\, \begin{pmatrix} x \\ y \end{pmatrix}^* \begin{pmatrix} A & B \\ B^{\mathsf{H}} & C \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} \;\Bigg|\; y \in \mathbb{C}^n \,\right\}
$$

的最小元（`IsLeast`：既是该值集中的可达值，又不大于其中任一元素），且在唯一最优点 $y^* = -C^{-1} B^{\mathsf{H}} x$ 处精确取到。
:::

::: {.proof}
因 $C$ 严格正定，故 $C$ 厄米且可逆。利用分块配方法恒等式，将分块二次型展开为

$$
\begin{pmatrix} x \\ y \end{pmatrix}^* \begin{pmatrix} A & B \\ B^{\mathsf{H}} & C \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} \;=\; x^* (A - B C^{-1} B^{\mathsf{H}}) x \;+\; (C^{-1} B^{\mathsf{H}} x + y)^*\,C\,(C^{-1} B^{\mathsf{H}} x + y).
$$

代入 $y^* = -C^{-1} B^{\mathsf{H}} x$ 使第二项严格为零，证明 $x^* S x$ 落入值集；对任意 $y \in \mathbb{C}^n$，由 $C$ 半正定保证第二项非负，从而该整体二次型恒不小于 $x^* S x$。完整证明由 Lean 内核检查。
:::

::: {.example #ex-ch12-schur-worked title="纯有理分块舒尔补精确消元算例：$A = 2,\; B = 1,\; C = 3/2$"}
取实对称有理分块矩阵 $K = \begin{pmatrix} A & B \\ B^\top & C \end{pmatrix} = \begin{pmatrix} 2 & 1 \\ 1 & 3/2 \end{pmatrix}$，内部块 $C = \frac{3}{2} > 0$。直接在有理数域内执行分块消元：

1. **精确有理舒尔补**：$C^{-1} = \frac{2}{3}$，故

   $$
   S \;=\; A - B C^{-1} B^\top \;=\; 2 - 1 \cdot \frac{2}{3} \cdot 1 \;=\; \frac{4}{3} \;>\; 0.
   $$

2. **精确内部最优点与配方展开**：$y^* = -C^{-1} B^\top x = -\frac{2}{3}x$。将原二次型完全配方：

   $$
   2x^2 + 2xy + \frac{3}{2}y^2 \;=\; \frac{4}{3}x^2 \;+\; \frac{3}{2}\!\left(y + \frac{2}{3}x\right)^2.
   $$

3. **行列式与正定性同步核验**：$\det K = AC - B^2 = 2 \cdot \frac{3}{2} - 1^2 = 2 = \frac{3}{2} \cdot \frac{4}{3} = C \cdot S > 0$。整个正定证书与极小值归约不触碰任何特征值平方根 $\lambda_{\pm} = \frac{7 \pm \sqrt{17}}{4}$，纯以有理分式收官。
:::

下图将本章两大零公理有理工具并置呈现在同一版面上：左侧描绘黄金二次扩张 `QPhi` 中的斐波那契幂次、交替卡西尼范数 $N(\varphi^n) = (-1)^n$ 与五角切比雪夫闭合 $T_5(\varphi/2) = -1$，右侧描绘有理分块二次型 $2x^2 + 2xy + \frac{3}{2}y^2$ 沿内部变量 $y$ 形成的抛物谷地及其在 $y^* = -\frac{2}{3}x$ 处精确落定的有理舒尔极小值 $S = \frac{4}{3}$。

::: {.figure src="ch12-quadext-schur-valley"}
**二次扩张 `QPhi` 与有理舒尔补极小值谷地。** 左侧呈现黄金扩张域 `QPhi` 中的有序对斐波那契幂律 $\varphi^{n+1} = F_n + F_{n+1}\varphi$、卡西尼交替范数 $N(\varphi^n) = (-1)^n$ 及无三角函数五角切比雪夫闭合 $T_5(\varphi/2) = -1$（[@thm-ch12-zero-axiom-qphi-fibonacci-pentagon]、[@ex-ch12-quadpoly-ledger]）；右侧呈现分块算例 $A = 2,\; B = 1,\; C = \frac{3}{2}$ 对应的二次型沿内部变量 $y$ 的抛物截面，直观标出唯一消元点 $y^* = -\frac{2}{3}x$ 与谷底舒尔补精确值 $S = \frac{4}{3}$（[@thm-ch12-zero-axiom-lagrange-schur]、[@ex-ch12-schur-worked]）。
:::

---

## 12.4 格拉姆正定分解、等距刚性与迈向第五卷的桥梁 {#sec-ch12-gram-realizability-and-isometry}

有理平方和与舒尔补给出的是算子正定性的**可计算证书**；在经典希尔伯特空间与几何阴影层中，有界算子的正性等价于格拉姆因子分解；全局等距的刚性则来自一个置换对张成族全部内积的保持。下面两条已经 Lean 内核验证的定理，把第四卷的调和与正定工具收束为两座终极刚性桥墩。

::: {.theorem #thm-ch12-gram-realizability title="正算子的格拉姆因子分解等价刻画" lean="D5/S3/QuantumBounds/GramRealizability.gram_realizability"}
设 $V$ 为复希尔伯特空间，$Q : V \to_L V$ 为有界线性算子。则 $Q$ 为正算子（$0 \le Q$），当且仅当存在有界线性算子 $O : V \to_L V$，同时满足算子因子分解 $Q = O^\dagger O$ 与格拉姆配对恒等式：对一切 $x, y \in V$，

$$
\langle Q x, y\rangle \;=\; \langle O x, O y\rangle.
$$

:::

::: {.proof}
正向由连续泛函演算取正算子 $Q$ 的典范正平方根 $O := \sqrt{Q}$，因其自伴性 $O^\dagger = O$ 与 $O^2 = Q$，立即得到 $Q = O^\dagger O$，再由伴随定义得 $\langle Qx, y\rangle = \langle O^\dagger O x, y\rangle = \langle Ox, Oy\rangle$。反向由任意形如 $O^\dagger O$ 的算子恒为正算子直接推得 $0 \le Q$。完整证明由 Lean 内核检查。
:::

当一组张成全空间的基态或特征壳的格拉姆内积被某个置换原封不动地保持时，这一纯粹组合级的保内积条件会唯一地锁死全局线性等距变换，不留任何隐藏自由度。

::: {.theorem #thm-ch12-gram-isometry-extension title="保格拉姆置换唯一延拓为全局线性等距同构" lean="D5/S3/Quantum/AURICOmega/GramIsometryExtension.existsUnique_linearIsometryEquiv_of_gram_preserving"}
设 $E$ 为实内积空间，$\varphi : \iota \to E$ 为张成整个空间 $E$ 的向量族（$\operatorname{span}_{\mathbb{R}}(\operatorname{range}\varphi) = E$）。若指标集上的置换 $\sigma \in \operatorname{Perm}(\iota)$ 保持全部两两格拉姆内积，即

$$
\forall a, b \in \iota, \qquad \langle \varphi(\sigma a), \varphi(\sigma b)\rangle_{\mathbb{R}} \;=\; \langle \varphi a, \varphi b\rangle_{\mathbb{R}},
$$

则存在唯一的线性等距同构 $U : E \simeq_{\mathrm{li}} E$，使得对一切 $a \in \iota$ 恒有 $U(\varphi a) = \varphi(\sigma a)$。
:::

::: {.proof}
对任意有限支集系数 $c$，按双线性展开 $\bigl\lVert \sum_a c_a \varphi(\sigma a)\bigr\rVert^2 = \sum_{a,b} c_a c_b \langle \varphi(\sigma a), \varphi(\sigma b)\rangle_{\mathbb{R}} = \sum_{a,b} c_a c_b \langle \varphi a, \varphi b\rangle_{\mathbb{R}} = \bigl\lVert \sum_a c_a \varphi a\bigr\rVert^2$。这保证了映射 $\sum_a c_a \varphi a \mapsto \sum_a c_a \varphi(\sigma a)$ 不依赖线性表出方式而良定义，且严格保范。因为 $\varphi$ 张满 $E$ 且 $\sigma$ 为双射，该映射满射从而给出线性等距同构 $U$；任意两个在生成集 $\operatorname{range}\varphi$ 上一致的线性等距必在全空间 $E$ 上相等，故唯一。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch12-rational-sos-vs-real-shadow title="严格后端的有理正定代数与经典希尔伯特阴影"}
请特别留意本章七组冻结定理之间的精确层次分工：在使用 `OmegaInit` 与 `OmegaMath` 的 D5 声明中（`strict_omega.axioms: []`），[@thm-ch12-zero-axiom-quadpoly-qsqrt2]、[@thm-ch12-zero-axiom-qphi-fibonacci-pentagon] 与 [@thm-ch12-zero-axiom-lagrange-schur] 已经直接以纯有限有序对与 `Omega.FiniteRatio` 算术证成了二次范数乘性、精确求逆、`QSqrt2` 与 `QPhi` 的旋量/贝尔/斐波那契/五角切比雪夫闭合、拉格朗日—格拉姆恒等式、柯西—施瓦茨不等式以及标量舒尔补极小值，全程不触碰实数完备化或特征值求解；而在经典实复希尔伯特阴影侧，[@thm-ch12-lagrange-gram] 与 [@thm-ch12-schur-minimum] 提供对应的实求和与任意有限维复分块矩阵版本。若有理证书确立了复希尔伯特空间上有界算子 $Q$ 的正性，[@thm-ch12-gram-realizability] 给出 $Q=O^\dagger O$。在实内积空间里，[@thm-ch12-gram-isometry-extension] 则把张成族上保持每一对格拉姆内积的指定置换唯一延拓为全局线性等距同构。
:::

一个手算便可看出两个前提各管什么。在 $\mathbb{R}^2$ 中，$e_1,2e_2$ 张成全空间，格拉姆矩阵 $\operatorname{diag}(1,4)$ 正定。对换却把范数 $1$ 送到 $2$，故无法延拓成等距。若只取向量 $e_1$，恒等置换保持内积，但恒等映射与关于 $e_1$ 轴的反射都是延拓，这里便失去了唯一性。

::: {.film src="a-root-as-a-pair"}
**一条规则 $\alpha^2 = b\alpha + c$ 把根号变成有理数对，平方和把正定性变成手算证书（2 分 44 秒）。** 青色数对 $(p, q)$ 读作 $p + q\alpha$，乘法展开后只套用琥珀色的规则；共轭 $(p + bq, -q)$ 消去 $\alpha$ 部分、留下范数 $N = p^2 + bpq - cq^2$，在 `QSqrt2` 中手算 $(1, 1)^{-1} = (-1, 1)$。旋量平面上单位旋量 $u = \frac{\delta}{2}(1 + \mathbf{i})$ 每拍转 $45^\circ$，$u^2 = \mathbf{i}$、$u^4 = -1$、$u^8 = 1$，小表盘上的伴随标架转满 $720^\circ$；`QPhi` 的阶梯列出 $\varphi^n = (F_{n-1}, F_n)$ 直到 $\varphi^{12} = (89, 144)$，范数交替为 $-1$、$+1$；在 $\varphi/2$ 上运行切比雪夫递推，$T_5 = -1$、$T_{10} = 1$ 落在正十边形的顶点上（紫色 PICTURE 标签：点位只用 $\varphi \approx 1.618$ 定位）。随后以 $(1, 2), (3, 1), (2, 5)$ 核对格拉姆行列式 $420 - 225 = 195$ 等于品红有向面积 $-5, 1, 13$ 的平方和，最后以 $e_1, 2e_2$ 与单独的 $e_1$ 两个手算反例说明等距延拓的两个前提。绿色标签依次对应 [@thm-ch12-zero-axiom-quadpoly-qsqrt2] 的精确求逆与八拍闭合、[@thm-ch12-zero-axiom-qphi-fibonacci-pentagon] 的幂次范数律与五角切比雪夫闭合、[@thm-ch12-zero-axiom-lagrange-schur] 的有理拉格朗日—格拉姆恒等式，以及经典实数阴影层的 [@thm-ch12-gram-isometry-extension]；青色 NUM 标签下的数值均为屏幕上的精确计算，不是证明。
:::

在下面的交互实验卡中，读者可以在同一座实验室里切换并联动探索本章的三组代数构造：在 `QSqrt2` 视图中逐拍步进单位 $90^\circ$ 旋量的八拍闭合 $u_{90}^8 = 1$ 并核对零浮点误差的 CHSH 齐雷尔森平方极值 $S_{\mathrm{CHSH}}^2 = 8$（[@thm-ch12-zero-axiom-quadpoly-qsqrt2]）；在 `QPhi` 视图中步进斐波那契幂次 $\varphi^{n+1} = F_n + F_{n+1}\varphi$ 与十拍切比雪夫轨道，见证无三角函数的 $T_5(\varphi/2) = -1$ 闭合（[@thm-ch12-zero-axiom-qphi-fibonacci-pentagon]）；再拖动内部变量 $y$ 与边界参数 $x$ 沿有理舒尔谷地滑动，亲手验证 $y^* = -\frac{2}{3}x$ 处的精确谷底极小值 $S = \frac{4}{3}$（[@thm-ch12-zero-axiom-lagrange-schur]、[@thm-ch12-schur-minimum]）。

::: {.viz src="dfinite-algebraic-schur-lab" preset="quadratic-ext-and-schur" height="520"}
**二次扩张域与有理舒尔谷地实验卡（`quadratic-ext-and-schur`）。** 交互切换 `QSqrt2` 与 `QPhi` 有序对代数：检验单位 $90^\circ$ 旋量八拍闭合 $u_{90}^8 = 1$ 与 CHSH 平方极值 $S_{\mathrm{CHSH}}^2 = 8$（[@thm-ch12-zero-axiom-quadpoly-qsqrt2]），步进黄金斐波那契幂次与五角切比雪夫闭合 $T_5(\varphi/2) = -1$（[@thm-ch12-zero-axiom-qphi-fibonacci-pentagon]），并在分块二次型 $2x^2 + 2xy + \frac{3}{2}y^2$ 上沿内部变量 $y$ 拖动探针，实时锁定 $y^* = -\frac{2}{3}x$ 处的精确有理舒尔极小值 $S = \frac{4}{3}$（[@thm-ch12-zero-axiom-lagrange-schur]、[@ex-ch12-schur-worked]）。
:::

至此，第四卷“三维球面有理调和分析”圆满收官。从[第十章](ch10-peter-weyl-rational-spin-shells.md)的彼得—魏尔自旋壳与偶次切比雪夫多项式 $E_n(\kappa)$，到[第十一章](ch11-pi-free-haar-integration.md)彻底消去 $\pi$ 的阶乘哈尔积分与特征核正交归一，再到本章的零公理二次扩张域 `QuadPoly(b, c)` 与有理拉格朗日—舒尔正定证书，我们已经锻造齐全整套非阿贝尔球面谱分析的纯有理武器。在接下来的第五卷（[第十三章](ch13-computable-arithmetic-horizon.md)–[第十五章](ch15-rational-hecke-ramanujan-spectrum.md)）中，我们将把这套武器直指素数算术、赫维茨整四元数自由群 $F_3$ 与无复数赫克—拉马努金有理正定谱隙。
