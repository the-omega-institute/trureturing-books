"""三层依据，三种颜色：Lean 已验证的是绿色，文献结果是紫色，开放问题是红色。
Three tiers of warrant, three colours: Lean-verified is green, literature results violet, open
problems red.

The counts are read from the Chinese chapters: a theorem / lemma / proposition / corollary environment
with lean= (green); a remark or example whose opening line or first line says “文献结果” (violet); a
conjecture or problem environment (red). The note under the green bar counts the declarations of kind
theorem in trureturing.lock.json.
"""

import json
import re

from _coda import ROOT, ZH

SIZE = (480, 230)
ALT = {
    "zh": "三条横条，各配一个标签。最上面一条绿色，标签 LEAN ✓，是带 Lean 引用的定理、引理、命题与推论的条数，最长；"
          "中间一条紫色，标签“文献结果”，是标明文献结果的注记与例的条数；最下面一条红色，标签 OPEN，是开放猜想的条数，很短。"
          "每条横条末端写着条数，绿色一条下面另注锁文件里 theorem 声明的条数。",
    "en": "Three bars, each with a tag. The top bar is green, tagged LEAN ✓: the theorems, lemmas, propositions and corollaries "
          "with a Lean reference, the longest. The middle bar is violet, tagged “literature”: the remarks and examples marked "
          "as literature results. The bottom bar is red, tagged OPEN: the open conjectures, very short. Each bar ends in its "
          "count; under the green bar a note gives the number of theorem declarations in the lock file.",
}


def tally():
    lean = lit = open_ = 0
    for f in sorted(ZH.glob("*.md")):
        if f.name == "SUMMARY.md":
            continue
        lines = f.read_text(encoding="utf-8").splitlines()
        for i, line in enumerate(lines):
            m = re.match(r":::\s*\{\.(\w+)", line)
            if not m:
                continue
            kind = m.group(1)
            if kind in ("theorem", "lemma", "proposition", "corollary") and "lean=" in line:
                lean += 1
            elif kind in ("remark", "example") and ("文献结果" in line or (i + 1 < len(lines) and "文献结果" in lines[i + 1])):
                lit += 1
            elif kind in ("conjecture", "problem"):
                open_ += 1
    return lean, lit, open_


def draw(fig):
    t = fig.t
    lean, lit, open_ = tally()
    decls = json.loads((ROOT / "trureturing.lock.json").read_text(encoding="utf-8"))["declarations"]
    theorems = sum(1 for d in decls.values() if d.get("kind") == "theorem")
    assert lean > lit > open_ > 0 and theorems >= 1
    x0, x1 = 128, 418
    scale = (x1 - x0) / max(lean, lit, open_)
    rows = [(lean, "lean", "LEAN ✓", 40), (lit, "argued", t("文献结果", "literature"), 112), (open_, "open", "OPEN", 184)]
    for n, role, tag, y in rows:
        fig.chip(x0 - 12, y + 6, tag, role, size=13, anchor="end")
        fig.rect(x0, y - 12, max(3.0, n * scale), 24, color=role, fill=role, fill_opacity=0.28, width=1.3)
        fig.text(x0 + n * scale + 8, y, str(n), size=15, color=role, weight=600, middle=True)
    fig.text(x0, 72, t(f"锁文件里共 {theorems} 条 theorem 声明", f"{theorems} theorem declarations in the lock file"),
             size=13, color="dim")
    fig.text(x0, 144, t("注记与例，写明“未在本书形式化”", "remarks and examples, marked not formalized"), size=13, color="dim")
    fig.text(x0, 216, t("猜想，不带 lean=", "conjectures, no lean="), size=13, color="dim")
