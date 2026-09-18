/* Native product data, no cart interception or client-side discount calculation. */
if (!customElements.get('sweets-shopping-guide')) {
  customElements.define('sweets-shopping-guide', class extends HTMLElement {
    connectedCallback() {
      if (this.initialized) return;
      this.initialized = true;
      this.items = [...this.querySelectorAll('[data-item]')];
      if (!this.items.length) return;
      this.selected = new Set();
      this.form = this.querySelector('[data-guide-form]');
      this.querySelector('[data-questions]').hidden = false;
      this.querySelector('[data-comparison-section]').hidden = false;
      this.querySelectorAll('[data-compare-control]').forEach(el => { el.hidden = false; });
      this.querySelector('[data-next]').addEventListener('click', () => this.step(1));
      this.querySelector('[data-back]').addEventListener('click', () => this.step(0));
      this.form.addEventListener('submit', event => {
        event.preventDefault();
        const values = new FormData(this.form);
        const category = values.get('interest');
        const budget = Number(values.get('budget'));
        let count = 0;
        this.items.forEach(item => {
          item.hidden = !((category === 'all' || item.dataset.category === category) &&
            (!budget || Number(item.dataset.price) <= budget) &&
            (!values.has('available') || item.dataset.available === 'true'));
          if (!item.hidden) count++;
        });
        this.querySelector('[data-empty]').hidden = count > 0;
        this.querySelector('[data-reset]').hidden = false;
        this.querySelector('[data-results-title]').focus();
      });
      this.querySelector('[data-reset]').addEventListener('click', () => {
        this.form.reset();
        this.items.forEach(item => { item.hidden = false; });
        this.querySelector('[data-empty]').hidden = true;
        this.querySelector('[data-reset]').hidden = true;
        this.step(0);
      });
      this.addEventListener('change', event => {
        if (!event.target.matches('[data-compare]')) return;
        const input = event.target;
        if (input.checked && this.selected.size < 3) this.selected.add(input.value);
        else { this.selected.delete(input.value); input.checked = false; }
        this.compare();
      });
      this.querySelector('[data-comparison-grid]').addEventListener('click', event => {
        const button = event.target.closest('[data-remove]');
        if (!button) return;
        const id = button.dataset.remove;
        this.selected.delete(id);
        this.compare();
        const item = this.items.find(item => item.dataset.id === id);
        if (item && !item.hidden) item.querySelector('[data-compare]').focus();
        else this.querySelector('[data-results-title]').focus();
      });
      this.querySelector('[data-clear]').addEventListener('click', () => {
        this.selected.clear(); this.compare();
        this.querySelector('[data-results-title]').focus();
      });
      this.compare();
    }
    step(index) {
      this.querySelectorAll('[data-step]').forEach((step, i) => { step.hidden = i !== index; });
      this.querySelector(`[data-step="${index}"] legend`).focus();
    }
    compare() {
      const grid = this.querySelector('[data-comparison-grid]');
      grid.replaceChildren();
      this.items.forEach(item => {
        const input = item.querySelector('[data-compare]');
        input.checked = this.selected.has(item.dataset.id);
        input.disabled = !input.checked && this.selected.size >= 3;
        if (input.checked) grid.append(item.querySelector('[data-comparison]').content.cloneNode(true));
      });
      this.querySelector('[data-clear]').hidden = this.selected.size === 0;
      const status = this.querySelector('[data-status]');
      status.textContent = this.selected.size ? `${this.selected.size} / 3 ${status.dataset.countText}` : status.dataset.emptyText;
    }
  });
}
