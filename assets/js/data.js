async function loadJSON(name){
  const url = '/data/'+name;
  const r = await fetch(url, {cache:'no-store'});
  if(!r.ok) throw new Error('Missing or unreadable: '+name);
  return await r.json();
}

/**
 * Flexible loaders to handle multiple schemas.
 */
async function loadAllData(){
  const out = { categories:[], traits:[], ooh:[] };
  try{
    const cm = await loadJSON('category_matrix.json');
    if(Array.isArray(cm)){
      out.categories = cm;
    }else if(typeof cm==='object' && cm){
      out.categories = Object.keys(cm);
    }
  }catch(e){ toast(e.message); }
  try{
    const twc = await loadJSON('traits_with_categories.json');
    if(Array.isArray(twc)){
      out.traits = twc;
    }else if(twc && Array.isArray(twc.traits)){
      out.traits = twc.traits;
    }
  }catch(e){ toast(e.message); }
  try{
    const ooh = await loadJSON('ooh.json');
    if(Array.isArray(ooh)) out.ooh = ooh;
  }catch(e){ toast(e.message); }
  return out;
}

/**
 * Simple match engine v0:
 * - Score occupations by category overlap and by keyword overlap of traits in title/summary.
 */
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
    for(const tw of traitWords){
      if(tw && (title.includes(tw) || summary.includes(tw))){
        score += 1;
      }
    }
    if(title.includes('engineer')||title.includes('analyst')||title.includes('manager')) score += 0.5;
    if(score>0){
      scored.push({job, score});
    }
  }
  scored.sort((a,b)=> b.score-a.score);
  return scored.slice(0, max).map(({job,score})=> ({
    title: job.title || 'Occupation',
    soc: job.soc_code || '',
    summary: job.summary || '',
    score: Math.round(score*10)/10
  }));
}
