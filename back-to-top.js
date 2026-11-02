(() => {
  function init() {
    if (document.getElementById('backToTop')) return;
    const style = document.createElement('style');
    style.textContent = `
      #backToTop {
        position: fixed; left: max(16px, env(safe-area-inset-left, 0px)); top: 50%; transform: translateY(-50%);
        width: 46px; height: 46px; padding: 0; border: 1px solid rgba(0,0,0,.12);
        border-radius: 50%; background: #fff; color: #20252b;
        box-shadow: 0 3px 14px rgba(0,0,0,.18); z-index: 1000;
        display: grid; place-items: center; cursor: pointer;
        opacity: 0; visibility: hidden; pointer-events: none;
        transition: opacity .2s, visibility .2s, background-color .2s;
      }
      #backToTop.is-visible { opacity: 1; visibility: visible; pointer-events: auto; }
      #backToTop:hover { background: #f1f2f3; }
      #backToTop:focus-visible { outline: 3px solid #bd2633; outline-offset: 3px; }
      #backToTop svg { width: 22px; height: 22px; }
      @media (prefers-reduced-motion: reduce) { #backToTop { transition: none; } }
    `;
    document.head.appendChild(style);
    const button = document.createElement('button');
    button.id = 'backToTop';
    button.type = 'button';
    button.setAttribute('aria-label', 'Вернуться к началу страницы');
    button.title = 'Наверх';
    button.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    document.body.appendChild(button);
    const update = () => button.classList.toggle('is-visible', window.scrollY > 350);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('pageshow', update);
    update();
    button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
