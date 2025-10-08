// traits.js — NOVA v9.4f PATCH
/* NOVA v9.4f PATCH START */
(async function initTraits() {
  const grid = document.querySelector('.traits-grid');
  if (!grid) return;

  const selectedCategories = JSON.parse(localStorage.getItem('nova_selected_categories') || '[]');

  // helper to fetch JSON safely
  async function loadJSON(path) {
    try {
      const res = await fetch(path, { cache: 'no-store' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return await res.json();
    } catch (e) {
      console.error('Failed to load', path, e);
      return null;
    }
  }

  const traitsData = await loadJSON('/data/traits_with_categories.json');
  if (!Array.isArray(traitsData) || traitsData.length === 0) {
    grid.innerHTML = '<p style="color:#fff;opacity:.8">No traits available. Please verify traits_with_categories.json.</p>';
    return;
  }

  // Filter by selected categories if present
  const filtered = Array.isArray(selectedCategories) && selectedCategories.length > 0
    ? traitsData.filter(t => selectedCategories.includes(String(t.category || t.Category || '').trim()))
    : traitsData;

  // Render
  const frag = document.createDocumentFragment();
  filtered.forEach(t => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'trait-card';
    card.dataset.traitId = t.id || t.name;
    card.textContent = t.name || t.trait || 'Trait';

    card.addEventListener('click', () => {
      card.classList.toggle('selected');
      persistSelection();
    });

    frag.appendChild(card);
  });
  grid.innerHTML = '';
  grid.appendChild(frag);

  function persistSelection() {
    const selected = Array.from(grid.querySelectorAll('.trait-card.selected'))
      .map(el => el.dataset.traitId);
    localStorage.setItem('nova_selected_traits', JSON.stringify(selected));
  }
})();
/* NOVA v9.4f PATCH END */
