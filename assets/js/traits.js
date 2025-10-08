(function(){
  const stage=sessionStorage.getItem('nova_stage'); const started=sessionStorage.getItem('nova_run_started')==='1';
  if(stage!=='categories_done'||!started){ localStorage.removeItem('nova_selected_traits'); localStorage.removeItem('nova_selected_categories'); location.replace('categories.html'); return;}
  const grid=document.getElementById('tgrid'); const chosen=new Set();
  const items=['Analytical','Creative','Organized','Empathetic','Detail-Oriented','Curious','Resilient','Adaptable','Problem-Solving','Presentation','Systems Thinking','Research','Logical','Team-Oriented','Decision-Making'];
  items.forEach(t=>{const el=document.createElement('div'); el.className='pill'; el.textContent=t; el.addEventListener('click',()=>{if(el.classList.toggle('selected')) chosen.add(t); else chosen.delete(t);}); grid.appendChild(el);});
  document.getElementById('go').addEventListener('click',()=>{ try{localStorage.setItem('nova_selected_traits',JSON.stringify([...chosen]));}catch(e){} });
})();