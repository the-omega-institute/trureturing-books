"""High-precision cosine and sine for the chapter 24 figures that check 20-digit numbers (not a figure).

Decimal Taylor series at 60 significant digits; θ* is found by Newton's method to that precision.
"""

from decimal import Decimal, getcontext

getcontext().prec = 60


def dcos(x):
    x = Decimal(x)
    term, total, k = Decimal(1), Decimal(1), 0
    while True:
        k += 2
        term = -term * x * x / (k * (k - 1))
        if abs(term) < Decimal(10) ** -58:
            return total + term
        total += term


def dsin(x):
    x = Decimal(x)
    term, total, k = x, x, 1
    while True:
        k += 2
        term = -term * x * x / (k * (k - 1))
        if abs(term) < Decimal(10) ** -58:
            return total + term
        total += term


def _theta():
    t = Decimal("0.739")
    for _ in range(12):
        t = t - (t - dcos(t)) / (1 + dsin(t))
    return t


THETA_HP = _theta()
assert abs(dcos(THETA_HP) - THETA_HP) < Decimal(10) ** -55
assert str(THETA_HP).startswith("0.7390851332151606416553120876738734040134")
