// H94i FlowGuard: mark Categories completion
document.getElementById('categoriesNextBtn')?.addEventListener('click', () => {
  try { sessionStorage.setItem('nova_stage','categories_done'); } catch(e){}
});