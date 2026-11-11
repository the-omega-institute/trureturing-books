# 给模板的回馈：静态图的标准、工具与检查（trureturing-books-template#18）

路线图 #67 的第一项是模板仓库的 #18：静态图的出图标准、生成与预览工具、检查与 `book-figure` 技能。这部分按 `skills/template-update` 的 B 流程做：**先在本书库里做成并验证，再移植到模板仓库**。本书库的工作分支已经带着这些托管文件的改动；本目录保存移植到模板仓库的那一份，供模板维护者合入并发版。

## 文件

| 文件 | 内容 |
| --- | --- |
| `static-figures.patch` | 对模板 `main`（v0.3.2，`918c3ef`）的完整改动：`git diff --binary main`，36 个文件 |
| `commit-message.txt` | 建议的提交说明（含 `Closes #18`） |

## 合入模板仓库

```bash
git clone https://github.com/the-omega-institute/trureturing-books-template && cd trureturing-books-template
git checkout -b static-figures
git apply --index ../trureturing-books/docs/project/template-18/static-figures.patch
git commit -F ../trureturing-books/docs/project/template-18/commit-message.txt
./tbook template manifest --check && ./tbook check && PYTHONPATH=tools python3 -m unittest discover -s tools/tests
```

补丁已包含重新生成的 `template-manifest.json`（196 个文件，版本号仍为 0.3.2，`docs/CHANGELOG.md` 的条目在 `[Unreleased]` 下）。发版时按 `skills/template-update` 的 D 节改版本号（向后兼容的新功能，建议 0.4.0）。

## 已在模板克隆上验证

- `./tbook check`：0 错误（两本示例书）；`./tbook theme --check`、`viz-validate`、`slides-check` 通过。
- 单元测试 866 项全部通过，其中 `tools/tests/test_figure.py` 18 项是新增的。
- `./tbook template manifest --check` 通过。
- 示例专著的中英文 HTML、屏幕版与印刷版 PDF、EPUB（含 epubcheck）全部构建成功；两张示例图在深色、浅色、手机与印刷四种画面里看过。

## 合入并发版之后，本书库要做的

1. `./tbook template update`：本书库的这些托管文件与上游新版本相同，不会产生冲突；`template.toml` 与 `template-manifest.json` 更新为新版本。
2. 删除本目录（`docs/project/template-18/`）。

在那之前，`./tbook template status` 会把这些文件列为“本地改动”，这是预期的；不要用 `--force` 覆盖它们（会删掉静态图工具，全书的 `::: {.figure}` 块随之失效）。每周的 `template-sync` 若在上游合入之前开了升级 PR，保留本地版本即可。

## 设计要点（供审阅）

- 一张图是一个脚本 `books/<slug>/figures/<name>.py`，用 `tools/tbook/figkit.py` 画；脚本只写颜色的角色名，色值只在 `theme/tokens.json`。每种语言生成一份规范 SVG 并提交入库，`./tbook check` 核对它与脚本一致。
- 引用用新的媒体块 `::: {.figure src="<name>"}`，图注是普通 Markdown；原有的 `![图注](../assets/x.svg)` 照常构建。
- 主题适配的做法（issue 里留待实现时选定的那一点）：HTML 中把图内联进页面，角色类取页面的 `--tr-*` 令牌，所以跟随主题切换与浏览器打印；PDF 的两个变体与 EPUB 在暂存时把对应配色写进样式表（PDF 由 `theme/typst/book.typ` 的 `tr-fig-ext` 按变体取文件）。没有采用“每张图提交多份配色文件”，入库的只有每种语言一份。
- 带分栏的图（`WRAP = True`）在宽屏并排、在手机上叠放，章首的三栏总览图因此在手机上也读得出。
