"""复算熵与几何研究笔记中的数值；依赖 numpy、mpmath，不代替普遍证明。"""

from itertools import combinations, product
import json

import mpmath as mp
import numpy as np


mp.mp.dps = 45
LN2 = mp.log(2)


def binary_entropy(p):
    return -p * mp.log(p) - (1 - p) * mp.log(1 - p) if 0 < p < 1 else mp.mpf(0)


def qubit_q(r):
    if r == 0:
        return LN2 - mp.mpf("0.5")
    if r == 1:
        return mp.mpf(0)
    a, b = (1 + r) / 2, (1 - r) / 2
    return -(a * a * mp.log(a) - b * b * mp.log(b)) / r


def determinant_q(spectrum):
    # 展开正核的分子，避免两个趋于 1 的量相减。
    p = [mp.mpf(x) for x in spectrum if x > 0]
    assert all(x >= 0 for x in spectrum) and abs(sum(p) - 1) < mp.mpf("1e-40")
    d = len(p)
    if d == 1:
        return mp.mpf(0)
    e = {k: sum(mp.fprod(c) for c in combinations(p, k)) for k in range(2, d + 1)}

    def kernel(t):
        numerator = sum(e[k] * t ** (d - k + 1) for k in e)
        return numerator / ((1 + t) * mp.fprod(t + x for x in p))

    return mp.quad(kernel, [0, mp.mpf(".01"), mp.mpf(".1"), 1, 10, mp.inf])


def spectral_q(p):
    d = len(p)
    return -sum(
        p[i] ** d * mp.log(p[i]) / mp.fprod(p[i] - p[j] for j in range(d) if i != j)
        for i in range(d)
    )


def determinant_s(spectrum):
    p = [mp.mpf(x) for x in spectrum if x > 0]
    d = len(p)
    if d == 1:
        return mp.mpf(0)
    e = {k: sum(mp.fprod(c) for c in combinations(p, k)) for k in range(2, d + 1)}
    return mp.quad(lambda t: mp.log1p(
        sum(e[k] * t ** (d - k) for k in e) / (t ** (d - 1) * (1 + t))
    ), [0, mp.mpf(".01"), mp.mpf(".1"), 1, 10, mp.inf])


def entropy_array(probabilities):
    p = np.clip(probabilities, np.finfo(float).tiny, 1)
    return -(p * np.log(p)).sum(axis=-1)


def sample_result(values, target):
    mean = float(np.mean(values))
    se = float(np.std(values, ddof=1) / np.sqrt(len(values)))
    assert abs(mean - float(target)) <= 6 * se + 1e-12
    return {"mean": mean, "target": float(target), "standard_error": se}


