# 极小圆弧体微积分与黎曼 ζ 函数：能严格说出的内容

研究日期：2026-11-17。研究时的书库基线为 `d73f704229838d8d6763ad408242c80fb52a1b18`，trureturing 钉版为 `4e2a0d3fcca69885dfcf5b56184838554ebb5239`；入库时书库钉版为 `2e46b890e7befe502497de7e253e062ab7b9b392`，第 6 节所列声明在这两个提交上的陈述相同（其间 `ActualReciprocalSquareBounds` 模块只有一条辅助引理去掉了 `private`；Z13–Z17 只读了入库时的钉版）。书稿中与本笔记对应的内容在 [§34.30.2](../../books/quantum-geometry/zh/ch34-s30-arc-body-calculus-and-finite-stokes.md) 末尾：Li 系数的弦—矢高命题、Li 判据注记与算例（Z1、Z3、Z4 与第 7 节的数值），有限旋子族的 Li 判据注记（Z13、Z14），有限域 Li 和注记（Z16），以及带 `lean=` 的 3-4-1 命题（Z17）；第 8 节逐条写明对 §34.28–§34.29 既有表述的提示在书稿中的现状。第 10 节（Z15）是一条尚未编译的形式化候选。配套脚本 `riemann_arc_check.py` 与本笔记同目录。

## 0. 范围与诚实声明

**黎曼猜想是开放问题。本笔记不证明它，也不构成向证明推进的任何一步。** 本笔记回答的问题是：用 [§34.30](../../books/quantum-geometry/zh/ch34-s30-arc-body-calculus-and-finite-stokes.md) 的弦—矢高语言与配套笔记 `COMPARISON-AXIOM-ARC-CALCULUS-GAPS-2026-11-17.md`（下称“缺口笔记”，结果记作 R1–R20）的公平元语言，关于 ζ 函数能写下哪些**精确**的陈述。

总的结论有三句：

1. 圆弧体语言给出一本准确的字典：零点的凯莱比是旋子，Li 系数是这些旋子 $n$ 次幂的累计矢高，函数方程是一个公平比较，Weil 二次型是一个克莱因（不定）内积。字典里的每个等式都是恒等式。
2. 字典**翻译**了黎曼猜想的若干已知等价形式（Li 判据、Weil 正性、$\lvert\xi\rvert$ 的单调性），没有产生新的等价形式，更没有产生证明。这些翻译里的每一条“RH $\Leftrightarrow X$”都只是把开放问题换了写法。
3. 字典在一个地方不是类比而是定理：有限域上椭圆曲线的黎曼猜想（Hasse 定理，已证）逐字就是缺口笔记 R2 的命题加 R20。数域情形与它的差别可以精确指出：缺一个带正对合的代数。

每条结论带三种标签之一：

- `手工推导`：本笔记给出完整证明；证明中用到的已发表定理单独标出。
- `文献结果`：已发表的定理，注明作者、年份与出处；没有核对原文的在第 9 节逐条列出。
- `OPEN`：未证明。黎曼猜想及其一切等价命题属于这一层。

带前提“若 RH 成立”的推导标为 `手工推导（条件）`，它们不说明 RH 是否成立。数值计算只是证据，第 7 节写明了算了什么。本笔记没有新增 Lean 验证结果；第 6 节列出的冻结声明是所钉提交上已有的，本轮逐条读了 Lean 陈述。

**数学新颖性：不主张。** 第 5 节的表逐条说明每个结果在经典文献或冻结库中的位置；本笔记自己推出的恒等式（Z2、Z3、Z8、Z9 的矢高写法）都是几行代数，很可能在文献中以别的记号出现过，本轮没有做文献排查来排除这一点。

## 1. 记号

- $s=\sigma+it$；非平凡零点 $\rho=\beta+i\gamma$，求和按重数；$\xi(s)=\tfrac12 s(s-1)\pi^{-s/2}\Gamma(s/2)\zeta(s)$（冻结定义 `xiReading`）。
- 对合代数中的**公平元**：$uu^*=u^*u=1$；$S=\tfrac12(u+u^*)$，$A=\tfrac12(u-u^*)$，**矢高** $v=1-S$，**割弦** $\Delta=u-1$；锁死恒等式 $\Delta^*\Delta=2v$（R1）。$n$ 次幂的矢高 $v_n=1-T_n(1-v)$（R20，$T_n$ 为第一类切比雪夫多项式）。
- 按矢高的分类（R2、R3，在 $(M_2(\mathbb{C}),\operatorname{adj})$ 中，公平元即 $\mathrm{SL}(2,\mathbb{C})$）：$v\in(0,2)$ 椭圆，$v\in\{0,2\}$ 抛物或 $\pm1$，$v\in\mathbb{R}\setminus[0,2]$ 双曲，$v\notin\mathbb{R}$ 斜驶。
- **零点旋子**（凯莱比）$u_\rho:=1-\dfrac1\rho=\dfrac{\rho-1}{\rho}$，即书稿 [§22.4](../../books/quantum-geometry/zh/ch22-s04-critical-line-and-rh.md) 的 $w$；**对数径向亏量** $\delta_{\mathrm{rad}}(\rho)=\ln\lvert u_\rho\rvert$（冻结定义）。
- **Li 系数**有两种定义。导数定义（冻结定义 `canonicalLiCoefficient`）：$\lambda_n=\dfrac{1}{(n-1)!}\dfrac{d^n}{ds^n}\bigl[s^{n-1}\ln\xi(s)\bigr]_{s=1}$。零点和定义：$\lambda_n=\lim_{T\to\infty}\sum_{\lvert\gamma\rvert\le T}\bigl(1-u_\rho^{\,n}\bigr)$。两者相等是文献结果（Li 1997；Z3 中给出依赖阿达马乘积的推导）。
- 黎曼—西格尔函数 $\vartheta(t)=\arg\Gamma\bigl(\tfrac14+\tfrac{it}{2}\bigr)-\tfrac t2\ln\pi$，哈代函数 $Z(t)=e^{i\vartheta(t)}\zeta(\tfrac12+it)$，$\chi(s)=\pi^{s-1/2}\,\Gamma\bigl(\tfrac{1-s}{2}\bigr)/\Gamma\bigl(\tfrac s2\bigr)$。

## 2. 零点旋子与 Li 系数（线索 1）

### Z1 零点的凯莱旋子（手工推导；等价形式已冻结）

对任意 $s\ne0$：

$$
\lvert u_s\rvert^2-1=\frac{1-2\sigma}{\lvert s\rvert^2},\qquad \Delta_s=u_s-1=-\frac1s,\qquad \lvert\Delta_s\rvert=\frac1{\lvert s\rvert}.
$$

所以 $\lvert u_s\rvert=1\iff\sigma=\tfrac12$。在临界线上 $\rho=\tfrac12+i\gamma$（$\gamma>0$）时，$u_\rho$ 是 $\mathbb{C}$（对合取复共轭）中的公平元，

$$
u_\rho=e^{i\theta_\rho},\qquad \theta_\rho=2\arctan\frac{1}{2\gamma},\qquad v_\rho=1-\cos\theta_\rho=\operatorname{Re}\frac1\rho=\frac{2}{1+4\gamma^2},\qquad \lvert\Delta_\rho\rvert^2=\frac1{\lvert\rho\rvert^2}=2v_\rho .
$$

证明。$\lvert s-1\rvert^2-\lvert s\rvert^2=1-2\sigma$。在线上 $\rho-1=-\overline\rho$，故 $u_\rho=-\overline\rho/\rho=e^{i(\pi-2\arg\rho)}$，$\arg\rho=\arctan 2\gamma$；$1-\operatorname{Re}u_\rho=\operatorname{Re}(1/\rho)=\tfrac12/(\tfrac14+\gamma^2)$。最后一式是 R1 第 4 款。$\square$

**割弦的长度是零点模长的倒数，矢高是零点倒数的实部。** 第一个零点：$\theta_1=0.0707183$，$v_1=0.00249949$，$\lvert\Delta_1\rvert=0.0707035$。

冻结对应：`cayley_ratio_norm_one_iff_critical_line`（单位圆判据）、`cayley_critical_line_zeta_criterion` 与 `rh_iff_nontrivial_zero_cayley_norm`（RH $\Leftrightarrow$ 每个非平凡零点满足 $\lVert1-1/\rho\rVert=1$）、`cayleyNode_one_sub_normSq`（$\lvert1-u\rvert^2=4x$，其中 $x=1/(4\gamma^2+1)=v_\rho/2$）。这些书稿 §22.4 已基本写过；“RH $\Leftrightarrow$ 每个零点旋子是公平元”是同一句话，是等价改写，`OPEN`。

### Z2 函数方程把零点配成 $\mathrm{SL}(2,\mathbb{C})$ 旋子（手工推导）

1. $u_{1-\rho}=u_\rho^{-1}$，$u_{1-\overline\rho}=\overline{u_\rho}^{\,-1}$，$u_{\overline\rho}=\overline{u_\rho}$。
2. $U_\rho:=\operatorname{diag}(u_\rho,u_\rho^{-1})$ 对经典伴随是公平元（$\det U_\rho=1$），这一点**不依赖 RH**；它的矢高是

$$
v_\rho:=1-\tfrac12\bigl(u_\rho+u_\rho^{-1}\bigr)=\frac{1}{2\rho(1-\rho)} .
$$

3. 对临界带内的非实点 $\rho$：$v_\rho\in\mathbb{R}\iff\beta=\tfrac12$，此时 $v_\rho=\dfrac{2}{1+4\gamma^2}\in(0,2)$。所以按 R3 的分类，**在线的零点旋子是椭圆的，离线的是斜驶的**；双曲类只出现在实的 $\rho\in(0,1)$（$\rho=\tfrac12$ 时 $U_\rho=-1$），而 ζ 在 $(0,1)$ 上没有零点（冻结定理 `riemannZeta_ne_zero_of_real_mem_Ioo`）。对角元不会是抛物的。

证明。第 1 款直接代入。第 2 款：$u+u^{-1}-2=(u-1)^2/u=\rho^{-2}\cdot\rho/(\rho-1)$。第 3 款：$\rho(1-\rho)=\beta(1-\beta)+\gamma^2+i\gamma(1-2\beta)$。$\square$

于是“RH $\Leftrightarrow$ 每个零点矢高 $v_\rho$ 是实数 $\Leftrightarrow$ 每个 $U_\rho$ 是椭圆元”。这仍是等价改写，`OPEN`。

**无穷维形式已冻结。** 在按重数展开的零点希尔伯特空间上，对角算子 $U=\operatorname{diag}(u_\rho)$ 满足 $U^*JU=J$，其中 $J$ 是把 $\rho$ 换成同高度镜像 $1-\overline\rho$ 的基本对称（冻结定理 `zetaZeroCayleyOperator_j_unitary`，无条件）；而 $U^*U=1$ 当且仅当全体零点在线上（冻结定理 `cayley_unitarity_defect_formula`，其中亏量 $\lvert u_\rho\rvert^2-1=(1-2\beta)/\lvert\rho\rvert^2$）。用缺口笔记的话说：$U$ 对克莱因对合 $a^\sharp:=Ja^*J$ **无条件公平**，对希尔伯特对合 $*$ 公平当且仅当 RH。下列各条两两等价（手工推导，对角算子逐坐标验证）：RH；$J=1$；$[U,J]=0$；$\{U^n\}_{n\in\mathbb{Z}}$ 有界；在每个 $J$-不变的有限坐标块上，块代数的对合 $\sharp$ 满足 $(\mathrm{Pos})$。最后一条：若 RH 成立则 $\sharp=*$；若有离线零点，在 $\{\rho,1-\overline\rho\}$ 张成的二维块上（$J$ 是交换矩阵）取 $a=\operatorname{diag}(1,-1)$，则 $a^\sharp a=-1$，与 R3 中 $(M_2(\mathbb{C}),\operatorname{adj})$ 的反例是同一个矩阵。这组等价是 R20“对合正性 $\Leftrightarrow$ 重复比较有界”在 ζ 上的实例；它们都建立在由零点本身搭出的空间上，是同义反复，不提供判定手段。

### Z3 Li 系数是零点旋子 $n$ 次幂的累计矢高（手工推导；用到阿达马乘积这一文献结果）

1. **切比雪夫形式，无条件且绝对收敛。** 对一切 $n\ge1$，

$$
\lambda_n=\sum_\rho\Bigl[1-T_n\bigl(1-v_\rho\bigr)\Bigr],\qquad v_\rho=\frac{1}{2\rho(1-\rho)} ,
$$

右端按重数对全体非平凡零点求和，绝对收敛。每一项正是 R20 的 $v_n=1-T_n(1-v)$：**$\lambda_n$ 是全体零点旋子 $n$ 次幂的矢高之和。**

2. $\lambda_1=\sum_\rho v_\rho$，$\lambda_2=4\lambda_1-2\sum_\rho v_\rho^2$；一般地有**倍角律** $\lambda_{2n}=4\lambda_n-2\sum_\rho v_n(\rho)^2$，其中 $v_n(\rho)=1-T_n(1-v_\rho)$。
3. **弦项减亏量项，无条件。**

$$
\lambda_n=\underbrace{\tfrac12\sum_\rho\bigl\lvert1-u_\rho^{\,n}\bigr\rvert^2}_{C_n\ \ge 0}\;-\;\underbrace{\sum_\rho\sinh^2\!\bigl(n\,\delta_{\mathrm{rad}}(\rho)\bigr)}_{D_n\ \ge 0},
$$

两个和各自绝对收敛。$C_n=\tfrac12\lVert1-U^n\rVert_{\mathrm{HS}}^2$ 是 $U^n$ 的半弦平方，$D_n=\tfrac12\operatorname{tr}\bigl(U^{n*}U^n-1\bigr)$ 是它的幺正亏量。$D_n=0$（对某个、从而对一切 $n\ge1$）当且仅当 RH。

4. （条件）若 RH 成立，则 $\lambda_n=\sum_\rho(1-\cos n\theta_\rho)=C_n$，并且 $0<\lambda_n\le n^2\lambda_1$。

证明。（i）零点和与导数定义。阿达马乘积 $\xi(s)=\xi(0)\prod_\rho(1-s/\rho)$（按 $\rho,1-\rho$ 配对后绝对收敛；文献结果，Hadamard 1893）。令 $\varphi(z)=\xi\bigl(\tfrac1{1-z}\bigr)$，由 $1-\dfrac{1}{\rho(1-z)}=\dfrac{u_\rho-z}{1-z}$ 得

