# 托管文件领先于已发布的模板：浏览器测试分片与多行小图集

路线图 #67 的第一项是模板仓库的 the-omega-institute/trureturing-books-template#18（静态图的标准、工具与检查）。这部分按 `skills/template-update` 的 B 流程做：先在本书库里做成并用真实章节验证，再回馈模板仓库。

- 静态图的标准、画图库、`./tbook fig`、检查与 `skills/book-figure`：the-omega-institute/trureturing-books-template#22，已随模板 **v0.4.0** 发布，本书库也已升级到 v0.4.0。
- 之后的两处改动在 the-omega-institute/trureturing-books-template#26，已合入上游 `main`，**尚未发版**：
  - CI 的可视化浏览器测试分 4 片并行（`.github/workflows/ci.yml`、`docs/PUBLISHING.md`）；
  - `WRAP = True` 的图排成几行时网页版保持按行排（`tools/tbook/figure.py`、`theme/mdbook/tr-book.css`、`tools/tests/test_figure.py`、`docs/ARCHITECTURE.md`、`skills/book-figure/SKILL.md`）；
  - 以及记下这两处的 `docs/CHANGELOG.md`。

## 在模板下一次发版之前

上面这 8 个托管文件领先于已发布的模板 v0.4.0，并且与上游 `main` 逐字相同。`./tbook template status` 会把它们列为本地改动，这是预期的。不要用 `--force` 覆盖（会退回串行的浏览器测试，多行小图集在宽屏上被压成一行）；每周的 `template-sync` 若在上游发版之前开了升级 PR，保留本地版本即可。之后对托管文件的改动同样先回馈上游。

## 模板下一次发版之后

1. `./tbook template update`：这些文件与上游新版本相同，不会产生冲突；`template.toml` 与 `template-manifest.json` 更新为新版本。
2. 删除本目录。
