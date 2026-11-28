# 附录 D Fourier 双基的支撑差集与秩界

[第 8 章 §8.1](ch08-flavor-hierarchy-and-ckm.md#sec-ch08-cyclic-obstruction) 用第一读数支撑上的循环差给出最小共同态秩的上界，并刻画何时存在第二读数可强制该秩达到支撑大小。无碰撞支撑的差集构造可以达到相应的维数门槛。若碰撞集中在较小子集，则可以进一步限制秩。

## D.1 无碰撞支撑与模 Golomb 尺 {#sec-ou-appd-golomb}

设支撑有 $k$ 个位置。要让某组第二读数强制秩 $k$，这 $k(k-1)$ 个有向差必须互异。由于 $\mathbb Z_d$ 只有 $d-1$ 个非零剩余类，故 $d\ge k(k-1)+1$。例如模 $7$ 的 $\{0,1,3\}$ 和模 $13$ 的 $\{0,1,3,9\}$ 都恰好达到门槛。若 $k=q+1$ 且 $q$ 为素数幂，有限域中的 Singer 循环差集给出一般构造。$\mathbb F_{q^3}^\times/\mathbb F_q^\times$ 中的迹零射影点组成所需支撑，每个非平凡平移和原支撑恰相交于一点。素数情形可用 [SingerTracePlane.result](lean:D5/S3/Geometry/FiniteGeometry/SingerTracePlane.result) 的两个结论：若 $\alpha$ 生成 $\mathbb F_{q^3}^\times$，在一个射影周期 $0\le i<q^2+q+1$ 内，使 $\operatorname{Tr}(\alpha^i)=0$ 的指数有 $q+1$ 个，且每个非零循环差恰出现一次。一般素数幂见 [James Singer, *A theorem in finite projective geometry and some applications to number theory*（1938），第 377–385 页](https://doi.org/10.1090/S0002-9947-1938-1501951-4)。

**七点与十一点支撑。** 具有互异非零有向差的支撑就是模 Golomb 尺。Buratti 与 Stinson 的文献分类给出七点支撑的全部维数 $d\ge48$。模 $48$ 的 $\{0,1,3,15,20,38,42\}$ 是一个见证。十一点支撑的全体维数是 $120$、$133$ 和所有 $d\ge135$。模 $120$ 的 $\{0,1,4,9,23,30,41,43,58,68,74\}$ 产生 $110$ 个互异的非零差，恰好缺少 $12,24,\ldots,108$。[Buratti 与 Stinson，*New Results on Modular Golomb Rulers, Optical Orthogonal Codes and Related Structures*（2020），定理 2.3(5)、(9) 与表 1](https://arxiv.org/abs/2007.01908v2)

**十四点与十五点支撑。** 十四点的最小循环维数恰为 $183$。十四点需要 $14\cdot13$ 个互异非零有向差，而 $\mathbb Z_{183}$ 中的支撑 $\{0,1,8,24,37,41,59,107,119,128,134,139,153,181\}$ 恰好给出全部差。十五点的最小维数落在 $[218,255]$ 内。上界见证是 $\mathbb Z_{255}$ 中的 $\{0,13,22,38,45,59,87,142,143,154,162,214,220,224,250\}$，其 $210$ 个有向差互异。

对十五点，直接计数排除小于 $211$ 的维数。在 $211$ 时全部非零差均出现。在特征二的每个非平凡根处，取逆等于 $2^{105}$ 次 Frobenius 幂，故群环等式迫使支撑多项式在这些根处全为零。只有十五项且次数至多 $210$ 的支撑多项式不可能满足这个条件。在 $-1$ 处代值得到非平方数，排除 $212$ 与 $214$。在 $213=3\cdot71$ 时，遗漏差为 $\pm a$。在 $3,71$ 中选不整除 $a$ 的一个。在相应分圆域中，计算出的范数在一个作用为取逆的素数处有奇数赋值，矛盾。

模 $215$ 与 $216$ 分别将群环等式投影到 $\mathbb Z_{43}$ 与 $\mathbb Z_{27}$。对每类遗漏差，先用有限域范数方程穷尽二元占位，再检查全部整数提升，排除了 $13$ 类与 $17$ 类。模 $217$ 投影到 $\mathbb Z_{31}$ 后只余两类。一类与 $\mathbb Z_7$ 上特征三的自相关条件冲突。另一类的投影差和满足一个线性恒等式，迫使 $\mathbb Z_{31}\times\mathbb Z_7$ 上有两个重复有向差。 [支撑见证、群环排除与完整有限证书](https://github.com/the-omega-institute/trureturing-books/issues/1676#issuecomment-7236858851)

## D.2 子支撑界（手工推导） {#sec-ou-appd-subsets}

若某个子支撑的差发生较多碰撞，还可收紧秩界。对非空 $T\subseteq S$，记 $m(T)$ 为 $T$ 的不同非零有向差数。取可行集的一个极点，其秩为 $r$，则像空间与 $T$ 的坐标子空间至少相交于 $r-(k-|T|)$ 维。该交空间上的非零不可见厄米扰动会破坏极点性。因此同一个极点满足

$$
r\le\min_{\varnothing\ne T\subseteq S}\left(k-|T|+\left\lfloor\sqrt{|T|+m(T)}\right\rfloor\right).
$$

例如模 $12$ 的 $S=\{0,1,3,6,9\}$，用四点子支撑 $T=\{0,3,6,9\}$ 可把上界从四降到三，且有读数唯一确定秩三的态。[子支撑界与可复算见证](https://github.com/the-omega-institute/trureturing-books/issues/1676#issuecomment-7233048570)
