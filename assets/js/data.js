const FILES = { categories:'categories.json', traits:'traits.json', jobs:'jobs.json' };
async function j(name){ const r = await fetch('data/'+name, {cache:'no-store'}); if(!r.ok) throw 0; return r.json(); }
async function loadAllData(){
  const [cats, traits, jobs] = await Promise.allSettled([j(FILES.categories), j(FILES.traits), j(FILES.jobs)]);
  return {
    categories: cats.status==='fulfilled'? cats.value: [],
    traits: traits.status==='fulfilled'? traits.value: [],
    ooh: jobs.status==='fulfilled'? jobs.value: []
  };
}
function computeMatches({ooh=[], selectedCategoryIds=[], selectedTraits=[]}, max=30){
  const traitWords = new Set(selectedTraits.map(t=> (t.name||t).toLowerCase()));
  const catIds = new Set(selectedCategoryIds);
  const scored = [];
  for(const job of ooh){
    const title=(job.title||'').toLowerCase();
    const summary=(job.summary||'').toLowerCase();
    const jobCats = new Set(job.categoryIds||[]);
    let score = 0;
    for(const id of catIds){ if(jobCats.has(id)) score += 5; }
    for(const tw of traitWords){ if(tw && (title.includes(tw) || summary.includes(tw))) score += 1; }
    if(score>0) scored.push({job, score});
  }
  scored.sort((a,b)=> b.score-a.score);
  return scored.slice(0,max).map(({job,score})=> ({ title:job.title, soc:job.soc_code||'', summary:job.summary||'', score:Math.round(score*10)/10 }));
}
