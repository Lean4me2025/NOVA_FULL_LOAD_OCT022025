// H94i FlowGuard: Welcome resets and routes to Categories
document.getElementById('startJourneyBtn')?.setAttribute('href', 'categories.html');
document.getElementById('startJourneyBtn')?.addEventListener('click', () => {
  try {
    sessionStorage.clear();
    localStorage.removeItem('nova_selected_traits');
    localStorage.removeItem('nova_selected_categories');
  } catch(e){}
});