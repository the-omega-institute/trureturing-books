# 终章与附录准确性修复 · 2026-11-12

## 授权、输入与覆盖边界

本记录只追加，不回写既有证据。实施输入由调用方指定为 `85bb7bbee0ffe54656d5f0ee4c4d4846466fbe9d`，工作目录为当前书库，分支由调用方保留为 `fix/content-accuracy-ending-appendices-20261112`。所钉来源仍为 `trureturing@dev` 的 `1d9bf98cab8306e67ec38a739359f2cdae63877a`，锁文件与实施前副本逐字节相同。没有通过本记录宣称新的主线、独立批准或出版完成。

原 35 单元目标中，本次准确性修复切片恰为：第 30 章、终章、附录 A、附录 B、附录 C，中英各一份。README、序曲总览图、overview 演示文稿、golden-cut-observer 与 spatial-attractor-deja-vu 仅承担所列问题的依赖消费者修正，不能另算完整章节覆盖。当前出版目录的 44 单元、39 章、10 部是输出依赖；新增第 31–39 章没有因此获得全文准确性批准。历史 9/35 不是当前累计批准，本批尚须最终集成与独立审查，不据此改写全目标覆盖状态。

本次是两个有限实施任务中的 assignment 1；完成本次交付后仍余 assignment 2：调用方确认共享依赖、当前 main、模板对应与最终输出。两项均完成后，调用方必须编排首次 R1 三席审查，并负责提交、及时 draft PR、CI、合入与 Pages。不得以本次 check/build 或实施者的判断替代该审查。

## 历史输入的复用

只读取调用方列明的已完成 canonical conclusion：current85-template-delta、PR126 current44、PR125 delta、original ending/appendices intake、两份 queued delta dispositions 与两份 AP11 style-preserving direction。其 log_ref 始终作为不透明引用，不读取内容。原始 intake 的 d170 正文与旧输出仅为历史证据；current85 对应负责确认相关旧段落及来源仍适用。PR125 插入的三间隙/黄金下界段落按实际当前文本重新核算，不能套用旧整章补丁。AP12、F11 与 N113-03/04 的旧数字不复活。

当前校正依照实际双语文本、完整相关 Lean 定义/定理及解释所需证明，并核对 exact-pin Frozen 记录；没有运行 Lean 编译，也没有把签名摘录升级为更强证明。具体下载文件、逐份 SHA-256 与 53 条匹配锁声明见实施证据 source/manifest.json；独立计算与保存检查见 evidence/independent.json。与本轮源码不相同的旧 HTML/PDF/EPUB 一律不作当前输出证据。

## 保留问题的逐项处置