$$
\frac{\varphi'(z)}{\varphi(z)}=\sum_\rho\Bigl(\frac{1}{1-z}-\frac{u_\rho^{-1}}{1-u_\rho^{-1}z}\Bigr)=\sum_{n\ge0}z^n\sum_\rho\bigl(1-u_\rho^{-(n+1)}\bigr),
$$

而 $u_\rho^{-1}=u_{1-\rho}$，对称截断集在 $\rho\mapsto1-\rho$ 下不变，故系数为 $\lambda_{n+1}$。另一方面 $\varphi'/\varphi=(1-z)^{-2}(\xi'/\xi)\bigl(\tfrac1{1-z}\bigr)$ 的泰勒系数就是导数定义（冻结定理 `generator_taylor_coefficient`）。（ii）第 1 款。$\{\lvert\gamma\rvert\le T\}$ 在 $\rho\mapsto1-\rho$ 下不变，故部分和等于 $\tfrac12\sum[(1-u_\rho^n)+(1-u_\rho^{-n})]$；对任意非零复数 $u$ 有 $u^n+u^{-n}=2T_n\bigl(\tfrac{u+u^{-1}}2\bigr)$，再用 Z2 第 2 款。$1-T_n(1-v)$ 是 $v$ 的无常数项多项式（首项 $n^2v$，次项 $-\tfrac{n^2(n^2-1)}6v^2$），$\lvert v_\rho\rvert\le\tfrac1{200}$（冻结定理 `actual_height_gt_ten`：$\lvert\gamma\rvert>10$），而 $\sum_\rho\lvert v_\rho\rvert<\infty$（冻结定理 `actual_complex_pairWeight_hasSum` 给出 $\sum_\rho m_\rho/(\rho(1-\rho))$ 的无条件可和性），所以绝对收敛，极限 $T\to\infty$ 可以去掉。（iii）第 2 款：$v_2=2v(2-v)$（R20），对 $u^n$ 再用一次。（iv）第 3 款：对任意复数 $w$，$\operatorname{Re}(1-w)=\tfrac12\lvert1-w\rvert^2-\tfrac12(\lvert w\rvert^2-1)$；取 $w=u_\rho^n$ 求和（$\lambda_n$ 是实数）。镜像配对 $\lvert u_{1-\overline\rho}\rvert=\lvert u_\rho\rvert^{-1}$ 给出 $\sum_\rho(\lvert u_\rho\rvert^{2n}-1)=\tfrac12\sum_\rho(\lvert u_\rho\rvert^n-\lvert u_\rho\rvert^{-n})^2=2\sum_\rho\sinh^2(n\ln\lvert u_\rho\rvert)$。两个和的绝对收敛来自 $\lvert1-u^n\rvert\le n\max(1,\lvert u\rvert)^{n-1}\lvert1-u\rvert$ 与 $\lvert u_\rho\rvert^2-1=(1-2\beta)/\lvert\rho\rvert^2$。（v）第 4 款：在线时各项为 $1-\cos n\theta_\rho\in[0,2]$；$\lvert\sin(nx)\rvert\le n\lvert\sin x\rvert$（归纳）给出 $1-\cos n\theta\le n^2(1-\cos\theta)$；严格正是因为有 $\theta_\rho$ 任意小的零点，使 $0<n\theta_\rho<2\pi$。$\square$

说明。第 1 款中用 $\rho\leftrightarrow1-\rho$ 配对（而不是 $\rho\leftrightarrow\overline\rho$）使 Li 和绝对收敛，不再需要对称截断的约定。第 3 款把“$\lambda_n\ge0$”读成“半弦平方不小于幺正亏量”；它是 R1 第 4 款对非公平元的修正式 $2v=\Delta^*\Delta-(u^*u-1)$ 的求和。第 3 款在有限实谱、在线情形（$D_n=0$）已冻结：`finiteLiCoefficient_eq_diagonalHilbertSchmidtDefect`。$\lambda_1=1+\tfrac\gamma2-\tfrac12\ln4\pi=0.0230957\ldots$ 冻结为 `canonical_li_one`，$\sum_\rho m_\rho\cdot2v_\rho=2\lambda_1$ 冻结为 `actual_complex_pairWeight_hasSum`。第 4 款的上界 $\lambda_n\le n^2\lambda_1$ 是 R5“$N$ 步相干复合的矢高不超过 $N^2v$”的直接应用；数值上 $\lambda_n/(n^2\lambda_1)$ 对 $n=2,\dots,12$ 从 $0.99960$ 降到 $0.98120$（第 7 节），这与 RH 相容，不是证据之外的任何东西。

### Z4 Li 判据：哪个方向平凡，哪个方向是定理（文献结果；一个方向已冻结；附手工推导）

**Li 判据**（`文献结果`：X.-J. Li, *J. Number Theory* **65** (1997), 325–333；E. Bombieri & J. C. Lagarias, *J. Number Theory* **77** (1999), 274–287）：RH 成立，当且仅当对一切 $n\ge1$ 有 $\lambda_n\ge0$。按 Z3，这句话读作：**全体零点旋子都是椭圆的，当且仅当它们每一个幂次的累计矢高都非负。** 它是 RH 的等价形式，`OPEN`。

- **平凡方向**（RH $\Rightarrow\lambda_n\ge0$）：Z3 第 4 款，逐项非负。它依赖零点和表示，即阿达马乘积。所钉提交上这个方向没有冻结声明（模块 `CanonicalLiNonnegativeConverse` 的说明写明 RH-forward positivity 尚未完成）。
- **定理方向**（$\lambda_n\ge0\ \forall n\Rightarrow$ RH）：已冻结为 `canonical_li_nonnegative_implies_rh`，针对导数定义的系数。证明骨架如下（手工推导，与冻结证明同一路线）。设 $f(z)=\varphi'(z)/\varphi(z)=\sum_{n\ge0}\lambda_{n+1}z^n$，收敛半径 $R$。$f$ 在单位圆盘内亚纯，极点恰为 $\varphi$ 的零点 $z=u_\rho$（$\lvert u_\rho\rvert<1\iff\beta>\tfrac12$）。若 $R<1$ 且系数非负，由普林斯海姆定理（非负系数幂级数在 $z=R$ 处奇异；Vivanti 1893、Pringsheim 1894，文献结果），$\varphi(R)=0$，即 $\xi\bigl(\tfrac1{1-R}\bigr)=0$，而 $\tfrac1{1-R}$ 是大于 $1$ 的实数，那里 $\xi\ne0$（冻结定理 `completedRiemannZeta_ne_zero_of_one_le_re`）。矛盾，故 $R\ge1$，右半带无零点，再用函数方程。**这个方向用到的算术输入只有一条：$\xi$ 在实轴 $s>1$ 上不为零。** 全部困难都在“对一切 $n$ 非负”这个前提里。
- **Bombieri–Lagarias 的证明用什么**：他们对满足收敛条件的一般复数多重集证明同一等价，不用普林斯海姆定理，而用狄利克雷联立逼近定理把模最大的有限多个旋子的相位同时对齐，其余各项由收敛条件控制为 $O\bigl(n^2(1+t-\delta)^n\bigr)$。这一描述已对照 Lagarias 主页上的预印本核对（Z13.4）。
- **定量形式。** Bombieri–Lagarias 定理 1（`文献结果`，已对照预印本核对，见 Z13.4）：设多重集 $\mathcal{R}$ 满足 $1\notin\mathcal{R}$ 与 $\sum_{\rho}(1+\lvert\operatorname{Re}\rho\rvert)/(1+\lvert\rho\rvert)^2<\infty$（和按 $\lvert\operatorname{Im}\rho\rvert\le T$ 截断后令 $T\to\infty$），则下列三条等价：(a) 一切 $\operatorname{Re}\rho\le\tfrac12$；(b) $\sum_\rho\operatorname{Re}\bigl[1-(1-1/\rho)^{-n}\bigr]\ge0$ 对一切 $n\ge1$；(c) 对每个 $\varepsilon>0$ 存在 $c(\varepsilon)$ 使 $\sum_\rho\operatorname{Re}\bigl[1-(1-1/\rho)^{-n}\bigr]\ge-c(\varepsilon)e^{\varepsilon n}$ 对一切 $n\ge1$。对 ζ 的零点（在 $\rho\mapsto1-\rho$ 下对称），(b) 即 $\lambda_n\ge0$。
  对 ζ 本身，(c) 的逆否命题可以用上一条的论证直接证明（手工推导）：若 RH 不成立，令 $r=\min_\rho\lvert u_\rho\rvert<1$，则对每个 $q\in(1,1/r)$ 与每个 $c>0$，有无穷多个 $n$ 使 $\lambda_n<-c\,q^n$。证明：否则适当加大 $c$ 后 $\lambda_n+cq^n\ge0$ 对一切 $n\ge1$ 成立，$g(z)=f(z)+\dfrac{cq}{1-qz}$ 是非负系数幂级数，收敛半径恰为 $r$（$f$ 的半径是 $r$，第二项的半径 $1/q>r$）；普林斯海姆定理说 $g$ 在 $z=r$ 奇异，第二项在该点解析，于是 $\varphi(r)=0$，同样矛盾。$\square$
  冻结库中的相邻陈述针对绝对值：`disk_zero_forces_exponential_escape`（圆盘内的一个零点迫使 $\lvert\lambda_{n+1}\rvert R^n$ 在每个尾部无界，$R$ 取在该零点的模与 $1$ 之间）、`rh_iff_canonical_weighted_envelopes` 与 `rh_iff_canonical_li_disk_summable`（RH $\Leftrightarrow$ 级数 $\sum\lvert\lambda_{n+1}\rvert r^n$ 对每个 $r<1$ 收敛）。
- **潜伏期。** 一组离线四点 $\tfrac12\pm\delta\pm i\gamma_0$ 对 $\lambda_n$ 的贡献恰为 $4\bigl[1-\cos(n\theta_r)\cosh(n\eta)\bigr]$，其中 $u=e^{i(\theta_r+i\theta_i)}$、$\eta=\lvert\theta_i\rvert=\lvert\delta_{\mathrm{rad}}\rvert\approx\delta/\gamma_0^2$（手工推导）。其余零点若都在线上，它们的贡献与 RH 下的 $\lambda_n$ 同量级，即 $\tfrac n2\ln n$（Voros、Lagarias 的渐近式，`文献结果`，未核对）；四点项要压过它需要 $n\eta\gtrsim\ln n$，即 $n\gtrsim\dfrac{\gamma_0^2}{\delta}\ln\dfrac{\gamma_0^2}{\delta}$（量级估计，不是定理）。与之相符的文献陈述：若 RH 在高度 $T_0$ 以下成立，则 $n<T_0^2$ 时 $\lambda_n$ 不会为负（J. Oesterlé，未发表；经 A. Voros `arXiv:1602.03292` 转述，本轮只见到检索摘要）。这条转述没有核对原文，本笔记不据此下结论；能确定的只有：判据需要全部不等式，有限多个不等式的检验不构成证明。

与 R20 的平行与差别。R20：单个标量相似的公平元，“$(\mathrm{Pos})$ 对求异部分成立 $\Leftrightarrow$ 整数次幂有界”。Li 判据：无穷多个旋子，“全部椭圆 $\Leftrightarrow$ 各次幂的累计矢高非负”。前者是两行代数；后者的定理方向需要解析输入（普林斯海姆定理加实轴无零点，或狄利克雷逼近加收敛条件），**从圆弧体代数推不出来**。有限族情形两者之间的桥是 Z5，它的一般形式是 Z13。

### Z5 有限旋子族的 Li 判据（手工推导）

设 $u_1,\dots,u_m$ 是非零复数（多重集），在 $u\mapsto u^{-1}$ 下封闭，$\Lambda_n:=\operatorname{Re}\sum_j(1-u_j^{\,n})$，$r:=\max_j\lvert u_j\rvert\ge1$。

1. 若一切 $\lvert u_j\rvert=1$，则 $0\le\Lambda_n=\tfrac12\sum_j\lvert1-u_j^n\rvert^2\le2m$。
2. 若 $r>1$，令 $J=\{j:\lvert u_j\rvert=r\}$，$r'=\max_{j\notin J}\lvert u_j\rvert<r$。则对每个 $L$ 存在 $n\ge L$ 使 $\Lambda_n\le m-\tfrac{\lvert J\rvert}{2}r^n+(m-\lvert J\rvert)r'^{\,n}$。特别地 $\liminf_n\Lambda_nr^{-n}\le-\tfrac{\lvert J\rvert}2<0$。

所以：$\Lambda_n\ge0$ 对一切 $n$ $\iff$ 一切 $\lvert u_j\rvert=1$ $\iff$ $\operatorname{diag}(u_j)$ 的整数次幂有界。

证明。第 1 款是 R1 第 4 款。第 2 款：写 $u_j=re^{i\phi_j}$（$j\in J$）。把环面 $(\mathbb{R}/\mathbb{Z})^J$ 分成 $6^{\lvert J\rvert}$ 个边长 $\tfrac16$ 的盒子，$6^{\lvert J\rvert}+1$ 个点 $\bigl(kL\phi_j/2\pi\bmod1\bigr)_{j\in J}$（$k=0,\dots,6^{\lvert J\rvert}$）中有两个同盒，取 $n=(k_2-k_1)L\ge L$，则每个 $n\phi_j$ 距 $2\pi\mathbb{Z}$ 不超过 $\tfrac\pi3$，$\cos n\phi_j\ge\tfrac12$。于是 $\operatorname{Re}\sum_{j\in J}u_j^n\ge\tfrac{\lvert J\rvert}2r^n$，其余各项不小于 $-r'^{\,n}$。$\square$

冻结库中的一个具体实例：四点谱 $\{\tfrac7{10}\pm5i,\tfrac3{10}\pm5i\}$ 的第 31 个 Li 和为负（`li_positivity_distinguishes_the_off_line_toy_spectrum`）；复算给出 $-0.0943260$，并且 $31$ 是第一个为负的指标。

### Z13 有限族的 Li 判据：不需要对称性的形式（主体为文献结果；其余为手工推导）

**本条是关于有限个复数的定理，对 ζ 的零点什么也不说**：ζ 的零点有无穷多个，Li 判据的定理方向需要解析输入（Z4），有限族的定理不能替代它，把零点截断成有限族得到的结论也不能传回 $\lambda_n$。

记号：有限指标集 $\iota$，$m=\lvert\iota\rvert$，$u:\iota\to\mathbb{C}$（允许为零、允许重复）；$p_n=\sum_ju_j^{\,n}$，$\Lambda_n=\operatorname{Re}\sum_j(1-u_j^{\,n})=m-\operatorname{Re}p_n$（$n\ge1$）；$r=\max_j\lvert u_j\rvert$，$J=\{j:\lvert u_j\rvert=r\}$，$m'$ 为非零项的个数。对任意复数 $w$，

$$
\operatorname{Re}(1-w)=\tfrac12\lvert1-w\rvert^2+\tfrac12\bigl(1-\lvert w\rvert^2\bigr)\qquad(\ast)
$$

（Z3 第 3 款的逐项形式）。所有 $\lvert u_j\rvert=1$ 时 $1-\operatorname{Re}u_j^{\,n}$ 是旋子 $u_j$ 的 $n$ 次幂的矢高，$\Lambda_n=\tfrac12\sum_j\lvert1-u_j^{\,n}\rvert^2$。

**定理 A。** 下列各条等价：

1. 一切 $\lvert u_j\rvert\le1$；
2. 一切 $n\ge1$ 有 $\Lambda_n\ge0$；
3. 存在 $d\ge1$ 与 $k_0$，使一切 $k\ge k_0$ 有 $\Lambda_{dk}\ge0$；
4. 存在 $C$ 与 $N_0$，使一切 $n\ge N_0$ 有 $\operatorname{Re}p_n\le C$；
5. $(p_n)_{n\ge0}$ 有界；
6. $\{\operatorname{diag}(u_j)^n:n\ge0\}$ 有界；
7. 对每个 $\varepsilon>0$ 存在 $C$，使一切 $n\ge1$ 有 $\Lambda_n\ge-C\,e^{\varepsilon n}$。

