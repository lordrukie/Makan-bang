import MakanBangDataSource from '../../data/dataSource';
import UrlParser from '../../routing/url-parser';
import {
  userReviewTemplate,
  restoDetailTemplate,
  detailRestoCategoryTemplate,
  createMenuListTemplate,
  dataErrorTemplate,
} from '../templates/template-creator';
import Preloader from '../../loader/loading';
import ElementViews from '../../utils/element-view';
import Scroll from '../../utils/scroll';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const Detail = {
  async render() {
    return `
    <section class="restoran">
    <article id="resto-list"></article>
    <h2>Daftar Makanan dan Minuman yang Tersedia</h2>
    <article class="menu">
    <div class="list food"><h3>Makanan</h3></div>
    <div class="list drink"><h3>Minuman</h3></div>
    </article>
</section>

<section id="review" class="rate">
<h2>Apa Kata Mereka Tentang <span class="bold">Restoran Ini.</span></h2>
    <article class="user-rate"></article>
</section>

<section class="form">
    <h2>Berikan Pendapatmu Tentang Restoran Ini.</h2>
    <article class="review">
        <div class="form">
            <label for="name">Nama:</label><br>
            <input maxlength="25" type="text" id="name" name="fname"><br>
            <label for="desc">Pendapat:</label><br>
            <textarea maxlength="90" type="text" id="desc" name="lname"></textarea>
            <div class="card-btn">
                <button id="submit" class="btn btn-desc">Submit</button>
            </div>
        </div>
    </article>
</section>
<div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    Scroll.toTop();

    Preloader.addPreloader();

    const restoContainer = document.querySelector('#resto-list');
    const userRateContainer = document.querySelector('.user-rate');
    const food = document.querySelector('.food');
    const drink = document.querySelector('.drink');
    const docHero = document.querySelector('hero-view');
    const testimonial = document.querySelector('.testi');

    ElementViews.hideElement(docHero);
    ElementViews.hideElement(testimonial);

    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await MakanBangDataSource.detailResto(url.id);

    Preloader.removePreloader();

    if (!restaurant.restaurant) {
      document.querySelector('.content').innerHTML = dataErrorTemplate(restaurant);
      return;
    }

    restoContainer.innerHTML += restoDetailTemplate(restaurant.restaurant);
    const categories = document.querySelector('#categories');

    restaurant.restaurant.categories.forEach((category) => {
      categories.innerHTML += detailRestoCategoryTemplate(category);
    });

    restaurant.restaurant.menus.foods.forEach((foodList) => {
      food.innerHTML += createMenuListTemplate(foodList);
    });

    restaurant.restaurant.menus.drinks.forEach((drinkList) => {
      drink.innerHTML += createMenuListTemplate(drinkList);
    });

    restaurant.restaurant.consumerReviews.forEach((usrRate) => {
      userRateContainer.innerHTML += userReviewTemplate(usrRate);
    });

    this.addUserReview(url.id);

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      resto: restaurant.restaurant,
    });
  },

  addUserReview(idResto) {
    document.querySelector('#submit').addEventListener('click', () => {
      const name = document.querySelector('#name');
      const desc = document.querySelector('#desc');
      const userRateContainer = document.querySelector('.user-rate');

      const nameValueHandling = name.value === '' ? 'Anonym' : name.value;

      if (desc.value === '') {
        alert('Deskripsi Tidak Boleh Kosong !');
        return;
      }

      MakanBangDataSource.addReview({
        id: idResto,
        name: nameValueHandling,
        review: desc.value,
      });

      // Menampilkan user review kedalam html secara real time ( tidak menunggu server )
      userRateContainer.innerHTML += userReviewTemplate({
        name: nameValueHandling,
        date: 'Baru saja',
        review: desc.value,
      });

      // Reset Nilai Input
      name.value = '';
      desc.value = '';
    });
  },
};

export default Detail;
