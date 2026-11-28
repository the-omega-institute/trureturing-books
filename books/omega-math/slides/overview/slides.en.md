---
theme: ../../../../theme/slides
title: "OMEGA MATH · Six-Volume Overview"
info: "Follow the core constructions and zero-axiom results across six volumes, starting with homogeneous rationals."
htmlAttrs:
  lang: "en"
deck:
  code: "OMEGA//MATH"
  book: "Omega Math"
  title: "Six-Volume Overview"
  version: "0.2.0"
  blurb: "Fourteen slides connect rational geometry, jets, harmonic analysis, arithmetic spectra and spinor computation, with links to four interactive labs."
layout: cover
---

<p class="kicker">Six-volume overview</p>
<h1 class="display">OMEGA <em>MATH</em></h1>
<p class="lead">Zero-Axiom Rational Mathematics Without Infinity or Transcendentals</p>
<p class="sm muted mt">trureturing <PinnedCommit /></p>

---
section: "Prelude"
---

<div class="body center">
  <h2 class="t">Why rebuild? Ask <em>what the proofs depend on</em></h2>
  <p class="lead">The same kernel checks all three routes. Each declaration carries the axioms of its dependencies.</p>
  <div class="g3 mt-l">
    <div class="card">
      <h4>Bare CIC + OmegaMath</h4>
      <h3>0 axioms</h3>
      <p><code>OmegaInit</code> and <code>OmegaMath</code> start from inductive data. The kernel can reduce finite rational operations.</p>
    </div>
    <div class="card">
      <h4>Mathlib.Real</h4>
      <h3>Up to 3 standard axioms</h3>
      <p>The official dependencies of each frozen theorem lie within the permitted set of <code>propext</code>, <code>Classical.choice</code> and <code>Quot.sound</code>.</p>
    </div>
    <div class="card hot">
      <h4>Custom axiom</h4>
      <h3>The False trap</h3>
      <p>Declaring <code>axiom bad : False</code> makes every proposition derivable by <code>False.elim</code>.</p>
    </div>
  </div>
</div>
<Source>Prelude · Chapter 1 · Chapter 18</Source>

---
section: "Volume I"
---

<div class="body">
  <h2 class="t">AXIOM-<Tex t="\Omega" /> and <em>projective closure</em></h2>
  <div class="flow mt-s">
    <div class="step"><b>Cancellation and associativity</b><p>Ternary transport obeys two cancellation laws and ternary associativity.</p></div>
    <div class="step"><b>Rational fidelity</b><p>Symmetric fidelity separates points, reaches or approaches zero, and is invariant under transport on both sides. Its finite Gram matrices are PSD.</p></div>
    <div class="step"><b>Minimal noncommutativity</b><p>Outer-slot order can change the result. Minimize the compatible degrees of freedom and feature rank.</p></div>
  </div>
  <p class="lead mt-s">The model’s <Tex t="\mathbb{QP}^1" /> anchors <Tex t="\lbrack 0:1\rbrack,\ \lbrack 1:1\rbrack,\ \lbrack 1:0\rbrack" /> have fidelities <Tex t="1,\ \tfrac12,\ 0" />.</p>
  <TheoremCard class="compact mt-s" label="Theorem 2.6" title="Finite readouts at the antipode" cite="thm-ch02-antipodal-closure" gid="D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_antipodal_closure">
    <p>For any nonzero integer <Tex t="p" />, the point <Tex t="\lbrack p:0\rbrack" /> has fidelity, spread and Cayley coordinates <Tex t="0,\ 1,\ (-1,0)" />, respectively.</p>
  </TheoremCard>
</div>
<Source>Chapters 1–2</Source>

---
section: "Volume I"
---

<div class="body">
  <h2 class="t">The dimension-three lock and <em>canonical ternions</em></h2>
  <div class="g2 mt-s">
    <div class="card"><h4>Classical shadow · Dimension lock</h4><p>For real Lie algebras with a positive definite invariant bilinear form, the bracket vanishes in dimensions 1 and 2. In the noncommutative three-dimensional case, it is a positive multiple of the cross product in a suitable basis.</p></div>
    <div class="card"><h4>Rational carrier</h4><p>Each ray in <Tex t="\mathbb{T}_3(\mathbb Q)\cong\mathbb{QP}^3" /> has integer coordinates <Tex t="[w:x:y:z]" />. Divide by their GCD and make the first nonzero coordinate positive.</p></div>
  </div>
  <TheoremCard class="compact mt-s" label="Theorem 3.4" title="Ternary associativity on projective rays" cite="thm-ch03-quaternion-norm-and-heap-laws" gid="D5/S3/Quantum/AURICOmega/OmegaTernionHeap.triad_assoc">
    <p>For nonzero integer quaternions, represent <Tex t="[x,y,z]" /> by <Tex t="(x\bar y)z" />. Then <Tex t="[[x,y,z],u,v]\sim_{\mathrm{ray}}[x,y,[z,u,v]]" />.</p>
  </TheoremCard>
  <p class="lead mt-s">Four-square norm multiplicativity keeps the ternary product of nonzero inputs nonzero.</p>
