import { isDeepStrictEqual as same } from 'node:util';
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, resolveBook, vizCitations } from '../../../../tools/node/viz-common.mjs';
import { cjkLeftovers, openStill, overflowX, session, settle, stageFirstChecks, viewportShare } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry';
const ID = 'prime-zero-duality-uniformity-sandbox';
const CHAPTER = 'ch31-s07-prime-register-riemann-zero-duality-and-dual-uniformity';
const ANCHOR = 'sec-ch31-prime-register-riemann-zero-duality-and-dual-uniformity';
const DIR = path.join(ROOT, 'books', BOOK);
const LANGUAGES = ['zh', 'en'];
const CARDS = {
  'prime-zero-dark-state-cavity': { scene: 'cavity', still: 4.134725141734694 },
  'mertens-entropy-and-s3-haar-primes': { scene: 'mertens', still: 1 },
  'unfolded-zero-turns-and-gue-fluid': { scene: 'unfold', still: 1 },
  'landau-fujii-fractran-gate-probe': { scene: 'landau', still: 100 },
  'modular-totient-and-duality-ledger': { scene: 'modular', still: 5 }
};
const IDS = Object.keys(CARDS);
const [CAVITY, MERTENS, UNFOLD, LANDAU, MODULAR] = IDS;
const near = (actual, expected, tolerance = 1e-10) => Math.abs(actual - expected) <= tolerance;
const locale = (lang) => lang === 'zh' ? 'zh-CN' : 'en-US';
const normalize = (text) => text.replace(/\s+/g, ' ').trim();
const textOf = (file) => fs.readFileSync(path.join(DIR, file), 'utf8');

const identifiers = /\b(claude|opus|gemini|codex|gpt|llm|agent|agents)\b/gi;
const dialogue = /\b(user|assistant|chatbot|dialogue|system prompt|human message)\b|对话|提示词|用户提问|助手回复/gi;
const matches = (text, pattern) => [...text.matchAll(pattern)].map(([word]) => word);