def arc_path_report(count):
    # 从 Pauli 投影子直接算闭环、谱与两种 Gram，独立核对球面解析式。
    pauli = np.array([[[0, 1], [1, 0]], [[0, -1j], [1j, 0]], [[1, 0], [0, -1]]])

    def projector(n):
        return (np.eye(2) + np.einsum("i,ijk->jk", n, pauli)) / 2

    errors, cells = [], []
    for epsilon in [.07, .4, 1.1, np.pi / 2]:
        s, c = np.sin(epsilon), np.cos(epsilon)
        directions = np.array([[s, c, 0], [0, 1, 0], [0, c, s]])
        projectors = [projector(n) for n in directions]
        spinors = np.stack([np.linalg.eigh(p)[1][:, -1] for p in projectors], axis=1)
        gram = spinors.conj().T @ spinors
        loop = np.trace(projectors[0] @ projectors[1] @ projectors[2])
        reverse = np.trace(projectors[2] @ projectors[1] @ projectors[0])
        omega = 2 * np.arctan(np.tan(epsilon / 2) ** 2)
        rho = sum(projectors) / 3
        radius = np.diff(np.linalg.eigvalsh(rho))[0]
        expected_radius = np.sqrt((3 + 4 * c + 2 * c * c) / 9)
        errors.extend([
            abs(loop - ((1 + c) ** 2 + 1j * s * s) / 4),
            abs(loop - gram[0, 1] * gram[1, 2] * gram[2, 0]),
            abs(reverse - loop.conjugate()), abs(np.angle(loop) - omega / 2),
            abs(np.linalg.det(directions @ directions.T) - s ** 4),
            abs(np.linalg.det(gram)), abs(radius - expected_radius),
        ])
        cells.append({"epsilon": epsilon, "Omega": omega, "Berry_phase": -np.angle(loop),
                      "Q_equal_mixture": float(qubit_q(mp.mpf(str(radius))))})

    limits = []
    for raw in [".1", ".01", ".001", ".0001"]:
        epsilon = mp.mpf(raw)
        c = mp.cos(epsilon)
        radius = mp.sqrt((3 + 4 * c + 2 * c * c) / 9)
        omega = 2 * mp.atan(mp.tan(epsilon / 2) ** 2)
        limits.append({"epsilon": float(epsilon),
                       "Q_over_epsilon_squared": float(qubit_q(radius) / epsilon ** 2),
                       "Omega_over_epsilon_squared": float(omega / epsilon ** 2)})
    assert abs(limits[-1]["Q_over_epsilon_squared"] - 1 / 9) < 1e-8

    fringes = []
    for visibility in [0., .4, 1.]:
        for phase in [0., np.pi / 3, np.pi]:
            rho = np.array([[1, visibility * np.exp(-1j * phase)],
                            [visibility * np.exp(1j * phase), 1]]) / 2
            target_spectrum = np.array([1 - visibility, 1 + visibility]) / 2
            errors.append(float(np.max(abs(np.linalg.eigvalsh(rho) - target_spectrum))))
            plus = np.array([1, 1]) / np.sqrt(2)
            errors.append(abs(np.vdot(plus, rho @ plus) - (1 + visibility * np.cos(phase)) / 2))
        fringes.append({"visibility": visibility, "Q": float(qubit_q(mp.mpf(str(visibility)))),
                        "P_plus_range": [(1 - visibility) / 2, (1 + visibility) / 2]})

    rng = np.random.default_rng(20261117)
    v = rng.normal(size=(3, 5)) + 1j * rng.normal(size=(3, 5))
    v /= np.linalg.norm(v)
    rho, gram = v @ v.conj().T, v.conj().T @ v
    for k in [2, 3, 4]:
        cycles = sum(np.prod([gram[indices[j], indices[(j + 1) % k]] for j in range(k)])
                     for indices in product(range(5), repeat=k))
        errors.append(abs(cycles - np.trace(np.linalg.matrix_power(rho, k))))
    assert max(errors) < 1e-12

    z = (rng.normal(size=(count, 3)) + 1j * rng.normal(size=(count, 3))) / np.sqrt(2)
    energy = np.einsum("bi,ij,bj->b", z.conj(), rho, z).real
    gaussian = {str(t): sample_result(np.exp(-energy / t),
                                     np.linalg.det(np.eye(3) + rho / t).real ** -1)
                for t in [.2, 1., 3.]}

    theta = 1.1
    expected_phase = -np.pi * (1 - np.cos(theta))
    refinements = []
    for steps in [32, 128, 512, 2048]:
        phi = 2 * np.pi * np.arange(steps) / steps
        spinors = np.stack([np.full(steps, np.cos(theta / 2)),
                            np.sin(theta / 2) * np.exp(1j * phi)], axis=1)
        overlaps = (spinors.conj() * np.roll(spinors, -1, axis=0)).sum(axis=1)
        beta = 2 * np.arccos(np.clip(abs(overlaps), 0, 1))
        phase = -np.angle(np.prod(overlaps))
        refinements.append({"steps": steps, "sum_squared_Bloch_steps": float(sum(beta ** 2)),
                            "Berry_phase": float(phase), "phase_error": abs(phase - expected_phase)})
    assert refinements[-1]["phase_error"] < 2e-6
    assert refinements[-1]["sum_squared_Bloch_steps"] < refinements[0]["sum_squared_Bloch_steps"] / 60
    return {"seed": 20261117, "max_algebra_error": float(max(errors)), "cells": cells, "small_arc_limits": limits,
            "interferometer": fringes, "Gaussian_determinant": gaussian,
            "smooth_loop_expected_Berry_phase": expected_phase, "smooth_loop_refinements": refinements}