</div>
<Source>Chapter 3</Source>

---
section: "Volume II"
---

<div class="body">
  <h2 class="t">From origin-free heaps to <em>3D rational rotations</em></h2>
  <div class="flow mt">
    <div class="step"><b>Ternary transport</b><p>Use the middle point as a temporary reference and carry the relation to the third point.</p></div>
    <div class="step"><b>PythSpinor double cover</b><p>Over the rational unit-lift subgroup, the signed spinor reaches its negative at <Tex t="360^\circ" /> and returns to its starting point at <Tex t="720^\circ" />.</p></div>
    <div class="step"><b>Two-way Cayley bridge</b><p>A skew matrix <Tex t="X" /> gives a rational rotation <Tex t="R" />. Recover <Tex t="X" /> whenever <Tex t="\det(R+I)\ne0" />.</p></div>
  </div>
  <TheoremCard class="mt-l" label="Theorem 5.2" title="Denominator-free Cayley identity" cite="thm-ch05-rational-cayley-core" gid="D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.cayley_identity">
    <p>For every rational three-vector <Tex t="\sigma" />, set <Tex t="X=[\sigma]_\times" />. The forward Cayley matrix obeys <Tex t="(I-X)R(\sigma)\equiv I+X" />.</p>
  </TheoremCard>
</div>
<Source>Chapters 4–5</Source>

---
section: "Volume II"
---

<div class="body center">
  <h2 class="t">A <em>closure law</em> for rational spherical trigonometry</h2>
  <p class="lead">Three normalized squared dot products give the fidelities <Tex t="\kappa_{ab},\kappa_{bc},\kappa_{ca}" />. The signed triple product <Tex t="B" /> retains joint information about all three points.</p>
<TheoremCard class="mt-l" label="Theorem 6.3" title="Nonnegative Bargmann–Gram determinant" cite="thm-ch06-detgram3-nonneg" gid="D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.detGram3_nonneg">

For any three nonzero integer quaternions $a,b,c$, the normalized Gram determinant satisfies

$$0\le\det G_3(a,b,c)=1+2B-(\kappa_{ab}+\kappa_{bc}+\kappa_{ca}).$$

</TheoremCard>
</div>
<Source>Chapter 6</Source>

---
section: "Volume III"
---

<div class="body">
  <h2 class="t">Limit-free calculus <em>computes coefficients directly</em></h2>
  <div class="g2 mt">
    <div class="card"><h4>Jet2 · Nilpotent ring</h4><p>In <Tex t="\mathbb Q[\eta]/(\eta^3)" />, a second-order jet consists of three exact rational coefficients.</p></div>
    <div class="card"><h4>D-finite · Any finite order</h4><p>At an ordinary rational basepoint with rational initial derivatives, the recurrence generates rational coefficients. Formal differentiation and multiplication work order by order.</p></div>
  </div>
  <TheoremCard class="compact mt" label="Theorem 7.5" title="Exact second-order fidelity jet" cite="thm-ch07-fidelity-jet-and-secant" gid="D5/S3/Quantum/AURICOmega/OmegaJetCalculus.kappa_jet">
    <p>Set <Tex t="D=1+x^2" />. At finite rational <Tex t="x" />, the Jet2 coefficients of <Tex t="\kappa(x)=D^{-1}" /> are <Tex t="\bigl(D^{-1},-2xD^{-2},(3x^2-1)D^{-3}\bigr)" />.</p>
  </TheoremCard>
  <p class="lead mt-s">At <Tex t="x=1" /> with step <Tex t="h=\tfrac14" />, the secant slope exceeds the linear jet coefficient by <Tex t="\tfrac5{82}" />.</p>
</div>
<Source>Chapters 7–8</Source>

---
section: "Volume III"
---

