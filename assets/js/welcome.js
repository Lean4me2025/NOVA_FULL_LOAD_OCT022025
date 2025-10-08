// assets/js/welcome.js — H94i integrity + routing (drop-in replacement)
// This file is safe to upload without editing HTML if your welcome page already references assets/js/welcome.js

(function(){
  const VERSION = 'H94i';
  try {
    console.log(`Nova build: ${VERSION} — welcome.js loaded`);

    const startBtn = document.getElementById('startJourneyBtn');
    if (!startBtn) {
      console.warn('Start button not found on Welcome page.');
      return;
    }

    // Force correct routing to Categories
    const targetHref = 'categories.html';
    startBtn.setAttribute('href', targetHref);

    // Integrity logs
    const href = startBtn.getAttribute('href') || '';
    if (href.includes('categories.html')) {
      console.log('%c✅ Welcome is correct (Start -> categories.html)', 'color:green; font-weight:bold;');
    } else {
      console.error('%c⚠️ Welcome is outdated (Start does not point to categories.html)', 'color:red; font-weight:bold;');
      try { alert('This Welcome page appears cached. Please redeploy or hard refresh.'); } catch(e) {}
    }

    // Clean slate on click so Categories never gets skipped by stale state
    startBtn.addEventListener('click', () => {
      try {
        sessionStorage.clear();
        localStorage.removeItem('nova_selected_traits');
        localStorage.removeItem('nova_selected_categories');
        sessionStorage.setItem('nova_is_fresh', '1');
      } catch (e) {}
    });

  } catch (e) {
    console.error('welcome.js integrity script error:', e);
  }
})();