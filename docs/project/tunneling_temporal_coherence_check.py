"""复算隧穿、时间双缝与历史约化态的关系；有限计算不代替普遍证明。"""

import json

import mpmath as mp
import numpy as np

from subentropy_geometry_check import qubit_q


def rectangular_scattering(energy, length):
    # 无量纲单位 hbar = 2m = V0 = 1；直接解四个边界匹配条件。
    k, kap = np.sqrt(energy), np.sqrt(1 - energy)
    up, down, out = np.exp(kap * length), np.exp(-kap * length), np.exp(1j * k * length)
    matrix = np.array([
        [1, -1, -1, 0],
        [-1j * k, -kap, kap, 0],
        [0, up, down, -out],
        [0, kap * up, -kap * down, -1j * k * out],
    ], dtype=complex)
    r, a, b, t = np.linalg.solve(matrix, [-1, -1j * k, 0, 0])
    return r, a, b, t


def main():
    errors, scattering = [], []
    flux_form = np.array([[0, -1j], [1j, 0]])
    for energy in [.15, .4, .85]:
        for length in [.3, 1., 3., 6.]:
            r, a, b, t = rectangular_scattering(energy, length)
            k, kap = np.sqrt(energy), np.sqrt(1 - energy)
            exact = 1 / (1 + np.sinh(kap * length) ** 2 / (4 * energy * (1 - energy)))
            errors.extend([abs(abs(t) ** 2 - exact), abs(abs(r) ** 2 + abs(t) ** 2 - 1)])
            for x in [.1 * length, .5 * length, .9 * length]:
                psi = a * np.exp(kap * x) + b * np.exp(-kap * x)
                derivative = kap * (a * np.exp(kap * x) - b * np.exp(-kap * x))
                errors.append(abs(np.imag(psi.conjugate() * derivative) / k - exact))
            generator = np.array([[0, 1], [kap ** 2, 0]])
            transfer = np.cosh(kap * length) * np.eye(2) + np.sinh(kap * length) / kap * generator
            errors.append(float(np.max(abs(transfer.conj().T @ flux_form @ transfer - flux_form))))
            if length == 3:
                scattering.append({"E_over_V0": energy, "L": length, "T": float(abs(t) ** 2),
                                   "R": float(abs(r) ** 2)})
    assert max(errors) < 1e-10

    history_errors, histories = [], []
    transmission = abs(rectangular_scattering(.4, 3.)[-1]) ** 2
    transmission_after_marking = []
    for p in [.2, .5, .8]:
        for overlap in [0., .3, .8, 1.]:
            phase = .7
            e0, e1 = np.array([1., 0.]), np.array([overlap, np.sqrt(1 - overlap ** 2)])
            state = np.array([np.sqrt(p) * e0, np.sqrt(1 - p) * np.exp(1j * phase) * e1])
            rho = state @ state.conj().T
            radius = np.sqrt((2 * p - 1) ** 2 + 4 * p * (1 - p) * overlap ** 2)
            spectrum = np.array([1 - radius, 1 + radius]) / 2
            history_errors.extend([
                float(np.max(abs(np.linalg.eigvalsh(rho) - spectrum))),
                abs(np.linalg.det(rho) - p * (1 - p) * (1 - overlap ** 2)),
            ])
            radius = mp.mpf(str(min(1., float(radius))))
            visibility = 2 * np.sqrt(p * (1 - p)) * overlap
            histories.append({"p": p, "marker_overlap": overlap, "visibility": float(visibility),
                              "Q_history": float(qubit_q(radius))})
            # 出射后的可逆标记保留总透射扇区的范数，允许干涉可见度降为零。
            outgoing = np.stack([np.sqrt(transmission) * state,
                                 np.sqrt(1 - transmission) * state])
            marked_transmission = float(np.vdot(outgoing[0], outgoing[0]).real)
            history_errors.append(abs(marked_transmission - transmission))
            if p == .5:
                transmission_after_marking.append({"marker_overlap": overlap,
                                                  "T": marked_transmission})
    assert max(history_errors) < 1e-12

    # 两个时间支撑完全分离的模式，在频率读出中仍有交叉项。
    count, dt, shift, phase = 65536, .01, 500, .4
    time = (np.arange(count) - count // 2) * dt
    pulse = np.zeros(count)
    inside = abs(time) < 1
    pulse[inside] = np.cos(np.pi * time[inside] / 2) ** 2
    pulse /= np.linalg.norm(pulse)
    early, late = np.roll(pulse, -shift), np.roll(pulse, shift)
    assert abs(np.vdot(early, late)) == 0
    omega = 2 * np.pi * np.fft.fftfreq(count, dt)
    base_spectrum = abs(np.fft.fft(pulse, norm="ortho")) ** 2
    coherent = abs(np.fft.fft((early + np.exp(1j * phase) * late) / np.sqrt(2), norm="ortho")) ** 2
    predicted = base_spectrum * (1 + np.cos(omega * (2 * shift * dt) - phase))
    incoherent = (abs(np.fft.fft(early, norm="ortho")) ** 2
                  + abs(np.fft.fft(late, norm="ortho")) ** 2) / 2
    fourier_error = float(max(np.max(abs(coherent - predicted)),
                              np.max(abs(incoherent - base_spectrum))))
    assert fourier_error < 1e-12
    assert abs(sum(coherent) - 1) < 1e-12

    # 正算符的条件弱值可以为负；同时核对相应振幅的谱相位导数。
    initial = np.array([1., 1.]) / np.sqrt(2)
    final = np.array([1., -.75]) / 1.25
    dwell = np.diag([1., 2.])
    weak_value = np.vdot(final, dwell @ initial) / np.vdot(final, initial)
    h = 1e-6

    def amplitude(energy):
        return np.exp(1j * energy) - .75 * np.exp(2j * energy)

    phase_derivative = (np.angle(amplitude(h)) - np.angle(amplitude(-h))) / (2 * h)
    assert abs(weak_value + 2) < 1e-12 and abs(phase_derivative - weak_value) < 1e-9
    print(json.dumps({
        "units": "hbar = 2m = V0 = 1",
        "barrier_max_error": float(max(errors)), "barrier_samples": scattering,
        "history_max_error": float(max(history_errors)), "history_samples": histories,
        "transmission_after_which_time_marking": transmission_after_marking,
        "disjoint_time_modes": {
            "inner_product": float(np.vdot(early, late)), "separation": 2 * shift * dt,
            "angular_frequency_fringe_period": 2 * np.pi / (2 * shift * dt),
            "Fourier_max_error": fourier_error,
        },
        "positive_dwell_operator_example": {
            "eigenvalues": [1, 2], "ordinary_mean": float(np.vdot(initial, dwell @ initial)),
            "postselection_probability": float(abs(np.vdot(final, initial)) ** 2),
            "weak_value": float(weak_value), "spectral_phase_derivative": float(phase_derivative),
        },
    }, indent=2))


if __name__ == "__main__":
    main()
