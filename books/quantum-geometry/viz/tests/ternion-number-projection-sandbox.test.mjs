import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  session,
  stageFirstChecks,
  settle,
  openStill,
  playsAfter,
  until,
  stageView,
  cjkLeftovers,
  capitalGreek,
  overflowX,
  labelOverlaps
} from '../../../../tools/node/viz-testkit.mjs';
import { ROOT } from '../../../../tools/node/viz-common.mjs';

const BOOK = 'quantum-geometry';
const ID = 'ternion-number-projection-sandbox';
const DIR = path.join(ROOT, 'books', BOOK, 'viz', ID);
const THEORY =
  'ch39-s19-inexpressible-ternions-and-number-projections.html#sec-ch39-inexpressible-ternions-and-number-projections';
const SECTION = '32.2';
const CARDS = {
  'flat-3d-zero-divisor-gimbal-deadlock': { thetaDeg: 179, tilt: 45, rat: 0, cam: 'deadlock', play: true },
  'hamilton-quaternion-w-shadow-tax': { thetaDeg: '2star', tilt: 35, rat: 1, cam: 'panorama', play: true },
  'complex-equatorial-hopf-slice': { thetaDeg: 120, tilt: 0, rat: 1, cam: 'channels', play: true },
  'real-trace-geodesic-projection': { thetaDeg: 360, tilt: 30, rat: 2, cam: 'channels', play: true },
  'homotopy-pi3-integer-winding': { thetaDeg: 720, tilt: 35, rat: 3, cam: 'panorama', play: false }
};
const DEFAULT = 'hamilton-quaternion-w-shadow-tax';
const CAM_NAMES = ['deadlock', 'panorama', 'channels'];
const CURSOR = /cursor|handle|active/i;
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, tol = 1e-9) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
const f4 = (v) => (Math.abs(v) < 5e-5 ? 0 : v).toFixed(4);

/* ---------- independent mathematics, written here and never calling the page ---------- */
const DEG = Math.PI / 180;
/** θ* by Newton's method on cos t − t. */
function newtonFixedPoint() {
  let t = 1;
  for (let i = 0; i < 60; i++) t -= (Math.cos(t) - t) / (-Math.sin(t) - 1);
  return t;
}
const TS = newtonFixedPoint(),
  TS_DEG = TS / DEG,
  STAR2_DEG = 2 * TS_DEG;
const cardTheta = (c) => (CARDS[c].thetaDeg === '2star' ? STAR2_DEG : CARDS[c].thetaDeg);

const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const norm = (a) => Math.sqrt(dot(a, a));
const sub = (a, b) => a.map((x, i) => x - b[i]);
const scale = (a, k) => a.map((x) => x * k);
const unit = (a) => scale(a, 1 / norm(a));
const transpose = (M) => M[0].map((_, j) => M.map((row) => row[j]));
/** Girard: the area of the geodesic triangle ABC is the sum of its angles minus π (angles from tangent vectors). */
function girard(A, B, C) {
  const angle = (P, Q, R) => {
    const t1 = unit(sub(Q, scale(P, dot(P, Q)))),
      t2 = unit(sub(R, scale(P, dot(P, R))));
    return Math.acos(Math.max(-1, Math.min(1, dot(t1, t2))));
  };
  return angle(A, B, C) + angle(B, C, A) + angle(C, A, B) - Math.PI;
}
const T = await session();
const { page, check } = T;
// Headless Chromium can report driver diagnostics as warnings. They are harmless; every other warning is a failure.
const driverInfo =
  /KHR_parallel_shader_compile|GPU stall due to ReadPixels|SwiftShader|GL Driver Message|WEBGL_debug_renderer_info/;
const browserWarnings = [];
const watched = new WeakSet();
function watchPage(p) {
  if (watched.has(p)) return;
  watched.add(p);
  p.on('console', (m) => {
    if ((m.type() === 'info' || m.type() === 'warning') && driverInfo.test(m.text())) return;
    if (m.type() === 'warning') browserWarnings.push(`${p.url()}: ${m.text()}`);
  });
}
// The lab is a permanent night console: record every attempt to write data-tr-palette, from before page scripts run.
const paletteMutations = [],
  paletteDocuments = [];
