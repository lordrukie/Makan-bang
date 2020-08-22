/* eslint-disable no-undef */
import MakanBangDb from '../src/scripts/data/favoriteRestoIdb';
import createLikeButtonPresenterWithResto from './helpers/testFactories';

describe('Liking A Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show the save button when the restaurant has not been added to favorite list before', async () => {
    await createLikeButtonPresenterWithResto({ id: 1 });

    expect(document.querySelector('[aria-label="save this resto"]'))
      .toBeTruthy();
  });

  it('should not show the delete button when the restaurant has not been saved before', async () => {
    await createLikeButtonPresenterWithResto({ id: 1 });

    expect(document.querySelector('[aria-label="delete this resto"]')).toBeFalsy();
  });

  it('should be able to save the restaurant', async () => {
    await createLikeButtonPresenterWithResto({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const resto = await MakanBangDb.getResto(1);

    expect(resto).toEqual({ id: 1 });

    MakanBangDb.deleteResto(1);
  });

  it('should not add a restaurant again when its already saved', async () => {
    await createLikeButtonPresenterWithResto({ id: 1 });

    // Tambahkan film dengan ID 1 ke daftar film yang disukai
    await MakanBangDb.putResto({ id: 1 });
    // Simulasikan pengguna menekan tombol suka film
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    // tidak ada film yang ganda
    expect(await MakanBangDb.getAllResto()).toEqual([{ id: 1 }]);

    MakanBangDb.deleteResto(1);
  });

  it('should not add a restaurant when it has no id', async () => {
    await createLikeButtonPresenterWithResto({});

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    // eslint-disable-next-line no-undef
    expect(await MakanBangDb.getAllResto()).toEqual([]);
  });
});
