# 附录 D Fourier 双基的支撑差集与秩界

[第 8 章 §8.1](ch08-flavor-hierarchy-and-ckm.md#sec-ch08-cyclic-obstruction) 用第一读数支撑上的循环差给出最小共同态秩的上界，并刻画何时存在第二读数可强制该秩达到支撑大小。无碰撞支撑的差集构造可以达到相应的维数门槛。若碰撞集中在较小子集，则可以进一步限制秩。

## D.1 无碰撞支撑与模 Golomb 尺 {#sec-ou-appd-golomb}

设支撑有 $k$ 个位置。要让某组第二读数强制秩 $k$，这 $k(k-1)$ 个有向差必须互异。由于 $\mathbb Z_d$ 只有 $d-1$ 个非零剩余类，故 $d\ge k(k-1)+1$。例如模 $7$ 的 $\{0,1,3\}$ 和模 $13$ 的 $\{0,1,3,9\}$ 都恰好达到门槛。若 $k=q+1$ 且 $q$ 为素数幂，有限域中的 Singer 循环差集给出一般构造。$\mathbb F_{q^3}^\times/\mathbb F_q^\times$ 中的迹零射影点组成所需支撑，每个非平凡平移和原支撑恰相交于一点。素数情形可用 [SingerTracePlane.result](lean:D5/S3/Geometry/FiniteGeometry/SingerTracePlane.result) 的两个结论：若 $\alpha$ 生成 $\mathbb F_{q^3}^\times$，在一个射影周期 $0\le i<q^2+q+1$ 内，使 $\operatorname{Tr}(\alpha^i)=0$ 的指数有 $q+1$ 个，且每个非零循环差恰出现一次。一般素数幂见 [James Singer, *A theorem in finite projective geometry and some applications to number theory*（1938），第 377–385 页](https://doi.org/10.1090/S0002-9947-1938-1501951-4)。

**七点与十一点支撑。** 具有互异非零有向差的支撑就是模 Golomb 尺。Buratti 与 Stinson 的文献分类给出七点支撑的全部维数 $d\ge48$。模 $48$ 的 $\{0,1,3,15,20,38,42\}$ 是一个见证。十一点支撑的全体维数是 $120$、$133$ 和所有 $d\ge135$。模 $120$ 的 $\{0,1,4,9,23,30,41,43,58,68,74\}$ 产生 $110$ 个互异的非零差，恰好缺少 $12,24,\ldots,108$。[Buratti 与 Stinson，*New Results on Modular Golomb Rulers, Optical Orthogonal Codes and Related Structures*（2020），定理 2.3(5)、(9) 与表 1](https://arxiv.org/abs/2007.01908v2)

**第二读数要多接近均匀分布，才能排除低秩？** 固定无碰撞支撑 $S$ 上的第一概率，按 $p_1\ge\cdots\ge p_k>0$ 排序。设相容态 $\rho$ 的 Fourier 概率为 $q$，均匀概率为 $u=(1/d,\ldots,1/d)$。给定 $1\le r<k$，由 $\sum_{i=1}^r\max(p_i,\tau)=1$ 唯一确定 $\tau>p_r$。在秩至多为 $r$ 的态中，欧氏距离 $\|q-u\|_2$ 的最小值为

$$
R_r(p)=\sqrt{\frac{\sum_{i=1}^r\max(p_i,\tau)^2-\sum_{i=1}^k p_i^2}{d}}.
$$

半径可由读数直接推得。正性给出 $|\rho_{xy}|^2\le p_xp_y$，故所有非零矩阵元都在 $S\times S$ 上。$q-u$ 在每个非零频率的未归一化 Fourier 系数，等于对应同一有向差的矩阵元之和。差无碰撞时，每个和式至多含一项。Parseval 等式于是给出 $d\|q-u\|_2^2=\operatorname{tr}(\rho^2)-\sum_i p_i^2$。由 Schur–Horn 定理，$\rho$ 的降序本征值向量主序支配其对角概率 $p$，每个支配 $p$ 的概率谱也都能取到。在正项至多有 $r$ 个的谱中，主序最小的谱前 $r$ 项为 $\max(p_i,\tau)$，其余为零。对于高于 $\tau$ 的各项，主序给出每个前缀和的下界；对于较长的前缀，降序性将下界延伸为一条直线，连接最后保留的前缀与第 $r$ 项处的总和一。上述谱逐点达到这些下界，故使纯度最小。[Horn，*Doubly stochastic matrices and the diagonal of a rotation matrix*](https://doi.org/10.2307/2372705)

若第一读数在这 $k$ 个位置上均匀，则 $R_r=\sqrt{(1/r-1/k)/d}$。例如在模 $7$ 的 $\{0,1,3\}$ 上，精确 Fourier 读数距 $u$ 小于 $1/\sqrt{42}$ 即可断定秩为三。等号可由秩二态达到。一般地，若观测值 $y$ 满足 $\|y-q\|_2\le\epsilon$，则 $\|y-u\|_2+\epsilon<R_r(p)$ 足以排除所有不超过 $r$ 的秩。有向差的无碰撞条件不可省去。在模 $4$ 的对径位置 $\{0,2\}$ 上，纯态 $(1,0,i,0)/\sqrt2$ 的两项非对角元在差 $2$ 处相消，第二读数恰好均匀。

若第一概率仍限于 $S$ 内，但允许总变差距离 $\delta$ 的误差，将至多 $\delta$ 的概率质量从最小各项依次移至最大项，直至最大项达到一，所得向量记为 $p^\star$。此时精确半径为 $R_r(p^\star)$；若其正项至多有 $r$ 个，则取零。允许第一概率有零项时这是最小值，要求 $k$ 项都为正时这是下确界。若有比例 $t<1$ 的概率泄漏至 $S$ 外，而 $S$ 内的条件概率为 $p$，则 $\|y-u\|_2+\epsilon+\sqrt{2t}<R_r(p)$ 仍足以排除秩至多 $r$ 的态。将态投影到 $S$ 后归一化，其秩至多为原态的秩。对纯化做相同投影可得两态的迹距离至多为 $\sqrt t$，故测量后概率向量的欧氏距离至多为 $\sqrt{2t}$。[推导、第一读数误差与精确算例](https://github.com/the-omega-institute/trureturing-experiments/blob/77503f687e48ad1db010979488f5e93eb7f671be/experiments/ch39-omega-research/replay/ch08-fourier-rank-radius.md)

## D.2 子支撑界（手工推导） {#sec-ou-appd-subsets}

若某个子支撑的差发生较多碰撞，还可收紧秩界。对非空 $T\subseteq S$，记 $m(T)$ 为 $T$ 的不同非零有向差数。取可行集的一个极点，其秩为 $r$，则像空间与 $T$ 的坐标子空间至少相交于 $r-(k-|T|)$ 维。该交空间上的非零不可见厄米扰动会破坏极点性。因此同一个极点满足

$$
r\le\min_{\varnothing\ne T\subseteq S}\left(k-|T|+\left\lfloor\sqrt{|T|+m(T)}\right\rfloor\right).
$$

例如模 $12$ 的 $S=\{0,1,3,6,9\}$，用四点子支撑 $T=\{0,3,6,9\}$ 可把上界从四降到三，且有读数唯一确定秩三的态。[子支撑界与可复算见证](https://github.com/the-omega-institute/trureturing-books/issues/1676#issuecomment-7233048570)

## D.3 三点支撑的精确纯态半径 {#sec-ou-appd-three-site-radius}

在 $\mathbb Z_d$ 的三个站点固定正坐标概率 $p_1,p_2,p_3$，其余站点概率为零。在满足这组坐标概率的纯态中，令 $R$ 为 Fourier 概率 $q$ 到均匀概率 $u$ 的最小欧氏距离。沿三角形依次记三条边的长度为 $A=\sqrt{p_1p_2}$、$B=\sqrt{p_2p_3}$、$C=\sqrt{p_3p_1}$。对等差布局，将中点标为第 2 站。记 $T=\max(0,2\max(A,B,C)-A-B-C)$。

| 三站布局 | $dR^2$ |
|---|---|
| 六个有向差互异 | $2(A^2+B^2+C^2)$ |
| 仅边 $C$ 为对径边，其他有向差互异 | $2(A^2+B^2)$ |
| 步长的阶至少为五的等差布局 | $2(A-B)^2+2C^2$ |
| 步长的阶为四的等差布局 | $2(A-B)^2$ |
| 三阶子群的陪集 | $2T^2$ |

沿三角形走一圈，三个有向差之和为零。其中两个若互为相反数，第三个就必须为零，与站点互异矛盾。因此，不同边之间出现相同的有向差就给出等差布局。步长为三阶时，三条有向边都给出同一个差。步长为四阶时，两端点互为对径。若三站不构成等差布局，差发生碰撞的唯一可能是某条对径边的正反向差相同。

按 Parseval 等式，$d\|q-u\|_2^2$ 等于各非零差上的相干项先求和、再取模平方所得的总和。纯态的三个相干项模长分别为 $A,B,C$，其单位相位绕一圈的乘积为一。单独一条对径边可取纯虚相干项，使其正反向恰好抵消。在等差布局上，两条步长边的相位可以反向。步长为四阶时，取 $e^{i\pi/4}$ 和 $-e^{i\pi/4}$ 还可同时使端点相干项为纯虚数。在三阶陪集上，三个模长都进入同一个和及其共轭。由三角形不等式，该和的最小模长为 $T$；将三项共同旋转即可使单位相位乘积为一而保持模长。表中各下界都能由同一组站点相位取到。

若要求 Fourier 读数精确均匀，第一行的最小共同态秩为三。其余各行中，$R=0$ 时最小秩为一，$R>0$ 时为二。对角态总能给出均匀读数。只要有向差出现碰撞，独立实条件数就至多为 $3+m\le8$，故第八章的极点界保证存在秩至多二的实现。

在三阶陪集上，设第三站取得概率 $t$，原两站保留相对占比 $\alpha$ 和 $1-\alpha$。取 $0<\alpha,t<1$，令 $s=\sqrt{\alpha(1-\alpha)}$。将三个模长同除以 $\sqrt{t(1-t)}$，其中两个化为 $\sqrt{\alpha}$ 和 $\sqrt{1-\alpha}$。第三个 $s\sqrt{(1-t)/t}$ 须介于两者差的绝对值与两者之和之间。平方后解出 $t$ 的范围为

$$
\left(\frac{s}{1+s}\right)^2\le t\le\left(\frac{s}{1-s}\right)^2 .
$$

这恰是纯态可以给出均匀 Fourier 读数的泄漏窗口。原两站等权时，最小泄漏为 $1/9$，取 $\mathbb Z_{12}$ 中的 $\{0,4,8\}$ 与振幅 $(2,2,-1)/3$ 即可达到。原两站权重不等时，窗口上端严格小于一，继续增大第三站的占比也会失去精确均匀性。[三点半径与相位见证](https://github.com/the-omega-institute/trureturing-experiments/blob/ec341972d75f6058bb3708e3692873997fd76d34/experiments/ch39-omega-research/replay/ch08-three-site-pure-radius.md)

## D.4 十四点与十五点支撑 {#sec-ou-appd-fourteen-fifteen}

十四点的最小循环维数恰为 $183$。十四点需要 $14\cdot13$ 个互异非零有向差，而 $\mathbb Z_{183}$ 中的支撑 $\{0,1,8,24,37,41,59,107,119,128,134,139,153,181\}$ 恰好给出全部差。十五点的最小维数落在 $[223,255]$ 内。上界见证是 $\mathbb Z_{255}$ 中的 $\{0,13,22,38,45,59,87,142,143,154,162,214,220,224,250\}$，其 $210$ 个有向差互异。

对十五点，直接计数排除小于 $211$ 的维数。在 $211$ 时全部非零差均出现。在特征二的每个非平凡根处，取逆等于 $2^{105}$ 次 Frobenius 幂，故群环等式迫使支撑多项式在这些根处全为零。只有十五项且次数至多 $210$ 的支撑多项式不可能满足这个条件。在 $-1$ 处代值得到非平方数，排除 $212$ 与 $214$。在 $213=3\cdot71$ 时，遗漏差为 $\pm a$。在 $3,71$ 中选不整除 $a$ 的一个。在相应分圆域中，计算出的范数在一个作用为取逆的素数处有奇数赋值，矛盾。

模 $215$ 与 $216$ 分别将群环等式投影到 $\mathbb Z_{43}$ 与 $\mathbb Z_{27}$。对每类遗漏差，先用有限域范数方程穷尽二元占位，再检查全部整数提升，排除了 $13$ 类与 $17$ 类。模 $217$ 投影到 $\mathbb Z_{31}$ 后只余两类。一类与 $\mathbb Z_7$ 上特征三的自相关条件冲突。另一类的投影差和满足一个线性恒等式，迫使 $\mathbb Z_{31}\times\mathbb Z_7$ 上有两个重复有向差。 [支撑见证、群环排除与完整有限证书](https://github.com/the-omega-institute/trureturing-books/issues/1676#issuecomment-7236858851)

模 $218$ 的十五点支撑必须分成九点和六点两个奇偶类，跨类有向差必须用完全部 $108$ 个可用奇剩余类。投影到 $\mathbb Z_{109}$ 并将相反剩余类配对，要求用九个六元素行精确覆盖 $54$ 个差类。穷尽六点侧的 $55{,}129$ 个仿射类后，没有找到这样的覆盖。[奇偶约化与可执行证书](https://github.com/the-omega-institute/trureturing-books/issues/1676#issuecomment-7237141232)

随后两个模数也被排除。模 $219$ 的三行按模 $3$ 分组，行规模只有 $(7,5,3)$、$(7,4,4)$ 与 $(6,6,3)$。归一化后的行按循环顺序记为 $C,A,B$。在 $\mathbb Z_{73}$ 上，跨行差 $A-C$ 与 $B-A$ 不相交，迫使 $B\cap(A+A-C)=\varnothing$。三种规模穷尽后仅一组进入最后移位检验，其 $73$ 种移位都有重复差。模 $220$ 则由奇偶性迫出六点与九点的分组。将自相关占位从模 $11$ 经模 $22$ 提升到模 $44$，最后一步核对 $5{,}973{,}000$ 个候选，全部排除。[逐行与占位穷尽的独立复算](https://github.com/the-omega-institute/trureturing-books/issues/1676#issuecomment-7237283786)

模 $221$ 投到模 $13$ 和 $17$ 后，五对遗漏差共有 $88{,}867$ 个仿射类。逐行的一、二次矩只留下六个每行都有候选子集的系统，每个系统中由各行候选强制出现的点都产生重复有向差。模 $222$ 只允许 $(10,5)$ 和 $(9,6)$ 两种奇偶分组。投到 $\mathbb Z_{111}$ 后，两种分组都无法让两行的内部圆周差彼此不交。模 $225$ 也排除。三行等长时，同余 $1$ 模 $3$ 的有向差总和产生矛盾。其余六种规模逐行筛选后共有 $93{,}350$ 个完整候选，每组都有重复有向差。[模 221 复算](https://github.com/the-omega-institute/trureturing-books/issues/1676#issuecomment-7237424635) · [模 222 复算](https://github.com/the-omega-institute/trureturing-books/issues/1676#issuecomment-7237402293) · [模 225 复算](https://github.com/the-omega-institute/trureturing-books/issues/1676#issuecomment-7237431075)

另有三个模数可排除。模 $224$ 的占位沿 $7,14,28,56,112$ 提升并按仿射类去重，模 $56$ 只剩一类，末级的 $24{,}576$ 个提升全部失败。模 $226$ 只有三种奇偶分组，投到 $\mathbb Z_{113}$ 后，满足内部差条件的 $21{,}328$ 个行对都有跨行差集 $S$ 满足 $S+S=\mathbb Z_{113}$，排除全部相对移位。模 $228$ 逐级投到 $19,38,76$，末级的 $7{,}829{,}504$ 个提升全部失败。[模 224 复算](https://github.com/the-omega-institute/trureturing-books/issues/1676#issuecomment-7237505734) · [模 226 复算](https://github.com/the-omega-institute/trureturing-books/issues/1676#issuecomment-7237532770) · [模 228 复算](https://github.com/the-omega-institute/trureturing-books/issues/1676#issuecomment-7237606610)
