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

Do not use stale line numbers after integration. Keep the old intake as provenance and reconfirm the claim at the current candidate’s stable location before repairing it.

## Coverage record

Maintain one row per SUMMARY unit. A row can say `pending`, `read-only review`, `fixed pending review`, `approved pending PR`, `merged`, or `not reviewed`; only mark it fully covered after both languages, formal environments, formulas/examples and shared media have evidence. The total must match SUMMARY, including coda and appendices. Retain historical text coverage separately when later media remain pending; neither a historical unit count nor lifecycle completion approves newly integrated material.

On recovery or integration, record the prior evidence candidate, current input HEAD and changed scope. Compare the dependencies relevant to each reused conclusion: text/environment bytes, referenced source and pin, media/captions, and output tools/assets. State which evidence survives and why, which changed claims need fresh review, and which outputs need rebuilding. Do not treat changed tooling as a new content audit of every chapter, or unchanged text as approval of new media. For an uncommitted handoff, identify the input HEAD and changed file digests; a later committed hash needs the lifecycle owner’s correspondence check.

For an upstream table, list or display reflow, record how each affected claim’s old row/field corresponds to its current stable location and labelled fields in both languages, including assumptions, qualifiers, conclusions and source/GID/attribution bindings. Carry the already-confirmed minimal corrections into those fields where their justification still holds, retaining author wording and the upstream presentation. Established semantic correspondence can justify reuse of the relevant evidence despite changed bytes; line growth or a new layout alone adds no claims or audit credit. A changed or missing hypothesis, qualifier, conclusion or source binding beyond those corrections needs fresh review of that claim. Correspondence alone does not establish content accuracy or approve the surrounding material.

## Three review seats

- **Architecture:** lock pin and branch, GID resolution and theorem kinds, bilingual environment/media parity, epistemic color and block classification, managed-file boundaries, and scoped links.
- **Quality:** Lean assumptions and proof explanations, independent algebra/numerics, physical protocol conditions, literature attribution, terminology, and bilingual semantic parity.
- **Tests:** fresh `./tbook check`, affected builds, EPUBCheck, SVG/XML and link checks, independent calculations, and browser checks for the changed chapter matrix.

Each seat returns a short structured result with `verdict`, `blocking_findings`, `checks`, `limits` and candidate identity. Review scope and any reused dependency evidence must be explicit. An earlier approval does not automatically approve later changed inputs. Read the current project workflow for seat composition and orchestration ownership; a repair worker does not start an extra review panel when the caller owns that stage.

## Validation matrix

Choose checks that match the change, and record the actual result:

| Change | Required evidence |
| --- | --- |
| Chapter text, environments, GIDs | `./tbook check`; both-language environment sequence and GID comparison; source/state inspection at the current pin |
| Formula, table, angle, probability, or physical scale | independent calculation or a reproducible small script, with assumptions and rounding stated |
| SVG or image | XML parse, internal-reference check, and visual inspection at relevant output sizes |
| Interactive lab implementation | changed-lab browser tests with independent edge cases; project-required shots inspected and cited stills regenerated |
| Caption wording only, with unchanged producer dependencies | verify claims against the current producer/source; reuse producer/still evidence only after the explicit relevant dependency correspondence above, with fresh verification for uncovered claims; validate affected bilingual outputs/readers per the output row. Wording changes alone do not require lab shots or still regeneration |
| HTML/PDF/EPUB/site output | affected `./tbook build` targets, EPUBCheck for EPUBs, and browser inspection of changed pages in desktop/mobile and relevant themes |
| Integration or lock-pin change | explicit dependency comparison, then affected architecture/quality checks and output validation; confirm current pin and historical baseline separately |

When an actual PDF glyph or font concern arises, extracted/`ActualText` strings and font-resource metadata do not establish painted readability. Record reading-scale pixel witnesses for the affected passages against the actual candidate and PDF artifact, stating material correspondence and unknowns about the producing renderer and environment. Successful compilation or extraction, or readable output in another environment, does not discharge the observed concern in the affected environment. Preserve author notation and voice; use [book-export](../../book-export/SKILL.md) for conversion diagnosis and the existing upstream route for shared defects.

## PR handoff

An implementation handoff includes changed paths, input/candidate identity, `git diff --check`, actual validation, limits and exact remaining review/lifecycle obligations. The lifecycle owner checks the committed candidate against that patch, obtains the required three-seat results, and updates the ledger while leaving unreviewed units pending. Before pushing, check the final commit and worktree state. The PR body states concrete reader-visible changes, pin, validation and remaining coverage, without model or agent identifiers.

When a repair depends on managed template files, follow [template-update](../../template-update/SKILL.md) through the supported downstream update and compare its managed files with the published release commit. Track upstream approval, publication and downstream CI/Pages separately: the template repository's generic `Release` workflow can succeed while skipping a template tag, so check `template-release.yml` and the actual published, non-draft Release. For a release with build-cache attachments, verify the expected assets against `build-cache.json` before recording the publication obligation as complete; those example-site artifacts do not validate the book's current outputs.
