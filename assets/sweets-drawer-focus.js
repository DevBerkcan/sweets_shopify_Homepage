/* Accessibility adapter for Kalles drawers. Opening, closing and cart updates remain native. */
(() => {
  const selector = 'a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
  let activeDrawer = null;
  let returnTarget = null;

  const visible = element => element.getClientRects().length > 0 && getComputedStyle(element).visibility !== 'hidden';
  const controls = drawer => {
    const elements = [...drawer.querySelectorAll(selector)].filter(visible);
    // Kalles renders the mobile close button beside, rather than inside, its drawer.
    if (drawer.id === 't4s-menu-drawer') {
      const close = drawer.nextElementSibling;
      if (close?.matches('[data-drawer-close]') && visible(close)) elements.push(close);
    }
    return elements;
  };

  const sync = () => {
    const drawer = document.querySelector('.t4s-drawer[aria-hidden="false"]');
    if (drawer === activeDrawer) return;
    if (drawer) {
      if (!activeDrawer) returnTarget = document.activeElement;
      activeDrawer = drawer;
      drawer.tabIndex = -1;
      requestAnimationFrame(() => {
        if (activeDrawer !== drawer) return;
        const preferred = drawer.querySelector('[data-input-search]');
        const target = preferred && visible(preferred) ? preferred : controls(drawer)[0] || drawer;
        target.focus({ preventScroll: true });
      });
    } else {
      activeDrawer = null;
      if (returnTarget?.isConnected) returnTarget.focus({ preventScroll: true });
      returnTarget = null;
    }
  };

  const observer = new MutationObserver(sync);
  document.querySelectorAll('.t4s-drawer').forEach(drawer => observer.observe(drawer, {
    attributes: true, attributeFilter: ['aria-hidden']
  }));

  document.addEventListener('keydown', event => {
    if (event.key !== 'Tab' || !activeDrawer) return;
    // Quick view/edit dialogs manage their own focus above the cart drawer.
    if ([...document.querySelectorAll('.mfp-wrap,.pswp--open')].some(visible)) return;
    const elements = controls(activeDrawer);
    const index = elements.indexOf(document.activeElement);
    if (!elements.length) {
      event.preventDefault();
      activeDrawer.focus();
    } else if (index < 0 || (event.shiftKey && index === 0) || (!event.shiftKey && index === elements.length - 1)) {
      event.preventDefault();
      elements[event.shiftKey ? elements.length - 1 : 0].focus();
    }
  });
  sync();
})();
