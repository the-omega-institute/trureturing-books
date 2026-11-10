# quantum-geometry 内容准确性覆盖与证据

核对日期：2026-11-11。中文为权威，英文逐段对照。本记录区分内容证据与输出验收；构建成功不证明物理解释成立。只对序曲及第一章作局部事实纠错，不改作品方向、章首题记、Lean 声明或锁文件。现行工作树以主线 `de48d8d0b2a032a9c31e71f5f37132aee4f71a59`（含 PR #55、#56）为基准，沿用首轮在 `f9f092a319b6e46a5a1afd92ff2c4942daefa792` 上取得的证据时另核对依赖。全目标为现有中英 SUMMARY 的 35 个单元，本批覆盖 2 个，33 个待核对。本地核对不等于独立复审、合入或部署完成。

## 全书覆盖

“已覆盖”表示两种语言的全部段落、公式、例子和本章图片均已读并按下列证据核查；首轮确认问题修复后仍待独立复审。“待核对”没有内容准确性通过结论。为查证序曲中的引用与导读，局部查阅第 6、10、16、23、24、29、30 章；这些查阅不计入章节覆盖。

| 序号 | SUMMARY 文件（中英同名） | 中英覆盖 / 状态 | 证据 |
| --- | --- | --- | --- |
| 0 | README.md | 已覆盖；确认问题已作最小双语修正 | P1–P8、Q1–Q4、R1–R7 |
| 1 | ch01-measurement.md | 已覆盖；确认问题已作最小双语修正 | F1–F6、D1、C1–C5、Q3、R1–R7 |
| 2 | ch02-born-rule.md | 待核对 | — |
| 3 | ch03-projectors-and-duality.md | 待核对 | — |
| 4 | ch04-decoherence.md | 待核对 | — |
| 5 | ch05-complex-phase-and-rotors.md | 待核对 | — |
| 6 | ch06-geometric-product.md | 待核对 | — |
| 7 | ch07-geometric-time-and-speed-limits.md | 待核对 | — |
| 8 | ch08-erasure-and-time-arrows.md | 待核对 | — |
| 9 | ch09-axes-and-state-addressing.md | 待核对 | — |
| 10 | ch10-gram-geometry-and-order.md | 待核对 | — |
| 11 | ch11-pulses-and-virtual-z.md | 待核对 | — |
| 12 | ch12-measurement-computation-and-gradients.md | 待核对 | — |
| 13 | ch13-entanglement-and-chsh.md | 待核对 | — |
| 14 | ch14-cloning-codes-and-braids.md | 待核对 | — |
| 15 | ch15-grover-qft-and-period-finding.md | 待核对 | — |
| 16 | ch16-qsvt-walks-and-compilation.md | 待核对 | — |
| 17 | ch17-lorentz-geometry.md | 待核对 | — |
| 18 | ch18-spinors-and-gauge-curvature.md | 待核对 | — |
| 19 | ch19-tensor-networks-and-holography.md | 待核对 | — |
| 20 | ch20-complexity-and-spacetime.md | 待核对 | — |
| 21 | ch21-diagonalization-and-escape.md | 待核对 | — |
| 22 | ch22-primes-euler-products-and-zeros.md | 待核对 | — |
| 23 | ch23-diophantine-definability.md | 待核对 | — |
| 24 | ch24-cosine-fixed-points-and-self-reference.md | 待核对 | — |
| 25 | ch25-rewriting-and-xor.md | 待核对 | — |
| 26 | ch26-single-qubit-rotor-compilation.md | 待核对 | — |
| 27 | ch27-reading-frozen-proofs-i.md | 待核对 | — |
| 28 | ch28-reading-frozen-proofs-ii.md | 待核对 | — |
| 29 | ch29-timeless-causality-and-gram-space.md | 待核对 | — |
| 30 | ch30-fields-lines-eth-and-navier-stokes.md | 待核对 | — |
| 31 | coda.md | 待核对 | — |
| 32 | appendix-a.md | 待核对 | — |
| 33 | appendix-b.md | 待核对 | — |
| 34 | appendix-c.md | 待核对 | — |

## 固定源码与冻结条目

现行源码基准为 `trureturing@38196c62e121b0a334b903eea2a513bb2587e41c`；首轮逐条核对和原始取样基于 `52725b62b659b244d077e29f18a576aa809007b7`。本次在 trureturing 只读检出中分别用 `git show <提交>:<路径>` 取两版源码、冻结状态片及现有 Blueprint，逐项比较字节和锁项；下列链接指向现行提交。状态片摘要是模块级，不当作每条定理的独立陈述摘要。未重跑 Lean；这里核对的是既有冻结证明与书中陈述/解释的对应，非新增形式化。以下用正文稳定 `#id` 定位，中英同用，不复制锁文件完整签名目录。

两版的 13 个 Lean 文件、13 个冻结状态片及 12 个可用 Blueprint 字节完全一致；GoldenPell 在两版均无该路径下的 Blueprint。比较覆盖 23 条声明：第一章六条结论、一条定义、四条直接链接的辅助定义；序曲引用的两条 Robertson 结论；六条支撑声明（包括泡利矩阵、态类型、格拉姆恒等式）；及第八部导读所用的四条源码证据。逐项核对了冻结声明的全名、种类、模块摘要、Lean 行号和已有锁项；这些锁项的签名文本也无变化。故第一章正式陈述及证明解释、P2 的不确定性范围和 P8 的局部导读证据可沿用相同源码依赖，没有因换钉产生额外正文修订。逐文件 SHA256、声明及行号在 `build/content-accuracy/integration-381/source-comparison.json`，现行源码副本在同目录 `sources/`。按 `site.toml` 的 `dev` 核对，现行 pin 是 trureturing 本地远端跟踪分支 `origin/dev` 的祖先；310 项锁文件与现行主线逐字节相同。

### F1 · thm-parallelogram-norm-law