| 问题 | 本次处置与核查依据 |
| --- | --- |
| AP01 | 虚拟 Z 共轭改为 Rz(φ) Rxy(θ,0) Rz(−φ)=Rxy(θ,φ)；三脉冲迹界仍归原 Frozen 锚点，虚拟 Z 恒等式归文献。独立复矩阵乘法核对符号。 |
| AP02 | 对易子反自伴性注明 A、B 自伴，区别于原锚点的平衡混合乘积。B.5 写明 S=A+B、SS†=I、AA†=BB†=I/2，结论是 (AB†)†=−AB†。终章词条同步明确归属。 |
| AP03 | 量子 CHSH 是上界 2√2 且可达，不是所有量子值均大于经典界。最大混态给 0，Bell 态达到 2√2。 |
| AP04 | 实二次型在 R×Rᵈ 上，对所有闵氏零向量均消失才推出存在实数 c 使 Q=cη，保留全称与存在量词。 |
| AP05 | 桥图最大流等于最小割摘要补齐正自然维数、a≤b、c≤d 与两对二次容量锥条件。 |
| AP06 | 深度公式在词典与 A27 的解释栏均补 N、κ 为自然数，1≤κ、2κ≤N；原作者引文栏不动。 |
| AP07 | 条件分支迹为 1 须有非零分支权重。 |
| AP08 | 本书三维基片约定下 v 的双向量对偶为 vI₃，e₁I₃=e₂₃；用 I₃⁻¹ 会反号。 |
| AP09 | B.8 按实际 TwoAxisFiniteRotation 定义写 R³ 中不共线两轴完整转动圆的有限字生成 SO(3)，不虚构 TwoAxisModel 或固定 N。 |
| AP10 | Cl3/ZYZ 参考引擎及其文献恒等式与 Weyl/Bloch/双轴旋转字等 Frozen 依据分别归属；附录、终章词条与阅读路径同步限定。 |
| AP11 | 保留“迎光”题记、隐喻、内向青色箭头及 II/III 栏；O 与朝向光源的 A 同向、O·A=1，入射传播是 −A。只改 I 栏标签、ALT、相邻说明与演示文稿消费者。 |
| AP12 | CLOSED-current：重新计算 241 个环境/媒体 theorem GID、89 个辅助定义、114 个行内声明，共 444；不回补旧数字。 |
| F07 | 第 30 章 C₅ 改为“一个奇圈”，不再声称最小奇圈；无其他第 29/30 章重审扩展。 |
| F08 | 终章 S³ 是 Hopf 纤维化的旋量总空间；不是 S² 的二重覆盖。S³→SO(3) 的二重覆盖背景保留。 |
| F09 | 只修 ρ=14 的双稳定点：参数决定可用吸引子，起点的吸引域决定去哪个。独立 Routh–Hurwitz 与 RK4 复核 C±，页面显示两轮各自目的地。ρ=28 的既有两翼叙述不重修。 |
| F10 | 一致重复性的文献摘要限定非奇异规则模型集，终章引用清单同步。 |
| F11 | CLOSED-current：当前登记表本来为 55 行/54 个 raw GID，旧 36/37 数字不适用。完成 N126-03 后同样是 55 行/54 个有效唯一 GID。 |
| F13 | 当前 golden 实验室只显示已观察的完整访问间隔和经验倒数；无两次访问时显示空值。去掉有限前缀“下界通过”与用样本认证所有未来间隔的说法；终章当前图注区分样本与存在性 n₀、M 及最终 ε 下界。三间隙/黄金下界插入按 PR125 现文独立核算。 |
| F17 / D01 / D02 | 文稿任意单比特幺正的 ZYZ 分解注明整体相位；第 2 页余弦限定序曲实单位向量投影图景；附录 A 与终章 T31.2 注明连续复值可观测量。 |
| N113-01 | 保测性只使全空间积分相等；在 Eₙ 上利用 Mₙ 在外部为零与 Mₙ∘T≥0 得积分不等式。二点保测置换例子独立显示受限积分不必相消。 |
| N113-02 | 最近 binary64 的精确实数 π−3 首次归零步为 53；先舍入 π 再减 3 才是 48。用独立高精度 Machin 公式与精确分母复算。 |
| N113-03 / N113-04 | resolved-current，按后续已完成处置保留现文，无旧补丁。 |
| N113-05 | 物理盆地文献结论限定有界连续相空间观测、连续时间平均与 Lebesgue 几乎处处；Frozen 离散遍历定理应用于 ∫₀¹g(φₛx)ds，给 SRB 几乎处处结论。两幅具体起点不由几乎处处定理认证。 |
| N125-01 | 黄金下界的渐近分母主项系数不能减小，不能误写为不能增大；Fibonacci 有理逼近独立检验趋于 1/√5。 |
| N125-02 | 黄金角的连分数是 [0;2,1,1,…]。 |
| N125-03 | 两种弧的段数为相邻 Fibonacci 数只用于 Fibonacci N；N=7 的段数含 4，不能普称。 |
| N126-01 | 外部依赖 PENDING：T042 重复/T041 缺失由 PR133（调用方最后读到 open，head 9db7460a1d7d842b0f23dd9f0e245f09eeb0e046）独占；待正式合入后调用方集成。本轮不改序号或 PR130 所有的地图源/数据，不宣称关闭。 |
| N126-02 | 独立逐章集合与 C.1 索引交叉计算合计 322，修导言的 317；现有图稿本来正确，不重造。 |
| N126-03 | 终章两条不存在的纯代码登记 GID 改为章内实际引用且已锁定的 unit_perpendicular_pair 与 exp_tail_le；说明公共单位法线及带完备性、单位范数为 1 的赋范代数 Taylor 尾界。相邻三轴恢复/快度的归属据实际锚点限定，真实文献和作者解释保留。没有增删 lean 属性或行内 lean 链接。 |
| N126-04 | 只称单位模重叠假设下所选矩阵元的振幅共轭复合恢复；双相位证书是逆一个副本未恢复、逆两个恢复，不是局部不可逆证明。0.5→−0.5→−0.5i→0.5 模长均不变。 |
| N126-05 | prior 是前一模块的记录定义；定理为逐点相等，没有概率先验或分布参数。 |
| N126-06 | 固有时比值为 cosθ，不是 sinθ；原引文保留。 |
| N126-07 | README 与终章实际文献导航改为所指文献框确有的单子论/过程哲学、虚拟 Z/贝里、固有时/锌火花/Weber–Fechner/Lisp、Gudermannian/庞加莱/埃舍尔、量子擦除/预测加工/REM、QRAM/Page–Wootters/递归页表。只是消费者对应，不审新章正文，不新增文献节。 |
| N126-08 | 39 页文稿实质分部讲解为 I–VIII，配当前十部三十九章阶梯、全书计数及导航；修导读、终章与 deck blurb 的全覆盖承诺，不新增幻灯片。 |

