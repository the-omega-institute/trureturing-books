/* 场内记录、完整布尔目录与有限轮滚动地平线。 */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, clamp, v3 } = kit, $ = id => document.getElementById(id);
  const TAU = Math.PI * 2;
  const S = { scene: 'bootstrap-ledger', epsilon: 55, M: 5, k: 1, n: 3, kappa: 1, joined: false, rows: [] };
  const PRESETS = {
    'bootstrap-ledger': { epsilon: 55, M: 5, k: 1, still: 0, play: false },
    'lawvere-godel': { epsilon: 55, M: 5, k: 1, still: 0, play: false },
    'ordinal-spiral': { epsilon: 55, M: 5, k: 1, still: 4, play: true },
    'bidirectional-parallax': { epsilon: 55, M: 5, k: 1, still: 3, play: false },
    'frozen-omniscience': { epsilon: 55, M: 5, k: 1, still: 3, play: true }
  };
  const NOTES = {
    'bootstrap-ledger': ['紫砖体积平方 sin⁴ε；写入 k 个琥珀条目，生出 kM_t+C(k,2) 条品红比较边。', 'The violet brick has squared volume sin⁴ε; k amber entries create kM_t+C(k,2) magenta comparison edges.'],
    'lawvere-godel': ['目录穷尽 X 上的布尔函数，品红逃逸串仍劈开旧纤维；conceptJoin 将同一串的亏损归零。', 'The catalog covers every Boolean function on X, yet its magenta escape string splits old fibers; conceptJoin removes the deficit for that same string.'],
    'ordinal-spiral': ['青色旧弦已编译；紫色阶梯与品红外沿逐轮张开。此处只画有限序数扩表模型。', 'Cyan chords are compiled; violet steps and the magenta rim expand each round. This is a finite ordinal table-growth model.'],
    'bidirectional-parallax': ['同一琥珀前沿 D_t：回看青色零损快表，前看品红同前缀异未来的两支纤维。', 'One amber frontier D_t: backward to a cyan zero-loss table, forward to magenta branches sharing a prefix but differing in future bit.'],
    'frozen-omniscience': ['左侧灰晶体 κ_open=0，右侧由滑块调节开口；冻结与活体对照均为 MODEL。', 'The left slate crystal has κ_open=0; the slider controls the right opening. Frozen and living views are both MODEL.']
  };
  let clock, cards, fields, sizes, booting = true, tween = null, frame = null;
  let labels = [], bounds = null, matrixKey = '', dragging = null;
  const sc = kit.solid($('stage'), { canvas: $('cv'), radius: 0.25, pitch: 0.45, yaw: -0.65, cy: 0.55,
    onChange: () => paint() });
  const paint = kit.painter(draw, [$('stage'), $('plot')]);
  function resetRows() { S.rows = Array.from({ length: 2 ** S.n }, (_, i) => i); S.joined = false; matrixKey = ''; }
  resetRows();
  function math() {
    const e = S.epsilon * Math.PI / 180, c = Math.cos(e), s = Math.sin(e);
    const vectors = [[1, 0, 0], [c, s, 0], [c, 0, s]];
    const rows = S.rows.map(word => Array.from({ length: S.n }, (_, x) => (word >> x) & 1));
    const latent = rows.map((_, y) => y % S.n), diagonal = rows.map((r, y) => 1 - r[latent[y]]);
    const before = [], pairs = [];
    for (let a = 0; a < rows.length; a++) for (let b = 0; b < rows.length; b++) {
      if (latent[a] === latent[b] && diagonal[a] !== diagonal[b]) { before.push([a, b]); if (!S.joined) pairs.push([a, b]); }
    }
    const round = Math.floor((clock ? clock.t : 0) + 1e-8), delta = S.k * S.M + S.k * (S.k - 1) / 2;
    const novelty = Array.from({ length: 7 }, (_, r) => S.k * (S.M + r * S.k) + S.k * (S.k - 1) / 2 - S.k);
    return { vectors, gram: vectors.map(a => vectors.map(b => v3.dot(a, b))), detG: s ** 4, volume: s ** 2, residual: [0, 0, s],
      deltaPi: delta, resolved: S.k, net: delta - S.k, rows, latent, diagonal, before, pairs,
      blocksBefore: new Set(latent).size, blocksAfter: new Set(latent.map((x, y) => `${x}:${diagonal[y]}`)).size,
      round, novelty, futureBits: [0, 1], prediction: round % 2, retrospectiveLoss: 0,
      failure: [0, 1].filter(b => b !== round % 2).length / 2,
      liveResidual: S.kappa * s, liveDet: (S.kappa * s) ** 4, dTau: S.kappa,
      modelTime: S.kappa * (clock ? clock.t : 0) };
  }
  function free() { if (tween) tween.cancel(); tween = null; clock.pause(); cards.mark(null); }
  function sync() {
    for (const [id, key] of [['epsilon', 'epsilon'], ['pool', 'M'], ['batch', 'k'], ['kappa', 'kappa']]) fields[id].set(S[key]);
    sizes.set(String(S.n), true); $('join').setAttribute('aria-pressed', String(S.joined));
  }
  clock = kit.clock({ range: $('now'), play: $('play'), label: $('tau'), max: 6, step: 1, rate: 0.65,
    format: t => `t ${fix(t, 2)} <small>/ 6</small>`, onChange: () => paint() });
  fields = {};
  for (const [id, key] of [['epsilon', 'epsilon'], ['pool', 'M'], ['batch', 'k'], ['kappa', 'kappa']]) {
    fields[id] = kit.field($(id), { fmt: v => id === 'kappa' ? fix(v, 2) : String(v), onInput: v => { free(); S[key] = v; paint(); } });
  }
  sizes = kit.chips($('sizeChips'), 'size', n => { free(); S.n = Number(n); resetRows(); sync(); paint(); });
  $('join').addEventListener('click', () => { free(); S.joined = !S.joined; sync(); paint(); });
  $('resetCatalog').addEventListener('click', () => { free(); resetRows(); sync(); paint(); });
  $('matrix').addEventListener('click', ev => {
    const b = ev.target.closest('button[data-row]'); if (!b) return;
    free(); const y = Number(b.dataset.row), x = Number(b.dataset.col), target = S.rows[y] ^ (1 << x), other = S.rows.indexOf(target);
    [S.rows[y], S.rows[other]] = [S.rows[other], S.rows[y]]; S.joined = false; matrixKey = ''; sync(); paint();
  });
  cards = kit.cards($('presets'), { presets: PRESETS, notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), idle: ['自由探索：读数与图形同步更新。', 'Free exploration: geometry and readouts update together.'], onPick: id => {
    if (tween) tween.cancel(); clock.pause();
    const old = S.epsilon, p = PRESETS[id]; Object.assign(S, { scene: id, epsilon: p.epsilon, M: p.M, k: p.k, n: 3, kappa: 1 }); resetRows();
    clock.set(0, true);
    if (TRV.still || (booting && !TRV.embed)) clock.set(p.still);
    sync();
    if (!booting && !TRV.still) tween = kit.tween(420, q => { S.epsilon = old + (p.epsilon - old) * q; fields.epsilon.set(S.epsilon); paint(); });
    if (p.play && !TRV.still && (!booting || TRV.embed)) { if (booting) kit.autoplay(clock, $('stage')); else clock.play(); }
    paint();
  } });
  for (const [id, fn] of [['rew', () => { clock.pause(); clock.set(0); }], ['prevStep', () => clock.stepBy(-1)], ['nextStep', () => clock.stepBy(1)]]) $(id).addEventListener('click', fn);
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  function label(x, y, text, color = 'slate') { if (!TRV.thumbMode) labels.push({ x, y, text, color }); }
  function showLabels() {
    $('stageLabels').innerHTML = labels.map(({ x, y, text, color }) => `<span class="tag ${color}" style="left:${x}px;top:${y}px">${text}</span>`).join('');
    if (S.scene === 'bootstrap-ledger' && !TRV.thumbMode) {
      const h = document.createElement('button'); h.id = 'angleHandle'; h.textContent = 'ε'; h.setAttribute('aria-label', L('拖动改变夹角', 'Drag to change angle'));
      h.style.left = `${bounds.W * 0.85}px`; h.style.top = `${bounds.top + bounds.H * 0.53}px`;
      h.addEventListener('pointerdown', ev => { free(); dragging = { x: ev.clientX, e: S.epsilon, pointer: ev.pointerId }; h.setPointerCapture(ev.pointerId); });
      h.addEventListener('pointermove', ev => { if (!dragging) return; S.epsilon = clamp(dragging.e + (ev.clientX - dragging.x) * 0.6, 5, 175); fields.epsilon.set(S.epsilon); paint(); });
      h.addEventListener('pointerup', () => { dragging = null; paint(); });
      $('stageLabels').appendChild(h);
    }
  }
  function draw() {
    if (!clock || !cards || !fields) return;
    frame = math(); labels = [];
    const G = frame, P = TRV.palette, narrow = $('stage').clientWidth < 500;
    const titles = { 'bootstrap-ledger': ['场内建表 · 二生三', 'Internal table · two begets three'], 'lawvere-godel': ['满射目录 · 对角逃逸', 'Surjective catalog · diagonal escape'], 'ordinal-spiral': ['序数飞轮 · 内收外长', 'Ordinal flywheel · compile and grow'], 'bidirectional-parallax': ['同一前沿 · 双向视差', 'One frontier · two perspectives'], 'frozen-omniscience': ['反事实护栏 · 开口与冻结', 'Counterfactual · open and frozen'] };
    $('hudBig').textContent = L(...titles[S.scene]);
    $('hudSub').textContent = S.scene === 'bootstrap-ledger' ? `det G = sin⁴ε = ${fix(G.detG, 5)} > 0` : S.scene === 'lawvere-godel' ? `|E| = ${G.rows.length} · |X| = ${S.n} · deficit = ${G.pairs.length}` : S.scene === 'ordinal-spiral' ? `T₀ → T₁ → T₂ → … · t = ${G.round} · MODEL` : S.scene === 'bidirectional-parallax' ? `D_t = ${G.round + 2} · ${L('同一旧前缀，两种未来', 'same old prefix, two futures')}` : `κ_open = ${fix(S.kappa, 2)} · dτ/dt = ${fix(G.dTau, 2)} · MODEL`;
    const legend = S.scene === 'frozen-omniscience' ? [['dm', L('冻结晶体', 'Frozen crystal')], ['mg', L('开口残差', 'Open residual')], ['vi', L('体积', 'Volume')]] : [['cy', L('旧层直读', 'Old lookup')], ['mg', L('未索引／逃逸', 'Unindexed / escape')], ['vi', L('新轴／体积', 'New axis / volume')], ['am', L('当前前沿', 'Current frontier')]];
    $('legend').innerHTML = legend.map(([c, t]) => `<span><i class="sw ${c}"></i>${t}</span>`).join('');
    TRV.hudFit();
    const stageRect = $('stage').getBoundingClientRect(), hudRect = $('hudBig').parentElement.getBoundingClientRect(), legendRect = $('legend').getBoundingClientRect();
    const top = TRV.thumbMode ? 10 : hudRect.bottom - stageRect.top + 16, bottom = TRV.thumbMode ? 10 : stageRect.bottom - legendRect.top + 12;
    const W = $('cv').clientWidth, totalH = $('cv').clientHeight, H = Math.max(80, totalH - top - bottom);
    bounds = { W, H, top, bottom, totalH };
    const isSolid = S.scene === 'bootstrap-ledger'; sc.active(isSolid); $('stage').classList.toggle('still', !isSolid);
    $('catalog').hidden = S.scene !== 'lawvere-godel';
    if (isSolid) drawBrick(G, P, narrow);
    else {
      const g = kit.plot($('cv'), { x: [0, 100], y: [0, 100], pad: [14, 14, top, bottom], minHeight: 80 });
      if (S.scene === 'lawvere-godel') drawCatalog(g, G, P, narrow);
      if (S.scene === 'ordinal-spiral') drawSpiral(g, G, P);
      if (S.scene === 'bidirectional-parallax') drawParallax(g, G, P, narrow);
      if (S.scene === 'frozen-omniscience') drawFrozen(g, G, P, narrow);
    }
    if (!dragging) showLabels();
    $('pillD').textContent = String(G.round + 2);
    $('roDet').textContent = fix(G.detG, 7); $('roDelta').textContent = String(G.deltaPi); $('roNet').textContent = `${G.net} > 0`;
    $('roDeficit').textContent = `${G.pairs.length}${S.joined ? ' = ∅' : ''}`; $('roLoss').textContent = String(G.retrospectiveLoss); $('roKappa').textContent = `${fix(S.kappa, 2)} · ${fix(G.dTau, 2)}`;
    $('readoutNote').textContent = L(`旧层 ${S.M} → ${S.M + S.k} 态；解决 ${S.k} 对，新增 ${G.deltaPi} 对。亏损按有序对计；旧块 ${G.blocksBefore} → 新块 ${G.blocksAfter}。`, `Old pool ${S.M} → ${S.M + S.k} states; ${S.k} pairs resolved, ${G.deltaPi} added. Deficits count ordered pairs; ${G.blocksBefore} old blocks → ${G.blocksAfter} joined blocks.`);
    $('pairList').textContent = G.pairs.length ? G.pairs.map(([a,b]) => `(y${a},y${b})`).join(' · ') : '∅';
    const g = kit.plot($('plot'), { x: [1, 6], y: [0, 6 * S.M + 15], pad: [32, 12, 10, 25] });
    g.axes({ xTicks: [1, 2, 3, 4, 5, 6], yTicks: [0, S.M * 3, S.M * 6] });
    g.line(Array.from({ length: 6 }, (_, i) => [i+1, (i+1)*S.M+i*(i+1)/2]), P.magenta, { width: 2 });
    g.line([[1, 1], [6, 6]], P.cyan, { width: 2 }); g.vline(S.k, P.amber); g.dot(S.k, G.deltaPi, P.amber, 4);
  }
  function drawBrick(G, P, narrow) {
    const vs = G.vectors, center = v3.scale(vs.reduce(v3.add, [0,0,0]), -0.5);
    const at = v => v3.add(v, center), vertices = Array.from({ length: 8 }, (_, mask) => at(vs.reduce((v, e, i) => v3.add(v, v3.scale(e, (mask >> i) & 1)), [0,0,0])));
    sc.begin();
    sc.poly('gram-brick', { vertices, faces: [[0,2,3,1],[4,5,7,6],[0,1,5,4],[2,6,7,3],[0,4,6,2],[1,3,7,5]] }, { color: P.violet });
    const a = at([0,0,0]), b = at([Math.cos(S.epsilon*Math.PI/180),0,0]), p = at(vs[2]);
    sc.arrow(a, at(vs[0]), { color: P.cyan, width: 3 }); sc.arrow(a, at(vs[1]), { color: P.cyan, width: 3 });
    sc.line([a,b], { color: P.cyan, width: 3 }); sc.arrow(b,p,{color:P.magenta,width:4});
    sc.bead(p,{key:'entry',color:P.amber,r:7}); sc.bead(at([0.4,0.15,0.1]),{key:'inside',color:P.violet,r:3});
    const old = Array.from({length:S.M},(_,i)=>[1.2*Math.cos(TAU*i/S.M),1.2*Math.sin(TAU*i/S.M),-0.8]);
    const fresh = Array.from({length:S.k},(_,i)=>[0.65*Math.cos(TAU*i/S.k),0.65*Math.sin(TAU*i/S.k),0.95]);
    for(let i=0;i<S.k;i++) {
      for(const q of old) sc.line([q,fresh[i]],{color:P.magenta,width:1.1,alpha:0.24});
      for(let j=0;j<i;j++) sc.line([fresh[j],fresh[i]],{color:P.magenta,width:1.2,alpha:0.5});
      sc.bead(fresh[i],{key:`new-${i}`,color:P.amber,r:4});
    }
    old.forEach((q,i)=>{sc.bead(q,{key:`old-${i}`,color:P.cyan,r:3});sc.line([q,old[(i+1)%old.length]],{color:P.cyan,width:2,alpha:0.6});});
    sc.end();
    const {W,H,top}=bounds;
    label(W*0.5,top+H*0.07,`(A, B) → (A, B, P_AB)`,'violet');
    label(W*0.5,top+H*0.85,`ΔΠ_t = ${G.deltaPi} · ${L('已解', 'resolved')} ${S.k} · ${L('净增', 'net')} +${G.net}`,'magenta');
    label(W*0.5,top+H*0.99,`sin ε e_{D+1} · ${fix(Math.sin(S.epsilon*Math.PI/180),3)}`,'magenta');
  }
  function drawCatalog(g, G, P, narrow) {
    const {W,H,top}=bounds, box=$('catalog'), N=G.rows.length;
    const matrixW=Math.min(W*(narrow?0.53:0.46),240), matrixH=Math.min(H*0.84, N===16?340:280), left=12;
    box.style.left=`${left}px`;box.style.top=`${top+H*0.07}px`;box.style.width=`${matrixW}px`;box.style.setProperty('--cell-height',`${Math.max(9,(matrixH-23)/(N+1)-2)}px`);
    $('matrix').style.gridTemplateColumns=`23px repeat(${S.n}, minmax(0,1fr)) 24px`;
    const key=JSON.stringify([S.n,S.rows,S.joined,TRV.lang()]);
    if(key!==matrixKey) {
      let html='<span class="cell row-name">y</span>'+Array.from({length:S.n},(_,x)=>`<span class="cell row-name">${x}</span>`).join('')+'<span class="cell escape">g</span>';
      G.rows.forEach((r,y)=>{html+=`<span class="cell row-name">${y}</span>`+r.map((v,x)=>`<button data-row="${y}" data-col="${x}" class="${x===G.latent[y]?'diag':''}" aria-label="${L('目录','Catalog')} C(${y},${x}) = ${v}">${v}</button>`).join('')+`<span class="cell ${S.joined?'joined':'escape'}">${G.diagonal[y]}</span>`;});
      $('matrix').innerHTML=html;matrixKey=key;
    }
    const x0=narrow?62:58, x1=94;
    const position = y => { const q=G.latent[y], members=G.latent.map((v,i)=>v===q?i:-1).filter(v=>v>=0), i=members.indexOf(y); return [x0+(x1-x0)*(i+0.5)/members.length,80-q*24+(S.joined?(G.diagonal[y]?4:-4):0)]; };
    const edges=G.pairs.filter(([a,b])=>a<b);
    for(const [a,b] of edges)g.line([position(a),position(b)],P.magenta,{width:1.6,alpha:0.6});
    for(let y=0;y<N;y++){
      const p=position(y);g.dot(...p,S.joined?P.violet:(G.diagonal[y]?P.magenta:P.cyan),narrow?3:4);
      if(!TRV.thumbMode)g.text(p[0],p[1]-5,`y${y}`,P.sigma,{size:narrow?9:11,align:'center'});
    }
    for(let q=0;q<S.n;q++){
      const y=80-q*24;g.line([[x0-2,y-8],[x1+2,y-8]],P.dim,{width:1,alpha:0.4});
      label(g.X((x0+x1)/2),g.Y(y+10),`${S.joined?'(x,g)':'x'} = ${q}`,S.joined?'violet':'cyan');
    }
    if(S.joined)g.arrow([x0-4,5],[x0-4,92],{color:P.violet,width:3});
    label(W*0.5,top+H*0.99,S.joined?'conceptJoin → deficit = ∅':'g_diag(x) = !C(e(x), x)',S.joined?'violet':'magenta');
  }
  function drawSpiral(g, G, P) {
    // 在屏幕像素中保持圆弧等比，避免窄屏将正交图压成椭圆。
    const {W,H,top}=bounds, cx=W*0.5, cy=top+H*0.5, R=Math.min(W*0.4,H*0.37), ctx=g.ctx;
    const p=(a,r)=>[cx+R*r*Math.cos(a),cy+R*r*Math.sin(a)];
    function line(points,color,width,alpha=1){ctx.strokeStyle=color;ctx.lineWidth=width;ctx.globalAlpha=alpha;ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.stroke();ctx.globalAlpha=1;}
    const inner=Array.from({length:241},(_,i)=>{const a=TAU*2.5*i/240;return p(a,0.08+0.42*(1-Math.exp(-a/5)));});line(inner,P.cyan,TRV.thumbMode?5:2.5);
    for(let j=0;j<6;j++){const a=j*0.9;line([p(a,0.22),p(a+1.5,0.44)],P.cyan,2,0.5);}
    const progress=G.round/6;
    const outer=Array.from({length:241},(_,i)=>{const q=i/240,a=TAU*(0.6+1.1*q);return p(a,0.53+(0.34+0.15*progress)*q);});line(outer,P.magenta,TRV.thumbMode?6:3);
    for(let r=0;r<=6;r++){
      const a=TAU*(0.6+1.1*r/6),u=p(a,0.53+(0.34+0.15*progress)*r/6);
      const v=p(a+0.10,0.53+(0.34+0.15*progress)*r/6+0.08);line([u,[u[0],v[1]],v],r===G.round?P.amber:P.violet,r===G.round?4:2);
    }
    label(cx,top+H*0.06,`T_${G.round} → T_${G.round+1}`,'violet');
    label(cx,cy,`O(1) · D_${G.round+2}`,'cyan');
    label(cx,top+H*0.94,`${L('每轮正新颖度','Novelty each round')} +${G.novelty[G.round]}`,'magenta');
  }
  function drawParallax(g, G, P, narrow) {
    const {W,H,top}=bounds;
    const frontier=50, y=48;g.line([[frontier,14],[frontier,85]],P.amber,{width:3});
    for(let i=0;i<5;i++){const yy=25+i*11;g.line([[5,yy],[44,yy]],P.cyan,{width:i===G.round%5?4:1.5,alpha:i===G.round%5?1:0.4});g.dot(8,yy,P.cyan,3);g.dot(43,yy,P.cyan,3);}
    g.dot(50,y,P.amber,6);g.line([[50,y],[65,y]],P.magenta,{width:3});
    g.line([[65,y],[92,76]],P.magenta,{width:3});g.line([[65,y],[92,22]],P.magenta,{width:3});
    for(const yy of [22,76]){g.dot(92,yy,P.magenta,5);g.line([[80,(yy+y)/2],[94,(yy+y)/2+8],[97,(yy+y)/2-3]],P.magenta,{alpha:0.35,width:1});}
    g.arrow([64,16],[64,86],{color:P.violet,width:2});
    label(W*0.25,top+H*0.07,L('回望 · 已编译','Backward · compiled'),'cyan');
    label(W*0.76,top+H*0.07,narrow?'NP · MODEL':L('前瞻 · NP 搜索示意','Forward · NP search model'),'magenta');
    label(W*0.5,g.Y(y)-22,`D_${G.round+2}`,'amber');
    label(g.X(91),g.Y(76)+18,'b = 1','magenta');label(g.X(91),g.Y(22)+18,'b = 0','magenta');
    label(W*0.25,top+H*0.93,narrow?'loss = 0 · O(1)':'retrospectiveLoss = 0','cyan');
    label(W*0.76,top+H*0.93,L('误差 ≥ 1/2','error ≥ 1/2'),'magenta');
  }
  function drawFrozen(g, G, P, narrow) {
    const {W,H,top}=bounds;
    const crystal=[[6,48],[22,70],[42,48],[23,24]];g.poly(crystal,P.dim,{alpha:0.20});g.line([...crystal,crystal[0]],P.dim,{width:2});
    for(const q of crystal)g.line([q,[23,48]],P.dim,{width:1.2});
    const k=S.kappa,c=[75,48],radius=8+12*k;
    const ring=Array.from({length:91},(_,i)=>{const a=TAU*i/90;return[c[0]+radius*Math.cos(a),c[1]+radius*0.76*Math.sin(a)];});
    g.line(ring,k?P.violet:P.dim,{width:3});
    for(let i=0;i<7;i++){
      const a=TAU*i/7+G.modelTime*0.2,p=[c[0]+radius*Math.cos(a),c[1]+radius*0.76*Math.sin(a)],q=[p[0]+k*4*Math.cos(a),p[1]+k*12];
      g.line([c,p],k?P.cyan:P.dim,{width:1.2,alpha:0.6});if(k)g.arrow(p,q,{color:P.magenta,width:2});
    }
    if(k)g.arrow([75,48],[75,48+28*k],{color:P.magenta,width:3});
    label(W*0.25,top+H*0.08,'κ_open = 0','slate');label(W*0.75,top+H*0.08,`κ_open = ${fix(k,2)}`,k?'violet':'slate');
    label(W*0.25,top+H*0.82,'P = NP · dτ = 0','slate');label(W*0.75,top+H*0.82,`dτ/dt = ${fix(k,2)}`,k?'violet':'slate');
    label(W*0.25,top+H*0.96,L('新颖度 = 0','novelty = 0'),'slate');label(W*0.75,top+H*0.96,L(`新颖度 = ${fix(k*G.net,2)}`,`novelty = ${fix(k*G.net,2)}`),k?'magenta':'slate');
  }
  window.HORIZON_DEBUG = Object.freeze({
    get state() { return JSON.parse(JSON.stringify({ ...S, ...math(), t: clock.t, playing: clock.playing, preset: cards.current, bounds, labels })); }
  });
  window.TRV_THUMB = () => { cards.pick('bootstrap-ledger'); paint.now(); };
  cards.pick(cards.initial('bootstrap-ledger')); booting=false;paint();
})();
