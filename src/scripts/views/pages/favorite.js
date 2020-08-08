import MakanBangDB from '../../data/favoriteResto';
import { restoListTemplate, dataErrorTemplate } from '../templates/template-creator';
import Preloader from '../../loader/loading';
import ElementViews from '../../utils/element-view';

const Favorite = {
  async render() {
    return `
    <section class="restoran">
    <h2>Berikut Ini Adalah Daftar Restoran Yang Kamu Simpan</h2>
    <article id="resto-list"></article>
</section>
    `;
  },

  async afterRender() {
    Preloader.addPreloader();

    const docHero = document.querySelector('hero-view');
    const testimonial = document.querySelector('.testi');
    ElementViews.showElement(docHero);
    ElementViews.hideElement(testimonial);

    const restaurant = await MakanBangDB.getAllResto();
    const restoContainer = document.querySelector('#resto-list');

    Preloader.removePreloader();
    if (!restaurant) {
      document.querySelector('.content').innerHTML = dataErrorTemplate(restaurant);
      return;
    }
    if (restaurant.length > 0) {
      restaurant.forEach((resto) => {
        restoContainer.innerHTML += restoListTemplate(resto);
      });
    } else {
      document.querySelector('.restoran h2').innerHTML = 'Maaf, Anda belum memiliki restoran yang tersimpan.';
    }
  },
};

export default Favorite;
