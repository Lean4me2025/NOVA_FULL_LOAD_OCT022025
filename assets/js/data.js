// Relative-path loader (works on subfolders)
const FILES = { categories:'categories.json', traits:'traits.json', jobs:'jobs.json' };

async function loadJSON(name){
  const url = 'data/'+name; // relative instead of absolute
  const r = await fetch(url, {cache:'no-store'});
  if(!r.ok) throw new Error('Missing or unreadable: '+name+' ('+url+')');
  return await r.json();
}

async function loadAllData(){
  const out = { categories:[], traits:[], ooh:[] };
  try{
    const cm = await loadJSON(FILES.categories);
    if(Array.isArray(cm)){ out.categories = cm; }
    else if(cm && typeof cm==='object'){ out.categories = Object.keys(cm); }
  }catch(e){ console.log('[NOVA]', e.message); }
  try{
    const twc = await loadJSON(FILES.traits);
    if(Array.isArray(twc)){ out.traits = twc; }
    else if(twc && Array.isArray(twc.traits)){ out.traits = twc.traits; }
  }catch(e){ console.log('[NOVA]', e.message); }
  try{
    const ooh = await loadJSON(FILES.jobs);
    if(Array.isArray(ooh)) out.ooh = ooh;
  }catch(e){ console.log('[NOVA]', e.message); }
  return out;
}
