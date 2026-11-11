"""光锥把平面分成两类：锥内 t² − x² > 0，锥外 t² − x² < 0，锥面上恰为 0。
The light cone splits the plane: inside it t² − x² > 0, outside it t² − x² < 0, on it exactly 0.

Three displacements from the origin are read with minkowski₁(t, x) = t² − x² (d = 1); labels follow the
chapter's order (t, x): (2, 1) gives 3, (1, 2) gives −3, and (1.5, 1.5) gives 0 (asserted).
"""

from _ch17 import Spacetime, q

SIZE = (440, 330)
ALT = {
    "zh": "时空图，x 向右、t 向上，两条白色的光锥线 t = ±x 交于原点，把平面分成四块。上下两块（锥内）是淡青色，t² − x² > 0；"
          "左右两块（锥外）是淡品红，t² − x² < 0；光锥线上 t² − x² = 0。从原点出发的三支箭头，坐标按 (t, x) 写：青色的指向 (2, 1)，读数 3；"
          "品红的指向 (1, 2)，读数 −3；白色的沿光锥指向 (1.5, 1.5)，读数 0。",
    "en": "A spacetime diagram with x to the right and t up; the two white light lines t = ±x cross at the origin and cut the "
          "plane into four wedges. The upper and lower wedges (inside the cone) are pale cyan, t² − x² > 0; the left and right "
          "wedges (outside) are pale magenta, t² − x² < 0; on the light lines t² − x² = 0. Three arrows leave the origin, written as (t, x): the "
          "cyan one to (2, 1) reads 3, the magenta one to (1, 2) reads −3, the white one along the cone to (1.5, 1.5) reads 0.",
}


def draw(fig):
    t = fig.t
    st = Spacetime(fig, 220, 168, 62)
    R = 2.35
    a, b = (1, 2), (2, 1)
    c = (1.5, 1.5)
    assert q(*a) == 3 and q(*b) == -3 and q(*c) == 0

    X = 3.0
    for sgn in (1, -1):                       # inside the cone (above and below) and outside it (left and right)
        fig.polygon([st.P(0, 0), st.P(-R, sgn * R), st.P(R, sgn * R)], "line", fill_opacity=0.12)
        fig.polygon([st.P(0, 0), st.P(sgn * R, R), st.P(sgn * X, R), st.P(sgn * X, -R), st.P(sgn * R, -R)], "area",
                    fill_opacity=0.10)
    st.axes(-3.25, 3.25, -2.45, 2.55)
    st.cone(R, color="ink", width=2.0)

    st.arrow((0, 0), a, "line", 2.6)
    st.arrow((0, 0), b, "area", 2.6)
    st.arrow((0, 0), c, "ink", 2.6)
    p = st.P(*a)
    fig.text(p[0] - 19, p[1] - 2, "(2, 1)", size=13, color="line", anchor="end", halo=True)
    fig.text(p[0] - 19, p[1] + 16, "*q* = 3", size=14, color="line", anchor="end", weight=600, halo=True)
    p = st.P(*b)
    fig.text(p[0] + 8, p[1] + 6, "(1, 2)", size=13, color="area")
    fig.text(p[0] + 8, p[1] + 24, "*q* = −3", size=14, color="area", weight=600)
    p = st.P(*c)
    fig.text(p[0] + 10, p[1] + 2, "*q* = 0", size=14, color="ink", weight=600)

    p = st.P(0, -1.75)
    fig.text(p[0] + 12, p[1], t("锥内  *q* > 0", "inside  *q* > 0"), size=14, color="line", halo=True)
    p = st.P(-2.55, -0.55)
    fig.text(p[0], p[1], t("锥外  *q* < 0", "outside  *q* < 0"), size=14, color="area", halo=True)
    p = st.P(-R, R)
    fig.text(p[0] + 4, p[1] - 8, t("光锥  *q* = 0", "light cone  *q* = 0"), size=13, color="dim")
