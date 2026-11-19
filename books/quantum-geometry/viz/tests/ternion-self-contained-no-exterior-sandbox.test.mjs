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
const ID = 'ternion-self-contained-no-exterior-sandbox';
const DIR = path.join(ROOT, 'books', BOOK, 'viz', ID);
const THEORY = 'ch39-s27-self-contained-ternion-particle-and-no-exterior.html#sec-ch39-self-contained-ternion-particle-and-no-exterior';
const SECTION = '39.4';
const PI = Math.PI;
// scene, still frame (a radius r, or 'end' = π), view and the angle φ of the external point C
const CARDS = {
  'skyrmion-winding-self-lock': { scene: 'fill', still: PI, cam: 'panorama', phi: 0 },
  'field-wave-particle-trinity': { scene: 'trinity', still: PI / 4, cam: 'panorama', phi: 0 },
  'origin-free-no-point-c': { scene: 'origin', still: (2 * PI) / 3, cam: 'top', phi: 0 },
  'wavefront-outward-is-inward': { scene: 'wave', still: (3 * PI) / 4, cam: 'panorama', phi: 0 },
  'heegaard-antipodal-no-exterior': { scene: 'heegaard', still: PI / 2, cam: 'panorama', phi: 0 }
};
const DEFAULT = 'wavefront-outward-is-inward';
const CAM_NAMES = ['panorama', 'doorway', 'top'];
const FLOOR_Z = -1.12;
const CURSOR = /cursor|handle|active/i;
const GIDS = [
  'D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact',
  'D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness',
  'D5/S3/Quantum/SpinFactor/OriginalClassification.complete_consequences',
  'D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section',
  'D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift',
  'D5/S3/Quantum/Matrix/NumericalRange.blochPure_norm',
  'D5/S3/Quantum/Matrix/NumericalRange.blochPure_surjective',
  'D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law',
  'D5/S3/QuantumBounds/FubiniStudyRecordTime.fs_angle_triangle',
  'D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization',
  'D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel',
  'D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor'
];
const CODA_GID = 'D5/S0/Diagonal/Lawvere/QualitativeEscape.self_application_fragment_package';
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, tol = 1e-9) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
const f4 = (v) => (Math.abs(v) < 5e-5 ? 0 : v).toFixed(4);

/* ---------- independent mathematics, written here and never calling the page ---------- */
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const norm = (a) => Math.sqrt(dot(a, a));
const sub = (a, b) => a.map((x, i) => x - b[i]);
const plus = (a, b) => a.map((x, i) => x + b[i]);
const scale = (a, k) => a.map((x) => x * k);
const unit = (a) => scale(a, 1 / norm(a));
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
/** The volume of the geodesic ball of radius r in S³(1), by Simpson's rule on the volume element 4π sin²χ dχ. */
function simpsonVolume(r, n = 2000) {
  if (r <= 0) return 0;
  const h = r / n,
    f = (x) => 4 * PI * Math.sin(x) ** 2;
  let s = f(0) + f(r);
  for (let k = 1; k < n; k++) s += (k % 2 ? 4 : 2) * f(k * h);
  return (s * h) / 3;
}
/** Quaternions as 4 × 4 real matrices of left multiplication: L(q) p = q p. */
const leftMatrix = ([w, x, y, z]) => [
  [w, -x, -y, -z],
  [x, w, -z, y],
  [y, z, w, -x],
  [z, -y, x, w]
];
const apply = (M, v) => M.map((row) => dot(row, v));
const qm = (a, b) => apply(leftMatrix(a), b);
const conj = ([w, x, y, z]) => [w, -x, -y, -z];
const qinvM = (a) => scale(conj(a), 1 / dot(a, a));
const S2 = Math.SQRT2;
const EX_A = [1 / S2, 1 / S2, 0, 0],
  EX_B = [1 / S2, 0, 1 / S2, 0],
  C1 = [1, 0, 0, 0],
  C2 = [0, 0, 0, 1];
