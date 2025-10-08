// assets/js/traits.js — v9.4i Drop-in Gatekeeper
// Purpose: stop Welcome → Traits skipping by enforcing session guard and clearing stale state
(function(){
  try {
    // 1) Require that this session actually started from Welcome and completed Categories
    const stage   = sessionStorage.getItem('nova_stage');
    const started = sessionStorage.getItem('nova_run_started') === '1';

    if (stage !== 'categories_done' || !started) {
      console.warn('[Nova] Traits blocked: stage=', stage, 'started=', started);
      // Clear any stale persisted picks so user cannot bypass Categories
      localStorage.removeItem('nova_selected_traits');
      localStorage.removeItem('nova_selected_categories');
      // Send user to Categories first
      window.location.replace('categories.html');
      return; // stop loading this script further
    }

    console.log('%c[Nova] Traits allowed — entering with clean session.', 'color:green;font-weight:bold');

    // 2) Safety: if any UI has preselected classes (from cached DOM), strip them on load
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.trait-card.selected').forEach(el => el.classList.remove('selected'));
    });

  } catch (e) {
    console.error('[Nova] traits.js gate error:', e);
  }
})(); 

/* ------------------------------------------------------------------
   Your existing traits logic can remain below this line unchanged.
   This file acts as a drop-in replacement; keep the same path/name.
-------------------------------------------------------------------*/