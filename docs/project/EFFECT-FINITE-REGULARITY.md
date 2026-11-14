# Finite exact fits under qualitative regularity

本页保存第二章效应概率调查的独立解析补充，与[全域稳定性及有限设计笔记](CH02-EFFECT-PROBABILITY-RESEARCH.md)配套。下述完整纸面证明已通过三席独立数学审查；独立精确算术核对仅作有限案例佐证。结果尚未在 Lean 中形式化、准入或冻结，不计入本书的内核验证声明，也不构成物理装置或实验支持的证据。这里不主张文献首创性。

结果保留两种不同的量词顺序：对每个预先指定的精度可另选一个实解析、全局 Lipschitz 的反模型；固定的连续归一响应对满秩密度的最大误差却严格小于一。因此，本页不把已有 Borel 单响应的精确上确界一结论直接升级为连续版本。具体假设与构造留在研究材料，通用 skill 只保留量词和定量界的核对方法。

## Domains and quantities

Fix a natural number $d\geq1$. Write $M_d(\mathbb C)$ for **all actual complex matrices**, regarded as a real vector space with the operator norm. Let
$$
 \mathcal E_d=\{E:E\succeq0,\ I-E\succeq0\},\qquad
 \mathcal D_d=\{\rho:\rho\succeq0,\ \operatorname{tr}\rho=1\text{ in }\mathbb C\}.
$$
For every actual matrix $X$, set $b_\rho(X)=\operatorname{Re}\operatorname{tr}(\rho X)$. For a response $p$, define
$$
 D_\rho(p)=\sup_{E\in\mathcal E_d}|p(E)-b_\rho(E)|,
$$
$$
 \Delta(p)=\sup_{\substack{E,F\succeq0\\E+F\in\mathcal E_d}}
 |p(E+F)-p(E)-p(F)|.
$$
The conditions in the second supremum imply $E,F\in\mathcal E_d$, since $I-E=(I-E-F)+F\succeq0$, and similarly for $F$. Thus an effect-valued probability response always has $D_\rho(p)\leq1$ and $\Delta(p)\leq2$: the expression inside the latter absolute value belongs to $[-2,1]$.

“Real analytic” below refers to the $2d^2$ real coordinates of $M_d(\mathbb C)$. It does not mean holomorphic in the complex matrix entries. All responses are total on $M_d(\mathbb C)$.

## Theorem A: arbitrarily near one, even with a globally bounded real-analytic response

For **every** $d\geq1$, **every** finite $T\subseteq\mathcal E_d$, **every given** $\rho_*\in\mathcal D_d$, and **every** $\eta>0$, there exist one response $p$, a number $t>0$, and a finite Lipschitz constant $K$ such that:

1. $p:M_d(\mathbb C)\to[0,1]$ is real analytic everywhere, hence $C^\infty$, continuous, and Borel on the full ambient real space. In fact it is globally $K$-Lipschitz in operator norm.
2. $p(0)=0$, $p(I)=1$, and $p(E)=b_{\rho_*}(E)$ for every $E\in T$.
3. $0<t<\eta$, $3t<1$, and
   $$
   p(tI)=p(2tI)=1,\qquad p(3tI)=0.
   $$
   The distinct positive definite matrices $E=tI$, $F=2tI$ have effect sum $3tI$ and attain binary defect exactly $2$. Consequently $\Delta(p)=2$.
4. The **same effect** $tI$, chosen before any comparison density, satisfies
   $$
   \forall\rho\in\mathcal D_d:\quad
   |p(tI)-b_\rho(tI)|=1-t>1-\eta.
   $$
   In particular $1-t\leq D_\rho(p)\leq1$ for every density, simultaneously.

Thus the quantifier order is
$$
 \forall d\geq1\ \forall T\text{ finite}\ \forall\rho_*\in\mathcal D_d
 \forall\eta>0\ \exists(p,t,K)\ \forall\rho\in\mathcal D_d.
$$
There is one $p$ for all densities at the chosen accuracy. The response is allowed to depend on $\eta$.

### Proof

