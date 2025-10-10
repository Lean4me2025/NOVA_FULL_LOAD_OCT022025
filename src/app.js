(function(){
  const $ = s=>document.querySelector(s);
  const state = { sectors: [], traits: [], data:{ sectors:{}, jobs:[] } };
  async function boot(){
    const s = await fetch('../data/sector_traits.json').then(r=>r.json());
    const j = await fetch('../data/jobs.json').then(r=>r.json());
    state.data.sectors = s; state.data.jobs = j;
    renderSectors(Object.keys(s).filter(n=>n!=='Common')); renderTraits(); validate();
  }
  function pill(label, value, on){
    const el = document.createElement('label'); el.className='pill';
    el.innerHTML = `<input type="checkbox" value="${value}"><span>${label}</span>`;
    el.addEventListener('click',()=> on(el)); return el;
  }
  function renderSectors(names){
    const wrap = document.getElementById('sectors'); wrap.innerHTML='';
    names.forEach(n=> wrap.appendChild(pill(n,n, toggleSector)));
  }
  function toggleSector(p){
    const input = p.querySelector('input'); const v = input.value;
    input.checked = !input.checked;
    if(input.checked){ if(state.sectors.length>=2){ input.checked=false; return; } state.sectors.push(v); p.classList.add('selected'); }
    else { state.sectors = state.sectors.filter(x=>x!==v); p.classList.remove('selected'); }
    renderTraits(); validate();
  }
  function renderTraits(){
    const wrap = document.getElementById('traits'); wrap.innerHTML='';
    const set = new Set();
    if(state.sectors.length){
      state.sectors.forEach(sec=> (state.data.sectors[sec]?.traits||[]).forEach(t=> set.add(t)));
    } else { (state.data.sectors['Common']?.traits||[]).forEach(t=> set.add(t)); }
    Array.from(set).forEach(t=> wrap.appendChild(pill(t,t, toggleTrait)));
  }
  function toggleTrait(p){
    const input = p.querySelector('input'); const v = input.value;
    input.checked = !input.checked;
    if(input.checked){ if(state.traits.length>=7){ input.checked=false; return; } state.traits.push(v); p.classList.add('selected'); }
    else { state.traits = state.traits.filter(x=>x!==v); p.classList.remove('selected'); }
    validate();
  }
  function validate(){
    const okS = state.sectors.length>=1 && state.sectors.length<=2;
    const okT = state.traits.length>=3 && state.traits.length<=7;
    const btn = document.getElementById('revealBtn');
    if(okS && okT){ btn.classList.remove('disabled'); btn.removeAttribute('aria-disabled'); }
    else { btn.classList.add('disabled'); btn.setAttribute('aria-disabled','true'); }
  }
  function score(job){
    if(!state.sectors.includes(job.sector)) return -1;
    let s = 0; const w = job.trait_weights||{};
    state.traits.forEach(t=>{ if(w[t]) s += w[t]; });
    if(state.sectors.length===1) s *= 1.05; return s;
  }
  function reveal(){
    const pool = state.data.jobs.filter(j=> state.sectors.includes(j.sector));
    const ranked = pool.map(j=> ({...j, __s: score(j)})).filter(j=> j.__s>0).sort((a,b)=> b.__s-a.__s).slice(0,6);
    const out = document.getElementById('jobs'); out.innerHTML='';
    if(!ranked.length){ out.innerHTML = '<div class="muted">No matches yet — try swapping a trait.</div>'; }
    else{
      ranked.forEach(j=>{
        const top = Object.entries(j.trait_weights).filter(([k,v])=> state.traits.includes(k)).sort((a,b)=> b[1]-a[1]).slice(0,3).map(([k])=> `<span class=\"badge\">${k}</span>`).join(' ');
        const div = document.createElement('div'); div.className='job';
        div.innerHTML = `<h4>${j.title} — <span class=\"muted\">${j.sector}</span></h4>
          <div class=\"why\">Why this fits you: ${top||'sector fit'}</div>
          <div><span class=\"badge\">Salary: ${j.salary||'—'}</span> <span class=\"badge\">Outlook: ${j.outlook||'—'}</span></div>
          <div class=\"why\">${j.note||''}</div>`;
        out.appendChild(div);
      });
    }
    document.getElementById('results').style.display='block';
    window.scrollTo({top: document.body.scrollHeight, behavior:'smooth'});
  }
  document.getElementById('revealBtn').addEventListener('click', e=>{ if(e.currentTarget.classList.contains('disabled')) return; reveal(); });
  document.getElementById('resetBtn').addEventListener('click', ()=>{
    state.sectors=[]; state.traits=[]; renderSectors(Object.keys(state.data.sectors).filter(n=>n!=='Common')); renderTraits(); validate(); document.getElementById('results').style.display='none';
  });
  boot();
})();