const pin = (phiDeg) => [Math.cos((phiDeg * PI) / 180), 0, 0, Math.sin((phiDeg * PI) / 180)];
const HEAP = qm(qm(EX_B, qinvM(EX_A)), EX_B);
/** A deterministic stream of points on S³, for base points. */
function* randomUnits(seed, n) {
  let s = seed;
  const rand = () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648) * 2 - 1;
  for (let k = 0; k < n; k++) yield unit([rand(), rand(), rand(), rand()]);
}
/** The rotation matrix of a unit quaternion by the closed formula (w² − |v|²) I + 2 v vᵀ + 2 w [v]×. */
function rotationOf([w, x, y, z]) {
  const v = [x, y, z],
    k = w * w - dot(v, v);
  const M = [0, 1, 2].map((i) => [0, 1, 2].map((j) => (i === j ? k : 0) + 2 * v[i] * v[j]));
  const vx = [
    [0, -z, y],
    [z, 0, -x],
    [-y, x, 0]
  ];
  return M.map((row, i) => row.map((m, j) => m + 2 * w * vx[i][j]));
}
/* complex numbers [re, im] and 2 × 2 complex matrices */
const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
const cconj = (a) => [a[0], -a[1]];
const spin = (q) => [
  [q[0], q[1]],
  [q[2], q[3]]
];
const SIGMA = [
  [
    [[0, 0], [1, 0]],
    [[1, 0], [0, 0]]
  ],
  [
    [[0, 0], [0, -1]],
    [[0, 1], [0, 0]]
  ],
  [
    [[1, 0], [0, 0]],
    [[0, 0], [-1, 0]]
  ]
];
/** The Bloch vector of v v† by Tr(ρ σₖ), ρᵢⱼ = vᵢ conj(vⱼ). */
function blochByTrace(v) {
  const rho = [0, 1].map((i) => [0, 1].map((j) => cmul(v[i], cconj(v[j]))));
  return SIGMA.map((s) => {
    let re = 0;
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) re += cmul(rho[i][j], s[j][i])[0];
    return re;
  });
}
const fsAngleDeg = (a, b) => {
  const u = spin(a),
    v = spin(b);
  const z = [0, 1].reduce((s, k) => plus(s, cmul(cconj(u[k]), v[k])), [0, 0]);
  return (Math.acos(Math.min(1, Math.hypot(...z))) * 180) / PI;
};
/** Girard: the signed area of the geodesic triangle abc of S² (angle sum − π, signed by the orientation of abc). */
function girardSigned(a, b, c) {
  const det = dot(a, cross(b, c));
  if (Math.abs(det) < 1e-12) return 0;
  const angle = (P, Q, R) => {
    const t1 = unit(sub(Q, scale(P, dot(P, Q)))),
      t2 = unit(sub(R, scale(P, dot(P, R))));
    return Math.acos(Math.max(-1, Math.min(1, dot(t1, t2))));
  };
  return Math.sign(det) * (angle(a, b, c) + angle(b, c, a) + angle(c, a, b) - PI);
}

const T = await session();
const { page, check } = T;
// Headless Chromium can report driver diagnostics as warnings. They are harmless; every other warning is a failure.
const driverInfo = /KHR_parallel_shader_compile|GPU stall due to ReadPixels|SwiftShader|GL Driver Message|WEBGL_debug_renderer_info/;
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
  await context.exposeBinding('__noExteriorPaletteAudit', ({ page: p }, record) => {
    (record.kind === 'mutation' ? paletteMutations : paletteDocuments).push({ url: p.url(), ...record });
  });
  await context.addInitScript(() => {
    new MutationObserver((records) => {
      for (const r of records)
        window.__noExteriorPaletteAudit({ kind: 'mutation', old: r.oldValue, value: r.target.getAttribute('data-tr-palette') }).catch(() => {});
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-tr-palette'] });
    document.addEventListener(
      'DOMContentLoaded',
      () =>
        window
          .__noExteriorPaletteAudit({ kind: 'document', absent: document.documentElement.dataset.trPalette === undefined, dark: matchMedia('(prefers-color-scheme: dark)').matches })
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
// and the lit-solid checks of kit.solid (opaque share, shading, turning, a hidden mark behind the balls, resting)
await stageFirstChecks(T, BOOK, ID, { solid: true });

/* ---------- sources, registry and dependencies ---------- */
const sources = Object.fromEntries(['index.html', 'main.js', 'style.css'].map((f) => [f, fs.readFileSync(path.join(DIR, f), 'utf8')]));
const suite = fs.readFileSync(fileURLToPath(import.meta.url), 'utf8');
const registry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8'));
const entry = (registry.visualizations || []).find((v) => v.id === ID) || null;
const entryText = JSON.stringify(entry || {});
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
// Hangul syllables and jamo, by code point range
const hangul = new RegExp('[' + [[0x1100, 0x11ff], [0x3130, 0x318f], [0xac00, 0xd7af]].map(([a, b]) => String.fromCharCode(a) + '-' + String.fromCharCode(b)).join('') + ']');
const literalColour = /#(?:[\da-f]{3,8})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/i;
for (const [file, src] of Object.entries(sources)) {
  check(`source ${file}: no literal colour and no palette switch`, !literalColour.test(src) && !/\btrPalette\b|data-tr-palette|[?&]theme=/.test(src));
  check(`source ${file}: no model, vendor or tool identifiers and no Hangul`, !identifiers.test(src) && !shortAcronym.test(src) && !cjkTerms.test(src) && !hangul.test(src));
}
check('reserved identifiers are absent from the suite and registry entry', [suite, entryText].every((src) => !identifiers.test(src) && !shortAcronym.test(src) && !cjkTerms.test(src) && !hangul.test(src)));
check(
  'registration: §39.4, live, five cards and the twelve GIDs in order',
  !!entry &&
    entry.chapter === 39 &&
    entry.section === SECTION &&
    entry.status === 'live' &&
    entry.added === '2026-11-19' &&
    entry.code === 'TERNION//NO-EXTERIOR' &&
    same(entry.presets, Object.keys(CARDS)) &&
    same(Object.keys(entry.preset_titles), Object.keys(CARDS)) &&
    same(entry.lean.map((x) => x.gid), GIDS) &&
    entry.theory[0].href === '../zh/' + THEORY &&
    entry.theory[0].href_en === '../en/' + THEORY
);
check('the Coda theorem is not a box of this page and not in its registry', !entryText.includes(CODA_GID) && !sources['index.html'].includes(`data-lean-gid="${CODA_GID}"`));

/* ---------- helpers on the page ---------- */
const state = (p = page) => p.evaluate(() => window.TERNION_NO_EXTERIOR_DEBUG.state);
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
      const s = window.TERNION_NO_EXTERIOR_DEBUG.state;
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
        const style = n === 'circle' || n === 'glass' ? a[3] : n === 'line' || n === 'arrow' || n === 'bead' || n === 'ring' || n === 'fan' ? a[n === 'arrow' ? 2 : 1] : a[2];
        const key = n === 'surface' || n === 'tube' || n === 'poly' || n === 'glass' ? a[0] : (style && style.key) || n;
        const s = style || {};
        seen.push({ n, key: String(key), colors: [s.color, s.fill, s.edges, ...(s.colors || [])].filter(Boolean) });
        return saved[n](...a);
      };
    }
    window.TRV.kit.flush();
    for (const n of names) sc[n] = saved[n];
    const P = window.TRV.palette;
    return { seen, amber: P.amber, ok: P.ok, warn: P.warn };
  });
}
/** The lines of the next frame that lie in the plane of the floor grid (the extrinsic coordinate draft). */
const floorLines = (p = page) =>
  p.evaluate((z) => {
    const sc = window.TRV.solids[0],
      saved = sc.line;
    let n = 0;
    sc.line = (pts, s) => {
      if (pts.length > 1 && pts.every((q) => Math.abs(q[2] - z) < 1e-9)) n++;
      return saved(pts, s);
    };
    window.TRV.kit.flush();
    sc.line = saved;
    return n;
  }, FLOOR_Z);
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
      if (el.closest('.handle') || el.matches('.hud-bl .sw.am')) continue;   // the handle, and the legend key of the current r
      const cs = getComputedStyle(el);
      for (const prop of ['color', 'backgroundColor', 'borderTopColor', 'borderLeftColor']) if (banned.includes(cs[prop])) bad.push(`${el.id || el.className || el.tagName} ${prop}`);
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
      for (const prop of ['color', 'backgroundColor', 'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor', 'outlineColor', 'textDecorationColor']) {
        const k = channels(cs[prop]);
        if (!k) bad.push(`#evidence ${el.className || el.tagName} ${prop} unreadable: ${cs[prop]}`);
        else if (k.a > 0 && amber && k.rgb.every((x, i) => Math.abs(x - amber.rgb[i]) < 1.5)) bad.push(`#evidence ${el.className || el.tagName} ${prop} ${cs[prop]}`);
      }
    }
    return bad;
  });