First record the matrix facts used in the argument. A density has a spectral decomposition
$\rho=\sum_j\lambda_j u_j u_j^*$, with an orthonormal basis $u_j$, $\lambda_j\geq0$, and $\sum_j\lambda_j=1$. Hence
$$
 b_\rho(X)=\sum_j\lambda_j\operatorname{Re}(u_j^*Xu_j),\qquad
 |b_\rho(X)|\leq\|X\|_{\mathrm{op}}.
$$
The second inequality follows from $|u_j^*Xu_j|\leq\|X\|_{\mathrm{op}}$. For an effect, each $u_j^*Eu_j\in[0,1]$, so $b_\rho(E)\in[0,1]$. Real linearity and the norm bound show that $b_\rho$ is a continuous real-linear functional of norm at most one. Also $b_\rho(sI)=s$ for real $s$, using the exact trace-one condition. These facts hold in dimension one as well.

Let $S=\{b_{\rho_*}(E):E\in T\}\subseteq[0,1]$. This is a finite set of numbers; repetitions in the image of $T$ are discarded. Define
$$
 \delta=\min\bigl(\{1\}\cup(S\cap(0,1])\bigr)>0,\qquad
 t=\min\{\eta/2,\delta/8\}.
$$
Then $0<t<\eta$, $t\leq1/8$, and $0<t<2t<3t\leq3\delta/8<\delta\leq1$. Every positive element of $S$ is at least $\delta$; therefore none of $t,2t,3t$ belongs to $S$, and these three points differ from both endpoints.

Form the finite set of distinct interpolation nodes
$$
 A=S\cup\{0,1,t,2t,3t\}.
$$
Assign $c_a=a$ at every $a\in S\cup\{0,1\}$, and assign $c_t=c_{2t}=1$, $c_{3t}=0$. These assignments are consistent by the preceding separation, and all $c_a\in[0,1]$.

For a real variable $x$, define the polynomial weights and their sum
$$
 w_a(x)=\prod_{u\in A\setminus\{a\}}(x-u)^2,\qquad
 Q(x)=\sum_{a\in A}w_a(x),\qquad
 P(x)=\sum_{a\in A}c_a w_a(x).
$$
For every real $x$, $Q(x)>0$. Indeed, if $x\notin A$, every factor in every weight is positive. If $x=a_0\in A$, then $w_{a_0}(a_0)>0$, whereas every other weight vanishes. Thus
$$
 f(x)=P(x)/Q(x)
$$
is defined and real analytic on all of $\mathbb R$. Nonnegativity of the weights gives $0\leq P(x)\leq Q(x)$, so $f(x)\in[0,1]$ globally. At each node $a_0$, only its own weight is nonzero, and therefore $f(a_0)=c_{a_0}$. This proves exact interpolation, including both endpoints, without imposing a bound on the number or arrangement of the original observations.

Set
$$
 p(X)=f\bigl(b_{\rho_*}(X)\bigr),\qquad X\in M_d(\mathbb C).
$$
The composition is real analytic everywhere and has global range in $[0,1]$. It has the required normalization and finite agreement because $f(s)=s$ at every $s\in S\cup\{0,1\}$. The scalar trace identity gives the three prescribed spike values and, for every density $\rho$, the stated common error $1-t$. The pair $tI,2tI$ is admissible and has defect $|0-1-1|=2$; the earlier probability-range bound supplies the matching upper bound.

For completeness, this particular $p$ is globally Lipschitz, a stronger property than required by qualitative smoothness. Let $N=|A|\geq5$ and $m=2(N-1)$. Each $w_a$ is monic of degree $m$. Thus $Q$ has degree $m$ with leading coefficient $N$, while $P$ has degree at most $m$. In
$$
 f'(x)=\frac{P'(x)Q(x)-P(x)Q'(x)}{Q(x)^2},