[源码 L22][par-src]；[冻结状态片][par-frozen]，`inner_product_norm_parallelogram_law`，`kind=theorem`。类型为任意 `E : Type*`、`NormedAddCommGroup E`、`InnerProductSpace ℝ E`；全称量化 `x y : E`。不需要有限维、完备或单位向量。结论为两条对角线平方模之和等于两边平方模和的两倍。源码直接调用 `parallelogram_law_with_norm ℝ x y`；书中的实双线性展开解释忠实。复振幅的物理解读另按 C1 修正，未扩大正式结论。

### F2 · lem-qubit-weyl-star

[源码 L24][fin-src]；[冻结状态片][fin-frozen]，`qubit_weyl_star`，`kind=theorem`。固定对象是 `Matrix (Fin 2) (Fin 2) ℂ` 中源码 L18、L21 的 X、Z，不是任意两可观测量。五个合取项依次为反对易、自伴、自伴、平方等于单位、平方等于单位。源码逐下标 `fin_cases`、展开有限和；正文四矩阵元相乘与之相符。实平面解释中 XZ 为逆时针 90°、ZX 为顺时针 90°，相差普通向量半周转动 −I；已删除错误的旋量半角解释。

### F3 · thm-qubit-no-character

[源码 L46][char-src]；[冻结状态片][fin-frozen]，`qubit_matrix_algebra_has_no_character`，`kind=theorem`。结论类型 `IsEmpty (QubitMatrix →ₐ[ℂ] ℂ)`：不存在保单位、加法、复数数乘和**所有矩阵乘法**的全局同态，乘法要求包含非对易对象。无态、概率、隐变量或上下文性假设。证明将 ZX=−XZ 映入交换的 ℂ，得乘积自反相反故为零，再与两个平方均为 1 矛盾。中英正式框及证明均正确；周边“否定一切隐变量”的扩大解释已收窄，移除 Kochen–Specker 原型归属。该提交 Blueprint 对此明确限制：不是 Kochen–Specker 赋值定理，不排除单比特非上下文投影赋值。

### F4 · cor-pauli-no-common-eigenvector

[源码 L18][wit-src]；[冻结状态片][wit-frozen]，`pauli_observables_have_no_common_eigenvector`，`kind=theorem`。`psi : Fin 2 → ℂ`，任意 `x z : ℂ`，假设 Xψ=xψ、Zψ=zψ，结论 ψ=0；不要求归一化，也不先假设特征值为 ±1。证明取四个分量方程，若 ψ₀≠0 则 ψ₁≠0、z=1，再得 ψ₁=−ψ₁=0，矛盾；最后两分量皆零。书中证明逐步相同。正文已区分希尔伯特零向量与最大混合态：两组纯态极点不相交，ψ=0 无纯态布洛赫像。

### D1 · def-preserves-ray

[源码 L54][ray-def-src]；[冻结状态片][ray-frozen]，`PreservesRay`，`kind=def`。环境为任意有限可判等 `ι`，`A : Matrix ι ι ℂ`、任意 `x : ι → ℂ`；定义本身不要求 A 幺正。条件是 A*x 属于 `Submodule.span ℂ {x}`，等价于存在复数 d 使 Ax=dx；x=0 时 span{0}={0} 为零维，条件自动成立。已修正双语定义“一维”遗漏的例外，并保留零向量。

### F5 · thm-ray-phase-rigidity

[源码 L97][ray-src]；[冻结状态片][ray-frozen]，`unitary_phase_of_connected_ray_tests`，`kind=theorem`。任意有限可判等 ι，包含空类型；A 是复矩阵且属于幺正群；全称保持各 `Pi.single i 1`；测试族是 `Set (ι → ℂ)`，全称保持所有族中向量；支撑关系是“存在同一测试向量同时在 i、j 非零”，要求所有 i、j 经其自反传递闭包相连（L59）。结论存在 c∈ℂ，‖c‖=1 且 A=cI，不声称 c 唯一（空维时尤其不唯一）。证明先由坐标射线消除非对角元，再在非零支撑分量消因子，沿有限重叠链归纳传播对角元相等；幺正性给出模长 1。空维分支以 c=1 和矩阵类型单元素性解决。中英证明与源码一致。N−1 最近邻例子现在显式依赖 N 条坐标射线检验及 N≥1；N=1 时额外测试族为空，定理的空指标情形另行保留。

### F6 · prop-qubit-bloch-core

[源码 L31][bloch-src]；[冻结状态片][bloch-frozen]，`B_formula_core`，`kind=theorem`。所在文件为 `QubitBloch.lean`，实际声明命名空间是 `D5.S3.Quantum.Measurement.FourQubitParentConstruction`，已与锁项一致核对。全称 `a : EuclideanSpace ℝ (Fin 3)`；输出是复 2×2 矩阵。此处 a 可为任意实向量，不要求单位长度、正性或迹一。B 的定义 L27 为三条实系数泡利组合；逐四个下标展开、环化简，得到对角 a₂,−a₂ 及副对角 a₀∓ia₁。中英正式框和证明正确。源码 L39 的 `scalarB(t,a)=tI+B(a)` 是辅助定义；正文现先限定物理态 ‖a‖≤1，再取密度矩阵 `scalarB(1,a)/2`；纯态讨论取 ‖a‖=1。此正性条件不加入任意实向量的正式代数命题，六极点例子按把 B 的展开式代入 ρ 的定义来对照。

## 独立计算与其余正文覆盖

以下解析理由与原始数值独立于构建系统。可复算的本地计算在 `build/content-accuracy/calculate.py` 与 `calculations.txt`；它们是本次忽略的诊断文件，不构成新的审计或 CI 框架。

### C1 · ch01 / sec-ch01-1

取实向量 x=(1,0)、y=(1/2,√3/2)。直接平方给出 ‖x+y‖²=3、‖x−y‖²=1，内积 1/2=cos60°。平衡混合矩阵 2⁻¹ᐟ²[[1,1],[1,−1]] 的伴随乘自身是 I，故两输出强度应为 3/2、1/2，总和 2 等于两输入各 1 的能量。原始平方模和为 4 不可称输出总能量。实极化差为四倍内积；复情形差为四倍实部：例 x=(1,i)、y=(i,0)，内积为 i 而平方模差为 0，足以反证“差就是完整复内积”。完整复部需再选相对相位；这里不对相位扫描方案作新定理承诺。已保留原 60° 算例、校正所有强度措辞。两箭头角度须在同一欧氏内积结构下、在共同正交变换下不变；“一子”“第三点 C”是作者对关系及坐标冗余的解释，不是由范数律推出物质本体论或禁止坐标。

