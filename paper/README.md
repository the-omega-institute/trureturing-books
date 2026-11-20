# 论文稿 · Papers

本目录存放与本书库第 39 章（公理 Ω）同源的研究论文稿：LaTeX 源文件、编译好的 PDF 与数值核对脚本。稿件在写作过程中随改随同步，尚未投稿；各稿内的每条陈述都标明身份（定理、文献结果、假设、猜想或纲领）。

| 目录 | 论文 | 内容 |
| :--- | :--- | :--- |
| `ternion-arc-calculus/` | 纯数学篇 | 比较结构的公理与分类（模型恰为 $S^1$、$S^3$）、非结合情形与圆球性定理、极小圆弧微积分 |
| `omega-physics/` | 物理篇 | 由公理 Ω 的读法得到量子力学的运动学结构、复合系统、物理例子，以及带明确假设身份的场论部分 |
| `research-lifecycle/` | 方法篇 | 团队怎样用“许愿”驱动的自动科研系统做数学研究：目标文件、带关卡的代理席位、Lean 真值账本、执行与身份层、出版与专家外联 |

## 编译

前两个目录自成一体，不依赖外部文件：

```sh
cd paper/<目录>
pdflatex main.tex && pdflatex main.tex && pdflatex main.tex
```

方法篇含中文引文，用 XeLaTeX 编译：`xelatex main && bibtex main && xelatex main && xelatex main`。

## 数值核对

脚本只依赖 Python 3 与 NumPy（个别检查用到 SymPy、mpmath），在各自目录内直接运行：

```sh
cd paper/ternion-arc-calculus && python3 check_arc_calculus.py
cd paper/omega-physics && python3 check_physics.py && python3 check_examples.py
```

核对脚本随写作更新，可能先于正文包含下一批内容的检查。两篇正在扩充，各自的 `main.tex` 以最近一次通过全部核对的版本为准。

## 与书和形式化的关系

- 书中第 39 章的相应注记由这些稿件的结论写回，书中陈述的身份标签以书为准。
- 已形式化的部分在 [trureturing](https://github.com/the-omega-institute/trureturing) 中，稿内"形式化"一节列出对应的合并请求与声明；其余结论为书面证明或假设，未经 Lean 验证。
- 本目录不属于任何一本书的构建范围，`./tbook` 的结构检查与出版流程不读取它。
