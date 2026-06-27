// ══════════════════════════════════════════════════════════
// iOS Safari viewport fix: adres çubuğu yüzünden görünür viewport,
// layout viewport'tan kısa olunca position:fixed reader-overlay görünürden
// uzun kalıyor; içerik dağılınca dokunma noktası ~bir satır yukarı kayıyor.
// Overlay'i visualViewport boyut/konumuna oturtarak hizalarız.
// (Kesin çözüm: Ana Ekrana Ekle → standalone; o zaman bu zaten devreye girmez.)
// ══════════════════════════════════════════════════════════
function syncReaderViewport(){
  const vv = window.visualViewport;
  const ov = document.getElementById('reader-overlay');
  if(!vv || !ov || !ov.classList.contains('open')) return;
  ov.style.height = vv.height + 'px';
  ov.style.width  = vv.width + 'px';
  ov.style.top    = vv.offsetTop + 'px';
  ov.style.left   = vv.offsetLeft + 'px';
}
function reflowReaderViewport(){
  syncReaderViewport();
  try{ window.renderPages?.(); }catch(_e){}
}
function scheduleReaderViewportReflow(){
  if(!document.getElementById('reader-overlay')?.classList.contains('open')) return;
  [0, 80, 180, 360, 700].forEach(delay => setTimeout(reflowReaderViewport, delay));
}
function clearReaderViewport(){
  const ov = document.getElementById('reader-overlay');
  if(ov){ ov.style.removeProperty('height'); ov.style.removeProperty('width'); ov.style.removeProperty('top'); ov.style.removeProperty('left'); }
}
window.syncReaderViewport = syncReaderViewport;
window.scheduleReaderViewportReflow = scheduleReaderViewportReflow;
window.clearReaderViewport = clearReaderViewport;

if(window.visualViewport){
  window.visualViewport.addEventListener('resize', scheduleReaderViewportReflow);
  window.visualViewport.addEventListener('scroll', syncReaderViewport);
}
window.addEventListener('resize', scheduleReaderViewportReflow);
window.addEventListener('orientationchange', scheduleReaderViewportReflow);
document.addEventListener('fullscreenchange', scheduleReaderViewportReflow);
document.addEventListener('webkitfullscreenchange', scheduleReaderViewportReflow);
document.addEventListener('mozfullscreenchange', scheduleReaderViewportReflow);