<div class="body">
  <h2 class="t">Finite cancellation gives <em>exact integrals</em></h2>
  <div class="g2 mt">
    <div class="card"><h4>Heap Stokes · Telescoping</h4><p>Compose local readouts along a finite chain. Interior terms cancel in pairs, leaving the boundary readout.</p></div>
    <div class="card"><h4>Osculating manifold · Model</h4><p><Tex t="\mathcal M_\Omega" /> uses second-order osculating ternion spheres and their transition maps to organize local arcs.</p></div>
  </div>
  <TheoremCard class="mt" label="Theorem 9.5" title="Vertex-cone exactness in degree two" cite="thm-ch09-cone-homotopy-exactness" gid="D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.d2_eq_zero_iff">
    <p>Fix a base vertex <Tex t="b" />. On the full simplex, a 2-cochain <Tex t="F" /> valued in an abelian group is closed exactly when it is a coboundary. For closed <Tex t="F" />, take <Tex t="e=H_2 b\,F" /> so that <Tex t="\delta_1e=F" />.</p>
  </TheoremCard>
</div>
<Source>Chapter 9</Source>

---
section: "Volume IV"
---

<div class="body">
  <h2 class="t">Integrating Peter–Weyl spin shells <em>with factorials</em></h2>
  <div class="g2 mt-s">
    <div class="card"><h4>Integer-spin characters</h4><p>Even Chebyshev polynomials give <Tex t="\chi_0=1" />, <Tex t="\chi_1=4\kappa-1" /> and <Tex t="\chi_2=16\kappa^2-12\kappa+1" />.</p></div>
    <div class="card"><h4><Tex t="\pi" />-free Haar moments on <Tex t="S^3" /></h4><p><Tex t="\kappa" /> is the squared normalized scalar coordinate.</p><Tex display t="\mathbb E[\kappa^k]=\frac{(2k)!}{4^k k!(k+1)!}" /></div>
  </div>
  <TheoremCard class="compact mt-s" label="Theorem 11.4" title="Orthonormality of the first three even characters" cite="thm-ch11-peter-weyl-chi012-orthonormal" gid="D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.peter_weyl_chi012_orthonormal">
    <p>For <Tex t="0\le i\le j\le 2" />, the rational Haar inner product satisfies <Tex t="\langle\chi_i,\chi_j\rangle\equiv\delta_{ij}" />.</p>
  </TheoremCard>
</div>
<Source>Chapters 10–11</Source>

---
section: "Volume IV"
---

<div class="body">
  <h2 class="t">Quadratic extensions and <em>attained Schur minima</em></h2>
  <div class="g2 mt">
    <div class="card"><h4>QSqrt2</h4><p>Compute <Tex t="a+b\delta" /> as a pair of rationals. Reduce products by <Tex t="\delta^2=2" />.</p></div>
    <div class="card"><h4>QPhi</h4><p>Use the same pair arithmetic for <Tex t="a+b\varphi" />. Reduce products by <Tex t="\varphi^2=\varphi+1" />.</p></div>
  </div>
  <TheoremCard class="mt" label="Theorem 12.5" title="Rational Schur minimum at a positive pivot" cite="thm-ch12-zero-axiom-lagrange-schur" gid="D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.rational_schur_min">
    <p>For rationals <Tex t="a,b,c,x" /> with <Tex t="c>0" />, the form <Tex t="ax^2+2bxy+cy^2" /> attains its global minimum <Tex t="(a-b^2/c)x^2" /> at the rational point <Tex t="y_*=-(b/c)x" />.</p>
  </TheoremCard>
</div>
<Source>Chapter 12</Source>

---
section: "Volume V"
---

<div class="body">
  <h2 class="t">The computable horizon and <em>adelic product closure</em></h2>
  <p class="lead">Finite continued fractions give approximation certificates that can be checked step by step. Prime escape produces a witness outside any finite list.</p>
  <TheoremCard class="compact mt" label="Theorem 13.3" title="Euclidean prime escape" cite="thm-ch13-euclid-prime-escape" gid="D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.euclid_prime_escape">
    <p>Let <Tex t="s" /> be a finite list of natural numbers with product <Tex t="P>0" />. There is a prime <Tex t="p" /> with <Tex t="p\mid(P+1)" /> and <Tex t="p\notin s" />.</p>
  </TheoremCard>
  <div class="card mt">
    <h4>Adelic product · Chapter 14</h4>
    <p>For <Tex t="r\in\mathbb Q^\times" />, only finitely many prime-indexed factors differ from 1, and <Tex t="|r|_\infty\prod_p^{\mathrm{fin}}|r|_p=1" />.</p>
  </div>
