# 附录 E 从比较公理到数学与物理公理体系：完整推导链、中间假设审计与反例集 {#附录-e-从比较公理到数学与物理公理体系}

本附录是[第 32 章 §32.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison)–[§32.3](ch32-s03-axioms-as-corollaries.md#sec-ch32-axioms-as-corollaries)（[@def-ch32-axiom-of-comparison] 及六条形式化推论 [@cor-ch32-extensionality-and-quotient]–[@cor-ch32-bargmann-holonomy-and-path-product]）的**形式认识论配套审计台账**。在第 32 章正文中，我们将“两子丈量”提炼为零背景比较公理 $\mathcal{A}_0$ 与单指令几何积原语 $\mathrm{CMP}(\mathbf{A}, \mathbf{B}) = \mathbf{A}\cdot\mathbf{B} + \mathbf{A}\wedge\mathbf{B}$，并指出逻辑与集合外延、算术与数域完备化、度规几何、量子力学公设以及相对论—规范—内生贝里几何—离散路径乘积—热力学定律的核心骨架均可重构为 $\mathcal{A}_0$ 在显式桥接条件下的条件推论。为彻底杜绝“用一个口号偷换全部隐含前提”的公理滑坡，本附录逐条拆解每一条推导链：**哪些步骤仅凭两槽比较即可无损商化或完备化？哪些射影几何相位已在第 1 层内生闭环？哪些步骤必须补入可操作的实验测量、动力学生成元或复合层析判据？哪些步骤对应真实的代数签名、绝对值估值或交换统计分岔？当任一中间假设缺失时，能够证伪目标结论的反例（有限反例或可数无穷反例）究竟长什么样？**

遵循与[附录 B](appendix-b.md)、[附录 D](appendix-d.md) 完全一致的认识论契约：凡对应 `trureturing@dev` 已冻结定理的环节均附有绿色 `LEAN ✓` 标记与可点击的内联声明链接（验证边界见[附录 C](appendix-c.md)）；经典数学与物理学定理标为 `文献结果`；显式构造的有限或可数无穷反例标为 `手工推导`；作者的统一几何架构标为 `MODEL`；尚未解决的数学与物理前沿则诚实标为红色 `OPEN`。

---

- [E.1 三层代数签名剥离与中间假设四分类准则](appendix-e-s01-layers.md#sec-appe-layers)
- [E.2 逻辑、外延商化、米田嵌入与对角线分层](appendix-e-s02-logic-and-quotients.md#sec-appe-logic)
- [E.3 算术、无穷素数轴、虚数旋转与奥斯特洛夫斯基完备化分岔](appendix-e-s03-arithmetic-and-completions.md#sec-appe-arithmetic)
- [E.4 度规几何、平行四边形极化与格拉姆—球面曲率](appendix-e-s04-metric-and-gram-curvature.md#sec-appe-geometry)
- [E.5 量子力学五大公设的逐条桥接与反例审计](appendix-e-s05-quantum-postulates.md#sec-appe-quantum)
- [E.6 时空光锥、内生与外源规范和乐、离散路径乘积与平稳作用量、去相干热力学及付费比较](appendix-e-s06-spacetime-gauge-and-thermodynamics.md#sec-appe-spacetime)
- [E.7 九大中间假设（H1–H9）全景审计与进一步处理总表](appendix-e-s07-intermediate-hypotheses-audit.md#sec-appe-audit-table)
- [E.8 第三点冗余与对合正性：用极小圆弧体微积分归约 H2 与 H3，并改写 H5–H7 的输入](appendix-e-s08-third-point-redundancy.md#sec-appe-third-point-redundancy)