async function watchPalette(context) {
  await context.exposeBinding('__ternionPaletteAudit', ({ page: p }, record) => {
    (record.kind === 'mutation' ? paletteMutations : paletteDocuments).push({ url: p.url(), ...record });
  });
  await context.addInitScript(() => {
    new MutationObserver((records) => {
      for (const r of records)
        window
          .__ternionPaletteAudit({ kind: 'mutation', old: r.oldValue, value: r.target.getAttribute('data-tr-palette') })
          .catch(() => {});
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-tr-palette'] });
    document.addEventListener(
      'DOMContentLoaded',
      () =>
        window
          .__ternionPaletteAudit({
            kind: 'document',
            absent: document.documentElement.dataset.trPalette === undefined,
            dark: matchMedia('(prefers-color-scheme: dark)').matches
          })
          .catch(() => {}),
      { once: true }
    );
  });
  context.on('page', watchPage);
  context.pages().forEach(watchPage);
}
let colorScheme = 'dark';
await watchPalette(T.context);
const browserNewContext = T.browser.newContext.bind(T.browser);
T.browser.newContext = async (options) => {
  const context = await browserNewContext({ ...options, colorScheme });
  await watchPalette(context);
  return context;
};
watchPage(page);

// the shared gate: stage share, cards, drawer, honest labels, English, embeds, rail, cited figures, phone, cover, motion,
// and the lit-solid checks of kit.solid (opaque share, shading, turning, a hidden mark behind the core, resting)
await stageFirstChecks(T, BOOK, ID, { solid: true });

/* ---------- sources, registry and lock ---------- */
const sources = Object.fromEntries(
  ['index.html', 'main.js', 'style.css'].map((f) => [f, fs.readFileSync(path.join(DIR, f), 'utf8')])
);
const suite = fs.readFileSync(fileURLToPath(import.meta.url), 'utf8');
const registry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8'));
const entry = (registry.visualizations || []).find((v) => v.id === ID) || null;
const entryText = JSON.stringify(entry || {});
const GIDS = [
  'D5/S3/Quantum/SpinFactor/OriginalClassification.complete_consequences',
  'D5/S3/Quantum/Information/ActualPureQubitGeometry.bloch_geometry_of_isHermitian',
  'D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word',
  'D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.shortest_gate_triangle_holonomy',
  'D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary',
  'D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section',
  'D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift',
  'D5/S3/Arith/RepeatingDecimal/RepeatingDecimalQuotient.long_division_invariant',
  'D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula',
  'D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint'
];
// forbidden words are kept as code points so this suite itself carries no such identifier
const [numbered, ...forbidden] = [
  [103, 112, 116],
  [99, 108, 97, 117, 100, 101],
  [97, 110, 116, 104, 114, 111, 112, 105, 99],
  [111, 112, 101, 110, 97, 105],
  [103, 101, 109, 105, 110, 105],
  [99, 111, 100, 101, 120],
  [99, 111, 112, 105, 108, 111, 116],
  [111, 112, 117, 115],
  [115, 111, 110, 110, 101, 116],
  [104, 97, 105, 107, 117],
  [108, 108, 109],
  [97, 103, 101, 110, 116],
  [99, 104, 97, 116, 98, 111, 116],
  [100, 101, 101, 112, 109, 105, 110, 100]
].map((codes) => String.fromCharCode(...codes));
const identifiers = new RegExp(`\\b(?:${forbidden.join('|')}|${numbered}-?\\d)\\b`, 'i');
const shortAcronym = new RegExp(`\\b${String.fromCharCode(65, 73)}\\b`);
const cjkTerms = new RegExp(
  [
    [22823, 27169, 22411],
    [26234, 33021, 20307],
    [20154, 24037, 26234, 33021]
  ]
    .map((c) => String.fromCharCode(...c))
    .join('|')
);
const literalColour = /#(?:[\da-f]{3,8})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/i;
for (const [file, src] of Object.entries(sources)) {
  check(
    `source ${file}: no literal colour and no palette switch`,
    !literalColour.test(src) && !/\btrPalette\b|data-tr-palette|[?&]theme=/.test(src)
  );
  check(
    `source ${file}: no model, vendor or tool identifiers`,
    !identifiers.test(src) && !shortAcronym.test(src) && !cjkTerms.test(src)
  );
}

check(
  'reserved identifiers are absent from the suite and registry entry',
  [suite, entryText].every((src) => !identifiers.test(src) && !shortAcronym.test(src) && !cjkTerms.test(src))
);
check(
  'registration matches the standalone section, all five cards and all ten GIDs',
  entry.chapter === 32 &&
    entry.section === SECTION &&
    entry.code === 'TERNION//NUMBERS' &&
    same(entry.presets, Object.keys(CARDS)) &&
    same(
      entry.lean.map((x) => x.gid),
      GIDS
    ) &&
    entry.theory[0].href === '../zh/' + THEORY &&
    entry.theory[0].href_en === '../en/' + THEORY
);
/* ---------- helpers on the page ---------- */
const state = (p = page) => p.evaluate(() => window.TERNION_NUMBERS_DEBUG.state);
async function input(selector, value, p = page) {
  await p.locator(selector).evaluate((el, v) => {
    el.value = String(v);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }, value);
  await settle(p);
}
async function pause(p = page) {
  await settle(p);
  await p.locator('#play').evaluate((b) => {
    if (b.getAttribute('aria-pressed') === 'true') b.click();
  });
  await settle(p);
}
async function pick(card, p = page) {
  await p.click(`[data-preset="${card}"]`);
  await settle(p);
  await until(
    p,
    (id) => {
      const s = window.TERNION_NUMBERS_DEBUG.state;
      return s.preset === id && !s.blending;
    },
    card
  );
  await pause(p);
}
async function seek(t, p = page) {
  await p.locator('#now').evaluate((el, v) => {
    el.value = String(v);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }, t);
  await settle(p);
}
const railMax = async (p = page) => Number(await p.getAttribute('#now', 'max'));
/** The frame a card declares for its still (kit.cards writes data-still): a clock time, or 'end' for the end of the rail. */
async function cardStill(card, p = page) {
  const v = await p.getAttribute(`[data-preset="${card}"]`, 'data-still');
  if (v === 'end') return railMax(p);
  return v == null || v === '' ? NaN : Number(v);
}
/** Record the colour of every primitive of the next frame (the page calls sc.<primitive> by name at draw time). */
async function primitiveColours(p = page) {
  return p.evaluate(async () => {
    const sc = window.TRV.solids[0],
      seen = [],
      names = ['surface', 'tube', 'line', 'circle', 'arrow', 'bead', 'ring', 'fan', 'poly', 'glass'],
      saved = {};
    for (const n of names) {
      saved[n] = sc[n];
      sc[n] = (...a) => {
        const style =
          n === 'circle'
            ? a[3]
            : n === 'glass'
              ? a[3]
              : n === 'line' || n === 'arrow' || n === 'bead' || n === 'ring' || n === 'fan'
                ? a[n === 'arrow' ? 2 : 1]
                : a[2];
        const key = n === 'surface' || n === 'tube' || n === 'poly' || n === 'glass' ? a[0] : (style && style.key) || n;
        const s = style || {};
        seen.push({ n, key: String(key), colors: [s.color, s.fill, s.edges, ...(s.colors || [])].filter(Boolean) });
        return saved[n](...a);
      };
    }
    window.TRV.kit.flush();
    for (const n of names) sc[n] = saved[n];
    const P = window.TRV.palette;
    return { seen, amber: P.amber, ok: P.ok, warn: P.warn, cyan: P.cyan, magenta: P.magenta };
  });
}
const domColours = (p) =>
  p.evaluate(() => {
    const col = (v) => {
      const s = document.createElement('span');
      s.style.color = `var(${v})`;
      document.body.appendChild(s);
      const c = getComputedStyle(s).color;
      s.remove();
      return c;
    };
    const banned = [col('--amber'), col('--ok'), col('--warn')],
      bad = [];
    for (const el of document.querySelectorAll('#stage *, .strip *, #readouts *, .field output')) {
      if (el.closest('.handle')) continue;
      const cs = getComputedStyle(el);
      for (const prop of ['color', 'backgroundColor', 'borderTopColor', 'borderLeftColor'])
        if (banned.includes(cs[prop])) bad.push(`${el.id || el.className || el.tagName} ${prop}`);
    }
    const channels = (c) => {
      const alpha = (a, pct) => (a == null ? 1 : Number(a) / (pct ? 100 : 1));
      let m = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:\s*[,/]\s*([\d.]+)(%?))?\s*\)$/.exec(c);
      if (m) return { rgb: [m[1], m[2], m[3]].map(Number), a: alpha(m[4], m[5]) };
      m = /^color\(srgb\s+([-\d.e]+)\s+([-\d.e]+)\s+([-\d.e]+)(?:\s*\/\s*([\d.]+)(%?))?\s*\)$/.exec(c);
      if (m) return { rgb: [m[1], m[2], m[3]].map((x) => 255 * Number(x)), a: alpha(m[4], m[5]) };
      return null;
    };
    const amber = channels(col('--amber'));
    const ev = document.querySelector('#evidence');
    for (const el of [ev, ...ev.querySelectorAll('*')]) {
      const cs = getComputedStyle(el);
      for (const prop of [
        'color',
        'backgroundColor',
        'borderTopColor',
        'borderRightColor',
        'borderBottomColor',
        'borderLeftColor',
        'outlineColor',
        'textDecorationColor'
      ]) {
        const k = channels(cs[prop]);
        if (!k) bad.push(`#evidence ${el.className || el.tagName} ${prop} unreadable: ${cs[prop]}`);
        else if (k.a > 0 && amber && k.rgb.every((x, i) => Math.abs(x - amber.rgb[i]) < 1.5))
          bad.push(`#evidence ${el.className || el.tagName} ${prop} ${cs[prop]}`);
      }
    }
    return bad;
  });
