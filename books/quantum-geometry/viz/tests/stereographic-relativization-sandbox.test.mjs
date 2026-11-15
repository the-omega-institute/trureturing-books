import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, until, openStill, playsAfter, stageView, cjkLeftovers, overflowX, inkShare } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'stereographic-relativization-sandbox';
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', ID);
const CARDS = ['blindspot-divergence', 'compact-homotopy', 'oracle-collapse', 'oracle-chase', 'tetralemma-rest'];
const GIDS = [
  'D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line',
  'D5/S3/Quantum/Tomography/DiagonalPhaseBlindness.diagonal_prime_observables_cannot_recover_relative_phase',
  'D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel',
  'D5/S3/ConceptDynamics/DefinitionEscapeAdjudication/RetrospectiveLookupFailure.lookup_copy_zero_loss_and_nonanticipating_failure'
];
const VALUES = { 'blindspot-divergence': [1,25], 'compact-homotopy': [0.85,25], 'oracle-collapse': [0.65,0], 'oracle-chase': [0.85,65], 'tetralemma-rest': [0.50,35] };
const T = await session(), { page, check } = T;
let scheme = 'dark';
// 单一夜间主题：任何文档都不得写入或移除 data-tr-palette，加载瞬间的临时写入与随即移除也各算一次。
// 观察器在导航前由 init script 装好：每个新文档从零计数（window.__paletteLog），同时把每次变动汇报到
// 全局清单，覆盖质量门内部打开又关闭、本文件无从逐页读取的页面。每条变动记录无一例外都计入全局清单。
const paletteHits=[];
async function watchPalette(ctx) {
  await ctx.exposeBinding('__trPaletteHit',({page:p},hit)=>{paletteHits.push(`${p?p.url():'?'} ${hit}`);});
  await ctx.addInitScript(()=>{
    const log=[],take=rs=>{for(const r of rs){
      const hit=`<${r.target.nodeName.toLowerCase()}> ${r.oldValue} → ${r.target.getAttribute('data-tr-palette')}`;log.push(hit);
      if(window.__trPaletteHit)window.__trPaletteHit(hit).catch(()=>{});
    }};
    const mo=new MutationObserver(take);
    mo.observe(document,{subtree:true,attributes:true,attributeFilter:['data-tr-palette'],attributeOldValue:true});
    window.__paletteLog=()=>{take(mo.takeRecords());return log.slice();};
    // 系统配色真正切换后才派发 change；测试等它到达，而不是等一段固定时间。
    window.__schemeFlips=0;matchMedia('(prefers-color-scheme: dark)').addEventListener('change',()=>{window.__schemeFlips++;});
  });
}
const paletteLog=(p=page)=>p.evaluate(()=>typeof window.__paletteLog==='function'?window.__paletteLog():null);
await watchPalette(T.context);
const newContext = T.browser.newContext.bind(T.browser);
T.browser.newContext = async options => { const ctx = await newContext({ ...options, colorScheme: scheme }); await watchPalette(ctx); return ctx; };
// 每轮质量门的独立页面均继承该轮配色，覆盖双语、桌面、手机与书内卡。
for (scheme of ['dark', 'light']) {
  await page.emulateMedia({ colorScheme: scheme });
  await stageFirstChecks(T, BOOK, ID);
}
const near = (a,b,tol=1e-10) => Math.abs(a-b) < tol;
const state = (p=page) => p.evaluate(() => STEREO_DEBUG.state);
async function pick(id,p=page) { await p.evaluate(id => document.querySelector(`[data-preset="${id}"]`).click(),id); await settle(p); }
async function range(id,v,p=page) { await p.$eval(`#${id}`,(e,v)=>{e.value=String(v);e.dispatchEvent(new Event('input',{bubbles:true}));},v);await settle(p); }
// 1440×900 桌面整页是与 triadic 相同的标准三栏实验室：量网格轨道、栏位边界与可见框，而不只查选择器。
// 返回问题清单（空 = 通过）；依据栏自带滚动，先像读者一样滚入栏内再量，量完复原所有滚动位置。
const desktopLab=p=>p.evaluate(()=>{
  const bad=[],q=s=>document.querySelector(s),css=e=>getComputedStyle(e),rect=e=>e.getBoundingClientRect();
  const shown=e=>{if(!e||!e.getClientRects().length||css(e).visibility==='hidden')return false;for(let a=e;a;a=a.parentElement)if(css(a).opacity==='0')return false;return true;};
  const seen=e=>{const b=rect(e);let l=Math.max(b.left,0),t=Math.max(b.top,0),r=Math.min(b.right,innerWidth),d=Math.min(b.bottom,innerHeight);
    for(let a=e.parentElement;a&&a!==document.body;a=a.parentElement){const s=css(a);if(s.overflowX==='visible'&&s.overflowY==='visible')continue;const c=rect(a);l=Math.max(l,c.left);t=Math.max(t,c.top);r=Math.min(r,c.right);d=Math.min(d,c.bottom);}
    return {w:Math.max(0,r-l),h:Math.max(0,d-t)};};
  const visible=e=>{const v=seen(e);return v.w>0&&v.h>0;};
  const app=q('.app.lab'),grid=app&&css(app),tracks=grid?(grid.gridTemplateColumns.match(/[\d.]+px/g)||[]).map(parseFloat):[];
  if(!grid||grid.display!=='grid'||tracks.length!==3||!tracks.every(w=>w>0))bad.push(`.app.lab is not a three-column grid (${grid&&grid.display}: ${grid&&grid.gridTemplateColumns})`);
  const names=['deck','center','side'],cols=['.app.lab > .col.deck','.app.lab > .center','.app.lab > .col.side'].map(q),[deck,center,side]=cols;
  cols.forEach((c,i)=>{if(!shown(c))bad.push(`${names[i]} column is not rendered`);else if(!visible(c))bad.push(`${names[i]} column has no visible box`);});
  if(cols.every(shown)){
    const [d,c,s]=cols.map(rect);
    if(!(d.left>=-0.5&&d.right<=c.left+0.5&&c.right<=s.left+0.5&&s.right<=innerWidth+0.5))bad.push(`columns not ordered deck | center | side without overlap: ${[d,c,s].map(b=>`${Math.round(b.left)}–${Math.round(b.right)}`).join(', ')}`);
    if(Math.min(d.bottom,c.bottom,s.bottom)-Math.max(d.top,c.top,s.top)<=0)bad.push('the three columns do not share a row');
    if(tracks.length===3&&[d,c,s].some((b,i)=>Math.abs(b.width-tracks[i])>1))bad.push(`column widths ${[d,c,s].map(b=>Math.round(b.width)).join('/')} differ from grid tracks ${tracks.map(Math.round).join('/')}`);
  }
  const part=(sel,col,what)=>{const e=q(sel);
    if(!e||!col||!col.contains(e)){bad.push(`${what} is not in its column`);return null;}
    if(!shown(e)){bad.push(`${what} is not rendered`);return null;}
    const b=rect(e),c=rect(col);if(!(b.left>=c.left-0.5&&b.right<=c.right+0.5))bad.push(`${what} sticks out of its column`);
    return e;};
  const presets=part('.col.deck #presets',deck,'#presets'),stage=part('.center #stage',center,'#stage'),plot=part('.center .strip #plot',center,'.strip #plot');
  const readouts=part('.col.side #readouts',side,'#readouts'),evidence=part('.col.side #evidence',side,'#evidence');
  for(const [e,what] of [[presets,'#presets'],[stage,'#stage'],[readouts,'#readouts']])if(e&&!visible(e))bad.push(`${what} has no visible box`);
  const inStage=stage?stage.querySelectorAll('#plot, .math-panel').length:-1;
  if(inStage!==0)bad.push(`#stage holds ${inStage} #plot / .math-panel`);
  if(plot){if(plot.clientHeight<54||rect(plot).height<54)bad.push(`.strip #plot is ${plot.clientHeight}px tall`);if(stage&&rect(plot).top<rect(stage).bottom-0.5)bad.push('.strip #plot is not under the stage');}
  if(readouts&&evidence&&rect(evidence).top<rect(readouts).bottom-0.5)bad.push('#evidence is not under #readouts');
  if(evidence){
    const scrolls=[side,document.body,document.documentElement].map(e=>[e,e.scrollTop,e.scrollLeft]);
    evidence.scrollIntoView({block:'nearest',inline:'nearest'});
    const v=seen(evidence);if(!(v.w>0&&v.h>0))bad.push(`#evidence has no visible box once scrolled into view (${Math.round(v.w)}×${Math.round(v.h)})`);
    for(const [e,top,left] of scrolls){e.scrollTop=top;e.scrollLeft=left;}
  }
  const info=q('#infoBtn');
  if(!info||!evidence||!evidence.contains(info)||info.closest('.status')||document.querySelectorAll('#infoBtn').length!==1)bad.push('#infoBtn is not the single theory button inside #evidence (outside .status)');
  else if(!shown(info))bad.push('#infoBtn is not rendered');
  return bad;
});

