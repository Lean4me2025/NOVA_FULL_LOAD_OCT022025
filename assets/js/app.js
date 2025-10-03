
const STORAGE_KEYS={CATEGORIES:'nova.categories.selected',TRAITS:'nova.traits.selected',FAMILY:'nova.family.pass',REFLECTION:'nova.reflection'};
const FAMILY_PINS=['FAMILY2025','NOVA-FAMILY','DREW-CLARA'];

// ---- Built-in fallback data (used only if JSON files fail to load) ----
const NOVA_FALLBACK = {
  "assets/data/categories.json": [{"id": "business", "name": "Business", "desc": "Strategy, planning, and operations that help organizations run and grow."}, {"id": "sales_service", "name": "Sales & Service", "desc": "Serving customers, building relationships, and driving revenue."}, {"id": "technology", "name": "Technology", "desc": "Building software, systems, and digital experiences."}, {"id": "engineering", "name": "Engineering", "desc": "Designing, optimizing, and improving physical or technical systems."}, {"id": "healthcare", "name": "Healthcare", "desc": "Supporting patient care, compliance, and health operations."}, {"id": "creative_media", "name": "Creative & Media", "desc": "Design, storytelling, content, and brand experiences."}, {"id": "education_training", "name": "Education & Training", "desc": "Teaching, coaching, and building learning programs."}, {"id": "operations_logistics", "name": "Operations & Logistics", "desc": "Keeping work moving: processes, supply chains, delivery."}, {"id": "finance_analytics", "name": "Finance & Analytics", "desc": "Insights from numbers: analysis, modeling, forecasting."}, {"id": "public_legal", "name": "Public Service & Legal", "desc": "Service and policy: public programs, legal and civic work."}],
  "assets/data/traits.json": [{"id": "analytical_thinking", "label": "Analytical Thinking", "desc": "You spot patterns in data and use them to make decisions.", "categories": ["finance_analytics", "technology", "business"]}, {"id": "process_improvement", "label": "Process Improvement", "desc": "You streamline steps to make work faster, better, and cheaper.", "categories": ["business", "operations_logistics", "engineering"]}, {"id": "problem_solving", "label": "Problem Solving", "desc": "You enjoy figuring out root causes and practical fixes.", "categories": ["engineering", "technology", "business"]}, {"id": "customer_empathy", "label": "Customer Empathy", "desc": "You understand people’s needs and frustrations and respond well.", "categories": ["sales_service", "healthcare", "public_legal"]}, {"id": "communication", "label": "Clear Communication", "desc": "You explain ideas clearly in writing and in conversation.", "categories": ["business", "education_training", "sales_service"]}, {"id": "data_visualization", "label": "Data Visualization", "desc": "You turn data into charts and visuals people can understand.", "categories": ["finance_analytics", "technology", "business"]}, {"id": "sql_proficiency", "label": "SQL Proficiency", "desc": "You can query databases to answer questions with data.", "categories": ["technology", "finance_analytics"]}, {"id": "python_scripting", "label": "Python Scripting", "desc": "You write simple scripts to automate tasks or analyze data.", "categories": ["technology", "engineering"]}, {"id": "lean_six_sigma", "label": "Lean Six Sigma", "desc": "You use Lean/6σ ideas to reduce waste and defects.", "categories": ["operations_logistics", "business", "engineering"]}, {"id": "project_management", "label": "Project Management", "desc": "You plan, organize, and deliver work with teams.", "categories": ["business", "engineering", "operations_logistics"]}, {"id": "compliance_risk", "label": "Compliance & Risk", "desc": "You help work stay inside rules and manage risks.", "categories": ["public_legal", "finance_analytics", "business"]}, {"id": "it_sox", "label": "IT SOX & Controls", "desc": "You understand IT controls and audit basics for SOX.", "categories": ["technology", "finance_analytics"]}, {"id": "privacy_security", "label": "Privacy & Security", "desc": "You think about protecting data and systems from threats.", "categories": ["technology", "public_legal"]}, {"id": "ux_design", "label": "UX Design", "desc": "You design interfaces that are easy and enjoyable to use.", "categories": ["creative_media", "technology"]}, {"id": "copywriting", "label": "Copywriting", "desc": "You write words that persuade and inform.", "categories": ["creative_media", "business"]}, {"id": "sales_strategy", "label": "Sales Strategy", "desc": "You plan how to find customers and grow revenue.", "categories": ["sales_service", "business"]}, {"id": "account_management", "label": "Account Management", "desc": "You build trust and grow customer relationships.", "categories": ["sales_service", "business"]}, {"id": "teaching_coaching", "label": "Teaching & Coaching", "desc": "You help people learn and improve in practical ways.", "categories": ["education_training", "business"]}, {"id": "curriculum_design", "label": "Curriculum Design", "desc": "You structure lessons and learning experiences.", "categories": ["education_training", "creative_media"]}, {"id": "supply_chain", "label": "Supply Chain", "desc": "You coordinate materials, inventory, and deliveries.", "categories": ["operations_logistics", "business"]}, {"id": "quality_assurance", "label": "Quality Assurance", "desc": "You ensure products or services meet standards.", "categories": ["engineering", "operations_logistics", "technology"]}, {"id": "reliability_testing", "label": "Reliability Testing", "desc": "You test for durability and consistent performance.", "categories": ["engineering"]}, {"id": "systems_thinking", "label": "Systems Thinking", "desc": "You connect moving parts into a working whole.", "categories": ["engineering", "technology", "business"]}, {"id": "cloud_infra", "label": "Cloud Infrastructure", "desc": "You understand hosting, servers, and cloud services.", "categories": ["technology"]}, {"id": "api_integration", "label": "API Integration", "desc": "You connect systems so they share data and actions.", "categories": ["technology", "business"]}, {"id": "etl_pipelines", "label": "ETL Pipelines", "desc": "You move and clean data so it’s ready for analysis.", "categories": ["technology", "finance_analytics"]}, {"id": "power_bi", "label": "Power BI", "desc": "You build dashboards and reports with Power BI.", "categories": ["finance_analytics", "business", "technology"]}, {"id": "excel_advanced", "label": "Excel (Advanced)", "desc": "You use formulas, pivots, and models in spreadsheets.", "categories": ["finance_analytics", "business"]}, {"id": "financial_modeling", "label": "Financial Modeling", "desc": "You project outcomes using revenue and cost drivers.", "categories": ["finance_analytics", "business"]}, {"id": "budget_forecasting", "label": "Budget & Forecasting", "desc": "You plan spend and predict future results.", "categories": ["finance_analytics", "business"]}, {"id": "healthcare_admin", "label": "Healthcare Administration", "desc": "You keep clinics and programs running smoothly.", "categories": ["healthcare", "public_legal"]}, {"id": "clinical_compliance", "label": "Clinical Compliance", "desc": "You align with clinical rules and standards.", "categories": ["healthcare"]}, {"id": "grant_writing", "label": "Grant Writing", "desc": "You craft proposals that win funding.", "categories": ["public_legal", "education_training"]}, {"id": "policy_analysis", "label": "Policy Analysis", "desc": "You evaluate policies and their real-world impact.", "categories": ["public_legal"]}, {"id": "technical_writing", "label": "Technical Writing", "desc": "You turn complex info into clear documentation.", "categories": ["technology", "engineering", "creative_media"]}, {"id": "automation_rpa", "label": "Automation / RPA", "desc": "You automate repetitive tasks and workflows.", "categories": ["technology", "operations_logistics"]}, {"id": "testing_qa", "label": "Testing & QA (Software)", "desc": "You test software to catch bugs early.", "categories": ["technology"]}, {"id": "product_management", "label": "Product Management", "desc": "You align problems, vision, and delivery for products.", "categories": ["business", "technology", "creative_media"]}, {"id": "change_management", "label": "Change Management", "desc": "You guide teams through new ways of working.", "categories": ["business", "education_training"]}, {"id": "negotiation", "label": "Negotiation", "desc": "You find agreements that work for both sides.", "categories": ["sales_service", "business"]}, {"id": "presentation_skills", "label": "Presentation Skills", "desc": "You tell stories and persuade groups live.", "categories": ["business", "education_training"]}, {"id": "research_methods", "label": "Research Methods", "desc": "You design studies and analyze findings.", "categories": ["education_training", "finance_analytics"]}, {"id": "industrial_safety", "label": "Industrial Safety", "desc": "You plan for safe work and prevent accidents.", "categories": ["engineering", "operations_logistics"]}, {"id": "maintenance_planning", "label": "Maintenance Planning", "desc": "You schedule upkeep so equipment keeps running.", "categories": ["engineering", "operations_logistics"]}, {"id": "inventory_optimization", "label": "Inventory Optimization", "desc": "You balance stock so it’s available without waste.", "categories": ["operations_logistics", "finance_analytics"]}, {"id": "customer_success", "label": "Customer Success", "desc": "You help customers realize value and stay long-term.", "categories": ["sales_service", "business", "technology"]}, {"id": "seo_sem", "label": "SEO / SEM", "desc": "You help people find content through search and ads.", "categories": ["creative_media", "business"]}, {"id": "video_editing", "label": "Video Editing", "desc": "You craft narratives with footage and sound.", "categories": ["creative_media"]}, {"id": "digital_illustration", "label": "Digital Illustration", "desc": "You create visuals with digital tools.", "categories": ["creative_media"]}],
  "assets/data/jobs.json": [{"id": "ba_ops", "title": "Process Improvement Specialist", "category": "business", "required_traits": ["analytical_thinking", "process_improvement", "communication", "excel_advanced", "power_bi"], "entry_pathway": ["Operations Coordinator", "Junior Business Analyst"], "bricks": ["Visio or Lucidchart basics", "Six Sigma Yellow→Green Belt"], "timeframe": "≈ 3 months"}, {"id": "it_compliance_ba", "title": "IT Compliance BA (SOX)", "category": "technology", "required_traits": ["it_sox", "compliance_risk", "sql_proficiency", "analytical_thinking", "technical_writing"], "entry_pathway": ["IT Audit Assistant", "Junior Compliance Analyst"], "bricks": ["SOX/ITGC basics", "SQL fundamentals"], "timeframe": "≈ 3–4 months"}, {"id": "data_analyst", "title": "Data Analyst", "category": "finance_analytics", "required_traits": ["sql_proficiency", "analytical_thinking", "data_visualization", "excel_advanced", "power_bi"], "entry_pathway": ["Reporting Analyst", "BI Assistant"], "bricks": ["SQL to intermediate", "Power BI/Tableau basics"], "timeframe": "≈ 3–6 months"}],
  "assets/data/plans.json": [{"id": "starter", "name": "Starter", "price": "29.99/mo", "features": ["Nova 50-trait discovery + PDF", "Basic resume builder", "Standard cover letter generator", "Job match suggestions", "1 Pro doc preview / month", "Navi’s Golden Nugget newsletter"], "payhip": null}, {"id": "pro", "name": "Pro", "price": "99/mo", "features": ["Everything in Starter", "Resume rewrite AI (unlimited)", "Unlimited cover letters", "Company intelligence reports", "Advanced job filters + saved searches", "Priority support"], "payhip": "re4Hy"}, {"id": "mastery", "name": "Mastery", "price": "149/mo", "features": ["Everything in Pro", "1:1 coaching & premium support", "Career roadmap PDF", "Extended document library", "Early access to features", "Quarterly masterclass invite"], "payhip": "re4Hy"}],
  "assets/data/reflections.json": [{"id": "start_career", "label": "I’m starting my career", "note": "You’re at the beginning, and that can feel uncertain — but you’re not alone. Nova will help you discover where your natural strengths fit best, and Navi will point you to the tools and training to get started without overwhelm. You’ll know what’s required, and we’ll walk you through it step by step."}, {"id": "switching_career", "label": "I’m switching careers", "note": "You’ve already built experience, and now you’re stepping into something new. That takes courage. We’ll help you bridge the gap by showing how your current skills carry over, and what new skills matter in your next field. (You can even tell us what you’re switching from, so we can tailor the bridge more clearly.)"}, {"id": "returning_work", "label": "I’m returning to work", "note": "Coming back to work isn’t easy, but it’s possible — and you don’t have to start from zero. Your past skills are still valuable. With focus, discipline, and the right resources, you can re-enter the workforce, earn again, and thrive. Nova will show your fit today, and Navi will give you a simple on-ramp to catch up and succeed."}]
};