/** The strip: the columns that carry amber pixels form one thin vertical cursor at the current r. */
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

/** Every number of the page at its radius r and angle φ, against the mathematics above. */
function verifyMath(m, label) {
  const r = m.r,
    V = simpsonVolume(r);
  check(label + ' volume by quadrature, its share of 2π² and the area as dV/dr', near(m.volume, V, 1e-9) && near(m.share, V / (2 * PI * PI), 1e-10) && near(m.totalVolume, 2 * PI * PI));
  if (r > 1e-3 && r < PI - 1e-3) {
    const h = 1e-4,
      dV = (simpsonVolume(r + h) - simpsonVolume(r - h)) / (2 * h);
    check(label + ' wavefront area = dV/dr', near(m.area, dV, 1e-6));
  } else check(label + ' wavefront area at an end', near(m.area, 0, 1e-12) && m.boundaryEmpty);
  check(label + ' boundary empty only at r = 0 and π', m.boundaryEmpty === (r < 1e-9 || r > PI - 1e-9));
  check(label + ' fidelity and the k = 1 wave from the point (cos r, sin r, 0, 0)', near(m.kappa, (1 + dot(m.point, C1)) / 2, 1e-12) && near(m.psi, m.point[0], 1e-12) && near(norm(m.point), 1, 1e-12));
  if (r > 0.05 && r < PI - 0.05) {
    // the Laplacian of a radial function on S³(1): f'' + 2 cot r f'
    const h = 1e-4,
      f = Math.cos,
      lap = (f(r + h) - 2 * f(r) + f(r - h)) / (h * h) + (2 / Math.tan(r)) * ((f(r + h) - f(r - h)) / (2 * h));
    check(label + ' Δψ₀ = −3ψ₀ by the radial formula', near(m.laplacian, lap, 2e-5) && near(lap, -3 * Math.cos(r), 2e-5));
  }
  check(label + ' Δψ₀ + 3ψ₀ ≈ 0', Math.abs(m.waveResidual) < 1e-6);
  const C = pin(m.phiDeg),
    aff = sub(plus(EX_A, EX_B), C);
  check(
    label + ' affine sums: 4 − 2√2 cos φ, C₁ 4 − 2√2, C₂ 4',
    near(m.affineNorm2, dot(aff, aff), 1e-12) &&
      near(m.affineNorm2, 4 - 2 * S2 * Math.cos((m.phiDeg * PI) / 180), 1e-12) &&
      near(m.aff1Norm2, 4 - 2 * S2, 1e-12) &&
      near(m.aff2Norm2, 4, 1e-12) &&
      same(m.C.map((x) => +x.toFixed(12)), C.map((x) => +x.toFixed(12)))
  );
  let drift = 0;
  for (const o of randomUnits(7, 24)) {
    const oi = qinvM(o),
      star = (x, y) => qm(qm(x, oi), y),
      inv = (x) => qm(qm(o, qinvM(x)), o);
    drift = Math.max(drift, norm(sub(star(EX_B, star(inv(EX_A), EX_B)), HEAP)));
  }
  check(
    label + ' heap step B A⁻¹ B on the shell, the same for 24 base points, and [A, C, C] = A',
    norm(sub(m.heap, HEAP)) < 1e-12 &&
      norm(sub(HEAP, [0, -1 / S2, 1 / S2, 0])) < 1e-12 &&
      near(m.heapNorm2, 1, 1e-12) &&
      drift < 1e-12 &&
      m.heapDrift < 1e-12 &&
      m.bridge < 1e-12 &&
      norm(sub(qm(qm(EX_A, qinvM(C)), C), EX_A)) < 1e-12
  );
  check(
    label + ' 60° steps, κ(A, B) = 3/4 and the symmetry dimensions',
    near(m.angleAB, 60, 1e-9) && near(m.angleBH, 60, 1e-9) && near(m.kappaAB, 0.75, 1e-12) && m.dims.so4 === 6 && m.dims.so3 === 3
  );
}
/** The instances the evidence panel names, against constructions written here. */
function verifyInstances(m, I, label) {
  // the octahedral net of S²: vertices ±eᵢ, faces the octants, edges the orthogonal pairs
  const V = [];
  for (let i = 0; i < 3; i++) for (const s of [1, -1]) V.push([0, 1, 2].map((j) => (j === i ? s : 0)));
  const E = [];
  for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) if (dot(V[i], V[j]) === 0) E.push([i, j]);
  const Fc = [];
  for (const a of [0, 1]) for (const b of [2, 3]) for (const c of [4, 5]) Fc.push([a, b, c]);
  const ofEdge = E.map(([i, j]) => Fc.flatMap((f, k) => (f.includes(i) && f.includes(j) ? [k] : [])));
  let kernel = 0;
  for (let mask = 0; mask < 256; mask++) if (ofEdge.every(([a, b]) => (((mask >> a) ^ (mask >> b)) & 1) === 0)) kernel++;
  check(
    label + ' octahedral net: V − E + F = 2, rank 8 − log₂|ker| = 7 = E − V + 1, closed labellings 0 and 1',
    V.length - E.length + Fc.length === 2 &&
      ofEdge.every((f) => f.length === 2) &&
      kernel === 2 &&
      I.faceCycle.rank === Fc.length - Math.log2(kernel) &&
      I.faceCycle.rank === E.length - V.length + 1 &&
      I.faceCycle.closed === kernel &&
      I.faceCycle.euler === 2 &&
      same(I.faceCycle.closedLabels, ['00000000', '11111111'])
  );
  // the signed solid angles of a regular tetrahedron inscribed in S², by Girard's angle sum
  const tet = [
    [1, 1, 1],
    [1, -1, -1],
    [-1, 1, -1],
    [-1, -1, 1]
  ].map(unit);
  const idx = [0, 1, 2, 3];
  const F = idx.map((i) => idx.map((j) => idx.map((k) => Math.round(girardSigned(tet[i], tet[j], tet[k]) / PI))));
  let defects = 0;
  const faceErrors = [0, 0, 0, 0],
    values = new Set();
  for (const r of idx)
    for (const i of idx)
      for (const j of idx)
        for (const k of idx) {
          const c = F[i][j][k] - F[r][j][k] + F[r][i][k] - F[r][i][j];
          if (c) {
            defects++;
            faceErrors[r]++;
            values.add(c);
          }
        }
  let edgeZero = 0;
  for (const i of idx) for (const j of idx) for (const k of idx) if (F[i][j][k]) edgeZero++;
  check(
    label + ' tetrahedral cochain: 24 defects, faceErrors 6 each, coboundaries ±4π, both bounds',
    defects === 24 &&
      same(faceErrors, [6, 6, 6, 6]) &&
      same([...values].sort((a, b) => a - b), [-4, 4]) &&
      I.tetra.integral &&
      I.tetra.defects === defects &&
      same(I.tetra.faceErrors, faceErrors) &&
      same(I.tetra.coboundaries, [-4, 4]) &&
      I.tetra.edgeErrorsZero === edgeZero &&
      I.tetra.anchorBound === faceErrors.some((e) => 4 * e <= defects) &&
      I.tetra.edgeBound === defects <= 16 * edgeZero
  );
  // the brackets of the frame generators: uv − vu = 2(u × v) for pure quaternions
  const units = [
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ];
  const bracketOk = [
    [0, 1],
    [1, 2],
    [2, 0]
  ].every(([a, b]) => norm(sub(sub(qm(units[a], units[b]), qm(units[b], units[a])), [0, ...scale(cross(units[a].slice(1), units[b].slice(1)), 2)])) < 1e-15);
  check(label + ' frame brackets are twice the cross product', bracketOk && I.brackets.every((b) => b.gap < 1e-12));
  // the heap steps on their great circle: 60° each, x₃ = −A, x₆ = A; −A and A give one rotation
  const xs = [EX_A, EX_B];
  while (xs.length < 7) xs.push(qm(qm(xs.at(-1), qinvM(xs.at(-2))), xs.at(-1)));
  const RA = rotationOf(EX_A),
    RmA = rotationOf(scale(EX_A, -1));
  check(
    label + ' heap steps reach −A after three and A after six; ±A give one rotation',
    norm(plus(xs[3], EX_A)) < 1e-12 &&
      norm(sub(xs[6], EX_A)) < 1e-12 &&
      I.lift.step3 < 1e-12 &&
      I.lift.step6 < 1e-12 &&
      I.lift.endpoint < 1e-12 &&
      I.lift.rotationGap < 1e-12 &&
      RA.every((row, i) => row.every((x, j) => near(x, RmA[i][j], 1e-12))) &&
      I.lift.steps.every((a, k) => near(a, [0, 60, 120, 180, 120, 60, 0][k], 1e-4))
  );
  const b = blochByTrace(spin(I.blochNorm.point));
  check(label + ' Bloch vector of the amber point by Tr(ρσ), length 1', near(norm(b), 1, 1e-12) && near(I.blochNorm.norm, 1, 1e-12) && norm(sub(b, I.blochNorm.bloch)) < 1e-12);
  check(
    label + ' spinor preimages of the two hair zeros and four gluing points',
    I.surjective.length === 6 && I.surjective.every((x) => near(x.unit, 1, 1e-12) && norm(sub(blochByTrace(x.v), x.r)) < 1e-12 && x.gap < 1e-12)
  );
  check(
    label + ' Fubini–Study angles 45°, 45°, 45° and the triangle inequality',
    near(I.fsTriangle.ab, fsAngleDeg(EX_A, EX_B), 1e-9) &&
      near(I.fsTriangle.bh, fsAngleDeg(EX_B, HEAP), 1e-9) &&
      near(I.fsTriangle.ah, fsAngleDeg(EX_A, HEAP), 1e-9) &&
      [I.fsTriangle.ab, I.fsTriangle.bh, I.fsTriangle.ah].every((a) => near(a, 45, 1e-9)) &&
      I.fsTriangle.holds
  );
  const recs = [EX_A, EX_B, HEAP, scale(EX_A, -1)];
  check(
    label + ' Gram matrix of A, B, [B, A, B], −A: one class each',
    I.gram.every((row, i) => row.every((g, j) => near(g, dot(recs[i], recs[j]), 1e-12))) && I.gramClasses === 4 && recs.every((a, i) => recs.every((c, j) => i === j || dot(a, c) < 1 - 1e-9))
  );
  check(label + ' frame: orthonormal and tangent in four dimensions, projections at least 1/√2', I.frame.gramGap < 1e-12 && I.frame.tangentGap < 1e-12 && near(I.frame.minProjected, 1 / S2, 1e-12) && I.frame.points === 10);
  check(label + ' hair: two zeros of index sum χ(S²) = 2', I.hair.zeros === 2 && I.hair.indexSum === 2 && I.hair.euler === 2);
  const x = sub(EX_A, pin(m.phiDeg)),
    y = sub(EX_B, pin(m.phiDeg));
  check(
    label + ' parallelogram law at the current C',
    near(I.parallelogram.lhs, dot(plus(x, y), plus(x, y)) + dot(sub(x, y), sub(x, y)), 1e-12) && near(I.parallelogram.lhs, I.parallelogram.rhs, 1e-12) && near(I.parallelogram.rhs, 2 * (dot(x, x) + dot(y, y)), 1e-12)
  );
  check(label + ' readout classes of d(A, ·)', I.partition.classes === (m.r < 1e-9 || m.r > PI - 1e-9 ? 2 : 3) && I.partition.readouts === 20);
  check(label + ' eight contexts share the heap step', I.objective.contexts === 8 && I.objective.drift < 1e-12 && norm(sub(I.objective.factor, HEAP)) < 1e-12);
}
async function verifyCard(p, id) {
  const m = await state(p),
    c = CARDS[id];
  check(id + ' scene, view, C and preset', m.preset === id && m.scene === c.scene && m.cam === c.cam && m.phiDeg === c.phi);
  verifyMath(m, id);
  verifyInstances(m, m.leanInstances, id);
}

