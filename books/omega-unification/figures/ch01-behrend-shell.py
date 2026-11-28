"""Enumerate the Behrend shell and project its chord classes onto a unit sphere."""

from collections import defaultdict
from itertools import combinations
from math import isqrt

from tbook.figkit import unit

SIZE = (356, 447)
ALT = {
    "zh": "模方为 867 的正整数三元组投影到单位球上。琥珀色点为极点 (17,17,17)，其余十八点构成"
          "六个三点循环轨道。青色弧对应三条最短弦，紫色与品红色弧对应平方弦距 724 与 804 的双钟。",
    "en": "The positive integer triples of squared norm 867 are projected onto a unit sphere. "
          "The amber pole (17,17,17) is fixed, and the other 18 points form six cyclic triples. "
          "Cyan arcs follow the three shortest chords. Violet and magenta mark the clock chords "
          "of squared lengths 724 and 804.",
}

NORM_SQUARED = 867


def shell_points():
    # The integer enumeration agrees with ch39-local-shell-return.py at denominator one.
    points = set()
    for x in range(1, isqrt(NORM_SQUARED) + 1):
        for y in range(1, isqrt(NORM_SQUARED - x*x) + 1):
            remainder = NORM_SQUARED - x*x - y*y
            z = isqrt(remainder)
            if z > 0 and z*z == remainder:
                points.add((x, y, z))
    assert len(points) == 19
    return points


def draw(fig):
    t = fig.t
    points = shell_points()
    orbits = defaultdict(set)
    for x, y, z in points:
        representative = min((x, y, z), (y, z, x), (z, x, y))
        orbits[representative].add((x, y, z))
    pole, = (p for p, orbit in orbits.items() if len(orbit) == 1)
    assert pole == (17, 17, 17)
    assert sorted(map(len, orbits.values())) == [1] + [3] * 6

    chords = defaultdict(list)
    for a, b in combinations(sorted(points), 2):
        distance = sum((x - y)**2 for x, y in zip(a, b))
        chords[distance].append((a, b))
    assert min(chords) == 12
    assert [len(chords[d]) for d in (12, 724, 804)] == [3, 6, 6]

    center = fig.width / 2
    fig.text(center, 23, t("贝伦德球壳 · 19 个格点", "Behrend Shell · 19 Lattice Points"),
             size=18, weight=600, anchor="middle")
    fig.text(center, 46, t("x₁² + x₂² + x₃² = 867", "x₁² + x₂² + x₃² = 867"),
             color="dim", anchor="middle")

    sphere = fig.sphere(center, 210, 149, az=138, el=40)
    sphere.outline("edge", shade="cyan", fill=None)
    for normal in ((1, 0, 0), (0, 1, 0), (0, 0, 1)):
        sphere.great_circle(normal, "faint", width=1)
    vectors = {p: unit(p) for p in points}
    for distance, role in ((724, "violet"), (804, "magenta"), (12, "cyan")):
        for a, b in chords[distance]:
            sphere.arc(vectors[a], vectors[b], role, width=2 if distance == 12 else 1.4,
                       opacity=1 if distance == 12 else 0.66)
    for p in sorted(points):
        sphere.dot(vectors[p], "amber" if p == pole else "ink", r=5 if p == pole else 3.4, ring="bg")
    fig.dot(37, 380, 4, "amber")
    fig.text(48, 380, t("极点 (17, 17, 17)", "Pole (17, 17, 17)"),
             middle=True, size=14, color="amber", weight=600)
    fig.text(325, 380, t("6 个循环三点轨道", "6 Cyclic Triples"),
             anchor="end", middle=True, size=14, weight=600)
    for x, role, label in (
        (18, "cyan", t("最短弦 12", "Shortest 12")),
        (134, "violet", t("钟弦 724", "Clock 724")),
        (247, "magenta", t("钟弦 804", "Clock 804")),
    ):
        fig.line(x, 411, x + 15, 411, role, 2.5)
        fig.text(x + 22, 411, label, middle=True, size=13)
    fig.text(center, 435, t("弧线按平方弦距 d² 分类", "Arcs grouped by squared chord distance d²"),
             anchor="middle", size=13, color="dim")