### C2 · ch01 / sec-ch01-2

直接乘法复算 XZ、ZX、X²、Z²、自伴性及四个特征向量方程，均吻合 F2–F4。计数器不普遍输出 ±1；已把二值标签限定为本章理想的二结果自旋测量。飞轮/快门是离散记录的比喻，不是从连续飞轮推导量子谱或 Born 规则的证明。本章开场已把“先丈量后份额”明示为作者诠释，未把哲学命题塞进绿色框。

### C3 · ch01 / sec-ch01-3、def-preserves-ray、thm-ray-phase-rigidity

非零复二分量共四个实坐标；归一化留下 S³，按整体 U(1) 相位做商为 CP¹≅S²。物理纯态采用射线是标准描述约定，F5 只给出保持射线的幺正刚性，不推导此约定。上述既有纯态/霍普夫讨论已放入 `rem-pure-ray-literature`，标明文献结果未在本书形式化；[Hopf map](https://mathworld.wolfram.com/HopfMap.html) 的式 (3)–(8) 与圆纤维/商映射已读，用坐标 (X₁,X₂,X₃,X₄)=(Reα,Reβ,Imα,Imβ) 对照得到相同的布洛赫三坐标。相位必须乘整个归一化态；只乘一个相干分支则可能改相对相位。已经消除“无绝对时钟所以任何实验不可区分”的因果替代。归一化投影 |ψ⟩⟨ψ| 在 cψ 下不变，使用 |c|²=1。

最近邻测试的反例：N=2 时 X(1,1)=(1,1)，X 却有非零副对角元，故只测 e₀+e₁ 不够；需先验证坐标射线。对角 A 下，测试非零分量消去得到相等对角元，N−1 链足够。断连分支的独立相位只对不跨分支的允许射线检验不可见；正文的超选例子以确实禁止跨分支相干叠加为前提，不能推广成任意实验均不可见。

### C4 · ch01 / prop-qubit-bloch-core、ex-bloch-six-poles

独立展开 iXZ=Y，B²=|a|²I；ρ=(I+B)/2 的迹为 1，Trρ²=(1+|a|²)/2，特征值 (1±|a|)/2。故且仅当 |a|≤1 时为密度矩阵；a=(0,0,2) 时为 diag(3/2,−1/2)，反证无范围的物理断言。|a|=1 时为纯态投影；a=0 时是 I/2，并非 ψ=0 的外积（后者迹为 0）。副对角实际是 (a₀∓ia₁)/2；两个对角元为 Z 结果概率，不是高度本身。

将 ψ=(cos(θ/2),e^{iφ}sin(θ/2)) 直接作外积，逐元得到 (sinθcosφ,sinθsinφ,cosθ)，范数为 1；γ 全局相位抵消。逐项重算表中 ±Z、±X、±Y 的六个投影，均自伴、迹一、幂等。每对极点在布洛赫空间反向（点积 −1，180°），在希尔伯特空间正交；三条轴之间才两两垂直。已修正“三对对跖正交”的歧义。一般两归一化纯态满足 |⟨ψ|φ⟩|²=(1+a·b)/2=cos²(θ/2)，故射影希尔伯特角 arccos|⟨ψ|φ⟩| 是布洛赫夹角一半。章节尾声仍是作者的关系性诠释，S² 已限定到单比特纯态。

### C5 · 第一章图及双语

`fig-01-pairwise-measurement.svg`：检查全部文本标签。SO(3) 保范数正确，因孤立单位箭头没有“相对角”，将含混的 `0 relational invariants` 改为 `no relative angle`。极化公式用实内积；S³/U(1)≅S²、泡利 B 组合及 ZX=−XZ 均正确。绿色栏中的范数律、无特征标与相位结论对应 F1、F3、F5。此前实际图像仍裸列 A=cI，图像替代文本无法充当可见前提；本轮在原 SVG 底栏内分为两行，第二行可见地写明 A 幺正、保持全部坐标射线与测试射线、测试支撑连通后才推出 A=cI、|c|=1。中英替代文本和相位解释同步显式保留测试射线。+1/−1 只示意理想二结果快门。保留原图尺寸、分栏、主题色与静态 SVG；底栏高度由 26 调为 36，未新增组件或运行时。

双语逐段核对：六个形式框、定义、六个证明、六极点表及媒体对应；实/复域、未归一化/实际强度、全局/相对相位、零向量/混合态、纯态/一般态、额外测试前提一致。章节题记见 Q3。

### P1 · README / sec-blindspot-1、sec-blindspot-2

单位方向同向时 o·a=1，沿视线正交投影为零横向位移；这是理想几何观察图像，不是把真实有限宽光束或粒子实验还原为一条数学线的证明。转盘的投影 x(t)=cosωt，速度 −ωsinωt：中心模速最大，端点为零，90°/270° 同位置反向速度；所谓弹簧/隐变量均属修辞比较。对单位 a,b，a∧b=sinθ Î。固定 a=e₁、令 b(t)=cos(ωt)e₁+sin(ωt)e₂ 时，a∧b(t)=sin(ωt)e₁∧e₂：改变的是有符号面积，平面未转动；两方向共同转动时楔积反而不变。序曲两处现均把匀速转动归于平面内方向，保留转盘意象。在定向欧氏平面 Î²=−1，对平面向量两次 90° 转向为 −I。推广到任意量子门或一般高维纯态的散文意象不当作形式结论。图注已给单位长度约定。

### P2 · README / sec-blindspot-3、rem-prelude-sphere-literature

三张坐标平面两两交一根轴，二面角 90°；其坐标双矢量在 Λ²ℝ³ 中正交。纯态 CP¹≅S²；一般 d 下实维 2d−2，广义布洛赫环境维 d²−1，d≥3 时不是整颗球面（2d−2<d²−2），混合态在球内凸体。物理装置已区分真实空间自旋轴与超导量子比特的有效布洛赫轴。

固定 θ 扫 φ 时 z=cosθ，θ=π/3 给 z=1/2 的纬圈反例；只有 θ=π/2 得赤道。已经修正“每个干涉平面都是大圆”。泡利乘积恒等式给 [a·σ,b·σ]=2i(a×b)·σ。Robertson 是态依赖的 ΔAΔB≥|⟨[A,B]⟩|/2；不是“只要不对易就每态有正的统一下界”。例如 Z 极点中 ΔZ=0、⟨[X,Z]⟩=0，可见不对易仍可给出为零的态依赖下界。来源为 H. P. Robertson, *The Uncertainty Principle*, Phys. Rev. **34**, 163–164 (1929), DOI 10.1103/PhysRev.34.163；公开综述的 [Robertson–Schrödinger 关系及引文](https://en.wikipedia.org/wiki/Uncertainty_principle#Robertson%E2%80%93Schr%C3%B6dinger_uncertainty_relations) 已核对，原刊下载端点拒绝访问，未声称读过原刊全文。有限维式也可由中心化 A、B 对态向量的 Cauchy–Schwarz 与虚部界直接推出。注记只把纯态空间的拓扑识别和贝里相位标作文献结果；泡利反对易特例链接 F2。不确定性链接第 6 章的两个形式结论：`#thm-robertson-schrodinger` 与 `#thm-mixed-state-robertson`。[纯态源码 L46][rs-src]在复内积空间上对称复线性算子和单位向量给出协方差平方、半对易子模平方与非负格拉姆余量的分解；[混合态源码 L68][mixed-src]对有限密度态与两个厄米矩阵给出中心化 Hilbert–Schmidt 范数乘积的半对易子期望值下界。两条均以两次 pin 的 `git show` 源码与冻结状态片核对声明名、种类及锁定模块摘要；这里只核对支撑序曲所需的范围。

### P3 · README / rem-prelude-sphere-literature（Berry）

已读取作者公开的 [Berry 原刊扫描][berry-paper]，核对标题、卷页及 §4 p.51 式 (27)：exp(iγₙ(C))=exp(−inΩ(C))；取 n=+1/2 即所用分支。正文现标明 +1 的 n·σ 本征线、定向回路、有向立体角、剥离动力学相位及模 2π。独立用第一章的 ψ 算 iψ†dψ=−sin²(θ/2)dφ，曲率 −(1/2)sinθ dθ∧dφ；积分得 γ=−Ω/2 mod2π。反向回路或相反本征线会翻转符号。此处“和乐”并不意味着一个全局规范势或所有闭路相位为零。第十章只用作既有约定定位，不计覆盖。

### P4 · README / sec-blindspot-4

在正取向欧氏基下，⋆₃(e₁∧e₂)=e₃，⋆₃I₃=1；在先给定的正取向 ℝ⁴ 中 ⋆₄(e₁∧e₂∧e₃)=e₄。一般 ⋆ₙ₊₁ 将旧体积元送往新增法线，未把 ⋆₃ 顶阶对偶说成第四方向。新增一维轴的单位球是 S⁰；ℝ³⊕ℝe₄ 的单位球才是 S³，旧 S² 在 x₄=0 赤道上。均匀球面积分按 a↦−a 成对抵消，平均 ρ=(I+平均 a·σ)/2=I/2。“内部盲区/升维/哥德尔”保留为已明示的哲学类比；不声称三维几何证明不完备性，也不把盲区等于测量概率零（赤道态对二值轴测量为各 1/2）。

### P5 · README / sec-awakening、rem-prelude-dottie-literature

cos 将 ℝ 送入 [−1,1]，再送入 [cos1,1]⊂[0,1]；[0,1] 完备且不变。导数模上确界 sin1≈0.8414709848078965<0.85<1，所以 Banach 给唯一不动点及进入该区间后的几何收敛。90 位以上独立求根得到 0.739085133215160641655312087673873404…，与书中小数一致。任何实不动点须先在 [−1,1] 再在 [0,1]，故唯一性确为全实域。来源：[Banach fixed point theorem](https://mathworld.wolfram.com/BanachFixedPointTheorem.html)，闭的非空 Banach 子集上的压缩自映射版本，实际应用区间满足全部条件。

Lindemann–Weierstrass 使用的是互异代数数的指数在代数数域上线性无关，参见 A. Baker, *Transcendental Number Theory*, Ch.1 Thm.1.4 的[等价表述](https://en.wikipedia.org/wiki/Lindemann%E2%80%93Weierstrass_theorem)。已核对该公开表述，不宣称读过书的全部内容。若 θ* 代数非零，则 iθ*,−iθ*,0 互异，与 1/2,1/2,−θ* 的非平凡代数线性组合等于零矛盾。对任意非零代数 q，若 cosq 也代数，令 u=e^{iq}，则 u²−2cosq·u+1=0 迫使 u 代数，违背 Hermite–Lindemann；q=0 单算残差 1。这涵盖复代数 q 的复模残差，实仪器读数是其特例。原中文“代数无关性”标题已改成“指数线性无关性”，未宣称 e^{iθ*} 与其倒数代数无关。函数/状态合一、阶乘/正交次数的解释仍是作者类比，不是代数定理。

### P6 · README / rem-prelude-finite-literature

从北极，Ry(θ) 仅到一条子午圈；Rz(φ)Ry(θ) 给 (sinθcosφ,sinθsinφ,cosθ)。任意轴加连续角也可到所有方向；不是单一固定轴即足够。有限字母表在固定最大字长 L 下至多 Σₖ₌₀ᴸ|G|ᵏ 个字，故可达态有限，其凸包为内接有限多胞形；四点不共面时才三维。独立在 SO(3) 中用 H:(x,y,z)↦(z,−y,x)、S:(x,y,z)↦(−y,x,z) 闭包枚举得六个轴极点。det(−iH)=det(e^{−iπ/8}T)=1。

[Boykin 等，quant-ph/9906054][boykin-paper] §3 的 H 与 σz^(1/4) 稠密性证明已读；其相位代表需按正文明确的 PU(2) 或幺模 SU(2) 理解。[Dawson–Nielsen，quant-ph/0505030][dawson-paper] §2 三条条件要求有限、含逆且生成稠密子群，已核对；正文补出直接采用标准编译时要补入逆门（H⁻¹=H、T⁻¹=T⁷；在 SU(2) 代表元也可有限次幂取得逆）。这里只引其条件和已有稠密性，不新增门数复杂度断言。[MacTutor 的刘徽传记](https://mathshistory.st-andrews.ac.uk/Biographies/Liu_Hui/) 记述平面内接正多边形的边长递推、圆周与圆面积逼近，并另记其未解决球体积问题。中英正文现把刘徽方法明确归于平面多边形逼近圆；三维凸包仅为本书类比，不归于刘徽。随最大门数递增、并集在 S² 稠密的 S_L 含越来越细的有限网；其凸包 P_L 满足 (1−ε²/2) 闭单位球 ⊂ P_L ⊂ 闭单位球，故实体逼近闭球体、边界逼近球面。此处 ε 是球面网距，未宣称任何门数 L 的收敛速率或算法；解析理由和反例见 `repair-r1/content-verification.json`。

### P7 · README / rem-prelude-finite-literature（余项、有限步）

[DLMF 4.19.2](https://dlmf.nist.gov/4.19.E2) 给 cos 的全复域幂级数。θ=2 时前三个模长 1、2、2/3，反证“整个级数严格递减”。对任意 N≥0，尾部从 m=N+1≥1 起，bₘ₊₁/bₘ=θ²/((2m+1)(2m+2))≤1/3。将交错尾从首项两两分组，得到 0<bₙ₊₁−bₙ₊₂≤(−1)^(N+1)R₂N<bₙ₊₁，因而严格非零且满足原界。以 200 位运算核查 θ=0.01、0.5、θ*、1、2，N=0…15 的余项符号及界，全部相符；数值不替代这一覆盖所有 N 的解析论证。

从 θ₀∈[0,1] 且 θ₀≠θ* 出发，cos 在此区间单射；若某一步首次等于 θ*，前一步亦须等于 θ*，矛盾。故有限步残差非零；并非任意实初值都有限步不达（正文没有那样断言）。开口螺旋段已明确是几何类比。三项数学边界归于文献 remark，未配 Lean 属性。

### P8 · README / sec-contract、sec-honesty-rules 与插图

两版 SUMMARY 顺序一致：八部三十章（前七部各四章，第八部两章），另有序曲、终章与三篇附录，共 35 单元。第六部导读区分整数集在有理数域中的一阶可定义性与开放的存在性丢番图定义问题；局部对照第 23 章关于 Σ₁ 与一阶定义的边界。第一部导读区分 F1–F5 所解释的线性代数与后续采用的标准量子态、测量约定；不能由 F3 或 F5 单独推出状态或测量公设。第一、二部的过时发布标签按现行主线移除，第一部保留上述限定，第二部与现行主线相同。第七部保留已发布的构造与验证路线。

第八部导读按中英文第 29 章的佩尔方程、奇素数模 4 分裂、复椭圆曲线环面与格拉姆补全段落核对；只说用补全阐释无时间因果，不把物理诠释当成定理，也不用单个行列式条件代替一般矩阵的半正定性。第 30 章把亚指数 3-SAT 作为预印本主张，把场与线作为类比；导读沿用这一分级，未独立审查预印本。按该章的示意归一化，log₂(558)/√558 ≈ 0.386255，log₁₀(2⁵⁵⁸) ≈ 167.975；导读只用作交叉尺度的数量级比较。该章的二次平流结论核对到当前 pin 上的 `quadratic_closure_iff` 与 `AdvectionClosureInstance.no_exact_closure`，后者限定在五模态傅里叶实例及其低频投影，不外推到任意流体截断或三维方程的整体正则性。第 29–30 章及其余各章的正文、证明与来源仍待逐章审查。

`fig-00-dimensional-ladder.svg` 全部标签已查：O·A=1/θ=0 按单位向量；P²=P 是投影；A∧B=sinθÎ 与 Î²=−1 按定向欧氏平面单位方向；三轴正交与 I₃=e₁e₂e₃ 按正取向；⋆₄I₃=e₄ 和一般嵌入依赖外围维数；底栏几何积、三角恒等式和不动点近似正确。STAGE III 的 3D 指外围 ℝ³，球面自身维数为 2；CLOSURE·∞ 是迭代/哲学意象，不是新无限维态定理。只补图注约定，未改 SVG。

双语比对覆盖了序曲全部段落、列表和表格。英文“in truth”用于“似乎在球外”时过强，已恢复 seems；另一个“In truth, every sphere…”对应中文“实际上”，并非同一问题，保留。一般 d 的纯态真子流形、Hodge 外围维数、Berry 模 2π、实/复代数读数域和尾项起点语义一致。

## 首轮确认问题修复（R1–R7）

此处 R1–R7 对应审查批次的修复编号 F1–F7；上文 F1–F6 仍专指六条冻结正式结论，避免混同。首轮三席均提出拒收，已确认的缺陷全部纳入本轮最小修复；尚未声称复审通过。

| 修复 | 确认问题与最小修订 | 可复核证据 |
| --- | --- | --- |
| R1 / F1 | 密度构造之前限定 ‖a‖≤1，纯态段限定 ‖a‖=1；保持任意 a 的 B 命题，并把例中 ρ 公式的归属改为代入定义 | C4；所钉 QubitBloch L27–40；`repair-r1/content-verification.json` 的特征值和域外反例 |
| R2 / F2 | 刘徽历史归属改为平面内接多边形逼近圆，三维只作类比 | P6；MacTutor 原页面副本及摘录 `repair-r1/historical-evidence.json` |
| R3 / F3 | 同一段明确递增稠密假设、凸包趋闭球体、边界趋球面 | P6；有限网与支撑函数夹逼、含原点反例见 `repair-r1/content-verification.json` |
| R4 / F4 | 图中相位结论的四类前提改为可见文字；双语替代文本与邻近解释显式要求保持测试射线 | C5；所钉 RayPhaseRigidity L97–102；Z 保坐标却不保连接测试的反例 |
| R5 / F5 | 转盘两处均改为方向匀速转动、参考方向固定时有符号面积变化、定向平面固定 | P1；e₁ 与 b(t) 的直接楔积计算 |
| R6 / F6 | 中文“总模长预算”“模长差”改为平方模预算与平方模之差；英文原已准确，保持原文 | C1；(3−1)/4=1/2，而 (√3−1)/4≠1/2 |
| R7 / F7 | 书籍双语简介为八部三十章；现行主线已修正计数并补全第八部梗概，整合时逐字保留主线简介 | 两版 SUMMARY 的八部、30 编号章及总 35 单元计数；书库与书籍落地页、EPUB 简介验收；不增加章节覆盖 |

首轮修复的本地证据单独保存于 `build/content-accuracy/repair-r1/`。`verify-content.py` 独立复算本轮数学反例与边界，并核对六条正式结论、一条定义、六个证明、四条章首题记及锁文件相对入场候选未变；固定源码、Blueprint 与冻结状态片的哈希和已有逐条源码证据一致。既有独立审查执行的 821 项工具测试（70 跳过、0 失败/错误）、4/4 可视化套件、175 组泰勒数值与六条源码对应证据只用于未变部分，未把它们重记为本轮新执行。输出变化另作本轮验收，见下节。

## 作者原话与出处

手稿 Markdown 只读，SHA256 `0d5a75076204f307b80276405e9c17d055e2fc805f7f373c575e8f00e2541020`；位置 `/Users/auricstudio/trureturing-books/ignore/量子与量子门的几何本质.md`。同目录 PDF 共 110 页，SHA256 `9ce00a951dae52ba2be4670f05490c009b5aa4035c7eb465cd53f29951267f1b`。页码以下为 PDF 物理页序号。只忽略空白、标点和 ψ 的数学排版作匹配；没有把回复中的转述自动当成作者原话。

- **Q1，README 章首第一条**：“我们认为是点，其实是线，认为是线，其实是面，认为是面，其实是球，以为看到球了，却被更大的球包裹。”对应 MD 行 1003 的原输入及 PDF p.81（p.89 也重述），逐字成立，标点差异允许。
- **Q2，README 章首第二条**：“这就是我们最早研究的 ψ=ψ(ψ)。”对应 MD 行 2125 的原输入及 PDF p.104，数学排版之外一致。英文两条含义一致，未改。
- **Q3，第一章章首两条**：“量子到底是什么东西呀，量子门，我虽然整天在研究这些，我却不懂。”在 PDF p.1 原输入（p.16 再录）；“我真的不懂，我现在只能理解量子态是一个球上的向量，然后推这些。”在 PDF p.18 原输入。MD 从较后对话开始，只有合并转述，故以 PDF 为直接证据。英译分别保留不懂与“目前只能理解”的模态。四条章首题记均保持原文件不变。
- **Q4，README / sec-awakening 的正文格言**：PROJECT.md §2 的手稿逐字契约适用于章首题记，Q1–Q3 已覆盖全部四条。正文的“当人可以不断地理解球外之球的时候，实际上人似乎在球外。”“实际上球永远只是近似，我们以为我们得到了一个球，但实际只是近似得到一个球。”和“近似之裂缝，皆是万物生长之门”是作者在本书中的哲学表达；正文未把它们署作逐字手稿引文。本批保留中文措辞，英文恢复第一句“似乎”的模态。正文格言未获手稿逐字认证，也不需要据此另行裁定出处。

## 输出验收（独立于内容证据）

以下保留首轮修复前候选 `83469439f9f38b26b01b2ea401d2ed6711294231` 的历史验收，不作为新增文字的最终输出证据。本次在指定工作区复用只读工具环境及本地字体；未改构建工具。下表记录针对当时冲突处理后的正文，证据位于仓库根目录下的 `build/content-accuracy/integration/`；此前输出记录留在上一级目录。工具链体检 0 个必需项缺失；缺少名为 Noto CJK SC 的可选字体族，本地已有的 Noto Sans/Serif SC OTF 供排版使用，中文 PDF 已查看实际字形。

| 实际命令 / 操作 | 结果 | 本地证据（相对 `build/content-accuracy/integration/`） |
| --- | --- | --- |
| `./tbook doctor`、`./tbook check` | 1 本书，0 错误、0 警告；体检仅有上述可选字体提示 | `doctor.txt`、`check.txt` |
| 固定源码与原稿复核（`source-review.py`） | 从当时的 `52725b6` 重新读取第一章六条形式结论及一条定义的源码、Blueprint、冻结状态片；与锁文件及此前取样相符。另核查第 6 章两条不确定性声明及导读所需的第 29–30 章四条引用。四条题记按手稿 MD/PDF 定位复验，两版均与主线题记一致 | `source-review.json`、`sources/` |
| 重跑 `build/content-accuracy/calculate.py` | 泡利乘法、极化和归一化、六极点、密度矩阵、贝里联络、纬圈和射线检验反例、六点门轨道均通过；以 200 位精度验算泰勒余项 80 组 | `calculations.txt` |
| `./tbook build html pdf epub --book quantum-geometry` | 中英 HTML、屏幕/印刷 PDF 共 4 份、EPUB 共 2 份全部成功 | `build.txt` |
| 对两份成品执行 EPUBCheck，并检查 EPUB 内部 XHTML | 两份均 `valid=true`、无错误与警告、未跳过；确认第八部导读文字及两条 Robertson 链接的目标锚点。未在 Apple Books 导入实测 | `epub-validation.json` |
| `./tbook build site --book quantum-geometry` | 站点生成成功；既有视频因缺本地视频工具链和模型，使用海报回退 | `site-build.txt` |
| `./tbook serve --port 8883`、浏览器检查及截图查看 | 序曲与第一章，中英 × navy/light × 1440×1000 桌面 / 390×844 手机，共 16 组合；均为 HTTP 200，无页面错误、失败请求、坏图、公式渲染错误、缺失页内锚点或整页横向溢出 | `browser/report.json`、`browser/*-detail-*.png` |
| 手机交互检查 | 两种语言与主题下均实际切换主题和语言，保持第一章；六极点表与宽矩阵可横滚；序曲中英文第八部导读均可读到末列右缘，英文表在手机端需横滚；四种组合均实际点通纯态和混合态 Robertson 链接 | `browser/interactions.json`、`browser/roadmap-links.json`、`browser/math-scroll.json` |
| `pdf-review.py` 与截图查看 | 四份 PDF 共 73 页已渲染并查看 13 张联系表；导读表、图、中文字体、公式与文献框均可读；印刷版为分部或章节正面起页保留空白页 | `pdf-review.json`、`pdf/*-contact-*.png` |

PDF 查看范围以第二章起点为界，包含序曲、第一部扉页和第一章：中文屏幕物理页 9–25、中文印刷 11–28、英文屏幕 10–27、英文印刷 11–30。未将其余章节的构建或目录读取计作内容覆盖。输出验收独立于 F/C/P/Q 的内容证据。

最终只读复核：覆盖表 35 行与中英 SUMMARY 顺序一致，33 行待核对；双语章首题记与第一章 Lean 环境引用序列保持原样。锁文件与主线逐字节一致。

## 首轮修复后输出验收（历史）

本节记录旧候选 `e590a6f8eda384391d49cb292da44f9e87a39abb` 与当时 `52725b6` 下 R1–R7 的实际验证，证据根目录为 `build/content-accuracy/repair-r1/`。上节是更早的候选输出；两节均不计入现行 `38196c6` 的输出验收。

| 实际命令 / 操作 | 结果 | 本轮证据 |
| --- | --- | --- |
| `./tbook check` | 1 本书，0 错误、0 警告 | `check.txt` |
| `python3 …/verify-content.py` | 独立验算密度矩阵特征值与正性域、转动楔积、平方模反例及凸包极限；锁与六条形式结论、一条定义、六个证明、四条题记相对入场候选未变 | `content-verification.json`、`baseline-sha256.json`、`before/` |
| `./tbook build html pdf epub --book quantum-geometry` | 中英 HTML、四份 PDF、两份 EPUB 全部重新生成成功 | `build.txt`、`export-verification.json` |
| 两份成品 EPUBCheck、解包检查 | 两份均 valid=true，0 错误、0 警告、未跳过；各核对首批 24 条内部链接、18 条锁定源码链接及两张图资源，修正文字、可见相位前提和双语简介部章计数均进入成品 | `export-verification.json`；未在 Apple Books 导入实测 |
| 四版 PDF 渲染与查看 | 首批共 74 页、14 张联系表均已查看；另查看四版封面、目录起页与账本起页。修订段、图示底栏、公式、六极点表及中文字体无可见裁切或重叠；每版首批 12 条内部跳转目标及 18 条锁定源码链接有效 | `pdf-review.json`、`pdf-supplements.json`、`pdf/*-contact-*.png`、`pdf/*-supplement.png` |
| `./tbook build site --book quantum-geometry`、`./tbook serve --port 8884` | 本地 Pages 子路径站点生成并预览成功；既有视频仍因缺本地工具链与模型使用海报回退 | `site-build.txt`、`serve.txt` |
| 实际浏览修订后序曲与第一章 | 中英 × navy/light × 1440×1000 桌面 / 390×844 手机，共 16 组合，HTTP 200；0 页面错误、失败请求、坏图、公式错误、缺失页内锚点或整页横向溢出。查看八张联系表并补看长段末尾，修订的物理域、转盘与凸包/历史文字均可读；原有宽表局部横滚机制不变 | `browser/report.json`、`browser/*-contact.png`、`browser/tails-report.json` |
| 图示与站点简介专项查看 | SVG 可见前提的两行文字均在原图底栏内；两语言共用同一图。书库首页及本书落地页中英 × 桌面/手机的 8 组合可见八部三十章，且无整页横向溢出；EPUB 简介同步 | `browser/svg-bounds.json`、`browser/zh-figure-native.png`、`browser/metadata-report.json`、`browser/metadata-contact.png` |

本轮 PDF 首批查看范围：中文屏幕物理页 9–25、中文印刷 11–28、英文屏幕 10–28、英文印刷 11–30；增加的英文屏幕页源于文字重排。版式验收和账本抽看不增加任何章节内容覆盖。未变的主题/语言切换及宽表交互沿用已有证据，本轮无工具、可视化或交互代码变更，未重跑无关测试套件。

## 现行整合与输出验收

与旧修复候选相比，两版序曲仅少第一、二部的旧发布标签；两版第一章和图 01 与该候选逐字节相同，图 00、四条双语题记、手稿两份文件、两版 SUMMARY 与第 6 章正文也未变。因而原有计算（含 R1–R6 的数学边界和反例）、原话取证及已核对的文献段落沿用其原执行记录；换钉的依赖已按上文重新比较。两版简介采用现行主线原文，核对了八部三十章和第八部梗概。主线第 24 章的反正弦级数更新及第 29–30 章等其他正文均未纳入本轮内容覆盖。未改工具、模板或可视化代码，未重跑其独立测试。

验收后观察到本地 `origin/main` 更新到 `71fc82959991d900a65cc5442ad85f5e32af3652`（PR #57）。这次更新仅涉及待核对单元，未改序曲、第一章、两图、简介、目录、Robertson 链接所在的第 6 章或锁文件。以下输出仍对应指定的 `de48d8d` 整合工作树。

本地证据根目录为 `build/content-accuracy/integration-381/`。以下均为现行工作树的实际验收。

| 操作 | 结果 | 证据 |
| --- | --- | --- |
| `./tbook check`，另查现行 `dev` 祖先关系、锁文件、冲突标记与工作树范围 | 1 本书，0 错误、0 警告。无冲突标记；与主线差异限于双语序曲、双语第一章、共享图 01 与本记录；简介冲突由主线原文吸收 | `check.txt`、`source-comparison.json`、`final-text.json` |
| `TBOOK_CACHE=0 ./tbook build html pdf epub site --book quantum-geometry`，经 `./tbook serve --port 8885` 浏览 | 新建中英 HTML、四份 PDF、两份 EPUB 与本地 Pages 预览。既有视频因本地视频工具链与模型不全仍用海报回退 | `build.txt`、`serve.txt` |
| 实际浏览序曲、第一章、两图和简介 | 两单元中英 × navy/light × 1440×1000 / 390×844，共 16 组合；无页面错误、请求失败、坏图、公式错误、缺失页内锚点或整页横向溢出。图 01 两行文字均落在原底栏；手机宽表可局部横滚。书库及本书落地页使用固定夜间主题，中英 × 桌面/手机共 8 组合，简介与主线一致 | `browser/report.json`、`browser/*-contact.png`、`browser/interactions.json`、`browser/svg-bounds.json`、`browser/metadata-report.json` |
| 四份 PDF 的实际版面和跳转 | 共查看首批 73 个物理页（中文屏幕 9–25、中文印刷 11–28、英文屏幕 10–27、英文印刷 11–30），另查看各版封面、目录和账本起页。修订段、图 01、导读、矩阵和六极点表未见裁切或重叠；每版检查首批 12 条内部跳转 | `pdf-review.json`、`pdf/*-contact-*.png`、`pdf/supplements-contact.png`、`export-verification.json` |
| 两份 EPUBCheck、解包及渲染查看 | 两份均 0 错误、0 警告，未跳过；各检查 24 条内部链接、2 张图及完整简介，查看首批 XHTML 的 MathML、表格、图和修订段。以浏览器读取 EPUB 内的文件，未在 Apple Books 导入实测 | `export-verification.json`、`epub-layout.json`、`epub/*contact.png` |
| 现行固定链接和站点下载校验 | HTML 两版各有六枚正式徽章；HTML、PDF、EPUB 各版本的首批 18 条 Lean 链接逐条对应现行 pin 与正确声明行号。序曲至第 6 章的两条 Robertson 跳转及目标源码已核对。站点六份下载与新建成品字节一致 | `links.json` |

## 待办边界

其余 33 单元全部待核对。首次三席独立审查已结束，确认的准确性问题按 R1–R7 修复；调用方继续暂存三处已解冲突的文件与更新的证据记录、完成变基并更新现有 PR #53，随后安排三席独立复审，跟进合入、CI 与 Pages 部署。Q4 无待作者裁定的出处事项。`book.toml` 的部章计数已由主线修正，计数核对依据 SUMMARY，不构成对新增章节正文的认证。Apple Books 导入仍未实测；本地视频工具链缺失导致既有视频使用海报回退。

[par-src]: https://github.com/the-omega-institute/trureturing/blob/38196c62e121b0a334b903eea2a513bb2587e41c/D5/S3/QuantumContext/ParallelogramNormLaw.lean#L22
[par-frozen]: https://github.com/the-omega-institute/trureturing/blob/38196c62e121b0a334b903eea2a513bb2587e41c/Golden/Frozen/state/D5/S3/QuantumContext/ParallelogramNormLaw.lean.json
[fin-src]: https://github.com/the-omega-institute/trureturing/blob/38196c62e121b0a334b903eea2a513bb2587e41c/D5/S3/Quantum/FiniteDimensional.lean#L24
[char-src]: https://github.com/the-omega-institute/trureturing/blob/38196c62e121b0a334b903eea2a513bb2587e41c/D5/S3/Quantum/FiniteDimensional.lean#L46
[fin-frozen]: https://github.com/the-omega-institute/trureturing/blob/38196c62e121b0a334b903eea2a513bb2587e41c/Golden/Frozen/state/D5/S3/Quantum/FiniteDimensional.lean.json
[wit-src]: https://github.com/the-omega-institute/trureturing/blob/38196c62e121b0a334b903eea2a513bb2587e41c/D5/S3/Quantum/QubitWitnesses.lean#L18
[wit-frozen]: https://github.com/the-omega-institute/trureturing/blob/38196c62e121b0a334b903eea2a513bb2587e41c/Golden/Frozen/state/D5/S3/Quantum/QubitWitnesses.lean.json
[ray-def-src]: https://github.com/the-omega-institute/trureturing/blob/38196c62e121b0a334b903eea2a513bb2587e41c/D5/S3/Quantum/Foundation/RayPhaseRigidity.lean#L54
[ray-src]: https://github.com/the-omega-institute/trureturing/blob/38196c62e121b0a334b903eea2a513bb2587e41c/D5/S3/Quantum/Foundation/RayPhaseRigidity.lean#L97
[ray-frozen]: https://github.com/the-omega-institute/trureturing/blob/38196c62e121b0a334b903eea2a513bb2587e41c/Golden/Frozen/state/D5/S3/Quantum/Foundation/RayPhaseRigidity.lean.json
[bloch-src]: https://github.com/the-omega-institute/trureturing/blob/38196c62e121b0a334b903eea2a513bb2587e41c/D5/S3/Quantum/Measurement/Bloch/QubitBloch.lean#L31
[bloch-frozen]: https://github.com/the-omega-institute/trureturing/blob/38196c62e121b0a334b903eea2a513bb2587e41c/Golden/Frozen/state/D5/S3/Quantum/Measurement/Bloch/QubitBloch.lean.json
[berry-paper]: https://michaelberryphysics.wordpress.com/wp-content/uploads/2013/07/berry120.pdf
[boykin-paper]: https://arxiv.org/pdf/quant-ph/9906054
[dawson-paper]: https://arxiv.org/pdf/quant-ph/0505030
[rs-src]: https://github.com/the-omega-institute/trureturing/blob/38196c62e121b0a334b903eea2a513bb2587e41c/D5/S3/QuantumBounds/RobertsonSchrodinger.lean#L46
[mixed-src]: https://github.com/the-omega-institute/trureturing/blob/38196c62e121b0a334b903eea2a513bb2587e41c/D5/S3/QuantumBounds/Designs/MixedStateRobertson.lean#L68
