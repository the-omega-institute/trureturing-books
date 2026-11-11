"""第十七章地图：圆与双曲线、推动下不动的光锥、折线世界线的固有时。
Chapter 17 at a glance: the circle and the hyperbola, the light cone a boost leaves in place, and the
proper time of a bent worldline.

Panel I takes the event (t, x) = (5, 3) of the worked example: a rotation moves it along the circle
t² + x² = 34, a boost along the hyperbola t² − x² = 16. Panel II draws the frame of the traveller with
β = 3/5 (η = ln 2): its time axis points along (t, x) = (5, 3), its space axis along (3, 5), both closing in on
the light cone like scissors. Panel III is the twin example: O → A = (5, 3) → P = (10, 0) carries
4 + 4 proper-time ticks, the rest worldline O → P carries 10 (all asserted).
"""

import math

from _ch17 import Spacetime, q, ticks

SIZE = (740, 276)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：同一个事件 (t, x) = (5, 3) 落在两条曲线上，品红的圆 t² + x² = 34 是转动走的路，会穿出光锥；青色的双曲线 t² − x² = 16 是推动走的路，贴着光锥却跨不过去。"
          "第二栏：两条白色光锥线交成一个 X，灰色的是原来的 t 轴与 x 轴，琥珀色的是以 β = 3/5 运动的参考系的两根轴，一根指向 (t, x) = (5, 3)，一根指向 (3, 5)，像剪刀一样向光锥合拢，光锥本身不动。"
          "第三栏：从 O 到 P = (10, 0) 的两条世界线，白色粗线是原地静止，刻着 10 个单位固有时；青色折线经折返点 A = (5, 3)，每段刻着 4 个，共 8 个。",
    "en": "Three panels. Panel I: one event (t, x) = (5, 3) lies on two curves: the magenta circle t² + x² = 34 is the path of a rotation "
          "and leaves the light cone; the cyan hyperbola t² − x² = 16 is the path of a boost and hugs the cone without crossing "
          "it. Panel II: the two white light lines cross in an X; grey are the original t and x axes, amber are the two axes of "
          "the frame moving at β = 3/5, one along (t, x) = (5, 3) and one along (3, 5), closing on the cone like scissors while the cone "
          "itself stays put. Panel III: two worldlines from O to P = (10, 0): the thick white one stays at rest and carries 10 "
          "ticks of proper time; the cyan bent one turns at A = (5, 3) and carries 4 ticks per leg, 8 in all.",
}


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 276, gap=16)

    # ---- I: the circle and the hyperbola through the same event
    title(one, "I　圆与双曲线", "I  circle and hyperbola")
    st = Spacetime(one, 118, 158, 16.5)
    ev = (3, 5)                                   # canvas order (x, t); the chapter writes (t, x) = (5, 3)
    R2 = ev[0] ** 2 + ev[1] ** 2
    assert R2 == 34 and q(*ev) == 16
    st.axes(-6.6, 6.6, -6.2, 6.6)
    st.cone(6.0, color="ink", width=1.3, dash="5 4")
    one.circle(st.ox, st.oy, st.s * math.sqrt(R2), color="area", width=2.2)
    xm = math.sqrt(6.4 ** 2 - 16)
    st.hyperbola(4, -xm, xm, "line", 2.6)
    st.dot(*ev, 4.6, "now", ring="bg")
    p = st.P(-3.6, -4.6)
    one.text(p[0] - 4, p[1] + 2, one.t("转动", "rotation"), size=13, color="area", anchor="end", halo=True)
    p = st.P(0, 4)
    one.text(p[0] - 6, p[1] + 17, one.t("推动", "boost"), size=13, color="line", anchor="end", halo=True)

    # ---- II: the boosted frame closes on the light cone; the cone stays
    title(two, "II　光锥不动", "II  the cone stays")
    st = Spacetime(two, 96, 222, 27)
    eta = math.log(2)
    ch, sh = math.cosh(eta), math.sinh(eta)
    assert abs(ch - 5 / 4) < 1e-12 and abs(sh - 3 / 4) < 1e-12 and abs(sh / ch - 3 / 5) < 1e-12
    st.line((0, 0), (-3.4, 3.4), "ink", 2.0)
    st.line((0, 0), (4.8, 4.8), "ink", 2.0)
    st.line((-3.2, 0), (4.6, 0), "dim", 1.3)
    st.line((0, 0), (0, 6.0), "dim", 1.3)
    # the moving frame in canvas order (x, t): time axis along (sinh, cosh), space axis along (cosh, sinh)
    L = 5.2
    st.arrow((0, 0), (L * sh / math.hypot(ch, sh), L * ch / math.hypot(ch, sh)), "now", 2.4)
    st.arrow((0, 0), (L * ch / math.hypot(ch, sh), L * sh / math.hypot(ch, sh)), "now", 2.4)
    p = st.P(L * sh / math.hypot(ch, sh), L * ch / math.hypot(ch, sh))
    two.text(p[0] + 4, p[1] - 4, "*t*′", size=15, color="now")
    p = st.P(L * ch / math.hypot(ch, sh), L * sh / math.hypot(ch, sh))
    two.text(p[0] - 2, p[1] - 10, "*x*′", size=15, color="now")
    p = st.P(0, 6.0)
    two.text(p[0] - 8, p[1] + 10, "*t*", size=14, color="dim", anchor="end")
    p = st.P(4.6, 0)
    two.text(p[0], p[1] + 18, "*x*", size=14, color="dim", anchor="end")
    two.angle(st.ox, st.oy, 46, 90 - math.degrees(math.atan2(sh, ch)), 90, "", color="now", width=1.3)
    two.angle(st.ox, st.oy, 62, 0, math.degrees(math.atan2(sh, ch)), "", color="now", width=1.3)
    p = st.P(-2.2, 0.9)
    two.text(p[0], p[1], two.t("光锥", "light cone"), size=13, color="ink", anchor="middle", halo=True)

    # ---- III: proper time along two worldlines with the same ends
    title(three, "III　折线走得少", "III  the bend costs time")
    st = Spacetime(three, 82, 252, 20)
    O, A, P = (0, 0), (3, 5), (0, 10)             # canvas order (x, t)
    t1 = math.sqrt(q(A[0] - O[0], A[1] - O[1]))
    t2 = math.sqrt(q(P[0] - A[0], P[1] - A[1]))
    t0 = math.sqrt(q(P[0] - O[0], P[1] - O[1]))
    assert t1 == 4 and t2 == 4 and t0 == 10 and t0 > t1 + t2
    st.line(O, P, "ink", 3.2, cap="round")
    ticks(st, O, P, 10, "ink", 6)
    st.line(O, A, "line", 2.4, cap="round")
    st.line(A, P, "line", 2.4, cap="round")
    ticks(st, O, A, 4, "line", 6)
    ticks(st, A, P, 4, "line", 6)
    for (x, t), name, dx in ((O, "*O*", -12), (A, "*A*", 12), (P, "*P*", -12)):
        st.dot(x, t, 3.8, "ink" if name != "*A*" else "line", ring="bg")
        p = st.P(x, t)
        three.text(p[0] + dx, p[1] + 5, name, size=14, color="dim", anchor="end" if dx < 0 else "start")
    p = st.P(0, 5)
    three.text(p[0] - 14, p[1] + 5, "10", size=16, color="ink", weight=600, anchor="end")
    p = st.P(3, 5)
    three.text(p[0] + 30, p[1] + 5, "4 + 4", size=16, color="line", weight=600)
