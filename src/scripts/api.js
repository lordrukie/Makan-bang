/* eslint-disable import/extensions */
import { showData, showTestimoni } from './show.js';

function fetchData() {
  return fetch('./src/dummy/DATA.json')
    .then((res) => {
      if (res.status !== 200) {
        // eslint-disable-next-line no-console
        console.log(`Error:  ${res.status}`);
        return Promise.reject(new Error(res.statusText));
      // eslint-disable-next-line no-else-return
      } else {
        return Promise.resolve(res.json());
      }
    })
    .then((data) => {
      showData(data);
    });
}
function fetchData2() {
  return fetch('./src/dummy/user.json')
    .then((res) => {
      if (res.status !== 200) {
        // eslint-disable-next-line no-console
        console.log(`Error:  ${res.status}`);
        return Promise.reject(new Error(res.statusText));
        // eslint-disable-next-line no-else-return
      } else {
        return Promise.resolve(res.json());
      }
    })
    .then((data) => {
      showTestimoni(data);
    });
}
fetchData();
fetchData2();
