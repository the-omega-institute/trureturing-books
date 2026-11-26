---
theme: ../../../../theme/slides
title: "OMEGA MATH · 六卷概览"
info: "从齐次有理数出发，走过六卷的核心构造与零公理证据。"
htmlAttrs:
  lang: "zh-CN"
deck:
  code: "OMEGA//MATH"
  book: "OMEGA MATH"
  title: "六卷概览"
  version: "0.2.0"
  blurb: "十四页串起有理几何、射流、调和分析、算术谱与旋子计算，并通向四座交互实验室。"
layout: cover
---

<p class="kicker">六卷概览</p>
<h1 class="display">OMEGA <em>MATH</em></h1>
<p class="lead">无无穷、无超越数的零公理有理数学</p>
<p class="sm muted mt">trureturing <PinnedCommit /></p>

---
section: "前言"
---

<div class="body center">
  <h2 class="t">为什么重建？先看<em>证明依赖什么</em></h2>
  <p class="lead">同一内核可以检查三条路线。差别在于声明的传递公理闭包。</p>
  <div class="g3 mt-l">
    <div class="card">
      <h4>裸 CIC + OmegaMath</h4>
      <h3>0 条公理</h3>
      <p><code>OmegaInit</code> 与 <code>OmegaMath</code> 从归纳数据起步。有限有理运算可在内核中归约。</p>
    </div>
    <div class="card">
      <h4>Mathlib.Real</h4>
      <h3>至多 3 条标准公理</h3>
      <p>每条冻结定理的官方依赖以 <code>propext</code>、<code>Classical.choice</code> 与 <code>Quot.sound</code> 为许可上界。</p>
    </div>
    <div class="card hot">
      <h4>自定义 axiom</h4>
      <h3>False 陷阱</h3>
      <p>若直接声明 <code>axiom bad : False</code>，就能用 <code>False.elim</code> 推出任意命题。</p>
    </div>
  </div>
</div>
<Source>前言 · 第 1 章 · 第 18 章</Source>

---
section: "第一卷"
---

<div class="body">
  <h2 class="t">AXIOM-<Tex t="\Omega" /> 三律与<em>射影闭环</em></h2>
  <div class="flow mt-s">
    <div class="step"><b>消去与结合</b><p>三元搬运满足左右消去与三元结合律。</p></div>
    <div class="step"><b>有理保真度</b><p>对称读数分离点、可达或逼近零，在双侧搬运下不变，且有限 Gram 矩阵半正定。</p></div>
    <div class="step"><b>极小非交换</b><p>外槽的次序可以改变结果，并要求相容的自由度与特征秩极小。</p></div>
  </div>
  <p class="lead mt-s">三律给出模型。沿 <Tex t="\mathbb{QP}^1" /> 的锚点 <Tex t="\lbrack 0:1\rbrack,\ \lbrack 1:1\rbrack,\ \lbrack 1:0\rbrack" />，保真度依次为 <Tex t="1,\ \tfrac12,\ 0" />。</p>
  <TheoremCard class="compact mt-s" label="定理2.6" title="对径极点的有限读数" cite="thm-ch02-antipodal-closure" gid="D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_antipodal_closure">
    <p>对任意非零整数 <Tex t="p" />，齐次点 <Tex t="\lbrack p:0\rbrack" /> 的保真度、展度与凯莱坐标依次为 <Tex t="0,\ 1,\ (-1,0)" />。</p>
  </TheoremCard>
</div>
<Source>第 1–2 章</Source>

---
section: "第一卷"
---

<div class="body">
  <h2 class="t">三维锁定与<em>规范三元数</em></h2>
  <div class="g2 mt-s">
    <div class="card"><h4>经典影子 · 三维锁定</h4><p>在带正定不变双线性型的实李代数中，维数 1、2 时括号为零。三维非交换情形的括号在适当基底下是叉积的正倍数。</p></div>
    <div class="card"><h4>有理载体</h4><p><Tex t="\mathbb{T}_3(\mathbb Q)\cong\mathbb{QP}^3" /> 的每条射线写成 <Tex t="[w:x:y:z]" />。约去最大公约数，再把首个非零坐标定为正。</p></div>
  </div>
  <TheoremCard class="compact mt-s" label="定理3.4" title="射影流群的三元结合律" cite="thm-ch03-quaternion-norm-and-heap-laws" gid="D5/S3/Quantum/AURICOmega/OmegaTernionHeap.triad_assoc">
    <p>对非零整四元数，以 <Tex t="(x\bar y)z" /> 代表 <Tex t="[x,y,z]" />，则 <Tex t="[[x,y,z],u,v]\sim_{\mathrm{ray}}[x,y,[z,u,v]]" />。</p>
  </TheoremCard>
  <p class="lead mt-s">四平方范数的乘性保证非零输入的三元积仍非零。</p>