/** The strip: the columns that carry amber pixels form one thin vertical cursor at the current θ. */
const stripAmber = (p) =>
  p.evaluate(() => {
    const cv = document.querySelector('#plot'),
      c = cv.getContext('2d', { willReadFrequently: true }),
      d = c.getImageData(0, 0, cv.width, cv.height).data;
    const s = document.createElement('span');
    s.style.color = 'var(--amber)';
    document.body.appendChild(s);
    const [ar, ag, ab] = getComputedStyle(s).color.match(/\d+/g).map(Number);
    s.remove();
    let x0 = Infinity,
      x1 = -Infinity,
      y0 = Infinity,
      y1 = -Infinity,
      n = 0;
    for (let y = 0; y < cv.height; y++)
      for (let x = 0; x < cv.width; x++) {
        const i = 4 * (y * cv.width + x);
        if (d[i + 3] > 200 && Math.abs(d[i] - ar) < 26 && Math.abs(d[i + 1] - ag) < 26 && Math.abs(d[i + 2] - ab) < 26) {
          n++;
          x0 = Math.min(x0, x);
          x1 = Math.max(x1, x);
          y0 = Math.min(y0, y);
          y1 = Math.max(y1, y);
        }
      }
    return { n, width: x1 - x0, height: y1 - y0, dpr: cv.width / cv.clientWidth, h: cv.height };
  });

