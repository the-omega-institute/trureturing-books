# Review protocol

Use this record to keep a batch auditable without claiming more coverage than was done.

## Finding record

For each finding record:

```text
id: stable short identifier
unit: chapter/file and language(s)
location: stable heading, #id, or current line
claim: the exact current wording or formula
evidence: frozen source, independent calculation, literature check, or media inspection
classification: confirmed | advisory | discarded
correction: smallest bilingual change, if confirmed
limits: assumptions, provenance limits, and units not covered
```

Do not use stale line numbers after a rebase. Keep the old intake as provenance only and cite the final candidate’s current location.

## Coverage record

Maintain one row per SUMMARY unit. A row can say `pending`, `read-only review`, `fixed pending review`, `approved pending PR`, `merged`, or `not reviewed`; only mark it covered after both languages, formal environments, formulas/examples, and shared media have evidence. The total must match the actual SUMMARY, including coda and appendices.

## Three review seats

- **Architecture:** lock pin and branch, GID resolution and theorem kinds, bilingual environment/media parity, epistemic color and block classification, managed-file boundaries, and scoped links.
- **Quality:** Lean assumptions and proof explanations, independent algebra/numerics, physical protocol conditions, literature attribution, terminology, and bilingual semantic parity.
- **Tests:** fresh `./tbook check`, affected builds, EPUBCheck, SVG/XML and link checks, independent calculations, and browser checks for the changed chapter matrix.

Each seat returns a short structured result with `verdict`, `blocking_findings`, `checks`, `limits`, and a candidate hash. An approval for an earlier hash does not approve a later rebase or edit.

## Validation matrix

Choose checks that match the change, and record the actual result:

| Change | Required evidence |
| --- | --- |
| Chapter text, environments, GIDs | `./tbook check`; both-language environment sequence and GID comparison; source/state inspection at the current pin |
| Formula, table, angle, probability, or physical scale | independent calculation or a reproducible small script, with assumptions and rounding stated |
| SVG or image | XML parse, internal-reference check, and visual inspection at relevant output sizes |
| HTML/PDF/EPUB/site output | affected `./tbook build` targets, EPUBCheck for EPUBs, and browser inspection of changed pages in desktop/mobile and relevant themes |
| Rebase or lock-pin change | rerun the affected architecture and quality checks; confirm current pin and historical baseline separately |

## PR handoff

Before pushing, require a clean worktree, `git diff --check`, final candidate hash, three-seat results, and a ledger update that still leaves unreviewed units pending. The PR body states what readers will see, the current pin, validation, and remaining coverage. It contains no model or agent identifiers.