// Safe loader: try fetch, fall back to embedded data, and show a notice when using fallback
async function safeFetchJSON(path) {
  try {
    const res = await fetch(path);
    if(!res.ok) throw new Error('Failed: '+path);
    return await res.json();
  } catch (e) {
    console.warn('Using fallback for', path, e);
    const host = document.querySelector('.container');
    if (host) {
      const note = document.createElement('div');
      note.className = 'notice';
      note.textContent = `Content loaded from app (offline fallback): ${path}`;
      host.prepend(note);
    }
    return NOVA_FALLBACK[path] || [];
  }
}

function saveSelectedCategories(e){localStorage.setItem(STORAGE_KEYS.CATEGORIES,JSON.stringify(e))}
function loadSelectedCategories(){try{return JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES))||[]}catch(e){return[]}}
function saveSelectedTraits(e){localStorage.setItem(STORAGE_KEYS.TRAITS,JSON.stringify(e))}
function loadSelectedTraits(){try{return JSON.parse(localStorage.getItem(STORAGE_KEYS.TRAITS))||[]}catch(e){return[]}}
function saveReflection(e){localStorage.setItem(STORAGE_KEYS.REFLECTION,e)}
function loadReflection(){return localStorage.getItem(STORAGE_KEYS.REFLECTION)||null}
function setFamilyPass(e){const t=(e||'').replace(/\s+/g,'').toUpperCase();return FAMILY_PINS.includes(t)?(localStorage.setItem(STORAGE_KEYS.FAMILY,'1'),!0):!1}
function hasFamilyPass(){return'1'===localStorage.getItem(STORAGE_KEYS.FAMILY)}
function qs(e){return document.querySelector(e)}function qsa(e){return[...document.querySelectorAll(e)]}
function navigate(e){window.location.href=e}
function computeMatchPercent(e,t){const n=new Set(e),a=t.length;if(0===a)return 0;const r=t.filter(e=>n.has(e)).length;return Math.round(r/a*100)}

