// Nova H94H — Welcome page behavior
(function(){
  const start = document.getElementById('startJourneyBtn');
  if(start){
    start.addEventListener('click', () => {
      try{
        localStorage.removeItem('nova_selected_traits');
        localStorage.removeItem('nova_selected_categories');
      }catch(e){}
    });
  }
})();