# 附录 K Shor 有限周期采样、连分数观察事件与可执行取阶证书 {#sec-appendix-k}

在[第十五章 15.4 节](ch15-s04-shor-order-reconstruction.md)中，我们以有限泊松求和公式与相位齿轮直观呈现了整除时的对偶梳子与非整除时的频谱摊开，并紧接在[§15.4.1](ch15-s04-s04-worked-algorithms.md)给出了 Grover、QFT 与 Shor 的完整手算。从理想频率梳到真实有限模数下的实际计数边缘分布、连分数渐近分母的条件观察事件，再到可执行取阶与因子证书的逐条 Lean 形式化定理，构成一套严密而细密的概率与数论接口证明链。本附录集中收录这三部分完整推导，供需要核验每一步采样界与证书条件的读者查阅：

- [K.1 实际计数分布与相位采样](ch15-s04-s01-phase-sampling.md)
- [K.2 连分数候选与观察事件](ch15-s04-s02-continued-fraction-candidates.md)
- [K.3 可执行取阶与因子证书](ch15-s04-s03-executable-order.md)
