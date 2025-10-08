// pricing.override.js — reads ./data/pricing_links.json and updates plan buttons
(async function(){
  const pathCandidates = ['./data/pricing_links.json', '/data/pricing_links.json'];
  let cfg = null;
  for (const p of pathCandidates) {
    try {
      const r = await fetch(p, {cache:'no-store'});
      if (r.ok) { cfg = await r.json(); break; }
    } catch(e){}
  }
  if (!cfg) return;

  // Helper: find a tier by heading text
  function findTierByTitle(title) {
    const hs = Array.from(document.querySelectorAll('.tier h2'));
    return hs.find(h => (h.textContent||'').trim().toLowerCase() === title.toLowerCase())?.closest('.tier') || null;
  }

  const map = [
    {key:'starter', title:'Starter'},
    {key:'pro',     title:'Pro'},
    {key:'mastery', title:'Mastery'},
    {key:'book',    title:'Purpose Book'}
  ];

  map.forEach(({key,title}) => {
    const url = cfg[key];
    const tier = findTierByTitle(title);
    if (url && tier) {
      const a = tier.querySelector('a.paybtn');
      if (a) a.href = url;
    }
  });

  // If the layout class isn't present (older build), inject it so the button sits right of title
  document.querySelectorAll('.tier').forEach(tier => {
    if (!tier.querySelector('.tier-head')) {
      const h2 = tier.querySelector('h2'); if (!h2) return;
      const btn = tier.querySelector('a.paybtn'); if (!btn) return;
      const head = document.createElement('div'); head.className = 'tier-head';
      h2.parentNode.insertBefore(head, h2);
      head.appendChild(h2);
      head.appendChild(btn);
    }
  });
})();