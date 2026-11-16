# 全书统计只作编译产物

正文与锁文件是统计输入；源码删除手工总数、排名、声明表、统计地图数据与图片副本，不再运行修改书稿的全书统计同步脚本。附录 C 保留作者维护的证据边界说明，并按本书选择嵌入编译简表、链接生成的声明索引。定理、证明和开放问题仍在所属章节维护。

正文只保存选择与引用，例如：

```markdown
::: {.stats src="summary"}
:::

声明明细按需单独查看。

::: {.stats src="declarations" display="link" format="html"}
查看生成的声明索引
:::
```

上下游共享的接口还提供 `evidence`、`environments`、`kinds`、`chapters`、`pages` 与 `reuse` 视图；下游自行选择，不强制每本书追加统计页面。默认嵌入表格，也可链接 HTML、Markdown、CSV、JSON 产物。声明索引与复用表可按 `all`、`theorems`、`definitions`、`inline` 分区。中英文的选择逐项对齐，说明文字自然翻译。完整接口见 `../AUTHORING.md` 的“统计与派生产物”。

构建自动生成并发布所引用的产物，不需要预先提交快照或生成章节。环境出现次数、唯一声明数与跨源文件复用分别计算，生成视图不回流为引用统计输入；索引登记和计数不改变数学结果的验证等级。

命令行导出示例：

```bash
./tbook stats --book quantum-geometry
./tbook stats --book quantum-geometry --write
./tbook stats --book quantum-geometry --write --view summary --view kinds --format markdown --format csv --lang zh --lang en
./tbook stats --book quantum-geometry --write --view declarations --group theorems --format html
```

默认快照为 `build/statistics/quantum-geometry.json`，选定视图写在 `build/statistics/quantum-geometry/`。这些路径被 Git 忽略，内容未变时保持字节与修改时间。自定义图、可视化或外部程序读取产物，不把数据复制到受版本管理的源码。站点与导出的验证账本继续由构建生成；锁文件仍只由 `./tbook pin` 写入。

共享实现已由[上游模板 PR #109](https://github.com/the-omega-institute/trureturing-books-template/pull/109) 合入，并通过 `./tbook template update --to v1.4.0` 正式同步；消费者不重置模板清单。
