// H94j — Categories page: set session stage and basic interactions
(function(){
  // simple demo categories
  const cats = ['People', 'Data', 'Design', 'Operations', 'Teaching', 'Logistics', 'Sales', 'Hands-On'];
  const grid = document.getElementById('catGrid');
  const next = document.getElementById('categoriesNextBtn');
  const selected = new Set();

  cats.forEach(name => {
    const el = document.createElement('div');
    el.className = 'pill';
    el.textContent = name;
    el.addEventListener('click', () => {
      el.classList.toggle('selected');
      if (el.classList.contains('selected')) selected.add(name);
      else selected.delete(name);
      next.disabled = selected.size === 0;
    });
    grid.appendChild(el);
  });

  next.addEventListener('click', () => {
    try {
      sessionStorage.setItem('nova_stage','categories_done');
      sessionStorage.setItem('nova_run_started','1');
      // DO NOT persist traits here; only categories if needed
      localStorage.removeItem('nova_selected_traits'); // ensure clean handoff
      location.href = 'traits.html';
    } catch(e) {
      location.href = 'traits.html';
    }
  });
})();