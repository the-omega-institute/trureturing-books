import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, settle, until, playsAfter, openStill, stageFirstChecks, cjkLeftovers, overflowX, capitalGreek, solidPixels, routeLocalFonts } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'triadic-nameless-sandbox';
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', ID);
const CARDS = ['bootstrap-core', 'cascade-corolla', 'cyclic-triality', 'ladder-fade', 'noumenon-breath'];
const GIDS = [
  'D5/S3/Geometry/TwoAxisFiniteRotation.unit_perpendicular_pair',
  'D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape',
  'D5/S3/Geometry/TwoAxisFiniteRotation.moving_axis_invariance',
  'D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel'
];
const T = await session(), { page, check } = T;
await stageFirstChecks(T, 'quantum-geometry', 'triadic-nameless-sandbox', { solid: { preset: 'bootstrap-core' } });
const near = (a, b, eps = 1e-12) => Math.abs(a - b) <= eps;
const dot = (a, b) => a.reduce((s, v, i) => s + v * b[i], 0);
const add = (a, b) => a.map((v, i) => v + b[i]);
const scale = (a, c) => a.map((v) => v * c);
const sub = (a, b) => a.map((v, i) => v - b[i]);
const cross = (a, b) => [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]];
const norm = (a) => Math.hypot(...a), unit = (a) => scale(a, 1 / norm(a));
const PHI = (1 + Math.sqrt(5)) / 2;
const state = () => page.evaluate(() => window.TRIAD_DEBUG.getState());
const call = (fn, ...args) => page.evaluate(([f, a]) => window.TRIAD_DEBUG[f](...a), [fn, args]);
const pause = (p) => p.evaluate(() => TRV.kit.pause());