async function initWelcome(){/* no-op */}

async function initCategories(){
  const grid = qs('#category-grid'), toTraits = qs('#to-traits'), reset = qs('#reset');
  const data = await safeFetchJSON('assets/data/categories.json');
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

  toTraits.addEventListener('click', ()=>{ if(selected.size===0){ alert('Please select at least one category.'); return; } navigate('traits.html'); });
  reset.addEventListener('click', ()=>{ localStorage.removeItem(STORAGE_KEYS.CATEGORIES); localStorage.removeItem(STORAGE_KEYS.TRAITS); localStorage.removeItem(STORAGE_KEYS.REFLECTION); qsa('.pill.selected').forEach(p=>p.classList.remove('selected')); });
}

async function initTraits(){
  const grid = qs('#trait-grid'), toRefs = qs('#to-reflections');
  const selectedCats = new Set(loadSelectedCategories());
  const allTraits = await safeFetchJSON('assets/data/traits.json');
  const filtered = allTraits.filter(t => t.categories.some(c => selectedCats.has(c))) || allTraits; // if no cats, show all
  const selected = new Set(loadSelectedTraits());
  const MAX = 12;

  filtered.forEach(tr => {
    const btn = document.createElement('button');
    btn.className = 'pill' + (selected.has(tr.id) ? ' selected' : '');
    btn.dataset.id = tr.id;
    btn.innerHTML = `<div class="label" style="font-weight:700">${tr.label}</div>
                     <div class="desc">${tr.desc || ''}</div>`;
    btn.addEventListener('click', ()=>{
      if(!selected.has(tr.id) && selected.size >= MAX){ alert(`You can choose up to ${MAX} traits.`); return; }
      selected.has(tr.id) ? selected.delete(tr.id) : selected.add(tr.id);
      btn.classList.toggle('selected');
      saveSelectedTraits([...selected]);
      qs('#trait-count').textContent = selected.size;
    });
    grid.appendChild(btn);
  });
  qs('#trait-count').textContent = selected.size;
  toRefs.addEventListener('click', ()=>{ if(selected.size<6 && !confirm('Fewer than 6 traits selected. Continue?')) return; navigate('reflections.html'); });
}

