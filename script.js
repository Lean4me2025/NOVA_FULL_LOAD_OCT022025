
/**
 * NOVA 8.5A — Prefer pre-trimmed file, else client-side trim.
 * Order:
 *   1) assets/audio/welcome_trimmed.mp3  (use as-is)
 *   2) assets/audio/welcome_original.mp3 (client-side trim)
 *   3) assets/audio/welcome_original.m4a (client-side trim)
 */

const STATUS = document.getElementById('autoplayStatus');
const PLAY_BTN = document.getElementById('playBtn');

async function fetchArrayBuffer(url) {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch ' + url);
  return await res.arrayBuffer();
}

async function decodeAudio(ctx, arrayBuffer) {
  return await ctx.decodeAudioData(arrayBuffer.slice(0));
}

function findFirstSoundOffset(audioBuffer, threshold = 0.005) {
  const data = audioBuffer.getChannelData(0);
  const sr = audioBuffer.sampleRate;
  for (let i = 0; i < data.length; i++) {
    if (Math.abs(data[i]) > threshold) {
      return i / sr;
    }
  }
  return 0;
}

async function playBuffer(ctx, audioBuffer, offsetSec = 0) {
  const src = ctx.createBufferSource();
  src.buffer = audioBuffer;
  src.connect(ctx.destination);
  src.start(0, offsetSec);
}

async function playWelcomeAuto() {
  STATUS.textContent = 'Loading welcome audio…';
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const preferTrimmed = 'assets/audio/welcome_trimmed.mp3';
  const originals = [
    'assets/audio/welcome_original.mp3',
    'assets/audio/welcome_original.m4a'
  ];

  // Try pre-trimmed first (no extra processing)
  try {
    const buf = await fetchArrayBuffer(preferTrimmed);
    const decoded = await decodeAudio(ctx, buf);
    await playBuffer(ctx, decoded, 0);
    STATUS.textContent = 'Playing welcome audio…';
    return;
  } catch (e) {
    // continue to originals with client-side trim
  }

  // Try originals with client-side trim
  for (const url of originals) {
    try {
      const buf = await fetchArrayBuffer(url);
      const decoded = await decodeAudio(ctx, buf);
      const offsetSec = findFirstSoundOffset(decoded, 0.005);
      await playBuffer(ctx, decoded, offsetSec);
      STATUS.textContent = 'Playing welcome audio…';
      return;
    } catch (e) {}
  }

  STATUS.textContent = 'Welcome audio not found. Place your file at assets/audio/welcome_trimmed.mp3';
  PLAY_BTN.style.display = 'none';
}

async function tryAutoplay() {
  try {
    await playWelcomeAuto();
  } catch (err) {
    STATUS.textContent = 'Tap Play to begin the welcome audio.';
    PLAY_BTN.style.display = 'inline-block';
    PLAY_BTN.onclick = () => {
      try {
        playWelcomeAuto();
        PLAY_BTN.style.display = 'none';
      } catch (e) {
        STATUS.textContent = 'Unable to start audio. See console for details.';
      }
    };
  }
}

document.addEventListener('DOMContentLoaded', () => {
  tryAutoplay();
});
