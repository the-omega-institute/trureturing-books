"""不可克隆的内积锁：x = x² 与对角线只交于 0 与 1——要么正交，要么本是同一个态。
The no-cloning inner-product lock: x = x² meets the diagonal only at 0 and 1 — either orthogonal or
the very same state.

The real slice of the lock: with x = ⟨φ, ψ⟩, a cloning isometry forces x · ⟨blank, blank⟩ = x², and
⟨blank, blank⟩ = 1, so x = x². The ink diagonal y = x and the cyan parabola y = x² meet exactly at
the roots of x² − x = 0 (asserted in _ch31); strictly between 0 and 1 the parabola stays below the
diagonal. Over the complex numbers z = z² still has only z = 0 and z = 1.
"""

from _ch31 import lock

SIZE = (430, 330)
ALT = {
    "zh": "一张坐标图，横轴是内积 ⟨φ, ψ⟩。墨色的对角线 y = x 与青色的抛物线 y = x² 只在两点相交："
          "原点（标 φ ⊥ ψ）与 (1, 1)（标 φ = ψ）。两点之间，抛物线始终在对角线下方，横轴下的虚线写着“此处无解”。",
    "en": "A plot whose horizontal axis is the inner product ⟨φ, ψ⟩. The ink diagonal y = x and the cyan parabola "
          "y = x² cross at only two points: the origin, labelled φ ⊥ ψ, and (1, 1), labelled φ = ψ. Between them the "
          "parabola stays below the diagonal; a dashed line under the axis reads ‘no solution here’.",
}


def draw(fig):
    lock(fig, 40, 22, 360, 270)
