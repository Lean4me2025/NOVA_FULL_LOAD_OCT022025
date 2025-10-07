
(function(){
  const mount = document.getElementById("categories-root") || document.querySelector("[data-nova='categories-root']");
  const diag  = document.getElementById("categories-diagnostics");
  if (!mount) return;

  mount.innerHTML = `<div class="cat-skeleton">
      <div class="pulse"></div><div class="pulse"></div><div class="pulse"></div><div class="pulse"></div>
    </div>`;

  const log = (msg) => { console.log(msg); if (diag) diag.textContent = msg; };

  window.NovaData.loadNovaSources().then(sources => {
    const categories = window.NovaData.deriveCategories(sources);

    const errs = []
      .concat(sources.traits.errors || [])
      .concat(sources.matrix.errors || []);
    log([
      `Loaded categories from: ${categories.source}`,
      sources.traits?.source ? `traits source: ${sources.traits.source}` : "traits source: not found",
      sources.matrix?.source ? `matrix source: ${sources.matrix.source}` : "matrix source: not found",
      errs.length ? `errors: ${errs.join(" | ")}` : "no loader errors"
    ].join(" • "));

    if (!categories.list.length) {
      mount.innerHTML = `<div class="cat-empty"><h3>No categories found</h3>
        <p>Ensure <code>category_matrix.json</code> or <code>traits_with_categories.json</code> exists in <code>/assets/data</code>.</p></div>`;
      return;
    }
    mount.innerHTML = renderGrid(categories.list);
  }).catch(err => {
    console.error(err);
    mount.innerHTML = `<div class="cat-error"><h3>Unable to load categories</h3><p>${err.message}</p></div>`;
  });

  function renderGrid(list){
    const items = list.sort((a,b)=>a.localeCompare(b)).map(c => `
      <div class="cat-card-wrapper">
        <button class="cat-card" data-cat="${escapeHtml(c)}">
          <span class="cat-name">${escapeHtml(c)}</span>
        </button>
        <div class="cat-actions">
          <button class="view-traits" data-cat="${escapeHtml(c)}">View Traits</button>
        </div>
      </div>`).join("");
    return `<div class="cat-grid">${items}</div>`;
  }

  mount.addEventListener("click", (e) => {
    const traitBtn = e.target.closest(".view-traits");
    const card = e.target.closest(".cat-card");
    if (traitBtn) {
      const name = traitBtn.getAttribute("data-cat");
      // swap panels
      const categoriesSection = document.querySelector("#categories-section");
      const traitsSection = document.querySelector("#traits-section");
      if (categoriesSection && traitsSection) {
        categoriesSection.style.display = "none";
        traitsSection.style.display = "block";
      }
      window.dispatchEvent(new CustomEvent("nova:categorySelected", { detail: { category: name }}));
      return;
    }
    if (card) card.classList.toggle("selected");
  });

  function escapeHtml(s){ return (s||"").toString().replace(/[&<>"']/g, m => ({ "&":"&amp;","<":"&lt;",">":"&gt;",""":"&quot;","'":"&#39;" }[m])); }
})();
