// H94i hotfix: "Try these roles" -> "Discover these roles"
(function(){
  function swap(){
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n; while ((n = w.nextNode())){
      const t = n.nodeValue || '';
      if (t.match(/\bTry these roles:/i)) {
        n.nodeValue = t.replace(/\bTry these roles:/i, 'Discover these roles:');
        break;
      }
    }
  }
  (document.readyState === 'loading') ? document.addEventListener('DOMContentLoaded', swap) : swap();
})();