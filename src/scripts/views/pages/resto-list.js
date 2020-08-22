import MakanBangDataSource from '../../data/dataSource';
import { restoListTemplate, userRateTemplate, dataErrorTemplate } from '../templates/template-creator';
import Preloader from '../../loader/loading';
import ElementViews from '../../utils/element-view';

const RestoList = {
  async render() {
    return `
    <section class="restoran">
    <div id="resto-title">
    </div>
    <article id="resto-list"></article>
</section>
<section id="testi" class="rate">
    <div id="testi-title">
    </div>
    <article class="user-rate"></article>
</section>
    `;
  },

  async afterRender() {
    Preloader.addPreloader();

    const docHero = document.querySelector('hero-view');
    const testimonial = document.querySelector('.testi');
    ElementViews.showElement(docHero);
    ElementViews.showElement(testimonial);

    const restaurant = await MakanBangDataSource.listResto();
    const rate = await MakanBangDataSource.userRate();
    const restoContainer = document.querySelector('#resto-list');
    const userRateContainer = document.querySelector('.user-rate');
    const restoTitle = document.querySelector('#resto-title');
    const testiTitle = document.querySelector('#testi-title');

    Preloader.removePreloader();

    if (!restaurant.restaurants) {
      document.querySelector('.content').innerHTML = dataErrorTemplate(restaurant);
      return;
    }
    restoTitle.innerHTML = '<h2>Berikut Ini Adalah Daftar Restoran Keren Buat Kamu</h2>';
    testiTitle.innerHTML = '<h2>Apa Kata Mereka Tentang <span class="bold">Makan Bang.</span></h2>';
    rate.users.forEach((usrRate) => {
      userRateContainer.innerHTML += userRateTemplate(usrRate);
    });
    restaurant.restaurants.forEach((resto) => {
      restoContainer.innerHTML += restoListTemplate(resto);
    });
  },
};

export default RestoList;
