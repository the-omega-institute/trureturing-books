# Appendix C Verification Sources and Open-Problem Boundaries {#appendix-c-master-index-of-formalized-lean-4-theorems-and-open-problems}

This appendix explains how to check the book's evidence. Each Lean reference points to a frozen declaration at the pinned `trureturing@dev` commit [{commit}](trureturing:); authors and reviewers are responsible for written proofs; open problems retain their unproved status. Individual declarations, source links and written-proof sources appear in the text and in the verification ledger generated during compilation.

::: {.stats src="summary"}
:::

The declaration index is generated during compilation. Inclusion in it does not change a result’s level of evidence.

::: {.stats src="declarations" display="link" format="html"}
Open the generated declaration index
:::

## C.1 Lean-Verified Results {#sec-appendix-c-theorems}

The build generates green badges for `theorem`, `lemma`, `proposition` and `corollary` environments from the lock file. To check a result, read its hypotheses and conclusion, open its Lean source link, and compare the types, assumptions and conclusion. Citing the same declaration in different chapters does not produce new theorems.

In Section 7.3, [@prob-monitored-spectral-mean] concerns finite-dimensional unitary monitoring of a pure state; [@rem-monitored-unital-kac] treats finite-dimensional CPTP channels that preserve the identity on the actual relevant space. General quantum instruments, infinite dimensions and physical clocks require separate arguments.

## C.2 Definitions and Algebraic Carriers {#sec-appendix-c-definitions}

Source links for definitions, structures and inductive types explain how objects are constructed. They do not prove every property of those objects. Check definition references separately from theorem verification; the existence of a definition cannot replace a proof.

## C.3 Written Proofs and Auxiliary References {#sec-appendix-c-inline}

Inline Lean links identify auxiliary results or source locations; checking them still requires reading the declaration's kind and full hypotheses. Written proofs explicitly use `status="written-proof"` and provide a complete proof, a literature source or source-paper repository, a source location and a formalization request.

For example, [@thm-central-defect-endpoint-average] and its [written proof](ch16-s03-central-defect-spectrum.md#pf-central-defect-endpoint-average) record a DOI and [formalization request #10](https://github.com/the-omega-institute/trureturing-requests/issues/10) in the text. This does not confer Lean verification.

## C.4 Open Problems and Literature Boundaries {#sec-appendix-c-open-register}

::: {.remark #rem-appendix-c-open-literature-register title="Open Problems and External Literature Boundaries"}
Open conjectures and problems use `conjecture` or `problem` without a `lean` attribute. External literature results state their sources and the limits of this book's formalization. For example, the continuous holographic formula in [@rem-ryu-takayanagi-literature] and the rational Diophantine question in [@rem-diophantine-z-in-q-literature] cannot be replaced by nearby finite models or frozen theorems.

The precise statements, hypotheses and literature discussions remain in their chapters; this appendix does not maintain a separate inventory of the book's problems.
:::

## C.5 Pinned Commit and Verification Procedure {#sec-appendix-c-integrity-checklist}

`site.toml` specifies the formalization repository and its branch. The lockfile `trureturing.lock.json` records the `dev` branch. At runtime, the tools resolve the commit and the cited frozen declarations. `./tbook check --book quantum-geometry` checks references, evidence attributes and bilingual structure. Compilation generates the verification ledger. Verification status comes from actual command results.

::: {.remark #rem-appendix-c-epistemic-boundary title="Limits of Verification Sources"}
Source links locate declarations, the book's explanations aid understanding, and the Lean kernel checks formal proofs. Written proofs and open problems carry different evidential responsibilities; an index, diagram or count cannot change a result's verification status.
:::