$$
the numerator has degree at most $2m-2$: if $P$ has degree $m$, the degree-$2m-1$ coefficients cancel; if its degree is smaller, the same bound holds directly. The denominator has degree $2m$ and never vanishes on the real axis. Consequently $f'(x)\to0$ as $x\to\pm\infty$. Continuity on a sufficiently large compact interval, together with this limit outside it, gives a finite bound $K\geq\sup_{x\in\mathbb R}|f'(x)|$. The mean value theorem and the norm bound for $b_{\rho_*}$ now imply
$$
 |p(X)-p(Y)|\leq K|b_{\rho_*}(X-Y)|\leq K\|X-Y\|_{\mathrm{op}}
$$
for all matrices $X,Y$. This finishes the proof. No test or sampling argument is used to infer the universal claims. □

## Theorem B: the exact old all-density supremum is impossible under continuity

For every $d\geq1$, every response $p$ continuous on $\mathcal E_d$, valued there in $[0,1]$, with $p(0)=0$ and $p(I)=1$, and every **positive definite** density $\rho$, one has
$$
 D_\rho(p)=\max_{E\in\mathcal E_d}|p(E)-b_\rho(E)|<1.
$$
In particular the old property
$$
 \exists p\ \forall\rho\in\mathcal D_d\ \forall\eta>0
 \exists E\in\mathcal E_d:\ |p(E)-b_\rho(E)|>1-\eta
$$
is impossible for a continuous normalized probability response, already by taking $\rho=I/d$. This obstruction uses only continuity on the effects, not ambient analyticity or Lipschitz continuity.

### Proof

The effect set is closed: Hermiticity and the inequalities $v^*Ev\geq0$, $v^*(I-E)v\geq0$ for each fixed vector $v$ are closed conditions. The spectral theorem gives $\|E\|_{\mathrm{op}}\leq1$ on effects. Thus $\mathcal E_d$ is a nonempty closed bounded subset of the finite-dimensional real space $M_d(\mathbb C)$, hence compact.

For a positive definite density, the spectral coefficients $\lambda_j$ above are all strictly positive. If $b_\rho(E)=0$, all nonnegative terms $\lambda_j u_j^*Eu_j$ must vanish. For PSD $E$, $u_j^*Eu_j=\|E^{1/2}u_j\|^2$; thus $E^{1/2}$ kills the entire basis, and $E=0$. Conversely $E=0$ has response zero. Applying this to the effect $I-E$ also proves $b_\rho(E)=1$ if and only if $E=I$.

For numbers $a,b\in[0,1]$, $|a-b|=1$ is possible only at $(a,b)=(1,0)$ or $(0,1)$. In our setting these cases would force respectively $E=0,p(0)=1$, or $E=I,p(I)=0$, contradicting normalization. Hence the continuous function $|p-b_\rho|$ is pointwise strictly below one on the compact effect set. It attains a maximum, and that maximum is strictly below one. The maximally mixed density $I/d$ exists and is positive definite for every $d\geq1$. □

The full-rank qualifier matters. For a singular density, a nonzero effect can have $b_\rho(E)=0$, or an effect different from $I$ can have $b_\rho(E)=1$. More precisely, for any density and any continuous normalized response as above, compactness shows
$$
 D_\rho(p)=1\ \Longleftrightarrow
 \exists E\in\mathcal E_d:
 [p(E)=1\land b_\rho(E)=0]\ \lor\ [p(E)=0\land b_\rho(E)=1].
$$
There is no assertion here that every singular density attains one for the constructed response. Full rank is sufficient for the universal obstruction, so no classification of singular cases is needed.

## Exact comparison of quantifiers

The supplied accepted Borel theorem is retained as stated: for each $d,T,\rho_*$ there is **one** total Borel response with finite agreement, defect exactly two attained at a distinct admissible pair, and $D_\rho(p)=1$ for **every** density. Equivalently, that one response supplies strict $>1-\eta$ witnesses for every $\eta>0$. It may have discontinuous scalar spikes approaching zero.

Theorem A is a separate strengthening of the regularity of the response at the cost of a different accuracy quantifier: $∀\eta>0\,∃p_\eta$, followed by all densities. It cannot be upgraded to $∃p\,∀\eta>0$ under continuity, by Theorem B. Taking a sequence of the constructed responses as $t\to0$ does not produce a continuous limit with the old property: $p_t(0)=0$ and $p_t(tI)=1$ already preclude equicontinuity at zero.

