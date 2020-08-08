import DrawerInitiator from '../utils/drawer-initiator';
import routes from '../routing/routes';
import UrlParser from '../routing/url-parser';
import Preloader from '../loader/loading';

class App {
  constructor({
    button, drawer, body, content, loader,
  }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;
    this._body = body;
    this._loader = loader;
    this._initialAppShell();
    this._initiallPreloader();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      body: this._body,
    });
  }

  _initiallPreloader() {
    Preloader.init(this._loader);
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;
