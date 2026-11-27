# E.8.1.5 弦图 Banach 势重构的精确通用常数 {#sec-appe-sharp-chordal-banach-four}

团大小受限时，前面的消元与加权平均方法能改善重构界。若允许团任意大，是否还能对所有增益选取更好的势，将 [@thm-appe-chordal-uniform-gain-potential] 的系数 $4$ 一致降低？要证明系数的尖锐性，需要让同一组增益迫使每一种势都产生大误差。

::: {.theorem #thm-appe-chordal-banach-sharp-four title="有限连通弦图上的尖锐 Banach 势重构下界" lean="D5/S3/Combinatorics/Graph/Chordal/ChordalBanachSharpFour.SimpleGraph.exists_chordal_banach_gain_lower_four"}
对每个实数 $\varepsilon>0$，存在有限顶点集 $V$、其上的连通简单弦图 $G$、有限维实 Banach 空间 $E$ 与映射 $g:V\times V\to E$，满足以下条件。

1. 对所有 $u,v\in V$，有 $g(v,u)=-g(u,v)$。
2. 对每组三点 $u,v,w\in V$，若 $uv,vw,uw$ 均为 $G$ 的棱，则 $\|g(u,v)+g(v,w)-g(u,w)\|\le1$。
3. 对每个势 $p:V\to E$，存在 $G$ 的有向棱 $(u,v)$，使

   $$
   \|g(u,v)-(p(v)-p(u))\|\ge4-\varepsilon.
   $$
:::

::: {.proof #pf-appe-chordal-banach-sharp-four}
**滚动团的历史树。** 选定带宽 $m\ge1$、深度 $n=m^2+m+1$、保留参数 $M>1$ 与分支复制参数 $k$。每个历史节点带有一个新的完整团，大小为 $M^{m+2}$。沿历史向下走，第 $b$ 步出生的团在第 $t$ 步保留 $M^{m+2-(t-b)}$ 个顶点（$b\le t\le b+m$），超过带宽后不再保留。每次将新团接到仍被保留的旧顶点所成的团上，并纳入所有允许的保留选择与分支副本。图有限且连通。任一长度至少为 $4$ 的简单回路上，出生深度最大的顶点的两个回路邻居同属其较早或同层的邻团，因而相邻，给出一条弦。

**由链构造增益。** 在有序顶点对的实系数链空间中，记 $[uv]$ 为反对称有向棱链，边界为 $\delta_v-\delta_u$。用标量余链 $f$ 的配对定义范数

$$
\|z\|_*=\sup_f |\langle f,z\rangle|,
$$

其中所有坐标满足 $|f(u,v)|\le3$，且每个有向三角边界 $T=[uv]+[vw]-[uw]$ 满足 $|\langle f,T\rangle|\le1$。以各坐标系数的符号乘 $1/3$ 作测试余链，得到链的绝对系数和至多为 $3\|z\|_*$。因此取支撑在图的棱上、边界为零的链子空间，得到有限维实 Banach 空间 $E$。选根 $o$，以从 $o$ 到 $v$ 的路径链 $P_v$ 定义棱增益 $g(u,v)=[uv]+P_u-P_v$，非棱取零。三角和为 $T$，其范数至多为 $1$。将任意势 $p(v)$ 加到 $P_v$ 得到链 $q_v$，其边界仍为 $\delta_v-\delta_o$，而棱残差恰为 $[uv]+q_u-q_v$。

**平均与局部化。** 假设所有残差均小于 $R=4-\varepsilon$。从各链减去根团上的链均值，并对保持深度及祖先关系的图自同构取平均，再将每条链投影到其顶点的祖先历史路径上。此时链的绝对系数和由 $L=13(n+1)$ 控制，局部化使残差上界至多增加 $12L/(k+1)$。由于同一保留团中的可交换顶点具有相同的链载荷，每次保留比例至多为 $1/M$，父、子两侧的测试余链配对变化各至多为 $12L/M$。根团平均留下的修正项至多为 $3/M^{m+2}$。取足够大的 $M,k$，使这三类误差之和至多为 $\varepsilon/2$。

**周期带状余链。** 对 $0\le r<m$ 和时刻 $t$，置 $\rho_r(t)=\mathbf{1}_{t\bmod m=r}-1/m$。当 $u<v\le u+m$ 时，取带状余链 $B_r(u,v)$ 为 $\rho_r(v)$，在 $v-u=m$ 时再加 $\rho_r(u)$，反向取负，同点取零。以顶点最后被保留的时刻作为年龄，测试余链区分棱的两个端点，并保持三角缺陷至多为 $1$、绝对值至多为 $3$。上述局部化估计给出一族实值函数 $H_r(t)$，满足 $\sum_r H_r(t)=0$，且在 $0\le u<v\le u+m$、$v\le n$ 时有

$$
2+B_r(u,v)+H_r(u)-H_r(v)\le4-\varepsilon/2.
$$

对每个余数 $r$，从 $0$ 走到 $1$ 至 $m$ 中余数为 $r$ 的时刻，再走 $m$ 次带宽为 $m$ 的步，最后到达 $n$。每个全宽步的 $2+B_r$ 等于 $4-2/m$，首尾两步的 $2+B_r$ 非负。沿路径求和，$H_r$ 的中间项相消，再对余数求平均，端点项也相消，得到

$$
m(4-2/m)\le(m+2)(4-\varepsilon/2).
$$

一开始即可选取足够大的 $m$，使上式的反向严格不等式成立。这与残差假设矛盾，故任意势都有一条棱达到所要求的下界。完整证明由 Lean 内核检查。
:::

沿用 [@thm-appe-chordal-banach-limit-two] 中 $C_{\mathrm{Ban}}(G)$ 的定义。对所有有限连通弦图，[@thm-appe-chordal-uniform-gain-potential] 应用于实 Banach 空间的加法群，取 $d(x,y)=\|x-y\|$，即给出 $C_{\mathrm{Ban}}(G)\le4$。上面的定理对任意 $\varepsilon>0$ 给出某个这样的图，其系数至少为 $4-\varepsilon$。令 $\varepsilon$ 趋于零，得到精确通用常数

$$
\sup_{G\text{ finite, connected, chordal}} C_{\mathrm{Ban}}(G)=4.
$$

这个等式的上下界均有 Lean 内核证明。[对应的注册文件](https://github.com/the-omega-institute/trureturing/blob/0ab3edce883d165b87f2d0ace6431d8bc026ea3e/Reg/D5/S3/Combinatorics/Graph/Chordal/ChordalBanachSharpFour.lean) 中的严格障碍实例还分别验证了超过 $3$、$7/2$ 和 $399/100$ 的误差阈值。双不变伪度量群的通用系数也由同一上下界确定为 $4$，因为实 Banach 空间的加法群属于此类。精确上确界无需在单个有限图上取到。

对于额外具有支配团的弦图，系数 $3$ 的可选上界，以及 $3$-树与其他 $k$-树的进一步有界团数改进，仍需各自的形式化依据。固定目标为圆度量 $\mathrm{SU}(2)$ 时，弦图通用系数仍待确定，等式 $C_{\mathrm{SU}(2)}(K_4)=c_*$ 的全局 Lean 形式化亦见 [@prob-appe-round-quaternion-k4-optimal-constant]。