const textOf = async (id, p = page) => (await p.locator('#' + id).innerText()).replaceAll('−', '-');
async function layout(p, label, figure = false) {
  const view = await stageView(p, '#stage', figure);
  const issues = [...view.layout, ...view.hud, ...(await labelOverlaps(p, '.stage .tag', 0)), ...(await capitalGreek(p))];
  check(label + ' framing and legible labels', !issues.length && (await overflowX(p)) === 0, JSON.stringify(issues));
}

const pairs = [
  [1, 7],
  [3, 5],
  [12, 35],
  [5, 13]
];
function expectedDecimal(p, q) {
  const rs = [],
    digits = [];
  for (let k = 0; ; k++) {
    const scaled = BigInt(p) * 10n ** BigInt(k);
    const r = Number(scaled % BigInt(q));
    const first = rs.indexOf(r);
    rs.push(r);
    if (r === 0 || first >= 0) {
      const cut = r === 0 ? digits.length : first;
      return { rs, prefix: digits.slice(0, cut).join(''), period: digits.slice(cut).join('') };
    }
    digits.push(Number(((scaled * 10n) / BigInt(q)) % 10n));
  }
}
function verifyMath(m, label) {
  const h = (m.thetaDeg * DEG) / 2;
  const w = Math.cos(h),
    imag = Math.abs(Math.sin(h));
  const pole = m.thetaDeg % 360 === 180;
  check(
    label + ' signed half-angle coordinates, unit norm and sagitta',
    near(m.w, w) && near(m.v, imag) && near(m.tax, 1 - w) && near(m.unit, 1)
  );
  check(
    label + ' Rodrigues pole or finite norm',
    m.pole === pole && (pole ? !Number.isFinite(m.rod) : near(m.rod, Math.abs(Math.tan(h)), 1e-6))
  );
  check(
    label + ' rotation trace from the spin character, complete turns',
    near(m.trace, 4 * w * w - 1) && m.n === Math.floor(m.thetaDeg / 360)
  );

  // Multiply x = w + bi + cj by each basis element in H, then delete the k component.
  const b = Math.cos(m.tiltDeg * DEG),
    c = Math.sin(m.tiltDeg * DEG);
  const projected = ([u, i, j]) => [w * u - b * i - c * j, w * i + b * u, w * j + c * u];
  const M = transpose(
    [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ].map(projected)
  );
  const residual = sub(projected(m.vNull), scale(m.vNull, m.lambda));
  check(
    label + ' explicit multiplication table, real root and two nonzero null factors',
    M.every((row, i) => row.every((x, j) => near(x, m.matrix[i][j]))) &&
      near(m.lambda, w) &&
      norm(m.vNull) > 0.99 &&
      Math.hypot(b, c) > 0.99 &&
      norm(residual) < 1e-12
  );
  check(
    label + ' spherical excess from the three interior angles',
    m.triangle.every((v) => near(norm(v), 1)) &&
      (m.tiltDeg === 0 ? m.omega === 0 : m.omega > 0 && near(girard(...m.triangle), m.omega, 1e-8))
  );
}
function verifyRatio(m) {
  const [p, q] = pairs[m.pqIndex],
    expected = expectedDecimal(p, q),
    actual = m.rat;
  check(
    p + '/' + q + ' exact remainder history and decimal cycle',
    actual.p === p &&
      actual.q === q &&
      same(actual.remainders, expected.rs) &&
      actual.pre === expected.prefix &&
      actual.period === expected.period
  );
  const known = [
    [[7, -1]],
    [
      [3, 1],
      [5, -1]
    ],
    [
      [2, 2],
      [3, 1],
      [5, -1],
      [7, -1]
    ],
    [
      [5, 1],
      [13, -1]
    ]
  ];
  let num = p,
    den = q;
  for (const { prime, v } of actual.factors) {
    if (v > 0) den *= prime ** v;
    else num *= prime ** -v;
  }
  check(
    p + '/' + q + ' each local norm and exact product',
    same(
      actual.factors.map((x) => [x.prime, x.v]),
      known[m.pqIndex]
    ) &&
      actual.factors.every((x) => near(x.norm, x.prime ** -x.v)) &&
      num === den &&
      near(actual.product, 1)
  );
}
const superscript = (n) => String(n).replace(/\d/g, (d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]);
/* 2 × 2 complex matrices from the Pauli matrices, written here: [re, im] entries */
const cx = (re, im = 0) => [re, im];
const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
const madd = (A, B) => A.map((row, i) => row.map((x, j) => [x[0] + B[i][j][0], x[1] + B[i][j][1]]));
const mscale = (A, z) => A.map((row) => row.map((x) => cmul(x, z)));
const mmul = (A, B) =>
  A.map((row, i) => B[0].map((_, j) => row.reduce((s, x, k) => [s[0] + cmul(x, B[k][j])[0], s[1] + cmul(x, B[k][j])[1]], [0, 0])));
