(function(){
  const cats = ['Technology','Business','Finance & Accounting','Creative','Operations','Sales & Customer','Education','Hands-On'];
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
      next.disabled = selected.size < 2;
    });
    grid.appendChild(el);
  });

  next.addEventListener('click', () => {
    try {
      sessionStorage.setItem('nova_stage','categories_done');
      sessionStorage.setItem('nova_run_started','1');
      localStorage.setItem('nova_selected_categories', JSON.stringify(Array.from(selected)));
      location.href = 'traits.html';
    } catch(e) { location.href = 'traits.html'; }
  });
})();