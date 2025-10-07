
(function(){
  function readLastSelection(){
    try {
      const raw = localStorage.getItem("NOVA_LAST_SELECTION");
      return raw ? JSON.parse(raw) : null;
    } catch(e){ return null; }
  }
  // If arriving from Nova, Nova could set localStorage before redirect. For now we just show placeholder.
  const box = document.getElementById("nova-summary");
  const sel = readLastSelection();
  if (box){
    if (sel && sel.category){
      box.innerHTML = `<p><strong>Category:</strong> ${sel.category}</p>
      <p><strong>Traits:</strong> ${(sel.traits||[]).join(", ")}</p>`;
    } else {
      box.textContent = "Nova summary will appear here when redirected with data.";
    }
  }
})();