for (const name of ['index.html','main.js','style.css']) {
  const text=fs.readFileSync(path.join(DIR,name),'utf8');
  check(`${name}: zero literal colors`, !/#[\da-f]{3,8}\b|\b(?:rgba?|hsla?)\s*\(/i.test(text));
}
const html=fs.readFileSync(path.join(DIR,'index.html'),'utf8');
check('exact four frozen chapter GIDs', [...html.matchAll(/data-lean-gid="([^"]+)"/g)].map(m=>m[1]).sort().join() === [...GIDS].sort().join());
check('stage code uses no open-problem color', !/P\.warn|palette\.warn|--warn|--tr-warn/.test(fs.readFileSync(path.join(DIR,'main.js'),'utf8')));
check('shared scripts only', await page.evaluate(()=>[...document.scripts].map(s=>s.getAttribute('src')).join()==='../assets/shell.js,../assets/kit.js,main.js'));
const registry=JSON.parse(fs.readFileSync(path.join(DIR,'..','visualizations.json'),'utf8')).visualizations;
const entry=registry.find(v=>v.id===ID);
const idx=id=>registry.findIndex(v=>v.id===id);
check('registry preserves triadic, horizon, stereographic chapter order',
  idx('triadic-nameless-sandbox')>=0&&idx('uncompleted-horizon-sandbox')>=0&&idx('stereographic-relativization-sandbox')>=0&&
  idx('triadic-nameless-sandbox')<idx('uncompleted-horizon-sandbox')&&idx('uncompleted-horizon-sandbox')<idx('stereographic-relativization-sandbox'));
check('live bilingual §38.7 registry and all five titled presets',entry.status==='live'&&entry.chapter===38&&entry.section==='38.7'&&entry.presets.join()===CARDS.join()&&CARDS.every(c=>entry.preset_titles[c].zh&&entry.preset_titles[c].en));
await T.goto(BOOK,ID,'?lang=en');await settle(page);
check('default: calm divergence, θ=0.65', (await state()).scene===CARDS[0]&&near((await state()).theta,0.65)&&!(await state()).playing);
await page.click('#infoBtn');await settle(page);
check('drawer: exactly four green theorem boxes', await page.$$eval('#drawer .lean:not(.argued):not(.num):not(.model):not(.open)',es=>es.length===4&&es.every(e=>e.querySelector('[data-lean-gid]'))));
check('drawer: both OPEN boundaries are contained here', await page.$$eval('.lean.open',es=>es.length===2&&es.every(e=>e.closest('#drawer'))&&es.map(e=>e.dataset.problem).sort().join()==='conj-p-neq-np,prob-ch38-unrelativized-p-vs-np-and-independence'));
check('drawer: literature, numerical and model badges', await page.evaluate(()=>document.querySelectorAll('#drawer .lean.argued').length===5&&!!document.querySelector('#drawer .lean.num')&&!!document.querySelector('#drawer .lean.model')));
await page.keyboard.press('Escape');

for(const card of CARDS) {
  await pick(card);const s=await state();
  check(`${card}: exact preset parameters and paused bead`,near(s.tau,VALUES[card][0])&&s.psi===VALUES[card][1]&&s.delta_blind===0.12&&!s.playing);
  check(`${card}: magnification and radius from Cartesian projection`,near(s.projected[0],s.point[0]/(1-s.point[2]))&&near(s.projected[1],s.point[1]/(1-s.point[2]))&&near(Math.hypot(...s.projected),Math.sin(s.theta)/(1-Math.cos(s.theta))));
  check(`${card}: μ(0.65)=4.90 and full span 33.3`,(await page.locator('#roMu').innerText())==='4.90×'&&(await page.locator('#roSpanMax').innerText())==='33.3×'&&near(s.rimRadius,16.64666186512739,1e-8));
  if(card==='compact-homotopy')check('τ=0.85: displayed 28.4×',await page.locator('#roSpan').innerText()==='28.4×'&&near(s.span,28.4));
  if(card==='oracle-collapse')check('ψ=0°: cyan coincidence and r=0.00',s.collapsed&&s.separation===0&&(await page.locator('#roSeparation').innerText())==='0.00'&&s.pills.some(b=>b.text.includes('Pᴬ = NPᴬ')));
  if(card==='oracle-chase')check('ψ=65°: r=0.70 and persistent gap',!s.collapsed&&near(s.separation,0.7,0.0005)&&(await page.locator('#roSeparation').innerText())==='0.70'&&s.gap>0&&(await page.locator('#roGap').innerText())==='0.36% > 0');
}
// 有限差分用切向弦长独立核对共形放大率；极点与投影点还须共线。
for(const delta of [0.06,0.12,0.24,0.36]) {
  await range('delta_blind',delta);await range('now',0);const s=await state();
  const h=1e-6,theta=s.theta,phi=Math.atan2(s.point[1],s.point[0]);
  const a=[Math.sin(theta)*Math.cos(phi),Math.sin(theta)*Math.sin(phi),Math.cos(theta)];
  const b=[Math.sin(theta+h)*Math.cos(phi),Math.sin(theta+h)*Math.sin(phi),Math.cos(theta+h)];
  const proj=p=>[p[0]/(1-p[2]),p[1]/(1-p[2])],pa=proj(a),pb=proj(b);
  const ratio=Math.hypot(pb[0]-pa[0],pb[1]-pa[1])/Math.hypot(...b.map((v,i)=>v-a[i]));
  check(`δ=${delta}: conformal factor by finite difference`,near(s.mu,ratio,0.00003));
  const t=1/(1-a[2]);
  check(`δ=${delta}: pole, source and equatorial image collinear`,near(t*a[0],s.projected[0])&&near(t*a[1],s.projected[1])&&near(1+t*(a[2]-1),0));
  // 球冠面积由轴向条带积分，避免复用页面的半角平方公式。
  let cap=0;const n=2000,dt=delta/n;
  for(let i=0;i<n;i++)cap+=Math.sin((i+0.5)*dt)*dt/2;
  check(`δ=${delta}: strictly positive normalized cap area`,s.gap>0&&near(s.gap,cap,1e-9));
}
await pick('compact-homotopy');let length=(await state()).arcLength,previous=0;
for(const tau of [0,0.25,0.5,0.85,1]) {
  await range('tau',tau);const s=await state();
  check(`τ=${tau}: finite unchanged source length, monotone span`,near(s.arcLength,length)&&s.arcLength>0&&s.arcLength<20&&s.span>=previous);previous=s.span;
  if(tau===0)check('compact endpoint = 1.0×',(await page.locator('#roSpan').innerText())==='1.0×');
  if(tau===1)check('chart endpoint = full chord span',near(s.span,s.spanMax));
}
for(const psi of [0,35,65,90]) {await range('psi',psi);const s=await state();check(`ψ=${psi}: bounded separation and exact collapse condition`,s.separation>=0&&s.separation<=1&&s.collapsed===(psi===0));}
await pick('oracle-chase');
check('play control advances the bead toward N',await playsAfter(page,()=>page.click('#play'),()=>STEREO_DEBUG.state));
await page.click('#play');await settle(page);check('pause control holds motion',!(await state()).playing&&(await state()).theta<0.65);
await range('now',12);check('bead reaches aperture rim',near((await state()).theta,0.12));
await page.click('#rew');await settle(page);check('rewind restores θ=0.65',near((await state()).theta,0.65)&&(await state()).t===0);
const before=await state(),box=await page.locator('#stage').boundingBox();
await page.mouse.move(box.x+box.width*0.5,box.y+box.height*0.6);await page.mouse.down();
await page.mouse.move(box.x+box.width*0.5+70,box.y+box.height*0.6+25,{steps:6});await page.mouse.up();await settle(page);
check('captured canvas drag changes azimuth and elevation',!near((await state()).camera.yaw,before.camera.yaw)&&!near((await state()).camera.pitch,before.camera.pitch));
const mainLog=await paletteLog();
check('main page: zero data-tr-palette mutations through drawer, every preset and control',mainLog?.length===0,JSON.stringify(mainLog));

for(const lang of ['zh','en'])for(const card of CARDS) {
  const p=await openStill(T,BOOK,ID,card,lang),s=await state(p);
  check(`still ${lang}/${card}: prose anchors and declared pause`,s.scene===card&&near(s.tau,VALUES[card][0])&&s.psi===VALUES[card][1]&&s.t===0&&!s.playing&&near(s.mu,4.9,0.01));
  if(card==='compact-homotopy')check(`still ${lang}: homotopy span`,await p.locator('#roSpan').innerText()==='28.4×');
  await p.context().close();
}
for(scheme of ['dark','light'])for(const lang of ['zh','en'])for(const [width,height,mode] of [[1440,900,''],[1081,500,''],[390,844,''],[334,520,'&embed=1'],[740,520,'&embed=1']]) {
  const p=await T.open(BOOK,ID,`?lang=${lang}&preset=blindspot-divergence${mode}`,{viewport:{width,height},reducedMotion:'reduce'});
  await settle(p);const issues=[],labIssues=[],desk=width===1440&&!mode;
  // 严格单一夜间主题：无论系统偏好暗色或亮色，都不设置 data-tr-palette。
  check(`${scheme}/${lang}/${width}: single-theme night console under prefers-color-scheme: ${scheme}`,await p.evaluate(s=>document.documentElement.dataset.trPalette===undefined&&matchMedia(`(prefers-color-scheme: ${s})`).matches,scheme));
  const loaded=await paletteLog(p);
  check(`${scheme}/${lang}/${width}×${height}: zero data-tr-palette mutations while loading`,loaded?.length===0,JSON.stringify(loaded));
  if(desk){const lab=await desktopLab(p);check(`${scheme}/${lang}/1440×900: standard three-column lab (deck | stage over strip | readouts and evidence)`,lab.length===0,lab.slice(0,4).join(' | '));}
  for(const card of CARDS) {
    await pick(card,p);const s=await state(p),b=s.bounds;
    for(const pill of s.pills)if(pill.x<0||pill.x+pill.w>b.W||pill.y<b.top||pill.y+pill.h>b.H-b.bottom)issues.push(`${card}: clipped pill`);
    for(let i=0;i<s.pills.length;i++)for(let j=i+1;j<s.pills.length;j++){const a=s.pills[i],c=s.pills[j];if(Math.min(a.x+a.w,c.x+c.w)>Math.max(a.x,c.x)&&Math.min(a.y+a.h,c.y+c.h)>Math.max(a.y,c.y))issues.push(`${card}: overlapping pills`);}
    const v=await stageView(p,'#stage',mode.includes('embed'));issues.push(...v.hud,...v.layout);
    if(await overflowX(p)>0)issues.push('horizontal overflow');if(lang==='en')issues.push(...await cjkLeftovers(p));
    if(desk)labIssues.push(...(await desktopLab(p)).map(x=>`${card}: ${x}`));
  }
  check(`${scheme}/${lang}/${width}×${height}: every card readable`,issues.length===0,issues.slice(0,5).join(' | '));
  if(desk)check(`${scheme}/${lang}/1440×900: the three columns hold after every card`,labIssues.length===0,labIssues.slice(0,4).join(' | '));
  check(`${scheme}/${lang}/${width}: translucent solid stage is drawn`,await inkShare(p,'#stage .solid-gl')>0.08);
  const picked=await paletteLog(p);
  check(`${scheme}/${lang}/${width}×${height}: zero data-tr-palette mutations through every preset`,picked?.length===0,JSON.stringify(picked));
  await p.context().close();
}
// 切换系统配色只能被页面忽略：每次切换后等 change 事件真正派发并结算页面，再取回本文档的全部变动记录。
for(scheme of ['dark','light'])for(const lang of ['zh','en']) {
  const p=await T.open(BOOK,ID,`?lang=${lang}`,{viewport:{width:1440,height:900}});await settle(p);
  const tag=`media switching (${scheme} first, ${lang})`,wrong=[];let now=scheme,flips=0,media=0;
  check(`${tag}: fresh document loads with an empty palette log`,(await paletteLog(p))?.length===0);
  for(const card of CARDS) {
    await pick(card,p);
    const before=(await paletteLog(p)||[]).length;
    now=now==='dark'?'light':'dark';await p.emulateMedia({colorScheme:now});flips++;
    if(!await until(p,n=>window.__schemeFlips>=n,flips))wrong.push(`${card}: no change event for ${now}`);
    await settle(p);
    const after=await paletteLog(p)||[],s=await p.evaluate(()=>({palette:document.documentElement.dataset.trPalette,light:matchMedia('(prefers-color-scheme: light)').matches}));
    media+=after.length-before;
    if(s.palette!==undefined||s.light!==(now==='light'))wrong.push(`${card}/${now}: ${JSON.stringify(s)}`);
  }
  check(`${tag}: ${flips} scheme switches take effect and leave data-tr-palette absent`,wrong.length===0,wrong.slice(0,3).join(' | '));
  check(`${tag}: zero data-tr-palette mutations caused by media switching`,media===0,`${media}`);
  const all=await paletteLog(p);
  check(`${tag}: zero data-tr-palette mutations through load, presets and switches`,all?.length===0,JSON.stringify(all));
  await p.context().close();
}
check('zero data-tr-palette mutations in any document of any context',paletteHits.length===0,paletteHits.slice(0,4).join(' | '));
check('zero page, console and request errors',T.errors.length===0,T.errors.slice(0,6).join(' | '));
check('zero quality warnings',T.warnings.length===0,T.warnings.map(w=>w.name).join(' | '));
await T.finish();
