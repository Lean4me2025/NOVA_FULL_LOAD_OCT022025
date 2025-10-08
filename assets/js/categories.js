(function(){
  const grid = document.getElementById('grid'); const next = document.getElementById('next'); const sel=new Set();
  const items=['Technology','Business','Finance & Accounting','Creative','Operations','Sales & Customer','Education','Hands-On'];
  items.forEach(name=>{ const el=document.createElement('div'); el.className='pill'; el.textContent=name;
    el.addEventListener('click',()=>{el.classList.toggle('selected'); if(el.classList.contains('selected')) sel.add(name); else sel.delete(name); next.disabled=sel.size<2;});
    grid.appendChild(el);
  });
  next.addEventListener('click',()=>{ try{ sessionStorage.setItem('nova_stage','categories_done'); sessionStorage.setItem('nova_run_started','1'); localStorage.setItem('nova_selected_categories',JSON.stringify([...sel])); }catch(e){} location.href='traits.html'; });
})();