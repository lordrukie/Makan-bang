class NavView extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <nav>
    <div class="nav-head">
        <p>Makan Bang</p>
    </div>
    <ul class="nav">
        <li><a href="#/home">Home</a></li>
        <li><a href="#/fav">Favorite</a></li>
        <li><a class="testi" href="#testi">Testimoni</a></li>
        <li><a target="_blank" rel="noopener" href="https://lordrukie.github.io/me">About Us</a></li>
    </ul>
    <button aria-label="navigation button" class="burger">
        <i class="fa fa-hamburger"></i>
    </button>
</nav>
      `;
    this.querySelectorAll('li').forEach((nav) => {
      nav.addEventListener('click', () => {
        document.querySelector('#main-content').scrollIntoView();
      });
    });
  }
}

customElements.define('nav-view', NavView);
