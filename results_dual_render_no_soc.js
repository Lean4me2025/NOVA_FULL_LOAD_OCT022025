
(function(){
  function h(tag, cls, html){ var e=document.createElement(tag); if(cls) e.className=cls; if(html!==undefined) e.innerHTML=html; return e; }
  function fmtMoney(n){ try{ return "$"+Number(n).toLocaleString(); }catch(e){ return "$"+n; } }

  async function run(){
    var rolesMap = window.NOVA_ROLES||{};
    var catsMap = window.NOVA_CATEGORIES||{};
    var main = document.querySelector('main') || document.body;

    var selected = [];
    try{ selected = JSON.parse(localStorage.getItem('nova_traits')||'[]'); }catch(e){}

    var traitList = [];
    try{ traitList = await (await fetch('assets/data/traits.json')).json(); }catch(e){}
    var idToName = {}; traitList.forEach(function(t){ idToName[t.id]=(t.name||'').toLowerCase(); });

    var scores = {};
    Object.keys(catsMap).forEach(function(cat){
      var tmap = catsMap[cat].traits||{};
      Object.keys(tmap).forEach(function(trName){
        var hit = selected.find(function(id){ return idToName[id] === (trName||'').toLowerCase(); });
        if (hit){
          (tmap[trName].roles||[]).forEach(function(r){
            scores[r]=(scores[r]||0)+1;
          });
        }
      });
    });

    var bestRole = Object.keys(scores).sort(function(a,b){ return scores[b]-scores[a]; })[0] || "The Helper";
    var data = rolesMap[bestRole] || null;
    window.currentRoleLabel = bestRole;

    var wrap = h('section','card');
    // Result
    var resultSec = h('div', null);
    resultSec.append(h('h2', null, 'Your Result'));
    resultSec.append(h('h3','role', bestRole));
    wrap.append(resultSec);

    // Reflection
    var reflSec = h('div', null);
    reflSec.append(h('h2', null, 'Reflection (Looking Forward)'));
    if (data && data.looking_forward){
      reflSec.append(h('p', null, data.looking_forward));
    } else {
      reflSec.append(h('p','muted','Reflection will appear once role data loads.'));
    }
    wrap.append(reflSec);

    // Examples (no SOC codes; show title + salary only)
    if (data && Array.isArray(data.examples) && data.examples.length){
      var exWrap = h('div', null);
      exWrap.append(h('h2', null, 'Example Occupations'));
      var ul = h('ul', null);
      data.examples.slice(0,3).forEach(function(tup){
        var title=tup[1], low=tup[2], high=tup[3]; // ignore tup[4] (SOC)
        var line = title + (low&&high?(": "+fmtMoney(low)+"–"+fmtMoney(high)):"");
        ul.append(h('li', null, line));
      });
      exWrap.append(ul);
      wrap.append(exWrap);
    }

    if (!document.querySelector('a[href="invest.html"]')){
      var cta = h('div', null, '<a href="invest.html" class="btn" style="display:inline-block;margin-top:14px">Invest in Yourself</a>');
      wrap.append(cta);
    }

    main.insertBefore(wrap, main.firstChild ? main.firstChild.nextSibling : null);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
