import MakanBangDataSource from '../../data/dataSource';
import { restoListTemplate, userRateTemplate, dataErrorTemplate } from '../templates/template-creator';
import Preloader from '../../loader/loading';
import ElementViews from '../../utils/element-view';

const RestoList = {
  async render() {
    return `
    <section class="restoran">
    <h2>Berikut Ini Adalah Daftar Restoran Keren Buat Kamu</h2>
    <article id="resto-list"></article>
</section>
<section id="testi" class="rate">
    <h2>Apa Kata Mereka Tentang <span class="bold">Makan Bang.</span></h2>
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
    const restaurantList = restaurant.restaurants;

    Preloader.removePreloader();

    if (!restaurantList) {
      document.querySelector('.content').innerHTML = dataErrorTemplate(restaurant);
      return;
    }
    rate.users.forEach((usrRate) => {
      userRateContainer.innerHTML += userRateTemplate(usrRate);
    });
    restaurantList.forEach((resto) => {
      restoContainer.innerHTML += restoListTemplate(resto);
    });
  },
};

export default RestoList;
