class FooterView extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <footer>
        <p>Makan Bang &#169; 2020 - Yudistira Arya</p>
    </footer>
      `;
  }
}

customElements.define('footer-view', FooterView);
