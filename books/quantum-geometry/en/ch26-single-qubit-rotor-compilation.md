# Single-Qubit Rotor Compilation: Bloch Geometry Theorems and the ZYZ Euler Compiler

> *"A quantum state is a direction, and a quantum gate turns that direction; it can therefore be understood as a geometric structure with area."*

In [Chapter 25](ch25-rewriting-and-xor.md), we compressed the eight-dimensional real Clifford algebra $\mathcal{Cl}_{3,0}(\mathbb{R})$ into the 3-bit XOR blade engine `GeometricState` and verified the $2\times 2$ matrix core of the traceless Bloch operator $B(a) = a_0 X + a_1 Y + a_2 Z$ ([@cor-bloch-operator-core]).

In this chapter we complete the single-qubit computational bridge by joining two halves:

1. **On the state-geometry side (verified in the Lean 4 kernel)**: How does an arbitrary $2\times 2$ Hermitian matrix $M \in M_2(\mathbb{C})$ decompose into its real trace $\operatorname{Re}(\Tr M)$ and three-dimensional Bloch vector $\operatorname{bloch}(M) \in \mathbb{R}^3$? Why do trace-one idempotent projectors ($M^2 = M$) lie on the unit sphere $\norm{\operatorname{bloch}(M)} = 1$, while every positive-semidefinite matrix (`M.PosSemidef`) obeys the solid-ball bound $\norm{\operatorname{bloch}(M)} \le \operatorname{Re}(\Tr M)$?
2. **On the gate-compilation side (the Python 3 `RotorCompiler`)**: Given any ZYZ Euler angle triple $(\alpha, \beta, \gamma)$, how do we compile the three rotations directly inside the four-dimensional even subalgebra $\mathcal{Cl}^+_{3,0}(\mathbb{R}) = \operatorname{span}_{\mathbb{R}}\{1, e_1 e_2, e_1 e_3, e_2 e_3\}$ into a single unit rotor
   $$
   R(\alpha, \beta, \gamma) = R_z(\alpha)\,R_y(\beta)\,R_z(\gamma),
   $$
   and rotate any vector $v \in \mathbb{R}^3$ via the two-sided sandwich product $v \mapsto R v \widetilde{R}$?

::: {.figure src="ch26-overview"}
**Figure 26.** The chapter at a glance. Panel I: the green Bloch ball; the amber pure-state arrow reaches the shell $\lvert r\rvert = 1$, and the dark point lies inside, where every trace-one positive semidefinite matrix lands ([@prop-hermitian-bloch-geometry], [@cor-psd-bloch-ball-bound]). Panel II: the sandwich turns by $90^\circ$ about the violet $z$ axis; the cyan shadow stays on the axis, and the magenta fan is split by a dashed line into two half-angles. Panel III: in the order used by the rotor product, $e_1$ turns about $z$ by $\gamma$, then about $y$ by $\beta$, and finally about $z$ by $\alpha$, with parameter tuple $(\alpha, \beta, \gamma) = (0.37, -0.81, 0.52)$; the amber path of three legs ends at $R e_1 \widetilde{R}$ (rotor compilation is a numerical illustration with no frozen theorem).
:::

## Bloch Matrix Trace and Coordinate Recovery {#sec-bloch-matrix-trace-and-recovery}

In the Lean 4 module `D5/S3/Quantum/Information/ActualPureQubitGeometry.lean` (within namespace `D5.S3.Quantum.Information.ActualPureQubitCostInfimum`), the exact bidirectional correspondence between $2\times 2$ Hermitian matrices $M \in M_2(\mathbb{C})$ and pairs consisting of a real trace scalar $\operatorname{Re}(\Tr M)$ and a real Bloch three-vector $\operatorname{bloch}(M) \in \operatorname{EuclideanSpace}\,\mathbb{R}\,(\operatorname{Fin} 3)$ is defined by two maps:

1. **The Bloch coordinate extraction map `bloch`**: For any $M \in M_2(\mathbb{C})$,
   $$
   \operatorname{bloch}(M) = \operatorname{WithLp.toLp}_2\,\bigl[\,2\operatorname{Re}(M_{01}),\;\; -2\operatorname{Im}(M_{01}),\;\; \operatorname{Re}(M_{00}) - \operatorname{Re}(M_{11})\,\bigr] \in \operatorname{EuclideanSpace}\,\mathbb{R}\,(\operatorname{Fin} 3);
   $$
