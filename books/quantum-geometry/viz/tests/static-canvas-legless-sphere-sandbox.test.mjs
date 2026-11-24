import fs from 'node:fs';
import path from 'node:path';
import { leanUrl, readLock, readRegistry, resolveBook, vizCitations } from '../../../../tools/node/viz-common.mjs';
import { cjkLeftovers, openStill, overflowX, session, settle, stageFirstChecks, until, viewportShare } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry';
const ID = 'static-canvas-legless-sphere-sandbox';
const SECTION = 'ch38-s15-static-canvas-and-legless-sphere-observer';
const LANGS = ['zh', 'en'];
const CARDS = [
  { id: 'single-gradient-memory-spacetime-projection', scene: 'split', cam: 'panorama', still: 20, key: '16/25 + 9/25 = 1' },
  { id: 'portfree-legless-sphere-heap-geodesic', scene: 'heap', cam: 'panorama', still: 8, key: '25/26' },
  { id: 'gullstrand-painleve-tilted-cone-supercritical', scene: 'cone', cam: 'side', still: 5, key: '1 - η = -1/2' },
  { id: 'transverse-yaw-scenery-atlas-branching', scene: 'yaw', cam: 'above', still: 30, key: '(-9/10, 4/5)' },
  { id: 'wheeler-dewitt-static-canvas-frame-reversal', scene: 'wdw', cam: 'panorama', still: 3, key: 'ΔD = -1/4' }
];
const OPEN = [
  'ch34-s24-interaction-sign-and-sagitta-composition.html#prob-ch34-gravity-dynamics-and-coupling',
  'appendix-d.html#prob-appendix-d-time-horizon'
];
const CONE_STOPS = [[1, 3n, 5n, 'sub'], [3, 1n, 1n, 'critical'], [5, 3n, 2n, 'super']];
const YAW_STOPS = [[10, -1n, 'dagL'], [30, 1n, 'dagR']];
const MEMORY = [4n, 3n, 2n, 1n].map((n) => fraction(n, 4n));
const AMBER_MARKS = ['ring:focus', 'ring:halo', 'bead:tip', 'bead:current'];
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const clean = (s) => s.replaceAll('−', '-').replace(/\s+/g, ' ').trim();

function fraction(n, d) {
  let a = n < 0n ? -n : n;
  let b = d;
  while (b !== 0n) [a, b] = [b, a % b];
  return [n / a, d / a].map(String);
}

function fractionText([n, d]) {
  return d === '1' ? n : `${n}/${d}`;
}

function circle(a, b) {
  return [fraction(b * b - a * a, b * b + a * a), fraction(2n * a * b, b * b + a * a)];
}

const T = await session();
const { check } = T;
await stageFirstChecks(T, BOOK, ID, { solid: true });

