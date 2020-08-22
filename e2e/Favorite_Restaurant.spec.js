/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const assert = require('assert');

Feature('Favorite Restaurant');

const defaultFavText = 'Maaf, Anda belum memiliki restoran yang tersimpan.';
const actionButton = '#likeButton';

Before((I) => {
  I.amOnPage('/#/fav');
  // ternyata belum ada restoran yang masuk ke daftar favorite
  I.see(defaultFavText, 'h2');
});

Scenario('Adding restaurant to favorite list', async (I) => {
  // pergi ke page home
  I.amOnPage('/');

  const firstRestaurantDetailPageButton = locate('.card-btn a').first();
  const firstRestaurantCard = locate('.card-header p').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurantCard);

  // pergi ke page detail restaurant
  I.click(firstRestaurantDetailPageButton);

  I.seeElement(actionButton);
  I.seeElement('.fa-save');

  // menambahkan restaurant kedalam daftar favorite
  I.click(actionButton);

  // pergi ke page favorite
  I.amOnPage('/#/fav');

  // restaurant sudah masuk ke dalam daftar favorite belum yaa ?
  I.seeElement('.card');
  const firstFavoriteRestaurantName = await I.grabTextFrom('.card-header p');

  // benarkah restaurant yang berada di daftar favorite ini sama dengan restaurant
  // yang kita simpan tadi ?
  assert.strictEqual(firstRestaurantName, firstFavoriteRestaurantName);
});

Scenario('Remove restaurant from favorite list', async (I) => {
  // pergi ke page detail restaurant
  I.amOnPage('/');

  const firstRestaurantDetailPageButton = locate('.card-btn a').first();
  const firstRestaurantCard = locate('.card-header p').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurantCard);

  // pergi ke page detail restaurant
  I.click(firstRestaurantDetailPageButton);

  I.seeElement(actionButton);
  I.seeElement('.fa-save');

  // menambahkan restaurant kedalam daftar favorite
  I.click(actionButton);

  // pergi ke page favorite
  I.amOnPage('/#/fav');

  // restaurant sudah masuk ke dalam daftar favorite belum yaa ?
  I.seeElement('.card');
  const firstFavoriteRestaurantName = await I.grabTextFrom('.card-header p');

  // benarkah restaurant yang berada di daftar favorite ini sama dengan restaurant
  // yang kita simpan tadi ?
  assert.strictEqual(firstRestaurantName, firstFavoriteRestaurantName);

  const firstFavoriteRestaurantDetailPageButton = locate('.card-btn a').first();

  // pergi ke detail page restaurant yang telah ada di daftar favorite
  I.click(firstFavoriteRestaurantDetailPageButton);

  I.seeElement(actionButton);
  I.seeElement('.fa-trash');

  // menghapus restaurant dari daftar favorite
  I.click(actionButton);

  // pergi ke page favorite
  I.amOnPage('/#/fav');

  // apakah benar restaurant sebelumnya telah terhapus dari daftar favorite ?
  I.see(defaultFavText, 'h2');
});

Scenario('User review', async (I) => {
  // buka page home
  I.amOnPage('/');

  // membuka halaman detail dari restoran pertama
  I.click(locate('.card-btn a').first());

  I.seeElement('.form');

  // apa review kamu ?
  const userReview = 'Testing E2E With Codeceptjs';
  I.fillField('#name', 'Yudistira Arya');
  I.fillField('#desc', userReview);

  // mengirimkan review
  I.click('#submit');

  // kira-kira, reviewku dimasukkan kedalam web tidak yah ?
  const lastReview = locate('.capt').last();
  const textLastReview = await I.grabTextFrom(lastReview);

  // itu benar review ku bukan sih ?
  assert.strictEqual(`"${userReview}"`, textLastReview);
});
