#!/usr/bin/env python3
"""从正式解析器刷新声明索引、地图与统计图；--check 只检查，不写入。"""
import argparse
from collections import Counter
import importlib.util
import json
from pathlib import Path
import re
import subprocess
import sys

BOOK = Path(__file__).resolve().parent
ROOT = BOOK.parents[1]
sys.path.insert(0, str(ROOT / 'tools'))
from tbook import config, figure, model, stats


def planned():
    book = config.load_book(str(BOOK))
    data = stats.collect(book)
    registry_file = BOOK / 'data/declaration-serials.json'
    registry = json.loads(registry_file.read_text(encoding='utf-8'))
    serials, next_id = registry['serials'], registry['next']
    for group, prefix in [('theorems', 'T'), ('definitions', 'D'), ('inline', 'R')]:
        for gid in data['groups'][group]:
            if not serials.get(gid, '').startswith(prefix):
                serials[gid] = f'{prefix}{next_id[prefix]:03d}'
                next_id[prefix] += 1
    decls = data['declarations']
    groups = data['groups']
    cells = Counter()
    for gid, decl in decls.items():
        via = {c['via'] for c in decl['citations']}
        how = 'env' if 'environment' in via else 'media' if 'media' in via else 'inline'
        kind = 'thm' if decl['kind'] == 'theorem' else 'def'
        cells[kind, how] += 1
    vals = {'total': data['total'], 'T': len(groups['theorems']), 'D': len(groups['definitions']),
            'R': len(groups['inline']), 'env': len(groups['theorems']) + len(groups['definitions']),
            'theorems': data['kinds'].get('theorem', 0),
            'definitions': data['total'] - data['kinds'].get('theorem', 0),
            'defs': data['kinds'].get('def', 0), 'inductive': data['kinds'].get('inductive', 0),
            'lean_envs': data['environments']['lean_verified'],
            'open': sum(data['environments'][k] for k in model.OPEN)}
    for group, prefix in [('definitions', 'D'), ('inline', 'R')]:
        for kind in ('theorem', 'def', 'inductive'):
            vals[f'{prefix}_{kind}'] = sum(decls[g]['kind'] == kind for g in groups[group])
    for kind in ('thm', 'def'):
        for how in ('env', 'media', 'inline'):
            vals[f'{kind}_{how}'] = cells[kind, how]
    grouped = {}
    first = {}
    for ch in data['chapters']:
        for gid in set(ch['environment']) | set(ch['inline']):
            first.setdefault(gid, ch['top'])
        if re.match(r'ch\d+-', ch['file']) or ch['file'] == 'coda.md':
            grouped.setdefault(ch['top'], set()).update(g for g in ch['environment'] if decls[g]['kind'] == 'theorem')
    vals['chapter_total'] = sum(map(len, grouped.values()))
    vals['chapter_new'] = sum(first.get(g) == top for top, gids in grouped.items() for g in gids)
    vals['chapter_reused'] = vals['chapter_total'] - vals['chapter_new']
    vals['formal_envs'] = sum(data['environments'][k] for k in model.FORMAL) - data['environments']['written_proof']
    env_locs = {(c['file'], c['line']) for g in groups['theorems'] for c in decls[g]['citations'] if c['via'] == 'environment'}
    vals['theorem_headers'] = len(env_locs)
    vals['example_headers'] = len(env_locs) - vals['formal_envs']
    outputs = {registry_file: json.dumps(registry, ensure_ascii=False, indent=2) + '\n',
               BOOK / 'data/statistics.json': json.dumps(data, ensure_ascii=False, indent=2) + '\n'}

    def loc(c, lang):
        file = c['file']
        match = re.match(r'ch(\d+)-', file)
        if match:
            label = f'Ch {int(match[1])}'
        elif file == 'README.md':
            label = '序曲' if lang == 'zh' else 'Prelude'
        elif file == 'coda.md':
            label = '终章' if lang == 'zh' else 'Coda'
        else:
            m = re.match(r'appendix-([a-z])\.md', file)
            label = ('附录 ' if lang == 'zh' else 'Appendix ') + m[1].upper() if m else file
        return label + (f" `#{c['id']}`" if c['id'] else '')

    for lang in book.languages:
        values = dict(vals)
        for group, prefix in [('theorems', 'T'), ('definitions', 'D'), ('inline', 'R')]:
            rows = []
            for gid in groups[group]:
                d = decls[gid]
                refs = list(dict.fromkeys(loc(c, lang) for c in d['citations'] if c['via'] != 'media'))
                media = sorted({c['file'] for c in d['citations'] if c['via'] == 'media'})
                uses = ', '.join(refs)
                if media:
                    uses += ('; ' if uses else '') + 'media ' + ', '.join(f'`{f}`' for f in media)
                name = d['name'].replace('|', '\\|')
                rows.append(f'| `{serials[gid]}` | [`{name}`](lean:{gid}) | [{{source}}](lean:{gid}) | `{d["kind"]}` | {uses} |')
            values[f'table_{prefix}'] = '\n'.join(rows)
        source = (BOOK / f'data/appendix-c.{lang}.md.in').read_text(encoding='utf-8')
        def replace(m):
            if m[1] not in values:
                raise ValueError(f'unknown statistic {m[1]}')
            return str(values[m[1]])
        outputs[BOOK / lang / 'appendix-c.md'] = re.sub(r'\{\{([a-zA-Z_]+)\}\}', replace, source)
    # Use the same parser and serial allocation for the map; no generated appendix is read as input.
    spec = importlib.util.spec_from_file_location('map_data', BOOK / 'viz/lean-declaration-map/gen-data.py')
    generator = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(generator)
    outputs[generator.MAIN] = generator.generated(data=data, serials=serials)
    return book, outputs


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    book, outputs = planned()
    changed = [p for p, text in outputs.items() if not p.is_file() or p.read_text(encoding='utf-8') != text]
    if args.check:
        for p in changed:
            print(f'stale: {p.relative_to(ROOT)}', file=sys.stderr)
    else:
        for p in changed:
            p.parent.mkdir(parents=True, exist_ok=True)
            p.write_text(outputs[p], encoding='utf-8')
            print(f'updated: {p.relative_to(ROOT)}')
    # Only these five statistics figures depend on the aggregate counts.
    figs, errors = figure.build(book, ['prelude-three-tiers', 'ch28-declaration-parts', 'appc-ledger',
                                      'appc-modules-by-part', 'appc-theorems-by-chapter'], check=args.check)
    for error in errors:
        print(error, file=sys.stderr)
    for file in figs:
        print(f'{"stale" if args.check else "updated"}: {file.relative_to(ROOT)}')
    if errors or (args.check and (changed or figs)):
        return 1
    return subprocess.run(['node', str(ROOT / 'tools/node/viz-thumbs.mjs'), book.slug, 'lean-declaration-map',
                           *(['--check'] if args.check else [])], cwd=ROOT).returncode


if __name__ == '__main__':
    raise SystemExit(main())
