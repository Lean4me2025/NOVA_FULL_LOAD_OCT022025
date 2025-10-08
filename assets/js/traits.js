(function(){
  const stage = sessionStorage.getItem('nova_stage');
  const started = sessionStorage.getItem('nova_run_started') === '1';
  if(stage!=='categories_done' || !started){
    localStorage.removeItem('nova_selected_traits');
    localStorage.removeItem('nova_selected_categories');
    window.location.replace('categories.html');
    return;
  }
  const traits = ['Analytical','Creative','Organized','Empathetic','Detail-Oriented','Curious','Resilient','Adaptable','Problem-Solving','Presentation','Systems Thinking','Research','Logical','Team-Oriented','Decision-Making'];
  const grid = document.getElementById('traitsGrid');
  const picked = new Set();
  traits.forEach(t => {
    const el = document.createElement('div');
    el.className = 'pill';
    el.textContent = t;
    el.addEventListener('click', () => {
      if (el.classList.toggle('selected')) picked.add(t);
      else picked.delete(t);
    });
    grid.appendChild(el);
  });
  document.getElementById('toReflection').addEventListener('click', () => {
    try { localStorage.setItem('nova_selected_traits', JSON.stringify(Array.from(picked))); }catch(e){}
  });
})();