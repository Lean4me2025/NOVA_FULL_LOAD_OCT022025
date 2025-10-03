
const STORAGE_KEYS={CATEGORIES:'nova.categories.selected',TRAITS:'nova.traits.selected',FAMILY:'nova.family.pass',REFLECTION:'nova.reflection'};
const FAMILY_PINS=['FAMILY2025','NOVA-FAMILY','DREW-CLARA'];
function saveSelectedCategories(e){localStorage.setItem(STORAGE_KEYS.CATEGORIES,JSON.stringify(e))}
function loadSelectedCategories(){try{return JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES))||[]}catch(e){return[]}}
function saveSelectedTraits(e){localStorage.setItem(STORAGE_KEYS.TRAITS,JSON.stringify(e))}
function loadSelectedTraits(){try{return JSON.parse(localStorage.getItem(STORAGE_KEYS.TRAITS))||[]}catch(e){return[]}}
function saveReflection(e){localStorage.setItem(STORAGE_KEYS.REFLECTION,e)}
function loadReflection(){return localStorage.getItem(STORAGE_KEYS.REFLECTION)||null}
function setFamilyPass(e){const t=(e||'').replace(/\s+/g,'').toUpperCase();return FAMILY_PINS.includes(t)?(localStorage.setItem(STORAGE_KEYS.FAMILY,'1'),!0):!1}
function hasFamilyPass(){return'1'===localStorage.getItem(STORAGE_KEYS.FAMILY)}
async function fetchJSON(e){const t=await fetch(e);if(!t.ok)throw new Error('Failed to load '+e);return await t.json()}
function qs(e){return document.querySelector(e)}function qsa(e){return[...document.querySelectorAll(e)]}function navigate(e){window.location.href=e}
function computeMatchPercent(e,t){const n=new Set(e),a=t.length;if(0===a)return 0;const r=t.filter(e=>n.has(e)).length;return Math.round(r/a*100)}

async function initWelcome(){const e=qs('#start');e&&e.addEventListener('click',()=>navigate('categories.html'))}

async function initCategories(){
  const grid = qs('#category-grid'), toTraits = qs('#to-traits'), reset = qs('#reset');
  const data = await fetchJSON('assets/data/categories.json');
  const selected = new Set(loadSelectedCategories());

  data.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'pill' + (selected.has(cat.id) ? ' selected' : '');
    btn.dataset.id = cat.id;
    btn.innerHTML = `<div class="label" style="font-weight:700">${cat.name}</div>
                     <div class="desc">${cat.desc || ''}</div>`;
    btn.addEventListener('click', ()=>{
      selected.has(cat.id) ? selected.delete(cat.id) : selected.add(cat.id);
      btn.classList.toggle('selected');
      saveSelectedCategories([...selected]);
    });
    grid.appendChild(btn);
  });

  toTraits.addEventListener('click', ()=>{
    if(selected.size===0){ alert('Please select at least one category.'); return; }
    navigate('traits.html');
  });
  reset.addEventListener('click', ()=>{
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.TRAITS);
    localStorage.removeItem(STORAGE_KEYS.REFLECTION);
    qsa('.pill.selected').forEach(p=>p.classList.remove('selected'));
  });
}

async function initTraits(){
  const grid = qs('#trait-grid'), toRefs = qs('#to-reflections');
  const selectedCats = new Set(loadSelectedCategories());
  if(selectedCats.size===0){ navigate('categories.html'); return; }

  const allTraits = await fetchJSON('assets/data/traits.json');
  const filtered = allTraits.filter(t => t.categories.some(c => selectedCats.has(c)));
  const selected = new Set(loadSelectedTraits());
  const MAX = 12;

  filtered.forEach(tr => {
    const btn = document.createElement('button');
    btn.className = 'pill' + (selected.has(tr.id) ? ' selected' : '');
    btn.dataset.id = tr.id;
    btn.innerHTML = `<div class="label" style="font-weight:700">${tr.label}</div>
                     <div class="desc">${tr.desc || ''}</div>`;
    btn.addEventListener('click', ()=>{
      if(!selected.has(tr.id) && selected.size >= MAX){
        alert(`You can choose up to ${MAX} traits.`);
        return;
      }
      selected.has(tr.id) ? selected.delete(tr.id) : selected.add(tr.id);
      btn.classList.toggle('selected');
      saveSelectedTraits([...selected]);
      qs('#trait-count').textContent = selected.size;
    });
    grid.appendChild(btn);
  });
  qs('#trait-count').textContent = selected.size;

  toRefs.addEventListener('click', ()=>{
    if(selected.size<6 && !confirm('Fewer than 6 traits selected. Continue?')) return;
    navigate('reflections.html');
  });
}

async function initReflections(){
  const cont = qs('#reflections'), next = qs('#to-results');
  const data = await fetchJSON('assets/data/reflections.json');
  const prevSel = loadReflection();
  data.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'pill' + (prevSel===item.id?' selected':'');
    btn.innerHTML = `<div class="label" style="font-weight:700">${item.label}</div><div class="desc">${item.note}</div>`;
    btn.addEventListener('click', ()=>{
      qsa('#reflections .pill').forEach(p=>p.classList.remove('selected'));
      btn.classList.add('selected');
      saveReflection(item.id);
      qs('#ref-note').textContent = item.note;
      if(item.id==='switching_career'){qs('#switching-extra').classList.remove('hidden');}
      else{qs('#switching-extra').classList.add('hidden');}
    });
    cont.appendChild(btn);
  });
  next.addEventListener('click', ()=>{
    if(!loadReflection()){alert('Please choose one.'); return;}
    if(loadReflection()==='switching_career'){
      const val=qs('#switching-from').value.trim();
      if(val) localStorage.setItem('nova.switching.from', val);
    }
    navigate('results.html');
  });
}