await T.goto(BOOK, ID, '?lang=en');
await settle(page);
check('the wavefront card opens by default, parked on its still', (await state()).preset === DEFAULT && near((await state()).r, CARDS[DEFAULT].still, 1e-12));
check(
  'three-column lab shell, panel badges, tagline, fonts and evidence spans',
  await page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const asides = [...document.querySelectorAll('.sec h2 .aside')].map((el) => el.textContent.trim());
    return (
      !!q('.app.lab > header.top .status #scenePill') &&
      !!q('.app.lab > header.top .status #keyPill') &&
      !!q('#rail #lensPanel .lens-toggle') &&
      !!q('#rail #presets') &&
      !!q('#rail #ctlPanel #camChips') &&
      !!q('#rail #ctlPanel #pinC') &&
      !!q('main.center > #stage > .scan') &&
      !!q('main.center > #stage > .vig') &&
      !!q('#stage > #hudTl #hudBig') &&
      !!q('#stage > button.handle#frontHandle') &&
      !!q('main.center > .strip #plot') &&
      !q('#stage .strip') &&
      !!q('aside.col.side > #readouts') &&
      q('aside.col.side > #evidence').firstElementChild.id === 'infoBtn' &&
      ['§39.4', '5', 'NUM', 'trureturing'].every((x) => asides.includes(x)) &&
      [...document.querySelectorAll('.tagline > span')].every((el) => el.querySelector('em') && el.firstChild.nodeType === 3) &&
      !!q('link[href*="fonts.googleapis.com/css2?family=Chakra+Petch"]') &&
      [...document.querySelectorAll('#evidence .lean')].every((el) => el.children.length === 2 && [...el.children].every((c) => c.tagName === 'SPAN')) &&
      document.querySelectorAll('#evidence .lean.frozen').length === 0 &&
      document.querySelectorAll('#evidence .lean.argued').length === 2 &&
      document.querySelectorAll('#evidence .lean.model').length === 1 &&
      document.querySelectorAll('#evidence .lean.num').length === 1 &&
      [...document.querySelectorAll('#drawer .sheet > div.zh, #drawer .sheet > div.en')].every((el) => el.querySelector('p.lede') && el.querySelectorAll('ol li b').length === 7 && el.querySelector('p.lede.refs a'))
    );
  })
);
check(
  'a card click starts a blend of the layers instead of a hard cut',
  await page.evaluate(() => {
    document.querySelector('[data-preset="origin-free-no-point-c"]').click();
    const s = window.TERNION_NO_EXTERIOR_DEBUG.state;
    return s.blending && s.layers.orig < 1 && s.scene === 'origin';
  })
);
await settle(page);
await until(page, () => !window.TERNION_NO_EXTERIOR_DEBUG.state.blending);
check('the blend ends on the scene of the card', (await state()).layers.orig === 1 && (await state()).layers.floor === 0);
check(
  'the probe exposes the card table and the mathematics',
  await page.evaluate(() => {
    const d = window.TERNION_NO_EXTERIOR_DEBUG;
    const c = d.calc(Math.PI / 2, 90);
    return Object.keys(d.presets).length === 5 && Math.abs(c.area - 4 * Math.PI) < 1e-12 && Math.abs(c.share - 0.5) < 1e-12 && Math.abs(c.affineNorm2 - 4) < 1e-12;
  })
);

