# E.8.1.7 $\mathrm{SU}(2)$ 弦图增益的重构界 {#sec-appe-chordal-su2-sharp-bounds}

把有向棱上的增益看作单位四元数，沿两条棱输运时必须按顺序相乘。若每个有序三角形的两棱输运与直接输运相差至多 $\delta$，能否给所有顶点选定局部标架，使每条棱上的重构误差都受同一个常数控制？任意有限连通弦图都可取系数 $\frac{434}{125}=3.472<\frac72<4$，改进了 [@thm-appe-chordal-uniform-gain-potential] 的通用群值上界。小缺陷和小团数还允许利用球面上的局部几何，给出更紧的界。

以下以 $U$ 记实四元数代数 $\mathbb H$ 中的单位四元数群，即 $\{q\in\mathbb H:\|q\|=1\}$，并将其视作 $\mathrm{SU}(2)$。其距离是单位球面上的圆度量 $d(q,r)=\arccos(\operatorname{Re}(q\bar r))$，值域为 $[0,\pi]$。左右乘单位四元数均保持此距离。

## E.8.1.7.1 增益、三角缺陷与势

::: {.definition #def-appe-chordal-su2-skew title="反对称增益" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalSU2SharpBounds.SimpleGraph.SU2Skew"}
设 $V$ 为任意类型，$G$ 为 $V$ 上的简单图，$g:V\times V\to U$。称 $g$ 在 $G$ 上反对称，若对任意相邻的有序点对 $(u,v)$，都有 $g(v,u)=g(u,v)^{-1}$。
:::

::: {.definition #def-appe-chordal-su2-triangle-bound title="三角缺陷界" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalSU2SharpBounds.SimpleGraph.SU2TriangleBound"}
设 $V$ 为任意类型，$G$ 为 $V$ 上的简单图，$g:V\times V\to U$，$\delta\in\mathbb R$。称 $g$ 在 $G$ 上的三角缺陷至多为 $\delta$，若对任意 $u,v,w\in V$，只要 $uv,vw,uw$ 都是棱，就有 $d(g(u,v)g(v,w),g(u,w))\le\delta$。
:::

::: {.definition #def-appe-chordal-su2-fits title="势的拟合误差界" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalSU2SharpBounds.SimpleGraph.SU2Fits"}
设 $V$ 为任意类型，$G$ 为 $V$ 上的简单图，$g:V\times V\to U$，$p:V\to U$，$r\in\mathbb R$。称 $p$ 在 $G$ 上以误差至多 $r$ 拟合 $g$，若对任意相邻的有序点对 $(u,v)$，都有 $d(g(u,v),p(u)^{-1}p(v))\le r$。
:::

## E.8.1.7.2 任意团数的重构

::: {.theorem #thm-appe-chordal-su2-global title="有限连通弦图上的统一重构界" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalSU2SharpBounds.SimpleGraph.IsChordal.exists_su2_gain_potential_global_sharp"}
设 $V$ 为有限类型，$G$ 为 $V$ 上的连通简单弦图，$g:V\times V\to U$ 在 $G$ 上反对称。设 $\delta\in\mathbb R$ 且 $\delta\ge0$，并假设 $g$ 在 $G$ 上的三角缺陷至多为 $\delta$。则存在势 $p:V\to U$，在 $G$ 上以误差至多 $\frac{434}{125}\delta$ 拟合 $g$。
:::

::: {.proof #pf-appe-chordal-su2-global}
**从影团到球冠。** 以根顶点到各点的距离分层。取某层及其以上的一个连通分支，其在前一层的邻点称为它的影集，弦性保证影集成团。首层以根为锚，更高层的每个影团在再往前一层有一个共同相邻的锚点。对同一分支中的新顶点 $x$，从锚点 $a$ 经各个前驱 $i$ 得到候选值 $q_i=g(a,i)g(i,x)$，重合时用单位增益。以锚点为基准的前驱间增益为 $h_{ij}=g(a,i)g(i,j)g(a,j)^{-1}$。三角条件分别控制 $h_{ij}$、$q_i^{-1}h_{ij}q_j$ 和 $h_{ij}h_{jk}h_{ki}$ 到单位元的距离。

**从环量到半径。** 以凸组合权重 $w_i$ 构成四元数 Hermitian 矩阵 $M_{ij}=\sqrt{w_iw_j}\,h_{ij}$。将其视作实内积空间上的自伴算子，用特征值的一、二、三阶矩控制 Rayleigh 商，其中三阶矩由三角环量的实部控制。当 $0\le\delta<\arccos(9/16)$ 时，若原点在候选值的凸包内，Carathéodory 定理可将见证缩到至多 $5$ 个候选值。谱矩估计排除这个见证，故候选值同在一个开半球内。凸包中离原点最近的点非零，归一化后即为所用球冠的中心。对 $0\le\delta\le4/5$，候选值直径至多为 $2\delta$，球面 Jung 估计给出半径 $R=\arccos\sqrt{(3\cos^2\delta-1)/2}$。在较大的缺陷区间，最近点由至多 $4$ 个接触点的凸组合给出，谱估计给出最近点范数的余弦下界。所用闭式为

$$
H(t)=\frac{(1+2t)(1-3t-3t^2)}{\sqrt{1-2t-2t^2}}.
$$

当 $0\le t\le1/4$、$4t^2+4t-1\ge0$ 且 $1-6t^2-4t^3\le\cos\delta$ 时，可用经认证的 $0<s\le H(t)$ 取球冠半径 $R=\arccos s$。

**从球冠到棱。** 沿共同锚点传递标架，再用球冠中心赋予各顶点势值。跨层棱的两端通过一条共同的候选输运比较，误差至多为 $2R$。同层相邻点的前驱集因弦性而彼此包含，较小集合中的候选值经棱输运后与较大集合中的对应值相距至多 $\delta$，且两组对应候选使用同一个前驱间增益矩阵。令 $K=434/125$。第一区间 $0\le\delta\le4/5$ 以凸包投影比较同层中心。$\delta\le1/2$ 时直接使用三角函数估计，$[1/2,4/5]$ 上使用 $15$ 个有理子区间的证书，得到全棱误差至多 $3\delta$。第二区间 $4/5<\delta$ 且 $K\delta\le\pi$ 用 $22$ 个有理子区间的证书控制 $2R$。在同层，共同矩阵的三个 Rayleigh 商下界迫使三个单位列向量在同一条四元数特征线上都有足够大的投影。若中心间距超过 $K\delta$，对应列向量的配对将违反这些投影所允许的重叠界。两组证书都用有理端点与正弦、余弦的交错级数界核对不等式。最后，$K\delta>\pi$ 时，由球面的直径界可直接取常值势。反向棱由增益取逆及距离的双不变性得到同一界。完整证明由 Lean 内核检查。
:::

## E.8.1.7.3 小缺陷时的逐点扩展

在反向完美消去序中插入顶点 $a$ 时，已插入的邻点成团。每个邻点 $i$ 给出一个正好拟合棱 $ia$ 的候选值 $p(i)g(i,a)$。若旧棱误差至多为 $r$，则由两侧乘法的等距性和三角不等式，任意两个候选值相距至多 $\delta+r$。因此只要每次能找到半径 $r$ 的球冠，便可把其中心赋给 $a$ 并保留旧势值。没有旧邻点时可取单位元。反向棱也满足同一误差界。

::: {.theorem #thm-appe-chordal-su2-small-two title="缺陷至多为 $\pi/6$ 时的重构界" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalSU2SharpBounds.SimpleGraph.IsChordal.exists_su2_gain_potential_small_defect_two"}
设 $V$ 为有限类型，$G$ 为 $V$ 上的简单弦图，$g:V\times V\to U$ 在 $G$ 上反对称。设 $\delta\in\mathbb R$ 且 $0\le\delta\le\pi/6$，并假设 $g$ 在 $G$ 上的三角缺陷至多为 $\delta$。则存在势 $p:V\to U$，在 $G$ 上以误差至多 $2\delta$ 拟合 $g$。
:::

::: {.proof #pf-appe-chordal-su2-small-two}
取 $r=2\delta$。候选值两两相距至多 $3\delta\le\pi/2$，故其内积非负，凸包避开原点。实维数为 $4$ 的球面 Jung 界给出中心与每个候选值的内积至少为 $\sqrt{(1+3\cos(3\delta))/4}$。倍角及三倍角公式将所需的平方差化为 $(1-c)(4c+1)(4c^2-3)/4$，其中 $c=\cos\delta\ge\sqrt3/2$。平方差非负，故该内积下界至少为 $\cos(2\delta)$，逐点扩展保持误差界。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-chordal-su2-small-eight-fifths title="缺陷至多为 $1/10$ 时的重构界" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalSU2SharpBounds.SimpleGraph.IsChordal.exists_su2_gain_potential_small_defect_eight_fifths"}
设 $V$ 为有限类型，$G$ 为 $V$ 上的简单弦图，$g:V\times V\to U$ 在 $G$ 上反对称。设 $\delta\in\mathbb R$ 且 $0\le\delta\le1/10$，并假设 $g$ 在 $G$ 上的三角缺陷至多为 $\delta$。则存在势 $p:V\to U$，在 $G$ 上以误差至多 $\frac85\delta$ 拟合 $g$。
:::

::: {.proof #pf-appe-chordal-su2-small-eight-fifths}
取 $r=\frac85\delta$，则候选值直径至多为 $r+\delta=\frac{13}{5}\delta\le\pi/2$。倍角公式把球面 Jung 界所需的平方比较化为 $\frac32\sin^2(\frac{13}{10}\delta)\le\sin^2(\frac85\delta)$。用 $\sin x\le x$ 估计左边的正弦，用 $\sin x\ge x-x^3/6$ 估计右边的正弦。常数满足 $\sqrt{3/2}\cdot\frac{13}{10}\le\frac{637}{400}\le\frac{14936}{9375}$，且由 $\delta\le1/10$ 得 $\frac{14936}{9375}\delta\le\sin(\frac85\delta)$。这给出所需的球冠半径，且在 $\delta=0$ 时仍适用。完整证明由 Lean 内核检查。
:::

## E.8.1.7.4 小团数时的重构

若每个团至多有 $k$ 个顶点，插入点及其旧邻点组成的团使候选值至多有 $k-1$ 个。只要候选值至多有 $4$ 个，就总能找到闭半球容纳它们。取其所在仿射空间的一个单位法向量，选定符号使各候选值在此方向上共同的内积非负。加上三角缺陷条件，候选值较少时还能收紧这个半径。

::: {.theorem #thm-appe-chordal-su2-clique-three title="团大小至多为三的重构界" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalSU2SharpBounds.SimpleGraph.IsChordal.exists_cliqueThree_su2_gain_potential_min"}
设 $V$ 为有限类型，$G$ 为 $V$ 上的简单弦图，$g:V\times V\to U$ 在 $G$ 上反对称。设 $\delta\in\mathbb R$ 且 $\delta\ge0$，并假设 $g$ 在 $G$ 上的三角缺陷至多为 $\delta$。若每个在 $G$ 中成团的有限顶点集至多有 $3$ 个元素，则存在势 $p:V\to U$，在 $G$ 上以误差至多 $\min(\delta,\pi/2)$ 拟合 $g$。
:::

::: {.proof #pf-appe-chordal-su2-clique-three}
若 $\delta<\pi/2$，取 $r=\delta$。至多 $2$ 个候选值相距至多 $2\delta<\pi$，取最短球面弧的中点即可使两个距离都至多为 $\delta$。单个候选值可直接取作势值。若 $\delta\ge\pi/2$，可用闭半球中心逐点扩展，等号处同样成立。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-chordal-su2-clique-four title="团大小至多为四的重构界" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalSU2SharpBounds.SimpleGraph.IsChordal.exists_cliqueFour_su2_gain_potential_two"}
设 $V$ 为有限类型，$G$ 为 $V$ 上的简单弦图，$g:V\times V\to U$ 在 $G$ 上反对称。设 $\delta\in\mathbb R$ 且 $\delta\ge0$，并假设 $g$ 在 $G$ 上的三角缺陷至多为 $\delta$。若每个在 $G$ 中成团的有限顶点集至多有 $4$ 个元素，则存在势 $p:V\to U$，在 $G$ 上以误差至多 $2\delta$ 拟合 $g$。
:::

::: {.proof #pf-appe-chordal-su2-clique-four}
当 $\delta\le\pi/5$ 时，至多 $3$ 个候选值的球面 Jung 界给出半径 $2\delta$。当 $\pi/5<\delta<\pi/4$ 时，以候选凸包最近点的权重构成四元数 Hermitian 矩阵，候选值不足时用重复点补足。谱的一、二阶矩分别为 $1$ 和 $1$，三角环量给出三阶矩下界 $1-2(1-c)/9$，其中 $c=\cos\delta$。旧棱误差和三角缺陷给出两个 Rayleigh 商的下界。用 $\sqrt{2}/2\le c\le5/6$ 的统一端点估计比较这些矩与 Rayleigh 商，排除最近点范数小于 $\cos(2\delta)$，于是可把最近点归一化为所需的中心。到 $\delta=\pi/4$ 及以后，闭半球的半径 $\pi/2$ 已至多为 $2\delta$。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-chordal-su2-clique-five title="团大小至多为五的闭半球重构界" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalSU2SharpBounds.SimpleGraph.IsChordal.exists_cliqueFive_su2_gain_potential_half_pi"}
设 $V$ 为有限类型，$G$ 为 $V$ 上的简单弦图，$g:V\times V\to U$ 在 $G$ 上反对称。若每个在 $G$ 中成团的有限顶点集至多有 $5$ 个元素，则存在势 $p:V\to U$，在 $G$ 上以误差至多 $\pi/2$ 拟合 $g$。
:::

::: {.proof #pf-appe-chordal-su2-clique-five}
每次插入至多有 $4$ 个候选值，其仿射包的维数至多为 $3$，故可用上述闭半球的法向量作势值。逐点扩展只用团数限制和反向增益的取逆规则，全程无需约束三角缺陷。完整证明由 Lean 内核检查。
:::

## E.8.1.7.5 现有界与待形式化的估计

最优通用系数仍待确定。本节未确认的估计包括系数 $3.44569$ 的通用上界，以及路径四次幂 $P_{2000}^4$ 上的有限曲率系数下界 $1.241>\sqrt{3/2}$。团大小分别至多为 $5$ 和 $6$ 时的系数上界 $\pi/\arccos(1/3)$ 与 $2\arccos(-1/4)/\arccos(1/6)$，以及宽度 $4$ 路径幂族的切空间下界，见[附录 E.8.1.9](appendix-e-s08-s01-s09-hilbert-reversal-circle-su2.md#sec-appe-hilbert-reversal-circle-su2)。