const dagger = (A) => A[0].map((_, j) => A.map((row) => [row[j][0], -row[j][1]]));
const mgap = (A, B) => Math.max(...A.flatMap((row, i) => row.map((x, j) => Math.hypot(x[0] - B[i][j][0], x[1] - B[i][j][1]))));
const SX = [[cx(0), cx(1)], [cx(1), cx(0)]],
  SY = [[cx(0), cx(0, -1)], [cx(0, 1), cx(0)]],
  ID2 = [[cx(1), cx(0)], [cx(0), cx(1)]];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
/** The instances the evidence panel names, checked against algebra written here. */
function verifyInstances(m, label) {
  const I = m.leanInstances,
    a = m.tiltDeg * DEG;
  // the axis û = i cos α + j sin α as a 2 × 2 matrix under i ↦ −iσx, j ↦ −iσy
  const R = mscale(madd(mscale(SX, cx(Math.cos(a))), mscale(SY, cx(Math.sin(a)))), cx(0, -1));
  const neg = (A) => mscale(A, cx(-1));
  check(
    label + ' skew-adjoint unitary axis squares to −1',
    mgap(I.axis.R, R) < 1e-12 &&
      mgap(dagger(R), neg(R)) < 1e-12 &&
      mgap(mmul(R, dagger(R)), ID2) < 1e-12 &&
      mgap(I.axis.R2, neg(ID2)) < 1e-12 &&
      I.axis.skew < 1e-12 && I.axis.unitary < 1e-12 && I.axis.square < 1e-12
  );
  // the arc body U = w I + sin(θ/2) R has half trace w
  const h = (m.thetaDeg * DEG) / 2,
    U = madd(mscale(ID2, cx(Math.cos(h))), mscale(R, cx(Math.sin(h))));
  check(label + ' half trace of U is w', near((U[0][0][0] + U[1][1][0]) / 2, m.w) && mgap(mmul(U, dagger(U)), ID2) < 1e-12);
  // the shortest-gate triangle: S, D, S² + D² = 2(1 + a·b)(1 + b·c)(1 + c·a), phase argument −Ω/2
  const [A, B, C] = m.triangle,
    S = 1 + dot(A, B) + dot(B, C) + dot(C, A),
    D = dot(A, cross(B, C)),
    rhs = 2 * (1 + dot(A, B)) * (1 + dot(B, C)) * (1 + dot(C, A));
  check(
    label + ' triangle holonomy S² + D² and return phase',
    near(I.holonomy.S, S) && near(I.holonomy.D, D) && near(S * S + D * D, rhs) && near(I.holonomy.lhs, I.holonomy.rhs) &&
      rhs > 0 && near(Math.atan2(I.holonomy.phase[1], I.holonomy.phase[0]), -m.omega / 2, 1e-9)
  );
  // the lift z = e^{iθ/2} of z² = e^{iθ}; one turn from +1 ends at −1
  check(
    label + ' history lift squares to the base point',
    near(I.lift.z[0] ** 2 - I.lift.z[1] ** 2, Math.cos(2 * h)) && near(2 * I.lift.z[0] * I.lift.z[1], Math.sin(2 * h)) &&
      near(I.lift.z[0], Math.cos(h)) && I.lift.turns === Math.floor(m.thetaDeg / 360)
  );
  check(label + ' flat zero divisor residual', I.flat.residual < 1e-12 && near(I.flat.lambda, Math.cos(h)));
  check(label + ' cosine fixed point', near(I.fixedPoint.thetaStar, TS, 1e-12) && I.fixedPoint.residual < 1e-12);
}
async function verifyCard(p, id) {
  const m = await state(p),
    c = CARDS[id];
  check(
    id + ' angle, tilt, ratio, selected view and preset',
    m.preset === id && near(m.thetaDeg, cardTheta(id)) && m.tiltDeg === c.tilt && m.pqIndex === c.rat && m.cam === c.cam
  );
  verifyMath(m, id);
  verifyRatio(m);
}
await T.goto(BOOK, ID, '?lang=en');
await settle(page);
check('quaternion card opens by default', (await state()).preset === DEFAULT);
check(
  'three-column lab shell, panel badges, tagline, fonts and evidence spans',
  await page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const asides = [...document.querySelectorAll('.sec h2 .aside')].map((el) => el.textContent.trim());
    return (
      !!q('.app.lab > header.top .status #scenePill') && !!q('.app.lab > header.top .status #keyPill') &&
      !!q('#rail #lensPanel .lens-toggle') && !!q('#rail #presets') && !!q('#rail #ctlPanel #camChips') &&
      !!q('main.center > #stage > .scan') && !!q('main.center > #stage > .vig') && !!q('#stage > #hudTl #hudBig') &&
      !!q('main.center > .strip #plot') && !q('#stage .strip') &&
      !!q('aside.col.side > #readouts') && q('aside.col.side > #evidence').firstElementChild.id === 'infoBtn' &&
      ['§32.2', '5', 'NUM', 'trureturing'].every((x) => asides.includes(x)) &&
      [...document.querySelectorAll('.tagline > span')].every((el) => el.querySelector('em') && el.firstChild.nodeType === 3) &&
      !!q('link[href*="fonts.googleapis.com/css2?family=Chakra+Petch"]') &&
      [...document.querySelectorAll('#evidence .lean')].every((el) => el.children.length === 2 && [...el.children].every((c) => c.tagName === 'SPAN')) &&
      [...document.querySelectorAll('#drawer .sheet > div.zh, #drawer .sheet > div.en')].every((el) => el.querySelector('p.lede') && el.querySelector('ol li b') && el.querySelector('p.lede.refs a'))
    );
  })
);
check(
  'a card click starts a θ/α blend instead of a hard cut',
  await page.evaluate(() => {
    document.querySelector('[data-preset="homotopy-pi3-integer-winding"]').click();
    const s = window.TERNION_NUMBERS_DEBUG.state;
    return s.blending && s.thetaDeg < 720;
  })
);
await settle(page);
await until(page, () => !window.TERNION_NUMBERS_DEBUG.state.blending);
check('the blend ends on the card', near((await state()).thetaDeg, 720) && !(await state()).blending);

