# 第十章 “两两比较，永远一致，顺序无关”：消解非对易假象与贝里相位 {#两两比较永远一致顺序无关消解非对易假象与贝里相位}

> *“我总感觉量子的本质就是, 两两比较, 永远一致, 顺序无关”*

初读章首这句格言，任何受过标准量子力学训练的人都会本能地跳起来反驳：**“怎么可能顺序无关？！量子力学和经典力学最大的区别，不就是算符不对易 $AB \neq BA$ 吗？在三维球面上，先绕 $X$ 轴转 $90^\circ$ 再绕 $Y$ 轴转 $90^\circ$，和先绕 $Y$ 轴转 $90^\circ$ 再绕 $X$ 轴转 $90^\circ$，明明停在完全不同的终点！沿着球面三角形走一圈回来，还会凭空多出一个与路径取向有关的贝里几何相位（Berry phase）！”**

这场看似针锋相对的冲突，其实戳破了量子基础中最容易被混为一谈的两件事：**在时间里依次改造状态的物理动作序列**，与**在固定时刻记录一族状态彼此内积关系的全局格拉姆（Gram）账本**。

本章将用四节篇幅把这两者的边界彻底厘清：

1. **球面上的主动旋转与投影快门确实不对易**（$R_x R_y \neq R_y R_x$，$P_0 P_+ \neq P_+ P_0$），而闭合回路的贝里立体角和乐与三点巴格曼不变量对照见 [@rem-berry-pancharatnam-holonomy-literature]；
2. **时序测量仪器一旦丢弃算符回作用、只看静态效应元，就会漏掉真实的先后顺序差异**（[@prop-static-sequential-separation] 给出一个零假设的 $2\times 2$ 精确反例，把“概率为 $0$”与“概率为 $1$”当场分开）；
3. **为什么局部球面坐标卡总显得依赖路径？** 二维基球面 $S^2$ 上的切丛/主圆丛拓扑障碍与三维旋转器球 $S^3$ 全局左不变标架的对比归纳于文献注记 [@rem-hopf-dirac-monopole-literature] 与 [@rem-gram-hairy-ball-literature]；
4. **什么才是真正的“两两比较，永远一致，顺序无关”？** 当我们保留带标签的**完整复格拉姆内积矩阵** $G_{ij} = \langle\psi_i, \psi_j\rangle$（连同复相位，而非仅仅模平方 $|G_{ij}|^2$）时，无论按什么下标顺序去读取或核对这张两两比较表，它都在差一个公共外围幺正变换 $U$ 的意义下唯一重构出整族量子态的全局几何配置（[@thm-gram-unitary-reconstruction] 与 [@lemma-unit-gram-equality]），而三点循环内积乘积 $\Delta = G_{01}G_{12}G_{20}$ 的复相位本身也直接保存在 $G$ 中（与贝里相位的对照见 [@rem-berry-pancharatnam-holonomy-literature]）！

::: {.figure src="ch10-overview"}
**图 10。** 本章地图：第 I 栏，从北极 $N$ 出发的两条琥珀色弧，先绕 $Y$ 再绕 $X$ 落到 $+X$，先绕 $X$ 再绕 $Y$ 落到 $-Y$，两个终点相隔 $90^\circ$；第 II 栏，左边球面上青色的小箭头在南北两极缩成零（紫色的圈，文献结果，未在本书形式化），右边虚线的小圆示意旋转器球 $S^3$，处处带着紫色的标架；第 III 栏，[@ex-octant-berry-gram] 中三个态的完整复格拉姆表，青色的格子是两两复内积（[@thm-gram-unitary-reconstruction]）。
:::

## 10.1 球面转序与贝里立体角 {#sec-spherical-order-and-berry}

让我们先正视非对易几何动作的客观存在，绝不用含糊的哲学辞令去抹杀它。

拿手边的书本或图 10 左栏的布洛赫球做一次右手主动旋转测试。设初态指向北极 $\vv{e}_3 = (0, 0, 1)$：

- 若**先绕 $Y$ 轴转 $+90^\circ$、再绕 $X$ 轴转 $+90^\circ$**，第一步 $R_y(\pi/2)\vv{e}_3 = \vv{e}_1$ 把北极拉到正东赤道极 $+X$，第二步绕 $+X$ 轴自转对已经在 $+X$ 轴上的向量不起作用，终点稳稳停在 $\vv{e}_1 = (1, 0, 0)$：

  $$
  R_x(\pi/2)\,R_y(\pi/2)\,\vv{e}_3 = \vv{e}_1.
  $$

- 反过来，若**先绕 $X$ 轴转 $+90^\circ$、再绕 $Y$ 轴转 $+90^\circ$**，第一步 $R_x(\pi/2)\vv{e}_3 = -\vv{e}_2$ 把北极拉到 $-\vv{e}_2$，第二步绕 $Y$ 轴旋转对已经在 $\pm\vv{e}_2$ 轴上的向量同样不起作用，终点却停在了 $-\vv{e}_2 = (0, -1, 0)$：

  $$
  R_y(\pi/2)\,R_x(\pi/2)\,\vv{e}_3 = -\vv{e}_2 \neq \vv{e}_1!
  $$

::: {.viz src="berry-loop" preset="order" height="500"}
**同样两次转动，换个次序就停在别处。** 从北极出发，先绕 $Y$ 再绕 $X$ 的琥珀色点停在 $+X$，先绕 $X$ 再绕 $Y$ 的停在 $-Y$，两者相隔 $90^\circ$。第二步里两个点都不动，贴在点上的琥珀色箭头却各转了 $90^\circ$。
:::

同样，取北极投影算子 $P_0 = \begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix}$ 与正东赤道投影算子 $P_+ = \frac{1}{2}\begin{pmatrix} 1 & 1 \\ 1 & 1 \end{pmatrix}$，直接相乘得

$$
P_0 P_+ = \frac{1}{2}\begin{pmatrix} 1 & 1 \\ 0 & 0 \end{pmatrix} \neq \frac{1}{2}\begin{pmatrix} 1 & 0 \\ 1 & 0 \end{pmatrix} = P_+ P_0.
$$

::: {.figure src="ch10-shutter-order"}
**两道快门换个次序，箭头停在不同的线上。** 画的是态矢所在的实平面，青色的 $\lvert 0\rangle$ 与 $\lvert +\rangle$ 两条线相差 $45^\circ$（在布洛赫球上相差 $90^\circ$）。同一支灰色的 $v$，左栏先投到 $\lvert +\rangle$ 线、再投到 $\lvert 0\rangle$ 线，琥珀色的 $P_0P_+v$ 停在水平线上；右栏次序相反，琥珀色的 $P_+P_0v$ 停在斜线上，而且短得多。
:::

更进一步，闭合球面回路上的几何和乐与三顶点复内积不变量之间的经典对应关系汇总如下（[@rem-berry-pancharatnam-holonomy-literature]）。

