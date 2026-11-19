import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, openStill, playsAfter, cjkLeftovers, overflowX, labelOverlaps, stageView } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'uncompleted-horizon-sandbox';
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', ID);
const CARDS = ['bootstrap-ledger', 'lawvere-godel', 'ordinal-spiral', 'bidirectional-parallax', 'frozen-omniscience'];
const GIDS = [
  'D5/S0/Diagonal/Lawvere/QualitativeEscape.self_application_fragment_package',
  'D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_separationDeficit_nonempty',
  'D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_strict_topology_refinement',
  'D5/S3/ConceptDynamics/DefinitionEscapeAdjudication/RetrospectiveLookupFailure.lookup_copy_zero_loss_and_nonanticipating_failure',
  'D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape'
];
const T = await session(), { page, check } = T;
await stageFirstChecks(T, BOOK, ID, { solid: { preset: 'bootstrap-ledger', minShare: 0.045 } });
const near = (a,b,tol=1e-11) => Math.abs(a-b)<tol;
const state = (p=page) => p.evaluate(() => HORIZON_DEBUG.state);
async function range(id, value, p=page) {
  await p.$eval(`#${id}`, (el,v) => {el.value=String(v);el.dispatchEvent(new Event('input',{bubbles:true}));}, value);
  await settle(p);
}
async function pick(card, p=page) {
  await p.evaluate(c => document.querySelector(`[data-preset="${c}"]`).click(),card);
  await p.evaluate(() => TRV.kit.pause()); await settle(p);
}
const dot = (a,b) => a.reduce((s,v,i)=>s+v*b[i],0);
const det = a => a[0][0]*(a[1][1]*a[2][2]-a[1][2]*a[2][1])-a[0][1]*(a[1][0]*a[2][2]-a[1][2]*a[2][0])+a[0][2]*(a[1][0]*a[2][1]-a[1][1]*a[2][0]);

