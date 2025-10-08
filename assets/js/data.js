// Relative loaders with graceful failure
const FILES = { categories:'categories.json', traits:'traits.json', jobs:'jobs.json' };
async function j(name){ const r=await fetch('data/'+name,{cache:'no-store'}); if(!r.ok) throw new Error(name); return r.json(); }
async function loadAllData(){
  const out={categories:[], traits:[], ooh:[]};
  try{ out.categories = await j(FILES.categories);}catch(e){}
  try{ out.traits = await j(FILES.traits);}catch(e){}
  try{ out.ooh = await j(FILES.jobs);}catch(e){}
  return out;
}
function computeMatches({ooh=[], selectedCategoryIds=[], selectedTraits=[]}, max=30){
  const traitWords = new Set(selectedTraits.map(t=> (t.name||t).toLowerCase()));
  const catIds = new Set(selectedCategoryIds);
  const scored=[];
  for(const job of ooh){
    const title=(job.title||'').toLowerCase(); const summary=(job.summary||'').toLowerCase();
    const jobCats=new Set(job.categoryIds||[]); let score=0;
    for(const id of catIds){ if(jobCats.has(id)) score+=5; }
    for(const tw of traitWords){ if(tw && (title.includes(tw)||summary.includes(tw))) score+=1; }
    if(score>0) scored.push({job,score});
  }
  scored.sort((a,b)=> b.score-a.score);
  return scored.slice(0,max).map(({job,score})=>({title:job.title,soc:job.soc_code||'',summary:job.summary||'',score:Math.round(score*10)/10}));
}