</div>
<Source>第 3 章</Source>

---
section: "第二卷"
---

<div class="body">
  <h2 class="t">从无原点流群到<em>三维有理旋转</em></h2>
  <div class="flow mt">
    <div class="step"><b>三元搬运</b><p>以中间点为临时参照，把两点的关系搬到第三点。</p></div>
    <div class="step"><b>PythSpinor 双覆盖</b><p>在有理单位旋量覆盖的子群上，有号旋量在 <Tex t="360^\circ" /> 到达反号位置，在 <Tex t="720^\circ" /> 回到起点。</p></div>
    <div class="step"><b>凯莱正逆桥</b><p>斜对称阵 <Tex t="X" /> 给出有理旋转 <Tex t="R" />。当 <Tex t="\det(R+I)\ne0" /> 时可反求 <Tex t="X" />。</p></div>
  </div>
  <TheoremCard class="mt-l" label="定理5.2" title="去分母的凯莱闭合方程" cite="thm-ch05-rational-cayley-core" gid="D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.cayley_identity">
    <p>对任意有理三维参数 <Tex t="\sigma" />，令 <Tex t="X=[\sigma]_\times" />，则正向凯莱矩阵满足 <Tex t="(I-X)R(\sigma)\equiv I+X" />。</p>
  </TheoremCard>
</div>
<Source>第 4–5 章</Source>

---
section: "第二卷"
---

<div class="body center">
  <h2 class="t">球面有理三角的<em>闭合律</em></h2>
  <p class="lead">三对平方内积给出保真度 <Tex t="\kappa_{ab},\kappa_{bc},\kappa_{ca}" />。带符号的三重积 <Tex t="B" /> 保留三点的联合信息。</p>
<TheoremCard class="mt-l" label="定理6.3" title="巴格曼–格拉姆行列式非负" cite="thm-ch06-detgram3-nonneg" gid="D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.detGram3_nonneg">

对任意三枚非零整四元数 $a,b,c$，归一化 Gram 行列式满足

$$0\le\det G_3(a,b,c)=1+2B-(\kappa_{ab}+\kappa_{bc}+\kappa_{ca}).$$

</TheoremCard>
</div>
<Source>第 6 章</Source>

---
section: "第三卷"
---

<div class="body">
  <h2 class="t">无极限微积分<em>直接计算系数</em></h2>
  <div class="g2 mt">
    <div class="card"><h4>Jet2 · 幂零环</h4><p>在 <Tex t="\mathbb Q[\eta]/(\eta^3)" /> 中，二阶射流是三个精确的有理系数。</p></div>
    <div class="card"><h4>D-有限 · 任意有限阶</h4><p>在有理普通点给定有理初始导数后，递推逐阶生成有理系数。形式微分与乘法可逐阶计算。</p></div>
  </div>
  <TheoremCard class="compact mt" label="定理7.5" title="保真度核的精确二阶射流" cite="thm-ch07-fidelity-jet-and-secant" gid="D5/S3/Quantum/AURICOmega/OmegaJetCalculus.kappa_jet">
    <p>令 <Tex t="D=1+x^2" />。对有限有理 <Tex t="x" />，<Tex t="\kappa(x)=D^{-1}" /> 的 Jet2 读数为 <Tex t="\bigl(D^{-1},-2xD^{-2},(3x^2-1)D^{-3}\bigr)" />。</p>
  </TheoremCard>
  <p class="lead mt-s">在 <Tex t="x=1" /> 取步长 <Tex t="h=\tfrac14" />，割线斜率比一阶射流读数大 <Tex t="\tfrac5{82}" />。</p>
</div>
<Source>第 7–8 章</Source>

---
section: "第三卷"
---

