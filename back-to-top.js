(() => {
  function init() {
    if (document.getElementById('backToTop')) return;
    const style = document.createElement('style');
    style.textContent = `
      #backToTop {
        position: static; flex: 0 0 46px;
        width: 46px; height: 46px; padding: 0; border: 1px solid rgba(0,0,0,.12);
        border-radius: 50%; background: #fff; color: #20252b;
        box-shadow: 0 3px 14px rgba(0,0,0,.18); z-index: 1000;
        display: grid; place-items: center; cursor: pointer;
        opacity: 1; visibility: visible; pointer-events: auto;
        transition: opacity .2s, visibility .2s, background-color .2s;
      }
      .footer-brand-line { display: inline-flex; align-items: center; gap: 14px; flex-wrap: wrap; }
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
    const footer = document.querySelector('footer');
    if (!footer) return;
    let bottom = footer.querySelector('.footer-bottom');
    if (!bottom) {
      bottom = document.createElement('div');
      bottom.className = 'footer-bottom';
      bottom.appendChild(document.createTextNode('© XUNAN Automobile Trade '));
      footer.appendChild(bottom);
    }
    const brandLine = document.createElement('div');
    brandLine.className = 'footer-brand-line';
    const copyright = Array.from(bottom.childNodes).find(node => node.nodeType === 3 && node.textContent.includes('XUNAN'));
    if (copyright) {
      bottom.insertBefore(brandLine, copyright);
      brandLine.appendChild(copyright);
    } else {
      brandLine.textContent = '© XUNAN Automobile Trade';
      bottom.prepend(brandLine);
    }
    brandLine.appendChild(button);
    button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