</div>
<Source>Chapters 13–14</Source>

---
section: "Volume V"
---

<div class="body">
  <h2 class="t">A <em>rational test</em> for the norm-5 Hecke spectrum</h2>
  <p class="lead">On a nonconstant eigenmode, the Ramanujan bound becomes the complex-free PSD test <Tex t="4p-\lambda^2\ge0" />, using the unnormalized eigenvalue <Tex t="\lambda" />.</p>
  <TheoremCard class="compact mt" label="Theorem 15.6" title="The unnormalized Hecke sum on the spin-1 character" cite="thm-ch15-hecke-t5-chi1-eigenvalue" gid="D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.heckeT5_chi1_eigenvalue">
    <p>For every nonzero integer quaternion <Tex t="q" />, <Tex t="(T_5\chi_1)(q)\equiv-\tfrac25\chi_1(q)" />.</p>
  </TheoremCard>
  <div class="card mt-s">
    <h4>Spin 1 · Exact positive margin</h4>
    <Tex display t="4\cdot5-\bigl(-\tfrac25\bigr)^2=\tfrac{496}{25}>0" />
  </div>
</div>
<Source>Chapter 15</Source>

---
section: "Volume VI"
---

<div class="body">
  <h2 class="t">A divisibility gate <em>reads spinor word order</em></h2>
  <p class="lead">Non-Abelian <Tex t="\Omega" />-FRACTRAN multiplies by a rotor on the right and tests divisibility coordinate by coordinate. A nonzero denominator gives a unique successor when the test passes.</p>
  <TheoremCard class="compact mt" label="Theorem 16.8" title="The mod-5 unwind gate distinguishes word order" cite="thm-ch16-quaternion-fractran-gate" gid="D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.quaternion_fractran_order_separation">
    <p>The book’s <Tex t="XY" /> and <Tex t="YX" /> states both have squared norm 25. The <Tex t="Y" /> unwind gate with denominator 5 sends <Tex t="XY" /> back to <Tex t="X" /> and rejects <Tex t="YX" />.</p>
  </TheoremCard>
  <div class="g2 mt">
    <div class="card"><h4>Mat2 · Cayley–Hamilton</h4><p>Every integer <Tex t="2\times2" /> matrix satisfies <Tex t="A^2-\operatorname{tr}(A)A+\det(A)I=0" />.</p></div>
    <div class="card"><h4>Observer memory split · Model</h4><p>On the static canvas, the squared weights of the time and space channels divide one memory budget.</p></div>
  </div>
</div>
<Source>Chapters 16–17</Source>

---
layout: cover
---

<h2 class="t">Empty-kernel <em>audit</em></h2>
<p class="sm muted">The auditor replays selected strict library import closures in a fresh empty kernel and checks each declaration’s transitive axioms.</p>
<p class="sm mt-s">For the 127 D5 theorems in Appendix A.3, both builds are compared. Each declaration row records strict dependencies under <code>strict_omega.axioms</code> and official dependencies under <code>axioms</code>.</p>
<p class="sm mt-s"><code>OmegaShadowBridge</code> carries core constructions one way into the classical reals.</p>
<p class="sm mt-s"><b>Four interactive 3D labs</b> · <a :href="readingLink('viz/omega-math-workbench/')">OMEGA//LAB</a> · <a :href="readingLink('viz/ternion-cayley-lab/')">OMEGA//SPIN</a> · <a :href="readingLink('viz/dfinite-algebraic-schur-lab/')">OMEGA//JET</a> · <a :href="readingLink('viz/adelic-arithmetic-observer-lab/')">OMEGA//ARC</a></p>
<p class="sm mt-s"><b>Reading map</b> · <a :href="readingLink('en/ch01-axiom-omega-and-cic.html')">Ch. 1 Foundations</a> · <a :href="readingLink('en/ch18-zero-axiom-kernel-and-shadow-bridge.html')">Ch. 18 Audit</a> · <a :href="readingLink('en/coda.html')">Coda Six volumes</a> · 19 bilingual static figures · <a :href="readingLink('en/appendix-a.html')">App. A Frozen index</a> · <a :href="readingLink('en/appendix-b.html')">App. B Evidence ledger</a></p>

<script setup>
import { useNav } from '@slidev/client'

const { isPrintMode } = useNav()
function readingLink(path) {
  // Chromium needs a public URL in the PDF. The web deck uses relative links.
  return isPrintMode.value ? 'https://books.trureturing.org/omega-math/' + path : '../../../' + path
}
</script>