const T = await session();
const { check, page } = T;
try {
  await stageFirstChecks(T, BOOK, ID, { solid: true });

  const entry = JSON.parse(textOf('viz/visualizations.json')).visualizations.find((item) => item.id === ID);
  const zhChapter = textOf(`zh/${CHAPTER}.md`);
  const enChapter = textOf(`en/${CHAPTER}.md`);
  const gidsIn = (chapter) => [...chapter.matchAll(/\blean="([^"]+)"/g)].flatMap(([, list]) => list.split(',').map((gid) => gid.trim()));
  const gids = gidsIn(zhChapter);
  check('chapter: sixteen distinct frozen citations in the same order in both editions', new Set(gids).size === 16 && gids.length === 16 && same(gids, gidsIn(enChapter)), JSON.stringify(gids));
  check('registry: live §31.7 lab with five bilingual presets, both theory links and sixteen ordered GIDs',
    entry.code === 'OMEGA//PRIME-ZERO' && entry.chapter === 31 && entry.section === '31.7' && entry.status === 'live' &&
    entry.capture_lock === 'links' && same(entry.presets, IDS) && same(Object.keys(entry.preset_titles), IDS) &&
    IDS.every((id) => entry.preset_titles[id].zh && entry.preset_titles[id].en) &&
    entry.theory.some((link) => link.href === `../zh/${CHAPTER}.html#${ANCHOR}` && link.href_en === `../en/${CHAPTER}.html#${ANCHOR}`) &&
    same(entry.lean, gids.map((gid) => ({ gid }))));
  const citations = vizCitations(resolveBook(BOOK), ID);
  for (const lang of LANGUAGES) {
    const cited = citations.filter((cite) => cite.lang === lang);
    check(`${lang}: the chapter cites all five 540px figures in order and the 620px lab`,
      same(cited.map(({ preset, height }) => [preset || null, height]), [...IDS.map((id) => [id, 540]), [null, 620]]), JSON.stringify(cited));
  }
  for (const [file, src] of Object.entries({
    'index.html': textOf(`viz/${ID}/index.html`),
    'style.css': textOf(`viz/${ID}/style.css`),
    'main.js': textOf(`viz/${ID}/main.js`),
    'registry entry': JSON.stringify(entry), 'zh chapter': zhChapter, 'en chapter': enChapter
  })) {
    const found = matches(src, identifiers);
    check(`${file}: zero reserved identifiers at word boundaries`, !found.length, found.join(', '));
  }
  for (const [lang, chapter] of [['zh', zhChapter], ['en', enChapter]]) {
    const found = matches(chapter, dialogue);
    check(`${lang} chapter: zero dialogue words`, !found.length, found.join(', '));
  }

  await T.goto(BOOK, ID, '?lang=en');
  await settle(page);
  const evidence = await page.locator('#basis .lean').evaluateAll((boxes) => boxes
    .filter((box) => box.querySelector('.ok')?.textContent.trim() === 'LEAN ✓')
    .map((box) => [...box.querySelectorAll('a[data-lean-gid]')].map((link) => link.dataset.leanGid)));
  check('evidence: precisely sixteen Lean boxes with one citation each in chapter order', same(evidence, gids.map((gid) => [gid])), JSON.stringify(evidence));

  // The shared gate checks the responsive shell and its interactions. Repeat the specified viewport sizes with every card.
  const layouts = [
    ['desktop', 1440, 900, '', 0.28],
    ['short desktop', 1440, 500, '', 0],
    ['short desktop', 1081, 500, '', 0],
    ['phone', 390, 844, '', 0.28],
    ['lab embed', 740, 620, '&embed=1', 0.4],
    ['figure embed', 334, 540, '&embed=1', 0.6]
  ];
  for (const lang of LANGUAGES) {
    for (const [mode, width, height, flags, minShare] of layouts) {
      const figure = mode === 'figure embed';
      const query = `?lang=${lang}${flags}`;
      const view = await T.open(BOOK, ID, query + (figure ? `&preset=${CAVITY}` : ''), {
        viewport: { width, height }, locale: locale(lang), reducedMotion: 'reduce'
      });
      try {
        const label = `${lang} ${mode} ${width}×${height}`;
        const mirror = view.locator('#lensMirror');
        const toggle = view.locator('#lensToggleBtn');
        const mirrorVisible = mode === 'phone' || mode === 'lab embed';
        check(`${label}: lens mirror visibility`, await mirror.count() === 1 && await mirror.isVisible() === mirrorVisible);
        if (mirrorVisible) {
          const pressed = async () => [await mirror.getAttribute('aria-pressed'), await toggle.getAttribute('aria-pressed'),
            await view.evaluate(() => window.PRIME_ZERO_DEBUG.state.lens)];
          check(`${label}: lens controls start in sync`, same(await pressed(), ['false', 'false', 0]));
          await mirror.click();
          await settle(view);
          check(`${label}: clicking the mirror switches both controls`, same(await pressed(), ['true', 'true', 1]));
          await toggle.click();
          await settle(view);
          check(`${label}: clicking the original switches the mirror back`, same(await pressed(), ['false', 'false', 0]));
        }
        for (const id of IDS) {
          if (figure && id !== CAVITY) await T.goto(BOOK, ID, `${query}&preset=${id}`, view);
          if (!figure) await view.locator(`[data-preset="${id}"]`).click();
          await settle(view);
          await view.evaluate(() => window.scrollTo(0, 0));
          const state = await view.evaluate(() => ({ scene: window.PRIME_ZERO_DEBUG.state.scene, preset: window.PRIME_ZERO_DEBUG.state.preset,
            figure: document.documentElement.dataset.figure === '1', vertical: document.documentElement.scrollHeight - innerHeight }));
          const share = await viewportShare(view, '.stage');
          check(`${label}: ${id} opens with a visible stage and fits horizontally`,
            state.scene === CARDS[id].scene && state.preset === id && state.figure === figure && share > 0 && share >= minShare &&
            (await overflowX(view)) <= 0 && (!figure || state.vertical <= 0), JSON.stringify({ ...state, share }));
          if (lang === 'en') {
            const leftover = await cjkLeftovers(view);
            check(`${label}: ${id} shows English throughout`, !leftover.length, leftover.slice(0, 3).join(' | '));
          }
          const body = await view.locator('body').innerText();
          const found = [...matches(body, dialogue), ...matches(body, identifiers)];
          check(`${label}: ${id} has zero dialogue words or reserved identifiers`, !found.length, found.join(', '));
        }
        if (mode === 'desktop') {
          await view.locator('#infoBtn').click();
          const body = await view.locator('#drawer').innerText();
          const found = [...matches(body, dialogue), ...matches(body, identifiers)];
          check(`${label}: the open drawer has zero dialogue words or reserved identifiers`, !found.length, found.join(', '));
        }
      } finally {
        await view.context().close();
      }
    }

    for (const id of IDS) {
      const still = await openStill(T, BOOK, ID, id, lang);
      try {
        const state = await still.evaluate(() => window.PRIME_ZERO_DEBUG.state);
        check(`${lang} ${id}: export is parked at the declared clock value and hides the lens mirror`,
          state.scene === CARDS[id].scene && near(state.clock, CARDS[id].still) && !state.playing &&
          await still.locator('#lensMirror').count() === 1 && !(await still.locator('#lensMirror').isVisible()),
          JSON.stringify({ scene: state.scene, clock: state.clock, playing: state.playing }));
      } finally {
        await still.context().close();
      }
    }
  }

  await checkMathematics(T);
  check('no browser errors or failed requests throughout Track 29', !T.errors.length, T.errors.join(' | '));
} catch (error) {
  check('Track 29 suite completed', false, error.stack);
} finally {
  await T.finish();
}

