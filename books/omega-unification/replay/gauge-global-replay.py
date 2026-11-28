"""Recheck scale exclusion using Arb and the fixed-clock model at 91df60d5."""
from pathlib import Path
from runpy import run_path

from flint import acb, arb, ctx

root = Path(__file__).resolve().parent
fixed = run_path(str(root / "ch39-chiral-clock-unit-readout.py"))
two, sm = fixed["two"], fixed["sm"]
pairs = ((0, 1), (0, 2), (1, 2))
indices = (11661, 11934, 12207, 28325, 12336, 12610, 12886, 13291,
           13699, 19872, 22027, 48067, 58214, 95478)

def verify(index, model, initial, read):
    ctx.prec = 192
    rows = read(acb.zeta_zero(index).imag)
    order = fixed["chiral"]["ordered"]
    levels = {q: order([mass for mass, charge in rows if charge == q])
              for q in (0, *model["charges"])}
    assert all(levels[q][2] < 9 < levels[q][3] for q in model["charges"])
    unit = arb("2.435e18") / 724**2
    start = (unit / model["mz"]).log()
    table = [(start + log_m, b, B) for log_m, b, B, _, _
             in two["thresholds"](model, levels, False)]
    even = [*levels[0], *(x for q in (2, 4, 6) for x in levels[q][3:])]
    cutoff = (32 * min(x.lower() for x in even).union(min(x.upper() for x in even)) * unit / model["mz"]).log()
    assert all(x > 0 for x in even) and arb("29.39618") < cutoff < arb("29.39620")
    cutoff = cutoff.upper()
    assert all(row[0] > 0 for row in table)
    lo, hi = arb("28.940"), arb("29.140")
    pi = arb.pi()
    low_v, high_v = 1 / arb(".119"), 1 / arb(".117")
    # Integrate over the conservative upper scale through the final odd segment.
    assert all(row[0] < cutoff or row[0] > cutoff for row in table)
    knots = [row for row in table if row[0] < cutoff]
    # Explicitly split at both faces. Gauss-flow coefficients stay fixed at
    # these extra endpoints, including if a physical threshold is nearby.
    cuts = [(row[0], row[1], row[2]) for row in knots]
    zero_b = [arb(0)] * 3
    zero_B = [zero_b] * 3
    cuts.extend((face, zero_b, zero_B) for face in (lo, hi, cutoff))
    cuts.sort(key=lambda row: float(row[0]))
    assert all(left[0] < right[0] for left, right in zip(cuts, cuts[1:]))
    b, B = sm["BETA"], sm["B"]
    last = arb(0)
    segments = []
    for end, delta_b, delta_B in cuts:
        width = end - last
        assert width > 0
        steps = max(16, int(2048 * float(width.upper()) / 30) + 1)
        segments.append((width, b, B, steps))
        last = end
        b = [x + y for x, y in zip(b, delta_b)]
        B = [[x + y for x, y in zip(row, add)] for row, add in zip(B, delta_B)]
    slot_counts = [0, 0]
    margins = [arb(100), arb(100)]
    targets = [arb(".33"), arb(".42")]
    faces = [None, None]
    initial_state = [*initial[:2], low_v.union(high_v)]
    correction = [arb(0)] * len(pairs)
    schedule = ((b, B, pos, step, steps)
                for pos, (_, b, B, steps) in enumerate(segments)
                for step in range(steps))
    base = [initial_state[i] - initial_state[j] for i, j in pairs]
    cut_lo = next(i for i, row in enumerate(cuts) if row[0] is lo)
    cut_hi = next(i for i, row in enumerate(cuts) if row[0] is hi)

    def observe(t, dt, g, y):
        nonlocal base, correction
        b, B, pos, k, steps = next(schedule)
        one = [-(b[i] - b[j]) / (2 * pi) for i, j in pairs]
        d = [
            -sum((B[i][l] - B[j][l]) * g[l] for l in range(3)) / (8 * pi**2)
            + sum((sm["D"][i][l] - sm["D"][j][l]) * y[l] for l in range(3)) / (32 * pi**3)
            for i, j in pairs
        ]
        progress = arb(k).union(k + 1) * dt
        chunk = dt.union(0)
        gaps = [a + u * progress + c + f * chunk
                for a, u, c, f in zip(base, one, correction, d)]
        if pos <= cut_lo or pos > cut_hi:
            band = int(pos > cut_hi)
            slot_counts[band] += 1
            lower = max(abs(gap).lower() for gap in gaps)
            margins[band] = min(lower, margins[band])
            assert lower > targets[band], (index, t, dt, gaps)
        correction = [c + dt * f for c, f in zip(correction, d)]
        if k + 1 == steps:
            base = [a + u * segments[pos][0] for a, u in zip(base, one)]
            if pos in (cut_lo, cut_hi):
                face = int(pos == cut_hi)
                faces[face] = base[0] + correction[0]

    two["flow"](initial_state, segments, sm["D"], sm["C"], record=observe)
    assert next(schedule, None) is None
    assert faces[0] < -targets[0] and faces[1] > targets[1]
    print(index, len(knots), cutoff.str(10), slot_counts,
          [m.str(10) for m in margins], [g.str(10) for g in faces], flush=True)


if __name__ == "__main__":
    ctx.prec = 192
    model, _, _, initial, _ = fixed["chiral"]["source"]["mean"]["inputs"]()
    ctx.prec = 192
    read = fixed["chiral"]["source"]["spectral_supplier"](model)
    for index in indices:
        verify(index, model, initial, read)
