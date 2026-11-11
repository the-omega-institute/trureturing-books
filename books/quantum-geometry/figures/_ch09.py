"""Shared drawing for the chapter 9 figures (not a figure itself).

The six rational axes are the ones the chapter lists (a₀ … a₅, each of squared length 5); a colour i is the
pair of open caps of half-angle 45° about ±aᵢ/√5. Axes and the normal they share are violet, the planes two
axes span (bivectors, areas) are magenta, lines and caps that stay inside the list are cyan, and the state that
is being moved is amber.
"""

from tbook import figkit

SIX_AXES = ((1, 2, 0), (1, -2, 0), (0, 1, 2), (0, 1, -2), (2, 0, 1), (-2, 0, 1))
for _a in SIX_AXES:
    assert sum(c * c for c in _a) == 5


def in_color(x, i):
    """Whether the unit vector x lies in colour i: 5 < 2⟨x, aᵢ⟩² (the chapter's definition)."""
    return 5 < 2 * figkit.dot3(x, SIX_AXES[i]) ** 2


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")
