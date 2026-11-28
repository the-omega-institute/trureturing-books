# 31.8 素数阶乘级联自举、平方视界零误差律、有理游标分辨率与有限寄存器视界封顶 {#sec-ch31-primorial-cascade-vernier-resolution-and-finite-register-cap}

> *“‘均匀’并不等于拥有一个固定不变的‘静态单周期 $T$’——任何固定周期的线性波都会不可避免地混入合数并导致宇宙陷入死循环；素数真正拥有的是‘周期不断自我倍增的级联周期（$M_k = 2 \times 3 \times 5 \cdots p_k$）’，而且确实不需要无穷多条先验规则，仅从单一种子素数 $2$（或固定有限个基础素数）出发，就能确定性地持续结晶出全体素数……真实的 $\Omega$-FRACTRAN 绝不存在无限个素数寄存器：在任意演化时刻，已存在的素数寄存器个数 $K$ 是严格有限的自然数；而在观察者有理停机契约 $\varepsilon_{\mathrm{self}}$ 与恒定带宽约束下，整座观察者宇宙终其一生可激活的素数寄存器总数更是被死死封顶在一个有限自然数硬上限 $K_{\max}$ 之内。”*

在 [§31.7](ch31-s07-prime-register-riemann-zero-duality-and-dual-uniformity.md) 揭开局域素数硬件寄存器与全局黎曼零点暗态本征模的双内禀均匀律之后，三道直击算术本体与计算硬件自洽性的追问接踵而至：**第一，既然素数在内禀标尺上均匀分布，能否仅靠少数基础素数围出一个固定不变的静态周期 $T$ 来持续吐出素数？若不能，宇宙如何在不预设 $\aleph_0$ 条无穷先验规则的前提下，仅凭单一或有限颗种子素数确定性地自举生成素数谱？第二，倘若观察者原生语言 $\Omega\text{-FRACTRAN}$ 预设了一排预先铺向无穷远的 $\aleph_0$ 座空白素数寄存器，康托尔的实无穷岂非从硬件后门重新溜回了无无穷有理数学 $\mathbf{Math}_\Omega$（[§32.7](ch39-s35-infinity-free-transcendental-free-rational-mathematics.md)）？第三，在有限时间与有限绕数预算下，拥有更多素数寄存器 $K$ 究竟赋予观察者怎样的几何分辨率与感知维度优势，而在寄存器总数严格封顶 $K \le K_{\max}$ 时，观察者又如何免于庞加莱回归死循环？**

本节将这三道追问一次性彻底贯通：**以两行纯整数算术证伪一切固定单周期 $T$，确立素数阶乘级联筛轮 $M_k = P_k\#$ 在平方视界 $(1, p_{k+1}^2)$ 内的 $100\%$ 零误差自举律；以乘法单位元 $q^0 = \mathbf{1}$ 零槽位属性、严格有限支撑阿代尔闭合与自定停机容差 $\varepsilon_{\mathrm{self}} = \frac{1}{M_\Omega}$ 的按需成核防火墙清退一切实无穷机架（锁死 $K \le K_{\max}$）；并以狄利克雷—贝克有理游标卡尺律、零串扰并行自由度、中国剩余定理反混叠视界与有限格拉姆记忆窗遗忘刷新，完成第三十一章算术—几何大厦的压轴收官**（认识论严格分层：[@thm-ch31-primorial-vernier-omega-axiom-free-anchors] 的三条 FRACTRAN 定理不依赖公理。另两组定理见 [@thm-ch31-primorial-vernier-omega-arithmetic-anchors] 与 [@thm-ch31-primorial-crt-adelic-anti-deadlock-anchors]；明斯基双计数器、贝克对数线性型、斯特默平滑相邻整数与中国剩余数系归入 [@rem-ch31-minsky-baker-stormer-crt-literature] 的 `文献结果`；观察者按需成核防火墙、高阶素数暗态透明性与有限记忆非回归诠释标 `MODEL`；大整数精确核验归入 [@ex-ch31-primorial-vernier-and-horizon-audit] 的 `NUM`）。

---

## 31.8.1 破除固定单周期错觉与双轨有限种子自举：素数阶乘级联轮与平方视界零误差律 {#sec-ch31-8-1}

