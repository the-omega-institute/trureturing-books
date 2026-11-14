# 第32.2节：具体运行上界与复杂度下界

输入为已合入 main `ace7223d`，pin 为 `a79bb042`、锁解析606条声明。本批只收束中英文第（五）项及文末的两处推论：冻结定理给出具体名字比较机与字典扫描机的构造性运行上界，不能由此推出所有物理比较或算法都必须支付线性成本。保留作者的比较机图景与 `MODEL` 身份、题记、其余散文、正式定理／证明、环境／GID及媒体。

已读取精确pin上 [BinaryNameComparison](https://github.com/the-omega-institute/trureturing/blob/a79bb042b93f03887703825ec4661602f43d976e/D5/S0/Computability/BinaryNameComparison.lean) 与 [BinaryNameDictionary](https://github.com/the-omega-institute/trureturing/blob/a79bb042b93f03887703825ec4661602f43d976e/D5/S0/Computability/BinaryNameDictionary.lean) 的完整源码和冻结状态。`name_compare_run` 与 `dictionary_lookup_run` 都构造 `Nonempty (EvalsToInTime …)`，并以上述指定机器的停机结果、输入复原及步数上界为结论；没有对所有算法量化的下界结论。名称、种类及模块摘要与锁项一致。

直接追踪 `dictionaryMachine` 的空字典分支：无论查询字多长，初始 `start` 都进入 `rewind`，再到 `finish`，随后停机，共3次 `FinTM2` 状态转移，查询栈没有被读取或改变。因此连该具体实现也不能逐输入宣称成本总与全部输入长度成正比；另行建立最坏情形或普适下界仍须说明成本模型、输入域与算法量词。此为源码推演，不新增内核验证结论。

修正后的两语各仅两行改变，其余字节以及完整定理／证明块保全。校对skill只在既有量词核对段增加一句通用方法：核清上界／下界方向，以及成本模型、输入域和算法量词；不纳入本案编号或经历。

同步、源检查通过：0错误、9条既有警告。两语HTML已重新构建，实际页面文字含限定后的上界说明，原普适下界措辞已移除；唯一构建警告为英文搜索索引大小。skill快检通过。独立三席审查及最终提交的CI／合入／Pages仍待完成；普通导出没有相关视觉异常，不新增截图巡检。上述修正不代表第32.2节整页、实验舞台或整书准确性接受。
