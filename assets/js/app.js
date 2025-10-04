
const state = {
  catalog: null,
  selectedCategories: new Set(JSON.parse(localStorage.getItem('selectedCategories')||'[]')),
  selectedTraits: new Set(JSON.parse(localStorage.getItem('selectedTraits')||'[]')),
  journey: localStorage.getItem('selectedJourney') || null,
  plan: localStorage.getItem('planTier') || null
};

function toast(msg){
  const el = document.createElement('div'); el.className='toast'; el.textContent=msg;
  document.body.appendChild(el); requestAnimationFrame(()=>el.classList.add('show'));
  setTimeout(()=>{el.classList.remove('show'); el.remove();}, 2200);
}

async function loadCatalog(){
  if (state.catalog) return state.catalog;
  const res = await fetch('/data/catalog.json', {cache:'no-store'});
  if(!res.ok) throw new Error('Failed to load catalog.json');
  const cat = await res.json();
  // Validate presence of traits for each category
  const missing = [], empty = [];
  cat.categories.forEach(c=>{
    const arr = cat.traitsByCategory[c.id];
    if (!arr) missing.push(c.label);
    else if (!Array.isArray(arr) || arr.length === 0) empty.push(c.label);
  });
  if (missing.length) throw new Error('Missing traits for: '+missing.join(', '));
  if (empty.length) throw new Error('Empty traits for: '+empty.join(', '));
  state.catalog = cat;
  return cat;
}

function syncCategoryUI(){
  document.querySelectorAll('.category-tile[data-id]').forEach(el=>{
    const id = el.getAttribute('data-id');
    el.classList.toggle('selected', state.selectedCategories.has(id));
    el.setAttribute('aria-pressed', state.selectedCategories.has(id) ? 'true':'false');
  });
}
function attachCategoryHandlers(){
  document.querySelectorAll('.category-tile[data-id]').forEach(el=>{
    el.addEventListener('click', ()=>{
      const id = el.getAttribute('data-id');
      if (state.selectedCategories.has(id)) state.selectedCategories.delete(id);
      else state.selectedCategories.add(id);
      localStorage.setItem('selectedCategories', JSON.stringify([...state.selectedCategories]));
      syncCategoryUI();
    });
  });
}

function renderCategories(cats){
  const wrap = document.querySelector('#categories-grid');
  wrap.innerHTML = cats.map(cat=>`
    <button class="category-tile" data-id="${cat.id}" aria-pressed="false">
      <span class="category-label">${cat.label}</span>
    </button>
  `).join('');
  attachCategoryHandlers(); syncCategoryUI();
}

function proceedToTraits(){
  if (state.selectedCategories.size === 0) return toast('Please select at least one category.');
  // Verify data exists for selected categories
  const ids = [...state.selectedCategories];
  const missing = ids.filter(id=>!state.catalog.traitsByCategory[id] || state.catalog.traitsByCategory[id].length===0);
  if(missing.length) return toast('Traits not available for: '+missing.join(', '));
  window.location.href = '/traits.html';
}

function renderTraits(){
  const wrap = document.querySelector('#traits-grid');
  const ids = [...state.selectedCategories];
  const traits = [];
  ids.forEach(id=>{
    (state.catalog.traitsByCategory[id]||[]).forEach(t=>traits.push({...t, catId:id}));
  });
  wrap.innerHTML = traits.map(t=>`
    <button class="trait" data-id="${t.id}" data-cat="${t.catId}" aria-pressed="${state.selectedTraits.has(t.id) ? 'true':'false'}">
      ${t.label}
    </button>
  `).join('');
  document.querySelectorAll('.trait').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = btn.getAttribute('data-id');
      const pressed = btn.getAttribute('aria-pressed')==='true';
      if (pressed){ state.selectedTraits.delete(id); btn.setAttribute('aria-pressed','false'); }
      else { state.selectedTraits.add(id); btn.setAttribute('aria-pressed','true'); }
      btn.classList.toggle('selected');
      localStorage.setItem('selectedTraits', JSON.stringify([...state.selectedTraits]));
    });
  });
}

