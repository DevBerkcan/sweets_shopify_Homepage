(() => {
  'use strict';
  function initialize(scope) {
    scope.querySelectorAll('[data-section-type="sweets-snack-finder"]').forEach(root => {
      if (root.dataset.finderInit) return;
      const tabs = Array.from(root.querySelectorAll('[data-finder-tab]'));
      const panels = Array.from(root.querySelectorAll('[data-finder-panel]'));
      if (!tabs.length) return;
      root.dataset.finderInit = 'true';
      function select(tab, focus = false) {
        tabs.forEach(item => {
          const active = item === tab;
          item.classList.toggle('is--active', active);
          item.setAttribute('aria-selected', String(active));
          item.tabIndex = active ? 0 : -1;
        });
        panels.forEach(panel => { panel.hidden = panel.id !== tab.dataset.target; });
        if (focus) tab.focus();
      }
      root.addEventListener('click', event => {
        const tab = event.target.closest('[data-finder-tab]');
        if (tab && tabs.includes(tab)) select(tab);
        if (event.target.closest('[data-finder-reset]')) {
          tabs.find(item => item.getAttribute('aria-selected') === 'true')?.focus();
        }
      });
      root.addEventListener('keydown', event => {
        const index = tabs.indexOf(event.target);
        if (index < 0) return;
        let next;
        switch (event.key) {
          case 'ArrowRight': next = (index + 1) % tabs.length; break;
          case 'ArrowLeft': next = (index - 1 + tabs.length) % tabs.length; break;
          case 'Home': next = 0; break;
          case 'End': next = tabs.length - 1; break;
          default: return;
        }
        event.preventDefault();
        select(tabs[next], true);
      });
      select(tabs[0]);
    });
  }
  initialize(document);
  document.addEventListener('shopify:section:load', event => initialize(event.target));
})();
