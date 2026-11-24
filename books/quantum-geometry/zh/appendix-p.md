# 附录 P 静态本体 QRAM 路由、物理记录轮廓与带符号 Fourier 证明 {#sec-appendix-p}

在[第三十六章 36.2 节](ch38-s01-static-qram.md)中，我们以“静默存储阵列 + 轻量级地址指针 `ptr++` / `*ptr`”的硬件直觉，对比了深度 $O(\log_2 N)$ 的路由树与 $O(N)$ 线性扫描，并说明了解引用拷贝如何把相干项搬进地址记录而不销毁它。支撑这一架构的可逆路由定理、物理记录轮廓的保真度极小输入分析，以及带符号 Fourier 记录与地址解引用的完整形式化推导，集中归入本附录，使[第三十六章](ch38-observer-memory-pointer-and-ontological-qram.md)正文能够从静态本体 QRAM 的核心图景直入[§36.3](ch38-s02-pointer-anatomy.md)的观察者指针五段式硬件解剖：

- [P.1 可逆路由与干净查询](ch38-s01-s01-routing-and-query.md)
- [P.2 物理记录轮廓与保真度极小输入](ch38-s01-s02-physical-profiles.md)
- [P.3 带符号 Fourier 记录与地址解引用](ch38-s01-s03-signed-fourier-records.md)