for (const lang of ['zh', 'en']) {
  await page.click('[data-lang-set="' + lang + '"]');
  await settle(page);
  const links = await page
    .locator('#drawer .refs a, #evidence .lean.open a')
    .evaluateAll((els) =>
      els.filter((el) => getComputedStyle(el.parentElement).display !== 'none').map((el) => el.getAttribute('href'))
    );
  const expected = [
    THEORY,
    'ch22-s04-critical-line-and-rh.html#conj-riemann-hypothesis',
    'ch34-s25-generations-and-quantitative-boundary.html#prob-ch34-sm-generations-and-couplings'
  ];
  check(
    lang + ' theory and open-problem links',
    expected.every((x) => links.includes('../../' + lang + '/' + x))
  );
  check(
    lang + ' cited declarations',
    same(await page.locator('#evidence a[data-lean-gid]').evaluateAll((els) => els.map((el) => el.dataset.leanGid)), GIDS)
  );
  const badgeText = async (selector) =>
    (await page.locator('#evidence ' + selector + ' .' + lang).allTextContents()).join(' ').replace(/\s+/g, '');
  const division = await badgeText('[class="lean"]:has([data-lean-gid$=".long_division_invariant"])');
  const argued = await badgeText('.lean.argued');
  const numeric = await badgeText('.lean.num');
  const model = await badgeText('.lean.model');
  const repeats = lang === 'zh' ? /循环|周期|重复/ : /recur|period|repeat/i;
  check(lang + ' frozen long-division identity and positive denominator',
    division.includes('q>0') && division.includes('q·longDivisionPrefix(b,p,q,n)+remainder(b,p,q,n)=bⁿ·p'));
  check(lang + ' remainder periodicity is argued from finitely many remainders',
    !repeats.test(division) && repeats.test(argued) && (lang === 'zh' ? /鸽巢|抽屉/ : /pigeonhole/i).test(argued));
  check(lang + ' computed turns and classical homotopy groups have their stated evidence',
    numeric.includes('n=⌊θ/360°⌋') && !/π[₁₃]/.test(numeric) &&
    argued.includes('π₃(S³)≅ℤ') && argued.includes('π₁(S³)=0'));
  check(lang + ' Rodrigues stage cap and uncapped value at 179°',
    model.includes('min(4,|tan(θ/2)|)') && model.includes('179°') &&
    model.includes(Math.abs(Math.tan(179 * Math.PI / 360)).toFixed(4)));
  for (const id of Object.keys(CARDS)) {
    await pick(id);
    await verifyCard(page, id);
    await layout(page, lang + '/' + id);
    const readings = await page.locator('#readouts output').allTextContents();
    check(
      lang + '/' + id + ' one key and six readouts, all populated',
      readings.length === 7 &&
        (await page.locator('#readouts dl.ro > div').count()) === 7 &&
        (await page.locator('#readouts dl.ro > div.key').count()) === 1 &&
        readings.every((t) => t && !/NaN|undefined|^—$/.test(t))
    );
    const m = await state();
    check(
      lang + '/' + id + ' HUD title, status pills and key readout show the scalar shadow',
      (await textOf('hudBig')).includes(f4(Math.abs(m.w))) &&
        (await textOf('keyPill')).includes(f4(Math.abs(m.w))) &&
        (await textOf('roKey')).includes(f4(Math.abs(m.w))) &&
        (await textOf('hudSub')).trim().length > 0
    );
    verifyInstances(m, lang + '/' + id);
  }
}
for (const angle of [
  0, 84.68, 84.69, 84.7, 90, 120, 179, 179.99, 180, 180.01, 181, 359.99, 360, 539.99, 540, 540.01, 719.99, 720
]) {
  await input('#rotTheta', angle);
  const m = await state(),
    want = angle === 84.69 ? STAR2_DEG : angle;
  check('angle slider ' + angle, near(m.thetaDeg, want, 1e-10) && !m.playing && m.preset === null);
  verifyMath(m, 'θ=' + angle);
  check('Rodrigues readout ' + angle, (await textOf('roRod')).includes(m.pole ? '∞' : f4(m.rod)));
  const shadow = (await textOf('roKey')) + (await textOf('roKeySub'));
  check(
    'shadow, sagitta and traces ' + angle,
    [m.w, m.v, m.tax].every((x) => shadow.includes(f4(x))) && (await textOf('roTrace')).includes(f4(m.trace))
  );
  verifyInstances(m, 'θ=' + angle);
}
for (const angle of [0, 1, 35, 60, 90]) {
  await input('#sliceTilt', angle);
  verifyMath(await state(), 'α=' + angle);
}
for (let k = 0; k < 4; k++) {
  await input('#ratPair', k);
  const m = await state();
  verifyRatio(m);
  check(
    'ratio selector ' + k,
    (await textOf('roRatio')).includes(pairs[k].join('/')) && (await textOf('roRatio')).includes('1.0000')
  );
  const [p, q] = pairs[k],
    digits = expectedDecimal(p, q).rs.length - 1,
    scaled = BigInt(p) * 10n ** BigInt(digits),
    identity = q + ' × ' + scaled / BigInt(q) + ' + ' + scaled % BigInt(q) + ' = 10' + superscript(digits) + ' × ' + p;
  check(
    'long-division invariant in the note ' + p + '/' + q,
    (await textOf('roNote')).includes(identity) &&
      m.leanInstances.division.lhs === m.leanInstances.division.rhs &&
      m.leanInstances.division.prefix === Number(scaled / BigInt(q)),
    identity
  );
}
await pick(DEFAULT);
await seek(0.125);
const early = await state();
await seek(0.875);
const late = await state();
check(
  'scrubbing traverses the arc while preserving its endpoint',
  near(early.t, 0.125) && near(late.t, 0.875) && early.thetaDeg === late.thetaDeg && early.preset === late.preset
);
const beforeLens = await state(),
  title = await textOf('hudBig');