const book = resolveBook(BOOK);
const entry = readRegistry(book).visualizations.find((v) => v.id === ID);
const lock = readLock();
const chapterGids = LANGS.map((lang) => {
  const chapter = fs.readFileSync(path.join(book.dir, lang, SECTION + '.md'), 'utf8');
  return chapter.match(/#thm-ch38-static-canvas-legless-sphere-anchors [^\n]*\blean="([^"]+)"/)?.[1].split(',') ?? [];
});
const gids = chapterGids[0];
const ids = CARDS.map(({ id }) => id);
check('registration: OMEGA//CANVAS is live in Chapter 38 §38.15', entry.code === 'OMEGA//CANVAS' && entry.status === 'live' && entry.chapter === 38 && entry.section === '38.15');
check('registration: both chapters and the registry agree on 16 unique frozen theorems',
  new Set(gids).size === 16 && same(gids, chapterGids[1]) && same(gids, entry.lean.map(({ gid }) => gid))
    && gids.every((gid) => lock.declarations[gid]?.kind === 'theorem'));
check('registration: English title and summary contain no Chinese',
  [entry.title_en, entry.summary_en].every((s) => /[A-Za-z]/.test(s) && !/\p{Script=Han}/u.test(s)));
check('registration: each edition cites all five cards at 540px and the full lab at 620px',
  same(entry.presets, ids) && LANGS.every((lang) => {
    const citations = vizCitations(book, ID).filter((c) => c.lang === lang);
    return same(citations.map((c) => [c.preset || '', c.height]), [...ids.map((id) => [id, 540]), ['', 620]]);
  }));

async function state(page) {
  return page.evaluate(() => window.CANVAS_DEBUG.state);
}

async function output(page, id) {
  return clean(await page.locator('#' + id).textContent());
}

function ready(page, card) {
  return until(page, ({ scene, still }) => {
    const s = window.CANVAS_DEBUG.state;
    return s.scene === scene && s.clock === still && !s.playing && !s.blending;
  }, card, 5000);
}

async function selectCard(page, card) {
  await page.locator(`[data-preset="${card.id}"]`).click();
  const parked = await ready(page, card);
  await settle(page);
  return parked;
}

async function readEvidence(page, selector) {
  return page.locator(selector).evaluate((panel) => ({
    boxes: [...panel.querySelectorAll('.lean')].map((box) => ({
      type: box.className,
      label: box.querySelector('.ok')?.textContent,
      color: getComputedStyle(box.querySelector('.ok')).color,
      links: [...box.querySelectorAll('[data-lean-gid]')].map((a) => [a.dataset.leanGid, a.href])
    })),
    open: [...panel.querySelectorAll('.lean.open a')].map((a) => [a.getAttribute('href'), a.target]),
    reserved: ['--ok', '--warn'].map((name) => {
      const sample = document.createElement('span');
      sample.style.color = `var(${name})`;
      panel.append(sample);
      const color = getComputedStyle(sample).color;
      sample.remove();
      return color;
    })
  }));
}

const lab = await T.open(BOOK, ID, '?lang=en', {
  viewport: { width: 1080, height: 900 }, locale: 'en-US', reducedMotion: 'reduce'
});
await settle(lab);
const evidence = await readEvidence(lab, '#basis');
const verified = evidence.boxes.filter((box) => box.type === 'lean');
const [green, red] = evidence.reserved;
check('evidence: exactly 16 green theorem boxes with one matching permalink each',
  same(verified.map(({ links }) => links), gids.map((gid) => [[gid, leanUrl(lock, gid)]]))
    && verified.every(({ label, color }) => label === 'LEAN ✓' && color === green));
check('evidence: red belongs to OPEN and green to the 16 theorem boxes',
  evidence.boxes.every(({ type, color }) => (color === green) === (type === 'lean') && (color === red) === (type === 'lean open'))
    && same(evidence.boxes.slice(16).map(({ type }) => type), ['lean argued', 'lean model', 'lean open', 'lean num']));
check('evidence: OPEN links point to both chapter problems in both editions',
  same(evidence.open, LANGS.flatMap((lang) => OPEN.map((target) => [`../../${lang}/${target}`, '_top']))));
await lab.locator('#infoBtn').click();
check('evidence: the drawer shows the same theorem and OPEN links', same(await readEvidence(lab, '#drawerEvidence'), evidence));
await lab.keyboard.press('Escape');

// Read the same drawing commands that feed the shared renderer and retain their screen positions.
async function watchDrawing(page) {
  await page.evaluate(() => {
    const solid = window.TRV.solids[0];
    const frames = window.canvasTestFrame = { marks: [] };
    const begin = solid.begin.bind(solid);
    solid.begin = (...args) => {
      frames.marks = [];
      return begin(...args);
    };
    for (const method of ['surface', 'glass', 'tube', 'line', 'arrow', 'ring', 'bead', 'poly', 'tag']) {
      const draw = solid[method].bind(solid);
      solid[method] = (...args) => {
        const options = args.at(-1);
        const key = typeof args[0] === 'string' ? args[0] : options?.key;
        frames.marks.push({ method, key, colors: [options?.color, options?.grid?.color, ...(options?.colors ?? [])] });
        if (method === 'surface' && key === 'canvas') {
          const surface = args[1];
          frames.canvas = [[0.4, 0], [0.8, Math.PI / 2], [1.2, Math.PI]].map(([r, angle]) => solid.p(surface(r, angle)).slice(0, 2));
        }
        if (method === 'glass' && key === 'ball') {
          frames.sphere = solid.p(args[1]).slice(0, 2);
          frames.radius = solid.unit * args[2];
        }
        return draw(...args);
      };
    }
    window.dispatchEvent(new Event('resize'));
  });
  await settle(page);
}

async function raster(page, selector, palette, sphere, radius) {
  const element = page.locator(selector);
  const png = (await element.screenshot({ scale: 'css' })).toString('base64');
  return page.evaluate(async ({ png, palette, sphere, radius }) => {
    const img = new Image();
    img.src = 'data:image/png;base64,' + png;
    await img.decode();
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const pixels = ctx.getImageData(0, 0, img.width, img.height).data;
    const toRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
    const green = toRgb(palette.ok);
    const red = toRgb(palette.warn);
    const counts = { green: 0, red: 0, violet: 0 };
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
      // Match the reserved tokens with room for antialiasing against the dark stage.
      if (Math.hypot(r - green[0], g - green[1], b - green[2]) <= 30) counts.green++;
      if (Math.hypot(r - red[0], g - red[1], b - red[2]) <= 30) counts.red++;
      const p = i / 4;
      if (sphere && b > r + 35 && r > g + 8 && Math.hypot(p % img.width - sphere[0], Math.floor(p / img.width) - sphere[1]) <= radius) counts.violet++;
    }
    return counts;
  }, { png, palette, sphere, radius });
}