// Independent quadrature for the sine-kernel number variance over a finite window.
function gueVariance(length) {
  if (length === 0) return 0;
  const panels = 12000;
  const h = length / panels;
  let sum = length;
  for (let i = 1; i < panels; i++) {
    const r = i * h;
    const sinc = Math.sin(Math.PI * r) / (Math.PI * r);
    sum += (i % 2 ? 4 : 2) * (length - r) * sinc ** 2;
  }
  return length - 2 * h * sum / 3;
}

function lipschitzRotors(p) {
  const radius = Math.floor(Math.sqrt(p));
  const result = [];
  for (let w = 1; w <= radius; w += 2) {
    for (let x = -radius; x <= radius; x++) {
      for (let y = -radius; y <= radius; y++) {
        for (let z = -radius; z <= radius; z++) {
          if ([x, y, z].every((v) => v % 2 === 0) && w ** 2 + x ** 2 + y ** 2 + z ** 2 === p) result.push([w, x, y, z]);
        }
      }
    }
  }
  return result;
}

// Observe chart inputs through the shared plot API while letting the original lines render.
async function plottedLines(page, draw) {
  await page.evaluate(() => {
    const kit = window.TRV.kit;
    const plot = kit.plot;
    window.track29Lines = {};
    kit.plot = (canvas, options) => {
      const chart = plot(canvas, options);
      const line = chart.line;
      const lines = window.track29Lines[canvas.id] = [];
      chart.line = (...args) => {
        lines.push({ points: args[0], color: args[1], dash: args[2]?.dash });
        return line(...args);
      };
      return chart;
    };
  });
  await draw();
  await settle(page);
  return page.evaluate(() => ({ lines: window.track29Lines, palette: window.TRV.palette }));
}

