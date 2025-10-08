(async function(){
  const resultsEl = document.getElementById('results');
  const pdfBtn = document.getElementById('pdfBtn');
  const emailBtn = document.getElementById('emailBtn');
  const emailForm = document.getElementById('emailForm');
  const cancelEmail = document.getElementById('cancelEmail');

  const selected = JSON.parse(localStorage.getItem('nova_traits')||'[]');
  if (!selected.length){
    window.location.href = 'traits.html';
    return;
  }

  // Load traits
  const traits = await fetch('assets/data/traits.json').then(r=>r.json());
  const traitById = Object.fromEntries(traits.map(t=>[t.id, t]));

  // Try to load full OOH/OES dataset first (assets/data/ooh.json).
  // Expected normalized shape per item:
  // { "title": string, "soc": string, "traits": [traitId], "salary": {"low": number, "high": number}, "summary": string }
  // If not present or fails, fall back to occupations.json (demo set).
  let occupations = [];
  async function tryLoadOOH(){
    try{
      const res = await fetch('assets/data/ooh.json', {cache:'no-store'});
      if (!res.ok) throw new Error('no ooh.json');
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error('bad ooh.json format');
      return data;
    }catch(e){
      return null;
    }
  }

  const ooh = await tryLoadOOH();
  if (ooh && Array.isArray(ooh) && ooh.length){
    occupations = ooh;
  }else{
    occupations = await fetch('assets/data/occupations.json').then(r=>r.json());
  }

  // Score
  const scored = occupations.map(o=>{
    const list = Array.isArray(o.traits) ? o.traits : [];
    const overlap = list.filter(t=> selected.includes(t)).length;
    const coverage = list.length ? overlap / list.length : 0;
    const score = overlap*2 + coverage;
    return {...o, score, overlap};
  }).sort((a,b)=> b.score - a.score).slice(0, 12);

  // Render
  resultsEl.setAttribute('aria-busy', 'false');
  scored.forEach(o=>{
    const names = (o.traits||[]).slice(0,8).map(id=>traitById[id]?.name||id).join(', ');
    const salary = o.salary ? `$${(o.salary.low||0).toLocaleString()}–$${(o.salary.high||0).toLocaleString()}` : '—';
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start">
        <div>
          <div style="font-weight:700;font-size:1.05rem">${o.title||'Occupation'}</div>
          <div class="muted" style="margin-top:4px">${o.soc ? 'SOC ' + o.soc : ''}</div>
        </div>
        <div class="muted">${salary}</div>
      </div>
      <div style="margin-top:10px">${o.summary||''}</div>
      <div class="muted" style="margin-top:10px"><strong>Matched traits:</strong> ${names}</div>
    `;
    resultsEl.appendChild(card);
  });

  // PDF
  pdfBtn.addEventListener('click', async ()=>{
    const doc = new window.jspdf.jsPDF({unit:'pt', format:'letter'});
    const margin = 40;
    let y = margin;

    doc.setFont('helvetica', 'bold'); doc.setFontSize(18);
    doc.text('NOVA — Your Career Matches', margin, y); y += 24;
    doc.setFont('helvetica','normal'); doc.setFontSize(11);
    doc.text('Based on your selected traits.', margin, y); y += 22;

    const names = selected.map(id=> traitById[id]?.name || id);
    doc.setFont('helvetica','bold'); doc.text('Your traits:', margin, y); y += 16;
    doc.setFont('helvetica','normal');
    const wrapTraits = doc.splitTextToSize(names.join(', '), 612 - margin*2);
    wrapTraits.forEach(line=>{ doc.text(line, margin, y); y += 14; });
    y += 6;

    doc.setFont('helvetica','bold'); doc.text('Top matches:', margin, y); y += 18;
    doc.setFont('helvetica','normal');
    scored.forEach(o=>{
      if (y > 760){ doc.addPage(); y = margin; }
      const title = `${o.title||'Occupation'} ${o.soc ? '('+o.soc+')' : ''}`;
      doc.text(title, margin, y); y += 14;
      if (o.summary){
        const txt = doc.splitTextToSize(o.summary, 612 - margin*2);
        txt.forEach(line=>{ doc.text(line, margin+12, y); y += 14; });
      }
      const sal = o.salary ? `$${(o.salary.low||0).toLocaleString()}–$${(o.salary.high||0).toLocaleString()}` : '—';
      doc.text(`Salary: ${sal}`, margin+12, y); y += 18;
    });

    doc.save('NOVA_Report.pdf');
  });

  // Email capture
  emailBtn.addEventListener('click', ()=>{
    emailForm.style.display = 'block';
  });
  cancelEmail.addEventListener('click', ()=>{
    emailForm.style.display = 'none';
  });
  emailForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    if (!email) return;
    localStorage.setItem('nova_email', email);
    alert('Saved! Your report was downloaded and your email is stored for follow-up.');
    emailForm.style.display = 'none';
  });
})();