function computeResults(){
  // Simple demo scoring: count selected traits per category
  const counts = {};
  [...state.selectedTraits].forEach(tid=>{
    // find t in any category
    for (const [cid, list] of Object.entries(state.catalog.traitsByCategory)){
      if (list.some(x=>x.id===tid)){ counts[cid]=(counts[cid]||0)+1; break; }
    }
  });
  // Label rules (can be replaced with real logic thresholds)
  function label(val){
    if (val>=8) return 'Excellent';
    if (val>=5) return 'Strong';
    if (val>=2) return 'Good';
    return 'Intro';
  }
  const rows = Object.entries(counts).map(([cid, val])=>{
    const cat = state.catalog.categories.find(c=>c.id===cid);
    return {category:cat?cat.label:cid, score:val, fit:label(val)};
  }).sort((a,b)=>b.score-a.score);
  return rows;
}

function renderResults(){
  const rows = computeResults();
  const table = document.querySelector('#results-table');
  if (!rows.length){ table.innerHTML = '<p class="small">Make some trait selections to view your fit.</p>'; return; }
  table.innerHTML = rows.map(r=>`
    <div class="card row" style="justify-content:space-between">
      <div><strong>${r.category}</strong></div>
      <div>${r.fit}</div>
    </div>
  `).join('');
}

function attachJourneyHandlers(){
  document.querySelectorAll('.journey-card[data-journey]').forEach(el=>{
    el.addEventListener('click', ()=>{
      state.journey = el.getAttribute('data-journey');
      localStorage.setItem('selectedJourney', state.journey);
      document.querySelectorAll('.journey-card').forEach(x=>x.classList.remove('selected'));
      el.classList.add('selected');
    });
  });
  // sync
  document.querySelectorAll('.journey-card[data-journey]').forEach(el=>{
    el.classList.toggle('selected', el.getAttribute('data-journey')===state.journey);
  });
}

function setPlanTier(tier){
  state.plan = tier; localStorage.setItem('planTier', tier);
}

// PIN modal helpers
function openPin(){ document.querySelector('#pin-backdrop').classList.add('open'); }
function closePin(){ document.querySelector('#pin-backdrop').classList.remove('open'); }

// Bridge
function goToNavi(){
  const params = new URLSearchParams();
  params.set('plan', state.plan || '');
  params.set('journey', state.journey || '');
  params.set('cats', JSON.stringify([...state.selectedCategories]));
  params.set('traits', JSON.stringify([...state.selectedTraits]));
  window.location.href = '/navi/index.html?'+params.toString();
}


// ---- Auth-aware persistence (PIN-gated) ----
function isSignedIn(){
  return localStorage.getItem('signedIn') === 'true';
}
function clearSelections(){
  ['selectedCategories','selectedTraits','selectedJourney','planTier'].forEach(k=>localStorage.removeItem(k));
}
function onPageLoadSessionGuard(){
  // If not signed in, always wipe selections so nothing sticks
  if (!isSignedIn()){
    clearSelections();
  }
  localStorage.setItem('lastActiveAt', String(Date.now()));
}
onPageLoadSessionGuard();
window.addEventListener('pagehide', ()=>{
  localStorage.setItem('lastActiveAt', String(Date.now()));
});


// Init per page
document.addEventListener('DOMContentLoaded', async ()=>{
  const page = document.body.getAttribute('data-page');
  try{
    const cat = await loadCatalog();
    if (page==='categories'){ renderCategories(cat.categories); }
    if (page==='traits'){ renderTraits(); }
    if (page==='results'){ renderResults(); }
    if (page==='reflection'){ attachJourneyHandlers(); }
    if (page==='plans'){ /* nothing special */ }
  }catch(e){
    console.error(e);
    toast('We had trouble loading your data. Please refresh.');
  }
});
