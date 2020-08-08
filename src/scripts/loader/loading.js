const Preloader = {
  init(loader) {
    this._loader = loader;
  },

  addPreloader() {
    this._loader.innerHTML = this._loadGif();
  },

  removePreloader() {
    this._loader.innerHTML = '';
  },

  _loadGif() {
    return `
    <div class="preloader">
    <img src="./loaders/load.gif"></img>
    <div>
    `;
  },
};

export default Preloader;
