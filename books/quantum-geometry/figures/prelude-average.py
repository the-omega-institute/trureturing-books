"""放弃一切方向、把整颗球平均：箭头两两抵消，落回球心。
Give up every direction and average over the whole sphere: the arrows cancel in pairs and the
average falls back to the centre.

Twelve cyan arrows point to the vertices of the regular icosahedron, a set of directions spread evenly
over the sphere; each has an opposite partner, so they add up to zero (asserted). The centre is the
maximally mixed state ρ* = ½I of the chapter's integral over S².
"""

from _ch21 import icosahedron

SIZE = (400, 290)
ALT = {
    "zh": "一个球里，十二支青色的箭头从球心指向正二十面体的十二个顶点，均匀散向四面八方，每一支都有一支指向正对面。"
          "球心有一个点，旁边写着“平均 = 0”和“ρ* = ½I”。",
    "en": "Inside a sphere, twelve cyan arrows run from the centre to the twelve vertices of a regular icosahedron, spread "
          "evenly in all directions, each with a partner pointing the opposite way. The centre has a dot labelled "
          "“average = 0” and “ρ* = ½I”.",
}


def draw(fig):
    verts, _ = icosahedron()
    total = [sum(v[i] for v in verts) for i in range(3)]
    assert all(abs(c) < 1e-12 for c in total) and len(verts) == 12
    assert all(any(all(abs(u[i] + v[i]) < 1e-12 for i in range(3)) for u in verts) for v in verts)   # antipodal pairs
    sp = fig.sphere(150, 146, 118, el=18)
    sp.outline(fill="cyan", fill_opacity=0.03)
    order = sorted(verts, key=lambda v: sp.proj(v)[2])                 # far arrows first
    for v in order:
        far = sp.proj(v)[2] < 0
        sp.arrow(v, "line", 1.6 if far else 2.2, opacity=0.5 if far else None, head=8)
    sp.dot((0, 0, 0), "ink", 6, ring="bg")
    fig.text(286, 132, fig.t("平均 = 0", "average = 0"), size=14, color="ink", weight=600)
    fig.text(286, 156, "*ρ*_{∗} = ½*I*", size=14, color="ink")
    fig.line(282, 138, 160, 146, "dim", 1.1, dash="3 3")
