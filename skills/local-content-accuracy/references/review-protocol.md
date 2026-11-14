# Review protocol

Use the sections relevant to the claims, dependencies and outputs being reviewed. Record concrete evidence in the [accuracy ledger](../../../docs/project/CONTENT-ACCURACY.md), within the assigned ownership and scope.

## Findings and coverage

Identify each finding by a stable ID, unit/language and current heading or `#id`; quote the claim, cite its evidence, classify it as confirmed, advisory or discarded, and state the minimal correction and limits. Reconfirm old intake against the current claim rather than relying on stale line numbers.

Derive coverage rows from the current SUMMARY, including prelude, coda and appendices. Track both languages, formal claims, calculations, media, outputs and independent review separately; leave uncovered components pending. Lifecycle completion and historical unit counts do not approve content or newly added media.

## Reusing evidence after changes

Identify prior and current candidates. For an uncommitted patch, use input HEAD and changed paths/digests; the lifecycle owner establishes correspondence to the later committed candidate. Compare the dependencies relevant to each conclusion: text/environments, source and pin, media/captions, and producing tools/assets. State what survives, what needs fresh claim review and what needs output validation. A tooling change alone does not require a new whole-book content audit.

When layout or table fields move, map the old claim to its current stable location in both languages, preserving hypotheses, qualifiers, conclusion and source/GID/attribution bindings. Semantic correspondence can support evidence reuse despite changed bytes; changed or missing meaning needs fresh review. Carry justified minimal corrections into the current presentation. Correspondence itself adds no accuracy approval or coverage.

For versioned stills or posters, compare the committed image pixels and export consumers with the declared publication basis. A current source preview does not establish that the shipped image is current; distinguish historical production provenance from current publication evidence.

## Formal and quantitative boundaries

Resolve truncated signatures against the complete frozen declaration at the exact pin before changing an assertion. Preserve optimization and existence quantifiers: an attainable optimum need not be attained by a sampled construction. Check each green evidence box in full against its cited statement; instantiations or consequences derived manually need their own attribution outside the verified box.

Trace a quantitative claim across its actual supported mathematical/control domain and existing reader-facing consumers. A preset, display range or truncated example does not define that domain. Presets may set several controls; later reader changes can override one while leaving others active, so resolve selector precedence before choosing the expected curve. Distinguish finite-step error ratios from local or asymptotic factors; keep that qualification in captions, labels and reference-curve legends.

For each supported control combination that selects a different mathematical curve, derive the extremum's location and value independently of the producer and test helpers. Compare endpoint and interior candidates as appropriate, and check the displayed name and qualifications against that curve. A regime-only reference optimum cannot validate every selected curve's extremum. A persistent reference minimum needs a visible label identifying its reference curve.

## Validation by affected dependency

Choose the smallest meaningful checks during editing, then complete applicable project-required validation within the assignment's permissions. Record the actual candidate, result and limits; an unrun check remains pending.

| Affected material | Evidence needed |
| --- | --- |
| Chapter text, environments or GIDs | `./tbook check`; bilingual environment/GID/media alignment; affected source/state comparison at the current pin |
| Formula, table or physical quantity | Independent calculation with domain, protocol assumptions and rounding stated |
| Image or SVG | Relevant structural/internal-reference checks and visual inspection at the output's reading size |
| Interactive implementation | Project browser tests with independent cases for supported controls; required shots inspected and cited stills refreshed, per [project media rules](../../../PROJECT.md) |
| Caption alone, producer dependencies unchanged | Verify its claims against the producer/source; reuse covered producer/still evidence only after dependency correspondence. Validate affected bilingual outputs; wording alone does not require regenerated lab shots/stills |
| Derived artifact after source/pin integration | Check current inputs under the generator's existing invariants, retaining its assertions; follow [project rules](../../../PROJECT.md) and [book-figure](../../book-figure/SKILL.md) for regeneration |
| HTML/PDF/EPUB/site | Affected builds, EPUBCheck for EPUB, and applicable automated checks; inspect affected pages only for related errors/warnings or explicit visual/layout checks and repairs, per [book-export](../../book-export/SKILL.md). Ordinary prose or formula edits do not require screenshots, page-by-page reading or a language/theme/viewport matrix |

For a PDF readability finding, inspect reading-scale pixels of the affected passages in the actual candidate artifact and affected environment. Extracted/`ActualText` strings, font metadata, compilation success or readability in another environment do not resolve that finding. Preserve author notation; route conversion diagnosis through [book-export](../../book-export/SKILL.md), stating renderer/environment correspondence and unknowns.

Classify CI failures by failing stage and checked input before reusing local or branch evidence for an integrated candidate. External setup failures require infrastructure handling by the lifecycle owner, not speculative book edits. Use the [project workflow](../../../docs/project/WORKFLOW.md) for lifecycle handling and [template-update](../../template-update/SKILL.md) for managed defects; upstream publication and downstream validation are separate evidence.

## Independent review and handoff

Use the project's independent architecture, quality and tests seats and current composition from the [workflow](../../../docs/project/WORKFLOW.md). Each reports candidate identity, scope, verdict, blocking findings, actual checks and limits, including reused evidence. Resolve blockers and ensure approval covers the final relevant inputs. Reviews inform the designated owner's adjudication; a repair worker does not start another panel when orchestration belongs to the caller.

Hand off changed paths/digests, input/candidate identity, `git diff --check`, actual validation, limits and remaining review/output/lifecycle obligations. The assigned owner updates the ledger, verifies committed correspondence and completes publication through the workflow. Merge alone does not discharge accuracy, review or output obligations; carry unresolved work within the authorized scope and existing execution limits. Publication descriptions state concrete changes, pin, validation and coverage without model or agent identifiers.