await page.click('#lensToggleBtn');
await settle(page);
const lens = await state();
check(
  'changing the lens preserves the experiment',
  lens.lens !== beforeLens.lens &&
    (await textOf('hudBig')) !== title &&
    ['thetaDeg', 'tiltDeg', 'pqIndex', 'preset', 't'].every((k) => lens[k] === beforeLens[k])
);
const views = [];
for (const name of CAM_NAMES) {
  await page.click('[data-cam="' + name + '"]');
  await settle(page);
  check(
    'selected view ' + name,
    (await state()).cam === name && (await page.getAttribute('[data-cam="' + name + '"]', 'aria-pressed')) === 'true'
  );
  await until(page, () => !document.querySelector('#stage').hasAttribute('aria-busy'));
  views.push((await state()).camera);
  await layout(page, name);
}
check('the three camera views have distinct orientations', new Set(views.map((c) => [c.yaw, c.pitch].join('/'))).size === 3);
await pick(DEFAULT);
await page.locator('#stage').scrollIntoViewIfNeeded();
await settle(page);
const here = await state(),
  box = await page.locator('#ternionHandle').boundingBox();
const start = await page.evaluate(() => TERNION_NUMBERS_DEBUG.dragTarget(TERNION_NUMBERS_DEBUG.state.thetaDeg));
const end = await page.evaluate(() => TERNION_NUMBERS_DEBUG.dragTarget(124));
check(
  'projected handle lies on the active arc',
  !!box && Math.hypot(box.x + box.width / 2 - start.x, box.y + box.height / 2 - start.y) < 1.5
);
await page.mouse.move(start.x, start.y);
await page.mouse.down();
await page.mouse.move(end.x, end.y, { steps: 10 });
await page.mouse.up();
await settle(page);
const pulled = await state();
check(
  'drag along the arc sets θ and leaves the camera fixed',
  Math.abs(pulled.thetaDeg - 124) < 1 && same(pulled.camera, here.camera) && !pulled.playing && !pulled.preset,
  JSON.stringify(pulled.thetaDeg)
);
await page.locator('#ternionHandle').focus();
await page.keyboard.press('ArrowRight');
await settle(page);
check(
  'keyboard changes θ without changing rail time',
  (await state()).thetaDeg > pulled.thetaDeg && (await state()).t === pulled.t
);
for (const id of Object.keys(CARDS)) {
  if (CARDS[id].play)
    check(
      id + ' plays',
      await playsAfter(
        page,
        () => page.click('[data-preset="' + id + '"]'),
        () => window.TERNION_NUMBERS_DEBUG.state
      )
    );
  else {
    await page.click('[data-preset="' + id + '"]');
    await settle(page);
    const m = await state();
    await settle(page);
    check(id + ' rests', !m.playing && m.t === (await state()).t);
  }
}
await pick(DEFAULT);
const colors = await primitiveColours(page);
check(
  'semantic stage colours',
  colors.seen.filter((x) => x.colors.includes(colors.amber)).every((x) => CURSOR.test(x.key)) &&
    colors.seen.every((x) => !x.colors.includes(colors.ok) && !x.colors.includes(colors.warn))
);
const marks = await page.evaluate(() => TRV.solids[0].marks().map((m) => m.hidden));
check('the body occludes a rear mark and leaves a front mark visible', marks.includes(true) && marks.includes(false));
const prism = await page.evaluate(() => {
  const plot = TRV.kit.plot,
    traces = [];
  TRV.kit.plot = (...args) => {
    const graph = plot(...args);
    for (const method of ['line', 'dot', 'vline']) {
      const original = graph[method];
      graph[method] = (...params) => {
        traces.push([method, ...params]);
        return original(...params);
      };
    }
    return graph;
  };
  try {
    TRV.kit.flush();
  } finally {
    TRV.kit.plot = plot;
  }
  const { sigma, cyan, violet, magenta, amber } = TRV.palette;
  return { traces, sigma, cyan, violet, magenta, amber };
});
for (const [role, expected] of [
  [prism.sigma, (h) => Math.cos(h)],
  [prism.cyan, (h) => Math.abs(Math.sin(h))],
  [prism.magenta, (h) => Math.min(4, Math.abs(Math.tan(h)))]
]) {
  const trace = prism.traces.find(([method, pts, color]) => method === 'line' && color === role);
  check(
    'strip samples across both turns ' + role,
    !!trace &&
      trace[1][0][0] === 0 &&
      trace[1].at(-1)[0] === 720 &&
      trace[1].every(([angle, value]) => near(value, expected((angle * DEG) / 2)))
  );
}
const cursors = prism.traces.filter(([method, ...rest]) => (method === 'dot' || method === 'vline') && rest.includes(prism.amber));
const poles = prism.traces.filter(([method, x, color]) => method === 'vline' && color === prism.magenta).map((row) => row[1]);
check(
  'strip cursor tracks the selected angle and dashed lines mark the poles',
  cursors.length === 2 && cursors.every((row) => near(row[1], STAR2_DEG)) && same(poles, [180, 540])
);
const badColors = await domColours(page);
check('semantic badge and readout colours', !badColors.length, badColors.slice(0, 3).join(' | '));
const am = await stripAmber(page);
check(
  'amber strip cursor is narrow and spans the plot',
  am.n > 10 && am.width < 12 * am.dpr && am.height > am.h * 0.48,
  JSON.stringify(am)
);