**定理 B（定量形式）。** 设 $r>0$，$0<\varepsilon\le1$。有无穷多个 $n$ 满足 $\operatorname{Re}p_n\ge(1-\varepsilon)\sum_j\lvert u_j\rvert^n\ge(1-\varepsilon)\lvert J\rvert r^n$。取 $\varepsilon=\tfrac12$ 时位置是显式的：对每个 $L\ge1$，在 $L,2L,\dots,6^{m'}L$ 中就有一个 $n$ 使一切非零项满足 $\cos(n\arg u_j)\ge\tfrac12$，从而 $\operatorname{Re}p_n\ge\tfrac12\sum_j\lvert u_j\rvert^n$。由此：

- $r>1$：$\displaystyle\liminf_{n\to\infty}\Lambda_n/r^n=-\lvert J\rvert$（$J$ 按指标计重数）；特别地，对每个 $q<r$ 与 $c>0$，有无穷多个 $n$ 使 $\Lambda_n<-c\,q^n$。
- $r\le1$：$\displaystyle\liminf_{n\to\infty}\Lambda_n=\#\{j:\lvert u_j\rvert<1\}$（零项计入；包括有项落在单位圆上、相位为 $2\pi$ 的有理倍的情形）。

两条都是下极限；上极限不在本条范围内。

**推论 C（倒数模长）。** 若存在映射 $\sigma:\iota\to\iota$ 使一切 $j$ 有 $\lvert u_{\sigma(j)}\rvert\,\lvert u_j\rvert=1$（例如族在 $u\mapsto u^{-1}$ 或 $u\mapsto\overline u^{\,-1}$ 下封闭；$\sigma$ 不必是双射），则 $\Lambda_n\ge0\ (\forall n\ge1)\iff$ 一切 $\lvert u_j\rvert=1\iff\{\operatorname{diag}(u_j)^n:n\in\mathbb{Z}\}$ 有界；此时 $\liminf_n\Lambda_n=0$。不满足时有某个 $\lvert u_j\rvert>1$，定理 B 给出 $\Lambda_n$ 无穷多次为负且负到 $r^n$ 的量级。Z5 是 $\sigma$ 取 $u\mapsto u^{-1}$ 的特例。

**证明。** 1⇒2：$(\ast)$ 与 $\operatorname{Re}w\le\lvert w\rvert$ 给出 $1-\operatorname{Re}u_j^{\,n}\ge1-\lvert u_j\rvert^n\ge0$。2⇒3、2⇒7（取 $C=0$）显然；2⇒4：$\operatorname{Re}p_n=m-\Lambda_n\le m$。1⇒5⇒4 与 1⇔6 显然（$\lvert p_n\rvert\le\sum_j\lvert u_j\rvert^n$；对角矩阵的算子范数是 $\max_j\lvert u_j\rvert^n$）。3⇒1：对族 $(u_j^d)$ 用 4⇒1，因为 $\operatorname{Re}\sum_j(u_j^d)^k=m-\Lambda_{dk}\le m$（$k\ge k_0$），得 $\lvert u_j\rvert^d\le1$。剩下 4⇒1 与 7⇒1，都来自定理 B。

定理 B 的关键是**环面上的回归**：写 $u_j=\lvert u_j\rvert e^{i\phi_j}$（$u_j=0$ 时取 $\phi_j=0$），则 $\operatorname{Re}u_j^{\,n}=\lvert u_j\rvert^n\cos n\phi_j$；只要对每个 $\varepsilon$ 有无穷多个 $n$ 使一切 $\cos n\phi_j>1-\varepsilon$，逐项乘 $\lvert u_j\rvert^n\ge0$ 再求和即得。回归有三种证法。(i) 紧性：$g=(e^{i\phi_j})_j$ 的幂在紧群 $\mathbb{T}^\iota$ 中有收敛子列 $g^{n_k}$，相邻两项之商 $g^{n_{k+1}-n_k}\to1$，且可取 $n_{k+1}-n_k\to\infty$。(ii) 抽屉原理：把 $(\mathbb{R}/\mathbb{Z})^{m'}$ 切成 $6^{m'}$ 个边长 $\tfrac16$ 的半开盒子，$6^{m'}+1$ 个点 $\bigl(kL\phi_j/2\pi\bmod1\bigr)_j$（$k=0,\dots,6^{m'}$）中有两个同盒，取 $n=(k_2-k_1)L$，则 $n\phi_j$ 与 $2\pi\mathbb{Z}$ 的距离小于 $\pi/3$，$\cos n\phi_j>\tfrac12$。(iii) 由冻结定理推出：书稿 §22.3 定理 `thm-torus-power-orbit-closure` 第 1 款（冻结 `D5/S3/Fourier/TorusOrbitClosure.result`）说，$z$ 属于 $\{g^n:n\ge0\}$ 的闭包当且仅当一切满足 $\prod_jg_j^{k_j}=1$ 的整向量 $k$ 也满足 $\prod_jz_j^{k_j}=1$。对 $h=g^L$ 取 $z=h^{-1}$，右端显然成立，所以 $h^{-1}$ 在 $\{h^k:k\ge0\}$ 的闭包里；对 $1$ 的任一邻域 $U$，$h^{-1}U$ 是 $h^{-1}$ 的邻域，于是有 $k\ge0$ 使 $h^{k+1}\in U$，即 $n=L(k+1)\ge L$ 使 $g^n\in U$。（直接取 $z=1$ 只得到平凡的 $n=0$，所以要绕道 $h^{-1}$。）

4⇒1：设 $n\ge N_0$ 时 $\operatorname{Re}p_n\le C$ 而某 $\lvert u_{j_0}\rvert=R>1$；定理 B 给出无穷多个 $n$ 使 $\tfrac12R^n\le\tfrac12\sum_j\lvert u_j\rvert^n\le\operatorname{Re}p_n\le C$，与 $R^n\to\infty$ 矛盾。7⇒1：设某 $\lvert u_{j_0}\rvert=R>1$，取 $\varepsilon=\tfrac12\ln R$，$s=e^\varepsilon=\sqrt R$；假设给出 $\operatorname{Re}p_n\le m+Cs^n$，定理 B 给出无穷多个 $n$ 使 $\tfrac12(s^n)^2\le m+Cs^n$，与 $s^n\to\infty$ 矛盾。

两条下极限：$r>1$ 时，一方面 $\Lambda_n/r^n\ge mr^{-n}-\lvert J\rvert-\sum_{j\notin J}(\lvert u_j\rvert/r)^n\to-\lvert J\rvert$；另一方面定理 B 给出无穷多个 $n$ 使 $\Lambda_n/r^n\le mr^{-n}-(1-\varepsilon)\lvert J\rvert$。$r\le1$ 时 $\Lambda_n=\sum_{\lvert u_j\rvert=1}(1-\cos n\phi_j)+\sum_{\lvert u_j\rvert<1}(1-\operatorname{Re}u_j^{\,n})$，第一项非负且由回归无穷多次小于任给的正数，第二项趋于 $\#\{\lvert u_j\rvert<1\}$。推论 C：由定理 A 得一切 $\lvert u_j\rvert\le1$，又 $\lvert u_j\rvert=1/\lvert u_{\sigma(j)}\rvert\ge1$；整数次幂有界即 $\lvert u_j\rvert\le1$ 且 $\lvert u_j\rvert^{-1}\le1$。$\square$

**与本书记号的对应。** 本书用 $u_\rho=1-\tfrac1\rho$，$\lvert u_\rho\rvert\le1\iff\operatorname{Re}\rho\ge\tfrac12$（Z1）。所以对有限个点 $\rho\ne0$，定理 A 说 $\operatorname{Re}\sum_\rho\bigl[1-(1-\tfrac1\rho)^n\bigr]\ge0$ 对一切 $n\ge1$ 成立当且仅当一切 $\operatorname{Re}\rho\ge\tfrac12$；点集在 $\rho\mapsto1-\overline\rho$ 下封闭时（$\lvert u_{1-\overline\rho}\rvert=\lvert u_\rho\rvert^{-1}$），推论 C 说它当且仅当一切 $\operatorname{Re}\rho=\tfrac12$。冻结玩具谱 $\{\tfrac7{10}\pm5i,\tfrac3{10}\pm5i\}$ 是推论 C 的一个实例：四个旋子恰为 $e^{\pm q\pm i\theta}$（$q=0.0079084290$，$\theta=0.1990240966$），按冻结定理 `four_point_power_defect_eq` 的公式 $\Lambda_n=4\bigl(1-\cosh(nq)\cos(n\theta)\bigr)$，推论 C 预言它无穷多次为负；冻结的 `li_positivity_distinguishes_the_off_line_toy_spectrum` 记录的是第一个（$n=31$）。

**Z13.4 文献归属（对照预印本核对）。** E. Bombieri & J. C. Lagarias, *Complements to Li's criterion for the Riemann hypothesis*, J. Number Theory **77** (1999), 274–287, DOI `10.1006/jnth.1999.2392`。读到的是 Lagarias 主页上的预印本（PostScript，`final11aug.dvi`），从中提取文本逐句核对；期刊版是否逐字相同未核对。预印本的定理 1：多重集 $R$ 满足 (i) $1\notin R$，(ii) $\sum_\rho(1+\lvert\operatorname{Re}\rho\rvert)/(1+\lvert\rho\rvert)^2<\infty$；则 (a) 一切 $\operatorname{Re}\rho\le\tfrac12$，(b) $\sum_\rho\operatorname{Re}\bigl[1-(1-1/\rho)^{-n}\bigr]\ge0$（$n=1,2,\dots$），(c) 对每个 $\varepsilon>0$ 有 $c(\varepsilon)$ 使该和 $\ge-c(\varepsilon)e^{\varepsilon n}$，三者等价。和按 $\lvert\operatorname{Im}\rho\rvert\le T$ 截断后令 $T\to\infty$；$\rho=0$ 时 $(1-1/\rho)^{-n}=\bigl(\rho/(\rho-1)\bigr)^n$ 对正整数 $n$ 约定为 $0$。证明：(a)⇒(b) 用 $\lvert1-1/\rho\rvert^{-2}=1+(2\beta-1)/\lvert1-\rho\rvert^2$；(c)⇒(a) 把模最大的有限个项分出来，由狄利克雷联立逼近使余弦和任意接近项数 $K$，其余项为 $O\bigl(n^2(1+t-\delta)^n\bigr)$。推论 1（Li 判据）再加 $0\notin R$ 与“$\rho\in R\Rightarrow1-\rho,\overline\rho\in R$（重数相同）”，结论换成 $\operatorname{Re}\rho=\tfrac12$ 与 $\lambda_n\ge0$，证明是对 $R$ 与 $1-R$ 各用一次定理 1。

换元 $u=\rho/(\rho-1)=(1-1/\rho)^{-1}$ 是 $\mathbb{C}\setminus\{1\}$ 上的对合，$\lvert u\rvert\le1\iff\operatorname{Re}\rho\le\tfrac12$；它是本书零点旋子 $u_\rho=1-1/\rho$ 的倒数，所以半平面的方向与书中相反。$u_j=1$ 的项对 $\Lambda_n$ 的贡献为零，先去掉即可；$u_j=0$ 对应 $\rho=0$ 与上述约定；有限多重集自动满足 (ii)。因此**定理 A 的 1⇔2⇔7 恰是 Bombieri–Lagarias 定理 1 的有限情形**（`文献结果`）。定理 A 的 3–6 款、定理 B 的显式抽屉界与两条下极限、推论 C 用“模长倒数配对”代替“$1-\rho$ 与共轭封闭”的写法，以及经冻结轨道闭包定理的回归推导，是本笔记补写的初等推论（`手工推导`）；“幂和有界推出模不超过 $1$”也是韦伊猜想教科书论证中的标准步骤（凭记忆，未核对具体出处）。

### Z14 假设的必要性与反例（手工推导；数值见第 7 节）

1. **“一切 $\lvert u_j\rvert=1$”需要倒数模长配对。** $\{\tfrac12\}$ 与共轭封闭的 $\{0.9e^{\pm i}\}$ 使 $\Lambda_n>0$ 对一切 $n$ 成立，模长却不是 $1$。只要求共轭封闭不够；定理 A（$\le1$ 的版本）不需要任何对称。
2. **零项与重复项。** 零项允许：对 $n\ge1$ 贡献 $1$，在 $r\le1$ 的下极限中计入 $\#\{\lvert u\rvert<1\}$；推论 C 的假设自动排除零项。重复项只影响计数 $\lvert J\rvert$。
3. **沿等差数列检验已经足够**（定理 A 第 3 款）。
4. **沿倍增子列检验不够。** 四点族 $\{2e^{\pm2\pi i/3},\tfrac12e^{\pm2\pi i/3}\}$ 在 $u\mapsto u^{-1}$ 与共轭下都封闭，两项在圆外。记 $\omega=e^{2\pi i/3}$，$\omega^n+\omega^{-n}$ 在 $3\mid n$ 时为 $2$，否则为 $-1$，故 $\Lambda_n=4-(2^n+2^{-n})(\omega^n+\omega^{-n})$。$3\nmid2^k$，所以对一切 $k\ge0$ 有 $\Lambda_{2^k}=4+2^{2^k}+2^{-2^k}>0$，而 $\Lambda_3=-\tfrac{49}4=-12.25$，沿等差数列 $3,6,9,\dots$ 全为负。这个反例依赖相位 $2\pi/3$ 与倍增的共振：$2^k\cdot\tfrac{2\pi}3$ 总落在 $\pm\tfrac{2\pi}3$ 上。它说明“只在 $n=2^\ell$ 处看 Li 型和”不是有效的检验；它**不是**对 §34.29.3 模型的反驳——那里的模型说的是模长 $\lvert w\rvert^{2^\ell}$，模长按定义会放大，只是它不是可观测的 Li 和（见第 8 节第 5 条）。
5. **只有倒数对称、没有共轭对称。** $\{e^{\pm(\eta+i\phi)}\}$：$\Lambda_n=2-2\cosh(n\eta)\cos(n\phi)$，推论 C 照常适用（$\eta=0.01$、$\phi=2\pi(\sqrt2-1)$ 时首个负值在 $n=29$）。
6. **有限性不能无条件去掉。** 对无穷族，和本身要收敛才有意义，Bombieri–Lagarias 用条件 (ii)；定理 B 中“其余项指数地小”要换成他们的 $O\bigl(n^2(1+t-\delta)^n\bigr)$ 估计。对 ζ 的零点，判据的定理方向另需输入（Z4）。
7. **一侧界的方向不可互换。** 定理 A 第 4 款要求 $\operatorname{Re}p_n$ 有**上**界；有下界不够：$\{2\}$ 使 $\operatorname{Re}p_n=2^n$ 有下界而 $\lvert u\rvert>1$。

## 3. 已被证明的情形：有限域上的椭圆曲线（线索 3、5）

### Z6 Hasse 定理逐字是 R2 的命题，点数是弗罗贝尼乌斯旋子幂次的矢高（文献结果；字典为手工推导）

设 $E/\mathbb{F}_q$ 是椭圆曲线，$\pi$ 是 $q$ 次弗罗贝尼乌斯自同态，$\alpha\mapsto\hat\alpha$ 是对偶同源，$a=\pi+\hat\pi\in\mathbb{Z}$，$\pi\hat\pi=q$（`文献结果`：Silverman, *The Arithmetic of Elliptic Curves*, 第 III、V 章）。在实代数 $\mathcal{A}=\mathbb{R}[\pi]\subset\operatorname{End}(E)\otimes\mathbb{R}$ 中取对偶同源为对合：

1. $u:=\pi/\sqrt q$ 是公平元，求同读数是实标量 $s=a/(2\sqrt q)$（书稿 [§29.2.3](../../books/quantum-geometry/zh/ch29-s02-prime-seams-and-elliptic-tori.md) 的弗罗贝尼乌斯余弦），矢高 $v=1-\dfrac{a}{2\sqrt q}$。
2. $(\mathrm{Pos})$ 在 $\mathcal{A}$ 中成立：$\alpha\hat\alpha=\deg\alpha$，而次数是正定二次型（`文献结果`，同上 III.6.3；它在 $\mathbb{Z}[\pi]$ 上取整数值且对非零元为正，所以实扩张也正定——有理半正定矩阵的核是有理子空间）。
3. 于是 R2 的命题直接给出：$u=\pm1$ 或 $0<v<2$，即 **$\lvert a\rvert\le2\sqrt q$（Hasse 1936）**。R2 证明里的两个量 $\Delta^*\Delta=2v$ 与 $(u+1)^*(u+1)=2(2-v)$ 在这里是 $\deg(\pi\mp\sqrt q)/q\ge0$，与教科书证明（对 $\deg(m+n\pi)$ 用判别式）是同一个论证。
4. 点数公式（`文献结果`：$\#E(\mathbb{F}_{q^n})=q^n+1-\alpha^n-\overline\alpha^{\,n}$）在矢高记号下是

$$
\#E(\mathbb{F}_{q^n})=\bigl(q^{n/2}-1\bigr)^2+2q^{n/2}\,v_n,\qquad v_n=1-T_n(1-v),
$$

所以 Hasse–Weil 界 $(q^{n/2}-1)^2\le\#E(\mathbb{F}_{q^n})\le(q^{n/2}+1)^2$ 就是 $0\le v_n\le2$。由 Z5（或 R20）：这组界对一切 $n$ 成立，当且仅当弗罗贝尼乌斯旋子是椭圆的或 $\pm1$。这里的 Li 型和是 $\Lambda_n=2v_n$。

在这个情形里，“公平元 + 对合正性 $\Rightarrow$ 椭圆”不是类比，是证明本身；亏格 $g$ 的曲线上正性由雅可比簇上罗萨蒂对合的正性（等价地，$C\times C$ 上的卡斯特尔诺沃—塞维里不等式）提供（`文献结果`：A. Weil, 1948）。

复算（脚本逐点数出 $\mathbb{F}_{p^n}$ 上的点）：$y^2=x^3-x$ 在 $\mathbb{F}_{13}$ 上 $a=6$、$v=0.16795$，$\#E=8,\,160$（$n=1,2$）；$y^2=x^3+x+1$ 在 $\mathbb{F}_7$ 上 $a=3$、$v=0.43305$，$\#E=5,\,55,\,380$；另三条曲线同样与公式吻合到 $10^{-15}$。

### Z16 有限域上的 Li 和：哈塞定理是“全部 Li 和非负”的一个已证实例（文献结果 + 手工推导）

沿用 Z6 的记号：$N_n=\#E(\mathbb{F}_{q^n})$，$a=q+1-N_1$，$\alpha,\beta$ 为 $x^2-ax+q$ 的两根，$N_n=q^n+1-\alpha^n-\beta^n$（`文献结果`，Silverman 第 V 章，节号凭记忆）。令 $u=\alpha/\sqrt q$，则 $\alpha\beta=q$ 给出 $\beta/\sqrt q=u^{-1}$，两元族 $\{u,u^{-1}\}$ 满足推论 C 的倒数模长条件。它的有限 Li 和是

$$
\Lambda_n=2-\frac{\alpha^n+\beta^n}{q^{n/2}},\qquad N_n=\bigl(q^{n/2}-1\bigr)^2+q^{n/2}\Lambda_n
$$

（`手工推导`；$\Lambda_n=2v_n$，与 Z6 第 4 款一致）。

1. 由推论 C：“一切 $n$ 有 $N_n\ge(q^{n/2}-1)^2$” $\iff\lvert u\rvert=1\iff\lvert a\rvert\le2\sqrt q$（$\lvert a\rvert>2\sqrt q$ 时两根为实数且一根的模大于 $\sqrt q$）。由定理 A 第 4 款：只要有常数 $C$ 使 $N_n\ge q^n-Cq^{n/2}$ 对充分大的 $n$ 成立（等价于 $\operatorname{Re}p_n=(\alpha^n+\beta^n)/q^{n/2}$ 有上界），就已有 $\lvert a\rvert\le2\sqrt q$（`手工推导`）。
2. 哈塞定理 $\lvert a\rvert\le2\sqrt q$（H. Hasse 1936，`文献结果`）因此等价于全部有限域 Li 和非负，并且此时 $0\le\Lambda_n\le4$。它的正性来源是次数形式的正定（Z6 第 2 款），不是 Z13 的有限族定理。
3. 方向（`手工推导`）：在 $x^2-ax+q$ 的代数里，只有上界 $N_n\le q^n+1+Cq^{n/2}$（等价于 $\operatorname{Re}p_n$ 有下界）推不出 $\lvert a\rvert\le2\sqrt q$：$a=7$、$q=9$ 时两根都是正实数，$N_n\le q^n+1$ 恒成立而 $\lvert u\rvert>1$（这里不声称存在这样的曲线，只说明不等式的逻辑）。文献中由斯捷潘诺夫—邦别里的上界推出韦伊界另有论证，未核对。
4. 库状态：钉版 Mathlib 没有哈塞界（`Mathlib/AlgebraicGeometry/EllipticCurve/LFunction.lean` 只定义 `WeierstrassCurve.localPolynomial`）；冻结 D5 也没有，唯一相关的是已冻结模块 `D5/S3/QuadraticForms/ParallelogramConstruction` 文档中的一句说明（次数形式非负经柯西—施瓦茨给出哈塞界），没有对应定理。所以 Z16 在书稿中只能是注记。

## 4. 函数方程、单调性、欧拉乘积、平方可和阈值与显式公式

### Z7 函数方程是一个公平比较；$\chi$ 看不见零点（线索 2；手工推导 + 文献结果）

1. $\zeta(s)=\chi(s)\zeta(1-s)$，$\chi(s)\chi(1-s)=1$。在亚纯函数代数上取对合 $f^\sharp(s)=f(1-s)$，则 $\chi$ 是公平元，$\zeta$ 与 $\zeta^\sharp$ 的比较值就是 $\chi$。记 $g(s)=\pi^{-s/2}\Gamma(s/2)$，则 $\chi=g^\sharp/g$：伽马因子是把这个比较化成势之比的那个势（R6 的锚定表示），$\xi=\tfrac12s(s-1)\,g\,\zeta$ 是锚定之后的读数，$\xi^\sharp=\xi$。
2. 在临界线上 $\chi\bigl(\tfrac12+it\bigr)=e^{-2i\vartheta(t)}$：求同 $S=\cos2\vartheta$，求异 $A=-i\sin2\vartheta$，矢高 $v=2\sin^2\vartheta(t)$。半比较（R9）是 $\chi^{1/2}=e^{-i\vartheta}$，哈代函数 $Z=\chi^{-1/2}\zeta$ 是把比较对半分给两侧之后的读数，取实值。
3. $\zeta\bigl(\tfrac12+it\bigr)=Z(t)e^{-i\vartheta(t)}$，即 $\operatorname{Re}\zeta=Z\cos\vartheta$，$\operatorname{Im}\zeta=-Z\sin\vartheta$。**零点是振幅 $Z$ 过零，两个读数同时消失；它不是旋子事件。** 旋子事件是另外两族点：格拉姆点 $\vartheta(g_n)=n\pi$（$\chi$ 回到 $1$，矢高为零，求异读数 $\operatorname{Im}\zeta$ 消失）与 $\vartheta\equiv\tfrac\pi2$ 的点（求同读数 $\operatorname{Re}\zeta$ 消失）。
4. $\chi$ 的零点与极点全部来自伽马因子；ζ 的非平凡零点在比值 $\zeta(s)/\zeta(1-s)$ 中成对消去。**这个公平比较不携带非平凡零点的任何信息**，这是冻结定理 `full_symmetry_not_fixed_line_localization`（对称性不蕴含定线局域化）的另一种说法。
5. （`文献结果`）零点计数 $N(T)=\dfrac{\vartheta(T)}{\pi}+1+S(T)$，$S(T)=\tfrac1\pi\arg\zeta(\tfrac12+iT)=O(\ln T)$（von Mangoldt、Backlund；Titchmarsh 第 9 章）：$[0,T]$ 上的零点个数等于旋子 $\chi^{-1}$ 转过的整圈数加 $1$ 再加起伏 $S(T)$。“每两个相邻格拉姆点之间恰有一个零点”（格拉姆定律）在低处成立而无穷多次失效（`文献结果`，未核对出处）。
6. 离开临界线。（手工推导）$\partial_\sigma\ln\lvert\chi(\sigma+it)\rvert\big|_{\sigma=1/2}=\ln\pi-\operatorname{Re}\psi\bigl(\tfrac14+\tfrac{it}2\bigr)$，右端对 $\lvert t\rvert$ 严格递减，唯一正零点 $t_0=6.289835988836903\ldots$；所以 $\lvert t\rvert<t_0$ 时紧靠临界线右侧 $\lvert\chi\rvert>1$，$\lvert t\rvert>t_0$ 时 $\lvert\chi\rvert<1$。（`文献结果`）对一切 $\sigma>\tfrac12$ 与 $\lvert t\rvert\ge6.29073$ 有 $\lvert\chi(s)\rvert<1$，等价地 $\lvert\zeta(1-s)\rvert>\lvert\zeta(s)\rvert$ 在 $\zeta(s)\ne0$ 处成立（R. Spira 1965；R. D. Dixon & L. Schoenfeld 1966；F. Saidak & P. Zvengrowski 2003；T. Trudgian `arXiv:1312.1409`；常数按检索摘要，未读原文）。按 R3 的分类，$\operatorname{diag}(\chi(s),\chi(1-s))$ 在临界线上是椭圆元或 $\pm1$，在 $\lvert t\rvert\ge6.29073$ 的线外是双曲元（$\chi(s)$ 为实数时）或斜驶元。这是关于伽马因子的陈述，与零点无关。

证明。第 1 款由 $\xi(s)=\xi(1-s)$（冻结定理 `xi_reading_reflection`）与因子 $s(s-1)$ 的对称得到。第 2 款：线上 $\tfrac{1-s}2=\overline{s/2}$，故 $\chi=\pi^{it}\,\overline{\Gamma(s/2)}/\Gamma(s/2)=e^{it\ln\pi-2i\arg\Gamma(1/4+it/2)}$；$\overline{Z}=e^{-i\vartheta}\zeta(1-s)=e^{-i\vartheta}\zeta(s)/\chi(s)=Z$。第 6 款：对 $\ln\lvert\chi\rvert=(\sigma-\tfrac12)\ln\pi+\operatorname{Re}\ln\Gamma\bigl(\tfrac{1-s}2\bigr)-\operatorname{Re}\ln\Gamma\bigl(\tfrac s2\bigr)$ 求导；单调性来自 $\operatorname{Re}\psi(x+iy)=-\gamma_{\mathrm{E}}+\sum_{k\ge0}\bigl[\tfrac1{k+1}-\tfrac{k+x}{(k+x)^2+y^2}\bigr]$ 逐项对 $\lvert y\rvert$ 递增。$\square$

数值观察（不是定理）：在 $t=6.2899$（略高于 $t_0$）处，$\ln\lvert\chi(\sigma+it)\rvert$ 在 $\sigma\in[0.51,8.49]$ 的网格上全为负。文献常数 $6.29073$ 与局部阈值 $t_0$ 之间是否还有反例，本轮没有结论。

### Z8 基点旋子与 $\lvert\xi\rvert$ 的单调性（线索 2；手工推导 + 文献结果）

对 $\sigma\ne\tfrac12$ 的基点 $s$，令 $u_\rho(s):=\dfrac{\rho-s}{\rho-(1-\overline s)}$（$s=1$ 时即 $u_\rho$）。

1. $\lvert u_\rho(s)\rvert=1\iff\beta=\tfrac12$（$\rho$ 到 $s$ 与到其镜像 $1-\overline s$ 等距）。
2. **总矢高恒等式（无条件）。**

$$
\sum_\rho\bigl(1-u_\rho(s)\bigr)=(2\sigma-1)\,\overline{\frac{\xi'}{\xi}(s)},\qquad \sum_\rho\bigl(1-\operatorname{Re}u_\rho(s)\bigr)=(2\sigma-1)\,\partial_\sigma\ln\lvert\xi(\sigma+it)\rvert=(2\sigma-1)\sum_\rho\frac{\sigma-\beta}{\lvert s-\rho\rvert^2}.
$$

第一个和按对称截断，后两个绝对收敛。

3. 所以下列三条等价，并且都等价于 RH（`OPEN`）：(i) 从右半平面每个基点看出去，零点旋子的总矢高为正；(ii) $\operatorname{Re}\dfrac{\xi'}{\xi}(s)>0$ 对一切 $\sigma>\tfrac12$；(iii) 对每个 $t$，$\lvert\xi(\sigma+it)\rvert$ 在 $\sigma>\tfrac12$ 上严格递增。(iii) 是 J. Sondow & C. Dumitrescu, *Period. Math. Hungar.* **60** (2010), 37–40 的推论 1（`文献结果`，`arXiv:1005.1104` 已核对：其定理 1 说 $\lvert\xi\rvert$ 在任何无零点的开右半平面内沿水平射线严格递增，证明用阿达马乘积）；(ii) 是 A. Hinkkanen (1997) 与 J. C. Lagarias (*Acta Arith.* **89** (1999), 217–234) 的判据（`文献结果`，未核对原文）。

证明。$1-u_\rho(s)=\dfrac{2\sigma-1}{\rho-(1-\overline s)}$；阿达马乘积给出 $\dfrac{\xi'}{\xi}(w)=\sum_\rho\dfrac1{w-\rho}$（对称截断；文献结果），取 $w=1-\overline s$ 并用 $\dfrac{\xi'}\xi(1-z)=-\dfrac{\xi'}\xi(z)$、$\dfrac{\xi'}\xi(\overline z)=\overline{\dfrac{\xi'}\xi(z)}$。实部逐项为 $(\sigma-\beta)/\lvert s-\rho\rvert^2$ 的 $(2\sigma-1)$ 倍，量级 $\gamma^{-2}$。第 3 款：RH 下每项为 $1-\cos\theta>0$；反之若有 $\beta_0>\tfrac12$ 的零点，$\lvert\xi(\sigma+i\gamma_0)\rvert$ 在 $\sigma=\beta_0$ 处为零，不可能在 $(\tfrac12,\infty)$ 上严格递增。$\square$

在 $s=1$ 处总矢高就是 $\lambda_1$。把基点取在实数 $a\ne\tfrac12$ 并取 $n$ 次幂，得到带参数的 Li 判据 $\sum_\rho\bigl(1-u_\rho(a)^n\bigr)\ge0$（`文献结果`：Sekatskii, `arXiv:1304.7895`，定理 1，已核对其陈述）。Sondow–Dumitrescu 的单调性在矢高语言里是自然的，不是硬套：它就是“一次幂、任意基点”的 Li 型正性。

### Z9 欧拉乘积的矢高形式与 3-4-1 恒等式（线索 5；手工推导 + 文献结果）

设 $\sigma>1$。素数旋子 $r_p(t)=p^{-it}$ 的矢高记作 $v_p(t)=1-\cos(t\ln p)$，$k$ 次幂的矢高 $v_{p^k}(t)=1-T_k(1-v_p)$。

1. $\lvert1-p^{-s}\rvert^2=(1-p^{-\sigma})^2+2p^{-\sigma}v_p(t)$，从而

$$
\frac{\lvert\zeta(\sigma+it)\rvert^2}{\zeta(\sigma)^2}=\prod_p\Bigl[1+\frac{2p^{-\sigma}}{(1-p^{-\sigma})^2}\,v_p(t)\Bigr]^{-1}\le1,
$$

等号当且仅当一切素数矢高为零，即 $t=0$（$v_2(t)=v_3(t)=0$ 要求 $t\ln2,\,t\ln3\in2\pi\mathbb{Z}$，由 $\ln2/\ln3$ 无理得 $t=0$；冻结定理 `prime_log_rational_independence`）。

2. **3-4-1 恒等式就是倍角律。** 由 R20 的 $v_2=2v_1(2-v_1)$，

$$
3+4\cos\phi+\cos2\phi=8-4v_1-v_2=2\,(2-v_1)^2\ \ge0 .
$$

于是

$$
3\ln\zeta(\sigma)+4\ln\lvert\zeta(\sigma+it)\rvert+\ln\lvert\zeta(\sigma+2it)\rvert=\sum_p\sum_{k\ge1}\frac{p^{-k\sigma}}{k}\cdot2\bigl(2-v_{p^k}(t)\bigr)^2\ \ge0,
$$

右端是素数幂旋子的**余矢高** $2-v$ 的平方和。由此得 $\zeta(1+it)\ne0$（`文献结果`：Hadamard、de la Vallée Poussin 1896；这一形式归于 Mertens 1898；非零性已冻结为 `completedRiemannZeta_ne_zero_of_one_le_re`，乘积形式的不等式本身已冻结，见 Z17）。

证明。第 1 款：$\lvert1-re^{i\phi}\rvert^2=(1-r)^2+2r(1-\cos\phi)$，对欧拉乘积逐因子相除。第 2 款：$\ln\lvert\zeta(\sigma+it)\rvert=\sum_{p,k}\tfrac{p^{-k\sigma}}{k}\cos(kt\ln p)$，再代入 $1+\cos\phi=2-v$。$\square$

**障碍（文献结果）。** 用任何固定的非负三角多项式代替 $3+4\cos\phi+\cos2\phi$，这条论证给出的无零点区域宽度都是 $\asymp1/\ln\lvert t\rvert$，在高处收缩到直线 $\sigma=1$；已知最好的无零点区域（Vinogradov–Korobov 型，另需指数和估计）同样如此。目前不知道任何形如 $\sigma>1-\varepsilon$ 的无零点带。与 Z4 对照：有限多个幂次的正性只管到 $\sigma=1$ 附近，全部幂次的正性等价于 RH。两处都是“旋子幂次矢高的非负组合”，中间没有已知的插值。

### Z17 3-4-1 不等式的冻结形式（冻结 + 文献结果 + 手工推导）

Z9 第 2 款的恒等式 $3+4\cos\phi+\cos2\phi=2(1+\cos\phi)^2=2(2-v)^2$ 在冻结库中有一条现成的结论：`D5/S3/Weil/ZetaPntBounds/ZetaBoundsLower.norm_zeta_product_ge_one`（模块已冻结，状态片中该声明种类为 `theorem`，声明在根命名空间）：

```lean
lemma norm_zeta_product_ge_one {x : ℝ} (hx : 0 < x) (y : ℝ) :
    ‖ζ (1 + x) ^ 3 * ζ (1 + x + I * y) ^ 4 * ζ (1 + x + 2 * I * y)‖ ≥ 1
```

其中 `ζ` 是 `riemannZeta` 的局部记号。证明把 `riemannZeta` 改写成模 $1$ 平凡狄利克雷特征的 $L$ 级数，直接调用 Mathlib 的 `DirichletCharacter.norm_LSeries_product_ge_one`（`Mathlib/NumberTheory/LSeries/Nonvanishing.lean`）。Mathlib 的证明：三个 $L$ 级数都写成欧拉乘积的 $\exp\sum_p-\log(1-\chi(p)p^{-s})$，乘积的模是 $\exp$ 的实部之和；每个素数处的组合由私有引理 `re_log_comb_nonneg'` 处理：$0\le a<1$、$\lVert z\rVert=1$ 时把三个 $-\log(1-w)$ 展成泰勒级数，第 $n$ 项是 $2a^n\bigl(\operatorname{Re}z^n+1\bigr)^2/n$。取 $a=p^{-(1+x)}$、$z=p^{-iy}$，$\operatorname{Re}z^n+1=2-v_{p^n}(y)$ 正是素数幂旋子的余矢高，所以这就是 Z9 第 2 款的逐项形式。同模块的 `ZetaLowerBound1` 是它的 $\tfrac34,\tfrac14$ 次幂形式。由它推出 $\zeta(1+iy)\ne0$（$y\ne0$）：若 $\zeta(1+iy)=0$，$x\to0^+$ 时 $\zeta(1+x)^3=O(x^{-3})$，$\zeta(1+x+iy)^4=O(x^4)$，$\zeta(1+x+2iy)$ 有界（$1+2iy\ne1$），乘积趋于 $0$，矛盾（`手工推导`；经典论证见 Z9）。书稿 §22.4 的命题 `prop-xi-zeros-strip-zeros` 第 2、3 款合起来给出 $\operatorname{Re}s\ge1$ 时 $\zeta(s)\ne0$，两者结论相同而来源不同。

无零点区域的边界照 Z9：已知的任何无零点区域都在高处收缩到 $\sigma=1$，不知道任何形如 $\sigma>1-\varepsilon$ 的无零点带。冻结库中没有找到独立成条的经典无零点区域声明（按 digest 检索 `zero-free region`、`de la Vall`；未找到不等于不存在）。

### Z10 $\alpha=\tfrac12$ 与 $\sigma=\tfrac12$：同一个平方可和阈值，与零点位置无关（线索 4；手工推导 + 文献结果 + MODEL）

1. （手工推导）步角 $\theta_n=c\,n^{-\sigma}$ 的累计矢高满足

$$
\frac{c^2}{2}\sum_{n\le N}n^{-2\sigma}-\frac{c^4}{24}\sum_{n\le N}n^{-4\sigma}\ \le\ \sum_{n\le N}\bigl(1-\cos\theta_n\bigr)\ \le\ \frac{c^2}{2}\sum_{n\le N}n^{-2\sigma}.
$$

故 $N\to\infty$ 时：$\sigma>\tfrac12$ 收敛；$\sigma=\tfrac12$ 时等于 $\tfrac{c^2}2\ln N+O(1)$；$\sigma<\tfrac12$ 时量级为 $N^{1-2\sigma}$。对素数求和同理：$\sum_p(1-\cos(c\,p^{-\sigma}))$ 收敛当且仅当 $\sigma>\tfrac12$，$\sigma=\tfrac12$ 时为 $\tfrac{c^2}{2}\ln\ln P+O(1)$（用到 Mertens 第二定理，`文献结果`）。
2. （手工推导）有限狄利克雷多项式的均方：

$$
\frac1{2T}\int_{-T}^{T}\Bigl\lvert\sum_{n\le N}a_nn^{-it}\Bigr\rvert^2dt=\sum_{n\le N}\lvert a_n\rvert^2+\sum_{m\ne n}a_m\overline{a_n}\,\frac{\sin(T\ln(n/m))}{T\ln(n/m)}\ \xrightarrow[T\to\infty]{}\ \sum_{n\le N}\lvert a_n\rvert^2 .
$$

取 $a_n=n^{-\sigma}$：均方的极限 $\sum_{n\le N}n^{-2\sigma}$ 关于 $N$ 有界当且仅当 $\sigma>\tfrac12$。对独立均匀相位 $X_p$ 同样有 $\mathbb{E}\bigl\lvert\sum_{p\le P}X_pp^{-\sigma}\bigr\rvert^2=\sum_{p\le P}p^{-2\sigma}$ 与 $\operatorname{Var}\ln\lvert1-X_pp^{-\sigma}\rvert=\tfrac12\operatorname{Li}_2(p^{-2\sigma})$。
3. （冻结）向量 $(n^{-s})_n$ 属于 $\ell^2$ 当且仅当 $\sigma>\tfrac12$，此时范数平方为 $\zeta(2\sigma)$：`labeled_zeta_mem_iff`、`labeled_zeta_norm_sq`。
4. （`文献结果`，未核对页码）$\dfrac1T\int_1^T\lvert\zeta(\sigma+it)\rvert^2dt\to\zeta(2\sigma)$（$\sigma>\tfrac12$），在 $\sigma=\tfrac12$ 上 $\sim\ln T$（Hardy–Littlewood 1918；Titchmarsh 第 7 章）；$\ln\lvert\zeta(\tfrac12+it)\rvert$ 的方差 $\sim\tfrac12\ln\ln T$（Selberg 1946）；随机欧拉乘积 $\prod_p(1-X_pp^{-s})^{-1}$ 几乎必然在 $\sigma>\tfrac12$ 收敛且无零点（Wintner 1944）。

**与 §34.30.2 的关系。** R12 的等步长情形 $N$ 步、步角 $\propto N^{-\alpha}$，累计矢高 $\asymp N^{1-2\alpha}$；这里是不等步长 $n^{-\sigma}$，累计矢高 $\asymp\sum n^{-2\sigma}$。两处的阈值 $\tfrac12$ 来自同一件初等的事：矢高是步角的二次量，$N$ 个量级 $N^{-2\alpha}$ 的数之和与 $\sum_{n\le N}n^{-2\sigma}$ 都在指数 $1$ 处改变收敛性。差别有两点。其一，临界处的行为不同：等步长给出**有限非零极限** $\tfrac12\sigma_0^2T$（伊藤项），狄利克雷步长给出**对数发散**；临界线不是“矢高共振”的点，而是平方可和性恰好失去的边界。其二，也是要紧的一点：第 3、4 款都是**无条件定理**。$\sigma=\tfrac12$ 作为均方阈值与 RH 是否成立无关，所以它不可能推出零点的位置；满足同型函数方程而在线外有零点的狄利克雷级数是存在的（Davenport–Heilbronn 1936，`文献结果`，书稿 §34.28 已引用）；它的均方阈值同为 $\tfrac12$ 这一点，是按系数有界的狄利克雷级数的一般均值定理推断的，本轮未核对。

**结论：没有找到把 $\alpha=\tfrac12$ 相变与零点位置联系起来的精确陈述。** “素数旋子像独立随机相位，故零点应在均方阈值上”是启发式图像，标 `MODEL`；与之对应的严格命题是 Littlewood 的等价式 $M(x)=O_\varepsilon(x^{1/2+\varepsilon})\Leftrightarrow$ RH（`文献结果`，书稿 §22.4.1 已正确陈述），那是 `OPEN` 的另一种写法。

### Z11 显式公式的权重是零点矢高（手工推导 + 冻结）

冻结的积分显式公式 `actual_integrated_explicit_formula` 左端是 $\sum_\rho\dfrac{e^{\rho y}}{\rho(1-\rho)}$。由 Z2，权重 $\dfrac1{\rho(1-\rho)}=2v_\rho$，所以该公式读作

$$
\sum_\rho2v_\rho\,e^{\rho y}=U(e^y)-\ln2\pi+\sum_{n\ge1}\frac{e^{-2ny}}{2n(2n+1)}\qquad(y>0),
$$

$y\to0^+$ 一侧的总权重是 $\sum_\rho2v_\rho=2\lambda_1=2+\gamma-\ln4\pi=0.0461914\ldots$（冻结定理 `actual_complex_pairWeight_hasSum`）。这个数就是书稿 §34.29.1 的常数 $C_{\mathrm{NBB}}$；Burnol 的下界 $\sum_{\beta=1/2}m_\rho^2/\lvert\rho\rvert^2$（`文献结果`，书稿已引）在本笔记的记号里是在线零点的割弦平方和 $\sum m_\rho^2\lvert\Delta_\rho\rvert^2$。这一条只是改写。

### Z12 Weil 正性与 $(\mathrm{Pos})$：对应到哪里为止（线索 3；文献结果 + 冻结 + 手工推导）

**对象。** 冻结库固定了下列数据（模块 `D5/S3/Weil/TestFunctions`、`ZeroSum`）：$*$-代数 $\mathcal{T}$ 是实直线上偶的紧支光滑复函数，乘法为卷积，对合为 $\tilde g(x)=\overline{g(-x)}$；泛函 $W(F)=\sum_\rho\hat F(\gamma_\rho)$（对称截断），其中 $\rho=\tfrac12+i\gamma_\rho$、$\gamma_\rho\in\mathbb{C}$。冻结定理 `rh_iff_weilSquarePositivity`：对给定的零点数据，RH $\Leftrightarrow$ 对一切 $g$ 有 $\operatorname{Re}W(g*\tilde g)\ge0$；负向见证见 `offLineZero_yields_negative_weil_square`；零点数据的无条件实例是 `zetaZeroData`。该模块自己注明：这是用仓库定义写出的判据，不是 Weil 显式公式判据的逐字转录。经典形式是 A. Weil 1952（`文献结果`）。它是 RH 的等价形式，`OPEN`。

**精确的对应（手工推导）。**

1. $\widehat{\tilde g}(z)=\overline{\hat g(\overline z)}$，故 $W(g*\tilde g)=\sum_\rho\hat g(\gamma_\rho)\,\overline{\hat g(\overline{\gamma_\rho})}$，而 $\overline{\gamma_\rho}$ 是镜像零点 $1-\overline\rho$ 的谱参数。即 $W(g*\tilde g)=[\mathrm{ev}(g),\mathrm{ev}(g)]_J$：**Weil 二次型是 Z2 中克莱因内积在求值映射 $g\mapsto(\hat g(\gamma_\rho))_\rho$ 下的拉回**，$J$ 与冻结的 `mirrorFundamentalSymmetry` 是同一个置换。每个零点给出卷积代数的一个特征 $g\mapsto\hat g(\gamma_\rho)$；对 ζ 的零点，它与对合相容（是 $*$-特征）当且仅当 $\gamma_\rho$ 为实数（偶函数使 $\pm\gamma$ 给出同一特征；纯虚的 $\gamma$ 对应 $(0,1)$ 内的实零点，ζ 没有）。
2. 去掉偶性要求后，平移 $g(x)\mapsto g(x-a)$ 在求值像上的作用是 $V_a=\operatorname{diag}(e^{i\gamma_\rho a})$：无条件 $J$-幺正；幺正 $\iff$ $\{V_a\}_{a\in\mathbb{R}}$ 有界 $\iff$ RH。零点旋子是其生成元 $D=\operatorname{diag}(\gamma_\rho)$ 的凯莱变换：$u_\rho=\dfrac{\gamma_\rho+i/2}{\gamma_\rho-i/2}$（与冻结模块 `LiCausalTrichotomy` 的 `cayley` 同式）。于是“RH $\Leftrightarrow$ $D$ 自伴而不只是 $J$-自伴”，这是希尔伯特—波利亚图景在这个同义反复模型里的写法。
3. Li 系数是 Weil 泛函在一族具体试验函数上的取值（`文献结果`：Bombieri–Lagarias 1999，未读原文）；冻结定理 `causal_iff_integer_iff_monodromy` 给出与之对应的陈述：符号 $u^\kappa-1$ 有因果的 $L^1$ 原像当且仅当 $\kappa$ 是自然数，此时原像是拉盖尔函数 $-e^{x/2}L^{(1)}_{n-1}(-x)$（$x<0$）。

**对应在哪里停止。**

- 在缺口笔记里，正性（$(\mathrm{Pos})$ 或正泛函）是**假设**，椭圆性是**结论**（R2、R7、R20）。对 ζ，已知无条件成立的只有不定的结构（函数方程给出的 $J$-幺正性）；正性本身等价于 RH。所以这条对应把 RH 写成“某个对合是正的”，没有给出证明这个正性的途径。
- 在函数域情形（Z6），正性有**独立来源**：次数或交点形式的正定性。数域情形缺的恰好是这个：不知道有哪个带正对合的 $*$-代数（或带正定形式的几何对象），其中有一个公平元，它的本征旋子是 $u_\rho$。这是已知的障碍（Weil 以来的纲领；Connes、Deninger 等的工作属于此类），`OPEN`。
- 零点希尔伯特空间上的 $U$、$J$、$D$ 是用零点本身定义的，上面的等价全是同义反复。
- 已知的无条件部分正性只覆盖支集很小的试验函数（H. Yoshida 1992；E. Bombieri 2000；A. Connes & C. Consani 2021；`文献结果`，凭记忆列出，未核对）。

脚本里的玩具算例说明第 1 款的符号机制：对离线四点 $\tfrac12\pm0.1\pm14i$，取谱宽度等于偏移 $\delta$ 的高斯型 $\hat g$（空间宽度 $1/\delta$）并把中心调到使 $\arg\hat g(\gamma)=\tfrac\pi2$，四点的贡献是 $-4e^{1-\pi^2/4}=-0.92210$；谱宽度取 $1$ 时同一四点的贡献为正。高斯函数不是紧支的，这只是示意，冻结定理处理紧支情形。

### Z18 Z8 与 Z10 在冻结库中的状态

- Z8（$\lvert\xi\rvert$ 的单调性）：按 digest 检索 `monoton`/`increas` 与 `xi`/`zeta`、`Sondow`、`Hinkkanen`，冻结库中没有对应声明。Sondow–Dumitrescu 的定理 1 与推论 1 仍是文献结果；“对一切 $t$，$\lvert\xi\rvert$ 在 $\sigma>\tfrac12$ 上严格递增 $\iff$ RH”是 `OPEN` 的改写。
- Z10（平方可和阈值）：冻结的 `labeled_zeta_mem_iff` 与 `labeled_zeta_norm_sq` 无条件成立，与零点位置无关；它可以作为 §34.28.2“单程波幅唯一锁向 $p^{-1/2}$”这一 `MODEL` 表述旁的精确陈述（第 8 节第 3 条）。

## 5. 新旧对照

几乎全部内容是经典结果的重述；“本笔记所加”一栏只是记号与连接。

| 结果 | 经典内容或冻结对应 | 本笔记所加 | 新的数学 |
| --- | --- | --- | --- |
| Z1 | 凯莱变换把临界线送到单位圆；已冻结并已写入 §22.4 | 割弦 $=1/\lvert\rho\rvert$、矢高 $=\operatorname{Re}(1/\rho)$ 的读法 | 无 |
| Z2 | 莫比乌斯变换的迹分类；$J$-幺正与幺正之别已冻结 | 矢高 $v_\rho=\tfrac1{2\rho(1-\rho)}$；椭圆 / 斜驶的归类；与 R3、R20 的同一反例 | 无（几行代数） |
| Z3 | Keiper–Li 系数的零点和；有限在线情形的弦平方恒等式已冻结 | 切比雪夫形式及其绝对收敛；弦项减亏量项；倍角律 | 很可能已有等价写法，未排查 |
| Z4 | Li 1997；Bombieri–Lagarias 1999；定理方向已冻结 | 指明两个方向各用什么；(c) 的普林斯海姆证明 | 无 |
| Z5 | 幂和有界性引理（Weil 证明中的标准步骤） | 写成有限族的 Li 判据并给出完整证明 | 无 |
| Z6 | Hasse 1936；Weil 1948；Silverman 教科书证明 | 指出它逐字是 R2 命题与 R20；点数的矢高公式 | 无 |
| Z7 | 函数方程、$\vartheta$、$Z$、$N(T)$；Spira 型不等式 | 公平比较 / 锚定势 / 半比较的读法；$t_0$ 的局部推导 | 无 |
| Z8 | Sondow–Dumitrescu 2010；Hinkkanen 1997；Lagarias 1999；Sekatskii 2014 | 基点旋子与总矢高恒等式 | 无 |
| Z9 | Mertens 3-4-1；经典无零点区域 | 3-4-1 $=$ 倍角律 $=$ 余矢高平方 | 无 |
| Z10 | 均值定理、Mertens、Wintner、Selberg；$\ell^2$ 判据已冻结 | 与 R12 的精确比较；否定性结论 | 无 |
| Z11 | 冻结的积分显式公式；$2+\gamma-\ln4\pi$ | 权重 $=2v_\rho$ 的读法 | 无 |
| Z12 | Weil 1952；冻结的 Weil 平方判据 | Weil 型 $=$ 克莱因型的拉回；对应的边界 | 无 |
| Z13 | Bombieri–Lagarias 1999 定理 1 的有限情形；回归引理在 Mathlib 中已有 | 七条等价、显式抽屉界、两条下极限、倒数模长推论；经冻结轨道闭包定理的回归推导 | 无（初等推论） |
| Z14 | — | 各假设的反例；倍增子列不够的四点族 | 无 |
| Z16 | Hasse 1936；点数公式 | 有限域 Li 和的读法；一侧界的方向 | 无 |
| Z17 | Mertens 3-4-1；冻结 `norm_zeta_product_ge_one`，Mathlib 的同型不等式 | Mathlib 证明的逐项形式就是余矢高平方 | 无 |

## 6. 所钉提交上的冻结 Lean 声明

GID 为“模块路径（去掉 `.lean`）+ `.` + 声明名”。“冻结”一栏按 `git cat-file -e <提交>:Golden/Frozen/state/<模块>.lean.json` 判定；本轮读了每条声明的 Lean 陈述，没有编译。任何“RH $\Leftrightarrow X$”的声明都是等价形式，不是 RH 的证明。“锁文件”一栏表示书库 `trureturing.lock.json` 是否已解析该声明（否则回写前需 `./tbook pin --refresh`）。

| GID | 实际陈述 | 冻结 | 锁文件 |
| --- | --- | --- | --- |
| `D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line` | $\lVert(s-1)/s\rVert=1\iff\operatorname{Re}s=\tfrac12$ | 是 | 是 |
| `D5/S3/Midline/Cayley/CayleyCriticalLineZetaCriterion.cayley_critical_line_zeta_criterion` | 单位圆判据，以及 `RiemannHypothesis` $\Leftrightarrow$ 一切非平凡零点的对数径向亏量为零 | 是 | 是（书稿已引） |
| `D5/S3/Zeros/ActualZeroGeometry.rh_iff_nontrivial_zero_cayley_norm` | `RiemannHypothesis` $\Leftrightarrow$ 一切非平凡零点满足 $\lVert1-1/\rho\rVert=1$ | 是 | 否 |
| `D5/S3/Midline/Cayley/CayleyUnitarityDefect.cayley_unitarity_defect_formula` | 对给定零点数据：$U^*U-1$ 在第 $n$ 个坐标上是标量 $\lvert u\rvert^2-1=(1-2\operatorname{Re}\rho)/\lvert\rho\rvert^2$；全体零点在中线上 $\Leftrightarrow$ 一切 $\lvert u\rvert=1$ $\Leftrightarrow$ $U^*U=1$ $\Leftrightarrow$ $U$ 双侧幺正 | 是 | 否 |
| `D5/S3/Midline/Cayley/CanonicalZetaCayleyJUnitary.zetaZeroCayleyOperator_j_unitary` | 规范零点数据上 $U^*JU=J$，无条件 | 是 | 否 |
| `D5/S3/Weil/FiniteSpectralCayleyIdentity.finiteLiCoefficient_eq_diagonalHilbertSchmidtDefect` | 对有限实谱 $\gamma_j$ 与一切 $n$：$\sum_j2(1-\operatorname{Re}c_j^n)=\sum_j\lvert1-c_j^n\rvert^2$，$c_j$ 为单位圆上的凯莱结点 | 是 | 否 |
| `D5/S3/Weil/FiniteSpectralCayleyIdentity.cayleyNode_one_sub_normSq` | $\lvert1-c(\gamma)\rvert^2=4/(4\gamma^2+1)$ | 是 | 否 |
| `D5/S3/Zeros/Endpoints/CanonicalLiLocalExpansion.canonical_li_one` | $\lambda_1=1+\tfrac{\gamma}{2}-\ln(2\sqrt\pi)$（导数定义） | 是 | 否 |
| `D5/S3/Zeros/Endpoints/CanonicalLiLocalExpansion.generator_taylor_coefficient` | $(1-z)^{-2}(\xi'/\xi)\bigl(\tfrac1{1-z}\bigr)$ 在 $0$ 处的第 $n$ 个泰勒系数等于 $\lambda_{n+1}$ | 是 | 否 |
| `D5/S3/Weil/Probability/CanonicalLiNonnegativeConverse.canonical_li_nonnegative_implies_rh` | 若 $\lambda_n\ge0$ 对一切 $n\ge1$，则 `RiemannHypothesis`（只有这一个方向） | 是 | 否 |
| `D5/S3/Weil/Probability/CanonicalLiDiskEquivalence.rh_iff_canonical_li_disk_summable` | `RiemannHypothesis` $\Leftrightarrow$ 对每个 $r<1$，$\sum_n\lvert\lambda_{n+1}\rvert r^n$ 可和 | 是 | 否 |
| `D5/S3/Weil/Probability/CanonicalLiDiskEquivalence.rh_iff_xi_disk_ne_zero` | `RiemannHypothesis` $\Leftrightarrow$ $\xi\bigl(\tfrac1{1-z}\bigr)\ne0$ 对一切 $\lVert z\rVert<1$ | 是 | 否 |
| `D5/S3/Weil/Probability/CanonicalLiRadiusObstruction.disk_zero_forces_exponential_escape` | 圆盘内 $\xi\bigl(\tfrac1{1-z}\bigr)$ 的一个零点给出 $R<1$，使 $\lvert\lambda_{n+1}\rvert R^n$ 在每个尾部超过任何常数 | 是 | 否 |
| `D5/S3/Weil/Probability/CanonicalLiRadiusObstruction.rh_iff_canonical_weighted_envelopes` | `RiemannHypothesis` $\Leftrightarrow$ 对每个 $R<1$ 存在 $C$ 使 $\lvert\lambda_{n+1}\rvert R^n\le C$ | 是 | 否 |
| `D5/S3/Zeros/ToySpectrum/OffLineToySpectrum.li_positivity_distinguishes_the_off_line_toy_spectrum` | 四点 $\tfrac7{10}\pm5i,\tfrac3{10}\pm5i$：$\operatorname{Re}\sum(1-(1-1/\rho)^{31})<0$ | 是 | 否 |
| `D5/S3/Weil/ZeroData/ActualReciprocalSquareBounds.actual_complex_pairWeight_hasSum` | $\sum_n m_n/(\rho_n(1-\rho_n))=2+\gamma-2\ln(2\sqrt\pi)$（`HasSum`，规范零点枚举） | 是 | 否 |
| `D5/S3/Weil/ZeroData/ActualReciprocalSquareBounds.actual_height_gt_ten` | 每个非平凡零点 $\lvert\operatorname{Im}\rho\rvert>10$ | 是 | 是 |
| `D5/S3/Weil/Mertens/IntegratedExplicit/WholeFormula.actual_integrated_explicit_formula` | $y>0$ 上的积分显式公式（见 Z11） | 是 | 是 |
| `D5/S3/Weil/Separator/WeilSquarePositivityCriterion.rh_iff_weilSquarePositivity` | 对任给零点数据 $Z$：`RiemannHypothesis` $\Leftrightarrow$ 一切卷积平方的零点和实部非负（仓库自己的定义） | 是 | 否 |
| `D5/S3/Weil/Separator/OffLineZeroNegativeWeilSquare.offLineZero_yields_negative_weil_square` | 存储的离线零点给出一个使该零点和实部为负的试验函数 | 是 | 否 |
| `D5/S3/Analytic/LiCausalTrichotomy.causal_iff_integer_iff_monodromy` | 对 $\kappa\ge0$：Li 符号 $c(\gamma)^\kappa-1$ 有因果 $L^1$ 原像 $\Leftrightarrow\kappa\in\mathbb{N}\Leftrightarrow e^{2\pi i\kappa}=1$，并给出整数情形的拉盖尔原像 | 是 | 未查 |
| `D5/S3/Weil/SpectralHilbert.labeled_zeta_mem_iff`、`.labeled_zeta_norm_sq` | $(n^{-s})\in\ell^2\Leftrightarrow\operatorname{Re}s>\tfrac12$；范数平方 $=\zeta(2\operatorname{Re}s)$ | 是 | 否 |
| `D5/S3/Weil/TestFunctions/LiCurvatureCriterion.li_curvature_criterion` | **带假设的**等价：把 Li 判据、曲率递推、RH 下的傅里叶表示与圆上赫格洛茨表示都作为前提，结论是 RH $\Leftrightarrow$ 托普利茨矩阵半正定 | 是 | 未查 |
| `D5/S3/Weil/ZetaPntBounds/ZetaBoundsLower.norm_zeta_product_ge_one` | $x>0$、$y$ 实数时 $\lVert\zeta(1+x)^3\zeta(1+x+iy)^4\zeta(1+x+2iy)\rVert\ge1$（`riemannZeta`） | 是 | 是（书稿已引） |
| `D5/S3/Weil/ZetaPntBounds/ZetaBoundsLower.ZetaLowerBound1` | $\sigma>1$ 时 $\lVert\zeta(\sigma)\rVert^{3/4}\lVert\zeta(\sigma+2it)\rVert^{1/4}\lVert\zeta(\sigma+it)\rVert\ge1$ | 是 | 否 |
| `D5/S3/Fourier/TorusOrbitClosure.result` | 有限环面上 $z\in\overline{\{g^n:n\ge0\}}$ 当且仅当 $g$ 的整特征关系都被 $z$ 满足 | 是 | 是（书稿已引） |
| `D5/S3/Fourier/Asymptotics/TorusObservationWindowReturns.result` | 有限环面轨道闭包上连续观测量的回归窗口（有界间隔的回归） | 是 | 是 |
| `D5/S3/Zeros/ToySpectrum/FourPointPowerDefect.four_point_power_defect_eq` | 四点族 $e^{\pm q\pm i\theta}$ 的 $k$ 次幂亏量 $=4\bigl(1-\cosh(kq)\cos(k\theta)\bigr)$ | 是 | 否 |

书稿已引用、本笔记也用到的：`xi_reading_reflection`、`xi_reading_one_sub_conj`、`completedRiemannZeta_ne_zero_of_one_le_re`、`riemannZeta_ne_zero_of_real_mem_Ioo`、`prime_log_rational_independence`、`full_symmetry_not_fixed_line_localization`。

**没有找到冻结声明的**（按文件名与声明名检索 `D5/S3` 下的 `Zeros`、`Weil`、`Midline`、`Analytic`；未找到不等于不存在，钉版 Mathlib 未检索）：导数定义系数的“RH $\Rightarrow\lambda_n\ge0$”；$\lambda_n$ 的切比雪夫形式与弦项减亏量项的无穷和形式；Bombieri–Lagarias (c) 的带符号形式；$\chi$ 在临界线上的单位模、$\vartheta$、哈代 $Z$ 与格拉姆点；$\lvert\xi\rvert$ 的单调性判据；经典无零点区域；椭圆曲线的 Hasse 界；有限族 Li 判据或“幂和有界推出模不超过 $1$”。（3-4-1 不等式的乘积形式在 `ZetaPntBounds` 模块中，见 Z17。）

## 7. 数值复算

脚本 `riemann_arc_check.py`（同目录，Python 3，仅用 `mpmath`、`numpy`、`sympy`，约 13 秒）。它核对的内容：

- Z1–Z2：随机点上的代数恒等式；前 10 个零点上 $\lvert u\rvert=1$、弦与矢高的各式（$10^{-25}$）；$4\times4$ 离线四点上 $U^*JU=J$、$U^*U\ne1$、$a^\sharp a=-1$。
- Z3：$n\le8$ 的符号恒等式；$\lambda_n$（$n\le12$）的两种算法——在 $s=1$ 周围的柯西积分（只用 $\xi$ 的定义），与 $n^2\lambda_1+\sum_{k\ge2}a_{n,k}\sum_\rho v_\rho^k$（前 80 个零点加光滑密度尾项）——相差不超过 $2.4\times10^{-7}$；$\lambda_2=4\lambda_1-2\sum v^2$ 与 $n=2,3$ 的倍角律。
- Z4–Z5：冻结玩具谱的第一个负指标是 $31$；“前 80 对在线零点加一组假四点 $\tfrac12\pm0.1\pm14i$”这个**有限**族的 Li 和第一次为负在 $n=8446$。这是玩具模型，不是对真实 $\lambda_n$ 的陈述。
- Z6：五条曲线在 $\mathbb{F}_{p^n}$（$n\le3$）上逐点计数，与矢高公式比较。
- Z7：函数方程、$\chi$ 的单位模、$\chi=e^{-2i\vartheta}$、$Z$ 为实数；$N(T)=\vartheta/\pi+1+S$ 在 5 个高度精确成立；前 40 个格拉姆区间各含一个零点；$t_0$ 及导数公式。
- Z8：5 个基点上总矢高恒等式（前 80 对零点加尾项，尾项误差在 $2\%$ 以内）；$\lvert\xi\rvert$ 在抽样高度上对 $\sigma\in[0.5,3]$ 递增（观察）。
- Z9：$p<2\times10^5$ 的矢高乘积与 $\lvert\zeta(2+3.7i)\rvert^2/\zeta(2)^2$ 相差 $2\times10^{-7}$；3-4-1 的符号恒等式与对数形式。
- Z10：累计矢高的双侧界；$\sigma=\tfrac12$ 时减去 $\tfrac12\ln N$ 后稳定在 $0.2217$；有限 $T$ 均方公式与数值积分一致到 $10^{-12}$；单位根平均下的精确二阶矩。
- Z11：前 80 对零点的显式公式两端之差在尾项界之内（该界假设其余零点在线上）。
- Z12：玩具 Weil 型的符号。
- Z13–Z14：$(\ast)$；300 个闭圆盘内的对抗族（零、重复、单位根、无理角）的 $\Lambda_n\ge0$；圆盘外的族都出现负值；抽屉界 $n\le6^{m'}L$；两条下极限；倒数模长与反例；冻结玩具谱的 $e^{\pm q\pm i\theta}$ 形状；Bombieri–Lagarias 换元；倍增四点族的精确有理值。
- Z16：三条曲线的逐点计数与有限域 Li 和公式；$3\le p\le23$ 上全部 $1454$ 条曲线的哈塞界；一侧界的两个虚构代数。
- Z17：3-4-1 的符号恒等式；Mathlib 泰勒项的分子恒等式；乘积模长在 $4\times7$ 网格上不小于 $1$。

**涉及零点的数值都只用到 `mpmath.zetazero` 给出的前 81 个零点，它们不为 RH 提供这 81 个零点之外的任何证据。Z13–Z17 的数值只关于有限族、有限域或 $\operatorname{Re}s>1$ 的 ζ 值。**

脚本输出：

```text
== 0. data: first K+1 zeros (mpmath.zetazero)
K = 80, gamma_1 = 14.1347251417347, gamma_K = 201.264751943704, cut T = 201.8791732

== Z1. Cayley rotor of a zero: unimodular iff Re = 1/2; chord and sagitta
first zero: theta = 0.0707182629429 rad, sagitta v = 0.00249949441686, chord = 0.0707035277318

== Z2. zero rotor in SL(2,C): v = 1/(2 rho (1-rho)); elliptic iff on the line
classes: on-line zeros elliptic; 0.6+14i loxodromic; real 0.3 hyperbolic; 1/2 gives u=-1
off-line quartet: U^* J U = J holds, U^* U != 1; ||U^n|| for n=1,1e3,1e4: ['1.00051', '1.66451', '163.25']

== Z3. Chebyshev / sagitta form of the Li sum and the chord-defect split
symbolic: (1-u^n)+(1-u^-n) = 2(1-T_n(1-v)) for n<=8; a_{n,1}=n^2, a_{n,2}=-n^2(n^2-1)/6
 n   lambda_n (derivative)     lambda_n (sagitta sums)   difference   lambda_n/(n^2 lambda_1)
 1   0.0230957089661210338   0.0230957089661210338   -8.32e-32   1.0
 2   0.0923457352280466704   0.0923457353679616046   -1.4e-10   0.9995984034
 3   0.207638920554324804   0.207638921393810958   -8.39e-10   0.9989297668
 4   0.368790479492241639   0.368790482290512714   -2.8e-9   0.9979951255
 5   0.575542714461177452   0.575542721456803374   -7.0e-9   0.9967959248
 6   0.827566012282379297   0.827566026973060864   -1.47e-8   0.9953340172
 7   1.12446011757095949   1.12446014499327197   -2.74e-8   0.9936116574
 8   1.46575567714706063   1.46575572415615939   -4.7e-8   0.991631497
 9   1.85091604838253416   1.85091612393181543   -7.55e-8   0.9893965778
10   2.27933936319315774   2.27933947861386768   -1.15e-7   0.9869103246
11   2.75036083822019606   2.75036100750098107   -1.69e-7   0.9841765366
12   3.26325532062461985   3.26325556069101141   -2.4e-7   0.9811993784
lambda_1 = 0.023095708966121; partial sum over 80 pairs = 0.0195662074958; deficit = 0.0035295; density tail = 0.00352383
doubling law lambda_{2n} = 4 lambda_n - 2 sum v_n^2 verified for n = 2, 3

== Z4/Z5. off-line rotors make Li-type sums negative (finite toy families only)
toy quartet 0.5+-0.2+-5i: first negative index n = 31, value -0.0943260185491
fake quartet 0.5+-0.1+-14i: growth exponent eta = |log|u|| = 5.095282e-04 (delta/|rho|^2 ~ 5.095541e-04)
  finite family = 80 on-line pairs + fake quartet: first negative index n = 8446 (value -0.8576)
  quartet alone first negative at n = 88
  min of Lambda_n q^-n (q = e^{0.9 eta}) on n<=2e4: -5.5140, on 2e4<n<=4e4: -15.3169

== Z6. finite fields: point counts of elliptic curves are sagittas of Frobenius powers
y^2 = x^3 -1 x +0 over F_5: a = -2, sagitta v = 1.447213595, #E(F_{p^n}) = [8, 32, 104]
y^2 = x^3 -1 x +0 over F_13: a = 6, sagitta v = 0.1679497057, #E(F_{p^n}) = [8, 160]
y^2 = x^3 +1 x +1 over F_7: a = 3, sagitta v = 0.4330532905, #E(F_{p^n}) = [5, 55, 380]
y^2 = x^3 +1 x +1 over F_5: a = -3, sagitta v = 1.670820393, #E(F_{p^n}) = [9, 27, 108]
y^2 = x^3 +1 x +6 over F_11: a = -1, sagitta v = 1.150755672, #E(F_{p^n}) = [13, 143]

== Z7. functional-equation rotor chi, Riemann-Siegel theta, Hardy Z
N(T) = theta(T)/pi + 1 + S(T) checked at T = 20, 50.5, 100, 150, 163
one zero in each of the first 40 Gram intervals (numerical observation)
t0 = 6.289835988836903 (root of log(pi) = Re psi(1/4 + it/2)); |chi(0.6+6i)| = 1.004734585 > 1
max of log|chi(sigma + 6.2899i)| over sigma = 0.51 ... 8.49: -1.06225e-7 (negative: no violation on this grid)

== Z8. base-point rotors: (2 sigma - 1) d/dsigma log|xi| is a total sagitta
s = (1.0 + 0.0j): sum of sagittas (K pairs + tail) = (0.0230900395 + 0.0j), (2sigma-1) conj(xi'/xi) = (0.023095709 - 8.95557424e-32j)
s = (2.0 + 3.0j): sum of sagittas (K pairs + tail) = (0.21644049 - 0.417024288j), (2sigma-1) conj(xi'/xi) = (0.216491547 - 0.417126344j)
s = (0.9 + 20.0j): sum of sagittas (K pairs + tail) = (0.303762905 - 1.17774487j), (2sigma-1) conj(xi'/xi) = (0.303766642 - 1.1779281j)
s = (3.0 - 40.0j): sum of sagittas (K pairs + tail) = (4.79959731 + 3.82083956j), (2sigma-1) conj(xi'/xi) = (4.79975697 + 3.82319937j)
s = (0.55 + 14.1j): sum of sagittas (K pairs + tail) = (1.34956025 - 0.994750894j), (2sigma-1) conj(xi'/xi) = (1.34956031 - 0.99476696j)
|xi(sigma+it)| increasing on 0.5<=sigma<=3 at the sampled heights; the symmetric quartic is not

== Z9. Euler product in sagitta form and the 3-4-1 identity
|zeta(2+3.7i)|^2/zeta(2)^2 = 0.23517509; sagitta product over p < 2e5 = 0.23517531
3 log zeta(s) + 4 log|zeta(s+it)| + log|zeta(s+2it)| = 0.661338 = sum of 2(2-v)^2 terms 0.661337

== Z10. accumulated sagitta of Dirichlet steps; mean squares; random phases
  sigma=0.75, N=1e5: sum = 1.254380 (upper bound 1.303025)
  sigma=1/2, N=1000: sum (1-cos n^-1/2) = 3.675881, minus (1/2) log N = 0.222003
  sigma=1/2, N=10000: sum (1-cos n^-1/2) = 4.826911, minus (1/2) log N = 0.221741
  sigma=1/2, N=100000: sum (1-cos n^-1/2) = 5.978178, minus (1/2) log N = 0.221715
  sigma=0.25, N=1e5: sum = 314.998202 (upper bound 315.498379)
  equal steps N(1-cos N^-1/2): ['0.49958347', '0.49999583', '0.49999996']
  mean square of sum_{n<=12} n^{-1/2-it} over |t|<=40: 3.00626330158 = diagonal 3.10321067821 + off-diagonal -0.0969474
  sum_{p<1e6} 1/p - log log 1e6 = 0.261536; sum_p (1-cos p^-1/2) = 1.425061
  E|sum X_p p^-s|^2 = sum p^-2sigma (exact); Var log|1 - X p^-1/2| = Li_2(1/p)/2 checked

== Z11. sagitta weights in the integrated explicit formula
sum_rho 1/(rho(1-rho)) = 2+gamma-log(4 pi) = 0.0461914179322421; first 80 pairs give 0.0391324149917
x = 10.5: zero side (first 80 pairs) = -0.0032335167, arithmetic side = -0.00321921029, |diff| = 1.43e-5 <= 0.0229
x = 30.5: zero side (first 80 pairs) = -0.0619952678, arithmetic side = -0.0614891735, |diff| = 0.000506 <= 0.039
x = 100.5: zero side (first 80 pairs) = -0.137824163, arithmetic side = -0.138586848, |diff| = 0.000763 <= 0.0708

== Z12. Weil-type quadratic form as a Krein form (toy with a Gaussian test function)
toy Weil form: off-line quartet, Gaussian of spectral width delta: -0.9220952625 = -4 exp(1 - pi^2/4) < 0;
  same quartet, spectral width 1: 4.040200668 > 0; on-line values >= 0

== Z13. finite Li criterion: |u_j| <= 1 for all j  <=>  Lambda_n >= 0 for all n >= 1
  [ok] split Re(1-w) = |1-w|^2/2 + (1-|w|^2)/2 at 2000 random w
  [ok] 300 families in the closed disk (zeros, repeats, roots of unity): min Lambda_n = -6.66e-15 >= 0
  [ok] 146 families with max |u| > 1.02: a negative Lambda_n found in each (n < 3e4)
  [ok] 1.001 e^(2pi i/5) among the fifth roots of unity: first negative Lambda_n at n = 5
  [ok] pigeonhole: some n = kL, 1 <= k <= 6^m', has Re p_n >= (1/2) sum |u_j|^n (800 cases, largest k = 3942)
  [ok] r = 1.30, |J| = 2: min of Lambda_n/r^n over n in [300, 20300) = -1.99978 (liminf = -|J|)
  [ok] r = 2.00, |J| = 3: min of Lambda_n/r^n over n in [300, 20300) = -3.00000 (liminf = -|J|)
  [ok] r = 1.05, |J| = 1: min of Lambda_n/r^n over n in [3000, 23000) = -1.00000 (liminf = -|J|)
  [ok] r = 1 with entries at angles 2pi/3 and 2pi(sqrt2-1), plus 1/2 and 0: min Lambda_n on [200, 2e4) = 2.0000 (liminf = 2)
  [ok] {1/2} and {0.9 e^(+-i)}: Lambda_n > 0 for n < 500 although |u| != 1 (reciprocal moduli needed for |u| = 1)
  [ok] pair e^(+-(0.01 + i phi)), phi = 2pi(sqrt2-1): Lambda_n = 2 - 2 cosh(n eta) cos(n phi), first negative at n = 29
  [ok] toy spectrum 7/10 +- 5i, 3/10 +- 5i: rotors e^(+-q +- i theta), q = 0.0079084290, theta = 0.1990240966; first negative n = 31
  [ok] 5000 random rho: Re rho <= 1/2 <=> |rho/(rho-1)| <= 1; |1-1/rho|^-2 = 1 + (2 Re rho - 1)/|1-rho|^2; |u_{1-conj rho}| |u_rho| = 1

== Z14. doubling is not enough: the quartet 2 e^(+-2 pi i/3), (1/2) e^(+-2 pi i/3)
  [ok] omega^n + omega^(-n) = 2 if 3 | n, else -1 (exact)
  [ok] Lambda_(2^k) = 4 + 2^(2^k) + 2^(-2^k) > 0 for k = 0..11 (exact; 2^k mod 3 is never 0)
  [ok] Lambda_3 = -49/4 = -12.25 and Lambda_(3j) < 0 for j = 1..59: the progression 3, 6, 9, ... detects it
  [ok] float evaluation agrees for n < 40; the quartet is closed under u -> 1/u and under conjugation

== Z16. finite-field Li sums of elliptic curves: N_n = (q^(n/2) - 1)^2 + q^(n/2) Lambda_n
  [ok] y^2 = x^3 +1 x +1 over F_7: a = 3, N_n = [5, 55, 380], every Lambda_n in [0, 4]
  [ok] y^2 = x^3 +2 x +1 over F_3: a = -3, N_n = [7, 7, 28], every Lambda_n in [0, 4]
  [ok] y^2 = x^3 -1 x +0 over F_13: a = 6, N_n = [8, 160], every Lambda_n in [0, 4]
  [ok] Hasse bound |a_p| <= 2 sqrt p for all 1454 nonsingular y^2 = x^3 + Ax + B, 3 <= p <= 23 (numerical check of a proved theorem)
  [ok] a = 7, q = 9: Re p_n > 0 (upper bound N_n <= q^n + 1 holds) but unbounded above (no lower bound N_n >= q^n - C q^(n/2))
  [ok] a = -7, q = 9: Re p_n unbounded on both sides

== Z17. the 3-4-1 inequality is twice a squared co-sagitta
  [ok] 3 + 4 cos phi + cos 2 phi = 2 (2 - v)^2 with v = 1 - cos phi (symbolic)
  [ok] n-th Taylor numerator: 3a^n + 4 Re(a z)^n + Re(a z^2)^n = 2 a^n (Re z^n + 1)^2 (2000 samples)
  [ok] |zeta(1+x)^3 zeta(1+x+iy)^4 zeta(1+x+2iy)| >= 1 on a 4 x 7 grid (x > 0), min = 1.3552812

ALL CHECKS PASSED in 13.4 s (mpmath 1.3.0, numpy 2.5.3, sympy 1.14.0, dps=30, K=80)
```

## 8. 没有走通的线索、开放项与对书稿的提示

**没有走通或被降级的线索。**

- 线索 4：没有找到把累计矢高的 $\alpha=\tfrac12$ 相变与零点位置联系起来的精确陈述；能严格说的只有 Z10 的无条件平方可和阈值，它在逻辑上不可能蕴含 RH。启发式部分标 `MODEL`。
- 线索 2 的前半：函数方程作为公平比较是准确的（Z7），但比较值 $\chi$ 不含非平凡零点的信息；“从这个公平比较读出零点位置”不成立。$\chi$ 在线外的双曲 / 斜驶归类成立，但只关于伽马因子。
- 线索 3：结构对应是精确的（Z12），在数域情形是同义反复；在函数域情形是定理（Z6）。
- “累计矢高非负 $\Leftrightarrow$ 全部旋子椭圆”不能由圆弧体代数（R20）得到：对无穷多个旋子，定理方向需要解析输入（Z4）。
- “反复平方”：$\lambda_{2n}$ 不能由 $\lambda_n$ 算出，倍角律多出二阶矩 $\sum_\rho v_n(\rho)^2$（Z3）；用旋子幂次探测离线零点的潜伏期是 $n\gtrsim\gamma_0^2/\delta$（Z4），没有已知的对数层数捷径。对有限族，只在 $n=2^\ell$ 处检验 Li 型和不能排除圆外的旋子（Z14 第 4 条）；沿等差数列检验才足够（Z13 第 3 款）。没有得到正面的“稀疏子列判据”。
- 普林斯海姆路线对有限族不直接给出结论（若模最大的项是正实数，实轴上的奇点不构成矛盾，需要第二步），而且钉版 Mathlib 没有这条定理；Z13 改用环面上的回归。
- 首个负指标的通用上界：首个负值依赖于非最大项（第 7 节中 $n=8446$ 的玩具族），没有得到干净的上界。
- “$\Lambda_n<0$ 的指标有正下密度”：由冻结的 `TorusObservationWindowReturns.result` 应可推出，细节没有写全，不进书稿。
- 只用上界 $N_n\le q^n+1+Cq^{n/2}$ 推哈塞界：在二次韦伊多项式的代数里不成立（Z16 第 3 条）。

**开放项。** 黎曼猜想及第 2–4 节中每一条“RH $\Leftrightarrow\cdots$”（`OPEN`）。是否存在带正对合的代数使零点旋子成为其中公平元的本征值（`OPEN`，Z12）。$\lvert\chi\rvert<1$ 的最佳全局阈值是否等于局部阈值 $t_0$（未定，Z7）。有限族 Li 判据的形式化（第 10 节，未编译）。

**对书稿现有表述的提示及其在书稿中的现状。**

1. §34.28 章首题记把“非平凡零点被钉在临界线上”写成“几何必然”。现状：题记保留作者原话，紧随其后的一句说明这是黎曼猜想（`OPEN`），本节不证明它。
2. §34.28.2 的半密度论证不推出“临界线上有无穷多个零点”。现状：书稿写明这是 Hardy 1914 的定理（`文献结果`）。
3. §34.28.2 的“单程波幅唯一锁向 $p^{-1/2}$”旁可以给出精确陈述：Z10 第 3 款的冻结 $\ell^2$ 判据，无条件、与零点位置无关。现状：未写入（需要钉版解析 `labeled_zeta_mem_iff`；原句属 `MODEL` 并已如此标注）。
4. §34.29 的标题与导言用“破除”“击穿”。现状：标题未改，导言第一段写明这是研究纲领想做的事（`MODEL` + `OPEN`），没有越过 $\vartheta=\tfrac47$ 的已证结论。
5. §34.29.3 把“每推进一层枢轴重整”等同于“谱参数平方一次”。现状：书稿写明这是模型的假设（`MODEL`），表格只是对一个假想点作幂运算（`NUM`），并指向 Li 系数；该段之后补了一句：只在 $n=2^\ell$ 处看 Li 型和并不足以发现圆外的旋子（Z14 第 4 条），这说明的是检验方式的局限，不反驳模型中关于模长的算术。
6. §34.28 第三重机制里“$x$ 步彼此正交独立的正负步”是对 $\mu(n)$ 的随机模型。现状：该句补了一个括注，说明 $\mu(n)$ 是确定的算术函数，各步并不独立，对应的严格陈述是 Littlewood 等价式。

## 9. 未核对清单

- **未读原文**：Li 1997；Bombieri–Lagarias 1999 的期刊版（只读了预印本，见下）；Keiper 1992；Hinkkanen 1997；Lagarias 1999；Spira 1965、Dixon–Schoenfeld 1966、Saidak–Zvengrowski 2003、Trudgian `arXiv:1312.1409`（常数 $6.29073$ 来自检索摘要）；Voros `arXiv:1602.03292` 及其转述的 Oesterlé 未发表结果；Weil 1948、1952；Hasse 1936；Yoshida 1992、Bombieri 2000、Connes–Consani 2021；Wintner 1944；Selberg 1946；Hardy–Littlewood 1918；Davenport–Heilbronn 1936；Mertens 1874、1898。
- **凭记忆的章节号与出处**：Silverman 的 III.6.3、V.1.1、V.2.3.1；“幂和有界推出 $\lvert\omega\rvert\le1$”在韦伊猜想教科书论证中的具体出处；斯捷潘诺夫—邦别里由上界推出韦伊界的步骤；Titchmarsh 第 7、9 章的定理号（正文只写了章）；普林斯海姆定理的出处（冻结模块头注引 Flajolet–Sedgewick 定理 IV.6，本轮未翻书）。
- **已核对原文**：Sondow–Dumitrescu（`arXiv:1005.1104`，定理 1、推论 1 与证明方法）；Sekatskii（`arXiv:1304.7895`，定理 1、2 的陈述）；Bombieri–Lagarias 预印本（Lagarias 主页的 PostScript，定理 1、其证明、推论 1 与求和约定；与期刊版是否逐字相同未核对）。
- **未做的数值**：$\lambda_n$ 在 $n>12$ 的值与 RH 下的渐近式 $\lambda_n\sim\tfrac n2\ln n$；真实 $\lambda_n$ 在大 $n$ 处的符号（脚本中的 $n=8446$ 属于有限玩具族）；$\lvert\chi\rvert<1$ 在 $t\in[t_0,6.29073)$ 上的完整核对（只有一条网格线）。
- **Lean 一侧**：读了第 6 节各声明的陈述与模块头注，没有编译，没有逐条读辅助引理；第 10 节的骨架没有编译，名称与行号由文本检索得到，`ι → Circle` 上的实例推断按源码推断应当成立；`rh_iff_weilSquarePositivity` 的零点和采用仓库自己的傅里叶—拉普拉斯约定，Z12 第 1 款的公式按经典约定推导，两者的常数与符号约定没有逐项对照；冻结库检索按文件名、digest 与声明名进行，可能漏掉命名不同的等价声明；钉版 Mathlib 只检索了第 10 节与 Z17 用到的名称。
- **新颖性**：Z2、Z3、Z8、Z9 中由本笔记写出的恒等式没有做文献排查；Z13 的主体是文献结果，其余各款不主张新颖性。

## 10. 形式化候选：有限族 Li 判据（Z15，未编译）

**状态。** 下面的陈述与计划没有在 trureturing 中编译、评审或冻结；书稿中对应的内容是注记（`文献结果` + `手工推导`），不是定理盒。

**拟议陈述**（拟议模块 `D5/S3/Weil/FiniteLiCriterion`；$\iota$ 为有限类型，$u:\iota\to\mathbb{C}$，$\operatorname{liSum}u\,n=\operatorname{Re}\sum_j(1-u_j^{\,n})$）：

1. `finite_li_criterion_tfae`：以下四条构成 `List.TFAE`——一切 $\lVert u_j\rVert\le1$；一切 $n\ge1$ 有 $0\le\operatorname{liSum}u\,n$；存在 $C$ 使最终 $\operatorname{Re}\sum_ju_j^{\,n}\le C$；对每个 $\varepsilon>0$ 存在 $C$ 使一切 $n\ge1$ 有 $-C\,e^{\varepsilon n}\le\operatorname{liSum}u\,n$（Z13 定理 A 的 1、2、4、7 款）。
2. `finite_li_criterion_unit`：若 $\sigma:\iota\to\iota$ 满足 $\lVert u_{\sigma(j)}\rVert\,\lVert u_j\rVert=1$，则“一切 $n\ge1$ 有 $0\le\operatorname{liSum}u\,n$” $\iff$ 一切 $\lVert u_j\rVert=1$（推论 C）。

**证明计划。** 关键步是回归：在紧群 `ι → Circle` 中，Mathlib 的 `mapClusterPt_one_atTop_pow`（`Mathlib/Topology/Algebra/Group/SubmonoidClosure.lean` 第 54 行，要求 `[Group G] [TopologicalSpace G] [CompactSpace G] [IsTopologicalGroup G]`；乘积实例 `Function.compactSpace`、`Pi.isTopologicalGroup`，`Circle` 的实例在 `Mathlib/Analysis/Complex/Circle.lean` 第 108、109 行）给出 $g^n$ 以 $1$ 为聚点；配合 `MapClusterPt.frequently` 与 `Filter.eventually_all` 得到“无穷多个 $n$ 使一切 $\operatorname{Re}(g_j^n)>1-\varepsilon$”。极分解用 `Circle.exp (Complex.arg z)` 与 `Complex.norm_mul_exp_arg_mul_I`。之后两条反方向是初等估计：`Finset.single_le_sum`、`tendsto_pow_atTop_atTop_of_one_lt`、`Filter.Frequently.and_eventually`。冻结库中 `D5/S3/Weil/Mertens/IntegratedExplicit/RHSharpActualEnvelope` 在 `actual_G_control` 的证明里用过同一引理（该定理以 RH 为前提，只作技术先例）。也可以改用冻结的 `TorusOrbitClosure.result` 经 Z13 证明 (iii) 的 $h^{-1}$ 推导；Mathlib 引理更直接。上面引用的 Mathlib 名称均在钉版源码中逐一找到。

**骨架在编译前必须修改的地方。** 现有骨架（未入库）中：`positivity` 不读假设，`0 < Real.log R / 2` 与 `1 < Real.exp (Real.log R / 2)` 两处要改成 `half_pos hlog` 与 `Real.one_lt_exp_iff.2 (half_pos hlog)`；`finite_li_criterion_unit` 用 `nlinarith` 直接证等式，宜改为 `le_antisymm` 两个方向；`liSum_eq` 的 `simp` 可能还需要自然数强制转换的实部引理；`frequently_aligned` 中假设的函数应用需先 β-化简；骨架头注说“轨道闭包定理对 $z=1$ 只给出 $n=0$”是对的，但取 $z=h^{-1}$ 即可绕过（Z13 证明 (iii)）。预计规模约一百五十行，难度低到中等。

**准入判断（交 trureturing 评审）。** `finite_li_criterion_tfae` 是 content：回归之后的求和估计与增长比较不是既有声明的实例化。`finite_li_criterion_unit` 内联前者后同样含 content，但单独看只是在 TFAE 上加一步 $ab=1,a\le1,b\le1\Rightarrow a=b=1$；若没有消费者，宜并入主定理（例如作为带 $\sigma$ 假设的第五款）或在有消费者时再交付，避免被判为无消费者的伴随声明。文献状态为 `literature-attested`（Bombieri–Lagarias 1999，DOI `10.1006/jnth.1999.2392`），需附 `Library/` 文献注；没有对应理论卷，入链方式是 `deposit-uncovered`，并按该仓库规则完成 Scribe、用途头（`kind=none`）与逃逸登记。它不对应任何开放问题，不能作为开放问题结算提交。
