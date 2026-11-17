/* BRAHMAN//DREAM · 梵天实轴与正交虚梦 · Brahman real axis and orthogonal dream
   World (kit.solid): z up. The vertical sigma pillar is the real axis I; the horizontal plane z = 0 is the dream sea
   î = J(H_real), drawn as a magenta disk of radius sin θ. The page computes in H_ℝ = H_real ⊕ H_dream ≅ ℝ² ⊕ ℝ² with the
   block J = [[0, −1₂], [1₂, 0]] (Jᵀ = −J, JᵀJ = 1, J² = −1) and draws (x₁, x₂, y₁, y₂) ↦ (y₁, y₂, x₁): I = (1, 0, 0, 0)
   is the pillar, the dream coordinates are the floor.
     state      Ψ(θ, τ) = cos θ·I − sin θ·J I(τ), I(τ) = (cos φ, sin φ, 0, 0), φ = 180° + ϑ, ϑ = 720°·τ (amber, on the unit
                sphere; the dream turns through the physical angle ϑ, twice per run of the rail):
                cos²θ stays on the pillar, sin²θ lies in the sea, cos²θ + sin²θ = 1;
     dream      ψ_A = J u_A (cyan frame) and ψ_B = J u_B (blue crystal), u_A, u_B unit vectors of H_real at the angle
                Δθ_AB, drawn at radius 0.82 sin θ and turning with the dream (α_A = φ + 90°); ⟨I, ψ_A⟩ = 0 exactly, and
                ⟨ψ_A, ψ_B⟩² = ⟨u_A, JᵀJ u_B⟩² = cos²Δθ_AB (the cyan comparison chord); M cyan Gram-window arcs between them:
                M ≥ 3 lock the angle, M = 1, 2 let it drift by (18°/M)·sin ϑ, M = 0 dissolves the comparison (MODEL);
     ribbon     a Möbius band of radius 1.2 around the pillar, below the sea at z = −0.5 (violet, one colour on both faces, so no seam): its width is
                vertical at u = 0 (the I slice) and horizontal at u = 180° (the î slice); the spinor rides its centre line
                at the physical angle ϑ = 720°·τ, its flag n(ϑ) = cos(ϑ/2) r̂ − sin(ϑ/2) ẑ the lift e^{iϑ/2}.
   Views: panorama, brahman (pitch 0: the sea edge-on, of zero thickness on I), insider (top-down, co-rotating with ψ_A).
   Lenses (the same state): Māṇḍūkya four states and kalpa breath, or block-J algebra and Gram consensus.
   Drives: phase (τ turns the dream), sleep (θ(τ) = 65° + 25°τ), kalpa (the spinor run, annotated). Every number is
   computed here; the instances of the cited Lean theorems are checked in instances(). Probe: window.BRAHMAN_DREAM_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, TAU = 2 * PI, DEG = PI / 180;

  /* ---------- constants ---------- */
  const ORIGIN = [0, 0, 0], ZHAT = [0, 0, 1];
  const DOTTIE = (() => { let x = 0.7; for (let k = 0; k < 60; k++) x -= (Math.cos(x) - x) / (-Math.sin(x) - 1); return x; })();
  const DOTTIE_DEG = DOTTIE / DEG;
  const R_RIB = 1.2, H_RIB = 0.16, Z_RIB = -0.5, RHO = 0.82, PILLAR = [-0.74, 1.24], SLEEP = [65, 90];
  const VIEWS = { panorama: [-0.52, 0.5], brahman: [-0.52, 0], insider: [0, 1.53] };
  const DRIFT = { 1: 18, 2: 9 };

  /* ---------- vectors ---------- */
  const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const scale = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const norm = (a) => Math.hypot(a[0], a[1], a[2]);
  const unit = (a) => { const n = norm(a); return n > 1e-12 ? scale(a, 1 / n) : [0, 0, 1]; };
  const lerp = (a, b, t) => a * (1 - t) + b * t;
  const lerp3 = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
  const range = (a, b, n) => Array.from({ length: n + 1 }, (_, j) => a + (b - a) * j / n);
  const hor = (az, r = 1, z = 0) => [r * Math.cos(az), r * Math.sin(az), z];
  const wrapPi = (a) => { const r = ((a + PI) % TAU + TAU) % TAU - PI; return r === -PI ? PI : r; };
  const camAxes = (cam) => {
    const cy = Math.cos(cam.yaw), sy = Math.sin(cam.yaw), cp = Math.cos(cam.pitch), sp = Math.sin(cam.pitch);
    return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp], D: [-sy * cp, -cy * cp, sp] };
  };
  /* real n × n matrices and vectors of H_ℝ = ℝ⁴ */
  const zeros = (n, m = n) => Array.from({ length: n }, () => new Array(m).fill(0));
  const eye = (n) => zeros(n).map((r, i) => r.map((_, j) => (i === j ? 1 : 0)));
  const mT = (A) => A[0].map((_, j) => A.map((r) => r[j]));
  const mmul = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((t, x, k) => t + x * B[k][j], 0)));
  const madd = (A, B, s = 1) => A.map((r, i) => r.map((x, j) => x + s * B[i][j]));
  const msc = (A, s) => A.map((r) => r.map((x) => x * s));
  const mmax = (A) => Math.max(...A.flat().map(Math.abs));
  const mv = (A, v) => A.map((r) => r.reduce((t, x, k) => t + x * v[k], 0));
  const vdot = (a, b) => a.reduce((t, x, k) => t + x * b[k], 0);
  const vouter = (a, b) => a.map((x) => b.map((y) => x * y));
  const J4 = [[0, 0, -1, 0], [0, 0, 0, -1], [1, 0, 0, 0], [0, 1, 0, 0]];
  const I4 = eye(4);
  /* complex numbers */
  const cx = (re, im = 0) => [re, im];
  const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const cconj = (a) => [a[0], -a[1]];
  const cexp = (t) => [Math.cos(t), Math.sin(t)];
  const cabs = (a) => Math.hypot(a[0], a[1]);
  const csub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  /** The complex picture of (x₁, x₂, y₁, y₂): z_k = x_k + i y_k; J is multiplication by i. */
  const toC = (v) => [cx(v[0], v[2]), cx(v[1], v[3])];
  const cinner = (a, b) => { let s = [0, 0]; for (let k = 0; k < a.length; k++) { const t = cmul(cconj(a[k]), b[k]); s = [s[0] + t[0], s[1] + t[1]]; } return s; };
  /** A complex number for a label, to d digits: +1, −1, +i, −i where it rounds to one of them, re ± im i elsewhere. */
  function ctext(z, d) {
    const re = fix(z[0], d), im = fix(z[1], d), zero = fix(0, d), one = fix(1, d);
    if (im === zero && (re === one || re === `−${one}`)) return re === one ? '+1' : '−1';
    if (re === zero && (im === one || im === `−${one}`)) return im === one ? '+i' : '−i';
    return `${re} ${im[0] === '−' ? '−' : '+'} ${im.replace('−', '')}i`;
  }

  /* ---------- state ---------- */
  const S = { thetaDeg: 42.35, gramM: 4, deltaAB: 30, view: 'panorama', lens: 'mandukya', drive: 'phase', tau: 0.5, from: null, blend: 1, yawOffset: 0, lastYaw: null };
  const sleepTheta = (t) => lerp(SLEEP[0], SLEEP[1], t);
  const activeM = (thetaDeg) => S.drive === 'sleep' && thetaDeg >= 90 - 1e-9 ? 0 : S.gramM;
  function targets() { return { thetaDeg: S.drive === 'sleep' ? sleepTheta(S.tau) : S.thetaDeg, deltaAB: S.deltaAB }; }
  function eff() {
    const t = targets();
    if (!S.from || S.blend >= 1) return t;
    return { thetaDeg: lerp(S.from.thetaDeg, t.thetaDeg, S.blend), deltaAB: lerp(S.from.deltaAB, t.deltaAB, S.blend) };
  }
  /** The chapter's joint (θ, M) MODEL criterion; the waking angle is rounded to the slider's 0.01° step. */
  function zoneOf(thetaDeg, M) {
    if (thetaDeg <= 1e-9 && M === 0) return 'turiya';
    if (thetaDeg >= 90 - 1e-9 && M === 0) return 'susupti';
    if (thetaDeg > 45 && thetaDeg < 90 && (M === 1 || M === 2)) return 'svapna';
    if (Math.round(thetaDeg * 100) === Math.round(DOTTIE_DEG * 100) && M >= 3) return 'jagrat';
    return 'unmapped';
  }
  const ZONE = {
    turiya: ['图里亚 Turīya', 'Turīya'], jagrat: ['醒 Jāgrat', 'Jāgrat'], svapna: ['梦 Svapna', 'Svapna'], susupti: ['熟睡 Suṣupti', 'Suṣupti'],
    unmapped: ['未映射组合', 'Unmapped combination']
  };
  const consensusOf = (M) => (M >= 3 ? 'lock' : M >= 1 ? 'drift' : 'dissolved');
  const CONSENSUS = { lock: ['共识锁', 'consensus lock'], drift: ['私梦漂移', 'private drift'], dissolved: ['消散', 'dissolved'] };

  /** Everything the page shows, from the state. */
  function model() {
    const e = eff(), thetaDeg = e.thetaDeg, th = thetaDeg * DEG, c = Math.cos(th), s = Math.sin(th);
    const tau = S.tau, vartheta = 2 * TAU * tau, phi = PI + vartheta, M = activeM(thetaDeg);
    // H_ℝ = ℝ⁴: the real axis I, the turning real reference I(τ) and its dream image J I(τ)
    const Ivec = [1, 0, 0, 0], Itau = [Math.cos(phi), Math.sin(phi), 0, 0], JItau = mv(J4, Itau);
    const Psi4 = Ivec.map((x, k) => c * x - s * JItau[k]);
    const consensus = consensusOf(M);
    const drift = consensus === 'drift' ? DRIFT[M] * Math.sin(vartheta) : 0;
    const delta = clamp(e.deltaAB + drift, 0, 180), dRad = delta * DEG;
    const alphaA = phi + PI / 2, alphaB = alphaA + dRad;
    const uA = [Math.cos(alphaA), Math.sin(alphaA), 0, 0], uB = [Math.cos(alphaB), Math.sin(alphaB), 0, 0];
    const psiA4 = mv(J4, uA), psiB4 = mv(J4, uB);
    const draw = (v) => [v[2], v[3], v[0]];             // (x₁, x₂, y₁, y₂) ↦ (y₁, y₂, x₁)
    const born = vdot(psiA4, psiB4) ** 2;
    const zone = zoneOf(thetaDeg, M);
    return {
      thetaDeg, theta: th, cos: c, sin: s, cos2: c * c, sin2: s * s, budget: c * c + s * s, tau, phi, vartheta, M, consensus,
      deltaAB: e.deltaAB, delta, drift, alphaA, alphaB, Ivec, Itau, JItau, Psi4, uA, uB, psiA4, psiB4,
      Psi: draw(Psi4), psiA: draw(psiA4), psiB: draw(psiB4), born, overlapIA: vdot(Ivec, psiA4), overlapIPsi: vdot(Ivec, Psi4),
      gramUU: vdot(uA, uB), gramPsiPsi: vdot(psiA4, psiB4), zone, rho: RHO * s,
      lift: cexp(vartheta / 2), flag: ribbonNormal(vartheta), spinorAt: ribbonCentre(vartheta),
      eRef: Math.exp(-2 * th)
    };
  }
  /* the Möbius ribbon: centre c(u), width w(u), normal n(u) = cos(u/2) r̂ − sin(u/2) ẑ (continued over u ∈ [0, 4π]) */
  const ribbonCentre = (u) => hor(u, R_RIB, Z_RIB);
  const ribbonWidth = (u) => add(scale(ZHAT, Math.cos(u / 2)), scale(hor(u), Math.sin(u / 2)));
  const ribbonNormal = (u) => sub(scale(hor(u), Math.cos(u / 2)), scale(ZHAT, Math.sin(u / 2)));
  const ribbonPoint = (u, v) => add(ribbonCentre(u), scale(ribbonWidth(u), v * H_RIB));

  /* ---------- the instances of the cited theorems ---------- */
  const instCache = new Map();
  function instances(m) {
    const key = `${m.thetaDeg}|${m.tau}|${m.M}|${m.deltaAB}`;
    if (instCache.has(key)) return instCache.get(key);
    const c = m.cos, s = m.sin;
    // 1. J is skew-adjoint and unitary, J² = −1 (real entries, so Jᴴ = Jᵀ)
    const blockJ = { skewAdjoint: mmax(madd(mT(J4), J4)), unitary: mmax(madd(mmul(J4, mT(J4)), I4, -1)), square: mmax(madd(mmul(J4, J4), I4)),
      gramIdentity: mmax(madd(mmul(mT(J4), J4), I4, -1)) };
    // 2. the balanced split at θ = 45°: U = (1 − J)/√2, A = 1/√2, B = −J/√2; 2ABᴴ = J and (2ABᴴ)² = −1
    const A = msc(I4, Math.SQRT1_2), B = msc(J4, -Math.SQRT1_2), rel = msc(mmul(A, mT(B)), 2);
    const relative = { halfA: mmax(madd(mmul(A, mT(A)), msc(I4, 0.5), -1)), halfB: mmax(madd(mmul(mT(B), B), msc(I4, 0.5), -1)),
      cross: mmax(madd(mmul(A, mT(B)), mmul(B, mT(A)))), isJ: mmax(madd(rel, J4, -1)), square: mmax(madd(mmul(rel, rel), I4)) };
    // 3. pinching of ρ = |Ψ⟩⟨Ψ| in the basis (I, J I(τ)): Ψ = (cos θ, −sin θ)
    const rho = [[c * c, -c * s], [-c * s, s * s]], pin = [[c * c, 0], [0, s * s]];
    const hs = (X, Y) => X[0][0] * Y[0][0] + X[0][1] * Y[0][1] + X[1][0] * Y[1][0] + X[1][1] * Y[1][1];
    const off = madd(rho, pin, -1);
    const pinching = { total: hs(rho, rho), kept: hs(pin, pin), discarded: hs(off, off), residual: Math.abs(hs(rho, rho) - hs(pin, pin) - hs(off, off)), rho01: rho[0][1] };
    // 4. equal Gram matrices: B = J A with A = [u_A u_B]; U = J is the unitary
    const Am = mT([m.uA, m.uB]), Bm = mmul(J4, Am);
    const gramA = mmul(mT(Am), Am), gramB = mmul(mT(Bm), Bm);
    const gram = { gramA, gramB, equal: mmax(madd(gramA, gramB, -1)), image: mmax(madd(Bm, mmul(J4, Am), -1)), unitary: mmax(madd(mmul(J4, mT(J4)), I4, -1)) };
    // 5. rank-one Born weight: P = {|ψ_A⟩⟨ψ_A|, 1 − |ψ_A⟩⟨ψ_A|}, ρ = |ψ_B⟩⟨ψ_B|; and the record of I on ψ_A
    const PA = vouter(m.psiA4, m.psiA4), PAc = madd(I4, PA, -1), rhoB = vouter(m.psiB4, m.psiB4);
    const tr = (X) => X.reduce((t, r, i) => t + r[i], 0);
    const wA = tr(mmul(rhoB, PA)), wAc = tr(mmul(rhoB, PAc));
    const unread = madd(mmul(mmul(PA, rhoB), PA), mmul(mmul(PAc, rhoB), PAc));
    const condA = wA > 1e-15 ? msc(mmul(mmul(PA, rhoB), PA), 1 / wA) : zeros(4), condAc = wAc > 1e-15 ? msc(mmul(mmul(PAc, rhoB), PAc), 1 / wAc) : zeros(4);
    const decomposed = madd(msc(condA, wA), msc(condAc, wAc));
    const PI_ = vouter(m.Ivec, m.Ivec), rhoA = vouter(m.psiA4, m.psiA4);
    const bornWeight = { weight: wA, modulus: vdot(m.psiA4, m.psiB4) ** 2, cos2: Math.cos(m.delta * DEG) ** 2, sum: wA + wAc,
      unreadResidual: mmax(madd(unread, decomposed, -1)), weightOfI: tr(mmul(rhoA, PI_)) };
    // 6. common phase: p(z) = |⟨ψ_A, z⟩|² = z*Hz (balanced, H = ψ_A ψ_A*) against q(z) = (Σ (ψ_A)_k z_k)² (not balanced)
    const a = toC(m.psiA4), z = toC(m.psiB4);
    const p = (w) => { const t = cinner(a, w); return t[0] * t[0] + t[1] * t[1]; };
    const q = (w) => { let t = [0, 0]; for (let k = 0; k < 2; k++) { const u = cmul(a[k], w[k]); t = [t[0] + u[0], t[1] + u[1]]; } return cmul(t, t); };
    const phase = (w, al) => w.map((x) => cmul(cexp(al), x));
    const alphas = [PI / 2, 1.234, -2.5];
    const H = a.map((left) => a.map((right) => cmul(left, cconj(right))));      // H = a a*, so p(z) = z* H z
    const zHz = (() => { let t = [0, 0]; for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) { const u = cmul(cconj(z[i]), cmul(H[i][j], z[j])); t = [t[0] + u[0], t[1] + u[1]]; } return t; })();
    const commonPhase = { p: p(z), pAfter: alphas.map((al) => p(phase(z, al))), q: q(z), qAfter: alphas.map((al) => q(phase(z, al))), alphas,
      invariant: Math.max(...alphas.map((al) => Math.abs(p(phase(z, al)) - p(z)))), qChange: Math.max(...alphas.map((al) => cabs(csub(q(phase(z, al)), q(z))))),
      qRotates: Math.max(...alphas.map((al) => cabs(csub(q(phase(z, al)), cmul(cexp(2 * al), q(z)))))), hermitian: zHz, psdTrace: a.reduce((t, x) => t + x[0] * x[0] + x[1] * x[1], 0) };
    // 7. the Dottie number
    let signChanges = 0, prev = Math.cos(1e-6) - 1e-6;
    for (let j = 1; j <= 6000; j++) { const t = j * 1e-3, v = Math.cos(t) - t; if (Math.sign(v) !== Math.sign(prev)) signChanges++; prev = v; }
    const dottie = { theta: DOTTIE, thetaDeg: DOTTIE_DEG, residual: Math.abs(Math.cos(DOTTIE) - DOTTIE), inUnit: DOTTIE > 0 && DOTTIE < 1, roots: signChanges, cos2: Math.cos(DOTTIE) ** 2 };
    // 8–9. records on ρ₀₁ of Ψ: M phase records e^{iχ_k} (the Gram windows), reversed jointly; one which-path copy kept
    const rec = (k) => [[cx(1), cx(0)], [cexp(0.7 + 1.3 * k), cx(0)]];               // r(0, ·) = (1, 0), r(1, ·) = (e^{iχ_k}, 0)
    const overlap = (r, i, j) => { let t = [0, 0]; for (let b = 0; b < 2; b++) { const u = cmul(r[i][b], cconj(r[j][b])); t = [t[0] + u[0], t[1] + u[1]]; } return t; };
    const reverse = (r) => r.map((row) => row.map(cconj));
    const rho01 = cx(pinching.rho01);
    const records = Array.from({ length: m.M }, (_, k) => rec(k));
    const after = records.reduce((x, r) => cmul(overlap(r, 0, 1), x), rho01);
    const restored = records.reduce((x, r) => cmul(overlap(reverse(r), 0, 1), x), after);
    const which = [[cx(1), cx(0)], [cx(Math.cos(m.delta * DEG)), cx(Math.sin(m.delta * DEG))]];  // a copy carrying which-path information
    const all = [...records, which];
    const afterAll = all.reduce((x, r) => cmul(overlap(r, 0, 1), x), rho01);
    const blocked = records.reduce((x, r) => cmul(overlap(reverse(r), 0, 1), x), afterAll);
    const reversal = { copies: m.M, unimodular: records.every((r) => Math.abs(cabs(overlap(r, 0, 1)) - 1) < 1e-12), rho01: pinching.rho01,
      written: after, restoredResidual: cabs(csub(restored, rho01)), whichOverlap: overlap(which, 0, 1)[0], blockedResidual: cabs(csub(blocked, rho01)),
      blockedExpected: Math.abs(pinching.rho01) * Math.abs(1 - Math.cos(m.delta * DEG)) };
    // 10. the double cover: base e^{iϑ}, lift e^{iϑ/2} along ϑ ∈ [0, 720°·τ]; continuation from 1
    let liftResidual = 0, contResidual = 0, prevL = [1, 0];
    for (let j = 0; j <= 240; j++) {
      const v = m.vartheta * j / 240, base = cexp(v), lift = cexp(v / 2), sq = cmul(lift, lift);
      liftResidual = Math.max(liftResidual, cabs(csub(sq, base)));
      const r = cexp(Math.atan2(base[1], base[0]) / 2), alt = [-r[0], -r[1]];
      const pick = cabs(csub(r, prevL)) <= cabs(csub(alt, prevL)) ? r : alt;
      contResidual = Math.max(contResidual, cabs(csub(pick, lift)));
      prevL = pick;
    }
    const doubleCover = { liftResidual, contResidual, atOneTurn: cexp(PI), atTwoTurns: cexp(TAU), now: m.lift, varthetaDeg: m.vartheta / DEG };
    const out = { blockJ, relative, pinching, gram, bornWeight, commonPhase, dottie, reversal, doubleCover };
    instCache.set(key, out);
    if (instCache.size > 120) instCache.delete(instCache.keys().next().value);
    return out;
  }

  /* ---------- stage ---------- */
  const stageEl = $('stage');
  const tagBox = document.createElement('div'); tagBox.className = 'tags'; stageEl.appendChild(tagBox);
  const probeEl = document.createElement('div'); probeEl.hidden = true; probeEl.style.position = 'absolute'; tagBox.appendChild(probeEl);
  const options = { canvas: $('cv'), yaw: VIEWS.panorama[0], pitch: VIEWS.panorama[1], wheel: false, radius: 0.32, cx: 0.5, cy: 0.5, onChange: () => paint() };
  const sc = kit.solid(stageEl, options);
  if (TRV.still) stageEl.classList.add('still');

  function boxOf(el, sr) {
    if (!el || el.hidden || !el.getClientRects().length) return null;
    const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return null;
    const r = el.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return null;
    return { x: r.left - sr.left, y: r.top - sr.top, w: r.width, h: r.height };
  }
  function hudBoxes() {
    const sr = stageEl.getBoundingClientRect(), out = [];
    for (const el of [$('hudTl'), $('legend')]) { const b = boxOf(el, sr); if (b && el.textContent.trim()) out.push(b); }
    return out;
  }
  function safeRect(W, H, huds) {
    let top = 10, bottom = H - 10;
    for (const b of huds) { if (b.y + b.h / 2 < H / 2) top = Math.max(top, b.y + b.h + 6); else bottom = Math.min(bottom, b.y - 6); }
    return { x: 10, y: top, w: Math.max(40, W - 20), h: Math.max(60, bottom - top) };
  }

  /* labels: placed after drawing by priority, off each other, the HUD and the handle */
  const sizes = new Map();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { sizes.clear(); paint(); });
  TRV.onLang(() => sizes.clear());
  function sizeOf(html, cls) {
    const k = `${TRV.lang()}|${cls}|${html}`;
    let sz = sizes.get(k);
    if (!sz) { probeEl.className = 'tag ' + cls; probeEl.innerHTML = html; probeEl.hidden = false; sz = [probeEl.offsetWidth, probeEl.offsetHeight]; probeEl.hidden = true; if (sz[0] > 0) sizes.set(k, sz); }
    return sz;
  }
  let LB = [], OBST = [], BOUNDS = null, PLACED = [];
  const meets = (a, b, mm) => a.x < b.x + b.w + mm && b.x < a.x + a.w + mm && a.y < b.y + b.h + mm && b.y < a.y + a.h + mm;
  function placeLabels() {
    const placed = [];
    LB.sort((a, b) => b.pri - a.pri);
    for (const l of LB) {
      const [w, h] = sizeOf(l.html, l.cls);
      if (!w) continue;
      const base = Math.atan2(l.dir[1], l.dir[0]), cands = [];
      for (const r of [l.r, l.r + 10, l.r + 24, l.r + 42]) for (const da of [0, 0.5, -0.5, 1.0, -1.0, 1.6, -1.6, 2.3, -2.3, PI]) {
        const ux = Math.cos(base + da), uy = Math.sin(base + da), ext = Math.abs(ux) * w / 2 + Math.abs(uy) * h / 2;
        cands.push([ux * (r + ext), uy * (r + ext)]);
      }
      let ok = null;
      for (const [dx, dy] of cands) {
        const b = { x: l.q[0] + dx - w / 2, y: l.q[1] + dy - h / 2, w, h };
        if (b.x < BOUNDS.x || b.y < BOUNDS.y || b.x + w > BOUNDS.x + BOUNDS.w || b.y + h > BOUNDS.y + BOUNDS.h) continue;
        if (placed.some((p) => meets(p, b, 3)) || OBST.some((p) => meets(p, b, 2))) continue;
        ok = b; break;
      }
      if (!ok) continue;
      placed.push(Object.assign({ key: l.key, text: l.html }, ok));
      sc.tag(l.key, [ok.x + w / 2, ok.y + h / 2], l.html, l.cls, { screen: true });
    }
    PLACED = placed;
  }

  /* ---------- camera: three views, a smooth move between them, the insider co-rotating with ψ_A ---------- */
  let camMove = null;
  function viewTarget(view, m) {
    if (view === 'insider') return { yaw: PI / 2 - m.alphaA + S.yawOffset, pitch: VIEWS.insider[1] };
    return { yaw: VIEWS[view][0], pitch: VIEWS[view][1] };
  }
  function applyCamera(m) {
    const cam = sc.cam;
    if (!camMove && S.view === 'insider') {
      // the reader may still orbit: what a drag changed since the last frame becomes an offset that turns with ψ_A
      if (S.lastYaw != null) S.yawOffset += wrapPi(cam.yaw - S.lastYaw);
      cam.yaw = PI / 2 - m.alphaA + S.yawOffset;
    }
    S.lastYaw = cam.yaw;
  }
  /** Move the camera to a view: the tween writes the camera itself (its target follows ψ_A while the clock runs). */
  function moveCamera(view, ms) {
    const from = { yaw: sc.cam.yaw, pitch: sc.cam.pitch };
    S.view = view; S.yawOffset = 0; sc.cam.zoom = 1;
    if (camMove && camMove.run) camMove.run.cancel();
    camMove = null;
    // the shortest turn there, landing exactly on the target angle (not on a copy of it 2π away)
    const go = (e) => { const t = viewTarget(view, model()); sc.cam.yaw = e >= 1 ? t.yaw : from.yaw + wrapPi(t.yaw - from.yaw) * e; sc.cam.pitch = e >= 1 ? t.pitch : lerp(from.pitch, t.pitch, e); S.lastYaw = sc.cam.yaw; };
    if (!(ms > 0) || TRV.still) { go(1); paint(); return; }
    const token = {};
    camMove = token;
    token.run = kit.tween(ms, (e) => { go(e); paint(); }, () => { if (camMove === token) camMove = null; S.lastYaw = sc.cam.yaw; paint(); });
  }

  /* ---------- fit: the projected extent of the pillar, the ribbon and the unit sphere ---------- */
  const FIT_PTS = (() => {
    const pts = [[0, 0, PILLAR[0]], [0, 0, PILLAR[1]]];
    for (let k = 0; k < 48; k++) { const u = TAU * k / 48; pts.push(ribbonPoint(u, 1), ribbonPoint(u, -1)); }
    for (let k = 0; k < 24; k++) for (const z of [0, 0.6]) pts.push(hor(TAU * k / 24, Math.sqrt(1 - z * z), z));
    pts.push([0, 0, 1]);
    return pts;
  })();
  function fitTo(area, W, H) {
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    for (const p of FIT_PTS) { const x = dot(p, AX.R), y = dot(p, AX.U); x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
    const pad = TRV.thumbMode ? 6 : 12, zoom = sc.cam.zoom || 1;
    const unitPx = Math.max(20, Math.min((area.w - 2 * pad) / (x1 - x0), (area.h - 2 * pad) / (y1 - y0)));
    options.radius = unitPx / (Math.max(1, Math.min(W, H)) * zoom);
    options.cx = (area.x + area.w / 2 - unitPx * (x0 + x1) / 2) / Math.max(1, W);
    options.cy = (area.y + area.h / 2 + unitPx * (y0 + y1) / 2) / Math.max(1, H);
  }

  let FRAME = null, FIT = null, TAGS = [], AX = null, dragging = null;
  const at = (p, html, cls, pri, dir) => { if (!TRV.thumbMode) TAGS.push({ p, html, cls, pri, dir }); };
  const tube = (key, pts, color, width, extra = {}) => { if (pts.length > 1) sc.tube(key, pts, Object.assign({ color, width, glow: 0.3, pick: false, occlude: false }, extra)); };
  const meridian = (phi, a, b, n = 40) => range(a, b, n).map((t) => add(scale(ZHAT, Math.cos(t)), scale(hor(phi + PI), Math.sin(t))));

  /** The pillar I, the dream sea, the state Ψ and its two shadows. */
  function drawAxisAndSea(m) {
    tube('pillar', [[0, 0, PILLAR[0]], [0, 0, PILLAR[1]]], P.sigma, 8, { glow: 0.35, occlude: true });
    // seen from above the top of the pillar is the centre of the sea: there the label would cover the windows
    if (S.view !== 'insider') at([0, 0, PILLAR[1]], `I · cos²θ + sin²θ = ${fix(m.budget, 6)}`, 'raw c-sg backed', 10, [0.4, -1]);
    const s = m.sin;
    if (s > 1e-4) {
      sc.surface('sea', (u, v) => hor(TAU * v, u * s, 0), { u: [0, 1], v: [0, 1], nu: 8, nv: 72, color: P.magenta, back: P.magenta,
        grid: { every: [2, 9], color: P.ink, alpha: 0.18 }, pick: false });
      at(hor(m.phi + PI * 1.32, s * 0.98, 0), `î = J(H<sub>real</sub>) · ${L('半径', 'radius')} sin θ`, 'raw c-mg backed', 5, null);
    }
    // the state and its two shadows: cos θ on the pillar, sin θ in the sea
    const tip = m.Psi, onI = [0, 0, m.cos], inSea = [tip[0], tip[1], 0];
    sc.arrow(ORIGIN, tip, { color: P.amber, width: 2.8, headSize: 12 });
    sc.bead(tip, { color: P.amber, r: 5.5, key: 'state' });
    if (s > 1e-3) {
      sc.line([tip, onI], { color: P.sigma, width: 1.3, dash: [5, 4], alpha: 0.9 });
      sc.bead(onI, { color: P.sigma, r: 4, key: 'real-part' });
      at(onI, `cos²θ = ${fix(m.cos2, 4)}`, 'raw c-sg backed', 8, [-1, 0.2]);
      sc.line([tip, inSea], { color: P.magenta, width: 1.3, dash: [5, 4], alpha: 0.9 });
      at(inSea, `sin²θ = ${fix(m.sin2, 4)}`, 'raw c-mg backed', 7, null);
    }
    at(tip, `Ψ · θ = ${fix(m.thetaDeg, 2)}°`, 'raw c-ik backed', 9, null);
  }

  /** ψ_A, ψ_B, the comparison chord and the Gram windows, in the sea. */
  function drawDream(m) {
    const rr = m.rho;
    if (rr < 1e-3 || m.zone === 'susupti') return;
    const z0 = 0.012, A = scale(m.psiA, rr), B = scale(m.psiB, rr);
    A[2] = z0; B[2] = z0;
    const dis = m.consensus === 'dissolved';
    // ψ_A: a cyan arrow with a small frame at its tip
    sc.arrow([0, 0, z0], A, { color: P.cyan, width: 2.4, headSize: 9 });
    const tA = hor(m.alphaA + PI / 2, 0.07), rA = hor(m.alphaA, 0.07);
    sc.line([sub(A, tA), add(A, tA)], { color: P.cyan, width: 2 }); sc.line([A, add(A, rA)], { color: P.cyan, width: 2 });
    sc.ring(A, { normal: ZHAT, color: P.cyan, r: 6, key: 'psiA' });
    at(A, 'ψ<sub>A</sub> = J u<sub>A</sub>', 'raw c-cy backed', 8, null);
    // ψ_B: a blue crystal (a flat hexagonal bipyramid in the sea)
    sc.arrow([0, 0, z0], B, { color: P.blue, width: 2.4, headSize: 9, alpha: dis ? 0.3 : 1 });
    const V = [], F = [], hx = 0.075, hz = 0.036;
    for (let k = 0; k < 6; k++) V.push(add(B, hor(m.alphaB + k * PI / 3, hx)));
    V.push(add(B, [0, 0, hz]), add(B, [0, 0, -hz]));
    for (let k = 0; k < 6; k++) { F.push([k, (k + 1) % 6, 6]); F.push([(k + 1) % 6, k, 7]); }
    sc.poly('crystal', { vertices: V, faces: F }, { color: P.blue, alpha: dis ? 0.3 : 1, edges: P.ink, pick: false });
    at(B, dis ? L('ψ<sub>B</sub> · 消散', 'ψ<sub>B</sub> · dissolved') : 'ψ<sub>B</sub> = J u<sub>B</sub>', 'raw c-bl backed', 7, null);
    if (dis) return;
    // the comparison chord and the M Gram-window arcs between ψ_A and ψ_B
    tube('chord', [A, B], P.cyan, 3.4, { glow: 0.5 });
    at(lerp3(A, B, 0.5), `⟨ψ<sub>A</sub>, ψ<sub>B</sub>⟩² = cos²Δ = ${fix(m.born, 4)}`, 'raw c-cy backed', 9, null);
    for (let k = 1; k <= m.M; k++) {
      const r = rr * (0.3 + 0.1 * k), pts = range(m.alphaA, m.alphaB, 24).map((a) => hor(a, r, z0));
      if (m.consensus === 'lock') tube(`window${k}`, pts, P.cyan, 2, { glow: 0.3, alpha: 0.85 });
      else sc.line(pts, { color: P.cyan, width: 1.6, dash: [4, 3], alpha: 0.9 });
    }
    if (m.M > 0) at(hor((m.alphaA + m.alphaB) / 2, rr * (0.32 + 0.1 * m.M), z0), `M = ${m.M} · ${L(...CONSENSUS[m.consensus])}`, 'raw c-cy backed', 6, null);
  }

  /** The 720° Möbius ribbon of the spinor, and the spinor riding it. */
  function drawRibbon(m, kalpa) {
    sc.surface('ribbon', (u, v) => ribbonPoint(u, v), { u: [0, TAU], v: [-1, 1], nu: 144, nv: 6, color: P.violet, back: P.violet,
      grid: { every: [12, 3], color: P.ink, alpha: kalpa ? 0.2 : 0.13 }, pick: false });
    const c = m.spinorAt, n = m.flag;
    sc.bead(c, { color: P.ink, r: kalpa ? 5 : 4, key: 'spinor' });
    sc.arrow(c, add(c, scale(n, 0.3)), { color: P.ink, width: 2.4, headSize: 9 });
    if (kalpa) {
      at(c, `ϑ = ${Math.round(m.vartheta / DEG)}° · e<sup>iϑ/2</sup> = ${ctext(m.lift, 2)}`, 'raw c-vi backed', 9, null);
      at(ribbonPoint(0, 1), L('I 切面：带宽竖直', 'I slice: width vertical'), 'raw c-vi backed', 5, null);
      at(ribbonPoint(PI, 1), L('î 切面：带宽水平', 'î slice: width horizontal'), 'raw c-vi backed', 5, null);
    } else at(ribbonPoint(PI * 0.75, 1), L('720° 旋量带', '720° spinor ribbon'), 'raw c-vi backed', 4, null);
  }

  /** The lens overlays: the Māṇḍūkya zones on the meridian of Ψ, or the block-J quarter turn and its algebra. */
  function drawLens(m) {
    const phi = m.phi;
    sc.line(meridian(phi, 0, PI / 2, 60), { color: P.dim, width: 1.2, dash: [4, 4], alpha: 0.7 });
    if (S.lens === 'mandukya') {
      tube('svapna', meridian(phi, 45 * DEG + 0.004, PI / 2 - 0.004, 30).map((p) => scale(p, 1.035)), P.dim, 5, { glow: 0.2, alpha: 0.75 });
      for (const deg of [0, DOTTIE_DEG, 90]) { const p = meridian(phi, deg * DEG, deg * DEG, 1)[0]; sc.line([scale(p, 0.97), scale(p, 1.08)], { color: P.ink, width: 1.6, alpha: 0.8 }); }
      at(scale(meridian(phi, 0, 0, 1)[0], 1.08), 'Turīya · 0°', 'raw c-ik backed', 5, [0.6, -1]);
      at(scale(meridian(phi, DOTTIE, DOTTIE, 1)[0], 1.1), `Jāgrat · θ* = ${fix(DOTTIE_DEG, 2)}°`, 'raw c-ik backed', 6, null);
      at(scale(meridian(phi, 67.5 * DEG, 67.5 * DEG, 1)[0], 1.1), 'Svapna · (45°, 90°)', 'raw c-ik backed', 5, null);
      at(scale(meridian(phi, PI / 2, PI / 2, 1)[0], 1.08), 'Suṣupti · 90°', 'raw c-ik backed', 5, null);
    } else {
      // J turns the real axis a quarter turn into the sea: I ↦ J I(τ)
      const ji = hor(phi, 0.55);
      tube('jturn', range(0, PI / 2, 24).map((t) => add(scale(ZHAT, 0.55 * Math.cos(t)), scale(hor(phi), 0.55 * Math.sin(t)))), P.violet, 2.6, { glow: 0.45 });
      sc.arrow(scale(ji, 0.82), ji, { color: P.violet, width: 2.4, headSize: 9 });
      at(ji, 'J I(τ) · J² = −1', 'raw c-vi backed', 7, null);
      at([0, 0, 0.55], 'JᵀJ = +1', 'raw c-vi backed', 6, [-1, 0]);
      at([0, 0, 0.02], `⟨I, ψ<sub>A</sub>⟩ = ${fix(Math.abs(m.overlapIA) < 5e-17 ? 0 : m.overlapIA, 6)}`, 'raw c-mg backed', 8, [-1, 0.6]);
    }
  }

  function drawStage(m) {
    const W = stageEl.clientWidth, H = stageEl.clientHeight, thumb = TRV.thumbMode;
    applyCamera(m);
    AX = camAxes(sc.cam);
    const huds = thumb ? [] : hudBoxes();
    const area = thumb ? { x: 12, y: 12, w: W - 24, h: H - 24 } : safeRect(W, H, huds);
    if (!dragging || !FIT) FIT = { area };
    fitTo(FIT.area, W, H);
    OBST = huds.slice(); BOUNDS = { x: 6, y: 6, w: W - 12, h: H - 12 }; LB = []; TAGS = [];
    sc.begin();
    drawRibbon(m, S.drive === 'kalpa');
    drawAxisAndSea(m);
    drawDream(m);
    drawLens(m);
    sc.end();
    const hq = !thumb && !TRV.still ? sc.p(m.Psi) : null;
    if (hq) OBST.push({ x: hq[0] - 18, y: hq[1] - 18, w: 36, h: 36 });
    placeHandle(hq);
    if (!thumb) {
      const cen = sc.p([0, 0, 0.3]);
      TAGS.forEach((t, k) => {
        const q = sc.p(t.p), dir = t.dir ? [t.dir[0], t.dir[1]] : [q[0] - cen[0] || 0.01, q[1] - cen[1] || -1];
        LB.push({ key: `t${k}`, q, html: t.html, cls: t.cls, pri: t.pri, dir, r: 10 });
      });
      placeLabels();
    }
    FRAME = { W, H, area: FIT.area, handle: hq ? { x: hq[0], y: hq[1] } : null, unit: sc.unit, cx: sc.cx, cy: sc.cy };
  }

  /* ---------- the handle: a button on the meridian of Ψ ---------- */
  const handle = $('thetaHandle');
  function placeHandle(q) {
    const show = !!q && !TRV.still;
    handle.hidden = !show;
    if (!show) return;
    handle.style.left = `${q[0].toFixed(1)}px`; handle.style.top = `${q[1].toFixed(1)}px`;
  }
  /** The tilt θ (degrees) whose point on the current meridian of Ψ lies nearest the pointer. */
  function thetaAt(ev) {
    const r = stageEl.getBoundingClientRect(), x = ev.clientX - r.left - stageEl.clientLeft, y = ev.clientY - r.top - stageEl.clientTop;
    const phi = PI + 2 * TAU * S.tau;
    let best = S.thetaDeg, bd = Infinity;
    for (let j = 0; j <= 3600; j++) {
      const d = j * 90 / 3600, t = d * DEG, q = sc.p(add(scale(ZHAT, Math.cos(t)), scale(hor(phi + PI), Math.sin(t)))), dd = (q[0] - x) ** 2 + (q[1] - y) ** 2;
      if (dd < bd) { bd = dd; best = d; }
    }
    return Math.round(best * 100) / 100;
  }
  const endDrag = (ev) => {
    if (!dragging || (ev && ev.pointerId != null && ev.pointerId !== dragging.pointer)) return;
    try { if (handle.hasPointerCapture(dragging.pointer)) handle.releasePointerCapture(dragging.pointer); } catch (e) { /* already released */ }
    dragging = null; handle.classList.remove('dragging'); paint();
  };
  handle.addEventListener('pointerdown', (ev) => {
    if (ev.button > 0 || TRV.still) return;
    ev.preventDefault(); ev.stopPropagation();
    leave();
    dragging = { pointer: ev.pointerId }; handle.classList.add('dragging');
    try { handle.setPointerCapture(ev.pointerId); } catch (e) { /* synthetic events carry no capture */ }
  });
  handle.addEventListener('pointermove', (ev) => {
    if (!dragging || ev.pointerId !== dragging.pointer) return;
    ev.preventDefault();
    setTheta(thetaAt(ev));
  });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) handle.addEventListener(type, endDrag);
  handle.addEventListener('keydown', (ev) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(ev.key)) return;
    ev.preventDefault(); ev.stopPropagation(); leave();
    setTheta(Math.round((S.thetaDeg + (ev.key === 'ArrowRight' || ev.key === 'ArrowUp' ? 0.5 : -0.5)) * 100) / 100);
  });

  /* ---------- HUD, legend, readouts ---------- */
  function hudText(m) {
    let big;
    if (S.view === 'brahman') big = `${L('梵天本位', 'BRAHMAN EDGE-ON')} · ⟨I, ψ<sub>A</sub>⟩ = ${fix(Math.abs(m.overlapIA) < 5e-17 ? 0 : m.overlapIA, 6)}`;
    else if (S.view === 'insider') big = `${L('梦中视角', 'INSIDE THE DREAM')} · ⟨ψ<sub>A</sub>, ψ<sub>B</sub>⟩² = ${m.consensus === 'dissolved' ? '—' : fix(m.born, 4)}`;
    else big = S.lens === 'mandukya' ? `${L(...ZONE[m.zone])} · θ = ${fix(m.thetaDeg, 2)}°` : 'J² = −1 · JᵀJ = +1';
    const sub = S.lens === 'mandukya'
      ? `cos²θ + sin²θ = ${fix(m.cos2, 4)} + ${fix(m.sin2, 4)} · M = ${m.M} ${L(...CONSENSUS[m.consensus])}`
      : `⟨ψ<sub>A</sub>, ψ<sub>B</sub>⟩² = ⟨u<sub>A</sub>, JᵀJ u<sub>B</sub>⟩² = ${fix(Math.cos(m.delta * DEG) ** 2, 4)}`;
    $('hudBig').innerHTML = big; $('hudSub').innerHTML = sub;
    const items = [['sg', L('I 实轴', 'I real axis')], ['mg', L('î 梦海', 'î dream sea')], ['cy', L('ψ<sub>A</sub> · 比较弦 · 窗', 'ψ<sub>A</sub> · chord · windows')], ['bl', 'ψ<sub>B</sub>'], ['vi', L('旋量带', 'spinor ribbon')]];
    $('legend').innerHTML = items.map(([k, t]) => `<span><i class="sw ${k}"></i>${t}</span>`).join('');
  }
  function drawText(m) {
    const I = instances(m);
    $('roKey').textContent = `${fix(m.cos2, 4)} + ${fix(m.sin2, 4)} = ${fix(m.budget, 6)}`;
    $('roKeySub').innerHTML = ` · θ = ${fix(m.thetaDeg, 2)}°`;
    $('roParts').innerHTML = `${fix(m.cos2, 4)} · ${fix(m.sin2, 4)} · ${L(...ZONE[m.zone])}`;
    $('roOrth').innerHTML = `${fix(Math.abs(m.overlapIA) < 5e-17 ? 0 : m.overlapIA, 6)} · ⟨I, Ψ⟩ = ${fix(m.overlapIPsi, 4)}`;
    $('roBorn').innerHTML = m.consensus === 'dissolved' ? `— · ${L('M = 0：不比较', 'M = 0: no comparison')}` : `${fix(m.born, 4)} · Δ = ${fix(m.delta, 1)}° · ${fix(I.bornWeight.weight, 4)}`;
    $('roSpinor').innerHTML = `ϑ = ${Math.round(m.vartheta / DEG)}° · e<sup>iϑ/2</sup> = ${fix(m.lift[0], 3)}${m.lift[1] >= 0 ? ' + ' : ' − '}${fix(Math.abs(m.lift[1]), 3)}i`;
    $('roConsensus').innerHTML = `M = ${m.M} · ${L(...CONSENSUS[m.consensus])} · ${fix(I.reversal.restoredResidual, 6)} / ${fix(I.reversal.blockedResidual, 6)}`;
    $('roNote').innerHTML = noteFor(m, I);
    $('thetaPill').innerHTML = `θ <strong>${fix(m.thetaDeg, 2)}°</strong>`;
    $('keyPill').innerHTML = `cos²θ + sin²θ <strong>${fix(m.budget, 6)}</strong>`;
    $('hint').innerHTML = L('拖琥珀手柄沿经线改 θ · 拖空白处转视角（梦中视角随 ψ<sub>A</sub> 同转）', 'drag the amber handle along the meridian to set θ · drag empty space to orbit (the insider view turns with ψ<sub>A</sub>)');
    $('formula').innerHTML = 'Ψ = cos θ · I − sin θ · J I(τ) · J = [[0, −1], [1, 0]] · ϑ = 720°τ · e<sup>iϑ/2</sup>';
    lensBtn.setAttribute('aria-pressed', String(S.lens === 'algebra'));
  }
  function noteFor(m, I) {
    if (m.thetaDeg <= 1e-9) return L('θ = 0：Ψ = I，梦海半径 sin θ = 0，没有梦，也没有可比较的 ψ<sub>A</sub>、ψ<sub>B</sub>；预算全在实轴上。', 'θ = 0: Ψ = I, the sea has radius sin θ = 0, there is no dream and nothing to compare; the whole budget is on the real axis.');
    if (m.zone === 'susupti') return L('θ = 90°、M_act = 0：现行切面与比较挂起，梦海和单位预算保留。', 'θ = 90°, M_act = 0: active slices and comparison are suspended; the sea and unit budget remain.');
    if (m.consensus === 'dissolved') return L('M = 0：没有格拉姆窗，ψ<sub>A</sub> 与 ψ<sub>B</sub> 不再被比较，梦中之物消散。', 'M = 0: no Gram window, ψ<sub>A</sub> and ψ<sub>B</sub> are no longer compared and the dream object dissolves.');
    if (m.consensus === 'drift') return L(`只有 ${m.M} 道窗：夹角漂移 ±${DRIFT[m.M]}°，比较弦随之伸缩；全部副本逆转可复原 ρ₀₁（残差 ${fix(I.reversal.restoredResidual, 6)}），留一份带路径信息的副本就回不去（残差 ${fix(I.reversal.blockedResidual, 4)}）。`, `Only ${m.M} window${m.M > 1 ? 's' : ''}: the angle drifts by ±${DRIFT[m.M]}° and the chord with it; reversing every copy restores ρ₀₁ (residual ${fix(I.reversal.restoredResidual, 6)}), one copy with which-path information left in place blocks it (residual ${fix(I.reversal.blockedResidual, 4)}).`);
    return L(`${m.M} 道窗锁住夹角：两者都离 I 90°，⟨I, ψ<sub>A</sub>⟩ = 0，彼此比较却是 cos²Δ = ${fix(m.born, 4)} ≥ 0，因为 JᵀJ = +1。`, `${m.M} windows lock the angle: both are 90° from I, ⟨I, ψ<sub>A</sub>⟩ = 0, yet compared with each other they give cos²Δ = ${fix(m.born, 4)} ≥ 0, because JᵀJ = +1.`);
  }

  /* ---------- strip plot ---------- */
  function drawPlot(m) {
    const cv = $('plot');
    if (TRV.thumbMode || !cv.clientWidth || !cv.clientHeight) return;
    $('plotTitle').textContent = L('实部与梦权：沿 θ，总和不动', 'Real part and dream weight: along θ the total stays');
    const g = kit.plot(cv, { x: [0, 90], y: [0, 1.16], pad: [34, 12, 10, 22] });
    g.rect(45, 0, 90, 1.16, P.dim, { alpha: 0.12 });
    g.axes({ xTicks: [0, 15, 30, 45, 60, 75, 90], yTicks: [0, 0.5, 1], xLabel: 'θ (°)' });
    const xs = range(0, 90, 180);
    for (const x of [0, DOTTIE_DEG, 90]) g.vline(x, P.dim, { alpha: 0.8, dash: [3, 4] });
    g.line(xs.map((x) => [x, Math.exp(-2 * x * DEG)]), P.dim, { width: 1.6, dash: [5, 4] });
    g.line(xs.map((x) => [x, Math.cos(x * DEG) ** 2]), P.sigma, { width: 2 });
    g.line(xs.map((x) => [x, Math.sin(x * DEG) ** 2]), P.magenta, { width: 2 });
    g.line(xs.map((x) => [x, 1]), P.cyan, { width: 2 });
    g.vline(m.thetaDeg, P.amber, { alpha: 0.9 });
    g.text(1.5, 1.09, 'Turīya', P.dim, { size: 10 });
    g.text(DOTTIE_DEG - 1, 1.09, 'Jāgrat θ*', P.dim, { size: 10, align: 'right' });
    g.text(67.5, 1.09, 'Svapna (45°, 90°)', P.dim, { size: 10, align: 'center' });
    g.text(89, 0.86, 'Suṣupti', P.dim, { size: 10, align: 'right' });
    g.text(20, 0.93, 'cos^{2}θ', P.sigma, { size: 10.5 });
    g.text(20, 0.2, 'sin^{2}θ', P.magenta, { size: 10.5 });
    g.text(3, 0.6, 'e^{−2θ}', P.dim, { size: 10.5 });
    $('plotMeta').innerHTML = `cos²θ + sin²θ = ${fix(m.budget, 6)} · e<sup>−2θ</sup> = ${fix(m.eRef, 4)}`;
  }

  const paint = kit.painter(() => {
    const m = model();
    hudText(m); TRV.hudFit();
    drawStage(m); drawText(m); drawPlot(m);
  }, [stageEl, $('plot')]);

  /* ---------- the rail ---------- */
  const railLabel = (t) => (S.drive === 'sleep' ? `τ ${fix(t, 2)} · θ ${fix(sleepTheta(t), 2)}°` : `τ ${fix(t, 2)} · ϑ ${Math.round(720 * t)}°`);
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 1, t: 0.5, rate: 0.06, step: 0.05, loop: true,
    format: (t) => `${railLabel(t)} <small>/ 1</small>`,
    onChange: (t) => { S.tau = t; if (S.drive === 'sleep') syncFields(); paint(); }
  });
  $('rew').addEventListener('click', () => { stopBootPlay(); clock.pause(); clock.set(0); });

  let bootIO = null;
  function bootAutoplay() {
    if (TRV.still || !window.IntersectionObserver) return;
    let started = false;
    bootIO = new IntersectionObserver((entries) => {
      const seen = entries[entries.length - 1].intersectionRatio >= 0.5;
      if (seen && !started) { started = true; clock.play(); } else if (!seen && clock.playing) clock.pause();
    }, { threshold: [0, 0.5, 1] });
    bootIO.observe(stageEl);
  }
  function stopBootPlay() { if (bootIO) { bootIO.disconnect(); bootIO = null; } }
  $('play').addEventListener('click', stopBootPlay, true);
  $('now').addEventListener('input', stopBootPlay, true);
  document.addEventListener('keydown', (ev) => { if ([' ', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(ev.key)) stopBootPlay(); }, true);

  /* ---------- controls ---------- */
  let transition = null, booting = true;
  function startBlend(from, ms) {
    if (transition) transition.cancel();
    S.from = from; S.blend = 0;
    const token = {};
    transition = token;
    token.cancel = () => { if (token.run) token.run.cancel(); S.blend = 1; S.from = null; };
    token.run = kit.tween(ms, (e) => { S.blend = e; syncFields(); paint(); }, () => { if (transition === token) transition = null; S.blend = 1; S.from = null; syncFields(); paint(); });
  }
  /** The reader takes over: the shown values become the state, the clock pauses, no card is marked. */
  function leave() {
    stopBootPlay();
    const e = eff();
    if (transition) transition.cancel();
    transition = null;
    clock.pause();
    S.gramM = activeM(e.thetaDeg); S.thetaDeg = Math.round(e.thetaDeg * 100) / 100; S.deltaAB = Math.round(e.deltaAB); S.from = null; S.blend = 1;
    if (S.drive !== 'phase') S.drive = 'phase';
    cards.mark(null);
  }
  const fTheta = kit.field($('thetaDeg'), { fmt: (v) => `${fix(clamp(v, 0, 90), 2)}°`, onInput: (v) => { leave(); S.thetaDeg = clamp(v, 0, 90); paint(); } });
  const fM = kit.field($('gramM'), { fmt: (v) => String(Math.round(clamp(v, 0, 6))), onInput: (v) => { leave(); S.gramM = Math.round(clamp(v, 0, 6)); paint(); } });
  const fDelta = kit.field($('deltaAB'), { fmt: (v) => `${Math.round(clamp(v, 0, 90))}°`, onInput: (v) => { leave(); S.deltaAB = Math.round(clamp(v, 0, 90)); paint(); } });
  function syncFields() { const e = eff(); fTheta.set(Math.round(e.thetaDeg * 100) / 100); fM.set(activeM(e.thetaDeg)); fDelta.set(Math.round(e.deltaAB)); }
  function setTheta(v) { S.thetaDeg = clamp(v, 0, 90); syncFields(); paint(); }
  const lensBtn = $('lensToggleBtn');
  lensBtn.addEventListener('click', () => { leave(); S.lens = S.lens === 'mandukya' ? 'algebra' : 'mandukya'; paint(); });
  const viewChips = kit.chips($('viewChips'), 'view', (v) => { leave(); moveCamera(VIEWS[v] ? v : 'panorama', 800); });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    'turiya-zero-tilt-pure-brahman': { thetaDeg: 0, gramM: 0, deltaAB: 30, view: 'brahman', lens: 'mandukya', drive: 'phase', play: false, still: 0 },
    'waking-consensus-dottie-lock': { thetaDeg: 42.35, gramM: 4, deltaAB: 30, view: 'panorama', lens: 'mandukya', drive: 'phase', play: true, still: 0.5 },
    'insider-double-imaginary-solidity': { thetaDeg: 60, gramM: 4, deltaAB: 30, view: 'insider', lens: 'algebra', drive: 'phase', play: true, still: 0.4 },
    'private-dream-and-seed-sleep': { thetaDeg: 77.5, gramM: 1, deltaAB: 55, view: 'panorama', lens: 'mandukya', drive: 'sleep', play: true, still: 0.5 },
    'kalpa-mobius-lucid-awakening': { thetaDeg: 42.35, gramM: 3, deltaAB: 45, view: 'panorama', lens: 'mandukya', drive: 'kalpa', play: true, still: 0.5 }
  };
  const NOTES = {
    'turiya-zero-tilt-pure-brahman': ['图里亚：θ = 0，Ψ 与实轴 I 重合，cos²θ = 1、sin²θ = 0。侧视（俯仰 0）下梦海半径 sin θ = 0，没有梦，也没有格拉姆窗（M = 0）；银白的实轴与它顶端的琥珀态就是全部。',
      'Turīya: at θ = 0, Ψ coincides with the real axis I, cos²θ = 1 and sin²θ = 0. Seen edge-on (pitch 0) the sea has radius sin θ = 0: no dream and no Gram window (M = 0); the silver axis and the amber state at its top are all there is.'],
    'waking-consensus-dottie-lock': ['醒（集体共识大梦）：θ = θ* ≈ 42.35°，银白实轴上留 cos²θ = 0.5462，品红梦海里是 sin²θ = 0.4538，总和恒为 1。四道青色格拉姆窗锁住梦中的 ψ<sub>A</sub>（青）与梦晶 ψ<sub>B</sub>（蓝），比较弦读 cos²30° = 0.7500。时间轴让梦海转，预算不变。',
      'Waking (the shared consensus dream): at θ = θ* ≈ 42.35° the silver axis keeps cos²θ = 0.5462 and the magenta sea holds sin²θ = 0.4538, always summing to 1. Four cyan Gram windows lock the dreamer ψ<sub>A</sub> (cyan) and the dream crystal ψ<sub>B</sub> (blue); the chord reads cos²30° = 0.7500. The rail turns the sea; the budget does not change.'],
    'insider-double-imaginary-solidity': ['梦中视角：俯视并随 ψ<sub>A</sub> 同转，θ = 60°。ψ<sub>A</sub> 与 ψ<sub>B</sub> 都离实轴 90°（⟨I, ψ<sub>A</sub>⟩ = 0），但两重虚数相乘 JᵀJ = +1，彼此比较是实的：⟨ψ<sub>A</sub>, ψ<sub>B</sub>⟩² = cos²30° = 0.7500 ≥ 0，梦里的东西摸起来是硬的。',
      'Inside the dream: looking down and turning with ψ<sub>A</sub>, θ = 60°. ψ<sub>A</sub> and ψ<sub>B</sub> are both 90° from the real axis (⟨I, ψ<sub>A</sub>⟩ = 0), yet the two imaginaries multiply to JᵀJ = +1 and their comparison is real: ⟨ψ<sub>A</sub>, ψ<sub>B</sub>⟩² = cos²30° = 0.7500 ≥ 0, so what is dreamt feels solid.'],
    'private-dream-and-seed-sleep': ['私梦入熟睡：只剩一道格拉姆窗（M = 1），ψ<sub>A</sub>、ψ<sub>B</sub> 的夹角在 55° 附近漂移 ±18°；时间轴把 θ 从 65° 推到 90°，实部 cos²θ 趋于 0，Ψ 躺进梦海；到 90° 端点时现行窗口挂起为 M_act = 0，比较对象与连弦撤去。τ = 0.5 时 θ = 77.5°，sin²θ = 0.9532。',
      'Private dream into deep sleep: only one Gram window is left (M = 1) and the angle of ψ<sub>A</sub>, ψ<sub>B</sub> drifts by ±18° about 55°; the rail pushes θ from 65° to 90°, the real part cos²θ goes to 0 and Ψ lies down in the sea; at the 90° endpoint the active window is suspended to M_act = 0 and the compared objects and chord are removed. At τ = 0.5, θ = 77.5° and sin²θ = 0.9532.'],
    'kalpa-mobius-lucid-awakening': ['劫波与清明：旋量沿紫色莫比乌斯带走 ϑ = 720°τ。转满一圈 ϑ = 360° 时梦回到原处，旋量的小旗却在带的另一面，e<sup>iϑ/2</sup> = −1；再走一圈 ϑ = 720° 才回到 +1。I 切面（带宽竖直）与 î 切面（带宽水平）是同一条带；θ 留在 42.35°，梦不被拆掉。',
      'Kalpa and lucidity: the spinor runs along the violet Möbius ribbon, ϑ = 720°τ. After one turn, ϑ = 360°, the dream is back where it was but the spinor flag is on the other face, e<sup>iϑ/2</sup> = −1; one more turn, ϑ = 720°, brings it back to +1. The I slice (width vertical) and the î slice (width horizontal) are one ribbon; θ stays at 42.35° and the dream is not torn down.']
  };
  // A cited figure has a fixed frame: one short sentence per card, no sub- or superscripts.
  const FIGURE_NOTES = {
    'turiya-zero-tilt-pure-brahman': ['θ = 0：Ψ 就是实轴 I，梦海半径为 0，cos²θ = 1。', 'θ = 0: Ψ is the real axis I, the sea has radius 0 and cos²θ = 1.'],
    'waking-consensus-dottie-lock': ['θ* = 42.35°：实轴留 0.5462，梦海 0.4538，四道窗锁住比较 0.7500。', 'θ* = 42.35°: the axis keeps 0.5462, the sea 0.4538, four windows lock the comparison at 0.7500.'],
    'insider-double-imaginary-solidity': ['梦中俯视：两者都离 I 90°，彼此比较仍是 cos²30° = 0.7500。', 'Inside, looking down: both are 90° from I, yet they compare at cos²30° = 0.7500.'],
    'private-dream-and-seed-sleep': ['一道窗、夹角漂移；θ = 77.5° 时梦权 sin²θ = 0.9532。', 'One window, the angle drifts; at θ = 77.5° the dream weight is sin²θ = 0.9532.'],
    'kalpa-mobius-lucid-awakening': ['旋量走完 360°：梦回原处，小旗在带的另一面，读 −1。', 'The spinor has run 360°: the dream is back, the flag on the other face reads −1.']
  };
  function applyPreset(id) {
    const p = PRESETS[id];
    stopBootPlay(); clock.pause();
    const before = eff();
    if (transition) transition.cancel();
    transition = null;
    S.thetaDeg = p.thetaDeg; S.gramM = p.gramM; S.deltaAB = p.deltaAB; S.lens = p.lens; S.drive = p.drive; S.from = null; S.blend = 1;
    viewChips.set(p.view, true);
    const plays = p.play && !TRV.still && (!booting || TRV.embed);
    clock.set(plays ? 0 : p.still);
    moveCamera(p.view, booting || TRV.still ? 0 : 800);
    if (!booting && !TRV.still) startBlend(before, 600);
    syncFields();
    if (plays) { if (booting) bootAutoplay(); else clock.play(); }
    paint();
  }
  const cards = kit.cards($('presets'), {
    presets: PRESETS, notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拉入梦倾角 θ、格拉姆窗数 M 与梦中夹角 Δθ，换透镜与视角，拖琥珀手柄。时间轴让梦海转过 ϑ = 720°τ。随时可以再选一张卡。', 'Free play: pull the tilt θ, the number of Gram windows M and the dream angle Δθ, switch the lens and the view, drag the amber handle. The rail turns the sea through ϑ = 720°τ. Pick a card again at any time.']
  });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.BRAHMAN_DREAM_DEBUG = Object.freeze({
    get state() {
      const m = model(), I = instances(m);
      return JSON.parse(JSON.stringify({
        preset: cards.current, t: clock.t, playing: clock.playing, view: S.view, lens: S.lens, drive: S.drive, blending: !!(S.from && S.blend < 1), cameraMoving: !!camMove,
        thetaDeg: m.thetaDeg, theta: m.theta, gramM: m.M, deltaAB: m.deltaAB, delta: m.delta, drift: m.drift, consensus: m.consensus, zone: m.zone,
        tau: m.tau, phi: m.phi, vartheta: m.vartheta, alphaA: m.alphaA, alphaB: m.alphaB,
        cos: m.cos, sin: m.sin, cos2: m.cos2, sin2: m.sin2, budget: m.budget, eRef: m.eRef,
        Ivec: m.Ivec, Itau: m.Itau, JItau: m.JItau, Psi4: m.Psi4, uA: m.uA, uB: m.uB, psiA4: m.psiA4, psiB4: m.psiB4, J: J4,
        Psi: m.Psi, psiA: m.psiA, psiB: m.psiB, seaRadius: m.sin, dreamRadius: m.rho,
        born: m.born, overlapIA: m.overlapIA, overlapIPsi: m.overlapIPsi, gramUU: m.gramUU, gramPsiPsi: m.gramPsiPsi,
        lift: m.lift, flag: m.flag, spinorAt: m.spinorAt, ribbon: { radius: R_RIB, halfWidth: H_RIB, z: Z_RIB },
        dottieTheta: DOTTIE, leanInstances: I, camera: Object.assign({}, sc.cam), handle: FRAME ? FRAME.handle : null, labels: PLACED, stageFrame: FRAME
      }));
    },
    /** Set the state as a reader would with the controls (leaves the card, pauses the clock). */
    setState(o) {
      leave();
      if (o.lens != null) S.lens = o.lens === 'algebra' ? 'algebra' : 'mandukya';
      if (o.thetaDeg != null) S.thetaDeg = clamp(o.thetaDeg, 0, 90);
      if (o.gramM != null) S.gramM = Math.round(clamp(o.gramM, 0, 6));
      if (o.deltaAB != null) S.deltaAB = Math.round(clamp(o.deltaAB, 0, 90));
      syncFields();
      if (o.view != null) { viewChips.set(VIEWS[o.view] ? o.view : 'panorama', true); moveCamera(VIEWS[o.view] ? o.view : 'panorama', 0); }
      if (o.t != null) clock.set(clamp(o.t, 0, 1));
      paint();
    },
    /** Viewport coordinates of the handle (for pointer tests), or null when hidden. */
    handleBox() { if (handle.hidden) return null; const r = handle.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; },
    /** Viewport coordinates of the point of the current meridian of Ψ at the tilt thetaDeg, for drag targets. */
    dragTarget(thetaDeg) {
      const b = stageEl.getBoundingClientRect(), t = thetaDeg * DEG, q = sc.p(add(scale(ZHAT, Math.cos(t)), scale(hor(2 * TAU * S.tau), Math.sin(t))));
      return { x: b.left + stageEl.clientLeft + q[0], y: b.top + stageEl.clientTop + q[1] };
    }
  });
  window.TRV_THUMB = () => { cards.pick('waking-consensus-dottie-lock'); clock.pause(); clock.set(0.5); moveCamera('panorama', 0); paint.now(); };
  cards.pick(cards.initial('waking-consensus-dottie-lock'));
  booting = false;
  paint();
})();