for (const lang of ['zh', 'en']) {
  await page.click('[data-lang-set="' + lang + '"]');
  await settle(page);
  const links = await page
    .locator('#drawer .refs a')
    .evaluateAll((els) => els.filter((el) => getComputedStyle(el.parentElement).display !== 'none').map((el) => el.getAttribute('href')));
  check(lang + ' theory and Coda links', same(links.filter((h) => h.startsWith('../../' + lang + '/')), ['../../' + lang + '/' + THEORY, '../../' + lang + '/coda.html']), JSON.stringify(links));
  check(lang + ' cited declarations', same(await page.locator('#evidence a[data-lean-gid]').evaluateAll((els) => els.map((el) => el.dataset.leanGid)), GIDS));
  const badgeText = async (selector) => (await page.locator('#evidence ' + selector + ' .' + lang).allTextContents()).join(' ').replace(/\s+/g, '');
  const numeric = await badgeText('.lean.num');
  const model = await badgeText('.lean.model');
  const argued = await badgeText('.lean.argued');
  const drawer = (await page.locator('#drawer .sheet > div.' + lang).allTextContents()).join(' ');
  check(lang + ' NUM box carries the computed table', ['6.2832', '1.7932', '9.0845%', '12.5664', '9.8696', '17.9460', '90.9155%', '19.7392', '1.1716', '4.0000'].every((x) => numeric.includes(x)));
  check(lang + ' MODEL box names the projection, the volume caveat and the Coda theorem without a link', model.includes('sin²r') && model.includes('V(r)') && model.includes('self_application_fragment_package'));
  check(lang + ' ARGUED boxes name the literature', (lang === 'zh' ? ['亚当斯', '希高德', '嘉当', '庞加莱', '惠施'] : ['Adams', 'Heegaard', 'Cartan', 'Poincaré', 'HuiShi']).every((x) => argued.includes(x)));
  check(lang + ' drawer states the example and the volumes', ['1.1716', '4.0000', '2π²', 'π²', '[B, A, B]'].every((x) => drawer.includes(x)));
  for (const id of Object.keys(CARDS)) {
    await pick(id);
    await seek(CARDS[id].still);
    await verifyCard(page, id);
    await layout(page, lang + '/' + id);
    const readings = await page.locator('#readouts output').allTextContents();
    check(
      lang + '/' + id + ' one key and five readouts, all populated',
      readings.length === 6 && (await page.locator('#readouts dl.ro > div').count()) === 6 && (await page.locator('#readouts dl.ro > div.key').count()) === 1 && readings.every((t) => t && !/NaN|undefined|^—$/.test(t))
    );
    const m = await state();
    const key = {
      fill: f4(m.share),
      trinity: f4(Math.abs(m.psi)),
      origin: f4(m.affineNorm2),
      wave: f4(m.area),
      heegaard: '2π²'
    }[m.scene];
    check(
      lang + '/' + id + ' HUD title, pill and key readout',
      (await textOf('hudBig')).includes(key) && (await textOf('keyPill')).includes(f4(m.area)) && (await textOf('roKey')).includes(f4(m.area)) && (await textOf('hudSub')).trim().length > 0
    );
    check(
      lang + '/' + id + ' readouts show the computed numbers',
      (await textOf('roVol')).includes(f4(m.volume)) &&
        (await textOf('roVol')).includes(f4(100 * m.share)) &&
        (await textOf('roWind')).includes(f4(m.share)) &&
        (await textOf('roWind')).includes(m.boundaryEmpty ? '= ∅' : '≠ ∅') &&
        (await textOf('roWave')).includes(f4(Math.abs(m.psi))) &&
        (await textOf('roAff')).includes('1.1716') &&
        (await textOf('roAff')).includes('4.0000') &&
        (await textOf('roHeap')).includes('1.0000')
    );
    const floor = await floorLines();
    check(lang + '/' + id + ' the coordinate floor is drawn exactly outside the two origin-free cards', ['origin', 'heegaard'].includes(m.scene) ? floor === 0 && m.layers.floor === 0 : floor > 0 && m.layers.floor === 1);
  }
}
/* the rail: r across both balls */
await pick(DEFAULT);
for (const r of [0, 0.3, PI / 4, PI / 2 - 0.01, PI / 2, PI / 2 + 0.01, (2 * PI) / 3, (3 * PI) / 4, PI - 0.01, PI]) {
  await seek(r);
  const m = await state();
  check('rail r = ' + r.toFixed(4), near(m.r, r, 1e-12) && !m.playing);
  verifyMath(m, 'r=' + r.toFixed(4));
  verifyInstances(m, m.leanInstances, 'r=' + r.toFixed(4));
  check(
    'readouts at r = ' + r.toFixed(4),
    (await textOf('roKey')).includes(f4(m.area)) && (await textOf('roVol')).includes(f4(m.volume)) && (await textOf('roWave')).includes(f4(Math.abs(m.psi)))
  );
  // the wavefront is drawn as the sphere of radius sin r around the centre of its ball
  const handleAt = await page.evaluate((t) => window.TERNION_NO_EXTERIOR_DEBUG.dragTarget(t), r);
  const box = await page.locator('#frontHandle').boundingBox();
  check('handle sits on the wavefront point at r = ' + r.toFixed(4), !!box && Math.hypot(box.x + box.width / 2 - handleAt.x, box.y + box.height / 2 - handleAt.y) < 1.5);
}
check('the swept share is monotone and the area peaks at π/2', await page.evaluate(() => {
  const d = window.TERNION_NO_EXTERIOR_DEBUG;
  let last = -1, best = -1, at = -1;
  for (let k = 0; k <= 360; k++) {
    const c = d.calc((k / 360) * Math.PI);
    if (c.share < last - 1e-15) return false;
    last = c.share;
    if (c.area > best) { best = c.area; at = k; }
  }
  return at === 180 && Math.abs(best - 4 * Math.PI) < 1e-12;
}));
/* the external point C */
for (const phi of [0, 30, 90, 150, 180]) {
  await input('#pinC', phi);
  await until(page, () => !window.TERNION_NO_EXTERIOR_DEBUG.state.blending);
  const m = await state();
  check('C at φ = ' + phi + ' opens the origin scene and drifts the affine sum', m.scene === 'origin' && m.phiDeg === phi && m.preset === null && !m.playing && near(m.affineNorm2, 4 - 2 * S2 * Math.cos((phi * PI) / 180), 1e-12) && m.affineNorm2 > 1);
  verifyMath(m, 'φ=' + phi);
  check('roAff at φ = ' + phi, (await textOf('roAff')).includes(f4(m.affineNorm2)));
}
/* the lens and the views */
await pick(DEFAULT);
const beforeLens = await state();
const tagText = () => page.locator('.stage .tags .tag:not([hidden])').allInnerTexts();
const tags0 = await tagText(),
  pill0 = await textOf('scenePill');