::: {.remark #rem-berry-pancharatnam-holonomy-literature title="八分球贝里几何相位与巴格曼辐角的立体角解读（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 如果让自旋状态沿着球面八分球大圆三角形 $N(\vv{e}_3) \to +X(\vv{e}_1) \to +Y(\vv{e}_2) \to N(\vv{e}_3)$ 走完一圈闭合回路（立体角 $\Omega = \frac{\pi}{2}$，占整球立体角 $4\pi$ 的八分之一），虽然三维实方向向量 $\vv{r}$ 回到了北极原点 $N$，但悬挂在它头顶的二维复旋量却攒下了一个无法消去的几何和乐角——在自旋朝上本征支的标准约定下，**贝里几何相位**（Berry, 1984；Simon, 1983）等于有向立体角的负一半：

$$
\gamma_B = -\frac{\Omega}{2} = -\frac{\pi}{4}.
$$

这个相位并不只能靠沿连续路径积分微分方程来刻画：只要保留三颗顶点态矢 $\psi_0, \psi_1, \psi_2$ 两两之间的**复内积** $G_{ij} = \langle\psi_i, \psi_j\rangle$，三点循环巴格曼不变量（Bargmann, 1964；Pancharatnam, 1956）

$$
\Delta(\psi_0, \psi_1, \psi_2) = \langle\psi_0, \psi_1\rangle\langle\psi_1, \psi_2\rangle\langle\psi_2, \psi_0\rangle = G_{01} G_{12} G_{20}
$$

在每个顶点各自乘上任意局部相位 $\psi_k \mapsto e^{i\alpha_k}\psi_k$ 时严格保持不变（因为 $e^{-i\alpha_0}e^{i\alpha_1}\cdot e^{-i\alpha_1}e^{i\alpha_2}\cdot e^{-i\alpha_2}e^{i\alpha_0} = 1$），而它的复辐角按 $\gamma_B \equiv -\arg\Delta = -\frac{\Omega}{2} \pmod{2\pi}$ 直接编码了球面测地三角形的几何相位（更多微分拓扑文献细节见章末 [@rem-gram-hairy-ball-literature]）。

其中 $\Delta$ 本身——它的布洛赫形式，以及八分球回路上的值 $\frac{1+i}{4}$——已不是文献结果，见下文 [@thm-qubit-bargmann-bloch]；仍属文献结果的是辐角与立体角、贝里相位之间的对应。
:::

::: {.viz src="berry-loop" preset="octant" height="500"}
**八分之一球。** 青色的回路 $N \to +X \to +Y \to N$ 圈住品红的面积 $\Omega = \frac{\pi}{2}$。琥珀色的箭头沿回路搬运一圈，回到 $N$ 时比虚线的出发方向转了 $\frac{\pi}{2}$；右下角青色的指针是相邻内积连乘积 $\Delta = \frac{1+i}{4}$ 的相位 $\frac{\pi}{4}$，正是这块面积的一半。转角、相位与面积的一般对应是上面的文献结果，未在本书形式化；$\Delta$ 的值本身见下文 [@thm-qubit-bargmann-bloch]。
:::

**乘积的模与辐角各从哪里来。** 由第 3 章的 [@thm-rank-one-chain-trace]，三点巴格曼乘积就是三个投影算子按序相乘后的迹：$\Delta = \langle\psi_0, \psi_1\rangle\langle\psi_1, \psi_2\rangle\langle\psi_2, \psi_0\rangle = \Tr(P_0 P_1 P_2)$，其中 $P_k = \lvert\psi_k\rangle\langle\psi_k\rvert$。单比特的每个投影都写成 $P = \frac{1}{2}(I + \vv{r}\cdot\vv{\sigma})$，于是这个迹可以完全用三根布洛赫向量读出来。

::: {.theorem #thm-qubit-bargmann-bloch title="单比特三点巴格曼迹：标量部分加有向体积" lean="D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.explicit_qubit_orientation"}
对 $\vv{r} = (r_x, r_y, r_z) \in \mathbb{R}^3$，令

$$
P(\vv{r}) = \frac{1}{2}\begin{pmatrix} 1 + r_z & r_x - i\,r_y \\ r_x + i\,r_y & 1 - r_z \end{pmatrix} = \frac{1}{2}\bigl(I + \vv{r}\cdot\vv{\sigma}\bigr).
$$

1. 对任意 $\vv{a}, \vv{b}, \vv{c} \in \mathbb{R}^3$，

   $$
   \Tr\bigl(P(\vv{a})\,P(\vv{b})\,P(\vv{c})\bigr) = \frac{1 + \vv{a}\cdot\vv{b} + \vv{b}\cdot\vv{c} + \vv{c}\cdot\vv{a}}{4} + i\,\frac{\vv{a}\cdot(\vv{b}\times\vv{c})}{4}.
   $$

2. 特别地，$\Tr\bigl(P(\vv{e}_3)\,P(\vv{e}_1)\,P(\vv{e}_2)\bigr) = \frac{1+i}{4}$，$\Tr\bigl(P(\vv{e}_3)\,P(\vv{e}_1)\,P(-\vv{e}_2)\bigr) = \frac{1-i}{4}$。

结论 1 不要求 $\vv{a}, \vv{b}, \vv{c}$ 是单位向量；只有单位向量给出的 $P(\vv{r})$ 才是投影算子。
:::

::: proof
Lean 把三个 $2\times 2$ 矩阵逐项相乘、取迹，再用 $i^2 = -1$ 合并同类项。同一计算可以用泡利乘法表 $\sigma_j\sigma_k = \delta_{jk}I + i\sum_l \varepsilon_{jkl}\sigma_l$ 紧凑地写出（手工推导）：

$$
\begin{aligned}
(I + \vv{a}\cdot\vv{\sigma})(I + \vv{b}\cdot\vv{\sigma}) &= (1 + \vv{a}\cdot\vv{b})\,I + \bigl(\vv{a} + \vv{b} + i\,\vv{a}\times\vv{b}\bigr)\cdot\vv{\sigma}, \\
\Tr\bigl[(I + \vv{a}\cdot\vv{\sigma})(I + \vv{b}\cdot\vv{\sigma})(I + \vv{c}\cdot\vv{\sigma})\bigr] &= 2\bigl[1 + \vv{a}\cdot\vv{b} + (\vv{a} + \vv{b})\cdot\vv{c} + i\,(\vv{a}\times\vv{b})\cdot\vv{c}\bigr],
\end{aligned}
$$

第二行用到 $\Tr I = 2$、$\Tr\sigma_k = 0$ 与 $\Tr(\sigma_j\sigma_k) = 2\delta_{jk}$。乘以 $\frac{1}{8}$，再用 $(\vv{a}\times\vv{b})\cdot\vv{c} = \vv{a}\cdot(\vv{b}\times\vv{c})$，就是结论 1。结论 2 是结论 1 在 $\vv{e}_3, \vv{e}_1, \pm\vv{e}_2$ 处的取值：三个两两点积都是 $0$，混合积分别是 $\pm 1$。完整证明由 Lean 内核检查。
:::

**模记得三条边，辐角记得体积。** 两态重叠的模平方是玻恩权重 $\lvert\langle\psi_j, \psi_k\rangle\rvert^2 = \frac{1 + \vv{r}_j\cdot\vv{r}_k}{2}$（第 2 章 [@ex-bloch-half-angle] 的半角公式），所以记 $p = \vv{a}\cdot\vv{b}$、$q = \vv{b}\cdot\vv{c}$、$s = \vv{c}\cdot\vv{a}$，就有 $\lvert\Delta\rvert^2 = \frac{(1+p)(1+q)(1+s)}{8}$。[@thm-qubit-bargmann-bloch] 给出同一个模：对单位向量，混合积的平方是格拉姆行列式 $1 + 2pqs - p^2 - q^2 - s^2$，代入后得

$$
(1 + p + q + s)^2 + \bigl(\vv{a}\cdot(\vv{b}\times\vv{c})\bigr)^2 = 2\,(1+p)(1+q)(1+s)
$$

（手工推导，展开两边即可核对）。所以 $\Delta$ 的模只记得三条边各自的相融度；辐角

$$
\arg\Delta = \operatorname{atan2}\bigl(\vv{a}\cdot(\vv{b}\times\vv{c}),\; 1 + p + q + s\bigr)
$$

却多出三条边单独看不见的东西：三根布洛赫向量撑开的有向体积。反着走一圈相当于交换 $\vv{b}$ 与 $\vv{c}$，体积变号，$\Delta$ 变成它的共轭；后面“反着走，手性翻转”那张卡里三个模平方都不变、指针却反向，原因就在这里。把这个辐角读成测地三角形的立体角，$\arg\Delta = \frac{\Omega}{2}$，还要用 Van Oosterom 与 Strackee 的立体角公式 $\tan\frac{\Omega}{2} = \frac{\vv{a}\cdot(\vv{b}\times\vv{c})}{1 + p + q + s}$（文献结果，未在本书形式化，见 [@rem-berry-pancharatnam-holonomy-literature]）。

::: {.example #ex-bargmann-growing-triangles title="越张越大的测地三角形：Δ 的模在缩小，辐角跟着面积长"}
取 $\vv{a} = \vv{e}_3$、$\vv{b} = (\sin\theta, 0, \cos\theta)$、$\vv{c} = (0, \sin\theta, \cos\theta)$：三角形的一个顶点在北极，另两个顶点在两条相互垂直的经线上、离北极都是 $\theta$。这时 $p = s = \cos\theta$、$q = \cos^2\theta$、$\vv{a}\cdot(\vv{b}\times\vv{c}) = \sin^2\theta$，由 [@thm-qubit-bargmann-bloch]

$$
\Delta = \frac{(1 + \cos\theta)^2}{4} + i\,\frac{\sin^2\theta}{4}, \qquad \arg\Delta = \arctan\Bigl(\tan^2\frac{\theta}{2}\Bigr).
$$

下表最后一列用 L'Huilier 公式由三条边长独立算出球面角盈 $\Omega$，与 $\arg\Delta$ 无关；数值四舍五入到所示位数。

| $\theta$ | $\operatorname{Re}\Delta$ | $\operatorname{Im}\Delta$ | $\lvert\Delta\rvert^2$ | $\frac{(1+p)(1+q)(1+s)}{8}$ | $\arg\Delta$ | $\frac{\Omega}{2}$（L'Huilier） |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| $30^\circ$ | $0.8705$ | $0.0625$ | $0.76170$ | $0.76170$ | $4.11^\circ$ | $4.11^\circ$ |
| $60^\circ$ | $0.5625$ | $0.1875$ | $0.35156$ | $0.35156$ | $18.43^\circ$ | $18.43^\circ$ |
| $90^\circ$ | $0.2500$ | $0.2500$ | $0.12500$ | $0.12500$ | $45.00^\circ$ | $45.00^\circ$ |
| $120^\circ$ | $0.0625$ | $0.1875$ | $0.03906$ | $0.03906$ | $71.57^\circ$ | $71.57^\circ$ |
| $150^\circ$ | $0.0045$ | $0.0625$ | $0.00393$ | $0.00393$ | $85.89^\circ$ | $85.89^\circ$ |

$\theta = 90^\circ$ 一行就是八分球回路：$\Delta = \frac{1+i}{4}$，即结论 2。三角形越张越大，从北极出发的两条边越来越“不相融”，$\lvert\Delta\rvert$ 一路缩小；辐角却一路增大，始终是面积的一半。第五列与第四列逐行相同，是上面的手工推导；最后两列逐行相同，是 Van Oosterom–Strackee 公式在这五个三角形上的数值核对，不是证明。
:::

::: {.film src="003-two-angles-berry"}
**正交一次、正交两次：两角寻址与贝里相位（1 分 58 秒）。** 只绕一根轴转，琥珀色的点只画出一个圆；先绕 $\vv{e}_2$ 倾转 $\theta = 60^\circ$、再绕 $\vv{e}_3$ 拧转 $\varphi = 45^\circ$，它落在 $\bigl(\frac{\sqrt{6}}{4}, \frac{\sqrt{6}}{4}, \frac{1}{2}\bigr)$；两根只差 $30^\circ$ 的轴交替转四次也能到达目标（[@thm-two-axis-finite-word]）。随后两次 $90^\circ$ 转动换个次序，分别停在 $+X$ 与 $-Y$；沿八分球回路平行搬运，箭头回来时转过所圈面积 $\Omega = \frac{\pi}{2}$；最后由 [@cor-latitude-complex-overlap] 的 $\frac{1+i}{2}$ 连乘出 $\Delta = \frac{1+i}{4}$，它的相位 $\frac{\pi}{4}$ 在每个态改乘局部相位时纹丝不动（贝里相位与面积的对应见 [@rem-berry-pancharatnam-holonomy-literature]）。
:::

为了精确计算任意纬度圈上两个复旋量的两两内积，在 Lean 模块 `BargmannImaginaryMaximizers` 中，对高度参数 $t \in [0, 1]$ 与复数 $z \in \mathbb{C}$，定义二维复向量 `latitude t z` 为

$$
\operatorname{latitude}(t, z) = \bigl(\sqrt{1 - t},\; \sqrt{t}\,z\bigr) \in (\operatorname{Fin} 2 \to \mathbb{C}).
$$

::: {.corollary #cor-latitude-complex-overlap title="同纬度复参数化向量的共轭点积恒等式" lean="D5/S3/Quantum/Information/BargmannImaginaryMaximizers.Latitude.latitude_dot"}
设实数 $t \in \mathbb{R}$ 满足 $0 \le t \le 1$，$z, w \in \mathbb{C}$ 为任意复数。则共轭点积配对满足

$$
\operatorname{star}\bigl(\operatorname{latitude}(t, z)\bigr) \cdot_v \operatorname{latitude}(t, w)
= (1 - t) + t\,\bar{z}\,w.
$$
:::

::: proof
按 `Fin 2` 上的两部分量展开共轭点积：第一分量贡献 $\overline{\sqrt{1-t}}\sqrt{1-t} = (\sqrt{1-t})^2 = 1 - t$（因 $0 \le t \le 1$ 知 $1 - t \ge 0$），第二分量贡献 $\overline{\sqrt{t}\,z}\,(\sqrt{t}\,w) = (\sqrt{t})^2 \bar{z} w = t\bar{z}w$（因 $t \ge 0$）。两项相加即得 $(1 - t) + t\bar{z}w$。完整证明由 Lean 内核检查。
:::

请注意 [@cor-latitude-complex-overlap] 的精确合同：该代数恒等式对任意复数 $z, w \in \mathbb{C}$ 均成立（若要求 $\operatorname{latitude}(t, z)$ 归一化为单位态矢，则当 $t \neq 0$ 时需附加 $|z| = |w| = 1$）。它给出的是两态之间的精确复内积重叠公式，本身并不直接声明微分几何中的贝里平行移动和乐定理（后者见 [@rem-gram-hairy-ball-literature]）。但你看，在赤道 $t = \frac{1}{2}$ 处，取东极 $z = 1$ 与正北偏内极 $w = i$，[@cor-latitude-complex-overlap] 一行就算出两者的复内积为 $\frac{1}{2} + \frac{1}{2}\cdot 1\cdot i = \frac{1 + i}{2} = \frac{1}{\sqrt{2}}e^{i\pi/4}$——那枚八分球立体角的一半 $\frac{\pi}{4}$，从一开始就明明白白地写在两两复内积的相位角里！

::: {.viz src="berry-loop" preset="equator" height="500"}
**赤道一圈。** 四个顶点 $+X, +Y, -X, -Y$ 都在 $t = \frac{1}{2}$ 的纬度上，按 [@cor-latitude-complex-overlap]，相邻两点的内积都是 $\frac{1+i}{2}$，四个连乘得 $-\frac{1}{4}$，右下角青色的指针停在 $\pi$；品红的面积是整个北半球 $2\pi$。琥珀色的箭头回到 $+X$ 时与虚线重合，看上去没转，箭头旁品红的整圆表示它其实转满了一周。
:::

## 10.2 保留仪器与时间顺序 {#sec-instruments-preserve-order}

在进入全局格拉姆重构之前，我们必须立下一块醒目的警示牌：**“两两比较顺序无关”绝不意味着可以把不同时刻的物理测量仪器随意颠倒，或者只凭单次测量的静态概率分布（POVM 效应元）就抹去测量后的状态更新机制！**

在量子测量理论中，一个双结果测量仪器由一族克劳斯（Kraus）算符 $K_b \in M_2(\mathbb{C})$（$b \in \mathrm{Bool} = \{\mathrm{true}, \mathrm{false}\}$）描述：

1. **静态效应元（单次概率）**：只看第一次测量出结果 $b$ 的概率时，玻恩定则只关心正算符 $E_b = K_b^* K_b$（满足完备性 $\sum_b E_b = I$）；
2. **动态分支更新（序贯联合概率）**：一旦紧接着要做第二次测量（探测效应元 $F$），状态已经发生了依赖于具体仪器算符 $K_b$ 的分支演化 $\rho \mapsto K_b \rho K_b^*$，两步联合玻恩权重为 $\operatorname{bornProbability}(K_b \rho K_b^*, F) = \Tr(K_b \rho K_b^* F)$。

如果两台仪器拥有**完全相同**的静态效应元 $E_b = K_b^* K_b = L_b^* L_b$，它们在两步序贯测量中的联合概率分布会不会也必定相同？下面的冻结命题用一对极简的单比特仪器给出彻底否定的反例：静态效应完全相等，但两步联合权重一个是 $0$，另一个却是 $1$！

::: {.proposition #prop-static-sequential-separation title="相同静态效应元下两步序贯联合分布的严格分离" lean="D5/S3/Quantum/Measurement/StaticEffectSequentialSeparation.same_effects_different_two_step_joint_law"}
在单比特矩阵代数 $\mathrm{QubitMatrix} = M_2(\mathbb{C})$ 中，记北极基态密度矩阵为 $P_0 = \operatorname{basisZeroDensity} = \begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix}$，泡利翻转矩阵为 $X = \operatorname{qubitX} = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$。定义两个以布尔值 $\mathrm{outcome} \in \mathrm{Bool}$ 为指标的测量仪器：

$$
\begin{aligned}
\operatorname{projectiveKraus}(\mathrm{outcome}) &= \begin{cases} I - P_0, & \mathrm{outcome} = \mathrm{true}, \\ P_0, & \mathrm{outcome} = \mathrm{false}, \end{cases} \\
\operatorname{flippedKraus}(\mathrm{outcome}) &= X \cdot \operatorname{projectiveKraus}(\mathrm{outcome}),
\end{aligned}
$$

并定义效应映射 $\operatorname{effect}(K, b) = K(b)^* K(b)$、分支更新 $\operatorname{branch}(K, b, \rho) = K(b)\rho K(b)^*$ 及第二步探测效应 $\operatorname{secondEffect} = I - P_0$。则同时成立以下五条结论：

1. 对一切 $\mathrm{outcome} \in \mathrm{Bool}$，$\operatorname{effect}(\operatorname{projectiveKraus}, \mathrm{outcome}) = \operatorname{effect}(\operatorname{flippedKraus}, \mathrm{outcome})$；
2. $\sum_{\mathrm{outcome}} \operatorname{effect}(\operatorname{projectiveKraus}, \mathrm{outcome}) = I$；
3. $\sum_{\mathrm{outcome}} \operatorname{effect}(\operatorname{flippedKraus}, \mathrm{outcome}) = I$；
4. $\operatorname{bornProbability}\bigl(\operatorname{branch}(\operatorname{projectiveKraus}, \mathrm{false}, P_0),\, \operatorname{secondEffect}\bigr) = 0$；
5. $\operatorname{bornProbability}\bigl(\operatorname{branch}(\operatorname{flippedKraus}, \mathrm{false}, P_0),\, \operatorname{secondEffect}\bigr) = 1$。
:::

::: proof
因 $X^* = X$ 且 $X^2 = I$，对每个 $b \in \mathrm{Bool}$ 有

$$
L_b^* L_b = (X K_b)^* (X K_b) = K_b^* X^* X K_b = K_b^* K_b,
$$

故两族仪器的静态效应元逐项相等，且和均为 $(I - P_0) + P_0 = I$。取初态 $\rho = P_0$ 与第一步结果 $b = \mathrm{false}$：

- 对投影仪器，$K_{\mathrm{false}} = P_0$，分支态为 $P_0 P_0 P_0^* = P_0$，与正交效应 $\operatorname{secondEffect} = I - P_0$ 相乘为零矩阵，故迹为 $0$；
- 对翻转仪器，$L_{\mathrm{false}} = X P_0$，将北极态 $\lvert 0\rangle\langle 0\rvert$ 翻转至南极态 $X P_0 X = I - P_0$，再与 $\operatorname{secondEffect} = I - P_0$ 相乘得 $I - P_0$，其迹恰为 $1$。

完整证明由 Lean 内核检查。
:::

[@prop-static-sequential-separation] 是一剂清醒剂：在时间演化与序贯测量中，左乘幺正翻转 $X$ 虽然在静态效应 $K^* X^* X K = K^* K$ 中被共轭相消，却实实在在地把测量后的出口态从北极掀翻到了南极。因此，**任何声称“顺序无关”的定理，都绝不能把测量仪器压缩成静态效应元，更不能抹掉时间中的算符作用次序**。

::: {.figure src="ch10-same-effect-two-exits"}
**效应元相同，出口态不同。** 两行都从北极 $N$ 出发、都记下结果 $\mathrm{false}$，中间青色的框是同一个效应 $E = P_0$。上一行投影仪器 $K = P_0$ 让琥珀色的点留在北极，下一行翻转仪器 $L = XP_0$ 把它翻到南极；最右是第二道快门 $I - P_0$ 的读数，$0$ 与 $1$（[@prop-static-sequential-separation]）。
:::

## 10.3 毛球、霍普纤维与旋转器球 {#sec-hairy-ball-hopf-rotors}

既然球面上的局部坐标与连续移动处处受制于路径依赖与相位扭转，为什么我们不能干脆在布洛赫球面 $S^2$ 的每一个方向 $p \in S^2$ 上，都事先钉死一根平滑变化的“标准切向量尺子”和“标准零相位旋量代表元”，从而一劳永逸地消灭贝里相位与规范坐标卡切换？

答案藏在微分拓扑最著名的两道全局几何阻碍，以及三维球面 $S^3$ 与二维球面 $S^2$ 的戏剧性反差之中（图 10 中栏；以下三条微分拓扑结论均归入 [@rem-hopf-dirac-monopole-literature]）：

::: {.remark #rem-hopf-dirac-monopole-literature title="S² 毛球障碍、霍普夫主圆丛与 S³ 旋转器全局切标架（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 基球面 $S^2$ 上的两道全局拓扑障碍与总空间 $S^3$ 的全局可平行化对照如下（出处详见 [@rem-gram-hairy-ball-literature]）：

1. **二维球面 $S^2$ 上的毛球定理（切丛障碍，$\chi(S^2) = 2$）**：如果你想在日常的二维球面 $S^2$ 上梳理出一场处处连续且处处非零的切向量场 $v : S^2 \to TS^2$（好比给每个纯态方向连续指定一根正交微扰轴），庞加莱—霍普夫（Poincaré–Hopf）指标定理会当场拦住你——因为 $S^2$ 的欧拉示性数等于 $\chi(S^2) = 2 \neq 0$，任何光滑（乃至连续）切向量场在 $S^2$ 上都**必然至少有一个零点**！例如，将竖直单位向量 $\vv{e}_3$ 投影到球面切平面上：

   $$
   v(p) = \vv{e}_3 - (p \cdot \vv{e}_3)\,p \qquad (p \in S^2).
   $$

   在赤道东极 $p = \vv{e}_1$ 处，$v(\vv{e}_1) = \vv{e}_3 \neq 0$；但在北极 $p = +\vv{e}_3$ 与南极 $p = -\vv{e}_3$ 两处，$v(\pm\vv{e}_3) = 0$，两个孤立零点的指标各为 $+1$，加起来恰好等于 $1 + 1 = 2 = \chi(S^2)$。
2. **霍普夫圆丛的无全局截面障碍（复线丛障碍，第一陈数 $|c_1| = 1$）**：与切丛 $TS^2$（欧拉数 $2$）既有联系又**绝不可混同**的另一道障碍，发生在从单位旋量球面 $S^3 = \{\psi \in \mathbb{C}^2 \mid \norm{\psi} = 1\}$ 投向布洛赫射线球面 $S^2 \cong \mathbb{CP}^1$ 的**霍普夫主圆丛（Hopf principal $S^1$-bundle）**

   $$
   S^1 \hookrightarrow S^3 \xrightarrow{\;\pi\;} S^2
   $$

   上。给球面每个方向 $p \in S^2$ 连续挑选一个确定相位的单位列向量 $\lvert\psi(p)\rangle \in S^3$，在几何上就等于为主圆丛 $\pi : S^3 \to S^2$ 构造一个**全局连续截面** $s : S^2 \to S^3$（满足 $\pi \circ s = \mathrm{id}_{S^2}$）。然而，主圆丛一旦拥有全局连续截面，整座丛就必然拓扑平凡（同胚于直积 $S^2 \times S^1$）；而 $S^3$ 绝不同胚于 $S^2 \times S^1$，该丛的第一陈数（first Chern number）模长为 $1$（而非 $0$）！这就从拓扑上彻底宣判：**不可能在整颗布洛赫球面 $S^2$ 上建立单一、连续、无奇点的全局相位规范**。北极规范势 $A_N = \frac{1}{2}(1 - \cos\theta)\,d\varphi$ 在南极 $\theta = \pi$ 处出现奇弦，南极规范势 $A_S = -\frac{1}{2}(1 + \cos\theta)\,d\varphi$ 在北极 $\theta = 0$ 处出现奇弦，两者在赤道重叠区相差绕数 $1$ 的规范变换 $A_N - A_S = d\varphi$，而曲率二形式 $F = dA_N = dA_S = \frac{1}{2}\sin\theta\,d\theta\wedge d\varphi$ 在整颗球面上的积分正好给出单极拓扑荷 $\frac{1}{2\pi}\int_{S^2} F = 1$。
3. **三维旋转器超球面 $S^3 \cong \mathrm{SU}(2) \subset \mathrm{Cl}^+_{3,0}$ 的全局可平行化（$\chi(S^3) = 0$）**：奇异的事情发生了！虽然二维基球面 $S^2$ 既不能梳平毛发、也不能选出全局相位截面，但一旦我们回到包裹着它的四维空间 $\mathbb{R}^4$ 中的三维单位超球面 $S^3$——即克利福德偶子代数 $\mathrm{Cl}^+_{3,0}$ 中模长为 $1$ 的**旋转器（rotor / 单位四元数）群** $S^3 \cong \mathrm{SU}(2)$——所有的局部切标架障碍瞬间烟消云散！在任意单位旋转器 $p \in S^3$ 处，直接用[第九章](ch09-axes-and-state-addressing.md)的三块单位双矢量 $I_x, I_y, I_z$ 右乘 $p$：

   $$
   \bigl(\, p I_x,\;\; p I_y,\;\; p I_z \,\bigr),
   $$

   由于 $\langle p, p I_j\rangle_{\mathbb{R}^4} = 0$ 且 $\langle p I_j, p I_k\rangle_{\mathbb{R}^4} = \delta_{jk}$，这三根切向量在整颗 $S^3$ 的每一点处都严格单位正交、处处光滑且**永远不为零**（呼应 $\chi(S^3) = 0$）！（注意：旋转器群 $S^3 \cong \mathrm{SU}(2)$ 到三维旋转群 $\mathrm{SO}(3) \cong \mathbb{RP}^3$ 是二对一双覆盖 $\pm p \mapsto R_p$ 而非同构；且总空间 $S^3$ 的全局可平行化是在 $S^3$ 自身切丛 $TS^3$ 上梳平毛发，并不能替投影映射 $S^3 \to S^2$ 提供横跨纤维的全局截面。）
:::

::: {.viz src="berry-loop" preset="comb" height="500"}
**梳不平的一点。** 青色的小箭头是 $v(p) = \vv{e}_3 - (p\cdot\vv{e}_3)p$，竖直方向在切平面上的影子。琥珀色的点从 $+X$ 沿经线向北走，箭头长度 $\sin\theta$ 越来越短，到北极缩成零；紫色圈出的南北两极是这一场仅有的两个零点，指标各为 $+1$（文献结果，未在本书形式化）。
:::

> 二维球面因降维投射而生出极点奇弦；三维旋转器球因保留完整相位纤维而处处平滑。

::: {.figure src="ch10-gauge-winding"}
**北极规范的相位绕南极转满一圈，南极上没有它的值。** 从上往下看南半球，南极在中心。两圈纬线上，每个表盘里青色的指针是北极规范代表元 $\psi_N = \bigl(\cos\frac{\theta}{2}, e^{i\varphi}\sin\frac{\theta}{2}\bigr)$ 的 $\langle 1\mid\psi_N\rangle$ 的相位：沿纬线走一圈，指针也转满一圈；内圈离南极更近，仍是一圈，所以紫色虚线圈处的南极取不到值。霍普夫丛没有全局截面是文献结果，未在本书形式化（[@rem-hopf-dirac-monopole-literature]）。
:::

## 10.4 完整复格拉姆矩阵重构 {#sec-complex-gram-reconstruction}

现在，让我们正面回答章首的核心命题：**既然局部坐标卡在 $S^2$ 上必有奇点、物理旋转操作又依赖于先后顺序，究竟在什么精确数学意义下，量子态满足“两两比较，永远一致，顺序无关”？**

答案是：不要去人为挑选某套外部坐标基 $C$，也不要强行在 $S^2$ 上硬割局部相位截面，而是直接把一族带标签的量子态列向量 $A = [\psi_1, \dots, \psi_n] \in \mathbb{C}^{m \times n}$ 之间所有的**两两复内积**汇总成一张 $n \times n$ 厄米矩阵——**复格拉姆矩阵（complex Gram matrix）**

$$
G = A^* A, \qquad G_{ij} = \langle \psi_i, \psi_j\rangle = \psi_i^* \psi_j \qquad (i, j \in n).
$$

请看这张格拉姆矩阵 $G$ 的性质：

- 在计算任意一项 $G_{ij} = \langle\psi_i, \psi_j\rangle$ 时，只是拿第 $i$ 个态与第 $j$ 个态做一次两两内积比量；你先算 $(1, 2)$ 还是先算 $(0, 2)$，或者把状态标签整体重排（对应 $G \mapsto P^* G P$），表里的每一条两两关系都丝毫不随读取顺序而变；
- 更关键的是，下面的冻结定理证明：**这张两两内积表 $A^* A$ 已经完备地锁死了整族态矢在希尔伯特空间中的全部刚体几何！** 任何另一组态矢 $B \in \mathbb{C}^{m \times n}$，只要它给出的两两复内积表与 $A$ 完全一致（$B^* B = A^* A$），就必然存在外围空间 $\mathbb{C}^m$ 上的**同一个公共幺正变换** $U \in U(m)$，把 $A$ 中的每一根态矢同时刚体旋转为 $B$ 中的对应态矢（$B = UA$）！

::: {.figure src="ch10-common-turn"}
**两两内积表相同，就只差一个公共的转动。** 灰色的三角形 $A$ 连着 $N, +X, +Y$（[@ex-octant-berry-gram] 的三个态），墨色的三角形 $B = UA$（$U = \operatorname{diag}(1, i)$）连着 $N, +Y, -X$；两支紫色的弧箭头是同一个绕竖轴 $90^\circ$ 的转动，它把整块三角形刚性地搬过去，两组态的复格拉姆矩阵逐项相等（[@thm-gram-unitary-reconstruction]）。
:::

::: {.theorem #thm-gram-unitary-reconstruction title="复格拉姆矩阵相等下的公共外围幺正重构定理" lean="D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq"}
设 $m$ 为具有可判等性的有限指标类型（`Fintype m`、`DecidableEq m`），$n$ 为任意有限指标类型（`Finite n`）。对任意两个复矩阵 $B, A \in M_{m \times n}(\mathbb{C})$，若它们的复格拉姆矩阵相等：

$$
B^* B = A^* A,
$$

则存在外围幺正矩阵 $U \in \operatorname{unitaryGroup}(m, \mathbb{C})$，使得

$$
B = U A.
$$
:::

::: proof
条件 $B^* B = A^* A$ 意味着对任意列系数向量 $v \in \mathbb{C}^n$，恒有 $\norm{Bv}^2 = v^* B^* B v = v^* A^* A v = \norm{Av}^2$。因此，在由 $A$ 的列空间张成的子空间 $\operatorname{range}(A) \subseteq \mathbb{C}^m$ 上，映射 $Av \mapsto Bv$ 是良定义的线性等距同构，将 $\operatorname{range}(A)$ 等距映为同维子空间 $\operatorname{range}(B)$。由于外围空间 $\mathbb{C}^m$ 有限维，其正交补 $\operatorname{range}(A)^\perp$ 与 $\operatorname{range}(B)^\perp$ 维数相同，故存在正交补之间的线性等距同构；将两部分直和拼合，即得到全空间 $\mathbb{C}^m$ 上的幺正变换 $U \in U(m)$ 满足对每一列均有 $(UA)_{-,j} = B_{-,j}$，即 $B = UA$。完整证明由 Lean 内核检查。
:::

细读 [@thm-gram-unitary-reconstruction] 的严密边界，每一条都极其重要：

1. **零多余前提**：定理对列向量族 $A, B$ **不要求归一化，不要求方阵或可逆，不要求列满秩或张成全空间，甚至不要求指标集非空**；
2. **存在性与唯一性边界**：定理断言存在公共外围幺正矩阵 $U$ 使 $B = UA$（当 $\operatorname{range}(A)$ 未张满 $\mathbb{C}^m$ 时，$U$ 在正交补子空间上的作用并非唯一；它是一个存在性定理而非数值分解算法）；
3. **必须保留完整复相位与标签对应**：定理的前提是复矩阵等式 $B^* B = A^* A$（含全部复相位 $G_{ij} = \langle\psi_i, \psi_j\rangle$ 且固定列指标 $j \in n$），绝不是仅仅只保留模平方概率 $|G_{ij}|^2$！

特别地，如果一族记录态矢 `record : Index → E` 均已归一化为单位向量（$\norm{\operatorname{record}(i)} = 1$），那么在这张格拉姆表里，何时两个指标 $i$ 与 $j$ 代表完全同一个态矢？下面的冻结引理给出最干净的充要判据：当且仅当它们的两两内积精确等于 $+1$（并且该关系自动构成等价关系）！

::: {.lemma #lemma-unit-gram-equality title="单位态矢两两内积等于 1 的同一性判据与等价关系" lean="D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization"}
设 $\mathbb{K}$ 为实数域或复数域（`RCLike 𝕜`），$E$ 为 $\mathbb{K}$ 上的赋范内积空间，$\mathrm{Index}$ 为任意指标类型，$\operatorname{record} : \mathrm{Index} \to E$ 为满足归一化条件 $\forall i,\; \norm{\operatorname{record}(i)} = 1$ 的向量族。则同时成立：

1. 对任意 $i, j \in \mathrm{Index}$，$\langle \operatorname{record}(i),\, \operatorname{record}(j)\rangle_{\mathbb{K}} = 1 \;\Longleftrightarrow\; \operatorname{record}(i) = \operatorname{record}(j)$；
2. 关系 $(i, j) \mapsto \bigl(\langle \operatorname{record}(i),\, \operatorname{record}(j)\rangle_{\mathbb{K}} = 1\bigr)$ 是 $\mathrm{Index}$ 上的等价关系。
:::

::: proof
对任意单位向量 $u, v \in E$（$\norm{u} = \norm{v} = 1$），展开差向量的范数平方：

$$
\norm{u - v}^2 = \norm{u}^2 - 2\operatorname{Re}\langle u, v\rangle_{\mathbb{K}} + \norm{v}^2 = 2\bigl(1 - \operatorname{Re}\langle u, v\rangle_{\mathbb{K}}\bigr).
$$

若 $u = v$，则 $\langle u, v\rangle_{\mathbb{K}} = \norm{u}^2 = 1$；反之，若 $\langle u, v\rangle_{\mathbb{K}} = 1$，则 $\operatorname{Re}\langle u, v\rangle_{\mathbb{K}} = 1$，代入上式得 $\norm{u - v}^2 = 0$，由赋范空间非退化性知 $u = v$。由此第一条等价性成立；而第二条等价关系性质（自反、对称、传递）由“$\langle\operatorname{record}(i), \operatorname{record}(j)\rangle_{\mathbb{K}} = 1$ 等价于恒等关系 $\operatorname{record}(i) = \operatorname{record}(j)$”立即推出。完整证明由 Lean 内核检查。
:::

请注意 [@lemma-unit-gram-equality] 成立无需完备性或有限维假设，且判据是**内积本身等于 $1$**（$\langle u, v\rangle = 1$），而非模长等于 $1$（$|\langle u, v\rangle| = 1$ 只保证两向量在复数域上差一个相位因子、属于同一条射影射线）。

让我们把本章所有的线索汇聚到下面的综合手算实例中，亲眼看看八分球三角形、复格拉姆矩阵、贝里相位、顺序反例与毛球切向量场如何严丝合缝地扣在一起。

::: {.example #ex-octant-berry-gram title="八分球三角形、复格拉姆矩阵与顺序反例"}
（本例第 1 步中的自旋朝上贝里相位约定 $\gamma_B = -\Omega/2$ 与第 5 步中的庞加莱—霍普夫零点指标和均属**文献结果，未在本书形式化**；详见 [@rem-berry-pancharatnam-holonomy-literature]、[@rem-hopf-dirac-monopole-literature] 与 [@rem-gram-hairy-ball-literature]。）

1. **八分球三顶点与完整复格拉姆矩阵**：在 $\mathbb{C}^2$ 中取对应布洛赫球北极 $+\vv{e}_3$、正东 $+\vv{e}_1$、正北偏内 $+\vv{e}_2$ 的三根单位列向量

   $$
   \psi_0 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}, \qquad
   \psi_1 = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ 1 \end{pmatrix}, \qquad
   \psi_2 = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ i \end{pmatrix}.
   $$

   记 $a = \frac{1}{\sqrt{2}}$，由 [@cor-latitude-complex-overlap]（在 $t = \frac{1}{2}, z = 1, w = i$ 处给出 $\langle\psi_1, \psi_2\rangle = \frac{1+i}{2}$），三态构成的 $3\times 3$ 复格拉姆矩阵 $G = A^* A$（其中 $A = [\psi_0, \psi_1, \psi_2] \in \mathbb{C}^{2\times 3}$）为

   $$
   G = \begin{pmatrix}
   1 & a & a \\
   a & 1 & \frac{1+i}{2} \\
   a & \frac{1-i}{2} & 1
   \end{pmatrix}.
   $$

   计算三点循环巴格曼乘积：

   $$
   \Delta = G_{01} G_{12} G_{20} = \frac{1}{\sqrt{2}} \cdot \frac{1+i}{2} \cdot \frac{1}{\sqrt{2}} = \frac{1+i}{4} = \frac{\sqrt{2}}{4}\,e^{i\pi/4},
   $$

   其模长为 $\frac{\sqrt{2}}{4}$、复辐角为 $\arg\Delta = +\frac{\pi}{4}$。在布洛赫球面上，由 $+\vv{e}_3 \to +\vv{e}_1 \to +\vv{e}_2 \to +\vv{e}_3$ 围成的八分球测地三角形具有有向立体角 $\Omega = \frac{\pi}{2}$；按自旋朝上本征支的标准贝里约定，几何相位为 $\gamma_B = -\frac{\Omega}{2} = -\frac{\pi}{4}$（请明确区分循环内积辐角 $\arg\Delta = +\frac{\pi}{4}$ 与自旋朝上贝里相位约定 $\gamma_B = -\frac{\pi}{4}$ 的正负号对应）。
2. **共同外围幺正变换与标签置换**：取 $2\times 2$ 幺正矩阵 $U = \operatorname{diag}(1, i)$，令 $B = UA$，则 $B^* B = A^* U^* U A = A^* A = G$ 保持完全不变（反之由 [@thm-gram-unitary-reconstruction]，任何满足 $B^* B = G$ 的 $B$ 必由某个公共 $U \in U(2)$ 给出 $B = UA$）。注意：若用置换矩阵 $P$ 重排状态标签，格拉姆矩阵按 $G' = P^* G P$ 协变重排（而非在原下标下字面相等）；且必须保留完整复相位 $\frac{1\pm i}{2}$，单靠模平方 $|G_{ij}|^2$（全部非对角元均为 $\frac{1}{2}$）无法区分 $+\frac{\pi}{4}$ 与 $-\frac{\pi}{4}$ 的手性取向。
3. **主动旋转与投影快门的非对易性**：在 $\mathbb{R}^3$ 中，$R_x(\pi/2)R_y(\pi/2)\vv{e}_3 = \vv{e}_1$，而 $R_y(\pi/2)R_x(\pi/2)\vv{e}_3 = -\vv{e}_2$；在 $M_2(\mathbb{C})$ 中，$P_0 P_+ \neq P_+ P_0$。
4. **静态效应与序贯测量的分离**：按 [@prop-static-sequential-separation]，取 $K_0 = P_0$、$K_1 = I - P_0$ 及 $L_j = X K_j$。两者的静态效应元完全相同（$K_j^* K_j = L_j^* L_j = P_j$）；但从初态 $\rho = P_0$ 出发、第一步测得结果 $0$ 后再测 $P_1 = I - P_0$，未归一化联合玻恩权重对仪器 $K$ 为 $0$，对仪器 $L$ 却为 $1$。
5. **毛球零点指标与旋转器全局标架核对**：在 $S^2$ 上，切向量场 $v(p) = \vv{e}_3 - (p\cdot\vv{e}_3)p$ 在 $p = \vv{e}_1$ 处取 $v(\vv{e}_1) = \vv{e}_3$，仅在南北两极 $p = \pm\vv{e}_3$ 处为零，两个孤立零点指标各为 $+1$，总和为 $2 = \chi(S^2)$；而在单位四元数/旋转器球 $S^3$ 上，$(pI_x, pI_y, pI_z)$ 构成处处非零的全局正交切标架。
:::

::: {.viz src="berry-loop" preset="reverse" height="500"}
**反着走，手性翻转。** 同一个三角形改走 $N \to +Y \to +X \to N$：品红的面积一样大，琥珀色的箭头却往另一边转 $\frac{\pi}{2}$，右下角青色的指针停在 $-\frac{\pi}{4}$。三个相邻内积的模平方仍然都是 $\frac{1}{2}$：只看模平方，分不出这两种走法。
:::

### 10.4.1 无时间诠释：格拉姆几何如何约束因果相容空间？ {#sec-timeless-gram-causality}

> **作者原话**：“顺序无关的本质就是根本不存在前后的时间......因果就是这样必然”,这句话直接把人类困扰了两千五百年的“时间之谜”与“休谟因果死结”一刀劈开了。
>
> **作者原话**：因为观察者是有限的, 所以经历的因果是有限的, 观察者的选择是在因果的相容空间中做选择, 不断在时间场中选点

为什么格拉姆矩阵 $G = A^* A$ 的两两内积账本具有如此彻底的“顺序无关性”？对固定的一族态，数学上的答案是：读取关系表不会改变表中的关系。本书的无时间诠释把这一结构再推进一层：**以量子态几何底层没有“谁先谁后”的单向时间流为诠释前提，把因果必然性理解为全局半正定相容性的几何刚性，并把尚未确定的正交方向理解为有限观察者的“因果相容选择空间”。** 这是本书的自然哲学立场；下面要算清的是它的数学支点，以及从静态相容性走向物理因果与选择所需的额外前提。

我们从四个层面展开这一洞见：

1. **泰勒系数如何支撑“去序化”的图像，又在哪里止步？**
   回想我们在[第三章](ch03-projectors-and-duality.md)探讨过的经典时间轴诞生机制，以及第六章剖析过的余弦泰勒级数：

   $$
   \cos\theta = \sum_{k=0}^{\infty} \frac{(-1)^k}{(2k)!}\,\theta^{2k}.
   $$

   请盯住分母上的阶乘 **$(2k)!$**。泰勒展开中，第 $n$ 项的系数是 $f^{(n)}(0)/n!$，因为对 $\theta^n$ 求 $n$ 次导数会带出 $n!$；余弦在原点的偶阶导数为 $(-1)^k$，才得到这里的系数。组合数学中，$2k$ 个带标签对象确实有 $(2k)!$ 种排列；但只有另行证明这些排列贡献相同、且求和重复计数时，才可以把除以阶乘解释为消除这种冗余。级数本身没有给出这项物理前提。

   在本书的无时间诠释中，可以把这一归一化读作“去序化”的几何图像；**阶乘系数并不由此证明时间不存在，也不把真实的算符作用次序一并消去。** 例如取 $\hbar=1$、固定哈密顿量为泡利矩阵 $H=X$，有明确时间参数的幺正演化 $U(t)=e^{-itX}=\cos t\,I-i\sin t\,X$ 使用完全相同的泰勒系数，且保持 $\cos^2t+\sin^2t=1$。所有态同时受 $U(t)$ 作用时，格拉姆账本也保持不变，单个态却仍可随时间演化。因此，从这种顺序无关性通向“底层无时间”，还需要本书所采取的诠释前提；本章前面算出的非对易旋转与序贯仪器差异仍然成立。

2. **休谟的“因果死结”与斯宾诺莎的三角形：格拉姆行列式的零时间几何刚性**
   两百多年前，大卫·休谟（David Hume）向人类理性投下了一颗重磅炸弹：如果你先预设了“一维先后时间”，那么你在经验世界里永远只能看到“事件 $A$ 先发生，事件 $B$ 随后发生”的习惯性伴随（constant conjunction），却永远找不到任何一条逻辑锁链能证明“$A$ **必然**产生 $B$”。只要把因果关系寄托在“前一个时刻推着后一个时刻走”的时间锁链上，因果必然性就会沦为心理习惯。

   怎么解开休谟死结？早在十七世纪，斯宾诺莎（Baruch Spinoza）在《伦理学》（*Ethics*，第一部分命题 17 附释）中就已经指出了一条完全不依赖时间的道路：最高级的必然性从来不是“前因在时间中推动后果”，而是**几何本性的永恒蕴含**——*“正如从三角形的本性中，必然从永恒到永恒地推出其三内角之和等于两个直角”*。拿一个边长为 $a=3, b=4, c=5$ 的欧氏直角三角形来说：并不是两条直角边 $3$ 和 $4$ 先在时间里长出来，过了几纳秒再去“推动”斜边变成 $5$；只要这三条边在同一个二维平面上首尾闭合、正交成角，斜边在**零时间**里就必然是 $5$，连 $5.00001$ 都不可能！

   这种“斯宾诺莎三角形必然性”的几何图像，可以借**三个实单位向量的格拉姆矩阵半正定性**来说明。以下采用实内积模型：$\mathbf{A},\mathbf{B},\mathbf{C}\in\mathbb{R}^d$ 均为单位向量，例如纯单比特的布洛赫方向对应 $d=3$。这里的实格拉姆矩阵与上一节保留复相位的态矢格拉姆矩阵须加以区分。取通常的向量夹角 $\theta_1,\theta_2,\theta_{AC}\in[0,\pi]$，记

   $$
   c_{AB} = \mathbf{A}\cdot\mathbf{B} = \cos\theta_1, \qquad
   c_{BC} = \mathbf{B}\cdot\mathbf{C} = \cos\theta_2, \qquad
   c_{AC} = \mathbf{A}\cdot\mathbf{C} = \cos\theta_{AC}.
   $$

   由于格拉姆矩阵 $G(\mathbf{A}, \mathbf{B}, \mathbf{C}) = \begin{pmatrix} 1 & c_{AB} & c_{AC} \\ c_{AB} & 1 & c_{BC} \\ c_{AC} & c_{BC} & 1 \end{pmatrix}$ 半正定，其三阶行列式（精确等于三向量所张平行六面体体积的平方 $\norm{\mathbf{A}\wedge\mathbf{B}\wedge\mathbf{C}}^2$）恒满足静态非负约束：

   $$
   \det G(\mathbf{A},\mathbf{B},\mathbf{C}) = 1 - c_{AB}^2 - c_{BC}^2 - c_{AC}^2 + 2\,c_{AB}\,c_{BC}\,c_{AC} \ge 0.
   $$

   对变量 $c_{AC}$ 作配方分解，这一定律立即显露出无比直观的几何结构：

   $$
   \det G = (1 - c_{AB}^2)(1 - c_{BC}^2) - \bigl(c_{AC} - c_{AB}c_{BC}\bigr)^2 = \sin^2\theta_1\sin^2\theta_2 - \bigl(c_{AC} - \cos\theta_1\cos\theta_2\bigr)^2 \ge 0.
   $$

   特别地，当 $\mathbf{A}, \mathbf{B}, \mathbf{C}$ 被彻底压扁在同一个二维关联平面内（三维外积体积 $\mathbf{A}\wedge\mathbf{B}\wedge\mathbf{C} = 0$）时，$\det G(\mathbf{A},\mathbf{B},\mathbf{C}) = 0$ 把第三条内积 $c_{AC}$ 限定在壳层的两个候选端点上：

   $$
   c_{AC} = c_{AB}\,c_{BC} \pm \sqrt{\bigl(1 - c_{AB}^2\bigr)\bigl(1 - c_{BC}^2\bigr)} = \cos\bigl(\theta_1 \mp \theta_2\bigr).
   $$

   两个已知内积一般还不能选定正负分支：例如 $c_{AB}=c_{BC}=\frac12$ 时，共面配置既可有 $c_{AC}=1$，也可有 $c_{AC}=-\frac12$。还须给定两条横向分量位于 $\mathbf{B}$ 轴同侧还是异侧，才能选定分支；若根号为零，两端点才合并。请看这条公式的两层含义：
   - **第一，100% 的顺序无关性（置换对称性）**：公式中没有任何“先后时间戳” $t_1 < t_2 < t_3$；无论你把 $\mathbf{A}, \mathbf{B}, \mathbf{C}$ 的标签如何置换重排，行列式恒等式都纹丝不动；
   - **第二，作为因果诠释支点的几何刚性**：给定两个内积与共面分支，第三个内积便被锁定。这种“必然”是同一实向量配置中的结构相容性；行列式对标签置换的对称性本身没有选出“$A$ 导致 $C$”的方向。本书把它读作因果必然性的几何图像；要描述具体物理过程，仍须给出动力学、仪器及其作用次序。

3. **格拉姆椭圆体（Gram Elliptope）与有限观察者的“因果相容选择空间”**
   那么，几何刚性为什么还允许未定的关系？答案藏在配方不等式里：固定 $c_{AB},c_{BC}$ 后，允许的 $c_{AC}$ 构成一个区间。若残余半径 $\sin\theta_1\sin\theta_2>0$，把 $\mathbf{A}$ 与 $\mathbf{C}$ 分别投影到垂直于 $\mathbf{B}$ 的空间，得到非零横向分量 $\mathbf{A}_\perp=\mathbf{A}-c_{AB}\mathbf{B}$ 与 $\mathbf{C}_\perp=\mathbf{C}-c_{BC}\mathbf{B}$。约定 $\phi\in[0,\pi]$ 是这两条分量的夹角，也就是定向双矢量 $\mathbf{B}\wedge\mathbf{A}$ 与 $\mathbf{B}\wedge\mathbf{C}$ 的夹角，便有下面的加号公式。若改用 $\mathbf{A}\wedge\mathbf{B}$ 与 $\mathbf{B}\wedge\mathbf{C}$ 的夹角，余弦项须反号。

   $$
   c_{AC} = \underbrace{\cos\theta_1\cos\theta_2}_{\text{已知轴向分量之积}} + \underbrace{\cos\phi}_{\text{横向夹角参数 } \in [-1, +1]} \cdot \underbrace{\sin\theta_1\sin\theta_2}_{\text{残余半径}}.
   $$

   在三维关联坐标 $(x, y, z) = (c_{AB}, c_{BC}, c_{AC}) \in [-1, 1]^3$ 中，不等式 $1 - x^2 - y^2 - z^2 + 2xyz \ge 0$ 围成了一个饱满、圆润、如同充气抱枕般的三维凸几何体——这正是半正定规划与量子关联理论中著名的**格拉姆椭圆体（Gram elliptope）**。其中每个点都能由实单位向量实现，但固定环境维数 $d$ 时还须满足 $\operatorname{rank}G\le d$：$d\ge3$ 足以容纳整个椭圆体，$d\le2$ 则只容许 $\det G=0$ 的配置（并仍须满足相应秩界）。
   - **因果诠释中的相容性硬壳**：任何属于此实单位向量模型的配置都不能落在椭圆体外；$\det G<0$ 会要求体积平方为负。本书把这种结构约束理解为因果律的几何铁笼。它限制可相容的关系，却不单独规定时间箭头或因果方向。
   - **有限观察者的因果相容空间**：若观察者只掌握两个内积，且残余半径为正、环境维数至少为 $3$，未读出的横向夹角便留下区间 $[\cos(\theta_1+\theta_2),\,\cos(\theta_1-\theta_2)]$。$\cos\phi=\pm1$ 对应共面端点；$|\cos\phi|<1$ 对应 $\det G>0$ 与非零三维体积。若残余半径为零，区间缩成 $c_{AC}=c_{AB}c_{BC}$，横向夹角不再有定义，也没有这项选择余量。**有限性本身并不保证半径为正，也不保证所有静态相容的补全都能由观察者实际实现。** 将区间读作“选择空间”，还需具体物理系统具有相应的可达状态与控制手段；在这些条件下，本书把选取未定关系理解为观察者在因果相容空间中选点。

4. **严谨认识论边界：区分代数学定理与自然哲学/宇宙学文献**
   在将这一深刻直觉收入囊中时，我们同样保持全书一贯的严格认识论边界：本章经 Lean 4 内核形式化验证的核心结论是复格拉姆矩阵相等下的公共外围幺正重构定理（[@thm-gram-unitary-reconstruction]）、单位内积等价判据（[@lemma-unit-gram-equality]）以及静态效应与序贯测量的分离反例（[@prop-static-sequential-separation]）；而三阶实格拉姆行列式配方恒等式 $\det G(\mathbf{A},\mathbf{B},\mathbf{C}) = \sin^2\theta_1\sin^2\theta_2 - (c_{AC} - \cos\theta_1\cos\theta_2)^2 \ge 0$ 与格拉姆椭圆体几何则是内积空间与凸几何的标准数学结论。将这种“顺序无关的格拉姆几何刚性与因果相容选择空间”同休谟因果问题、斯宾诺莎几何必然性以及无时间量子宇宙学（惠勒—德维特方程与佩奇—伍特斯条件时间机制）相融合，则属于物理学与科学哲学的跨学科诠释框架——我们将在第八部的[第二十九章](ch29-timeless-causality-and-gram-space.md)（衔接[第二十章](ch20-complexity-and-spacetime.md)的电路复杂度下界）中，从有限观察者在时间场中“半正定矩阵补全选点”的高度对这幅图景作完整的展开。

::: {.remark #rem-gram-hairy-ball-literature title="毛球与霍普障碍：文献结果，未在本书形式化"}
**文献结果，未在本书形式化。** 本章第 3 节、第 1 节与第 4 节涉及的微分拓扑、几何相位与因果哲学经典文献，其严格前提与文献归属如下：

1. **庞加莱—霍普夫定理与偶维球面毛球定理**（参见 J. W. Milnor, *Topology from the Differentiable Viewpoint*, University Press of Virginia, 1965）：在紧致定向光滑流形 $M$ 上，任何仅有孤立零点的光滑切向量场，其零点指标之和等于欧拉示性数 $\chi(M)$。对偶维球面 $S^{2n}$（$n \ge 1$），$\chi(S^{2n}) = 2 \neq 0$，故其上不存在处处非零的连续切向量场（连续情形由光滑逼近导出；如 [@ex-octant-berry-gram] 中的双极零点场 $v(p) = \vv{e}_3 - (p\cdot\vv{e}_3)p$，两极零点指标之和为 $1 + 1 = 2$）。
2. **霍普夫主圆丛、第一陈数与狄拉克单极势**（参见 P. A. M. Dirac, *Quantised singularities in the electromagnetic field*, Proc. R. Soc. A **133**, 60–72, 1931, DOI `10.1098/rspa.1931.0130`；以及 M. Nakahara, *Geometry, Topology and Physics*, 2nd Ed., Institute of Physics Publishing, 2003）：霍普夫纤维化 $S^1 \hookrightarrow S^3 \to S^2$ 是 $S^2$ 上的非平凡主 $S^1$ 丛，其第一陈数模长为 $|c_1| = 1$；由于主丛存在全局连续截面当且仅当该主丛平凡，故 $S^3 \to S^2$ 不存在全局连续截面。在狄拉克单极联络约定下，北半球局部联络一形式 $A_N = \frac{1}{2}(1 - \cos\theta)\,d\varphi$ 与南半球局部联络一形式 $A_S = -\frac{1}{2}(1 + \cos\theta)\,d\varphi$ 在赤道带满足过渡关系 $A_N - A_S = d\varphi$，曲率二形式 $F = \frac{1}{2}\sin\theta\,d\theta\wedge d\varphi$ 满足 $\frac{1}{2\pi}\int_{S^2} F = 1$（注：此为指定单极联络约定；对应 $\gamma_B = -\Omega/2$ 的自旋朝上贝里曲率取相反符号）。切勿将球面切丛 $TS^2$（欧拉数 $2$）与霍普夫复线丛（第一陈数 $\pm 1$）混同。
3. **三维旋转器球 $S^3 \cong \mathrm{SU}(2) \subset \mathrm{Cl}^+_{3,0}$ 的全局可平行化**：单位旋转器构成三维欧氏克利福德偶子代数 $\mathrm{Cl}^+_{3,0}$ 的单位球面 $S^3 \cong \mathrm{SU}(2)$，其欧拉示性数 $\chi(S^3) = 0$，且由显式左平移标架 $(pI_x, pI_y, pI_z)$ 给出全局非零正交切标架（而非仅凭 $\chi(S^3) = 0$ 推断可平行化）。映射 $\mathrm{SU}(2) \to \mathrm{SO}(3)$ 是二对一双覆盖而非同构；总空间 $S^3$ 的可平行化并不给出基空间 $S^2$ 上的全局截面。
4. **贝里几何相位与西蒙和乐解释**（参见 M. V. Berry, *Quantal phase factors accompanying adiabatic changes*, Proc. R. Soc. A **392**, 45–57, 1984, DOI `10.1098/rspa.1984.0023`；以及 B. Simon, *Holonomy, the quantum adiabatic theorem, and Berry's phase*, Phys. Rev. Lett. **51**, 2167, 1983, DOI `10.1103/PhysRevLett.51.2167`）：在剥离动力学相位并固定定向与自旋朝上本征支后，沿 $S^2$ 闭合回路绝热平行移动获得的几何相位为 $\gamma_B = -\Omega/2$。这一非平凡和乐在完整保留复内积信息时依然存在；格拉姆矩阵的两两自洽性并不抹杀物理算符的真实非对易性。
5. **休谟因果问题、斯宾诺莎几何必然性与无时间量子关联文献**（参见 D. Hume, *A Treatise of Human Nature*, 1739 / *An Enquiry Concerning Human Understanding*, 1748；B. Spinoza, *Ethica, Ordine Geometrico Demonstrata*, 1677, Part I, Prop. 17 Scholium；以及[第二十九章](ch29-timeless-causality-and-gram-space.md)将详述的 B. S. DeWitt, *Phys. Rev.* **160**, 1113, 1967 与 D. N. Page, W. K. Wootters, *Phys. Rev. D* **27**, 2885, 1983）：本章第 4 节关于“顺序无关性与格拉姆几何因果刚性”的讨论，其代数核心是半正定格拉姆矩阵约束 $\det G(\mathbf{A},\mathbf{B},\mathbf{C}) \ge 0$ 与 [@thm-gram-unitary-reconstruction]；将其与休谟经验主义因果批判、斯宾诺莎几何必然性及无时间量子态诠释相联系属于科学哲学与基础物理诠释，未在本书 Lean 代码库中形式化。
:::

::: {.viz src="berry-loop" height="560"}
完整实验室：拖动青色的顶点、在边上加点或反着走，比较品红的面积、琥珀色箭头的转角与右下角青色指针的相位；也可以切到“转序”与“梳毛”两个场景。
:::

至此，我们在理论上彻底澄明了球面转序、贝里相位与格拉姆矩阵重构的关系。那么，当我们走进真正的超导量子计算实验室，工程师们究竟是用什么物理手段在芯片上拨动这颗三维球面上的方向箭头？为什么绕 $X, Y$ 轴转需要实打实地发射几十纳秒的微波脉冲，而绕 $Z$ 轴转却可以在理想脉冲调度下做到**“零附加模拟脉冲时长”**？让我们进入[第十一章](ch11-pulses-and-virtual-z.md)。
