/* ORTHO//ELLIPTOPE · the three-element Gram elliptope, shared by the page (main.js) and film 008 (its "bubble").
   A classic script that defines one global, QG_ELLIPTOPE. The body is 1 − x² − y² − z² + 2xyz ≥ 0 in the coordinates
   (x, y, z) of three inner products; it is drawn cut open at x = c so that the slice faces the viewer. With
   x = sin s, y = sin t its two sheets are z = xy ± √((1−x²)(1−y²)) = cos(s − t) and −cos(s + t), so the grid lines of
   the surface are the lines x = const and y = const: two of the three inner products held fixed. The drawing helper
   calls only the primitives the page's kit.solid and a film's solid shot share (surface, line), with the colour given
   by the caller (the page passes TRV.palette.violet, the film C.vio). */
(function (root) {
  'use strict';
  const HALF = Math.PI / 2, TAU = 2 * Math.PI;
  /** The upper (sign > 0) or lower sheet as a function of (s, t): (sin s, sin t, cos(s − t) or −cos(s + t)). */
  const sheet = (sign) => (s, t) => [Math.sin(s), Math.sin(t), sign > 0 ? Math.cos(s - t) : -Math.cos(s + t)];
  /** The slice x = c0 of the elliptope: r = 1 its edge (det G₃ = 0), r < 1 inside; p = (u + v)/√2, q = (u − v)/√2. */
  function slicePoint(c0, r, a) {
    const u = r * Math.sqrt(1 + c0) * Math.cos(a), v = r * Math.sqrt(1 - c0) * Math.sin(a);
    return [c0, (u + v) / Math.SQRT2, (u - v) / Math.SQRT2];
  }
  /** The solid as drawn, in (x, y, z), cut at x: rows[j][i] of the two sheets on s ∈ [−π/2, asin x], t ∈ [−π/2, π/2]
      (row j: t fixed, so y fixed; column i: s fixed, so x fixed), and the cut face (row j: radius j/rings of the slice).
      o: ns, nt (cells of the sheets, 40 × 48), rings (6) and seg (72) of the cut face. */
  function model(x, o) {
    o = o || {};
    const ns = o.ns || 40, nt = o.nt || 48, rings = o.rings || 6, nseg = o.seg || 72, s1 = Math.asin(x);
    const rows = (f) => { const out = []; for (let j = 0; j <= nt; j++) { const r = []; for (let i = 0; i <= ns; i++) r.push(f(-HALF + (s1 + HALF) * i / ns, -HALF + Math.PI * j / nt)); out.push(r); } return out; };
    const cap = []; for (let j = 0; j <= rings; j++) { const r = []; for (let i = 0; i <= nseg; i++) r.push(slicePoint(x, Math.max(j / rings, 1e-3), TAU * i / nseg)); cap.push(r); }
    return { cut: x, upper: rows(sheet(1)), lower: rows(sheet(-1)), cap, nt };
  }
  /** The part beyond the cut, as outlines: every `every`-th y-line of the two sheets carried on, and two x-slices. */
  function outlines(x, o) {
    o = o || {};
    const nt = o.nt || 48, every = o.every || 6, s1 = Math.asin(x), out = [];
    for (let j = 0; j <= nt; j += every) {
      const t = -HALF + Math.PI * j / nt;
      for (const sg of [1, -1]) { const pts = []; for (let i = 0; i <= 16; i++) pts.push(sheet(sg)(s1 + (HALF - s1) * i / 16, t)); out.push(pts); }
    }
    for (const f of [1 / 3, 2 / 3]) { const c0 = Math.sin(s1 + (HALF - s1) * f), pts = []; for (let i = 0; i <= 72; i++) pts.push(slicePoint(c0, 1, TAU * i / 72)); out.push(pts); }
    return out;
  }
  /** Draw the cut solid m = model(x, …) on a stage or a shot: the two sheets with their grid, the cut face and the
      outlines of the part cut away. o: color, scale (world units per inner-product unit), grid, ids, keys (a prefix for
      the surfaces' keys), width and alpha of the outlines, outlines (false: none). */
  function draw(st, m, o) {
    const K = o.scale == null ? 1 : o.scale, W = (p) => [K * p[0], K * p[1], K * p[2]], toW = (rows) => rows.map((r) => r.map(W));
    const grid = o.grid || { every: [5, 6] }, key = o.keys || '', ids = o.ids || {};
    st.surface(key + 'upper', toW(m.upper), { color: o.color, back: o.color, grid, id: ids.body || 'elliptope', pick: o.pick });
    st.surface(key + 'lower', toW(m.lower), { color: o.color, back: o.color, grid, id: ids.body || 'elliptope', pick: o.pick });
    st.surface(key + 'cap', toW(m.cap), { color: o.color, back: o.color, id: ids.cap || 'slice', pick: o.pick });
    if (o.outlines !== false) for (const pts of outlines(m.cut, { nt: m.nt })) st.line(pts.map(W), { color: o.color, width: o.width || 0.9, alpha: o.alpha == null ? 0.55 : o.alpha });
  }

  root.QG_ELLIPTOPE = Object.freeze({ sheet, slicePoint, model, outlines, draw });
})(typeof window !== 'undefined' ? window : globalThis);
