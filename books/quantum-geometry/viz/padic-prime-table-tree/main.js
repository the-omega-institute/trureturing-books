/* ORTHO//PADIC · p 进零进位查表树与素数扩表:
   Dynamic p-adic prefix lookup tree Z/p^k Z over target state space N = 1024 = 2^10, paired with exact BigInt
   Hensel O(1) root lifting, tree-depth collapse K(p) = ⌈10/log₂ p⌉, exact first-layer modulo-p collision pairs
   E₁(1024, p), Adelic product conservation |x|_∞ · ∏_p |x|_p = 1, and Euclid's infinite discrete prime ladder
   blocking the continuous p_∞ carry-overflow cliff. Zero hardcoded hex colours. Probe: window.PADIC_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, clamp, TAU } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const SUP = { '−': '⁻', '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  const SUB = '₀₁₂₃₄₅₆₇₈₉';
  const sup = (n) => String(n).split('').map((c) => SUP[c] || c).join('');
  const sub = (n) => String(n).split('').map((c) => SUB[+c] || c).join('');
  const fmtInt = (n) => Number(n).toLocaleString('en-US');

  /* ---------- Discrete prime observer ladder (r = 0..11) + Archimedean cliff (r = 12) ---------- */
  const PRIMES = [2, 3, 5, 7, 11, 13, 17, 23, 31, 97, 257, 1031];
  const R_CLIFF = PRIMES.length; // 12 -> p_∞
  const N_STATES = 1024;
  const N_BITS = 10;
  const PROBE_A = 10;

  /* ---------- Exact BigInt modular & rational helpers ---------- */
  const absB = (a) => (a < 0n ? -a : a);
  const gcdB = (a, b) => {
    a = absB(a);
    b = absB(b);
    while (b !== 0n) [a, b] = [b, a % b];
    return a || 1n;
  };
  const modB = (a, m) => {
    const r = a % m;
    return r < 0n ? r + m : r;
  };
  function modInvB(a, m) {
    let t = 0n, newT = 1n;
    let r = m, newR = modB(a, m);
    while (newR !== 0n) {
      const q = r / newR;
      [t, newT] = [newT, t - q * newT];
      [r, newR] = [newR, r - q * newR];
    }
    if (r !== 1n) return null;
    return t < 0n ? t + m : t;
  }

  /* ---------- Exact tree depth K(p) & first-layer bucket collisions E₁(N, p) ---------- */
  function serialDepth(p) {
    let k = 1, pk = BigInt(p);
    const target = BigInt(N_STATES);
    while (pk < target) {
      pk *= BigInt(p);
      k++;
    }
    return k;
  }
  function bucketStats(N, p) {
    const q = Math.floor(N / p);
    const r = N % p;
    const exactUnordered = (r * (q + 1) * q) / 2 + ((p - r) * q * (q - 1)) / 2;
    const smoothUnordered = Math.max(0, (N * (N - p)) / (2 * p));
    return {
      p,
      depth: serialDepth(p),
      q,
      r,
      maxOcc: r > 0 ? q + 1 : q,
      minOcc: q,
      exactUnordered,
      exactOrdered: exactUnordered * 2,
      smoothUnordered
    };
  }
  const PRIME_TABLE = PRIMES.map((p) => bucketStats(N_STATES, p));

  /* ---------- Polynomials & Exact BigInt Hensel O(1) Root Lifting ---------- */
  const POLYS = {
    sqrt2: {
      id: 'sqrt2',
      expr: 'x² − 2',
      disc: 8,
      ramifiedPrimes: [2],
      f: (x) => x * x - 2n,
      df: (x) => 2n * x
    },
    cubic23: {
      id: 'cubic23',
      expr: 'x³ − x + 1',
      disc: -23,
      ramifiedPrimes: [23],
      f: (x) => x * x * x - x + 1n,
      df: (x) => 3n * x * x - 1n
    },
    sqrtm1: {
      id: 'sqrtm1',
      expr: 'x² + 1',
      disc: -4,
      ramifiedPrimes: [2],
      f: (x) => x * x + 1n,
      df: (x) => 2n * x
    }
  };
  const POLY_ORDER = ['sqrt2', 'cubic23', 'sqrtm1'];

  const henselCache = new Map();
  function computeHensel(polyId, p, maxK = 5) {
    const key = `${polyId}|${p}|${maxK}`;
    if (henselCache.has(key)) return henselCache.get(key);
    const poly = POLYS[polyId];
    const P0 = BigInt(p);
    const branches = [];
    for (let a = 0; a < p; a++) {
      const aB = BigInt(a);
      if (modB(poly.f(aB), P0) !== 0n) continue;
      const df0 = modB(poly.df(aB), P0);
      if (df0 === 0n) {
        const P2 = P0 * P0;
        const lifts2 = [];
        for (let t = 0; t < p; t++) {
          const cand = aB + BigInt(t) * P0;
          if (modB(poly.f(cand), P2) === 0n) lifts2.push(Number(cand));
        }
        branches.push({
          a0: a,
          kind: 'ramified',
          dfModP: 0,
          invModP: null,
          lifts2,
          digits: [a],
          residues: [String(aB)],
          verified: true
        });
      } else {
        const inv = modInvB(df0, P0);
        let x = aB;
        let mod = P0;
        const digits = [a];
        const residues = [String(x)];
        let ok = modB(poly.f(x), mod) === 0n;
        for (let k = 1; k < maxK; k++) {
          const nextMod = mod * P0;
          const xNext = modB(x - poly.f(x) * inv, nextMod);
          const d = Number((xNext - x) / mod);
          digits.push(d);
          residues.push(String(xNext));
          if (modB(poly.f(xNext), nextMod) !== 0n || xNext % mod !== x) ok = false;
          x = xNext;
          mod = nextMod;
        }
        branches.push({
          a0: a,
          kind: 'simple',
          dfModP: Number(df0),
          invModP: Number(inv),
          lifts2: null,
          digits,
          residues,
          verified: ok
        });
      }
    }
    const simpleBranches = branches.filter((b) => b.kind === 'simple');
    const ramifiedBranches = branches.filter((b) => b.kind === 'ramified');
    const status = branches.length === 0
      ? 'unsat_k1'
      : ramifiedBranches.length > 0 && simpleBranches.length === 0
        ? 'ramified_only'
        : ramifiedBranches.length > 0
          ? 'mixed_ramified'
          : 'unramified';
    const out = { polyId, expr: poly.expr, disc: poly.disc, p, status, branches, simpleBranches, ramifiedBranches };
    henselCache.set(key, out);
    return out;
  }

  /* ---------- Exact Ultrametric Observation Probe ---------- */
  function padicValInt(p, n) {
    let m = Math.abs(Math.trunc(n));
    if (m === 0) return Infinity;
    let v = 0;
    while (m % p === 0) {
      m = Math.floor(m / p);
      v++;
    }
    return v;
  }
  function computeProbe(p, xA, xB) {
    const readingsA = [], readingsB = [];
    for (let k = 1; k <= 5; k++) {
      const pk = Number(BigInt(p) ** BigInt(k));
      readingsA.push(((xA % pk) + pk) % pk);
      readingsB.push(((xB % pk) + pk) % pk);
    }
    if (xA === xB) {
      return { p, xA, xB, diff: 0, val: Infinity, firstK: null, distStr: '0', distVal: 0, readingsA, readingsB };
    }
    const diff = Math.abs(xA - xB);
    const val = padicValInt(p, diff);
    const firstK = val + 1;
    const den = BigInt(p) ** BigInt(val);
    const distStr = val === 0 ? '1' : `1/${den.toString()}`;
    const distVal = Math.pow(p, -val);
    return { p, xA, xB, diff, val, firstK, distStr, distVal, readingsA, readingsB };
  }

  /* ---------- Exact Adelic Rational Product Formula & CRT ---------- */
  const RATIONALS = {
    '12/35': { num: 12n, den: 35n, label: '12/35' },
    '-42/5': { num: -42n, den: 5n, label: '−42/5' },
    '8/9': { num: 8n, den: 9n, label: '8/9' },
    '30/77': { num: 30n, den: 77n, label: '30/77' },
    '105/64': { num: 105n, den: 64n, label: '105/64' }
  };
  const RAT_ORDER = ['12/35', '-42/5', '8/9', '30/77', '105/64'];

  function factorPosBig(n) {
    const map = new Map();
    let x = n;
    for (let d = 2n; d * d <= x; d += d === 2n ? 1n : 2n) {
      while (x % d === 0n) {
        const p = Number(d);
        map.set(p, (map.get(p) || 0) + 1);
        x /= d;
      }
    }
    if (x > 1n) {
      const p = Number(x);
      map.set(p, (map.get(p) || 0) + 1);
    }
    return map;
  }

  const adelicCache = new Map();
  function computeAdelic(ratKey) {
    if (adelicCache.has(ratKey)) return adelicCache.get(ratKey);
    const spec = RATIONALS[ratKey];
    const g0 = gcdB(spec.num, spec.den);
    const num = spec.num / g0, den = spec.den / g0;
    const aNum = absB(num);
    const fNum = factorPosBig(aNum), fDen = factorPosBig(den);
    const pSet = new Set([...fNum.keys(), ...fDen.keys()]);
    const primes = [...pSet].sort((a, b) => a - b);

    let prodN = aNum, prodD = den;
    const places = [
      {
        place: '∞',
        prime: null,
        vp: null,
        normStr: den === 1n ? aNum.toString() : `${aNum}/${den}`,
        normVal: Number(aNum) / Number(den),
        logNorm: Math.log(Number(aNum) / Number(den))
      }
    ];
    let logSum = places[0].logNorm;
    let crtMod = 1n;
    const crtFactors = [];

    for (const p of primes) {
      const vp = (fNum.get(p) || 0) - (fDen.get(p) || 0);
      if (vp === 0) continue;
      const pPow = BigInt(p) ** BigInt(Math.abs(vp));
      const nN = vp > 0 ? 1n : pPow;
      const nD = vp > 0 ? pPow : 1n;
      prodN *= nN;
      prodD *= nD;
      const pg = gcdB(prodN, prodD);
      prodN /= pg;
      prodD /= pg;
      const normVal = Math.pow(p, -vp);
      const logNorm = -vp * Math.log(p);
      logSum += logNorm;
      places.push({
        place: `p=${p}`,
        prime: p,
        vp,
        normStr: vp > 0 ? `1/${pPow}` : pPow.toString(),
        normVal,
        logNorm
      });
      const modPow = BigInt(p) ** BigInt(Math.abs(vp));
      crtMod *= modPow;
      crtFactors.push(`Z/${modPow}Z`);
    }

    const out = {
      key: ratKey,
      label: spec.label,
      num: Number(num),
      den: Number(den),
      primes,
      places,
      productExactOne: prodN === 1n && prodD === 1n,
      productStr: prodD === 1n ? prodN.toString() : `${prodN}/${prodD}`,
      logSum,
      crtMod: crtMod.toString(),
      crtIso: `Z/${crtMod}Z ≅ ${crtFactors.join(' × ')}`
    };
    adelicCache.set(ratKey, out);
    return out;
  }

  /* ---------- Euclid Infinitude Witnesses ---------- */
  const EUCLID_STEPS = [
    { cat: '{2}', M: '3', witness: 3, note: ['3 为新素数', '3 is prime'] },
    { cat: '{2,3}', M: '7', witness: 7, note: ['7 为新素数', '7 is prime'] },
    { cat: '{2,3,5}', M: '31', witness: 31, note: ['31 为新素数', '31 is prime'] },
    { cat: '{2,3,5,7}', M: '211', witness: 211, note: ['211 为新素数', '211 is prime'] },
    { cat: '{2..11}', M: '2311', witness: 2311, note: ['2311 为新素数', '2311 is prime'] },
    { cat: '{2..13}', M: '30031 = 59×509', witness: 59, note: ['合数亦必含表外新素数 59', 'composite, yields new prime 59'] }
  ];

  /* ---------- Interactive State ---------- */
  const S = {
    scene: 'duo',
    poly: 'sqrt2',
    rat: '12/35',
    probeB: 353
  };
  const SC = {
    duo: { max: R_CLIFF, rate: 1.4, name: ['双栏', 'DUAL'] },
    tree: { max: R_CLIFF, rate: 1.4, name: ['查表树', 'TREE'] },
    adelic: { max: R_CLIFF, rate: 1.4, name: ['阿代尔', 'ADELIC'] }
  };

  let lastCurveHit = null; // { x0, x1, y0, y1 } for clicking prime points on the right-hand curve
  let lastStacked = false;

  const rIdx = () => clamp(Math.round(clock.t), 0, R_CLIFF);
  const isCliff = () => rIdx() === R_CLIFF;
  const curPrime = () => (isCliff() ? PRIMES[9] : PRIMES[rIdx()]); // anchor p=97 behind cliff stats when r=12

  function font(px, fam = 'data', weight = 600) {
    const v = fam === 'display' ? TRV.fonts.display : fam === 'body' ? TRV.fonts.body : TRV.fonts.data;
    return `${weight} ${px}px ${v}`;
  }

  /* Narrow stacked frames (a cited figure in a narrow column, phones): drawStage sets this before the panels draw. There
     the panels place their rows, captions and readout lines one under another and wrap long text onto lines of its own,
     instead of squeezing it into one line; wide frames keep their layout. */
  let narrowStage = false;
  /** Lines of str no wider than maxW in the current font: breaks at spaces, and between Chinese characters. */
  function wrapLines(ctx, str, maxW) {
    const tokens = String(str).match(/[⺀-鿿＀-￯]\s*|[^\s⺀-鿿＀-￯]+\s*|\s+/g) || [];
    const lines = [];
    let cur = '';
    for (const tk of tokens) {
      const next = cur + tk;
      if (cur.trim() && ctx.measureText(next.trimEnd()).width > maxW) { lines.push(cur.trimEnd()); cur = tk.trimStart(); } else cur = next;
    }
    if (cur.trim()) lines.push(cur.trimEnd());
    return lines;
  }

  /** The panel and its title; returns the y under the title (narrow frames: the title steps down to 9px, then wraps). */
  function panelFrame(ctx, rect, lw, titleZh, titleEn, accent = false) {
    ctx.save();
    ctx.fillStyle = TRV.alpha(P.panelSolid || P.stage, 0.56);
    ctx.strokeStyle = accent ? TRV.alpha(P.cyan, 0.65) : TRV.alpha(P.panelEdge, 0.9);
    ctx.lineWidth = 1.1 * lw;
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
    ctx.strokeRect(rect.x + 0.5, rect.y + 0.5, Math.max(1, rect.w - 1), Math.max(1, rect.h - 1));
    let bottom = rect.y + 28;
    if (!TRV.thumbMode && titleZh) {
      const title = L(titleZh, titleEn), maxW = rect.w - 20;
      let size = 10.5, lines = [title];
      ctx.font = font(size, 'display', 600);
      if (narrowStage) {
        while (size > 9 && ctx.measureText(title).width > maxW) { size -= 0.5; ctx.font = font(size, 'display', 600); }
        if (ctx.measureText(title).width > maxW) lines = wrapLines(ctx, title, maxW);
        bottom = rect.y + 7 + lines.length * (size + 2.5) + 4;
      }
      ctx.fillStyle = accent ? P.cyan : P.dim;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      lines.forEach((s, i) => ctx.fillText(s, rect.x + 10, rect.y + 7 + i * (size + 2.5)));
    }
    ctx.restore();
    return bottom;
  }

  /* ---------- Left Stage: Dynamic p-adic Prefix Lookup Tree Z/p^k Z & Hensel / Cliff ---------- */
  function drawTreePanel(ctx, rect, lw) {
    if (isCliff()) {
      drawCliffVsEuclidPanel(ctx, rect, lw);
      return;
    }
    const p = curPrime();
    const st = bucketStats(N_STATES, p);
    const H = computeHensel(S.poly, p, 5);
    const Pr = computeProbe(p, PROBE_A, S.probeB);

    const titleBottom = panelFrame(
      ctx,
      rect,
      lw,
      `Z/${p}ᵏZ 零进位前缀查表树 (N = 1024, K(${p}) = ${st.depth})`,
      `Z/${p}ᵏZ ZERO-CARRY LOOKUP TREE (N = 1024, K(${p}) = ${st.depth})`,
      true
    );

    ctx.save();
    ctx.beginPath();
    ctx.rect(rect.x + 2, rect.y + 2, rect.w - 4, rect.h - 4);
    ctx.clip();

    const narrow = narrowStage;
    const topPad = TRV.thumbMode ? 18 : narrow ? Math.max(20, titleBottom - rect.y) : 28;
    let botCardH = TRV.thumbMode ? 24 : (rect.h < 250 ? 52 : 68);
    // narrow frames: the inspector's lines wrapped at full size, the card as tall as they are; the buckets line (also in
    // the curve box and the readouts) gives way first when the tree would be left with fewer than 88 px
    let inspector = null;
    if (narrow) {
      ctx.font = font(9.5, 'data', 600);
      inspector = inspectorTexts(p, H, Pr).map((g) => ({ color: g.color, lines: wrapLines(ctx, g.text, rect.w - 36) }));
      const cardOf = (gs) => 10 + gs.reduce((n, g) => n + g.lines.length, 0) * 11;
      if (rect.h - topPad - 12 - 6 - cardOf(inspector) < 88) inspector = inspector.slice(0, 2);
      botCardH = cardOf(inspector);
    }
    const tx = rect.x + 14;
    const tw = Math.max(40, rect.w - 28);
    const ty = rect.y + topPad;
    const th = Math.max(50, rect.h - topPad - botCardH - (narrow ? 12 : 10));

    // Determine visible tree layers
    const K = st.depth;
    if (p === 1031) {
      // K(1031) = 1: Single-layer flat collision-free direct read!
      drawSingleLayerDirectRead(ctx, { x: tx, y: ty, w: tw, h: th }, lw, p, st, H, Pr);
    } else if (p <= 7) {
      // Exact nested clopen tree up to visK = min(K, 4) + depth cascade bar if K > 4
      drawExactBranchingTree(ctx, { x: tx, y: ty, w: tw, h: th }, lw, p, st, H, Pr);
    } else {
      // Wide fan-out p ∈ {11, 13, 17, 23, 31, 97, 257}: full base comb + zoomed active subtrees
      drawWideFanoutTree(ctx, { x: tx, y: ty, w: tw, h: th }, lw, p, st, H, Pr);
    }

    // Bottom inspector banner inside Left Panel (Hensel + Ultrametric probe)
    if (!TRV.thumbMode) {
      drawInspectorCard(ctx, { x: rect.x + 10, y: rect.y + rect.h - botCardH - 6, w: rect.w - 20, h: botCardH }, lw, p, H, Pr, inspector);
    }

    ctx.restore();
  }

  function drawExactBranchingTree(ctx, box, lw, p, st, H, Pr) {
    const K = st.depth;
    const visK = Math.min(K, p === 2 ? 4 : p === 3 ? 3 : p === 5 ? 3 : 3);
    const hasTail = K > visK;
    const treeW0 = hasTail ? box.w - (TRV.thumbMode ? 36 : 56) : box.w;
    const levels = visK + 1; // k = 0 .. visK
    // narrow frames: the row names stand in a gutter left of the rows, the ramified caption has the top line of the box
    // and the amber residue the bottom line, so no caption is drawn across a row of nodes
    const nar = narrowStage, gut = nar ? 26 : 0;
    const capTop = nar && visK >= 2 && H.branches.some((b) => b.kind === 'ramified') ? 13 : 0;
    const capBot = nar && H.branches.some((b) => b.kind === 'simple') ? 14 : 0;
    const treeX = box.x + gut, treeW = treeW0 - gut;
    const rowY = nar
      ? (k) => box.y + capTop + 6 + ((box.h - capTop - capBot - 12) * k) / Math.max(1, levels - 1)
      : (k) => box.y + 10 + ((box.h - 22) * k) / Math.max(1, levels - 1 + (hasTail ? 0.55 : 0));

    // Precompute clopen interval geometry for each node (k, res) where 0 <= res < p^k
    // Important: order children by digit d_k at layer k so x ≡ a0 + d1*p + ... stays geometrically nested inside its parent!
    const nodes = new Map();
    const rootPad = treeW * 0.08;
    nodes.set('0:0', { x0: treeX + rootPad, x1: treeX + treeW - rootPad, cx: treeX + treeW / 2, y: rowY(0) });

    for (let k = 1; k <= visK; k++) {
      const pkPrev = Math.pow(p, k - 1);
      const y = rowY(k);
      for (let prev = 0; prev < pkPrev; prev++) {
        const par = nodes.get(`${k - 1}:${prev}`);
        const span = par.x1 - par.x0;
        const gap = Math.max(1.5 * lw, (span * 0.14) / p);
        const childW = Math.max(2 * lw, (span - gap * (p - 1)) / p);
        for (let d = 0; d < p; d++) {
          const res = prev + d * pkPrev;
          const x0 = par.x0 + d * (childW + gap);
          const x1 = x0 + childW;
          nodes.set(`${k}:${res}`, { x0, x1, cx: (x0 + x1) / 2, y, parent: par, digit: d, res });
        }
      }
    }

    // Base edges & clopen bucket bars
    const barH = clamp(box.h * 0.055, 5 * lw, 11 * lw);
    for (let k = 0; k <= visK; k++) {
      const pk = Math.pow(p, k);
      for (let res = 0; res < pk; res++) {
        const nd = nodes.get(`${k}:${res}`);
        if (nd.parent) {
          ctx.strokeStyle = TRV.alpha(P.dim, p <= 3 ? 0.36 : 0.24);
          ctx.lineWidth = 0.95 * lw;
          ctx.beginPath();
          ctx.moveTo(nd.parent.cx, nd.parent.y + barH / 2);
          ctx.lineTo(nd.cx, nd.y - barH / 2);
          ctx.stroke();
        }
        ctx.fillStyle = TRV.alpha(P.cyan, k === 0 ? 0.18 : 0.11);
        ctx.strokeStyle = TRV.alpha(P.cyan, k === 0 ? 0.72 : 0.44);
        ctx.lineWidth = 1.05 * lw;
        ctx.fillRect(nd.x0, nd.y - barH / 2, Math.max(1.5, nd.x1 - nd.x0), barH);
        ctx.strokeRect(nd.x0, nd.y - barH / 2, Math.max(1.5, nd.x1 - nd.x0), barH);
      }
      if (!TRV.thumbMode) {
        const y = rowY(k);
        ctx.font = font(9.5, 'data', 600);
        ctx.fillStyle = P.dim;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(k === 0 ? 'k=0' : `k=${k}`, box.x, nar ? y : y - barH * 0.95);
      }
    }

    // Overlay Probe shared ancestor & split point (if xA != xB)
    if (Pr.firstK != null) {
      const splitK = Pr.firstK;
      for (let k = 1; k <= Math.min(visK, splitK); k++) {
        const pk = Math.pow(p, k);
        const rA = ((Pr.xA % pk) + pk) % pk;
        const rB = ((Pr.xB % pk) + pk) % pk;
        const nA = nodes.get(`${k}:${rA}`), nB = nodes.get(`${k}:${rB}`);
        if (nA && rA === rB) {
          ctx.strokeStyle = TRV.alpha(P.violet, 0.85);
          ctx.lineWidth = 1.8 * lw;
          ctx.strokeRect(nA.x0 - 1, nA.y - barH / 2 - 1, Math.max(2, nA.x1 - nA.x0 + 2), barH + 2);
        } else if (nA && nB && k === splitK) {
          ctx.fillStyle = P.violet;
          ctx.beginPath(); ctx.arc(nA.cx, nA.y, 3.2 * lw, 0, TAU); ctx.fill();
          ctx.beginPath(); ctx.arc(nB.cx, nB.y, 3.2 * lw, 0, TAU); ctx.fill();
        }
      }
    }

    // Overlay Hensel branches: simple in CYAN (+ AMBER tip on primary), ramified in MAGENTA / VIOLET (NEVER red!)
    const rootNode = nodes.get('0:0');
    if (H.status === 'unsat_k1') {
      const y1 = rowY(1);
      const ux = treeX + (TRV.thumbMode ? 6 : 28);
      const uw = Math.max(40, treeW - (ux - treeX) - 4);
      ctx.strokeStyle = P.violet;
      ctx.lineWidth = 1.6 * lw;
      ctx.setLineDash([4 * lw, 3 * lw]);
      ctx.strokeRect(ux, y1 - barH * 0.78, uw, barH * 1.56);
      ctx.setLineDash([]);
      if (!TRV.thumbMode) {
        const msg = L(`k=1 基表无根：${H.expr} ≡ 0 (mod ${p}) 无解`, `k=1 base check: no root of ${H.expr} mod ${p}`);
        ctx.font = font(9.5, 'data', 600);
        const mw = Math.min(uw, ctx.measureText(msg).width + 12);
        const mx = ux + (uw - mw) / 2, my = y1 + barH * 0.78 + 3;
        ctx.fillStyle = TRV.alpha(P.void || P.stage, 0.86);
        ctx.fillRect(mx, my, mw, 14);
        ctx.fillStyle = P.violet;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(msg, ux + uw / 2, my + 2, uw - 6);
      }
    } else {
      H.branches.forEach((br, idx) => {
        const isPrimary = idx === 0;
        if (br.kind === 'ramified') {
          const n1 = nodes.get(`1:${br.a0}`);
          if (!n1) return;
          ctx.strokeStyle = P.magenta;
          ctx.lineWidth = 2.6 * lw;
          ctx.beginPath();
          ctx.moveTo(rootNode.cx, rootNode.y + barH / 2);
          ctx.lineTo(n1.cx, n1.y - barH / 2);
          ctx.stroke();
          ctx.fillStyle = TRV.alpha(P.magenta, 0.35);
          ctx.fillRect(n1.x0, n1.y - barH / 2, Math.max(2, n1.x1 - n1.x0), barH);
          ctx.strokeRect(n1.x0, n1.y - barH / 2, Math.max(2, n1.x1 - n1.x0), barH);

          // Stalled ramified children at k = 2 in magenta/violet dashed
          if (visK >= 2) {
            for (let t = 0; t < p; t++) {
              const c2 = nodes.get(`2:${br.a0 + t * p}`);
              if (!c2) continue;
              ctx.strokeStyle = TRV.alpha(P.violet, 0.9);
              ctx.lineWidth = 1.6 * lw;
              ctx.setLineDash([3 * lw, 2.5 * lw]);
              ctx.beginPath();
              ctx.moveTo(n1.cx, n1.y + barH / 2);
              ctx.lineTo(c2.cx, c2.y - barH / 2);
              ctx.stroke();
              ctx.setLineDash([]);
              // Stall cross in magenta (never warn red)
              const rX = 3.5 * lw;
              ctx.strokeStyle = P.magenta;
              ctx.lineWidth = 1.8 * lw;
              ctx.beginPath();
              ctx.moveTo(c2.cx - rX, c2.y - rX); ctx.lineTo(c2.cx + rX, c2.y + rX);
              ctx.moveTo(c2.cx + rX, c2.y - rX); ctx.lineTo(c2.cx - rX, c2.y + rX);
              ctx.stroke();
            }
            if (!TRV.thumbMode) {
              const y2 = rowY(2);
              ctx.font = font(9.5, 'data', 600);
              ctx.fillStyle = P.magenta;
              ctx.textAlign = nar ? 'left' : 'center';
              ctx.textBaseline = 'top';
              ctx.fillText(L(`p∣Δ: f′(${br.a0})≡0 (mod ${p}) 分歧奇异阻断`, `p∣Δ: f′(${br.a0})≡0 (mod ${p}) ramified stall`), nar ? treeX : n1.cx, nar ? box.y : y2 + barH * 0.9);
            }
          }
        } else {
          // Simple unramified O(1) Hensel lift path!
          let prev = rootNode;
          for (let k = 1; k <= visK; k++) {
            const pk = Math.pow(p, k);
            const res = Number(BigInt(br.residues[k - 1]) % BigInt(pk));
            const cur = nodes.get(`${k}:${res}`);
            if (!cur) break;
            ctx.strokeStyle = isPrimary ? P.cyan : TRV.alpha(P.cyan, 0.62);
            ctx.lineWidth = (isPrimary ? 2.7 : 1.7) * lw;
            ctx.beginPath();
            ctx.moveTo(prev.cx, prev.y + barH / 2);
            ctx.lineTo(cur.cx, cur.y - barH / 2);
            ctx.stroke();

            ctx.fillStyle = TRV.alpha(P.cyan, isPrimary ? 0.36 : 0.2);
            ctx.fillRect(cur.x0, cur.y - barH / 2, Math.max(2, cur.x1 - cur.x0), barH);
            ctx.strokeStyle = P.cyan;
            ctx.lineWidth = (isPrimary ? 1.8 : 1.1) * lw;
            ctx.strokeRect(cur.x0, cur.y - barH / 2, Math.max(2, cur.x1 - cur.x0), barH);

            if (isPrimary && k === visK) {
              ctx.fillStyle = P.amber;
              ctx.strokeStyle = P.stage;
              ctx.lineWidth = 1.2 * lw;
              ctx.beginPath();
              ctx.arc(cur.cx, cur.y, 4.3 * lw, 0, TAU);
              ctx.fill();
              ctx.stroke();
              if (!TRV.thumbMode) {
                ctx.font = font(9.5, 'data', 600);
                ctx.fillStyle = P.amber;
                ctx.textAlign = cur.cx > treeX + treeW * 0.65 ? 'right' : 'left';
                ctx.textBaseline = 'top';
                const dx = cur.cx > treeX + treeW * 0.65 ? -6 : 6;
                ctx.fillText(`x${sub(k)}≡${br.residues[k - 1]} (mod ${p}${sup(k)})`, cur.cx + dx, cur.y + barH * 0.72);
              }
            }
            prev = cur;
          }
        }
      });
    }

    // Compressed serial depth cascade bar when K(p) > visK (e.g. K(2)=10, K(3)=7, K(5)=5, K(7)=4)
    if (hasTail) {
      const rx = box.x + treeW0 + (TRV.thumbMode ? 8 : 12);
      const rw = Math.max(18, box.w - treeW0 - (TRV.thumbMode ? 10 : 14));
      const ry0 = box.y + 8, ry1 = box.y + box.h - (TRV.thumbMode ? 8 : 14);
      const hSeg = Math.max(3 * lw, ((ry1 - ry0) / K) * 0.56);
      for (let k = 1; k <= K; k++) {
        const yk = ry0 + ((ry1 - ry0 - hSeg) * (k - 1)) / Math.max(1, K - 1);
        const active = k <= visK;
        ctx.fillStyle = TRV.alpha(active ? P.cyan : P.violet, active ? 0.34 : 0.22);
        ctx.strokeStyle = active ? P.cyan : TRV.alpha(P.violet, 0.68);
        ctx.lineWidth = 1 * lw;
        ctx.fillRect(rx, yk, rw * 0.52, hSeg);
        ctx.strokeRect(rx, yk, rw * 0.52, hSeg);
      }
      if (!TRV.thumbMode) {
        ctx.font = font(9, 'data', 600);
        ctx.fillStyle = P.amber;
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';
        ctx.fillText(`K=${K}`, box.x + box.w, ry0 - 1);
        ctx.fillStyle = P.dim;
        ctx.textBaseline = 'bottom';
        ctx.fillText(`2¹⁰`, box.x + box.w, ry1);
      }
    }
  }

  function drawWideFanoutTree(ctx, box, lw, p, st, H, Pr) {
    const K = st.depth; // K = 3 for 11..31, K = 2 for 97, 257
    const barH = clamp(box.h * 0.06, 6 * lw, 11 * lw);
    let rootY = box.y + 10;
    let k1Y = box.y + box.h * (K === 2 ? 0.44 : 0.36);
    let k2Y = box.y + box.h * (K === 2 ? 0.80 : 0.64);
    let k3Y = box.y + box.h * 0.88;
    if (narrowStage) {
      // narrow frames: each layer under a line of its own for its tag ("k=1: …"), and a last line for the branch label
      const tagH = 12, labH = 13, nTag = K >= 3 ? 3 : 2;
      const gapR = Math.max(3, (box.h - 2 - barH - nTag * (tagH + barH) - labH) / nTag);
      rootY = box.y + 2;
      k1Y = rootY + barH + gapR + tagH;
      k2Y = k1Y + barH + gapR + tagH;
      k3Y = k2Y + barH + gapR + tagH;
    }

    // Root node Z (k = 0)
    const rootW = box.w * 0.36;
    const rootX = box.x + (box.w - rootW) / 2;
    ctx.fillStyle = TRV.alpha(P.cyan, 0.20);
    ctx.strokeStyle = P.cyan;
    ctx.lineWidth = 1.2 * lw;
    ctx.fillRect(rootX, rootY, rootW, barH);
    ctx.strokeRect(rootX, rootY, rootW, barH);

    // Layer k = 1 wide horizontal comb (display up to 37 slots directly, or 48 representative clopen slots for p=97,257)
    const nSlots = Math.min(p, 44);
    const gap = nSlots <= 31 ? 2 * lw : 1.2 * lw;
    const slotW = Math.max(2 * lw, (box.w - gap * (nSlots - 1)) / nSlots);
    const mapResToSlot = (r) => Math.min(nSlots - 1, Math.floor((r * nSlots) / p));

    const rootBranches = new Map();
    H.branches.forEach((b) => rootBranches.set(mapResToSlot(b.a0), b));
    const slotProbeA = mapResToSlot(Pr.readingsA[0]);
    const slotProbeB = mapResToSlot(Pr.readingsB[0]);

    for (let s = 0; s < nSlots; s++) {
      const sx = box.x + s * (slotW + gap);
      const cx = sx + slotW / 2;
      const br = rootBranches.get(s);
      const isProbe = s === slotProbeA || s === slotProbeB;

      // Fan-out ray from root
      if (s % (nSlots > 31 ? 2 : 1) === 0 || br || isProbe) {
        ctx.strokeStyle = br
          ? (br.kind === 'ramified' ? P.magenta : P.cyan)
          : isProbe
            ? TRV.alpha(P.violet, 0.65)
            : TRV.alpha(P.dim, 0.22);
        ctx.lineWidth = (br ? 2.1 : 0.85) * lw;
        ctx.beginPath();
        ctx.moveTo(box.x + box.w / 2, rootY + barH);
        ctx.lineTo(cx, k1Y);
        ctx.stroke();
      }

      ctx.fillStyle = br
        ? TRV.alpha(br.kind === 'ramified' ? P.magenta : P.cyan, 0.42)
        : isProbe
          ? TRV.alpha(P.violet, 0.34)
          : TRV.alpha(P.cyan, 0.13);
      ctx.strokeStyle = br
        ? (br.kind === 'ramified' ? P.magenta : P.cyan)
        : isProbe
          ? P.violet
          : TRV.alpha(P.cyan, 0.46);
      ctx.lineWidth = (br ? 1.6 : 1.0) * lw;
      ctx.fillRect(sx, k1Y, slotW, barH);
      ctx.strokeRect(sx, k1Y, slotW, barH);
    }

    // Zoomed active sub-buckets at k = 2 (and k = 3 if K === 3)
    const focusList = H.branches.length > 0
      ? H.branches.slice(0, 2)
      : [{ kind: 'probe', a0: Pr.readingsA[0], digits: [Pr.readingsA[0], Math.floor(Pr.readingsA[1] / p), 0], residues: Pr.readingsA.map(String) }];

    const groupSpan = Math.min(box.w * 0.42, (box.w - 24) / Math.max(1, focusList.length));
    focusList.forEach((br, idx) => {
      const s = mapResToSlot(br.a0);
      const parentCx = box.x + s * (slotW + gap) + slotW / 2;
      const gx0 = focusList.length === 1
        ? box.x + (box.w - groupSpan) / 2
        : box.x + 12 + idx * (box.w - 24 - groupSpan);
      const subSlots = Math.min(p, 11);
      const sGap = 2 * lw;
      const sw = Math.max(3 * lw, (groupSpan - sGap * (subSlots - 1)) / subSlots);
      const activeD1 = br.digits && br.digits.length > 1 ? Math.min(subSlots - 1, Math.floor((br.digits[1] * subSlots) / p)) : 0;

      for (let j = 0; j < subSlots; j++) {
        const jx = gx0 + j * (sw + sGap);
        const jcx = jx + sw / 2;
        const onLift = br.kind === 'simple' && j === activeD1;
        const isRam = br.kind === 'ramified';

        ctx.strokeStyle = onLift ? P.cyan : isRam ? TRV.alpha(P.violet, 0.72) : TRV.alpha(P.dim, 0.25);
        ctx.lineWidth = (onLift ? 2.2 : 0.9) * lw;
        if (isRam) ctx.setLineDash([3 * lw, 2.5 * lw]);
        ctx.beginPath();
        ctx.moveTo(parentCx, k1Y + barH);
        ctx.lineTo(jcx, k2Y);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = onLift ? TRV.alpha(P.cyan, 0.4) : isRam ? TRV.alpha(P.magenta, 0.2) : TRV.alpha(P.cyan, 0.1);
        ctx.strokeStyle = onLift ? P.cyan : isRam ? P.magenta : TRV.alpha(P.cyan, 0.4);
        ctx.fillRect(jx, k2Y, sw, barH);
        ctx.strokeRect(jx, k2Y, sw, barH);

        if (isRam && j % 2 === 0) {
          const rX = 2.6 * lw;
          ctx.strokeStyle = P.magenta;
          ctx.lineWidth = 1.4 * lw;
          ctx.beginPath();
          ctx.moveTo(jcx - rX, k2Y + barH / 2 - rX); ctx.lineTo(jcx + rX, k2Y + barH / 2 + rX);
          ctx.moveTo(jcx + rX, k2Y + barH / 2 - rX); ctx.lineTo(jcx - rX, k2Y + barH / 2 + rX);
          ctx.stroke();
        }

        // Layer k = 3 leaf zoom when K === 3
        if (K >= 3 && onLift) {
          for (let m = 0; m < subSlots; m++) {
            const mx = gx0 + m * (sw + sGap);
            const mcx = mx + sw / 2;
            const activeD2 = Math.min(subSlots - 1, Math.floor(((br.digits[2] || 0) * subSlots) / p));
            const onLeaf = m === activeD2;
            ctx.strokeStyle = onLeaf ? P.cyan : TRV.alpha(P.dim, 0.22);
            ctx.lineWidth = (onLeaf ? 2.3 : 0.85) * lw;
            ctx.beginPath();
            ctx.moveTo(jcx, k2Y + barH);
            ctx.lineTo(mcx, k3Y);
            ctx.stroke();
            ctx.fillStyle = onLeaf ? TRV.alpha(P.cyan, 0.45) : TRV.alpha(P.cyan, 0.1);
            ctx.strokeStyle = onLeaf ? P.cyan : TRV.alpha(P.cyan, 0.35);
            ctx.fillRect(mx, k3Y, sw, barH * 0.9);
            ctx.strokeRect(mx, k3Y, sw, barH * 0.9);
            if (onLeaf && idx === 0) {
              ctx.fillStyle = P.amber;
              ctx.beginPath();
              ctx.arc(mcx, k3Y + barH * 0.45, 4.0 * lw, 0, TAU);
              ctx.fill();
            }
          }
        } else if (K === 2 && onLift && idx === 0) {
          ctx.fillStyle = P.amber;
          ctx.beginPath();
          ctx.arc(jcx, k2Y + barH / 2, 4.0 * lw, 0, TAU);
          ctx.fill();
        }
      }

      if (!TRV.thumbMode) {
        ctx.font = font(9.5, 'data', 600);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        if (br.kind === 'ramified') {
          ctx.fillStyle = P.magenta;
          ctx.fillText(L(`a₀=${br.a0}: p∣Δ 分歧阻断`, `a₀=${br.a0}: p∣Δ ramified`), gx0 + groupSpan / 2, k2Y + barH + 3);
        } else if (br.kind === 'simple') {
          ctx.fillStyle = idx === 0 ? P.amber : P.cyan;
          const yLbl = (K >= 3 ? k3Y : k2Y) + barH + 3;
          ctx.fillText(`a₀=${br.a0} → x${sub(K)}≡${br.residues[K - 1]}`, gx0 + groupSpan / 2, yLbl);
        } else {
          ctx.fillStyle = P.violet;
          ctx.fillText(L(`k=1 基表无根 (${H.expr})`, `k=1 no F_${p} root (${H.expr})`), gx0 + groupSpan / 2, k2Y + barH + 3);
        }
      }
    });

    if (!TRV.thumbMode) {
      ctx.font = font(9.5, 'data', 600);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';
      const drawLayerTag = (txt, y) => {
        const tw = ctx.measureText(txt).width + 6;
        ctx.fillStyle = TRV.alpha(P.void || P.stage, 0.82);
        ctx.fillRect(box.x - 1, y - 12, tw, 12);
        ctx.fillStyle = P.dim;
        ctx.fillText(txt, box.x + 2, y - 1);
      };
      drawLayerTag(`k=1: ${p} ${L('个既开又闭模桶', 'clopen buckets')} (occ ≤ ${st.maxOcc})`, k1Y - 1);
      drawLayerTag(`k=2: p² = ${fmtInt(p * p)}`, k2Y - 1);
      if (K >= 3) drawLayerTag(`k=3: p³ = ${fmtInt(p * p * p)} > 1024`, k3Y - 1);
    }
  }

  function drawSingleLayerDirectRead(ctx, box, lw, p, st, H, Pr) {
    let rootY = box.y + 14;
    let k1Y = box.y + box.h * 0.56;
    const barH = clamp(box.h * 0.11, 10 * lw, 18 * lw);
    const cap1 = L('p = 1031 > 1024：K = 1 单层直读（1024 单元素桶 + 7 空桶，E₁ = 0）', 'p = 1031 > 1024: K = 1 direct read (1024 singletons + 7 empty, E₁ = 0)');
    const cap2 = L('零串行迭代 · 零进位涟漪 · 任意两态 x ≠ y 在 k* = 1 即刻分离', 'Zero serial depth · zero carry · every pair x ≠ y splits at k* = 1');
    // narrow frames: both captions wrapped at full size under the row of buckets, the row and the root moved up to make room
    let wrap1 = null, wrap2 = null, rootH = barH * 0.72;
    if (narrowStage && !TRV.thumbMode) {
      ctx.font = font(10, 'data', 600); wrap1 = wrapLines(ctx, cap1, box.w - 6);
      ctx.font = font(9.2, 'data', 600); wrap2 = wrapLines(ctx, cap2, box.w - 6);
      const capH = 4 + wrap1.length * 11.5 + 2 + wrap2.length * 10.5;
      rootY = Math.min(rootY, box.y + 2);
      rootH = Math.min(rootH, 6 * lw);
      k1Y = Math.min(k1Y, Math.max(rootY + rootH + 8, box.y + box.h - capH - barH));
    }

    const rootW = box.w * 0.42;
    const rootX = box.x + (box.w - rootW) / 2;
    ctx.fillStyle = TRV.alpha(P.cyan, 0.22);
    ctx.strokeStyle = P.cyan;
    ctx.lineWidth = 1.4 * lw;
    ctx.fillRect(rootX, rootY, rootW, rootH);
    ctx.strokeRect(rootX, rootY, rootW, rootH);

    // 56 crisp singleton columns representing the 1024 singleton buckets + 7 empty buckets of Z/1031Z
    const nCols = 56;
    const gap = 1.4 * lw;
    const cw = Math.max(2 * lw, (box.w - gap * (nCols - 1)) / nCols);
    const mapSlot = (r) => Math.min(nCols - 1, Math.floor((r * nCols) / p));
    const rootSlots = new Set(H.simpleBranches.map((b) => mapSlot(b.a0)));
    const sA = mapSlot(Pr.xA), sB = mapSlot(Pr.xB);

    for (let c = 0; c < nCols; c++) {
      const cx0 = box.x + c * (cw + gap);
      const mid = cx0 + cw / 2;
      const isEmptyTail = c === nCols - 1; // represents slots 1024..1030 (7 unoccupied buckets)
      const isHensel = rootSlots.has(c);
      const isProbe = c === sA || c === sB;

      ctx.strokeStyle = isHensel ? P.cyan : isProbe ? P.violet : TRV.alpha(P.cyan, 0.25);
      ctx.lineWidth = (isHensel || isProbe ? 1.9 : 0.8) * lw;
      ctx.beginPath();
      ctx.moveTo(box.x + box.w / 2, rootY + rootH);
      ctx.lineTo(mid, k1Y);
      ctx.stroke();

      ctx.fillStyle = isEmptyTail
        ? TRV.alpha(P.dim, 0.12)
        : isHensel
          ? TRV.alpha(P.amber, 0.48)
          : isProbe
            ? TRV.alpha(P.violet, 0.45)
            : TRV.alpha(P.cyan, 0.22);
      ctx.strokeStyle = isEmptyTail ? P.dim : isHensel ? P.amber : isProbe ? P.violet : P.cyan;
      ctx.lineWidth = (isHensel ? 1.6 : 1.0) * lw;
      ctx.fillRect(cx0, k1Y, cw, barH);
      ctx.strokeRect(cx0, k1Y, cw, barH);
    }

    if (!TRV.thumbMode && wrap1) {
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      let y = k1Y + barH + 4;
      ctx.font = font(10, 'data', 600); ctx.fillStyle = P.amber;
      wrap1.forEach((s) => { ctx.fillText(s, box.x + box.w / 2, y); y += 11.5; });
      y += 2;
      ctx.font = font(9.2, 'data', 600); ctx.fillStyle = P.cyan;
      wrap2.forEach((s) => { ctx.fillText(s, box.x + box.w / 2, y); y += 10.5; });
    } else if (!TRV.thumbMode) {
      ctx.font = font(10, 'data', 600);
      ctx.fillStyle = P.amber;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(cap1, box.x + box.w / 2, k1Y + barH + 8, box.w - 6);
      ctx.font = font(9.2, 'data', 600);
      ctx.fillStyle = P.cyan;
      ctx.fillText(cap2, box.x + box.w / 2, k1Y + barH + 25, box.w - 6);
    }
  }

  /** The inspector's three readouts (Hensel, probe, buckets) and their colours. */
  function inspectorTexts(p, H, Pr) {
    // Line 1: Hensel lifting status
    let hLine = '', hCol = P.cyan;
    if (H.status === 'unsat_k1') {
      hCol = P.violet;
      hLine = L(
        `亨泽尔 (${H.expr}): F_${p} 基表无根 → 第 k=1 层单次查表即证 Z_${p} 无解`,
        `Hensel (${H.expr}): no root in F_${p} → certified UNSAT at depth k=1`
      );
    } else if (H.status === 'ramified_only') {
      const b = H.ramifiedBranches[0];
      hCol = P.magenta;
      hLine = L(
        `亨泽尔 (${H.expr}): p=${p}∣Δ=${H.disc}, a₀=${b.a0}, f′(${b.a0})≡0 (mod ${p}) → 分歧奇异枝在 k=2 阻断`,
        `Hensel (${H.expr}): p=${p}∣Δ=${H.disc}, a₀=${b.a0}, f′(${b.a0})≡0 (mod ${p}) → ramified stall at k=2`
      );
    } else if (H.status === 'mixed_ramified') {
      const brS = H.simpleBranches[0], brR = H.ramifiedBranches[0];
      const expStr = `${brS.digits[0]}+${brS.digits[1]}·${p}+${brS.digits[2]}·${p}²+${brS.digits[3]}·${p}³`;
      hCol = P.cyan;
      hLine = L(
        `同树双态 (${H.expr}, p=23∣Δ): 单根 a₀=${brS.a0}→${expStr}… | 重根 a₀=${brR.a0} 分歧阻断`,
        `Coexisting (${H.expr}, p=23∣Δ): simple a₀=${brS.a0}→${expStr}… | double a₀=${brR.a0} stalls`
      );
    } else {
      const b = H.simpleBranches[0];
      const expStr = `${b.digits[0]} + ${b.digits[1]}·${p} + ${b.digits[2]}·${p}² + ${b.digits[3]}·${p}³ + ${b.digits[4]}·${p}⁴`;
      hCol = P.cyan;
      hLine = L(
        `亨泽尔零进位 (${H.expr}): [f′(${b.a0})]⁻¹≡${b.invModP} (mod ${p}) → ${expStr} ≡ ${b.residues[4]}`,
        `Hensel O(1) (${H.expr}): [f′(${b.a0})]⁻¹≡${b.invModP} (mod ${p}) → ${expStr} ≡ ${b.residues[4]}`
      );
    }
    // Line 2: Ultrametric blind-spot probe
    const pLine = Pr.firstK == null
      ? L(`超度量探针: x_A = x_B = ${Pr.xA} → d_${p} = 0`, `Ultrametric probe: x_A = x_B = ${Pr.xA} → d_${p} = 0`)
      : L(
        `盲区探针 (${Pr.xA}, ${Pr.xB}): |x_A − x_B| = ${Pr.diff}, v_${p} = ${Pr.val}, 最小区分层 k* = ${Pr.firstK}, d_${p} = ${Pr.distStr}`,
        `Blind-spot (${Pr.xA}, ${Pr.xB}): |x_A − x_B| = ${Pr.diff}, v_${p} = ${Pr.val}, first split k* = ${Pr.firstK}, d_${p} = ${Pr.distStr}`
      );
    // Line 3: the buckets of the first layer
    const bLine = L(`桶分布: ${stSummary(p, true)}`, `Buckets: ${stSummary(p, false)}`);
    return [{ text: hLine, color: hCol }, { text: pLine, color: P.ink }, { text: bLine, color: P.dim }];
  }

  /** The inspector card under the tree: one squeezed line per readout on wide frames; on narrow frames the readouts as
      wrapped lines (`wrapped`, from drawTreePanel), each line at full size. */
  function drawInspectorCard(ctx, box, lw, p, H, Pr, wrapped) {
    ctx.fillStyle = TRV.alpha(P.void || P.stage, 0.72);
    ctx.strokeStyle = TRV.alpha(P.lineHot || P.panelEdge, 0.8);
    ctx.lineWidth = 1 * lw;
    ctx.fillRect(box.x, box.y, box.w, box.h);
    ctx.strokeRect(box.x, box.y, box.w, box.h);

    ctx.font = font(9.5, 'data', 600);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    if (wrapped) {
      let y = box.y + 5;
      for (const g of wrapped) { ctx.fillStyle = g.color; for (const s of g.lines) { ctx.fillText(s, box.x + 8, y); y += 11; } }
      return;
    }
    const [hensel, probe, buckets] = inspectorTexts(p, H, Pr);
    ctx.fillStyle = hensel.color;
    ctx.fillText(hensel.text, box.x + 8, box.y + 7, box.w - 16);
    if (box.h >= 46) {
      ctx.fillStyle = probe.color;
      ctx.fillText(probe.text, box.x + 8, box.y + 26, box.w - 16);
    }
    if (box.h >= 62) {
      ctx.fillStyle = buckets.color;
      ctx.fillText(buckets.text, box.x + 8, box.y + 45, box.w - 16);
    }
  }

  function stSummary(p, zh) {
    const s = bucketStats(N_STATES, p);
    if (s.r === 0) {
      return zh
        ? `${p} 个桶各装 ${s.q} 态 · 精确首层碰撞对 E₁ = ${fmtInt(s.exactUnordered)}`
        : `${p} buckets × ${s.q} states · exact k=1 collisions E₁ = ${fmtInt(s.exactUnordered)}`;
    }
    const b1 = s.r === 1 ? 'bucket' : 'buckets';
    const b0 = p - s.r === 1 ? 'bucket' : 'buckets';
    return zh
      ? `${s.r} 桶装 ${s.q + 1} 态 + ${p - s.r} 桶装 ${s.q} 态 · 精确首层碰撞对 E₁ = ${fmtInt(s.exactUnordered)}`
      : `${s.r} ${b1}×${s.q + 1} + ${p - s.r} ${b0}×${s.q} · exact k=1 collisions E₁ = ${fmtInt(s.exactUnordered)}`;
  }

  /* ---------- Cliff Mode (r = 12): Continuous p_∞ Carry Avalanche vs Euclid Infinite Discrete Primes ---------- */
  function drawCliffVsEuclidPanel(ctx, rect, lw) {
    const titleBottom = panelFrame(
      ctx,
      rect,
      lw,
      'p_∞ 阿基米德连续进位悬崖 vs 欧几里得无穷离散素数阶梯',
      'p_∞ ARCHIMEDEAN CARRY CLIFF vs EUCLID INFINITE PRIME LADDER',
      true
    );
    ctx.save();
    ctx.beginPath();
    ctx.rect(rect.x + 2, rect.y + 2, rect.w - 4, rect.h - 4);
    ctx.clip();

    const padX = rect.x + 14, w = Math.max(40, rect.w - 28);
    const topY = rect.y + (TRV.thumbMode ? 18 : 28);
    let midY = rect.y + rect.h * 0.47;
    const botY = rect.y + rect.h - 14;
    const CAP = [
      L('p_∞ 连续实数极限：桶壁融化，511 + 1 = 512 触发十位全局进位雪崩', 'p_∞ continuum: clopen walls melt; 511 + 1 = 512 triggers 10-bit carry wave'),
      L('局部记忆清零 → 失忆轮回重置回 p = 2, K = 10（同构于 θ = 90° 纯光轮回）', 'Carry wipes local isolation → resets to p = 2, K = 10 (θ = 90° samsara)'),
      L('欧几里得无穷素数阶梯：∏pⱼ + 1 永生新素数 p*（如 30031 = 59×509），永不坠入 p_∞', 'Euclid prime ladder: ∏pⱼ + 1 yields new prime p* (e.g. 30031 = 59×509), never p_∞'),
      L('零进位超度量桶壁在每一级有限素数 p < ∞ 上永久保持闭合隔离', 'Clopen zero-carry bucket walls stay intact at every finite prime p < ∞')
    ];
    // narrow frames: the four captions wrapped at full size, and every part one under another: caption, register, reset
    // line, caption, divider, caption, the p* labels and the steps, the last caption at the bottom
    let N = null;
    if (narrowStage && !TRV.thumbMode) {
      const LH = 10.5;
      ctx.font = font(9.3, 'data', 600);
      const ls = CAP.map((c) => wrapLines(ctx, c, w));
      const t = Math.max(rect.y + 20, titleBottom), regY0 = t + ls[0].length * LH + 9, bitH0 = 13 * lw, loopY0 = regY0 + bitH0 + 7;
      const c2Y = loopY0 + 5, mid = c2Y + ls[1].length * LH + 3, c3Y = mid + 5, c4Y = rect.y + rect.h - 5 - ls[3].length * LH;
      N = { LH, ls, t, regY: regY0, bitH: bitH0, loopY: loopY0, c2Y, mid, c3Y, c4Y, base: c4Y - 3, maxStairH: Math.max(10, c4Y - 3 - (c3Y + ls[2].length * LH + 12)) };
      midY = mid;
    }

    // 1. Upper half: Continuous p_∞ Real Carry Avalanche (511 + 1 = 512 cascading across 10 bits -> amnesia reset to p=2)
    const regY = N ? N.regY : topY + (TRV.thumbMode ? 12 : 24);
    const bitH = N ? N.bitH : clamp((midY - regY) * 0.34, 12 * lw, 22 * lw);
    const bitW = w / 10;
    const bitsBefore = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1]; // 511 = 0111111111_2
    for (let i = 0; i < 10; i++) {
      const bx = padX + i * bitW;
      // Melted continuous cell (no clopen gap!)
      ctx.fillStyle = TRV.alpha(P.magenta, 0.16 + 0.025 * i);
      ctx.strokeStyle = TRV.alpha(P.magenta, 0.72);
      ctx.lineWidth = 1.1 * lw;
      ctx.fillRect(bx, regY, bitW, bitH);
      ctx.strokeRect(bx, regY, bitW, bitH);
      if (!TRV.thumbMode) {
        ctx.font = font(9.2, 'data', 600);
        ctx.fillStyle = P.ink;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${bitsBefore[i]}→${bitsBefore[i] ^ 1}`, bx + bitW / 2, regY + bitH / 2);
      }
      if (i > 0) {
        // Carry ripple arrow propagating right-to-left across every bit boundary!
        const ax1 = bx + bitW * 0.16, ax0 = bx - bitW * 0.16, ay = regY - 2;
        ctx.strokeStyle = P.magenta;
        ctx.lineWidth = 1.5 * lw;
        ctx.beginPath();
        ctx.moveTo(ax1, ay);
        ctx.quadraticCurveTo(bx, ay - 6.5 * lw, ax0, ay);
        ctx.stroke();
      }
    }
    // Samsara reset arc looping back to p=2, K=10
    const loopY = N ? N.loopY : regY + bitH + 12;
    ctx.strokeStyle = P.violet;
    ctx.lineWidth = 1.8 * lw;
    ctx.setLineDash([4 * lw, 3 * lw]);
    ctx.beginPath();
    ctx.moveTo(padX + w - 8, loopY);
    ctx.lineTo(padX + 8, loopY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = P.magenta;
    ctx.beginPath();
    ctx.moveTo(padX + 6, loopY);
    ctx.lineTo(padX + 14, loopY - 4 * lw);
    ctx.lineTo(padX + 14, loopY + 4 * lw);
    ctx.closePath();
    ctx.fill();

    if (N) {
      ctx.font = font(9.3, 'data', 600);
      ctx.textBaseline = 'top';
      ctx.fillStyle = P.magenta; ctx.textAlign = 'left';
      N.ls[0].forEach((s, i) => ctx.fillText(s, padX, N.t + i * N.LH));
      ctx.fillStyle = P.violet; ctx.textAlign = 'center';
      N.ls[1].forEach((s, i) => ctx.fillText(s, padX + w / 2, N.c2Y + i * N.LH));
    } else if (!TRV.thumbMode) {
      ctx.font = font(9.3, 'data', 600);
      ctx.fillStyle = P.magenta;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText(CAP[0], padX, topY, w);
      ctx.fillStyle = P.violet;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(CAP[1], padX + w / 2, loopY + 5, w);
    }

    // Divider
    ctx.strokeStyle = TRV.alpha(P.panelEdge, 0.9);
    ctx.lineWidth = 1 * lw;
    ctx.beginPath();
    ctx.moveTo(padX, midY);
    ctx.lineTo(padX + w, midY);
    ctx.stroke();

    // 2. Lower half: Euclid's Infinite Discrete Prime Staircase (blocking the jump to p_∞!)
    const nE = EUCLID_STEPS.length;
    const stepW = (w - 8 * (nE - 1)) / nE;
    const baseStairY = N ? N.base : botY - (TRV.thumbMode ? 6 : 18);
    const maxStairH = N ? N.maxStairH : Math.max(26, baseStairY - midY - (TRV.thumbMode ? 12 : 34));

    EUCLID_STEPS.forEach((es, i) => {
      const sx = padX + i * (stepW + 8);
      const sh = maxStairH * (0.28 + (0.72 * (i + 1)) / nE);
      const sy = baseStairY - sh;
      const active = i === nE - 1;

      ctx.fillStyle = TRV.alpha(active ? P.amber : P.cyan, active ? 0.34 : 0.20);
      ctx.strokeStyle = active ? P.amber : P.cyan;
      ctx.lineWidth = (active ? 1.8 : 1.2) * lw;
      ctx.fillRect(sx, sy, stepW, sh);
      ctx.strokeRect(sx, sy, stepW, sh);

      if (!TRV.thumbMode) {
        ctx.font = font(9.2, 'data', 600);
        ctx.fillStyle = active ? P.amber : P.cyan;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(`p*=${es.witness}`, sx + stepW / 2, sy - 2);
        ctx.font = font(8.3, 'data', 400);
        ctx.fillStyle = P.ink;
        ctx.textBaseline = 'middle';
        if (stepW >= 42) ctx.fillText(es.cat, sx + stepW / 2, sy + sh / 2, stepW - 4);
      }
    });

    if (N) {
      ctx.font = font(9.3, 'data', 600);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillStyle = P.cyan;
      N.ls[2].forEach((s, i) => ctx.fillText(s, padX, N.c3Y + i * N.LH));
      ctx.fillStyle = P.dim;
      N.ls[3].forEach((s, i) => ctx.fillText(s, padX, N.c4Y + i * N.LH));
    } else if (!TRV.thumbMode) {
      ctx.font = font(9.3, 'data', 600);
      ctx.fillStyle = P.cyan;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText(CAP[2], padX, midY + 5, w);
      ctx.fillStyle = P.dim;
      ctx.textBaseline = 'bottom';
      ctx.fillText(CAP[3], padX, botY + 2, w);
    }

    ctx.restore();
  }

  /* ---------- Right Top Sub-box: Tree-Depth Collapse K(p) & EscapePairs Decay ---------- */
  function drawDepthEscapeBox(ctx, rect, lw) {
    const titleBottom = panelFrame(
      ctx,
      rect,
      lw,
      '树深压平 K(p) 与首层碰撞对 E₁(1024, p) 衰减',
      'DEPTH COLLAPSE K(p) & k=1 COLLISION DECAY E₁(1024, p)',
      false
    );
    ctx.save();
    ctx.beginPath();
    ctx.rect(rect.x + 2, rect.y + 2, rect.w - 4, rect.h - 4);
    ctx.clip();

    const pl = TRV.thumbMode ? 20 : 34;
    const pr = TRV.thumbMode ? 18 : 30;
    // narrow frames: the plot starts right under the title as drawn and keeps 16 px under it for the prime labels
    const pt = TRV.thumbMode ? 18 : narrowStage ? Math.max(18, titleBottom - rect.y - 2) : 30;
    const pb = TRV.thumbMode ? 16 : narrowStage ? 16 : 26;
    const gx0 = rect.x + pl, gx1 = rect.x + rect.w - pr;
    const gy0 = rect.y + pt, gy1 = rect.y + rect.h - pb;
    const gw = Math.max(20, gx1 - gx0), gh = Math.max(20, gy1 - gy0);

    lastCurveHit = { x0: gx0, x1: gx1, y0: gy0, y1: gy1 };

    const X = (i) => gx0 + (gw * i) / R_CLIFF;
    const YK = (k) => gy1 - (gh * k) / 10.6; // K in 0..10
    const logMax = Math.log10(PRIME_TABLE[0].exactUnordered + 1);
    const YE = (e) => gy1 - (gh * Math.log10(Math.max(0, e) + 1)) / (logMax * 1.06);

    // Axes & horizontal grid
    ctx.strokeStyle = TRV.alpha(P.panelEdge, 0.85);
    ctx.lineWidth = 1 * lw;
    ctx.beginPath();
    ctx.moveTo(gx0, gy0); ctx.lineTo(gx0, gy1); ctx.lineTo(gx1, gy1);
    ctx.stroke();

    // where the four tick labels would touch (a flat plot), only the ends 1 and 10 are labelled; all four lines stay
    const tickRoom = YK(1) - YK(4) >= 10;
    for (const kTick of [1, 4, 7, 10]) {
      const y = YK(kTick);
      ctx.strokeStyle = TRV.alpha(P.dim, 0.18);
      ctx.beginPath(); ctx.moveTo(gx0, y); ctx.lineTo(gx1, y); ctx.stroke();
      if (!TRV.thumbMode && (tickRoom || kTick === 1 || kTick === 10)) {
        ctx.font = font(8.8, 'data', 600);
        ctx.fillStyle = P.cyan;
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${kTick}`, gx0 - 5, y);
      }
    }

    // Dashed p_∞ cliff boundary at index R_CLIFF = 12
    const xCliff = X(R_CLIFF);
    ctx.strokeStyle = P.magenta;
    ctx.lineWidth = 1.6 * lw;
    ctx.setLineDash([4 * lw, 3 * lw]);
    ctx.beginPath(); ctx.moveTo(xCliff, gy0); ctx.lineTo(xCliff, gy1); ctx.stroke();
    ctx.setLineDash([]);

    // Smooth approximation N(N-p)/(2p) dashed violet
    ctx.strokeStyle = TRV.alpha(P.violet, 0.45);
    ctx.lineWidth = 1.2 * lw;
    ctx.setLineDash([3 * lw, 3 * lw]);
    ctx.beginPath();
    PRIME_TABLE.forEach((row, i) => {
      const px = X(i), py = YE(row.smoothUnordered);
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    });
    ctx.stroke();
    ctx.setLineDash([]);

    // Exact unordered k=1 collisions E₁(1024, p) solid violet
    ctx.strokeStyle = P.violet;
    ctx.lineWidth = 1.9 * lw;
    ctx.beginPath();
    PRIME_TABLE.forEach((row, i) => {
      const px = X(i), py = YE(row.exactUnordered);
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    });
    ctx.stroke();

    // Serial lookup depth K(p) step-staircase in CYAN
    ctx.strokeStyle = P.cyan;
    ctx.lineWidth = 2.2 * lw;
    ctx.beginPath();
    PRIME_TABLE.forEach((row, i) => {
      const px = X(i), py = YK(row.depth);
      if (i === 0) ctx.moveTo(px, py);
      else {
        ctx.lineTo(px, YK(PRIME_TABLE[i - 1].depth));
        ctx.lineTo(px, py);
      }
    });
    ctx.stroke();

    const activeR = rIdx();
    if (activeR === R_CLIFF) {
      ctx.fillStyle = P.amber;
      ctx.beginPath(); ctx.arc(xCliff, gy0 + gh * 0.22, 4.6 * lw, 0, TAU); ctx.fill();
    } else {
      const ax = X(activeR);
      ctx.strokeStyle = TRV.alpha(P.amber, 0.55);
      ctx.lineWidth = 1.2 * lw;
      ctx.beginPath(); ctx.moveTo(ax, gy0); ctx.lineTo(ax, gy1); ctx.stroke();
    }

    // Prime dots (AMBER strictly on activeR!)
    PRIME_TABLE.forEach((row, i) => {
      const px = X(i), pyK = YK(row.depth), pyE = YE(row.exactUnordered);
      const on = i === activeR;
      ctx.fillStyle = on ? P.amber : P.violet;
      ctx.beginPath(); ctx.arc(px, pyE, (on ? 4.2 : 2.5) * lw, 0, TAU); ctx.fill();
      ctx.fillStyle = on ? P.amber : P.cyan;
      ctx.beginPath(); ctx.arc(px, pyK, (on ? 4.5 : 2.8) * lw, 0, TAU); ctx.fill();

      if (!TRV.thumbMode && (i % 2 === 0 || i === 11 || on)) {
        ctx.font = font(8.5, 'data', on ? 700 : 500);
        ctx.fillStyle = on ? P.amber : P.dim;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(String(row.p), px, gy1 + 5);
      }
    });

    if (!TRV.thumbMode) {
      ctx.font = font(8.8, 'data', 600);
      ctx.fillStyle = isCliff() ? P.amber : P.magenta;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText('p∞', xCliff, gy1 + 5);

      if (!isCliff()) {
        const row = PRIME_TABLE[activeR];
        ctx.font = font(9.5, 'data', 600);
        ctx.fillStyle = P.amber;
        ctx.textAlign = 'right';
        ctx.textBaseline = 'top';
        ctx.fillText(`p=${row.p}: K=${row.depth}, E₁=${fmtInt(row.exactUnordered)}`, gx1 - 4, gy0 + 2);
      }
    }

    ctx.restore();
  }

  /* ---------- Right Bottom Sub-box: Adelic Product Formula & CRT Multi-Observer Balance ---------- */
  function drawAdelicBox(ctx, rect, lw, fullMode = false) {
    const Ad = computeAdelic(S.rat);
    const titleBottom = panelFrame(
      ctx,
      rect,
      lw,
      `阿代尔乘积平衡 |x|_∞·∏|x|_p = 1  (x = ${Ad.label})`,
      `ADELIC PRODUCT BALANCE |x|_∞·∏|x|_p = 1  (x = ${Ad.label})`,
      fullMode
    );
    ctx.save();
    ctx.beginPath();
    ctx.rect(rect.x + 2, rect.y + 2, rect.w - 4, rect.h - 4);
    ctx.clip();

    // the small box of a narrow frame: the product and the log sum each on a line of their own under the bars, and one
    // label per bar ("p=2: 1/4") on the zero-line side away from the bar
    const small = narrowStage && !fullMode && !TRV.thumbMode, FL = 11.5;
    const pl = 14, pr = 14;
    const pt = TRV.thumbMode ? 18 : small ? Math.max(20, titleBottom - rect.y) + 2 : 28;
    const pb = TRV.thumbMode ? 16 : small ? 2 * FL + 10 : (fullMode ? 56 : 40);
    const bx0 = rect.x + pl, bw = Math.max(30, rect.w - pl - pr);
    const by0 = rect.y + pt, bh = Math.max(small ? 18 : 28, rect.h - pt - pb);
    const zeroY = by0 + bh * 0.5;

    const maxLog = Math.max(1.2, ...Ad.places.map((u) => Math.abs(u.logNorm))) * 1.22;
    const Y = (v) => zeroY - (v / maxLog) * (bh * 0.46);

    // Zero log-balance axis
    ctx.strokeStyle = TRV.alpha(P.ink, 0.55);
    ctx.lineWidth = 1.1 * lw;
    ctx.beginPath();
    ctx.moveTo(bx0, zeroY);
    ctx.lineTo(bx0 + bw, zeroY);
    ctx.stroke();

    const nBars = Ad.places.length;
    const gap = Math.min(16 * lw, (bw * 0.28) / Math.max(1, nBars));
    const barW = Math.min(54 * lw, (bw - gap * (nBars + 1)) / Math.max(1, nBars));
    const startX = bx0 + (bw - (nBars * barW + (nBars - 1) * gap)) / 2;
    const activeP = isCliff() ? null : curPrime();

    Ad.places.forEach((plItem, idx) => {
      const x = startX + idx * (barW + gap);
      const yVal = Y(plItem.logNorm);
      const top = Math.min(zeroY, yVal);
      const h = Math.max(2 * lw, Math.abs(yVal - zeroY));
      const isInf = plItem.prime === null;
      const isSelectedPrime = (isInf && isCliff()) || (!isInf && plItem.prime === activeP);
      const col = isInf ? P.magenta : (plItem.logNorm >= 0 ? P.cyan : P.violet);

      ctx.fillStyle = TRV.alpha(col, 0.36);
      ctx.strokeStyle = isSelectedPrime ? P.amber : col;
      ctx.lineWidth = (isSelectedPrime ? 2.2 : 1.3) * lw;
      ctx.fillRect(x, top, barW, h);
      ctx.strokeRect(x, top, barW, h);

      if (small) {
        ctx.font = font(9, 'data', 600);
        ctx.fillStyle = isSelectedPrime ? P.amber : P.ink;
        ctx.textAlign = 'center';
        ctx.textBaseline = plItem.logNorm >= 0 ? 'top' : 'bottom';
        ctx.fillText(`${plItem.place}: ${plItem.normStr}`, x + barW / 2, plItem.logNorm >= 0 ? zeroY + 2 : zeroY - 2);
      } else if (!TRV.thumbMode) {
        ctx.font = font(9, 'data', 600);
        ctx.fillStyle = isSelectedPrime ? P.amber : col;
        ctx.textAlign = 'center';
        ctx.textBaseline = plItem.logNorm >= 0 ? 'bottom' : 'top';
        ctx.fillText(`|x| = ${plItem.normStr}`, x + barW / 2, plItem.logNorm >= 0 ? top - 2 : top + h + 2);

        ctx.fillStyle = isSelectedPrime ? P.amber : P.ink;
        ctx.textBaseline = plItem.logNorm >= 0 ? 'top' : 'bottom';
        ctx.fillText(plItem.place, x + barW / 2, plItem.logNorm >= 0 ? zeroY + 3 : zeroY - 3);
      }
    });

    if (small) {
      const fy = rect.y + rect.h - 4 - 2 * FL;
      ctx.font = font(9.5, 'data', 600);
      ctx.fillStyle = P.cyan;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(`${Ad.places.map((u) => u.normStr).join(' × ')} = ${Ad.productStr}`, rect.x + rect.w / 2, fy, rect.w - 16);
      ctx.fillText(`ln|x|_∞ + ∑ ln|x|_p = ${fix(Ad.logSum, 4)}`, rect.x + rect.w / 2, fy + FL, rect.w - 16);
    } else if (!TRV.thumbMode) {
      const fy = rect.y + rect.h - pb + 6;
      ctx.font = font(9.5, 'data', 600);
      ctx.fillStyle = P.cyan;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      const factors = Ad.places.map((u) => u.normStr).join(' × ');
      ctx.fillText(`${factors} = ${Ad.productStr}   |   ln|x|_∞ + ∑ ln|x|_p = ${fix(Ad.logSum, 4)}`, rect.x + rect.w / 2, fy, rect.w - 16);
      if (fullMode) {
        ctx.fillStyle = P.dim;
        ctx.fillText(L(`中国剩余正交直积: ${Ad.crtIso}`, `CRT orthogonal product: ${Ad.crtIso}`), rect.x + rect.w / 2, fy + 18, rect.w - 16);
      }
    }

    ctx.restore();
  }

  /* ---------- Stage Painter ---------- */
  function drawStage() {
    const cv = $('cv'), dpr = TRV.fitCanvas(cv), W = cv.clientWidth, H = cv.clientHeight;
    const ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    const lw = TRV.thumbMode ? 1.9 : 1;
    const stacked = W < 620;
    lastStacked = stacked;
    narrowStage = stacked && !TRV.thumbMode && S.scene !== 'adelic';   // the adelic scene's two halves keep their layout
    const pt = TRV.thumbMode ? 14 : (stacked ? 102 : 56);
    const pb = TRV.thumbMode ? 14 : (stacked ? 54 : 42);
    const pl = 14, pr = 14;
    const inner = { x: pl, y: pt, w: Math.max(40, W - pl - pr), h: Math.max(40, H - pt - pb) };

    if (S.scene === 'tree') {
      lastCurveHit = null;
      drawTreePanel(ctx, inner, lw);
    } else if (S.scene === 'adelic') {
      const gap = 10;
      const r1 = stacked
        ? { x: inner.x, y: inner.y, w: inner.w, h: (inner.h - gap) * 0.5 }
        : { x: inner.x, y: inner.y, w: (inner.w - gap) * 0.5, h: inner.h };
      const r2 = stacked
        ? { x: inner.x, y: inner.y + (inner.h - gap) * 0.5 + gap, w: inner.w, h: (inner.h - gap) * 0.5 }
        : { x: inner.x + (inner.w - gap) * 0.5 + gap, y: inner.y, w: (inner.w - gap) * 0.5, h: inner.h };
      drawDepthEscapeBox(ctx, r1, lw);
      drawAdelicBox(ctx, r2, lw, true);
    } else {
      // 'duo': Left = Dynamic p-adic Prefix Tree & Hensel/Cliff; Right = Top Depth/Escape + Bottom Adelic Balance
      const gap = 10;
      if (stacked) {
        // the tree (or the cliff) is what these cards are about and carries the most rows and captions: on a narrow frame
        // the curve box and the adelic box keep what their plot, their bars and two footer lines need, the tree the rest
        const avail = inner.h - gap * 2;
        const hCurve = narrowStage ? clamp(avail * 0.18, 58, 110) : avail * 0.27;
        const hAd = narrowStage ? clamp(avail * 0.23, 76, 130) : avail * 0.25;
        const hTree = avail - hCurve - hAd;
        drawTreePanel(ctx, { x: inner.x, y: inner.y, w: inner.w, h: hTree }, lw);
        drawDepthEscapeBox(ctx, { x: inner.x, y: inner.y + hTree + gap, w: inner.w, h: hCurve }, lw);
        drawAdelicBox(ctx, { x: inner.x, y: inner.y + hTree + hCurve + gap * 2, w: inner.w, h: hAd }, lw, false);
      } else {
        const wL = (inner.w - gap) * 0.54;
        const wR = inner.w - gap - wL;
        const hTop = (inner.h - gap) * 0.54;
        const hBot = inner.h - gap - hTop;
        drawTreePanel(ctx, { x: inner.x, y: inner.y, w: wL, h: inner.h }, lw);
        drawDepthEscapeBox(ctx, { x: inner.x + wL + gap, y: inner.y, w: wR, h: hTop }, lw);
        drawAdelicBox(ctx, { x: inner.x + wL + gap, y: inner.y + hTop + gap, w: wR, h: hBot }, lw, false);
      }
    }
  }

  /* ---------- Strip Plots (#plotA, #plotB) ---------- */
  function drawPlots() {
    const A = $('plotA'), B = $('plotB');
    const activeR = rIdx();

    // Plot A: Serial lookup depth K(p) = ⌈10/log₂ p⌉ across r = 0..11 (+ cliff marker at 12)
    const gA = kit.plot(A, { x: [0, R_CLIFF], y: [0, 11], pad: [36, 12, 10, 22] });
    gA.axes({
      xTicks: [[0, '2'], [3, '7'], [6, '17'], [8, '31'], [11, '1031'], [12, 'p∞']],
      yTicks: [1, 4, 7, 10]
    });
    const kPts = PRIME_TABLE.map((row, i) => [i, row.depth]);
    gA.line(kPts, P.cyan, { width: 1.8 });
    kPts.forEach(([x, y], i) => gA.dot(x, y, i === activeR ? P.amber : P.cyan, i === activeR ? 4.3 : 2.6));
    gA.vline(R_CLIFF, P.magenta, { dash: [3, 3], alpha: 0.75 });
    gA.vline(activeR, P.amber, { alpha: 0.55 });
    $('pATitle').textContent = L('串行查表深度 K(p)', 'Serial depth K(p)');
    $('pAMeta').textContent = isCliff() ? L('p_∞ 进位溢出 → 重置 K=10', 'p_∞ cliff → reset K=10') : `K(${PRIMES[activeR]}) = ${PRIME_TABLE[activeR].depth}`;

    // Plot B: Adelic cumulative partial log-sum ln|x|_∞ + ∑_{q≤p} ln|x|_q converging to 0
    const Ad = computeAdelic(S.rat);
    const partial = [];
    let acc = Ad.places[0].logNorm;
    partial.push([0, acc]);
    Ad.places.slice(1).forEach((plItem, idx) => {
      acc += plItem.logNorm;
      partial.push([idx + 1, acc]);
    });
    const ym = Math.max(0.5, ...partial.map((u) => Math.abs(u[1]))) * 1.25;
    const xMax = Math.max(2, partial.length - 1);
    const gB = kit.plot(B, { x: [0, xMax], y: [-ym, ym], pad: [42, 12, 10, 22] });
    const xTicks = partial.map(([idx], i) => [idx, i === 0 ? '∞' : `≤${Ad.places[i].prime}`]);
    gB.axes({ xTicks, yTicks: [-ym * 0.75, 0, ym * 0.75], yFmt: (v) => fix(v, 2) });
    gB.hline(0, P.dim, { dash: [3, 3], alpha: 0.8 });
    gB.line(partial, P.cyan, { width: 1.8 });
    partial.forEach(([x, y], i) => {
      const isLast = i === partial.length - 1;
      gB.dot(x, y, isLast ? P.amber : (i === 0 ? P.magenta : P.cyan), isLast ? 4.2 : 3.0);
    });
    $('pBTitle').textContent = L('阿代尔部分对数和收敛 → 0', 'Adelic partial log-sum → 0');
    $('pBMeta').textContent = `x = ${Ad.label} → ∑ = ${fix(Ad.logSum, 4)}`;
  }

  /* ---------- HUD, Legend & Side Readouts ---------- */
  function drawText() {
    const activeR = rIdx();
    const cliff = isCliff();
    const p = curPrime();
    const st = bucketStats(N_STATES, p);
    const H = computeHensel(S.poly, p, 5);
    const Pr = computeProbe(p, PROBE_A, S.probeB);
    const Ad = computeAdelic(S.rat);

    // Header pills
    $('pillPrime').querySelector('strong').textContent = cliff ? 'p_∞' : `p = ${p}`;
    $('pillDepth').querySelector('strong').textContent = cliff ? '10↺' : `K = ${st.depth}`;
    $('pillEscape').querySelector('strong').textContent = cliff ? L('雪崩', 'CARRY') : fmtInt(st.exactUnordered);

    // Sync prime chip aria-pressed
    primeChips.set(String(activeR), true);

    // Stage HUD
    if (cliff) {
      $('hudBig').textContent = L('欧几里得无穷素数梯 vs p_∞ 连续进位崖', 'EUCLID PRIME LADDER vs p_∞ CARRY CLIFF');
      $('hudSub').textContent = L(
        '跃入 p_∞ 融化超度量桶壁触发十位进位轮回 · ∏pⱼ+1 保守无穷离散扩表',
        'p_∞ melts clopen walls into 10-bit carry reset · ∏pⱼ+1 keeps discrete expansion infinite'
      );
      $('legend').innerHTML = [
        `<span><i class="sw cy"></i>${L('离散素数阶梯 p₁<p₂<…', 'discrete prime ladder')}</span>`,
        `<span><i class="sw mg"></i>${L('p_∞ 连续进位雪崩', 'p_∞ carry avalanche')}</span>`,
        `<span><i class="sw vi"></i>${L('失忆轮回重置弧', 'amnesia reset loop')}</span>`,
        `<span><i class="sw am"></i>${L('欧几里得新素数见证 p*', 'Euclid witness p*')}</span>`
      ].join('');
    } else if (S.scene === 'adelic') {
      $('hudBig').textContent = L(`阿代尔乘积守恒 · x = ${Ad.label}`, `ADELIC PRODUCT LEDGER · x = ${Ad.label}`);
      $('hudSub').textContent = `|x|_∞ · ∏_p |x|_p = ${Ad.productStr}  |  ln|x|_∞ + ∑ ln|x|_p = ${fix(Ad.logSum, 4)}`;
      $('legend').innerHTML = [
        `<span><i class="sw mg"></i>${L('阿基米德实标尺 ln|x|_∞', 'archimedean ln|x|_∞')}</span>`,
        `<span><i class="sw cy"></i>${L('正 p 进对数项 (|x|_p > 1)', 'positive ln|x|_p (|x|_p > 1)')}</span>`,
        `<span><i class="sw vi"></i>${L('负 p 进对数项 & 首层碰撞对', 'negative ln|x|_p & collisions')}</span>`,
        `<span><i class="sw am"></i>${L(`当前选中观察者 p = ${p}`, `active observer p = ${p}`)}</span>`
      ].join('');
    } else {
      $('hudBig').textContent = p > N_STATES
        ? L(`观察者 p = ${p} > 1024 · 单层零碰撞直读 (K = 1)`, `OBSERVER p = ${p} > 1024 · SINGLE-LAYER READ (K = 1)`)
        : L(`观察者 p = ${p} · 树深 K = ${st.depth} · 首层碰撞 ${fmtInt(st.exactUnordered)}`, `OBSERVER p = ${p} · DEPTH K = ${st.depth} · COLLISIONS ${fmtInt(st.exactUnordered)}`);
      $('hudSub').textContent = H.status === 'unsat_k1'
        ? L(`${H.expr} 在 F_${p} 基表无根 (k=1 即证无解) · |x|_∞·∏|x|_p = 1`, `${H.expr} has no F_${p} root (k=1 UNSAT) · |x|_∞·∏|x|_p = 1`)
        : H.ramifiedBranches.length > 0
          ? L(`p=${p} ∣ Δ=${H.disc} 触发分歧奇异枝 · 阿代尔 ${Ad.label} 乘积 = 1`, `p=${p} ∣ Δ=${H.disc} ramified branch · Adelic ${Ad.label} product = 1`)
          : L(`亨泽尔 O(1) 提根 [f′(${H.simpleBranches[0].a0})]⁻¹≡${H.simpleBranches[0].invModP} (mod ${p}) · 零向后进位`, `Hensel O(1) lift [f′(${H.simpleBranches[0].a0})]⁻¹≡${H.simpleBranches[0].invModP} (mod ${p}) · zero carry`);
      $('legend').innerHTML = [
        `<span><i class="sw cy"></i>${L('零进位超度量桶 / 亨泽尔提根枝', 'clopen buckets / Hensel lift')}</span>`,
        `<span><i class="sw mg"></i>${L('分歧奇异枝 (p∣Δ) / |x|_∞', 'ramified branch (p∣Δ) / |x|_∞')}</span>`,
        `<span><i class="sw vi"></i>${L('首层碰撞对 E₁ / 盲区探针', 'k=1 collisions E₁ / probe')}</span>`,
        `<span><i class="sw am"></i>${L(`当前激活观察者 p = ${p}`, `active observer p = ${p}`)}</span>`
      ].join('');
    }

    // Side Readouts
    $('roAside').textContent = cliff ? 'CLIFF p_∞' : `PRIME p = ${p}`;
    $('roKeyL').textContent = cliff
      ? L('连续极限 p_∞ vs 欧几里得逃逸见证 (∏pⱼ + 1)', 'Continuum cliff p_∞ vs Euclid witness (∏pⱼ + 1)')
      : L('目标空间 N = 1024 串行树深 K(p) 与首层碰撞对 E₁', 'Serial depth K(p) & exact k=1 collisions E₁ on N = 1024');
    $('roKey').textContent = cliff
      ? '30031 = 59 × 509'
      : `K(${p}) = ${st.depth}  ·  E₁ = ${fmtInt(st.exactUnordered)}`;
    $('roKeySub').textContent = cliff
      ? L(' 离散素数永不枯竭，阻断十位进位清零', ' infinite discrete primes block 10-bit carry reset')
      : L(` (桶容量 ${st.minOcc === st.maxOcc ? st.maxOcc : `${st.minOcc}..${st.maxOcc}`})`, ` (bucket size ${st.minOcc === st.maxOcc ? st.maxOcc : `${st.minOcc}..${st.maxOcc}`})`);

    $('roL1').textContent = L(`亨泽尔检验 f(x) = ${H.expr} (Δ=${H.disc})`, `Hensel check f(x) = ${H.expr} (Δ=${H.disc})`);
    if (H.status === 'unsat_k1') {
      $('ro1').textContent = L(`F_${p} 无根 → k=1 单层证伪`, `No root in F_${p} → UNSAT at k=1`);
    } else if (H.status === 'ramified_only') {
      const b = H.ramifiedBranches[0];
      $('ro1').textContent = L(`a₀=${b.a0}, f′≡0 (mod ${p}) → k=2 分歧阻断`, `a₀=${b.a0}, f′≡0 (mod ${p}) → stalls at k=2`);
    } else {
      const b = H.simpleBranches[0];
      $('ro1').textContent = `[${b.digits.join(', ')}]_${p} ≡ ${b.residues[4]} (mod ${p}⁵)`;
    }

    $('roL2').textContent = L(`超度量探针 (x_A=${Pr.xA}, x_B=${Pr.xB})`, `Ultrametric probe (x_A=${Pr.xA}, x_B=${Pr.xB})`);
    $('ro2').textContent = Pr.firstK == null
      ? 'x_A = x_B → d_p = 0'
      : `v_${p} = ${Pr.val},  k* = ${Pr.firstK},  d_${p} = ${Pr.distStr}`;

    $('roL3').textContent = L('首层光滑近似 N(N−p)/(2p)', 'Smooth bound N(N−p)/(2p)');
    $('ro3').textContent = fix(st.smoothUnordered, 2);

    $('roL4').textContent = L('阿代尔有理乘积核对', 'Adelic product check');
    $('ro4').textContent = `${Ad.label} → ∏ = ${Ad.productStr}`;

    $('roL5').textContent = L('中国剩余互素分解与对数和', 'CRT coprime split & log sum');
    $('ro5').textContent = `${Ad.crtIso} · ∑ln = ${fix(Ad.logSum, 6)}`;

    $('roNote').textContent = cliff
      ? L(
        '一旦跳入连续阿基米德位 p_∞，既开又闭的超度量桶壁消失，局部加法引发跨全部数位的进位涟漪；留在欧几里得无穷素数序列中则永远保持零进位查表。',
        'Crossing into continuous p_∞ dissolves clopen bucket walls into global carry ripples; staying on Euclid’s infinite discrete prime ladder preserves zero-carry lookup forever.'
      )
      : L(
        '素数 p 越大，单层水平扇出越宽，串行深度 K(p) = ⌈10/log₂ p⌉ 越浅；当 p = 1031 > 1024 时，q = 0, r = 1024，首层碰撞对 E₁ 严格归零。',
        'Larger prime p widens horizontal fan-out and flattens serial depth K(p) = ⌈10/log₂ p⌉; once p = 1031 > 1024, q = 0, r = 1024, and k=1 collisions E₁ drop strictly to 0.'
      );
  }

  const paint = kit.painter(() => { drawStage(); drawPlots(); drawText(); }, [$('stage'), $('plotA'), $('plotB')]);

  /* ---------- Clock Rail & Interactive Controls ---------- */
  let stopAt = null;
  const clock = kit.clock({
    range: $('now'),
    play: $('play'),
    label: $('tau'),
    speeds: $('speedChips'),
    max: R_CLIFF,
    rate: 1.4,
    step: 1,
    format: (t) => {
      const idx = clamp(Math.round(t), 0, R_CLIFF);
      if (idx === R_CLIFF) return `p<sub>∞</sub> <small>${L('悬崖', 'cliff')}</small>`;
      return `p = ${PRIMES[idx]} <small>(K=${PRIME_TABLE[idx].depth})</small>`;
    },
    onChange: (t, c) => {
      if (stopAt != null && c.playing && t >= stopAt) {
        const at = stopAt;
        stopAt = null;
        c.pause();
        c.set(at);
        return;
      }
      paint();
    }
  });

  function setScene(sc, rVal) {
    S.scene = sc;
    sceneChips.set(sc, true);
    clock.pause();
    clock.rate = SC[sc].rate;
    clock.setMax(SC[sc].max, true);
    if (rVal != null) clock.set(rVal);
    else paint();
  }

  const leave = () => { stopAt = null; cards.mark(null); };
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); setScene(v, rIdx()); });
  const primeChips = kit.chips($('primeChips'), 'prime', (v) => {
    leave();
    clock.pause();
    clock.set(clamp(parseInt(v, 10) || 0, 0, R_CLIFF));
  });
  const polyChips = kit.chips($('polyChips'), 'poly', (v) => { S.poly = v; leave(); paint(); });
  const ratChips = kit.chips($('ratChips'), 'rat', (v) => { S.rat = v; leave(); paint(); });
  const fProbeB = kit.field($('probeB'), {
    fmt: (v) => String(Math.round(v)),
    onInput: (v) => { S.probeB = clamp(Math.round(v), 0, 1023); leave(); paint(); }
  });
  $('rew').addEventListener('click', () => { stopAt = null; clock.pause(); clock.set(0); });

  // Click on the right-hand Depth/Escape curve to jump directly to any prime p (or p_∞)!
  $('cv').addEventListener('pointerdown', (ev) => {
    if (!lastCurveHit) return;
    const b = $('cv').getBoundingClientRect();
    const px = ev.clientX - b.left, py = ev.clientY - b.top;
    const { x0, x1, y0, y1 } = lastCurveHit;
    if (px < x0 - 12 || px > x1 + 12 || py < y0 - 12 || py > y1 + 20) return;
    const frac = clamp((px - x0) / Math.max(1, x1 - x0), 0, 1);
    const idx = clamp(Math.round(frac * R_CLIFF), 0, R_CLIFF);
    leave();
    clock.pause();
    clock.set(idx);
  });

  kit.keys({
    1: () => { leave(); setScene('duo', rIdx()); },
    2: () => { leave(); setScene('tree', rIdx()); },
    3: () => { leave(); setScene('adelic', rIdx()); },
    f: () => {
      const nxt = POLY_ORDER[(POLY_ORDER.indexOf(S.poly) + 1) % POLY_ORDER.length];
      polyChips.set(nxt);
    },
    r: () => {
      const nxt = RAT_ORDER[(RAT_ORDER.indexOf(S.rat) + 1) % RAT_ORDER.length];
      ratChips.set(nxt);
    }
  });

  /* ---------- 6 Citable Experiment Cards ---------- */
  const CARDS = {
    cleavage:   { scene: 'duo',    poly: 'sqrt2',   rat: '12/35', probeB: 42,  from: 0, to: 0,  still: 0 },
    hensel:     { scene: 'duo',    poly: 'sqrt2',   rat: '12/35', probeB: 353, from: 0, to: 3,  still: 3 },
    flatten:    { scene: 'duo',    poly: 'sqrt2',   rat: '12/35', probeB: 353, from: 0, to: 8,  still: 8 },
    unramified: { scene: 'duo',    poly: 'sqrt2',   rat: '12/35', probeB: 353, from: 3, to: 11, still: 11 },
    adelic:     { scene: 'adelic', poly: 'sqrtm1',  rat: '12/35', probeB: 135, from: 0, to: 2,  still: 2 },
    euclid:     { scene: 'duo',    poly: 'cubic23', rat: '-42/5', probeB: 353, from: 7, to: 12, still: 12 }
  };

  const NOTES = {
    cleavage: [
      '胚胎二分卵裂（p = 2）：单层扇出仅 2，分离 N = 1024 = 2¹⁰ 态需 K(2) = 10 层串行查表，首层碰撞对高达 E₁ = 261,632；同时 2 ∣ Δ(x²−2) = 8，基根 a₀ = 0 处导数 f′(0) ≡ 0 (mod 2)，品红/紫色分歧奇异枝在 k = 2 处阻断。',
      'Embryonic binary cleavage (p = 2): fan-out 2 needs K(2) = 10 serial lookup layers to separate N = 1024 = 2¹⁰ states, leaving E₁ = 261,632 first-layer collision pairs; since 2 ∣ Δ(x²−2) = 8, root a₀ = 0 has f′(0) ≡ 0 (mod 2) and stalls at k = 2 in magenta/violet.'
    ],
    hensel: [
      '亨泽尔零进位查表（p = 7，f(x) = x² − 2）：7 ∤ Δ = 8 且 3² ≡ 2 (mod 7)，只需固定基表逆元 [f′(3)]⁻¹ = 6⁻¹ ≡ 6 (mod 7)，每层 O(1) 追加一位 7 进数字：3 + 1·7 + 2·7² + 6·7³ + 1·7⁴ ≡ 4567 (mod 7⁵)，全程零向后进位；探针 (10, 353) 因 353−10 = 7³ 在 k* = 4 精确分离。',
      'Hensel zero-carry lookup (p = 7, f(x) = x² − 2): since 7 ∤ Δ = 8 and 3² ≡ 2 (mod 7), fixed inverse [f′(3)]⁻¹ ≡ 6 (mod 7) appends one base-7 digit per layer in O(1)—3 + 1·7 + 2·7² + 6·7³ + 1·7⁴ ≡ 4567 (mod 7⁵)—with zero backward carry; probe (10, 353) splits at k* = 4 since 353−10 = 7³.'
    ],
    flatten: [
      '素数扩表压平树深（p = 31）：水平扇出展宽至 31 个既开又闭模桶（1 桶装 34 态 + 30 桶装 33 态），串行查表深度从 10 层压平至 K(31) = 3 层，首层碰撞对骤降至 E₁ = 16,401（较 p = 2 削减逾 93.7%）。',
      'Prime expansion flattens depth (p = 31): widening horizontal fan-out to 31 clopen buckets (1 bucket of 34 + 30 buckets of 33) collapses serial depth from 10 to K(31) = 3 and cuts k=1 collision pairs to E₁ = 16,401 (> 93.7% reduction vs p = 2).'
    ],
    unramified: [
      '越过状态空间上界（p = 1031 > N = 1024）：q = ⌊1024/1031⌋ = 0，1024 个状态各自独占 Z/1031Z 中一个单元素既开又闭桶（余 7 个空桶），首层逃逸碰撞对精确归零（E₁ = 0），整棵树压平为 K = 1 单层无进位直读表。',
      'Past the state-space bound (p = 1031 > N = 1024): q = ⌊1024/1031⌋ = 0 places all 1024 states into distinct singleton clopen buckets of Z/1031Z (with 7 empty slots), dropping k=1 collisions strictly to E₁ = 0 in a single K = 1 direct read.'
    ],
    adelic: [
      '多观察者中国剩余正交与阿代尔乘积守恒（x = 12/35 = 2²·3·5⁻¹·7⁻¹）：品红实范数 |x|_∞ = 12/35 与素数观察者范数 |x|₂=1/4, |x|₃=1/3, |x|₅=5, |x|₇=7 精确相乘得 1（对数和 ln|x|_∞ + ∑_p ln|x|_p = 0），并在 Z/420Z ≅ Z/4Z×Z/3Z×Z/5Z×Z/7Z 上正交解耦。',
      'Multi-observer CRT decoupling & Adelic product balance (x = 12/35 = 2²·3·5⁻¹·7⁻¹): magenta real norm |x|_∞ = 12/35 and prime norms |x|₂=1/4, |x|₃=1/3, |x|₅=5, |x|₇=7 multiply to 1 (ln|x|_∞ + ∑_p ln|x|_p = 0), factoring orthogonally across Z/420Z ≅ Z/4Z×Z/3Z×Z/5Z×Z/7Z.'
    ],
    euclid: [
      '欧几里得无穷离散素数阶梯阻断 p_∞ 轮回悬崖：若一步跳入阿基米德连续极限 p_∞，超度量桶壁融化，511 + 1 = 512 触发十位全局进位雪崩并失忆重置回 p = 2, K = 10；而 ∏pⱼ + 1（如 30031 = 59×509）保证新素数永不枯竭，使扩表永远停留在零进位清醒态。',
      'Euclid’s infinite discrete prime ladder blocks the p_∞ carry cliff: jumping into continuous p_∞ melts clopen walls into a 10-bit carry cascade (511 + 1 = 512) that resets to binary p = 2, K = 10; Euclid’s ∏pⱼ + 1 (e.g. 30031 = 59×509) supplies endless finite primes, preserving zero-carry clarity.'
    ]
  };

  let booting = true;
  function runCard(c) {
    setScene(c.scene, c.from);
    if (TRV.still || (booting && !TRV.embed) || c.from === c.to) {
      clock.set(c.still);
      return;
    }
    stopAt = c.to;
    if (booting) kit.autoplay(clock, $('stage'));
    else clock.play();
  }

  function applyPreset(id) {
    const c = CARDS[id];
    stopAt = null;
    S.poly = c.poly; polyChips.set(c.poly, true);
    S.rat = c.rat; ratChips.set(c.rat, true);
    S.probeB = c.probeB; fProbeB.set(c.probeB);
    runCard(c);
  }

  const cards = kit.cards($('presets'), {
    notes: NOTES,
    noteEl: $('presetNote'),
    tour: $('tour'),
    onPick: applyPreset,
    idle: [
      '自由探索：点击任意素数芯片（2…1031 或 p_∞ 连续悬崖），切换多项式 f(x) 与有理数 x，滑动盲区探针 x_B 核验超度量分层与阿代尔乘积守恒。',
      'Free play: select any prime chip (2…1031 or the p_∞ cliff), switch polynomial f(x) and rational x, and slide probe x_B to inspect ultrametric splitting and Adelic balance.'
    ]
  });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- Debug & Automated Test Probe ---------- */
  window.PADIC_DEBUG = {
    PRIMES: PRIMES.slice(),
    N_STATES,
    N_BITS,
    PRIME_TABLE: PRIME_TABLE.map((x) => ({ ...x })),
    EUCLID_STEPS: EUCLID_STEPS.map((x) => ({ ...x })),
    computeHensel,
    computeProbe,
    computeAdelic,
    bucketStats,
    get state() {
      const idx = rIdx();
      const cliff = isCliff();
      const p = curPrime();
      const st = bucketStats(N_STATES, p);
      const H = computeHensel(S.poly, p, 5);
      const Pr = computeProbe(p, PROBE_A, S.probeB);
      const Ad = computeAdelic(S.rat);
      return {
        scene: S.scene,
        preset: cards.current,
        rIdx: idx,
        isCliff: cliff,
        prime: cliff ? null : p,
        anchorPrime: p,
        depth: st.depth,
        exactUnordered: st.exactUnordered,
        exactOrdered: st.exactOrdered,
        smoothUnordered: st.smoothUnordered,
        q: st.q,
        rem: st.r,
        poly: S.poly,
        hensel: H,
        probeA: PROBE_A,
        probeB: S.probeB,
        probe: Pr,
        rat: S.rat,
        adelic: Ad,
        t: clock.t,
        max: clock.max,
        playing: clock.playing,
        stopAt,
        stacked: lastStacked
      };
    },
    curveHitAt: (idx) => {
      if (!lastCurveHit) return null;
      const b = $('cv').getBoundingClientRect();
      const x = lastCurveHit.x0 + ((lastCurveHit.x1 - lastCurveHit.x0) * idx) / R_CLIFF;
      const y = (lastCurveHit.y0 + lastCurveHit.y1) / 2;
      return [b.left + x, b.top + y];
    },
    seek: (t) => { stopAt = null; clock.pause(); clock.set(t); }
  };

  window.TRV_THUMB = () => {
    S.poly = 'sqrt2'; polyChips.set('sqrt2', true);
    S.rat = '12/35'; ratChips.set('12/35', true);
    S.probeB = 353; fProbeB.set(353);
    setScene('duo', 3); // p = 7 Hensel + Depth/Escape + Adelic dual stage
    paint.now();
  };

  cards.pick(cards.initial('hensel'));
  booting = false;
  paint();
})();