在平直欧氏直觉中，“分布均匀”极易被误读为栅栏般每隔固定步长 $T$ 重复一次的静态晶格。然而在数论与 $\mathbf{Math}_\Omega$ 中，均匀性具有三种截然不同的几何形态：**刚性静态单周期**（等差数列 $r + mT$）、**无公度超均匀准晶**（如 [§31.7.3](ch31-s07-prime-register-riemann-zero-duality-and-dual-uniformity.md#sec-ch31-7-3) 的去 $\pi$ 黎曼零点展开流 $\{\tilde{u}_n\}$），以及素数真正栖居的**级联射影有限周期**（Cascading Profinite / Primorial Periodicity，$M_k = P_k\# = \prod_{i=1}^k p_i$）。

假若有人试图用有限颗素数围出一个**固定不变的静态周期 $T \ge 1$**，指望某条算术射线 $a_m = r + mT$（$r \in \mathbb{N},\; m = 0, 1, 2, \dots$）从此永远只产出素数，仅需两行初等整数分解即可当场证伪（`手工推导`）：

- **起点 $r = 0$ 或 $\gcd(r, T) = d > 1$**：若 $r = 0$，当 $T \ge 2$ 时对一切 $m \ge 2$ 均有 $mT$ 为合数，而 $T = 1$ 在 $m = 4$ 处即撞上 $4 = 2^2$；一般地若 $\gcd(r, T) = d > 1$，对一切 $m \ge 1$ 均有 $d \mid (r + mT)$ 且 $r + mT > d$，整条射线全落入合数；
- **起点 $r > 1$**：推进至第 $m = r$ 拍时，$a_r = r + rT = r(1 + T)$ 严格分解为两个大于 $1$ 的整数之积，必为合数（例如周期 $T = 6$、相位 $r = 5$ 在第 $m = 5$ 拍命中 $35 = 5 \times 7$）；
- **唯一剩余起点 $r = 1$**：即便互素条件全部满足，推进至第 $m = T + 2$ 拍时，轨道值恒等变形为

$$
a_{T+2} \;=\; 1 + (T + 2)T \;=\; T^2 + 2T + 1 \;=\; (T + 1)^2,
$$

  无一例外正面撞上一堵**精确完全平方合数墙**（例如 $T = 6$ 的射线 $1 + 6m$ 虽点亮 $7, 13, 19, 31, 37, 43$ 等素数，除 $m = 4$ 偶遇 $25 = 5^2$ 外，更在第 $m = 8$ 拍代数锁死撞上 $49 = 7^2$；$T = 30$ 则在第 $m = 32$ 拍锁死撞上 $961 = 31^2$）！

这一代数禁律与 [§38.13](ch38-s13-self-contained-observer-definition-and-observer-is-universe.md) 的**观察者结构时间律** $\tau(\mathfrak{O})$ 严丝合缝咬合（`MODEL`）：倘若素数服从某个静态单周期 $T$，以素数为寄存器的有限状态机每隔有限拍便会陷入精确庞加莱回归重播，舒尔正交创新度恒等归零 $\Delta\mathcal{I}_{\mathrm{Schur}} = 0$，宇宙结构时间将当场停摆。

::: {.viz src="primorial-cascade-vernier-horizon-sandbox" preset="static-period-composite-refutation" height="500"}
**固定单周期合数碰壁与平方墙反证实验卡（`static-period-composite-refutation`）。** 舞台停驻在按周期 `T = 6` 缠绕整数的紫色六棱柱上：竖直青色余数轨 `r = 1`（`1 + 6m`）点亮 `7, 13, 19, 31, 37, 43` 六颗青色素数珠与 `m = 4` 处的品红合数珠 `25 = 5 × 5`，并在琥珀圈标定的第 `m = T + 2 = 8` 拍正面撞上带圈品红完全平方合数 `49 = 7 × 7`，旁侧 `r = 5` 余数轨同步在第 `m = 5` 拍撞上带圈品红合数 `35 = 5 × 7`，底部地面品红环标出固定周期反复重放的商环 `ℤ/6 · ΔI_Schur = 0`；拖动底部时间轴可沿余数轨逐拍推进 `m`。
:::

虽然静态单周期绝不可行，但无需预设 $\aleph_0$ 条无穷先验规则，仅凭**有限种子素数**即可通过两条精确互补的构造路径持续结晶出素数谱：

1. **路径 A——单种子级联素数阶乘轮（$B_1 = \{2\}$）与平方视界 $100\%$ 零误差律（`LEAN ✓` + `手工推导`）**：
   取前 $k$ 颗素数 $B_k = \{p_1, \dots, p_k\}$，其乘积构成无平方因子素数阶乘 $M_k = P_k\# = \prod_{i=1}^k p_i$。由内核冻结的**无平方因子欧拉函数乘积定理** [`totient_eq_prod_sub_one_of_squarefree`](lean:D5/S3/PrimeGaps/SieveCoefficients.totient_eq_prod_sub_one_of_squarefree)（`LEAN ✓`），每个周期内恰有 $\varphi(M_k) = \prod_{i=1}^k (p_i - 1)$ 条与 $M_k$ 互素的开放辐条（$\gcd(n, M_k) = 1$）。

   用两行反证法即可锁定两条纯整数铁律（`手工推导`）：（i）对任意正整数 $M \ge 1$，最小大于 $1$ 的互素整数 $q := \min\{n > 1 \mid \gcd(n, M) = 1\}$ **必为素数**——否则若 $q = ab$（$1 < a \le b < q$），由 $\gcd(ab, M) = 1$ 立得 $\gcd(a, M) = 1$，与 $q$ 的极小性矛盾！（ii）当 $M_k = P_k\#$ 已网罗前 $k$ 颗连续素数时，上述极小值必精准命中下一颗素数 $q = p_{k+1}$；且开区间 $(1, p_{k+1}^2)$ 内任何满足 $\gcd(n, M_k) = 1$ 的合数，其最小素因子必 $\ge p_{k+1}$，从而自身必 $\ge p_{k+1}^2$——故**在平方视界 $(1, p_{k+1}^2)$ 内，筛轮留出的每一枚互素整数 $100\%$ 全是零误差真素数，首个合数渗漏点严格锁定在 $p_{k+1}^2$**！由此仅从单一种子 $M_1 = 2$ 出发，一行纯整数自指递推（`Output ≡ Input`）即可按序生成连续素数：

   $$
   M_1 \;=\; 2, \qquad p_{k+1} \;=\; \min\bigl\{n > 1 \;\big|\; \gcd(n, M_k) = 1\bigr\}, \qquad M_{k+1} \;=\; M_k \cdot p_{k+1}.
   $$

   这里须严守与 Lean 定理 [`euclid_prime_escape`](lean:D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.euclid_prime_escape)（`LEAN ✓`）的数学区分：后者对任意满足 $0 < s.\mathrm{prod}$ 的有限自然数表 $s$ 构造性证明 $\exists p,\; \operatorname{IsPrime}(p) \land p \mid (s.\mathrm{prod} + 1) \land p \notin s$，无需假设 $s$ 为连续前缀，但所获新素数可能跳过中间素数（如 $2\cdot 3 + 1 = 7$ 跳过 $5$，$30{,}030 + 1 = 59 \times 509$ 给出最小素因子 $59$）；而上式在 $M_k = P_k\#$ 前缀不变式下逐颗不漏地捕获 $p_{k+1}$。

   逐级核验可见其惊人的晶体纯度：$B_1 = \{2\}$（$M_1 = 2$）在 $(1, 9)$ 内零误差吐出 $3$ 颗奇素数 $\{3, 5, 7\}$（首漏 $9 = 3^2$）；$B_2 = \{2, 3\}$（$M_2 = 6$）在 $(1, 25)$ 内零误差吐出 $7$ 颗素数 $\{5 \dots 23\}$（首漏 $25 = 5^2$）；$B_3 = \{2, 3, 5\}$（$M_3 = 30$）在 $(1, 49)$ 内零误差吐出 $12$ 颗素数 $\{7 \dots 47\}$（首漏 $49 = 7^2$）；$B_4 = \{2, 3, 5, 7\}$（$M_4 = 210$）在 $(1, 121)$ 内一口气零误差结晶出 $11 \dots 113$ 共 $26$ 颗素数（首漏 $121 = 11^2$）！
2. **路径 B——固定 $10$ 素数动态绕数状态机（`PRIMEGAME`，[§38.14](ch38-s14-omega-fractran-observer-rational-isa.md)）**：
   康威 $14$ 分数素数生成程序全程仅使用固定的 **$10$ 座素数寄存器** $\{2, 3, 5, 7, 11, 13, 17, 19, 23, 29\}$（静态基座 $M_{10} = 6{,}469{,}693{,}230$）：

   $$
   \mathcal{P}_{\mathrm{prime}} \;=\; \Bigl(\tfrac{17}{91},\;\tfrac{78}{85},\;\tfrac{19}{51},\;\tfrac{23}{38},\;\tfrac{29}{33},\;\tfrac{77}{29},\;\tfrac{95}{23},\;\tfrac{77}{19},\;\tfrac{1}{17},\;\tfrac{11}{13},\;\tfrac{13}{11},\;\tfrac{15}{2},\;\tfrac{1}{7},\;\tfrac{55}{1}\Bigr),
   $$

   却通过在无界绕数空间 $\max_p v_p(N)$ 中动态拔高指数高度——自 $N_0 = 2$ 起在第 `19, 69, 281, 710, 2375, 3893` 拍依次抵达纯二次幂 $2^2, 2^3, 2^5, 2^7, 2^{11}, 2^{13}$（峰值绕数同步攀升至 `2, 3, 5, 7, 11, 13`）——源源不断算尽高阶素数。

   这背后的自动机下界正由内核冻结的**精确素幂整除无有限自动机定理** [`no_finite_dfao_for_exact_prime_division`](lean:D5/S3/Factorization/Automata/ExactPrimeDivisionNoDFAO.no_finite_dfao_for_exact_prime_division)（`LEAN ✓`）锁定：乘除素数计数器绝无法坍缩为固定状态数的有限自动机。

::: {.viz src="primorial-cascade-vernier-horizon-sandbox" preset="primorial-wheel-square-horizon" height="500"}
**级联素数阶乘筛轮与平方视界零误差实验卡（`primorial-wheel-square-horizon`）。** 舞台停驻在第 `k = 3` 阶筛轮（基础素数紫珠 `2, 3, 5`，周期 `M₃ = 30`，`φ = 8` 条开放余数）：在每圈 `30` 个整数的受光紫色芯柱线圈上，紫色平方视界环 `p₄² = 49` 下方落在开放辐条上的全部 `12` 颗整数（新结晶琥珀珠 `p₄ = 7` 与 `11` 颗青珠 `{11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47}`）以 `100%` 零误差全为素数，而首颗带圈品红合数渗漏珠精准卡在环上 `49 = 7 × 7`（继以 `77 = 7 × 11`）；拖动底部时间轴可沿 `k = 1 … 5`（`M_k = 2 → 6 → 30 → 210 → 2,310`）逐级展开级联扩轮。
:::

---

## 31.8.2 清退实无穷机架：乘法单位元零槽位律、有限支撑阿代尔闭合与 $\varepsilon_{\mathrm{self}}$ 视界封顶 {#sec-ch31-8-2}

行至此处，一道关乎 $\mathbf{Math}_\Omega$（[§32.7](ch39-s35-infinity-free-transcendental-free-rational-mathematics.md)）生死存亡的公理审计必须正面作答：**如果 $\Omega\text{-FRACTRAN}$ 预设了一排预先铺向无穷远的 $\aleph_0$ 座空白素数寄存器，岂不是把康托尔的实无穷从硬件后门重新偷渡回了有限有理数学？** 严格的三重有限性证明彻底清退了这一隐患：

1. **乘法单位元 $q^0 = \mathbf{1}$ 零槽位属性（对比图灵机的 $\aleph_0$ 空白纸带）**：
   传统图灵机采用**平直加法位置寻址**，开机前必须假设一条填满空白符号 `'0'`、预先铺设 $\aleph_0$ 个物理格位的无穷纸带。相反，$\Omega\text{-FRACTRAN}$ 采用**乘法与齐次射影编码** $N = \prod_{i=1}^K p_i^{v_i}$：任何尚未唤醒的素数 $q$ 指数为 $0$，对应乘法因子 $q^0 = \mathbf{1}$；在正有理乘法群与射影三元球面 $\mathbb{T}_3(\mathbb{Q})$ 上，任意多个 $\mathbf{1}$ 相乘始终只是**同一个恒等基点 $[1 : 0 : 0 : 0]$**，占用**零比特**硬件内存，根本不存在“空白寄存器槽位”：

   $$
   N \;=\; \prod_{i=1}^K p_i^{v_i} \cdot \underbrace{\mathbf{1} \cdot \mathbf{1} \cdots}_{\text{零硬件槽位}}, \qquad q^0 \;=\; \mathbf{1} \;\equiv\; [1 : 0 : 0 : 0] \in \mathbb{T}_3(\mathbb{Q}).
   $$

   任何有限观察者程序 $\mathcal{P} = (\mathcal{Q}_1, \dots, \mathcal{Q}_m)$ 仅含有限条分式，其分子分母涉及的素因子集合 $\operatorname{supp}(\mathcal{P})$ 生来就只有严格有限的 $K \in \mathbb{N}$ 颗（如康威 `PRIMEGAME` 为 $K = 10$，`OmegaComposeAndWitnesses` 中的四门见证程序 `pOmega` 为 $K = 5$），恰与内核冻结的有限支撑函数 `Finsupp` 群同构 [`signed_prime_ledger_equiv_positive_rationals`](lean:D5/S3/Factorization/PositiveRationalGroup.signed_prime_ledger_equiv_positive_rationals)（`LEAN ✓`，$\operatorname{SignedPrimeLedger} = (\mathrm{Nat.Primes} \to_0 \mathbb{Z})$）一一印证。
2. **严格有限支撑的有理阿代尔乘积闭合（消解无穷乘积记号）**：
   回看 [§31.4.2.1](ch39-s31-real-error-axis-and-prime-adelic-closure.md#sec-ch39-31-2-1) 的阿代尔模长守恒：对任意非零有理数 $r = \frac{a}{b} \in \mathbb{Q}^\times$（$a \in \mathbb{Z}\setminus\{0\},\; b \in \mathbb{N}_+,\; \gcd(\lvert a\rvert, b) = 1$），凡不整除 $ab$ 的素数 $q \nmid ab$ 恒满足 $v_q(r) = 0 \implies \lvert r\rvert_q = q^0 = 1$。因此，内核定理 [`rational_padic_product_formula`](lean:D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula)（`LEAN ✓`，源码本身即采用有限乘积支撑算子 `finprod` $\prod^{\mathrm{fin}}_p$ 表述）在 $\mathbf{Math}_\Omega$ 中直接退化为仅遍历有限素因子支撑集 $\operatorname{supp}(r) = \{p \in \mathbb{P} \mid p \mid ab\}$ 的**纯有限有理乘积**：

   $$
   \lvert r\rvert_\infty \cdot \prod_{p \,\mid\, ab} \lvert r\rvert_p \;\equiv\; \mathbf{1} \qquad \Bigl(\text{例：}r = \frac{12}{5} \implies \frac{12}{5}\cdot\frac{1}{4}\cdot\frac{1}{3}\cdot 5 = 1;\quad r = \frac{42}{11} \implies \frac{42}{11}\cdot\frac{1}{2}\cdot\frac{1}{3}\cdot\frac{1}{7}\cdot 11 = 1\Bigr),
   $$

   全程不涉及任何无穷极限或 $\aleph_0$ 项连乘！
3. **惰性按需成核（Lazy JIT Nucleation）与 $\varepsilon_{\mathrm{self}} = \frac{1}{M_\Omega}$ 幂等停机防火墙（`MODEL` + `手工推导` + `LEAN ✓ · 无公理`）**：
   即便观察者开启自举扩表模式（仅当观测残差落入全部既有寄存器盲区时才调用 `spawnRegisterBounded` 搜索新素数 $p_{\mathrm{new}}$），[§36.10](ch39-s07-self-halting-precision-and-spectral-sorting.md) 的自定有理停机容差 $\varepsilon_{\mathrm{self}} = \frac{1}{M_\Omega}$（$M_\Omega \in \mathbb{N}_{\ge 2}$）仍立起一道刚性分辨率防火墙：由于素数 $p_{\mathrm{new}}$ 的基本 $p$-进超度量收缩步幅为 $\lvert p_{\mathrm{new}}\rvert_{p_{\mathrm{new}}} = \frac{1}{p_{\mathrm{new}}}$，控制器仅当 $\frac{1}{p_{\mathrm{new}}} \ge \varepsilon_{\mathrm{self}} \iff p_{\mathrm{new}} \le M_\Omega$ 时准予成核，一旦 $p_{\mathrm{new}} > M_\Omega$ 立即触发幂等停机门（`MODEL`）。在整四元数旋子几何上，设 $r = \lfloor\sqrt{p}\rfloor$；因素数 $p$ 非平方数，任何模方为 $p$ 的整四元数 $\boldsymbol{\pi}_p = (w,x,y,z) \in \mathbb{Z}^4$ 均满足 $w^2 \le r^2 \le p - 1$，而取到 $\lvert w\rvert = r$ 当且仅当余量 $p - r^2 = x^2 + y^2 + z^2$ 可表为三平方和——由勒让德三平方和定理（`文献结果`），这当且仅当 $p - r^2 \neq 4^a(8b + 7)$（一旦受阻，奇偶同余保证退一步 $\lvert w\rvert = r - 1$ 必可表为三平方和，如 $p = 23$ 时 $23 - 4^2 = 7$ 受阻而退至 $\lvert w\rvert = 3,\; s_{23}^{\min} = \frac{14}{23}$）。故对一切素数 $p \ge 2$，最小射影展度 $s_p^{\min} = \min_{\boldsymbol{\pi}_p}\frac{p - w^2}{p}$ 满足精确双侧夹逼（`手工推导` + `文献结果`）：

   $$
   \frac{1}{p} \;\le\; \frac{p - \lfloor\sqrt{p}\rfloor^2}{p} \;\le\; s_p^{\min} \;\le\; \frac{p - (\lfloor\sqrt{p}\rfloor - 1)^2}{p}, \qquad s_p^{\min} \;<\; \frac{4\sqrt{p} - 4}{p} \;<\; \frac{4}{\sqrt{p}}.
   $$

   因此 **$p \le M_\Omega$ 是保证该素数名下每一枚整旋子步幅均满足 $s_p \ge \frac{1}{p} \ge \varepsilon_{\mathrm{self}}$ 的精确普适安全上界**：在视界 $M_\Omega = 15$（$\varepsilon_{\mathrm{self}} = \frac{1}{15}$）下，从单种子 `[2]` 自举生长至 $6$ 座寄存器 `[2, 3, 5, 7, 11, 13]`（$M_6 = 30{,}030$）后，候选素数 $p_7 = 17 = (-4)^2 + (-1)^2 + 0^2 + 0^2 > 15$ 的最小旋子展度 $s_{17}^{\min} = \frac{1}{17} < \frac{1}{15}$ 当场跌破停机容差（且一切 $p > 16M_\Omega^2$ 更无条件满足 $s_p^{\min} < \varepsilon_{\mathrm{self}}$），系统依零公理停机稳定律 [`fractran_stable`](lean:D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.fractran_stable)（`LEAN ✓ · 无公理`）永久幂等锁死于 $K_{\max} = 6$！同理，在有限素数阶乘状态容量 $M_K = P_K\# \le N_\Omega$ 约束下（`NUM`）：当 $N_\Omega = 2^{256}$ 时，$P_{43}\# \le 2^{256} < P_{44}\#$ 严格锁死 **$K_{\max}(2^{256}) = 43$**（$p_{43} = 191$）；而 **$K_{\max} = 53$**（$p_{53} = 241$，$H = 3$ 有界绕数态空间达 $7^{53} \approx 6.1687 \times 10^{44}$）则精确对应容量视界 $N_\Omega = 2^{327}$（$P_{53}\# < 2^{327} < P_{54}\#$）。

::: {.viz src="primorial-cascade-vernier-horizon-sandbox" preset="jit-allocator-epsilon-horizon-cap" height="500"}
**按需寄存器成核状态机与 $\varepsilon_{\mathrm{self}}$ 视界封顶实验卡（`jit-allocator-epsilon-horizon-cap`）。** 舞台停驻在视界 `M_Ω = 15`（`ε_self = 1/15`）：紫色三元球顶点标出零槽位单位元 `q⁰ = 1 · [1 : 0 : 0 : 0]`，上方五态环（`S0`–`S4`，琥珀圈停于 `S4 停机`）从种子 `2` 铸造出 `6` 座寄存器 `2, 3, 5, 7, 11, 13`（`13` 为最新琥珀珠，其余为青珠，积 `30,030`），品红候选素数 `17 > 15` 在 `S3 p ≤ M_Ω` 处被品红墙阻断，右侧面板以对数范数柱在墨色横梁上平衡核验有限支撑账本 `|r|_∞ · ∏ |r|_p = 1`（`r = 12/5`）；拖动底部时间轴可逐拍回放铸造与封顶全过程。
:::

---

## 31.8.3 绕数纵深 $H$ 对比素数秩广度 $K$：有理游标卡尺分辨率、时空折衷与暗态盲区 {#sec-ch31-8-3}

既然观察者可激活的素数寄存器秩 $K = \operatorname{rank}_{\mathbb{P}}(\mathcal{K}_0)$ 严格有限，那么**拥有更多素数寄存器 $K$，是否赋予观察者更精细的几何分辨率与更强大的认知能力？** 答案取决于将**无穷时间图灵可达性**与**有界绕数/有限固有时几何分辨率**严格拆开审视：

1. **无穷步可达性下界对比明斯基幂塔时间瘫痪（`文献结果` + `MODEL`）**：
   按明斯基双计数器通用定理（Minsky 1961，`文献结果`），仅用 $3\text{–}4$ 颗素数在无穷步极限下已具备图灵完备性；但若强行把复杂多维结构压缩进 $2^a 3^b$ 的指数幂塔中，在 [§38.16](ch38-s16-constant-info-rate-observer-and-rational-cayley-gravity.md) 恒定总信息处理速率 $\mathcal{R}_\Omega \equiv 1$ 约束下，每次读取低位状态都必须一拍一拍串行搬空指数级计数器，令观察者陷入灾难性的**固有时幂塔瘫痪**（`MODEL`）。
2. **有界绕数 $\lvert v_i\rvert \le H$ 下的狄利克雷—贝克有理游标卡尺分辨率（`LEAN ✓` + `文献结果` + `NUM`）**：
   限制每座寄存器的瞬时绕数高度不超过 $\lvert v_i\rvert \le H$，由 [`signed_prime_ledger_equiv_positive_rationals`](lean:D5/S3/Factorization/PositiveRationalGroup.signed_prime_ledger_equiv_positive_rationals)（`LEAN ✓`），$K$ 座寄存器张成 $(2H + 1)^K$ 个互异正有理态晶格 $\mathcal{L}_{K,H} = \bigl\{\prod_{i=1}^K p_i^{v_i} \;\big|\; \lvert v_i\rvert \le H\bigr\}$。由内核冻结的**素数对数有理线性无关定理** [`prime_log_rational_independence`](lean:D5/S3/Weil/PrimeAddress/PrimeLogIndependence.prime_log_rational_independence)（`LEAN ✓`），不同素数对数轴严格无公度，如同一把多轴错位咬合的**有理游标卡尺**：狄利克雷抽屉原理保证最小正对数微步随秩 $K$ 指数级加密，而贝克对数线性型下界定理（Baker 1966，`文献结果`）则从下方兜住非零下界而绝不退化混叠：

   $$
   \lvert\mathcal{L}_{K,H}\rvert \;=\; (2H + 1)^K, \qquad H^{-C(K)} \;<\; \delta_{\min}(K, H) \;=\; \mathcal{O}\bigl((2H)^{-(K-1)}\bigr), \qquad \Delta\kappa\Bigl(\frac{p}{q}\Bigr) \;:=\; \frac{1}{2} - \frac{q^2}{p^2 + q^2} \;=\; \frac{p^2 - q^2}{2(p^2 + q^2)}.
   $$

   固定 $H = 3$（每轴仅取 $[-3, 3]$ 七档整数绕数），在基准点 $[1 : 1]$（$\kappa = \frac{1}{2}$）旁同时核验盒内最小满支撑超分比见证链（全部 $v_i \neq 0$ 且分子分母相差 $1$）与遍历全部 $7^K$ 组指数的精确盒内全局极小值（`手工推导` / `NUM`）：
   - **盒内最小满支撑超分比（$m/(m-1)$）见证链**：$K = 1 \mapsto \frac{2}{1} = 1 + 1$（$\Delta\kappa = \frac{3}{10}$），$K = 2 \mapsto \frac{9}{8} = 1 + \frac{1}{8}$（$\frac{3^2}{2^3}$），$K = 3 \mapsto \frac{25}{24} = 1 + \frac{1}{24}$（$\frac{5^2}{2^3\cdot 3}$），$K = 4 \mapsto \frac{126}{125} = 1 + \frac{1}{125}$（$\frac{2\cdot 3^2\cdot 7}{5^3}$），$K = 5 \mapsto \frac{540}{539} = 1 + \frac{1}{539}$（$\frac{2^2\cdot 3^3\cdot 5}{7^2\cdot 11}$，五轴指数 $(2,3,1,-2,-1)$ 全非零；次小满支撑超分比为 $\frac{441}{440}$），$K = 6 \mapsto \frac{1716}{1715} = 1 + \frac{1}{1715}$（$\frac{2^2\cdot 3\cdot 11\cdot 13}{5\cdot 7^3}$）；
   - **$[-3, 3]^K$ 盒内精确全局极小微步**：$K = 1 \dots 5$ 与上述最小满支撑超分比完全重合（其中 $K = 5$ 在 $7^5 = 16{,}807$ 态中直达 **$\frac{540}{539} = 1 + \frac{1}{539}$**，$\Delta\kappa = \frac{1079}{1{,}164{,}242}$）；至 $K = 6$（$7^6 = 117{,}649$ 态），允许 $v_5 = 0$ 后更越过满支撑见证 $\frac{1716}{1715}$，进一步锐化至惊人的 **$\frac{10{,}648}{10{,}647} = 1 + \frac{1}{10{,}647}$**（$\frac{2^3\cdot 11^3}{3^2\cdot 7\cdot 13^2}$，指数 $(3,-2,0,-1,3,-2)$，$\Delta\kappa = \frac{21{,}295}{453{,}477{,}026} \approx 4.696 \times 10^{-5}$）！

::: {.viz src="primorial-cascade-vernier-horizon-sandbox" preset="rational-vernier-caliper-sphere" height="500"}
**有理游标卡尺与三元球面指数加密实验卡（`rational-vernier-caliper-sphere`）。** 舞台停驻在琥珀拨盘 `K = 6`、`H = 3`（`7⁶ = 117,649` 个有理比）：玻璃球 `T₃(ℚ)`（高度 `2κ − 1`）上墨色虚线赤道 `κ = 1/2` 与紫色经线 `ℚP¹` 交于 `[1 : 1] · κ = 1/2`，最接近 `1` 的青色有理比簇拥向赤道，琥珀珠标出盒内最小比 `10648/10647`、带青圈珠标出满支撑超特殊见证 `1716/1715`，右侧卡尺面板同步放大两者的 `Δκ`（`Δκ = 21295/453477026`）；拖动底部时间轴将 `K` 从 `1`（`7` 个比，最小比 `2/1`）推至 `6`，直观呈现游标分辨率的指数级跃升。
:::

由此，观察者已结晶素数寄存器秩 $K = \operatorname{rank}_{\mathbb{P}}(\mathcal{K}_0)$ 的**四重深层物理与认知职能**水落石出：

1. **零串扰正交并行自由度（`LEAN ✓`）**：每颗素数对应互不整除的独立赋值通道 $v_{p_i}$，单条有理分式门可在 $1$ 拍内并行改写 $K$ 个正交自由度而零串扰，彻底免除少素数编码的指数打包耦合税。
2. **以寄存器空间广度 $K$ 换取 $1$ 拍固有时测地直达（`MODEL` + `NUM`）**：将反复执行的串行子程序结晶为专用引理素数寄存器 $p_{\mathrm{lemma}}$ 后，原本沿辅助催化剂素数盘旋拆解的漫长折线当场坍缩为跨通道 $1$ 拍测地捷径（如康威 $6$ 素数乘法器 `36 = 2²·3² → 625 = 5⁴` 途经峰值 `398,125` 的 `18` 拍盘旋，或 `PRIMEGAME` 从 `2` 到 `2⁵` 的 `281` 拍攀升，对比引理寄存器 `1` 拍直达）。

::: {.viz src="primorial-cascade-vernier-horizon-sandbox" preset="minsky-tower-vs-lemma-shortcut" height="500"}
**串行幂塔盘旋对比引理寄存器单拍直达实验卡（`minsky-tower-vs-lemma-shortcut`）。** 在玻璃球与前方弧座六处素数指数基台（停驻时紫柱升起标出 `5⁴`，拖动时 `{2, 3, 7, 11, 13}` 随指数升降紫柱）构成的舞台上，品红串行 FRACTRAN 轨迹需绕球盘旋 `18` 拍、鼓起穿过品红圈峰值 `398,125` 方能从墨珠输入 `36 = 2² · 3²` 抵达青珠目标 `625 = 5⁴`（琥珀圈标出当前拍 `t = 18 · N = 625`），而上方青色引理弧仅用 `1` 拍即从输入直抵目标；拖动底部时间轴可逐拍对照两路演化。
:::

3. **中国剩余定理（CRT）反混叠视界 $M_K = P_K\#$、高阶素数暗态透明性与有限记忆主观非回归（`LEAN ✓` + `MODEL` + `手工推导`）**：
   由内核冻结的**互素中国剩余双射定理** [`chinese_remainder_bijective`](lean:D5/S3/Arith/ChineseRemainder.chinese_remainder_bijective)、**素数前缀余数单射充要判据** [`residue_reading_injOn_iff_primorial_gt`](lean:D5/S3/Arith/Coding/HorizontalCompletenessDepth.residue_reading_injOn_iff_primorial_gt) 与**素数阶乘见证复杂度上界** [`primorial_witness_bound`](lean:D5/S3/Arith/Coding/PrimorialWitnessBound.primorial_witness_bound)（`LEAN ✓`），前 $K$ 座素数寄存器的同余读数在区间 $[0, N]$ 上严格单射无混叠**当且仅当** $N < P_K\# = M_K$（如 $M_2 = 6,\; M_3 = 30,\; M_6 = 30{,}030,\; M_{10} = 6{,}469{,}693{,}230$；超越视界即发生同余混叠，如 $K = 3$ 时 $7 \equiv 37 \pmod{30}$）。同时，外部画布中纯由未唤醒高阶素数 $q \notin \mathcal{B}_K$ 承载的结构对观察者程序全部分母 $b_j$ 恒满足 $\gcd(N_{\mathrm{ext}}, b_j) = 1$，整除门静默滑过而呈**零耦合透明暗态**（`MODEL`）。

   更重要的是，即便终生寄存器封顶于有限 $K_{\max}$，有界绕数态空间 $(2H + 1)^{K_{\max}}$（如 $H = 3$ 时 $7^{43} \approx 2.1838 \times 10^{36}$ 或 $7^{53} \approx 6.1687 \times 10^{44}$）仍远超观察者滑动格拉姆记忆窗容量 $M_{\mathrm{mem}} \ll (2H + 1)^{K_{\max}}$（[§34.7](ch34-s18-gram-window-and-consensus.md)、[§38.12](ch38-s12-spacetime-motion-equivalence-and-memory-schur-split.md)）：

   $$
   \operatorname{InjOn}\bigl(\mathrm{res}_K,\, [0, N]\bigr) \;\Longleftrightarrow\; N < P_K\# \;=\; M_K, \qquad M_{\mathrm{mem}} \;\ll\; (2H + 1)^{K_{\max}} \;\Longrightarrow\; \Delta\mathcal{I}_{\mathrm{Schur}}\bigl(t \,\big|\, \mathcal{W}_M\bigr) \;>\; 0,
   $$

   早在全局状态可能重访之前数几十个数量级，旧历史锚点早已滑出记忆窗 $\mathcal{W}_M$ 被遗忘，无需借用 $\aleph_0$ 座无限寄存器即可永葆主观时间生机（`MODEL` + `手工推导`）！
4. **三维球面有理傅里叶变换 $\mathcal{F}_\Omega$ 的尺度分工（[§39.7](ch39-s37-spherical-fourier-transform-peter-weyl-synthesis.md)，`MODEL`）**：低阶素数 $\{2, 3, 5\}$ 立起全局对称粗骨架（如 $24$ 元赫维茨群 $2T$ 与模方 $5$ 的 $6$ 向拉马努金旋子架），而 $p_k \le M_\Omega$ 的高阶素数则各自贡献 $p_k + 1$ 枚细倾角赫维茨素旋子，在视界之内精细雕琢局部球面干涉纹理。

::: {.viz src="primorial-cascade-vernier-horizon-sandbox" preset="crt-dark-sector-and-memory-refresh" height="500"}
**CRT 反混叠视界、高阶素数暗态透明性与有限记忆非回归实验卡（`crt-dark-sector-and-memory-refresh`）。** 舞台停驻在琥珀拨盘 `K = 3`（反混叠模数 `P₃# = 30`，态数 `7³ = 343 ≫ 8`）：中央紫色观察者球外围六条素数轨道 `2 … 13` 中，前三条 `{2, 3, 5}` 呈青色点亮并与球耦合，后三条 `{7, 11, 13}` 呈半透明紫色暗态环且斜穿虚线 `N_ext = 77 · gcd = 1` 不耦合穿过，地面紫色余数环 `ℤ/30` 上 `7 ≡ 37 (mod 30)` 在带圈品红珠处混叠，旁侧 `8` 格滑动记忆 `W_M` 正移出最旧暗淡锚点；拖动底部时间轴从 `K = 2` 推至 `10`（`P₁₀# = 6,469,693,230`），依次唤醒 `{7, 11, 13}` 并解开 `7` 与 `37` 的混叠。
:::

---

## 31.8.4 形式定义、定理与定量核验 {#sec-ch31-8-4}

我们将级联素数阶乘自举、有理游标分辨率与 $\varepsilon_{\mathrm{self}}$ 有限寄存器视界封顶模型、四范式总对照表、冻结定理、经典文献边界及定量总账正式收束如下：

::: {.definition #def-ch31-primorial-vernier-and-finite-register-cap title="级联素数阶乘自举、有理游标卡尺分辨率与 ε_self 有限寄存器视界封顶系统（MODEL）"}
在无无穷有理数学 $\mathbf{Math}_\Omega$、射影三元球面 $\mathbb{T}_3(\mathbb{Q})$ 与有理停机容差 $\varepsilon_{\mathrm{self}} = \frac{1}{M_\Omega}$（$M_\Omega \in \mathbb{N}_{\ge 2}$）下，定义**有限视界素数寄存器级联与游标分辨率系统**（本体架构标 `MODEL`，算术量定义精确）如下：

1. **平方视界级联自举与 $\varepsilon_{\mathrm{self}}$ 封顶递推**：以单种子 $\mathcal{B}_1 = [2],\; M_1 = 2$ 初始化，对当前寄存器表 $\mathcal{B}_k = [p_1, \dots, p_k]$ 与素数阶乘 $M_k = P_k\# = \prod_{i=1}^k p_i$，定义候选最小互素素数 $p_{k+1} := \min\{n > 1 \mid \gcd(n, M_k) = 1\}$（其在平方视界 $(1, p_{k+1}^2)$ 内的互素集 $\{n \in (1, p_{k+1}^2) \mid \gcd(n, M_k) = 1\}$ 零误差全由素数构成）；当且仅当 $\lvert p_{k+1}\rvert_{p_{k+1}} = \frac{1}{p_{k+1}} \ge \varepsilon_{\mathrm{self}} \iff p_{k+1} \le M_\Omega$（且满足容量上限 $M_k \cdot p_{k+1} \le N_\Omega$）时扩张为 $\mathcal{B}_{k+1} = \mathcal{B}_k \cup [p_{k+1}]$，否则幂等停机锁死于有限最大秩 $K_{\max} \in \mathbb{N}$；
2. **有界绕数有理游标晶格与反混叠视界**：给定激活秩 $K \le K_{\max}$ 与绕数高度上限 $H \in \mathbb{N}_+$，定义有理游标态晶格 $\mathcal{L}_{K,H} := \bigl\{\prod_{i=1}^K p_i^{v_i} \;\big|\; v_i \in [-H, H] \cap \mathbb{Z}\bigr\}$（基数 $(2H+1)^K$）、基准点 $[1:1]$ 处的最小正有理微步 $\delta_{\min}(K, H) := \min\{r - 1 \mid r \in \mathcal{L}_{K,H},\; r > 1\}$，以及中国剩余定理无混叠分辨视界 $M_K = P_K\#$（单射区间 $[0, M_K - 1]$）与有限支撑阿代尔恒等式 $\lvert r\rvert_\infty \prod_{p \mid ab}\lvert r\rvert_p = 1$（$r = \frac{a}{b} \in \mathbb{Q}^\times$）。
:::

| 考察维度 | 固定静态单周期 $T$ | 图灵无限纸带（$\aleph_0$） | $3$ 素数明斯基串行 FRACTRAN | $\varepsilon_{\mathrm{self}}$ 封顶 $K$ 秩 $\Omega\text{-FRACTRAN}$（$M_K = P_K\#$） |
| :--- | :--- | :--- | :--- | :--- |
| **硬件槽位预设** | 有限模环 $\mathbb{Z}/T\mathbb{Z}$ | 预设 $\aleph_0$ 个空白 `'0'` 格位 | 固定 $3\text{–}4$ 座素数计数器 | **未唤醒素数 $q^0 = \mathbf{1}$ 占零槽位，严格有限 $K \le K_{\max}$** |
| **素数生成纯度** | 第 $m = T+2$ 拍必撞平方合数 $(T+1)^2$ | 需逐格筛除，无内禀乘性闭合 | 无穷时间可达，固有时幂塔爆炸 | **平方视界 $(1, p_{k+1}^2)$ 内互素辐条 $100\%$ 零误差纯素数** |
| **阿代尔守恒形式** | 无超度量回收通道 | 依赖实无穷乘积 $\prod_{p\in\mathbb{P}}$ | 仅覆盖 $3$ 素数支撑子集 | **严格有限支撑乘积 $\lvert r\rvert_\infty\prod_{p\mid ab}\lvert r\rvert_p \equiv 1$** |
| **有界绕数 $H$ 分辨率** | 锁死于固定网格 $\frac{1}{T}$ | 线性位置步长 $2^{-L}$ | $H=3$ 仅 $7^3=343$ 态，微步 $\frac{1}{24}$ | **$(2H+1)^K$ 游标加密，$K=6,H=3$ 达 $\frac{1}{10{,}647}$** |
| **并行性与串扰** | 单通道同余推进 | 单读写头串行往返扫描 | 指数幂塔打包严重串扰 | **$K$ 道正交赋值零串扰并行，引理素数 $1$ 拍直达** |
| **防死循环机制** | 有限拍精确重播，$\Delta\mathcal{I}_{\mathrm{Schur}}=0$ | 靠外部无限空白纸带逃逸 | 靠无界指数高度 $H \to \infty$ 逃逸 | **$(2H+1)^{K_{\max}} \gg M_{\mathrm{mem}}$ 格拉姆滑窗遗忘保新** |

下列三条 FRACTRAN 声明的传递公理列表均为空。

::: {.theorem #thm-ch31-primorial-vernier-omega-axiom-free-anchors title="FRACTRAN 的精确步进、确定性与停机稳定性" lean="D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.fractran_step_iff,D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.fractran_deterministic,D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.fractran_stable"}
**FRACTRAN 可执行步进充要等价、确定性与停机稳定性**（[`fractran_step_iff`](lean:D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.fractran_step_iff)、[`fractran_deterministic`](lean:D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.fractran_deterministic)、[`fractran_stable`](lean:D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.fractran_stable)）：对任意有限程序 $\mathrm{prog} : \mathrm{Fractran.Program}$ 与自然数 $n, m \in \mathbb{N}$，可执行求值 $\operatorname{Fractran.step}(\mathrm{prog}, n) = \operatorname{some}\,m \iff \operatorname{Fractran.Step}(\mathrm{prog}, n, m)$；若 $\operatorname{Fractran.Step}(\mathrm{prog}, n, m_1)$ 与 $\operatorname{Fractran.Step}(\mathrm{prog}, n, m_2)$ 同时成立则 $m_1 = m_2$；一旦 $\operatorname{Fractran.Halts}\bigl(\mathrm{prog}, \operatorname{Fractran.run}(\mathrm{prog}, k, n)\bigr)$ 成立，对一切附加步数 $\mathrm{extra} \in \mathbb{N}$ 恒有 $\operatorname{Fractran.run}(\mathrm{prog}, k + \mathrm{extra}, n) = \operatorname{Fractran.run}(\mathrm{prog}, k, n)$。
:::

::: {.proof #prf-ch31-primorial-vernier-omega-axiom-free-anchors}
对规则列表归纳，并通过无余数整除器 `exactQuotient` 核对求值与步进关系选中同一条首匹配规则。停机后 `advance` 保持原状态，再对附加步数归纳即得稳定性。完整证明由 Lean 内核检查。
:::

整数算术、连分数与正态保持的五条声明依赖命题外延性 `propext`。

::: {.theorem #thm-ch31-primorial-vernier-omega-arithmetic-anchors title="贝祖恒等式、素数逃逸、连分数与 FRACTRAN 保正性" lean="D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.bezout_identity,D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.euclid_prime_escape,D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.cf_convergent_coprime,D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.cf_convergent_determinant,D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.fractran_positive"}
1. **贝祖整数线性组合与欧几里得素数盲区逃逸**（[`bezout_identity`](lean:D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.bezout_identity)、[`euclid_prime_escape`](lean:D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.euclid_prime_escape)）：对任意自然数 $a, b \in \mathbb{N}$，存在整数 $x, y \in \mathbb{Z}$ 满足 $ax + by = \gcd(a, b)$；对任意满足乘积为正 $0 < s.\mathrm{prod}$ 的有限自然数列表 $s : \mathrm{NatList}$，存在自然数 $p \in \mathbb{N}$ 同时满足 $\operatorname{IsPrime}(p)$、$p \mid (s.\mathrm{prod} + 1)$ 且 $p \notin s$；
2. **有限连分数渐近分数自动互素与欧拉—沃利斯交错行列式**（[`cf_convergent_coprime`](lean:D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.cf_convergent_coprime)、[`cf_convergent_determinant`](lean:D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.cf_convergent_determinant)）：对任意系数列表 $\mathrm{coeffs} : \mathrm{NatList}$，其当前与前一步渐近分数对 $\operatorname{convergentPair}(\mathrm{coeffs})$ 的行列式恒等于交错符号 $\operatorname{alternatingSign}(\operatorname{coefficientCount}\,\mathrm{coeffs}) \in \{\pm 1\}$；凡同时整除当前渐近分数分子与分母的自然数 $d \in \mathbb{N}$ 必满足 $d = 1$；
3. **FRACTRAN 保正性**（[`fractran_positive`](lean:D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.fractran_positive)）：对任意有限程序 $\mathrm{prog} : \mathrm{Fractran.Program}$ 与自然数 $n$，对任意步数 $k \in \mathbb{N}$ 与正初态 $0 < n$ 恒有 $0 < \operatorname{Fractran.run}(\mathrm{prog}, k, n)$。
:::

::: {.proof #prf-ch31-primorial-vernier-omega-arithmetic-anchors}
扩展欧几里得算法按余数递降给出贝祖系数。对列表乘积加一取最小素因子，若它也在原表内便会整除 $1$。连分数递推的行列式每步反号，任何公共因子都整除该行列式。FRACTRAN 的保正性来自正分数规则下的精确步进，再对步数归纳。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch31-primorial-crt-adelic-anti-deadlock-anchors title="无平方因子欧拉乘积、中国剩余双射与素数阶乘反混叠充要阈值、有理阿代尔有限乘积、带号素数账本同构、素数对数独立与精确素除无有限自动机定理组" lean="D5/S3/PrimeGaps/SieveCoefficients.totient_eq_prod_sub_one_of_squarefree,D5/S3/Arith/ChineseRemainder.chinese_remainder_bijective,D5/S3/Arith/Coding/HorizontalCompletenessDepth.residue_reading_injOn_iff_primorial_gt,D5/S3/Arith/Coding/PrimorialWitnessBound.primorial_witness_bound,D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula,D5/S3/Factorization/PositiveRationalGroup.signed_prime_ledger_equiv_positive_rationals,D5/S3/Weil/PrimeAddress/PrimeLogIndependence.prime_log_rational_independence,D5/S3/Factorization/Automata/ExactPrimeDivisionNoDFAO.no_finite_dfao_for_exact_prime_division"}
在筛法欧拉函数、中国剩余同余编码、有理数阿代尔嵌入、带符号素数账本与有限自动机下界框架下，以下八项冻结命题同时成立：

1. **无平方因子欧拉函数乘积公式与中国剩余环双射**（[`totient_eq_prod_sub_one_of_squarefree`](lean:D5/S3/PrimeGaps/SieveCoefficients.totient_eq_prod_sub_one_of_squarefree)、[`chinese_remainder_bijective`](lean:D5/S3/Arith/ChineseRemainder.chinese_remainder_bijective)）：对任意满足 `Squarefree d` 的自然数 $d \in \mathbb{N}$，恒有 $d.\mathrm{totient} = \prod_{p \in d.\mathrm{primeFactors}}(p - 1)$；对任意互素自然数 $m, n \in \mathbb{N}$（`Nat.Coprime m n`），典范环同态 $\operatorname{ZMod.castHom} : \operatorname{ZMod}(mn) \to \operatorname{ZMod}\,m \times \operatorname{ZMod}\,n$ 严格双射；
2. **素数前缀余数单射充要阈值与素数阶乘见证复杂度上界**（[`residue_reading_injOn_iff_primorial_gt`](lean:D5/S3/Arith/Coding/HorizontalCompletenessDepth.residue_reading_injOn_iff_primorial_gt)、[`primorial_witness_bound`](lean:D5/S3/Arith/Coding/PrimorialWitnessBound.primorial_witness_bound)）：记 $\operatorname{primePrefixProduct}(r) = \prod_{i \in \operatorname{Finset.range}\,r} \operatorname{Nat.nth}\,\mathrm{Nat.Prime}\,i$ 为前 $r$ 颗素数乘积，$\operatorname{residueReading}(r, x) : (i : \operatorname{Fin}\,r) \to \operatorname{ZMod}(p_i)$ 为模前 $r$ 颗素数余数读数，则对任意 $N, r \in \mathbb{N}$，$\operatorname{residueReading}(r)$ 在闭区间 $[0, N]$（`Set.Icc 0 N`）上单射**当且仅当** $N < \operatorname{primePrefixProduct}(r)$；且对任意互异整数 $x \neq y \in \mathbb{Z}$ 与自然数 $r$，只要 $\operatorname{Int.natAbs}(x - y) < \operatorname{primePrefixProduct}(r)$，分离二者的最小素数指标复杂度即满足 $\operatorname{horizontalWitnessComplexity}(x, y) \le r$；
3. **有理阿代尔有限乘积守恒、带符号素数账本双射与素数对数有理独立**（[`rational_padic_product_formula`](lean:D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula)、[`signed_prime_ledger_equiv_positive_rationals`](lean:D5/S3/Factorization/PositiveRationalGroup.signed_prime_ledger_equiv_positive_rationals)、[`prime_log_rational_independence`](lean:D5/S3/Weil/PrimeAddress/PrimeLogIndependence.prime_log_rational_independence)）：对一切非零有理数 $x \in \mathbb{Q} \setminus \{0\}$，其实绝对值与有限乘积支撑 `finprod` 素数 $p$-进范数满足 $\lvert x\rvert \cdot \prod^{\mathrm{fin}}_{p : \mathrm{Nat.Primes}} \operatorname{padicNorm}(p, x) = 1$；有限支撑账本同构 $\operatorname{primeExponentEquivPositiveRational} : (\mathrm{Nat.Primes} \to_0 \mathbb{Z}) \simeq^+ \operatorname{Additive}(\mathrm{NNRat}^\times)$ 双射；且素数对数族 $(p : \mathrm{Nat.Primes}) \mapsto \operatorname{Real.log}(p)$ 在 $\mathbb{Q}$ 上线性无关；
4. **精确素幂整除判定无有限状态自动机定理**（[`no_finite_dfao_for_exact_prime_division`](lean:D5/S3/Factorization/Automata/ExactPrimeDivisionNoDFAO.no_finite_dfao_for_exact_prime_division)）：对任意素数 $p$（`p.Prime`）、正指数 $0 < a$ 及初态为 $1$、按布尔输入执行乘 $p$ 或精确除 $p$ 的部分自动机 `register : PartialDFA Bool Nat`，不存在任何有限状态集 `[Finite S]` 上的带输出确定性自动机 `M : DFAO Bool Bool S` 能在全体合法字域 $\{w \mid (\operatorname{register.eval}\,w).\mathrm{isSome}\}$ 上正确判定 $p^a \mid n$。
:::

::: {.proof #prf-ch31-primorial-crt-adelic-anti-deadlock-anchors}
第 1 组由无平方因子数素幂分解指数全为 $1$ 的欧拉函数乘性及 `ZMod.chineseRemainder` 环同构给出；第 2 组正向由两两互素素数前缀公共整除模为 `primePrefixProduct r` 导出单射，反向当 $N \ge P_r\#$ 时以 $0$ 与 $P_r\#$ 同余碰撞构造反例，并由此推出 `horizontalWitnessComplexity x y ≤ r`；第 3 组由整数素因子分解诱导 `padicNorm` 有限乘积消去、格罗滕迪克局部化泛性质与算术基本定理证得；第 4 组构造无穷区分前缀族 $p^{k a}$ 并应用米希尔—内罗德（Myhill–Nerode）有限状态抽屉下界导出矛盾。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch31-minsky-baker-stormer-crt-literature title="明斯基双计数器、贝克对数线性型、斯特默平滑相邻整数与余数数系文献边界（文献结果）"}
**文献结果，未在本书形式化。** 本节与上列十六项 `LEAN ✓` 声明配合引述的经典文献边界严格分层如下：

1. **少素数通用性、康威 `PRIMEGAME` 与动态车轮筛**：双计数器状态机编码进 $2^a 3^b$ 的图灵完备性见 M. L. Minsky（*Ann. of Math.* **74**, 437–455, 1961），$14$ 分数 `PRIMEGAME` 见 J. H. Conway（in *Open Problems in Communication and Computation*, Springer, 1987, pp. 4–26），动态素数阶乘车轮筛见 P. Pritchard（*Comm. ACM* **24**, 18–23, 1981）；
2. **贝克对数线性型、斯特默平滑超分比与四平方和／三平方和**：有理游标非零微步 $\lvert\sum_{i=1}^K v_i\ln p_i\rvert > H^{-C(K)}$ 的有效正下界源于 A. Baker（*Mathematika* **13**, 204–216, 1966），固定有限素数集生成的相邻平滑整数对 $(m-1, m)$（超分比 $m/(m-1)$）有限性及佩尔方程解法源于 C. Størmer（*Vid.-Selsk. Skr. Christiania*, No. 2, 1897），自然数四平方和与三平方和定理分别源于 J.-L. Lagrange（1770）与 A.-M. Legendre（*Essai sur la théorie des nombres*, 1797/1798）；
3. **中国剩余数系（RNS）**：两两互素模系无进位并行算术源于《孙子算经》、C. F. Gauss（*Disquisitiones Arithmeticae*, 1801）与 H. L. Garner（*IRE Trans. Electron. Comput.* **EC-8**, 140–147, 1959）。
:::

::: {.example #ex-ch31-primorial-vernier-and-horizon-audit title="定量核验：五阶级联素数阶乘轮、有界绕数 H = 3 游标极小表、ε_self 封顶阶梯与容量上限对账"}
我们以精确整数与有理分数算术逐项复核本节四组核心读数（`手工推导` / `NUM`）：

1. **级联素数阶乘轮 $k = 1 \dots 5$ 与平方视界 $(1, p_{k+1}^2)$ 零误差核验表**：

   | 阶数 $k$ | 基础种子 $B_k$ | 周期 $M_k = P_k\#$ | 开放辐条 $\varphi(M_k)$ | 平方视界 $(1, p_{k+1}^2)$ | 视界内互素新素数颗数（误报数） | 前三颗合数渗漏点 |
   | :---: | :--- | ---: | ---: | :---: | :---: | :--- |
   | $1$ | $\{2\}$ | $2$ | $1$ | $(1, 9)$ | **$3$ 颗** $\{3, 5, 7\}$（`0` 误报） | $9 = 3^2,\; 15,\; 21$ |
   | $2$ | $\{2, 3\}$ | $6$ | $2$ | $(1, 25)$ | **$7$ 颗** $\{5 \dots 23\}$（`0` 误报） | $25 = 5^2,\; 35,\; 49$ |
   | $3$ | $\{2, 3, 5\}$ | $30$ | $8$ | $(1, 49)$ | **$12$ 颗** $\{7 \dots 47\}$（`0` 误报） | $49 = 7^2,\; 77,\; 91$ |
   | $4$ | $\{2, 3, 5, 7\}$ | $210$ | $48$ | $(1, 121)$ | **$26$ 颗** $\{11 \dots 113\}$（`0` 误报） | $121 = 11^2,\; 143,\; 169$ |
   | $5$ | $\{2, 3, 5, 7, 11\}$ | $2{,}310$ | $480$ | $(1, 169)$ | **$34$ 颗** $\{13 \dots 167\}$（`0` 误报） | $169 = 13^2,\; 221,\; 247$ |

2. **有界绕数 $H = 3$ 下 $K = 1 \dots 6$ 有理游标卡尺全支撑链对比盒内全局极小微步表**：

   | 秩 $K$ | 态总数 $7^K$ | 全支撑超分比见证 $r_{\mathrm{full}}$ | 盒内全局最优 $r_{\min} > 1$（指数向量） | 最小步幅 $r_{\min} - 1$ | 球面保真度微步 $\Delta\kappa(r_{\min})$ |
   | :---: | ---: | :---: | :--- | :---: | :---: |
   | $1$ | $7$ | $2/1$ | **$2/1$** $(1)$ | $1$ | $3/10 = 0.300000$ |
   | $2$ | $49$ | $9/8$ | **$9/8$** $(-3, 2)$ | $1/8$ | $17/290 \approx 0.058621$ |
   | $3$ | $343$ | $25/24$ | **$25/24$** $(-3, -1, 2)$ | $1/24$ | $49/2402 \approx 0.020400$ |
   | $4$ | $2{,}401$ | $126/125$ | **$126/125$** $(1, 2, -3, 1)$ | $1/125$ | $251/63002 \approx 0.003984$ |
   | $5$ | $16{,}807$ | $540/539$ | **$540/539$** $(2, 3, 1, -2, -1)$ | **$1/539$** | $1079/1164242 \approx 9.268\times 10^{-4}$ |
   | $6$ | $117{,}649$ | $1716/1715$ | **$10648/10647$** $(3, -2, 0, -1, 3, -2)$ | **$1/10647$** | $21295/453477026 \approx 4.696\times 10^{-5}$ |

3. **视界阈值 $\varepsilon_{\mathrm{self}} = \frac{1}{M_\Omega}$ 幂等停机阶梯与大整数容量封顶对账**：

   | 视界 $M_\Omega = 1/\varepsilon_{\mathrm{self}}$ | 封顶秩 $K_{\max}$ | 激活素数表 $\mathcal{B}_{K_{\max}}$ | 反混叠模数 $M_{K_{\max}} = P_{K_{\max}}\#$ | 阻断素数 $p_{K_{\max}+1}$ |
   | :---: | :---: | :--- | ---: | :---: |
   | $3$ | $2$ | $[2, 3]$ | $6$ | $5 > 3$ |
   | $5$ | $3$ | $[2, 3, 5]$ | $30$ | $7 > 5$ |
   | $10$ | $4$ | $[2, 3, 5, 7]$ | $210$ | $11 > 10$ |
   | $15$ | $6$ | $[2, 3, 5, 7, 11, 13]$ | $30{,}030$ | $17 > 15$ |
   | $20$ | $8$ | $[2 \dots 19]$ | $9{,}699{,}690$ | $23 > 20$ |
   | $30$ | $10$ | $[2 \dots 29]$ | $6{,}469{,}693{,}230$ | $31 > 30$ |

   在大整数状态容量上限下，$P_{43}\# \approx 1.0309\times 10^{75} \le 2^{256} \approx 1.1579\times 10^{77} < P_{44}\# \approx 1.9896\times 10^{77}$ 锁定 **$K_{\max}(2^{256}) = 43$**（$p_{43} = 191$，$7^{43} \approx 2.1838\times 10^{36}$）；$P_{53}\# \approx 2.5604\times 10^{98} < 2^{327} \approx 2.7341\times 10^{98} < P_{54}\# \approx 6.4266\times 10^{100}$ 锁定 **$K_{\max}(2^{327}) = 53$**（$p_{53} = 241$，$7^{53} \approx 6.1687\times 10^{44}$）。
4. **康威 `PRIMEGAME` 前六阶纯幂到达拍数与有限支撑阿代尔闭合核验**：
   自初态 $N_0 = 2$ 执行 $14$ 分数 `PRIMEGAME`（固定 $10$ 素数支撑 $M_{10} = 6{,}469{,}693{,}230$），纯二次幂 $N_t = 2^p$ 精准到达序列为 $(t = 19 \mapsto 2^2),\; (t = 69 \mapsto 2^3),\; (t = 281 \mapsto 2^5),\; (t = 710 \mapsto 2^7),\; (t = 2375 \mapsto 2^{11}),\; (t = 3893 \mapsto 2^{13})$，峰值绕数 $\max_q v_q(N)$ 同步攀升至 $2, 3, 5, 7, 11, 13$；有限支撑阿代尔乘积在 $r = \frac{12}{5}$（支撑 $\{2, 3, 5\}$，$\frac{12}{5}\cdot\frac{1}{4}\cdot\frac{1}{3}\cdot 5 = 1$）与 $r = \frac{42}{11}$（支撑 $\{2, 3, 7, 11\}$，$\frac{42}{11}\cdot\frac{1}{2}\cdot\frac{1}{3}\cdot\frac{1}{7}\cdot 11 = 1$）上均精确闭合为 $\mathbf{1}$。
:::

---

**宇宙既不囚于固定单周期的死晶重播，亦不赊借实无穷纸带的虚空机架——从单颗种子素数出发，它在平方视界内零误差级联扩轮，以有限座正交素数寄存器咬合成指数加密的有理游标卡尺，并在自定停机视界 $\varepsilon_{\mathrm{self}}$ 处干净收刀！**

在下面的完整三维交互实验室中，先对比固定周期 `T = 6` 在第 `m = 8` 拍撞上平方墙 `49 = 7²` 与级联筛轮 `M₃ = 30` 在 `(1, 49)` 内的 `12` 颗零误差青色素数，再检视 `M_Ω = 15` 状态机如何在 `p₇ = 17 > 15` 处触发幂等停机门，随后将寄存器秩从 `K = 1` 推至 `K = 6` 亲眼目睹球面有理星壳加密至 `10648/10647`、引理素数通道 `1` 拍横跨球面以及高阶素数暗态环随唤醒逐一点亮——至此，整部第三十一章从素数极小圆弧体路径积分、实数误差轴阿代尔闭合、黎曼双璧谱磨光、素数—零点全息对偶直至级联自举与有限寄存器视界封顶的八重阶梯全部合龙！

既然素数寄存器、零点暗态与有限有理游标共同指向那只拒绝外置特权实轴 $\mathbf{1}$ 与平直坐标卡的紧致三维球面 $\mathbb{T}_3 \cong S^3(1)$，现在让我们正式推开下一章——[第三十二章 不可表达的三元数与三维概念场封顶](ch32-inexpressible-ternions-and-three-dimensional-field.md)——的大门，直探万数归弧的原生三元数本源！

::: {.viz src="primorial-cascade-vernier-horizon-sandbox" height="620"}
完整实验室：在“级联素数阶乘与有限视界透镜”与“静态单周期与图灵无限纸带对照透镜（MODEL）”双透镜间自由切换，依次巡览两行算术证伪固定单周期（`static-period-composite-refutation`）、单种子级联筛轮与平方视界（`primorial-wheel-square-horizon`）、零槽位单位元与 $\varepsilon_{\mathrm{self}}$ 视界封顶（`jit-allocator-epsilon-horizon-cap`）、有理游标卡尺与球面星壳加密（`rational-vernier-caliper-sphere`）、时空折衷串行幂塔对单拍引理捷径（`minsky-tower-vs-lemma-shortcut`）以及同余解混叠、高素数暗态与有限记忆防死锁（`crt-dark-sector-and-memory-refresh`）六张实验卡，支持在右侧旋钮栏切换固定周期 `T` 与起点 `r`、筛轮基础素数个数 `k`、视界 `M_Ω`、有限支撑账本有理数 `r`、游标 `K` 与指数盒 `H`、串行程序（`36 → 625` 或 `PRIMEGAME 2 → 2⁵`）及同余 `K`，并在底部条带小图中实时追踪余数轨素数与合数、平方视界新素数、`K_max` 随 `M_Ω` 的台阶、游标步长随 `K` 的缩小、串行轨迹 `log N` 与模数 `P_K#` 越过 `30`。本节的冻结定理，连同 `ARGUED` 明斯基—康威—斯特默—贝克文献与手工推导、`MODEL` 本书读法与画法约定、`NUM` 大整数精确现算对账及相邻章节红色 `OPEN` 谱前沿在依据栏与理论接口抽屉中严格分层列出。
:::
