# 16.4 From Interval Sums of Squares to Continuous Matrix Completion {#sec-interval-sos-completion}


**What is missing at the endpoint?** Take $p(x)=x/2$. If the real target $p$ itself must occupy the diagonal, the condition $p(x)^2+(1-x^2)Q(x)^2=1$ gives the impossible equality $1/4=1$ at $x=1$. The missing weight can instead enter the imaginary part of the diagonal: choose

$$
\begin{aligned}
B(X)&=\frac{\sqrt3}{2}X, & C(X)&=1,\\
1-p(X)^2&=B(X)^2+(1-X^2)C(X)^2,\\
P(X)&=p(X)+iB(X)\\
&=\left(\frac12+i\frac{\sqrt3}{2}\right)X.
\end{aligned}
$$
Then $|P(1)|=1$ at the endpoint, while $\operatorname{Re}P(x)=p(x)$. The real target is preserved; the other components needed for normalization now have room to fit.

The literature basis for interval sums of squares is [arXiv:1806.01838v1, Lemma 6 and Theorems 3 and 5](https://arxiv.org/abs/1806.01838v1) of the paper by Gilyén, Su, Low, and Wiebe cited above (STOC 2019, doi:10.1145/3313276.3316366). The explanation follows that lemma and the proofs of `exists_sumsq_decomposition` and `exists_complement` in shosonoda's [fixed revision of lean-qsvt](https://github.com/auto-res/lean-qsvt/tree/42c4b9149d5957db497e4226bc02da92d10f7a3c); the source is copyright shosonoda (2026), under Apache-2.0. [@thm-interval-sumsq-decomposition] cites the main repository's reuse of the original sum-of-squares proof; [@thm-phase-unitary-completion] cites its native continuous matrix-field application. No mathematical novelty is claimed.

Write $c(R)=R.\mathrm{map}(\mathrm{algebraMap}\,\mathbb R\,\mathbb C)$ for complexification of a real polynomial. In the source, $\operatorname{IsEven}(c(R))$ means that every odd coefficient vanishes, and $\operatorname{HasParity}(c(R),m)$ means that coefficients of parity opposite to $m$ vanish. For real polynomials these are written as $R(-X)=R(X)$ and $R(-X)=(-1)^mR(X)$, respectively. Throughout, natural-number subtraction $k-1$ is truncated to $\max(k-1,0)$, and $\operatorname{natDegree}0=0$.

::: {.theorem #thm-interval-sumsq-decomposition title="Interval sums of squares for even polynomials at any degree budget" lean="D5/S3/ContinuousObservables/IntervalSOSCompletion.exists_sumsq_decomposition"}

For any $k\in\mathbb N$ and real polynomial $A\in\mathbb R[X]$, assume

$$
\begin{aligned}
A(-X)&=A(X),\\
\operatorname{natDegree}A&\le 2k,\\
A(x)&\ge0\quad(-1\le x\le1).
\end{aligned}
$$
There exist real polynomials $B,C$ such that the following is a **polynomial identity**, not merely an equality of values within the interval:

$$
\begin{aligned}
A&=B^2+(1-X^2)C^2,\\
\operatorname{natDegree}B&\le k,\\
\operatorname{natDegree}C&\le \max(k-1,0),\\
B(-X)&=(-1)^kB(X),\\
C(-X)&=(-1)^{\max(k-1,0)}C(X),\\
k=0&\ \Longrightarrow\ C=0.
\end{aligned}
$$
:::

::: proof
The bound uses truncated natural-number subtraction, $\max(k-1,0)$, and the zero polynomial has $\operatorname{natDegree}$ equal to $0$; it is both even and odd. In particular, $\operatorname{natDegree}C\le0$ only says that $C$ is constant and **cannot replace** the condition $C=0$ when $k=0$. If $A=0$, choose $B=C=0$ for any $k$; if $k=0$, then $A=a\ge0$ is constant, and $B=\sqrt a$, $C=0$ works.

**Why can the factors be completed one at a time?** Evenness and real coefficients pair the roots of a nonzero polynomial as $s,-s,\bar s,-\bar s$, with multiplicities preserved. An interior real root must have even multiplicity, since otherwise the sign would change across it; the source uses this to remove a double factor first. There are three kinds of nonnegative factors to remove:

- For $s^2=v\in\mathbb R$ with $v\notin(0,1)$, the quadratic with its sign chosen is $F_v=|1-v|X^2+|v|(1-X^2)$. This equals $X^2-v$ for $v\le0$, or $v-X^2$ for $v\ge1$. Its sum of squares uses $B_v=\sqrt{|1-v|}X$, $C_v=\sqrt{|v|}$; $v=0$ includes the factor $X^2$.
- For interior nonzero real roots $\pm r$ with $0<r^2<1$, remove $F=(X^2-r^2)^2$, with $B=X^2-r^2$, $C=0$.
- For $a=s^2\notin\mathbb R$, conjugate pairing gives a real quartic. The source uses precisely the coefficients

$$
\begin{aligned}
F_a&=(X^2-a)(X^2-\bar a)\\
&=X^4-2\operatorname{Re}(a)X^2+|a|^2,\\
\alpha&=|a|+|a-1|\ge1,\\
B_a&=\alpha X^2-|a|,\\
C_a&=\sqrt{\alpha^2-1}\,X.
\end{aligned}
$$

Expansion gives $F_a=B_a^2+(1-X^2)C_a^2$. The relation $|a-1|^2=|a|^2-2\operatorname{Re}a+1$ supplies the correct quadratic coefficient, and the triangle inequality makes the radicand nonnegative.

After writing $A=FG$, the cofactor $G$ is still even. Wherever $F>0$, we have $G=A/F\ge0$; division is unavailable at a zero of $F$. Each removed factor vanishes at only finitely many interval points. Polynomial continuity therefore extends nonnegativity to those points, using one-sided limits at the endpoints. This restores exactly the hypotheses needed to continue with the cofactor.

The completions multiply by the weighted Brahmagupta identity. With $w=1-X^2$,

$$
\begin{aligned}
&(B_1^2+wC_1^2)(B_2^2+wC_2^2)\\
&\quad=(B_1B_2-wC_1C_2)^2\\
&\qquad\quad+w(B_1C_2+B_2C_1)^2.
\end{aligned}
$$

The source proceeds by strong induction on the degree budget $k$. Constants start with a square root. Removing one of the factors above of degree $2j$, where $j=1$ or $2$, leaves a cofactor of degree at most $2(k-j)$. The identity then reassembles the result, adding both degree budgets and parities. A convenient equivalent way to keep track of products is to bound the degrees of both $B$ and $XC$ by $k$ and give both parity $k$.

When the actual degree is lower, multiply $B+i\sqrt{1-x^2}C$ on the interval by the unit-modulus factor $x+i\sqrt{1-x^2}$. At polynomial level this is

$$
\begin{aligned}
\widetilde B&=XB-(1-X^2)C,\\
\widetilde C&=B+XC.
\end{aligned}
$$

The same identity preserves the sum of squares while increasing the budget from $k$ to $k+1$ and toggling the parities. Thus a lower-degree polynomial can still meet the specified parity budget; $\deg A=2k$ is not required.

The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-phase-unitary-completion title="Native continuous unitary completion of a bounded parity polynomial" lean="D5/S3/ContinuousObservables/IntervalSOSCompletion.exists_phase_unitary_completion"}
Let $k\in\mathbb N$ and $p\in\mathbb R[X]$ satisfy $\operatorname{HasParity}(c(p),k)$, and assume

$$
\begin{aligned}
\operatorname{natDegree}p&\le k,\\
p(x)^2&\le1\quad(x\in[-1,1]).
\end{aligned}
$$

Put $T=\operatorname{AddCircle}(1:\mathbb R)=\mathbb R/\mathbb Z$, $z(t)=\operatorname{windingPhase}(t)$, $x(t)=\operatorname{Re}z(t)$, and $y(t)=\operatorname{Im}z(t)$. There exist $B,C\in\mathbb R[X]$ and $U:\mathrm{CyclicObservable}\,2$, the type of continuous complex matrix fields on $T$ with rows and columns indexed by $\mathrm{ZMod}\,2$, such that

$$
\begin{aligned}
1-p^2&=B^2+(1-X^2)C^2,\\
\operatorname{natDegree}B&\le k,\\
\operatorname{natDegree}C&\le\max(k-1,0),\\
k=0&\ \Longrightarrow\ C=0.
\end{aligned}
$$

Both $\operatorname{HasParity}(c(B),k)$ and $\operatorname{HasParity}(c(C),\max(k-1,0))$ hold. The first line is an identity in $\mathbb R[X]$. The field witness satisfies $U=\operatorname{phaseCompletion}(p,B,C)$: for every $t\in T$,

$$
U(t)=
\begin{pmatrix}
p(x(t))+iB(x(t))&iy(t)C(x(t))\\
iy(t)C(x(t))&p(x(t))-iB(x(t))
\end{pmatrix}.
$$

In the continuous matrix-field algebra, $\operatorname{star}$ is pointwise conjugate transpose and $1$ is the constant identity matrix field. All of the following hold:

$$
\begin{aligned}
\operatorname{star}(U)\,U&=1,\\
U\,\operatorname{star}(U)&=1,\\
\det U(t)&=1\quad(t\in T),\\
\operatorname{Re}(U(t)_{00})&=p(x(t))\quad(t\in T).
\end{aligned}
$$
:::

::: proof
The polynomial $A=1-p^2$ satisfies the evenness, degree, and closed-interval nonnegativity assumptions of [@thm-interval-sumsq-decomposition], which supplies $B,C$ with every stated constraint. The native circle coordinates satisfy $x(t)^2+y(t)^2=1$, so evaluation of the polynomial identity gives $p(x(t))^2+B(x(t))^2+y(t)^2C(x(t))^2=1$. Every matrix entry combines continuous coordinates with polynomial evaluation. Direct multiplication gives both star-product identities and the determinant identity, while the upper-left real part follows from the matrix formula. The full proof is checked by the Lean kernel.
:::

::: {.remark #rem-interval-sos-completion-bridges title="Completion by hand and its applicability limits"}
The explicit algebra below retains the completion's manual derivation. The complex polynomial pair, the full entrywise real-part and Hermitian-part identities, and the comparison with the interval square-root pullback are manual explanations outside the conclusions of the two Lean declarations above. Neither declaration itself supplies phase product decomposition or query bounds; the next section separately factors the same completion in [@thm-signed-circle-phase-factorization].

**Turning the deficit into the remaining matrix components.** Now let a real polynomial $p$ satisfy $\operatorname{natDegree}p\le k$, $p(-X)=(-1)^kp(X)$, and $p(x)^2\le1$ for $x\in[-1,1]$. Apply the decomposition to the even polynomial $A=1-p^2$, retain all degree, parity, and $k=0$ conditions on $B,C$, and set $P=p+iB$, $Q=C$. Then

$$
\begin{aligned}
P\bar P+(1-X^2)Q\bar Q&=1,\\
\operatorname{Re}P&=p.
\end{aligned}
$$

The bars denote coefficientwise conjugation, which becomes ordinary complex conjugation after real evaluation. The degree bounds for $P,Q$ are $k$ and $\max(k-1,0)$, with their corresponding parities, and $Q=0$ when $k=0$. These are the completion data used by Theorem 3. Theorem 5 allows both real parts to be prescribed; the original source construction used here chooses $Q=C$ and only requires $\operatorname{Re}P=p$. It **does not require $\operatorname{Re}Q=0$**.

On the interval put $s=\sqrt{1-x^2}$. The general complex completion matrix in Theorem 3 is

$$
U_{\mathrm{int}}(x)=
\begin{pmatrix}
P(x)&isQ(x)\\
is\overline{Q(x)}&\overline{P(x)}
\end{pmatrix}.
$$

For the real $Q=C$ used here, set $K=B(x)\sigma_z+sC(x)\sigma_x$, where

$$
\sigma_z=\begin{pmatrix}1&0\\0&-1\end{pmatrix},\qquad
\sigma_x=\begin{pmatrix}0&1\\1&0\end{pmatrix}.
$$

Since $\sigma_z\sigma_x+\sigma_x\sigma_z=0$, direct multiplication gives

$$
\begin{aligned}
U_{\mathrm{int}}&=p(x)I+iK, & K^*&=K,\\
K^2&=\bigl(B(x)^2+s^2C(x)^2\bigr)I\\
&=(1-p(x)^2)I,\\
U_{\mathrm{int}}^*U_{\mathrm{int}}&=p(x)^2I+K^2=I,\\
U_{\mathrm{int}}U_{\mathrm{int}}^*&=p(x)^2I+K^2=I.
\end{aligned}
$$

**Continuity and signs on the circle.** Use the circle's own coordinates $z=e^{2\pi it}$ for $t\in\mathbb R/\mathbb Z$, $x=\operatorname{Re}z$, $y=\operatorname{Im}z$. Replacing $s$ by the signed coordinate $y$ defines

$$
U_{\mathrm{circ}}(z)=
\begin{pmatrix}
p(x)+iB(x)&iyC(x)\\
iyC(x)&p(x)-iB(x)
\end{pmatrix}.
$$

Because $x^2+y^2=1$, we have $p(x)^2+B(x)^2+y^2C(x)^2=1$. Replacing $K$ above by $K_z=B(x)\sigma_z+yC(x)\sigma_x$ gives the same multiplication:

$$
\begin{aligned}
U_{\mathrm{circ}}^*U_{\mathrm{circ}}&=I,\\
U_{\mathrm{circ}}U_{\mathrm{circ}}^*&=I,\\
\det U_{\mathrm{circ}}&=p(x)^2+B(x)^2+y^2C(x)^2\\
&=1,\\
\operatorname{Re}_{\mathrm{entry}}U_{\mathrm{circ}}&=p(x)I,\\
\frac{U_{\mathrm{circ}}+U_{\mathrm{circ}}^*}{2}&=p(x)I.
\end{aligned}
$$

Here $\operatorname{Re}_{\mathrm{entry}}$ takes the real part of each matrix entry; the last line is the Hermitian part. The two operations agree for this completion with real $C$. Every entry is a polynomial combination of the continuous coordinates $x,y$, giving a continuous $\mathrm{SU}(2)$ loop. There is no division at $x=\pm1$ and no square-root sign to choose. For $k=0$, $C=0$ and the matrix is the constant diagonal phase $\operatorname{diag}(p+iB,p-iB)$.

Agreement with the interval pullback $U_{\mathrm{int}}(\operatorname{Re}z)$ is guaranteed on the upper semicircle $y\ge0$: $\sqrt{1-\cos^2\theta}=|\sin\theta|$. For example, the valid completion $P=X,Q=1$ at $\theta=-\pi/3$ has off-diagonal entries $i\sqrt3/2$ in the interval pullback and $-i\sqrt3/2$ in the signed circle loop. Both matrices are unitary, but the loops differ. What we have obtained is a completion of the polynomial deficit and its continuous matrix consequences. Factorization on the entire signed circle is proved separately in the next section. These two completion statements themselves supply no continuity of phase choices, query complexity, or full block-encoding QSVT result, and make no empirical physics claim.
:::
