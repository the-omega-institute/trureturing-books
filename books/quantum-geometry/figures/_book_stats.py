"""共享已生成统计；源数据由 sync-statistics.py 统一核对。"""
import json
from pathlib import Path

BOOK = Path(__file__).resolve().parents[1]
DATA = json.loads((BOOK / 'data/statistics.json').read_text(encoding='utf-8'))
DECLS = DATA['declarations']
CHAPTERS = DATA['chapters']
PARTS = list(dict.fromkeys(c['part'] for c in CHAPTERS if c['part']))
FIRST = {}
for chapter in CHAPTERS:
    for gid in set(chapter['environment']) | set(chapter['inline']):
        FIRST.setdefault(gid, chapter['file'])