for (const file of ['index.html', 'style.css', 'main.js']) {
  const src = fs.readFileSync(path.join(DIR, file), 'utf8');
  check(`source ${file}: colours come only from tokens`, !/#[\da-f]{3,8}\b|\b(?:rgba?|hsla?)\s*\(/i.test(src));
}
const html = fs.readFileSync(path.join(DIR, 'index.html'), 'utf8');
check('source: the exact four frozen citations', [...new Set([...html.matchAll(/data-lean-gid="([^"]+)"/g)].map((m) => m[1]))].sort().join() === [...GIDS].sort().join());
await T.goto(BOOK, ID, '?lang=zh'); await settle(page);
check('source: equal bilingual element counts', await page.evaluate(() => document.querySelectorAll('.zh').length === document.querySelectorAll('.en').length));
check('source: five cards in the specified order', (await page.$$eval('#presets [data-preset]', (es) => es.map((e) => e.dataset.preset))).join() === CARDS.join());
check('source: scripts and styles follow the shared contract', await page.evaluate(() => [...document.scripts].filter((s) => s.src).map((s) => s.getAttribute('src')).join() === '../assets/shell.js,../assets/kit.js,main.js' && [...document.querySelectorAll('link[rel="stylesheet"]')].filter((e) => !e.href.startsWith('https:')).map((e) => e.getAttribute('href')).join() === '../assets/theme.css,style.css'));

// 独立向量、余子式与球面立体角计算，不复用页面的核算函数。
function expected(c, r) {
  const h = Math.sqrt((1 + 2*c) / 3), rho = Math.sqrt(1-h*h);
  const V = [0,1,2].map((m) => [rho*Math.cos(2*Math.PI*m/3+Math.PI/6),rho*Math.sin(2*Math.PI*m/3+Math.PI/6),h]);
  const i = r, j = (r+1)%3, k = (r+2)%3;
  const Sij = unit(add(V[i], V[j])), Aij = unit(cross(V[i], V[j]));
  const alpha = dot(V[k], Sij), beta = dot(V[k], Aij);
  const g = V.map((a) => V.map((b) => dot(a,b)));
  const determinant = g[0][0]*(g[1][1]*g[2][2]-g[1][2]*g[2][1])-g[0][1]*(g[1][0]*g[2][2]-g[1][2]*g[2][0])+g[0][2]*(g[1][0]*g[2][1]-g[1][1]*g[2][0]);
  const omega = 2*Math.atan2(Math.abs(dot(V[0],cross(V[1],V[2]))),1+dot(V[0],V[1])+dot(V[1],V[2])+dot(V[2],V[0]));
  return { V, Sij, Aij, alpha, beta, determinant, omega };
}
for (let m = 0; m <= 14; m++) {
  const c = 0.20 + m * 0.05;
  await call('setC0', c); await settle(page);
  const roleStates = [];
  for (let r = 0; r < 3; r++) {
    await call('setRole', r); await settle(page);
    const s = await state(), x = expected(c,r); roleStates.push(s);
    check(`geometry c₀=${c.toFixed(2)}, r=${r}: unit equicorrelated triad`, s.V.every((v,i) => near(norm(v),1) && norm(sub(v,x.V[i]))<1e-12 && s.V.every((q,j) => i===j || near(dot(v,q),c))));
    check(`geometry c₀=${c.toFixed(2)}, r=${r}: exact orthogonal decomposition`, Math.abs(dot(s.Sij,s.Aij))<1e-12 && norm(sub(s.Sij,x.Sij))<1e-12 && norm(sub(s.Aij,x.Aij))<1e-12 && near(s.alpha,x.alpha) && near(s.beta,x.beta) && s.beta>0 && near(s.alpha**2+s.beta**2,1) && norm(sub(add(scale(s.Sij,s.alpha),scale(s.Aij,s.beta)),s.V[(r+2)%3]))<1e-12);
    check(`geometry c₀=${c.toFixed(2)}, r=${r}: determinant by cofactors, Girard against solid angle`, near(s.detG,x.determinant) && near(s.detG,(1-c)**2*(1+2*c)) && near(s.omega,x.omega) && near(s.omega,3*Math.acos(c/(1+c))-Math.PI) && s.omega>0 && s.detG>0);
  }
  check(`triality c₀=${c.toFixed(2)}: geometry fixed, roles cycle`, roleStates.every((s,r) => s.V.every((v,i) => norm(sub(v,roleStates[0].V[i]))<1e-12) && near(s.detG,roleStates[0].detG) && near(s.omega,roleStates[0].omega) && s.roles.dyad0===r && s.roles.dyad1===(r+1)%3 && s.roles.proj===(r+2)%3));
  for (const [depth,count] of [[1,1],[2,4],[3,10]]) {
    const cells = await call('cellsAt', c, depth);
    check(`cascade c₀=${c.toFixed(2)}, depth ${depth}: ${count} positive unit cells`, cells.length===count && cells.every((cell) => cell.vertices.every((v) => near(norm(v),1)) && dot(cell.vertices[0],cross(cell.vertices[1],cell.vertices[2]))>1e-12));
    check(`cascade c₀=${c.toFixed(2)}, depth ${depth}: outward golden steps`, cells.filter((cell) => cell.level).every((cell) => {
      const [a,b]=cell.edge, M=unit(add(a,b)), C=unit(cells[cell.parent].vertices.reduce(add,[0,0,0]));
      const N=cell.normal, delta=0.42*PHI**(1-cell.level);
      return Math.abs(dot(M,N))<1e-12 && Math.abs(dot(N,a))<1e-12 && Math.abs(dot(N,b))<1e-12 && dot(N,sub(C,scale(M,dot(C,M))))<0 && near(cell.delta,delta) && norm(sub(cell.point,add(scale(M,Math.cos(delta)),scale(N,Math.sin(delta)))))<1e-12;
    }));
  }
}
check('homotopy: smooth cut endpoints and half withdrawal', near(await call('wCut',1),1) && near(await call('wCut',0.35),0.28175) && near(await call('wCut',0),0));
await page.click('[data-preset="bootstrap-core"]'); await settle(page);
let s = await state();
check('bootstrap: default numerical readouts', near(s.c0,0.72) && near(s.nuLang,0.90) && near(s.detG,0.191296) && near(s.omega,expected(0.72,0).omega));
check('bootstrap: named labels and three screens', (await page.locator('.stage .tag:not([hidden])').count())>=4 && s.screenCount===3 && s.rayCount===5);
check('bootstrap: the opaque body hides the origin bead and exposes a surface bead', await page.evaluate(() => { const ms=TRV.solids[0].marks(); return ms.some((m)=>m.key==='origin'&&m.hidden)&&ms.some((m)=>m.kind==='bead'&&!m.hidden); }));
const pixels=await solidPixels(page);
check('bootstrap: substantial lit opaque manifold', pixels.share>=0.16 && pixels.spread>=0.05, JSON.stringify(pixels));
const initialCamera = await page.evaluate(() => ({...TRV.solids[0].cam}));
await page.evaluate(() => { TRV.solids[0].cam.yaw += 1.1; TRV.solids[0].cam.pitch = 0.85; }); await settle(page);
const turnedPixels = await solidPixels(page);
const histogramDistance = pixels.hist.reduce((sum,v,i)=>sum+Math.abs(v-turnedPixels.hist[i]),0)/2;
check('bootstrap: camera turn changes the luminance histogram by at least 0.06',histogramDistance>=0.06,String(histogramDistance));
await page.evaluate((cam) => Object.assign(TRV.solids[0].cam,cam), initialCamera); await settle(page);
for (const [depth,count] of [[1,1],[2,4],[3,10]]) {
  await page.click(`#GenDepth [data-depth="${depth}"]`); await settle(page);
  check(`depth control ${depth}: ${count} visible cells`, (await state()).renderedCells===count);
}
for (let r=0;r<3;r++) {
  await page.click(`#RoleIndex [data-role="${r}"]`); await settle(page);
  check(`role control ${r}: correct bead colours`, (await state()).vertexRoles.filter((x)=>x==='dyad').length===2 && (await state()).vertexRoles[(r+2)%3]==='projection');
}
for (const [card,t] of [['bootstrap-core',0],['cascade-corolla',12],['cyclic-triality',6],['ladder-fade',0],['noumenon-breath',7.4]]) for (const lang of ['zh','en']) {
  const p = await openStill(T,BOOK,ID,card,lang), st = await p.evaluate(()=>TRIAD_DEBUG.getState());
  check(`still ${card} (${lang}): declared frame, paused`, near(st.t,t) && !st.playing && st.preset===card);
  if (card==='cascade-corolla') check(`still corolla (${lang}): ten complete cells`, st.renderedCells===10 && near(st.grow,1));
  if (card==='noumenon-breath') check(`still nameless (${lang}): ladder completely withdrawn`, st.nuLang===0 && st.screenCount===0 && st.rayCount===0 && (await p.locator('.stage .tag:not([hidden])').count())===0 && near(st.omega2/st.omega1,PHI));
  await p.context().close();
}
for (const card of ['cascade-corolla','cyclic-triality','noumenon-breath']) {
  await pause(page);
  check(`playback ${card}: starts and advances`,await playsAfter(page,()=>page.click(`[data-preset="${card}"]`),()=>TRIAD_DEBUG.getState()));
  await pause(page); await settle(page);
}
await page.click('[data-preset="cascade-corolla"]'); await pause(page); await settle(page);
for (const [time,count] of [[0,1],[6,4],[12,10]]) {
  await page.$eval('#now',(el,v)=>{el.value=String(v);el.dispatchEvent(new Event('input',{bubbles:true}));},time);await settle(page);
  check(`growth rail τ=${time}: ${count} cells`,(await state()).renderedCells===count);
}
await page.click('[data-preset="noumenon-breath"]'); await pause(page); await settle(page);
check('nameless: no vertex beads, ribs, screens, rays or tags', await page.evaluate(()=>{const s=TRIAD_DEBUG.getState(),ms=TRV.solids[0].marks();return s.nuLang===0&&s.screenCount===0&&s.rayCount===0&&document.querySelectorAll('.stage .tag:not([hidden])').length===0&&ms.length===2&&ms.some((m)=>m.key==='origin'&&m.hidden)&&ms.some((m)=>m.key==='floating'&&m.kind==='ring');}));
check('nameless: outer explanatory interface stays populated', await page.evaluate(()=>['hudTl','tour','presetNote','readouts'].every((id)=>document.getElementById(id).textContent.trim().length>10)&&document.getElementById('plot').width>0));
await call('setNu',0.90);await settle(page);
check('controls remain responsive after withdrawal', (await state()).screenCount===3);
await page.$eval('#nuLang',(el)=>{el.value='0.35';el.dispatchEvent(new Event('input',{bubbles:true}));});await settle(page);
check('cut slider: live weight and free exploration',near((await state()).wCut,0.28175)&&(await state()).preset===null);
await page.$eval('#c0',(el)=>{el.value='0.53';el.dispatchEvent(new Event('input',{bubbles:true}));});await settle(page);
check('overlap slider: live geometry',near((await state()).c0,0.53));
const pb=await call('plotBox');
await page.locator('#plot').scrollIntoViewIfNeeded();
const pr=await page.locator('#plot').boundingBox();
await page.mouse.click(pr.x+pb.pad+pb.width*(0.8-0.2)/0.7,pr.y+pr.height/2);await settle(page);
check('strip plot: pointer sets overlap', Math.abs((await state()).c0-0.8)<0.003);
await page.click('[data-preset="bootstrap-core"]');await settle(page);
const before=(await state()).c0;
const handle=await page.evaluate(()=>{const g=TRIAD_DEBUG.getState();return TRIAD_DEBUG.screen(g.Sij.map((v)=>v*1.04));});
await page.mouse.move(...handle);await page.mouse.down();await page.mouse.move(handle[0]+30,handle[1],{steps:6});await page.mouse.up();await settle(page);
check('comparison bead: dragging changes the inner product', (await state()).c0>before+0.05,JSON.stringify([before,(await state()).c0]));
for (const view of ['iso','noun','verb','proj','noumenon']) {
  await page.click(`[data-scene="${view}"]`);await settle(page);
  check(`scene ${view}: camera view selected`,(await state()).view===view);
}
check('animation can be observed without fixed delays', await until(page,()=>!!TRIAD_DEBUG.getState().V));

async function labelAudit(p) {
  return p.evaluate(()=>{
    const stage=document.getElementById('stage').getBoundingClientRect();
    const vis=(el)=>!el.hidden&&el.getClientRects().length&&getComputedStyle(el).opacity!=='0'&&getComputedStyle(el).visibility!=='hidden';
    const tags=[...document.querySelectorAll('.stage .tags .tag')].filter(vis).map((el)=>({text:el.textContent,r:el.getBoundingClientRect()}));
    const hud=[...document.querySelectorAll('.stage > .hud-tl,.stage > .hud-tr,.stage > .hud-bl')].filter(vis).map((el)=>({text:el.className,r:el.getBoundingClientRect()}));
    const hit=(a,b)=>Math.max(0,Math.min(a.right,b.right)-Math.max(a.left,b.left))*Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top));
    const bad=[];
    tags.forEach((a,i)=>{
      if(a.r.left<stage.left||a.r.right>stage.right||a.r.top<stage.top||a.r.bottom>stage.bottom)bad.push('clipped '+a.text);
      for(const b of [...tags.slice(i+1),...hud])if(hit(a.r,b.r)>0.1)bad.push(a.text+' / '+b.text);
    });
    return {bad,n:tags.length};
  });
}
const SIZES=[['desktop',1280,800,''],['shot',800,450,'&shot=1'],['figure',740,520,'&embed=1'],['phone',390,844,''],['narrow',334,620,'&embed=1']];
for (const [name,width,height,mode] of SIZES) for (const lang of ['zh','en']) for (const scheme of ['dark','light']) {
  const ctx=await T.browser.newContext({viewport:{width,height},locale:lang==='zh'?'zh-CN':'en-US',colorScheme:scheme,reducedMotion:'reduce'});
  await routeLocalFonts(ctx,T.origin);
  const p=await ctx.newPage();p.on('pageerror',(e)=>T.errors.push(e.message));
  const bad=[];let total=0;
  for (const card of CARDS) {
    await p.goto(T.url(BOOK,ID,`?lang=${lang}&preset=${card}${mode}`),{waitUntil:'load'});
    await p.evaluate(()=>document.fonts.ready);await settle(p);
    const a=await labelAudit(p);total+=a.n;
    if(a.bad.length)bad.push(card+': '+a.bad.join('; '));
    if(card==='noumenon-breath'&&a.n!==0)bad.push('nameless tags remain');
    if(card!=='noumenon-breath'&&a.n<4)bad.push(card+': fewer than four labels');
    if(lang==='en')bad.push(...(await cjkLeftovers(p)));
    bad.push(...(await capitalGreek(p)));
    if((await overflowX(p))>0)bad.push('horizontal overflow');
  }
  check(`labels ${name} ${width}×${height}, ${lang}, ${scheme}: all cards clear, inside and translated`,bad.length===0&&total>=16,bad.slice(0,4).join(' | '));
  await ctx.close();
}
check('suite: no page, console or request errors',T.errors.length===0,T.errors.slice(0,5).join(' | '));
await T.finish();
