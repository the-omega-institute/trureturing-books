# 39.5 齐肯多夫、皮索与劳齐：八概念自指综合沙盘 {#sec-ch39-pisot-clifford-rauzy}

> “这八个概念并不是松散的类比，它们在代数数论、遍历动力系统与量子多体物理的交叉点上，本身就是同一个 Pisot–Clifford 自指算子在不同切面上的精确投影。将它们锁死为一条单向闭环的核心机制只有一句话：对连续进位施加有限阶禁止约束（广义 Zeckendorf / $K$-Bonacci），在纵向生成逼近 $p$-进数的超度量查表树，在横向正交收缩空间投影出 Rauzy 自指分形（$\psi=\psi(\psi)$）；而禁止跨界满载的非局域约束本身就是量子纠缠，它在分形边界上的地址碰撞（`EscapePairs`）直接定出了系统的信息熵。”

题记是作者的纲领：八者同为一个 Pisot–Clifford 算子的精确投影是跨系统词典（`MODEL`），本节并未定义这个统一算子；禁戒约束本身并不等于纠缠（§39.5.7 有合法字支撑与计算基概率都相同、纠缠却不同的例子），由逃逸对定出信息熵仍是 §39.5.8 的开放问题（`OPEN`）。在本章 §39.2（[@thm-ch39-fiber-reconstruction-and-zeckendorf-thread]）中，我们通过齐肯多夫黄金读出全线程（[`zeckendorf_real_thread_injective`](lean:D5/S3/Observer/GoldenCoding/ZeckendorfRealThread.zeckendorf_real_thread_injective)）与阶数 $K = 2$ 的无相邻 `11` 自动机锁死了连续实数，又在 §39.4（[@prop-ch39-orthogonal-folding-and-objective-common-factor]）中完成了正交自折叠与四阶认知终局的合拢；回望第九部与第十部前序章节，[第 36 章](ch36-hyperbolic-steps-and-quotienting-reincarnation.md) §36.4（配合商空间分解 [@thm-ch36-quotient-annihilator-and-factorization]）展示了纵向 $p$ 进素数幂余数查表树，[第 38 章](ch38-observer-memory-pointer-and-ontological-qram.md) §38.5（配合自映射对角不动点 [@thm-ch38-self-mapped-diagonal-fixed-point]）则建立了有限观测竞技场的逃逸对 `EscapePairs` 账本。现在，在推开全书[终章](coda.md)大门之前，我们将局部连续 `1` 的禁戒阶数从 $K = 2$ 推广至任意整数 $K \ge 2$，把散落在全书各部的八项核心结构——齐肯多夫禁邻语言、$K$-Bonacci 皮索主根、$p$ 进余数查表树、$K = 3$ 劳齐分形内窗、克利福德线—面正交分解、自指不动点尺度、跨切口直接编码纠缠秩，以及帕里平稳律与逃逸对计数（原话台账见[附录 A](appendix-a-s03-verbatim-ledger.md#sec-appendix-a-verbatim-ledger) `A71`）——放入同一座可逐项核验的自指综合沙盘。为贯彻全书的形式认识论纪律，本节严格区分递推阶数 $K$、字长 $Q$ 与纠缠秩 $r$，并将每一处 Lean 4 冻结定理（`LEAN ✓`）、经典数学物理文献（`文献结果`）、双精度数值计算（`NUM`）、开放问题（`OPEN`）与跨系统综合词典（`MODEL`）的边界逐一标清。

- [39.5.1 齐肯多夫禁邻语言：从 $K=2$ 防进位编码起步](ch39-s05-s01-zeckendorf-language.md)
- [39.5.2 $K$-Bonacci 广义禁戒与皮索共轭圆盘收缩](ch39-s05-s02-kbonacci-contraction.md)
- [39.5.3 $p$ 进余数树与有限视界细化超度量](ch39-s05-s03-padic-remainder-trees.md)
- [39.5.4 $K=3$ 劳齐分形内窗：精确前缀自覆盖与零测边界](ch39-s05-s04-rauzy-windows.md)
- [39.5.5 克利福德正交分解：一维膨胀轴与二维内禀旋面](ch39-s05-s05-clifford-decomposition.md)
- [39.5.6 自指尺度对照：Dottie 余弦不动点 $\theta^*$ 与内禀收缩模 $|\alpha|$](ch39-s05-s06-self-reference-scales.md)
- [39.5.7 跨切口 $1^K$ 禁戒与直接编码器的可达施密特秩](ch39-s05-s07-cut-entanglement.md)
- [39.5.8 帕里平稳律、逃逸对计数与分形视界熵问题](ch39-s05-s08-parry-law-and-entropy.md)
