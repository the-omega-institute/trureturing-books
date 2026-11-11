# 托管文件领先于已发布的模板：静态图的标准、工具与检查

路线图 #67 的第一项是模板仓库的 the-omega-institute/trureturing-books-template#18。这部分按 `skills/template-update` 的 B 流程做：先在本书库里做成并用真实章节验证，再回馈模板仓库。回馈的 PR 是 the-omega-institute/trureturing-books-template#22（已合入上游 `main`，尚未发版）；随后的两处改动（CI 的可视化浏览器测试分 4 片、多行小图集按行排）在 the-omega-institute/trureturing-books-template#26。这些改动涉及的托管文件两边相同。

## 在模板发版之前

本书库的这些托管文件领先于已发布的模板 v0.3.2：

- 新增：`tools/tbook/figkit.py`、`tools/tbook/figure.py`、`tools/node/fig-shots.mjs`、`tools/tests/test_figure.py`、`templates/figure/`、`skills/book-figure/`；
- 修改：`tools/tbook/{build,check,cli,html,model,pandoc,render}.py`、`tools/filters/tr-book.lua`、`theme/mdbook/tr-book.css`、`theme/epub/book.css`、`theme/typst/book.typ`、`docs/{ARCHITECTURE,AUTHORING,CHANGELOG,PUBLISHING}.md`、`CLAUDE.md`、`skills/book-viz/SKILL.md`、`.github/workflows/ci.yml`。

`./tbook template status` 会把它们列为本地改动，这是预期的。不要用 `--force` 覆盖（会删掉静态图工具，全书的 `::: {.figure}` 块随之失效）；每周的 `template-sync` 若在上游发版之前开了升级 PR，保留本地版本即可。之后对这些文件的改动同样要同步到上游的 PR。

反过来，上游 `main` 在 v0.3.2 之后也有本书库还没有的改动（预装工具链的容器镜像等），它们随下一次 `./tbook template update` 进来；所以两边的 `ci.yml`、`docs/CHANGELOG.md`、`docs/PUBLISHING.md` 在发版前并不逐字相同，同步时按补丁套用，不整份覆盖。

## 模板发版之后

1. `./tbook template update`：这些文件与上游新版本相同，不会产生冲突；`template.toml` 与 `template-manifest.json` 更新为新版本。
2. 删除本目录。
