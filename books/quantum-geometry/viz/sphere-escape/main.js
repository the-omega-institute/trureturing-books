/* ORTHO//ESCAPE · 对角逃逸 — Cantor's diagonal flip, the Dottie cosine iteration and Euclid's prime escape, on one step rail.
   A list f holds N binary rows f(r, ·), r, c = 1 … N. Step k reads the diagonal entry f(k, k) and flips it: rule D₀
   (f(k, k) = 0 ↦ d(k) = 1) counts +1, rule D₁ (f(k, k) = 1 ↦ d(k) = 0) counts −1. The flipped diagonal d is trureturing's
   relativeSemanticDiagonal with Address = Coordinate = {1, …, N}, latent = id and twist = ¬, so it differs from every
   listed row (D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_ne_listed_decode).
   The same step k advances xₖ = cos xₖ₋₁ and lists the k-th prime with the least prime factor of p₁⋯pₖ + 1.
   Integers are exact; cos, sin and the Euler products are double precision. Colours: cyan f = 1, magenta the flipped
   diagonal d, amber the current step. Pure maths: window.SE_MATH. Read-only probe for tests: window.SE_DEBUG.
   Thumbnail hook: window.TRV_THUMB. */
(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const L = TRV.L, esc = TRV.esc;
  const NMIN = 3, NMAX = 8, SMAX = 63, XMAX = 314, NS = [4, 6, 8], MODES = ['diagonal', 'dottie', 'prime'];
  const DEFAULT = { N: 6, seed: 11, x0: 100, mode: 'diagonal' };
  const MINUS = '−';
  const SUB = '₀₁₂₃₄₅₆₇₈₉', SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
  const sub = (n) => String(n).split('').map((d) => SUB[+d]).join('');
  const sup = (n) => String(n).split('').map((d) => SUP[+d]).join('');

  /* ---------- pure mathematics (window.SE_MATH) ---------- */
  /** The mulberry32 generator (the same as TRV.mulberry32), kept here so the list of a seed depends on nothing else. */
  function mulberry32(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  /** The n × n list of seed S: the top-left block of the NMAX × NMAX bits drawn row by row from mulberry32(S). */
  function matrixFromSeed(n, seed) {
    const rnd = mulberry32(seed >>> 0), m = [];
    for (let r = 0; r < NMAX; r++) { const row = []; for (let c = 0; c < NMAX; c++) row.push(rnd() < 0.5 ? 0 : 1); m.push(row); }
    return m.slice(0, n).map((row) => row.slice(0, n));
  }
  /** The n × n preset lists: identity basis, alternating (r + c) mod 2 (zero diagonal), dense block (all ones). */
  function presetMatrix(name, n) {
    const at = { identity: (r, c) => (r === c ? 1 : 0), alternating: (r, c) => (r + c) % 2, dense: () => 1 }[name];
    if (!at) return null;
    return Array.from({ length: n }, (_, r) => Array.from({ length: n }, (__, c) => at(r, c)));
  }
  const transpose = (f) => f.map((row, r) => row.map((_, c) => f[c][r]));
  /** d(r) = ¬f(r, r): the flipped diagonal. */
  const cantorDiagonal = (f) => f.map((row, r) => 1 - row[r]);
  function hamming(a, b) { let h = 0; for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) h++; return h; }
  /** For every row r: the witness column r (d(r) ≠ f(r, r)) and the Hamming distance to d; d is listed iff some distance is 0. */
  function verifyCantorEscape(f, d = cantorDiagonal(f)) {
    const witness = f.map((row, r) => row[r] !== d[r]);
    const ham = f.map((row) => hamming(row, d));
    const minHam = Math.min(...ham), argmin = ham.indexOf(minHam);
    const listed = ham.some((h) => h === 0);
    return { ok: witness.every(Boolean) && !listed && minHam >= 1, witness, ham, minHam, argmin, listed };
  }
  /** x₀, x₁ = cos x₀, …, x_k and the residuals |cos xᵢ − xᵢ|. */
  function dottieTrajectory(x0, k) {
    const xs = [x0];
    for (let i = 0; i < k; i++) xs.push(Math.cos(xs[i]));
    return { xs, res: xs.map((x) => Math.abs(Math.cos(x) - x)) };
  }
  /** x* = cos x* by Newton's method from 0.74 (stops when the step no longer moves x). */
  function dottieStar() {
    let x = 0.74;
    for (let i = 0; i < 50; i++) { const nx = x - (Math.cos(x) - x) / (-Math.sin(x) - 1); if (nx === x) break; x = nx; }
    return x;
  }
  /** The worst |sin²x + cos²x − 1| over xs; ok within four ulps of 1. */
  function verifyDottiePythagorean(xs) {
    let worst = 0;
    for (const x of xs) { const s = Math.sin(x), c = Math.cos(x); worst = Math.max(worst, Math.abs(s * s + c * c - 1)); }
    return { worst, ok: worst <= 4 * Number.EPSILON };
  }
  /** The primes ≤ n (sieve of Eratosthenes). */
  function sievePrimes(n) {
    if (n < 2) return [];
    const comp = new Uint8Array(n + 1), out = [];
    for (let i = 2; i <= n; i++) { if (comp[i]) continue; out.push(i); for (let j = i * i; j <= n; j += i) comp[j] = 1; }
    return out;
  }
  function firstPrimes(k) { for (let lim = 32; ; lim *= 2) { const p = sievePrimes(lim); if (p.length >= k) return p.slice(0, k); } }
  function leastPrimeFactor(n) {
    if (n % 2 === 0) return 2;
    for (let p = 3; p * p <= n; p += 2) if (n % p === 0) return p;
    return n;
  }
  /** Euclid: Q = p₁⋯pₖ + 1 and its least prime factor q, which is never on the list. */
  function euclidEscape(primes) {
    const Q = primes.reduce((a, p) => a * p, 1) + 1, q = leastPrimeFactor(Q);
    return { Q, q, cofactor: Q / q, outside: !primes.includes(q) };
  }
  /** ∏ (1 − p^(−s))^(−1) over the given primes. */
  function eulerProductPartial(primes, s) { let prod = 1; for (const p of primes) prod /= 1 - Math.pow(p, -s); return prod; }
  const ZETA2 = Math.PI * Math.PI / 6;
  const XSTAR = dottieStar();

  window.SE_MATH = Object.freeze({
    mulberry32, matrixFromSeed, presetMatrix, transpose, cantorDiagonal, hamming, verifyCantorEscape, dottieTrajectory, dottieStar,
    verifyDottiePythagorean, sievePrimes, firstPrimes, leastPrimeFactor, euclidEscape, eulerProductPartial, ZETA2, XSTAR
  });

  /* ---------- state ---------- */
  const q = new URLSearchParams(location.search);
  const clampInt = (x, lo, hi, dflt) => { const v = Math.round(Number(x)); return Number.isFinite(v) ? Math.max(lo, Math.min(hi, v)) : dflt; };
  const S = {
    N: q.has('n') ? clampInt(q.get('n'), NMIN, NMAX, DEFAULT.N) : DEFAULT.N,
    seed: q.has('seed') ? clampInt(q.get('seed'), 1, SMAX, DEFAULT.seed) : DEFAULT.seed,
    x0: q.has('x0') ? clampInt(q.get('x0'), 0, XMAX, DEFAULT.x0) : DEFAULT.x0,
    mode: MODES.includes(q.get('mode')) ? q.get('mode') : DEFAULT.mode,
    pass: 0, playing: false, hover: null, master: null
  };
  S.master = matrixFromSeed(NMAX, S.seed);
  let R = null; // derived data of the current list and seed angle
  let frames = 0, pending = false, built = '';
  const rng = TRV.mulberry32(20261111);

  const listKey = () => `${S.N}|${S.master.map((row) => row.join('')).join('')}|${S.x0}`;
  function derive() {
    const N = S.N, f = S.master.slice(0, N).map((row) => row.slice(0, N));
    const d = cantorDiagonal(f), v = verifyCantorEscape(f, d), diag = f.map((row, r) => row[r]);
    const signs = diag.map((x) => (x === 0 ? 1 : -1));
    const traj = dottieTrajectory(S.x0 / 100, N), pyth = verifyDottiePythagorean(traj.xs);
    const primes = firstPrimes(N);
    const escapes = primes.map((_, k) => euclidEscape(primes.slice(0, k + 1)));
    const euler = primes.map((_, k) => eulerProductPartial(primes.slice(0, k + 1), 2));
    const trace = diag.reduce((a, b) => a + b, 0), weight = d.reduce((a, b) => a + b, 0);
    R = { key: listKey(), N, f, d, diag, signs, v, traj, pyth, primes, escapes, euler, trace, weight, total: weight - trace,
      ones: f.reduce((a, row) => a + row.reduce((x, y) => x + y, 0), 0) };
  }
  const fresh = () => { if (!R || R.key !== listKey()) derive(); return R; };
  const edited = () => { const m = matrixFromSeed(NMAX, S.seed); return S.master.some((row, r) => row.some((x, c) => x !== m[r][c])); };
  function presetActive(name) {
    if (name === 'dottie0') return S.x0 === 0 && S.mode === 'dottie';
    if (name === 'dottie1') return S.x0 === 100 && S.mode === 'dottie';
    const p = presetMatrix(name, S.N);
    return !!p && p.every((row, r) => row.every((x, c) => x === S.master[r][c]));
  }

  /* ---------- formatting ---------- */
  const fmtSigned = (x) => (x > 0 ? '+' + x : x < 0 ? MINUS + -x : '0');
  const signCls = (x) => (x > 0 ? 'vpos' : x < 0 ? 'vneg' : 'vzero');
  const fx = (x, k = 4) => (x < 0 ? MINUS : '') + Math.abs(x).toFixed(k);
  /** Compact scientific form 1.2e−3 (0 stays 0). */
  function fsci(x, k = 1) {
    if (x === 0) return '0';
    if (Math.abs(x) >= 1e-3) return fx(x, 4);
    const [m, e] = Math.abs(x).toExponential(k).split('e');
    return `${x < 0 ? MINUS : ''}${m}e${e.replace('-', MINUS).replace('+', '')}`;
  }
  const bits = (a) => a.join('');
  const mark = (ok) => `<span class="${ok ? 'okmark' : 'badmark'}">${ok ? '✓' : '✗'}</span>`;

  /* ---------- ledger ---------- */
  function cells(row, touchCol) {
    let h = '';
    for (let c = 0; c < R.N; c++) h += `<span class="${row[c] === 1 ? 'd1' : 'd0'}${c === touchCol ? ' touch' : ''}">${row[c]}</span>`;
    return `<div class="cells">${h}</div>`;
  }
  function buildLedger() {
    const rows = [];
    let head = '';
    for (let c = 1; c <= R.N; c++) head += `<span>${c}<small>c${sub(c)}</small></span>`;
    rows.push(`<div class="drow hdr" aria-hidden="true"><span class="lab">${L('列 c', 'col c')}</span><div class="cells">${head}</div><span class="what"></span></div>`);
    // input: the diagonal the list reads to itself; sum (step 0): nothing flipped yet, the iteration sits at x₀
    let diagCells = '';
    for (let c = 0; c < R.N; c++) diagCells += `<span class="${R.diag[c] ? 'd1' : 'd0'} touch">${R.diag[c]}</span>`;
    rows.push(`<div class="drow input" role="listitem"><span class="lab">diag</span><div class="cells">${diagCells}</div><span class="what"><code>f(r, r) · tr f = ${R.trace}</code><span class="name">${L('清单在第 r 行读自己的第 r 位', 'row r of the list read at its own place r')}</span></span></div>`);
    let blank = '';
    for (let c = 0; c < R.N; c++) blank += '<span class="d0">·</span>';
    rows.push(`<div class="drow sum" role="listitem" data-pass="0"><span class="lab">k = 0</span><div class="cells">${blank}</div><span class="what"><code>x₀ = ${fx(R.traj.xs[0])}</code><span class="name">${L('第 0 步：尚未翻转，余弦迭代从 x₀ 出发', 'step 0: nothing flipped yet; the cosine iteration starts at x₀')}</span></span></div>`);
    R.f.forEach((row, r) => {
      const k = r + 1, s = R.signs[r], zero = R.diag[r] === 0;
      const name = zero ? L(`D₀ 读到 0，写 d(${k}) = 1`, `D₀ reads 0, writes d(${k}) = 1`) : L(`D₁ 读到 1，写 d(${k}) = 0`, `D₁ reads 1, writes d(${k}) = 0`);
      rows.push(`<div class="drow pass" role="listitem" data-pass="${k}"><span class="lab">#${k}</span>${cells(row, r)}<span class="what"><span class="sgn ${s > 0 ? 'pos' : 'neg'}">${fmtSigned(s)}</span><code>¬f(${k},${k}) = ${R.d[r]}</code><span class="name">${esc(name)} · x${sub(k)} = ${fx(R.traj.xs[k])}</span></span></div>`);
    });
    let dc = '';
    for (let c = 1; c <= R.N; c++) dc += `<span class="d0" data-c="${c}">·</span>`;
    const N = R.N;
    rows.push(`<div class="drow final" role="listitem" data-pass="${N}" data-final="1"><span class="lab">d</span><div class="cells">${dc}</div><span class="what"><code>d = (¬f(1,1), …, ¬f(${N},${N}))</code><span class="name">${L('与每一行都不同', 'differs from every row')} ${mark(R.v.ok)} · |cos x${sub(N)} ${MINUS} x${sub(N)}| = ${fsci(R.traj.res[N])} &gt; 0</span></span></div>`);
    $('ledger').innerHTML = rows.join('');
    $('tape').innerHTML = R.signs.map((s, r) => `<i class="${s > 0 ? 'pos' : 'neg'}" data-pass="${r + 1}" title="#${r + 1} ${fmtSigned(s)}"></i>`).join('');
  }
  function markLedger() {
    const K = R.N;
    $('ledger').querySelectorAll('.drow[data-pass]').forEach((row) => {
      const k = +row.dataset.pass, fin = row.dataset.final === '1', now = fin ? S.pass === K : k === S.pass;
      row.classList.toggle('now', now);
      row.classList.toggle('future', !fin && k > S.pass);
      row.setAttribute('aria-current', now && !fin ? 'step' : 'false');
    });
    // the escape row reveals d(c) once step c has read the diagonal entry f(c, c)
    $('ledger').querySelectorAll('.drow.final .cells span').forEach((el) => {
      const c = +el.dataset.c, shown = c <= S.pass;
      el.textContent = shown ? String(R.d[c - 1]) : '·';
      el.className = (shown ? 'd2' : 'd0') + (c === S.pass ? ' touch' : '');
    });
    $('tape').querySelectorAll('i').forEach((t) => { const k = +t.dataset.pass; t.classList.toggle('now', k === S.pass); t.classList.toggle('future', k > S.pass); });
    const partial = R.signs.slice(0, S.pass).reduce((a, b) => a + b, 0);
    $('tapeSum').innerHTML = `${L('至第', 'to step')} ${S.pass}${L(' 步', '')}: <span class="${signCls(partial)}">${fmtSigned(partial)}</span> · ${L('总计', 'total')} <span class="${signCls(R.total)}">${fmtSigned(R.total)}</span> = |d| ${MINUS} tr f`;
    $('pass').max = String(K);
    $('pass').value = String(S.pass);
    $('passLabel').innerHTML = `${L('第', 'STEP ')}${S.pass}${L(' 步', '')} <small>/ ${K}</small>`;
    $('prev').disabled = $('first').disabled = S.pass === 0;
    $('next').disabled = $('last').disabled = S.pass >= K;
    // keep the current row visible inside the ledger's own scroller (never scroll the page)
    const wrap = $('sheetWrap'), row = $('ledger').querySelector('.drow.now');
    if (row) {
      const top = row.offsetTop - 34, bottom = row.offsetTop + row.offsetHeight + 6;
      if (top < wrap.scrollTop) wrap.scrollTop = top;
      else if (bottom > wrap.scrollTop + wrap.clientHeight) wrap.scrollTop = bottom - wrap.clientHeight;
    }
  }

  /* ---------- readouts ---------- */
  function readouts() {
    const { N, v, traj, pyth } = R, k = S.pass;
    $('roN').innerHTML = `${N}<span class="sub">2${sup(N)} = ${2 ** N} ${L('个串', 'strings')} &gt; ${N} ${L('行', 'rows')}</span>`;
    $('roTrace').innerHTML = `${bits(R.diag)}<span class="sub">tr f = ${R.trace}</span>`;
    $('roD').innerHTML = `<span class="vneg">${bits(R.d)}</span><span class="sub">|d| = ${R.weight}</span>`;
    $('roHam').innerHTML = `${v.minHam}<span class="sub">${L('最近的行', 'nearest row')} #${v.argmin + 1} · ≥ 1 ${mark(v.minHam >= 1)}</span>`;
    $('roX').innerHTML = `${fx(traj.xs[k], 6)}<span class="sub">k = ${k} · x₀ = ${fx(S.x0 / 100, 2)} rad</span>`;
    $('roSin').innerHTML = `${fx(Math.sin(XSTAR), 6)}<span class="sub">|cos′(x*)| = sin x* &lt; 1</span>`;
    $('roHero').className = v.ok ? 'vpos' : 'vneg';
    $('roHeroSub').textContent = `x* ≈ ${XSTAR.toFixed(6)} · sin²x* + cos²x* = 1`;
    $('roHeroMark').className = v.ok && pyth.ok ? 'okmark' : 'badmark';
    $('roHeroMark').textContent = v.ok && pyth.ok ? '✓' : '✗';
    const wit = v.witness.filter(Boolean).length;
    $('roCantor').innerHTML = `<b class="${v.ok ? 'vpos' : 'vneg'}">${wit} / ${N}</b> ${L('行在自己的对角位与 d 不同', 'rows differ from d in their own diagonal place')} ${mark(v.ok)}<span class="sub">${L('汉明距离', 'Hamming distances')} ${v.ham.join(' · ')} · ${L('无一为 0', 'none is 0')}</span>`;
    $('roPyth').innerHTML = `<b class="${pyth.ok ? 'vpos' : 'vneg'}">${fsci(pyth.worst)}</b> = max |sin²xₖ + cos²xₖ ${MINUS} 1| ${mark(pyth.ok)}<span class="sub">k = 0 … ${N}</span>`;
    const e = R.escapes[N - 1];
    $('roNote').textContent = L(
      `对角线上 ${N - R.trace} 个 0 用 D₀ 翻成 1，${R.trace} 个 1 用 D₁ 翻成 0。前 ${N} 个素数之积加 1 得 ${e.Q}，它的最小素因子 ${e.q} 不在清单里。`,
      `${N - R.trace} diagonal 0${N - R.trace === 1 ? '' : 's'} flip to 1 by D₀ and ${R.trace} diagonal 1${R.trace === 1 ? '' : 's'} flip to 0 by D₁. The first ${N} primes multiplied together plus 1 give ${e.Q}, whose least prime factor ${e.q} is not on the list.`);
    $('pillN').innerHTML = `N <strong>${N} × ${N}</strong>`;
    $('pillStep').innerHTML = `${L('步', 'STEP')} <strong>${k} / ${N}</strong>`;
    $('pillEscape').innerHTML = `d ∉ Im f <strong class="${v.ok ? 'okmark' : 'badmark'}">${v.ok ? '✓' : '✗'}</strong>`;
  }

  /* ---------- the escape stage ---------- */
  const stage = $('escapeCanvas');
  function hud() {
    const k = S.pass, N = R.N;
    let big, sub2;
    if (S.mode === 'diagonal') {
      big = `d ∉ {f(1,·), …, f(${N},·)}`;
      sub2 = k ? `#${k}: f(${k},${k}) = ${R.diag[k - 1]} ↦ d(${k}) = ${R.d[k - 1]} · H(d, f(${k},·)) = ${R.v.ham[k - 1]}`
        : L('第 0 步：尚未读对角线', 'step 0: no diagonal entry read yet');
    } else if (S.mode === 'dottie') {
      big = `x* = cos x* ≈ ${XSTAR.toFixed(6)}`;
      sub2 = `x${sub(k)} = ${fx(R.traj.xs[k], 6)} · |cos x${sub(k)} ${MINUS} x${sub(k)}| = ${fsci(R.traj.res[k])}`;
    } else {
      if (k) {
        const e = R.escapes[k - 1];
        big = `p₁⋯p${sub(k)} + 1 = ${e.Q}`;
        sub2 = `${e.Q} = ${e.q}${e.cofactor > 1 ? ' · ' + e.cofactor : ''} · ${e.q} ∉ {${R.primes.slice(0, k).join(', ')}} · ∏(1 ${MINUS} p⁻²)⁻¹ = ${fx(R.euler[k - 1], 4)} &lt; π²/6`;
      } else {
        big = `p₁⋯pₖ + 1`;
        sub2 = L('第 0 步：素数清单为空', 'step 0: the prime list is empty');
      }
    }
    $('hudBig').textContent = big;
    $('hudSub').innerHTML = sub2;
  }
  function drawStage() {
    const dpr = TRV.fitCanvas(stage), ctx = stage.getContext('2d'), W = stage.width, H = stage.height;
    const pal = TRV.palette, mono = TRV.fonts.data, u = dpr;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = pal.stage; ctx.fillRect(0, 0, W, H);
    // keep the drawing below the HUD text
    const cr = stage.getBoundingClientRect(), hr = $('hudSub').getBoundingClientRect();
    const top = Math.max(40, Math.min(cr.height * 0.55, hr.bottom - cr.top + 8)) * dpr;
    const box = { x: 14 * u, y: top, w: W - 28 * u, h: H - top - 12 * u };
    if (box.w < 40 * u || box.h < 30 * u) return;
    if (S.mode === 'diagonal') drawDiagonal(ctx, box, pal, mono, u);
    else if (S.mode === 'dottie') drawDottie(ctx, box, pal, mono, u);
    else drawPrimes(ctx, box, pal, mono, u);
  }
  /** The listed rows on a circle, d outside it, and the current row against d bit by bit. */
  function drawDiagonal(ctx, b, pal, mono, u) {
    const N = R.N, k = S.pass;
    const Rad = Math.max(16 * u, Math.min(b.h / 2 - 8 * u, b.w * 0.16)), cx = b.x + Rad + 26 * u, cy = b.y + b.h / 2;
    ctx.strokeStyle = TRV.alpha(pal.cyan, 0.35); ctx.lineWidth = 1.2 * u;
    ctx.beginPath(); ctx.arc(cx, cy, Rad, 0, 2 * Math.PI); ctx.stroke();
    const pts = R.f.map((_, r) => { const a = -Math.PI / 2 + (2 * Math.PI * r) / N; return [cx + Rad * Math.cos(a), cy + Rad * Math.sin(a)]; });
    const ang = -Math.PI / 5, dx = cx + Rad * 1.75 * Math.cos(ang), dy = cy + Rad * 1.75 * Math.sin(ang);
    // lines from d to every row, labelled with the Hamming distance on the current one
    pts.forEach(([x, y], r) => {
      const cur = r === k - 1;
      ctx.strokeStyle = cur ? pal.amber : TRV.alpha(pal.magenta, 0.25); ctx.lineWidth = (cur ? 1.6 : 1) * u;
      ctx.setLineDash(cur ? [] : [3 * u, 3 * u]);
      ctx.beginPath(); ctx.moveTo(dx, dy); ctx.lineTo(x, y); ctx.stroke();
    });
    ctx.setLineDash([]);
    // the normal escape arrow from the circle to d
    const ex = cx + Rad * Math.cos(ang), ey = cy + Rad * Math.sin(ang);
    ctx.strokeStyle = pal.magenta; ctx.lineWidth = 1.6 * u;
    ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(dx, dy); ctx.stroke();
    ctx.font = `${10 * u}px ${mono}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    pts.forEach(([x, y], r) => {
      const cur = r === k - 1;
      ctx.fillStyle = cur ? pal.amber : pal.cyan;
      ctx.beginPath(); ctx.arc(x, y, (cur ? 4.5 : 3.2) * u, 0, 2 * Math.PI); ctx.fill();
      const a = -Math.PI / 2 + (2 * Math.PI * r) / N;
      ctx.fillStyle = cur ? pal.amber : pal.dim;
      ctx.fillText('#' + (r + 1), x + 12 * u * Math.cos(a), y + 11 * u * Math.sin(a));
    });
    ctx.shadowColor = pal.magenta; ctx.shadowBlur = 12 * u; ctx.fillStyle = pal.magenta;
    ctx.beginPath(); ctx.arc(dx, dy, 5 * u, 0, 2 * Math.PI); ctx.fill(); ctx.shadowBlur = 0;
    ctx.font = `600 ${12 * u}px ${mono}`; ctx.fillText('d', dx + 11 * u, dy - 9 * u);
    if (k) {
      const [x, y] = pts[k - 1];
      ctx.font = `${10.5 * u}px ${mono}`; ctx.fillStyle = pal.amber;
      ctx.fillText(`H = ${R.v.ham[k - 1]}`, (x + dx) / 2 + 12 * u, (y + dy) / 2);
    }
    // Hamming distances H(d, f(r, ·)) as bars: every bar clears the floor 0, so d is no listed row
    const rx = Math.max(cx + Rad * 1.75 + 40 * u, b.x + b.w * 0.42), rw = b.x + b.w - rx;
    const slot = Math.min(30 * u, rw / N), bw = slot * 0.62, base = b.y + b.h - 4 * u, unit = (b.h - 12 * u) / N;
    if (slot < 6 * u) return;
    ctx.strokeStyle = pal.lineHot; ctx.lineWidth = 1 * u;
    ctx.beginPath(); ctx.moveTo(rx - 6 * u, base); ctx.lineTo(rx + N * slot, base); ctx.stroke();
    ctx.strokeStyle = TRV.alpha(pal.amber, 0.6); ctx.setLineDash([3 * u, 3 * u]);
    ctx.beginPath(); ctx.moveTo(rx - 6 * u, base - unit); ctx.lineTo(rx + N * slot, base - unit); ctx.stroke(); ctx.setLineDash([]);
    R.v.ham.forEach((hv, r) => {
      const x = rx + r * slot + (slot - bw) / 2, cur = r === k - 1, seen = r < k;
      ctx.fillStyle = cur ? pal.amber : seen ? pal.cyan : TRV.alpha(pal.cyan, 0.3);
      if (cur) { ctx.shadowColor = pal.amber; ctx.shadowBlur = 10 * u; }
      ctx.fillRect(x, base - hv * unit, bw, hv * unit); ctx.shadowBlur = 0;
      ctx.fillStyle = TRV.alpha(pal.magenta, seen ? 0.95 : 0.35); // the witness: the bottom unit is the diagonal place
      ctx.fillRect(x, base - unit, bw, Math.max(2 * u, unit * 0.18));
    });
    ctx.font = `${9.5 * u}px ${mono}`; ctx.fillStyle = pal.dim; ctx.textAlign = 'right';
    ctx.fillText('0', rx - 9 * u, base); ctx.fillStyle = pal.amber; ctx.fillText('1', rx - 9 * u, base - unit);
  }
  /** The cobweb of x ↦ cos x between y = cos x and y = x, with the unit-circle legs cos xₖ, sin xₖ. */
  function drawDottie(ctx, b, pal, mono, u) {
    const k = S.pass, xs = R.traj.xs;
    // unit circle: the angle xₖ with its cosine and sine legs (sin² + cos² = 1)
    const ir = Math.min(b.h / 2 - 4 * u, 46 * u), icx = b.x + ir + 4 * u, icy = b.y + b.h / 2;
    ctx.strokeStyle = TRV.alpha(pal.dim, 0.6); ctx.lineWidth = 1 * u;
    ctx.beginPath(); ctx.arc(icx, icy, ir, 0, 2 * Math.PI); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(icx - ir, icy); ctx.lineTo(icx + ir, icy); ctx.moveTo(icx, icy - ir); ctx.lineTo(icx, icy + ir); ctx.strokeStyle = TRV.alpha(pal.faint, 0.8); ctx.stroke();
    const xa = xs[k], px = icx + ir * Math.cos(xa), py = icy - ir * Math.sin(xa);
    ctx.lineWidth = 2 * u;
    ctx.strokeStyle = pal.cyan; ctx.beginPath(); ctx.moveTo(icx, icy); ctx.lineTo(px, icy); ctx.stroke();
    ctx.strokeStyle = pal.magenta; ctx.beginPath(); ctx.moveTo(px, icy); ctx.lineTo(px, py); ctx.stroke();
    ctx.strokeStyle = pal.amber; ctx.lineWidth = 1.6 * u; ctx.beginPath(); ctx.moveTo(icx, icy); ctx.lineTo(px, py); ctx.stroke();
    ctx.fillStyle = pal.amber; ctx.beginPath(); ctx.arc(px, py, 3.2 * u, 0, 2 * Math.PI); ctx.fill();
    // the cobweb plot
    const X0 = -1.1, X1 = 3.25, Y0 = -1.1, Y1 = 1.25;
    const pl = icx + ir + 22 * u, pw = b.x + b.w - pl, ph = b.h;
    if (pw < 60 * u) return;
    const sx = (x) => pl + ((x - X0) / (X1 - X0)) * pw, sy = (y) => b.y + ph - ((y - Y0) / (Y1 - Y0)) * ph;
    ctx.strokeStyle = TRV.alpha(pal.faint, 0.9); ctx.lineWidth = 1 * u;
    ctx.beginPath(); ctx.moveTo(sx(X0), sy(0)); ctx.lineTo(sx(X1), sy(0)); ctx.moveTo(sx(0), sy(Y0)); ctx.lineTo(sx(0), sy(Y1)); ctx.stroke();
    ctx.strokeStyle = TRV.alpha(pal.dim, 0.8); ctx.setLineDash([4 * u, 3 * u]);
    ctx.beginPath(); ctx.moveTo(sx(Y0), sy(Y0)); ctx.lineTo(sx(Y1), sy(Y1)); ctx.stroke(); ctx.setLineDash([]);
    ctx.strokeStyle = pal.cyan; ctx.lineWidth = 1.6 * u; ctx.beginPath();
    for (let i = 0; i <= 200; i++) { const x = X0 + ((X1 - X0) * i) / 200; if (i) ctx.lineTo(sx(x), sy(Math.cos(x))); else ctx.moveTo(sx(x), sy(Math.cos(x))); }
    ctx.stroke();
    // cobweb: (xᵢ, xᵢ) → (xᵢ, xᵢ₊₁) → (xᵢ₊₁, xᵢ₊₁)
    ctx.lineWidth = 1.4 * u;
    for (let i = 0; i < k; i++) {
      ctx.strokeStyle = i === k - 1 ? pal.amber : TRV.alpha(pal.magenta, 0.75);
      ctx.beginPath(); ctx.moveTo(sx(xs[i]), sy(i ? xs[i] : 0)); ctx.lineTo(sx(xs[i]), sy(xs[i + 1])); ctx.lineTo(sx(xs[i + 1]), sy(xs[i + 1])); ctx.stroke();
    }
    ctx.strokeStyle = TRV.alpha(pal.amber, 0.5); ctx.setLineDash([2 * u, 3 * u]);
    ctx.beginPath(); ctx.moveTo(sx(XSTAR), sy(XSTAR)); ctx.lineTo(sx(XSTAR), sy(0)); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = pal.amber; ctx.shadowColor = pal.amber; ctx.shadowBlur = 10 * u;
    ctx.beginPath(); ctx.arc(sx(k ? xs[k] : xs[0]), sy(k ? xs[k] : 0), 4 * u, 0, 2 * Math.PI); ctx.fill(); ctx.shadowBlur = 0;
    ctx.font = `${10 * u}px ${mono}`; ctx.textAlign = 'center'; ctx.textBaseline = 'top'; ctx.fillStyle = pal.amber;
    ctx.fillText('x*', sx(XSTAR), sy(0) + 3 * u);
    ctx.fillStyle = pal.dim; ctx.fillText('π', sx(Math.PI), sy(0) + 3 * u);
  }
  /** Integers 1 … M on a Sacks spiral (r = √n, θ = 2π√n): primes cyan, the listed ones amber, Euclid's escape prime magenta;
      beside it the partial Euler product against π²/6. */
  function drawPrimes(ctx, b, pal, mono, u) {
    const k = S.pass, M = 600, listed = new Set(R.primes.slice(0, k));
    const e = k ? R.escapes[k - 1] : null;
    const isPrime = new Uint8Array(M + 1); sievePrimes(M).forEach((p) => { isPrime[p] = 1; });
    const sr = Math.min(b.h / 2 - 2 * u, b.w * 0.3), cx = b.x + sr + 6 * u, cy = b.y + b.h / 2, sc = sr / Math.sqrt(M);
    for (let n = 1; n <= M; n++) {
      const r = Math.sqrt(n) * sc, a = 2 * Math.PI * Math.sqrt(n), x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
      if (listed.has(n)) continue;
      if (e && n === e.q) continue;
      ctx.fillStyle = isPrime[n] ? pal.cyan : TRV.alpha(pal.faint, 0.9);
      const s = isPrime[n] ? 1.9 * u : 1.1 * u; ctx.fillRect(x - s / 2, y - s / 2, s, s);
    }
    const dot = (n, col, rad) => {
      const r = Math.sqrt(n) * sc, a = 2 * Math.PI * Math.sqrt(n);
      ctx.fillStyle = col; ctx.shadowColor = col; ctx.shadowBlur = 8 * u;
      ctx.beginPath(); ctx.arc(cx + r * Math.cos(a), cy + r * Math.sin(a), rad, 0, 2 * Math.PI); ctx.fill(); ctx.shadowBlur = 0;
      return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    };
    listed.forEach((p) => dot(p, pal.amber, 3 * u));
    ctx.font = `${10 * u}px ${mono}`; ctx.textBaseline = 'middle';
    if (e) {
      if (e.q <= M) { const [x, y] = dot(e.q, pal.magenta, 4.2 * u); ctx.fillStyle = pal.magenta; ctx.textAlign = 'left'; ctx.fillText(String(e.q), x + 6 * u, y - 6 * u); }
      else { ctx.strokeStyle = pal.magenta; ctx.lineWidth = 1.4 * u; ctx.beginPath(); ctx.arc(cx, cy, sr + 3 * u, -0.5, 0.5); ctx.stroke(); ctx.fillStyle = pal.magenta; ctx.textAlign = 'left'; ctx.fillText(`${e.q} > ${M}`, cx + sr + 6 * u, cy); }
    }
    // the Euler product bar: ∏ (1 − p⁻²)⁻¹ climbing towards π²/6
    const bx = cx + sr + 64 * u, bw = b.x + b.w - bx - 8 * u;
    if (bw < 80 * u) return;
    const lo = 1, hi = 1.7, X = (v) => bx + ((v - lo) / (hi - lo)) * bw, by = b.y + b.h * 0.62;
    ctx.strokeStyle = pal.panelEdge; ctx.lineWidth = 6 * u; ctx.lineCap = 'butt';
    ctx.beginPath(); ctx.moveTo(X(lo), by); ctx.lineTo(X(hi), by); ctx.stroke();
    R.euler.forEach((v, i) => {
      if (i >= k) return;
      ctx.strokeStyle = i === k - 1 ? pal.amber : TRV.alpha(pal.cyan, 0.55); ctx.lineWidth = (i === k - 1 ? 2 : 1.2) * u;
      ctx.beginPath(); ctx.moveTo(X(v), by - 9 * u); ctx.lineTo(X(v), by + 9 * u); ctx.stroke();
    });
    ctx.strokeStyle = pal.ok; ctx.lineWidth = 1.6 * u; ctx.setLineDash([3 * u, 2 * u]);
    ctx.beginPath(); ctx.moveTo(X(ZETA2), by - 14 * u); ctx.lineTo(X(ZETA2), by + 14 * u); ctx.stroke(); ctx.setLineDash([]);
    ctx.textAlign = 'center'; ctx.fillStyle = pal.dim;
    ctx.fillText('1', X(1), by + 18 * u);
    ctx.fillText('π²/6', X(ZETA2), by - 22 * u);
  }

  /* ---------- the diagonal matrix (right column) ---------- */
  const heat = $('heat');
  let geom = null;
  function rgb255(name) { return TRV.rgb[name].map((x) => Math.round(x * 255)); }
  const zeroFill = () => { const st = rgb255('stage'), lh = rgb255('lineHot'); return `rgb(${st.map((x, i) => Math.round(x * 0.55 + lh[i] * 0.45))})`; };
  /** Matrix cells, diagonal outline and the escape row d into the square (ox, oy, s); k = current step (0 = none). */
  function paintMatrix(ctx, D, ox, oy, s, k, u, opts = {}) {
    const pal = TRV.palette, N = D.N, gap = Math.max(1, s * 0.08), dy = oy + (N + 0.4) * s, zero = zeroFill(), mono = TRV.fonts.data;
    const showText = s >= 16 * u && !opts.noText;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.font = `600 ${Math.min(14 * u, s * 0.42)}px ${mono}`;
    for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
      const v = D.f[r][c], x = ox + c * s, y = oy + r * s;
      ctx.fillStyle = v ? pal.cyan : zero; ctx.fillRect(x + gap / 2, y + gap / 2, s - gap, s - gap);
      if (r === c) { ctx.strokeStyle = TRV.alpha(pal.magenta, 0.85); ctx.lineWidth = Math.max(1, 1.6 * u); ctx.strokeRect(x + gap / 2 + 1 * u, y + gap / 2 + 1 * u, s - gap - 2 * u, s - gap - 2 * u); }
      if (showText) { ctx.fillStyle = v ? pal.stage : pal.dim; ctx.fillText(String(v), x + s / 2, y + s / 2 + 1 * u); }
    }
    for (let c = 0; c < N; c++) {
      const v = D.d[c], x = ox + c * s, later = opts.revealAll ? false : c >= k;
      ctx.globalAlpha = later ? 0.35 : 1;
      ctx.fillStyle = v ? pal.magenta : zero; ctx.fillRect(x + gap / 2, dy + gap / 2, s - gap, s - gap);
      if (!v) { ctx.strokeStyle = pal.magenta; ctx.lineWidth = Math.max(1, 1.4 * u); ctx.strokeRect(x + gap / 2 + 1 * u, dy + gap / 2 + 1 * u, s - gap - 2 * u, s - gap - 2 * u); }
      if (showText) { ctx.fillStyle = v ? pal.stage : pal.magenta; ctx.fillText(String(v), x + s / 2, dy + s / 2 + 1 * u); }
      ctx.globalAlpha = 1;
    }
    if (k >= 1 && k <= N) {
      const px = ox + (k - 0.5) * s, py = oy + (k - 0.5) * s;
      ctx.strokeStyle = TRV.alpha(pal.amber, 0.45); ctx.lineWidth = Math.max(1, (opts.thick ? 1.5 : 1) * u);
      ctx.beginPath(); ctx.moveTo(px, oy); ctx.lineTo(px, dy + s); ctx.moveTo(ox, py); ctx.lineTo(ox + N * s, py); ctx.stroke();
      ctx.strokeStyle = pal.amber; ctx.lineWidth = (opts.thick ? 3 : 2) * u; ctx.shadowColor = pal.amber; ctx.shadowBlur = (opts.thick ? 16 : 10) * u;
      ctx.strokeRect(px - s * 0.6, py - s * 0.6, s * 1.2, s * 1.2);
      ctx.strokeRect(px - s * 0.5, dy + gap / 2 - 1 * u, s, s - gap + 2 * u);
      ctx.shadowBlur = 0;
    }
    return { dy, gap };
  }
  function drawHeat() {
    if (TRV.thumbMode) { drawCover(); return; }
    const dpr = TRV.fitCanvas(heat), ctx = heat.getContext('2d'), Wc = heat.width, Hc = heat.height, pal = TRV.palette;
    const N = R.N, pad = { l: 28 * dpr, r: 12 * dpr, t: 24 * dpr, b: 10 * dpr }, rowsTotal = N + 1.4;
    const pw = Wc - pad.l - pad.r, ph = Hc - pad.t - pad.b, s = Math.min(pw / N, ph / rowsTotal);
    const ox = pad.l + (pw - N * s) / 2, oy = pad.t + (ph - rowsTotal * s) / 2;
    ctx.clearRect(0, 0, Wc, Hc);
    ctx.fillStyle = pal.stage; ctx.fillRect(0, 0, Wc, Hc);
    const { dy } = paintMatrix(ctx, R, ox, oy, s, S.pass, dpr);
    geom = { ox, oy, s, n: N, dy, dpr };
    // axis labels: columns on top, rows on the left, d for the escape row
    ctx.font = `${10 * dpr}px ${TRV.fonts.data}`; ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    for (let c = 0; c < N; c++) { ctx.fillStyle = c === S.pass - 1 ? pal.amber : pal.dim; ctx.fillText(String(c + 1), ox + (c + 0.5) * s, oy - 10 * dpr); }
    ctx.textAlign = 'right';
    for (let r = 0; r < N; r++) { ctx.fillStyle = r === S.pass - 1 ? pal.amber : pal.dim; ctx.fillText(String(r + 1), ox - 8 * dpr, oy + (r + 0.5) * s); }
    ctx.fillStyle = pal.magenta; ctx.font = `600 ${11 * dpr}px ${TRV.fonts.data}`; ctx.fillText('d', ox - 8 * dpr, dy + s / 2);
    const h = S.hover;
    if (h) {
      const x = ox + h.c * s, y = h.kind === 'd' ? dy : oy + h.r * s;
      ctx.strokeStyle = pal.ink; ctx.lineWidth = 1 * dpr; ctx.strokeRect(x + 0.5, y + 0.5, s - 1, s - 1);
    }
    const zeros = N * N - R.ones;
    $('heatCounts').innerHTML = `<span class="vpos">1</span>: ${R.ones} · <span class="vzero">0</span>: ${zeros} — `
      + L(`d 与全部 ${N} 行都不同 `, `d differs from all ${N} rows `) + mark(R.v.ok) + ` · 2${sup(N)} = ${2 ** N} &gt; ${N}`;
    $('heatRange').textContent = `${N} × ${N}`;
    if (!h) $('heatHover').innerHTML = '&nbsp;';
    else if (h.kind === 'd') $('heatHover').innerHTML = `d(${h.c + 1}) = ¬f(${h.c + 1}, ${h.c + 1}) = <span class="vneg">${R.d[h.c]}</span> · ${L('点击跳到这一步', 'click to go to this step')}`;
    else {
      const v = R.f[h.r][h.c];
      $('heatHover').innerHTML = `f(${h.r + 1}, ${h.c + 1}) = <span class="${v ? 'vpos' : 'vzero'}">${v}</span>`
        + (h.r === h.c ? ` → d(${h.r + 1}) = <span class="vneg">${1 - v}</span>` : '') + ` · ${L('点击翻转', 'click to flip')}`;
    }
  }
  /** Thumbnail cover (?thumb=1): the N × N list with its flipped diagonal row beside the diagonal ledger of the same list.
      No words, so one cover serves both languages; only digits, row codes and signs. */
  function drawCover() {
    const dpr = TRV.fitCanvas(heat), ctx = heat.getContext('2d'), Wc = heat.width, Hc = heat.height;
    const u = Hc / 720, pal = TRV.palette, mono = TRV.fonts.data;
    geom = null;
    ctx.fillStyle = pal.stage; ctx.fillRect(0, 0, Wc, Hc);
    const glow = ctx.createRadialGradient(Wc * 0.28, Hc * 0.5, 0, Wc * 0.28, Hc * 0.5, Wc * 0.55);
    glow.addColorStop(0, TRV.alpha(pal.cyan, 0.08)); glow.addColorStop(1, TRV.alpha(pal.cyan, 0));
    ctx.fillStyle = glow; ctx.fillRect(0, 0, Wc, Hc);
    // the list and its flipped diagonal
    const D = fresh(), n = D.N, k = S.pass, side = 600 * u, ox0 = 64 * u, oy = (Hc - side) / 2;
    const s = side / (n + 1.4), ox = ox0 + (side - n * s) / 2;
    paintMatrix(ctx, D, ox, oy, s, k, u, { thick: true, revealAll: true, noText: true });
    // the diagonal ledger
    const rows = [...D.f.map((row, r) => ({ lab: '#' + (r + 1), d: row, touch: r, sign: D.signs[r], cur: r === k - 1 })), { lab: 'd', d: D.d, last: true }];
    const rowH = Math.min(50 * u, side / rows.length), cell = rowH * 0.8, x0 = 760 * u, labW = 58 * u;
    const y0 = oy + (side - rows.length * rowH) / 2;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    rows.forEach((r, i) => {
      const y = y0 + i * rowH, cy = y + rowH / 2;
      if (r.last) { ctx.strokeStyle = pal.lineHot; ctx.setLineDash([4 * u, 4 * u]); ctx.beginPath(); ctx.moveTo(x0, y + 1); ctx.lineTo(x0 + labW + n * cell + 90 * u, y + 1); ctx.stroke(); ctx.setLineDash([]); }
      ctx.font = `${15 * u}px ${mono}`; ctx.fillStyle = r.last ? pal.magenta : r.cur ? pal.amber : pal.dim; ctx.textAlign = 'left';
      ctx.fillText(r.lab, x0, cy); ctx.textAlign = 'center';
      for (let c = 0; c < n; c++) {
        const x = x0 + labW + c * cell, v = r.d[c], t = r.touch === c;
        const bx = x + 2 * u, by = y + (rowH - cell) / 2 + 2 * u, bw = cell - 4 * u;
        if (r.last) { ctx.fillStyle = TRV.alpha(pal.magenta, v ? 0.26 : 0.1); ctx.fillRect(bx, by, bw, bw); }
        else if (v) { ctx.fillStyle = TRV.alpha(pal.cyan, 0.14); ctx.fillRect(bx, by, bw, bw); }
        if (t) { ctx.strokeStyle = r.cur ? pal.amber : TRV.alpha(pal.magenta, 0.6); ctx.lineWidth = 1.5 * u; ctx.strokeRect(bx, by, bw, bw); }
        ctx.font = `${r.last || t ? 600 : 400} ${19 * u}px ${mono}`;
        ctx.fillStyle = r.last ? pal.magenta : t ? (r.cur ? pal.amber : pal.ink) : v ? pal.ink : pal.faint;
        ctx.fillText(String(v), x + cell / 2, cy + 1 * u);
      }
      if (r.sign !== undefined) {
        const bx = x0 + labW + n * cell + 22 * u, col = r.sign > 0 ? pal.cyan : pal.magenta;
        ctx.strokeStyle = col; ctx.lineWidth = 1.5 * u; ctx.strokeRect(bx, cy - 13 * u, 56 * u, 26 * u);
        ctx.font = `600 ${15 * u}px ${mono}`; ctx.fillStyle = col; ctx.fillText(fmtSigned(r.sign), bx + 28 * u, cy + 1 * u);
      }
      if (r.last) {
        ctx.strokeStyle = pal.amber; ctx.lineWidth = 2 * u; ctx.shadowColor = pal.amber; ctx.shadowBlur = 12 * u;
        ctx.strokeRect(x0 - 12 * u, y + 2 * u, labW + n * cell + 112 * u, rowH - 4 * u); ctx.shadowBlur = 0;
      }
    });
  }
  function cellAt(ev) {
    if (!geom) return null;
    const rc = heat.getBoundingClientRect(), d = geom.dpr;
    const px = (ev.clientX - rc.left) * d, py = (ev.clientY - rc.top) * d;
    const c = Math.floor((px - geom.ox) / geom.s);
    if (c < 0 || c >= geom.n) return null;
    if (py >= geom.dy && py < geom.dy + geom.s) return { kind: 'd', c };
    const r = Math.floor((py - geom.oy) / geom.s);
    return r >= 0 && r < geom.n ? { kind: 'f', r, c } : null;
  }
  const sameCell = (a, b) => (!a && !b) || (a && b && a.kind === b.kind && a.r === b.r && a.c === b.c);
  function activate(cell) {
    stop();
    if (cell.kind === 'd') { setPass(cell.c + 1); return; }
    S.master[cell.r][cell.c] ^= 1;
    S.pass = cell.r + 1;
    schedule();
  }
  let downAt = null;
  heat.addEventListener('pointerdown', (ev) => { downAt = [ev.clientX, ev.clientY]; });
  heat.addEventListener('pointerup', (ev) => {
    if (downAt && Math.hypot(ev.clientX - downAt[0], ev.clientY - downAt[1]) < 8) { const c = cellAt(ev); if (c) activate(c); }
    downAt = null;
  });
  heat.addEventListener('pointercancel', () => { downAt = null; });
  heat.addEventListener('pointermove', (ev) => { const c = cellAt(ev); if (!sameCell(c, S.hover)) { S.hover = c; schedule(); } });
  heat.addEventListener('pointerleave', () => { S.hover = null; schedule(); });

  /* ---------- render loop (batched in one animation frame) ---------- */
  function render() {
    pending = false;
    fresh();
    S.pass = Math.max(0, Math.min(R.N, S.pass));
    const key = `${R.key}|${TRV.lang()}`;
    if (key !== built) { buildLedger(); built = key; }
    markLedger(); readouts(); hud();
    for (const [id, v] of [['n', S.N], ['seed', S.seed], ['x0', S.x0]]) $(id).value = $(id + 'Num').value = String(v);
    $('nDec').disabled = S.N <= NMIN; $('nInc').disabled = S.N >= NMAX;
    $('seedDec').disabled = S.seed <= 1; $('seedInc').disabled = S.seed >= SMAX;
    $('x0Dec').disabled = S.x0 <= 0; $('x0Inc').disabled = S.x0 >= XMAX;
    document.querySelectorAll('#nChips [data-n]').forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.n === S.N)));
    document.querySelectorAll('#modeChips [data-mode]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mode === S.mode)));
    document.querySelectorAll('#presets [data-preset]').forEach((b) => b.setAttribute('aria-pressed', String(presetActive(b.dataset.preset))));
    $('play').setAttribute('aria-pressed', String(S.playing));
    $('play').textContent = S.playing ? '❚❚' : '▶';
    drawStage();
    drawHeat();
    frames++;
  }
  function schedule() { if (!pending) { pending = true; requestAnimationFrame(render); } }

  const K = () => S.N;
  function setPass(k) { S.pass = Math.max(0, Math.min(K(), k)); schedule(); }
  /** A new list or dimension shows the finished ledger; step back with ◀. */
  function finished() { stop(); S.pass = S.N; schedule(); }
  function setN(n) { S.N = clampInt(n, NMIN, NMAX, S.N); S.hover = null; finished(); }
  function setSeed(v) { S.seed = clampInt(v, 1, SMAX, S.seed); S.master = matrixFromSeed(NMAX, S.seed); finished(); }
  function setX0(v) { S.x0 = clampInt(v, 0, XMAX, S.x0); schedule(); }
  function setMode(m) { if (MODES.includes(m)) { S.mode = m; schedule(); } }
  function applyPreset(name) {
    if (name === 'dottie0' || name === 'dottie1') { S.x0 = name === 'dottie0' ? 0 : 100; S.mode = 'dottie'; finished(); return; }
    const p = presetMatrix(name, NMAX);
    if (p) { S.master = p; finished(); }
  }
  function swap() { S.master = transpose(S.master); finished(); }
  function randomSeed() { let v; do v = 1 + Math.floor(rng() * SMAX); while (v === S.seed); setSeed(v); }
  function reset() { Object.assign(S, { N: DEFAULT.N, seed: DEFAULT.seed, x0: DEFAULT.x0, mode: DEFAULT.mode, hover: null }); S.master = matrixFromSeed(NMAX, S.seed); finished(); }

  /* ---------- playback ---------- */
  let timer = null;
  function stop() { if (timer) clearInterval(timer); timer = null; S.playing = false; }
  function play() {
    if (S.pass >= K()) S.pass = 0;
    S.playing = true;
    timer = setInterval(() => {
      if (S.pass >= K()) {
        stop();
        const N = R.N, res = fsci(R.traj.res[N]);
        TRV.toast($('toast'), L(`对角逃逸完成：d 与全部 ${N} 行都不同，带符号翻转计数 <b>${fmtSigned(R.total)}</b> = |d| ${MINUS} tr f；x${sub(N)} 的残差 ${res} &gt; 0`,
          `Diagonal escape complete: d differs from all ${N} rows; signed flip count <b>${fmtSigned(R.total)}</b> = |d| ${MINUS} tr f; residual of x${sub(N)} ${res} &gt; 0`));
        schedule();
        return;
      }
      S.pass++;
      schedule();
    }, TRV.reduceMotion ? 900 : 650);
    schedule();
  }

  /* ---------- controls ---------- */
  const setters = { n: setN, seed: setSeed, x0: setX0 };
  const current = { n: () => S.N, seed: () => S.seed, x0: () => S.x0 };
  for (const k of Object.keys(setters)) {
    $(k).addEventListener('input', (ev) => setters[k](ev.target.value));
    $(k + 'Num').addEventListener('change', (ev) => setters[k](ev.target.value));
    $(k + 'Num').addEventListener('keydown', (ev) => { if (ev.key === 'Enter') ev.target.blur(); });
    $(k + 'Dec').addEventListener('click', () => setters[k](current[k]() - 1));
    $(k + 'Inc').addEventListener('click', () => setters[k](current[k]() + 1));
  }
  document.querySelectorAll('#presets [data-preset]').forEach((b) => b.addEventListener('click', () => applyPreset(b.dataset.preset)));
  $('swap').addEventListener('click', swap);
  $('random').addEventListener('click', randomSeed);
  $('reset').addEventListener('click', reset);
  document.querySelectorAll('#nChips [data-n]').forEach((b) => b.addEventListener('click', () => setN(+b.dataset.n)));
  document.querySelectorAll('#modeChips [data-mode]').forEach((b) => b.addEventListener('click', () => setMode(b.dataset.mode)));
  $('first').addEventListener('click', () => { stop(); setPass(0); });
  $('prev').addEventListener('click', () => { stop(); setPass(S.pass - 1); });
  $('next').addEventListener('click', () => { stop(); setPass(S.pass + 1); });
  $('last').addEventListener('click', () => { stop(); setPass(K()); });
  $('play').addEventListener('click', () => { if (S.playing) { stop(); schedule(); } else play(); });
  $('pass').addEventListener('input', (ev) => { stop(); setPass(+ev.target.value); });
  $('ledger').addEventListener('click', (ev) => { const row = ev.target.closest('.drow[data-pass]'); if (row) { stop(); setPass(+row.dataset.pass); } });
  $('tape').addEventListener('click', (ev) => { const t = ev.target.closest('i[data-pass]'); if (t) { stop(); setPass(+t.dataset.pass); } });
  document.addEventListener('keydown', (ev) => {
    if (ev.altKey || ev.ctrlKey || ev.metaKey) return;
    const t = ev.target;
    if (t && (t.closest('input, textarea, select, [contenteditable]') || !$('drawer').hidden)) return;
    if (ev.key === 'ArrowLeft') { stop(); setPass(S.pass - 1); ev.preventDefault(); }
    else if (ev.key === 'ArrowRight') { stop(); setPass(S.pass + 1); ev.preventDefault(); }
    else if (ev.key === 'Home') { stop(); setPass(0); ev.preventDefault(); }
    else if (ev.key === 'End') { stop(); setPass(K()); ev.preventDefault(); }
    else if (ev.key === ' ' && !(t && t.closest('button, a'))) { if (S.playing) { stop(); schedule(); } else play(); ev.preventDefault(); }
    else if (ev.key === 's' || ev.key === 'S') swap();
    else if (ev.key === 'r' || ev.key === 'R') randomSeed();
    else if (ev.key === 'm' || ev.key === 'M') setMode(MODES[(MODES.indexOf(S.mode) + 1) % MODES.length]);
  });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch($('app'));
  TRV.onLang(() => { built = ''; schedule(); });
  window.addEventListener('resize', schedule);
  if ('ResizeObserver' in window) { const ro = new ResizeObserver(schedule); ro.observe(heat); ro.observe(stage); }

  /* ---------- start ---------- */
  S.pass = S.N;
  schedule();

  /** Thumbnail cover (see drawCover): the 8 × 8 list of the default seed at step 5. */
  window.TRV_THUMB = () => new Promise((resolve) => {
    stop();
    S.N = NMAX; S.seed = DEFAULT.seed; S.master = matrixFromSeed(NMAX, S.seed); S.x0 = DEFAULT.x0; S.pass = 5; built = '';
    schedule();
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });

  /** Read-only probe for the browser tests (tests/sphere-escape.test.mjs); every call returns a fresh copy. */
  const copy = (x) => JSON.parse(JSON.stringify(x));
  window.SE_DEBUG = Object.freeze({
    frames: () => frames,
    pending: () => pending,
    state: () => ({ N: S.N, seed: S.seed, x0: S.x0, mode: S.mode, pass: S.pass, passes: K(), playing: S.playing, edited: edited() }),
    info: () => {
      fresh();
      return copy({
        N: R.N, f: R.f, d: R.d, diag: R.diag, signs: R.signs, total: R.total, trace: R.trace, weight: R.weight,
        ok: R.v.ok, witness: R.v.witness, ham: R.v.ham, minHam: R.v.minHam, argmin: R.v.argmin, listed: R.v.listed,
        xs: R.traj.xs, res: R.traj.res, pythWorst: R.pyth.worst, pythOk: R.pyth.ok, xStar: XSTAR, sinStar: Math.sin(XSTAR),
        primes: R.primes, escapes: R.escapes, euler: R.euler, zeta2: ZETA2
      });
    },
    master: () => copy(S.master),
    /** Viewport coordinates of the centre of cell (r, c) (1-based) of the matrix, or of d(c) when r is 'd'. */
    cellPoint: (r, c) => {
      if (!geom) return null;
      const rc = heat.getBoundingClientRect(), d = geom.dpr, y = r === 'd' ? geom.dy : geom.oy + (r - 1) * geom.s;
      return { x: rc.left + (geom.ox + (c - 0.5) * geom.s) / d, y: rc.top + (y + geom.s / 2) / d };
    },
    set: (o = {}) => {
      if (o.seed !== undefined) { S.seed = clampInt(o.seed, 1, SMAX, S.seed); S.master = matrixFromSeed(NMAX, S.seed); }
      if (o.N !== undefined) S.N = clampInt(o.N, NMIN, NMAX, S.N);
      if (o.x0 !== undefined) S.x0 = clampInt(o.x0, 0, XMAX, S.x0);
      if (o.mode !== undefined && MODES.includes(o.mode)) S.mode = o.mode;
      stop(); S.pass = o.pass !== undefined ? clampInt(o.pass, 0, S.N, S.N) : S.N; schedule();
    }
  });
})();
