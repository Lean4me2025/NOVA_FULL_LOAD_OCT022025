
(function(){
  function ensureLoaded(){
    if (!window.NOVA_ROLES) {
      console.warn("NOVA_ROLES not loaded.");
    }
  }
  window.getReflectionForRole = function(roleLabel){
    ensureLoaded();
    var r = (window.NOVA_ROLES||{})[roleLabel];
    return r ? r.looking_forward : "";
  }
})();
