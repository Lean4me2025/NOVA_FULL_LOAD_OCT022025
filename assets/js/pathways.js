
(function(){
  window.addEventListener("nova:traitsCommitted", (ev) => {
    window.NOVA_LAST_SELECTION = ev.detail;
  });

  window.addEventListener("nova:viewGrowthPathways", (ev) => {
    const sel = ev.detail && Object.keys(ev.detail).length ? ev.detail : (window.NOVA_LAST_SELECTION || {});
    const { category, traits } = sel;

    document.querySelectorAll("#categories-section, #traits-section, #results-section")
      .forEach(s => s && (s.style.display = "none"));
    const ps = document.getElementById("pathways-section");
    if (ps) ps.style.display = "block";

    document.getElementById("pathways-category").textContent = category || "Your Pathways";
    document.getElementById("pathways-summary").textContent =
      "Based on your traits, here are three ways you can grow in this field.";

    const paths = getPathCards(category);
    renderPathCards(paths);
  });

  function getPathCards(category){
    if(category && category.includes("Society")) {
      return [
        {
          title: "Grow Where You Are",
          text: "Advance within your current environment — pursue supervisor or lead certifications in safety, logistics, or hospitality."
        },
        {
          title: "Shift Upward or Sideways",
          text: "Move toward security management, operations coordination, or transportation dispatch roles that use your reliability and awareness."
        },
        {
          title: "Future Vision",
          text: "Build toward a career in facility management, logistics planning, or public safety leadership. These roles scale your service mindset into strategic impact."
        }
      ];
    }
    return [
      { title:"Grow Where You Are", text:"Continue developing within your category." },
      { title:"Shift Upward or Sideways", text:"Explore related roles that need your core traits." },
      { title:"Future Vision", text:"Consider advanced positions that align with your growth pattern." }
    ];
  }

  function renderPathCards(paths){
    const mount = document.getElementById("pathways-cards");
    mount.innerHTML = `<div class="pathways-grid">
      ${paths.map(p => `
        <div class="path-card">
          <h3>${p.title}</h3>
          <p>${p.text}</p>
        </div>`).join("")}
    </div>`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const back = document.getElementById("pathways-back");
    if (back) back.onclick = () => {
      document.getElementById("pathways-section").style.display = "none";
      document.getElementById("results-section").style.display = "block";
    };
    const next = document.getElementById("pathways-next");
    if (next) next.onclick = () => {
      // open navi bridge
      window.location.href = "/navi_bridge/index.html";
    };
  });
})();
