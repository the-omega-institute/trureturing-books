/* ORTHO//QUBIT · 单比特旋子账本 — the Bloch sphere, the Pauli volume element and the spinor double cover.
   A qubit state |ψ(θ, φ)⟩ = (cos(θ/2), e^{iφ} sin(θ/2)) has the Bloch vector r = (sin θ cos φ, sin θ sin φ, cos θ).
   Every gate is drawn as an SU(2) rotor R = w − i b·σ = cos(α/2) − i sin(α/2) n̂·σ (the textbook matrix up to a global
   phase); the ledger left-multiplies the accumulated rotor R ↦ G R and moves the Bloch vector r ↦ G r G†.
   The sign tape records the sign of the scalar part ⟨R⟩₀ = w of the accumulated rotor (when w = 0, the sign of the first
   nonzero b component): a convention that picks one representative of ±R, so H·Z·H ends on −1 because R_H R_Z R_H = −R_X.
   Lean anchors (trureturing, pinned commit): qubit_weyl_star, square_eq_neg_one_of_skewAdjoint_unitary,
   bloch_geometry_of_isHermitian, recordWeight_sum, lagrange_gram_identity. Colours: cyan +, magenta −, amber = now.
   Read-only probe for tests: window.QG_DEBUG (pure maths under QG_DEBUG.math). Thumbnail hook: window.TRV_THUMB. */
