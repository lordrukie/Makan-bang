class HeroView extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <header>
    <div class="hero">
        <div class="hero-header">
            <h1>Makan Bang, Tempatnya Restoran Keren Berkumpul</h1> <br>
            <h2>Anda Lapar? Ingin mencari Restoran dengan Kualitas Terbaik? <br> Tenang,<span class="bold"> Makan Bang</span> telah menyediakan daftar restoran khusus untuk kamu ! </h2>
        </div>
        <div class="hero-title"></div>
    </div>
</header>
    `;
  }
}

customElements.define('hero-view', HeroView);
