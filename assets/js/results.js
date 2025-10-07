
// Results / Reflection logic
(function(){
  function idToLabel(id){
    return (id||'').replace(/^swsp_/, '').replace(/_/g,' ').replace(/\b\w/g,m=>m.toUpperCase());
  }
  window.addEventListener("nova:traitsCommitted", (ev) => {
    const { category, traits } = ev.detail;
    document.querySelectorAll("#categories-section, #traits-section")
      .forEach(s => s && (s.style.display = "none"));
    const rs = document.getElementById("results-section");
    if (rs) rs.style.display = "block";

    document.getElementById("results-category").textContent = category || "Your Category";

    const list = (traits||[]).map(id => `<span class="trait-chip small">${idToLabel(id)}</span>`).join(" ");
    document.getElementById("results-traits").innerHTML = `<div class="traits-summary">${list}</div>`;

    const theme = (category||"").includes("Society")
      ? `<p>You bring stability, care, and motion to daily life. These traits show a heart that serves and protects, while quietly building mastery. Nova sees leadership in your reliability and growth in your patience.</p>`
      : `<p>Your selected traits reveal a strong pattern of purpose and potential. Nova will guide you into growth pathways that fit those strengths.</p>`;

    document.getElementById("results-narrative").innerHTML = theme;
  });

  document.addEventListener("DOMContentLoaded", () => {
    const back = document.getElementById("results-back");
    if (back) back.onclick = () => {
      document.getElementById("results-section").style.display = "none";
      document.getElementById("traits-section").style.display = "block";
    };
    const next = document.getElementById("results-next");
    if (next) next.onclick = () => {
      // pass along last selection via global
      window.dispatchEvent(new CustomEvent("nova:viewGrowthPathways", {
        detail: window.NOVA_LAST_SELECTION || {}
      }));
    };
  });
})();