async function initResults(){
  const userTraits = JSON.parse(localStorage.getItem(STORAGE_KEYS.TRAITS) || '[]');
  const jobs = await fetchJSON('assets/data/jobs.json');
  const switchingFrom = localStorage.getItem('nova.switching.from') || "";
  function fitLabel(score){
    if(score >= 80) return 'Excellent Fit';
    if(score >= 60) return 'Strong Fit';
    if(score >= 40) return 'Good Fit';
    return 'Better with Training';
  }
  const roles = jobs.map(j => ({...j, score: computeMatchPercent(userTraits, j.required_traits)}))
                   .filter(r => r.score >= 30)
                   .sort((a,b) => b.score - a.score || a.title.localeCompare(b.title));

  const list = qs('#results');
  if(roles.length === 0){
    list.innerHTML = `<div class="card"><div class="title">No strong matches yet</div>
      <p class="subtitle" style="font-size:1rem;color:#c9d4ff">Try adding more traits or different categories. Nova will show roles once there’s enough alignment.</p></div>`;
    return;
  }

  roles.slice(0, 12).forEach(r => {
    const el = document.createElement('div');
    el.className = 'card';
    const label = fitLabel(r.score);
    const switchLine = switchingFrom
      ? `<li><span class="kicker">From ${switchingFrom} →</span> We’ll highlight transferable strengths and show what’s new in this field.</li>`
      : '';
    el.innerHTML = `
      <div class="title">${r.title} <span class="small">— ${label}</span></div>
      <div class="small" style="margin-top:6px">Key traits: ${r.required_traits.map(x=>x.replace(/_/g,' ')).join(', ')}</div>
      <div class="list" style="margin-top:10px">
        <li><span class="strong">This is your reveal.</span> You’re best designed for this field — and with focus, you can step into it.</li>
        ${switchLine}
        <li><span class="kicker">Entry Pathway:</span> ${Array.isArray(r.entry_pathway)? r.entry_pathway.join(', ') : r.entry_pathway}</li>
        <li><span class="kicker">Paving Your Path:</span> ${Array.isArray(r.bricks)? r.bricks.join(' • ') : r.bricks}</li>
        <li><span class="kicker">Timeframe:</span> ${r.timeframe} of steady effort can lay this foundation while you continue your current work.</li>
      </div>
      <div class="small" style="margin-top:10px">For courses and resources to help pave your path, continue in Navi.</div>
    `;
    list.appendChild(el);
  });

  qs('#to-plan').addEventListener('click', () => navigate('plan.html'));
}

async function initPlan(){
  const wrap = qs('#plans'), badge = qs('#family-badge'), pin = qs('#pin'), btn = qs('#pin-btn');
  if(hasFamilyPass()) badge.classList.remove('hidden');
  btn.addEventListener('click', ()=>{
    if(setFamilyPass(pin.value||'')){
      badge.classList.remove('hidden');
      alert('Family access granted. You can proceed without payment.');
      qsa('button[data-plan]').forEach(b=>b.textContent=b.textContent.replace('Start','Start')+' (Family Pass)');
    } else {
      alert('PIN not recognized.');
    }
  });
  let plans = await fetchJSON('assets/data/plans.json').catch(()=>([]));
  if(!Array.isArray(plans) || plans.length===0){
    plans=[
      {id:'starter',name:'Starter',price:'29.99/mo',features:['Nova 50-trait discovery + PDF','Basic resume builder','Standard cover letter generator','Job match suggestions','1 Pro doc preview / month','Navi’s Golden Nugget newsletter'],payhip:null},
      {id:'pro',name:'Pro',price:'99/mo',features:['Everything in Starter','Resume rewrite AI (unlimited)','Unlimited cover letters','Company intelligence reports','Advanced job filters + saved searches','Priority support'],payhip:'re4Hy'}
    ];
  }
  plans.forEach(p => {
    const card = document.createElement('div');
    card.className='card';
    const feats = p.features.map(f=>`<li>${f}</li>`).join('');
    const pay = p.payhip?`<a href="https://payhip.com/b/${p.payhip}" class="payhip-buy-button" data-theme="green" data-product="${p.payhip}">Buy Now</a>`:'';
    const start = `<button class="btn primary" data-plan="${p.id}">Start ${p.name}${hasFamilyPass()?' (Family Pass)':''}</button>`;
    card.innerHTML = `
      <div class="title">${p.name} <span class="small">— ${p.price}</span></div>
      <ul class="list">${feats}</ul>
      <div style="display:flex; gap:12px; align-items:center; margin-top:12px;">
        ${pay}
        ${start}
      </div>`;
    wrap.appendChild(card);
  });
  wrap.addEventListener('click', e=>{
    const b = e.target.closest('button[data-plan]');
    if(!b) return;
    if(hasFamilyPass()){
      alert(\`Proceeding to Navi with \${b.getAttribute('data-plan')} (Family Pass).\`);
      window.location.href='https://navi.meetnovanow.com/';
    } else {
      alert('Please complete the Payhip purchase to proceed, or enter Family PIN.');
    }
  });
  const s=document.createElement('script');s.src='https://payhip.com/payhip.js';s.type='text/javascript';document.body.appendChild(s);
}

document.addEventListener('DOMContentLoaded',()=>{
  const p = document.body.getAttribute('data-page')||'';
  if(p==='welcome') initWelcome();
  if(p==='categories') initCategories();
  if(p==='traits') initTraits();
  if(p==='reflections') initReflections();
  if(p==='results') initResults();
  if(p==='plan') initPlan();
});
