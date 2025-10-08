// Ensure Categories completed before Traits
(function(){
try{
const stage=sessionStorage.getItem('nova_stage');
if(stage!=='categories_done'){
localStorage.removeItem('nova_selected_traits');
localStorage.removeItem('nova_selected_categories');
window.location.replace('categories.html');
}
}catch(e){}
})();
document.addEventListener('DOMContentLoaded',()=>{
if(sessionStorage.getItem('nova_stage')!=='categories_done'){
document.querySelectorAll('.trait-card.selected').forEach(el=>el.classList.remove('selected'));
}});
