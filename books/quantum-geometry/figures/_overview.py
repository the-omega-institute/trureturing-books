"""Common title and centered label placement for three-panel chapter maps."""


def label(panel, y, zh, en, *, size=14, color="ink", weight=400):
    panel.text(panel.width / 2, y, panel.t(zh, en), size=size, color=color, weight=weight, anchor="middle")


def title(panel, zh, en):
    label(panel, 23, zh, en, size=15, weight=700)