(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const L = TRV.L, esc = TRV.esc;
  const MINUS = '−', DEG = Math.PI / 180, R2 = Math.SQRT1_2, TOL = 1e-9;
  const MAXG = 24;

  /* ---------- 2×2 complex algebra (entries are [re, im]) ---------- */
  const C = (re, im = 0) => [re, im];
  const cadd = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const cconj = (a) => [a[0], -a[1]];
  const mmul = (A, B) => [0, 1].map((i) => [0, 1].map((j) => cadd(cmul(A[i][0], B[0][j]), cmul(A[i][1], B[1][j]))));
  const mdag = (A) => [0, 1].map((i) => [0, 1].map((j) => cconj(A[j][i])));
  const mscale = (A, z) => A.map((row) => row.map((x) => cmul(x, z)));
  const mdist = (A, B) => Math.max(...[0, 1].flatMap((i) => [0, 1].map((j) => Math.hypot(A[i][j][0] - B[i][j][0], A[i][j][1] - B[i][j][1]))));
  const I2 = [[C(1), C(0)], [C(0), C(1)]];
  const PAULI = { I: I2, X: [[C(0), C(1)], [C(1), C(0)]], Y: [[C(0), C(0, -1)], [C(0, 1), C(0)]], Z: [[C(1), C(0)], [C(0), C(-1)]] };

  /** Textbook gate matrices; the rotors of GATES equal these up to a global phase. */
  function gateMatrix(name) {
    if (name in PAULI) return PAULI[name];
    if (name === 'H') return [[C(R2), C(R2)], [C(R2), C(-R2)]];
    if (name === 'S') return [[C(1), C(0)], [C(0), C(0, 1)]];
    if (name === 'T') return [[C(1), C(0)], [C(0), C(R2, R2)]];
    return null;
  }
  /** Rotor axes; ĥ = (x̂ + ẑ)/√2 is the Hadamard axis. */
  const AXES = { x: [1, 0, 0], y: [0, 1, 0], z: [0, 0, 1], h: [R2, 0, R2] };
  const AXIS_GLYPH = { x: 'x̂', y: 'ŷ', z: 'ẑ', h: 'ĥ' };
  const C8 = Math.cos(Math.PI / 8), S8 = Math.sin(Math.PI / 8);
  /** Each gate as a rotor R_n̂(angle) with its exact components (w, b₁, b₂, b₃), R = w − i b·σ. */
  const GATES = {
    I: { axis: 'z', angle: 0, rotor: [1, 0, 0, 0], frac: '0' },
    X: { axis: 'x', angle: Math.PI, rotor: [0, 1, 0, 0], frac: 'π' },
    Y: { axis: 'y', angle: Math.PI, rotor: [0, 0, 1, 0], frac: 'π' },
    Z: { axis: 'z', angle: Math.PI, rotor: [0, 0, 0, 1], frac: 'π' },
    H: { axis: 'h', angle: Math.PI, rotor: [0, R2, 0, R2], frac: 'π' },
    S: { axis: 'z', angle: Math.PI / 2, rotor: [R2, 0, 0, R2], frac: 'π/2' },
    T: { axis: 'z', angle: Math.PI / 4, rotor: [C8, 0, 0, S8], frac: 'π/4' }
  };
  const GATE_NAMES = Object.keys(GATES);

  /* ---------- vectors, rotors and spinors ---------- */
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const clean = (x) => (Math.abs(x) < 1e-12 ? 0 : x);
  /** R_n̂(α) = exp(−(α/2)Bₙ) = cos(α/2) − i sin(α/2) n̂·σ as (w, b₁, b₂, b₃). */
  function rotorComponents(axis, angle) { const c = Math.cos(angle / 2), s = Math.sin(angle / 2); return [c, s * axis[0], s * axis[1], s * axis[2]]; }
  /** The 2×2 matrix w·I − i(b₁σ₁ + b₂σ₂ + b₃σ₃). */
  function rotorMatrix([w, b1, b2, b3]) { return [[C(w, -b3), C(-b2, -b1)], [C(b2, -b1), C(w, b3)]]; }
  /** Product of rotors p·q: (p₀q₀ − p·q) − i(p₀q + q₀p + p × q)·σ. */
  function rotorMul(p, q) {
    return [p[0] * q[0] - p[1] * q[1] - p[2] * q[2] - p[3] * q[3],
      p[0] * q[1] + q[0] * p[1] + p[2] * q[3] - p[3] * q[2],
      p[0] * q[2] + q[0] * p[2] + p[3] * q[1] - p[1] * q[3],
      p[0] * q[3] + q[0] * p[3] + p[1] * q[2] - p[2] * q[1]];
  }
  const rotorNorm2 = (q) => q[0] * q[0] + q[1] * q[1] + q[2] * q[2] + q[3] * q[3];
  /** Ad_R v = R (v·σ) R†, for a unit rotor: v + 2w (b × v) + 2 b × (b × v). */
  function rotate(q, v) {
    const b = [q[1], q[2], q[3]], c1 = cross(b, v), c2 = cross(b, c1);
    return [0, 1, 2].map((i) => v[i] + 2 * q[0] * c1[i] + 2 * c2[i]);
  }
  const blochVector = (theta, phi) => [Math.sin(theta) * Math.cos(phi), Math.sin(theta) * Math.sin(phi), Math.cos(theta)];
  function spinorAmplitudes(theta, phi) { const c = Math.cos(theta / 2), s = Math.sin(theta / 2); return [C(c), C(s * Math.cos(phi), s * Math.sin(phi))]; }
  const applyGate2x2 = (M, psi) => [cadd(cmul(M[0][0], psi[0]), cmul(M[0][1], psi[1])), cadd(cmul(M[1][0], psi[0]), cmul(M[1][1], psi[1]))];
  /** r = ψ†σψ = (2 Re ψ̄₀ψ₁, 2 Im ψ̄₀ψ₁, |ψ₀|² − |ψ₁|²) (the Lean bloch map applied to |ψ⟩⟨ψ|). */
  function blochOfSpinor([a, b]) { const ab = cmul(cconj(a), b); return [2 * ab[0], 2 * ab[1], a[0] * a[0] + a[1] * a[1] - b[0] * b[0] - b[1] * b[1]]; }
  /** Born weights of the computational basis, P(k) = |⟨k|ψ⟩|². */
  const bornProbabilities = ([a, b]) => [a[0] * a[0] + a[1] * a[1], b[0] * b[0] + b[1] * b[1]];
  const verifyNorm = (v) => Math.abs(dot(v, v) - 1);
  /** σ₁σ₂σ₃ = i·I₂, and this volume element is skew-adjoint and unitary, so it squares to −I. */
  function verifyPauliVolume() {
    const V = mmul(mmul(PAULI.X, PAULI.Y), PAULI.Z), minusI = mscale(I2, C(-1));
    return { product: V, err: mdist(V, mscale(I2, C(0, 1))), skewErr: mdist(mdag(V), mscale(V, C(-1))),
      unitErr: mdist(mmul(V, mdag(V)), I2), squareErr: mdist(mmul(V, V), minusI) };
  }
  /** H σ₃ H = σ₁ as matrices, and R_H R_Z R_H = −R_X as rotors. */
  function verifyHadamardConjugation() {
    const H = gateMatrix('H'), M = mmul(mmul(H, PAULI.Z), H);
    const rot = rotorMul(GATES.H.rotor, rotorMul(GATES.Z.rotor, GATES.H.rotor)).map(clean);
    const negErr = Math.max(...rot.map((x, i) => Math.abs(x + GATES.X.rotor[i])));
    return { matrix: M, err: mdist(M, PAULI.X), rotor: rot, rotorNegErr: negErr };
  }
  /** R_n̂(2π) = −1 and R_n̂(4π) = +1; the bivector Bₙ = i n̂·σ squares to −I. */
  function verifyDoubleCover(axis) {
    const n = Array.isArray(axis) ? axis : AXES[axis];
    const two = rotorComponents(n, 2 * Math.PI), four = rotorComponents(n, 4 * Math.PI);
    const B = mscale(rotorMatrix([0, ...n]), C(-1)); // −(−i n̂·σ) = i n̂·σ
    return { twoPi: two, fourPi: four,
      errTwoPi: Math.max(Math.abs(two[0] + 1), ...two.slice(1).map(Math.abs)),
      errFourPi: Math.max(Math.abs(four[0] - 1), ...four.slice(1).map(Math.abs)),
      bivectorSquareErr: mdist(mmul(B, B), mscale(I2, C(-1))) };
  }
  /** The sign convention of the tape: sign of w, or of the first nonzero b when w = 0. */
  function spinorSign(q) {
    for (let i = 0; i < 4; i++) if (Math.abs(q[i]) > TOL) return Math.sign(q[i]);
    return 1;
  }
  /** Polar angles (degrees) of a Bloch vector; φ is null at the poles. */
  function polarOf(r) {
    const th = Math.acos(Math.max(-1, Math.min(1, r[2]))) / DEG;
    const ph = Math.hypot(r[0], r[1]) < 1e-9 ? null : ((Math.atan2(r[1], r[0]) / DEG) % 360 + 360) % 360;
    return [th, ph];
  }
  /** Run the circuit |ψ₀⟩ → G₁ → … → Gₖ: per step the Bloch vector, the accumulated rotor, the spinor and the sign. */
  function runCircuit(thetaDeg, phiDeg, gates) {
    const r0 = blochVector(thetaDeg * DEG, phiDeg * DEG).map(clean), psi0 = spinorAmplitudes(thetaDeg * DEG, phiDeg * DEG);
    const steps = [{ k: 0, gate: null, rotor: [1, 0, 0, 0], r: r0, psi: psi0, sign: 1, touched: [] }];
    let acc = [1, 0, 0, 0];
    gates.forEach((g, i) => {
      acc = rotorMul(GATES[g].rotor, acc).map(clean);
      const r = rotate(acc, r0).map(clean), psi = applyGate2x2(rotorMatrix(acc), psi0);
      const before = [...steps[i].r, ...steps[i].rotor], after = [...r, ...acc];
      const touched = after.map((x, j) => (Math.abs(x - before[j]) > 1e-6 ? j : -1)).filter((j) => j >= 0);
      steps.push({ k: i + 1, gate: g, rotor: acc, r, psi, sign: spinorSign(acc), touched });
    });
    return steps;
  }
  /* the phase map: θ = 0°, 5°, …, 180° (rows, north on top) × φ = 0°, 10°, …, 360° (columns) */
  const NT = 37, NP = 37, DT = 5, DP = 10, OBS_IDX = { x: 0, y: 1, z: 2 };
  const phaseValue = (obs, thetaDeg, phiDeg) => blochVector(thetaDeg * DEG, phiDeg * DEG)[OBS_IDX[obs]];

  /* ---------- state ---------- */
  const q = new URLSearchParams(location.search);
  const clampDeg = (x, hi) => Math.max(0, Math.min(hi, Math.round(Number(x)) || 0));
  const parseGates = (s) => String(s || '').toUpperCase().split('').filter((g) => GATE_NAMES.includes(g)).slice(0, MAXG);
  const DEF = { theta: 60, phi: 36, alpha: 240, gates: ['H', 'Z', 'H'] };
  const S = {
    theta: q.has('theta') ? clampDeg(q.get('theta'), 180) : DEF.theta, phi: q.has('phi') ? clampDeg(q.get('phi'), 360) : DEF.phi,
    alpha: q.has('alpha') ? clampDeg(q.get('alpha'), 360) : DEF.alpha, gates: q.has('gates') ? parseGates(q.get('gates')) : DEF.gates.slice(),
    axis: Object.hasOwn(AXES, q.get('axis') || '') ? q.get('axis') : 'z', obs: Object.hasOwn(OBS_IDX, q.get('obs') || '') ? q.get('obs') : 'z',
    pass: 0, playing: false, hover: null
  };
  const cam = { yaw: 0.55, pitch: 0.38 };
  let R = null; // derived data of the current circuit
  let frames = 0, pending = false, built = '';
  const rng = TRV.mulberry32(20261111);
  const keyOf = () => `${S.theta},${S.phi},${S.gates.join('')}`;
  function derive() {
    const steps = runCircuit(S.theta, S.phi, S.gates);
    R = { key: keyOf(), theta: S.theta, phi: S.phi, gates: S.gates.slice(), steps, K: steps.length - 1 };
  }
  const fresh = () => { if (!R || R.key !== keyOf()) derive(); return R; };
  const probeRotor = () => rotorComponents(AXES[S.axis], S.alpha * DEG);

  /* ---------- formatting ---------- */
  const fx = (x, k = 4) => { const s = Math.abs(x).toFixed(k); return (x < 0 && Number(s) !== 0 ? MINUS : '') + s; };
  const fmtSigned = (x) => (x > 0 ? '+' + x : x < 0 ? MINUS + -x : '0');
  const signCls = (x) => (x > TOL ? 'vpos' : x < -TOL ? 'vneg' : 'vzero');
  function fmtCell(x) {
    if (Math.abs(x - Math.round(x)) < 1e-9) { const n = Math.round(x); return n < 0 ? MINUS + -n : String(n); }
    return fx(x, 2);
  }
  const vec = (v, k = 2) => `(${v.map((x) => fx(x, k)).join(', ')})`;
  function gateText(g) {
    const G = GATES[g], ax = AXIS_GLYPH[G.axis], deg = Math.round(G.angle / DEG);
    const code = `${g} ${g === 'I' ? '=' : '≅'} R_${ax}(${G.frac})`;
    if (g === 'I') return { code, name: L('恒等：不转', 'identity: no turn') };
    return { code, name: L(`绕 ${ax} 转 ${deg}°`, `${deg}° about ${ax}`) };
  }

  /* ---------- ledger ---------- */
  const HEAD = [['r₁', '⟨σ₁⟩'], ['r₂', '⟨σ₂⟩'], ['r₃', '⟨σ₃⟩'], ['w', '1'], ['b₁', '−iσ₁'], ['b₂', '−iσ₂'], ['b₃', '−iσ₃']];
  function cells(vals, touched) {
    let h = '';
    vals.forEach((x, j) => {
      const sep = j === 3 ? ' sep' : '';
      if (x === null) { h += `<span class="d0${sep}">·</span>`; return; }
      const cls = (x > TOL ? 'd1' : x < -TOL ? 'd2' : 'd0') + sep + (touched && touched.includes(j) ? ' touch' : '');
      h += `<span class="${cls}">${fmtCell(x)}</span>`;
    });
    return `<div class="cells">${h}</div>`;
  }
  function buildLedger() {
    const rows = [], st = R.steps, K = R.K, r0 = st[0].r;
    rows.push(`<div class="drow hdr" aria-hidden="true"><span class="lab">${L('分量', 'comp.')}</span><div class="cells">${HEAD.map(([a, b], j) => `<span${j === 3 ? ' class="sep"' : ''}>${a}<small>${b}</small></span>`).join('')}</div><span class="what"></span></div>`);
    rows.push(`<div class="drow input" role="listitem"><span class="lab">A</span>${cells([0, 0, 1, null, null, null, null])}<span class="what">A = e₃ ↔ |0⟩ · ${L('参考轴', 'reference axis')}</span></div>`);
    rows.push(`<div class="drow input" role="listitem"><span class="lab">B</span>${cells([...r0, null, null, null, null])}<span class="what">B = r₀ · A·B = ${fx(r0[2], 2)} · ‖A∧B‖ = ${fx(Math.hypot(r0[0], r0[1]), 2)}</span></div>`);
    st.forEach((s, k) => {
      const last = k === K, ok = verifyNorm(s.r) < 1e-9 && Math.abs(rotorNorm2(s.rotor) - 1) < 1e-9;
      const t = k === 0 ? { code: `|ψ₀⟩ = |ψ(${R.theta}°, ${R.phi}°)⟩`, name: L('起点 R = 1', 'start, R = 1') } : gateText(s.gate);
      // the final row trades the gate's wording for the result: the Bloch vector and the spinor sign
      const tail = last ? `${k ? '' : ' · '}r = (${s.r.map((x) => fx(x, 2)).join(',')}), s = ${fmtSigned(s.sign)} <span class="${ok ? 'okmark' : 'badmark'}">${ok ? '✓' : '✗'}</span>` : '';
      rows.push(`<div class="drow ${k === 0 ? 'sum' : 'pass'}${last ? ' final' : ''}" role="listitem" data-pass="${k}"><span class="lab">#${k}</span>${cells([...s.r, ...s.rotor], s.touched)}<span class="what"><span class="sgn ${s.sign > 0 ? 'pos' : 'neg'}">${fmtSigned(s.sign)}</span><code>${t.code}</code><span class="name">${last && k ? '' : esc(t.name)}${tail}</span></span></div>`);
    });
    $('ledger').innerHTML = rows.join('');
    $('tape').innerHTML = st.slice(1).map((s) => `<i class="${s.sign > 0 ? 'pos' : 'neg'}" data-pass="${s.k}" title="#${s.k} s = ${fmtSigned(s.sign)}"></i>`).join('');
  }
  function markLedger() {
    const K = R.K;
    $('ledger').querySelectorAll('.drow[data-pass]').forEach((row) => {
      const k = +row.dataset.pass;
      row.classList.toggle('now', k === S.pass);
      row.classList.toggle('future', k > S.pass);
      row.setAttribute('aria-current', k === S.pass ? 'step' : 'false');
    });
    $('tape').querySelectorAll('i').forEach((t) => { const k = +t.dataset.pass; t.classList.toggle('now', k === S.pass); t.classList.toggle('future', k > S.pass); });
    const cur = R.steps[S.pass], fin = R.steps[K];
    $('tapeSum').innerHTML = K
      ? `${L('至第', 'to step')} ${S.pass}${L(' 步', '')}: s = <span class="${signCls(cur.sign)}">${fmtSigned(cur.sign)}</span> · ${L('终态', 'final')} s = <span class="${signCls(fin.sign)}">${fmtSigned(fin.sign)}</span>`
      : `${L('无门', 'no gates')} · s = <span class="vpos">+1</span>`;
    $('pass').max = String(Math.max(1, K));
    $('pass').value = String(S.pass);
    $('pass').disabled = K === 0;
    $('passLabel').innerHTML = `${L('第', 'STEP ')}${S.pass}${L(' 步', '')} <small>/ ${K}</small>`;
    $('prev').disabled = $('first').disabled = S.pass === 0;
    $('next').disabled = $('last').disabled = S.pass >= K;
    $('play').disabled = K === 0;
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
    const D = R, cur = D.steps[S.pass], fin = D.steps[D.K], r = cur.r, [p0, p1] = bornProbabilities(cur.psi), [th] = polarOf(r);
    const comp = (x, sub) => `<span class="${signCls(x)}">${fx(x)}</span><span class="sub">${sub}</span>`;
    $('roRx').innerHTML = comp(r[0], 'sin θ cos φ');
    $('roRy').innerHTML = comp(r[1], 'sin θ sin φ');
    $('roRz').innerHTML = comp(r[2], 'cos θ = A·B');
    const sumOk = Math.abs(p0 + p1 - 1) < 1e-9 && Math.abs(p0 - (1 + r[2]) / 2) < 1e-9;
    $('roP0').innerHTML = `${fx(p0)}<span class="sub">θ = ${th.toFixed(1)}°</span>`;
    $('roP1').innerHTML = `${fx(p1)}<span class="sub">P(0)+P(1) = ${fx(p0 + p1)} <span class="${sumOk ? 'okmark' : 'badmark'}">${sumOk ? '✓' : '✗'}</span></span>`;
    const pr = probeRotor(), tr = 2 * pr[0], ax = AXIS_GLYPH[S.axis];
    $('roTr').innerHTML = `<span class="${signCls(tr)}">${fx(tr)}</span><span class="sub">⟨R⟩₀ = ${fx(pr[0])}</span>`;
    const vol = verifyPauliVolume(), n2 = dot(r, r), rr = rotorNorm2(cur.rotor);
    const heroOk = vol.err < 1e-12 && vol.squareErr < 1e-12 && Math.abs(n2 - 1) < 1e-9 && Math.abs(rr - 1) < 1e-9;
    $('roHeroSub').textContent = `‖r‖² = ${fx(n2)} · R R† = ${fmtCell(rr)} · (σ₁σ₂σ₃)² = ${MINUS}I`;
    $('roHeroOk').className = heroOk ? 'okmark' : 'badmark';
    $('roHeroOk').textContent = heroOk ? '✓' : '✗';
    const h = verifyHadamardConjugation(), hOk = h.err < 1e-12 && h.rotorNegErr < 1e-12;
    $('roHZH').innerHTML = `<b class="vpos">H σ₃ H = σ₁</b> <span class="${hOk ? 'okmark' : 'badmark'}">${hOk ? '✓' : '✗'}</span>`
      + `<span class="sub">R_H R_Z R_H = ${MINUS}R_X · ${L('同一转动，旋量差一个 −1', 'the same turn, the spinor differs by −1')}</span>`;
    const dc = verifyDoubleCover(S.axis), dOk = dc.errTwoPi < 1e-12 && dc.errFourPi < 1e-12 && dc.bivectorSquareErr < 1e-12;
    $('roTwoPi').innerHTML = `<b class="vneg">R_${ax}(2π) = ${MINUS}1</b> <span class="${dOk ? 'okmark' : 'badmark'}">${dOk ? '✓' : '✗'}</span>`
      + `<span class="sub">R_${ax}(4π) = +1 · B_${ax}² = ${MINUS}I · ${L('矢量转 360° 已回到原处', 'the vector is back after 360°')}</span>`;
    let flips = 0;
    for (let k = 1; k <= D.K; k++) if (D.steps[k].sign !== D.steps[k - 1].sign) flips++;
    const path = D.gates.length ? D.gates.join(' → ') : '—';
    $('roNote').textContent = L(
      `线路 |ψ₀⟩ → ${path}：${D.K} 个门，旋量 ${flips} 次换叶；终态 s = ${fmtSigned(fin.sign)}。读数是第 ${S.pass} 步的态。`,
      `Circuit |ψ₀⟩ → ${path}: ${D.K} gate${D.K === 1 ? '' : 's'}, ${flips} sheet change${flips === 1 ? '' : 's'}; final s = ${fmtSigned(fin.sign)}. The readouts show the state at step ${S.pass}.`);
    $('pillPair').innerHTML = `θ, φ <strong>${S.theta}°, ${S.phi}°</strong>`;
    $('pillPasses').innerHTML = `${L('门', 'GATES')} <strong>${D.K}</strong>`;
    $('pillC').innerHTML = `s <strong class="${signCls(fin.sign)}">${fmtSigned(fin.sign)}</strong>`;
    $('hudBig').textContent = `${L('第', 'STEP ')}${S.pass}${L(' 步', '')} / ${D.K}`;
    $('hudSub').textContent = `r = ${vec(r)} · ${L('探针', 'probe')} R_${ax}(${S.alpha}°)`;
  }

  /* ---------- Bloch stage ---------- */
  const stageCv = $('blochCanvas');
  function projector(cx, cy, rad) {
    const cyw = Math.cos(cam.yaw), syw = Math.sin(cam.yaw), cp = Math.cos(cam.pitch), sp = Math.sin(cam.pitch);
    const right = [-syw, cyw, 0], up = [-sp * cyw, -sp * syw, cp], fwd = [cp * cyw, cp * syw, sp];
    return (v) => ({ x: cx + rad * dot(v, right), y: cy - rad * dot(v, up), z: dot(v, fwd) });
  }
  function drawStage() {
    TRV.fitCanvas(stageCv);
    const ctx = stageCv.getContext('2d'), W = stageCv.width, H = stageCv.height, pal = TRV.palette, u = H / 220;
    const D = fresh(), cur = D.steps[S.pass], r = cur.r;
    ctx.fillStyle = pal.stage; ctx.fillRect(0, 0, W, H);
    const dialW = Math.min(W * 0.34, 260 * u), sx0 = W - dialW;
    const rad = Math.min(H * 0.33, sx0 * 0.34), cx = sx0 * 0.58, cy = H * 0.58;
    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad * 2);
    glow.addColorStop(0, TRV.alpha(pal.cyan, 0.08)); glow.addColorStop(1, TRV.alpha(pal.cyan, 0));
    ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);
    const P = projector(cx, cy, rad);
    const seg = (pts, front, back) => {
      for (let i = 0; i + 1 < pts.length; i++) {
        const a = pts[i], b = pts[i + 1], st = a.z + b.z >= 0 ? front : back;
        if (!st) continue;
        ctx.strokeStyle = st[0]; ctx.lineWidth = st[1]; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
    };
    const sample = (f, n) => { const pts = []; for (let i = 0; i <= n; i++) pts.push(P(f(i / n))); return pts; };
    // sphere, equator and the meridian of the current state
    ctx.strokeStyle = pal.lineHot; ctx.lineWidth = 1.3 * u; ctx.beginPath(); ctx.arc(cx, cy, rad, 0, 2 * Math.PI); ctx.stroke();
    seg(sample((t) => [Math.cos(2 * Math.PI * t), Math.sin(2 * Math.PI * t), 0], 96), [TRV.alpha(pal.lineHot, 0.9), 1.1 * u], [TRV.alpha(pal.lineHot, 0.35), 0.8 * u]);
    const mphi = Math.atan2(r[1], r[0]);
    seg(sample((t) => [Math.sin(Math.PI * t) * Math.cos(mphi), Math.sin(Math.PI * t) * Math.sin(mphi), Math.cos(Math.PI * t)], 64), [TRV.alpha(pal.faint, 0.9), 1 * u], [TRV.alpha(pal.faint, 0.4), 0.8 * u]);
    // axes and their tips
    ctx.font = `${9.5 * u}px ${TRV.fonts.data}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (const [k, v] of [['x', [1, 0, 0]], ['y', [0, 1, 0]], ['z', [0, 0, 1]]]) {
      const a = P(v.map((c) => -1.12 * c)), b = P(v.map((c) => 1.12 * c));
      ctx.strokeStyle = TRV.alpha(pal.dim, 0.45); ctx.lineWidth = 1 * u; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      if (k === 'z') continue; // ẑ is the vertical axis; no glyph near the HUD
      const tip = P(v.map((c) => 1.26 * c));
      ctx.fillStyle = pal.dim; ctx.fillText(k, tip.x, tip.y);
    }
    // probe axis n̂
    const n = AXES[S.axis], na = P(n.map((c) => -1.2 * c)), nb = P(n.map((c) => 1.2 * c));
    ctx.strokeStyle = TRV.alpha(pal.cyan, 0.55); ctx.lineWidth = 1.2 * u; ctx.setLineDash([4 * u, 4 * u]);
    ctx.beginPath(); ctx.moveTo(na.x, na.y); ctx.lineTo(nb.x, nb.y); ctx.stroke(); ctx.setLineDash([]);
    // the pairwise geometric product of A = e₃ and B = r: the projection A·B (cyan) and the face A∧B (violet)
    const o = P([0, 0, 0]), s = 0.62, pz = P([0, 0, r[2]]);
    const fa = P([0, 0, s]), fab = P([s * r[0], s * r[1], s * (1 + r[2])]), fb = P(r.map((c) => s * c));
    ctx.fillStyle = TRV.alpha(pal.violet, 0.2); ctx.strokeStyle = TRV.alpha(pal.violet, 0.85); ctx.lineWidth = 1.2 * u;
    ctx.beginPath(); ctx.moveTo(o.x, o.y); ctx.lineTo(fa.x, fa.y); ctx.lineTo(fab.x, fab.y); ctx.lineTo(fb.x, fb.y); ctx.closePath(); ctx.fill(); ctx.stroke();
    const tipR = P(r);
    ctx.strokeStyle = TRV.alpha(pal.violet, 0.8); ctx.setLineDash([3 * u, 3 * u]);
    ctx.beginPath(); ctx.moveTo(pz.x, pz.y); ctx.lineTo(tipR.x, tipR.y); ctx.stroke(); ctx.setLineDash([]);
    ctx.strokeStyle = pal.cyan; ctx.lineWidth = 3 * u; ctx.beginPath(); ctx.moveTo(o.x, o.y); ctx.lineTo(pz.x, pz.y); ctx.stroke();
    // the circuit: one arc per gate, from r_{k−1} about the gate axis
    for (let k = 1; k <= D.K; k++) {
      const G = GATES[D.steps[k].gate], from = D.steps[k - 1].r, ax = AXES[G.axis];
      if (G.angle === 0) continue;
      const pts = sample((t) => rotate(rotorComponents(ax, t * G.angle), from), 40);
      const done = k <= S.pass;
      ctx.strokeStyle = TRV.alpha(pal.cyan, done ? 0.8 : 0.18); ctx.lineWidth = (done ? 1.6 : 1.1) * u;
      ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y))); ctx.stroke();
    }
    const p0 = P(D.steps[0].r);
    ctx.strokeStyle = pal.sigma; ctx.lineWidth = 1.4 * u; ctx.beginPath(); ctx.arc(p0.x, p0.y, 4.5 * u, 0, 2 * Math.PI); ctx.stroke();
    // the probe rotor Rₙ(α) acting on the current state
    const probePts = sample((t) => rotate(rotorComponents(n, t * S.alpha * DEG), r), 72), ghost = probePts[probePts.length - 1];
    ctx.strokeStyle = TRV.alpha(pal.cyan, 0.75); ctx.lineWidth = 1.3 * u; ctx.setLineDash([3 * u, 3 * u]);
    ctx.beginPath(); probePts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y))); ctx.stroke(); ctx.setLineDash([]);
    ctx.strokeStyle = pal.cyan; ctx.lineWidth = 1.6 * u; ctx.beginPath(); ctx.arc(ghost.x, ghost.y, 3.6 * u, 0, 2 * Math.PI); ctx.stroke();
    // the state at the current step (amber = now)
    ctx.strokeStyle = pal.amber; ctx.lineWidth = 2.4 * u; ctx.shadowColor = pal.amber; ctx.shadowBlur = 10 * u;
    ctx.beginPath(); ctx.moveTo(o.x, o.y); ctx.lineTo(tipR.x, tipR.y); ctx.stroke();
    ctx.fillStyle = pal.amber; ctx.beginPath(); ctx.arc(tipR.x, tipR.y, 4.2 * u, 0, 2 * Math.PI); ctx.fill(); ctx.shadowBlur = 0;
    // two dials: the vector turns by α (SO(3)), the spinor by α/2 (SU(2)); the dot on the right dial is ⟨R⟩₀ = cos(α/2)
    const dr = Math.min(H * 0.2, dialW * 0.2), dy = H * 0.6, a = S.alpha * DEG, w = Math.cos(a / 2);
    const dials = [[sx0 + dialW * 0.27, a, pal.cyan], [sx0 + dialW * 0.73, a / 2, w >= -TOL ? pal.cyan : pal.magenta]];
    ctx.font = `${10 * u}px ${TRV.fonts.data}`; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    dials.forEach(([dx, ang, col], i) => {
      ctx.strokeStyle = pal.lineHot; ctx.lineWidth = 1.2 * u; ctx.beginPath(); ctx.arc(dx, dy, dr, 0, 2 * Math.PI); ctx.stroke();
      if (ang > 1e-6) { ctx.strokeStyle = col; ctx.lineWidth = 3 * u; ctx.beginPath(); ctx.arc(dx, dy, dr, -Math.PI / 2, -Math.PI / 2 + ang); ctx.stroke(); }
      ctx.strokeStyle = col; ctx.lineWidth = 1.8 * u; ctx.beginPath(); ctx.moveTo(dx, dy); ctx.lineTo(dx + dr * Math.sin(ang), dy - dr * Math.cos(ang)); ctx.stroke();
      ctx.fillStyle = pal.dim; ctx.fillText(i ? 'α/2' : 'α', dx, dy + dr + 6 * u);
      if (i) {
        ctx.strokeStyle = TRV.alpha(pal.dim, 0.5); ctx.lineWidth = 1 * u; ctx.beginPath(); ctx.moveTo(dx, dy - dr); ctx.lineTo(dx, dy + dr); ctx.stroke();
        ctx.fillStyle = col; ctx.beginPath(); ctx.arc(dx, dy - dr * w, 3.4 * u, 0, 2 * Math.PI); ctx.fill();
      }
    });
  }
  let drag = null;
  stageCv.addEventListener('pointerdown', (ev) => { drag = [ev.clientX, ev.clientY]; stageCv.setPointerCapture(ev.pointerId); });
  stageCv.addEventListener('pointermove', (ev) => {
    if (!drag) return;
    cam.yaw -= (ev.clientX - drag[0]) * 0.01;
    cam.pitch = Math.max(-1.2, Math.min(1.2, cam.pitch + (ev.clientY - drag[1]) * 0.01));
    drag = [ev.clientX, ev.clientY]; schedule();
  });
  const endDrag = () => { drag = null; };
  stageCv.addEventListener('pointerup', endDrag);
  stageCv.addEventListener('pointercancel', endDrag);
  stageCv.addEventListener('dblclick', () => { cam.yaw = 0.55; cam.pitch = 0.38; schedule(); });

  /* ---------- phase map ---------- */
  const heat = $('heat');
  let geom = null, counts = null, countsObs = '';
  const rgb255 = (name) => TRV.rgb[name].map((x) => Math.round(x * 255));
  const mix = (a, b, t) => a.map((x, k) => Math.round(x + (b[k] - x) * t));
  function phaseColors() {
    const st = rgb255('stage'), lh = rgb255('lineHot');
    const Z = st.map((x, k) => Math.round(x * 0.55 + lh[k] * 0.45));
    return { P: rgb255('cyan'), M: rgb255('magenta'), Z };
  }
  const shade = (v, c) => `rgb(${v >= 0 ? mix(c.Z, c.P, Math.min(1, v)) : mix(c.Z, c.M, Math.min(1, -v))})`;
  let base = null; // cached cells and ticks: { key, canvas }
  function drawBase(Wc, Hc, dpr, g) {
    const cv = document.createElement('canvas'); cv.width = Wc; cv.height = Hc;
    const ctx = cv.getContext('2d'), { ox, oy, s } = g, col = phaseColors();
    ctx.fillStyle = TRV.palette.stage; ctx.fillRect(0, 0, Wc, Hc);
    const gap = s >= 5 * dpr ? Math.max(1, Math.round(s * 0.1)) : 0;
    for (let i = 0; i < NT; i++) for (let j = 0; j < NP; j++) {
      ctx.fillStyle = shade(phaseValue(S.obs, i * DT, j * DP), col);
      ctx.fillRect(ox + j * s, oy + i * s, s - gap, s - gap);
    }
    ctx.font = `${10 * dpr}px ${TRV.fonts.data}`; ctx.fillStyle = TRV.palette.dim;
    ctx.textBaseline = 'top'; ctx.textAlign = 'center';
    for (const f of [0, 90, 180, 270, 360]) ctx.fillText(`${f}°`, ox + (f / DP + 0.5) * s, oy + NT * s + 5 * dpr);
    ctx.textBaseline = 'middle'; ctx.textAlign = 'right';
    for (const t of [0, 45, 90, 135, 180]) ctx.fillText(`${t}°`, ox - 5 * dpr, oy + (t / DT + 0.5) * s);
    return cv;
  }
  /** Map points (θ, φ) of the circuit's states; φ at a pole is carried over from the previous point. */
  function pathPoints() {
    let last = S.phi;
    return R.steps.map((st) => { const [th, ph] = polarOf(st.r); if (ph !== null) last = ph; return [th, last]; });
  }
  /** The arc each gate traces on the map: r_{k−1} turned about the gate axis by t·angle, t ∈ [0, 1]. */
  function pathArcs() {
    const arcs = [];
    for (let k = 1; k <= R.K; k++) {
      const G = GATES[R.steps[k].gate], from = R.steps[k - 1].r, pts = [];
      if (G.angle > 0) for (let i = 0; i <= 32; i++) pts.push(polarOf(rotate(rotorComponents(AXES[G.axis], (i / 32) * G.angle), from)));
      arcs.push(pts);
    }
    return arcs;
  }
  function drawPath(ctx, at, lw, upto) {
    ctx.lineWidth = lw;
    pathArcs().forEach((pts, i) => {
      ctx.strokeStyle = TRV.alpha(TRV.palette.ink, i + 1 <= upto ? 0.7 : 0.18);
      ctx.beginPath();
      let prev = null;
      for (const [th, ph] of pts) {
        if (ph === null) { prev = null; continue; }
        const [x, y] = at([th, ph]);
        if (prev === null || Math.abs(ph - prev) > 180) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        prev = ph;
      }
      ctx.stroke();
    });
    pathPoints().forEach((p, k) => { const [x, y] = at(p); ctx.fillStyle = TRV.alpha(TRV.palette.ink, k <= upto ? 0.9 : 0.25); ctx.beginPath(); ctx.arc(x, y, lw * 1.4, 0, 2 * Math.PI); ctx.fill(); });
  }
  function drawHeat() {
    if (TRV.thumbMode) { drawCover(); return; }
    const dpr = TRV.fitCanvas(heat), ctx = heat.getContext('2d');
    const Wc = heat.width, Hc = heat.height;
    const pad = { l: 34 * dpr, r: 8 * dpr, t: 8 * dpr, b: 22 * dpr };
    const pw = Wc - pad.l - pad.r, ph = Hc - pad.t - pad.b, s = Math.min(pw / NP, ph / NT);
    const ox = pad.l + Math.max(0, (pw - NP * s) / 2), oy = pad.t + Math.max(0, (ph - NT * s) / 2);
    geom = { ox, oy, s, dpr };
    const key = `${Wc}x${Hc}@${dpr}:${S.obs}`;
    if (!base || base.key !== key) base = { key, canvas: drawBase(Wc, Hc, dpr, geom) };
    ctx.clearRect(0, 0, Wc, Hc);
    ctx.drawImage(base.canvas, 0, 0);
    const at = ([th, ph]) => [ox + (ph / DP + 0.5) * s, oy + (th / DT + 0.5) * s];
    const pts = pathPoints();
    drawPath(ctx, at, 1.2 * dpr, S.pass);
    const [ix, iy] = at([S.theta, S.phi]);
    ctx.strokeStyle = TRV.palette.sigma; ctx.lineWidth = 1.5 * dpr; ctx.beginPath(); ctx.arc(ix, iy, Math.max(s * 0.7, 4 * dpr), 0, 2 * Math.PI); ctx.stroke();
    // the state at the current step: amber cross and box
    const [px, py] = at(pts[S.pass]), box = Math.max(s, 8 * dpr);
    ctx.strokeStyle = TRV.alpha(TRV.palette.amber, 0.45); ctx.lineWidth = Math.max(1, dpr);
    ctx.beginPath(); ctx.moveTo(px, oy); ctx.lineTo(px, oy + NT * s); ctx.moveTo(ox, py); ctx.lineTo(ox + NP * s, py); ctx.stroke();
    ctx.strokeStyle = TRV.palette.amber; ctx.lineWidth = 2 * dpr; ctx.shadowColor = TRV.palette.amber; ctx.shadowBlur = 10 * dpr;
    ctx.strokeRect(px - box / 2, py - box / 2, box, box); ctx.shadowBlur = 0;
    const obsName = `⟨σ_${S.obs}⟩`;
    if (countsObs !== S.obs) {
      const k = { neg: 0, zero: 0, pos: 0, bad: 0 };
      for (let i = 0; i < NT; i++) for (let j = 0; j < NP; j++) {
        const th = i * DT * DEG, ph = j * DP * DEG, v = phaseValue(S.obs, i * DT, j * DP);
        const [p0, p1] = bornProbabilities(spinorAmplitudes(th, ph));
        if (Math.abs(p0 + p1 - 1) > 1e-12 || verifyNorm(blochVector(th, ph)) > 1e-12 || Math.abs(v) > 1 + 1e-12) k.bad++;
        if (v > TOL) k.pos++; else if (v < -TOL) k.neg++; else k.zero++;
      }
      counts = k; countsObs = S.obs;
    }
    const k = counts, ok = k.bad === 0;
    $('heatCounts').innerHTML = `${obsName} <span class="vneg">&lt; 0</span>: ${k.neg} · <span class="vzero">= 0</span>: ${k.zero} · <span class="vpos">&gt; 0</span>: ${k.pos} — `
      + L(`全部 ${NT * NP} 格 P(0) + P(1) = 1、‖r‖ = 1 `, `all ${NT * NP} cells have P(0) + P(1) = 1 and ‖r‖ = 1 `) + `<span class="${ok ? 'okmark' : 'badmark'}">${ok ? '✓' : '✗'}</span>`;
    $('heatRange').textContent = '180° × 360°';
    const hv = S.hover;
    if (hv) {
      const v = phaseValue(S.obs, hv[0], hv[1]), p0 = Math.cos(hv[0] * DEG / 2) ** 2;
      $('heatHover').innerHTML = `${L('指针', 'pointer')} (θ, φ) = (${hv[0]}°, ${hv[1]}°) → ${obsName} = <span class="${signCls(v)}">${fx(v, 3)}</span> · P(0) = ${fx(p0, 3)}`;
    } else $('heatHover').innerHTML = '&nbsp;';
  }
  /** Thumbnail cover (?thumb=1): the ⟨σ_z⟩ phase map beside the rotor ledger of the current circuit. No words, so one
      cover serves both languages; only digits, signs and row labels. */
  function drawCover() {
    TRV.fitCanvas(heat);
    const ctx = heat.getContext('2d'), Wc = heat.width, Hc = heat.height;
    const u = Hc / 720, pal = TRV.palette, mono = TRV.fonts.data;
    geom = null;
    ctx.fillStyle = pal.stage; ctx.fillRect(0, 0, Wc, Hc);
    const glow = ctx.createRadialGradient(Wc * 0.28, Hc * 0.5, 0, Wc * 0.28, Hc * 0.5, Wc * 0.55);
    glow.addColorStop(0, TRV.alpha(pal.cyan, 0.08)); glow.addColorStop(1, TRV.alpha(pal.cyan, 0));
    ctx.fillStyle = glow; ctx.fillRect(0, 0, Wc, Hc);
    // the phase map
    const side = 600 * u, s = side / NT, ox = 64 * u, oy = (Hc - side) / 2, gap = Math.max(1, s * 0.12), col = phaseColors();
    for (let i = 0; i < NT; i++) for (let j = 0; j < NP; j++) {
      ctx.fillStyle = shade(phaseValue(S.obs, i * DT, j * DP), col);
      ctx.fillRect(ox + j * s, oy + i * s, s - gap, s - gap);
    }
    const D = fresh(), at = ([th, ph]) => [ox + (ph / DP + 0.5) * s - gap / 2, oy + (th / DT + 0.5) * s - gap / 2];
    const pts = pathPoints();
    drawPath(ctx, at, 2 * u, S.pass);
    const [px, py] = at(pts[S.pass]);
    ctx.strokeStyle = TRV.alpha(pal.amber, 0.5); ctx.lineWidth = 1.5 * u;
    ctx.beginPath(); ctx.moveTo(px, oy); ctx.lineTo(px, oy + side); ctx.moveTo(ox, py); ctx.lineTo(ox + side, py); ctx.stroke();
    ctx.strokeStyle = pal.amber; ctx.lineWidth = 3 * u; ctx.shadowColor = pal.amber; ctx.shadowBlur = 16 * u;
    ctx.strokeRect(px - s * 0.75, py - s * 0.75, s * 1.5, s * 1.5); ctx.shadowBlur = 0;
    // the rotor ledger
    const r0 = D.steps[0].r;
    const rows = [{ lab: 'A', v: [0, 0, 1, null, null, null, null] }, { lab: 'B', v: [...r0, null, null, null, null] },
      ...D.steps.map((st, k) => ({ lab: '#' + k, v: [...st.r, ...st.rotor], sign: st.sign, touched: st.touched, sep: k === 0 }))];
    const rowH = Math.min(50 * u, side / rows.length), x0 = 760 * u, labW = 58 * u, split = 10 * u;
    const cellW = Math.min(52 * u, (Wc - x0 - labW - split - 104 * u) / 7), cellH = rowH * 0.8;
    const cellX = (j) => x0 + labW + j * cellW + (j >= 3 ? split : 0), rowEnd = cellX(7);
    const y0 = oy + (side - rows.length * rowH) / 2;
    ctx.textBaseline = 'middle';
    rows.forEach((row, k) => {
      const y = y0 + k * rowH, cy = y + rowH / 2, last = k === rows.length - 1;
      if (row.sep) { ctx.strokeStyle = pal.lineHot; ctx.lineWidth = 1 * u; ctx.setLineDash([4 * u, 4 * u]); ctx.beginPath(); ctx.moveTo(x0, y + 1); ctx.lineTo(rowEnd + 90 * u, y + 1); ctx.stroke(); ctx.setLineDash([]); }
      ctx.font = `${15 * u}px ${mono}`; ctx.fillStyle = last ? pal.amber : pal.dim; ctx.textAlign = 'left';
      ctx.fillText(row.lab, x0, cy);
      ctx.textAlign = 'center';
      row.v.forEach((v, j) => {
        const x = cellX(j), t = row.touched && row.touched.includes(j), by = y + (rowH - cellH) / 2;
        if (v !== null && Math.abs(v) > TOL) { ctx.fillStyle = TRV.alpha(v < 0 ? pal.magenta : pal.cyan, v < 0 ? 0.2 : 0.14); ctx.fillRect(x + 2 * u, by + 2 * u, cellW - 4 * u, cellH - 4 * u); }
        if (t) { ctx.strokeStyle = last ? pal.amber : TRV.alpha(pal.cyan, 0.5); ctx.lineWidth = 1.5 * u; ctx.strokeRect(x + 2 * u, by + 2 * u, cellW - 4 * u, cellH - 4 * u); }
        ctx.font = `${v !== null && v < -TOL ? 600 : 400} ${15 * u}px ${mono}`;
        ctx.fillStyle = v === null || Math.abs(v) <= TOL ? pal.faint : v < 0 ? pal.magenta : last && t ? pal.amber : pal.ink;
        ctx.fillText(v === null ? '·' : fmtCell(v), x + cellW / 2, cy + 1 * u);
      });
      if (row.sign !== undefined) {
        const bx = rowEnd + 22 * u, c = row.sign > 0 ? pal.cyan : pal.magenta;
        ctx.strokeStyle = c; ctx.lineWidth = 1.5 * u; ctx.strokeRect(bx, cy - 13 * u, 56 * u, 26 * u);
        ctx.font = `600 ${15 * u}px ${mono}`; ctx.fillStyle = c; ctx.fillText(fmtSigned(row.sign), bx + 28 * u, cy + 1 * u);
      }
      if (last) {
        ctx.strokeStyle = pal.amber; ctx.lineWidth = 2 * u; ctx.shadowColor = pal.amber; ctx.shadowBlur = 12 * u;
        ctx.strokeRect(x0 - 12 * u, y + 2 * u, rowEnd - x0 + 112 * u, rowH - 4 * u); ctx.shadowBlur = 0;
      }
    });
  }
  function cellAt(ev) {
    if (!geom) return null;
    const rc = heat.getBoundingClientRect(), dpr = geom.dpr;
    const px = (ev.clientX - rc.left) * dpr, py = (ev.clientY - rc.top) * dpr;
    const j = Math.floor((px - geom.ox) / geom.s), i = Math.floor((py - geom.oy) / geom.s);
    return i >= 0 && j >= 0 && i < NT && j < NP ? [i * DT, j * DP] : null;
  }
  let dragging = false, downAt = null;
  heat.addEventListener('pointerdown', (ev) => {
    downAt = [ev.clientX, ev.clientY];
    if (ev.pointerType === 'mouse') { dragging = true; heat.setPointerCapture(ev.pointerId); const c = cellAt(ev); if (c) setInput(c[0], c[1]); }
  });
  heat.addEventListener('pointermove', (ev) => {
    const c = cellAt(ev);
    S.hover = c; if (dragging && c) setInput(c[0], c[1]); else schedule();
  });
  heat.addEventListener('pointerup', (ev) => {
    if (!dragging && downAt && Math.hypot(ev.clientX - downAt[0], ev.clientY - downAt[1]) < 8) { const c = cellAt(ev); if (c) setInput(c[0], c[1]); }
    dragging = false; downAt = null;
  });
  heat.addEventListener('pointercancel', () => { dragging = false; downAt = null; });
  heat.addEventListener('pointerleave', () => { S.hover = null; schedule(); });

  /* ---------- render loop (batched in one animation frame) ---------- */
  function render() {
    pending = false;
    const key = `${keyOf()},${TRV.lang()}`;
    if (key !== built) { fresh(); buildLedger(); built = key; }
    markLedger(); readouts();
    // a number box being typed into keeps its text until its own change event (renders also run during playback)
    for (const k of ['theta', 'phi', 'alpha']) {
      $(k).value = String(S[k]);
      if (document.activeElement !== $(k + 'Num')) $(k + 'Num').value = String(S[k]);
    }
    $('thetaDec').disabled = S.theta <= 0; $('thetaInc').disabled = S.theta >= 180;
    $('phiDec').disabled = S.phi <= 0; $('phiInc').disabled = S.phi >= 360;
    $('alphaDec').disabled = S.alpha <= 0; $('alphaInc').disabled = S.alpha >= 360;
    const cur = `${S.theta},${S.phi}|${S.gates.join(',')}`;
    document.querySelectorAll('#presets [data-preset]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.preset === cur)));
    document.querySelectorAll('#nChips [data-obs]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.obs === S.obs)));
    document.querySelectorAll('#viewChips [data-axis]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.axis === S.axis)));
    $('play').setAttribute('aria-pressed', String(S.playing));
    $('play').textContent = S.playing ? '❚❚' : '▶';
    drawStage();
    drawHeat();
    frames++;
  }
  function schedule() { if (!pending) { pending = true; requestAnimationFrame(render); } }

  function setCircuit(theta, phi, gates) {
    theta = clampDeg(theta, 180); phi = clampDeg(phi, 360);
    gates = gates.filter((g) => GATE_NAMES.includes(g)).slice(0, MAXG);
    if (theta === S.theta && phi === S.phi && gates.join('') === S.gates.join('')) { schedule(); return; }
    S.theta = theta; S.phi = phi; S.gates = gates;
    stop();
    S.pass = fresh().K; // show the finished circuit; step back with ◀
    schedule();
  }
  const setInput = (theta, phi) => setCircuit(theta, phi, S.gates);
  function appendGate(g) {
    if (S.gates.length >= MAXG) { TRV.toast($('toast'), L(`最多 ${MAXG} 个门`, `At most ${MAXG} gates`)); return; }
    setCircuit(S.theta, S.phi, [...S.gates, g]);
  }
  const undoGate = () => { if (S.gates.length) setCircuit(S.theta, S.phi, S.gates.slice(0, -1)); };
  const setAlpha = (a) => { S.alpha = clampDeg(a, 360); schedule(); };
  const K = () => fresh().K;
  function setPass(k) { S.pass = Math.max(0, Math.min(K(), k)); schedule(); }
  function randomCircuit() {
    const pool = ['X', 'Y', 'Z', 'H', 'S', 'T'], n = 1 + Math.floor(rng() * 6), gates = [];
    for (let k = 0; k < n; k++) gates.push(pool[Math.floor(rng() * pool.length)]);
    setCircuit(Math.floor(rng() * 181), Math.floor(rng() * 360), gates);
  }
  function resetAll() {
    S.alpha = DEF.alpha; S.axis = 'z'; S.obs = 'z'; cam.yaw = 0.55; cam.pitch = 0.38;
    setCircuit(DEF.theta, DEF.phi, DEF.gates.slice());
    S.pass = K(); schedule();
  }

  /* ---------- playback ---------- */
  let timer = null;
  function stop() { if (timer) clearInterval(timer); timer = null; S.playing = false; }
  function play() {
    if (!K()) return;
    if (S.pass >= K()) S.pass = 0;
    S.playing = true;
    timer = setInterval(() => {
      if (S.pass >= K()) {
        stop();
        const s = fmtSigned(R.steps[K()].sign);
        TRV.toast($('toast'), L(`线路完成：${K()} 个门，旋量符号 <b>${s}</b>`, `Circuit done after ${K()} gate${K() === 1 ? '' : 's'}: spinor sign <b>${s}</b>`));
        schedule();
        return;
      }
      S.pass++;
      schedule();
    }, TRV.reduceMotion ? 900 : 650);
    schedule();
  }

  /* ---------- controls ---------- */
  const fields = { theta: 180, phi: 360, alpha: 360 };
  const setField = (k, v) => (k === 'alpha' ? setAlpha(v) : k === 'theta' ? setInput(v, S.phi) : setInput(S.theta, v));
  for (const k of Object.keys(fields)) {
    $(k).addEventListener('input', (ev) => setField(k, ev.target.value));
    $(k + 'Num').addEventListener('change', (ev) => setField(k, ev.target.value));
    $(k + 'Num').addEventListener('keydown', (ev) => { if (ev.key === 'Enter') ev.target.blur(); });
    $(k + 'Dec').addEventListener('click', () => setField(k, S[k] - 1));
    $(k + 'Inc').addEventListener('click', () => setField(k, S[k] + 1));
  }
  document.querySelectorAll('#presets [data-preset]').forEach((b) => b.addEventListener('click', () => {
    const [ang, gs] = b.dataset.preset.split('|'), [th, ph] = ang.split(',').map(Number);
    setCircuit(th, ph, gs ? gs.split(',') : []);
  }));
  $('swap').addEventListener('click', () => setCircuit(S.theta, S.phi, S.gates.slice().reverse()));
  $('random').addEventListener('click', randomCircuit);
  $('reset').addEventListener('click', resetAll);
  document.querySelectorAll('#gates [data-gate]').forEach((b) => b.addEventListener('click', () => appendGate(b.dataset.gate)));
  document.querySelectorAll('#nChips [data-obs]').forEach((b) => b.addEventListener('click', () => { S.obs = b.dataset.obs; S.hover = null; schedule(); }));
  document.querySelectorAll('#viewChips [data-axis]').forEach((b) => b.addEventListener('click', () => { S.axis = b.dataset.axis; schedule(); }));
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
    const key = ev.key.length === 1 ? ev.key.toUpperCase() : ev.key;
    if (ev.key === 'ArrowLeft') { stop(); setPass(S.pass - 1); ev.preventDefault(); }
    else if (ev.key === 'ArrowRight') { stop(); setPass(S.pass + 1); ev.preventDefault(); }
    else if (ev.key === 'Home') { stop(); setPass(0); ev.preventDefault(); }
    else if (ev.key === 'End') { stop(); setPass(K()); ev.preventDefault(); }
    else if (ev.key === ' ' && !(t && t.closest('button, a'))) { if (S.playing) { stop(); schedule(); } else play(); ev.preventDefault(); }
    else if (ev.key === 'Backspace') { undoGate(); ev.preventDefault(); }
    else if (GATE_NAMES.includes(key)) appendGate(key);
    else if (key === 'R') randomCircuit();
  });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch($('app'));
  TRV.onLang(() => { built = ''; schedule(); });
  window.addEventListener('resize', schedule);
  if ('ResizeObserver' in window) { const ro = new ResizeObserver(schedule); ro.observe(heat); ro.observe(stageCv); }

  /* ---------- start ---------- */
  S.pass = fresh().K;
  schedule();

  /** Thumbnail cover (see drawCover), for |ψ(60°, 36°)⟩ through H, S, H, T, Z, H. */
  window.TRV_THUMB = () => new Promise((resolve) => {
    S.theta = 60; S.phi = 36; S.obs = 'z'; S.gates = ['H', 'S', 'H', 'T', 'Z', 'H']; S.pass = fresh().K; built = '';
    schedule();
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });

  /** Read-only probe for the browser tests (tests/qubit-geometry.test.mjs). */
  window.QG_DEBUG = {
    frames: () => frames,
    pending: () => pending,
    state: () => ({ theta: S.theta, phi: S.phi, alpha: S.alpha, gates: S.gates.slice(), axis: S.axis, obs: S.obs, pass: S.pass, passes: K(), playing: S.playing }),
    info: () => {
      const D = fresh(), cur = D.steps[S.pass], pr = probeRotor();
      return {
        theta: S.theta, phi: S.phi, alpha: S.alpha, axis: S.axis, gates: D.gates.slice(), pass: S.pass,
        steps: D.steps.map((st) => ({ k: st.k, gate: st.gate, rotor: st.rotor.slice(), r: st.r.slice(), psi: st.psi.map((z) => z.slice()), sign: st.sign, touched: st.touched.slice() })),
        born: bornProbabilities(cur.psi), finalSign: D.steps[D.K].sign,
        probe: { rotor: pr, trace: 2 * pr[0], ghost: rotate(pr, cur.r) }
      };
    },
    /** ⟨σ_obs⟩ on the phase-map grid, row-major: index i·37 + j for θ = 5i°, φ = 10j°. */
    grid: (obs = S.obs) => { const out = []; for (let i = 0; i < NT; i++) for (let j = 0; j < NP; j++) out.push(phaseValue(obs, i * DT, j * DP)); return out; },
    /** Viewport coordinates of the centre of the phase-map cell (θ, φ) (for simulated clicks). */
    cellPoint: (thetaDeg, phiDeg) => {
      if (!geom) return null;
      const rc = heat.getBoundingClientRect(), d = geom.dpr;
      return { x: rc.left + (geom.ox + (phiDeg / DP + 0.5) * geom.s) / d, y: rc.top + (geom.oy + (thetaDeg / DT + 0.5) * geom.s) / d };
    },
    set: (theta, phi, gates) => setCircuit(theta, phi, gates === undefined ? S.gates : gates),
    setAlpha: (a) => setAlpha(a),
    setAxis: (a) => { if (Object.hasOwn(AXES, a)) { S.axis = a; schedule(); } },
    setObs: (o) => { if (Object.hasOwn(OBS_IDX, o)) { S.obs = o; schedule(); } },
    math: {
      PAULI, GATES, AXES, gateMatrix, rotorComponents, rotorMatrix, rotorMul, rotate, blochVector, spinorAmplitudes, applyGate2x2,
      blochOfSpinor, bornProbabilities, verifyNorm, verifyPauliVolume, verifyHadamardConjugation, verifyDoubleCover, spinorSign,
      polarOf, runCircuit, phaseValue
    }
  };
})();
