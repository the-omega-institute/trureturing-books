# 第32.2节：具体运行上界与复杂度下界

本批限定修正中英文第（五）项、字典运行的证明说明与文末推论：冻结定理给出指定名字比较机与字典扫描机的构造性运行上界，不能由此推出所有物理比较或算法的线性成本下界；字典首次命中后只回卷已读历史，不必扫描剩余词条。保留作者的比较机图景与 `MODEL` 身份、题记、完整定理陈述、第1款证明、固定结语、环境／GID、媒体及其余散文。

最初输入 main `ace7223d`、pin `a79bb042`，现整合已合入的 main `22614fb6`、pin `a313d1ce`（锁解析610条声明）。两个钉版的 [BinaryNameComparison](https://github.com/the-omega-institute/trureturing/blob/a313d1ce217f58f284d14d3b7d8231c5773b8d55/D5/S0/Computability/BinaryNameComparison.lean) 与 [BinaryNameDictionary](https://github.com/the-omega-institute/trureturing/blob/a313d1ce217f58f284d14d3b7d8231c5773b8d55/D5/S0/Computability/BinaryNameDictionary.lean) 完整源码及冻结状态逐字节相同；`name_compare_run` 与 `dictionary_lookup_run` 的完整声明、名称、种类及模块摘要均与锁项一致。两条结论构造 `Nonempty (EvalsToInTime …)`，保证指定机器的停机结果、纸带复原及步数上界，没有对所有算法量化的下界结论。

按源码追踪空字典：对任意长度的查询字，`start → rewind → finish → 停机构型` 仅需3次 `FinTM2` 转移，查询栈未被读取或改变。这不能支持逐输入的总长度线性下界，也不排除另行说明成本模型、输入域与算法量词的最坏情形下界。字典非空时，比较子例程先复原查询字；`clearRight` 清空候选栈后，命中即转入 `rewind`，未命中才增加一元计数并继续。回卷将已读历史接回未读后缀前，得到 `history.reverse ++ stream`。这些是已有源码的手工推演，不新增内核验证结论。

相对原始输入，每语仅第47、89、92行改变，第89行只修正第2款证明解释。校对skill只在既有量词核对段增加一句可复用方法：区分具体机器的运行上界与复杂度下界，核清成本模型、输入域与算法量词；不纳入本案编号或经历。覆盖索引仅增加本记录的入口。

整合前源检查为0错误、9条既有警告；双语HTML构建成功，自动核对新说明、上界限定及精确pin链接，两页均无 `katex-error`。声明地图15张图片仍新鲜，未启动浏览器；唯一HTML构建警告为英文搜索索引大小。整合后的源检查同为0错误、9条既有警告，双语HTML重建及相同的文字／链接检查也通过；历史输出仍保留原输入归属，最终提交CI另行核实。首轮三席均批准原两处上界修正，0阻塞；新增证明说明及当前依赖对应须复审。最终CI、合入与Pages状态见 [PR #310](https://github.com/the-omega-institute/trureturing-books/pull/310)。普通导出按需检查，不新增截图巡检。本记录不代表第32.2节整页、实验舞台或整书准确性接受。
