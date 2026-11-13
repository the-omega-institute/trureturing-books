# 章节层级与文件命名

主章保留章首标题、作者题记、导言和总览图，独立论题成为子章节页面。目录层级与编号以各语言的 `SUMMARY.md` 为准，文件名只提供稳定的编辑标识。

主章命名为 `chNN-topic.md`，子章节命名为 `chNN-sNN-topic.md`，更深一级继续追加 `-sNN`。数字至少两位，主题使用英文 kebab-case；中英文文件名完全一致，文件平放在各自语言目录。入口、终章和附录沿用 `README.md`、`coda.md`、`appendix-a.md` 等现有名称。

```bash
./tbook new-chapter quantum-geometry ch30-s07-worked-examples \
  --parent ch30-fields-lines-eth-and-navier-stokes \
  --title zh="手算例子" --title en="Worked examples"
```

命令同时校验各语言并创建文件，将新子章节插在父项的全部后代之后。每个版本目录中的条目使用每级两个空格缩进；需要更深一级时，指定现有子章节为父项。拆分正文的完整步骤见 [写作手册](../AUTHORING.md) 的“章节命名与长章拆分”。

第 30 章已按现有六节拆分：

| 文件 | 内容 |
| --- | --- |
| `ch30-fields-lines-eth-and-navier-stokes.md` | 原章入口、题记、导言与总览图 |
| `ch30-s01-global-field.md` | 全局静态时间场与有限观察者 |
| `ch30-s02-witness-lines.md` | 见证线、导向场与旋转奇偶性 |
| `ch30-s03-eth-and-horizons.md` | ETH、张量网络秩约分与视界 |
| `ch30-s04-navier-stokes.md` | 纳维—斯托克斯与投影闭合 |
| `ch30-s05-entanglement-and-entropy.md` | 纠缠、熵与复杂性 |
| `ch30-s06-summary.md` | 本章小结 |

中文先移动完整小节，英文同步移动；原二级节标题提升为子文件一级标题，下级标题相应提升。两版各 71 个环境与媒体块逐块比较内容完全相同，环境 id、Lean 引用、定理编号和媒体顺序均保留。原主章文件地址仍可访问，书内和可视化中的旧小节片段链接已更新到对应子页面；外部保存的旧片段地址需要改用新链接。

声明地图区分 `30` 与 `30.1` 等页面标签，并重新生成数据、封面与双语静态图。主章定理统计合并全部后代，部与章的关系从正式目录解析器读取；静态图仍显示原有 39 个主章和终章，拆分不增加章数。