for (const lang of ['zh', 'en']) {
  for (const [width, height, figure] of [
    [390, 844, false],
    [334, 500, true],
    [740, 500, true]
  ]) {
    colorScheme = width === 390 ? 'light' : 'dark';
    const p = await T.open(BOOK, ID, '?lang=' + lang + (figure ? '&embed=1&preset=' + DEFAULT : ''), {
      viewport: { width, height },
      reducedMotion: 'reduce'
    });
    await settle(p);
    for (let j = 0; j < Object.keys(CARDS).length; j++) {
      const id = (await state(p)).preset;
      await layout(p, lang + '/' + width + '/' + id, figure);
      if (lang === 'en') check('English ' + width + '/' + id, !(await cjkLeftovers(p)).length);
      if (figure)
        check(
          'cited frame hides strip ' + id,
          (await p.locator('.strip').isHidden()) && (await p.locator('.tour .tour-note').isVisible())
        );
      await p.locator(figure ? '[data-tour="next"]' : '[data-preset="' + Object.keys(CARDS)[(j + 2) % 5] + '"]').click();
      await settle(p);
    }
    if (width === 390) {
      for (const yaw of [-Math.PI / 2, Math.PI / 2]) {
        await p.evaluate((y) => {
          TRV.kit.pause();
          TRV.solids[0].cam.yaw = y;
          TRV.kit.flush();
        }, yaw);
        await layout(p, lang + ' edge-on phone view ' + yaw);
      }
    }
    await p.context().close();
  }
  for (const id of Object.keys(CARDS)) {
    const p = await openStill(T, BOOK, ID, id, lang);
    const m = await state(p);
    await verifyCard(p, id);
    check(
      'still ' + lang + '/' + id,
      !m.playing && near(m.t, await cardStill(id, p)) && (await p.locator('#ternionHandle').isHidden())
    );
    await p.context().close();
  }
}
check(
  'permanent dark console in both system schemes',
  !paletteMutations.length &&
    paletteDocuments.every((x) => x.absent) &&
    paletteDocuments.some((x) => x.dark) &&
    paletteDocuments.some((x) => !x.dark)
);
check('zero console warnings', browserWarnings.length === 0, browserWarnings.slice(0, 3).join(' | '));
check('zero shared quality warnings', T.warnings.length === 0, JSON.stringify(T.warnings));
check('zero browser or request errors', T.errors.length === 0, T.errors.slice(0, 3).join(' | '));
await T.finish();