async function lens(page, button, value, key) {
  await page.locator(button).click();
  const settled = await until(page, (value) => window.CANVAS_DEBUG.state.lensT === value, value, 5000);
  await settle(page);
  const pressed = await page.locator('#lensToggleBtn, #lensMirror').evaluateAll((buttons) => buttons.map((b) => b.getAttribute('aria-pressed')));
  const badge = await page.locator('#lensBadge').getAttribute('data-lens');
  check(`${button} switches both controls to Lens ${value} while keeping the reading`,
    settled && same(pressed, [String(value === 1), String(value === 1)]) && badge === String(value) && await output(page, 'roKey') === key);
}

await watchDrawing(lab);
for (const card of CARDS) {
  const parked = await selectCard(lab, card);
  const s = await state(lab);
  const key = await output(lab, 'roKey');
  check(`${card.scene}: the card selects its view and exact still reading`,
    parked && s.preset === card.id && s.cam === card.cam && key.includes(card.key), key);
  for (const value of [0, 1]) {
    if (value === 1) await lens(lab, '#lensToggleBtn', 1, key);
    const { frame, palette, controls } = await lab.evaluate(() => {
      const swatch = document.querySelector('#legend .sw.am');
      const stageHandle = document.querySelector('#stageHandle');
      const active = document.querySelector('.preset[aria-pressed="true"]');
      const amber = getComputedStyle(stageHandle).borderTopColor;
      const segments = [...document.querySelectorAll('#lensToggleBtn .seg')].map((el) => getComputedStyle(el).backgroundColor);
      return {
        frame: window.canvasTestFrame,
        palette: window.TRV.palette,
        controls: {
          handle: !stageHandle.hidden && swatch && amber === getComputedStyle(swatch).backgroundColor,
          card: !!active && getComputedStyle(active).borderTopColor === amber,
          segments: segments.map((color) => color === amber)
        }
      };
    });
    const forbidden = frame.marks.filter(({ colors }) => colors.includes(palette.warn) || colors.includes(palette.ok));
    const amber = frame.marks.filter(({ colors }) => colors.includes(palette.amber)).map(({ method, key }) => `${method}:${key}`);
    check(`${card.scene}, Lens ${value}: violet sphere and amber restricted to active marks`,
      frame.marks.some(({ method, key, colors }) => method === 'glass' && key === 'ball' && colors.includes(palette.violet))
        && amber.includes('ring:focus') && amber.every((mark) => AMBER_MARKS.includes(mark))
        && controls.handle && controls.card && same(controls.segments, [value === 0, value === 1]),
      JSON.stringify({ amber, controls }));
    const stage = await raster(lab, '#stage', palette, frame.sphere, frame.radius);
    const plots = await raster(lab, '.strip', palette, null, 0);
    check(`${card.scene}, Lens ${value}: zero green or red geometry pixels and visible violet at the sphere`,
      !forbidden.length && stage.green + stage.red + plots.green + plots.red === 0 && stage.violet >= 12,
      JSON.stringify({ forbidden, stage, plots }));
  }
  await lens(lab, '#lensMirror', 0, key);
}