F02–06/F16 属完成的 PR134/ch29；F12 属 PR114；F14/F15 属 PR127。相应章节/实验室不改，不复制修复。A125/A113/A122 保持 advisory，不据此扩张审计。技能当前由 PR127 维护，本轮不改。未访问 PR118 的其他工作树或封存工作。

## 保存与实施方法

中文先修事实，英文随后同步。实施前后环境头、ID/GID、lean 链接及媒体序列逐项相同；仅 N126-03 两个原来不存在的纯代码 GID 作必要来源更正。全部 `>` 引文与附录 A 的 A01–A66 原作者引文列逐字相同。序曲图的 II/III 栏数学与几何没有改变；所有图从既有脚本生成，无手工色值或新运行时。

交互源、测试与受影响静态帧通过直接 CLI 实施，没有子代理。首轮正常终态 success/end_turn，is_error=false；两页 normal/slow 套件分别 138/138、106/106。首轮执行报告误跑一次本次禁止的只读 `git status --short`，未写 Git；这是实际执行偏差，不能记为完全遵守 Git 禁用边界。主实施没有执行 Git/GitHub 操作。后续专门修查新增 C± 标签的窄屏裁切，终态与最终摘要在验证追加节记录。

第一次整书 build 的 site 阶段意外触发缺缓存视频的默认自动渲染，已中断（exit 130）。该流水线只写 out/ 与构建缓存，工具约定不会更新受版本管理的 poster；本轮不以此作为视频/音频验收，也不做时间戳式重建。后续显式用既有 TBOOK_FILMS=skip 禁止新渲染，保留已有环境、链接与缓存。默认字体缺失及 macOS/CI/原生阅读器区别在最终验证节保留。

## 当前实施验证追加

证据根为 `/private/tmp/qg-ending-impl-20261112/`，只使用本轮自行生成的来源副本、计算结果与构建/浏览证据。完整 exact-pin 来源为 22 份 Lean 与对应 22 份 Frozen；53 条锁声明的种类、statement_id 与冻结记录一致。源码清点给出中英各 44 单元、39 章；逐章定理级锚点相加为 322、去重为 241，附录 C 为 241 条定理、89 条定义、114 条行内声明；锁为 313 theorem、123 def、8 inductive。上述计数不是新章节内容批准，T042/T041 的外部序号依赖继续待 PR133。

独立验算见 `evidence/independent.json`：虚拟 Z 复矩阵误差不超过 1.12×10⁻¹⁶；CHSH 的 Bell 态值为 2√2、最大混态为 0；二点保测置换的受限积分为 1 与 0；binary64 精确分母核对得到 0.1 为 55 步、√2/2 为 53 步、最近浮点数的精确实数 π−3 为 53 步、先舍入 π 再减 3 为 48 步。另核对 Hodge 号、Hopf 相位纤维、ρ=14 的稳定性与两条独立 RK4 轨道、黄金连分数/弧数/渐近系数、当前有限回归样本、整体相位、选定矩阵元的相位复合与标量 Taylor 界。最后一次保留检查仍确认全部环境头、媒体顺序、lean 属性/链接、引文行及 A01–A66 作者引文栏相同；锁文件与输入副本相同。

交互第二次直接 CLI 已正常完成：success/end_turn、is_error=false、33 turns、953882 ms、0 子代理；终态元数据与摘要为 `evidence/media-cli-followup-completion.json`、`evidence/media-followup-summary.json`。最终 golden normal/slow 各 138/138，spatial normal/slow 各 130/130；首轮 spatial 的 106/106 只保留历史输入归属。用既有 st.tag 的 dx/dy 放置新增 C± 标签，手机离屏点用方向箭头指示，未改共享相机、运行时、CSS 或其他场景。仅保留实际受影响的六张卡图变更：golden 的 returns/narrow 中英各一张、spatial 的 fixed 中英各一张；其余卡图与 thumb 均还原为输入字节。最终手机/桌面/嵌入与双语 still 已实际查看；390px 的旧标题/场景芯片重叠、旧标签裁切与相机把 C± 标记留在画布外约 6px 的限制保留，不能称全手机版式通过。

