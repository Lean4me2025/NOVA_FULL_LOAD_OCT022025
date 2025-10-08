(function(){
  const audio = document.getElementById('introAudio');
  const playBtn = document.getElementById('playBtn');
  const proceedBtn = document.getElementById('proceedBtn');
  const overlay = document.getElementById('tapOverlay');
  const tapStart = document.getElementById('tapStart');
  const lines = Array.from(document.querySelectorAll('.line'));

  function revealLines(){
    lines.forEach(el=>{
      const delay = +el.getAttribute('data-delay')||0;
      setTimeout(()=> el.classList.add('show'), delay);
    });
  }

  function tryAutoplay(){
    audio.play().then(()=>{
      revealLines();
    }).catch(()=>{
      playBtn.hidden = false;
    });
  }

  if (audio.readyState >= 2){
    tryAutoplay();
  } else {
    audio.addEventListener('canplaythrough', tryAutoplay, {once:true});
    setTimeout(tryAutoplay, 2000);
  }

  playBtn.addEventListener('click', async ()=>{
    try{
      await audio.play();
      playBtn.hidden = true;
      revealLines();
    }catch{
      overlay.hidden = false;
    }
  });

  tapStart.addEventListener('click', async ()=>{
    try{
      await audio.play();
      overlay.hidden = true;
      revealLines();
    }catch{}
  });

  function showProceed(){
    proceedBtn.hidden = false;
  }
  audio.addEventListener('ended', showProceed);
  setTimeout(showProceed, 8000);

  proceedBtn.addEventListener('click', ()=>{
    window.location.href = 'traits.html';
  });
})();