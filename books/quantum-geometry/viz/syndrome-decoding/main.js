/* SYNDROME//DECODE · 综合征解码 · Syndrome decoding
   The three-qubit bit-flip repetition code of Chapter 14. Top of the stage: three qubits and the two checks
   g₁ = Z₁Z₂, g₂ = Z₂Z₃ drawn over the pairs they read. Bottom: the eight basis states, grouped by the readings of the
   two checks into four rooms (the syndrome subspaces S_j = E_j V, E ∈ {I, X₁, X₂, X₃}); the amplitude on each basis
   state is a cyan bar, the original encoded state a dashed outline in the code room. The rail runs over four steps:
   0 encoded, 1 error, 2 checks measured, 3 corrected. A Pauli error X^x Z^z (Z first, then X) maps a basis state to a
   basis state with a sign, so the bars are tracked as tokens and slide between slots.
   Basis index: b = 4·q₁ + 2·q₂ + q₃. Read-only probe for the browser suite: window.SYNDROME_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const bit = (b, k) => (b >> (2 - k)) & 1;            // qubit k = 0, 1, 2
  const KETS = ['000', '001', '010', '011', '100', '101', '110', '111'];
  const ROOM_X = [[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1]];   // E_j = I, X₁, X₂, X₃
  const ROOM_E = ['I', 'X₁', 'X₂', 'X₃'];
  const CHECK_Z = [[1, 1, 0], [0, 1, 1]];              // the Z rows of g₁, g₂ (their X rows are zero)
  const SIGMA = [1 / 2, 1 / 4, 1 / 8, 1 / 8];
  const FRAC = { 0.5: '½', 0.25: '¼', 0.125: '⅛', 0.375: '⅜', 1: '1', 0: '0' };
  const frac = (x) => FRAC[x] || fix(x, 3);
  const xIndex = (x) => 4 * x[0] + 2 * x[1] + x[2];

  /* ---------- the code ---------- */
  /** X^x Z^z on the basis state b with amplitude a: Z first (sign), then X (flip). */
  function pauli(e, b, a) {
    let s = 0; for (let k = 0; k < 3; k++) s ^= e.z[k] & bit(b, k);
    return { b: b ^ xIndex(e.x), a: s ? -a : a };
  }
  /** Syndrome of a Pauli error from the symplectic parity with the two checks: [s₁, s₂], 1 = anticommutes (lit). */
  const syndromeOf = (e) => CHECK_Z.map((z) => (z[0] * e.x[0] + z[1] * e.x[1] + z[2] * e.x[2]) % 2);
  const parityRows = (e) => CHECK_Z.map((z) => z.map((zk, k) => zk * e.x[k]));
  /** Room of a syndrome: (0,0) → I, (1,0) → X₁, (1,1) → X₂, (0,1) → X₃. */
  const roomOfSyn = (s) => (s[0] ? (s[1] ? 2 : 1) : (s[1] ? 3 : 0));
  /** Room and slot (0: E|000⟩, 1: E|111⟩) of a basis state. */
  function slotOf(b) {
    const r = roomOfSyn([bit(b, 0) ^ bit(b, 1), bit(b, 1) ^ bit(b, 2)]);
    return { room: r, slot: b === xIndex(ROOM_X[r]) ? 0 : 1 };
  }
  const NONE = () => ({ x: [0, 0, 0], z: [0, 0, 0] });
  const compose = (a, b) => ({ x: a.x.map((v, k) => v ^ b.x[k]), z: a.z.map((v, k) => v ^ b.z[k]) });
  const isNone = (e) => e.x.every((v) => !v) && e.z.every((v) => !v);
  function name(e) {
    const sub = ['₁', '₂', '₃'], parts = [];
    for (let k = 0; k < 3; k++) { if (e.x[k] && e.z[k]) parts.push(`X${sub[k]}Z${sub[k]}`); else if (e.x[k]) parts.push(`X${sub[k]}`); else if (e.z[k]) parts.push(`Z${sub[k]}`); }
    return parts.length ? parts.join('') : 'I';
  }

  /* ---------- state ---------- */
  const S = { theta: 90, err: NONE(), noise: 'one', kind: 'X' };
  const amps = () => { const h = S.theta * Math.PI / 360; return [Math.cos(h), Math.sin(h)]; };   // α, β
  /** Every branch: weight, error, syndrome, correction, and the token path of its two bars over the four steps. */
  function branches() {
    const [al, be] = amps(), list = S.noise === 'mix'
      ? SIGMA.map((w, j) => ({ w, err: { x: ROOM_X[j].slice(), z: [0, 0, 0] } }))
      : [{ w: 1, err: S.err }];
    return list.map((br) => {
      const syn = syndromeOf(br.err), fixE = { x: ROOM_X[roomOfSyn(syn)].slice(), z: [0, 0, 0] };
      const tokens = [[0, al], [7, be]].map(([b0, a0]) => {
        const p1 = pauli(br.err, b0, a0), p3 = pauli(fixE, p1.b, p1.a);
        return { from: b0, steps: [{ b: b0, a: a0 }, p1, p1, p3] };
      });
      return Object.assign(br, { syn, fix: fixE, net: compose(fixE, br.err), tokens });
    });
  }
  /** The decoded logical 2 × 2 matrix Σ_j w_j Σ_i (S_iᵀψ_j)(S_iᵀψ_j)ᵀ, before any correction. */
  function decoded(brs) {
    const M = [[0, 0], [0, 0]];
    for (const br of brs) {
      const v = new Array(8).fill(0); for (const t of br.tokens) v[t.steps[1].b] += t.steps[1].a;
      for (let i = 0; i < 4; i++) {
        const e0 = xIndex(ROOM_X[i]), e1 = 7 ^ e0, u = [v[e0], v[e1]];
        for (let r = 0; r < 2; r++) for (let c = 0; c < 2; c++) M[r][c] += br.w * u[r] * u[c];
      }
    }
    return M;
  }
  function summary() {
    const brs = branches(), M = decoded(brs), [al, be] = amps();
    const fid = al * al * M[0][0] + 2 * al * be * M[0][1] + be * be * M[1][1];
    return { brs, M, fid, tr: M[0][0] + M[1][1] };
  }

  /* ---------- layout ---------- */
  const cv = $('cv');
  let box = null;
  function layout() {
    const W = cv.clientWidth || 1, H = cv.clientHeight || 1, thumb = TRV.thumbMode, narrow = W < 560;
    const top = thumb ? 30 : (narrow ? 64 : 58), bottom = thumb ? 30 : (narrow ? 92 : 56);
    const usable = H - top - bottom;
    const qh = usable * 0.42, rh = usable - qh - 14;
    const dx = Math.min(W * (narrow ? 0.27 : 0.17), 190), cx = W / 2;
    const r = Math.max(13, Math.min(30, qh * 0.2, dx * 0.24));
    const qy = top + qh * 0.74, gy = top + qh * 0.2;
    const qx = [cx - dx, cx, cx + dx];
    const gx = [cx - dx / 2, cx + dx / 2];
    const mx = narrow ? 8 : Math.max(22, W * 0.06), gap = narrow ? 6 : 14;
    const rw = (W - 2 * mx - 3 * gap) / 4, ry = top + qh + 14;
    const rooms = [0, 1, 2, 3].map((i) => ({ x: mx + i * (rw + gap), y: ry, w: rw, h: rh }));
    box = { W, H, narrow, qx, qy, gx, gy, r, rooms, gs: Math.max(16, Math.min(26, r * 0.95)) };
    return box;
  }
  const slotX = (room, slot) => { const R = box.rooms[room]; return R.x + R.w * (slot ? 0.71 : 0.29); };
  const axisY = (room) => { const R = box.rooms[room]; return R.y + R.h * 0.5; };
  const barH = () => box.rooms[0].h * 0.36;
  const barW = () => Math.min(box.rooms[0].w * 0.3, 46);

  /* ---------- stage ---------- */
  const stage = kit.stage3($('stage'), {
    canvas: cv, rotate: false, wheel: false, onChange: () => paint(),
    onPick: (ev) => { const k = qubitAt(ev); if (k < 0) return false; toggle(k); return true; }
  });
  function qubitAt(ev) {
    if (!box) return -1;
    const b = cv.getBoundingClientRect(), x = ev.clientX - b.left, y = ev.clientY - b.top;
    for (let k = 0; k < 3; k++) if (Math.hypot(x - box.qx[k], y - box.qy) < box.r + 12) return k;
    return -1;
  }
  cv.addEventListener('pointermove', (ev) => { cv.style.cursor = qubitAt(ev) >= 0 ? 'pointer' : 'default'; });

  const ease = (u) => TRV.smooth(Math.max(0, Math.min(1, u)));
  function drawStage() {
    layout();
    const st = stage, ctx = st.begin(), t = clock.t, step = Math.min(3, Math.floor(t + 1e-9)), u = t - step;
    const sm = summary(), brs = sm.brs, mix = S.noise === 'mix', th = TRV.thumbMode ? 1.8 : 1;
    const errIn = t >= 1 ? 1 : ease(t);                 // errors appear over step 0 → 1
    const lit = t >= 2 ? 1 : (t >= 1 ? ease(u) : 0);    // checks light over step 1 → 2
    const fixOn = t > 2;                                 // the decoder acts over step 2 → 3 (at t = 2 the checks are read, nothing flipped yet)

    // the probability that each check is lit (1 or 0 for one error; a weight for the mixture)
    const pLit = [0, 1].map((g) => brs.reduce((a, br) => a + br.w * br.syn[g], 0));

    // checks and their wires
    for (let g = 0; g < 2; g++) {
      const gx = box.gx[g], gy = box.gy, s = box.gs, on = pLit[g] * lit;
      for (const k of [g, g + 1]) {
        ctx.strokeStyle = on > 0.01 ? P.magenta : P.lineHot; ctx.globalAlpha = on > 0.01 ? 0.35 + 0.6 * on : 0.9; ctx.lineWidth = (1.2 + 1.4 * on) * th;
        ctx.beginPath(); ctx.moveTo(gx, gy + s * 0.6); ctx.lineTo(box.qx[k], box.qy - box.r); ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.fillStyle = TRV.alpha(P.magenta, 0.85 * on); ctx.strokeStyle = on > 0.01 ? P.magenta : P.dim; ctx.lineWidth = 1.6 * th;
      if (on > 0.01) { ctx.shadowColor = P.magenta; ctx.shadowBlur = 18 * on; }
      ctx.beginPath(); ctx.rect(gx - s, gy - s * 0.6, 2 * s, 1.2 * s); ctx.fill(); ctx.stroke(); ctx.shadowBlur = 0;
      const val = mix ? '' : (t >= 1 ? (brs[0].syn[g] ? '−1' : '+1') : '?');
      const gl = `g${g ? '₂' : '₁'} ${val}`;
      st.tag(`g${g}`, [gx, gy], on > 0.5 ? `<span class="on">${gl}</span>` : gl, 'num chk', { screen: true });
      // the mixture: the weight of the branches in which this check reads −1
      if (mix && t >= 1) st.tag(`gw${g}`, [gx, gy - s * 0.6 - 11], `<span class="c-mg">−1 : ${frac(pLit[g])}</span>`, 'num', { screen: true });
    }
    // qubits, their errors, and the decoder's flip
    for (let k = 0; k < 3; k++) {
      const x = box.qx[k], y = box.qy, r = box.r;
      ctx.fillStyle = TRV.alpha(P.cyan, 0.08); ctx.strokeStyle = P.ink; ctx.lineWidth = 1.6 * th; ctx.globalAlpha = 0.95;
      ctx.beginPath(); ctx.arc(x, y, r, 0, kit.TAU); ctx.fill(); ctx.stroke(); ctx.globalAlpha = 1;
      // errors on this qubit (one error) or the weight of the branch that flips it (mixture)
      let label = '';
      if (mix) { const w = brs.find((br) => br.err.x[k]); if (w) label = `X ${frac(w.w)}`; }
      else label = name({ x: [0, 1, 2].map((j) => (j === k ? S.err.x[k] : 0)), z: [0, 1, 2].map((j) => (j === k ? S.err.z[k] : 0)) }).replace(/[₁₂₃]/g, '');
      if (label && label !== 'I' && errIn > 0) {
        ctx.globalAlpha = errIn; ctx.strokeStyle = P.magenta; ctx.lineWidth = 2.4 * th; ctx.shadowColor = P.magenta; ctx.shadowBlur = 12;
        ctx.beginPath(); ctx.arc(x, y, r - 4, 0, kit.TAU); ctx.stroke(); ctx.shadowBlur = 0; ctx.globalAlpha = 1;
        st.tag(`e${k}`, [x, y], `<span class="c-mg">${label}</span>`, 'num', { screen: true });
      } else st.tag(`e${k}`, [x, y], `q${['₁', '₂', '₃'][k]}`, 'num', { screen: true });
      // the decoder's flip (one error only: the mixture's branches each flip their own)
      if (!mix && fixOn && brs[0].fix.x[k]) {
        const a = t >= 3 ? 1 : 0.4 + 0.6 * ease(u);
        ctx.globalAlpha = a; ctx.strokeStyle = P.amber; ctx.lineWidth = 2.6 * th; ctx.shadowColor = P.amber; ctx.shadowBlur = 14;
        ctx.beginPath(); ctx.arc(x, y, r + 7, 0, kit.TAU); ctx.stroke(); ctx.shadowBlur = 0; ctx.globalAlpha = 1;
        st.tag(`f${k}`, [x, y + r + 16], `<span class="c-am">${L('翻回 X', 'flip X')}</span>`, 'num', { screen: true });
      }
    }
    // rooms
    for (let i = 0; i < 4; i++) {
      const R = box.rooms[i], code = i === 0;
      ctx.fillStyle = TRV.alpha(code ? P.cyan : P.dim, code ? 0.06 : 0.04); ctx.fillRect(R.x, R.y, R.w, R.h);
      ctx.strokeStyle = code ? P.cyan : P.panelEdge; ctx.globalAlpha = code ? 0.7 : 1; ctx.lineWidth = (code ? 1.4 : 1) * th;
      ctx.strokeRect(R.x + 0.5, R.y + 0.5, R.w - 1, R.h - 1); ctx.globalAlpha = 1;
      ctx.strokeStyle = P.lineHot; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(R.x + 6, axisY(i) + 0.5); ctx.lineTo(R.x + R.w - 6, axisY(i) + 0.5); ctx.stroke();
      const syn = i === 0 ? '+1,+1' : i === 1 ? '−1,+1' : i === 2 ? '−1,−1' : '+1,−1';
      const lab = box.narrow ? `${syn.replace(/1/g, '')} ${ROOM_E[i]}` : `(${syn}) · ${ROOM_E[i]}${code ? L(' 码空间', ' code') : ''}`;
      st.tag(`r${i}`, [R.x + R.w / 2, R.y + 11], code ? `<span class="c-cy">${lab}</span>` : lab, 'num', { screen: true });
      for (const sl of [0, 1]) {
        const b = sl ? 7 ^ xIndex(ROOM_X[i]) : xIndex(ROOM_X[i]);
        st.tag(`k${i}${sl}`, [slotX(i, sl), R.y + R.h - 10], box.narrow ? KETS[b] : `|${KETS[b]}⟩`, 'num ket', { screen: true });
      }
    }
    // the original state: dashed outlines in the code room
    const [al, be] = amps(), bw = barW(), bh = barH();
    ctx.setLineDash([4, 3]); ctx.strokeStyle = P.ink; ctx.globalAlpha = 0.75; ctx.lineWidth = 1.2 * th;
    for (const [sl, a] of [[0, al], [1, be]]) if (Math.abs(a) > 1e-9) { const x = slotX(0, sl), y0 = axisY(0); ctx.strokeRect(x - bw / 2, Math.min(y0, y0 - a * bh), bw, Math.abs(a) * bh); }
    ctx.setLineDash([]); ctx.globalAlpha = 1;
    // the bars: tokens tracked over the steps; in the mixture each branch is as wide as its weight
    const at = (br, tok, k) => {
      const sp = tok.steps[k], where = slotOf(sp.b);
      // in the code room the branches stand side by side, each in its own share of the full width
      let x = slotX(where.room, where.slot);
      if (mix && where.room === 0) { const off = brs.slice(0, brs.indexOf(br)).reduce((a, q) => a + q.w, 0); x += (off + br.w / 2 - 0.5) * bw; }
      return { x, y0: axisY(where.room), a: sp.a, w: br.w * bw };
    };
    for (const br of brs) for (const tok of br.tokens) {
      let A, B, e;
      if (t < 1) { A = at(br, tok, 0); B = at(br, tok, 1); e = ease(u); }
      else if (t < 2) { A = B = at(br, tok, 2); e = 0; }
      else if (t < 3) { A = at(br, tok, 2); B = at(br, tok, 3); e = ease(u); }
      else { A = B = at(br, tok, 3); e = 0; }
      const x = A.x + (B.x - A.x) * e, y0 = A.y0 + (B.y0 - A.y0) * e, a = A.a + (B.a - A.a) * e, w = A.w;
      if (Math.abs(a) < 1e-9) continue;
      const h = a * bh, y = Math.min(y0, y0 - h);
      ctx.fillStyle = TRV.alpha(P.cyan, 0.75); ctx.shadowColor = P.cyan; ctx.shadowBlur = 8;
      ctx.fillRect(x - w / 2 + 0.5, y, w - 1, Math.abs(h)); ctx.shadowBlur = 0;
      ctx.strokeStyle = P.cyan; ctx.lineWidth = 1; ctx.strokeRect(x - w / 2 + 0.5, y, w - 1, Math.abs(h));
    }
    // weights of the mixture's branches, in their rooms while they are apart
    if (mix && t >= 0.5 && t < 2.5) for (const br of brs) {
      const i = roomOfSyn(br.syn), R = box.rooms[i];
      st.tag(`w${i}`, [R.x + R.w / 2, R.y + 26], `<span class="c-cy">σ = ${frac(br.w)}</span>`, 'num', { screen: true });
    }
    if (mix && t >= 2.5) st.tag('wsum', [box.rooms[0].x + box.rooms[0].w / 2, box.rooms[0].y + 26], `<span class="c-cy">½+¼+⅛+⅛ = 1</span>`, 'num', { screen: true });
    st.end();
    hud(sm, step);
  }

  /* ---------- text ---------- */
  const STEP = [['编码', 'encoded'], ['出错', 'error'], ['量校验', 'measure'], ['纠正', 'correct']];
  function hud(sm, step) {
    const br = sm.brs[0], mix = S.noise === 'mix', t = clock.t;
    const synTxt = (s) => `(${s.map((v) => (v ? '−1' : '+1')).join(', ')})`;
    if (mix) {
      $('hudBig').textContent = L(`四分支混合 · ${STEP[step][0]}`, `Four-branch mixture · ${STEP[step][1]}`);
      $('hudSub').innerHTML = t < 1 ? L('σ = diag(½, ¼, ⅛, ⅛)：四个分支分头去各自的房', 'σ = diag(½, ¼, ⅛, ⅛): the four branches head for their own rooms')
        : t < 2.5 ? L('每间房里一个分支，柱子宽窄就是它的权重', 'one branch per room, each bar as wide as its weight')
          : L(`回到码空间并排拼成一整根：Tr σ = ${fix(sm.tr, 3)}`, `back in the code space they line up into one whole bar: Tr σ = ${fix(sm.tr, 3)}`);
      return;
    }
    $('hudBig').textContent = L(`${STEP[step][0]} · 综合征 ${t >= 2 ? synTxt(br.syn) : '?'}`, `${STEP[step][1]} · syndrome ${t >= 2 ? synTxt(br.syn) : '?'}`);
    const lost = sm.fid < 1 - 1e-9;
    $('hudSub').innerHTML = t < 1 ? L(`α|000⟩ + β|111⟩，α = ${fix(amps()[0], 3)}，β = ${fix(amps()[1], 3)}`, `α|000⟩ + β|111⟩ with α = ${fix(amps()[0], 3)}, β = ${fix(amps()[1], 3)}`)
      : t <= 2 ? L(`错误 ${name(br.err)}：柱子搬进 ${ROOM_E[roomOfSyn(br.syn)]} 那间房`, `error ${name(br.err)}: the bars move to room ${ROOM_E[roomOfSyn(br.syn)]}`)
        : t < 3 ? L(`灯指向 ${ROOM_E[roomOfSyn(br.syn)]}，解码器照着翻回`, `the lights point at ${ROOM_E[roomOfSyn(br.syn)]}; the decoder flips that back`)
          : lost ? L(`回到码空间，却与虚线对不上：重合 ${fix(sm.fid, 3)}`, `back in the code space, but off the dashed outline: overlap ${fix(sm.fid, 3)}`)
            : L('回到码空间，与虚线重合：重合 1', 'back in the code space, on the dashed outline: overlap 1');
  }
  function drawText() {
    const sm = summary(), t = clock.t, mix = S.noise === 'mix', br = sm.brs[0];
    const synTxt = (s) => `(${s.map((v) => (v ? '−1' : '+1')).join(', ')})`;
    $('roKey').textContent = t >= 3 || mix ? fix(sm.fid, 4) : '—';
    $('roKeySub').textContent = t >= 3 || mix ? L(`解码后的迹 ${fix(sm.tr, 3)}`, `trace after decoding ${fix(sm.tr, 3)}`) : L('纠正之后才读', 'read after the correction');
    if (mix) {
      $('roErr').textContent = 'σ = diag(½, ¼, ⅛, ⅛) · I, X₁, X₂, X₃';
      $('roSyn').textContent = L('每个分支各亮各的', 'each branch lights its own');
      $('roPar').textContent = sm.brs.map((b) => b.syn.join('')).join(' · ');
      $('roFix').textContent = L('每个分支翻回自己的', 'each branch its own');
      $('roNet').textContent = 'I';
      $('roNote').textContent = L(`四间房两两正交，交叉项全被切掉，解码结果是 Tr σ · ρ = ${fix(sm.tr, 3)} · ρ。`, `The four rooms are pairwise orthogonal, every cross term is cut, and decoding gives Tr σ · ρ = ${fix(sm.tr, 3)} · ρ.`);
    } else {
      const rows = parityRows(br.err);
      $('roErr').textContent = name(br.err);
      $('roSyn').textContent = synTxt(br.syn);
      $('roPar').textContent = rows.map((r, g) => `${r.join('+')} = ${br.syn[g]}`).join(' · ');
      $('roFix').textContent = isNone(br.fix) ? L('不动', 'nothing') : name(br.fix);
      const n = br.net, logX = n.x.every((v) => v), logZ = n.z.reduce((a, v) => a + v, 0) % 2 === 1;
      const net = isNone(n) ? 'I' : `${name(n)} = ${logX && logZ ? L('逻辑 XZ', 'logical XZ') : logX ? L('逻辑 X', 'logical X') : logZ ? L('逻辑 Z', 'logical Z') : L('稳定子（无害）', 'a stabilizer (harmless)')}`;
      $('roNet').textContent = net;
      $('roNote').textContent = isNone(br.err) ? L('没有错误：两盏灯都不亮，解码器什么也不做。', 'No error: both lights stay dark and the decoder does nothing.')
        : sm.fid > 1 - 1e-9 ? (logX || logZ ? L('纠完剩下一个逻辑算子，可它恰好不改这个态。', 'A logical operator is left over, but it happens to leave this state alone.') : L('灯指对了：翻回去，剩下的只是稳定子，态原样回来。', 'The lights point right: flipped back, only a stabilizer is left and the state returns whole.'))
          : isNone(br.fix) ? L('灯不亮，解码器不动；可态已经变了。', 'No light, so the decoder does nothing; yet the state has changed.')
            : L('灯指错了：翻回之后合起来是一个逻辑算子。', 'The lights point wrong: after the flip back, the total is a logical operator.');
    }
    $('pillSyn').querySelector('strong').textContent = mix ? 'σ' : (t >= 2 ? synTxt(br.syn) : '?');
    $('pillFid').querySelector('strong').textContent = t >= 3 || mix ? fix(sm.fid, 3) : '—';
  }

  const paint = kit.painter(() => { drawStage(); drawText(); }, [$('stage')]);

  /* ---------- controls ---------- */
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 3, rate: 0.85, step: 1,
    format: (t) => { const k = Math.min(3, Math.floor(t + 1e-9)); return L(`第 ${k} 步 · ${STEP[k][0]} <small>/ 3</small>`, `step ${k} · ${STEP[k][1]} <small>/ 3</small>`); },
    onChange: () => paint()
  });
  const theta = kit.field($('theta'), { out: $('oTheta'), fmt: (v) => `${v}°`, onInput: (v) => { cards.mark(null); S.theta = v; paint(); } });
  const kindChips = kit.chips($('kindChips'), 'kind', (v) => { S.kind = v; });
  const noiseChips = kit.chips($('noiseChips'), 'noise', (v) => { cards.mark(null); S.noise = v; clock.pause(); clock.set(0); clock.play(); });
  /** Add or remove the chosen error on qubit k, then replay from the error step. */
  function toggle(k) {
    cards.mark(null);
    if (S.noise === 'mix') { S.noise = 'one'; noiseChips.set('one', true); S.err = NONE(); }
    const key = S.kind === 'Z' ? 'z' : 'x';
    S.err = { x: S.err.x.slice(), z: S.err.z.slice() }; S.err[key][k] ^= 1;
    clock.pause(); clock.set(1); clock.play();
  }
  $('clear').addEventListener('click', (ev) => { ev.stopPropagation(); cards.mark(null); S.err = NONE(); S.noise = 'one'; noiseChips.set('one', true); clock.pause(); clock.set(0); paint(); });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({ 1: () => toggle(0), 2: () => toggle(1), 3: () => toggle(2) });

  /* ---------- experiment cards ---------- */
  const E = (x, z) => ({ x, z: z || [0, 0, 0] });
  const PRESETS = {
    single: { theta: 90, err: E([1, 0, 0]), noise: 'one', still: 3 },
    rooms: { theta: 60, err: E([0, 1, 0]), noise: 'one', still: 2 },
    mix: { theta: 90, err: E([0, 0, 0]), noise: 'mix', still: 3 },
    two: { theta: 0, err: E([1, 1, 0]), noise: 'one', still: 3 },
    phase: { theta: 90, err: E([0, 0, 0], [1, 0, 0]), noise: 'one', still: 3 }
  };
  const NOTES = {
    single: ['第一个比特翻了（品红的 X）：只有跨在它上面的 g₁ 亮起，g₂ 不亮；青色的两根柱子一起搬进 (−1,+1) 那间房。解码器照灯翻回第一个比特（琥珀色），柱子回到码空间，落在虚线上。', 'Qubit 1 flips (the magenta X): only g₁, which sits over it, lights up, and g₂ stays dark; both cyan bars move together into room (−1,+1). The decoder follows the lights and flips qubit 1 back (amber); the bars return to the code space and land on the dashed outline.'],
    rooms: ['中间的比特翻了，两盏灯都亮。α|000⟩ + β|111⟩ 的两根柱子原样搬进 (−1,−1) 那间房，变成 |010⟩、|101⟩ 上的同样两根；另外三间房空着。', 'The middle qubit flips and both lights go on. The two bars of α|000⟩ + β|111⟩ move unchanged into room (−1,−1), the same two bars now on |010⟩ and |101⟩; the other three rooms stay empty.'],
    mix: ['四个分支：不出错 ½、翻第一个 ¼、翻第二个 ⅛、翻第三个 ⅛。柱子宽窄是权重，各进各的房；解码时各自拉回码空间，并排拼成一整根，正好填满虚线。', 'Four branches: no error ½, qubit 1 flipped ¼, qubit 2 ⅛, qubit 3 ⅛. Bar widths are the weights, each branch in its own room; decoding pulls each back into the code space, where they line up into one whole bar that fills the dashed outline.'],
    two: ['逻辑态 |000⟩，第一、二个比特一起翻：只有 g₂ 亮，和只翻第三个一模一样。解码器翻回第三个比特，柱子落到 |111⟩ 上，虚线却在 |000⟩：越纠越错。', 'Logical state |000⟩, qubits 1 and 2 flip together: only g₂ lights up, exactly as if qubit 3 alone had flipped. The decoder flips qubit 3 back and the bar lands on |111⟩, while the dashed outline stands on |000⟩: the fix made it worse.'],
    phase: ['逻辑态 |+⟩，第一个比特翻了相位（品红的 Z）：两盏灯都不亮，柱子没有离开码空间，解码器也不动；可 |111⟩ 那根柱子翻到了轴下，与虚线正好相反。', 'Logical state |+⟩, qubit 1 has its phase flipped (the magenta Z): neither light goes on, the bars never leave the code space and the decoder does nothing; yet the |111⟩ bar has flipped below the axis, exactly opposite the dashed outline.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    S.theta = p.theta; theta.set(p.theta); S.err = { x: p.err.x.slice(), z: p.err.z.slice() }; S.noise = p.noise; noiseChips.set(p.noise, true);
    clock.pause(); clock.set(0);
    // a still (cover, cited figure shot) and the opening view of the full page show the card's key frame;
    // inside a chapter the card plays once the reader has scrolled it into view; a click plays at once
    if (TRV.still || (booting && !TRV.embed)) clock.set(p.still);
    else if (booting) kit.autoplay(clock, $('stage'));
    else clock.play();
  }
  const cards = kit.cards($('presets'), { notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：点比特加错误、换逻辑态、换成四分支混合。随时可以再选一张卡。', 'Free play: click qubits to add errors, change the logical state, switch to the four-branch mixture. Pick a card again at any time.'] });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.SYNDROME_DEBUG = {
    get state() {
      const sm = summary(), [al, be] = amps();
      return {
        preset: cards.current, t: clock.t, playing: clock.playing, step: Math.min(3, Math.floor(clock.t + 1e-9)), theta: S.theta, alpha: al, beta: be,
        noise: S.noise, kind: S.kind, err: { x: S.err.x.slice(), z: S.err.z.slice() },
        branches: sm.brs.map((br) => ({ w: br.w, err: { x: br.err.x.slice(), z: br.err.z.slice() }, syn: br.syn.slice(), room: roomOfSyn(br.syn), fix: br.fix.x.slice(),
          amps: [0, 1, 2, 3].map((k) => { const v = new Array(8).fill(0); for (const tk of br.tokens) v[tk.steps[k].b] += tk.steps[k].a; return v; }) })),
        decoded: sm.M.map((r) => r.slice()), fidelity: sm.fid, trace: sm.tr
      };
    },
    seek: (t) => { clock.pause(); clock.set(t); },
    /** Viewport coordinates of the centre of qubit k. */
    qubit: (k) => { const r = cv.getBoundingClientRect(); return [r.left + box.qx[k], r.top + box.qy]; }
  };
  window.TRV_THUMB = () => { applyPreset('single'); cards.mark('single'); clock.set(2); paint.now(); };
  cards.pick(cards.initial('single'));
  booting = false;
  paint();
})();