<div class="body">
  <h2 class="t">有限消去给出<em>精确积分</em></h2>
  <div class="g2 mt">
    <div class="card"><h4>流群 Stokes · 望远镜消去</h4><p>沿有限链拼接局部读数。内部项成对消去，留下边界读数。</p></div>
    <div class="card"><h4>吻合流形 · 模型</h4><p><Tex t="\mathcal M_\Omega" /> 用二阶吻合的三元球及其过渡映射组织局部圆弧。</p></div>
  </div>
  <TheoremCard class="mt" label="定理9.5" title="顶点锥给出二阶正合性" cite="thm-ch09-cone-homotopy-exactness" gid="D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.d2_eq_zero_iff">
    <p>任取基点顶点 <Tex t="b" />。在全单纯形上，取值于加法交换群的 2-上链 <Tex t="F" /> 闭合当且仅当它是余边界。闭合时可显式取 <Tex t="e=H_2 b\,F" />，使 <Tex t="\delta_1e=F" />。</p>
  </TheoremCard>
</div>
<Source>第 9 章</Source>

---
section: "第四卷"
---

<div class="body">
  <h2 class="t">彼得–魏尔自旋壳<em>用阶乘积分</em></h2>
  <div class="g2 mt-s">
    <div class="card"><h4>整自旋特征标</h4><p>偶次切比雪夫多项式给出 <Tex t="\chi_0=1" />、<Tex t="\chi_1=4\kappa-1" /> 与 <Tex t="\chi_2=16\kappa^2-12\kappa+1" />。</p></div>
    <div class="card"><h4><Tex t="S^3" /> 上的无 <Tex t="\pi" /> 哈尔矩</h4><p><Tex t="\kappa" /> 是归一化标量坐标的平方。</p><Tex display t="\mathbb E[\kappa^k]=\frac{(2k)!}{4^k k!(k+1)!}" /></div>
  </div>
  <TheoremCard class="compact mt-s" label="定理11.4" title="前三个偶次特征标正交归一" cite="thm-ch11-peter-weyl-chi012-orthonormal" gid="D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.peter_weyl_chi012_orthonormal">
    <p>对 <Tex t="0\le i\le j\le 2" />，有理哈尔内积满足 <Tex t="\langle\chi_i,\chi_j\rangle\equiv\delta_{ij}" />。</p>
  </TheoremCard>
</div>
<Source>第 10–11 章</Source>

---
section: "第四卷"
---

<div class="body">
  <h2 class="t">二次扩张与<em>可达到的舒尔最小值</em></h2>
  <div class="g2 mt">
    <div class="card"><h4>QSqrt2</h4><p>以有理数对计算 <Tex t="a+b\delta" />，乘法按 <Tex t="\delta^2=2" /> 约简。</p></div>
    <div class="card"><h4>QPhi</h4><p>以同样的有理数对计算 <Tex t="a+b\varphi" />，乘法按 <Tex t="\varphi^2=\varphi+1" /> 约简。</p></div>
  </div>
  <TheoremCard class="mt" label="定理12.5" title="正枢轴下的有理舒尔最小值" cite="thm-ch12-zero-axiom-lagrange-schur" gid="D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.rational_schur_min">
    <p>给定有理数 <Tex t="a,b,c,x" /> 且 <Tex t="c>0" />，二次式 <Tex t="ax^2+2bxy+cy^2" /> 在有理数 <Tex t="y_*=-(b/c)x" /> 处取得全局最小值 <Tex t="(a-b^2/c)x^2" />。</p>
  </TheoremCard>
</div>
<Source>第 12 章</Source>

---
section: "第五卷"
---

<div class="body">
  <h2 class="t">有限算术视界与<em>阿代尔乘积闭合</em></h2>
  <p class="lead">有限连分数把逼近写成逐步可核对的证书。素数逃逸则从任意有限清单之外构造见证。</p>
  <TheoremCard class="compact mt" label="定理13.3" title="欧几里得素数逃逸" cite="thm-ch13-euclid-prime-escape" gid="D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.euclid_prime_escape">
    <p>设 <Tex t="s" /> 是乘积 <Tex t="P>0" /> 的有限自然数列表。存在素数 <Tex t="p" />，使 <Tex t="p\mid(P+1)" /> 且 <Tex t="p\notin s" />。</p>
  </TheoremCard>
  <div class="card mt">
    <h4>阿代尔乘积 · 第 14 章</h4>
    <p>对 <Tex t="r\in\mathbb Q^\times" />，只有有限多个素处因子异于 1，且 <Tex t="|r|_\infty\prod_p^{\mathrm{fin}}|r|_p=1" />。</p>
  </div>
