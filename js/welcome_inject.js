// NOVA v9.4h (H94H) — Welcome injector
(function(){
  function textIncludes(el, needle){
    return el && (el.textContent || '').toLowerCase().includes(needle.toLowerCase());
  }
  function findNodeWithText(root, needle){
    const tree = document.createTreeWalker(root || document.body, NodeFilter.SHOW_ELEMENT, null);
    let node;
    while ((node = tree.nextNode())){
      if (textIncludes(node, needle)) return node;
    }
    return null;
  }
  function inject(){
    const needle = "89% of people do not know their purpose.";
    const target = findNodeWithText(document.body, needle);
    if(!target) return; // nothing to do
    // If welcome already present, don't duplicate
    if (document.querySelector('.welcome-title')) return;
    const h1 = document.createElement('h1');
    h1.className = 'welcome-title';
    h1.textContent = 'Welcome to Nova';
    target.parentNode.insertBefore(h1, target);
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