await page.click('#lensToggleBtn');
await settle(page);
const lens = await state();
check(
  'the lens renames the picture and keeps the experiment',
  lens.lens !== beforeLens.lens &&
    !same(await tagText(), tags0) &&
    (await tagText()).some((t) => t.includes('(1, 0, 0, 0)')) &&
    (await textOf('scenePill')) !== pill0 &&
    ['r', 'phiDeg', 'scene', 'preset', 't'].every((k) => lens[k] === beforeLens[k])
);
await page.click('#lensToggleBtn');
await settle(page);
const views = [];
for (const name of CAM_NAMES) {
  await page.click('[data-cam="' + name + '"]');
  await settle(page);
  check('selected view ' + name, (await state()).cam === name && (await page.getAttribute('[data-cam="' + name + '"]', 'aria-pressed')) === 'true');
  await until(page, () => !document.querySelector('#stage').hasAttribute('aria-busy'));
  views.push((await state()).camera);
  await layout(page, name);
}
check('the three views have distinct orientations', new Set(views.map((c) => [c.yaw, c.pitch].join('/'))).size === 3);
/* the amber handle */
await pick(DEFAULT);
await page.locator('#stage').scrollIntoViewIfNeeded();
await settle(page);
const here = await state(),
  hbox = await page.locator('#frontHandle').boundingBox();
