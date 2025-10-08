
export function readJSON(path){ return fetch(path,{cache:'no-store'}).then(r=>{ if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); }); }
export function get(k,f=null){ try{const v=localStorage.getItem(k); return v?JSON.parse(v):f;}catch{return f} }
export function set(k,v){ localStorage.setItem(k, JSON.stringify(v)); }
export function nav(to){ location.href=to; }
export const byAlpha=(a,b)=>a.localeCompare(b);
export const dedupe=(arr)=>[...new Set(arr)];
export const caseKey=(s)=>(s||'').toLowerCase().trim();
console.log("Nova v9.4c | Purpose Meets Outlook | Guided Start + Navi Bridge");