for(const name of ['index.html','main.js','style.css']) {
  const text=fs.readFileSync(path.join(DIR,name),'utf8');
  check(`${name}: all colors come from shared tokens`, !/#[\da-f]{3,8}\b|\b(?:rgba?|hsla?)\s*\(/i.test(text));
}
const html=fs.readFileSync(path.join(DIR,'index.html'),'utf8');
check('exactly the five chapter theorem citations', [...html.matchAll(/data-lean-gid="([^"]+)"/g)].map(m=>m[1]).sort().join() === [...GIDS].sort().join());
check('OPEN occurs only in the theory drawer', await page.$$eval('.lean.open', es=>es.length===1&&es.every(e=>!!e.closest('#drawer'))));
check('shared runtime only', await page.evaluate(()=>[...document.scripts].map(s=>s.getAttribute('src')).join()==='../assets/shell.js,../assets/kit.js,main.js'));
const registry=JSON.parse(fs.readFileSync(path.join(DIR,'..','visualizations.json'),'utf8')).visualizations.find(v=>v.id===ID);
check('registry: live, bilingual, chapter 36.7 and all five cards',registry.status==='live'&&registry.title_en&&registry.chapter===36&&registry.section==='36.7'&&registry.presets.join()===CARDS.join());
await T.goto(BOOK,ID,'?lang=en'); await settle(page);
check('default full laboratory opens on bootstrap without playing',(await state()).scene==='bootstrap-ledger'&&!(await state()).playing);
for(const card of ['bootstrap-ledger','lawvere-godel']) {
  await pick(card);
  check(`${card}: stage wheel leaves page scrolling available`,await page.$eval('#stage',el=>el.dispatchEvent(new WheelEvent('wheel',{deltaY:120,bubbles:true,cancelable:true})))===true);
}
await pick('bootstrap-ledger');
let lastDet=null;
for(const epsilon of [5,15,30,45,55,90,120,155,175]) {
  await range('epsilon',epsilon);const s=await state(),e=epsilon*Math.PI/180;
  const V=[[1,0,0],[Math.cos(e),Math.sin(e),0],[Math.cos(e),0,Math.sin(e)]], gram=V.map(a=>V.map(b=>dot(a,b))), expected=det(gram);
  check(`ε=${epsilon}: unit triad and determinant by cofactors`, s.vectors.every((v,i)=>near(dot(v,v),1)&&v.every((q,j)=>near(q,V[i][j])))&&near(s.detG,expected)&&s.detG>0);
  check(`ε=${epsilon}: normal residual and volume square`,near(dot(s.residual,V[0]),0)&&near(dot(s.residual,V[1]),0)&&near(Math.hypot(...s.residual),Math.sin(e))&&near(s.volume**2,s.detG));
  check(`ε=${epsilon}: DOM determinant follows mathematics`,near(Number(await page.locator('#roDet').innerText()),expected,1e-7));
  if(lastDet!==null&&epsilon===30)check('angle control changes the readout',!near(s.detG,lastDet));lastDet=s.detG;
}
for(const M of [2,5,12])for(const k of [1,3,6]) {
  await range('pool',M);await range('batch',k);const s=await state();
  // 直接枚举扩容后的无序边，与组合式使用不同算法。
  const added=[];for(let a=0;a<M+k;a++)for(let b=a+1;b<M+k;b++)if(b>=M)added.push([a,b]);
  check(`ledger M=${M}, k=${k}: enumerated new edges and positive net`,s.deltaPi===added.length&&s.resolved===k&&s.net===added.length-k&&s.net>0&&Number(await page.locator('#roDelta').innerText())===added.length);
}
await pick('bootstrap-ledger');
const handleAt55=await page.locator('#angleHandle').boundingBox();
await range('epsilon',120);
const handleAt120=await page.locator('#angleHandle').boundingBox();
check('angle handle position follows epsilon',Math.abs(handleAt120.x-handleAt55.x)>1);
await range('epsilon',55);
await page.locator('#angleHandle').scrollIntoViewIfNeeded();
const handle=await page.locator('#angleHandle').boundingBox(), before=await state();
await page.mouse.move(handle.x+handle.width/2,handle.y+handle.height/2);await page.mouse.down();
await page.mouse.move(handle.x+handle.width/2+35,handle.y+handle.height/2,{steps:5});await page.mouse.up();await settle(page);
check('stage angle handle changes geometry',(await state()).epsilon>before.epsilon+10&&(await state()).detG!==before.detG);
const beforeCancel=await state();
await page.dispatchEvent('#angleHandle','pointerdown',{pointerId:7,clientX:100});await settle(page);
await page.dispatchEvent('#angleHandle','pointermove',{pointerId:7,clientX:120});await settle(page);
check('angle drag stays active across redraws',(await state()).epsilon>beforeCancel.epsilon);
await page.dispatchEvent('#angleHandle','pointercancel',{pointerId:7});await settle(page);
const cancelledLabels=await page.locator('#stageLabels').innerText();
await range('epsilon',30);
await page.dispatchEvent('#angleHandle','pointermove',{pointerId:7,clientX:150});await settle(page);
check('pointercancel clears angle drag',(await state()).epsilon===30);
const updatedLabels=await page.locator('#stageLabels').innerText();
check('stage labels follow epsilon after pointercancel',updatedLabels!==cancelledLabels&&updatedLabels.includes('sin ε e_{D+1} · 0.500'));

function auditCatalog(s) {
  const functions=[];for(let word=0;word<2**s.n;word++)functions.push(Array.from({length:s.n},(_,x)=>Math.floor(word/2**x)%2).join(''));
  const actual=s.rows.map(r=>r.join(''));
  const diagonal=s.rows.map((r,y)=>Number(!r[y%s.n]));
  const pairs=[];
  for(let y1=0;y1<s.rows.length;y1++)for(let y2=0;y2<s.rows.length;y2++) {
    const sameOld=y1%s.n===y2%s.n,sameNew=!s.joined||diagonal[y1]===diagonal[y2];
    if(sameOld&&sameNew&&diagonal[y1]!==diagonal[y2])pairs.push([y1,y2]);
  }
  const blocks=new Set(s.rows.map((_,y)=>`${y%s.n}:${diagonal[y]}`)).size;
  return {surjective:actual.length===functions.length&&functions.every(f=>actual.includes(f)),diagonal,pairs,blocks};
}
await pick('lawvere-godel');
await page.click('[data-lang-set="zh"]');await settle(page);
check('catalog language switch: Chinese cell names', (await page.locator('#matrix button').first().getAttribute('aria-label')).startsWith('目录'));
await page.click('[data-lang-set="en"]');await settle(page);
check('catalog language switch: English cell names without resetting state', (await page.locator('#matrix button').first().getAttribute('aria-label')).startsWith('Catalog')&&(await state()).scene==='lawvere-godel');
await page.click('details summary');await settle(page);
for(const n of [3,4]) {
  await page.click(`[data-size="${n}"]`);await settle(page);
  for(const [y,x] of [[0,0],[2,1],[2**n-1,n-1],[1,0]]) {
    const before=await state();await page.click(`#matrix button[data-row="${y}"][data-col="${x}"]`);await settle(page);
    const s=await state(),a=auditCatalog(s);
    check(`catalog n=${n}, cell (${y},${x}): live swap preserves surjectivity`,a.surjective&&s.rows[y][x]!==before.rows[y][x]);
    check(`catalog n=${n}: explicit anti-diagonal and exact ordered deficit`,s.diagonal.join()===a.diagonal.join()&&JSON.stringify(s.pairs)===JSON.stringify(a.pairs)&&s.pairs.length>0&&s.blocksAfter===a.blocks);
    check(`catalog n=${n}: every old-fiber decoder misses this diagonal`,s.rows.every(row=>s.diagonal.some((v,i)=>v!==row[s.latent[i]])));
    const pairList=await page.locator('#pairList').innerText();
    check(`catalog n=${n}: visible exact count and pair list`,Number(await page.locator('#roDeficit').innerText())===s.pairs.length&&s.pairs.every(([a,b])=>pairList.includes(`(y${a},y${b})`)&&s.pairs.some(([c,d])=>a===d&&b===c)));
  }
  const old=await state();await page.click('#join');await settle(page);const joined=await state(),audit=auditCatalog(joined);
  check(`conceptJoin n=${n}: exact target deficit becomes empty`,joined.joined&&joined.pairs.length===0&&audit.pairs.length===0&&joined.blocksAfter>joined.blocksBefore&&joined.before.length===old.pairs.length&&(await page.locator('#roDeficit').innerText()).includes('∅'));
  check(`conceptJoin n=${n}: new observation axis shown`,await page.locator('#stageLabels').innerText().then(t=>t.includes('conceptJoin')));
  await page.click('#resetCatalog');await settle(page);check(`reset n=${n}: restores complete catalog and nonempty deficit`,!(await state()).joined&&(await state()).pairs.length>0&&auditCatalog(await state()).surjective);
}

await pick('ordinal-spiral');
for(let r=0;r<=6;r++) {
  await range('now',r);const s=await state();
  const M=s.M+r*s.k;let count=0;for(let a=0;a<M+s.k;a++)for(let b=a+1;b<M+s.k;b++)if(b>=M)count++;
  check(`ordinal round ${r}: positive novelty by independent edges`,s.round===r&&s.novelty[r]===count-s.k&&s.novelty[r]>0);
  check(`ordinal round ${r}: live tower label`,(await page.locator('#stageLabels').innerText()).includes(`T_${r} → T_${r+1}`));
}
await page.click('#prevStep');await settle(page);check('previous-round control',(await state()).round===5);
await page.click('#nextStep');await settle(page);check('next-round control',(await state()).round===6);
await page.click('#rew');await settle(page);check('rewind control',(await state()).t===0);
check('ordinal card starts and advances',await playsAfter(page,()=>page.click('[data-preset="ordinal-spiral"]'),()=>HORIZON_DEBUG.state));await page.evaluate(()=>TRV.kit.pause());await settle(page);

await pick('bidirectional-parallax');
for(const r of [0,1,3,6]) {
  await range('now',r);const s=await state(), answers=[...s.futureBits],wrong=answers.filter(b=>b!==s.prediction).length;
  check(`parallax step ${r}: same frontier, zero old loss, future ambiguity`,s.round===r&&s.retrospectiveLoss===0&&answers.length===2&&new Set(answers).size===2&&near(s.failure,wrong/answers.length)&&s.failure>=0.5);
}
await pick('frozen-omniscience');
for(const kappa of [0,0.25,0.6,1]) {
  await range('kappa',kappa);await range('now',3);const s=await state();
  const e=s.epsilon*Math.PI/180,expected=kappa*Math.sin(e);
  check(`κ_open=${kappa}: residual, volume and time respond`,near(s.kappa,kappa)&&near(s.liveResidual,expected)&&near(s.liveDet,expected**4)&&near(s.dTau,kappa)&&near(s.modelTime,3*kappa));
  check(`κ_open=${kappa}: visible counterfactual label`,(await page.locator('#stageLabels').innerText()).includes(`κ_open = ${kappa.toFixed(2)}`));
  if(kappa===0){await range('now',5);check('closed side remains frozen as rail advances',(await state()).modelTime===0&&(await state()).liveDet===0);}
}
check('guardrail card starts and advances',await playsAfter(page,()=>page.click('[data-preset="frozen-omniscience"]'),()=>HORIZON_DEBUG.state));await page.evaluate(()=>TRV.kit.pause());

for(const lang of ['zh','en'])for(const card of CARDS) {
  const p=await openStill(T,BOOK,ID,card,lang),s=await state(p),frame={ 'bootstrap-ledger':0,'lawvere-godel':0,'ordinal-spiral':4,'bidirectional-parallax':3,'frozen-omniscience':3 }[card];
  check(`still ${lang} ${card}: declared paused frame`,s.scene===card&&s.t===frame&&!s.playing);
  if(card==='bootstrap-ledger')check(`still ${lang}: one resolved pair spawns M`,s.k===1&&s.deltaPi===s.M&&near(s.detG,Math.sin(55*Math.PI/180)**4));
  if(card==='lawvere-godel')check(`still ${lang}: genuinely complete catalog with deficit`,auditCatalog(s).surjective&&s.pairs.length>0&&!s.joined);
  if(card==='frozen-omniscience')check(`still ${lang}: living right side`,s.kappa===1&&s.liveDet>0&&s.dTau===1);
  await p.context().close();
}

// 页面文字、矩阵与手柄的真实边界，补足画布以外的布局检查。
async function geometryAudit(p) {
  return p.evaluate(()=>{
    const stage=document.getElementById('stage').getBoundingClientRect();
    const vis=el=>el.getClientRects().length&&getComputedStyle(el).visibility!=='hidden'&&!el.closest('[hidden]');
    const es=[...document.querySelectorAll('#stageLabels .tag,#angleHandle,#catalog')].filter(vis);
    const hud=[...document.querySelectorAll('.hud-tl,.hud-bl')].filter(vis);
    const meet=(a,b)=>Math.min(a.right,b.right)-Math.max(a.left,b.left)>1&&Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>1;
    const bad=[];
    for(const el of es){const a=el.getBoundingClientRect();if(a.left<stage.left||a.right>stage.right||a.top<stage.top||a.bottom>stage.bottom)bad.push('clipped '+el.textContent.slice(0,20));for(const h of hud)if(meet(a,h.getBoundingClientRect()))bad.push('HUD '+el.textContent.slice(0,20));}
    for(let i=0;i<es.length;i++)for(let j=i+1;j<es.length;j++)if(meet(es[i].getBoundingClientRect(),es[j].getBoundingClientRect()))bad.push('overlap '+es[i].textContent.slice(0,12)+' / '+es[j].textContent.slice(0,12));
    return bad;
  });
}
for(const [width,height,mode] of [[1440,900,''],[1081,500,''],[390,844,''],[334,520,'&embed=1'],[740,520,'&embed=1']])for(const lang of ['zh','en']) {
  const p=await T.open(BOOK,ID,`?lang=${lang}&preset=bootstrap-ledger${mode}`,{viewport:{width,height},reducedMotion:'reduce'});
  const bad=[];
  for(const scheme of ['dark','light']) {
    await p.emulateMedia({colorScheme:scheme});await settle(p);
    check(`night-console palette ${lang} ${width}×${height} ${scheme}: no palette override`,await p.evaluate(()=>document.documentElement.dataset.trPalette===undefined));
    for(const card of CARDS){
      await pick(card,p);await settle(p);bad.push(...(await geometryAudit(p)).map(x=>`${scheme}/${card}: ${x}`));bad.push(...await labelOverlaps(p));
      if(card==='lawvere-godel'){
        await p.evaluate(()=>document.querySelector('[data-size="4"]').click());await settle(p);
        bad.push(...(await geometryAudit(p)).map(x=>`${scheme}/catalog-4: ${x}`));
        await p.evaluate(()=>document.getElementById('join').click());await settle(p);
        bad.push(...(await geometryAudit(p)).map(x=>`${scheme}/catalog-4-joined: ${x}`));
      }
      if(lang==='en')bad.push(...await cjkLeftovers(p));if(await overflowX(p)>0)bad.push('horizontal overflow');const view=await stageView(p,'.stage',mode.includes('embed'));bad.push(...view.hud,...view.layout);
    }
  }
  check(`all cards ${lang} ${width}×${height}, both themes: readable and inside frame`,bad.length===0,bad.slice(0,6).join(' | '));
  await p.context().close();
}
check('zero page, console and request errors',T.errors.length===0,T.errors.slice(0,6).join(' | '));
check('zero quality warnings',T.warnings.length===0,T.warnings.map(w=>w.name).join(' | '));
await T.finish();