const from = await page.evaluate(() => TERNION_NO_EXTERIOR_DEBUG.dragTarget(TERNION_NO_EXTERIOR_DEBUG.state.r));
const to = await page.evaluate(() => TERNION_NO_EXTERIOR_DEBUG.dragTarget(Math.PI / 3));
check('the handle lies on the wavefront point', !!hbox && Math.hypot(hbox.x + hbox.width / 2 - from.x, hbox.y + hbox.height / 2 - from.y) < 1.5);
await page.mouse.move(from.x, from.y);
await page.mouse.down();
await page.mouse.move(to.x, to.y, { steps: 10 });
await page.mouse.up();
await settle(page);
const pulled = await state();
check('dragging the handle sets r and leaves the camera alone', Math.abs(pulled.r - PI / 3) < 0.01 && same(pulled.camera, here.camera) && !pulled.playing && !pulled.preset, String(pulled.r));
await page.locator('#frontHandle').focus();
await page.keyboard.press('ArrowRight');
await settle(page);
check('arrow keys on the handle move r by one degree', near((await state()).r, pulled.r + PI / 180, 1e-9) && !(await state()).playing);
for (const id of Object.keys(CARDS))
  check(id + ' plays', await playsAfter(page, () => page.click('[data-preset="' + id + '"]'), () => window.TERNION_NO_EXTERIOR_DEBUG.state));
