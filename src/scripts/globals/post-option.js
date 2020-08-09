const OPTION = {
  postOption({ id, name, review }) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': '12345',
      },
      body: JSON.stringify({ id, name, review }),
    };
  },

};

export default OPTION;