This distinction can also be stated exactly as a minimax value. Let $\mathcal A(d,T,\rho_*)$ be the class of total, globally $[0,1]$-valued, real-analytic, globally operator-norm Lipschitz responses satisfying normalization and the finite fit. There is no fixed common Lipschitz bound in this definition. Then
$$
 \sup_{p\in\mathcal A(d,T,\rho_*)}\ \inf_{\rho\in\mathcal D_d}D_\rho(p)=1,
 \qquad
 \forall p\in\mathcal A(d,T,\rho_*):\ \inf_\rho D_\rho(p)<1.
$$
The first statement follows from Theorem A and the universal upper bound one. The second follows from $\inf_\rho D_\rho(p)\leq D_{I/d}(p)<1$. Thus the outer supremum is not attained. The subclass with $\Delta(p)=2$ has the same conclusions, since every constructed response lies in that subclass.

## What a known modulus adds to the finite-design certificate

Continuity on the compact effect set implies uniform continuity of each individual response. Ambient $C^1$ smoothness also gives an individual finite Lipschitz bound on the compact convex effect set: bound the ambient derivative on that compact set and apply the mean value estimate along its segments. Neither assertion provides a specified bound shared by all responses compatible with the finite data. Theorem A is stronger still: all its responses are globally real analytic and globally Lipschitz, but every Lipschitz constant for the response constructed at $t$ must satisfy
$$
 1=|p(tI)-p(0)|\leq Kt,\qquad K\geq1/t.
$$
For fixed $d,T,\rho_*$ and accuracies tending to zero, our $t$ tends to zero. There can therefore be no common modulus tending to zero at zero for this family. A bound can be calculated from the formula for a particular constructed response; qualitative regularity and the shared finite observations do not imply a common such bound for the unknown response.

For comparison, suppose a **specified, independently justified** nondecreasing modulus $\omega$ is known for the actual response, with $|p(E)-p(F)|\leq\omega(\|E-F\|_{\mathrm{op}})$ on effects and $\omega(r)\to0$ as $r\downarrow0$. If a finite $\delta$-net $T$ has $|p(A)-b_{\rho_*}(A)|\leq\varepsilon$ at its points, the triangle inequality proves
$$
 \sup_{E\in\mathcal E_d}|p(E)-b_{\rho_*}(E)|
 \leq\varepsilon+\omega(\delta)+\delta.
$$
Indeed, choose $A\in T$ within $\delta$ of $E$, and bound the three successive differences by $\omega(\delta)$, $\varepsilon$, and $\delta$; the last uses the proven one-Lipschitz bound for a density response.

Likewise, put $a_p(E,F)=p(E+F)-p(E)-p(F)$. For two admissible pairs with $\|E-A\|\leq\delta$ and $\|F-B\|\leq\delta$, one has
$$
 |a_p(E,F)-a_p(A,B)|\leq\omega(2\delta)+2\omega(\delta).
$$
This follows by applying the modulus to each of the three response differences and using $\|(E+F)-(A+B)\|\leq2\delta$. Thus a finite jointly covering set of **admissible pairs** with measured defect at most $\gamma$ yields global defect at most $\gamma+\omega(2\delta)+2\omega(\delta)$. For the given known Lipschitz modulus $\omega(r)=Lr$, this is $\gamma+4L\delta$. An ordinary net of single effects alone does not establish the required joint admissible-pair coverage.

These elementary inequalities explain the role of a known modulus; they do not replace or alter the existing conditional certificate or the unchanged approximate-density theorem it invokes. That certificate still requires its independently supported **known global operator-norm Lipschitz constant $L$**, feasible joint coverage, and its calibration and statistical hypotheses. Qualitative continuity, smoothness, real analyticity, or the bare existence of some finite $L$ does not discharge those requirements. No actual device or empirical claim has been established. Physical identification of effects and states, stability of the response across observations, calibration, coverage feasibility, statistical error control, and independent support for the modulus remain separate premises in any application.
