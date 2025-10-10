
/**
 * Welcome audio (pre-wired, optional).
 * Plays assets/audio/welcome_trimmed.mp3 if present.
 * No console logs; silent if not found.
 */
(function(){
  const status = document.getElementById('autoplayStatus');
  const url = 'assets/audio/welcome_trimmed.mp3';

  async function tryPlay() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) { return; } // no file; silently stop
      const buf = await res.arrayBuffer();
      const audioBuf = await ctx.decodeAudioData(buf.slice(0));
      const src = ctx.createBufferSource();
      src.buffer = audioBuf;
      src.connect(ctx.destination);
      src.start(0);
      if (status) status.textContent = ' ';
    } catch (e) {
      // Autoplay blocked; do nothing. User can continue without audio.
    }
  }
  // play on load of welcome section
  document.addEventListener('DOMContentLoaded', tryPlay);
})();
