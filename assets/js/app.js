
/**
 * NOVA 8.5A Light — SPA flow controller
 * Sections: welcome -> categories -> traits -> roles -> reflection
 * Data files loaded if present; otherwise graceful placeholders.
 */

const S = {
  sections: ['welcome','categories','traits','roles','reflection'],
  data: { categories: [], traits: [], roles: [] },
  state: {
    category: null,
    selectedTraits: new Set(),
    selectedRole: null,
    email: '', pin: ''
  }
};

function show(id) {
  for (const s of S.sections) {
    const el = document.getElementById(s);
    if (!el) continue;
    el.classList.toggle('visible', s === id);
  }
}

async function loadJSON(path) {
  try {
    const res = await fetch(path, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) { return null; }
}

function byId(id){ return document.getElementById(id); }

function renderCategories() {
  const grid = byId('categoryGrid');
  grid.innerHTML = '';
  const list = S.data.categories?.length ? S.data.categories :
    ['General Engineering','General Social Work','Business & Ops','Creative','Healthcare','Education','Technology','Public Service','Trades','Finance','Sales','Operations'];

  list.forEach(cat => {
    const div = document.createElement('div');
    div.className = 'cat-item' + (S.state.category === cat ? ' active' : '');
    div.textContent = cat;
    div.onclick = () => {
      S.state.category = cat;
      renderCategories();
      byId('toTraits').disabled = false;
    };
    grid.appendChild(div);
  });
}

function renderTraits() {
  const grid = byId('traitsGrid');
  grid.innerHTML = '';

  const list = S.data.traits?.length ? S.data.traits.filter(t => {
    if (!S.state.category) return true;
    return !t.category || t.category === S.state.category;
  }).slice(0, 50) : Array.from({length:50}, (_,i)=>({id:'t'+(i+1), name:'Trait '+(i+1)}));

  list.forEach(tr => {
    const div = document.createElement('div');
    const selected = S.state.selectedTraits.has(tr.id || tr.name);
    div.className = 'trait-item' + (selected ? ' selected' : '');
    div.textContent = tr.name || tr.id;
    div.onclick = () => {
      const key = tr.id || tr.name;
      if (S.state.selectedTraits.has(key)) S.state.selectedTraits.delete(key);
      else S.state.selectedTraits.add(key);
      renderTraits();
    };
    grid.appendChild(div);
  });
}

function scoreRoles() {
  // If we have roles with traitWeights, compute scores. Else make placeholders.
  if (S.data.roles?.length) {
    const sel = S.state.selectedTraits;
    return S.data.roles.map(r => {
      let score = 0;
      if (r.traitWeights) {
        for (const [trait, w] of Object.entries(r.traitWeights)) {
          if (sel.has(trait)) score += w;
        }
      }
      return { role: r, score };
    }).sort((a,b)=>b.score-a.score);
  } else {
    // Placeholder roles
    const roles = [
      {title: 'Project Manager', medianPay: '$98,000', outlook: 'Faster than average', id:'pm'},
      {title: 'Data Analyst', medianPay: '$82,000', outlook: 'Much faster than average', id:'da'},
      {title: 'Operations Coordinator', medianPay: '$68,000', outlook: 'Average', id:'oc'}
    ];
    return roles.map((r,i)=>({role:r, score: 100 - i*10}));
  }
}

function renderRoles() {
  const cards = byId('roleCards');
  cards.innerHTML = '';
  const scored = scoreRoles();
  const top = scored.slice(0, 3); // show top 3
  top.forEach((it, idx) => {
    const div = document.createElement('div');
    const cls = idx===0 ? 'excellent' : idx===1 ? 'better' : 'good';
    const label = idx===0 ? 'Excellent fit' : idx===1 ? 'Better fit' : 'Good fit';
    div.className = 'role-card '+cls;
    div.innerHTML = `
      <div class="bar"></div>
      <div class="body">
        <div class="label">${label}</div>
        <div class="title">${it.role.title}</div>
        <div class="meta">${it.role.medianPay || ''} • ${it.role.outlook || ''}</div>
        <div class="meta">Selected traits considered: ${S.state.selectedTraits.size}</div>
        <div><button class="btn select" data-id="${it.role.id || it.role.title}">Choose this role</button></div>
      </div>
    `;
    cards.appendChild(div);
  });

  cards.querySelectorAll('button.select').forEach(btn => {
    btn.onclick = () => {
      S.state.selectedRole = btn.dataset.id;
      byId('toReflection').disabled = false;
    };
  });
}

function renderReflection() {
  const el = byId('reflectionBody');
  const chosen = S.state.selectedRole;
  let roleData = null;

  if (S.data.roles?.length) {
    roleData = S.data.roles.find(r => (r.id || r.title) === chosen);
  }
  if (!roleData) {
    el.innerHTML = `
      <p><strong>${chosen || 'Selected role'}</strong></p>
      <p>What it involves: Overview of day-to-day responsibilities and impact.</p>
      <p>Outlook & Pay: See the Occupational Outlook Handbook for detailed projections.</p>
      <p>Traits that fit: ${Array.from(S.state.selectedTraits).slice(0,8).join(', ') || 'Based on your selections'}</p>
    `;
  } else {
    el.innerHTML = `
      <p><strong>${roleData.title}</strong></p>
      <p>${roleData.description || 'Role details coming from OOH data.'}</p>
      <p><em>${roleData.medianPay || ''} • ${roleData.outlook || ''}</em></p>
      <p>Traits that fit: ${
        roleData.topTraits?.length ? roleData.topTraits.join(', ') :
        Array.from(S.state.selectedTraits).slice(0,8).join(', ')
      }</p>
      <p>Sources: Occupational Outlook Handbook.</p>
    `;
  }
}

// Navigation
document.addEventListener('DOMContentLoaded', async () => {
  // Load data if present
  S.data.traits = (await loadJSON('assets/data/traits_with_categories.json')) || [];
  const catData = (await loadJSON('assets/data/category_matrix.json')) || [];
  S.data.categories = Array.isArray(catData) ? catData : (catData.categories || []);
  S.data.roles = (await loadJSON('assets/data/ooh.json'))?.roles || [];

  // Wire welcome
  byId('continueBtn').onclick = () => {
    S.state.email = byId('email').value.trim();
    S.state.pin = byId('pin').value.trim();
    show('categories');
    renderCategories();
  };

  // Categories actions
  byId('backToWelcome').onclick = () => show('welcome');
  byId('toTraits').onclick = () => {
    show('traits');
    renderTraits();
  };

  // Traits actions
  byId('backToCategories').onclick = () => {
    show('categories');
    renderCategories();
  };
  byId('resetTraits').onclick = () => {
    S.state.selectedTraits.clear();
    renderTraits();
  };
  byId('revealJobs').onclick = () => {
    show('roles');
    renderRoles();
  };

  // Roles actions
  byId('backToTraits').onclick = () => {
    show('traits');
    renderTraits();
  };
  byId('toReflection').onclick = () => {
    show('reflection');
    renderReflection();
  };

  // Reflection actions
  byId('backToRoles').onclick = () => show('roles');
  byId('finish').onclick = () => {
    // reset only navigation, keep email/pin
    S.state.category = null;
    S.state.selectedTraits.clear();
    S.state.selectedRole = null;
    byId('toTraits').disabled = true;
    show('welcome');
  };
});
