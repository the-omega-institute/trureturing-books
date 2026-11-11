"""Shared drawing for the chapter 7 figures (not a figure itself).

The stroboscopic Zeno survival of example ex-zeno-strobe-freezing and the scalar free-energy
deposit of theorem thm-decoherence-freeze-critical, with the numbers the chapter prints.
"""

import math


def free_survival(theta):
    """Probability of still reading |0⟩ after the Bloch angle ``theta`` (radians) when nobody looks."""
    return math.cos(theta / 2) ** 2


def strobe_survival(theta, n, total=math.pi):
    """Probability of |0⟩ at Bloch angle ``theta`` when |0⟩⟨0| is measured ``n`` times, every total/n,
    and every answer so far was “still |0⟩”."""
    step = total / n
    k = min(n, int(theta / step + 1e-12))
    return math.cos(step / 2) ** (2 * k) * math.cos((theta - k * step) / 2) ** 2


def zeno_final(n):
    """P_N = [cos²(π/2N)]^N, the chance of surviving all N measurements over ωT = π."""
    return math.cos(math.pi / (2 * n)) ** (2 * n)


# the chapter's table: N → P_N, rounded to four places
ZENO_TABLE = {1: 0.0, 4: 0.5308, 16: 0.8569, 64: 0.9622}
for _n, _p in ZENO_TABLE.items():
    assert abs(zeno_final(_n) - _p) < 5e-5, (_n, zeno_final(_n))


def freeze_deposit(beta, ds, de):
    """D_freeze(β, ΔS, ΔE_pass) = ΔE_pass − ΔS/β."""
    return de - ds / beta
