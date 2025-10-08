window.NOVA = {
  state: {
    pin: localStorage.getItem('nova.pin') || '',
    user: localStorage.getItem('nova.user') || '',
    categories: JSON.parse(localStorage.getItem('nova.categories')||'[]'),
    traits: JSON.parse(localStorage.getItem('nova.traits')||'[]'),
    selectedCategories: JSON.parse(localStorage.getItem('nova.selectedCategories')||'[]'),
    selectedTraits: JSON.parse(localStorage.getItem('nova.selectedTraits')||'[]'),
    matches: JSON.parse(localStorage.getItem('nova.matches')||'[]'),
    plan: localStorage.getItem('nova.plan') || ''
  },
  save(){
    const s=this.state;
    localStorage.setItem('nova.pin', s.pin||'');
    localStorage.setItem('nova.user', s.user||'');
    localStorage.setItem('nova.categories', JSON.stringify(s.categories||[]));
    localStorage.setItem('nova.traits', JSON.stringify(s.traits||[]));
    localStorage.setItem('nova.selectedCategories', JSON.stringify(s.selectedCategories||[]));
    localStorage.setItem('nova.selectedTraits', JSON.stringify(s.selectedTraits||[]));
    localStorage.setItem('nova.matches', JSON.stringify(s.matches||[]));
    localStorage.setItem('nova.plan', s.plan||'');
  }
};
async function loadConfig(){
  try{
    const r = await fetch('/assets/config.json', {cache:'no-store'});
    return await r.json();
  }catch(e){
    return { payhip: { starter:"#", pro:"#", mastery:"#", book:"#"} };
  }
}
function qs(sel){ return document.querySelector(sel); }
function qsa(sel){ return Array.from(document.querySelectorAll(sel)); }
