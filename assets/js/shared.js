
export function readJSON(path){ return fetch(path,{cache:'no-store'}).then(r=>{ if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); }); }
export function getSelectedCategories(){
  try{ const raw=localStorage.getItem('selectedCategories'); const arr=raw?JSON.parse(raw):[]; return Array.isArray(arr)?arr:[]; }catch{ return []; }
}
export function setSelectedCategories(arr){ localStorage.setItem('selectedCategories', JSON.stringify(arr||[])); }
export function setSelectedTraits(arr){ localStorage.setItem('selectedTraits', JSON.stringify(arr||[])); }
export function getSelectedTraits(){ try{ return JSON.parse(localStorage.getItem('selectedTraits')||'[]'); }catch{ return []; } }
export function dedupe(arr){ return [...new Set(arr)]; }
export const byAlpha = (a,b)=>a.localeCompare(b);
export function nav(to){ location.href = to; }
