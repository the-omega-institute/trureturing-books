#!/usr/bin/env node
// Long card explanations must remain complete and readable in a narrow cited figure.
import { settle } from '../../../../tools/node/viz-testkit.mjs';

const pages = [
  ['chsh-dial', 'collinear'],
  ['entanglement-entropy-complexity', 'pythagoras'],
  ['eth-horizon-crossover', 'human'],
  ['sphere-escape', 'diagonal'],
  ['timeless-causal-crystal', 'window'],
  ['golden-cut-observer', 'cut'],
  ['fixed-point-convergence', 'golden'],
  ['gram-causal-elliptope', 'elliptope'],
  ['spherical-degeneracy-radar', 'meridian'],
  ['pisot-clifford-rauzy-sandtable', 'zeckendorf']
];

export async function figureNoteChecks(T) {
  for (const [id, first] of pages) for (const lang of ['zh', 'en']) {
    const page = await T.open('quantum-geometry', id, `?embed=1&preset=${first}&lang=${lang}`, {
      viewport: { width: 334, height: 500 }, reducedMotion: 'reduce'
    });
    await settle(page);
    const count = await page.locator('[data-preset]').count();
    for (let i = 0; i < count; i++) {
      if (i) { await page.click('[data-tour="next"]'); await settle(page); }
      const v = await page.evaluate(() => {
        const note = document.querySelector('.tour .tour-note'), tour = document.querySelector('.tour');
        const heading = tour.querySelector('.what b').getBoundingClientRect(), bar = tour.getBoundingClientRect();
        const stage = document.querySelector('.stage').getBoundingClientRect();
        const rail = document.querySelector('footer.rail').getBoundingClientRect(), r = note.getBoundingClientRect();
        const root = document.documentElement;
        return {
          card: document.querySelector('[data-preset][aria-pressed="true"]').dataset.preset,
          note: note.textContent.trim().length > 8 && note.scrollHeight <= note.clientHeight + 1 && note.scrollWidth <= note.clientWidth + 1,
          regions: stage.bottom <= bar.top + 1 && heading.top >= bar.top && heading.bottom <= r.top + 1 &&
            r.bottom <= bar.bottom + 1 && bar.bottom <= rail.top + 1 && rail.bottom <= innerHeight + 1,
          frame: root.scrollHeight <= innerHeight && root.scrollWidth <= root.clientWidth
        };
      });
      T.check(`${id}/${v.card} (${lang}): the complete note, stage and rail fit without internal scrolling`, v.note && v.regions && v.frame, JSON.stringify(v));
    }
    await page.context().close();
  }
}