当前项目浏览器套件以既有四分片入口执行，每片 9/9、合计 36/36 suites，四个进程均 exit 0。工具测试 880 项，系统解释器跳过 89 项、项目环境跳过 50 项，两次均 OK；不是 880 个均实际执行。因本机默认 Pandoc 包二进制出现 Bad CPU type，导出用已有兼容 Pandoc 3.9 的 PANDOC 配置，未安装依赖。针对实际公式导出另用 PANDOC 与 PYPANDOC_PANDOC 指向同一兼容程序，PDF math 的 19 项及 PDF layout 的 1 项均无跳过通过。字体仍走现有默认/系统回退，缺 Noto 等族的警告保留；不建立 macOS 默认、受控字体与 Linux CI 的等价性。

实际通过 tbook serve 的 Pages 子路径检查了本切片加 README 的 48 个 HTML 组合（中英 × 深浅 × 1280/390），均 HTTP 200、0 KaTeX 错误、页面宽度等于视口，无 HTML pageerror。overview 实际导出读者的第 2、3、32 页中英共六视图，修正的实向量投影、−A 与整体相位说明均可见；两语言各记录一次 Slidev Wake Lock permission request denied，浏览脚本因这两项 exit 1，内容载入成功不等于零浏览器错误。没有修改托管播放器来屏蔽权限错误。

终章末尾两间实验室各自的实际 640px 任意控件嵌入，中英与桌面/手机共八组合，实际指针/键盘操作见 `evidence/readers/embedded-controls.json`。桌面可改参数与时间轴并读出 N=233 或 t=40；手机可改窗口中心、选择 ρ=14，读数随之更新，但两页时间轴的指针操作超时，轨道控件被共享手机布局挡住。此项明确待已有模板所有者处理，不以强制点击、事件注入或下游 CSS 修复冒称通过。读数完整区分有限样本与 n₀/M 的存在性，并显示 C− · C+ 及吸引域说明。

实际阅读还揭示表 B.5 的一行会挤入相邻列、B.10 过长公式缩得过小；已在中英同一条已确认修正中分行。B.10 同时把实二次型的 R×Rᵈ 定义域、全称零锥假设与存在实比例因子写明；完整来源允许任意自然空间维数，没有添加正维数假设。表格不再依靠省略的 c 量词。后续最终构建、产物摘要及读者复查在下一追加节封存。

## 最终产物与交付边界追加

最终构建是 `PANDOC=/Users/auricstudio/.local/bin/pandoc TBOOK_VERBOSE=1 TBOOK_FILMS=skip ./tbook build html pdf epub slides site --book quantum-geometry`，exit 0，证据为 `evidence/build-final-formulas.txt`。这是本机现有默认字体回退配置，不是受控字体或默认 CI 字节验收。影片 001 使用已有缓存，002–008 用未建海报回退；无整片/音频或发布时间戳式视频验收。overview 中英各 39 页，末次公式重排未变动 deck 源码，使用同依赖缓存；此前实际导出与六个读者视图支持这份未变文稿，不能算主题 IX/X 的分部讲解。

| 最终文件 | 页数 / 校验 | SHA-256 |
| --- | --- | --- |
| `build/dist/quantum-geometry/quantum-geometry-0.1.0-zh-screen.pdf` | 869 页 | `a8f5bfece09dce2cb4b51cd88cf812074d09a068b1fb7de7dccb0d465a210788` |
| `build/dist/quantum-geometry/quantum-geometry-0.1.0-zh-print.pdf` | 908 页 | `c3e65de81ed9e091637f890420045d2f6e5bfea45d89ba3e224f365160ca8602` |
| `build/dist/quantum-geometry/quantum-geometry-0.1.0-en-screen.pdf` | 926 页 | `65f258dcdbcac64e671419c9a42d79f121b32b44c7deb3b7e3a56c736a9e114c` |
| `build/dist/quantum-geometry/quantum-geometry-0.1.0-en-print.pdf` | 958 页 | `82c020be5a59288964477cd94a103eefdbd67abfe85647fd4787358e55f5eb0b` |
| `build/dist/quantum-geometry/quantum-geometry-0.1.0-zh.epub` | EPUBCheck valid、0 errors、0 warnings、未跳过；223 XML 可解析 | `ae07d26ff3c1284f365826d9c11b9fdb29ee7ef80062259a8390f26228d710d4` |
| `build/dist/quantum-geometry/quantum-geometry-0.1.0-en.epub` | EPUBCheck valid、0 errors、0 warnings、未跳过；223 XML 可解析 | `95710902911ae52366a3e8cc5c8b640122aa7702c0ef88395ce71b97bc1c9773` |
| `build/slides/quantum-geometry/overview-zh.pdf` | 39 页 | `ba716e1a9c5fafca01ec092d350006a782e2b4d1aa95fdd2e124b00c4910e03b` |
| `build/slides/quantum-geometry/overview-en.pdf` | 39 页 | `26d0b7de6cd302932f748b6114951464ece5d57b3e14600670947acbf65e9d77` |

