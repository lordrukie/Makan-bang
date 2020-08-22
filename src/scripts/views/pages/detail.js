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
import LikeButtonPresenter from '../../utils/like-button-presenter';
import MakanBangDB from '../../data/favoriteRestoIdb';

const Detail = {
  async render() {
    const docHero = document.querySelector('hero-view');
    const testimonial = document.querySelector('.testi');

    ElementViews.hideElement(docHero);
    ElementViews.hideElement(testimonial);
    return `
    <section class="restoran">
    <article id="resto-list"></article>

    <article class="menu">
    <div class="list food"></div>
    <div class="list drink"></div>
    </article>
</section>

<section id="review" class="rate">

    <article class="user-rate"></article>
</section>

<section class="form">

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
    food.innerHTML = '<h3>Makanan</h3>';
    restaurant.restaurant.menus.foods.forEach((foodList) => {
      food.innerHTML += createMenuListTemplate(foodList);
    });
    drink.innerHTML = '<h3>Minuman</h3>';
    restaurant.restaurant.menus.drinks.forEach((drinkList) => {
      drink.innerHTML += createMenuListTemplate(drinkList);
    });

    restaurant.restaurant.consumerReviews.forEach((usrRate) => {
      userRateContainer.innerHTML += userReviewTemplate(usrRate);
    });

    this.addUserReview(url.id);

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      resto: restaurant.restaurant,
      favoriteResto: MakanBangDB,
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
