
(function(){
  const STATE = { allTraits: [], currentCategory: null, selected: new Set() };
  const q = (sel) => document.querySelector(sel);

  async function loadJSON(url){
    const res = await fetch(url, { cache: "no-store" });
    if(!res.ok) throw new Error(`HTTP ${res.status} @ ${url}`);
    return res.json();
  }
  async function loadTraits(){
    const candidates = [
      "/assets/data/traits_with_categories.json",
      "/data/traits_with_categories.json",
      "/traits_with_categories.json",
      "./traits_with_categories.json",
      "assets/data/traits_with_categories.json"
    ];
    const errors=[];
    for(const url of candidates){
      try { return { data: await loadJSON(url), source:url }; }
      catch(e){ errors.push(`${url}: ${e.message}`); }
    }
    return { data:null, source:null, errors };
  }

  function normalizeTraitArray(raw){
    if(Array.isArray(raw)) return raw;
    if(raw && Array.isArray(raw.traits)) return raw.traits;
    if(raw && Array.isArray(raw.items)) return raw.items;
    return [];
  }

  function renderTraits(){
    const mount = q("#traits-root");
    const hdr = q("#traits-current");
    const diag = q("#traits-diagnostics");
    if(!mount) return;

    const list = STATE.allTraits.filter(t => {
      if(!STATE.currentCategory) return true;
      return (t.category||"").toLowerCase() === (STATE.currentCategory||"").toLowerCase();
    });

    hdr && (hdr.textContent = STATE.currentCategory ? STATE.currentCategory : "All Categories");

    if(diag){
      const total = STATE.allTraits.length;
      const shown = list.length;
      diag.textContent = `Loaded ${total} traits • Showing ${shown} for this category`;
    }

    if(!list.length){
      mount.innerHTML = `<div class="cat-empty"><h3>No traits found for this category.</h3></div>`;
      toggleContinue(false);
      return;
    }

    mount.innerHTML = `<div class="traits-grid">
      ${list.map(t => `
        <button class="trait-chip" data-id="${escapeHtml(t.id||t.name)}" aria-pressed="false">
          <div>
            <div class="trait-name">${escapeHtml(t.name)}</div>
            <div class="trait-desc">${escapeHtml(t.description||"")}</div>
          </div>
        </button>`).join("")}
    </div>`;

    mount.querySelectorAll(".trait-chip").forEach(chip => {
      const id = chip.getAttribute("data-id");
      if(STATE.selected.has(id)) chip.classList.add("selected");
      chip.addEventListener("click", () => {
        chip.classList.toggle("selected");
        if(chip.classList.contains("selected")) STATE.selected.add(id);
        else STATE.selected.delete(id);
        toggleContinue(STATE.selected.size > 0);
        window.dispatchEvent(new CustomEvent("nova:traitToggled", {
          detail: { id, selected: chip.classList.contains("selected") }
        }));
      });
    });

    toggleContinue(STATE.selected.size > 0);
  }

  function toggleContinue(enabled){
    const btn = q("#traits-continue");
    if(!btn) return;
    btn.disabled = !enabled;
  }
  function escapeHtml(s){ return (s||"").toString().replace(/[&<>"']/g, m => ({ "&":"&amp;","<":"&lt;",">":"&gt;",""":"&quot;","'":"&#39;" }[m])); }

  async function init(){
    const mount = q("#traits-root");
    if(!mount) return;
    mount.innerHTML = `<div class="cat-skeleton">
      <div class="pulse"></div><div class="pulse"></div><div class="pulse"></div><div class="pulse"></div>
    </div>`;

    const { data, source, errors } = await loadTraits();
    if(!data){
      mount.innerHTML = `<div class="cat-error"><h3>Unable to load traits.</h3><p>${(errors||[]).join(" • ")}</p></div>`;
      return;
    }
    const arr = normalizeTraitArray(data);
    STATE.allTraits = arr;

    window.addEventListener("nova:categorySelected", (ev) => {
      STATE.currentCategory = ev.detail.category;
      STATE.selected.clear();
      renderTraits();
    });

    renderTraits();

    const btn = q("#traits-continue");
    if(btn){
      btn.addEventListener("click", () => {
        const chosen = Array.from(STATE.selected);
        window.dispatchEvent(new CustomEvent("nova:traitsCommitted", {
          detail: { category: STATE.currentCategory, traits: chosen }
        }));
      });
    }

    const diag = q("#traits-diagnostics");
    if(diag) diag.textContent = `traits source: ${source}`;

    // Back button
    const backBtn = q("#traits-back");
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        const traitsSection = document.querySelector("#traits-section");
        const categoriesSection = document.querySelector("#categories-section");
        if (traitsSection && categoriesSection) {
          traitsSection.style.display = "none";
          categoriesSection.style.display = "block";
        }
        window.dispatchEvent(new CustomEvent("nova:navigateBackToCategories"));
      });
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
