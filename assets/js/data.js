// Relative path loader
const FILES = { categories:'categories.json', traits:'traits.json', jobs:'jobs.json' };

async function loadJSON(name){
  const url = 'data/'+name;
  const r = await fetch(url, {cache:'no-store'});
  if(!r.ok) throw new Error('Missing or unreadable: '+name+' ('+url+')');
  return await r.json();
}

async function loadAllData(){
  const out = { categories:[], traits:[], ooh:[] };
  try{ const cm = await loadJSON(FILES.categories); out.categories = Array.isArray(cm)? cm : []; }catch(e){}
  try{ const tw = await loadJSON(FILES.traits); out.traits = Array.isArray(tw)? tw : (Array.isArray(tw?.traits)? tw.traits: []);}catch(e){}
  try{ const o = await loadJSON(FILES.jobs); out.ooh = Array.isArray(o)? o : []; }catch(e){}
  return out;
}

function computeMatches({ooh=[], selectedCategories=[], selectedTraits=[]}, max=30){
  const traitWords = new Set(selectedTraits.map(t=> (t.name||t).toLowerCase()));
  const catWords = new Set(selectedCategories.map(c=> String(c).toLowerCase()));
  const scored = [];
  for(const job of ooh){
    const title = (job.title||'').toLowerCase();
    const summary = (job.summary||'').toLowerCase();
    const jobCats = new Set((job.categories||[]).map(x=> String(x).toLowerCase()));
    let score = 0;
    for(const c of catWords){ if(jobCats.has(c)) score += 5; }
    for(const tw of traitWords){ if(tw && (title.includes(tw) || summary.includes(tw))) score += 1; }
    if(score>0){ scored.push({job, score}); }
  }
  scored.sort((a,b)=> b.score-a.score);
  return scored.slice(0, max).map(({job,score})=> ({
    title: job.title || 'Occupation',
    soc: job.soc_code || '',
    summary: job.summary || '',
    score: Math.round(score*10)/10
  }));
}
