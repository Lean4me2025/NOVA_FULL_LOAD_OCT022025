
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
async function initCategories(){const e=qs('#category-grid'),t=qs('#to-traits'),n=qs('#reset'),a=await fetchJSON('assets/data/categories.json'),r=new Set(loadSelectedCategories());a.forEach(t=>{const n=document.createElement('button');n.className='pill'+(r.has(t.id)?' selected':''),n.innerHTML=`<input type="checkbox" ${r.has(t.id)?'checked':''} data-id="${t.id}"><span>${t.name}</span>`,n.addEventListener('click',()=>{r.has(t.id)?r.delete(t.id):r.add(t.id),n.classList.toggle('selected'),saveSelectedCategories([...r])}),e.appendChild(n)}),t.addEventListener('click',()=>{0===r.size?alert('Please select at least one category.'):navigate('traits.html')}),n.addEventListener('click',()=>{localStorage.removeItem(STORAGE_KEYS.CATEGORIES),localStorage.removeItem(STORAGE_KEYS.TRAITS),localStorage.removeItem(STORAGE_KEYS.REFLECTION),qsa('.pill.selected').forEach(e=>e.classList.remove('selected'))})}
async function initTraits(){const e=qs('#trait-grid'),t=qs('#to-reflections'),n=new Set(loadSelectedCategories());0===n.size&&navigate('categories.html');const a=await fetchJSON('assets/data/traits.json'),r=a.filter(e=>e.categories.some(e=>n.has(e))),s=new Set(JSON.parse(localStorage.getItem(STORAGE_KEYS.TRAITS)||'[]')),o=12;r.forEach(t=>{const n=document.createElement('button');n.className='pill'+(s.has(t.id)?' selected':''),n.innerHTML=`<input type="checkbox" ${s.has(t.id)?'checked':''} data-id="${t.id}"><span>${t.label}</span>`,n.addEventListener('click',()=>{if(!s.has(t.id)&&s.size>=o)return void alert(`You can choose up to ${o} traits.`);s.has(t.id)?s.delete(t.id):s.add(t.id),n.classList.toggle('selected'),localStorage.setItem(STORAGE_KEYS.TRAITS,JSON.stringify([...s])),qs('#trait-count').textContent=s.size}),e.appendChild(n)}),qs('#trait-count').textContent=s.size,t.addEventListener('click',()=>{s.size<6&&!confirm('Fewer than 6 traits selected. Continue?')||navigate('reflections.html')})}
async function initReflections(){
  const cont = qs('#reflections'), next = qs('#to-results');
  const data = await fetchJSON('assets/data/reflections.json');
  const prevSel = loadReflection();
  data.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'pill' + (prevSel===item.id?' selected':'');
    btn.innerHTML = `<div>${item.label}</div><div class="desc">${item.note}</div>`;
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
      <p class="subtitle">Try adding more traits or different categories. Nova will show roles once there’s enough alignment.</p></div>`;
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
async function initPlan(){const e=qs('#plans'),t=qs('#family-badge'),n=qs('#pin'),a=qs('#pin-btn');hasFamilyPass()&&t.classList.remove('hidden'),a.addEventListener('click',()=>{setFamilyPass(n.value||'')?(t.classList.remove('hidden'),alert('Family access granted. You can proceed without payment.'),qsa('button[data-plan]').forEach(e=>e.textContent=e.textContent.replace('Start','Start')+' (Family Pass)')):alert('PIN not recognized.')});let r=await fetchJSON('assets/data/plans.json').catch(()=>({}));r&&Array.isArray(r)||(r=[{id:'starter',name:'Starter',price:'29.99/mo',features:['Nova 50-trait discovery + PDF','Basic resume builder','Standard cover letter generator','Job match suggestions','1 Pro doc preview / month','Navi’s Golden Nugget newsletter'],payhip:null},{id:'pro',name:'Pro',price:'99/mo',features:['Everything in Starter','Resume rewrite AI (unlimited)','Unlimited cover letters','Company intelligence reports','Advanced job filters + saved searches','Priority support'],payhip:'re4Hy'},{id:'mastery',name:'Mastery',price:'149/mo',features:['Everything in Pro','1:1 coaching & premium support','Career roadmap PDF','Extended document library','Early access to features','Quarterly masterclass invite'],payhip:'re4Hy'}]),r.forEach(t=>{const n=document.createElement('div');n.className='card';const a=t.features.map(e=>`<li>${e}</li>`).join(''),r=t.payhip?`<a href="https://payhip.com/b/${t.payhip}" class="payhip-buy-button" data-theme="green" data-product="${t.payhip}">Buy Now</a>`:'',s=`<button class="btn primary" data-plan="${t.id}">Start ${t.name}${hasFamilyPass()?' (Family Pass)':''}</button>`;n.innerHTML=`
      <div class="title">${t.name} <span class="small">— ${t.price}</span></div>
      <ul class="list">${a}</ul>
      <div style="display:flex; gap:12px; align-items:center; margin-top:12px;">
        ${r}
        ${s}
      </div>
    `,e.appendChild(n)}),e.addEventListener('click',t=>{const n=t.target.closest('button[data-plan]');n&&(hasFamilyPass()?(alert(`Proceeding to Navi with ${n.getAttribute('data-plan')} (Family Pass).`),window.location.href='https://navi.meetnovanow.com/'):(alert('Please complete the Payhip purchase to proceed, or enter Family PIN.')))});const s=document.createElement('script');s.setAttribute('src','https://payhip.com/payhip.js'),s.setAttribute('type','text/javascript'),document.body.appendChild(s)}
document.addEventListener('DOMContentLoaded',()=>{const e=document.body.getAttribute('data-page')||'';'welcome'===e&&initWelcome(),'categories'===e&&initCategories(),'traits'===e&&initTraits(),'reflections'===e&&initReflections(),'results'===e&&initResults(),'plan'===e&&initPlan()});
