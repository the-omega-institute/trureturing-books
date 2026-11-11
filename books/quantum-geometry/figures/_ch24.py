"""Shared drawing for the chapter 24 figures (not a figure itself).

The recurring picture is the cobweb: a curve y = f(x) (cyan, the reading), the diagonal y = x (grey)
and the staircase of an iteration (ink). Constants are computed here and checked against the
chapter's numbers.
"""

import math

PHI = (1 + math.sqrt(5)) / 2


def dottie(x=1.0):
    for _ in range(300):
        x = math.cos(x)
    return x


THETA = dottie()
LAM = math.sin(THETA)
assert abs(THETA - 0.73908513321516) < 1e-13 and abs(math.cos(THETA) - THETA) < 1e-15
assert abs(LAM - 0.6736120292) < 1e-9 and abs(THETA ** 2 + LAM ** 2 - 1) < 1e-12


def orbit(f, x0, n):
    xs = [x0]
    for _ in range(n):
        xs.append(f(xs[-1]))
    return xs


def cobweb(ax, f, x0, n, *, color="ink", width=1.4, start_on_axis=True):
    """The staircase (x_k, x_k) → (x_k, x_{k+1}) → (x_{k+1}, x_{k+1}) on the axes ``ax``."""
    xs = orbit(f, x0, n)
    pts = [(xs[0], ax.yr[0] if start_on_axis else xs[0])]
    for a, b in zip(xs, xs[1:]):
        pts += [(a, b), (b, b)]
    ax.path(pts, color, width)
    return xs


def set_capsule(cv, x, y, members, *, kept=None, r=16, gap=6, label=None, outline="edge", size=13):
    """A rounded box with the elements 0, 1, 2 drawn as small numbered slots; those in ``members``
    are cyan dots, the others are empty (crossed when ``kept`` names them as just removed).
    Returns the box width. ``(x, y)`` is the left end of the box's centre line."""
    w = 3 * (2 * r) + 2 * gap + 12
    cv.rect(x, y - r - 6, w, 2 * r + 12, color=outline, fill="panel", rx=r + 6, width=1.4)
    for i in range(3):
        cx = x + 6 + r + i * (2 * r + gap)
        if i in members:
            cv.circle(cx, y, r - 3, color="line", fill="line", fill_opacity=0.18, width=1.6)
            cv.text(cx, y, str(i), size=size, color="line", anchor="middle", middle=True, weight=600)
        else:
            cv.circle(cx, y, r - 3, color="faint", width=1.0, dash="2 3")
    if label:
        cv.text(x + w / 2, y - r - 14, label, size=size, color="dim", anchor="middle")
    return w
