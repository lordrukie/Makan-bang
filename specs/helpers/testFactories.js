import LikeButtonPresenter from '../../src/scripts/utils/like-button-presenter';
import MakanBangDB from '../../src/scripts/data/favoriteRestoIdb';

const createSaveButtonPresenterWithResto = async (resto) => {
  await LikeButtonPresenter.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    resto,
    favoriteResto: MakanBangDB,
  });
};

export default createSaveButtonPresenterWithResto;
