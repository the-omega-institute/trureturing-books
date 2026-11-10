---
name: local-viz-cards
description: 修改或新增《量子计算的几何直觉》的交互可视化、在章节里引用实验卡时使用：本书四个页面的颜色用语、每张实验卡讲什么、哪一章引用了哪张卡，以及增删卡片后必须同步的地方。方法本身见模板技能 book-viz。
---

# 本书的可视化卡片与引用

制作方法、版式与质量门以模板技能 `skills/book-viz/SKILL.md` 为准，本文件只记录本书自己的约定。执行载体见 `PROJECT.md` 第 6 节。

## 颜色与用语（全书一致）

| 颜色 | 只表示 | 正文与图注里的说法 |
| --- | --- | --- |
| 青色 | 内积、共线的部分、清单里的东西、正的差 | “青色的线”“影子” |
| 品红 | 外积、垂直撑开的部分、逃出清单的东西、负的差 | “品红的面积”“缝” |
| 琥珀 | 当前的态、当前这一步、读头 | “琥珀色的箭头” |
| 紫色 | 转轴、体积、旋子 | “紫色的体积” |
| 绿色 | 只给 Lean 已验证的陈述 | 不用来画别的 |

图注用与页面图例相同的词：页面写“线”“面积”，图注就不写“投影分量”“二向量模长”。

## 四个页面与它们的卡

| 页面 | 一句话 | 卡（`preset`） |
| --- | --- | --- |
| `qubit-geometry` | 粒子是线，波是面积，两者是同一个几何积的两个投影 | `line` `area` `half` `phase` `hadamard` `hzh` `turn1` `turn2` |
| `sphere-escape` | 以为把球封住了，总还有一点留在外面 | `diagonal` `absorb` `liuhui` `zu` `dottie` `far` `euclid` `thirteen` |
| `pythagoras-number-escape` | 线上的误差可以趋于零，面积上的缺口至少一格 | `hippasus` `minus` `locked` `golden` `five` `seven` `count` `sato` |
| `timeless-causal-crystal` | 两条余弦锁住第三条的窗口，观察者只能在窗口里选点 | `window` `edge` `impossible` `right` `crystal` `field` `thread` `longer` |

## 正文里的引用（中英文版本位置与卡名相同）

| 章节 | 位置 | 引用 |
| --- | --- | --- |
| 第五章 | §5.2 末（旋子） | `qubit-geometry` · `turn1` |
| 第六章 | §6.1 末 | `qubit-geometry` · `half` |
| 第六章 | §6.3 末 | `qubit-geometry` · `area` |
| 第六章 | §6.4 | `qubit-geometry` 完整实验室 |
| 第二十一章 | §21.2 末 | `sphere-escape` · `diagonal` |
| 第二十一章 | §21.3 末 | `sphere-escape` · `liuhui` |
| 第二十一章 | §21.4 末 | `sphere-escape` 完整实验室 |
| 第二十二章 | §22.2 末 | `sphere-escape` · `euclid` |
| 第二十四章 | §24.4 末 | `sphere-escape` · `dottie` |
| 终章 | 第二幕末 | `pythagoras-number-escape` · `hippasus` |
| 终章 | 第一座桥末 | `pythagoras-number-escape` · `five` |
| 终章 | 第三座桥末 | `pythagoras-number-escape` 完整实验室 |
| 终章 | 第一层末 | `timeless-causal-crystal` · `crystal` |
| 终章 | 第四层末 | `timeless-causal-crystal` · `window` |
| 终章 | 第六层末 | `timeless-causal-crystal` 完整实验室 |

## 增删或修改一张卡之后

1. 页面：`index.html` 里的 `button.preset[data-preset]`，`main.js` 里的卡片数据（起始状态、是否播放、静态图停在哪一帧）与说明文字，中英成对。
2. 测试：`books/quantum-geometry/viz/tests/<id>.test.mjs` 里为这张卡的终态加一条独立核对。
3. 引用：在讲到它的那句话旁加 `::: {.viz src="<id>" preset="<卡>" height="500"}`，中英文各一处，并更新上表。
4. 出图与检查：

   ```bash
   node tools/node/viz-shots.mjs quantum-geometry <id>
   node tools/node/viz-thumbs.mjs quantum-geometry <id>
   node tools/node/viz-test.mjs quantum-geometry
   node tools/node/viz-validate.mjs quantum-geometry && ./tbook check
   ```

删掉一张卡之前先搜索两种语言的章节里有没有引用它；`./tbook check` 会对不存在的卡报错。
