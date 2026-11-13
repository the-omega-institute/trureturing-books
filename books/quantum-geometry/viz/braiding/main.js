/* BRAID//STRANDS · 编织 · Braiding
   World lines of particles in the plane (e₁, e₂), time going up (world z). A braid is a word of generators applied
   from the bottom up: +k is σ_k, −k is σ_k⁻¹. σ_k turns particles k and k + 1 half a turn anticlockwise about their
   midpoint (seen from above), so the left one passes in front (world y < 0 faces the default camera); σ_k⁻¹ turns them
   clockwise. Colors are elements of ℤ/3 carried up the strands by the chapter's rule: σ_k sends (c_k, c_{k+1}) to
   (c_k ⋆ c_{k+1}, c_k), σ_k⁻¹ sends (u, v) to (v, v ⋆⁻¹ u). "Closed up" joins the k-th top end to the k-th bottom end
   with an arc on the right; a closed coloring is one that comes back. A card may show a second braid on the right for
   comparison; its bottom colors are those of the first, with the last one copied when it has one strand more.
   The stage is a lit solid (kit.solid): the world lines already run are tubes, so the strand in front hides the one
   behind it; the closing arcs become tubes once the colors have run through; the colors of now ride on beads.
   Read-only probe for the browser suite: window.BRAID_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const D = 0.8, Z0 = -1.1, Z1 = 1.1, R = D / 2;
  const SUB = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'];
  const SUP = { 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶' };

  /* ---------- colors: two operations on ℤ/3 ---------- */
  const mod3 = (x) => ((x % 3) + 3) % 3;
  const RULES = {
    dihedral: { act: (x, y) => mod3(2 * x - y), inv: (x, y) => mod3(2 * x - y), zh: 'x⋆y = 2x − y（模 3）', en: 'x⋆y = 2x − y (mod 3)' },
    shift: { act: (x, y) => mod3(y + 1), inv: (x, y) => mod3(y - 1), zh: 'x⋆y = y + 1（模 3），x⋆x ≠ x', en: 'x⋆y = y + 1 (mod 3), x⋆x ≠ x' }
  };
  /** Colors after one generator. */
  function step(c, g, rule) {
    const Q = RULES[rule], i = Math.abs(g) - 1, out = c.slice(), u = c[i], v = c[i + 1];
    if (g > 0) { out[i] = Q.act(u, v); out[i + 1] = u; } else { out[i] = v; out[i + 1] = Q.inv(v, u); }
    return out;
  }
  const transport = (c, word, rule) => word.reduce((acc, g) => step(acc, g, rule), c.slice());
  /** Closed colorings of the braid: all c ∈ (ℤ/3)ⁿ with b · c = c. */
  function closedCount(n, word, rule) {
    let k = 0;
    for (let m = 0; m < 3 ** n; m++) { const c = []; for (let j = 0, r = m; j < n; j++, r = Math.floor(r / 3)) c.push(r % 3); if (transport(c, word, rule).every((x, j) => x === c[j])) k++; }
    return k;
  }
  /** The product, written as Lean writes it: the generator applied last stands on the left. */
  function product(word) {
    if (!word.length) return 'e';
    const g = word.slice().reverse(), parts = [];
    for (let i = 0; i < g.length;) {
      let j = i; while (j < g.length && g[j] === g[i]) j++;
      const k = j - i, base = `σ${SUB[Math.abs(g[i])]}`;
      parts.push(g[i] > 0 ? base + (k > 1 ? SUP[k] || `^${k}` : '') : base + (k > 1 ? `⁻${SUP[k] || k}` : '⁻¹'));
      i = j;
    }
    return parts.join('');
  }
  const tuple = (c) => `(${c.join(', ')})`;

  /* ---------- state ---------- */
  const S = { n: 2, word: [1], colors: [0, 1], rule: 'dihedral', closed: false, view: 'tilt', B: null };
  /** The second braid's bottom colors: the same, the last one copied, or cut short. */
  const inputB = (n) => { const c = S.colors.slice(0, n); while (c.length < n) c.push(c[c.length - 1]); return c; };
  function braid(n, word, colors) {
    const Lw = word.length, cols = [colors.slice()], perm = [[...Array(n).keys()]];   // perm[j][slot] = strand
    for (let j = 0; j < Lw; j++) {
      cols.push(step(cols[j], word[j], S.rule));
      const p = perm[j].slice(), i = Math.abs(word[j]) - 1; [p[i], p[i + 1]] = [p[i + 1], p[i]]; perm.push(p);
    }
    return { n, word: word.slice(), L: Lw, cols, perm, count: closedCount(n, word, S.rule), cx: 0 };
  }
  function model() {
    const A = braid(S.n, S.word, S.colors), B = S.B ? braid(S.B.n, S.B.word, inputB(S.B.n)) : null;
    // side by side: each braid's half-width, the closing arcs reach out to the right
    const half = (b) => ((b.n - 1) / 2) * D + 0.35;
    const reach = (b) => (S.closed ? 0.42 + 0.28 * (b.n - 1) : 0);
    if (B) {
      const wA = half(A) + reach(A), wB = half(B) + reach(B), gap = S.closed ? 0.6 : 1.0;
      A.cx = -(gap / 2 + wA) + half(A); B.cx = gap / 2 + half(B);
      const shift = ((A.cx - half(A)) + (B.cx + half(B) + reach(B))) / 2; A.cx -= shift; B.cx -= shift;
    } else A.cx = -reach(A) / 2;
    return { A, B, list: B ? [A, B] : [A] };
  }
  const xOf = (b, slot) => b.cx + (slot - (b.n - 1) / 2) * D;
  /** Height of the rail position t ∈ [0, 1]: every braid spans the same height, whatever its length. */
  const zAt = (t) => Z0 + t * (Z1 - Z0);
  /** Where every strand is at crossing-time tau ∈ [0, L]: strand → [x, y]. */
  function positions(b, tau) {
    const out = new Array(b.n);
    if (!b.L) { for (let s = 0; s < b.n; s++) out[s] = [xOf(b, s), 0]; return out; }
    const j = Math.min(b.L - 1, Math.floor(tau + 1e-12)), u = tau - j, g = b.word[j], i = Math.abs(g) - 1, sg = Math.sign(g);
    const e = TRV.smooth(Math.max(0, Math.min(1, (u - 0.12) / 0.76)));
    for (let s = 0; s < b.n; s++) out[b.perm[j][s]] = [xOf(b, s), 0];
    const m = (xOf(b, i) + xOf(b, i + 1)) / 2, fl = Math.PI + sg * Math.PI * e, fr = sg * Math.PI * e;
    out[b.perm[j][i]] = [m + R * Math.cos(fl), R * Math.sin(fl)];
    out[b.perm[j][i + 1]] = [m + R * Math.cos(fr), R * Math.sin(fr)];
    return out;
  }
  /** Sampled world line of every strand: strand → [[x, y, z], …]. */
  function lines(b) {
    const N = b.L ? 28 * b.L : 1, pts = [...Array(b.n)].map(() => []);
    for (let q = 0; q <= N; q++) { const tau = b.L ? (q / N) * b.L : q, ps = positions(b, tau), z = Z0 + (q / N) * (Z1 - Z0); ps.forEach((p, s) => pts[s].push([p[0], p[1], z])); }
    return pts;
  }
  /** The closing arc of slot k: from the top end, out to the right, down, and back in to the bottom end. */
  function arc(b, k) {
    const x = xOf(b, k), o = b.n - 1 - k, X = xOf(b, b.n - 1) + 0.42 + 0.28 * o, h = 0.16 + 0.13 * o, pts = [];
    const seg = (a, c, m) => { for (let i = 1; i <= m; i++) pts.push([a[0] + (c[0] - a[0]) * i / m, 0, a[1] + (c[1] - a[1]) * i / m]); };
    let cur = [x, Z1]; pts.push([x, 0, Z1]);
    for (const nxt of [[x, Z1 + h], [X, Z1 + h], [X, Z0 - h], [x, Z0 - h], [x, Z0]]) { seg(cur, nxt, 10); cur = nxt; }
    return pts;
  }

  /* ---------- stage: lit tubes for the world lines (kit.solid) ----------
     The tube in front hides the one behind it, so which strand passes in front is read off the solid itself. The
     layout (scale and centre, as fractions of the stage) is fitted to the braids every frame and set on the stage;
     the construction options only read it back. */
  const cv = $('cv'), VIEWS = { tilt: [-0.5, 0.24], front: [0, 0] };
  /** Radii in world units: the world lines passed so far, the closing arcs once run through, the beads of now. */
  const TUBE = 0.032, ARC_TUBE = 0.028, BEAD = 0.046;
  const FIT0 = { radius: 0.3, cx: 0.5, cy: 0.5 };
  let M = null, lastFit = null, fitted = false, stage;
  stage = kit.solid($('stage'), {
    canvas: cv, yaw: VIEWS.tilt[0], pitch: VIEWS.tilt[1],
    get radius() { return stage && fitted ? stage.radius : FIT0.radius; },
    get cx() { return stage && fitted ? stage.cx : FIT0.cx; },
    get cy() { return stage && fitted ? stage.cy : FIT0.cy; },
    onChange: () => paint(),
    onPick: (ev, st) => {
      if (!M) return false;
      for (let k = 0; k < M.A.n; k++) if (st.near(ev, [xOf(M.A, k), 0, Z0]) < 24) { recolor(k); return true; }
      return false;
    }
  });
  function fit() {
    const W = cv.clientWidth || 1, H = cv.clientHeight || 1, thumb = TRV.thumbMode, narrow = W < 560;
    const top = thumb ? 20 : (narrow ? 70 : 64), bottom = thumb ? 20 : (narrow ? 96 : 54);
    let x0 = Infinity, x1 = -Infinity;
    for (const b of M.list) { x0 = Math.min(x0, xOf(b, 0) - 0.45); x1 = Math.max(x1, xOf(b, b.n - 1) + (S.closed ? 0.5 + 0.28 * (b.n - 1) : 0.45)); }
    const zh = Z1 - Z0 + (S.closed ? 2 * (0.2 + 0.13 * 2) : 0.4);
    const unit = Math.min((W - (narrow ? 24 : 70)) / (x1 - x0), (H - top - bottom) / (zh + 0.25));
    stage.radius = unit / Math.min(W, H); stage.cy = (top + (H - bottom)) / 2 / H; stage.cx = 0.5 - ((x0 + x1) / 2) * unit / W;
    fitted = true;
    lastFit = { W, H, x0, x1 };
  }
  /** The closed outline of a rectangle at height z across the braid (the plane of the particles at one time). */
  const plane = (b, z) => { const xa = xOf(b, 0) - 0.4, xb = xOf(b, b.n - 1) + 0.4; return [[xa, -0.6, z], [xb, -0.6, z], [xb, 0.6, z], [xa, 0.6, z]]; };

  function drawStage() {
    M = model(); fit();
    const st = stage, t = clock.t, done = t >= 1 - 1e-9;
    st.begin();
    M.list.forEach((b, bi) => {
      const zNow = zAt(t), ls = lines(b), ps = positions(b, t * b.L);
      // the plane the particles live in, at the bottom (open braids only: closed ones have their arcs there)
      if (!S.closed) st.line(plane(b, Z0), { color: P.lineHot, width: 1, alpha: 0.9, close: true });
      // world lines: the part already passed is a lit tube up to the exact point of now, the part ahead a faint line
      ls.forEach((pts, s) => {
        const here = [ps[s][0], ps[s][1], zNow];
        const past = pts.filter((p) => p[2] < zNow - 1e-6), ahead = pts.filter((p) => p[2] > zNow + 1e-6);
        past.push(here); ahead.unshift(here);
        if (past.length > 1) st.tube(`past_${bi}_${s}`, past, { r: TUBE, color: P.ink, sides: 10 });
        if (ahead.length > 1) st.line(ahead, { color: P.ink, width: 1.8, alpha: 0.3 });
      });
      if (S.closed) for (let k = 0; k < b.n; k++) {
        const back = b.cols[b.L][k] === b.cols[0][k];
        if (done) st.tube(`arc_${bi}_${k}`, arc(b, k), { r: ARC_TUBE, color: back ? P.cyan : P.magenta, sides: 10 });
        else st.line(arc(b, k), { color: P.dim, width: 1.8, alpha: 0.55 });
      }
    });
    // time axis, the readhead plane, the colors now and at the bottom
    M.list.forEach((b, bi) => {
      const zNow = zAt(t), ps = positions(b, t * b.L), cNow = b.cols[Math.min(b.L, Math.floor(t * b.L + 1e-9))];
      const xa = xOf(b, 0) - 0.4;
      if (bi === 0 && !S.closed) {
        st.arrow([xa - 0.12, 0, Z0], [xa - 0.12, 0, Z1 + 0.18], { color: P.dim, width: 1.2, headSize: 8 });
        st.tag('time', [xa - 0.12, 0, 0], L('时间 ↑', 'time ↑'), 'num', { dx: -24 });
      }
      st.line(plane(b, zNow), { color: P.amber, width: 1.2, alpha: 0.7, close: true, dash: [5, 4] });
      // the strand at slot s is at ps[perm[s]] (between crossings the slots are where the strands stand)
      const j = Math.min(b.L, Math.floor(t * b.L + 1e-9)), perm = b.perm[Math.min(j, b.L)];
      for (let s = 0; s < b.n; s++) {
        const p = ps[perm[s]], w = [p[0], p[1], zNow];
        st.bead(w, { r: BEAD * st.unit / st.lw, color: P.amber, key: `now${bi}${s}` });
        if (!b.L || t * b.L - j < 0.1 || t * b.L - j > 0.9 || done) st.tag(`now${bi}${s}`, w, `<span class="c-am">${cNow[s]}</span>`, 'num big-c', { dy: -15, dx: 12 });
        else st.tag(`now${bi}${s}`, w, '', 'num');
        st.tag(`bot${bi}${s}`, [xOf(b, s), 0, Z0], `${b.cols[0][s]}`, bi === 0 ? 'num big-c pickable' : 'num big-c', { dy: S.closed ? 14 : 22 });
      }
      // above each braid: strands, word, and once closed up and run through, how many colorings come back
      const cnt = S.closed && done ? ` · <span class="${b.count ? 'c-cy' : 'c-mg'}">${L('回得来', 'back')} ${b.count}/${3 ** b.n}</span>` : '';
      st.tag(`w${bi}`, [b.cx + (S.closed ? 0.2 : 0), 0, (S.closed ? Z1 + 0.62 : Z1 + 0.5)], `${b.n}${L(' 股', ' str.')} · ${product(b.word)}${cnt}`, 'num');
    });
    st.end();
    $('stage').classList.toggle('closed', S.closed);
    hud();
  }

  /* ---------- text ---------- */
  function hud() {
    const { A, B } = M, t = clock.t, k = Math.min(A.L, Math.floor(t * A.L + 1e-9));
    // the rail counts the crossings of the longer braid
    const Lm = Math.max(A.L, B ? B.L : 0), km = Math.min(Lm, Math.floor(t * Lm + 1e-9));
    $('hudBig').textContent = `${product(A.word)}${B ? ` · ${product(B.word)}` : ''} · ${Lm ? L(`第 ${km}/${Lm} 个交叉`, `crossing ${km}/${Lm}`) : L('没有交叉', 'no crossing')}`;
    const top = A.cols[A.L];
    let sub;
    if (S.closed) sub = t < 1 - 1e-9 ? L('颜色往上传；到顶端后顺着右边的弧接回底端', 'the colors ride up; at the top the arcs on the right lead back to the bottom')
      : B ? L(`回得来的着色：左 ${A.count}，右 ${B.count}`, `colorings that come back: left ${A.count}, right ${B.count}`)
        : L(`顶端 ${tuple(top)}，底端 ${tuple(A.cols[0])}：${top.every((x, i) => x === A.cols[0][i]) ? '对上了' : '对不上'}；回得来的着色 ${A.count} / ${3 ** A.n}`, `top ${tuple(top)}, bottom ${tuple(A.cols[0])}: ${top.every((x, i) => x === A.cols[0][i]) ? 'they match' : 'they clash'}; ${A.count} / ${3 ** A.n} colorings come back`);
    else sub = B ? L(`顶端：左 ${tuple(top)}，右 ${tuple(B.cols[B.L])}`, `at the top: left ${tuple(top)}, right ${tuple(B.cols[B.L])}`)
      : L(`颜色 ${tuple(A.cols[0])} 往上传，此刻 ${tuple(A.cols[k])}`, `the colors ${tuple(A.cols[0])} ride up; now ${tuple(A.cols[k])}`);
    $('hudSub').innerHTML = sub;
  }
  function drawText() {
    const { A, B } = M, t = clock.t, k = Math.min(A.L, Math.floor(t * A.L + 1e-9)), top = A.cols[A.L];
    if (S.closed) {
      $('dtKey').textContent = L('回得来的着色（闭合着色数）', 'colorings that come back (closed colorings)');
      $('roKey').textContent = B ? `${A.count} · ${B.count}` : `${A.count} / ${3 ** A.n}`;
      $('roKeySub').textContent = B ? L(`左 ${A.count} / ${3 ** A.n}，右 ${B.count} / ${3 ** B.n}`, `left ${A.count} / ${3 ** A.n}, right ${B.count} / ${3 ** B.n}`) : L(`全部 ${3 ** A.n} 个着色中`, `out of all ${3 ** A.n} colorings`);
    } else {
      $('dtKey').textContent = L('顶端的颜色', 'colors at the top');
      $('roKey').textContent = B ? `${tuple(top)} · ${tuple(B.cols[B.L])}` : tuple(top);
      $('roKeySub').textContent = B ? (top.join() === B.cols[B.L].join() ? L('左右相同', 'left and right agree') : L('左右不同', 'left and right differ')) : (top.join() === A.cols[0].join() ? L('与底端相同', 'same as at the bottom') : L('与底端不同', 'not as at the bottom'));
    }
    $('roWord').textContent = B ? `${product(A.word)} · ${product(B.word)}` : product(A.word);
    $('roBottom').textContent = B ? `${tuple(A.cols[0])} · ${tuple(B.cols[0])}` : tuple(A.cols[0]);
    $('roNow').textContent = tuple(A.cols[k]);
    const turn = (b) => b.word.reduce((a, g) => a + Math.sign(g), 0) * 180;
    $('roTurn').textContent = A.n === 2 ? (B && B.n === 2 ? `${kit.sgn(turn(A), 0)}° · ${kit.sgn(turn(B), 0)}°` : `${kit.sgn(turn(A), 0)}°`) : '—';
    $('roRule').textContent = L(RULES[S.rule].zh, RULES[S.rule].en);
    $('roNote').textContent = S.rule === 'shift' ? L('这个架不幂等：x ⋆ x = x + 1，添一股的那个小圈会改颜色。', 'This rack is not idempotent: x ⋆ x = x + 1, and the little loop of an added strand changes colors.')
      : S.closed ? L('闭合着色就是沿编织传一遍、原样回来的着色。', 'A closed coloring is one that comes back after one trip along the braid.')
        : L('前面那股带着原色走，后面那股被它改色。', 'The strand in front keeps its color; the one behind is recolored by it.');
    $('pillWord').querySelector('strong').textContent = product(A.word);
    $('pillCount').querySelector('strong').textContent = `${A.count}/${3 ** A.n}`;
    syncGens();
  }
  /** Generators that need more strands than there are cannot be pressed. */
  const syncGens = () => document.querySelectorAll('#genBtns [data-gen]').forEach((b) => { b.disabled = Math.abs(+b.dataset.gen) > S.n - 1; });

  const paint = kit.painter(() => { drawStage(); drawText(); }, [$('stage')]);

  /* ---------- controls ---------- */
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 1, rate: 0.5, step: 0.5,
    format: (t) => { const n = Math.max(S.word.length, S.B ? S.B.word.length : 0), k = Math.min(n, Math.floor(t * n + 1e-9)); return n ? L(`第 ${k} 个交叉 <small>/ ${n}</small>`, `crossing ${k} <small>/ ${n}</small>`) : L('没有交叉', 'no crossing'); },
    onChange: () => paint()
  });
  /** Rail pace: one crossing about every 0.9 s; arrow keys step one crossing. */
  function pace() { const n = Math.max(1, S.word.length, S.B ? S.B.word.length : 0); clock.rate = 1 / (0.9 * n); clock.step = 1 / n; }
  function edited(keepB) { cards.mark(null); if (!keepB) S.B = null; pace(); clock.pause(); clock.set(1); paint(); }
  function recolor(k) { S.colors = S.colors.slice(); S.colors[k] = (S.colors[k] + 1) % 3; edited(true); }
  const nChips = kit.chips($('nChips'), 'n', (v) => { S.n = +v; S.word = []; S.colors = [0, 1, 2].slice(0, S.n); syncGens(); edited(false); });
  $('genBtns').addEventListener('click', (ev) => {
    const b = ev.target.closest('[data-gen]'); if (!b || b.disabled) return;
    const g = +b.dataset.gen; if (Math.abs(g) > S.n - 1) return;
    S.word = S.word.concat([g]); cards.mark(null); S.B = null; pace(); clock.pause(); clock.set((S.word.length - 1) / S.word.length); clock.play();
  });
  $('undo').addEventListener('click', () => { S.word = S.word.slice(0, -1); edited(false); });
  $('clearW').addEventListener('click', () => { S.word = []; edited(false); });
  const closeChips = kit.chips($('closeChips'), 'closed', (v) => { S.closed = v === 'closed'; edited(true); });
  const qChips = kit.chips($('qChips'), 'q', (v) => { S.rule = v; edited(true); });
  const viewChips = kit.chips($('viewChips'), 'view', (v) => { S.view = v; stage.view(VIEWS[v]); });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({ f: () => viewChips.set(S.view === 'front' ? 'tilt' : 'front') });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    over: { n: 2, word: [1], colors: [0, 1], closed: false, rule: 'dihedral', view: 'tilt' },
    inverse: { n: 2, word: [1, -1], colors: [0, 1], B: { n: 2, word: [] }, closed: false, rule: 'dihedral', view: 'tilt' },
    twice: { n: 2, word: [1, 1], colors: [0, 1], B: { n: 2, word: [] }, closed: false, rule: 'dihedral', view: 'tilt' },
    yb: { n: 3, word: [1, 2, 1], colors: [0, 1, 2], B: { n: 3, word: [2, 1, 2] }, closed: false, rule: 'dihedral', view: 'tilt' },
    close: { n: 2, word: [1], colors: [0, 1], closed: true, rule: 'dihedral', view: 'front' },
    stabilize: { n: 2, word: [1, 1, 1], colors: [0, 1], B: { n: 3, word: [2, 1, 1, 1] }, closed: true, rule: 'dihedral', view: 'front' },
    trefoil: { n: 2, word: [1], colors: [0, 1], B: { n: 2, word: [1, 1, 1] }, closed: true, rule: 'dihedral', view: 'front' },
    rack: { n: 1, word: [], colors: [0], B: { n: 2, word: [1] }, closed: true, rule: 'shift', view: 'front' }
  };
  const NOTES = {
    over: ['两颗粒子绕中点转半圈换了位置：左边那股从前面过（离你近），右边那股从后面过。前面那股带着颜色 0 走到右边；后面那股被它改色，1 变成 0 ⋆ 1 = 2。', 'Two particles swap places by half a turn about their midpoint: the left strand passes in front (nearer to you), the right one behind. The front strand carries its color 0 to the right; the one behind is recolored by it, 1 becoming 0 ⋆ 1 = 2.'],
    inverse: ['左边：先交换一次，再反着交换一次（这回右边那股从前面过），两股回到原位，颜色 (0, 1) 原样回到顶端。右边是不交换的直线，顶端也是 (0, 1)。', 'Left: one exchange, then the opposite one (this time the right strand passes in front); both strands are back in place and the colors (0, 1) reach the top as they were. On the right, two straight strands with no exchange, also (0, 1) at the top.'],
    twice: ['左边：同一个方向交换两次，两条世界线互相绕了整整一圈，每颗粒子都回到原位，颜色却从 (0, 1) 变成 (1, 2)。右边是不交换的直线，顶端仍是 (0, 1)。', 'Left: two exchanges the same way, and the two world lines wind a full turn around each other; each particle is back where it started, yet the colors have gone from (0, 1) to (1, 2). On the right, two straight strands with no exchange, still (0, 1) at the top.'],
    yb: ['三股，颜色 (0, 1, 2)。左边按 σ₁、σ₂、σ₁ 交换，右边按 σ₂、σ₁、σ₂：世界线的走法不一样，到顶端都是 (0, 2, 0)。', 'Three strands with colors (0, 1, 2). The left one exchanges in the order σ₁, σ₂, σ₁, the right one σ₂, σ₁, σ₂: the world lines run differently, and both reach the top as (0, 2, 0).'],
    close: ['一次交换，再把每个顶端顺着右边的弧接回同一位置的底端。颜色 (0, 1) 到顶端成了 (2, 0)，两条弧都对不上（品红）。九个着色里只有 (0, 0)、(1, 1)、(2, 2) 回得来。', 'One exchange, then each top end is led back along an arc on the right to the bottom end in the same place. The colors (0, 1) reach the top as (2, 0), and both arcs clash (magenta). Of the nine colorings only (0, 0), (1, 1) and (2, 2) come back.'],
    stabilize: ['左边：两股的 σ₁³，接回来后颜色 (0, 1) 对得上。右边在最右边添一股，先与原来最后一股交叉一次：新股的颜色只是把末位 1 抄一遍。回得来的着色左边 9 个，右边也是 9 个。', 'Left: σ₁³ on two strands, and closed up the colors (0, 1) match. On the right a strand is added on the far right that first crosses the old last strand once: its color merely copies the last one, 1. Colorings that come back: 9 on the left, and 9 on the right too.'],
    trefoil: ['左边 σ₁，右边 σ₁³，颜色都从 (0, 1) 出发：左边接回来对不上（品红），右边对得上（青色）。回得来的着色左边 3 个，右边 9 个。', 'σ₁ on the left, σ₁³ on the right, both starting from (0, 1): the left one clashes when closed up (magenta), the right one matches (cyan). Colorings that come back: 3 on the left, 9 on the right.'],
    rack: ['颜色规则换成 x ⋆ y = y + 1。左边一股、没有交叉，三个着色都回得来。右边添一股、交叉一次：新股抄来的 0 过交叉变成 0 ⋆ 0 = 1，接回来对不上，九个着色一个也回不来。', 'The color rule is now x ⋆ y = y + 1. On the left, one strand and no crossing: all three colorings come back. On the right a strand is added with one crossing: the copied 0 passes the crossing as 0 ⋆ 0 = 1, the arcs clash, and none of the nine colorings comes back.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    S.n = p.n; S.word = p.word.slice(); S.colors = p.colors.slice(); S.B = p.B ? { n: p.B.n, word: p.B.word.slice() } : null;
    S.closed = p.closed; S.rule = p.rule; S.view = p.view;
    nChips.set(String(p.n), true); closeChips.set(p.closed ? 'closed' : 'open', true); qChips.set(p.rule, true); viewChips.set(p.view, true);
    stage.view(VIEWS[p.view], booting || TRV.still ? 0 : 600);
    pace(); clock.pause(); clock.set(0);
    // a still and the opening view of the full page show the whole braid; in a chapter the card plays when seen
    if (TRV.still || (booting && !TRV.embed)) clock.set(1);
    else if (booting) kit.autoplay(clock, $('stage'));
    else clock.play();
  }
  const cards = kit.cards($('presets'), { notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：在最上面添交叉、换股数、点底部的数字换颜色、首尾接上。随时可以再选一张卡。', 'Free play: add crossings on top, change the number of strands, click the numbers at the bottom to change colors, close the braid. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  const pub = (b) => b && { n: b.n, word: b.word.slice(), bottom: b.cols[0].slice(), top: b.cols[b.L].slice(), cols: b.cols.map((c) => c.slice()), count: b.count };
  window.BRAID_DEBUG = {
    get state() {
      const m = model();
      return { preset: cards.current, t: clock.t, playing: clock.playing, rule: S.rule, closed: S.closed, view: S.view, A: pub(m.A), B: pub(m.B), camera: Object.assign({}, stage.cam) };
    },
    seek: (t) => { clock.pause(); clock.set(t); },
    /** Sampled world lines of the first (0) or second (1) braid: strand → [[x, y, z], …]; and the slot centres. */
    lines: (which) => { const m = model(), b = which ? m.B : m.A; return { pts: lines(b), slots: [...Array(b.n).keys()].map((s) => xOf(b, s)) }; },
    /** Viewport coordinates of the bottom end of slot k of the first braid. */
    bottom: (k) => { const r = cv.getBoundingClientRect(), q = stage.p([xOf(M.A, k), 0, Z0]); return [r.left + q[0], r.top + q[1]]; },
    /** The fitted layout as the stage drew it: its size, scale and centre (CSS pixels), and every strand's two ends on
        screen ([x, y] per strand, bottom and top, both braids). */
    layout: () => {
      const ends = M.list.map((b) => lines(b).map((pts) => [stage.p(pts[0]), stage.p(pts[pts.length - 1])].map((q) => [q[0], q[1]])));
      return { W: cv.clientWidth, H: cv.clientHeight, unit: stage.unit, cx: stage.cx, cy: stage.cy, ends, closed: S.closed };
    }
  };
  window.TRV_THUMB = () => { applyPreset('twice'); cards.mark('twice'); clock.set(1); paint.now(); };
  cards.pick(cards.initial('over'));
  booting = false;
  paint();
})();