最终四版 PDF 的受影响页面中没有本次所查 aligned/gathered 数学源码泄漏或页面物理边界外文字。已实际查看中英屏幕/印刷的词典、条件、登记及序曲页面；序曲三栏在真实印刷 PDF 完整，既有 fig print-shot 的第三栏裁切只留作预览工具限制。长表会跨页，未声称整书逐页排版批准。首轮重排后仍有 B.10 轻微挤占，已把假设分为短行；另发现本轮 A 表两处 `\times` 被错误转成制表符、显示成 RimesRᵈ，已修正并扫描本切片正文没有 literal tab，最终截图显示 R×Rᵈ。旧构建及截图只保留实际旧字节归属，不替代本节摘要。

最终 EPUB 两包均重新执行 EPUBCheck，并实际读取提取包的中英 XHTML/MathML：六个消费者、两种浏览器配色偏好，共 24 视图。浏览器的 dark preference 并不把固定纸面 EPUB 样式变成夜间主题；表格在窄列有较密换行，不能据此宣称原生 Apple Books 或任意阅读器全版式通过。实际 −A 序曲、B.5/B.10 公式、修订登记已在提取包截图中检查，原生 Apple Books/实体设备未验收。

`evidence/consumer-correspondence.json` 核对两份最终发布 main.js 与源文件相同、六张保留变更的 still 在实际 EPUB 中逐字节出现、两个序曲图等于现有 materialize(paper, ground=True) 与 slide_svg 的各自变换、八份实际站点下载与构建产物相同，并保存相关 HTML/site 页与导出 SHA-256。HTML 使用交互 iframe，不假定 JPEG 旁拷在实验室发布目录。初始一次性对应脚本误假设 deck SVG 与 canonical SVG 字节相同、EPUB 不带纸面背景矩形、卡图旁拷在 runtime 目录，均已依据现有工具变换纠正，没有改变产品或模板。浏览脚本也曾在 sticky 栏遮挡点击/长页稳定性等待处超时，改用正常菜单关闭和即时阅读滚动后完成；最终 48 HTML + 6 slides 的结果只保留两项已述 Wake Lock 权限错误，不能把失败尝试隐作通过。

最终 check 为 1 本可见书、0 errors、0 warnings；图时效性为 150 个、0 stale、0 errors。所有文件与证据最终摘要由交付 canonical conclusion 给出；本台账本身与全局台账指针均只追加。此次未执行提交、推送、PR、主线查询、目标/生命周期或任何委派操作；首轮直接 CLI 的一次只读 Git 边界偏差已明确记载，不包装成完全守界。未触碰禁止的根用户笔记、锁、托管路径、技能迭代、其他所有者的正文/实验室/地图，也未进入其他工作树。

本次 assignment 1 已完成约定修复和本机验证，尚余且只余 assignment 2（共享依赖/当前 main/模板最终对应及最终输出）。两项之后的首次 R1 三席、提交、及时 draft PR、CI、正式合入与 Pages 仍全部由调用方负责；本交付没有独立批准、PR 或全目标完成结论。PR133 与共享手机轨道控件的模板所有者待办明确保留。历史 9/35 与新 31–39 的边界不变。

手机 HTML 长表的最后补查：中英 × light/navy 共四组合，实际横向滚轮使既有 table-wrapper 从 scrollLeft=0 移动到公式列；公式与来源可通过既有横向滚动读取，整页仍无横向溢出。截图与几何记录见 evidence/readers/table-scroll.json。此项不取消已述任意嵌入时间轴的共享手机限制，也不等同 EPUB/原生阅读器全版式通过。
