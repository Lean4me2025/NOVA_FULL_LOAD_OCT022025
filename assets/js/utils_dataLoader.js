
// Lightweight JSON loader with retries + timeout + path fallbacks
window.NovaData = (() => {
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  async function fetchJSON(url, { timeout = 8000 } = {}) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), timeout);
    try {
      const res = await fetch(url, { signal: ctrl.signal, cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status} @ ${url}`);
      return await res.json();
    } finally { clearTimeout(t); }
  }

  async function tryPaths(candidates) {
    const errors = [];
    for (const url of candidates) {
      try { return { data: await fetchJSON(url), source: url }; }
      catch (e) { errors.push(`${url}: ${e.message}`); }
    }
    return { data: null, errors };
  }

  async function loadNovaSources() {
    const tries = (name) => ([
      `/assets/data/${name}`,
      `/data/${name}`,
      `/${name}`,
      `./${name}`,
      `assets/data/${name}`,
    ]);
    const traitsP = tryPaths(tries("traits_with_categories.json"));
    const matrixP = tryPaths(tries("category_matrix.json"));
    const traits = await traitsP;
    const matrix = await matrixP;
    return { traits, matrix };
  }

  function deriveCategories({ traits, matrix }) {
    if (matrix?.data?.categories && Array.isArray(matrix.data.categories) && matrix.data.categories.length) {
      return { list: dedupe(matrix.data.categories), source: matrix.source || "category_matrix.json" };
    }
    if (matrix?.data && typeof matrix.data === "object" && !Array.isArray(matrix.data)) {
      const keys = Object.keys(matrix.data).filter(k => Array.isArray(matrix.data[k]));
      if (keys.length) return { list: dedupe(keys), source: matrix.source || "category_matrix.json(keys)" };
    }
    if (traits?.data) {
      const arr = Array.isArray(traits.data) ? traits.data : (traits.data.traits || traits.data.items || []);
      if (Array.isArray(arr) && arr.length) {
        const cats = arr.map(t => (t.category || t.cat || t.group || "").toString().trim()).filter(Boolean);
        if (cats.length) return { list: dedupe(cats), source: traits.source || "traits_with_categories.json" };
      }
    }
    return { list: [], source: "none" };
  }

  function dedupe(arr) {
    return [...new Map(arr.map(v => [normalize(v), pretty(v)])).values()].filter(Boolean);
    function normalize(s){ return (s||"").toString().trim().toLowerCase(); }
    function pretty(s){ const x=(s||"").toString().trim(); return x.replace(/_/g," ").replace(/\s+/g," ").replace(/\b\w/g,m=>m.toUpperCase()); }
  }

  return { loadNovaSources, deriveCategories };
})();