async function checkMathematics(T) {
  const { check } = T;
  const lab = await T.open(BOOK, ID, `?lang=en&preset=${MERTENS}`, { reducedMotion: 'reduce', locale: 'en-US' });
  try {
    const baseline = await lab.evaluate(() => {
      const probe = window.PRIME_ZERO_DEBUG;
      return { bench: probe.bench(), data: probe.data(), mertens: probe.state.mertens };
    });
    const { bench, data, mertens } = baseline;
    const beta = lab.locator('#betaRange');
    const flat = await plottedLines(lab, () => beta.fill('0'));
    const flatState = await lab.evaluate(() => window.PRIME_ZERO_DEBUG.state.mertens);
    await beta.fill('100');
    await settle(lab);
    const intrinsic = await lab.evaluate(() => ({ lines: window.track29Lines, palette: window.TRV.palette }));
    const reference = intrinsic.lines.plot?.find(({ color, dash }) => color === intrinsic.palette.violet && dash?.length);
    const [first, last] = reference ? [reference.points[0], reference.points.at(-1)] : [[0, 0], [0, 0]];
    const measured = (last[1] - first[1]) * mertens.table.at(-1).m / ((last[0] - first[0]) * Math.log(1e6));
    check('Mertens: the dashed entropy reference has unit slope in unscaled coordinates', near(measured, 1), String(measured));
    const secant = (mertens.table[5].m - mertens.table[4].m) / Math.log(10);
    check('Mertens: the empirical entropy secant approaches 1 and is printed with ≈',
      near(mertens.slope, secant) && near(secant, 1, 0.01) && normalize(await lab.locator('#roMertens').innerText()).includes('≈'), String(secant));
    const flatDensity = (mertens.table[5].pi - mertens.table[4].pi) / (9e5);
    check('Mertens: at β = 0 the reference vanishes and counting density is consistent with 1/ln x',
      flatState.b === 0 && flat.lines.plot?.length === 1 &&
      near(flatDensity, 1 / Math.log(1e6), 0.006), String(flatDensity));

    await lab.locator(`[data-preset="${UNFOLD}"]`).click();
    await settle(lab);
    const turns = bench.unfold;
    for (const [name, actual, want] of [['ũ₁', turns.u1, 0.9497], ['ũ₁₅', turns.u15, 15.2433], ['14-gap mean', turns.gap14, 1.0210]]) {
      check(`unfolding: ${name} ≈ ${want.toFixed(4)}`, near(actual, want, 0.00005), String(actual));
    }
    check('unfolding: the 14-gap mean is the endpoint difference divided by 14', near(turns.gap14, (turns.u15 - turns.u1) / 14));
    const note = normalize(await lab.locator('#roNote').innerText());
    check('unfolding: displayed turns and mean use ≈ for rounded decimals', /at ≈ 0\.9497\b/.test(note) && /spacings ≈ 1\.0210\b/.test(note), note);

    const plot = await lab.evaluate(() => ({ lines: window.track29Lines.plotB, ink: window.TRV.palette.ink }));
    const gue = plot.lines?.find(({ color, dash }) => color === plot.ink && dash?.length)?.points || [];
    for (const [length, expected, tolerance] of [[0, 0, 0], [0.3, 0.214239, 0.000002], [6, 0.527494, 0.0000001]]) {
      const actual = gue.find(([x]) => near(x, length))?.[1];
      check(`GUE: plotted integral at L = ${length} is ${expected}, with zero offset`,
        near(actual, gueVariance(length), 1e-9) && near(actual, expected, tolerance), String(actual));
    }

    await lab.locator(`[data-preset="${LANDAU}"]`).click();
    await settle(lab);
    const landau = (q, K) => -2 * Math.PI * data.gamma.slice(0, K).reduce((sum, gamma) => sum + Math.cos(gamma * Math.log(q)), 0) / data.gamma[K - 1];
    const powers = { 2: 2, 3: 3, 4: 2, 5: 5, 7: 7, 8: 2, 9: 3 };
    for (const [q, p] of Object.entries(powers)) {
      const { value, target } = bench.landau[q];
      check(`Landau: q = ${q} peaks near ln(${p}) / √${q} at K = 100`,
        near(target, Math.log(p) / Math.sqrt(q)) && near(value, landau(Number(q), 100)) && value > 0.2 && near(value, target, 0.07), String(value));
    }
    for (const gate of data.gates.filter(({ id }) => !Object.hasOwn(powers, id))) {
      const { value, target } = bench.landau[gate.id];
      const q = gate.a / gate.b;
      const limit = gate.id === '15/14' ? 0.25 : 0.1;
      check(`Landau: q = ${gate.id} has exact zero target and a finite-window residual`,
        target === 0 && near(value, landau(q, 100)) && Math.abs(value) < limit, String(value));
    }
    const transient = await lab.evaluate(() => window.PRIME_ZERO_DEBUG.core.landau('15/14', 15));
    const residual = bench.landau['15/14'].value;
    check('Landau: the 15/14 near-resonance weakens from K = 15 to K = 100',
      near(transient, landau(15 / 14, 15)) && Math.abs(residual) < Math.abs(transient) / 3, `${transient} → ${residual}`);
    await lab.locator('[data-gate="15/14"]').click();
    await settle(lab);
    const probe = normalize(await lab.locator('#roLandau').innerText());
    check('Landau: the rational gate uses = for the zero target and ≈ for the residual', /≈ [^·]+· = 0 · ≈ /.test(probe), probe);

    for (const p of [5, 13, 17, 29]) {
      const rotors = lipschitzRotors(p);
      const distinct = new Set(rotors.map((q) => q.join(','))).size;
      check(`Haar: p = ${p} gives ${p + 1} distinct Lipschitz rotors on S³`,
        distinct === p + 1 && rotors.every((q) => near(q.reduce((sum, v) => sum + (v / Math.sqrt(p)) ** 2, 0), 1)), String(distinct));
      if (p === 13) {
        const displayed = data.rotors.filter(([w, ...v]) => w > 0 && w % 2 === 1 && v.every((x) => x % 2 === 0));
        check('Haar: the p = 13 visualization contains every Lipschitz representative among its 112 integer rotors',
          data.rotors.length === 8 * (p + 1) && same(displayed.map(String).sort(), rotors.map(String).sort()), String(data.rotors.length));
      }
    }
    check('Haar: the integer-rotor moments are exactly 1/2 and 1/16',
      same(mertens.rot.meanK.q, ['1', '2']) && same(mertens.rot.varK.q, ['1', '16']));
    check('Haar: the visualization checks Jacobi’s count at every prime through 199', bench.haar.primes === 46 && bench.haar.jacobiBad === 0);
    const haar = normalize(await lab.locator('#roHaar').innerText());
    check('Haar: exact moments use equality in the readout', /112 · = 1\/2 · = 1\/16/.test(haar), haar);

    await lab.locator(`[data-preset="${MODULAR}"]`).click();
    await settle(lab);
    const modular = normalize(await lab.locator('#roModular').innerText());
    const identity = normalize(await lab.locator('#roKey').innerText());
    check('modulo q: the totient invariant uses = and the empirical deviation uses ≈',
      /\d+ × 1\/φ\(q\) = 1/.test(identity) && /^\d+ · \d+ · ≈ /.test(modular), `${identity} · ${modular}`);
  } finally {
    await lab.context().close();
  }
}