const [split, heap, cone, yaw, wdw] = CARDS;
await selectCard(lab, split);
const [cos, sin] = circle(1n, 3n);
const [cn, cd] = cos.map(BigInt);
const [sn, sd] = sin.map(BigInt);
const inside = fraction(cn * cn, cd * cd);
const outside = fraction(sn * sn, sd * sd);
const sum = fraction(cn * cn * sd * sd + sn * sn * cd * cd, cd * cd * sd * sd);
const p = (await state(lab)).split;
check('split: the reduced BigInt fractions give 16/25 + 9/25 = 1',
  same([p.cos.q, p.sin.q, p.kt.q, p.ks.q, p.sum.q], [cos, sin, inside, outside, sum])
    && (await output(lab, 'roSplit')).endsWith('16/25 + 9/25 = 1'));

await selectCard(lab, heap);
const h = (await state(lab)).heap;
// Multiply (12 + 5i) eight times and keep the denominator common.
let [re, im] = [1n, 0n];
for (let n = 0; n < 8; n++) [re, im] = [12n * re - 5n * im, 5n * re + 12n * im];
const denominator = 13n ** 8n;
check('heap: eight exact quaternion beats, pushes 0 for the sphere and 8 for the walker',
  h.n === 8 && h.sphere === 0 && h.walker === 8
    && same(h.x, [fraction(re, denominator), fraction(im, denominator), ['0', '1'], ['0', '1']])
    && same(h.kappa.q, fraction(denominator + re, 2n * denominator))
    && (await output(lab, 'roHeap')).endsWith('0 / 8')
    && (await output(lab, 'hudTl')).includes('pushes sphere 0 · walker 8'));

async function scrub(page, n) {
  await page.locator('#now').fill(String(n));
  await settle(page);
}

function drift(a, b) {
  return Math.max(...a.map(([x, y], i) => Math.hypot(x - b[i][0], y - b[i][1])));
}

async function projection(page, n) {
  await scrub(page, n);
  const { canvas, sphere } = await page.evaluate(() => window.canvasTestFrame);
  return { canvas, sphere };
}

for (const card of [heap, wdw]) {
  await selectCard(lab, card);
  const initial = await projection(lab, 0);
  const end = await projection(lab, card.still);
  const stillCanvas = drift(initial.canvas, end.canvas);
  const rollingSphere = drift([initial.sphere], [end.sphere]);
  // Projections are in CSS pixels. Permit only floating-point roundoff below one millionth of a pixel.
  check(`${card.scene}: Lens 0 canvas drift is 0 px while the sphere moves`, stillCanvas < 1e-6 && rollingSphere > 5,
    `canvas ${stillCanvas}px, sphere ${rollingSphere}px`);
  const key = await output(lab, 'roKey');
  await lens(lab, '#lensMirror', 1, key);
  const centredEnd = await projection(lab, card.still);
  const centredStart = await projection(lab, 0);
  const stillSphere = drift([centredStart.sphere], [centredEnd.sphere]);
  const movingCanvas = drift(centredStart.canvas, centredEnd.canvas);
  check(`${card.scene}: Lens 1 sphere drift is 0 px while the canvas moves`, stillSphere < 1e-6 && movingCanvas > 5,
    `sphere ${stillSphere}px, canvas ${movingCanvas}px`);
  await lens(lab, '#lensToggleBtn', 0, await output(lab, 'roKey'));
}

