(function(){
try{
const stage=sessionStorage.getItem('nova_stage');
const started=sessionStorage.getItem('nova_run_started')==='1';
if(stage!=='categories_done'||!started){
localStorage.removeItem('nova_selected_traits');
localStorage.removeItem('nova_selected_categories');
window.location.replace('categories.html');
return;
}
document.addEventListener('DOMContentLoaded',()=>{
document.querySelectorAll('.trait-card.selected').forEach(el=>el.classList.remove('selected'));
});
}catch(e){}
})();