"""侧过半步，亮点就舒展成射线：迎面看是一个点，转过 α，看到的长度是 sin α。
Step half a pace aside and the bright point unfolds into a ray: head-on it is a point, and turned by
α the visible length is sin α.

Each circle is the field of view looking at the same unit ray; α is the angle between the line of sight
and the ray. What the eye sees is the projection of the ray onto the plane across the line of sight,
of length sin α (computed for α = 0°, 20°, 45°, 90°).
"""

import math

SIZE = (480, 200)
ALT = {
    "zh": "四个并排的圆，是从四个角度看同一根单位长的青色射线。第一个圆标着 α = 0°，正中只有一个青色的亮点，看到的长度 0；"
          "后三个圆标着 α = 20°、45°、90°，亮点舒展成一段越来越长的青色线段，长度依次约 0.34、0.71、1。",
    "en": "Four circles side by side: the same cyan ray of unit length seen from four angles. The first is marked α = 0°: only "
          "a cyan bright point in the middle, visible length 0. The next three are marked α = 20°, 45° and 90°: the point "
          "unfolds into a cyan segment that grows longer, about 0.34, 0.71 and 1.",
}


def draw(fig):
    angles = [0, 20, 45, 90]
    r, gap = 46, 116
    x0, y = 66, 92
    for k, a in enumerate(angles):
        cx = x0 + k * gap
        fig.circle(cx, y, r + 6, color="dim", fill="panel", width=1.4)
        length = math.sin(math.radians(a))
        L = 2 * r * length * 0.9                               # the ray, centred in the view
        assert abs(length - [0.0, 0.342, 0.707, 1.0][k]) < 5e-4
        if L > 0:
            fig.line(cx - L / 2, y + L / 4, cx + L / 2, y - L / 4, "line", 3.4, cap="round")
            fig.dot(cx - L / 2, y + L / 4, 5, "line", ring="bg")
        else:
            fig.dot(cx, y, 5.5, "line", ring="bg")
        fig.text(cx, 24, f"*α* = {a}°", size=14, color="ink", anchor="middle")
        fig.text(cx, 172, f"{length:.2f}".rstrip("0").rstrip(".") if a else "0", size=14, color="line",
                 weight=600, anchor="middle")
    fig.text(4, 194, fig.t("看到的长度 sin *α*", "visible length sin *α*"), size=13, color="dim")
