(function(){
  const btn=document.getElementById('startJourneyBtn');
  if(!btn) return;
  btn.setAttribute('href','categories.html');
  btn.addEventListener('click',()=>{
    try{
      sessionStorage.clear();
      localStorage.removeItem('nova_selected_traits');
      localStorage.removeItem('nova_selected_categories');
      sessionStorage.setItem('nova_run_started','1');
    }catch(e){}
  });
})();