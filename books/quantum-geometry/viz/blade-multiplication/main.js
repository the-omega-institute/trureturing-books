/* BLADE//XOR · 刀片乘法: the multiplication table of basis blades, and one product taken apart.
     cl3     the 8 basis blades of Cl(3,0) as 3-bit masks m (bit 0, 1, 2 = e₁, e₂, e₃). Product mask = left XOR right;
             sign = (−1)^inv with inv(l, r) = Σᵢ [bit i of l]·popcount(r & (2ⁱ − 1)) (chapter 25, `_blade_sign`).
             The right side of the stage joins the factors into one string, moves each right factor left past the
             larger left factors (one swap = one sign flip, drawn as two crossing lines), then cancels each adjacent
             equal pair by eᵢ² = +1.
     pauli   two bits only: bit 0 = X, bit 1 = Z, mask 3 = XZ; the same rule gives D(a, b)·D(c, d) = (−1)^(bc)·D(a ⊕ c, b ⊕ d).
     vector  v = 3e₁ + 4e₂ + 12e₃ squared, the nine terms added one at a time: v² = 169.
   The page checks every cell against 2 × 2 complex matrices (e₁ ↦ X, e₂ ↦ Y, e₃ ↦ Z; or Xᵃ Zᵇ) and squares B(3, 4, 12).
   Colours: cyan = plus (and an equal pair cancelling to +1), magenta = minus (and a swap), amber = the current cell
   and step, violet = the row and column of the volume I₃. Read-only probe for the browser suite: BX_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const MINUS = '−', SUB = ['₁', '₂', '₃'];

  /* ---------- the bit rule ---------- */
  const NAMES = ['1', 'e₁', 'e₂', 'e₁₂', 'e₃', 'e₁₃', 'e₂₃', 'I₃'];
  const PNAMES = ['I', 'X', 'Z', 'XZ'];
  const GRADE = [['标量', 'scalar'], ['向量', 'vector'], ['双矢量', 'bivector'], ['伪标量', 'pseudoscalar']];
  const pop = (m) => (m & 1) + ((m >> 1) & 1) + ((m >> 2) & 1);
  const bitsOf = (m) => [0, 1, 2].filter((i) => (m >> i) & 1);
  function inv(l, r) { let n = 0; for (let i = 0; i < 3; i++) if ((l >> i) & 1) n += pop(r & ((1 << i) - 1)); return n; }
  const signOf = (l, r) => (inv(l, r) % 2 ? -1 : 1);

  /** The rewrite of E_l · E_r: concatenate, sort by adjacent swaps, cancel equal pairs. Each factor keeps an id. */
  function rewrite(l, r) {
    let word = [...bitsOf(l).map((i, k) => ({ i, side: 'L', id: 'L' + k })), ...bitsOf(r).map((i, k) => ({ i, side: 'R', id: 'R' + k }))];
    const start = word.slice(), steps = [];
    let sign = 1;
    for (const f of start.filter((x) => x.side === 'R')) {
      let p = word.indexOf(f);
      while (p > 0 && word[p - 1].i > word[p].i) {
        const w = word.slice(); [w[p - 1], w[p]] = [w[p], w[p - 1]]; word = w; sign = -sign;
        steps.push({ kind: 'swap', at: p - 1, ids: [word[p - 1].id, word[p].id], word, sign });
        p--;
      }
    }
    for (;;) {
      const p = word.findIndex((x, q) => q + 1 < word.length && word[q + 1].i === x.i);
      if (p < 0) break;
      const ids = [word[p].id, word[p + 1].id], i = word[p].i;
      word = word.filter((_, q) => q !== p && q !== p + 1);
      steps.push({ kind: 'cancel', at: p, i, ids, word, sign });
    }
    return { start, steps, sign, mask: word.reduce((m, x) => m | (1 << x.i), 0), swaps: steps.filter((s) => s.kind === 'swap').length, cancels: steps.filter((s) => s.kind === 'cancel').length };
  }

  /* ---------- the page's own matrix check (NUM) ---------- */
  const cm = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const ca = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const mm = (A, B) => [0, 1].map((i) => [0, 1].map((j) => ca(cm(A[i][0], B[0][j]), cm(A[i][1], B[1][j]))));
  const ms = (A, s) => A.map((row) => row.map((z) => [z[0] * s, z[1] * s]));
  const meq = (A, B) => A.every((row, i) => row.every((z, j) => Math.abs(z[0] - B[i][j][0]) < 1e-12 && Math.abs(z[1] - B[i][j][1]) < 1e-12));
  const I2 = [[[1, 0], [0, 0]], [[0, 0], [1, 0]]], SX = [[[0, 0], [1, 0]], [[1, 0], [0, 0]]], SY = [[[0, 0], [0, -1]], [[0, 1], [0, 0]]], SZ = [[[1, 0], [0, 0]], [[0, 0], [-1, 0]]];
  const SIG = [SX, SY, SZ];
  const bladeMat = (m) => bitsOf(m).reduce((A, i) => mm(A, SIG[i]), I2);
  const wordMat = (m) => [SX, SZ].reduce((A, S, i) => ((m >> i) & 1 ? mm(A, S) : A), I2);    // Xᵃ Zᵇ for mask a | 2b
  const CL3_OK = [], PAULI_OK = [];
  for (let l = 0; l < 8; l++) for (let r = 0; r < 8; r++) CL3_OK.push(meq(mm(bladeMat(l), bladeMat(r)), ms(bladeMat(l ^ r), signOf(l, r))));
  for (let l = 0; l < 4; l++) for (let r = 0; r < 4; r++) PAULI_OK.push(meq(mm(wordMat(l), wordMat(r)), ms(wordMat(l ^ r), signOf(l, r))));

  /* ---------- the vector scene: v = 3e₁ + 4e₂ + 12e₃ ---------- */
  const A = [3, 4, 12], VM = [1, 2, 4], BIV = [0, 3, 5, 6];
  const TERMS = [];
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) TERMS.push({ i, j, mask: VM[i] ^ VM[j], coef: A[i] * A[j] * signOf(VM[i], VM[j]) });
  /** The running sums after n terms: per blade, the net coefficient and the positive and negative parts. */
  function sums(n) {
    const out = {}; BIV.forEach((m) => { out[m] = { net: 0, pos: 0, neg: 0 }; });
    TERMS.slice(0, n).forEach((t) => { const o = out[t.mask]; o.net += t.coef; if (t.coef > 0) o.pos += t.coef; else o.neg -= t.coef; });
    return out;
  }
  const BMAT = ((a) => [[[a[2], 0], [a[0], -a[1]]], [[a[0], a[1]], [-a[2], 0]]])(A);    // B(a) of B_formula_core
  const BSQ = mm(BMAT, BMAT);

  /* ---------- state ---------- */
  const S = { scene: 'cl3', l: 2, r: 1, hl: null, hover: null };
  let R = null, geo = {};
  const derive = () => { if (!R || R.l !== S.l || R.r !== S.r) R = Object.assign(rewrite(S.l, S.r), { l: S.l, r: S.r }); return R; };
  const isPair = () => S.scene !== 'vector';
  const N = () => (S.scene === 'pauli' ? 4 : 8);
  const nm = (m) => (S.scene === 'pauli' ? PNAMES[m] : NAMES[m]);
  const fac = (i) => (S.scene === 'pauli' ? ['X', 'Z'][i] : 'e' + SUB[i]);
  const signed = (s, m) => (s < 0 ? MINUS : '+') + nm(m);
  const bin = (m) => (S.scene === 'pauli' ? [1, 0] : [2, 1, 0]).map((i) => (m >> i) & 1).join('') + '₂';
  const K = () => (isPair() ? derive().steps.length : TERMS.length);
  const step = () => Math.min(K(), Math.floor(clock.t + 1e-9));
  const signCol = (s) => (s > 0 ? P.cyan : s < 0 ? P.magenta : P.dim);
  const fmtInt = (x) => (x < 0 ? MINUS + -x : String(x));
  const fmtSigned = (x) => (x > 0 ? '+' + x : x < 0 ? MINUS + -x : '0');

  /* ---------- canvas text ---------- */
  const face = (f) => (f === 'body' ? TRV.fonts.body : f === 'display' ? TRV.fonts.display : TRV.fonts.data);
  function text(ctx, str, x, y, color, o) {
    o = o || {};
    ctx.font = `${o.weight ? o.weight + ' ' : ''}${o.size || 11}px ${face(o.face)}`; ctx.textAlign = o.align || 'left'; ctx.textBaseline = o.base || 'middle';
    ctx.globalAlpha = o.alpha == null ? 1 : o.alpha;
    if (o.halo) { ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.strokeStyle = P.stage; ctx.strokeText(str, x, y); }
    ctx.fillStyle = color; ctx.fillText(str, x, y); ctx.globalAlpha = 1;
  }
  const rrect = (ctx, x, y, w, h, r) => { ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(x, y, w, h, r); else ctx.rect(x, y, w, h); };
  const glowStroke = (ctx, col, w, fn) => { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.shadowColor = col; ctx.shadowBlur = 10; fn(); ctx.stroke(); ctx.shadowBlur = 0; };

  /* ---------- the table ---------- */
  /** spec: n, row(i), col(j) header labels, cell(i, j) → { txt, sign, alpha }, cur [i, j], words. Returns its geometry. */
  function drawTable(ctx, box, spec) {
    const n = spec.n, side = Math.min(box.w, box.h), c = side / (n + 0.8), hc = c * 0.8;
    const ox = box.x + (box.w - side) / 2, oy = box.y + (box.h - side) / 2, X = (j) => ox + hc + j * c, Y = (i) => oy + hc + i * c;
    const fs = clamp(c / 3.3, 7.5, 14), hs = clamp(c / 3, 8, 15), gap = Math.max(1, c * 0.06), words = spec.words !== false;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      const q = spec.cell(i, j), a = q.alpha == null ? 1 : q.alpha;
      ctx.globalAlpha = a * (q.sign > 0 ? 0.16 : q.sign < 0 ? 0.26 : 0.08); ctx.fillStyle = q.sign ? signCol(q.sign) : P.dim;
      ctx.fillRect(X(j) + gap / 2, Y(i) + gap / 2, c - gap, c - gap); ctx.globalAlpha = 1;
      if (!words) { ctx.globalAlpha = 0.85 * a; ctx.fillStyle = signCol(q.sign); ctx.fillRect(X(j) + c * 0.3, Y(i) + c * 0.44, c * 0.4, c * 0.12); ctx.globalAlpha = 1; continue; }
      text(ctx, q.txt, X(j) + c / 2, Y(i) + c / 2 + 0.5, q.sign ? signCol(q.sign) : P.ink, { align: 'center', size: fs, alpha: a });
    }
    if (spec.diag) for (let i = 0; i < n; i++) { ctx.strokeStyle = P.ink; ctx.globalAlpha = 0.55; ctx.lineWidth = 1; ctx.setLineDash([3, 3]); ctx.strokeRect(X(i) + 2.5, Y(i) + 2.5, c - 5, c - 5); ctx.setLineDash([]); ctx.globalAlpha = 1; }
    if (spec.band != null) {                                            // the row and the column of one blade (violet)
      const b = spec.band; ctx.strokeStyle = P.violet; ctx.lineWidth = 2;
      ctx.strokeRect(X(0) - 1, Y(b) + 1, n * c + 2, c - 2); ctx.strokeRect(X(b) + 1, Y(0) - 1, c - 2, n * c + 2);
    }
    if (words) for (let k = 0; k < n; k++) {
      const hot = spec.cur && spec.cur[0] === k, hotC = spec.cur && spec.cur[1] === k;
      text(ctx, spec.row(k), ox + hc - 7, Y(k) + c / 2, hot ? P.amber : P.dim, { align: 'right', size: hs, weight: hot ? 600 : 0 });
      text(ctx, spec.col(k), X(k) + c / 2, oy + hc - 8, hotC ? P.amber : P.dim, { align: 'center', base: 'bottom', size: hs, weight: hotC ? 600 : 0 });
    }
    if (words && spec.corner) text(ctx, spec.corner, ox + hc - 7, oy + hc - 8, P.faint, { align: 'right', base: 'bottom', size: clamp(c / 4.2, 7.5, 10.5), face: 'body' });
    ctx.strokeStyle = P.lineHot; ctx.lineWidth = 1; ctx.globalAlpha = 0.9; ctx.strokeRect(X(0) + 0.5, Y(0) + 0.5, n * c, n * c); ctx.globalAlpha = 1;
    if (spec.cur) { const [i, j] = spec.cur; glowStroke(ctx, P.amber, 2.2, () => ctx.strokeRect(X(j) + 1, Y(i) + 1, c - 2, c - 2)); }
    if (spec.hover && (!spec.cur || spec.hover.join() !== spec.cur.join())) { const [i, j] = spec.hover; ctx.strokeStyle = P.ink; ctx.globalAlpha = 0.6; ctx.lineWidth = 1; ctx.strokeRect(X(j) + 1.5, Y(i) + 1.5, c - 3, c - 3); ctx.globalAlpha = 1; }
    return { X, Y, c, n, ox: X(0), oy: Y(0) };
  }

  /* ---------- the rewrite of one product ---------- */
  function drawRewrite(ctx, pb, t, words) {
    const D = derive(), KK = D.steps.length, k = Math.min(KK, Math.floor(t + 1e-9)), f = k < KK ? clamp(t - k, 0, 1) : 0, e = TRV.smooth(f);
    const nb = S.scene === 'pauli' ? 2 : 3, labW = words ? 34 : 10, annW = words ? (pb.w >= 330 ? 104 : 70) : 10;
    // the bits: left, right, and their XOR
    const tight = words && pb.h < 240, bitsH = tight ? 0 : words ? clamp(pb.h * 0.25, 54, 84) : clamp(pb.h * 0.22, 40, 70), brow = bitsH / 4, q = Math.min(brow * 0.72, 16);
    const bx0 = pb.x + labW + 12, bpitch = q * 1.9;
    if (words && !tight) for (let i = 0; i < nb; i++) text(ctx, fac(i), bx0 + i * bpitch + q / 2, pb.y + brow * 0.5, P.dim, { align: 'center', size: 11 });
    const brows = [[S.l, nm(S.l)], [S.r, nm(S.r)], [S.l ^ S.r, '⊕']];
    if (!tight) brows.forEach(([m, lab], rI) => {
      const y = pb.y + brow * (rI + 1.5);
      if (words) text(ctx, lab, bx0 - 10, y, rI === 2 ? P.ink : P.dim, { align: 'right', size: 11.5 });
      for (let i = 0; i < nb; i++) {
        const x = bx0 + i * bpitch, on = (m >> i) & 1, both = rI === 2 && ((S.l >> i) & 1) && ((S.r >> i) & 1);
        ctx.strokeStyle = P.lineHot; ctx.lineWidth = 1; ctx.strokeRect(x + 0.5, y - q / 2 + 0.5, q, q);
        if (on) { ctx.fillStyle = rI === 2 ? P.ink : TRV.alpha(P.ink, 0.62); ctx.fillRect(x + 2, y - q / 2 + 2, q - 3, q - 3); }
        if (both) { ctx.strokeStyle = P.cyan; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(x + 3, y - q / 2 + 3); ctx.lineTo(x + q - 2, y + q / 2 - 2); ctx.moveTo(x + q - 2, y - q / 2 + 3); ctx.lineTo(x + 3, y + q / 2 - 2); ctx.stroke(); }
      }
      if (rI === 2) { ctx.strokeStyle = P.lineHot; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(bx0 - 4, y - brow / 2); ctx.lineTo(bx0 + nb * bpitch, y - brow / 2); ctx.stroke(); }
      if (words) text(ctx, `m = ${m} · ${bin(m)}`, bx0 + nb * bpitch + 8, y, rI === 2 ? P.ink : P.dim, { size: 11 });
    });
    // the word rows: row 0 is the concatenation, row j the string after step j, then the result
    const rows = KK + 2, availH = pb.h - bitsH - 14, y0 = pb.y + bitsH + 14;
    let rowH = Math.min(58, availH / rows), first = 0;
    if (words && rowH < 26) { rowH = 26; const cap = Math.max(2, Math.floor(availH / rowH)); first = clamp(Math.ceil(t - 1e-9) + 2 - cap, 0, rows - cap); }   // too little room: a window that follows the step
    const len = Math.max(1, D.start.length), cw = Math.min(50, (pb.w - labW - annW - 8) / (len * 1.18)), ch = Math.min(rowH * 0.7, 32), pitch = Math.min(cw, ch * 1.7) * 1.18;
    const cwr = pitch / 1.18, x0 = pb.x + labW + 8, sx = (p) => x0 + p * pitch + cwr / 2, yRow = (j) => y0 + (j - first) * rowH + rowH / 2;
    geo.rows = { y0, rowH, first, K: KK, left: pb.x, right: pb.x + pb.w };
    ctx.save(); ctx.beginPath(); ctx.rect(pb.x - 4, y0 - 2, pb.w + 8, pb.y + pb.h - y0 + 6); ctx.clip();
    const chip = (x, y, fct, col, a) => {
      ctx.globalAlpha = a; rrect(ctx, x - cwr / 2, y - ch / 2, cwr, ch, 4);
      ctx.fillStyle = TRV.alpha(P.ink, fct.side === 'L' ? 0.14 : 0.04); ctx.fill();
      ctx.strokeStyle = col; ctx.lineWidth = col === P.amber ? 1.8 : 1.2; ctx.setLineDash(fct.side === 'R' ? [3, 2.5] : []); ctx.stroke(); ctx.setLineDash([]);
      if (words) text(ctx, fac(fct.i), x, y + 0.5, col === P.amber ? P.amber : P.ink, { align: 'center', size: clamp(ch * 0.55, 9, 14), alpha: a });
      ctx.globalAlpha = 1;
    };
    const wordAt = (j) => (j ? D.steps[j - 1].word : D.start);
    const signAt = (j) => (j ? D.steps[j - 1].sign : 1);
    const last = f > 0 ? k + 1 : k;   // the row being drawn in (amber)
    for (let j = first; j <= Math.min(KK, last); j++) {
      const a = j === k + 1 ? e : 1, y = yRow(j), w = wordAt(j), st = j ? D.steps[j - 1] : null, hot = j === last && j > 0;
      if (st) {                        // connectors from the row above
        const prev = wordAt(j - 1), yA = yRow(j - 1) + ch / 2, yB = y - ch / 2;
        prev.forEach((fct, p) => {
          const moved = st.ids.includes(fct.id), np = w.findIndex((x) => x.id === fct.id);
          const col = moved ? (st.kind === 'swap' ? P.magenta : P.cyan) : P.dim;
          ctx.strokeStyle = hot && moved ? P.amber : col; ctx.globalAlpha = moved ? 0.95 : 0.35; ctx.lineWidth = moved ? 2 : 1;
          const xa = sx(p), xb = np >= 0 ? sx(np) : sx(st.at) + pitch / 2, yb = np >= 0 ? yB : yA + (yB - yA) * 0.55;
          ctx.beginPath(); ctx.moveTo(xa, yA); ctx.lineTo(xa + (xb - xa) * a, yA + (yb - yA) * a); ctx.stroke(); ctx.globalAlpha = 1;
        });
        if (st.kind === 'swap' && a > 0.4) {                             // the crossing point of the two lines
          const xm = (sx(st.at) + sx(st.at + 1)) / 2, ym = (yA + yB) / 2;
          ctx.fillStyle = P.magenta; ctx.globalAlpha = a; ctx.beginPath(); ctx.arc(xm, ym, 3, 0, kit.TAU); ctx.fill(); ctx.globalAlpha = 1;
        }
        if (st.kind === 'cancel') {                                      // the pair meets in a +1
          const xm = sx(st.at) + pitch / 2, ym = yRow(j - 1) + ch / 2 + (rowH - ch) * 0.55;
          ctx.strokeStyle = P.cyan; ctx.globalAlpha = a; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.arc(xm, ym, 5.5, 0, kit.TAU); ctx.stroke(); ctx.globalAlpha = 1;
          if (words) text(ctx, '1', xm, ym + 0.5, P.cyan, { align: 'center', size: 8.5, alpha: a });
        }
        if (words) {
          const lab = st.kind === 'swap' ? '×(−1)' : `${fac(st.i)}${fac(st.i)} = +1`;
          text(ctx, lab, pb.x + pb.w - annW + 6, y, hot ? P.amber : st.kind === 'swap' ? P.magenta : P.cyan, { size: 11.5, alpha: a, weight: hot ? 600 : 0 });
        }
      } else if (words && D.start.length) {
        text(ctx, L('拼接', 'joined'), pb.x + pb.w - annW + 6, y, P.dim, { size: 11, face: 'body' });
        const split = bitsOf(S.l).length;                               // the seam between the two factors
        if (split && split < D.start.length) { const xs = x0 + split * pitch - pitch * 0.09; ctx.strokeStyle = P.dim; ctx.lineWidth = 1; ctx.setLineDash([2, 3]); ctx.beginPath(); ctx.moveTo(xs, y - ch / 2 - 3); ctx.lineTo(xs, y + ch / 2 + 3); ctx.stroke(); ctx.setLineDash([]); }
      }
      w.forEach((fct, p) => chip(sx(p), y, fct, hot && st.ids.includes(fct.id) ? P.amber : P.ink, a));
      if (!w.length && words) text(ctx, '1', sx(0), y, P.ink, { align: 'center', size: 13, alpha: a });
      if (words) { const s = signAt(j); text(ctx, s > 0 ? '+' : MINUS, pb.x + labW - 4, y, signCol(s), { align: 'right', size: 15, weight: 600, alpha: a }); }
    }
    if (k === KK && !f) {             // the result
      const y = yRow(KK + 1), s = D.sign;
      if (words) text(ctx, `= ${signed(s, D.mask)}`, x0, y, P.amber, { size: clamp(rowH * 0.5, 13, 20), weight: 600 });
      else { ctx.fillStyle = signCol(s); ctx.fillRect(x0, y - 4, Math.max(cwr, 30), 8); }
      glowStroke(ctx, P.amber, 1.5, () => { ctx.beginPath(); ctx.rect(x0 - 8, yRow(KK) - rowH / 2 + 2, Math.max(1, wordAt(KK).length) * pitch + 10, rowH - 4); });
    }
    ctx.restore();
  }

  /* ---------- the vector scene ---------- */
  function drawBars(ctx, pb, n, words) {
    const sm = sums(n), rows = BIV, labW = words ? 44 : 8, rowH = Math.min(52, (pb.h - 70) / rows.length), bw = pb.w - labW - (words ? 56 : 10), y0 = pb.y + 16;
    const X = (v) => pb.x + labW + v / 169 * bw;
    if (words) text(ctx, L('v · v 至此：每块刀片的系数', 'v · v so far: the coefficient of each blade'), pb.x, pb.y + 2, P.dim, { size: 11, face: 'body' });
    rows.forEach((m, r) => {
      const o = sm[m], y = y0 + r * rowH + rowH / 2, h = Math.min(12, rowH * 0.28);
      if (words) text(ctx, NAMES[m], pb.x + labW - 10, y, P.ink, { align: 'right', size: 12.5 });
      ctx.strokeStyle = P.lineHot; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(X(0), y - rowH * 0.42); ctx.lineTo(X(0), y + rowH * 0.42); ctx.stroke();
      if (o.pos) { ctx.fillStyle = TRV.alpha(P.cyan, 0.8); ctx.fillRect(X(0), y - h - 1, X(o.pos) - X(0), h); }
      if (o.neg) { ctx.fillStyle = TRV.alpha(P.magenta, 0.85); ctx.fillRect(X(0), y + 1, X(o.neg) - X(0), h); }
      const cur = n > 0 && TERMS[n - 1].mask === m;
      if (cur) glowStroke(ctx, P.amber, 1.4, () => { ctx.beginPath(); ctx.rect(X(0) - 3, y - h - 4, Math.max(X(o.pos), X(o.neg)) - X(0) + 6, 2 * h + 8); });
      if (words) text(ctx, fmtSigned(o.net), Math.max(X(o.pos), X(o.neg)) + 10, y, o.net ? P.ink : P.dim, { size: 12, weight: m === 0 ? 600 : 0 });
    });
    if (words) {
      const y = y0 + rows.length * rowH + 22, sc = sm[0].net;
      const parts = TERMS.slice(0, n).filter((t) => t.mask === 0).map((t) => t.coef);
      const str = n === TERMS.length ? `v² = ${parts.join(' + ')} = ${sc} = 13²` : `v² ${L('至此', 'so far')}: ${parts.length ? parts.join(' + ') : '0'}${BIV.slice(1).some((m) => sm[m].net) ? L(' + 双矢量项', ' + bivector terms') : ''}`;
      text(ctx, str, pb.x, y, n === TERMS.length ? P.amber : P.ink, { size: clamp(pb.w / 26, 11.5, 17), weight: n === TERMS.length ? 600 : 0 });
    }
  }

  /* ---------- the stage ---------- */
  function tableSpec(words) {
    if (S.scene === 'vector') {
      const n = step(), lab = (i) => `${A[i]}${'e' + SUB[i]}`;
      return { n: 3, row: lab, col: lab, words, corner: L('左 \\ 右', 'L \\ R'),
        cell: (i, j) => { const k = i * 3 + j, t = TERMS[k]; return { txt: `${fmtSigned(t.coef)}${t.mask ? NAMES[t.mask] : ''}`, sign: Math.sign(t.coef), alpha: k < n ? 1 : 0.3 }; },
        cur: n > 0 ? [TERMS[n - 1].i, TERMS[n - 1].j] : null, hover: S.hover };
    }
    return { n: N(), row: nm, col: nm, words, corner: L('左 \\ 右', 'L \\ R'), cur: [S.l, S.r], hover: S.hover,
      diag: S.hl === 'diag', band: S.hl === 'pseudo' ? 7 : null,
      cell: (i, j) => { const s = signOf(i, j), m = i ^ j; return { txt: (s < 0 ? MINUS : '') + nm(m), sign: s }; } };
  }
  function drawStage() {
    const g = kit.plot($('cv'), { x: [0, 1], y: [0, 1], pad: [0, 0, 0, 0] }), ctx = g.ctx, W = g.W, H = g.H;
    geo = {};
    if (TRV.thumbMode) {   // the cover is wordless: the sign pattern of the 8 × 8 table beside the crossings of I₃ · I₃
      const glow = ctx.createRadialGradient(W * 0.3, H * 0.5, 0, W * 0.3, H * 0.5, W * 0.55);
      glow.addColorStop(0, TRV.alpha(P.cyan, 0.08)); glow.addColorStop(1, TRV.alpha(P.cyan, 0)); ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);
      geo.table = drawTable(ctx, { x: W * 0.04, y: H * 0.06, w: W * 0.5, h: H * 0.88 }, tableSpec(false));
      drawRewrite(ctx, { x: W * 0.58, y: H * 0.1, w: W * 0.38, h: H * 0.8 }, K(), false);
      return;
    }
    const st = $('stage').getBoundingClientRect(), below = (el) => (el ? el.getBoundingClientRect().bottom - st.top : 0);
    const top = Math.max(46, below($('hudBig').parentElement), below($('sceneChips'))) + 10, bottom = Math.max(18, $('legend').offsetHeight + 20);
    const bx = { x: 18, y: top, w: W - 36, h: Math.max(80, H - top - bottom) };
    const wide = bx.w >= 540 && bx.w >= bx.h * 0.9;
    let tb, pb;
    if (wide) { const side = Math.min(bx.h, bx.w * 0.54); tb = { x: bx.x, y: bx.y, w: side, h: bx.h }; pb = { x: bx.x + side + 26, y: bx.y + 4, w: bx.w - side - 26, h: bx.h - 8 }; }
    else { const side = Math.min(bx.w, bx.h * 0.6); tb = { x: bx.x, y: bx.y, w: bx.w, h: side }; pb = { x: bx.x, y: bx.y + side + 12, w: bx.w, h: bx.h - side - 12 }; }
    geo.table = drawTable(ctx, tb, tableSpec(true));
    if (isPair()) drawRewrite(ctx, pb, clock.t, true); else drawBars(ctx, pb, step(), true);
  }

  /* ---------- words: HUD, legend, readouts, pills ---------- */
  const LEGEND = {
    pair: [['cy box', '正号 · 同号一对抵成 +1', 'plus · an equal pair cancels to +1'], ['mg box', '负号 · 交换一次（两线交叉）', 'minus · one swap (two lines cross)'], ['am', '当前一格、当前一步', 'the current cell and step']],
    vector: [['cy box', '正的项', 'positive terms'], ['mg box', '负的项', 'negative terms'], ['am', '刚加进来的一项', 'the term just added']]
  };
  const setLabel = (id, zh, en) => { const h = `<span class="zh">${zh}</span><span class="en">${en}</span>`; if ($(id)._h !== h) { $(id).innerHTML = h; $(id)._h = h; } };
  function drawText() {
    let big, hud, note;
    if (isPair()) {
      const D = derive(), KK = D.steps.length, k = step(), s = D.sign, pl = S.scene === 'pauli';
      const ok = (pl ? PAULI_OK : CL3_OK).every(Boolean), done = KK ? D.steps[Math.max(0, k - 1)] : null;
      big = `${nm(S.l)} · ${nm(S.r)} = ${signed(s, D.mask)}`;
      const swapsSoFar = D.steps.slice(0, k).filter((x) => x.kind === 'swap').length;
      hud = !KK ? L('已经排好，不用交换，也没有可抵的同号对', 'already in order: no swap and no equal pair to cancel')
        : k < KK ? L(`第 ${k} 步，共 ${KK} 步 · 已交换 ${swapsSoFar} 次，符号 ${done && k ? (done.sign > 0 ? '+' : MINUS) : '+'}`, `step ${k} of ${KK} · ${swapsSoFar} swap${swapsSoFar === 1 ? '' : 's'} so far, sign ${done && k ? (done.sign > 0 ? '+' : MINUS) : '+'}`)
          : L(`交换 ${D.swaps} 次（${D.swaps % 2 ? '奇' : '偶'}），抵掉 ${D.cancels} 对 · 掩码 ${bin(S.l)} ⊕ ${bin(S.r)} = ${bin(D.mask)}`, `${D.swaps} swap${D.swaps === 1 ? '' : 's'} (${D.swaps % 2 ? 'odd' : 'even'}), ${D.cancels} pair${D.cancels === 1 ? '' : 's'} cancelled · masks ${bin(S.l)} ⊕ ${bin(S.r)} = ${bin(D.mask)}`);
      note = S.hl === 'pseudo' ? L('紫色框住的 I₃ 那一行与那一列逐格相同：I₃ 与每块刀片对易。', 'The violet row and column of I₃ agree cell by cell: I₃ commutes with every blade.')
        : S.hl === 'diag' ? L('对角线是每块刀片自乘：1、e₁、e₂、e₃ 得 +1，e₁₂、e₁₃、e₂₃、I₃ 得 −1。', 'The diagonal holds the squares: 1, e₁, e₂, e₃ give +1; e₁₂, e₁₃, e₂₃, I₃ give −1.')
          : pl ? L(`负号恰在左因子含 Z、右因子含 X 的格里：这里 z左·x右 = ${(S.l >> 1) & 1}·${S.r & 1}。`, `Minus signs sit exactly where the left factor contains Z and the right one X: here z_left·x_right = ${(S.l >> 1) & 1}·${S.r & 1}.`)
            : L(`交换 ${D.swaps} 次，所以符号是 ${s > 0 ? '+' : MINUS}；同时出现在两边的 ${D.cancels} 个方向抵掉，剩下的就是异或。`, `${D.swaps} swap${D.swaps === 1 ? '' : 's'}, so the sign is ${s > 0 ? '+' : MINUS}; the ${D.cancels} direction${D.cancels === 1 ? '' : 's'} on both sides cancel and what is left is the XOR.`);
      setLabel('roKeyLabel', '乘积', 'Product');
      $('roKey').innerHTML = `${nm(S.l)} · ${nm(S.r)} = <span class="${s > 0 ? 'c-cy' : 'c-mg'}">${signed(s, D.mask)}</span>`;
      $('roKeySub').innerHTML = `${L(pl ? '与 XᵃZᵇ 矩阵相乘一致' : '与泡利矩阵相乘一致', pl ? 'agrees with multiplying XᵃZᵇ' : 'agrees with multiplying Pauli matrices')} <span class="nummark">${ok ? '✓' : '✗'}</span>`;
      setLabel('ro1Label', '掩码异或', 'XOR of the masks'); $('ro1').textContent = `${bin(S.l)} ⊕ ${bin(S.r)} = ${bin(D.mask)}`;
      setLabel('ro2Label', '要交换几次（inv）', 'Swaps needed (inv)'); $('ro2').innerHTML = `${D.swaps} → <span class="${s > 0 ? 'c-cy' : 'c-mg'}">${s > 0 ? '+' : MINUS}</span>`;
      setLabel('ro3Label', '抵掉的同号对', 'Equal pairs cancelled'); $('ro3').textContent = String(D.cancels);
      if (pl) { setLabel('ro4Label', '合成律 D(a, b)·D(c, d) = (−1)^(bc)·D(a ⊕ c, b ⊕ d)', 'Composition D(a, b)·D(c, d) = (−1)^(bc)·D(a ⊕ c, b ⊕ d)'); $('ro4').textContent = `D(${S.l & 1}, ${(S.l >> 1) & 1})·D(${S.r & 1}, ${(S.r >> 1) & 1}) = (${MINUS}1)^(${(S.l >> 1) & 1}·${S.r & 1})·D(${D.mask & 1}, ${(D.mask >> 1) & 1})`; }
      else { setLabel('ro4Label', '乘积的阶', 'Grade of the product'); const gr = pop(D.mask); $('ro4').textContent = `${gr} · ${L(GRADE[gr][0], GRADE[gr][1])}`; }
      $('roAside').textContent = pl ? 'X⁰ Z⁰ … X¹ Z¹' : 'Cl(3,0)';
      $('pillProd').querySelector('strong').innerHTML = `<span class="${s > 0 ? 'c-cy' : 'c-mg'}">${signed(s, D.mask)}</span>`;
      $('pillSwaps').querySelector('strong').textContent = String(D.swaps);
    } else {
      const n = step(), sm = sums(n), sc = sm[0].net, biv = BIV.slice(1).map((m) => sm[m]), bsqOk = meq(BSQ, ms(I2, 169));
      big = 'v = 3e₁ + 4e₂ + 12e₃ · v · v';
      hud = n < TERMS.length ? L(`已加 ${n} / 9 项 · 标量 ${sc} · 双矢量 ${biv.map((o) => fmtSigned(o.net)).join('、')}`, `${n} of 9 terms added · scalar ${sc} · bivectors ${biv.map((o) => fmtSigned(o.net)).join(', ')}`)
        : L('九项加完：交叉项全部抵消，v² = 169 = 13²', 'all nine terms added: the cross terms all cancel, v² = 169 = 13²');
      note = L('交叉项 eᵢeⱼ 与 eⱼeᵢ 一正一负：青色与品红的条一样长，净值为 0。', 'The cross terms eᵢeⱼ and eⱼeᵢ have opposite signs: the cyan and magenta bars are equally long and the net is 0.');
      setLabel('roKeyLabel', 'v · v 至此', 'v · v so far');
      $('roKey').innerHTML = `${sc}${biv.some((o) => o.net) ? ' + …' : ''}`;
      $('roKeySub').innerHTML = n === TERMS.length ? ` = 13² <span class="nummark">✓</span>` : '';
      setLabel('ro1Label', '标量部分（对角三项）', 'Scalar part (the three diagonal terms)'); $('ro1').textContent = `${TERMS.slice(0, n).filter((t) => !t.mask).map((t) => t.coef).join(' + ') || '0'} = ${sc}`;
      setLabel('ro2Label', '双矢量部分 e₁₂、e₁₃、e₂₃', 'Bivector part e₁₂, e₁₃, e₂₃'); $('ro2').textContent = biv.map((o) => `${o.pos ? '+' + o.pos : ''}${o.neg ? ' ' + MINUS + ' ' + o.neg : ''}${o.pos || o.neg ? ' = ' : ''}${fmtInt(o.net)}`).join(' · ');
      setLabel('ro3Label', '已加的项', 'Terms added'); $('ro3').textContent = `${n} / 9`;
      setLabel('ro4Label', 'B(3, 4, 12)² 的矩阵乘法', 'B(3, 4, 12)² by matrix multiplication'); $('ro4').innerHTML = `[[${BSQ[0][0][0]}, ${BSQ[0][1][0]}], [${BSQ[1][0][0]}, ${BSQ[1][1][0]}]] = 169·I <span class="nummark">${bsqOk ? '✓' : '✗'}</span>`;
      $('roAside').textContent = 'a = (3, 4, 12)';
      $('pillProd').querySelector('strong').textContent = `v² ${n === TERMS.length ? '= 169' : '…'}`;
      $('pillSwaps').querySelector('strong').textContent = '—';
    }
    $('hudBig').textContent = big; $('hudSub').textContent = hud; $('roNote').textContent = note;
    const items = (isPair() ? LEGEND.pair : LEGEND.vector).concat(S.hl === 'pseudo' && isPair() ? [['vi', 'I₃ 的一行与一列', 'the row and column of I₃']] : []).concat(S.hl === 'diag' && isPair() ? [['dm', '虚线框：对角线（自乘）', 'dashed: the diagonal (squares)']] : []);
    const leg = items.map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
    if ($('legend')._h !== leg) { $('legend').innerHTML = leg; $('legend')._h = leg; }
    syncChips();
  }

  /* ---------- the deck: blade chips ---------- */
  for (const side of ['left', 'right']) {
    $(side + 'Chips').innerHTML = NAMES.map((_, m) => `<button class="chip" data-${side}="${m}" aria-pressed="false">${m}</button>`).join('');
  }
  function syncChips() {
    const n = N();
    for (const [side, cur] of [['left', S.l], ['right', S.r]]) {
      $(side + 'Chips').querySelectorAll('button').forEach((b) => {
        const m = +b.dataset[side]; b.hidden = m >= n; const lab = nm(m);
        if (b._l !== lab) { b.textContent = lab; b._l = lab; }
        b.setAttribute('aria-pressed', String(m === cur));
      });
    }
    $('pairAside').textContent = S.scene === 'pauli' ? 'm ∈ 0 … 3' : 'm ∈ 0 … 7';
  }

  const paint = kit.painter(() => { drawText(); drawStage(); }, [$('stage')]);

  /* ---------- the rail, scenes, the pair ---------- */
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 1, rate: 1.2, step: 1,
    // (the label is first drawn while the clock is being built, so it reads t and never the clock itself)
    format: (t) => (isPair() ? `${L('第 ', 'STEP ')}${Math.min(K(), Math.floor(t + 1e-9))}${L(' 步', '')} <small>/ ${K()}</small>` : `${Math.min(9, Math.floor(t + 1e-9))} <small>/ 9 ${L('项', 'terms')}</small>`),
    onChange: () => paint()
  });
  function fitClock(t) { clock.pause(); clock.rate = isPair() ? 1.2 : 1.8; clock.setMax(Math.max(K(), 1e-9), true); clock.set(t == null ? K() : t); }
  function setScene(sc, t) {
    S.scene = sc; S.hover = null; sceneChips.set(sc, true);
    if (sc === 'pauli') { S.l &= 3; S.r &= 3; }
    $('pairCtl').hidden = sc === 'vector'; $('vecCtl').hidden = sc !== 'vector';
    document.querySelectorAll('[data-scenes]').forEach((el) => { el.hidden = !el.dataset.scenes.split(' ').includes(sc); });
    fitClock(t);
  }
  /** Choose the pair; the rewrite restarts finished (step back with ← or play it again). */
  function setPair(l, r) {
    const n = N(); l = clamp(Math.round(l) || 0, 0, n - 1); r = clamp(Math.round(r) || 0, 0, n - 1);
    S.l = l; S.r = r; fitClock();
  }
  const leave = () => { cards.mark(null); S.hl = null; };
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); setScene(v); });
  kit.chips($('leftChips'), 'left', (v) => { leave(); setPair(+v, S.r); });
  kit.chips($('rightChips'), 'right', (v) => { leave(); setPair(S.l, +v); });
  const swap = () => { if (!isPair()) return; leave(); setPair(S.r, S.l); };
  $('swapBtn').addEventListener('click', swap);
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({ 1: () => { leave(); setScene('cl3'); }, 2: () => { leave(); setScene('pauli'); }, 3: () => { leave(); setScene('vector'); }, s: swap });

  /* ---------- direct manipulation: click a cell of the table ---------- */
  const cellAt = (ev) => {
    const g = geo.table; if (!g) return null;
    const b = $('cv').getBoundingClientRect(), j = Math.floor((ev.clientX - b.left - g.ox) / g.c), i = Math.floor((ev.clientY - b.top - g.oy) / g.c);
    return i >= 0 && j >= 0 && i < g.n && j < g.n ? [i, j] : null;
  };
  $('cv').addEventListener('click', (ev) => {
    const c = cellAt(ev);
    if (c) { leave(); if (isPair()) setPair(c[0], c[1]); else { clock.pause(); clock.set(c[0] * 3 + c[1] + 1); } return; }
    const g = geo.rows, b = $('cv').getBoundingClientRect(), y = ev.clientY - b.top, x = ev.clientX - b.left;   // a row of the rewrite: go to that step
    if (isPair() && g && x >= g.left && x <= g.right) { const j = Math.floor((y - g.y0) / g.rowH) + g.first; if (j >= 0 && j <= g.K) { clock.pause(); clock.set(j); } }
  });
  $('cv').addEventListener('pointermove', (ev) => { const c = cellAt(ev); if (String(c) !== String(S.hover)) { S.hover = c; paint(); } });
  $('cv').addEventListener('pointerleave', () => { if (S.hover) { S.hover = null; paint(); } });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    e2e1: { scene: 'cl3', pair: [2, 1], play: true, still: 'end' },
    square: { scene: 'cl3', pair: [3, 3], hl: 'diag', play: true, still: 'end' }, pseudo: { scene: 'cl3', pair: [7, 7], hl: 'pseudo', play: true, still: 'end' },
    pauli: { scene: 'pauli', pair: [2, 1], play: true, still: 'end' }, vector: { scene: 'vector', play: true, still: 'end' }
  };
  const NOTES = {
    e2e1: ['e₂ · e₁ 与 e₁ · e₂：两种次序的掩码异或都是 001₂ ⊕ 010₂ = 011₂，即 e₁₂。e₁ · e₂ 已按 e₁ e₂ e₃ 的顺序排好，不用交换，乘积是 +e₁₂，表里那一格是青色；反过来 e₂ · e₁ 右边的 e₁ 要越过左边的 e₂，两条线交叉一次，符号变成 −，这一格是品红，与 e₁ · e₂ 那一格关于对角线对称。', 'e₂ · e₁ and e₁ · e₂: in either order the masks XOR to 001₂ ⊕ 010₂ = 011₂, that is e₁₂. In e₁ · e₂ the factors are already in the order e₁ e₂ e₃, no swap is needed, the product is +e₁₂, and that cell is cyan; the other way round, in e₂ · e₁ the e₁ on the right must move past the e₂ on the left, the two lines cross once, the sign becomes −, and this cell is magenta, the mirror image of the e₁ · e₂ cell across the diagonal.'],
    square: ['e₁₂ · e₁₂：右边的 e₁ 越过左边的 e₂ 一次（−），然后 e₁e₁、e₂e₂ 各自抵成 +1；异或把两位全部清零，乘积是 −1。虚线框住的对角线上，1、e₁、e₂、e₃ 自乘为 +1（青色），e₁₂、e₁₃、e₂₃、I₃ 自乘为 −1（品红）。', 'e₁₂ · e₁₂: the right e₁ moves past the left e₂ once (−), then e₁e₁ and e₂e₂ each cancel to +1; the XOR clears both bits and the product is −1. Along the dashed diagonal, 1, e₁, e₂, e₃ square to +1 (cyan) and e₁₂, e₁₃, e₂₃, I₃ square to −1 (magenta).'],
    pseudo: ['I₃ · I₃：右边的 e₁ 越过 e₃、e₂，右边的 e₂ 再越过 e₃，共 0 + 1 + 2 = 3 次交叉，奇数；三对同号抵成 +1，乘积是 −1。紫色框住的 I₃ 那一行与那一列逐格相同：I₃ 与每块刀片对易。', 'I₃ · I₃: the right e₁ moves past e₃ and e₂, then the right e₂ past e₃: 0 + 1 + 2 = 3 crossings, an odd number; three equal pairs cancel to +1 and the product is −1. The violet row and column of I₃ agree cell by cell: I₃ commutes with every blade.'],
    pauli: ['只用两位：第 0 位记 X，第 1 位记 Z，四个泡利字 I、X、Z、XZ 排成 4 × 4 的表。Z · X 要交换一次，得到 −XZ；四个品红格正是左因子含 Z、右因子含 X 的那四格。', 'Two bits only: bit 0 is X, bit 1 is Z, and the four Pauli words I, X, Z, XZ fill a 4 × 4 table. Z · X needs one swap and gives −XZ; the four magenta cells are exactly those whose left factor contains Z and right factor contains X.'],
    vector: ['v = 3e₁ + 4e₂ + 12e₃ 自乘，九项逐一加进来。对角三项的掩码异或为 0，给出 9 + 16 + 144；交叉项 e₁e₂ 与 e₂e₁ 等一青一品红，两条一样长，成对抵消。最后 v² = 169 = 13²。', 'v = 3e₁ + 4e₂ + 12e₃ squared, the nine terms added one at a time. The three diagonal terms XOR to the mask 0 and give 9 + 16 + 144; cross terms such as e₁e₂ and e₂e₁ come one cyan, one magenta, equally long, and cancel in pairs. In the end v² = 169 = 13².']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    S.hl = p.hl || null;
    if (p.pair) { S.l = p.pair[0]; S.r = p.pair[1]; }
    setScene(p.scene);
    // a still (cover, cited figure for PDF/EPUB) and the opening view of the full page show the declared frame (the
    // finished product); inside a chapter the card plays once the reader has scrolled it into view; a click plays at once
    if (TRV.still || (booting && !TRV.embed)) { if (p.still != null) clock.set(p.still === 'end' ? clock.max : p.still); return; }
    if (!p.play || K() < 1) return;
    clock.set(0);
    if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  const cards = kit.cards($('presets'), { presets: PRESETS, notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：点表里的一格、换场景、拖时间轴。随时可以再选一张卡。', 'Free play: click a cell of the table, switch scenes, scrub the rail. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe for the browser suite, cover, start ---------- */
  const at = (x, y) => { const b = $('cv').getBoundingClientRect(); return { x: b.left + x, y: b.top + y }; };
  window.BX_DEBUG = {
    get state() {
      return { scene: S.scene, l: S.l, r: S.r, hl: S.hl, t: clock.t, max: clock.max, playing: clock.playing, preset: cards.current, step: step(), steps: K(),
        matrixOk: { cl3: CL3_OK.every(Boolean), pauli: PAULI_OK.every(Boolean) } };
    },
    /** The table of the current scene: [[{ mask, sign }]] (vector scene: [[{ mask, coef }]]). */
    table: () => (S.scene === 'vector' ? [0, 1, 2].map((i) => [0, 1, 2].map((j) => ({ mask: TERMS[i * 3 + j].mask, coef: TERMS[i * 3 + j].coef })))
      : Array.from({ length: N() }, (_, i) => Array.from({ length: N() }, (_, j) => ({ mask: i ^ j, sign: signOf(i, j) })))),
    info: () => { const D = derive(); return { l: S.l, r: S.r, mask: D.mask, sign: D.sign, swaps: D.swaps, cancels: D.cancels, start: D.start.map((x) => x.i), steps: D.steps.map((s) => ({ kind: s.kind, sign: s.sign, word: s.word.map((x) => x.i) })) }; },
    sums: (n) => { const s = sums(n == null ? step() : n); return Object.fromEntries(BIV.map((m) => [m, s[m].net])); },
    bsq: () => BSQ.map((row) => row.map((z) => z.slice())),
    set: (l, r) => setPair(l, r), seek: (t) => { clock.pause(); clock.set(t); }, scene: (sc, t) => setScene(sc, t),
    /** Viewport coordinates of the centre of table cell (i, j), and of rewrite row j. */
    point: {
      cell: (i, j) => (geo.table ? at(geo.table.X(j) + geo.table.c / 2, geo.table.Y(i) + geo.table.c / 2) : null),
      row: (j) => (geo.rows ? at((geo.rows.left + geo.rows.right) / 2, geo.rows.y0 + (j - geo.rows.first + 0.5) * geo.rows.rowH) : null)
    }
  };
  /** Cover: the sign pattern of the 8 × 8 table beside the three crossings of I₃ · I₃. */
  window.TRV_THUMB = () => { S.l = 7; S.r = 7; S.hl = null; setScene('cl3'); paint.now(); };
  cards.pick(cards.initial('e2e1'));   // a chapter may cite another card: ::: {.viz src="blade-multiplication" preset="pseudo"}
  booting = false;
  paint();
})();
