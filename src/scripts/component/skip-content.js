class SkipContent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <a class="skip-link" href="#main-content">Skip To Content</a>
    `;
  }
}

customElements.define('skip-content', SkipContent);
