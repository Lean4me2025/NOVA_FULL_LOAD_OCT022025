window.NOVA = {
  state: {
    selectedCategoryIds: JSON.parse(localStorage.getItem('nova.selectedCategoryIds')||'[]'),
    selectedCategories: JSON.parse(localStorage.getItem('nova.selectedCategories')||'[]'), // labels for display
    selectedTraits: JSON.parse(localStorage.getItem('nova.selectedTraits')||'[]'),
    matches: JSON.parse(localStorage.getItem('nova.matches')||'[]'),
  },
  save(){
    const s=this.state;
    localStorage.setItem('nova.selectedCategoryIds', JSON.stringify(s.selectedCategoryIds||[]));
    localStorage.setItem('nova.selectedCategories', JSON.stringify(s.selectedCategories||[]));
    localStorage.setItem('nova.selectedTraits', JSON.stringify(s.selectedTraits||[]));
    localStorage.setItem('nova.matches', JSON.stringify(s.matches||[]));
  }
};
