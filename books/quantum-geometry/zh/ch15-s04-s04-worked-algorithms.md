# 15.4.1 Grover、QFT 与 Shor 的完整手算 {#sec-ch15-s04-s04-worked-algorithms}

下面，让我们通过一个四步完整手算算例，把 $N=4$ 与 $N=8$ 的 Grover 搜索、$3$ 比特 QFT 的二进制相位齿轮、$N=15$ 的 Shor 周期寻找以及 $\mathrm{ZMod}\,16$ 上的字符和与泊松公式逐一验算到底。

::: {.example #ex-grover-four-shor-fifteen title="Grover N=4/N=8 搜索、3 比特 QFT 相位齿轮与 Shor N=15 阶寻找手算及证据边界"}
本例第一步与第四步具体验算本章的 [@thm-grover-uniform-rotation]、[@prop-finite-character-cancellation] 与 [@cor-finite-poisson-period]；第二步按 [@thm-qft-circuit-action] 的正指数、大端、含末端位反转规范展开三比特相位。手算的张量乘积式用于解释这一规范，不额外认证所有张量恒等式。第三步由真阶的 Good 条件得到双侧 $\gcd(a^{r/2} \pm 1,N)$ 真因子的步骤已在 [@ex-shor-actual-unit-factors] 推导；完整 Shor 阶寻找与递归分解实现仍保留 [@rem-grover-qft-shor-literature] 的文献与算法边界。

本例分四步完成本章全部核心公式的具体数值检验：

**第一步：Grover 搜索在 $N = 4$ 上的单步精确命中与 $N = 8$ 的整数步残差。**
取四维搜索空间 $l = \mathrm{Fin}\,4$、单列源 $s = \mathrm{Fin}\,1$，设唯一标记目标为 $|0\rangle$，即 $P = |0\rangle\langle 0|$。取源嵌入 $J = |0\rangle$，制备幺正阵 $C = H \otimes H$，故制备态为均匀叠加态

$$
U = C J = |s\rangle = \frac{1}{2}\bigl(|0\rangle + |1\rangle + |2\rangle + |3\rangle\bigr).
$$

计算成功格拉姆矩阵：$(PU)^*(PU) = |\langle 0\mid s\rangle|^2 = \frac{1}{4}$，故初始成功概率 $p = \frac{1}{4}$，初始倾角为

$$
\alpha = \arcsin\Bigl(\sqrt{\frac{1}{4}}\Bigr) = \arcsin\Bigl(\frac{1}{2}\Bigr) = \frac{\pi}{6} = 30^\circ.
$$

此时归一化成功块与失败块分别为 $W = |0\rangle$ 与 $B = \frac{1}{\sqrt{3}}(|1\rangle + |2\rangle + |3\rangle)$。作用一次 Grover 迭代算子 $Q = (2|s\rangle\langle s| - I_4)(I_4 - 2P)$（取 $n = 1$），由 [@thm-grover-uniform-rotation] 得：

$$
Q U = \sin(3\alpha)\,W + \cos(3\alpha)\,B = \sin\Bigl(\frac{\pi}{2}\Bigr)|0\rangle + \cos\Bigl(\frac{\pi}{2}\Bigr)B = 1 \cdot |0\rangle + 0 \cdot B = |0\rangle!
$$

仅需 $n = 1$ 步，状态向量从 $30^\circ$ 再转 $2\alpha = 60^\circ$，分毫不差地垂直立在目标 $|0\rangle$ 上（成功率 $100\%$）。

作为对比，若将搜索空间扩大到 $N = 8$（仍含 $1$ 个标记项），则 $p = \frac{1}{8}$，$\theta = \arcsin(1/\sqrt{8}) \approx 20.7048^\circ$。利用三倍角公式 $\sin(3\theta) = 3\sin\theta - 4\sin^3\theta = \frac{3}{\sqrt{8}} - \frac{4}{8\sqrt{8}} = \frac{5}{2\sqrt{8}} = \frac{5}{\sqrt{32}}$，迭代 $n = 1$ 步后的成功概率为

$$
P_{\mathrm{succ}}(N=8,\, n=1) = \sin^2\Bigl(3\arcsin\frac{1}{\sqrt{8}}\Bigr) = \frac{25}{32} = 0.78125,
$$

而迭代 $n = 2$ 步后的成功概率为 $\sin^2(5\theta) = \frac{121}{128} = 0.9453125 < 1$。这直观展示了当 $\frac{\pi}{4\theta} - \frac{1}{2} \notin \mathbb{N}$ 时，标准整数步 Grover 迭代必然留有非零的离散角度残差。

**第二步：$3$ 比特量子傅里叶变换（QFT）的位序规范与 $x = 5 = (101)_2$ 相位齿轮验算。**
在 $3$ 比特空间（$m = 8$）中，我们明确采用**输出从最高有效位（MSB）到最低有效位（LSB）排列**的张量因子顺序（即标准 QFT 电路末端显式包含位反转 SWAP 门）。将输入整数 $x \in \{0, \dots, 7\}$ 写为二进制 $x = x_2 x_1 x_0 = 4x_2 + 2x_1 + x_0$，并记二进制小数 $0.b_1 b_2 \cdots b_r = \sum_{j=1}^r b_j 2^{-j}$。则正指数单位化 QFT $\mathcal{F}_+|x\rangle = \frac{1}{\sqrt{8}}\sum_{k=0}^7 e^{+2\pi i k x / 8}|k_2 k_1 k_0\rangle$ 精确分解为三个单比特赤道态的张量积：

$$
\mathcal{F}_+|x_2 x_1 x_0\rangle = \frac{|0\rangle + e^{2\pi i (0.x_0)}|1\rangle}{\sqrt{2}} \otimes \frac{|0\rangle + e^{2\pi i (0.x_1 x_0)}|1\rangle}{\sqrt{2}} \otimes \frac{|0\rangle + e^{2\pi i (0.x_2 x_1 x_0)}|1\rangle}{\sqrt{2}}.
$$

请特别注意位序对应关系：各因子的相位由输入低位逐步向高位扩展（$0.x_0 \to 0.x_1 x_0 \to 0.x_2 x_1 x_0$），但**输出的第 1 个张量因子对应频率 $k = 4k_2 + 2k_1 + k_0$ 的最高位 $k_2$**（因为 $4k_2 \cdot x / 8 \equiv k_2 \cdot (0.x_0) \pmod 1$），绝不能把做完末端 SWAP 前后的相反位序画成同一个公式！

取具体输入 $x = 5 = (101)_2$（即 $x_2 = 1, x_1 = 0, x_0 = 1$），三只赤道相位齿轮的转角依次为：

1. **首因子（对应输出最高位 $k_2$）**：二进制小数 $0.x_0 = 0.1_2 = \frac{1}{2}$，相位角 $\phi_1 = 2\pi \cdot \frac{1}{2} = \pi$（$e^{i\pi} = -1$）；
2. **中因子（对应输出中位 $k_1$）**：二进制小数 $0.x_1 x_0 = 0.01_2 = \frac{1}{4}$，相位角 $\phi_2 = 2\pi \cdot \frac{1}{4} = \frac{\pi}{2}$（$e^{i\pi/2} = i$）；
3. **末因子（对应输出最低位 $k_0$）**：二进制小数 $0.x_2 x_1 x_0 = 0.101_2 = \frac{5}{8}$，相位角 $\phi_3 = 2\pi \cdot \frac{5}{8} = \frac{5\pi}{4}$；

三因子合并后总归一化因子恰为 $\frac{1}{\sqrt{2}} \cdot \frac{1}{\sqrt{2}} \cdot \frac{1}{\sqrt{2}} = \frac{1}{\sqrt{8}}$。

**第三步：Shor 阶寻找算例 $N = 15$、底数 $a = 2$、寄存器容量 $Q = 16$。**
考察待分解合数 $N = 15$，选与 $15$ 互素的底数 $a = 2$。模幂序列 $2^x \bmod 15$（$x = 0, 1, 2, 3, 4, \dots$）依次为

$$
1,\; 2,\; 4,\; 8,\; 1,\; 2,\; 4,\; 8,\; \dots,
$$

其乘法阶（最小正周期）为 $r = 4$。取第一寄存器大小 $Q = 16$（这是一个 $r \mid Q$ 的精确整除教学算例）。在制备均匀叠加 $\frac{1}{4}\sum_{x=0}^{15}|x\rangle|2^x \bmod 15\rangle$ 并条件测得第二寄存器函数值为 $1$ 后，第一寄存器坍缩到以 $r = 4$ 为步长的周期态：

$$
|\psi_{\mathrm{per}}\rangle = \frac{1}{2}\bigl(|0\rangle + |4\rangle + |8\rangle + |12\rangle\bigr).
$$

对其作用 $16$ 点单位化 QFT $\mathcal{F}_+$，输出在第 $k$ 个频点（$k \in \{0, \dots, 15\}$）上的振幅为

$$
\alpha_k = \frac{1}{2\sqrt{16}}\sum_{j=0}^3 e^{2\pi i k (4j) / 16} = \frac{1}{8}\sum_{j=0}^3 \bigl(e^{2\pi i k / 4}\bigr)^j = \begin{cases} \frac{1}{2} & \text{若 } k \in \{0, 4, 8, 12\}, \\ 0 & \text{若 } k \notin \{0, 4, 8, 12\}. \end{cases}
$$

于是测量仅以各 $\bigl|\frac{1}{2}\bigr|^2 = \frac{1}{4}$ 的概率落在四个共振频点 $k \in \{0, 4, 8, 12\}$ 上，其余 $12$ 个频点概率严格为 $0$。逐一核查这四个测量结果的后处理结局：

- **测得 $k = 4$ 或 $k = 12$（共占概率 $1/2$）**：频率比 $k/Q$ 分别为 $4/16 = 1/4$ 或 $12/16 = 3/4$，既约分母均直接给出真实阶 $r = 4$。因 $r = 4$ 为偶数且 $2^{r/2} = 2^2 = 4 \not\equiv -1 \pmod{15}$，计算最大公因数立即分解成功：

  $$
  \gcd(2^{4/2} - 1,\, 15) = \gcd(3, 15) = 3, \qquad \gcd(2^{4/2} + 1,\, 15) = \gcd(5, 15) = 5 \qquad (15 = 3 \times 5)!
  $$

- **测得 $k = 0$（概率 $1/4$）**：给出 $k/Q = 0$，不含周期信息，需重新采样；
- **测得 $k = 8$（概率 $1/4$）**：给出 $k/Q = 8/16 = 1/2$，既约分母为 $d = 2$（仅是真阶 $r = 4$ 的真因子）；代入验证 $2^2 = 4 \not\equiv 1 \pmod{15}$ 可发现 $d = 2$ 尚非完整周期，需倍增检验 $2d = 4$ 或重新运行采样。（因此绝不能声称单次量子采样以 $100\%$ 概率直接吐出周期 $r$！）

**第四步：用 [@prop-finite-character-cancellation] 与 [@cor-finite-poisson-period] 在 $\mathrm{ZMod}\,16$ 上交叉验算。**
在 $m = 16$ 的循环群 $\mathrm{ZMod}\,16$ 中，取加法子群 $H = \{0, 4, 8, 12\}$（基数 $|H| = 4$）。由于 $k \cdot 4 \equiv 0 \pmod{16} \iff 4 \mid k$，其零化子子群恰为自身：

$$
\mathrm{annihilator}(H) = H^\perp = \{0, 4, 8, 12\}, \qquad \mathrm{Fintype.card}\bigl(\mathrm{annihilator}(H)\bigr) = 4.
$$

1. **核对 [@prop-finite-character-cancellation]**：当 $x \in H$ 时，$\sum_{k \in H^\perp} \chi_k(x) = 1 + 1 + 1 + 1 = 4 = |H^\perp|$；当 $x \notin H$（例如 $x = 1$）时，$\sum_{k \in H^\perp} \chi_k(1) = 1 + i + (-1) + (-i) = 0$。
2. **核对 [@cor-finite-poisson-period]**：取子群示性函数 $f = \mathbf{1}_H$。按 Mathlib 负号未归一化定义，对每个 $k \in H^\perp$，有 $(\mathrm{ZMod.dft}\,\mathbf{1}_H)(k) = \sum_{h \in H} e^{-2\pi i h k / 16} = 4$（对 $k \notin H^\perp$ 则为 $0$）。代入 [@cor-finite-poisson-period]：左端为 $\sum_{h : H} \mathbf{1}_H(h.1) = 4$；右端为

   $$
   \frac{|H|}{16} \sum_{k : \mathrm{annihilator}(H)} (\mathrm{ZMod.dft}\,\mathbf{1}_H)(k.1) = \frac{4}{16} \times (4 + 4 + 4 + 4) = \frac{1}{4} \times 16 = 4,
   $$

   两侧分毫不差！
:::

回看例中第一步：$N = 4$ 时只需一步，箭头就立在目标上。

::: {.viz src="grover-reflections" preset="four" height="500"}
**$N = 4$：一步立在目标上。** $\theta = 30^\circ$，一步转 $60^\circ$，琥珀色的箭头正好落在目标轴 $W$ 上：青色的影子长 $1$，品红的影子消失，第 $1$ 根柱子顶到 $1$。
:::

$N = 8$ 时走两步仍差一点，成功概率停在 $\frac{121}{128}$。

::: {.viz src="grover-reflections" preset="eight" height="500"}
**$N = 8$：两步之后还差一点。** 第 $1$ 步后成功概率 $\frac{25}{32}$，第 $2$ 步后 $\frac{121}{128}$：箭头停在 $5\theta \approx 103.5^\circ$，略过竖轴，品红的影子还剩 $-0.234$。
:::

第三步的周期态经过 QFT，只在 $k \in \{0, 4, 8, 12\}$ 四个频点上留下峰。

再由峰读阶：$k = 4$ 与 $12$ 直接给出阶 $4$，$k = 8$ 只给出它的真因子 $2$，$k = 0$ 不含信息。

::: {.viz src="phase-gears" preset="read" height="500"}
**由峰读出阶。** 同一个谱：$k = 4$ 与 $12$ 给出 $\frac{4}{16} = \frac{1}{4}$、$\frac{12}{16} = \frac{3}{4}$，分母是阶 $4$；琥珀色框住的 $k = 8$ 只给出 $\frac{1}{2}$，分母 $2$ 是阶的真因子，要再检验；$k = 0$ 不含信息。
:::

::: {.remark #rem-grover-qft-shor-literature title="Grover 查询下界、QFT 理想计数与完整 Shor 算法的边界"}
<!-- alias: #rem-shor-factoring-literature -->
本章的 Lean 引用覆盖均匀振幅放大、Weyl 共轭、字符相消与有限泊松恒等式，以及实际 QFT 电路作用与原生事件计数（[@thm-qft-circuit-action]、[@thm-qft-native-event-count]）、单相位圆周尾界（[@thm-qpe-circular-tail]）、实际输入边缘分布与逐点下界、有理列表长度和条件候选成员资格。上文将实际混合、最近格点下界与候选恢复组合，推导了 $N^2\le Q$ 下单次列表成员事件的 $\frac4{\pi^2}\frac{\varphi(r)}r$ 下界，并在显式独立重置前提下得到恰好两次观察的全配对最小公倍数列表事件下界 $8/\pi^4$；后者使用联合本原相位对的充分半密度界。正指数规范须反射两次观察的两个标号，原生正指数电路作用于同一受控态时也使用这个修正事件。[@thm-half-order-family-failure-count] 另给出任意非空有限循环群族的失败计数，[@ex-shor-actual-unit-factors] 将其经实际单位 CRT 搬运为均匀 Good 下界，并在同一事件上证明双侧 gcd 真因子。本章的列表选择规则还给出真阶在完整菜单中时返回真阶的精确对应，并将两次独立观察的成员下界转为精确输出概率下界；每次返回是否精确仍无识别证书。以下第 1 项和第 3 项的其余完整算法结论仍是**文献结果，未在本书形式化**；第 2 项只总结上述电路的理想计数及其成本边界。

1. **Grover 搜索与黑盒查询复杂度下界**（L. K. Grover, *A fast quantum mechanical algorithm for database search*, Proc. 28th ACM STOC, 212–219, 1996, [10.1145/237814.237866](https://doi.org/10.1145/237814.237866)；G. Brassard, P. Høyer, M. Mosca, and A. Tapp, *Quantum amplitude amplification and estimation*, Contemp. Math. **305**, 53–74, 2002, [arXiv:quant-ph/0005055](https://arxiv.org/abs/quant-ph/0005055)）：在已知解数 $M$、承诺 $1 \le M \le N/4$ 的 $N$ 元无结构搜索中，从均匀叠加态出发，按已知初始成功概率 $p = M/N$ 选取迭代步数，振幅放大以 $O(\sqrt{N/M})$ 次标记黑盒查询将成功概率提升至 $\ge 1 - M/N$。这一稀疏解承诺下，任何量子黑盒算法要以常数有界误差找到解，都需要 $\Omega(\sqrt{N/M})$ 次查询（由 Bennett–Bernstein–Brassard–Vazirani (1997) 的单解黑盒下界归约得到），证实这一黑盒任务中的二次加速已达量子几何极限。
2. **同一 QFT 电路的理想原生门数**：[@thm-qft-native-event-count] 给出 $q$ 个 Hadamard、$q(q-1)/2$ 个受控相位和 $\lfloor q/2\rfloor$ 个 SWAP，合计 $\frac{q(q+1)}2+\lfloor q/2\rfloor$ 次理想原生门出现。由此作通常的渐近计数，得到 $O(q^2)=O((\log Q)^2)$（$Q=2^q$）；电路对已制备复向量的精确正指数作用由 [@thm-qft-circuit-action] 给出。任意输入数据的装载、全部傅里叶系数的经典读出、理想相位门到有限离散门集的综合及硬件性能，都不包含在这个计数中。
3. **Shor 大数分解与阶寻找的完整正确性条件**（P. W. Shor, *Polynomial-time algorithms for prime factorization and discrete logarithms on a quantum computer*, SIAM J. Comput. **26**, 1484–1509, 1997, [10.1137/S0097539795293172](https://doi.org/10.1137/S0097539795293172)）：对于一般合数 $N$（非偶、非素数幂）与随机互素底数 $a$，乘法阶 $r$ 通常不整除 $Q=2^q$。完整算法选取 $N^2\le Q<2N^2$，通过可逆模幂电路在 $O((\log N)^3)$ 基本门内制备相应联合态，再经 QFT 采样。上述单次候选事件与两次独立重置的全配对最小公倍数事件推导覆盖实际模乘模型中的相应列表成员概率；它们没有认证可逆模幂的门实现。后续列表选择应用保证真阶在菜单中时必被选中，并给出精确输出事件的概率下界；模幂通过的任意返回值仍可能是真阶的较大倍数。欧拉函数比值的渐近估计 $\varphi(r)/r=\Omega(1/\log\log r)$ 仍按文献使用，不能把混合中的计数比例改称额外随机相位实验。经典部分现由 [@thm-half-order-family-failure-count] 与 [@ex-shor-actual-unit-factors] 覆盖：对奇数 $N>1$，在完整单位群上均匀抽样的 Good 概率至少为 $1-2^{-(k-1)}$；非素数幂时 $k\ge2$，故至少为 $1/2$，且同事件中的每个自然数底数代表元都给出双侧真因子。这保留全部实际素数幂指数，单位元也留在抽样载体内。该经典概率与固定底数下的量子候选事件使用不同抽样律，尚未在此组成一个共同实验的端到端概率。高效单位采样、从完整候选最小公倍数列表认证精确阶、任意相关重复的保证、理想相位采样的精确欧拉乘积律、完整递归分解实现与位／门复杂度仍不由这些结果给出。两次重置的独立性是明确采用的联合采样前提，不能由两份边缘分布相同而推出。（注：将周期提取比作“把无穷周期因式约分到 $1$”属于启发式几何直觉，绝非已形式化的数学结论。）
:::

::: {.viz src="phase-gears" height="560"}
相位齿轮与周期的完整实验室：换寄存器大小 $Q$、周期 $r$ 与起点，点谱上的柱子选频率 $k$，看它的相位箭头首尾相接；$r$ 整除 $Q$ 且梳子构成完整陪集（起点 $x_0<r$）时，不共振的链闭合为零（[@prop-finite-character-cancellation]）。本页梳子不绕回，边界截短会改变峰高并留下不共振的权重。$r$ 不整除 $Q$ 时谱仍是梳子实际各格箭头的有限和：在 Shor 的设定下（起点 $x_0<r$、梳子铺到寄存器末端，$Q \ge N^2 > r^2$），峰集中在 $sQ/r$ 附近，这种总集中保持文献身份，页面连分数读数仍要检验；[@thm-shor-nearest-candidate] 只在实际参数、分辨率和最近条件成立时保证候选成员资格；截短的梳子可以没有这种集中，只剩一格时谱是平的。
:::

看着 Grover 的二维平面旋转与 QFT 的傅里叶相消，一个更宏大的问题油然而生：**为什么这两类看似风马牛不相及的量子算法，背后都在反复交替调用“酉算子嵌入”与“相位反射/旋转”？有没有一套更高维的几何母框架，能够把搜索、相位估计、哈密顿量模拟乃至矩阵求逆统统收编为同一个二维块上的切比雪夫多项式递推？而在走下理想算法的云端、把连续旋转编译成有限个离散量子门 $\{H, T\}$ 时，我们手里的球体又会露出怎样棱角分明的多面体真相？** 让我们迈入第四部的收官之章——[第十六章](ch16-qsvt-walks-and-compilation.md)。
