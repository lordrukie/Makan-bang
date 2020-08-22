import CONFIG from '../../globals/config';

const restoListTemplate = (list) => `
<div class="card">
<div class="card-main">
    <img src="/images/icons/asset_dummy1.png" class="lazyload" data-src="${CONFIG.BASE_URL}${CONFIG.IMAGE_URL_SML}/${list.pictureId}" alt="Restoran ${list.name}">
</div>
<div class="card-desc">
    <div class="card-header">
        <p>${list.name}</p>
    </div>
    <p>Rating: ${list.rating}</p>
    <p>Lokasi: ${list.city}</p> <br>
    <p>${list.description.substring(0, 180)}...</p>
    <div class="card-btn">
        <button class="btn btn-desc"><a href="#/detail/${list.id}">Lihat Restoran</a></button>
    </div>
</div>
</div>
`;

const detailRestoCategoryTemplate = (category) => `
<a>${category.name}</a>
`;

const userRateTemplate = (rate) => `
<div class="card">
            <div class="card-main">
                <img src="/images/icons/asset_dummy2.png" class="lazyload" data-src="${rate.profilePic}" alt="Wajah Dari ${rate.name}">
            </div>
            <div class="card-desc">
                <div class="card-header">
                    <p>${rate.name}</p>
                </div>
                <p class="job">${rate.job}</p> <br>
                <p class="capt"><em>"${rate.desc}"</em></p>
            </div>
        </div>
`;

const userReviewTemplate = (user) => `
<div class="card">
            <div class="card-main">
                <img src="/images/icons/asset_dummy1.png" class="lazyload" data-src="./images/users/anonym.jpg" alt="anonym">
            </div>
            <div class="card-desc">
                <div class="card-header">
                    <p>${user.name}</p>
                </div>
                <p class="job">${user.date}</p> <br>
                <p class="capt"><em>"${user.review.length > 90 ? `${user.review.substring(0, 90)}...` : user.review}"</em></p>
            </div>
        </div>
`;
const restoDetailTemplate = (resto) => `
<div class="detail">
<h1>Detail Restoran</h1>
<div class="head">
    <div class="head-img">
    <img src="${CONFIG.BASE_URL}${CONFIG.IMAGE_URL_MED}/${resto.pictureId}"
    srcset="${CONFIG.BASE_URL}${CONFIG.IMAGE_URL_SML}/${resto.pictureId} 550w, ${CONFIG.BASE_URL}${CONFIG.IMAGE_URL_MED}/${resto.pictureId} 800w"
    sizes="(max-width: 600px) 600px, 800px" 
    alt="Restoran ${resto.name}">
    </img>
    </div>
    <table>
        <tr>
            <td><i class="fas fa-store"></i></td>
            <td><a>${resto.name}</a></td>
        </tr>
        <tr>
            <td><i class="fas fa-star"></i></td>
            <td><a>${resto.rating}</a></td>
        </tr>
        <tr><td><i class="fas fa-map-marked-alt"></i></td>
            <td><a>${resto.address}, ${resto.city}</a></td>
        </tr>
        <tr>
            <td><i class="fas fa-utensils"></i></td>
            <td><a id="categories"></a></td>
        </tr>
    </table>
</div>
<div class="desc">
    <p>${resto.description}</p>
</div>
</div>
`;

const createMenuListTemplate = (menu) => `
<p>${menu.name}</p>
`;

const createSaveButtonTemplate = () => `
  <button aria-label="save this resto" id="likeButton" class="like">
     <i class="fa fa-save" aria-hidden="true"></i>
  </button>
`;

const createDeleteButtonTemplate = () => `
  <button aria-label="delete this resto" id="likeButton" class="like">
    <i class="fa fa-trash" aria-hidden="true"></i>
  </button>
`;

const dataErrorTemplate = (error) => `
    <h1 class="error"> Maaf, data restoran gagal dimuat. Silahkan hubungi <a href="https://facebook.com/cruokchannel">Administrator</a>.<br> <br>
    Error Code: <i>${error}</i>.</h1>
    `;
export {
  restoListTemplate,
  restoDetailTemplate,
  userRateTemplate,
  userReviewTemplate,
  createSaveButtonTemplate,
  createDeleteButtonTemplate,
  detailRestoCategoryTemplate,
  dataErrorTemplate,
  createMenuListTemplate,
};
