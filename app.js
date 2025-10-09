
/* NOVA 8.5 Final – white background SPA */
let CATEGORIES = [];
let TRAITS = [];
let OOH = {};
let selectedCategories = new Set();
let selectedTraits = new Set();
let computedRoles = [];

const $ = (q) => document.querySelector(q);
const $$ = (q) => Array.from(document.querySelectorAll(q));

function show(id) {
  $$('.view').forEach(v => v.classList.remove('active'));
  $('#'+id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function loadData() {
  const [cats, traits, ooh] = await Promise.all([
    fetch('data/category_matrix.json').then(r=>r.json()),
    fetch('data/traits_with_categories.json').then(r=>r.json()),
    fetch('data/ooh.json').then(r=>r.json()),
  ]);
  CATEGORIES = cats.categories;
  TRAITS = traits.traits;
  OOH = ooh;
}

function renderCategories() {
  const grid = $('#categoryGrid');
  grid.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const div = document.createElement('div');
    div.className = 'tile';
    div.textContent = cat.name;
    div.onclick = () => {
      if (selectedCategories.has(cat.id)) {
        selectedCategories.delete(cat.id);
        div.style.borderColor = '#e5e7eb';
      } else {
        selectedCategories.add(cat.id);
        div.style.borderColor = '#10b981';
      }
    };
    grid.appendChild(div);
  });
}

function renderTraits() {
  const grid = $('#traitGrid');
  grid.innerHTML = '';
  let list = TRAITS;
  if (selectedCategories.size) {
    list = list.filter(t => selectedCategories.has(t.categoryId));
  }
  list.forEach(tr => {
    const div = document.createElement('div');
    div.className = 'trait';
    div.textContent = tr.name;
    div.onclick = () => {
      if (selectedTraits.has(tr.id)) {
        selectedTraits.delete(tr.id);
        div.classList.remove('selected');
      } else {
        selectedTraits.add(tr.id);
        div.classList.add('selected');
      }
    };
    grid.appendChild(div);
  });
}

function scoreRoles() {
  const roles = OOH.roles || [];
  const res = roles.map(role => {
    const needs = new Set(role.key_traits || []);
    const have = selectedTraits;
    const hit = [...needs].filter(tid => have.has(tid)).length;
    const pct = needs.size ? (hit / needs.size) : 0;
    let tier = 'silver';
    if (pct >= 0.8) tier = 'gold';
    else if (pct >= 0.5) tier = 'green';
    return { ...role, score: pct, tier };
  }).sort((a,b) => b.score - a.score);
  return res.slice(0, 6);
}

function tierBadge(tier) {
  const map = { gold: 'Excellent fit', green: 'Better fit', silver: 'Good fit' };
  return `<span class="badge ${tier}">${map[tier]}</span>`;
}

function renderResults() {
  const grid = $('#roleGrid');
  grid.innerHTML = '';
  computedRoles.forEach(r => {
    const div = document.createElement('div');
    div.className = 'role-card';
    div.innerHTML = `
      ${tierBadge(r.tier)}
      <h4>${r.title}</h4>
      <p class="muted">${r.summary || ''}</p>
    `;
    grid.appendChild(div);
  });
}

function renderReflection() {
  const el = $('#reflectionContent');
  if (!computedRoles.length) return;
  const top = computedRoles[0];
  el.innerHTML = `
    <div class="card">
      <h3>${top.title}</h3>
      <p>${top.details || ''}</p>
      <p><strong>Median Pay:</strong> ${top.median_pay || '—'}<br/>
         <strong>Outlook:</strong> ${top.outlook || '—'}</p>
      <p class="muted">Understanding your life inputs and how they align with opportunity.</p>
    </div>
  `;
}

function saveJourney() {
  const email = $('#saveEmail').value.trim().toLowerCase();
  const pin = $('#savePin').value.trim();
  if (!email || !pin) {
    $('#saveMsg').textContent = 'Enter email and PIN to save.';
    return;
  }
  const key = `nova:${email}:${pin}`;
  const payload = {
    ts: Date.now(),
    selectedCategories: [...selectedCategories],
    selectedTraits: [...selectedTraits],
    roles: computedRoles
  };
  localStorage.setItem(key, JSON.stringify(payload));
  $('#saveMsg').textContent = 'Saved. Use the header PIN box to return later.';
}

function tryReturn() {
  const email = $('#returnEmail').value.trim().toLowerCase();
  const pin = $('#returnPin').value.trim();
  if (!email || !pin) return;
  const key = `nova:${email}:${pin}`;
  const raw = localStorage.getItem(key);
  if (!raw) { alert('No saved journey found for those credentials.'); return; }
  try {
    const data = JSON.parse(raw);
    selectedCategories = new Set(data.selectedCategories || []);
    selectedTraits = new Set(data.selectedTraits || []);
    computedRoles = data.roles || [];
    renderCategories();
    renderTraits();
    renderResults();
    renderReflection();
    show('reflection');
  } catch(e) {
    alert('Could not load saved journey.');
  }
}

function autoplayAudio() {
  const audio = $('#welcomeAudio');
  if (!audio) return;
  const play = () => audio.play().catch(()=>{});
  // try autoplay, else show hint and rely on button
  play();
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadData();
  renderCategories();

  $('#playAudio').addEventListener('click', () => {
    $('#welcomeAudio').play().catch(()=>{});
  });

  $('#startBtn').addEventListener('click', () => {
    autoplayAudio();
    show('categories');
  });

  $('#toTraits').addEventListener('click', () => {
    renderTraits();
    show('traits');
  });

  $('#toResults').addEventListener('click', () => {
    show('analyzing');
    setTimeout(() => {
      computedRoles = scoreRoles();
      renderResults();
      show('results');
    }, 3200);
  });

  $('#toReflection').addEventListener('click', () => {
    renderReflection();
    show('reflection');
  });

  $('#saveJourney').addEventListener('click', saveJourney);
  $('#returnBtn').addEventListener('click', tryReturn);
});
