# 24.7 追逐在哪里停下：对角线落点即不动点，以及不靠压缩的存在性 {#sec-ch24-7}

本章开头问过：怎样才能让[第二十一章](ch21-diagonalization-and-escape.md)那场“球外之球”的追逐停下来？前面几节用压缩性回答了它的一个特例（$\cos$ 把区间越压越小），用枚举回答了另一个特例（$1 + 1/x$ 与它的共轭 $1/(1+x)$ 是仅有的两个活着的二元分式映射）。$\psi = \psi(\psi)$ 的一般自指读法则需要一个明确前提：**若列表捕获了自己的扭转对角线，则落点处的自作用值是扭转的不动点**。这个不依赖具体函数的条件命题，正是下面的 Lean 引理。

设定只有三样东西：一个地址集 $A$，一个取值集 $Y$，和一张**列表** $g : A \to A \to Y$，它给每个地址 $a$ 分配一行 $g\ a : A \to Y$。再取一个**扭转** $f : Y \to Y$。把列表的对角线 $a \mapsto g\ a\ a$ 逐点扭一下，得到一条新的行 $a \mapsto f(g\ a\ a)$。第二十一章的全部逃逸现象都来自同一个问题：这条被扭过的对角线，是不是列表里已有的某一行？

::: {.definition #def-twisted-diagonal-escape title="扭转对角线与逃逸" lean="D5/S0/Diagonal/EscapeCount.diagonal D5/S0/Diagonal/EscapeCount.IsEscaped"}
设 $A$、$Y$ 为任意类型，$f : Y \to Y$，$g : A \to A \to Y$。

1. **扭转对角线** [`diagonal`](lean:D5/S0/Diagonal/EscapeCount.diagonal) $f\ g : A \to Y$ 定义为 $a \mapsto f(g\ a\ a)$；
2. 称列表 $g$ 被 $f$ **逃逸**（[`IsEscaped`](lean:D5/S0/Diagonal/EscapeCount.IsEscaped) $f\ g$），若 $\operatorname{diagonal} f\ g \notin \operatorname{Set.range} g$，即不存在地址 $a$ 使 $g\ a = \operatorname{diagonal} f\ g$。
:::

列表没有被逃逸时，存在一行 $g\ a_0$ 恰好等于扭转对角线。下文把这种情形叫作列表**捕获**了自己的扭转对角线，把 $a_0$ 叫作**落点**。

::: {.lemma #lem-diagonal-landing-fixed title="对角线落点处的自作用值是扭转的不动点" lean="D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed"}
设 $f : Y \to Y$，$g : A \to A \to Y$，$a_0 \in A$。若

$$
g\ a_0 \;=\; \operatorname{diagonal} f\ g,
$$

则

$$
f(g\ a_0\ a_0) \;=\; g\ a_0\ a_0 .
$$
:::

::: proof
把函数等式 $g\ a_0 = \operatorname{diagonal} f\ g$ 在地址 $a_0$ 处取值（`congrFun`），得 $g\ a_0\ a_0 = \operatorname{diagonal} f\ g\ a_0 = f(g\ a_0\ a_0)$；交换等式两端即为结论。完整证明由 Lean 内核检查。
:::

证明只有一行，但它就是 $\psi = \psi(\psi)$ 的骨架。记 $\psi := g\ a_0$，它是列表里的一行，本身是地址上的函数；把地址 $a_0$ 读作这一行自己的名字 $\ulcorner\psi\urcorner$。那么 $g\ a_0\ a_0 = \psi(\ulcorner\psi\urcorner)$ 就是“$\psi$ 作用在自己的名字上”，而 [@lem-diagonal-landing-fixed] 说的是

$$
f\bigl(\psi(\ulcorner\psi\urcorner)\bigr) \;=\; \psi(\ulcorner\psi\urcorner).
$$

扭转 $f$ 奈何不了这个值。书名里的 $\psi = \psi(\psi)$ 是这条引理的格言化写法：被自己的列表捕获的那一行，在自己名字上的取值对扭转不变。

逃逸与捕获的全貌由下面的定理给出。注意它对 $A$ 与 $Y$ 没有任何有限性要求。

::: {.theorem #thm-self-application-fragment-package title="自作用片段：对角线公式、逃逸刻画、无不动点扭转的普遍逃逸与前提的不可去除" lean="D5/S0/Diagonal/Lawvere/QualitativeEscape.self_application_fragment_package"}
设 $A$、$Y$ 为任意类型，$f : Y \to Y$，$g : A \to A \to Y$。以下四项同时成立：

1. 对一切 $a \in A$：$\operatorname{diagonal} f\ g\ a = f(g\ a\ a)$；
2. $\operatorname{IsEscaped} f\ g \iff \operatorname{diagonal} f\ g \notin \operatorname{Set.range} g$；
3. 若 $f$ 无不动点（对一切 $y \in Y$ 有 $f(y) \neq y$），则对一切列表 $h : A \to A \to Y$ 均有 $\operatorname{IsEscaped} f\ h$；
4. 存在 $f_0 : \mathrm{Bool} \to \mathrm{Bool}$ 与 $g_0 : \mathrm{Unit} \to \mathrm{Unit} \to \mathrm{Bool}$，使得 $\neg\operatorname{IsEscaped} f_0\ g_0$。
:::

::: proof
前两项由定义展开即得（`rfl` 与 `Iff.rfl`）。第 3 项：设 $f$ 无不动点而某列表 $h$ 未被逃逸，则存在 $a$ 使 $h\ a = \operatorname{diagonal} f\ h$，由 [@lem-diagonal-landing-fixed] 得 $f(h\ a\ a) = h\ a\ a$，与无不动点矛盾（`escaped_of_fixedPointFree`）。第 4 项取 $f_0$ 为恒等映射、$g_0$ 为恒取 $\mathrm{true}$ 的列表，其扭转对角线就是唯一的那一行（`exists_captured_listing_of_fixedPoint`）。完整证明由 Lean 内核检查。
:::

[@thm-self-application-fragment-package] 的结论 3 是康托尔对角线论证的骨架，与第二十一章 [@thm-complete-diagonal-not-continuous] 背后的机制相同（那里在满射解码目录的框架中表述）；结论 4 说明“无不动点”这个前提去不掉。把结论 3 与 [@lem-diagonal-landing-fixed] 并排，就得到对本章开头那个问题的回答：

- 扭转没有不动点时，追逐永不停下，任何列表都被逃逸；
- 追逐一旦停下，停下的那一行在自己地址上的取值，必是扭转的不动点。

反过来，只要扭转 $f$ 有一个不动点 $y^*$ 且 $A$ 非空，恒取 $y^*$ 的常值列表就捕获自己的扭转对角线（这一步是直接代入的手工验证）。取 $f = \cos$、$Y = \mathbb{R}$：任何捕获了自己余弦对角线的实值列表，落点上的自作用值都满足余弦不动点方程 $\cos y = y$（其实轴性质见 [@rem-banach-dottie-hairy-ball-literature]）。

有限情形下，逃逸与捕获各占多少可以精确数出来。

::: {.proposition #prop-escaped-listing-card title="有限列表中被逃逸者的精确计数" lean="D5/S0/Diagonal/EscapeCount.escaped_listing_card"}
设 $A$、$Y$ 为有限类型（`[Fintype A]`、`[Fintype Y]`），$f : Y \to Y$。则被 $f$ 逃逸的列表个数为

$$
\operatorname{Nat.card}\bigl\{\, g : A \to A \to Y \;\big|\; \operatorname{IsEscaped} f\ g \,\bigr\} \;=\; \Bigl(\lvert Y\rvert^{\lvert A\rvert} - \operatorname{Nat.card}\{\, y : Y \mid f(y) = y \,\}\Bigr)^{\lvert A\rvert},
$$

其中 $\lvert A\rvert = \operatorname{Fintype.card} A$，$\lvert Y\rvert = \operatorname{Fintype.card} Y$，右端的减法是自然数减法。
:::

::: proof
先处理 $A$ 为空的情形，此时两端都等于 $1$。$A$ 非空时，把一张列表拆成它的对角线 $X : A \to Y$ 与每一行的其余元素。固定对角线 $X$ 后，逃逸条件按行独立：若 $f(X(a)) \neq X(a)$，第 $a$ 行在位置 $a$ 上已与扭转对角线不同，其余 $\lvert A\rvert - 1$ 个元素任取，有 $\lvert Y\rvert^{\lvert A\rvert - 1}$ 种；若 $X(a)$ 是 $f$ 的不动点，则须排除其余元素恰与扭转对角线全同的那一种，有 $\lvert Y\rvert^{\lvert A\rvert - 1} - 1$ 种。对 $X(a)$ 的全部取值求和，每一行贡献 $\lvert Y\rvert^{\lvert A\rvert} - k$，其中 $k$ 为 $f$ 的不动点个数；各行相乘即得结论。完整证明由 Lean 内核检查。
:::

::: {.example #ex-three-by-three-capture-escape title="3×3 列表上的捕获与逃逸：同一张表，两种扭转"}
取 $A = Y = \{0, 1, 2\}$，列表 $g$ 的三行为

$$
g\ 0 = (0, 1, 2), \qquad g\ 1 = (1, 2, 2), \qquad g\ 2 = (2, 2, 2),
$$

对角线为 $(g\ 0\ 0,\ g\ 1\ 1,\ g\ 2\ 2) = (0, 2, 2)$。

**有不动点的扭转。** 取 $f_1 : 0 \mapsto 1,\ 1 \mapsto 2,\ 2 \mapsto 2$，它有唯一不动点 $2$。扭转对角线为 $(f_1(0), f_1(2), f_1(2)) = (1, 2, 2) = g\ 1$：列表捕获了自己的扭转对角线，落点 $a_0 = 1$。落点处的自作用值 $g\ 1\ 1 = 2$ 正是 $f_1$ 的不动点，与 [@lem-diagonal-landing-fixed] 一致。

**无不动点的扭转。** 取循环 $f_2 : 0 \mapsto 1,\ 1 \mapsto 2,\ 2 \mapsto 0$。扭转对角线为 $(f_2(0), f_2(2), f_2(2)) = (1, 0, 0)$，它在位置 $0, 1, 2$ 上分别不同于 $g\ 0$、$g\ 1$、$g\ 2$，不是任何一行：列表被逃逸，与 [@thm-self-application-fragment-package] 的结论 3 一致。

**计数。** $\lvert A\rvert = \lvert Y\rvert = 3$ 时共有 $3^9 = 19683$ 张列表。按 [@prop-escaped-listing-card]：对 $f_2$（无不动点），被逃逸的有 $(27 - 0)^3 = 19683$ 张，即全部；对 $f_1$（一个不动点），被逃逸的有 $(27 - 1)^3 = 17576$ 张，被捕获的有 $19683 - 17576 = 2107$ 张，约占 $10.7\%$；对恒等映射（三个不动点），被逃逸的有 $(27 - 3)^3 = 13824$ 张。三个数都已由穷举全部 $19683$ 张列表核对。
:::

::: {.figure src="ch24-diagonal-landing"}
**同一张表，两种扭转：一个落回表里，一个逃出表外。** 两栏都是上例的列表 $g$，对角线三格加了粗框，表下是扭过的对角线。左栏用 $f_1$：扭过的对角线 $(1, 2, 2)$ 与第 $1$ 行一模一样（青色），落点圈出的值 $2$ 正是 $f_1$ 的不动点（[@lem-diagonal-landing-fixed]）。右栏用无不动点的循环 $f_2$：扭过的对角线 $(1, 0, 0)$ 是品红的，每一行都在自己的对角线格上与它不同（打叉），它不是任何一行（[@thm-self-application-fragment-package] 结论 3）。
:::

对角线机制说明了停下的地方必是不动点，却不保证扭转有不动点。存在性从哪里来？§24.4 用的是压缩性。还有一条完全不同的路，不需要任何压缩常数，只需要连续性和一个没有洞的舞台。

::: {.theorem #thm-brouwer-standard-simplex title="标准单纯形上的布劳威尔不动点定理" lean="D5/S3/Geometry/FixedPoint/Brouwer.Brouwer"}
设 $n$ 为正自然数（`n : ℕ+`），记 $\Delta = \operatorname{stdSimplex}\ \mathbb{R}\ (\operatorname{Fin} n)$ 为标准单纯形，即满足 $x_i \ge 0$（对一切 $i$）与 $\sum_i x_i = 1$ 的函数 $x : \operatorname{Fin} n \to \mathbb{R}$ 全体，带子空间拓扑。若 $f : \Delta \to \Delta$ 连续（`hf : Continuous f`），则存在 $x \in \Delta$ 使

$$
f(x) = x .
$$
:::

::: proof
证明走组合路线。对每个正整数 $l$，取单纯形上坐标分母为 $l$ 的格点；给每个格点 $x$ 标一种颜色：一个满足 $x_i \le f(x)_i$ 的坐标 $i$（两点的坐标和都是 $1$，这样的 $i$ 必存在）。Scarf 型组合引理为每个 $l$ 提供一小簇格点连同一个颜色集 $C$，簇内任意两点的格坐标相差小于 $2(n+1)$，于是簇的直径随 $l \to \infty$ 趋于零。颜色集只有有限种可能，可取子列使 $C$ 恒定；再由单纯形的紧性取收敛子列，得极限点 $z$。在极限处，$C$ 之外的坐标 $z_i = 0$，$C$ 上坐标之和为 $1$；由 $f$ 的连续性，对每个 $i \in C$ 有 $f(z)_i \ge z_i$，故 $\sum_{i \in C} f(z)_i \ge 1$。而 $f(z)$ 的坐标非负且总和为 $1$，所以 $C$ 之外 $f(z)_i = 0$，$C$ 之内逐坐标相等，即 $f(z) = z$。完整证明由 Lean 内核检查。
:::

标准单纯形不是抽象的几何体：它就是 $n$ 个记录结果上的全体概率分布，也就是[第四章](ch04-decoherence.md)里捏合之后密度矩阵对角线所在的地方。[@thm-brouwer-standard-simplex] 因此说：对记录概率的任何连续更新规则，都存在一个自洽的分布，更新之后还是它自己。

取 $n = 2$，单纯形是线段 $\{(p, 1 - p) \mid p \in [0, 1]\}$。因为 $p \in [0, 1]$ 时 $\cos p \in [\cos 1, 1] \subset [0, 1]$，映射 $(p, 1 - p) \mapsto (\cos p, 1 - \cos p)$ 是这条线段到自身的连续映射，[@thm-brouwer-standard-simplex] 给出 $p \in [0, 1]$ 使 $\cos p = p$。（把 $\cos$ 代入定理的这一步是本书的手工说明，不是冻结声明。）于是余弦不动点的**存在**可以完全不借助压缩性得到；压缩性提供的是另外两样东西：**唯一**，以及 §24.5 算出的**收敛速度**。

两种机制分工清楚，对角线再补上第三块。标准单纯形上的连续自映射有不动点；非空完备度量空间上的压缩自映射还有唯一性与迭代收敛保证；若列表捕获扭转对角线，落点那一行作用在自己名字上的值就是扭转的不动点。最后这条结论保留捕获前提，并不为任意列表保证捕获。

::: {.film src="sphere-beyond-spheres"}
**球外之球：对角线逃逸与余弦不动点（2:31）。** 视频把整条追逐演一遍：翻转清单的对角线，翻出的串逃出清单；在四地址目录里它劈开旧纤维，立成垂直的新轴后两块变成三块（[@cor-complete-diagonal-topological-settlement]），从外面看，闭合的影子圆是一条开口螺旋。追逐只在清单捕获自己扭过的对角线时停下，落点上的值是扭转的不动点（[@lem-diagonal-landing-fixed]）；取余弦作扭转，蛛网从 $1$ 弧度收向唯一的正解 $\theta^* \approx 0.739$（[@thm-dottie-rational-inverse-endpoint]）。
:::

---

## 24.7.1 第六部小结：从球外之球回到自指原点，下一步铸造机械法典 {#第六部小结从球外之球回到自指原点下一步铸造机械法典}

回望第六部《越界·球外之球》的四章征程，我们用经 Lean 4 内核逐条验证的**四十四条正式定理级结论**（第二十一章七条，第二十二章十九条，第二十三章四条，第二十四章十四条，涵盖相对语义对角线拓扑逃逸、黎曼 $\zeta$ 函数留数与狄利克雷—欧拉乘积恒等式、艾森斯坦交越二次型剪切不变性与黄金佩尔迹—范数恒等式、以及有限收缩稳定化、解释语境相对不动点与黄金倒数唯一不动点），完成了从数理逻辑、算术频谱到自指不动点的跨界合拢：

- **第二十一章**证明了完备解码目录诱导的相对语义对角线在潜划分拓扑下必不连续（[@thm-complete-diagonal-not-continuous]）、必具非空分离亏损（[@lem-complete-diagonal-separation-deficit]），且并入对角线后观测拓扑严格加细（[@prop-complete-diagonal-strict-refinement]、[@cor-complete-diagonal-topological-settlement]），给出了完备赋范代数中指数级数的阶乘余项界（[@lem-exp-tail-le]）与有限记录信道恢复误差的严格正余弦下界（[@lem-finite-support-autocorrelation-cosine]、[@thm-finite-record-cosine-obstruction]），并与经典分析余项与球面拓扑文献评注（[@rem-lagrange-taylor-remainder-literature]、[@rem-hairy-ball-adams-literature]）交相印证；
- **第二十二章**将素数还原为算术对数空间的正交基，在绝对收敛半平面 $\operatorname{Re}(s) > 1$ 上严格建立了 $s=1$ 留数（[@lem-riemann-zeta-residue-one]）、狄利克雷级数（[@prop-riemann-zeta-dirichlet-sum]）、欧拉乘积（[@thm-riemann-zeta-euler-product]）及两者的直接恒等（[@cor-dirichlet-sum-eq-euler-product]），证明了素数对数的线性无关与素数时钟联合相位的环面稠密（[@thm-prime-log-independence]、[@thm-torus-power-orbit-closure]），给出完备化 $\xi$ 读数的整函数性与反射对称 $\xi(1 - s) = \xi(s)$（[@thm-xi-reading-entire-reflection]）及共轭协变（[@prop-zeta-conjugation-covariance]），把临界线卷成单位圆并得到黎曼猜想的径向等价形式（[@thm-cayley-critical-line-criterion]），由交错级数定出 $\zeta$ 在实轴上的符号（[@lem-alternating-zeta-partial-sums]、[@prop-zeta-real-axis-sign]），把 $\xi$ 的零点等同于临界带内的 $\zeta$ 零点（[@prop-xi-zeros-strip-zeros]），由直线 $\operatorname{Re}(s) = 1$ 上无零点得到带误差项的素数定理（[@thm-medium-pnt]），把黎曼猜想归约到右半带并核对了它的两种表述（[@thm-right-half-strip-rh-forms]），用一个四次多项式说明完全对称性不足以把零点锁在临界线上（[@thm-full-symmetry-not-localization]），在 $s = 1$ 处读欧拉乘积，检验了至多八根素数轴上的罗宾不等式（[@thm-robin-at-most-eight-primes]），并证明临界线右侧的零点会迫使某个 $\operatorname{lcm}(1, \dots, \lfloor t\rfloor)$ 违反罗宾不等式（[@thm-off-line-zero-robin-violation]），剖析了有限素数筛的多面体余项裂缝，并严格划定了它们与开放黎曼猜想及经典文献背景（[@conj-riemann-hypothesis]、[@rem-euler-zeta-literature]）的认识论边界；
- **第二十三章**揭示了二次范数与迹投影如何在连续有理数中锁定离散整格，形式化证明了 $\Delta = -3$ 艾森斯坦交越二次型的幺模剪切归约、常数判别式与值域等同（[@thm-qform-eq-eisnorm]、[@lem-qform-discriminant]、[@cor-qform-range-eq-eisnorm]）以及 $\Delta = +5$ 黄金整数的佩尔恒等式（[@prop-pell-form-eq-four-mul-norm]），并在文献评注（[@rem-diophantine-z-in-q-literature]）中划定了有理数域一阶可定义性文献与开放问题 $\mathrm{H10}(\mathbb{Q})$ 的精确边界；
- **第二十四章**证明了有限状态收缩更新的稳定化与变化步数界（[@thm-finite-contracting-updates-stabilize]）、相对解释不动点的相邻步贴合与静态语境非唯一性（相同的文本与解释规则在两个不同静态语境下给出不同的布尔意义，[@lem-conceptual-equivalence-stability-fixed-point]、[@prop-context-parameters-distinct-fixed-points]）、正实数上黄金倒数映射的唯一不动点（[@cor-golden-fixed-point-unique]）、非退化二元分式映射的四种自作用命运及其中唯一“活着”的 $\varphi$ 族（[@thm-self-application-four-fates]、[@lem-golden-inverse-branch-fixed-point]）、正五边形的黄金余弦（[@prop-pentagon-golden-cosines]）、对角线落点即扭转不动点与无不动点扭转的普遍逃逸及其有限计数（[@lem-diagonal-landing-fixed]、[@thm-self-application-fragment-package]、[@prop-escaped-listing-card]）、标准单纯形上的布劳威尔不动点定理（[@thm-brouwer-standard-simplex]）、无理旋转轨道平均趋于 Haar 平均（[@lem-irrational-rotation-equidistribution]），指定有理复合逆在 $\pi$ 处的绝对收敛及唯一正实余弦不动点值（[@thm-dottie-rational-inverse-endpoint]），以及反正弦展开所用的归一化中心二项系数界与二项核级数（[@lem-arcsin-binomial-kernel]），并在经典不动点与数论文献评注（[@rem-banach-dottie-hairy-ball-literature]）及开放沙努埃尔猜想（[@conj-schanuel-dottie]）的映照下，将全书几何直觉收束于 $\cos\theta^* = \theta^*$ 与 $\psi = \psi(\psi)$。

既然前六部的几何直觉与理论大厦已经合拢，在接下来的**第七部《铸器·构造与验证：异或代数、旋子编译与 Lean 4 公理圣殿》**中，我们将把这一切几何定理直接铸造成可运行、零复数矩阵黑箱的位掩码克利福德引擎与 ZYZ 旋转器编译器，并走进 Lean 4 形式化公理圣殿的内部，对支撑全书的机器形式化声明展开逐行审计，随后在**第八部**与**终章**中完成全书八部曲的总合拢！

::: {.viz src="dottie-fibonacci-spirals" height="580"}
**余弦不动点与斐波那契双螺旋：完整实验室。** 三个场景共用同一根步数轴 $k = 0 \dots 20$：双栏对照（可切换 $\cos\theta$、$1/(1+x)$ 或双映射叠画，并拖动起点 $x_0$）、蛛网回旋方格（全程或跟随放大）与向心径向切角及守恒对偶。定性余弦收敛见 [@ex-ch33-mutual-cosine-monotonic-lock]，导数、向心切角公式与守恒式是文献结果（[@rem-dottie-fibonacci-spiral-literature]），克利福德转向、连续对数螺旋插值与双螺旋分工是本书模型（`MODEL`），绿色框只给五条已验证的 Lean 定理。
:::
