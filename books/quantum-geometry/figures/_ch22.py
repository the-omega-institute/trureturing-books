"""Shared arithmetic for the chapter 22 figures (not a figure itself).

Primes, finite Euler products, and ζ(s) for complex s by Euler–Maclaurin summation, which is accurate to
far better than drawing precision for |Im s| ≤ 60 with the parameters below.
"""

import math
from fractions import Fraction

# B_2, B_4, …, B_20
BERNOULLI = [Fraction(1, 6), Fraction(-1, 30), Fraction(1, 42), Fraction(-1, 30), Fraction(5, 66),
             Fraction(-691, 2730), Fraction(7, 6), Fraction(-3617, 510), Fraction(43867, 798), Fraction(-174611, 330)]

# imaginary parts of the first ten nontrivial zeros (literature values, used only as marks to check against)
ZEROS = [14.134725, 21.022040, 25.010858, 30.424876, 32.935062, 37.586178, 40.918719, 43.327073, 48.005151, 49.773832]


def primes(upto):
    sieve = [True] * (upto + 1)
    sieve[0:2] = [False, False]
    for i in range(2, int(upto ** 0.5) + 1):
        if sieve[i]:
            sieve[i * i::i] = [False] * len(sieve[i * i::i])
    return [i for i, b in enumerate(sieve) if b]


def euler_product(ps, s):
    out = 1.0
    for p in ps:
        out /= 1 - p ** (-s)
    return out


def zeta(s, N=40, terms=10):
    """ζ(s), s ≠ 1, by Euler–Maclaurin with N direct terms and ``terms`` Bernoulli corrections."""
    s = complex(s)
    total = sum(n ** (-s) for n in range(1, N))
    total += N ** (1 - s) / (s - 1) + 0.5 * N ** (-s)
    rising = s                                             # s (s + 1) … (s + 2k − 2)
    for k in range(1, terms + 1):
        total += float(BERNOULLI[k - 1]) / math.factorial(2 * k) * rising * N ** (-s - 2 * k + 1)
        rising *= (s + 2 * k - 1) * (s + 2 * k)
    return total


def check_zeta():
    assert abs(zeta(2) - math.pi ** 2 / 6) < 1e-12
    for t in ZEROS:
        assert abs(zeta(0.5 + 1j * t)) < 1e-5, t
    assert abs(zeta(0.5) + 1.4603545088) < 1e-8


def smooth(n, ps):
    """Does n factor over the primes ``ps`` alone?"""
    for p in ps:
        while n % p == 0:
            n //= p
    return n == 1


def mod_phase(x):
    """x mod 1 in [0, 1)."""
    return x - math.floor(x)

