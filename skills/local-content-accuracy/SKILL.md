---
name: local-content-accuracy
description: Proofread selected trureturing-books chapters for mathematical, physical, source, and bilingual accuracy against the pinned Lean statements while preserving the author's voice; use when a batch needs evidence, minimal corrections, independent review, and a PR.
---

# Content accuracy review

Use this skill for chapter-level accuracy work in this repository. The deliverable is a small, reviewable batch: confirmed corrections in both languages, an honest coverage record, independent validation, and a timely PR. Preserve the requested scope. Do not turn a chapter review into a rewrite or mark unreviewed units as complete.

Before reading or editing, read `AGENTS.md`, `PROJECT.md`, `docs/project/WORKFLOW.md`, and the relevant `docs/` verification guidance. Chinese is authoritative; English must be natural and semantically aligned. The author’s chapter epigraphs and distinctive prose are part of the work. Apply the style rules in [references/style-preservation.md](references/style-preservation.md).

Work in a dedicated branch/worktree and rebase onto the latest `origin/main` before the final review. Treat `trureturing.lock.json` as tool-owned: use `./tbook pin` when a pin operation is explicitly required, and never hand-edit the lock. Keep the current pin, its configured trureturing branch, and any historical audit pin distinct in the ledger.

For each requested unit:

1. Read the complete Chinese and English chapter, every formal block and proof, every formula/table/example, and every shared image or interactive reference. Start a coverage row before editing.
2. Extract all `lean` GIDs and compare each formal environment with the frozen declaration at the current pin: name, kind, module, assumptions, types, domains, quantifiers, conclusion, and the scope of the prose proof. Formal theorem-like environments must resolve to lock entries of `kind = theorem`.
3. Independently recompute material numerical claims and inspect literature attribution, physical protocol assumptions, and epistemic level. Separate Lean results, literature results, author interpretation, and open questions. Record unresolved provenance as a limitation instead of silently strengthening the text.
4. Classify findings as confirmed, advisory, or discarded. Fix only confirmed inaccuracies and necessary bilingual mismatches. Edit Chinese first, then make the English accurate and idiomatic. Keep chapter order, stable IDs, GIDs, media order, and proof-boundary conventions unchanged.
5. Run the smallest meaningful checks while iterating, then run the final checks after the last commit. At minimum use `./tbook check`; for output changes build the affected HTML/PDF/EPUB/site targets, run EPUBCheck, validate changed SVG/XML, and inspect the relevant desktop/mobile and theme combinations. Add independent numerical or browser checks when the content requires them.
6. Obtain independent architecture, quality, and tests reviews. Every blocking finding must be closed, and all three seats must review the final candidate after the last content or rebase change. Reuse earlier evidence only when the changed inputs are explicitly unchanged.
7. Update `docs/project/CONTENT-ACCURACY.md` with the batch’s pin, exact coverage, confirmed corrections, evidence, review verdicts, and limits. Coverage means both languages, formulas, environments, media, and evidence were examined; it does not mean that `./tbook check` merely passed.
8. Push the branch and create a PR when the user has requested timely PRs. The PR description should state the concrete content changes, current pin, validation, and remaining coverage. Do not put model or agent identifiers in commits, PRs, or published content.

Classify remote failures by the stage that failed. If a workflow stops while installing a browser, font, package, or other runner dependency before checking repository content, record the exact external error, retry the failed jobs once when it is plausibly transient, and do not change the book to chase that failure. If the retry fails at the same setup stage, leave the PR open with the successful local evidence and an explicit infrastructure blocker.

A batch waiting on review, CI, or merge does not halt review of independent remaining units in the authorized goal; continue those in a separate batch/worktree. Keep each batch’s candidate, evidence, outstanding checks, and PR status explicit; the waiting batch still needs its own checks and approval.

Use [references/review-protocol.md](references/review-protocol.md) for the review record, finding classification, validation matrix, and PR handoff. After any new upstream commit, conflict resolution, or content fix, repeat the affected review and update the candidate hash in the ledger before reporting approval.
