import API_ENDPOINT from '../globals/api-endpoint';
import OPTION from '../globals/post-option';

class MakanBangDataSource {
  static async userRate() {
    try {
      const response = await fetch('./src/dummy/user.json');
      return response.json();
    } catch (error) {
      return error;
    }
  }

  static async listResto() {
    try {
      const response = await fetch(API_ENDPOINT.CATALOUGE);
      if (response.status !== 200) {
        return response.status;
      }
      return response.json();
    } catch (error) {
      return error;
    }
  }

  static async detailResto(id) {
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id));
      if (response.status !== 200) {
        return response.status;
      }
      return response.json();
    } catch (error) {
      return error;
    }
  }

  static async addReview(id, name, review) {
    const response = await fetch(API_ENDPOINT.REVIEW,
      OPTION.postOption(id, name, review));
    return response.json();
  }
}

export default MakanBangDataSource;
