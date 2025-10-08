(async function(){
  const grid = document.getElementById('traits');
  const btn = document.getElementById('continue');
  const res = await fetch('assets/data/traits.json');
  const traits = await res.json();
  grid.setAttribute('aria-busy', 'false');

  traits.forEach((t)=>{
    const card = document.createElement('label');
    card.className = 'card checkbox';
    card.innerHTML = `<input type="checkbox" value="${t.id}"><div><div style="font-weight:600">${t.name}</div><div class="muted" style="margin-top:6px">${t.desc||''}</div></div>`;
    grid.appendChild(card);
  });

  btn.addEventListener('click', ()=>{
    const selected = Array.from(grid.querySelectorAll('input:checked')).map(i=>i.value);
    if (selected.length === 0){
      alert('Choose at least a few traits so we can tailor matches.');
      return;
    }
    localStorage.setItem('nova_traits', JSON.stringify(selected));
    window.location.href = 'results.html';
  });
})();