async function initReflections(){
  const cont = qs('#reflections'), next = qs('#to-results');
  const data = await safeFetchJSON('assets/data/reflections.json');
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
      if(item.id==='switching_career'){qs('#switching-extra').classList.remove('hidden');} else {qs('#switching-extra').classList.add('hidden');}
    });
    cont.appendChild(btn);
  });
  next.addEventListener('click', ()=>{
    if(!loadReflection()){alert('Please choose one.'); return;}
    if(loadReflection()==='switching_career'){ const val=qs('#switching-from').value.trim(); if(val) localStorage.setItem('nova.switching.from', val); }
    navigate('results.html');
  });
}

async function initResults(){
  // KPIs
  const cats = JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES) || '[]');
  const traits = JSON.parse(localStorage.getItem(STORAGE_KEYS.TRAITS) || '[]');
  const journeyKey = (localStorage.getItem(STORAGE_KEYS.REFLECTION) || '').replace('_',' ');
  const journey = journeyKey ? journeyKey[0].toUpperCase()+journeyKey.slice(1) : '—';
  const k1=qs('#kpi-cats'), k2=qs('#kpi-traits'), k3=qs('#kpi-path');
  if(k1) k1.textContent = cats.length;
  if(k2) k2.textContent = traits.length;
  if(k3) k3.textContent = journey;

  const userTraits = JSON.parse(localStorage.getItem(STORAGE_KEYS.TRAITS) || '[]');
  const jobs = await safeFetchJSON('assets/data/jobs.json');
  const switchingFrom = localStorage.getItem('nova.switching.from') || "";
  function fitLabel(score){ if(score >= 80) return 'Excellent Fit'; if(score >= 60) return 'Strong Fit'; if(score >= 40) return 'Good Fit'; return 'Better with Training'; }
  const roles = jobs.map(j => ({...j, score: computeMatchPercent(userTraits, j.required_traits)}))
                   .filter(r => r.score >= 30)
                   .sort((a,b) => b.score - a.score || a.title.localeCompare(b.title));

  const list = qs('#results');
  if(roles.length === 0){
    list.innerHTML = `<div class="card"><div class="title">No strong matches yet</div>
      <p class="subtitle" style="font-size:1rem;color:#c9d4ff">Try adding more traits or different categories. Nova will show roles once there’s enough alignment.</p>
      <ul class="list">
        <li><span class="kicker">Tip:</span> Choose at least 6–8 traits across 2+ categories.</li>
        <li><span class="kicker">Remember:</span> It’s okay to include skills you used in the past — they still count toward your fit.</li>
      </ul></div>`;
    return;
  }

  roles.slice(0, 12).forEach(r => {
    const el = document.createElement('div');
    el.className = 'card';
    const label = fitLabel(r.score);
    const switchLine = switchingFrom ? `<li><span class="kicker">From ${switchingFrom} →</span> We’ll highlight transferable strengths and show what’s new in this field.</li>` : '';
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

  const toPlan = qs('#to-plan'); if(toPlan) toPlan.addEventListener('click', () => navigate('plan.html'));
}

async function initPlan(){
  const wrap = qs('#plans'), badge = qs('#family-badge'), pin = qs('#pin'), btn = qs('#pin-btn');
  if(hasFamilyPass()) badge.classList.remove('hidden');
  btn.addEventListener('click', ()=>{ if(setFamilyPass(pin.value||'')){ badge.classList.remove('hidden'); alert('Family access granted. You can proceed without payment.'); qsa('button[data-plan]').forEach(b=>b.textContent=b.textContent.replace('Start','Start')+' (Family Pass)'); } else { alert('PIN not recognized.'); } });
  const planData = await safeFetchJSON('assets/data/plans.json');
  planData.forEach(p => {
    const card = document.createElement('div');
    card.className='card';
    const feats = p.features.map(f=>`<li>${f}</li>`).join('');
    const pay = p.payhip?`<a href="https://payhip.com/b/${p.payhip}" class="payhip-buy-button" data-theme="green" data-product="${p.payhip}">Buy Now</a>`:'';
    const start = `<button class="btn primary" data-plan="${p.id}">Start ${p.name}${hasFamilyPass()? ' (Family Pass)' : ''}</button>`;
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
    if(hasFamilyPass()){ alert(`Proceeding to Navi with ${b.getAttribute('data-plan')} (Family Pass).`); window.location.href='https://navi.meetnovanow.com/'; }
    else { alert('Please complete the Payhip purchase to proceed, or enter Family PIN.'); }
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