</div>
<Source>第 13–14 章</Source>

---
section: "第五卷"
---

<div class="body">
  <h2 class="t">模方 5 的赫克谱<em>用有理数检验</em></h2>
  <p class="lead">对非常数本征模，拉马努金界可写成无复数的半正定判据 <Tex t="4p-\lambda^2\ge0" />，其中 <Tex t="\lambda" /> 是未归一化本征值。</p>
  <TheoremCard class="compact mt" label="定理15.4" title="未归一化赫克和与自旋 1 特征标" cite="thm-ch15-hecke-t5-chi1-eigenvalue" gid="D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.heckeT5_chi1_eigenvalue">
    <p>对每枚非零整四元数 <Tex t="q" />，有 <Tex t="(T_5\chi_1)(q)\equiv-\tfrac25\chi_1(q)" />。</p>
  </TheoremCard>
  <div class="card mt-s">
    <h4>自旋 1 · 精确正余量</h4>
    <Tex display t="4\cdot5-\bigl(-\tfrac25\bigr)^2=\tfrac{496}{25}>0" />
  </div>
</div>
<Source>第 15 章</Source>

---
section: "第六卷"
---

<div class="body">
  <h2 class="t">整除闸门<em>读出旋子词序</em></h2>
  <p class="lead">非阿贝尔 <Tex t="\Omega" />-FRACTRAN 先右乘旋子，再逐坐标检验整除。通过时，非零分母给出唯一后继。</p>
  <TheoremCard class="compact mt" label="定理16.8" title="模 5 解卷闸门区分两种词序" cite="thm-ch16-quaternion-fractran-gate" gid="D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.quaternion_fractran_order_separation">
    <p>书中的 <Tex t="XY" /> 与 <Tex t="YX" /> 状态平方范数同为 25。分母为 5 的 <Tex t="Y" /> 解卷闸门把 <Tex t="XY" /> 送回 <Tex t="X" />，并拒绝 <Tex t="YX" />。</p>
  </TheoremCard>
  <div class="g2 mt">
    <div class="card"><h4>Mat2 · 凯莱–哈密顿</h4><p>每个整系数二阶矩阵满足 <Tex t="A^2-\operatorname{tr}(A)A+\det(A)I=0" />。</p></div>
    <div class="card"><h4>观察者记忆切分 · 模型</h4><p>在静止画布模型中，时间与空间通道的平方权重分配同一份记忆预算。</p></div>
  </div>
</div>
<Source>第 16–17 章</Source>

---
layout: cover
---

<h2 class="t">空内核<em>审计</em></h2>
<p class="sm muted">审计器在全新空内核中重放选定的严格库导入闭包，并逐条检查传递公理。</p>
<p class="sm mt-s">附录 A.3 的 127 条 D5 定理经过双端编译对照。各声明行的 <code>strict_omega.axioms</code> 给出严格端公理，<code>axioms</code> 给出官方端公理。</p>
<p class="sm mt-s"><code>OmegaShadowBridge</code> 将核心构造单向接到经典实数层。</p>
<p class="sm mt-s"><b>四座 3D 交互实验室</b> · <a :href="readingLink('viz/omega-math-workbench/')">OMEGA//LAB</a> · <a :href="readingLink('viz/ternion-cayley-lab/')">OMEGA//SPIN</a> · <a :href="readingLink('viz/dfinite-algebraic-schur-lab/')">OMEGA//JET</a> · <a :href="readingLink('viz/adelic-arithmetic-observer-lab/')">OMEGA//ARC</a></p>
<p class="sm mt-s"><b>阅读路线</b> · <a :href="readingLink('zh/ch01-axiom-omega-and-cic.html')">第 1 章 基础</a> · <a :href="readingLink('zh/ch18-zero-axiom-kernel-and-shadow-bridge.html')">第 18 章 审计</a> · <a :href="readingLink('zh/coda.html')">终章 六卷对照</a> · 19 幅双语静态图 · <a :href="readingLink('zh/appendix-a.html')">附录 A 冻结索引</a> · <a :href="readingLink('zh/appendix-b.html')">附录 B 证据总账</a></p>

<script setup>
import { useNav } from '@slidev/client'

const { isPrintMode } = useNav()
function readingLink(path) {
  // PDF 使用公开站点地址，在线版使用相对链接。
  return isPrintMode.value ? 'https://books.trureturing.org/omega-math/' + path : '../../' + path
}
</script>
