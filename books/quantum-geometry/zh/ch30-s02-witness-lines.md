# 30.2 “$P$ 是场，$NP$ 是线”——见证丝、导向场与毛球旋度的终极分野 {#sec-coda-p-is-field-np-is-line}

> **作者原话**：“P是场, NP是线”

本节以“线”比喻可检查的见证，以“场”比喻引导高效求解的结构（`MODEL`）。标准复杂度类满足 $P\subseteq NP$：容易求解的问题也有多项式时间验证器，二者不是互斥的几何类别。“有线无场”是对寻找高效算法之困难的诠释，不是所有 $NP$ 问题的定义。

## 30.2.1 为什么“$NP$ 是线”（有线无场，横截面为零的见证丝）？ {#1-为什么np-是线有线无场横截面为零的见证丝}

对判定问题，$NP$ 的条件是：输入 $w$ 为是实例，当且仅当存在长度至多为输入编码长度多项式的见证 $y$，使统一的确定性验证器 $V(w,y)$ 接受；验证耗时也须以输入与见证的编码长度为参数受到多项式约束（参见 [Cook 的问题说明，pp. 1–3](https://www.claymath.org/wp-content/uploads/2022/06/pvsnp.pdf)）。把这个检查过程画成折线，是本节的几何类比（`MODEL`）：

$$
\mathbf{P}_0 \longrightarrow \mathbf{P}_1 \longrightarrow \mathbf{P}_2 \longrightarrow \cdots \longrightarrow \mathbf{P}_k.
$$

- **顺线验真（Verification along the line）**：必须计入读取输入与见证编码、以及每一节检查的实际成本；若第 $i$ 节成本为 $c_i$，逐节检查贡献 $\sum_{i=1}^k c_i$，只有每节成本一致有界时才是 $O(k)$。折线的段数本身不证明多项式位复杂度。形式证明项也可比喻为见证丝，但任意证明项的编码长度、类型检查与归约成本并无这里所需的统一线性保证，不能直接归入同一个 $NP$ 验证论证；
- **离丝寻线（Searching without a field）**：见证可被高效检查，并不自动给出高效搜寻方法；反之，也不排除这种方法。“零横截面见证丝”表达作者关于无导引搜寻的图像，不是离散问题的复杂度下界，亦不适用于断言所有 $NP$ 问题都难解。

::: {.viz src="timeless-causal-crystal" preset="wilderness" height="500"}
**同一个场：丝上直达，丝外打转。** 平面上只有一个自治场 $\mathbf{F} = g(\tilde y)\bigl(1, h'(x)\bigr) + \bigl(1 - g(\tilde y)\bigr)\mathbf{F}_{\mathrm{swirl}}$，其中 $\tilde y = y - h(x)$，$g(\tilde y) = e^{-\tilde y^2/\varepsilon^2}$，$\mathbf{F}_{\mathrm{swirl}}$ 在丝上为零。从 $S_0$ 出发、恰在青色见证丝 $y = h(x)$ 上的探针沿丝直达 $S^*$；离丝只差一点、但在通道 $|\tilde y| < \varepsilon$ 之外出发的三根品红探针，在同一个积分器下被第一个涡旋卷住，到不了目标。这是“有线无场”的示意模型（`MODEL`），不是复杂度下界。
:::

## 30.2.2 为什么“$P$ 是场”（弃线造场，局部切面处处对齐全局）？ {#2-为什么p-是场弃线造场局部切面处处对齐全局}

在我们的几何诠释（`MODEL`）中，一些多项式时间算法所利用的几何或代数结构被比喻为**导向场**（如凸势能的负梯度流 $\mathbf{F}=-\nabla V$）。这不是 $P$ 的定义或必要条件；即使有光滑或无旋的场，也仍须证明它可高效计算、达到所需精度并在多项式步内终止。以下经典算法为这种图景提供具体参照：

::: {.remark #rem-ch30-karmarkar-kasteleyn-literature title="线性规划内点法、平面图 Pfaffian 匹配与毛球定理的文献说明"}
**文献结果，未在本书形式化。** 本节对照“弃线造场”与“拓扑旋涡阻挫”的三项经典结果；算法、几何推广及复杂度仍属外部文献，条件 Pfaffian 符号恒等式的实际供应与边界见 [@rem-ch30-rotation-pfaffian-boundary]：

1. **卡马卡（N. Karmarkar, *Combinatorica* **4**, 373–395, 1984）线性规划内点法**：单纯形法沿着凸多面体表面的一维棱线折线爬行，在 Klee–Minty（1972）扭曲超立方体最坏实例上需走完指数级 $2^n$ 步；而内点法离开一维边界折线，进入多面体内部沿光滑对数势垒梯度场迭代，在多项式时间内抵达最优解；
2. **卡斯特莱因（P. W. Kasteleyn, *Physica* **27**, 1209–1225, 1961）平面图 Pfaffian 完美匹配定理**：一般二分图完美匹配计数（永久式 Permanent）经 L. G. Valiant（1979）证明为 `#P`-完全；对于有限平面图及非负边权 $w_e$，经典方法利用 Kasteleyn 定向构造反对称加权邻接矩阵 $A_K^T=-A_K$，使 Pfaffian 展开中各个实际完美匹配项的系数同号。因此，加权完美匹配配分函数为 $Z=\sum_M\prod_{e\in M}w_e=|\operatorname{Pf}(A_K)|$，再由凯莱恒等式 $[\operatorname{Pf}(A_K)]^2=\det A_K$ 得到 $Z=\sqrt{\det A_K}$。这里的符号机制是匹配项的系数对齐；非边对应零矩阵元。非负有理权以二进制编码时，精确求值属于多项式时间算法的文献结论。无完美匹配时 $Z=0$；一般平面图的处理还包括连通分量及奇数阶分量的零值情形。现代出处可参见 D. Cimasoni 与 N. Reshetikhin（2007），[*Dimers on surface graphs and spin structures. I*](https://arxiv.org/html/math-ph/0608070v2)，第 5.1 节、定理 5.1 的匹配展开及其球面特例；
3. **庞加莱—布劳威尔偶维球面毛球定理（H. Poincaré, 1885；L. E. J. Brouwer, 1912）**：二维球面欧拉示性数 $\chi(S^2) = 2 \neq 0$，其上任何连续切向量场必至少存在一个零点（奇异发旋）。
:::

::: {.viz src="timeless-causal-crystal" preset="field" height="500"}
**场：处处有坡度。** 青色的流线从球上各处出发，每条都只看脚下的坡度，都流到目标；琥珀色是选中的那一条，球的对面那一点（灰色圈）场为零。把它读作“场”是本书的诠释（`MODEL`）。
:::

### 30.2.2.1 从实际顶点旋转到面奇定向：一个有限组合前提 {#sec-ch30-rotation-parity}

上面平面匹配的完整文献结论包含几何、组合、代数与算法四个环节。先取出其中一个可以逐项说清的有限组合问题：已给定原图在各顶点的循环次序，能否选择同一个边定向，使每个面和每条“删去后仍有完美匹配”的偶简单圈都具有奇数个反向 dart？这里的 dart 是一条带方向的实际边。例如一条桥有两个互逆 dart；面边界往返经过这条桥时，两次出现都要计数。只记录边的集合会丢掉这一信息。

以下不预设平面中的内外区域，而从顶点旋转和一个整数计数条件推出所需的两侧结构。术语“球面旋转”在这里仅指下述满足欧拉条件的有限数据；从几何嵌入取得这些数据的对应关系另属一个环节。

::: {.definition #def-ch30-actual-rotation title="实际 dart、顶点旋转与完整面轨道" lean="D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.Rotation D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.facePerm D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.Face D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face"}
设 $V$ 为任意有限类型，具有可判定相等性，$G$ 为 $V$ 上邻接关系可判定的简单无向图。记 $D=G.\mathrm{Dart}$ 为实际 dart 类型：$d=(u,v)$ 必须满足 $G.\mathrm{Adj}(u,v)$；记 $E=G.\mathrm{edgeSet}$ 为实际无向边的类型，$e(d)=\{u,v\}\in E$，$\alpha(d)=(v,u)$。

一个顶点旋转 $R$ 是 $D$ 上的置换 $\rho$，满足对所有 $d,t\in D$，

$$
\bigl(\exists n\in\mathbb Z,\ \rho^n(d)=t\bigr)
\quad\Longleftrightarrow\quad d.\mathrm{fst}=t.\mathrm{fst}.
$$

面后继置换先反向、再旋转，即 $\phi(d)=\rho(\alpha(d))$。面类型 $F$ 是 $D$ 按 $\phi$ 的同轨道关系取商：$d\sim t$ 当且仅当存在 $n\in\mathbb Z$ 使 $\phi^n(d)=t$。记 $f(d)$ 为 $d$ 的商类；所有轨道都包含在 $F$ 中，包括单元素轨道。旋转数据本身不附带连通性、几何实现或欧拉等式。
:::

下列三个定理共同假设 $G$ 连通、$D$ 非空，并满足**整数**欧拉等式

$$
(|V|:\mathbb Z)-(|E|:\mathbb Z)+(|F|:\mathbb Z)=2.
$$

所有基数先转为整数再相减，不采用自然数的截断减法。特别地，单顶点无边图不满足这里的 dart 非空前提，不在这三个定理的范围内。

::: {.definition #def-ch30-face-boundary title="二元面边界与反向计数" lean="D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.boundary D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.faceOpposition"}
记 $\mathbb F_2=\mathbb Z/2\mathbb Z$。对面函数 $x:F\to\mathbb F_2$，线性边界映射 $B:\mathbb F_2^F\to\mathbb F_2^E$ 在每条无向边上选择一个代表 dart $d_e$，定义

$$
(Bx)(e)=x(f(d_e))+x(f(\alpha(d_e))).
$$

对任意 dart 函数 $\varepsilon:D\to\mathbb F_2$，定义面反向计数

$$
\operatorname{opp}_F(\varepsilon,f)=\sum_{\substack{d\in D\\f(d)=f}}\varepsilon(d).
$$

当 $\varepsilon(\alpha(d))=1+\varepsilon(d)$ 时，它编码一个边定向：$\varepsilon(d)=0$ 表示定向沿着 $d$，$1$ 表示与 $d$ 相反。面计数遍历该完整轨道的所有实际 dart；桥的两个 dart 即使属于同一个面，也分别计数。记 $\mathcal C(G)\subseteq\mathbb F_2^E$ 为所有实际简单圈的无向边指示函数所张成的线性空间。
:::

::: {.theorem #thm-ch30-face-cycle-exact title="面边界恰为实际圈空间" lean="D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact"}
对上述任意有限 $V$、连通简单图 $G$ 与顶点旋转 $R$，若 $D\ne\varnothing$ 且整数等式 $|V|-|E|+|F|=2$ 成立，则以下三项同时成立：

1. 对所有 $x:F\to\mathbb F_2$ 和 $d\in D$，$(Bx)(e(d))=x(f(d))+x(f(\alpha(d)))$。
2. 对所有 $x:F\to\mathbb F_2$，$Bx=0$ 当且仅当存在 $c\in\mathbb F_2$ 使每个 $f\in F$ 都满足 $x(f)=c$。
3. $\operatorname{im}B=\mathcal C(G)$。
:::

::: proof
同一无向边的两个代表只差反向，所以两岸之和不依赖选择。零边界使互逆 dart 两侧的面值相等；面后继与顶点循环次序把相等性传到同一顶点，再由原图连通性传到所有面。于是核恰为常函数，维数为 $1$。沿面后继重排 dart 求和，说明每个面边界在每个顶点的关联次数为偶数，因此属于已有的实际圈空间。秩—零化度公式给出 $\dim\operatorname{im}B=|F|-1$；连通图圈空间的维数为 $|E|-|V|+1$，整数欧拉等式使两者相等。完整证明由 Lean 内核检查。
:::

接下来，取原图中以 $a$ 为起终点的实际闭游走 $p$。所谓简单圈，是 $p$ 满足形式谓词 $p.\mathrm{IsCycle}$：除闭合处重复起点外不重复顶点，并排除零长游走和沿同一边往返的退化情形。记 $C(p)$ 为其顶点支撑集，$E(p)$ 为其实际无向边集，$\mathcal D(p)$ 为按游走顺序排列的 dart 列表，$p^{\mathrm{rev}}$ 为逆向游走。写 $G[S]$ 表示 $G$ 在顶点集 $S$ 上的诱导子图；其顶点携带属于 $S$ 的条件，$v.\mathrm{val}$ 表示忘去这一条件后的原顶点。称一个偶简单圈为 *nice*，是指原图删去 $C(p)$ 后的实际诱导子图存在完美匹配。

::: {.theorem #thm-ch30-cycle-face-sides title="实际简单圈的两侧、区域欧拉式与匹配限制" lean="D5/S3/Combinatorics/Graph/PlanarMatching/RotationFaces.cycle_face_sides"}
对上述有限 $V$、连通简单图 $G$ 与旋转 $R$，假设 $D\ne\varnothing$ 和整数等式 $|V|-|E|+|F|=2$。对任意 $a\in V$ 和实际简单圈 $p:a\leadsto a$，存在面函数 $x:F\to\mathbb F_2$ 及顶点集 $I,J\subseteq V$，使下列各项同时成立。

1. $F_1=\{f\in F:x(f)=1\}$ 与 $F_0=\{f\in F:x(f)=0\}$ 均非空；它们互为补集，且 $Bx=\mathbf1_{E(p)}$。
2. 存在 $q=p$ 或 $q=p^{\mathrm{rev}}$，使对每个实际 dart $d$，

   $$
   \begin{aligned}
   &x(f(d))=1\ \land\ x(f(\alpha(d)))=0\\
   &\quad\Longleftrightarrow\ d\in\mathcal D(q),\\
   &x(f(d))=0\ \land\ x(f(\alpha(d)))=1\\
   &\quad\Longleftrightarrow\ d\in\mathcal D(q^{\mathrm{rev}}).
   \end{aligned}
   $$

3. 对每个 $v\in V$，$v\notin C(p)$ 当且仅当 $v\in I\cup J$，且 $I\cap J=\varnothing$。对每个 $d.\mathrm{fst}\notin C(p)$ 的实际 dart，

   $$
   \begin{aligned}
   d.\mathrm{fst}\in I&\ \Longleftrightarrow\ x(f(d))=1,\\
   d.\mathrm{fst}\in J&\ \Longleftrightarrow\ x(f(d))=0.
   \end{aligned}
   $$

   任意 $v\in I,w\in J$ 均满足 $\neg G.\mathrm{Adj}(v,w)$。
4. 对每一对 $(S,b)=(I,1)$ 或 $(J,0)$，存在原图的连通子图 $H_S$，其顶点集恰为 $C(p)\cup S$；对每个实际 dart $d$，

   $$
   \begin{aligned}
   &H_S.\mathrm{Adj}(d.\mathrm{fst},d.\mathrm{snd})\\
   &\quad\Longleftrightarrow\ e(d)\in E(p)\\
   &\qquad\lor\bigl(x(f(d))=b\ \land\\
   &\qquad\qquad x(f(\alpha(d)))=b\bigr).
   \end{aligned}
   $$

   记 $E_S$ 为这个子图的实际无向边集，$E_S^\circ=E_S\setminus E(p)$。以下两式均在 $\mathbb Z$ 中成立：

   $$
   \begin{aligned}
   |C(p)\cup S|-|E_S|+|F_b|&=1,\\
   |S|-|E_S^\circ|+|F_b|&=1.
   \end{aligned}
   $$

5. 令 $U=V\setminus C(p)$，$\bar G=G[U]$ 为实际顶点删除补图。对这个同一图 $\bar G$ 的任意完美匹配子图 $M$，以及每个 $S\in\{I,J\}$，令 $S'=\{u\in U:u.\mathrm{val}\in S\}$。存在 $\bar G[S']$ 的完美匹配子图 $N$，对其所有顶点 $v,w$ 满足

   $$
   \begin{aligned}
   &N.\mathrm{Adj}(v,w)\\
   &\quad\Longleftrightarrow\ M.\mathrm{Adj}(v.\mathrm{val},w.\mathrm{val}).
   \end{aligned}
   $$

   此时 $|I|$ 与 $|J|$ 都为偶数。
:::

::: proof
由 [@thm-ch30-face-cycle-exact]，简单圈的边指示函数具有一个面原像 $x$。非零边界排除常值标号，故两类面都出现。圈外顶点的全部相邻面值相同，因而确定 $I,J$；原图边不能跨接不同标号的圈外顶点。区域选边条件保留圈边与两岸都在该侧的边：即使一条弦的两个端点都在圈上，也不能把位于另一侧的弦加入本侧。沿原图路径首次抵达圈，得到每个选边区域的连通性。

把仅支撑在一侧的面函数映入该区域的圈空间，利用连通图圈秩得到两侧的欧拉不等式。两区域顶点、边的并交计数与全局整数欧拉等式迫使两侧同时取等。简单圈的边数等于顶点数，消去圈边与圈点便得到第二种区域欧拉式。每个圈顶点的两条实际圈边在顶点旋转中确定两次标号切换，由此得到 $q$ 与 $q^{\mathrm{rev}}$ 的直接边界等价。最后，无跨边性质保证给定 $M$ 的每条匹配边留在同一侧；把同一个 $M$ 限制到两侧，完美匹配的偶阶性质便推出两侧顶点数为偶数。完整证明由 Lean 内核检查。
:::

两侧面集均非空，但圈外顶点侧可以为空；定理并不要求每侧都有严格内部顶点，也没有假设“内部点数为偶数”。区域是按实际边选择的连通子图，以上结论不把它称为已构造的拓扑圆盘。

::: {.theorem #thm-ch30-face-odd-nice-cycle-orientation title="同一个定向在所有面与所有 nice 偶圈上为奇" lean="D5/S3/Combinatorics/Graph/PlanarMatching/RotationFaces.face_odd_nice_cycle_orientation"}
设 $V$ 为任意有限类型，具有可判定相等性；$G$ 为邻接关系可判定的连通简单图，$R$ 为其顶点旋转。若 $D\ne\varnothing$、$|V|$ 为偶数，且在 $\mathbb Z$ 中 $|V|-|E|+|F|=2$，则存在**同一个**函数 $\varepsilon:D\to\mathbb F_2$，同时满足：

$$
\begin{aligned}
&\forall d\in D,\quad \varepsilon(\alpha(d))=1+\varepsilon(d),\\
&\forall f\in F,\quad \operatorname{opp}_F(\varepsilon,f)=1.
\end{aligned}
$$

此外，对每个 $a\in V$、每个以 $a$ 为起终点的实际偶长简单圈 $p$，以及实际补图 $G[V\setminus C(p)]$ 的每个完美匹配子图 $M$，均有

$$
\sum_{d\in\mathcal D(p)}\varepsilon(d)=1\quad\text{于 }\mathbb F_2.
$$

这里的和按 dart 列表计数。存在量词 $\exists\varepsilon$ 位于所有圈与所有补图匹配的全称量词之前。
:::

::: proof
先任取一个边定向，记录每个面的奇偶缺陷。面边界映射的核仅由常函数组成，所以其转置所能修正的缺陷恰好满足总和为零。全局整数欧拉式与 $|V|$ 为偶数保证这个相容条件。给每条边的两个 dart 加上同一个二元修正，既保持反向关系，又使全部面轨道的反向计数为 $1$。

对任意给定的 nice 偶圈，使用 [@thm-ch30-cycle-face-sides] 的实际一侧。把该侧所有面的反向计数相加，每条非圈的所选边贡献 $1$；直接边界等价把剩余项识别为沿 $q$ 的 dart 和。区域欧拉式于是给出

$$
\sum_{d\in\mathcal D(q)}\varepsilon(d)
  =|F_1|+|E_I^\circ|=1+|I|\quad\text{于 }\mathbb F_2.
$$

给定补图匹配的实际限制使 $|I|$ 为偶数，所以右侧为 $1$。若 $q=p^{\mathrm{rev}}$，反向关系使两次遍历的和相差圈长在 $\mathbb F_2$ 中的值；偶长条件使此差为零。因此最初选出的同一个定向适用于所有这些圈与匹配。完整证明由 Lean 内核检查。
:::

::: {.figure src="ch30-face-odd-orientation"}
**同一个定向：每个面、每条 nice 偶圈上都是奇数。** $4 \times 4$ 的格点图按平面旋转有九个方格面和外面一个面，每条边一支箭头；方格里的数是沿这个面走一圈、与箭头相反的 dart 个数，全是奇数，外面的面是 $3$。琥珀色的偶圈有十条边，圈内一侧的六个方格淡青，圈内的两个青色顶点是 $I$，圈外最下面一行的四个品红顶点是 $J$，删去圈后两侧都有完美匹配；沿琥珀色的圈，与箭头相反的 dart 有 $5$ 个（[@thm-ch30-face-odd-nice-cycle-orientation]、[@thm-ch30-cycle-face-sides]）。图上的定向是一个实例，由脚本解出，并对这张图的每一条 nice 偶圈逐一核对。
:::

::: {.remark #rem-ch30-rotation-pfaffian-boundary title="有限旋转前提与完整平面匹配结论的边界"}
**既有结果的应用与文献结果的边界。** 上面三个定理仍只处理已给定实际顶点旋转、dart 非空、连通及整数欧拉式的有限组合情形。下面把两种匹配的实际交错、原始 Pfaffian 的符号约定和同一张图上的系数传递逐一接起来；这些解释不另立复合定理盒。

**从两种匹配到有根偶圈。** 设 $X$ 是任意有限线性有序类型，$\mathcal M(X)$ 是原生载体 [`FixedPointFreeInvolution`](lean:D5/S3/Zeros/Convolution/PerfectMatchingCount.FixedPointFreeInvolution)：其元素是满足 $s(s(x))=x$ 且 $s(x)\ne x$ 的置换。对有序输入 $(s,t)$，以两色边 $x\!\leftrightarrow\!s(x)$、$x\!\leftrightarrow\!t(x)$ 的自反传递闭包定义实际连通分量。每个分量各取自己的最小点 $m$，令 $r=t\,s$（先作用 $s$），以 $r$ 的完整整数幂轨道作为第一相位。两种匹配都交换该分量中两个互不相交的 $r$ 轨道；相位由分量最小点决定，与数值标签的奇偶无关。交错置换 $q$ 在第一相位沿 $s$，在另一相位沿 $t$；其前驱反过来选择。于是从每个这样的 $m$ 出发，对所有 $k\in\mathbb N$，

$$
\begin{aligned}
q^{2k}(m)&=(ts)^k(m),\\
q^{2k+1}(m)&=s((ts)^k(m)).
\end{aligned}
$$

[`rooted_interlacing`](lean:D5/S3/Combinatorics/PerfectMatchings/InvolutionEvenCycles.rooted_interlacing) 同时给出这些公式、$q$ 的完整圈恰等于原两色分量、最小点性质，以及恢复两个原始匹配的等式。交错覆盖整个分量；每步翻转相位，所以每圈长度为偶数。其输出载体明确要求 **$\forall x,\ q(x)\ne x$，并且 $q.\mathrm{cycleFactorsFinset}$ 的每个成员的支撑基数为偶数**。后一有限集不列出单点圈，不能省去前一条件。

反向从这样的 $q$ 出发，取每个完整 $q$ 圈的最小点 $m$，以 $q^2$ 的完整轨道定义偶相位；在偶相位令 $s(x)=q(x)$、$t(x)=q^{-1}(x)$，在另一相位交换这两个选择。偶圈长度保证后继和前驱都翻转相位，包括末点回到首点的边，所以恢复出的 $s,t$ 都是无不动点对合。[`rooted_reconstruction`](lean:D5/S3/Combinatorics/PerfectMatchings/InvolutionEvenCycles.rooted_reconstruction) 给出点态公式与 $\mathrm{forward}(\mathrm{recover}(q))=q$；另一个复合恢复原来的有序对。实际的 [`equivalence`](lean:D5/S3/Combinatorics/PerfectMatchings/InvolutionEvenCycles.equivalence) 是这两张互逆映射构成的 `Equiv` 定义，不是另一条定理或仅凭基数选出的双射。不要求 $X$ 非空或预先为偶数阶：空类型上是唯一空置换，奇数阶时两边载体皆空；共同匹配边给出真正的二循环，$s=t$ 时 $q=s$，二循环反向恢复的两种匹配相同；不连通分量各自扎根。Eğecioğlu（1990，*Ars Combinatoria* **29**, 107–116）的入边标色约定不在这里冒称为同一个相位约定。这一结构对应不证明加权符号恒等式或行列式平方；源审计 `29209` 仍为 2 项未决、0 项验证。

**保留原始归一化 Pfaffian。** 取 $n\in\mathbb N$ 与任意交换环 $R$。[`P`](lean:D5/S0/Certificates/Combinatorics/NormalizedPfaffian.P) 的配对是 $\mathrm{Fin}(2n)$ 上无不动点的对合函数。对每个配对，把较小端点递增排列，再紧接其伙伴，得到规范列举 $c(p)$；[`canonical_mate`](lean:D5/S0/Certificates/Combinatorics/NormalizedPfaffian.canonical_mate) 确认相邻槽位确为伙伴。[`listingEquiv`](lean:D5/S0/Certificates/Combinatorics/NormalizedPfaffian.listingEquiv) 把所有归一化列举与这些配对互逆地对应：列举共轭相邻槽位配对得到 $p$，再规范列举返回原列举。原定义 [`pfaffian`](lean:D5/S0/Certificates/Combinatorics/NormalizedPfaffian.pfaffian) 始终是

$$
\operatorname{Pf}(A)=\sum_{\sigma\in L(n)}
\operatorname{sgn}(\sigma)\prod_{i\in\mathrm{Fin}(n)}
A_{\sigma(2i),\sigma(2i+1)},
$$

其中 $L(n)$ 要求每对内部递增、各对首端点递增，整数符号再映入 $R$；没有阶乘或 $2$ 的除法。空列举的空积为 $1$。符号是**列举置换**的符号，不是伙伴对合置换的符号。后者与原生 $\mathcal M(\mathrm{Fin}(2n))$ 的对应，是用对合函数的双射性构成置换，再忘掉置换结构；两个复合逐点保留同一个伙伴函数。

对归一化 $\sigma$，令 $p=\mathrm{pairingOfListing}(\sigma)$。逆序对是位置 $u<v$ 且 $\sigma(v)<\sigma(u)$；交叉对以较小端点 $a<c<p(a)<p(c)$ 计一次，嵌套对以 $a<c<p(c)<p(a)$ 计一次。实际的 [`inversionCrossNestEquiv`](lean:D5/S0/Certificates/Combinatorics/NormalizedPfaffian.inversionCrossNestEquiv) 把逆序对对应到一个交叉，或一个嵌套加 $\mathrm{Fin}(2)$ 中的方向位：两个不同配对槽中，交叉贡献“后一端—前一端”一个逆序，嵌套再贡献“后一端—后一端”一个逆序。[`inversion_card_eq_cross_add_two_nesting_card`](lean:D5/S0/Certificates/Combinatorics/NormalizedPfaffian.inversion_card_eq_cross_add_two_nesting_card) 因而给出

$$
|\mathrm{Inv}(\sigma)|=|\mathrm{Cross}(p)|+2|\mathrm{Nest}(p)|.
$$

故列举符号等于 $(-1)^{|\mathrm{Cross}(p)|}$。[`pfaffian_eq_crossing_sum`](lean:D5/S0/Certificates/Combinatorics/NormalizedPfaffian.pfaffian_eq_crossing_sum) 将原始和逐项改写为以此符号乘 $\prod_{a<p(a)}A_{a,p(a)}$ 的和，每条配对边恰算一次。该结论对任意矩阵、任意交换环成立，不要求反对称性、除法或消去律；嵌套的两次贡献连同空情形均在对应内。对非规范列举，[`listing_value_canonical`](lean:D5/S0/Certificates/Combinatorics/NormalizedPfaffian.listing_value_canonical) 在反向变号的整数单位因子下保证相同有符号值：整对换位的符号是平方 $1$，单对翻转的置换负号与边因子负号相消。

**同一张实际图上的符号传递。** 现在令 $V$ 有限、$G$ 为其上的简单图，给定枚举 $e:V\simeq\mathrm{Fin}(2n)$。实际完美匹配始终是 Mathlib 的 $G.\mathrm{Subgraph}$，每点恰有一个邻点。[`matchingEquiv`](lean:D5/S3/Combinatorics/PerfectMatchings/AlternatingCyclePfaffian.matchingEquiv) 在完全图上选择唯一邻点得到伙伴函数，反向用 $p(v)=w$ 定义邻接；再经 $e$ 搬运，并仅保留伙伴边全为实际 $G$ 边的配对，便恰好得到 $G$ 的实际完美匹配，没有另造匹配或 Pfaffian 核心。

令 dart 位 $\varepsilon:G.\mathrm{Dart}\to\mathbb Z/2\mathbb Z$ 满足 [`Reverses`](lean:D5/S3/Combinatorics/PerfectMatchings/AlternatingCyclePfaffian.Reverses)，即 $\varepsilon(\bar d)=1+\varepsilon(d)$；整数单位 $\delta(d)=(-1)^{\varepsilon(d)}$ 因而满足 $\delta(\bar d)=-\delta(d)$。匹配系数 $\tau_e(M)$ 是其规范列举的符号乘列出的实际有向匹配边的 $\delta$ 之积。对任意实际简单闭行走 $p$，记 $C=p.\mathrm{toSubgraph}$；若它对 $M$ 交替，即圈上每点的两条不同圈边恰有一条在 $M$ 中，[`alternating_cycle_flip`](lean:D5/S3/Combinatorics/PerfectMatchings/AlternatingCyclePfaffian.alternating_cycle_flip) 给出偶长度、仍为实际完美匹配的 $N=M\mathbin{\triangle}C$，以及**同一张 $G$ 删除 $C$ 顶点后的诱导图**上的完美匹配。原因是圈内每点已有圈内伙伴，唯一性禁止匹配边横跨圈内外；限制同一个 $M$ 就给出补图匹配。此翻转结论本身不需要有限性、嵌入、定向或权重。

在上述枚举与反向条件下，[`alternating_cycle_transport`](lean:D5/S3/Combinatorics/PerfectMatchings/AlternatingCyclePfaffian.alternating_cycle_transport) 对这个实际翻转证明

$$
\tau_e(M)\tau_e(N)=-\prod_{d\in p.\mathrm{darts}}\delta(d).
$$

沿圈转动一次并固定圈外顶点的置换具有偶数个支撑点，所以符号为 $-1$。它把圈内匹配送到互补圈边，圈外共同匹配保持原样；即使标签交错也如此。列举归一化把这一新列举的值识别为 $\tau_e(N)$。圈上反向列出的边同时带来两个相消负号，圈外相同单位平方为 $1$，余下恰为实际 dart 乘积。

[`NiceOdd`](lean:D5/S3/Combinatorics/PerfectMatchings/AlternatingCyclePfaffian.NiceOdd) 要求：对**每条实际偶简单闭行走**，若其实际顶点删除诱导补图有完美匹配，则 $\sum_{d\in p.\mathrm{darts}}\varepsilon(d)=1$。两匹配的对称差各点度为 $0$ 或 $2$；不同时可取其中一条实际交替简单圈，上段的补图匹配使它满足此假设，dart 乘积为 $-1$，翻转保持系数且严格减少分歧边。有限归纳给出 [`niceOdd_matching_tau_eq`](lean:D5/S3/Combinatorics/PerfectMatchings/AlternatingCyclePfaffian.niceOdd_matching_tau_eq)：任意实际匹配的系数相同，允许共同边、不连通图及 $M=N$。

**一个单位，所有权重与系数环。** 给每条实际无向边权重 $w:G.\mathrm{edgeSet}\to R$，令 $A_{e,\varepsilon,w}$ 在实际边上为 $\delta(x,y)w_{\{x,y\}}$ 映入 $R$，非边及对角元为 $0$。反向条件使之反对称，特征 $2$ 时对角元仍明确为零。$Z(w)$ 是对实际完美匹配求和、对每条实际无向匹配边只乘一次的配分函数。不受实际图支持的配对有零矩阵因子；受支持的配对与实际匹配互逆，规范槽位与匹配边双射。因此原始 Pfaffian 等于 $\sum_M\tau_e(M)\prod_{a\in M}w_a$。[`weighted_pfaffian_identity`](lean:D5/S3/Combinatorics/PerfectMatchings/AlternatingCyclePfaffian.weighted_pfaffian_identity) 在 `Reverses` 与 `NiceOdd` 下将共同系数提出：

$$
\operatorname{Pf}(A_{e,\varepsilon,w})=(u_{e,\varepsilon}:R)\,Z(w),
\qquad u_{e,\varepsilon}\in\mathbb Z^\times.
$$

[`orientationUnit`](lean:D5/S3/Combinatorics/PerfectMatchings/AlternatingCyclePfaffian.orientationUnit) 在有匹配时取任一实际匹配的整数单位系数，无匹配时取 $1$；它只依赖图、枚举与定向，独立于 $R,w$。故公式包括负权、零权、零因子环和特征 $2$，不使用除法。顶点集为空（$n=0$）时，唯一空匹配使两边为 $1$；顶点集非空的无边图没有完美匹配，属于所有配对项为零且 $Z=0$ 的无完美匹配情形。若进一步 $R=\mathbb R$ 且每个实际边权非负，则 $Z\ge0$、$|u|=1$，取绝对值得 $|\operatorname{Pf}(A)|=Z$；这是上述恒等式的应用，不另有一个绝对值端点定理。

上面的有限旋转定向与此恒等式只有在**同一张实际图**上才能合用：保留原来的连通、dart 非空和整数欧拉假设，将原来的反向 dart 条件识别为 `Reverses`，并将每条偶简单圈的实际顶点删除补图匹配送入原 nice 圈条件，才能取得这里的 `NiceOdd`。从任意几何平面嵌入取得该旋转及完整面轨道的对应、超出旋转前提的图、完整凯莱行列式平方恒等式 `FullCayley`、$\sqrt{\det A}$ 表述、有理输入的精确算法和位复杂度及一般二分计数的 `#P`-完全性仍须分别处理，后者保留为 [@rem-ch30-karmarkar-kasteleyn-literature] 的文献结果。源审计 `29266` 保留 10 项验证、9 项未决；条件符号恒等式不消去这些残余义务。
:::

::: {.figure src="ch30-alternating-flip"}
**翻一条交替圈：两组匹配的系数只差圈上的 dart 符号。** 左栏同一个 $2 \times 3$ 格点图上有两组完美匹配：青色的 $M$ 是三条竖边，品红的 $N$ 是横边 $01$、$34$ 与共同的竖边 $25$；两组不同的边恰好围成琥珀色的交替圈 $0 \to 1 \to 4 \to 3$，翻转它就把 $M$ 变成 $N$。右栏每条边一支箭头，沿这个圈走，顺箭头的 dart 记 $\delta = +1$，逆箭头记 $-1$，四个 $\delta$ 之积是 $-1$；按 [`alternating_cycle_transport`](lean:D5/S3/Combinatorics/PerfectMatchings/AlternatingCyclePfaffian.alternating_cycle_transport)，$\tau(M)\tau(N) = -\prod\delta = +1$，两组匹配的系数相同。箭头取的是使三个面都为奇的定向（[@thm-ch30-face-odd-nice-cycle-orientation]），具体的图与系数是脚本算出的实例。
:::

[@rem-ch30-karmarkar-kasteleyn-literature] 中的算法与几何推广仍有文献边界；上述条件匹配恒等式则已有精确供应声明。另一个“场”与“线”两边都能写成精确数学的离散问题，是给图的顶点着色。

先看一个奇圈，五边形 $C_5$：顶点 $0, 1, 2, 3, 4$，边 $01, 12, 23, 34, 40$。依次涂上颜色 $c = (0, 1, 0, 1, 2)$，相邻顶点颜色都不同。把颜色读作高度，这是顶点上一片分三层的场。现在让每条边指向颜色较大的一端：

$$
0 \to 1, \qquad 2 \to 1, \qquad 2 \to 3, \qquad 3 \to 4, \qquad 0 \to 4 .
$$

相邻顶点颜色不同，所以每条边都分到了方向。顺着箭头走，颜色每一步都严格升高，一根线在每一层至多停一次：三种颜色，线上至多三个顶点。这里最长的线是 $2 \to 3 \to 4$，恰好三个。**场给每一根线定下了长度的上限。**

反过来，只给箭头，能不能把场找回来？令 $h(v)$ 为从 $v$ 出发、顺着箭头能走的最长的线有几条边：

$$
h = \bigl(h(0), h(1), h(2), h(3), h(4)\bigr) = (1, 0, 2, 1, 0) .
$$

::: {.figure src="ch30-color-orientation"}
**场定下线，线又量出场。** 同一个五边形 $C_5$，顶点按高度摆在三条横线上。左栏的高度是颜色 $c = (0, 1, 0, 1, 2)$，每个箭头都朝上，最长的线是青色的 $2 \to 3 \to 4$，三个顶点；右栏是同样的箭头，顶点改按 $h = (1, 0, 2, 1, 0)$ 摆放，每个箭头都朝下，$h$ 又是一个三层的着色（[@thm-ch30-gallai-roy]）。
:::

对每个箭头 $u \to v$，在从 $v$ 出发的最长线前面接上这一步，就得到从 $u$ 出发的一根更长的线，所以 $h(u) > h(v)$。$h$ 沿每个箭头下降，相邻顶点的 $h$ 必不相同：它又是一个三色着色（与 $c$ 不同：箭头指向 $c$ 的高处，却指向 $h$ 的低处）。**线量出了场。** 这一步只在一处会出事：箭头若首尾相接成圈，“从 $v$ 出发的最长的线”就要绕圈。图论中把这对来回称为 Gallai–Hasse–Roy–Vitaver 定理（[@rem-ch30-coloring-complexity-literature]）。模块 `D5/S3/Combinatorics/Graph/Walks/GallaiRoy` 冻结了它的一个版本，先定义定向与有向路：

::: {.definition #def-ch30-orientation-directed-path title="图的定向与有向路" lean="D5/S3/Combinatorics/Graph/Walks/GallaiRoy.IsOrientation D5/S3/Combinatorics/Graph/Walks/GallaiRoy.IsDirectedPath"}
设 $V$ 为一个类型，$G$ 为 $V$ 上的简单图（Mathlib 的 `SimpleGraph V`：邻接关系对称且无自环），$o$ 为 $V$ 上的二元关系。$o(u, v)$ 成立时称有一条从 $u$ 到 $v$ 的**弧**，记作 $u \to v$。

1. $o$ 是 $G$ 的**定向**（`IsOrientation G o`），指以下两条同时成立：对 $G$ 中任意相邻的 $u, v$，$o(u, v)$ 与 $o(v, u)$ 至少有一个成立（可以两个都成立）；对任意 $u, v$，$o(u, v)$ 蕴含 $u$ 与 $v$ 在 $G$ 中相邻。
2. 设 $m \in \mathbb{N}$。映射 $f : \{0, 1, \dots, m-1\} \to V$（Lean 中为 `Fin m → V`）是 $o$ 的一条**含 $m$ 个顶点的有向路**（`IsDirectedPath o f`），指 $f$ 是单射，且对每个满足 $i + 1 < m$ 的自然数 $i$ 有 $o\bigl(f(i), f(i+1)\bigr)$。
:::

这里的定向比教科书宽：一条边可以同时带两个方向的弧。有向路则要求顶点互不相同，所以沿有向圈一圈圈地绕，不会得到越来越长的路；$m$ 数的是顶点，不是边。

::: {.theorem #thm-ch30-gallai-roy title="Gallai–Hasse–Roy–Vitaver 定理：可 $k$ 着色当且仅当存在有向路都不超过 $k$ 个顶点的定向" lean="D5/S3/Combinatorics/Graph/Walks/GallaiRoy.colorable_iff_exists_orientation"}
设 $V$ 为有限类型，$G$ 为 $V$ 上的简单图，$k \in \mathbb{N}$。以下两条等价：

1. $G$ 可 $k$ 着色（Mathlib 的 `G.Colorable k`）：存在映射 $c : V \to \{0, 1, \dots, k-1\}$，使得对 $G$ 中任意相邻的 $u, v$ 有 $c(u) \neq c(v)$；
2. 存在 $G$ 的定向 $o$（[@def-ch30-orientation-directed-path]），使得对每个 $m \in \mathbb{N}$ 与 $o$ 的每条含 $m$ 个顶点的有向路，都有 $m \le k$。
:::

::: proof
**由着色得定向。** 取着色 $c$，令 $o(u, v)$ 当且仅当 $u, v$ 相邻且 $c(u) < c(v)$，即每条边指向颜色较大的一端。相邻顶点颜色不同，所以每条边恰好分到一个方向，而每条弧都是边。沿一条含 $m \ge 1$ 个顶点的有向路 $f$，颜色逐步严格上升，于是 $i \mapsto c(f(i))$ 是从 $\{0, \dots, m-1\}$ 到 $\{0, \dots, k-1\}$ 的严格单调映射，因而是单射，故 $m \le k$；$m = 0$ 时无需证明。

**由定向得着色。** 给定定向 $o$，它的有向路都至多 $k$ 个顶点。$o$ 可能含有向圈与双向弧，所以先删弧：在包含于 $o$、且沿其弧走一步或多步永远回不到出发点的关系 $D$ 中，取一个按包含关系极大的。$V$ 有限，$V$ 上的二元关系只有有限多个，空关系属于这一族，所以极大元存在；Lean 只证明它存在，并不构造它。沿 $D$ 的链 $v_0 \to v_1 \to \dots \to v_\ell$ 不会重复顶点（重复就构成一个圈），所以它是 $o$ 的含 $\ell + 1$ 个顶点的有向路，$\ell + 1 \le k$。令 $h(v)$ 为从 $v$ 出发的 $D$-链的最大边数（Lean 用 `Nat.findGreatest` 在 $0, \dots, k$ 中取），则 $h(v) \le k - 1$。若沿 $D$ 能从 $a$ 走一步或多步到 $b$，把这一段接在从 $b$ 出发的最长链之前，得到从 $a$ 出发的更长的链，故 $h(a) > h(b)$。关键一步：设 $o(u, v)$ 且 $u \neq v$。若 $D(u, v)$，则 $h(u) > h(v)$。若否，看把弧 $u \to v$ 加进 $D$ 所得的关系：它包含于 $o$，且严格大于 $D$；它若无圈，便与 $D$ 的极大性矛盾，所以它有圈，而这个圈必须用到新弧，于是沿 $D$ 已能从 $v$ 走到 $u$（$u \neq v$，至少一步），故 $h(v) > h(u)$。两种情形都有 $h(u) \neq h(v)$。$G$ 的每条边至少带一个方向的弧，简单图中相邻的顶点互不相同，所以 $v \mapsto h(v)$ 是只用颜色 $0, \dots, k-1$ 的着色。完整证明由 Lean 内核检查。
:::

这条等价有三种读法。

第一，双向弧不改变结论（手工推导）。从一个定向中，每条带两个方向的边删去其中一个方向，得到每条边恰有一个方向的定向；它的有向路都是原定向的有向路，界 $k$ 照样成立。所以定理的第 2 条也可以只在每条边恰有一个方向的定向中寻找。

第二，把 $k$ 从小往大试（手工推导）。$V$ 有限时，给每个顶点各用一种颜色，$G$ 可 $\lvert V\rvert$ 着色，所以有最小的 $k$ 使 $G$ 可 $k$ 着色，即色数 $\chi(G)$。有向路的顶点互不相同，所以每个定向 $o$ 的有向路至多 $\lvert V\rvert$ 个顶点，最长的那条的顶点数 $L(o)$ 存在。定理的第 2 条成立当且仅当 $\min_o L(o) \le k$，而 [@thm-ch30-gallai-roy] 对每个 $k$ 成立，所以使第 1 条成立的 $k$ 与使第 2 条成立的 $k$ 是同一批，最小的一个也相同：

$$
\chi(G) = \min_{o}\, L(o),
$$

最小值取遍 $G$ 的全部定向。图论文献通常这样写这条定理。

第三，放回本章的类比（`MODEL`）：着色是顶点上分层的场，有向路是顺着方向走的线。至多 $k$ 层的场存在，当且仅当能给边分配方向，使每根线至多 $k$ 个顶点；从定向造出的那片场 $h$，在每个顶点上的读数是“从这里出发，沿删弧后剩下的弧最多能走几步”。但定理两边都是“存在某个对象”，它把一种见证换成另一种见证，不提供找到任何一种的办法，也不说哪一种好找。给定一个着色，逐边比较两端颜色即可验真；要多快才能找到一个着色，是另一个问题，见 [@rem-ch30-coloring-complexity-literature]。

::: {.example #ex-ch30-gallai-roy-orientation-census title="五边形、$K_4$ 与彼得森图：逐一枚举定向，数最长有向路"}
下表的数都由逐一枚举得到：对每条边选定方向，用深度优先搜索求最长有向路的顶点数（有向路按 [@def-ch30-orientation-directed-path] 要求顶点互不相同）。彼得森图取外圈五边形 $0, \dots, 4$、内圈五角星 $5, \dots, 9$（$5 + i$ 与 $5 + ((i + 2) \bmod 5)$ 相邻）和五根辐条（$i$ 与 $i + 5$ 相邻）。

| 图 | 顶点 / 边 | 色数 | 每条边一个方向的定向数 | 最长有向路的顶点数：定向个数 |
| :---: | :---: | :---: | :---: | :---: |
| 五边形 $C_5$ | $5$ / $5$ | $3$ | $32$ | $3$：$10$，$4$：$10$，$5$：$12$ |
| 完全图 $K_4$ | $4$ / $6$ | $4$ | $64$ | $4$：$64$ |
| 彼得森图 | $10$ / $15$ | $3$ | $32768$ | 最小值 $3$，出现 $80$ 次 |

允许双向弧时，$C_5$ 有 $3^5 = 243$ 个定向，最长有向路的顶点数最小仍是 $3$（出现 $20$ 次）；$K_4$ 有 $3^6 = 729$ 个定向，每个都含 $4$ 个顶点的有向路。对 $C_5$ 与 $K_4$，程序还对 $k = 0, 1, \dots, \lvert V\rvert$ 逐一核对了 [@thm-ch30-gallai-roy] 的两边（着色一侧枚举全部映射 $c$）。三张图的最小值都等于色数，与上面的 $\chi(G) = \min_o L(o)$ 一致。

$C_5$ 中最长有向路含 $5$ 个顶点的 $12$ 个定向里，有 $2$ 个是有向圈（两个绕行方向各一）。对有向圈 $0 \to 1 \to 2 \to 3 \to 4 \to 0$，证明中的极大无圈子关系 $D$ 恰好删去圈上的一条弧（有 $5$ 种删法，Lean 不指定哪一种）；删去 $4 \to 0$ 时 $h = (4, 3, 2, 1, 0)$，是一个五色着色，与定理在 $k = 5$ 时的结论相符。

两行可以手算。$C_5$ 与 $k = 2$：设每条边恰有一个方向，且所有有向路都至多 $2$ 个顶点。若某个顶点既有进入的弧又有出去的弧，这两条弧在两条不同的边上，它的两个邻居经过它连成一条 $3$ 个顶点的有向路；所以每个顶点要么只出不进，要么只进不出。每条弧从前一类指向后一类，绕五边形一圈两类必须交替，而 $5$ 是奇数，矛盾。由第一种读法，允许双向弧也一样，这正是“五边形不能 $2$ 着色”经定理翻译后的样子。$K_4$：四个顶点两两相邻，三种颜色必有两个顶点同色，所以 $K_4$ 不可 $3$ 着色；由定理，$K_4$ 的每个定向都有一条至少 $4$ 个、因而恰好穿过全部 $4$ 个顶点的有向路，表中 $64$ 个定向都是如此。把 $K_4$ 换成 $n$ 个顶点的完全图 $K_n$，同样的手工推导给出：$K_n$ 的每个定向都有一条穿过全部顶点的有向路。
:::

::: {.remark #rem-ch30-coloring-complexity-literature title="着色问题的计算复杂性与定理的来历（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** [@thm-ch30-gallai-roy] 是两个存在性命题之间的等价，不涉及计算复杂性。关于着色有多难找，以下是外部文献的结论：

1. 判定一个有限图能否 $2$ 着色可在线性时间内完成：在每个连通分支上做广度优先搜索，按层的奇偶交替涂色，出现同色的相邻顶点当且仅当图含奇圈（图可 $2$ 着色当且仅当不含奇圈，D. Kőnig, 1936）。
2. 给定图 $G$ 与正整数 $k$，判定 $G$ 能否 $k$ 着色是 $\mathrm{NP}$-完全问题（R. M. Karp, *Reducibility among combinatorial problems*, 1972）；固定 $k = 3$ 仍是 $\mathrm{NP}$-完全，即使只考虑最大度不超过 $4$ 的平面图（M. R. Garey, D. S. Johnson & L. Stockmeyer, *Theor. Comput. Sci.* **1**, 237–267, 1976）。因此 $3$ 着色问题有多项式时间算法，当且仅当 $\mathrm{P} = \mathrm{NP}$；而 $\mathrm{P} \neq \mathrm{NP}$ 仍是开放猜想（[@conj-p-neq-np]）。
3. 着色与定向的这条等价由 T. Gallai、M. Hasse、B. Roy 与 L. M. Vitaver 在 1960 年代各自独立发表；它在完全图上的特例，即每个竞赛图都有穿过全部顶点的有向路，更早由 L. Rédei（1934）证明。
:::

## 30.2.3 毛球旋度（$\nabla \wedge \mathbf{F}$）几何类比与 $P \neq NP$：为什么一根线撑不起一片场？ {#3-毛球旋度f几何类比与-pnp为什么一根线撑不起一片场}

既然造出全局导向场就能化盲搜为顺流，为什么在 3-SAT 等问题中难以构造这样一片多项式可计算的全局导向场？用连续微分几何作类比模型（`MODEL`，旨在提供几何直觉而非复杂度猜想 [@conj-p-neq-np] 的直接形式证明）：

- 一片能够从任意初态无阻挫滑向全局终点的保守梯度场 $\mathbf{F} = -\nabla V$，在连续极限下满足外微分零旋度条件：

  $$
  \nabla \wedge \mathbf{F} = 0;
  $$

- 作者以三元约束 $\mathbf{e}_i\wedge\mathbf{e}_j\wedge\mathbf{e}_k$ 比喻环路阻挫；子句宽度本身并不定义连续配置流形、向量场或它的旋度；
- **线能穿缝，场必撕裂**：这是作者对见证与导引结构的几何格言。毛球定理保证特定球面切向场有零点，并不保证指数多个零点或搜寻陷阱；无旋条件也不保证优化容易。这些连续几何事实不能直接推出 3-SAT 的算法下界。

| 维度与视角 | 核心格言 | 线（$NP$）与场（$P$）的几何关系（`MODEL`） | 复杂度与形式证明意义 |
| :--- | :--- | :--- | :--- |
| **全局静态时间场**<br/>（球外全息底片） | **众线并存即是场**<br/>（作者格言；资源模型参照 [@rem-ch30-postselection-ctc-literature]） | 满足子空间可为零，也可包含多个赋值见证；静态并存不自动选出或制备见证 | 描述满足关系不计求解成本；额外资源须单独声明 |
| **场内有限观察者**<br/>（球内局部寻址） | **有线未必有场**<br/>（作者格言；标准猜想 [@conj-p-neq-np] 为 `OPEN`） | 见证检查与高效搜寻是不同任务，且 $P\subseteq NP$；零横截面与旋度只是类比 | **“求场难如登天，顺线一步看穿”**：检查成本取决于编码和验证器；形式证明核验另有其成本 |

这八个字为全书的复杂度与证明哲学画上了最凝练的句号：**“求场难如登天，顺线一步看穿。”**

::: {.viz src="timeless-causal-crystal" height="640"}
**交互实验室 `ORTHO//CAUSAL`**：同一颗球上的四个场景。窗口：两条余弦锁住第三条的范围，$\det G$ 是三根向量撑开的体积的平方；书页：有限时钟上所有页同时存在，条件化才取出一页；场：梯度流处处有坡度，降下的势能等于走过的耗散；线：振幅放大每步只转 $2\theta$，约 $(\pi/4)\sqrt{N}$ 步到达。把它们读作“选择”“书页”“场”与“线”是本书的诠释（`MODEL`）；$\mathrm{P} \neq \mathrm{NP}$ 仍是开放问题，本页的任何画面都不推出它的答案。
:::

---