/* colours, marks and the strip */
await pick(DEFAULT);
for (const id of Object.keys(CARDS)) {
  await pick(id);
  await seek(CARDS[id].still);
  const colors = await primitiveColours(page);
  check(
    id + ' semantic stage colours: amber only on the current r',
    colors.seen.filter((x) => x.colors.includes(colors.amber)).every((x) => CURSOR.test(x.key)) &&
      colors.seen.some((x) => x.key === 'cursor' && x.colors.includes(colors.amber)) &&
      colors.seen.every((x) => !x.colors.includes(colors.ok) && !x.colors.includes(colors.warn))
  );
}
await pick(DEFAULT);
await seek(CARDS[DEFAULT].still);
const marks = await page.evaluate(() => TRV.solids[0].marks().map((m) => m.hidden));
check('the balls hide a rear mark and leave a front mark visible', marks.includes(true) && marks.includes(false));
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
for (const [role, expected, name] of [
  [prism.cyan, (r) => Math.sin(r) ** 2, 'A/4π'],
  [prism.violet, (r) => simpsonVolume(r) / (2 * PI * PI), 'V/2π²'],
  [prism.sigma, (r) => Math.cos(r), 'ψ₀']
]) {
  const trace = prism.traces.find(([method, pts, color]) => method === 'line' && color === role && pts.length > 2);
  check('strip samples ' + name + ' over [0, π]', !!trace && trace[1][0][0] === 0 && near(trace[1].at(-1)[0], PI, 1e-12) && trace[1].every(([r, v]) => near(v, expected(r), 1e-8)));
}
const cursors = prism.traces.filter(([method, ...rest]) => (method === 'dot' || method === 'vline') && rest.includes(prism.amber));
const seams = prism.traces.filter(([method, x, color]) => method === 'vline' && color === prism.magenta).map((row) => row[1]);
check('strip cursor at r and the seam at π/2', cursors.length === 2 && cursors.every((row) => near(row[1], CARDS[DEFAULT].still, 1e-12)) && same(seams, [PI / 2]));
const badColors = await domColours(page);
check('semantic badge and readout colours', !badColors.length, badColors.slice(0, 3).join(' | '));
const am = await stripAmber(page);
check('the amber strip cursor is narrow and spans the plot', am.n > 10 && am.width < 12 * am.dpr && am.height > am.h * 0.48, JSON.stringify(am));

/* narrow pages, cited figures and stills */
const FIGURE_TEXT = {
  'skyrmion-winding-self-lock': ['Q = 1'],
  'field-wave-particle-trinity': ['0.7071'],
  'origin-free-no-point-c': ['1.1716', '4.0000'],
  'wavefront-outward-is-inward': ['6.2832', '90.92%'],
  'heegaard-antipodal-no-exterior': ['19.7392']
};
for (const lang of ['zh', 'en']) {
  for (const [width, height, figure] of [
    [390, 844, false],
    [334, 500, true],
    [740, 500, true]
  ]) {
    colorScheme = width === 390 ? 'light' : 'dark';
    const p = await T.open(BOOK, ID, '?lang=' + lang + (figure ? '&embed=1&preset=' + DEFAULT : ''), { viewport: { width, height }, reducedMotion: 'reduce' });
    await settle(p);
    for (let j = 0; j < Object.keys(CARDS).length; j++) {
      const id = (await state(p)).preset;
      await layout(p, lang + '/' + width + '/' + id, figure);
      if (lang === 'en') check('English ' + width + '/' + id, !(await cjkLeftovers(p)).length);
      if (figure) {
        check('cited frame hides the strip ' + id, (await p.locator('.strip').isHidden()) && (await p.locator('.tour .tour-note').isVisible()));
        const note = await p.locator('.tour .tour-note').innerText();
        check(lang + ' figure note of ' + id + ' states the still numbers', FIGURE_TEXT[id].every((x) => note.includes(x)), note);
      }
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
    check('still ' + lang + '/' + id + ' parks on the declared frame', !m.playing && near(m.t, await cardStill(id, p), 1e-12) && near(m.r, CARDS[id].still, 1e-12) && (await p.locator('#frontHandle').isHidden()));
    const want = {
      'skyrmion-winding-self-lock': () => near(m.share, 1, 1e-12) && m.boundaryEmpty,
      'field-wave-particle-trinity': () => f4(m.psi) === '0.7071',
      'origin-free-no-point-c': () => f4(m.affineNorm2) === '1.1716' && f4(m.aff2Norm2) === '4.0000',
      'wavefront-outward-is-inward': () => f4(m.area) === '6.2832' && (100 * m.share).toFixed(2) === '90.92',
      'heegaard-antipodal-no-exterior': () => near(m.share, 0.5, 1e-12) && near(m.area, 4 * PI, 1e-12)
    }[id];
    check('still ' + lang + '/' + id + ' shows the numbers of its caption', want());
    await p.context().close();
  }
}
check('permanent dark console in both system schemes', !paletteMutations.length && paletteDocuments.every((x) => x.absent) && paletteDocuments.some((x) => x.dark) && paletteDocuments.some((x) => !x.dark));
check('zero console warnings', browserWarnings.length === 0, browserWarnings.slice(0, 3).join(' | '));
check('zero shared quality warnings', T.warnings.length === 0, JSON.stringify(T.warnings));
check('zero browser or request errors', T.errors.length === 0, T.errors.slice(0, 3).join(' | '));
await T.finish();