await selectCard(lab, cone);
for (const [stop, n, d, regime] of CONE_STOPS) {
  await lab.locator(`[data-eta="${stop}"]`).click();
  await settle(lab);
  const c = (await state(lab)).cone;
  const outward = fraction(d - n, d);
  const metric = fraction(d * d - n * n, d * d);
  check(`cone: η = ${fractionText(fraction(n, d))} gives outward rim ${fractionText(outward)} (` + regime + ')',
    c.regime === regime && same(c.out.q, outward) && same(c.gtt.q, metric)
      && (await output(lab, 'roCone')).endsWith(' · ' + fractionText(outward)));
}

await selectCard(lab, yaw);
for (const [stop, sign, branch] of YAW_STOPS) {
  await lab.locator(`[data-yaw="${stop}"]`).click();
  await settle(lab);
  const y = (await state(lab)).yaw;
  const [c, lateral] = circle(sign, 2n);
  const [n, d] = c.map(BigInt);
  const radial = fraction(2n * n - 3n * d, 2n * d);
  const pair = `(${fractionText(radial)}, ${fractionText(lateral)})`;
  check(`yaw: branch ${branch} shows ${pair} on the exact unit rim`,
    y.branch === branch && same([y.dr.q, y.vp.q, y.rim.q], [radial, lateral, ['1', '1']])
      && (await output(lab, 'roYaw')).endsWith(pair));
}

await selectCard(lab, wdw);
for (const [ptr, value] of MEMORY.entries()) {
  await lab.locator(`[data-cur="${ptr}"]`).click();
  await settle(lab);
  const q = (await state(lab)).wdw;
  const delta = ptr === 0 ? null : fraction(-1n, 4n);
  check(`memory: ptr ${ptr} reads ${fractionText(value)} with no writes to D`,
    q.ptr === ptr && same(q.D.q, value) && same(q.dD?.q ?? null, delta) && q.mem === 0
      && await output(lab, 'roQram') === `${ptr} · ${fractionText(value)} · ${delta ? fractionText(delta) : '—'} · ${ptr} / ${4 * ptr}`);
}
await lab.context().close();

for (const lang of LANGS) {
  for (const [width, height, query] of [[390, 844, ''], [740, 620, '&embed=1']]) {
    const page = await T.open(BOOK, ID, `?lang=${lang}${query}`, { viewport: { width, height }, reducedMotion: 'reduce' });
    await settle(page);
    const share = await viewportShare(page, '#stage');
    const leftover = lang === 'en' ? await cjkLeftovers(page) : [];
    check(`${lang} ${width}×${height}: the full lab is localized and its stage fits`,
      await overflowX(page) === 0 && share >= 0.4 && !leftover.length && (await state(page)).preset === split.id,
      JSON.stringify({ share, leftover }));
    await page.context().close();
  }
  for (const card of CARDS) {
    const page = await openStill(T, BOOK, ID, card.id, lang);
    const s = await state(page);
    const key = await output(page, 'roKey');
    check(`${lang} ${card.scene}: the still keeps the exact reading and hides the drag handle`,
      s.clock === card.still && !s.playing && key.includes(card.key) && await page.locator('#stageHandle').isHidden()
        && (lang !== 'en' || !(await cjkLeftovers(page)).length),
      key);
    await page.context().close();
  }
}

check('zero shared quality warnings', T.warnings.length === 0, JSON.stringify(T.warnings));
check('zero browser or request errors', T.errors.length === 0, T.errors.slice(0, 5).join(' | '));
await T.finish();
