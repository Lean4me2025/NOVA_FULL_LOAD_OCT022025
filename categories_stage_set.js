(function(){
const btn=document.getElementById('categoriesNextBtn');
if(!btn) return;
btn.addEventListener('click',()=>{
try{
sessionStorage.setItem('nova_stage','categories_done');
sessionStorage.setItem('nova_run_started','1');
localStorage.removeItem('nova_selected_traits');
}catch(e){}
});
})();