def main():
    radii = list(map(mp.mpf, ["0", ".0001", ".1", ".6", ".7390851332151607", ".99", ".999999", "1"]))
    integral_errors = []
    for r in radii:
        q = qubit_q(r)
        sphere_q = mp.quad(lambda u: binary_entropy((1 + r * u) / 2), [-1, 0, 1]) / 2 - mp.mpf(".5")
        delta = (1 - r * r) / 4
        integral_errors.extend([abs(q - sphere_q), abs(q - determinant_q([(1 + r) / 2, (1 - r) / 2]))])
        assert 4 * (LN2 - mp.mpf(".5")) * delta - mp.mpf("1e-40") <= q <= delta + mp.mpf("1e-40")

    spectral_errors, entropy_profile_errors = [], []
    for raw in [[".55", ".30", ".15"], [".4", ".3", ".2", ".1"], [".98", ".019", ".001"]]:
        p = list(map(mp.mpf, raw))
        spectral_errors.append(abs(determinant_q(p) - spectral_q(p)))
        entropy_profile_errors.append(abs(determinant_s(p) + sum(x * mp.log(x) for x in p)))
    assert max(integral_errors + spectral_errors + entropy_profile_errors) < mp.mpf("1e-39")

    rng = np.random.default_rng(20261116)
    v = rng.normal(size=(3, 5)) + 1j * rng.normal(size=(3, 5))
    v /= np.linalg.norm(v)
    rho, gram = v @ v.conj().T, v.conj().T @ v
    gram_errors = [abs(np.linalg.det(np.eye(3) + rho / t) / np.linalg.det(np.eye(5) + gram / t) - 1)
                   for t in [.03, .2, 1, 5, 30]]
    eigenvalues = np.linalg.eigvalsh(rho)
    for k in [1, 2, 3]:
        minors = sum(np.linalg.det(gram[np.ix_(idx, idx)]) for idx in combinations(range(5), k))
        elementary = sum(np.prod(c) for c in combinations(eigenvalues, k))
        gram_errors.append(abs(minors - elementary))
    assert max(gram_errors) < 1e-12

    count = 50000
    z = rng.normal(size=(count, 4, 4)) + 1j * rng.normal(size=(count, 4, 4))
    bases, triangular = np.linalg.qr(z)
    diagonal = np.diagonal(triangular, axis1=1, axis2=2)
    bases *= (diagonal / np.abs(diagonal))[:, None, :]
    bell = np.array([1, 0, 0, 1]) / np.sqrt(2)
    bell_global = entropy_array(abs(np.einsum("bji,j->bi", bases.conj(), bell)) ** 2)
    spectrum = np.array([.4, .3, .2, .1])
    mixture_p = np.einsum("bji,j,bji->bi", bases.conj(), spectrum, bases).real
    mixture_h = entropy_array(mixture_p)
    conditional_h = (entropy_array(abs(bases) ** 2) * spectrum).sum(axis=1)
    c4 = mp.mpf(13) / 12
    q4 = determinant_q(list(map(mp.mpf, [".4", ".3", ".2", ".1"])))

    a, b = rng.normal(size=(2, count, 3))
    a /= np.linalg.norm(a, axis=1)[:, None]
    b /= np.linalg.norm(b, axis=1)[:, None]
    local_cases = {}
    for theta in [0., .7, np.pi / 2]:
        r = np.cos(theta)
        correlation = np.einsum("bi,i,bi->b", a, [np.sin(theta), -np.sin(theta), 1], b)
        probabilities = np.stack([(1 + s * r * a[:, 2] + t * r * b[:, 2] + s * t * correlation) / 4
                                  for s, t in [(1, 1), (1, -1), (-1, 1), (-1, -1)]], axis=1)
        local_cases[str(theta)] = sample_result(entropy_array(probabilities), 1 + qubit_q(mp.mpf(str(r))))

    rstar = mp.findroot(lambda x: mp.cos(x) - x, mp.mpf(".74"))
    table = []
    for r in [mp.mpf(1), rstar, mp.mpf(".6"), mp.mpf(0)]:
        s, q = binary_entropy((1 + r) / 2), qubit_q(r)
        table.append({k: float(x) for k, x in {
            "r": r, "tau": 1 - r * r, "S": s, "Q": q,
            "mean_H": q + mp.mpf(".5"), "mean_pinching_gain": q + mp.mpf(".5") - s,
            "S_bits": s / LN2, "Q_bits": q / LN2,
        }.items()})

    q_plus = determinant_q([mp.mpf(2) / 3, mp.mpf(1) / 6, mp.mpf(1) / 6])
    q_minus = determinant_q([mp.mpf(1) / 2, mp.mpf(1) / 2, mp.mpf(0)])
    assert q_plus > q_minus
    ssa_defect = 2 * (LN2 - mp.mpf(".5")) - (mp.log(4) - mp.mpf(13) / 12)
    assert abs(ssa_defect - mp.mpf(1) / 12) < mp.mpf("1e-40")
    print(json.dumps({
        "seed": 20261116, "samples_per_case": count, "decimal_precision": mp.mp.dps,
        "qubit_max_integral_error": float(max(integral_errors)),
        "distinct_spectrum_max_error": float(max(spectral_errors)),
        "entropy_volume_profile_max_error": float(max(entropy_profile_errors)),
        "gram_max_error": float(max(gram_errors)),
        "bell_global_haar": sample_result(bell_global, c4),
        "mixed_global_haar": sample_result(mixture_h, c4 + q4),
        "pure_ensemble_mean_information": sample_result(mixture_h - conditional_h, q4),
        "pure_bipartite_local_haar": local_cases,
        "same_purity_three_state_Q": [float(q_plus), float(q_minus)],
        "ssa_defect": float(ssa_defect), "qubit_table": table,
        "arc_path_integral_checks": arc_path_report(count),
    }, indent=2))


if __name__ == "__main__":
    main()
