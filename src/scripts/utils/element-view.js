const ElementViews = {
  hideElement(element) {
    element.classList.add('hide');
  },

  showElement(element) {
    element.classList.remove('hide');
  },

};

export default ElementViews;
