"""Shared drawing for the chapter 21 figures (not a figure itself).

The four-address example of §21.2 (ex-cantor-godel-diagonal-table), the open helix of §21.3 and the
icosahedron of §21.4. Colours follow the book: what stays inside the old readout is cyan, what the
diagonal or the escape dimension pushes out is magenta, the escape axis is violet.
"""

import math

# ---------------------------------------------------------------- the four-address table (§21.2)

# D_a(0), D_a(1) for the four Boolean functions {0,1} → {0,1}, and the latent coordinate the chapter assigns
DECODE = {"a0": (0, 0), "a1": (0, 1), "a2": (1, 0), "a3": (1, 1)}
LATENT = {"a0": 0, "a1": 0, "a2": 0, "a3": 1}


def diagonal():
    """g(a) = twist(D_a(latent(a))) with twist = not."""
    return {a: 1 - DECODE[a][LATENT[a]] for a in DECODE}


def check_table():
    g = diagonal()
    assert g == {"a0": 1, "a1": 1, "a2": 0, "a3": 0}                     # the bold column of the table
    assert sorted(DECODE.values()) == [(0, 0), (0, 1), (1, 0), (1, 1)]   # the catalogue is surjective
    # no row's decoder reproduces g: g is not D_a ∘ latent for any a
    for a, d in DECODE.items():
        assert any(g[x] != d[LATENT[x]] for x in DECODE)
    deficit = [(x, y) for x in DECODE for y in DECODE if LATENT[x] == LATENT[y] and g[x] != g[y]]
    assert ("a1", "a2") in deficit
    joined = {(LATENT[a], g[a]) for a in DECODE}
    assert len({LATENT[a] for a in DECODE}) == 2 and len(joined) == 3    # 2 atoms become 3
    return g


# ---------------------------------------------------------------- the open helix (§21.3)

def helix_point(cx, base, R, ry, lift, t):
    """(cos t, sin t, c t) in an oblique view: the floor circle is an ellipse, height goes straight up."""
    return cx + R * math.cos(t), base - ry * math.sin(t) - lift * t


# ---------------------------------------------------------------- the icosahedron (§21.4)

PHI = (1 + math.sqrt(5)) / 2


def icosahedron():
    """The 12 vertices (unit length) and the 30 edges of the regular icosahedron."""
    raw = []
    for a in (-1, 1):
        for b in (-PHI, PHI):
            raw += [(0, a, b), (a, b, 0), (b, 0, a)]
    norm = math.sqrt(1 + PHI * PHI)
    verts = [tuple(c / norm for c in v) for v in raw]
    dmin = min(math.dist(u, v) for i, u in enumerate(verts) for v in verts[i + 1:])
    edges = [(i, j) for i in range(12) for j in range(i + 1, 12) if abs(math.dist(verts[i], verts[j]) - dmin) < 1e-9]
    faces = [(i, j, k) for i in range(12) for j in range(i + 1, 12) for k in range(j + 1, 12)
             if (i, j) in edges and (j, k) in edges and (i, k) in edges]
    assert len(verts) == 12 and len(edges) == 30 and len(faces) == 20
    assert len(verts) - len(edges) + len(faces) == 2                      # χ(S²) = 2
    return verts, edges


def rot(v, ax, ay):
    """Turn about the vertical axis by ``ay`` and then tip towards the viewer by ``ax`` (radians)."""
    x, y, z = v
    x, y = x * math.cos(ay) - y * math.sin(ay), x * math.sin(ay) + y * math.cos(ay)
    y, z = y * math.cos(ax) - z * math.sin(ax), y * math.sin(ax) + z * math.cos(ax)
    return x, y, z
