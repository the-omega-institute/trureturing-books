# CI 性能优化整体方案与采用记录

本方案同时面向上游书库模板与本书库：先让未受变更影响的消费者不执行，再根据仍需执行的工作选择优化。共享读取必须覆盖全部消费者；差异、依赖或成功覆盖无法确认时，明确扩大范围。托管实现只在模板修改，经正式发布与 `./tbook template update` 同步；本书自己的额外依赖保留在 [dependencies.json](../../books/quantum-geometry/viz/tests/dependencies.json)。

## 1. 当前实施状态

截至 2026-11-14，上游功能 PR [#78][pr78] 已合入 `32d0afc4940f4cff37efd0780744ed6dc7dd0411`；[PR CI][up-pr-ci]、[主干 CI][up-main-ci] 与 [Pages][up-pages] 均成功。Pages 在 00:40:31 UTC 完成该提交的实际部署。功能最终本地验收为 1148 项工具测试成功，其中 7 项既有跳过；严格 `build all` 成功，耗时 853.796 秒。这是上游证据，不代替下游验收。此前未改动运行时用例有时序波动，最终在未修改源码、断言或时限的条件下通过；没有确定其宿主根因。

缓存说明随后经文档 PR [#79][pr79] 校正并合入 `63804c9e5637e1d1258c15341b60d4bb6a189b3d`。两轮最终审查各三席批准，旧说明已经修正。[v0.10.0][release] 于 00:59:21 UTC 正式发布，非草稿、非预发布，tag 精确指向该提交；[发布运行][up-release] 完成严格示例站点、缓存组装及被调用 CI，发布 21 个资产，即 `build-cache.json` 与 20 个 tar。

本书库以 `6bacd4db03cd4c5e379fe851976cadf33a0343bb`、模板 0.9.3 为采用基线。已通过实际模板工具预览并升级到 v0.10.0：新增 2 个、更新 11 个功能文件，另同步模板版本与清单；无冲突、无迁移。没有把未发布托管源码复制到下游，也没有下游托管补丁。本地依赖声明采用已审计候选，SHA-256 为 `ce083107de5eb5bd15fc9b7d0f895d279b0483dc0936dfc1bd3a3d58f5ae9a38`。严格全量构建已通过；产物检查另发现英文 academic PDF 超限，见第 6 节。本次没有在下游修订托管实现或出版内容。

下游 PR、合入、采用后的远端 CI、Pages 和可比性能样本仍由维护者完成；采用前的 6bac [CI](https://github.com/the-omega-institute/trureturing-books/actions/runs/43536320663)／[Pages](https://github.com/the-omega-institute/trureturing-books/actions/runs/43536320655) 均已取消，不能算优化后验收。本记录不宣称完整目标已经完成。

## 2. 基线与已观察结果

作业历时合计包括并行作业的安装、传输和其他开销，不是 CPU 时间，也不是账单分钟。不同事件、输入、缓存和运行时不能组成匹配 A/B，以下不计算节省百分比。

| 来源与样本范围 | 已核实观察 | 能支持的决策 |
| --- | --- | --- |
| 下游 PR #246，[43484846290][old-pr]，head `28e808d`，单次 | 2026-11-13 18:40:04–19:18:27 UTC，墙钟 2303 秒；19 个成功作业合计 17538 秒。8 路 viz 11504 秒、4 路 film 4260 秒，合计占 89.9%；10 次整库缓存恢复合计 507 秒 | 优先消除无关重型执行。该 PR 跨正文、十部影片和六个 viz，不能承诺消除全部耗时 |
| 下游另一同类 PR，[43476896369][old-pr2]，单次 | 作业历时合计 278.8 分钟 | 与上一例为两个历史观察，输入不同，不当作重复实验 |
| 上游纯文档 PR #77，[43494874035][old-up-doc]，单次 | 总历时 667 秒；只改 AUTHORING、CHANGELOG、manifest，仍跑重型任务；Check 472 秒，普通／无示例／隐藏示例单测分别 195／109／115 秒 | 是无关执行的直接反例 |
| 健康下游 main `882f596`，[CI][before-ci]，单次 | 墙钟 1464 秒、9917 作业秒；浏览器 8 片各 707–1297 秒，setup 各 33–42 秒；Check 163 秒，其中单测 97 秒、结构与引用 41 秒 | 浏览器执行仍是关键路径；安装只是其中较小部分 |
| 同一健康基线的导出 | **原本就是五个导出作业**，各 122–347 秒；缓存恢复各 5–7 秒 | 不存在已测的“九次安装变五次”收益；恢复拆包目前优先级低 |
| 同一健康基线，[Pages][before-pages]，单次 | 墙钟 1249 秒、1243 作业秒；Build the site 作业 1206 秒，build 步骤 1000 秒、setup 72 秒、deploy 作业 32 秒 | 优先避免无站点影响的整条构建；不能把安装样本外推到所有作业 |
| 较早下游 [Pages][old-pages]，单次 | 19:05:16–19:14:33 UTC；setup 353 秒、check 57 秒、build 37 秒；仅工程文档变动 | 安装存在环境差异，不宜据此承诺镜像收益 |
| 较早上游暖缓存 [Pages][old-up-pages]，单次 | 总历时 146 秒、setup 90 秒、build 6 秒 | 暖缓存也有固定成本；与健康下游不是匹配样本 |
| 新实现的真实文档 PR #79，[43537043873][docs-sample]，**单次** | CI 成功，墙钟 44 秒、成功作业合计 35 秒；unit、theme、structure、browser、films、slides、exports 各 0 次，setup 与缓存步骤跳过 | 已证明该次入口的无关重型执行为零；没有匹配 A/B，不能称为已测节省 |

健康 882f 已取代较早失败样本 `43500751512`，失败运行不用于收益基线。历史 PR 为模板 0.9.0 时期，上游 #77 为 0.9.3 时期；当前库存 61 个 suite、十部影片不能倒套历史样本。

新文档 PR 的 normal 覆盖继承 [32d0afc 主干 CI][up-main-ci]，影片覆盖继承 [32d0afc Pages][up-pages]。文档合入后的 [主干 CI][docs-main-ci] 与 [Pages][docs-main-pages] 同样成功；该 Pages 的 `site=false`，复用有效先前部署，build/deploy 跳过，不能称为新部署。代码扫描属于仓库平台策略，不在上述托管 CI 指标内。

## 3. 所有入口的选择与失败处理

安装、浏览器准备和缓存恢复前，由 [生产选择器](../../tools/ci/plan.py) 输出被测树、比较路径、检查族、书籍、suite、影片、deck、格式和选择理由。[CI](../../.github/workflows/ci.yml) 与 [Pages](../../.github/workflows/pages.yml) 共用它。

| 入口 | 已发布行为 |
| --- | --- |
| PR | 核对实际 checkout 的两个 merge parents；head 必须与事件一致，base 必须等于事件 base 或为其后继。联合完整累计 `merge-base…head` 与成功基准至实际 merge-tree 的差异，base 前进也重新规划。开发分支 push 不再重复触发 CI |
| main push | 从最近可比、可追溯的成功祖先累计比较，不能以 push 的 `before` 替代覆盖；先前失败或取消的改动继续选中 |
| 手动 | `selection_mode=auto|full`，可用 `base` 约束预期成功基准、`head` 约束实际 checkout。它们不是任意书名筛选输入。auto 的执行范围由真实差异决定；非默认分支覆盖只供同分支手动运行，不能提供默认分支证明 |
| schedule | 自有每周三入口仅 slow profile。相同输入、运行时和定义已被成功覆盖时不重跑；首次或不可比则全量 slow。调用其他 workflow 的 schedule 上下文按调用方正常责任处理 |
| workflow_call／tag | 使用调用方事件与 ref；调用不发布覆盖。`full` 保留完整验收入口。main／tag push 的影片交给 Pages／Release；发行作业仍完整严格组装站点，不因 CI 延迟影片而省略发行产物 |
| Pages | 只有无站点影响且仍有成功有效部署覆盖时跳过。输出受影响时完整组装全站，恢复未变单元、补建缺失单元，删除旧输出；CI 成功不能替代部署成功 |

normal、films、slow、pages 分别记录成功责任，覆盖工件保留 90 天。生产验证包括仓库、工作流、分支、事件、完成状态、最终成功、SHA、运行 attempt、选择器版本、工具／检查定义及运行时签名、祖先关系；每个来源工作流最多搜索最近 100 个成功运行。Pages 还验证对应 `github-pages` 部署状态。失败、取消、过期、权限或历史缺失、签名不匹配都不能推进基准；不可比则在摘要中明确 full fallback。

影片在可信 CI 与 Pages 影片记录中选择较新的祖先。normal 成功不能清除影片责任：Pages 失败、取消或缺失影片证明后，文档 PR／手动 CI 仍负责未覆盖影片；main 延迟影片时不写 films 覆盖。完整严格 Pages 即使不部署也可证明实际影片构建，无构建的 Pages 不推进 films。

未知根路径、共享工具和依赖先保守全量；书内未登记 suite 扩大到该书。重命名以删除＋新增同时检查两端；删除还用旧树声明追踪仍存在的读者。损坏声明、错误 schema、未知 suite 或选择器异常让 plan **失败**；不会将异常吞为空集合。缺少可比较成功基准则显式全量，两种情形不能混写成“错误都自动回退”。

稳定必需检查为末尾 **Check**，通过 `always()` 汇总实际结果；只允许计划明确排除的 skip，选中任务失败、取消、意外跳过及 plan 失败均不通过。若分支保护曾要求单个矩阵检查，维护者需迁移为 Check；这项仓库设置不属于本地文件升级。

## 4. 本书的真实读取闭包

依赖声明使用 `tbook-ci-dependencies-v1`，路径从仓库根起算，禁止绝对路径、反斜线和 `..`。glob 使用 `fnmatch.fnmatchcase`，`*` 可跨 `/`，`**` 没有额外递归含义；可选本地 i18n 和未来章节子目录允许当前空匹配。自身对象目录及静态相对 import 由模板处理，动态读取由本书声明。

先前 97df 审计覆盖 422 个来源快照、61 个 suite、149 个模块扫描、39 个 glob 场景和九条影片反向模型读取。glob 审计是候选依据，不能替代发布后生产选择器重放。97df→6bac 的 22 条路径另作增量核对：coherence 与 forgetting 的新检查仍读同页 DOM／Canvas，四个页面的改动只涉及布局／拖动，双语 chapter04 和十二张 JPEG 仍在已声明边界，研究文档与本地 skill 没有新重型消费者。当前源码断言确认 61 份依赖签名一致，十部影片的 metadata／scenes 未变；没有因源码哈希变化编造新边。

保留的实际跨域读者包括：

- 全部 61 个 `stageFirstChecks` 先读取全部已出版语言的章节与 SUMMARY，再按可视化筛选；中英各 51 篇、共 102 篇正文及两个 SUMMARY 都影响所有 suite。锁、registry、共享 frame contract 同样保留全部消费者。
- CHSH 的 note helper 实际访问 14 页，另外 13 页通过目录 glob 声明；不能只选 CHSH 自身目录。solid-readiness helper 实际有四个 suite 消费者。
- solid 核心与 vendor 的 suite 实际闭包为 19 个，影片实际闭包为七部；hub 保留 registry 全部 61 张 lazy 缩略图的可能请求上界，未用未经测量的请求子集收窄。
- 六个模型的影片读取由 `film.json scripts`、实际 scenes 全局调用和构建内联共同支持，共九条边。`two-angle-addressing/model.js` 影响自身 suite 以及影片 001／003／007／008；forgetting、gram 模型各影响自身与 CHSH，并分别影响 009、008。
- 浏览器字体／包／浏览器身份来自 package 与 lock，Python 桥接使用受管工具。CI 的标准 ROOT、Python 与共享 server 环境由运行器确定；hub 的空 repo 配置使用 Git remote 回退，本地 origin 与 CI 仓库均为 `the-omega-institute/trureturing-books`，不把 `.git` 或外部环境路径伪装成仓库 glob。

实际生产执行还保留共享路径的保守上界：修改 `theme/viz/solid-core.js`、vendor、hub runtime、共享工具或 i18n，当前会选 **61 个 suite 与十部影片**，而非假称已缩到 19／七或一个 hub suite。闭包声明保证不漏读者；进一步缩窄共享路径规则须在上游证明后发布，不能下游硬编码书例。

## 5. 执行集合、成本与剩余方案

先选择，再生成至多八个 viz 分片、四个 film 分片；每片非空、无重复，并集恰等于所选集合。零集合不启动 runner。JSON 精确集合交给真实 `--selection-env` 运行器，拒绝未知、隐藏、重复项；Slides 按 deck 执行。导出保持整本书、所有启用语言与格式，按格式合并所选书籍，不把部分输出存进整书缓存。

| 代表变化 | 本书生产选择 | 解释 |
| --- | --- | --- |
| 已确认纯工程文档／本地 skill | suite／film／slides／exports 均零；下游 validate 也可跳过；上游保留 manifest | 有实际声明读者的文档仍先传播到读者 |
| `blade-multiplication/main.js` | 一个 suite，零影片；本书全部启用导出 | 出版缓存仍以整书为单位 |
| `two-angle-addressing/model.js` | 一个 suite、四部影片 | 保留模型的实际影片反向读取 |
| forgetting／gram 模型 | 两个 suite、各一部影片 | CHSH 跨页 helper 是实际读者 |
| note helper／solid-readiness helper | 分别一个／四个 suite，零影片 | 静态 import 闭包 |
| 正文、SUMMARY、registry、依赖声明自身 | 全部 61 个 suite | 正文参与 frame；依赖声明必须使所属 suite 范围失效 |
| 锁、共享 frame／solid／vendor／hub runtime | 61 个 suite、十部影片及本书导出 | 当前全局规则有意扩大；不能把最小读者数当执行数 |
| 删除／改名 | 两树读者并集，已删除可执行对象不列入分片 | 保留清理与仍存在的读者 |
| 缺失／不可比成功基准、未知根路径 | 对应责任全量 | 不能用空列表表示不确定 |

P0 的维护成本为两份托管工作流、选择／执行工具、责任工件及相应回归；下游维护一份按真实读取更新的声明。新增动态资源、语言、hub thumbnail 路径或跨页 helper 时同步声明，未登记前保守扩大。选择器或责任语义变更增加版本／签名，旧证明失效后允许首次全量。

其他候选按当前证据作以下决定，不要求为了拒绝低优先级方案再做无必要 benchmark：

| 候选 | 当前决策与依据 | 若将来采用的验收／维护成本 |
| --- | --- | --- |
| 单次安装／必要工具能力 | 已由选择层让无任务作业完全不安装；仍需执行的浏览器 setup 33–42 秒，远小于 707–1297 秒作业。暂不拆更多 setup 能力或改共享安装协议 | 需有重复安装的实际消费者与可比净收益；保留字体、Chromium、Node／Python 版本及失败安装路径。成本中 |
| 预装镜像 | 保留已有可选镜像，暂不改默认；没有包含冷拉取、prepare 的同集合净收益证据 | 固定 digest、供应更新及工具身份，普通安装回退；不能外推较早 Pages 的 353 秒 setup。成本中至高 |
| 分片均衡／扩容 | 采用先选集合、非空上限；暂不增加固定并发或引入权重。基线 707–1297 秒显示可能不均衡，但缺少可归因的逐 suite 分布 | 只有再次成为瓶颈时，依据自然运行时长比较固定执行集合的关键路径与排队；维护权重与新增 suite 默认值。成本中 |
| 缓存传输拆包 | 暂缓：健康导出恢复仅 5–7 秒，先由选择减少下载次数；没有剩余显著传输证据 | 同步生产者／查找器，核对字节、命中率及缺包冷构建，保留逐文件摘要。成本中 |
| 重复构建／统一生产者 | 已采用无站点影响且有部署证明的 Pages 跳过；保留有输出变化时完整组装。暂不统一 CI／Pages 生产者，主干 film 的既有延迟不重复计收益 | 需同 SHA、单元键、base URL、工具身份与完整产物集合的重复证据，再决定是否改拓扑。成本高 |

缓存信任边界不变：不读取 PR 自产的可信构建缓存或冻结状态；只接受经来源校验的成功默认分支 Pages 工件及合法 Release，原单元键、逐文件摘要、过期／损坏冷构建继续生效。性能优化不能修改锁或减少实际源码读取来制造命中。

## 6. 本地验收与后续交付

采用验证使用已发布的 `tools/ci/plan.py` 与真实当前／旧树，在任务临时 Git fixture 内创建删除、重命名和双亲 merge；源 checkout 的 refs、index、历史不变。运行器只使用 list-only 语义核对精确集合与分片，不为证明跳过而启动未受影响浏览器。GitHub 覆盖 API／工件历史使用有限 fixture，经生产 provenance validator 检查，不冒称远端事件验收。

生产选择器主重放已通过 85 条记录，其中 50 条为路径选择；另通过 179 条章节、CHSH 跨页和 hub 缩略图读者检查，以及 18 条额外输入、手动 slow 与 Pages 汇总案例。实际 `viz-test.mjs` 和 `films.py` 的 list-only 结果与所选集合及非空分片并集一致。覆盖 API 是有限 fixture，不是远端事件运行。`./tbook doctor` 为零必需缺项，认证后的 `./tbook check` 为一本书、零错误、九条既有警告；可视化静态检查 61 页零错误／零警告，双语各 48 页的 Slides 静态检查、theme 与 248 文件的模板清单检查通过。

完整工具单测在准备好的 Python 3.12.13 环境通过，官方输出为 `Ran 1143 tests`、`OK (skipped=62)`，耗时 1214.763 秒。仅发现测试的库存为 1148 项；其中 61 项预声明跳过，包括 54 项隐藏示例前置条件及七项本地 Lean checkout／文件系统条件，另有运行时／类级跳过。没有把这些跳过计为已执行，也不与上游 1148／七跳过混用。首次误用环境外 Python 的未完成调用不作为验收，已改用准备好的解释器完整运行，未修改断言或时限。严格 `TBOOK_FILMS=require TBOOK_CACHE_REMOTE=1 ./tbook build all` 已成功，耗时 2002.201 秒。双语 HTML、六份 PDF、两份 EPUB、双语各 48 页幻灯片和十部影片全部实际生成，本次没有输出单元缓存命中；EPUBCheck 实际执行且无错误。该本地构建不是采用后的 CI 性能样本。缓存恢复只接受身份与摘要不变的可信来源，实际渲染与恢复分别记录；本地缓存来自成功默认分支 Pages [43520201387](https://github.com/the-omega-institute/trureturing-books/actions/runs/43520201387)，工件归档 SHA-256 与 GitHub digest 相符。旧缓存没有当前十部影片的匹配输入键，不能伪称影片命中。既有未引用图与八部影片的历史来源警告保留，不改书或放宽断言换取通过。

产物检查覆盖最终站点在 `/trureturing-books/` 子路径下的 24 个双语、桌面／手机及适用主题场景，另用八个定向场景查看幻灯片与 EPUB 正文，再用四个场景核对幻灯片实际图片 URL。HTML 第四章的深浅主题、站点首页、影片页及 EPUB 浏览器预览无资源错误；EPUB 各 61 个 XHTML 与 61 个 spine 引用均合法。六份书籍 PDF 的全页文字扫描未发现页外文本、所扫描的源码泄漏、未嵌入字体或活动内容；双语幻灯片 PDF 各 48 页，Type3 字体的内嵌字形流已核对。已查看各变体的封面／目录、首条定理与账本，以及代表幻灯片、两部影片帧；十部发布视频均为 1280×720、含音轨，十个封面及八个书籍下载齐全，与构建输出一致。视觉检查为有限抽样，不是逐页审读；EPUB 浏览器预览不代替 Apple Books。

仍有一项确认的产物问题，不能被构建退出码覆盖：

- 本地英文 academic PDF 为 **50,167,829 字节**，超过投稿检查的 50,000,000 字节上限；中文为 48,182,245 字节。英文版需要另行解决体积或取得真实投稿后的例外，当前没有豁免证据。
幻灯片的实际图片齐全。初次看到原始 `./img/*.svg` URL 返回 404 时，曾误判缺图；DOM 与第三页截图核对推翻了该判断：页面使用 Vite 哈希资源，每个语言的十三张 SVG 与源文件逐字节一致，另一张 SVG 完整内联在 bundle 中。404 来自锁定版本的 Slidev `usePreloadImages.ts` 对原始图片元数据的预载请求，不是实际显示资源缺失；这是预载噪声，不记为缺图或新增采用回归。相关托管工具和书籍源文件在升级前后字节一致；没有重复进行旧版本全量构建或修改下游源码来消除这些请求。

另有需要阅读器实测的版式观察：390 像素 EPUB 正文浏览器预览的内容宽度为英文 565、中文 596 像素，深浅两种浏览器色彩偏好下相同；版权页预览没有这一溢出。没有资源错误或 XML 错误，但这不能证明 Apple Books 中的版式合格，也不能仅凭浏览器将其断言为 Apple Books 缺陷。当前未实测该阅读器，保留观察与验证缺口，不在本次采用中修改书籍或放宽检查。

另保留 mdBook 英文搜索索引 11,319,811 字节的警告，以及既有未引用图和历史影片来源警告。`doctor` 的可选 CJK 字体提示是既有缓存文件名匹配限制：本地 11 个字体文件已按仓库校验和下载，实际 Noto Sans／Serif SC 字体与 PDF 嵌入均已核对；未改全局字体或配置。Headless 幻灯片的 Wake Lock 拒绝与生产检查既有豁免相符，单独记录，不记为呈现失败。最终模板清单的 248 个托管文件一致；初始 2201 个受跟踪路径中，除工具升级的 13 个旧文件外均保持字节，新增两个托管文件和两个授权自有文件，HEAD、分支与索引摘要未变。

维护者接续步骤：

1. 审阅升级清单、依赖声明与本地验收结果；若当前 release 有确认缺陷，回到上游修复／发布再升级，不在下游修托管文件。
2. 由维护者创建并合入下游 PR，确认所选实际作业与稳定 Check 通过；升级修改了共享定义，首次全量回退是正确行为。
3. 确认下游 main CI 以及 Pages 的完整站点、下载、双语媒体和实际部署成功；旧部署继承只适用于无站点影响的变更。
4. 采用后记录自然产生的文档、单对象、共享变化样本：输入路径、事件、选择基准、执行集、分片、墙钟与作业秒。没有匹配 A/B 就继续写“单样本观察”，不虚构收益。未测候选维持暂缓，不承诺开展决定当前候选所不需要的试验。

故障处理优先用手动 `selection_mode=full` 恢复完整诊断；缺证明自动扩大，选择器错误让 Check 失败。必要回滚由维护者回退采用 PR 或经模板工具显式选择先前正式版本，再完整检查与部署；不丢失他人正文、配置、锁与本地 skill 的工作。最终完成需要下游 PR 合入、CI／Pages 成功及真实采用后的记录，不能仅凭本地通过、上游发版或审查票数宣布完成。

## 参考与复现入口

- [发布说明](../../docs/CHANGELOG.md)、[影响选择及缓存契约](../../docs/PUBLISHING.md)、[升级手册](../../docs/UPGRADING.md)、[验证模型](../../docs/VERIFICATION.md)。
- [浏览器共享检查](../../tools/node/viz-testkit.mjs)、[引用与服务桥](../../tools/node/viz-common.mjs)、[影片输入键](../../tools/tbook/film.py)、[构建缓存](../../tools/tbook/buildcache.py)、[可信来源查找](../../tools/ci/trusted_cache.py)。
- [声明地图测试](../../books/quantum-geometry/viz/tests/lean-declaration-map.test.mjs)、[CHSH 测试](../../books/quantum-geometry/viz/tests/chsh-dial.test.mjs)、[选择／责任回归](../../tools/tests/test_ci_performance.py)。
- GitHub 官方：[必需检查与跳过](https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/troubleshooting-required-status-checks)、[动态矩阵](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/run-job-variations)、[调用工作流](https://docs.github.com/en/actions/how-tos/reuse-automations/reuse-workflows)。

[pr78]: https://github.com/the-omega-institute/trureturing-books-template/pull/78
[pr79]: https://github.com/the-omega-institute/trureturing-books-template/pull/79
[release]: https://github.com/the-omega-institute/trureturing-books-template/releases/tag/v0.10.0
[up-pr-ci]: https://github.com/the-omega-institute/trureturing-books-template/actions/runs/43533435125
[up-main-ci]: https://github.com/the-omega-institute/trureturing-books-template/actions/runs/43535098208
[up-pages]: https://github.com/the-omega-institute/trureturing-books-template/actions/runs/43535098263
[up-release]: https://github.com/the-omega-institute/trureturing-books-template/actions/runs/43537581326
[docs-sample]: https://github.com/the-omega-institute/trureturing-books-template/actions/runs/43537043873
[docs-main-ci]: https://github.com/the-omega-institute/trureturing-books-template/actions/runs/43537465269
[docs-main-pages]: https://github.com/the-omega-institute/trureturing-books-template/actions/runs/43537465418
[old-pr]: https://github.com/the-omega-institute/trureturing-books/actions/runs/43484846290
[old-pr2]: https://github.com/the-omega-institute/trureturing-books/actions/runs/43476896369
[old-up-doc]: https://github.com/the-omega-institute/trureturing-books-template/actions/runs/43494874035
[old-pages]: https://github.com/the-omega-institute/trureturing-books/actions/runs/43488829787
[old-up-pages]: https://github.com/the-omega-institute/trureturing-books-template/actions/runs/43496749215
[before-ci]: https://github.com/the-omega-institute/trureturing-books/actions/runs/43515344955
[before-pages]: https://github.com/the-omega-institute/trureturing-books/actions/runs/43515345025
