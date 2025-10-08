// H94j — Traits gatekeeper & clean state
(function(){
  try {
    const stage = sessionStorage.getItem('nova_stage');
    const started = sessionStorage.getItem('nova_run_started') === '1';
    if (stage !== 'categories_done' || !started) {
      // hard stop: clean and route to Categories
      localStorage.removeItem('nova_selected_traits');
      localStorage.removeItem('nova_selected_categories');
      window.location.replace('categories.html');
      return;
    }
    console.log('[Nova H94j] Traits allowed — current session OK.');
    // render demo traits
    const traits = ['Analytical','Creative','Organized','Empathetic','Detail-Oriented','Curious','Resilient','Adaptable'];
    const grid = document.getElementById('traitsGrid');
    traits.forEach(t => {
      const el = document.createElement('div');
      el.className = 'pill';
      el.textContent = t;
      el.addEventListener('click', () => el.classList.toggle('selected'));
      grid.appendChild(el);
    });
    // safety: remove any stale "selected" classes on load (shouldn't exist now)
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.trait-card.selected,.pill.selected.stale').forEach(el => el.classList.remove('selected','stale'));
    });
  } catch(e){ console.error(e); }
})();