2. **The Bloch matrix reconstruction map `blochMatrix`**: For any real trace scalar $a \in \mathbb{R}$ and real three-vector $r = (r_0, r_1, r_2) \in \operatorname{EuclideanSpace}\,\mathbb{R}\,(\operatorname{Fin} 3)$,
   $$
   \operatorname{blochMatrix}(a, r) = \begin{pmatrix} \dfrac{(a + r_2 : \mathbb{R})}{2} & \dfrac{(r_0 : \mathbb{C}) - (r_1 : \mathbb{C})i}{2} \\ \dfrac{(r_0 : \mathbb{C}) + (r_1 : \mathbb{C})i}{2} & \dfrac{(a - r_2 : \mathbb{R})}{2} \end{pmatrix} = \frac{a}{2} I_2 + \frac{1}{2}\bigl(r_0 X + r_1 Y + r_2 Z\bigr).
   $$

Our first two frozen results certify that `blochMatrix a r` recovers the exact trace scalar $a$ under `Matrix.trace` and the exact three-vector $r$ under `bloch`.

::: {.theorem #thm-bloch-matrix-trace title="Exact Trace Identity for the Reconstructed Bloch Matrix" lean="D5/S3/Quantum/Information/ActualPureQubitGeometry.blochMatrix_trace"}
For every real scalar $a \in \mathbb{R}$ and every three-dimensional real vector $r \in \operatorname{EuclideanSpace}\,\mathbb{R}\,(\operatorname{Fin} 3)$, the trace of $\operatorname{blochMatrix}(a, r)$ equals $(a : \mathbb{C})$:

$$
\Tr\bigl(\operatorname{blochMatrix}(a, r)\bigr) = (a : \mathbb{C}).
$$
:::

::: proof
In `D5/S3/Quantum/Information/ActualPureQubitGeometry.lean:58`, `simp [blochMatrix, Matrix.trace, Fin.sum_univ_two]` expands the $2\times 2$ matrix trace into the sum of the two diagonal entries:

$$
\Tr\bigl(\operatorname{blochMatrix}(a, r)\bigr) = \frac{(a : \mathbb{C}) + (r_2 : \mathbb{C})}{2} + \frac{(a : \mathbb{C}) - (r_2 : \mathbb{C})}{2},
$$

and `ring` cancels the $\pm(r_2 : \mathbb{C})/2$ terms to leave $(a : \mathbb{C})$. The full proof is checked by the Lean kernel.
:::

::: {.lemma #lemma-bloch-coordinate-recovery title="Exact Recovery of the Bloch Vector from a Bloch Matrix" lean="D5/S3/Quantum/Information/ActualPureQubitGeometry.bloch_blochMatrix"}
For every real scalar $a \in \mathbb{R}$ and every three-dimensional real vector $r \in \operatorname{EuclideanSpace}\,\mathbb{R}\,(\operatorname{Fin} 3)$, applying `bloch` to $\operatorname{blochMatrix}(a, r)$ recovers $r$:

$$
\operatorname{bloch}\bigl(\operatorname{blochMatrix}(a, r)\bigr) = r.
$$
:::

::: proof
In `D5/S3/Quantum/Information/ActualPureQubitGeometry.lean:63`, the proof applies `ext i` and `fin_cases i <;> (simp [blochMatrix, bloch]; ring)` across the three coordinates $i \in \{0, 1, 2\}$:

- At $i = 0$: $2\operatorname{Re}\bigl(\frac{r_0 - i r_1}{2}\bigr) = r_0$;
- At $i = 1$: $-2\operatorname{Im}\bigl(\frac{r_0 - i r_1}{2}\bigr) = -2\bigl(-\frac{r_1}{2}\bigr) = r_1$;
- At $i = 2$: $\frac{a + r_2}{2} - \frac{a - r_2}{2} = r_2$.

Hence $\operatorname{bloch}(\operatorname{blochMatrix}(a, r)) = r$. The full proof is checked by the Lean kernel.
:::

::: {.figure src="ch26-read-coords"}
**Reading the trace and the three coordinates back from the matrix.** Take $\operatorname{blochMatrix}(1, r)$ with $r = (0.48, 0.60, 0.64)$: the two cyan diagonal cells add to the trace $1$ and subtract to $z = 0.64$; the dark top-right cell gives $x = 2 \times 0.24$ and $y = -2 \times (-0.30)$; the dashed bottom-left cell is only its conjugate and is not read. What comes back is $r$ ([@thm-bloch-matrix-trace], [@lemma-bloch-coordinate-recovery]).
:::

## Hermitian Reconstruction, the Pure-State Sphere, and the Positive-Semidefinite Ball Bound {#sec-hermitian-bloch-and-psd-ball}

Conversely, start with an arbitrary Hermitian $2\times 2$ matrix $M \in M_2(\mathbb{C})$ (`hM : M.IsHermitian`). The next frozen proposition proves both that $M$ is reconstructed identically from its real trace `(Matrix.trace M).re` and its Bloch vector `bloch M`, and that whenever $M$ has unit trace ($\Tr M = 1$) and is idempotent ($M \cdot M = M$), its Bloch vector lies on the unit sphere $\norm{\operatorname{bloch}(M)} = 1$.

::: {.proposition #prop-hermitian-bloch-geometry title="Hermitian Bloch Matrix Reconstruction and Pure-Projector Unit-Sphere Theorem" lean="D5/S3/Quantum/Information/ActualPureQubitGeometry.bloch_geometry_of_isHermitian"}
Let $M \in M_2(\mathbb{C})$ be a $2\times 2$ complex matrix satisfying `hM : M.IsHermitian`. Then both properties hold:

1. **Exact Hermitian reconstruction**:
   $$
   M = \operatorname{blochMatrix}\bigl(\operatorname{Re}(\Tr M),\; \operatorname{bloch}(M)\bigr);
   $$
2. **Unit-sphere norm for trace-one idempotent projectors**:
   $$
   \Tr M = 1 \;\longrightarrow\; M \cdot M = M \;\longrightarrow\; \norm{\operatorname{bloch}(M)} = 1.
   $$
:::

::: proof
In `D5/S3/Quantum/Information/ActualPureQubitGeometry.lean:68`, Hermiticity $M^* = M$ yields four component relations: $\operatorname{Im}(M_{00}) = 0$ (`h00`), $\operatorname{Im}(M_{11}) = 0$ (`h11`), $\operatorname{Re}(M_{10}) = \operatorname{Re}(M_{01})$ (`h10r`), and $\operatorname{Im}(M_{10}) = -\operatorname{Im}(M_{01})$ (`h10i`).

- For the first conjunct, `ext i j`, `fin_cases i <;> fin_cases j`, and `Complex.ext` followed by `simp` and `ring` verify entrywise equality between $M$ and $\operatorname{blochMatrix}(\operatorname{Re}(\Tr M), \operatorname{bloch}(M))$.
- For the second conjunct, assuming `ht : Matrix.trace M = 1` and `hp : M * M = M`, taking the real part of the traces of $M$ and $M^2$ yields $\operatorname{Re}(M_{00}) + \operatorname{Re}(M_{11}) = 1$ and $\operatorname{Re}(M_{00})^2 + \operatorname{Re}(M_{11})^2 + 2\bigl(\operatorname{Re}(M_{01})^2 + \operatorname{Im}(M_{01})^2\bigr) = 1$. Expanding `EuclideanSpace.real_norm_sq_eq` gives
  $$
  \norm{\operatorname{bloch}(M)}^2 = 4\operatorname{Re}(M_{01})^2 + 4\operatorname{Im}(M_{01})^2 + \bigl(\operatorname{Re}(M_{00}) - \operatorname{Re}(M_{11})\bigr)^2 = 1,
  $$
  and `nlinarith` with `norm_nonneg (bloch M)` concludes $\norm{\operatorname{bloch}(M)} = 1$.

The full proof is checked by the Lean kernel.
:::

When idempotence $M^2 = M$ is relaxed to positive semidefiniteness `hM : M.PosSemidef` (covering mixed states and general POVM effects, as in [Chapter 4](ch04-decoherence.md)), the fourth frozen theorem proves that the Bloch norm is bounded above by the real trace `(Matrix.trace M).re`.

::: {.corollary #cor-psd-bloch-ball-bound title="Bloch Norm Bound for Positive-Semidefinite 2×2 Matrices" lean="D5/S3/Quantum/Information/ActualPureQubitGeometry.norm_bloch_le_trace_of_posSemidef"}
Let $M \in M_2(\mathbb{C})$ be a $2\times 2$ complex matrix. If $M$ is positive semidefinite (`hM : M.PosSemidef`), then

$$
\norm{\operatorname{bloch}(M)} \le \operatorname{Re}(\Tr M).
$$
:::

::: proof
In `D5/S3/Quantum/Information/ActualPureQubitGeometry.lean:100`, `hM.trace_nonneg` and `hM.det_nonneg` imply $\operatorname{Re}(\Tr M) \ge 0$ (`ht`) and $\operatorname{Re}(\det M) \ge 0$ (`hd`). Rewriting $M$ via the first conjunct of [@prop-hermitian-bloch-geometry] together with [@thm-bloch-matrix-trace], [@lemma-bloch-coordinate-recovery], and `Matrix.det_fin_two` yields the determinant identity (`he`):

$$
\operatorname{Re}(\det M) = \frac{\bigl(\operatorname{Re}(\Tr M)\bigr)^2 - \norm{\operatorname{bloch}(M)}^2}{4}.
$$

Since $\operatorname{Re}(\det M) \ge 0$ and both $\operatorname{Re}(\Tr M)$ and $\norm{\operatorname{bloch}(M)}$ are nonnegative, `nlinarith` derives $\norm{\operatorname{bloch}(M)} \le \operatorname{Re}(\Tr M)$. The full proof is checked by the Lean kernel.
:::

::: {.figure src="ch26-det-sign"}
**With trace $1$, the sign of the determinant says where the arrow ends.** The $x$–$z$ cross-section of the Bloch ball, with $\det = (1 - \lvert r\rvert^2)/4$: the amber pure state on the green circle has $\det = 0$; the dark point inside has $\det = 0.19 > 0$; the magenta point outside has $\det = -0.17 < 0$ and is not positive semidefinite. The green disc is where positive semidefinite matrices can land ([@cor-psd-bloch-ball-bound]); the circle holds the trace-one idempotent pure states ([@prop-hermitian-bloch-geometry]).
:::

## Even-Subalgebra Bivectors and the Rotor Sandwich Action {#sec-even-rotor-sandwich-action}

Now let us see how rotations of the Bloch vector $v = r_0 e_1 + r_1 e_2 + r_2 e_3 \in \mathbb{R}^3 \subset \mathcal{Cl}_{3,0}(\mathbb{R})$ are compiled directly inside the four-dimensional even subalgebra $\mathcal{Cl}^+_{3,0}(\mathbb{R}) = \operatorname{span}_{\mathbb{R}}\{1, e_1 e_2, e_1 e_3, e_2 e_3\}$.

In $\mathcal{Cl}_{3,0}(\mathbb{R})$, the three right-handed unit rotation bivectors orthogonal to the $x, y, z$ axes ($e_1, e_2, e_3$) are

$$
B_x = e_2 e_3 \;\;(\text{mask }6 = 110_2), \qquad
B_y = e_3 e_1 = -e_1 e_3 \;\;(-\text{mask }5 = 101_2), \qquad
B_z = e_1 e_2 \;\;(\text{mask }3 = 011_2).
$$

Because $B_u^2 = -1$ and $\widetilde{B}_u = -B_u$ for each axis $u \in \{x, y, z\}$, the **elementary rotor** for a right-handed rotation by angle $\theta$ about axis $u$ is given by the half-angle formula (Panel II of Figure 26):

$$
R_u(\theta) = \exp\Bigl(-\frac{\theta}{2} B_u\Bigr) = \cos\frac{\theta}{2} - \sin\frac{\theta}{2}\,B_u \in \mathcal{Cl}^+_{3,0}(\mathbb{R}),
$$

::: {.figure src="ch26-half-angle"}
**The rotor goes half the angle, the arrow the whole of it.** With $\theta = 120^\circ$ about $z$: on the left, the violet point $R_z(\theta)$ sits at $\theta/2 = 60^\circ$ on the unit circle, its scalar $\cos 60^\circ$ across and its $-e_{12}$ coefficient $\sin 60^\circ$ up, and lying on the circle means $R\widetilde{R} = 1$; on the right, the sandwich turns $e_1$ through the full $120^\circ$ of the magenta fan, to the amber $R e_1 \widetilde{R}$.
:::

with unit norm $R_u(\theta)\widetilde{R}_u(\theta) = \cos^2(\theta/2) + \sin^2(\theta/2) = 1$. Under the two-sided **sandwich product** $v \mapsto R_u(\theta)\,v\,\widetilde{R}_u(\theta)$, components $v_\parallel$ parallel to axis $u$ commute with $B_u$ and remain fixed, whereas components $v_\perp$ lying in the plane $B_u$ anticommute with $B_u$, combining the two half-angles into a full rotation $R_u(\theta)^2 v_\perp = (\cos\theta - \sin\theta\,B_u)v_\perp$.

::: {.viz src="zyz-compile" preset="sandwich" height="500"}
**The sandwich: the shadow on the axis stays, the plane turns in full.** The amber arrow $v = (\tfrac{\sqrt{3}}{2}, 0, \tfrac{1}{2})$ turns by $90^\circ$ about the violet $z$ axis: its cyan shadow $\tfrac{1}{2}e_3$ stays on the axis, while the magenta part sweeps a $90^\circ$ fan in the plane $z = \tfrac{1}{2}$, split by the dashed line into two halves of $45^\circ$, the half-angles contributed by $R_z$ on the left and $\widetilde{R}_z$ on the right. This is the hand computation of this section; the page is a numerical illustration.
:::

Consequently, compiling a **ZYZ Euler triple** $(\alpha, \beta, \gamma)$ requires only two multivector multiplications in $\mathcal{Cl}^+_{3,0}(\mathbb{R})$:

$$
R(\alpha, \beta, \gamma) = R_z(\alpha)\,R_y(\beta)\,R_z(\gamma).
$$

::: {.viz src="zyz-compile" preset="chain" height="500"}
**Three turns multiply into one rotor.** With the triple $(\alpha, \beta, \gamma) = (0.37, -0.81, 0.52)$ of the example below, the amber arrow $v$ turns first by $\gamma$ about the violet $z$ axis, then by $\beta$ about $y$, and last by $\alpha$ about $z$; the white tripod comes to rest at $Re_1$, $Re_2$, $Re_3$, and the top of the figure shows the compiled rotor $0.830 - 0.396\,e_1e_2 - 0.393\,e_1e_3 + 0.030\,e_2e_3$. Rotor compilation has no frozen theorem; on the page it is a numerical illustration only.
:::

## Python 3 ZYZ Rotor Compiler Implementation and Numerical Verification {#sec-zyz-rotor-compiler-python}

We keep the real coefficients of the preceding chapter's engine: compilation produces real even rotors, whose unit condition makes `reverse()` their inverse; `norm_squared()` checks normalization within this same domain.

Below is the complete runnable Python 3 `RotorCompiler` and `self_test()` implementation (building directly on `GeometricState` from [Chapter 25](ch25-rewriting-and-xor.md)):

```python
from __future__ import annotations

from dataclasses import dataclass
from math import cos, sin, isclose, pi
from typing import Dict, Mapping, Tuple

BLADE_NAMES: Dict[int, str] = {
    0: "1", 1: "e1", 2: "e2", 3: "e12",
    4: "e3", 5: "e13", 6: "e23", 7: "e123",
}


def _blade_sign(left: int, right: int) -> int:
    """Sign of e_left * e_right in Cl(3,0), with e_i^2 = 1."""
    inversions = 0
    for i in range(3):
        if (left >> i) & 1:
            inversions += (right & ((1 << i) - 1)).bit_count()
    return -1 if inversions % 2 else 1


@dataclass(frozen=True)
class GeometricState:
    """Sparse multivector in the eight-dimensional Cl(3,0) basis."""

    terms: Mapping[int, complex]

    def __post_init__(self) -> None:
        clean = {int(k): complex(v) for k, v in self.terms.items() if abs(v) > 1e-14}
        if any(k < 0 or k > 7 for k in clean):
            raise ValueError("a Cl(3,0) blade mask must use three bits")
        object.__setattr__(self, "terms", clean)

    @staticmethod
    def zero() -> "GeometricState":
        return GeometricState({})

    @staticmethod
    def scalar(value: complex) -> "GeometricState":
        return GeometricState({0: value})

    @staticmethod
    def basis(index: int) -> "GeometricState":
        if index not in (0, 1, 2):
            raise ValueError("basis index must be 0, 1, or 2")
        return GeometricState({1 << index: 1})

    @staticmethod
    def pauli(x: int, z: int, phase: int = 0) -> "GeometricState":
        """Binary Pauli word, encoded by the X/Z symplectic bits."""
        if x not in (0, 1) or z not in (0, 1):
            raise ValueError("Pauli bits must be 0 or 1")
        mask = (1 if x else 0) | (2 if z else 0)
        return GeometricState({mask: (1j) ** phase})

    def __add__(self, other: "GeometricState") -> "GeometricState":
        out: Dict[int, complex] = dict(self.terms)
        for mask, value in other.terms.items():
            out[mask] = out.get(mask, 0j) + value
        return GeometricState(out)

    def __neg__(self) -> "GeometricState":
        return GeometricState({m: -v for m, v in self.terms.items()})

    def __sub__(self, other: "GeometricState") -> "GeometricState":
        return self + (-other)

    def __rmul__(self, scalar: complex) -> "GeometricState":
        return GeometricState({m: scalar * v for m, v in self.terms.items()})

    def __mul__(self, other: "GeometricState") -> "GeometricState":
        out: Dict[int, complex] = {}
        for left, a in self.terms.items():
            for right, b in other.terms.items():
                mask = left ^ right
                value = a * b * _blade_sign(left, right)
                out[mask] = out.get(mask, 0j) + value
        return GeometricState(out)

    def reverse(self) -> "GeometricState":
        out = {}
        for mask, value in self.terms.items():
            grade = mask.bit_count()
            out[mask] = value * (-1 if grade * (grade - 1) // 2 % 2 else 1)
        return GeometricState(out)

    def scalar_part(self) -> complex:
        return self.terms.get(0, 0j)

    def norm_squared(self) -> float:
        value = (self * self.reverse()).scalar_part()
        return float(value.real)

    def close(self, other: "GeometricState", tol: float = 1e-10) -> bool:
        return all(abs((self - other).terms.get(m, 0j)) <= tol
                   for m in set(self.terms) | set(other.terms))


def _bivector(axis: str) -> GeometricState:
    # Right-handed rotation planes: z -> e12, y -> e31, x -> e23.
    planes = {"x": (2, 4), "y": (4, 1), "z": (1, 2)}
    try:
        a, b = planes[axis.lower()]
    except KeyError as exc:
        raise ValueError("axis must be x, y, or z") from exc
    return GeometricState.basis(a.bit_length() - 1) * GeometricState.basis(b.bit_length() - 1)


class RotorCompiler:
    """Compile a ZYZ Euler triple into an even Clifford rotor."""

    @staticmethod
    def rotor(axis: str, angle: float) -> GeometricState:
        plane = _bivector(axis)
        return GeometricState.scalar(cos(angle / 2.0)) - sin(angle / 2.0) * plane

    @classmethod
    def compile(cls, alpha: float, beta: float, gamma: float) -> GeometricState:
        return cls.rotor("z", alpha) * cls.rotor("y", beta) * cls.rotor("z", gamma)

    @staticmethod
    def apply(rotor: GeometricState, vector: GeometricState) -> GeometricState:
        return rotor * vector * rotor.reverse()

    @classmethod
    def zyz_matrix(cls, alpha: float, beta: float, gamma: float) -> Tuple[Tuple[float, ...], ...]:
        ca, sa = cos(alpha), sin(alpha)
        cb, sb = cos(beta), sin(beta)
        cg, sg = cos(gamma), sin(gamma)
        return (
            (ca * cb * cg - sa * sg, -ca * cb * sg - sa * cg, ca * sb),
            (sa * cb * cg + ca * sg, -sa * cb * sg + ca * cg, sa * sb),
            (-sb * cg, sb * sg, cb),
        )


def _assert_state(actual: GeometricState, expected: GeometricState) -> None:
    assert actual.close(expected), (actual, expected)


def self_test() -> None:
    e1, e2, e3 = (GeometricState.basis(i) for i in range(3))
    one = GeometricState.scalar(1)
    _assert_state(e1 * e1, one)
    _assert_state(e1 * e2, -e2 * e1)
    _assert_state(e1 * e2 * e3 * e1 * e2 * e3, GeometricState.scalar(-1))
    _assert_state(GeometricState.pauli(1, 0) * GeometricState.pauli(0, 1), e1 * e2)
    _assert_state(GeometricState.pauli(0, 1) * GeometricState.pauli(1, 0), -(e1 * e2))
    _assert_state(GeometricState.pauli(1, 1, phase=1), 1j * (e1 * e2))

    compiler = RotorCompiler()
    rotor = compiler.compile(0.37, -0.81, 0.52)
    _assert_state(rotor * rotor.reverse(), one)
    assert isclose(rotor.norm_squared(), 1.0, abs_tol=1e-12)
    x = e1
    rotated = compiler.apply(compiler.rotor("z", 0.5), x)
    assert isclose(rotated.terms.get(1, 0j).real, cos(0.5), abs_tol=1e-10)
    assert isclose(rotated.terms.get(2, 0j).real, sin(0.5), abs_tol=1e-10)
    matrix = compiler.zyz_matrix(0.37, -0.81, 0.52)
    assert all(isclose(sum(row[k] * row[k] for k in range(3)), 1.0, abs_tol=1e-10)
               for row in matrix)
    r_h = compiler.compile(0.0, pi / 2.0, pi)
    _assert_state(compiler.apply(r_h, e1), e3)
    _assert_state(compiler.apply(r_h, e2), -e2)
    _assert_state(compiler.apply(r_h, e3), e1)
    print("part7_engine: self-test passed (Cl(3,0) XOR/Pauli + ZYZ rotor)")


self_test()
```

Let us verify the compiled multivector coefficients and rotated basis vectors on the test Euler triple $(\alpha, \beta, \gamma) = (0.37, -0.81, 0.52)$ as well as on the $T$ and Hadamard $H$ gates.

::: {.figure src="ch26-rotor-product"}
**Three two-term rotors multiply into one four-term rotor.** The four panels share one small chart, with violet bars for the coefficients of $1, e_{12}, e_{13}, e_{23}$: $R_z(0.37)$, $R_y(-0.81)$ and $R_z(0.52)$ have two bars each, the product $R$ has all four nonzero, and in every panel the squares add up to $1$. These are the numbers of the example below; rotor compilation has no frozen theorem.
:::

::: {.example #ex-zyz-compilation-trace title="Numerical Verification of (0.37, −0.81, 0.52) and Compilation of T and H"}
1. **Nontrivial Euler triple $(\alpha, \beta, \gamma) = (0.37, -0.81, 0.52)$**: Calling `RotorCompiler.compile(0.37, -0.81, 0.52)` produces an even multivector supported on masks `0` ($1$), `3` ($e_1 e_2$), `5` ($e_1 e_3$), and `6` ($e_2 e_3$):
   $$
   R(0.37, -0.81, 0.52) \approx 0.829592 - 0.395635\,e_1 e_2 - 0.392911\,e_1 e_3 + 0.029524\,e_2 e_3,
   $$
   where calling `rotor.norm_squared()` (`(R * R.reverse()).scalar_part().real`) on the unrounded floating-point `rotor` object returns a value that rounds to `1.000000000000` at twelve decimal places (while summing the squares of the 6-decimal rounded display coefficients gives $0.829592^2 + (-0.395635)^2 + (-0.392911)^2 + 0.029524^2 \approx 1.000001 \approx 1$). Evaluating `apply(R, e_k)` on $e_1, e_2, e_3$ reproduces the three columns of `zyz_matrix(0.37, -0.81, 0.52)` to machine precision:
   $$
   M_{\mathrm{ZYZ}}(0.37, -0.81, 0.52) \approx \begin{pmatrix}
   0.378188 & -0.633230 & -0.675273 \\
   0.679631 & 0.685203 & -0.261913 \\
   0.628550 & -0.359884 & 0.689498
   \end{pmatrix}.
   $$
2. **Compiling the $\pi/8$ gate ($T$ gate)**: Up to global phase $e^{i\pi/8}$, $T = \operatorname{diag}(1, e^{i\pi/4})$ rotates the Bloch sphere by $\alpha = \pi/4$ about the $z$ axis, so $(\alpha, \beta, \gamma) = (\pi/4, 0, 0)$ compiles to
   $$
   R_T = \cos\frac{\pi}{8} - \sin\frac{\pi}{8}\,e_1 e_2 \approx 0.923880 - 0.382683\,e_1 e_2.
   $$
3. **Compiling the Hadamard gate ($H$)**: On the Bloch sphere, $H = (X + Z)/\sqrt{2}$ swaps $e_1 \leftrightarrow e_3$ and negates $e_2 \mapsto -e_2$ (a $\pi$ rotation about the $(e_1 + e_3)/\sqrt{2}$ axis), corresponding to $(\alpha, \beta, \gamma) = (0, \pi/2, \pi)$. Calling `compile(0, pi/2, pi)` gives the pure bivector rotor
   $$
   R_H = -\frac{1}{\sqrt{2}}\,e_1 e_2 - \frac{1}{\sqrt{2}}\,e_2 e_3 \approx -0.707107\,e_1 e_2 - 0.707107\,e_2 e_3,
   $$
   satisfying $R_H e_1 \widetilde{R}_H = e_3$, $R_H e_2 \widetilde{R}_H = -e_2$, and $R_H e_3 \widetilde{R}_H = e_1$ to machine precision.
:::

::: {.viz src="zyz-compile" preset="h" height="500"}
**The Hadamard gate $(0, \pi/2, \pi)$.** By contrast, the $T$ gate $(\pi/4, 0, 0)$ has only a last turn of $45^\circ$ about $z$, the same kind of picture as the sandwich card above; the Hadamard gate takes two turns. The first is $180^\circ$ about $z$: the amber arrow sits at the north pole, on the axis, so only its cyan shadow is left while the tripod's $Re_1$ and $Re_2$ flip over; the second turn is $90^\circ$ about $y$ and brings the arrow down to $e_1$. The violet dashed line is the diagonal axis $(e_1 + e_3)/\sqrt{2}$, and the tripod comes to rest at $Re_1 = e_3$, $Re_2 = -e_2$, $Re_3 = e_1$.
:::

::: {.remark #rem-zyz-euler-compilation-literature title="The SU(2)→SO(3) Double Cover and Universal ZYZ Euler Decomposition (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Two classical theorems from quantum computation and Lie group theory frame the compiler construction above:

1. **Universal ZYZ Euler decomposition for single-qubit unitaries** (M. A. Nielsen & I. L. Chuang, *Quantum Computation and Quantum Information*, 10th Anniversary Ed., Cambridge University Press, 2010, Theorem 4.1, §4.2; A. Barenco et al., *Phys. Rev. A* **52**, 3457, 1995, DOI `10.1103/PhysRevA.52.3457`): For every $U \in \mathrm{U}(2)$, there exist real angles $(\delta, \alpha, \beta, \gamma) \in \mathbb{R}^4$ such that
   $$
   U = e^{i\delta}\,R_z(\alpha)\,R_y(\beta)\,R_z(\gamma).
   $$
2. **The $2:1$ spin double cover $\operatorname{Spin}(3) \cong \mathrm{SU}(2) \to \mathrm{SO}(3)$**: Inside $\mathcal{Cl}^+_{3,0}(\mathbb{R})$, the norm-one rotor group $\operatorname{Spin}(3) = \{R \in \mathcal{Cl}^+_{3,0}(\mathbb{R}) \mid R\widetilde{R} = 1\} \cong S^3 \cong \mathrm{SU}(2)$ acts on $\mathbb{R}^3$ via $v \mapsto R v \widetilde{R}$, defining a surjective $2:1$ homomorphism onto $\mathrm{SO}(3)$ with kernel $\{\pm 1\}$. For a fixed plane of rotation, the topology of this two-to-one map — unique path lifting, no continuous global section, sign reversal of the rotor after a full turn — is verified by [@thm-circle-double-cover-history-lift] in [Chapter 5](ch05-complex-phase-and-rotors.md).
3. **Exact scope of the frozen theorems**: The four Lean-verified theorems in this chapter (`ActualPureQubitGeometry`) prove the trace formula for `blochMatrix a r` ([@thm-bloch-matrix-trace]), coordinate recovery `bloch (blochMatrix a r) = r` ([@lemma-bloch-coordinate-recovery]), Hermitian Bloch reconstruction and unit-sphere norm for trace-one idempotent projectors ([@prop-hermitian-bloch-geometry]), and the positive-semidefinite ball bound $\norm{\operatorname{bloch}(M)} \le \operatorname{Re}(\Tr M)$ ([@cor-psd-bloch-ball-bound]). Surjectivity of $\mathrm{SU}(2) \to \mathrm{SO}(3)$ and existence of ZYZ angles for arbitrary $U \in \mathrm{U}(2)$ belong to the literature layer, while `RotorCompiler` implements the forward rotor synthesis from $(\alpha, \beta, \gamma)$.
:::

::: {.viz src="zyz-compile" preset="fold" height="500"}
**Three turns equal one turn about one axis.** For the same angles $(0.37, -0.81, 0.52)$, the violet dashed line is the compiled rotor's own axis $n$ and the violet dashed arc a single turn of $67.9^\circ$ about it: leaving the white start ring, it lands exactly where the white road of the three turns ends. That a unit rotor is one turn about one axis belongs to the literature results above and is not formalized in this book; the axis and the angle are computed numerically by the page.
:::

The $67.9^\circ$ of the violet dashed arc comes from the scalar part of the rotor in the example: the scalar $0.829592$ is the cosine of the half-angle, and $2\arccos 0.829592 \approx 67.9^\circ$.

::: {.viz src="zyz-compile" height="560"}
**The ZYZ compilation lab.** Drag the three Euler angles, move the arrow's start, or switch on the single axis $n$: in every turn the cyan shadow stays put while the magenta fan sweeps the whole angle, and in the strip scalar$^2$ and area$^2$ trade off with a sum that stays $1$. The green boxes cite only this chapter's four frozen theorems ([@thm-bloch-matrix-trace], [@lemma-bloch-coordinate-recovery], [@prop-hermitian-bloch-geometry], [@cor-psd-bloch-ball-bound]), which the page checks one by one on the pure state $\rho = \operatorname{blochMatrix}(1, v)$ of the arrow.
:::

Our executable Python 3 geometric algebra and rotor compilation engine is now complete.

::: {.film src="007-zyz-compile"}
**Compiling a rotation into three turns: ZYZ and the sandwich action (2 min 5 s).** Turning about the violet $z$ axis, the cyan shadow $\tfrac{1}{2}e_3$ stays put and the magenta part sweeps the whole angle, while on the little dial the rotor moves only half as far; then the amber arrow turns about $z$, $y$ and $z$ by $\gamma$, $\beta$ and $\alpha$, the three rotors multiply into one rotor with four coefficients, $0.830 - 0.396\,e_1e_2 - 0.393\,e_1e_3 + 0.030\,e_2e_3$, and sandwiching the three basis vectors with it gives the columns of the ZYZ matrix; a single $67.9^\circ$ turn about its own axis lands on the same point (the single axis is the literature result of [@rem-zyz-euler-compilation-literature]; the rotor compilation is a numerical demonstration). The $T$ and Hadamard gates follow, and the film ends on the pure state $\rho = \operatorname{blochMatrix}(1, v)$ with this chapter's four frozen theorems ([@thm-bloch-matrix-trace], [@lemma-bloch-coordinate-recovery], [@prop-hermitian-bloch-geometry], [@cor-psd-bloch-ball-bound]).
:::

From here we step directly into the frozen Lean 4 source files of `trureturing@dev` to audit the proof scripts that certify this monograph. Let us open [Chapter 27](ch27-reading-frozen-proofs-i.md).
