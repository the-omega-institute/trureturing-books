# 附录 C 验证依据与开放问题边界 {#附录-clean-4-形式化定理总索引与开放问题台账}

本附录说明如何核对本书的证据。每条 Lean 引用指向所钉 `trureturing@dev` 提交 [{commit}](trureturing:) 的冻结声明；书面证明由作者与评审负责；开放问题保留其未证身份。逐条声明、源码链接与书面证明来源见正文及编译时生成的验证账本。

::: {.stats src="summary"}
:::

完整声明索引按需在编译时生成；其中的登记不改变任何结果的证据等级。

::: {.stats src="declarations" display="link" format="html"}
查看生成的声明索引
:::

## C.1 Lean 验证结果 {#sec-appendix-c-theorems}

`theorem`、`lemma`、`proposition` 与 `corollary` 的绿色徽章由构建根据锁文件生成。核对结果时，先读书中前提与结论，再打开其 Lean 源码链接，逐项比较类型、假设与结论。引用同一声明的不同章节不因此得到新的定理。

第 7.3 节的 [@prob-monitored-spectral-mean] 讨论有限维酉监测纯态；[@rem-monitored-unital-kac] 处理保实际相关空间恒等算子的有限维 CPTP 通道。一般量子仪器、无限维与物理时钟仍须另行论证。

## C.2 定义与代数载体 {#sec-appendix-c-definitions}

定义、结构与归纳类型的源码链接说明对象如何构造，不表示已经证明了有关它们的所有性质。定义引用与定理验证分开核对，不能以定义的存在代替命题的证明。

## C.3 书面证明与辅助引用 {#sec-appendix-c-inline}

行内 Lean 链接用于给出辅助结果或源码定位，核对时仍须阅读对应声明的种类与完整前提。书面证明显式标为 `status="written-proof"`，并提供完整证明及文献来源或源论文仓库、原文定位和形式化请求。

例如 [@thm-central-defect-endpoint-average] 及其[书面证明](ch16-s03-central-defect-spectrum.md#pf-central-defect-endpoint-average) 随正文登记 DOI 与[形式化请求 #10](https://github.com/the-omega-institute/trureturing-requests/issues/10)，不因此取得 Lean 验证身份。

## C.4 开放问题与文献边界 {#sec-appendix-c-open-register}

::: {.remark #rem-appendix-c-open-literature-register title="开放问题与外部文献边界"}
开放猜想与开放问题使用 `conjecture` 或 `problem`，不带 `lean` 属性。外部文献结果单独注明来源及本书的形式化边界；例如 [@rem-ryu-takayanagi-literature] 的连续全息公式与 [@rem-diophantine-z-in-q-literature] 的有理数丢番图问题，均不能由相邻的有限模型或冻结定理替代。

具体陈述、假设与文献讨论保留在各自章节；本附录不另行维护全书问题清单。
:::

## C.5 所钉提交与核验方法 {#sec-appendix-c-integrity-checklist}

`site.toml` 指定形式化仓库与分支，`trureturing.lock.json` 记录 `dev` 分支。运行时解析完整提交和所引用的冻结声明；`./tbook check --book quantum-geometry` 核对引用、证据属性与双语结构。验证账本由构建生成，核验状态以实际命令结果为准。

::: {.remark #rem-appendix-c-epistemic-boundary title="验证依据的边界"}
源码链接定位声明，书中解释帮助理解，Lean 内核检查其形式证明。书面证明与开放问题各自承担不同的证据责任；索引登记、图示或计数不能改变结论的验证等级。
:::
